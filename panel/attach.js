"use strict";(()=>{var U="openchamber.sdk";var Tn="data-oc-scrolling",Sr=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${Tn}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Tn}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Tn}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Tn}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function yr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",r=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=n.get(o);s!==void 0&&clearTimeout(s),n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var sl=`(${yr.toString()})(document);`;var bs=/^[a-z][a-z0-9-]{0,39}$/;var gs=e=>Object(e)===e&&!Array.isArray(e),wr=(e,t)=>Object.keys(e).every(n=>t.includes(n)),ks=e=>String(e)===e&&e.length>=1&&e.length<=60,xs=e=>String(e)===e&&e.length>=1&&e.length<=80,Es=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!gs(n)||!bs.test(n.id)||!ks(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!wr(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!wr(n,["kind","id","label","value","options","disabled"])||!xs(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!gs(o)||!wr(o,["value","label"])||!xs(o.value)||!ks(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var Ar=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Ts=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var _s=/^[A-Za-z0-9_-]{1,80}$/;var Ss=["left","right","top","bottom"];var ys=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!ys(o,t+1,n))return!1;return!0},vr=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(vr);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(vr)}return String(e)===e||Number.isFinite(e)},Rr=e=>{try{return String(e.id)!==e.id||!_s.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ss.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ys(e.data)||!vr(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var As=["file","directory","other","missing"],Ir=e=>!!(e&&"sessionId"in e),Cr=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Lr=e=>e!==null&&e.kind==="message",Nr=e=>e!==null&&e.kind==="session";var vs=/^[0-9a-f]{7,64}$/i,Pr=e=>vs.test(e),_n=500,Sn=32e3,Rs=16e3,Os=128,Is=200,Cs=2e3,Ls=16e3,Ns=80,Ps=200,Ms=16e3;var Us=2e3;var Mr=2e4,yn=1024,wn=2e6;var An=64e3,vn=8e3,Ur=4e3;var Dr=9e4;var Ds=999,Gs=1e4,zt=500,$s=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Hs=["stopped","starting","ready","failed"],il=new Set($s),Fs=e=>il.has(e),zs=e=>e&&Fs(e)?e:"HOST_REJECTED",Rt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Rt):Object(e)===e?Object.values(e).every(Rt):!1,Bs=e=>Rt(e)&&JSON.stringify(e).length<=Ms,ws=e=>e?.trim().slice(0,Ps)??"",Ot=e=>{let t=e.id.trim().slice(0,Os),n=e.title.trim().slice(0,Is),r=e.url.trim().slice(0,Cs),o=e.text?.trim().slice(0,Ls),s=e.author?.trim().slice(0,Ns),a=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:a};if(o&&(p.text=o),s&&(p.author=s),a==="pull"){let c=ws(e.branches?.head),m=ws(e.branches?.base);c&&m&&(p.branches={head:c,base:m})}return Bs(e.data)&&(p.data=e.data),p},Gr=e=>{let t=Ot(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},$r=e=>{let t={text:e.text.trim().slice(0,Rs)};return e.send&&(t.send=!0),t},Hr=e=>e===null||!Number.isFinite(e)?null:Math.min(Ds,Math.max(0,Math.round(e))),Fr=e=>Number.isFinite(e)?Math.min(Gs,Math.max(0,Math.ceil(e))):0;var It=e=>e.length>0&&e.length<=yn&&!e.includes("\0")&&!e.includes("\\");var Rn=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Us?!1:!e.split("/").some(n=>n==="."||n===".."),al=new Set(Hs),zr=e=>!!(e&&"status"in e&&al.has(String(e.status))&&!("body"in e)),On=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Br=e=>!!(e&&"content"in e&&String(e.content)===e.content),jr=e=>!!(e&&"written"in e&&e.written===!0),Xr=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),ll=new Set(As),Wr=e=>!!(e&&"kind"in e&&"size"in e&&ll.has(String(e.kind))&&Number.isFinite(e.size)),Vr=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),cl=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),pl=e=>Object(e)===e?e:null,Or=e=>String(e)===e&&e.length>0,dl=e=>{if(!Or(e.id))return null;if(e.ok===!0){let t={channel:U,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Or(e.error)?{channel:U,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:zs(Or(e.code)?e.code:void 0)}:null},Kr=e=>{let t=pl(e);return!t||t.channel!==U||t.v!==1?null:t.type==="result"?dl(t):!cl.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var js=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,ul=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",R=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},Xs=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),In=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${yn} characters without NUL or backslash.`)),Cn=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},P=e=>(e.value+=1,`oc-${e.value}`),Qr=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(l=>l===t.parent),r=e.requestTimeoutMs??Mr,o=new Set,s=new Set,a=new Set,p=new Set,c=new Set,m=new Set,h=new Set,b=new Set,_=new Set,L=null,N=null,K=new Set,pe=new Set,C=null,te=null,ke=!1,le=new Map,fe=new Map,he=new Map,H=!1,v={value:0},A=null,Te=null,ee=!1,O=!1,ie=null,Pt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,me=l=>{t.parent.postMessage(l,"*")},ne=(l,u)=>{for(let S of l)try{S(u)}catch(T){console.error(T)}},Be=l=>{if(!(l instanceof MessageEvent)||!n(l.source))return;let u=Kr(l.data);if(!u)return;if(u.type==="workspace"){let T=fe.get(u.payload.subscriptionId);T&&ne([T],u.payload.snapshot);return}if(u.type==="shells"){let T=he.get(u.payload.subscriptionId);T&&ne([T],u.payload.snapshot);return}if(u.type==="ready"){A=u.payload,Te=Pt(u.payload.session),ne(o,u.payload),ne(s,u.payload.directory),ne(a,u.payload.session),Te&&ne(p,Te),ne(c,u.payload.connection),ne(m,u.payload.settings),ne(h,u.payload.item);return}if(u.type==="directory"){A&&(A={...A,directory:u.payload.directory}),ne(s,u.payload.directory);return}if(u.type==="session"){A&&(A={...A,session:u.payload.session}),u.payload.session?Te?.sessionId!==u.payload.session.id&&(Te=Pt(u.payload.session)):Te=null,ne(a,u.payload.session);return}if(u.type==="session-lifecycle"){Te=u.payload,ne(p,u.payload);return}if(u.type==="connection"){A&&(A={...A,connection:u.payload.connection}),ne(c,u.payload.connection);return}if(u.type==="settings"){A&&(A={...A,settings:u.payload.settings}),ne(m,u.payload.settings);return}if(u.type==="item"){A&&(A={...A,item:u.payload.item}),ne(h,u.payload.item);return}if(u.type==="status-control-event"){ne(b,u.payload);return}if(u.type==="popover-closed"){ne(_,u.payload);return}if(u.type==="action"){let T=W=>{H||me({channel:U,v:1,type:"action-result",id:u.id,payload:W})},z=N;if(!z){T({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>z(u.payload)).then(()=>T({ok:!0}),W=>{let X=(W instanceof Error?W.message:String(W)).trim();T({ok:!1,error:(X||"Action failed.").slice(0,zt)})});return}if(u.type==="file-open"){let T=u.payload;if(te&&Ts(te,T))return;te=T,ne(K,u.payload);return}if(u.type==="file-saved"){ne(pe,u.payload.version);return}if(u.type==="file-snapshot"){let T=X=>{H||me({channel:U,v:1,type:"file-snapshot-result",id:u.id,payload:X})},z=X=>T({error:(X.trim()||"Could not read the edited file.").slice(0,zt)}),W=C;if(!W){z("This extension does not edit files.");return}Promise.resolve().then(()=>W(u.payload.purpose)).then(X=>{if(Ar(X)>2e7){z(`The file is over ${2e7} ${"bytes"in X?"bytes":"characters"}.`);return}if(X.version.length>256){z(`The snapshot version is over ${256} characters.`);return}T({snapshot:"bytes"in X?{bytes:X.bytes,version:X.version}:{content:X.content,version:X.version}})},X=>z(X instanceof Error?X.message:String(X)));return}if(u.type==="resolve"){let T=W=>{me({channel:U,v:1,type:"resolve-result",id:u.id,payload:W})},z=L;if(!z){T({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>z(u.payload)).then(W=>T({item:W?Ot(W):null}),W=>{let X=(W instanceof Error?W.message:String(W)).trim();T({error:(X||"Command failed.").slice(0,zt)})});return}let S=le.get(u.id);if(S){if(clearTimeout(S.timer),le.delete(u.id),u.ok){S.resolve(u.payload);return}S.reject(new R(u.code,u.error))}};t.addEventListener("message",Be),me({channel:U,v:1,type:"hello"});let xe=(l,u=r)=>H||t.parent===t?Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((S,T)=>{let z=setTimeout(()=>{le.delete(l.id),T(new R("HOST_TIMEOUT","Host did not answer in time."))},u);le.set(l.id,{resolve:S,reject:T,timer:z}),me(l)}),re=l=>xe(l).then(()=>{}),Y={channel:U,v:1},st=l=>{!H&&t.parent!==t&&me(l)},Mt=()=>st({...Y,type:"file-save"}),sn=l=>{!js(l)||!ul(l)||(l.preventDefault(),Mt())},an=l=>{!js(l)||l.key!=="Escape"||A?.surface!=="popover"||!A.popover||(l.preventDefault(),Gt(A.popover.id,"escape").catch(()=>{}))},bt=()=>{let l=A?.surface==="popover"?A.popover:void 0;if(!l)return;let u=ee||O;ie!==u&&(ie=u,V(l.id,u).catch(()=>{}))},F=()=>{A?.surface!=="popover"||ee||(ee=!0,bt())},ln=l=>{A?.surface!=="popover"||l.relatedTarget!==null||!ee||(ee=!1,bt())},cn=()=>{A?.surface!=="popover"||O||(O=!0,bt())},pn=()=>{A?.surface!=="popover"||!O||(O=!1,bt())},Re=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new R("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Ut=async l=>{l.kind!=="projects"&&Re(l.projectId);let u=await xe({...Y,type:"workspace-read",id:P(v),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return u},Dt=async(l,u)=>{l.kind!=="projects"&&Re(l.projectId);let S=P(v);fe.set(S,u);try{await re({...Y,type:"workspace-subscribe",id:P(v),payload:{subscriptionId:S,query:l}})}catch(T){throw fe.delete(S),H||me({...Y,type:"workspace-unsubscribe",id:P(v),payload:{subscriptionId:S}}),T}return()=>{!fe.delete(S)||H||me({...Y,type:"workspace-unsubscribe",id:P(v),payload:{subscriptionId:S}})}},dn=async(l,u)=>{l.kind==="session"&&Re(l.sessionId),l.kind==="project"&&Re(l.projectId);let S=P(v);he.set(S,u);try{await re({...Y,type:"shells-subscribe",id:P(v),payload:{subscriptionId:S,scope:l}})}catch(T){throw he.delete(S),H||me({...Y,type:"shells-unsubscribe",id:P(v),payload:{subscriptionId:S}}),T}return()=>{!he.delete(S)||H||me({...Y,type:"shells-unsubscribe",id:P(v),payload:{subscriptionId:S}})}},Et=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Rt(l.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&A?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let u=await xe({...Y,type:"storage",id:P(v),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new R("HOST_REJECTED","Host did not return storage data.");return u},Gt=(l,u)=>A?.features?.popovers!==!0&&!(A?.surface==="popover"&&A.popover?.id===l)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):re({...Y,type:"popover-close",id:P(v),payload:u?{id:l,reason:u}:{id:l}}),V=(l,u)=>A?.features?.popovers!==!0&&!(A?.surface==="popover"&&A.popover?.id===l)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):re({...Y,type:"popover-anchor",id:P(v),payload:{id:l,active:u}});return t.addEventListener("keydown",an,!0),t.addEventListener("pointerover",F),t.addEventListener("pointermove",F),t.addEventListener("pointerout",ln),t.addEventListener("focus",cn),t.addEventListener("blur",pn),{onAction:l=>(N=l,()=>{N===l&&(N=null)}),listProjects:async()=>{let l=await Ut({kind:"projects"});if(l.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Ut({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Ut({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Dt({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Dt({kind:"worktrees",projectId:l},S=>{S.kind==="worktrees"&&u(S)}),onSessions:(l,u)=>Dt({kind:"sessions",projectId:l},S=>{S.kind==="sessions"&&u(S)}),onRunningShells:(l,u)=>dn(l,u),readShellOutput:async(l,u)=>{Re(l,128);let S=u?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let T=u?.tailBytes;if(T!==void 0&&(!Number.isInteger(T)||T<1||T>65536))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let W=await xe({...Y,type:"shell-output",id:P(v),payload:{shellId:l,cursor:S,tailBytes:T}});if(!W||typeof W.output!="string"||!Number.isFinite(W.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async l=>{if(Re(l,128),(await xe({...Y,type:"shell-stop",id:P(v),payload:{shellId:l}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Re(l),await re({...Y,type:"open-session",id:P(v),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let S=Cn(u),T={op:"get",key:l};S&&(T.scope=S);let z=await Et(T);return z.op==="get"&&z.found?z.value:void 0},set:async(l,u,S)=>{let T=Cn(S),z={op:"set",key:l,value:u};T&&(z.scope=T),await Et(z)},delete:async(l,u)=>{let S=Cn(u),T={op:"delete",key:l};S&&(T.scope=S),await Et(T)},keys:async l=>{let u=Cn(l),S={op:"keys"};u&&(S.scope=u);let T=await Et(S);if(T.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return T.keys}},onReady:l=>(o.add(l),A&&l(A),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),A&&l(A.directory),()=>{s.delete(l)}),onSession:l=>(a.add(l),A&&l(A.session),()=>{a.delete(l)}),onSessionLifecycle:l=>(p.add(l),Te&&l(Te),()=>{p.delete(l)}),onConnection:l=>(c.add(l),A&&l(A.connection),()=>{c.delete(l)}),onSettings:l=>(m.add(l),A&&l(A.settings),()=>{m.delete(l)}),onItem:l=>(h.add(l),A&&l(A.item),()=>{h.delete(l)}),onStatusControl:l=>(b.add(l),()=>{b.delete(l)}),onPopoverClosed:l=>(_.add(l),()=>{_.delete(l)}),setStatusControls:l=>A?.features?.statusControls!==!0?Promise.reject(new R("UNSUPPORTED","This host does not support status controls.")):Es(l)?re({...Y,type:"status-controls",id:P(v),payload:{controls:l}}):Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>A?.features?.popovers!==!0?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):Rr(l)?re({...Y,type:"popover-open",id:P(v),payload:l}):Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Gt,setPopoverAnchorActive:V,onResolve:l=>(L=l,()=>{L===l&&(L=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>_n?Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${_n} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>Sn)?Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${Sn} characters.`)):re({channel:U,v:1,type:"toast",id:P(v),payload:{...l,message:u}})},openUrl:l=>re({channel:U,v:1,type:"open-url",id:P(v),payload:{url:l}}),openCommit:l=>Pr(l)?re({channel:U,v:1,type:"open-commit",id:P(v),payload:{sha:l}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>re({channel:U,v:1,type:"open-surface",id:P(v),payload:{surfaceId:l}}),writeClipboard:l=>re({channel:U,v:1,type:"clipboard-write",id:P(v),payload:{text:l}}),compose:l=>re({channel:U,v:1,type:"compose",id:P(v),payload:l}),attach:l=>re({channel:U,v:1,type:"attach",id:P(v),payload:Ot(l)}),startSession:async l=>{l.projectId!==void 0&&Re(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Re(u.directory):(u.name!==void 0&&Re(u.name,200),u.baseBranch!==void 0&&Re(u.baseBranch,200)));let S=await xe({channel:U,v:1,type:"start-session",id:P(v),payload:Gr(l)},e.requestTimeoutMs??18e4);if(!Ir(S))throw new R("HOST_REJECTED","Host did not return a session.");return S},prompt:l=>xe({channel:U,v:1,type:"prompt",id:P(v),payload:$r(l)}).then(u=>{if(!Cr(u))throw new R("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>re({channel:U,v:1,type:"session-link",id:P(v),payload:Ot(l)}),close:()=>re({channel:U,v:1,type:"close",id:P(v)}),oauthStart:()=>re({channel:U,v:1,type:"oauth-start",id:P(v)}),oauthDisconnect:()=>re({channel:U,v:1,type:"oauth-disconnect",id:P(v)}),request:l=>(Rn(l.path)?xe({channel:U,v:1,type:"request",id:P(v),payload:l}):Xs()).then(u=>{if(!On(u))throw new R("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(Rn(l.path)?xe({channel:U,v:1,type:"service-request",id:P(v),payload:l}):Xs()).then(u=>{if(!On(u))throw new R("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>xe({channel:U,v:1,type:"service-status",id:P(v)}).then(l=>{if(!zr(l))throw new R("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(It(l)?xe({channel:U,v:1,type:"file-read",id:P(v),payload:{path:l}}):In()).then(u=>{if(!Br(u))throw new R("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>It(l)?u.length>wn?Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${wn} characters.`)):xe({channel:U,v:1,type:"file-write",id:P(v),payload:{path:l,content:u}}).then(S=>{if(!jr(S))throw new R("HOST_REJECTED","Host did not confirm the write.");return S}):In(),listDir:l=>(It(l)?xe({channel:U,v:1,type:"file-list",id:P(v),payload:{path:l}}):In()).then(u=>{if(!Xr(u))throw new R("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(It(l)?xe({channel:U,v:1,type:"file-stat",id:P(v),payload:{path:l}}):In()).then(u=>{if(!Wr(u))throw new R("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),S=l.system?.trim();if(u.length===0||u.length>An)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${An} characters.`));if(S!==void 0&&(S.length===0||S.length>vn))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${vn} characters.`));let T=l.maxOutputTokens===void 0?void 0:Math.min(Ur,Math.max(1,Math.floor(l.maxOutputTokens)));if(T!==void 0&&!Number.isFinite(T))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let z={prompt:u};return S!==void 0&&(z.system=S),T!==void 0&&(z.maxOutputTokens=T),xe({channel:U,v:1,type:"generate",id:P(v),payload:z},e.requestTimeoutMs??Dr).then(W=>{if(!Vr(W))throw new R("HOST_REJECTED","Host did not return generated text.");return W})},setBadge:l=>re({channel:U,v:1,type:"badge",id:P(v),payload:{count:Hr(l)}}),setHeight:l=>re({channel:U,v:1,type:"resize",id:P(v),payload:{height:Fr(l)}}),onFileOpen:l=>(K.add(l),ke||(ke=!0,t.addEventListener("keydown",sn,!0)),te&&l(te),()=>{K.delete(l)}),onFileSnapshot:l=>(C=l,()=>{C===l&&(C=null)}),onFileSaved:l=>(pe.add(l),()=>{pe.delete(l)}),reportFileChange:l=>st({...Y,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:Mt,reportFileUnsupported:()=>st({...Y,type:"file-unsupported"}),dispose:()=>{for(let l of fe.keys())me({...Y,type:"workspace-unsubscribe",id:P(v),payload:{subscriptionId:l}});fe.clear();for(let l of he.keys())me({...Y,type:"shells-unsubscribe",id:P(v),payload:{subscriptionId:l}});he.clear(),H=!0,L=null,N=null,C=null,K.clear(),pe.clear(),ke&&t.removeEventListener("keydown",sn,!0),t.removeEventListener("message",Be),t.removeEventListener("keydown",an,!0),t.removeEventListener("pointerover",F),t.removeEventListener("pointermove",F),t.removeEventListener("pointerout",ln),t.removeEventListener("focus",cn),t.removeEventListener("blur",pn);for(let l of le.values())clearTimeout(l.timer),l.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));le.clear(),o.clear(),s.clear(),a.clear(),p.clear(),c.clear(),m.clear(),h.clear(),b.clear(),_.clear()}}};var Ks=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var $p=new Set(Ks);var Ys=["none","agent","user"];var Fp=new Set(Ys);var fl=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],hl=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qs=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of fl)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of hl){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},eo=(e,t)=>{qs(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var ml={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Z=(e,t)=>`var(--${e}, var(--oc-${ml[e]}, ${t}))`,pt=Z("surface-background","transparent"),Ln=Z("surface-elevated","transparent"),Bt=Z("surface-elevated-foreground","inherit"),Ze=Z("surface-foreground","inherit"),oe=Z("surface-muted-foreground","gray"),gl=Z("surface-muted","transparent"),Ne=Z("interactive-border","currentColor"),Oe=Z("interactive-hover","transparent"),dt=Z("interactive-active","transparent"),to=Z("interactive-selection","transparent"),no=Z("interactive-selection-foreground","inherit"),Qs=Z("interactive-focus-ring","currentColor"),Xe=Z("primary","currentColor"),ro=Z("primary-text","inherit"),oo=Z("error-text","inherit"),kl=Z("font-sans","inherit"),so=Z("font-mono","monospace"),ei=Z("radius","9px"),io=`calc(${ei} - 2px)`,Js=`calc(${ei} - 4px)`,ue=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,Zs=`box-shadow: 0 0 0 2px ${Qs};`,Nn=e=>{let t=Z(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${Z(`${e}-text`,"inherit")}; }`},xl=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,ti=`
.oc-sdk { color: ${Ze}; font-family: ${kl}; }
.oc-sdk :focus-visible { outline: none; ${Zs} }
.oc-sdk-mono { font-family: ${so}; }
.oc-sdk-muted { color: ${oe}; }
${Nn("success")}${Nn("warning")}${Nn("error")}${Nn("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Xe}; --oc-sdk-tone-text: ${ro}; }

.oc-sdk-btn { border-radius: ${io}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Js}; }
.oc-sdk-btn[data-variant="default"] { color: ${ro}; background: ${ue(Xe,10,pt)}; border-color: ${ue(Xe,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${ue(Xe,16,pt)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${ue(Xe,22,pt)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${gl}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${dt}, ${dt}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Ln}; color: ${Bt}; border-color: ${Ne}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${dt}, ${dt}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Oe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${dt}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Z("status-error","red")}; color: ${oo}; background: ${ue("var(--oc-sdk-tone)",7,pt)}; border-color: ${ue("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${ue("var(--oc-sdk-tone)",9,pt)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${ue("var(--oc-sdk-tone)",11,pt)}; }

.oc-sdk-field-note { color: ${oe}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${oo}; }
.oc-sdk-input { border-radius: ${io}; background: ${Ln}; color: ${Bt}; box-shadow: inset 0 0 0 1px ${ue(Ne,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${oe}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Qs}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${Z("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${Z("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${so}; }

.oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Xe}; }
.oc-sdk-search-clear { border-radius: ${Js}; color: ${oe}; }
.oc-sdk-search-clear:hover { background: ${Oe}; color: ${Ze}; }

.oc-sdk-trigger { border-color: ${Ne}; border-radius: ${io}; background: ${Ln}; color: ${Bt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${dt}, ${dt}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${oe}; }
.oc-sdk-trigger-chevron { color: ${oe}; }
.oc-sdk-popup { --surface-foreground: ${Bt}; border-color: ${ue(Ne,60)}; border-radius: 12px; background: ${Ln}; color: ${Bt}; box-shadow: 0 8px 24px ${ue(Ze,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Oe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${to}; color: ${no}; }
.oc-sdk-option-check { color: ${Ze}; }
.oc-sdk-option[data-destructive="true"] { color: ${oo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${ue(Z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${oe}; }
.oc-sdk-popup-empty { color: ${oe}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ne}; border-radius: 4px; color: ${Ze}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${ue(Ze,60,Ne)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ne}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${pt}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Xe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Zs} }
.oc-sdk-check-desc { color: ${oe}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${ue(Ze,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${oe}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Ze}; }
.oc-sdk-tab[aria-selected="true"] { color: ${no}; background: ${to}; border-color: ${Ne}; }
.oc-sdk-tab-count { color: ${oe}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Oe}; color: ${oe}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${ue("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Oe}; }
.oc-sdk-row[aria-selected="true"] { background: ${to}; color: ${no}; }
.oc-sdk-row-lead { font-family: ${so}; color: ${oe}; }
.oc-sdk-row-sub { color: ${oe}; }
.oc-sdk-row-meta { color: ${oe}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${oe}; }

.oc-sdk-empty-body { color: ${oe}; }

.oc-sdk-spinner { color: ${oe}; }
.oc-sdk-spinner-ring { border-color: ${Ne}; border-top-color: ${Xe}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${ue("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${ue("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${oe}; }

.oc-sdk-separator { color: ${oe}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${ue(Ne,40)}; }

.oc-sdk-progress-label { color: ${oe}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ne}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Xe}); }

.oc-sdk-text a { color: ${ro}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${ue(Ne,60)}; }
`,q=`
${Sr}
${xl}
${ti}`;var ni="oc-sdk-ui-style",Qe=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},J=e=>{let t=document.getElementById(ni);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}yr(document);let n=document.createElement("style");n.id=ni,n.textContent=e,document.head.appendChild(n)},w=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},Ie=e=>{let t=w("button",e);return t.type="button",t},se=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)},et=(e,t,n)=>{n==null||n===""?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)},ri=(e,t)=>{let n=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var bl=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},_e=(e,t)=>{J(q);let n=t,r=Ie("oc-sdk oc-sdk-btn"),o=bl(),s=document.createElement("span");r.append(s),e.append(r);let a=()=>{r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=!!n.disabled||!!n.loading,r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r?r.prepend(o):!n.loading&&o.parentNode===r&&o.remove(),se(s,n.label)},p=()=>{n.disabled||n.loading||n.onClick()};return r.addEventListener("click",p),a(),{update:c=>{n={...n,...c},a()},dispose:()=>{r.removeEventListener("click",p),r.remove()}}};var Pn=(e,t)=>{J(q);let n=t,r=w("label","oc-sdk oc-sdk-field"),o=w("span","oc-sdk-field-label"),s=n.multiline?w("textarea","oc-sdk-input"):w("input","oc-sdk-input"),a=w("span","oc-sdk-field-note");r.append(o,s,a),e.append(r);let p=()=>{se(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement?s.type=n.password?"password":"text":s.rows=n.rows??3,s.value!==n.value&&(s.value=n.value),s.disabled=!!n.disabled,et(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let m=!!n.error;r.dataset.invalid=m?"true":"false",s.setAttribute("aria-invalid",m?"true":"false");let h=n.error??n.helper??"";se(a,h),a.hidden=h===""},c=()=>{n.onChange(s.value)};return s.addEventListener("input",c),p(),{update:m=>{n={...n,...m},p()},dispose:()=>{s.removeEventListener("input",c),r.remove()}}};var oi="http://www.w3.org/2000/svg",El={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},We=(e,t,n)=>{let r=document.createElementNS(oi,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n&&r.setAttribute("class",n);let o=document.createElementNS(oi,"path");return o.setAttribute("d",El[e]),r.append(o),r};var ao=(e,t)=>{J(q);let n=t,r=w("div","oc-sdk oc-sdk-search"),o=w("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Ie("oc-sdk-search-clear");s.append(We("close",14)),s.tabIndex=-1,r.append(We("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let a=()=>{let h=n.placeholder??"Search";et(o,"placeholder",h),o.setAttribute("aria-label",n.label??h),s.setAttribute("aria-label","Clear search"),o.value!==n.value&&(o.value=n.value),r.dataset.active=n.value.trim()===""?"false":"true"},p=()=>{n.value!==""&&n.onChange(""),o.focus()},c=()=>{n.onChange(o.value)},m=h=>{h.key==="Escape"&&o.value!==""&&(h.preventDefault(),p())};return o.addEventListener("input",c),o.addEventListener("keydown",m),s.addEventListener("click",p),a(),n.autofocus&&o.focus(),{update:h=>{n={...n,...h},a()},dispose:()=>{o.removeEventListener("input",c),o.removeEventListener("keydown",m),s.removeEventListener("click",p),r.remove()}}};var Ve=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},tt=(e,t,n)=>{let r=e.filter(c=>!c.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let a=r.findIndex(c=>c.id===t);return a===-1?n==="next"?o.id:s.id:r[Math.min(r.length-1,Math.max(0,a+(n==="next"?1:-1)))]?.id??null};var si=(e,t)=>`${e}-${t??""}`,Mn=(e,t,n,r)=>{let o=Ie("oc-sdk-option");o.id=si(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!n.disabled,t==="option"&&o.setAttribute("aria-selected",n.selected?"true":"false"),o.dataset.destructive=n.destructive?"true":"false";let s=w("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let a=w("span","oc-sdk-option-hint");a.textContent=n.hint,o.append(a)}if(t==="option"){o.dataset.mark="check";let a=w("span","oc-sdk-option-check");a.append(We("check",14)),o.append(a)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Un=(e,t,n,r)=>{let o=si(n,r);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");et(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Tl=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;r>o&&n.top-8>o&&(e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`);let s=n.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(n.left-s))}px`)},Dn=(e,t,n,r)=>{e.append(n),Tl(n,t);let o=ri(e,r),s=()=>{r()},a=p=>{p.target instanceof Node&&n.contains(p.target)||r()};return window.addEventListener("resize",s),window.addEventListener("scroll",a,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",a,!0),n.remove()}};var ii=(e,t)=>{let n=t.trim().toLowerCase();return n?e.filter(r=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n)):[...e]},_l=0,jt=(e,t)=>{J(q);let n=t,r=`oc-sdk-select-${_l+=1}`,o=w("div","oc-sdk oc-sdk-select"),s=w("span","oc-sdk-field-label");s.id=`${r}-label`;let a=Ie("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",s.id);let p=w("span","oc-sdk-trigger-value");a.append(p,We("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,a),e.append(o);let c="",m=null,h=null,b=w("div","oc-sdk oc-sdk-popup"),_=w("div","oc-sdk-popup-search"),L=w("input","oc-sdk-input");L.type="text",L.autocomplete="off",_.append(L);let N=w("div");N.setAttribute("role","listbox"),N.tabIndex=-1,b.append(N);let K=()=>ii(n.options,n.searchable?c:""),pe=()=>n.searchable?L:N,C=O=>{m=O,Un(N,pe(),r,O)},te=()=>{Qe(N);let O=K();if(O.length===0){let ie=w("div","oc-sdk-popup-empty");ie.textContent="No matches",N.append(ie)}for(let ie of O)N.append(Mn(r,"option",{...ie,selected:ie.id===n.value},{hover:()=>C(ie.id),pick:()=>fe(ie.id)}));C(O.some(ie=>ie.id===m)?m:O[0]?.id??null)},ke=()=>{let O=h;h=null,O?.(),c="",L.value="",a.setAttribute("aria-expanded","false")},le=()=>{h||n.disabled||(m=n.value,L.placeholder=n.searchPlaceholder??"Search",n.searchable?b.prepend(_):_.remove(),te(),h=Dn(o,a,b,ke),a.setAttribute("aria-expanded","true"),pe().focus())},fe=O=>{ke(),a.focus(),O!==n.value&&n.onChange(O)},he=()=>{h?ke():le()},H=O=>{!h&&Ve(O)&&(O.preventDefault(),le())},v=O=>{let ie=Ve(O);ie?(O.preventDefault(),C(tt(K(),m,ie))):O.key==="Enter"?(O.preventDefault(),m&&fe(m)):O.key==="Escape"?(O.preventDefault(),ke(),a.focus()):n.searchable&&O.target!==L&&O.key.length===1&&!O.ctrlKey&&!O.metaKey&&L.focus()},A=()=>{c=L.value,te()},Te=O=>{h&&!(O.relatedTarget instanceof Node&&o.contains(O.relatedTarget))&&ke()},ee=()=>{se(s,n.label),s.hidden=!n.label;let O=n.options.find(ie=>ie.id===n.value);se(p,O?.label??n.placeholder??"Select"),p.dataset.empty=O?"false":"true",a.disabled=!!n.disabled,h&&te()};return a.addEventListener("click",he),a.addEventListener("keydown",H),b.addEventListener("keydown",v),L.addEventListener("input",A),o.addEventListener("focusout",Te),ee(),{update:O=>{n={...n,...O},ee()},dispose:()=>{ke(),a.removeEventListener("click",he),a.removeEventListener("keydown",H),b.removeEventListener("keydown",v),L.removeEventListener("input",A),o.removeEventListener("focusout",Te),o.remove()}}};var Sl=(e,t,n)=>{J(q);let r=t,o=Ie("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=w("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");n==="checkbox"&&s.append(We("check",12));let a=w("span","oc-sdk-check-text"),p=w("span","oc-sdk-check-label"),c=w("span","oc-sdk-check-desc");a.append(p,c),o.append(s,a),e.append(o);let m=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=!!r.disabled,se(p,r.label),se(c,r.description),c.hidden=!r.description},h=()=>{r.disabled||r.onChange(!r.checked)};return o.addEventListener("click",h),m(),{update:b=>{r={...r,...b},m()},dispose:()=>{o.removeEventListener("click",h),o.remove()}}},Gn=(e,t)=>Sl(e,t,"checkbox");var $n=(e,t)=>{J(q);let n=t,r=w("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Qe(r),r.dataset.track=n.trackBackground?"true":"false";for(let a of n.items){let p=Ie("oc-sdk-tab");p.setAttribute("role","tab");let c=a.id===n.activeId;p.setAttribute("aria-selected",c?"true":"false"),p.tabIndex=c?0:-1,p.dataset.id=a.id;let m=w("span");if(m.textContent=a.label,p.append(m),a.count!==void 0){let h=w("span","oc-sdk-tab-count");h.textContent=String(a.count),p.append(h)}p.addEventListener("click",()=>{a.id!==n.activeId&&n.onChange(a.id)}),r.append(p)}},s=a=>{let p=Ve(a,"horizontal");if(!p)return;let c=tt(n.items,n.activeId,p);if(c&&c!==n.activeId){a.preventDefault(),n.onChange(c);let m=r.querySelector(`[data-id="${CSS.escape(c)}"]`);m instanceof HTMLElement&&m.focus()}};return r.addEventListener("keydown",s),o(),{update:a=>{n={...n,...a},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var Xt=(e,t)=>{J(q);let n=t,r=w("div","oc-sdk oc-sdk-empty"),o=w("h2","oc-sdk-empty-title"),s=w("p","oc-sdk-empty-body"),a=w("div","oc-sdk-empty-action");r.append(o,s,a),e.append(r);let p=null,c=()=>{if(se(o,n.title),se(s,n.body),s.hidden=!n.body,a.hidden=!n.action,!n.action){p?.dispose(),p=null;return}let m={label:n.action.label,onClick:n.action.onClick};p?p.update(m):p=_e(a,{...m,variant:"outline",size:"sm"})};return c(),{update:m=>{n={...n,...m},c()},dispose:()=>{p?.dispose(),p=null,r.remove()}}};var Hn=(e,t={})=>{J(q);let n=t,r=w("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=w("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=w("span");r.append(o,s),e.append(r);let a=()=>{r.dataset.size=n.size??"default",se(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return a(),{update:p=>{n={...n,...p},a()},dispose:()=>{r.remove()}}};var Fn=(e,t)=>{J(q);let n=t,r=w("div","oc-sdk oc-sdk-banner"),o=w("div","oc-sdk-banner-text"),s=w("div","oc-sdk-banner-title"),a=w("div","oc-sdk-banner-body"),p=w("div","oc-sdk-banner-action");o.append(s,a),r.append(o,p),e.append(r);let c=null,m=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),se(s,n.title),se(a,n.body),a.hidden=!n.body,p.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let h={label:n.action.label,onClick:n.action.onClick};c?c.update(h):c=_e(p,{...h,variant:"outline",size:"xs"})};return m(),{update:h=>{n={...n,...h},m()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var ai=e=>e.filter(t=>!("separator"in t)),wl=0,lo=(e,t)=>{J(q);let n=t,r=`oc-sdk-menu-${wl+=1}`,o=w("div","oc-sdk oc-sdk-menu");e.append(o);let s=w("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let a=null,p=null,c=_e(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{a?_():L()}}),m=o.querySelector("button");m?.setAttribute("aria-haspopup","menu");let h=C=>{p=C,Un(s,s,r,C)},b=()=>{Qe(s);for(let C of n.items){if("separator"in C){let te=w("div","oc-sdk-separator");te.dataset.labeled="false",s.append(te);continue}s.append(Mn(r,"menuitem",C,{hover:()=>h(C.id),pick:()=>N(C.id)}))}h(ai(n.items).some(C=>C.id===p)?p:null)},_=()=>{let C=a;a=null,C?.(),p=null,m?.setAttribute("aria-expanded","false")},L=()=>{a||!m||(b(),a=Dn(o,m,s,_),m.setAttribute("aria-expanded","true"),s.focus())},N=C=>{_(),m?.focus(),n.onSelect(C)},K=C=>{let te=Ve(C);te?(C.preventDefault(),h(tt(ai(n.items),p,te))):C.key==="Enter"||C.key===" "?(C.preventDefault(),p&&N(p)):C.key==="Escape"&&(C.preventDefault(),_(),m?.focus())},pe=C=>{a&&!(C.relatedTarget instanceof Node&&o.contains(C.relatedTarget))&&_()};return s.addEventListener("keydown",K),o.addEventListener("focusout",pe),{update:C=>{n={...n,...C},c.update({label:n.label,variant:n.variant,size:n.size}),a&&b()},dispose:()=>{_(),s.removeEventListener("keydown",K),o.removeEventListener("focusout",pe),c.dispose(),o.remove()}}};var Al="https://kaneo.qubitquilt.dev",li=Al.replace(/\/api\/?$/,""),ci="kaneo",co=100,pi=["no-priority","low","medium","high","urgent"];var di={"no-priority":0,low:1,medium:2,high:3,urgent:4};var ut=class extends Error{status;code;constructor(t,n,r){super(r),this.name="KaneoError",this.status=t,this.code=n}};function vl(e){if(!e)return;let t={};for(let[n,r]of Object.entries(e))r==null||r===""||(t[n]=String(r));return Object.keys(t).length>0?t:void 0}function Rl(e,t){let n=typeof t=="object"&&t!==null?t:{},r=typeof n.message=="string"&&n.message?n.message:`Kaneo answered ${e}.`;return new ut(e,n.code??`HTTP_${e}`,r)}var Ol=10,Il=2,Cl=800;function ui(e){async function t({method:r,path:o,query:s,body:a}){let p=vl(s),c="/api"+o,m;for(let _=0;m=await e({method:r,path:c,...p?{query:p}:{},...a===void 0?{}:{body:JSON.stringify(a)}}),!(m.status!==429||_>=Il);_+=1)await new Promise(L=>setTimeout(L,Cl*2**_));let h=m,b;if(h.body)try{b=JSON.parse(h.body)}catch{throw h.status>=400?new ut(h.status,"INVALID_RESPONSE",h.body.slice(0,400)):new ut(h.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(h.status>=400)throw Rl(h.status,b);return b}async function n(r){let o=encodeURIComponent(r),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:co}}),a=s.data,p=s.pagination,c=1;for(;c<Math.min(p.totalPages,Ol);){c+=1;let m=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:c,limit:co}});for(let h of m.data.columns){let b=a.columns.find(_=>_.id===h.id);b&&b.tasks.push(...h.tasks)}a.archivedTasks.push(...m.data.archivedTasks),a.plannedTasks.push(...m.data.plannedTasks)}return{board:a,pagination:p,truncated:p.totalPages>c}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(r,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:r,includeArchived:o?"true":void 0}}),getBoard:n,getTask:r=>t({method:"GET",path:`/task/${encodeURIComponent(r)}`,query:{view:"detail"}}),getTaskByTicketId:(r,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(r)}`,query:{workspaceId:o}}),listAssignedTasks:r=>t({method:"GET",path:"/task/assigned",query:{workspaceId:r}}),search:(r,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:r,projectId:s.projectId,limit:s.limit??30}}),listLabels:r=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(r)}`}),listColumns:r=>t({method:"GET",path:`/column/${encodeURIComponent(r)}`}),listComments:r=>t({method:"GET",path:`/comment/${encodeURIComponent(r)}`}),createComment:(r,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(r)}`,body:{content:o}}),createTask:(r,o)=>t({method:"POST",path:`/task/${encodeURIComponent(r)}`,body:o}),updateTaskStatus:(r,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(r)}`,body:{status:o}}),updateTaskPriority:(r,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(r)}`,body:{priority:o}})}}function Ll(e,t){this.v=e,this.k=t}function fi(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Nl(e){if(Array.isArray(e))return e}function Pl(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,s,a,p=[],c=!0,m=!1;try{if(s=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=s.call(n)).done)&&(p.push(r.value),p.length!==t);c=!0);}catch(h){m=!0,o=h}finally{try{if(!c&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(m)throw o}}return p}}function Ml(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ul(e,t){return Nl(e)||Pl(e,t)||Dl(e,t)||Ml()}function Dl(e,t){if(e){if(typeof e=="string")return fi(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?fi(e,t):void 0}}function zn(e){var t,n;function r(s,a){try{var p=e[s](a),c=p.value,m=c instanceof Ll;Promise.resolve(m?c.v:c).then(function(h){if(m){var b=s==="return"&&c.k?s:"next";if(!c.k||h.done)return r(b,h);h=e[b](h).value}o(!!p.done,h)},function(h){r("throw",h)})}catch(h){o(2,h)}}function o(s,a){s===2?t.reject(a):t.resolve({value:a,done:s}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(s,a){return new Promise(function(p,c){var m={key:s,arg:a,resolve:p,reject:c,next:null};n?n=n.next=m:(t=n=m,r(s,a))})},typeof e.return!="function"&&(this.return=void 0)}zn.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},zn.prototype.next=function(e){return this._invoke("next",e)},zn.prototype.throw=function(e){return this._invoke("throw",e)},zn.prototype.return=function(e){return this._invoke("return",e)};var Ri=Object.entries,hi=Object.setPrototypeOf,Gl=Object.isFrozen,Oi=Object.getPrototypeOf,Ii=Object.getOwnPropertyDescriptor,ge=Object.freeze,Ee=Object.seal,Ct=Object.create,Ci=typeof Reflect<"u"&&Reflect,Eo=Ci.apply,To=Ci.construct;ge||(ge=function(t){return t});Ee||(Ee=function(t){return t});Eo||(Eo=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});To||(To=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ke=Q(Array.prototype.forEach);Array.prototype.indexOf;var $l=Q(Array.prototype.lastIndexOf),mi=Q(Array.prototype.pop),Wt=Q(Array.prototype.push),Hl=Q(Array.prototype.slice),Fl=Q(Array.prototype.splice),Lt=Array.isArray,po=Li(Set),uo=Q(Set.prototype.add),Vt=Q(Set.prototype.has),ft=Q(String.prototype.toLowerCase),fo=Q(String.prototype.toString),gi=Q(String.prototype.match),Kt=Q(String.prototype.replace),ki=Q(String.prototype.indexOf),zl=Q(String.prototype.trim),Bl=Q(Number.prototype.toString),jl=Q(Boolean.prototype.toString),xi=typeof BigInt>"u"?null:Q(BigInt.prototype.toString),bi=typeof Symbol>"u"?null:Q(Symbol.prototype.toString),ve=Q(Object.prototype.hasOwnProperty),Yt=Q(Object.prototype.toString),be=Q(RegExp.prototype.test),Ye=Li(TypeError);function Q(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Eo(e,t,r)}}function Li(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return To(e,n)}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ft;if(hi&&hi(e,null),!Lt(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Gl(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Xl(e){for(let t=0;t<e.length;t++)ve(e,t)||(e[t]=null);return e}function Ce(e){let t=Ct(null);for(let r of Ri(e)){var n=Ul(r,2);let o=n[0],s=n[1];ve(e,o)&&(Lt(s)?t[o]=Xl(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Ce(s):t[o]=s)}return t}function Wl(e){switch(typeof e){case"string":return e;case"number":return Bl(e);case"boolean":return jl(e);case"bigint":return xi?xi(e):"0";case"symbol":return bi?bi(e):"Symbol()";case"undefined":return Yt(e);case"function":case"object":{if(e===null)return Yt(e);let t=e,n=Pe(t,"toString");if(typeof n=="function"){let r=n(t);return typeof r=="string"?r:Yt(r)}return Yt(e)}default:return Yt(e)}}function Pe(e,t){for(;e!==null;){let r=Ii(e,t);if(r){if(r.get)return Q(r.get);if(typeof r.value=="function")return Q(r.value)}e=Oi(e)}function n(){return null}return n}function Vl(e,t){for(;e!==null;){let n=Ii(e,t);if(n)return n.get?Q(n.get):null;e=Oi(e)}return null}function Kl(e){try{return be(e,""),!0}catch{return!1}}var Ei=ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ho=ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),mo=ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yl=ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),go=ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ql=ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ti=ge(["#text"]),_i=ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),ko=ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Si=ge(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Bn=ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Jl=Ee(/{{[\w\W]*|^[\w\W]*}}/g),Zl=Ee(/<%[\w\W]*|^[\w\W]*%>/g),Ql=Ee(/\${[\w\W]*/g),ec=Ee(/^data-[\-\w.\u00B7-\uFFFF]+$/),tc=Ee(/^aria-[\-\w]+$/),yi=Ee(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),nc=Ee(/^(?:\w+script|data):/i),rc=Ee(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),oc=Ee(/^html$/i),sc=Ee(/^[a-z][.\w]*(-[.\w]+)+$/i),xo=Ee(/<[/\w!]/g),wi=Ee(/<[/\w]/g),ic=Ee(/<\/no(script|embed|frames)/i),Ai=Ee(/\/>/i),ce={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ac=ge(G({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),lc=function(){return typeof window>"u"?null:window},cc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},vi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},nt=function(t,n,r,o){return ve(t,n)&&Lt(t[n])?G(o.base?Ce(o.base):{},t[n],o.transform):r},bo=function(t,n,r){let o=ve(t,n)?t[n]:void 0;return o&&typeof o=="object"?Ce(o):r()};function Ni(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:lc(),t=x=>Ni(x);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ce.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,o=r.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,a=e.Node,p=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let m=e.DOMParser,h=e.trustedTypes,b=p.prototype,_=Pe(b,"cloneNode"),L=Pe(b,"remove"),N=Pe(b,"removeAttributeNode"),K=Pe(b,"nextSibling"),pe=Pe(b,"childNodes"),C=Pe(b,"parentNode"),te=Pe(b,"shadowRoot"),ke=Pe(b,"attributes"),le=a&&a.prototype?Pe(a.prototype,"nodeType"):null,fe=a&&a.prototype?Pe(a.prototype,"nodeName"):null,he=a&&a.prototype?Pe(a.prototype,"ownerDocument"):null,H=function(i){return le?le(i):i.nodeType},v=function(i){return fe?fe(i):i.nodeName},A=Vl(b,"namespaceURI"),Te=function(i){return A?A(i):i.namespaceURI};if(typeof s=="function"){let x=n.createElement("template");x.content&&x.content.ownerDocument&&(n=x.content.ownerDocument)}let ee,O="",ie,Pt=!1,me=0,ne=function(){if(me>0)throw Ye('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Be=function(i){ne(),me++;try{return ee.createHTML(i)}finally{me--}},xe=function(i){ne(),me++;try{return ee.createScriptURL(i)}finally{me--}},re=function(){return Pt||(ie=cc(h,o),Pt=!0),ie},Y=n,st=Y.implementation,Mt=Y.createNodeIterator,sn=Y.createDocumentFragment,an=Y.getElementsByTagName,bt=r.importNode,F=vi();t.isSupported=typeof Ri=="function"&&typeof C=="function"&&st&&st.createHTMLDocument!==void 0;let ln=Jl,cn=Zl,pn=Ql,Re=ec,Ut=tc,Dt=nc,dn=rc,Et=sc,Gt=yi,V=null,l=G({},[...Ei,...ho,...mo,...go,...Ti]),u=null,S=G({},[..._i,...ko,...Si,...Bn]),T=Object.seal(Ct(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,W=null,X=Object.seal(Ct(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),jo=!0,rr=!0,Xo=!1,or=!0,je=!1,it=!0,at=!1,sr=!1,un=null,fn=null,ir=!1,Tt=!1,hn=!1,mn=!1,Wo=!0,Vo=!1,Ko="user-content-",ar=!0,lr=!1,lt=null,_t={},ct=null,Yo=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),qo=null,Jo=G({},["audio","video","img","source","image","track"]),Zo=null,Qo=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gn="http://www.w3.org/1998/Math/MathML",kn="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",St=He,cr=!1,pr=null,$a=G({},[gn,kn,He],fo),es=ge(["mi","mo","mn","ms","mtext"]),dr=G({},es),ts=ge(["annotation-xml"]),ur=G({},ts),Ha=G({},["title","style","font","a","script"]),$t=null,Fa=["application/xhtml+xml","text/html"],za="text/html",ae=null,yt=null,Ba=n.createElement("form"),ns=function(i){return i instanceof RegExp||i instanceof Function},fr=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(yt&&yt===i)return;(!i||typeof i!="object")&&(i={}),i=Ce(i),$t=Fa.indexOf(i.PARSER_MEDIA_TYPE)===-1?za:i.PARSER_MEDIA_TYPE,ae=$t==="application/xhtml+xml"?fo:ft,V=nt(i,"ALLOWED_TAGS",l,{transform:ae}),u=nt(i,"ALLOWED_ATTR",S,{transform:ae}),pr=nt(i,"ALLOWED_NAMESPACES",$a,{transform:fo}),Zo=nt(i,"ADD_URI_SAFE_ATTR",Qo,{transform:ae,base:Qo}),qo=nt(i,"ADD_DATA_URI_TAGS",Jo,{transform:ae,base:Jo}),ct=nt(i,"FORBID_CONTENTS",Yo,{transform:ae}),z=nt(i,"FORBID_TAGS",Ce({}),{transform:ae}),W=nt(i,"FORBID_ATTR",Ce({}),{transform:ae}),_t=ve(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Ce(i.USE_PROFILES):i.USE_PROFILES:!1,jo=i.ALLOW_ARIA_ATTR!==!1,rr=i.ALLOW_DATA_ATTR!==!1,Xo=i.ALLOW_UNKNOWN_PROTOCOLS||!1,or=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,je=i.SAFE_FOR_TEMPLATES||!1,it=i.SAFE_FOR_XML!==!1,at=i.WHOLE_DOCUMENT||!1,Tt=i.RETURN_DOM||!1,hn=i.RETURN_DOM_FRAGMENT||!1,mn=i.RETURN_TRUSTED_TYPE||!1,ir=i.FORCE_BODY||!1,Wo=i.SANITIZE_DOM!==!1,Vo=i.SANITIZE_NAMED_PROPS||!1,ar=i.KEEP_CONTENT!==!1,lr=i.IN_PLACE||!1,Gt=Kl(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:yi,St=typeof i.NAMESPACE=="string"?i.NAMESPACE:He,dr=bo(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>G({},es)),ur=bo(i,"HTML_INTEGRATION_POINTS",()=>G({},ts));let d=bo(i,"CUSTOM_ELEMENT_HANDLING",()=>Ct(null));if(T=Ct(null),ve(d,"tagNameCheck")&&ns(d.tagNameCheck)&&(T.tagNameCheck=d.tagNameCheck),ve(d,"attributeNameCheck")&&ns(d.attributeNameCheck)&&(T.attributeNameCheck=d.attributeNameCheck),ve(d,"allowCustomizedBuiltInElements")&&typeof d.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=d.allowCustomizedBuiltInElements),Ee(T),je&&(rr=!1),hn&&(Tt=!0),_t&&(V=G({},Ti),u=Ct(null),_t.html===!0&&(G(V,Ei),G(u,_i)),_t.svg===!0&&(G(V,ho),G(u,ko),G(u,Bn)),_t.svgFilters===!0&&(G(V,mo),G(u,ko),G(u,Bn)),_t.mathMl===!0&&(G(V,go),G(u,Si),G(u,Bn))),X.tagCheck=null,X.attributeCheck=null,ve(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?X.tagCheck=i.ADD_TAGS:Lt(i.ADD_TAGS)&&(V===l&&(V=Ce(V)),G(V,i.ADD_TAGS,ae))),ve(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?X.attributeCheck=i.ADD_ATTR:Lt(i.ADD_ATTR)&&(u===S&&(u=Ce(u)),G(u,i.ADD_ATTR,ae))),ve(i,"ADD_FORBID_CONTENTS")&&Lt(i.ADD_FORBID_CONTENTS)&&(ct===Yo&&(ct=Ce(ct)),G(ct,i.ADD_FORBID_CONTENTS,ae)),ar&&(V["#text"]=!0),at&&G(V,["html","head","body"]),V.table&&(G(V,["tbody"]),delete z.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ye('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ye('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let g=ee;ee=i.TRUSTED_TYPES_POLICY;try{O=Be("")}catch(k){throw ee=g,k}}else i.TRUSTED_TYPES_POLICY===null?(ee=void 0,O=""):(ee===void 0&&(ee=re()),ee&&typeof O=="string"&&(O=Be("")));ge&&ge(i),yt=i},rs=G({},[...ho,...mo,...Yl]),os=G({},[...go,...ql]),ja=function(i,d,g){return d.namespaceURI===He?i==="svg":d.namespaceURI===gn?i==="svg"&&(g==="annotation-xml"||dr[g]):!!rs[i]},Xa=function(i,d,g){return d.namespaceURI===He?i==="math":d.namespaceURI===kn?i==="math"&&ur[g]:!!os[i]},Wa=function(i,d,g){return d.namespaceURI===kn&&!ur[g]||d.namespaceURI===gn&&!dr[g]?!1:!os[i]&&(Ha[i]||!rs[i])},Va=function(i){let d=Te(i),g=ft(v(i)),k=C(i),y,I;return k&&H(k)===ce.element?(y={namespaceURI:Te(k)},I=ft(v(k))):(y={namespaceURI:St},I="template"),pr[d]?d===kn?ja(g,y,I):d===gn?Xa(g,y,I):d===He?Wa(g,y,I):!!($t==="application/xhtml+xml"&&pr[d]):!1},qe=function(i){Wt(t.removed,{element:i});try{C(i).removeChild(i)}catch{if(L(i),!C(i))throw Ye("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},ss=function(i,d,g){try{N(i,d)}catch{try{i.removeAttribute(g)}catch{}}},hr=function(i){gr(i);let d=pe(i);d&&Ke(Hl(d),k=>{try{L(k)}catch{}});let g=H(i)===ce.element?ke(i):null;if(g)for(let k=g.length-1;k>=0;--k){let y=g[k],I=y&&y.name;typeof I=="string"&&ss(i,y,I)}},wt=function(i,d,g){if(!g)try{g=d.getAttributeNode(i)}catch{g=null}Wt(t.removed,{attribute:g||null,from:d});try{g?N(d,g):d.removeAttribute(i)}catch{try{d.removeAttribute(i)}catch{}}if(i==="is")if(Tt||hn)try{qe(d)}catch{}else try{d.setAttribute(i,"")}catch{}},is=function(i){let d=ke(i);if(d)for(let g=d.length-1;g>=0;--g){let k=d[g],y=k&&k.name;typeof y!="string"||u[ae(y)]||ss(i,k,y)}},mr=function(i,d){let g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,k=[i];for(;k.length>0;){let y=k.pop();if(d(y)===!1)continue;if(g&&H(y)===ce.element){let M=te(y);Je(M)&&k.push(M)}let I=pe(y);if(I)for(let M=I.length-1;M>=0;--M)k.push(I[M])}},gr=function(i){mr(i,d=>{H(d)===ce.element&&is(d)})},kr=function(i){let d=[];return mr(i,g=>{d.push(g)},!0),d},Ka=function(i,d){let g=po();Ke(kr(i),k=>{H(k)===ce.element&&uo(g,k)}),Ke(d,k=>{H(k)===ce.element&&!Vt(g,k)&&is(k)})},as=function(i,d){let g=!1;return Ke(t.removed,k=>{k.element&&(g=g||k.element===i,gr(k.element))}),Ka(i,d),g},Ya=8,qa=function(i,d){let g=lt,k=null,y=()=>(k||(k=po(),Ke(d,I=>{uo(k,I)})),k);for(let I=0;;I++){let M=kr(i),de=[i],Fe=!1;if(Ke(M,Se=>{H(Se)===ce.documentFragment?Wt(de,Se):!Fe&&!Vt(g,Se)&&(Fe=Vt(y(),Se))}),!Fe)return;if(I>=Ya)throw Ye("the tree kept changing during in-place sanitization; refusing to return it");Ke(de,(Se,we)=>{Ja(Se,we>0,i,y())})}},Ja=function(i,d,g,k){let y=xr(i),I;for(;I=y.nextNode();)!Vt(k,I)||Vt(lt,I)||(d&&De(F.uponSanitizeShadowNode,I,null),Er(I,g),Tr(I,g),Je(I.content)&&Ft(I.content))},Za=function(i){lt&&uo(lt,i)},ls=function(i,d){return it?i==="patchsrc"?!0:i==="for"&&d!=="label"&&d!=="output":!1},Qa=function(i){it&&mr(i,d=>{let g=H(d);if(g===ce.processingInstruction||g===ce.comment&&be(wi,d.data)){try{L(d)}catch{}return!1}if(g===ce.element){let k=d,y=ae(v(d));try{k.hasAttribute&&k.hasAttribute("patchsrc")&&k.removeAttribute("patchsrc"),k.hasAttribute&&k.hasAttribute("for")&&ls("for",y)&&k.removeAttribute("for")}catch{}}return!0})},cs=function(i){let d=null,g=null;if(ir)i="<remove></remove>"+i;else{let I=gi(i,/^[\r\n\t ]+/);g=I&&I[0]}$t==="application/xhtml+xml"&&St===He&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");let k=ee?Be(i):i;if(St===He)try{d=new m().parseFromString(k,$t)}catch{}if(!d||!d.documentElement){d=st.createDocument(St,"template",null);try{d.documentElement.innerHTML=cr?O:k}catch{}}let y=d.body||d.documentElement;return i&&g&&y.insertBefore(n.createTextNode(g),y.childNodes[0]||null),St===He?an.call(d,at?"html":"body")[0]:at?d.documentElement:y},xr=function(i){let d=he?he(i):i.ownerDocument;return Mt.call(d||i,i,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},xn=function(i){return i=Kt(i,ln," "),i=Kt(i,cn," "),i=Kt(i,pn," "),i},br=function(i){var d;ps(i);let g=(d=i.querySelectorAll)===null||d===void 0?void 0:d.call(i,"template");g&&Ke(g,k=>{Je(k.content)&&br(k.content)})},ps=function(i){i.normalize();let d=he?he(i):i.ownerDocument,g=Mt.call(d||i,i,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),k=g.nextNode();for(;k;)k.data=xn(k.data),k=g.nextNode()},bn=function(i){let d=fe?fe(i):null;return typeof d!="string"||ae(d)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==ke(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==le(i)||i.childNodes!==pe(i)},Je=function(i){if(!le||typeof i!="object"||i===null)return!1;try{return le(i)===ce.documentFragment}catch{return!1}},Ht=function(i){if(!le||typeof i!="object"||i===null)return!1;try{return typeof le(i)=="number"}catch{return!1}};function De(x,i,d){x.length!==0&&Ke(x,g=>{g.call(t,i,d,yt)})}let el=function(i,d){return!!(it&&i.hasChildNodes()&&!Ht(i.firstElementChild)&&be(xo,i.textContent)&&be(xo,i.innerHTML)||it&&ac[d]&&H(i)===ce.element&&Te(i)===He&&(Ht(i.firstElementChild)||typeof i.textContent=="string"&&be(xo,i.textContent))||i.nodeType===ce.processingInstruction||it&&i.nodeType===ce.comment&&be(wi,i.data))},En=function(i,d){if(i instanceof RegExp)return be(i,d);if(i instanceof Function){for(var g=arguments.length,k=new Array(g>2?g-2:0),y=2;y<g;y++)k[y-2]=arguments[y];return!!i(d,...k)}return!1},tl=function(i,d,g){if(!z[d]&&fs(d)&&En(T.tagNameCheck,d))return!1;if(ar&&!ct[d]&&!ct[ft(d)]){let k=C(i),y=pe(i);if(y&&k){let I=y.length;for(let M=I-1;M>=0;--M){let de=i===g?_(y[M],!0):y[M];k.insertBefore(de,K(i))}}}return qe(i),!0},ds=function(i,d,g,k){return i.length===0?d:d===g||d===k?Ce(d):d},At=function(i,d){return i===d||C(i)!==null?!1:(lr&&gr(i),!0)},Er=function(i,d){if(Za(i),De(F.beforeSanitizeElements,i,null),At(i,d))return!0;if(bn(i))return qe(i),!0;let g=ae(v(i));if(V=ds(F.uponSanitizeElement,V,l,un),De(F.uponSanitizeElement,i,{tagName:g,allowedTags:V}),At(i,d))return!0;if(el(i,g))return qe(i),!0;if(z[g]||!(X.tagCheck instanceof Function&&X.tagCheck(g))&&!V[g]){let k=tl(i,g,d);return k===!1&&(De(F.afterSanitizeElements,i,null),At(i,d))?!0:k}if(H(i)===ce.element&&!Va(i)||(g==="noscript"||g==="noembed"||g==="noframes")&&be(ic,i.innerHTML))return qe(i),!0;if(je&&i.nodeType===ce.text){let k=xn(i.textContent);i.textContent!==k&&(Wt(t.removed,{element:i.cloneNode()}),i.textContent=k)}return De(F.afterSanitizeElements,i,null),At(i,d)},us=function(i,d,g){if(W[d]||ls(d,i)||Wo&&(d==="id"||d==="name")&&(g in n||g in Ba))return!1;let k=u[d]||X.attributeCheck instanceof Function&&X.attributeCheck(d,i);return rr&&be(Re,d)||jo&&be(Ut,d)?!0:k?Zo[d]||be(Gt,Kt(g,dn,""))||(d==="src"||d==="xlink:href"||d==="href")&&i!=="script"&&ki(g,"data:")===0&&qo[i]||Xo&&!be(Dt,Kt(g,dn,""))?!0:!g:fs(i)&&En(T.tagNameCheck,i)&&En(T.attributeNameCheck,d,i)||d==="is"&&T.allowCustomizedBuiltInElements&&En(T.tagNameCheck,g)},nl=G({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),fs=function(i){return!nl[ft(i)]&&be(Et,i)},rl=function(i,d,g,k){if(ee&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!g)switch(h.getAttributeType(i,d)){case"TrustedHTML":return Be(k);case"TrustedScriptURL":return xe(k)}return k},ol=function(i,d,g,k){try{return g?i.setAttributeNS(g,d,k):i.setAttribute(d,k),bn(i)?(qe(i),!1):!0}catch{return wt(d,i),!1}},hs=function(i,d){return it&&be(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,d)?!0:ft(i)==="attributename"&&gi(d,"href")!==null},Tr=function(i,d){if(De(F.beforeSanitizeAttributes,i,null),At(i,d))return;let g=i.attributes;if(!g||bn(i))return;u=ds(F.uponSanitizeAttribute,u,S,fn);let k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},y=g.length,I=ae(i.nodeName);for(;y--;){let M=g[y],de=M.name,Fe=M.namespaceURI,Se=M.value,we=ae(de),vt=Se,Ae=de==="value"?vt:zl(vt),ms=!1;if(k.attrName=we,k.attrValue=Ae,k.keepAttr=!0,k.forceKeepAttr=void 0,De(F.uponSanitizeAttribute,i,k),Ae=k.attrValue,Vo&&(we==="id"||we==="name")&&ki(Ae,Ko)!==0&&(wt(de,i,M),Ae=Ko+Ae,ms=!0),hs(de,Ae)){wt(de,i,M);continue}if(!k.forceKeepAttr){if(!k.keepAttr){wt(de,i,M);continue}if(!or&&be(Ai,Ae)){wt(de,i,M);continue}if(je&&(Ae=xn(Ae)),!us(I,we,Ae)){wt(de,i,M);continue}Ae=rl(I,we,Fe,Ae),Ae!==vt&&ol(i,de,Fe,Ae)&&ms&&mi(t.removed)}}De(F.afterSanitizeAttributes,i,null),At(i,d)},Ft=function(i){let d=null,g=xr(i);for(De(F.beforeSanitizeShadowDOM,i,null);d=g.nextNode();)if(De(F.uponSanitizeShadowNode,d,null),Er(d,i),Tr(d,i),Je(d.content)&&Ft(d.content),H(d)===ce.element){let k=te(d);Je(k)&&(_r(k),Ft(k))}je&&ps(i),De(F.afterSanitizeShadowDOM,i,null)},_r=function(i){let d=[{node:i,shadow:null}];for(;d.length>0;){let g=d.pop();if(g.shadow){Ft(g.shadow);continue}let k=g.node,y=H(k)===ce.element,I=pe(k);if(I)for(let M=I.length-1;M>=0;--M)d.push({node:I[M],shadow:null});if(y){let M=fe?fe(k):null;if(typeof M=="string"&&ae(M)==="template"){let de=k.content;Je(de)&&d.push({node:de,shadow:null})}}if(y){let M=te(k);Je(M)&&d.push({node:null,shadow:M},{node:M,shadow:null})}}};return t.sanitize=function(x){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,g=null,k=null,y=null;if(cr=!x,cr&&(x="<!-->"),typeof x!="string"&&!Ht(x)&&(x=Wl(x),typeof x!="string"))throw Ye("dirty is not a string, aborting");if(!t.isSupported)return x;sr?(V=un,u=fn):fr(i),(F.uponSanitizeElement.length>0||F.uponSanitizeAttribute.length>0)&&(V=Ce(V)),F.uponSanitizeAttribute.length>0&&(u=Ce(u)),t.removed=[];let I=lr&&typeof x!="string"&&Ht(x),M=[],de=lt;if(I){Qa(x);let we=v(x);if(typeof we=="string"){let vt=ae(we);if(!V[vt]||z[vt])throw hr(x),Ye("root node is forbidden and cannot be sanitized in-place")}if(bn(x))throw hr(x),Ye("root node is clobbered and cannot be sanitized in-place");M=kr(x),lt=po()}else if(Ht(x))d=cs("<!---->"),g=d.ownerDocument.importNode(x,!0),g.nodeType===ce.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?d=g:d.appendChild(g),_r(d);else{if(!Tt&&!je&&!at&&x.indexOf("<")===-1)return ee&&mn?Be(x):x;if(d=cs(x),!d)return Tt?null:mn?O:""}d&&ir&&qe(d.firstChild);let Fe=I?x:d;try{I&&_r(x);let we=xr(Fe);for(;k=we.nextNode();)Er(k,Fe),Tr(k,Fe),Je(k.content)&&Ft(k.content);I&&qa(x,M)}catch(we){throw I&&(hr(x),as(x,M)),we}finally{lt=de}if(I){if(as(x,M))throw Ye("a node selected for removal could not be safely returned; refusing to sanitize in place");return je&&br(x),x}if(Tt){if(je&&br(d),hn)for(y=sn.call(d.ownerDocument);d.firstChild;)y.appendChild(d.firstChild);else y=d;return(u.shadowroot||u.shadowrootmode)&&(y=bt.call(r,y,!0)),y}let Se=at?d.outerHTML:d.innerHTML;return at&&V["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&be(oc,d.ownerDocument.doctype.name)&&(Se="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+Se),je&&(Se=xn(Se)),ee&&mn?Be(Se):Se},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};fr(x),sr=!0,un=V,fn=u},t.clearConfig=function(){yt=null,sr=!1,un=null,fn=null,ee=ie,O=""},t.isValidAttribute=function(x,i,d){yt||fr({});let g=ae(x),k=ae(i);return typeof d=="string"&&(hs(i,d)||!or&&be(Ai,d))?!1:us(g,k,d)},t.addHook=function(x,i){typeof i=="function"&&ve(F,x)&&Wt(F[x],i)},t.removeHook=function(x,i){if(ve(F,x)){if(i!==void 0){let d=$l(F[x],i);return d===-1?void 0:Fl(F[x],d,1)[0]}return mi(F[x])}},t.removeHooks=function(x){ve(F,x)&&(F[x]=[])},t.removeAllHooks=function(){F=vi()},t}var Pi=Ni();function wo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var mt=wo();function Fi(e){mt=e}var Qt={exec:()=>null};function $(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let a=typeof s=="string"?s:s.source;return a=a.replace(ye.caret,"$1"),n=n.replace(o,a),r},getRegex:()=>new RegExp(n,t)};return r}var pc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},dc=/^(?:[ \t]*(?:\n|$))+/,uc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,en=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,hc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ao=/(?:[*+-]|\d{1,9}[.)])/,zi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Bi=$(zi).replace(/bull/g,Ao).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),mc=$(zi).replace(/bull/g,Ao).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),vo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,gc=/^[^\n]+/,Ro=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kc=$(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ro).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xc=$(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ao).getRegex(),Kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Oo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bc=$("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Oo).replace("tag",Kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ji=$(vo).replace("hr",en).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Ec=$(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ji).getRegex(),Io={blockquote:Ec,code:uc,def:kc,fences:fc,heading:hc,hr:en,html:bc,lheading:Bi,list:xc,newline:dc,paragraph:ji,table:Qt,text:gc},Mi=$("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",en).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),Tc={...Io,lheading:mc,table:Mi,paragraph:$(vo).replace("hr",en).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Mi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex()},_c={...Io,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Oo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(vo).replace("hr",en).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Bi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Sc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,yc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xi=/^( {2,}|\\)\n(?!\s*$)/,wc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Yn=/[\p{P}\p{S}]/u,Co=/[\s\p{P}\p{S}]/u,Wi=/[^\s\p{P}\p{S}]/u,Ac=$(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Co).getRegex(),Vi=/(?!~)[\p{P}\p{S}]/u,vc=/(?!~)[\s\p{P}\p{S}]/u,Rc=/(?:[^\s\p{P}\p{S}]|~)/u,Oc=$(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",pc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ki=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ic=$(Ki,"u").replace(/punct/g,Yn).getRegex(),Cc=$(Ki,"u").replace(/punct/g,Vi).getRegex(),Yi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Lc=$(Yi,"gu").replace(/notPunctSpace/g,Wi).replace(/punctSpace/g,Co).replace(/punct/g,Yn).getRegex(),Nc=$(Yi,"gu").replace(/notPunctSpace/g,Rc).replace(/punctSpace/g,vc).replace(/punct/g,Vi).getRegex(),Pc=$("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Wi).replace(/punctSpace/g,Co).replace(/punct/g,Yn).getRegex(),Mc=$(/\\(punct)/,"gu").replace(/punct/g,Yn).getRegex(),Uc=$(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Dc=$(Oo).replace("(?:-->|$)","-->").getRegex(),Gc=$("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Dc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Xn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,$c=$(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qi=$(/^!?\[(label)\]\[(ref)\]/).replace("label",Xn).replace("ref",Ro).getRegex(),Ji=$(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ro).getRegex(),Hc=$("reflink|nolink(?!\\()","g").replace("reflink",qi).replace("nolink",Ji).getRegex(),Ui=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Lo={_backpedal:Qt,anyPunctuation:Mc,autolink:Uc,blockSkip:Oc,br:Xi,code:yc,del:Qt,emStrongLDelim:Ic,emStrongRDelimAst:Lc,emStrongRDelimUnd:Pc,escape:Sc,link:$c,nolink:Ji,punctuation:Ac,reflink:qi,reflinkSearch:Hc,tag:Gc,text:wc,url:Qt},Fc={...Lo,link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",Xn).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Xn).getRegex()},_o={...Lo,emStrongRDelimAst:Nc,emStrongLDelim:Cc,url:$(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ui).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:$(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ui).getRegex()},zc={..._o,br:$(Xi).replace("{2,}","*").getRegex(),text:$(_o.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},jn={normal:Io,gfm:Tc,pedantic:_c},qt={normal:Lo,gfm:_o,breaks:zc,pedantic:Fc},Bc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Di=e=>Bc[e];function ze(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Di)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Di);return e}function Gi(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function $i(e,t){let n=e.replace(ye.findPipe,(s,a,p)=>{let c=!1,m=a;for(;--m>=0&&p[m]==="\\";)c=!c;return c?"|":" |"}),r=n.split(ye.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ye.slashPipe,"|");return r}function Jt(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function jc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Hi(e,t,n,r,o){let s=t.href,a=t.title||null,p=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:a,text:p,tokens:r.inlineTokens(p)};return r.state.inLink=!1,c}function Xc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let a=s.match(n.other.beginningSpace);if(a===null)return s;let[p]=a;return p.length>=o.length?s.slice(o.length):s}).join(`
`)}var Wn=class{options;rules;lexer;constructor(e){this.options=e||mt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Jt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Xc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Jt(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Jt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Jt(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let a=!1,p=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))p.push(n[c]),a=!0;else if(!a)p.push(n[c]);else break;n=n.slice(c);let m=p.join(`
`),h=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${m}`:m,o=o?`${o}
${h}`:h;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,s,!0),this.lexer.state.top=b,n.length===0)break;let _=s.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let L=_,N=L.raw+`
`+n.join(`
`),K=this.blockquote(N);s[s.length-1]=K,r=r.substring(0,r.length-L.raw.length)+K.raw,o=o.substring(0,o.length-L.text.length)+K.text;break}else if(_?.type==="list"){let L=_,N=L.raw+`
`+n.join(`
`),K=this.list(N);s[s.length-1]=K,r=r.substring(0,r.length-_.raw.length)+K.raw,o=o.substring(0,o.length-L.raw.length)+K.raw,n=N.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,m="",h="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;m=t[0],e=e.substring(m.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),_=e.split(`
`,1)[0],L=!b.trim(),N=0;if(this.options.pedantic?(N=2,h=b.trimStart()):L?N=t[1].length+1:(N=t[2].search(this.rules.other.nonSpaceChar),N=N>4?1:N,h=b.slice(N),N+=t[1].length),L&&this.rules.other.blankLine.test(_)&&(m+=_+`
`,e=e.substring(_.length+1),c=!0),!c){let C=this.rules.other.nextBulletRegex(N),te=this.rules.other.hrRegex(N),ke=this.rules.other.fencesBeginRegex(N),le=this.rules.other.headingBeginRegex(N),fe=this.rules.other.htmlBeginRegex(N);for(;e;){let he=e.split(`
`,1)[0],H;if(_=he,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),H=_):H=_.replace(this.rules.other.tabCharGlobal,"    "),ke.test(_)||le.test(_)||fe.test(_)||C.test(_)||te.test(_))break;if(H.search(this.rules.other.nonSpaceChar)>=N||!_.trim())h+=`
`+H.slice(N);else{if(L||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ke.test(b)||le.test(b)||te.test(b))break;h+=`
`+_}!L&&!_.trim()&&(L=!0),m+=he+`
`,e=e.substring(he.length+1),b=H.slice(N)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(a=!0));let K=null,pe;this.options.gfm&&(K=this.rules.other.listIsTask.exec(h),K&&(pe=K[0]!=="[ ] ",h=h.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:m,task:!!K,checked:pe,loose:!1,text:h,tokens:[]}),o.raw+=m}let p=o.items.at(-1);if(p)p.raw=p.raw.trimEnd(),p.text=p.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let c=0;c<o.items.length;c++)if(this.lexer.state.top=!1,o.items[c].tokens=this.lexer.blockTokens(o.items[c].text,[]),!o.loose){let m=o.items[c].tokens.filter(b=>b.type==="space"),h=m.length>0&&m.some(b=>this.rules.other.anyLine.test(b.raw));o.loose=h}if(o.loose)for(let c=0;c<o.items.length;c++)o.items[c].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=$i(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<n.length;a++)s.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:s.align[a]});for(let a of o)s.rows.push($i(a,s.header.length).map((p,c)=>({text:p,tokens:this.lexer.inline(p),header:!1,align:s.align[c]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Jt(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=jc(t[2],"()");if(s===-2)return;if(s>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Hi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Hi(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,a,p=o,c=0,m=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+o);(r=m.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(a=[...s].length,r[3]||r[4]){p+=a;continue}else if((r[5]||r[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(p-=a,p>0)continue;a=Math.min(a,a+p+c);let h=[...r[0]][0].length,b=e.slice(0,o+r.index+h+a);if(Math.min(o,a)%2){let L=b.slice(1,-1);return{type:"em",raw:b,text:L,tokens:this.lexer.inlineTokens(L)}}let _=b.slice(2,-2);return{type:"strong",raw:b,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ge=class So{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||mt,this.options.tokenizer=this.options.tokenizer||new Wn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ye,block:jn.normal,inline:qt.normal};this.options.pedantic?(n.block=jn.pedantic,n.inline=qt.pedantic):this.options.gfm&&(n.block=jn.gfm,this.options.breaks?n.inline=qt.breaks:n.inline=qt.gfm),this.tokenizer.rules=n}static get rules(){return{block:jn,inline:qt}}static lex(t,n){return new So(n).lex(t)}static lexInline(t,n){return new So(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(a=>(o=a.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let a=n.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let a=1/0,p=t.slice(1),c;this.options.extensions.startBlock.forEach(m=>{c=m.call({lexer:this},p),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(s=t.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(o);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,p="";for(;t;){a||(p=""),a=!1;let c;if(this.options.extensions?.inline?.some(h=>(c=h.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let h=n.at(-1);c.type==="text"&&h?.type==="text"?(h.raw+=c.raw,h.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,p)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let m=t;if(this.options.extensions?.startInline){let h=1/0,b=t.slice(1),_;this.options.extensions.startInline.forEach(L=>{_=L.call({lexer:this},b),typeof _=="number"&&_>=0&&(h=Math.min(h,_))}),h<1/0&&h>=0&&(m=t.substring(0,h+1))}if(c=this.tokenizer.inlineText(m)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(p=c.raw.slice(-1)),a=!0;let h=n.at(-1);h?.type==="text"?(h.raw+=c.raw,h.text+=c.text):n.push(c);continue}if(t){let h="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return n}},Vn=class{options;parser;constructor(e){this.options=e||mt}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ye.notSpaceStart)?.[0],o=e.replace(ye.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ze(r)+'">'+(n?o:ze(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ze(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let p=e.items[a];r+=this.listitem(p)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+ze(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let a=0;a<s.length;a++)n+=this.tablecell(s[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ze(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Gi(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+ze(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Gi(e);if(o===null)return ze(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${ze(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ze(e.text)}},No=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},$e=class yo{options;renderer;textRenderer;constructor(t){this.options=t||mt,this.options.renderer=this.options.renderer||new Vn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new No}static parse(t,n){return new yo(n).parse(t)}static parseInline(t,n){return new yo(n).parseInline(t)}parse(t,n=!0){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let p=s,c=this.options.extensions.renderers[p.type].call({parser:this},p);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(p.type)){r+=c||"";continue}}let a=s;switch(a.type){case"space":{r+=this.renderer.space(a);continue}case"hr":{r+=this.renderer.hr(a);continue}case"heading":{r+=this.renderer.heading(a);continue}case"code":{r+=this.renderer.code(a);continue}case"table":{r+=this.renderer.table(a);continue}case"blockquote":{r+=this.renderer.blockquote(a);continue}case"list":{r+=this.renderer.list(a);continue}case"html":{r+=this.renderer.html(a);continue}case"def":{r+=this.renderer.def(a);continue}case"paragraph":{r+=this.renderer.paragraph(a);continue}case"text":{let p=a,c=this.renderer.text(p);for(;o+1<t.length&&t[o+1].type==="text";)p=t[++o],c+=`
`+this.renderer.text(p);n?r+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):r+=c;continue}default:{let p='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(p),"";throw new Error(p)}}}return r}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let p=this.options.extensions.renderers[s.type].call({parser:this},s);if(p!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=p||"";continue}}let a=s;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let p='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(p),"";throw new Error(p)}}}return r}},Zt=class{options;block;constructor(e){this.options=e||mt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ge.lex:Ge.lexInline}provideParser(){return this.block?$e.parse:$e.parseInline}},Wc=class{defaults=wo();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=$e;Renderer=Vn;TextRenderer=No;Lexer=Ge;Tokenizer=Wn;Hooks=Zt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let a of s)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let a=o[s].flat(1/0);n=n.concat(this.walkTokens(a,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...a){let p=o.renderer.apply(this,a);return p===!1&&(p=s.apply(this,a)),p}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Vn(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,p=n.renderer[a],c=o[a];o[a]=(...m)=>{let h=p.apply(o,m);return h===!1&&(h=c.apply(o,m)),h||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Wn(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,p=n.tokenizer[a],c=o[a];o[a]=(...m)=>{let h=p.apply(o,m);return h===!1&&(h=c.apply(o,m)),h}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Zt;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,p=n.hooks[a],c=o[a];Zt.passThroughHooks.has(s)?o[a]=m=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(s))return(async()=>{let b=await p.call(o,m);return c.call(o,b)})();let h=p.call(o,m);return c.call(o,h)}:o[a]=(...m)=>{if(this.defaults.async)return(async()=>{let b=await p.apply(o,m);return b===!1&&(b=await c.apply(o,m)),b})();let h=p.apply(o,m);return h===!1&&(h=c.apply(o,m)),h}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(a){let p=[];return p.push(s.call(this,a)),o&&(p=p.concat(o.call(this,a))),p}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ge.lex(e,t??this.defaults)}parser(e,t){return $e.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let a=o.hooks?await o.hooks.preprocess(t):t,p=await(o.hooks?await o.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(a,o),c=o.hooks?await o.hooks.processAllTokens(p):p;o.walkTokens&&await Promise.all(this.walkTokens(c,o.walkTokens));let m=await(o.hooks?await o.hooks.provideParser():e?$e.parse:$e.parseInline)(c,o);return o.hooks?await o.hooks.postprocess(m):m})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let a=(o.hooks?o.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(t,o);o.hooks&&(a=o.hooks.processAllTokens(a)),o.walkTokens&&this.walkTokens(a,o.walkTokens);let p=(o.hooks?o.hooks.provideParser():e?$e.parse:$e.parseInline)(a,o);return o.hooks&&(p=o.hooks.postprocess(p)),p}catch(a){return s(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ze(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},ht=new Wc;function B(e,t){return ht.parse(e,t)}B.options=B.setOptions=function(e){return ht.setOptions(e),B.defaults=ht.defaults,Fi(B.defaults),B};B.getDefaults=wo;B.defaults=mt;B.use=function(...e){return ht.use(...e),B.defaults=ht.defaults,Fi(B.defaults),B};B.walkTokens=function(e,t){return ht.walkTokens(e,t)};B.parseInline=ht.parseInline;B.Parser=$e;B.parser=$e.parse;B.Renderer=Vn;B.TextRenderer=No;B.Lexer=Ge;B.lexer=Ge.lex;B.Tokenizer=Wn;B.Hooks=Zt;B.parse=B;var ym=B.options,wm=B.setOptions,Am=B.use,vm=B.walkTokens,Rm=B.parseInline;var Om=$e.parse,Im=Ge.lex;var j=Qr();function E(e,t={},...n){let r=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(r.dataset,s);continue}if(o==="style"){r.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){r.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){r.className=s;continue}r[o]=s}for(let o of n)o!=null&&r.append(typeof o=="string"?document.createTextNode(o):o);return r}function tn(e){e.replaceChildren()}function Po(e){let t=E("div",{className:"md"});if(!e||e.trim().length===0)return t.append(E("p",{className:"muted"},"No description.")),t;let n=B.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=Pi.sanitize(n,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(r=>{let o=r.getAttribute("href")??"";r.setAttribute("rel","noreferrer noopener"),r.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&j.openUrl(o)})}),t.querySelectorAll("img").forEach(r=>{r.setAttribute("loading","lazy")}),t}function Zi(e,t=320){let n=e??"",r=Po(e);if(n.length<=t)return r;r.classList.add("md-collapsed");let o=E("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=r.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),E("div",{className:"md-wrap"},r,o)}function Qi(e){if(!e||typeof e!="object")return{};let t={};for(let[n,r]of Object.entries(e))!r||typeof r!="object"||typeof r.taskId!="string"||(t[n]={taskId:r.taskId,ticketId:typeof r.ticketId=="string"?r.ticketId:"",title:typeof r.title=="string"?r.title:"",at:typeof r.at=="number"?r.at:0,posted:Array.isArray(r.posted)?r.posted.filter(o=>typeof o=="string"):[]});return t}function ea(e,t=50){let n=Object.entries(e).sort((r,o)=>o[1].at-r[1].at).slice(0,Math.max(0,t));return Object.fromEntries(n)}var ta="preferences",na={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1};function ra(e){if(typeof e!="object"||e===null)return{...na};let t=e,n=t.priorityFilter,r=n==="any"||!!n&&n in di;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:r?n:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0}}async function nn(){try{return ra(await j.storage.get(ta))}catch{return{...na}}}async function oa(e){let t=ra({...await nn(),...e});try{await j.storage.set(ta,t)}catch{}return t}var sa="session-links";async function Vc(){try{return Qi(await j.storage.get(sa))}catch{return{}}}async function ia(e,t){try{let n=await Vc();n[e]={...t,at:Date.now(),posted:[]};let r=ea(n);await j.storage.set(sa,JSON.parse(JSON.stringify(r)))}catch{}}var Kc=864e5;function Mo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function ca(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function pa(e,t,n){return`${li}/dashboard/workspace/${e}/project/${t}/task/${n}`}var Yc={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function gt(e){return Yc[e]??e}function Zn(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=Math.round((Jn(n).getTime()-Jn(t).getTime())/Kc);return r===0?"Due today":r===1?"Due tomorrow":r===-1?"Due yesterday":r<0?`Overdue ${Math.abs(r)}d`:r<=7?`Due in ${r}d`:`Due ${n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function da(e,t=new Date){if(!e)return!1;let n=new Date(e);return Number.isNaN(n.getTime())?!1:Jn(n).getTime()<Jn(t).getTime()}function Jn(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function ua(e,t=160){if(!e)return"";let n=e.split(`
`).map(o=>o.trim()).find(o=>o.length>0);if(!n)return"";let r=n.replace(/^#{1,6}\s+/,"").replace(/^[*_>]+/,"").trim();return r.length>t?`${r.slice(0,t-1)}\u2026`:r}var qc=6e3;function Jc(e){let t=e.user?.name??"Unknown",n=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${n}`}function fa(e,t){let n=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&n.push(`Project: ${t.projectName}`),t.columnName&&n.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&n.push(`Priority: ${gt(e.priority)}`),e.dueDate&&n.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&n.push(t.url);let r=e.description?.trim();r&&n.push("",r);let o=t.comments??[];if(o.length>0){n.push("","Comments:");let s=0;for(let a of o){let p=Jc(a);if(s+p.length>qc)break;s+=p.length,n.push(p)}}return n.join(`
`)}function ha(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var aa=6e4,la=36e5,qn=864e5;function Qn(e,t=Date.now()){if(!e)return null;let n=Date.parse(e);if(!Number.isFinite(n))return null;let r=Math.max(0,t-n);return r<aa?"just now":r<la?`${Math.floor(r/aa)}m`:r<qn?`${Math.floor(r/la)}h`:r<7*qn?`${Math.floor(r/qn)}d`:`${Math.floor(r/(7*qn))}w`}function ma(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function Uo(e){return pa(e.workspaceId,e.task.projectId,e.task.id)}function Zc(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function ga(e){return{providerId:ci,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:Uo(e),text:fa(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:Uo(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:Zc(e)}}async function ka(e){await j.attach(ga(e))}async function Qc(e,t={}){let n=t.worktree?ha(e.ticketId):void 0,r=await j.startSession({...ga(e),navigation:"preserve",...n?{worktree:{kind:"new",name:n}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return r.sessionId===null?{sessionId:null,sent:r.sent,failure:r.failure,branch:r.worktree.branch}:{sessionId:r.sessionId,sent:r.sent,branch:r.worktree?.branch??n}}async function Do(e,t={}){let n=await Qc(e,t);if(n.sessionId===null){let r=n.branch?` The worktree ${n.branch} was kept.`:"",o=n.failure?` (${n.failure})`:"";return await j.toast({kind:"error",message:`No session was created${o}.${r} Check the session list before retrying.`,dismiss:!0}),!1}return await ia(n.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await j.toast({kind:"success",message:t.worktree&&n.branch?`Session started on ${n.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function Go(e){await j.openUrl(Uo(e))}function xa(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function ba(e){return E("span",{className:"label-chip"},E("span",{className:"label-dot",style:`background:${e.color}`}),e.name)}function Ea(e,t=2){if(e.length===0)return null;let n=e.slice(0,t),r=E("span",{className:"label-chips"});for(let o of n)r.append(ba(o));return e.length>n.length&&r.append(E("span",{className:"label-more"},`+${e.length-n.length}`)),r}function Ta(e){if(e.length===0)return null;let t=E("div",{className:"label-chips"});for(let n of e)t.append(ba(n));return t}function _a(e){return E("span",{className:"person"},E("span",{className:"person-avatar"},xa(e)),E("span",{className:"person-name"},e))}function Sa(e){return E("span",{className:"person-avatar"},xa(e))}function ya(e){let{task:t}=e,n=E("dl",{className:"meta-grid"}),r=[];e.projectName&&r.push(["Project",e.projectName]),t.priority!=="no-priority"&&r.push(["Priority",gt(t.priority)]),r.push(["Assignee",t.assigneeName??"Unassigned"]);let o=Zn(t.dueDate);o&&r.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&r.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&r.push(["Description","Too large to inline; open the task for the full text."]);for(let[p,c]of r)n.append(E("dt",{},p),E("dd",{},c));let a=Ta(t.labels??[]);if(a){let p=E("dd",{className:"meta-labels"});p.append(a),n.append(E("dt",{},"Labels"),p)}return n}function wa(e,t=320){return E("div",{className:"detail-section"},Zi(e.task.description,t))}function Aa(e){let t=E("div",{className:"detail-section"});if(t.append(E("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(E("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(E("p",{className:"muted"},"Loading comments\u2026")),t;let n=e.items??[];if(n.length===0)return t.append(E("p",{className:"muted"},"No comments yet.")),t;let r=E("div",{className:"comments"});return n.forEach((o,s)=>{let a=s===n.length-1,p=Qn(o.createdAt),c=E("div",{className:"comment"});a||c.append(E("div",{className:"comment-line"})),c.append(Sa(o.user?.name));let m=E("div",{className:"comment-card"});m.append(E("div",{className:"comment-head"},E("span",{className:"comment-author"},o.user?.name??"Unknown"),p?E("span",{},p):null),E("div",{className:"comment-body"},Po(o.content))),c.append(m),r.append(c)}),t.append(r),t}var ep=`
* { box-sizing: border-box; }

html, body {
  margin: 0;
  height: 100%;
  font-family: var(--oc-font, system-ui, -apple-system, sans-serif);
  font-size: 13px;
  color: var(--oc-primary-text);
  background: var(--oc-bg, transparent);
}

#root {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
}

.scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 2px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.toolbar > * { min-width: 0; }

.row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spacer { flex: 1; }

.muted {
  color: var(--oc-muted);
  font-size: 12px;
}

.eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--oc-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.panel-title {
  font-size: 14px;
  font-weight: 600;
}

/* Column groups on the rail panel. */
.group { display: flex; flex-direction: column; gap: 4px; }

.group-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 2px 0;
}

.count-pill {
  font-size: 11px;
  color: var(--oc-muted);
  background: var(--oc-muted-surface);
  border-radius: 999px;
  padding: 1px 7px;
}

/* Task rows. */
.task-key {
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  color: var(--oc-muted);
}

.task-subtitle { color: var(--oc-muted); font-size: 12px; }

.priority-bar {
  width: 3px;
  align-self: stretch;
  border-radius: 999px;
  background: var(--oc-muted-surface);
  min-height: 18px;
}

.priority-low { background: var(--oc-info); }
.priority-medium { background: var(--oc-info); }
.priority-high { background: var(--oc-warning); }
.priority-urgent { background: var(--oc-error); }

/* The panel header: search, filters, then the scope pickers. */
.panel-head { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }

.filters { gap: 4px; }
.filter-active .oc-sdk-btn { color: var(--oc-primary-text); }
.filter-refresh { margin-left: auto; }
.scope { gap: 8px; }

/* The task detail, laid out like the host's Linear issue view. */
.detail {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--oc-border);
  padding: 8px 12px;
}

.detail-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 16px;
}

.detail-heading { display: flex; flex-direction: column; }
.detail-id { font-size: 12px; color: var(--oc-muted); }
.detail-title { margin: 2px 0 0; font-size: 15px; font-weight: 650; line-height: 1.35; }

.detail-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.detail-status { min-width: 150px; }

.detail-section { display: flex; flex-direction: column; gap: 8px; }
.detail-section-title { margin: 0; font-size: 13px; font-weight: 600; }

.detail-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--oc-border);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.block .oc-sdk-btn { width: 100%; }
.detail-secondary .oc-sdk-btn { width: auto; }
.detail-secondary { justify-content: flex-start; }

.meta-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 10px;
  align-items: baseline;
  font-size: 12px;
}

.meta-grid dt { color: var(--oc-muted); }

.meta-grid dd { margin: 0; }

.link-button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--oc-primary);
  cursor: pointer;
  text-align: left;
}

.link-button:hover { text-decoration: underline; }

.overdue { color: var(--oc-error-text); }

/* Markdown bodies. */
.md {
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.md > :first-child { margin-top: 0; }
.md > :last-child { margin-bottom: 0; }
.md p { margin: 0 0 8px; }
.md ul, .md ol { margin: 0 0 8px; padding-left: 18px; }
.md li { margin: 2px 0; }
.md h1, .md h2, .md h3, .md h4 { margin: 12px 0 6px; line-height: 1.3; }
.md h1 { font-size: 15px; }
.md h2 { font-size: 14px; }
.md h3, .md h4 { font-size: 13px; }
.md code {
  font-family: var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  background: var(--oc-muted-surface);
  padding: 1px 4px;
  border-radius: 4px;
}
.md pre {
  background: var(--oc-muted-surface);
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0 0 8px;
}
.md pre code { background: none; padding: 0; }
.md blockquote {
  margin: 0 0 8px;
  padding-left: 10px;
  border-left: 2px solid var(--oc-border);
  color: var(--oc-muted);
}
.md table { border-collapse: collapse; font-size: 12px; }
.md th, .md td { border: 1px solid var(--oc-border); padding: 3px 6px; text-align: left; }
.md a { color: var(--oc-primary); }

.md-collapsed {
  max-height: 168px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 60%, transparent 100%);
}

.md-wrap { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }

/* Dialog and page chrome. */
.dialog-body { display: flex; flex-direction: column; gap: 8px; min-height: 0; flex: 1; }
.dialog-foot { display: flex; gap: 6px; justify-content: flex-end; padding-top: 6px; }

/* The attach picker: the reference picker's header, list + preview, footer. */
.attach-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--oc-border);
}
.attach-head-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.attach-search { flex: 1; min-width: 160px; }
.attach-project { min-width: 110px; }

.attach-body { flex: 1; min-height: 0; display: flex; }
.attach-split { flex: 1; min-height: 0; display: flex; }
.attach-list {
  flex: 5 1 0;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 4px;
}
.attach-preview {
  flex: 7 1 0;
  min-width: 0;
  overflow-y: auto;
  border-left: 1px solid var(--oc-border);
  padding: 12px 4px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.attach-body.narrow .attach-list {
  flex: 1 1 auto;
  width: 100%;
  padding-right: 0;
}
.attach-body.narrow .attach-preview {
  flex: 1 1 auto;
  width: 100%;
  border-left: 0;
  padding: 12px 0;
}

.picker-head { display: flex; align-items: center; gap: 8px; }
.pick-note {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid var(--oc-border);
  padding-top: 12px;
}

.attach-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding-top: 8px;
  border-top: 1px solid var(--oc-border);
}
.attach-hint {
  margin-right: auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--oc-muted);
  font-size: 12px;
}

.state-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--oc-border);
  border-radius: 999px;
  padding: 2px 9px;
  font-size: 12px;
  white-space: nowrap;
}

.page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}

.page-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.board {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(240px, 1fr);
  gap: 10px;
  overflow-x: auto;
  align-items: start;
}

.board-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: var(--oc-muted-surface);
  border: 1px solid var(--oc-border);
  border-radius: var(--oc-radius, 8px);
  padding: 8px;
  max-height: 100%;
  min-height: 120px;
}

.board-column.drag-over { border-color: var(--oc-primary); }

.board-cards {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  min-height: 24px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: var(--oc-radius, 8px);
  padding: 8px;
  cursor: grab;
  text-align: left;
  font: inherit;
  color: inherit;
  width: 100%;
}

.card:hover { border-color: var(--oc-primary); }
.card.dragging { opacity: 0.5; }
.card-title { font-size: 13px; line-height: 1.35; }
.card-meta { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 11px; color: var(--oc-muted); }

.label-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--oc-muted);
}

.label-dot { width: 7px; height: 7px; border-radius: 999px; }

.backdrop {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--oc-bg) 72%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 20;
}

.backdrop-card {
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: var(--oc-radius, 10px);
  box-shadow: 0 12px 40px rgb(0 0 0 / 28%);
  width: min(560px, 100%);
  height: min(680px, 90vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 720px) {
  .board { grid-auto-columns: minmax(220px, 80vw); }
}
/* ---- Linear-source-board mirror --------------------------------------- */

/* The one toolbar row: kind tabs, scope picker, search, filters. */
.oc-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--oc-border);
}

/* The master-detail split behind the full-screen board. */
.split {
  flex: 1;
  min-height: 0;
  display: flex;
}

.split-list {
  min-width: min(280px, 50%);
  max-width: 60%;
  flex-shrink: 0;
  overflow-y: auto;
  padding-right: 4px;
}

.split-sep {
  width: 1px;
  flex-shrink: 0;
  background: var(--oc-border);
}

.split-preview {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* List rows, shaped like the reference rows. */
.row-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.row-item:hover { background: var(--oc-hover); }
.row-item-selected { background: var(--oc-selection); }

.row-glyph { margin-top: 2px; flex-shrink: 0; }

.row-body { min-width: 0; flex: 1; }

.row-title {
  font-weight: 600;
  font-size: 13px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
}

.row-meta {
  margin-top: 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 12px;
  row-gap: 2px;
  font-size: 11px;
  color: var(--oc-muted);
}

.tabular { font-variant-numeric: tabular-nums; }

.person { display: inline-flex; align-items: center; gap: 4px; min-width: 0; }
.person-avatar {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--oc-muted-surface);
  color: var(--oc-muted);
  font-size: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.person-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.label-chips { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.label-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--oc-muted);
  max-width: 144px;
}
.label-chip > :last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.label-dot { width: 6px; height: 6px; border-radius: 999px; flex-shrink: 0; }
.label-more { font-size: 11px; color: var(--oc-muted); }

/* The comment timeline: avatar on a line, then the comment card. */
.comments { display: flex; flex-direction: column; }
.comment { position: relative; padding-left: 40px; padding-bottom: 20px; }
.comment:last-child { padding-bottom: 0; }
.comment-line {
  position: absolute;
  left: 16px;
  top: 38px;
  bottom: 6px;
  width: 1px;
  background: color-mix(in srgb, var(--oc-border) 60%, transparent);
}
.comment > .person-avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  font-size: 12px;
  border: 1px solid color-mix(in srgb, var(--oc-border) 60%, transparent);
  background: var(--oc-elevated, var(--oc-muted-surface));
}
.comment-card {
  background: var(--oc-elevated, var(--oc-muted-surface));
  border-radius: var(--oc-radius, 8px);
  padding: 0 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.comment-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--oc-muted);
}
.comment-author { color: var(--oc-primary-text); }
.comment-body { font-size: 12px; }

.kaneo-mark { flex-shrink: 0; fill: currentColor; }

.kaneo-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}
`;function va(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=ep,e.append(n)}var tp={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function np(e){let t=tp[e],n={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 16 16"),r.setAttribute("width","16"),r.setAttribute("height","16"),r.setAttribute("aria-hidden","true"),r.innerHTML=n[e],r.classList.add("row-glyph"),r}function Ra(e){let{task:t,ticketId:n,column:r,selected:o,onActivate:s}=e,a=Zn(t.dueDate),p=da(t.dueDate),c=Qn(t.createdAt),m=E("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:s}),h=E("div",{className:"row-body"});h.append(E("div",{className:"row-title"},t.title));let b=E("div",{className:"row-meta"});b.append(E("span",{className:"task-key"},n)),t.assigneeName&&b.append(_a(t.assigneeName)),c&&b.append(E("span",{},c));let _=t.subtaskCounts;_&&_.total>0&&b.append(E("span",{className:"tabular"},`${_.completed}/${_.total}`)),t.priority!=="no-priority"&&b.append(E("span",{},gt(t.priority))),a&&b.append(E("span",{className:p?"overdue":""},a));let L=Ea(t.labels??[]);return L&&b.append(L),h.append(b),m.append(np(ma(r)),h),m.title=`${n} \xB7 ${r.name}`,m}var rn=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function Oa(e,t,n={}){if(!n.force){let b=await op();if(b&&Date.now()-b.at<rp)return b.context}let[r,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new rn;let s=await nn(),a=t?o.find(b=>b.slug===t):void 0,p=(s.workspaceId&&o.find(b=>b.id===s.workspaceId)?.id)??a?.id??o[0].id;p!==s.workspaceId&&await oa({workspaceId:p,projectId:null});let c=[],m=null;try{c=await e.listProjects(p)}catch(b){m=b instanceof Error?b:new Error(String(b))}let h={user:r,workspaces:o,workspaceId:p,projects:c,projectsError:m};return await sp(h),h}var Ia="bootstrap-cache",rp=6e4;async function op(){try{let e=await j.storage.get(Ia);return e&&typeof e.at=="number"&&e.context?e:null}catch{return null}}async function sp(e){let t=JSON.parse(JSON.stringify({at:Date.now(),context:e}));try{await j.storage.set(Ia,t)}catch{}}function Ca(e,t,n){if(e.length===0)return null;let r=e.find(a=>a.id===t);if(r)return r;let o=n?.toLowerCase();return(o?e.find(a=>a.slug.toLowerCase()===o):void 0)??e[0]}function La(e){let t=e?.workspace?.trim(),n=e?.project?.trim(),r=e?.["openchamber-url"]?.trim();return{workspaceSlug:t||void 0,projectSlug:n||void 0,openchamberUrl:r||void 0}}var Le=document.querySelector("#root");if(!Le)throw new Error("Kaneo attach dialog is missing its #root element.");var Nt=ui(e=>j.request(e)),on=200,ip=560,f={ready:null,connected:!1,context:null,project:null,boardTasks:[],columnNames:{},defaultStatus:"to-do",results:null,search:"",statusFilter:"",tab:"board",loading:!0,error:null,draft:{title:"",description:"",priority:"medium"},source:null,highlightedId:null,comments:{},worktree:!1,wide:!0,previewOpen:!1},er=0,$o=0,Na=!1,Ho=!1;function xt(e){return e instanceof ut?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Fo(e){return Mo(f.project?.slug??"",e.number)}function Ua(e){return f.columnNames[e.status]??ca(e.status)}function zo(e){return{task:e,ticketId:Fo(e),workspaceId:f.context?.workspaceId??"",projectName:f.project?.name,columnName:Ua(e),comments:f.comments[e.id]?.items}}function Bo(){let e=f.highlightedId;return e?f.boardTasks.find(t=>t.id===e)??f.results?.find(t=>t.id===e)??null:null}function ap(e){if(f.statusFilter&&e.status!==f.statusFilter)return!1;let t=f.search.trim().toLowerCase();return t?e.title.toLowerCase().includes(t)||Fo(e).toLowerCase().includes(t):!0}function lp(){return(f.results??f.boardTasks).filter(ap)}async function tr(){let e=++er;f.loading=!0,Me();try{let{workspaceSlug:t,projectSlug:n}=La(f.ready?.settings),r=await Oa(Nt,t,{force:!0});if(e!==er)return;f.context=r;let o=await nn();if(f.project=Ca(r.projects,o.projectId,n),f.loading=!1,f.error=r.projectsError?xt(r.projectsError):null,Me(),f.project){let s=await Nt.getBoard(f.project.id);if(e!==er)return;f.boardTasks=s.board.columns.flatMap(a=>a.tasks),f.columnNames=Object.fromEntries(s.board.columns.map(a=>[a.id,a.name])),f.defaultStatus=s.board.columns[0]?.id??"to-do",f.results=null}Me()}catch(t){if(e!==er)return;f.loading=!1,f.error=t instanceof rn?t.message:`Could not reach Kaneo. ${xt(t)}`,Me()}}async function cp(){let e=++$o,t=f.context?.workspaceId,n=f.search.trim();if(!t||n.length<2){f.results=null,Ue();return}f.loading=!0,Ue();try{let r=await Nt.search(t,n,{...f.project?{projectId:f.project.id}:{},limit:40});if(e!==$o)return;let o=new Map(f.boardTasks.map(p=>[p.id,p])),s=r.results.filter(p=>p.type==="task");f.results=s.map(p=>o.get(p.id)).filter(p=>!!p);let a=s.length-f.results.length;f.loading=!1,f.error=a>0?`${a} match${a===1?" is":"es are"} outside the loaded board. Open the Kaneo web app to reach them.`:null,Ue()}catch(r){if(e!==$o)return;f.loading=!1,f.error=xt(r),Ue()}}async function Da(e){let t=f.comments[e]?.items;if(t)return t;try{let n=await Nt.listComments(e);return f.comments[e]={loading:!1,error:null,items:n},n}catch{return}}async function nr(e){try{let t={...zo(e),comments:await Da(e.id)};await ka(t),await j.toast({kind:"success",message:`${t.ticketId} attached to the chat.`}),await j.close()}catch(t){await j.toast({kind:"error",message:`Attach failed: ${xt(t)}`,dismiss:!0})}}async function pp(e){let t={...zo(e),comments:await Da(e.id)};await Do(t,{worktree:f.worktree})&&await j.close()}async function dp(){if(!f.project)return;let e=f.draft.title.trim();if(e.length===0){f.error="A task needs a title.",Me();return}try{let t=await Nt.createTask(f.project.id,{title:e.slice(0,on),description:f.draft.description,priority:f.draft.priority,status:f.defaultStatus});await j.toast({kind:"success",message:`Created ${Mo(f.project.slug,t.number)} in ${f.project.name}.`}),await nr(t)}catch(t){f.error=xt(t),Me()}}var kt=null,rt=null,ot=null;function Me(){if(Le){if(tn(Le),kt=null,rt=null,ot=null,!f.ready){Hn(Le,{label:"Connecting to Kaneo"});return}if(!f.connected){Xt(Le,{title:"Kaneo is not connected",body:"Add an API token in Settings \u2192 Integrations \u2192 Kaneo."});return}if(f.source){Ma(!1);return}if(f.tab==="create"){Ma(!0);return}up()}}function up(){kt=E("div",{className:"attach-head"}),Le?.append(kt),fp(),rt=E("div",{className:"attach-body"}),Le?.append(rt),ot=E("div",{className:"attach-foot"}),Le?.append(ot),Ue(),gp()}function fp(){if(!kt)return;tn(kt);let e=E("div");kt.append(e),$n(e,{items:[{id:"board",label:f.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:f.tab,onChange:s=>{if(s==="create"){f.tab="create",Me();return}f.tab="board",Me()}});let t=E("div",{className:"attach-head-row"}),n=E("div",{className:"attach-search"});t.append(n),ao(n,{value:f.search,label:"Search Kaneo",placeholder:"Search, or paste a ticket id",onChange:s=>{if(f.search=s,s.trim().length>=2){cp();return}f.results=null,Ue()}});let r=Object.entries(f.columnNames);if(r.length>0){let s=E("div",{className:f.statusFilter?"filter filter-active":"filter"});t.append(s),lo(s,{label:f.statusFilter?f.columnNames[f.statusFilter]??"Status":"Status",size:"sm",variant:"ghost",items:[{id:"",label:"Any status"},{separator:!0},...r.map(([a,p])=>({id:a,label:p}))],onSelect:a=>{f.statusFilter=a,Ue()}})}let o=f.context?.projects??[];if(o.length>1){let s=E("div",{className:"attach-project"});t.append(s),jt(s,{searchable:!0,searchPlaceholder:"Find a project",value:f.project?.id??"",options:o.map(a=>({id:a.id,label:a.slug.toUpperCase()})),onChange:a=>{f.project=f.context?.projects.find(p=>p.id===a)??null,f.search="",f.results=null,f.highlightedId=null,f.loading=!0,tr()}})}kt.append(t)}function Ue(){if(!rt)return;tn(rt);let e=lp();(!f.highlightedId||!e.some(r=>r.id===f.highlightedId))&&(f.highlightedId=e[0]?.id??null);let t=Bo();if(rt.classList.toggle("narrow",!f.wide),!f.wide&&f.previewOpen&&t){rt.append(Pa(t));return}let n=E("div",{className:"attach-split"});n.append(hp(e)),f.wide&&n.append(Pa(t)),rt.append(n)}function hp(e){let t=E("div",{className:"attach-list scroll"});if(f.error){let n=E("div");t.append(n),Fn(n,{tone:f.results?"warning":"error",title:"Kaneo",body:f.error,...f.results?{}:{action:{label:"Retry",onClick:()=>void tr()}}})}if(f.loading&&e.length===0)return Hn(t,{label:"Loading tasks"}),t;if(e.length===0)return Xt(t,{title:f.search.trim()?"No task matches":"This project has no tasks",body:f.search.trim()?"Search runs inside the selected workspace.":"Use the New tab to create the first one."}),t;for(let n of e){let r=Ra({task:n,ticketId:Fo(n),column:{slug:n.status,isFinal:!1,name:Ua(n)},selected:n.id===f.highlightedId,onActivate:()=>mp(n)});r.addEventListener("dblclick",()=>void nr(n)),t.append(r)}return t}function mp(e){if(f.highlightedId=e.id,Ga(e.id),!f.wide){f.previewOpen=!0,Ue();return}Ue()}function Pa(e){let t=E("div",{className:"attach-preview"});if(!e){let c=E("div",{style:"flex:1; display:flex; align-items:center;"});return t.append(c),Xt(c,{title:"Select a task",body:"Pick a task on the left to preview it here before attaching."}),t}Ga(e.id);let n=zo(e);if(!f.wide){let c=E("div");t.append(c),_e(c,{label:"Back",variant:"ghost",size:"sm",onClick:()=>{f.previewOpen=!1,Ue()}})}let r=E("div",{className:"picker-head"});r.append(E("span",{className:"state-pill"},n.columnName)),r.append(E("span",{className:"task-key"},n.ticketId));let o=E("div",{style:"margin-left:auto;"});r.append(o),_e(o,{label:"Kaneo",variant:"ghost",size:"sm",onClick:()=>void Go(n)}),t.append(r),t.append(E("h2",{className:"detail-title"},e.title)),t.append(ya(n)),t.append(wa(n,1200)),t.append(Aa(f.comments[e.id]??null));let s=E("div",{className:"pick-note"}),a=E("div");s.append(a),Gn(a,{label:"Create in a new worktree",checked:f.worktree,onChange:c=>{f.worktree=c}}),s.append(E("p",{className:"muted"},"The agent gets the description and comments."));let p=E("div",{className:"block"});return s.append(p),_e(p,{label:"Start session",variant:"secondary",size:"sm",onClick:()=>{pp(e).catch(c=>{j.toast({kind:"error",message:xt(c),dismiss:!0})})}}),t.append(s),t}function gp(){if(!ot)return;tn(ot);let e=Bo();ot.append(E("span",{className:"attach-hint"},e?"Enter attaches the highlighted task.":"Select a task to attach.")),_e(ot,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void j.close()});let t=E("div");ot.append(t),_e(t,{label:"Attach",size:"sm",disabled:!e,onClick:()=>{e&&nr(e)}})}function Ma(e){let t=E("div",{className:"attach-head"});if(Le?.append(t),e){let c=E("div");t.append(c),$n(c,{items:[{id:"board",label:f.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:"create",onChange:m=>{f.tab=m==="board"?"board":"create",Me()}})}else t.append(E("h2",{className:"detail-title"},"New Kaneo task"));let n=E("div",{className:"dialog-body"});if(Le?.append(n),f.error){let c=E("div");n.append(c),Fn(c,{tone:"error",title:"Kaneo",body:f.error})}let r=E("div");n.append(r),Pn(r,{label:"Title",value:f.draft.title,placeholder:"What needs doing?",error:f.draft.title.length>on?`Keep it under ${on} characters.`:void 0,onChange:c=>{f.draft.title=c}});let o=E("div");n.append(o),jt(o,{label:"Priority",value:f.draft.priority,options:pi.map(c=>({id:c,label:gt(c)})),onChange:c=>{f.draft.priority=c}});let s=E("div");n.append(s),Pn(s,{label:"Description",value:f.draft.description,multiline:!0,rows:5,placeholder:"Markdown is supported.",onChange:c=>{f.draft.description=c}});let a=E("div",{className:"attach-foot"});Le?.append(a),_e(a,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void j.close()});let p=E("div");a.append(p),_e(p,{label:"Create and attach",size:"sm",onClick:()=>void dp()})}function kp(e){let n=(e.kind==="message"?e.text:e.sessionTitle).split(`
`).filter(a=>a.trim().length>0),r=(ua(n[0]??"",on)||"Untitled task").slice(0,on),o=n.slice(1).join(`
`).trim(),s=e.kind==="session"?`Session: ${e.sessionTitle}`:"From a chat message";return{title:r,description:[s,o].filter(Boolean).join(`

`),priority:"medium"}}function Ga(e){f.comments[e]||(f.comments[e]={loading:!0,error:null},Nt.listComments(e).then(t=>{f.comments[e]={loading:!1,error:null,items:t},Ue()}).catch(t=>{f.comments[e]={loading:!1,error:xt(t)},Ue()}))}document.addEventListener("keydown",e=>{if(e.key!=="Enter"||e.shiftKey||f.tab!=="board"||f.source)return;let t=document.activeElement?.tagName.toLowerCase()??"";if(t==="textarea"||t==="button")return;let n=Bo();n&&(e.preventDefault(),nr(n))});j.onReady(e=>{eo(e,document.documentElement),va(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,f.ready=e,f.connected=e.connection.connected,Na||(Na=!0,(Lr(e.item)||Nr(e.item))&&(f.source=e.item,f.draft=kp(e.item),f.tab="create"),xp()),Me(),f.connected&&!Ho&&(Ho=!0,tr())});j.onConnection(e=>{let t=f.connected;f.connected=e.connected,t!==e.connected&&(Me(),e.connected&&(Ho=!0,tr()))});function xp(){if(!Le||!globalThis.ResizeObserver)return;new ResizeObserver(t=>{let n=t[0]?.contentRect.width??0,r=n===0||n>=ip;r!==f.wide&&(f.wide=r,r&&(f.previewOpen=!1),Me())}).observe(Le)}j.onItem(e=>{if(!e||!("providerId"in e))return;let t=e.data;j.toast({kind:"info",message:t?.ticketId?`${t.ticketId} is already attached to this chat.`:"That item is already attached to this chat."})});})();
