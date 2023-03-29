import React, { useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getElements } from "../features/element/elementSlice";
import { getCategory } from "../features/category/categorySlice";
import { getItem } from "../features/item/itemSlice";
import { getWarehouses } from "../features/warehouse/warehouseSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getElements());
    dispatch(getCategory());
    dispatch(getItem());
    dispatch(getWarehouses());
  }, [dispatch]);

  const elementState = useSelector((state) => state.element.elements);
  const itemState = useSelector((state) => state.item.items);
  const warehouseState = useSelector((state) => state.warehouse.warehouses);
  const categoryState = useSelector((state) => state.category.category);

  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Add Product</h1>
          <BreadCrum className="breadcrum" title="Products" />
        </section>
        <section id="main-element-box">
          <div className="main-content">
            <form
              action=""
              className="form-control form-control-sm" /*onSubmit={formik.handleSubmit} */
            >
              <label htmlFor="">Product Name</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="title"
                // onChange={formik.handleChange("title")}
                // onBlur={formik.handleBlur("title")}
                // value={formik.values.title}
              />
              <label htmlFor="">Price</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="title"
                // onChange={formik.handleChange("title")}
                // onBlur={formik.handleBlur("title")}
                // value={formik.values.title}
              />
              <label htmlFor="">Quantity</label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="title"
                // onChange={formik.handleChange("title")}
                // onBlur={formik.handleBlur("title")}
                // value={formik.values.title}
              />
              <label htmlFor="">Description</label>
              <ReactQuill
                theme="snow"
                name="description"
                className="mb-5"
                style={{ height: "20vh" }}
                // onChange={formik.handleChange("description")}
                // onBlur={formik.handleBlur("description")}
                // val={formik.values.description}
              />
              {elementState.map((i, j) => {
                return (
                  <>
                    <label key={j} htmlFor="">
                      {i.title}
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="form-control form-control-sm"
                      // onBlur={formik.handleBlur("status")}
                      // onChange={formik.handleChange("status")}
                      // value={formik.values.status}
                    >
                      <option value="">Select {i.title}</option>
                      {elementState.map((i, j) => {
                        return (
                          <option key={j} value={i.title}>
                            {i.title}
                          </option>
                        );
                      })}
                    </select>
                  </>
                );
              })}
              <label htmlFor="">Items</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm"
                // onBlur={formik.handleBlur("status")}
                // onChange={formik.handleChange("status")}
                // value={formik.values.status}
              >
                {itemState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="">Category</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm"
                // onBlur={formik.handleBlur("status")}
                // onChange={formik.handleChange("status")}
                // value={formik.values.status}
              >
                {categoryState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="">Warehouse</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm"
                // onBlur={formik.handleBlur("status")}
                // onChange={formik.handleChange("status")}
                // value={formik.values.status}
              >
                {warehouseState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="">Status</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm"
                // onBlur={formik.handleBlur("status")}
                // onChange={formik.handleChange("status")}
                // value={formik.values.status}
              >
                <option value="">Select Status</option>
                <option defaultValue={"Active"}>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddProduct;
