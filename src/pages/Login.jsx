import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'

import * as Yup from "yup"

import { Link, Navigate, useNavigate } from "react-router-dom"

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const Login = () =>{

	const navigate = useNavigate()

	useEffect(() =>{
		const authCookie = document.cookie
		if(authCookie == 'auth=true'){
			navigate("/samil/dashboard")
		}
	  }, [])

    const [loginErr, setLoginErr] = useState(null)


    const LoginUser = async (body) =>{

		const response = await fetch("/api/samil/signin", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},

			body:JSON.stringify({
				email:body.email,
				password:body.password
			}),

		})

		function setCookie() {
			var d = new Date();
			d = new Date(d.getTime() + 1000 * 86400);
			document.cookie = 'auth' + '=' + 'true' + '; expires=' + d.toGMTString() + ';';
		}

		if(response.status == 200){
			setCookie()
			return navigate("/samil/dashboard")
		}

		const jsonResponse = await response.json()

		if(jsonResponse.error){
			return setLoginErr(jsonResponse.error)
		}

	}

	const formik = useFormik({
		initialValues: {
			email:"",
			password:""
		},
		validationSchema: Yup.object({
			email: Yup.string()
			.required("user ID is required"),
			password: Yup.string()
			.required("Password is required")
		}),
		onSubmit: values =>{
            console.log(values)
			LoginUser(values)
		}
	})

	return(
		<>
		
			<div className = "SignupMain LoginMain">
				<div className = "authIntro">
					<img src = "/img/logo.png" alt = "logo"/>
					<h2>Login</h2>
				</div>

				<form className = "authForm" onSubmit = {formik.handleSubmit}>
                    {loginErr ? <p style = {{color:"firebrick"}}>{loginErr}</p> : null}
					<div className = "field">
						<label htmlFor = "email">Email</label>
						<input type = "text"
						name = "email"
						id = "email"
						value = {formik.values.email}
						onChange = {formik.handleChange}
						onBlur = {formik.handleBlur}/>
						{formik.touched.email && formik.errors.email ? 
						<p style = {{color:"Firebrick"}}>{formik.errors.email}</p> :
						null}
					</div>
					<div className = "field">
						<label htmlFor = "password">Password</label>
						<input type = "password"
						name = "password"
						id = "password"
						value = {formik.values.password}
						onChange = {formik.handleChange}
						onBlur = {formik.handleBlur}/>
						{formik.touched.password && formik.errors.password ?
						<p style = {{color:"Firebrick"}}>{formik.errors.password}</p> :
						null}
                    </div>
					<button type = "submit">Submit</button>
				</form>
			</div> 
		</>
	)
}


export default Login
