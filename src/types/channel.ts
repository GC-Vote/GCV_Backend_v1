import { UserListType } from "./userList";

export interface ChannelType {
  user: string;
  channelName: string;
  title: string;
  description?: string;
  image?: string;
  visibility?: boolean;
  rate?: number;
  password?: string;
  userList?: UserListType[];
}
