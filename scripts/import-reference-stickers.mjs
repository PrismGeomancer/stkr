/** Import the user's exact reference artwork into the existing native SVG asset set. */
import {readFileSync,writeFileSync} from 'node:fs';
import {chromium} from '@playwright/test';
const reference=readFileSync(process.argv[2]??'STICKER.png').toString('base64');
const tiles=[['chill-pepe',30,749,137,99],['love-cat',202,746,126,102],['doge-wow',379,750,107,98],['gm-penguin',531,752,112,96],['sad-cat',699,751,126,97],['banana-cat',864,750,123,98],['screaming-cat',32,1011,122,107],['bullish-frog',196,1014,135,104],['rainbow-guy',366,1014,130,105],['cool-cat',531,1013,136,104],['heart-dude',698,1014,126,103],['sleepy-cat',862,1011,135,108]];
const browser=await chromium.launch();const page=await browser.newPage();
try{for(const [name,x,y,w,h] of tiles){const clip=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}"><image width="1024" height="1536" href="data:image/png;base64,${reference}"/></svg>`;
 const raster=await page.evaluate(async({svg,name})=>{const img=new Image();img.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);
 // Remove only edge-connected cream paper. Enclosed eyes/fur/highlights stay intact.
 if(name==='doge-wow')ctx.clearRect(90,0,c.width-90,12);const data=ctx.getImageData(0,0,c.width,c.height),p=data.data,w=c.width,h=c.height;const samples=[0,w-1,(h-1)*w,w*h-1].map(i=>[p[i*4],p[i*4+1],p[i*4+2]]);const seen=new Uint8Array(w*h),queue=[];const add=i=>{if(i<0||i>=w*h||seen[i])return;seen[i]=1;const o=i*4;if(samples.some(s=>Math.hypot(p[o]-s[0],p[o+1]-s[1],p[o+2]-s[2])<13)){p[o+3]=0;queue.push(i);}};for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}for(let head=0;head<queue.length;head++){const i=queue[head];if(i%w)add(i-1);if(i%w<w-1)add(i+1);add(i-w);add(i+w);}ctx.putImageData(data,0,0);return c.toDataURL('image/png');},{svg:clip,name});
 writeFileSync(`public/stickers/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="280" viewBox="0 0 320 280"><title>${name.replaceAll('-',' ')}</title><image x="12" y="8" width="296" height="264" preserveAspectRatio="xMidYMid meet" href="${raster}"/></svg>`);console.log(`Imported ${name}`);
}}finally{await browser.close();}
