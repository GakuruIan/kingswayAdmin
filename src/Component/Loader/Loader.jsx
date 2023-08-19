import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = ({text}) => {
  return (
    <div className='flex z-30 items-center justify-center min-h-screen w-full fixed top-0 left-0 backdrop-blur-3xl bg-[rgba(0,0,0,0.5)]'>
        <div className="flex items-center justify-center flex-col gap-4 w-72 md:w-96 drop-shadow-2xl h-44 bg-white  px-4 py-2">
            <PacmanLoader color="#36d7b7"/>
            <h6 className="text-xl">{text}</h6>
        </div>
    </div>
  )
}

export default Loader