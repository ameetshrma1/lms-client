import React, { useEffect, useState } from "react";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import MainComponent from "../../components/MainComponent";
import { Button } from 'antd';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import userEvent from "@testing-library/user-event";

const Dashboard = () => {

  const history = useHistory()
  const cookie = Cookies.get('access_token')
  console.log(cookie)

  return (
    <MainComponent>
      {/* <CustomBereadcrumb items={["Books", "Books List"]} /> */}
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <div className="dashboard-wrapper">
          <h1 className="web-title">Welcome to Library Management System</h1>
          <h2 className="broadway">Broadway Infosys Nepal</h2>
          <h2 className="course">Mern Stack Course</h2>
          <p className="instructor">Instructor: Aashish Dahal</p>
          
        </div>
      </div>
    </MainComponent>
  );
};

export default Dashboard;
