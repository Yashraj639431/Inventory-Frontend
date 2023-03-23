import React from "react";
import BreadCrum from "../components/BreadCrum";

const AddOrder = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Add Order</h1>
          <BreadCrum className="breadcrum" title="Orders" />
        </section>
      </div>
    </>
  );
};

export default AddOrder;
