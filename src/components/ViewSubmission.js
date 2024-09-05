import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ViewSubmission = () => {
    const { formId } = useParams();
    const [feedbackForm, setFeedbackForm] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [forId, setForID] = useState(1);

    useEffect(() => {
          getData();
      }, [])
    
      const getData = async() => {
        const fetchData = await fetch(`https://alter-backend.vercel.app/api/v1/feedback-form/${formId}`);
        const jsonData = await fetchData.json();
        setFeedbackForm(jsonData.data.formData);
      }


    if(setFeedbackForm === null){
        return;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
      };


    return (
        <div className={`flex flex-col bg-[#F3F3F3] px-8 pt-[111px]`}>
          {/* Header */}
            <div className="bg-white shadow-header fixed top-0 left-0 right-0 z-20">
                <div className="w-full h-16 flex justify-between items-center pr-[14px]">
                    <div className="flex items-center">
                        <img className="w-16 h-16" src="https://s3-alpha-sig.figma.com/img/2293/4848/b251a693f86366116521344341649e62?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H7nJnv1OJcL3mofKF0QXGm~KTd8rgWIXBkMoG7t1BuP6oQie45D5aOq3V0Jb8FwjDnjUVZM57cU0CDce1WWr1olP7ywjTiyGUvL9QTA8knWzXq5IVdPZeyUolCUKZ9Uz9ji3PmzDCas~vPNOUkbnP1xQe8gD0nrD3YGMm2fLFY5m9eVj0MgZBLimwtI4yjV8UnGixCLVhcyYdyx2o-6FXJP2qCpNcZQkQnI6D8-UWTClpW8N23NtJtDa2IruKkT37OuGQ6Y8QqijHrZLOKpy~E12szSlXr0i0LODeUhGhtSAROGFnIA0ZPZ~9NK5WJoi2707MgiRNmSHjqAZKmIjfg__" alt="" />
                        <h1 className="text-xl text-[#262626] font-roboto font-medium">USER FEEDBACK</h1>
                    </div>
                </div>
            </div>
            <main className="flex-grow flex items-center justify-center p-8">
                <div className={`bg-white shadow-header rounded-[10px] w-full relative flex flex-col items-start pt-28 px-8`}>
                    <div className="bg-[#5578F4] rounded-t-[10px] absolute top-0 right-0 left-0 flex items-center gap-2 h-[74px] py-[27px] px-[25px]">
                        <Link className="cursor-pointer" to='/admin'>
                        <svg width="13" height="20" viewBox="0 0 13 20" fill="none">
                            <path d="M12.6833 2.35L10.3333 0L0.333252 10L10.3333 20L12.6833 17.65L5.04992 10L12.6833 2.35Z" fill="white"/>
                        </svg>
                        </Link>
                        <div className='flex justify-between items-center w-full'>
                            <div className="font-roboto font-medium text-[#FFF] text-2xl">{feedbackForm?.heading}</div>
                            <div  className="font-roboto font-medium text-[#FFF] text-2xl">
                                Created Date :
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-28 justify-start w-full pl-28'>
                        <div className='flex flex-col justify-center items-center'>
                            <span className='font-roboto font-bold text-[64px] text-[#2e2e2e]'>
                                {feedbackForm?.views}
                            </span>
                            <span className='text-[#2323239e] text-2xl font-roboto font-normal'>VIEWS</span>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <span className='font-roboto font-bold text-[64px] text-[#2e2e2e]'>
                                {feedbackForm?.userFeedbacks.length}
                            </span>
                            <span className='text-[#2323239e] text-2xl font-roboto font-normal'>SUBMITTED</span>
                        </div>
                    </div>
                    {feedbackForm?.url && <div className='text-sm text-[#2e2e2e] font-roboto font-semibold pt-8'>Page URL contains {feedbackForm.url}</div>}
                    {feedbackForm?.lastDate !== ""&& <div className='text-sm text-[#2e2e2e] font-roboto font-semibold pt-6'>Date: {feedbackForm?.lastDate.split(' ')[0]}</div>}
                    {feedbackForm?.lastDate !== "" && <div className='text-sm text-[#2e2e2e] font-roboto font-semibold pt-6'>Time: {feedbackForm?.lastDate.split(' ')[1]}</div>}
                    <div className='font-roboto font-medium text-xl text-[#000] pt-5 mb-4'>Feedback List</div>
                    {feedbackForm?.userFeedbacks.map((data, index) => (<div key={index} className='w-[51%]'>
                        <div className="w-full p-4 border shadow-md mb-6">
                            <div className='flex justify-between'>
                                <h3 className="font-normal font-roboto text-base text-[#254AA8DE;]">Feedback {index+1}</h3>
                                <div className='flex items-center gap-3'>
                                    <p className="font-roboto font-normal text-base text-[#000000]">{formatDate(data?.feedbackDate)}</p>
                                    {isVisible && forId === index+1 ? (
                                        <div onClick={() => {setIsVisible(false); setForID(1)}} className='cursor-pointer'>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 0.294922L0 6.29492L1.41 7.70492L6 3.12492L10.59 7.70492L12 6.29492L6 0.294922Z" fill="black" fillOpacity="0.56"/>
                                            </svg>
                                        </div>                                  
                                        ) : (
                                        <div onClick={() => {setIsVisible(true); setForID(index+1)}} className='cursor-pointer'>
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 7.70508L12 1.70508L10.59 0.295078L6 4.87508L1.41 0.295078L0 1.70508L6 7.70508Z" fill="black" fillOpacity="0.56"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isVisible && forId === index+1 && <div className="mt-4">
                                {Object.entries(data?.formData).map(([question, answer], index) => (
                                <div key={index} className="mb-1">
                                    <p className="font-roboto font-normal text-sm text-[#232323]">{question}</p>
                                    <p className="font-roboto font-normal text-sm text-[#2323239E]">{answer}</p>
                                </div>
                                ))}
                            </div>}
                        </div>
                    </div>))}
                </div>
            </main>
        </div>
    )
}

export default ViewSubmission;