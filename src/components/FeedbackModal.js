import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);

  // useEffect(() => {
  //   const fetchForm = async () => {
  //     const formCollection = await getDocs(collection(db, "forms"));
  //     setForm(formCollection.docs[0].data());  // You can choose logic to pick the right form.
  //   };

  //   fetchForm();
  // }, []);

  const handleSubmit = () => {
    // Logic to handle feedback submission
    setOpen(false);
  };

  return (
    <div className="p-8">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        onClick={() => setOpen(true)}
      >
        Give Feedback
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{form?.title}</h2>
            {/* Render form fields here */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="mt-4 text-gray-500"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackModal;