import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import FormEditor from "./FormEditor";
import ViewSubmission from "./ViewSubmission";

function AdminPanel() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form-editor/:formId" element={<FormEditor />} />
        <Route path="/view/:formId" element={<ViewSubmission />} />
      </Routes>
    </div>
  );
}

export default AdminPanel;