import React from 'react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    
<div>
<link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        ></link>
  <div>
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
        <h1 className="mb-4 text-center">Privacy Policy</h1>
        <h4>1- Information We Collect</h4>
        <p>We collect information such as...</p>
        <h4>2- How We Use Your Information</h4>
        <p>We use your information for...</p>
        <h4>3- Sharing of Your Information</h4>
        <p>We may share your information with...</p>
        <h4>4- Security</h4>
        <p>We take steps to protect your information...</p>
        <h4>5- Changes to This Privacy Policy</h4>
        <p>We may update our Privacy Policy from time to time...</p>
        <h4>6- Contact Us</h4>
        <p>If you have any questions about this Privacy Policy, please contact us...</p>
      </div>
      <hr />
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
  </div>
</div>

  )
}
