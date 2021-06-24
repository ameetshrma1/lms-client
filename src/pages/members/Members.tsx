import React, { useEffect, useState } from "react";
import MainComponent from "../../components/MainComponent";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import TitleComponent from "../../components/TitleComponent";
import { Table, Button } from "antd";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent";

interface IMembers {
  _id: string;
  fullName: string;
  membership: string;
}
const Members = () => {
  const [members, setMembers] = useState([] as IMembers[]);
  const handleMemberEdit = (id: string) => {
    console.log("Member edit Clicked");
  };
  const membersColumns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    {
      title: "Membership Type",
      dataIndex: "membership",
      key: "membership",
    },
    {
      title: "Operations",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => (
        <div className="operation-wrapper">
          <ButtonComponent
            onClick={() => {
              handleMemberEdit(_id);
            }}
            type="primary"
            btnText="Edit"
          />

          <ButtonComponent
            onClick={() => {
              handleMemberEdit(_id);
            }}
            danger
            type="primary"
            btnText="Delete"
          />
        </div>
      ),
    },
  ];

  const fetchAllMembers = async () => {
    const response = await axios.get("http://localhost:4099/api/member/");
    console.log(response);
    setMembers(response.data.data);
  };

  useEffect(() => {
    fetchAllMembers();
  }, []);

  return (
    <MainComponent>
      <CustomBereadcrumb items={["Members"]} />
      <TitleComponent title="Members List" />
      <Table dataSource={members} columns={membersColumns} />
    </MainComponent>
  );
};

export default Members;
