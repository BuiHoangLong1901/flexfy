import{r as o}from"./index.6460afdd.js";import{u as c}from"./index.9bf3d1a7.js";import{C as u}from"./Collapse.29f4b884.js";import{j as e}from"./jsx-runtime.51014c9d.js";import{u as p}from"./use-animation.169a1666.js";import{m as d}from"./motion.a2ef69fa.js";import"./index.1f58fc00.js";const x={visible:{opacity:1,x:0,transition:{duration:.5,delay:.2}},hidden:{opacity:0,x:-10}},C=({data:s,slug:f})=>{const n=p(),[a,r]=c(),[i,l]=o.useState();return o.useEffect(()=>{r&&n.start("visible")},[n,r]),!s||!s?.name?e.jsx(e.Fragment,{}):e.jsx(d.div,{ref:a,variants:x,initial:"hidden",animate:n,className:"category-container",children:e.jsx(u,{collapseKey:"menu_collapse",btnText:s.name,className:{header:"header"},headerIcon:Number(s.subMenu.length)>0,defaultOpen:!0,children:e.jsx(e.Fragment,{children:s?.subMenu?.map((t,m)=>e.jsx("div",{onClick:()=>l(t),className:"item",children:e.jsx("span",{style:{color:i?.slug==t?.slug?"black":"",fontWeight:i?.slug==t?.slug?"bold":""},className:"item-text",children:t.name})},"menu_"+m))})})})};export{C as Category};