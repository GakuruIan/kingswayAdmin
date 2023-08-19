import React,{useState,useEffect} from 'react'
import BaseUrl from '../../config/axiosConfig'
import { useSelector } from 'react-redux'

import Notify from '../../Component/Notification/Notify'
import Loader from '../../Component/Loader/Loader'
import { toast } from 'react-toastify';


import Table from '../../Component/Table/Table'


const Sellers = () => {
  const {currentUser} = useSelector(state=>state.user)
  const {accesstoken} = currentUser

  const [Sellers,setSellers] =useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    async function FetchSellers(){
      await BaseUrl.get('/sellers',{
        headers:{
          'Authorization':'Bearer '+accesstoken
        }
      }).then(response=>{
          if(response.status === 200){
             setLoading(false)
             setSellers(response.data)

          }
      })
      .catch(err=>{
        setLoading(false)
        toast.error("An error occurred") 
        console.log(err)
      })
    }
    FetchSellers()
  },[])

  return (
    <div>
          {/* notification */}
          <Notify/>

         {/* Loading Screen */}
         {loading && <Loader text="Fetching data...."/>}

        <Table title="Sellers" data={Sellers}/>
    </div>
  )
}

export default Sellers