import { UserListType } from "./userList"

export interface ChannelType {
    user: string
    channelName: string
    title: string
    description:string
    image:string
    visibility:Boolean
    rate:number
    password:string
    userList:UserListType[]
}