export interface ICrateEvent {
    userId: number
    description: string
    date: Date
    type: string
}

export interface IEvent extends ICrateEvent {
    id: number
}