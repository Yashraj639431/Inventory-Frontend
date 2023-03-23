import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getColors,
  deleteColors,
  resetState,
} from "../features/elementColor/elementColorSlice";

const columns = [
  {
    title: "Elements Value",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ElementColor = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      title: colorState[i].title,
      status: colorState[i].status,
      action: (
        <>
          <Link to="" className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteColors(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Colors</h1>
          <BreadCrum className="breadcrum" title="Colors" />
        </section>
        <section>
          <div>
            <h3 className="mb-4 title">Element Colors</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              hideModal={hideModal}
              open={open}
              performAction={() => deleteColor(colorId)}
              title="Ary you Sure you want to delete this Color ?"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ElementColor;
