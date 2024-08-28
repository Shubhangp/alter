import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToggleButton from "./commonFiles/ToggleButton";
import Field from "./commonFiles/Field";
import EditFormHeading from "./commonFiles/EditFormHeading";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useSelector } from "react-redux";

const FormEditor = () => {
  const [edit, setEdit] = useState(false);
  const [fields, setFields] = useState([]);
  const [configuringField, setConfiguringField] = useState(null);
  const title = useSelector((store) => store.title.details);
  
  const handleAddField = (fieldType) => {
    const newField = {
      id: fields.length + 1,
      type: fieldType,
      label: '',
      required: false,
      errorMessage: '',
      options: [],
      range: 10,
      emoji: 5,
    };
    setConfiguringField(newField);
  };

  const handleSaveField = () => {
    if (configuringField) {
      const fieldExists = fields.some(field => field.id === configuringField.id);
      if (fieldExists) {
        setFields(fields.map(field => field.id === configuringField.id ? configuringField : field));
      } else {
        setFields([...fields, configuringField]);
      }
    }
    setConfiguringField(null);
  };

  const handleCancelField = () => {
    setConfiguringField(null);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleEditField = (field) => {
    setConfiguringField(field);
  };

  const addFormData = async () => {
    try {
      const docRef = doc(db, 'feedbackforms', title);
      await setDoc(docRef, {fields});
      console.log('Data posted successfully!');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-header fixed top-0 left-0 right-0 z-20">
          <div className="w-full h-16 flex justify-between items-center pr-[14px]">
            <div className="flex items-center">
              <img className="w-16 h-16" src="https://s3-alpha-sig.figma.com/img/2293/4848/b251a693f86366116521344341649e62?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H7nJnv1OJcL3mofKF0QXGm~KTd8rgWIXBkMoG7t1BuP6oQie45D5aOq3V0Jb8FwjDnjUVZM57cU0CDce1WWr1olP7ywjTiyGUvL9QTA8knWzXq5IVdPZeyUolCUKZ9Uz9ji3PmzDCas~vPNOUkbnP1xQe8gD0nrD3YGMm2fLFY5m9eVj0MgZBLimwtI4yjV8UnGixCLVhcyYdyx2o-6FXJP2qCpNcZQkQnI6D8-UWTClpW8N23NtJtDa2IruKkT37OuGQ6Y8QqijHrZLOKpy~E12szSlXr0i0LODeUhGhtSAROGFnIA0ZPZ~9NK5WJoi2707MgiRNmSHjqAZKmIjfg__" alt="" />
              <h1 className="text-xl text-[#262626] font-roboto font-medium">USER FEEDBACK</h1>
            </div>
            <div className="flex items-center gap-[33px]">
              <button className="bg-[#2196F3] font-roboto font-medium text-[15px] text-white px-[22px] py-3 rounded shadow hover:bg-blue-600" onClick={addFormData}>
                SAVE
              </button>
              <button className="bg-[#2E7D32] font-roboto font-medium text-[15px] text-white px-[22px] py-3 rounded shadow hover:bg-green-600">
                PUBLISH
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex pt-16 bg-[#F3F3F3]">

          {/* Main Canvas */}
          <main className="flex-grow flex items-center justify-center p-8">
            <div className={`bg-white shadow-header rounded-[10px] w-[500px] min-h-[752px] relative flex justify-center ${fields.length === 0 ? "items-center" : "items-start pb-14"}`}>
              <div className="bg-[#5578F4] rounded-t-[10px] absolute top-0 right-0 left-0 flex items-center gap-2 h-[74px] py-[27px] px-[25px]">
                <Link className="cursor-pointer" to='/admin'>
                  <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
                    <path d="M12.6833 2.35L10.3333 0L0.333252 10L10.3333 20L12.6833 17.65L5.04992 10L12.6833 2.35Z" fill="white"/>
                  </svg>
                </Link>
                <div className="font-roboto font-medium text-[#FFF] text-2xl">{title}</div>
                <div onClick={() => setEdit(true)} className="cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M0 14.25V18H3.75L14.81 6.94004L11.06 3.19004L0 14.25ZM17.71 4.04004C18.1 3.65004 18.1 3.02004 17.71 2.63004L15.37 0.290044C15.2775 0.197329 15.1676 0.12377 15.0466 0.0735815C14.9257 0.0233925 14.796 -0.00244141 14.665 -0.00244141C14.534 -0.00244141 14.4043 0.0233925 14.2834 0.0735815C14.1624 0.12377 14.0525 0.197329 13.96 0.290044L12.13 2.12004L15.88 5.87004L17.71 4.04004Z" fill="white"/>
                  </svg>
                </div>
              </div>

              {/* Display Dynamic Fields */}
              {fields.length === 0 ? (
                <div className="font-roboto font-medium text-4xl text-[#5C5858]">Add Fields</div>
              ) : (
                <div className="w-full mt-24 flex flex-col items-center gap-5 px-3">
                  {fields.map((field) => (
                    <Field key={field.id} field={field} onEditField={handleEditField} onDeleteField={handleDeleteField} />
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <div className="w-[317px] h-screen bg-[#FFF] fixed right-0 shadow-header pt-5 pb-24 px-[34px] overflow-y-scroll">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl text-[#000] font-roboto font-semibold">Add fields</h2>
              <SidebarItem label="Textarea" onClick={() => handleAddField('textarea')} />
              <SidebarItem label="Numeric rating" onClick={() => handleAddField('numericRating')} />
              <SidebarItem label="Star rating" onClick={() => handleAddField('starRating')} />
              <SidebarItem label="Smiley rating" onClick={() => handleAddField('smileyRating')} />
              <SidebarItem label="Single line input" onClick={() => handleAddField('singleLineInput')} />
              <SidebarItem label="Radio button" onClick={() => handleAddField('radioButton')} />
              <SidebarItem label="Categories" onClick={() => handleAddField('categories')} />
            </div>
            <div className="mt-[77px] space-y-7">
              <div className="font-roboto font-semibold text-xl text-[#000]">Add Logic</div>
              <ConditionItem label="Show based on URL conditions" placeholder="http://" />
              <ConditionItem label="Show on a specific date" placeholder="Start date" />
              <ConditionItem label="Show on a specific time" placeholder="Select Time" />
            </div>
          </div>
          {configuringField && (<div className="w-[317px] bg-[#FFF] z-10 fixed right-0 bottom-0 top-0 shadow-header p-4 pt-[91px] space-y-4">
            <div className="flex gap-[14px] items-center">
              <div onClick={handleCancelField} className="cursor-pointer">
                <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6834 2.35L10.3334 0L0.333374 10L10.3334 20L12.6834 17.65L5.05004 10L12.6834 2.35Z" fill="#383838"/>
                </svg>
              </div>
              <span className="font-roboto font-semibold text-base text-[#4B4949]">Back to Add Fields</span>
            </div>
            <FieldConfigForm
              field={configuringField}
              setField={setConfiguringField}
              onSave={handleSaveField}
              onCancel={handleCancelField}
            />
          </div>)}
        </div>
      </div>
      {edit && <EditFormHeading setEdit={setEdit} title={title} heading='Edit' />}
    </>
  );
};

// Condition Item Component with a Switch and Input
const ConditionItem = ({ label, placeholder }) => {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      {placeholder === "http://" ? (<div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#4C4545] font-roboto font-medium">{label}</span>
          <ToggleButton checked={isActive} onChange={handleToggle} />
        </div>
        {isActive && (
          <input
            type="text"
            className="w-full border-b-2 border-[#000] py-1 text-base text-[#A89D9D] font-roboto font-normal outline-none"
            placeholder={placeholder}
          />
        )}
      </div>)
      : (<div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#4C4545] font-roboto font-medium">{label}</span>
          <ToggleButton checked={isActive} onChange={handleToggle} />
        </div>
        {isActive && (
          <div className="relative h-10 w-full min-w-[200px]">
            <input placeholder={placeholder === "Start date"? "MM/DD/YYYY" : "hh:mm aa"} 
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
            <label
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate leading-tight transition-all font-normal font-roboto text-xs text-[#00000099] before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#00000099] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-200 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-200 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#00000099]">
              {placeholder}
            </label>
          </div>
        )}
      </div>)}
    </>
  );
};

// Sidebar Item Component
const SidebarItem = ({ label, onClick }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="text-base text-[#2B2B2B] font-roboto font-normal">{label}</span>
      <button onClick={onClick} className="text-[#106EA4] text-[40px] font-roboto font-normal">+</button>
    </div>
  );
};

// Field Configuration Form Component
const FieldConfigForm = ({ field, setField, onSave, onCancel }) => {
  const handleLabelChange = (e) => {
    setField({ ...field, label: e.target.value });
  };

  const handleRequiredToggle = () => {
    setField({ ...field, required: !field.required });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...field.options];
    newOptions[index] = value;
    setField({ ...field, options: newOptions });
  };

  const handleAddOption = () => {
    setField({ ...field, options: [...field.options, ''] });
  };

  return (
    <div className="p-4 mt-4 space-y-4">
      <div>
        <label className="font-normal font-roboto text-xs text-[#2196F3]">Label</label>
        <input
          type="text"
          value={field.label}
          onChange={handleLabelChange}
          className="w-full border-b-2 border-[#2196F3] outline-none font-normal font-roboto text-base text-[#232323]"
        />
      </div>
      
      <div className="flex items-center gap-[9px]">
        <ToggleButton checked={field.required} onChange={handleRequiredToggle} />
        <span className="text-[#000000DE] text-base font-roboto font-normal">Required</span>
      </div>
      {field.required && (
        <label className="flex flex-col mt-5">
          <h3 className="font-roboto font-normal text-xs text-[#00000099] mb-[6px]">Error Message</h3>
          <input 
            type="text" 
            className="w-full border-b-2 border-[#000] outline-none font-normal font-roboto text-base text-[#232323]"
            value={field.errorMessage} onChange={(e) => setField({ ...field, errorMessage: e.target.value })} 
          />
          <span className="font-roboto font-normal text-xs text-[#00000099]">Helper text</span>
        </label>
      )}

      {(field.type === 'radioButton' || field.type === 'categories') && (
        <div className="mt-[30px]">
          <label className="font-roboto font-medium text-[15px] text-[#3F3939]">Options</label>
          {field.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-[220px] border-b border-[ #0000006B] outline-none font-normal font-roboto text-base text-[#000000DE] pb-1 pt-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
          {field.options.length < 3 && <button onClick={handleAddOption} className="text-blue-500 mt-2">+ Add Option</button>}
        </div>
      )}
      <div className="flex justify-start gap-4 pt-14">
        <button 
          onClick={() => {
            if(field.label !== ""){
              if(!field.required){
                if ((field.type === 'radioButton' || field.type === 'categories') && field.options.length >= 3 && field.options.every(option => option.trim() !== "")) {
                  onSave();
                } else if (field.type !== 'radioButton' && field.type !== 'categories') {
                  onSave();
                }
              }else if(field.required && field.errorMessage !== ""){
                if ((field.type === 'radioButton' || field.type === 'categories') && field.options.length >= 3 && field.options.every(option => option.trim() !== "")) {
                  onSave();
                } else if (field.type !== 'radioButton' && field.type !== 'categories') {
                  onSave();
                }
              }
            }
          }}
          className="bg-[#2196F3] py-2 px-[22px] rounded font-roboto font-medium text-[15px] text-[#FFF]"
        >
          Save
        </button>
        <button onClick={onCancel} className="bg-[#F5F5F5] text-[#000000DE] text-[15px] font-roboto font-medium py-2 px-[22px] rounded">Cancel</button>
      </div>
    </div>
  );
};

export default FormEditor;