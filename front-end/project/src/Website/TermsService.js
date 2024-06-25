import React from 'react'
import {Link} from "react-router-dom";
export default function TermsService() {
  return (
<div>
   <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        ></link>
  <div>
    {/* nav bar */}
    <nav className="navbar navbar-expand-lg navbar navbar-light bg-primary ">
      <a className="navbar-brand " href="#">
        <span className="navbar-text text-light m-1">
          VIVIDLY
        </span>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse " style={{display: 'flex', justifyContent: 'space-between'}} id="navbarSupportedContent">
        <ul className="navbar-nav   mr-auto">
          <li className="nav-item active ">
            <a className="nav-link text-light  " href="#">Home <span className="sr-only" /></a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#">Templates</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
              Positives
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Social</a>
              <a className="dropdown-item" href="#">Free</a>
            </div>
          </li>
        </ul>
        <form className="m-2" role="search">
          <Link className="btn btn-outline-warning bg-light" to={"/signup"} >Sign Up</Link>
          <Link className="btn btn-outline-warning bg-light" to={"/login"} >Log In</Link>
        </form>
      </div>
    </nav></div>
  <div className="container mt-5">
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1 className="text-center">Terms of Service</h1> 
        <p className="m-1">Welcome to Vividly! These terms of service ("Terms") govern your use of our platform. Please read these Terms carefully before accessing or using our services.</p> <br />
        <h4>1. Introduction</h4> 
        <p>By accessing or using our platform, you agree to comply with these Terms. If you do not agree with any part of these Terms, you may not use our services.</p>
        <h4>2. User Eligibility</h4>
        <p>You must be at least [age requirement] years old to use our platform. By using our services, you warrant that you are legally capable of entering into binding contracts.</p>
        <h4>3. User Responsibilities</h4>
        <p>Users must comply with applicable laws and regulations when using our platform. Users are responsible for any content they post on our platform.</p>
        <h4>4. Intellectual Property</h4>
        <p>We own all intellectual property rights related to our platform. By posting content, users grant us a license to use it on our platform.</p>
        <h4>5. Limitation of Liability</h4>
        <p>We are not liable for any damages arising from the use or inability to use our platform.</p>
        <h4>6. Indemnification</h4>
        <p>Users agree to indemnify and hold us harmless from any claims, damages, or losses.</p>
        <h4>7. Changes to Terms</h4>
        <p>We may modify these Terms at any time, and changes will be effective upon posting.</p>
        <h4>8. Governing Law</h4>
        <p>These Terms are governed by [Jurisdiction]'s laws.</p>
        <h4>9. Contact Us</h4>
        <p>If you have any questions about these Terms, please contact us at [Contact Email].</p>
      </div>
    </div>
  </div>
  <div className="container my-5">
    {/* Footer */}
    <footer className="text-center text-lg-start text-dark " style={{backgroundColor: 'white'}}>
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
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Terms</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Privacy</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Disclaimer</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Accepetable Use</a>
                </li>
              </ul>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 mb-4 mb-md-0">
              <h5 className="text-uppercase">FAQ</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Complaints Policy</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Cookie Notice</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>DMCA</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>USC 2257</a>
                </li>
              </ul>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-4 col-md-3 col-sm-4 col-xs-4 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Help</a>
                </li>
                <li>
                  <a href="#!" className="text-dark " style={{textDecoration: 'none'}}>Referral</a>
                </li>
                <li>
                  <a href="#!" className="text-dark" style={{textDecoration: 'none'}}>Standard Agreement</a>
                </li>
                <h5 className="text-primary mt-3" style={{fontWeight: 'bold'}}>Share vividly</h5>
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
          <a style={{borderRadius: 20}} className="btn btn-outline-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-facebook" />
          </a>
          {/* Twitter */}
          <a style={{borderRadius: 20}} className="btn btn-outline-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-twitter-x" />
          </a>
          {/* Google */}
          <a style={{borderRadius: 20}} className="btn btn-outline-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-google" />
          </a>
          {/* Instagram */}
          <a style={{borderRadius: 20}} className="btn btn-outline-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-instagram" />
          </a>
          {/* Linkedin */}
          <a style={{borderRadius: 20}} className="btn btn-outline-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-linkedin" />
          </a>
          {/* Github */}
          <a style={{borderRadius: 20}} className="btn btn-outline-primary btn-floating m-1" href="#!" role="button"><i className="bi bi-github" />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div className="text-center p-3">
        © 2024 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">2024vividly.com</a>
      </div>
      {/* Copyright */}
    </footer>
    {/* Footer */}
  </div>
  {/* End of .container */}
</div>

  )
}
