import React, { useState } from "react";
import logo from "../../images/google.png";
import Logo from "../../Website/images/project_Logo.png";
import axios from "axios";
import Cookie from "universal-cookie";
import LoadingSubmit from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ["user"],
  });

  const [err, seterr] = useState("");

  const [Loading, Setloading] = useState(false);

  const cookie = new Cookie();
  const nav = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    Setloading(true);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/signup`,
        formData
      );
      Setloading(false);
      const token = res.data.accessToken;
      cookie.set("socialmedia", token);

      nav("/login");
    } catch (error) {
      Setloading(false);
      if (error.response.status === 400) {
        seterr("Email Or UserName is already been taken");
      } else {
        seterr("Internal server error");
      }
    }
  }

  return (
    <>
      {Loading && <LoadingSubmit />}
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        ></link>
        {/*--------------------- Main Container ------------------------*/}
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          {/*--------------------- Login Container ------------------------*/}
          {/*------------------------- Left Box ---------------------------*/}
          {/*------------------------- Left Box ---------------------------*/}

          <div
            className="col-md-8 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#c1c4c7", height: "100vh" }}
          >
            <div className="featured-image mb-3">
              <img
                src={Logo}
                className="img-fluid"
                style={{ width: "250px" }}
                alt="Vividly Logo"
              />
            </div>
            <p
              className="text-black fs-2"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 600,
              }}
            >
              Be Verified
            </p>
            <small
              className="text-black text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              Join experienced Designers on this platform.
            </small>
          </div>
          {/*------------------ ------ Right Box --------------------------*/}
          <div className="col-md-6 right-box " style={{ width: 400 }}>
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2 className="text-primary">Sign Up</h2>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="UserName..."
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
              <div className="input-group mb-3" style={{display:"none"}}>
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="role"
                  value={formData.role}
                />
              </div>
              <div className="input-group mb-3">
                <button
                  style={{ borderRadius: 20 }}
                  className="btn btn-lg btn-primary w-40 fs-6"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
                {err !== "" && <span className="error">{err}</span>}
              </div>
              
              <p style={{ color: "black", fontWeight: 500 }}>
                By signing up you agree to our{" "}
                <a href="/Terms_service">Terms of Service </a> and
                <a href="/policy">Privacy Policy</a> and confirm that you are at
                least 18 years old.
              </p>
              <div className="row">
                <small style={{ color: "black", fontWeight: 500 }}>
                  Already have an account? <a href="/login">Log in</a>
                </small>
              </div>
              <hr className="mt-4" />
              <p className="text-secondary">or</p>
              <p className="text-">Sign Up with</p>

              <div
                className="input-group mb-3 m-1 "
                style={{ width: 250, height: 30 }}
              >
                <button
                  className="btn btn-lg btn-light w-100 fs-6"
                  style={{ borderRadius: 20, background: "blue" }}
                >
                  <img src={logo} style={{ width: 20 }} className="me-2" />
                  <a
                    href="http://127.0.0.1:8000/login-google"
                    style={{ color: "white" }}
                  >
                    {" "}
                    <small>Sign In with Google</small>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container my-5">
          {/* Footer */}
          <footer
            className="text-center text-lg-start text-dark "
            style={{ backgroundColor: "white" }}
          >
            {/* Grid container */}
            <div className="container p-4 pb-0">
              {/* Section: Links */}
              <section className>
                {/*Grid row*/}
                <div className="row">
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4 mb-md-0">
                    <h5 className="text-uppercase">About</h5>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Terms
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Privacy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Disclaimer
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Accepetable Use
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4 mb-md-0">
                    <h5 className="text-uppercase">FAQ</h5>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Complaints Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Cookie Notice
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          DMCA
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          USC 2257
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*Grid column*/}
                  {/*Grid column*/}
                  <div className="col-lg-4 col-md-3 col-sm-4 col-xs-4 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Contact</h5>
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Help
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark "
                          style={{ textDecoration: "none" }}
                        >
                          Referral
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          Standard Agreement
                        </a>
                      </li>
                      <h5
                        className="text-primary mt-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Share vividly
                      </h5>
                    </ul>
                  </div>
                  {/*Grid column*/}
                  {/*Grid column*/}
                </div>
                {/*Grid row*/}
              </section>
              {/* Section: Links */}
              {/* Section: Social media */}
              <section className="mb-4 text-end ">
                {/* Facebook */}
                <a
                  style={{ borderRadius: 20, background: "blue" }}
                  className="btn btn-outline-primary btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="bi bi-facebook" />
                </a>
                {/* Twitter */}
                <a
                  style={{ borderRadius: 20, background: "blue" }}
                  className="btn btn-outline-primary btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="bi bi-twitter-x" />
                </a>
                {/* Google */}
                <a
                  style={{ borderRadius: 20, background: "blue" }}
                  className="btn btn-outline-primary btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="bi bi-google" />
                </a>
                {/* Instagram */}
                <a
                  style={{ borderRadius: 20, background: "blue" }}
                  className="btn btn-outline-primary btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="bi bi-instagram" />
                </a>
                {/* Linkedin */}
                <a
                  style={{ borderRadius: 20, background: "blue" }}
                  className="btn btn-outline-primary btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="bi bi-linkedin" />
                </a>
                {/* Github */}
                <a
                  style={{ borderRadius: 20, background: "blue" }}
                  className="btn btn-outline-primary btn-floating m-1"
                  href="#!"
                  role="button"
                >
                  <i className="bi bi-github" />
                </a>
              </section>
              {/* Section: Social media */}
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div className="text-center p-3">
              © 2024 Copyright:
              <a className="text-dark" href="https://mdbootstrap.com/">
                2024vividly.com
              </a>
            </div>
            {/* Copyright */}
          </footer>
          {/* Footer */}
        </div>
        {/* End of .container */}
      </div>
    </>
  );
}
