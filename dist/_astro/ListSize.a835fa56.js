import{r as o}from"./index.6460afdd.js";import{u as p}from"./index.9bf3d1a7.js";import{n as f}from"./api.eeeec7c9.js";import{u}from"./product-option-store.4a93098e.js";import{j as s}from"./jsx-runtime.51014c9d.js";import{u as x}from"./use-animation.169a1666.js";import{m as h}from"./motion.a2ef69fa.js";import"./middleware.ce65d969.js";const j={visible:{opacity:1,x:0,transition:{duration:.5,delay:.8}},hidden:{opacity:0,x:-40}},I=({slug:z})=>{const{addOption:n,sizes:t}=u(),i=x(),[r,c]=o.useState(),[m,a]=p(),d=async()=>{const e=await f();n("sizes",e)};return o.useEffect(()=>{a&&(i.start("visible"),(!t||t.length==0)&&d())},[i,a]),s.jsxs(h.div,{ref:m,variants:j,initial:"hidden",animate:i,className:"size-container",children:[s.jsx("div",{className:"header",children:s.jsx("span",{children:"FILTER BY SIZE"})}),s.jsx("div",{className:"content",children:t?.map((e,l)=>s.jsx("div",{onClick:()=>{c(e)},style:{backgroundColor:r?.code==e.code?"#ffb4b4":""},className:"item item-size",children:s.jsx("span",{className:"item-text",children:e.name})},"size_"+l))})]})};export{I as Size};