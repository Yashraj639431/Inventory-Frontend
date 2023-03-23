import React from "react";
import BreadCrum from "../components/BreadCrum";

const Category = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Category</h1>
          <BreadCrum className="breadcrum" title="Category" />
        </section>
      </div>
    </>
  );
};

export default Category;
