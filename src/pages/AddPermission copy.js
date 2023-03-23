import React from "react";
import BreadCrum from "../components/BreadCrum";

const AddPermission = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
        <h1>Add Permission</h1>
        <BreadCrum className="breadcrum" title="Permissions" />
        </section>
      </div>
    </>
  );
};

export default AddPermission;
