import {createEffect, createEvent, createStore} from "effector";
import UserDto from "../interfaces/user.dto";
import axios from "axios";
import Api from "../services/Api";



export const SubmitUserForm = createEffect(async () => {
    return true
})


export const registerUser = createEffect(async (params: UserDto) => {
    const user = await axios.post(Api.apiUrl + '/auth/register', params);
    return user
})

// подписка на начало вызова эффекта
registerUser.watch(params => {
    console.log('эффект вызван с аргументом', params)
})

// подписка на успешное завершение вызова эффекта
registerUser.done.watch(({result, params}) => {
    console.log('вызвов с аргументом', params)
    console.log('завершён со значением', result)
})

// подписка на исключение, возникшее в процессе работы эффекта
registerUser.fail.watch(({error, params}) => {
    console.log('вызов с аргументом', params)
    console.log('завершён с ошибкой', error)
})



export const updateUsersTable = createEffect(async () => {
    return true
})



const changed = createEvent()
export const UserData = createStore({}).on(changed, (_, newData) => newData)