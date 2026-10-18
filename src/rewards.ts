import type {Sticker} from './data';
export interface RewardEvaluation {threshold:number;solPerReward:number;progress:number;unlockedSol:number;}
export interface DistributionRewardEngine {recordDownload(sticker:Sticker):Partial<Sticker>;evaluate(sticker:Sticker):RewardEvaluation;}
// Download counts originate in the client. Any real payout must be verified server-side before settlement.
export const rewardEngine:DistributionRewardEngine={recordDownload:s=>({downloads:s.downloads+1,eligible:s.eligible+1}),evaluate:s=>({threshold:100,solPerReward:.5,progress:s.eligible>0&&s.eligible%100===0?100:s.eligible%100,unlockedSol:Math.floor(s.eligible/100)*.5})};
