"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[390],{1390:(e,n,s)=>{s.d(n,{A:()=>U});var t=s(5043),r=s(3302),i=s(5287),o=s(6446),l=s(2557),a=s(1637),c=s(8911),d=s(2220),x=s(7832),u=s(5079),h=s(5865),m=s(3003),p=s(579);const g=e=>{let{avatar:n=[],name:s,_id:t,groupChat:r=!1,sameSender:i,isOnline:a,index:d=0,newMessageAlert:g}=e;const{theme:f}=(0,m.d4)((e=>e.chat));return(0,p.jsx)(x.N_,{sx:{padding:"0",borderRadius:"10px 10px 10px 0px"},to:"/chat/".concat(t),children:(0,p.jsxs)("div",{style:{display:"flex",gap:"1rem",alignItems:"center",backgroundColor:i?l.wm:"unset",color:i?"black":"unset",position:"relative",padding:"1rem"},children:[(0,p.jsxs)("div",{style:{position:"relative"},children:[(0,p.jsx)(u.A,{avatar:n}),a&&!r&&(0,p.jsx)(o.A,{sx:{width:"10px",height:"10px",borderRadius:"50%",backgroundColor:"green",border:"0.5px solid white",margin:"2px",marginBottom:0,position:"absolute",bottom:0,right:{xs:"1.7rem",sm:"1rem"},transform:"translateY(-50%)"}})]}),(0,p.jsx)(c.A,{children:(0,p.jsx)(h.A,{variant:"h6",children:s})}),(0,p.jsx)(h.A,{sx:{fontSize:"0.75rem",padding:"0px 7px",margin:"3px",bgcolor:f,color:l.ON,borderRadius:"50%",position:"absolute",right:0},children:null===g||void 0===g?void 0:g.count})]})})},f=(0,t.memo)(g);var v=s(3216),A=s(9648),j=s(4149),C=s(3355),b=s(7038),w=s(3845);const k=e=>{let{optionType:n,setOptionType:s}=e;const{theme:t}=(0,m.d4)((e=>e.chat));return(0,p.jsxs)(o.A,{display:"flex",alignItems:"center",gap:1,margin:"0.5rem",marginTop:0,padding:"0.5rem",borderRadius:"1rem",children:[(0,p.jsx)(w.A,{label:"All",variant:"all"===n?"filled":"outlined",clickable:!0,onClick:()=>s("all"),sx:{bgcolor:"all"===n?t:"transparent",color:"all"===n?"#ffffff":t,borderColor:"all"!==n&&t}}),(0,p.jsx)(w.A,{label:"Unread",variant:"unread"===n?"filled":"outlined",clickable:!0,onClick:()=>s("unread"),sx:{bgcolor:"unread"===n?t:"transparent",color:"unread"===n?"#ffffff":t,borderColor:"unread"!==n&&t}}),(0,p.jsx)(w.A,{label:"Groups",variant:"groups"===n?"filled":"outlined",clickable:!0,onClick:()=>s("groups"),sx:{bgcolor:"groups"===n?t:"transparent",color:"groups"===n?"#ffffff":t,borderColor:"groups"!==n&&t}})]})},y=(0,t.memo)(k),E=(0,t.lazy)((()=>Promise.all([s.e(122),s.e(178),s.e(219),s.e(615)]).then(s.bind(s,615)))),S=e=>{var n;let{chats:s=[],newMessagesAlert:r=[{chatId:"",count:0}],user:i,onlineUsers:u=[],isLoading:g}=e;const w=(0,m.wA)(),k=(0,v.g)(),S=null===k||void 0===k?void 0:k.id,I=(0,t.useRef)(null),[_,R]=(0,t.useState)(""),[T,O]=(0,t.useState)(s),[N,M]=(0,t.useState)(!1),[P,D]=(0,t.useState)("all"),{isProfile:G}=(0,m.d4)((e=>e.misc)),{theme:L}=(0,m.d4)((e=>e.chat)),U=()=>{switch(P){case"unread":const e=null===s||void 0===s?void 0:s.filter((e=>r.some((n=>n.chatId===e._id))));return e;case"groups":const n=null===s||void 0===s?void 0:s.filter((e=>!0===(null===e||void 0===e?void 0:e.groupChat)));return n;default:return s}};(0,t.useEffect)((()=>{O(s)}),[s]),(0,t.useEffect)((()=>{if(""===_.trim())O(U());else{const e=U().filter((e=>e.name.toLowerCase().includes(_.toLowerCase().trim())));O(e)}}),[_]),(0,t.useEffect)((()=>{O(U())}),[P]);const z=e=>{M(!0),I.current=e.currentTarget};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(o.A,{sx:{display:{xs:S?"none":"flex",sm:"flex"},flexDirection:"column",borderBottom:"1px solid black",width:{xs:"100%",sm:"30%"},height:"100vh"},children:[(0,p.jsx)(b.A,{isOpen:N,setIsOpen:M,dispatch:w,menuAnchor:I,openProfile:()=>{M(!1),w((0,C.QD)(!0))}}),(0,p.jsxs)(o.A,{sx:{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center",backgroundColor:l.ON,borderRadius:"15px",padding:"5px",position:"sticky",top:0,height:{xs:"18%",sm:"13%"}},margin:"5px",children:[(0,p.jsxs)(o.A,{sx:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:{xs:"100%",sm:"auto"}},children:[(0,p.jsx)(h.A,{variant:"h5",sx:{marginLeft:"5px"},children:"Chats"}),null!==i&&void 0!==i&&null!==(n=i.avatar)&&void 0!==n&&n.url?(0,p.jsx)(A.A,{title:null===i||void 0===i?void 0:i.username,src:i.avatar.url,color:G?L:"inherit",sx:{display:{xs:"flex",sm:"none"}},onClick:z}):(0,p.jsx)(A.A,{title:null===i||void 0===i?void 0:i.username,icon:(0,p.jsx)(j.A,{}),color:G?L:"inherit",sx:{display:{xs:"flex",sm:"none"}},onClick:z})]}),(0,p.jsx)(x.cl,{placeholder:"Search Friends...",value:_,onChange:e=>{R(e.target.value)}})]}),g?(0,p.jsx)(o.A,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,p.jsx)(a.A,{sx:{color:L}})}):(0,p.jsxs)(c.A,{direction:"column",sx:{height:"100%",overflow:"auto",backgroundColor:l.ON,borderRadius:"20px",marginRight:"5px",border:"2px solid ".concat(l.ON),position:"sticky",top:0},children:[(0,p.jsx)(y,{optionType:P,setOptionType:D}),!g&&(null===T||void 0===T?void 0:T.length)>0?null===T||void 0===T?void 0:T.map(((e,n)=>{const{avatar:s,_id:t,name:i,groupChat:o,members:l}=e,a=r.find((e=>{let{chatId:n}=e;return n===t})),c=null===l||void 0===l?void 0:l.some((e=>u.includes(e)));return(0,p.jsx)(f,{index:n,newMessageAlert:a,isOnline:c,avatar:s,name:i,_id:t,groupChat:o,sameSender:S===t},t)})):(0,p.jsx)(h.A,{textAlign:"center",padding:"1rem",children:"No chats"})]})]}),G&&(0,p.jsx)(t.Suspense,{fallback:(0,p.jsx)(d.A,{open:!0}),children:(0,p.jsx)(E,{})})]})},I=(0,t.memo)(S);var _=s(3202),R=s(4852),T=s(5948),O=s(7025),N=s(2581),M=s(141),P=s(2437),D=s(3010),G=s(6625);const L=e=>{let{dispatch:n,deleteMenuAnchor:s}=e;const{isDeleteMenu:r,selectedDeleteChat:i}=(0,m.d4)((e=>e.misc)),o=(0,v.Zp)(),l=()=>{n((0,C.Tw)(!1)),s.current=null},a=null===i||void 0===i?void 0:i.groupChat,[d,,x]=(0,T.dF)(_.wU),[u,,g]=(0,T.dF)(_.bZ);return(0,t.useEffect)((()=>{(x||g)&&o("/")}),[x,g]),(0,p.jsx)(P.A,{open:r,onClose:l,anchorEl:s.current,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"center"},children:(0,p.jsx)(c.A,{sx:{width:"10rem",padding:"0.5rem",cursor:"pointer"},direction:"row",alignItems:"center",spacing:"0.5rem",onClick:a?()=>{l(),u("Leaving Group...",null===i||void 0===i?void 0:i.chatId)}:()=>{l(),d("Deleting Chat...",null===i||void 0===i?void 0:i.chatId)},children:a?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(D.A,{})," ",(0,p.jsx)(h.A,{children:"Leave Group"})]}):(0,p.jsxs)(p.Fragment,{children:[" ",(0,p.jsx)(G.A,{})," ",(0,p.jsx)(h.A,{children:"Clear Chat"})]})})})},U=()=>e=>n=>{const{user:s}=(0,m.d4)((e=>e.auth)),{newMessageAlert:a,newMessagesCount:c}=(0,m.d4)((e=>e.chat)),[d,x]=(0,t.useState)([]),u=(0,v.g)(),h=(0,R.Y)(),g=(0,m.wA)(),f=(0,v.Zp)(),A=u.id,j=(0,t.useRef)(null),{data:b,isLoading:w,refetch:k}=(0,_.X2)("");(0,t.useEffect)((()=>{(0,M.a2)({key:O.qS,value:a}),g((0,N.v9)())}),[a,g]),(0,t.useEffect)((()=>{k(),h.emit(O.Jw,{userId:s._id})}),[null===s||void 0===s?void 0:s.user,k,h,s._id]),(0,t.useEffect)((()=>(h.emit(O.nW,{userId:null===s||void 0===s?void 0:s._id}),()=>h.emit(O.EI,{userId:s._id}))),[]);const y=(0,t.useCallback)((e=>{e.chatId!==A&&g((0,N.X6)(e))}),[A,g]),E=(0,t.useCallback)((e=>{x(e)}),[A]),S=(0,t.useCallback)((()=>{g((0,N.z5)())}),[g]),P=(0,t.useCallback)((e=>{k(),f("/")}),[k,f]),D={[O.qS]:y,[O.nF]:E,[O.bU]:S,[O.u_]:P};return(0,T.Q7)(h,D),(0,p.jsxs)(o.A,{sx:{display:"flex",position:{xs:"relative",sm:"fixed"},flexDirection:{xs:"column-reverse",sm:"row"},backgroundColor:l.wm,height:"100%",width:"100%"},children:[(0,p.jsx)(r.A,{newMessagesCount:c}),(0,p.jsx)(i.A,{chatId:A}),(0,p.jsx)(L,{dispatch:g,deleteMenuAnchor:j}),(0,p.jsx)(I,{chats:null===b||void 0===b?void 0:b.chats,newMessagesAlert:a,onlineUsers:d,user:s,isLoading:w}),(0,p.jsx)(e,{...n,chatId:A,user:s,handleDeleteChat:(e,n,s)=>{g((0,C.Tw)(!0)),g((0,C.DI)({chatId:n,groupChat:s})),j.current=e.currentTarget}})]})}},9648:(e,n,s)=>{s.d(n,{A:()=>u});var t=s(5043),r=s(2167),i=s(7392),o=s(8780),l=s(9379),a=s(5865),c=s(3003),d=s(579);const x=e=>{let{title:n,icon:s,onClick:t,value:x,color:u="inherit",sx:h,src:m,name:p}=e;const{theme:g}=(0,c.d4)((e=>e.chat));return(0,d.jsx)(r.A,{title:n,sx:h,children:(0,d.jsxs)(i.A,{size:"large",onClick:t,style:{color:u,flexDirection:"column"},children:[m?x?(0,d.jsx)(o.A,{badgeContent:x,sx:{"& .MuiBadge-badge":{backgroundColor:"inherit"===u?"white":u,color:"inherit"===u?"black":"white"}},children:s}):(0,d.jsx)(l.A,{src:m}):x?(0,d.jsx)(o.A,{badgeContent:x,sx:{"& .MuiBadge-badge":{backgroundColor:"inherit"===u?g:"white",color:"inherit"===u?"white":"black"}},children:s}):s,p&&(0,d.jsx)(a.A,{sx:{fontSize:"0.6rem",display:{xs:"flex",sm:"none"}},children:p})]})})},u=(0,t.memo)(x)},5287:(e,n,s)=>{s.d(n,{A:()=>I});var t=s(2314),r=s(5865),i=s(6446),o=s(2220),l=s(5043),a=s(2557),c=s(9484),d=s(2522),x=s(7241),u=s(5626),h=s(4149),m=s(6598),p=s(8923),g=s(9648),f=s(3216),v=s(3003),A=s(3355),j=s(2581),C=s(7038),b=s(579);const w=(0,l.lazy)((()=>Promise.all([s.e(122),s.e(322),s.e(981)]).then(s.bind(s,2981)))),k=(0,l.lazy)((()=>Promise.all([s.e(322),s.e(621)]).then(s.bind(s,1621)))),y=(0,l.lazy)((()=>Promise.all([s.e(122),s.e(322),s.e(307)]).then(s.bind(s,8307)))),E=(0,l.lazy)((()=>Promise.all([s.e(122),s.e(178),s.e(219),s.e(615)]).then(s.bind(s,615)))),S=e=>{var n;let{chatId:s}=e;const S=(0,f.Zp)(),I=(0,f.zy)(),_=(0,v.wA)(),[R,T]=(0,l.useState)(!1),O=(0,l.useRef)(null),{user:N}=(0,v.d4)((e=>e.auth)),{isSearch:M,isNotification:P,isNewGroup:D,isProfile:G}=(0,v.d4)((e=>e.misc)),{notificationCount:L,theme:U,newMessagesCount:z}=(0,v.d4)((e=>e.chat)),F=e=>{T(!0),O.current=e.currentTarget};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(t.A,{sx:{bgcolor:a.Zp,height:{xs:"auto",sm:"100vh"},width:{xs:"100vw",sm:"80px"},margin:{xs:"none",sm:"3px"},padding:{xs:"none",sm:"10px"},borderRadius:{xs:"10px 10px 0px 0px",sm:"20px"},display:{xs:s?"none":"flex",sm:"flex"},flexDirection:{xs:"row",sm:"column"},alignItems:{xs:"center",sm:"space-between"},justifyContent:{xs:"center",sm:"space-around"},position:{sm:"sticky",xs:"fixed"},left:{sm:0,xs:0},right:{sm:"auto",xs:"auto"},bottom:{sm:"auto",xs:0},top:{sm:0,xs:"auto"}},children:[(0,b.jsx)(C.A,{isOpen:R,setIsOpen:T,dispatch:_,menuAnchor:O,openProfile:()=>{T(!1),_((0,A.QD)(!0))}}),(0,b.jsx)(r.A,{variant:"h6",sx:{display:{xs:"none",sm:"block"}},children:(0,b.jsx)(p.A,{})}),(0,b.jsxs)(i.A,{sx:{display:"flex",flexDirection:{xs:"row",sm:"column"},flexWrap:"nowrap",overflowX:"auto"},children:[(0,b.jsx)(g.A,{title:"Chats",icon:(0,b.jsx)(m.A,{}),onClick:()=>{S("/")},color:!I.pathname.includes("/chat")&&"/"!==I.pathname||M||P||D||G?"inherit":U,value:z,name:"Chats",sx:{flexShrink:0,marginRight:"2px"}}),(0,b.jsx)(g.A,{title:"Search",icon:(0,b.jsx)(c.A,{}),color:M?U:"inherit",onClick:()=>_((0,A.Dm)(!0)),name:"Search",sx:{flexShrink:0,marginRight:"2px"}}),(0,b.jsx)(g.A,{title:"New Group",icon:(0,b.jsx)(d.A,{}),color:D?U:"inherit",onClick:()=>_((0,A.uX)(!0)),name:"New Group",sx:{flexShrink:0,marginRight:"2px"}}),(0,b.jsx)(g.A,{title:"Manage Groups",icon:(0,b.jsx)(x.A,{}),color:!I.pathname.includes("/groups")||M||P||D||G?"inherit":U,onClick:()=>{S("/groups")},name:"Manage Groups",sx:{flexShrink:0,marginRight:"2px"}}),(0,b.jsx)(g.A,{title:"Notifications",icon:(0,b.jsx)(u.A,{}),color:P?U:"inherit",value:L,onClick:()=>{_((0,A.kT)(!0)),_((0,j.Gd)())},name:"Notifications",sx:{flexShrink:0,marginRight:"2px"}})]}),null!==N&&void 0!==N&&null!==(n=N.avatar)&&void 0!==n&&n.url?(0,b.jsx)(g.A,{title:N.username,src:N.avatar.url,color:G?U:"inherit",sx:{display:{xs:"none",sm:"flex"}},onClick:F}):(0,b.jsx)(g.A,{title:N.username,icon:(0,b.jsx)(h.A,{}),color:G?U:"inherit",sx:{display:{xs:"none",sm:"flex"}},onClick:F})]}),M&&(0,b.jsx)(l.Suspense,{fallback:(0,b.jsx)(o.A,{open:!0}),children:(0,b.jsx)(w,{})}),P&&(0,b.jsx)(l.Suspense,{fallback:(0,b.jsx)(o.A,{open:!0}),children:(0,b.jsx)(k,{})}),D&&(0,b.jsx)(l.Suspense,{fallback:(0,b.jsx)(o.A,{open:!0}),children:(0,b.jsx)(y,{})}),G&&(0,b.jsx)(l.Suspense,{fallback:(0,b.jsx)(o.A,{open:!0}),children:(0,b.jsx)(E,{})})]})},I=(0,l.memo)(S)},7025:(e,n,s)=>{s.d(n,{$H:()=>c,EI:()=>h,J8:()=>t,Jw:()=>d,OR:()=>g,_b:()=>p,bU:()=>o,hV:()=>f,nF:()=>x,nW:()=>u,o9:()=>m,qS:()=>i,tq:()=>l,u_:()=>r,v_:()=>a});const t="ALERT",r="REFETCH_CHATS",i="NEW_MESSAGE_ALERT",o="NEW_REQUEST",l="NEW_MESSAGE",a="START_TYPING",c="STOP_TYPING",d="CHAT_JOINED",x="ONLINE_USERS",u="ONLINE_USER_SET",h="ONLINE_USER_DELETE",m="GROUP_USER_TYPING",p="GROUP_USER_STOPPED_TYPING",g="REFETCH_PROFILE",f="REFETCH_GROUP_CHAT_MEMBERS"},7038:(e,n,s)=>{s.d(n,{A:()=>p});var t=s(2437),r=s(922),i=s(6990),o=s(8734),l=s(5043),a=s(3552),c=s(1702),d=s(8925),x=s(3768),u=s(6213),h=s(579);const m=e=>{let{isOpen:n,setIsOpen:s,dispatch:l,menuAnchor:m,openProfile:p}=e;return(0,h.jsx)(t.A,{open:n,onClose:()=>{m.current=null,s(!1)},anchorEl:m.current,anchorOrigin:{vertical:"right",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"center"},children:(0,h.jsx)("div",{style:{width:"10rem"},children:(0,h.jsxs)(r.A,{children:[(0,h.jsxs)(i.A,{onClick:p,children:[(0,h.jsx)(a.A,{}),(0,h.jsx)(o.A,{style:{marginLeft:"0.5rem"},children:"MyProfile"})]}),(0,h.jsxs)(i.A,{onClick:async()=>{try{const{data:e}=await u.A.get("".concat("https://chat-app-mern-07dn.onrender.com","/api/v1/user/logout"),{withCredentials:!0});l((0,d.TW)()),x.Ay.success(e.message)}catch(t){var e,n;x.Ay.error((null===t||void 0===t||null===(e=t.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message)||"Something went wrong")}s(!1)},children:[(0,h.jsx)(c.A,{}),(0,h.jsx)(o.A,{style:{marginLeft:"0.5rem"},children:"Logout"})]})]})})})},p=(0,l.memo)(m)},5948:(e,n,s)=>{s.d(n,{Q7:()=>i,dF:()=>l,xB:()=>o});var t=s(5043),r=s(3768);const i=(e,n)=>{(0,t.useEffect)((()=>(Object.entries(n).forEach((n=>{let[s,t]=n;e.on(s,t)})),()=>{Object.entries(n).forEach((n=>{let[s,t]=n;e.off(s,t)}))})),[e,n])},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];(0,t.useEffect)((()=>{e.forEach((e=>{let{isError:n,error:s,fallBack:t}=e;var i;n&&(t?t():r.Ay.error((null===s||void 0===s||null===(i=s.data)||void 0===i?void 0:i.message)||"Something went wrong"))}))}),[e])},l=e=>{const[n,s]=(0,t.useState)(!1),[i,o]=(0,t.useState)(null),[l]=e();return[async function(e){s(!0);const n=r.Ay.loading(e||"Updating data...");try{for(var t=arguments.length,i=new Array(t>1?t-1:0),a=1;a<t;a++)i[a-1]=arguments[a];const e=await l(...i);var c,d;if(e.data)r.Ay.success(e.data.message||"Updated data Successfuly",{id:n}),o(e.data);else r.Ay.error((null===e||void 0===e||null===(c=e.error)||void 0===c||null===(d=c.data)||void 0===d?void 0:d.message)||"Something went wrong",{id:n})}catch(x){console.log(x),r.Ay.error("Something went wrong!",{id:n})}finally{s(!1)}},n,i]}},5079:(e,n,s)=>{s.d(n,{A:()=>d});var t=s(5043),r=s(8911),i=s(5754),o=s(6446),l=s(9379),a=s(579);const c=e=>{let{avatar:n=[],max:s=4}=e;return(0,a.jsx)(r.A,{direction:"row",spacing:.5,children:(0,a.jsxs)(i.A,{max:s,sx:{position:"relative"},children:[(0,a.jsx)(o.A,{width:"5rem",height:"3rem"}),n&&(null===n||void 0===n?void 0:n.map(((e,n)=>{var s;return(0,a.jsx)(l.A,{src:null!==e&&void 0!==e&&e.avatar?null===e||void 0===e||null===(s=e.avatar)||void 0===s?void 0:s.url:e,alt:"Avatar ".concat(n),sx:{width:"3rem",height:"3rem",position:"absolute",left:{xs:"".concat(.5+n,"rem"),sm:"".concat(n+1,"rem")}}},100*Math.random())})))]})})},d=(0,t.memo)(c)},3302:(e,n,s)=>{s.d(n,{A:()=>l});var t=s(5043),r=s(9367),i=s(579);const o=e=>{let{title:n="We-Chat",description:s="This is the Chat App",newMessagesCount:t=0}=e;return(0,i.jsxs)(r.mg,{children:[t>0?(0,i.jsx)("title",{children:"(".concat(t,") ")+n}):(0,i.jsx)("title",{children:n}),(0,i.jsx)("meta",{name:"description",content:s})]})},l=(0,t.memo)(o)}}]);
//# sourceMappingURL=390.eae837c8.chunk.js.map