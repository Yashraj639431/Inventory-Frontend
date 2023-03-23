import React from "react";
import BreadCrum from "../components/BreadCrum";

const Items = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Items</h1>
          <BreadCrum className="breadcrum" title="Items" />
        </section>
      </div>
    </>
  );
};

export default Items;
