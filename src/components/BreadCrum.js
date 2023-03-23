import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const BreadCrum = (props) => {
  const { title } = props;
  return (
    <div className="breadcrum mx-0 py-1">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="mb-0">
              <Link to="/admin" className="breadcrum-text text-dark text-decoration-none">
                <AiOutlineHome />
                &nbsp; Home &nbsp;
              </Link>
              {""}/ {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrum;
