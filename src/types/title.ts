export interface TitleType {
  user: string;
  channel: string;
  titleName: string;
  title: string;
  description?: string;
  image?: string;
  period: Date;
  method?: number;
  suggestionLimit?: number;
  permissioned?: boolean;
  suggestionCount?: number;
  voteCount?: number;
  status?:boolean
}
