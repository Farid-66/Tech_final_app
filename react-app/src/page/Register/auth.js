import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import commerce from '../../Ecommerce'
import PageNotFound from '../../PageNotFound'
function Auth() {

    const { token } = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        commerce.customer.getToken(token, "save=true");
    },[])

    if((localStorage.getItem("commercejs_customer_token"))){
        return (navigate('/'))
    }else{
        return (<PageNotFound/>)
    }
}

export default Auth