import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getElements } from "../features/element/elementSlice";
import { getCategory } from "../features/category/categorySlice";
import { getItem } from "../features/item/itemSlice";
import { getWarehouses } from "../features/warehouse/warehouseSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [vals, setVals] = useState([]);
  const [loading, setLoading] = useState(false);
  const elementState = useSelector((state) => state.element.elements);
  const itemState = useSelector((state) => state.item.items);
  const warehouseState = useSelector((state) => state.warehouse.warehouses);
  const categoryState = useSelector((state) => state.category.category);

  const fetchVals = async (elementId) => {
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/value/${elementId}`;
      const res = await axios.get(url);
      if (res.status === 404) {
        setVals([]);
      }
      setVals(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(vals);
  useEffect(() => {
    dispatch(getElements());
    dispatch(getCategory());
    dispatch(getItem());
    dispatch(getWarehouses());
  }, [dispatch]);

  console.log(vals);
  const handleOnElementClick = (id) => {
    fetchVals(id);
  };
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Add Product</h1>
          <BreadCrum className="breadcrum" title="Products" />
        </section>
        <section id="main-element-box">
          <div className="main-content">
            <form action="" className="form-control-sm p-4">
              <label htmlFor="" className="mb-2">Product Name</label>
              <input
                className="form-control form-control-sm mb-3"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="title"
              />
              <label htmlFor="" className="mb-2">Price</label>
              <input
                className="form-control form-control-sm mb-3"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="title"
              />
              <label htmlFor="" className="mb-2">Quantity</label>
              <input
                className="form-control form-control-sm mb-3"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="title"
              />
              <label htmlFor="" className="mb-2">Description</label>
              <ReactQuill
                theme="snow"
                name="description"
                className="mb-5 mb-3"
                style={{ height: "20vh" }}
              />
              {elementState.map((i, j) => {
                return (
                  <>
                    <label key={j} htmlFor="" className="mb-2">
                      {i.title}
                    </label>
                    <select
                      onClick={() => handleOnElementClick(i._id)}
                      name="status"
                      id="status"
                      className="form-control form-control-sm mb-3"
                    >
                      <option value="">Select {i.title}</option>
                      {loading ? (
                        <>
                          <option value="loading">loading</option>
                        </>
                      ) : (
                        <>
                          {vals.length === 0 ? (
                            <>
                              <option>no data</option>
                            </>
                          ) : (
                            <>
                              {vals.map((i, j) => {
                                return (
                                  <option key={j} value={i.title}>
                                    {i.title}
                                  </option>
                                );
                              })}
                            </>
                          )}
                        </>
                      )}
                    </select>
                  </>
                );
              })}
              <label htmlFor="" className="mb-2">Items</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm mb-3"
              >
                {itemState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="mb-2">Category</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm mb-3"
              >
                {categoryState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="mb-2">Warehouse</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm mb-3"
              >
                {warehouseState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="mb-2">Status</label>
              <select
                name="status"
                id="status"
                className="form-control form-control-sm mb-3"
              >
                <option value="">Select Status</option>
                <option defaultValue={"Active"}>Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button className="btn btn-outline-primary mt-3 w-100 mb-3">
                Add Product
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddProduct;
