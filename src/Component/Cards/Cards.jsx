import React from 'react'
import { Link } from 'react-router-dom'

const Cards = () => {
  return (
    <div className='mt-20 mb-2 py-2 px-2 md:px-0'>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">

         <Link to="/dashboard/properties" className="w-full bg-[#2948FF] group  py-4 px-2">
                <span className="mb-4 h-10 w-10 flex items-center justify-center p-2 bg-[#2948FF] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>
                </span>
              <div className=" flex items-center justify-between ">
                 <h2 className="text-xl text-white">Properties</h2>
                 <h6 className=" text-xl text-white">10</h6>
              </div>
         </Link>

         <Link to="/dashboard/buyers" className="w-full bg-[#FF4B2B] group  py-4 px-2">
                <span className="mb-4 h-10 w-10 flex items-center justify-center p-2 bg-[#FF4B2B] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                </span>
              <div className=" flex items-center justify-between ">
                 <h2 className="text-xl text-white">Buyers</h2>
                 <h6 className="text-xl text-white">10</h6>
              </div>
         </Link>

         <Link to="/dashboard/sellers" className="w-full bg-[#FF416C] group py-4 px-2">
                <span className="mb-4 h-10 w-10 flex items-center justify-center p-2 bg-[#FF416C] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>

                </span>
              <div className=" flex items-center justify-between ">
                 <h2 className="text-xl text-white">Sellers</h2>
                 <h6 className="text-xl text-white">10</h6>
              </div>
         </Link>

         <Link to="/dashboard/Agents" className="w-full bg-[#A044FF] group  py-4 px-2">
                <span className="mb-4 h-10 w-10 flex items-center justify-center p-2 bg-[#A044FF] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                </span>
              <div className=" flex items-center justify-between ">
                 <h2 className="text-xl text-white">Agents</h2>
                 <h6 className="text-white text-center text-xl">10</h6>
              </div>
         </Link>

      </div>
    </div>
  )
}

export default Cards