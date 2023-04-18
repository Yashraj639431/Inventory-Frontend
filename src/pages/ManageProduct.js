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
  updateProduct,
  getProduct,
  getAProduct,
  deleteProduct,
  resetState,
} from "../features/product/productSlice";
import { getWarehouses } from "../features/warehouse/warehouseSlice";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Product",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Qty",
    dataIndex: "qty",
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
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

const ManageProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [prodId, setprodId] = useState("");
  const getprodId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getprodId !== undefined) {
      dispatch(getAProduct(getprodId));
    } else {
      dispatch(resetState());
    }
  }, [getprodId, dispatch]);

  const showModal = (e) => {
    setOpen(true);
    setprodId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProduct());
    dispatch(getWarehouses())
  }, [dispatch]);

  const newProduct = useSelector((state) => state.product);
  const {
    productName,
    productStatus,
    productPrice,
    productQty,
    productWarehouse,
  } = newProduct;

  const warehouseState = useSelector((state) => state.warehouse.warehouses);
  const productState = useSelector((state) => state.product.product);
  const filterData = productState.filter((el) => {
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
      price: filterData[i].price,
      qty: filterData[i].qty,
      warehouse: filterData[i].warehouse,
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
            <Link to={`/admin/manage-product/${filterData[i]._id}`}>
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

  const deleteProducts = (e) => {
    dispatch(deleteProduct(e));
    setOpen(false);
    window.location.reload(false);
    dispatch(getProduct());
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName,
      price: productPrice,
      qty: productQty,
      warehouse: productWarehouse,
      status: productStatus,
    },
    onSubmit: (values) => {
      if (getprodId !== undefined) {
        const data = { id: getprodId, productData: values };
        dispatch(updateProduct(data));
        navigate("/admin/manage-product");
        window.location.reload(false);
      } else {
        navigate("admin/add-product");
      }
    },
  });

  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Manage Product</h1>
          <BreadCrum className="breadcrum" title="Products" />
          <Link to="/admin/add-product">
            <button
              type="button"
              className="btn btn-outline-primary my-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Products
            </button>
          </Link>
        </section>
        <section id="main-element-box">
          <div className="print-buttons m-3">
            <button className="btn btn-secondary btn-sm px-3 me-2">Copy</button>
            <button className="btn btn-secondary btn-sm px-3 me-2">CSV</button>
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
            performAction={() => deleteProducts(prodId)}
            title="Ary you Sure you want to delete this Product ?"
          />
          <div className="create-element">
            <div
              style={{ height: "100vh" }}
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog position-relative">
                <div className="modal-content" style={{ height: "85vh" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Update Product
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
                      <label htmlFor="" className="fs-6 mb-2">
                        Product Name
                      </label>
                      <input
                        className="form-control w-100 fs-6"
                        type="text"
                        placeholder="Enter Product"
                        id="title"
                        name="title"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                      />
                      <label htmlFor="" className="fs-6 mb-2 mt-3">
                        Price
                      </label>
                      <input
                        className="form-control w-100 fs-6"
                        type="number"
                        placeholder="Enter Product Price"
                        id="price"
                        name="price"
                        onChange={formik.handleChange("price")}
                        onBlur={formik.handleChange("price")}
                        value={formik.values.price}
                      />
                      <label htmlFor="" className="fs-6 mb-2 mt-3">
                        Quantity
                      </label>
                      <input
                        className="form-control w-100 fs-6"
                        type="number"
                        placeholder="Enter elements value"
                        id="qty"
                        name="qty"
                        onChange={formik.handleChange("qty")}
                        onBlur={formik.handleChange("qty")}
                        value={formik.values.qty}
                      />
                      <label htmlFor="" className="fs-6 mb-2 mt-3">
                        Warehouse
                      </label>
                      <select
                        name="warehouse"
                        id="warehouse"
                        className="form-control form-control-sm"
                        onChange={formik.handleChange("warehouse")}
                        onBlur={formik.handleChange("warehouse")}
                        value={formik.values.warehouse}
                      >
                        <option value="">Select Warehouse</option>
                        {warehouseState.map((i, j) => {
                          return (
                            <>
                              <option key={j} value={i.title}>
                                {i.title}
                              </option>
                            </>
                          );
                        })}
                      </select>
                      <label htmlFor="" className="fs-6 w-100 mt-3 mb-2">
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
                        Update
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

export default ManageProduct;
