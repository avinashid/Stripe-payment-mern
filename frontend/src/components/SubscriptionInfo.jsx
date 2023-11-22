import React from "react";
import membership from "../assets/membership.png";

const SubscriptionInfo = () => {
  return (
    <div className="flex border border-gray shadow-xl justify-center m-4 p-4 gap-4 items-center m-auto max-w-2xl ">
      <div className="flex-1  border-r p-8 ">
        <img src={membership} alt="" />
      </div>
      <div className="flex-1">Hi</div>
    </div>
  );
};

export default SubscriptionInfo;
