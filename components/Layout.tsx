import React from 'react';
import Footer from './Footer';
import NavComponent from './NavComponent';

export default function Layout() {
  return (
    <>
      <div className="relative ">
        <div className="absolute  -z-10 top-[-50rem] -left-[40rem] ">
          <img src="Group47.svg" className="relative top-[20rem]" />
        </div>
      </div>

      <NavComponent />

      <Footer />
    </>
  );
}

export { Layout };

