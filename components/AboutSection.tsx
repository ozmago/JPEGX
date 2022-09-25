import React from "react";

export default function AboutSection() {
  return (
    <div className="h-screen">
      <div className="flex justify-between items-center px-10 flex-wrap">
        <div className="max-w-[608px]">
          <h1 className="text-5xl sm:text-[80px]">Contribute and support the initiative </h1>
          <p className="text-xl">
           Connect your coinbase wallet. Make a one off donation or monthly donation
          </p>
        </div>

      <div className="relative top-6">
        <div className="relative max-w-lg p-8  border bg-black border-gray-100 shadow-xl rounded-xl">
         <div className="absolute left-4 top-4">One off donation</div> 
        <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
         
        </span>
   
        <div className="mt-4 text-gray-200 sm:pr-8">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
  
          <div className="flex  justify-center items-center border-b border-teal-500 py-2">
            
    <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-4 px-1 leading-tight focus:outline-none" type="number" placeholder="Enter Amount" aria-label="Full name"></input>
    <button className="bg-green-800 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full">
  Donate
</button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Clear
    </button>
  </div>

        </div>
      </div>

      
      <div className="relative max-w-lg p-8 top-8 border bg-black border-gray-100 shadow-xl rounded-xl">
         <div className="absolute left-4 top-4">Monthly donation</div> 
        <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
          
        </span>
   
        <div className="mt-4 text-gray-200 sm:pr-8">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            ></path>
          </svg>
  
          <div className="flex  justify-center items-center border-b border-teal-500 py-2">
            
    <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-4 px-1 leading-tight focus:outline-none" type="number" placeholder="Enter Amount" aria-label="Full name"></input>
    <button className="bg-green-800 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full">
  Donate
</button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Clear
    </button>
  </div>

        </div>
      </div>


      </div>

    </div>
    </div>
  );
}
