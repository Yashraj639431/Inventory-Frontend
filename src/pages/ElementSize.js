import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getAllSize,
  deleteSizes,
  resetState,
} from "../features/elementSize/elementSizeSlice";

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
  const [sizeId, setsizeId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setsizeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllSize());
  }, [dispatch]);
  const sizeState = useSelector((state) => state.size.size);
  const data1 = [];
  for (let i = 0; i < sizeState.length; i++) {
    data1.push({
      title: sizeState[i].title,
      status: sizeState[i].status,
      action: (
        <>
          <Link to="" className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(sizeState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteSize = (e) => {
    dispatch(deleteSizes(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllSize());
    }, 100);
  };
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Sizes</h1>
          <BreadCrum className="breadcrum" title="Sizes" />
        </section>
        <section>
          <div>
            <h3 className="mb-4 title">Element Size</h3>
            <div>
              <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
              hideModal={hideModal}
              open={open}
              performAction={() => deleteSize(sizeId)}
              title="Ary you Sure you want to delete this Size ?"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ElementColor;
