import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getElements,
  deleteElements,
  resetState,
} from "../features/element/elementSlice";

const columns = [
  {
    title: "title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Total Value",
    dataIndex: ""
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
  const [open, setOpen] = useState(false);
  const [elementId, setelementId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setelementId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getElements());
  }, [dispatch]);
  const elementState = useSelector((state) => state.element.elements);
  const data1 = [];
  for (let i = 0; i < elementState.length; i++) {
    data1.push({
      title: elementState[i].title,
      status: elementState[i].status,
      action: (
        <>
          <Link to={`/admin/element-${elementState[i].title.toLowerCase()}/`} className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(elementState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
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
            <h3 className="mb-4 title">Element Color</h3>
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
