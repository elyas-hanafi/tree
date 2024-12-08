"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import OrganizationChartIOS from "./_components/tree-d3-ios";
const tree = {
  id: 1,
  name: "User1",
  walletAddress: "0x1234...abcd",
  depth: 0,
  parentId: null,
  createdAt: "2023-11-15T12:34:56Z",
  updatedAt: "2023-12-05T14:22:10Z",
  level: 1,
  line: "left",
  hasFetchedChildren: true,
  children: [
    {
      id: 2,
      name: "User2",
      walletAddress: "0x5678...efgh",
      depth: 1,
      parentId: 1,
      createdAt: "2023-11-20T09:12:33Z",
      updatedAt: "2023-12-05T14:22:10Z",
      level: 2,
      line: "left",
      hasFetchedChildren: false,
      children: [
        {
          id: 3,
          name: "User3",
          walletAddress: "0x9101...ijkl",
          depth: 2,
          parentId: 2,
          createdAt: "2023-11-25T11:15:45Z",
          updatedAt: "2023-12-05T14:22:10Z",
          level: 3,
          line: "left",
          hasFetchedChildren: false,
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: "User4",
      walletAddress: "0xabcd...efgh",
      depth: 1,
      parentId: 1,
      createdAt: "2023-11-21T10:22:45Z",
      updatedAt: "2023-12-05T14:22:10Z",
      level: 2,
      line: "right",
      hasFetchedChildren: false,
      children: [],
    },
  ],
};

export default function NetworkAdmin() {
  const [ref] = useMeasure();
  const [data, setData] = useState<any>(null);
  const [newLevel] = useState<number>(1);
  const [level, setlevel] = useState<number>(1);
  function transformData(node: any, parentId = "") {
    const transformedNode = {
      name: node.user ? node.user.walletAddress : "Unknown User",
      id: node.id,
      depth: node.depth,
      parentId: parentId,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
      level: node.level,
      line: node.line,
      hasFetchedChildren: false, // Add flag to track if children are fetched
      children: node.children || [],
      ...node,
    };

    const result = [transformedNode];

    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        result.push(...transformData(child, node.id));
      });
    }

    return result;
  }
  useEffect(() => {
    const s = transformData(tree);
    setData(s);
  }, []);

  const handleNodeClick = async (node: any) => {
    setlevel((prev) => prev + 1);
    // Prevent further clicks if children are already fetched
    if (node?.data?.hasFetchedChildren) {
      return;
    }

    // If node is the root, notify that there are no children
    if (node?.data?.isRoot) {
      return;
    }

    // Show the modal with node details
    // If the node is not the root and has a depth > 0, fetch children
    if (
      node?.data?.level > newLevel &&
      !node?.data?.isRoot &&
      node?.depth > 0 &&
      !node?.data?.hasFetchedChildren
    ) {
      // Mark node as having fetched its children to prevent further clicks
      node.data.hasFetchedChildren = true;
    }
  };

  return (
    <>
      <div>
        <div ref={ref} className="h-screen bg-white w-full min-w-0 rounded">
          {data ? (
            <>
              <div className="h-full">
                <OrganizationChartIOS
                  data={data}
                  onNodeClick={handleNodeClick}
                  level={level}
                />
              </div>
            </>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}
