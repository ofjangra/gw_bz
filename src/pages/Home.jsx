import React, { useState } from "react";

import { useEffect } from "react";
import {motion} from "framer-motion"
import { MenuOutlined} from '@mui/icons-material'
import ErrorPage from "./Error";
import { Routes, Route, Link,  useNavigate } from "react-router-dom"
import { Dashboard,
    TrafficEChallan, 
    Forms, 
    RTOCircular} from "./Blog"

const Home = () =>{
    const navigate = useNavigate()

    

    useEffect(() =>{
        const authCookie = document.cookie
        if(!authCookie){
            return navigate("/samil")
        }
		if(!authCookie == 'auth=true'){
			return navigate("/samil")
		}
        getUserDashboard()
    },[])

    

    const [isMobile, setIsMobile] = useState(false)

    const [error, setError] = useState(false)

    const [url, setUrl] = useState("")

    const [challan_dash_url, setChallan_dash_url] = useState("https://gaadiwalaonline.com/tc.php")

    const [sideNavActive, setSideNavActive] =useState(false)


    const getUserDashboard = async () =>{  
        
            const response = await fetch("/api/samil", {

            method:"GET",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
        
                })

            if(response.status==401){
                return navigate("/samil")
            }

            const jsonResponse = await response.json()

            if(response.status ==200){
                setError(false)
                let userAgent = window.navigator.userAgent
                let platForm = window.navigator.platform
        
                const iosPlatforms = ["iPhone", "iPad", "iPod"]
        
                if (iosPlatforms.includes(platForm) || /Android/.test(userAgent)){
                    setIsMobile(true)
                }
                console.log(jsonResponse)

                if(jsonResponse.challan_dash && jsonResponse.challan_dash_url) {
                    setChallan_dash_url(jsonResponse.challan_dash_url)
                }

                return setUrl(jsonResponse.userlink)
            }
            
            return setError(true)

            }

    const logoutUser = async () =>{
        const response = await fetch("/api/samil/logout", {
            method:"GET",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })

        function setCookie() {
            var d = new Date();
            d = new Date(d.getTime() + 1000 * 3);
            document.cookie = 'auth' + '=' + 'false' + '; expires=' + d.toGMTString() + ';';
        }

        if(response.status==200){
            setCookie()
            console.log('cookies removed')
            navigate("/samil")
        }
    }
            
    
    return(
        <>

        {

            error ? <ErrorPage/> :
            <>
                <motion.nav className="upperNav">
                    <motion.div className="upperNavContent"animate = {sideNavActive ? {marginLeft:"280px"} : {marginLeft:"40px"}}>
                        <MenuOutlined onClick = {() => setSideNavActive(!sideNavActive)} id = "navToggle"/>
                        <button id = "logout" onClick={logoutUser}>Logout</button>
                    </motion.div>
                </motion.nav>
                <motion.div   animate = {sideNavActive ? {width:"260px"} : {width:"0", marginLeft:"-40px"}} className = "sideNav">
                        <motion.ul animate = {sideNavActive ? {display:"flex"} : {display:"none"}}>
                            <li onClick={ () => setSideNavActive(!sideNavActive)}>
                                <Link to="dashboard" className="navlink">Dashboard</Link>
                            </li>
                           

                            <li onClick={ () => setSideNavActive(!sideNavActive)}>
                                <Link to="trafficechallan" className="navlink">Traffic E Challan</Link>
                            </li>

                           
                            <li onClick={ () => setSideNavActive(!sideNavActive)}>
                                <Link to="forms" className="navlink">Forms</Link>
                            </li>
                            <li onClick={ () => setSideNavActive(!sideNavActive)}>
                                <Link to="rtocircular" className="navlink">RTO Circular</Link> 
                            </li>
                        </motion.ul>
                </motion.div>

                
                <Routes>
                    <Route path="dashboard" element = {<Dashboard url={url} isMobile = {isMobile}/>}/>

                    <Route path="trafficechallan" element = {<TrafficEChallan url={challan_dash_url} isMobile = {isMobile}/>}/>
                    <Route path="forms" element = {<Forms/>}/>
                    <Route path="rtocircular" element = {<RTOCircular/>}/>
                </Routes>
           </>

        }
        </>
    )
}


export default Home