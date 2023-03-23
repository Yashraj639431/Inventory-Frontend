import React from "react";
import BreadCrum from "../components/BreadCrum";

const Company = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Company</h1>
          <BreadCrum className="breadcrum" title="Company" />
        </section>
      </div>
    </>
  );
};

export default Company;
