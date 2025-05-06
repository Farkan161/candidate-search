import React from "react";
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <nav>
      <Link to="/">Candidate Search</Link>
      <Link to="/saved">Saved Candidates</Link>
    </nav>
  );
};

export default Nav;