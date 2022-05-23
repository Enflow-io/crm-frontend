import {BuildingInterface} from "./BuildingInterface";
import {BlockInterface} from "./BlockInterface";

export interface UserListInterface {
    buildings?: BuildingInterface[]
    blocks?: BlockInterface[]
    id: number
    name: string
}