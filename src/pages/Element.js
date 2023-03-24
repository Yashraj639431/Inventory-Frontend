import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete, AiFillFileAdd } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import {
  getElements,
  deleteElements,
  resetState,
} from "../features/element/elementSlice";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Elements",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Total Value",
    dataIndex: "total",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ElementColor = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [elementId, setelementId] = useState("");

  const getElementId = location.pathname.split("/")[3];
  console.log(getElementId)

  const showModal = (e) => {
    setOpen(true);
    setelementId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getElements());
  }, [dispatch]);
  const elementState = useSelector((state) => state.element.elements);
  console.log(elementState.length)
  const data1 = [];
  for (let i = 0; i < elementState.length; i++) {
    data1.push({
      key: i + 1,
      title: elementState[i].title,
      status: (
        <div
          style={
            elementState[i].status === "Inactive"
              ? {
                  backgroundColor: "#EBB02D",
                }
              : { backgroundColor: "#245953" }
          }
          className=" text-white p-1 rounded"
        >
          {elementState[i].status}
        </div>
      ),
      action: (
        <>
          <div className="fs-icons">
            <Link
              to={`/admin/element-${elementState[i].title.toLowerCase()}/`}
              className="text-dark fs-4 bg-transparent border-0 px-4"
            >
              <AiFillFileAdd />
            </Link>
            <Link to={`/admin/element/${elementState[i]._id}`}>
                <BiEdit />
            </Link>
            <button
              className="ms-3 text-danger fs-4 bg-transparent border-0"
              onClick={() => showModal(elementState[i]._id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </>
      ),
    });
  }

  const deleteElement = (e) => {
    dispatch(deleteElements(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getElements());
    }, 100);
  };

  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Elements</h1>
          <BreadCrum className="breadcrum" title="Elements" />
        </section>
        <section>
          <div>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              hideModal={hideModal}
              open={open}
              performAction={() => deleteElement(elementId)}
              title="Ary you Sure you want to delete this Element ?"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ElementColor;
