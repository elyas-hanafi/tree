import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomNodeContent = (props: any) => {
  // console.log(props.node.data.user.referralCode)
  return (
    <div className="w-full rounded-xl border border-gray-soft bg-card p-3">
      <div className="absolute -top-[2px] left-0 mx-auto h-[2px] w-[90%]  bg-gradient-to-l from-[#ffffff46] via-[#349affc4]  to-[#ffffffa9]"></div>
      <div className="absolute -bottom-[2px] left-0 mx-auto h-[2px] w-[90%]  bg-gradient-to-l from-[#ffffff46] via-[#349affc4]  to-[#ffffffa9]"></div>
      <div className="flex  bg-[#ffffff]">
        <p className="font-title text-xs">LEVEL</p>
        <p>${props.node.depth + 1}</p>
      </div>
      <div className="flex justify-between text-nowrap font-body capitalize">
        <div>referral code: ${props.node?.data?.user?.referralCode || ""}</div>
        <div
          className="text-accent underline node-details"
          data-node-id="${node.id}"
        >
          Details
        </div>
      </div>
    </div>
  );
};

export default CustomNodeContent;
