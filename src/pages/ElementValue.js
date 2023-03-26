import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getValues,
  deleteValues,
  resetState
} from "../features/elementValue/elementValueSlice";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
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
  const [valueId, setvalueId] = useState("");
  const [search, setSearch] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setvalueId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getValues());
  }, [dispatch]);

  const valueState = useSelector((state) => state.value.values);
  const filterData = valueState.filter((el) => {
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
      action: (
        <>
          <Link to={`/admin/${filterData[i]._id}`} className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(filterData[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteValue = (e) => {
    dispatch(deleteValues(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getValues());
    }, 100);
  };
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Value</h1>
          <BreadCrum className="breadcrum" title="Values" />
          <button type="button" className="btn btn-outline-primary my-2">
            Add Colors
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
              performAction={() => deleteValue(valueId)}
              title="Ary you Sure you want to delete this Value ?"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ElementColor;