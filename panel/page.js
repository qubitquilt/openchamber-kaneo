"use strict";(()=>{var wl=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],vl=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ys=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of wl)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of vl){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Ir=(e,t)=>{ys(e.theme,t),t.dataset&&(t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode)};var In="data-oc-scrolling",Cr=`
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
:hover, [${In}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${In}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${In}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${In}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function Lr(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",r=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;o.hasAttribute("data-oc-scrolling")||o.setAttribute("data-oc-scrolling","");let s=n.get(o);s!==void 0&&clearTimeout(s),n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Al=`(${Lr.toString()})(document);`;var Rl={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},ne=(e,t)=>`var(--${e}, var(--oc-${Rl[e]}, ${t}))`,mt=ne("surface-background","transparent"),Cn=ne("surface-elevated","transparent"),Xt=ne("surface-elevated-foreground","inherit"),tt=ne("surface-foreground","inherit"),le=ne("surface-muted-foreground","gray"),Ol=ne("surface-muted","transparent"),Ue=ne("interactive-border","currentColor"),Le=ne("interactive-hover","transparent"),ht=ne("interactive-active","transparent"),Nr=ne("interactive-selection","transparent"),Pr=ne("interactive-selection-foreground","inherit"),As=ne("interactive-focus-ring","currentColor"),Ke=ne("primary","currentColor"),Mr=ne("primary-text","inherit"),Ur=ne("error-text","inherit"),Il=ne("font-sans","inherit"),Dr=ne("font-mono","monospace"),Rs=ne("radius","9px"),$r=`calc(${Rs} - 2px)`,ws=`calc(${Rs} - 4px)`,me=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,vs=`box-shadow: 0 0 0 2px ${As};`,Ln=e=>{let t=ne(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${ne(`${e}-text`,"inherit")}; }`},Cl=`
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
`,Os=`
.oc-sdk { color: ${tt}; font-family: ${Il}; }
.oc-sdk :focus-visible { outline: none; ${vs} }
.oc-sdk-mono { font-family: ${Dr}; }
.oc-sdk-muted { color: ${le}; }
${Ln("success")}${Ln("warning")}${Ln("error")}${Ln("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ke}; --oc-sdk-tone-text: ${Mr}; }

.oc-sdk-btn { border-radius: ${$r}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ws}; }
.oc-sdk-btn[data-variant="default"] { color: ${Mr}; background: ${me(Ke,10,mt)}; border-color: ${me(Ke,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${me(Ke,16,mt)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${me(Ke,22,mt)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ol}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ht}, ${ht}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Cn}; color: ${Xt}; border-color: ${Ue}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ht}, ${ht}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Le}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ht}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${ne("status-error","red")}; color: ${Ur}; background: ${me("var(--oc-sdk-tone)",7,mt)}; border-color: ${me("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${me("var(--oc-sdk-tone)",9,mt)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${me("var(--oc-sdk-tone)",11,mt)}; }

.oc-sdk-field-note { color: ${le}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ur}; }
.oc-sdk-input { border-radius: ${$r}; background: ${Cn}; color: ${Xt}; box-shadow: inset 0 0 0 1px ${me(Ue,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${le}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${As}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${ne("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${ne("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${Dr}; }

.oc-sdk-search-icon { color: ${le}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ke}; }
.oc-sdk-search-clear { border-radius: ${ws}; color: ${le}; }
.oc-sdk-search-clear:hover { background: ${Le}; color: ${tt}; }

.oc-sdk-trigger { border-color: ${Ue}; border-radius: ${$r}; background: ${Cn}; color: ${Xt}; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ht}, ${ht}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${le}; }
.oc-sdk-trigger-chevron { color: ${le}; }
.oc-sdk-popup { --surface-foreground: ${Xt}; border-color: ${me(Ue,60)}; border-radius: 12px; background: ${Cn}; color: ${Xt}; box-shadow: 0 8px 24px ${me(tt,12)}; }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Le}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Nr}; color: ${Pr}; }
.oc-sdk-option-check { color: ${tt}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ur}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${me(ne("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${le}; }
.oc-sdk-popup-empty { color: ${le}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ue}; border-radius: 4px; color: ${tt}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${me(tt,60,Ue)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ue}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${mt}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ke}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${vs} }
.oc-sdk-check-desc { color: ${le}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${me(tt,4)}; }
.oc-sdk-tab { border-radius: 8px; color: ${le}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${tt}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Pr}; background: ${Nr}; border-color: ${Ue}; }
.oc-sdk-tab-count { color: ${le}; }

.oc-sdk-badge { border-radius: 9999px; background: ${Le}; color: ${le}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${me("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Le}; }
.oc-sdk-row[aria-selected="true"] { background: ${Nr}; color: ${Pr}; }
.oc-sdk-row-lead { font-family: ${Dr}; color: ${le}; }
.oc-sdk-row-sub { color: ${le}; }
.oc-sdk-row-meta { color: ${le}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${le}; }

.oc-sdk-empty-body { color: ${le}; }

.oc-sdk-spinner { color: ${le}; }
.oc-sdk-spinner-ring { border-color: ${Ue}; border-top-color: ${Ke}; border-radius: 9999px; }

.oc-sdk-banner { border-color: ${me("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${me("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${le}; }

.oc-sdk-separator { color: ${le}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${me(Ue,40)}; }

.oc-sdk-progress-label { color: ${le}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${Ue}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ke}); }

.oc-sdk-text a { color: ${Mr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${me(Ue,60)}; }
`,ee=`
${Cr}
${Cl}
${Os}`;var Is="oc-sdk-ui-style",nt=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},te=e=>{let t=document.getElementById(Is);if(t instanceof HTMLStyleElement){t.textContent!==e&&(t.textContent=e);return}Lr(document);let n=document.createElement("style");n.id=Is,n.textContent=e,document.head.appendChild(n)},v=(e,t)=>{let n=document.createElement(e);return t&&(n.className=t),n},Ne=e=>{let t=v("button",e);return t.type="button",t},ce=(e,t)=>{let n=t??"";e.textContent!==n&&(e.textContent=n)},rt=(e,t,n)=>{n==null||n===""?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)},Cs=(e,t)=>{let n=r=>{r.target instanceof Node&&e.contains(r.target)||t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Ll=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},xe=(e,t)=>{te(ee);let n=t,r=Ne("oc-sdk oc-sdk-btn"),o=Ll(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=!!n.disabled||!!n.loading,r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r?r.prepend(o):!n.loading&&o.parentNode===r&&o.remove(),ce(s,n.label)},c=()=>{n.disabled||n.loading||n.onClick()};return r.addEventListener("click",c),i(),{update:d=>{n={...n,...d},i()},dispose:()=>{r.removeEventListener("click",c),r.remove()}}};var Gr=(e,t)=>{te(ee);let n=t,r=v("label","oc-sdk oc-sdk-field"),o=v("span","oc-sdk-field-label"),s=n.multiline?v("textarea","oc-sdk-input"):v("input","oc-sdk-input"),i=v("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let c=()=>{ce(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement?s.type=n.password?"password":"text":s.rows=n.rows??3,s.value!==n.value&&(s.value=n.value),s.disabled=!!n.disabled,rt(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let m=!!n.error;r.dataset.invalid=m?"true":"false",s.setAttribute("aria-invalid",m?"true":"false");let f=n.error??n.helper??"";ce(i,f),i.hidden=f===""},d=()=>{n.onChange(s.value)};return s.addEventListener("input",d),c(),{update:m=>{n={...n,...m},c()},dispose:()=>{s.removeEventListener("input",d),r.remove()}}};var Ls="http://www.w3.org/2000/svg",Nl={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ve=(e,t,n)=>{let r=document.createElementNS(Ls,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n&&r.setAttribute("class",n);let o=document.createElementNS(Ls,"path");return o.setAttribute("d",Nl[e]),r.append(o),r};var Hr=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-search"),o=v("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Ne("oc-sdk-search-clear");s.append(Ve("close",14)),s.tabIndex=-1,r.append(Ve("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let f=n.placeholder??"Search";rt(o,"placeholder",f),o.setAttribute("aria-label",n.label??f),s.setAttribute("aria-label","Clear search"),o.value!==n.value&&(o.value=n.value),r.dataset.active=n.value.trim()===""?"false":"true"},c=()=>{n.value!==""&&n.onChange(""),o.focus()},d=()=>{n.onChange(o.value)},m=f=>{f.key==="Escape"&&o.value!==""&&(f.preventDefault(),c())};return o.addEventListener("input",d),o.addEventListener("keydown",m),s.addEventListener("click",c),i(),n.autofocus&&o.focus(),{update:f=>{n={...n,...f},i()},dispose:()=>{o.removeEventListener("input",d),o.removeEventListener("keydown",m),s.removeEventListener("click",c),r.remove()}}};var Ye=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];return e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n"?"next":e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p"?"previous":e.key==="Home"?"first":e.key==="End"?"last":null},ot=(e,t,n)=>{let r=e.filter(d=>!d.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex(d=>d.id===t);return i===-1?n==="next"?o.id:s.id:r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var Ns=(e,t)=>`${e}-${t??""}`,Nn=(e,t,n,r)=>{let o=Ne("oc-sdk-option");o.id=Ns(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=!!n.disabled,t==="option"&&o.setAttribute("aria-selected",n.selected?"true":"false"),o.dataset.destructive=n.destructive?"true":"false";let s=v("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=v("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=v("span","oc-sdk-option-check");i.append(Ve("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Pn=(e,t,n,r)=>{let o=Ns(n,r);for(let s of Array.from(e.children))s instanceof HTMLElement&&s.classList.contains("oc-sdk-option")&&(s.dataset.active=s.id===o?"true":"false");rt(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Pl=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;r>o&&n.top-8>o&&(e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`);let s=n.left+e.offsetWidth-window.innerWidth+8;s>0&&(e.style.left=`${Math.max(8,Math.round(n.left-s))}px`)},Mn=(e,t,n,r)=>{e.append(n),Pl(n,t);let o=Cs(e,r),s=()=>{r()},i=c=>{c.target instanceof Node&&n.contains(c.target)||r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var Ps=(e,t)=>{let n=t.trim().toLowerCase();return n?e.filter(r=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n)):[...e]},Ml=0,Wt=(e,t)=>{te(ee);let n=t,r=`oc-sdk-select-${Ml+=1}`,o=v("div","oc-sdk oc-sdk-select"),s=v("span","oc-sdk-field-label");s.id=`${r}-label`;let i=Ne("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let c=v("span","oc-sdk-trigger-value");i.append(c,Ve("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let d="",m=null,f=null,E=v("div","oc-sdk oc-sdk-popup"),S=v("div","oc-sdk-popup-search"),O=v("input","oc-sdk-input");O.type="text",O.autocomplete="off",S.append(O);let P=v("div");P.setAttribute("role","listbox"),P.tabIndex=-1,E.append(P);let q=()=>Ps(n.options,n.searchable?d:""),N=()=>n.searchable?O:P,T=C=>{m=C,Pn(P,N(),r,C)},U=()=>{nt(P);let C=q();if(C.length===0){let de=v("div","oc-sdk-popup-empty");de.textContent="No matches",P.append(de)}for(let de of C)P.append(Nn(r,"option",{...de,selected:de.id===n.value},{hover:()=>T(de.id),pick:()=>he(de.id)}));T(C.some(de=>de.id===m)?m:C[0]?.id??null)},K=()=>{let C=f;f=null,C?.(),d="",O.value="",i.setAttribute("aria-expanded","false")},J=()=>{f||n.disabled||(m=n.value,O.placeholder=n.searchPlaceholder??"Search",n.searchable?E.prepend(S):S.remove(),U(),f=Mn(o,i,E,K),i.setAttribute("aria-expanded","true"),N().focus())},he=C=>{K(),i.focus(),C!==n.value&&n.onChange(C)},ge=()=>{f?K():J()},B=C=>{!f&&Ye(C)&&(C.preventDefault(),J())},R=C=>{let de=Ye(C);de?(C.preventDefault(),T(ot(q(),m,de))):C.key==="Enter"?(C.preventDefault(),m&&he(m)):C.key==="Escape"?(C.preventDefault(),K(),i.focus()):n.searchable&&C.target!==O&&C.key.length===1&&!C.ctrlKey&&!C.metaKey&&O.focus()},A=()=>{d=O.value,U()},_e=C=>{f&&!(C.relatedTarget instanceof Node&&o.contains(C.relatedTarget))&&K()},oe=()=>{ce(s,n.label),s.hidden=!n.label;let C=n.options.find(de=>de.id===n.value);ce(c,C?.label??n.placeholder??"Select"),c.dataset.empty=C?"false":"true",i.disabled=!!n.disabled,f&&U()};return i.addEventListener("click",ge),i.addEventListener("keydown",B),E.addEventListener("keydown",R),O.addEventListener("input",A),o.addEventListener("focusout",_e),oe(),{update:C=>{n={...n,...C},oe()},dispose:()=>{K(),i.removeEventListener("click",ge),i.removeEventListener("keydown",B),E.removeEventListener("keydown",R),O.removeEventListener("input",A),o.removeEventListener("focusout",_e),o.remove()}}};var Ul=(e,t,n)=>{te(ee);let r=t,o=Ne("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=v("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");n==="checkbox"&&s.append(Ve("check",12));let i=v("span","oc-sdk-check-text"),c=v("span","oc-sdk-check-label"),d=v("span","oc-sdk-check-desc");i.append(c,d),o.append(s,i),e.append(o);let m=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=!!r.disabled,ce(c,r.label),ce(d,r.description),d.hidden=!r.description},f=()=>{r.disabled||r.onChange(!r.checked)};return o.addEventListener("click",f),m(),{update:E=>{r={...r,...E},m()},dispose:()=>{o.removeEventListener("click",f),o.remove()}}},Fr=(e,t)=>Ul(e,t,"checkbox");var zr=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{nt(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let c=Ne("oc-sdk-tab");c.setAttribute("role","tab");let d=i.id===n.activeId;c.setAttribute("aria-selected",d?"true":"false"),c.tabIndex=d?0:-1,c.dataset.id=i.id;let m=v("span");if(m.textContent=i.label,c.append(m),i.count!==void 0){let f=v("span","oc-sdk-tab-count");f.textContent=String(i.count),c.append(f)}c.addEventListener("click",()=>{i.id!==n.activeId&&n.onChange(i.id)}),r.append(c)}},s=i=>{let c=Ye(i,"horizontal");if(!c)return;let d=ot(n.items,n.activeId,c);if(d&&d!==n.activeId){i.preventDefault(),n.onChange(d);let m=r.querySelector(`[data-id="${CSS.escape(d)}"]`);m instanceof HTMLElement&&m.focus()}};return r.addEventListener("keydown",s),o(),{update:i=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var gt=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-empty"),o=v("h2","oc-sdk-empty-title"),s=v("p","oc-sdk-empty-body"),i=v("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let c=null,d=()=>{if(ce(o,n.title),ce(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let m={label:n.action.label,onClick:n.action.onClick};c?c.update(m):c=xe(i,{...m,variant:"outline",size:"sm"})};return d(),{update:m=>{n={...n,...m},d()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var st=(e,t={})=>{te(ee);let n=t,r=v("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=v("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=v("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",ce(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:c=>{n={...n,...c},i()},dispose:()=>{r.remove()}}};var Kt=(e,t)=>{te(ee);let n=t,r=v("div","oc-sdk oc-sdk-banner"),o=v("div","oc-sdk-banner-text"),s=v("div","oc-sdk-banner-title"),i=v("div","oc-sdk-banner-body"),c=v("div","oc-sdk-banner-action");o.append(s,i),r.append(o,c),e.append(r);let d=null,m=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),ce(s,n.title),ce(i,n.body),i.hidden=!n.body,c.hidden=!n.action,!n.action){d?.dispose(),d=null;return}let f={label:n.action.label,onClick:n.action.onClick};d?d.update(f):d=xe(c,{...f,variant:"outline",size:"xs"})};return m(),{update:f=>{n={...n,...f},m()},dispose:()=>{d?.dispose(),d=null,r.remove()}}};var Ms=e=>e.filter(t=>!("separator"in t)),$l=0,it=(e,t)=>{te(ee);let n=t,r=`oc-sdk-menu-${$l+=1}`,o=v("div","oc-sdk oc-sdk-menu");e.append(o);let s=v("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,c=null,d=xe(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{i?S():O()}}),m=o.querySelector("button");m?.setAttribute("aria-haspopup","menu");let f=T=>{c=T,Pn(s,s,r,T)},E=()=>{nt(s);for(let T of n.items){if("separator"in T){let U=v("div","oc-sdk-separator");U.dataset.labeled="false",s.append(U);continue}s.append(Nn(r,"menuitem",T,{hover:()=>f(T.id),pick:()=>P(T.id)}))}f(Ms(n.items).some(T=>T.id===c)?c:null)},S=()=>{let T=i;i=null,T?.(),c=null,m?.setAttribute("aria-expanded","false")},O=()=>{i||!m||(E(),i=Mn(o,m,s,S),m.setAttribute("aria-expanded","true"),s.focus())},P=T=>{S(),m?.focus(),n.onSelect(T)},q=T=>{let U=Ye(T);U?(T.preventDefault(),f(ot(Ms(n.items),c,U))):T.key==="Enter"||T.key===" "?(T.preventDefault(),c&&P(c)):T.key==="Escape"&&(T.preventDefault(),S(),m?.focus())},N=T=>{i&&!(T.relatedTarget instanceof Node&&o.contains(T.relatedTarget))&&S()};return s.addEventListener("keydown",q),o.addEventListener("focusout",N),{update:T=>{n={...n,...T},d.update({label:n.label,variant:n.variant,size:n.size}),i&&E()},dispose:()=>{S(),s.removeEventListener("keydown",q),o.removeEventListener("focusout",N),d.dispose(),o.remove()}}};var Un="https://cloud.kaneo.app",Us=Un.replace(/\/api\/?$/,""),Ds="kaneo-tasks",Br=100,$s=["no-priority","low","medium","high","urgent"];var Vt={"no-priority":0,low:1,medium:2,high:3,urgent:4};var we=class extends Error{status;code;constructor(t,n,r){super(r),this.name="KaneoError",this.status=t,this.code=n}};function Gl(e){if(!e)return;let t={};for(let[n,r]of Object.entries(e))r==null||r===""||(t[n]=String(r));return Object.keys(t).length>0?t:void 0}function Hl(e,t){let n=typeof t=="object"&&t!==null?t:{},r=typeof n.message=="string"&&n.message?n.message:`Kaneo answered ${e}.`;return new we(e,n.code??`HTTP_${e}`,r)}var Fl=10,zl=2,Bl=800;function Gs(e){async function t({method:r,path:o,query:s,body:i}){let c=Gl(s),d="/api"+o,m;for(let S=0;m=await e({method:r,path:d,...c?{query:c}:{},...i===void 0?{}:{body:JSON.stringify(i)}}),!(m.status!==429||S>=zl);S+=1)await new Promise(O=>setTimeout(O,Bl*2**S));let f=m,E;if(f.body)try{E=JSON.parse(f.body)}catch{throw f.status>=400?new we(f.status,"INVALID_RESPONSE",f.body.slice(0,400)):new we(f.status,"INVALID_RESPONSE","Kaneo sent a body that is not JSON.")}if(f.status>=400)throw Hl(f.status,E);return E}async function n(r){let o=encodeURIComponent(r),s=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:1,limit:Br}}),i=s.data,c=s.pagination,d=1;for(;d<Math.min(c.totalPages,Fl);){d+=1;let m=await t({method:"GET",path:`/task/tasks/${o}`,query:{page:d,limit:Br}});for(let f of m.data.columns){let E=i.columns.find(S=>S.id===f.id);E&&E.tasks.push(...f.tasks)}i.archivedTasks.push(...m.data.archivedTasks),i.plannedTasks.push(...m.data.plannedTasks)}return{board:i,pagination:c,truncated:c.totalPages>d}}return{currentUser:()=>t({method:"GET",path:"/user/me"}),listWorkspaces:()=>t({method:"GET",path:"/workspace"}),listProjects:(r,o=!1)=>t({method:"GET",path:"/project",query:{workspaceId:r,includeArchived:o?"true":void 0}}),getBoard:n,getTask:r=>t({method:"GET",path:`/task/${encodeURIComponent(r)}`,query:{view:"detail"}}),getTaskByTicketId:(r,o)=>t({method:"GET",path:`/task/by-ticket-id/${encodeURIComponent(r)}`,query:{workspaceId:o}}),listAssignedTasks:r=>t({method:"GET",path:"/task/assigned",query:{workspaceId:r}}),search:(r,o,s={})=>t({method:"GET",path:"/search",query:{q:o,type:"tasks",workspaceId:r,projectId:s.projectId,limit:s.limit??30}}),listLabels:r=>t({method:"GET",path:`/label/workspace/${encodeURIComponent(r)}`}),listColumns:r=>t({method:"GET",path:`/column/${encodeURIComponent(r)}`}),listComments:r=>t({method:"GET",path:`/comment/${encodeURIComponent(r)}`}),createComment:(r,o)=>t({method:"POST",path:`/comment/${encodeURIComponent(r)}`,body:{content:o}}),createTask:(r,o)=>t({method:"POST",path:`/task/${encodeURIComponent(r)}`,body:o}),updateTaskStatus:(r,o)=>t({method:"PUT",path:`/task/status/${encodeURIComponent(r)}`,body:{status:o}}),updateTaskPriority:(r,o)=>t({method:"PUT",path:`/task/priority/${encodeURIComponent(r)}`,body:{priority:o}})}}function jl(e){return e instanceof we?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function Dn(e,t){return console.error(`${e} failed:`,t),jl(t)}function Xl(e,t){this.v=e,this.k=t}function Hs(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Wl(e){if(Array.isArray(e))return e}function Kl(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,s,i,c=[],d=!0,m=!1;try{if(s=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;d=!1}else for(;!(d=(r=s.call(n)).done)&&(c.push(r.value),c.length!==t);d=!0);}catch(f){m=!0,o=f}finally{try{if(!d&&n.return!=null&&(i=n.return(),Object(i)!==i))return}finally{if(m)throw o}}return c}}function Vl(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Yl(e,t){return Wl(e)||Kl(e,t)||ql(e,t)||Vl()}function ql(e,t){if(e){if(typeof e=="string")return Hs(e,t);var n={}.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Hs(e,t):void 0}}function $n(e){var t,n;function r(s,i){try{var c=e[s](i),d=c.value,m=d instanceof Xl;Promise.resolve(m?d.v:d).then(function(f){if(m){var E=s==="return"&&d.k?s:"next";if(!d.k||f.done)return r(E,f);f=e[E](f).value}o(!!c.done,f)},function(f){r("throw",f)})}catch(f){o(2,f)}}function o(s,i){s===2?t.reject(i):t.resolve({value:i,done:s}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(s,i){return new Promise(function(c,d){var m={key:s,arg:i,resolve:c,reject:d,next:null};n?n=n.next=m:(t=n=m,r(s,i))})},typeof e.return!="function"&&(this.return=void 0)}$n.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},$n.prototype.next=function(e){return this._invoke("next",e)},$n.prototype.throw=function(e){return this._invoke("throw",e)},$n.prototype.return=function(e){return this._invoke("return",e)};var ti=Object.entries,Fs=Object.setPrototypeOf,Jl=Object.isFrozen,ni=Object.getPrototypeOf,ri=Object.getOwnPropertyDescriptor,be=Object.freeze,Se=Object.seal,Ct=Object.create,oi=typeof Reflect<"u"&&Reflect,Qr=oi.apply,eo=oi.construct;be||(be=function(t){return t});Se||(Se=function(t){return t});Qr||(Qr=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),s=2;s<r;s++)o[s-2]=arguments[s];return t.apply(n,o)});eo||(eo=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var qe=re(Array.prototype.forEach);Array.prototype.indexOf;var Zl=re(Array.prototype.lastIndexOf),zs=re(Array.prototype.pop),Yt=re(Array.prototype.push),Ql=re(Array.prototype.slice),ec=re(Array.prototype.splice),Lt=Array.isArray,jr=si(Set),Xr=re(Set.prototype.add),qt=re(Set.prototype.has),kt=re(String.prototype.toLowerCase),Wr=re(String.prototype.toString),Bs=re(String.prototype.match),Jt=re(String.prototype.replace),js=re(String.prototype.indexOf),tc=re(String.prototype.trim),nc=re(Number.prototype.toString),rc=re(Boolean.prototype.toString),Xs=typeof BigInt>"u"?null:re(BigInt.prototype.toString),Ws=typeof Symbol>"u"?null:re(Symbol.prototype.toString),Oe=re(Object.prototype.hasOwnProperty),Zt=re(Object.prototype.toString),Te=re(RegExp.prototype.test),Je=si(TypeError);function re(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Qr(e,t,r)}}function si(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return eo(e,n)}}function H(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:kt;if(Fs&&Fs(e,null),!Lt(t))return e;let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let s=n(o);s!==o&&(Jl(t)||(t[r]=s),o=s)}e[o]=!0}return e}function oc(e){for(let t=0;t<e.length;t++)Oe(e,t)||(e[t]=null);return e}function Pe(e){let t=Ct(null);for(let r of ti(e)){var n=Yl(r,2);let o=n[0],s=n[1];Oe(e,o)&&(Lt(s)?t[o]=oc(s):s&&typeof s=="object"&&s.constructor===Object?t[o]=Pe(s):t[o]=s)}return t}function sc(e){switch(typeof e){case"string":return e;case"number":return nc(e);case"boolean":return rc(e);case"bigint":return Xs?Xs(e):"0";case"symbol":return Ws?Ws(e):"Symbol()";case"undefined":return Zt(e);case"function":case"object":{if(e===null)return Zt(e);let t=e,n=De(t,"toString");if(typeof n=="function"){let r=n(t);return typeof r=="string"?r:Zt(r)}return Zt(e)}default:return Zt(e)}}function De(e,t){for(;e!==null;){let r=ri(e,t);if(r){if(r.get)return re(r.get);if(typeof r.value=="function")return re(r.value)}e=ni(e)}function n(){return null}return n}function ic(e,t){for(;e!==null;){let n=ri(e,t);if(n)return n.get?re(n.get):null;e=ni(e)}return null}function ac(e){try{return Te(e,""),!0}catch{return!1}}var Ks=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Kr=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Vr=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),lc=be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Yr=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),cc=be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Vs=be(["#text"]),Ys=be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),qr=be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qs=be(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Gn=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),dc=Se(/{{[\w\W]*|^[\w\W]*}}/g),pc=Se(/<%[\w\W]*|^[\w\W]*%>/g),uc=Se(/\${[\w\W]*/g),fc=Se(/^data-[\-\w.\u00B7-\uFFFF]+$/),mc=Se(/^aria-[\-\w]+$/),Js=Se(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),hc=Se(/^(?:\w+script|data):/i),gc=Se(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),kc=Se(/^html$/i),xc=Se(/^[a-z][.\w]*(-[.\w]+)+$/i),Jr=Se(/<[/\w!]/g),Zs=Se(/<[/\w]/g),bc=Se(/<\/no(script|embed|frames)/i),Qs=Se(/\/>/i),ue={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ec=be(H({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),Tc=function(){return typeof window>"u"?null:window},Sc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let s="dompurify"+(r?"#"+r:"");try{return t.createPolicy(s,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},ei=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},at=function(t,n,r,o){return Oe(t,n)&&Lt(t[n])?H(o.base?Pe(o.base):{},t[n],o.transform):r},Zr=function(t,n,r){let o=Oe(t,n)?t[n]:void 0;return o&&typeof o=="object"?Pe(o):r()};function ii(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Tc(),t=b=>ii(b);if(t.version="3.4.17",t.removed=[],!e||!e.document||e.document.nodeType!==ue.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,o=r.currentScript;e.DocumentFragment;let s=e.HTMLTemplateElement,i=e.Node,c=e.Element,d=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let m=e.DOMParser,f=e.trustedTypes,E=c.prototype,S=De(E,"cloneNode"),O=De(E,"remove"),P=De(E,"removeAttributeNode"),q=De(E,"nextSibling"),N=De(E,"childNodes"),T=De(E,"parentNode"),U=De(E,"shadowRoot"),K=De(E,"attributes"),J=i&&i.prototype?De(i.prototype,"nodeType"):null,he=i&&i.prototype?De(i.prototype,"nodeName"):null,ge=i&&i.prototype?De(i.prototype,"ownerDocument"):null,B=function(a){return J?J(a):a.nodeType},R=function(a){return he?he(a):a.nodeName},A=ic(E,"namespaceURI"),_e=function(a){return A?A(a):a.namespaceURI};if(typeof s=="function"){let b=n.createElement("template");b.content&&b.content.ownerDocument&&(n=b.content.ownerDocument)}let oe,C="",de,Dt=!1,ke=0,ie=function(){if(ke>0)throw Je('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Xe=function(a){ie(),ke++;try{return oe.createHTML(a)}finally{ke--}},Ee=function(a){ie(),ke++;try{return oe.createScriptURL(a)}finally{ke--}},ae=function(){return Dt||(de=Sc(f,o),Dt=!0),de},Q=n,ct=Q.implementation,$t=Q.createNodeIterator,hn=Q.createDocumentFragment,gn=Q.getElementsByTagName,St=r.importNode,j=ei();t.isSupported=typeof ti=="function"&&typeof T=="function"&&ct&&ct.createHTMLDocument!==void 0;let kn=dc,xn=pc,bn=uc,Ce=fc,Gt=mc,Ht=hc,En=gc,_t=xc,Ft=Js,Z=null,l=H({},[...Ks,...Kr,...Vr,...Yr,...Vs]),u=null,y=H({},[...Ys,...qr,...qs,...Gn]),_=Object.seal(Ct(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),X=null,Y=null,V=Object.seal(Ct(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Zo=!0,dr=!0,Qo=!1,pr=!0,We=!1,dt=!0,pt=!1,ur=!1,Tn=null,Sn=null,fr=!1,yt=!1,_n=!1,yn=!1,es=!0,ts=!1,ns="user-content-",mr=!0,hr=!1,ut=null,wt={},ft=null,rs=H({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),os=null,ss=H({},["audio","video","img","source","image","track"]),is=null,as=H({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wn="http://www.w3.org/1998/Math/MathML",vn="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",vt=Fe,gr=!1,kr=null,sl=H({},[wn,vn,Fe],Wr),ls=be(["mi","mo","mn","ms","mtext"]),xr=H({},ls),cs=be(["annotation-xml"]),br=H({},cs),il=H({},["title","style","font","a","script"]),zt=null,al=["application/xhtml+xml","text/html"],ll="text/html",pe=null,At=null,cl=n.createElement("form"),ds=function(a){return a instanceof RegExp||a instanceof Function},Er=function(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(At&&At===a)return;(!a||typeof a!="object")&&(a={}),a=Pe(a),zt=al.indexOf(a.PARSER_MEDIA_TYPE)===-1?ll:a.PARSER_MEDIA_TYPE,pe=zt==="application/xhtml+xml"?Wr:kt,Z=at(a,"ALLOWED_TAGS",l,{transform:pe}),u=at(a,"ALLOWED_ATTR",y,{transform:pe}),kr=at(a,"ALLOWED_NAMESPACES",sl,{transform:Wr}),is=at(a,"ADD_URI_SAFE_ATTR",as,{transform:pe,base:as}),os=at(a,"ADD_DATA_URI_TAGS",ss,{transform:pe,base:ss}),ft=at(a,"FORBID_CONTENTS",rs,{transform:pe}),X=at(a,"FORBID_TAGS",Pe({}),{transform:pe}),Y=at(a,"FORBID_ATTR",Pe({}),{transform:pe}),wt=Oe(a,"USE_PROFILES")?a.USE_PROFILES&&typeof a.USE_PROFILES=="object"?Pe(a.USE_PROFILES):a.USE_PROFILES:!1,Zo=a.ALLOW_ARIA_ATTR!==!1,dr=a.ALLOW_DATA_ATTR!==!1,Qo=a.ALLOW_UNKNOWN_PROTOCOLS||!1,pr=a.ALLOW_SELF_CLOSE_IN_ATTR!==!1,We=a.SAFE_FOR_TEMPLATES||!1,dt=a.SAFE_FOR_XML!==!1,pt=a.WHOLE_DOCUMENT||!1,yt=a.RETURN_DOM||!1,_n=a.RETURN_DOM_FRAGMENT||!1,yn=a.RETURN_TRUSTED_TYPE||!1,fr=a.FORCE_BODY||!1,es=a.SANITIZE_DOM!==!1,ts=a.SANITIZE_NAMED_PROPS||!1,mr=a.KEEP_CONTENT!==!1,hr=a.IN_PLACE||!1,Ft=ac(a.ALLOWED_URI_REGEXP)?a.ALLOWED_URI_REGEXP:Js,vt=typeof a.NAMESPACE=="string"?a.NAMESPACE:Fe,xr=Zr(a,"MATHML_TEXT_INTEGRATION_POINTS",()=>H({},ls)),br=Zr(a,"HTML_INTEGRATION_POINTS",()=>H({},cs));let p=Zr(a,"CUSTOM_ELEMENT_HANDLING",()=>Ct(null));if(_=Ct(null),Oe(p,"tagNameCheck")&&ds(p.tagNameCheck)&&(_.tagNameCheck=p.tagNameCheck),Oe(p,"attributeNameCheck")&&ds(p.attributeNameCheck)&&(_.attributeNameCheck=p.attributeNameCheck),Oe(p,"allowCustomizedBuiltInElements")&&typeof p.allowCustomizedBuiltInElements=="boolean"&&(_.allowCustomizedBuiltInElements=p.allowCustomizedBuiltInElements),Se(_),We&&(dr=!1),_n&&(yt=!0),wt&&(Z=H({},Vs),u=Ct(null),wt.html===!0&&(H(Z,Ks),H(u,Ys)),wt.svg===!0&&(H(Z,Kr),H(u,qr),H(u,Gn)),wt.svgFilters===!0&&(H(Z,Vr),H(u,qr),H(u,Gn)),wt.mathMl===!0&&(H(Z,Yr),H(u,qs),H(u,Gn))),V.tagCheck=null,V.attributeCheck=null,Oe(a,"ADD_TAGS")&&(typeof a.ADD_TAGS=="function"?V.tagCheck=a.ADD_TAGS:Lt(a.ADD_TAGS)&&(Z===l&&(Z=Pe(Z)),H(Z,a.ADD_TAGS,pe))),Oe(a,"ADD_ATTR")&&(typeof a.ADD_ATTR=="function"?V.attributeCheck=a.ADD_ATTR:Lt(a.ADD_ATTR)&&(u===y&&(u=Pe(u)),H(u,a.ADD_ATTR,pe))),Oe(a,"ADD_FORBID_CONTENTS")&&Lt(a.ADD_FORBID_CONTENTS)&&(ft===rs&&(ft=Pe(ft)),H(ft,a.ADD_FORBID_CONTENTS,pe)),mr&&(Z["#text"]=!0),pt&&H(Z,["html","head","body"]),Z.table&&(H(Z,["tbody"]),delete X.tbody),a.TRUSTED_TYPES_POLICY){if(typeof a.TRUSTED_TYPES_POLICY.createHTML!="function")throw Je('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof a.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Je('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let k=oe;oe=a.TRUSTED_TYPES_POLICY;try{C=Xe("")}catch(x){throw oe=k,x}}else a.TRUSTED_TYPES_POLICY===null?(oe=void 0,C=""):(oe===void 0&&(oe=ae()),oe&&typeof C=="string"&&(C=Xe("")));be&&be(a),At=a},ps=H({},[...Kr,...Vr,...lc]),us=H({},[...Yr,...cc]),dl=function(a,p,k){return p.namespaceURI===Fe?a==="svg":p.namespaceURI===wn?a==="svg"&&(k==="annotation-xml"||xr[k]):!!ps[a]},pl=function(a,p,k){return p.namespaceURI===Fe?a==="math":p.namespaceURI===vn?a==="math"&&br[k]:!!us[a]},ul=function(a,p,k){return p.namespaceURI===vn&&!br[k]||p.namespaceURI===wn&&!xr[k]?!1:!us[a]&&(il[a]||!ps[a])},fl=function(a){let p=_e(a),k=kt(R(a)),x=T(a),w,L;return x&&B(x)===ue.element?(w={namespaceURI:_e(x)},L=kt(R(x))):(w={namespaceURI:vt},L="template"),kr[p]?p===vn?dl(k,w,L):p===wn?pl(k,w,L):p===Fe?ul(k,w,L):!!(zt==="application/xhtml+xml"&&kr[p]):!1},Qe=function(a){Yt(t.removed,{element:a});try{T(a).removeChild(a)}catch{if(O(a),!T(a))throw Je("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},fs=function(a,p,k){try{P(a,p)}catch{try{a.removeAttribute(k)}catch{}}},Tr=function(a){_r(a);let p=N(a);p&&qe(Ql(p),x=>{try{O(x)}catch{}});let k=B(a)===ue.element?K(a):null;if(k)for(let x=k.length-1;x>=0;--x){let w=k[x],L=w&&w.name;typeof L=="string"&&fs(a,w,L)}},Rt=function(a,p,k){if(!k)try{k=p.getAttributeNode(a)}catch{k=null}Yt(t.removed,{attribute:k||null,from:p});try{k?P(p,k):p.removeAttribute(a)}catch{try{p.removeAttribute(a)}catch{}}if(a==="is")if(yt||_n)try{Qe(p)}catch{}else try{p.setAttribute(a,"")}catch{}},ms=function(a){let p=K(a);if(p)for(let k=p.length-1;k>=0;--k){let x=p[k],w=x&&x.name;typeof w!="string"||u[pe(w)]||fs(a,x,w)}},Sr=function(a,p){let k=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,x=[a];for(;x.length>0;){let w=x.pop();if(p(w)===!1)continue;if(k&&B(w)===ue.element){let D=U(w);et(D)&&x.push(D)}let L=N(w);if(L)for(let D=L.length-1;D>=0;--D)x.push(L[D])}},_r=function(a){Sr(a,p=>{B(p)===ue.element&&ms(p)})},yr=function(a){let p=[];return Sr(a,k=>{p.push(k)},!0),p},ml=function(a,p){let k=jr();qe(yr(a),x=>{B(x)===ue.element&&Xr(k,x)}),qe(p,x=>{B(x)===ue.element&&!qt(k,x)&&ms(x)})},hs=function(a,p){let k=!1;return qe(t.removed,x=>{x.element&&(k=k||x.element===a,_r(x.element))}),ml(a,p),k},hl=8,gl=function(a,p){let k=ut,x=null,w=()=>(x||(x=jr(),qe(p,L=>{Xr(x,L)})),x);for(let L=0;;L++){let D=yr(a),fe=[a],ze=!1;if(qe(D,ye=>{B(ye)===ue.documentFragment?Yt(fe,ye):!ze&&!qt(k,ye)&&(ze=qt(w(),ye))}),!ze)return;if(L>=hl)throw Je("the tree kept changing during in-place sanitization; refusing to return it");qe(fe,(ye,Ae)=>{kl(ye,Ae>0,a,w())})}},kl=function(a,p,k,x){let w=wr(a),L;for(;L=w.nextNode();)!qt(x,L)||qt(ut,L)||(p&&$e(j.uponSanitizeShadowNode,L,null),Ar(L,k),Rr(L,k),et(L.content)&&jt(L.content))},xl=function(a){ut&&Xr(ut,a)},gs=function(a,p){return dt?a==="patchsrc"?!0:a==="for"&&p!=="label"&&p!=="output":!1},bl=function(a){dt&&Sr(a,p=>{let k=B(p);if(k===ue.processingInstruction||k===ue.comment&&Te(Zs,p.data)){try{O(p)}catch{}return!1}if(k===ue.element){let x=p,w=pe(R(p));try{x.hasAttribute&&x.hasAttribute("patchsrc")&&x.removeAttribute("patchsrc"),x.hasAttribute&&x.hasAttribute("for")&&gs("for",w)&&x.removeAttribute("for")}catch{}}return!0})},ks=function(a){let p=null,k=null;if(fr)a="<remove></remove>"+a;else{let L=Bs(a,/^[\r\n\t ]+/);k=L&&L[0]}zt==="application/xhtml+xml"&&vt===Fe&&(a='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+a+"</body></html>");let x=oe?Xe(a):a;if(vt===Fe)try{p=new m().parseFromString(x,zt)}catch{}if(!p||!p.documentElement){p=ct.createDocument(vt,"template",null);try{p.documentElement.innerHTML=gr?C:x}catch{}}let w=p.body||p.documentElement;return a&&k&&w.insertBefore(n.createTextNode(k),w.childNodes[0]||null),vt===Fe?gn.call(p,pt?"html":"body")[0]:pt?p.documentElement:w},wr=function(a){let p=ge?ge(a):a.ownerDocument;return $t.call(p||a,a,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},An=function(a){return a=Jt(a,kn," "),a=Jt(a,xn," "),a=Jt(a,bn," "),a},vr=function(a){var p;xs(a);let k=(p=a.querySelectorAll)===null||p===void 0?void 0:p.call(a,"template");k&&qe(k,x=>{et(x.content)&&vr(x.content)})},xs=function(a){a.normalize();let p=ge?ge(a):a.ownerDocument,k=$t.call(p||a,a,d.SHOW_TEXT|d.SHOW_COMMENT|d.SHOW_CDATA_SECTION|d.SHOW_PROCESSING_INSTRUCTION,null),x=k.nextNode();for(;x;)x.data=An(x.data),x=k.nextNode()},Rn=function(a){let p=he?he(a):null;return typeof p!="string"||pe(p)!=="form"?!1:typeof a.nodeName!="string"||typeof a.textContent!="string"||typeof a.removeChild!="function"||a.attributes!==K(a)||typeof a.removeAttribute!="function"||typeof a.removeAttributeNode!="function"||typeof a.getAttributeNode!="function"||typeof a.setAttribute!="function"||typeof a.namespaceURI!="string"||typeof a.insertBefore!="function"||typeof a.hasChildNodes!="function"||a.nodeType!==J(a)||a.childNodes!==N(a)},et=function(a){if(!J||typeof a!="object"||a===null)return!1;try{return J(a)===ue.documentFragment}catch{return!1}},Bt=function(a){if(!J||typeof a!="object"||a===null)return!1;try{return typeof J(a)=="number"}catch{return!1}};function $e(b,a,p){b.length!==0&&qe(b,k=>{k.call(t,a,p,At)})}let El=function(a,p){return!!(dt&&a.hasChildNodes()&&!Bt(a.firstElementChild)&&Te(Jr,a.textContent)&&Te(Jr,a.innerHTML)||dt&&Ec[p]&&B(a)===ue.element&&_e(a)===Fe&&(Bt(a.firstElementChild)||typeof a.textContent=="string"&&Te(Jr,a.textContent))||a.nodeType===ue.processingInstruction||dt&&a.nodeType===ue.comment&&Te(Zs,a.data))},On=function(a,p){if(a instanceof RegExp)return Te(a,p);if(a instanceof Function){for(var k=arguments.length,x=new Array(k>2?k-2:0),w=2;w<k;w++)x[w-2]=arguments[w];return!!a(p,...x)}return!1},Tl=function(a,p,k){if(!X[p]&&Ts(p)&&On(_.tagNameCheck,p))return!1;if(mr&&!ft[p]&&!ft[kt(p)]){let x=T(a),w=N(a);if(w&&x){let L=w.length;for(let D=L-1;D>=0;--D){let fe=a===k?S(w[D],!0):w[D];x.insertBefore(fe,q(a))}}}return Qe(a),!0},bs=function(a,p,k,x){return a.length===0?p:p===k||p===x?Pe(p):p},Ot=function(a,p){return a===p||T(a)!==null?!1:(hr&&_r(a),!0)},Ar=function(a,p){if(xl(a),$e(j.beforeSanitizeElements,a,null),Ot(a,p))return!0;if(Rn(a))return Qe(a),!0;let k=pe(R(a));if(Z=bs(j.uponSanitizeElement,Z,l,Tn),$e(j.uponSanitizeElement,a,{tagName:k,allowedTags:Z}),Ot(a,p))return!0;if(El(a,k))return Qe(a),!0;if(X[k]||!(V.tagCheck instanceof Function&&V.tagCheck(k))&&!Z[k]){let x=Tl(a,k,p);return x===!1&&($e(j.afterSanitizeElements,a,null),Ot(a,p))?!0:x}if(B(a)===ue.element&&!fl(a)||(k==="noscript"||k==="noembed"||k==="noframes")&&Te(bc,a.innerHTML))return Qe(a),!0;if(We&&a.nodeType===ue.text){let x=An(a.textContent);a.textContent!==x&&(Yt(t.removed,{element:a.cloneNode()}),a.textContent=x)}return $e(j.afterSanitizeElements,a,null),Ot(a,p)},Es=function(a,p,k){if(Y[p]||gs(p,a)||es&&(p==="id"||p==="name")&&(k in n||k in cl))return!1;let x=u[p]||V.attributeCheck instanceof Function&&V.attributeCheck(p,a);return dr&&Te(Ce,p)||Zo&&Te(Gt,p)?!0:x?is[p]||Te(Ft,Jt(k,En,""))||(p==="src"||p==="xlink:href"||p==="href")&&a!=="script"&&js(k,"data:")===0&&os[a]||Qo&&!Te(Ht,Jt(k,En,""))?!0:!k:Ts(a)&&On(_.tagNameCheck,a)&&On(_.attributeNameCheck,p,a)||p==="is"&&_.allowCustomizedBuiltInElements&&On(_.tagNameCheck,k)},Sl=H({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Ts=function(a){return!Sl[kt(a)]&&Te(_t,a)},_l=function(a,p,k,x){if(oe&&typeof f=="object"&&typeof f.getAttributeType=="function"&&!k)switch(f.getAttributeType(a,p)){case"TrustedHTML":return Xe(x);case"TrustedScriptURL":return Ee(x)}return x},yl=function(a,p,k,x){try{return k?a.setAttributeNS(k,p,x):a.setAttribute(p,x),Rn(a)?(Qe(a),!1):!0}catch{return Rt(p,a),!1}},Ss=function(a,p){return dt&&Te(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,p)?!0:kt(a)==="attributename"&&Bs(p,"href")!==null},Rr=function(a,p){if($e(j.beforeSanitizeAttributes,a,null),Ot(a,p))return;let k=a.attributes;if(!k||Rn(a))return;u=bs(j.uponSanitizeAttribute,u,y,Sn);let x={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:u,forceKeepAttr:void 0},w=k.length,L=pe(a.nodeName);for(;w--;){let D=k[w],fe=D.name,ze=D.namespaceURI,ye=D.value,Ae=pe(fe),It=ye,Re=fe==="value"?It:tc(It),_s=!1;if(x.attrName=Ae,x.attrValue=Re,x.keepAttr=!0,x.forceKeepAttr=void 0,$e(j.uponSanitizeAttribute,a,x),Re=x.attrValue,ts&&(Ae==="id"||Ae==="name")&&js(Re,ns)!==0&&(Rt(fe,a,D),Re=ns+Re,_s=!0),Ss(fe,Re)){Rt(fe,a,D);continue}if(!x.forceKeepAttr){if(!x.keepAttr){Rt(fe,a,D);continue}if(!pr&&Te(Qs,Re)){Rt(fe,a,D);continue}if(We&&(Re=An(Re)),!Es(L,Ae,Re)){Rt(fe,a,D);continue}Re=_l(L,Ae,ze,Re),Re!==It&&yl(a,fe,ze,Re)&&_s&&zs(t.removed)}}$e(j.afterSanitizeAttributes,a,null),Ot(a,p)},jt=function(a){let p=null,k=wr(a);for($e(j.beforeSanitizeShadowDOM,a,null);p=k.nextNode();)if($e(j.uponSanitizeShadowNode,p,null),Ar(p,a),Rr(p,a),et(p.content)&&jt(p.content),B(p)===ue.element){let x=U(p);et(x)&&(Or(x),jt(x))}We&&xs(a),$e(j.afterSanitizeShadowDOM,a,null)},Or=function(a){let p=[{node:a,shadow:null}];for(;p.length>0;){let k=p.pop();if(k.shadow){jt(k.shadow);continue}let x=k.node,w=B(x)===ue.element,L=N(x);if(L)for(let D=L.length-1;D>=0;--D)p.push({node:L[D],shadow:null});if(w){let D=he?he(x):null;if(typeof D=="string"&&pe(D)==="template"){let fe=x.content;et(fe)&&p.push({node:fe,shadow:null})}}if(w){let D=U(x);et(D)&&p.push({node:null,shadow:D},{node:D,shadow:null})}}};return t.sanitize=function(b){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},p=null,k=null,x=null,w=null;if(gr=!b,gr&&(b="<!-->"),typeof b!="string"&&!Bt(b)&&(b=sc(b),typeof b!="string"))throw Je("dirty is not a string, aborting");if(!t.isSupported)return b;ur?(Z=Tn,u=Sn):Er(a),(j.uponSanitizeElement.length>0||j.uponSanitizeAttribute.length>0)&&(Z=Pe(Z)),j.uponSanitizeAttribute.length>0&&(u=Pe(u)),t.removed=[];let L=hr&&typeof b!="string"&&Bt(b),D=[],fe=ut;if(L){bl(b);let Ae=R(b);if(typeof Ae=="string"){let It=pe(Ae);if(!Z[It]||X[It])throw Tr(b),Je("root node is forbidden and cannot be sanitized in-place")}if(Rn(b))throw Tr(b),Je("root node is clobbered and cannot be sanitized in-place");D=yr(b),ut=jr()}else if(Bt(b))p=ks("<!---->"),k=p.ownerDocument.importNode(b,!0),k.nodeType===ue.element&&k.nodeName==="BODY"||k.nodeName==="HTML"?p=k:p.appendChild(k),Or(p);else{if(!yt&&!We&&!pt&&b.indexOf("<")===-1)return oe&&yn?Xe(b):b;if(p=ks(b),!p)return yt?null:yn?C:""}p&&fr&&Qe(p.firstChild);let ze=L?b:p;try{L&&Or(b);let Ae=wr(ze);for(;x=Ae.nextNode();)Ar(x,ze),Rr(x,ze),et(x.content)&&jt(x.content);L&&gl(b,D)}catch(Ae){throw L&&(Tr(b),hs(b,D)),Ae}finally{ut=fe}if(L){if(hs(b,D))throw Je("a node selected for removal could not be safely returned; refusing to sanitize in place");return We&&vr(b),b}if(yt){if(We&&vr(p),_n)for(w=hn.call(p.ownerDocument);p.firstChild;)w.appendChild(p.firstChild);else w=p;return(u.shadowroot||u.shadowrootmode)&&(w=St.call(r,w,!0)),w}let ye=pt?p.outerHTML:p.innerHTML;return pt&&Z["!doctype"]&&p.ownerDocument&&p.ownerDocument.doctype&&p.ownerDocument.doctype.name&&Te(kc,p.ownerDocument.doctype.name)&&(ye="<!DOCTYPE "+p.ownerDocument.doctype.name+`>
`+ye),We&&(ye=An(ye)),oe&&yn?Xe(ye):ye},t.setConfig=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Er(b),ur=!0,Tn=Z,Sn=u},t.clearConfig=function(){At=null,ur=!1,Tn=null,Sn=null,oe=de,C=""},t.isValidAttribute=function(b,a,p){At||Er({});let k=pe(b),x=pe(a);return typeof p=="string"&&(Ss(a,p)||!pr&&Te(Qs,p))?!1:Es(k,x,p)},t.addHook=function(b,a){typeof a=="function"&&Oe(j,b)&&Yt(j[b],a)},t.removeHook=function(b,a){if(Oe(j,b)){if(a!==void 0){let p=Zl(j[b],a);return p===-1?void 0:ec(j[b],p,1)[0]}return zs(j[b])}},t.removeHooks=function(b){Oe(j,b)&&(j[b]=[])},t.removeAllHooks=function(){j=ei()},t}var ai=ii();function oo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var bt=oo();function mi(e){bt=e}var nn={exec:()=>null};function z(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,s)=>{let i=typeof s=="string"?s:s.source;return i=i.replace(ve.caret,"$1"),n=n.replace(o,i),r},getRegex:()=>new RegExp(n,t)};return r}var _c=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},yc=/^(?:[ \t]*(?:\n|$))+/,wc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,vc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ac=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,so=/(?:[*+-]|\d{1,9}[.)])/,hi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,gi=z(hi).replace(/bull/g,so).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Rc=z(hi).replace(/bull/g,so).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),io=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Oc=/^[^\n]+/,ao=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ic=z(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ao).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Cc=z(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,so).getRegex(),jn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Lc=z("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lo).replace("tag",jn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ki=z(io).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jn).getRegex(),Nc=z(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ki).getRegex(),co={blockquote:Nc,code:wc,def:Ic,fences:vc,heading:Ac,hr:rn,html:Lc,lheading:gi,list:Cc,newline:yc,paragraph:ki,table:nn,text:Oc},li=z("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jn).getRegex(),Pc={...co,lheading:Rc,table:li,paragraph:z(io).replace("hr",rn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",li).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",jn).getRegex()},Mc={...co,html:z(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:z(io).replace("hr",rn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",gi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Uc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Dc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,xi=/^( {2,}|\\)\n(?!\s*$)/,$c=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xn=/[\p{P}\p{S}]/u,po=/[\s\p{P}\p{S}]/u,bi=/[^\s\p{P}\p{S}]/u,Gc=z(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,po).getRegex(),Ei=/(?!~)[\p{P}\p{S}]/u,Hc=/(?!~)[\s\p{P}\p{S}]/u,Fc=/(?:[^\s\p{P}\p{S}]|~)/u,zc=z(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",_c?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ti=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Bc=z(Ti,"u").replace(/punct/g,Xn).getRegex(),jc=z(Ti,"u").replace(/punct/g,Ei).getRegex(),Si="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Xc=z(Si,"gu").replace(/notPunctSpace/g,bi).replace(/punctSpace/g,po).replace(/punct/g,Xn).getRegex(),Wc=z(Si,"gu").replace(/notPunctSpace/g,Fc).replace(/punctSpace/g,Hc).replace(/punct/g,Ei).getRegex(),Kc=z("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,bi).replace(/punctSpace/g,po).replace(/punct/g,Xn).getRegex(),Vc=z(/\\(punct)/,"gu").replace(/punct/g,Xn).getRegex(),Yc=z(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),qc=z(lo).replace("(?:-->|$)","-->").getRegex(),Jc=z("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",qc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Fn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Zc=z(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Fn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_i=z(/^!?\[(label)\]\[(ref)\]/).replace("label",Fn).replace("ref",ao).getRegex(),yi=z(/^!?\[(ref)\](?:\[\])?/).replace("ref",ao).getRegex(),Qc=z("reflink|nolink(?!\\()","g").replace("reflink",_i).replace("nolink",yi).getRegex(),ci=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,uo={_backpedal:nn,anyPunctuation:Vc,autolink:Yc,blockSkip:zc,br:xi,code:Dc,del:nn,emStrongLDelim:Bc,emStrongRDelimAst:Xc,emStrongRDelimUnd:Kc,escape:Uc,link:Zc,nolink:yi,punctuation:Gc,reflink:_i,reflinkSearch:Qc,tag:Jc,text:$c,url:nn},ed={...uo,link:z(/^!?\[(label)\]\((.*?)\)/).replace("label",Fn).getRegex(),reflink:z(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Fn).getRegex()},to={...uo,emStrongRDelimAst:Wc,emStrongLDelim:jc,url:z(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ci).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:z(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ci).getRegex()},td={...to,br:z(xi).replace("{2,}","*").getRegex(),text:z(to.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hn={normal:co,gfm:Pc,pedantic:Mc},Qt={normal:uo,gfm:to,breaks:td,pedantic:ed},nd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},di=e=>nd[e];function Be(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,di)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,di);return e}function pi(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function ui(e,t){let n=e.replace(ve.findPipe,(s,i,c)=>{let d=!1,m=i;for(;--m>=0&&c[m]==="\\";)d=!d;return d?"|":" |"}),r=n.split(ve.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(ve.slashPipe,"|");return r}function en(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let s=e.charAt(r-o-1);if(s===t&&!n)o++;else if(s!==t&&n)o++;else break}return e.slice(0,r-o)}function rd(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function fi(e,t,n,r,o){let s=t.href,i=t.title||null,c=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let d={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:s,title:i,text:c,tokens:r.inlineTokens(c)};return r.state.inLink=!1,d}function od(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(s=>{let i=s.match(n.other.beginningSpace);if(i===null)return s;let[c]=i;return c.length>=o.length?s.slice(o.length):s}).join(`
`)}var zn=class{options;rules;lexer;constructor(e){this.options=e||bt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:en(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=od(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=en(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:en(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=en(t[0],`
`).split(`
`),r="",o="",s=[];for(;n.length>0;){let i=!1,c=[],d;for(d=0;d<n.length;d++)if(this.rules.other.blockquoteStart.test(n[d]))c.push(n[d]),i=!0;else if(!i)c.push(n[d]);else break;n=n.slice(d);let m=c.join(`
`),f=m.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${m}`:m,o=o?`${o}
${f}`:f;let E=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,s,!0),this.lexer.state.top=E,n.length===0)break;let S=s.at(-1);if(S?.type==="code")break;if(S?.type==="blockquote"){let O=S,P=O.raw+`
`+n.join(`
`),q=this.blockquote(P);s[s.length-1]=q,r=r.substring(0,r.length-O.raw.length)+q.raw,o=o.substring(0,o.length-O.text.length)+q.text;break}else if(S?.type==="list"){let O=S,P=O.raw+`
`+n.join(`
`),q=this.list(P);s[s.length-1]=q,r=r.substring(0,r.length-S.raw.length)+q.raw,o=o.substring(0,o.length-O.raw.length)+q.raw,n=P.substring(s.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:s,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),i=!1;for(;e;){let d=!1,m="",f="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;m=t[0],e=e.substring(m.length);let E=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),S=e.split(`
`,1)[0],O=!E.trim(),P=0;if(this.options.pedantic?(P=2,f=E.trimStart()):O?P=t[1].length+1:(P=t[2].search(this.rules.other.nonSpaceChar),P=P>4?1:P,f=E.slice(P),P+=t[1].length),O&&this.rules.other.blankLine.test(S)&&(m+=S+`
`,e=e.substring(S.length+1),d=!0),!d){let T=this.rules.other.nextBulletRegex(P),U=this.rules.other.hrRegex(P),K=this.rules.other.fencesBeginRegex(P),J=this.rules.other.headingBeginRegex(P),he=this.rules.other.htmlBeginRegex(P);for(;e;){let ge=e.split(`
`,1)[0],B;if(S=ge,this.options.pedantic?(S=S.replace(this.rules.other.listReplaceNesting,"  "),B=S):B=S.replace(this.rules.other.tabCharGlobal,"    "),K.test(S)||J.test(S)||he.test(S)||T.test(S)||U.test(S))break;if(B.search(this.rules.other.nonSpaceChar)>=P||!S.trim())f+=`
`+B.slice(P);else{if(O||E.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(E)||J.test(E)||U.test(E))break;f+=`
`+S}!O&&!S.trim()&&(O=!0),m+=ge+`
`,e=e.substring(ge.length+1),E=B.slice(P)}}o.loose||(i?o.loose=!0:this.rules.other.doubleBlankLine.test(m)&&(i=!0));let q=null,N;this.options.gfm&&(q=this.rules.other.listIsTask.exec(f),q&&(N=q[0]!=="[ ] ",f=f.replace(this.rules.other.listReplaceTask,""))),o.items.push({type:"list_item",raw:m,task:!!q,checked:N,loose:!1,text:f,tokens:[]}),o.raw+=m}let c=o.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let d=0;d<o.items.length;d++)if(this.lexer.state.top=!1,o.items[d].tokens=this.lexer.blockTokens(o.items[d].text,[]),!o.loose){let m=o.items[d].tokens.filter(E=>E.type==="space"),f=m.length>0&&m.some(E=>this.rules.other.anyLine.test(E.raw));o.loose=f}if(o.loose)for(let d=0;d<o.items.length;d++)o.items[d].loose=!0;return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ui(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?s.align.push("right"):this.rules.other.tableAlignCenter.test(i)?s.align.push("center"):this.rules.other.tableAlignLeft.test(i)?s.align.push("left"):s.align.push(null);for(let i=0;i<n.length;i++)s.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:s.align[i]});for(let i of o)s.rows.push(ui(i,s.header.length).map((c,d)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:s.align[d]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=en(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else{let s=rd(t[2],"()");if(s===-2)return;if(s>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],o=s[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),fi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return fi(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,s,i,c=o,d=0,m=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(m.lastIndex=0,t=t.slice(-1*e.length+o);(r=m.exec(t))!=null;){if(s=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!s)continue;if(i=[...s].length,r[3]||r[4]){c+=i;continue}else if((r[5]||r[6])&&o%3&&!((o+i)%3)){d+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+d);let f=[...r[0]][0].length,E=e.slice(0,o+r.index+f+i);if(Math.min(o,i)%2){let O=E.slice(1,-1);return{type:"em",raw:E,text:O,tokens:this.lexer.inlineTokens(O)}}let S=E.slice(2,-2);return{type:"strong",raw:E,text:S,tokens:this.lexer.inlineTokens(S)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ge=class no{tokens;options;state;tokenizer;inlineQueue;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||bt,this.options.tokenizer=this.options.tokenizer||new zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ve,block:Hn.normal,inline:Qt.normal};this.options.pedantic?(n.block=Hn.pedantic,n.inline=Qt.pedantic):this.options.gfm&&(n.block=Hn.gfm,this.options.breaks?n.inline=Qt.breaks:n.inline=Qt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Hn,inline:Qt}}static lex(t,n){return new no(n).lex(t)}static lexInline(t,n){return new no(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(i=>(o=i.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let i=n.at(-1);o.raw.length===1&&i!==void 0?i.raw+=`
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
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(o);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let d=Object.keys(this.tokens.links);if(d.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)d.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let s;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)s=o[2]?o[2].length:0,r=r.slice(0,o.index+s)+"["+"a".repeat(o[0].length-s-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,c="";for(;t;){i||(c=""),i=!1;let d;if(this.options.extensions?.inline?.some(f=>(d=f.call({lexer:this},t,n))?(t=t.substring(d.raw.length),n.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);let f=n.at(-1);d.type==="text"&&f?.type==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(d=this.tokenizer.emStrong(t,r,c)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.del(t)){t=t.substring(d.raw.length),n.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),n.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),n.push(d);continue}let m=t;if(this.options.extensions?.startInline){let f=1/0,E=t.slice(1),S;this.options.extensions.startInline.forEach(O=>{S=O.call({lexer:this},E),typeof S=="number"&&S>=0&&(f=Math.min(f,S))}),f<1/0&&f>=0&&(m=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(m)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(c=d.raw.slice(-1)),i=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=d.raw,f.text+=d.text):n.push(d);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},Bn=class{options;parser;constructor(e){this.options=e||bt}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(ve.notSpaceStart)?.[0],o=e.replace(ve.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Be(r)+'">'+(n?o:Be(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:Be(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let c=e.items[i];r+=this.listitem(c)}let o=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return"<"+o+s+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Be(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=pi(e);if(o===null)return r;e=o;let s='<a href="'+e+'"';return t&&(s+=' title="'+Be(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=pi(e);if(o===null)return Be(n);e=o;let s=`<img src="${e}" alt="${n}"`;return t&&(s+=` title="${Be(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Be(e.text)}},fo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}},He=class ro{options;renderer;textRenderer;constructor(t){this.options=t||bt,this.options.renderer=this.options.renderer||new Bn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new fo}static parse(t,n){return new ro(n).parse(t)}static parseInline(t,n){return new ro(n).parseInline(t)}parse(t,n=!0){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let c=s,d=this.options.extensions.renderers[c.type].call({parser:this},c);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(c.type)){r+=d||"";continue}}let i=s;switch(i.type){case"space":{r+=this.renderer.space(i);continue}case"hr":{r+=this.renderer.hr(i);continue}case"heading":{r+=this.renderer.heading(i);continue}case"code":{r+=this.renderer.code(i);continue}case"table":{r+=this.renderer.table(i);continue}case"blockquote":{r+=this.renderer.blockquote(i);continue}case"list":{r+=this.renderer.list(i);continue}case"html":{r+=this.renderer.html(i);continue}case"def":{r+=this.renderer.def(i);continue}case"paragraph":{r+=this.renderer.paragraph(i);continue}case"text":{let c=i,d=this.renderer.text(c);for(;o+1<t.length&&t[o+1].type==="text";)c=t[++o],d+=`
`+this.renderer.text(c);n?r+=this.renderer.paragraph({type:"paragraph",raw:d,text:d,tokens:[{type:"text",raw:d,text:d,escaped:!0}]}):r+=d;continue}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let s=t[o];if(this.options.extensions?.renderers?.[s.type]){let c=this.options.extensions.renderers[s.type].call({parser:this},s);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){r+=c||"";continue}}let i=s;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}},tn=class{options;block;constructor(e){this.options=e||bt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ge.lex:Ge.lexInline}provideParser(){return this.block?He.parse:He.parseInline}},sd=class{defaults=oo();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=He;Renderer=Bn;TextRenderer=fo;Lexer=Ge;Tokenizer=zn;Hooks=tn;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let s of o.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of o.rows)for(let i of s)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(s=>{let i=o[s].flat(1/0);n=n.concat(this.walkTokens(i,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let s=t.renderers[o.name];s?t.renderers[o.name]=function(...i){let c=o.renderer.apply(this,i);return c===!1&&(c=s.apply(this,i)),c}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[o.level];s?s.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Bn(this.defaults);for(let s in n.renderer){if(!(s in o))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let i=s,c=n.renderer[i],d=o[i];o[i]=(...m)=>{let f=c.apply(o,m);return f===!1&&(f=d.apply(o,m)),f||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new zn(this.defaults);for(let s in n.tokenizer){if(!(s in o))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let i=s,c=n.tokenizer[i],d=o[i];o[i]=(...m)=>{let f=c.apply(o,m);return f===!1&&(f=d.apply(o,m)),f}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new tn;for(let s in n.hooks){if(!(s in o))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let i=s,c=n.hooks[i],d=o[i];tn.passThroughHooks.has(s)?o[i]=m=>{if(this.defaults.async&&tn.passThroughHooksRespectAsync.has(s))return(async()=>{let E=await c.call(o,m);return d.call(o,E)})();let f=c.call(o,m);return d.call(o,f)}:o[i]=(...m)=>{if(this.defaults.async)return(async()=>{let E=await c.apply(o,m);return E===!1&&(E=await d.apply(o,m)),E})();let f=c.apply(o,m);return f===!1&&(f=d.apply(o,m)),f}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(i){let c=[];return c.push(s.call(this,i)),o&&(c=c.concat(o.call(this,i))),c}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ge.lex(e,t??this.defaults)}parser(e,t){return He.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},s=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return s(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let i=o.hooks?await o.hooks.preprocess(t):t,c=await(o.hooks?await o.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(i,o),d=o.hooks?await o.hooks.processAllTokens(c):c;o.walkTokens&&await Promise.all(this.walkTokens(d,o.walkTokens));let m=await(o.hooks?await o.hooks.provideParser():e?He.parse:He.parseInline)(d,o);return o.hooks?await o.hooks.postprocess(m):m})().catch(s);try{o.hooks&&(t=o.hooks.preprocess(t));let i=(o.hooks?o.hooks.provideLexer():e?Ge.lex:Ge.lexInline)(t,o);o.hooks&&(i=o.hooks.processAllTokens(i)),o.walkTokens&&this.walkTokens(i,o.walkTokens);let c=(o.hooks?o.hooks.provideParser():e?He.parse:He.parseInline)(i,o);return o.hooks&&(c=o.hooks.postprocess(c)),c}catch(i){return s(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Be(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},xt=new sd;function W(e,t){return xt.parse(e,t)}W.options=W.setOptions=function(e){return xt.setOptions(e),W.defaults=xt.defaults,mi(W.defaults),W};W.getDefaults=oo;W.defaults=bt;W.use=function(...e){return xt.use(...e),W.defaults=xt.defaults,mi(W.defaults),W};W.walkTokens=function(e,t){return xt.walkTokens(e,t)};W.parseInline=xt.parseInline;W.Parser=He;W.parser=He.parse;W.Renderer=Bn;W.TextRenderer=fo;W.Lexer=Ge;W.lexer=Ge.lex;W.Tokenizer=zn;W.Hooks=tn;W.parse=W;var gf=W.options,kf=W.setOptions,xf=W.use,bf=W.walkTokens,Ef=W.parseInline;var Tf=He.parse,Sf=Ge.lex;var $="openchamber.sdk";var Ri=/^[a-z][a-z0-9-]{0,39}$/;var wi=e=>Object(e)===e&&!Array.isArray(e),mo=(e,t)=>Object.keys(e).every(n=>t.includes(n)),vi=e=>String(e)===e&&e.length>=1&&e.length<=60,Ai=e=>String(e)===e&&e.length>=1&&e.length<=80,Oi=e=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!wi(n)||!Ri.test(n.id)||!vi(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!mo(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!mo(n,["kind","id","label","value","options","disabled"])||!Ai(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!wi(o)||!mo(o,["value","label"])||!Ai(o.value)||!vi(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var ho=e=>"bytes"in e?e.bytes.byteLength:e.content.length,Ii=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Ci=/^[A-Za-z0-9_-]{1,80}$/;var Li=["left","right","top","bottom"];var Ni=(e,t=0,n={remaining:16e3})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!Ni(o,t+1,n))return!1;return!0},go=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(t=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(go);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(go)}return String(e)===e||Number.isFinite(e)},ko=e=>{try{return String(e.id)!==e.id||!Ci.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Li.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Ni(e.data)||!go(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var Mi=["file","directory","other","missing"],bo=e=>!!(e&&"sessionId"in e),Eo=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Ui=/^[0-9a-f]{7,64}$/i,To=e=>Ui.test(e),Wn=500,Kn=32e3,Di=16e3,$i=128,Gi=200,Hi=2e3,Fi=16e3,zi=80,Bi=200,ji=16e3;var Xi=2e3;var So=2e4,Vn=1024,Yn=2e6;var qn=64e3,Jn=8e3,_o=4e3;var yo=9e4;var Wi=999,Ki=1e4,on=500,Vi=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Yi=["stopped","starting","ready","failed"],id=new Set(Vi),qi=e=>id.has(e),Ji=e=>e&&qi(e)?e:"HOST_REJECTED",Nt=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(Nt):Object(e)===e?Object.values(e).every(Nt):!1,Zi=e=>Nt(e)&&JSON.stringify(e).length<=ji,Pi=e=>e?.trim().slice(0,Bi)??"",Pt=e=>{let t=e.id.trim().slice(0,$i),n=e.title.trim().slice(0,Gi),r=e.url.trim().slice(0,Hi),o=e.text?.trim().slice(0,Fi),s=e.author?.trim().slice(0,zi),i=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o&&(c.text=o),s&&(c.author=s),i==="pull"){let d=Pi(e.branches?.head),m=Pi(e.branches?.base);d&&m&&(c.branches={head:d,base:m})}return Zi(e.data)&&(c.data=e.data),c},wo=e=>{let t=Pt(e);return e.projectId&&(t.projectId=e.projectId),e.navigation&&(t.navigation=e.navigation),e.worktree&&(t.worktree=e.worktree),t},vo=e=>{let t={text:e.text.trim().slice(0,Di)};return e.send&&(t.send=!0),t},Ao=e=>e===null||!Number.isFinite(e)?null:Math.min(Wi,Math.max(0,Math.round(e))),Ro=e=>Number.isFinite(e)?Math.min(Ki,Math.max(0,Math.ceil(e))):0;var Mt=e=>e.length>0&&e.length<=Vn&&!e.includes("\0")&&!e.includes("\\");var Zn=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Xi?!1:!e.split("/").some(n=>n==="."||n===".."),ad=new Set(Yi),Oo=e=>!!(e&&"status"in e&&ad.has(String(e.status))&&!("body"in e)),Qn=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Io=e=>!!(e&&"content"in e&&String(e.content)===e.content),Co=e=>!!(e&&"written"in e&&e.written===!0),Lo=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),ld=new Set(Mi),No=e=>!!(e&&"kind"in e&&"size"in e&&ld.has(String(e.kind))&&Number.isFinite(e.size)),Po=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),cd=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved"]),dd=e=>Object(e)===e?e:null,xo=e=>String(e)===e&&e.length>0,pd=e=>{if(!xo(e.id))return null;if(e.ok===!0){let t={channel:$,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(t.payload=e.payload),t}return e.ok===!1&&xo(e.error)?{channel:$,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Ji(xo(e.code)?e.code:void 0)}:null},Mo=e=>{let t=dd(e);return!t||t.channel!==$||t.v!==1?null:t.type==="result"?pd(t):!cd.has(String(t.type))||Object(t.payload)!==t.payload?null:t};var Qi=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,ud=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",I=class extends Error{code;constructor(t,n){super(n),this.name="HostRequestError",this.code=t}},ea=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),er=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${Vn} characters without NUL or backslash.`)),tr=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},M=e=>(e.value+=1,`oc-${e.value}`),Ho=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(l=>l===t.parent),r=e.requestTimeoutMs??So,o=new Set,s=new Set,i=new Set,c=new Set,d=new Set,m=new Set,f=new Set,E=new Set,S=new Set,O=null,P=null,q=new Set,N=new Set,T=null,U=null,K=!1,J=new Map,he=new Map,ge=new Map,B=!1,R={value:0},A=null,_e=null,oe=!1,C=!1,de=null,Dt=l=>l?{sessionId:l.id,phase:l.busy?"started":"completed"}:null,ke=l=>{t.parent.postMessage(l,"*")},ie=(l,u)=>{for(let y of l)try{y(u)}catch(_){console.error(_)}},Xe=l=>{if(!(l instanceof MessageEvent)||!n(l.source))return;let u=Mo(l.data);if(!u)return;if(u.type==="workspace"){let _=he.get(u.payload.subscriptionId);_&&ie([_],u.payload.snapshot);return}if(u.type==="shells"){let _=ge.get(u.payload.subscriptionId);_&&ie([_],u.payload.snapshot);return}if(u.type==="ready"){A=u.payload,_e=Dt(u.payload.session),ie(o,u.payload),ie(s,u.payload.directory),ie(i,u.payload.session),_e&&ie(c,_e),ie(d,u.payload.connection),ie(m,u.payload.settings),ie(f,u.payload.item);return}if(u.type==="directory"){A&&(A={...A,directory:u.payload.directory}),ie(s,u.payload.directory);return}if(u.type==="session"){A&&(A={...A,session:u.payload.session}),u.payload.session?_e?.sessionId!==u.payload.session.id&&(_e=Dt(u.payload.session)):_e=null,ie(i,u.payload.session);return}if(u.type==="session-lifecycle"){_e=u.payload,ie(c,u.payload);return}if(u.type==="connection"){A&&(A={...A,connection:u.payload.connection}),ie(d,u.payload.connection);return}if(u.type==="settings"){A&&(A={...A,settings:u.payload.settings}),ie(m,u.payload.settings);return}if(u.type==="item"){A&&(A={...A,item:u.payload.item}),ie(f,u.payload.item);return}if(u.type==="status-control-event"){ie(E,u.payload);return}if(u.type==="popover-closed"){ie(S,u.payload);return}if(u.type==="action"){let _=Y=>{B||ke({channel:$,v:1,type:"action-result",id:u.id,payload:Y})},X=P;if(!X){_({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>X(u.payload)).then(()=>_({ok:!0}),Y=>{let V=(Y instanceof Error?Y.message:String(Y)).trim();_({ok:!1,error:(V||"Action failed.").slice(0,on)})});return}if(u.type==="file-open"){let _=u.payload;if(U&&Ii(U,_))return;U=_,ie(q,u.payload);return}if(u.type==="file-saved"){ie(N,u.payload.version);return}if(u.type==="file-snapshot"){let _=V=>{B||ke({channel:$,v:1,type:"file-snapshot-result",id:u.id,payload:V})},X=V=>_({error:(V.trim()||"Could not read the edited file.").slice(0,on)}),Y=T;if(!Y){X("This extension does not edit files.");return}Promise.resolve().then(()=>Y(u.payload.purpose)).then(V=>{if(ho(V)>2e7){X(`The file is over ${2e7} ${"bytes"in V?"bytes":"characters"}.`);return}if(V.version.length>256){X(`The snapshot version is over ${256} characters.`);return}_({snapshot:"bytes"in V?{bytes:V.bytes,version:V.version}:{content:V.content,version:V.version}})},V=>X(V instanceof Error?V.message:String(V)));return}if(u.type==="resolve"){let _=Y=>{ke({channel:$,v:1,type:"resolve-result",id:u.id,payload:Y})},X=O;if(!X){_({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>X(u.payload)).then(Y=>_({item:Y?Pt(Y):null}),Y=>{let V=(Y instanceof Error?Y.message:String(Y)).trim();_({error:(V||"Command failed.").slice(0,on)})});return}let y=J.get(u.id);if(y){if(clearTimeout(y.timer),J.delete(u.id),u.ok){y.resolve(u.payload);return}y.reject(new I(u.code,u.error))}};t.addEventListener("message",Xe),ke({channel:$,v:1,type:"hello"});let Ee=(l,u=r)=>B||t.parent===t?Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((y,_)=>{let X=setTimeout(()=>{J.delete(l.id),_(new I("HOST_TIMEOUT","Host did not answer in time."))},u);J.set(l.id,{resolve:y,reject:_,timer:X}),ke(l)}),ae=l=>Ee(l).then(()=>{}),Q={channel:$,v:1},ct=l=>{!B&&t.parent!==t&&ke(l)},$t=()=>ct({...Q,type:"file-save"}),hn=l=>{!Qi(l)||!ud(l)||(l.preventDefault(),$t())},gn=l=>{!Qi(l)||l.key!=="Escape"||A?.surface!=="popover"||!A.popover||(l.preventDefault(),Ft(A.popover.id,"escape").catch(()=>{}))},St=()=>{let l=A?.surface==="popover"?A.popover:void 0;if(!l)return;let u=oe||C;de!==u&&(de=u,Z(l.id,u).catch(()=>{}))},j=()=>{A?.surface!=="popover"||oe||(oe=!0,St())},kn=l=>{A?.surface!=="popover"||l.relatedTarget!==null||!oe||(oe=!1,St())},xn=()=>{A?.surface!=="popover"||C||(C=!0,St())},bn=()=>{A?.surface!=="popover"||!C||(C=!1,St())},Ce=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new I("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},Gt=async l=>{l.kind!=="projects"&&Ce(l.projectId);let u=await Ee({...Q,type:"workspace-read",id:M(R),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return u},Ht=async(l,u)=>{l.kind!=="projects"&&Ce(l.projectId);let y=M(R);he.set(y,u);try{await ae({...Q,type:"workspace-subscribe",id:M(R),payload:{subscriptionId:y,query:l}})}catch(_){throw he.delete(y),B||ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:y}}),_}return()=>{!he.delete(y)||B||ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:y}})}},En=async(l,u)=>{l.kind==="session"&&Ce(l.sessionId),l.kind==="project"&&Ce(l.projectId);let y=M(R);ge.set(y,u);try{await ae({...Q,type:"shells-subscribe",id:M(R),payload:{subscriptionId:y,scope:l}})}catch(_){throw ge.delete(y),B||ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:y}}),_}return()=>{!ge.delete(y)||B||ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:y}})}},_t=async l=>{if("key"in l&&(l.key.length===0||l.key.length>128))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Nt(l.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>65536)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&A?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let u=await Ee({...Q,type:"storage",id:M(R),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new I("HOST_REJECTED","Host did not return storage data.");return u},Ft=(l,u)=>A?.features?.popovers!==!0&&!(A?.surface==="popover"&&A.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ae({...Q,type:"popover-close",id:M(R),payload:u?{id:l,reason:u}:{id:l}}),Z=(l,u)=>A?.features?.popovers!==!0&&!(A?.surface==="popover"&&A.popover?.id===l)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ae({...Q,type:"popover-anchor",id:M(R),payload:{id:l,active:u}});return t.addEventListener("keydown",gn,!0),t.addEventListener("pointerover",j),t.addEventListener("pointermove",j),t.addEventListener("pointerout",kn),t.addEventListener("focus",xn),t.addEventListener("blur",bn),{onAction:l=>(P=l,()=>{P===l&&(P=null)}),listProjects:async()=>{let l=await Gt({kind:"projects"});if(l.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return l},listWorktrees:async l=>{let u=await Gt({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return u},listSessions:async l=>{let u=await Gt({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return u},onProjects:l=>Ht({kind:"projects"},u=>{u.kind==="projects"&&l(u)}),onWorktrees:(l,u)=>Ht({kind:"worktrees",projectId:l},y=>{y.kind==="worktrees"&&u(y)}),onSessions:(l,u)=>Ht({kind:"sessions",projectId:l},y=>{y.kind==="sessions"&&u(y)}),onRunningShells:(l,u)=>En(l,u),readShellOutput:async(l,u)=>{Ce(l,128);let y=u?.cursor;if(y!==void 0&&(!Number.isInteger(y)||y<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let _=u?.tailBytes;if(_!==void 0&&(!Number.isInteger(_)||_<1||_>65536))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let Y=await Ee({...Q,type:"shell-output",id:M(R),payload:{shellId:l,cursor:y,tailBytes:_}});if(!Y||typeof Y.output!="string"||!Number.isFinite(Y.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return Y},stopShell:async l=>{if(Ce(l,128),(await Ee({...Q,type:"shell-stop",id:M(R),payload:{shellId:l}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async l=>{Ce(l),await ae({...Q,type:"open-session",id:M(R),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let y=tr(u),_={op:"get",key:l};y&&(_.scope=y);let X=await _t(_);return X.op==="get"&&X.found?X.value:void 0},set:async(l,u,y)=>{let _=tr(y),X={op:"set",key:l,value:u};_&&(X.scope=_),await _t(X)},delete:async(l,u)=>{let y=tr(u),_={op:"delete",key:l};y&&(_.scope=y),await _t(_)},keys:async l=>{let u=tr(l),y={op:"keys"};u&&(y.scope=u);let _=await _t(y);if(_.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return _.keys}},onReady:l=>(o.add(l),A&&l(A),()=>{o.delete(l)}),onDirectory:l=>(s.add(l),A&&l(A.directory),()=>{s.delete(l)}),onSession:l=>(i.add(l),A&&l(A.session),()=>{i.delete(l)}),onSessionLifecycle:l=>(c.add(l),_e&&l(_e),()=>{c.delete(l)}),onConnection:l=>(d.add(l),A&&l(A.connection),()=>{d.delete(l)}),onSettings:l=>(m.add(l),A&&l(A.settings),()=>{m.delete(l)}),onItem:l=>(f.add(l),A&&l(A.item),()=>{f.delete(l)}),onStatusControl:l=>(E.add(l),()=>{E.delete(l)}),onPopoverClosed:l=>(S.add(l),()=>{S.delete(l)}),setStatusControls:l=>A?.features?.statusControls!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support status controls.")):Oi(l)?ae({...Q,type:"status-controls",id:M(R),payload:{controls:l}}):Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:l=>A?.features?.popovers!==!0?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):ko(l)?ae({...Q,type:"popover-open",id:M(R),payload:l}):Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:Ft,setPopoverAnchorActive:Z,onResolve:l=>(O=l,()=>{O===l&&(O=null)}),toast:l=>{let u=l.message.trim();return!u||u.length>Wn?Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${Wn} characters.`)):l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>Kn)?Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${Kn} characters.`)):ae({channel:$,v:1,type:"toast",id:M(R),payload:{...l,message:u}})},openUrl:l=>ae({channel:$,v:1,type:"open-url",id:M(R),payload:{url:l}}),openCommit:l=>To(l)?ae({channel:$,v:1,type:"open-commit",id:M(R),payload:{sha:l}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:l=>ae({channel:$,v:1,type:"open-surface",id:M(R),payload:{surfaceId:l}}),writeClipboard:l=>ae({channel:$,v:1,type:"clipboard-write",id:M(R),payload:{text:l}}),compose:l=>ae({channel:$,v:1,type:"compose",id:M(R),payload:l}),attach:l=>ae({channel:$,v:1,type:"attach",id:M(R),payload:Pt(l)}),startSession:async l=>{l.projectId!==void 0&&Ce(l.projectId);let u=l.worktree;u&&u!==!0&&(u.kind==="existing"?Ce(u.directory):(u.name!==void 0&&Ce(u.name,200),u.baseBranch!==void 0&&Ce(u.baseBranch,200)));let y=await Ee({channel:$,v:1,type:"start-session",id:M(R),payload:wo(l)},e.requestTimeoutMs??18e4);if(!bo(y))throw new I("HOST_REJECTED","Host did not return a session.");return y},prompt:l=>Ee({channel:$,v:1,type:"prompt",id:M(R),payload:vo(l)}).then(u=>{if(!Eo(u))throw new I("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:l=>ae({channel:$,v:1,type:"session-link",id:M(R),payload:Pt(l)}),close:()=>ae({channel:$,v:1,type:"close",id:M(R)}),oauthStart:()=>ae({channel:$,v:1,type:"oauth-start",id:M(R)}),oauthDisconnect:()=>ae({channel:$,v:1,type:"oauth-disconnect",id:M(R)}),request:l=>(Zn(l.path)?Ee({channel:$,v:1,type:"request",id:M(R),payload:l}):ea()).then(u=>{if(!Qn(u))throw new I("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:l=>(Zn(l.path)?Ee({channel:$,v:1,type:"service-request",id:M(R),payload:l}):ea()).then(u=>{if(!Qn(u))throw new I("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>Ee({channel:$,v:1,type:"service-status",id:M(R)}).then(l=>{if(!Oo(l))throw new I("HOST_REJECTED","Host did not return service status.");return l}),readFile:l=>(Mt(l)?Ee({channel:$,v:1,type:"file-read",id:M(R),payload:{path:l}}):er()).then(u=>{if(!Io(u))throw new I("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>Mt(l)?u.length>Yn?Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${Yn} characters.`)):Ee({channel:$,v:1,type:"file-write",id:M(R),payload:{path:l,content:u}}).then(y=>{if(!Co(y))throw new I("HOST_REJECTED","Host did not confirm the write.");return y}):er(),listDir:l=>(Mt(l)?Ee({channel:$,v:1,type:"file-list",id:M(R),payload:{path:l}}):er()).then(u=>{if(!Lo(u))throw new I("HOST_REJECTED","Host did not return directory entries.");return u}),stat:l=>(Mt(l)?Ee({channel:$,v:1,type:"file-stat",id:M(R),payload:{path:l}}):er()).then(u=>{if(!No(u))throw new I("HOST_REJECTED","Host did not return file status.");return u}),generate:l=>{let u=l.prompt.trim(),y=l.system?.trim();if(u.length===0||u.length>qn)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${qn} characters.`));if(y!==void 0&&(y.length===0||y.length>Jn))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${Jn} characters.`));let _=l.maxOutputTokens===void 0?void 0:Math.min(_o,Math.max(1,Math.floor(l.maxOutputTokens)));if(_!==void 0&&!Number.isFinite(_))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let X={prompt:u};return y!==void 0&&(X.system=y),_!==void 0&&(X.maxOutputTokens=_),Ee({channel:$,v:1,type:"generate",id:M(R),payload:X},e.requestTimeoutMs??yo).then(Y=>{if(!Po(Y))throw new I("HOST_REJECTED","Host did not return generated text.");return Y})},setBadge:l=>ae({channel:$,v:1,type:"badge",id:M(R),payload:{count:Ao(l)}}),setHeight:l=>ae({channel:$,v:1,type:"resize",id:M(R),payload:{height:Ro(l)}}),onFileOpen:l=>(q.add(l),K||(K=!0,t.addEventListener("keydown",hn,!0)),U&&l(U),()=>{q.delete(l)}),onFileSnapshot:l=>(T=l,()=>{T===l&&(T=null)}),onFileSaved:l=>(N.add(l),()=>{N.delete(l)}),reportFileChange:l=>ct({...Q,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:$t,reportFileUnsupported:()=>ct({...Q,type:"file-unsupported"}),dispose:()=>{for(let l of he.keys())ke({...Q,type:"workspace-unsubscribe",id:M(R),payload:{subscriptionId:l}});he.clear();for(let l of ge.keys())ke({...Q,type:"shells-unsubscribe",id:M(R),payload:{subscriptionId:l}});ge.clear(),B=!0,O=null,P=null,T=null,q.clear(),N.clear(),K&&t.removeEventListener("keydown",hn,!0),t.removeEventListener("message",Xe),t.removeEventListener("keydown",gn,!0),t.removeEventListener("pointerover",j),t.removeEventListener("pointermove",j),t.removeEventListener("pointerout",kn),t.removeEventListener("focus",xn),t.removeEventListener("blur",bn);for(let l of J.values())clearTimeout(l.timer),l.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),o.clear(),s.clear(),i.clear(),c.clear(),d.clear(),m.clear(),f.clear(),E.clear(),S.clear()}}};var ra=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var Vf=new Set(ra);var oa=["none","agent","user"];var qf=new Set(oa);var G=Ho();var sa="var(--k-muted)",fd=/^#[0-9a-fA-F]{3}$/,md=/^#[0-9a-fA-F]{6}$/,hd=/^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,gd=/^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/,kd=/^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/,xd=/^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/;function Fo(e){if(typeof e!="string")return sa;let t=e.trim();return fd.test(t)||md.test(t)||hd.test(t)||gd.test(t)||kd.test(t)||xd.test(t)?t:sa}function h(e,t={},...n){let r=document.createElement(e);for(let[o,s]of Object.entries(t))if(s!=null){if(o==="dataset"){Object.assign(r.dataset,s);continue}if(o==="style"){r.setAttribute("style",String(s));continue}if(o.startsWith("on")&&typeof s=="function"){r.addEventListener(o.slice(2).toLowerCase(),s);continue}if(o==="className"&&typeof s=="string"){r.className=s;continue}r[o]=s}for(let o of n)o!=null&&r.append(typeof o=="string"?document.createTextNode(o):o);return r}function zo(e){e.replaceChildren()}function Bo(e){let t=h("div",{className:"md"});if(!e||e.trim().length===0)return t.append(h("p",{className:"muted"},"No description.")),t;let n=W.parse(e,{async:!1,gfm:!0,breaks:!0});return t.innerHTML=ai.sanitize(n,{USE_PROFILES:{html:!0}}),t.querySelectorAll("a[href]").forEach(r=>{let o=r.getAttribute("href")??"";r.setAttribute("rel","noreferrer noopener"),r.addEventListener("click",s=>{s.preventDefault(),/^https?:\/\//i.test(o)&&G.openUrl(o)})}),t.querySelectorAll("img").forEach(r=>{r.setAttribute("loading","lazy")}),t}function ia(e,t=320){let n=e??"",r=Bo(e);if(n.length<=t)return r;r.classList.add("md-collapsed");let o=h("button",{className:"link-button",type:"button"},"Show full description");return o.addEventListener("click",()=>{let s=r.classList.toggle("md-collapsed");o.textContent=s?"Show full description":"Show less"}),h("div",{className:"md-wrap"},r,o)}function sn(e){return e instanceof we?`${e.code}: ${e.message}`:e instanceof Error?e.message:String(e)}function aa(e,t){let n=typeof e=="object"&&e!==null?e:{};return typeof n.message=="string"&&n.message?n.message:typeof n.error=="string"&&n.error?n.error:t}async function bd(e,t="POST",n){let r=await G.serviceRequest({method:t,path:e,...n===void 0?{}:{body:JSON.stringify(n)}});return{status:r.status,body:r.body}}async function nr(e,t="POST",n){let r=await bd(e,t,n),o;try{o=JSON.parse(r.body)}catch{throw new we(r.status,"SERVICE_BAD_RESPONSE",`Kaneo service answered ${r.status} with a body that is not JSON.`)}if(r.status>=400)throw new we(r.status,"SERVICE_ERROR",aa(o,`Kaneo service answered ${r.status}.`));return o}async function la(e){let t=await G.serviceRequest({method:"POST",path:"/forward",body:JSON.stringify(e)}),n;try{n=JSON.parse(t.body)}catch{throw new we(t.status,"SERVICE_BAD_RESPONSE","Kaneo service answered with a body that is not JSON.")}let r=typeof n=="object"&&n!==null?n:{};if(typeof r.status!="number")throw new we(t.status>=400?t.status:502,"SERVICE_ERROR",aa(n,"Kaneo service returned an unexpected answer."));return{status:r.status,body:typeof r.body=="string"?r.body:""}}var ca=()=>nr("/account","GET"),da=e=>nr("/auth/device/start","POST",{origin:e}),pa=()=>nr("/auth/device/poll","POST"),ua=()=>nr("/auth/signout","POST");async function fa(){try{await ua()}catch(e){console.error("Disconnect Kaneo failed:",e),await G.toast({kind:"error",message:`Could not disconnect from Kaneo. ${sn(e)}`,dismiss:!0})}}async function an(e,t,n){let r;try{r=await n.get(e)}catch(o){return console.warn(`Storage read failed for key "${e}":`,o),t(void 0)}return t(r)}async function Ut(e,t,n){try{let r=JSON.parse(JSON.stringify(t));await n.set(e,r)}catch(r){console.warn(`Storage write failed for key "${e}":`,r)}}function ma(e){if(!e||typeof e!="object")return{};let t={};for(let[n,r]of Object.entries(e))!r||typeof r!="object"||typeof r.taskId!="string"||(t[n]={taskId:r.taskId,ticketId:typeof r.ticketId=="string"?r.ticketId:"",title:typeof r.title=="string"?r.title:"",at:typeof r.at=="number"?r.at:0,posted:Array.isArray(r.posted)?r.posted.filter(o=>typeof o=="string"):[]});return t}function ha(e,t=50){let n=Object.entries(e).sort((r,o)=>o[1].at-r[1].at).slice(0,Math.max(0,t));return Object.fromEntries(n)}var ga="preferences",Ed={workspaceId:null,projectId:null,openTaskId:null,priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1,serverUrl:""};function ka(e){if(typeof e!="object"||e===null)return{...Ed};let t=e,n=t.priorityFilter,r=n==="any"||!!n&&n in Vt;return{workspaceId:typeof t.workspaceId=="string"?t.workspaceId:null,projectId:typeof t.projectId=="string"?t.projectId:null,openTaskId:typeof t.openTaskId=="string"?t.openTaskId:null,priorityFilter:r?n:"any",statusFilter:typeof t.statusFilter=="string"?t.statusFilter:null,view:t.view==="kanban"||t.view==="mine"?t.view:"list",assigneeFilter:t.assigneeFilter==="me"?"me":"any",labelFilter:typeof t.labelFilter=="string"?t.labelFilter:null,createInWorktree:t.createInWorktree===!0,serverUrl:typeof t.serverUrl=="string"?t.serverUrl:""}}async function Et(){return an(ga,e=>ka(e),G.storage)}async function Me(e){let t=ka({...await Et(),...e});return await Ut(ga,t,G.storage),t}var jo="session-links";async function rr(){return an(jo,ma,G.storage)}async function xa(e,t){let n=await rr();n[e]={...t,at:Date.now(),posted:[]};let r=ha(n);await Ut(jo,r,G.storage)}async function ba(e,t){let n=await rr(),r=n[e];r&&(r.posted.includes(t)||r.posted.push(t),await Ut(jo,n,G.storage))}var ln=class extends Error{constructor(){super("This account is not a member of any Kaneo workspace."),this.name="NoWorkspaceError"}};async function Ea(e,t,n={}){if(!n.force){let E=await Sd();if(E&&Date.now()-E.at<Td)return E.context}let[r,o]=await Promise.all([e.currentUser().catch(()=>null),e.listWorkspaces()]);if(o.length===0)throw new ln;let s=await Et(),i=t?o.find(E=>E.slug===t):void 0,c=(s.workspaceId&&o.find(E=>E.id===s.workspaceId)?.id)??i?.id??o[0].id;c!==s.workspaceId&&await Me({workspaceId:c,projectId:null});let d=[],m=null;try{d=await e.listProjects(c)}catch(E){m=E instanceof Error?E:new Error(String(E))}let f={user:r,workspaces:o,workspaceId:c,projects:d,projectsError:m};return await _d(f),f}var Ta="bootstrap-cache",Td=6e4;async function Sd(){return an(Ta,e=>{if(!e||typeof e!="object")return null;let t=e;if(typeof t.at!="number"||!t.context||typeof t.context!="object")return null;let n=t.context;if(!Array.isArray(n.workspaces)||typeof n.workspaceId!="string")return null;let r={user:n.user??null,workspaces:n.workspaces??[],workspaceId:n.workspaceId,projects:n.projects??[],projectsError:t.errorMessage?new Error(t.errorMessage):null};return{at:t.at,context:r}},G.storage)}async function _d(e){await Ut(Ta,{at:Date.now(),context:e,errorMessage:e.projectsError?String(e.projectsError.message??e.projectsError):void 0},G.storage)}function Sa(e,t,n){if(e.length===0)return null;let r=e.find(i=>i.id===t);if(r)return r;let o=n?.toLowerCase();return(o?e.find(i=>i.slug.toLowerCase()===o):void 0)??e[0]}function _a(e){let t=e?.workspace?.trim(),n=e?.project?.trim();return{workspaceSlug:t||void 0,projectSlug:n||void 0}}function ya(e){let t=e?.trim()??"";if(!t)return{origin:Un,error:null};try{let n=new URL(t);if(n.protocol==="https:"&&!n.username&&!n.password&&(n.pathname==="/"||n.pathname==="")&&!n.search&&!n.hash)return{origin:n.origin,error:null}}catch{}return{origin:Un,error:"Enter an https origin, like https://cloud.kaneo.app."}}function wa(e,t){let n=!1,r=0,o=null,s="",i=()=>{o!==null&&(window.clearTimeout(o),o=null)},c=N=>!n&&N===r,d=N=>{n||e.replaceChildren(N)},m=N=>{let T=h("div",{className:"signin-card"});T.append(h("p",{className:"signin-hint"},"Connect to your Kaneo server. You will get a code to enter on Kaneo's own sign-in page."));let U=h("div",{className:"signin-field"});T.append(U),Gr(U,{label:"Kaneo server URL",value:s,placeholder:"https://cloud.kaneo.app",mono:!0,...N?{error:N}:{helper:"Optional. Defaults to the bundled origin."},onChange:J=>{s=J}});let K=h("div",{className:"signin-row"});T.append(K),xe(K,{label:"Sign in with Kaneo",size:"sm",onClick:()=>void q()}),d(T)},f=async()=>{let N=++r;i();let T=await Et().catch(()=>null);c(N)&&(s=T?.serverUrl??"",m())},E=(N,T)=>{if(!c(T))return;i();let U=h("div",{className:"signin-fill"});Kt(U,{tone:"error",title:"Kaneo",body:N,action:{label:"Start again",onClick:()=>void f()}}),d(U)},S=(N,T)=>{if(!c(T))return;let U=h("div",{className:"signin-card"});U.append(h("p",{className:"signin-hint"},"Enter this code in your browser to sign in to Kaneo")),U.append(h("div",{className:"signin-code"},N.userCode));let K=h("div",{className:"signin-row"});U.append(K),xe(K,{label:"Open Kaneo",variant:"secondary",size:"sm",onClick:()=>void G.openUrl(N.verificationUriComplete)}),xe(K,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>void f()});let J=h("div",{className:"signin-waiting"});U.append(J),st(J,{label:"Waiting for approval"}),d(U)},O=(N,T)=>{i(),o=window.setTimeout(()=>void P(N),Math.max(T,3)*1e3)},P=async N=>{if(!c(N))return;let T;try{T=await pa()}catch(U){E(sn(U),N);return}if(c(N))switch(T.status){case"pending":O(N,T.interval);return;case"connected":i(),t();return;case"expired":E("The code expired. Start again.",N);return;case"denied":E("Sign-in was denied on Kaneo.",N);return;default:E(T.message,N)}},q=async()=>{let N=ya(s);if(N.error){m(N.error);return}let T=++r;if(i(),await Me({serverUrl:s.trim()}).catch(()=>{}),!c(T))return;let U=h("div",{className:"signin-fill"});st(U,{label:"Starting sign-in"}),d(U);let K;try{K=await da(N.origin)}catch(J){E(sn(J),T);return}c(T)&&(S(K,T),O(T,K.interval),G.openUrl(K.verificationUriComplete).catch(()=>{}))};return f(),()=>{n=!0,i()}}var cn=864e5;function Xo(e,t){return t==null?e.toUpperCase():`${e.toUpperCase()}-${t}`}function Wo(e){let t=(e??"").trim();return t===""?"":t.includes(" ")?t:t.split(/[-_]+/).filter(Boolean).map(n=>n[0].toUpperCase()+n.slice(1)).join(" ")}function Ra(e,t,n){return`${Us}/dashboard/workspace/${e}/project/${t}/task/${n}`}var yd={"no-priority":"None",low:"Low",medium:"Medium",high:"High",urgent:"Urgent"};function je(e){return yd[e]??e}function Tt(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=Math.round((or(n).getTime()-or(t).getTime())/cn);return r===0?"Due today":r===1?"Due tomorrow":r===-1?"Due yesterday":r<0?`Overdue ${Math.abs(r)}d`:r<=7?`Due in ${r}d`:`Due ${n.toLocaleDateString(void 0,{month:"short",day:"numeric"})}`}function sr(e,t=new Date){if(!e)return!1;let n=new Date(e);return Number.isNaN(n.getTime())?!1:or(n).getTime()<or(t).getTime()}function or(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function Oa(e,t){let n=[`**${t.ticketId}** ${e.title}`],r=[];t.columnName&&r.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&r.push(`Priority: ${je(e.priority)}`),e.assigneeName&&r.push(`Assignee: ${e.assigneeName}`);let o=Tt(e.dueDate);o&&r.push(o),r.length>0&&n.push(r.join(" \xB7 ")),t.url&&n.push(t.url);let s=e.description?.trim();return s&&n.push("",s),n.join(`
`)}var wd=6e3;function vd(e){let t=e.user?.name??"Unknown",n=e.content.replace(/\s+/g," ").trim();return`- ${t}: ${n}`}function Ia(e,t){let n=[`Kaneo task ${t.ticketId}: ${e.title}`];t.projectName&&n.push(`Project: ${t.projectName}`),t.columnName&&n.push(`Status: ${t.columnName}`),e.priority&&e.priority!=="no-priority"&&n.push(`Priority: ${je(e.priority)}`),e.dueDate&&n.push(`Due: ${e.dueDate.slice(0,10)}`),t.url&&n.push(t.url);let r=e.description?.trim();r&&n.push("",r);let o=t.comments??[];if(o.length>0){n.push("","Comments:");let s=0;for(let i of o){let c=vd(i);if(s+c.length>wd)break;s+=c.length,n.push(c)}}return n.join(`
`)}function Ca(e){return`kaneo/${e.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,"")||"task"}`}var Ad={started:"OpenChamber session started",completed:"OpenChamber session completed",failed:"OpenChamber session failed"};function La(e,t,n,r){let o=Ad[e],s=t.trim()||"Untitled session";if(n){let i=n.replace(/\/+$/,""),c=r?`${i}/?session=${encodeURIComponent(r)}`:i;return`[${o}](${c}) \u2014 ${s}`}return`${o} \u2014 ${s}`}var va=6e4,Aa=36e5;function ir(e,t=Date.now()){if(!e)return null;let n=Date.parse(e);if(!Number.isFinite(n))return null;let r=Math.max(0,t-n);return r<va?"just now":r<Aa?`${Math.floor(r/va)}m`:r<cn?`${Math.floor(r/Aa)}h`:r<7*cn?`${Math.floor(r/cn)}d`:`${Math.floor(r/(7*cn))}w`}function Na(e){return e.isFinal?"done":/progress|started|active/.test(e.slug)?"progress":/review|test/.test(e.slug)?"review":/done|complete|closed|cancel/.test(e.slug)?"done":"blank"}function dn(e){return Ra(e.workspaceId,e.task.projectId,e.task.id)}function Rd(e){return{workspaceId:e.workspaceId,projectId:e.task.projectId,taskId:e.task.id,ticketId:e.ticketId,projectName:e.projectName??"",columnName:e.columnName}}function Pa(e){return{providerId:Ds,id:e.task.id,title:`${e.ticketId} ${e.task.title}`.slice(0,200),url:dn(e),text:Ia(e.task,{ticketId:e.ticketId,...e.projectName?{projectName:e.projectName}:{},columnName:e.columnName,url:dn(e),...e.comments&&e.comments.length>0?{comments:e.comments}:{}}),author:e.task.assigneeName??void 0,data:Rd(e)}}async function Od(e){await G.attach(Pa(e))}async function Id(e,t={}){let n=t.worktree?Ca(e.ticketId):void 0,r=await G.startSession({...Pa(e),navigation:"preserve",...n?{worktree:{kind:"new",name:n}}:{},text:`Work on ${e.ticketId}. Start by reading the task and restating the plan before changing anything.`,...t.projectId?{projectId:t.projectId}:{}});return r.sessionId===null?{sessionId:null,sent:r.sent,failure:r.failure,branch:r.worktree.branch}:{sessionId:r.sessionId,sent:r.sent,branch:r.worktree?.branch??n}}async function Ma(e){await Od(e),await G.toast({kind:"success",message:`${e.ticketId} attached to the chat.`})}async function Ua(e,t={}){let n=await Id(e,t);if(n.sessionId===null){let r=n.branch?` The worktree ${n.branch} was kept.`:"",o=n.failure?` (${n.failure})`:"";return await G.toast({kind:"error",message:`No session was created${o}.${r} Check the session list before retrying.`,dismiss:!0}),!1}return await xa(n.sessionId,{taskId:e.task.id,ticketId:e.ticketId,title:`${e.ticketId} ${e.task.title}`}),await G.toast({kind:"success",message:t.worktree&&n.branch?`Session started on ${n.branch} for ${e.ticketId}.`:`Session started for ${e.ticketId}.`}),!0}async function Da(e){await G.compose({mode:"append",text:`
${Oa(e.task,{ticketId:e.ticketId,...e.columnName?{columnName:e.columnName}:{},...dn(e)?{url:dn(e)}:{}})}
`})}async function $a(e){await G.openUrl(dn(e))}async function pn(e,t){console.error(`${e} failed:`,t);let n=t instanceof we?t.code:null,r=n?`${e} failed (${n}).`:`${e} failed.`;await G.toast({kind:"error",message:r.slice(0,400),dismiss:!0})}function Ga(e){return(e??"").trim().slice(0,1).toUpperCase()||"?"}function ar(e){return h("span",{className:"label-chip"},h("span",{className:"label-dot",style:`background:${Fo(e.color)}`}),e.name)}function Ha(e,t=2){if(e.length===0)return null;let n=e.slice(0,t),r=h("span",{className:"label-chips"});for(let o of n)r.append(ar(o));return e.length>n.length&&r.append(h("span",{className:"label-more"},`+${e.length-n.length}`)),r}function Fa(e){if(e.length===0)return null;let t=h("div",{className:"label-chips"});for(let n of e)t.append(ar(n));return t}function za(e){return h("span",{className:"person"},h("span",{className:"person-avatar"},Ga(e)),h("span",{className:"person-name"},e))}function Ba(e){return h("span",{className:"person-avatar"},Ga(e))}function Ko(e,t,n,r={}){let o=xe(e,{label:t,variant:r.variant??"secondary",size:"sm",onClick:()=>{o.update({loading:!0}),n().catch(s=>pn(t,s)).finally(()=>o.update({loading:!1}))}});r.block&&e.classList.add("block")}function Cd(e,t){let n=h("div",{className:"detail-header"}),r=h("div");n.append(r),xe(r,{label:"Back",variant:"ghost",size:"sm",onClick:t});let o=h("div",{style:"margin-left:auto;"});return n.append(o),xe(o,{label:"Open in Kaneo",variant:"ghost",size:"sm",onClick:()=>void $a(e)}),n}function Ld(e){return h("div",{className:"detail-heading"},h("div",{className:"detail-id"},e.ticketId),h("h2",{className:"detail-title"},e.task.title))}function Nd(e,t,n){let r=h("div",{className:"detail-row"});if(t.length>0){let o=h("div",{className:"detail-status"});r.append(o),Wt(o,{value:e.task.status,options:t.map(s=>({id:s.id,label:s.name})),onChange:n.onMove})}if(n.canClose){let o=h("div");r.append(o),xe(o,{label:"Close issue",variant:"outline",size:"sm",onClick:n.onClose})}return r}function Pd(e){let{task:t}=e,n=h("dl",{className:"meta-grid"}),r=[];e.projectName&&r.push(["Project",e.projectName]),t.priority!=="no-priority"&&r.push(["Priority",je(t.priority)]),r.push(["Assignee",t.assigneeName??"Unassigned"]);let o=Tt(t.dueDate);o&&r.push(["Due",o]);let s=t.subtaskCounts;s&&s.total>0&&r.push(["Subtasks",`${s.completed}/${s.total} done`]),t.descriptionDeferred&&r.push(["Description","Too large to inline; open the task for the full text."]);for(let[c,d]of r)n.append(h("dt",{},c),h("dd",{},d));let i=Fa(t.labels??[]);if(i){let c=h("dd",{className:"meta-labels"});c.append(i),n.append(h("dt",{},"Labels"),c)}return n}function Md(e,t=320){return h("div",{className:"detail-section"},ia(e.task.description,t))}function Ud(e){let t=h("div",{className:"detail-section"});if(t.append(h("h3",{className:"detail-section-title"},"Comments")),!e)return t;if(e.error)return t.append(h("p",{className:"muted"},`Comments unavailable: ${e.error}`)),t;if(e.loading)return t.append(h("p",{className:"muted"},"Loading comments\u2026")),t;let n=e.items??[];if(n.length===0)return t.append(h("p",{className:"muted"},"No comments yet.")),t;let r=h("div",{className:"comments"});return n.forEach((o,s)=>{let i=s===n.length-1,c=ir(o.createdAt),d=h("div",{className:"comment"});i||d.append(h("div",{className:"comment-line"})),d.append(Ba(o.user?.name));let m=h("div",{className:"comment-card"});m.append(h("div",{className:"comment-head"},h("span",{className:"comment-author"},o.user?.name??"Unknown"),c?h("span",{},c):null),h("div",{className:"comment-body"},Bo(o.content))),d.append(m),r.append(d)}),t.append(r),t}function Dd(e,t){let n=h("div",{className:"detail-body"});return n.append(Ld(e)),(t.columns.length>0||t.canCloseIssue)&&n.append(Nd(e,t.columns,{onMove:t.onMove,onClose:t.onCloseIssue,canClose:t.canCloseIssue})),n.append(Pd(e)),n.append(Md(e,1200)),n.append(Ud(t.comments)),n}function $d(e,t){let n=h("div",{className:"detail-footer"}),r=h("div");n.append(r),Fr(r,{label:"Create in a new worktree",checked:t.worktree,onChange:t.onWorktreeChange});let o=h("div",{className:"detail-start block"});if(n.append(o),Ko(o,"Start session",()=>Ua(e,{worktree:t.worktree}).then(()=>{}),{variant:"default",block:!0}),t.showChatActions!==!1){let s=h("div",{className:"toolbar detail-secondary"});n.append(s),Ko(s,"Attach",()=>Ma(e)),Ko(s,"Send to chat",()=>Da(e))}return n}function ja(e,t){let n=h("div",{className:"detail"});return n.append(Cd(e,t.onBack)),n.append(Dd(e,t)),n.append($d(e,t)),n}var Gd={started:"started",completed:"completed",failure:"failed"},Xa=!1;function Wa(e,t){Xa||(Xa=!0,G.onSessionLifecycle(async n=>{let r=Gd[n.phase];if(!r)return;let s=(await rr())[n.sessionId];if(!(!s||s.posted.includes(r))){await ba(n.sessionId,r);try{await e.createComment(s.taskId,La(r,s.title,t,n.sessionId))}catch{}}}))}var Hd={blank:"var(--oc-muted)",progress:"var(--oc-primary)",review:"var(--oc-warning)",done:"var(--oc-success)"};function Fd(e){let t=Hd[e],n={blank:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/>`,progress:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="3" fill="${t}"/>`,review:`<circle cx="8" cy="8" r="6.5" fill="none" stroke="${t}" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="${t}"/><path d="M8 4.5 A3.5 3.5 0 0 1 11.5 8" stroke="${t}" stroke-width="1.5" fill="none"/>`,done:`<circle cx="8" cy="8" r="6.5" fill="${t}"/><path d="M5 8.2 L7.2 10.4 L11 6.2" stroke="var(--oc-bg)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`},r=document.createElementNS("http://www.w3.org/2000/svg","svg");return r.setAttribute("viewBox","0 0 16 16"),r.setAttribute("width","16"),r.setAttribute("height","16"),r.setAttribute("aria-hidden","true"),r.innerHTML=n[e],r.classList.add("row-glyph"),r}function Vo(e){let{task:t,ticketId:n,column:r,selected:o,onActivate:s}=e,i=Tt(t.dueDate),c=sr(t.dueDate),d=ir(t.createdAt),m=h("div",{className:o?"row-item row-item-selected":"row-item",dataset:{taskId:t.id},onClick:s}),f=h("div",{className:"row-body"});f.append(h("div",{className:"row-title"},t.title));let E=h("div",{className:"row-meta"});E.append(h("span",{className:"task-key"},n)),t.assigneeName&&E.append(za(t.assigneeName)),d&&E.append(h("span",{},d));let S=t.subtaskCounts;S&&S.total>0&&E.append(h("span",{className:"tabular"},`${S.completed}/${S.total}`)),t.priority!=="no-priority"&&E.append(h("span",{},je(t.priority))),i&&E.append(h("span",{className:c?"overdue":""},i));let O=Ha(t.labels??[]);return O&&E.append(O),f.append(E),m.append(Fd(Na(r)),f),m.title=`${n} \xB7 ${r.name}`,m}var zd=`
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
`;function Ka(e=document.documentElement){let t="kaneo-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=zd,e.append(n)}var Bd='<path d="M38.9 510.4C15 515.5 0 507.7 0 498.4V314.3c0-1 0-2 .1-3V127.7c.1-7.5 1.5-12.8 19-16.5l81.8-16.5c23.9-5.1 38.9 2.7 38.9 12v370.8c-.1 7.5-1.5 12.8-19 16.5zm186.2-46.6c-23.9 5.1-38.9-2.7-38.9-12v-184c0-1 0-2 .1-3V81.1c.1-7.5 1.5-12.8 19-16.5l81.8-16.5C311 43 326 50.8 326 60.1v370.8c-.1 7.5-1.5 12.8-19 16.5zm248-462.2C497-3.5 512 4.3 512 13.6v63.1L407.6 212.4 512 342v42.3c-.1 7.5-1.5 12.8-19 16.5l-81.8 16.5c-23.9 5.1-38.9-2.7-38.9-12V221.2c0-1 0-2 .1-3V34.6c.1-7.5 1.5-12.8 19-16.5z"/>';function jd(e=16){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");return t.setAttribute("viewBox","0 0 512 512"),t.setAttribute("width",String(e)),t.setAttribute("height",String(e)),t.setAttribute("aria-hidden","true"),t.innerHTML=Bd,t.classList.add("kaneo-mark"),t}function Va(e){return h("span",{className:"kaneo-wordmark"},jd(16),h("span",{},e))}var Ze=document.querySelector("#root");if(!Ze)throw new Error("Kaneo board is missing its #root element.");var lt=Gs(la),g={ready:null,connected:!1,context:null,project:null,board:null,truncated:!1,labels:[],preferences:{workspaceId:null,projectId:null,openTaskId:null,priorityFilter:"any",statusFilter:null,view:"list",assigneeFilter:"any",labelFilter:null,createInWorktree:!1,serverUrl:""},search:"",detailId:null,loading:!0,error:null,mineDetail:null,comments:{},listWidth:null,mineEntries:[]},lr=0,Ya=!1;function Xd(){let e=g.ready?.connection?.account?.trim();if(e)return e;let t=g.context?.user?.email?.trim();return t||"Kaneo account"}function mn(e){return Xo(g.project?.slug??"",e.number)}function qa(e){return g.board?.columns.find(t=>t.id===e.status)}function Ja(e){return{task:e,ticketId:mn(e),workspaceId:g.context?.workspaceId??"",projectName:g.project?.name,columnName:qa(e)?.name??Wo(e.status),comments:g.comments[e.id]?.items}}function Za(e){let{priorityFilter:t,labelFilter:n,statusFilter:r,assigneeFilter:o}=g.preferences;if(t!=="any"&&Vt[e.priority]<Vt[t]||n&&!(e.labels??[]).some(i=>i.id===n)||r&&e.status!==r||o==="me"&&e.assigneeId!==g.context?.user?.id)return!1;let s=g.search.trim().toLowerCase();return s?e.title.toLowerCase().includes(s)||mn(e).toLowerCase().includes(s)||(e.description??"").toLowerCase().includes(s):!0}function Jo(e){if(!e||!g.board)return null;for(let t of g.board.columns){let n=t.tasks.find(r=>r.id===e);if(n)return n}return null}async function fn(){let e=++lr;g.loading=!0,se();try{let{workspaceSlug:t,projectSlug:n}=_a(g.ready?.settings),r=await Ea(lt,t);if(e!==lr)return;g.context=r,g.preferences=await Et(),g.project=Sa(r.projects,g.preferences.projectId,n),g.project&&g.project.id!==g.preferences.projectId&&(g.preferences=await Me({projectId:g.project.id})),g.loading=!1,g.error=r.projectsError?Dn("List projects",r.projectsError):null,se();let[o,s,i]=await Promise.allSettled([g.project?lt.getBoard(g.project.id):Promise.resolve(null),r.workspaceId?lt.listLabels(r.workspaceId):Promise.resolve([]),r.workspaceId?lt.listAssignedTasks(r.workspaceId):Promise.resolve({tasks:[],total:0})]);if(o.status==="rejected"?(g.error=Dn("Load board",o.reason),g.board=null):o.value&&(g.board=o.value.board,g.truncated=o.value.truncated),s.status==="fulfilled"&&(g.labels=Wd(s.value)),i.status==="fulfilled"&&(g.mineEntries=i.value.tasks.map(c=>({id:c.id,ticketId:Xo(c.projectSlug,c.number),title:c.title,projectName:c.projectName,statusName:c.statusName,priority:c.priority,dueDate:c.dueDate}))),e!==lr)return;se()}catch(t){if(e!==lr)return;g.loading=!1,g.error=t instanceof ln?t.message:`Could not reach Kaneo. ${Dn("Reach Kaneo",t)}`,se()}}function Wd(e){let t=new Set;return e.filter(n=>t.has(n.name)?!1:(t.add(n.name),!0))}async function cr(e,t){let n=Jo(e);if(!n||n.status===t)return;let r=g.board?.columns.find(c=>c.id===t)?.name??t,o=g.board?.columns.find(c=>c.id===n.status);o?.tasks.splice(o.tasks.indexOf(n),1);let s=g.board?.columns.find(c=>c.id===t);s?.tasks.push(n);let i=n.status;n.status=t,se();try{await lt.updateTaskStatus(e,t),await G.toast({kind:"success",message:`${mn(n)} moved to ${r}.`}),se()}catch(c){n.status=i,o?.tasks.push(n),s?.tasks.splice(s.tasks.indexOf(n),1),se(),await pn(`Move to ${r}`,c)}}var Ie=null,un=null,Yo=null,Qa=!1;function Kd(){un||(un=h("div",{className:"signin-fill"}),Yo=wa(un,()=>void up())),Ze?.append(un)}function el(){Yo?.(),Yo=null,un=null}function se(){if(Ze){if(zo(Ze),Ie=null,!g.ready){st(Ze,{label:"Connecting to Kaneo"});return}if(!g.connected){if(!Qa){st(Ze,{label:"Loading Kaneo"});return}Kd();return}if(Ze.append(Vd()),g.error){let e=h("div");Ze.append(e),Kt(e,{tone:"error",title:"Kaneo",body:g.error,action:{label:"Retry",onClick:()=>void fn()}})}Ie=h("div",{style:"flex:1; min-height:0; display:flex; flex-direction:column;"}),Ze.append(Ie),tl()}}function tl(){if(Ie){if(zo(Ie),!g.project){gt(Ie,{title:"No project",body:"This workspace has no Kaneo project yet."});return}if(!g.board){st(Ie,{label:"Loading board"});return}if(g.preferences.view==="kanban"){let e=h("div",{className:"board"});for(let n of g.board.columns)e.append(lp(n));Ie.append(e),g.truncated&&Ie.append(h("div",{className:"muted"},"This board holds more tasks than one page. Narrow it with the search box or filters."));let t=Jo(g.detailId);t&&Ie.append(dp(t));return}if(g.preferences.view==="mine"){Ie.append(np());return}Ie.append(tp())}}function Vd(){let e=h("div",{className:"oc-toolbar"}),t=h("div",{style:"flex-shrink:0;"});e.append(t);let n=g.preferences.view;zr(t,{items:[{id:"list",label:"Tasks"},{id:"kanban",label:"Kanban"},{id:"mine",label:"Mine"}],activeId:n,onChange:c=>{Me({view:c}).then(m=>{g.preferences=m,se()})}});let r=g.context?.projects??[];if(r.length>0){let c=h("div",{style:"min-width:150px;"});e.append(c),Wt(c,{label:"Project",searchable:r.length>8,value:g.project?.id??"",options:r.map(d=>({id:d.id,label:d.slug.toUpperCase(),hint:d.statistics?`${d.statistics.totalTasks}`:void 0})),onChange:d=>{Me({projectId:d}).then(()=>{g.board=null,g.detailId=null,g.mineDetail=null,fn()})}})}let o=h("div",{style:"flex:1; min-width:180px;"});e.append(o),Hr(o,{value:g.search,label:"Filter tasks",placeholder:"Filter by title, ticket or description",onChange:c=>{g.search=c,tl()}}),e.append(Yd(),qd(),Jd(),Zd());let s=h("div",{style:"margin-left:auto;"});e.append(s),xe(s,{label:"Refresh",variant:"ghost",size:"sm",loading:g.loading,onClick:()=>void fn()});let i=h("div");return e.append(i),it(i,{label:Xd(),size:"sm",variant:"ghost",items:[{id:"disconnect",label:"Disconnect",destructive:!0}],onSelect:c=>{c==="disconnect"&&fp()}}),e.append(Va("Kaneo")),e}function Yd(){let e=h("div");return it(e,{label:g.preferences.priorityFilter==="any"?"Any priority":je(g.preferences.priorityFilter),size:"sm",items:[{id:"any",label:"Any priority"},{separator:!0},...$s.map(t=>({id:t,label:je(t)}))],onSelect:t=>{Me({priorityFilter:t}).then(n=>{g.preferences=n,se()})}}),e}function qd(){let e=h("div"),t=g.board?.columns??[],n=t.find(r=>r.id===g.preferences.statusFilter);return it(e,{label:n?n.name:"Any status",size:"sm",items:[{id:"",label:"Any status"},{separator:!0},...t.map(r=>({id:r.id,label:r.name}))],onSelect:r=>{Me({statusFilter:r||null}).then(o=>{g.preferences=o,se()})}}),e}function Jd(){let e=h("div");return it(e,{label:g.preferences.assigneeFilter==="me"?"Assigned to me":"Assignee",size:"sm",items:[{id:"any",label:"Anyone"},{id:"me",label:"Assigned to me"}],onSelect:t=>{Me({assigneeFilter:t==="me"?"me":"any"}).then(n=>{g.preferences=n,se()})}}),e}function Zd(){let e=h("div"),t=g.labels.find(n=>n.id===g.preferences.labelFilter);return it(e,{label:t?t.name:"Any label",size:"sm",items:[{id:"",label:"Any label"},{separator:!0},...g.labels.map(n=>({id:n.id,label:n.name}))],onSelect:n=>{Me({labelFilter:n||null}).then(r=>{g.preferences=r,se()})}}),e}function Qd(e){return g.board?.columns.find(t=>t.id===e)}function ep(){return g.board?g.board.columns.flatMap(e=>e.tasks):[]}function tp(){let e=ep().filter(Za),t=h("div",{className:"split"}),n=h("div",{className:"split-list"});if(e.length===0){let i=h("div");n.append(i),gt(i,{title:"Nothing matches",body:"Clear the search box or the filters."})}else for(let i of e){let c=Qd(i.status);c&&n.append(Vo({task:i,ticketId:mn(i),column:c,selected:i.id===g.detailId,onActivate:()=>{g.detailId=i.id,se()}}))}let r=h("div",{className:"split-sep"});r.addEventListener("pointerdown",nl);let o=h("div",{className:"split-preview"}),s=Jo(g.detailId);if(s)o.append(ol(Ja(s)));else{let i=h("div",{style:"flex:1; display:flex; align-items:center;"});o.append(i),gt(i,{title:"Select a task",body:"Pick a task on the left to preview it here, attach it or start a session."})}return t.append(n,r,o),g.listWidth!==null&&(n.style.width=`${g.listWidth}px`),t}function np(){let e=g.search.trim().toLowerCase(),t=g.mineEntries.filter(i=>!e||i.title.toLowerCase().includes(e)||i.ticketId.toLowerCase().includes(e)),n=h("div",{className:"split"}),r=h("div",{className:"split-list"});if(t.length===0){let i=h("div");r.append(i),gt(i,{title:g.mineEntries.length===0?"Nothing assigned to you":"Nothing matches",body:g.mineEntries.length===0?"Tasks assigned to your Kaneo account in this workspace show up here.":void 0})}else for(let i of t){let c=Vo({task:{id:i.id,projectId:"",title:i.title,number:null,description:null,status:i.statusName??"",priority:"no-priority",createdAt:"",dueDate:i.dueDate},ticketId:i.ticketId,column:{slug:i.statusName?.toLowerCase()??"",isFinal:!1,name:i.statusName??""},selected:g.mineDetail?.entry.id===i.id,onActivate:()=>void rp(i)});r.append(c)}let o=h("div",{className:"split-sep"});o.addEventListener("pointerdown",nl);let s=h("div",{className:"split-preview"});if(g.mineDetail)s.append(ol(op(g.mineDetail)));else{let i=h("div",{style:"flex:1; display:flex; align-items:center;"});s.append(i),gt(i,{title:"Select a task",body:"Pick an assigned task on the left to preview it."})}return n.append(r,o,s),g.listWidth!==null&&(r.style.width=`${g.listWidth}px`),n}function nl(e){e.preventDefault();let t=e.target.previousElementSibling instanceof HTMLElement?e.target.previousElementSibling.offsetWidth:280,n=e.clientX,r=s=>{let i=Math.min(Math.max(280,t+(s.clientX-n)),Math.floor(window.innerWidth*.6));if(g.listWidth=i,Ie){let c=Ie.querySelector(".split-list");c&&(c.style.width=`${i}px`)}},o=()=>{window.removeEventListener("pointermove",r),window.removeEventListener("pointerup",o)};window.addEventListener("pointermove",r),window.addEventListener("pointerup",o)}async function rp(e){g.mineDetail={entry:e,task:sp(e)},se();try{let t=await lt.getTask(e.id);g.mineDetail?.entry.id===e.id&&(g.mineDetail={entry:e,task:t},se())}catch(t){await pn("Open task",t)}}function op(e){return{task:e.task,ticketId:e.entry.ticketId,workspaceId:g.context?.workspaceId??"",projectName:e.entry.projectName,columnName:e.entry.statusName??Wo(e.task.status),comments:g.comments[e.task.id]?.items}}function sp(e){return{id:e.id,projectId:"",title:e.title,number:null,description:null,status:e.statusName??"",priority:"no-priority",createdAt:"",dueDate:e.dueDate}}function ip(e){g.comments[e]||(g.comments[e]={loading:!0,error:null},lt.listComments(e).then(n=>{g.comments[e]={loading:!1,error:null,items:n},se()}).catch(n=>{console.error("Load comments failed:",n),g.comments[e]={loading:!1,error:n instanceof Error?n.message:String(n)},se()}))}function rl(e,t){ip(e.task.id);let n=g.board?.columns??[],r=!!qa(e.task),o=n.find(s=>s.isFinal);return ja(e,{columns:r?n:[],comments:g.comments[e.task.id]??null,worktree:g.preferences.createInWorktree,onWorktreeChange:s=>{g.preferences={...g.preferences,createInWorktree:s},Me({createInWorktree:s})},onMove:s=>void cr(e.task.id,s),onCloseIssue:()=>{o&&cr(e.task.id,o.id)},canCloseIssue:r&&!!o&&e.task.status!==o?.id,onBack:t})}function ap(){g.detailId=null,g.mineDetail=null,se()}function ol(e){return rl(e,ap)}function lp(e){let t=e.tasks.filter(Za).sort((o,s)=>(o.position??0)-(s.position??0)),n=h("div",{className:"board-column"});n.append(h("div",{className:"group-head"},h("span",{className:"eyebrow"},e.name),h("span",{className:"count-pill"},String(t.length))));let r=h("div",{className:"board-cards"});for(let o of t)r.append(cp(o));return t.length===0&&r.append(h("div",{className:"muted"},"Empty")),r.addEventListener("dragover",o=>{o.preventDefault(),n.classList.add("drag-over")}),r.addEventListener("dragleave",()=>n.classList.remove("drag-over")),r.addEventListener("drop",o=>{o.preventDefault(),n.classList.remove("drag-over");let s=o.dataTransfer?.getData("text/plain");s&&cr(s,e.id)}),n.append(r),n}function cp(e){let t=Tt(e.dueDate),n=sr(e.dueDate),r=h("div",{className:"card",draggable:!0,tabIndex:0});r.append(h("div",{className:"row",style:"gap:6px; align-items:flex-start;"},h("span",{className:`priority-bar priority-${e.priority}`}),h("span",{className:"task-key"},mn(e))),h("div",{className:"card-title"},e.title));let o=h("div",{className:"card-meta"});e.priority!=="no-priority"&&o.append(h("span",{},je(e.priority))),t&&o.append(h("span",{className:n?"overdue":""},t)),e.assigneeName&&o.append(h("span",{},e.assigneeName));let s=e.subtaskCounts;s&&s.total>0&&o.append(h("span",{},`${s.completed}/${s.total}`));for(let f of e.labels??[])o.append(ar(f));let i=h("span",{className:"status-pill-holder"});o.append(i);let c=g.board?.columns??[],d=c.find(f=>f.id===e.status)?.name??e.status;it(i,{label:d,size:"xs",items:c.filter(f=>f.id!==e.status).map(f=>({id:f.id,label:f.name})),onSelect:f=>{cr(e.id,f)}}),r.append(o),r.addEventListener("dragstart",f=>{f.dataTransfer?.setData("text/plain",e.id),f.dataTransfer&&(f.dataTransfer.effectAllowed="move"),r.classList.add("dragging")}),r.addEventListener("dragend",()=>r.classList.remove("dragging"));let m=()=>{g.detailId=e.id,se()};return r.addEventListener("click",m),r.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),m())}),r}function dp(e){let t=h("div",{className:"backdrop"});t.addEventListener("click",r=>{r.target===t&&qo()});let n=h("div",{className:"backdrop-card"});return n.append(rl(Ja(e),qo)),t.append(n),t}function qo(){g.detailId=null,se()}G.onReady(e=>{Ir(e,document.documentElement),Ka(),document.body.dataset.theme=e.theme.mode,document.body.dataset.surface=e.surface,g.ready=e,se(),Ya||(Ya=!0,pp())});async function pp(){g.connected=!!(await ca().catch(()=>null))?.connected,Qa=!0,se(),g.connected&&fn()}async function up(){el(),g.connected=!0,await fn()}async function fp(){await fa(),el(),g.connected=!1,g.context=null,g.board=null,se()}G.onReady(e=>{let t=e.settings["openchamber-url"]?.trim();Wa(lt,t||void 0)});document.addEventListener("keydown",e=>{e.key==="Escape"&&g.detailId&&qo()});})();
