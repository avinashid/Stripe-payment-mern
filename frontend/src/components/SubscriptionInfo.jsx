import React, { useState } from "react";
import membership from "../assets/membership.png";
import { MdWorkspacePremium } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../state/userData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SubscriptionInfo = () => {
  const [couponValid, setCouponValid] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponInfo, setCouponInfo] = useState("");
  const userData = useSelector((state) => state.userDataSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userData);

  const handleCoupon = async (e) => {
    setCouponApplied(false);
    setCouponInfo("Loading...");
    dispatch(changeValue({ value: "coupon", newValue: e.target.value }));
    if (e.target.value) {
      setCouponValid(false);
    }
    if (e.target.value === "") {
      setCouponValid(true);
      setCouponInfo("");
    } else {
      const res = await axios.post("http://localhost:5000/api/getCoupons", {
        couponCode: e.target.value,
      });
      if (res.data.length !== 0) {
        setCouponApplied(true);
        setCouponValid(true);
        setCouponInfo("Congratulations: 50% Off");
      } else {
        setCouponInfo("Not a valid coupon");
      }
    }
    if (e.target.value === "") setCouponInfo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/checkout");
  };
  return (
    <div className="flex border border-gray md:flex-row shadow-xl justify-center m-4 p-4 gap-4 flex-col items-center m-auto w-9/12 max-w-[600px]">
      <div className="flex-1 border-b  md:border-r mx-4 pb-6 md:pb-0 md:border-b-0 text-9xl text-blue-600 justify-center flex">
        <MdWorkspacePremium />
      </div>
      <div className="flex-1 self-start flex flex-col gap-4">
        <div className="text-xl">
          HeyDaw <div className="text-4xl text-blue-500">Premium</div>
        </div>
        <div className="text-xs text-gray-500 indent-1">
          Please provide your contact details to continue.
        </div>
        <div className="">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              onChange={(e) =>
                dispatch(
                  changeValue({ value: "name", newValue: e.target.value })
                )
              }
              value={userData.name}
              className="input"
              type="text"
              name=""
              placeholder="Enter your name..."
              required
            />
            <input
              value={userData.email}
              onChange={(e) =>
                dispatch(
                  changeValue({ value: "email", newValue: e.target.value })
                )
              }
              className="input"
              type="email"
              name=""
              id=""
              placeholder="Enter your email..."
              required
            />
            <input
              value={userData.address}
              onChange={(e) =>
                dispatch(
                  changeValue({ value: "address", newValue: e.target.value })
                )
              }
              className="input"
              type="address"
              name=""
              id=""
              placeholder="Enter your address..."
              required
            />
            <div className="text-sm indent-2 text-gray-500">Have a coupon?</div>
            <input
              value={userData.coupon}
              onChange={handleCoupon}
              className="input"
              type="address"
              name=""
              id=""
              placeholder="Enter coupon code..."
            />
            <span className="text-xs indent-2 relative bottom-3 text-green-700">
              {couponInfo}
            </span>
            <button
              disabled={!couponValid}
              type="submit"
              className="input bg-gray-400 text-lg text-white"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
