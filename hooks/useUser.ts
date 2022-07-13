import React, {useEffect, useState} from 'react'
import * as Lockr from "lockr";
const useUser = () => {

    const [user, setUser]  = useState(null)
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            setUser(Lockr.get('user'))
        }
    }, []);


    return user;
}

export default useUser;

