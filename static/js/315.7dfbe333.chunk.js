"use strict";(self.webpackChunkfilm_hub=self.webpackChunkfilm_hub||[]).push([[315],{315:(e,t,s)=>{s.r(t),s.d(t,{default:()=>j});var i=s(3123),l=s(4554),a=s(3044),r=s(890),o=s(4518),n=s(5228),d=s(3896),c=s(2791),x=s(5048),h=s(7689),m=s(1087),u=s(9354),v=s(8503),f=s(3124),p=s(2703),b=s(184);const g=e=>{const{children:t,value:s,index:i,...l}=e;return(0,b.jsx)("div",{role:"tabpanel",hidden:s!==i,"aria-labelledby":"tab-".concat(i),...l,children:t})},j=e=>{var t,s;let{theme:j}=e,w="movies";const Z=localStorage.getItem("session_id"),y=(0,h.s0)();"tv"===localStorage.getItem("type")&&(w="tv"),Z||y("/");const{user:I}=(0,x.v9)(v.np),{data:_,isFetching:k,error:C,refetch:S}=(0,f.Gx)({listName:"favorite/".concat(w),accountId:I.id,sessionId:localStorage.getItem("session_id"),page:1}),{data:L,isFetching:P,error:W,refetch:B}=(0,f.Gx)({listName:"watchlist/".concat(w),accountId:I.id,sessionId:localStorage.getItem("session_id"),page:1}),[E,F]=(0,m.lr)(),A=E.get("tab"),[M,z]=(0,c.useState)(!1),[G,N]=(0,c.useState)(A||0);(0,c.useEffect)((()=>{N(A>=0&&A<=1?+A:0)}),[A]),(0,c.useEffect)((()=>{const{unsubscribe:e}=B(),{unsubscribe:t}=S();return()=>{e(),t()}}),[]);return(0,b.jsxs)(l.Z,{children:[(0,b.jsxs)(l.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",children:[(0,b.jsxs)(l.Z,{display:"flex",overflow:"hidden",flex:"1",minWidth:"200px",children:[(0,b.jsx)(a.Z,{sx:{border:"1px solid",p:1,width:{xs:"45px",sm:"60px"},height:{xs:"45px",sm:"60px"}},mb:"-1rem",alt:null===I||void 0===I?void 0:I.username,src:"https://www.themoviedb.org/t/p/w64_and_h64_face/".concat(null===I||void 0===I||null===(t=I.avatar)||void 0===t||null===(s=t.tmdb)||void 0===s?void 0:s.avatar_path)}),(0,b.jsxs)(l.Z,{display:"flex",flexDirection:"column",ml:"1rem",children:[(0,b.jsx)(r.Z,{sx:{fontSize:{xs:"26px",sm:"34px"}},gutterBottom:!0,children:"Your Profile"}),(0,b.jsx)(r.Z,{variant:"body1",color:"#7a7a7a",sx:{overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},children:null!==I&&void 0!==I&&I.username?"@".concat(I.username):"User"})]})]}),(0,b.jsxs)(o.Z,{size:"small",sx:{height:"max-content"},color:"light"===j.palette.mode?"primary":"error",variant:"outlined",onClick:()=>z(!0),children:["Logout \xa0 ",(0,b.jsx)(i.Z,{})]})]}),(0,b.jsx)(l.Z,{sx:{borderBottom:1,borderColor:"divider",mt:"2rem"},children:(0,b.jsxs)(n.Z,{value:G,onChange:(e,t)=>{F({tab:t}),N(t)},"aria-label":"Movie tabs",textColor:"inherit",children:[(0,b.jsx)(d.Z,{label:"Favorites",...(0,p.Pf)(0)}),(0,b.jsx)(d.Z,{label:"Watchlist",...(0,p.Pf)(1)})]})}),(0,b.jsx)(g,{value:G,index:0,children:(0,b.jsx)(u.LP,{theme:j,movies:_,fallbackText:"Add some favorite movies to see them here!",title:"Favorite Movies",isLoading:k,isError:C})}),(0,b.jsx)(g,{value:G,index:1,children:(0,b.jsx)(u.LP,{theme:j,movies:L,fallbackText:'Add some movies to "watchlist" and you\'ll see them here!',title:"Watchlist Movies",isLoading:P,isError:W})}),(0,b.jsx)(u.e3,{setAlertBox:z,alertBox:M,theme:j})]})}}}]);
//# sourceMappingURL=315.7dfbe333.chunk.js.map