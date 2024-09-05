import React, { useState } from "react";

const FormField = ({ field, formData, setFormData }) => {
    const handleRatingChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            [field.label]: value
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelect = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            [field.label]: selectedOption,
        }));
    };

    switch (field.type) {
        case 'textarea':
            return (
                <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                    <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
                    <textarea
                        name={field.label}
                        required={field.required}
                        onChange={handleChange}
                        className="w-full p-2 rounded resize-none border border-[#DBD6D6]"
                    />
                </div>
            );
        case 'numericRating':
            return (
                <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                    <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
                    <div className="flex items-center">
                        {[...Array(field.range)].map((_, i) => (
                            <span
                                key={i}
                                className={`border border-[#DBD6D6] font-roboto font-normal text-sm text-[#645757] px-[17.5px] py-3 ${formData[field.label] > i ? 'bg-yellow-500 text-white' : ''}`}
                                onClick={() => handleRatingChange(i + 1)}
                            >
                                {i + 1}
                            </span>
                        ))}
                    </div>
                </div>
            );
        case 'starRating':
            return (
                <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                    <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
                    <div className="flex items-center space-x-2">
                        {[...Array(field.emoji)].map((_, i) => (
                            <span
                                key={i}
                                onClick={() => handleRatingChange(i + 1)}
                                className={`cursor-pointer ${formData[field.label] > i ? 'text-yellow-500' : 'text-gray-400'}`}
                            >
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.3">
                                        <path d="M26 10.109C26 10.39 25.797 10.656 25.594 10.859L19.922 16.39L21.266 24.202C21.282 24.311 21.282 24.405 21.282 24.515C21.282 24.921 21.095 25.296 20.641 25.296C20.422 25.296 20.203 25.218 20.016 25.109L13 21.422L5.98399 25.109C5.78099 25.218 5.57799 25.296 5.35899 25.296C4.90599 25.296 4.70299 24.921 4.70299 24.515C4.70299 24.406 4.71899 24.312 4.73399 24.202L6.07799 16.39L0.389993 10.859C0.202993 10.656 -0.00100708 10.39 -0.00100708 10.109C-0.00100708 9.64002 0.482993 9.45302 0.873993 9.39002L8.71799 8.24902L12.234 1.14002C12.375 0.843023 12.64 0.499023 13 0.499023C13.36 0.499023 13.625 0.843023 13.766 1.14002L17.282 8.24902L25.126 9.39002C25.501 9.45302 26 9.64002 26 10.109Z" fill="currentColor"/>
                                    </g>
                                </svg>
                            </span>
                        ))}
                    </div>
                </div>
            );
        case 'smileyRating':
            return (
                <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                    <label className="font-roboto font-normal text-sm text-[#232323]">
                        {field.label}{field.required && "*"}
                    </label>
                    <div className="flex items-center space-x-1">
                        {[...Array(field.emoji)].map((_, i) => (
                            <span
                                key={i}
                                onClick={() => handleRatingChange(i + 1)}
                                className={`cursor-pointer rounded-full ${formData[field.label] > i ? 'bg-yellow-500' : 'bg-[#fff]'}`}
                            >
                                {i === 0 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14">
                                        <g fill="none" stroke="#555" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13"/>
                                            <path d="m10.5 4l-2 1.5l2 1M3.5 4l2 1.5l-2 1m1 3.5S6 7.5 7 7.5S9.5 10 9.5 10"/>
                                        </g>
                                    </svg>
                                )}
                                {i === 1 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256">
                                        <path fill="#555" d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90M82 108a10 10 0 1 1 10 10a10 10 0 0 1-10-10m92 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-.81 65a6 6 0 0 1-10.38 6c-7.84-13.54-20.2-21-34.81-21s-27 7.46-34.81 21a6 6 0 0 1-5.2 3a5.9 5.9 0 0 1-3-.81a6 6 0 0 1-2.18-8.19c9.92-17.16 26.39-27 45.19-27s35.27 9.84 45.19 27"/>
                                    </svg>
                                )}
                                {i === 2 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256">
                                        <path fill="#555" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m48-56a8 8 0 0 1-8 8H88a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8m-96-52a12 12 0 1 1 12 12a12 12 0 0 1-12-12m96 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/>
                                    </svg>
                                )}
                                {i === 3 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16">
                                        <path fill="#555" fillRule="evenodd" d="M4.111 2.18a7 7 0 1 1 7.778 11.64A7 7 0 0 1 4.11 2.18zm.556 10.809a6 6 0 1 0 6.666-9.978a6 6 0 0 0-6.666 9.978M6.5 7a1 1 0 1 1-2 0a1 1 0 0 1 2 0m5 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8 11a3 3 0 0 1-2.65-1.58l-.87.48a4 4 0 0 0 7.12-.16l-.9-.43A3 3 0 0 1 8 11" clipRule="evenodd"/>
                                    </svg>
                                )}
                                {i === 4 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                        <path fill="#555" d="M12 17.5c2.33 0 4.3-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5M8.5 11A1.5 1.5 0 0 0 10 9.5A1.5 1.5 0 0 0 8.5 8A1.5 1.5 0 0 0 7 9.5A1.5 1.5 0 0 0 8.5 11m7 0A1.5 1.5 0 0 0 17 9.5A1.5 1.5 0 0 0 15.5 8A1.5 1.5 0 0 0 14 9.5a1.5 1.5 0 0 0 1.5 1.5M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/>
                                    </svg>
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            );            
        case 'singleLineInput':
            return (
                <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                    <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
                    <input
                        type="text"
                        name={field.label}
                        required={field.required}
                        onChange={handleChange}
                        className="w-full p-2 border border-[#DBD6D6] rounded"
                    />
                </div>
            );
        case 'radioButton':
            return (
                <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                    <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
                    {field.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name={field.label}
                                    value={option}
                                    required={field.required}
                                    onChange={handleChange}
                                    className="appearance-none w-6 h-6 border border-[#0000006B] rounded-full checked:bg-[#2196F3] checked:border-transparent focus:outline-none transition-all"
                                />
                                <span className="ml-3 text-sm text-[#514F4F] font-roboto font-normal">{option}</span>
                            </label>
                        </div>
                    ))}
                </div>
            );
            case 'categories':
                return (
                    <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
                        <label className="font-roboto font-normal text-sm text-[#232323]">
                            {field.label}{field.required && "*"}
                        </label>
                        <div className="flex space-x-5">
                            {field.options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCategorySelect(option)}
                                    className={`border border-[#00000052] font-roboto font-normal text-base text-[#504F4F] px-8 py-[10px] cursor-pointer 
                                        ${formData[field.label] === option ? 'bg-yellow-500 text-white' : 'bg-white'}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                );            
        default:
            return null;
    }
};

export default FormField;