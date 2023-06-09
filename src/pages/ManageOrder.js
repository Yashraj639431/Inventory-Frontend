import React from "react";
import BreadCrum from "../components/BreadCrum";

const ManageOrder = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Manage Order</h1>
          <BreadCrum className="breadcrum" title="Orders" />
        </section>
      </div>
    </>
  );
};

export default ManageOrder;
