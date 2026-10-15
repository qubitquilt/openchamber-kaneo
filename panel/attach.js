"use strict";(()=>{var G="openchamber.sdk";var Ar="data-oc-scrolling",Rn=`
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
:hover, [${Ar}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Ar}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Ar}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Ar}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function On(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",n=>{let o=n.target===e?t:n.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=r.get(o);s!==void 0&&clearTimeout(s),r.set(o,setTimeout(()=>{r.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Sl=`(${On.toString()})(document);`;var Is=/^[a-z][a-z0-9-]{0,39}$/;var vs=e=>Object(e)===e&&!Array.isArray(e),In=(e,t)=>Object.keys(e).every(r=>t.includes(r)),Rs=e=>String(e)===e&&e.length>=1&&e.length<=60,Os=e=>String(e)===e&&e.length>=1&&e.length<=80,Cs=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!vs(r)||!Is.test(r.id)||!Rs(r.label)||r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1||t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!In(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!In(r,["kind","id","label","value","options","disabled"])||!Os(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let n=new Set;for(let o of r.options){if(!vs(o)||!In(o,["value","label"])||!Os(o.value)||!Rs(o.label)||n.has(o.value))return!1;n.add(o.value)}if(!n.has(r.value))return!1}return!0};var Cn=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Ls=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var Ns=/^[A-Za-z0-9_-]{1,80}$/;var Ps=["left","right","top","bottom"];var Ms=(e,t=0,r={remaining:16e3})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of n)if(!Ms(o,t+1,r))return!1;return!0},Ln=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Ln);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Ln)}return String(e)===e||Number.isFinite(e)},Nn=e=>{try{return String(e.id)!==e.id||!Ns.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ps.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ms(e.data)||!Ln(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ds=["file","directory","other","missing"],Mn=e=>!!(e&&"sessionId"in e),Un=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Dn=e=>e!==null&&e.kind==="message",Gn=e=>e!==null&&e.kind==="session";var Gs=/^[0-9a-f]{7,64}$/i,$n=e=>Gs.test(e),vr=500,Rr=32e3,$s=16e3,Hs=128,Fs=200,zs=2e3,Bs=16e3,js=80,Xs=200,Ks=16e3;var Vs=2e3;var Hn=2e4,Or=1024,Ir=2e6;var Cr=64e3,Lr=8e3,Fn=4e3;var zn=9e4;var Ws=999,Ys=1e4,Kt=500,qs=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Js=["stopped","starting","ready","failed"],_l=new Set(qs),Zs=e=>_l.has(e),Qs=e=>e&&Zs(e)?e:"HOST_REJECTED",It=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(It):Object(e)===e?Object.values(e).every(It):!1,ei=e=>It(e)&&JSON.stringify(e).length<=Ks,Us=e=>e?.trim().slice(0,Xs)??"",Ct=e=>{let t=e.id.trim().slice(0,Hs),r=e.title.trim().slice(0,Fs),n=e.url.trim().slice(0,zs),o=e.text?.trim().slice(0,Bs),s=e.author?.trim().slice(0,js),i=e.kind==="pull"?"pull":"issue",d={providerId:e.providerId.trim(),id:t,title:r||t,url:n,kind:i};if(o&&(d.text=o),s&&(d.author=s),i==="pull"){let c=Us(e.branches?.head),h=Us(e.branches?.base);c&&h&&(d.branches={head:c,base:h})}return ei(e.data)&&(d.data=e.data),d},Bn=e=>{let t=Ct(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},jn=e=>{let t={text:e.text.trim().slice(0,$s)};return e.send&&(t.send=!0),t},Xn=e=>e===null||!Number.isFinite(e)?null:Math.min(Ws,Math.max(0,Math.round(e))),Kn=e=>Number.isFinite(e)?Math.min(Ys,Math.max(0,Math.ceil(e))):0;var Lt=e=>e.length>0&&e.length<=Or&&!e.includes("\0")&&!e.includes("\\");var Nr=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Vs?!1:!e.split("/").some(r=>r==="."||r===".."),yl=new Set(Js),Vn=e=>!!(e&&"status"in e&&yl.has(String(e.status))&&!("body"in e)),Pr=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Wn=e=>!!(e&&"content"in e&&String(e.content)===e.content),Yn=e=>!!(e&&"written"in e&&e.written===!0),qn=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),wl=new Set(Ds),Jn=e=>!!(e&&"kind"in e&&"size"in e&&wl.has(String(e.kind))&&Number.isFinite(e.size)),Zn=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Al=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),vl=e=>Object(e)===e?e:null,Pn=e=>String(e)===e&&e.length>0,Rl=e=>{if(!Pn(e.id))return null;if(e.ok===!0){let t={channel:G,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&Pn(e.error)?{channel:G,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Qs(Pn(e.code)?e.code:void 0)}:null},Qn=e=>{let t=vl(e);return!t||t.channel!==G||t.v!==1?null:t.type==="result"?Rl(t):!Al.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var ti=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Ol=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",I=class extends Error{code;constructor(t,r){super(r),this.name="HostRequestError",this.code=t}},ri=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Mr=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${Or} characters without NUL or backslash.`)),Ur=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},M=e=>(e.value+=1,`oc-${e.value}`),oo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??(l=>l===t.parent),n=e.requestTimeoutMs??Hn,o=new Set,s=new Set,i=new Set,d=new Set,c=new Set,h=new Set,f=new Set,E=new Set,S=new Set,O=null,P=null,q=new Set,N=new Set,T=null,U=null,V=!1,J=new Map,he=new Map,ge=new Map,z=!1,R={value:0},v=null,Se=null,oe=!1,C=!1,ce=null,Gt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,ke=l=>{t.parent.postMessage(l,"*")},se=(l,u)=>{for(let y of l)try{y(u)}catch(_){console.error(_)}},je=l=>{if(!(l instanceof MessageEvent)||!r(l.source))return;let u=Qn(l.data);if(!u)return;if(u.type==="workspace"){let _=he.get(u.payload.subscriptionId);_&&se([_],u.payload.snapshot);return}if(u.type==="shells"){let _=ge.get(u.payload.subscriptionId);_&&se([_],u.payload.snapshot);return}if(u.type==="ready"){v=u.payload,Se=Gt(u.payload.session),se(o,u.payload),se(s,u.payload.directory),se(i,u.payload.session),Se&&se(d,Se),se(c,u.payload.connection),se(h,u.payload.settings),se(f,u.payload.item);return}if(u.type==="directory"){v&&(v={...v,directory:u.payload.directory}),se(s,u.payload.directory);return}if(u.type==="session"){v&&(v={...v,session:u.payload.session}),u.payload.session?Se?.sessionId!==u.payload.session.id&&(Se=Gt(u.payload.session)):Se=null,se(i,u.payload.session);return}if(u.type==="session-lifecycle"){Se=u.payload,se(d,u.payload);return}if(u.type==="connection"){v&&(v={...v,connection:u.payload.connection}),se(c,u.payload.connection);return}if(u.type==="settings"){v&&(v={...v,settings:u.payload.settings}),se(h,u.payload.settings);return}if(u.type==="item"){v&&(v={...v,item:u.payload.item}),se(f,u.payload.item);return}if(u.type==="status-control-event"){se(E,u.payload);return}if(u.type==="popover-closed"){se(S,u.payload);return}if(u.type==="action"){let _=Y=>{z||ke({channel:G,v:1,type:"action-result",id:u.id,payload:Y})},j=P;if(!j){_({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>j(u.payload)).then(()=>_({ok:!0}),Y=>{let W=(Y instanceof Error?Y.message:String(Y)).trim();_({ok:!1,error:(W||"Action failed.").slice(0,Kt)})});return}if(u.type==="file-open"){let _=u.payload;if(U&&Ls(U,_))return;U=_,se(q,u.payload);return}if(u.type==="file-saved"){se(N,u.payload.version);return}if(u.type==="file-snapshot"){let _=W=>{z||ke({channel:G,v:1,type:"file-snapshot-result",id:u.id,payload:W})},j=W=>_({error:(W.trim()||"Could not read the edited file.").slice(0,Kt)}),Y=T;if(!Y){j("This extension does not edit files.");return}Promise.resolve().then(()=>Y(u.payload.purpose)).then(W=>{if(Cn(W)>2e7){j(`The file is over ${2e7} ${"bytes"in W?"bytes":"characters"}.`);return}if(W.version.length>256){j(`The snapshot version is over ${256} characters.`);return}_({snapshot:"bytes"in W?{bytes:W.bytes,version:W.version}:{content:W.content,version:W.version}})},W=>j(W instanceof Error?W.message:String(W)));return}if(u.type==="resolve"){let _=Y=>{ke({channel:G,v:1,type:"resolve-result",id:u.id,payload:Y})},j=O;if(!j){_({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>j(u.payload)).then(Y=>_({item:Y?Ct(Y):null}),Y=>{let W=(Y instanceof Error?Y.message:String(Y)).trim();_({error:(W||"Command failed.").slice(0,Kt)})});return}let y=J.get(u.id);if(y){if(clearTimeout(y.timer),J.delete(u.id),u.ok){y.resolve(u.payload);return}y.reject(new I(u.code,u.error))}};t.addEventListener("message",je),ke({channel:G,v:1,type:"hello"});let be=(l,u=n)=>z||t.parent===t?Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((y,_)=>{let j=setTimeout(()=>{J.delete(l.id),_(new I("HOST_TIMEOUT","Host did not answer in time."))},u);J.set(l.id,{resolve:y,reject:_,timer:j}),ke(l)}),ie=l=>be(l).then(()=>{}),Q={channel:G,v:1},lt=l=>{!z&&t.parent!==t&&ke(l)},$t=()=>lt({...Q,type:"file-save"}),pr=l=>{!ti(l)||!Ol(l)||(l.preventDefault(),$t())},ur=l=>{!ti(l)||l.key!=="Escape"||v?.surface!=="popover"||!v.popover||(l.preventDefault(),zt(v.popover.id,"escape").catch(()=>{}))},Tt=()=>{let l=v?.surface==="popover"?v.popover:void 0;if(!l)return;let u=oe||C;ce!==u&&(ce=u,Z(l.id,u).catch(()=>{}))},B=()=>{v?.surface!=="popover"||oe||(oe=!0,Tt())},fr=l=>{v?.surface!=="popover"||l.relatedTarget!==null||!oe||(oe=!1,Tt())},mr=()=>{v?.surface!=="popover"||C||(C=!0,Tt())},hr=()=>{v?.surface!=="popover"||!C||(C=!1,Tt())},Ie=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new I("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Ht=async l=>{l.kind!=="projects"&&Ie(l.projectId);let u=await be({...Q,type:"workspace-read",id:M(R),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return u},Ft=async(l,u)=>{l.kind!=="projects"&&Ie(l.projectId);let y=M(R);he.set(y,u);try{await ie({...Q,type:"workspace-subscribe",id:M(R),payload:{subscriptionId:y,query:l}})}catch(_){throw he.delete(y),z||ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:y}}),_}return()=>{!he.delete(y)||z||ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:y}})}},gr=async(l,u)=>{l.kind==="session"&&Ie(l.sessionId),l.kind==="project"&&Ie(l.projectId);let y=M(R);ge.set(y,u);try{await ie({...Q,type:"shells-subscribe",id:M(R),payload:{subscriptionId:y,scope:l}})}catch(_){throw ge.delete(y),z||ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:y}}),_}return()=>{!ge.delete(y)||z||ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:y}})}},St=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!It(l.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&v?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let u=await be({...Q,type:"storage",id:M(R),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new I("HOST_REJECTED","Host did not return storage data.");return u},zt=(l,u)=>v?.features?.popovers!==!0&&!(v?.surface==="popover"&&v.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ie({...Q,type:"popover-close",id:M(R),payload:u?{id:l,reason:u}:{id:l}}),Z=(l,u)=>v?.features?.popovers!==!0&&!(v?.surface==="popover"&&v.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ie({...Q,type:"popover-anchor",id:M(R),payload:{id:l,active:u}});return t.addEventListener("keydown",ur,!0),t.addEventListener("pointerover",B),t.addEventListener("pointermove",B),t.addEventListener("pointerout",fr),t.addEventListener("focus",mr),t.addEventListener("blur",hr),{onAction:l=>(P=l,()=>{P===l&&(P=null)}),listProjects:async()=>{let l=await Ht({kind:"projects"});if(l.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Ht({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Ht({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Ft({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Ft({kind:"worktrees",projectId:l},y=>{y.kind==="worktrees"&&u(y)}),onSessions:(l,u)=>Ft({kind:"sessions",projectId:l},y=>{y.kind==="sessions"&&u(y)}),onRunningShells:(l,u)=>gr(l,u),readShellOutput:async(l,u)=>{Ie(l,128);let y=u?.cursor;if(y!==void 0&&(!Number.isInteger(y)||y<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let _=u?.tailBytes;if(_!==void 0&&(!Number.isInteger(_)||_<1||_>65536))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let Y=await be({...Q,type:"shell-output",id:M(R),payload:{shellId:l,cursor:y,tailBytes:_}});if(!Y||typeof Y.output!="string"||!Number.isFinite(Y.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async l=>{if(Ie(l,128),(await be({...Q,type:"shell-stop",id:M(R),payload:{shellId:l}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Ie(l),await ie({...Q,type:"open-session",id:M(R),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let y=Ur(u),_={op:"get",key:l};y&&(_.scope=y);let j=await St(_);return j.op==="get"&&j.found?j.value:void 0},set:async(l,u,y)=>{let _=Ur(y),j={op:"set",key:l,value:u};_&&(j.scope=_),await St(j)},delete:async(l,u)=>{let y=Ur(u),_={op:"delete",key:l};y&&(_.scope=y),await St(_)},keys:async l=>{let u=Ur(l),y={op:"keys"};u&&(y.scope=u);let _=await St(y);if(_.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return _.keys}},onReady:l=>(o.add(l),v&&l(v),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),v&&l(v.directory),()=>{s.delete(l)}),onSession:l=>(i.add(l),v&&l(v.session),()=>{i.delete(l)}),onSessionLifecycle:l=>(d.add(l),Se&&l(Se),()=>{d.delete(l)}),onConnection:l=>(c.add(l),v&&l(v.connection),()=>{c.delete(l)}),onSettings:l=>(h.add(l),v&&l(v.settings),()=>{h.delete(l)}),onItem:l=>(f.add(l),v&&l(v.item),()=>{f.delete(l)}),onStatusControl:l=>(E.add(l),()=>{E.delete(l)}),onPopoverClosed:l=>(S.add(l),()=>{S.delete(l)}),setStatusControls:l=>v?.features?.statusControls!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support status controls.")):Cs(l)?ie({...Q,type:"status-controls",id:M(R),payload:{controls:l}}):Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>v?.features?.popovers!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):Nn(l)?ie({...Q,type:"popover-open",id:M(R),payload:l}):Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:zt,setPopoverAnchorActive:Z,onResolve:l=>(O=l,()=>{O===l&&(O=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>vr?Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${vr} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>Rr)?Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${Rr} characters.`)):ie({channel:G,v:1,type:"toast",id:M(R),payload:{...l,message:u}})},openUrl:l=>ie({channel:G,v:1,type:"open-url",id:M(R),payload:{url:l}}),openCommit:l=>$n(l)?ie({channel:G,v:1,type:"open-commit",id:M(R),payload:{sha:l}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>ie({channel:G,v:1,type:"open-surface",id:M(R),payload:{surfaceId:l}}),writeClipboard:l=>ie({channel:G,v:1,type:"clipboard-write",id:M(R),payload:{text:l}}),compose:l=>ie({channel:G,v:1,type:"compose",id:M(R),payload:l}),attach:l=>ie({channel:G,v:1,type:"attach",id:M(R),payload:Ct(l)}),startSession:async l=>{l.projectId!==void 0&&Ie(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Ie(u.directory):(u.name!==void 0&&Ie(u.name,200),u.baseBranch!==void 0&&Ie(u.baseBranch,200)));let y=await be({channel:G,v:1,type:"start-session",id:M(R),payload:Bn(l)},e.requestTimeoutMs??18e4);if(!Mn(y))throw new I("HOST_REJECTED","Host did not return a session.");return y},prompt:l=>be({channel:G,v:1,type:"prompt",id:M(R),payload:jn(l)}).then(u=>{if(!Un(u))throw new I("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>ie({channel:G,v:1,type:"session-link",id:M(R),payload:Ct(l)}),close:()=>ie({channel:G,v:1,type:"close",id:M(R)}),oauthStart:()=>ie({channel:G,v:1,type:"oauth-start",id:M(R)}),oauthDisconnect:()=>ie({channel:G,v:1,type:"oauth-disconnect",id:M(R)}),request:l=>(Nr(l.path)?be({channel:G,v:1,type:"request",id:M(R),payload:l}):ri()).then(u=>{if(!Pr(u))throw new I("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(Nr(l.path)?be({channel:G,v:1,type:"service-request",id:M(R),payload:l}):ri()).then(u=>{if(!Pr(u))throw new I("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>be({channel:G,v:1,type:"service-status",id:M(R)}).then(l=>{if(!Vn(l))throw new I("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(Lt(l)?be({channel:G,v:1,type:"file-read",id:M(R),payload:{path:l}}):Mr()).then(u=>{if(!Wn(u))throw new I("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>Lt(l)?u.length>Ir?Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${Ir} characters.`)):be({channel:G,v:1,type:"file-write",id:M(R),payload:{path:l,content:u}}).then(y=>{if(!Yn(y))throw new I("HOST_REJECTED","Host did not confirm the write.");return y}):Mr(),listDir:l=>(Lt(l)?be({channel:G,v:1,type:"file-list",id:M(R),payload:{path:l}}):Mr()).then(u=>{if(!qn(u))throw new I("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(Lt(l)?be({channel:G,v:1,type:"file-stat",id:M(R),payload:{path:l}}):Mr()).then(u=>{if(!Jn(u))throw new I("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),y=l.system?.trim();if(u.length===0||u.length>Cr)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${Cr} characters.`));if(y!==void 0&&(y.length===0||y.length>Lr))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${Lr} characters.`));let _=l.maxOutputTokens===void 0?void 0:Math.min(Fn,Math.max(1,Math.floor(l.maxOutputTokens)));if(_!==void 0&&!Number.isFinite(_))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let j={prompt:u};return y!==void 0&&(j.system=y),_!==void 0&&(j.maxOutputTokens=_),be({channel:G,v:1,type:"generate",id:M(R),payload:j},e.requestTimeoutMs??zn).then(Y=>{if(!Zn(Y))throw new I("HOST_REJECTED","Host did not return generated text.");return Y})},setBadge:l=>ie({channel:G,v:1,type:"badge",id:M(R),payload:{count:Xn(l)}}),setHeight:l=>ie({channel:G,v:1,type:"resize",id:M(R),payload:{height:Kn(l)}}),onFileOpen:l=>(q.add(l),V||(V=!0,t.addEventListener("keydown",pr,!0)),U&&l(U),()=>{q.delete(l)}),onFileSnapshot:l=>(T=l,()=>{T===l&&(T=null)}),onFileSaved:l=>(N.add(l),()=>{N.delete(l)}),reportFileChange:l=>lt({...Q,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:$t,reportFileUnsupported:()=>lt({...Q,type:"file-unsupported"}),dispose:()=>{for(let l of he.keys())ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:l}});he.clear();for(let l of ge.keys())ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:l}});ge.clear(),z=!0,O=null,P=null,T=null,q.clear(),N.clear(),V&&t.removeEventListener("keydown",pr,!0),t.removeEventListener("message",je),t.removeEventListener("keydown",ur,!0),t.removeEventListener("pointerover",B),t.removeEventListener("pointermove",B),t.removeEventListener("pointerout",fr),t.removeEventListener("focus",mr),t.removeEventListener("blur",hr);for(let l of J.values())clearTimeout(l.timer),l.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),o.clear(),s.clear(),i.clear(),d.clear(),c.clear(),h.clear(),f.clear(),E.clear(),S.clear()}}};var si=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var fp=new Set(si);var ii=["none","agent","user"];var hp=new Set(ii);var Il=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Cl=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ai=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,n]of Il)t.style.setProperty(r,e.tokens[n]);for(let[r,n,o]of Cl){let s=e.tokens[o]??"";t.style.setProperty(r,s),t.style.setProperty(n,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},so=(e,t)=>{ai(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Ll={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},re=(e,t)=>`var(--${e}, var(--oc-${Ll[e]}, ${t}))`,ft=re("surface-background","transparent"),Dr=re("surface-elevated","transparent"),Vt=re("surface-elevated-foreground","inherit"),Qe=re("surface-foreground","inherit"),ae=re("surface-muted-foreground","gray"),Nl=re("surface-muted","transparent"),Pe=re("interactive-border","currentColor"),Ce=re("interactive-hover","transparent"),mt=re("interactive-active","transparent"),io=re("interactive-selection","transparent"),ao=re("interactive-selection-foreground","inherit"),di=re("interactive-focus-ring","currentColor"),Ke=re("primary","currentColor"),lo=re("primary-text","inherit"),co=re("error-text","inherit"),Pl=re("font-sans","inherit"),po=re("font-mono","monospace"),pi=re("radius","9px"),uo=`calc(${pi} - 2px)`,li=`calc(${pi} - 4px)`,me=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,ci=`box-shadow: 0 0 0 2px ${di};`,Gr=e=>{let t=re(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${re(`${e}-text`,"inherit")}; }`},Ml=`
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
`,ui=`
.oc-sdk { color: ${Qe}; font-family: ${Pl}; }
.oc-sdk :focus-visible { outline: none; ${ci} }
.oc-sdk-mono { font-family: ${po}; }
.oc-sdk-muted { color: ${ae}; }
${Gr("success")}${Gr("warning")}${Gr("error")}${Gr("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ke}; --oc-sdk-tone-text: ${lo}; }

.oc-sdk-btn { border-radius: ${uo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${li}; }
.oc-sdk-btn[data-variant="default"] { color: ${lo}; background: ${me(Ke,10,ft)}; border-color: ${me(Ke,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${me(Ke,16,ft)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${me(Ke,22,ft)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Nl}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${mt}, ${mt}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Dr}; color: ${Vt}; border-color: ${Pe}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${mt}, ${mt}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ce}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${mt}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${re("status-error","red")}; color: ${co}; background: ${me("var(--oc-sdk-tone)",7,ft)}; border-color: ${me("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${me("var(--oc-sdk-tone)",9,ft)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${me("var(--oc-sdk-tone)",11,ft)}; }

.oc-sdk-field-note { color: ${ae}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${co}; }
.oc-sdk-input { border-radius: ${uo}; background: ${Dr}; color: ${Vt}; box-shadow: inset 0 0 0 1px ${me(Pe,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${ae}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${di}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${re("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${re("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${po}; }

.oc-sdk-search-icon { color: ${ae}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ke}; }
.oc-sdk-search-clear { border-radius: ${li}; color: ${ae}; }
.oc-sdk-search-clear:hover { background: ${Ce}; color: ${Qe}; }

.oc-sdk-trigger { border-color: ${Pe}; border-radius: ${uo}; background: ${Dr}; color: ${Vt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${mt}, ${mt}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${ae}; }
.oc-sdk-trigger-chevron { color: ${ae}; }
.oc-sdk-popup { --surface-foreground: ${Vt}; border-color: ${me(Pe,60)}; border-radius: 12px; background: ${Dr}; color: ${Vt}; box-shadow: 0 8px 24px ${me(Qe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ce}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${io}; color: ${ao}; }
.oc-sdk-option-check { color: ${Qe}; }
.oc-sdk-option[data-destructive="true"] { color: ${co}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${me(re("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${ae}; }
.oc-sdk-popup-empty { color: ${ae}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Pe}; border-radius: 4px; color: ${Qe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${me(Qe,60,Pe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Pe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ft}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ke}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ci} }
.oc-sdk-check-desc { color: ${ae}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${me(Qe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${ae}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Qe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${ao}; background: ${io}; border-color: ${Pe}; }
.oc-sdk-tab-count { color: ${ae}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Ce}; color: ${ae}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${me("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ce}; }
.oc-sdk-row[aria-selected="true"] { background: ${io}; color: ${ao}; }
.oc-sdk-row-lead { font-family: ${po}; color: ${ae}; }
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

.oc-sdk-text a { color: ${lo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${me(Pe,60)}; }
`,ee=`
${Rn}
${Ml}
${ui}`;var fi="oc-sdk-ui-style",et=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},te=e=>{let t=document.getElementById(fi);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}On(document);let r=document.createElement("style");r.id=fi,r.textContent=e,document.head.appendChild(r)},A=(e,t)=>{let r=document.createElement(e);return t&&(r.className=t),r},Le=e=>{let t=A("button",e);return t.type="button",t},le=(e,t)=>{let r=t??"";e.textContent!==r&&(e.textContent=r)},tt=(e,t,r)=>{r==null||r===""?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)},mi=(e,t)=>{let r=n=>{n.target instanceof Node&&e.contains(n.target)||t()};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0)}};var Ul=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},pe=(e,t)=>{te(ee);let r=t,n=Le("oc-sdk oc-sdk-btn"),o=Ul(),s=document.createElement("span");n.append(s),e.append(n);let i=()=>{n.dataset.variant=r.variant??"default",n.dataset.size=r.size??"default",n.disabled=!!r.disabled||!!r.loading,n.dataset.loading=r.loading?"true":"false",n.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&o.parentNode!==n?n.prepend(o):!r.loading&&o.parentNode===n&&o.remove(),le(s,r.label)},d=()=>{r.disabled||r.loading||r.onClick()};return n.addEventListener("click",d),i(),{update:c=>{r={...r,...c},i()},dispose:()=>{n.removeEventListener("click",d),n.remove()}}};var Nt=(e,t)=>{te(ee);let r=t,n=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=r.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");n.append(o,s,i),e.append(n);let d=()=>{le(o,r.label),o.hidden=!r.label,s instanceof HTMLInputElement?s.type=r.password?"password":"text":s.rows=r.rows??3,s.value!==r.value&&(s.value=r.value),s.disabled=!!r.disabled,tt(s,"placeholder",r.placeholder),s.dataset.mono=r.mono?"true":"false";let h=!!r.error;n.dataset.invalid=h?"true":"false",s.setAttribute("aria-invalid",h?"true":"false");let f=r.error??r.helper??"";le(i,f),i.hidden=f===""},c=()=>{r.onChange(s.value)};return s.addEventListener("input",c),d(),{update:h=>{r={...r,...h},d()},dispose:()=>{s.removeEventListener("input",c),n.remove()}}};var hi="http://www.w3.org/2000/svg",Dl={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ve=(e,t,r)=>{let n=document.createElementNS(hi,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),r&&n.setAttribute("class",r);let o=document.createElementNS(hi,"path");return o.setAttribute("d",Dl[e]),n.append(o),n};var fo=(e,t)=>{te(ee);let r=t,n=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Le("oc-sdk-search-clear");s.append(Ve("close",14)),s.tabIndex=-1,n.append(Ve("search",16,"oc-sdk-search-icon"),o,s),e.append(n);let i=()=>{let f=r.placeholder??"Search";tt(o,"placeholder",f),o.setAttribute("aria-label",r.label??f),s.setAttribute("aria-label","Clear search"),o.value!==r.value&&(o.value=r.value),n.dataset.active=r.value.trim()===""?"false":"true"},d=()=>{r.value!==""&&r.onChange(""),o.focus()},c=()=>{r.onChange(o.value)},h=f=>{f.key==="Escape"&&o.value!==""&&(f.preventDefault(),d())};return o.addEventListener("input",c),o.addEventListener("keydown",h),s.addEventListener("click",d),i(),r.autofocus&&o.focus(),{update:f=>{r={...r,...f},i()},dispose:()=>{o.removeEventListener("input",c),o.removeEventListener("keydown",h),s.removeEventListener("click",d),n.remove()}}};var We=(e,t="vertical")=>{let[r,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===r||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},rt=(e,t,r)=>{let n=e.filter(c=>!c.disabled);if(n.length===0)return null;let o=n[0],s=n[n.length-1];if(r==="first"||!o||!s)return o?.id??null;if(r==="last")return s.id;let i=n.findIndex(c=>c.id===t);return i===-1?r==="next"?o.id:s.id:n[Math.min(n.length-1,Math.max(0,i+(r==="next"?1:-1)))]?.id??null};var gi=(e,t)=>`${e}-${t??""}`,$r=(e,t,r,n)=>{let o=Le("oc-sdk-option");o.id=gi(e,r.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!r.disabled,t==="option"&&o.setAttribute("aria-selected",r.selected?"true":"false"),o.dataset.destructive=r.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=r.label,o.append(s),r.hint){let i=A("span","oc-sdk-option-hint");i.textContent=r.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(Ve("check",14)),o.append(i)}return o.addEventListener("pointerenter",n.hover),o.addEventListener("click",n.pick),o},Hr=(e,t,r,n)=>{let o=gi(r,n);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");tt(t,"aria-activedescendant",n?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Gl=(e,t)=>{let r=t.getBoundingClientRect();e.style.minWidth=`${Math.round(r.width)}px`,e.style.left=`${Math.round(r.left)}px`,e.style.top=`${Math.round(r.bottom+4)}px`;let n=e.offsetHeight,o=window.innerHeight-r.bottom-8;n>o&&r.top-8>o&&(e.style.top=`${Math.max(8,Math.round(r.top-4-n))}px`);let s=r.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(r.left-s))}px`)},Fr=(e,t,r,n)=>{e.append(r),Gl(r,t);let o=mi(e,n),s=()=>{n()},i=d=>{d.target instanceof Node&&r.contains(d.target)||n()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),r.remove()}};var ki=(e,t)=>{let r=t.trim().toLowerCase();return r?e.filter(n=>n.label.toLowerCase().includes(r)||n.id.toLowerCase().includes(r)):[...e]},$l=0,Wt=(e,t)=>{te(ee);let r=t,n=`oc-sdk-select-${$l+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${n}-label`;let i=Le("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let d=A("span","oc-sdk-trigger-value");i.append(d,Ve("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let c="",h=null,f=null,E=A("div","oc-sdk oc-sdk-popup"),S=A("div","oc-sdk-popup-search"),O=A("input","oc-sdk-input");O.type="text",O.autocomplete="off",S.append(O);let P=A("div");P.setAttribute("role","listbox"),P.tabIndex=-1,E.append(P);let q=()=>ki(r.options,r.searchable?c:""),N=()=>r.searchable?O:P,T=C=>{h=C,Hr(P,N(),n,C)},U=()=>{et(P);let C=q();if(C.length===0){let ce=A("div","oc-sdk-popup-empty");ce.textContent="No matches",P.append(ce)}for(let ce of C)P.append($r(n,"option",{...ce,selected:ce.id===r.value},{hover:()=>T(ce.id),pick:()=>he(ce.id)}));T(C.some(ce=>ce.id===h)?h:C[0]?.id??null)},V=()=>{let C=f;f=null,C?.(),c="",O.value="",i.setAttribute("aria-expanded","false")},J=()=>{f||r.disabled||(h=r.value,O.placeholder=r.searchPlaceholder??"Search",r.searchable?E.prepend(S):S.remove(),U(),f=Fr(o,i,E,V),i.setAttribute("aria-expanded","true"),N().focus())},he=C=>{V(),i.focus(),C!==r.value&&r.onChange(C)},ge=()=>{f?V():J()},z=C=>{!f&&We(C)&&(C.preventDefault(),J())},R=C=>{let ce=We(C);ce?(C.preventDefault(),T(rt(q(),h,ce))):C.key==="Enter"?(C.preventDefault(),h&&he(h)):C.key==="Escape"?(C.preventDefault(),V(),i.focus()):r.searchable&&C.target!==O&&C.key.length===1&&!C.ctrlKey&&!C.metaKey&&O.focus()},v=()=>{c=O.value,U()},Se=C=>{f&&!(C.relatedTarget instanceof Node&&o.contains(C.relatedTarget))&&V()},oe=()=>{le(s,r.label),s.hidden=!r.label;let C=r.options.find(ce=>ce.id===r.value);le(d,C?.label??r.placeholder??"Select"),d.dataset.empty=C?"false":"true",i.disabled=!!r.disabled,f&&U()};return i.addEventListener("click",ge),i.addEventListener("keydown",z),E.addEventListener("keydown",R),O.addEventListener("input",v),o.addEventListener("focusout",Se),oe(),{update:C=>{r={...r,...C},oe()},dispose:()=>{V(),i.removeEventListener("click",ge),i.removeEventListener("keydown",z),E.removeEventListener("keydown",R),O.removeEventListener("input",v),o.removeEventListener("focusout",Se),o.remove()}}};var Hl=(e,t,r)=>{te(ee);let n=t,o=Le("oc-sdk oc-sdk-check");o.setAttribute("role",r);let s=A("span",r==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");r==="checkbox"&&s.append(Ve("check",12));let i=A("span","oc-sdk-check-text"),d=A("span","oc-sdk-check-label"),c=A("span","oc-sdk-check-desc");i.append(d,c),o.append(s,i),e.append(o);let h=()=>{o.setAttribute("aria-checked",n.checked?"true":"false"),o.disabled=!!n.disabled,le(d,n.label),le(c,n.description),c.hidden=!n.description},f=()=>{n.disabled||n.onChange(!n.checked)};return o.addEventListener("click",f),h(),{update:E=>{n={...n,...E},h()},dispose:()=>{o.removeEventListener("click",f),o.remove()}}},zr=(e,t)=>Hl(e,t,"checkbox");var Br=(e,t)=>{te(ee);let r=t,n=A("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let o=()=>{et(n),n.dataset.track=r.trackBackground?"true":"false";for(let i of r.items){let d=Le("oc-sdk-tab");d.setAttribute("role","tab");let c=i.id===r.activeId;d.setAttribute("aria-selected",c?"true":"false"),d.tabIndex=c?0:-1,d.dataset.id=i.id;let h=A("span");if(h.textContent=i.label,d.append(h),i.count!==void 0){let f=A("span","oc-sdk-tab-count");f.textContent=String(i.count),d.append(f)}d.addEventListener("click",()=>{i.id!==r.activeId&&r.onChange(i.id)}),n.append(d)}},s=i=>{let d=We(i,"horizontal");if(!d)return;let c=rt(r.items,r.activeId,d);if(c&&c!==r.activeId){i.preventDefault(),r.onChange(c);let h=n.querySelector(`[data-id="${CSS.escape(c)}"]`);h instanceof HTMLElement&&h.focus()}};return n.addEventListener("keydown",s),o(),{update:i=>{r={...r,...i},o()},dispose:()=>{n.removeEventListener("keydown",s),n.remove()}}};var jr=(e,t)=>{te(ee);let r=t,n=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");n.append(o,s,i),e.append(n);let d=null,c=()=>{if(le(o,r.title),le(s,r.body),s.hidden=!r.body,i.hidden=!r.action,!r.action){d?.dispose(),d=null;return}let h={label:r.action.label,onClick:r.action.onClick};d?d.update(h):d=pe(i,{...h,variant:"outline",size:"sm"})};return c(),{update:h=>{r={...r,...h},c()},dispose:()=>{d?.dispose(),d=null,n.remove()}}};var nt=(e,t={})=>{te(ee);let r=t,n=A("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");n.append(o,s),e.append(n);let i=()=>{n.dataset.size=r.size??"default",le(s,r.label),s.hidden=!r.label,n.setAttribute("aria-label",r.label??"Loading")};return i(),{update:d=>{r={...r,...d},i()},dispose:()=>{n.remove()}}};var Pt=(e,t)=>{te(ee);let r=t,n=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),d=A("div","oc-sdk-banner-action");o.append(s,i),n.append(o,d),e.append(n);let c=null,h=()=>{if(n.dataset.tone=r.tone,n.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),le(s,r.title),le(i,r.body),i.hidden=!r.body,d.hidden=!r.action,!r.action){c?.dispose(),c=null;return}let f={label:r.action.label,onClick:r.action.onClick};c?c.update(f):c=pe(d,{...f,variant:"outline",size:"xs"})};return h(),{update:f=>{r={...r,...f},h()},dispose:()=>{c?.dispose(),c=null,n.remove()}}};var xi=e=>e.filter(t=>!("separator"in t)),zl=0,mo=(e,t)=>{te(ee);let r=t,n=`oc-sdk-menu-${zl+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,d=null,c=pe(o,{label:r.label,variant:r.variant,size:r.size,onClick:()=>{i?S():O()}}),h=o.querySelector("button");h?.setAttribute("aria-haspopup","menu");let f=T=>{d=T,Hr(s,s,n,T)},E=()=>{et(s);for(let T of r.items){if("separator"in T){let U=A("div","oc-sdk-separator");U.dataset.labeled="false",s.append(U);continue}s.append($r(n,"menuitem",T,{hover:()=>f(T.id),pick:()=>P(T.id)}))}f(xi(r.items).some(T=>T.id===d)?d:null)},S=()=>{let T=i;i=null,T?.(),d=null,h?.setAttribute("aria-expanded","false")},O=()=>{i||!h||(E(),i=Fr(o,h,s,S),h.setAttribute("aria-expanded","true"),s.focus())},P=T=>{S(),h?.focus(),r.onSelect(T)},q=T=>{let U=We(T);U?(T.preventDefault(),f(rt(xi(r.items),d,U))):T.key==="Enter"||T.key===" "?(T.preventDefault(),d&&P(d)):T.key==="Escape"&&(T.preventDefault(),S(),h?.focus())},N=T=>{i&&!(T.relatedTarget instanceof Node&&o.contains(T.relatedTarget))&&S()};return s.addEventListener("keydown",q),o.addEventListener("focusout",N),{update:T=>{r={...r,...T},c.update({label:r.label,variant:r.variant,size:r.size}),i&&E()},dispose:()=>{S(),s.removeEventListener("keydown",q),o.removeEventListener("focusout",N),c.dispose(),o.remove()}}};var Xr="https://cloud.kaneo.app",bi=Xr.replace(/\/api\/?$/,""),Ei="kaneo-tasks",ho=100,Ti=["no-priority","low","medium","high","urgent"];var Si={"no-priority":0,low:1,medium:2,high:3,urgent:4};var ve=class extends Error{status;code;constructor(t,r,n){super(n),this.name="KaneoError",this.status=t,this.code=r}};function Bl(e){if(!e)return;let t={};for(let[r,n]of Object.entries(e))n==null||n===""||(t[r]=String(n));return Object.keys(t).length>0?t:void 0}function jl(e,t){let r=typeof t=="object"&&t!==null?t:{},n=typeof r.message=="string"&&r.message?r.message:`Kaneo answered ${e}.`;return new ve(e,r.code??`HTTP_${e}`,n)}var Xl=10,Kl=2,Vl=800;function _i(e){async function t({method:n,path:o,query:s,body:i}){let d=Bl(s),c="/api"+o,h;for(let S=0;h=await e({method:n,path:c,...d?{query:d}:{},...i===void 0?{}:{body:JSON.stringify(i)}}),!(h.status!==429||S>=Kl);S+=1)await new Promise(O=>setTimeout(O,Vl*2**S));let f=h,E;if(f.body)try{E=JSON.parse(f.body)}catch{throw f.status>=400?new ve(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new ve(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw jl(f.status,E);return E}async function r(n){let o=encodeURIComponent(n),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:ho}}),i=s.data,d=s.pagination,c=1;for(;c<Math.min(d.totalPages,Xl);){c+=1;let h=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:c,limit:ho}});for(let f of h.data.columns){let E=i.columns.find(S=>S.id===f.id);E&&E.tasks.push(...f.tasks)}i.archivedTasks.push(...h.data.archivedTasks),i.plannedTasks.push(...h.data.plannedTasks)}return{board:i,pagination:d,truncated:d.totalPages>c}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(n,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:n,includeArchived:o?"true":void 0}}),getBoard:r,getTask:n=>t({method:"GET",path:`/task/${encodeURIComponent(n)}`,query:{view:"detail"}}),getTaskByTicketId:(n,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(n)}`,query:{workspaceId:o}}),listAssignedTasks:n=>t({method:"GET",path:"/task/assigned",query:{workspaceId:n}}),search:(n,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:n,projectId:s.projectId,limit:s.limit??30}}),listLabels:n=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(n)}`}),listColumns:n=>t({method:"GET",path:`/column/${encodeURIComponent(n)}`}),listComments:n=>t({method:"GET",path:`/comment/${encodeURIComponent(n)}`}),createComment:(n,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(n)}`,body:{content:o}}),createTask:(n,o)=>t({method:"POST",path:`/task/${encodeURIComponent(n)}`,body:o}),updateTaskStatus:(n,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(n)}`,body:{status:o}}),updateTaskPriority:(n,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(n)}`,body:{priority:o}})}}function Wl(e){return e instanceof ve?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function ot(e,t){return console.error(`${e} failed:`,t),Wl(t)}function Yl(e,t){this.v=e,this.k=t}function yi(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function ql(e){if(Array.isArray(e))return e}function Jl(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,o,s,i,d=[],c=!0,h=!1;try{if(s=(r=r.call(e)).next,t===0){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=s.call(r)).done)&&(d.push(n.value),d.length!==t);c=!0);}catch(f){h=!0,o=f}finally{try{if(!c&&r.return!=null&&(i=r.return(),Object(i)!==i))return}finally{if(h)throw o}}return d}}function Zl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ql(e,t){return ql(e)||Jl(e,t)||ec(e,t)||Zl()}function ec(e,t){if(e){if(typeof e=="string")return yi(e,t);var r={}.toString.call(e).slice(8,-1);return r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set"?Array.from(e):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?yi(e,t):void 0}}function Kr(e){var t,r;function n(s,i){try{var d=e[s](i),c=d.value,h=c instanceof Yl;Promise.resolve(h?c.v:c).then(function(f){if(h){var E=s==="return"&&c.k?s:"next";if(!c.k||f.done)return n(E,f);f=e[E](f).value}o(!!d.done,f)},function(f){n("throw",f)})}catch(f){o(2,f)}}function o(s,i){s===2?t.reject(i):t.resolve({value:i,done:s}),(t=t.next)?n(t.key,t.arg):r=null}this._invoke=function(s,i){return new Promise(function(d,c){var h={key:s,arg:i,resolve:d,reject:c,next:null};r?r=r.next=h:(t=r=h,n(s,i))})},typeof e.return!="function"&&(this.return=void 0)}Kr.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},Kr.prototype.next=function(e){return this._invoke("next",e)},Kr.prototype.throw=function(e){return this._invoke("throw",e)},Kr.prototype.return=function(e){return this._invoke("return",e)};var $i=Object.entries,wi=Object.setPrototypeOf,tc=Object.isFrozen,Hi=Object.getPrototypeOf,Fi=Object.getOwnPropertyDescriptor,xe=Object.freeze,Te=Object.seal,Mt=Object.create,zi=typeof Reflect<"u"&&Reflect,wo=zi.apply,Ao=zi.construct;xe||(xe=function(t){return t});Te||(Te=function(t){return t});wo||(wo=function(t,r){for(var n=arguments.length,o=new Array(n>2?n-2:0),s=2;s<n;s++)o[s-2]=arguments[s];return t.apply(r,o)});Ao||(Ao=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return new t(...n)});var Ye=ne(Array.prototype.forEach);Array.prototype.indexOf;var rc=ne(Array.prototype.lastIndexOf),Ai=ne(Array.prototype.pop),Yt=ne(Array.prototype.push),nc=ne(Array.prototype.slice),oc=ne(Array.prototype.splice),Ut=Array.isArray,go=Bi(Set),ko=ne(Set.prototype.add),qt=ne(Set.prototype.has),ht=ne(String.prototype.toLowerCase),xo=ne(String.prototype.toString),vi=ne(String.prototype.match),Jt=ne(String.prototype.replace),Ri=ne(String.prototype.indexOf),sc=ne(String.prototype.trim),ic=ne(Number.prototype.toString),ac=ne(Boolean.prototype.toString),Oi=typeof BigInt>"u"?null:ne(BigInt.prototype.toString),Ii=typeof Symbol>"u"?null:ne(Symbol.prototype.toString),Re=ne(Object.prototype.hasOwnProperty),Zt=ne(Object.prototype.toString),Ee=ne(RegExp.prototype.test),qe=Bi(TypeError);function ne(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return wo(e,t,n)}}function Bi(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Ao(e,r)}}function H(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ht;if(wi&&wi(e,null),!Ut(t))return e;let n=t.length;for(;n--;){let o=t[n];if(typeof o=="string"){let s=r(o);s!==o&&(tc(t)||(t[n]=s),o=s)}e[o]=!0}return e}function lc(e){for(let t=0;t<e.length;t++)Re(e,t)||(e[t]=null);return e}function Ne(e){let t=Mt(null);for(let n of $i(e)){var r=Ql(n,2);let o=r[0],s=r[1];Re(e,o)&&(Ut(s)?t[o]=lc(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Ne(s):t[o]=s)}return t}function cc(e){switch(typeof e){case"string":return e;case"number":return ic(e);case"boolean":return ac(e);case"bigint":return Oi?Oi(e):"0";case"symbol":return Ii?Ii(e):"Symbol()";case"undefined":return Zt(e);case"function":case"object":{if(e===null)return Zt(e);let t=e,r=Me(t,"toString");if(typeof r=="function"){let n=r(t);return typeof n=="string"?n:Zt(n)}return Zt(e)}default:return Zt(e)}}function Me(e,t){for(;e!==null;){let n=Fi(e,t);if(n){if(n.get)return ne(n.get);if(typeof n.value=="function")return ne(n.value)}e=Hi(e)}function r(){return null}return r}function dc(e,t){for(;e!==null;){let r=Fi(e,t);if(r)return r.get?ne(r.get):null;e=Hi(e)}return null}function pc(e){try{return Ee(e,""),!0}catch{return!1}}var Ci=xe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bo=xe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Eo=xe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),uc=xe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),To=xe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fc=xe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Li=xe(["#text"]),Ni=xe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),So=xe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Pi=xe(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Vr=xe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),mc=Te(/{{[\w\W]*|^[\w\W]*}}/g),hc=Te(/<%[\w\W]*|^[\w\W]*%>/g),gc=Te(/\${[\w\W]*/g),kc=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),xc=Te(/^aria-[\-\w]+$/),Mi=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bc=Te(/^(?:\w+script|data):/i),Ec=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tc=Te(/^html$/i),Sc=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),_o=Te(/<[/\w!]/g),Ui=Te(/<[/\w]/g),_c=Te(/<\/no(script|embed|frames)/i),Di=Te(/\/>/i),ue={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yc=xe(H({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),wc=function(){return typeof window>"u"?null:window},Ac=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,o="data-tt-policy-suffix";r&&r.hasAttribute(o)&&(n=r.getAttribute(o));let s="dompurify"+(n?"#"+n:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Gi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},st=function(t,r,n,o){return Re(t,r)&&Ut(t[r])?H(o.base?Ne(o.base):{},t[r],o.transform):n},yo=function(t,r,n){let o=Re(t,r)?t[r]:void 0;return o&&typeof o=="object"?Ne(o):n()};function ji(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wc(),t=x=>ji(x);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ue.document||!e.Element)return t.isSupported=!1,t;let r=e.document,n=r,o=n.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,i=e.Node,d=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let h=e.DOMParser,f=e.trustedTypes,E=d.prototype,S=Me(E,"cloneNode"),O=Me(E,"remove"),P=Me(E,"removeAttributeNode"),q=Me(E,"nextSibling"),N=Me(E,"childNodes"),T=Me(E,"parentNode"),U=Me(E,"shadowRoot"),V=Me(E,"attributes"),J=i&&i.prototype?Me(i.prototype,"nodeType"):null,he=i&&i.prototype?Me(i.prototype,"nodeName"):null,ge=i&&i.prototype?Me(i.prototype,"ownerDocument"):null,z=function(a){return J?J(a):a.nodeType},R=function(a){return he?he(a):a.nodeName},v=dc(E,"namespaceURI"),Se=function(a){return v?v(a):a.namespaceURI};if(typeof s=="function"){let x=r.createElement("template");x.content&&x.content.ownerDocument&&(r=x.content.ownerDocument)}let oe,C="",ce,Gt=!1,ke=0,se=function(){if(ke>0)throw qe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},je=function(a){se(),ke++;try{return oe.createHTML(a)}finally{ke--}},be=function(a){se(),ke++;try{return oe.createScriptURL(a)}finally{ke--}},ie=function(){return Gt||(ce=Ac(f,o),Gt=!0),ce},Q=r,lt=Q.implementation,$t=Q.createNodeIterator,pr=Q.createDocumentFragment,ur=Q.getElementsByTagName,Tt=n.importNode,B=Gi();t.isSupported=typeof $i=="function"&&typeof T=="function"&&lt&&lt.createHTMLDocument!==void 0;let fr=mc,mr=hc,hr=gc,Ie=kc,Ht=xc,Ft=bc,gr=Ec,St=Sc,zt=Mi,Z=null,l=H({},[...Ci,...bo,...Eo,...To,...Li]),u=null,y=H({},[...Ni,...So,...Pi,...Vr]),_=Object.seal(Mt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),j=null,Y=null,W=Object.seal(Mt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ts=!0,ln=!0,rs=!1,cn=!0,Xe=!1,ct=!0,dt=!1,dn=!1,kr=null,xr=null,pn=!1,_t=!1,br=!1,Er=!1,ns=!0,os=!1,ss="user-content-",un=!0,fn=!1,pt=null,yt={},ut=null,is=H({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),as=null,ls=H({},["audio","video","img","source","image","track"]),cs=null,ds=H({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Tr="http://www.w3.org/1998/Math/MathML",Sr="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",wt=Fe,mn=!1,hn=null,rl=H({},[Tr,Sr,Fe],xo),ps=xe(["mi","mo","mn","ms","mtext"]),gn=H({},ps),us=xe(["annotation-xml"]),kn=H({},us),nl=H({},["title","style","font","a","script"]),Bt=null,ol=["application/xhtml+xml","text/html"],sl="text/html",de=null,At=null,il=r.createElement("form"),fs=function(a){return a instanceof RegExp||a instanceof Function},xn=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(At&&At===a)return;(!a||typeof a!="object")&&(a={}),a=Ne(a),Bt=ol.indexOf(a.PARSER_MEDIA_TYPE)===-1?sl:a.PARSER_MEDIA_TYPE,de=Bt==="application/xhtml+xml"?xo:ht,Z=st(a,"ALLOWED_TAGS",l,{transform:de}),u=st(a,"ALLOWED_ATTR",y,{transform:de}),hn=st(a,"ALLOWED_NAMESPACES",rl,{transform:xo}),cs=st(a,"ADD_URI_SAFE_ATTR",ds,{transform:de,base:ds}),as=st(a,"ADD_DATA_URI_TAGS",ls,{transform:de,base:ls}),ut=st(a,"FORBID_CONTENTS",is,{transform:de}),j=st(a,"FORBID_TAGS",Ne({}),{transform:de}),Y=st(a,"FORBID_ATTR",Ne({}),{transform:de}),yt=Re(a,"USE_PROFILES")?a.USE_PROFILES&&typeof a.USE_PROFILES=="object"?Ne(a.USE_PROFILES):a.USE_PROFILES:!1,ts=a.ALLOW_ARIA_ATTR!==!1,ln=a.ALLOW_DATA_ATTR!==!1,rs=a.ALLOW_UNKNOWN_PROTOCOLS||!1,cn=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Xe=a.SAFE_FOR_TEMPLATES||!1,ct=a.SAFE_FOR_XML!==!1,dt=a.WHOLE_DOCUMENT||!1,_t=a.RETURN_DOM||!1,br=a.RETURN_DOM_FRAGMENT||!1,Er=a.RETURN_TRUSTED_TYPE||!1,pn=a.FORCE_BODY||!1,ns=a.SANITIZE_DOM!==!1,os=a.SANITIZE_NAMED_PROPS||!1,un=a.KEEP_CONTENT!==!1,fn=a.IN_PLACE||!1,zt=pc(a.ALLOWED_URI_REGEXP)?a.ALLOWED_URI_REGEXP:Mi,wt=typeof a.NAMESPACE=="string"?a.NAMESPACE:Fe,gn=yo(a,"MATHML_TEXT_INTEGRATION_POINTS",()=>H({},ps)),kn=yo(a,"HTML_INTEGRATION_POINTS",()=>H({},us));let p=yo(a,"CUSTOM_ELEMENT_HANDLING",()=>Mt(null));if(_=Mt(null),Re(p,"tagNameCheck")&&fs(p.tagNameCheck)&&(_.tagNameCheck=p.tagNameCheck),Re(p,"attributeNameCheck")&&fs(p.attributeNameCheck)&&(_.attributeNameCheck=p.attributeNameCheck),Re(p,"allowCustomizedBuiltInElements")&&typeof p.allowCustomizedBuiltInElements=="boolean"&&(_.allowCustomizedBuiltInElements=p.allowCustomizedBuiltInElements),Te(_),Xe&&(ln=!1),br&&(_t=!0),yt&&(Z=H({},Li),u=Mt(null),yt.html===!0&&(H(Z,Ci),H(u,Ni)),yt.svg===!0&&(H(Z,bo),H(u,So),H(u,Vr)),yt.svgFilters===!0&&(H(Z,Eo),H(u,So),H(u,Vr)),yt.mathMl===!0&&(H(Z,To),H(u,Pi),H(u,Vr))),W.tagCheck=null,W.attributeCheck=null,Re(a,"ADD_TAGS")&&(typeof a.ADD_TAGS=="function"?W.tagCheck=a.ADD_TAGS:Ut(a.ADD_TAGS)&&(Z===l&&(Z=Ne(Z)),H(Z,a.ADD_TAGS,de))),Re(a,"ADD_ATTR")&&(typeof a.ADD_ATTR=="function"?W.attributeCheck=a.ADD_ATTR:Ut(a.ADD_ATTR)&&(u===y&&(u=Ne(u)),H(u,a.ADD_ATTR,de))),Re(a,"ADD_FORBID_CONTENTS")&&Ut(a.ADD_FORBID_CONTENTS)&&(ut===is&&(ut=Ne(ut)),H(ut,a.ADD_FORBID_CONTENTS,de)),un&&(Z["#text"]=!0),dt&&H(Z,["html","head","body"]),Z.table&&(H(Z,["tbody"]),delete j.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let g=oe;oe=a.TRUSTED_TYPES_POLICY;try{C=je("")}catch(k){throw oe=g,k}}else a.TRUSTED_TYPES_POLICY===null?(oe=void 0,C=""):(oe===void 0&&(oe=ie()),oe&&typeof C=="string"&&(C=je("")));xe&&xe(a),At=a},ms=H({},[...bo,...Eo,...uc]),hs=H({},[...To,...fc]),al=function(a,p,g){return p.namespaceURI===Fe?a==="svg":p.namespaceURI===Tr?a==="svg"&&(g==="annotation-xml"||gn[g]):!!ms[a]},ll=function(a,p,g){return p.namespaceURI===Fe?a==="math":p.namespaceURI===Sr?a==="math"&&kn[g]:!!hs[a]},cl=function(a,p,g){return p.namespaceURI===Sr&&!kn[g]||p.namespaceURI===Tr&&!gn[g]?!1:!hs[a]&&(nl[a]||!ms[a])},dl=function(a){let p=Se(a),g=ht(R(a)),k=T(a),w,L;return k&&z(k)===ue.element?(w={namespaceURI:Se(k)},L=ht(R(k))):(w={namespaceURI:wt},L="template"),hn[p]?p===Sr?al(g,w,L):p===Tr?ll(g,w,L):p===Fe?cl(g,w,L):!!(Bt==="application/xhtml+xml"&&hn[p]):!1},Je=function(a){Yt(t.removed,{element:a});try{T(a).removeChild(a)}catch{if(O(a),!T(a))throw qe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},gs=function(a,p,g){try{P(a,p)}catch{try{a.removeAttribute(g)}catch{}}},bn=function(a){Tn(a);let p=N(a);p&&Ye(nc(p),k=>{try{O(k)}catch{}});let g=z(a)===ue.element?V(a):null;if(g)for(let k=g.length-1;k>=0;--k){let w=g[k],L=w&&w.name;typeof L=="string"&&gs(a,w,L)}},vt=function(a,p,g){if(!g)try{g=p.getAttributeNode(a)}catch{g=null}Yt(t.removed,{attribute:g||null,from:p});try{g?P(p,g):p.removeAttribute(a)}catch{try{p.removeAttribute(a)}catch{}}if(a==="is")if(_t||br)try{Je(p)}catch{}else try{p.setAttribute(a,"")}catch{}},ks=function(a){let p=V(a);if(p)for(let g=p.length-1;g>=0;--g){let k=p[g],w=k&&k.name;typeof w!="string"||u[de(w)]||gs(a,k,w)}},En=function(a,p){let g=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,k=[a];for(;k.length>0;){let w=k.pop();if(p(w)===!1)continue;if(g&&z(w)===ue.element){let D=U(w);Ze(D)&&k.push(D)}let L=N(w);if(L)for(let D=L.length-1;D>=0;--D)k.push(L[D])}},Tn=function(a){En(a,p=>{z(p)===ue.element&&ks(p)})},Sn=function(a){let p=[];return En(a,g=>{p.push(g)},!0),p},pl=function(a,p){let g=go();Ye(Sn(a),k=>{z(k)===ue.element&&ko(g,k)}),Ye(p,k=>{z(k)===ue.element&&!qt(g,k)&&ks(k)})},xs=function(a,p){let g=!1;return Ye(t.removed,k=>{k.element&&(g=g||k.element===a,Tn(k.element))}),pl(a,p),g},ul=8,fl=function(a,p){let g=pt,k=null,w=()=>(k||(k=go(),Ye(p,L=>{ko(k,L)})),k);for(let L=0;;L++){let D=Sn(a),fe=[a],ze=!1;if(Ye(D,_e=>{z(_e)===ue.documentFragment?Yt(fe,_e):!ze&&!qt(g,_e)&&(ze=qt(w(),_e))}),!ze)return;if(L>=ul)throw qe("the tree kept changing during in-place sanitization; refusing to return it");Ye(fe,(_e,we)=>{ml(_e,we>0,a,w())})}},ml=function(a,p,g,k){let w=_n(a),L;for(;L=w.nextNode();)!qt(k,L)||qt(pt,L)||(p&&Ge(B.uponSanitizeShadowNode,L,null),wn(L,g),An(L,g),Ze(L.content)&&Xt(L.content))},hl=function(a){pt&&ko(pt,a)},bs=function(a,p){return ct?a==="patchsrc"?!0:a==="for"&&p!=="label"&&p!=="output":!1},gl=function(a){ct&&En(a,p=>{let g=z(p);if(g===ue.processingInstruction||g===ue.comment&&Ee(Ui,p.data)){try{O(p)}catch{}return!1}if(g===ue.element){let k=p,w=de(R(p));try{k.hasAttribute&&k.hasAttribute("patchsrc")&&k.removeAttribute("patchsrc"),k.hasAttribute&&k.hasAttribute("for")&&bs("for",w)&&k.removeAttribute("for")}catch{}}return!0})},Es=function(a){let p=null,g=null;if(pn)a="<remove></remove>"+a;else{let L=vi(a,/^[\r\n\t ]+/);g=L&&L[0]}Bt==="application/xhtml+xml"&&wt===Fe&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");let k=oe?je(a):a;if(wt===Fe)try{p=new h().parseFromString(k,Bt)}catch{}if(!p||!p.documentElement){p=lt.createDocument(wt,"template",null);try{p.documentElement.innerHTML=mn?C:k}catch{}}let w=p.body||p.documentElement;return a&&g&&w.insertBefore(r.createTextNode(g),w.childNodes[0]||null),wt===Fe?ur.call(p,dt?"html":"body")[0]:dt?p.documentElement:w},_n=function(a){let p=ge?ge(a):a.ownerDocument;return $t.call(p||a,a,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},_r=function(a){return a=Jt(a,fr," "),a=Jt(a,mr," "),a=Jt(a,hr," "),a},yn=function(a){var p;Ts(a);let g=(p=a.querySelectorAll)===null||p===void 0?void 0:p.call(a,"template");g&&Ye(g,k=>{Ze(k.content)&&yn(k.content)})},Ts=function(a){a.normalize();let p=ge?ge(a):a.ownerDocument,g=$t.call(p||a,a,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),k=g.nextNode();for(;k;)k.data=_r(k.data),k=g.nextNode()},yr=function(a){let p=he?he(a):null;return typeof p!="string"||de(p)!=="form"?!1:typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||a.attributes!==V(a)||typeof a.removeAttribute!="function"||typeof a.removeAttributeNode!="function"||typeof a.getAttributeNode!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function"||a.nodeType!==J(a)||a.childNodes!==N(a)},Ze=function(a){if(!J||typeof a!="object"||a===null)return!1;try{return J(a)===ue.documentFragment}catch{return!1}},jt=function(a){if(!J||typeof a!="object"||a===null)return!1;try{return typeof J(a)=="number"}catch{return!1}};function Ge(x,a,p){x.length!==0&&Ye(x,g=>{g.call(t,a,p,At)})}let kl=function(a,p){return!!(ct&&a.hasChildNodes()&&!jt(a.firstElementChild)&&Ee(_o,a.textContent)&&Ee(_o,a.innerHTML)||ct&&yc[p]&&z(a)===ue.element&&Se(a)===Fe&&(jt(a.firstElementChild)||typeof a.textContent=="string"&&Ee(_o,a.textContent))||a.nodeType===ue.processingInstruction||ct&&a.nodeType===ue.comment&&Ee(Ui,a.data))},wr=function(a,p){if(a instanceof RegExp)return Ee(a,p);if(a instanceof Function){for(var g=arguments.length,k=new Array(g>2?g-2:0),w=2;w<g;w++)k[w-2]=arguments[w];return!!a(p,...k)}return!1},xl=function(a,p,g){if(!j[p]&&ys(p)&&wr(_.tagNameCheck,p))return!1;if(un&&!ut[p]&&!ut[ht(p)]){let k=T(a),w=N(a);if(w&&k){let L=w.length;for(let D=L-1;D>=0;--D){let fe=a===g?S(w[D],!0):w[D];k.insertBefore(fe,q(a))}}}return Je(a),!0},Ss=function(a,p,g,k){return a.length===0?p:p===g||p===k?Ne(p):p},Rt=function(a,p){return a===p||T(a)!==null?!1:(fn&&Tn(a),!0)},wn=function(a,p){if(hl(a),Ge(B.beforeSanitizeElements,a,null),Rt(a,p))return!0;if(yr(a))return Je(a),!0;let g=de(R(a));if(Z=Ss(B.uponSanitizeElement,Z,l,kr),Ge(B.uponSanitizeElement,a,{tagName:g,allowedTags:Z}),Rt(a,p))return!0;if(kl(a,g))return Je(a),!0;if(j[g]||!(W.tagCheck instanceof Function&&W.tagCheck(g))&&!Z[g]){let k=xl(a,g,p);return k===!1&&(Ge(B.afterSanitizeElements,a,null),Rt(a,p))?!0:k}if(z(a)===ue.element&&!dl(a)||(g==="noscript"||g==="noembed"||g==="noframes")&&Ee(_c,a.innerHTML))return Je(a),!0;if(Xe&&a.nodeType===ue.text){let k=_r(a.textContent);a.textContent!==k&&(Yt(t.removed,{element:a.cloneNode()}),a.textContent=k)}return Ge(B.afterSanitizeElements,a,null),Rt(a,p)},_s=function(a,p,g){if(Y[p]||bs(p,a)||ns&&(p==="id"||p==="name")&&(g in r||g in il))return!1;let k=u[p]||W.attributeCheck instanceof Function&&W.attributeCheck(p,a);return ln&&Ee(Ie,p)||ts&&Ee(Ht,p)?!0:k?cs[p]||Ee(zt,Jt(g,gr,""))||(p==="src"||p==="xlink:href"||p==="href")&&a!=="script"&&Ri(g,"data:")===0&&as[a]||rs&&!Ee(Ft,Jt(g,gr,""))?!0:!g:ys(a)&&wr(_.tagNameCheck,a)&&wr(_.attributeNameCheck,p,a)||p==="is"&&_.allowCustomizedBuiltInElements&&wr(_.tagNameCheck,g)},bl=H({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),ys=function(a){return!bl[ht(a)]&&Ee(St,a)},El=function(a,p,g,k){if(oe&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!g)switch(f.getAttributeType(a,p)){case"TrustedHTML":return je(k);case"TrustedScriptURL":return be(k)}return k},Tl=function(a,p,g,k){try{return g?a.setAttributeNS(g,p,k):a.setAttribute(p,k),yr(a)?(Je(a),!1):!0}catch{return vt(p,a),!1}},ws=function(a,p){return ct&&Ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,p)?!0:ht(a)==="attributename"&&vi(p,"href")!==null},An=function(a,p){if(Ge(B.beforeSanitizeAttributes,a,null),Rt(a,p))return;let g=a.attributes;if(!g||yr(a))return;u=Ss(B.uponSanitizeAttribute,u,y,xr);let k={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},w=g.length,L=de(a.nodeName);for(;w--;){let D=g[w],fe=D.name,ze=D.namespaceURI,_e=D.value,we=de(fe),Ot=_e,Ae=fe==="value"?Ot:sc(Ot),As=!1;if(k.attrName=we,k.attrValue=Ae,k.keepAttr=!0,k.forceKeepAttr=void 0,Ge(B.uponSanitizeAttribute,a,k),Ae=k.attrValue,os&&(we==="id"||we==="name")&&Ri(Ae,ss)!==0&&(vt(fe,a,D),Ae=ss+Ae,As=!0),ws(fe,Ae)){vt(fe,a,D);continue}if(!k.forceKeepAttr){if(!k.keepAttr){vt(fe,a,D);continue}if(!cn&&Ee(Di,Ae)){vt(fe,a,D);continue}if(Xe&&(Ae=_r(Ae)),!_s(L,we,Ae)){vt(fe,a,D);continue}Ae=El(L,we,ze,Ae),Ae!==Ot&&Tl(a,fe,ze,Ae)&&As&&Ai(t.removed)}}Ge(B.afterSanitizeAttributes,a,null),Rt(a,p)},Xt=function(a){let p=null,g=_n(a);for(Ge(B.beforeSanitizeShadowDOM,a,null);p=g.nextNode();)if(Ge(B.uponSanitizeShadowNode,p,null),wn(p,a),An(p,a),Ze(p.content)&&Xt(p.content),z(p)===ue.element){let k=U(p);Ze(k)&&(vn(k),Xt(k))}Xe&&Ts(a),Ge(B.afterSanitizeShadowDOM,a,null)},vn=function(a){let p=[{node:a,shadow:null}];for(;p.length>0;){let g=p.pop();if(g.shadow){Xt(g.shadow);continue}let k=g.node,w=z(k)===ue.element,L=N(k);if(L)for(let D=L.length-1;D>=0;--D)p.push({node:L[D],shadow:null});if(w){let D=he?he(k):null;if(typeof D=="string"&&de(D)==="template"){let fe=k.content;Ze(fe)&&p.push({node:fe,shadow:null})}}if(w){let D=U(k);Ze(D)&&p.push({node:null,shadow:D},{node:D,shadow:null})}}};return t.sanitize=function(x){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,g=null,k=null,w=null;if(mn=!x,mn&&(x="<!-->"),typeof x!="string"&&!jt(x)&&(x=cc(x),typeof x!="string"))throw qe("dirty is not a string, aborting");if(!t.isSupported)return x;dn?(Z=kr,u=xr):xn(a),(B.uponSanitizeElement.length>0||B.uponSanitizeAttribute.length>0)&&(Z=Ne(Z)),B.uponSanitizeAttribute.length>0&&(u=Ne(u)),t.removed=[];let L=fn&&typeof x!="string"&&jt(x),D=[],fe=pt;if(L){gl(x);let we=R(x);if(typeof we=="string"){let Ot=de(we);if(!Z[Ot]||j[Ot])throw bn(x),qe("root node is forbidden and cannot be sanitized in-place")}if(yr(x))throw bn(x),qe("root node is clobbered and cannot be sanitized in-place");D=Sn(x),pt=go()}else if(jt(x))p=Es("<!---->"),g=p.ownerDocument.importNode(x,!0),g.nodeType===ue.element&&g.nodeName==="BODY"||g.nodeName==="HTML"?p=g:p.appendChild(g),vn(p);else{if(!_t&&!Xe&&!dt&&x.indexOf("<")===-1)return oe&&Er?je(x):x;if(p=Es(x),!p)return _t?null:Er?C:""}p&&pn&&Je(p.firstChild);let ze=L?x:p;try{L&&vn(x);let we=_n(ze);for(;k=we.nextNode();)wn(k,ze),An(k,ze),Ze(k.content)&&Xt(k.content);L&&fl(x,D)}catch(we){throw L&&(bn(x),xs(x,D)),we}finally{pt=fe}if(L){if(xs(x,D))throw qe("a node selected for removal could not be safely returned; refusing to sanitize in place");return Xe&&yn(x),x}if(_t){if(Xe&&yn(p),br)for(w=pr.call(p.ownerDocument);p.firstChild;)w.appendChild(p.firstChild);else w=p;return(u.shadowroot||u.shadowrootmode)&&(w=Tt.call(n,w,!0)),w}let _e=dt?p.outerHTML:p.innerHTML;return dt&&Z["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&Ee(Tc,p.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+_e),Xe&&(_e=_r(_e)),oe&&Er?je(_e):_e},t.setConfig=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xn(x),dn=!0,kr=Z,xr=u},t.clearConfig=function(){At=null,dn=!1,kr=null,xr=null,oe=ce,C=""},t.isValidAttribute=function(x,a,p){At||xn({});let g=de(x),k=de(a);return typeof p=="string"&&(ws(a,p)||!cn&&Ee(Di,p))?!1:_s(g,k,p)},t.addHook=function(x,a){typeof a=="function"&&Re(B,x)&&Yt(B[x],a)},t.removeHook=function(x,a){if(Re(B,x)){if(a!==void 0){let p=rc(B[x],a);return p===-1?void 0:oc(B[x],p,1)[0]}return Ai(B[x])}},t.removeHooks=function(x){Re(B,x)&&(B[x]=[])},t.removeAllHooks=function(){B=Gi()},t}var Xi=ji();function Io(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=Io();function Zi(e){kt=e}var rr={exec:()=>null};function F(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(ye.caret,"$1"),r=r.replace(o,i),n},getRegex:()=>new RegExp(r,t)};return n}var vc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Rc=/^(?:[ \t]*(?:\n|$))+/,Oc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ic=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,nr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Cc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Co=/(?:[*+-]|\d{1,9}[.)])/,Qi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ea=F(Qi).replace(/bull/g,Co).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Lc=F(Qi).replace(/bull/g,Co).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Lo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Nc=/^[^\n]+/,No=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Pc=F(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",No).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Mc=F(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Co).getRegex(),Zr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Po=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Uc=F("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Po).replace("tag",Zr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ta=F(Lo).replace("hr",nr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zr).getRegex(),Dc=F(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ta).getRegex(),Mo={blockquote:Dc,code:Oc,def:Pc,fences:Ic,heading:Cc,hr:nr,html:Uc,lheading:ea,list:Mc,newline:Rc,paragraph:ta,table:rr,text:Nc},Ki=F("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",nr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zr).getRegex(),Gc={...Mo,lheading:Lc,table:Ki,paragraph:F(Lo).replace("hr",nr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ki).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zr).getRegex()},$c={...Mo,html:F(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Po).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:rr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:F(Lo).replace("hr",nr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ea).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Hc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Fc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ra=/^( {2,}|\\)\n(?!\s*$)/,zc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Qr=/[\p{P}\p{S}]/u,Uo=/[\s\p{P}\p{S}]/u,na=/[^\s\p{P}\p{S}]/u,Bc=F(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Uo).getRegex(),oa=/(?!~)[\p{P}\p{S}]/u,jc=/(?!~)[\s\p{P}\p{S}]/u,Xc=/(?:[^\s\p{P}\p{S}]|~)/u,Kc=F(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),sa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Vc=F(sa,"u").replace(/punct/g,Qr).getRegex(),Wc=F(sa,"u").replace(/punct/g,oa).getRegex(),ia="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Yc=F(ia,"gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,Uo).replace(/punct/g,Qr).getRegex(),qc=F(ia,"gu").replace(/notPunctSpace/g,Xc).replace(/punctSpace/g,jc).replace(/punct/g,oa).getRegex(),Jc=F("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,Uo).replace(/punct/g,Qr).getRegex(),Zc=F(/\\(punct)/,"gu").replace(/punct/g,Qr).getRegex(),Qc=F(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ed=F(Po).replace("(?:-->|$)","-->").getRegex(),td=F("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ed).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,rd=F(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Yr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),aa=F(/^!?\[(label)\]\[(ref)\]/).replace("label",Yr).replace("ref",No).getRegex(),la=F(/^!?\[(ref)\](?:\[\])?/).replace("ref",No).getRegex(),nd=F("reflink|nolink(?!\\()","g").replace("reflink",aa).replace("nolink",la).getRegex(),Vi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Do={_backpedal:rr,anyPunctuation:Zc,autolink:Qc,blockSkip:Kc,br:ra,code:Fc,del:rr,emStrongLDelim:Vc,emStrongRDelimAst:Yc,emStrongRDelimUnd:Jc,escape:Hc,link:rd,nolink:la,punctuation:Bc,reflink:aa,reflinkSearch:nd,tag:td,text:zc,url:rr},od={...Do,link:F(/^!?\[(label)\]\((.*?)\)/).replace("label",Yr).getRegex(),reflink:F(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yr).getRegex()},vo={...Do,emStrongRDelimAst:qc,emStrongLDelim:Wc,url:F(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Vi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:F(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Vi).getRegex()},sd={...vo,br:F(ra).replace("{2,}","*").getRegex(),text:F(vo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Wr={normal:Mo,gfm:Gc,pedantic:$c},Qt={normal:Do,gfm:vo,breaks:sd,pedantic:od},id={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Wi=e=>id[e];function Be(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Wi)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Wi);return e}function Yi(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function qi(e,t){let r=e.replace(ye.findPipe,(s,i,d)=>{let c=!1,h=i;for(;--h>=0&&d[h]==="\\";)c=!c;return c?"|":" |"}),n=r.split(ye.splitPipe),o=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(ye.slashPipe,"|");return n}function er(e,t,r){let n=e.length;if(n===0)return"";let o=0;for(;o<n;){let s=e.charAt(n-o-1);if(s===t&&!r)o++;else if(s!==t&&r)o++;else break}return e.slice(0,n-o)}function ad(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ji(e,t,r,n,o){let s=t.href,i=t.title||null,d=e[1].replace(o.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:s,title:i,text:d,tokens:n.inlineTokens(d)};return n.state.inLink=!1,c}function ld(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let o=n[1];return t.split(`
`).map(s=>{let i=s.match(r.other.beginningSpace);if(i===null)return s;let[d]=i;return d.length>=o.length?s.slice(o.length):s}).join(`
`)}var qr=class{options;rules;lexer;constructor(e){this.options=e||kt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:er(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=ld(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=er(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:er(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=er(t[0],`
`).split(`
`),n="",o="",s=[];for(;r.length>0;){let i=!1,d=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))d.push(r[c]),i=!0;else if(!i)d.push(r[c]);else break;r=r.slice(c);let h=d.join(`
`),f=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${h}`:h,o=o?`${o}
${f}`:f;let E=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=E,r.length===0)break;let S=s.at(-1);if(S?.type==="code")break;if(S?.type==="blockquote"){let O=S,P=O.raw+`
`+r.join(`
`),q=this.blockquote(P);s[s.length-1]=q,n=n.substring(0,n.length-O.raw.length)+q.raw,o=o.substring(0,o.length-O.text.length)+q.text;break}else if(S?.type==="list"){let O=S,P=O.raw+`
`+r.join(`
`),q=this.list(P);s[s.length-1]=q,n=n.substring(0,n.length-S.raw.length)+q.raw,o=o.substring(0,o.length-O.raw.length)+q.raw,r=P.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,o={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let s=this.rules.other.listItemRegex(r),i=!1;for(;e;){let c=!1,h="",f="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;h=t[0],e=e.substring(h.length);let E=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),S=e.split(`
`,1)[0],O=!E.trim(),P=0;if(this.options.pedantic?(P=2,f=E.trimStart()):O?P=t[1].length+1:(P=t[2].search(this.rules.other.nonSpaceChar),P=P>4?1:P,f=E.slice(P),P+=t[1].length),O&&this.rules.other.blankLine.test(S)&&(h+=S+`
`,e=e.substring(S.length+1),c=!0),!c){let T=this.rules.other.nextBulletRegex(P),U=this.rules.other.hrRegex(P),V=this.rules.other.fencesBeginRegex(P),J=this.rules.other.headingBeginRegex(P),he=this.rules.other.htmlBeginRegex(P);for(;e;){let ge=e.split(`
`,1)[0],z;if(S=ge,this.options.pedantic?(S=S.replace(this.rules.other.listReplaceNesting,"  "),z=S):z=S.replace(this.rules.other.tabCharGlobal,"    "),V.test(S)||J.test(S)||he.test(S)||T.test(S)||U.test(S))break;if(z.search(this.rules.other.nonSpaceChar)>=P||!S.trim())f+=`
`+z.slice(P);else{if(O||E.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(E)||J.test(E)||U.test(E))break;f+=`
`+S}!O&&!S.trim()&&(O=!0),h+=ge+`
`,e=e.substring(ge.length+1),E=z.slice(P)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(i=!0));let q=null,N;this.options.gfm&&(q=this.rules.other.listIsTask.exec(f),q&&(N=q[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:h,task:!!q,checked:N,loose:!1,text:f,tokens:[]}),o.raw+=h}let d=o.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let c=0;c<o.items.length;c++)if(this.lexer.state.top=!1,o.items[c].tokens=this.lexer.blockTokens(o.items[c].text,[]),!o.loose){let h=o.items[c].tokens.filter(E=>E.type==="space"),f=h.length>0&&h.some(E=>this.rules.other.anyLine.test(E.raw));o.loose=f}if(o.loose)for(let c=0;c<o.items.length;c++)o.items[c].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=qi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<r.length;i++)s.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(qi(i,s.header.length).map((d,c)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:s.align[c]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let s=er(r.slice(0,-1),"\\");if((r.length-s.length)%2===0)return}else{let s=ad(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let n=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(n);s&&(n=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ji(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[n.toLowerCase()];if(!o){let s=r[0].charAt(0);return{type:"text",raw:s,text:s}}return Ji(r,o,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let o=[...n[0]].length-1,s,i,d=o,c=0,h=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,t=t.slice(-1*e.length+o);(n=h.exec(t))!=null;){if(s=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!s)continue;if(i=[...s].length,n[3]||n[4]){d+=i;continue}else if((n[5]||n[6])&&o%3&&!((o+i)%3)){c+=i;continue}if(d-=i,d>0)continue;i=Math.min(i,i+d+c);let f=[...n[0]][0].length,E=e.slice(0,o+n.index+f+i);if(Math.min(o,i)%2){let O=E.slice(1,-1);return{type:"em",raw:E,text:O,tokens:this.lexer.inlineTokens(O)}}let S=E.slice(2,-2);return{type:"strong",raw:E,text:S,tokens:this.lexer.inlineTokens(S)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),o=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&o&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},$e=class Ro{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kt,this.options.tokenizer=this.options.tokenizer||new qr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ye,block:Wr.normal,inline:Qt.normal};this.options.pedantic?(r.block=Wr.pedantic,r.inline=Qt.pedantic):this.options.gfm&&(r.block=Wr.gfm,this.options.breaks?r.inline=Qt.breaks:r.inline=Qt.gfm),this.tokenizer.rules=r}static get rules(){return{block:Wr,inline:Qt}}static lex(t,r){return new Ro(r).lex(t)}static lexInline(t,r){return new Ro(r).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,r))?(t=t.substring(o.raw.length),r.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=r.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):r.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},r.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),r.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,d=t.slice(1),c;this.options.extensions.startBlock.forEach(h=>{c=h.call({lexer:this},d),typeof c=="number"&&c>=0&&(i=Math.min(i,c))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(o),n=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,o=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,o.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)s=o[2]?o[2].length:0,n=n.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,d="";for(;t;){i||(d=""),i=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,d)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let h=t;if(this.options.extensions?.startInline){let f=1/0,E=t.slice(1),S;this.options.extensions.startInline.forEach(O=>{S=O.call({lexer:this},E),typeof S=="number"&&S>=0&&(f=Math.min(f,S))}),f<1/0&&f>=0&&(h=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(h)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(d=c.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Jr=class{options;parser;constructor(e){this.options=e||kt}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(ye.notSpaceStart)?.[0],o=e.replace(ye.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Be(n)+'">'+(r?o:Be(o,!0))+`</code></pre>
`:"<pre><code>"+(r?o:Be(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let i=0;i<e.items.length;i++){let d=e.items[i];n+=this.listitem(d)}let o=t?"ol":"ul",s=t&&r!==1?' start="'+r+'"':"";return"<"+o+s+`>
`+n+"</"+o+`>
`}listitem(e){let t="";if(e.task){let r=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=r+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=r+" "+Be(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):t+=r+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let o=0;o<e.header.length;o++)r+=this.tablecell(e.header[o]);t+=this.tablerow({text:r});let n="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];r="";for(let i=0;i<s.length;i++)r+=this.tablecell(s[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Be(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),o=Yi(e);if(o===null)return n;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Be(t)+'"'),s+=">"+n+"</a>",s}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let o=Yi(e);if(o===null)return Be(r);e=o;let s=`<img src="${e}" alt="${r}"`;return t&&(s+=` title="${Be(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Be(e.text)}},Go=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},He=class Oo{options;renderer;textRenderer;constructor(t){this.options=t||kt,this.options.renderer=this.options.renderer||new Jr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Go}static parse(t,r){return new Oo(r).parse(t)}static parseInline(t,r){return new Oo(r).parseInline(t)}parse(t,r=!0){let n="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let d=s,c=this.options.extensions.renderers[d.type].call({parser:this},d);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(d.type)){n+=c||"";continue}}let i=s;switch(i.type){case"space":{n+=this.renderer.space(i);continue}case"hr":{n+=this.renderer.hr(i);continue}case"heading":{n+=this.renderer.heading(i);continue}case"code":{n+=this.renderer.code(i);continue}case"table":{n+=this.renderer.table(i);continue}case"blockquote":{n+=this.renderer.blockquote(i);continue}case"list":{n+=this.renderer.list(i);continue}case"html":{n+=this.renderer.html(i);continue}case"def":{n+=this.renderer.def(i);continue}case"paragraph":{n+=this.renderer.paragraph(i);continue}case"text":{let d=i,c=this.renderer.text(d);for(;o+1<t.length&&t[o+1].type==="text";)d=t[++o],c+=`
`+this.renderer.text(d);r?n+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):n+=c;continue}default:{let d='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}parseInline(t,r=this.renderer){let n="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let d=this.options.extensions.renderers[s.type].call({parser:this},s);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){n+=d||"";continue}}let i=s;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let d='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}},tr=class{options;block;constructor(e){this.options=e||kt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?$e.lex:$e.lexInline}provideParser(){return this.block?He.parse:He.parseInline}},cd=class{defaults=Io();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=He;Renderer=Jr;TextRenderer=Go;Lexer=$e;Tokenizer=qr;Hooks=tr;constructor(...e){this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let o=n;for(let s of o.header)r=r.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)r=r.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=n;r=r.concat(this.walkTokens(o.items,t));break}default:{let o=n;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);r=r.concat(this.walkTokens(i,t))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let d=o.renderer.apply(this,i);return d===!1&&(d=s.apply(this,i)),d}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),n.extensions=t),r.renderer){let o=this.defaults.renderer||new Jr(this.defaults);for(let s in r.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,d=r.renderer[i],c=o[i];o[i]=(...h)=>{let f=d.apply(o,h);return f===!1&&(f=c.apply(o,h)),f||""}}n.renderer=o}if(r.tokenizer){let o=this.defaults.tokenizer||new qr(this.defaults);for(let s in r.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,d=r.tokenizer[i],c=o[i];o[i]=(...h)=>{let f=d.apply(o,h);return f===!1&&(f=c.apply(o,h)),f}}n.tokenizer=o}if(r.hooks){let o=this.defaults.hooks||new tr;for(let s in r.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,d=r.hooks[i],c=o[i];tr.passThroughHooks.has(s)?o[i]=h=>{if(this.defaults.async&&tr.passThroughHooksRespectAsync.has(s))return(async()=>{let E=await d.call(o,h);return c.call(o,E)})();let f=d.call(o,h);return c.call(o,f)}:o[i]=(...h)=>{if(this.defaults.async)return(async()=>{let E=await d.apply(o,h);return E===!1&&(E=await c.apply(o,h)),E})();let f=d.apply(o,h);return f===!1&&(f=c.apply(o,h)),f}}n.hooks=o}if(r.walkTokens){let o=this.defaults.walkTokens,s=r.walkTokens;n.walkTokens=function(i){let d=[];return d.push(s.call(this,i)),o&&(d=d.concat(o.call(this,i))),d}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return $e.lex(e,t??this.defaults)}parser(e,t){return He.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},o={...this.defaults,...n},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&n.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,d=await(o.hooks?await o.hooks.provideLexer():e?$e.lex:$e.lexInline)(i,o),c=o.hooks?await o.hooks.processAllTokens(d):d;o.walkTokens&&await Promise.all(this.walkTokens(c,o.walkTokens));let h=await(o.hooks?await o.hooks.provideParser():e?He.parse:He.parseInline)(c,o);return o.hooks?await o.hooks.postprocess(h):h})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?$e.lex:$e.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let d=(o.hooks?o.hooks.provideParser():e?He.parse:He.parseInline)(i,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(i){return s(i)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Be(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},gt=new cd;function X(e,t){return gt.parse(e,t)}X.options=X.setOptions=function(e){return gt.setOptions(e),X.defaults=gt.defaults,Zi(X.defaults),X};X.getDefaults=Io;X.defaults=kt;X.use=function(...e){return gt.use(...e),X.defaults=gt.defaults,Zi(X.defaults),X};X.walkTokens=function(e,t){return gt.walkTokens(e,t)};X.parseInline=gt.parseInline;X.Parser=He;X.parser=He.parse;X.Renderer=Jr;X.TextRenderer=Go;X.Lexer=$e;X.lexer=$e.lex;X.Tokenizer=qr;X.Hooks=tr;X.parse=X;var eg=X.options,tg=X.setOptions,rg=X.use,ng=X.walkTokens,og=X.parseInline;var sg=He.parse,ig=$e.lex;var K=oo();var ca="var(--k-muted)",dd=/^#[0-9a-fA-F]{3}$/,pd=/^#[0-9a-fA-F]{6}$/,ud=/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,fd=/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/,md=/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/,hd=/^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/;function $o(e){if(typeof e!="string")return ca;let t=e.trim();return dd.test(t)||pd.test(t)||ud.test(t)||fd.test(t)||md.test(t)||hd.test(t)?t:ca}function b(e,t={},...r){let n=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(n.dataset,s);continue}if(o==="style"){n.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){n.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){n.className=s;continue}n[o]=s}for(let o of r)o!=null&&n.append(typeof o=="string"?document.createTextNode(o):o);return n}function or(e){e.replaceChildren()}function Ho(e){let t=b("div",{className:"md"});if(!e||e.trim().length===0)return t.append(b("p",{className:"muted"},"No description.")),t;let r=X.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=Xi.sanitize(r,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(n=>{let o=n.getAttribute("href")??"";n.setAttribute("rel","noreferrer noopener"),n.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&K.openUrl(o)})}),t.querySelectorAll("img").forEach(n=>{n.setAttribute("loading","lazy")}),t}function da(e,t=320){let r=e??"",n=Ho(e);if(r.length<=t)return n;n.classList.add("md-collapsed");let o=b("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=n.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),b("div",{className:"md-wrap"},n,o)}async function sr(e,t){try{return t(await K.storage.get(e))}catch{return t(void 0)}}async function ir(e,t){try{let r=JSON.parse(JSON.stringify(t));await K.storage.set(e,r)}catch{}}function pa(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e))!n||typeof n!="object"||typeof n.taskId!="string"||(t[r]={taskId:n.taskId,ticketId:typeof n.ticketId=="string"?n.ticketId:"",title:typeof n.title=="string"?n.title:"",at:typeof n.at=="number"?n.at:0,posted:Array.isArray(n.posted)?n.posted.filter(o=>typeof o=="string"):[]});return t}function ua(e,t=50){let r=Object.entries(e).sort((n,o)=>o[1].at-n[1].at).slice(0,Math.max(0,t));return Object.fromEntries(r)}var fa="preferences",gd={workspaceId:null,projectId:null,openTaskId:null,priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1,serverUrl:""};function ma(e){if(typeof e!="object"||e===null)return{...gd};let t=e,r=t.priorityFilter,n=r==="any"||!!r&&r in Si;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,priorityFilter:n?r:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0,serverUrl:typeof t.serverUrl=="string"?t.serverUrl:""}}async function xt(){return sr(fa,e=>ma(e))}async function en(e){let t=ma({...await xt(),...e});return await ir(fa,t),t}var ha="session-links";async function kd(){return sr(ha,pa)}async function ga(e,t){let r=await kd();r[e]={...t,at:Date.now(),posted:[]};let n=ua(r);await ir(ha,n)}function Fo(e){return e instanceof ve?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function ka(e,t){let r=typeof e=="object"&&e!==null?e:{};return typeof r.message=="string"&&r.message?r.message:typeof r.error=="string"&&r.error?r.error:t}async function xd(e,t="POST",r){let n=await K.serviceRequest({method:t,path:e,...r===void 0?{}:{body:JSON.stringify(r)}});return{status:n.status,body:n.body}}async function zo(e,t="POST",r){let n=await xd(e,t,r),o;try{o=JSON.parse(n.body)}catch{throw new ve(n.status,"SERVICE_BAD_RESPONSE",`Kaneo service answered ${n.status} with a body that is not JSON.`)}if(n.status>=400)throw new ve(n.status,"SERVICE_ERROR",ka(o,`Kaneo service answered ${n.status}.`));return o}async function xa(e){let t=await K.serviceRequest({method:"POST",path:"/forward",body:JSON.stringify(e)}),r;try{r=JSON.parse(t.body)}catch{throw new ve(t.status,"SERVICE_BAD_RESPONSE","Kaneo service answered with a body that is not JSON.")}let n=typeof r=="object"&&r!==null?r:{};if(typeof n.status!="number")throw new ve(t.status>=400?t.status:502,"SERVICE_ERROR",ka(r,"Kaneo service returned an unexpected answer."));return{status:n.status,body:typeof n.body=="string"?n.body:""}}var ba=()=>zo("/account","GET"),Ea=e=>zo("/auth/device/start","POST",{origin:e}),Ta=()=>zo("/auth/device/poll","POST");var ar=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function Sa(e,t,r={}){if(!r.force){let E=await Ed();if(E&&Date.now()-E.at<bd)return E.context}let[n,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new ar;let s=await xt(),i=t?o.find(E=>E.slug===t):void 0,d=(s.workspaceId&&o.find(E=>E.id===s.workspaceId)?.id)??i?.id??o[0].id;d!==s.workspaceId&&await en({workspaceId:d,projectId:null});let c=[],h=null;try{c=await e.listProjects(d)}catch(E){h=E instanceof Error?E:new Error(String(E))}let f={user:n,workspaces:o,workspaceId:d,projects:c,projectsError:h};return await Td(f),f}var _a="bootstrap-cache",bd=6e4;async function Ed(){return sr(_a,e=>{if(!e||typeof e!="object")return null;let t=e;return t&&typeof t.at=="number"&&t.context?t:null})}async function Td(e){await ir(_a,{at:Date.now(),context:e})}function ya(e,t,r){if(e.length===0)return null;let n=e.find(i=>i.id===t);if(n)return n;let o=r?.toLowerCase();return(o?e.find(i=>i.slug.toLowerCase()===o):void 0)??e[0]}function wa(e){let t=e?.workspace?.trim(),r=e?.project?.trim();return{workspaceSlug:t||void 0,projectSlug:r||void 0}}function Aa(e){let t=e?.trim()??"";if(!t)return{origin:Xr,error:null};try{let r=new URL(t);if(r.protocol==="https:"&&!r.username&&!r.password&&(r.pathname==="/"||r.pathname==="")&&!r.search&&!r.hash)return{origin:r.origin,error:null}}catch{}return{origin:Xr,error:"Enter an https origin, like https://cloud.kaneo.app."}}function va(e,t){let r=!1,n=0,o=null,s="",i=()=>{o!==null&&(window.clearTimeout(o),o=null)},d=N=>!r&&N===n,c=N=>{r||e.replaceChildren(N)},h=N=>{let T=b("div",{className:"signin-card"});T.append(b("p",{className:"signin-hint"},"Connect to your Kaneo server. You will get a code to enter on Kaneo's own sign-in page."));let U=b("div",{className:"signin-field"});T.append(U),Nt(U,{label:"Kaneo server URL",value:s,placeholder:"https://cloud.kaneo.app",mono:!0,...N?{error:N}:{helper:"Optional. Defaults to the bundled origin."},onChange:J=>{s=J}});let V=b("div",{className:"signin-row"});T.append(V),pe(V,{label:"Sign in with Kaneo",size:"sm",onClick:()=>void q()}),c(T)},f=async()=>{let N=++n;i();let T=await xt().catch(()=>null);d(N)&&(s=T?.serverUrl??"",h())},E=(N,T)=>{if(!d(T))return;i();let U=b("div",{className:"signin-fill"});Pt(U,{tone:"error",title:"Kaneo",body:N,action:{label:"Start again",onClick:()=>void f()}}),c(U)},S=(N,T)=>{if(!d(T))return;let U=b("div",{className:"signin-card"});U.append(b("p",{className:"signin-hint"},"Enter this code in your browser to sign in to Kaneo")),U.append(b("div",{className:"signin-code"},N.userCode));let V=b("div",{className:"signin-row"});U.append(V),pe(V,{label:"Open Kaneo",variant:"secondary",size:"sm",onClick:()=>void K.openUrl(N.verificationUriComplete)}),pe(V,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>void f()});let J=b("div",{className:"signin-waiting"});U.append(J),nt(J,{label:"Waiting for approval"}),c(U)},O=(N,T)=>{i(),o=window.setTimeout(()=>void P(N),Math.max(T,3)*1e3)},P=async N=>{if(!d(N))return;let T;try{T=await Ta()}catch(U){E(Fo(U),N);return}if(d(N))switch(T.status){case"pending":O(N,T.interval);return;case"connected":i(),t();return;case"expired":E("The code expired. Start again.",N);return;case"denied":E("Sign-in was denied on Kaneo.",N);return;default:E(T.message,N)}},q=async()=>{let N=Aa(s);if(N.error){h(N.error);return}let T=++n;if(i(),await en({serverUrl:s.trim()}).catch(()=>{}),!d(T))return;let U=b("div",{className:"signin-fill"});nt(U,{label:"Starting sign-in"}),c(U);let V;try{V=await Ea(N.origin)}catch(J){E(Fo(J),T);return}d(T)&&(S(V,T),O(T,V.interval),K.openUrl(V.verificationUriComplete).catch(()=>{}))};return f(),()=>{r=!0,i()}}var lr=864e5;function Bo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function Ia(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(r=>r[0].toUpperCase()+r.slice(1)).join(" ")}function Ca(e,t,r){return`${bi}/dashboard/workspace/${e}/project/${t}/task/${r}`}var Sd={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function bt(e){return Sd[e]??e}function rn(e,t=new Date){if(!e)return null;let r=new Date(e);if(Number.isNaN(r.getTime()))return null;let n=Math.round((tn(r).getTime()-tn(t).getTime())/lr);return n===0?"Due today":n===1?"Due tomorrow":n===-1?"Due yesterday":n<0?`Overdue ${Math.abs(n)}d`:n<=7?`Due in ${n}d`:`Due ${r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function La(e,t=new Date){if(!e)return!1;let r=new Date(e);return Number.isNaN(r.getTime())?!1:tn(r).getTime()<tn(t).getTime()}function tn(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Na(e,t=160){if(!e)return"";let r=e.split(`
`).map(o=>o.trim()).find(o=>o.length>0);if(!r)return"";let n=r.replace(/^#{1,6}\s+/,"").replace(/^[*_>]+/,"").trim();return n.length>t?`${n.slice(0,t-1)}\u2026`:n}var _d=6e3;function yd(e){let t=e.user?.name??"Unknown",r=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${r}`}function Pa(e,t){let r=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&r.push(`Project: ${t.projectName}`),t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${bt(e.priority)}`),e.dueDate&&r.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&r.push(t.url);let n=e.description?.trim();n&&r.push("",n);let o=t.comments??[];if(o.length>0){r.push("","Comments:");let s=0;for(let i of o){let d=yd(i);if(s+d.length>_d)break;s+=d.length,r.push(d)}}return r.join(`
`)}function Ma(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Ra=6e4,Oa=36e5;function nn(e,t=Date.now()){if(!e)return null;let r=Date.parse(e);if(!Number.isFinite(r))return null;let n=Math.max(0,t-r);return n<Ra?"just now":n<Oa?`${Math.floor(n/Ra)}m`:n<lr?`${Math.floor(n/Oa)}h`:n<7*lr?`${Math.floor(n/lr)}d`:`${Math.floor(n/(7*lr))}w`}function Ua(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function jo(e){return Ca(e.workspaceId,e.task.projectId,e.task.id)}function wd(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function Da(e){return{providerId:Ei,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:jo(e),text:Pa(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:jo(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:wd(e)}}async function Ga(e){await K.attach(Da(e))}async function Ad(e,t={}){let r=t.worktree?Ma(e.ticketId):void 0,n=await K.startSession({...Da(e),navigation:"preserve",...r?{worktree:{kind:"new",name:r}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return n.sessionId===null?{sessionId:null,sent:n.sent,failure:n.failure,branch:n.worktree.branch}:{sessionId:n.sessionId,sent:n.sent,branch:n.worktree?.branch??r}}async function Xo(e,t={}){let r=await Ad(e,t);if(r.sessionId===null){let n=r.branch?` The worktree ${r.branch} was kept.`:"",o=r.failure?` (${r.failure})`:"";return await K.toast({kind:"error",message:`No session was created${o}.${n} Check the session list before retrying.`,dismiss:!0}),!1}return await ga(r.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await K.toast({kind:"success",message:t.worktree&&r.branch?`Session started on ${r.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function Ko(e){await K.openUrl(jo(e))}function $a(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function Ha(e){return b("span",{className:"label-chip"},b("span",{className:"label-dot",style:`background:${$o(e.color)}`}),e.name)}function Fa(e,t=2){if(e.length===0)return null;let r=e.slice(0,t),n=b("span",{className:"label-chips"});for(let o of r)n.append(Ha(o));return e.length>r.length&&n.append(b("span",{className:"label-more"},`+${e.length-r.length}`)),n}function za(e){if(e.length===0)return null;let t=b("div",{className:"label-chips"});for(let r of e)t.append(Ha(r));return t}function Ba(e){return b("span",{className:"person"},b("span",{className:"person-avatar"},$a(e)),b("span",{className:"person-name"},e))}function ja(e){return b("span",{className:"person-avatar"},$a(e))}function Xa(e){let{task:t}=e,r=b("dl",{className:"meta-grid"}),n=[];e.projectName&&n.push(["Project",e.projectName]),t.priority!=="no-priority"&&n.push(["Priority",bt(t.priority)]),n.push(["Assignee",t.assigneeName??"Unassigned"]);let o=rn(t.dueDate);o&&n.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&n.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&n.push(["Description","Too large to inline; open the task for the full text."]);for(let[d,c]of n)r.append(b("dt",{},d),b("dd",{},c));let i=za(t.labels??[]);if(i){let d=b("dd",{className:"meta-labels"});d.append(i),r.append(b("dt",{},"Labels"),d)}return r}function Ka(e,t=320){return b("div",{className:"detail-section"},da(e.task.description,t))}function Va(e){let t=b("div",{className:"detail-section"});if(t.append(b("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(b("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(b("p",{className:"muted"},"Loading comments\u2026")),t;let r=e.items??[];if(r.length===0)return t.append(b("p",{className:"muted"},"No comments yet.")),t;let n=b("div",{className:"comments"});return r.forEach((o,s)=>{let i=s===r.length-1,d=nn(o.createdAt),c=b("div",{className:"comment"});i||c.append(b("div",{className:"comment-line"})),c.append(ja(o.user?.name));let h=b("div",{className:"comment-card"});h.append(b("div",{className:"comment-head"},b("span",{className:"comment-author"},o.user?.name??"Unknown"),d?b("span",{},d):null),b("div",{className:"comment-body"},Ho(o.content))),c.append(h),n.append(c)}),t.append(n),t}var vd=`
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
`;function Wa(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let r=document.createElement("style");r.id=t,r.textContent=vd,e.append(r)}var Rd={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function Od(e){let t=Rd[e],r={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("width","16"),n.setAttribute("height","16"),n.setAttribute("aria-hidden","true"),n.innerHTML=r[e],n.classList.add("row-glyph"),n}function Ya(e){let{task:t,ticketId:r,column:n,selected:o,onActivate:s}=e,i=rn(t.dueDate),d=La(t.dueDate),c=nn(t.createdAt),h=b("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:s}),f=b("div",{className:"row-body"});f.append(b("div",{className:"row-title"},t.title));let E=b("div",{className:"row-meta"});E.append(b("span",{className:"task-key"},r)),t.assigneeName&&E.append(Ba(t.assigneeName)),c&&E.append(b("span",{},c));let S=t.subtaskCounts;S&&S.total>0&&E.append(b("span",{className:"tabular"},`${S.completed}/${S.total}`)),t.priority!=="no-priority"&&E.append(b("span",{},bt(t.priority))),i&&E.append(b("span",{className:d?"overdue":""},i));let O=Fa(t.labels??[]);return O&&E.append(O),f.append(E),h.append(Od(Ua(n)),f),h.title=`${r} \xB7 ${n.name}`,h}var Oe=document.querySelector("#root");if(!Oe)throw new Error("Kaneo attach dialog is missing its #root element.");var Dt=_i(xa),dr=200,Id=560,m={ready:null,connected:!1,context:null,project:null,boardTasks:[],columnNames:{},defaultStatus:"to-do",results:null,search:"",statusFilter:"",tab:"board",loading:!0,error:null,draft:{title:"",description:"",priority:"medium"},source:null,highlightedId:null,comments:{},worktree:!1,wide:!0,previewOpen:!1},on=0,Vo=0,qa=!1,Wo=!1,cr=null,Yo=null,Jo=!1,qo=!1;function Cd(){cr||(cr=b("div",{className:"signin-fill"}),Yo=va(cr,()=>void Nd())),Oe?.append(cr)}function Ld(){Yo?.(),Yo=null,cr=null}async function Nd(){Ld(),m.connected=!0,Wo=!0,await sn()}function Zo(e){return Bo(m.project?.slug??"",e.number)}function Qa(e){return m.columnNames[e.status]??Ia(e.status)}function Qo(e){return{task:e,ticketId:Zo(e),workspaceId:m.context?.workspaceId??"",projectName:m.project?.name,columnName:Qa(e),comments:m.comments[e.id]?.items}}function es(){let e=m.highlightedId;return e?m.boardTasks.find(t=>t.id===e)??m.results?.find(t=>t.id===e)??null:null}function Pd(e){if(m.statusFilter&&e.status!==m.statusFilter)return!1;let t=m.search.trim().toLowerCase();return t?e.title.toLowerCase().includes(t)||Zo(e).toLowerCase().includes(t):!0}function Md(){return(m.results??m.boardTasks).filter(Pd)}async function sn(){let e=++on;m.loading=!0,Ue();try{let{workspaceSlug:t,projectSlug:r}=wa(m.ready?.settings),n=await Sa(Dt,t,{force:!0});if(e!==on)return;m.context=n;let o=await xt();if(m.project=ya(n.projects,o.projectId,r),m.loading=!1,m.error=n.projectsError?ot("List projects",n.projectsError):null,Ue(),m.project){let s=await Dt.getBoard(m.project.id);if(e!==on)return;m.boardTasks=s.board.columns.flatMap(i=>i.tasks),m.columnNames=Object.fromEntries(s.board.columns.map(i=>[i.id,i.name])),m.defaultStatus=s.board.columns[0]?.id??"to-do",m.results=null}Ue()}catch(t){if(e!==on)return;m.loading=!1,m.error=t instanceof ar?t.message:`Could not reach Kaneo. ${ot("Reach Kaneo",t)}`,Ue()}}async function Ud(){let e=++Vo,t=m.context?.workspaceId,r=m.search.trim();if(!t||r.length<2){m.results=null,De();return}m.loading=!0,De();try{let n=await Dt.search(t,r,{...m.project?{projectId:m.project.id}:{},limit:40});if(e!==Vo)return;let o=new Map(m.boardTasks.map(d=>[d.id,d])),s=n.results.filter(d=>d.type==="task");m.results=s.map(d=>o.get(d.id)).filter(d=>!!d);let i=s.length-m.results.length;m.loading=!1,m.error=i>0?`${i} match${i===1?" is":"es are"} outside the loaded board. Open the Kaneo web app to reach them.`:null,De()}catch(n){if(e!==Vo)return;m.loading=!1,m.error=ot("Search Kaneo",n),De()}}async function el(e){let t=m.comments[e]?.items;if(t)return t;try{let r=await Dt.listComments(e);return m.comments[e]={loading:!1,error:null,items:r},r}catch{return}}async function an(e){try{let t={...Qo(e),comments:await el(e.id)};await Ga(t),await K.toast({kind:"success",message:`${t.ticketId} attached to the chat.`}),await K.close()}catch(t){await K.toast({kind:"error",message:`Attach failed: ${ot("Attach",t)}`,dismiss:!0})}}async function Dd(e){let t={...Qo(e),comments:await el(e.id)};await Xo(t,{worktree:m.worktree})&&await K.close()}async function Gd(){if(!m.project)return;let e=m.draft.title.trim();if(e.length===0){m.error="A task needs a title.",Ue();return}try{let t=await Dt.createTask(m.project.id,{title:e.slice(0,dr),description:m.draft.description,priority:m.draft.priority,status:m.defaultStatus});await K.toast({kind:"success",message:`Created ${Bo(m.project.slug,t.number)} in ${m.project.name}.`}),await an(t)}catch(t){m.error=ot("Create task",t),Ue()}}var Et=null,it=null,at=null;function Ue(){if(Oe){if(or(Oe),Et=null,it=null,at=null,!m.ready){nt(Oe,{label:"Connecting to Kaneo"});return}if(!m.connected){if(!Jo){nt(Oe,{label:"Loading Kaneo"});return}Cd();return}if(m.source){Za(!1);return}if(m.tab==="create"){Za(!0);return}$d()}}function $d(){Et=b("div",{className:"attach-head"}),Oe?.append(Et),Hd(),it=b("div",{className:"attach-body"}),Oe?.append(it),at=b("div",{className:"attach-foot"}),Oe?.append(at),De(),Bd()}function Hd(){if(!Et)return;or(Et);let e=b("div");Et.append(e),Br(e,{items:[{id:"board",label:m.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:m.tab,onChange:s=>{if(s==="create"){m.tab="create",Ue();return}m.tab="board",Ue()}});let t=b("div",{className:"attach-head-row"}),r=b("div",{className:"attach-search"});t.append(r),fo(r,{value:m.search,label:"Search Kaneo",placeholder:"Search, or paste a ticket id",onChange:s=>{if(m.search=s,s.trim().length>=2){Ud();return}m.results=null,De()}});let n=Object.entries(m.columnNames);if(n.length>0){let s=b("div",{className:m.statusFilter?"filter filter-active":"filter"});t.append(s),mo(s,{label:m.statusFilter?m.columnNames[m.statusFilter]??"Status":"Status",size:"sm",variant:"ghost",items:[{id:"",label:"Any status"},{separator:!0},...n.map(([i,d])=>({id:i,label:d}))],onSelect:i=>{m.statusFilter=i,De()}})}let o=m.context?.projects??[];if(o.length>1){let s=b("div",{className:"attach-project"});t.append(s),Wt(s,{searchable:!0,searchPlaceholder:"Find a project",value:m.project?.id??"",options:o.map(i=>({id:i.id,label:i.slug.toUpperCase()})),onChange:i=>{m.project=m.context?.projects.find(d=>d.id===i)??null,m.search="",m.results=null,m.highlightedId=null,m.loading=!0,sn()}})}Et.append(t)}function De(){if(!it)return;or(it);let e=Md();(!m.highlightedId||!e.some(n=>n.id===m.highlightedId))&&(m.highlightedId=e[0]?.id??null);let t=es();if(it.classList.toggle("narrow",!m.wide),!m.wide&&m.previewOpen&&t){it.append(Ja(t));return}let r=b("div",{className:"attach-split"});r.append(Fd(e)),m.wide&&r.append(Ja(t)),it.append(r)}function Fd(e){let t=b("div",{className:"attach-list scroll"});if(m.error){let r=b("div");t.append(r),Pt(r,{tone:m.results?"warning":"error",title:"Kaneo",body:m.error,...m.results?{}:{action:{label:"Retry",onClick:()=>void sn()}}})}if(m.loading&&e.length===0)return nt(t,{label:"Loading tasks"}),t;if(e.length===0)return jr(t,{title:m.search.trim()?"No task matches":"This project has no tasks",body:m.search.trim()?"Search runs inside the selected workspace.":"Use the New tab to create the first one."}),t;for(let r of e){let n=Ya({task:r,ticketId:Zo(r),column:{slug:r.status,isFinal:!1,name:Qa(r)},selected:r.id===m.highlightedId,onActivate:()=>zd(r)});n.addEventListener("dblclick",()=>void an(r)),t.append(n)}return t}function zd(e){if(m.highlightedId=e.id,tl(e.id),!m.wide){m.previewOpen=!0,De();return}De()}function Ja(e){let t=b("div",{className:"attach-preview"});if(!e){let c=b("div",{style:"flex:1; display:flex; align-items:center;"});return t.append(c),jr(c,{title:"Select a task",body:"Pick a task on the left to preview it here before attaching."}),t}tl(e.id);let r=Qo(e);if(!m.wide){let c=b("div");t.append(c),pe(c,{label:"Back",variant:"ghost",size:"sm",onClick:()=>{m.previewOpen=!1,De()}})}let n=b("div",{className:"picker-head"});n.append(b("span",{className:"state-pill"},r.columnName)),n.append(b("span",{className:"task-key"},r.ticketId));let o=b("div",{style:"margin-left:auto;"});n.append(o),pe(o,{label:"Kaneo",variant:"ghost",size:"sm",onClick:()=>void Ko(r)}),t.append(n),t.append(b("h2",{className:"detail-title"},e.title)),t.append(Xa(r)),t.append(Ka(r,1200)),t.append(Va(m.comments[e.id]??null));let s=b("div",{className:"pick-note"}),i=b("div");s.append(i),zr(i,{label:"Create in a new worktree",checked:m.worktree,onChange:c=>{m.worktree=c}}),s.append(b("p",{className:"muted"},"The agent gets the description and comments."));let d=b("div",{className:"block"});return s.append(d),pe(d,{label:"Start session",variant:"secondary",size:"sm",onClick:()=>{Dd(e).catch(c=>{K.toast({kind:"error",message:ot("Start session",c),dismiss:!0})})}}),t.append(s),t}function Bd(){if(!at)return;or(at);let e=es();at.append(b("span",{className:"attach-hint"},e?"Enter attaches the highlighted task.":"Select a task to attach.")),pe(at,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void K.close()});let t=b("div");at.append(t),pe(t,{label:"Attach",size:"sm",disabled:!e,onClick:()=>{e&&an(e)}})}function Za(e){let t=b("div",{className:"attach-head"});if(Oe?.append(t),e){let c=b("div");t.append(c),Br(c,{items:[{id:"board",label:m.project?.slug.toUpperCase()??"Tasks"},{id:"create",label:"New"}],activeId:"create",onChange:h=>{m.tab=h==="board"?"board":"create",Ue()}})}else t.append(b("h2",{className:"detail-title"},"New Kaneo task"));let r=b("div",{className:"dialog-body"});if(Oe?.append(r),m.error){let c=b("div");r.append(c),Pt(c,{tone:"error",title:"Kaneo",body:m.error})}let n=b("div");r.append(n),Nt(n,{label:"Title",value:m.draft.title,placeholder:"What needs doing?",error:m.draft.title.length>dr?`Keep it under ${dr} characters.`:void 0,onChange:c=>{m.draft.title=c}});let o=b("div");r.append(o),Wt(o,{label:"Priority",value:m.draft.priority,options:Ti.map(c=>({id:c,label:bt(c)})),onChange:c=>{m.draft.priority=c}});let s=b("div");r.append(s),Nt(s,{label:"Description",value:m.draft.description,multiline:!0,rows:5,placeholder:"Markdown is supported.",onChange:c=>{m.draft.description=c}});let i=b("div",{className:"attach-foot"});Oe?.append(i),pe(i,{label:"Cancel",variant:"outline",size:"sm",onClick:()=>void K.close()});let d=b("div");i.append(d),pe(d,{label:"Create and attach",size:"sm",onClick:()=>void Gd()})}function jd(e){let r=(e.kind==="message"?e.text:e.sessionTitle).split(`
`).filter(i=>i.trim().length>0),n=(Na(r[0]??"",dr)||"Untitled task").slice(0,dr),o=r.slice(1).join(`
`).trim(),s=e.kind==="session"?`Session: ${e.sessionTitle}`:"From a chat message";return{title:n,description:[s,o].filter(Boolean).join(`

`),priority:"medium"}}function tl(e){m.comments[e]||(m.comments[e]={loading:!0,error:null},Dt.listComments(e).then(t=>{m.comments[e]={loading:!1,error:null,items:t},De()}).catch(t=>{m.comments[e]={loading:!1,error:ot("Load comments",t)},De()}))}document.addEventListener("keydown",e=>{if(e.key!=="Enter"||e.shiftKey||m.tab!=="board"||m.source)return;let t=document.activeElement?.tagName.toLowerCase()??"";if(t==="textarea"||t==="button")return;let r=es();r&&(e.preventDefault(),an(r))});K.onReady(e=>{so(e,document.documentElement),Wa(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,m.ready=e,qa||(qa=!0,(Dn(e.item)||Gn(e.item))&&(m.source=e.item,m.draft=jd(e.item),m.tab="create"),Kd()),Ue(),!Jo&&!qo&&(qo=!0,Xd())});async function Xd(){m.connected=!!(await ba().catch(()=>null))?.connected,qo=!1,Jo=!0,Ue(),m.connected&&!Wo&&(Wo=!0,sn())}function Kd(){if(!Oe||!globalThis.ResizeObserver)return;new ResizeObserver(t=>{let r=t[0]?.contentRect.width??0,n=r===0||r>=Id;n!==m.wide&&(m.wide=n,n&&(m.previewOpen=!1),Ue())}).observe(Oe)}K.onItem(e=>{if(!e||!("providerId"in e))return;let t=e.data;K.toast({kind:"info",message:t?.ticketId?`${t.ticketId} is already attached to this chat.`:"That item is already attached to this chat."})});})();
