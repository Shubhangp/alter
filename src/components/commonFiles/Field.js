import React from "react";

const Field = ({ field, onEditField, onDeleteField }) => {
  const handleEdit = () => {
    onEditField(field);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this field?")) {
      onDeleteField(field.id);
    }
  };

  switch (field.type) {
    case 'textarea':
      return (
        <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
          <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
          <textarea
            required={field.required}
            className="w-full p-2 rounded resize-none border border-[#DBD6D6]"
          />
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'numericRating':
      return (
        <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
          <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
          <div className="flex items-center">
            {[...Array(field.range)].map((_, i) => (
              <span key={i} className="border border-[#DBD6D6] font-roboto font-normal text-sm text-[#645757] px-[17.5px] py-3">
                  {i+1}
              </span>
            ))}
          </div>
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'starRating':
      return (
        <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
          <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
          <div className="flex items-center space-x-2">
            {[...Array(field.emoji)].map((_, i) => (
              <span key={i}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.3">
                          <path d="M26 10.109C26 10.39 25.797 10.656 25.594 10.859L19.922 16.39L21.266 24.202C21.282 24.311 21.282 24.405 21.282 24.515C21.282 24.921 21.095 25.296 20.641 25.296C20.422 25.296 20.203 25.218 20.016 25.109L13 21.422L5.98399 25.109C5.78099 25.218 5.57799 25.296 5.35899 25.296C4.90599 25.296 4.70299 24.921 4.70299 24.515C4.70299 24.406 4.71899 24.312 4.73399 24.202L6.07799 16.39L0.389993 10.859C0.202993 10.656 -0.00100708 10.39 -0.00100708 10.109C-0.00100708 9.64002 0.482993 9.45302 0.873993 9.39002L8.71799 8.24902L12.234 1.14002C12.375 0.843023 12.64 0.499023 13 0.499023C13.36 0.499023 13.625 0.843023 13.766 1.14002L17.282 8.24902L25.126 9.39002C25.501 9.45302 26 9.64002 26 10.109Z" fill="black"/>
                      </g>
                  </svg>
              </span>
            ))}
          </div>
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'smileyRating':
      return (
        <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
          <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
          <div className="flex items-center space-x-1">
            {[...Array(field.emoji)].map((_, i) => (
              <span key={i}>
                  {i === 0 && <img className="w-10 h-10" src="https://s3-alpha-sig.figma.com/img/9237/3b85/5802c8c45733e451cc7daf8caa2d127d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OL4TnyyZE3ro1-ejXVhd8kmbZtgspGYS1F~PIjokSzwd-LAl1jIY~hvlHytbMynMiTmXDQ9-iTJSrS4Xe9Kzd02hsWGL5Pv0duGpMoBW9N6PNRjO80QEYZmEfq8IlwyWW-w4ROO5w7CI~lnW6Wet1m5xDyptz63UxzdRQ-8z6s-WjUH~BO-5eeWhU3QO7lqVY1MD3BIUJikyZG23ik-wXrAIUafNXAeN81NJ79RbOphANOxLPet4QYYhUKILm9Mm~andG0tIqAOCTIHLPv8uTNRYDtq5u6AK4607c44IxWdbdrmUVsvnzeP7UacqmJ0C-7~qxo6G4vB0G5dBPQL5Cw__" alt="" />}
                  {i === 1 && <img className="w-10 h-10" src="https://s3-alpha-sig.figma.com/img/42a5/b175/67faa2448a9fcb44ecfafc4c0ec3f915?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R8wWAs-ksAmvrh9E~mgaD2Fu7h0wqONG4Ie5l3oVL5Ly6CUSZ434z1g4jeP1KeRPNicNGa9ffSpw6lgAr11gmGXk3PT0aqsCgmkl18-ek6AKk-K72zZZX931hiGXPainsz73qPypVK8N-1Ekyka9ufM2xKhpquAPvEhVBhxGq4B3VFRrx0WJmUFnJWRhRnJZ0uO8AW4Jp0CVWiUtfRRnZLseO3TWqC-1VfTwVa9to57Vf3MlvRF6YDnn2SwADkIwVD4zCXRqgNiZemity93u8kwe9klrUnHtDE6c3pC7EX0L308Us~tTB7SwaiLFqsrUbJNnmnzQdxXUd-YRPYDF5w__" alt="" />}
                  {i === 2 && <img className="w-10 h-10" src="https://s3-alpha-sig.figma.com/img/dcaa/17a7/ac66879b75155247f8e31f8b331633f0?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aGX0BcaNHK9TJz~8sOqikOY7xW0IXJzALxyI~TYEBvlvhuOtZQFQXGofYGBooM8GU6RWDrE5sCTab0OKH6gabRBhUKs8HuQOpqN0QRbOwx~QFKDQ72CgVKIurBnMFI-7FoaiMqBMZMRjyczvPcDpE8fK8OrSYhf8J6QV90uxg1~ZsBh8g2xNU5IUTGtb~ZjRivmveIxtK~VKCJy7rczMQsiPklruXCZr-eHT4l~LpknUYJ~nidk4-g2k~Iunc6eL5LLj6eNFv5FoIOTYgr5m51xmqKuM~GrY4KxTIPzXU0RtvW3imCnevwfL34-1XVz--VlSC6~-VSLGiqsVutkjYg__" alt="" />}
                  {i === 3 && <img className="w-10 h-10" src="https://s3-alpha-sig.figma.com/img/76c2/13ff/e0043e91290cfba5f3a5e30cdd8cdc08?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YXkyRVagAnAmhCKgZCDAd2SrCr9wmBxWw5vC7cMho2IF5e2PcnujqGj6GbmoDBh0uN6JzcWxDf4S0qCyiC8Yze6myt7lD4ktrUXkOnHWm1DHkDXWSFyoK5aiG~Xqkob6YTNgyUY6NS05I-xrOao0VnGAq3wfD~jn~vdrP9LYvWmV~yJBwD9kyLwTiG5G~Q4yDBvYTiwr8KNQlmJFW~57fY-qhW5aVhkO8LI08C3xhzIDgwaJgooo649GHtBRgoRW8cdxHJnMjfw88qTwDXbNWEnp0xikLW8qaHSeZID8nNaCsv0oKHAk6xoS-B6nmg8v~NJNW4c1N~G7WJkyq8fY3w__" alt="" />}
                  {i === 4 && <img className="w-10 h-10" src="https://s3-alpha-sig.figma.com/img/a795/951f/6395896e575b5f1f1b058adb5f4af654?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I9~BC6RB42HYvIh7yWq9lDVfGIqEfxDjO8pgigPjnvVEFhIJycYdue1mA2oGILQWseZJq-A0rbNIlLQT4PDqtSfTKxz5Nqo1N8yrFLPnhg50hZkisjWDZ1iJN3i2DSmNo0zk6LmKvPCWVyBoeKZnsBgVqlRumEcZvGRNxJK1jBA6OgAvBt533MtmWf9djM2SDZF3sjhgz0ofN5zrF4w9gBOeG4j2prp48WlDVTpmtk1JjhQFjv5M70MdBuGcIhKCCPX--0shNx1Rz5gWW~wM3wKSWpigWCK--LQc1qpM055ta-3sb5LiJFKYT1jSGgkJJXKwk5pE4We0uQsSN0ePRg__" alt="" />}
              </span>
            ))}
          </div>
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'singleLineInput':
      return (
        <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
          <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
          <input
            type="text"
            required={field.required}
            className="w-full p-2 border border-[#DBD6D6] rounded"
          />
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
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
                          className="appearance-none w-6 h-6 border border-[#0000006B] rounded-full checked:bg-[#2196F3] checked:border-transparent focus:outline-none transition-all"
                      />
                      <span className="ml-3 text-sm text-[#514F4F] font-roboto font-normal">{option}</span>
                  </label>
              </div>
          ))}
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'categories':
      return (
        <div className="w-full mb-4 shadow-header px-2 py-3 space-y-2">
          <label className="font-roboto font-normal text-sm text-[#232323]">{field.label}{field.required && "*"}</label>
          <div className="flex space-x-5">
              {field.options.map((option, index) => (
                  <div key={index} className="border border-[#00000052] font-roboto font-normal text-base text-[#504F4F] px-8 py-[10px]">{option}</div>
              ))}
          </div>
          <div className="w-full flex justify-end items-center gap-[23px]">
            <div className="cursor-pointer" onClick={() => handleEdit()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M3 17.25V21H6.75L17.81 9.94004L14.06 6.19004L3 17.25ZM20.71 7.04004C21.1 6.65004 21.1 6.02004 20.71 5.63004L18.37 3.29004C18.2775 3.19733 18.1676 3.12377 18.0466 3.07358C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07358C17.1624 3.12377 17.0525 3.19733 16.96 3.29004L15.13 5.12004L18.88 8.87004L20.71 7.04004Z" fill="black"/>
                </g>
              </svg>
            </div>
            <div className="cursor-pointer" onClick={() => handleDelete()}>
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Field;