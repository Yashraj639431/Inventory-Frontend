import React from "react";
import BreadCrum from "../components/BreadCrum";

const AddProduct = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Add Product</h1>
          <BreadCrum className="breadcrum" title="Products" />
        </section>
      </div>
    </>
  );
};

export default AddProduct;
