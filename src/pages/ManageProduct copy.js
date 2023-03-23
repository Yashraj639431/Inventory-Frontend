import React from "react";
import BreadCrum from "../components/BreadCrum";

const ManageProduct = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Manage Product</h1>
          <BreadCrum className="breadcrum" title="Products" />
        </section>
      </div>
    </>
  );
};

export default ManageProduct;
