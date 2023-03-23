import React from "react";
import BreadCrum from "../components/BreadCrum";

const ManageMember = () => {
  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Manage Member</h1>
          <BreadCrum className="breadcrum" title="Members" />
        </section>
      </div>
    </>
  );
};

export default ManageMember;
