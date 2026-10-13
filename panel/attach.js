"use strict";(()=>{var N="openchamber.sdk";var mr="data-oc-scrolling",fn=`
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
:hover, [${mr}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${mr}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${mr}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${mr}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function hn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",o=>{let n=o.target===e?t:o.target;if(!(n instanceof Element))return;n.hasAttribute("data-oc-scrolling")||n.setAttribute("data-oc-scrolling","");let i=r.get(n);i!==void 0&&clearTimeout(i),r.set(n,setTimeout(()=>{r.delete(n),n.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Oa=`(${hn.toString()})(document);`;var is=/^[a-z][a-z0-9-]{0,39}$/;var ns=e=>Object(e)===e&&!Array.isArray(e),mn=(e,t)=>Object.keys(e).every(r=>t.includes(r)),os=e=>String(e)===e&&e.length>=1&&e.length<=60,ss=e=>String(e)===e&&e.length>=1&&e.length<=80,as=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!ns(r)||!is.test(r.id)||!os(r.label)||r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1||t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!mn(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!mn(r,["kind","id","label","value","options","disabled"])||!ss(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let o=new Set;for(let n of r.options){if(!ns(n)||!mn(n,["value","label"])||!ss(n.value)||!os(n.label)||o.has(n.value))return!1;o.add(n.value)}if(!o.has(r.value))return!1}return!0};var gn=e=>"bytes"in e?e.bytes.byteLength:e.content.length,cs=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var ls=/^[A-Za-z0-9_-]{1,80}$/;var ps=["left","right","top","bottom"];var ds=(e,t=0,r={remaining:16e3})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let n of o)if(!ds(n,t+1,r))return!1;return!0},En=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(En);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(En)}return String(e)===e||Number.isFinite(e)},Tn=e=>{try{return String(e.id)!==e.id||!ls.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ps.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!ds(e.data)||!En(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var fs=["file","directory","other","missing"],xn=e=>!!(e&&"sessionId"in e),bn=e=>!!(e&&"sent"in e&&!("sessionId"in e));var _n=e=>e!==null&&e.kind==="message",Sn=e=>e!==null&&e.kind==="session";var hs=/^[0-9a-f]{7,64}$/i,yn=e=>hs.test(e),gr=500,Er=32e3,ms=16e3,gs=128,Es=200,Ts=2e3,ks=16e3,xs=80,bs=200,_s=16e3;var Ss=2e3;var An=2e4,Tr=1024,kr=2e6;var xr=64e3,br=8e3,wn=4e3;var Rn=9e4;var ys=999,As=1e4,Gt=500,ws=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Rs=["stopped","starting","ready","failed"],Ia=new Set(ws),vs=e=>Ia.has(e),Os=e=>e&&vs(e)?e:"HOST_REJECTED",yt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(yt):Object(e)===e?Object.values(e).every(yt):!1,Is=e=>yt(e)&&JSON.stringify(e).length<=_s,us=e=>e?.trim().slice(0,bs)??"",At=e=>{let t=e.id.trim().slice(0,gs),r=e.title.trim().slice(0,Es),o=e.url.trim().slice(0,Ts),n=e.text?.trim().slice(0,ks),i=e.author?.trim().slice(0,xs),a=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:t,title:r||t,url:o,kind:a};if(n&&(u.text=n),i&&(u.author=i),a==="pull"){let p=us(e.branches?.head),g=us(e.branches?.base);p&&g&&(u.branches={head:p,base:g})}return Is(e.data)&&(u.data=e.data),u},vn=e=>{let t=At(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},On=e=>{let t={text:e.text.trim().slice(0,ms)};return e.send&&(t.send=!0),t},In=e=>e===null||!Number.isFinite(e)?null:Math.min(ys,Math.max(0,Math.round(e))),Cn=e=>Number.isFinite(e)?Math.min(As,Math.max(0,Math.ceil(e))):0;var wt=e=>e.length>0&&e.length<=Tr&&!e.includes("\0")&&!e.includes("\\");var _r=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Ss?!1:!e.split("/").some(r=>r==="."||r===".."),Ca=new Set(Rs),Ln=e=>!!(e&&"status"in e&&Ca.has(String(e.status))&&!("body"in e)),Sr=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Pn=e=>!!(e&&"content"in e&&String(e.content)===e.content),Nn=e=>!!(e&&"written"in e&&e.written===!0),Mn=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),La=new Set(fs),Un=e=>!!(e&&"kind"in e&&"size"in e&&La.has(String(e.kind))&&Number.isFinite(e.size)),Dn=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Pa=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),Na=e=>Object(e)===e?e:null,kn=e=>String(e)===e&&e.length>0,Ma=e=>{if(!kn(e.id))return null;if(e.ok===!0){let t={channel:N,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&kn(e.error)?{channel:N,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Os(kn(e.code)?e.code:void 0)}:null},Gn=e=>{let t=Na(e);return!t||t.channel!==N||t.v!==1?null:t.type==="result"?Ma(t):!Pa.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Cs=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Ua=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",w=class extends Error{code;constructor(t,r){super(r),this.name="HostRequestError",this.code=t}},Ls=()=>Promise.reject(new w("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),yr=()=>Promise.reject(new w("BAD_PATH",`File path must be 1 to ${Tr} characters without NUL or backslash.`)),Ar=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new w("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},C=e=>(e.value+=1,`oc-${e.value}`),Bn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new w("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??(c=>c===t.parent),o=e.requestTimeoutMs??An,n=new Set,i=new Set,a=new Set,u=new Set,p=new Set,g=new Set,f=new Set,k=new Set,S=new Set,I=null,L=null,Q=new Set,ke=new Set,se=null,xe=null,me=!1,ie=new Map,de=new Map,ue=new Map,$=!1,A={value:0},y=null,be=null,q=!1,v=!1,ne=null,It=c=>c?{sessionId:c.id,phase:c.busy?"started":"completed"}:null,fe=c=>{t.parent.postMessage(c,"*")},ee=(c,d)=>{for(let b of c)try{b(d)}catch(x){console.error(x)}},ze=c=>{if(!(c instanceof MessageEvent)||!r(c.source))return;let d=Gn(c.data);if(!d)return;if(d.type==="workspace"){let x=de.get(d.payload.subscriptionId);x&&ee([x],d.payload.snapshot);return}if(d.type==="shells"){let x=ue.get(d.payload.subscriptionId);x&&ee([x],d.payload.snapshot);return}if(d.type==="ready"){y=d.payload,be=It(d.payload.session),ee(n,d.payload),ee(i,d.payload.directory),ee(a,d.payload.session),be&&ee(u,be),ee(p,d.payload.connection),ee(g,d.payload.settings),ee(f,d.payload.item);return}if(d.type==="directory"){y&&(y={...y,directory:d.payload.directory}),ee(i,d.payload.directory);return}if(d.type==="session"){y&&(y={...y,session:d.payload.session}),d.payload.session?be?.sessionId!==d.payload.session.id&&(be=It(d.payload.session)):be=null,ee(a,d.payload.session);return}if(d.type==="session-lifecycle"){be=d.payload,ee(u,d.payload);return}if(d.type==="connection"){y&&(y={...y,connection:d.payload.connection}),ee(p,d.payload.connection);return}if(d.type==="settings"){y&&(y={...y,settings:d.payload.settings}),ee(g,d.payload.settings);return}if(d.type==="item"){y&&(y={...y,item:d.payload.item}),ee(f,d.payload.item);return}if(d.type==="status-control-event"){ee(k,d.payload);return}if(d.type==="popover-closed"){ee(S,d.payload);return}if(d.type==="action"){let x=j=>{$||fe({channel:N,v:1,type:"action-result",id:d.id,payload:j})},F=L;if(!F){x({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>F(d.payload)).then(()=>x({ok:!0}),j=>{let z=(j instanceof Error?j.message:String(j)).trim();x({ok:!1,error:(z||"Action failed.").slice(0,Gt)})});return}if(d.type==="file-open"){let x=d.payload;if(xe&&cs(xe,x))return;xe=x,ee(Q,d.payload);return}if(d.type==="file-saved"){ee(ke,d.payload.version);return}if(d.type==="file-snapshot"){let x=z=>{$||fe({channel:N,v:1,type:"file-snapshot-result",id:d.id,payload:z})},F=z=>x({error:(z.trim()||"Could not read the edited file.").slice(0,Gt)}),j=se;if(!j){F("This extension does not edit files.");return}Promise.resolve().then(()=>j(d.payload.purpose)).then(z=>{if(gn(z)>2e7){F(`The file is over ${2e7} ${"bytes"in z?"bytes":"characters"}.`);return}if(z.version.length>256){F(`The snapshot version is over ${256} characters.`);return}x({snapshot:"bytes"in z?{bytes:z.bytes,version:z.version}:{content:z.content,version:z.version}})},z=>F(z instanceof Error?z.message:String(z)));return}if(d.type==="resolve"){let x=j=>{fe({channel:N,v:1,type:"resolve-result",id:d.id,payload:j})},F=I;if(!F){x({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>F(d.payload)).then(j=>x({item:j?At(j):null}),j=>{let z=(j instanceof Error?j.message:String(j)).trim();x({error:(z||"Command failed.").slice(0,Gt)})});return}let b=ie.get(d.id);if(b){if(clearTimeout(b.timer),ie.delete(d.id),d.ok){b.resolve(d.payload);return}b.reject(new w(d.code,d.error))}};t.addEventListener("message",ze),fe({channel:N,v:1,type:"hello"});let ge=(c,d=o)=>$||t.parent===t?Promise.reject(new w("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((b,x)=>{let F=setTimeout(()=>{ie.delete(c.id),x(new w("HOST_TIMEOUT","Host did not answer in time."))},d);ie.set(c.id,{resolve:b,reject:x,timer:F}),fe(c)}),te=c=>ge(c).then(()=>{}),V={channel:N,v:1},tt=c=>{!$&&t.parent!==t&&fe(c)},Ct=()=>tt({...V,type:"file-save"}),er=c=>{!Cs(c)||!Ua(c)||(c.preventDefault(),Ct())},tr=c=>{!Cs(c)||c.key!=="Escape"||y?.surface!=="popover"||!y.popover||(c.preventDefault(),Nt(y.popover.id,"escape").catch(()=>{}))},mt=()=>{let c=y?.surface==="popover"?y.popover:void 0;if(!c)return;let d=q||v;ne!==d&&(ne=d,X(c.id,d).catch(()=>{}))},H=()=>{y?.surface!=="popover"||q||(q=!0,mt())},rr=c=>{y?.surface!=="popover"||c.relatedTarget!==null||!q||(q=!1,mt())},nr=()=>{y?.surface!=="popover"||v||(v=!0,mt())},or=()=>{y?.surface!=="popover"||!v||(v=!1,mt())},Re=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new w("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},Lt=async c=>{c.kind!=="projects"&&Re(c.projectId);let d=await ge({...V,type:"workspace-read",id:C(A),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new w("HOST_REJECTED","Host did not return workspace data.");return d},Pt=async(c,d)=>{c.kind!=="projects"&&Re(c.projectId);let b=C(A);de.set(b,d);try{await te({...V,type:"workspace-subscribe",id:C(A),payload:{subscriptionId:b,query:c}})}catch(x){throw de.delete(b),$||fe({...V,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:b}}),x}return()=>{!de.delete(b)||$||fe({...V,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:b}})}},sr=async(c,d)=>{c.kind==="session"&&Re(c.sessionId),c.kind==="project"&&Re(c.projectId);let b=C(A);ue.set(b,d);try{await te({...V,type:"shells-subscribe",id:C(A),payload:{subscriptionId:b,scope:c}})}catch(x){throw ue.delete(b),$||fe({...V,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:b}}),x}return()=>{!ue.delete(b)||$||fe({...V,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:b}})}},gt=async c=>{if("key"in c&&(c.key.length===0||c.key.length>128))throw new w("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!yt(c.value))throw new w("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>65536)throw new w("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&y?.features?.deviceStorage!==!0)throw new w("UNSUPPORTED","This host does not support device storage.");let d=await ge({...V,type:"storage",id:C(A),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new w("HOST_REJECTED","Host did not return storage data.");return d},Nt=(c,d)=>y?.features?.popovers!==!0&&!(y?.surface==="popover"&&y.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):te({...V,type:"popover-close",id:C(A),payload:d?{id:c,reason:d}:{id:c}}),X=(c,d)=>y?.features?.popovers!==!0&&!(y?.surface==="popover"&&y.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):te({...V,type:"popover-anchor",id:C(A),payload:{id:c,active:d}});return t.addEventListener("keydown",tr,!0),t.addEventListener("pointerover",H),t.addEventListener("pointermove",H),t.addEventListener("pointerout",rr),t.addEventListener("focus",nr),t.addEventListener("blur",or),{onAction:c=>(L=c,()=>{L===c&&(L=null)}),listProjects:async()=>{let c=await Lt({kind:"projects"});if(c.kind!=="projects")throw new w("HOST_REJECTED","Expected projects.");return c},listWorktrees:async c=>{let d=await Lt({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new w("HOST_REJECTED","Expected worktrees.");return d},listSessions:async c=>{let d=await Lt({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new w("HOST_REJECTED","Expected sessions.");return d},onProjects:c=>Pt({kind:"projects"},d=>{d.kind==="projects"&&c(d)}),onWorktrees:(c,d)=>Pt({kind:"worktrees",projectId:c},b=>{b.kind==="worktrees"&&d(b)}),onSessions:(c,d)=>Pt({kind:"sessions",projectId:c},b=>{b.kind==="sessions"&&d(b)}),onRunningShells:(c,d)=>sr(c,d),readShellOutput:async(c,d)=>{Re(c,128);let b=d?.cursor;if(b!==void 0&&(!Number.isInteger(b)||b<0))throw new w("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let x=d?.tailBytes;if(x!==void 0&&(!Number.isInteger(x)||x<1||x>65536))throw new w("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let j=await ge({...V,type:"shell-output",id:C(A),payload:{shellId:c,cursor:b,tailBytes:x}});if(!j||typeof j.output!="string"||!Number.isFinite(j.cursor))throw new w("HOST_REJECTED","Host did not return shell output.");return j},stopShell:async c=>{if(Re(c,128),(await ge({...V,type:"shell-stop",id:C(A),payload:{shellId:c}}))?.stopped!==!0)throw new w("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async c=>{Re(c),await te({...V,type:"open-session",id:C(A),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let b=Ar(d),x={op:"get",key:c};b&&(x.scope=b);let F=await gt(x);return F.op==="get"&&F.found?F.value:void 0},set:async(c,d,b)=>{let x=Ar(b),F={op:"set",key:c,value:d};x&&(F.scope=x),await gt(F)},delete:async(c,d)=>{let b=Ar(d),x={op:"delete",key:c};b&&(x.scope=b),await gt(x)},keys:async c=>{let d=Ar(c),b={op:"keys"};d&&(b.scope=d);let x=await gt(b);if(x.op!=="keys")throw new w("HOST_REJECTED","Expected storage keys.");return x.keys}},onReady:c=>(n.add(c),y&&c(y),()=>{n.delete(c)}),onDirectory:c=>(i.add(c),y&&c(y.directory),()=>{i.delete(c)}),onSession:c=>(a.add(c),y&&c(y.session),()=>{a.delete(c)}),onSessionLifecycle:c=>(u.add(c),be&&c(be),()=>{u.delete(c)}),onConnection:c=>(p.add(c),y&&c(y.connection),()=>{p.delete(c)}),onSettings:c=>(g.add(c),y&&c(y.settings),()=>{g.delete(c)}),onItem:c=>(f.add(c),y&&c(y.item),()=>{f.delete(c)}),onStatusControl:c=>(k.add(c),()=>{k.delete(c)}),onPopoverClosed:c=>(S.add(c),()=>{S.delete(c)}),setStatusControls:c=>y?.features?.statusControls!==!0?Promise.reject(new w("UNSUPPORTED","This host does not support status controls.")):as(c)?te({...V,type:"status-controls",id:C(A),payload:{controls:c}}):Promise.reject(new w("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:c=>y?.features?.popovers!==!0?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):Tn(c)?te({...V,type:"popover-open",id:C(A),payload:c}):Promise.reject(new w("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Nt,setPopoverAnchorActive:X,onResolve:c=>(I=c,()=>{I===c&&(I=null)}),toast:c=>{let d=c.message.trim();return!d||d.length>gr?Promise.reject(new w("HOST_REJECTED",`Toast message must contain 1 to ${gr} characters.`)):c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>Er)?Promise.reject(new w("HOST_REJECTED",`Toast copy text must contain 1 to ${Er} characters.`)):te({channel:N,v:1,type:"toast",id:C(A),payload:{...c,message:d}})},openUrl:c=>te({channel:N,v:1,type:"open-url",id:C(A),payload:{url:c}}),openCommit:c=>yn(c)?te({channel:N,v:1,type:"open-commit",id:C(A),payload:{sha:c}}):Promise.reject(new w("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:c=>te({channel:N,v:1,type:"open-surface",id:C(A),payload:{surfaceId:c}}),writeClipboard:c=>te({channel:N,v:1,type:"clipboard-write",id:C(A),payload:{text:c}}),compose:c=>te({channel:N,v:1,type:"compose",id:C(A),payload:c}),attach:c=>te({channel:N,v:1,type:"attach",id:C(A),payload:At(c)}),startSession:async c=>{c.projectId!==void 0&&Re(c.projectId);let d=c.worktree;d&&d!==!0&&(d.kind==="existing"?Re(d.directory):(d.name!==void 0&&Re(d.name,200),d.baseBranch!==void 0&&Re(d.baseBranch,200)));let b=await ge({channel:N,v:1,type:"start-session",id:C(A),payload:vn(c)},e.requestTimeoutMs??18e4);if(!xn(b))throw new w("HOST_REJECTED","Host did not return a session.");return b},prompt:c=>ge({channel:N,v:1,type:"prompt",id:C(A),payload:On(c)}).then(d=>{if(!bn(d))throw new w("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:c=>te({channel:N,v:1,type:"session-link",id:C(A),payload:At(c)}),close:()=>te({channel:N,v:1,type:"close",id:C(A)}),oauthStart:()=>te({channel:N,v:1,type:"oauth-start",id:C(A)}),oauthDisconnect:()=>te({channel:N,v:1,type:"oauth-disconnect",id:C(A)}),request:c=>(_r(c.path)?ge({channel:N,v:1,type:"request",id:C(A),payload:c}):Ls()).then(d=>{if(!Sr(d))throw new w("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:c=>(_r(c.path)?ge({channel:N,v:1,type:"service-request",id:C(A),payload:c}):Ls()).then(d=>{if(!Sr(d))throw new w("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>ge({channel:N,v:1,type:"service-status",id:C(A)}).then(c=>{if(!Ln(c))throw new w("HOST_REJECTED","Host did not return service status.");return c}),readFile:c=>(wt(c)?ge({channel:N,v:1,type:"file-read",id:C(A),payload:{path:c}}):yr()).then(d=>{if(!Pn(d))throw new w("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>wt(c)?d.length>kr?Promise.reject(new w("FILE_TOO_LARGE",`Content is over ${kr} characters.`)):ge({channel:N,v:1,type:"file-write",id:C(A),payload:{path:c,content:d}}).then(b=>{if(!Nn(b))throw new w("HOST_REJECTED","Host did not confirm the write.");return b}):yr(),listDir:c=>(wt(c)?ge({channel:N,v:1,type:"file-list",id:C(A),payload:{path:c}}):yr()).then(d=>{if(!Mn(d))throw new w("HOST_REJECTED","Host did not return directory entries.");return d}),stat:c=>(wt(c)?ge({channel:N,v:1,type:"file-stat",id:C(A),payload:{path:c}}):yr()).then(d=>{if(!Un(d))throw new w("HOST_REJECTED","Host did not return file status.");return d}),generate:c=>{let d=c.prompt.trim(),b=c.system?.trim();if(d.length===0||d.length>xr)return Promise.reject(new w("HOST_REJECTED",`Prompt must be 1 to ${xr} characters.`));if(b!==void 0&&(b.length===0||b.length>br))return Promise.reject(new w("HOST_REJECTED",`System prompt must be 1 to ${br} characters.`));let x=c.maxOutputTokens===void 0?void 0:Math.min(wn,Math.max(1,Math.floor(c.maxOutputTokens)));if(x!==void 0&&!Number.isFinite(x))return Promise.reject(new w("HOST_REJECTED","maxOutputTokens must be a number."));let F={prompt:d};return b!==void 0&&(F.system=b),x!==void 0&&(F.maxOutputTokens=x),ge({channel:N,v:1,type:"generate",id:C(A),payload:F},e.requestTimeoutMs??Rn).then(j=>{if(!Dn(j))throw new w("HOST_REJECTED","Host did not return generated text.");return j})},setBadge:c=>te({channel:N,v:1,type:"badge",id:C(A),payload:{count:In(c)}}),setHeight:c=>te({channel:N,v:1,type:"resize",id:C(A),payload:{height:Cn(c)}}),onFileOpen:c=>(Q.add(c),me||(me=!0,t.addEventListener("keydown",er,!0)),xe&&c(xe),()=>{Q.delete(c)}),onFileSnapshot:c=>(se=c,()=>{se===c&&(se=null)}),onFileSaved:c=>(ke.add(c),()=>{ke.delete(c)}),reportFileChange:c=>tt({...V,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:Ct,reportFileUnsupported:()=>tt({...V,type:"file-unsupported"}),dispose:()=>{for(let c of de.keys())fe({...V,type:"workspace-unsubscribe",id:C(A),payload:{subscriptionId:c}});de.clear();for(let c of ue.keys())fe({...V,type:"shells-unsubscribe",id:C(A),payload:{subscriptionId:c}});ue.clear(),$=!0,I=null,L=null,se=null,Q.clear(),ke.clear(),me&&t.removeEventListener("keydown",er,!0),t.removeEventListener("message",ze),t.removeEventListener("keydown",tr,!0),t.removeEventListener("pointerover",H),t.removeEventListener("pointermove",H),t.removeEventListener("pointerout",rr),t.removeEventListener("focus",nr),t.removeEventListener("blur",or);for(let c of ie.values())clearTimeout(c.timer),c.reject(new w("HOST_UNAVAILABLE","Host client was disposed."));ie.clear(),n.clear(),i.clear(),a.clear(),u.clear(),p.clear(),g.clear(),f.clear(),k.clear(),S.clear()}}};var Ms=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var tp=new Set(Ms);var Us=["none","agent","user"];var np=new Set(Us);var Da=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ga=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Ds=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,o]of Da)t.style.setProperty(r,e.tokens[o]);for(let[r,o,n]of Ga){let i=e.tokens[n]??"";t.style.setProperty(r,i),t.style.setProperty(o,i)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},jn=(e,t)=>{Ds(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var $a={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(e,t)=>`var(--${e}, var(--oc-${$a[e]}, ${t}))`,it=W("surface-background","transparent"),wr=W("surface-elevated","transparent"),$t=W("surface-elevated-foreground","inherit"),qe=W("surface-foreground","inherit"),re=W("surface-muted-foreground","gray"),Ha=W("surface-muted","transparent"),Ce=W("interactive-border","currentColor"),ve=W("interactive-hover","transparent"),at=W("interactive-active","transparent"),Xn=W("interactive-selection","transparent"),Vn=W("interactive-selection-foreground","inherit"),Hs=W("interactive-focus-ring","currentColor"),je=W("primary","currentColor"),Wn=W("primary-text","inherit"),Kn=W("error-text","inherit"),Fa=W("font-sans","inherit"),Yn=W("font-mono","monospace"),Fs=W("radius","9px"),qn=`calc(${Fs} - 2px)`,Gs=`calc(${Fs} - 4px)`,pe=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,$s=`box-shadow: 0 0 0 2px ${Hs};`,Rr=e=>{let t=W(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${W(`${e}-text`,"inherit")}; }`},za=`
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
`,zs=`
.oc-sdk { color: ${qe}; font-family: ${Fa}; }
.oc-sdk :focus-visible { outline: none; ${$s} }
.oc-sdk-mono { font-family: ${Yn}; }
.oc-sdk-muted { color: ${re}; }
${Rr("success")}${Rr("warning")}${Rr("error")}${Rr("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${je}; --oc-sdk-tone-text: ${Wn}; }

.oc-sdk-btn { border-radius: ${qn}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Gs}; }
.oc-sdk-btn[data-variant="default"] { color: ${Wn}; background: ${pe(je,10,it)}; border-color: ${pe(je,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${pe(je,16,it)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${pe(je,22,it)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ha}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${at}, ${at}); }
.oc-sdk-btn[data-variant="outline"] { background: ${wr}; color: ${$t}; border-color: ${Ce}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${at}, ${at}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ve}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${at}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${Kn}; background: ${pe("var(--oc-sdk-tone)",7,it)}; border-color: ${pe("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${pe("var(--oc-sdk-tone)",9,it)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${pe("var(--oc-sdk-tone)",11,it)}; }

.oc-sdk-field-note { color: ${re}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Kn}; }
.oc-sdk-input { border-radius: ${qn}; background: ${wr}; color: ${$t}; box-shadow: inset 0 0 0 1px ${pe(Ce,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${re}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Hs}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${W("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${W("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Yn}; }

.oc-sdk-search-icon { color: ${re}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${je}; }
.oc-sdk-search-clear { border-radius: ${Gs}; color: ${re}; }
.oc-sdk-search-clear:hover { background: ${ve}; color: ${qe}; }

.oc-sdk-trigger { border-color: ${Ce}; border-radius: ${qn}; background: ${wr}; color: ${$t}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${at}, ${at}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${re}; }
.oc-sdk-trigger-chevron { color: ${re}; }
.oc-sdk-popup { --surface-foreground: ${$t}; border-color: ${pe(Ce,60)}; border-radius: 12px; background: ${wr}; color: ${$t}; box-shadow: 0 8px 24px ${pe(qe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ve}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Xn}; color: ${Vn}; }
.oc-sdk-option-check { color: ${qe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Kn}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${pe(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${re}; }
.oc-sdk-popup-empty { color: ${re}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ce}; border-radius: 4px; color: ${qe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${pe(qe,60,Ce)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ce}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${it}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${je}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${$s} }
.oc-sdk-check-desc { color: ${re}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${pe(qe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${re}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${qe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Vn}; background: ${Xn}; border-color: ${Ce}; }
.oc-sdk-tab-count { color: ${re}; }

.oc-sdk-badge { border-radius: 9999px; background: ${ve}; color: ${re}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${pe("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ve}; }
.oc-sdk-row[aria-selected="true"] { background: ${Xn}; color: ${Vn}; }
.oc-sdk-row-lead { font-family: ${Yn}; color: ${re}; }
.oc-sdk-row-sub { color: ${re}; }
.oc-sdk-row-meta { color: ${re}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${re}; }

.oc-sdk-empty-body { color: ${re}; }

.oc-sdk-spinner { color: ${re}; }
.oc-sdk-spinner-ring { border-color: ${Ce}; border-top-color: ${je}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${pe("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${pe("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${re}; }

.oc-sdk-separator { color: ${re}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${pe(Ce,40)}; }

.oc-sdk-progress-label { color: ${re}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ce}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${je}); }

.oc-sdk-text a { color: ${Wn}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${pe(Ce,60)}; }
`,J=`
${fn}
${za}
${zs}`;var Bs="oc-sdk-ui-style",ct=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},Z=e=>{let t=document.getElementById(Bs);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}hn(document);let r=document.createElement("style");r.id=Bs,r.textContent=e,document.head.appendChild(r)},R=(e,t)=>{let r=document.createElement(e);return t&&(r.className=t),r},Le=e=>{let t=R("button",e);return t.type="button",t},ae=(e,t)=>{let r=t??"";e.textContent!==r&&(e.textContent=r)},Je=(e,t,r)=>{r==null||r===""?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)},js=(e,t)=>{let r=o=>{o.target instanceof Node&&e.contains(o.target)||t()};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0)}};var Ba=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Me=(e,t)=>{Z(J);let r=t,o=Le("oc-sdk oc-sdk-btn"),n=Ba(),i=document.createElement("span");o.append(i),e.append(o);let a=()=>{o.dataset.variant=r.variant??"default",o.dataset.size=r.size??"default",o.disabled=!!r.disabled||!!r.loading,o.dataset.loading=r.loading?"true":"false",o.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&n.parentNode!==o?o.prepend(n):!r.loading&&n.parentNode===o&&n.remove(),ae(i,r.label)},u=()=>{r.disabled||r.loading||r.onClick()};return o.addEventListener("click",u),a(),{update:p=>{r={...r,...p},a()},dispose:()=>{o.removeEventListener("click",u),o.remove()}}};var vr=(e,t)=>{Z(J);let r=t,o=R("label","oc-sdk oc-sdk-field"),n=R("span","oc-sdk-field-label"),i=r.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),a=R("span","oc-sdk-field-note");o.append(n,i,a),e.append(o);let u=()=>{ae(n,r.label),n.hidden=!r.label,i instanceof HTMLInputElement?i.type=r.password?"password":"text":i.rows=r.rows??3,i.value!==r.value&&(i.value=r.value),i.disabled=!!r.disabled,Je(i,"placeholder",r.placeholder),i.dataset.mono=r.mono?"true":"false";let g=!!r.error;o.dataset.invalid=g?"true":"false",i.setAttribute("aria-invalid",g?"true":"false");let f=r.error??r.helper??"";ae(a,f),a.hidden=f===""},p=()=>{r.onChange(i.value)};return i.addEventListener("input",p),u(),{update:g=>{r={...r,...g},u()},dispose:()=>{i.removeEventListener("input",p),o.remove()}}};var Xs="http://www.w3.org/2000/svg",ja={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ze=(e,t,r)=>{let o=document.createElementNS(Xs,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),r&&o.setAttribute("class",r);let n=document.createElementNS(Xs,"path");return n.setAttribute("d",ja[e]),o.append(n),o};var Jn=(e,t)=>{Z(J);let r=t,o=R("div","oc-sdk oc-sdk-search"),n=R("input","oc-sdk-input");n.type="text",n.spellcheck=!1,n.autocomplete="off",n.setAttribute("role","searchbox");let i=Le("oc-sdk-search-clear");i.append(Ze("close",14)),i.tabIndex=-1,o.append(Ze("search",16,"oc-sdk-search-icon"),n,i),e.append(o);let a=()=>{let f=r.placeholder??"Search";Je(n,"placeholder",f),n.setAttribute("aria-label",r.label??f),i.setAttribute("aria-label","Clear search"),n.value!==r.value&&(n.value=r.value),o.dataset.active=r.value.trim()===""?"false":"true"},u=()=>{r.value!==""&&r.onChange(""),n.focus()},p=()=>{r.onChange(n.value)},g=f=>{f.key==="Escape"&&n.value!==""&&(f.preventDefault(),u())};return n.addEventListener("input",p),n.addEventListener("keydown",g),i.addEventListener("click",u),a(),r.autofocus&&n.focus(),{update:f=>{r={...r,...f},a()},dispose:()=>{n.removeEventListener("input",p),n.removeEventListener("keydown",g),i.removeEventListener("click",u),o.remove()}}};var Qe=(e,t="vertical")=>{let[r,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===r||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},lt=(e,t,r)=>{let o=e.filter(p=>!p.disabled);if(o.length===0)return null;let n=o[0],i=o[o.length-1];if(r==="first"||!n||!i)return n?.id??null;if(r==="last")return i.id;let a=o.findIndex(p=>p.id===t);return a===-1?r==="next"?n.id:i.id:o[Math.min(o.length-1,Math.max(0,a+(r==="next"?1:-1)))]?.id??null};var Vs=(e,t)=>`${e}-${t??""}`,Zn=(e,t,r,o)=>{let n=Le("oc-sdk-option");n.id=Vs(e,r.id),n.setAttribute("role",t),n.tabIndex=-1,n.disabled=!!r.disabled,t==="option"&&n.setAttribute("aria-selected",r.selected?"true":"false"),n.dataset.destructive=r.destructive?"true":"false";let i=R("span","oc-sdk-option-label");if(i.textContent=r.label,n.append(i),r.hint){let a=R("span","oc-sdk-option-hint");a.textContent=r.hint,n.append(a)}if(t==="option"){n.dataset.mark="check";let a=R("span","oc-sdk-option-check");a.append(Ze("check",14)),n.append(a)}return n.addEventListener("pointerenter",o.hover),n.addEventListener("click",o.pick),n},Qn=(e,t,r,o)=>{let n=Vs(r,o);for(let i of Array.from(e.children))i instanceof HTMLElement&&i.classList.contains("oc-sdk-option")&&(i.dataset.active=i.id===n?"true":"false");Je(t,"aria-activedescendant",o?n:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Xa=(e,t)=>{let r=t.getBoundingClientRect();e.style.minWidth=`${Math.round(r.width)}px`,e.style.left=`${Math.round(r.left)}px`,e.style.top=`${Math.round(r.bottom+4)}px`;let o=e.offsetHeight,n=window.innerHeight-r.bottom-8;o>n&&r.top-8>n&&(e.style.top=`${Math.max(8,Math.round(r.top-4-o))}px`);let i=r.left+e.offsetWidth-window.innerWidth+8;i>0&&(e.style.left=`${Math.max(8,Math.round(r.left-i))}px`)},eo=(e,t,r,o)=>{e.append(r),Xa(r,t);let n=js(e,o),i=()=>{o()},a=u=>{u.target instanceof Node&&r.contains(u.target)||o()};return window.addEventListener("resize",i),window.addEventListener("scroll",a,!0),()=>{n(),window.removeEventListener("resize",i),window.removeEventListener("scroll",a,!0),r.remove()}};var Ws=(e,t)=>{let r=t.trim().toLowerCase();return r?e.filter(o=>o.label.toLowerCase().includes(r)||o.id.toLowerCase().includes(r)):[...e]},Va=0,Or=(e,t)=>{Z(J);let r=t,o=`oc-sdk-select-${Va+=1}`,n=R("div","oc-sdk oc-sdk-select"),i=R("span","oc-sdk-field-label");i.id=`${o}-label`;let a=Le("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",i.id);let u=R("span","oc-sdk-trigger-value");a.append(u,Ze("chevron",14,"oc-sdk-trigger-chevron")),n.append(i,a),e.append(n);let p="",g=null,f=null,k=R("div","oc-sdk oc-sdk-popup"),S=R("div","oc-sdk-popup-search"),I=R("input","oc-sdk-input");I.type="text",I.autocomplete="off",S.append(I);let L=R("div");L.setAttribute("role","listbox"),L.tabIndex=-1,k.append(L);let Q=()=>Ws(r.options,r.searchable?p:""),ke=()=>r.searchable?I:L,se=v=>{g=v,Qn(L,ke(),o,v)},xe=()=>{ct(L);let v=Q();if(v.length===0){let ne=R("div","oc-sdk-popup-empty");ne.textContent="No matches",L.append(ne)}for(let ne of v)L.append(Zn(o,"option",{...ne,selected:ne.id===r.value},{hover:()=>se(ne.id),pick:()=>de(ne.id)}));se(v.some(ne=>ne.id===g)?g:v[0]?.id??null)},me=()=>{let v=f;f=null,v?.(),p="",I.value="",a.setAttribute("aria-expanded","false")},ie=()=>{f||r.disabled||(g=r.value,I.placeholder=r.searchPlaceholder??"Search",r.searchable?k.prepend(S):S.remove(),xe(),f=eo(n,a,k,me),a.setAttribute("aria-expanded","true"),ke().focus())},de=v=>{me(),a.focus(),v!==r.value&&r.onChange(v)},ue=()=>{f?me():ie()},$=v=>{!f&&Qe(v)&&(v.preventDefault(),ie())},A=v=>{let ne=Qe(v);ne?(v.preventDefault(),se(lt(Q(),g,ne))):v.key==="Enter"?(v.preventDefault(),g&&de(g)):v.key==="Escape"?(v.preventDefault(),me(),a.focus()):r.searchable&&v.target!==I&&v.key.length===1&&!v.ctrlKey&&!v.metaKey&&I.focus()},y=()=>{p=I.value,xe()},be=v=>{f&&!(v.relatedTarget instanceof Node&&n.contains(v.relatedTarget))&&me()},q=()=>{ae(i,r.label),i.hidden=!r.label;let v=r.options.find(ne=>ne.id===r.value);ae(u,v?.label??r.placeholder??"Select"),u.dataset.empty=v?"false":"true",a.disabled=!!r.disabled,f&&xe()};return a.addEventListener("click",ue),a.addEventListener("keydown",$),k.addEventListener("keydown",A),I.addEventListener("input",y),n.addEventListener("focusout",be),q(),{update:v=>{r={...r,...v},q()},dispose:()=>{me(),a.removeEventListener("click",ue),a.removeEventListener("keydown",$),k.removeEventListener("keydown",A),I.removeEventListener("input",y),n.removeEventListener("focusout",be),n.remove()}}};var to=(e,t)=>{Z(J);let r=t,o=R("div","oc-sdk oc-sdk-tabs");o.setAttribute("role","tablist"),e.append(o);let n=()=>{ct(o),o.dataset.track=r.trackBackground?"true":"false";for(let a of r.items){let u=Le("oc-sdk-tab");u.setAttribute("role","tab");let p=a.id===r.activeId;u.setAttribute("aria-selected",p?"true":"false"),u.tabIndex=p?0:-1,u.dataset.id=a.id;let g=R("span");if(g.textContent=a.label,u.append(g),a.count!==void 0){let f=R("span","oc-sdk-tab-count");f.textContent=String(a.count),u.append(f)}u.addEventListener("click",()=>{a.id!==r.activeId&&r.onChange(a.id)}),o.append(u)}},i=a=>{let u=Qe(a,"horizontal");if(!u)return;let p=lt(r.items,r.activeId,u);if(p&&p!==r.activeId){a.preventDefault(),r.onChange(p);let g=o.querySelector(`[data-id="${CSS.escape(p)}"]`);g instanceof HTMLElement&&g.focus()}};return o.addEventListener("keydown",i),n(),{update:a=>{r={...r,...a},n()},dispose:()=>{o.removeEventListener("keydown",i),o.remove()}}};var Ir=(e,t)=>{Z(J);let r=t,o=R("div","oc-sdk oc-sdk-empty"),n=R("h2","oc-sdk-empty-title"),i=R("p","oc-sdk-empty-body"),a=R("div","oc-sdk-empty-action");o.append(n,i,a),e.append(o);let u=null,p=()=>{if(ae(n,r.title),ae(i,r.body),i.hidden=!r.body,a.hidden=!r.action,!r.action){u?.dispose(),u=null;return}let g={label:r.action.label,onClick:r.action.onClick};u?u.update(g):u=Me(a,{...g,variant:"outline",size:"sm"})};return p(),{update:g=>{r={...r,...g},p()},dispose:()=>{u?.dispose(),u=null,o.remove()}}};var Cr=(e,t={})=>{Z(J);let r=t,o=R("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let n=R("span","oc-sdk-spinner-ring");n.setAttribute("aria-hidden","true");let i=R("span");o.append(n,i),e.append(o);let a=()=>{o.dataset.size=r.size??"default",ae(i,r.label),i.hidden=!r.label,o.setAttribute("aria-label",r.label??"Loading")};return a(),{update:u=>{r={...r,...u},a()},dispose:()=>{o.remove()}}};var Lr=(e,t)=>{Z(J);let r=t,o=R("div","oc-sdk oc-sdk-banner"),n=R("div","oc-sdk-banner-text"),i=R("div","oc-sdk-banner-title"),a=R("div","oc-sdk-banner-body"),u=R("div","oc-sdk-banner-action");n.append(i,a),o.append(n,u),e.append(o);let p=null,g=()=>{if(o.dataset.tone=r.tone,o.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),ae(i,r.title),ae(a,r.body),a.hidden=!r.body,u.hidden=!r.action,!r.action){p?.dispose(),p=null;return}let f={label:r.action.label,onClick:r.action.onClick};p?p.update(f):p=Me(u,{...f,variant:"outline",size:"xs"})};return g(),{update:f=>{r={...r,...f},g()},dispose:()=>{p?.dispose(),p=null,o.remove()}}};var Ka="https://kaneo.qubitquilt.dev",Ks=Ka.replace(/\/api\/?$/,""),Ys="kaneo",ro=100,qs=["no-priority","low","medium","high","urgent"];var Js={"no-priority":0,low:1,medium:2,high:3,urgent:4};var pt=class extends Error{status;code;constructor(t,r,o){super(o),this.name="KaneoError",this.status=t,this.code=r}get isAuthProblem(){return this.status===401||this.status===403}get isBadRequest(){return this.status===400||this.status===404||this.status===409}};function Ya(e){if(!e)return;let t={};for(let[r,o]of Object.entries(e))o==null||o===""||(t[r]=String(o));return Object.keys(t).length>0?t:void 0}function qa(e,t){let r=typeof t=="object"&&t!==null?t:{},o=typeof r.message=="string"&&r.message?r.message:`Kaneo answered ${e}.`;return new pt(e,r.code??`HTTP_${e}`,o)}var Ja=10,Za=2,Qa=800;function Zs(e){async function t({method:o,path:n,query:i,body:a}){let u=Ya(i),p="/api"+n,g;for(let S=0;g=await e({method:o,path:p,...u?{query:u}:{},...a===void 0?{}:{body:JSON.stringify(a)}}),!(g.status!==429||S>=Za);S+=1)await new Promise(I=>setTimeout(I,Qa*2**S));let f=g,k;if(f.body)try{k=JSON.parse(f.body)}catch{throw f.status>=400?new pt(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new pt(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw qa(f.status,k);return k}async function r(o){let n=encodeURIComponent(o),i=await t({method:"GET",path:`/task/tasks/${n}`,query:{page:1,limit:ro}}),a=i.data,u=i.pagination,p=1;for(;p<Math.min(u.totalPages,Ja);){p+=1;let g=await t({method:"GET",path:`/task/tasks/${n}`,query:{page:p,limit:ro}});for(let f of g.data.columns){let k=a.columns.find(S=>S.id===f.id);k&&k.tasks.push(...f.tasks)}a.archivedTasks.push(...g.data.archivedTasks),a.plannedTasks.push(...g.data.plannedTasks)}return{board:a,pagination:u,truncated:u.totalPages>p}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(o,n=!1)=>t({method:"GET",path:"/project",query:{workspaceId:o,includeArchived:n?"true":void 0}}),getBoard:r,getTask:o=>t({method:"GET",path:`/task/${encodeURIComponent(o)}`,query:{view:"detail"}}),getTaskByTicketId:(o,n)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(o)}`,query:{workspaceId:n}}),listAssignedTasks:o=>t({method:"GET",path:"/task/assigned",query:{workspaceId:o}}),search:(o,n,i={})=>t({method:"GET",path:"/search",query:{q:n,type:"tasks",workspaceId:o,projectId:i.projectId,limit:i.limit??30}}),listLabels:o=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(o)}`}),listComments:o=>t({method:"GET",path:`/comment/${encodeURIComponent(o)}`}),createComment:(o,n)=>t({method:"POST",path:`/comment/${encodeURIComponent(o)}`,body:{content:n}}),createTask:(o,n)=>t({method:"POST",path:`/task/${encodeURIComponent(o)}`,body:n}),updateTaskStatus:(o,n)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(o)}`,body:{status:n}}),updateTaskPriority:(o,n)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(o)}`,body:{priority:n}})}}function ec(e,t){this.v=e,this.k=t}function Qs(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,o=Array(t);r<t;r++)o[r]=e[r];return o}function tc(e){if(Array.isArray(e))return e}function rc(e,t){var r=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var o,n,i,a,u=[],p=!0,g=!1;try{if(i=(r=r.call(e)).next,t===0){if(Object(r)!==r)return;p=!1}else for(;!(p=(o=i.call(r)).done)&&(u.push(o.value),u.length!==t);p=!0);}catch(f){g=!0,n=f}finally{try{if(!p&&r.return!=null&&(a=r.return(),Object(a)!==a))return}finally{if(g)throw n}}return u}}function nc(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function oc(e,t){return tc(e)||rc(e,t)||sc(e,t)||nc()}function sc(e,t){if(e){if(typeof e=="string")return Qs(e,t);var r={}.toString.call(e).slice(8,-1);return r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set"?Array.from(e):r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Qs(e,t):void 0}}function Pr(e){var t,r;function o(i,a){try{var u=e[i](a),p=u.value,g=p instanceof ec;Promise.resolve(g?p.v:p).then(function(f){if(g){var k=i==="return"&&p.k?i:"next";if(!p.k||f.done)return o(k,f);f=e[k](f).value}n(!!u.done,f)},function(f){o("throw",f)})}catch(f){n(2,f)}}function n(i,a){i===2?t.reject(a):t.resolve({value:a,done:i}),(t=t.next)?o(t.key,t.arg):r=null}this._invoke=function(i,a){return new Promise(function(u,p){var g={key:i,arg:a,resolve:u,reject:p,next:null};r?r=r.next=g:(t=r=g,o(i,a))})},typeof e.return!="function"&&(this.return=void 0)}Pr.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},Pr.prototype.next=function(e){return this._invoke("next",e)},Pr.prototype.throw=function(e){return this._invoke("throw",e)},Pr.prototype.return=function(e){return this._invoke("return",e)};var hi=Object.entries,ei=Object.setPrototypeOf,ic=Object.isFrozen,mi=Object.getPrototypeOf,gi=Object.getOwnPropertyDescriptor,he=Object.freeze,Te=Object.seal,Rt=Object.create,Ei=typeof Reflect<"u"&&Reflect,fo=Ei.apply,ho=Ei.construct;he||(he=function(t){return t});Te||(Te=function(t){return t});fo||(fo=function(t,r){for(var o=arguments.length,n=new Array(o>2?o-2:0),i=2;i<o;i++)n[i-2]=arguments[i];return t.apply(r,n)});ho||(ho=function(t){for(var r=arguments.length,o=new Array(r>1?r-1:0),n=1;n<r;n++)o[n-1]=arguments[n];return new t(...o)});var Xe=K(Array.prototype.forEach);Array.prototype.indexOf;var ac=K(Array.prototype.lastIndexOf),ti=K(Array.prototype.pop),Ht=K(Array.prototype.push),cc=K(Array.prototype.slice),lc=K(Array.prototype.splice),vt=Array.isArray,no=Ti(Set),oo=K(Set.prototype.add),Ft=K(Set.prototype.has),dt=K(String.prototype.toLowerCase),so=K(String.prototype.toString),ri=K(String.prototype.match),zt=K(String.prototype.replace),ni=K(String.prototype.indexOf),pc=K(String.prototype.trim),dc=K(Number.prototype.toString),uc=K(Boolean.prototype.toString),oi=typeof BigInt>"u"?null:K(BigInt.prototype.toString),si=typeof Symbol>"u"?null:K(Symbol.prototype.toString),we=K(Object.prototype.hasOwnProperty),Bt=K(Object.prototype.toString),Ee=K(RegExp.prototype.test),Ve=Ti(TypeError);function K(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,o=new Array(r>1?r-1:0),n=1;n<r;n++)o[n-1]=arguments[n];return fo(e,t,o)}}function Ti(e){return function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return ho(e,r)}}function D(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:dt;if(ei&&ei(e,null),!vt(t))return e;let o=t.length;for(;o--;){let n=t[o];if(typeof n=="string"){let i=r(n);i!==n&&(ic(t)||(t[o]=i),n=i)}e[n]=!0}return e}function fc(e){for(let t=0;t<e.length;t++)we(e,t)||(e[t]=null);return e}function Oe(e){let t=Rt(null);for(let o of hi(e)){var r=oc(o,2);let n=r[0],i=r[1];we(e,n)&&(vt(i)?t[n]=fc(i):i&&typeof i=="object"&&i.constructor===Object?t[n]=Oe(i):t[n]=i)}return t}function hc(e){switch(typeof e){case"string":return e;case"number":return dc(e);case"boolean":return uc(e);case"bigint":return oi?oi(e):"0";case"symbol":return si?si(e):"Symbol()";case"undefined":return Bt(e);case"function":case"object":{if(e===null)return Bt(e);let t=e,r=Pe(t,"toString");if(typeof r=="function"){let o=r(t);return typeof o=="string"?o:Bt(o)}return Bt(e)}default:return Bt(e)}}function Pe(e,t){for(;e!==null;){let o=gi(e,t);if(o){if(o.get)return K(o.get);if(typeof o.value=="function")return K(o.value)}e=mi(e)}function r(){return null}return r}function mc(e,t){for(;e!==null;){let r=gi(e,t);if(r)return r.get?K(r.get):null;e=mi(e)}return null}function gc(e){try{return Ee(e,""),!0}catch{return!1}}var ii=he(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),io=he(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ao=he(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ec=he(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),co=he(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tc=he(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ai=he(["#text"]),ci=he(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),lo=he(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),li=he(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Nr=he(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),kc=Te(/{{[\w\W]*|^[\w\W]*}}/g),xc=Te(/<%[\w\W]*|^[\w\W]*%>/g),bc=Te(/\${[\w\W]*/g),_c=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),Sc=Te(/^aria-[\-\w]+$/),pi=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yc=Te(/^(?:\w+script|data):/i),Ac=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wc=Te(/^html$/i),Rc=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),po=Te(/<[/\w!]/g),di=Te(/<[/\w]/g),vc=Te(/<\/no(script|embed|frames)/i),ui=Te(/\/>/i),ce={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Oc=he(D({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),Ic=function(){return typeof window>"u"?null:window},Cc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let o=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(o=r.getAttribute(n));let i="dompurify"+(o?"#"+o:"");try{return t.createPolicy(i,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},fi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},et=function(t,r,o,n){return we(t,r)&&vt(t[r])?D(n.base?Oe(n.base):{},t[r],n.transform):o},uo=function(t,r,o){let n=we(t,r)?t[r]:void 0;return n&&typeof n=="object"?Oe(n):o()};function ki(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ic(),t=E=>ki(E);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ce.document||!e.Element)return t.isSupported=!1,t;let r=e.document,o=r,n=o.currentScript;e.DocumentFragment;let i=e.HTMLTemplateElement,a=e.Node,u=e.Element,p=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let g=e.DOMParser,f=e.trustedTypes,k=u.prototype,S=Pe(k,"cloneNode"),I=Pe(k,"remove"),L=Pe(k,"removeAttributeNode"),Q=Pe(k,"nextSibling"),ke=Pe(k,"childNodes"),se=Pe(k,"parentNode"),xe=Pe(k,"shadowRoot"),me=Pe(k,"attributes"),ie=a&&a.prototype?Pe(a.prototype,"nodeType"):null,de=a&&a.prototype?Pe(a.prototype,"nodeName"):null,ue=a&&a.prototype?Pe(a.prototype,"ownerDocument"):null,$=function(s){return ie?ie(s):s.nodeType},A=function(s){return de?de(s):s.nodeName},y=mc(k,"namespaceURI"),be=function(s){return y?y(s):s.namespaceURI};if(typeof i=="function"){let E=r.createElement("template");E.content&&E.content.ownerDocument&&(r=E.content.ownerDocument)}let q,v="",ne,It=!1,fe=0,ee=function(){if(fe>0)throw Ve('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},ze=function(s){ee(),fe++;try{return q.createHTML(s)}finally{fe--}},ge=function(s){ee(),fe++;try{return q.createScriptURL(s)}finally{fe--}},te=function(){return It||(ne=Cc(f,n),It=!0),ne},V=r,tt=V.implementation,Ct=V.createNodeIterator,er=V.createDocumentFragment,tr=V.getElementsByTagName,mt=o.importNode,H=fi();t.isSupported=typeof hi=="function"&&typeof se=="function"&&tt&&tt.createHTMLDocument!==void 0;let rr=kc,nr=xc,or=bc,Re=_c,Lt=Sc,Pt=yc,sr=Ac,gt=Rc,Nt=pi,X=null,c=D({},[...ii,...io,...ao,...co,...ai]),d=null,b=D({},[...ci,...lo,...li,...Nr]),x=Object.seal(Rt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),F=null,j=null,z=Object.seal(Rt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Co=!0,Vr=!0,Lo=!1,Wr=!0,Be=!1,rt=!0,nt=!1,Kr=!1,ir=null,ar=null,Yr=!1,Et=!1,cr=!1,lr=!1,Po=!0,No=!1,Mo="user-content-",qr=!0,Jr=!1,ot=null,Tt={},st=null,Uo=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),Do=null,Go=D({},["audio","video","img","source","image","track"]),$o=null,Ho=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),pr="http://www.w3.org/1998/Math/MathML",dr="http://www.w3.org/2000/svg",$e="http://www.w3.org/1999/xhtml",kt=$e,Zr=!1,Qr=null,la=D({},[pr,dr,$e],so),Fo=he(["mi","mo","mn","ms","mtext"]),en=D({},Fo),zo=he(["annotation-xml"]),tn=D({},zo),pa=D({},["title","style","font","a","script"]),Mt=null,da=["application/xhtml+xml","text/html"],ua="text/html",oe=null,xt=null,fa=r.createElement("form"),Bo=function(s){return s instanceof RegExp||s instanceof Function},rn=function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(xt&&xt===s)return;(!s||typeof s!="object")&&(s={}),s=Oe(s),Mt=da.indexOf(s.PARSER_MEDIA_TYPE)===-1?ua:s.PARSER_MEDIA_TYPE,oe=Mt==="application/xhtml+xml"?so:dt,X=et(s,"ALLOWED_TAGS",c,{transform:oe}),d=et(s,"ALLOWED_ATTR",b,{transform:oe}),Qr=et(s,"ALLOWED_NAMESPACES",la,{transform:so}),$o=et(s,"ADD_URI_SAFE_ATTR",Ho,{transform:oe,base:Ho}),Do=et(s,"ADD_DATA_URI_TAGS",Go,{transform:oe,base:Go}),st=et(s,"FORBID_CONTENTS",Uo,{transform:oe}),F=et(s,"FORBID_TAGS",Oe({}),{transform:oe}),j=et(s,"FORBID_ATTR",Oe({}),{transform:oe}),Tt=we(s,"USE_PROFILES")?s.USE_PROFILES&&typeof s.USE_PROFILES=="object"?Oe(s.USE_PROFILES):s.USE_PROFILES:!1,Co=s.ALLOW_ARIA_ATTR!==!1,Vr=s.ALLOW_DATA_ATTR!==!1,Lo=s.ALLOW_UNKNOWN_PROTOCOLS||!1,Wr=s.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Be=s.SAFE_FOR_TEMPLATES||!1,rt=s.SAFE_FOR_XML!==!1,nt=s.WHOLE_DOCUMENT||!1,Et=s.RETURN_DOM||!1,cr=s.RETURN_DOM_FRAGMENT||!1,lr=s.RETURN_TRUSTED_TYPE||!1,Yr=s.FORCE_BODY||!1,Po=s.SANITIZE_DOM!==!1,No=s.SANITIZE_NAMED_PROPS||!1,qr=s.KEEP_CONTENT!==!1,Jr=s.IN_PLACE||!1,Nt=gc(s.ALLOWED_URI_REGEXP)?s.ALLOWED_URI_REGEXP:pi,kt=typeof s.NAMESPACE=="string"?s.NAMESPACE:$e,en=uo(s,"MATHML_TEXT_INTEGRATION_POINTS",()=>D({},Fo)),tn=uo(s,"HTML_INTEGRATION_POINTS",()=>D({},zo));let l=uo(s,"CUSTOM_ELEMENT_HANDLING",()=>Rt(null));if(x=Rt(null),we(l,"tagNameCheck")&&Bo(l.tagNameCheck)&&(x.tagNameCheck=l.tagNameCheck),we(l,"attributeNameCheck")&&Bo(l.attributeNameCheck)&&(x.attributeNameCheck=l.attributeNameCheck),we(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(x.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),Te(x),Be&&(Vr=!1),cr&&(Et=!0),Tt&&(X=D({},ai),d=Rt(null),Tt.html===!0&&(D(X,ii),D(d,ci)),Tt.svg===!0&&(D(X,io),D(d,lo),D(d,Nr)),Tt.svgFilters===!0&&(D(X,ao),D(d,lo),D(d,Nr)),Tt.mathMl===!0&&(D(X,co),D(d,li),D(d,Nr))),z.tagCheck=null,z.attributeCheck=null,we(s,"ADD_TAGS")&&(typeof s.ADD_TAGS=="function"?z.tagCheck=s.ADD_TAGS:vt(s.ADD_TAGS)&&(X===c&&(X=Oe(X)),D(X,s.ADD_TAGS,oe))),we(s,"ADD_ATTR")&&(typeof s.ADD_ATTR=="function"?z.attributeCheck=s.ADD_ATTR:vt(s.ADD_ATTR)&&(d===b&&(d=Oe(d)),D(d,s.ADD_ATTR,oe))),we(s,"ADD_FORBID_CONTENTS")&&vt(s.ADD_FORBID_CONTENTS)&&(st===Uo&&(st=Oe(st)),D(st,s.ADD_FORBID_CONTENTS,oe)),qr&&(X["#text"]=!0),nt&&D(X,["html","head","body"]),X.table&&(D(X,["tbody"]),delete F.tbody),s.TRUSTED_TYPES_POLICY){if(typeof s.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ve('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof s.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ve('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let h=q;q=s.TRUSTED_TYPES_POLICY;try{v=ze("")}catch(m){throw q=h,m}}else s.TRUSTED_TYPES_POLICY===null?(q=void 0,v=""):(q===void 0&&(q=te()),q&&typeof v=="string"&&(v=ze("")));he&&he(s),xt=s},jo=D({},[...io,...ao,...Ec]),Xo=D({},[...co,...Tc]),ha=function(s,l,h){return l.namespaceURI===$e?s==="svg":l.namespaceURI===pr?s==="svg"&&(h==="annotation-xml"||en[h]):!!jo[s]},ma=function(s,l,h){return l.namespaceURI===$e?s==="math":l.namespaceURI===dr?s==="math"&&tn[h]:!!Xo[s]},ga=function(s,l,h){return l.namespaceURI===dr&&!tn[h]||l.namespaceURI===pr&&!en[h]?!1:!Xo[s]&&(pa[s]||!jo[s])},Ea=function(s){let l=be(s),h=dt(A(s)),m=se(s),_,O;return m&&$(m)===ce.element?(_={namespaceURI:be(m)},O=dt(A(m))):(_={namespaceURI:kt},O="template"),Qr[l]?l===dr?ha(h,_,O):l===pr?ma(h,_,O):l===$e?ga(h,_,O):!!(Mt==="application/xhtml+xml"&&Qr[l]):!1},Ke=function(s){Ht(t.removed,{element:s});try{se(s).removeChild(s)}catch{if(I(s),!se(s))throw Ve("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Vo=function(s,l,h){try{L(s,l)}catch{try{s.removeAttribute(h)}catch{}}},nn=function(s){sn(s);let l=ke(s);l&&Xe(cc(l),m=>{try{I(m)}catch{}});let h=$(s)===ce.element?me(s):null;if(h)for(let m=h.length-1;m>=0;--m){let _=h[m],O=_&&_.name;typeof O=="string"&&Vo(s,_,O)}},bt=function(s,l,h){if(!h)try{h=l.getAttributeNode(s)}catch{h=null}Ht(t.removed,{attribute:h||null,from:l});try{h?L(l,h):l.removeAttribute(s)}catch{try{l.removeAttribute(s)}catch{}}if(s==="is")if(Et||cr)try{Ke(l)}catch{}else try{l.setAttribute(s,"")}catch{}},Wo=function(s){let l=me(s);if(l)for(let h=l.length-1;h>=0;--h){let m=l[h],_=m&&m.name;typeof _!="string"||d[oe(_)]||Vo(s,m,_)}},on=function(s,l){let h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,m=[s];for(;m.length>0;){let _=m.pop();if(l(_)===!1)continue;if(h&&$(_)===ce.element){let P=xe(_);Ye(P)&&m.push(P)}let O=ke(_);if(O)for(let P=O.length-1;P>=0;--P)m.push(O[P])}},sn=function(s){on(s,l=>{$(l)===ce.element&&Wo(l)})},an=function(s){let l=[];return on(s,h=>{l.push(h)},!0),l},Ta=function(s,l){let h=no();Xe(an(s),m=>{$(m)===ce.element&&oo(h,m)}),Xe(l,m=>{$(m)===ce.element&&!Ft(h,m)&&Wo(m)})},Ko=function(s,l){let h=!1;return Xe(t.removed,m=>{m.element&&(h=h||m.element===s,sn(m.element))}),Ta(s,l),h},ka=8,xa=function(s,l){let h=ot,m=null,_=()=>(m||(m=no(),Xe(l,O=>{oo(m,O)})),m);for(let O=0;;O++){let P=an(s),le=[s],He=!1;if(Xe(P,_e=>{$(_e)===ce.documentFragment?Ht(le,_e):!He&&!Ft(h,_e)&&(He=Ft(_(),_e))}),!He)return;if(O>=ka)throw Ve("the tree kept changing during in-place sanitization; refusing to return it");Xe(le,(_e,ye)=>{ba(_e,ye>0,s,_())})}},ba=function(s,l,h,m){let _=cn(s),O;for(;O=_.nextNode();)!Ft(m,O)||Ft(ot,O)||(l&&Ne(H.uponSanitizeShadowNode,O,null),pn(O,h),dn(O,h),Ye(O.content)&&Dt(O.content))},_a=function(s){ot&&oo(ot,s)},Yo=function(s,l){return rt?s==="patchsrc"?!0:s==="for"&&l!=="label"&&l!=="output":!1},Sa=function(s){rt&&on(s,l=>{let h=$(l);if(h===ce.processingInstruction||h===ce.comment&&Ee(di,l.data)){try{I(l)}catch{}return!1}if(h===ce.element){let m=l,_=oe(A(l));try{m.hasAttribute&&m.hasAttribute("patchsrc")&&m.removeAttribute("patchsrc"),m.hasAttribute&&m.hasAttribute("for")&&Yo("for",_)&&m.removeAttribute("for")}catch{}}return!0})},qo=function(s){let l=null,h=null;if(Yr)s="<remove></remove>"+s;else{let O=ri(s,/^[\r\n\t ]+/);h=O&&O[0]}Mt==="application/xhtml+xml"&&kt===$e&&(s='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+s+"</body></html>");let m=q?ze(s):s;if(kt===$e)try{l=new g().parseFromString(m,Mt)}catch{}if(!l||!l.documentElement){l=tt.createDocument(kt,"template",null);try{l.documentElement.innerHTML=Zr?v:m}catch{}}let _=l.body||l.documentElement;return s&&h&&_.insertBefore(r.createTextNode(h),_.childNodes[0]||null),kt===$e?tr.call(l,nt?"html":"body")[0]:nt?l.documentElement:_},cn=function(s){let l=ue?ue(s):s.ownerDocument;return Ct.call(l||s,s,p.SHOW_ELEMENT|p.SHOW_COMMENT|p.SHOW_TEXT|p.SHOW_PROCESSING_INSTRUCTION|p.SHOW_CDATA_SECTION,null)},ur=function(s){return s=zt(s,rr," "),s=zt(s,nr," "),s=zt(s,or," "),s},ln=function(s){var l;Jo(s);let h=(l=s.querySelectorAll)===null||l===void 0?void 0:l.call(s,"template");h&&Xe(h,m=>{Ye(m.content)&&ln(m.content)})},Jo=function(s){s.normalize();let l=ue?ue(s):s.ownerDocument,h=Ct.call(l||s,s,p.SHOW_TEXT|p.SHOW_COMMENT|p.SHOW_CDATA_SECTION|p.SHOW_PROCESSING_INSTRUCTION,null),m=h.nextNode();for(;m;)m.data=ur(m.data),m=h.nextNode()},fr=function(s){let l=de?de(s):null;return typeof l!="string"||oe(l)!=="form"?!1:typeof s.nodeName!="string"||typeof s.textContent!="string"||typeof s.removeChild!="function"||s.attributes!==me(s)||typeof s.removeAttribute!="function"||typeof s.removeAttributeNode!="function"||typeof s.getAttributeNode!="function"||typeof s.setAttribute!="function"||typeof s.namespaceURI!="string"||typeof s.insertBefore!="function"||typeof s.hasChildNodes!="function"||s.nodeType!==ie(s)||s.childNodes!==ke(s)},Ye=function(s){if(!ie||typeof s!="object"||s===null)return!1;try{return ie(s)===ce.documentFragment}catch{return!1}},Ut=function(s){if(!ie||typeof s!="object"||s===null)return!1;try{return typeof ie(s)=="number"}catch{return!1}};function Ne(E,s,l){E.length!==0&&Xe(E,h=>{h.call(t,s,l,xt)})}let ya=function(s,l){return!!(rt&&s.hasChildNodes()&&!Ut(s.firstElementChild)&&Ee(po,s.textContent)&&Ee(po,s.innerHTML)||rt&&Oc[l]&&$(s)===ce.element&&be(s)===$e&&(Ut(s.firstElementChild)||typeof s.textContent=="string"&&Ee(po,s.textContent))||s.nodeType===ce.processingInstruction||rt&&s.nodeType===ce.comment&&Ee(di,s.data))},hr=function(s,l){if(s instanceof RegExp)return Ee(s,l);if(s instanceof Function){for(var h=arguments.length,m=new Array(h>2?h-2:0),_=2;_<h;_++)m[_-2]=arguments[_];return!!s(l,...m)}return!1},Aa=function(s,l,h){if(!F[l]&&es(l)&&hr(x.tagNameCheck,l))return!1;if(qr&&!st[l]&&!st[dt(l)]){let m=se(s),_=ke(s);if(_&&m){let O=_.length;for(let P=O-1;P>=0;--P){let le=s===h?S(_[P],!0):_[P];m.insertBefore(le,Q(s))}}}return Ke(s),!0},Zo=function(s,l,h,m){return s.length===0?l:l===h||l===m?Oe(l):l},_t=function(s,l){return s===l||se(s)!==null?!1:(Jr&&sn(s),!0)},pn=function(s,l){if(_a(s),Ne(H.beforeSanitizeElements,s,null),_t(s,l))return!0;if(fr(s))return Ke(s),!0;let h=oe(A(s));if(X=Zo(H.uponSanitizeElement,X,c,ir),Ne(H.uponSanitizeElement,s,{tagName:h,allowedTags:X}),_t(s,l))return!0;if(ya(s,h))return Ke(s),!0;if(F[h]||!(z.tagCheck instanceof Function&&z.tagCheck(h))&&!X[h]){let m=Aa(s,h,l);return m===!1&&(Ne(H.afterSanitizeElements,s,null),_t(s,l))?!0:m}if($(s)===ce.element&&!Ea(s)||(h==="noscript"||h==="noembed"||h==="noframes")&&Ee(vc,s.innerHTML))return Ke(s),!0;if(Be&&s.nodeType===ce.text){let m=ur(s.textContent);s.textContent!==m&&(Ht(t.removed,{element:s.cloneNode()}),s.textContent=m)}return Ne(H.afterSanitizeElements,s,null),_t(s,l)},Qo=function(s,l,h){if(j[l]||Yo(l,s)||Po&&(l==="id"||l==="name")&&(h in r||h in fa))return!1;let m=d[l]||z.attributeCheck instanceof Function&&z.attributeCheck(l,s);return Vr&&Ee(Re,l)||Co&&Ee(Lt,l)?!0:m?$o[l]||Ee(Nt,zt(h,sr,""))||(l==="src"||l==="xlink:href"||l==="href")&&s!=="script"&&ni(h,"data:")===0&&Do[s]||Lo&&!Ee(Pt,zt(h,sr,""))?!0:!h:es(s)&&hr(x.tagNameCheck,s)&&hr(x.attributeNameCheck,l,s)||l==="is"&&x.allowCustomizedBuiltInElements&&hr(x.tagNameCheck,h)},wa=D({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),es=function(s){return!wa[dt(s)]&&Ee(gt,s)},Ra=function(s,l,h,m){if(q&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!h)switch(f.getAttributeType(s,l)){case"TrustedHTML":return ze(m);case"TrustedScriptURL":return ge(m)}return m},va=function(s,l,h,m){try{return h?s.setAttributeNS(h,l,m):s.setAttribute(l,m),fr(s)?(Ke(s),!1):!0}catch{return bt(l,s),!1}},ts=function(s,l){return rt&&Ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,l)?!0:dt(s)==="attributename"&&ri(l,"href")!==null},dn=function(s,l){if(Ne(H.beforeSanitizeAttributes,s,null),_t(s,l))return;let h=s.attributes;if(!h||fr(s))return;d=Zo(H.uponSanitizeAttribute,d,b,ar);let m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d,forceKeepAttr:void 0},_=h.length,O=oe(s.nodeName);for(;_--;){let P=h[_],le=P.name,He=P.namespaceURI,_e=P.value,ye=oe(le),St=_e,Ae=le==="value"?St:pc(St),rs=!1;if(m.attrName=ye,m.attrValue=Ae,m.keepAttr=!0,m.forceKeepAttr=void 0,Ne(H.uponSanitizeAttribute,s,m),Ae=m.attrValue,No&&(ye==="id"||ye==="name")&&ni(Ae,Mo)!==0&&(bt(le,s,P),Ae=Mo+Ae,rs=!0),ts(le,Ae)){bt(le,s,P);continue}if(!m.forceKeepAttr){if(!m.keepAttr){bt(le,s,P);continue}if(!Wr&&Ee(ui,Ae)){bt(le,s,P);continue}if(Be&&(Ae=ur(Ae)),!Qo(O,ye,Ae)){bt(le,s,P);continue}Ae=Ra(O,ye,He,Ae),Ae!==St&&va(s,le,He,Ae)&&rs&&ti(t.removed)}}Ne(H.afterSanitizeAttributes,s,null),_t(s,l)},Dt=function(s){let l=null,h=cn(s);for(Ne(H.beforeSanitizeShadowDOM,s,null);l=h.nextNode();)if(Ne(H.uponSanitizeShadowNode,l,null),pn(l,s),dn(l,s),Ye(l.content)&&Dt(l.content),$(l)===ce.element){let m=xe(l);Ye(m)&&(un(m),Dt(m))}Be&&Jo(s),Ne(H.afterSanitizeShadowDOM,s,null)},un=function(s){let l=[{node:s,shadow:null}];for(;l.length>0;){let h=l.pop();if(h.shadow){Dt(h.shadow);continue}let m=h.node,_=$(m)===ce.element,O=ke(m);if(O)for(let P=O.length-1;P>=0;--P)l.push({node:O[P],shadow:null});if(_){let P=de?de(m):null;if(typeof P=="string"&&oe(P)==="template"){let le=m.content;Ye(le)&&l.push({node:le,shadow:null})}}if(_){let P=xe(m);Ye(P)&&l.push({node:null,shadow:P},{node:P,shadow:null})}}};return t.sanitize=function(E){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,h=null,m=null,_=null;if(Zr=!E,Zr&&(E="<!-->"),typeof E!="string"&&!Ut(E)&&(E=hc(E),typeof E!="string"))throw Ve("dirty is not a string, aborting");if(!t.isSupported)return E;Kr?(X=ir,d=ar):rn(s),(H.uponSanitizeElement.length>0||H.uponSanitizeAttribute.length>0)&&(X=Oe(X)),H.uponSanitizeAttribute.length>0&&(d=Oe(d)),t.removed=[];let O=Jr&&typeof E!="string"&&Ut(E),P=[],le=ot;if(O){Sa(E);let ye=A(E);if(typeof ye=="string"){let St=oe(ye);if(!X[St]||F[St])throw nn(E),Ve("root node is forbidden and cannot be sanitized in-place")}if(fr(E))throw nn(E),Ve("root node is clobbered and cannot be sanitized in-place");P=an(E),ot=no()}else if(Ut(E))l=qo("<!---->"),h=l.ownerDocument.importNode(E,!0),h.nodeType===ce.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?l=h:l.appendChild(h),un(l);else{if(!Et&&!Be&&!nt&&E.indexOf("<")===-1)return q&&lr?ze(E):E;if(l=qo(E),!l)return Et?null:lr?v:""}l&&Yr&&Ke(l.firstChild);let He=O?E:l;try{O&&un(E);let ye=cn(He);for(;m=ye.nextNode();)pn(m,He),dn(m,He),Ye(m.content)&&Dt(m.content);O&&xa(E,P)}catch(ye){throw O&&(nn(E),Ko(E,P)),ye}finally{ot=le}if(O){if(Ko(E,P))throw Ve("a node selected for removal could not be safely returned; refusing to sanitize in place");return Be&&ln(E),E}if(Et){if(Be&&ln(l),cr)for(_=er.call(l.ownerDocument);l.firstChild;)_.appendChild(l.firstChild);else _=l;return(d.shadowroot||d.shadowrootmode)&&(_=mt.call(o,_,!0)),_}let _e=nt?l.outerHTML:l.innerHTML;return nt&&X["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&Ee(wc,l.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+_e),Be&&(_e=ur(_e)),q&&lr?ze(_e):_e},t.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};rn(E),Kr=!0,ir=X,ar=d},t.clearConfig=function(){xt=null,Kr=!1,ir=null,ar=null,q=ne,v=""},t.isValidAttribute=function(E,s,l){xt||rn({});let h=oe(E),m=oe(s);return typeof l=="string"&&(ts(s,l)||!Wr&&Ee(ui,l))?!1:Qo(h,m,l)},t.addHook=function(E,s){typeof s=="function"&&we(H,E)&&Ht(H[E],s)},t.removeHook=function(E,s){if(we(H,E)){if(s!==void 0){let l=ac(H[E],s);return l===-1?void 0:lc(H[E],l,1)[0]}return ti(H[E])}},t.removeHooks=function(E){we(H,E)&&(H[E]=[])},t.removeAllHooks=function(){H=fi()},t}var Lc=ki();function To(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ft=To();function wi(e){ft=e}var Wt={exec:()=>null};function G(e,t=""){let r=typeof e=="string"?e:e.source,o={replace:(n,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(Se.caret,"$1"),r=r.replace(n,a),o},getRegex:()=>new RegExp(r,t)};return o}var Pc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Se={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Nc=/^(?:[ \t]*(?:\n|$))+/,Mc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Uc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Kt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Dc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ko=/(?:[*+-]|\d{1,9}[.)])/,Ri=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,vi=G(Ri).replace(/bull/g,ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Gc=G(Ri).replace(/bull/g,ko).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),xo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,$c=/^[^\n]+/,bo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Hc=G(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Fc=G(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ko).getRegex(),$r="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_o=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,zc=G("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_o).replace("tag",$r).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Oi=G(xo).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex(),Bc=G(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Oi).getRegex(),So={blockquote:Bc,code:Mc,def:Hc,fences:Uc,heading:Dc,hr:Kt,html:zc,lheading:vi,list:Fc,newline:Nc,paragraph:Oi,table:Wt,text:$c},xi=G("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex(),jc={...So,lheading:Gc,table:xi,paragraph:G(xo).replace("hr",Kt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",xi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$r).getRegex()},Xc={...So,html:G(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_o).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Wt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:G(xo).replace("hr",Kt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Wc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ii=/^( {2,}|\\)\n(?!\s*$)/,Kc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Hr=/[\p{P}\p{S}]/u,yo=/[\s\p{P}\p{S}]/u,Ci=/[^\s\p{P}\p{S}]/u,Yc=G(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,yo).getRegex(),Li=/(?!~)[\p{P}\p{S}]/u,qc=/(?!~)[\s\p{P}\p{S}]/u,Jc=/(?:[^\s\p{P}\p{S}]|~)/u,Zc=G(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Pc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Pi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Qc=G(Pi,"u").replace(/punct/g,Hr).getRegex(),el=G(Pi,"u").replace(/punct/g,Li).getRegex(),Ni="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",tl=G(Ni,"gu").replace(/notPunctSpace/g,Ci).replace(/punctSpace/g,yo).replace(/punct/g,Hr).getRegex(),rl=G(Ni,"gu").replace(/notPunctSpace/g,Jc).replace(/punctSpace/g,qc).replace(/punct/g,Li).getRegex(),nl=G("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ci).replace(/punctSpace/g,yo).replace(/punct/g,Hr).getRegex(),ol=G(/\\(punct)/,"gu").replace(/punct/g,Hr).getRegex(),sl=G(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),il=G(_o).replace("(?:-->|$)","-->").getRegex(),al=G("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",il).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ur=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,cl=G(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ur).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mi=G(/^!?\[(label)\]\[(ref)\]/).replace("label",Ur).replace("ref",bo).getRegex(),Ui=G(/^!?\[(ref)\](?:\[\])?/).replace("ref",bo).getRegex(),ll=G("reflink|nolink(?!\\()","g").replace("reflink",Mi).replace("nolink",Ui).getRegex(),bi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ao={_backpedal:Wt,anyPunctuation:ol,autolink:sl,blockSkip:Zc,br:Ii,code:Wc,del:Wt,emStrongLDelim:Qc,emStrongRDelimAst:tl,emStrongRDelimUnd:nl,escape:Vc,link:cl,nolink:Ui,punctuation:Yc,reflink:Mi,reflinkSearch:ll,tag:al,text:Kc,url:Wt},pl={...Ao,link:G(/^!?\[(label)\]\((.*?)\)/).replace("label",Ur).getRegex(),reflink:G(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ur).getRegex()},mo={...Ao,emStrongRDelimAst:rl,emStrongLDelim:el,url:G(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",bi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:G(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",bi).getRegex()},dl={...mo,br:G(Ii).replace("{2,}","*").getRegex(),text:G(mo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Mr={normal:So,gfm:jc,pedantic:Xc},jt={normal:Ao,gfm:mo,breaks:dl,pedantic:pl},ul={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_i=e=>ul[e];function Fe(e,t){if(t){if(Se.escapeTest.test(e))return e.replace(Se.escapeReplace,_i)}else if(Se.escapeTestNoEncode.test(e))return e.replace(Se.escapeReplaceNoEncode,_i);return e}function Si(e){try{e=encodeURI(e).replace(Se.percentDecode,"%")}catch{return null}return e}function yi(e,t){let r=e.replace(Se.findPipe,(i,a,u)=>{let p=!1,g=a;for(;--g>=0&&u[g]==="\\";)p=!p;return p?"|":" |"}),o=r.split(Se.splitPipe),n=0;if(o[0].trim()||o.shift(),o.length>0&&!o.at(-1)?.trim()&&o.pop(),t)if(o.length>t)o.splice(t);else for(;o.length<t;)o.push("");for(;n<o.length;n++)o[n]=o[n].trim().replace(Se.slashPipe,"|");return o}function Xt(e,t,r){let o=e.length;if(o===0)return"";let n=0;for(;n<o;){let i=e.charAt(o-n-1);if(i===t&&!r)n++;else if(i!==t&&r)n++;else break}return e.slice(0,o-n)}function fl(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let o=0;o<e.length;o++)if(e[o]==="\\")o++;else if(e[o]===t[0])r++;else if(e[o]===t[1]&&(r--,r<0))return o;return r>0?-2:-1}function Ai(e,t,r,o,n){let i=t.href,a=t.title||null,u=e[1].replace(n.other.outputLinkReplace,"$1");o.state.inLink=!0;let p={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:a,text:u,tokens:o.inlineTokens(u)};return o.state.inLink=!1,p}function hl(e,t,r){let o=e.match(r.other.indentCodeCompensation);if(o===null)return t;let n=o[1];return t.split(`
`).map(i=>{let a=i.match(r.other.beginningSpace);if(a===null)return i;let[u]=a;return u.length>=n.length?i.slice(n.length):i}).join(`
`)}var Dr=class{options;rules;lexer;constructor(e){this.options=e||ft}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Xt(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],o=hl(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let o=Xt(r,"#");(this.options.pedantic||!o||this.rules.other.endingSpaceChar.test(o))&&(r=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Xt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Xt(t[0],`
`).split(`
`),o="",n="",i=[];for(;r.length>0;){let a=!1,u=[],p;for(p=0;p<r.length;p++)if(this.rules.other.blockquoteStart.test(r[p]))u.push(r[p]),a=!0;else if(!a)u.push(r[p]);else break;r=r.slice(p);let g=u.join(`
`),f=g.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");o=o?`${o}
${g}`:g,n=n?`${n}
${f}`:f;let k=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,i,!0),this.lexer.state.top=k,r.length===0)break;let S=i.at(-1);if(S?.type==="code")break;if(S?.type==="blockquote"){let I=S,L=I.raw+`
`+r.join(`
`),Q=this.blockquote(L);i[i.length-1]=Q,o=o.substring(0,o.length-I.raw.length)+Q.raw,n=n.substring(0,n.length-I.text.length)+Q.text;break}else if(S?.type==="list"){let I=S,L=I.raw+`
`+r.join(`
`),Q=this.list(L);i[i.length-1]=Q,o=o.substring(0,o.length-S.raw.length)+Q.raw,n=n.substring(0,n.length-I.raw.length)+Q.raw,r=L.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:o,tokens:i,text:n}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),o=r.length>1,n={type:"list",raw:"",ordered:o,start:o?+r.slice(0,-1):"",loose:!1,items:[]};r=o?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=o?r:"[*+-]");let i=this.rules.other.listItemRegex(r),a=!1;for(;e;){let p=!1,g="",f="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;g=t[0],e=e.substring(g.length);let k=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,se=>" ".repeat(3*se.length)),S=e.split(`
`,1)[0],I=!k.trim(),L=0;if(this.options.pedantic?(L=2,f=k.trimStart()):I?L=t[1].length+1:(L=t[2].search(this.rules.other.nonSpaceChar),L=L>4?1:L,f=k.slice(L),L+=t[1].length),I&&this.rules.other.blankLine.test(S)&&(g+=S+`
`,e=e.substring(S.length+1),p=!0),!p){let se=this.rules.other.nextBulletRegex(L),xe=this.rules.other.hrRegex(L),me=this.rules.other.fencesBeginRegex(L),ie=this.rules.other.headingBeginRegex(L),de=this.rules.other.htmlBeginRegex(L);for(;e;){let ue=e.split(`
`,1)[0],$;if(S=ue,this.options.pedantic?(S=S.replace(this.rules.other.listReplaceNesting,"  "),$=S):$=S.replace(this.rules.other.tabCharGlobal,"    "),me.test(S)||ie.test(S)||de.test(S)||se.test(S)||xe.test(S))break;if($.search(this.rules.other.nonSpaceChar)>=L||!S.trim())f+=`
`+$.slice(L);else{if(I||k.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||me.test(k)||ie.test(k)||xe.test(k))break;f+=`
`+S}!I&&!S.trim()&&(I=!0),g+=ue+`
`,e=e.substring(ue.length+1),k=$.slice(L)}}n.loose||(a?n.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(a=!0));let Q=null,ke;this.options.gfm&&(Q=this.rules.other.listIsTask.exec(f),Q&&(ke=Q[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),n.items.push({type:"list_item",raw:g,task:!!Q,checked:ke,loose:!1,text:f,tokens:[]}),n.raw+=g}let u=n.items.at(-1);if(u)u.raw=u.raw.trimEnd(),u.text=u.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let p=0;p<n.items.length;p++)if(this.lexer.state.top=!1,n.items[p].tokens=this.lexer.blockTokens(n.items[p].text,[]),!n.loose){let g=n.items[p].tokens.filter(k=>k.type==="space"),f=g.length>0&&g.some(k=>this.rules.other.anyLine.test(k.raw));n.loose=f}if(n.loose)for(let p=0;p<n.items.length;p++)n.items[p].loose=!0;return n}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),o=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:o,title:n}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=yi(t[1]),o=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===o.length){for(let a of o)this.rules.other.tableAlignRight.test(a)?i.align.push("right"):this.rules.other.tableAlignCenter.test(a)?i.align.push("center"):this.rules.other.tableAlignLeft.test(a)?i.align.push("left"):i.align.push(null);for(let a=0;a<r.length;a++)i.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:i.align[a]});for(let a of n)i.rows.push(yi(a,i.header.length).map((u,p)=>({text:u,tokens:this.lexer.inline(u),header:!1,align:i.align[p]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=Xt(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=fl(t[2],"()");if(i===-2)return;if(i>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let o=t[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(o);i&&(o=i[1],n=i[3])}else n=t[3]?t[3].slice(1,-1):"";return o=o.trim(),this.rules.other.startAngleBracket.test(o)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?o=o.slice(1):o=o.slice(1,-1)),Ai(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let o=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=t[o.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Ai(r,n,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!(!o||o[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(o[1]||o[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...o[0]].length-1,i,a,u=n,p=0,g=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+n);(o=g.exec(t))!=null;){if(i=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!i)continue;if(a=[...i].length,o[3]||o[4]){u+=a;continue}else if((o[5]||o[6])&&n%3&&!((n+a)%3)){p+=a;continue}if(u-=a,u>0)continue;a=Math.min(a,a+u+p);let f=[...o[0]][0].length,k=e.slice(0,n+o.index+f+a);if(Math.min(n,a)%2){let I=k.slice(1,-1);return{type:"em",raw:k,text:I,tokens:this.lexer.inlineTokens(I)}}let S=k.slice(2,-2);return{type:"strong",raw:k,text:S,tokens:this.lexer.inlineTokens(S)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),o=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return o&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,o;return t[2]==="@"?(r=t[1],o="mailto:"+r):(r=t[1],o=r),{type:"link",raw:t[0],text:r,href:o,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,o;if(t[2]==="@")r=t[0],o="mailto:"+r;else{let n;do n=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(n!==t[0]);r=t[0],t[1]==="www."?o="http://"+t[0]:o=t[0]}return{type:"link",raw:t[0],text:r,href:o,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ue=class go{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ft,this.options.tokenizer=this.options.tokenizer||new Dr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Se,block:Mr.normal,inline:jt.normal};this.options.pedantic?(r.block=Mr.pedantic,r.inline=jt.pedantic):this.options.gfm&&(r.block=Mr.gfm,this.options.breaks?r.inline=jt.breaks:r.inline=jt.gfm),this.tokenizer.rules=r}static get rules(){return{block:Mr,inline:jt}}static lex(t,r){return new go(r).lex(t)}static lexInline(t,r){return new go(r).inlineTokens(t)}lex(t){t=t.replace(Se.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let o=this.inlineQueue[r];this.inlineTokens(o.src,o.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],o=!1){for(this.options.pedantic&&(t=t.replace(Se.tabCharGlobal,"    ").replace(Se.spaceLine,""));t;){let n;if(this.options.extensions?.block?.some(a=>(n=a.call({lexer:this},t,r))?(t=t.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(t)){t=t.substring(n.raw.length);let a=r.at(-1);n.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(n);continue}if(n=this.tokenizer.code(t)){t=t.substring(n.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.text,this.inlineQueue.at(-1).src=a.text):r.push(n);continue}if(n=this.tokenizer.fences(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.heading(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.hr(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.blockquote(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.list(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.html(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.def(t)){t=t.substring(n.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},r.push(n));continue}if(n=this.tokenizer.table(t)){t=t.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.lheading(t)){t=t.substring(n.raw.length),r.push(n);continue}let i=t;if(this.options.extensions?.startBlock){let a=1/0,u=t.slice(1),p;this.options.extensions.startBlock.forEach(g=>{p=g.call({lexer:this},u),typeof p=="number"&&p>=0&&(a=Math.min(a,p))}),a<1/0&&a>=0&&(i=t.substring(0,a+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){let a=r.at(-1);o&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(n),o=i.length!==t.length,t=t.substring(n.raw.length);continue}if(n=this.tokenizer.text(t)){t=t.substring(n.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+n.raw,a.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(n);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let o=t,n=null;if(this.tokens.links){let p=Object.keys(this.tokens.links);if(p.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)p.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,n.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)i=n[2]?n[2].length:0,o=o.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);o=this.options.hooks?.emStrongMask?.call({lexer:this},o)??o;let a=!1,u="";for(;t;){a||(u=""),a=!1;let p;if(this.options.extensions?.inline?.some(f=>(p=f.call({lexer:this},t,r))?(t=t.substring(p.raw.length),r.push(p),!0):!1))continue;if(p=this.tokenizer.escape(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.tag(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.link(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(p.raw.length);let f=r.at(-1);p.type==="text"&&f?.type==="text"?(f.raw+=p.raw,f.text+=p.text):r.push(p);continue}if(p=this.tokenizer.emStrong(t,o,u)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.codespan(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.br(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.del(t)){t=t.substring(p.raw.length),r.push(p);continue}if(p=this.tokenizer.autolink(t)){t=t.substring(p.raw.length),r.push(p);continue}if(!this.state.inLink&&(p=this.tokenizer.url(t))){t=t.substring(p.raw.length),r.push(p);continue}let g=t;if(this.options.extensions?.startInline){let f=1/0,k=t.slice(1),S;this.options.extensions.startInline.forEach(I=>{S=I.call({lexer:this},k),typeof S=="number"&&S>=0&&(f=Math.min(f,S))}),f<1/0&&f>=0&&(g=t.substring(0,f+1))}if(p=this.tokenizer.inlineText(g)){t=t.substring(p.raw.length),p.raw.slice(-1)!=="_"&&(u=p.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=p.raw,f.text+=p.text):r.push(p);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Gr=class{options;parser;constructor(e){this.options=e||ft}space(e){return""}code({text:e,lang:t,escaped:r}){let o=(t||"").match(Se.notSpaceStart)?.[0],n=e.replace(Se.endingNewline,"")+`
`;return o?'<pre><code class="language-'+Fe(o)+'">'+(r?n:Fe(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:Fe(n,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,o="";for(let a=0;a<e.items.length;a++){let u=e.items[a];o+=this.listitem(u)}let n=t?"ol":"ul",i=t&&r!==1?' start="'+r+'"':"";return"<"+n+i+`>
`+o+"</"+n+`>
`}listitem(e){let t="";if(e.task){let r=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=r+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=r+" "+Fe(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:r+" ",text:r+" ",escaped:!0}):t+=r+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let n=0;n<e.header.length;n++)r+=this.tablecell(e.header[n]);t+=this.tablerow({text:r});let o="";for(let n=0;n<e.rows.length;n++){let i=e.rows[n];r="";for(let a=0;a<i.length;a++)r+=this.tablecell(i[a]);o+=this.tablerow({text:r})}return o&&(o=`<tbody>${o}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+o+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Fe(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let o=this.parser.parseInline(r),n=Si(e);if(n===null)return o;e=n;let i='<a href="'+e+'"';return t&&(i+=' title="'+Fe(t)+'"'),i+=">"+o+"</a>",i}image({href:e,title:t,text:r,tokens:o}){o&&(r=this.parser.parseInline(o,this.parser.textRenderer));let n=Si(e);if(n===null)return Fe(r);e=n;let i=`<img src="${e}" alt="${r}"`;return t&&(i+=` title="${Fe(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Fe(e.text)}},wo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},De=class Eo{options;renderer;textRenderer;constructor(t){this.options=t||ft,this.options.renderer=this.options.renderer||new Gr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new wo}static parse(t,r){return new Eo(r).parse(t)}static parseInline(t,r){return new Eo(r).parseInline(t)}parse(t,r=!0){let o="";for(let n=0;n<t.length;n++){let i=t[n];if(this.options.extensions?.renderers?.[i.type]){let u=i,p=this.options.extensions.renderers[u.type].call({parser:this},u);if(p!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(u.type)){o+=p||"";continue}}let a=i;switch(a.type){case"space":{o+=this.renderer.space(a);continue}case"hr":{o+=this.renderer.hr(a);continue}case"heading":{o+=this.renderer.heading(a);continue}case"code":{o+=this.renderer.code(a);continue}case"table":{o+=this.renderer.table(a);continue}case"blockquote":{o+=this.renderer.blockquote(a);continue}case"list":{o+=this.renderer.list(a);continue}case"html":{o+=this.renderer.html(a);continue}case"def":{o+=this.renderer.def(a);continue}case"paragraph":{o+=this.renderer.paragraph(a);continue}case"text":{let u=a,p=this.renderer.text(u);for(;n+1<t.length&&t[n+1].type==="text";)u=t[++n],p+=`
`+this.renderer.text(u);r?o+=this.renderer.paragraph({type:"paragraph",raw:p,text:p,tokens:[{type:"text",raw:p,text:p,escaped:!0}]}):o+=p;continue}default:{let u='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return o}parseInline(t,r=this.renderer){let o="";for(let n=0;n<t.length;n++){let i=t[n];if(this.options.extensions?.renderers?.[i.type]){let u=this.options.extensions.renderers[i.type].call({parser:this},i);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){o+=u||"";continue}}let a=i;switch(a.type){case"escape":{o+=r.text(a);break}case"html":{o+=r.html(a);break}case"link":{o+=r.link(a);break}case"image":{o+=r.image(a);break}case"strong":{o+=r.strong(a);break}case"em":{o+=r.em(a);break}case"codespan":{o+=r.codespan(a);break}case"br":{o+=r.br(a);break}case"del":{o+=r.del(a);break}case"text":{o+=r.text(a);break}default:{let u='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return o}},Vt=class{options;block;constructor(e){this.options=e||ft}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ue.lex:Ue.lexInline}provideParser(){return this.block?De.parse:De.parseInline}},ml=class{defaults=To();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=De;Renderer=Gr;TextRenderer=wo;Lexer=Ue;Tokenizer=Dr;Hooks=Vt;constructor(...e){this.use(...e)}walkTokens(e,t){let r=[];for(let o of e)switch(r=r.concat(t.call(this,o)),o.type){case"table":{let n=o;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,t));for(let i of n.rows)for(let a of i)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let n=o;r=r.concat(this.walkTokens(n.items,t));break}default:{let n=o;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let a=n[i].flat(1/0);r=r.concat(this.walkTokens(a,t))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let o={...r};if(o.async=this.defaults.async||o.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=t.renderers[n.name];i?t.renderers[n.name]=function(...a){let u=n.renderer.apply(this,a);return u===!1&&(u=i.apply(this,a)),u}:t.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[n.level];i?i.unshift(n.tokenizer):t[n.level]=[n.tokenizer],n.start&&(n.level==="block"?t.startBlock?t.startBlock.push(n.start):t.startBlock=[n.start]:n.level==="inline"&&(t.startInline?t.startInline.push(n.start):t.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(t.childTokens[n.name]=n.childTokens)}),o.extensions=t),r.renderer){let n=this.defaults.renderer||new Gr(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,u=r.renderer[a],p=n[a];n[a]=(...g)=>{let f=u.apply(n,g);return f===!1&&(f=p.apply(n,g)),f||""}}o.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Dr(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,u=r.tokenizer[a],p=n[a];n[a]=(...g)=>{let f=u.apply(n,g);return f===!1&&(f=p.apply(n,g)),f}}o.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new Vt;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,u=r.hooks[a],p=n[a];Vt.passThroughHooks.has(i)?n[a]=g=>{if(this.defaults.async&&Vt.passThroughHooksRespectAsync.has(i))return(async()=>{let k=await u.call(n,g);return p.call(n,k)})();let f=u.call(n,g);return p.call(n,f)}:n[a]=(...g)=>{if(this.defaults.async)return(async()=>{let k=await u.apply(n,g);return k===!1&&(k=await p.apply(n,g)),k})();let f=u.apply(n,g);return f===!1&&(f=p.apply(n,g)),f}}o.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;o.walkTokens=function(a){let u=[];return u.push(i.call(this,a)),n&&(u=u.concat(n.call(this,a))),u}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ue.lex(e,t??this.defaults)}parser(e,t){return De.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let o={...r},n={...this.defaults,...o},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&o.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=e),n.async)return(async()=>{let a=n.hooks?await n.hooks.preprocess(t):t,u=await(n.hooks?await n.hooks.provideLexer():e?Ue.lex:Ue.lexInline)(a,n),p=n.hooks?await n.hooks.processAllTokens(u):u;n.walkTokens&&await Promise.all(this.walkTokens(p,n.walkTokens));let g=await(n.hooks?await n.hooks.provideParser():e?De.parse:De.parseInline)(p,n);return n.hooks?await n.hooks.postprocess(g):g})().catch(i);try{n.hooks&&(t=n.hooks.preprocess(t));let a=(n.hooks?n.hooks.provideLexer():e?Ue.lex:Ue.lexInline)(t,n);n.hooks&&(a=n.hooks.processAllTokens(a)),n.walkTokens&&this.walkTokens(a,n.walkTokens);let u=(n.hooks?n.hooks.provideParser():e?De.parse:De.parseInline)(a,n);return n.hooks&&(u=n.hooks.postprocess(u)),u}catch(a){return i(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let o="<p>An error occurred:</p><pre>"+Fe(r.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(r);throw r}}},ut=new ml;function B(e,t){return ut.parse(e,t)}B.options=B.setOptions=function(e){return ut.setOptions(e),B.defaults=ut.defaults,wi(B.defaults),B};B.getDefaults=To;B.defaults=ft;B.use=function(...e){return ut.use(...e),B.defaults=ut.defaults,wi(B.defaults),B};B.walkTokens=function(e,t){return ut.walkTokens(e,t)};B.parseInline=ut.parseInline;B.Parser=De;B.parser=De.parse;B.Renderer=Gr;B.TextRenderer=wo;B.Lexer=Ue;B.lexer=Ue.lex;B.Tokenizer=Dr;B.Hooks=Vt;B.parse=B;var zh=B.options,Bh=B.setOptions,jh=B.use,Xh=B.walkTokens,Vh=B.parseInline;var Wh=De.parse,Kh=Ue.lex;var Y=Bn();function M(e,t={},...r){let o=document.createElement(e);for(let[n,i]of Object.entries(t))if(i!=null){if(n==="dataset"){Object.assign(o.dataset,i);continue}if(n==="style"){o.setAttribute("style",String(i));continue}if(n.startsWith("on")&&typeof i=="function"){o.addEventListener(n.slice(2).toLowerCase(),i);continue}if(n==="className"&&typeof i=="string"){o.className=i;continue}o[n]=i}for(let n of r)n!=null&&o.append(typeof n=="string"?document.createTextNode(n):n);return o}function Fr(e){e.replaceChildren()}var gl=864e5;function Ro(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function $i(e,t,r){return`${Ks}/dashboard/workspace/${e}/project/${t}/task/${r}`}var El={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function Yt(e){return El[e]??e}function Hi(e,t=new Date){if(!e)return null;let r=new Date(e);if(Number.isNaN(r.getTime()))return null;let o=Math.round((Br(r).getTime()-Br(t).getTime())/gl);return o===0?"Due today":o===1?"Due tomorrow":o===-1?"Due yesterday":o<0?`Overdue ${Math.abs(o)}d`:o<=7?`Due in ${o}d`:`Due ${r.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function Fi(e,t=new Date){if(!e)return!1;let r=new Date(e);return Number.isNaN(r.getTime())?!1:Br(r).getTime()<Br(t).getTime()}function Br(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function zi(e,t=160){if(!e)return"";let r=e.split(`
`).map(n=>n.trim()).find(n=>n.length>0);if(!r)return"";let o=r.replace(/^#{1,6}\s+/,"").replace(/^[*_>]+/,"").trim();return o.length>t?`${o.slice(0,t-1)}\u2026`:o}function Bi(e,t){let r=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&r.push(`Project: ${t.projectName}`),t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${Yt(e.priority)}`),e.dueDate&&r.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&r.push(t.url);let o=e.description?.trim();return o&&r.push("",o),r.join(`
`)}var Di=6e4,Gi=36e5,zr=864e5;function ji(e,t=Date.now()){if(!e)return null;let r=Date.parse(e);if(!Number.isFinite(r))return null;let o=Math.max(0,t-r);return o<Di?"just now":o<Gi?`${Math.floor(o/Di)}m`:o<zr?`${Math.floor(o/Gi)}h`:o<7*zr?`${Math.floor(o/zr)}d`:`${Math.floor(o/(7*zr))}w`}function Xi(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function Vi(e){return $i(e.workspaceId,e.task.projectId,e.task.id)}function Tl(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName??""}}function Wi(e){return{providerId:Ys,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:Vi(e),text:Bi(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},...e.columnName?{columnName:e.columnName}:{},url:Vi(e)}),author:e.task.assigneeName??void 0,data:Tl(e)}}async function Ki(e){await Y.attach(Wi(e))}async function Yi(e,t={}){let r=await Y.startSession({...Wi(e),navigation:"preserve",text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return r.sessionId===null?{sessionId:null,sent:r.sent,failure:r.failure}:{sessionId:r.sessionId,sent:r.sent}}var qi="preferences",Ji={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null};function Zi(e){if(typeof e!="object"||e===null)return{...Ji};let t=e,r=t.priorityFilter,o=r==="any"||!!r&&r in Js;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:o?r:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null}}async function qt(){try{return Zi(await Y.storage.get(qi))}catch{return{...Ji}}}async function Qi(e){let t=Zi({...await qt(),...e});try{await Y.storage.set(qi,t)}catch{}return t}var kl=`
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
`;function ea(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let r=document.createElement("style");r.id=t,r.textContent=kl,e.append(r)}var xl='<path d="M38.9 510.4C15 515.5 0 507.7 0 498.4V314.3c0-1 0-2 .1-3V127.7c.1-7.5 1.5-12.8 19-16.5l81.8-16.5c23.9-5.1 38.9 2.7 38.9 12v370.8c-.1 7.5-1.5 12.8-19 16.5zm186.2-46.6c-23.9 5.1-38.9-2.7-38.9-12v-184c0-1 0-2 .1-3V81.1c.1-7.5 1.5-12.8 19-16.5l81.8-16.5C311 43 326 50.8 326 60.1v370.8c-.1 7.5-1.5 12.8-19 16.5zm248-462.2C497-3.5 512 4.3 512 13.6v63.1L407.6 212.4 512 342v42.3c-.1 7.5-1.5 12.8-19 16.5l-81.8 16.5c-23.9 5.1-38.9-2.7-38.9-12V221.2c0-1 0-2 .1-3V34.6c.1-7.5 1.5-12.8 19-16.5z"/>';function bl(e=16){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 512 512"),t.setAttribute("width",String(e)),t.setAttribute("height",String(e)),t.setAttribute("aria-hidden","true"),t.innerHTML=xl,t.classList.add("kaneo-mark"),t}function ta(e){return M("span",{className:"kaneo-wordmark"},bl(16),M("span",{},e))}var _l={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function Sl(e){let t=_l[e],r={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},o=document.createElementNS("http://www.w3.org/2000/svg","svg");return o.setAttribute("viewBox","0 0 16 16"),o.setAttribute("width","16"),o.setAttribute("height","16"),o.setAttribute("aria-hidden","true"),o.innerHTML=r[e],o.classList.add("row-glyph"),o}function yl(e){let t=e.trim().slice(0,1).toUpperCase()||"?";return M("span",{className:"person"},M("span",{className:"person-avatar"},t),M("span",{className:"person-name"},e))}function Al(e,t=2){if(e.length===0)return null;let r=e.slice(0,t),o=M("span",{className:"label-chips"});for(let n of r)o.append(M("span",{className:"label-chip"},M("span",{className:"label-dot",style:`background:${n.color}`}),n.name));return e.length>r.length&&o.append(M("span",{className:"label-more"},`+${e.length-r.length}`)),o}function ra(e){let{task:t,ticketId:r,column:o,selected:n,onActivate:i}=e,a=Hi(t.dueDate),u=Fi(t.dueDate),p=ji(t.createdAt),g=M("div",{className:n?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:i}),f=M("div",{className:"row-body"});f.append(M("div",{className:"row-title"},t.title));let k=M("div",{className:"row-meta"});k.append(M("span",{className:"task-key"},r)),t.assigneeName&&k.append(yl(t.assigneeName)),p&&k.append(M("span",{},p));let S=t.subtaskCounts;S&&S.total>0&&k.append(M("span",{className:"tabular"},`${S.completed}/${S.total}`)),t.priority!=="no-priority"&&k.append(M("span",{},Yt(t.priority))),a&&k.append(M("span",{className:u?"overdue":""},a));let I=Al(t.labels??[]);return I&&k.append(I),f.append(k),g.append(Sl(Xi(o)),f),g.title=`${r} \xB7 ${o.name}`,g}var Jt=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function na(e,t,r={}){if(!r.force){let k=await Rl();if(k&&Date.now()-k.at<wl)return k.context}let[o,n]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(n.length===0)throw new Jt;let i=await qt(),a=t?n.find(k=>k.slug===t):void 0,u=(i.workspaceId&&n.find(k=>k.id===i.workspaceId)?.id)??a?.id??n[0].id;u!==i.workspaceId&&await Qi({workspaceId:u,projectId:null});let p=[],g=null;try{p=await e.listProjects(u)}catch(k){g=k instanceof Error?k:new Error(String(k))}let f={user:o,workspaces:n,workspaceId:u,projects:p,projectsError:g};return await vl(f),f}var oa="bootstrap-cache",wl=6e4;async function Rl(){try{let e=await Y.storage.get(oa);return e&&typeof e.at=="number"&&e.context?e:null}catch{return null}}async function vl(e){let t=JSON.parse(JSON.stringify({at:Date.now(),context:e}));try{await Y.storage.set(oa,t)}catch{}}function sa(e,t,r){if(e.length===0)return null;let o=e.find(a=>a.id===t);if(o)return o;let n=r?.toLowerCase();return(n?e.find(a=>a.slug.toLowerCase()===n):void 0)??e[0]}function ia(e){let t=e?.workspace?.trim(),r=e?.project?.trim(),o=e?.["openchamber-url"]?.trim();return{workspaceSlug:t||void 0,projectSlug:r||void 0,openchamberUrl:o||void 0}}var Ie=document.querySelector("#root");if(!Ie)throw new Error("Kaneo attach dialog is missing its #root element.");var Xr=Zs(e=>Y.request(e)),Zt=200,T={ready:null,context:null,project:null,boardTasks:[],columnNames:{},defaultStatus:"to-do",results:null,search:"",tab:"board",loading:!0,error:null,draft:{title:"",description:"",priority:"medium"},source:null},jr=0,vo=0;function Qt(e){return e instanceof pt?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Ot(e){return Ro(T.project?.slug??"",e.number)}function Ol(e){let t=T.search.trim().toLowerCase();return t?e.title.toLowerCase().includes(t)||Ot(e).toLowerCase().includes(t):!0}async function Io(){let e=++jr;T.loading=!0,Ge();try{let{workspaceSlug:t,projectSlug:r}=ia(T.ready?.settings),o=await na(Xr,t,{force:!0});if(e!==jr)return;T.context=o;let n=await qt();if(T.project=sa(o.projects,n.projectId,r),T.loading=!1,T.error=o.projectsError?Qt(o.projectsError):null,Ge(),T.project){let i=await Xr.getBoard(T.project.id);if(e!==jr)return;T.boardTasks=i.board.columns.flatMap(a=>a.tasks),T.columnNames=Object.fromEntries(i.board.columns.map(a=>[a.id,a.name])),T.defaultStatus=i.board.columns[0]?.id??"to-do",T.results=null}Ge()}catch(t){if(e!==jr)return;T.loading=!1,T.error=t instanceof Jt?t.message:`Could not reach Kaneo. ${Qt(t)}`,Ge()}}async function Il(){let e=++vo,t=T.context?.workspaceId,r=T.search.trim();if(!t||r.length<2){T.results=null,Ge();return}T.loading=!0,Ge();try{let o=await Xr.search(t,r,{...T.project?{projectId:T.project.id}:{},limit:40});if(e!==vo)return;let n=new Map(T.boardTasks.map(u=>[u.id,u])),i=o.results.filter(u=>u.type==="task");T.results=i.map(u=>n.get(u.id)).filter(u=>!!u);let a=i.length-T.results.length;T.loading=!1,T.error=a>0?`${a} match${a===1?" is":"es are"} outside the loaded board. Open the Kaneo web app to reach them.`:null,Ge()}catch(o){if(e!==vo)return;T.loading=!1,T.error=Qt(o),Oo()}}async function aa(e){try{await Ki({task:e,ticketId:Ot(e),workspaceId:T.context?.workspaceId??"",projectName:T.project?.name,columnName:T.columnNames[e.status]??e.status}),await Y.toast({kind:"success",message:`${Ot(e)} attached to the chat.`}),await Y.close()}catch(t){await Y.toast({kind:"error",message:`Attach failed: ${Qt(t)}`,dismiss:!0})}}async function Cl(e){let t=await Yi({task:e,ticketId:Ot(e),workspaceId:T.context?.workspaceId??"",projectName:T.project?.name,columnName:T.columnNames[e.status]??e.status});if(t.sessionId===null){await Y.toast({kind:"error",message:`No session was created${t.failure?` (${t.failure})`:""}. The worktree was kept.`,dismiss:!0});return}await Y.toast({kind:"success",message:`Session started for ${Ot(e)}.`}),await Y.close()}async function Ll(){if(!T.project)return;let e=T.draft.title.trim();if(e.length===0){T.error="A task needs a title.",Ge();return}try{let t=await Xr.createTask(T.project.id,{title:e.slice(0,Zt),description:T.draft.description,priority:T.draft.priority,status:T.defaultStatus});await Y.toast({kind:"success",message:`Created ${Ro(T.project.slug,t.number)} in ${T.project.name}.`}),await aa(t)}catch(t){T.error=Qt(t),Ge()}}var We=null,ht=null;function Ge(){if(Ie){if(Fr(Ie),We=null,ht=null,!T.ready){Cr(Ie,{label:"Connecting to Kaneo"});return}if(!T.ready.connection.connected){Ir(Ie,{title:"Kaneo is not connected",body:"Add an API token in Settings \u2192 Integrations \u2192 Kaneo."});return}if(T.source){ca();return}Pl()}}function Pl(){Ie?.append(ta("Attach a Kaneo task"));let e=M("div");if(Ie?.append(e),to(e,{items:[{id:"board",label:T.project?.slug.toUpperCase()??"Board"},{id:"create",label:"New"}],activeId:T.tab,onChange:r=>{T.tab=r==="create"?"create":"board",Ge()}}),T.tab==="create"){ca();return}if(T.context&&T.context.projects.length>1){let r=M("div");Ie?.append(r),Or(r,{label:"Project",searchable:!0,value:T.project?.id??"",options:T.context.projects.map(o=>({id:o.id,label:o.slug.toUpperCase()})),onChange:o=>{T.project=T.context?.projects.find(n=>n.id===o)??null,T.search="",T.results=null,T.loading=!0,Io()}})}let t=M("div");Ie?.append(t),Jn(t,{value:T.search,label:"Search Kaneo",placeholder:"Search this workspace",onChange:r=>{if(T.search=r,r.trim().length>=2){Il();return}T.results=null,Oo()}}),We=M("div",{className:"dialog-body"}),Ie?.append(We),ht=M("div",{className:"dialog-foot"}),Ie?.append(ht),Oo()}function Oo(){if(!We||!ht)return;if(Fr(We),Fr(ht),T.error){let o=M("div");We.append(o),Lr(o,{tone:T.results?"warning":"error",title:"Kaneo",body:T.error,...T.results?{}:{action:{label:"Retry",onClick:()=>void Io()}}})}let e=(T.results??T.boardTasks).filter(Ol);if(T.loading&&e.length===0){Cr(We,{label:"Loading tasks"});return}if(e.length===0){Ir(We,{title:T.search.trim()?"No task matches":"This project has no tasks",body:T.search.trim()?"Search runs inside the selected workspace.":"Use the New tab to create the first one."});return}let t=M("div",{className:"scroll"});We.append(t);for(let o of e)t.append(ra({task:o,ticketId:Ot(o),column:{slug:o.status,isFinal:!1,name:T.columnNames[o.status]??o.status},selected:!1,onActivate:()=>void aa(o)}));Me(ht,{label:"Cancel",variant:"ghost",onClick:()=>void Y.close()});let r=e[0];r&&Me(ht,{label:"Attach and start session",variant:"secondary",onClick:()=>void Cl(r)})}function ca(){let e=M("div",{className:"dialog-body"});if(Ie?.append(e),T.error){let i=M("div");e.append(i),Lr(i,{tone:"error",title:"Kaneo",body:T.error})}let t=M("div");e.append(t),vr(t,{label:"Title",value:T.draft.title,placeholder:"What needs doing?",error:T.draft.title.length>Zt?`Keep it under ${Zt} characters.`:void 0,onChange:i=>{T.draft.title=i}});let r=M("div");e.append(r),Or(r,{label:"Priority",value:T.draft.priority,options:qs.map(i=>({id:i,label:Yt(i)})),onChange:i=>{T.draft.priority=i}});let o=M("div");e.append(o),vr(o,{label:"Description",value:T.draft.description,multiline:!0,rows:5,placeholder:"Markdown is supported.",onChange:i=>{T.draft.description=i}});let n=M("div",{className:"dialog-foot"});Ie?.append(n),Me(n,{label:"Cancel",variant:"ghost",onClick:()=>void Y.close()}),Me(n,{label:"Create and attach",onClick:()=>void Ll()})}function Nl(e){let r=(e.kind==="message"?e.text:e.sessionTitle).split(`
`).filter(a=>a.trim().length>0),o=(zi(r[0]??"",Zt)||"Untitled task").slice(0,Zt),n=r.slice(1).join(`
`).trim(),i=e.kind==="session"?`Session: ${e.sessionTitle}`:"From a chat message";return{title:o,description:[i,n].filter(Boolean).join(`

`),priority:"medium"}}Y.onReady(e=>{jn(e,document.documentElement),ea(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,T.ready=e,_n(e.item)||Sn(e.item)?(T.source=e.item,T.draft=Nl(e.item),T.tab="create"):T.tab="board",Ge(),T.ready.connection.connected&&Io()});Y.onItem(e=>{if(!e||!("providerId"in e))return;let t=e.data;Y.toast({kind:"info",message:t?.ticketId?`${t.ticketId} is already attached to this chat.`:"That item is already attached to this chat."})});})();
