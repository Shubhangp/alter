import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FeedbackForm from "./commonFiles/FeedbackForm";
import { Link } from "react-router-dom";

function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState('');
  const isReload = useSelector((store) => store.reload.isReload);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
  };

  useEffect(() => {
    getForms();
  }, [isReload]);

  const getForms = async() => {
    const fetchData = await fetch('https://alter-backend.vercel.app/api/v1/feedback-form');
    const jsonData = await fetchData.json();
    setForms(jsonData.data.formData);
  }

  const handleUpdateView = async(form) => {
    setLoading(true);
    try {
      await fetch(`https://alter-backend.vercel.app/api/v1/feedback-form/updateView/${form._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      });
      setOpen(true);
      setFormId(form._id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error posting data:', error);
    }
  }

  return (
    <div className="p-8">
      {forms.map((form) => (<button
        disabled={loading}
        className={`${!loading? "bg-blue-500" : "bg-blue-300"} text-white px-4 py-2 rounded shadow-header ${!loading? "hover:bg-blue-600" : "hover:bg-blue-400"}`}
        onClick={() => handleUpdateView(form)}
      >
        {form.published && form.heading}
      </button>))}
      {open && (
        <FeedbackForm formId={formId} setOpen={setOpen} />
      )}
      <Link to={'/admin'} className="absolute right-2 top-3 flex justify-center text-[#5578F4] font-roboto font-semibold">
        Admin 
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
          <g fill="none">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
            <path fill="#5578F4" d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"/>
          </g>
        </svg>
      </Link>
    </div>
  );
}

export default FeedbackModal;