export interface VoteType {
  user: string;
  channel: string;
  title: string;
  suggestion?: number;
  nonce?: number;
  voteHash: number;
}
