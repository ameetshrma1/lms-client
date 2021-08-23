import React, { useEffect, useState } from "react";
import MainComponent from "../../components/MainComponent";
import CustomBereadcrumb from "../../components/CustomBereadcrumb";
import TitleComponent from "../../components/TitleComponent";
import { Table, Button, Modal, Input, Select } from "antd";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent";
import Cookies from "js-cookie";
const { Option } = Select;

interface IMembers {
  _id: string;
  fullName: string;
  membership: string;
}
const Members = () => {
  const [members, setMembers] = useState([] as IMembers[]);
  const [newMember, setnewMember] = useState({} as IMembers);
  const [showModal, setShowModal] = useState(false as boolean);

  let isEditModal = false;

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  };

  const getAllMembers = async () => {
    const response = await axios.get("http://localhost:4099/api/member");
    setMembers(response.data.data);
  };

  const handleFormSubmit = async () => {
    const response = newMember._id
      ? await axios.patch(
          `http://localhost:4099/api/member/${newMember._id}`,
          newMember
        )
      : await axios.post("http://localhost:4099/api/member", newMember);

    setShowModal(false);
    getAllMembers();
  };

  const handleCancel = () => {
    setnewMember({
      _id: "",
      fullName: "",
      membership: "",
    });
    setShowModal(false);
  };

  const handleMemberEdit = async (id: string) => {
    const response = await axios.get(`http://localhost:4099/api/member/${id}`);
    setnewMember(response.data.data);
    setShowModal(true);
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
            name="edit"
          />

          <ButtonComponent
            onClick={() => {
              handleMemberDelete(_id);
            }}
            danger
            type="primary"
            btnText="Delete"
            name="delete"
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

  const handleChange = (event: any) => {
    event.persist();
    setnewMember({
      ...newMember,
      [event.target.name]: event.target.value,
    });
  };

  const handleMembershipChange = (value: string) => {
    setnewMember({
      ...newMember,
      membership: value,
    });
  };

  const handleMemberDelete = async (id: string) => {
    const resposne = await axios.delete(
      `http://localhost:4099/api/member/${id}`
    );
    fetchAllMembers();
  };

  return (
    <>
      <MainComponent>
        <CustomBereadcrumb items={["Members"]} />
        <TitleComponent
          title="Members List"
          addButton="Add Member"
          addBtnClickFunction={handleClickAddButton}
        />
        <Table dataSource={members} columns={membersColumns} />
      </MainComponent>

      <Modal
        title="Add Members"
        visible={showModal}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
      >
        <label>Full Name :</label>
        <Input
          name="fullName"
          onChange={handleChange}
          placeholder="input your name"
          value={newMember.fullName}
        />
        <br />
        <label>Membership :</label>
        <br />
        {/* <Input
          name="membership"
          onChange={handleChange}
          placeholder=" Add Membership"
          value={newMember.membership}
        /> */}

        <Select
          defaultValue="Temporary Member"
          style={{ width: "100%" }}
          onChange={handleMembershipChange}
          value={newMember.membership}
        >
          <Option value="Lifetime Member">Lifetime Member</Option>
          <Option value="Temporary Member">Temporary Member</Option>
        </Select>
      </Modal>
    </>
  );
};

export default Members;
