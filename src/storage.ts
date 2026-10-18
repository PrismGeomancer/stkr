import type {Activity,Sticker} from './data';
export type SavedState={stickers:Sticker[];saved:string[];draft?:Record<string,unknown>;activity?:Activity[]};
let dbPromise:Promise<IDBDatabase>|null=null;
function database(){return dbPromise??=new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('sticker-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('data');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function loadState():Promise<SavedState|undefined>{const db=await database();return new Promise((resolve,reject)=>{const r=db.transaction('data').objectStore('data').get('state');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function saveState(value:SavedState){const db=await database();return new Promise<void>((resolve,reject)=>{const tx=db.transaction('data','readwrite');tx.objectStore('data').put(value,'state');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
/** Preferences never throw: storage can be blocked by privacy settings. */
export function readPref(key:string){try{return localStorage.getItem(key);}catch{return null;}}
export function writePref(key:string,value:string){try{localStorage.setItem(key,value);return true;}catch{return false;}}
export function removePref(key:string){try{localStorage.removeItem(key);}catch{/* ignore */}}
export function creatorIdentity(){let id=readPref('sticker-creator');if(!id){id=`human-${crypto.randomUUID().slice(0,6)}`;writePref('sticker-creator',id);}return id;}
