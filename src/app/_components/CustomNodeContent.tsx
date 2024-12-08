import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomNodeContent = (props: any) => {
  // console.log(props.node.data.user.referralCode)
  return (
    <div className="h-[120px] w-full rounded-xl border border-[hsla(210,77%,51%,0.1)] bg-[#ffffff] bg-gradient-to-b from-[hsla(210,77%,51%,0.1)] from-[5%] via-[#fdfdfd] via-[80%] to-[#ffffff] to-[10%] p-3">
      <div className="w-full relative h-full">
        <div className="absolute -top-[2px] left-0 mx-auto h-[2px] w-[90%]  bg-gradient-to-l from-[#ffffff46] via-[#349affc4]  to-[#ffffffa9]"></div>
        <div className="flex w-full justify-center">
          <div className="flex h-[50px] w-[50px] flex-col items-center justify-center rounded-full bg-[#ffffff]">
            <p className="font-title text-xs">LEVEL</p>
            <p>{props.node.depth + 1}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-nowrap font-body capitalize">
          <div className=" font-body text-[18px] font-medium">
            referral code: {props?.node?.data?.user?.referralCode}
          </div>
          <div className="text-gray-soft underline hover:text-accent">
            Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNodeContent;
