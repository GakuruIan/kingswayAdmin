import React,{useState} from 'react'

const MulitpleImages = ({files}) => {
  const [images,setImages]= useState();
  const selectedFiles= Array.from(files)
  const imageArray =  selectedFiles.map((selectedFile)=>{
    return URL.createObjectURL(selectedFile)
  })
  
  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
       {
         imageArray.map((image,index)=>{
      return <div key={index} className="w-full h-full md:h-auto">
                <img src={image} alt="" srcSet="" className='object-cover h-full w-full'/>
              </div>  
         })
       }
       </div>
  </>
  )
}

export default MulitpleImages