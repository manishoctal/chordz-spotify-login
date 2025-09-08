import React, { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { callbackAuthorizationCodeFlow } from "../utils/auth/authSpotify";
import { useLocation } from 'react-router-dom';
import spotifyGet from "../utils/auth/spotifyGet";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Callback() {

    const [auth, setAuth] = useState()

    const [profile, setProfile] = useContext(AuthContext)


    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ status: false, data: {} })
    const urlParams = useQuery()

    let authFunction = callbackAuthorizationCodeFlow
    // authFunction = callbackImplicitGrantFlow
    const login = () => {
        let isSubscribed = true
        setLoading(true)
        authFunction(urlParams.get('code')).then(res => {
            setAuth(res)
            if (isSubscribed) {
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            if (isSubscribed) {
                setError({ status: true, data: err })
                setLoading(false)
            }
        })

        return () => isSubscribed = false
    }


    useEffect(login, [urlParams.get('code')])
    useEffect(() => {
      
            if (auth?.token||urlParams.get('access_token')) {
                spotifyGet('/me',auth?.token|| urlParams.get('access_token')).then(res => {
                    setProfile(res)
                })
            }
        
    }, [urlParams.get('access_token'), auth])



    return (<></>)
}
