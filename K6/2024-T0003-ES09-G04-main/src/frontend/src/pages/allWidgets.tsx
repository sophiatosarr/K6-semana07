import React from "react";
import { useState, useEffect } from "react";
import AllWidgetsComponent from "../components/allWidgets";
export default function AllWidgets() {
  return (
    <div className="h-screen bg-[#F1ECEC]">
      <div>
        <AllWidgetsComponent />
      </div>
    </div>
  );
}
