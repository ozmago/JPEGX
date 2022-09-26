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
        {/* Start of Deposit section */}
        <div className="container mx-auto mt-10 py-10 flex flex-wrap justify-around items-center px-4">
        

        
        <div className=" bg-black sm:p-10 p-6 rounded-xl">
          
        <div className="flex ">
         <div className="flex ml-3 ">
         <Image
      src="/bayc-footer.webp"
      alt="Picture of the author"
      width={70}
      height={70}
           /> 
           
         </div>
        
         <div className="flex justify-between">
          
    <button className="relative z-0 rounded bg-pink-500 px-10 py-2 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
        CALLS
  </button>
  <p className="text-5xl ml-4">ETH 85</p>
         </div>
         
         </div>
         <p className="font-bold 2XL">BAYC Option Vault</p>
         <p className="">Deposit BAYC NFTS into strikes providing liquidity into<br/>
         option pools to earn yield in premiums
         </p>
         

        <div className="grid gap-4 grid-cols-3 mt-5">
       

      </div>
       {/* Epoch button */}
       <div className="flex justify-left">
  <div>
    <div className="dropdown relative">
      <button
        className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Epoch 2 (Current)
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          className="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <ul
        className="
          dropdown-menu
          min-w-max
          absolute
          
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <a
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Epoch 1</a
          >
        </li>
        <li>
          <a
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Epoch 2</a
          >
        </li>
        <li>
          <a
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Epoch 3</a
          >
        </li>
      </ul>
    </div>
  </div>
</div>
       {/* Epoch button end */}

      {/* Epoch Duration */}

      <div><p>Epoch duration :</p> <p className="font-bold">9 Sep 2022 14:59 - 16 Sep 2022 09:00</p><p/></div>
      


            <button
            type="button"
            className="flex items-center justify-center w-full p-3 mt-5 font-semibold tracking-wide rounded-md bg-blue-700 text-gray-200"
          >
            Buy CALL Options
          </button>

          <div className="flex justify-start">
          <div className="grid gap-4 grid-cols-3 mt-5">
        <div className="flex flex-col rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
          <div className="px-12 text-center sm:px-0">
            <div className="flex  w-10 h-10 mx-auto mb-4 rounded-full sm:w-12 sm:h-12">
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

      

      </div>
      </div>
          
          
        </div>

        {/* End of Deposit section */}

        {/* Start of Deposit section 2 */}
        <div className="p-1 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">

        
        <div className=" bg-black sm:p-10 p-6 rounded-xl">
          
        <div className=" flex justify-between   ">
        

         
         <div className="flex flex-col mt-10 justify-center rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
        <div className="flex justify-between">
    <p className="">Balance</p>
    <p className="">5 BAYC</p>
     </div>

      {/* strike prize button */}
      <div className="">
  <div>
    <div className="dropdown relative">
      <button
        className="
          dropdown-toggle
          mt-5
          w-full
          px-6
          py-2.5
          bg-gray-500
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
         
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Epoch 2 (Current)
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          className="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <ul
        className="
          dropdown-menu
          min-w-max
          absolute
          
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <a
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Epoch 1</a
          >
        </li>
        <li>
          <a
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Epoch 2</a
          >
        </li>
        <li>
          <a
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            >Epoch 3</a
          >
        </li>
      </ul>
    </div>
  </div>
</div>
       {/* Epoch button end */}
         <div className="flex mt-10 justify-center items-center ">
          
  <div className="flex  justify-center items-center border-b border-teal-500 py-2">

    <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-4 px-1 leading-tight focus:outline-none" type="number" placeholder="Enter Amount" aria-label="Full name"></input>
    <button className="bg-green-800 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full">
  Enter
