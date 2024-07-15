import {NextRouter, Router} from "next/router";
import * as Lockr from "lockr";

class UsersService {
    static async exit(router: NextRouter) {
        Lockr.rm('user')
        await router.push('/login');
    }

    static isDefaultUser(user: {role: string}){
        if(!user?.role){
            return false;
        }
        return user.role === 'default';
    }

    static canViewCianPage(user: {id: number}){
        if(!user?.id){
            return false;
        }
        return user.id === 17 || user.id === 44;
    }
}

export default UsersService