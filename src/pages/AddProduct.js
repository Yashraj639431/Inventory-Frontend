import React, { useEffect, useState } from "react";
import BreadCrum from "../components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getElements } from "../features/element/elementSlice";
import { getCategory } from "../features/category/categorySlice";
import { getItem } from "../features/item/itemSlice";
import { getWarehouses } from "../features/warehouse/warehouseSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vals, setVals] = useState([]);
  const elementState = useSelector((state) => state.element.elements);
  const itemState = useSelector((state) => state.item.items);
  const warehouseState = useSelector((state) => state.warehouse.warehouses);
  const categoryState = useSelector((state) => state.category.category);
  const [data, setData] = useState({});
  const [str, setStr] = useState({});
  const [stringing, setStringing] = useState("");
  useEffect(() => {
    dispatch(getElements());
    dispatch(getCategory());

    dispatch(getItem());
    dispatch(getWarehouses());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5000/api/product`;
      console.log(data);
      const userData = {
        title: data.productName[0],
        price: data.price[0],
        qty: data.qty[0],
        desc: data.description[0],
        items: data.items[0],
        elementsVal: stringing.substring(0, stringing.length - 2),
        category: data.category[0],
        warehouse: data.warehouse[0],
        status: data.status[0],
      };
      const res = await axios.post(url, userData);
      console.log(res.data);
      navigate("/admin/manage-product");
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnElementClick = async (id) => {
    try {
      const url = `http://localhost:5000/api/value/${id}`;
      const res = await axios.get(url);
      setVals(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlingDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: [e.target.value],
    });
  };

  useEffect(() => {
    let stringer = "";
    Object.keys(str).forEach((item) => {
      stringer = stringer + str[item] + ",";
    });
    setStringing(stringer);
  }, [str]);
  const handleElemChanger = (e, title) => {
    setStr({ ...str, [title]: e.target.value });
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
            <form onSubmit={handleSubmit} className="form-control-sm p-4">
              <label htmlFor="" className="mb-2">
                Product Name
              </label>
              <input
                onChange={handlingDataChange}
                className="form-control form-control-sm mb-3"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="productName"
              />
              <label htmlFor="" className="mb-2">
                Price
              </label>
              <input
                onChange={handlingDataChange}
                className="form-control form-control-sm mb-3"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="price"
              />
              <label htmlFor="" className="mb-2">
                Quantity
              </label>
              <input
                onChange={handlingDataChange}
                className="form-control form-control-sm mb-3"
                type="text"
                placeholder="Enter elements value"
                id="title"
                name="qty"
              />
              <label htmlFor="" className="mb-2">
                Description
              </label>
              <textarea
                style={{
                  width: "100%",
                  resize: "none",
                  height: "30vh",
                  padding: ".5rem",
                }}
                id="description"
                onChange={handlingDataChange}
                theme="snow"
                name="description"
                className="mb-3 textarea-field"
              />
              <label htmlFor="" className="mb-2">
                Items
              </label>
              <select
                name="items"
                onChange={handlingDataChange}
                id="items"
                className="form-control form-control-sm mb-3"
              >
                <option value="">Select Items</option>
                {itemState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="mb-2">
                Category
              </label>
              <select
                onChange={handlingDataChange}
                name="category"
                id="category"
                className="form-control form-control-sm mb-3"
              >
                <option value="">Select Category</option>
                {categoryState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="" className="mb-2">
                Warehouse
              </label>
              <select
                onChange={handlingDataChange}
                name="warehouse"
                id="warehouse"
                className="form-control form-control-sm mb-3"
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
              <label htmlFor="" className="mb-2">
                Status
              </label>
              <select
                onChange={handlingDataChange}
                name="status"
                id="status"
                className="form-control form-control-sm mb-3"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {elementState.map((i, j) => {
                return (
                  <>
                    <label key={j} className="mb-2">
                      {i.title}
                    </label>
                    <select
                      onClick={() => handleOnElementClick(i._id)}
                      onChange={(e) => handleElemChanger(e, i.title)}
                      name="elementsVal"
                      id="elementsVal"
                      className="form-control form-control-sm mb-3"
                    >
                      <option value="" key={j}>
                        Select {i.title}
                      </option>
                      {
                        <>
                          {vals.length === 0 ? (
                            <>
                              <option>no data</option>
                            </>
                          ) : (
                            <>
                              {vals.map((i, j) => {
                                return (
                                  <option key={j} value={i._id}>
                                    {i.title}
                                  </option>
                                );
                              })}
                            </>
                          )}
                        </>
                      }
                    </select>
                  </>
                );
              })}
              <button
                type="submit"
                className="btn btn-outline-primary mt-3 w-100 mb-3"
              >
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
