import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useFormik } from "formik";
import {
  createCategory,
  updateCategory,
  getCategory,
  getACategory,
  deleteCategory,
  resetState,
} from "../features/category/categorySlice";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Category",
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

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const getCategoryId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId, dispatch]);

  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategory());
  }, [dispatch]);

  const newCategory = useSelector((state) => state.category);
  const { categoryName, categoryStatus } = newCategory;

  const categoryState = useSelector((state) => state.category.category);
  const filterData = categoryState.filter((el) => {
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
            <Link to={`/admin/category/${filterData[i]._id}`}>
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
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId, dispatch]);

  const deleteCategories = (e) => {
    dispatch(deleteCategory(e));
    setOpen(false);
    window.location.reload(false);
    dispatch(getCategory());
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName,
      status: categoryStatus,
    },
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategory(data));
        navigate("/admin/category");
        window.location.reload(false);
      } else {
        dispatch(createCategory(values));
        window.location.reload(false);
      }
    },
  });

  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Category</h1>
          <BreadCrum className="breadcrum" title="Category" />
          <Link to="/admin/category">
            <button
              type="button"
              className="btn btn-outline-primary my-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Category
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
              performAction={() => deleteCategories(categoryId)}
              title="Ary you Sure you want to delete this Category ?"
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
                      {getCategoryId !== undefined
                        ? "Update Category"
                        : "Add Category"}
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
                        Category Name
                      </label>
                      <input
                        className="form-control w-100 fs-6"
                        type="text"
                        placeholder="Enter category"
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
                        {getCategoryId !== undefined ? "Update" : "Add"}
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

export default Category;
