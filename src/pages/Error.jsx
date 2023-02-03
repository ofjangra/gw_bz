import React from 'react'
import { Link } from 'react-router-dom'



const ErrorPage = () =>{
    return(
        <>
        <div style = {{
            position:"fixed",
            top:"0",
            left:"0",
            height:"100vh",
            width:"100%",
            minHeight:"580px",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
        }}>
             <h1 style = {{color:"var(--text-primary)", 
             marginBottom:"20px",
             fontFamily:"Manrope",
             fontWeight:"bold"
             }}>
                Oops! Something went wrong!
            </h1>
            <Link to = "/login" id = "errorAfter">Login Again</Link>

        </div>
        </>
    )
}

export default ErrorPage