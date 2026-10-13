"use strict";(()=>{var M="openchamber.sdk";var gr="data-oc-scrolling",mn=`
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
:hover, [${gr}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${gr}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${gr}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${gr}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function gn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",n=>{let o=n.target===e?t:n.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let i=r.get(o);i!==void 0&&clearTimeout(i),r.set(o,setTimeout(()=>{r.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var $a=`(${gn.toString()})(document);`;var cs=/^[a-z][a-z0-9-]{0,39}$/;var ss=e=>Object(e)===e&&!Array.isArray(e),En=(e,t)=>Object.keys(e).every(r=>t.includes(r)),is=e=>String(e)===e&&e.length>=1&&e.length<=60,as=e=>String(e)===e&&e.length>=1&&e.length<=80,ls=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!ss(r)||!cs.test(r.id)||!is(r.label)||r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1||t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!En(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!En(r,["kind","id","label","value","options","disabled"])||!as(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let n=new Set;for(let o of r.options){if(!ss(o)||!En(o,["value","label"])||!as(o.value)||!is(o.label)||n.has(o.value))return!1;n.add(o.value)}if(!n.has(r.value))return!1}return!0};var kn=e=>"bytes"in e?e.bytes.byteLength:e.content.length,ps=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var ds=/^[A-Za-z0-9_-]{1,80}$/;var us=["left","right","top","bottom"];var fs=(e,t=0,r={remaining:16e3})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of n)if(!fs(o,t+1,r))return!1;return!0},Tn=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Tn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Tn)}return String(e)===e||Number.isFinite(e)},xn=e=>{try{return String(e.id)!==e.id||!ds.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!us.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!fs(e.data)||!Tn(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var ms=["file","directory","other","missing"],_n=e=>!!(e&&"sessionId"in e),Sn=e=>!!(e&&"sent"in e&&!("sessionId"in e));var yn=e=>e!==null&&e.kind==="message",An=e=>e!==null&&e.kind==="session";var gs=/^[0-9a-f]{7,64}$/i,wn=e=>gs.test(e),Er=500,kr=32e3,Es=16e3,ks=128,Ts=200,xs=2e3,bs=16e3,_s=80,Ss=200,ys=16e3;var As=2e3;var Rn=2e4,Tr=1024,xr=2e6;var br=64e3,_r=8e3,vn=4e3;var On=9e4;var ws=999,Rs=1e4,Gt=500,vs=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Os=["stopped","starting","ready","failed"],Ha=new Set(vs),Is=e=>Ha.has(e),Cs=e=>e&&Is(e)?e:"HOST_REJECTED",yt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(yt):Object(e)===e?Object.values(e).every(yt):!1,Ls=e=>yt(e)&&JSON.stringify(e).length<=ys,hs=e=>e?.trim().slice(0,Ss)??"",At=e=>{let t=e.id.trim().slice(0,ks),r=e.title.trim().slice(0,Ts),n=e.url.trim().slice(0,xs),o=e.text?.trim().slice(0,bs),i=e.author?.trim().slice(0,_s),a=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:t,title:r||t,url:n,kind:a};if(o&&(u.text=o),i&&(u.author=i),a==="pull"){let p=hs(e.branches?.head),g=hs(e.branches?.base);p&&g&&(u.branches={head:p,base:g})}return Ls(e.data)&&(u.data=e.data),u},In=e=>{let t=At(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},Cn=e=>{let t={text:e.text.trim().slice(0,Es)};return e.send&&(t.send=!0),t},Ln=e=>e===null||!Number.isFinite(e)?null:Math.min(ws,Math.max(0,Math.round(e))),Pn=e=>Number.isFinite(e)?Math.min(Rs,Math.max(0,Math.ceil(e))):0;var wt=e=>e.length>0&&e.length<=Tr&&!e.includes("\0")&&!e.includes("\\");var Sr=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>As?!1:!e.split("/").some(r=>r==="."||r===".."),Fa=new Set(Os),Nn=e=>!!(e&&"status"in e&&Fa.has(String(e.status))&&!("body"in e)),yr=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Mn=e=>!!(e&&"content"in e&&String(e.content)===e.content),Un=e=>!!(e&&"written"in e&&e.written===!0),Dn=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),za=new Set(ms),Gn=e=>!!(e&&"kind"in e&&"size"in e&&za.has(String(e.kind))&&Number.isFinite(e.size)),$n=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ba=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),ja=e=>Object(e)===e?e:null,bn=e=>String(e)===e&&e.length>0,Xa=e=>{if(!bn(e.id))return null;if(e.ok===!0){let t={channel:M,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&bn(e.error)?{channel:M,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Cs(bn(e.code)?e.code:void 0)}:null},Hn=e=>{let t=ja(e);return!t||t.channel!==M||t.v!==1?null:t.type==="result"?Xa(t):!Ba.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Ps=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Va=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",w=class extends Error{code;constructor(t,r){super(r),this.name="HostRequestError",this.code=t}},Ns=()=>Promise.reject(new w("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ar=()=>Promise.reject(new w("BAD_PATH",`File path must be 1 to ${Tr} characters without NUL or backslash.`)),wr=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new w("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},C=e=>(e.value+=1,`oc-${e.value}`),Xn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new w("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??(c=>c===t.parent),n=e.requestTimeoutMs??Rn,o=new Set,i=new Set,a=new Set,u=new Set,p=new Set,g=new Set,f=new Set,T=new Set,S=new Set,I=null,L=null,Q=new Set,Te=new Set,se=null,xe=null,me=!1,ie=new Map,de=new Map,ue=new Map,$=!1,A={value:0},y=null,be=null,q=!1,v=!1,ne=null,It=c=>c?{sessionId:c.id,phase:c.busy?"started":"completed"}:null,fe=c=>{t.parent.postMessage(c,"*")},ee=(c,d)=>{for(let b of c)try{b(d)}catch(x){console.error(x)}},Fe=c=>{if(!(c instanceof MessageEvent)||!r(c.source))return;let d=Hn(c.data);if(!d)return;if(d.type==="workspace"){let x=de.get(d.payload.subscriptionId);x&&ee([x],d.payload.snapshot);return}if(d.type==="shells"){let x=ue.get(d.payload.subscriptionId);x&&ee([x],d.payload.snapshot);return}if(d.type==="ready"){y=d.payload,be=It(d.payload.session),ee(o,d.payload),ee(i,d.payload.directory),ee(a,d.payload.session),be&&ee(u,be),ee(p,d.payload.connection),ee(g,d.payload.settings),ee(f,d.payload.item);return}if(d.type==="directory"){y&&(y={...y,directory:d.payload.directory}),ee(i,d.payload.directory);return}if(d.type==="session"){y&&(y={...y,session:d.payload.session}),d.payload.session?be?.sessionId!==d.payload.session.id&&(be=It(d.payload.session)):be=null,ee(a,d.payload.session);return}if(d.type==="session-lifecycle"){be=d.payload,ee(u,d.payload);return}if(d.type==="connection"){y&&(y={...y,connection:d.payload.connection}),ee(p,d.payload.connection);return}if(d.type==="settings"){y&&(y={...y,settings:d.payload.settings}),ee(g,d.payload.settings);return}if(d.type==="item"){y&&(y={...y,item:d.payload.item}),ee(f,d.payload.item);return}if(d.type==="status-control-event"){ee(T,d.payload);return}if(d.type==="popover-closed"){ee(S,d.payload);return}if(d.type==="action"){let x=j=>{$||fe({channel:M,v:1,type:"action-result",id:d.id,payload:j})},F=L;if(!F){x({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>F(d.payload)).then(()=>x({ok:!0}),j=>{let z=(j instanceof Error?j.message:String(j)).trim();x({ok:!1,error:(z||"Action failed.").slice(0,Gt)})});return}if(d.type==="file-open"){let x=d.payload;if(xe&&ps(xe,x))return;xe=x,ee(Q,d.payload);return}if(d.type==="file-saved"){ee(Te,d.payload.version);return}if(d.type==="file-snapshot"){let x=z=>{$||fe({channel:M,v:1,type:"file-snapshot-result",id:d.id,payload:z})},F=z=>x({error:(z.trim()||"Could not read the edited file.").slice(0,Gt)}),j=se;if(!j){F("This extension does not edit files.");return}Promise.resolve().then(()=>j(d.payload.purpose)).then(z=>{if(kn(z)>2e7){F(`The file is over ${2e7} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>256){F(`The snapshot version is over ${256} characters.`);return}x({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},z=>F(z instanceof Error?z.message:String(z)));return}if(d.type==="resolve"){let x=j=>{fe({channel:M,v:1,type:"resolve-result",id:d.id,payload:j})},F=I;if(!F){x({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>F(d.payload)).then(j=>x({item:j?At(j):null}),j=>{let z=(j instanceof Error?j.message:String(j)).trim();x({error:(z||"Command failed.").slice(0,Gt)})});return}let b=ie.get(d.id);if(b){if(clearTimeout(b.timer),ie.delete(d.id),d.ok){b.resolve(d.payload);return}b.reject(new w(d.code,d.error))}};t.addEventListener("message",Fe),fe({channel:M,v:1,type:"hello"});let ge=(c,d=n)=>$||t.parent===t?Promise.reject(new w("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((b,x)=>{let F=setTimeout(()=>{ie.delete(c.id),x(new w("HOST_TIMEOUT","Host did not answer in time."))},d);ie.set(c.id,{resolve:b,reject:x,timer:F}),fe(c)}),te=c=>ge(c).then(()=>{}),W={channel:M,v:1},tt=c=>{!$&&t.parent!==t&&fe(c)},Ct=()=>tt({...W,type:"file-save"}),tr=c=>{!Ps(c)||!Va(c)||(c.preventDefault(),Ct())},rr=c=>{!Ps(c)||c.key!=="Escape"||y?.surface!=="popover"||!y.popover||(c.preventDefault(),Nt(y.popover.id,"escape").catch(()=>{}))},mt=()=>{let c=y?.surface==="popover"?y.popover:void 0;if(!c)return;let d=q||v;ne!==d&&(ne=d,X(c.id,d).catch(()=>{}))},H=()=>{y?.surface!=="popover"||q||(q=!0,mt())},nr=c=>{y?.surface!=="popover"||c.relatedTarget!==null||!q||(q=!1,mt())},or=()=>{y?.surface!=="popover"||v||(v=!0,mt())},sr=()=>{y?.surface!=="popover"||!v||(v=!1,mt())},Re=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new w("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},Lt=async c=>{c.kind!=="projects"&&Re(c.projectId);let d=await ge({...W,type:"workspace-read",id:C(A),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new w("HOST_REJECTED","Host did not return workspace data.");return d},Pt=async(c,d)=>{c.kind!=="projects"&&Re(c.projectId);let b=C(A);de.set(b,d);try{await te({...W,type:"workspace-subscribe",id:C(A),payload:{subscriptionId:b,query:c}})}catch(x){throw de.delete(b),$||fe({...W,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:b}}),x}return()=>{!de.delete(b)||$||fe({...W,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:b}})}},ir=async(c,d)=>{c.kind==="session"&&Re(c.sessionId),c.kind==="project"&&Re(c.projectId);let b=C(A);ue.set(b,d);try{await te({...W,type:"shells-subscribe",id:C(A),payload:{subscriptionId:b,scope:c}})}catch(x){throw ue.delete(b),$||fe({...W,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:b}}),x}return()=>{!ue.delete(b)||$||fe({...W,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:b}})}},gt=async c=>{if("key"in c&&(c.key.length===0||c.key.length>128))throw new w("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!yt(c.value))throw new w("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>65536)throw new w("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&y?.features?.deviceStorage!==!0)throw new w("UNSUPPORTED","This host does not support device storage.");let d=await ge({...W,type:"storage",id:C(A),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new w("HOST_REJECTED","Host did not return storage data.");return d},Nt=(c,d)=>y?.features?.popovers!==!0&&!(y?.surface==="popover"&&y.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):te({...W,type:"popover-close",id:C(A),payload:d?{id:c,reason:d}:{id:c}}),X=(c,d)=>y?.features?.popovers!==!0&&!(y?.surface==="popover"&&y.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):te({...W,type:"popover-anchor",id:C(A),payload:{id:c,active:d}});return t.addEventListener("keydown",rr,!0),t.addEventListener("pointerover",H),t.addEventListener("pointermove",H),t.addEventListener("pointerout",nr),t.addEventListener("focus",or),t.addEventListener("blur",sr),{onAction:c=>(L=c,()=>{L===c&&(L=null)}),listProjects:async()=>{let c=await Lt({kind:"projects"});if(c.kind!=="projects")throw new w("HOST_REJECTED","Expected projects.");return c},listWorktrees:async c=>{let d=await Lt({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new w("HOST_REJECTED","Expected worktrees.");return d},listSessions:async c=>{let d=await Lt({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new w("HOST_REJECTED","Expected sessions.");return d},onProjects:c=>Pt({kind:"projects"},d=>{d.kind==="projects"&&c(d)}),onWorktrees:(c,d)=>Pt({kind:"worktrees",projectId:c},b=>{b.kind==="worktrees"&&d(b)}),onSessions:(c,d)=>Pt({kind:"sessions",projectId:c},b=>{b.kind==="sessions"&&d(b)}),onRunningShells:(c,d)=>ir(c,d),readShellOutput:async(c,d)=>{Re(c,128);let b=d?.cursor;if(b!==void 0&&(!Number.isInteger(b)||b<0))throw new w("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let x=d?.tailBytes;if(x!==void 0&&(!Number.isInteger(x)||x<1||x>65536))throw new w("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let j=await ge({...W,type:"shell-output",id:C(A),payload:{shellId:c,cursor:b,tailBytes:x}});if(!j||typeof j.output!="string"||!Number.isFinite(j.cursor))throw new w("HOST_REJECTED","Host did not return shell output.");return j},stopShell:async c=>{if(Re(c,128),(await ge({...W,type:"shell-stop",id:C(A),payload:{shellId:c}}))?.stopped!==!0)throw new w("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async c=>{Re(c),await te({...W,type:"open-session",id:C(A),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let b=wr(d),x={op:"get",key:c};b&&(x.scope=b);let F=await gt(x);return F.op==="get"&&F.found?F.value:void 0},set:async(c,d,b)=>{let x=wr(b),F={op:"set",key:c,value:d};x&&(F.scope=x),await gt(F)},delete:async(c,d)=>{let b=wr(d),x={op:"delete",key:c};b&&(x.scope=b),await gt(x)},keys:async c=>{let d=wr(c),b={op:"keys"};d&&(b.scope=d);let x=await gt(b);if(x.op!=="keys")throw new w("HOST_REJECTED","Expected storage keys.");return x.keys}},onReady:c=>(o.add(c),y&&c(y),()=>{o.delete(c)}),onDirectory:c=>(i.add(c),y&&c(y.directory),()=>{i.delete(c)}),onSession:c=>(a.add(c),y&&c(y.session),()=>{a.delete(c)}),onSessionLifecycle:c=>(u.add(c),be&&c(be),()=>{u.delete(c)}),onConnection:c=>(p.add(c),y&&c(y.connection),()=>{p.delete(c)}),onSettings:c=>(g.add(c),y&&c(y.settings),()=>{g.delete(c)}),onItem:c=>(f.add(c),y&&c(y.item),()=>{f.delete(c)}),onStatusControl:c=>(T.add(c),()=>{T.delete(c)}),onPopoverClosed:c=>(S.add(c),()=>{S.delete(c)}),setStatusControls:c=>y?.features?.statusControls!==!0?Promise.reject(new w("UNSUPPORTED","This host does not support status controls.")):ls(c)?te({...W,type:"status-controls",id:C(A),payload:{controls:c}}):Promise.reject(new w("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:c=>y?.features?.popovers!==!0?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):xn(c)?te({...W,type:"popover-open",id:C(A),payload:c}):Promise.reject(new w("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Nt,setPopoverAnchorActive:X,onResolve:c=>(I=c,()=>{I===c&&(I=null)}),toast:c=>{let d=c.message.trim();return!d||d.length>Er?Promise.reject(new w("HOST_REJECTED",`Toast message must contain 1 to ${Er} characters.`)):c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>kr)?Promise.reject(new w("HOST_REJECTED",`Toast copy text must contain 1 to ${kr} characters.`)):te({channel:M,v:1,type:"toast",id:C(A),payload:{...c,message:d}})},openUrl:c=>te({channel:M,v:1,type:"open-url",id:C(A),payload:{url:c}}),openCommit:c=>wn(c)?te({channel:M,v:1,type:"open-commit",id:C(A),payload:{sha:c}}):Promise.reject(new w("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:c=>te({channel:M,v:1,type:"open-surface",id:C(A),payload:{surfaceId:c}}),writeClipboard:c=>te({channel:M,v:1,type:"clipboard-write",id:C(A),payload:{text:c}}),compose:c=>te({channel:M,v:1,type:"compose",id:C(A),payload:c}),attach:c=>te({channel:M,v:1,type:"attach",id:C(A),payload:At(c)}),startSession:async c=>{c.projectId!==void 0&&Re(c.projectId);let d=c.worktree;d&&d!==!0&&(d.kind==="existing"?Re(d.directory):(d.name!==void 0&&Re(d.name,200),d.baseBranch!==void 0&&Re(d.baseBranch,200)));let b=await ge({channel:M,v:1,type:"start-session",id:C(A),payload:In(c)},e.requestTimeoutMs??18e4);if(!_n(b))throw new w("HOST_REJECTED","Host did not return a session.");return b},prompt:c=>ge({channel:M,v:1,type:"prompt",id:C(A),payload:Cn(c)}).then(d=>{if(!Sn(d))throw new w("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:c=>te({channel:M,v:1,type:"session-link",id:C(A),payload:At(c)}),close:()=>te({channel:M,v:1,type:"close",id:C(A)}),oauthStart:()=>te({channel:M,v:1,type:"oauth-start",id:C(A)}),oauthDisconnect:()=>te({channel:M,v:1,type:"oauth-disconnect",id:C(A)}),request:c=>(Sr(c.path)?ge({channel:M,v:1,type:"request",id:C(A),payload:c}):Ns()).then(d=>{if(!yr(d))throw new w("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:c=>(Sr(c.path)?ge({channel:M,v:1,type:"service-request",id:C(A),payload:c}):Ns()).then(d=>{if(!yr(d))throw new w("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>ge({channel:M,v:1,type:"service-status",id:C(A)}).then(c=>{if(!Nn(c))throw new w("HOST_REJECTED","Host did not return service status.");return c}),readFile:c=>(wt(c)?ge({channel:M,v:1,type:"file-read",id:C(A),payload:{path:c}}):Ar()).then(d=>{if(!Mn(d))throw new w("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>wt(c)?d.length>xr?Promise.reject(new w("FILE_TOO_LARGE",`Content is over ${xr} characters.`)):ge({channel:M,v:1,type:"file-write",id:C(A),payload:{path:c,content:d}}).then(b=>{if(!Un(b))throw new w("HOST_REJECTED","Host did not confirm the write.");return b}):Ar(),listDir:c=>(wt(c)?ge({channel:M,v:1,type:"file-list",id:C(A),payload:{path:c}}):Ar()).then(d=>{if(!Dn(d))throw new w("HOST_REJECTED","Host did not return directory entries.");return d}),stat:c=>(wt(c)?ge({channel:M,v:1,type:"file-stat",id:C(A),payload:{path:c}}):Ar()).then(d=>{if(!Gn(d))throw new w("HOST_REJECTED","Host did not return file status.");return d}),generate:c=>{let d=c.prompt.trim(),b=c.system?.trim();if(d.length===0||d.length>br)return Promise.reject(new w("HOST_REJECTED",`Prompt must be 1 to ${br} characters.`));if(b!==void 0&&(b.length===0||b.length>_r))return Promise.reject(new w("HOST_REJECTED",`System prompt must be 1 to ${_r} characters.`));let x=c.maxOutputTokens===void 0?void 0:Math.min(vn,Math.max(1,Math.floor(c.maxOutputTokens)));if(x!==void 0&&!Number.isFinite(x))return Promise.reject(new w("HOST_REJECTED","maxOutputTokens must be a number."));let F={prompt:d};return b!==void 0&&(F.system=b),x!==void 0&&(F.maxOutputTokens=x),ge({channel:M,v:1,type:"generate",id:C(A),payload:F},e.requestTimeoutMs??On).then(j=>{if(!$n(j))throw new w("HOST_REJECTED","Host did not return generated text.");return j})},setBadge:c=>te({channel:M,v:1,type:"badge",id:C(A),payload:{count:Ln(c)}}),setHeight:c=>te({channel:M,v:1,type:"resize",id:C(A),payload:{height:Pn(c)}}),onFileOpen:c=>(Q.add(c),me||(me=!0,t.addEventListener("keydown",tr,!0)),xe&&c(xe),()=>{Q.delete(c)}),onFileSnapshot:c=>(se=c,()=>{se===c&&(se=null)}),onFileSaved:c=>(Te.add(c),()=>{Te.delete(c)}),reportFileChange:c=>tt({...W,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:Ct,reportFileUnsupported:()=>tt({...W,type:"file-unsupported"}),dispose:()=>{for(let c of de.keys())fe({...W,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:c}});de.clear();for(let c of ue.keys())fe({...W,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:c}});ue.clear(),$=!0,I=null,L=null,se=null,Q.clear(),Te.clear(),me&&t.removeEventListener("keydown",tr,!0),t.removeEventListener("message",Fe),t.removeEventListener("keydown",rr,!0),t.removeEventListener("pointerover",H),t.removeEventListener("pointermove",H),t.removeEventListener("pointerout",nr),t.removeEventListener("focus",or),t.removeEventListener("blur",sr);for(let c of ie.values())clearTimeout(c.timer),c.reject(new w("HOST_UNAVAILABLE","Host client was disposed."));ie.clear(),o.clear(),i.clear(),a.clear(),u.clear(),p.clear(),g.clear(),f.clear(),T.clear(),S.clear()}}};var Ds=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var fp=new Set(Ds);var Gs=["none","agent","user"];var mp=new Set(Gs);var Wa=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ka=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],$s=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,n]of Wa)t.style.setProperty(r,e.tokens[n]);for(let[r,n,o]of Ka){let i=e.tokens[o]??"";t.style.setProperty(r,i),t.style.setProperty(n,i)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Vn=(e,t)=>{$s(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Ya={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,t)=>`var(--${e}, var(--oc-${Ya[e]}, ${t}))`,it=K("surface-background","transparent"),Rr=K("surface-elevated","transparent"),$t=K("surface-elevated-foreground","inherit"),qe=K("surface-foreground","inherit"),re=K("surface-muted-foreground","gray"),qa=K("surface-muted","transparent"),Ce=K("interactive-border","currentColor"),ve=K("interactive-hover","transparent"),at=K("interactive-active","transparent"),Wn=K("interactive-selection","transparent"),Kn=K("interactive-selection-foreground","inherit"),zs=K("interactive-focus-ring","currentColor"),Be=K("primary","currentColor"),Yn=K("primary-text","inherit"),qn=K("error-text","inherit"),Ja=K("font-sans","inherit"),Jn=K("font-mono","monospace"),Bs=K("radius","9px"),Zn=`calc(${Bs} - 2px)`,Hs=`calc(${Bs} - 4px)`,pe=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,Fs=`box-shadow: 0 0 0 2px ${zs};`,vr=e=>{let t=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},Za=`
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
`,js=`
.oc-sdk { color: ${qe}; font-family: ${Ja}; }
.oc-sdk :focus-visible { outline: none; ${Fs} }
.oc-sdk-mono { font-family: ${Jn}; }
.oc-sdk-muted { color: ${re}; }
${vr("success")}${vr("warning")}${vr("error")}${vr("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Be}; --oc-sdk-tone-text: ${Yn}; }

.oc-sdk-btn { border-radius: ${Zn}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Hs}; }
.oc-sdk-btn[data-variant="default"] { color: ${Yn}; background: ${pe(Be,10,it)}; border-color: ${pe(Be,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${pe(Be,16,it)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${pe(Be,22,it)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${qa}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${at}, ${at}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Rr}; color: ${$t}; border-color: ${Ce}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${at}, ${at}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ve}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${at}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${qn}; background: ${pe("var(--oc-sdk-tone)",7,it)}; border-color: ${pe("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${pe("var(--oc-sdk-tone)",9,it)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${pe("var(--oc-sdk-tone)",11,it)}; }

.oc-sdk-field-note { color: ${re}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${qn}; }
.oc-sdk-input { border-radius: ${Zn}; background: ${Rr}; color: ${$t}; box-shadow: inset 0 0 0 1px ${pe(Ce,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${re}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${zs}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${K("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${K("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Jn}; }

.oc-sdk-search-icon { color: ${re}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Be}; }
.oc-sdk-search-clear { border-radius: ${Hs}; color: ${re}; }
.oc-sdk-search-clear:hover { background: ${ve}; color: ${qe}; }

.oc-sdk-trigger { border-color: ${Ce}; border-radius: ${Zn}; background: ${Rr}; color: ${$t}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${at}, ${at}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${re}; }
.oc-sdk-trigger-chevron { color: ${re}; }
.oc-sdk-popup { --surface-foreground: ${$t}; border-color: ${pe(Ce,60)}; border-radius: 12px; background: ${Rr}; color: ${$t}; box-shadow: 0 8px 24px ${pe(qe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ve}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Wn}; color: ${Kn}; }
.oc-sdk-option-check { color: ${qe}; }
.oc-sdk-option[data-destructive="true"] { color: ${qn}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${pe(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${re}; }
.oc-sdk-popup-empty { color: ${re}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ce}; border-radius: 4px; color: ${qe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${pe(qe,60,Ce)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ce}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${it}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Be}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Fs} }
.oc-sdk-check-desc { color: ${re}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${pe(qe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${re}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${qe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Kn}; background: ${Wn}; border-color: ${Ce}; }
.oc-sdk-tab-count { color: ${re}; }

.oc-sdk-badge { border-radius: 9999px; background: ${ve}; color: ${re}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${pe("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ve}; }
.oc-sdk-row[aria-selected="true"] { background: ${Wn}; color: ${Kn}; }
.oc-sdk-row-lead { font-family: ${Jn}; color: ${re}; }
.oc-sdk-row-sub { color: ${re}; }
.oc-sdk-row-meta { color: ${re}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${re}; }

.oc-sdk-empty-body { color: ${re}; }

.oc-sdk-spinner { color: ${re}; }
.oc-sdk-spinner-ring { border-color: ${Ce}; border-top-color: ${Be}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${pe("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${pe("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${re}; }

.oc-sdk-separator { color: ${re}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${pe(Ce,40)}; }

.oc-sdk-progress-label { color: ${re}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ce}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Be}); }

.oc-sdk-text a { color: ${Yn}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${pe(Ce,60)}; }
`,J=`
${mn}
${Za}
${js}`;var Xs="oc-sdk-ui-style",ct=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},Z=e=>{let t=document.getElementById(Xs);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}gn(document);let r=document.createElement("style");r.id=Xs,r.textContent=e,document.head.appendChild(r)},R=(e,t)=>{let r=document.createElement(e);return t&&(r.className=t),r},Le=e=>{let t=R("button",e);return t.type="button",t},ae=(e,t)=>{let r=t??"";e.textContent!==r&&(e.textContent=r)},Je=(e,t,r)=>{r==null||r===""?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)},Vs=(e,t)=>{let r=n=>{n.target instanceof Node&&e.contains(n.target)||t()};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0)}};var Qa=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Me=(e,t)=>{Z(J);let r=t,n=Le("oc-sdk oc-sdk-btn"),o=Qa(),i=document.createElement("span");n.append(i),e.append(n);let a=()=>{n.dataset.variant=r.variant??"default",n.dataset.size=r.size??"default",n.disabled=!!r.disabled||!!r.loading,n.dataset.loading=r.loading?"true":"false",n.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&o.parentNode!==n?n.prepend(o):!r.loading&&o.parentNode===n&&o.remove(),ae(i,r.label)},u=()=>{r.disabled||r.loading||r.onClick()};return n.addEventListener("click",u),a(),{update:p=>{r={...r,...p},a()},dispose:()=>{n.removeEventListener("click",u),n.remove()}}};var Or=(e,t)=>{Z(J);let r=t,n=R("label","oc-sdk oc-sdk-field"),o=R("span","oc-sdk-field-label"),i=r.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),a=R("span","oc-sdk-field-note");n.append(o,i,a),e.append(n);let u=()=>{ae(o,r.label),o.hidden=!r.label,i instanceof HTMLInputElement?i.type=r.password?"password":"text":i.rows=r.rows??3,i.value!==r.value&&(i.value=r.value),i.disabled=!!r.disabled,Je(i,"placeholder",r.placeholder),i.dataset.mono=r.mono?"true":"false";let g=!!r.error;n.dataset.invalid=g?"true":"false",i.setAttribute("aria-invalid",g?"true":"false");let f=r.error??r.helper??"";ae(a,f),a.hidden=f===""},p=()=>{r.onChange(i.value)};return i.addEventListener("input",p),u(),{update:g=>{r={...r,...g},u()},dispose:()=>{i.removeEventListener("input",p),n.remove()}}};var Ws="http://www.w3.org/2000/svg",ec={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ze=(e,t,r)=>{let n=document.createElementNS(Ws,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),r&&n.setAttribute("class",r);let o=document.createElementNS(Ws,"path");return o.setAttribute("d",ec[e]),n.append(o),n};var Qn=(e,t)=>{Z(J);let r=t,n=R("div","oc-sdk oc-sdk-search"),o=R("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let i=Le("oc-sdk-search-clear");i.append(Ze("close",14)),i.tabIndex=-1,n.append(Ze("search",16,"oc-sdk-search-icon"),o,i),e.append(n);let a=()=>{let f=r.placeholder??"Search";Je(o,"placeholder",f),o.setAttribute("aria-label",r.label??f),i.setAttribute("aria-label","Clear search"),o.value!==r.value&&(o.value=r.value),n.dataset.active=r.value.trim()===""?"false":"true"},u=()=>{r.value!==""&&r.onChange(""),o.focus()},p=()=>{r.onChange(o.value)},g=f=>{f.key==="Escape"&&o.value!==""&&(f.preventDefault(),u())};return o.addEventListener("input",p),o.addEventListener("keydown",g),i.addEventListener("click",u),a(),r.autofocus&&o.focus(),{update:f=>{r={...r,...f},a()},dispose:()=>{o.removeEventListener("input",p),o.removeEventListener("keydown",g),i.removeEventListener("click",u),n.remove()}}};var Qe=(e,t="vertical")=>{let[r,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===r||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},lt=(e,t,r)=>{let n=e.filter(p=>!p.disabled);if(n.length===0)return null;let o=n[0],i=n[n.length-1];if(r==="first"||!o||!i)return o?.id??null;if(r==="last")return i.id;let a=n.findIndex(p=>p.id===t);return a===-1?r==="next"?o.id:i.id:n[Math.min(n.length-1,Math.max(0,a+(r==="next"?1:-1)))]?.id??null};var Ks=(e,t)=>`${e}-${t??""}`,eo=(e,t,r,n)=>{let o=Le("oc-sdk-option");o.id=Ks(e,r.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!r.disabled,t==="option"&&o.setAttribute("aria-selected",r.selected?"true":"false"),o.dataset.destructive=r.destructive?"true":"false";let i=R("span","oc-sdk-option-label");if(i.textContent=r.label,o.append(i),r.hint){let a=R("span","oc-sdk-option-hint");a.textContent=r.hint,o.append(a)}if(t==="option"){o.dataset.mark="check";let a=R("span","oc-sdk-option-check");a.append(Ze("check",14)),o.append(a)}return o.addEventListener("pointerenter",n.hover),o.addEventListener("click",n.pick),o},to=(e,t,r,n)=>{let o=Ks(r,n);for(let i of Array.from(e.children))i instanceof HTMLElement&&i.classList.contains("oc-sdk-option")&&(i.dataset.active=i.id===o?"true":"false");Je(t,"aria-activedescendant",n?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var tc=(e,t)=>{let r=t.getBoundingClientRect();e.style.minWidth=`${Math.round(r.width)}px`,e.style.left=`${Math.round(r.left)}px`,e.style.top=`${Math.round(r.bottom+4)}px`;let n=e.offsetHeight,o=window.innerHeight-r.bottom-8;n>o&&r.top-8>o&&(e.style.top=`${Math.max(8,Math.round(r.top-4-n))}px`);let i=r.left+e.offsetWidth-window.innerWidth+8;i>0&&(e.style.left=`${Math.max(8,Math.round(r.left-i))}px`)},ro=(e,t,r,n)=>{e.append(r),tc(r,t);let o=Vs(e,n),i=()=>{n()},a=u=>{u.target instanceof Node&&r.contains(u.target)||n()};return window.addEventListener("resize",i),window.addEventListener("scroll",a,!0),()=>{o(),window.removeEventListener("resize",i),window.removeEventListener("scroll",a,!0),r.remove()}};var Ys=(e,t)=>{let r=t.trim().toLowerCase();return r?e.filter(n=>n.label.toLowerCase().includes(r)||n.id.toLowerCase().includes(r)):[...e]},rc=0,Ir=(e,t)=>{Z(J);let r=t,n=`oc-sdk-select-${rc+=1}`,o=R("div","oc-sdk oc-sdk-select"),i=R("span","oc-sdk-field-label");i.id=`${n}-label`;let a=Le("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",i.id);let u=R("span","oc-sdk-trigger-value");a.append(u,Ze("chevron",14,"oc-sdk-trigger-chevron")),o.append(i,a),e.append(o);let p="",g=null,f=null,T=R("div","oc-sdk oc-sdk-popup"),S=R("div","oc-sdk-popup-search"),I=R("input","oc-sdk-input");I.type="text",I.autocomplete="off",S.append(I);let L=R("div");L.setAttribute("role","listbox"),L.tabIndex=-1,T.append(L);let Q=()=>Ys(r.options,r.searchable?p:""),Te=()=>r.searchable?I:L,se=v=>{g=v,to(L,Te(),n,v)},xe=()=>{ct(L);let v=Q();if(v.length===0){let ne=R("div","oc-sdk-popup-empty");ne.textContent="No matches",L.append(ne)}for(let ne of v)L.append(eo(n,"option",{...ne,selected:ne.id===r.value},{hover:()=>se(ne.id),pick:()=>de(ne.id)}));se(v.some(ne=>ne.id===g)?g:v[0]?.id??null)},me=()=>{let v=f;f=null,v?.(),p="",I.value="",a.setAttribute("aria-expanded","false")},ie=()=>{f||r.disabled||(g=r.value,I.placeholder=r.searchPlaceholder??"Search",r.searchable?T.prepend(S):S.remove(),xe(),f=ro(o,a,T,me),a.setAttribute("aria-expanded","true"),Te().focus())},de=v=>{me(),a.focus(),v!==r.value&&r.onChange(v)},ue=()=>{f?me():ie()},$=v=>{!f&&Qe(v)&&(v.preventDefault(),ie())},A=v=>{let ne=Qe(v);ne?(v.preventDefault(),se(lt(Q(),g,ne))):v.key==="Enter"?(v.preventDefault(),g&&de(g)):v.key==="Escape"?(v.preventDefault(),me(),a.focus()):r.searchable&&v.target!==I&&v.key.length===1&&!v.ctrlKey&&!v.metaKey&&I.focus()},y=()=>{p=I.value,xe()},be=v=>{f&&!(v.relatedTarget instanceof Node&&o.contains(v.relatedTarget))&&me()},q=()=>{ae(i,r.label),i.hidden=!r.label;let v=r.options.find(ne=>ne.id===r.value);ae(u,v?.label??r.placeholder??"Select"),u.dataset.empty=v?"false":"true",a.disabled=!!r.disabled,f&&xe()};return a.addEventListener("click",ue),a.addEventListener("keydown",$),T.addEventListener("keydown",A),I.addEventListener("input",y),o.addEventListener("focusout",be),q(),{update:v=>{r={...r,...v},q()},dispose:()=>{me(),a.removeEventListener("click",ue),a.removeEventListener("keydown",$),T.removeEventListener("keydown",A),I.removeEventListener("input",y),o.removeEventListener("focusout",be),o.remove()}}};var no=(e,t)=>{Z(J);let r=t,n=R("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let o=()=>{ct(n),n.dataset.track=r.trackBackground?"true":"false";for(let a of r.items){let u=Le("oc-sdk-tab");u.setAttribute("role","tab");let p=a.id===r.activeId;u.setAttribute("aria-selected",p?"true":"false"),u.tabIndex=p?0:-1,u.dataset.id=a.id;let g=R("span");if(g.textContent=a.label,u.append(g),a.count!==void 0){let f=R("span","oc-sdk-tab-count");f.textContent=String(a.count),u.append(f)}u.addEventListener("click",()=>{a.id!==r.activeId&&r.onChange(a.id)}),n.append(u)}},i=a=>{let u=Qe(a,"horizontal");if(!u)return;let p=lt(r.items,r.activeId,u);if(p&&p!==r.activeId){a.preventDefault(),r.onChange(p);let g=n.querySelector(`[data-id="${CSS.escape(p)}"]`);g instanceof HTMLElement&&g.focus()}};return n.addEventListener("keydown",i),o(),{update:a=>{r={...r,...a},o()},dispose:()=>{n.removeEventListener("keydown",i),n.remove()}}};var Cr=(e,t)=>{Z(J);let r=t,n=R("div","oc-sdk oc-sdk-empty"),o=R("h2","oc-sdk-empty-title"),i=R("p","oc-sdk-empty-body"),a=R("div","oc-sdk-empty-action");n.append(o,i,a),e.append(n);let u=null,p=()=>{if(ae(o,r.title),ae(i,r.body),i.hidden=!r.body,a.hidden=!r.action,!r.action){u?.dispose(),u=null;return}let g={label:r.action.label,onClick:r.action.onClick};u?u.update(g):u=Me(a,{...g,variant:"outline",size:"sm"})};return p(),{update:g=>{r={...r,...g},p()},dispose:()=>{u?.dispose(),u=null,n.remove()}}};var Lr=(e,t={})=>{Z(J);let r=t,n=R("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let o=R("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let i=R("span");n.append(o,i),e.append(n);let a=()=>{n.dataset.size=r.size??"default",ae(i,r.label),i.hidden=!r.label,n.setAttribute("aria-label",r.label??"Loading")};return a(),{update:u=>{r={...r,...u},a()},dispose:()=>{n.remove()}}};var Pr=(e,t)=>{Z(J);let r=t,n=R("div","oc-sdk oc-sdk-banner"),o=R("div","oc-sdk-banner-text"),i=R("div","oc-sdk-banner-title"),a=R("div","oc-sdk-banner-body"),u=R("div","oc-sdk-banner-action");o.append(i,a),n.append(o,u),e.append(n);let p=null,g=()=>{if(n.dataset.tone=r.tone,n.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),ae(i,r.title),ae(a,r.body),a.hidden=!r.body,u.hidden=!r.action,!r.action){p?.dispose(),p=null;return}let f={label:r.action.label,onClick:r.action.onClick};p?p.update(f):p=Me(u,{...f,variant:"outline",size:"xs"})};return g(),{update:f=>{r={...r,...f},g()},dispose:()=>{p?.dispose(),p=null,n.remove()}}};var oc="https://kaneo.qubitquilt.dev",qs=oc.replace(/\/api\/?$/,""),Js="kaneo",oo=100,Zs=["no-priority","low","medium","high","urgent"];var Qs={"no-priority":0,low:1,medium:2,high:3,urgent:4};var pt=class extends Error{status;code;constructor(t,r,n){super(n),this.name="KaneoError",this.status=t,this.code=r}};function sc(e){if(!e)return;let t={};for(let[r,n]of Object.entries(e))n==null||n===""||(t[r]=String(n));return Object.keys(t).length>0?t:void 0}function ic(e,t){let r=typeof t=="object"&&t!==null?t:{},n=typeof r.message=="string"&&r.message?r.message:`Kaneo answered ${e}.`;return new pt(e,r.code??`HTTP_${e}`,n)}var ac=10,cc=2,lc=800;function ei(e){async function t({method:n,path:o,query:i,body:a}){let u=sc(i),p="/api"+o,g;for(let S=0;g=await e({method:n,path:p,...u?{query:u}:{},...a===void 0?{}:{body:JSON.stringify(a)}}),!(g.status!==429||S>=cc);S+=1)await new Promise(I=>setTimeout(I,lc*2**S));let f=g,T;if(f.body)try{T=JSON.parse(f.body)}catch{throw f.status>=400?new pt(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new pt(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw ic(f.status,T);return T}async function r(n){let o=encodeURIComponent(n),i=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:oo}}),a=i.data,u=i.pagination,p=1;for(;p<Math.min(u.totalPages,ac);){p+=1;let g=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:p,limit:oo}});for(let f of g.data.columns){let T=a.columns.find(S=>S.id===f.id);T&&T.tasks.push(...f.tasks)}a.archivedTasks.push(...g.data.archivedTasks),a.plannedTasks.push(...g.data.plannedTasks)}return{board:a,pagination:u,truncated:u.totalPages>p}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(n,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:n,includeArchived:o?"true":void 0}}),getBoard:r,getTask:n=>t({method:"GET",path:`/task/${encodeURIComponent(n)}`,query:{view:"detail"}}),getTaskByTicketId:(n,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(n)}`,query:{workspaceId:o}}),listAssignedTasks:n=>t({method:"GET",path:"/task/assigned",query:{workspaceId:n}}),search:(n,o,i={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:n,projectId:i.projectId,limit:i.limit??30}}),listLabels:n=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(n)}`}),listColumns:n=>t({method:"GET",path:`/column/${encodeURIComponent(n)}`}),listComments:n=>t({method:"GET",path:`/comment/${encodeURIComponent(n)}`}),createComment:(n,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(n)}`,body:{content:o}}),createTask:(n,o)=>t({method:"POST",path:`/task/${encodeURIComponent(n)}`,body:o}),updateTaskStatus:(n,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(n)}`,body:{status:o}}),updateTaskPriority:(n,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(n)}`,body:{priority:o}})}}function pc(e,t){this.v=e,this.k=t}function ti(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function dc(e){if(Array.isArray(e))return e}function uc(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var n,o,i,a,u=[],p=!0,g=!1;try{if(i=(r=r.call(e)).next,t===0){if(Object(r)!==r)return;p=!1}else for(;!(p=(n=i.call(r)).done)&&(u.push(n.value),u.length!==t);p=!0);}catch(f){g=!0,o=f}finally{try{if(!p&&r.return!=null&&(a=r.return(),Object(a)!==a))return}finally{if(g)throw o}}return u}}function fc(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function hc(e,t){return dc(e)||uc(e,t)||mc(e,t)||fc()}function mc(e,t){if(e){if(typeof e=="string")return ti(e,t);var r={}.toString.call(e).slice(8,-1);return r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set"?Array.from(e):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ti(e,t):void 0}}function Nr(e){var t,r;function n(i,a){try{var u=e[i](a),p=u.value,g=p instanceof pc;Promise.resolve(g?p.v:p).then(function(f){if(g){var T=i==="return"&&p.k?i:"next";if(!p.k||f.done)return n(T,f);f=e[T](f).value}o(!!u.done,f)},function(f){n("throw",f)})}catch(f){o(2,f)}}function o(i,a){i===2?t.reject(a):t.resolve({value:a,done:i}),(t=t.next)?n(t.key,t.arg):r=null}this._invoke=function(i,a){return new Promise(function(u,p){var g={key:i,arg:a,resolve:u,reject:p,next:null};r?r=r.next=g:(t=r=g,n(i,a))})},typeof e.return!="function"&&(this.return=void 0)}Nr.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},Nr.prototype.next=function(e){return this._invoke("next",e)},Nr.prototype.throw=function(e){return this._invoke("throw",e)},Nr.prototype.return=function(e){return this._invoke("return",e)};var gi=Object.entries,ri=Object.setPrototypeOf,gc=Object.isFrozen,Ei=Object.getPrototypeOf,ki=Object.getOwnPropertyDescriptor,he=Object.freeze,ke=Object.seal,Rt=Object.create,Ti=typeof Reflect<"u"&&Reflect,mo=Ti.apply,go=Ti.construct;he||(he=function(t){return t});ke||(ke=function(t){return t});mo||(mo=function(t,r){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return t.apply(r,o)});go||(go=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return new t(...n)});var je=Y(Array.prototype.forEach);Array.prototype.indexOf;var Ec=Y(Array.prototype.lastIndexOf),ni=Y(Array.prototype.pop),Ht=Y(Array.prototype.push),kc=Y(Array.prototype.slice),Tc=Y(Array.prototype.splice),vt=Array.isArray,so=xi(Set),io=Y(Set.prototype.add),Ft=Y(Set.prototype.has),dt=Y(String.prototype.toLowerCase),ao=Y(String.prototype.toString),oi=Y(String.prototype.match),zt=Y(String.prototype.replace),si=Y(String.prototype.indexOf),xc=Y(String.prototype.trim),bc=Y(Number.prototype.toString),_c=Y(Boolean.prototype.toString),ii=typeof BigInt>"u"?null:Y(BigInt.prototype.toString),ai=typeof Symbol>"u"?null:Y(Symbol.prototype.toString),we=Y(Object.prototype.hasOwnProperty),Bt=Y(Object.prototype.toString),Ee=Y(RegExp.prototype.test),Xe=xi(TypeError);function Y(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return mo(e,t,n)}}function xi(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return go(e,r)}}function D(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:dt;if(ri&&ri(e,null),!vt(t))return e;let n=t.length;for(;n--;){let o=t[n];if(typeof o=="string"){let i=r(o);i!==o&&(gc(t)||(t[n]=i),o=i)}e[o]=!0}return e}function Sc(e){for(let t=0;t<e.length;t++)we(e,t)||(e[t]=null);return e}function Oe(e){let t=Rt(null);for(let n of gi(e)){var r=hc(n,2);let o=r[0],i=r[1];we(e,o)&&(vt(i)?t[o]=Sc(i):i&&typeof i=="object"&&i.constructor===Object?t[o]=Oe(i):t[o]=i)}return t}function yc(e){switch(typeof e){case"string":return e;case"number":return bc(e);case"boolean":return _c(e);case"bigint":return ii?ii(e):"0";case"symbol":return ai?ai(e):"Symbol()";case"undefined":return Bt(e);case"function":case"object":{if(e===null)return Bt(e);let t=e,r=Pe(t,"toString");if(typeof r=="function"){let n=r(t);return typeof n=="string"?n:Bt(n)}return Bt(e)}default:return Bt(e)}}function Pe(e,t){for(;e!==null;){let n=ki(e,t);if(n){if(n.get)return Y(n.get);if(typeof n.value=="function")return Y(n.value)}e=Ei(e)}function r(){return null}return r}function Ac(e,t){for(;e!==null;){let r=ki(e,t);if(r)return r.get?Y(r.get):null;e=Ei(e)}return null}function wc(e){try{return Ee(e,""),!0}catch{return!1}}var ci=he(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),co=he(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),lo=he(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Rc=he(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),po=he(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),vc=he(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),li=he(["#text"]),pi=he(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),uo=he(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),di=he(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Mr=he(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Oc=ke(/{{[\w\W]*|^[\w\W]*}}/g),Ic=ke(/<%[\w\W]*|^[\w\W]*%>/g),Cc=ke(/\${[\w\W]*/g),Lc=ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),Pc=ke(/^aria-[\-\w]+$/),ui=ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Nc=ke(/^(?:\w+script|data):/i),Mc=ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Uc=ke(/^html$/i),Dc=ke(/^[a-z][.\w]*(-[.\w]+)+$/i),fo=ke(/<[/\w!]/g),fi=ke(/<[/\w]/g),Gc=ke(/<\/no(script|embed|frames)/i),hi=ke(/\/>/i),ce={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$c=he(D({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),Hc=function(){return typeof window>"u"?null:window},Fc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,o="data-tt-policy-suffix";r&&r.hasAttribute(o)&&(n=r.getAttribute(o));let i="dompurify"+(n?"#"+n:"");try{return t.createPolicy(i,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},mi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},et=function(t,r,n,o){return we(t,r)&&vt(t[r])?D(o.base?Oe(o.base):{},t[r],o.transform):n},ho=function(t,r,n){let o=we(t,r)?t[r]:void 0;return o&&typeof o=="object"?Oe(o):n()};function bi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Hc(),t=E=>bi(E);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ce.document||!e.Element)return t.isSupported=!1,t;let r=e.document,n=r,o=n.currentScript;e.DocumentFragment;let i=e.HTMLTemplateElement,a=e.Node,u=e.Element,p=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let g=e.DOMParser,f=e.trustedTypes,T=u.prototype,S=Pe(T,"cloneNode"),I=Pe(T,"remove"),L=Pe(T,"removeAttributeNode"),Q=Pe(T,"nextSibling"),Te=Pe(T,"childNodes"),se=Pe(T,"parentNode"),xe=Pe(T,"shadowRoot"),me=Pe(T,"attributes"),ie=a&&a.prototype?Pe(a.prototype,"nodeType"):null,de=a&&a.prototype?Pe(a.prototype,"nodeName"):null,ue=a&&a.prototype?Pe(a.prototype,"ownerDocument"):null,$=function(s){return ie?ie(s):s.nodeType},A=function(s){return de?de(s):s.nodeName},y=Ac(T,"namespaceURI"),be=function(s){return y?y(s):s.namespaceURI};if(typeof i=="function"){let E=r.createElement("template");E.content&&E.content.ownerDocument&&(r=E.content.ownerDocument)}let q,v="",ne,It=!1,fe=0,ee=function(){if(fe>0)throw Xe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Fe=function(s){ee(),fe++;try{return q.createHTML(s)}finally{fe--}},ge=function(s){ee(),fe++;try{return q.createScriptURL(s)}finally{fe--}},te=function(){return It||(ne=Fc(f,o),It=!0),ne},W=r,tt=W.implementation,Ct=W.createNodeIterator,tr=W.createDocumentFragment,rr=W.getElementsByTagName,mt=n.importNode,H=mi();t.isSupported=typeof gi=="function"&&typeof se=="function"&&tt&&tt.createHTMLDocument!==void 0;let nr=Oc,or=Ic,sr=Cc,Re=Lc,Lt=Pc,Pt=Nc,ir=Mc,gt=Dc,Nt=ui,X=null,c=D({},[...ci,...co,...lo,...po,...li]),d=null,b=D({},[...pi,...uo,...di,...Mr]),x=Object.seal(Rt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),F=null,j=null,z=Object.seal(Rt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Po=!0,Kr=!0,No=!1,Yr=!0,ze=!1,rt=!0,nt=!1,qr=!1,ar=null,cr=null,Jr=!1,Et=!1,lr=!1,pr=!1,Mo=!0,Uo=!1,Do="user-content-",Zr=!0,Qr=!1,ot=null,kt={},st=null,Go=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),$o=null,Ho=D({},["audio","video","img","source","image","track"]),Fo=null,zo=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),dr="http://www.w3.org/1998/Math/MathML",ur="http://www.w3.org/2000/svg",Ge="http://www.w3.org/1999/xhtml",Tt=Ge,en=!1,tn=null,Ta=D({},[dr,ur,Ge],ao),Bo=he(["mi","mo","mn","ms","mtext"]),rn=D({},Bo),jo=he(["annotation-xml"]),nn=D({},jo),xa=D({},["title","style","font","a","script"]),Mt=null,ba=["application/xhtml+xml","text/html"],_a="text/html",oe=null,xt=null,Sa=r.createElement("form"),Xo=function(s){return s instanceof RegExp||s instanceof Function},on=function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(xt&&xt===s)return;(!s||typeof s!="object")&&(s={}),s=Oe(s),Mt=ba.indexOf(s.PARSER_MEDIA_TYPE)===-1?_a:s.PARSER_MEDIA_TYPE,oe=Mt==="application/xhtml+xml"?ao:dt,X=et(s,"ALLOWED_TAGS",c,{transform:oe}),d=et(s,"ALLOWED_ATTR",b,{transform:oe}),tn=et(s,"ALLOWED_NAMESPACES",Ta,{transform:ao}),Fo=et(s,"ADD_URI_SAFE_ATTR",zo,{transform:oe,base:zo}),$o=et(s,"ADD_DATA_URI_TAGS",Ho,{transform:oe,base:Ho}),st=et(s,"FORBID_CONTENTS",Go,{transform:oe}),F=et(s,"FORBID_TAGS",Oe({}),{transform:oe}),j=et(s,"FORBID_ATTR",Oe({}),{transform:oe}),kt=we(s,"USE_PROFILES")?s.USE_PROFILES&&typeof s.USE_PROFILES=="object"?Oe(s.USE_PROFILES):s.USE_PROFILES:!1,Po=s.ALLOW_ARIA_ATTR!==!1,Kr=s.ALLOW_DATA_ATTR!==!1,No=s.ALLOW_UNKNOWN_PROTOCOLS||!1,Yr=s.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ze=s.SAFE_FOR_TEMPLATES||!1,rt=s.SAFE_FOR_XML!==!1,nt=s.WHOLE_DOCUMENT||!1,Et=s.RETURN_DOM||!1,lr=s.RETURN_DOM_FRAGMENT||!1,pr=s.RETURN_TRUSTED_TYPE||!1,Jr=s.FORCE_BODY||!1,Mo=s.SANITIZE_DOM!==!1,Uo=s.SANITIZE_NAMED_PROPS||!1,Zr=s.KEEP_CONTENT!==!1,Qr=s.IN_PLACE||!1,Nt=wc(s.ALLOWED_URI_REGEXP)?s.ALLOWED_URI_REGEXP:ui,Tt=typeof s.NAMESPACE=="string"?s.NAMESPACE:Ge,rn=ho(s,"MATHML_TEXT_INTEGRATION_POINTS",()=>D({},Bo)),nn=ho(s,"HTML_INTEGRATION_POINTS",()=>D({},jo));let l=ho(s,"CUSTOM_ELEMENT_HANDLING",()=>Rt(null));if(x=Rt(null),we(l,"tagNameCheck")&&Xo(l.tagNameCheck)&&(x.tagNameCheck=l.tagNameCheck),we(l,"attributeNameCheck")&&Xo(l.attributeNameCheck)&&(x.attributeNameCheck=l.attributeNameCheck),we(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(x.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),ke(x),ze&&(Kr=!1),lr&&(Et=!0),kt&&(X=D({},li),d=Rt(null),kt.html===!0&&(D(X,ci),D(d,pi)),kt.svg===!0&&(D(X,co),D(d,uo),D(d,Mr)),kt.svgFilters===!0&&(D(X,lo),D(d,uo),D(d,Mr)),kt.mathMl===!0&&(D(X,po),D(d,di),D(d,Mr))),z.tagCheck=null,z.attributeCheck=null,we(s,"ADD_TAGS")&&(typeof s.ADD_TAGS=="function"?z.tagCheck=s.ADD_TAGS:vt(s.ADD_TAGS)&&(X===c&&(X=Oe(X)),D(X,s.ADD_TAGS,oe))),we(s,"ADD_ATTR")&&(typeof s.ADD_ATTR=="function"?z.attributeCheck=s.ADD_ATTR:vt(s.ADD_ATTR)&&(d===b&&(d=Oe(d)),D(d,s.ADD_ATTR,oe))),we(s,"ADD_FORBID_CONTENTS")&&vt(s.ADD_FORBID_CONTENTS)&&(st===Go&&(st=Oe(st)),D(st,s.ADD_FORBID_CONTENTS,oe)),Zr&&(X["#text"]=!0),nt&&D(X,["html","head","body"]),X.table&&(D(X,["tbody"]),delete F.tbody),s.TRUSTED_TYPES_POLICY){if(typeof s.TRUSTED_TYPES_POLICY.createHTML!="function")throw Xe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof s.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Xe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let h=q;q=s.TRUSTED_TYPES_POLICY;try{v=Fe("")}catch(m){throw q=h,m}}else s.TRUSTED_TYPES_POLICY===null?(q=void 0,v=""):(q===void 0&&(q=te()),q&&typeof v=="string"&&(v=Fe("")));he&&he(s),xt=s},Vo=D({},[...co,...lo,...Rc]),Wo=D({},[...po,...vc]),ya=function(s,l,h){return l.namespaceURI===Ge?s==="svg":l.namespaceURI===dr?s==="svg"&&(h==="annotation-xml"||rn[h]):!!Vo[s]},Aa=function(s,l,h){return l.namespaceURI===Ge?s==="math":l.namespaceURI===ur?s==="math"&&nn[h]:!!Wo[s]},wa=function(s,l,h){return l.namespaceURI===ur&&!nn[h]||l.namespaceURI===dr&&!rn[h]?!1:!Wo[s]&&(xa[s]||!Vo[s])},Ra=function(s){let l=be(s),h=dt(A(s)),m=se(s),_,O;return m&&$(m)===ce.element?(_={namespaceURI:be(m)},O=dt(A(m))):(_={namespaceURI:Tt},O="template"),tn[l]?l===ur?ya(h,_,O):l===dr?Aa(h,_,O):l===Ge?wa(h,_,O):!!(Mt==="application/xhtml+xml"&&tn[l]):!1},Ke=function(s){Ht(t.removed,{element:s});try{se(s).removeChild(s)}catch{if(I(s),!se(s))throw Xe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ko=function(s,l,h){try{L(s,l)}catch{try{s.removeAttribute(h)}catch{}}},sn=function(s){cn(s);let l=Te(s);l&&je(kc(l),m=>{try{I(m)}catch{}});let h=$(s)===ce.element?me(s):null;if(h)for(let m=h.length-1;m>=0;--m){let _=h[m],O=_&&_.name;typeof O=="string"&&Ko(s,_,O)}},bt=function(s,l,h){if(!h)try{h=l.getAttributeNode(s)}catch{h=null}Ht(t.removed,{attribute:h||null,from:l});try{h?L(l,h):l.removeAttribute(s)}catch{try{l.removeAttribute(s)}catch{}}if(s==="is")if(Et||lr)try{Ke(l)}catch{}else try{l.setAttribute(s,"")}catch{}},Yo=function(s){let l=me(s);if(l)for(let h=l.length-1;h>=0;--h){let m=l[h],_=m&&m.name;typeof _!="string"||d[oe(_)]||Ko(s,m,_)}},an=function(s,l){let h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,m=[s];for(;m.length>0;){let _=m.pop();if(l(_)===!1)continue;if(h&&$(_)===ce.element){let P=xe(_);Ye(P)&&m.push(P)}let O=Te(_);if(O)for(let P=O.length-1;P>=0;--P)m.push(O[P])}},cn=function(s){an(s,l=>{$(l)===ce.element&&Yo(l)})},ln=function(s){let l=[];return an(s,h=>{l.push(h)},!0),l},va=function(s,l){let h=so();je(ln(s),m=>{$(m)===ce.element&&io(h,m)}),je(l,m=>{$(m)===ce.element&&!Ft(h,m)&&Yo(m)})},qo=function(s,l){let h=!1;return je(t.removed,m=>{m.element&&(h=h||m.element===s,cn(m.element))}),va(s,l),h},Oa=8,Ia=function(s,l){let h=ot,m=null,_=()=>(m||(m=so(),je(l,O=>{io(m,O)})),m);for(let O=0;;O++){let P=ln(s),le=[s],$e=!1;if(je(P,_e=>{$(_e)===ce.documentFragment?Ht(le,_e):!$e&&!Ft(h,_e)&&($e=Ft(_(),_e))}),!$e)return;if(O>=Oa)throw Xe("the tree kept changing during in-place sanitization; refusing to return it");je(le,(_e,ye)=>{Ca(_e,ye>0,s,_())})}},Ca=function(s,l,h,m){let _=pn(s),O;for(;O=_.nextNode();)!Ft(m,O)||Ft(ot,O)||(l&&Ne(H.uponSanitizeShadowNode,O,null),un(O,h),fn(O,h),Ye(O.content)&&Dt(O.content))},La=function(s){ot&&io(ot,s)},Jo=function(s,l){return rt?s==="patchsrc"?!0:s==="for"&&l!=="label"&&l!=="output":!1},Pa=function(s){rt&&an(s,l=>{let h=$(l);if(h===ce.processingInstruction||h===ce.comment&&Ee(fi,l.data)){try{I(l)}catch{}return!1}if(h===ce.element){let m=l,_=oe(A(l));try{m.hasAttribute&&m.hasAttribute("patchsrc")&&m.removeAttribute("patchsrc"),m.hasAttribute&&m.hasAttribute("for")&&Jo("for",_)&&m.removeAttribute("for")}catch{}}return!0})},Zo=function(s){let l=null,h=null;if(Jr)s="<remove></remove>"+s;else{let O=oi(s,/^[\r\n\t ]+/);h=O&&O[0]}Mt==="application/xhtml+xml"&&Tt===Ge&&(s='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+s+"</body></html>");let m=q?Fe(s):s;if(Tt===Ge)try{l=new g().parseFromString(m,Mt)}catch{}if(!l||!l.documentElement){l=tt.createDocument(Tt,"template",null);try{l.documentElement.innerHTML=en?v:m}catch{}}let _=l.body||l.documentElement;return s&&h&&_.insertBefore(r.createTextNode(h),_.childNodes[0]||null),Tt===Ge?rr.call(l,nt?"html":"body")[0]:nt?l.documentElement:_},pn=function(s){let l=ue?ue(s):s.ownerDocument;return Ct.call(l||s,s,p.SHOW_ELEMENT|p.SHOW_COMMENT|p.SHOW_TEXT|p.SHOW_PROCESSING_INSTRUCTION|p.SHOW_CDATA_SECTION,null)},fr=function(s){return s=zt(s,nr," "),s=zt(s,or," "),s=zt(s,sr," "),s},dn=function(s){var l;Qo(s);let h=(l=s.querySelectorAll)===null||l===void 0?void 0:l.call(s,"template");h&&je(h,m=>{Ye(m.content)&&dn(m.content)})},Qo=function(s){s.normalize();let l=ue?ue(s):s.ownerDocument,h=Ct.call(l||s,s,p.SHOW_TEXT|p.SHOW_COMMENT|p.SHOW_CDATA_SECTION|p.SHOW_PROCESSING_INSTRUCTION,null),m=h.nextNode();for(;m;)m.data=fr(m.data),m=h.nextNode()},hr=function(s){let l=de?de(s):null;return typeof l!="string"||oe(l)!=="form"?!1:typeof s.nodeName!="string"||typeof s.textContent!="string"||typeof s.removeChild!="function"||s.attributes!==me(s)||typeof s.removeAttribute!="function"||typeof s.removeAttributeNode!="function"||typeof s.getAttributeNode!="function"||typeof s.setAttribute!="function"||typeof s.namespaceURI!="string"||typeof s.insertBefore!="function"||typeof s.hasChildNodes!="function"||s.nodeType!==ie(s)||s.childNodes!==Te(s)},Ye=function(s){if(!ie||typeof s!="object"||s===null)return!1;try{return ie(s)===ce.documentFragment}catch{return!1}},Ut=function(s){if(!ie||typeof s!="object"||s===null)return!1;try{return typeof ie(s)=="number"}catch{return!1}};function Ne(E,s,l){E.length!==0&&je(E,h=>{h.call(t,s,l,xt)})}let Na=function(s,l){return!!(rt&&s.hasChildNodes()&&!Ut(s.firstElementChild)&&Ee(fo,s.textContent)&&Ee(fo,s.innerHTML)||rt&&$c[l]&&$(s)===ce.element&&be(s)===Ge&&(Ut(s.firstElementChild)||typeof s.textContent=="string"&&Ee(fo,s.textContent))||s.nodeType===ce.processingInstruction||rt&&s.nodeType===ce.comment&&Ee(fi,s.data))},mr=function(s,l){if(s instanceof RegExp)return Ee(s,l);if(s instanceof Function){for(var h=arguments.length,m=new Array(h>2?h-2:0),_=2;_<h;_++)m[_-2]=arguments[_];return!!s(l,...m)}return!1},Ma=function(s,l,h){if(!F[l]&&rs(l)&&mr(x.tagNameCheck,l))return!1;if(Zr&&!st[l]&&!st[dt(l)]){let m=se(s),_=Te(s);if(_&&m){let O=_.length;for(let P=O-1;P>=0;--P){let le=s===h?S(_[P],!0):_[P];m.insertBefore(le,Q(s))}}}return Ke(s),!0},es=function(s,l,h,m){return s.length===0?l:l===h||l===m?Oe(l):l},_t=function(s,l){return s===l||se(s)!==null?!1:(Qr&&cn(s),!0)},un=function(s,l){if(La(s),Ne(H.beforeSanitizeElements,s,null),_t(s,l))return!0;if(hr(s))return Ke(s),!0;let h=oe(A(s));if(X=es(H.uponSanitizeElement,X,c,ar),Ne(H.uponSanitizeElement,s,{tagName:h,allowedTags:X}),_t(s,l))return!0;if(Na(s,h))return Ke(s),!0;if(F[h]||!(z.tagCheck instanceof Function&&z.tagCheck(h))&&!X[h]){let m=Ma(s,h,l);return m===!1&&(Ne(H.afterSanitizeElements,s,null),_t(s,l))?!0:m}if($(s)===ce.element&&!Ra(s)||(h==="noscript"||h==="noembed"||h==="noframes")&&Ee(Gc,s.innerHTML))return Ke(s),!0;if(ze&&s.nodeType===ce.text){let m=fr(s.textContent);s.textContent!==m&&(Ht(t.removed,{element:s.cloneNode()}),s.textContent=m)}return Ne(H.afterSanitizeElements,s,null),_t(s,l)},ts=function(s,l,h){if(j[l]||Jo(l,s)||Mo&&(l==="id"||l==="name")&&(h in r||h in Sa))return!1;let m=d[l]||z.attributeCheck instanceof Function&&z.attributeCheck(l,s);return Kr&&Ee(Re,l)||Po&&Ee(Lt,l)?!0:m?Fo[l]||Ee(Nt,zt(h,ir,""))||(l==="src"||l==="xlink:href"||l==="href")&&s!=="script"&&si(h,"data:")===0&&$o[s]||No&&!Ee(Pt,zt(h,ir,""))?!0:!h:rs(s)&&mr(x.tagNameCheck,s)&&mr(x.attributeNameCheck,l,s)||l==="is"&&x.allowCustomizedBuiltInElements&&mr(x.tagNameCheck,h)},Ua=D({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),rs=function(s){return!Ua[dt(s)]&&Ee(gt,s)},Da=function(s,l,h,m){if(q&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!h)switch(f.getAttributeType(s,l)){case"TrustedHTML":return Fe(m);case"TrustedScriptURL":return ge(m)}return m},Ga=function(s,l,h,m){try{return h?s.setAttributeNS(h,l,m):s.setAttribute(l,m),hr(s)?(Ke(s),!1):!0}catch{return bt(l,s),!1}},ns=function(s,l){return rt&&Ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,l)?!0:dt(s)==="attributename"&&oi(l,"href")!==null},fn=function(s,l){if(Ne(H.beforeSanitizeAttributes,s,null),_t(s,l))return;let h=s.attributes;if(!h||hr(s))return;d=es(H.uponSanitizeAttribute,d,b,cr);let m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d,forceKeepAttr:void 0},_=h.length,O=oe(s.nodeName);for(;_--;){let P=h[_],le=P.name,$e=P.namespaceURI,_e=P.value,ye=oe(le),St=_e,Ae=le==="value"?St:xc(St),os=!1;if(m.attrName=ye,m.attrValue=Ae,m.keepAttr=!0,m.forceKeepAttr=void 0,Ne(H.uponSanitizeAttribute,s,m),Ae=m.attrValue,Uo&&(ye==="id"||ye==="name")&&si(Ae,Do)!==0&&(bt(le,s,P),Ae=Do+Ae,os=!0),ns(le,Ae)){bt(le,s,P);continue}if(!m.forceKeepAttr){if(!m.keepAttr){bt(le,s,P);continue}if(!Yr&&Ee(hi,Ae)){bt(le,s,P);continue}if(ze&&(Ae=fr(Ae)),!ts(O,ye,Ae)){bt(le,s,P);continue}Ae=Da(O,ye,$e,Ae),Ae!==St&&Ga(s,le,$e,Ae)&&os&&ni(t.removed)}}Ne(H.afterSanitizeAttributes,s,null),_t(s,l)},Dt=function(s){let l=null,h=pn(s);for(Ne(H.beforeSanitizeShadowDOM,s,null);l=h.nextNode();)if(Ne(H.uponSanitizeShadowNode,l,null),un(l,s),fn(l,s),Ye(l.content)&&Dt(l.content),$(l)===ce.element){let m=xe(l);Ye(m)&&(hn(m),Dt(m))}ze&&Qo(s),Ne(H.afterSanitizeShadowDOM,s,null)},hn=function(s){let l=[{node:s,shadow:null}];for(;l.length>0;){let h=l.pop();if(h.shadow){Dt(h.shadow);continue}let m=h.node,_=$(m)===ce.element,O=Te(m);if(O)for(let P=O.length-1;P>=0;--P)l.push({node:O[P],shadow:null});if(_){let P=de?de(m):null;if(typeof P=="string"&&oe(P)==="template"){let le=m.content;Ye(le)&&l.push({node:le,shadow:null})}}if(_){let P=xe(m);Ye(P)&&l.push({node:null,shadow:P},{node:P,shadow:null})}}};return t.sanitize=function(E){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,h=null,m=null,_=null;if(en=!E,en&&(E="<!-->"),typeof E!="string"&&!Ut(E)&&(E=yc(E),typeof E!="string"))throw Xe("dirty is not a string, aborting");if(!t.isSupported)return E;qr?(X=ar,d=cr):on(s),(H.uponSanitizeElement.length>0||H.uponSanitizeAttribute.length>0)&&(X=Oe(X)),H.uponSanitizeAttribute.length>0&&(d=Oe(d)),t.removed=[];let O=Qr&&typeof E!="string"&&Ut(E),P=[],le=ot;if(O){Pa(E);let ye=A(E);if(typeof ye=="string"){let St=oe(ye);if(!X[St]||F[St])throw sn(E),Xe("root node is forbidden and cannot be sanitized in-place")}if(hr(E))throw sn(E),Xe("root node is clobbered and cannot be sanitized in-place");P=ln(E),ot=so()}else if(Ut(E))l=Zo("<!---->"),h=l.ownerDocument.importNode(E,!0),h.nodeType===ce.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?l=h:l.appendChild(h),hn(l);else{if(!Et&&!ze&&!nt&&E.indexOf("<")===-1)return q&&pr?Fe(E):E;if(l=Zo(E),!l)return Et?null:pr?v:""}l&&Jr&&Ke(l.firstChild);let $e=O?E:l;try{O&&hn(E);let ye=pn($e);for(;m=ye.nextNode();)un(m,$e),fn(m,$e),Ye(m.content)&&Dt(m.content);O&&Ia(E,P)}catch(ye){throw O&&(sn(E),qo(E,P)),ye}finally{ot=le}if(O){if(qo(E,P))throw Xe("a node selected for removal could not be safely returned; refusing to sanitize in place");return ze&&dn(E),E}if(Et){if(ze&&dn(l),lr)for(_=tr.call(l.ownerDocument);l.firstChild;)_.appendChild(l.firstChild);else _=l;return(d.shadowroot||d.shadowrootmode)&&(_=mt.call(n,_,!0)),_}let _e=nt?l.outerHTML:l.innerHTML;return nt&&X["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&Ee(Uc,l.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+_e),ze&&(_e=fr(_e)),q&&pr?Fe(_e):_e},t.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};on(E),qr=!0,ar=X,cr=d},t.clearConfig=function(){xt=null,qr=!1,ar=null,cr=null,q=ne,v=""},t.isValidAttribute=function(E,s,l){xt||on({});let h=oe(E),m=oe(s);return typeof l=="string"&&(ns(s,l)||!Yr&&Ee(hi,l))?!1:ts(h,m,l)},t.addHook=function(E,s){typeof s=="function"&&we(H,E)&&Ht(H[E],s)},t.removeHook=function(E,s){if(we(H,E)){if(s!==void 0){let l=Ec(H[E],s);return l===-1?void 0:Tc(H[E],l,1)[0]}return ni(H[E])}},t.removeHooks=function(E){we(H,E)&&(H[E]=[])},t.removeAllHooks=function(){H=mi()},t}var zc=bi();function xo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ft=xo();function vi(e){ft=e}var Wt={exec:()=>null};function G(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(o,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(Se.caret,"$1"),r=r.replace(o,a),n},getRegex:()=>new RegExp(r,t)};return n}var Bc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Se={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},jc=/^(?:[ \t]*(?:\n|$))+/,Xc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Vc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Kt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bo=/(?:[*+-]|\d{1,9}[.)])/,Oi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ii=G(Oi).replace(/bull/g,bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Kc=G(Oi).replace(/bull/g,bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_o=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Yc=/^[^\n]+/,So=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,qc=G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",So).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Jc=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bo).getRegex(),Hr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Zc=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",yo).replace("tag",Hr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ci=G(_o).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hr).getRegex(),Qc=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ci).getRegex(),Ao={blockquote:Qc,code:Xc,def:qc,fences:Vc,heading:Wc,hr:Kt,html:Zc,lheading:Ii,list:Jc,newline:jc,paragraph:Ci,table:Wt,text:Yc},_i=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hr).getRegex(),el={...Ao,lheading:Kc,table:_i,paragraph:G(_o).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",_i).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hr).getRegex()},tl={...Ao,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Wt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(_o).replace("hr",Kt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ii).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},rl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,nl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Li=/^( {2,}|\\)\n(?!\s*$)/,ol=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fr=/[\p{P}\p{S}]/u,wo=/[\s\p{P}\p{S}]/u,Pi=/[^\s\p{P}\p{S}]/u,sl=G(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wo).getRegex(),Ni=/(?!~)[\p{P}\p{S}]/u,il=/(?!~)[\s\p{P}\p{S}]/u,al=/(?:[^\s\p{P}\p{S}]|~)/u,cl=G(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Bc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Mi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ll=G(Mi,"u").replace(/punct/g,Fr).getRegex(),pl=G(Mi,"u").replace(/punct/g,Ni).getRegex(),Ui="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",dl=G(Ui,"gu").replace(/notPunctSpace/g,Pi).replace(/punctSpace/g,wo).replace(/punct/g,Fr).getRegex(),ul=G(Ui,"gu").replace(/notPunctSpace/g,al).replace(/punctSpace/g,il).replace(/punct/g,Ni).getRegex(),fl=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Pi).replace(/punctSpace/g,wo).replace(/punct/g,Fr).getRegex(),hl=G(/\\(punct)/,"gu").replace(/punct/g,Fr).getRegex(),ml=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gl=G(yo).replace("(?:-->|$)","-->").getRegex(),El=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Dr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,kl=G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Dr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Di=G(/^!?\[(label)\]\[(ref)\]/).replace("label",Dr).replace("ref",So).getRegex(),Gi=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",So).getRegex(),Tl=G("reflink|nolink(?!\\()","g").replace("reflink",Di).replace("nolink",Gi).getRegex(),Si=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ro={_backpedal:Wt,anyPunctuation:hl,autolink:ml,blockSkip:cl,br:Li,code:nl,del:Wt,emStrongLDelim:ll,emStrongRDelimAst:dl,emStrongRDelimUnd:fl,escape:rl,link:kl,nolink:Gi,punctuation:sl,reflink:Di,reflinkSearch:Tl,tag:El,text:ol,url:Wt},xl={...Ro,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",Dr).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Dr).getRegex()},Eo={...Ro,emStrongRDelimAst:ul,emStrongLDelim:pl,url:G(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Si).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:G(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Si).getRegex()},bl={...Eo,br:G(Li).replace("{2,}","*").getRegex(),text:G(Eo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ur={normal:Ao,gfm:el,pedantic:tl},jt={normal:Ro,gfm:Eo,breaks:bl,pedantic:xl},_l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},yi=e=>_l[e];function He(e,t){if(t){if(Se.escapeTest.test(e))return e.replace(Se.escapeReplace,yi)}else if(Se.escapeTestNoEncode.test(e))return e.replace(Se.escapeReplaceNoEncode,yi);return e}function Ai(e){try{e=encodeURI(e).replace(Se.percentDecode,"%")}catch{return null}return e}function wi(e,t){let r=e.replace(Se.findPipe,(i,a,u)=>{let p=!1,g=a;for(;--g>=0&&u[g]==="\\";)p=!p;return p?"|":" |"}),n=r.split(Se.splitPipe),o=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;o<n.length;o++)n[o]=n[o].trim().replace(Se.slashPipe,"|");return n}function Xt(e,t,r){let n=e.length;if(n===0)return"";let o=0;for(;o<n;){let i=e.charAt(n-o-1);if(i===t&&!r)o++;else if(i!==t&&r)o++;else break}return e.slice(0,n-o)}function Sl(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ri(e,t,r,n,o){let i=t.href,a=t.title||null,u=e[1].replace(o.other.outputLinkReplace,"$1");n.state.inLink=!0;let p={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:a,text:u,tokens:n.inlineTokens(u)};return n.state.inLink=!1,p}function yl(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let o=n[1];return t.split(`
`).map(i=>{let a=i.match(r.other.beginningSpace);if(a===null)return i;let[u]=a;return u.length>=o.length?i.slice(o.length):i}).join(`
`)}var Gr=class{options;rules;lexer;constructor(e){this.options=e||ft}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xt(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=yl(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Xt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Xt(t[0],`
`).split(`
`),n="",o="",i=[];for(;r.length>0;){let a=!1,u=[],p;for(p=0;p<r.length;p++)if(this.rules.other.blockquoteStart.test(r[p]))u.push(r[p]),a=!0;else if(!a)u.push(r[p]);else break;r=r.slice(p);let g=u.join(`
`),f=g.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${g}`:g,o=o?`${o}
${f}`:f;let T=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,i,!0),this.lexer.state.top=T,r.length===0)break;let S=i.at(-1);if(S?.type==="code")break;if(S?.type==="blockquote"){let I=S,L=I.raw+`
`+r.join(`
`),Q=this.blockquote(L);i[i.length-1]=Q,n=n.substring(0,n.length-I.raw.length)+Q.raw,o=o.substring(0,o.length-I.text.length)+Q.text;break}else if(S?.type==="list"){let I=S,L=I.raw+`
`+r.join(`
`),Q=this.list(L);i[i.length-1]=Q,n=n.substring(0,n.length-S.raw.length)+Q.raw,o=o.substring(0,o.length-I.raw.length)+Q.raw,r=L.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,o={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let i=this.rules.other.listItemRegex(r),a=!1;for(;e;){let p=!1,g="",f="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;g=t[0],e=e.substring(g.length);let T=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,se=>" ".repeat(3*se.length)),S=e.split(`
`,1)[0],I=!T.trim(),L=0;if(this.options.pedantic?(L=2,f=T.trimStart()):I?L=t[1].length+1:(L=t[2].search(this.rules.other.nonSpaceChar),L=L>4?1:L,f=T.slice(L),L+=t[1].length),I&&this.rules.other.blankLine.test(S)&&(g+=S+`
`,e=e.substring(S.length+1),p=!0),!p){let se=this.rules.other.nextBulletRegex(L),xe=this.rules.other.hrRegex(L),me=this.rules.other.fencesBeginRegex(L),ie=this.rules.other.headingBeginRegex(L),de=this.rules.other.htmlBeginRegex(L);for(;e;){let ue=e.split(`
`,1)[0],$;if(S=ue,this.options.pedantic?(S=S.replace(this.rules.other.listReplaceNesting,"  "),$=S):$=S.replace(this.rules.other.tabCharGlobal,"    "),me.test(S)||ie.test(S)||de.test(S)||se.test(S)||xe.test(S))break;if($.search(this.rules.other.nonSpaceChar)>=L||!S.trim())f+=`
`+$.slice(L);else{if(I||T.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||me.test(T)||ie.test(T)||xe.test(T))break;f+=`
`+S}!I&&!S.trim()&&(I=!0),g+=ue+`
`,e=e.substring(ue.length+1),T=$.slice(L)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(a=!0));let Q=null,Te;this.options.gfm&&(Q=this.rules.other.listIsTask.exec(f),Q&&(Te=Q[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:g,task:!!Q,checked:Te,loose:!1,text:f,tokens:[]}),o.raw+=g}let u=o.items.at(-1);if(u)u.raw=u.raw.trimEnd(),u.text=u.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let p=0;p<o.items.length;p++)if(this.lexer.state.top=!1,o.items[p].tokens=this.lexer.blockTokens(o.items[p].text,[]),!o.loose){let g=o.items[p].tokens.filter(T=>T.type==="space"),f=g.length>0&&g.some(T=>this.rules.other.anyLine.test(T.raw));o.loose=f}if(o.loose)for(let p=0;p<o.items.length;p++)o.items[p].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=wi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?i.align.push("right"):this.rules.other.tableAlignCenter.test(a)?i.align.push("center"):this.rules.other.tableAlignLeft.test(a)?i.align.push("left"):i.align.push(null);for(let a=0;a<r.length;a++)i.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:i.align[a]});for(let a of o)i.rows.push(wi(a,i.header.length).map((u,p)=>({text:u,tokens:this.lexer.inline(u),header:!1,align:i.align[p]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=Xt(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=Sl(t[2],"()");if(i===-2)return;if(i>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(n);i&&(n=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ri(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[n.toLowerCase()];if(!o){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Ri(r,o,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let o=[...n[0]].length-1,i,a,u=o,p=0,g=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+o);(n=g.exec(t))!=null;){if(i=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!i)continue;if(a=[...i].length,n[3]||n[4]){u+=a;continue}else if((n[5]||n[6])&&o%3&&!((o+a)%3)){p+=a;continue}if(u-=a,u>0)continue;a=Math.min(a,a+u+p);let f=[...n[0]][0].length,T=e.slice(0,o+n.index+f+a);if(Math.min(o,a)%2){let I=T.slice(1,-1);return{type:"em",raw:T,text:I,tokens:this.lexer.inlineTokens(I)}}let S=T.slice(2,-2);return{type:"strong",raw:T,text:S,tokens:this.lexer.inlineTokens(S)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),o=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&o&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ue=class ko{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ft,this.options.tokenizer=this.options.tokenizer||new Gr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Se,block:Ur.normal,inline:jt.normal};this.options.pedantic?(r.block=Ur.pedantic,r.inline=jt.pedantic):this.options.gfm&&(r.block=Ur.gfm,this.options.breaks?r.inline=jt.breaks:r.inline=jt.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ur,inline:jt}}static lex(t,r){return new ko(r).lex(t)}static lexInline(t,r){return new ko(r).inlineTokens(t)}lex(t){t=t.replace(Se.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Se.tabCharGlobal,"    ").replace(Se.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(a=>(o=a.call({lexer:this},t,r))?(t=t.substring(o.raw.length),r.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let a=r.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):r.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},r.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),r.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),r.push(o);continue}let i=t;if(this.options.extensions?.startBlock){let a=1/0,u=t.slice(1),p;this.options.extensions.startBlock.forEach(g=>{p=g.call({lexer:this},u),typeof p=="number"&&p>=0&&(a=Math.min(a,p))}),a<1/0&&a>=0&&(i=t.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(i))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(o),n=i.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(o);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,o=null;if(this.tokens.links){let p=Object.keys(this.tokens.links);if(p.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)p.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,o.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)i=o[2]?o[2].length:0,n=n.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,u="";for(;t;){a||(u=""),a=!1;let p;if(this.options.extensions?.inline?.some(f=>(p=f.call({lexer:this},t,r))?(t=t.substring(p.raw.length),r.push(p),!0):!1))continue;if(p=this.tokenizer.escape(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.tag(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.link(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(p.raw.length);let f=r.at(-1);p.type==="text"&&f?.type==="text"?(f.raw+=p.raw,f.text+=p.text):r.push(p);continue}if(p=this.tokenizer.emStrong(t,n,u)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.codespan(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.br(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.del(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.autolink(t)){t=t.substring(p.raw.length),r.push(p);continue}if(!this.state.inLink&&(p=this.tokenizer.url(t))){t=t.substring(p.raw.length),r.push(p);continue}let g=t;if(this.options.extensions?.startInline){let f=1/0,T=t.slice(1),S;this.options.extensions.startInline.forEach(I=>{S=I.call({lexer:this},T),typeof S=="number"&&S>=0&&(f=Math.min(f,S))}),f<1/0&&f>=0&&(g=t.substring(0,f+1))}if(p=this.tokenizer.inlineText(g)){t=t.substring(p.raw.length),p.raw.slice(-1)!=="_"&&(u=p.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=p.raw,f.text+=p.text):r.push(p);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},$r=class{options;parser;constructor(e){this.options=e||ft}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Se.notSpaceStart)?.[0],o=e.replace(Se.endingNewline,"")+`
`;return n?'<pre><code class="language-'+He(n)+'">'+(r?o:He(o,!0))+`</code></pre>
`:"<pre><code>"+(r?o:He(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let u=e.items[a];n+=this.listitem(u)}let o=t?"ol":"ul",i=t&&r!==1?' start="'+r+'"':"";return"<"+o+i+`>
`+n+"</"+o+`>
`}listitem(e){let t="";if(e.task){let r=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=r+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=r+" "+He(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):t+=r+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let o=0;o<e.header.length;o++)r+=this.tablecell(e.header[o]);t+=this.tablerow({text:r});let n="";for(let o=0;o<e.rows.length;o++){let i=e.rows[o];r="";for(let a=0;a<i.length;a++)r+=this.tablecell(i[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${He(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),o=Ai(e);if(o===null)return n;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+He(t)+'"'),i+=">"+n+"</a>",i}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let o=Ai(e);if(o===null)return He(r);e=o;let i=`<img src="${e}" alt="${r}"`;return t&&(i+=` title="${He(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:He(e.text)}},vo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},De=class To{options;renderer;textRenderer;constructor(t){this.options=t||ft,this.options.renderer=this.options.renderer||new $r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vo}static parse(t,r){return new To(r).parse(t)}static parseInline(t,r){return new To(r).parseInline(t)}parse(t,r=!0){let n="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let u=i,p=this.options.extensions.renderers[u.type].call({parser:this},u);if(p!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(u.type)){n+=p||"";continue}}let a=i;switch(a.type){case"space":{n+=this.renderer.space(a);continue}case"hr":{n+=this.renderer.hr(a);continue}case"heading":{n+=this.renderer.heading(a);continue}case"code":{n+=this.renderer.code(a);continue}case"table":{n+=this.renderer.table(a);continue}case"blockquote":{n+=this.renderer.blockquote(a);continue}case"list":{n+=this.renderer.list(a);continue}case"html":{n+=this.renderer.html(a);continue}case"def":{n+=this.renderer.def(a);continue}case"paragraph":{n+=this.renderer.paragraph(a);continue}case"text":{let u=a,p=this.renderer.text(u);for(;o+1<t.length&&t[o+1].type==="text";)u=t[++o],p+=`
`+this.renderer.text(u);r?n+=this.renderer.paragraph({type:"paragraph",raw:p,text:p,tokens:[{type:"text",raw:p,text:p,escaped:!0}]}):n+=p;continue}default:{let u='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return n}parseInline(t,r=this.renderer){let n="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let u=this.options.extensions.renderers[i.type].call({parser:this},i);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=u||"";continue}}let a=i;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let u='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return n}},Vt=class{options;block;constructor(e){this.options=e||ft}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ue.lex:Ue.lexInline}provideParser(){return this.block?De.parse:De.parseInline}},Al=class{defaults=xo();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=De;Renderer=$r;TextRenderer=vo;Lexer=Ue;Tokenizer=Gr;Hooks=Vt;constructor(...e){this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let o=n;for(let i of o.header)r=r.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let a of i)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let o=n;r=r.concat(this.walkTokens(o.items,t));break}default:{let o=n;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let a=o[i].flat(1/0);r=r.concat(this.walkTokens(a,t))}):o.tokens&&(r=r.concat(this.walkTokens(o.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...a){let u=o.renderer.apply(this,a);return u===!1&&(u=i.apply(this,a)),u}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),n.extensions=t),r.renderer){let o=this.defaults.renderer||new $r(this.defaults);for(let i in r.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,u=r.renderer[a],p=o[a];o[a]=(...g)=>{let f=u.apply(o,g);return f===!1&&(f=p.apply(o,g)),f||""}}n.renderer=o}if(r.tokenizer){let o=this.defaults.tokenizer||new Gr(this.defaults);for(let i in r.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,u=r.tokenizer[a],p=o[a];o[a]=(...g)=>{let f=u.apply(o,g);return f===!1&&(f=p.apply(o,g)),f}}n.tokenizer=o}if(r.hooks){let o=this.defaults.hooks||new Vt;for(let i in r.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,u=r.hooks[a],p=o[a];Vt.passThroughHooks.has(i)?o[a]=g=>{if(this.defaults.async&&Vt.passThroughHooksRespectAsync.has(i))return(async()=>{let T=await u.call(o,g);return p.call(o,T)})();let f=u.call(o,g);return p.call(o,f)}:o[a]=(...g)=>{if(this.defaults.async)return(async()=>{let T=await u.apply(o,g);return T===!1&&(T=await p.apply(o,g)),T})();let f=u.apply(o,g);return f===!1&&(f=p.apply(o,g)),f}}n.hooks=o}if(r.walkTokens){let o=this.defaults.walkTokens,i=r.walkTokens;n.walkTokens=function(a){let u=[];return u.push(i.call(this,a)),o&&(u=u.concat(o.call(this,a))),u}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ue.lex(e,t??this.defaults)}parser(e,t){return De.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},o={...this.defaults,...n},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&n.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let a=o.hooks?await o.hooks.preprocess(t):t,u=await(o.hooks?await o.hooks.provideLexer():e?Ue.lex:Ue.lexInline)(a,o),p=o.hooks?await o.hooks.processAllTokens(u):u;o.walkTokens&&await Promise.all(this.walkTokens(p,o.walkTokens));let g=await(o.hooks?await o.hooks.provideParser():e?De.parse:De.parseInline)(p,o);return o.hooks?await o.hooks.postprocess(g):g})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let a=(o.hooks?o.hooks.provideLexer():e?Ue.lex:Ue.lexInline)(t,o);o.hooks&&(a=o.hooks.processAllTokens(a)),o.walkTokens&&this.walkTokens(a,o.walkTokens);let u=(o.hooks?o.hooks.provideParser():e?De.parse:De.parseInline)(a,o);return o.hooks&&(u=o.hooks.postprocess(u)),u}catch(a){return i(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+He(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},ut=new Al;function B(e,t){return ut.parse(e,t)}B.options=B.setOptions=function(e){return ut.setOptions(e),B.defaults=ut.defaults,vi(B.defaults),B};B.getDefaults=xo;B.defaults=ft;B.use=function(...e){return ut.use(...e),B.defaults=ut.defaults,vi(B.defaults),B};B.walkTokens=function(e,t){return ut.walkTokens(e,t)};B.parseInline=ut.parseInline;B.Parser=De;B.parser=De.parse;B.Renderer=$r;B.TextRenderer=vo;B.Lexer=Ue;B.lexer=Ue.lex;B.Tokenizer=Gr;B.Hooks=Vt;B.parse=B;var em=B.options,tm=B.setOptions,rm=B.use,nm=B.walkTokens,om=B.parseInline;var sm=De.parse,im=Ue.lex;var V=Xn();function N(e,t={},...r){let n=document.createElement(e);for(let[o,i]of Object.entries(t))if(i!=null){if(o==="dataset"){Object.assign(n.dataset,i);continue}if(o==="style"){n.setAttribute("style",String(i));continue}if(o.startsWith("on")&&typeof i=="function"){n.addEventListener(o.slice(2).toLowerCase(),i);continue}if(o==="className"&&typeof i=="string"){n.className=i;continue}n[o]=i}for(let o of r)o!=null&&n.append(typeof o=="string"?document.createTextNode(o):o);return n}function zr(e){e.replaceChildren()}function $i(e){if(!e||typeof e!="object")return{};let t={};for(let[r,n]of Object.entries(e))!n||typeof n!="object"||typeof n.taskId!="string"||(t[r]={taskId:n.taskId,ticketId:typeof n.ticketId=="string"?n.ticketId:"",title:typeof n.title=="string"?n.title:"",at:typeof n.at=="number"?n.at:0,posted:Array.isArray(n.posted)?n.posted.filter(o=>typeof o=="string"):[]});return t}function Hi(e,t=50){let r=Object.entries(e).sort((n,o)=>o[1].at-n[1].at).slice(0,Math.max(0,t));return Object.fromEntries(r)}var Fi="preferences",zi={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null};function Bi(e){if(typeof e!="object"||e===null)return{...zi};let t=e,r=t.priorityFilter,n=r==="any"||!!r&&r in Qs;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:n?r:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null}}async function Yt(){try{return Bi(await V.storage.get(Fi))}catch{return{...zi}}}async function ji(e){let t=Bi({...await Yt(),...e});try{await V.storage.set(Fi,t)}catch{}return t}var Xi="session-links";async function wl(){try{return $i(await V.storage.get(Xi))}catch{return{}}}async function Vi(e,t){try{let r=await wl();r[e]={...t,at:Date.now(),posted:[]};let n=Hi(r);await V.storage.set(Xi,JSON.parse(JSON.stringify(n)))}catch{}}var Rl=864e5;function Oo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function Io(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(r=>r[0].toUpperCase()+r.slice(1)).join(" ")}function Yi(e,t,r){return`${qs}/dashboard/workspace/${e}/project/${t}/task/${r}`}var vl={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function qt(e){return vl[e]??e}function qi(e,t=new Date){if(!e)return null;let r=new Date(e);if(Number.isNaN(r.getTime()))return null;let n=Math.round((jr(r).getTime()-jr(t).getTime())/Rl);return n===0?"Due today":n===1?"Due tomorrow":n===-1?"Due yesterday":n<0?`Overdue ${Math.abs(n)}d`:n<=7?`Due in ${n}d`:`Due ${r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function Ji(e,t=new Date){if(!e)return!1;let r=new Date(e);return Number.isNaN(r.getTime())?!1:jr(r).getTime()<jr(t).getTime()}function jr(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Zi(e,t=160){if(!e)return"";let r=e.split(`
`).map(o=>o.trim()).find(o=>o.length>0);if(!r)return"";let n=r.replace(/^#{1,6}\s+/,"").replace(/^[*_>]+/,"").trim();return n.length>t?`${n.slice(0,t-1)}\u2026`:n}function Qi(e,t){let r=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&r.push(`Project: ${t.projectName}`),t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${qt(e.priority)}`),e.dueDate&&r.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&r.push(t.url);let n=e.description?.trim();return n&&r.push("",n),r.join(`
`)}function ea(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Wi=6e4,Ki=36e5,Br=864e5;function ta(e,t=Date.now()){if(!e)return null;let r=Date.parse(e);if(!Number.isFinite(r))return null;let n=Math.max(0,t-r);return n<Wi?"just now":n<Ki?`${Math.floor(n/Wi)}m`:n<Br?`${Math.floor(n/Ki)}h`:n<7*Br?`${Math.floor(n/Br)}d`:`${Math.floor(n/(7*Br))}w`}function ra(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function na(e){return Yi(e.workspaceId,e.task.projectId,e.task.id)}function Ol(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function oa(e){return{providerId:Js,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:na(e),text:Qi(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:na(e)}),author:e.task.assigneeName??void 0,data:Ol(e)}}async function sa(e){await V.attach(oa(e))}async function Il(e,t={}){let r=t.worktree?ea(e.ticketId):void 0,n=await V.startSession({...oa(e),navigation:"preserve",...r?{worktree:{kind:"new",name:r}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return n.sessionId===null?{sessionId:null,sent:n.sent,failure:n.failure,branch:n.worktree.branch}:{sessionId:n.sessionId,sent:n.sent,branch:n.worktree?.branch??r}}async function ia(e,t={}){let r=await Il(e,t);if(r.sessionId===null){let n=r.branch?` The worktree ${r.branch} was kept.`:"",o=r.failure?` (${r.failure})`:"";return await V.toast({kind:"error",message:`No session was created${o}.${n} Check the session list before retrying.`,dismiss:!0}),!1}return await Vi(r.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await V.toast({kind:"success",message:t.worktree&&r.branch?`Session started on ${r.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}var Cl=`
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

/* The detail sheet, drawn in place over the list. */
.sheet {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: var(--oc-bg);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  overflow-y: auto;
}

.sheet-head {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.sheet-title { font-size: 14px; font-weight: 600; line-height: 1.35; }

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
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  overflow-y: auto;
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
  overflow-y: auto;
  padding: 10px 4px 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

/* Preview header: state pill, ticket id, close. */
.preview-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.state-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--oc-border);
  border-radius: 999px;
  padding: 3px 10px;
  background: none;
  font: inherit;
  font-size: 12px;
  color: inherit;
  cursor: pointer;
}

.state-pill:hover { border-color: var(--oc-primary); }

.preview-title { font-size: 15px; font-weight: 650; line-height: 1.35; }

/* Comments under the description, like the reference preview's timeline. */
.comments { display: flex; flex-direction: column; gap: 10px; }
.comment { display: flex; flex-direction: column; gap: 3px; }
.comment-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--oc-muted);
}
.comment-body { font-size: 12px; }

.kaneo-mark { flex-shrink: 0; fill: currentColor; }

.kaneo-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}
`;function aa(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let r=document.createElement("style");r.id=t,r.textContent=Cl,e.append(r)}var Ll='<path d="M38.9 510.4C15 515.5 0 507.7 0 498.4V314.3c0-1 0-2 .1-3V127.7c.1-7.5 1.5-12.8 19-16.5l81.8-16.5c23.9-5.1 38.9 2.7 38.9 12v370.8c-.1 7.5-1.5 12.8-19 16.5zm186.2-46.6c-23.9 5.1-38.9-2.7-38.9-12v-184c0-1 0-2 .1-3V81.1c.1-7.5 1.5-12.8 19-16.5l81.8-16.5C311 43 326 50.8 326 60.1v370.8c-.1 7.5-1.5 12.8-19 16.5zm248-462.2C497-3.5 512 4.3 512 13.6v63.1L407.6 212.4 512 342v42.3c-.1 7.5-1.5 12.8-19 16.5l-81.8 16.5c-23.9 5.1-38.9-2.7-38.9-12V221.2c0-1 0-2 .1-3V34.6c.1-7.5 1.5-12.8 19-16.5z"/>';function Pl(e=16){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 512 512"),t.setAttribute("width",String(e)),t.setAttribute("height",String(e)),t.setAttribute("aria-hidden","true"),t.innerHTML=Ll,t.classList.add("kaneo-mark"),t}function ca(e){return N("span",{className:"kaneo-wordmark"},Pl(16),N("span",{},e))}function Nl(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function Ml(e){return N("span",{className:"label-chip"},N("span",{className:"label-dot",style:`background:${e.color}`}),e.name)}function la(e,t=2){if(e.length===0)return null;let r=e.slice(0,t),n=N("span",{className:"label-chips"});for(let o of r)n.append(Ml(o));return e.length>r.length&&n.append(N("span",{className:"label-more"},`+${e.length-r.length}`)),n}function pa(e){return N("span",{className:"person"},N("span",{className:"person-avatar"},Nl(e)),N("span",{className:"person-name"},e))}var Ul={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function Dl(e){let t=Ul[e],r={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("width","16"),n.setAttribute("height","16"),n.setAttribute("aria-hidden","true"),n.innerHTML=r[e],n.classList.add("row-glyph"),n}function da(e){let{task:t,ticketId:r,column:n,selected:o,onActivate:i}=e,a=qi(t.dueDate),u=Ji(t.dueDate),p=ta(t.createdAt),g=N("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:i}),f=N("div",{className:"row-body"});f.append(N("div",{className:"row-title"},t.title));let T=N("div",{className:"row-meta"});T.append(N("span",{className:"task-key"},r)),t.assigneeName&&T.append(pa(t.assigneeName)),p&&T.append(N("span",{},p));let S=t.subtaskCounts;S&&S.total>0&&T.append(N("span",{className:"tabular"},`${S.completed}/${S.total}`)),t.priority!=="no-priority"&&T.append(N("span",{},qt(t.priority))),a&&T.append(N("span",{className:u?"overdue":""},a));let I=la(t.labels??[]);return I&&T.append(I),f.append(T),g.append(Dl(ra(n)),f),g.title=`${r} \xB7 ${n.name}`,g}var Jt=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function ua(e,t,r={}){if(!r.force){let T=await $l();if(T&&Date.now()-T.at<Gl)return T.context}let[n,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new Jt;let i=await Yt(),a=t?o.find(T=>T.slug===t):void 0,u=(i.workspaceId&&o.find(T=>T.id===i.workspaceId)?.id)??a?.id??o[0].id;u!==i.workspaceId&&await ji({workspaceId:u,projectId:null});let p=[],g=null;try{p=await e.listProjects(u)}catch(T){g=T instanceof Error?T:new Error(String(T))}let f={user:n,workspaces:o,workspaceId:u,projects:p,projectsError:g};return await Hl(f),f}var fa="bootstrap-cache",Gl=6e4;async function $l(){try{let e=await V.storage.get(fa);return e&&typeof e.at=="number"&&e.context?e:null}catch{return null}}async function Hl(e){let t=JSON.parse(JSON.stringify({at:Date.now(),context:e}));try{await V.storage.set(fa,t)}catch{}}function ha(e,t,r){if(e.length===0)return null;let n=e.find(a=>a.id===t);if(n)return n;let o=r?.toLowerCase();return(o?e.find(a=>a.slug.toLowerCase()===o):void 0)??e[0]}function ma(e){let t=e?.workspace?.trim(),r=e?.project?.trim(),n=e?.["openchamber-url"]?.trim();return{workspaceSlug:t||void 0,projectSlug:r||void 0,openchamberUrl:n||void 0}}var Ie=document.querySelector("#root");if(!Ie)throw new Error("Kaneo attach dialog is missing its #root element.");var Vr=ei(e=>V.request(e)),Zt=200,k={ready:null,connected:!1,context:null,project:null,boardTasks:[],columnNames:{},defaultStatus:"to-do",results:null,search:"",tab:"board",loading:!0,error:null,draft:{title:"",description:"",priority:"medium"},source:null},Xr=0,Co=0,ga=!1,Lo=!1;function Qt(e){return e instanceof pt?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function er(e){return Oo(k.project?.slug??"",e.number)}function Fl(e){let t=k.search.trim().toLowerCase();return t?e.title.toLowerCase().includes(t)||er(e).toLowerCase().includes(t):!0}async function Wr(){let e=++Xr;k.loading=!0,We();try{let{workspaceSlug:t,projectSlug:r}=ma(k.ready?.settings),n=await ua(Vr,t,{force:!0});if(e!==Xr)return;k.context=n;let o=await Yt();if(k.project=ha(n.projects,o.projectId,r),k.loading=!1,k.error=n.projectsError?Qt(n.projectsError):null,We(),k.project){let i=await Vr.getBoard(k.project.id);if(e!==Xr)return;k.boardTasks=i.board.columns.flatMap(a=>a.tasks),k.columnNames=Object.fromEntries(i.board.columns.map(a=>[a.id,a.name])),k.defaultStatus=i.board.columns[0]?.id??"to-do",k.results=null}We()}catch(t){if(e!==Xr)return;k.loading=!1,k.error=t instanceof Jt?t.message:`Could not reach Kaneo. ${Qt(t)}`,We()}}async function zl(){let e=++Co,t=k.context?.workspaceId,r=k.search.trim();if(!t||r.length<2){k.results=null,Ot();return}k.loading=!0,Ot();try{let n=await Vr.search(t,r,{...k.project?{projectId:k.project.id}:{},limit:40});if(e!==Co)return;let o=new Map(k.boardTasks.map(u=>[u.id,u])),i=n.results.filter(u=>u.type==="task");k.results=i.map(u=>o.get(u.id)).filter(u=>!!u);let a=i.length-k.results.length;k.loading=!1,k.error=a>0?`${a} match${a===1?" is":"es are"} outside the loaded board. Open the Kaneo web app to reach them.`:null,Ot()}catch(n){if(e!==Co)return;k.loading=!1,k.error=Qt(n),Ot()}}async function Ea(e){try{await sa({task:e,ticketId:er(e),workspaceId:k.context?.workspaceId??"",projectName:k.project?.name,columnName:k.columnNames[e.status]??Io(e.status)}),await V.toast({kind:"success",message:`${er(e)} attached to the chat.`}),await V.close()}catch(t){await V.toast({kind:"error",message:`Attach failed: ${Qt(t)}`,dismiss:!0})}}async function Bl(e){await ia({task:e,ticketId:er(e),workspaceId:k.context?.workspaceId??"",projectName:k.project?.name,columnName:k.columnNames[e.status]??Io(e.status)})&&await V.close()}async function jl(){if(!k.project)return;let e=k.draft.title.trim();if(e.length===0){k.error="A task needs a title.",We();return}try{let t=await Vr.createTask(k.project.id,{title:e.slice(0,Zt),description:k.draft.description,priority:k.draft.priority,status:k.defaultStatus});await V.toast({kind:"success",message:`Created ${Oo(k.project.slug,t.number)} in ${k.project.name}.`}),await Ea(t)}catch(t){k.error=Qt(t),We()}}var Ve=null,ht=null;function We(){if(Ie){if(zr(Ie),Ve=null,ht=null,!k.ready){Lr(Ie,{label:"Connecting to Kaneo"});return}if(!k.connected){Cr(Ie,{title:"Kaneo is not connected",body:"Add an API token in Settings \u2192 Integrations \u2192 Kaneo."});return}if(k.source){ka();return}Xl()}}function Xl(){Ie?.append(ca("Attach a Kaneo task"));let e=N("div");if(Ie?.append(e),no(e,{items:[{id:"board",label:k.project?.slug.toUpperCase()??"Board"},{id:"create",label:"New"}],activeId:k.tab,onChange:r=>{k.tab=r==="create"?"create":"board",We()}}),k.tab==="create"){ka();return}if(k.context&&k.context.projects.length>1){let r=N("div");Ie?.append(r),Ir(r,{label:"Project",searchable:!0,value:k.project?.id??"",options:k.context.projects.map(n=>({id:n.id,label:n.slug.toUpperCase()})),onChange:n=>{k.project=k.context?.projects.find(o=>o.id===n)??null,k.search="",k.results=null,k.loading=!0,Wr()}})}let t=N("div");Ie?.append(t),Qn(t,{value:k.search,label:"Search Kaneo",placeholder:"Search this workspace",onChange:r=>{if(k.search=r,r.trim().length>=2){zl();return}k.results=null,Ot()}}),Ve=N("div",{className:"dialog-body"}),Ie?.append(Ve),ht=N("div",{className:"dialog-foot"}),Ie?.append(ht),Ot()}function Ot(){if(!Ve||!ht)return;if(zr(Ve),zr(ht),k.error){let n=N("div");Ve.append(n),Pr(n,{tone:k.results?"warning":"error",title:"Kaneo",body:k.error,...k.results?{}:{action:{label:"Retry",onClick:()=>void Wr()}}})}let e=(k.results??k.boardTasks).filter(Fl);if(k.loading&&e.length===0){Lr(Ve,{label:"Loading tasks"});return}if(e.length===0){Cr(Ve,{title:k.search.trim()?"No task matches":"This project has no tasks",body:k.search.trim()?"Search runs inside the selected workspace.":"Use the New tab to create the first one."});return}let t=N("div",{className:"scroll"});Ve.append(t);for(let n of e)t.append(da({task:n,ticketId:er(n),column:{slug:n.status,isFinal:!1,name:k.columnNames[n.status]??n.status},selected:!1,onActivate:()=>void Ea(n)}));Me(ht,{label:"Cancel",variant:"ghost",onClick:()=>void V.close()});let r=e[0];r&&Me(ht,{label:"Attach and start session",variant:"secondary",onClick:()=>void Bl(r)})}function ka(){let e=N("div",{className:"dialog-body"});if(Ie?.append(e),k.error){let i=N("div");e.append(i),Pr(i,{tone:"error",title:"Kaneo",body:k.error})}let t=N("div");e.append(t),Or(t,{label:"Title",value:k.draft.title,placeholder:"What needs doing?",error:k.draft.title.length>Zt?`Keep it under ${Zt} characters.`:void 0,onChange:i=>{k.draft.title=i}});let r=N("div");e.append(r),Ir(r,{label:"Priority",value:k.draft.priority,options:Zs.map(i=>({id:i,label:qt(i)})),onChange:i=>{k.draft.priority=i}});let n=N("div");e.append(n),Or(n,{label:"Description",value:k.draft.description,multiline:!0,rows:5,placeholder:"Markdown is supported.",onChange:i=>{k.draft.description=i}});let o=N("div",{className:"dialog-foot"});Ie?.append(o),Me(o,{label:"Cancel",variant:"ghost",onClick:()=>void V.close()}),Me(o,{label:"Create and attach",onClick:()=>void jl()})}function Vl(e){let r=(e.kind==="message"?e.text:e.sessionTitle).split(`
`).filter(a=>a.trim().length>0),n=(Zi(r[0]??"",Zt)||"Untitled task").slice(0,Zt),o=r.slice(1).join(`
`).trim(),i=e.kind==="session"?`Session: ${e.sessionTitle}`:"From a chat message";return{title:n,description:[i,o].filter(Boolean).join(`

`),priority:"medium"}}V.onReady(e=>{Vn(e,document.documentElement),aa(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,k.ready=e,k.connected=e.connection.connected,ga||(ga=!0,yn(e.item)||An(e.item)?(k.source=e.item,k.draft=Vl(e.item),k.tab="create"):k.tab="board"),We(),k.connected&&!Lo&&(Lo=!0,Wr())});V.onConnection(e=>{let t=k.connected;k.connected=e.connected,t!==e.connected&&(We(),e.connected&&(Lo=!0,Wr()))});V.onItem(e=>{if(!e||!("providerId"in e))return;let t=e.data;V.toast({kind:"info",message:t?.ticketId?`${t.ticketId} is already attached to this chat.`:"That item is already attached to this chat."})});})();
