import {createEffect, createEvent, createStore} from "effector";
import UserDto from "../interfaces/user.dto";

export const submitBuildingForm = createEffect(async () => {
    return true
})

export const buildingUpdated = createEffect(async () => {
    return true
})


export const $copyObject = createEvent<any>();
export const $clearCopyObjStore = createEvent<any>();
export const OpenCreateObjectModal = createEvent();
export const CloseCreateObjectModal = createEvent();
export const $$objectToCopy = createStore({})
    .on($copyObject, (state, objectToCopy) => {
        const clone = {...objectToCopy}
        delete clone["createdAt"]
        delete clone["updatedAt"]
        delete clone["localId"]
        delete clone["blocks"]
        return clone
    })
    .on(CloseCreateObjectModal,(state, objectToCopy) => {
        // alert('close')
        return {}
    } )

