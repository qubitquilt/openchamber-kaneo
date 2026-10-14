"use strict";(()=>{var G="openchamber.sdk";var yn="data-oc-scrolling",Ar=`
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
:hover, [${yn}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${yn}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${yn}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${yn}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function vr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",r=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=n.get(o);s!==void 0&&clearTimeout(s),n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Sl=`(${vr.toString()})(document);`;var Rs=/^[a-z][a-z0-9-]{0,39}$/;var ws=e=>Object(e)===e&&!Array.isArray(e),Rr=(e,t)=>Object.keys(e).every(n=>t.includes(n)),As=e=>String(e)===e&&e.length>=1&&e.length<=60,vs=e=>String(e)===e&&e.length>=1&&e.length<=80,Os=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!ws(n)||!Rs.test(n.id)||!As(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Rr(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Rr(n,["kind","id","label","value","options","disabled"])||!vs(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!ws(o)||!Rr(o,["value","label"])||!vs(o.value)||!As(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var Or=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Is=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Cs=/^[A-Za-z0-9_-]{1,80}$/;var Ls=["left","right","top","bottom"];var Ns=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!Ns(o,t+1,n))return!1;return!0},Ir=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Ir);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Ir)}return String(e)===e||Number.isFinite(e)},Cr=e=>{try{return String(e.id)!==e.id||!Cs.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ls.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ns(e.data)||!Ir(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ms=["file","directory","other","missing"],Nr=e=>!!(e&&"sessionId"in e),Pr=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Mr=e=>e!==null&&e.kind==="message",Ur=e=>e!==null&&e.kind==="session";var Us=/^[0-9a-f]{7,64}$/i,Dr=e=>Us.test(e),wn=500,An=32e3,Ds=16e3,Gs=128,$s=200,Hs=2e3,Fs=16e3,zs=80,Bs=200,js=16e3;var Xs=2e3;var Gr=2e4,vn=1024,Rn=2e6;var On=64e3,In=8e3,$r=4e3;var Hr=9e4;var Ks=999,Vs=1e4,Kt=500,Ws=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ys=["stopped","starting","ready","failed"],_l=new Set(Ws),qs=e=>_l.has(e),Js=e=>e&&qs(e)?e:"HOST_REJECTED",It=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(It):Object(e)===e?Object.values(e).every(It):!1,Zs=e=>It(e)&&JSON.stringify(e).length<=js,Ps=e=>e?.trim().slice(0,Bs)??"",Ct=e=>{let t=e.id.trim().slice(0,Gs),n=e.title.trim().slice(0,$s),r=e.url.trim().slice(0,Hs),o=e.text?.trim().slice(0,Fs),s=e.author?.trim().slice(0,zs),i=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o&&(d.text=o),s&&(d.author=s),i==="pull"){let c=Ps(e.branches?.head),h=Ps(e.branches?.base);c&&h&&(d.branches={head:c,base:h})}return Zs(e.data)&&(d.data=e.data),d},Fr=e=>{let t=Ct(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},zr=e=>{let t={text:e.text.trim().slice(0,Ds)};return e.send&&(t.send=!0),t},Br=e=>e===null||!Number.isFinite(e)?null:Math.min(Ks,Math.max(0,Math.round(e))),jr=e=>Number.isFinite(e)?Math.min(Vs,Math.max(0,Math.ceil(e))):0;var Lt=e=>e.length>0&&e.length<=vn&&!e.includes("\0")&&!e.includes("\\");var Cn=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Xs?!1:!e.split("/").some(n=>n==="."||n===".."),yl=new Set(Ys),Xr=e=>!!(e&&"status"in e&&yl.has(String(e.status))&&!("body"in e)),Ln=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Kr=e=>!!(e&&"content"in e&&String(e.content)===e.content),Vr=e=>!!(e&&"written"in e&&e.written===!0),Wr=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),wl=new Set(Ms),Yr=e=>!!(e&&"kind"in e&&"size"in e&&wl.has(String(e.kind))&&Number.isFinite(e.size)),qr=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Al=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),vl=e=>Object(e)===e?e:null,Lr=e=>String(e)===e&&e.length>0,Rl=e=>{if(!Lr(e.id))return null;if(e.ok===!0){let t={channel:G,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Lr(e.error)?{channel:G,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Js(Lr(e.code)?e.code:void 0)}:null},Jr=e=>{let t=vl(e);return!t||t.channel!==G||t.v!==1?null:t.type==="result"?Rl(t):!Al.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Qs=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Ol=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",I=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},ei=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Nn=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${vn} characters without NUL or backslash.`)),Pn=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},M=e=>(e.value+=1,`oc-${e.value}`),no=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(l=>l===t.parent),r=e.requestTimeoutMs??Gr,o=new Set,s=new Set,i=new Set,d=new Set,c=new Set,h=new Set,f=new Set,E=new Set,S=new Set,O=null,P=null,q=new Set,N=new Set,T=null,U=null,V=!1,J=new Map,he=new Map,ge=new Map,B=!1,R={value:0},v=null,Se=null,oe=!1,C=!1,ce=null,Gt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,ke=l=>{t.parent.postMessage(l,"*")},se=(l,u)=>{for(let y of l)try{y(u)}catch(_){console.error(_)}},je=l=>{if(!(l instanceof MessageEvent)||!n(l.source))return;let u=Jr(l.data);if(!u)return;if(u.type==="workspace"){let _=he.get(u.payload.subscriptionId);_&&se([_],u.payload.snapshot);return}if(u.type==="shells"){let _=ge.get(u.payload.subscriptionId);_&&se([_],u.payload.snapshot);return}if(u.type==="ready"){v=u.payload,Se=Gt(u.payload.session),se(o,u.payload),se(s,u.payload.directory),se(i,u.payload.session),Se&&se(d,Se),se(c,u.payload.connection),se(h,u.payload.settings),se(f,u.payload.item);return}if(u.type==="directory"){v&&(v={...v,directory:u.payload.directory}),se(s,u.payload.directory);return}if(u.type==="session"){v&&(v={...v,session:u.payload.session}),u.payload.session?Se?.sessionId!==u.payload.session.id&&(Se=Gt(u.payload.session)):Se=null,se(i,u.payload.session);return}if(u.type==="session-lifecycle"){Se=u.payload,se(d,u.payload);return}if(u.type==="connection"){v&&(v={...v,connection:u.payload.connection}),se(c,u.payload.connection);return}if(u.type==="settings"){v&&(v={...v,settings:u.payload.settings}),se(h,u.payload.settings);return}if(u.type==="item"){v&&(v={...v,item:u.payload.item}),se(f,u.payload.item);return}if(u.type==="status-control-event"){se(E,u.payload);return}if(u.type==="popover-closed"){se(S,u.payload);return}if(u.type==="action"){let _=Y=>{B||ke({channel:G,v:1,type:"action-result",id:u.id,payload:Y})},X=P;if(!X){_({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>X(u.payload)).then(()=>_({ok:!0}),Y=>{let W=(Y instanceof Error?Y.message:String(Y)).trim();_({ok:!1,error:(W||"Action failed.").slice(0,Kt)})});return}if(u.type==="file-open"){let _=u.payload;if(U&&Is(U,_))return;U=_,se(q,u.payload);return}if(u.type==="file-saved"){se(N,u.payload.version);return}if(u.type==="file-snapshot"){let _=W=>{B||ke({channel:G,v:1,type:"file-snapshot-result",id:u.id,payload:W})},X=W=>_({error:(W.trim()||"Could not read the edited file.").slice(0,Kt)}),Y=T;if(!Y){X("This extension does not edit files.");return}Promise.resolve().then(()=>Y(u.payload.purpose)).then(W=>{if(Or(W)>2e7){X(`The file is over ${2e7} ${"bytes"in W?"bytes":"characters"}.`);return}if(W.version.length>256){X(`The snapshot version is over ${256} characters.`);return}_({snapshot:"bytes"in W?{bytes:W.bytes,version:W.version}:{content:W.content,version:W.version}})},W=>X(W instanceof Error?W.message:String(W)));return}if(u.type==="resolve"){let _=Y=>{ke({channel:G,v:1,type:"resolve-result",id:u.id,payload:Y})},X=O;if(!X){_({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>X(u.payload)).then(Y=>_({item:Y?Ct(Y):null}),Y=>{let W=(Y instanceof Error?Y.message:String(Y)).trim();_({error:(W||"Command failed.").slice(0,Kt)})});return}let y=J.get(u.id);if(y){if(clearTimeout(y.timer),J.delete(u.id),u.ok){y.resolve(u.payload);return}y.reject(new I(u.code,u.error))}};t.addEventListener("message",je),ke({channel:G,v:1,type:"hello"});let xe=(l,u=r)=>B||t.parent===t?Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((y,_)=>{let X=setTimeout(()=>{J.delete(l.id),_(new I("HOST_TIMEOUT","Host did not answer in time."))},u);J.set(l.id,{resolve:y,reject:_,timer:X}),ke(l)}),ie=l=>xe(l).then(()=>{}),Q={channel:G,v:1},at=l=>{!B&&t.parent!==t&&ke(l)},$t=()=>at({...Q,type:"file-save"}),cn=l=>{!Qs(l)||!Ol(l)||(l.preventDefault(),$t())},dn=l=>{!Qs(l)||l.key!=="Escape"||v?.surface!=="popover"||!v.popover||(l.preventDefault(),zt(v.popover.id,"escape").catch(()=>{}))},Tt=()=>{let l=v?.surface==="popover"?v.popover:void 0;if(!l)return;let u=oe||C;ce!==u&&(ce=u,Z(l.id,u).catch(()=>{}))},j=()=>{v?.surface!=="popover"||oe||(oe=!0,Tt())},pn=l=>{v?.surface!=="popover"||l.relatedTarget!==null||!oe||(oe=!1,Tt())},un=()=>{v?.surface!=="popover"||C||(C=!0,Tt())},fn=()=>{v?.surface!=="popover"||!C||(C=!1,Tt())},Ie=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new I("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Ht=async l=>{l.kind!=="projects"&&Ie(l.projectId);let u=await xe({...Q,type:"workspace-read",id:M(R),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return u},Ft=async(l,u)=>{l.kind!=="projects"&&Ie(l.projectId);let y=M(R);he.set(y,u);try{await ie({...Q,type:"workspace-subscribe",id:M(R),payload:{subscriptionId:y,query:l}})}catch(_){throw he.delete(y),B||ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:y}}),_}return()=>{!he.delete(y)||B||ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:y}})}},mn=async(l,u)=>{l.kind==="session"&&Ie(l.sessionId),l.kind==="project"&&Ie(l.projectId);let y=M(R);ge.set(y,u);try{await ie({...Q,type:"shells-subscribe",id:M(R),payload:{subscriptionId:y,scope:l}})}catch(_){throw ge.delete(y),B||ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:y}}),_}return()=>{!ge.delete(y)||B||ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:y}})}},St=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!It(l.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&v?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let u=await xe({...Q,type:"storage",id:M(R),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new I("HOST_REJECTED","Host did not return storage data.");return u},zt=(l,u)=>v?.features?.popovers!==!0&&!(v?.surface==="popover"&&v.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ie({...Q,type:"popover-close",id:M(R),payload:u?{id:l,reason:u}:{id:l}}),Z=(l,u)=>v?.features?.popovers!==!0&&!(v?.surface==="popover"&&v.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ie({...Q,type:"popover-anchor",id:M(R),payload:{id:l,active:u}});return t.addEventListener("keydown",dn,!0),t.addEventListener("pointerover",j),t.addEventListener("pointermove",j),t.addEventListener("pointerout",pn),t.addEventListener("focus",un),t.addEventListener("blur",fn),{onAction:l=>(P=l,()=>{P===l&&(P=null)}),listProjects:async()=>{let l=await Ht({kind:"projects"});if(l.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Ht({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Ht({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Ft({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Ft({kind:"worktrees",projectId:l},y=>{y.kind==="worktrees"&&u(y)}),onSessions:(l,u)=>Ft({kind:"sessions",projectId:l},y=>{y.kind==="sessions"&&u(y)}),onRunningShells:(l,u)=>mn(l,u),readShellOutput:async(l,u)=>{Ie(l,128);let y=u?.cursor;if(y!==void 0&&(!Number.isInteger(y)||y<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let _=u?.tailBytes;if(_!==void 0&&(!Number.isInteger(_)||_<1||_>65536))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let Y=await xe({...Q,type:"shell-output",id:M(R),payload:{shellId:l,cursor:y,tailBytes:_}});if(!Y||typeof Y.output!="string"||!Number.isFinite(Y.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async l=>{if(Ie(l,128),(await xe({...Q,type:"shell-stop",id:M(R),payload:{shellId:l}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Ie(l),await ie({...Q,type:"open-session",id:M(R),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let y=Pn(u),_={op:"get",key:l};y&&(_.scope=y);let X=await St(_);return X.op==="get"&&X.found?X.value:void 0},set:async(l,u,y)=>{let _=Pn(y),X={op:"set",key:l,value:u};_&&(X.scope=_),await St(X)},delete:async(l,u)=>{let y=Pn(u),_={op:"delete",key:l};y&&(_.scope=y),await St(_)},keys:async l=>{let u=Pn(l),y={op:"keys"};u&&(y.scope=u);let _=await St(y);if(_.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return _.keys}},onReady:l=>(o.add(l),v&&l(v),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),v&&l(v.directory),()=>{s.delete(l)}),onSession:l=>(i.add(l),v&&l(v.session),()=>{i.delete(l)}),onSessionLifecycle:l=>(d.add(l),Se&&l(Se),()=>{d.delete(l)}),onConnection:l=>(c.add(l),v&&l(v.connection),()=>{c.delete(l)}),onSettings:l=>(h.add(l),v&&l(v.settings),()=>{h.delete(l)}),onItem:l=>(f.add(l),v&&l(v.item),()=>{f.delete(l)}),onStatusControl:l=>(E.add(l),()=>{E.delete(l)}),onPopoverClosed:l=>(S.add(l),()=>{S.delete(l)}),setStatusControls:l=>v?.features?.statusControls!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support status controls.")):Os(l)?ie({...Q,type:"status-controls",id:M(R),payload:{controls:l}}):Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>v?.features?.popovers!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):Cr(l)?ie({...Q,type:"popover-open",id:M(R),payload:l}):Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:zt,setPopoverAnchorActive:Z,onResolve:l=>(O=l,()=>{O===l&&(O=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>wn?Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${wn} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>An)?Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${An} characters.`)):ie({channel:G,v:1,type:"toast",id:M(R),payload:{...l,message:u}})},openUrl:l=>ie({channel:G,v:1,type:"open-url",id:M(R),payload:{url:l}}),openCommit:l=>Dr(l)?ie({channel:G,v:1,type:"open-commit",id:M(R),payload:{sha:l}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>ie({channel:G,v:1,type:"open-surface",id:M(R),payload:{surfaceId:l}}),writeClipboard:l=>ie({channel:G,v:1,type:"clipboard-write",id:M(R),payload:{text:l}}),compose:l=>ie({channel:G,v:1,type:"compose",id:M(R),payload:l}),attach:l=>ie({channel:G,v:1,type:"attach",id:M(R),payload:Ct(l)}),startSession:async l=>{l.projectId!==void 0&&Ie(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Ie(u.directory):(u.name!==void 0&&Ie(u.name,200),u.baseBranch!==void 0&&Ie(u.baseBranch,200)));let y=await xe({channel:G,v:1,type:"start-session",id:M(R),payload:Fr(l)},e.requestTimeoutMs??18e4);if(!Nr(y))throw new I("HOST_REJECTED","Host did not return a session.");return y},prompt:l=>xe({channel:G,v:1,type:"prompt",id:M(R),payload:zr(l)}).then(u=>{if(!Pr(u))throw new I("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>ie({channel:G,v:1,type:"session-link",id:M(R),payload:Ct(l)}),close:()=>ie({channel:G,v:1,type:"close",id:M(R)}),oauthStart:()=>ie({channel:G,v:1,type:"oauth-start",id:M(R)}),oauthDisconnect:()=>ie({channel:G,v:1,type:"oauth-disconnect",id:M(R)}),request:l=>(Cn(l.path)?xe({channel:G,v:1,type:"request",id:M(R),payload:l}):ei()).then(u=>{if(!Ln(u))throw new I("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(Cn(l.path)?xe({channel:G,v:1,type:"service-request",id:M(R),payload:l}):ei()).then(u=>{if(!Ln(u))throw new I("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>xe({channel:G,v:1,type:"service-status",id:M(R)}).then(l=>{if(!Xr(l))throw new I("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(Lt(l)?xe({channel:G,v:1,type:"file-read",id:M(R),payload:{path:l}}):Nn()).then(u=>{if(!Kr(u))throw new I("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>Lt(l)?u.length>Rn?Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${Rn} characters.`)):xe({channel:G,v:1,type:"file-write",id:M(R),payload:{path:l,content:u}}).then(y=>{if(!Vr(y))throw new I("HOST_REJECTED","Host did not confirm the write.");return y}):Nn(),listDir:l=>(Lt(l)?xe({channel:G,v:1,type:"file-list",id:M(R),payload:{path:l}}):Nn()).then(u=>{if(!Wr(u))throw new I("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(Lt(l)?xe({channel:G,v:1,type:"file-stat",id:M(R),payload:{path:l}}):Nn()).then(u=>{if(!Yr(u))throw new I("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),y=l.system?.trim();if(u.length===0||u.length>On)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${On} characters.`));if(y!==void 0&&(y.length===0||y.length>In))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${In} characters.`));let _=l.maxOutputTokens===void 0?void 0:Math.min($r,Math.max(1,Math.floor(l.maxOutputTokens)));if(_!==void 0&&!Number.isFinite(_))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let X={prompt:u};return y!==void 0&&(X.system=y),_!==void 0&&(X.maxOutputTokens=_),xe({channel:G,v:1,type:"generate",id:M(R),payload:X},e.requestTimeoutMs??Hr).then(Y=>{if(!qr(Y))throw new I("HOST_REJECTED","Host did not return generated text.");return Y})},setBadge:l=>ie({channel:G,v:1,type:"badge",id:M(R),payload:{count:Br(l)}}),setHeight:l=>ie({channel:G,v:1,type:"resize",id:M(R),payload:{height:jr(l)}}),onFileOpen:l=>(q.add(l),V||(V=!0,t.addEventListener("keydown",cn,!0)),U&&l(U),()=>{q.delete(l)}),onFileSnapshot:l=>(T=l,()=>{T===l&&(T=null)}),onFileSaved:l=>(N.add(l),()=>{N.delete(l)}),reportFileChange:l=>at({...Q,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:$t,reportFileUnsupported:()=>at({...Q,type:"file-unsupported"}),dispose:()=>{for(let l of he.keys())ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:l}});he.clear();for(let l of ge.keys())ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:l}});ge.clear(),B=!0,O=null,P=null,T=null,q.clear(),N.clear(),V&&t.removeEventListener("keydown",cn,!0),t.removeEventListener("message",je),t.removeEventListener("keydown",dn,!0),t.removeEventListener("pointerover",j),t.removeEventListener("pointermove",j),t.removeEventListener("pointerout",pn),t.removeEventListener("focus",un),t.removeEventListener("blur",fn);for(let l of J.values())clearTimeout(l.timer),l.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),o.clear(),s.clear(),i.clear(),d.clear(),c.clear(),h.clear(),f.clear(),E.clear(),S.clear()}}};var ri=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var gp=new Set(ri);var oi=["none","agent","user"];var bp=new Set(oi);var Il=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Cl=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],si=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of Il)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Cl){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},ro=(e,t)=>{si(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Ll={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},ne=(e,t)=>`var(--${e}, var(--oc-${Ll[e]}, ${t}))`,ut=ne("surface-background","transparent"),Mn=ne("surface-elevated","transparent"),Vt=ne("surface-elevated-foreground","inherit"),Qe=ne("surface-foreground","inherit"),ae=ne("surface-muted-foreground","gray"),Nl=ne("surface-muted","transparent"),Pe=ne("interactive-border","currentColor"),Ce=ne("interactive-hover","transparent"),ft=ne("interactive-active","transparent"),oo=ne("interactive-selection","transparent"),so=ne("interactive-selection-foreground","inherit"),li=ne("interactive-focus-ring","currentColor"),Ke=ne("primary","currentColor"),io=ne("primary-text","inherit"),ao=ne("error-text","inherit"),Pl=ne("font-sans","inherit"),lo=ne("font-mono","monospace"),ci=ne("radius","9px"),co=`calc(${ci} - 2px)`,ii=`calc(${ci} - 4px)`,me=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,ai=`box-shadow: 0 0 0 2px ${li};`,Un=e=>{let t=ne(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${ne(`${e}-text`,"inherit")}; }`},Ml=`
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
`,di=`
.oc-sdk { color: ${Qe}; font-family: ${Pl}; }
.oc-sdk :focus-visible { outline: none; ${ai} }
.oc-sdk-mono { font-family: ${lo}; }
.oc-sdk-muted { color: ${ae}; }
${Un("success")}${Un("warning")}${Un("error")}${Un("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ke}; --oc-sdk-tone-text: ${io}; }

.oc-sdk-btn { border-radius: ${co}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ii}; }
.oc-sdk-btn[data-variant="default"] { color: ${io}; background: ${me(Ke,10,ut)}; border-color: ${me(Ke,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${me(Ke,16,ut)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${me(Ke,22,ut)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Nl}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Mn}; color: ${Vt}; border-color: ${Pe}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ce}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ft}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${ne("status-error","red")}; color: ${ao}; background: ${me("var(--oc-sdk-tone)",7,ut)}; border-color: ${me("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${me("var(--oc-sdk-tone)",9,ut)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${me("var(--oc-sdk-tone)",11,ut)}; }

.oc-sdk-field-note { color: ${ae}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${ao}; }
.oc-sdk-input { border-radius: ${co}; background: ${Mn}; color: ${Vt}; box-shadow: inset 0 0 0 1px ${me(Pe,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${ae}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${li}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${ne("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${ne("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${lo}; }

.oc-sdk-search-icon { color: ${ae}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ke}; }
.oc-sdk-search-clear { border-radius: ${ii}; color: ${ae}; }
.oc-sdk-search-clear:hover { background: ${Ce}; color: ${Qe}; }

.oc-sdk-trigger { border-color: ${Pe}; border-radius: ${co}; background: ${Mn}; color: ${Vt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${ae}; }
.oc-sdk-trigger-chevron { color: ${ae}; }
.oc-sdk-popup { --surface-foreground: ${Vt}; border-color: ${me(Pe,60)}; border-radius: 12px; background: ${Mn}; color: ${Vt}; box-shadow: 0 8px 24px ${me(Qe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ce}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${oo}; color: ${so}; }
.oc-sdk-option-check { color: ${Qe}; }
.oc-sdk-option[data-destructive="true"] { color: ${ao}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${me(ne("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${ae}; }
.oc-sdk-popup-empty { color: ${ae}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Pe}; border-radius: 4px; color: ${Qe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${me(Qe,60,Pe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Pe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ut}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ke}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ai} }
.oc-sdk-check-desc { color: ${ae}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${me(Qe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${ae}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Qe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${so}; background: ${oo}; border-color: ${Pe}; }
.oc-sdk-tab-count { color: ${ae}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Ce}; color: ${ae}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${me("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ce}; }
.oc-sdk-row[aria-selected="true"] { background: ${oo}; color: ${so}; }
.oc-sdk-row-lead { font-family: ${lo}; color: ${ae}; }
.oc-sdk-row-sub { color: ${ae}; }
.oc-sdk-row-meta { color: ${ae}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${ae}; }

.oc-sdk-empty-body { color: ${ae}; }

.oc-sdk-spinner { color: ${ae}; }
.oc-sdk-spinner-ring { border-color: ${Pe}; border-top-color: ${Ke}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${me("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${me("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${ae}; }

.oc-sdk-separator { color: ${ae}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${me(Pe,40)}; }

.oc-sdk-progress-label { color: ${ae}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Pe}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ke}); }

.oc-sdk-text a { color: ${io}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${me(Pe,60)}; }
`,ee=`
${Ar}
${Ml}
${di}`;var pi="oc-sdk-ui-style",et=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},te=e=>{let t=document.getElementById(pi);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}vr(document);let n=document.createElement("style");n.id=pi,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},Le=e=>{let t=A("button",e);return t.type="button",t},le=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)},tt=(e,t,n)=>{n==null||n===""?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)},ui=(e,t)=>{let n=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Ul=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},pe=(e,t)=>{te(ee);let n=t,r=Le("oc-sdk oc-sdk-btn"),o=Ul(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=!!n.disabled||!!n.loading,r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r?r.prepend(o):!n.loading&&o.parentNode===r&&o.remove(),le(s,n.label)},d=()=>{n.disabled||n.loading||n.onClick()};return r.addEventListener("click",d),i(),{update:c=>{n={...n,...c},i()},dispose:()=>{r.removeEventListener("click",d),r.remove()}}};var Nt=(e,t)=>{te(ee);let n=t,r=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let d=()=>{le(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement?s.type=n.password?"password":"text":s.rows=n.rows??3,s.value!==n.value&&(s.value=n.value),s.disabled=!!n.disabled,tt(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let h=!!n.error;r.dataset.invalid=h?"true":"false",s.setAttribute("aria-invalid",h?"true":"false");let f=n.error??n.helper??"";le(i,f),i.hidden=f===""},c=()=>{n.onChange(s.value)};return s.addEventListener("input",c),d(),{update:h=>{n={...n,...h},d()},dispose:()=>{s.removeEventListener("input",c),r.remove()}}};var fi="http://www.w3.org/2000/svg",Dl={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ve=(e,t,n)=>{let r=document.createElementNS(fi,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n&&r.setAttribute("class",n);let o=document.createElementNS(fi,"path");return o.setAttribute("d",Dl[e]),r.append(o),r};var po=(e,t)=>{te(ee);let n=t,r=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Le("oc-sdk-search-clear");s.append(Ve("close",14)),s.tabIndex=-1,r.append(Ve("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let f=n.placeholder??"Search";tt(o,"placeholder",f),o.setAttribute("aria-label",n.label??f),s.setAttribute("aria-label","Clear search"),o.value!==n.value&&(o.value=n.value),r.dataset.active=n.value.trim()===""?"false":"true"},d=()=>{n.value!==""&&n.onChange(""),o.focus()},c=()=>{n.onChange(o.value)},h=f=>{f.key==="Escape"&&o.value!==""&&(f.preventDefault(),d())};return o.addEventListener("input",c),o.addEventListener("keydown",h),s.addEventListener("click",d),i(),n.autofocus&&o.focus(),{update:f=>{n={...n,...f},i()},dispose:()=>{o.removeEventListener("input",c),o.removeEventListener("keydown",h),s.removeEventListener("click",d),r.remove()}}};var We=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},nt=(e,t,n)=>{let r=e.filter(c=>!c.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex(c=>c.id===t);return i===-1?n==="next"?o.id:s.id:r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var mi=(e,t)=>`${e}-${t??""}`,Dn=(e,t,n,r)=>{let o=Le("oc-sdk-option");o.id=mi(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!n.disabled,t==="option"&&o.setAttribute("aria-selected",n.selected?"true":"false"),o.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(Ve("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Gn=(e,t,n,r)=>{let o=mi(n,r);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");tt(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Gl=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;r>o&&n.top-8>o&&(e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`);let s=n.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(n.left-s))}px`)},$n=(e,t,n,r)=>{e.append(n),Gl(n,t);let o=ui(e,r),s=()=>{r()},i=d=>{d.target instanceof Node&&n.contains(d.target)||r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var hi=(e,t)=>{let n=t.trim().toLowerCase();return n?e.filter(r=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n)):[...e]},$l=0,Wt=(e,t)=>{te(ee);let n=t,r=`oc-sdk-select-${$l+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${r}-label`;let i=Le("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let d=A("span","oc-sdk-trigger-value");i.append(d,Ve("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let c="",h=null,f=null,E=A("div","oc-sdk oc-sdk-popup"),S=A("div","oc-sdk-popup-search"),O=A("input","oc-sdk-input");O.type="text",O.autocomplete="off",S.append(O);let P=A("div");P.setAttribute("role","listbox"),P.tabIndex=-1,E.append(P);let q=()=>hi(n.options,n.searchable?c:""),N=()=>n.searchable?O:P,T=C=>{h=C,Gn(P,N(),r,C)},U=()=>{et(P);let C=q();if(C.length===0){let ce=A("div","oc-sdk-popup-empty");ce.textContent="No matches",P.append(ce)}for(let ce of C)P.append(Dn(r,"option",{...ce,selected:ce.id===n.value},{hover:()=>T(ce.id),pick:()=>he(ce.id)}));T(C.some(ce=>ce.id===h)?h:C[0]?.id??null)},V=()=>{let C=f;f=null,C?.(),c="",O.value="",i.setAttribute("aria-expanded","false")},J=()=>{f||n.disabled||(h=n.value,O.placeholder=n.searchPlaceholder??"Search",n.searchable?E.prepend(S):S.remove(),U(),f=$n(o,i,E,V),i.setAttribute("aria-expanded","true"),N().focus())},he=C=>{V(),i.focus(),C!==n.value&&n.onChange(C)},ge=()=>{f?V():J()},B=C=>{!f&&We(C)&&(C.preventDefault(),J())},R=C=>{let ce=We(C);ce?(C.preventDefault(),T(nt(q(),h,ce))):C.key==="Enter"?(C.preventDefault(),h&&he(h)):C.key==="Escape"?(C.preventDefault(),V(),i.focus()):n.searchable&&C.target!==O&&C.key.length===1&&!C.ctrlKey&&!C.metaKey&&O.focus()},v=()=>{c=O.value,U()},Se=C=>{f&&!(C.relatedTarget instanceof Node&&o.contains(C.relatedTarget))&&V()},oe=()=>{le(s,n.label),s.hidden=!n.label;let C=n.options.find(ce=>ce.id===n.value);le(d,C?.label??n.placeholder??"Select"),d.dataset.empty=C?"false":"true",i.disabled=!!n.disabled,f&&U()};return i.addEventListener("click",ge),i.addEventListener("keydown",B),E.addEventListener("keydown",R),O.addEventListener("input",v),o.addEventListener("focusout",Se),oe(),{update:C=>{n={...n,...C},oe()},dispose:()=>{V(),i.removeEventListener("click",ge),i.removeEventListener("keydown",B),E.removeEventListener("keydown",R),O.removeEventListener("input",v),o.removeEventListener("focusout",Se),o.remove()}}};var Hl=(e,t,n)=>{te(ee);let r=t,o=Le("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");n==="checkbox"&&s.append(Ve("check",12));let i=A("span","oc-sdk-check-text"),d=A("span","oc-sdk-check-label"),c=A("span","oc-sdk-check-desc");i.append(d,c),o.append(s,i),e.append(o);let h=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=!!r.disabled,le(d,r.label),le(c,r.description),c.hidden=!r.description},f=()=>{r.disabled||r.onChange(!r.checked)};return o.addEventListener("click",f),h(),{update:E=>{r={...r,...E},h()},dispose:()=>{o.removeEventListener("click",f),o.remove()}}},Hn=(e,t)=>Hl(e,t,"checkbox");var Fn=(e,t)=>{te(ee);let n=t,r=A("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{et(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let d=Le("oc-sdk-tab");d.setAttribute("role","tab");let c=i.id===n.activeId;d.setAttribute("aria-selected",c?"true":"false"),d.tabIndex=c?0:-1,d.dataset.id=i.id;let h=A("span");if(h.textContent=i.label,d.append(h),i.count!==void 0){let f=A("span","oc-sdk-tab-count");f.textContent=String(i.count),d.append(f)}d.addEventListener("click",()=>{i.id!==n.activeId&&n.onChange(i.id)}),r.append(d)}},s=i=>{let d=We(i,"horizontal");if(!d)return;let c=nt(n.items,n.activeId,d);if(c&&c!==n.activeId){i.preventDefault(),n.onChange(c);let h=r.querySelector(`[data-id="${CSS.escape(c)}"]`);h instanceof HTMLElement&&h.focus()}};return r.addEventListener("keydown",s),o(),{update:i=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var zn=(e,t)=>{te(ee);let n=t,r=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let d=null,c=()=>{if(le(o,n.title),le(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){d?.dispose(),d=null;return}let h={label:n.action.label,onClick:n.action.onClick};d?d.update(h):d=pe(i,{...h,variant:"outline",size:"sm"})};return c(),{update:h=>{n={...n,...h},c()},dispose:()=>{d?.dispose(),d=null,r.remove()}}};var rt=(e,t={})=>{te(ee);let n=t,r=A("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",le(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:d=>{n={...n,...d},i()},dispose:()=>{r.remove()}}};var Pt=(e,t)=>{te(ee);let n=t,r=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),d=A("div","oc-sdk-banner-action");o.append(s,i),r.append(o,d),e.append(r);let c=null,h=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),le(s,n.title),le(i,n.body),i.hidden=!n.body,d.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let f={label:n.action.label,onClick:n.action.onClick};c?c.update(f):c=pe(d,{...f,variant:"outline",size:"xs"})};return h(),{update:f=>{n={...n,...f},h()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var gi=e=>e.filter(t=>!("separator"in t)),zl=0,uo=(e,t)=>{te(ee);let n=t,r=`oc-sdk-menu-${zl+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,d=null,c=pe(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{i?S():O()}}),h=o.querySelector("button");h?.setAttribute("aria-haspopup","menu");let f=T=>{d=T,Gn(s,s,r,T)},E=()=>{et(s);for(let T of n.items){if("separator"in T){let U=A("div","oc-sdk-separator");U.dataset.labeled="false",s.append(U);continue}s.append(Dn(r,"menuitem",T,{hover:()=>f(T.id),pick:()=>P(T.id)}))}f(gi(n.items).some(T=>T.id===d)?d:null)},S=()=>{let T=i;i=null,T?.(),d=null,h?.setAttribute("aria-expanded","false")},O=()=>{i||!h||(E(),i=$n(o,h,s,S),h.setAttribute("aria-expanded","true"),s.focus())},P=T=>{S(),h?.focus(),n.onSelect(T)},q=T=>{let U=We(T);U?(T.preventDefault(),f(nt(gi(n.items),d,U))):T.key==="Enter"||T.key===" "?(T.preventDefault(),d&&P(d)):T.key==="Escape"&&(T.preventDefault(),S(),h?.focus())},N=T=>{i&&!(T.relatedTarget instanceof Node&&o.contains(T.relatedTarget))&&S()};return s.addEventListener("keydown",q),o.addEventListener("focusout",N),{update:T=>{n={...n,...T},c.update({label:n.label,variant:n.variant,size:n.size}),i&&E()},dispose:()=>{S(),s.removeEventListener("keydown",q),o.removeEventListener("focusout",N),c.dispose(),o.remove()}}};var Bn="https://cloud.kaneo.app",ki=Bn.replace(/\/api\/?$/,""),bi="kaneo-tasks",fo=100,xi=["no-priority","low","medium","high","urgent"];var Ei={"no-priority":0,low:1,medium:2,high:3,urgent:4};var ve=class extends Error{status;code;constructor(t,n,r){super(r),this.name="KaneoError",this.status=t,this.code=n}};function Bl(e){if(!e)return;let t={};for(let[n,r]of Object.entries(e))r==null||r===""||(t[n]=String(r));return Object.keys(t).length>0?t:void 0}function jl(e,t){let n=typeof t=="object"&&t!==null?t:{},r=typeof n.message=="string"&&n.message?n.message:`Kaneo answered ${e}.`;return new ve(e,n.code??`HTTP_${e}`,r)}var Xl=10,Kl=2,Vl=800;function Ti(e){async function t({method:r,path:o,query:s,body:i}){let d=Bl(s),c="/api"+o,h;for(let S=0;h=await e({method:r,path:c,...d?{query:d}:{},...i===void 0?{}:{body:JSON.stringify(i)}}),!(h.status!==429||S>=Kl);S+=1)await new Promise(O=>setTimeout(O,Vl*2**S));let f=h,E;if(f.body)try{E=JSON.parse(f.body)}catch{throw f.status>=400?new ve(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new ve(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw jl(f.status,E);return E}async function n(r){let o=encodeURIComponent(r),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:fo}}),i=s.data,d=s.pagination,c=1;for(;c<Math.min(d.totalPages,Xl);){c+=1;let h=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:c,limit:fo}});for(let f of h.data.columns){let E=i.columns.find(S=>S.id===f.id);E&&E.tasks.push(...f.tasks)}i.archivedTasks.push(...h.data.archivedTasks),i.plannedTasks.push(...h.data.plannedTasks)}return{board:i,pagination:d,truncated:d.totalPages>c}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(r,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:r,includeArchived:o?"true":void 0}}),getBoard:n,getTask:r=>t({method:"GET",path:`/task/${encodeURIComponent(r)}`,query:{view:"detail"}}),getTaskByTicketId:(r,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(r)}`,query:{workspaceId:o}}),listAssignedTasks:r=>t({method:"GET",path:"/task/assigned",query:{workspaceId:r}}),search:(r,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:r,projectId:s.projectId,limit:s.limit??30}}),listLabels:r=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(r)}`}),listColumns:r=>t({method:"GET",path:`/column/${encodeURIComponent(r)}`}),listComments:r=>t({method:"GET",path:`/comment/${encodeURIComponent(r)}`}),createComment:(r,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(r)}`,body:{content:o}}),createTask:(r,o)=>t({method:"POST",path:`/task/${encodeURIComponent(r)}`,body:o}),updateTaskStatus:(r,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(r)}`,body:{status:o}}),updateTaskPriority:(r,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(r)}`,body:{priority:o}})}}function Wl(e,t){this.v=e,this.k=t}function Si(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Yl(e){if(Array.isArray(e))return e}function ql(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,s,i,d=[],c=!0,h=!1;try{if(s=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=s.call(n)).done)&&(d.push(r.value),d.length!==t);c=!0);}catch(f){h=!0,o=f}finally{try{if(!c&&n.return!=null&&(i=n.return(),Object(i)!==i))return}finally{if(h)throw o}}return d}}function Jl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Zl(e,t){return Yl(e)||ql(e,t)||Ql(e,t)||Jl()}function Ql(e,t){if(e){if(typeof e=="string")return Si(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Si(e,t):void 0}}function jn(e){var t,n;function r(s,i){try{var d=e[s](i),c=d.value,h=c instanceof Wl;Promise.resolve(h?c.v:c).then(function(f){if(h){var E=s==="return"&&c.k?s:"next";if(!c.k||f.done)return r(E,f);f=e[E](f).value}o(!!d.done,f)},function(f){r("throw",f)})}catch(f){o(2,f)}}function o(s,i){s===2?t.reject(i):t.resolve({value:i,done:s}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(s,i){return new Promise(function(d,c){var h={key:s,arg:i,resolve:d,reject:c,next:null};n?n=n.next=h:(t=n=h,r(s,i))})},typeof e.return!="function"&&(this.return=void 0)}jn.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},jn.prototype.next=function(e){return this._invoke("next",e)},jn.prototype.throw=function(e){return this._invoke("throw",e)},jn.prototype.return=function(e){return this._invoke("return",e)};var Di=Object.entries,_i=Object.setPrototypeOf,ec=Object.isFrozen,Gi=Object.getPrototypeOf,$i=Object.getOwnPropertyDescriptor,be=Object.freeze,Te=Object.seal,Mt=Object.create,Hi=typeof Reflect<"u"&&Reflect,_o=Hi.apply,yo=Hi.construct;be||(be=function(t){return t});Te||(Te=function(t){return t});_o||(_o=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});yo||(yo=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ye=re(Array.prototype.forEach);Array.prototype.indexOf;var tc=re(Array.prototype.lastIndexOf),yi=re(Array.prototype.pop),Yt=re(Array.prototype.push),nc=re(Array.prototype.slice),rc=re(Array.prototype.splice),Ut=Array.isArray,mo=Fi(Set),ho=re(Set.prototype.add),qt=re(Set.prototype.has),mt=re(String.prototype.toLowerCase),go=re(String.prototype.toString),wi=re(String.prototype.match),Jt=re(String.prototype.replace),Ai=re(String.prototype.indexOf),oc=re(String.prototype.trim),sc=re(Number.prototype.toString),ic=re(Boolean.prototype.toString),vi=typeof BigInt>"u"?null:re(BigInt.prototype.toString),Ri=typeof Symbol>"u"?null:re(Symbol.prototype.toString),Re=re(Object.prototype.hasOwnProperty),Zt=re(Object.prototype.toString),Ee=re(RegExp.prototype.test),qe=Fi(TypeError);function re(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return _o(e,t,r)}}function Fi(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return yo(e,n)}}function H(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mt;if(_i&&_i(e,null),!Ut(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(ec(t)||(t[r]=s),o=s)}e[o]=!0}return e}function ac(e){for(let t=0;t<e.length;t++)Re(e,t)||(e[t]=null);return e}function Ne(e){let t=Mt(null);for(let r of Di(e)){var n=Zl(r,2);let o=n[0],s=n[1];Re(e,o)&&(Ut(s)?t[o]=ac(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Ne(s):t[o]=s)}return t}function lc(e){switch(typeof e){case"string":return e;case"number":return sc(e);case"boolean":return ic(e);case"bigint":return vi?vi(e):"0";case"symbol":return Ri?Ri(e):"Symbol()";case"undefined":return Zt(e);case"function":case"object":{if(e===null)return Zt(e);let t=e,n=Me(t,"toString");if(typeof n=="function"){let r=n(t);return typeof r=="string"?r:Zt(r)}return Zt(e)}default:return Zt(e)}}function Me(e,t){for(;e!==null;){let r=$i(e,t);if(r){if(r.get)return re(r.get);if(typeof r.value=="function")return re(r.value)}e=Gi(e)}function n(){return null}return n}function cc(e,t){for(;e!==null;){let n=$i(e,t);if(n)return n.get?re(n.get):null;e=Gi(e)}return null}function dc(e){try{return Ee(e,""),!0}catch{return!1}}var Oi=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ko=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bo=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),pc=be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),xo=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),uc=be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ii=be(["#text"]),Ci=be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Eo=be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Li=be(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Xn=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),fc=Te(/{{[\w\W]*|^[\w\W]*}}/g),mc=Te(/<%[\w\W]*|^[\w\W]*%>/g),hc=Te(/\${[\w\W]*/g),gc=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),kc=Te(/^aria-[\-\w]+$/),Ni=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bc=Te(/^(?:\w+script|data):/i),xc=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ec=Te(/^html$/i),Tc=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),To=Te(/<[/\w!]/g),Pi=Te(/<[/\w]/g),Sc=Te(/<\/no(script|embed|frames)/i),Mi=Te(/\/>/i),ue={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},_c=be(H({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),yc=function(){return typeof window>"u"?null:window},wc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Ui=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},ot=function(t,n,r,o){return Re(t,n)&&Ut(t[n])?H(o.base?Ne(o.base):{},t[n],o.transform):r},So=function(t,n,r){let o=Re(t,n)?t[n]:void 0;return o&&typeof o=="object"?Ne(o):r()};function zi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:yc(),t=b=>zi(b);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ue.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,o=r.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,i=e.Node,d=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let h=e.DOMParser,f=e.trustedTypes,E=d.prototype,S=Me(E,"cloneNode"),O=Me(E,"remove"),P=Me(E,"removeAttributeNode"),q=Me(E,"nextSibling"),N=Me(E,"childNodes"),T=Me(E,"parentNode"),U=Me(E,"shadowRoot"),V=Me(E,"attributes"),J=i&&i.prototype?Me(i.prototype,"nodeType"):null,he=i&&i.prototype?Me(i.prototype,"nodeName"):null,ge=i&&i.prototype?Me(i.prototype,"ownerDocument"):null,B=function(a){return J?J(a):a.nodeType},R=function(a){return he?he(a):a.nodeName},v=cc(E,"namespaceURI"),Se=function(a){return v?v(a):a.namespaceURI};if(typeof s=="function"){let b=n.createElement("template");b.content&&b.content.ownerDocument&&(n=b.content.ownerDocument)}let oe,C="",ce,Gt=!1,ke=0,se=function(){if(ke>0)throw qe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},je=function(a){se(),ke++;try{return oe.createHTML(a)}finally{ke--}},xe=function(a){se(),ke++;try{return oe.createScriptURL(a)}finally{ke--}},ie=function(){return Gt||(ce=wc(f,o),Gt=!0),ce},Q=n,at=Q.implementation,$t=Q.createNodeIterator,cn=Q.createDocumentFragment,dn=Q.getElementsByTagName,Tt=r.importNode,j=Ui();t.isSupported=typeof Di=="function"&&typeof T=="function"&&at&&at.createHTMLDocument!==void 0;let pn=fc,un=mc,fn=hc,Ie=gc,Ht=kc,Ft=bc,mn=xc,St=Tc,zt=Ni,Z=null,l=H({},[...Oi,...ko,...bo,...xo,...Ii]),u=null,y=H({},[...Ci,...Eo,...Li,...Xn]),_=Object.seal(Mt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),X=null,Y=null,W=Object.seal(Mt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Qo=!0,ir=!0,es=!1,ar=!0,Xe=!1,lt=!0,ct=!1,lr=!1,hn=null,gn=null,cr=!1,_t=!1,kn=!1,bn=!1,ts=!0,ns=!1,rs="user-content-",dr=!0,pr=!1,dt=null,yt={},pt=null,os=H({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),ss=null,is=H({},["audio","video","img","source","image","track"]),as=null,ls=H({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),xn="http://www.w3.org/1998/Math/MathML",En="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",wt=Fe,ur=!1,fr=null,nl=H({},[xn,En,Fe],go),cs=be(["mi","mo","mn","ms","mtext"]),mr=H({},cs),ds=be(["annotation-xml"]),hr=H({},ds),rl=H({},["title","style","font","a","script"]),Bt=null,ol=["application/xhtml+xml","text/html"],sl="text/html",de=null,At=null,il=n.createElement("form"),ps=function(a){return a instanceof RegExp||a instanceof Function},gr=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(At&&At===a)return;(!a||typeof a!="object")&&(a={}),a=Ne(a),Bt=ol.indexOf(a.PARSER_MEDIA_TYPE)===-1?sl:a.PARSER_MEDIA_TYPE,de=Bt==="application/xhtml+xml"?go:mt,Z=ot(a,"ALLOWED_TAGS",l,{transform:de}),u=ot(a,"ALLOWED_ATTR",y,{transform:de}),fr=ot(a,"ALLOWED_NAMESPACES",nl,{transform:go}),as=ot(a,"ADD_URI_SAFE_ATTR",ls,{transform:de,base:ls}),ss=ot(a,"ADD_DATA_URI_TAGS",is,{transform:de,base:is}),pt=ot(a,"FORBID_CONTENTS",os,{transform:de}),X=ot(a,"FORBID_TAGS",Ne({}),{transform:de}),Y=ot(a,"FORBID_ATTR",Ne({}),{transform:de}),yt=Re(a,"USE_PROFILES")?a.USE_PROFILES&&typeof a.USE_PROFILES=="object"?Ne(a.USE_PROFILES):a.USE_PROFILES:!1,Qo=a.ALLOW_ARIA_ATTR!==!1,ir=a.ALLOW_DATA_ATTR!==!1,es=a.ALLOW_UNKNOWN_PROTOCOLS||!1,ar=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Xe=a.SAFE_FOR_TEMPLATES||!1,lt=a.SAFE_FOR_XML!==!1,ct=a.WHOLE_DOCUMENT||!1,_t=a.RETURN_DOM||!1,kn=a.RETURN_DOM_FRAGMENT||!1,bn=a.RETURN_TRUSTED_TYPE||!1,cr=a.FORCE_BODY||!1,ts=a.SANITIZE_DOM!==!1,ns=a.SANITIZE_NAMED_PROPS||!1,dr=a.KEEP_CONTENT!==!1,pr=a.IN_PLACE||!1,zt=dc(a.ALLOWED_URI_REGEXP)?a.ALLOWED_URI_REGEXP:Ni,wt=typeof a.NAMESPACE=="string"?a.NAMESPACE:Fe,mr=So(a,"MATHML_TEXT_INTEGRATION_POINTS",()=>H({},cs)),hr=So(a,"HTML_INTEGRATION_POINTS",()=>H({},ds));let p=So(a,"CUSTOM_ELEMENT_HANDLING",()=>Mt(null));if(_=Mt(null),Re(p,"tagNameCheck")&&ps(p.tagNameCheck)&&(_.tagNameCheck=p.tagNameCheck),Re(p,"attributeNameCheck")&&ps(p.attributeNameCheck)&&(_.attributeNameCheck=p.attributeNameCheck),Re(p,"allowCustomizedBuiltInElements")&&typeof p.allowCustomizedBuiltInElements=="boolean"&&(_.allowCustomizedBuiltInElements=p.allowCustomizedBuiltInElements),Te(_),Xe&&(ir=!1),kn&&(_t=!0),yt&&(Z=H({},Ii),u=Mt(null),yt.html===!0&&(H(Z,Oi),H(u,Ci)),yt.svg===!0&&(H(Z,ko),H(u,Eo),H(u,Xn)),yt.svgFilters===!0&&(H(Z,bo),H(u,Eo),H(u,Xn)),yt.mathMl===!0&&(H(Z,xo),H(u,Li),H(u,Xn))),W.tagCheck=null,W.attributeCheck=null,Re(a,"ADD_TAGS")&&(typeof a.ADD_TAGS=="function"?W.tagCheck=a.ADD_TAGS:Ut(a.ADD_TAGS)&&(Z===l&&(Z=Ne(Z)),H(Z,a.ADD_TAGS,de))),Re(a,"ADD_ATTR")&&(typeof a.ADD_ATTR=="function"?W.attributeCheck=a.ADD_ATTR:Ut(a.ADD_ATTR)&&(u===y&&(u=Ne(u)),H(u,a.ADD_ATTR,de))),Re(a,"ADD_FORBID_CONTENTS")&&Ut(a.ADD_FORBID_CONTENTS)&&(pt===os&&(pt=Ne(pt)),H(pt,a.ADD_FORBID_CONTENTS,de)),dr&&(Z["#text"]=!0),ct&&H(Z,["html","head","body"]),Z.table&&(H(Z,["tbody"]),delete X.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let g=oe;oe=a.TRUSTED_TYPES_POLICY;try{C=je("")}catch(k){throw oe=g,k}}else a.TRUSTED_TYPES_POLICY===null?(oe=void 0,C=""):(oe===void 0&&(oe=ie()),oe&&typeof C=="string"&&(C=je("")));be&&be(a),At=a},us=H({},[...ko,...bo,...pc]),fs=H({},[...xo,...uc]),al=function(a,p,g){return p.namespaceURI===Fe?a==="svg":p.namespaceURI===xn?a==="svg"&&(g==="annotation-xml"||mr[g]):!!us[a]},ll=function(a,p,g){return p.namespaceURI===Fe?a==="math":p.namespaceURI===En?a==="math"&&hr[g]:!!fs[a]},cl=function(a,p,g){return p.namespaceURI===En&&!hr[g]||p.namespaceURI===xn&&!mr[g]?!1:!fs[a]&&(rl[a]||!us[a])},dl=function(a){let p=Se(a),g=mt(R(a)),k=T(a),w,L;return k&&B(k)===ue.element?(w={namespaceURI:Se(k)},L=mt(R(k))):(w={namespaceURI:wt},L="template"),fr[p]?p===En?al(g,w,L):p===xn?ll(g,w,L):p===Fe?cl(g,w,L):!!(Bt==="application/xhtml+xml"&&fr[p]):!1},Je=function(a){Yt(t.removed,{element:a});try{T(a).removeChild(a)}catch{if(O(a),!T(a))throw qe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},ms=function(a,p,g){try{P(a,p)}catch{try{a.removeAttribute(g)}catch{}}},kr=function(a){xr(a);let p=N(a);p&&Ye(nc(p),k=>{try{O(k)}catch{}});let g=B(a)===ue.element?V(a):null;if(g)for(let k=g.length-1;k>=0;--k){let w=g[k],L=w&&w.name;typeof L=="string"&&ms(a,w,L)}},vt=function(a,p,g){if(!g)try{g=p.getAttributeNode(a)}catch{g=null}Yt(t.removed,{attribute:g||null,from:p});try{g?P(p,g):p.removeAttribute(a)}catch{try{p.removeAttribute(a)}catch{}}if(a==="is")if(_t||kn)try{Je(p)}catch{}else try{p.setAttribute(a,"")}catch{}},hs=function(a){let p=V(a);if(p)for(let g=p.length-1;g>=0;--g){let k=p[g],w=k&&k.name;typeof w!="string"||u[de(w)]||ms(a,k,w)}},br=function(a,p){let g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,k=[a];for(;k.length>0;){let w=k.pop();if(p(w)===!1)continue;if(g&&B(w)===ue.element){let D=U(w);Ze(D)&&k.push(D)}let L=N(w);if(L)for(let D=L.length-1;D>=0;--D)k.push(L[D])}},xr=function(a){br(a,p=>{B(p)===ue.element&&hs(p)})},Er=function(a){let p=[];return br(a,g=>{p.push(g)},!0),p},pl=function(a,p){let g=mo();Ye(Er(a),k=>{B(k)===ue.element&&ho(g,k)}),Ye(p,k=>{B(k)===ue.element&&!qt(g,k)&&hs(k)})},gs=function(a,p){let g=!1;return Ye(t.removed,k=>{k.element&&(g=g||k.element===a,xr(k.element))}),pl(a,p),g},ul=8,fl=function(a,p){let g=dt,k=null,w=()=>(k||(k=mo(),Ye(p,L=>{ho(k,L)})),k);for(let L=0;;L++){let D=Er(a),fe=[a],ze=!1;if(Ye(D,_e=>{B(_e)===ue.documentFragment?Yt(fe,_e):!ze&&!qt(g,_e)&&(ze=qt(w(),_e))}),!ze)return;if(L>=ul)throw qe("the tree kept changing during in-place sanitization; refusing to return it");Ye(fe,(_e,we)=>{ml(_e,we>0,a,w())})}},ml=function(a,p,g,k){let w=Tr(a),L;for(;L=w.nextNode();)!qt(k,L)||qt(dt,L)||(p&&Ge(j.uponSanitizeShadowNode,L,null),_r(L,g),yr(L,g),Ze(L.content)&&Xt(L.content))},hl=function(a){dt&&ho(dt,a)},ks=function(a,p){return lt?a==="patchsrc"?!0:a==="for"&&p!=="label"&&p!=="output":!1},gl=function(a){lt&&br(a,p=>{let g=B(p);if(g===ue.processingInstruction||g===ue.comment&&Ee(Pi,p.data)){try{O(p)}catch{}return!1}if(g===ue.element){let k=p,w=de(R(p));try{k.hasAttribute&&k.hasAttribute("patchsrc")&&k.removeAttribute("patchsrc"),k.hasAttribute&&k.hasAttribute("for")&&ks("for",w)&&k.removeAttribute("for")}catch{}}return!0})},bs=function(a){let p=null,g=null;if(cr)a="<remove></remove>"+a;else{let L=wi(a,/^[\r\n\t ]+/);g=L&&L[0]}Bt==="application/xhtml+xml"&&wt===Fe&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");let k=oe?je(a):a;if(wt===Fe)try{p=new h().parseFromString(k,Bt)}catch{}if(!p||!p.documentElement){p=at.createDocument(wt,"template",null);try{p.documentElement.innerHTML=ur?C:k}catch{}}let w=p.body||p.documentElement;return a&&g&&w.insertBefore(n.createTextNode(g),w.childNodes[0]||null),wt===Fe?dn.call(p,ct?"html":"body")[0]:ct?p.documentElement:w},Tr=function(a){let p=ge?ge(a):a.ownerDocument;return $t.call(p||a,a,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tn=function(a){return a=Jt(a,pn," "),a=Jt(a,un," "),a=Jt(a,fn," "),a},Sr=function(a){var p;xs(a);let g=(p=a.querySelectorAll)===null||p===void 0?void 0:p.call(a,"template");g&&Ye(g,k=>{Ze(k.content)&&Sr(k.content)})},xs=function(a){a.normalize();let p=ge?ge(a):a.ownerDocument,g=$t.call(p||a,a,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),k=g.nextNode();for(;k;)k.data=Tn(k.data),k=g.nextNode()},Sn=function(a){let p=he?he(a):null;return typeof p!="string"||de(p)!=="form"?!1:typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||a.attributes!==V(a)||typeof a.removeAttribute!="function"||typeof a.removeAttributeNode!="function"||typeof a.getAttributeNode!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function"||a.nodeType!==J(a)||a.childNodes!==N(a)},Ze=function(a){if(!J||typeof a!="object"||a===null)return!1;try{return J(a)===ue.documentFragment}catch{return!1}},jt=function(a){if(!J||typeof a!="object"||a===null)return!1;try{return typeof J(a)=="number"}catch{return!1}};function Ge(b,a,p){b.length!==0&&Ye(b,g=>{g.call(t,a,p,At)})}let kl=function(a,p){return!!(lt&&a.hasChildNodes()&&!jt(a.firstElementChild)&&Ee(To,a.textContent)&&Ee(To,a.innerHTML)||lt&&_c[p]&&B(a)===ue.element&&Se(a)===Fe&&(jt(a.firstElementChild)||typeof a.textContent=="string"&&Ee(To,a.textContent))||a.nodeType===ue.processingInstruction||lt&&a.nodeType===ue.comment&&Ee(Pi,a.data))},_n=function(a,p){if(a instanceof RegExp)return Ee(a,p);if(a instanceof Function){for(var g=arguments.length,k=new Array(g>2?g-2:0),w=2;w<g;w++)k[w-2]=arguments[w];return!!a(p,...k)}return!1},bl=function(a,p,g){if(!X[p]&&Ss(p)&&_n(_.tagNameCheck,p))return!1;if(dr&&!pt[p]&&!pt[mt(p)]){let k=T(a),w=N(a);if(w&&k){let L=w.length;for(let D=L-1;D>=0;--D){let fe=a===g?S(w[D],!0):w[D];k.insertBefore(fe,q(a))}}}return Je(a),!0},Es=function(a,p,g,k){return a.length===0?p:p===g||p===k?Ne(p):p},Rt=function(a,p){return a===p||T(a)!==null?!1:(pr&&xr(a),!0)},_r=function(a,p){if(hl(a),Ge(j.beforeSanitizeElements,a,null),Rt(a,p))return!0;if(Sn(a))return Je(a),!0;let g=de(R(a));if(Z=Es(j.uponSanitizeElement,Z,l,hn),Ge(j.uponSanitizeElement,a,{tagName:g,allowedTags:Z}),Rt(a,p))return!0;if(kl(a,g))return Je(a),!0;if(X[g]||!(W.tagCheck instanceof Function&&W.tagCheck(g))&&!Z[g]){let k=bl(a,g,p);return k===!1&&(Ge(j.afterSanitizeElements,a,null),Rt(a,p))?!0:k}if(B(a)===ue.element&&!dl(a)||(g==="noscript"||g==="noembed"||g==="noframes")&&Ee(Sc,a.innerHTML))return Je(a),!0;if(Xe&&a.nodeType===ue.text){let k=Tn(a.textContent);a.textContent!==k&&(Yt(t.removed,{element:a.cloneNode()}),a.textContent=k)}return Ge(j.afterSanitizeElements,a,null),Rt(a,p)},Ts=function(a,p,g){if(Y[p]||ks(p,a)||ts&&(p==="id"||p==="name")&&(g in n||g in il))return!1;let k=u[p]||W.attributeCheck instanceof Function&&W.attributeCheck(p,a);return ir&&Ee(Ie,p)||Qo&&Ee(Ht,p)?!0:k?as[p]||Ee(zt,Jt(g,mn,""))||(p==="src"||p==="xlink:href"||p==="href")&&a!=="script"&&Ai(g,"data:")===0&&ss[a]||es&&!Ee(Ft,Jt(g,mn,""))?!0:!g:Ss(a)&&_n(_.tagNameCheck,a)&&_n(_.attributeNameCheck,p,a)||p==="is"&&_.allowCustomizedBuiltInElements&&_n(_.tagNameCheck,g)},xl=H({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Ss=function(a){return!xl[mt(a)]&&Ee(St,a)},El=function(a,p,g,k){if(oe&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!g)switch(f.getAttributeType(a,p)){case"TrustedHTML":return je(k);case"TrustedScriptURL":return xe(k)}return k},Tl=function(a,p,g,k){try{return g?a.setAttributeNS(g,p,k):a.setAttribute(p,k),Sn(a)?(Je(a),!1):!0}catch{return vt(p,a),!1}},_s=function(a,p){return lt&&Ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,p)?!0:mt(a)==="attributename"&&wi(p,"href")!==null},yr=function(a,p){if(Ge(j.beforeSanitizeAttributes,a,null),Rt(a,p))return;let g=a.attributes;if(!g||Sn(a))return;u=Es(j.uponSanitizeAttribute,u,y,gn);let k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},w=g.length,L=de(a.nodeName);for(;w--;){let D=g[w],fe=D.name,ze=D.namespaceURI,_e=D.value,we=de(fe),Ot=_e,Ae=fe==="value"?Ot:oc(Ot),ys=!1;if(k.attrName=we,k.attrValue=Ae,k.keepAttr=!0,k.forceKeepAttr=void 0,Ge(j.uponSanitizeAttribute,a,k),Ae=k.attrValue,ns&&(we==="id"||we==="name")&&Ai(Ae,rs)!==0&&(vt(fe,a,D),Ae=rs+Ae,ys=!0),_s(fe,Ae)){vt(fe,a,D);continue}if(!k.forceKeepAttr){if(!k.keepAttr){vt(fe,a,D);continue}if(!ar&&Ee(Mi,Ae)){vt(fe,a,D);continue}if(Xe&&(Ae=Tn(Ae)),!Ts(L,we,Ae)){vt(fe,a,D);continue}Ae=El(L,we,ze,Ae),Ae!==Ot&&Tl(a,fe,ze,Ae)&&ys&&yi(t.removed)}}Ge(j.afterSanitizeAttributes,a,null),Rt(a,p)},Xt=function(a){let p=null,g=Tr(a);for(Ge(j.beforeSanitizeShadowDOM,a,null);p=g.nextNode();)if(Ge(j.uponSanitizeShadowNode,p,null),_r(p,a),yr(p,a),Ze(p.content)&&Xt(p.content),B(p)===ue.element){let k=U(p);Ze(k)&&(wr(k),Xt(k))}Xe&&xs(a),Ge(j.afterSanitizeShadowDOM,a,null)},wr=function(a){let p=[{node:a,shadow:null}];for(;p.length>0;){let g=p.pop();if(g.shadow){Xt(g.shadow);continue}let k=g.node,w=B(k)===ue.element,L=N(k);if(L)for(let D=L.length-1;D>=0;--D)p.push({node:L[D],shadow:null});if(w){let D=he?he(k):null;if(typeof D=="string"&&de(D)==="template"){let fe=k.content;Ze(fe)&&p.push({node:fe,shadow:null})}}if(w){let D=U(k);Ze(D)&&p.push({node:null,shadow:D},{node:D,shadow:null})}}};return t.sanitize=function(b){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,g=null,k=null,w=null;if(ur=!b,ur&&(b="<!-->"),typeof b!="string"&&!jt(b)&&(b=lc(b),typeof b!="string"))throw qe("dirty is not a string, aborting");if(!t.isSupported)return b;lr?(Z=hn,u=gn):gr(a),(j.uponSanitizeElement.length>0||j.uponSanitizeAttribute.length>0)&&(Z=Ne(Z)),j.uponSanitizeAttribute.length>0&&(u=Ne(u)),t.removed=[];let L=pr&&typeof b!="string"&&jt(b),D=[],fe=dt;if(L){gl(b);let we=R(b);if(typeof we=="string"){let Ot=de(we);if(!Z[Ot]||X[Ot])throw kr(b),qe("root node is forbidden and cannot be sanitized in-place")}if(Sn(b))throw kr(b),qe("root node is clobbered and cannot be sanitized in-place");D=Er(b),dt=mo()}else if(jt(b))p=bs("<!---->"),g=p.ownerDocument.importNode(b,!0),g.nodeType===ue.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?p=g:p.appendChild(g),wr(p);else{if(!_t&&!Xe&&!ct&&b.indexOf("<")===-1)return oe&&bn?je(b):b;if(p=bs(b),!p)return _t?null:bn?C:""}p&&cr&&Je(p.firstChild);let ze=L?b:p;try{L&&wr(b);let we=Tr(ze);for(;k=we.nextNode();)_r(k,ze),yr(k,ze),Ze(k.content)&&Xt(k.content);L&&fl(b,D)}catch(we){throw L&&(kr(b),gs(b,D)),we}finally{dt=fe}if(L){if(gs(b,D))throw qe("a node selected for removal could not be safely returned; refusing to sanitize in place");return Xe&&Sr(b),b}if(_t){if(Xe&&Sr(p),kn)for(w=cn.call(p.ownerDocument);p.firstChild;)w.appendChild(p.firstChild);else w=p;return(u.shadowroot||u.shadowrootmode)&&(w=Tt.call(r,w,!0)),w}let _e=ct?p.outerHTML:p.innerHTML;return ct&&Z["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&Ee(Ec,p.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+_e),Xe&&(_e=Tn(_e)),oe&&bn?je(_e):_e},t.setConfig=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};gr(b),lr=!0,hn=Z,gn=u},t.clearConfig=function(){At=null,lr=!1,hn=null,gn=null,oe=ce,C=""},t.isValidAttribute=function(b,a,p){At||gr({});let g=de(b),k=de(a);return typeof p=="string"&&(_s(a,p)||!ar&&Ee(Mi,p))?!1:Ts(g,k,p)},t.addHook=function(b,a){typeof a=="function"&&Re(j,b)&&Yt(j[b],a)},t.removeHook=function(b,a){if(Re(j,b)){if(a!==void 0){let p=tc(j[b],a);return p===-1?void 0:rc(j[b],p,1)[0]}return yi(j[b])}},t.removeHooks=function(b){Re(j,b)&&(j[b]=[])},t.removeAllHooks=function(){j=Ui()},t}var Bi=zi();function Ro(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gt=Ro();function qi(e){gt=e}var nn={exec:()=>null};function F(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(ye.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var Ac=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},vc=/^(?:[ \t]*(?:\n|$))+/,Rc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Oc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ic=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Oo=/(?:[*+-]|\d{1,9}[.)])/,Ji=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Zi=F(Ji).replace(/bull/g,Oo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Cc=F(Ji).replace(/bull/g,Oo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Io=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Lc=/^[^\n]+/,Co=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Nc=F(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Co).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pc=F(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Oo).getRegex(),qn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Lo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mc=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Lo).replace("tag",qn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Qi=F(Io).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",qn).getRegex(),Uc=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Qi).getRegex(),No={blockquote:Uc,code:Rc,def:Nc,fences:Oc,heading:Ic,hr:rn,html:Mc,lheading:Zi,list:Pc,newline:vc,paragraph:Qi,table:nn,text:Lc},ji=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",qn).getRegex(),Dc={...No,lheading:Cc,table:ji,paragraph:F(Io).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ji).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",qn).getRegex()},Gc={...No,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Lo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F(Io).replace("hr",rn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Zi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},$c=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Hc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ea=/^( {2,}|\\)\n(?!\s*$)/,Fc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Jn=/[\p{P}\p{S}]/u,Po=/[\s\p{P}\p{S}]/u,ta=/[^\s\p{P}\p{S}]/u,zc=F(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Po).getRegex(),na=/(?!~)[\p{P}\p{S}]/u,Bc=/(?!~)[\s\p{P}\p{S}]/u,jc=/(?:[^\s\p{P}\p{S}]|~)/u,Xc=F(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ac?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ra=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Kc=F(ra,"u").replace(/punct/g,Jn).getRegex(),Vc=F(ra,"u").replace(/punct/g,na).getRegex(),oa="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wc=F(oa,"gu").replace(/notPunctSpace/g,ta).replace(/punctSpace/g,Po).replace(/punct/g,Jn).getRegex(),Yc=F(oa,"gu").replace(/notPunctSpace/g,jc).replace(/punctSpace/g,Bc).replace(/punct/g,na).getRegex(),qc=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ta).replace(/punctSpace/g,Po).replace(/punct/g,Jn).getRegex(),Jc=F(/\\(punct)/,"gu").replace(/punct/g,Jn).getRegex(),Zc=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qc=F(Lo).replace("(?:-->|$)","-->").getRegex(),ed=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Vn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,td=F(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Vn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),sa=F(/^!?\[(label)\]\[(ref)\]/).replace("label",Vn).replace("ref",Co).getRegex(),ia=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",Co).getRegex(),nd=F("reflink|nolink(?!\\()","g").replace("reflink",sa).replace("nolink",ia).getRegex(),Xi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Mo={_backpedal:nn,anyPunctuation:Jc,autolink:Zc,blockSkip:Xc,br:ea,code:Hc,del:nn,emStrongLDelim:Kc,emStrongRDelimAst:Wc,emStrongRDelimUnd:qc,escape:$c,link:td,nolink:ia,punctuation:zc,reflink:sa,reflinkSearch:nd,tag:ed,text:Fc,url:nn},rd={...Mo,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",Vn).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Vn).getRegex()},wo={...Mo,emStrongRDelimAst:Yc,emStrongLDelim:Vc,url:F(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:F(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xi).getRegex()},od={...wo,br:F(ea).replace("{2,}","*").getRegex(),text:F(wo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Kn={normal:No,gfm:Dc,pedantic:Gc},Qt={normal:Mo,gfm:wo,breaks:od,pedantic:rd},sd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ki=e=>sd[e];function Be(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Ki)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Ki);return e}function Vi(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function Wi(e,t){let n=e.replace(ye.findPipe,(s,i,d)=>{let c=!1,h=i;for(;--h>=0&&d[h]==="\\";)c=!c;return c?"|":" |"}),r=n.split(ye.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ye.slashPipe,"|");return r}function en(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function id(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Yi(e,t,n,r,o){let s=t.href,i=t.title||null,d=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:d,tokens:r.inlineTokens(d)};return r.state.inLink=!1,c}function ad(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[d]=i;return d.length>=o.length?s.slice(o.length):s}).join(`
`)}var Wn=class{options;rules;lexer;constructor(e){this.options=e||gt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ad(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=en(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:en(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=en(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,d=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))d.push(n[c]),i=!0;else if(!i)d.push(n[c]);else break;n=n.slice(c);let h=d.join(`
`),f=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${h}`:h,o=o?`${o}
${f}`:f;let E=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=E,n.length===0)break;let S=s.at(-1);if(S?.type==="code")break;if(S?.type==="blockquote"){let O=S,P=O.raw+`
`+n.join(`
`),q=this.blockquote(P);s[s.length-1]=q,r=r.substring(0,r.length-O.raw.length)+q.raw,o=o.substring(0,o.length-O.text.length)+q.text;break}else if(S?.type==="list"){let O=S,P=O.raw+`
`+n.join(`
`),q=this.list(P);s[s.length-1]=q,r=r.substring(0,r.length-S.raw.length)+q.raw,o=o.substring(0,o.length-O.raw.length)+q.raw,n=P.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let c=!1,h="",f="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;h=t[0],e=e.substring(h.length);let E=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),S=e.split(`
`,1)[0],O=!E.trim(),P=0;if(this.options.pedantic?(P=2,f=E.trimStart()):O?P=t[1].length+1:(P=t[2].search(this.rules.other.nonSpaceChar),P=P>4?1:P,f=E.slice(P),P+=t[1].length),O&&this.rules.other.blankLine.test(S)&&(h+=S+`
`,e=e.substring(S.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex(P),U=this.rules.other.hrRegex(P),V=this.rules.other.fencesBeginRegex(P),J=this.rules.other.headingBeginRegex(P),he=this.rules.other.htmlBeginRegex(P);for(;e;){let ge=e.split(`
`,1)[0],B;if(S=ge,this.options.pedantic?(S=S.replace(this.rules.other.listReplaceNesting,"  "),B=S):B=S.replace(this.rules.other.tabCharGlobal,"    "),V.test(S)||J.test(S)||he.test(S)||T.test(S)||U.test(S))break;if(B.search(this.rules.other.nonSpaceChar)>=P||!S.trim())f+=`
`+B.slice(P);else{if(O||E.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(E)||J.test(E)||U.test(E))break;f+=`
`+S}!O&&!S.trim()&&(O=!0),h+=ge+`
`,e=e.substring(ge.length+1),E=B.slice(P)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(i=!0));let q=null,N;this.options.gfm&&(q=this.rules.other.listIsTask.exec(f),q&&(N=q[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:h,task:!!q,checked:N,loose:!1,text:f,tokens:[]}),o.raw+=h}let d=o.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let c=0;c<o.items.length;c++)if(this.lexer.state.top=!1,o.items[c].tokens=this.lexer.blockTokens(o.items[c].text,[]),!o.loose){let h=o.items[c].tokens.filter(E=>E.type==="space"),f=h.length>0&&h.some(E=>this.rules.other.anyLine.test(E.raw));o.loose=f}if(o.loose)for(let c=0;c<o.items.length;c++)o.items[c].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Wi(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(Wi(i,s.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:s.align[c]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=en(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=id(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Yi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Yi(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,d=o,c=0,h=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+o);(r=h.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){d+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){c+=i;continue}if(d-=i,d>0)continue;i=Math.min(i,i+d+c);let f=[...r[0]][0].length,E=e.slice(0,o+r.index+f+i);if(Math.min(o,i)%2){let O=E.slice(1,-1);return{type:"em",raw:E,text:O,tokens:this.lexer.inlineTokens(O)}}let S=E.slice(2,-2);return{type:"strong",raw:E,text:S,tokens:this.lexer.inlineTokens(S)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},$e=class Ao{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gt,this.options.tokenizer=this.options.tokenizer||new Wn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ye,block:Kn.normal,inline:Qt.normal};this.options.pedantic?(n.block=Kn.pedantic,n.inline=Qt.pedantic):this.options.gfm&&(n.block=Kn.gfm,this.options.breaks?n.inline=Qt.breaks:n.inline=Qt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Kn,inline:Qt}}static lex(t,n){return new Ao(n).lex(t)}static lexInline(t,n){return new Ao(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,d=t.slice(1),c;this.options.extensions.startBlock.forEach(h=>{c=h.call({lexer:this},d),typeof c=="number"&&c>=0&&(i=Math.min(i,c))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,d="";for(;t;){i||(d=""),i=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=n.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,d)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let h=t;if(this.options.extensions?.startInline){let f=1/0,E=t.slice(1),S;this.options.extensions.startInline.forEach(O=>{S=O.call({lexer:this},E),typeof S=="number"&&S>=0&&(f=Math.min(f,S))}),f<1/0&&f>=0&&(h=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(h)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(d=c.raw.slice(-1)),i=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Yn=class{options;parser;constructor(e){this.options=e||gt}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ye.notSpaceStart)?.[0],o=e.replace(ye.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Be(r)+'">'+(n?o:Be(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Be(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let d=e.items[i];r+=this.listitem(d)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+Be(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Be(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=Vi(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Be(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=Vi(e);if(o===null)return Be(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Be(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Be(e.text)}},Uo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},He=class vo{options;renderer;textRenderer;constructor(t){this.options=t||gt,this.options.renderer=this.options.renderer||new Yn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Uo}static parse(t,n){return new vo(n).parse(t)}static parseInline(t,n){return new vo(n).parseInline(t)}parse(t,n=!0){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let d=s,c=this.options.extensions.renderers[d.type].call({parser:this},d);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(d.type)){r+=c||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);continue}case"hr":{r+=this.renderer.hr(i);continue}case"heading":{r+=this.renderer.heading(i);continue}case"code":{r+=this.renderer.code(i);continue}case"table":{r+=this.renderer.table(i);continue}case"blockquote":{r+=this.renderer.blockquote(i);continue}case"list":{r+=this.renderer.list(i);continue}case"html":{r+=this.renderer.html(i);continue}case"def":{r+=this.renderer.def(i);continue}case"paragraph":{r+=this.renderer.paragraph(i);continue}case"text":{let d=i,c=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],c+=`
`+this.renderer.text(d);n?r+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):r+=c;continue}default:{let d='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return r}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let d=this.options.extensions.renderers[s.type].call({parser:this},s);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=d||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let d='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return r}},tn=class{options;block;constructor(e){this.options=e||gt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$e.lex:$e.lexInline}provideParser(){return this.block?He.parse:He.parseInline}},ld=class{defaults=Ro();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=He;Renderer=Yn;TextRenderer=Uo;Lexer=$e;Tokenizer=Wn;Hooks=tn;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let d=o.renderer.apply(this,i);return d===!1&&(d=s.apply(this,i)),d}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Yn(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,d=n.renderer[i],c=o[i];o[i]=(...h)=>{let f=d.apply(o,h);return f===!1&&(f=c.apply(o,h)),f||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Wn(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,d=n.tokenizer[i],c=o[i];o[i]=(...h)=>{let f=d.apply(o,h);return f===!1&&(f=c.apply(o,h)),f}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new tn;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,d=n.hooks[i],c=o[i];tn.passThroughHooks.has(s)?o[i]=h=>{if(this.defaults.async&&tn.passThroughHooksRespectAsync.has(s))return(async()=>{let E=await d.call(o,h);return c.call(o,E)})();let f=d.call(o,h);return c.call(o,f)}:o[i]=(...h)=>{if(this.defaults.async)return(async()=>{let E=await d.apply(o,h);return E===!1&&(E=await c.apply(o,h)),E})();let f=d.apply(o,h);return f===!1&&(f=c.apply(o,h)),f}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let d=[];return d.push(s.call(this,i)),o&&(d=d.concat(o.call(this,i))),d}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $e.lex(e,t??this.defaults)}parser(e,t){return He.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,d=await(o.hooks?await o.hooks.provideLexer():e?$e.lex:$e.lexInline)(i,o),c=o.hooks?await o.hooks.processAllTokens(d):d;o.walkTokens&&await Promise.all(this.walkTokens(c,o.walkTokens));let h=await(o.hooks?await o.hooks.provideParser():e?He.parse:He.parseInline)(c,o);return o.hooks?await o.hooks.postprocess(h):h})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?$e.lex:$e.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let d=(o.hooks?o.hooks.provideParser():e?He.parse:He.parseInline)(i,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Be(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},ht=new ld;function K(e,t){return ht.parse(e,t)}K.options=K.setOptions=function(e){return ht.setOptions(e),K.defaults=ht.defaults,qi(K.defaults),K};K.getDefaults=Ro;K.defaults=gt;K.use=function(...e){return ht.use(...e),K.defaults=ht.defaults,qi(K.defaults),K};K.walkTokens=function(e,t){return ht.walkTokens(e,t)};K.parseInline=ht.parseInline;K.Parser=He;K.parser=He.parse;K.Renderer=Yn;K.TextRenderer=Uo;K.Lexer=$e;K.lexer=$e.lex;K.Tokenizer=Wn;K.Hooks=tn;K.parse=K;var tg=K.options,ng=K.setOptions,rg=K.use,og=K.walkTokens,sg=K.parseInline;var ig=He.parse,ag=$e.lex;var z=no();var aa="var(--k-muted)",cd=/^#[0-9a-fA-F]{3}$/,dd=/^#[0-9a-fA-F]{6}$/,pd=/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,ud=/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/,fd=/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/,md=/^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/;function Do(e){if(typeof e!="string")return aa;let t=e.trim();return cd.test(t)||dd.test(t)||pd.test(t)||ud.test(t)||fd.test(t)||md.test(t)?t:aa}function x(e,t={},...n){let r=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(r.dataset,s);continue}if(o==="style"){r.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){r.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){r.className=s;continue}r[o]=s}for(let o of n)o!=null&&r.append(typeof o=="string"?document.createTextNode(o):o);return r}function on(e){e.replaceChildren()}function Go(e){let t=x("div",{className:"md"});if(!e||e.trim().length===0)return t.append(x("p",{className:"muted"},"No description.")),t;let n=K.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=Bi.sanitize(n,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(r=>{let o=r.getAttribute("href")??"";r.setAttribute("rel","noreferrer noopener"),r.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&z.openUrl(o)})}),t.querySelectorAll("img").forEach(r=>{r.setAttribute("loading","lazy")}),t}function la(e,t=320){let n=e??"",r=Go(e);if(n.length<=t)return r;r.classList.add("md-collapsed");let o=x("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=r.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),x("div",{className:"md-wrap"},r,o)}function ca(e){if(!e||typeof e!="object")return{};let t={};for(let[n,r]of Object.entries(e))!r||typeof r!="object"||typeof r.taskId!="string"||(t[n]={taskId:r.taskId,ticketId:typeof r.ticketId=="string"?r.ticketId:"",title:typeof r.title=="string"?r.title:"",at:typeof r.at=="number"?r.at:0,posted:Array.isArray(r.posted)?r.posted.filter(o=>typeof o=="string"):[]});return t}function da(e,t=50){let n=Object.entries(e).sort((r,o)=>o[1].at-r[1].at).slice(0,Math.max(0,t));return Object.fromEntries(n)}async function pa(e,t){try{return t(await z.storage.get(e))}catch{return t(void 0)}}async function ua(e,t){try{let n=JSON.parse(JSON.stringify(t));await z.storage.set(e,n)}catch{}}var fa="preferences",hd={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1,serverUrl:""};function ma(e){if(typeof e!="object"||e===null)return{...hd};let t=e,n=t.priorityFilter,r=n==="any"||!!n&&n in Ei;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:r?n:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0,serverUrl:typeof t.serverUrl=="string"?t.serverUrl:""}}async function kt(){return pa(fa,e=>ma(e))}async function Zn(e){let t=ma({...await kt(),...e});return await ua(fa,t),t}var ha="session-links";async function gd(){return pa(ha,ca)}async function ga(e,t){let n=await gd();n[e]={...t,at:Date.now(),posted:[]};let r=da(n);await ua(ha,r)}function $o(e){return e instanceof ve?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function ka(e,t){let n=typeof e=="object"&&e!==null?e:{};return typeof n.message=="string"&&n.message?n.message:typeof n.error=="string"&&n.error?n.error:t}async function kd(e,t="POST",n){let r=await z.serviceRequest({method:t,path:e,...n===void 0?{}:{body:JSON.stringify(n)}});return{status:r.status,body:r.body}}async function Ho(e,t="POST",n){let r=await kd(e,t,n),o;try{o=JSON.parse(r.body)}catch{throw new ve(r.status,"SERVICE_BAD_RESPONSE",`Kaneo service answered ${r.status} with a body that is not JSON.`)}if(r.status>=400)throw new ve(r.status,"SERVICE_ERROR",ka(o,`Kaneo service answered ${r.status}.`));return o}async function ba(e){let t=await z.serviceRequest({method:"POST",path:"/forward",body:JSON.stringify(e)}),n;try{n=JSON.parse(t.body)}catch{throw new ve(t.status,"SERVICE_BAD_RESPONSE","Kaneo service answered with a body that is not JSON.")}let r=typeof n=="object"&&n!==null?n:{};if(typeof r.status!="number")throw new ve(t.status>=400?t.status:502,"SERVICE_ERROR",ka(n,"Kaneo service returned an unexpected answer."));return{status:r.status,body:typeof r.body=="string"?r.body:""}}var xa=()=>Ho("/account","GET"),Ea=e=>Ho("/auth/device/start","POST",{origin:e}),Ta=()=>Ho("/auth/device/poll","POST");async function bd(e,t){try{return t(await z.storage.get(e))}catch{return t(void 0)}}async function xd(e,t){try{let n=JSON.parse(JSON.stringify(t));await z.storage.set(e,n)}catch{}}var sn=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function Sa(e,t,n={}){if(!n.force){let E=await Td();if(E&&Date.now()-E.at<Ed)return E.context}let[r,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new sn;let s=await kt(),i=t?o.find(E=>E.slug===t):void 0,d=(s.workspaceId&&o.find(E=>E.id===s.workspaceId)?.id)??i?.id??o[0].id;d!==s.workspaceId&&await Zn({workspaceId:d,projectId:null});let c=[],h=null;try{c=await e.listProjects(d)}catch(E){h=E instanceof Error?E:new Error(String(E))}let f={user:r,workspaces:o,workspaceId:d,projects:c,projectsError:h};return await Sd(f),f}var _a="bootstrap-cache",Ed=6e4;async function Td(){return bd(_a,e=>{if(!e||typeof e!="object")return null;let t=e;return t&&typeof t.at=="number"&&t.context?t:null})}async function Sd(e){await xd(_a,{at:Date.now(),context:e})}function ya(e,t,n){if(e.length===0)return null;let r=e.find(i=>i.id===t);if(r)return r;let o=n?.toLowerCase();return(o?e.find(i=>i.slug.toLowerCase()===o):void 0)??e[0]}function wa(e){let t=e?.workspace?.trim(),n=e?.project?.trim();return{workspaceSlug:t||void 0,projectSlug:n||void 0}}function Aa(e){let t=e?.trim()??"";if(!t)return{origin:Bn,error:null};try{let n=new URL(t);if(n.protocol==="https:"&&!n.username&&!n.password&&(n.pathname==="/"||n.pathname==="")&&!n.search&&!n.hash)return{origin:n.origin,error:null}}catch{}return{origin:Bn,error:"Enter an https origin, like https://cloud.kaneo.app."}}function va(e,t){let n=!1,r=0,o=null,s="",i=()=>{o!==null&&(window.clearTimeout(o),o=null)},d=N=>!n&&N===r,c=N=>{n||e.replaceChildren(N)},h=N=>{let T=x("div",{className:"signin-card"});T.append(x("p",{className:"signin-hint"},"Connect to your Kaneo server. You will get a code to enter on Kaneo's own sign-in page."));let U=x("div",{className:"signin-field"});T.append(U),Nt(U,{label:"Kaneo server URL",value:s,placeholder:"https://cloud.kaneo.app",mono:!0,...N?{error:N}:{helper:"Optional. Defaults to the bundled origin."},onChange:J=>{s=J}});let V=x("div",{className:"signin-row"});T.append(V),pe(V,{label:"Sign in with Kaneo",size:"sm",onClick:()=>void q()}),c(T)},f=async()=>{let N=++r;i();let T=await kt().catch(()=>null);d(N)&&(s=T?.serverUrl??"",h())},E=(N,T)=>{if(!d(T))return;i();let U=x("div",{className:"signin-fill"});Pt(U,{tone:"error",title:"Kaneo",body:N,action:{label:"Start again",onClick:()=>void f()}}),c(U)},S=(N,T)=>{if(!d(T))return;let U=x("div",{className:"signin-card"});U.append(x("p",{className:"signin-hint"},"Enter this code in your browser to sign in to Kaneo")),U.append(x("div",{className:"signin-code"},N.userCode));let V=x("div",{className:"signin-row"});U.append(V),pe(V,{label:"Open Kaneo",variant:"secondary",size:"sm",onClick:()=>void z.openUrl(N.verificationUriComplete)}),pe(V,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>void f()});let J=x("div",{className:"signin-waiting"});U.append(J),rt(J,{label:"Waiting for approval"}),c(U)},O=(N,T)=>{i(),o=window.setTimeout(()=>void P(N),Math.max(T,3)*1e3)},P=async N=>{if(!d(N))return;let T;try{T=await Ta()}catch(U){E($o(U),N);return}if(d(N))switch(T.status){case"pending":O(N,T.interval);return;case"connected":i(),t();return;case"expired":E("The code expired. Start again.",N);return;case"denied":E("Sign-in was denied on Kaneo.",N);return;default:E(T.message,N)}},q=async()=>{let N=Aa(s);if(N.error){h(N.error);return}let T=++r;if(i(),await Zn({serverUrl:s.trim()}).catch(()=>{}),!d(T))return;let U=x("div",{className:"signin-fill"});rt(U,{label:"Starting sign-in"}),c(U);let V;try{V=await Ea(N.origin)}catch(J){E($o(J),T);return}d(T)&&(S(V,T),O(T,V.interval),z.openUrl(V.verificationUriComplete).catch(()=>{}))};return f(),()=>{n=!0,i()}}var _d=864e5;function Fo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function Ia(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function Ca(e,t,n){return`${ki}/dashboard/workspace/${e}/project/${t}/task/${n}`}var yd={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function bt(e){return yd[e]??e}function tr(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=Math.round((er(n).getTime()-er(t).getTime())/_d);return r===0?"Due today":r===1?"Due tomorrow":r===-1?"Due yesterday":r<0?`Overdue ${Math.abs(r)}d`:r<=7?`Due in ${r}d`:`Due ${n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function La(e,t=new Date){if(!e)return!1;let n=new Date(e);return Number.isNaN(n.getTime())?!1:er(n).getTime()<er(t).getTime()}function er(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Na(e,t=160){if(!e)return"";let n=e.split(`
`).map(o=>o.trim()).find(o=>o.length>0);if(!n)return"";let r=n.replace(/^#{1,6}\s+/,"").replace(/^[*_>]+/,"").trim();return r.length>t?`${r.slice(0,t-1)}\u2026`:r}var wd=6e3;function Ad(e){let t=e.user?.name??"Unknown",n=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${n}`}function Pa(e,t){let n=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&n.push(`Project: ${t.projectName}`),t.columnName&&n.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&n.push(`Priority: ${bt(e.priority)}`),e.dueDate&&n.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&n.push(t.url);let r=e.description?.trim();r&&n.push("",r);let o=t.comments??[];if(o.length>0){n.push("","Comments:");let s=0;for(let i of o){let d=Ad(i);if(s+d.length>wd)break;s+=d.length,n.push(d)}}return n.join(`
`)}function Ma(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Ra=6e4,Oa=36e5,Qn=864e5;function nr(e,t=Date.now()){if(!e)return null;let n=Date.parse(e);if(!Number.isFinite(n))return null;let r=Math.max(0,t-n);return r<Ra?"just now":r<Oa?`${Math.floor(r/Ra)}m`:r<Qn?`${Math.floor(r/Oa)}h`:r<7*Qn?`${Math.floor(r/Qn)}d`:`${Math.floor(r/(7*Qn))}w`}function Ua(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function zo(e){return Ca(e.workspaceId,e.task.projectId,e.task.id)}function vd(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function Da(e){return{providerId:bi,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:zo(e),text:Pa(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:zo(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:vd(e)}}async function Ga(e){await z.attach(Da(e))}async function Rd(e,t={}){let n=t.worktree?Ma(e.ticketId):void 0,r=await z.startSession({...Da(e),navigation:"preserve",...n?{worktree:{kind:"new",name:n}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return r.sessionId===null?{sessionId:null,sent:r.sent,failure:r.failure,branch:r.worktree.branch}:{sessionId:r.sessionId,sent:r.sent,branch:r.worktree?.branch??n}}async function Bo(e,t={}){let n=await Rd(e,t);if(n.sessionId===null){let r=n.branch?` The worktree ${n.branch} was kept.`:"",o=n.failure?` (${n.failure})`:"";return await z.toast({kind:"error",message:`No session was created${o}.${r} Check the session list before retrying.`,dismiss:!0}),!1}return await ga(n.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await z.toast({kind:"success",message:t.worktree&&n.branch?`Session started on ${n.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function jo(e){await z.openUrl(zo(e))}function $a(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function Ha(e){return x("span",{className:"label-chip"},x("span",{className:"label-dot",style:`background:${Do(e.color)}`}),e.name)}function Fa(e,t=2){if(e.length===0)return null;let n=e.slice(0,t),r=x("span",{className:"label-chips"});for(let o of n)r.append(Ha(o));return e.length>n.length&&r.append(x("span",{className:"label-more"},`+${e.length-n.length}`)),r}function za(e){if(e.length===0)return null;let t=x("div",{className:"label-chips"});for(let n of e)t.append(Ha(n));return t}function Ba(e){return x("span",{className:"person"},x("span",{className:"person-avatar"},$a(e)),x("span",{className:"person-name"},e))}function ja(e){return x("span",{className:"person-avatar"},$a(e))}function Xa(e){let{task:t}=e,n=x("dl",{className:"meta-grid"}),r=[];e.projectName&&r.push(["Project",e.projectName]),t.priority!=="no-priority"&&r.push(["Priority",bt(t.priority)]),r.push(["Assignee",t.assigneeName??"Unassigned"]);let o=tr(t.dueDate);o&&r.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&r.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&r.push(["Description","Too large to inline; open the task for the full text."]);for(let[d,c]of r)n.append(x("dt",{},d),x("dd",{},c));let i=za(t.labels??[]);if(i){let d=x("dd",{className:"meta-labels"});d.append(i),n.append(x("dt",{},"Labels"),d)}return n}function Ka(e,t=320){return x("div",{className:"detail-section"},la(e.task.description,t))}function Va(e){let t=x("div",{className:"detail-section"});if(t.append(x("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(x("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(x("p",{className:"muted"},"Loading comments\u2026")),t;let n=e.items??[];if(n.length===0)return t.append(x("p",{className:"muted"},"No comments yet.")),t;let r=x("div",{className:"comments"});return n.forEach((o,s)=>{let i=s===n.length-1,d=nr(o.createdAt),c=x("div",{className:"comment"});i||c.append(x("div",{className:"comment-line"})),c.append(ja(o.user?.name));let h=x("div",{className:"comment-card"});h.append(x("div",{className:"comment-head"},x("span",{className:"comment-author"},o.user?.name??"Unknown"),d?x("span",{},d):null),x("div",{className:"comment-body"},Go(o.content))),c.append(h),r.append(c)}),t.append(r),t}var Od=`
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
/* filter-refresh carries margin-left: auto so refresh and the account menu both end up on the right edge of the filter row. */
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

/* The device-code sign-in: the empty state, and the code card once started. */
.signin-fill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}
.signin-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  text-align: center;
}
.signin-hint { margin: 0; font-size: var(--k-text-ui); color: var(--k-muted); }
.signin-code {
  font-family: var(--k-mono);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding: 10px 16px;
  border-radius: 8px;
  background: var(--k-muted-surface);
  border: 1px solid var(--k-border);
  color: var(--k-fg);
  user-select: all;
}
.signin-row { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.signin-waiting { min-height: 24px; }
`;function Wa(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=Od,e.append(n)}var Id={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function Cd(e){let t=Id[e],n={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 16 16"),r.setAttribute("width","16"),r.setAttribute("height","16"),r.setAttribute("aria-hidden","true"),r.innerHTML=n[e],r.classList.add("row-glyph"),r}function Ya(e){let{task:t,ticketId:n,column:r,selected:o,onActivate:s}=e,i=tr(t.dueDate),d=La(t.dueDate),c=nr(t.createdAt),h=x("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:s}),f=x("div",{className:"row-body"});f.append(x("div",{className:"row-title"},t.title));let E=x("div",{className:"row-meta"});E.append(x("span",{className:"task-key"},n)),t.assigneeName&&E.append(Ba(t.assigneeName)),c&&E.append(x("span",{},c));let S=t.subtaskCounts;S&&S.total>0&&E.append(x("span",{className:"tabular"},`${S.completed}/${S.total}`)),t.priority!=="no-priority"&&E.append(x("span",{},bt(t.priority))),i&&E.append(x("span",{className:d?"overdue":""},i));let O=Fa(t.labels??[]);return O&&E.append(O),f.append(E),h.append(Cd(Ua(r)),f),h.title=`${n} \xB7 ${r.name}`,h}var Oe=document.querySelector("#root");if(!Oe)throw new Error("Kaneo attach dialog is missing its #root element.");var Dt=Ti(ba),ln=200,Ld=560,m={ready:null,connected:!1,context:null,project:null,boardTasks:[],columnNames:{},defaultStatus:"to-do",results:null,search:"",statusFilter:"",tab:"board",loading:!0,error:null,draft:{title:"",description:"",priority:"medium"},source:null,highlightedId:null,comments:{},worktree:!1,wide:!0,previewOpen:!1},rr=0,Xo=0,qa=!1,Ko=!1,an=null,Vo=null,Yo=!1,Wo=!1;function Nd(){an||(an=x("div",{className:"signin-fill"}),Vo=va(an,()=>void Md())),Oe?.append(an)}function Pd(){Vo?.(),Vo=null,an=null}async function Md(){Pd(),m.connected=!0,Ko=!0,await or()}function Ud(e){return e instanceof ve?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Et(e,t){return console.error(`${e} failed:`,t),Ud(t)}function qo(e){return Fo(m.project?.slug??"",e.number)}function Qa(e){return m.columnNames[e.status]??Ia(e.status)}function Jo(e){return{task:e,ticketId:qo(e),workspaceId:m.context?.workspaceId??"",projectName:m.project?.name,columnName:Qa(e),comments:m.comments[e.id]?.items}}function Zo(){let e=m.highlightedId;return e?m.boardTasks.find(t=>t.id===e)??m.results?.find(t=>t.id===e)??null:null}function Dd(e){if(m.statusFilter&&e.status!==m.statusFilter)return!1;let t=m.search.trim().toLowerCase();return t?e.title.toLowerCase().includes(t)||qo(e).toLowerCase().includes(t):!0}function Gd(){return(m.results??m.boardTasks).filter(Dd)}async function or(){let e=++rr;m.loading=!0,Ue();try{let{workspaceSlug:t,projectSlug:n}=wa(m.ready?.settings),r=await Sa(Dt,t,{force:!0});if(e!==rr)return;m.context=r;let o=await kt();if(m.project=ya(r.projects,o.projectId,n),m.loading=!1,m.error=r.projectsError?Et("List projects",r.projectsError):null,Ue(),m.project){let s=await Dt.getBoard(m.project.id);if(e!==rr)return;m.boardTasks=s.board.columns.flatMap(i=>i.tasks),m.columnNames=Object.fromEntries(s.board.columns.map(i=>[i.id,i.name])),m.defaultStatus=s.board.columns[0]?.id??"to-do",m.results=null}Ue()}catch(t){if(e!==rr)return;m.loading=!1,m.error=t instanceof sn?t.message:`Could not reach Kaneo. ${Et("Reach Kaneo",t)}`,Ue()}}async function $d(){let e=++Xo,t=m.context?.workspaceId,n=m.search.trim();if(!t||n.length<2){m.results=null,De();return}m.loading=!0,De();try{let r=await Dt.search(t,n,{...m.project?{projectId:m.project.id}:{},limit:40});if(e!==Xo)return;let o=new Map(m.boardTasks.map(d=>[d.id,d])),s=r.results.filter(d=>d.type==="task");m.results=s.map(d=>o.get(d.id)).filter(d=>!!d);let i=s.length-m.results.length;m.loading=!1,m.error=i>0?`${i} match${i===1?" is":"es are"} outside the loaded board. Open the Kaneo web app to reach them.`:null,De()}catch(r){if(e!==Xo)return;m.loading=!1,m.error=Et("Search Kaneo",r),De()}}async function el(e){let t=m.comments[e]?.items;if(t)return t;try{let n=await Dt.listComments(e);return m.comments[e]={loading:!1,error:null,items:n},n}catch{return}}async function sr(e){try{let t={...Jo(e),comments:await el(e.id)};await Ga(t),await z.toast({kind:"success",message:`${t.ticketId} attached to the chat.`}),await z.close()}catch(t){await z.toast({kind:"error",message:`Attach failed: ${Et("Attach",t)}`,dismiss:!0})}}async function Hd(e){let t={...Jo(e),comments:await el(e.id)};await Bo(t,{worktree:m.worktree})&&await z.close()}async function Fd(){if(!m.project)return;let e=m.draft.title.trim();if(e.length===0){m.error="A task needs a title.",Ue();return}try{let t=await Dt.createTask(m.project.id,{title:e.slice(0,ln),description:m.draft.description,priority:m.draft.priority,status:m.defaultStatus});await z.toast({kind:"success",message:`Created ${Fo(m.project.slug,t.number)} in ${m.project.name}.`}),await sr(t)}catch(t){m.error=Et("Create task",t),Ue()}}var xt=null,st=null,it=null;function Ue(){if(Oe){if(on(Oe),xt=null,st=null,it=null,!m.ready){rt(Oe,{label:"Connecting to Kaneo"});return}if(!m.connected){if(!Yo){rt(Oe,{label:"Loading Kaneo"});return}Nd();return}if(m.source){Za(!1);return}if(m.tab==="create"){Za(!0);return}zd()}}function zd(){xt=x("div",{className:"attach-head"}),Oe?.append(xt),Bd(),st=x("div",{className:"attach-body"}),Oe?.append(st),it=x("div",{className:"attach-foot"}),Oe?.append(it),De(),Kd()}function Bd(){if(!xt)return;on(xt);let e=x("div");xt.append(e),Fn(e,{items:[{id:"board",label:m.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:m.tab,onChange:s=>{if(s==="create"){m.tab="create",Ue();return}m.tab="board",Ue()}});let t=x("div",{className:"attach-head-row"}),n=x("div",{className:"attach-search"});t.append(n),po(n,{value:m.search,label:"Search Kaneo",placeholder:"Search, or paste a ticket id",onChange:s=>{if(m.search=s,s.trim().length>=2){$d();return}m.results=null,De()}});let r=Object.entries(m.columnNames);if(r.length>0){let s=x("div",{className:m.statusFilter?"filter filter-active":"filter"});t.append(s),uo(s,{label:m.statusFilter?m.columnNames[m.statusFilter]??"Status":"Status",size:"sm",variant:"ghost",items:[{id:"",label:"Any status"},{separator:!0},...r.map(([i,d])=>({id:i,label:d}))],onSelect:i=>{m.statusFilter=i,De()}})}let o=m.context?.projects??[];if(o.length>1){let s=x("div",{className:"attach-project"});t.append(s),Wt(s,{searchable:!0,searchPlaceholder:"Find a project",value:m.project?.id??"",options:o.map(i=>({id:i.id,label:i.slug.toUpperCase()})),onChange:i=>{m.project=m.context?.projects.find(d=>d.id===i)??null,m.search="",m.results=null,m.highlightedId=null,m.loading=!0,or()}})}xt.append(t)}function De(){if(!st)return;on(st);let e=Gd();(!m.highlightedId||!e.some(r=>r.id===m.highlightedId))&&(m.highlightedId=e[0]?.id??null);let t=Zo();if(st.classList.toggle("narrow",!m.wide),!m.wide&&m.previewOpen&&t){st.append(Ja(t));return}let n=x("div",{className:"attach-split"});n.append(jd(e)),m.wide&&n.append(Ja(t)),st.append(n)}function jd(e){let t=x("div",{className:"attach-list scroll"});if(m.error){let n=x("div");t.append(n),Pt(n,{tone:m.results?"warning":"error",title:"Kaneo",body:m.error,...m.results?{}:{action:{label:"Retry",onClick:()=>void or()}}})}if(m.loading&&e.length===0)return rt(t,{label:"Loading tasks"}),t;if(e.length===0)return zn(t,{title:m.search.trim()?"No task matches":"This project has no tasks",body:m.search.trim()?"Search runs inside the selected workspace.":"Use the New tab to create the first one."}),t;for(let n of e){let r=Ya({task:n,ticketId:qo(n),column:{slug:n.status,isFinal:!1,name:Qa(n)},selected:n.id===m.highlightedId,onActivate:()=>Xd(n)});r.addEventListener("dblclick",()=>void sr(n)),t.append(r)}return t}function Xd(e){if(m.highlightedId=e.id,tl(e.id),!m.wide){m.previewOpen=!0,De();return}De()}function Ja(e){let t=x("div",{className:"attach-preview"});if(!e){let c=x("div",{style:"flex:1; display:flex; align-items:center;"});return t.append(c),zn(c,{title:"Select a task",body:"Pick a task on the left to preview it here before attaching."}),t}tl(e.id);let n=Jo(e);if(!m.wide){let c=x("div");t.append(c),pe(c,{label:"Back",variant:"ghost",size:"sm",onClick:()=>{m.previewOpen=!1,De()}})}let r=x("div",{className:"picker-head"});r.append(x("span",{className:"state-pill"},n.columnName)),r.append(x("span",{className:"task-key"},n.ticketId));let o=x("div",{style:"margin-left:auto;"});r.append(o),pe(o,{label:"Kaneo",variant:"ghost",size:"sm",onClick:()=>void jo(n)}),t.append(r),t.append(x("h2",{className:"detail-title"},e.title)),t.append(Xa(n)),t.append(Ka(n,1200)),t.append(Va(m.comments[e.id]??null));let s=x("div",{className:"pick-note"}),i=x("div");s.append(i),Hn(i,{label:"Create in a new worktree",checked:m.worktree,onChange:c=>{m.worktree=c}}),s.append(x("p",{className:"muted"},"The agent gets the description and comments."));let d=x("div",{className:"block"});return s.append(d),pe(d,{label:"Start session",variant:"secondary",size:"sm",onClick:()=>{Hd(e).catch(c=>{z.toast({kind:"error",message:Et("Start session",c),dismiss:!0})})}}),t.append(s),t}function Kd(){if(!it)return;on(it);let e=Zo();it.append(x("span",{className:"attach-hint"},e?"Enter attaches the highlighted task.":"Select a task to attach.")),pe(it,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void z.close()});let t=x("div");it.append(t),pe(t,{label:"Attach",size:"sm",disabled:!e,onClick:()=>{e&&sr(e)}})}function Za(e){let t=x("div",{className:"attach-head"});if(Oe?.append(t),e){let c=x("div");t.append(c),Fn(c,{items:[{id:"board",label:m.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:"create",onChange:h=>{m.tab=h==="board"?"board":"create",Ue()}})}else t.append(x("h2",{className:"detail-title"},"New Kaneo task"));let n=x("div",{className:"dialog-body"});if(Oe?.append(n),m.error){let c=x("div");n.append(c),Pt(c,{tone:"error",title:"Kaneo",body:m.error})}let r=x("div");n.append(r),Nt(r,{label:"Title",value:m.draft.title,placeholder:"What needs doing?",error:m.draft.title.length>ln?`Keep it under ${ln} characters.`:void 0,onChange:c=>{m.draft.title=c}});let o=x("div");n.append(o),Wt(o,{label:"Priority",value:m.draft.priority,options:xi.map(c=>({id:c,label:bt(c)})),onChange:c=>{m.draft.priority=c}});let s=x("div");n.append(s),Nt(s,{label:"Description",value:m.draft.description,multiline:!0,rows:5,placeholder:"Markdown is supported.",onChange:c=>{m.draft.description=c}});let i=x("div",{className:"attach-foot"});Oe?.append(i),pe(i,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void z.close()});let d=x("div");i.append(d),pe(d,{label:"Create and attach",size:"sm",onClick:()=>void Fd()})}function Vd(e){let n=(e.kind==="message"?e.text:e.sessionTitle).split(`
`).filter(i=>i.trim().length>0),r=(Na(n[0]??"",ln)||"Untitled task").slice(0,ln),o=n.slice(1).join(`
`).trim(),s=e.kind==="session"?`Session: ${e.sessionTitle}`:"From a chat message";return{title:r,description:[s,o].filter(Boolean).join(`

`),priority:"medium"}}function tl(e){m.comments[e]||(m.comments[e]={loading:!0,error:null},Dt.listComments(e).then(t=>{m.comments[e]={loading:!1,error:null,items:t},De()}).catch(t=>{m.comments[e]={loading:!1,error:Et("Load comments",t)},De()}))}document.addEventListener("keydown",e=>{if(e.key!=="Enter"||e.shiftKey||m.tab!=="board"||m.source)return;let t=document.activeElement?.tagName.toLowerCase()??"";if(t==="textarea"||t==="button")return;let n=Zo();n&&(e.preventDefault(),sr(n))});z.onReady(e=>{ro(e,document.documentElement),Wa(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,m.ready=e,qa||(qa=!0,(Mr(e.item)||Ur(e.item))&&(m.source=e.item,m.draft=Vd(e.item),m.tab="create"),Yd()),Ue(),!Yo&&!Wo&&(Wo=!0,Wd())});async function Wd(){m.connected=!!(await xa().catch(()=>null))?.connected,Wo=!1,Yo=!0,Ue(),m.connected&&!Ko&&(Ko=!0,or())}function Yd(){if(!Oe||!globalThis.ResizeObserver)return;new ResizeObserver(t=>{let n=t[0]?.contentRect.width??0,r=n===0||n>=Ld;r!==m.wide&&(m.wide=r,r&&(m.previewOpen=!1),Ue())}).observe(Oe)}z.onItem(e=>{if(!e||!("providerId"in e))return;let t=e.data;z.toast({kind:"info",message:t?.ticketId?`${t.ticketId} is already attached to this chat.`:"That item is already attached to this chat."})});})();
