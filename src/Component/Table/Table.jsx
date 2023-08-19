import React,{useState,useEffect} from 'react'

const Table = ({title,data}) => {
  return (
    <div className='bg-[#fff] px-2 md:px-0 my-4 '>
        <div className="bg-gray-700 w-full py-2 px-2">
                 <h1 className="text-base mb-2 text-white">{title}</h1>    
            </div>
        <div className="px-2 pb-4"> 
            <div className="relative overflow-x-auto py-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="border-b border-gray-200 py-2 text-base text-gray-600">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-light">
                                Fullname
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                            Email
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3 font-light">
                            Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.map((info)=>{
                                return  <tr key={info._id} className="bg-white border-b border-gray-300">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                   {info.fullname}
                                </th>
                                <td className="px-6 py-4">
                                   {info.email}
                                </td>
                                <td className="px-6 py-4">
                                   {info.phone}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className={`px-4 py-2 text-center text-base text-white  ${info.contacted ? 'bg-green-600 hover:bg-green-500' : ' hover:bg-[#396AFC] bg-[#2948FF]'  } `}>{info.contacted ? 'Contacted' : 'Mark as Contacted'}</button>
                                </td>
                            </tr>
                            })
                        }
                    
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default Table