</button>
    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
      Clear
    </button>
  </div>
  </div>
      
         </div>


         </div>
         

         {/* Epoch Info Section starts */}

            <div className="">
             
            <div className="flex flex-col mt-10 justify-center rounded-xl  p-4"
        style={{
  
          backdropFilter: 'saturate(180%) blur(14px)',
          background: '#454545',
        }}
      >
        <div className="flex justify-between">
    <p className="">Epoch</p>
    <p className="Font-bold">2</p>
     </div>

     <div className="flex justify-between">
    <p className="">Withdrawable</p>
    <p className="font-bold">16 Sep 2022</p>
     </div>
        
            </div>
            </div>

          {/* Epoch Info Section starts */}

           {/* Epoch Info Section starts */}

           <div className="">
             
             <div className="flex flex-col mt-10 justify-center rounded-xl  p-4"
         style={{
   
           backdropFilter: 'saturate(180%) blur(14px)',
           background: '#454545',
         }}
       >

         {/* gas cost section starts */}

         <div className="">
             
             <div className="flex flex-col mt-10 justify-center rounded-xl  p-2"
         style={{
   
           backdropFilter: 'saturate(180%) blur(14px)',
           background: '#454545',
         }}
       >
         
             </div>
             </div>
 
           {/* Egas cost section ends */}
         
             </div>
             </div>
 
           {/* Epoch Info Section starts */}
            <button
            type="button"
            className="flex items-center justify-center w-full p-3 mt-5 font-semibold tracking-wide rounded-md bg-blue-700 text-gray-200"
          >
            Insert
          </button>

          <div className=" grid gap-4 grid-cols-3 items-center mt-3 mx-4 ">
             <p>Epoch 2</p>
             <p>9 Sep - 16 Sep</p>
             <p>Version 3</p>
          </div>

          </div>
          
        </div>
        </div>
        {/* End of Deposit section 2 */}
      
      <div className= "container  mx-auto max-w-6xl p-8 2xl:px-0 ">


      <div className="flex flex-col mt-10 rounded-xl p-3 bg-blue-gray-500">
        
        <div className="flex flex-col  rounded-b-xl py-3 ">
        <div className="flex  justify-between font-mono">
            <p>Option</p>
            <p>Strike prize</p>
            <p>Total deposits</p>
            <p>Total purchased</p>
          </div>
        <div className="flex flex-col mt-5 rounded-xl p-1 bg-black">
        
          <div className="flex justify-between">
            
          <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
         <Image
      src="/bayc-footer.webp"
      alt="Picture of the author"
      width={70}
      height={70}
           />
         </div>
            <h1 className="font-bold font-RubikBold">1</h1>
          </div>
         
          </div>
        </div>

        
      </div>
      
      </div>

      <div className= "container mt-5 mx-auto max-w-6xl p-8 2xl:px-0">
      <div className="flex flex-col max-w-7xl rounded-xl  p-3 bg-blue-gray-500">
        
        <div className="flex flex-col  rounded-b-xl py-3 ">
        <div className="absolute left-1/2 -ml-0.5 w-0.5 h-10 bg-gray-600"></div>
        <div className="flex flex-col mt-5 rounded-xl p-1 bg-black">
        
        <div className="flex justify-between">
          
        <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
       <Image
    src="/bayc-footer.webp"
    alt="Picture of the author"
    width={70}
    height={70}
         />
       </div>
          <h1 className="font-bold font-RubikBold">1</h1>
        </div>
       
        </div>
        </div>

        


        
      </div>

      <div className="flex flex-col mt-5 mb-10 max-w-7xl rounded-xl  p-3 bg-blue-gray-500">
        
        <div className="flex flex-col  rounded-b-xl py-3 ">
        
  
        <div className="flex flex-col mt-5 rounded-xl p-1 bg-black">
        
        <div className="flex justify-between">
          
        <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
       <Image
    src="/bayc-footer.webp"
    alt="Picture of the author"
    width={70}
    height={70}
         />
       </div>
          <h1 className="font-bold font-RubikBold">1</h1>
        </div>
       
        </div>
 
           
 
  
</div>

          
        </div>
      <p className="flex justify-center font-bold mb-5">Contract address:</p>
        <div className="flex justify-center mb-10 container mx-auto max-w-6xl p-8 2xl:px-0">
   
        </div>
      </div>
      
      </div>
      

     
        
        
     
      <Footer />
    </>
  );
}
