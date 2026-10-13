"use strict";(()=>{var el=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],tl=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],us=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,o]of el)t.style.setProperty(n,e.tokens[o]);for(let[n,o,r]of tl){let i=e.tokens[r]??"";t.style.setProperty(n,i),t.style.setProperty(o,i)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},xr=(e,t)=>{us(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var En="data-oc-scrolling",br=`
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
:hover, [${En}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${En}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${En}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${En}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Tr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",o=>{let r=o.target===e?t:o.target;if(!(r instanceof Element))return;r.hasAttribute("data-oc-scrolling")||r.setAttribute("data-oc-scrolling","");let i=n.get(r);i!==void 0&&clearTimeout(i),n.set(r,setTimeout(()=>{n.delete(r),r.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var nl=`(${Tr.toString()})(document);`;var rl={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},q=(e,t)=>`var(--${e}, var(--oc-${rl[e]}, ${t}))`,ut=q("surface-background","transparent"),_n=q("surface-elevated","transparent"),Bt=q("surface-elevated-foreground","inherit"),tt=q("surface-foreground","inherit"),oe=q("surface-muted-foreground","gray"),ol=q("surface-muted","transparent"),Me=q("interactive-border","currentColor"),Le=q("interactive-hover","transparent"),ft=q("interactive-active","transparent"),Er=q("interactive-selection","transparent"),_r=q("interactive-selection-foreground","inherit"),hs=q("interactive-focus-ring","currentColor"),We=q("primary","currentColor"),Sr=q("primary-text","inherit"),yr=q("error-text","inherit"),sl=q("font-sans","inherit"),Ar=q("font-mono","monospace"),gs=q("radius","9px"),wr=`calc(${gs} - 2px)`,fs=`calc(${gs} - 4px)`,ue=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,ms=`box-shadow: 0 0 0 2px ${hs};`,Sn=e=>{let t=q(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${q(`${e}-text`,"inherit")}; }`},il=`
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
`,ks=`
.oc-sdk { color: ${tt}; font-family: ${sl}; }
.oc-sdk :focus-visible { outline: none; ${ms} }
.oc-sdk-mono { font-family: ${Ar}; }
.oc-sdk-muted { color: ${oe}; }
${Sn("success")}${Sn("warning")}${Sn("error")}${Sn("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${We}; --oc-sdk-tone-text: ${Sr}; }

.oc-sdk-btn { border-radius: ${wr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${fs}; }
.oc-sdk-btn[data-variant="default"] { color: ${Sr}; background: ${ue(We,10,ut)}; border-color: ${ue(We,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${ue(We,16,ut)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${ue(We,22,ut)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ol}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-btn[data-variant="outline"] { background: ${_n}; color: ${Bt}; border-color: ${Me}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Le}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ft}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${q("status-error","red")}; color: ${yr}; background: ${ue("var(--oc-sdk-tone)",7,ut)}; border-color: ${ue("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${ue("var(--oc-sdk-tone)",9,ut)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${ue("var(--oc-sdk-tone)",11,ut)}; }

.oc-sdk-field-note { color: ${oe}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${yr}; }
.oc-sdk-input { border-radius: ${wr}; background: ${_n}; color: ${Bt}; box-shadow: inset 0 0 0 1px ${ue(Me,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${oe}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${hs}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${q("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${q("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Ar}; }

.oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${We}; }
.oc-sdk-search-clear { border-radius: ${fs}; color: ${oe}; }
.oc-sdk-search-clear:hover { background: ${Le}; color: ${tt}; }

.oc-sdk-trigger { border-color: ${Me}; border-radius: ${wr}; background: ${_n}; color: ${Bt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ft}, ${ft}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${oe}; }
.oc-sdk-trigger-chevron { color: ${oe}; }
.oc-sdk-popup { --surface-foreground: ${Bt}; border-color: ${ue(Me,60)}; border-radius: 12px; background: ${_n}; color: ${Bt}; box-shadow: 0 8px 24px ${ue(tt,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Le}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Er}; color: ${_r}; }
.oc-sdk-option-check { color: ${tt}; }
.oc-sdk-option[data-destructive="true"] { color: ${yr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${ue(q("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${oe}; }
.oc-sdk-popup-empty { color: ${oe}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Me}; border-radius: 4px; color: ${tt}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${ue(tt,60,Me)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Me}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ut}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${We}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ms} }
.oc-sdk-check-desc { color: ${oe}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${ue(tt,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${oe}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${tt}; }
.oc-sdk-tab[aria-selected="true"] { color: ${_r}; background: ${Er}; border-color: ${Me}; }
.oc-sdk-tab-count { color: ${oe}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Le}; color: ${oe}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${ue("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Le}; }
.oc-sdk-row[aria-selected="true"] { background: ${Er}; color: ${_r}; }
.oc-sdk-row-lead { font-family: ${Ar}; color: ${oe}; }
.oc-sdk-row-sub { color: ${oe}; }
.oc-sdk-row-meta { color: ${oe}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${oe}; }

.oc-sdk-empty-body { color: ${oe}; }

.oc-sdk-spinner { color: ${oe}; }
.oc-sdk-spinner-ring { border-color: ${Me}; border-top-color: ${We}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${ue("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${ue("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${oe}; }

.oc-sdk-separator { color: ${oe}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${ue(Me,40)}; }

.oc-sdk-progress-label { color: ${oe}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Me}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${We}); }

.oc-sdk-text a { color: ${Sr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${ue(Me,60)}; }
`,J=`
${br}
${il}
${ks}`;var xs="oc-sdk-ui-style",nt=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},Z=e=>{let t=document.getElementById(xs);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Tr(document);let n=document.createElement("style");n.id=xs,n.textContent=e,document.head.appendChild(n)},R=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},Pe=e=>{let t=R("button",e);return t.type="button",t},le=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)},ze=(e,t,n)=>{n==null||n===""?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)},bs=(e,t)=>{let n=o=>{o.target instanceof Node&&e.contains(o.target)||t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var al=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Se=(e,t)=>{Z(J);let n=t,o=Pe("oc-sdk oc-sdk-btn"),r=al(),i=document.createElement("span");o.append(i),e.append(o);let a=()=>{o.dataset.variant=n.variant??"default",o.dataset.size=n.size??"default",o.disabled=!!n.disabled||!!n.loading,o.dataset.loading=n.loading?"true":"false",o.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&r.parentNode!==o?o.prepend(r):!n.loading&&r.parentNode===o&&r.remove(),le(i,n.label)},u=()=>{n.disabled||n.loading||n.onClick()};return o.addEventListener("click",u),a(),{update:c=>{n={...n,...c},a()},dispose:()=>{o.removeEventListener("click",u),o.remove()}}};var Ts="http://www.w3.org/2000/svg",ll={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ve=(e,t,n)=>{let o=document.createElementNS(Ts,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),n&&o.setAttribute("class",n);let r=document.createElementNS(Ts,"path");return r.setAttribute("d",ll[e]),o.append(r),o};var vr=(e,t)=>{Z(J);let n=t,o=R("div","oc-sdk oc-sdk-search"),r=R("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let i=Pe("oc-sdk-search-clear");i.append(Ve("close",14)),i.tabIndex=-1,o.append(Ve("search",16,"oc-sdk-search-icon"),r,i),e.append(o);let a=()=>{let f=n.placeholder??"Search";ze(r,"placeholder",f),r.setAttribute("aria-label",n.label??f),i.setAttribute("aria-label","Clear search"),r.value!==n.value&&(r.value=n.value),o.dataset.active=n.value.trim()===""?"false":"true"},u=()=>{n.value!==""&&n.onChange(""),r.focus()},c=()=>{n.onChange(r.value)},g=f=>{f.key==="Escape"&&r.value!==""&&(f.preventDefault(),u())};return r.addEventListener("input",c),r.addEventListener("keydown",g),i.addEventListener("click",u),a(),n.autofocus&&r.focus(),{update:f=>{n={...n,...f},a()},dispose:()=>{r.removeEventListener("input",c),r.removeEventListener("keydown",g),i.removeEventListener("click",u),o.remove()}}};var Ke=(e,t="vertical")=>{let[n,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},rt=(e,t,n)=>{let o=e.filter(c=>!c.disabled);if(o.length===0)return null;let r=o[0],i=o[o.length-1];if(n==="first"||!r||!i)return r?.id??null;if(n==="last")return i.id;let a=o.findIndex(c=>c.id===t);return a===-1?n==="next"?r.id:i.id:o[Math.min(o.length-1,Math.max(0,a+(n==="next"?1:-1)))]?.id??null};var Es=(e,t)=>`${e}-${t??""}`,yn=(e,t,n,o)=>{let r=Pe("oc-sdk-option");r.id=Es(e,n.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=!!n.disabled,t==="option"&&r.setAttribute("aria-selected",n.selected?"true":"false"),r.dataset.destructive=n.destructive?"true":"false";let i=R("span","oc-sdk-option-label");if(i.textContent=n.label,r.append(i),n.hint){let a=R("span","oc-sdk-option-hint");a.textContent=n.hint,r.append(a)}if(t==="option"){r.dataset.mark="check";let a=R("span","oc-sdk-option-check");a.append(Ve("check",14)),r.append(a)}return r.addEventListener("pointerenter",o.hover),r.addEventListener("click",o.pick),r},An=(e,t,n,o)=>{let r=Es(n,o);for(let i of Array.from(e.children))i instanceof HTMLElement&&i.classList.contains("oc-sdk-option")&&(i.dataset.active=i.id===r?"true":"false");ze(t,"aria-activedescendant",o?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var cl=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let o=e.offsetHeight,r=window.innerHeight-n.bottom-8;o>r&&n.top-8>r&&(e.style.top=`${Math.max(8,Math.round(n.top-4-o))}px`);let i=n.left+e.offsetWidth-window.innerWidth+8;i>0&&(e.style.left=`${Math.max(8,Math.round(n.left-i))}px`)},wn=(e,t,n,o)=>{e.append(n),cl(n,t);let r=bs(e,o),i=()=>{o()},a=u=>{u.target instanceof Node&&n.contains(u.target)||o()};return window.addEventListener("resize",i),window.addEventListener("scroll",a,!0),()=>{r(),window.removeEventListener("resize",i),window.removeEventListener("scroll",a,!0),n.remove()}};var _s=(e,t)=>{let n=t.trim().toLowerCase();return n?e.filter(o=>o.label.toLowerCase().includes(n)||o.id.toLowerCase().includes(n)):[...e]},dl=0,Ot=(e,t)=>{Z(J);let n=t,o=`oc-sdk-select-${dl+=1}`,r=R("div","oc-sdk oc-sdk-select"),i=R("span","oc-sdk-field-label");i.id=`${o}-label`;let a=Pe("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",i.id);let u=R("span","oc-sdk-trigger-value");a.append(u,Ve("chevron",14,"oc-sdk-trigger-chevron")),r.append(i,a),e.append(r);let c="",g=null,f=null,h=R("div","oc-sdk oc-sdk-popup"),T=R("div","oc-sdk-popup-search"),y=R("input","oc-sdk-input");y.type="text",y.autocomplete="off",T.append(y);let P=R("div");P.setAttribute("role","listbox"),P.tabIndex=-1,h.append(P);let W=()=>_s(n.options,n.searchable?c:""),de=()=>n.searchable?y:P,L=I=>{g=I,An(P,de(),o,I)},te=()=>{nt(P);let I=W();if(I.length===0){let se=R("div","oc-sdk-popup-empty");se.textContent="No matches",P.append(se)}for(let se of I)P.append(yn(o,"option",{...se,selected:se.id===n.value},{hover:()=>L(se.id),pick:()=>fe(se.id)}));L(I.some(se=>se.id===g)?g:I[0]?.id??null)},ke=()=>{let I=f;f=null,I?.(),c="",y.value="",a.setAttribute("aria-expanded","false")},ae=()=>{f||n.disabled||(g=n.value,y.placeholder=n.searchPlaceholder??"Search",n.searchable?h.prepend(T):T.remove(),te(),f=wn(r,a,h,ke),a.setAttribute("aria-expanded","true"),de().focus())},fe=I=>{ke(),a.focus(),I!==n.value&&n.onChange(I)},me=()=>{f?ke():ae()},F=I=>{!f&&Ke(I)&&(I.preventDefault(),ae())},v=I=>{let se=Ke(I);se?(I.preventDefault(),L(rt(W(),g,se))):I.key==="Enter"?(I.preventDefault(),g&&fe(g)):I.key==="Escape"?(I.preventDefault(),ke(),a.focus()):n.searchable&&I.target!==y&&I.key.length===1&&!I.ctrlKey&&!I.metaKey&&y.focus()},w=()=>{c=y.value,te()},Ee=I=>{f&&!(I.relatedTarget instanceof Node&&r.contains(I.relatedTarget))&&ke()},ee=()=>{le(i,n.label),i.hidden=!n.label;let I=n.options.find(se=>se.id===n.value);le(u,I?.label??n.placeholder??"Select"),u.dataset.empty=I?"false":"true",a.disabled=!!n.disabled,f&&te()};return a.addEventListener("click",me),a.addEventListener("keydown",F),h.addEventListener("keydown",v),y.addEventListener("input",w),r.addEventListener("focusout",Ee),ee(),{update:I=>{n={...n,...I},ee()},dispose:()=>{ke(),a.removeEventListener("click",me),a.removeEventListener("keydown",F),h.removeEventListener("keydown",v),y.removeEventListener("input",w),r.removeEventListener("focusout",Ee),r.remove()}}};var pl=(e,t,n)=>{Z(J);let o=t,r=Pe("oc-sdk oc-sdk-check");r.setAttribute("role",n);let i=R("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");n==="checkbox"&&i.append(Ve("check",12));let a=R("span","oc-sdk-check-text"),u=R("span","oc-sdk-check-label"),c=R("span","oc-sdk-check-desc");a.append(u,c),r.append(i,a),e.append(r);let g=()=>{r.setAttribute("aria-checked",o.checked?"true":"false"),r.disabled=!!o.disabled,le(u,o.label),le(c,o.description),c.hidden=!o.description},f=()=>{o.disabled||o.onChange(!o.checked)};return r.addEventListener("click",f),g(),{update:h=>{o={...o,...h},g()},dispose:()=>{r.removeEventListener("click",f),r.remove()}}},Rr=(e,t)=>pl(e,t,"checkbox");var Or=(e,t)=>{ze(e,"data-tone",t&&t!=="neutral"?t:null)};var ul=0,Ir=(e,t)=>{Z(J);let n=t,o=`oc-sdk-list-${ul+=1}`,r=R("div","oc-sdk oc-sdk-list");r.setAttribute("role","listbox"),r.tabIndex=0,e.append(r);let i=null,a=h=>`${o}-${h}`,u=h=>{i=h;for(let T of Array.from(r.children))T instanceof HTMLElement&&(T.dataset.active=T.id===a(h??"")?"true":"false");ze(r,"aria-activedescendant",h?a(h):null),r.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},c=(h,T)=>{let y=R("span",h);return y.textContent=T,y},g=()=>{if(nt(r),ze(r,"aria-label",n.ariaLabel),n.items.length===0){r.append(c("oc-sdk-list-empty",n.emptyText??"Nothing here")),u(null);return}for(let T of n.items){let y=Pe("oc-sdk-row");y.id=a(T.id),y.setAttribute("role","option"),y.setAttribute("aria-selected",T.id===n.selectedId?"true":"false"),y.disabled=!!T.disabled,y.tabIndex=-1,T.leading&&y.append(c("oc-sdk-row-lead",T.leading));let P=R("span","oc-sdk-row-main");if(P.append(c("oc-sdk-row-title",T.title)),T.subtitle&&P.append(c("oc-sdk-row-sub",T.subtitle)),y.append(P),T.badge){let W=c("oc-sdk-badge",T.badge.label);Or(W,T.badge.tone),y.append(W)}T.meta&&y.append(c("oc-sdk-row-meta",T.meta)),y.addEventListener("click",()=>n.onSelect(T.id)),r.append(y)}let h=n.items.some(T=>T.id===i&&!T.disabled);u(h?i:n.selectedId??null)},f=h=>{let T=Ke(h);if(T){h.preventDefault(),u(rt(n.items,i,T));return}(h.key==="Enter"||h.key===" ")&&i&&(h.preventDefault(),n.onSelect(i))};return r.addEventListener("keydown",f),g(),{update:h=>{n={...n,...h},g()},dispose:()=>{r.removeEventListener("keydown",f),r.remove()}}};var mt=(e,t)=>{Z(J);let n=t,o=R("div","oc-sdk oc-sdk-empty"),r=R("h2","oc-sdk-empty-title"),i=R("p","oc-sdk-empty-body"),a=R("div","oc-sdk-empty-action");o.append(r,i,a),e.append(o);let u=null,c=()=>{if(le(r,n.title),le(i,n.body),i.hidden=!n.body,a.hidden=!n.action,!n.action){u?.dispose(),u=null;return}let g={label:n.action.label,onClick:n.action.onClick};u?u.update(g):u=Se(a,{...g,variant:"outline",size:"sm"})};return c(),{update:g=>{n={...n,...g},c()},dispose:()=>{u?.dispose(),u=null,o.remove()}}};var jt=(e,t={})=>{Z(J);let n=t,o=R("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let r=R("span","oc-sdk-spinner-ring");r.setAttribute("aria-hidden","true");let i=R("span");o.append(r,i),e.append(o);let a=()=>{o.dataset.size=n.size??"default",le(i,n.label),i.hidden=!n.label,o.setAttribute("aria-label",n.label??"Loading")};return a(),{update:u=>{n={...n,...u},a()},dispose:()=>{o.remove()}}};var Cr=(e,t)=>{Z(J);let n=t,o=R("div","oc-sdk oc-sdk-banner"),r=R("div","oc-sdk-banner-text"),i=R("div","oc-sdk-banner-title"),a=R("div","oc-sdk-banner-body"),u=R("div","oc-sdk-banner-action");r.append(i,a),o.append(r,u),e.append(o);let c=null,g=()=>{if(o.dataset.tone=n.tone,o.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),le(i,n.title),le(a,n.body),a.hidden=!n.body,u.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let f={label:n.action.label,onClick:n.action.onClick};c?c.update(f):c=Se(u,{...f,variant:"outline",size:"xs"})};return g(),{update:f=>{n={...n,...f},g()},dispose:()=>{c?.dispose(),c=null,o.remove()}}};var Ss=e=>e.filter(t=>!("separator"in t)),fl=0,Lr=(e,t)=>{Z(J);let n=t,o=`oc-sdk-menu-${fl+=1}`,r=R("div","oc-sdk oc-sdk-menu");e.append(r);let i=R("div","oc-sdk oc-sdk-popup");i.setAttribute("role","menu"),i.tabIndex=-1;let a=null,u=null,c=Se(r,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{a?T():y()}}),g=r.querySelector("button");g?.setAttribute("aria-haspopup","menu");let f=L=>{u=L,An(i,i,o,L)},h=()=>{nt(i);for(let L of n.items){if("separator"in L){let te=R("div","oc-sdk-separator");te.dataset.labeled="false",i.append(te);continue}i.append(yn(o,"menuitem",L,{hover:()=>f(L.id),pick:()=>P(L.id)}))}f(Ss(n.items).some(L=>L.id===u)?u:null)},T=()=>{let L=a;a=null,L?.(),u=null,g?.setAttribute("aria-expanded","false")},y=()=>{a||!g||(h(),a=wn(r,g,i,T),g.setAttribute("aria-expanded","true"),i.focus())},P=L=>{T(),g?.focus(),n.onSelect(L)},W=L=>{let te=Ke(L);te?(L.preventDefault(),f(rt(Ss(n.items),u,te))):L.key==="Enter"||L.key===" "?(L.preventDefault(),u&&P(u)):L.key==="Escape"&&(L.preventDefault(),T(),g?.focus())},de=L=>{a&&!(L.relatedTarget instanceof Node&&r.contains(L.relatedTarget))&&T()};return i.addEventListener("keydown",W),r.addEventListener("focusout",de),{update:L=>{n={...n,...L},c.update({label:n.label,variant:n.variant,size:n.size}),a&&h()},dispose:()=>{T(),i.removeEventListener("keydown",W),r.removeEventListener("focusout",de),c.dispose(),r.remove()}}};var ml="https://kaneo.qubitquilt.dev",ys=ml.replace(/\/api\/?$/,""),vn="kaneo-tasks",Pr=100,As=["no-priority","low","medium","high","urgent"];var ht={"no-priority":0,low:1,medium:2,high:3,urgent:4};var Ye=class extends Error{status;code;constructor(t,n,o){super(o),this.name="KaneoError",this.status=t,this.code=n}};function hl(e){if(!e)return;let t={};for(let[n,o]of Object.entries(e))o==null||o===""||(t[n]=String(o));return Object.keys(t).length>0?t:void 0}function gl(e,t){let n=typeof t=="object"&&t!==null?t:{},o=typeof n.message=="string"&&n.message?n.message:`Kaneo answered ${e}.`;return new Ye(e,n.code??`HTTP_${e}`,o)}var kl=10,xl=2,bl=800;function ws(e){async function t({method:o,path:r,query:i,body:a}){let u=hl(i),c="/api"+r,g;for(let T=0;g=await e({method:o,path:c,...u?{query:u}:{},...a===void 0?{}:{body:JSON.stringify(a)}}),!(g.status!==429||T>=xl);T+=1)await new Promise(y=>setTimeout(y,bl*2**T));let f=g,h;if(f.body)try{h=JSON.parse(f.body)}catch{throw f.status>=400?new Ye(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new Ye(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw gl(f.status,h);return h}async function n(o){let r=encodeURIComponent(o),i=await t({method:"GET",path:`/task/tasks/${r}`,query:{page:1,limit:Pr}}),a=i.data,u=i.pagination,c=1;for(;c<Math.min(u.totalPages,kl);){c+=1;let g=await t({method:"GET",path:`/task/tasks/${r}`,query:{page:c,limit:Pr}});for(let f of g.data.columns){let h=a.columns.find(T=>T.id===f.id);h&&h.tasks.push(...f.tasks)}a.archivedTasks.push(...g.data.archivedTasks),a.plannedTasks.push(...g.data.plannedTasks)}return{board:a,pagination:u,truncated:u.totalPages>c}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(o,r=!1)=>t({method:"GET",path:"/project",query:{workspaceId:o,includeArchived:r?"true":void 0}}),getBoard:n,getTask:o=>t({method:"GET",path:`/task/${encodeURIComponent(o)}`,query:{view:"detail"}}),getTaskByTicketId:(o,r)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(o)}`,query:{workspaceId:r}}),listAssignedTasks:o=>t({method:"GET",path:"/task/assigned",query:{workspaceId:o}}),search:(o,r,i={})=>t({method:"GET",path:"/search",query:{q:r,type:"tasks",workspaceId:o,projectId:i.projectId,limit:i.limit??30}}),listLabels:o=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(o)}`}),listColumns:o=>t({method:"GET",path:`/column/${encodeURIComponent(o)}`}),listComments:o=>t({method:"GET",path:`/comment/${encodeURIComponent(o)}`}),createComment:(o,r)=>t({method:"POST",path:`/comment/${encodeURIComponent(o)}`,body:{content:r}}),createTask:(o,r)=>t({method:"POST",path:`/task/${encodeURIComponent(o)}`,body:r}),updateTaskStatus:(o,r)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(o)}`,body:{status:r}}),updateTaskPriority:(o,r)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(o)}`,body:{priority:r}})}}function Tl(e,t){this.v=e,this.k=t}function vs(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function El(e){if(Array.isArray(e))return e}function _l(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var o,r,i,a,u=[],c=!0,g=!1;try{if(i=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(o=i.call(n)).done)&&(u.push(o.value),u.length!==t);c=!0);}catch(f){g=!0,r=f}finally{try{if(!c&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(g)throw r}}return u}}function Sl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function yl(e,t){return El(e)||_l(e,t)||Al(e,t)||Sl()}function Al(e,t){if(e){if(typeof e=="string")return vs(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?vs(e,t):void 0}}function Rn(e){var t,n;function o(i,a){try{var u=e[i](a),c=u.value,g=c instanceof Tl;Promise.resolve(g?c.v:c).then(function(f){if(g){var h=i==="return"&&c.k?i:"next";if(!c.k||f.done)return o(h,f);f=e[h](f).value}r(!!u.done,f)},function(f){o("throw",f)})}catch(f){r(2,f)}}function r(i,a){i===2?t.reject(a):t.resolve({value:a,done:i}),(t=t.next)?o(t.key,t.arg):n=null}this._invoke=function(i,a){return new Promise(function(u,c){var g={key:i,arg:a,resolve:u,reject:c,next:null};n?n=n.next=g:(t=n=g,o(i,a))})},typeof e.return!="function"&&(this.return=void 0)}Rn.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},Rn.prototype.next=function(e){return this._invoke("next",e)},Rn.prototype.throw=function(e){return this._invoke("throw",e)},Rn.prototype.return=function(e){return this._invoke("return",e)};var zs=Object.entries,Rs=Object.setPrototypeOf,wl=Object.isFrozen,Bs=Object.getPrototypeOf,js=Object.getOwnPropertyDescriptor,ge=Object.freeze,Te=Object.seal,It=Object.create,Xs=typeof Reflect<"u"&&Reflect,Br=Xs.apply,jr=Xs.construct;ge||(ge=function(t){return t});Te||(Te=function(t){return t});Br||(Br=function(t,n){for(var o=arguments.length,r=new Array(o>2?o-2:0),i=2;i<o;i++)r[i-2]=arguments[i];return t.apply(n,r)});jr||(jr=function(t){for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return new t(...o)});var qe=Q(Array.prototype.forEach);Array.prototype.indexOf;var vl=Q(Array.prototype.lastIndexOf),Os=Q(Array.prototype.pop),Xt=Q(Array.prototype.push),Rl=Q(Array.prototype.slice),Ol=Q(Array.prototype.splice),Ct=Array.isArray,Nr=Ws(Set),Mr=Q(Set.prototype.add),Wt=Q(Set.prototype.has),gt=Q(String.prototype.toLowerCase),Ur=Q(String.prototype.toString),Is=Q(String.prototype.match),Vt=Q(String.prototype.replace),Cs=Q(String.prototype.indexOf),Il=Q(String.prototype.trim),Cl=Q(Number.prototype.toString),Ll=Q(Boolean.prototype.toString),Ls=typeof BigInt>"u"?null:Q(BigInt.prototype.toString),Ps=typeof Symbol>"u"?null:Q(Symbol.prototype.toString),Oe=Q(Object.prototype.hasOwnProperty),Kt=Q(Object.prototype.toString),be=Q(RegExp.prototype.test),Je=Ws(TypeError);function Q(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,o=new Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return Br(e,t,o)}}function Ws(e){return function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return jr(e,n)}}function D(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:gt;if(Rs&&Rs(e,null),!Ct(t))return e;let o=t.length;for(;o--;){let r=t[o];if(typeof r=="string"){let i=n(r);i!==r&&(wl(t)||(t[o]=i),r=i)}e[r]=!0}return e}function Pl(e){for(let t=0;t<e.length;t++)Oe(e,t)||(e[t]=null);return e}function Ne(e){let t=It(null);for(let o of zs(e)){var n=yl(o,2);let r=n[0],i=n[1];Oe(e,r)&&(Ct(i)?t[r]=Pl(i):i&&typeof i=="object"&&i.constructor===Object?t[r]=Ne(i):t[r]=i)}return t}function Nl(e){switch(typeof e){case"string":return e;case"number":return Cl(e);case"boolean":return Ll(e);case"bigint":return Ls?Ls(e):"0";case"symbol":return Ps?Ps(e):"Symbol()";case"undefined":return Kt(e);case"function":case"object":{if(e===null)return Kt(e);let t=e,n=Ue(t,"toString");if(typeof n=="function"){let o=n(t);return typeof o=="string"?o:Kt(o)}return Kt(e)}default:return Kt(e)}}function Ue(e,t){for(;e!==null;){let o=js(e,t);if(o){if(o.get)return Q(o.get);if(typeof o.value=="function")return Q(o.value)}e=Bs(e)}function n(){return null}return n}function Ml(e,t){for(;e!==null;){let n=js(e,t);if(n)return n.get?Q(n.get):null;e=Bs(e)}return null}function Ul(e){try{return be(e,""),!0}catch{return!1}}var Ns=ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Dr=ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Gr=ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Dl=ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$r=ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gl=ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ms=ge(["#text"]),Us=ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Fr=ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ds=ge(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),On=ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),$l=Te(/{{[\w\W]*|^[\w\W]*}}/g),Fl=Te(/<%[\w\W]*|^[\w\W]*%>/g),Hl=Te(/\${[\w\W]*/g),zl=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),Bl=Te(/^aria-[\-\w]+$/),Gs=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),jl=Te(/^(?:\w+script|data):/i),Xl=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wl=Te(/^html$/i),Vl=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),Hr=Te(/<[/\w!]/g),$s=Te(/<[/\w]/g),Kl=Te(/<\/no(script|embed|frames)/i),Fs=Te(/\/>/i),ce={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yl=ge(D({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),ql=function(){return typeof window>"u"?null:window},Jl=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let o=null,r="data-tt-policy-suffix";n&&n.hasAttribute(r)&&(o=n.getAttribute(r));let i="dompurify"+(o?"#"+o:"");try{return t.createPolicy(i,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Hs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},ot=function(t,n,o,r){return Oe(t,n)&&Ct(t[n])?D(r.base?Ne(r.base):{},t[n],r.transform):o},zr=function(t,n,o){let r=Oe(t,n)?t[n]:void 0;return r&&typeof r=="object"?Ne(r):o()};function Vs(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ql(),t=b=>Vs(b);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ce.document||!e.Element)return t.isSupported=!1,t;let n=e.document,o=n,r=o.currentScript;e.DocumentFragment;let i=e.HTMLTemplateElement,a=e.Node,u=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let g=e.DOMParser,f=e.trustedTypes,h=u.prototype,T=Ue(h,"cloneNode"),y=Ue(h,"remove"),P=Ue(h,"removeAttributeNode"),W=Ue(h,"nextSibling"),de=Ue(h,"childNodes"),L=Ue(h,"parentNode"),te=Ue(h,"shadowRoot"),ke=Ue(h,"attributes"),ae=a&&a.prototype?Ue(a.prototype,"nodeType"):null,fe=a&&a.prototype?Ue(a.prototype,"nodeName"):null,me=a&&a.prototype?Ue(a.prototype,"ownerDocument"):null,F=function(s){return ae?ae(s):s.nodeType},v=function(s){return fe?fe(s):s.nodeName},w=Ml(h,"namespaceURI"),Ee=function(s){return w?w(s):s.namespaceURI};if(typeof i=="function"){let b=n.createElement("template");b.content&&b.content.ownerDocument&&(n=b.content.ownerDocument)}let ee,I="",se,Mt=!1,he=0,ne=function(){if(he>0)throw Je('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},je=function(s){ne(),he++;try{return ee.createHTML(s)}finally{he--}},xe=function(s){ne(),he++;try{return ee.createScriptURL(s)}finally{he--}},re=function(){return Mt||(se=Jl(f,r),Mt=!0),se},Y=n,at=Y.implementation,Ut=Y.createNodeIterator,sn=Y.createDocumentFragment,an=Y.getElementsByTagName,Tt=o.importNode,H=Hs();t.isSupported=typeof zs=="function"&&typeof L=="function"&&at&&at.createHTMLDocument!==void 0;let ln=$l,cn=Fl,dn=Hl,Ce=zl,Dt=Bl,Gt=jl,pn=Xl,Et=Vl,$t=Gs,K=null,l=D({},[...Ns,...Dr,...Gr,...$r,...Ms]),p=null,_=D({},[...Us,...Fr,...Ds,...On]),E=Object.seal(It(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,V=null,j=Object.seal(It(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Fo=!0,Zn=!0,Ho=!1,Qn=!0,Xe=!1,lt=!0,ct=!1,er=!1,un=null,fn=null,tr=!1,_t=!1,mn=!1,hn=!1,zo=!0,Bo=!1,jo="user-content-",nr=!0,rr=!1,dt=null,St={},pt=null,Xo=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),Wo=null,Vo=D({},["audio","video","img","source","image","track"]),Ko=null,Yo=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gn="http://www.w3.org/1998/Math/MathML",kn="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",yt=Fe,or=!1,sr=null,Na=D({},[gn,kn,Fe],Ur),qo=ge(["mi","mo","mn","ms","mtext"]),ir=D({},qo),Jo=ge(["annotation-xml"]),ar=D({},Jo),Ma=D({},["title","style","font","a","script"]),Ft=null,Ua=["application/xhtml+xml","text/html"],Da="text/html",ie=null,At=null,Ga=n.createElement("form"),Zo=function(s){return s instanceof RegExp||s instanceof Function},lr=function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(At&&At===s)return;(!s||typeof s!="object")&&(s={}),s=Ne(s),Ft=Ua.indexOf(s.PARSER_MEDIA_TYPE)===-1?Da:s.PARSER_MEDIA_TYPE,ie=Ft==="application/xhtml+xml"?Ur:gt,K=ot(s,"ALLOWED_TAGS",l,{transform:ie}),p=ot(s,"ALLOWED_ATTR",_,{transform:ie}),sr=ot(s,"ALLOWED_NAMESPACES",Na,{transform:Ur}),Ko=ot(s,"ADD_URI_SAFE_ATTR",Yo,{transform:ie,base:Yo}),Wo=ot(s,"ADD_DATA_URI_TAGS",Vo,{transform:ie,base:Vo}),pt=ot(s,"FORBID_CONTENTS",Xo,{transform:ie}),z=ot(s,"FORBID_TAGS",Ne({}),{transform:ie}),V=ot(s,"FORBID_ATTR",Ne({}),{transform:ie}),St=Oe(s,"USE_PROFILES")?s.USE_PROFILES&&typeof s.USE_PROFILES=="object"?Ne(s.USE_PROFILES):s.USE_PROFILES:!1,Fo=s.ALLOW_ARIA_ATTR!==!1,Zn=s.ALLOW_DATA_ATTR!==!1,Ho=s.ALLOW_UNKNOWN_PROTOCOLS||!1,Qn=s.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Xe=s.SAFE_FOR_TEMPLATES||!1,lt=s.SAFE_FOR_XML!==!1,ct=s.WHOLE_DOCUMENT||!1,_t=s.RETURN_DOM||!1,mn=s.RETURN_DOM_FRAGMENT||!1,hn=s.RETURN_TRUSTED_TYPE||!1,tr=s.FORCE_BODY||!1,zo=s.SANITIZE_DOM!==!1,Bo=s.SANITIZE_NAMED_PROPS||!1,nr=s.KEEP_CONTENT!==!1,rr=s.IN_PLACE||!1,$t=Ul(s.ALLOWED_URI_REGEXP)?s.ALLOWED_URI_REGEXP:Gs,yt=typeof s.NAMESPACE=="string"?s.NAMESPACE:Fe,ir=zr(s,"MATHML_TEXT_INTEGRATION_POINTS",()=>D({},qo)),ar=zr(s,"HTML_INTEGRATION_POINTS",()=>D({},Jo));let d=zr(s,"CUSTOM_ELEMENT_HANDLING",()=>It(null));if(E=It(null),Oe(d,"tagNameCheck")&&Zo(d.tagNameCheck)&&(E.tagNameCheck=d.tagNameCheck),Oe(d,"attributeNameCheck")&&Zo(d.attributeNameCheck)&&(E.attributeNameCheck=d.attributeNameCheck),Oe(d,"allowCustomizedBuiltInElements")&&typeof d.allowCustomizedBuiltInElements=="boolean"&&(E.allowCustomizedBuiltInElements=d.allowCustomizedBuiltInElements),Te(E),Xe&&(Zn=!1),mn&&(_t=!0),St&&(K=D({},Ms),p=It(null),St.html===!0&&(D(K,Ns),D(p,Us)),St.svg===!0&&(D(K,Dr),D(p,Fr),D(p,On)),St.svgFilters===!0&&(D(K,Gr),D(p,Fr),D(p,On)),St.mathMl===!0&&(D(K,$r),D(p,Ds),D(p,On))),j.tagCheck=null,j.attributeCheck=null,Oe(s,"ADD_TAGS")&&(typeof s.ADD_TAGS=="function"?j.tagCheck=s.ADD_TAGS:Ct(s.ADD_TAGS)&&(K===l&&(K=Ne(K)),D(K,s.ADD_TAGS,ie))),Oe(s,"ADD_ATTR")&&(typeof s.ADD_ATTR=="function"?j.attributeCheck=s.ADD_ATTR:Ct(s.ADD_ATTR)&&(p===_&&(p=Ne(p)),D(p,s.ADD_ATTR,ie))),Oe(s,"ADD_FORBID_CONTENTS")&&Ct(s.ADD_FORBID_CONTENTS)&&(pt===Xo&&(pt=Ne(pt)),D(pt,s.ADD_FORBID_CONTENTS,ie)),nr&&(K["#text"]=!0),ct&&D(K,["html","head","body"]),K.table&&(D(K,["tbody"]),delete z.tbody),s.TRUSTED_TYPES_POLICY){if(typeof s.TRUSTED_TYPES_POLICY.createHTML!="function")throw Je('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof s.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Je('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let k=ee;ee=s.TRUSTED_TYPES_POLICY;try{I=je("")}catch(x){throw ee=k,x}}else s.TRUSTED_TYPES_POLICY===null?(ee=void 0,I=""):(ee===void 0&&(ee=re()),ee&&typeof I=="string"&&(I=je("")));ge&&ge(s),At=s},Qo=D({},[...Dr,...Gr,...Dl]),es=D({},[...$r,...Gl]),$a=function(s,d,k){return d.namespaceURI===Fe?s==="svg":d.namespaceURI===gn?s==="svg"&&(k==="annotation-xml"||ir[k]):!!Qo[s]},Fa=function(s,d,k){return d.namespaceURI===Fe?s==="math":d.namespaceURI===kn?s==="math"&&ar[k]:!!es[s]},Ha=function(s,d,k){return d.namespaceURI===kn&&!ar[k]||d.namespaceURI===gn&&!ir[k]?!1:!es[s]&&(Ma[s]||!Qo[s])},za=function(s){let d=Ee(s),k=gt(v(s)),x=L(s),A,C;return x&&F(x)===ce.element?(A={namespaceURI:Ee(x)},C=gt(v(x))):(A={namespaceURI:yt},C="template"),sr[d]?d===kn?$a(k,A,C):d===gn?Fa(k,A,C):d===Fe?Ha(k,A,C):!!(Ft==="application/xhtml+xml"&&sr[d]):!1},Qe=function(s){Xt(t.removed,{element:s});try{L(s).removeChild(s)}catch{if(y(s),!L(s))throw Je("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},ts=function(s,d,k){try{P(s,d)}catch{try{s.removeAttribute(k)}catch{}}},cr=function(s){pr(s);let d=de(s);d&&qe(Rl(d),x=>{try{y(x)}catch{}});let k=F(s)===ce.element?ke(s):null;if(k)for(let x=k.length-1;x>=0;--x){let A=k[x],C=A&&A.name;typeof C=="string"&&ts(s,A,C)}},wt=function(s,d,k){if(!k)try{k=d.getAttributeNode(s)}catch{k=null}Xt(t.removed,{attribute:k||null,from:d});try{k?P(d,k):d.removeAttribute(s)}catch{try{d.removeAttribute(s)}catch{}}if(s==="is")if(_t||mn)try{Qe(d)}catch{}else try{d.setAttribute(s,"")}catch{}},ns=function(s){let d=ke(s);if(d)for(let k=d.length-1;k>=0;--k){let x=d[k],A=x&&x.name;typeof A!="string"||p[ie(A)]||ts(s,x,A)}},dr=function(s,d){let k=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,x=[s];for(;x.length>0;){let A=x.pop();if(d(A)===!1)continue;if(k&&F(A)===ce.element){let M=te(A);et(M)&&x.push(M)}let C=de(A);if(C)for(let M=C.length-1;M>=0;--M)x.push(C[M])}},pr=function(s){dr(s,d=>{F(d)===ce.element&&ns(d)})},ur=function(s){let d=[];return dr(s,k=>{d.push(k)},!0),d},Ba=function(s,d){let k=Nr();qe(ur(s),x=>{F(x)===ce.element&&Mr(k,x)}),qe(d,x=>{F(x)===ce.element&&!Wt(k,x)&&ns(x)})},rs=function(s,d){let k=!1;return qe(t.removed,x=>{x.element&&(k=k||x.element===s,pr(x.element))}),Ba(s,d),k},ja=8,Xa=function(s,d){let k=dt,x=null,A=()=>(x||(x=Nr(),qe(d,C=>{Mr(x,C)})),x);for(let C=0;;C++){let M=ur(s),pe=[s],He=!1;if(qe(M,_e=>{F(_e)===ce.documentFragment?Xt(pe,_e):!He&&!Wt(k,_e)&&(He=Wt(A(),_e))}),!He)return;if(C>=ja)throw Je("the tree kept changing during in-place sanitization; refusing to return it");qe(pe,(_e,ve)=>{Wa(_e,ve>0,s,A())})}},Wa=function(s,d,k,x){let A=fr(s),C;for(;C=A.nextNode();)!Wt(x,C)||Wt(dt,C)||(d&&De(H.uponSanitizeShadowNode,C,null),hr(C,k),gr(C,k),et(C.content)&&zt(C.content))},Va=function(s){dt&&Mr(dt,s)},os=function(s,d){return lt?s==="patchsrc"?!0:s==="for"&&d!=="label"&&d!=="output":!1},Ka=function(s){lt&&dr(s,d=>{let k=F(d);if(k===ce.processingInstruction||k===ce.comment&&be($s,d.data)){try{y(d)}catch{}return!1}if(k===ce.element){let x=d,A=ie(v(d));try{x.hasAttribute&&x.hasAttribute("patchsrc")&&x.removeAttribute("patchsrc"),x.hasAttribute&&x.hasAttribute("for")&&os("for",A)&&x.removeAttribute("for")}catch{}}return!0})},ss=function(s){let d=null,k=null;if(tr)s="<remove></remove>"+s;else{let C=Is(s,/^[\r\n\t ]+/);k=C&&C[0]}Ft==="application/xhtml+xml"&&yt===Fe&&(s='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+s+"</body></html>");let x=ee?je(s):s;if(yt===Fe)try{d=new g().parseFromString(x,Ft)}catch{}if(!d||!d.documentElement){d=at.createDocument(yt,"template",null);try{d.documentElement.innerHTML=or?I:x}catch{}}let A=d.body||d.documentElement;return s&&k&&A.insertBefore(n.createTextNode(k),A.childNodes[0]||null),yt===Fe?an.call(d,ct?"html":"body")[0]:ct?d.documentElement:A},fr=function(s){let d=me?me(s):s.ownerDocument;return Ut.call(d||s,s,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},xn=function(s){return s=Vt(s,ln," "),s=Vt(s,cn," "),s=Vt(s,dn," "),s},mr=function(s){var d;is(s);let k=(d=s.querySelectorAll)===null||d===void 0?void 0:d.call(s,"template");k&&qe(k,x=>{et(x.content)&&mr(x.content)})},is=function(s){s.normalize();let d=me?me(s):s.ownerDocument,k=Ut.call(d||s,s,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),x=k.nextNode();for(;x;)x.data=xn(x.data),x=k.nextNode()},bn=function(s){let d=fe?fe(s):null;return typeof d!="string"||ie(d)!=="form"?!1:typeof s.nodeName!="string"||typeof s.textContent!="string"||typeof s.removeChild!="function"||s.attributes!==ke(s)||typeof s.removeAttribute!="function"||typeof s.removeAttributeNode!="function"||typeof s.getAttributeNode!="function"||typeof s.setAttribute!="function"||typeof s.namespaceURI!="string"||typeof s.insertBefore!="function"||typeof s.hasChildNodes!="function"||s.nodeType!==ae(s)||s.childNodes!==de(s)},et=function(s){if(!ae||typeof s!="object"||s===null)return!1;try{return ae(s)===ce.documentFragment}catch{return!1}},Ht=function(s){if(!ae||typeof s!="object"||s===null)return!1;try{return typeof ae(s)=="number"}catch{return!1}};function De(b,s,d){b.length!==0&&qe(b,k=>{k.call(t,s,d,At)})}let Ya=function(s,d){return!!(lt&&s.hasChildNodes()&&!Ht(s.firstElementChild)&&be(Hr,s.textContent)&&be(Hr,s.innerHTML)||lt&&Yl[d]&&F(s)===ce.element&&Ee(s)===Fe&&(Ht(s.firstElementChild)||typeof s.textContent=="string"&&be(Hr,s.textContent))||s.nodeType===ce.processingInstruction||lt&&s.nodeType===ce.comment&&be($s,s.data))},Tn=function(s,d){if(s instanceof RegExp)return be(s,d);if(s instanceof Function){for(var k=arguments.length,x=new Array(k>2?k-2:0),A=2;A<k;A++)x[A-2]=arguments[A];return!!s(d,...x)}return!1},qa=function(s,d,k){if(!z[d]&&cs(d)&&Tn(E.tagNameCheck,d))return!1;if(nr&&!pt[d]&&!pt[gt(d)]){let x=L(s),A=de(s);if(A&&x){let C=A.length;for(let M=C-1;M>=0;--M){let pe=s===k?T(A[M],!0):A[M];x.insertBefore(pe,W(s))}}}return Qe(s),!0},as=function(s,d,k,x){return s.length===0?d:d===k||d===x?Ne(d):d},vt=function(s,d){return s===d||L(s)!==null?!1:(rr&&pr(s),!0)},hr=function(s,d){if(Va(s),De(H.beforeSanitizeElements,s,null),vt(s,d))return!0;if(bn(s))return Qe(s),!0;let k=ie(v(s));if(K=as(H.uponSanitizeElement,K,l,un),De(H.uponSanitizeElement,s,{tagName:k,allowedTags:K}),vt(s,d))return!0;if(Ya(s,k))return Qe(s),!0;if(z[k]||!(j.tagCheck instanceof Function&&j.tagCheck(k))&&!K[k]){let x=qa(s,k,d);return x===!1&&(De(H.afterSanitizeElements,s,null),vt(s,d))?!0:x}if(F(s)===ce.element&&!za(s)||(k==="noscript"||k==="noembed"||k==="noframes")&&be(Kl,s.innerHTML))return Qe(s),!0;if(Xe&&s.nodeType===ce.text){let x=xn(s.textContent);s.textContent!==x&&(Xt(t.removed,{element:s.cloneNode()}),s.textContent=x)}return De(H.afterSanitizeElements,s,null),vt(s,d)},ls=function(s,d,k){if(V[d]||os(d,s)||zo&&(d==="id"||d==="name")&&(k in n||k in Ga))return!1;let x=p[d]||j.attributeCheck instanceof Function&&j.attributeCheck(d,s);return Zn&&be(Ce,d)||Fo&&be(Dt,d)?!0:x?Ko[d]||be($t,Vt(k,pn,""))||(d==="src"||d==="xlink:href"||d==="href")&&s!=="script"&&Cs(k,"data:")===0&&Wo[s]||Ho&&!be(Gt,Vt(k,pn,""))?!0:!k:cs(s)&&Tn(E.tagNameCheck,s)&&Tn(E.attributeNameCheck,d,s)||d==="is"&&E.allowCustomizedBuiltInElements&&Tn(E.tagNameCheck,k)},Ja=D({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),cs=function(s){return!Ja[gt(s)]&&be(Et,s)},Za=function(s,d,k,x){if(ee&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!k)switch(f.getAttributeType(s,d)){case"TrustedHTML":return je(x);case"TrustedScriptURL":return xe(x)}return x},Qa=function(s,d,k,x){try{return k?s.setAttributeNS(k,d,x):s.setAttribute(d,x),bn(s)?(Qe(s),!1):!0}catch{return wt(d,s),!1}},ds=function(s,d){return lt&&be(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,d)?!0:gt(s)==="attributename"&&Is(d,"href")!==null},gr=function(s,d){if(De(H.beforeSanitizeAttributes,s,null),vt(s,d))return;let k=s.attributes;if(!k||bn(s))return;p=as(H.uponSanitizeAttribute,p,_,fn);let x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:p,forceKeepAttr:void 0},A=k.length,C=ie(s.nodeName);for(;A--;){let M=k[A],pe=M.name,He=M.namespaceURI,_e=M.value,ve=ie(pe),Rt=_e,Re=pe==="value"?Rt:Il(Rt),ps=!1;if(x.attrName=ve,x.attrValue=Re,x.keepAttr=!0,x.forceKeepAttr=void 0,De(H.uponSanitizeAttribute,s,x),Re=x.attrValue,Bo&&(ve==="id"||ve==="name")&&Cs(Re,jo)!==0&&(wt(pe,s,M),Re=jo+Re,ps=!0),ds(pe,Re)){wt(pe,s,M);continue}if(!x.forceKeepAttr){if(!x.keepAttr){wt(pe,s,M);continue}if(!Qn&&be(Fs,Re)){wt(pe,s,M);continue}if(Xe&&(Re=xn(Re)),!ls(C,ve,Re)){wt(pe,s,M);continue}Re=Za(C,ve,He,Re),Re!==Rt&&Qa(s,pe,He,Re)&&ps&&Os(t.removed)}}De(H.afterSanitizeAttributes,s,null),vt(s,d)},zt=function(s){let d=null,k=fr(s);for(De(H.beforeSanitizeShadowDOM,s,null);d=k.nextNode();)if(De(H.uponSanitizeShadowNode,d,null),hr(d,s),gr(d,s),et(d.content)&&zt(d.content),F(d)===ce.element){let x=te(d);et(x)&&(kr(x),zt(x))}Xe&&is(s),De(H.afterSanitizeShadowDOM,s,null)},kr=function(s){let d=[{node:s,shadow:null}];for(;d.length>0;){let k=d.pop();if(k.shadow){zt(k.shadow);continue}let x=k.node,A=F(x)===ce.element,C=de(x);if(C)for(let M=C.length-1;M>=0;--M)d.push({node:C[M],shadow:null});if(A){let M=fe?fe(x):null;if(typeof M=="string"&&ie(M)==="template"){let pe=x.content;et(pe)&&d.push({node:pe,shadow:null})}}if(A){let M=te(x);et(M)&&d.push({node:null,shadow:M},{node:M,shadow:null})}}};return t.sanitize=function(b){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,k=null,x=null,A=null;if(or=!b,or&&(b="<!-->"),typeof b!="string"&&!Ht(b)&&(b=Nl(b),typeof b!="string"))throw Je("dirty is not a string, aborting");if(!t.isSupported)return b;er?(K=un,p=fn):lr(s),(H.uponSanitizeElement.length>0||H.uponSanitizeAttribute.length>0)&&(K=Ne(K)),H.uponSanitizeAttribute.length>0&&(p=Ne(p)),t.removed=[];let C=rr&&typeof b!="string"&&Ht(b),M=[],pe=dt;if(C){Ka(b);let ve=v(b);if(typeof ve=="string"){let Rt=ie(ve);if(!K[Rt]||z[Rt])throw cr(b),Je("root node is forbidden and cannot be sanitized in-place")}if(bn(b))throw cr(b),Je("root node is clobbered and cannot be sanitized in-place");M=ur(b),dt=Nr()}else if(Ht(b))d=ss("<!---->"),k=d.ownerDocument.importNode(b,!0),k.nodeType===ce.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?d=k:d.appendChild(k),kr(d);else{if(!_t&&!Xe&&!ct&&b.indexOf("<")===-1)return ee&&hn?je(b):b;if(d=ss(b),!d)return _t?null:hn?I:""}d&&tr&&Qe(d.firstChild);let He=C?b:d;try{C&&kr(b);let ve=fr(He);for(;x=ve.nextNode();)hr(x,He),gr(x,He),et(x.content)&&zt(x.content);C&&Xa(b,M)}catch(ve){throw C&&(cr(b),rs(b,M)),ve}finally{dt=pe}if(C){if(rs(b,M))throw Je("a node selected for removal could not be safely returned; refusing to sanitize in place");return Xe&&mr(b),b}if(_t){if(Xe&&mr(d),mn)for(A=sn.call(d.ownerDocument);d.firstChild;)A.appendChild(d.firstChild);else A=d;return(p.shadowroot||p.shadowrootmode)&&(A=Tt.call(o,A,!0)),A}let _e=ct?d.outerHTML:d.innerHTML;return ct&&K["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&be(Wl,d.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+_e),Xe&&(_e=xn(_e)),ee&&hn?je(_e):_e},t.setConfig=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};lr(b),er=!0,un=K,fn=p},t.clearConfig=function(){At=null,er=!1,un=null,fn=null,ee=se,I=""},t.isValidAttribute=function(b,s,d){At||lr({});let k=ie(b),x=ie(s);return typeof d=="string"&&(ds(s,d)||!Qn&&be(Fs,d))?!1:ls(k,x,d)},t.addHook=function(b,s){typeof s=="function"&&Oe(H,b)&&Xt(H[b],s)},t.removeHook=function(b,s){if(Oe(H,b)){if(s!==void 0){let d=vl(H[b],s);return d===-1?void 0:Ol(H[b],d,1)[0]}return Os(H[b])}},t.removeHooks=function(b){Oe(H,b)&&(H[b]=[])},t.removeAllHooks=function(){H=Hs()},t}var Ks=Vs();function Kr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xt=Kr();function ti(e){xt=e}var Zt={exec:()=>null};function $(e,t=""){let n=typeof e=="string"?e:e.source,o={replace:(r,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(ye.caret,"$1"),n=n.replace(r,a),o},getRegex:()=>new RegExp(n,t)};return o}var Zl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ql=/^(?:[ \t]*(?:\n|$))+/,ec=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,tc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,nc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Yr=/(?:[*+-]|\d{1,9}[.)])/,ni=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ri=$(ni).replace(/bull/g,Yr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),rc=$(ni).replace(/bull/g,Yr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),qr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,oc=/^[^\n]+/,Jr=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,sc=$(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Jr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ic=$(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Yr).getRegex(),Nn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Zr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ac=$("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Zr).replace("tag",Nn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),oi=$(qr).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex(),lc=$(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",oi).getRegex(),Qr={blockquote:lc,code:ec,def:sc,fences:tc,heading:nc,hr:Qt,html:ac,lheading:ri,list:ic,newline:Ql,paragraph:oi,table:Zt,text:oc},Ys=$("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex(),cc={...Qr,lheading:rc,table:Ys,paragraph:$(qr).replace("hr",Qt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ys).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nn).getRegex()},dc={...Qr,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Zr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Zt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(qr).replace("hr",Qt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ri).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,uc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,si=/^( {2,}|\\)\n(?!\s*$)/,fc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Mn=/[\p{P}\p{S}]/u,eo=/[\s\p{P}\p{S}]/u,ii=/[^\s\p{P}\p{S}]/u,mc=$(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,eo).getRegex(),ai=/(?!~)[\p{P}\p{S}]/u,hc=/(?!~)[\s\p{P}\p{S}]/u,gc=/(?:[^\s\p{P}\p{S}]|~)/u,kc=$(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),li=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,xc=$(li,"u").replace(/punct/g,Mn).getRegex(),bc=$(li,"u").replace(/punct/g,ai).getRegex(),ci="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Tc=$(ci,"gu").replace(/notPunctSpace/g,ii).replace(/punctSpace/g,eo).replace(/punct/g,Mn).getRegex(),Ec=$(ci,"gu").replace(/notPunctSpace/g,gc).replace(/punctSpace/g,hc).replace(/punct/g,ai).getRegex(),_c=$("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ii).replace(/punctSpace/g,eo).replace(/punct/g,Mn).getRegex(),Sc=$(/\\(punct)/,"gu").replace(/punct/g,Mn).getRegex(),yc=$(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ac=$(Zr).replace("(?:-->|$)","-->").getRegex(),wc=$("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ac).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Cn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,vc=$(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Cn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),di=$(/^!?\[(label)\]\[(ref)\]/).replace("label",Cn).replace("ref",Jr).getRegex(),pi=$(/^!?\[(ref)\](?:\[\])?/).replace("ref",Jr).getRegex(),Rc=$("reflink|nolink(?!\\()","g").replace("reflink",di).replace("nolink",pi).getRegex(),qs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,to={_backpedal:Zt,anyPunctuation:Sc,autolink:yc,blockSkip:kc,br:si,code:uc,del:Zt,emStrongLDelim:xc,emStrongRDelimAst:Tc,emStrongRDelimUnd:_c,escape:pc,link:vc,nolink:pi,punctuation:mc,reflink:di,reflinkSearch:Rc,tag:wc,text:fc,url:Zt},Oc={...to,link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",Cn).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Cn).getRegex()},Xr={...to,emStrongRDelimAst:Ec,emStrongLDelim:bc,url:$(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",qs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:$(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",qs).getRegex()},Ic={...Xr,br:$(si).replace("{2,}","*").getRegex(),text:$(Xr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},In={normal:Qr,gfm:cc,pedantic:dc},Yt={normal:to,gfm:Xr,breaks:Ic,pedantic:Oc},Cc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Js=e=>Cc[e];function Be(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,Js)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,Js);return e}function Zs(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function Qs(e,t){let n=e.replace(ye.findPipe,(i,a,u)=>{let c=!1,g=a;for(;--g>=0&&u[g]==="\\";)c=!c;return c?"|":" |"}),o=n.split(ye.splitPipe),r=0;if(o[0].trim()||o.shift(),o.length>0&&!o.at(-1)?.trim()&&o.pop(),t)if(o.length>t)o.splice(t);else for(;o.length<t;)o.push("");for(;r<o.length;r++)o[r]=o[r].trim().replace(ye.slashPipe,"|");return o}function qt(e,t,n){let o=e.length;if(o===0)return"";let r=0;for(;r<o;){let i=e.charAt(o-r-1);if(i===t&&!n)r++;else if(i!==t&&n)r++;else break}return e.slice(0,o-r)}function Lc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let o=0;o<e.length;o++)if(e[o]==="\\")o++;else if(e[o]===t[0])n++;else if(e[o]===t[1]&&(n--,n<0))return o;return n>0?-2:-1}function ei(e,t,n,o,r){let i=t.href,a=t.title||null,u=e[1].replace(r.other.outputLinkReplace,"$1");o.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:a,text:u,tokens:o.inlineTokens(u)};return o.state.inLink=!1,c}function Pc(e,t,n){let o=e.match(n.other.indentCodeCompensation);if(o===null)return t;let r=o[1];return t.split(`
`).map(i=>{let a=i.match(n.other.beginningSpace);if(a===null)return i;let[u]=a;return u.length>=r.length?i.slice(r.length):i}).join(`
`)}var Ln=class{options;rules;lexer;constructor(e){this.options=e||xt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:qt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],o=Pc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:o}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let o=qt(n,"#");(this.options.pedantic||!o||this.rules.other.endingSpaceChar.test(o))&&(n=o.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=qt(t[0],`
`).split(`
`),o="",r="",i=[];for(;n.length>0;){let a=!1,u=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))u.push(n[c]),a=!0;else if(!a)u.push(n[c]);else break;n=n.slice(c);let g=u.join(`
`),f=g.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");o=o?`${o}
${g}`:g,r=r?`${r}
${f}`:f;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,i,!0),this.lexer.state.top=h,n.length===0)break;let T=i.at(-1);if(T?.type==="code")break;if(T?.type==="blockquote"){let y=T,P=y.raw+`
`+n.join(`
`),W=this.blockquote(P);i[i.length-1]=W,o=o.substring(0,o.length-y.raw.length)+W.raw,r=r.substring(0,r.length-y.text.length)+W.text;break}else if(T?.type==="list"){let y=T,P=y.raw+`
`+n.join(`
`),W=this.list(P);i[i.length-1]=W,o=o.substring(0,o.length-T.raw.length)+W.raw,r=r.substring(0,r.length-y.raw.length)+W.raw,n=P.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:o,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),o=n.length>1,r={type:"list",raw:"",ordered:o,start:o?+n.slice(0,-1):"",loose:!1,items:[]};n=o?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=o?n:"[*+-]");let i=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,g="",f="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;g=t[0],e=e.substring(g.length);let h=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),T=e.split(`
`,1)[0],y=!h.trim(),P=0;if(this.options.pedantic?(P=2,f=h.trimStart()):y?P=t[1].length+1:(P=t[2].search(this.rules.other.nonSpaceChar),P=P>4?1:P,f=h.slice(P),P+=t[1].length),y&&this.rules.other.blankLine.test(T)&&(g+=T+`
`,e=e.substring(T.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex(P),te=this.rules.other.hrRegex(P),ke=this.rules.other.fencesBeginRegex(P),ae=this.rules.other.headingBeginRegex(P),fe=this.rules.other.htmlBeginRegex(P);for(;e;){let me=e.split(`
`,1)[0],F;if(T=me,this.options.pedantic?(T=T.replace(this.rules.other.listReplaceNesting,"  "),F=T):F=T.replace(this.rules.other.tabCharGlobal,"    "),ke.test(T)||ae.test(T)||fe.test(T)||L.test(T)||te.test(T))break;if(F.search(this.rules.other.nonSpaceChar)>=P||!T.trim())f+=`
`+F.slice(P);else{if(y||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ke.test(h)||ae.test(h)||te.test(h))break;f+=`
`+T}!y&&!T.trim()&&(y=!0),g+=me+`
`,e=e.substring(me.length+1),h=F.slice(P)}}r.loose||(a?r.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(a=!0));let W=null,de;this.options.gfm&&(W=this.rules.other.listIsTask.exec(f),W&&(de=W[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),r.items.push({type:"list_item",raw:g,task:!!W,checked:de,loose:!1,text:f,tokens:[]}),r.raw+=g}let u=r.items.at(-1);if(u)u.raw=u.raw.trimEnd(),u.text=u.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){let g=r.items[c].tokens.filter(h=>h.type==="space"),f=g.length>0&&g.some(h=>this.rules.other.anyLine.test(h.raw));r.loose=f}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),o=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:o,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Qs(t[1]),o=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===o.length){for(let a of o)this.rules.other.tableAlignRight.test(a)?i.align.push("right"):this.rules.other.tableAlignCenter.test(a)?i.align.push("center"):this.rules.other.tableAlignLeft.test(a)?i.align.push("left"):i.align.push(null);for(let a=0;a<n.length;a++)i.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:i.align[a]});for(let a of r)i.rows.push(Qs(a,i.header.length).map((u,c)=>({text:u,tokens:this.lexer.inline(u),header:!1,align:i.align[c]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=qt(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Lc(t[2],"()");if(i===-2)return;if(i>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let o=t[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(o);i&&(o=i[1],r=i[3])}else r=t[3]?t[3].slice(1,-1):"";return o=o.trim(),this.rules.other.startAngleBracket.test(o)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?o=o.slice(1):o=o.slice(1,-1)),ei(t,{href:o&&o.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let o=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=t[o.toLowerCase()];if(!r){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return ei(n,r,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let o=this.rules.inline.emStrongLDelim.exec(e);if(!(!o||o[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(o[1]||o[2])||!n||this.rules.inline.punctuation.exec(n))){let r=[...o[0]].length-1,i,a,u=r,c=0,g=o[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(g.lastIndex=0,t=t.slice(-1*e.length+r);(o=g.exec(t))!=null;){if(i=o[1]||o[2]||o[3]||o[4]||o[5]||o[6],!i)continue;if(a=[...i].length,o[3]||o[4]){u+=a;continue}else if((o[5]||o[6])&&r%3&&!((r+a)%3)){c+=a;continue}if(u-=a,u>0)continue;a=Math.min(a,a+u+c);let f=[...o[0]][0].length,h=e.slice(0,r+o.index+f+a);if(Math.min(r,a)%2){let y=h.slice(1,-1);return{type:"em",raw:h,text:y,tokens:this.lexer.inlineTokens(y)}}let T=h.slice(2,-2);return{type:"strong",raw:h,text:T,tokens:this.lexer.inlineTokens(T)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),o=this.rules.other.nonSpaceChar.test(n),r=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return o&&r&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,o;return t[2]==="@"?(n=t[1],o="mailto:"+n):(n=t[1],o=n),{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,o;if(t[2]==="@")n=t[0],o="mailto:"+n;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0]);n=t[0],t[1]==="www."?o="http://"+t[0]:o=t[0]}return{type:"link",raw:t[0],text:n,href:o,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ge=class Wr{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xt,this.options.tokenizer=this.options.tokenizer||new Ln,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ye,block:In.normal,inline:Yt.normal};this.options.pedantic?(n.block=In.pedantic,n.inline=Yt.pedantic):this.options.gfm&&(n.block=In.gfm,this.options.breaks?n.inline=Yt.breaks:n.inline=Yt.gfm),this.tokenizer.rules=n}static get rules(){return{block:In,inline:Yt}}static lex(t,n){return new Wr(n).lex(t)}static lexInline(t,n){return new Wr(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let o=this.inlineQueue[n];this.inlineTokens(o.src,o.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],o=!1){for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let r;if(this.options.extensions?.block?.some(a=>(r=a.call({lexer:this},t,n))?(t=t.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(t)){t=t.substring(r.raw.length);let a=n.at(-1);r.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(t)){t=t.substring(r.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+r.raw,a.text+=`
`+r.text,this.inlineQueue.at(-1).src=a.text):n.push(r);continue}if(r=this.tokenizer.fences(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(t)){t=t.substring(r.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+r.raw,a.text+=`
`+r.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},n.push(r));continue}if(r=this.tokenizer.table(t)){t=t.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(t)){t=t.substring(r.raw.length),n.push(r);continue}let i=t;if(this.options.extensions?.startBlock){let a=1/0,u=t.slice(1),c;this.options.extensions.startBlock.forEach(g=>{c=g.call({lexer:this},u),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(i=t.substring(0,a+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let a=n.at(-1);o&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+r.raw,a.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(r),o=i.length!==t.length,t=t.substring(r.raw.length);continue}if(r=this.tokenizer.text(t)){t=t.substring(r.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+r.raw,a.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(r);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let o=t,r=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)c.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,r.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)i=r[2]?r[2].length:0,o=o.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);o=this.options.hooks?.emStrongMask?.call({lexer:this},o)??o;let a=!1,u="";for(;t;){a||(u=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=n.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,o,u)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let g=t;if(this.options.extensions?.startInline){let f=1/0,h=t.slice(1),T;this.options.extensions.startInline.forEach(y=>{T=y.call({lexer:this},h),typeof T=="number"&&T>=0&&(f=Math.min(f,T))}),f<1/0&&f>=0&&(g=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(g)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(u=c.raw.slice(-1)),a=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):n.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Pn=class{options;parser;constructor(e){this.options=e||xt}space(e){return""}code({text:e,lang:t,escaped:n}){let o=(t||"").match(ye.notSpaceStart)?.[0],r=e.replace(ye.endingNewline,"")+`
`;return o?'<pre><code class="language-'+Be(o)+'">'+(n?r:Be(r,!0))+`</code></pre>
`:"<pre><code>"+(n?r:Be(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,o="";for(let a=0;a<e.items.length;a++){let u=e.items[a];o+=this.listitem(u)}let r=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+r+i+`>
`+o+"</"+r+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+Be(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let r=0;r<e.header.length;r++)n+=this.tablecell(e.header[r]);t+=this.tablerow({text:n});let o="";for(let r=0;r<e.rows.length;r++){let i=e.rows[r];n="";for(let a=0;a<i.length;a++)n+=this.tablecell(i[a]);o+=this.tablerow({text:n})}return o&&(o=`<tbody>${o}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+o+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Be(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let o=this.parser.parseInline(n),r=Zs(e);if(r===null)return o;e=r;let i='<a href="'+e+'"';return t&&(i+=' title="'+Be(t)+'"'),i+=">"+o+"</a>",i}image({href:e,title:t,text:n,tokens:o}){o&&(n=this.parser.parseInline(o,this.parser.textRenderer));let r=Zs(e);if(r===null)return Be(n);e=r;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${Be(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Be(e.text)}},no=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},$e=class Vr{options;renderer;textRenderer;constructor(t){this.options=t||xt,this.options.renderer=this.options.renderer||new Pn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new no}static parse(t,n){return new Vr(n).parse(t)}static parseInline(t,n){return new Vr(n).parseInline(t)}parse(t,n=!0){let o="";for(let r=0;r<t.length;r++){let i=t[r];if(this.options.extensions?.renderers?.[i.type]){let u=i,c=this.options.extensions.renderers[u.type].call({parser:this},u);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(u.type)){o+=c||"";continue}}let a=i;switch(a.type){case"space":{o+=this.renderer.space(a);continue}case"hr":{o+=this.renderer.hr(a);continue}case"heading":{o+=this.renderer.heading(a);continue}case"code":{o+=this.renderer.code(a);continue}case"table":{o+=this.renderer.table(a);continue}case"blockquote":{o+=this.renderer.blockquote(a);continue}case"list":{o+=this.renderer.list(a);continue}case"html":{o+=this.renderer.html(a);continue}case"def":{o+=this.renderer.def(a);continue}case"paragraph":{o+=this.renderer.paragraph(a);continue}case"text":{let u=a,c=this.renderer.text(u);for(;r+1<t.length&&t[r+1].type==="text";)u=t[++r],c+=`
`+this.renderer.text(u);n?o+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c,escaped:!0}]}):o+=c;continue}default:{let u='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return o}parseInline(t,n=this.renderer){let o="";for(let r=0;r<t.length;r++){let i=t[r];if(this.options.extensions?.renderers?.[i.type]){let u=this.options.extensions.renderers[i.type].call({parser:this},i);if(u!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){o+=u||"";continue}}let a=i;switch(a.type){case"escape":{o+=n.text(a);break}case"html":{o+=n.html(a);break}case"link":{o+=n.link(a);break}case"image":{o+=n.image(a);break}case"strong":{o+=n.strong(a);break}case"em":{o+=n.em(a);break}case"codespan":{o+=n.codespan(a);break}case"br":{o+=n.br(a);break}case"del":{o+=n.del(a);break}case"text":{o+=n.text(a);break}default:{let u='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(u),"";throw new Error(u)}}}return o}},Jt=class{options;block;constructor(e){this.options=e||xt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ge.lex:Ge.lexInline}provideParser(){return this.block?$e.parse:$e.parseInline}},Nc=class{defaults=Kr();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=$e;Renderer=Pn;TextRenderer=no;Lexer=Ge;Tokenizer=Ln;Hooks=Jt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let o of e)switch(n=n.concat(t.call(this,o)),o.type){case"table":{let r=o;for(let i of r.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of r.rows)for(let a of i)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let r=o;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=o;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let a=r[i].flat(1/0);n=n.concat(this.walkTokens(a,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let o={...n};if(o.async=this.defaults.async||o.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=t.renderers[r.name];i?t.renderers[r.name]=function(...a){let u=r.renderer.apply(this,a);return u===!1&&(u=i.apply(this,a)),u}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[r.level];i?i.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),o.extensions=t),n.renderer){let r=this.defaults.renderer||new Pn(this.defaults);for(let i in n.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,u=n.renderer[a],c=r[a];r[a]=(...g)=>{let f=u.apply(r,g);return f===!1&&(f=c.apply(r,g)),f||""}}o.renderer=r}if(n.tokenizer){let r=this.defaults.tokenizer||new Ln(this.defaults);for(let i in n.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,u=n.tokenizer[a],c=r[a];r[a]=(...g)=>{let f=u.apply(r,g);return f===!1&&(f=c.apply(r,g)),f}}o.tokenizer=r}if(n.hooks){let r=this.defaults.hooks||new Jt;for(let i in n.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,u=n.hooks[a],c=r[a];Jt.passThroughHooks.has(i)?r[a]=g=>{if(this.defaults.async&&Jt.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await u.call(r,g);return c.call(r,h)})();let f=u.call(r,g);return c.call(r,f)}:r[a]=(...g)=>{if(this.defaults.async)return(async()=>{let h=await u.apply(r,g);return h===!1&&(h=await c.apply(r,g)),h})();let f=u.apply(r,g);return f===!1&&(f=c.apply(r,g)),f}}o.hooks=r}if(n.walkTokens){let r=this.defaults.walkTokens,i=n.walkTokens;o.walkTokens=function(a){let u=[];return u.push(i.call(this,a)),r&&(u=u.concat(r.call(this,a))),u}}this.defaults={...this.defaults,...o}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ge.lex(e,t??this.defaults)}parser(e,t){return $e.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let o={...n},r={...this.defaults,...o},i=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&o.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=e),r.async)return(async()=>{let a=r.hooks?await r.hooks.preprocess(t):t,u=await(r.hooks?await r.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(a,r),c=r.hooks?await r.hooks.processAllTokens(u):u;r.walkTokens&&await Promise.all(this.walkTokens(c,r.walkTokens));let g=await(r.hooks?await r.hooks.provideParser():e?$e.parse:$e.parseInline)(c,r);return r.hooks?await r.hooks.postprocess(g):g})().catch(i);try{r.hooks&&(t=r.hooks.preprocess(t));let a=(r.hooks?r.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(t,r);r.hooks&&(a=r.hooks.processAllTokens(a)),r.walkTokens&&this.walkTokens(a,r.walkTokens);let u=(r.hooks?r.hooks.provideParser():e?$e.parse:$e.parseInline)(a,r);return r.hooks&&(u=r.hooks.postprocess(u)),u}catch(a){return i(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let o="<p>An error occurred:</p><pre>"+Be(n.message+"",!0)+"</pre>";return t?Promise.resolve(o):o}if(t)return Promise.reject(n);throw n}}},kt=new Nc;function B(e,t){return kt.parse(e,t)}B.options=B.setOptions=function(e){return kt.setOptions(e),B.defaults=kt.defaults,ti(B.defaults),B};B.getDefaults=Kr;B.defaults=xt;B.use=function(...e){return kt.use(...e),B.defaults=kt.defaults,ti(B.defaults),B};B.walkTokens=function(e,t){return kt.walkTokens(e,t)};B.parseInline=kt.parseInline;B.Parser=$e;B.parser=$e.parse;B.Renderer=Pn;B.TextRenderer=no;B.Lexer=Ge;B.lexer=Ge.lex;B.Tokenizer=Ln;B.Hooks=Jt;B.parse=B;var $u=B.options,Fu=B.setOptions,Hu=B.use,zu=B.walkTokens,Bu=B.parseInline;var ju=$e.parse,Xu=Ge.lex;var U="openchamber.sdk";var hi=/^[a-z][a-z0-9-]{0,39}$/;var ui=e=>Object(e)===e&&!Array.isArray(e),ro=(e,t)=>Object.keys(e).every(n=>t.includes(n)),fi=e=>String(e)===e&&e.length>=1&&e.length<=60,mi=e=>String(e)===e&&e.length>=1&&e.length<=80,gi=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!ui(n)||!hi.test(n.id)||!fi(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!ro(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!ro(n,["kind","id","label","value","options","disabled"])||!mi(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let o=new Set;for(let r of n.options){if(!ui(r)||!ro(r,["value","label"])||!mi(r.value)||!fi(r.label)||o.has(r.value))return!1;o.add(r.value)}if(!o.has(n.value))return!1}return!0};var oo=e=>"bytes"in e?e.bytes.byteLength:e.content.length,ki=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var xi=/^[A-Za-z0-9_-]{1,80}$/;var bi=["left","right","top","bottom"];var Ti=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of o)if(!Ti(r,t+1,n))return!1;return!0},so=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(so);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(so)}return String(e)===e||Number.isFinite(e)},io=e=>{try{return String(e.id)!==e.id||!xi.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!bi.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ti(e.data)||!so(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var _i=["file","directory","other","missing"],lo=e=>!!(e&&"sessionId"in e),co=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Si=/^[0-9a-f]{7,64}$/i,po=e=>Si.test(e),Un=500,Dn=32e3,yi=16e3,Ai=128,wi=200,vi=2e3,Ri=16e3,Oi=80,Ii=200,Ci=16e3;var Li=2e3;var uo=2e4,Gn=1024,$n=2e6;var Fn=64e3,Hn=8e3,fo=4e3;var mo=9e4;var Pi=999,Ni=1e4,en=500,Mi=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ui=["stopped","starting","ready","failed"],Mc=new Set(Mi),Di=e=>Mc.has(e),Gi=e=>e&&Di(e)?e:"HOST_REJECTED",Lt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Lt):Object(e)===e?Object.values(e).every(Lt):!1,$i=e=>Lt(e)&&JSON.stringify(e).length<=Ci,Ei=e=>e?.trim().slice(0,Ii)??"",Pt=e=>{let t=e.id.trim().slice(0,Ai),n=e.title.trim().slice(0,wi),o=e.url.trim().slice(0,vi),r=e.text?.trim().slice(0,Ri),i=e.author?.trim().slice(0,Oi),a=e.kind==="pull"?"pull":"issue",u={providerId:e.providerId.trim(),id:t,title:n||t,url:o,kind:a};if(r&&(u.text=r),i&&(u.author=i),a==="pull"){let c=Ei(e.branches?.head),g=Ei(e.branches?.base);c&&g&&(u.branches={head:c,base:g})}return $i(e.data)&&(u.data=e.data),u},ho=e=>{let t=Pt(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},go=e=>{let t={text:e.text.trim().slice(0,yi)};return e.send&&(t.send=!0),t},ko=e=>e===null||!Number.isFinite(e)?null:Math.min(Pi,Math.max(0,Math.round(e))),xo=e=>Number.isFinite(e)?Math.min(Ni,Math.max(0,Math.ceil(e))):0;var Nt=e=>e.length>0&&e.length<=Gn&&!e.includes("\0")&&!e.includes("\\");var zn=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Li?!1:!e.split("/").some(n=>n==="."||n===".."),Uc=new Set(Ui),bo=e=>!!(e&&"status"in e&&Uc.has(String(e.status))&&!("body"in e)),Bn=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),To=e=>!!(e&&"content"in e&&String(e.content)===e.content),Eo=e=>!!(e&&"written"in e&&e.written===!0),_o=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Dc=new Set(_i),So=e=>!!(e&&"kind"in e&&"size"in e&&Dc.has(String(e.kind))&&Number.isFinite(e.size)),yo=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Gc=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),$c=e=>Object(e)===e?e:null,ao=e=>String(e)===e&&e.length>0,Fc=e=>{if(!ao(e.id))return null;if(e.ok===!0){let t={channel:U,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&ao(e.error)?{channel:U,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Gi(ao(e.code)?e.code:void 0)}:null},Ao=e=>{let t=$c(e);return!t||t.channel!==U||t.v!==1?null:t.type==="result"?Fc(t):!Gc.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Fi=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Hc=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",O=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},Hi=()=>Promise.reject(new O("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),jn=()=>Promise.reject(new O("BAD_PATH",`File path must be 1 to ${Gn} characters without NUL or backslash.`)),Xn=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new O("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},N=e=>(e.value+=1,`oc-${e.value}`),Io=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new O("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(l=>l===t.parent),o=e.requestTimeoutMs??uo,r=new Set,i=new Set,a=new Set,u=new Set,c=new Set,g=new Set,f=new Set,h=new Set,T=new Set,y=null,P=null,W=new Set,de=new Set,L=null,te=null,ke=!1,ae=new Map,fe=new Map,me=new Map,F=!1,v={value:0},w=null,Ee=null,ee=!1,I=!1,se=null,Mt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,he=l=>{t.parent.postMessage(l,"*")},ne=(l,p)=>{for(let _ of l)try{_(p)}catch(E){console.error(E)}},je=l=>{if(!(l instanceof MessageEvent)||!n(l.source))return;let p=Ao(l.data);if(!p)return;if(p.type==="workspace"){let E=fe.get(p.payload.subscriptionId);E&&ne([E],p.payload.snapshot);return}if(p.type==="shells"){let E=me.get(p.payload.subscriptionId);E&&ne([E],p.payload.snapshot);return}if(p.type==="ready"){w=p.payload,Ee=Mt(p.payload.session),ne(r,p.payload),ne(i,p.payload.directory),ne(a,p.payload.session),Ee&&ne(u,Ee),ne(c,p.payload.connection),ne(g,p.payload.settings),ne(f,p.payload.item);return}if(p.type==="directory"){w&&(w={...w,directory:p.payload.directory}),ne(i,p.payload.directory);return}if(p.type==="session"){w&&(w={...w,session:p.payload.session}),p.payload.session?Ee?.sessionId!==p.payload.session.id&&(Ee=Mt(p.payload.session)):Ee=null,ne(a,p.payload.session);return}if(p.type==="session-lifecycle"){Ee=p.payload,ne(u,p.payload);return}if(p.type==="connection"){w&&(w={...w,connection:p.payload.connection}),ne(c,p.payload.connection);return}if(p.type==="settings"){w&&(w={...w,settings:p.payload.settings}),ne(g,p.payload.settings);return}if(p.type==="item"){w&&(w={...w,item:p.payload.item}),ne(f,p.payload.item);return}if(p.type==="status-control-event"){ne(h,p.payload);return}if(p.type==="popover-closed"){ne(T,p.payload);return}if(p.type==="action"){let E=V=>{F||he({channel:U,v:1,type:"action-result",id:p.id,payload:V})},z=P;if(!z){E({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>z(p.payload)).then(()=>E({ok:!0}),V=>{let j=(V instanceof Error?V.message:String(V)).trim();E({ok:!1,error:(j||"Action failed.").slice(0,en)})});return}if(p.type==="file-open"){let E=p.payload;if(te&&ki(te,E))return;te=E,ne(W,p.payload);return}if(p.type==="file-saved"){ne(de,p.payload.version);return}if(p.type==="file-snapshot"){let E=j=>{F||he({channel:U,v:1,type:"file-snapshot-result",id:p.id,payload:j})},z=j=>E({error:(j.trim()||"Could not read the edited file.").slice(0,en)}),V=L;if(!V){z("This extension does not edit files.");return}Promise.resolve().then(()=>V(p.payload.purpose)).then(j=>{if(oo(j)>2e7){z(`The file is over ${2e7} ${"bytes"in j?"bytes":"characters"}.`);return}if(j.version.length>256){z(`The snapshot version is over ${256} characters.`);return}E({snapshot:"bytes"in j?{bytes:j.bytes,version:j.version}:{content:j.content,version:j.version}})},j=>z(j instanceof Error?j.message:String(j)));return}if(p.type==="resolve"){let E=V=>{he({channel:U,v:1,type:"resolve-result",id:p.id,payload:V})},z=y;if(!z){E({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>z(p.payload)).then(V=>E({item:V?Pt(V):null}),V=>{let j=(V instanceof Error?V.message:String(V)).trim();E({error:(j||"Command failed.").slice(0,en)})});return}let _=ae.get(p.id);if(_){if(clearTimeout(_.timer),ae.delete(p.id),p.ok){_.resolve(p.payload);return}_.reject(new O(p.code,p.error))}};t.addEventListener("message",je),he({channel:U,v:1,type:"hello"});let xe=(l,p=o)=>F||t.parent===t?Promise.reject(new O("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((_,E)=>{let z=setTimeout(()=>{ae.delete(l.id),E(new O("HOST_TIMEOUT","Host did not answer in time."))},p);ae.set(l.id,{resolve:_,reject:E,timer:z}),he(l)}),re=l=>xe(l).then(()=>{}),Y={channel:U,v:1},at=l=>{!F&&t.parent!==t&&he(l)},Ut=()=>at({...Y,type:"file-save"}),sn=l=>{!Fi(l)||!Hc(l)||(l.preventDefault(),Ut())},an=l=>{!Fi(l)||l.key!=="Escape"||w?.surface!=="popover"||!w.popover||(l.preventDefault(),$t(w.popover.id,"escape").catch(()=>{}))},Tt=()=>{let l=w?.surface==="popover"?w.popover:void 0;if(!l)return;let p=ee||I;se!==p&&(se=p,K(l.id,p).catch(()=>{}))},H=()=>{w?.surface!=="popover"||ee||(ee=!0,Tt())},ln=l=>{w?.surface!=="popover"||l.relatedTarget!==null||!ee||(ee=!1,Tt())},cn=()=>{w?.surface!=="popover"||I||(I=!0,Tt())},dn=()=>{w?.surface!=="popover"||!I||(I=!1,Tt())},Ce=(l,p=1024)=>{if(!l.trim()||l.length>p)throw new O("HOST_REJECTED",`Identity must contain 1 to ${p} characters.`)},Dt=async l=>{l.kind!=="projects"&&Ce(l.projectId);let p=await xe({...Y,type:"workspace-read",id:N(v),payload:l});if(!p||!("kind"in p)||!("state"in p)||p.kind!==l.kind)throw new O("HOST_REJECTED","Host did not return workspace data.");return p},Gt=async(l,p)=>{l.kind!=="projects"&&Ce(l.projectId);let _=N(v);fe.set(_,p);try{await re({...Y,type:"workspace-subscribe",id:N(v),payload:{subscriptionId:_,query:l}})}catch(E){throw fe.delete(_),F||he({...Y,type:"workspace-unsubscribe",id:N(v),payload:{subscriptionId:_}}),E}return()=>{!fe.delete(_)||F||he({...Y,type:"workspace-unsubscribe",id:N(v),payload:{subscriptionId:_}})}},pn=async(l,p)=>{l.kind==="session"&&Ce(l.sessionId),l.kind==="project"&&Ce(l.projectId);let _=N(v);me.set(_,p);try{await re({...Y,type:"shells-subscribe",id:N(v),payload:{subscriptionId:_,scope:l}})}catch(E){throw me.delete(_),F||he({...Y,type:"shells-unsubscribe",id:N(v),payload:{subscriptionId:_}}),E}return()=>{!me.delete(_)||F||he({...Y,type:"shells-unsubscribe",id:N(v),payload:{subscriptionId:_}})}},Et=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new O("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Lt(l.value))throw new O("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new O("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&w?.features?.deviceStorage!==!0)throw new O("UNSUPPORTED","This host does not support device storage.");let p=await xe({...Y,type:"storage",id:N(v),payload:l});if(!p||!("storage"in p)||p.op!==l.op)throw new O("HOST_REJECTED","Host did not return storage data.");return p},$t=(l,p)=>w?.features?.popovers!==!0&&!(w?.surface==="popover"&&w.popover?.id===l)?Promise.reject(new O("UNSUPPORTED","This host does not support popovers.")):re({...Y,type:"popover-close",id:N(v),payload:p?{id:l,reason:p}:{id:l}}),K=(l,p)=>w?.features?.popovers!==!0&&!(w?.surface==="popover"&&w.popover?.id===l)?Promise.reject(new O("UNSUPPORTED","This host does not support popovers.")):re({...Y,type:"popover-anchor",id:N(v),payload:{id:l,active:p}});return t.addEventListener("keydown",an,!0),t.addEventListener("pointerover",H),t.addEventListener("pointermove",H),t.addEventListener("pointerout",ln),t.addEventListener("focus",cn),t.addEventListener("blur",dn),{onAction:l=>(P=l,()=>{P===l&&(P=null)}),listProjects:async()=>{let l=await Dt({kind:"projects"});if(l.kind!=="projects")throw new O("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let p=await Dt({kind:"worktrees",projectId:l});if(p.kind!=="worktrees")throw new O("HOST_REJECTED","Expected worktrees.");return p},listSessions:async l=>{let p=await Dt({kind:"sessions",projectId:l});if(p.kind!=="sessions")throw new O("HOST_REJECTED","Expected sessions.");return p},onProjects:l=>Gt({kind:"projects"},p=>{p.kind==="projects"&&l(p)}),onWorktrees:(l,p)=>Gt({kind:"worktrees",projectId:l},_=>{_.kind==="worktrees"&&p(_)}),onSessions:(l,p)=>Gt({kind:"sessions",projectId:l},_=>{_.kind==="sessions"&&p(_)}),onRunningShells:(l,p)=>pn(l,p),readShellOutput:async(l,p)=>{Ce(l,128);let _=p?.cursor;if(_!==void 0&&(!Number.isInteger(_)||_<0))throw new O("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let E=p?.tailBytes;if(E!==void 0&&(!Number.isInteger(E)||E<1||E>65536))throw new O("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let V=await xe({...Y,type:"shell-output",id:N(v),payload:{shellId:l,cursor:_,tailBytes:E}});if(!V||typeof V.output!="string"||!Number.isFinite(V.cursor))throw new O("HOST_REJECTED","Host did not return shell output.");return V},stopShell:async l=>{if(Ce(l,128),(await xe({...Y,type:"shell-stop",id:N(v),payload:{shellId:l}}))?.stopped!==!0)throw new O("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Ce(l),await re({...Y,type:"open-session",id:N(v),payload:{sessionId:l}})},storage:{get:async(l,p)=>{let _=Xn(p),E={op:"get",key:l};_&&(E.scope=_);let z=await Et(E);return z.op==="get"&&z.found?z.value:void 0},set:async(l,p,_)=>{let E=Xn(_),z={op:"set",key:l,value:p};E&&(z.scope=E),await Et(z)},delete:async(l,p)=>{let _=Xn(p),E={op:"delete",key:l};_&&(E.scope=_),await Et(E)},keys:async l=>{let p=Xn(l),_={op:"keys"};p&&(_.scope=p);let E=await Et(_);if(E.op!=="keys")throw new O("HOST_REJECTED","Expected storage keys.");return E.keys}},onReady:l=>(r.add(l),w&&l(w),()=>{r.delete(l)}),onDirectory:l=>(i.add(l),w&&l(w.directory),()=>{i.delete(l)}),onSession:l=>(a.add(l),w&&l(w.session),()=>{a.delete(l)}),onSessionLifecycle:l=>(u.add(l),Ee&&l(Ee),()=>{u.delete(l)}),onConnection:l=>(c.add(l),w&&l(w.connection),()=>{c.delete(l)}),onSettings:l=>(g.add(l),w&&l(w.settings),()=>{g.delete(l)}),onItem:l=>(f.add(l),w&&l(w.item),()=>{f.delete(l)}),onStatusControl:l=>(h.add(l),()=>{h.delete(l)}),onPopoverClosed:l=>(T.add(l),()=>{T.delete(l)}),setStatusControls:l=>w?.features?.statusControls!==!0?Promise.reject(new O("UNSUPPORTED","This host does not support status controls.")):gi(l)?re({...Y,type:"status-controls",id:N(v),payload:{controls:l}}):Promise.reject(new O("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>w?.features?.popovers!==!0?Promise.reject(new O("UNSUPPORTED","This host does not support popovers.")):io(l)?re({...Y,type:"popover-open",id:N(v),payload:l}):Promise.reject(new O("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:$t,setPopoverAnchorActive:K,onResolve:l=>(y=l,()=>{y===l&&(y=null)}),toast:l=>{let p=l.message.trim();return!p||p.length>Un?Promise.reject(new O("HOST_REJECTED",`Toast message must contain 1 to ${Un} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>Dn)?Promise.reject(new O("HOST_REJECTED",`Toast copy text must contain 1 to ${Dn} characters.`)):re({channel:U,v:1,type:"toast",id:N(v),payload:{...l,message:p}})},openUrl:l=>re({channel:U,v:1,type:"open-url",id:N(v),payload:{url:l}}),openCommit:l=>po(l)?re({channel:U,v:1,type:"open-commit",id:N(v),payload:{sha:l}}):Promise.reject(new O("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>re({channel:U,v:1,type:"open-surface",id:N(v),payload:{surfaceId:l}}),writeClipboard:l=>re({channel:U,v:1,type:"clipboard-write",id:N(v),payload:{text:l}}),compose:l=>re({channel:U,v:1,type:"compose",id:N(v),payload:l}),attach:l=>re({channel:U,v:1,type:"attach",id:N(v),payload:Pt(l)}),startSession:async l=>{l.projectId!==void 0&&Ce(l.projectId);let p=l.worktree;p&&p!==!0&&(p.kind==="existing"?Ce(p.directory):(p.name!==void 0&&Ce(p.name,200),p.baseBranch!==void 0&&Ce(p.baseBranch,200)));let _=await xe({channel:U,v:1,type:"start-session",id:N(v),payload:ho(l)},e.requestTimeoutMs??18e4);if(!lo(_))throw new O("HOST_REJECTED","Host did not return a session.");return _},prompt:l=>xe({channel:U,v:1,type:"prompt",id:N(v),payload:go(l)}).then(p=>{if(!co(p))throw new O("HOST_REJECTED","Host did not return a prompt result.");return p}),sessionLink:l=>re({channel:U,v:1,type:"session-link",id:N(v),payload:Pt(l)}),close:()=>re({channel:U,v:1,type:"close",id:N(v)}),oauthStart:()=>re({channel:U,v:1,type:"oauth-start",id:N(v)}),oauthDisconnect:()=>re({channel:U,v:1,type:"oauth-disconnect",id:N(v)}),request:l=>(zn(l.path)?xe({channel:U,v:1,type:"request",id:N(v),payload:l}):Hi()).then(p=>{if(!Bn(p))throw new O("HOST_REJECTED","Host request result was empty.");return p}),serviceRequest:l=>(zn(l.path)?xe({channel:U,v:1,type:"service-request",id:N(v),payload:l}):Hi()).then(p=>{if(!Bn(p))throw new O("HOST_REJECTED","Host service request result was empty.");return p}),serviceStatus:()=>xe({channel:U,v:1,type:"service-status",id:N(v)}).then(l=>{if(!bo(l))throw new O("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(Nt(l)?xe({channel:U,v:1,type:"file-read",id:N(v),payload:{path:l}}):jn()).then(p=>{if(!To(p))throw new O("HOST_REJECTED","Host did not return file content.");return p}),writeFile:(l,p)=>Nt(l)?p.length>$n?Promise.reject(new O("FILE_TOO_LARGE",`Content is over ${$n} characters.`)):xe({channel:U,v:1,type:"file-write",id:N(v),payload:{path:l,content:p}}).then(_=>{if(!Eo(_))throw new O("HOST_REJECTED","Host did not confirm the write.");return _}):jn(),listDir:l=>(Nt(l)?xe({channel:U,v:1,type:"file-list",id:N(v),payload:{path:l}}):jn()).then(p=>{if(!_o(p))throw new O("HOST_REJECTED","Host did not return directory entries.");return p}),stat:l=>(Nt(l)?xe({channel:U,v:1,type:"file-stat",id:N(v),payload:{path:l}}):jn()).then(p=>{if(!So(p))throw new O("HOST_REJECTED","Host did not return file status.");return p}),generate:l=>{let p=l.prompt.trim(),_=l.system?.trim();if(p.length===0||p.length>Fn)return Promise.reject(new O("HOST_REJECTED",`Prompt must be 1 to ${Fn} characters.`));if(_!==void 0&&(_.length===0||_.length>Hn))return Promise.reject(new O("HOST_REJECTED",`System prompt must be 1 to ${Hn} characters.`));let E=l.maxOutputTokens===void 0?void 0:Math.min(fo,Math.max(1,Math.floor(l.maxOutputTokens)));if(E!==void 0&&!Number.isFinite(E))return Promise.reject(new O("HOST_REJECTED","maxOutputTokens must be a number."));let z={prompt:p};return _!==void 0&&(z.system=_),E!==void 0&&(z.maxOutputTokens=E),xe({channel:U,v:1,type:"generate",id:N(v),payload:z},e.requestTimeoutMs??mo).then(V=>{if(!yo(V))throw new O("HOST_REJECTED","Host did not return generated text.");return V})},setBadge:l=>re({channel:U,v:1,type:"badge",id:N(v),payload:{count:ko(l)}}),setHeight:l=>re({channel:U,v:1,type:"resize",id:N(v),payload:{height:xo(l)}}),onFileOpen:l=>(W.add(l),ke||(ke=!0,t.addEventListener("keydown",sn,!0)),te&&l(te),()=>{W.delete(l)}),onFileSnapshot:l=>(L=l,()=>{L===l&&(L=null)}),onFileSaved:l=>(de.add(l),()=>{de.delete(l)}),reportFileChange:l=>at({...Y,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:Ut,reportFileUnsupported:()=>at({...Y,type:"file-unsupported"}),dispose:()=>{for(let l of fe.keys())he({...Y,type:"workspace-unsubscribe",id:N(v),payload:{subscriptionId:l}});fe.clear();for(let l of me.keys())he({...Y,type:"shells-unsubscribe",id:N(v),payload:{subscriptionId:l}});me.clear(),F=!0,y=null,P=null,L=null,W.clear(),de.clear(),ke&&t.removeEventListener("keydown",sn,!0),t.removeEventListener("message",je),t.removeEventListener("keydown",an,!0),t.removeEventListener("pointerover",H),t.removeEventListener("pointermove",H),t.removeEventListener("pointerout",ln),t.removeEventListener("focus",cn),t.removeEventListener("blur",dn);for(let l of ae.values())clearTimeout(l.timer),l.reject(new O("HOST_UNAVAILABLE","Host client was disposed."));ae.clear(),r.clear(),i.clear(),a.clear(),u.clear(),c.clear(),g.clear(),f.clear(),h.clear(),T.clear()}}};var ji=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var xf=new Set(ji);var Xi=["none","agent","user"];var Tf=new Set(Xi);var X=Io();var Wi="var(--k-muted)",zc=/^#[0-9a-fA-F]{3}$/,Bc=/^#[0-9a-fA-F]{6}$/,jc=/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,Xc=/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/,Wc=/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/,Vc=/^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/;function Co(e){if(typeof e!="string")return Wi;let t=e.trim();return zc.test(t)||Bc.test(t)||jc.test(t)||Xc.test(t)||Wc.test(t)||Vc.test(t)?t:Wi}function S(e,t={},...n){let o=document.createElement(e);for(let[r,i]of Object.entries(t))if(i!=null){if(r==="dataset"){Object.assign(o.dataset,i);continue}if(r==="style"){o.setAttribute("style",String(i));continue}if(r.startsWith("on")&&typeof i=="function"){o.addEventListener(r.slice(2).toLowerCase(),i);continue}if(r==="className"&&typeof i=="string"){o.className=i;continue}o[r]=i}for(let r of n)r!=null&&o.append(typeof r=="string"?document.createTextNode(r):r);return o}function Lo(e){e.replaceChildren()}function Po(e){let t=S("div",{className:"md"});if(!e||e.trim().length===0)return t.append(S("p",{className:"muted"},"No description.")),t;let n=B.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=Ks.sanitize(n,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(o=>{let r=o.getAttribute("href")??"";o.setAttribute("rel","noreferrer noopener"),o.addEventListener("click",i=>{i.preventDefault(),/^https?:\/\//i.test(r)&&X.openUrl(r)})}),t.querySelectorAll("img").forEach(o=>{o.setAttribute("loading","lazy")}),t}function Vi(e,t=320){let n=e??"",o=Po(e);if(n.length<=t)return o;o.classList.add("md-collapsed");let r=S("button",{className:"link-button",type:"button"},"Show full description");return r.addEventListener("click",()=>{let i=o.classList.toggle("md-collapsed");r.textContent=i?"Show full description":"Show less"}),S("div",{className:"md-wrap"},o,r)}function Ki(e){if(!e||typeof e!="object")return{};let t={};for(let[n,o]of Object.entries(e))!o||typeof o!="object"||typeof o.taskId!="string"||(t[n]={taskId:o.taskId,ticketId:typeof o.ticketId=="string"?o.ticketId:"",title:typeof o.title=="string"?o.title:"",at:typeof o.at=="number"?o.at:0,posted:Array.isArray(o.posted)?o.posted.filter(r=>typeof r=="string"):[]});return t}function Yi(e,t=50){let n=Object.entries(e).sort((o,r)=>r[1].at-o[1].at).slice(0,Math.max(0,t));return Object.fromEntries(n)}async function qi(e,t){try{return t(await X.storage.get(e))}catch{return t(void 0)}}async function No(e,t){try{let n=JSON.parse(JSON.stringify(t));await X.storage.set(e,n)}catch{}}var Ji="preferences",Kc={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1};function Zi(e){if(typeof e!="object"||e===null)return{...Kc};let t=e,n=t.priorityFilter,o=n==="any"||!!n&&n in ht;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:o?n:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0}}async function tn(){return qi(Ji,e=>Zi(e))}async function Ae(e){let t=Zi({...await tn(),...e});return await No(Ji,t),t}var Mo="session-links";async function Wn(){return qi(Mo,Ki)}async function Qi(e,t){let n=await Wn();n[e]={...t,at:Date.now(),posted:[]};let o=Yi(n);await No(Mo,o)}async function ea(e,t){let n=await Wn(),o=n[e];o&&(o.posted.includes(t)||o.posted.push(t),await No(Mo,n))}var Yc=864e5;function nn(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function oa(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function sa(e,t,n){return`${ys}/dashboard/workspace/${e}/project/${t}/task/${n}`}var qc={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function bt(e){return qc[e]??e}function Uo(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let o=Math.round((ta(n).getTime()-ta(t).getTime())/Yc);return o===0?"Due today":o===1?"Due tomorrow":o===-1?"Due yesterday":o<0?`Overdue ${Math.abs(o)}d`:o<=7?`Due in ${o}d`:`Due ${n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function ta(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function ia(e,t){let n=[`**${t.ticketId}** ${e.title}`],o=[];t.columnName&&o.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&o.push(`Priority: ${bt(e.priority)}`),e.assigneeName&&o.push(`Assignee: ${e.assigneeName}`);let r=Uo(e.dueDate);r&&o.push(r),o.length>0&&n.push(o.join(" \xB7 ")),t.url&&n.push(t.url);let i=e.description?.trim();return i&&n.push("",i),n.join(`
`)}var Jc=6e3;function Zc(e){let t=e.user?.name??"Unknown",n=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${n}`}function aa(e,t){let n=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&n.push(`Project: ${t.projectName}`),t.columnName&&n.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&n.push(`Priority: ${bt(e.priority)}`),e.dueDate&&n.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&n.push(t.url);let o=e.description?.trim();o&&n.push("",o);let r=t.comments??[];if(r.length>0){n.push("","Comments:");let i=0;for(let a of r){let u=Zc(a);if(i+u.length>Jc)break;i+=u.length,n.push(u)}}return n.join(`
`)}function la(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Qc={started:"OpenChamber session started",completed:"OpenChamber session completed",failed:"OpenChamber session failed"};function ca(e,t,n,o){let r=Qc[e],i=t.trim()||"Untitled session";if(n){let a=n.replace(/\/+$/,""),u=o?`${a}/?session=${encodeURIComponent(o)}`:a;return`[${r}](${u}) \u2014 ${i}`}return`${r} \u2014 ${i}`}var na=6e4,ra=36e5,Vn=864e5;function da(e,t=Date.now()){if(!e)return null;let n=Date.parse(e);if(!Number.isFinite(n))return null;let o=Math.max(0,t-n);return o<na?"just now":o<ra?`${Math.floor(o/na)}m`:o<Vn?`${Math.floor(o/ra)}h`:o<7*Vn?`${Math.floor(o/Vn)}d`:`${Math.floor(o/(7*Vn))}w`}function rn(e){return sa(e.workspaceId,e.task.projectId,e.task.id)}function ed(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function pa(e){return{providerId:vn,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:rn(e),text:aa(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:rn(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:ed(e)}}async function td(e){await X.attach(pa(e))}async function nd(e,t={}){let n=t.worktree?la(e.ticketId):void 0,o=await X.startSession({...pa(e),navigation:"preserve",...n?{worktree:{kind:"new",name:n}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return o.sessionId===null?{sessionId:null,sent:o.sent,failure:o.failure,branch:o.worktree.branch}:{sessionId:o.sessionId,sent:o.sent,branch:o.worktree?.branch??n}}async function ua(e){await td(e),await X.toast({kind:"success",message:`${e.ticketId} attached to the chat.`})}async function fa(e,t={}){let n=await nd(e,t);if(n.sessionId===null){let o=n.branch?` The worktree ${n.branch} was kept.`:"",r=n.failure?` (${n.failure})`:"";return await X.toast({kind:"error",message:`No session was created${r}.${o} Check the session list before retrying.`,dismiss:!0}),!1}return await Qi(n.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await X.toast({kind:"success",message:t.worktree&&n.branch?`Session started on ${n.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function ma(e){await X.compose({mode:"append",text:`
${ia(e.task,{ticketId:e.ticketId,...e.columnName?{columnName:e.columnName}:{},...rn(e)?{url:rn(e)}:{}})}
`})}async function ha(e){await X.openUrl(rn(e))}async function Kn(e,t){console.error(`${e} failed:`,t);let n=t instanceof Ye?t.code:null,o=n?`${e} failed (${n}).`:`${e} failed.`;await X.toast({kind:"error",message:o.slice(0,400),dismiss:!0})}function rd(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function od(e){return S("span",{className:"label-chip"},S("span",{className:"label-dot",style:`background:${Co(e.color)}`}),e.name)}function ga(e){if(e.length===0)return null;let t=S("div",{className:"label-chips"});for(let n of e)t.append(od(n));return t}function ka(e){return S("span",{className:"person-avatar"},rd(e))}function Do(e,t,n,o={}){let r=Se(e,{label:t,variant:o.variant??"secondary",size:"sm",onClick:()=>{r.update({loading:!0}),n().catch(i=>Kn(t,i)).finally(()=>r.update({loading:!1}))}});o.block&&e.classList.add("block")}function sd(e,t){let n=S("div",{className:"detail-header"}),o=S("div");n.append(o),Se(o,{label:"Back",variant:"ghost",size:"sm",onClick:t});let r=S("div",{style:"margin-left:auto;"});return n.append(r),Se(r,{label:"Open in Kaneo",variant:"ghost",size:"sm",onClick:()=>void ha(e)}),n}function id(e){return S("div",{className:"detail-heading"},S("div",{className:"detail-id"},e.ticketId),S("h2",{className:"detail-title"},e.task.title))}function ad(e,t,n){let o=S("div",{className:"detail-row"});if(t.length>0){let r=S("div",{className:"detail-status"});o.append(r),Ot(r,{value:e.task.status,options:t.map(i=>({id:i.id,label:i.name})),onChange:n.onMove})}if(n.canClose){let r=S("div");o.append(r),Se(r,{label:"Close issue",variant:"outline",size:"sm",onClick:n.onClose})}return o}function ld(e){let{task:t}=e,n=S("dl",{className:"meta-grid"}),o=[];e.projectName&&o.push(["Project",e.projectName]),t.priority!=="no-priority"&&o.push(["Priority",bt(t.priority)]),o.push(["Assignee",t.assigneeName??"Unassigned"]);let r=Uo(t.dueDate);r&&o.push(["Due",r]);let i=t.subtaskCounts;i&&i.total>0&&o.push(["Subtasks",`${i.completed}/${i.total} done`]),t.descriptionDeferred&&o.push(["Description","Too large to inline; open the task for the full text."]);for(let[u,c]of o)n.append(S("dt",{},u),S("dd",{},c));let a=ga(t.labels??[]);if(a){let u=S("dd",{className:"meta-labels"});u.append(a),n.append(S("dt",{},"Labels"),u)}return n}function cd(e,t=320){return S("div",{className:"detail-section"},Vi(e.task.description,t))}function dd(e){let t=S("div",{className:"detail-section"});if(t.append(S("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(S("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(S("p",{className:"muted"},"Loading comments\u2026")),t;let n=e.items??[];if(n.length===0)return t.append(S("p",{className:"muted"},"No comments yet.")),t;let o=S("div",{className:"comments"});return n.forEach((r,i)=>{let a=i===n.length-1,u=da(r.createdAt),c=S("div",{className:"comment"});a||c.append(S("div",{className:"comment-line"})),c.append(ka(r.user?.name));let g=S("div",{className:"comment-card"});g.append(S("div",{className:"comment-head"},S("span",{className:"comment-author"},r.user?.name??"Unknown"),u?S("span",{},u):null),S("div",{className:"comment-body"},Po(r.content))),c.append(g),o.append(c)}),t.append(o),t}function pd(e,t){let n=S("div",{className:"detail-body"});return n.append(id(e)),(t.columns.length>0||t.canCloseIssue)&&n.append(ad(e,t.columns,{onMove:t.onMove,onClose:t.onCloseIssue,canClose:t.canCloseIssue})),n.append(ld(e)),n.append(cd(e,1200)),n.append(dd(t.comments)),n}function ud(e,t){let n=S("div",{className:"detail-footer"}),o=S("div");n.append(o),Rr(o,{label:"Create in a new worktree",checked:t.worktree,onChange:t.onWorktreeChange});let r=S("div",{className:"detail-start block"});if(n.append(r),Do(r,"Start session",()=>fa(e,{worktree:t.worktree}).then(()=>{}),{variant:"default",block:!0}),t.showChatActions!==!1){let i=S("div",{className:"toolbar detail-secondary"});n.append(i),Do(i,"Attach",()=>ua(e)),Do(i,"Send to chat",()=>ma(e))}return n}function xa(e,t){let n=S("div",{className:"detail"});return n.append(sd(e,t.onBack)),n.append(pd(e,t)),n.append(ud(e,t)),n}var fd=`
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
`;function ba(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=fd,e.append(n)}var md={started:"started",completed:"completed",failure:"failed"},Ta=!1;function Ea(e,t){Ta||(Ta=!0,X.onSessionLifecycle(async n=>{let o=md[n.phase];if(!o)return;let i=(await Wn())[n.sessionId];if(!(!i||i.posted.includes(o))){await ea(n.sessionId,o);try{await e.createComment(i.taskId,ca(o,i.title,t,n.sessionId))}catch{}}}))}async function hd(e,t){try{return t(await X.storage.get(e))}catch{return t(void 0)}}async function gd(e,t){try{let n=JSON.parse(JSON.stringify(t));await X.storage.set(e,n)}catch{}}var on=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function _a(e,t,n={}){if(!n.force){let h=await xd();if(h&&Date.now()-h.at<kd)return h.context}let[o,r]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(r.length===0)throw new on;let i=await tn(),a=t?r.find(h=>h.slug===t):void 0,u=(i.workspaceId&&r.find(h=>h.id===i.workspaceId)?.id)??a?.id??r[0].id;u!==i.workspaceId&&await Ae({workspaceId:u,projectId:null});let c=[],g=null;try{c=await e.listProjects(u)}catch(h){g=h instanceof Error?h:new Error(String(h))}let f={user:o,workspaces:r,workspaceId:u,projects:c,projectsError:g};return await bd(f),f}var Go="bootstrap-cache",kd=6e4;async function xd(){return hd(Go,e=>{if(!e||typeof e!="object")return null;let t=e;return t&&typeof t.at=="number"&&t.context?t:null})}async function bd(e){await gd(Go,{at:Date.now(),context:e})}async function Sa(){try{await X.storage.delete(Go)}catch{}}function ya(e,t,n){if(e.length===0)return null;let o=e.find(a=>a.id===t);if(o)return o;let r=n?.toLowerCase();return(r?e.find(a=>a.slug.toLowerCase()===r):void 0)??e[0]}function Aa(e){let t=e?.workspace?.trim(),n=e?.project?.trim(),o=e?.["openchamber-url"]?.trim();return{workspaceSlug:t||void 0,projectSlug:n||void 0,openchamberUrl:o||void 0}}async function wa(e){try{await X.setBadge(e>999?999:e)}catch{}}var Ze=document.querySelector("#root");if(!Ze)throw new Error("Kaneo panel is missing its #root element.");var it=ws(e=>X.request(e)),m={ready:null,connected:!1,context:null,project:null,board:null,labels:[],mine:[],mineLoaded:!1,mineTotal:0,extraTask:null,comments:{},preferences:{workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1},search:"",loading:!0,error:null},Yn=0,va=!1;function Td(e){return e instanceof Ye?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Jn(e,t){return console.error(`${e} failed:`,t),Td(t)}function Ed(){let e=m.preferences.labelFilter;return e?m.labels.find(t=>t.id===e)??null:null}function _d(e){let{priorityFilter:t,labelFilter:n,statusFilter:o,assigneeFilter:r}=m.preferences;if(t!=="any"&&ht[e.priority]<ht[t]||n&&!(e.labels??[]).some(u=>u.id===n)||o&&e.status!==o||r==="me"&&e.assigneeId!==m.context?.user?.id)return!1;let i=m.search.trim().toLowerCase();if(!i)return!0;let a=nn(m.project?.slug??"",e.number).toLowerCase();return e.title.toLowerCase().includes(i)||a.includes(i)||(e.description??"").toLowerCase().includes(i)}function Sd(){let e=m.board?.board;if(!e)return[];let t=[];for(let n of e.columns)for(let o of n.tasks)_d(o)&&t.push(o);return t}function yd(e){let{priorityFilter:t,labelFilter:n,statusFilter:o}=m.preferences;if(t!=="any"&&ht[e.priority]<ht[t]||n&&!(e.labels??[]).some(a=>a.id===n)||o&&e.status!==o)return!1;let r=m.search.trim().toLowerCase();if(!r)return!0;let i=nn(e.projectSlug,e.number).toLowerCase();return e.title.toLowerCase().includes(r)||i.includes(r)}function Ad(){let{priorityFilter:e,statusFilter:t,assigneeFilter:n,labelFilter:o}=m.preferences;return m.search.trim().length>0||e!=="any"||t!==null||n!=="any"||o!==null}async function wd(){m.board=m.project?await it.getBoard(m.project.id):null}async function vd(){let e=m.context?.workspaceId;if(!e){m.mine=[],m.mineLoaded=!0,m.mineTotal=0;return}let t=await it.listAssignedTasks(e);m.mine=t.tasks,m.mineLoaded=!0,m.mineTotal=t.total}async function Rd(){let e=m.context?.workspaceId;if(!e){m.labels=[];return}let t=await it.listLabels(e),n=new Set;m.labels=t.filter(o=>n.has(o.name)?!1:(n.add(o.name),!0))}async function st(e={}){let t=++Yn;m.loading=!0,we();try{let{workspaceSlug:n,projectSlug:o}=Aa(m.ready?.settings),r=await _a(it,n);if(t!==Yn)return;m.context=r,m.preferences=await tn(),m.project=ya(r.projects,m.preferences.projectId,o),m.project&&m.project.id!==m.preferences.projectId&&(m.preferences=await Ae({projectId:m.project.id})),m.loading=!1,m.error=r.projectsError?Jn("List projects",r.projectsError):null,we();let[i,a,u]=await Promise.allSettled([wd(),vd(),Rd()]);if(i.status==="rejected"&&(m.error=Jn("Load board",i.reason)),u.status==="rejected"&&(m.labels=[]),a.status==="rejected"&&(m.mine=[],m.mineLoaded=!0,m.mineTotal=0),t!==Yn)return;e.keepDetail||(m.preferences=await Ae({openTaskId:null})),await wa(m.mineTotal),we()}catch(n){if(t!==Yn)return;m.loading=!1,m.error=n instanceof on?n.message:`Could not reach Kaneo. ${Jn("Reach Kaneo",n)}`,we()}}var Ie=null;function we(){if(!Ze)return;if(Lo(Ze),Ie=null,!m.connected){let t=S("div",{style:"flex:1; display:flex; align-items:center;"});Ze.append(t),mt(t,{title:"Kaneo is not connected",body:"Add an API token in Settings \u2192 Integrations \u2192 Kaneo. Create one in Kaneo under Settings, Account, API Keys.",action:{label:"Reload",onClick:()=>void st()}});return}if(!m.context&&m.loading){let t=S("div",{style:"flex:1; display:flex; align-items:center;"});Ze.append(t),jt(t,{label:"Loading Kaneo"});return}let e=Id();if(e){Ze.append(Md(e));return}if(Ze.append(Od()),m.error){let t=S("div");Ze.append(t),Cr(t,{tone:"error",title:"Kaneo",body:m.error,action:{label:"Retry",onClick:()=>void st()}})}Ie=S("div",{className:"scroll"}),Ze.append(Ie),Ia()}function Ra(e){if(!Ie)return;let t=S("div");Ie.append(t),Ir(t,{items:e,selectedId:m.preferences.openTaskId,ariaLabel:"Kaneo tasks",onSelect:n=>void Pa(n)})}function Ia(){if(!Ie)return;if(Lo(Ie),m.preferences.assigneeFilter==="me"){if(!m.mineLoaded){jt(Ie,{label:"Loading tasks"});return}if(m.mine.length===0){mt(Ie,{title:"Nothing assigned to you",body:"Tasks assigned to your Kaneo account across this workspace show up here."});return}let o=m.mine.filter(yd);if(o.length===0){mt(Ie,{title:"Nothing matches the filters",body:"Clear the search box or the filters."});return}Ra(o.map(r=>({id:r.id,title:r.title,leading:nn(r.projectSlug,r.number)})));return}if(!m.project){mt(Ie,{title:"No project",body:"This workspace has no Kaneo project yet."});return}if(!m.board){jt(Ie,{label:"Loading tasks"});return}let e=m.board.board,t=Sd(),n=e.columns.reduce((o,r)=>o+r.tasks.length,0);if(t.length===0){mt(Ie,{title:n===0?"This board is empty":"Nothing matches the filters",body:n===0?"Open the + button next to the chat box to create the first task.":"Clear the search box or the filters.",...n===0?{action:{label:"Where do I add one?",onClick:Gd}}:{}});return}m.board.truncated&&Ie.append(S("div",{className:"muted"},`Showing the first ${t.length} tasks.`)),Ra(t.map(o=>({id:o.id,title:o.title,leading:$o(o)})))}function Od(){let e=S("div",{className:"panel-head"}),t=S("div");e.append(t),vr(t,{value:m.search,label:"Filter tasks",placeholder:"Filter by title, ticket or description",onChange:f=>{m.search=f,Ia()}});let n=S("div",{className:"toolbar filters"}),o=m.board?.board.columns??[],r=o.find(f=>f.id===m.preferences.statusFilter)?.name;qn(n,{label:r??"Status",active:m.preferences.statusFilter!==null,items:[{id:"",label:"Any status"},{separator:!0},...o.map(f=>({id:f.id,label:f.name}))],onSelect:f=>{Ae({statusFilter:f||null}).then(h=>{m.preferences=h,we()})}}),qn(n,{label:m.preferences.priorityFilter==="any"?"Priority":bt(m.preferences.priorityFilter),active:m.preferences.priorityFilter!=="any",items:[{id:"any",label:"Any priority"},{separator:!0},...As.map(f=>({id:f,label:bt(f)}))],onSelect:f=>{Ae({priorityFilter:f}).then(h=>{m.preferences=h,we()})}}),qn(n,{label:m.preferences.assigneeFilter==="me"?"Assigned to me":"Assignee",active:m.preferences.assigneeFilter==="me",items:[{id:"any",label:"Anyone"},{id:"me",label:"Assigned to me"}],onSelect:f=>{Ae({assigneeFilter:f==="me"?"me":"any"}).then(h=>{m.preferences=h,we()})}});let i=Ed();if(qn(n,{label:i?i.name:"Labels",active:i!==null,items:[{id:"",label:"Any label"},{separator:!0},...m.labels.map(f=>({id:f.id,label:f.name}))],onSelect:f=>{Ae({labelFilter:f||null}).then(h=>{m.preferences=h,we()})}}),Ad()){let f=S("div",{className:"filter-clear"});n.append(f),Se(f,{label:"Clear",variant:"ghost",size:"sm",onClick:()=>{m.search="",Ae({priorityFilter:"any",statusFilter:null,assigneeFilter:"any",labelFilter:null}).then(h=>{m.preferences=h,we()})}})}let a=S("div",{className:"filter-refresh"});n.append(a),Se(a,{label:"Refresh",variant:"ghost",size:"sm",loading:m.loading,onClick:()=>void st({keepDetail:!0})}),e.append(n);let u=S("div",{className:"toolbar scope"}),c=m.context?.workspaces??[];if(c.length>1){let f=S("div",{style:"flex:1; min-width:120px;"});u.append(f),Ot(f,{value:m.context?.workspaceId??"",options:c.map(h=>({id:h.id,label:h.name})),onChange:h=>void Ud(h)})}let g=m.context?.projects??[];if(g.length>0){let f=S("div",{style:"flex:1; min-width:120px;"});u.append(f),Ot(f,{searchable:g.length>8,searchPlaceholder:"Find a project",value:m.project?.id??"",options:g.map(h=>({id:h.id,label:h.slug.toUpperCase(),hint:h.statistics?`${h.statistics.totalTasks}`:void 0})),onChange:h=>void Dd(h)})}return u.childElementCount>0&&e.append(u),e}function qn(e,t){let n=S("div",{className:t.active?"filter filter-active":"filter"});e.append(n),Lr(n,{label:t.label,size:"sm",variant:"ghost",items:t.items,onSelect:t.onSelect})}function Ca(e){if(!e||!m.board)return null;for(let t of m.board.board.columns){let n=t.tasks.find(o=>o.id===e);if(n)return n}return null}function Id(){let e=m.preferences.openTaskId;return e?Ca(e)??(m.extraTask?.id===e?m.extraTask:null):null}function La(e){return m.context?.projects.find(t=>t.id===e.projectId)??m.project}function $o(e){return nn(La(e)?.slug??"",e.number)}function Cd(e){return m.board?.board.columns.find(t=>t.id===e.status)?.name??oa(e.status)}function Ld(e){return{task:e,ticketId:$o(e),workspaceId:m.context?.workspaceId??"",projectName:La(e)?.name,columnName:Cd(e),comments:m.comments[e.id]?.items}}function Pd(e){m.comments[e]||(m.comments[e]={loading:!0,error:null},it.listComments(e).then(t=>{m.comments[e]={loading:!1,error:null,items:t},we()}).catch(t=>{m.comments[e]={loading:!1,error:Jn("Load comments",t)},we()}))}async function Pa(e){if(!Ca(e)&&m.extraTask?.id!==e)try{m.extraTask=await it.getTask(e)}catch(t){await Kn("Open task",t);return}m.preferences=await Ae({openTaskId:e}),we()}async function Nd(){m.preferences=await Ae({openTaskId:null}),we()}async function Oa(e,t){if(e.status===t)return;let n=m.board?.board.columns.find(o=>o.id===t);await it.updateTaskStatus(e.id,t),await X.toast({kind:"success",message:`${$o(e)} moved to ${n?.name??t}.`}),await Sa(),await st({keepDetail:!0})}function Md(e){Pd(e.id);let t=Ld(e),n=m.board?.board.columns??[],o=n.find(r=>r.isFinal);return xa(t,{columns:n,comments:m.comments[e.id]??null,worktree:m.preferences.createInWorktree,onWorktreeChange:r=>{m.preferences={...m.preferences,createInWorktree:r},Ae({createInWorktree:r})},onMove:r=>void Oa(e,r),onCloseIssue:()=>{o&&Oa(e,o.id)},canCloseIssue:!!o&&e.status!==o?.id,onBack:()=>void Nd()})}async function Ud(e){e!==m.context?.workspaceId&&(m.preferences=await Ae({workspaceId:e,projectId:null,openTaskId:null}),m.board=null,m.mine=[],m.mineLoaded=!1,m.extraTask=null,await st())}async function Dd(e){e!==m.project?.id&&(m.preferences=await Ae({projectId:e,openTaskId:null}),m.project=m.context?.projects.find(t=>t.id===e)??null,m.board=null,m.extraTask=null,await st())}function Gd(){X.toast({kind:"info",message:"Open the + button next to the chat box to pick and attach a task.",dismiss:!0})}X.onReady(e=>{xr(e,document.documentElement),ba(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,m.ready=e,m.connected=e.connection.connected,we(),m.connected&&!va&&(va=!0,st())});X.onConnection(e=>{let t=m.connected;m.connected=e.connected,t!==e.connected&&(we(),e.connected&&st())});X.onReady(e=>{let t=e.settings["openchamber-url"]?.trim();Ea(it,t||void 0)});X.onItem(e=>{if(!e||!("providerId"in e)||e.providerId!==vn)return;let t=e.data;t?.taskId&&Pa(t.taskId)});})();
