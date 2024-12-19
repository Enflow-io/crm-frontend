import React, {useEffect, useState} from 'react'
import * as Lockr from "lockr";
import { User } from '../services/types';
const useUser = () => {

    const [user, setUser]  = useState<User | null>(null)
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            setUser(Lockr.get('user'))
        }
    }, []);


    return user;
}

export default useUser;

