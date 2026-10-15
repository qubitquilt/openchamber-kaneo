"use strict";(()=>{var xl=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],bl=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],bs=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of xl)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of bl){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Ar=(e,t)=>{bs(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Rn="data-oc-scrolling",vr=`
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
:hover, [${Rn}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Rn}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Rn}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Rn}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Rr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",r=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=n.get(o);s!==void 0&&clearTimeout(s),n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var El=`(${Rr.toString()})(document);`;var Tl={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},ne=(e,t)=>`var(--${e}, var(--oc-${Tl[e]}, ${t}))`,ut=ne("surface-background","transparent"),On=ne("surface-elevated","transparent"),Kt=ne("surface-elevated-foreground","inherit"),nt=ne("surface-foreground","inherit"),ae=ne("surface-muted-foreground","gray"),Sl=ne("surface-muted","transparent"),Ue=ne("interactive-border","currentColor"),Pe=ne("interactive-hover","transparent"),ft=ne("interactive-active","transparent"),Or=ne("interactive-selection","transparent"),Ir=ne("interactive-selection-foreground","inherit"),Ss=ne("interactive-focus-ring","currentColor"),Ve=ne("primary","currentColor"),Cr=ne("primary-text","inherit"),Lr=ne("error-text","inherit"),_l=ne("font-sans","inherit"),Pr=ne("font-mono","monospace"),_s=ne("radius","9px"),Nr=`calc(${_s} - 2px)`,Es=`calc(${_s} - 4px)`,fe=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,Ts=`box-shadow: 0 0 0 2px ${Ss};`,In=e=>{let t=ne(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${ne(`${e}-text`,"inherit")}; }`},yl=`
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
`,ys=`
.oc-sdk { color: ${nt}; font-family: ${_l}; }
.oc-sdk :focus-visible { outline: none; ${Ts} }
.oc-sdk-mono { font-family: ${Pr}; }
.oc-sdk-muted { color: ${ae}; }
${In("success")}${In("warning")}${In("error")}${In("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ve}; --oc-sdk-tone-text: ${Cr}; }

.oc-sdk-btn { border-radius: ${Nr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Es}; }
.oc-sdk-btn[data-variant="default"] { color: ${Cr}; background: ${fe(Ve,10,ut)}; border-color: ${fe(Ve,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${fe(Ve,16,ut)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${fe(Ve,22,ut)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Sl}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-btn[data-variant="outline"] { background: ${On}; color: ${Kt}; border-color: ${Ue}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Pe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ft}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${ne("status-error","red")}; color: ${Lr}; background: ${fe("var(--oc-sdk-tone)",7,ut)}; border-color: ${fe("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${fe("var(--oc-sdk-tone)",9,ut)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${fe("var(--oc-sdk-tone)",11,ut)}; }

.oc-sdk-field-note { color: ${ae}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Lr}; }
.oc-sdk-input { border-radius: ${Nr}; background: ${On}; color: ${Kt}; box-shadow: inset 0 0 0 1px ${fe(Ue,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${ae}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Ss}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${ne("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${ne("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Pr}; }

.oc-sdk-search-icon { color: ${ae}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ve}; }
.oc-sdk-search-clear { border-radius: ${Es}; color: ${ae}; }
.oc-sdk-search-clear:hover { background: ${Pe}; color: ${nt}; }

.oc-sdk-trigger { border-color: ${Ue}; border-radius: ${Nr}; background: ${On}; color: ${Kt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${ae}; }
.oc-sdk-trigger-chevron { color: ${ae}; }
.oc-sdk-popup { --surface-foreground: ${Kt}; border-color: ${fe(Ue,60)}; border-radius: 12px; background: ${On}; color: ${Kt}; box-shadow: 0 8px 24px ${fe(nt,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Pe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Or}; color: ${Ir}; }
.oc-sdk-option-check { color: ${nt}; }
.oc-sdk-option[data-destructive="true"] { color: ${Lr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${fe(ne("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${ae}; }
.oc-sdk-popup-empty { color: ${ae}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ue}; border-radius: 4px; color: ${nt}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${fe(nt,60,Ue)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ue}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ut}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ve}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Ts} }
.oc-sdk-check-desc { color: ${ae}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${fe(nt,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${ae}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${nt}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ir}; background: ${Or}; border-color: ${Ue}; }
.oc-sdk-tab-count { color: ${ae}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Pe}; color: ${ae}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${fe("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Pe}; }
.oc-sdk-row[aria-selected="true"] { background: ${Or}; color: ${Ir}; }
.oc-sdk-row-lead { font-family: ${Pr}; color: ${ae}; }
.oc-sdk-row-sub { color: ${ae}; }
.oc-sdk-row-meta { color: ${ae}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${ae}; }

.oc-sdk-empty-body { color: ${ae}; }

.oc-sdk-spinner { color: ${ae}; }
.oc-sdk-spinner-ring { border-color: ${Ue}; border-top-color: ${Ve}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${fe("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${fe("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${ae}; }

.oc-sdk-separator { color: ${ae}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${fe(Ue,40)}; }

.oc-sdk-progress-label { color: ${ae}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ue}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ve}); }

.oc-sdk-text a { color: ${Cr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${fe(Ue,60)}; }
`,ee=`
${vr}
${yl}
${ys}`;var ws="oc-sdk-ui-style",rt=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},te=e=>{let t=document.getElementById(ws);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Rr(document);let n=document.createElement("style");n.id=ws,n.textContent=e,document.head.appendChild(n)},v=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},Ne=e=>{let t=v("button",e);return t.type="button",t},le=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)},Ge=(e,t,n)=>{n==null||n===""?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)},As=(e,t)=>{let n=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var wl=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},me=(e,t)=>{te(ee);let n=t,r=Ne("oc-sdk oc-sdk-btn"),o=wl(),s=document.createElement("span");r.append(s),e.append(r);let a=()=>{r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=!!n.disabled||!!n.loading,r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r?r.prepend(o):!n.loading&&o.parentNode===r&&o.remove(),le(s,n.label)},p=()=>{n.disabled||n.loading||n.onClick()};return r.addEventListener("click",p),a(),{update:c=>{n={...n,...c},a()},dispose:()=>{r.removeEventListener("click",p),r.remove()}}};var Mr=(e,t)=>{te(ee);let n=t,r=v("label","oc-sdk oc-sdk-field"),o=v("span","oc-sdk-field-label"),s=n.multiline?v("textarea","oc-sdk-input"):v("input","oc-sdk-input"),a=v("span","oc-sdk-field-note");r.append(o,s,a),e.append(r);let p=()=>{le(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement?s.type=n.password?"password":"text":s.rows=n.rows??3,s.value!==n.value&&(s.value=n.value),s.disabled=!!n.disabled,Ge(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let g=!!n.error;r.dataset.invalid=g?"true":"false",s.setAttribute("aria-invalid",g?"true":"false");let m=n.error??n.helper??"";le(a,m),a.hidden=m===""},c=()=>{n.onChange(s.value)};return s.addEventListener("input",c),p(),{update:g=>{n={...n,...g},p()},dispose:()=>{s.removeEventListener("input",c),r.remove()}}};var vs="http://www.w3.org/2000/svg",Al={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ye=(e,t,n)=>{let r=document.createElementNS(vs,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n&&r.setAttribute("class",n);let o=document.createElementNS(vs,"path");return o.setAttribute("d",Al[e]),r.append(o),r};var Ur=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-search"),o=v("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Ne("oc-sdk-search-clear");s.append(Ye("close",14)),s.tabIndex=-1,r.append(Ye("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let a=()=>{let m=n.placeholder??"Search";Ge(o,"placeholder",m),o.setAttribute("aria-label",n.label??m),s.setAttribute("aria-label","Clear search"),o.value!==n.value&&(o.value=n.value),r.dataset.active=n.value.trim()===""?"false":"true"},p=()=>{n.value!==""&&n.onChange(""),o.focus()},c=()=>{n.onChange(o.value)},g=m=>{m.key==="Escape"&&o.value!==""&&(m.preventDefault(),p())};return o.addEventListener("input",c),o.addEventListener("keydown",g),s.addEventListener("click",p),a(),n.autofocus&&o.focus(),{update:m=>{n={...n,...m},a()},dispose:()=>{o.removeEventListener("input",c),o.removeEventListener("keydown",g),s.removeEventListener("click",p),r.remove()}}};var qe=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},ot=(e,t,n)=>{let r=e.filter(c=>!c.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let a=r.findIndex(c=>c.id===t);return a===-1?n==="next"?o.id:s.id:r[Math.min(r.length-1,Math.max(0,a+(n==="next"?1:-1)))]?.id??null};var Rs=(e,t)=>`${e}-${t??""}`,Cn=(e,t,n,r)=>{let o=Ne("oc-sdk-option");o.id=Rs(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!n.disabled,t==="option"&&o.setAttribute("aria-selected",n.selected?"true":"false"),o.dataset.destructive=n.destructive?"true":"false";let s=v("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let a=v("span","oc-sdk-option-hint");a.textContent=n.hint,o.append(a)}if(t==="option"){o.dataset.mark="check";let a=v("span","oc-sdk-option-check");a.append(Ye("check",14)),o.append(a)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Ln=(e,t,n,r)=>{let o=Rs(n,r);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");Ge(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var vl=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;r>o&&n.top-8>o&&(e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`);let s=n.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(n.left-s))}px`)},Pn=(e,t,n,r)=>{e.append(n),vl(n,t);let o=As(e,r),s=()=>{r()},a=p=>{p.target instanceof Node&&n.contains(p.target)||r()};return window.addEventListener("resize",s),window.addEventListener("scroll",a,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",a,!0),n.remove()}};var Os=(e,t)=>{let n=t.trim().toLowerCase();return n?e.filter(r=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n)):[...e]},Rl=0,It=(e,t)=>{te(ee);let n=t,r=`oc-sdk-select-${Rl+=1}`,o=v("div","oc-sdk oc-sdk-select"),s=v("span","oc-sdk-field-label");s.id=`${r}-label`;let a=Ne("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",s.id);let p=v("span","oc-sdk-trigger-value");a.append(p,Ye("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,a),e.append(o);let c="",g=null,m=null,f=v("div","oc-sdk oc-sdk-popup"),b=v("div","oc-sdk-popup-search"),y=v("input","oc-sdk-input");y.type="text",y.autocomplete="off",b.append(y);let C=v("div");C.setAttribute("role","listbox"),C.tabIndex=-1,f.append(C);let j=()=>Os(n.options,n.searchable?c:""),N=()=>n.searchable?y:C,S=L=>{g=L,Ln(C,N(),r,L)},U=()=>{rt(C);let L=j();if(L.length===0){let ce=v("div","oc-sdk-popup-empty");ce.textContent="No matches",C.append(ce)}for(let ce of L)C.append(Cn(r,"option",{...ce,selected:ce.id===n.value},{hover:()=>S(ce.id),pick:()=>he(ce.id)}));S(L.some(ce=>ce.id===g)?g:L[0]?.id??null)},V=()=>{let L=m;m=null,L?.(),c="",y.value="",a.setAttribute("aria-expanded","false")},J=()=>{m||n.disabled||(g=n.value,y.placeholder=n.searchPlaceholder??"Search",n.searchable?f.prepend(b):b.remove(),U(),m=Pn(o,a,f,V),a.setAttribute("aria-expanded","true"),N().focus())},he=L=>{V(),a.focus(),L!==n.value&&n.onChange(L)},ge=()=>{m?V():J()},B=L=>{!m&&qe(L)&&(L.preventDefault(),J())},O=L=>{let ce=qe(L);ce?(L.preventDefault(),S(ot(j(),g,ce))):L.key==="Enter"?(L.preventDefault(),g&&he(g)):L.key==="Escape"?(L.preventDefault(),V(),a.focus()):n.searchable&&L.target!==y&&L.key.length===1&&!L.ctrlKey&&!L.metaKey&&y.focus()},R=()=>{c=y.value,U()},_e=L=>{m&&!(L.relatedTarget instanceof Node&&o.contains(L.relatedTarget))&&V()},oe=()=>{le(s,n.label),s.hidden=!n.label;let L=n.options.find(ce=>ce.id===n.value);le(p,L?.label??n.placeholder??"Select"),p.dataset.empty=L?"false":"true",a.disabled=!!n.disabled,m&&U()};return a.addEventListener("click",ge),a.addEventListener("keydown",B),f.addEventListener("keydown",O),y.addEventListener("input",R),o.addEventListener("focusout",_e),oe(),{update:L=>{n={...n,...L},oe()},dispose:()=>{V(),a.removeEventListener("click",ge),a.removeEventListener("keydown",B),f.removeEventListener("keydown",O),y.removeEventListener("input",R),o.removeEventListener("focusout",_e),o.remove()}}};var Ol=(e,t,n)=>{te(ee);let r=t,o=Ne("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=v("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");n==="checkbox"&&s.append(Ye("check",12));let a=v("span","oc-sdk-check-text"),p=v("span","oc-sdk-check-label"),c=v("span","oc-sdk-check-desc");a.append(p,c),o.append(s,a),e.append(o);let g=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=!!r.disabled,le(p,r.label),le(c,r.description),c.hidden=!r.description},m=()=>{r.disabled||r.onChange(!r.checked)};return o.addEventListener("click",m),g(),{update:f=>{r={...r,...f},g()},dispose:()=>{o.removeEventListener("click",m),o.remove()}}},Dr=(e,t)=>Ol(e,t,"checkbox");var $r=(e,t)=>{Ge(e,"data-tone",t&&t!=="neutral"?t:null)};var Il=0,Gr=(e,t)=>{te(ee);let n=t,r=`oc-sdk-list-${Il+=1}`,o=v("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,a=f=>`${r}-${f}`,p=f=>{s=f;for(let b of Array.from(o.children))b instanceof HTMLElement&&(b.dataset.active=b.id===a(f??"")?"true":"false");Ge(o,"aria-activedescendant",f?a(f):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},c=(f,b)=>{let y=v("span",f);return y.textContent=b,y},g=()=>{if(rt(o),Ge(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(c("oc-sdk-list-empty",n.emptyText??"Nothing here")),p(null);return}for(let b of n.items){let y=Ne("oc-sdk-row");y.id=a(b.id),y.setAttribute("role","option"),y.setAttribute("aria-selected",b.id===n.selectedId?"true":"false"),y.disabled=!!b.disabled,y.tabIndex=-1,b.leading&&y.append(c("oc-sdk-row-lead",b.leading));let C=v("span","oc-sdk-row-main");if(C.append(c("oc-sdk-row-title",b.title)),b.subtitle&&C.append(c("oc-sdk-row-sub",b.subtitle)),y.append(C),b.badge){let j=c("oc-sdk-badge",b.badge.label);$r(j,b.badge.tone),y.append(j)}b.meta&&y.append(c("oc-sdk-row-meta",b.meta)),y.addEventListener("click",()=>n.onSelect(b.id)),o.append(y)}let f=n.items.some(b=>b.id===s&&!b.disabled);p(f?s:n.selectedId??null)},m=f=>{let b=qe(f);if(b){f.preventDefault(),p(ot(n.items,s,b));return}(f.key==="Enter"||f.key===" ")&&s&&(f.preventDefault(),n.onSelect(s))};return o.addEventListener("keydown",m),g(),{update:f=>{n={...n,...f},g()},dispose:()=>{o.removeEventListener("keydown",m),o.remove()}}};var Ct=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-empty"),o=v("h2","oc-sdk-empty-title"),s=v("p","oc-sdk-empty-body"),a=v("div","oc-sdk-empty-action");r.append(o,s,a),e.append(r);let p=null,c=()=>{if(le(o,n.title),le(s,n.body),s.hidden=!n.body,a.hidden=!n.action,!n.action){p?.dispose(),p=null;return}let g={label:n.action.label,onClick:n.action.onClick};p?p.update(g):p=me(a,{...g,variant:"outline",size:"sm"})};return c(),{update:g=>{n={...n,...g},c()},dispose:()=>{p?.dispose(),p=null,r.remove()}}};var Je=(e,t={})=>{te(ee);let n=t,r=v("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=v("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=v("span");r.append(o,s),e.append(r);let a=()=>{r.dataset.size=n.size??"default",le(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return a(),{update:p=>{n={...n,...p},a()},dispose:()=>{r.remove()}}};var Wt=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-banner"),o=v("div","oc-sdk-banner-text"),s=v("div","oc-sdk-banner-title"),a=v("div","oc-sdk-banner-body"),p=v("div","oc-sdk-banner-action");o.append(s,a),r.append(o,p),e.append(r);let c=null,g=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),le(s,n.title),le(a,n.body),a.hidden=!n.body,p.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let m={label:n.action.label,onClick:n.action.onClick};c?c.update(m):c=me(p,{...m,variant:"outline",size:"xs"})};return g(),{update:m=>{n={...n,...m},g()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var Is=e=>e.filter(t=>!("separator"in t)),Cl=0,Nn=(e,t)=>{te(ee);let n=t,r=`oc-sdk-menu-${Cl+=1}`,o=v("div","oc-sdk oc-sdk-menu");e.append(o);let s=v("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let a=null,p=null,c=me(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{a?b():y()}}),g=o.querySelector("button");g?.setAttribute("aria-haspopup","menu");let m=S=>{p=S,Ln(s,s,r,S)},f=()=>{rt(s);for(let S of n.items){if("separator"in S){let U=v("div","oc-sdk-separator");U.dataset.labeled="false",s.append(U);continue}s.append(Cn(r,"menuitem",S,{hover:()=>m(S.id),pick:()=>C(S.id)}))}m(Is(n.items).some(S=>S.id===p)?p:null)},b=()=>{let S=a;a=null,S?.(),p=null,g?.setAttribute("aria-expanded","false")},y=()=>{a||!g||(f(),a=Pn(o,g,s,b),g.setAttribute("aria-expanded","true"),s.focus())},C=S=>{b(),g?.focus(),n.onSelect(S)},j=S=>{let U=qe(S);U?(S.preventDefault(),m(ot(Is(n.items),p,U))):S.key==="Enter"||S.key===" "?(S.preventDefault(),p&&C(p)):S.key==="Escape"&&(S.preventDefault(),b(),g?.focus())},N=S=>{a&&!(S.relatedTarget instanceof Node&&o.contains(S.relatedTarget))&&b()};return s.addEventListener("keydown",j),o.addEventListener("focusout",N),{update:S=>{n={...n,...S},c.update({label:n.label,variant:n.variant,size:n.size}),a&&f()},dispose:()=>{b(),s.removeEventListener("keydown",j),o.removeEventListener("focusout",N),c.dispose(),o.remove()}}};var Mn="https://cloud.kaneo.app",Cs=Mn.replace(/\/api\/?$/,""),Un="kaneo-tasks",Fr=100,Ls=["no-priority","low","medium","high","urgent"];var mt={"no-priority":0,low:1,medium:2,high:3,urgent:4};var Ae=class extends Error{status;code;constructor(t,n,r){super(r),this.name="KaneoError",this.status=t,this.code=n}};function Ll(e){if(!e)return;let t={};for(let[n,r]of Object.entries(e))r==null||r===""||(t[n]=String(r));return Object.keys(t).length>0?t:void 0}function Pl(e,t){let n=typeof t=="object"&&t!==null?t:{},r=typeof n.message=="string"&&n.message?n.message:`Kaneo answered ${e}.`;return new Ae(e,n.code??`HTTP_${e}`,r)}var Nl=10,Ml=2,Ul=800;function Ps(e){async function t({method:r,path:o,query:s,body:a}){let p=Ll(s),c="/api"+o,g;for(let b=0;g=await e({method:r,path:c,...p?{query:p}:{},...a===void 0?{}:{body:JSON.stringify(a)}}),!(g.status!==429||b>=Ml);b+=1)await new Promise(y=>setTimeout(y,Ul*2**b));let m=g,f;if(m.body)try{f=JSON.parse(m.body)}catch{throw m.status>=400?new Ae(m.status,"INVALID_RESPONSE",m.body.slice(0,400)):new Ae(m.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(m.status>=400)throw Pl(m.status,f);return f}async function n(r){let o=encodeURIComponent(r),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:Fr}}),a=s.data,p=s.pagination,c=1;for(;c<Math.min(p.totalPages,Nl);){c+=1;let g=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:c,limit:Fr}});for(let m of g.data.columns){let f=a.columns.find(b=>b.id===m.id);f&&f.tasks.push(...m.tasks)}a.archivedTasks.push(...g.data.archivedTasks),a.plannedTasks.push(...g.data.plannedTasks)}return{board:a,pagination:p,truncated:p.totalPages>c}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(r,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:r,includeArchived:o?"true":void 0}}),getBoard:n,getTask:r=>t({method:"GET",path:`/task/${encodeURIComponent(r)}`,query:{view:"detail"}}),getTaskByTicketId:(r,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(r)}`,query:{workspaceId:o}}),listAssignedTasks:r=>t({method:"GET",path:"/task/assigned",query:{workspaceId:r}}),search:(r,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:r,projectId:s.projectId,limit:s.limit??30}}),listLabels:r=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(r)}`}),listColumns:r=>t({method:"GET",path:`/column/${encodeURIComponent(r)}`}),listComments:r=>t({method:"GET",path:`/comment/${encodeURIComponent(r)}`}),createComment:(r,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(r)}`,body:{content:o}}),createTask:(r,o)=>t({method:"POST",path:`/task/${encodeURIComponent(r)}`,body:o}),updateTaskStatus:(r,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(r)}`,body:{status:o}}),updateTaskPriority:(r,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(r)}`,body:{priority:o}})}}function Dl(e){return e instanceof Ae?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Vt(e,t){return console.error(`${e} failed:`,t),Dl(t)}function $l(e,t){this.v=e,this.k=t}function Ns(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Gl(e){if(Array.isArray(e))return e}function Fl(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,s,a,p=[],c=!0,g=!1;try{if(s=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=s.call(n)).done)&&(p.push(r.value),p.length!==t);c=!0);}catch(m){g=!0,o=m}finally{try{if(!c&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(g)throw o}}return p}}function Hl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function zl(e,t){return Gl(e)||Fl(e,t)||Bl(e,t)||Hl()}function Bl(e,t){if(e){if(typeof e=="string")return Ns(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ns(e,t):void 0}}function Dn(e){var t,n;function r(s,a){try{var p=e[s](a),c=p.value,g=c instanceof $l;Promise.resolve(g?c.v:c).then(function(m){if(g){var f=s==="return"&&c.k?s:"next";if(!c.k||m.done)return r(f,m);m=e[f](m).value}o(!!p.done,m)},function(m){r("throw",m)})}catch(m){o(2,m)}}function o(s,a){s===2?t.reject(a):t.resolve({value:a,done:s}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(s,a){return new Promise(function(p,c){var g={key:s,arg:a,resolve:p,reject:c,next:null};n?n=n.next=g:(t=n=g,r(s,a))})},typeof e.return!="function"&&(this.return=void 0)}Dn.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},Dn.prototype.next=function(e){return this._invoke("next",e)},Dn.prototype.throw=function(e){return this._invoke("throw",e)},Dn.prototype.return=function(e){return this._invoke("return",e)};var Ys=Object.entries,Ms=Object.setPrototypeOf,jl=Object.isFrozen,qs=Object.getPrototypeOf,Js=Object.getOwnPropertyDescriptor,xe=Object.freeze,Te=Object.seal,Lt=Object.create,Zs=typeof Reflect<"u"&&Reflect,qr=Zs.apply,Jr=Zs.construct;xe||(xe=function(t){return t});Te||(Te=function(t){return t});qr||(qr=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Jr||(Jr=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ze=re(Array.prototype.forEach);Array.prototype.indexOf;var Xl=re(Array.prototype.lastIndexOf),Us=re(Array.prototype.pop),Yt=re(Array.prototype.push),Kl=re(Array.prototype.slice),Wl=re(Array.prototype.splice),Pt=Array.isArray,Hr=Qs(Set),zr=re(Set.prototype.add),qt=re(Set.prototype.has),ht=re(String.prototype.toLowerCase),Br=re(String.prototype.toString),Ds=re(String.prototype.match),Jt=re(String.prototype.replace),$s=re(String.prototype.indexOf),Vl=re(String.prototype.trim),Yl=re(Number.prototype.toString),ql=re(Boolean.prototype.toString),Gs=typeof BigInt>"u"?null:re(BigInt.prototype.toString),Fs=typeof Symbol>"u"?null:re(Symbol.prototype.toString),Ie=re(Object.prototype.hasOwnProperty),Zt=re(Object.prototype.toString),Ee=re(RegExp.prototype.test),Qe=Qs(TypeError);function re(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return qr(e,t,r)}}function Qs(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Jr(e,n)}}function F(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ht;if(Ms&&Ms(e,null),!Pt(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(jl(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Jl(e){for(let t=0;t<e.length;t++)Ie(e,t)||(e[t]=null);return e}function Me(e){let t=Lt(null);for(let r of Ys(e)){var n=zl(r,2);let o=n[0],s=n[1];Ie(e,o)&&(Pt(s)?t[o]=Jl(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Me(s):t[o]=s)}return t}function Zl(e){switch(typeof e){case"string":return e;case"number":return Yl(e);case"boolean":return ql(e);case"bigint":return Gs?Gs(e):"0";case"symbol":return Fs?Fs(e):"Symbol()";case"undefined":return Zt(e);case"function":case"object":{if(e===null)return Zt(e);let t=e,n=De(t,"toString");if(typeof n=="function"){let r=n(t);return typeof r=="string"?r:Zt(r)}return Zt(e)}default:return Zt(e)}}function De(e,t){for(;e!==null;){let r=Js(e,t);if(r){if(r.get)return re(r.get);if(typeof r.value=="function")return re(r.value)}e=qs(e)}function n(){return null}return n}function Ql(e,t){for(;e!==null;){let n=Js(e,t);if(n)return n.get?re(n.get):null;e=qs(e)}return null}function ec(e){try{return Ee(e,""),!0}catch{return!1}}var Hs=xe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),jr=xe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Xr=xe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),tc=xe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Kr=xe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),nc=xe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zs=xe(["#text"]),Bs=xe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Wr=xe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),js=xe(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),$n=xe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),rc=Te(/{{[\w\W]*|^[\w\W]*}}/g),oc=Te(/<%[\w\W]*|^[\w\W]*%>/g),sc=Te(/\${[\w\W]*/g),ic=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),ac=Te(/^aria-[\-\w]+$/),Xs=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),lc=Te(/^(?:\w+script|data):/i),cc=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),dc=Te(/^html$/i),pc=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),Vr=Te(/<[/\w!]/g),Ks=Te(/<[/\w]/g),uc=Te(/<\/no(script|embed|frames)/i),Ws=Te(/\/>/i),pe={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},fc=xe(F({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),mc=function(){return typeof window>"u"?null:window},hc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Vs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},st=function(t,n,r,o){return Ie(t,n)&&Pt(t[n])?F(o.base?Me(o.base):{},t[n],o.transform):r},Yr=function(t,n,r){let o=Ie(t,n)?t[n]:void 0;return o&&typeof o=="object"?Me(o):r()};function ei(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:mc(),t=E=>ei(E);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==pe.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,o=r.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,a=e.Node,p=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let g=e.DOMParser,m=e.trustedTypes,f=p.prototype,b=De(f,"cloneNode"),y=De(f,"remove"),C=De(f,"removeAttributeNode"),j=De(f,"nextSibling"),N=De(f,"childNodes"),S=De(f,"parentNode"),U=De(f,"shadowRoot"),V=De(f,"attributes"),J=a&&a.prototype?De(a.prototype,"nodeType"):null,he=a&&a.prototype?De(a.prototype,"nodeName"):null,ge=a&&a.prototype?De(a.prototype,"ownerDocument"):null,B=function(i){return J?J(i):i.nodeType},O=function(i){return he?he(i):i.nodeName},R=Ql(f,"namespaceURI"),_e=function(i){return R?R(i):i.namespaceURI};if(typeof s=="function"){let E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let oe,L="",ce,$t=!1,ke=0,se=function(){if(ke>0)throw Qe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ke=function(i){se(),ke++;try{return oe.createHTML(i)}finally{ke--}},be=function(i){se(),ke++;try{return oe.createScriptURL(i)}finally{ke--}},ie=function(){return $t||(ce=hc(m,o),$t=!0),ce},Q=n,at=Q.implementation,Gt=Q.createNodeIterator,fn=Q.createDocumentFragment,mn=Q.getElementsByTagName,Tt=r.importNode,X=Vs();t.isSupported=typeof Ys=="function"&&typeof S=="function"&&at&&at.createHTMLDocument!==void 0;let hn=rc,gn=oc,kn=sc,Le=ic,Ft=ac,Ht=lc,xn=cc,St=pc,zt=Xs,Z=null,l=F({},[...Hs,...jr,...Xr,...Kr,...zs]),u=null,w=F({},[...Bs,...Wr,...js,...$n]),_=Object.seal(Lt(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),K=null,q=null,Y=Object.seal(Lt(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Wo=!0,ir=!0,Vo=!1,ar=!0,We=!1,lt=!0,ct=!1,lr=!1,bn=null,En=null,cr=!1,_t=!1,Tn=!1,Sn=!1,Yo=!0,qo=!1,Jo="user-content-",dr=!0,pr=!1,dt=null,yt={},pt=null,Zo=F({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),Qo=null,es=F({},["audio","video","img","source","image","track"]),ts=null,ns=F({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),_n="http://www.w3.org/1998/Math/MathML",yn="http://www.w3.org/2000/svg",ze="http://www.w3.org/1999/xhtml",wt=ze,ur=!1,fr=null,Za=F({},[_n,yn,ze],Br),rs=xe(["mi","mo","mn","ms","mtext"]),mr=F({},rs),os=xe(["annotation-xml"]),hr=F({},os),Qa=F({},["title","style","font","a","script"]),Bt=null,el=["application/xhtml+xml","text/html"],tl="text/html",de=null,At=null,nl=n.createElement("form"),ss=function(i){return i instanceof RegExp||i instanceof Function},gr=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(At&&At===i)return;(!i||typeof i!="object")&&(i={}),i=Me(i),Bt=el.indexOf(i.PARSER_MEDIA_TYPE)===-1?tl:i.PARSER_MEDIA_TYPE,de=Bt==="application/xhtml+xml"?Br:ht,Z=st(i,"ALLOWED_TAGS",l,{transform:de}),u=st(i,"ALLOWED_ATTR",w,{transform:de}),fr=st(i,"ALLOWED_NAMESPACES",Za,{transform:Br}),ts=st(i,"ADD_URI_SAFE_ATTR",ns,{transform:de,base:ns}),Qo=st(i,"ADD_DATA_URI_TAGS",es,{transform:de,base:es}),pt=st(i,"FORBID_CONTENTS",Zo,{transform:de}),K=st(i,"FORBID_TAGS",Me({}),{transform:de}),q=st(i,"FORBID_ATTR",Me({}),{transform:de}),yt=Ie(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Me(i.USE_PROFILES):i.USE_PROFILES:!1,Wo=i.ALLOW_ARIA_ATTR!==!1,ir=i.ALLOW_DATA_ATTR!==!1,Vo=i.ALLOW_UNKNOWN_PROTOCOLS||!1,ar=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,We=i.SAFE_FOR_TEMPLATES||!1,lt=i.SAFE_FOR_XML!==!1,ct=i.WHOLE_DOCUMENT||!1,_t=i.RETURN_DOM||!1,Tn=i.RETURN_DOM_FRAGMENT||!1,Sn=i.RETURN_TRUSTED_TYPE||!1,cr=i.FORCE_BODY||!1,Yo=i.SANITIZE_DOM!==!1,qo=i.SANITIZE_NAMED_PROPS||!1,dr=i.KEEP_CONTENT!==!1,pr=i.IN_PLACE||!1,zt=ec(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:Xs,wt=typeof i.NAMESPACE=="string"?i.NAMESPACE:ze,mr=Yr(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>F({},rs)),hr=Yr(i,"HTML_INTEGRATION_POINTS",()=>F({},os));let d=Yr(i,"CUSTOM_ELEMENT_HANDLING",()=>Lt(null));if(_=Lt(null),Ie(d,"tagNameCheck")&&ss(d.tagNameCheck)&&(_.tagNameCheck=d.tagNameCheck),Ie(d,"attributeNameCheck")&&ss(d.attributeNameCheck)&&(_.attributeNameCheck=d.attributeNameCheck),Ie(d,"allowCustomizedBuiltInElements")&&typeof d.allowCustomizedBuiltInElements=="boolean"&&(_.allowCustomizedBuiltInElements=d.allowCustomizedBuiltInElements),Te(_),We&&(ir=!1),Tn&&(_t=!0),yt&&(Z=F({},zs),u=Lt(null),yt.html===!0&&(F(Z,Hs),F(u,Bs)),yt.svg===!0&&(F(Z,jr),F(u,Wr),F(u,$n)),yt.svgFilters===!0&&(F(Z,Xr),F(u,Wr),F(u,$n)),yt.mathMl===!0&&(F(Z,Kr),F(u,js),F(u,$n))),Y.tagCheck=null,Y.attributeCheck=null,Ie(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?Y.tagCheck=i.ADD_TAGS:Pt(i.ADD_TAGS)&&(Z===l&&(Z=Me(Z)),F(Z,i.ADD_TAGS,de))),Ie(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?Y.attributeCheck=i.ADD_ATTR:Pt(i.ADD_ATTR)&&(u===w&&(u=Me(u)),F(u,i.ADD_ATTR,de))),Ie(i,"ADD_FORBID_CONTENTS")&&Pt(i.ADD_FORBID_CONTENTS)&&(pt===Zo&&(pt=Me(pt)),F(pt,i.ADD_FORBID_CONTENTS,de)),dr&&(Z["#text"]=!0),ct&&F(Z,["html","head","body"]),Z.table&&(F(Z,["tbody"]),delete K.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw Qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let k=oe;oe=i.TRUSTED_TYPES_POLICY;try{L=Ke("")}catch(x){throw oe=k,x}}else i.TRUSTED_TYPES_POLICY===null?(oe=void 0,L=""):(oe===void 0&&(oe=ie()),oe&&typeof L=="string"&&(L=Ke("")));xe&&xe(i),At=i},is=F({},[...jr,...Xr,...tc]),as=F({},[...Kr,...nc]),rl=function(i,d,k){return d.namespaceURI===ze?i==="svg":d.namespaceURI===_n?i==="svg"&&(k==="annotation-xml"||mr[k]):!!is[i]},ol=function(i,d,k){return d.namespaceURI===ze?i==="math":d.namespaceURI===yn?i==="math"&&hr[k]:!!as[i]},sl=function(i,d,k){return d.namespaceURI===yn&&!hr[k]||d.namespaceURI===_n&&!mr[k]?!1:!as[i]&&(Qa[i]||!is[i])},il=function(i){let d=_e(i),k=ht(O(i)),x=S(i),A,P;return x&&B(x)===pe.element?(A={namespaceURI:_e(x)},P=ht(O(x))):(A={namespaceURI:wt},P="template"),fr[d]?d===yn?rl(k,A,P):d===_n?ol(k,A,P):d===ze?sl(k,A,P):!!(Bt==="application/xhtml+xml"&&fr[d]):!1},et=function(i){Yt(t.removed,{element:i});try{S(i).removeChild(i)}catch{if(y(i),!S(i))throw Qe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},ls=function(i,d,k){try{C(i,d)}catch{try{i.removeAttribute(k)}catch{}}},kr=function(i){br(i);let d=N(i);d&&Ze(Kl(d),x=>{try{y(x)}catch{}});let k=B(i)===pe.element?V(i):null;if(k)for(let x=k.length-1;x>=0;--x){let A=k[x],P=A&&A.name;typeof P=="string"&&ls(i,A,P)}},vt=function(i,d,k){if(!k)try{k=d.getAttributeNode(i)}catch{k=null}Yt(t.removed,{attribute:k||null,from:d});try{k?C(d,k):d.removeAttribute(i)}catch{try{d.removeAttribute(i)}catch{}}if(i==="is")if(_t||Tn)try{et(d)}catch{}else try{d.setAttribute(i,"")}catch{}},cs=function(i){let d=V(i);if(d)for(let k=d.length-1;k>=0;--k){let x=d[k],A=x&&x.name;typeof A!="string"||u[de(A)]||ls(i,x,A)}},xr=function(i,d){let k=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,x=[i];for(;x.length>0;){let A=x.pop();if(d(A)===!1)continue;if(k&&B(A)===pe.element){let D=U(A);tt(D)&&x.push(D)}let P=N(A);if(P)for(let D=P.length-1;D>=0;--D)x.push(P[D])}},br=function(i){xr(i,d=>{B(d)===pe.element&&cs(d)})},Er=function(i){let d=[];return xr(i,k=>{d.push(k)},!0),d},al=function(i,d){let k=Hr();Ze(Er(i),x=>{B(x)===pe.element&&zr(k,x)}),Ze(d,x=>{B(x)===pe.element&&!qt(k,x)&&cs(x)})},ds=function(i,d){let k=!1;return Ze(t.removed,x=>{x.element&&(k=k||x.element===i,br(x.element))}),al(i,d),k},ll=8,cl=function(i,d){let k=dt,x=null,A=()=>(x||(x=Hr(),Ze(d,P=>{zr(x,P)})),x);for(let P=0;;P++){let D=Er(i),ue=[i],Be=!1;if(Ze(D,we=>{B(we)===pe.documentFragment?Yt(ue,we):!Be&&!qt(k,we)&&(Be=qt(A(),we))}),!Be)return;if(P>=ll)throw Qe("the tree kept changing during in-place sanitization; refusing to return it");Ze(ue,(we,Re)=>{dl(we,Re>0,i,A())})}},dl=function(i,d,k,x){let A=Tr(i),P;for(;P=A.nextNode();)!qt(x,P)||qt(dt,P)||(d&&$e(X.uponSanitizeShadowNode,P,null),_r(P,k),yr(P,k),tt(P.content)&&Xt(P.content))},pl=function(i){dt&&zr(dt,i)},ps=function(i,d){return lt?i==="patchsrc"?!0:i==="for"&&d!=="label"&&d!=="output":!1},ul=function(i){lt&&xr(i,d=>{let k=B(d);if(k===pe.processingInstruction||k===pe.comment&&Ee(Ks,d.data)){try{y(d)}catch{}return!1}if(k===pe.element){let x=d,A=de(O(d));try{x.hasAttribute&&x.hasAttribute("patchsrc")&&x.removeAttribute("patchsrc"),x.hasAttribute&&x.hasAttribute("for")&&ps("for",A)&&x.removeAttribute("for")}catch{}}return!0})},us=function(i){let d=null,k=null;if(cr)i="<remove></remove>"+i;else{let P=Ds(i,/^[\r\n\t ]+/);k=P&&P[0]}Bt==="application/xhtml+xml"&&wt===ze&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");let x=oe?Ke(i):i;if(wt===ze)try{d=new g().parseFromString(x,Bt)}catch{}if(!d||!d.documentElement){d=at.createDocument(wt,"template",null);try{d.documentElement.innerHTML=ur?L:x}catch{}}let A=d.body||d.documentElement;return i&&k&&A.insertBefore(n.createTextNode(k),A.childNodes[0]||null),wt===ze?mn.call(d,ct?"html":"body")[0]:ct?d.documentElement:A},Tr=function(i){let d=ge?ge(i):i.ownerDocument;return Gt.call(d||i,i,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},wn=function(i){return i=Jt(i,hn," "),i=Jt(i,gn," "),i=Jt(i,kn," "),i},Sr=function(i){var d;fs(i);let k=(d=i.querySelectorAll)===null||d===void 0?void 0:d.call(i,"template");k&&Ze(k,x=>{tt(x.content)&&Sr(x.content)})},fs=function(i){i.normalize();let d=ge?ge(i):i.ownerDocument,k=Gt.call(d||i,i,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),x=k.nextNode();for(;x;)x.data=wn(x.data),x=k.nextNode()},An=function(i){let d=he?he(i):null;return typeof d!="string"||de(d)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==V(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==J(i)||i.childNodes!==N(i)},tt=function(i){if(!J||typeof i!="object"||i===null)return!1;try{return J(i)===pe.documentFragment}catch{return!1}},jt=function(i){if(!J||typeof i!="object"||i===null)return!1;try{return typeof J(i)=="number"}catch{return!1}};function $e(E,i,d){E.length!==0&&Ze(E,k=>{k.call(t,i,d,At)})}let fl=function(i,d){return!!(lt&&i.hasChildNodes()&&!jt(i.firstElementChild)&&Ee(Vr,i.textContent)&&Ee(Vr,i.innerHTML)||lt&&fc[d]&&B(i)===pe.element&&_e(i)===ze&&(jt(i.firstElementChild)||typeof i.textContent=="string"&&Ee(Vr,i.textContent))||i.nodeType===pe.processingInstruction||lt&&i.nodeType===pe.comment&&Ee(Ks,i.data))},vn=function(i,d){if(i instanceof RegExp)return Ee(i,d);if(i instanceof Function){for(var k=arguments.length,x=new Array(k>2?k-2:0),A=2;A<k;A++)x[A-2]=arguments[A];return!!i(d,...x)}return!1},ml=function(i,d,k){if(!K[d]&&gs(d)&&vn(_.tagNameCheck,d))return!1;if(dr&&!pt[d]&&!pt[ht(d)]){let x=S(i),A=N(i);if(A&&x){let P=A.length;for(let D=P-1;D>=0;--D){let ue=i===k?b(A[D],!0):A[D];x.insertBefore(ue,j(i))}}}return et(i),!0},ms=function(i,d,k,x){return i.length===0?d:d===k||d===x?Me(d):d},Rt=function(i,d){return i===d||S(i)!==null?!1:(pr&&br(i),!0)},_r=function(i,d){if(pl(i),$e(X.beforeSanitizeElements,i,null),Rt(i,d))return!0;if(An(i))return et(i),!0;let k=de(O(i));if(Z=ms(X.uponSanitizeElement,Z,l,bn),$e(X.uponSanitizeElement,i,{tagName:k,allowedTags:Z}),Rt(i,d))return!0;if(fl(i,k))return et(i),!0;if(K[k]||!(Y.tagCheck instanceof Function&&Y.tagCheck(k))&&!Z[k]){let x=ml(i,k,d);return x===!1&&($e(X.afterSanitizeElements,i,null),Rt(i,d))?!0:x}if(B(i)===pe.element&&!il(i)||(k==="noscript"||k==="noembed"||k==="noframes")&&Ee(uc,i.innerHTML))return et(i),!0;if(We&&i.nodeType===pe.text){let x=wn(i.textContent);i.textContent!==x&&(Yt(t.removed,{element:i.cloneNode()}),i.textContent=x)}return $e(X.afterSanitizeElements,i,null),Rt(i,d)},hs=function(i,d,k){if(q[d]||ps(d,i)||Yo&&(d==="id"||d==="name")&&(k in n||k in nl))return!1;let x=u[d]||Y.attributeCheck instanceof Function&&Y.attributeCheck(d,i);return ir&&Ee(Le,d)||Wo&&Ee(Ft,d)?!0:x?ts[d]||Ee(zt,Jt(k,xn,""))||(d==="src"||d==="xlink:href"||d==="href")&&i!=="script"&&$s(k,"data:")===0&&Qo[i]||Vo&&!Ee(Ht,Jt(k,xn,""))?!0:!k:gs(i)&&vn(_.tagNameCheck,i)&&vn(_.attributeNameCheck,d,i)||d==="is"&&_.allowCustomizedBuiltInElements&&vn(_.tagNameCheck,k)},hl=F({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),gs=function(i){return!hl[ht(i)]&&Ee(St,i)},gl=function(i,d,k,x){if(oe&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!k)switch(m.getAttributeType(i,d)){case"TrustedHTML":return Ke(x);case"TrustedScriptURL":return be(x)}return x},kl=function(i,d,k,x){try{return k?i.setAttributeNS(k,d,x):i.setAttribute(d,x),An(i)?(et(i),!1):!0}catch{return vt(d,i),!1}},ks=function(i,d){return lt&&Ee(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,d)?!0:ht(i)==="attributename"&&Ds(d,"href")!==null},yr=function(i,d){if($e(X.beforeSanitizeAttributes,i,null),Rt(i,d))return;let k=i.attributes;if(!k||An(i))return;u=ms(X.uponSanitizeAttribute,u,w,En);let x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},A=k.length,P=de(i.nodeName);for(;A--;){let D=k[A],ue=D.name,Be=D.namespaceURI,we=D.value,Re=de(ue),Ot=we,Oe=ue==="value"?Ot:Vl(Ot),xs=!1;if(x.attrName=Re,x.attrValue=Oe,x.keepAttr=!0,x.forceKeepAttr=void 0,$e(X.uponSanitizeAttribute,i,x),Oe=x.attrValue,qo&&(Re==="id"||Re==="name")&&$s(Oe,Jo)!==0&&(vt(ue,i,D),Oe=Jo+Oe,xs=!0),ks(ue,Oe)){vt(ue,i,D);continue}if(!x.forceKeepAttr){if(!x.keepAttr){vt(ue,i,D);continue}if(!ar&&Ee(Ws,Oe)){vt(ue,i,D);continue}if(We&&(Oe=wn(Oe)),!hs(P,Re,Oe)){vt(ue,i,D);continue}Oe=gl(P,Re,Be,Oe),Oe!==Ot&&kl(i,ue,Be,Oe)&&xs&&Us(t.removed)}}$e(X.afterSanitizeAttributes,i,null),Rt(i,d)},Xt=function(i){let d=null,k=Tr(i);for($e(X.beforeSanitizeShadowDOM,i,null);d=k.nextNode();)if($e(X.uponSanitizeShadowNode,d,null),_r(d,i),yr(d,i),tt(d.content)&&Xt(d.content),B(d)===pe.element){let x=U(d);tt(x)&&(wr(x),Xt(x))}We&&fs(i),$e(X.afterSanitizeShadowDOM,i,null)},wr=function(i){let d=[{node:i,shadow:null}];for(;d.length>0;){let k=d.pop();if(k.shadow){Xt(k.shadow);continue}let x=k.node,A=B(x)===pe.element,P=N(x);if(P)for(let D=P.length-1;D>=0;--D)d.push({node:P[D],shadow:null});if(A){let D=he?he(x):null;if(typeof D=="string"&&de(D)==="template"){let ue=x.content;tt(ue)&&d.push({node:ue,shadow:null})}}if(A){let D=U(x);tt(D)&&d.push({node:null,shadow:D},{node:D,shadow:null})}}};return t.sanitize=function(E){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,k=null,x=null,A=null;if(ur=!E,ur&&(E="<!-->"),typeof E!="string"&&!jt(E)&&(E=Zl(E),typeof E!="string"))throw Qe("dirty is not a string, aborting");if(!t.isSupported)return E;lr?(Z=bn,u=En):gr(i),(X.uponSanitizeElement.length>0||X.uponSanitizeAttribute.length>0)&&(Z=Me(Z)),X.uponSanitizeAttribute.length>0&&(u=Me(u)),t.removed=[];let P=pr&&typeof E!="string"&&jt(E),D=[],ue=dt;if(P){ul(E);let Re=O(E);if(typeof Re=="string"){let Ot=de(Re);if(!Z[Ot]||K[Ot])throw kr(E),Qe("root node is forbidden and cannot be sanitized in-place")}if(An(E))throw kr(E),Qe("root node is clobbered and cannot be sanitized in-place");D=Er(E),dt=Hr()}else if(jt(E))d=us("<!---->"),k=d.ownerDocument.importNode(E,!0),k.nodeType===pe.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?d=k:d.appendChild(k),wr(d);else{if(!_t&&!We&&!ct&&E.indexOf("<")===-1)return oe&&Sn?Ke(E):E;if(d=us(E),!d)return _t?null:Sn?L:""}d&&cr&&et(d.firstChild);let Be=P?E:d;try{P&&wr(E);let Re=Tr(Be);for(;x=Re.nextNode();)_r(x,Be),yr(x,Be),tt(x.content)&&Xt(x.content);P&&cl(E,D)}catch(Re){throw P&&(kr(E),ds(E,D)),Re}finally{dt=ue}if(P){if(ds(E,D))throw Qe("a node selected for removal could not be safely returned; refusing to sanitize in place");return We&&Sr(E),E}if(_t){if(We&&Sr(d),Tn)for(A=fn.call(d.ownerDocument);d.firstChild;)A.appendChild(d.firstChild);else A=d;return(u.shadowroot||u.shadowrootmode)&&(A=Tt.call(r,A,!0)),A}let we=ct?d.outerHTML:d.innerHTML;return ct&&Z["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&Ee(dc,d.ownerDocument.doctype.name)&&(we="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+we),We&&(we=wn(we)),oe&&Sn?Ke(we):we},t.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};gr(E),lr=!0,bn=Z,En=u},t.clearConfig=function(){At=null,lr=!1,bn=null,En=null,oe=ce,L=""},t.isValidAttribute=function(E,i,d){At||gr({});let k=de(E),x=de(i);return typeof d=="string"&&(ks(i,d)||!ar&&Ee(Ws,d))?!1:hs(k,x,d)},t.addHook=function(E,i){typeof i=="function"&&Ie(X,E)&&Yt(X[E],i)},t.removeHook=function(E,i){if(Ie(X,E)){if(i!==void 0){let d=Xl(X[E],i);return d===-1?void 0:Wl(X[E],d,1)[0]}return Us(X[E])}},t.removeHooks=function(E){Ie(X,E)&&(X[E]=[])},t.removeAllHooks=function(){X=Vs()},t}var ti=ei();function to(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=to();function li(e){kt=e}var nn={exec:()=>null};function z(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let a=typeof s=="string"?s:s.source;return a=a.replace(ve.caret,"$1"),n=n.replace(o,a),r},getRegex:()=>new RegExp(n,t)};return r}var gc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},kc=/^(?:[ \t]*(?:\n|$))+/,xc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,bc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ec=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,no=/(?:[*+-]|\d{1,9}[.)])/,ci=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,di=z(ci).replace(/bull/g,no).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Tc=z(ci).replace(/bull/g,no).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ro=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Sc=/^[^\n]+/,oo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,_c=z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",oo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),yc=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,no).getRegex(),Bn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",so=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,wc=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",so).replace("tag",Bn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),pi=z(ro).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bn).getRegex(),Ac=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",pi).getRegex(),io={blockquote:Ac,code:xc,def:_c,fences:bc,heading:Ec,hr:rn,html:wc,lheading:di,list:yc,newline:kc,paragraph:pi,table:nn,text:Sc},ni=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bn).getRegex(),vc={...io,lheading:Tc,table:ni,paragraph:z(ro).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ni).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Bn).getRegex()},Rc={...io,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",so).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(ro).replace("hr",rn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",di).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Oc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ic=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ui=/^( {2,}|\\)\n(?!\s*$)/,Cc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,jn=/[\p{P}\p{S}]/u,ao=/[\s\p{P}\p{S}]/u,fi=/[^\s\p{P}\p{S}]/u,Lc=z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ao).getRegex(),mi=/(?!~)[\p{P}\p{S}]/u,Pc=/(?!~)[\s\p{P}\p{S}]/u,Nc=/(?:[^\s\p{P}\p{S}]|~)/u,Mc=z(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",gc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),hi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Uc=z(hi,"u").replace(/punct/g,jn).getRegex(),Dc=z(hi,"u").replace(/punct/g,mi).getRegex(),gi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$c=z(gi,"gu").replace(/notPunctSpace/g,fi).replace(/punctSpace/g,ao).replace(/punct/g,jn).getRegex(),Gc=z(gi,"gu").replace(/notPunctSpace/g,Nc).replace(/punctSpace/g,Pc).replace(/punct/g,mi).getRegex(),Fc=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,fi).replace(/punctSpace/g,ao).replace(/punct/g,jn).getRegex(),Hc=z(/\\(punct)/,"gu").replace(/punct/g,jn).getRegex(),zc=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Bc=z(so).replace("(?:-->|$)","-->").getRegex(),jc=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Bc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Fn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Xc=z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Fn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ki=z(/^!?\[(label)\]\[(ref)\]/).replace("label",Fn).replace("ref",oo).getRegex(),xi=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",oo).getRegex(),Kc=z("reflink|nolink(?!\\()","g").replace("reflink",ki).replace("nolink",xi).getRegex(),ri=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,lo={_backpedal:nn,anyPunctuation:Hc,autolink:zc,blockSkip:Mc,br:ui,code:Ic,del:nn,emStrongLDelim:Uc,emStrongRDelimAst:$c,emStrongRDelimUnd:Fc,escape:Oc,link:Xc,nolink:xi,punctuation:Lc,reflink:ki,reflinkSearch:Kc,tag:jc,text:Cc,url:nn},Wc={...lo,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",Fn).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Fn).getRegex()},Zr={...lo,emStrongRDelimAst:Gc,emStrongLDelim:Dc,url:z(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ri).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:z(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ri).getRegex()},Vc={...Zr,br:z(ui).replace("{2,}","*").getRegex(),text:z(Zr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Gn={normal:io,gfm:vc,pedantic:Rc},Qt={normal:lo,gfm:Zr,breaks:Vc,pedantic:Wc},Yc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},oi=e=>Yc[e];function je(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,oi)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,oi);return e}function si(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function ii(e,t){let n=e.replace(ve.findPipe,(s,a,p)=>{let c=!1,g=a;for(;--g>=0&&p[g]==="\\";)c=!c;return c?"|":" |"}),r=n.split(ve.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ve.slashPipe,"|");return r}function en(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function qc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ai(e,t,n,r,o){let s=t.href,a=t.title||null,p=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:a,text:p,tokens:r.inlineTokens(p)};return r.state.inLink=!1,c}function Jc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let a=s.match(n.other.beginningSpace);if(a===null)return s;let[p]=a;return p.length>=o.length?s.slice(o.length):s}).join(`
`)}var Hn=class{options;rules;lexer;constructor(e){this.options=e||kt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Jc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=en(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:en(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=en(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let a=!1,p=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))p.push(n[c]),a=!0;else if(!a)p.push(n[c]);else break;n=n.slice(c);let g=p.join(`
`),m=g.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${g}`:g,o=o?`${o}
${m}`:m;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(m,s,!0),this.lexer.state.top=f,n.length===0)break;let b=s.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let y=b,C=y.raw+`
`+n.join(`
`),j=this.blockquote(C);s[s.length-1]=j,r=r.substring(0,r.length-y.raw.length)+j.raw,o=o.substring(0,o.length-y.text.length)+j.text;break}else if(b?.type==="list"){let y=b,C=y.raw+`
`+n.join(`
`),j=this.list(C);s[s.length-1]=j,r=r.substring(0,r.length-b.raw.length)+j.raw,o=o.substring(0,o.length-y.raw.length)+j.raw,n=C.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,g="",m="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;g=t[0],e=e.substring(g.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),b=e.split(`
`,1)[0],y=!f.trim(),C=0;if(this.options.pedantic?(C=2,m=f.trimStart()):y?C=t[1].length+1:(C=t[2].search(this.rules.other.nonSpaceChar),C=C>4?1:C,m=f.slice(C),C+=t[1].length),y&&this.rules.other.blankLine.test(b)&&(g+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let S=this.rules.other.nextBulletRegex(C),U=this.rules.other.hrRegex(C),V=this.rules.other.fencesBeginRegex(C),J=this.rules.other.headingBeginRegex(C),he=this.rules.other.htmlBeginRegex(C);for(;e;){let ge=e.split(`
`,1)[0],B;if(b=ge,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),B=b):B=b.replace(this.rules.other.tabCharGlobal,"    "),V.test(b)||J.test(b)||he.test(b)||S.test(b)||U.test(b))break;if(B.search(this.rules.other.nonSpaceChar)>=C||!b.trim())m+=`
`+B.slice(C);else{if(y||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||J.test(f)||U.test(f))break;m+=`
`+b}!y&&!b.trim()&&(y=!0),g+=ge+`
`,e=e.substring(ge.length+1),f=B.slice(C)}}o.loose||(a?o.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(a=!0));let j=null,N;this.options.gfm&&(j=this.rules.other.listIsTask.exec(m),j&&(N=j[0]!=="[ ] ",m=m.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:g,task:!!j,checked:N,loose:!1,text:m,tokens:[]}),o.raw+=g}let p=o.items.at(-1);if(p)p.raw=p.raw.trimEnd(),p.text=p.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let c=0;c<o.items.length;c++)if(this.lexer.state.top=!1,o.items[c].tokens=this.lexer.blockTokens(o.items[c].text,[]),!o.loose){let g=o.items[c].tokens.filter(f=>f.type==="space"),m=g.length>0&&g.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=m}if(o.loose)for(let c=0;c<o.items.length;c++)o.items[c].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ii(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<n.length;a++)s.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:s.align[a]});for(let a of o)s.rows.push(ii(a,s.header.length).map((p,c)=>({text:p,tokens:this.lexer.inline(p),header:!1,align:s.align[c]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=en(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=qc(t[2],"()");if(s===-2)return;if(s>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ai(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return ai(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,a,p=o,c=0,g=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+o);(r=g.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(a=[...s].length,r[3]||r[4]){p+=a;continue}else if((r[5]||r[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(p-=a,p>0)continue;a=Math.min(a,a+p+c);let m=[...r[0]][0].length,f=e.slice(0,o+r.index+m+a);if(Math.min(o,a)%2){let y=f.slice(1,-1);return{type:"em",raw:f,text:y,tokens:this.lexer.inlineTokens(y)}}let b=f.slice(2,-2);return{type:"strong",raw:f,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Fe=class Qr{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kt,this.options.tokenizer=this.options.tokenizer||new Hn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ve,block:Gn.normal,inline:Qt.normal};this.options.pedantic?(n.block=Gn.pedantic,n.inline=Qt.pedantic):this.options.gfm&&(n.block=Gn.gfm,this.options.breaks?n.inline=Qt.breaks:n.inline=Qt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Gn,inline:Qt}}static lex(t,n){return new Qr(n).lex(t)}static lexInline(t,n){return new Qr(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(a=>(o=a.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let a=n.at(-1);o.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.at(-1).src=a.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let a=1/0,p=t.slice(1),c;this.options.extensions.startBlock.forEach(g=>{c=g.call({lexer:this},p),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(s=t.substring(0,a+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+o.raw,a.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(o);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,p="";for(;t;){a||(p=""),a=!1;let c;if(this.options.extensions?.inline?.some(m=>(c=m.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let m=n.at(-1);c.type==="text"&&m?.type==="text"?(m.raw+=c.raw,m.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,p)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let g=t;if(this.options.extensions?.startInline){let m=1/0,f=t.slice(1),b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},f),typeof b=="number"&&b>=0&&(m=Math.min(m,b))}),m<1/0&&m>=0&&(g=t.substring(0,m+1))}if(c=this.tokenizer.inlineText(g)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(p=c.raw.slice(-1)),a=!0;let m=n.at(-1);m?.type==="text"?(m.raw+=c.raw,m.text+=c.text):n.push(c);continue}if(t){let m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return n}},zn=class{options;parser;constructor(e){this.options=e||kt}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ve.notSpaceStart)?.[0],o=e.replace(ve.endingNewline,"")+`
`;return r?'<pre><code class="language-'+je(r)+'">'+(n?o:je(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:je(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let p=e.items[a];r+=this.listitem(p)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+je(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let a=0;a<s.length;a++)n+=this.tablecell(s[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${je(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=si(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+je(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=si(e);if(o===null)return je(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${je(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:je(e.text)}},co=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},He=class eo{options;renderer;textRenderer;constructor(t){this.options=t||kt,this.options.renderer=this.options.renderer||new zn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new co}static parse(t,n){return new eo(n).parse(t)}static parseInline(t,n){return new eo(n).parseInline(t)}parse(t,n=!0){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let p=s,c=this.options.extensions.renderers[p.type].call({parser:this},p);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(p.type)){r+=c||"";continue}}let a=s;switch(a.type){case"space":{r+=this.renderer.space(a);continue}case"hr":{r+=this.renderer.hr(a);continue}case"heading":{r+=this.renderer.heading(a);continue}case"code":{r+=this.renderer.code(a);continue}case"table":{r+=this.renderer.table(a);continue}case"blockquote":{r+=this.renderer.blockquote(a);continue}case"list":{r+=this.renderer.list(a);continue}case"html":{r+=this.renderer.html(a);continue}case"def":{r+=this.renderer.def(a);continue}case"paragraph":{r+=this.renderer.paragraph(a);continue}case"text":{let p=a,c=this.renderer.text(p);for(;o+1<t.length&&t[o+1].type==="text";)p=t[++o],c+=`
`+this.renderer.text(p);n?r+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):r+=c;continue}default:{let p='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(p),"";throw new Error(p)}}}return r}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let p=this.options.extensions.renderers[s.type].call({parser:this},s);if(p!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=p||"";continue}}let a=s;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let p='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(p),"";throw new Error(p)}}}return r}},tn=class{options;block;constructor(e){this.options=e||kt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Fe.lex:Fe.lexInline}provideParser(){return this.block?He.parse:He.parseInline}},Zc=class{defaults=to();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=He;Renderer=zn;TextRenderer=co;Lexer=Fe;Tokenizer=Hn;Hooks=tn;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let a of s)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let a=o[s].flat(1/0);n=n.concat(this.walkTokens(a,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...a){let p=o.renderer.apply(this,a);return p===!1&&(p=s.apply(this,a)),p}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new zn(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,p=n.renderer[a],c=o[a];o[a]=(...g)=>{let m=p.apply(o,g);return m===!1&&(m=c.apply(o,g)),m||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Hn(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,p=n.tokenizer[a],c=o[a];o[a]=(...g)=>{let m=p.apply(o,g);return m===!1&&(m=c.apply(o,g)),m}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new tn;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,p=n.hooks[a],c=o[a];tn.passThroughHooks.has(s)?o[a]=g=>{if(this.defaults.async&&tn.passThroughHooksRespectAsync.has(s))return(async()=>{let f=await p.call(o,g);return c.call(o,f)})();let m=p.call(o,g);return c.call(o,m)}:o[a]=(...g)=>{if(this.defaults.async)return(async()=>{let f=await p.apply(o,g);return f===!1&&(f=await c.apply(o,g)),f})();let m=p.apply(o,g);return m===!1&&(m=c.apply(o,g)),m}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(a){let p=[];return p.push(s.call(this,a)),o&&(p=p.concat(o.call(this,a))),p}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Fe.lex(e,t??this.defaults)}parser(e,t){return He.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let a=o.hooks?await o.hooks.preprocess(t):t,p=await(o.hooks?await o.hooks.provideLexer():e?Fe.lex:Fe.lexInline)(a,o),c=o.hooks?await o.hooks.processAllTokens(p):p;o.walkTokens&&await Promise.all(this.walkTokens(c,o.walkTokens));let g=await(o.hooks?await o.hooks.provideParser():e?He.parse:He.parseInline)(c,o);return o.hooks?await o.hooks.postprocess(g):g})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let a=(o.hooks?o.hooks.provideLexer():e?Fe.lex:Fe.lexInline)(t,o);o.hooks&&(a=o.hooks.processAllTokens(a)),o.walkTokens&&this.walkTokens(a,o.walkTokens);let p=(o.hooks?o.hooks.provideParser():e?He.parse:He.parseInline)(a,o);return o.hooks&&(p=o.hooks.postprocess(p)),p}catch(a){return s(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+je(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},gt=new Zc;function W(e,t){return gt.parse(e,t)}W.options=W.setOptions=function(e){return gt.setOptions(e),W.defaults=gt.defaults,li(W.defaults),W};W.getDefaults=to;W.defaults=kt;W.use=function(...e){return gt.use(...e),W.defaults=gt.defaults,li(W.defaults),W};W.walkTokens=function(e,t){return gt.walkTokens(e,t)};W.parseInline=gt.parseInline;W.Parser=He;W.parser=He.parse;W.Renderer=zn;W.TextRenderer=co;W.Lexer=Fe;W.lexer=Fe.lex;W.Tokenizer=Hn;W.Hooks=tn;W.parse=W;var af=W.options,lf=W.setOptions,cf=W.use,df=W.walkTokens,pf=W.parseInline;var uf=He.parse,ff=Fe.lex;var G="openchamber.sdk";var Si=/^[a-z][a-z0-9-]{0,39}$/;var bi=e=>Object(e)===e&&!Array.isArray(e),po=(e,t)=>Object.keys(e).every(n=>t.includes(n)),Ei=e=>String(e)===e&&e.length>=1&&e.length<=60,Ti=e=>String(e)===e&&e.length>=1&&e.length<=80,_i=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!bi(n)||!Si.test(n.id)||!Ei(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!po(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!po(n,["kind","id","label","value","options","disabled"])||!Ti(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!bi(o)||!po(o,["value","label"])||!Ti(o.value)||!Ei(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var uo=e=>"bytes"in e?e.bytes.byteLength:e.content.length,yi=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var wi=/^[A-Za-z0-9_-]{1,80}$/;var Ai=["left","right","top","bottom"];var vi=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!vi(o,t+1,n))return!1;return!0},fo=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(fo);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(fo)}return String(e)===e||Number.isFinite(e)},mo=e=>{try{return String(e.id)!==e.id||!wi.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Ai.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!vi(e.data)||!fo(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Oi=["file","directory","other","missing"],go=e=>!!(e&&"sessionId"in e),ko=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Ii=/^[0-9a-f]{7,64}$/i,xo=e=>Ii.test(e),Xn=500,Kn=32e3,Ci=16e3,Li=128,Pi=200,Ni=2e3,Mi=16e3,Ui=80,Di=200,$i=16e3;var Gi=2e3;var bo=2e4,Wn=1024,Vn=2e6;var Yn=64e3,qn=8e3,Eo=4e3;var To=9e4;var Fi=999,Hi=1e4,on=500,zi=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Bi=["stopped","starting","ready","failed"],Qc=new Set(zi),ji=e=>Qc.has(e),Xi=e=>e&&ji(e)?e:"HOST_REJECTED",Nt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Nt):Object(e)===e?Object.values(e).every(Nt):!1,Ki=e=>Nt(e)&&JSON.stringify(e).length<=$i,Ri=e=>e?.trim().slice(0,Di)??"",Mt=e=>{let t=e.id.trim().slice(0,Li),n=e.title.trim().slice(0,Pi),r=e.url.trim().slice(0,Ni),o=e.text?.trim().slice(0,Mi),s=e.author?.trim().slice(0,Ui),a=e.kind==="pull"?"pull":"issue",p={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:a};if(o&&(p.text=o),s&&(p.author=s),a==="pull"){let c=Ri(e.branches?.head),g=Ri(e.branches?.base);c&&g&&(p.branches={head:c,base:g})}return Ki(e.data)&&(p.data=e.data),p},So=e=>{let t=Mt(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},_o=e=>{let t={text:e.text.trim().slice(0,Ci)};return e.send&&(t.send=!0),t},yo=e=>e===null||!Number.isFinite(e)?null:Math.min(Fi,Math.max(0,Math.round(e))),wo=e=>Number.isFinite(e)?Math.min(Hi,Math.max(0,Math.ceil(e))):0;var Ut=e=>e.length>0&&e.length<=Wn&&!e.includes("\0")&&!e.includes("\\");var Jn=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Gi?!1:!e.split("/").some(n=>n==="."||n===".."),ed=new Set(Bi),Ao=e=>!!(e&&"status"in e&&ed.has(String(e.status))&&!("body"in e)),Zn=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vo=e=>!!(e&&"content"in e&&String(e.content)===e.content),Ro=e=>!!(e&&"written"in e&&e.written===!0),Oo=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),td=new Set(Oi),Io=e=>!!(e&&"kind"in e&&"size"in e&&td.has(String(e.kind))&&Number.isFinite(e.size)),Co=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),nd=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),rd=e=>Object(e)===e?e:null,ho=e=>String(e)===e&&e.length>0,od=e=>{if(!ho(e.id))return null;if(e.ok===!0){let t={channel:G,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&ho(e.error)?{channel:G,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Xi(ho(e.code)?e.code:void 0)}:null},Lo=e=>{let t=rd(e);return!t||t.channel!==G||t.v!==1?null:t.type==="result"?od(t):!nd.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Wi=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,sd=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",I=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},Vi=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Qn=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${Wn} characters without NUL or backslash.`)),er=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},M=e=>(e.value+=1,`oc-${e.value}`),Do=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(l=>l===t.parent),r=e.requestTimeoutMs??bo,o=new Set,s=new Set,a=new Set,p=new Set,c=new Set,g=new Set,m=new Set,f=new Set,b=new Set,y=null,C=null,j=new Set,N=new Set,S=null,U=null,V=!1,J=new Map,he=new Map,ge=new Map,B=!1,O={value:0},R=null,_e=null,oe=!1,L=!1,ce=null,$t=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,ke=l=>{t.parent.postMessage(l,"*")},se=(l,u)=>{for(let w of l)try{w(u)}catch(_){console.error(_)}},Ke=l=>{if(!(l instanceof MessageEvent)||!n(l.source))return;let u=Lo(l.data);if(!u)return;if(u.type==="workspace"){let _=he.get(u.payload.subscriptionId);_&&se([_],u.payload.snapshot);return}if(u.type==="shells"){let _=ge.get(u.payload.subscriptionId);_&&se([_],u.payload.snapshot);return}if(u.type==="ready"){R=u.payload,_e=$t(u.payload.session),se(o,u.payload),se(s,u.payload.directory),se(a,u.payload.session),_e&&se(p,_e),se(c,u.payload.connection),se(g,u.payload.settings),se(m,u.payload.item);return}if(u.type==="directory"){R&&(R={...R,directory:u.payload.directory}),se(s,u.payload.directory);return}if(u.type==="session"){R&&(R={...R,session:u.payload.session}),u.payload.session?_e?.sessionId!==u.payload.session.id&&(_e=$t(u.payload.session)):_e=null,se(a,u.payload.session);return}if(u.type==="session-lifecycle"){_e=u.payload,se(p,u.payload);return}if(u.type==="connection"){R&&(R={...R,connection:u.payload.connection}),se(c,u.payload.connection);return}if(u.type==="settings"){R&&(R={...R,settings:u.payload.settings}),se(g,u.payload.settings);return}if(u.type==="item"){R&&(R={...R,item:u.payload.item}),se(m,u.payload.item);return}if(u.type==="status-control-event"){se(f,u.payload);return}if(u.type==="popover-closed"){se(b,u.payload);return}if(u.type==="action"){let _=q=>{B||ke({channel:G,v:1,type:"action-result",id:u.id,payload:q})},K=C;if(!K){_({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>K(u.payload)).then(()=>_({ok:!0}),q=>{let Y=(q instanceof Error?q.message:String(q)).trim();_({ok:!1,error:(Y||"Action failed.").slice(0,on)})});return}if(u.type==="file-open"){let _=u.payload;if(U&&yi(U,_))return;U=_,se(j,u.payload);return}if(u.type==="file-saved"){se(N,u.payload.version);return}if(u.type==="file-snapshot"){let _=Y=>{B||ke({channel:G,v:1,type:"file-snapshot-result",id:u.id,payload:Y})},K=Y=>_({error:(Y.trim()||"Could not read the edited file.").slice(0,on)}),q=S;if(!q){K("This extension does not edit files.");return}Promise.resolve().then(()=>q(u.payload.purpose)).then(Y=>{if(uo(Y)>2e7){K(`The file is over ${2e7} ${"bytes"in Y?"bytes":"characters"}.`);return}if(Y.version.length>256){K(`The snapshot version is over ${256} characters.`);return}_({snapshot:"bytes"in Y?{bytes:Y.bytes,version:Y.version}:{content:Y.content,version:Y.version}})},Y=>K(Y instanceof Error?Y.message:String(Y)));return}if(u.type==="resolve"){let _=q=>{ke({channel:G,v:1,type:"resolve-result",id:u.id,payload:q})},K=y;if(!K){_({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>K(u.payload)).then(q=>_({item:q?Mt(q):null}),q=>{let Y=(q instanceof Error?q.message:String(q)).trim();_({error:(Y||"Command failed.").slice(0,on)})});return}let w=J.get(u.id);if(w){if(clearTimeout(w.timer),J.delete(u.id),u.ok){w.resolve(u.payload);return}w.reject(new I(u.code,u.error))}};t.addEventListener("message",Ke),ke({channel:G,v:1,type:"hello"});let be=(l,u=r)=>B||t.parent===t?Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((w,_)=>{let K=setTimeout(()=>{J.delete(l.id),_(new I("HOST_TIMEOUT","Host did not answer in time."))},u);J.set(l.id,{resolve:w,reject:_,timer:K}),ke(l)}),ie=l=>be(l).then(()=>{}),Q={channel:G,v:1},at=l=>{!B&&t.parent!==t&&ke(l)},Gt=()=>at({...Q,type:"file-save"}),fn=l=>{!Wi(l)||!sd(l)||(l.preventDefault(),Gt())},mn=l=>{!Wi(l)||l.key!=="Escape"||R?.surface!=="popover"||!R.popover||(l.preventDefault(),zt(R.popover.id,"escape").catch(()=>{}))},Tt=()=>{let l=R?.surface==="popover"?R.popover:void 0;if(!l)return;let u=oe||L;ce!==u&&(ce=u,Z(l.id,u).catch(()=>{}))},X=()=>{R?.surface!=="popover"||oe||(oe=!0,Tt())},hn=l=>{R?.surface!=="popover"||l.relatedTarget!==null||!oe||(oe=!1,Tt())},gn=()=>{R?.surface!=="popover"||L||(L=!0,Tt())},kn=()=>{R?.surface!=="popover"||!L||(L=!1,Tt())},Le=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new I("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Ft=async l=>{l.kind!=="projects"&&Le(l.projectId);let u=await be({...Q,type:"workspace-read",id:M(O),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return u},Ht=async(l,u)=>{l.kind!=="projects"&&Le(l.projectId);let w=M(O);he.set(w,u);try{await ie({...Q,type:"workspace-subscribe",id:M(O),payload:{subscriptionId:w,query:l}})}catch(_){throw he.delete(w),B||ke({...Q,type:"workspace-unsubscribe",id:M(O),payload:{subscriptionId:w}}),_}return()=>{!he.delete(w)||B||ke({...Q,type:"workspace-unsubscribe",id:M(O),payload:{subscriptionId:w}})}},xn=async(l,u)=>{l.kind==="session"&&Le(l.sessionId),l.kind==="project"&&Le(l.projectId);let w=M(O);ge.set(w,u);try{await ie({...Q,type:"shells-subscribe",id:M(O),payload:{subscriptionId:w,scope:l}})}catch(_){throw ge.delete(w),B||ke({...Q,type:"shells-unsubscribe",id:M(O),payload:{subscriptionId:w}}),_}return()=>{!ge.delete(w)||B||ke({...Q,type:"shells-unsubscribe",id:M(O),payload:{subscriptionId:w}})}},St=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Nt(l.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&R?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let u=await be({...Q,type:"storage",id:M(O),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new I("HOST_REJECTED","Host did not return storage data.");return u},zt=(l,u)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ie({...Q,type:"popover-close",id:M(O),payload:u?{id:l,reason:u}:{id:l}}),Z=(l,u)=>R?.features?.popovers!==!0&&!(R?.surface==="popover"&&R.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ie({...Q,type:"popover-anchor",id:M(O),payload:{id:l,active:u}});return t.addEventListener("keydown",mn,!0),t.addEventListener("pointerover",X),t.addEventListener("pointermove",X),t.addEventListener("pointerout",hn),t.addEventListener("focus",gn),t.addEventListener("blur",kn),{onAction:l=>(C=l,()=>{C===l&&(C=null)}),listProjects:async()=>{let l=await Ft({kind:"projects"});if(l.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Ft({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Ft({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Ht({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Ht({kind:"worktrees",projectId:l},w=>{w.kind==="worktrees"&&u(w)}),onSessions:(l,u)=>Ht({kind:"sessions",projectId:l},w=>{w.kind==="sessions"&&u(w)}),onRunningShells:(l,u)=>xn(l,u),readShellOutput:async(l,u)=>{Le(l,128);let w=u?.cursor;if(w!==void 0&&(!Number.isInteger(w)||w<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let _=u?.tailBytes;if(_!==void 0&&(!Number.isInteger(_)||_<1||_>65536))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let q=await be({...Q,type:"shell-output",id:M(O),payload:{shellId:l,cursor:w,tailBytes:_}});if(!q||typeof q.output!="string"||!Number.isFinite(q.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return q},stopShell:async l=>{if(Le(l,128),(await be({...Q,type:"shell-stop",id:M(O),payload:{shellId:l}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Le(l),await ie({...Q,type:"open-session",id:M(O),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let w=er(u),_={op:"get",key:l};w&&(_.scope=w);let K=await St(_);return K.op==="get"&&K.found?K.value:void 0},set:async(l,u,w)=>{let _=er(w),K={op:"set",key:l,value:u};_&&(K.scope=_),await St(K)},delete:async(l,u)=>{let w=er(u),_={op:"delete",key:l};w&&(_.scope=w),await St(_)},keys:async l=>{let u=er(l),w={op:"keys"};u&&(w.scope=u);let _=await St(w);if(_.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return _.keys}},onReady:l=>(o.add(l),R&&l(R),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),R&&l(R.directory),()=>{s.delete(l)}),onSession:l=>(a.add(l),R&&l(R.session),()=>{a.delete(l)}),onSessionLifecycle:l=>(p.add(l),_e&&l(_e),()=>{p.delete(l)}),onConnection:l=>(c.add(l),R&&l(R.connection),()=>{c.delete(l)}),onSettings:l=>(g.add(l),R&&l(R.settings),()=>{g.delete(l)}),onItem:l=>(m.add(l),R&&l(R.item),()=>{m.delete(l)}),onStatusControl:l=>(f.add(l),()=>{f.delete(l)}),onPopoverClosed:l=>(b.add(l),()=>{b.delete(l)}),setStatusControls:l=>R?.features?.statusControls!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support status controls.")):_i(l)?ie({...Q,type:"status-controls",id:M(O),payload:{controls:l}}):Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>R?.features?.popovers!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):mo(l)?ie({...Q,type:"popover-open",id:M(O),payload:l}):Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:zt,setPopoverAnchorActive:Z,onResolve:l=>(y=l,()=>{y===l&&(y=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>Xn?Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${Xn} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>Kn)?Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${Kn} characters.`)):ie({channel:G,v:1,type:"toast",id:M(O),payload:{...l,message:u}})},openUrl:l=>ie({channel:G,v:1,type:"open-url",id:M(O),payload:{url:l}}),openCommit:l=>xo(l)?ie({channel:G,v:1,type:"open-commit",id:M(O),payload:{sha:l}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>ie({channel:G,v:1,type:"open-surface",id:M(O),payload:{surfaceId:l}}),writeClipboard:l=>ie({channel:G,v:1,type:"clipboard-write",id:M(O),payload:{text:l}}),compose:l=>ie({channel:G,v:1,type:"compose",id:M(O),payload:l}),attach:l=>ie({channel:G,v:1,type:"attach",id:M(O),payload:Mt(l)}),startSession:async l=>{l.projectId!==void 0&&Le(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Le(u.directory):(u.name!==void 0&&Le(u.name,200),u.baseBranch!==void 0&&Le(u.baseBranch,200)));let w=await be({channel:G,v:1,type:"start-session",id:M(O),payload:So(l)},e.requestTimeoutMs??18e4);if(!go(w))throw new I("HOST_REJECTED","Host did not return a session.");return w},prompt:l=>be({channel:G,v:1,type:"prompt",id:M(O),payload:_o(l)}).then(u=>{if(!ko(u))throw new I("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>ie({channel:G,v:1,type:"session-link",id:M(O),payload:Mt(l)}),close:()=>ie({channel:G,v:1,type:"close",id:M(O)}),oauthStart:()=>ie({channel:G,v:1,type:"oauth-start",id:M(O)}),oauthDisconnect:()=>ie({channel:G,v:1,type:"oauth-disconnect",id:M(O)}),request:l=>(Jn(l.path)?be({channel:G,v:1,type:"request",id:M(O),payload:l}):Vi()).then(u=>{if(!Zn(u))throw new I("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(Jn(l.path)?be({channel:G,v:1,type:"service-request",id:M(O),payload:l}):Vi()).then(u=>{if(!Zn(u))throw new I("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>be({channel:G,v:1,type:"service-status",id:M(O)}).then(l=>{if(!Ao(l))throw new I("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(Ut(l)?be({channel:G,v:1,type:"file-read",id:M(O),payload:{path:l}}):Qn()).then(u=>{if(!vo(u))throw new I("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>Ut(l)?u.length>Vn?Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${Vn} characters.`)):be({channel:G,v:1,type:"file-write",id:M(O),payload:{path:l,content:u}}).then(w=>{if(!Ro(w))throw new I("HOST_REJECTED","Host did not confirm the write.");return w}):Qn(),listDir:l=>(Ut(l)?be({channel:G,v:1,type:"file-list",id:M(O),payload:{path:l}}):Qn()).then(u=>{if(!Oo(u))throw new I("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(Ut(l)?be({channel:G,v:1,type:"file-stat",id:M(O),payload:{path:l}}):Qn()).then(u=>{if(!Io(u))throw new I("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),w=l.system?.trim();if(u.length===0||u.length>Yn)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${Yn} characters.`));if(w!==void 0&&(w.length===0||w.length>qn))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${qn} characters.`));let _=l.maxOutputTokens===void 0?void 0:Math.min(Eo,Math.max(1,Math.floor(l.maxOutputTokens)));if(_!==void 0&&!Number.isFinite(_))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let K={prompt:u};return w!==void 0&&(K.system=w),_!==void 0&&(K.maxOutputTokens=_),be({channel:G,v:1,type:"generate",id:M(O),payload:K},e.requestTimeoutMs??To).then(q=>{if(!Co(q))throw new I("HOST_REJECTED","Host did not return generated text.");return q})},setBadge:l=>ie({channel:G,v:1,type:"badge",id:M(O),payload:{count:yo(l)}}),setHeight:l=>ie({channel:G,v:1,type:"resize",id:M(O),payload:{height:wo(l)}}),onFileOpen:l=>(j.add(l),V||(V=!0,t.addEventListener("keydown",fn,!0)),U&&l(U),()=>{j.delete(l)}),onFileSnapshot:l=>(S=l,()=>{S===l&&(S=null)}),onFileSaved:l=>(N.add(l),()=>{N.delete(l)}),reportFileChange:l=>at({...Q,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:Gt,reportFileUnsupported:()=>at({...Q,type:"file-unsupported"}),dispose:()=>{for(let l of he.keys())ke({...Q,type:"workspace-unsubscribe",id:M(O),payload:{subscriptionId:l}});he.clear();for(let l of ge.keys())ke({...Q,type:"shells-unsubscribe",id:M(O),payload:{subscriptionId:l}});ge.clear(),B=!0,y=null,C=null,S=null,j.clear(),N.clear(),V&&t.removeEventListener("keydown",fn,!0),t.removeEventListener("message",Ke),t.removeEventListener("keydown",mn,!0),t.removeEventListener("pointerover",X),t.removeEventListener("pointermove",X),t.removeEventListener("pointerout",hn),t.removeEventListener("focus",gn),t.removeEventListener("blur",kn);for(let l of J.values())clearTimeout(l.timer),l.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),o.clear(),s.clear(),a.clear(),p.clear(),c.clear(),g.clear(),m.clear(),f.clear(),b.clear()}}};var Ji=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Gf=new Set(Ji);var Zi=["none","agent","user"];var Hf=new Set(Zi);var $=Do();var Qi="var(--k-muted)",id=/^#[0-9a-fA-F]{3}$/,ad=/^#[0-9a-fA-F]{6}$/,ld=/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,cd=/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/,dd=/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/,pd=/^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/;function $o(e){if(typeof e!="string")return Qi;let t=e.trim();return id.test(t)||ad.test(t)||ld.test(t)||cd.test(t)||dd.test(t)||pd.test(t)?t:Qi}function T(e,t={},...n){let r=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(r.dataset,s);continue}if(o==="style"){r.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){r.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){r.className=s;continue}r[o]=s}for(let o of n)o!=null&&r.append(typeof o=="string"?document.createTextNode(o):o);return r}function Go(e){e.replaceChildren()}function Fo(e){let t=T("div",{className:"md"});if(!e||e.trim().length===0)return t.append(T("p",{className:"muted"},"No description.")),t;let n=W.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=ti.sanitize(n,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(r=>{let o=r.getAttribute("href")??"";r.setAttribute("rel","noreferrer noopener"),r.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&$.openUrl(o)})}),t.querySelectorAll("img").forEach(r=>{r.setAttribute("loading","lazy")}),t}function ea(e,t=320){let n=e??"",r=Fo(e);if(n.length<=t)return r;r.classList.add("md-collapsed");let o=T("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=r.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),T("div",{className:"md-wrap"},r,o)}function sn(e){return e instanceof Ae?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function ta(e,t){let n=typeof e=="object"&&e!==null?e:{};return typeof n.message=="string"&&n.message?n.message:typeof n.error=="string"&&n.error?n.error:t}async function ud(e,t="POST",n){let r=await $.serviceRequest({method:t,path:e,...n===void 0?{}:{body:JSON.stringify(n)}});return{status:r.status,body:r.body}}async function tr(e,t="POST",n){let r=await ud(e,t,n),o;try{o=JSON.parse(r.body)}catch{throw new Ae(r.status,"SERVICE_BAD_RESPONSE",`Kaneo service answered ${r.status} with a body that is not JSON.`)}if(r.status>=400)throw new Ae(r.status,"SERVICE_ERROR",ta(o,`Kaneo service answered ${r.status}.`));return o}async function na(e){let t=await $.serviceRequest({method:"POST",path:"/forward",body:JSON.stringify(e)}),n;try{n=JSON.parse(t.body)}catch{throw new Ae(t.status,"SERVICE_BAD_RESPONSE","Kaneo service answered with a body that is not JSON.")}let r=typeof n=="object"&&n!==null?n:{};if(typeof r.status!="number")throw new Ae(t.status>=400?t.status:502,"SERVICE_ERROR",ta(n,"Kaneo service returned an unexpected answer."));return{status:r.status,body:typeof r.body=="string"?r.body:""}}var ra=()=>tr("/account","GET"),oa=e=>tr("/auth/device/start","POST",{origin:e}),sa=()=>tr("/auth/device/poll","POST"),ia=()=>tr("/auth/signout","POST");async function aa(){try{await ia()}catch(e){console.error("Disconnect Kaneo failed:",e),await $.toast({kind:"error",message:`Could not disconnect from Kaneo. ${sn(e)}`,dismiss:!0})}}async function an(e,t,n){let r;try{r=await n.get(e)}catch(o){return console.warn(`Storage read failed for key "${e}":`,o),t(void 0)}return t(r)}async function la(e,t){try{await t.delete(e)}catch(n){console.warn(`Storage delete failed for key "${e}":`,n)}}async function Dt(e,t,n){try{let r=JSON.parse(JSON.stringify(t));await n.set(e,r)}catch(r){console.warn(`Storage write failed for key "${e}":`,r)}}function ca(e){if(!e||typeof e!="object")return{};let t={};for(let[n,r]of Object.entries(e))!r||typeof r!="object"||typeof r.taskId!="string"||(t[n]={taskId:r.taskId,ticketId:typeof r.ticketId=="string"?r.ticketId:"",title:typeof r.title=="string"?r.title:"",at:typeof r.at=="number"?r.at:0,posted:Array.isArray(r.posted)?r.posted.filter(o=>typeof o=="string"):[]});return t}function da(e,t=50){let n=Object.entries(e).sort((r,o)=>o[1].at-r[1].at).slice(0,Math.max(0,t));return Object.fromEntries(n)}var pa="preferences",fd={workspaceId:null,projectId:null,openTaskId:null,priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1,serverUrl:""};function ua(e){if(typeof e!="object"||e===null)return{...fd};let t=e,n=t.priorityFilter,r=n==="any"||!!n&&n in mt;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,priorityFilter:r?n:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0,serverUrl:typeof t.serverUrl=="string"?t.serverUrl:""}}async function xt(){return an(pa,e=>ua(e),$.storage)}async function Se(e){let t=ua({...await xt(),...e});return await Dt(pa,t,$.storage),t}var Ho="session-links";async function nr(){return an(Ho,ca,$.storage)}async function fa(e,t){let n=await nr();n[e]={...t,at:Date.now(),posted:[]};let r=da(n);await Dt(Ho,r,$.storage)}async function ma(e,t){let n=await nr(),r=n[e];r&&(r.posted.includes(t)||r.posted.push(t),await Dt(Ho,n,$.storage))}var ln=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function ha(e,t,n={}){if(!n.force){let f=await hd();if(f&&Date.now()-f.at<md)return f.context}let[r,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new ln;let s=await xt(),a=t?o.find(f=>f.slug===t):void 0,p=(s.workspaceId&&o.find(f=>f.id===s.workspaceId)?.id)??a?.id??o[0].id;p!==s.workspaceId&&await Se({workspaceId:p,projectId:null});let c=[],g=null;try{c=await e.listProjects(p)}catch(f){g=f instanceof Error?f:new Error(String(f))}let m={user:r,workspaces:o,workspaceId:p,projects:c,projectsError:g};return await gd(m),m}var zo="bootstrap-cache",md=6e4;async function hd(){return an(zo,e=>{if(!e||typeof e!="object")return null;let t=e;if(typeof t.at!="number"||!t.context||typeof t.context!="object")return null;let n=t.context;if(!Array.isArray(n.workspaces)||typeof n.workspaceId!="string")return null;let r={user:n.user??null,workspaces:n.workspaces??[],workspaceId:n.workspaceId,projects:n.projects??[],projectsError:t.errorMessage?new Error(t.errorMessage):null};return{at:t.at,context:r}},$.storage)}async function gd(e){await Dt(zo,{at:Date.now(),context:e,errorMessage:e.projectsError?String(e.projectsError.message??e.projectsError):void 0},$.storage)}async function ga(){await la(zo,$.storage)}function ka(e,t,n){if(e.length===0)return null;let r=e.find(a=>a.id===t);if(r)return r;let o=n?.toLowerCase();return(o?e.find(a=>a.slug.toLowerCase()===o):void 0)??e[0]}function xa(e){let t=e?.workspace?.trim(),n=e?.project?.trim();return{workspaceSlug:t||void 0,projectSlug:n||void 0}}function ba(e){let t=e?.trim()??"";if(!t)return{origin:Mn,error:null};try{let n=new URL(t);if(n.protocol==="https:"&&!n.username&&!n.password&&(n.pathname==="/"||n.pathname==="")&&!n.search&&!n.hash)return{origin:n.origin,error:null}}catch{}return{origin:Mn,error:"Enter an https origin, like https://cloud.kaneo.app."}}async function Ea(e){try{await $.setBadge(e>999?999:e)}catch{}}function Ta(e,t){let n=!1,r=0,o=null,s="",a=()=>{o!==null&&(window.clearTimeout(o),o=null)},p=N=>!n&&N===r,c=N=>{n||e.replaceChildren(N)},g=N=>{let S=T("div",{className:"signin-card"});S.append(T("p",{className:"signin-hint"},"Connect to your Kaneo server. You will get a code to enter on Kaneo's own sign-in page."));let U=T("div",{className:"signin-field"});S.append(U),Mr(U,{label:"Kaneo server URL",value:s,placeholder:"https://cloud.kaneo.app",mono:!0,...N?{error:N}:{helper:"Optional. Defaults to the bundled origin."},onChange:J=>{s=J}});let V=T("div",{className:"signin-row"});S.append(V),me(V,{label:"Sign in with Kaneo",size:"sm",onClick:()=>void j()}),c(S)},m=async()=>{let N=++r;a();let S=await xt().catch(()=>null);p(N)&&(s=S?.serverUrl??"",g())},f=(N,S)=>{if(!p(S))return;a();let U=T("div",{className:"signin-fill"});Wt(U,{tone:"error",title:"Kaneo",body:N,action:{label:"Start again",onClick:()=>void m()}}),c(U)},b=(N,S)=>{if(!p(S))return;let U=T("div",{className:"signin-card"});U.append(T("p",{className:"signin-hint"},"Enter this code in your browser to sign in to Kaneo")),U.append(T("div",{className:"signin-code"},N.userCode));let V=T("div",{className:"signin-row"});U.append(V),me(V,{label:"Open Kaneo",variant:"secondary",size:"sm",onClick:()=>void $.openUrl(N.verificationUriComplete)}),me(V,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>void m()});let J=T("div",{className:"signin-waiting"});U.append(J),Je(J,{label:"Waiting for approval"}),c(U)},y=(N,S)=>{a(),o=window.setTimeout(()=>void C(N),Math.max(S,3)*1e3)},C=async N=>{if(!p(N))return;let S;try{S=await sa()}catch(U){f(sn(U),N);return}if(p(N))switch(S.status){case"pending":y(N,S.interval);return;case"connected":a(),t();return;case"expired":f("The code expired. Start again.",N);return;case"denied":f("Sign-in was denied on Kaneo.",N);return;default:f(S.message,N)}},j=async()=>{let N=ba(s);if(N.error){g(N.error);return}let S=++r;if(a(),await Se({serverUrl:s.trim()}).catch(()=>{}),!p(S))return;let U=T("div",{className:"signin-fill"});Je(U,{label:"Starting sign-in"}),c(U);let V;try{V=await oa(N.origin)}catch(J){f(sn(J),S);return}p(S)&&(b(V,S),y(S,V.interval),$.openUrl(V.verificationUriComplete).catch(()=>{}))};return m(),()=>{n=!0,a()}}var cn=864e5;function dn(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function wa(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function Aa(e,t,n){return`${Cs}/dashboard/workspace/${e}/project/${t}/task/${n}`}var kd={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function bt(e){return kd[e]??e}function Bo(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=Math.round((Sa(n).getTime()-Sa(t).getTime())/cn);return r===0?"Due today":r===1?"Due tomorrow":r===-1?"Due yesterday":r<0?`Overdue ${Math.abs(r)}d`:r<=7?`Due in ${r}d`:`Due ${n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function Sa(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function va(e,t){let n=[`**${t.ticketId}** ${e.title}`],r=[];t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${bt(e.priority)}`),e.assigneeName&&r.push(`Assignee: ${e.assigneeName}`);let o=Bo(e.dueDate);o&&r.push(o),r.length>0&&n.push(r.join(" \xB7 ")),t.url&&n.push(t.url);let s=e.description?.trim();return s&&n.push("",s),n.join(`
`)}var xd=6e3;function bd(e){let t=e.user?.name??"Unknown",n=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${n}`}function Ra(e,t){let n=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&n.push(`Project: ${t.projectName}`),t.columnName&&n.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&n.push(`Priority: ${bt(e.priority)}`),e.dueDate&&n.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&n.push(t.url);let r=e.description?.trim();r&&n.push("",r);let o=t.comments??[];if(o.length>0){n.push("","Comments:");let s=0;for(let a of o){let p=bd(a);if(s+p.length>xd)break;s+=p.length,n.push(p)}}return n.join(`
`)}function Oa(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Ed={started:"OpenChamber session started",completed:"OpenChamber session completed",failed:"OpenChamber session failed"};function Ia(e,t,n,r){let o=Ed[e],s=t.trim()||"Untitled session";if(n){let a=n.replace(/\/+$/,""),p=r?`${a}/?session=${encodeURIComponent(r)}`:a;return`[${o}](${p}) \u2014 ${s}`}return`${o} \u2014 ${s}`}var _a=6e4,ya=36e5;function Ca(e,t=Date.now()){if(!e)return null;let n=Date.parse(e);if(!Number.isFinite(n))return null;let r=Math.max(0,t-n);return r<_a?"just now":r<ya?`${Math.floor(r/_a)}m`:r<cn?`${Math.floor(r/ya)}h`:r<7*cn?`${Math.floor(r/cn)}d`:`${Math.floor(r/(7*cn))}w`}function pn(e){return Aa(e.workspaceId,e.task.projectId,e.task.id)}function Td(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function La(e){return{providerId:Un,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:pn(e),text:Ra(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:pn(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:Td(e)}}async function Sd(e){await $.attach(La(e))}async function _d(e,t={}){let n=t.worktree?Oa(e.ticketId):void 0,r=await $.startSession({...La(e),navigation:"preserve",...n?{worktree:{kind:"new",name:n}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return r.sessionId===null?{sessionId:null,sent:r.sent,failure:r.failure,branch:r.worktree.branch}:{sessionId:r.sessionId,sent:r.sent,branch:r.worktree?.branch??n}}async function Pa(e){await Sd(e),await $.toast({kind:"success",message:`${e.ticketId} attached to the chat.`})}async function Na(e,t={}){let n=await _d(e,t);if(n.sessionId===null){let r=n.branch?` The worktree ${n.branch} was kept.`:"",o=n.failure?` (${n.failure})`:"";return await $.toast({kind:"error",message:`No session was created${o}.${r} Check the session list before retrying.`,dismiss:!0}),!1}return await fa(n.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await $.toast({kind:"success",message:t.worktree&&n.branch?`Session started on ${n.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function Ma(e){await $.compose({mode:"append",text:`
${va(e.task,{ticketId:e.ticketId,...e.columnName?{columnName:e.columnName}:{},...pn(e)?{url:pn(e)}:{}})}
`})}async function Ua(e){await $.openUrl(pn(e))}async function rr(e,t){console.error(`${e} failed:`,t);let n=t instanceof Ae?t.code:null,r=n?`${e} failed (${n}).`:`${e} failed.`;await $.toast({kind:"error",message:r.slice(0,400),dismiss:!0})}function yd(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function wd(e){return T("span",{className:"label-chip"},T("span",{className:"label-dot",style:`background:${$o(e.color)}`}),e.name)}function Da(e){if(e.length===0)return null;let t=T("div",{className:"label-chips"});for(let n of e)t.append(wd(n));return t}function $a(e){return T("span",{className:"person-avatar"},yd(e))}function jo(e,t,n,r={}){let o=me(e,{label:t,variant:r.variant??"secondary",size:"sm",onClick:()=>{o.update({loading:!0}),n().catch(s=>rr(t,s)).finally(()=>o.update({loading:!1}))}});r.block&&e.classList.add("block")}function Ad(e,t){let n=T("div",{className:"detail-header"}),r=T("div");n.append(r),me(r,{label:"Back",variant:"ghost",size:"sm",onClick:t});let o=T("div",{style:"margin-left:auto;"});return n.append(o),me(o,{label:"Open in Kaneo",variant:"ghost",size:"sm",onClick:()=>void Ua(e)}),n}function vd(e){return T("div",{className:"detail-heading"},T("div",{className:"detail-id"},e.ticketId),T("h2",{className:"detail-title"},e.task.title))}function Rd(e,t,n){let r=T("div",{className:"detail-row"});if(t.length>0){let o=T("div",{className:"detail-status"});r.append(o),It(o,{value:e.task.status,options:t.map(s=>({id:s.id,label:s.name})),onChange:n.onMove})}if(n.canClose){let o=T("div");r.append(o),me(o,{label:"Close issue",variant:"outline",size:"sm",onClick:n.onClose})}return r}function Od(e){let{task:t}=e,n=T("dl",{className:"meta-grid"}),r=[];e.projectName&&r.push(["Project",e.projectName]),t.priority!=="no-priority"&&r.push(["Priority",bt(t.priority)]),r.push(["Assignee",t.assigneeName??"Unassigned"]);let o=Bo(t.dueDate);o&&r.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&r.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&r.push(["Description","Too large to inline; open the task for the full text."]);for(let[p,c]of r)n.append(T("dt",{},p),T("dd",{},c));let a=Da(t.labels??[]);if(a){let p=T("dd",{className:"meta-labels"});p.append(a),n.append(T("dt",{},"Labels"),p)}return n}function Id(e,t=320){return T("div",{className:"detail-section"},ea(e.task.description,t))}function Cd(e){let t=T("div",{className:"detail-section"});if(t.append(T("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(T("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(T("p",{className:"muted"},"Loading comments\u2026")),t;let n=e.items??[];if(n.length===0)return t.append(T("p",{className:"muted"},"No comments yet.")),t;let r=T("div",{className:"comments"});return n.forEach((o,s)=>{let a=s===n.length-1,p=Ca(o.createdAt),c=T("div",{className:"comment"});a||c.append(T("div",{className:"comment-line"})),c.append($a(o.user?.name));let g=T("div",{className:"comment-card"});g.append(T("div",{className:"comment-head"},T("span",{className:"comment-author"},o.user?.name??"Unknown"),p?T("span",{},p):null),T("div",{className:"comment-body"},Fo(o.content))),c.append(g),r.append(c)}),t.append(r),t}function Ld(e,t){let n=T("div",{className:"detail-body"});return n.append(vd(e)),(t.columns.length>0||t.canCloseIssue)&&n.append(Rd(e,t.columns,{onMove:t.onMove,onClose:t.onCloseIssue,canClose:t.canCloseIssue})),n.append(Od(e)),n.append(Id(e,1200)),n.append(Cd(t.comments)),n}function Pd(e,t){let n=T("div",{className:"detail-footer"}),r=T("div");n.append(r),Dr(r,{label:"Create in a new worktree",checked:t.worktree,onChange:t.onWorktreeChange});let o=T("div",{className:"detail-start block"});if(n.append(o),jo(o,"Start session",()=>Na(e,{worktree:t.worktree}).then(()=>{}),{variant:"default",block:!0}),t.showChatActions!==!1){let s=T("div",{className:"toolbar detail-secondary"});n.append(s),jo(s,"Attach",()=>Pa(e)),jo(s,"Send to chat",()=>Ma(e))}return n}function Ga(e,t){let n=T("div",{className:"detail"});return n.append(Ad(e,t.onBack)),n.append(Ld(e,t)),n.append(Pd(e,t)),n}var Nd=`
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
`;function Fa(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=Nd,e.append(n)}var Md={started:"started",completed:"completed",failure:"failed"},Ha=!1;function za(e,t){Ha||(Ha=!0,$.onSessionLifecycle(async n=>{let r=Md[n.phase];if(!r)return;let s=(await nr())[n.sessionId];if(!(!s||s.posted.includes(r))){await ma(n.sessionId,r);try{await e.createComment(s.taskId,Ia(r,s.title,t,n.sessionId))}catch{}}}))}var Xe=document.querySelector("#root");if(!Xe)throw new Error("Kaneo panel is missing its #root element.");var it=Ps(na),h={ready:null,connected:!1,context:null,project:null,board:null,labels:[],mine:[],mineLoaded:!1,mineTotal:0,extraTask:null,comments:{},preferences:{workspaceId:null,projectId:null,openTaskId:null,priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1,serverUrl:""},search:"",loading:!0,error:null},or=0,Ba=!1;function Ud(){let e=h.preferences.labelFilter;return e?h.labels.find(t=>t.id===e)??null:null}function Dd(e){let{priorityFilter:t,labelFilter:n,statusFilter:r,assigneeFilter:o}=h.preferences;if(t!=="any"&&mt[e.priority]<mt[t]||n&&!(e.labels??[]).some(p=>p.id===n)||r&&e.status!==r||o==="me"&&e.assigneeId!==h.context?.user?.id)return!1;let s=h.search.trim().toLowerCase();if(!s)return!0;let a=dn(h.project?.slug??"",e.number).toLowerCase();return e.title.toLowerCase().includes(s)||a.includes(s)||(e.description??"").toLowerCase().includes(s)}function $d(){let e=h.board?.board;if(!e)return[];let t=[];for(let n of e.columns)for(let r of n.tasks)Dd(r)&&t.push(r);return t}function Gd(e){let{priorityFilter:t,labelFilter:n,statusFilter:r}=h.preferences;if(t!=="any"&&mt[e.priority]<mt[t]||n&&!(e.labels??[]).some(a=>a.id===n)||r&&e.status!==r)return!1;let o=h.search.trim().toLowerCase();if(!o)return!0;let s=dn(e.projectSlug,e.number).toLowerCase();return e.title.toLowerCase().includes(o)||s.includes(o)}function Fd(){let{priorityFilter:e,statusFilter:t,assigneeFilter:n,labelFilter:r}=h.preferences;return h.search.trim().length>0||e!=="any"||t!==null||n!=="any"||r!==null}function Hd(){let e=h.ready?.connection?.account?.trim();if(e)return e;let t=h.context?.user?.email?.trim();return t||"Kaneo account"}async function zd(){h.board=h.project?await it.getBoard(h.project.id):null}async function Bd(){let e=h.context?.workspaceId;if(!e){h.mine=[],h.mineLoaded=!0,h.mineTotal=0;return}let t=await it.listAssignedTasks(e);h.mine=t.tasks,h.mineLoaded=!0,h.mineTotal=t.total}async function jd(){let e=h.context?.workspaceId;if(!e){h.labels=[];return}let t=await it.listLabels(e),n=new Set;h.labels=t.filter(r=>n.has(r.name)?!1:(n.add(r.name),!0))}async function Et(e={}){let t=++or;h.loading=!0,ye();try{let{workspaceSlug:n,projectSlug:r}=xa(h.ready?.settings),o=await ha(it,n);if(t!==or)return;h.context=o,h.preferences=await xt(),h.project=ka(o.projects,h.preferences.projectId,r),h.project&&h.project.id!==h.preferences.projectId&&(h.preferences=await Se({projectId:h.project.id})),h.loading=!1,h.error=o.projectsError?Vt("List projects",o.projectsError):null,ye();let[s,a,p]=await Promise.allSettled([zd(),Bd(),jd()]);if(s.status==="rejected"&&(h.error=Vt("Load board",s.reason)),p.status==="rejected"&&(h.labels=[]),a.status==="rejected"&&(h.mine=[],h.mineLoaded=!0,h.mineTotal=0),t!==or)return;e.keepDetail||(h.preferences=await Se({openTaskId:null})),await Ea(h.mineTotal),ye()}catch(n){if(t!==or)return;h.loading=!1,h.error=n instanceof ln?n.message:`Could not reach Kaneo. ${Vt("Reach Kaneo",n)}`,ye()}}var Ce=null,un=null,Xo=null,Ka=!1;function Xd(){un||(un=T("div",{className:"signin-fill"}),Xo=Ta(un,()=>void rp())),Xe?.append(un)}function Wa(){Xo?.(),Xo=null,un=null}function ye(){if(!Xe)return;if(Go(Xe),Ce=null,!h.connected){if(!Ka){let t=T("div",{style:"flex:1; display:flex; align-items:center;"});Xe.append(t),Je(t,{label:"Loading Kaneo"});return}Xd();return}if(!h.context&&h.loading){let t=T("div",{style:"flex:1; display:flex; align-items:center;"});Xe.append(t),Je(t,{label:"Loading Kaneo"});return}let e=Wd();if(e){Xe.append(Zd(e));return}if(Xe.append(Kd()),h.error){let t=T("div");Xe.append(t),Wt(t,{tone:"error",title:"Kaneo",body:h.error,action:{label:"Retry",onClick:()=>void Et()}})}Ce=T("div",{className:"scroll"}),Xe.append(Ce),Va()}function ja(e){if(!Ce)return;let t=T("div");Ce.append(t),Gr(t,{items:e,selectedId:h.preferences.openTaskId,ariaLabel:"Kaneo tasks",onSelect:n=>void Ja(n)})}function Va(){if(!Ce)return;if(Go(Ce),h.preferences.assigneeFilter==="me"){if(!h.mineLoaded){Je(Ce,{label:"Loading tasks"});return}if(h.mine.length===0){Ct(Ce,{title:"Nothing assigned to you",body:"Tasks assigned to your Kaneo account across this workspace show up here."});return}let r=h.mine.filter(Gd);if(r.length===0){Ct(Ce,{title:"Nothing matches the filters",body:"Clear the search box or the filters."});return}ja(r.map(o=>({id:o.id,title:o.title,leading:dn(o.projectSlug,o.number)})));return}if(!h.project){Ct(Ce,{title:"No project",body:"This workspace has no Kaneo project yet."});return}if(!h.board){Je(Ce,{label:"Loading tasks"});return}let e=h.board.board,t=$d(),n=e.columns.reduce((r,o)=>r+o.tasks.length,0);if(t.length===0){Ct(Ce,{title:n===0?"This board is empty":"Nothing matches the filters",body:n===0?"Open the + button next to the chat box to create the first task.":"Clear the search box or the filters.",...n===0?{action:{label:"Where do I add one?",onClick:tp}}:{}});return}h.board.truncated&&Ce.append(T("div",{className:"muted"},`Showing the first ${t.length} tasks.`)),ja(t.map(r=>({id:r.id,title:r.title,leading:Ko(r)})))}function Kd(){let e=T("div",{className:"panel-head"}),t=T("div");e.append(t),Ur(t,{value:h.search,label:"Filter tasks",placeholder:"Filter by title, ticket or description",onChange:f=>{h.search=f,Va()}});let n=T("div",{className:"toolbar filters"}),r=h.board?.board.columns??[],o=r.find(f=>f.id===h.preferences.statusFilter)?.name;sr(n,{label:o??"Status",active:h.preferences.statusFilter!==null,items:[{id:"",label:"Any status"},{separator:!0},...r.map(f=>({id:f.id,label:f.name}))],onSelect:f=>{Se({statusFilter:f||null}).then(b=>{h.preferences=b,ye()})}}),sr(n,{label:h.preferences.priorityFilter==="any"?"Priority":bt(h.preferences.priorityFilter),active:h.preferences.priorityFilter!=="any",items:[{id:"any",label:"Any priority"},{separator:!0},...Ls.map(f=>({id:f,label:bt(f)}))],onSelect:f=>{Se({priorityFilter:f}).then(b=>{h.preferences=b,ye()})}}),sr(n,{label:h.preferences.assigneeFilter==="me"?"Assigned to me":"Assignee",active:h.preferences.assigneeFilter==="me",items:[{id:"any",label:"Anyone"},{id:"me",label:"Assigned to me"}],onSelect:f=>{Se({assigneeFilter:f==="me"?"me":"any"}).then(b=>{h.preferences=b,ye()})}});let s=Ud();if(sr(n,{label:s?s.name:"Labels",active:s!==null,items:[{id:"",label:"Any label"},{separator:!0},...h.labels.map(f=>({id:f.id,label:f.name}))],onSelect:f=>{Se({labelFilter:f||null}).then(b=>{h.preferences=b,ye()})}}),Fd()){let f=T("div",{className:"filter-clear"});n.append(f),me(f,{label:"Clear",variant:"ghost",size:"sm",onClick:()=>{h.search="",Se({priorityFilter:"any",statusFilter:null,assigneeFilter:"any",labelFilter:null}).then(b=>{h.preferences=b,ye()})}})}let a=T("div",{className:"filter-refresh"});n.append(a),me(a,{label:"Refresh",variant:"ghost",size:"sm",loading:h.loading,onClick:()=>void Et({keepDetail:!0})});let p=T("div",{className:"filter-account"});n.append(p),Nn(p,{label:Hd(),size:"sm",variant:"ghost",items:[{id:"disconnect",label:"Disconnect",destructive:!0}],onSelect:f=>{f==="disconnect"&&op()}}),e.append(n);let c=T("div",{className:"toolbar scope"}),g=h.context?.workspaces??[];if(g.length>1){let f=T("div",{style:"flex:1; min-width:120px;"});c.append(f),It(f,{value:h.context?.workspaceId??"",options:g.map(b=>({id:b.id,label:b.name})),onChange:b=>void Qd(b)})}let m=h.context?.projects??[];if(m.length>0){let f=T("div",{style:"flex:1; min-width:120px;"});c.append(f),It(f,{searchable:m.length>8,searchPlaceholder:"Find a project",value:h.project?.id??"",options:m.map(b=>({id:b.id,label:b.slug.toUpperCase(),hint:b.statistics?`${b.statistics.totalTasks}`:void 0})),onChange:b=>void ep(b)})}return c.childElementCount>0&&e.append(c),e}function sr(e,t){let n=T("div",{className:t.active?"filter filter-active":"filter"});e.append(n),Nn(n,{label:t.label,size:"sm",variant:"ghost",items:t.items,onSelect:t.onSelect})}function Ya(e){if(!e||!h.board)return null;for(let t of h.board.board.columns){let n=t.tasks.find(r=>r.id===e);if(n)return n}return null}function Wd(){let e=h.preferences.openTaskId;return e?Ya(e)??(h.extraTask?.id===e?h.extraTask:null):null}function qa(e){return h.context?.projects.find(t=>t.id===e.projectId)??h.project}function Ko(e){return dn(qa(e)?.slug??"",e.number)}function Vd(e){return h.board?.board.columns.find(t=>t.id===e.status)?.name??wa(e.status)}function Yd(e){return{task:e,ticketId:Ko(e),workspaceId:h.context?.workspaceId??"",projectName:qa(e)?.name,columnName:Vd(e),comments:h.comments[e.id]?.items}}function qd(e){h.comments[e]||(h.comments[e]={loading:!0,error:null},it.listComments(e).then(t=>{h.comments[e]={loading:!1,error:null,items:t},ye()}).catch(t=>{h.comments[e]={loading:!1,error:Vt("Load comments",t)},ye()}))}async function Ja(e){if(!Ya(e)&&h.extraTask?.id!==e)try{h.extraTask=await it.getTask(e)}catch(t){await rr("Open task",t);return}h.preferences=await Se({openTaskId:e}),ye()}async function Jd(){h.preferences=await Se({openTaskId:null}),ye()}async function Xa(e,t){if(e.status===t)return;let n=h.board?.board.columns.find(r=>r.id===t);await it.updateTaskStatus(e.id,t),await $.toast({kind:"success",message:`${Ko(e)} moved to ${n?.name??t}.`}),await ga(),await Et({keepDetail:!0})}function Zd(e){qd(e.id);let t=Yd(e),n=h.board?.board.columns??[],r=n.find(o=>o.isFinal);return Ga(t,{columns:n,comments:h.comments[e.id]??null,worktree:h.preferences.createInWorktree,onWorktreeChange:o=>{h.preferences={...h.preferences,createInWorktree:o},Se({createInWorktree:o})},onMove:o=>void Xa(e,o),onCloseIssue:()=>{r&&Xa(e,r.id)},canCloseIssue:!!r&&e.status!==r?.id,onBack:()=>void Jd()})}async function Qd(e){e!==h.context?.workspaceId&&(h.preferences=await Se({workspaceId:e,projectId:null,openTaskId:null}),h.board=null,h.mine=[],h.mineLoaded=!1,h.extraTask=null,await Et())}async function ep(e){e!==h.project?.id&&(h.preferences=await Se({projectId:e,openTaskId:null}),h.project=h.context?.projects.find(t=>t.id===e)??null,h.board=null,h.extraTask=null,await Et())}function tp(){$.toast({kind:"info",message:"Open the + button next to the chat box to pick and attach a task.",dismiss:!0})}$.onReady(e=>{Ar(e,document.documentElement),Fa(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,h.ready=e,ye(),Ba||(Ba=!0,np())});async function np(){h.connected=!!(await ra().catch(()=>null))?.connected,Ka=!0,ye(),h.connected&&Et()}async function rp(){Wa(),h.connected=!0,await Et()}async function op(){await aa(),Wa(),h.connected=!1,h.context=null,h.board=null,h.mine=[],h.mineLoaded=!1,ye()}$.onReady(e=>{let t=e.settings["openchamber-url"]?.trim();za(it,t||void 0)});$.onItem(e=>{if(!e||!("providerId"in e)||e.providerId!==Un)return;let t=e.data;t?.taskId&&Ja(t.taskId)});})();
