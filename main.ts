import{mkdirSync as K,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs'
const T="!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%\"%",B=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>a/b,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0),(a,b)=>(a>>>0)%(b>>>0),,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b,,(a,b)=>+(a==b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))]
function V(p,u){
const A=Int32Array,D=new A(256),C=new A(64),M=new A(256)
let s=0,c=0,g=0,q=0,k=0,o='',n=p.length
try{for(;;){
if(k==1e6|(q>>>0)>=n)throw k==1e6?10:9
let w=p[q],y=T.charCodeAt(w)-32
if(!y)throw 5
let f=--y>>4,a=y>>2&3,b=y&3
if(q+f>=n|s<a|s-a+b>256)throw q+f>=n?9:s<a?2:3
k++
q+=1+f
if(!w)return[o,0]
if(w==1)D[s++]=p.readInt8(q-1)
else if(w==2)D[s++]=p.readInt32LE(q-4)
else if(w<8){
if(w==3)s--
else if(w==4|w==6)D[s]=D[s-(w==4?1:2)],s++
else if(w==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]]
else[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]]
}else if(w<35){
if(w==23|w==27)D[s-1]=w==23?-D[s-1]:~D[s-1]
else{if(w>18&w<23&&!D[s-1])throw 4;D[s-2]=B[w-16](D[s-2],D[s-1]);s--}
}else if(w<51){
let r=p.readInt16LE(q-2)
if(w<49||(w==49)==(D[--s]==0))q+=r
}else if(w==51){if(c==64)throw 7;C[c++]=q;q=p[q-2]|p[q-1]<<8
}else if(w==52){if(!c)throw 8;q=C[--c]
}else if(w>63&&w<66){let a=D[s-1];if(a<0|a>255)throw 6;w==64?D[s-1]=M[a]:(M[a]=D[s-2],s-=2)
}else if(w==80){let y=String(D[--s]);if(o.length+y.length>65536)throw 11;o+=y
}else if(w==81){if(o.length>65535)throw 11;o+=String.fromCharCode(D[--s]&255)
}else if(w==82)D[s++]=g<u.length?u[g++]:-1
else return[o,D[--s]&255]
}}catch(e){return[o,e]}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
R(I).map(d=>{
let a=I+'/'+d,e=O+'/'+d,[o,c]=V(F(a+'/program.bin'),F(a+'/input.bin'))
K(e,{recursive:!0})
W(e+'/stdout.bin',o,'latin1')
W(e+'/exit.txt',c+'\n')
})
