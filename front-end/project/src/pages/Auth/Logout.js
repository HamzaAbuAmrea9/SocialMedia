import axios from 'axios'
import React from 'react'
import { LOGOUT, baseURl } from '../../Api/Api'
import Cookie from "cookie-universal";
export default function Logout() {

    const cookie=new Cookie();
    
    async function handlelogout(){
      try {
         const res =await axios.get(`${baseURl}/${LOGOUT}`,{headers:{
              Authorization:"Bearer "+ cookie.get("socialmedia")
          }, 
         
          }) ;
          cookie.remove("socialmedia");
          navigate("/login");
      } catch (error) {
        console.log(error) ; 
      }
    }
    return (
    <div>
      <button onClick={handlelogout}>Logout</button>
    </div>
  )
}
