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
                
              {/* Section 2 */}


              

              </div>
              
            

            </div>
          </div>
          

      </div>
      
 {/* Features start */}

 <div className="flex space-x-80 mt-20 items-center justify-center">
        <div className="grid gap-10 gap-x-20 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center text-2xl text-green-600">
              <p>Liquidity Providers</p>
            </div>
            <h6 className="mb-2 mt-5 text-lg font-bold leading-5 tracking-wider uppercase "> Earn</h6>
            <div className="mb-2 mt-5 min-w-min  text-green-600">
             Pool your NFTs at <br/> competitive strike prices<br/>  and earn more yield on<br/>  your assets

            </div>
          </div>
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center text-2xl text-green-600">
              <p>NFT Owners</p>
            </div>
            <h6 className="mb-2 mt-5 text-lg font-bold leading-5 tracking-wider uppercase">Hedge</h6>
            <div className="mb-2 mt-5 text-green-600">
              Decrease risk by<br/>  hedging your NFT <br/> porfolio against large<br/>  price swings
            </div>
          </div>
          <div className="px-12 text-center sm:px-0">
            <div className="flex items-center justify-center text-2xl text-green-600">
              <p>NFT Traders</p>
            </div>
            <h6 className="mb-2 mt-5 text-lg font-bold leading-5 tracking-wider uppercase">Speculate</h6>
            <div className="mb-2 mt-5 text-green-600">
              Access deep liquidity of<br/>  the best NFT projects at<br/>  competitive strike prices for<br/>  leveraged NFT trading
            </div>
          </div>
          
        
        </div>
      </div>

            {/* Features end */}
      
             
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

                 <div className="font-bold mt-3 ">
                <Image
                 src="/Superfluid.jpg"
                 alt="Superfluid Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">Superfluid</p>
                 </div>

                 <div className="">
                <Image
                 src="/tellor.svg"
                 alt="Tellor Logo"
                 width={70}
                 height={70}
                 />
                 <p className="font-bold mt-3">Tellor</p>
                 </div>

                

                </div>
                {/* Technology Icons 2 */}
               
              
                
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
               

