import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { titleData } from "../../utilis/titleSlice";
import { useNavigate } from "react-router-dom";

const EditFormHeading = ({setEdit, title, heading }) => {
    const [newTitle, setNewTitle] = useState(title);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
      <div className="w-full h-full fixed left-0 right-0 top-0 bottom-0 z-20">
        <div className="max-h-full w-full flex items-center justify-center fixed z-50 overflow-x-hidden overflow-y-auto md:inset-0">
          <div className="relative bg-white rounded-md shadow h-[164px] w-[444px] py-4 px-5">
            <div className="font-roboto font-medium text-xl text-[#000000DE] mb-[10px]">{heading}</div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full font-roboto font-normal text-base text-[#000] bg-transparent border-b border-[#0000006B] pb-2 outline-none mb-9"
            />
            <div className="flex justify-end gap-6 w-full">
              <div className="text-[#189657] text-sm font-roboto font-medium cursor-pointer" onClick={() => {dispatch(titleData(newTitle)); setEdit(false); navigate('/admin/form-editor/new')}}>
                SAVE
              </div>
              <div className="text-[#19191957] text-sm font-roboto font-medium cursor-pointer" onClick={() => setEdit(false)}>
                CANCEL
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full bg-[#282c3f]/[0.5] fixed top-0 left-0 z-[49]' onClick={() => setEdit(false)}></div>
      </div>
    );
}

export default EditFormHeading;