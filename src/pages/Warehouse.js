import React from "react";
import BreadCrum from "../components/BreadCrum";

const Warehouse = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Warehouse</h1>
          <BreadCrum className="breadcrum" title="Warehouse" />
        </section>
      </div>
    </>
  );
};

export default Warehouse;
