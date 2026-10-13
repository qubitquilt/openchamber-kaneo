"use strict";(()=>{var U="openchamber.sdk";var Er="data-oc-scrolling",Sn=`
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
:hover, [${Er}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Er}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Er}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Er}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function yn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",n=>{let o=n.target===e?t:n.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=r.get(o);s!==void 0&&clearTimeout(s),r.set(o,setTimeout(()=>{r.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var sl=`(${yn.toString()})(document);`;var bs=/^[a-z][a-z0-9-]{0,39}$/;var gs=e=>Object(e)===e&&!Array.isArray(e),wn=(e,t)=>Object.keys(e).every(r=>t.includes(r)),ks=e=>String(e)===e&&e.length>=1&&e.length<=60,xs=e=>String(e)===e&&e.length>=1&&e.length<=80,Es=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!gs(r)||!bs.test(r.id)||!ks(r.label)||r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1||t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!wn(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!wn(r,["kind","id","label","value","options","disabled"])||!xs(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let n=new Set;for(let o of r.options){if(!gs(o)||!wn(o,["value","label"])||!xs(o.value)||!ks(o.label)||n.has(o.value))return!1;n.add(o.value)}if(!n.has(r.value))return!1}return!0};var An=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Ts=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var _s=/^[A-Za-z0-9_-]{1,80}$/;var Ss=["left","right","top","bottom"];var ys=(e,t=0,r={remaining:16e3})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of n)if(!ys(o,t+1,r))return!1;return!0},vn=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(vn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(vn)}return String(e)===e||Number.isFinite(e)},Rn=e=>{try{return String(e.id)!==e.id||!_s.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ss.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ys(e.data)||!vn(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var As=["file","directory","other","missing"],In=e=>!!(e&&"sessionId"in e),Cn=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Ln=e=>e!==null&&e.kind==="message",Nn=e=>e!==null&&e.kind==="session";var vs=/^[0-9a-f]{7,64}$/i,Pn=e=>vs.test(e),Tr=500,_r=32e3,Rs=16e3,Os=128,Is=200,Cs=2e3,Ls=16e3,Ns=80,Ps=200,Ms=16e3;var Us=2e3;var Mn=2e4,Sr=1024,yr=2e6;var wr=64e3,Ar=8e3,Un=4e3;var Dn=9e4;var Ds=999,Gs=1e4,zt=500,$s=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Hs=["stopped","starting","ready","failed"],il=new Set($s),Fs=e=>il.has(e),zs=e=>e&&Fs(e)?e:"HOST_REJECTED",Rt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Rt):Object(e)===e?Object.values(e).every(Rt):!1,Bs=e=>Rt(e)&&JSON.stringify(e).length<=Ms,ws=e=>e?.trim().slice(0,Ps)??"",Ot=e=>{let t=e.id.trim().slice(0,Os),r=e.title.trim().slice(0,Is),n=e.url.trim().slice(0,Cs),o=e.text?.trim().slice(0,Ls),s=e.author?.trim().slice(0,Ns),a=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:t,title:r||t,url:n,kind:a};if(o&&(d.text=o),s&&(d.author=s),a==="pull"){let c=ws(e.branches?.head),h=ws(e.branches?.base);c&&h&&(d.branches={head:c,base:h})}return Bs(e.data)&&(d.data=e.data),d},Gn=e=>{let t=Ot(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},$n=e=>{let t={text:e.text.trim().slice(0,Rs)};return e.send&&(t.send=!0),t},Hn=e=>e===null||!Number.isFinite(e)?null:Math.min(Ds,Math.max(0,Math.round(e))),Fn=e=>Number.isFinite(e)?Math.min(Gs,Math.max(0,Math.ceil(e))):0;var It=e=>e.length>0&&e.length<=Sr&&!e.includes("\0")&&!e.includes("\\");var vr=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Us?!1:!e.split("/").some(r=>r==="."||r===".."),al=new Set(Hs),zn=e=>!!(e&&"status"in e&&al.has(String(e.status))&&!("body"in e)),Rr=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Bn=e=>!!(e&&"content"in e&&String(e.content)===e.content),jn=e=>!!(e&&"written"in e&&e.written===!0),Xn=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),ll=new Set(As),Wn=e=>!!(e&&"kind"in e&&"size"in e&&ll.has(String(e.kind))&&Number.isFinite(e.size)),Vn=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),cl=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),dl=e=>Object(e)===e?e:null,On=e=>String(e)===e&&e.length>0,pl=e=>{if(!On(e.id))return null;if(e.ok===!0){let t={channel:U,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&On(e.error)?{channel:U,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:zs(On(e.code)?e.code:void 0)}:null},Kn=e=>{let t=dl(e);return!t||t.channel!==U||t.v!==1?null:t.type==="result"?pl(t):!cl.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var js=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,ul=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",R=class extends Error{code;constructor(t,r){super(r),this.name="HostRequestError",this.code=t}},Xs=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Or=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${Sr} characters without NUL or backslash.`)),Ir=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},P=e=>(e.value+=1,`oc-${e.value}`),Qn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??(l=>l===t.parent),n=e.requestTimeoutMs??Mn,o=new Set,s=new Set,a=new Set,d=new Set,c=new Set,h=new Set,m=new Set,b=new Set,_=new Set,L=null,N=null,K=new Set,de=new Set,C=null,te=null,ke=!1,le=new Map,fe=new Map,me=new Map,H=!1,v={value:0},A=null,Te=null,ee=!1,O=!1,ie=null,Pt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,he=l=>{t.parent.postMessage(l,"*")},re=(l,u)=>{for(let S of l)try{S(u)}catch(T){console.error(T)}},Be=l=>{if(!(l instanceof MessageEvent)||!r(l.source))return;let u=Kn(l.data);if(!u)return;if(u.type==="workspace"){let T=fe.get(u.payload.subscriptionId);T&&re([T],u.payload.snapshot);return}if(u.type==="shells"){let T=me.get(u.payload.subscriptionId);T&&re([T],u.payload.snapshot);return}if(u.type==="ready"){A=u.payload,Te=Pt(u.payload.session),re(o,u.payload),re(s,u.payload.directory),re(a,u.payload.session),Te&&re(d,Te),re(c,u.payload.connection),re(h,u.payload.settings),re(m,u.payload.item);return}if(u.type==="directory"){A&&(A={...A,directory:u.payload.directory}),re(s,u.payload.directory);return}if(u.type==="session"){A&&(A={...A,session:u.payload.session}),u.payload.session?Te?.sessionId!==u.payload.session.id&&(Te=Pt(u.payload.session)):Te=null,re(a,u.payload.session);return}if(u.type==="session-lifecycle"){Te=u.payload,re(d,u.payload);return}if(u.type==="connection"){A&&(A={...A,connection:u.payload.connection}),re(c,u.payload.connection);return}if(u.type==="settings"){A&&(A={...A,settings:u.payload.settings}),re(h,u.payload.settings);return}if(u.type==="item"){A&&(A={...A,item:u.payload.item}),re(m,u.payload.item);return}if(u.type==="status-control-event"){re(b,u.payload);return}if(u.type==="popover-closed"){re(_,u.payload);return}if(u.type==="action"){let T=W=>{H||he({channel:U,v:1,type:"action-result",id:u.id,payload:W})},z=N;if(!z){T({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>z(u.payload)).then(()=>T({ok:!0}),W=>{let X=(W instanceof Error?W.message:String(W)).trim();T({ok:!1,error:(X||"Action failed.").slice(0,zt)})});return}if(u.type==="file-open"){let T=u.payload;if(te&&Ts(te,T))return;te=T,re(K,u.payload);return}if(u.type==="file-saved"){re(de,u.payload.version);return}if(u.type==="file-snapshot"){let T=X=>{H||he({channel:U,v:1,type:"file-snapshot-result",id:u.id,payload:X})},z=X=>T({error:(X.trim()||"Could not read the edited file.").slice(0,zt)}),W=C;if(!W){z("This extension does not edit files.");return}Promise.resolve().then(()=>W(u.payload.purpose)).then(X=>{if(An(X)>2e7){z(`The file is over ${2e7} ${"bytes"in X?"bytes":"characters"}.`);return}if(X.version.length>256){z(`The snapshot version is over ${256} characters.`);return}T({snapshot:"bytes"in X?{bytes:X.bytes,version:X.version}:{content:X.content,version:X.version}})},X=>z(X instanceof Error?X.message:String(X)));return}if(u.type==="resolve"){let T=W=>{he({channel:U,v:1,type:"resolve-result",id:u.id,payload:W})},z=L;if(!z){T({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>z(u.payload)).then(W=>T({item:W?Ot(W):null}),W=>{let X=(W instanceof Error?W.message:String(W)).trim();T({error:(X||"Command failed.").slice(0,zt)})});return}let S=le.get(u.id);if(S){if(clearTimeout(S.timer),le.delete(u.id),u.ok){S.resolve(u.payload);return}S.reject(new R(u.code,u.error))}};t.addEventListener("message",Be),he({channel:U,v:1,type:"hello"});let xe=(l,u=n)=>H||t.parent===t?Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((S,T)=>{let z=setTimeout(()=>{le.delete(l.id),T(new R("HOST_TIMEOUT","Host did not answer in time."))},u);le.set(l.id,{resolve:S,reject:T,timer:z}),he(l)}),ne=l=>xe(l).then(()=>{}),Y={channel:U,v:1},st=l=>{!H&&t.parent!==t&&he(l)},Mt=()=>st({...Y,type:"file-save"}),sr=l=>{!js(l)||!ul(l)||(l.preventDefault(),Mt())},ir=l=>{!js(l)||l.key!=="Escape"||A?.surface!=="popover"||!A.popover||(l.preventDefault(),Gt(A.popover.id,"escape").catch(()=>{}))},bt=()=>{let l=A?.surface==="popover"?A.popover:void 0;if(!l)return;let u=ee||O;ie!==u&&(ie=u,V(l.id,u).catch(()=>{}))},F=()=>{A?.surface!=="popover"||ee||(ee=!0,bt())},ar=l=>{A?.surface!=="popover"||l.relatedTarget!==null||!ee||(ee=!1,bt())},lr=()=>{A?.surface!=="popover"||O||(O=!0,bt())},cr=()=>{A?.surface!=="popover"||!O||(O=!1,bt())},Re=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new R("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Ut=async l=>{l.kind!=="projects"&&Re(l.projectId);let u=await xe({...Y,type:"workspace-read",id:P(v),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return u},Dt=async(l,u)=>{l.kind!=="projects"&&Re(l.projectId);let S=P(v);fe.set(S,u);try{await ne({...Y,type:"workspace-subscribe",id:P(v),payload:{subscriptionId:S,query:l}})}catch(T){throw fe.delete(S),H||he({...Y,type:"workspace-unsubscribe",id:P(v),payload:{subscriptionId:S}}),T}return()=>{!fe.delete(S)||H||he({...Y,type:"workspace-unsubscribe",id:P(v),payload:{subscriptionId:S}})}},dr=async(l,u)=>{l.kind==="session"&&Re(l.sessionId),l.kind==="project"&&Re(l.projectId);let S=P(v);me.set(S,u);try{await ne({...Y,type:"shells-subscribe",id:P(v),payload:{subscriptionId:S,scope:l}})}catch(T){throw me.delete(S),H||he({...Y,type:"shells-unsubscribe",id:P(v),payload:{subscriptionId:S}}),T}return()=>{!me.delete(S)||H||he({...Y,type:"shells-unsubscribe",id:P(v),payload:{subscriptionId:S}})}},Et=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Rt(l.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&A?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let u=await xe({...Y,type:"storage",id:P(v),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new R("HOST_REJECTED","Host did not return storage data.");return u},Gt=(l,u)=>A?.features?.popovers!==!0&&!(A?.surface==="popover"&&A.popover?.id===l)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):ne({...Y,type:"popover-close",id:P(v),payload:u?{id:l,reason:u}:{id:l}}),V=(l,u)=>A?.features?.popovers!==!0&&!(A?.surface==="popover"&&A.popover?.id===l)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):ne({...Y,type:"popover-anchor",id:P(v),payload:{id:l,active:u}});return t.addEventListener("keydown",ir,!0),t.addEventListener("pointerover",F),t.addEventListener("pointermove",F),t.addEventListener("pointerout",ar),t.addEventListener("focus",lr),t.addEventListener("blur",cr),{onAction:l=>(N=l,()=>{N===l&&(N=null)}),listProjects:async()=>{let l=await Ut({kind:"projects"});if(l.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Ut({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Ut({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Dt({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Dt({kind:"worktrees",projectId:l},S=>{S.kind==="worktrees"&&u(S)}),onSessions:(l,u)=>Dt({kind:"sessions",projectId:l},S=>{S.kind==="sessions"&&u(S)}),onRunningShells:(l,u)=>dr(l,u),readShellOutput:async(l,u)=>{Re(l,128);let S=u?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let T=u?.tailBytes;if(T!==void 0&&(!Number.isInteger(T)||T<1||T>65536))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let W=await xe({...Y,type:"shell-output",id:P(v),payload:{shellId:l,cursor:S,tailBytes:T}});if(!W||typeof W.output!="string"||!Number.isFinite(W.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return W},stopShell:async l=>{if(Re(l,128),(await xe({...Y,type:"shell-stop",id:P(v),payload:{shellId:l}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Re(l),await ne({...Y,type:"open-session",id:P(v),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let S=Ir(u),T={op:"get",key:l};S&&(T.scope=S);let z=await Et(T);return z.op==="get"&&z.found?z.value:void 0},set:async(l,u,S)=>{let T=Ir(S),z={op:"set",key:l,value:u};T&&(z.scope=T),await Et(z)},delete:async(l,u)=>{let S=Ir(u),T={op:"delete",key:l};S&&(T.scope=S),await Et(T)},keys:async l=>{let u=Ir(l),S={op:"keys"};u&&(S.scope=u);let T=await Et(S);if(T.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return T.keys}},onReady:l=>(o.add(l),A&&l(A),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),A&&l(A.directory),()=>{s.delete(l)}),onSession:l=>(a.add(l),A&&l(A.session),()=>{a.delete(l)}),onSessionLifecycle:l=>(d.add(l),Te&&l(Te),()=>{d.delete(l)}),onConnection:l=>(c.add(l),A&&l(A.connection),()=>{c.delete(l)}),onSettings:l=>(h.add(l),A&&l(A.settings),()=>{h.delete(l)}),onItem:l=>(m.add(l),A&&l(A.item),()=>{m.delete(l)}),onStatusControl:l=>(b.add(l),()=>{b.delete(l)}),onPopoverClosed:l=>(_.add(l),()=>{_.delete(l)}),setStatusControls:l=>A?.features?.statusControls!==!0?Promise.reject(new R("UNSUPPORTED","This host does not support status controls.")):Es(l)?ne({...Y,type:"status-controls",id:P(v),payload:{controls:l}}):Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>A?.features?.popovers!==!0?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):Rn(l)?ne({...Y,type:"popover-open",id:P(v),payload:l}):Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Gt,setPopoverAnchorActive:V,onResolve:l=>(L=l,()=>{L===l&&(L=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>Tr?Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${Tr} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>_r)?Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${_r} characters.`)):ne({channel:U,v:1,type:"toast",id:P(v),payload:{...l,message:u}})},openUrl:l=>ne({channel:U,v:1,type:"open-url",id:P(v),payload:{url:l}}),openCommit:l=>Pn(l)?ne({channel:U,v:1,type:"open-commit",id:P(v),payload:{sha:l}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>ne({channel:U,v:1,type:"open-surface",id:P(v),payload:{surfaceId:l}}),writeClipboard:l=>ne({channel:U,v:1,type:"clipboard-write",id:P(v),payload:{text:l}}),compose:l=>ne({channel:U,v:1,type:"compose",id:P(v),payload:l}),attach:l=>ne({channel:U,v:1,type:"attach",id:P(v),payload:Ot(l)}),startSession:async l=>{l.projectId!==void 0&&Re(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Re(u.directory):(u.name!==void 0&&Re(u.name,200),u.baseBranch!==void 0&&Re(u.baseBranch,200)));let S=await xe({channel:U,v:1,type:"start-session",id:P(v),payload:Gn(l)},e.requestTimeoutMs??18e4);if(!In(S))throw new R("HOST_REJECTED","Host did not return a session.");return S},prompt:l=>xe({channel:U,v:1,type:"prompt",id:P(v),payload:$n(l)}).then(u=>{if(!Cn(u))throw new R("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>ne({channel:U,v:1,type:"session-link",id:P(v),payload:Ot(l)}),close:()=>ne({channel:U,v:1,type:"close",id:P(v)}),oauthStart:()=>ne({channel:U,v:1,type:"oauth-start",id:P(v)}),oauthDisconnect:()=>ne({channel:U,v:1,type:"oauth-disconnect",id:P(v)}),request:l=>(vr(l.path)?xe({channel:U,v:1,type:"request",id:P(v),payload:l}):Xs()).then(u=>{if(!Rr(u))throw new R("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(vr(l.path)?xe({channel:U,v:1,type:"service-request",id:P(v),payload:l}):Xs()).then(u=>{if(!Rr(u))throw new R("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>xe({channel:U,v:1,type:"service-status",id:P(v)}).then(l=>{if(!zn(l))throw new R("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(It(l)?xe({channel:U,v:1,type:"file-read",id:P(v),payload:{path:l}}):Or()).then(u=>{if(!Bn(u))throw new R("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>It(l)?u.length>yr?Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${yr} characters.`)):xe({channel:U,v:1,type:"file-write",id:P(v),payload:{path:l,content:u}}).then(S=>{if(!jn(S))throw new R("HOST_REJECTED","Host did not confirm the write.");return S}):Or(),listDir:l=>(It(l)?xe({channel:U,v:1,type:"file-list",id:P(v),payload:{path:l}}):Or()).then(u=>{if(!Xn(u))throw new R("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(It(l)?xe({channel:U,v:1,type:"file-stat",id:P(v),payload:{path:l}}):Or()).then(u=>{if(!Wn(u))throw new R("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),S=l.system?.trim();if(u.length===0||u.length>wr)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${wr} characters.`));if(S!==void 0&&(S.length===0||S.length>Ar))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${Ar} characters.`));let T=l.maxOutputTokens===void 0?void 0:Math.min(Un,Math.max(1,Math.floor(l.maxOutputTokens)));if(T!==void 0&&!Number.isFinite(T))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let z={prompt:u};return S!==void 0&&(z.system=S),T!==void 0&&(z.maxOutputTokens=T),xe({channel:U,v:1,type:"generate",id:P(v),payload:z},e.requestTimeoutMs??Dn).then(W=>{if(!Vn(W))throw new R("HOST_REJECTED","Host did not return generated text.");return W})},setBadge:l=>ne({channel:U,v:1,type:"badge",id:P(v),payload:{count:Hn(l)}}),setHeight:l=>ne({channel:U,v:1,type:"resize",id:P(v),payload:{height:Fn(l)}}),onFileOpen:l=>(K.add(l),ke||(ke=!0,t.addEventListener("keydown",sr,!0)),te&&l(te),()=>{K.delete(l)}),onFileSnapshot:l=>(C=l,()=>{C===l&&(C=null)}),onFileSaved:l=>(de.add(l),()=>{de.delete(l)}),reportFileChange:l=>st({...Y,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:Mt,reportFileUnsupported:()=>st({...Y,type:"file-unsupported"}),dispose:()=>{for(let l of fe.keys())he({...Y,type:"workspace-unsubscribe",id:P(v),payload:{subscriptionId:l}});fe.clear();for(let l of me.keys())he({...Y,type:"shells-unsubscribe",id:P(v),payload:{subscriptionId:l}});me.clear(),H=!0,L=null,N=null,C=null,K.clear(),de.clear(),ke&&t.removeEventListener("keydown",sr,!0),t.removeEventListener("message",Be),t.removeEventListener("keydown",ir,!0),t.removeEventListener("pointerover",F),t.removeEventListener("pointermove",F),t.removeEventListener("pointerout",ar),t.removeEventListener("focus",lr),t.removeEventListener("blur",cr);for(let l of le.values())clearTimeout(l.timer),l.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));le.clear(),o.clear(),s.clear(),a.clear(),d.clear(),c.clear(),h.clear(),m.clear(),b.clear(),_.clear()}}};var Ks=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var $d=new Set(Ks);var Ys=["none","agent","user"];var Fd=new Set(Ys);var fl=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],ml=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],qs=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,n]of fl)t.style.setProperty(r,e.tokens[n]);for(let[r,n,o]of ml){let s=e.tokens[o]??"";t.style.setProperty(r,s),t.style.setProperty(n,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},eo=(e,t)=>{qs(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var hl={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Z=(e,t)=>`var(--${e}, var(--oc-${hl[e]}, ${t}))`,dt=Z("surface-background","transparent"),Cr=Z("surface-elevated","transparent"),Bt=Z("surface-elevated-foreground","inherit"),Ze=Z("surface-foreground","inherit"),oe=Z("surface-muted-foreground","gray"),gl=Z("surface-muted","transparent"),Ne=Z("interactive-border","currentColor"),Oe=Z("interactive-hover","transparent"),pt=Z("interactive-active","transparent"),to=Z("interactive-selection","transparent"),ro=Z("interactive-selection-foreground","inherit"),Qs=Z("interactive-focus-ring","currentColor"),Xe=Z("primary","currentColor"),no=Z("primary-text","inherit"),oo=Z("error-text","inherit"),kl=Z("font-sans","inherit"),so=Z("font-mono","monospace"),ei=Z("radius","9px"),io=`calc(${ei} - 2px)`,Js=`calc(${ei} - 4px)`,ue=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,Zs=`box-shadow: 0 0 0 2px ${Qs};`,Lr=e=>{let t=Z(`status-${e}`,"currentColor");return`
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
${Lr("success")}${Lr("warning")}${Lr("error")}${Lr("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Xe}; --oc-sdk-tone-text: ${no}; }

.oc-sdk-btn { border-radius: ${io}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Js}; }
.oc-sdk-btn[data-variant="default"] { color: ${no}; background: ${ue(Xe,10,dt)}; border-color: ${ue(Xe,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${ue(Xe,16,dt)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${ue(Xe,22,dt)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${gl}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${pt}, ${pt}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Cr}; color: ${Bt}; border-color: ${Ne}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${pt}, ${pt}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Oe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${pt}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Z("status-error","red")}; color: ${oo}; background: ${ue("var(--oc-sdk-tone)",7,dt)}; border-color: ${ue("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${ue("var(--oc-sdk-tone)",9,dt)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${ue("var(--oc-sdk-tone)",11,dt)}; }

.oc-sdk-field-note { color: ${oe}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${oo}; }
.oc-sdk-input { border-radius: ${io}; background: ${Cr}; color: ${Bt}; box-shadow: inset 0 0 0 1px ${ue(Ne,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
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

.oc-sdk-trigger { border-color: ${Ne}; border-radius: ${io}; background: ${Cr}; color: ${Bt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Oe}, ${Oe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${pt}, ${pt}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${oe}; }
.oc-sdk-trigger-chevron { color: ${oe}; }
.oc-sdk-popup { --surface-foreground: ${Bt}; border-color: ${ue(Ne,60)}; border-radius: 12px; background: ${Cr}; color: ${Bt}; box-shadow: 0 8px 24px ${ue(Ze,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Oe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${to}; color: ${ro}; }
.oc-sdk-option-check { color: ${Ze}; }
.oc-sdk-option[data-destructive="true"] { color: ${oo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${ue(Z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${oe}; }
.oc-sdk-popup-empty { color: ${oe}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ne}; border-radius: 4px; color: ${Ze}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${ue(Ze,60,Ne)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ne}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${dt}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Xe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Zs} }
.oc-sdk-check-desc { color: ${oe}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${ue(Ze,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${oe}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Ze}; }
.oc-sdk-tab[aria-selected="true"] { color: ${ro}; background: ${to}; border-color: ${Ne}; }
.oc-sdk-tab-count { color: ${oe}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Oe}; color: ${oe}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${ue("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Oe}; }
.oc-sdk-row[aria-selected="true"] { background: ${to}; color: ${ro}; }
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

.oc-sdk-text a { color: ${no}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${ue(Ne,60)}; }
`,q=`
${Sn}
${xl}
${ti}`;var ri="oc-sdk-ui-style",Qe=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},J=e=>{let t=document.getElementById(ri);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}yn(document);let r=document.createElement("style");r.id=ri,r.textContent=e,document.head.appendChild(r)},w=(e,t)=>{let r=document.createElement(e);return t&&(r.className=t),r},Ie=e=>{let t=w("button",e);return t.type="button",t},se=(e,t)=>{let r=t??"";e.textContent!==r&&(e.textContent=r)},et=(e,t,r)=>{r==null||r===""?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)},ni=(e,t)=>{let r=n=>{n.target instanceof Node&&e.contains(n.target)||t()};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0)}};var bl=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},_e=(e,t)=>{J(q);let r=t,n=Ie("oc-sdk oc-sdk-btn"),o=bl(),s=document.createElement("span");n.append(s),e.append(n);let a=()=>{n.dataset.variant=r.variant??"default",n.dataset.size=r.size??"default",n.disabled=!!r.disabled||!!r.loading,n.dataset.loading=r.loading?"true":"false",n.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&o.parentNode!==n?n.prepend(o):!r.loading&&o.parentNode===n&&o.remove(),se(s,r.label)},d=()=>{r.disabled||r.loading||r.onClick()};return n.addEventListener("click",d),a(),{update:c=>{r={...r,...c},a()},dispose:()=>{n.removeEventListener("click",d),n.remove()}}};var Nr=(e,t)=>{J(q);let r=t,n=w("label","oc-sdk oc-sdk-field"),o=w("span","oc-sdk-field-label"),s=r.multiline?w("textarea","oc-sdk-input"):w("input","oc-sdk-input"),a=w("span","oc-sdk-field-note");n.append(o,s,a),e.append(n);let d=()=>{se(o,r.label),o.hidden=!r.label,s instanceof HTMLInputElement?s.type=r.password?"password":"text":s.rows=r.rows??3,s.value!==r.value&&(s.value=r.value),s.disabled=!!r.disabled,et(s,"placeholder",r.placeholder),s.dataset.mono=r.mono?"true":"false";let h=!!r.error;n.dataset.invalid=h?"true":"false",s.setAttribute("aria-invalid",h?"true":"false");let m=r.error??r.helper??"";se(a,m),a.hidden=m===""},c=()=>{r.onChange(s.value)};return s.addEventListener("input",c),d(),{update:h=>{r={...r,...h},d()},dispose:()=>{s.removeEventListener("input",c),n.remove()}}};var oi="http://www.w3.org/2000/svg",El={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},We=(e,t,r)=>{let n=document.createElementNS(oi,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),r&&n.setAttribute("class",r);let o=document.createElementNS(oi,"path");return o.setAttribute("d",El[e]),n.append(o),n};var ao=(e,t)=>{J(q);let r=t,n=w("div","oc-sdk oc-sdk-search"),o=w("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Ie("oc-sdk-search-clear");s.append(We("close",14)),s.tabIndex=-1,n.append(We("search",16,"oc-sdk-search-icon"),o,s),e.append(n);let a=()=>{let m=r.placeholder??"Search";et(o,"placeholder",m),o.setAttribute("aria-label",r.label??m),s.setAttribute("aria-label","Clear search"),o.value!==r.value&&(o.value=r.value),n.dataset.active=r.value.trim()===""?"false":"true"},d=()=>{r.value!==""&&r.onChange(""),o.focus()},c=()=>{r.onChange(o.value)},h=m=>{m.key==="Escape"&&o.value!==""&&(m.preventDefault(),d())};return o.addEventListener("input",c),o.addEventListener("keydown",h),s.addEventListener("click",d),a(),r.autofocus&&o.focus(),{update:m=>{r={...r,...m},a()},dispose:()=>{o.removeEventListener("input",c),o.removeEventListener("keydown",h),s.removeEventListener("click",d),n.remove()}}};var Ve=(e,t="vertical")=>{let[r,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===r||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},tt=(e,t,r)=>{let n=e.filter(c=>!c.disabled);if(n.length===0)return null;let o=n[0],s=n[n.length-1];if(r==="first"||!o||!s)return o?.id??null;if(r==="last")return s.id;let a=n.findIndex(c=>c.id===t);return a===-1?r==="next"?o.id:s.id:n[Math.min(n.length-1,Math.max(0,a+(r==="next"?1:-1)))]?.id??null};var si=(e,t)=>`${e}-${t??""}`,Pr=(e,t,r,n)=>{let o=Ie("oc-sdk-option");o.id=si(e,r.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!r.disabled,t==="option"&&o.setAttribute("aria-selected",r.selected?"true":"false"),o.dataset.destructive=r.destructive?"true":"false";let s=w("span","oc-sdk-option-label");if(s.textContent=r.label,o.append(s),r.hint){let a=w("span","oc-sdk-option-hint");a.textContent=r.hint,o.append(a)}if(t==="option"){o.dataset.mark="check";let a=w("span","oc-sdk-option-check");a.append(We("check",14)),o.append(a)}return o.addEventListener("pointerenter",n.hover),o.addEventListener("click",n.pick),o},Mr=(e,t,r,n)=>{let o=si(r,n);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");et(t,"aria-activedescendant",n?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Tl=(e,t)=>{let r=t.getBoundingClientRect();e.style.minWidth=`${Math.round(r.width)}px`,e.style.left=`${Math.round(r.left)}px`,e.style.top=`${Math.round(r.bottom+4)}px`;let n=e.offsetHeight,o=window.innerHeight-r.bottom-8;n>o&&r.top-8>o&&(e.style.top=`${Math.max(8,Math.round(r.top-4-n))}px`);let s=r.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(r.left-s))}px`)},Ur=(e,t,r,n)=>{e.append(r),Tl(r,t);let o=ni(e,n),s=()=>{n()},a=d=>{d.target instanceof Node&&r.contains(d.target)||n()};return window.addEventListener("resize",s),window.addEventListener("scroll",a,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",a,!0),r.remove()}};var ii=(e,t)=>{let r=t.trim().toLowerCase();return r?e.filter(n=>n.label.toLowerCase().includes(r)||n.id.toLowerCase().includes(r)):[...e]},_l=0,jt=(e,t)=>{J(q);let r=t,n=`oc-sdk-select-${_l+=1}`,o=w("div","oc-sdk oc-sdk-select"),s=w("span","oc-sdk-field-label");s.id=`${n}-label`;let a=Ie("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",s.id);let d=w("span","oc-sdk-trigger-value");a.append(d,We("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,a),e.append(o);let c="",h=null,m=null,b=w("div","oc-sdk oc-sdk-popup"),_=w("div","oc-sdk-popup-search"),L=w("input","oc-sdk-input");L.type="text",L.autocomplete="off",_.append(L);let N=w("div");N.setAttribute("role","listbox"),N.tabIndex=-1,b.append(N);let K=()=>ii(r.options,r.searchable?c:""),de=()=>r.searchable?L:N,C=O=>{h=O,Mr(N,de(),n,O)},te=()=>{Qe(N);let O=K();if(O.length===0){let ie=w("div","oc-sdk-popup-empty");ie.textContent="No matches",N.append(ie)}for(let ie of O)N.append(Pr(n,"option",{...ie,selected:ie.id===r.value},{hover:()=>C(ie.id),pick:()=>fe(ie.id)}));C(O.some(ie=>ie.id===h)?h:O[0]?.id??null)},ke=()=>{let O=m;m=null,O?.(),c="",L.value="",a.setAttribute("aria-expanded","false")},le=()=>{m||r.disabled||(h=r.value,L.placeholder=r.searchPlaceholder??"Search",r.searchable?b.prepend(_):_.remove(),te(),m=Ur(o,a,b,ke),a.setAttribute("aria-expanded","true"),de().focus())},fe=O=>{ke(),a.focus(),O!==r.value&&r.onChange(O)},me=()=>{m?ke():le()},H=O=>{!m&&Ve(O)&&(O.preventDefault(),le())},v=O=>{let ie=Ve(O);ie?(O.preventDefault(),C(tt(K(),h,ie))):O.key==="Enter"?(O.preventDefault(),h&&fe(h)):O.key==="Escape"?(O.preventDefault(),ke(),a.focus()):r.searchable&&O.target!==L&&O.key.length===1&&!O.ctrlKey&&!O.metaKey&&L.focus()},A=()=>{c=L.value,te()},Te=O=>{m&&!(O.relatedTarget instanceof Node&&o.contains(O.relatedTarget))&&ke()},ee=()=>{se(s,r.label),s.hidden=!r.label;let O=r.options.find(ie=>ie.id===r.value);se(d,O?.label??r.placeholder??"Select"),d.dataset.empty=O?"false":"true",a.disabled=!!r.disabled,m&&te()};return a.addEventListener("click",me),a.addEventListener("keydown",H),b.addEventListener("keydown",v),L.addEventListener("input",A),o.addEventListener("focusout",Te),ee(),{update:O=>{r={...r,...O},ee()},dispose:()=>{ke(),a.removeEventListener("click",me),a.removeEventListener("keydown",H),b.removeEventListener("keydown",v),L.removeEventListener("input",A),o.removeEventListener("focusout",Te),o.remove()}}};var Sl=(e,t,r)=>{J(q);let n=t,o=Ie("oc-sdk oc-sdk-check");o.setAttribute("role",r);let s=w("span",r==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");r==="checkbox"&&s.append(We("check",12));let a=w("span","oc-sdk-check-text"),d=w("span","oc-sdk-check-label"),c=w("span","oc-sdk-check-desc");a.append(d,c),o.append(s,a),e.append(o);let h=()=>{o.setAttribute("aria-checked",n.checked?"true":"false"),o.disabled=!!n.disabled,se(d,n.label),se(c,n.description),c.hidden=!n.description},m=()=>{n.disabled||n.onChange(!n.checked)};return o.addEventListener("click",m),h(),{update:b=>{n={...n,...b},h()},dispose:()=>{o.removeEventListener("click",m),o.remove()}}},Dr=(e,t)=>Sl(e,t,"checkbox");var Gr=(e,t)=>{J(q);let r=t,n=w("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let o=()=>{Qe(n),n.dataset.track=r.trackBackground?"true":"false";for(let a of r.items){let d=Ie("oc-sdk-tab");d.setAttribute("role","tab");let c=a.id===r.activeId;d.setAttribute("aria-selected",c?"true":"false"),d.tabIndex=c?0:-1,d.dataset.id=a.id;let h=w("span");if(h.textContent=a.label,d.append(h),a.count!==void 0){let m=w("span","oc-sdk-tab-count");m.textContent=String(a.count),d.append(m)}d.addEventListener("click",()=>{a.id!==r.activeId&&r.onChange(a.id)}),n.append(d)}},s=a=>{let d=Ve(a,"horizontal");if(!d)return;let c=tt(r.items,r.activeId,d);if(c&&c!==r.activeId){a.preventDefault(),r.onChange(c);let h=n.querySelector(`[data-id="${CSS.escape(c)}"]`);h instanceof HTMLElement&&h.focus()}};return n.addEventListener("keydown",s),o(),{update:a=>{r={...r,...a},o()},dispose:()=>{n.removeEventListener("keydown",s),n.remove()}}};var Xt=(e,t)=>{J(q);let r=t,n=w("div","oc-sdk oc-sdk-empty"),o=w("h2","oc-sdk-empty-title"),s=w("p","oc-sdk-empty-body"),a=w("div","oc-sdk-empty-action");n.append(o,s,a),e.append(n);let d=null,c=()=>{if(se(o,r.title),se(s,r.body),s.hidden=!r.body,a.hidden=!r.action,!r.action){d?.dispose(),d=null;return}let h={label:r.action.label,onClick:r.action.onClick};d?d.update(h):d=_e(a,{...h,variant:"outline",size:"sm"})};return c(),{update:h=>{r={...r,...h},c()},dispose:()=>{d?.dispose(),d=null,n.remove()}}};var $r=(e,t={})=>{J(q);let r=t,n=w("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let o=w("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=w("span");n.append(o,s),e.append(n);let a=()=>{n.dataset.size=r.size??"default",se(s,r.label),s.hidden=!r.label,n.setAttribute("aria-label",r.label??"Loading")};return a(),{update:d=>{r={...r,...d},a()},dispose:()=>{n.remove()}}};var Hr=(e,t)=>{J(q);let r=t,n=w("div","oc-sdk oc-sdk-banner"),o=w("div","oc-sdk-banner-text"),s=w("div","oc-sdk-banner-title"),a=w("div","oc-sdk-banner-body"),d=w("div","oc-sdk-banner-action");o.append(s,a),n.append(o,d),e.append(n);let c=null,h=()=>{if(n.dataset.tone=r.tone,n.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),se(s,r.title),se(a,r.body),a.hidden=!r.body,d.hidden=!r.action,!r.action){c?.dispose(),c=null;return}let m={label:r.action.label,onClick:r.action.onClick};c?c.update(m):c=_e(d,{...m,variant:"outline",size:"xs"})};return h(),{update:m=>{r={...r,...m},h()},dispose:()=>{c?.dispose(),c=null,n.remove()}}};var ai=e=>e.filter(t=>!("separator"in t)),wl=0,lo=(e,t)=>{J(q);let r=t,n=`oc-sdk-menu-${wl+=1}`,o=w("div","oc-sdk oc-sdk-menu");e.append(o);let s=w("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let a=null,d=null,c=_e(o,{label:r.label,variant:r.variant,size:r.size,onClick:()=>{a?_():L()}}),h=o.querySelector("button");h?.setAttribute("aria-haspopup","menu");let m=C=>{d=C,Mr(s,s,n,C)},b=()=>{Qe(s);for(let C of r.items){if("separator"in C){let te=w("div","oc-sdk-separator");te.dataset.labeled="false",s.append(te);continue}s.append(Pr(n,"menuitem",C,{hover:()=>m(C.id),pick:()=>N(C.id)}))}m(ai(r.items).some(C=>C.id===d)?d:null)},_=()=>{let C=a;a=null,C?.(),d=null,h?.setAttribute("aria-expanded","false")},L=()=>{a||!h||(b(),a=Ur(o,h,s,_),h.setAttribute("aria-expanded","true"),s.focus())},N=C=>{_(),h?.focus(),r.onSelect(C)},K=C=>{let te=Ve(C);te?(C.preventDefault(),m(tt(ai(r.items),d,te))):C.key==="Enter"||C.key===" "?(C.preventDefault(),d&&N(d)):C.key==="Escape"&&(C.preventDefault(),_(),h?.focus())},de=C=>{a&&!(C.relatedTarget instanceof Node&&o.contains(C.relatedTarget))&&_()};return s.addEventListener("keydown",K),o.addEventListener("focusout",de),{update:C=>{r={...r,...C},c.update({label:r.label,variant:r.variant,size:r.size}),a&&b()},dispose:()=>{_(),s.removeEventListener("keydown",K),o.removeEventListener("focusout",de),c.dispose(),o.remove()}}};var Al="https://kaneo.qubitquilt.dev",li=Al.replace(/\/api\/?$/,""),ci="kaneo",co=100,di=["no-priority","low","medium","high","urgent"];var pi={"no-priority":0,low:1,medium:2,high:3,urgent:4};var ut=class extends Error{status;code;constructor(t,r,n){super(n),this.name="KaneoError",this.status=t,this.code=r}};function vl(e){if(!e)return;let t={};for(let[r,n]of Object.entries(e))n==null||n===""||(t[r]=String(n));return Object.keys(t).length>0?t:void 0}function Rl(e,t){let r=typeof t=="object"&&t!==null?t:{},n=typeof r.message=="string"&&r.message?r.message:`Kaneo answered ${e}.`;return new ut(e,r.code??`HTTP_${e}`,n)}var Ol=10,Il=2,Cl=800;function ui(e){async function t({method:n,path:o,query:s,body:a}){let d=vl(s),c="/api"+o,h;for(let _=0;h=await e({method:n,path:c,...d?{query:d}:{},...a===void 0?{}:{body:JSON.stringify(a)}}),!(h.status!==429||_>=Il);_+=1)await new Promise(L=>setTimeout(L,Cl*2**_));let m=h,b;if(m.body)try{b=JSON.parse(m.body)}catch{throw m.status>=400?new ut(m.status,"INVALID_RESPONSE",m.body.slice(0,400)):new ut(m.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(m.status>=400)throw Rl(m.status,b);return b}async function r(n){let o=encodeURIComponent(n),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:co}}),a=s.data,d=s.pagination,c=1;for(;c<Math.min(d.totalPages,Ol);){c+=1;let h=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:c,limit:co}});for(let m of h.data.columns){let b=a.columns.find(_=>_.id===m.id);b&&b.tasks.push(...m.tasks)}a.archivedTasks.push(...h.data.archivedTasks),a.plannedTasks.push(...h.data.plannedTasks)}return{board:a,pagination:d,truncated:d.totalPages>c}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(n,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:n,includeArchived:o?"true":void 0}}),getBoard:r,getTask:n=>t({method:"GET",path:`/task/${encodeURIComponent(n)}`,query:{view:"detail"}}),getTaskByTicketId:(n,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(n)}`,query:{workspaceId:o}}),listAssignedTasks:n=>t({method:"GET",path:"/task/assigned",query:{workspaceId:n}}),search:(n,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:n,projectId:s.projectId,limit:s.limit??30}}),listLabels:n=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(n)}`}),listColumns:n=>t({method:"GET",path:`/column/${encodeURIComponent(n)}`}),listComments:n=>t({method:"GET",path:`/comment/${encodeURIComponent(n)}`}),createComment:(n,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(n)}`,body:{content:o}}),createTask:(n,o)=>t({method:"POST",path:`/task/${encodeURIComponent(n)}`,body:o}),updateTaskStatus:(n,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(n)}`,body:{status:o}}),updateTaskPriority:(n,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(n)}`,body:{priority:o}})}}function Ll(e,t){this.v=e,this.k=t}function fi(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function Nl(e){if(Array.isArray(e))return e}function Pl(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,o,s,a,d=[],c=!0,h=!1;try{if(s=(r=r.call(e)).next,t===0){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=s.call(r)).done)&&(d.push(n.value),d.length!==t);c=!0);}catch(m){h=!0,o=m}finally{try{if(!c&&r.return!=null&&(a=r.return(),Object(a)!==a))return}finally{if(h)throw o}}return d}}function Ml(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ul(e,t){return Nl(e)||Pl(e,t)||Dl(e,t)||Ml()}function Dl(e,t){if(e){if(typeof e=="string")return fi(e,t);var r={}.toString.call(e).slice(8,-1);return r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set"?Array.from(e):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?fi(e,t):void 0}}function Fr(e){var t,r;function n(s,a){try{var d=e[s](a),c=d.value,h=c instanceof Ll;Promise.resolve(h?c.v:c).then(function(m){if(h){var b=s==="return"&&c.k?s:"next";if(!c.k||m.done)return n(b,m);m=e[b](m).value}o(!!d.done,m)},function(m){n("throw",m)})}catch(m){o(2,m)}}function o(s,a){s===2?t.reject(a):t.resolve({value:a,done:s}),(t=t.next)?n(t.key,t.arg):r=null}this._invoke=function(s,a){return new Promise(function(d,c){var h={key:s,arg:a,resolve:d,reject:c,next:null};r?r=r.next=h:(t=r=h,n(s,a))})},typeof e.return!="function"&&(this.return=void 0)}Fr.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},Fr.prototype.next=function(e){return this._invoke("next",e)},Fr.prototype.throw=function(e){return this._invoke("throw",e)},Fr.prototype.return=function(e){return this._invoke("return",e)};var Ri=Object.entries,mi=Object.setPrototypeOf,Gl=Object.isFrozen,Oi=Object.getPrototypeOf,Ii=Object.getOwnPropertyDescriptor,ge=Object.freeze,Ee=Object.seal,Ct=Object.create,Ci=typeof Reflect<"u"&&Reflect,Eo=Ci.apply,To=Ci.construct;ge||(ge=function(t){return t});Ee||(Ee=function(t){return t});Eo||(Eo=function(t,r){for(var n=arguments.length,o=new Array(n>2?n-2:0),s=2;s<n;s++)o[s-2]=arguments[s];return t.apply(r,o)});To||(To=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return new t(...n)});var Ke=Q(Array.prototype.forEach);Array.prototype.indexOf;var $l=Q(Array.prototype.lastIndexOf),hi=Q(Array.prototype.pop),Wt=Q(Array.prototype.push),Hl=Q(Array.prototype.slice),Fl=Q(Array.prototype.splice),Lt=Array.isArray,po=Li(Set),uo=Q(Set.prototype.add),Vt=Q(Set.prototype.has),ft=Q(String.prototype.toLowerCase),fo=Q(String.prototype.toString),gi=Q(String.prototype.match),Kt=Q(String.prototype.replace),ki=Q(String.prototype.indexOf),zl=Q(String.prototype.trim),Bl=Q(Number.prototype.toString),jl=Q(Boolean.prototype.toString),xi=typeof BigInt>"u"?null:Q(BigInt.prototype.toString),bi=typeof Symbol>"u"?null:Q(Symbol.prototype.toString),ve=Q(Object.prototype.hasOwnProperty),Yt=Q(Object.prototype.toString),be=Q(RegExp.prototype.test),Ye=Li(TypeError);function Q(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return Eo(e,t,n)}}function Li(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return To(e,r)}}function G(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ft;if(mi&&mi(e,null),!Lt(t))return e;let n=t.length;for(;n--;){let o=t[n];if(typeof o=="string"){let s=r(o);s!==o&&(Gl(t)||(t[n]=s),o=s)}e[o]=!0}return e}function Xl(e){for(let t=0;t<e.length;t++)ve(e,t)||(e[t]=null);return e}function Ce(e){let t=Ct(null);for(let n of Ri(e)){var r=Ul(n,2);let o=r[0],s=r[1];ve(e,o)&&(Lt(s)?t[o]=Xl(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Ce(s):t[o]=s)}return t}function Wl(e){switch(typeof e){case"string":return e;case"number":return Bl(e);case"boolean":return jl(e);case"bigint":return xi?xi(e):"0";case"symbol":return bi?bi(e):"Symbol()";case"undefined":return Yt(e);case"function":case"object":{if(e===null)return Yt(e);let t=e,r=Pe(t,"toString");if(typeof r=="function"){let n=r(t);return typeof n=="string"?n:Yt(n)}return Yt(e)}default:return Yt(e)}}function Pe(e,t){for(;e!==null;){let n=Ii(e,t);if(n){if(n.get)return Q(n.get);if(typeof n.value=="function")return Q(n.value)}e=Oi(e)}function r(){return null}return r}function Vl(e,t){for(;e!==null;){let r=Ii(e,t);if(r)return r.get?Q(r.get):null;e=Oi(e)}return null}function Kl(e){try{return be(e,""),!0}catch{return!1}}var Ei=ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),mo=ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ho=ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yl=ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),go=ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ql=ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ti=ge(["#text"]),_i=ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),ko=ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Si=ge(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),zr=ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Jl=Ee(/{{[\w\W]*|^[\w\W]*}}/g),Zl=Ee(/<%[\w\W]*|^[\w\W]*%>/g),Ql=Ee(/\${[\w\W]*/g),ec=Ee(/^data-[\-\w.\u00B7-\uFFFF]+$/),tc=Ee(/^aria-[\-\w]+$/),yi=Ee(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),rc=Ee(/^(?:\w+script|data):/i),nc=Ee(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),oc=Ee(/^html$/i),sc=Ee(/^[a-z][.\w]*(-[.\w]+)+$/i),xo=Ee(/<[/\w!]/g),wi=Ee(/<[/\w]/g),ic=Ee(/<\/no(script|embed|frames)/i),Ai=Ee(/\/>/i),ce={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ac=ge(G({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),lc=function(){return typeof window>"u"?null:window},cc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,o="data-tt-policy-suffix";r&&r.hasAttribute(o)&&(n=r.getAttribute(o));let s="dompurify"+(n?"#"+n:"");try{return t.createPolicy(s,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},vi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},rt=function(t,r,n,o){return ve(t,r)&&Lt(t[r])?G(o.base?Ce(o.base):{},t[r],o.transform):n},bo=function(t,r,n){let o=ve(t,r)?t[r]:void 0;return o&&typeof o=="object"?Ce(o):n()};function Ni(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:lc(),t=x=>Ni(x);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ce.document||!e.Element)return t.isSupported=!1,t;let r=e.document,n=r,o=n.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,a=e.Node,d=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let h=e.DOMParser,m=e.trustedTypes,b=d.prototype,_=Pe(b,"cloneNode"),L=Pe(b,"remove"),N=Pe(b,"removeAttributeNode"),K=Pe(b,"nextSibling"),de=Pe(b,"childNodes"),C=Pe(b,"parentNode"),te=Pe(b,"shadowRoot"),ke=Pe(b,"attributes"),le=a&&a.prototype?Pe(a.prototype,"nodeType"):null,fe=a&&a.prototype?Pe(a.prototype,"nodeName"):null,me=a&&a.prototype?Pe(a.prototype,"ownerDocument"):null,H=function(i){return le?le(i):i.nodeType},v=function(i){return fe?fe(i):i.nodeName},A=Vl(b,"namespaceURI"),Te=function(i){return A?A(i):i.namespaceURI};if(typeof s=="function"){let x=r.createElement("template");x.content&&x.content.ownerDocument&&(r=x.content.ownerDocument)}let ee,O="",ie,Pt=!1,he=0,re=function(){if(he>0)throw Ye('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Be=function(i){re(),he++;try{return ee.createHTML(i)}finally{he--}},xe=function(i){re(),he++;try{return ee.createScriptURL(i)}finally{he--}},ne=function(){return Pt||(ie=cc(m,o),Pt=!0),ie},Y=r,st=Y.implementation,Mt=Y.createNodeIterator,sr=Y.createDocumentFragment,ir=Y.getElementsByTagName,bt=n.importNode,F=vi();t.isSupported=typeof Ri=="function"&&typeof C=="function"&&st&&st.createHTMLDocument!==void 0;let ar=Jl,lr=Zl,cr=Ql,Re=ec,Ut=tc,Dt=rc,dr=nc,Et=sc,Gt=yi,V=null,l=G({},[...Ei,...mo,...ho,...go,...Ti]),u=null,S=G({},[..._i,...ko,...Si,...zr]),T=Object.seal(Ct(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,W=null,X=Object.seal(Ct(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),jo=!0,rn=!0,Xo=!1,nn=!0,je=!1,it=!0,at=!1,on=!1,pr=null,ur=null,sn=!1,Tt=!1,fr=!1,mr=!1,Wo=!0,Vo=!1,Ko="user-content-",an=!0,ln=!1,lt=null,_t={},ct=null,Yo=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),qo=null,Jo=G({},["audio","video","img","source","image","track"]),Zo=null,Qo=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),hr="http://www.w3.org/1998/Math/MathML",gr="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",St=He,cn=!1,dn=null,$a=G({},[hr,gr,He],fo),es=ge(["mi","mo","mn","ms","mtext"]),pn=G({},es),ts=ge(["annotation-xml"]),un=G({},ts),Ha=G({},["title","style","font","a","script"]),$t=null,Fa=["application/xhtml+xml","text/html"],za="text/html",ae=null,yt=null,Ba=r.createElement("form"),rs=function(i){return i instanceof RegExp||i instanceof Function},fn=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(yt&&yt===i)return;(!i||typeof i!="object")&&(i={}),i=Ce(i),$t=Fa.indexOf(i.PARSER_MEDIA_TYPE)===-1?za:i.PARSER_MEDIA_TYPE,ae=$t==="application/xhtml+xml"?fo:ft,V=rt(i,"ALLOWED_TAGS",l,{transform:ae}),u=rt(i,"ALLOWED_ATTR",S,{transform:ae}),dn=rt(i,"ALLOWED_NAMESPACES",$a,{transform:fo}),Zo=rt(i,"ADD_URI_SAFE_ATTR",Qo,{transform:ae,base:Qo}),qo=rt(i,"ADD_DATA_URI_TAGS",Jo,{transform:ae,base:Jo}),ct=rt(i,"FORBID_CONTENTS",Yo,{transform:ae}),z=rt(i,"FORBID_TAGS",Ce({}),{transform:ae}),W=rt(i,"FORBID_ATTR",Ce({}),{transform:ae}),_t=ve(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Ce(i.USE_PROFILES):i.USE_PROFILES:!1,jo=i.ALLOW_ARIA_ATTR!==!1,rn=i.ALLOW_DATA_ATTR!==!1,Xo=i.ALLOW_UNKNOWN_PROTOCOLS||!1,nn=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,je=i.SAFE_FOR_TEMPLATES||!1,it=i.SAFE_FOR_XML!==!1,at=i.WHOLE_DOCUMENT||!1,Tt=i.RETURN_DOM||!1,fr=i.RETURN_DOM_FRAGMENT||!1,mr=i.RETURN_TRUSTED_TYPE||!1,sn=i.FORCE_BODY||!1,Wo=i.SANITIZE_DOM!==!1,Vo=i.SANITIZE_NAMED_PROPS||!1,an=i.KEEP_CONTENT!==!1,ln=i.IN_PLACE||!1,Gt=Kl(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:yi,St=typeof i.NAMESPACE=="string"?i.NAMESPACE:He,pn=bo(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>G({},es)),un=bo(i,"HTML_INTEGRATION_POINTS",()=>G({},ts));let p=bo(i,"CUSTOM_ELEMENT_HANDLING",()=>Ct(null));if(T=Ct(null),ve(p,"tagNameCheck")&&rs(p.tagNameCheck)&&(T.tagNameCheck=p.tagNameCheck),ve(p,"attributeNameCheck")&&rs(p.attributeNameCheck)&&(T.attributeNameCheck=p.attributeNameCheck),ve(p,"allowCustomizedBuiltInElements")&&typeof p.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=p.allowCustomizedBuiltInElements),Ee(T),je&&(rn=!1),fr&&(Tt=!0),_t&&(V=G({},Ti),u=Ct(null),_t.html===!0&&(G(V,Ei),G(u,_i)),_t.svg===!0&&(G(V,mo),G(u,ko),G(u,zr)),_t.svgFilters===!0&&(G(V,ho),G(u,ko),G(u,zr)),_t.mathMl===!0&&(G(V,go),G(u,Si),G(u,zr))),X.tagCheck=null,X.attributeCheck=null,ve(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?X.tagCheck=i.ADD_TAGS:Lt(i.ADD_TAGS)&&(V===l&&(V=Ce(V)),G(V,i.ADD_TAGS,ae))),ve(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?X.attributeCheck=i.ADD_ATTR:Lt(i.ADD_ATTR)&&(u===S&&(u=Ce(u)),G(u,i.ADD_ATTR,ae))),ve(i,"ADD_FORBID_CONTENTS")&&Lt(i.ADD_FORBID_CONTENTS)&&(ct===Yo&&(ct=Ce(ct)),G(ct,i.ADD_FORBID_CONTENTS,ae)),an&&(V["#text"]=!0),at&&G(V,["html","head","body"]),V.table&&(G(V,["tbody"]),delete z.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ye('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ye('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let g=ee;ee=i.TRUSTED_TYPES_POLICY;try{O=Be("")}catch(k){throw ee=g,k}}else i.TRUSTED_TYPES_POLICY===null?(ee=void 0,O=""):(ee===void 0&&(ee=ne()),ee&&typeof O=="string"&&(O=Be("")));ge&&ge(i),yt=i},ns=G({},[...mo,...ho,...Yl]),os=G({},[...go,...ql]),ja=function(i,p,g){return p.namespaceURI===He?i==="svg":p.namespaceURI===hr?i==="svg"&&(g==="annotation-xml"||pn[g]):!!ns[i]},Xa=function(i,p,g){return p.namespaceURI===He?i==="math":p.namespaceURI===gr?i==="math"&&un[g]:!!os[i]},Wa=function(i,p,g){return p.namespaceURI===gr&&!un[g]||p.namespaceURI===hr&&!pn[g]?!1:!os[i]&&(Ha[i]||!ns[i])},Va=function(i){let p=Te(i),g=ft(v(i)),k=C(i),y,I;return k&&H(k)===ce.element?(y={namespaceURI:Te(k)},I=ft(v(k))):(y={namespaceURI:St},I="template"),dn[p]?p===gr?ja(g,y,I):p===hr?Xa(g,y,I):p===He?Wa(g,y,I):!!($t==="application/xhtml+xml"&&dn[p]):!1},qe=function(i){Wt(t.removed,{element:i});try{C(i).removeChild(i)}catch{if(L(i),!C(i))throw Ye("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},ss=function(i,p,g){try{N(i,p)}catch{try{i.removeAttribute(g)}catch{}}},mn=function(i){gn(i);let p=de(i);p&&Ke(Hl(p),k=>{try{L(k)}catch{}});let g=H(i)===ce.element?ke(i):null;if(g)for(let k=g.length-1;k>=0;--k){let y=g[k],I=y&&y.name;typeof I=="string"&&ss(i,y,I)}},wt=function(i,p,g){if(!g)try{g=p.getAttributeNode(i)}catch{g=null}Wt(t.removed,{attribute:g||null,from:p});try{g?N(p,g):p.removeAttribute(i)}catch{try{p.removeAttribute(i)}catch{}}if(i==="is")if(Tt||fr)try{qe(p)}catch{}else try{p.setAttribute(i,"")}catch{}},is=function(i){let p=ke(i);if(p)for(let g=p.length-1;g>=0;--g){let k=p[g],y=k&&k.name;typeof y!="string"||u[ae(y)]||ss(i,k,y)}},hn=function(i,p){let g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,k=[i];for(;k.length>0;){let y=k.pop();if(p(y)===!1)continue;if(g&&H(y)===ce.element){let M=te(y);Je(M)&&k.push(M)}let I=de(y);if(I)for(let M=I.length-1;M>=0;--M)k.push(I[M])}},gn=function(i){hn(i,p=>{H(p)===ce.element&&is(p)})},kn=function(i){let p=[];return hn(i,g=>{p.push(g)},!0),p},Ka=function(i,p){let g=po();Ke(kn(i),k=>{H(k)===ce.element&&uo(g,k)}),Ke(p,k=>{H(k)===ce.element&&!Vt(g,k)&&is(k)})},as=function(i,p){let g=!1;return Ke(t.removed,k=>{k.element&&(g=g||k.element===i,gn(k.element))}),Ka(i,p),g},Ya=8,qa=function(i,p){let g=lt,k=null,y=()=>(k||(k=po(),Ke(p,I=>{uo(k,I)})),k);for(let I=0;;I++){let M=kn(i),pe=[i],Fe=!1;if(Ke(M,Se=>{H(Se)===ce.documentFragment?Wt(pe,Se):!Fe&&!Vt(g,Se)&&(Fe=Vt(y(),Se))}),!Fe)return;if(I>=Ya)throw Ye("the tree kept changing during in-place sanitization; refusing to return it");Ke(pe,(Se,we)=>{Ja(Se,we>0,i,y())})}},Ja=function(i,p,g,k){let y=xn(i),I;for(;I=y.nextNode();)!Vt(k,I)||Vt(lt,I)||(p&&De(F.uponSanitizeShadowNode,I,null),En(I,g),Tn(I,g),Je(I.content)&&Ft(I.content))},Za=function(i){lt&&uo(lt,i)},ls=function(i,p){return it?i==="patchsrc"?!0:i==="for"&&p!=="label"&&p!=="output":!1},Qa=function(i){it&&hn(i,p=>{let g=H(p);if(g===ce.processingInstruction||g===ce.comment&&be(wi,p.data)){try{L(p)}catch{}return!1}if(g===ce.element){let k=p,y=ae(v(p));try{k.hasAttribute&&k.hasAttribute("patchsrc")&&k.removeAttribute("patchsrc"),k.hasAttribute&&k.hasAttribute("for")&&ls("for",y)&&k.removeAttribute("for")}catch{}}return!0})},cs=function(i){let p=null,g=null;if(sn)i="<remove></remove>"+i;else{let I=gi(i,/^[\r\n\t ]+/);g=I&&I[0]}$t==="application/xhtml+xml"&&St===He&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");let k=ee?Be(i):i;if(St===He)try{p=new h().parseFromString(k,$t)}catch{}if(!p||!p.documentElement){p=st.createDocument(St,"template",null);try{p.documentElement.innerHTML=cn?O:k}catch{}}let y=p.body||p.documentElement;return i&&g&&y.insertBefore(r.createTextNode(g),y.childNodes[0]||null),St===He?ir.call(p,at?"html":"body")[0]:at?p.documentElement:y},xn=function(i){let p=me?me(i):i.ownerDocument;return Mt.call(p||i,i,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},kr=function(i){return i=Kt(i,ar," "),i=Kt(i,lr," "),i=Kt(i,cr," "),i},bn=function(i){var p;ds(i);let g=(p=i.querySelectorAll)===null||p===void 0?void 0:p.call(i,"template");g&&Ke(g,k=>{Je(k.content)&&bn(k.content)})},ds=function(i){i.normalize();let p=me?me(i):i.ownerDocument,g=Mt.call(p||i,i,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),k=g.nextNode();for(;k;)k.data=kr(k.data),k=g.nextNode()},xr=function(i){let p=fe?fe(i):null;return typeof p!="string"||ae(p)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==ke(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==le(i)||i.childNodes!==de(i)},Je=function(i){if(!le||typeof i!="object"||i===null)return!1;try{return le(i)===ce.documentFragment}catch{return!1}},Ht=function(i){if(!le||typeof i!="object"||i===null)return!1;try{return typeof le(i)=="number"}catch{return!1}};function De(x,i,p){x.length!==0&&Ke(x,g=>{g.call(t,i,p,yt)})}let el=function(i,p){return!!(it&&i.hasChildNodes()&&!Ht(i.firstElementChild)&&be(xo,i.textContent)&&be(xo,i.innerHTML)||it&&ac[p]&&H(i)===ce.element&&Te(i)===He&&(Ht(i.firstElementChild)||typeof i.textContent=="string"&&be(xo,i.textContent))||i.nodeType===ce.processingInstruction||it&&i.nodeType===ce.comment&&be(wi,i.data))},br=function(i,p){if(i instanceof RegExp)return be(i,p);if(i instanceof Function){for(var g=arguments.length,k=new Array(g>2?g-2:0),y=2;y<g;y++)k[y-2]=arguments[y];return!!i(p,...k)}return!1},tl=function(i,p,g){if(!z[p]&&fs(p)&&br(T.tagNameCheck,p))return!1;if(an&&!ct[p]&&!ct[ft(p)]){let k=C(i),y=de(i);if(y&&k){let I=y.length;for(let M=I-1;M>=0;--M){let pe=i===g?_(y[M],!0):y[M];k.insertBefore(pe,K(i))}}}return qe(i),!0},ps=function(i,p,g,k){return i.length===0?p:p===g||p===k?Ce(p):p},At=function(i,p){return i===p||C(i)!==null?!1:(ln&&gn(i),!0)},En=function(i,p){if(Za(i),De(F.beforeSanitizeElements,i,null),At(i,p))return!0;if(xr(i))return qe(i),!0;let g=ae(v(i));if(V=ps(F.uponSanitizeElement,V,l,pr),De(F.uponSanitizeElement,i,{tagName:g,allowedTags:V}),At(i,p))return!0;if(el(i,g))return qe(i),!0;if(z[g]||!(X.tagCheck instanceof Function&&X.tagCheck(g))&&!V[g]){let k=tl(i,g,p);return k===!1&&(De(F.afterSanitizeElements,i,null),At(i,p))?!0:k}if(H(i)===ce.element&&!Va(i)||(g==="noscript"||g==="noembed"||g==="noframes")&&be(ic,i.innerHTML))return qe(i),!0;if(je&&i.nodeType===ce.text){let k=kr(i.textContent);i.textContent!==k&&(Wt(t.removed,{element:i.cloneNode()}),i.textContent=k)}return De(F.afterSanitizeElements,i,null),At(i,p)},us=function(i,p,g){if(W[p]||ls(p,i)||Wo&&(p==="id"||p==="name")&&(g in r||g in Ba))return!1;let k=u[p]||X.attributeCheck instanceof Function&&X.attributeCheck(p,i);return rn&&be(Re,p)||jo&&be(Ut,p)?!0:k?Zo[p]||be(Gt,Kt(g,dr,""))||(p==="src"||p==="xlink:href"||p==="href")&&i!=="script"&&ki(g,"data:")===0&&qo[i]||Xo&&!be(Dt,Kt(g,dr,""))?!0:!g:fs(i)&&br(T.tagNameCheck,i)&&br(T.attributeNameCheck,p,i)||p==="is"&&T.allowCustomizedBuiltInElements&&br(T.tagNameCheck,g)},rl=G({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),fs=function(i){return!rl[ft(i)]&&be(Et,i)},nl=function(i,p,g,k){if(ee&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!g)switch(m.getAttributeType(i,p)){case"TrustedHTML":return Be(k);case"TrustedScriptURL":return xe(k)}return k},ol=function(i,p,g,k){try{return g?i.setAttributeNS(g,p,k):i.setAttribute(p,k),xr(i)?(qe(i),!1):!0}catch{return wt(p,i),!1}},ms=function(i,p){return it&&be(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,p)?!0:ft(i)==="attributename"&&gi(p,"href")!==null},Tn=function(i,p){if(De(F.beforeSanitizeAttributes,i,null),At(i,p))return;let g=i.attributes;if(!g||xr(i))return;u=ps(F.uponSanitizeAttribute,u,S,ur);let k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},y=g.length,I=ae(i.nodeName);for(;y--;){let M=g[y],pe=M.name,Fe=M.namespaceURI,Se=M.value,we=ae(pe),vt=Se,Ae=pe==="value"?vt:zl(vt),hs=!1;if(k.attrName=we,k.attrValue=Ae,k.keepAttr=!0,k.forceKeepAttr=void 0,De(F.uponSanitizeAttribute,i,k),Ae=k.attrValue,Vo&&(we==="id"||we==="name")&&ki(Ae,Ko)!==0&&(wt(pe,i,M),Ae=Ko+Ae,hs=!0),ms(pe,Ae)){wt(pe,i,M);continue}if(!k.forceKeepAttr){if(!k.keepAttr){wt(pe,i,M);continue}if(!nn&&be(Ai,Ae)){wt(pe,i,M);continue}if(je&&(Ae=kr(Ae)),!us(I,we,Ae)){wt(pe,i,M);continue}Ae=nl(I,we,Fe,Ae),Ae!==vt&&ol(i,pe,Fe,Ae)&&hs&&hi(t.removed)}}De(F.afterSanitizeAttributes,i,null),At(i,p)},Ft=function(i){let p=null,g=xn(i);for(De(F.beforeSanitizeShadowDOM,i,null);p=g.nextNode();)if(De(F.uponSanitizeShadowNode,p,null),En(p,i),Tn(p,i),Je(p.content)&&Ft(p.content),H(p)===ce.element){let k=te(p);Je(k)&&(_n(k),Ft(k))}je&&ds(i),De(F.afterSanitizeShadowDOM,i,null)},_n=function(i){let p=[{node:i,shadow:null}];for(;p.length>0;){let g=p.pop();if(g.shadow){Ft(g.shadow);continue}let k=g.node,y=H(k)===ce.element,I=de(k);if(I)for(let M=I.length-1;M>=0;--M)p.push({node:I[M],shadow:null});if(y){let M=fe?fe(k):null;if(typeof M=="string"&&ae(M)==="template"){let pe=k.content;Je(pe)&&p.push({node:pe,shadow:null})}}if(y){let M=te(k);Je(M)&&p.push({node:null,shadow:M},{node:M,shadow:null})}}};return t.sanitize=function(x){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,g=null,k=null,y=null;if(cn=!x,cn&&(x="<!-->"),typeof x!="string"&&!Ht(x)&&(x=Wl(x),typeof x!="string"))throw Ye("dirty is not a string, aborting");if(!t.isSupported)return x;on?(V=pr,u=ur):fn(i),(F.uponSanitizeElement.length>0||F.uponSanitizeAttribute.length>0)&&(V=Ce(V)),F.uponSanitizeAttribute.length>0&&(u=Ce(u)),t.removed=[];let I=ln&&typeof x!="string"&&Ht(x),M=[],pe=lt;if(I){Qa(x);let we=v(x);if(typeof we=="string"){let vt=ae(we);if(!V[vt]||z[vt])throw mn(x),Ye("root node is forbidden and cannot be sanitized in-place")}if(xr(x))throw mn(x),Ye("root node is clobbered and cannot be sanitized in-place");M=kn(x),lt=po()}else if(Ht(x))p=cs("<!---->"),g=p.ownerDocument.importNode(x,!0),g.nodeType===ce.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?p=g:p.appendChild(g),_n(p);else{if(!Tt&&!je&&!at&&x.indexOf("<")===-1)return ee&&mr?Be(x):x;if(p=cs(x),!p)return Tt?null:mr?O:""}p&&sn&&qe(p.firstChild);let Fe=I?x:p;try{I&&_n(x);let we=xn(Fe);for(;k=we.nextNode();)En(k,Fe),Tn(k,Fe),Je(k.content)&&Ft(k.content);I&&qa(x,M)}catch(we){throw I&&(mn(x),as(x,M)),we}finally{lt=pe}if(I){if(as(x,M))throw Ye("a node selected for removal could not be safely returned; refusing to sanitize in place");return je&&bn(x),x}if(Tt){if(je&&bn(p),fr)for(y=sr.call(p.ownerDocument);p.firstChild;)y.appendChild(p.firstChild);else y=p;return(u.shadowroot||u.shadowrootmode)&&(y=bt.call(n,y,!0)),y}let Se=at?p.outerHTML:p.innerHTML;return at&&V["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&be(oc,p.ownerDocument.doctype.name)&&(Se="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+Se),je&&(Se=kr(Se)),ee&&mr?Be(Se):Se},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};fn(x),on=!0,pr=V,ur=u},t.clearConfig=function(){yt=null,on=!1,pr=null,ur=null,ee=ie,O=""},t.isValidAttribute=function(x,i,p){yt||fn({});let g=ae(x),k=ae(i);return typeof p=="string"&&(ms(i,p)||!nn&&be(Ai,p))?!1:us(g,k,p)},t.addHook=function(x,i){typeof i=="function"&&ve(F,x)&&Wt(F[x],i)},t.removeHook=function(x,i){if(ve(F,x)){if(i!==void 0){let p=$l(F[x],i);return p===-1?void 0:Fl(F[x],p,1)[0]}return hi(F[x])}},t.removeHooks=function(x){ve(F,x)&&(F[x]=[])},t.removeAllHooks=function(){F=vi()},t}var Pi=Ni();function wo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ht=wo();function Fi(e){ht=e}var Qt={exec:()=>null};function $(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(o,s)=>{let a=typeof s=="string"?s:s.source;return a=a.replace(ye.caret,"$1"),r=r.replace(o,a),n},getRegex:()=>new RegExp(r,t)};return n}var dc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},pc=/^(?:[ \t]*(?:\n|$))+/,uc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,er=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,mc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ao=/(?:[*+-]|\d{1,9}[.)])/,zi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Bi=$(zi).replace(/bull/g,Ao).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),hc=$(zi).replace(/bull/g,Ao).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),vo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,gc=/^[^\n]+/,Ro=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kc=$(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ro).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xc=$(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ao).getRegex(),Vr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Oo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bc=$("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Oo).replace("tag",Vr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ji=$(vo).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vr).getRegex(),Ec=$(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ji).getRegex(),Io={blockquote:Ec,code:uc,def:kc,fences:fc,heading:mc,hr:er,html:bc,lheading:Bi,list:xc,newline:pc,paragraph:ji,table:Qt,text:gc},Mi=$("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vr).getRegex(),Tc={...Io,lheading:hc,table:Mi,paragraph:$(vo).replace("hr",er).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Mi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Vr).getRegex()},_c={...Io,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Oo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(vo).replace("hr",er).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Bi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Sc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,yc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xi=/^( {2,}|\\)\n(?!\s*$)/,wc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Kr=/[\p{P}\p{S}]/u,Co=/[\s\p{P}\p{S}]/u,Wi=/[^\s\p{P}\p{S}]/u,Ac=$(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Co).getRegex(),Vi=/(?!~)[\p{P}\p{S}]/u,vc=/(?!~)[\s\p{P}\p{S}]/u,Rc=/(?:[^\s\p{P}\p{S}]|~)/u,Oc=$(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",dc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ki=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ic=$(Ki,"u").replace(/punct/g,Kr).getRegex(),Cc=$(Ki,"u").replace(/punct/g,Vi).getRegex(),Yi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Lc=$(Yi,"gu").replace(/notPunctSpace/g,Wi).replace(/punctSpace/g,Co).replace(/punct/g,Kr).getRegex(),Nc=$(Yi,"gu").replace(/notPunctSpace/g,Rc).replace(/punctSpace/g,vc).replace(/punct/g,Vi).getRegex(),Pc=$("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Wi).replace(/punctSpace/g,Co).replace(/punct/g,Kr).getRegex(),Mc=$(/\\(punct)/,"gu").replace(/punct/g,Kr).getRegex(),Uc=$(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Dc=$(Oo).replace("(?:-->|$)","-->").getRegex(),Gc=$("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Dc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),jr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,$c=$(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",jr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qi=$(/^!?\[(label)\]\[(ref)\]/).replace("label",jr).replace("ref",Ro).getRegex(),Ji=$(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ro).getRegex(),Hc=$("reflink|nolink(?!\\()","g").replace("reflink",qi).replace("nolink",Ji).getRegex(),Ui=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Lo={_backpedal:Qt,anyPunctuation:Mc,autolink:Uc,blockSkip:Oc,br:Xi,code:yc,del:Qt,emStrongLDelim:Ic,emStrongRDelimAst:Lc,emStrongRDelimUnd:Pc,escape:Sc,link:$c,nolink:Ji,punctuation:Ac,reflink:qi,reflinkSearch:Hc,tag:Gc,text:wc,url:Qt},Fc={...Lo,link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",jr).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",jr).getRegex()},_o={...Lo,emStrongRDelimAst:Nc,emStrongLDelim:Cc,url:$(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ui).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:$(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ui).getRegex()},zc={..._o,br:$(Xi).replace("{2,}","*").getRegex(),text:$(_o.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Br={normal:Io,gfm:Tc,pedantic:_c},qt={normal:Lo,gfm:_o,breaks:zc,pedantic:Fc},Bc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Di=e=>Bc[e];function ze(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Di)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Di);return e}function Gi(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function $i(e,t){let r=e.replace(ye.findPipe,(s,a,d)=>{let c=!1,h=a;for(;--h>=0&&d[h]==="\\";)c=!c;return c?"|":" |"}),n=r.split(ye.splitPipe),o=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(ye.slashPipe,"|");return n}function Jt(e,t,r){let n=e.length;if(n===0)return"";let o=0;for(;o<n;){let s=e.charAt(n-o-1);if(s===t&&!r)o++;else if(s!==t&&r)o++;else break}return e.slice(0,n-o)}function jc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Hi(e,t,r,n,o){let s=t.href,a=t.title||null,d=e[1].replace(o.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:s,title:a,text:d,tokens:n.inlineTokens(d)};return n.state.inLink=!1,c}function Xc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let o=n[1];return t.split(`
`).map(s=>{let a=s.match(r.other.beginningSpace);if(a===null)return s;let[d]=a;return d.length>=o.length?s.slice(o.length):s}).join(`
`)}var Xr=class{options;rules;lexer;constructor(e){this.options=e||ht}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Jt(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Xc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Jt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Jt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Jt(t[0],`
`).split(`
`),n="",o="",s=[];for(;r.length>0;){let a=!1,d=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))d.push(r[c]),a=!0;else if(!a)d.push(r[c]);else break;r=r.slice(c);let h=d.join(`
`),m=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${h}`:h,o=o?`${o}
${m}`:m;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(m,s,!0),this.lexer.state.top=b,r.length===0)break;let _=s.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let L=_,N=L.raw+`
`+r.join(`
`),K=this.blockquote(N);s[s.length-1]=K,n=n.substring(0,n.length-L.raw.length)+K.raw,o=o.substring(0,o.length-L.text.length)+K.text;break}else if(_?.type==="list"){let L=_,N=L.raw+`
`+r.join(`
`),K=this.list(N);s[s.length-1]=K,n=n.substring(0,n.length-_.raw.length)+K.raw,o=o.substring(0,o.length-L.raw.length)+K.raw,r=N.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,o={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let s=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,h="",m="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;h=t[0],e=e.substring(h.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),_=e.split(`
`,1)[0],L=!b.trim(),N=0;if(this.options.pedantic?(N=2,m=b.trimStart()):L?N=t[1].length+1:(N=t[2].search(this.rules.other.nonSpaceChar),N=N>4?1:N,m=b.slice(N),N+=t[1].length),L&&this.rules.other.blankLine.test(_)&&(h+=_+`
`,e=e.substring(_.length+1),c=!0),!c){let C=this.rules.other.nextBulletRegex(N),te=this.rules.other.hrRegex(N),ke=this.rules.other.fencesBeginRegex(N),le=this.rules.other.headingBeginRegex(N),fe=this.rules.other.htmlBeginRegex(N);for(;e;){let me=e.split(`
`,1)[0],H;if(_=me,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),H=_):H=_.replace(this.rules.other.tabCharGlobal,"    "),ke.test(_)||le.test(_)||fe.test(_)||C.test(_)||te.test(_))break;if(H.search(this.rules.other.nonSpaceChar)>=N||!_.trim())m+=`
`+H.slice(N);else{if(L||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ke.test(b)||le.test(b)||te.test(b))break;m+=`
`+_}!L&&!_.trim()&&(L=!0),h+=me+`
`,e=e.substring(me.length+1),b=H.slice(N)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(a=!0));let K=null,de;this.options.gfm&&(K=this.rules.other.listIsTask.exec(m),K&&(de=K[0]!=="[ ] ",m=m.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:h,task:!!K,checked:de,loose:!1,text:m,tokens:[]}),o.raw+=h}let d=o.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let c=0;c<o.items.length;c++)if(this.lexer.state.top=!1,o.items[c].tokens=this.lexer.blockTokens(o.items[c].text,[]),!o.loose){let h=o.items[c].tokens.filter(b=>b.type==="space"),m=h.length>0&&h.some(b=>this.rules.other.anyLine.test(b.raw));o.loose=m}if(o.loose)for(let c=0;c<o.items.length;c++)o.items[c].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=$i(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<r.length;a++)s.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:s.align[a]});for(let a of o)s.rows.push($i(a,s.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:s.align[c]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let s=Jt(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{let s=jc(t[2],"()");if(s===-2)return;if(s>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(n);s&&(n=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Hi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[n.toLowerCase()];if(!o){let s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return Hi(r,o,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let o=[...n[0]].length-1,s,a,d=o,c=0,h=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+o);(n=h.exec(t))!=null;){if(s=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!s)continue;if(a=[...s].length,n[3]||n[4]){d+=a;continue}else if((n[5]||n[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(d-=a,d>0)continue;a=Math.min(a,a+d+c);let m=[...n[0]][0].length,b=e.slice(0,o+n.index+m+a);if(Math.min(o,a)%2){let L=b.slice(1,-1);return{type:"em",raw:b,text:L,tokens:this.lexer.inlineTokens(L)}}let _=b.slice(2,-2);return{type:"strong",raw:b,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),o=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&o&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ge=class So{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ht,this.options.tokenizer=this.options.tokenizer||new Xr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ye,block:Br.normal,inline:qt.normal};this.options.pedantic?(r.block=Br.pedantic,r.inline=qt.pedantic):this.options.gfm&&(r.block=Br.gfm,this.options.breaks?r.inline=qt.breaks:r.inline=qt.gfm),this.tokenizer.rules=r}static get rules(){return{block:Br,inline:qt}}static lex(t,r){return new So(r).lex(t)}static lexInline(t,r){return new So(r).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(a=>(o=a.call({lexer:this},t,r))?(t=t.substring(o.raw.length),r.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let a=r.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):r.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},r.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),r.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let a=1/0,d=t.slice(1),c;this.options.extensions.startBlock.forEach(h=>{c=h.call({lexer:this},d),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(s=t.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(o),n=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(o);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,o=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,o.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)s=o[2]?o[2].length:0,n=n.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,d="";for(;t;){a||(d=""),a=!1;let c;if(this.options.extensions?.inline?.some(m=>(c=m.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let m=r.at(-1);c.type==="text"&&m?.type==="text"?(m.raw+=c.raw,m.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,d)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let h=t;if(this.options.extensions?.startInline){let m=1/0,b=t.slice(1),_;this.options.extensions.startInline.forEach(L=>{_=L.call({lexer:this},b),typeof _=="number"&&_>=0&&(m=Math.min(m,_))}),m<1/0&&m>=0&&(h=t.substring(0,m+1))}if(c=this.tokenizer.inlineText(h)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(d=c.raw.slice(-1)),a=!0;let m=r.at(-1);m?.type==="text"?(m.raw+=c.raw,m.text+=c.text):r.push(c);continue}if(t){let m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return r}},Wr=class{options;parser;constructor(e){this.options=e||ht}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(ye.notSpaceStart)?.[0],o=e.replace(ye.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ze(n)+'">'+(r?o:ze(o,!0))+`</code></pre>
`:"<pre><code>"+(r?o:ze(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let d=e.items[a];n+=this.listitem(d)}let o=t?"ol":"ul",s=t&&r!==1?' start="'+r+'"':"";return"<"+o+s+`>
`+n+"</"+o+`>
`}listitem(e){let t="";if(e.task){let r=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=r+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=r+" "+ze(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):t+=r+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let o=0;o<e.header.length;o++)r+=this.tablecell(e.header[o]);t+=this.tablerow({text:r});let n="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];r="";for(let a=0;a<s.length;a++)r+=this.tablecell(s[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ze(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),o=Gi(e);if(o===null)return n;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+ze(t)+'"'),s+=">"+n+"</a>",s}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let o=Gi(e);if(o===null)return ze(r);e=o;let s=`<img src="${e}" alt="${r}"`;return t&&(s+=` title="${ze(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ze(e.text)}},No=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},$e=class yo{options;renderer;textRenderer;constructor(t){this.options=t||ht,this.options.renderer=this.options.renderer||new Wr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new No}static parse(t,r){return new yo(r).parse(t)}static parseInline(t,r){return new yo(r).parseInline(t)}parse(t,r=!0){let n="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let d=s,c=this.options.extensions.renderers[d.type].call({parser:this},d);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(d.type)){n+=c||"";continue}}let a=s;switch(a.type){case"space":{n+=this.renderer.space(a);continue}case"hr":{n+=this.renderer.hr(a);continue}case"heading":{n+=this.renderer.heading(a);continue}case"code":{n+=this.renderer.code(a);continue}case"table":{n+=this.renderer.table(a);continue}case"blockquote":{n+=this.renderer.blockquote(a);continue}case"list":{n+=this.renderer.list(a);continue}case"html":{n+=this.renderer.html(a);continue}case"def":{n+=this.renderer.def(a);continue}case"paragraph":{n+=this.renderer.paragraph(a);continue}case"text":{let d=a,c=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],c+=`
`+this.renderer.text(d);r?n+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):n+=c;continue}default:{let d='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}parseInline(t,r=this.renderer){let n="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let d=this.options.extensions.renderers[s.type].call({parser:this},s);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){n+=d||"";continue}}let a=s;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let d='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}},Zt=class{options;block;constructor(e){this.options=e||ht}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ge.lex:Ge.lexInline}provideParser(){return this.block?$e.parse:$e.parseInline}},Wc=class{defaults=wo();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=$e;Renderer=Wr;TextRenderer=No;Lexer=Ge;Tokenizer=Xr;Hooks=Zt;constructor(...e){this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let o=n;for(let s of o.header)r=r.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let a of s)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let o=n;r=r.concat(this.walkTokens(o.items,t));break}default:{let o=n;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let a=o[s].flat(1/0);r=r.concat(this.walkTokens(a,t))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...a){let d=o.renderer.apply(this,a);return d===!1&&(d=s.apply(this,a)),d}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),n.extensions=t),r.renderer){let o=this.defaults.renderer||new Wr(this.defaults);for(let s in r.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,d=r.renderer[a],c=o[a];o[a]=(...h)=>{let m=d.apply(o,h);return m===!1&&(m=c.apply(o,h)),m||""}}n.renderer=o}if(r.tokenizer){let o=this.defaults.tokenizer||new Xr(this.defaults);for(let s in r.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,d=r.tokenizer[a],c=o[a];o[a]=(...h)=>{let m=d.apply(o,h);return m===!1&&(m=c.apply(o,h)),m}}n.tokenizer=o}if(r.hooks){let o=this.defaults.hooks||new Zt;for(let s in r.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,d=r.hooks[a],c=o[a];Zt.passThroughHooks.has(s)?o[a]=h=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(s))return(async()=>{let b=await d.call(o,h);return c.call(o,b)})();let m=d.call(o,h);return c.call(o,m)}:o[a]=(...h)=>{if(this.defaults.async)return(async()=>{let b=await d.apply(o,h);return b===!1&&(b=await c.apply(o,h)),b})();let m=d.apply(o,h);return m===!1&&(m=c.apply(o,h)),m}}n.hooks=o}if(r.walkTokens){let o=this.defaults.walkTokens,s=r.walkTokens;n.walkTokens=function(a){let d=[];return d.push(s.call(this,a)),o&&(d=d.concat(o.call(this,a))),d}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ge.lex(e,t??this.defaults)}parser(e,t){return $e.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},o={...this.defaults,...n},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&n.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let a=o.hooks?await o.hooks.preprocess(t):t,d=await(o.hooks?await o.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(a,o),c=o.hooks?await o.hooks.processAllTokens(d):d;o.walkTokens&&await Promise.all(this.walkTokens(c,o.walkTokens));let h=await(o.hooks?await o.hooks.provideParser():e?$e.parse:$e.parseInline)(c,o);return o.hooks?await o.hooks.postprocess(h):h})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let a=(o.hooks?o.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(t,o);o.hooks&&(a=o.hooks.processAllTokens(a)),o.walkTokens&&this.walkTokens(a,o.walkTokens);let d=(o.hooks?o.hooks.provideParser():e?$e.parse:$e.parseInline)(a,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(a){return s(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ze(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},mt=new Wc;function B(e,t){return mt.parse(e,t)}B.options=B.setOptions=function(e){return mt.setOptions(e),B.defaults=mt.defaults,Fi(B.defaults),B};B.getDefaults=wo;B.defaults=ht;B.use=function(...e){return mt.use(...e),B.defaults=mt.defaults,Fi(B.defaults),B};B.walkTokens=function(e,t){return mt.walkTokens(e,t)};B.parseInline=mt.parseInline;B.Parser=$e;B.parser=$e.parse;B.Renderer=Wr;B.TextRenderer=No;B.Lexer=Ge;B.lexer=Ge.lex;B.Tokenizer=Xr;B.Hooks=Zt;B.parse=B;var yh=B.options,wh=B.setOptions,Ah=B.use,vh=B.walkTokens,Rh=B.parseInline;var Oh=$e.parse,Ih=Ge.lex;var j=Qn();function E(e,t={},...r){let n=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(n.dataset,s);continue}if(o==="style"){n.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){n.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){n.className=s;continue}n[o]=s}for(let o of r)o!=null&&n.append(typeof o=="string"?document.createTextNode(o):o);return n}function tr(e){e.replaceChildren()}function Po(e){let t=E("div",{className:"md"});if(!e||e.trim().length===0)return t.append(E("p",{className:"muted"},"No description.")),t;let r=B.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=Pi.sanitize(r,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(n=>{let o=n.getAttribute("href")??"";n.setAttribute("rel","noreferrer noopener"),n.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&j.openUrl(o)})}),t.querySelectorAll("img").forEach(n=>{n.setAttribute("loading","lazy")}),t}function Zi(e,t=320){let r=e??"",n=Po(e);if(r.length<=t)return n;n.classList.add("md-collapsed");let o=E("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=n.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),E("div",{className:"md-wrap"},n,o)}function Qi(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e))!n||typeof n!="object"||typeof n.taskId!="string"||(t[r]={taskId:n.taskId,ticketId:typeof n.ticketId=="string"?n.ticketId:"",title:typeof n.title=="string"?n.title:"",at:typeof n.at=="number"?n.at:0,posted:Array.isArray(n.posted)?n.posted.filter(o=>typeof o=="string"):[]});return t}function ea(e,t=50){let r=Object.entries(e).sort((n,o)=>o[1].at-n[1].at).slice(0,Math.max(0,t));return Object.fromEntries(r)}var ta="preferences",ra={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1};function na(e){if(typeof e!="object"||e===null)return{...ra};let t=e,r=t.priorityFilter,n=r==="any"||!!r&&r in pi;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:n?r:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0}}async function rr(){try{return na(await j.storage.get(ta))}catch{return{...ra}}}async function oa(e){let t=na({...await rr(),...e});try{await j.storage.set(ta,t)}catch{}return t}var sa="session-links";async function Vc(){try{return Qi(await j.storage.get(sa))}catch{return{}}}async function ia(e,t){try{let r=await Vc();r[e]={...t,at:Date.now(),posted:[]};let n=ea(r);await j.storage.set(sa,JSON.parse(JSON.stringify(n)))}catch{}}var Kc=864e5;function Mo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function ca(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(r=>r[0].toUpperCase()+r.slice(1)).join(" ")}function da(e,t,r){return`${li}/dashboard/workspace/${e}/project/${t}/task/${r}`}var Yc={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function gt(e){return Yc[e]??e}function Jr(e,t=new Date){if(!e)return null;let r=new Date(e);if(Number.isNaN(r.getTime()))return null;let n=Math.round((qr(r).getTime()-qr(t).getTime())/Kc);return n===0?"Due today":n===1?"Due tomorrow":n===-1?"Due yesterday":n<0?`Overdue ${Math.abs(n)}d`:n<=7?`Due in ${n}d`:`Due ${r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function pa(e,t=new Date){if(!e)return!1;let r=new Date(e);return Number.isNaN(r.getTime())?!1:qr(r).getTime()<qr(t).getTime()}function qr(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function ua(e,t=160){if(!e)return"";let r=e.split(`
`).map(o=>o.trim()).find(o=>o.length>0);if(!r)return"";let n=r.replace(/^#{1,6}\s+/,"").replace(/^[*_>]+/,"").trim();return n.length>t?`${n.slice(0,t-1)}\u2026`:n}var qc=6e3;function Jc(e){let t=e.user?.name??"Unknown",r=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${r}`}function fa(e,t){let r=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&r.push(`Project: ${t.projectName}`),t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${gt(e.priority)}`),e.dueDate&&r.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&r.push(t.url);let n=e.description?.trim();n&&r.push("",n);let o=t.comments??[];if(o.length>0){r.push("","Comments:");let s=0;for(let a of o){let d=Jc(a);if(s+d.length>qc)break;s+=d.length,r.push(d)}}return r.join(`
`)}function ma(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var aa=6e4,la=36e5,Yr=864e5;function Zr(e,t=Date.now()){if(!e)return null;let r=Date.parse(e);if(!Number.isFinite(r))return null;let n=Math.max(0,t-r);return n<aa?"just now":n<la?`${Math.floor(n/aa)}m`:n<Yr?`${Math.floor(n/la)}h`:n<7*Yr?`${Math.floor(n/Yr)}d`:`${Math.floor(n/(7*Yr))}w`}function ha(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function Uo(e){return da(e.workspaceId,e.task.projectId,e.task.id)}function Zc(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function ga(e){return{providerId:ci,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:Uo(e),text:fa(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:Uo(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:Zc(e)}}async function ka(e){await j.attach(ga(e))}async function Qc(e,t={}){let r=t.worktree?ma(e.ticketId):void 0,n=await j.startSession({...ga(e),navigation:"preserve",...r?{worktree:{kind:"new",name:r}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return n.sessionId===null?{sessionId:null,sent:n.sent,failure:n.failure,branch:n.worktree.branch}:{sessionId:n.sessionId,sent:n.sent,branch:n.worktree?.branch??r}}async function Do(e,t={}){let r=await Qc(e,t);if(r.sessionId===null){let n=r.branch?` The worktree ${r.branch} was kept.`:"",o=r.failure?` (${r.failure})`:"";return await j.toast({kind:"error",message:`No session was created${o}.${n} Check the session list before retrying.`,dismiss:!0}),!1}return await ia(r.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await j.toast({kind:"success",message:t.worktree&&r.branch?`Session started on ${r.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function Go(e){await j.openUrl(Uo(e))}function xa(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function ba(e){return E("span",{className:"label-chip"},E("span",{className:"label-dot",style:`background:${e.color}`}),e.name)}function Ea(e,t=2){if(e.length===0)return null;let r=e.slice(0,t),n=E("span",{className:"label-chips"});for(let o of r)n.append(ba(o));return e.length>r.length&&n.append(E("span",{className:"label-more"},`+${e.length-r.length}`)),n}function Ta(e){if(e.length===0)return null;let t=E("div",{className:"label-chips"});for(let r of e)t.append(ba(r));return t}function _a(e){return E("span",{className:"person"},E("span",{className:"person-avatar"},xa(e)),E("span",{className:"person-name"},e))}function Sa(e){return E("span",{className:"person-avatar"},xa(e))}function ya(e){let{task:t}=e,r=E("dl",{className:"meta-grid"}),n=[];e.projectName&&n.push(["Project",e.projectName]),t.priority!=="no-priority"&&n.push(["Priority",gt(t.priority)]),n.push(["Assignee",t.assigneeName??"Unassigned"]);let o=Jr(t.dueDate);o&&n.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&n.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&n.push(["Description","Too large to inline; open the task for the full text."]);for(let[d,c]of n)r.append(E("dt",{},d),E("dd",{},c));let a=Ta(t.labels??[]);if(a){let d=E("dd",{className:"meta-labels"});d.append(a),r.append(E("dt",{},"Labels"),d)}return r}function wa(e,t=320){return E("div",{className:"detail-section"},Zi(e.task.description,t))}function Aa(e){let t=E("div",{className:"detail-section"});if(t.append(E("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(E("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(E("p",{className:"muted"},"Loading comments\u2026")),t;let r=e.items??[];if(r.length===0)return t.append(E("p",{className:"muted"},"No comments yet.")),t;let n=E("div",{className:"comments"});return r.forEach((o,s)=>{let a=s===r.length-1,d=Zr(o.createdAt),c=E("div",{className:"comment"});a||c.append(E("div",{className:"comment-line"})),c.append(Sa(o.user?.name));let h=E("div",{className:"comment-card"});h.append(E("div",{className:"comment-head"},E("span",{className:"comment-author"},o.user?.name??"Unknown"),d?E("span",{},d):null),E("div",{className:"comment-body"},Po(o.content))),c.append(h),n.append(c)}),t.append(n),t}var ed=`
:root {
  --k-bg: var(--surface-background, var(--oc-bg, transparent));
  --k-fg: var(--surface-foreground, var(--oc-fg, inherit));
  --k-muted: var(--surface-muted-foreground, var(--oc-muted, #71717a));
  --k-muted-surface: var(--surface-muted, var(--oc-muted-surface, #ececef));
  --k-elevated: var(--surface-elevated, var(--oc-elevated, var(--k-muted-surface)));
  --k-border: var(--interactive-border, var(--oc-border, #e4e4e7));
  --k-border-soft: color-mix(in srgb, var(--k-border) 60%, transparent);
  --k-hover: var(--interactive-hover, var(--oc-hover, color-mix(in srgb, var(--k-fg) 6%, transparent)));
  --k-selection: var(--interactive-selection, var(--oc-selection, color-mix(in srgb, var(--k-fg) 8%, transparent)));
  --k-selection-fg: var(--interactive-selection-foreground, var(--oc-selection-fg, inherit));
  --k-primary: var(--primary, var(--oc-primary, currentColor));
  --k-primary-text: var(--primary-text, var(--oc-primary-text, var(--k-primary)));
  --k-error-text: var(--error-text, var(--oc-error-text, #b91c1c));
  --k-radius: var(--radius, var(--oc-radius, 8px));
  --k-font: var(--font-sans, var(--oc-font, system-ui, -apple-system, sans-serif));
  --k-mono: var(--font-mono, var(--oc-mono, ui-monospace, SFMono-Regular, Menlo, monospace));
  --k-text-ui: var(--text-ui-header, 0.875rem);
  --k-text-label: var(--text-ui-label, 0.84375rem);
  --k-text-meta: var(--text-meta, 0.8125rem);
  --k-text-micro: var(--text-micro, 0.8125rem);
  --k-text-md: var(--text-markdown, 0.875rem);
  --k-text-code: var(--text-code, 0.75rem);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  height: 100%;
  font-family: var(--k-font);
  font-size: var(--k-text-ui);
  line-height: 1.45;
  color: var(--k-fg);
  background: var(--k-bg);
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
  color: var(--k-muted);
  font-size: var(--k-text-meta);
}

.eyebrow {
  font-size: var(--k-text-meta);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--k-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.panel-title {
  font-size: var(--k-text-ui);
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
  font-size: var(--k-text-micro);
  color: var(--k-muted);
  background: var(--k-muted-surface);
  border-radius: 999px;
  padding: 1px 7px;
}

/* Task rows. */
.task-key {
  font-family: var(--k-mono);
  font-size: var(--k-text-micro);
  color: var(--k-muted);
}

.task-subtitle { color: var(--k-muted); font-size: var(--k-text-meta); }

.priority-bar {
  width: 3px;
  align-self: stretch;
  border-radius: 999px;
  background: var(--k-muted-surface);
  min-height: 18px;
}

.priority-low { background: var(--oc-info); }
.priority-medium { background: var(--oc-info); }
.priority-high { background: var(--oc-warning); }
.priority-urgent { background: var(--oc-error); }

/* The panel header: search, filters, then the scope pickers. */
.panel-head { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }

.filters { gap: 4px; }
.filter-active .oc-sdk-btn { color: var(--k-primary-text); }
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
  border-bottom: 1px solid var(--k-border);
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
.detail-id { font-size: var(--k-text-meta); color: var(--k-muted); }
.detail-title { margin: 2px 0 0; font-size: var(--k-text-ui); font-weight: 600; line-height: 1.45; }

.detail-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.detail-status { min-width: 150px; }

.detail-section { display: flex; flex-direction: column; gap: 8px; }
.detail-section-title { margin: 0; font-size: var(--k-text-label); font-weight: 600; }

.detail-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--k-border);
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
  font-size: var(--k-text-meta);
}

.meta-grid dt { color: var(--k-muted); }

.meta-grid dd { margin: 0; }

.link-button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--k-primary-text);
  cursor: pointer;
  text-align: left;
}

.link-button:hover { text-decoration: underline; }

.overdue { color: var(--k-error-text); }

/* Markdown bodies. */
.md {
  font-size: var(--k-text-md);
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.md > :first-child { margin-top: 0; }
.md > :last-child { margin-bottom: 0; }
.md p { margin: 0 0 8px; }
.md ul, .md ol { margin: 0 0 8px; padding-left: 18px; }
.md li { margin: 2px 0; }
.md h1, .md h2, .md h3, .md h4 { margin: 12px 0 6px; line-height: 1.3; font-size: var(--k-text-md); }
.md h1 { font-weight: 700; }
.md h2, .md h3, .md h4 { font-weight: 600; }
.md code {
  font-family: var(--k-mono);
  font-size: var(--k-text-code);
  background: var(--k-muted-surface);
  padding: 1px 4px;
  border-radius: 4px;
}
.md pre {
  background: var(--k-muted-surface);
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0 0 8px;
}
.md pre code { background: none; padding: 0; }
.md blockquote {
  margin: 0 0 8px;
  padding-left: 10px;
  border-left: 2px solid var(--k-border);
  color: var(--k-muted);
}
.md table { border-collapse: collapse; font-size: var(--k-text-meta); }
.md th, .md td { border: 1px solid var(--k-border); padding: 3px 6px; text-align: left; }
.md a { color: var(--k-primary-text); }

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
  border-bottom: 1px solid var(--k-border-soft);
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
  border-left: 1px solid var(--k-border-soft);
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
  border-top: 1px solid var(--k-border-soft);
  padding-top: 12px;
}

.attach-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding-top: 8px;
  border-top: 1px solid var(--k-border-soft);
}
.attach-hint {
  margin-right: auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--k-muted);
  font-size: var(--k-text-meta);
}

.state-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--k-border);
  border-radius: 999px;
  padding: 2px 9px;
  font-size: var(--k-text-meta);
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
  background: var(--k-muted-surface);
  border: 1px solid var(--k-border);
  border-radius: var(--k-radius);
  padding: 8px;
  max-height: 100%;
  min-height: 120px;
}

.board-column.drag-over { border-color: var(--k-primary); }

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
  background: var(--k-bg);
  border: 1px solid var(--k-border);
  border-radius: var(--k-radius);
  padding: 8px;
  cursor: grab;
  text-align: left;
  font: inherit;
  color: inherit;
  width: 100%;
}

.card:hover { border-color: var(--k-primary); }
.card.dragging { opacity: 0.5; }
.card-title { font-size: var(--k-text-ui); line-height: 1.35; }
.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  font-size: var(--k-text-micro);
  color: var(--k-muted);
}

.backdrop {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--k-bg) 72%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 20;
}

.backdrop-card {
  background: var(--k-bg);
  border: 1px solid var(--k-border);
  border-radius: var(--k-radius);
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
  border-bottom: 1px solid var(--k-border);
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
  background: var(--k-border);
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

.row-item:hover { background: var(--k-hover); }
.row-item-selected { background: var(--k-selection); color: var(--k-selection-fg); }

.row-glyph { margin-top: 2px; flex-shrink: 0; }

.row-body { min-width: 0; flex: 1; }

.row-title {
  font-weight: 600;
  font-size: var(--k-text-ui);
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
  font-size: var(--k-text-micro);
  color: var(--k-muted);
}

.tabular { font-variant-numeric: tabular-nums; }

.person { display: inline-flex; align-items: center; gap: 4px; min-width: 0; }
.person-avatar {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--k-muted-surface);
  color: var(--k-muted);
  font-size: 0.625rem;
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
  font-size: var(--k-text-micro);
  color: var(--k-muted);
  max-width: 144px;
}
.label-chip > :last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.label-dot { width: 6px; height: 6px; border-radius: 999px; flex-shrink: 0; }
.label-more { font-size: var(--k-text-micro); color: var(--k-muted); }

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
  background: var(--k-border-soft);
}
.comment > .person-avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  font-size: 0.75rem;
  border: 1px solid var(--k-border-soft);
  background: var(--k-elevated);
}
.comment-card {
  background: var(--k-elevated);
  border-radius: var(--k-radius);
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
  font-size: var(--k-text-micro);
  color: var(--k-muted);
}
.comment-author { color: var(--k-fg); font-weight: 500; }
.comment-body { font-size: var(--k-text-md); }

.kaneo-mark { flex-shrink: 0; fill: currentColor; }

.kaneo-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--k-text-ui);
  font-weight: 600;
}
`;function va(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let r=document.createElement("style");r.id=t,r.textContent=ed,e.append(r)}var td={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function rd(e){let t=td[e],r={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("width","16"),n.setAttribute("height","16"),n.setAttribute("aria-hidden","true"),n.innerHTML=r[e],n.classList.add("row-glyph"),n}function Ra(e){let{task:t,ticketId:r,column:n,selected:o,onActivate:s}=e,a=Jr(t.dueDate),d=pa(t.dueDate),c=Zr(t.createdAt),h=E("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:s}),m=E("div",{className:"row-body"});m.append(E("div",{className:"row-title"},t.title));let b=E("div",{className:"row-meta"});b.append(E("span",{className:"task-key"},r)),t.assigneeName&&b.append(_a(t.assigneeName)),c&&b.append(E("span",{},c));let _=t.subtaskCounts;_&&_.total>0&&b.append(E("span",{className:"tabular"},`${_.completed}/${_.total}`)),t.priority!=="no-priority"&&b.append(E("span",{},gt(t.priority))),a&&b.append(E("span",{className:d?"overdue":""},a));let L=Ea(t.labels??[]);return L&&b.append(L),m.append(b),h.append(rd(ha(n)),m),h.title=`${r} \xB7 ${n.name}`,h}var nr=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function Oa(e,t,r={}){if(!r.force){let b=await od();if(b&&Date.now()-b.at<nd)return b.context}let[n,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new nr;let s=await rr(),a=t?o.find(b=>b.slug===t):void 0,d=(s.workspaceId&&o.find(b=>b.id===s.workspaceId)?.id)??a?.id??o[0].id;d!==s.workspaceId&&await oa({workspaceId:d,projectId:null});let c=[],h=null;try{c=await e.listProjects(d)}catch(b){h=b instanceof Error?b:new Error(String(b))}let m={user:n,workspaces:o,workspaceId:d,projects:c,projectsError:h};return await sd(m),m}var Ia="bootstrap-cache",nd=6e4;async function od(){try{let e=await j.storage.get(Ia);return e&&typeof e.at=="number"&&e.context?e:null}catch{return null}}async function sd(e){let t=JSON.parse(JSON.stringify({at:Date.now(),context:e}));try{await j.storage.set(Ia,t)}catch{}}function Ca(e,t,r){if(e.length===0)return null;let n=e.find(a=>a.id===t);if(n)return n;let o=r?.toLowerCase();return(o?e.find(a=>a.slug.toLowerCase()===o):void 0)??e[0]}function La(e){let t=e?.workspace?.trim(),r=e?.project?.trim(),n=e?.["openchamber-url"]?.trim();return{workspaceSlug:t||void 0,projectSlug:r||void 0,openchamberUrl:n||void 0}}var Le=document.querySelector("#root");if(!Le)throw new Error("Kaneo attach dialog is missing its #root element.");var Nt=ui(e=>j.request(e)),or=200,id=560,f={ready:null,connected:!1,context:null,project:null,boardTasks:[],columnNames:{},defaultStatus:"to-do",results:null,search:"",statusFilter:"",tab:"board",loading:!0,error:null,draft:{title:"",description:"",priority:"medium"},source:null,highlightedId:null,comments:{},worktree:!1,wide:!0,previewOpen:!1},Qr=0,$o=0,Na=!1,Ho=!1;function xt(e){return e instanceof ut?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Fo(e){return Mo(f.project?.slug??"",e.number)}function Ua(e){return f.columnNames[e.status]??ca(e.status)}function zo(e){return{task:e,ticketId:Fo(e),workspaceId:f.context?.workspaceId??"",projectName:f.project?.name,columnName:Ua(e),comments:f.comments[e.id]?.items}}function Bo(){let e=f.highlightedId;return e?f.boardTasks.find(t=>t.id===e)??f.results?.find(t=>t.id===e)??null:null}function ad(e){if(f.statusFilter&&e.status!==f.statusFilter)return!1;let t=f.search.trim().toLowerCase();return t?e.title.toLowerCase().includes(t)||Fo(e).toLowerCase().includes(t):!0}function ld(){return(f.results??f.boardTasks).filter(ad)}async function en(){let e=++Qr;f.loading=!0,Me();try{let{workspaceSlug:t,projectSlug:r}=La(f.ready?.settings),n=await Oa(Nt,t,{force:!0});if(e!==Qr)return;f.context=n;let o=await rr();if(f.project=Ca(n.projects,o.projectId,r),f.loading=!1,f.error=n.projectsError?xt(n.projectsError):null,Me(),f.project){let s=await Nt.getBoard(f.project.id);if(e!==Qr)return;f.boardTasks=s.board.columns.flatMap(a=>a.tasks),f.columnNames=Object.fromEntries(s.board.columns.map(a=>[a.id,a.name])),f.defaultStatus=s.board.columns[0]?.id??"to-do",f.results=null}Me()}catch(t){if(e!==Qr)return;f.loading=!1,f.error=t instanceof nr?t.message:`Could not reach Kaneo. ${xt(t)}`,Me()}}async function cd(){let e=++$o,t=f.context?.workspaceId,r=f.search.trim();if(!t||r.length<2){f.results=null,Ue();return}f.loading=!0,Ue();try{let n=await Nt.search(t,r,{...f.project?{projectId:f.project.id}:{},limit:40});if(e!==$o)return;let o=new Map(f.boardTasks.map(d=>[d.id,d])),s=n.results.filter(d=>d.type==="task");f.results=s.map(d=>o.get(d.id)).filter(d=>!!d);let a=s.length-f.results.length;f.loading=!1,f.error=a>0?`${a} match${a===1?" is":"es are"} outside the loaded board. Open the Kaneo web app to reach them.`:null,Ue()}catch(n){if(e!==$o)return;f.loading=!1,f.error=xt(n),Ue()}}async function Da(e){let t=f.comments[e]?.items;if(t)return t;try{let r=await Nt.listComments(e);return f.comments[e]={loading:!1,error:null,items:r},r}catch{return}}async function tn(e){try{let t={...zo(e),comments:await Da(e.id)};await ka(t),await j.toast({kind:"success",message:`${t.ticketId} attached to the chat.`}),await j.close()}catch(t){await j.toast({kind:"error",message:`Attach failed: ${xt(t)}`,dismiss:!0})}}async function dd(e){let t={...zo(e),comments:await Da(e.id)};await Do(t,{worktree:f.worktree})&&await j.close()}async function pd(){if(!f.project)return;let e=f.draft.title.trim();if(e.length===0){f.error="A task needs a title.",Me();return}try{let t=await Nt.createTask(f.project.id,{title:e.slice(0,or),description:f.draft.description,priority:f.draft.priority,status:f.defaultStatus});await j.toast({kind:"success",message:`Created ${Mo(f.project.slug,t.number)} in ${f.project.name}.`}),await tn(t)}catch(t){f.error=xt(t),Me()}}var kt=null,nt=null,ot=null;function Me(){if(Le){if(tr(Le),kt=null,nt=null,ot=null,!f.ready){$r(Le,{label:"Connecting to Kaneo"});return}if(!f.connected){Xt(Le,{title:"Kaneo is not connected",body:"Add an API token in Settings \u2192 Integrations \u2192 Kaneo."});return}if(f.source){Ma(!1);return}if(f.tab==="create"){Ma(!0);return}ud()}}function ud(){kt=E("div",{className:"attach-head"}),Le?.append(kt),fd(),nt=E("div",{className:"attach-body"}),Le?.append(nt),ot=E("div",{className:"attach-foot"}),Le?.append(ot),Ue(),gd()}function fd(){if(!kt)return;tr(kt);let e=E("div");kt.append(e),Gr(e,{items:[{id:"board",label:f.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:f.tab,onChange:s=>{if(s==="create"){f.tab="create",Me();return}f.tab="board",Me()}});let t=E("div",{className:"attach-head-row"}),r=E("div",{className:"attach-search"});t.append(r),ao(r,{value:f.search,label:"Search Kaneo",placeholder:"Search, or paste a ticket id",onChange:s=>{if(f.search=s,s.trim().length>=2){cd();return}f.results=null,Ue()}});let n=Object.entries(f.columnNames);if(n.length>0){let s=E("div",{className:f.statusFilter?"filter filter-active":"filter"});t.append(s),lo(s,{label:f.statusFilter?f.columnNames[f.statusFilter]??"Status":"Status",size:"sm",variant:"ghost",items:[{id:"",label:"Any status"},{separator:!0},...n.map(([a,d])=>({id:a,label:d}))],onSelect:a=>{f.statusFilter=a,Ue()}})}let o=f.context?.projects??[];if(o.length>1){let s=E("div",{className:"attach-project"});t.append(s),jt(s,{searchable:!0,searchPlaceholder:"Find a project",value:f.project?.id??"",options:o.map(a=>({id:a.id,label:a.slug.toUpperCase()})),onChange:a=>{f.project=f.context?.projects.find(d=>d.id===a)??null,f.search="",f.results=null,f.highlightedId=null,f.loading=!0,en()}})}kt.append(t)}function Ue(){if(!nt)return;tr(nt);let e=ld();(!f.highlightedId||!e.some(n=>n.id===f.highlightedId))&&(f.highlightedId=e[0]?.id??null);let t=Bo();if(nt.classList.toggle("narrow",!f.wide),!f.wide&&f.previewOpen&&t){nt.append(Pa(t));return}let r=E("div",{className:"attach-split"});r.append(md(e)),f.wide&&r.append(Pa(t)),nt.append(r)}function md(e){let t=E("div",{className:"attach-list scroll"});if(f.error){let r=E("div");t.append(r),Hr(r,{tone:f.results?"warning":"error",title:"Kaneo",body:f.error,...f.results?{}:{action:{label:"Retry",onClick:()=>void en()}}})}if(f.loading&&e.length===0)return $r(t,{label:"Loading tasks"}),t;if(e.length===0)return Xt(t,{title:f.search.trim()?"No task matches":"This project has no tasks",body:f.search.trim()?"Search runs inside the selected workspace.":"Use the New tab to create the first one."}),t;for(let r of e){let n=Ra({task:r,ticketId:Fo(r),column:{slug:r.status,isFinal:!1,name:Ua(r)},selected:r.id===f.highlightedId,onActivate:()=>hd(r)});n.addEventListener("dblclick",()=>void tn(r)),t.append(n)}return t}function hd(e){if(f.highlightedId=e.id,Ga(e.id),!f.wide){f.previewOpen=!0,Ue();return}Ue()}function Pa(e){let t=E("div",{className:"attach-preview"});if(!e){let c=E("div",{style:"flex:1; display:flex; align-items:center;"});return t.append(c),Xt(c,{title:"Select a task",body:"Pick a task on the left to preview it here before attaching."}),t}Ga(e.id);let r=zo(e);if(!f.wide){let c=E("div");t.append(c),_e(c,{label:"Back",variant:"ghost",size:"sm",onClick:()=>{f.previewOpen=!1,Ue()}})}let n=E("div",{className:"picker-head"});n.append(E("span",{className:"state-pill"},r.columnName)),n.append(E("span",{className:"task-key"},r.ticketId));let o=E("div",{style:"margin-left:auto;"});n.append(o),_e(o,{label:"Kaneo",variant:"ghost",size:"sm",onClick:()=>void Go(r)}),t.append(n),t.append(E("h2",{className:"detail-title"},e.title)),t.append(ya(r)),t.append(wa(r,1200)),t.append(Aa(f.comments[e.id]??null));let s=E("div",{className:"pick-note"}),a=E("div");s.append(a),Dr(a,{label:"Create in a new worktree",checked:f.worktree,onChange:c=>{f.worktree=c}}),s.append(E("p",{className:"muted"},"The agent gets the description and comments."));let d=E("div",{className:"block"});return s.append(d),_e(d,{label:"Start session",variant:"secondary",size:"sm",onClick:()=>{dd(e).catch(c=>{j.toast({kind:"error",message:xt(c),dismiss:!0})})}}),t.append(s),t}function gd(){if(!ot)return;tr(ot);let e=Bo();ot.append(E("span",{className:"attach-hint"},e?"Enter attaches the highlighted task.":"Select a task to attach.")),_e(ot,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void j.close()});let t=E("div");ot.append(t),_e(t,{label:"Attach",size:"sm",disabled:!e,onClick:()=>{e&&tn(e)}})}function Ma(e){let t=E("div",{className:"attach-head"});if(Le?.append(t),e){let c=E("div");t.append(c),Gr(c,{items:[{id:"board",label:f.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:"create",onChange:h=>{f.tab=h==="board"?"board":"create",Me()}})}else t.append(E("h2",{className:"detail-title"},"New Kaneo task"));let r=E("div",{className:"dialog-body"});if(Le?.append(r),f.error){let c=E("div");r.append(c),Hr(c,{tone:"error",title:"Kaneo",body:f.error})}let n=E("div");r.append(n),Nr(n,{label:"Title",value:f.draft.title,placeholder:"What needs doing?",error:f.draft.title.length>or?`Keep it under ${or} characters.`:void 0,onChange:c=>{f.draft.title=c}});let o=E("div");r.append(o),jt(o,{label:"Priority",value:f.draft.priority,options:di.map(c=>({id:c,label:gt(c)})),onChange:c=>{f.draft.priority=c}});let s=E("div");r.append(s),Nr(s,{label:"Description",value:f.draft.description,multiline:!0,rows:5,placeholder:"Markdown is supported.",onChange:c=>{f.draft.description=c}});let a=E("div",{className:"attach-foot"});Le?.append(a),_e(a,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void j.close()});let d=E("div");a.append(d),_e(d,{label:"Create and attach",size:"sm",onClick:()=>void pd()})}function kd(e){let r=(e.kind==="message"?e.text:e.sessionTitle).split(`
`).filter(a=>a.trim().length>0),n=(ua(r[0]??"",or)||"Untitled task").slice(0,or),o=r.slice(1).join(`
`).trim(),s=e.kind==="session"?`Session: ${e.sessionTitle}`:"From a chat message";return{title:n,description:[s,o].filter(Boolean).join(`

`),priority:"medium"}}function Ga(e){f.comments[e]||(f.comments[e]={loading:!0,error:null},Nt.listComments(e).then(t=>{f.comments[e]={loading:!1,error:null,items:t},Ue()}).catch(t=>{f.comments[e]={loading:!1,error:xt(t)},Ue()}))}document.addEventListener("keydown",e=>{if(e.key!=="Enter"||e.shiftKey||f.tab!=="board"||f.source)return;let t=document.activeElement?.tagName.toLowerCase()??"";if(t==="textarea"||t==="button")return;let r=Bo();r&&(e.preventDefault(),tn(r))});j.onReady(e=>{eo(e,document.documentElement),va(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,f.ready=e,f.connected=e.connection.connected,Na||(Na=!0,(Ln(e.item)||Nn(e.item))&&(f.source=e.item,f.draft=kd(e.item),f.tab="create"),xd()),Me(),f.connected&&!Ho&&(Ho=!0,en())});j.onConnection(e=>{let t=f.connected;f.connected=e.connected,t!==e.connected&&(Me(),e.connected&&(Ho=!0,en()))});function xd(){if(!Le||!globalThis.ResizeObserver)return;new ResizeObserver(t=>{let r=t[0]?.contentRect.width??0,n=r===0||r>=id;n!==f.wide&&(f.wide=n,n&&(f.previewOpen=!1),Me())}).observe(Le)}j.onItem(e=>{if(!e||!("providerId"in e))return;let t=e.data;j.toast({kind:"info",message:t?.ticketId?`${t.ticketId} is already attached to this chat.`:"That item is already attached to this chat."})});})();
