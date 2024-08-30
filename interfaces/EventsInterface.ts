export interface ICrateEvent {
    userId: number
    description: string
    date: Date
    type: string
}

export interface IUpdateEvent extends ICrateEvent {
    id: number
}
export interface IEvent extends ICrateEvent {
    id: number
}