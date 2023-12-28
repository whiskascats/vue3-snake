import{o as L,n as K,h as V,i as $,j as E,k as P,l as y,m as S,p as B,q as D,d as j,u as G,s as R,t as z,a as H,c as _,b as m,F as N,v as W,e as T,x as O,g as k}from"./index-giqcfcQP.js";import{u as Q}from"./index-Bd3G-s77.js";function F(s){return V()?($(s),!0):!1}function I(s){return typeof s=="function"?s():E(s)}const U=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Y=Object.prototype.toString,q=s=>Y.call(s)==="[object Object]",J=()=>{};function X(s){return s||P()}function Z(s,r=!0,l){X()?L(s,l):r?s():K(s)}function ee(s){var r;const l=I(s);return(r=l==null?void 0:l.$el)!=null?r:l}const M=U?window:void 0;function te(...s){let r,l,u,i;if(typeof s[0]=="string"||Array.isArray(s[0])?([l,u,i]=s,r=M):[r,l,u,i]=s,!r)return J;Array.isArray(l)||(l=[l]),Array.isArray(u)||(u=[u]);const a=[],o=()=>{a.forEach(h=>h()),a.length=0},f=(h,v,g,w)=>(h.addEventListener(v,g,w),()=>h.removeEventListener(v,g,w)),p=S(()=>[ee(r),I(i)],([h,v])=>{if(o(),!h)return;const g=q(v)?{...v}:v;a.push(...l.flatMap(w=>u.map(A=>f(h,w,A,g))))},{immediate:!0,flush:"post"}),c=()=>{p(),o()};return F(c),c}function oe(){const s=y(!1);return P()&&L(()=>{s.value=!0}),s}function ne(s){const r=oe();return D(()=>(r.value,!!s()))}function se(s,r={}){const{window:l=M}=r,u=ne(()=>l&&"matchMedia"in l&&typeof l.matchMedia=="function");let i;const a=y(!1),o=c=>{a.value=c.matches},f=()=>{i&&("removeEventListener"in i?i.removeEventListener("change",o):i.removeListener(o))},p=B(()=>{u.value&&(f(),i=l.matchMedia(I(s)),"addEventListener"in i?i.addEventListener("change",o):i.addListener(o),a.value=i.matches)});return F(()=>{p(),f(),i=void 0}),a}function ae(s={}){const{window:r=M,initialWidth:l=Number.POSITIVE_INFINITY,initialHeight:u=Number.POSITIVE_INFINITY,listenOrientation:i=!0,includeScrollbar:a=!0}=s,o=y(l),f=y(u),p=()=>{r&&(a?(o.value=r.innerWidth,f.value=r.innerHeight):(o.value=r.document.documentElement.clientWidth,f.value=r.document.documentElement.clientHeight))};if(p(),Z(p),te("resize",p,{passive:!0}),i){const c=se("(orientation: portrait)");S(c,()=>p())}return{width:o,height:f}}const re={class:"game"},ie={class:"board"},le=m("div",null,null,-1),ce=[le],ue=m("div",{class:"words lt"}," SNAA ",-1),de=m("div",{class:"words tl"}," AAAAKE ",-1),he=m("div",{class:"words rb"}," SNAA ",-1),ve=m("div",{class:"words br"}," AAAAKE ",-1),fe={class:"best"},pe={class:"point"},ye={class:"score"},me={class:"point"},be=j({__name:"Game",setup(s){const r=G(),{width:l}=ae(),{score:u,bestScore:i}=R(Q()),a=y([]),o=z({width:28,height:16,speed:400}),f=y("pc"),p=y(!0),c=y([{x:Math.round(o.width/2),y:Math.round(o.height/2)}]),h=y({x:0,y:0}),v=y([0,0]);let g=0;const w=(t,n)=>e=>{a.value[t]||(a.value[t]=[]),a.value[t][n]=e},A=()=>{let t=[],n={x:0,y:0};do n={x:Math.floor(Math.random()*o.width),y:Math.floor(Math.random()*o.height)},t=c.value.filter(e=>n.x===e.x&&n.y===e.y);while(t.length>0);return n},x={create(){h.value=A();const{x:t,y:n}=h.value;a.value[n][t].classList.add("food-img"),this.shadow()},shadow(){const{x:t,y:n}=h.value;for(let e=1;e<8;e++){let d=(1-e/8)*.2;t-e>=0&&(a.value[n][t-e].style.backgroundColor=`rgba(255, 255, 255, ${d})`),t+e<=o.width-1&&(a.value[n][t+e].style.backgroundColor=`rgba(255, 255, 255, ${d})`),n-e>=0&&(a.value[n-e][t].style.backgroundColor=`rgba(255, 255, 255, ${d})`),n+e<=o.height-1&&(a.value[n+e][t].style.backgroundColor=`rgba(255, 255, 255, ${d})`)}},remove(){const{x:t,y:n}=h.value;for(let e=1;e<8;e++)t-e>=0&&(a.value[n][t-e].style.backgroundColor=""),t+e<=o.width-1&&(a.value[n][t+e].style.backgroundColor=""),n-e>=0&&(a.value[n-e][t].style.backgroundColor=""),n+e<=o.height-1&&(a.value[n+e][t].style.backgroundColor="");a.value[n][t].classList.remove("food-img")}},b={draw(){if(p.value){let t=c.value.length,n=c.value[t-1];for(let e=0;e<t;e++){let d=a.value[c.value[e].y][c.value[e].x];d.style.backgroundColor="#00FFE2",d.style.opacity=`${(e+1)/t}`,d.style.boxShadow="none",d.style.boxShadow="0 0 30px 6px #fff"}for(let e=0;e<t-1;e++)n.x==c.value[e].x&&n.y==c.value[e].y&&(a.value[n.y][n.x].style.backgroundColor="#ff7600",p.value=!1,window.removeEventListener("keydown",C),setTimeout(()=>{r.push({name:"GameOver"})},1500))}else clearInterval(g)},move(){let t=c.value.length,n=c.value[t-1],e=c.value[0],d={x:(n.x+v.value[0]+o.width)%o.width,y:(n.y+v.value[1]+o.height)%o.height};c.value.push(d),a.value[e.y][e.x].style.backgroundColor="",a.value[e.y][e.x].style.opacity="",a.value[e.y][e.x].style.boxShadow="",x.shadow(),d.x===h.value.x&&d.y===h.value.y?(u.value++,u.value>i.value&&(i.value=u.value,localStorage.setItem("best",String(i.value))),x.remove(),x.create()):c.value.splice(0,1),this.draw()},directionControl(t){clearInterval(g),v.value=t,this.move(),g=setInterval(()=>{this.move()},o.speed)}},C=t=>{let n=c.value.length;switch(t.code){case"KeyA":case"ArrowLeft":(v.value[0]!==1||n===1)&&b.directionControl([-1,0]);break;case"KeyW":case"ArrowUp":(v.value[1]!==1||n===1)&&b.directionControl([0,-1]);break;case"KeyD":case"ArrowRight":(v.value[0]!==-1||n===1)&&b.directionControl([1,0]);break;case"KeyS":case"ArrowDown":(v.value[1]!==-1||n===1)&&b.directionControl([0,1]);break;case"Escape":clearInterval(g),r.push({name:"Start"});break}};return S(()=>u.value,t=>{t>=60?o.speed=50:t>=40?o.speed=100:t>=20?o.speed=150:t>=10?o.speed=200:t>=5&&(o.speed=300)}),S(()=>l.value,t=>{t>992?(o.width=28,o.height=16,f.value="pc"):t>768?(o.width=20,o.height=14,f.value="pc"):t>576?(o.width=16,o.height=16,f.value="pc"):(o.width=12,o.height=16,f.value="mobile")},{deep:!0,immediate:!0}),L(()=>{x.create(),b.draw(),document.addEventListener("keydown",C),u.value=0,localStorage.getItem("best")!=null&&(i.value=Number(localStorage.getItem("best")))}),H(()=>{document.removeEventListener("keydown",C)}),(t,n)=>(k(),_("div",re,[m("div",ie,[(k(!0),_(N,null,W(o.height,e=>(k(),_("div",{class:"rows",key:e},[(k(!0),_(N,null,W(o.width,d=>(k(),_("div",{class:"grid",key:d,ref_for:!0,ref:w(e-1,d-1)},ce))),128))]))),128)),ue,de,he,ve,m("div",fe,[T(" best "),m("span",pe,O(E(i)),1)]),m("div",ye,[T(" score "),m("span",me,O(E(u)),1)])])]))}});export{be as default};
