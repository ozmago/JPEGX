import React from "react";

import Footer from "../components/Footer";
import Image from 'next/image'
import NavComponent from "../components/NavComponent";




export default function index() {

  return (
    <>
      <div className="relative ">
        <div className="absolute  -z-10 top-[-50rem] -left-[40rem] ">
          <img src="Group47.svg" className="relative top-[20rem]" />
        </div>
      </div>


 
      <NavComponent />
      
    <div className="container mx-auto mt-10 py-10 flex flex-wrap justify-around items-center px-4">
      
      <div className="p-1 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">

        
        <div className=" bg-black sm:p-10 p-6 rounded-xl">
          
        <div className=" flex justify-between   ">
         <div className="">
         <Image
      src="/bayc-footer.webp"
      alt="Picture of the author"
      width={70}
      height={70}
           />
         </div>
         <div className="">
          
    <button className="relative z-0 rounded bg-pink-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
        CALLS
  </button>
      
         </div>
         </div>
         

        <div className="grid gap-4 grid-cols-3 mt-5">
        <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full sm:w-12 sm:h-12">
            <Image
      src="/increase.png"
      alt="Picture of the author"
      width={40}
      height={40}
           />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">APY</h6>
            <div className="mb-2 text-gray-400">
              12%
            </div>
          </div>

     
      </div>

      <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >

          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full sm:w-12 sm:h-12">
            <Image
      src="/dollarsign.png"
      alt="Picture of the author"
      width={100}
      height={100}
           />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">TVL</h6>
            <div className="mb-2 text-gray-400">
              5.8m
            </div>
          </div>

     
      </div>

      <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full   sm:w-12 sm:h-12">
              <Image
      src="/ethlogo.png"
      alt="Picture of the author"
      width={30}
      height={40}
           />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">Deposits</h6>
            <div className="mb-2 text-gray-400">
              45
            </div>
          </div>


     
      </div>

      </div>

            <div className="">
             
            <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100">
        
            </div>
            </div>
            <button
            type="button"
            className="flex items-center justify-center w-full p-3 mt-5 font-semibold tracking-wide rounded-md bg-blue-700 text-gray-200"
          >
            Manage
          </button>

          <div className=" grid gap-4 grid-cols-3 items-center mt-3 mx-4 ">
             <p>Epoch 2</p>
             <p>9 Sep - 16 Sep</p>
             <p>Version 3</p>
          </div>

          </div>
          
        </div>

        <div className="p-1 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">

        
        <div className=" bg-black sm:p-10 p-6 rounded-xl">

        <div className=" flex justify-between   ">
         <div className="">
         <div className="">
         <Image
      src="/ens.png"
      alt="Picture of the author"
      width={70}
      height={70}
           />
         </div>
         </div>
         <div className="">
        <button className="relative z-0 rounded bg-pink-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
        CALLS
        </button>
         </div>
         </div>

        <div className="grid gap-4 grid-cols-3 mt-5">
        <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full sm:w-12 sm:h-12">
            <Image
      src="/increase.png"
      alt="Picture of the author"
      width={40}
      height={40}
           />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">APY</h6>
            <div className="mb-2 text-gray-400">
              17.5%
            </div>
          </div>

     
      </div>

      <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >

          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full  sm:w-12 sm:h-12">
            <Image
      src="/dollarsign.png"
      alt="Picture of the author"
      width={100}
      height={100}
           />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">TVL</h6>
            <div className="mb-2 text-gray-400">
              1.25m 
            </div>
          </div>

     
      </div>

      <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full  sm:w-12 sm:h-12">
            <Image
      src="/ethlogo.png"
      alt="Picture of the author"
      width={30}
      height={40}
           />
            </div>
            <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">DEPOSITS</h6>
            <div className="mb-2 text-gray-400">
              250
            </div>
          </div>


     
      </div>

      </div>

            <div className="">
             
            <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100">
        
           
        
      </div>

      
             
            </div>
            <button
            type="button"
            className="flex items-center justify-center w-full p-3 mt-5 font-semibold tracking-wide rounded-md bg-blue-700 text-gray-200"
          >
            Manage
          </button>

          <div className=" grid gap-4 grid-cols-3 items-center mt-3 mx-4 ">
             <p>Epoch 2</p>
             <p>9 Sep - 16 Sep</p>
             <p>Version 3</p>
          </div>

          </div>
          
        </div>  
        
      
    </div>
  

  
     
      <Footer />
    </>
  );
}
