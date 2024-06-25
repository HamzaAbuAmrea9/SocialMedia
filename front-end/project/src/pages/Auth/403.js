import React from "react";
import { Link } from "react-router-dom";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        {" "}
        403 - ACCESS DINIED
      </div>
      <div className="subtitle">
        {" "}
        Oops , you dont have permission to access this page.
        <Link
          to={role === "1996" ? "/dashboard/writer" : "/"}
          className="d-block text-center btn btn-primary"
        >
          {" "}
          { role ==="1996" ?"Go to WriterPage":"go  to Homepage"}
        </Link>
      </div>
    </div>
  );
}
