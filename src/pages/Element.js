import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete, AiFillFileAdd } from "react-icons/ai";
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [elementId, setelementId] = useState("");

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
  const filterData = elementState.filter((el) => {
    if (search === "") {
      return el;
    } else {
      return el.title.toLowerCase().includes(search);
    }
  });
  const data1 = [];
  for (let i = 0; i < filterData.length; i++) {
    data1.push({
      key: i + 1,
      title: filterData[i].title,
      status: (
        <div
          style={
            filterData[i].status === "Inactive"
              ? {
                  backgroundColor: "#EBB02D",
                }
              : { backgroundColor: "#245953" }
          }
          className=" text-white p-1 rounded"
        >
          {filterData[i].status}
        </div>
      ),
      action: (
        <>
          <div className="fs-icons fs-4">
            <Link
              to={`/admin/element-${filterData[i].title.toLowerCase()}/`}
              className="text-dark fs-4 bg-transparent border-0 px-4"
            >
              <AiFillFileAdd />
            </Link>
            {/* <Link to={`/admin/element/${filterData[i]._id}`}> */}
            <Link to="/admin/element">
              <BiEdit />
            </Link>
            <button
              className="ms-3 text-danger fs-4 bg-transparent border-0"
              onClick={() => showModal(filterData[i]._id)}
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
        <section className="breadcrumb-header mb-4">
          <h1>Manage Elements</h1>
          <BreadCrum className="breadcrum" title="Elements" />
          <button type="button" className="btn btn-outline-primary my-2">
            Add Elements
          </button>
        </section>
        <section id="main-element-box">
          <div className="main-content">
            <div className="print-buttons m-3">
              <button className="btn btn-secondary btn-sm px-3 me-2">
                Copy
              </button>
              <button className="btn btn-secondary btn-sm px-3 me-2">
                CSV
              </button>
              <button className="btn btn-secondary btn-sm px-3 me-2">
                Excel
              </button>
              <button className="btn btn-secondary btn-sm px-3 me-2">
                Print
              </button>
            </div>
            <div className="input-group">
              <div className="form-outline">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
              <button type="button" className="search-btn btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <Table columns={columns} dataSource={data1} />
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
