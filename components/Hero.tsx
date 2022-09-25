import React from "react";
import Image from 'next/image'

export default function HeroSection() {
  return (

    
    <div className="relative mt-10 min-h-screen overflow-hidden">

      <div className="relative flex flex-col items-center justify-center">
      <div className="hero min-h-16 py-4">
            <div className="text-center hero-content">
              <div className="">
                <h1 className="mb-5 text-6xl font-bold">
                  Decentralized NFT Options
                </h1>
                <p className="mb-7">
                  Earn, hedge and speculate on your favorite NFTs
                </p>
                <div className="flex max-width-md mt-20 justify-between text-green-600">
                <p className="mb-7 font-bold ">
                 Liquidity Providers<br/>
                 <p className="font-bold text-white mt-5 ">Earn</p>
                </p>

                <p className="mb-6 font-bold ">
                 NFT Owners<br/>
                 <p className="font-bold text-white mt-5 ">Hedge</p>
                 <br/>
                </p>

                <p className="mb-7 font-bold ">
                 NFT Traders<br/>
                 <p className="font-bold text-white mt-5 ">Speculate</p>
                 <br/>
                </p>
                </div>

              </div>
              
              <div className="">
                
               

              </div>

            </div>
          </div>
      </div>
      
                <div className="flex relative flex items-center justify-center text-green-600 font-bold space-x-20 ">
                <p className=" max-w-[16%] ">
                 Pool NFTs at competitive strike prices and 
                 earn more yield on tour assets
                 
                </p>

                <p className="max-w-[15%] ">
                 Decrease risk by hedging your NFT portfolio against large price swings
                 
                </p>

                <p className="max-w-[15%]   ">
                 Access deep liquidity of the best NFT projects 
                 for leveraged NFT trading
                 
                 <br/>
                </p>
                </div>
              {/* Built using section */}

                <div className="text-center hero-content mt-10">
              <div className="">
                <h1 className="mb-5 text-4xl ">
                  Built Using
                </h1>
                
                {/* Technology Icons*/}
                <div className="flex space-x-80 mt-20 items-center justify-center">

                <div className="">
                <Image
                 src="/polygon.png"
                 alt="Polygon Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">Polygon</p>
                 </div>

                 <div className="">
                <Image
                 src="/APWine.png"
                 alt="APwine Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">APWine</p>
                 </div>

                 <div className="">
                <Image
                 src="/optimism.png"
                 alt="Optimism Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">Optimism</p>
                 </div>

                

                </div>
                {/* Technology Icons 2 */}
               
                <div className="flex space-x-80 mt-20 items-center justify-center">

                <div className="">
                <Image
                 src="/EPNS.jpg"
                 alt="Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">EPNS</p>
                 </div>

                 <div className="">
                <Image
                 src="/Superfluid.jpg"
                 alt="Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">Superfluid</p>
                 </div>
                 
                 <div className="">
                <Image
                 src="/Yearn.jpg"
                 alt="Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">Yearn</p>
                 </div>
                


                 </div>
                
              </div>
              
              <div className="">
                
               

              </div>

            </div>

      <div className="relative   top-[10vh] max-w-full sm:top-0 ">
        <div className="absolute w-full object-contain">
          <img src="circle.png" alt="" className="relative  object-fill" />
        </div>
      </div>
    </div>
    
  );
}
               

