import {createEffect, createEvent, createStore} from "effector";

export const SubmitBlockForm = createEffect(async () => {
    return true
})

export const BlockCreated = createEffect(async () => {
    return true
})

export const BlockUpdated = createEffect(async () => {
    return true
})


export const saveBlockToCopy = createEvent<any>();
export const clearBlockToCopy = createEvent<any>();
export const openBlockCreateModal = createEvent<any>();
export const closeBlockCreateModal = createEvent<any>();
export const $blockToCopyStore = createStore<any>({})
    .on(saveBlockToCopy, (state, blockToCopy) => {
        const clone = {...blockToCopy}
        delete clone["createdAt"]
        delete clone["updatedAt"]
        delete clone["localId"]
        return clone
    })
    .on(closeBlockCreateModal, (state, blockToCopy) => {
        return {}
    })
    .on(clearBlockToCopy, (state, blockToCopy) => {
        return {}
    })