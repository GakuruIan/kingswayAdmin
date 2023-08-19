import React,{useState} from 'react'

const Preview = ({file}) => {
    const [preview,setPreview] = useState({})
    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload=()=>{
        setPreview(reader.result)
      }
     
    }
  return (
    <div className="h-56 w-56 lg:h-96 lg:w-96">
       <img src={preview} alt="" srcSet="" className='object-cover h-full w-full'/>
    </div>
  )
}

export default Preview