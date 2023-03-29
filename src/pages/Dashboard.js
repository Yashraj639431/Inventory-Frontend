import React, { useState, useEffect } from "react";
import BreadCrum from "../components/BreadCrum";
import { Link } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [elemCount, setElemCount] = useState(0);
  const fetchData = async () => {
    try {
      const url = `http://localhost:5000/api/count`;
      const res = await axios.get(url);
      setElemCount(res.data);
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-layout">
        <section className="breadcrumb-header">
          <h1>Dashboard</h1>
          <BreadCrum title="Dashboard" />
        </section>
        <section>
          <div className="row">
            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-purple">
                <div className="inner">
                  <h3>0</h3>
                  <h4>
                    <b>Total Items</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-cubes"></i>
                </div>
                <Link to="item" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-teal">
                <div className="inner">
                  <h3>{elemCount.category}</h3>
                  <h4>
                    <b>Total Category</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-th"></i>
                </div>
                <Link to="category" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-yellow">
                <div className="inner">
                  <h3>{elemCount.element}</h3>
                  <h4>
                    <b>Total Elements </b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-file"></i>
                </div>
                <Link to="element" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-green">
                <div className="inner">
                  <h3>0</h3>
                  <h4>
                    <b>Total Sales</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-dollar-sign"></i>{" "}
                </div>
                <Link to="manage-order" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-primary">
                <div className="inner">
                  <h3>0</h3>
                  <h4>
                    <b>Total Products</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-cube"></i>
                </div>
                <Link to="manage-product" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-olive">
                <div className="inner">
                  <h3>0</h3>
                  <h4>
                    <b>Paid Orders</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-check"></i>
                </div>
                <Link to="manage-order" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-maroon">
                <div className="inner">
                  <h3>0</h3>
                  <h4>
                    <b>UnPaid Orders</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-spinner"></i>
                </div>
                <Link to="manage-order" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-aqua">
                <div className="inner">
                  <h3>0</h3>
                  <h4>
                    <b>Total Members</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-users"></i>
                </div>
                <Link to="manage-member" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>

            <div className="box col-lg-3 col-xs-6">
              <div className="custom-img small-box bg-red">
                <div className="inner">
                  <h3>{elemCount.warehouse}</h3>
                  <h4>
                    <b>Total Warehouse</b>
                  </h4>
                </div>
                <div className="icon">
                  <i className="fa fa-university"></i>
                </div>
                <Link to="warehouse" className="small-box-footer">
                  More Info <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
