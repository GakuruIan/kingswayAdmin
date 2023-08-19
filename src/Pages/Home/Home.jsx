import React,{useState,useEffect} from 'react'
import Table from '../../Component/Table/Table'
import BaseUrl from '../../config/axiosConfig'
import { useSelector } from 'react-redux'

import Loader from '../../Component/Loader/Loader'
import Notify from '../../Component/Notification/Notify'

const Home = () => {
  const {currentUser} = useSelector(state=>state.user)
  const {accesstoken} = currentUser
  
  const [loading,setLoading] = useState(false)
  const[Sellers,setSellers] = useState([])

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
         {/* Nofiticaation */}
         <Notify/>

         {/* Loader */}
         {loading && <Loader text="Fetching data.."/>}
         <Table title="Sellers" data={Sellers}/>
    </div>
  )
}

export default Home