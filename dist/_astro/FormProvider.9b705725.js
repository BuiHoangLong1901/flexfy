import{r as n}from"./index.6460afdd.js";import{SelectBox as b}from"./SelectBox.a2c91b32.js";import{j as o}from"./jsx-runtime.51014c9d.js";import{m as j}from"./motion.a2ef69fa.js";var $=(t=>(t.INPUT="input",t.NUMBER="number",t.SELECT="select",t.PASSWORD="password",t))($||{});const g=(t,m)=>{t.target.classList.toggle("input-focus",m)},O=(t,m)=>{const{inputs:c,className:v,setValues:p}=t,[s,h]=n.useState({}),i=n.useRef(),E=()=>{if(!i.current)return;const e=Object.fromEntries(new FormData(i.current));let a={};return Object.entries(e).forEach(([r,l])=>{a={...a,...y(r,l)},h(a)}),Object.keys(a).length===0?e:null};n.useImperativeHandle(m,()=>({formValues:E,isValidate:Object.keys(s).length!==0}),[s]);const y=(e,a)=>{const r={...s},l=c.find(R=>R.name===e);if(!l)return;const{required:x,minLength:u,maxLength:f,pattern:d}=l;return x&&!a.trim()?r[e]=x.message:u?.value&&a.trim().length<u.value?r[e]=u.message:f?.value&&a.trim().length>f.value?r[e]=f.message:d?.value&&a.trim()&&!new RegExp(d.value).test(a.trim())?r[e]=d.message:delete r[e],h(r),r};return o.jsx("form",{autoComplete:"on",method:"post",ref:i,className:`${v} form-provider`,children:c.map((e,a)=>e.type==="select"&&e.data?o.jsxs(n.Fragment,{children:[o.jsx(b,{items:e.data,label:e.label,name:e.name,defaultValue:e.data[0]?.value,className:`${e.className} ${s[e.name]&&"input-error"}`,onChange:r=>p&&p({[e.name]:r})}),s[e.name]&&o.jsx(j.p,{className:"input-error-message",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5,delay:.05},children:s[e.name]})]},`FORM_ITEM_${e.name}_${a}`):o.jsxs("div",{className:e.className,children:[o.jsx("input",{name:e.name,value:e.value,type:e.type,placeholder:e.placeholder,autoComplete:s[e.label??""],className:`${s[e.name]&&"input-error"}`,onInput:r=>{g(r,!0),y(e.name,r.currentTarget.value)},onFocus:r=>g(r,!0),onBlur:r=>g(r,!1)}),s[e.name]&&o.jsx(j.p,{className:"input-error-message",initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:"collapsed",transition:{duration:.25,delay:.05},children:s[e.name]})]},`FORM_ITEM_${e.name}_${a}`))})},_=n.forwardRef(O);export{$ as F,_ as a};