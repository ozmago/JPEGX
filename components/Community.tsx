import React from "react";





export default function Community() {


  return (

    
    <div className="my-[10rem]">
      <div className="absolute  -z-10 right-0  top-[280vh]">
        <img src="Ellipse18.svg" className="relative " />
      </div>
      <div className="flex flex-col container mx-auto">
        <h1 className="text-5xl sm:text-[80px] flex flex-col ">
          <span></span>{" "}
        </h1>
        <div className="h-screen">
      <div className="flex justify-between items-center px-10 flex-wrap">

      <div className="max-w-2xl my-8 space-y-4  xl:col-span-2 text-left">
              <h2 className="text-5xl sm:text-[80px] font-bold">
                Adopt an Orphaned animal today
              </h2>
              <p className="text-xl">
              Adopt an orphan elephant, rhino or giraffe for yourself or as a gift - 
              offering life and hope to an animal in need.
              </p>

              <button className="px-6 py-3  border-2 ml-10 flex items-center  sm:text-lg font-bold rounded-3xl glass transition-colors duration-500 text-white ">
                See the orphans <img src="arrow.svg" className="pl-2" />
              </button>
            </div>

      <div className="relative top-6">
        <div className="relative max-w-lg p-8  border bg-black border-gray-100 shadow-xl rounded-xl">
         <div className="absolute left-4 top-4">One off donation</div> 
        <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
          4.3
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

<div className="flex flex-col items-center justify-center">
      
    </div>
      
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Clear
    </button>
  </div>

        </div>
      </div>

      
      <div className="relative max-w-lg p-8 top-8 border bg-black border-gray-100 shadow-xl rounded-xl">
         <div className="absolute left-4 top-4">Monthly donation</div> 
        <span className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
          4.3
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
      </div>
    </div>
  );
}
