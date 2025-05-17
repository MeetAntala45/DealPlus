import { Tabs } from "antd";
import React from "react";
import Products from "./Products/Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center mb-6">
                User Profile
              </h2>
              <div className="flex flex-col space-y-4">
                <span className="text-xl flex justify-between items-center">
                  <span className="uppercase">Name:</span>
                  <span>{user.name}</span>
                </span>

                <span className="text-xl flex justify-between items-center">
                  <span className="uppercase">Email:</span>
                  <span>{user.email}</span>
                </span>

                <span className="text-xl flex justify-between items-center">
                  <span className="uppercase">Create Account Date:</span>
                  <span>
                    {moment(user.createdAt).format("MMM D, YYYY hh:mm A")}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
