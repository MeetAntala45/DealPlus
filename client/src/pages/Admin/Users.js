import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/LoadersSlice";
import { GetProducts, updateProductStatus } from "../../Apicalls/products";
import moment from "moment";
import { UpdateUserStatus, getAllUsers } from "../../Apicalls/users";

// dataIndex must match with aproprite mongoDb proprty

const Users = () => {
  const [users, setusers] = useState([]);
  const disptach = useDispatch();


  const getData = async () => {
    try {
      disptach(SetLoader(true));
      const response = await getAllUsers(null);
      if (response.success) {
        disptach(SetLoader(false));
        setusers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      disptach(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      disptach(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      disptach(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      disptach(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;

        // if(userId)

        return (
           
          <div className="flex gap-3 ">
            {status === "active" && (
              <span
                className="cursor-pointer text-red-400"

                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className=" cursor-pointer  text-green-400 "
                onClick={() => onStatusUpdate(_id, "active")}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];


  // console.log(userId)

  return (
    <div>
      <Table columns={columns} dataSource={users}></Table>
    </div>
  );
};

export default Users;
