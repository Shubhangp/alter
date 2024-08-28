import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import FeedbackModal from "./components/FeedbackModal";
import { Provider } from "react-redux";
import store from "./utilis/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/" element={<FeedbackModal />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;