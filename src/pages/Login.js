import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, navigate]);

  return (
    <section id="section">
      <div className="error text-center">
        {message.message === "Rejected" ? "You are not an admin" : ""}
      </div>
      <div className="form-box">
        <div className="form-value">
          <form action="" onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <div className="inputbox">
              <AiOutlineMail className="ion-icon" />
              <input
                type="text"
                name="email"
                label="Email Address"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                autocomplete="off"
                required
              />
              <label for="">Email</label>
            </div>

            <div className="inputbox">
              <RiLockPasswordLine className="ion-icon" />
              <input
                type="password"
                name="password"
                label="Password"
                id="pass"
                val={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                required
              />
              <label for="">Password</label>
            </div>

            <div className="forget">
              <Link to="forgot-password">Forgot Password</Link>
            </div>
            <button type="submit">Log In</button>
            <div className="register">
              <p>
                Don't have an account <Link to="/">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;