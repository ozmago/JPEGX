import React from "react";

import Footer from "../components/Footer";

import NavComponent from "../components/NavComponent";

import Image from 'next/image'
import { Button } from "@material-tailwind/react";



export default function index() {

  return (
    <>
      <div className="relative ">
        <div className="absolute  -z-10 top-[-50rem] -left-[40rem] ">
          <img src="Group47.svg" className="relative top-[20rem]" />
        </div>
      </div>


 
      <NavComponent />
      
      <div className="flex flex-col border-width: 1px;  rounded-xl container mx-auto py-10  flex-wrap justify-around items-center mt-10 px-4 p-4"
        style={{
          border: '0.88px solid',
  
          backdropFilter: 'saturate(180%) blur(10px)',
          background: '#000000',
        }}
      >
      <div className= "container  mx-auto max-w-6xl p-8 2xl:px-0 ">
      <div className="flex flex-col mt-10 rounded-xl p-3 bg-blue-gray-500">
        
        <div className="flex flex-col  rounded-b-xl py-3 ">
          <div className="flex justify-between">
          <div className="">
         <Image
      src="/bayc-footer.webp"
      alt="Picture of the author"
      width={70}
      height={70}
           />
         </div>
            <h1 className="font-bold font-RubikBold">1</h1>
          </div>
          <div className="flex  justify-between font-mono">
            <p>Available: 0.01</p>
            <p>Option Size</p>
          </div>
        </div>

        
      </div>
      
      </div>

      <div className= "container mt-5 mx-auto max-w-6xl p-8 2xl:px-0">
      <div className="flex flex-col max-w-7xl rounded-xl  p-3 bg-blue-gray-500">
        
        <div className="flex flex-col  rounded-b-xl py-3 ">
        <div className="absolute left-1/2 -ml-0.5 w-0.5 h-10 bg-gray-600"></div>
          <div className="flex justify-between">
          <div className="">
        
         </div>
            <h1 className="font-bold font-RubikBold">16 Sep 2022</h1>
          </div>
          <div className="flex  justify-between font-mono">
            <p>ETH90</p>
            
            <p>Expiry</p>
          </div>

          <div className="flex mt-5 justify-between font-mono">
            <p>Breakeven</p>
            
            <p>ETH 96.8823529</p>
          </div>

          <div className="flex mt-5 justify-between font-mono">
            <p>Option Price</p>
            
            <p>ETH 6.8823529</p>
          </div>
          <div className="flex mt-5 justify-between font-mono">
            <p>Side</p>
            
            <p>CALL</p>
          </div>
          <div className="flex mt-5 justify-between font-mono">
            <p>IV</p>
            
            <p>122</p>
          </div>
        </div>

        


        
      </div>

      <div className="flex flex-col mt-5 mb-10 max-w-7xl rounded-xl  p-3 bg-blue-gray-500">
        
        <div className="flex flex-col  rounded-b-xl py-3 ">
        
  
        <div className="flex mt-5 justify-between font-mono">
            <p>Purchasing with</p>
            
            <p>WETH</p>
          </div>
        
          <div className="flex mt-5 justify-between font-mono">
            <p>Option Size</p>
            
            <p>ETH 6.8823529</p>
          </div>

          <div className="flex mt-5 justify-between font-mono">
            <p>Fees</p>
            
            <p>ETH 6.8823529</p>
          </div>

          <div className="flex mt-5 justify-between font-mono">
            <p>Premium</p>
            
            <p>ETH 6.8823529</p>
          </div>
           
          <div className="flex mt-5 justify-between font-mono">
            <p>You will pay</p>
            
            <p>ETH 6.975882162668819 WETH</p>
          </div>
 
           
 
  
</div>

          
        </div>
      <p className="flex justify-center font-bold mb-5">This option will Auto Exercise and can be settled anytime after expiry</p>
        <div className="flex justify-center mb-10 container mx-auto max-w-6xl p-8 2xl:px-0">
        <button className="relative z-0 rounded bg-pink-500 px-80 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
        Collateral not available
  </button>
        </div>
      </div>
      
      </div>
      

     
        
        
     
      <Footer />
    </>
  );
}
