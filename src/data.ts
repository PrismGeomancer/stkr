import {publicAsset} from './paths';
import {rewardEngine} from './rewards';
export type Sticker = {id:string;name:string;asset:string;creator:string;creatorWallet?:string;downloads:number;saves:number;shares:number;remixes:number;eligible:number;created:string;tags:string[];category:string;description:string;ancestry?:string;local?:boolean;published?:boolean};
export const creators = [
 {id:'7xA…91K',stickers:48,downloads:124300,rewards:2.5,avatar:'love-cat'},
 {id:'3mF…2Qa',stickers:31,downloads:86100,rewards:1.5,avatar:'chill-pepe'},
 {id:'8pT…K3n',stickers:28,downloads:74900,rewards:1,avatar:'gm-penguin'},
 {id:'4sD…8Lm',stickers:24,downloads:58300,rewards:1,avatar:'lucky-duck'},
 {id:'9hJ…2Fp',stickers:22,downloads:41700,rewards:.5,avatar:'sad-cat'},
 {id:'2vK…7Gh',stickers:19,downloads:38900,rewards:.5,avatar:'banana-cat'},
 {id:'6dF…9Lp',stickers:17,downloads:31500,rewards:.5,avatar:'bullish-frog'},
 {id:'3zM…8Qk',stickers:15,downloads:26800,rewards:.5,avatar:'rainbow-guy'},
 {id:'7wP…1He',stickers:14,downloads:21900,rewards:.5,avatar:'cool-cat'},
 {id:'5kL…9Tq',stickers:12,downloads:18600,rewards:.5,avatar:'heart-dude'},
];
const names=['Chill Pepe','Love Cat','Doge Wow','GM Penguin','Sad Cat','Banana Cat','Screaming Cat','Bullish Frog','Rainbow Guy','Cool Cat','Heart Dude','Sleepy Cat','Lucky Duck','Smol Ghost','Love Bun','Coffee First','Holy Guacamole','Pink Pepe','Moon Cat','Cozy Penguin','Golden Heart','Mint Bun','Tiny Doge','GM Coffee'];
const assets=['chill-pepe','love-cat','doge-wow','gm-penguin','sad-cat','banana-cat','screaming-cat','bullish-frog','rainbow-guy','cool-cat','heart-dude','sleepy-cat','lucky-duck','smol-ghost','love-bun','coffee-first','holy-guacamole','pink-pepe','moon-cat','cozy-penguin','golden-heart','mint-bun','tiny-doge','gm-coffee'];
const downloads=[12468,8924,32100,6396,4141,11777,18600,9452,5222,14181,3814,7636,2875,6733,4380,5839,3943,4266,6179,3551,4691,2047,9129,3162];
const saves=[842,412,1200,301,223,688,1100,504,318,772,190,421,187,339,282,366,243,267,401,208,344,165,588,224];
export const seeds:Sticker[]=names.map((name,i)=>({id:`STK-${(0x8F21A+i*71).toString(16).toUpperCase()}`,name,asset:publicAsset(`/stickers/${assets[i]}.svg`),creator:creators[i===6?0:i===1?1:i%10].id,downloads:downloads[i],saves:saves[i],shares:[220,184,768,141,73,229,434,182,104,317,93,168,79,130,103,145,80,95,132,83,98,62,211,76][i],remixes:[42,32,91,28,12,38,67,31,22,47,15,27,11,24,18,23,16,18,26,14,17,9,34,12][i],eligible:[368,224,500,196,141,277,300,252,122,281,114,236,75,133,180,139,43,166,179,151,91,47,229,62][i],created:`2026-09-${String(30-i).padStart(2,'0')}T12:00:00Z`,tags:[i<12?'meme':'cute',assets[i].includes('cat')?'cat':assets[i].split('-').pop()!,'reaction'],category:assets[i].includes('cat')?'Cats':assets[i].includes('pepe')||assets[i].includes('frog')||assets[i].includes('doge')?'Memes':assets[i].includes('coffee')||assets[i].includes('avocado')?'Everyday':'Cute',description:`A little ${name.toLowerCase()} energy for your group chat. Made to stick together.`,published:true}));
export const compact=(n:number)=>n>=1000?`${Math.floor(n/100)/10}K`:String(n);
export const short=(a:string)=>a.length>15?`${a.slice(0,4)}…${a.slice(-4)}`:a;
export const score=(s:Sticker)=>s.downloads+s.shares*3+s.saves*2+s.remixes*5;
export const progress=(s:Sticker)=>rewardEngine.evaluate(s).progress;
export const rewards=(s:Sticker)=>rewardEngine.evaluate(s).unlockedSol;
export type Activity={icon:string;text:string;at?:number;time?:string};
const seededAt=Date.now();
export const initialActivity:Activity[]=[{icon:'love-cat',text:'3mF…2Qa downloaded Love Cat',at:seededAt-12e3},{icon:'gm-penguin',text:'8pT…K3n unlocked a 0.5 SOL reward',at:seededAt-64e3},{icon:'sad-cat',text:'7xA…91K published a new sticker',at:seededAt-185e3},{icon:'banana-cat',text:'2vK…7Gh reached 100 downloads',at:seededAt-247e3},{icon:'chill-pepe',text:'A creator remixed Chill Pepe',at:seededAt-366e3}];
/** Relative label for an activity entry; older saved entries carry a fixed `time` string. */
export function ago(a:Activity,now=Date.now()){if(a.at===undefined)return a.time??'';const s=Math.max(0,Math.round((now-a.at)/1000));return s<10?'just now':s<60?`${s}s ago`:s<3600?`${Math.floor(s/60)}m ago`:s<86400?`${Math.floor(s/3600)}h ago`:`${Math.floor(s/86400)}d ago`;}
