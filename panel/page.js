"use strict";(()=>{var sl=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],il=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],hs=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of sl)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of il){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},_r=(e,t)=>{hs(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var Sn="data-oc-scrolling",Sr=`
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
:hover, [${Sn}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${Sn}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${Sn}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${Sn}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function yr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",r=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=n.get(o);s!==void 0&&clearTimeout(s),n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var al=`(${yr.toString()})(document);`;var ll={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},q=(e,t)=>`var(--${e}, var(--oc-${ll[e]}, ${t}))`,pt=q("surface-background","transparent"),yn=q("surface-elevated","transparent"),Bt=q("surface-elevated-foreground","inherit"),Qe=q("surface-foreground","inherit"),oe=q("surface-muted-foreground","gray"),cl=q("surface-muted","transparent"),Me=q("interactive-border","currentColor"),Ce=q("interactive-hover","transparent"),ut=q("interactive-active","transparent"),wr=q("interactive-selection","transparent"),Ar=q("interactive-selection-foreground","inherit"),xs=q("interactive-focus-ring","currentColor"),We=q("primary","currentColor"),vr=q("primary-text","inherit"),Rr=q("error-text","inherit"),dl=q("font-sans","inherit"),Or=q("font-mono","monospace"),Es=q("radius","9px"),Ir=`calc(${Es} - 2px)`,gs=`calc(${Es} - 4px)`,fe=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,ks=`box-shadow: 0 0 0 2px ${xs};`,wn=e=>{let t=q(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${q(`${e}-text`,"inherit")}; }`},pl=`
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
`,bs=`
.oc-sdk { color: ${Qe}; font-family: ${dl}; }
.oc-sdk :focus-visible { outline: none; ${ks} }
.oc-sdk-mono { font-family: ${Or}; }
.oc-sdk-muted { color: ${oe}; }
${wn("success")}${wn("warning")}${wn("error")}${wn("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${We}; --oc-sdk-tone-text: ${vr}; }

.oc-sdk-btn { border-radius: ${Ir}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${gs}; }
.oc-sdk-btn[data-variant="default"] { color: ${vr}; background: ${fe(We,10,pt)}; border-color: ${fe(We,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${fe(We,16,pt)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${fe(We,22,pt)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${cl}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ut}, ${ut}); }
.oc-sdk-btn[data-variant="outline"] { background: ${yn}; color: ${Bt}; border-color: ${Me}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ut}, ${ut}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ce}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ut}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${q("status-error","red")}; color: ${Rr}; background: ${fe("var(--oc-sdk-tone)",7,pt)}; border-color: ${fe("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${fe("var(--oc-sdk-tone)",9,pt)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${fe("var(--oc-sdk-tone)",11,pt)}; }

.oc-sdk-field-note { color: ${oe}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Rr}; }
.oc-sdk-input { border-radius: ${Ir}; background: ${yn}; color: ${Bt}; box-shadow: inset 0 0 0 1px ${fe(Me,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${oe}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${xs}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${q("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${q("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Or}; }

.oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${We}; }
.oc-sdk-search-clear { border-radius: ${gs}; color: ${oe}; }
.oc-sdk-search-clear:hover { background: ${Ce}; color: ${Qe}; }

.oc-sdk-trigger { border-color: ${Me}; border-radius: ${Ir}; background: ${yn}; color: ${Bt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ce}, ${Ce}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ut}, ${ut}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${oe}; }
.oc-sdk-trigger-chevron { color: ${oe}; }
.oc-sdk-popup { --surface-foreground: ${Bt}; border-color: ${fe(Me,60)}; border-radius: 12px; background: ${yn}; color: ${Bt}; box-shadow: 0 8px 24px ${fe(Qe,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ce}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${wr}; color: ${Ar}; }
.oc-sdk-option-check { color: ${Qe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Rr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${fe(q("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${oe}; }
.oc-sdk-popup-empty { color: ${oe}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Me}; border-radius: 4px; color: ${Qe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${fe(Qe,60,Me)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Me}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${pt}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${We}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ks} }
.oc-sdk-check-desc { color: ${oe}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${fe(Qe,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${oe}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Qe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ar}; background: ${wr}; border-color: ${Me}; }
.oc-sdk-tab-count { color: ${oe}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Ce}; color: ${oe}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${fe("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ce}; }
.oc-sdk-row[aria-selected="true"] { background: ${wr}; color: ${Ar}; }
.oc-sdk-row-lead { font-family: ${Or}; color: ${oe}; }
.oc-sdk-row-sub { color: ${oe}; }
.oc-sdk-row-meta { color: ${oe}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${oe}; }

.oc-sdk-empty-body { color: ${oe}; }

.oc-sdk-spinner { color: ${oe}; }
.oc-sdk-spinner-ring { border-color: ${Me}; border-top-color: ${We}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${fe("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${fe("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${oe}; }

.oc-sdk-separator { color: ${oe}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${fe(Me,40)}; }

.oc-sdk-progress-label { color: ${oe}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Me}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${We}); }

.oc-sdk-text a { color: ${vr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${fe(Me,60)}; }
`,J=`
${Sr}
${pl}
${bs}`;var Ts="oc-sdk-ui-style",et=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},Z=e=>{let t=document.getElementById(Ts);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}yr(document);let n=document.createElement("style");n.id=Ts,n.textContent=e,document.head.appendChild(n)},v=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},Le=e=>{let t=v("button",e);return t.type="button",t},ce=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)},ft=(e,t,n)=>{n==null||n===""?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)},_s=(e,t)=>{let n=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var ul=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ve=(e,t)=>{Z(J);let n=t,r=Le("oc-sdk oc-sdk-btn"),o=ul(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=!!n.disabled||!!n.loading,r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r?r.prepend(o):!n.loading&&o.parentNode===r&&o.remove(),ce(s,n.label)},c=()=>{n.disabled||n.loading||n.onClick()};return r.addEventListener("click",c),i(),{update:d=>{n={...n,...d},i()},dispose:()=>{r.removeEventListener("click",c),r.remove()}}};var Ss="http://www.w3.org/2000/svg",fl={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ve=(e,t,n)=>{let r=document.createElementNS(Ss,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n&&r.setAttribute("class",n);let o=document.createElementNS(Ss,"path");return o.setAttribute("d",fl[e]),r.append(o),r};var Cr=(e,t)=>{Z(J);let n=t,r=v("div","oc-sdk oc-sdk-search"),o=v("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Le("oc-sdk-search-clear");s.append(Ve("close",14)),s.tabIndex=-1,r.append(Ve("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let f=n.placeholder??"Search";ft(o,"placeholder",f),o.setAttribute("aria-label",n.label??f),s.setAttribute("aria-label","Clear search"),o.value!==n.value&&(o.value=n.value),r.dataset.active=n.value.trim()===""?"false":"true"},c=()=>{n.value!==""&&n.onChange(""),o.focus()},d=()=>{n.onChange(o.value)},m=f=>{f.key==="Escape"&&o.value!==""&&(f.preventDefault(),c())};return o.addEventListener("input",d),o.addEventListener("keydown",m),s.addEventListener("click",c),i(),n.autofocus&&o.focus(),{update:f=>{n={...n,...f},i()},dispose:()=>{o.removeEventListener("input",d),o.removeEventListener("keydown",m),s.removeEventListener("click",c),r.remove()}}};var Ke=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},tt=(e,t,n)=>{let r=e.filter(d=>!d.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex(d=>d.id===t);return i===-1?n==="next"?o.id:s.id:r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var ys=(e,t)=>`${e}-${t??""}`,An=(e,t,n,r)=>{let o=Le("oc-sdk-option");o.id=ys(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!n.disabled,t==="option"&&o.setAttribute("aria-selected",n.selected?"true":"false"),o.dataset.destructive=n.destructive?"true":"false";let s=v("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=v("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=v("span","oc-sdk-option-check");i.append(Ve("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},vn=(e,t,n,r)=>{let o=ys(n,r);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");ft(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ml=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;r>o&&n.top-8>o&&(e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`);let s=n.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(n.left-s))}px`)},Rn=(e,t,n,r)=>{e.append(n),ml(n,t);let o=_s(e,r),s=()=>{r()},i=c=>{c.target instanceof Node&&n.contains(c.target)||r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var ws=(e,t)=>{let n=t.trim().toLowerCase();return n?e.filter(r=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n)):[...e]},hl=0,jt=(e,t)=>{Z(J);let n=t,r=`oc-sdk-select-${hl+=1}`,o=v("div","oc-sdk oc-sdk-select"),s=v("span","oc-sdk-field-label");s.id=`${r}-label`;let i=Le("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let c=v("span","oc-sdk-trigger-value");i.append(c,Ve("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let d="",m=null,f=null,b=v("div","oc-sdk oc-sdk-popup"),_=v("div","oc-sdk-popup-search"),L=v("input","oc-sdk-input");L.type="text",L.autocomplete="off",_.append(L);let N=v("div");N.setAttribute("role","listbox"),N.tabIndex=-1,b.append(N);let K=()=>ws(n.options,n.searchable?d:""),pe=()=>n.searchable?L:N,C=O=>{m=O,vn(N,pe(),r,O)},te=()=>{et(N);let O=K();if(O.length===0){let ie=v("div","oc-sdk-popup-empty");ie.textContent="No matches",N.append(ie)}for(let ie of O)N.append(An(r,"option",{...ie,selected:ie.id===n.value},{hover:()=>C(ie.id),pick:()=>me(ie.id)}));C(O.some(ie=>ie.id===m)?m:O[0]?.id??null)},xe=()=>{let O=f;f=null,O?.(),d="",L.value="",i.setAttribute("aria-expanded","false")},le=()=>{f||n.disabled||(m=n.value,L.placeholder=n.searchPlaceholder??"Search",n.searchable?b.prepend(_):_.remove(),te(),f=Rn(o,i,b,xe),i.setAttribute("aria-expanded","true"),pe().focus())},me=O=>{xe(),i.focus(),O!==n.value&&n.onChange(O)},he=()=>{f?xe():le()},H=O=>{!f&&Ke(O)&&(O.preventDefault(),le())},A=O=>{let ie=Ke(O);ie?(O.preventDefault(),C(tt(K(),m,ie))):O.key==="Enter"?(O.preventDefault(),m&&me(m)):O.key==="Escape"?(O.preventDefault(),xe(),i.focus()):n.searchable&&O.target!==L&&O.key.length===1&&!O.ctrlKey&&!O.metaKey&&L.focus()},w=()=>{d=L.value,te()},_e=O=>{f&&!(O.relatedTarget instanceof Node&&o.contains(O.relatedTarget))&&xe()},ee=()=>{ce(s,n.label),s.hidden=!n.label;let O=n.options.find(ie=>ie.id===n.value);ce(c,O?.label??n.placeholder??"Select"),c.dataset.empty=O?"false":"true",i.disabled=!!n.disabled,f&&te()};return i.addEventListener("click",he),i.addEventListener("keydown",H),b.addEventListener("keydown",A),L.addEventListener("input",w),o.addEventListener("focusout",_e),ee(),{update:O=>{n={...n,...O},ee()},dispose:()=>{xe(),i.removeEventListener("click",he),i.removeEventListener("keydown",H),b.removeEventListener("keydown",A),L.removeEventListener("input",w),o.removeEventListener("focusout",_e),o.remove()}}};var gl=(e,t,n)=>{Z(J);let r=t,o=Le("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=v("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");n==="checkbox"&&s.append(Ve("check",12));let i=v("span","oc-sdk-check-text"),c=v("span","oc-sdk-check-label"),d=v("span","oc-sdk-check-desc");i.append(c,d),o.append(s,i),e.append(o);let m=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=!!r.disabled,ce(c,r.label),ce(d,r.description),d.hidden=!r.description},f=()=>{r.disabled||r.onChange(!r.checked)};return o.addEventListener("click",f),m(),{update:b=>{r={...r,...b},m()},dispose:()=>{o.removeEventListener("click",f),o.remove()}}},Lr=(e,t)=>gl(e,t,"checkbox");var Nr=(e,t)=>{Z(J);let n=t,r=v("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{et(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let c=Le("oc-sdk-tab");c.setAttribute("role","tab");let d=i.id===n.activeId;c.setAttribute("aria-selected",d?"true":"false"),c.tabIndex=d?0:-1,c.dataset.id=i.id;let m=v("span");if(m.textContent=i.label,c.append(m),i.count!==void 0){let f=v("span","oc-sdk-tab-count");f.textContent=String(i.count),c.append(f)}c.addEventListener("click",()=>{i.id!==n.activeId&&n.onChange(i.id)}),r.append(c)}},s=i=>{let c=Ke(i,"horizontal");if(!c)return;let d=tt(n.items,n.activeId,c);if(d&&d!==n.activeId){i.preventDefault(),n.onChange(d);let m=r.querySelector(`[data-id="${CSS.escape(d)}"]`);m instanceof HTMLElement&&m.focus()}};return r.addEventListener("keydown",s),o(),{update:i=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var nt=(e,t)=>{Z(J);let n=t,r=v("div","oc-sdk oc-sdk-empty"),o=v("h2","oc-sdk-empty-title"),s=v("p","oc-sdk-empty-body"),i=v("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let c=null,d=()=>{if(ce(o,n.title),ce(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let m={label:n.action.label,onClick:n.action.onClick};c?c.update(m):c=ve(i,{...m,variant:"outline",size:"sm"})};return d(),{update:m=>{n={...n,...m},d()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var On=(e,t={})=>{Z(J);let n=t,r=v("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=v("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=v("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",ce(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:c=>{n={...n,...c},i()},dispose:()=>{r.remove()}}};var Mr=(e,t)=>{Z(J);let n=t,r=v("div","oc-sdk oc-sdk-banner"),o=v("div","oc-sdk-banner-text"),s=v("div","oc-sdk-banner-title"),i=v("div","oc-sdk-banner-body"),c=v("div","oc-sdk-banner-action");o.append(s,i),r.append(o,c),e.append(r);let d=null,m=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),ce(s,n.title),ce(i,n.body),i.hidden=!n.body,c.hidden=!n.action,!n.action){d?.dispose(),d=null;return}let f={label:n.action.label,onClick:n.action.onClick};d?d.update(f):d=ve(c,{...f,variant:"outline",size:"xs"})};return m(),{update:f=>{n={...n,...f},m()},dispose:()=>{d?.dispose(),d=null,r.remove()}}};var As=e=>e.filter(t=>!("separator"in t)),xl=0,mt=(e,t)=>{Z(J);let n=t,r=`oc-sdk-menu-${xl+=1}`,o=v("div","oc-sdk oc-sdk-menu");e.append(o);let s=v("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,c=null,d=ve(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{i?_():L()}}),m=o.querySelector("button");m?.setAttribute("aria-haspopup","menu");let f=C=>{c=C,vn(s,s,r,C)},b=()=>{et(s);for(let C of n.items){if("separator"in C){let te=v("div","oc-sdk-separator");te.dataset.labeled="false",s.append(te);continue}s.append(An(r,"menuitem",C,{hover:()=>f(C.id),pick:()=>N(C.id)}))}f(As(n.items).some(C=>C.id===c)?c:null)},_=()=>{let C=i;i=null,C?.(),c=null,m?.setAttribute("aria-expanded","false")},L=()=>{i||!m||(b(),i=Rn(o,m,s,_),m.setAttribute("aria-expanded","true"),s.focus())},N=C=>{_(),m?.focus(),n.onSelect(C)},K=C=>{let te=Ke(C);te?(C.preventDefault(),f(tt(As(n.items),c,te))):C.key==="Enter"||C.key===" "?(C.preventDefault(),c&&N(c)):C.key==="Escape"&&(C.preventDefault(),_(),m?.focus())},pe=C=>{i&&!(C.relatedTarget instanceof Node&&o.contains(C.relatedTarget))&&_()};return s.addEventListener("keydown",K),o.addEventListener("focusout",pe),{update:C=>{n={...n,...C},d.update({label:n.label,variant:n.variant,size:n.size}),i&&b()},dispose:()=>{_(),s.removeEventListener("keydown",K),o.removeEventListener("focusout",pe),d.dispose(),o.remove()}}};var El="https://kaneo.qubitquilt.dev",vs=El.replace(/\/api\/?$/,""),Rs="kaneo",Pr=100,Os=["no-priority","low","medium","high","urgent"];var Xt={"no-priority":0,low:1,medium:2,high:3,urgent:4};var ht=class extends Error{status;code;constructor(t,n,r){super(r),this.name="KaneoError",this.status=t,this.code=n}};function bl(e){if(!e)return;let t={};for(let[n,r]of Object.entries(e))r==null||r===""||(t[n]=String(r));return Object.keys(t).length>0?t:void 0}function Tl(e,t){let n=typeof t=="object"&&t!==null?t:{},r=typeof n.message=="string"&&n.message?n.message:`Kaneo answered ${e}.`;return new ht(e,n.code??`HTTP_${e}`,r)}var _l=10,Sl=2,yl=800;function Is(e){async function t({method:r,path:o,query:s,body:i}){let c=bl(s),d="/api"+o,m;for(let _=0;m=await e({method:r,path:d,...c?{query:c}:{},...i===void 0?{}:{body:JSON.stringify(i)}}),!(m.status!==429||_>=Sl);_+=1)await new Promise(L=>setTimeout(L,yl*2**_));let f=m,b;if(f.body)try{b=JSON.parse(f.body)}catch{throw f.status>=400?new ht(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new ht(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw Tl(f.status,b);return b}async function n(r){let o=encodeURIComponent(r),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:Pr}}),i=s.data,c=s.pagination,d=1;for(;d<Math.min(c.totalPages,_l);){d+=1;let m=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:d,limit:Pr}});for(let f of m.data.columns){let b=i.columns.find(_=>_.id===f.id);b&&b.tasks.push(...f.tasks)}i.archivedTasks.push(...m.data.archivedTasks),i.plannedTasks.push(...m.data.plannedTasks)}return{board:i,pagination:c,truncated:c.totalPages>d}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(r,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:r,includeArchived:o?"true":void 0}}),getBoard:n,getTask:r=>t({method:"GET",path:`/task/${encodeURIComponent(r)}`,query:{view:"detail"}}),getTaskByTicketId:(r,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(r)}`,query:{workspaceId:o}}),listAssignedTasks:r=>t({method:"GET",path:"/task/assigned",query:{workspaceId:r}}),search:(r,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:r,projectId:s.projectId,limit:s.limit??30}}),listLabels:r=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(r)}`}),listColumns:r=>t({method:"GET",path:`/column/${encodeURIComponent(r)}`}),listComments:r=>t({method:"GET",path:`/comment/${encodeURIComponent(r)}`}),createComment:(r,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(r)}`,body:{content:o}}),createTask:(r,o)=>t({method:"POST",path:`/task/${encodeURIComponent(r)}`,body:o}),updateTaskStatus:(r,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(r)}`,body:{status:o}}),updateTaskPriority:(r,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(r)}`,body:{priority:o}})}}function wl(e,t){this.v=e,this.k=t}function Cs(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Al(e){if(Array.isArray(e))return e}function vl(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,s,i,c=[],d=!0,m=!1;try{if(s=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;d=!1}else for(;!(d=(r=s.call(n)).done)&&(c.push(r.value),c.length!==t);d=!0);}catch(f){m=!0,o=f}finally{try{if(!d&&n.return!=null&&(i=n.return(),Object(i)!==i))return}finally{if(m)throw o}}return c}}function Rl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ol(e,t){return Al(e)||vl(e,t)||Il(e,t)||Rl()}function Il(e,t){if(e){if(typeof e=="string")return Cs(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Cs(e,t):void 0}}function In(e){var t,n;function r(s,i){try{var c=e[s](i),d=c.value,m=d instanceof wl;Promise.resolve(m?d.v:d).then(function(f){if(m){var b=s==="return"&&d.k?s:"next";if(!d.k||f.done)return r(b,f);f=e[b](f).value}o(!!c.done,f)},function(f){r("throw",f)})}catch(f){o(2,f)}}function o(s,i){s===2?t.reject(i):t.resolve({value:i,done:s}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(s,i){return new Promise(function(c,d){var m={key:s,arg:i,resolve:c,reject:d,next:null};n?n=n.next=m:(t=n=m,r(s,i))})},typeof e.return!="function"&&(this.return=void 0)}In.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},In.prototype.next=function(e){return this._invoke("next",e)},In.prototype.throw=function(e){return this._invoke("throw",e)},In.prototype.return=function(e){return this._invoke("return",e)};var Ws=Object.entries,Ls=Object.setPrototypeOf,Cl=Object.isFrozen,Vs=Object.getPrototypeOf,Ks=Object.getOwnPropertyDescriptor,ke=Object.freeze,Te=Object.seal,Ot=Object.create,Ys=typeof Reflect<"u"&&Reflect,Xr=Ys.apply,Wr=Ys.construct;ke||(ke=function(t){return t});Te||(Te=function(t){return t});Xr||(Xr=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});Wr||(Wr=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ye=Q(Array.prototype.forEach);Array.prototype.indexOf;var Ll=Q(Array.prototype.lastIndexOf),Ns=Q(Array.prototype.pop),Wt=Q(Array.prototype.push),Nl=Q(Array.prototype.slice),Ml=Q(Array.prototype.splice),It=Array.isArray,Ur=qs(Set),Dr=Q(Set.prototype.add),Vt=Q(Set.prototype.has),gt=Q(String.prototype.toLowerCase),Gr=Q(String.prototype.toString),Ms=Q(String.prototype.match),Kt=Q(String.prototype.replace),Ps=Q(String.prototype.indexOf),Pl=Q(String.prototype.trim),Ul=Q(Number.prototype.toString),Dl=Q(Boolean.prototype.toString),Us=typeof BigInt>"u"?null:Q(BigInt.prototype.toString),Ds=typeof Symbol>"u"?null:Q(Symbol.prototype.toString),Re=Q(Object.prototype.hasOwnProperty),Yt=Q(Object.prototype.toString),be=Q(RegExp.prototype.test),qe=qs(TypeError);function Q(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Xr(e,t,r)}}function qs(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Wr(e,n)}}function D(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:gt;if(Ls&&Ls(e,null),!It(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Cl(t)||(t[r]=s),o=s)}e[o]=!0}return e}function Gl(e){for(let t=0;t<e.length;t++)Re(e,t)||(e[t]=null);return e}function Ne(e){let t=Ot(null);for(let r of Ws(e)){var n=Ol(r,2);let o=n[0],s=n[1];Re(e,o)&&(It(s)?t[o]=Gl(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Ne(s):t[o]=s)}return t}function $l(e){switch(typeof e){case"string":return e;case"number":return Ul(e);case"boolean":return Dl(e);case"bigint":return Us?Us(e):"0";case"symbol":return Ds?Ds(e):"Symbol()";case"undefined":return Yt(e);case"function":case"object":{if(e===null)return Yt(e);let t=e,n=Pe(t,"toString");if(typeof n=="function"){let r=n(t);return typeof r=="string"?r:Yt(r)}return Yt(e)}default:return Yt(e)}}function Pe(e,t){for(;e!==null;){let r=Ks(e,t);if(r){if(r.get)return Q(r.get);if(typeof r.value=="function")return Q(r.value)}e=Vs(e)}function n(){return null}return n}function Hl(e,t){for(;e!==null;){let n=Ks(e,t);if(n)return n.get?Q(n.get):null;e=Vs(e)}return null}function Fl(e){try{return be(e,""),!0}catch{return!1}}var Gs=ke(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),$r=ke(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Hr=ke(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zl=ke(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Fr=ke(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bl=ke(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),$s=ke(["#text"]),Hs=ke(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),zr=ke(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Fs=ke(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cn=ke(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),jl=Te(/{{[\w\W]*|^[\w\W]*}}/g),Xl=Te(/<%[\w\W]*|^[\w\W]*%>/g),Wl=Te(/\${[\w\W]*/g),Vl=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),Kl=Te(/^aria-[\-\w]+$/),zs=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yl=Te(/^(?:\w+script|data):/i),ql=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Jl=Te(/^html$/i),Zl=Te(/^[a-z][.\w]*(-[.\w]+)+$/i),Br=Te(/<[/\w!]/g),Bs=Te(/<[/\w]/g),Ql=Te(/<\/no(script|embed|frames)/i),js=Te(/\/>/i),de={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ec=ke(D({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),tc=function(){return typeof window>"u"?null:window},nc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Xs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},rt=function(t,n,r,o){return Re(t,n)&&It(t[n])?D(o.base?Ne(o.base):{},t[n],o.transform):r},jr=function(t,n,r){let o=Re(t,n)?t[n]:void 0;return o&&typeof o=="object"?Ne(o):r()};function Js(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tc(),t=E=>Js(E);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==de.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,o=r.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,i=e.Node,c=e.Element,d=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let m=e.DOMParser,f=e.trustedTypes,b=c.prototype,_=Pe(b,"cloneNode"),L=Pe(b,"remove"),N=Pe(b,"removeAttributeNode"),K=Pe(b,"nextSibling"),pe=Pe(b,"childNodes"),C=Pe(b,"parentNode"),te=Pe(b,"shadowRoot"),xe=Pe(b,"attributes"),le=i&&i.prototype?Pe(i.prototype,"nodeType"):null,me=i&&i.prototype?Pe(i.prototype,"nodeName"):null,he=i&&i.prototype?Pe(i.prototype,"ownerDocument"):null,H=function(a){return le?le(a):a.nodeType},A=function(a){return me?me(a):a.nodeName},w=Hl(b,"namespaceURI"),_e=function(a){return w?w(a):a.namespaceURI};if(typeof s=="function"){let E=n.createElement("template");E.content&&E.content.ownerDocument&&(n=E.content.ownerDocument)}let ee,O="",ie,Pt=!1,ge=0,ne=function(){if(ge>0)throw qe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},je=function(a){ne(),ge++;try{return ee.createHTML(a)}finally{ge--}},Ee=function(a){ne(),ge++;try{return ee.createScriptURL(a)}finally{ge--}},re=function(){return Pt||(ie=nc(f,o),Pt=!0),ie},Y=n,it=Y.implementation,Ut=Y.createNodeIterator,ln=Y.createDocumentFragment,cn=Y.getElementsByTagName,bt=r.importNode,F=Xs();t.isSupported=typeof Ws=="function"&&typeof C=="function"&&it&&it.createHTMLDocument!==void 0;let dn=jl,pn=Xl,un=Wl,Ie=Vl,Dt=Kl,Gt=Yl,fn=ql,Tt=Zl,$t=zs,V=null,l=D({},[...Gs,...$r,...Hr,...Fr,...$s]),u=null,S=D({},[...Hs,...zr,...Fs,...Cn]),T=Object.seal(Ot(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,X=null,j=Object.seal(Ot(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Bo=!0,nr=!0,jo=!1,rr=!0,Xe=!1,at=!0,lt=!1,or=!1,mn=null,hn=null,sr=!1,_t=!1,gn=!1,kn=!1,Xo=!0,Wo=!1,Vo="user-content-",ir=!0,ar=!1,ct=null,St={},dt=null,Ko=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),Yo=null,qo=D({},["audio","video","img","source","image","track"]),Jo=null,Zo=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),xn="http://www.w3.org/1998/Math/MathML",En="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",yt=He,lr=!1,cr=null,$a=D({},[xn,En,He],Gr),Qo=ke(["mi","mo","mn","ms","mtext"]),dr=D({},Qo),es=ke(["annotation-xml"]),pr=D({},es),Ha=D({},["title","style","font","a","script"]),Ht=null,Fa=["application/xhtml+xml","text/html"],za="text/html",ae=null,wt=null,Ba=n.createElement("form"),ts=function(a){return a instanceof RegExp||a instanceof Function},ur=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(wt&&wt===a)return;(!a||typeof a!="object")&&(a={}),a=Ne(a),Ht=Fa.indexOf(a.PARSER_MEDIA_TYPE)===-1?za:a.PARSER_MEDIA_TYPE,ae=Ht==="application/xhtml+xml"?Gr:gt,V=rt(a,"ALLOWED_TAGS",l,{transform:ae}),u=rt(a,"ALLOWED_ATTR",S,{transform:ae}),cr=rt(a,"ALLOWED_NAMESPACES",$a,{transform:Gr}),Jo=rt(a,"ADD_URI_SAFE_ATTR",Zo,{transform:ae,base:Zo}),Yo=rt(a,"ADD_DATA_URI_TAGS",qo,{transform:ae,base:qo}),dt=rt(a,"FORBID_CONTENTS",Ko,{transform:ae}),z=rt(a,"FORBID_TAGS",Ne({}),{transform:ae}),X=rt(a,"FORBID_ATTR",Ne({}),{transform:ae}),St=Re(a,"USE_PROFILES")?a.USE_PROFILES&&typeof a.USE_PROFILES=="object"?Ne(a.USE_PROFILES):a.USE_PROFILES:!1,Bo=a.ALLOW_ARIA_ATTR!==!1,nr=a.ALLOW_DATA_ATTR!==!1,jo=a.ALLOW_UNKNOWN_PROTOCOLS||!1,rr=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Xe=a.SAFE_FOR_TEMPLATES||!1,at=a.SAFE_FOR_XML!==!1,lt=a.WHOLE_DOCUMENT||!1,_t=a.RETURN_DOM||!1,gn=a.RETURN_DOM_FRAGMENT||!1,kn=a.RETURN_TRUSTED_TYPE||!1,sr=a.FORCE_BODY||!1,Xo=a.SANITIZE_DOM!==!1,Wo=a.SANITIZE_NAMED_PROPS||!1,ir=a.KEEP_CONTENT!==!1,ar=a.IN_PLACE||!1,$t=Fl(a.ALLOWED_URI_REGEXP)?a.ALLOWED_URI_REGEXP:zs,yt=typeof a.NAMESPACE=="string"?a.NAMESPACE:He,dr=jr(a,"MATHML_TEXT_INTEGRATION_POINTS",()=>D({},Qo)),pr=jr(a,"HTML_INTEGRATION_POINTS",()=>D({},es));let p=jr(a,"CUSTOM_ELEMENT_HANDLING",()=>Ot(null));if(T=Ot(null),Re(p,"tagNameCheck")&&ts(p.tagNameCheck)&&(T.tagNameCheck=p.tagNameCheck),Re(p,"attributeNameCheck")&&ts(p.attributeNameCheck)&&(T.attributeNameCheck=p.attributeNameCheck),Re(p,"allowCustomizedBuiltInElements")&&typeof p.allowCustomizedBuiltInElements=="boolean"&&(T.allowCustomizedBuiltInElements=p.allowCustomizedBuiltInElements),Te(T),Xe&&(nr=!1),gn&&(_t=!0),St&&(V=D({},$s),u=Ot(null),St.html===!0&&(D(V,Gs),D(u,Hs)),St.svg===!0&&(D(V,$r),D(u,zr),D(u,Cn)),St.svgFilters===!0&&(D(V,Hr),D(u,zr),D(u,Cn)),St.mathMl===!0&&(D(V,Fr),D(u,Fs),D(u,Cn))),j.tagCheck=null,j.attributeCheck=null,Re(a,"ADD_TAGS")&&(typeof a.ADD_TAGS=="function"?j.tagCheck=a.ADD_TAGS:It(a.ADD_TAGS)&&(V===l&&(V=Ne(V)),D(V,a.ADD_TAGS,ae))),Re(a,"ADD_ATTR")&&(typeof a.ADD_ATTR=="function"?j.attributeCheck=a.ADD_ATTR:It(a.ADD_ATTR)&&(u===S&&(u=Ne(u)),D(u,a.ADD_ATTR,ae))),Re(a,"ADD_FORBID_CONTENTS")&&It(a.ADD_FORBID_CONTENTS)&&(dt===Ko&&(dt=Ne(dt)),D(dt,a.ADD_FORBID_CONTENTS,ae)),ir&&(V["#text"]=!0),lt&&D(V,["html","head","body"]),V.table&&(D(V,["tbody"]),delete z.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw qe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let h=ee;ee=a.TRUSTED_TYPES_POLICY;try{O=je("")}catch(g){throw ee=h,g}}else a.TRUSTED_TYPES_POLICY===null?(ee=void 0,O=""):(ee===void 0&&(ee=re()),ee&&typeof O=="string"&&(O=je("")));ke&&ke(a),wt=a},ns=D({},[...$r,...Hr,...zl]),rs=D({},[...Fr,...Bl]),ja=function(a,p,h){return p.namespaceURI===He?a==="svg":p.namespaceURI===xn?a==="svg"&&(h==="annotation-xml"||dr[h]):!!ns[a]},Xa=function(a,p,h){return p.namespaceURI===He?a==="math":p.namespaceURI===En?a==="math"&&pr[h]:!!rs[a]},Wa=function(a,p,h){return p.namespaceURI===En&&!pr[h]||p.namespaceURI===xn&&!dr[h]?!1:!rs[a]&&(Ha[a]||!ns[a])},Va=function(a){let p=_e(a),h=gt(A(a)),g=C(a),y,I;return g&&H(g)===de.element?(y={namespaceURI:_e(g)},I=gt(A(g))):(y={namespaceURI:yt},I="template"),cr[p]?p===En?ja(h,y,I):p===xn?Xa(h,y,I):p===He?Wa(h,y,I):!!(Ht==="application/xhtml+xml"&&cr[p]):!1},Je=function(a){Wt(t.removed,{element:a});try{C(a).removeChild(a)}catch{if(L(a),!C(a))throw qe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},os=function(a,p,h){try{N(a,p)}catch{try{a.removeAttribute(h)}catch{}}},fr=function(a){hr(a);let p=pe(a);p&&Ye(Nl(p),g=>{try{L(g)}catch{}});let h=H(a)===de.element?xe(a):null;if(h)for(let g=h.length-1;g>=0;--g){let y=h[g],I=y&&y.name;typeof I=="string"&&os(a,y,I)}},At=function(a,p,h){if(!h)try{h=p.getAttributeNode(a)}catch{h=null}Wt(t.removed,{attribute:h||null,from:p});try{h?N(p,h):p.removeAttribute(a)}catch{try{p.removeAttribute(a)}catch{}}if(a==="is")if(_t||gn)try{Je(p)}catch{}else try{p.setAttribute(a,"")}catch{}},ss=function(a){let p=xe(a);if(p)for(let h=p.length-1;h>=0;--h){let g=p[h],y=g&&g.name;typeof y!="string"||u[ae(y)]||os(a,g,y)}},mr=function(a,p){let h=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,g=[a];for(;g.length>0;){let y=g.pop();if(p(y)===!1)continue;if(h&&H(y)===de.element){let P=te(y);Ze(P)&&g.push(P)}let I=pe(y);if(I)for(let P=I.length-1;P>=0;--P)g.push(I[P])}},hr=function(a){mr(a,p=>{H(p)===de.element&&ss(p)})},gr=function(a){let p=[];return mr(a,h=>{p.push(h)},!0),p},Ka=function(a,p){let h=Ur();Ye(gr(a),g=>{H(g)===de.element&&Dr(h,g)}),Ye(p,g=>{H(g)===de.element&&!Vt(h,g)&&ss(g)})},is=function(a,p){let h=!1;return Ye(t.removed,g=>{g.element&&(h=h||g.element===a,hr(g.element))}),Ka(a,p),h},Ya=8,qa=function(a,p){let h=ct,g=null,y=()=>(g||(g=Ur(),Ye(p,I=>{Dr(g,I)})),g);for(let I=0;;I++){let P=gr(a),ue=[a],Fe=!1;if(Ye(P,Se=>{H(Se)===de.documentFragment?Wt(ue,Se):!Fe&&!Vt(h,Se)&&(Fe=Vt(y(),Se))}),!Fe)return;if(I>=Ya)throw qe("the tree kept changing during in-place sanitization; refusing to return it");Ye(ue,(Se,we)=>{Ja(Se,we>0,a,y())})}},Ja=function(a,p,h,g){let y=kr(a),I;for(;I=y.nextNode();)!Vt(g,I)||Vt(ct,I)||(p&&Ue(F.uponSanitizeShadowNode,I,null),Er(I,h),br(I,h),Ze(I.content)&&zt(I.content))},Za=function(a){ct&&Dr(ct,a)},as=function(a,p){return at?a==="patchsrc"?!0:a==="for"&&p!=="label"&&p!=="output":!1},Qa=function(a){at&&mr(a,p=>{let h=H(p);if(h===de.processingInstruction||h===de.comment&&be(Bs,p.data)){try{L(p)}catch{}return!1}if(h===de.element){let g=p,y=ae(A(p));try{g.hasAttribute&&g.hasAttribute("patchsrc")&&g.removeAttribute("patchsrc"),g.hasAttribute&&g.hasAttribute("for")&&as("for",y)&&g.removeAttribute("for")}catch{}}return!0})},ls=function(a){let p=null,h=null;if(sr)a="<remove></remove>"+a;else{let I=Ms(a,/^[\r\n\t ]+/);h=I&&I[0]}Ht==="application/xhtml+xml"&&yt===He&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");let g=ee?je(a):a;if(yt===He)try{p=new m().parseFromString(g,Ht)}catch{}if(!p||!p.documentElement){p=it.createDocument(yt,"template",null);try{p.documentElement.innerHTML=lr?O:g}catch{}}let y=p.body||p.documentElement;return a&&h&&y.insertBefore(n.createTextNode(h),y.childNodes[0]||null),yt===He?cn.call(p,lt?"html":"body")[0]:lt?p.documentElement:y},kr=function(a){let p=he?he(a):a.ownerDocument;return Ut.call(p||a,a,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},bn=function(a){return a=Kt(a,dn," "),a=Kt(a,pn," "),a=Kt(a,un," "),a},xr=function(a){var p;cs(a);let h=(p=a.querySelectorAll)===null||p===void 0?void 0:p.call(a,"template");h&&Ye(h,g=>{Ze(g.content)&&xr(g.content)})},cs=function(a){a.normalize();let p=he?he(a):a.ownerDocument,h=Ut.call(p||a,a,d.SHOW_TEXT|d.SHOW_COMMENT|d.SHOW_CDATA_SECTION|d.SHOW_PROCESSING_INSTRUCTION,null),g=h.nextNode();for(;g;)g.data=bn(g.data),g=h.nextNode()},Tn=function(a){let p=me?me(a):null;return typeof p!="string"||ae(p)!=="form"?!1:typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||a.attributes!==xe(a)||typeof a.removeAttribute!="function"||typeof a.removeAttributeNode!="function"||typeof a.getAttributeNode!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function"||a.nodeType!==le(a)||a.childNodes!==pe(a)},Ze=function(a){if(!le||typeof a!="object"||a===null)return!1;try{return le(a)===de.documentFragment}catch{return!1}},Ft=function(a){if(!le||typeof a!="object"||a===null)return!1;try{return typeof le(a)=="number"}catch{return!1}};function Ue(E,a,p){E.length!==0&&Ye(E,h=>{h.call(t,a,p,wt)})}let el=function(a,p){return!!(at&&a.hasChildNodes()&&!Ft(a.firstElementChild)&&be(Br,a.textContent)&&be(Br,a.innerHTML)||at&&ec[p]&&H(a)===de.element&&_e(a)===He&&(Ft(a.firstElementChild)||typeof a.textContent=="string"&&be(Br,a.textContent))||a.nodeType===de.processingInstruction||at&&a.nodeType===de.comment&&be(Bs,a.data))},_n=function(a,p){if(a instanceof RegExp)return be(a,p);if(a instanceof Function){for(var h=arguments.length,g=new Array(h>2?h-2:0),y=2;y<h;y++)g[y-2]=arguments[y];return!!a(p,...g)}return!1},tl=function(a,p,h){if(!z[p]&&us(p)&&_n(T.tagNameCheck,p))return!1;if(ir&&!dt[p]&&!dt[gt(p)]){let g=C(a),y=pe(a);if(y&&g){let I=y.length;for(let P=I-1;P>=0;--P){let ue=a===h?_(y[P],!0):y[P];g.insertBefore(ue,K(a))}}}return Je(a),!0},ds=function(a,p,h,g){return a.length===0?p:p===h||p===g?Ne(p):p},vt=function(a,p){return a===p||C(a)!==null?!1:(ar&&hr(a),!0)},Er=function(a,p){if(Za(a),Ue(F.beforeSanitizeElements,a,null),vt(a,p))return!0;if(Tn(a))return Je(a),!0;let h=ae(A(a));if(V=ds(F.uponSanitizeElement,V,l,mn),Ue(F.uponSanitizeElement,a,{tagName:h,allowedTags:V}),vt(a,p))return!0;if(el(a,h))return Je(a),!0;if(z[h]||!(j.tagCheck instanceof Function&&j.tagCheck(h))&&!V[h]){let g=tl(a,h,p);return g===!1&&(Ue(F.afterSanitizeElements,a,null),vt(a,p))?!0:g}if(H(a)===de.element&&!Va(a)||(h==="noscript"||h==="noembed"||h==="noframes")&&be(Ql,a.innerHTML))return Je(a),!0;if(Xe&&a.nodeType===de.text){let g=bn(a.textContent);a.textContent!==g&&(Wt(t.removed,{element:a.cloneNode()}),a.textContent=g)}return Ue(F.afterSanitizeElements,a,null),vt(a,p)},ps=function(a,p,h){if(X[p]||as(p,a)||Xo&&(p==="id"||p==="name")&&(h in n||h in Ba))return!1;let g=u[p]||j.attributeCheck instanceof Function&&j.attributeCheck(p,a);return nr&&be(Ie,p)||Bo&&be(Dt,p)?!0:g?Jo[p]||be($t,Kt(h,fn,""))||(p==="src"||p==="xlink:href"||p==="href")&&a!=="script"&&Ps(h,"data:")===0&&Yo[a]||jo&&!be(Gt,Kt(h,fn,""))?!0:!h:us(a)&&_n(T.tagNameCheck,a)&&_n(T.attributeNameCheck,p,a)||p==="is"&&T.allowCustomizedBuiltInElements&&_n(T.tagNameCheck,h)},nl=D({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),us=function(a){return!nl[gt(a)]&&be(Tt,a)},rl=function(a,p,h,g){if(ee&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!h)switch(f.getAttributeType(a,p)){case"TrustedHTML":return je(g);case"TrustedScriptURL":return Ee(g)}return g},ol=function(a,p,h,g){try{return h?a.setAttributeNS(h,p,g):a.setAttribute(p,g),Tn(a)?(Je(a),!1):!0}catch{return At(p,a),!1}},fs=function(a,p){return at&&be(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,p)?!0:gt(a)==="attributename"&&Ms(p,"href")!==null},br=function(a,p){if(Ue(F.beforeSanitizeAttributes,a,null),vt(a,p))return;let h=a.attributes;if(!h||Tn(a))return;u=ds(F.uponSanitizeAttribute,u,S,hn);let g={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},y=h.length,I=ae(a.nodeName);for(;y--;){let P=h[y],ue=P.name,Fe=P.namespaceURI,Se=P.value,we=ae(ue),Rt=Se,Ae=ue==="value"?Rt:Pl(Rt),ms=!1;if(g.attrName=we,g.attrValue=Ae,g.keepAttr=!0,g.forceKeepAttr=void 0,Ue(F.uponSanitizeAttribute,a,g),Ae=g.attrValue,Wo&&(we==="id"||we==="name")&&Ps(Ae,Vo)!==0&&(At(ue,a,P),Ae=Vo+Ae,ms=!0),fs(ue,Ae)){At(ue,a,P);continue}if(!g.forceKeepAttr){if(!g.keepAttr){At(ue,a,P);continue}if(!rr&&be(js,Ae)){At(ue,a,P);continue}if(Xe&&(Ae=bn(Ae)),!ps(I,we,Ae)){At(ue,a,P);continue}Ae=rl(I,we,Fe,Ae),Ae!==Rt&&ol(a,ue,Fe,Ae)&&ms&&Ns(t.removed)}}Ue(F.afterSanitizeAttributes,a,null),vt(a,p)},zt=function(a){let p=null,h=kr(a);for(Ue(F.beforeSanitizeShadowDOM,a,null);p=h.nextNode();)if(Ue(F.uponSanitizeShadowNode,p,null),Er(p,a),br(p,a),Ze(p.content)&&zt(p.content),H(p)===de.element){let g=te(p);Ze(g)&&(Tr(g),zt(g))}Xe&&cs(a),Ue(F.afterSanitizeShadowDOM,a,null)},Tr=function(a){let p=[{node:a,shadow:null}];for(;p.length>0;){let h=p.pop();if(h.shadow){zt(h.shadow);continue}let g=h.node,y=H(g)===de.element,I=pe(g);if(I)for(let P=I.length-1;P>=0;--P)p.push({node:I[P],shadow:null});if(y){let P=me?me(g):null;if(typeof P=="string"&&ae(P)==="template"){let ue=g.content;Ze(ue)&&p.push({node:ue,shadow:null})}}if(y){let P=te(g);Ze(P)&&p.push({node:null,shadow:P},{node:P,shadow:null})}}};return t.sanitize=function(E){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,h=null,g=null,y=null;if(lr=!E,lr&&(E="<!-->"),typeof E!="string"&&!Ft(E)&&(E=$l(E),typeof E!="string"))throw qe("dirty is not a string, aborting");if(!t.isSupported)return E;or?(V=mn,u=hn):ur(a),(F.uponSanitizeElement.length>0||F.uponSanitizeAttribute.length>0)&&(V=Ne(V)),F.uponSanitizeAttribute.length>0&&(u=Ne(u)),t.removed=[];let I=ar&&typeof E!="string"&&Ft(E),P=[],ue=ct;if(I){Qa(E);let we=A(E);if(typeof we=="string"){let Rt=ae(we);if(!V[Rt]||z[Rt])throw fr(E),qe("root node is forbidden and cannot be sanitized in-place")}if(Tn(E))throw fr(E),qe("root node is clobbered and cannot be sanitized in-place");P=gr(E),ct=Ur()}else if(Ft(E))p=ls("<!---->"),h=p.ownerDocument.importNode(E,!0),h.nodeType===de.element&&h.nodeName==="BODY"||h.nodeName==="HTML"?p=h:p.appendChild(h),Tr(p);else{if(!_t&&!Xe&&!lt&&E.indexOf("<")===-1)return ee&&kn?je(E):E;if(p=ls(E),!p)return _t?null:kn?O:""}p&&sr&&Je(p.firstChild);let Fe=I?E:p;try{I&&Tr(E);let we=kr(Fe);for(;g=we.nextNode();)Er(g,Fe),br(g,Fe),Ze(g.content)&&zt(g.content);I&&qa(E,P)}catch(we){throw I&&(fr(E),is(E,P)),we}finally{ct=ue}if(I){if(is(E,P))throw qe("a node selected for removal could not be safely returned; refusing to sanitize in place");return Xe&&xr(E),E}if(_t){if(Xe&&xr(p),gn)for(y=ln.call(p.ownerDocument);p.firstChild;)y.appendChild(p.firstChild);else y=p;return(u.shadowroot||u.shadowrootmode)&&(y=bt.call(r,y,!0)),y}let Se=lt?p.outerHTML:p.innerHTML;return lt&&V["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&be(Jl,p.ownerDocument.doctype.name)&&(Se="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+Se),Xe&&(Se=bn(Se)),ee&&kn?je(Se):Se},t.setConfig=function(){let E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ur(E),or=!0,mn=V,hn=u},t.clearConfig=function(){wt=null,or=!1,mn=null,hn=null,ee=ie,O=""},t.isValidAttribute=function(E,a,p){wt||ur({});let h=ae(E),g=ae(a);return typeof p=="string"&&(fs(a,p)||!rr&&be(js,p))?!1:ps(h,g,p)},t.addHook=function(E,a){typeof a=="function"&&Re(F,E)&&Wt(F[E],a)},t.removeHook=function(E,a){if(Re(F,E)){if(a!==void 0){let p=Ll(F[E],a);return p===-1?void 0:Ml(F[E],p,1)[0]}return Ns(F[E])}},t.removeHooks=function(E){Re(F,E)&&(F[E]=[])},t.removeAllHooks=function(){F=Xs()},t}var Zs=Js();function qr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xt=qr();function si(e){xt=e}var Qt={exec:()=>null};function $(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(ye.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var rc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},oc=/^(?:[ \t]*(?:\n|$))+/,sc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ic=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,en=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ac=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Jr=/(?:[*+-]|\d{1,9}[.)])/,ii=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ai=$(ii).replace(/bull/g,Jr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lc=$(ii).replace(/bull/g,Jr).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Zr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,cc=/^[^\n]+/,Qr=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dc=$(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),pc=$(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Jr).getRegex(),Un="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",eo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,uc=$("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",eo).replace("tag",Un).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),li=$(Zr).replace("hr",en).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Un).getRegex(),fc=$(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",li).getRegex(),to={blockquote:fc,code:sc,def:dc,fences:ic,heading:ac,hr:en,html:uc,lheading:ai,list:pc,newline:oc,paragraph:li,table:Qt,text:cc},Qs=$("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",en).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Un).getRegex(),mc={...to,lheading:lc,table:Qs,paragraph:$(Zr).replace("hr",en).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Qs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Un).getRegex()},hc={...to,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",eo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(Zr).replace("hr",en).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ai).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ci=/^( {2,}|\\)\n(?!\s*$)/,xc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Dn=/[\p{P}\p{S}]/u,no=/[\s\p{P}\p{S}]/u,di=/[^\s\p{P}\p{S}]/u,Ec=$(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,no).getRegex(),pi=/(?!~)[\p{P}\p{S}]/u,bc=/(?!~)[\s\p{P}\p{S}]/u,Tc=/(?:[^\s\p{P}\p{S}]|~)/u,_c=$(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ui=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Sc=$(ui,"u").replace(/punct/g,Dn).getRegex(),yc=$(ui,"u").replace(/punct/g,pi).getRegex(),fi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wc=$(fi,"gu").replace(/notPunctSpace/g,di).replace(/punctSpace/g,no).replace(/punct/g,Dn).getRegex(),Ac=$(fi,"gu").replace(/notPunctSpace/g,Tc).replace(/punctSpace/g,bc).replace(/punct/g,pi).getRegex(),vc=$("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,di).replace(/punctSpace/g,no).replace(/punct/g,Dn).getRegex(),Rc=$(/\\(punct)/,"gu").replace(/punct/g,Dn).getRegex(),Oc=$(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ic=$(eo).replace("(?:-->|$)","-->").getRegex(),Cc=$("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ic).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Nn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Lc=$(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Nn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),mi=$(/^!?\[(label)\]\[(ref)\]/).replace("label",Nn).replace("ref",Qr).getRegex(),hi=$(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qr).getRegex(),Nc=$("reflink|nolink(?!\\()","g").replace("reflink",mi).replace("nolink",hi).getRegex(),ei=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ro={_backpedal:Qt,anyPunctuation:Rc,autolink:Oc,blockSkip:_c,br:ci,code:kc,del:Qt,emStrongLDelim:Sc,emStrongRDelimAst:wc,emStrongRDelimUnd:vc,escape:gc,link:Lc,nolink:hi,punctuation:Ec,reflink:mi,reflinkSearch:Nc,tag:Cc,text:xc,url:Qt},Mc={...ro,link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",Nn).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Nn).getRegex()},Vr={...ro,emStrongRDelimAst:Ac,emStrongLDelim:yc,url:$(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ei).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:$(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ei).getRegex()},Pc={...Vr,br:$(ci).replace("{2,}","*").getRegex(),text:$(Vr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ln={normal:to,gfm:mc,pedantic:hc},qt={normal:ro,gfm:Vr,breaks:Pc,pedantic:Mc},Uc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ti=e=>Uc[e];function ze(e,t){if(t){if(ye.escapeTest.test(e))return e.replace(ye.escapeReplace,ti)}else if(ye.escapeTestNoEncode.test(e))return e.replace(ye.escapeReplaceNoEncode,ti);return e}function ni(e){try{e=encodeURI(e).replace(ye.percentDecode,"%")}catch{return null}return e}function ri(e,t){let n=e.replace(ye.findPipe,(s,i,c)=>{let d=!1,m=i;for(;--m>=0&&c[m]==="\\";)d=!d;return d?"|":" |"}),r=n.split(ye.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ye.slashPipe,"|");return r}function Jt(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function Dc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function oi(e,t,n,r,o){let s=t.href,i=t.title||null,c=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:c,tokens:r.inlineTokens(c)};return r.state.inLink=!1,d}function Gc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[c]=i;return c.length>=o.length?s.slice(o.length):s}).join(`
`)}var Mn=class{options;rules;lexer;constructor(e){this.options=e||xt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Jt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Gc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Jt(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Jt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Jt(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,c=[],d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))c.push(n[d]),i=!0;else if(!i)c.push(n[d]);else break;n=n.slice(d);let m=c.join(`
`),f=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${m}`:m,o=o?`${o}
${f}`:f;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=b,n.length===0)break;let _=s.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let L=_,N=L.raw+`
`+n.join(`
`),K=this.blockquote(N);s[s.length-1]=K,r=r.substring(0,r.length-L.raw.length)+K.raw,o=o.substring(0,o.length-L.text.length)+K.text;break}else if(_?.type==="list"){let L=_,N=L.raw+`
`+n.join(`
`),K=this.list(N);s[s.length-1]=K,r=r.substring(0,r.length-_.raw.length)+K.raw,o=o.substring(0,o.length-L.raw.length)+K.raw,n=N.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let d=!1,m="",f="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;m=t[0],e=e.substring(m.length);let b=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),_=e.split(`
`,1)[0],L=!b.trim(),N=0;if(this.options.pedantic?(N=2,f=b.trimStart()):L?N=t[1].length+1:(N=t[2].search(this.rules.other.nonSpaceChar),N=N>4?1:N,f=b.slice(N),N+=t[1].length),L&&this.rules.other.blankLine.test(_)&&(m+=_+`
`,e=e.substring(_.length+1),d=!0),!d){let C=this.rules.other.nextBulletRegex(N),te=this.rules.other.hrRegex(N),xe=this.rules.other.fencesBeginRegex(N),le=this.rules.other.headingBeginRegex(N),me=this.rules.other.htmlBeginRegex(N);for(;e;){let he=e.split(`
`,1)[0],H;if(_=he,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),H=_):H=_.replace(this.rules.other.tabCharGlobal,"    "),xe.test(_)||le.test(_)||me.test(_)||C.test(_)||te.test(_))break;if(H.search(this.rules.other.nonSpaceChar)>=N||!_.trim())f+=`
`+H.slice(N);else{if(L||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||xe.test(b)||le.test(b)||te.test(b))break;f+=`
`+_}!L&&!_.trim()&&(L=!0),m+=he+`
`,e=e.substring(he.length+1),b=H.slice(N)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(i=!0));let K=null,pe;this.options.gfm&&(K=this.rules.other.listIsTask.exec(f),K&&(pe=K[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:m,task:!!K,checked:pe,loose:!1,text:f,tokens:[]}),o.raw+=m}let c=o.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let d=0;d<o.items.length;d++)if(this.lexer.state.top=!1,o.items[d].tokens=this.lexer.blockTokens(o.items[d].text,[]),!o.loose){let m=o.items[d].tokens.filter(b=>b.type==="space"),f=m.length>0&&m.some(b=>this.rules.other.anyLine.test(b.raw));o.loose=f}if(o.loose)for(let d=0;d<o.items.length;d++)o.items[d].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ri(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(ri(i,s.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:s.align[d]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=Jt(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=Dc(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),oi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return oi(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,c=o,d=0,m=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+o);(r=m.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){c+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){d+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+d);let f=[...r[0]][0].length,b=e.slice(0,o+r.index+f+i);if(Math.min(o,i)%2){let L=b.slice(1,-1);return{type:"em",raw:b,text:L,tokens:this.lexer.inlineTokens(L)}}let _=b.slice(2,-2);return{type:"strong",raw:b,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},De=class Kr{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xt,this.options.tokenizer=this.options.tokenizer||new Mn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ye,block:Ln.normal,inline:qt.normal};this.options.pedantic?(n.block=Ln.pedantic,n.inline=qt.pedantic):this.options.gfm&&(n.block=Ln.gfm,this.options.breaks?n.inline=qt.breaks:n.inline=qt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Ln,inline:qt}}static lex(t,n){return new Kr(n).lex(t)}static lexInline(t,n){return new Kr(n).inlineTokens(t)}lex(t){t=t.replace(ye.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ye.tabCharGlobal,"    ").replace(ye.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let s=t;if(this.options.extensions?.startBlock){let i=1/0,c=t.slice(1),d;this.options.extensions.startBlock.forEach(m=>{d=m.call({lexer:this},c),typeof d=="number"&&d>=0&&(i=Math.min(i,d))}),i<1/0&&i>=0&&(s=t.substring(0,i+1))}if(this.state.top&&(o=this.tokenizer.paragraph(s))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o),r=s.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+o.raw,i.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let d=Object.keys(this.tokens.links);if(d.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)d.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,c="";for(;t;){i||(c=""),i=!1;let d;if(this.options.extensions?.inline?.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);let f=n.at(-1);d.type==="text"&&f?.type==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,r,c)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if(this.options.extensions?.startInline){let f=1/0,b=t.slice(1),_;this.options.extensions.startInline.forEach(L=>{_=L.call({lexer:this},b),typeof _=="number"&&_>=0&&(f=Math.min(f,_))}),f<1/0&&f>=0&&(m=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(c=d.raw.slice(-1)),i=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Pn=class{options;parser;constructor(e){this.options=e||xt}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ye.notSpaceStart)?.[0],o=e.replace(ye.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ze(r)+'">'+(n?o:ze(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ze(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let c=e.items[i];r+=this.listitem(c)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
`+r+"</"+o+`>
`}listitem(e){let t="";if(e.task){let n=this.checkbox({checked:!!e.checked});e.loose?e.tokens[0]?.type==="paragraph"?(e.tokens[0].text=n+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=n+" "+ze(e.tokens[0].tokens[0].text),e.tokens[0].tokens[0].escaped=!0)):e.tokens.unshift({type:"text",raw:n+" ",text:n+" ",escaped:!0}):t+=n+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let s=e.rows[o];n="";for(let i=0;i<s.length;i++)n+=this.tablecell(s[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ze(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=ni(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+ze(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=ni(e);if(o===null)return ze(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${ze(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ze(e.text)}},oo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},Ge=class Yr{options;renderer;textRenderer;constructor(t){this.options=t||xt,this.options.renderer=this.options.renderer||new Pn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new oo}static parse(t,n){return new Yr(n).parse(t)}static parseInline(t,n){return new Yr(n).parseInline(t)}parse(t,n=!0){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let c=s,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(c.type)){r+=d||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);continue}case"hr":{r+=this.renderer.hr(i);continue}case"heading":{r+=this.renderer.heading(i);continue}case"code":{r+=this.renderer.code(i);continue}case"table":{r+=this.renderer.table(i);continue}case"blockquote":{r+=this.renderer.blockquote(i);continue}case"list":{r+=this.renderer.list(i);continue}case"html":{r+=this.renderer.html(i);continue}case"def":{r+=this.renderer.def(i);continue}case"paragraph":{r+=this.renderer.paragraph(i);continue}case"text":{let c=i,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?r+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):r+=d;continue}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let c=this.options.extensions.renderers[s.type].call({parser:this},s);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=c||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}},Zt=class{options;block;constructor(e){this.options=e||xt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?De.lex:De.lexInline}provideParser(){return this.block?Ge.parse:Ge.parseInline}},$c=class{defaults=qr();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ge;Renderer=Pn;TextRenderer=oo;Lexer=De;Tokenizer=Mn;Hooks=Zt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let c=o.renderer.apply(this,i);return c===!1&&(c=s.apply(this,i)),c}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Pn(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,c=n.renderer[i],d=o[i];o[i]=(...m)=>{let f=c.apply(o,m);return f===!1&&(f=d.apply(o,m)),f||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new Mn(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,c=n.tokenizer[i],d=o[i];o[i]=(...m)=>{let f=c.apply(o,m);return f===!1&&(f=d.apply(o,m)),f}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new Zt;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,c=n.hooks[i],d=o[i];Zt.passThroughHooks.has(s)?o[i]=m=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(s))return(async()=>{let b=await c.call(o,m);return d.call(o,b)})();let f=c.call(o,m);return d.call(o,f)}:o[i]=(...m)=>{if(this.defaults.async)return(async()=>{let b=await c.apply(o,m);return b===!1&&(b=await d.apply(o,m)),b})();let f=c.apply(o,m);return f===!1&&(f=d.apply(o,m)),f}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let c=[];return c.push(s.call(this,i)),o&&(c=c.concat(o.call(this,i))),c}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return De.lex(e,t??this.defaults)}parser(e,t){return Ge.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,c=await(o.hooks?await o.hooks.provideLexer():e?De.lex:De.lexInline)(i,o),d=o.hooks?await o.hooks.processAllTokens(c):c;o.walkTokens&&await Promise.all(this.walkTokens(d,o.walkTokens));let m=await(o.hooks?await o.hooks.provideParser():e?Ge.parse:Ge.parseInline)(d,o);return o.hooks?await o.hooks.postprocess(m):m})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?De.lex:De.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let c=(o.hooks?o.hooks.provideParser():e?Ge.parse:Ge.parseInline)(i,o);return o.hooks&&(c=o.hooks.postprocess(c)),c}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ze(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},kt=new $c;function B(e,t){return kt.parse(e,t)}B.options=B.setOptions=function(e){return kt.setOptions(e),B.defaults=kt.defaults,si(B.defaults),B};B.getDefaults=qr;B.defaults=xt;B.use=function(...e){return kt.use(...e),B.defaults=kt.defaults,si(B.defaults),B};B.walkTokens=function(e,t){return kt.walkTokens(e,t)};B.parseInline=kt.parseInline;B.Parser=Ge;B.parser=Ge.parse;B.Renderer=Pn;B.TextRenderer=oo;B.Lexer=De;B.lexer=De.lex;B.Tokenizer=Mn;B.Hooks=Zt;B.parse=B;var Uu=B.options,Du=B.setOptions,Gu=B.use,$u=B.walkTokens,Hu=B.parseInline;var Fu=Ge.parse,zu=De.lex;var U="openchamber.sdk";var Ei=/^[a-z][a-z0-9-]{0,39}$/;var gi=e=>Object(e)===e&&!Array.isArray(e),so=(e,t)=>Object.keys(e).every(n=>t.includes(n)),ki=e=>String(e)===e&&e.length>=1&&e.length<=60,xi=e=>String(e)===e&&e.length>=1&&e.length<=80,bi=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!gi(n)||!Ei.test(n.id)||!ki(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!so(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!so(n,["kind","id","label","value","options","disabled"])||!xi(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!gi(o)||!so(o,["value","label"])||!xi(o.value)||!ki(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var io=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Ti=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var _i=/^[A-Za-z0-9_-]{1,80}$/;var Si=["left","right","top","bottom"];var yi=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!yi(o,t+1,n))return!1;return!0},ao=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(ao);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(ao)}return String(e)===e||Number.isFinite(e)},lo=e=>{try{return String(e.id)!==e.id||!_i.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Si.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!yi(e.data)||!ao(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Ai=["file","directory","other","missing"],po=e=>!!(e&&"sessionId"in e),uo=e=>!!(e&&"sent"in e&&!("sessionId"in e));var vi=/^[0-9a-f]{7,64}$/i,fo=e=>vi.test(e),Gn=500,$n=32e3,Ri=16e3,Oi=128,Ii=200,Ci=2e3,Li=16e3,Ni=80,Mi=200,Pi=16e3;var Ui=2e3;var mo=2e4,Hn=1024,Fn=2e6;var zn=64e3,Bn=8e3,ho=4e3;var go=9e4;var Di=999,Gi=1e4,tn=500,$i=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Hi=["stopped","starting","ready","failed"],Hc=new Set($i),Fi=e=>Hc.has(e),zi=e=>e&&Fi(e)?e:"HOST_REJECTED",Ct=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Ct):Object(e)===e?Object.values(e).every(Ct):!1,Bi=e=>Ct(e)&&JSON.stringify(e).length<=Pi,wi=e=>e?.trim().slice(0,Mi)??"",Lt=e=>{let t=e.id.trim().slice(0,Oi),n=e.title.trim().slice(0,Ii),r=e.url.trim().slice(0,Ci),o=e.text?.trim().slice(0,Li),s=e.author?.trim().slice(0,Ni),i=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o&&(c.text=o),s&&(c.author=s),i==="pull"){let d=wi(e.branches?.head),m=wi(e.branches?.base);d&&m&&(c.branches={head:d,base:m})}return Bi(e.data)&&(c.data=e.data),c},ko=e=>{let t=Lt(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},xo=e=>{let t={text:e.text.trim().slice(0,Ri)};return e.send&&(t.send=!0),t},Eo=e=>e===null||!Number.isFinite(e)?null:Math.min(Di,Math.max(0,Math.round(e))),bo=e=>Number.isFinite(e)?Math.min(Gi,Math.max(0,Math.ceil(e))):0;var Nt=e=>e.length>0&&e.length<=Hn&&!e.includes("\0")&&!e.includes("\\");var jn=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Ui?!1:!e.split("/").some(n=>n==="."||n===".."),Fc=new Set(Hi),To=e=>!!(e&&"status"in e&&Fc.has(String(e.status))&&!("body"in e)),Xn=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),_o=e=>!!(e&&"content"in e&&String(e.content)===e.content),So=e=>!!(e&&"written"in e&&e.written===!0),yo=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),zc=new Set(Ai),wo=e=>!!(e&&"kind"in e&&"size"in e&&zc.has(String(e.kind))&&Number.isFinite(e.size)),Ao=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Bc=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),jc=e=>Object(e)===e?e:null,co=e=>String(e)===e&&e.length>0,Xc=e=>{if(!co(e.id))return null;if(e.ok===!0){let t={channel:U,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&co(e.error)?{channel:U,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:zi(co(e.code)?e.code:void 0)}:null},vo=e=>{let t=jc(e);return!t||t.channel!==U||t.v!==1?null:t.type==="result"?Xc(t):!Bc.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var ji=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,Wc=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",R=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},Xi=()=>Promise.reject(new R("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Wn=()=>Promise.reject(new R("BAD_PATH",`File path must be 1 to ${Hn} characters without NUL or backslash.`)),Vn=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new R("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},M=e=>(e.value+=1,`oc-${e.value}`),Lo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new R("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(l=>l===t.parent),r=e.requestTimeoutMs??mo,o=new Set,s=new Set,i=new Set,c=new Set,d=new Set,m=new Set,f=new Set,b=new Set,_=new Set,L=null,N=null,K=new Set,pe=new Set,C=null,te=null,xe=!1,le=new Map,me=new Map,he=new Map,H=!1,A={value:0},w=null,_e=null,ee=!1,O=!1,ie=null,Pt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,ge=l=>{t.parent.postMessage(l,"*")},ne=(l,u)=>{for(let S of l)try{S(u)}catch(T){console.error(T)}},je=l=>{if(!(l instanceof MessageEvent)||!n(l.source))return;let u=vo(l.data);if(!u)return;if(u.type==="workspace"){let T=me.get(u.payload.subscriptionId);T&&ne([T],u.payload.snapshot);return}if(u.type==="shells"){let T=he.get(u.payload.subscriptionId);T&&ne([T],u.payload.snapshot);return}if(u.type==="ready"){w=u.payload,_e=Pt(u.payload.session),ne(o,u.payload),ne(s,u.payload.directory),ne(i,u.payload.session),_e&&ne(c,_e),ne(d,u.payload.connection),ne(m,u.payload.settings),ne(f,u.payload.item);return}if(u.type==="directory"){w&&(w={...w,directory:u.payload.directory}),ne(s,u.payload.directory);return}if(u.type==="session"){w&&(w={...w,session:u.payload.session}),u.payload.session?_e?.sessionId!==u.payload.session.id&&(_e=Pt(u.payload.session)):_e=null,ne(i,u.payload.session);return}if(u.type==="session-lifecycle"){_e=u.payload,ne(c,u.payload);return}if(u.type==="connection"){w&&(w={...w,connection:u.payload.connection}),ne(d,u.payload.connection);return}if(u.type==="settings"){w&&(w={...w,settings:u.payload.settings}),ne(m,u.payload.settings);return}if(u.type==="item"){w&&(w={...w,item:u.payload.item}),ne(f,u.payload.item);return}if(u.type==="status-control-event"){ne(b,u.payload);return}if(u.type==="popover-closed"){ne(_,u.payload);return}if(u.type==="action"){let T=X=>{H||ge({channel:U,v:1,type:"action-result",id:u.id,payload:X})},z=N;if(!z){T({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>z(u.payload)).then(()=>T({ok:!0}),X=>{let j=(X instanceof Error?X.message:String(X)).trim();T({ok:!1,error:(j||"Action failed.").slice(0,tn)})});return}if(u.type==="file-open"){let T=u.payload;if(te&&Ti(te,T))return;te=T,ne(K,u.payload);return}if(u.type==="file-saved"){ne(pe,u.payload.version);return}if(u.type==="file-snapshot"){let T=j=>{H||ge({channel:U,v:1,type:"file-snapshot-result",id:u.id,payload:j})},z=j=>T({error:(j.trim()||"Could not read the edited file.").slice(0,tn)}),X=C;if(!X){z("This extension does not edit files.");return}Promise.resolve().then(()=>X(u.payload.purpose)).then(j=>{if(io(j)>2e7){z(`The file is over ${2e7} ${"bytes"in j?"bytes":"characters"}.`);return}if(j.version.length>256){z(`The snapshot version is over ${256} characters.`);return}T({snapshot:"bytes"in j?{bytes:j.bytes,version:j.version}:{content:j.content,version:j.version}})},j=>z(j instanceof Error?j.message:String(j)));return}if(u.type==="resolve"){let T=X=>{ge({channel:U,v:1,type:"resolve-result",id:u.id,payload:X})},z=L;if(!z){T({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>z(u.payload)).then(X=>T({item:X?Lt(X):null}),X=>{let j=(X instanceof Error?X.message:String(X)).trim();T({error:(j||"Command failed.").slice(0,tn)})});return}let S=le.get(u.id);if(S){if(clearTimeout(S.timer),le.delete(u.id),u.ok){S.resolve(u.payload);return}S.reject(new R(u.code,u.error))}};t.addEventListener("message",je),ge({channel:U,v:1,type:"hello"});let Ee=(l,u=r)=>H||t.parent===t?Promise.reject(new R("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((S,T)=>{let z=setTimeout(()=>{le.delete(l.id),T(new R("HOST_TIMEOUT","Host did not answer in time."))},u);le.set(l.id,{resolve:S,reject:T,timer:z}),ge(l)}),re=l=>Ee(l).then(()=>{}),Y={channel:U,v:1},it=l=>{!H&&t.parent!==t&&ge(l)},Ut=()=>it({...Y,type:"file-save"}),ln=l=>{!ji(l)||!Wc(l)||(l.preventDefault(),Ut())},cn=l=>{!ji(l)||l.key!=="Escape"||w?.surface!=="popover"||!w.popover||(l.preventDefault(),$t(w.popover.id,"escape").catch(()=>{}))},bt=()=>{let l=w?.surface==="popover"?w.popover:void 0;if(!l)return;let u=ee||O;ie!==u&&(ie=u,V(l.id,u).catch(()=>{}))},F=()=>{w?.surface!=="popover"||ee||(ee=!0,bt())},dn=l=>{w?.surface!=="popover"||l.relatedTarget!==null||!ee||(ee=!1,bt())},pn=()=>{w?.surface!=="popover"||O||(O=!0,bt())},un=()=>{w?.surface!=="popover"||!O||(O=!1,bt())},Ie=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new R("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Dt=async l=>{l.kind!=="projects"&&Ie(l.projectId);let u=await Ee({...Y,type:"workspace-read",id:M(A),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new R("HOST_REJECTED","Host did not return workspace data.");return u},Gt=async(l,u)=>{l.kind!=="projects"&&Ie(l.projectId);let S=M(A);me.set(S,u);try{await re({...Y,type:"workspace-subscribe",id:M(A),payload:{subscriptionId:S,query:l}})}catch(T){throw me.delete(S),H||ge({...Y,type:"workspace-unsubscribe",id:M(A),payload:{subscriptionId:S}}),T}return()=>{!me.delete(S)||H||ge({...Y,type:"workspace-unsubscribe",id:M(A),payload:{subscriptionId:S}})}},fn=async(l,u)=>{l.kind==="session"&&Ie(l.sessionId),l.kind==="project"&&Ie(l.projectId);let S=M(A);he.set(S,u);try{await re({...Y,type:"shells-subscribe",id:M(A),payload:{subscriptionId:S,scope:l}})}catch(T){throw he.delete(S),H||ge({...Y,type:"shells-unsubscribe",id:M(A),payload:{subscriptionId:S}}),T}return()=>{!he.delete(S)||H||ge({...Y,type:"shells-unsubscribe",id:M(A),payload:{subscriptionId:S}})}},Tt=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new R("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Ct(l.value))throw new R("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new R("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&w?.features?.deviceStorage!==!0)throw new R("UNSUPPORTED","This host does not support device storage.");let u=await Ee({...Y,type:"storage",id:M(A),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new R("HOST_REJECTED","Host did not return storage data.");return u},$t=(l,u)=>w?.features?.popovers!==!0&&!(w?.surface==="popover"&&w.popover?.id===l)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):re({...Y,type:"popover-close",id:M(A),payload:u?{id:l,reason:u}:{id:l}}),V=(l,u)=>w?.features?.popovers!==!0&&!(w?.surface==="popover"&&w.popover?.id===l)?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):re({...Y,type:"popover-anchor",id:M(A),payload:{id:l,active:u}});return t.addEventListener("keydown",cn,!0),t.addEventListener("pointerover",F),t.addEventListener("pointermove",F),t.addEventListener("pointerout",dn),t.addEventListener("focus",pn),t.addEventListener("blur",un),{onAction:l=>(N=l,()=>{N===l&&(N=null)}),listProjects:async()=>{let l=await Dt({kind:"projects"});if(l.kind!=="projects")throw new R("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Dt({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new R("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Dt({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new R("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Gt({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Gt({kind:"worktrees",projectId:l},S=>{S.kind==="worktrees"&&u(S)}),onSessions:(l,u)=>Gt({kind:"sessions",projectId:l},S=>{S.kind==="sessions"&&u(S)}),onRunningShells:(l,u)=>fn(l,u),readShellOutput:async(l,u)=>{Ie(l,128);let S=u?.cursor;if(S!==void 0&&(!Number.isInteger(S)||S<0))throw new R("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let T=u?.tailBytes;if(T!==void 0&&(!Number.isInteger(T)||T<1||T>65536))throw new R("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let X=await Ee({...Y,type:"shell-output",id:M(A),payload:{shellId:l,cursor:S,tailBytes:T}});if(!X||typeof X.output!="string"||!Number.isFinite(X.cursor))throw new R("HOST_REJECTED","Host did not return shell output.");return X},stopShell:async l=>{if(Ie(l,128),(await Ee({...Y,type:"shell-stop",id:M(A),payload:{shellId:l}}))?.stopped!==!0)throw new R("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Ie(l),await re({...Y,type:"open-session",id:M(A),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let S=Vn(u),T={op:"get",key:l};S&&(T.scope=S);let z=await Tt(T);return z.op==="get"&&z.found?z.value:void 0},set:async(l,u,S)=>{let T=Vn(S),z={op:"set",key:l,value:u};T&&(z.scope=T),await Tt(z)},delete:async(l,u)=>{let S=Vn(u),T={op:"delete",key:l};S&&(T.scope=S),await Tt(T)},keys:async l=>{let u=Vn(l),S={op:"keys"};u&&(S.scope=u);let T=await Tt(S);if(T.op!=="keys")throw new R("HOST_REJECTED","Expected storage keys.");return T.keys}},onReady:l=>(o.add(l),w&&l(w),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),w&&l(w.directory),()=>{s.delete(l)}),onSession:l=>(i.add(l),w&&l(w.session),()=>{i.delete(l)}),onSessionLifecycle:l=>(c.add(l),_e&&l(_e),()=>{c.delete(l)}),onConnection:l=>(d.add(l),w&&l(w.connection),()=>{d.delete(l)}),onSettings:l=>(m.add(l),w&&l(w.settings),()=>{m.delete(l)}),onItem:l=>(f.add(l),w&&l(w.item),()=>{f.delete(l)}),onStatusControl:l=>(b.add(l),()=>{b.delete(l)}),onPopoverClosed:l=>(_.add(l),()=>{_.delete(l)}),setStatusControls:l=>w?.features?.statusControls!==!0?Promise.reject(new R("UNSUPPORTED","This host does not support status controls.")):bi(l)?re({...Y,type:"status-controls",id:M(A),payload:{controls:l}}):Promise.reject(new R("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>w?.features?.popovers!==!0?Promise.reject(new R("UNSUPPORTED","This host does not support popovers.")):lo(l)?re({...Y,type:"popover-open",id:M(A),payload:l}):Promise.reject(new R("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:$t,setPopoverAnchorActive:V,onResolve:l=>(L=l,()=>{L===l&&(L=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>Gn?Promise.reject(new R("HOST_REJECTED",`Toast message must contain 1 to ${Gn} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>$n)?Promise.reject(new R("HOST_REJECTED",`Toast copy text must contain 1 to ${$n} characters.`)):re({channel:U,v:1,type:"toast",id:M(A),payload:{...l,message:u}})},openUrl:l=>re({channel:U,v:1,type:"open-url",id:M(A),payload:{url:l}}),openCommit:l=>fo(l)?re({channel:U,v:1,type:"open-commit",id:M(A),payload:{sha:l}}):Promise.reject(new R("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>re({channel:U,v:1,type:"open-surface",id:M(A),payload:{surfaceId:l}}),writeClipboard:l=>re({channel:U,v:1,type:"clipboard-write",id:M(A),payload:{text:l}}),compose:l=>re({channel:U,v:1,type:"compose",id:M(A),payload:l}),attach:l=>re({channel:U,v:1,type:"attach",id:M(A),payload:Lt(l)}),startSession:async l=>{l.projectId!==void 0&&Ie(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Ie(u.directory):(u.name!==void 0&&Ie(u.name,200),u.baseBranch!==void 0&&Ie(u.baseBranch,200)));let S=await Ee({channel:U,v:1,type:"start-session",id:M(A),payload:ko(l)},e.requestTimeoutMs??18e4);if(!po(S))throw new R("HOST_REJECTED","Host did not return a session.");return S},prompt:l=>Ee({channel:U,v:1,type:"prompt",id:M(A),payload:xo(l)}).then(u=>{if(!uo(u))throw new R("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>re({channel:U,v:1,type:"session-link",id:M(A),payload:Lt(l)}),close:()=>re({channel:U,v:1,type:"close",id:M(A)}),oauthStart:()=>re({channel:U,v:1,type:"oauth-start",id:M(A)}),oauthDisconnect:()=>re({channel:U,v:1,type:"oauth-disconnect",id:M(A)}),request:l=>(jn(l.path)?Ee({channel:U,v:1,type:"request",id:M(A),payload:l}):Xi()).then(u=>{if(!Xn(u))throw new R("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(jn(l.path)?Ee({channel:U,v:1,type:"service-request",id:M(A),payload:l}):Xi()).then(u=>{if(!Xn(u))throw new R("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>Ee({channel:U,v:1,type:"service-status",id:M(A)}).then(l=>{if(!To(l))throw new R("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(Nt(l)?Ee({channel:U,v:1,type:"file-read",id:M(A),payload:{path:l}}):Wn()).then(u=>{if(!_o(u))throw new R("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>Nt(l)?u.length>Fn?Promise.reject(new R("FILE_TOO_LARGE",`Content is over ${Fn} characters.`)):Ee({channel:U,v:1,type:"file-write",id:M(A),payload:{path:l,content:u}}).then(S=>{if(!So(S))throw new R("HOST_REJECTED","Host did not confirm the write.");return S}):Wn(),listDir:l=>(Nt(l)?Ee({channel:U,v:1,type:"file-list",id:M(A),payload:{path:l}}):Wn()).then(u=>{if(!yo(u))throw new R("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(Nt(l)?Ee({channel:U,v:1,type:"file-stat",id:M(A),payload:{path:l}}):Wn()).then(u=>{if(!wo(u))throw new R("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),S=l.system?.trim();if(u.length===0||u.length>zn)return Promise.reject(new R("HOST_REJECTED",`Prompt must be 1 to ${zn} characters.`));if(S!==void 0&&(S.length===0||S.length>Bn))return Promise.reject(new R("HOST_REJECTED",`System prompt must be 1 to ${Bn} characters.`));let T=l.maxOutputTokens===void 0?void 0:Math.min(ho,Math.max(1,Math.floor(l.maxOutputTokens)));if(T!==void 0&&!Number.isFinite(T))return Promise.reject(new R("HOST_REJECTED","maxOutputTokens must be a number."));let z={prompt:u};return S!==void 0&&(z.system=S),T!==void 0&&(z.maxOutputTokens=T),Ee({channel:U,v:1,type:"generate",id:M(A),payload:z},e.requestTimeoutMs??go).then(X=>{if(!Ao(X))throw new R("HOST_REJECTED","Host did not return generated text.");return X})},setBadge:l=>re({channel:U,v:1,type:"badge",id:M(A),payload:{count:Eo(l)}}),setHeight:l=>re({channel:U,v:1,type:"resize",id:M(A),payload:{height:bo(l)}}),onFileOpen:l=>(K.add(l),xe||(xe=!0,t.addEventListener("keydown",ln,!0)),te&&l(te),()=>{K.delete(l)}),onFileSnapshot:l=>(C=l,()=>{C===l&&(C=null)}),onFileSaved:l=>(pe.add(l),()=>{pe.delete(l)}),reportFileChange:l=>it({...Y,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:Ut,reportFileUnsupported:()=>it({...Y,type:"file-unsupported"}),dispose:()=>{for(let l of me.keys())ge({...Y,type:"workspace-unsubscribe",id:M(A),payload:{subscriptionId:l}});me.clear();for(let l of he.keys())ge({...Y,type:"shells-unsubscribe",id:M(A),payload:{subscriptionId:l}});he.clear(),H=!0,L=null,N=null,C=null,K.clear(),pe.clear(),xe&&t.removeEventListener("keydown",ln,!0),t.removeEventListener("message",je),t.removeEventListener("keydown",cn,!0),t.removeEventListener("pointerover",F),t.removeEventListener("pointermove",F),t.removeEventListener("pointerout",dn),t.removeEventListener("focus",pn),t.removeEventListener("blur",un);for(let l of le.values())clearTimeout(l.timer),l.reject(new R("HOST_UNAVAILABLE","Host client was disposed."));le.clear(),o.clear(),s.clear(),i.clear(),c.clear(),d.clear(),m.clear(),f.clear(),b.clear(),_.clear()}}};var Ki=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var hf=new Set(Ki);var Yi=["none","agent","user"];var kf=new Set(Yi);var W=Lo();function x(e,t={},...n){let r=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(r.dataset,s);continue}if(o==="style"){r.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){r.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){r.className=s;continue}r[o]=s}for(let o of n)o!=null&&r.append(typeof o=="string"?document.createTextNode(o):o);return r}function No(e){e.replaceChildren()}function Mo(e){let t=x("div",{className:"md"});if(!e||e.trim().length===0)return t.append(x("p",{className:"muted"},"No description.")),t;let n=B.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=Zs.sanitize(n,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(r=>{let o=r.getAttribute("href")??"";r.setAttribute("rel","noreferrer noopener"),r.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&W.openUrl(o)})}),t.querySelectorAll("img").forEach(r=>{r.setAttribute("loading","lazy")}),t}function qi(e,t=320){let n=e??"",r=Mo(e);if(n.length<=t)return r;r.classList.add("md-collapsed");let o=x("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=r.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),x("div",{className:"md-wrap"},r,o)}function Ji(e){if(!e||typeof e!="object")return{};let t={};for(let[n,r]of Object.entries(e))!r||typeof r!="object"||typeof r.taskId!="string"||(t[n]={taskId:r.taskId,ticketId:typeof r.ticketId=="string"?r.ticketId:"",title:typeof r.title=="string"?r.title:"",at:typeof r.at=="number"?r.at:0,posted:Array.isArray(r.posted)?r.posted.filter(o=>typeof o=="string"):[]});return t}function Zi(e,t=50){let n=Object.entries(e).sort((r,o)=>o[1].at-r[1].at).slice(0,Math.max(0,t));return Object.fromEntries(n)}var Qi="preferences",ea={workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1};function ta(e){if(typeof e!="object"||e===null)return{...ea};let t=e,n=t.priorityFilter,r=n==="any"||!!n&&n in Xt;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,groupBy:t.groupBy==="flat"?"flat":"column",priorityFilter:r?n:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0}}async function nn(){try{return ta(await W.storage.get(Qi))}catch{return{...ea}}}async function $e(e){let t=ta({...await nn(),...e});try{await W.storage.set(Qi,t)}catch{}return t}var Po="session-links";async function Kn(){try{return Ji(await W.storage.get(Po))}catch{return{}}}async function na(e,t){try{let n=await Kn();n[e]={...t,at:Date.now(),posted:[]};let r=Zi(n);await W.storage.set(Po,JSON.parse(JSON.stringify(r)))}catch{}}async function ra(e,t){try{let n=await Kn(),r=n[e];if(!r)return;r.posted.includes(t)||r.posted.push(t),await W.storage.set(Po,JSON.parse(JSON.stringify(n)))}catch{}}var Vc=864e5;function Uo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function Do(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function ia(e,t,n){return`${vs}/dashboard/workspace/${e}/project/${t}/task/${n}`}var Kc={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function Be(e){return Kc[e]??e}function Et(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=Math.round((qn(n).getTime()-qn(t).getTime())/Vc);return r===0?"Due today":r===1?"Due tomorrow":r===-1?"Due yesterday":r<0?`Overdue ${Math.abs(r)}d`:r<=7?`Due in ${r}d`:`Due ${n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function Jn(e,t=new Date){if(!e)return!1;let n=new Date(e);return Number.isNaN(n.getTime())?!1:qn(n).getTime()<qn(t).getTime()}function qn(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function aa(e,t){let n=[`**${t.ticketId}** ${e.title}`],r=[];t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${Be(e.priority)}`),e.assigneeName&&r.push(`Assignee: ${e.assigneeName}`);let o=Et(e.dueDate);o&&r.push(o),r.length>0&&n.push(r.join(" \xB7 ")),t.url&&n.push(t.url);let s=e.description?.trim();return s&&n.push("",s),n.join(`
`)}var Yc=6e3;function qc(e){let t=e.user?.name??"Unknown",n=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${n}`}function la(e,t){let n=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&n.push(`Project: ${t.projectName}`),t.columnName&&n.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&n.push(`Priority: ${Be(e.priority)}`),e.dueDate&&n.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&n.push(t.url);let r=e.description?.trim();r&&n.push("",r);let o=t.comments??[];if(o.length>0){n.push("","Comments:");let s=0;for(let i of o){let c=qc(i);if(s+c.length>Yc)break;s+=c.length,n.push(c)}}return n.join(`
`)}function ca(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Jc={started:"OpenChamber session started",completed:"OpenChamber session completed",failed:"OpenChamber session failed"};function da(e,t,n,r){let o=Jc[e],s=t.trim()||"Untitled session";if(n){let i=n.replace(/\/+$/,""),c=r?`${i}/?session=${encodeURIComponent(r)}`:i;return`[${o}](${c}) \u2014 ${s}`}return`${o} \u2014 ${s}`}var oa=6e4,sa=36e5,Yn=864e5;function Zn(e,t=Date.now()){if(!e)return null;let n=Date.parse(e);if(!Number.isFinite(n))return null;let r=Math.max(0,t-n);return r<oa?"just now":r<sa?`${Math.floor(r/oa)}m`:r<Yn?`${Math.floor(r/sa)}h`:r<7*Yn?`${Math.floor(r/Yn)}d`:`${Math.floor(r/(7*Yn))}w`}function pa(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function rn(e){return ia(e.workspaceId,e.task.projectId,e.task.id)}function Zc(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function ua(e){return{providerId:Rs,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:rn(e),text:la(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:rn(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:Zc(e)}}async function Qc(e){await W.attach(ua(e))}async function ed(e,t={}){let n=t.worktree?ca(e.ticketId):void 0,r=await W.startSession({...ua(e),navigation:"preserve",...n?{worktree:{kind:"new",name:n}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return r.sessionId===null?{sessionId:null,sent:r.sent,failure:r.failure,branch:r.worktree.branch}:{sessionId:r.sessionId,sent:r.sent,branch:r.worktree?.branch??n}}async function fa(e){await Qc(e),await W.toast({kind:"success",message:`${e.ticketId} attached to the chat.`})}async function ma(e,t={}){let n=await ed(e,t);if(n.sessionId===null){let r=n.branch?` The worktree ${n.branch} was kept.`:"",o=n.failure?` (${n.failure})`:"";return await W.toast({kind:"error",message:`No session was created${o}.${r} Check the session list before retrying.`,dismiss:!0}),!1}return await na(n.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await W.toast({kind:"success",message:t.worktree&&n.branch?`Session started on ${n.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function ha(e){await W.compose({mode:"append",text:`
${aa(e.task,{ticketId:e.ticketId,...e.columnName?{columnName:e.columnName}:{},...rn(e)?{url:rn(e)}:{}})}
`})}async function ga(e){await W.openUrl(rn(e))}async function on(e,t){let n=t instanceof Error?`${e} failed: ${t.message}`:`${e} failed.`;await W.toast({kind:"error",message:n.slice(0,400),dismiss:!0})}function ka(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function Qn(e){return x("span",{className:"label-chip"},x("span",{className:"label-dot",style:`background:${e.color}`}),e.name)}function xa(e,t=2){if(e.length===0)return null;let n=e.slice(0,t),r=x("span",{className:"label-chips"});for(let o of n)r.append(Qn(o));return e.length>n.length&&r.append(x("span",{className:"label-more"},`+${e.length-n.length}`)),r}function Ea(e){if(e.length===0)return null;let t=x("div",{className:"label-chips"});for(let n of e)t.append(Qn(n));return t}function ba(e){return x("span",{className:"person"},x("span",{className:"person-avatar"},ka(e)),x("span",{className:"person-name"},e))}function Ta(e){return x("span",{className:"person-avatar"},ka(e))}function Go(e,t,n,r={}){let o=ve(e,{label:t,variant:r.variant??"secondary",size:"sm",onClick:()=>{o.update({loading:!0}),n().catch(s=>on(t,s)).finally(()=>o.update({loading:!1}))}});r.block&&e.classList.add("block")}function td(e,t){let n=x("div",{className:"detail-header"}),r=x("div");n.append(r),ve(r,{label:"Back",variant:"ghost",size:"sm",onClick:t});let o=x("div",{style:"margin-left:auto;"});return n.append(o),ve(o,{label:"Open in Kaneo",variant:"ghost",size:"sm",onClick:()=>void ga(e)}),n}function nd(e){return x("div",{className:"detail-heading"},x("div",{className:"detail-id"},e.ticketId),x("h2",{className:"detail-title"},e.task.title))}function rd(e,t,n){let r=x("div",{className:"detail-row"});if(t.length>0){let o=x("div",{className:"detail-status"});r.append(o),jt(o,{value:e.task.status,options:t.map(s=>({id:s.id,label:s.name})),onChange:n.onMove})}if(n.canClose){let o=x("div");r.append(o),ve(o,{label:"Close issue",variant:"outline",size:"sm",onClick:n.onClose})}return r}function od(e){let{task:t}=e,n=x("dl",{className:"meta-grid"}),r=[];e.projectName&&r.push(["Project",e.projectName]),t.priority!=="no-priority"&&r.push(["Priority",Be(t.priority)]),r.push(["Assignee",t.assigneeName??"Unassigned"]);let o=Et(t.dueDate);o&&r.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&r.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&r.push(["Description","Too large to inline; open the task for the full text."]);for(let[c,d]of r)n.append(x("dt",{},c),x("dd",{},d));let i=Ea(t.labels??[]);if(i){let c=x("dd",{className:"meta-labels"});c.append(i),n.append(x("dt",{},"Labels"),c)}return n}function sd(e,t=320){return x("div",{className:"detail-section"},qi(e.task.description,t))}function id(e){let t=x("div",{className:"detail-section"});if(t.append(x("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(x("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(x("p",{className:"muted"},"Loading comments\u2026")),t;let n=e.items??[];if(n.length===0)return t.append(x("p",{className:"muted"},"No comments yet.")),t;let r=x("div",{className:"comments"});return n.forEach((o,s)=>{let i=s===n.length-1,c=Zn(o.createdAt),d=x("div",{className:"comment"});i||d.append(x("div",{className:"comment-line"})),d.append(Ta(o.user?.name));let m=x("div",{className:"comment-card"});m.append(x("div",{className:"comment-head"},x("span",{className:"comment-author"},o.user?.name??"Unknown"),c?x("span",{},c):null),x("div",{className:"comment-body"},Mo(o.content))),d.append(m),r.append(d)}),t.append(r),t}function ad(e,t){let n=x("div",{className:"detail-body"});return n.append(nd(e)),(t.columns.length>0||t.canCloseIssue)&&n.append(rd(e,t.columns,{onMove:t.onMove,onClose:t.onCloseIssue,canClose:t.canCloseIssue})),n.append(od(e)),n.append(sd(e,1200)),n.append(id(t.comments)),n}function ld(e,t){let n=x("div",{className:"detail-footer"}),r=x("div");n.append(r),Lr(r,{label:"Create in a new worktree",checked:t.worktree,onChange:t.onWorktreeChange});let o=x("div",{className:"detail-start block"});if(n.append(o),Go(o,"Start session",()=>ma(e,{worktree:t.worktree}).then(()=>{}),{variant:"default",block:!0}),t.showChatActions!==!1){let s=x("div",{className:"toolbar detail-secondary"});n.append(s),Go(s,"Attach",()=>fa(e)),Go(s,"Send to chat",()=>ha(e))}return n}function _a(e,t){let n=x("div",{className:"detail"});return n.append(td(e,t.onBack)),n.append(ad(e,t)),n.append(ld(e,t)),n}var cd={started:"started",completed:"completed",failure:"failed"},Sa=!1;function ya(e,t){Sa||(Sa=!0,W.onSessionLifecycle(async n=>{let r=cd[n.phase];if(!r)return;let s=(await Kn())[n.sessionId];if(!(!s||s.posted.includes(r))){await ra(n.sessionId,r);try{await e.createComment(s.taskId,da(r,s.title,t,n.sessionId))}catch{}}}))}var dd={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function pd(e){let t=dd[e],n={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 16 16"),r.setAttribute("width","16"),r.setAttribute("height","16"),r.setAttribute("aria-hidden","true"),r.innerHTML=n[e],r.classList.add("row-glyph"),r}function $o(e){let{task:t,ticketId:n,column:r,selected:o,onActivate:s}=e,i=Et(t.dueDate),c=Jn(t.dueDate),d=Zn(t.createdAt),m=x("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:s}),f=x("div",{className:"row-body"});f.append(x("div",{className:"row-title"},t.title));let b=x("div",{className:"row-meta"});b.append(x("span",{className:"task-key"},n)),t.assigneeName&&b.append(ba(t.assigneeName)),d&&b.append(x("span",{},d));let _=t.subtaskCounts;_&&_.total>0&&b.append(x("span",{className:"tabular"},`${_.completed}/${_.total}`)),t.priority!=="no-priority"&&b.append(x("span",{},Be(t.priority))),i&&b.append(x("span",{className:c?"overdue":""},i));let L=xa(t.labels??[]);return L&&b.append(L),f.append(b),m.append(pd(pa(r)),f),m.title=`${n} \xB7 ${r.name}`,m}var ud=`
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
`;function wa(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=ud,e.append(n)}var fd='<path d="M38.9 510.4C15 515.5 0 507.7 0 498.4V314.3c0-1 0-2 .1-3V127.7c.1-7.5 1.5-12.8 19-16.5l81.8-16.5c23.9-5.1 38.9 2.7 38.9 12v370.8c-.1 7.5-1.5 12.8-19 16.5zm186.2-46.6c-23.9 5.1-38.9-2.7-38.9-12v-184c0-1 0-2 .1-3V81.1c.1-7.5 1.5-12.8 19-16.5l81.8-16.5C311 43 326 50.8 326 60.1v370.8c-.1 7.5-1.5 12.8-19 16.5zm248-462.2C497-3.5 512 4.3 512 13.6v63.1L407.6 212.4 512 342v42.3c-.1 7.5-1.5 12.8-19 16.5l-81.8 16.5c-23.9 5.1-38.9-2.7-38.9-12V221.2c0-1 0-2 .1-3V34.6c.1-7.5 1.5-12.8 19-16.5z"/>';function md(e=16){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 512 512"),t.setAttribute("width",String(e)),t.setAttribute("height",String(e)),t.setAttribute("aria-hidden","true"),t.innerHTML=fd,t.classList.add("kaneo-mark"),t}function Aa(e){return x("span",{className:"kaneo-wordmark"},md(16),x("span",{},e))}var sn=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function va(e,t,n={}){if(!n.force){let b=await gd();if(b&&Date.now()-b.at<hd)return b.context}let[r,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new sn;let s=await nn(),i=t?o.find(b=>b.slug===t):void 0,c=(s.workspaceId&&o.find(b=>b.id===s.workspaceId)?.id)??i?.id??o[0].id;c!==s.workspaceId&&await $e({workspaceId:c,projectId:null});let d=[],m=null;try{d=await e.listProjects(c)}catch(b){m=b instanceof Error?b:new Error(String(b))}let f={user:r,workspaces:o,workspaceId:c,projects:d,projectsError:m};return await kd(f),f}var Ra="bootstrap-cache",hd=6e4;async function gd(){try{let e=await W.storage.get(Ra);return e&&typeof e.at=="number"&&e.context?e:null}catch{return null}}async function kd(e){let t=JSON.parse(JSON.stringify({at:Date.now(),context:e}));try{await W.storage.set(Ra,t)}catch{}}function Oa(e,t,n){if(e.length===0)return null;let r=e.find(i=>i.id===t);if(r)return r;let o=n?.toLowerCase();return(o?e.find(i=>i.slug.toLowerCase()===o):void 0)??e[0]}function Ia(e){let t=e?.workspace?.trim(),n=e?.project?.trim(),r=e?.["openchamber-url"]?.trim();return{workspaceSlug:t||void 0,projectSlug:n||void 0,openchamberUrl:r||void 0}}var ot=document.querySelector("#root");if(!ot)throw new Error("Kaneo board is missing its #root element.");var st=Is(e=>W.request(e)),k={ready:null,connected:!1,context:null,project:null,board:null,truncated:!1,labels:[],preferences:{workspaceId:null,projectId:null,openTaskId:null,groupBy:"column",priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1},search:"",detailId:null,loading:!0,error:null,mineDetail:null,comments:{},listWidth:null,mineEntries:[]},er=0,Ca=!1;function Ho(e){return e instanceof ht?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function an(e){return Uo(k.project?.slug??"",e.number)}function La(e){return k.board?.columns.find(t=>t.id===e.status)}function Na(e){return{task:e,ticketId:an(e),workspaceId:k.context?.workspaceId??"",projectName:k.project?.name,columnName:La(e)?.name??Do(e.status),comments:k.comments[e.id]?.items}}function Ma(e){let{priorityFilter:t,labelFilter:n,statusFilter:r,assigneeFilter:o}=k.preferences;if(t!=="any"&&Xt[e.priority]<Xt[t]||n&&!(e.labels??[]).some(i=>i.id===n)||r&&e.status!==r||o==="me"&&e.assigneeId!==k.context?.user?.id)return!1;let s=k.search.trim().toLowerCase();return s?e.title.toLowerCase().includes(s)||an(e).toLowerCase().includes(s)||(e.description??"").toLowerCase().includes(s):!0}function zo(e){if(!e||!k.board)return null;for(let t of k.board.columns){let n=t.tasks.find(r=>r.id===e);if(n)return n}return null}async function Mt(){let e=++er;k.loading=!0,se();try{let{workspaceSlug:t,projectSlug:n}=Ia(k.ready?.settings),r=await va(st,t);if(e!==er)return;k.context=r,k.preferences=await nn(),k.project=Oa(r.projects,k.preferences.projectId,n),k.project&&k.project.id!==k.preferences.projectId&&(k.preferences=await $e({projectId:k.project.id})),k.loading=!1,k.error=r.projectsError?Ho(r.projectsError):null,se();let[o,s,i]=await Promise.allSettled([k.project?st.getBoard(k.project.id):Promise.resolve(null),r.workspaceId?st.listLabels(r.workspaceId):Promise.resolve([]),r.workspaceId?st.listAssignedTasks(r.workspaceId):Promise.resolve({tasks:[],total:0})]);if(o.status==="rejected"?(k.error=Ho(o.reason),k.board=null):o.value&&(k.board=o.value.board,k.truncated=o.value.truncated),s.status==="fulfilled"&&(k.labels=xd(s.value)),i.status==="fulfilled"&&(k.mineEntries=i.value.tasks.map(c=>({id:c.id,ticketId:Uo(c.projectSlug,c.number),title:c.title,projectName:c.projectName,statusName:c.statusName,priority:c.priority,dueDate:c.dueDate}))),e!==er)return;se()}catch(t){if(e!==er)return;k.loading=!1,k.error=t instanceof sn?t.message:`Could not reach Kaneo. ${Ho(t)}`,se()}}function xd(e){let t=new Set;return e.filter(n=>t.has(n.name)?!1:(t.add(n.name),!0))}async function tr(e,t){let n=zo(e);if(!n||n.status===t)return;let r=k.board?.columns.find(c=>c.id===t)?.name??t,o=k.board?.columns.find(c=>c.id===n.status);o?.tasks.splice(o.tasks.indexOf(n),1);let s=k.board?.columns.find(c=>c.id===t);s?.tasks.push(n);let i=n.status;n.status=t,se();try{await st.updateTaskStatus(e,t),await W.toast({kind:"success",message:`${an(n)} moved to ${r}.`}),se()}catch(c){n.status=i,o?.tasks.push(n),s?.tasks.splice(s.tasks.indexOf(n),1),se(),await on(`Move to ${r}`,c)}}var Oe=null;function se(){if(ot){if(No(ot),Oe=null,!k.ready){On(ot,{label:"Connecting to Kaneo"});return}if(!k.connected){nt(ot,{title:"Kaneo is not connected",body:"Add an API token in Settings \u2192 Integrations \u2192 Kaneo.",action:{label:"Reload",onClick:()=>void Mt()}});return}if(ot.append(Ed()),k.error){let e=x("div");ot.append(e),Mr(e,{tone:"error",title:"Kaneo",body:k.error,action:{label:"Retry",onClick:()=>void Mt()}})}Oe=x("div",{style:"flex:1; min-height:0; display:flex; flex-direction:column;"}),ot.append(Oe),Pa()}}function Pa(){if(Oe){if(No(Oe),!k.project){nt(Oe,{title:"No project",body:"This workspace has no Kaneo project yet."});return}if(!k.board){On(Oe,{label:"Loading board"});return}if(k.preferences.view==="kanban"){let e=x("div",{className:"board"});for(let n of k.board.columns)e.append(Nd(n));Oe.append(e),k.truncated&&Oe.append(x("div",{className:"muted"},"This board holds more tasks than one page. Narrow it with the search box or filters."));let t=zo(k.detailId);t&&Oe.append(Pd(t));return}if(k.preferences.view==="mine"){Oe.append(vd());return}Oe.append(Ad())}}function Ed(){let e=x("div",{className:"oc-toolbar"}),t=x("div",{style:"flex-shrink:0;"});e.append(t);let n=k.preferences.view;Nr(t,{items:[{id:"list",label:"Tasks"},{id:"kanban",label:"Kanban"},{id:"mine",label:"Mine"}],activeId:n,onChange:i=>{$e({view:i}).then(d=>{k.preferences=d,se()})}});let r=k.context?.projects??[];if(r.length>0){let i=x("div",{style:"min-width:150px;"});e.append(i),jt(i,{label:"Project",searchable:r.length>8,value:k.project?.id??"",options:r.map(c=>({id:c.id,label:c.slug.toUpperCase(),hint:c.statistics?`${c.statistics.totalTasks}`:void 0})),onChange:c=>{$e({projectId:c}).then(()=>{k.board=null,k.detailId=null,k.mineDetail=null,Mt()})}})}let o=x("div",{style:"flex:1; min-width:180px;"});e.append(o),Cr(o,{value:k.search,label:"Filter tasks",placeholder:"Filter by title, ticket or description",onChange:i=>{k.search=i,Pa()}}),e.append(bd(),Td(),_d(),Sd());let s=x("div",{style:"margin-left:auto;"});return e.append(s),ve(s,{label:"Refresh",variant:"ghost",size:"sm",loading:k.loading,onClick:()=>void Mt()}),e.append(Aa("Kaneo")),e}function bd(){let e=x("div");return mt(e,{label:k.preferences.priorityFilter==="any"?"Any priority":Be(k.preferences.priorityFilter),size:"sm",items:[{id:"any",label:"Any priority"},{separator:!0},...Os.map(t=>({id:t,label:Be(t)}))],onSelect:t=>{$e({priorityFilter:t}).then(n=>{k.preferences=n,se()})}}),e}function Td(){let e=x("div"),t=k.board?.columns??[],n=t.find(r=>r.id===k.preferences.statusFilter);return mt(e,{label:n?n.name:"Any status",size:"sm",items:[{id:"",label:"Any status"},{separator:!0},...t.map(r=>({id:r.id,label:r.name}))],onSelect:r=>{$e({statusFilter:r||null}).then(o=>{k.preferences=o,se()})}}),e}function _d(){let e=x("div");return mt(e,{label:k.preferences.assigneeFilter==="me"?"Assigned to me":"Assignee",size:"sm",items:[{id:"any",label:"Anyone"},{id:"me",label:"Assigned to me"}],onSelect:t=>{$e({assigneeFilter:t==="me"?"me":"any"}).then(n=>{k.preferences=n,se()})}}),e}function Sd(){let e=x("div"),t=k.labels.find(n=>n.id===k.preferences.labelFilter);return mt(e,{label:t?t.name:"Any label",size:"sm",items:[{id:"",label:"Any label"},{separator:!0},...k.labels.map(n=>({id:n.id,label:n.name}))],onSelect:n=>{$e({labelFilter:n||null}).then(r=>{k.preferences=r,se()})}}),e}function yd(e){return k.board?.columns.find(t=>t.id===e)}function wd(){return k.board?k.board.columns.flatMap(e=>e.tasks):[]}function Ad(){let e=wd().filter(Ma),t=x("div",{className:"split"}),n=x("div",{className:"split-list"});if(e.length===0){let i=x("div");n.append(i),nt(i,{title:"Nothing matches",body:"Clear the search box or the filters."})}else for(let i of e){let c=yd(i.status);c&&n.append($o({task:i,ticketId:an(i),column:c,selected:i.id===k.detailId,onActivate:()=>{k.detailId=i.id,se()}}))}let r=x("div",{className:"split-sep"});r.addEventListener("pointerdown",Ua);let o=x("div",{className:"split-preview"}),s=zo(k.detailId);if(s)o.append(Ga(Na(s)));else{let i=x("div",{style:"flex:1; display:flex; align-items:center;"});o.append(i),nt(i,{title:"Select a task",body:"Pick a task on the left to preview it here, attach it or start a session."})}return t.append(n,r,o),k.listWidth!==null&&(n.style.width=`${k.listWidth}px`),t}function vd(){let e=k.search.trim().toLowerCase(),t=k.mineEntries.filter(i=>!e||i.title.toLowerCase().includes(e)||i.ticketId.toLowerCase().includes(e)),n=x("div",{className:"split"}),r=x("div",{className:"split-list"});if(t.length===0){let i=x("div");r.append(i),nt(i,{title:k.mineEntries.length===0?"Nothing assigned to you":"Nothing matches",body:k.mineEntries.length===0?"Tasks assigned to your Kaneo account in this workspace show up here.":void 0})}else for(let i of t){let c=$o({task:{id:i.id,projectId:"",title:i.title,number:null,description:null,status:i.statusName??"",priority:"no-priority",createdAt:"",dueDate:i.dueDate},ticketId:i.ticketId,column:{slug:i.statusName?.toLowerCase()??"",isFinal:!1,name:i.statusName??""},selected:k.mineDetail?.entry.id===i.id,onActivate:()=>void Rd(i)});r.append(c)}let o=x("div",{className:"split-sep"});o.addEventListener("pointerdown",Ua);let s=x("div",{className:"split-preview"});if(k.mineDetail)s.append(Ga(Od(k.mineDetail)));else{let i=x("div",{style:"flex:1; display:flex; align-items:center;"});s.append(i),nt(i,{title:"Select a task",body:"Pick an assigned task on the left to preview it."})}return n.append(r,o,s),k.listWidth!==null&&(r.style.width=`${k.listWidth}px`),n}function Ua(e){e.preventDefault();let t=e.target.previousElementSibling instanceof HTMLElement?e.target.previousElementSibling.offsetWidth:280,n=e.clientX,r=s=>{let i=Math.min(Math.max(280,t+(s.clientX-n)),Math.floor(window.innerWidth*.6));if(k.listWidth=i,Oe){let c=Oe.querySelector(".split-list");c&&(c.style.width=`${i}px`)}},o=()=>{window.removeEventListener("pointermove",r),window.removeEventListener("pointerup",o)};window.addEventListener("pointermove",r),window.addEventListener("pointerup",o)}async function Rd(e){k.mineDetail={entry:e,task:Id(e)},se();try{let t=await st.getTask(e.id);k.mineDetail?.entry.id===e.id&&(k.mineDetail={entry:e,task:t},se())}catch(t){await on("Open task",t)}}function Od(e){return{task:e.task,ticketId:e.entry.ticketId,workspaceId:k.context?.workspaceId??"",projectName:e.entry.projectName,columnName:e.entry.statusName??Do(e.task.status),comments:k.comments[e.task.id]?.items}}function Id(e){return{id:e.id,projectId:"",title:e.title,number:null,description:null,status:e.statusName??"",priority:"no-priority",createdAt:"",dueDate:e.dueDate}}function Cd(e){k.comments[e]||(k.comments[e]={loading:!0,error:null},st.listComments(e).then(n=>{k.comments[e]={loading:!1,error:null,items:n},se()}).catch(n=>{k.comments[e]={loading:!1,error:n instanceof Error?n.message:String(n)},se()}))}function Da(e,t){Cd(e.task.id);let n=k.board?.columns??[],r=!!La(e.task),o=n.find(s=>s.isFinal);return _a(e,{columns:r?n:[],comments:k.comments[e.task.id]??null,worktree:k.preferences.createInWorktree,onWorktreeChange:s=>{k.preferences={...k.preferences,createInWorktree:s},$e({createInWorktree:s})},onMove:s=>void tr(e.task.id,s),onCloseIssue:()=>{o&&tr(e.task.id,o.id)},canCloseIssue:r&&!!o&&e.task.status!==o?.id,onBack:t})}function Ld(){k.detailId=null,k.mineDetail=null,se()}function Ga(e){return Da(e,Ld)}function Nd(e){let t=e.tasks.filter(Ma).sort((o,s)=>(o.position??0)-(s.position??0)),n=x("div",{className:"board-column"});n.append(x("div",{className:"group-head"},x("span",{className:"eyebrow"},e.name),x("span",{className:"count-pill"},String(t.length))));let r=x("div",{className:"board-cards"});for(let o of t)r.append(Md(o));return t.length===0&&r.append(x("div",{className:"muted"},"Empty")),r.addEventListener("dragover",o=>{o.preventDefault(),n.classList.add("drag-over")}),r.addEventListener("dragleave",()=>n.classList.remove("drag-over")),r.addEventListener("drop",o=>{o.preventDefault(),n.classList.remove("drag-over");let s=o.dataTransfer?.getData("text/plain");s&&tr(s,e.id)}),n.append(r),n}function Md(e){let t=Et(e.dueDate),n=Jn(e.dueDate),r=x("div",{className:"card",draggable:!0,tabIndex:0});r.append(x("div",{className:"row",style:"gap:6px; align-items:flex-start;"},x("span",{className:`priority-bar priority-${e.priority}`}),x("span",{className:"task-key"},an(e))),x("div",{className:"card-title"},e.title));let o=x("div",{className:"card-meta"});e.priority!=="no-priority"&&o.append(x("span",{},Be(e.priority))),t&&o.append(x("span",{className:n?"overdue":""},t)),e.assigneeName&&o.append(x("span",{},e.assigneeName));let s=e.subtaskCounts;s&&s.total>0&&o.append(x("span",{},`${s.completed}/${s.total}`));for(let f of e.labels??[])o.append(Qn(f));let i=x("span",{className:"status-pill-holder"});o.append(i);let c=k.board?.columns??[],d=c.find(f=>f.id===e.status)?.name??e.status;mt(i,{label:d,size:"xs",items:c.filter(f=>f.id!==e.status).map(f=>({id:f.id,label:f.name})),onSelect:f=>{tr(e.id,f)}}),r.append(o),r.addEventListener("dragstart",f=>{f.dataTransfer?.setData("text/plain",e.id),f.dataTransfer&&(f.dataTransfer.effectAllowed="move"),r.classList.add("dragging")}),r.addEventListener("dragend",()=>r.classList.remove("dragging"));let m=()=>{k.detailId=e.id,se()};return r.addEventListener("click",m),r.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),m())}),r}function Pd(e){let t=x("div",{className:"backdrop"});t.addEventListener("click",r=>{r.target===t&&Fo()});let n=x("div",{className:"backdrop-card"});return n.append(Da(Na(e),Fo)),t.append(n),t}function Fo(){k.detailId=null,se()}W.onReady(e=>{_r(e,document.documentElement),wa(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,k.ready=e,k.connected=e.connection.connected,se(),k.connected&&!Ca&&(Ca=!0,Mt())});W.onConnection(e=>{let t=k.connected;k.connected=e.connected,t!==e.connected&&(se(),e.connected&&Mt())});W.onReady(e=>{let t=e.settings["openchamber-url"]?.trim();ya(st,t||void 0)});document.addEventListener("keydown",e=>{e.key==="Escape"&&k.detailId&&Fo()});})();
