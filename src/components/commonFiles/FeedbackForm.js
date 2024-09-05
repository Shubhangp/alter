import React, { useEffect, useState } from 'react'
import FormField from './FormField';

const FeedbackForm = ({formId, setOpen}) => {
    const [fields, setFields] = useState([]);
    const [title, setTitle] = useState('');
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async() => {
        const fetchData = await fetch(`https://alter-backend.vercel.app/api/v1/feedback-form/${formId}`);
        const jsonData = await fetchData.json();
        setFields(jsonData.data.formData.formEntries);
        setTitle(jsonData.data.formData.heading);
    }

    if(fields.length === 0){
        return;
    }

    const handleSubmit = async() => {
        try {
            const response = await fetch(`https://alter-backend.vercel.app/api/v1/feedback-form/newFeedack/${formId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({formData: formData}),
            });
      
            if (!response.ok) {
              throw new Error('Failed to post data');
            }
      
            const data = await response.json();
            console.log('Feedback posted successfully:', data);
            setOpen(false);
            setFormData([]);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (
        <>
            <div tabIndex="-1" className="max-h-full fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                <div className="relative w-full max-w-lg max-h-full mx-auto">
                    <div className={`bg-white shadow-header rounded-[10px] w-[500px] min-h-[752px] flex justify-center relative ${fields.length === 0 ? "items-center" : "items-start pb-14"}`}>
                        <div className="bg-[#5578F4] rounded-t-[10px] absolute top-0 right-0 left-0 flex items-center justify-between h-[74px] py-[27px] px-[25px]">
                            <div className="font-roboto font-medium text-[#FFF] text-2xl">{title}</div>
                            <div className="cursor-pointer" onClick={() => {setOpen(false); setFormData([]);}}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.409 9.81682L18.8898 3.33416C19.0649 3.16504 19.2046 2.96274 19.3007 2.73907C19.3967 2.51539 19.4473 2.27482 19.4494 2.03139C19.4515 1.78796 19.4052 1.54655 19.313 1.32124C19.2208 1.09593 19.0847 0.891236 18.9125 0.7191C18.7404 0.546963 18.5357 0.410833 18.3104 0.318651C18.0851 0.226469 17.8437 0.180083 17.6002 0.182198C17.3568 0.184313 17.1162 0.234888 16.8926 0.330971C16.6689 0.427055 16.4666 0.566722 16.2975 0.741824L9.81481 7.22266L3.33397 0.741824C3.16486 0.566722 2.96256 0.427055 2.73888 0.330971C2.51521 0.234888 2.27464 0.184313 2.03121 0.182198C1.78778 0.180083 1.54637 0.226469 1.32106 0.318651C1.09575 0.410833 0.891053 0.546963 0.718917 0.7191C0.54678 0.891236 0.410649 1.09593 0.318468 1.32124C0.226286 1.54655 0.1799 1.78796 0.182015 2.03139C0.18413 2.27482 0.234705 2.51539 0.330788 2.73907C0.426872 2.96274 0.566539 3.16504 0.741641 3.33416L7.22247 9.81499L0.741641 16.2977C0.566539 16.4668 0.426872 16.6691 0.330788 16.8927C0.234705 17.1164 0.18413 17.357 0.182015 17.6004C0.1799 17.8438 0.226286 18.0853 0.318468 18.3106C0.410649 18.5359 0.54678 18.7406 0.718917 18.9127C0.891053 19.0849 1.09575 19.221 1.32106 19.3132C1.54637 19.4053 1.78778 19.4517 2.03121 19.4496C2.27464 19.4475 2.51521 19.3969 2.73888 19.3008C2.96256 19.2048 3.16486 19.0651 3.33397 18.89L9.81481 12.4092L16.2975 18.89C16.4666 19.0651 16.6689 19.2048 16.8926 19.3008C17.1162 19.3969 17.3568 19.4475 17.6002 19.4496C17.8437 19.4517 18.0851 19.4053 18.3104 19.3132C18.5357 19.221 18.7404 19.0849 18.9125 18.9127C19.0847 18.7406 19.2208 18.5359 19.313 18.3106C19.4052 18.0853 19.4515 17.8438 19.4494 17.6004C19.4473 17.357 19.3967 17.1164 19.3007 16.8927C19.2046 16.6691 19.0649 16.4668 18.8898 16.2977L12.409 9.81682Z" fill="white"/>
                                </svg>
                            </div>
                        </div>

                        {fields.length === 0 ? (
                        <div className="font-roboto font-medium text-4xl text-[#5C5858]">No Fields</div>
                        ) : (
                        <div className="w-full mt-24 flex flex-col items-center gap-5 px-3">
                            {fields.map((field) => (
                                <FormField key={field.id} field={field} formData={formData} setFormData={setFormData} />
                            ))}
                            <div onClick={handleSubmit}>
                                <button className="bg-[#2196f3] text-[#fff] px-4 py-2 rounded-md text-[15px] font-roboto font-medium">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='w-full h-full bg-[#282c3f]/[0.5] fixed top-0 left-0 z-[49]'></div>
        </>
    )
}

export default FeedbackForm
