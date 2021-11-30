import {NextRouter, Router} from "next/router";
import * as Lockr from "lockr";

class UsersService {
    static async exit(router: NextRouter) {
        Lockr.rm('user')
        await router.push('/login');
    }
}

export default UsersService