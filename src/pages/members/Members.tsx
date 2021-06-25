import React, { useEffect, useState } from "react";
import MainComponent from "../../components/MainComponent";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import TitleComponent from "../../components/TitleComponent";
import { Table, Button ,Modal,Input } from "antd";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent";


interface IMembers {
  _id: string;
  fullName: string;
  membership: string;
}
const Members = () => {
  const [members, setMembers] = useState([] as IMembers[]);
  const [newMember,setnewMember] = useState({}as IMembers);
  const [showModal, setShowModal] = useState(false as boolean);


  const getAllMembers = async () => {
    const response = await axios.get("http://localhost:4099/api/books");
    setMembers(response.data.data);
  };


  const handleFormSubmit = async () => {
    const response = newMember._id
      ? await axios.patch(
          `http://localhost:4099/api/books/${newMember._id}`,
          newMember
        )
      : await axios.post("http://localhost:4099/api/member", newMember);

    setShowModal(false);
    getAllMembers();
  };

  const handleCancel = () => {
    setnewMember({
     _id:"",
      fullName:"",
     membership:""
    });
    setShowModal(false);
  };
  

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

  const handleClickAddButton = (event: any) => {
    event.persist();
    setShowModal(true);
  };


  return (
    <>
    <MainComponent>
      <CustomBereadcrumb items={["Members"]} />
      <TitleComponent title="Members List"
      addButton="Add Member"
      addBtnClickFunction={handleClickAddButton} />
      <Table dataSource={members} columns={membersColumns} />
    </MainComponent>


<Modal title="Add Members" visible={showModal} onOk={handleFormSubmit} onCancel={handleCancel}>
<label>Full Name :</label>
<Input placeholder="input your name" />
<br/>
<label>Membership :</label>
<br/>
<Input placeholder=" Add Membership" />
</Modal>
</>
  );
};

export default Members;
