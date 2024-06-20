"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[770],{5770:(e,t,a)=>{a.r(t),a.d(t,{default:()=>F});var o=a(5542),n=a(1171),r=a(8587),i=a(8168),l=a(5043),s=a(8387),c=a(2400),d=a(8606),p=a(410),u=a(2919),m=a(6060),h=a(8280),v=a(579);const g=["className","component","disableGutters","fixed","maxWidth","classes"],x=(0,h.A)(),b=(0,m.A)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,p.A)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),f=e=>(0,u.A)({props:e,name:"MuiContainer",defaultTheme:x});var S=a(6803),A=a(4535),y=a(2876);const w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=b,useThemeProps:a=f,componentName:o="MuiContainer"}=e,n=t((e=>{let{theme:t,ownerState:a}=e;return(0,i.A)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:a}=e;return a.fixed&&Object.keys(t.breakpoints.values).reduce(((e,a)=>{const o=a,n=t.breakpoints.values[o];return 0!==n&&(e[t.breakpoints.up(o)]={maxWidth:"".concat(n).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:a}=e;return(0,i.A)({},"xs"===a.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},a.maxWidth&&"xs"!==a.maxWidth&&{[t.breakpoints.up(a.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[a.maxWidth]).concat(t.breakpoints.unit)}})})),u=l.forwardRef((function(e,t){const l=a(e),{className:u,component:m="div",disableGutters:h=!1,fixed:x=!1,maxWidth:b="lg"}=l,f=(0,r.A)(l,g),S=(0,i.A)({},l,{component:m,disableGutters:h,fixed:x,maxWidth:b}),A=((e,t)=>{const{classes:a,fixed:o,disableGutters:n,maxWidth:r}=e,i={root:["root",r&&"maxWidth".concat((0,p.A)(String(r))),o&&"fixed",n&&"disableGutters"]};return(0,d.A)(i,(e=>(0,c.Ay)(t,e)),a)})(S,o);return(0,v.jsx)(n,(0,i.A)({as:m,ownerState:S,className:(0,s.A)(A.root,u),ref:t},f))}));return u}({createStyledComponent:(0,A.Ay)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t["maxWidth".concat((0,S.A)(String(a.maxWidth)))],a.fixed&&t.fixed,a.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,y.A)({props:e,name:"MuiContainer"})}),C=w;var z=a(3336),W=a(5865),j=a(5122),k=a(1906),I=a(8911),R=a(9379),M=a(7392),T=a(6213),L=a(3768),E=a(3003),N=a(7832),B=a(2557),G=a(8925);const F=()=>{const[e,t]=(0,l.useState)(!0),[a,r]=(0,l.useState)(!1),i=(0,E.wA)(),s=()=>{t(!e)},[c,d]=(0,l.useState)(""),[p,u]=(0,l.useState)(""),[m,h]=(0,l.useState)(""),[g,x]=(0,l.useState)(""),b=(0,o.A_)("single",2);return(0,v.jsx)("div",{style:{backgroundImage:B.wm},children:(0,v.jsx)(C,{sx:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},component:"main",maxWidth:"xs",children:(0,v.jsx)(z.A,{elevation:3,sx:{padding:4,display:"flex",flexDirection:"column",alignItems:"center"},children:e?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(W.A,{variant:"h5",children:"Login"}),(0,v.jsxs)("form",{style:{width:"100%",marginTop:"1rem"},onSubmit:async e=>{r(!0),e.preventDefault();const t=L.Ay.loading("Logging In..."),a={withCredentials:!0,headers:{"Content-Type":"application/json"}};try{const{data:e}=await T.A.post("".concat("https://chat-app-mern-07dn.onrender.com","/api/v1/user/login"),{username:m,password:g},a);i((0,G.sI)(e.user)),L.Ay.success(e.message,{id:t})}catch(l){var o,n;L.Ay.error((null===l||void 0===l||null===(o=l.response)||void 0===o||null===(n=o.data)||void 0===n?void 0:n.message)||"Something went wrong",{id:t})}finally{r(!1)}},children:[(0,v.jsx)(j.A,{required:!0,fullWidth:!0,label:"Username",margin:"normal",variant:"outlined",value:m,onChange:e=>h(e.target.value)}),(0,v.jsx)(j.A,{required:!0,fullWidth:!0,label:"Password",type:"password",margin:"normal",variant:"outlined",value:g,onChange:e=>x(e.target.value)}),(0,v.jsx)(k.A,{sx:{marginTop:"1rem"},variant:"contained",color:"primary",type:"submit",fullWidth:!0,disabled:a,children:"Login"}),(0,v.jsx)(W.A,{textAlign:"center",m:"1rem",children:"OR"}),(0,v.jsx)(k.A,{fullWidth:!0,variant:"text",onClick:s,disabled:a,children:"Sign Up Instead"})]})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(W.A,{variant:"h5",children:"SignUp"}),(0,v.jsxs)("form",{style:{width:"100%",marginTop:"1rem"},onSubmit:async e=>{e.preventDefault(),r(!0);const t=L.Ay.loading("Signing Up..."),a=new FormData;a.append("avatar",b.file),a.append("name",c),a.append("bio",p),a.append("username",m),a.append("password",g);const o={withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}};try{const{data:e}=await T.A.post("".concat("https://chat-app-mern-07dn.onrender.com","/api/v1/user/new"),a,o);i((0,G.sI)(e.user)),L.Ay.success(e.message,{id:t})}catch(s){var n,l;L.Ay.error(null===s||void 0===s||null===(n=s.response)||void 0===n||null===(l=n.data)||void 0===l?void 0:l.message,{id:t})}finally{r(!1)}},children:[(0,v.jsxs)(I.A,{position:"relative",width:"10rem",margin:"auto",children:[(0,v.jsx)(R.A,{sx:{width:"10rem",height:"10rem",objectFit:"contain"},src:b.preview}),(0,v.jsx)(M.A,{sx:{position:"absolute",bottom:"0",right:"0",color:"white",bgcolor:"rgba(0, 0, 0, 0.5)",":hover":{bgcolor:"rgba(0, 0, 0, 0.7)"}},component:"label",children:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(n.A,{}),(0,v.jsx)(N.oQ,{onChange:b.changeHandler,type:"file"})]})})]}),b.error&&(0,v.jsx)(W.A,{m:"1rem auto",width:"fit-content",display:"block",color:"error",variant:"caption",children:b.error}),(0,v.jsx)(j.A,{required:!0,fullWidth:!0,label:"Name",margin:"normal",variant:"outlined",value:c,onChange:e=>d(e.target.value)}),(0,v.jsx)(j.A,{required:!0,fullWidth:!0,label:"Bio",margin:"normal",variant:"outlined",value:p,onChange:e=>u(e.target.value)}),(0,v.jsx)(j.A,{required:!0,fullWidth:!0,label:"Username",margin:"normal",variant:"outlined",value:m,onChange:e=>h(e.target.value)}),m.error&&(0,v.jsx)(W.A,{color:"error",variant:"caption",children:m.error}),(0,v.jsx)(j.A,{required:!0,fullWidth:!0,label:"Password",type:"password",margin:"normal",variant:"outlined",value:g,onChange:e=>x(e.target.value)}),(0,v.jsx)(k.A,{sx:{marginTop:"1rem"},variant:"contained",color:"primary",type:"submit",fullWidth:!0,disabled:a,children:"SignUp"}),(0,v.jsx)(W.A,{textAlign:"center",m:"1rem",children:"OR"}),(0,v.jsx)(k.A,{fullWidth:!0,variant:"text",onClick:s,disabled:a,children:"Login Instead"})]})]})})})})}},1906:(e,t,a)=>{a.d(t,{A:()=>j});var o=a(8587),n=a(8168),r=a(5043),i=a(8387),l=a(2018),s=a(8606),c=a(7266),d=a(4535),p=a(1475),u=a(2876),m=a(6236),h=a(6803),v=a(7056),g=a(2400);function x(e){return(0,g.Ay)("MuiButton",e)}const b=(0,v.A)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);const f=r.createContext({});const S=r.createContext(void 0);var A=a(579);const y=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],w=e=>(0,n.A)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}}),C=(0,d.Ay)(m.A,{shouldForwardProp:e=>(0,p.A)(e)||"classes"===e,name:"MuiButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],t["".concat(a.variant).concat((0,h.A)(a.color))],t["size".concat((0,h.A)(a.size))],t["".concat(a.variant,"Size").concat((0,h.A)(a.size))],"inherit"===a.color&&t.colorInherit,a.disableElevation&&t.disableElevation,a.fullWidth&&t.fullWidth]}})((e=>{let{theme:t,ownerState:a}=e;var o,r;const i="light"===t.palette.mode?t.palette.grey[300]:t.palette.grey[800],l="light"===t.palette.mode?t.palette.grey.A100:t.palette.grey[700];return(0,n.A)({},t.typography.button,{minWidth:64,padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,transition:t.transitions.create(["background-color","box-shadow","border-color","color"],{duration:t.transitions.duration.short}),"&:hover":(0,n.A)({textDecoration:"none",backgroundColor:t.vars?"rgba(".concat(t.vars.palette.text.primaryChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette.text.primary,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===a.variant&&"inherit"!==a.color&&{backgroundColor:t.vars?"rgba(".concat(t.vars.palette[a.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette[a.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===a.variant&&"inherit"!==a.color&&{border:"1px solid ".concat((t.vars||t).palette[a.color].main),backgroundColor:t.vars?"rgba(".concat(t.vars.palette[a.color].mainChannel," / ").concat(t.vars.palette.action.hoverOpacity,")"):(0,c.X4)(t.palette[a.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===a.variant&&{backgroundColor:t.vars?t.vars.palette.Button.inheritContainedHoverBg:l,boxShadow:(t.vars||t).shadows[4],"@media (hover: none)":{boxShadow:(t.vars||t).shadows[2],backgroundColor:(t.vars||t).palette.grey[300]}},"contained"===a.variant&&"inherit"!==a.color&&{backgroundColor:(t.vars||t).palette[a.color].dark,"@media (hover: none)":{backgroundColor:(t.vars||t).palette[a.color].main}}),"&:active":(0,n.A)({},"contained"===a.variant&&{boxShadow:(t.vars||t).shadows[8]}),["&.".concat(b.focusVisible)]:(0,n.A)({},"contained"===a.variant&&{boxShadow:(t.vars||t).shadows[6]}),["&.".concat(b.disabled)]:(0,n.A)({color:(t.vars||t).palette.action.disabled},"outlined"===a.variant&&{border:"1px solid ".concat((t.vars||t).palette.action.disabledBackground)},"contained"===a.variant&&{color:(t.vars||t).palette.action.disabled,boxShadow:(t.vars||t).shadows[0],backgroundColor:(t.vars||t).palette.action.disabledBackground})},"text"===a.variant&&{padding:"6px 8px"},"text"===a.variant&&"inherit"!==a.color&&{color:(t.vars||t).palette[a.color].main},"outlined"===a.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===a.variant&&"inherit"!==a.color&&{color:(t.vars||t).palette[a.color].main,border:t.vars?"1px solid rgba(".concat(t.vars.palette[a.color].mainChannel," / 0.5)"):"1px solid ".concat((0,c.X4)(t.palette[a.color].main,.5))},"contained"===a.variant&&{color:t.vars?t.vars.palette.text.primary:null==(o=(r=t.palette).getContrastText)?void 0:o.call(r,t.palette.grey[300]),backgroundColor:t.vars?t.vars.palette.Button.inheritContainedBg:i,boxShadow:(t.vars||t).shadows[2]},"contained"===a.variant&&"inherit"!==a.color&&{color:(t.vars||t).palette[a.color].contrastText,backgroundColor:(t.vars||t).palette[a.color].main},"inherit"===a.color&&{color:"inherit",borderColor:"currentColor"},"small"===a.size&&"text"===a.variant&&{padding:"4px 5px",fontSize:t.typography.pxToRem(13)},"large"===a.size&&"text"===a.variant&&{padding:"8px 11px",fontSize:t.typography.pxToRem(15)},"small"===a.size&&"outlined"===a.variant&&{padding:"3px 9px",fontSize:t.typography.pxToRem(13)},"large"===a.size&&"outlined"===a.variant&&{padding:"7px 21px",fontSize:t.typography.pxToRem(15)},"small"===a.size&&"contained"===a.variant&&{padding:"4px 10px",fontSize:t.typography.pxToRem(13)},"large"===a.size&&"contained"===a.variant&&{padding:"8px 22px",fontSize:t.typography.pxToRem(15)},a.fullWidth&&{width:"100%"})}),(e=>{let{ownerState:t}=e;return t.disableElevation&&{boxShadow:"none","&:hover":{boxShadow:"none"},["&.".concat(b.focusVisible)]:{boxShadow:"none"},"&:active":{boxShadow:"none"},["&.".concat(b.disabled)]:{boxShadow:"none"}}})),z=(0,d.Ay)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.startIcon,t["iconSize".concat((0,h.A)(a.size))]]}})((e=>{let{ownerState:t}=e;return(0,n.A)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},w(t))})),W=(0,d.Ay)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.endIcon,t["iconSize".concat((0,h.A)(a.size))]]}})((e=>{let{ownerState:t}=e;return(0,n.A)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},w(t))})),j=r.forwardRef((function(e,t){const a=r.useContext(f),c=r.useContext(S),d=(0,l.A)(a,e),p=(0,u.A)({props:d,name:"MuiButton"}),{children:m,color:v="primary",component:g="button",className:b,disabled:w=!1,disableElevation:j=!1,disableFocusRipple:k=!1,endIcon:I,focusVisibleClassName:R,fullWidth:M=!1,size:T="medium",startIcon:L,type:E,variant:N="text"}=p,B=(0,o.A)(p,y),G=(0,n.A)({},p,{color:v,component:g,disabled:w,disableElevation:j,disableFocusRipple:k,fullWidth:M,size:T,type:E,variant:N}),F=(e=>{const{color:t,disableElevation:a,fullWidth:o,size:r,variant:i,classes:l}=e,c={root:["root",i,"".concat(i).concat((0,h.A)(t)),"size".concat((0,h.A)(r)),"".concat(i,"Size").concat((0,h.A)(r)),"color".concat((0,h.A)(t)),a&&"disableElevation",o&&"fullWidth"],label:["label"],startIcon:["icon","startIcon","iconSize".concat((0,h.A)(r))],endIcon:["icon","endIcon","iconSize".concat((0,h.A)(r))]},d=(0,s.A)(c,x,l);return(0,n.A)({},l,d)})(G),O=L&&(0,A.jsx)(z,{className:F.startIcon,ownerState:G,children:L}),P=I&&(0,A.jsx)(W,{className:F.endIcon,ownerState:G,children:I}),V=c||"";return(0,A.jsxs)(C,(0,n.A)({ownerState:G,className:(0,i.A)(a.className,F.root,b,V),component:g,disabled:w,focusRipple:!k,focusVisibleClassName:(0,i.A)(F.focusVisible,R),ref:t,type:E},B,{classes:F,children:[O,m,P]}))}))}}]);
//# sourceMappingURL=770.3b471644.chunk.js.map