import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditFormHeading from "./commonFiles/EditFormHeading";
import { useDispatch, useSelector } from "react-redux";
import { toogleReload } from "../utilis/reloadSlice";
import { titleData } from "../utilis/titleSlice";

function Dashboard() {
  const [forms, setForms] = useState([]);
  const [newForm, setNewForm] = useState(false);
  const title = useSelector((store) => store.title.details);
  const [loading, setLoading] = useState(false);
  const isReload = useSelector((store) => store.reload.isReload);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getForms();
  }, [isReload]);

  const getForms = async() => {
    const fetchData = await fetch('https://alter-backend.vercel.app/api/v1/feedback-form');
    const jsonData = await fetchData.json();
    setForms(jsonData.data.formData);
  }

  const handleDelete = (id) => {
    setLoading(true);
    const deleteUrl = `https://alter-backend.vercel.app/api/v1/feedback-form/${id}`;
    fetch(deleteUrl, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.ok) {
        alert('Form deleted successfully');
        dispatch(toogleReload());
      } else {
        console.error('Failed to delete resource');
      }
    })
    .catch((error) => {
      console.error('Network error:', error);
    });
    setLoading(false);
  }

  const handleEdit = async(form) => {
    dispatch(titleData(form.heading));
    navigate(`/admin/form-editor/${form._id}`);
  }

  return (
    <>
      <div className={`flex flex-col bg-[#F3F3F3] ${forms.length <= 3  && "h-screen"}`}>
          {/* Header */}
        <div className="bg-white shadow-header fixed top-0 left-0 right-0 z-20">
          <div className="w-full h-16 flex justify-between items-center pr-[14px]">
            <div className="flex items-center">
              <img className="w-16 h-16" src="https://s3-alpha-sig.figma.com/img/2293/4848/b251a693f86366116521344341649e62?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H7nJnv1OJcL3mofKF0QXGm~KTd8rgWIXBkMoG7t1BuP6oQie45D5aOq3V0Jb8FwjDnjUVZM57cU0CDce1WWr1olP7ywjTiyGUvL9QTA8knWzXq5IVdPZeyUolCUKZ9Uz9ji3PmzDCas~vPNOUkbnP1xQe8gD0nrD3YGMm2fLFY5m9eVj0MgZBLimwtI4yjV8UnGixCLVhcyYdyx2o-6FXJP2qCpNcZQkQnI6D8-UWTClpW8N23NtJtDa2IruKkT37OuGQ6Y8QqijHrZLOKpy~E12szSlXr0i0LODeUhGhtSAROGFnIA0ZPZ~9NK5WJoi2707MgiRNmSHjqAZKmIjfg__" alt="" />
              <h1 className="text-xl text-[#262626] font-roboto font-medium">USER FEEDBACK</h1>
            </div>
          </div>
        </div>
        <div className="px-11 pt-[120px] flex flex-wrap gap-8">
          <div onClick={() => setNewForm(true)} className="flex flex-col items-center justify-end gap-10 bg-[#FFF] rounded-lg shadow-header w-[290px] h-[379px] pb-[75px]">
            <div>
              <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.1665 34.5H64.8332M34.4998 4.16667V64.8333" stroke="#2F4ED7" strokeWidth="7.58333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#000] text-[32px] font-roboto font-medium">
              New form
            </span>
          </div>
          {forms.map((form) => (
            <div key={form.id} className="bg-[#FFF] relative rounded-lg shadow-header w-[290px] h-[379px] pt-[85px] px-[14px]">
              <div className="bg-[#F5D563] rounded-t-lg absolute top-0 right-0 left-0 flex items-center justify-center h-[68px]">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2_3269)">
                    <path d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z" fill="#F7F7F7"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M47.9312 25.8305C47.9768 25.2263 48 24.6158 48 24C48 23.6093 47.9907 23.2208 47.9722 22.8345L34.7619 12.0952L13.0476 38.8571L26.0019 47.9177C35.8116 47.1076 43.9482 40.3979 46.8552 31.345L46.8571 31.3333L47.2381 30L47.6158 28.3C47.6181 28.2876 47.6204 28.275 47.6227 28.2627L47.8025 27.0931C47.8065 27.0627 47.8103 27.032 47.8141 27.0013L47.9312 25.8305Z" fill="black" fillOpacity="0.1"/>
                    <path d="M34.8572 12H12.9524V38.8571H34.8572V12Z" fill="#54698E"/>
                    <path d="M33.1429 13.7143H14.6667V37.1429H33.1429V13.7143Z" fill="#F0F0FB"/>
                    <path d="M24 10.2857H19.8096V13.7143H24V10.2857Z" fill="#28B3E6"/>
                    <path d="M28.1905 10.2857H24V13.7143H28.1905V10.2857Z" fill="#0090FA"/>
                    <path d="M21.3332 16.9524H16.3809V21.9048H21.3332V16.9524Z" fill="#28B3E6"/>
                    <path d="M21.3332 25.3333H16.3809V30.2857H21.3332V25.3333Z" fill="#28B3E6"/>
                    <path d="M19.6191 18.6667H17.9048V20.3809H19.6191V18.6667Z" fill="#F0F0FB"/>
                    <path d="M19.6191 27.0476H17.9048V28.7619H19.6191V27.0476Z" fill="#F0F0FB"/>
                    <path d="M21.3334 33.9048H17.9048V36.381H21.3334V33.9048Z" fill="#D2D4F9"/>
                    <path d="M21.3334 36.381H17.9048V38.8571H21.3334V36.381Z" fill="#989BC8"/>
                    <path d="M24.7618 33.9048H21.3333V36.381H24.7618V33.9048Z" fill="#54698E"/>
                    <path d="M24.7618 36.381H21.3333V38.8571H24.7618V36.381Z" fill="#3C4F7E"/>
                    <path d="M36.5715 33.9048H24.762V36.381H36.5715V33.9048Z" fill="#FF5620"/>
                    <path d="M36.5715 36.381H24.762V38.8571H36.5715V36.381Z" fill="#F92E0B"/>
                    <path d="M36.5715 34.0952L41.3334 36.381H36.5715V34.0952Z" fill="#FFC6B8"/>
                    <path d="M36.5715 38.6667L41.3334 36.381H36.5715V38.6667Z" fill="#FFAF93"/>
                    <path d="M33.1429 13.7143H24V33.9048H33.1429V13.7143Z" fill="#E8E8E8"/>
                    <path d="M28.1904 12H34.8571V33.9048H33.619H33.1428V13.7143H28.1904V12Z" fill="#3C4F7E"/>
                    <path d="M31.4286 16.9524H23.0476V18.6667H31.4286V16.9524Z" fill="#989BC8"/>
                    <path d="M31.4286 25.3333H23.0476V27.0476H31.4286V25.3333Z" fill="#989BC8"/>
                    <path d="M31.4286 20.1905H23.0476V21.9048H31.4286V20.1905Z" fill="#989BC8"/>
                    <path d="M31.4286 28.5714H23.0476V30.2857H31.4286V28.5714Z" fill="#989BC8"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2_3269">
                      <rect width="48" height="48" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="text-xl text-[#000] font-medium font-roboto">{form.heading}</h3>
              <div className="text-[13px] font-roboto font-medium flex justify-between mt-4 mb-4">
                <span className=" text-gray-500">Submitted</span>
                <span className=" text-[#000]">{form.userFeedbacks.length || 0}</span>
              </div>
              <div className="text-[13px] font-roboto font-medium flex justify-between mb-4">
                <span className=" text-gray-500">Viewed</span>
                <span className=" text-[#000]">{form.views || 0}</span>
              </div>
              <div className="text-[13px] font-roboto font-medium flex justify-between">
                <span className=" text-gray-500">Date Published</span>
                <span className=" text-[#000]">{form.publishedDate ? new Date(form.publishedDate).toISOString().split('T')[0] : "Not published"}</span>
              </div>
              <Link to={`/admin/view/${form._id}`} className="w-full flex justify-center mt-8">
                <button disabled={loading} className="bg-[#9c27b0] text-[#fff] px-4 py-2 rounded-md text-base font-roboto font-medium">
                  VIEW SUBMISSION
                </button>
              </Link>
              <div className="w-full flex justify-center gap-2 mt-4">
                <div onClick={() => handleEdit(form)}>
                  <button disabled={loading} className="bg-[#2e7d32] text-[#fff] px-4 py-2 rounded-md text-base font-roboto font-medium">
                    EDIT
                  </button>
                </div>
                <div onClick={() => handleDelete(form._id)}>
                  <button disabled={loading} className="bg-[#2196f3] text-[#fff] px-4 py-2 rounded-md text-base font-roboto font-medium">
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {newForm && <EditFormHeading setEdit={setNewForm} title={title} heading='Create Feedback Form' />}
    </>
  );
}

export default Dashboard;