import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
  return (
    <div className="flex justify-between ">
      <div>Logo</div>
      <div>Icon</div>
    </div>
  );
};

export default Nav;
