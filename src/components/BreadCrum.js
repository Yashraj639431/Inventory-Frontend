import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const BreadCrum = (props) => {
  const { title } = props;
  return (
    <div className="breadcrum py-1">
      <div className="container-xxl">
        <p className="mb-0">
          <Link
            to="/admin"
            className="breadcrum-text text-dark text-decoration-none"
          >
            <AiOutlineHome />
            &nbsp; Home &nbsp;
          </Link>
          {""}/ {title}
        </p>
      </div>
    </div>
  );
};

export default BreadCrum;
