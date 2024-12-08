/* eslint-disable @typescript-eslint/no-explicit-any */
// OrganizationChart.jsx
import React, { useLayoutEffect, useRef, forwardRef, useState } from "react";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3"; // Import D3

interface User {
  walletAddress: string;
  referralCode: string;
}

interface Node {
  id: string;
  name: string; // Added name for search functionality
  user?: User;
  children: Node[];
}

interface OrgChartProps {
  data: Node[];
  // eslint-disable-next-line no-unused-vars
  onNodeClick: (node: Node) => void;
  level: number;
}

// eslint-disable-next-line react/display-name
const OrganizationChart = forwardRef<HTMLDivElement, OrgChartProps>((props) => {
  const d3Container = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);
  const [searchValue, setSearchValue] = useState("");

  useLayoutEffect(() => {
    if (props.data && props.data.length > 0 && d3Container.current) {
      if (!chartRef.current) {
        chartRef.current = new OrgChart(); // Initialize the OrgChart instance
      }

      chartRef.current
        .container(d3Container.current)
        .data(props.data)
        .initialExpandLevel(props.level)
        .layout("left")
        .pagingStep(2)
        .nodeWidth(() => 180)
        .nodeHeight(() => 50)
        .compact(false)
        .onNodeClick((e: any) => {
          props.onNodeClick(e);
        })
        .nodeContent((node: any) => {
          const str = `
            <div class="relative w-full rounded-xl border border-gray-soft bg-[#ffffff] p-2">
              <div class="absolute -top-[2px] left-0 mx-auto h-[2px] w-[90%]  bg-gradient-to-l from-[#ffffff46] via-[#349affc4]  to-[#ffffffa9]"></div>
              <div class="absolute -bottom-[2px] left-0 mx-auto h-[2px] w-[90%]  bg-gradient-to-l from-[#ffffff46] via-[#349affc4]  to-[#ffffffa9]"></div>
                 <div class="flex  bg-[#ffffff]">
                    <p className="font-title text-xs">LEVEL</p>
                    <p>${node.depth + 1}</p>
                  </div>
              <div class="flex justify-between text-nowrap font-body capitalize">
                <div>referral code: ${
                  node?.data?.user?.referralCode || ""
                }</div>
                <div class="text-accent underline node-details" data-node-id="${
                  node.id
                }">
                  Details
                </div>
              </div>
            </div>
          `;
          return str;
        })
        .render();
      // After rendering, use D3 to select and attach event listeners
      d3.select(d3Container.current)
        .selectAll(".node-details")
        // eslint-disable-next-line no-unused-vars
        .on("click", function () {
          const nodeId = d3.select(this).attr("data-node-id");
          const clickedNode = props.data.find((node) => node.id === nodeId);
          if (clickedNode) {
            // props.openModal(clickedNode); // Call your custom click handler
          }
        });
    }
  }, [props.data, props.onNodeClick]);

  // Function to zoom in
  const zoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoomIn(); // Use the zoomIn method from d3-org-chart
    }
  };

  // Function to zoom out
  const zoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoomOut(); // Use the zoomOut method from d3-org-chart
    }
  };

  // Function to filter nodes based on search
  const filterChart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Update state to reflect the search query

    if (chartRef.current) {
      const data = chartRef.current.data();
      // Clear previous highlighting
      chartRef.current.clearHighlighting();

      // Collapse all nodes
      data.forEach((d: any) => (d._expanded = false));

      // Search and highlight nodes
      data.forEach((d: any) => {
        if (
          value !== "" &&
          d.user.referralCode.toLowerCase().includes(value.toLowerCase())
        ) {
          d._highlighted = true;
          d._expanded = true; // Expand the node if it's a match
        }
      });

      // Update the chart with the filtered data
      chartRef.current.data(data).render().fit();
    }
  };

  return (
    <div className="relative overflow-hidden">
      <input
        type="search"
        placeholder="Search by referralCode"
        value={searchValue}
        onChange={filterChart}
        className="bg mb-4 rounded-xl bg-card p-2 focus:ring-0"
      />
      <div ref={d3Container} className="chart-container" />
      <div className="zoom-controls absolute right-0 top-0 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="h-[30px] w-[30px] rounded-md bg-card text-lg text-black"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="h-[30px] w-[30px] rounded-md bg-card text-lg text-black"
        >
          -
        </button>
      </div>
    </div>
  );
});

export default OrganizationChart;
