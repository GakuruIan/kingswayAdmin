import React,{useState,useEffect} from 'react'
import Table from '../../Component/Table/Table'

import BaseUrl from '../../config/axiosConfig'
import { useSelector } from 'react-redux'

import Loader from '../../Component/Loader/Loader'
import Notify from '../../Component/Notification/Notify'

import { toast } from 'react-toastify';

const Buyers = () => {
  const [Buyers,setBuyers] = useState([])
  const [loading,setLoading] = useState(false)
  

  const {currentUser} = useSelector(state=>state.user)
  const {accesstoken} = currentUser

  useEffect(()=>{
    async function FetchData(){
        setLoading(true)
        await BaseUrl.get('/buyers',{
          headers:{
            'Authorization':'Bearer '+accesstoken
          }
        })
        .then((response)=>{
          if(response.status === 200){
            setLoading(false)
            setBuyers(response.data)
          }
        })
        .catch(err=>{
          setLoading(false)
          toast.error("An error occurred")
        })
      }
      FetchData()
  },[])

return (
    <div>
      {/* Loading */}
      {loading && <Loader text="Fetching data..."/>}

      {/* notification */}
      <Notify/>

        <Table title="Buyers" data={Buyers}/>
    </div>
  )
}

export default Buyers