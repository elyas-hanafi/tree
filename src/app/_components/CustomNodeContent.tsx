import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomNodeContent = (props: any) => {
  // console.log(props.node.data.user.referralCode)
  return (
    <div className="w-full rounded-xl border border-gray-soft bg-card p-3">
      {/* {props.node.data.name ? `Wallet: ${formatWallet(props.node.data.name, 5, 5)}` : 'No wallet'} */}
      <div className="flex justify-between text-nowrap font-body capitalize">
        <div>referral code: {props?.node?.data?.user?.referralCode}</div>
        <div className="text-accent underline">Details</div>
      </div>
    </div>
  );
};

export default CustomNodeContent;
