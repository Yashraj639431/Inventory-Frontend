import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";

const ForgotPassword = () => {
  return (
    <section id="section">
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h3 className="text-center title">Forgot Password</h3>
            <p className="text-center">Please enter your email to get reset password mail.</p>
            <div className="inputbox w-100">
              <RiLockPasswordLine className="ion-icon" />
              <input
                type="text"
                name="email"
                label="Email Address"
                id="email"
                autocomplete="off"
                required
              />
              <label for="">Email</label>
            </div>
            <button>Send Link</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
