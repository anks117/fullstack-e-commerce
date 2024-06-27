

const ProgressStep = ({step1,step2,step3}) => {
  return (
    
    <div className="min-w-full lg:w-4/5 px-8 lg:px-24 py-4">
    <div className="relative flex items-center justify-between w-full">
      <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
      <div className={`absolute left-0 top-2/4 h-0.5 transition delay-200 duration-300 ease-out ${(step1 && step2 ?"w-1/2 -translate-y-2/4" :"w-0 -translate-y-2/4") && step3?"w-full -translate-y-2/4":"w-1/2 -translate-y-2/4"}   bg-green-500 transition-all duration-500`}>
      </div>
      <div
        className="relative z-10 grid w-10 h-10 font-bold text-white transition delay-200 duration-300 ease-out bg-green-500 rounded-full place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          aria-hidden="true" className="w-5 h-5">
          <path 
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z">
          </path>
        </svg>
        <div className="absolute -bottom-[4.5rem] w-max text-center">
          <h6
            className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-green-500">
            Step 1
          </h6>
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-green-500">
            Login
          </p>
        </div>
      </div>
      <div
        className={`relative z-10 grid w-10 h-10 font-bold text-white transition delay-200 duration-300 ease-out ${step1 && step2 && step3 ?"bg-green-500" :"bg-gray-300"} bg-green-500 rounded-full place-items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor"
            aria-hidden="true">
                <path  d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"  />
            </svg>

        <div className="absolute -bottom-[4.5rem] w-max text-center">
          <h6
            className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal  ${step1 && step2 && step3? "text-green-500":"text-white"}`}>
            Step 2
          </h6>
          <p className={`block font-sans text-base antialiased font-normal leading-relaxed ${step1 && step2 && step3? "text-green-500":"text-white"}`}>
            Shipping Address
          </p>
        </div>
      </div>
      <div
        className={`relative z-10 grid w-10 h-10 font-bold  ${step1 && step2 && step3?"text-white":"text-gray-900"}  transition-all duration-300 bg-gray-300 rounded-full place-items-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" aria-hidden="true">
            <path d="M13.887 3.182c.396.037.79.08 1.183.128C16.194 3.45 17 4.414 17 5.517V16.75A2.25 2.25 0 0 1 14.75 19h-9.5A2.25 2.25 0 0 1 3 16.75V5.517c0-1.103.806-2.068 1.93-2.207.393-.048.787-.09 1.183-.128A3.001 3.001 0 0 1 9 1h2c1.373 0 2.531.923 2.887 2.182ZM7.5 4A1.5 1.5 0 0 1 9 2.5h2A1.5 1.5 0 0 1 12.5 4v.5h-5V4Z" />
        </svg>

        <div className="absolute -bottom-[4.5rem] w-max text-center">
          <h6
            className={`block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal
            ${step1 && step2 && step3?"text-white":"text-gray-700"} `}>
            Step 3
          </h6>
          <p className={`block font-sans text-base antialiased font-normal leading-relaxed  ${step1 && step2 && step3?"text-white":"text-gray-700"} `}>
            Summary
          </p>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default ProgressStep