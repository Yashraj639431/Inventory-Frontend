import React, { useState, useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useFormik } from "formik";
import {
  createItem,
  updateItem,
  getItem,
  getAItem,
  deleteItem,
  resetState,
} from "../features/item/itemSlice";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Item",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
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

const Items = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [itemId, setitemId] = useState("");
  const getItemId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getItemId !== undefined) {
      dispatch(getAItem(getItemId));
    } else {
      dispatch(resetState());
    }
  }, [getItemId, dispatch]);

  const showModal = (e) => {
    setOpen(true);
    setitemId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getItem());
  }, [dispatch]);

  const newItem = useSelector((state) => state.item);
  const { itemName, itemStatus } = newItem;

  const itemState = useSelector((state) => state.item.items);
  const filterData = itemState.filter((el) => {
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
            <Link to={`/admin/item/${filterData[i]._id}`}>
              <button
                type="button"
                className="btn btn-outline-primary my-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <BiEdit />
              </button>
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

  useEffect(() => {
    if (getItemId !== undefined) {
      dispatch(getAItem(getItemId));
    } else {
      dispatch(resetState());
    }
  }, [getItemId, dispatch]);

  const deleteItems = (e) => {
    dispatch(deleteItem(e));
    setOpen(false);
    window.location.reload(false);
    dispatch(getItem());
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: itemName,
      status: itemStatus,
    },
    onSubmit: (values) => {
      if (getItemId !== undefined) {
        const data = { id: getItemId, itemData: values };
        dispatch(updateItem(data));
        navigate("/admin/item");
        window.location.reload(false);
      } else {
        dispatch(createItem(values));
        window.location.reload(false);
      }
    },
  });
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Items</h1>
          <BreadCrum className="breadcrum" title="Items" />
          <Link to="/admin/item">
            <button
              type="button"
              className="btn btn-outline-primary my-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Items
            </button>
          </Link>
        </section>
        <section id="main-element-box">
          {" "}
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
              performAction={() => deleteItems(itemId)}
              title="Ary you Sure you want to delete this Item ?"
            />
          </div>
          <div className="create-element">
            <div
              style={{ height: "55vh" }}
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog position-relative">
                <div className="modal-content" style={{ height: "55vh" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {getItemId !== undefined ? "Update Item" : "Add Item"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form action="" onSubmit={formik.handleSubmit}>
                      <label htmlFor="" className="fs-4 w-100 mb-2">
                        Item Name
                      </label>
                      <input
                        className="form-control w-100 fs-6"
                        type="text"
                        placeholder="Enter item value"
                        id="title"
                        name="title"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                      />
                      <label htmlFor="" className="fs-4 w-100 mt-3 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="form-control mb-3 fs-6"
                        onBlur={formik.handleBlur("status")}
                        onChange={formik.handleChange("status")}
                        value={formik.values.status}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        {getItemId !== undefined ? "Update" : "Add"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Items;
