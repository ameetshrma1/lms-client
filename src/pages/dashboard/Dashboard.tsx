import { Breadcrumb } from "antd";
import React, { useState } from "react";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import MainComponent from "../../components/MainComponent";

const Dashboard = () => {
  return (
    <MainComponent>
      <CustomBereadcrumb items={["Books", "Books List"]} />
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        Bill is a cat.
      </div>
    </MainComponent>
  );
};

export default Dashboard;
