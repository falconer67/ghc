import{d as I,an as A,h as g,a9 as U,k as $,l as v,p as B,o as r,c as _,a as s,b as M,u as i,K as R,e as G,z as w,B as x,D as b,f as W,_ as E,E as Z,ah as F,t as j,F as D,r as V,y as z}from"./entry.D18hrNzw.js";import{_ as P}from"./Preloader.vue.DBUplQo8.js";import{_ as O}from"./Image.vue.D3FhBnRw.js";const q=""+globalThis.__publicAssetsURL("images/minigame/alarm_clock.webp"),J=""+globalThis.__publicAssetsURL("images/minigame/alarm_clock.png"),Q=q,X={class:"bs-content"},Y={class:"bs-content-image is-minigame-alarm-clock"},ee=s("picture",null,[s("source",{srcset:Q,type:"image/webp"}),s("img",{src:J})],-1),te=["innerHTML"],ne=["innerHTML"],se={class:"bs-content-buttons"},oe=["disabled"],ae={class:"minigame-button-replay"},ie=["innerHTML"],re={class:"minigame-button-replay-timer"},ce=["innerHTML"],be=I({__name:"MiniGameLose",setup(S){const{$event:f}=b(),e=A(),m=g();U();const a=$(!1),l=()=>{g().trackEvent(`minigame_${e.getMiniGameTrackId()}_watch_youtube`)},o=async()=>{e.sceneLoaded&&(a.value||(a.value=!0,await new Promise(n=>setTimeout(n,400)),await e.postStartDailyKeysMiniGame().then(n=>{w().useHapticFeedback("heavy"),e.showGamePage(),e.startGame(),f("bs:close"),g().trackEvent(`minigame_${e.getMiniGameTrackId()}_retry_success`)}).catch(async n=>{x.promise({}).reject({title:b().$i18n.t("messages.oops"),duration:3e3}),g().trackEvent(`minigame_${e.getMiniGameTrackId()}_retry_error`),await W().postConfig()}).finally(()=>{setTimeout(()=>{a.value=!1},400)})))},k=v(()=>{var p,u,y,T,L,H,K,C,N;if(!e.dailyKeysMiniGame||(p=e.dailyKeysMiniGame)!=null&&p.remainSecondsToNextAttempt&&(((u=e.dailyKeysMiniGame)==null?void 0:u.remainSecondsToNextAttempt)<=3&&e.openPage(),((y=e.dailyKeysMiniGame)==null?void 0:y.remainSecondsToNextAttempt)<=0)||!e.dailyKeysMiniGame||(T=e.dailyKeysMiniGame)!=null&&T.remainSecondsToNextAttempt&&((L=e.dailyKeysMiniGame)==null?void 0:L.remainSecondsToNextAttempt)<=0)return"00:00";const n=Math.floor(((H=e.dailyKeysMiniGame)==null?void 0:H.remainSecondsToNextAttempt)%60),t=Math.floor(((K=e.dailyKeysMiniGame)==null?void 0:K.remainSecondsToNextAttempt)/60%60),d=Math.floor(((C=e.dailyKeysMiniGame)==null?void 0:C.remainSecondsToNextAttempt)/(60*60*24)),c=Math.floor(((N=e.dailyKeysMiniGame)==null?void 0:N.remainSecondsToNextAttempt)/(60*60)%24)+d*24;return c>0?`${m.padWithZero(c)}:${m.padWithZero(t)}:${m.padWithZero(n)}`:`${m.padWithZero(t)}:${m.padWithZero(n)}`}),h=v(()=>{var n,t;return e.dailyKeysMiniGame&&((n=e.dailyKeysMiniGame)==null?void 0:n.remainSecondsToNextAttempt)&&((t=e.dailyKeysMiniGame)==null?void 0:t.remainSecondsToNextAttempt)>0});return B(()=>{g().trackEvent(`minigame_${e.getMiniGameTrackId()}_dialog_lose`)}),(n,t)=>{var u;const d=E,c=Z,p=P;return r(),_("div",X,[s("div",Y,[M(d,{name:"alarm-clock-glow"}),ee]),s("div",{class:"bs-content-title",innerHTML:n.$t("minigame.lose_title")},null,8,te),s("div",{class:"bs-content-description no-gap",innerHTML:n.$t("minigame.lose_description")},null,8,ne),s("div",se,[M(c,{class:"bottom-sheet-button button button-primary button-default",to:(u=i(e).dailyKeysMiniGame)==null?void 0:u.youtubeUrl,onClick:l,target:"_blank",innerHTML:n.$t("buttons.watch_youtube_video")},null,8,["to","innerHTML"]),i(h)?(r(),_("button",{key:0,class:"button button-default button-dark",onClick:o,disabled:!i(a)&&i(h)},[s("div",ae,[s("p",{innerHTML:n.$t("buttons.retry")},null,8,ie),s("div",re,[M(d,{class:"is-16",name:"alarm"}),s("p",null,R(i(k)),1)])])],8,oe)):(r(),_("button",{key:1,class:"button button-primary button-default",onClick:o},[!i(a)&&i(e).sceneLoaded?(r(),_("span",{key:0,innerHTML:n.$t("buttons.retry")},null,8,ce)):(r(),G(p,{key:1}))]))])])}}}),me={class:"bs-content"},le=["innerHTML"],de={class:"bs-rating"},ue=["disabled"],_e=["innerHTML"],he=I({__name:"PlaygroundRate",props:{gameTitle:{},gameId:{},icon:{}},setup(S){const{$event:f}=b(),e=g(),m=F(),a=$(!1);let l=$(0);const o=S,k=t=>{l.value=t},h=v(()=>!!A().dailyKeysMiniGames[o.gameId]),n=async()=>{let t;if(l.value>0&&o.gameId){a.value=!0,t=x.promise({title:b().$i18n.t("messages.process_request")});const d={rating:l.value,...h.value&&{miniGameId:o.gameId},...!h.value&&{promoId:o.gameId}};await m.postGameRating(d).then(c=>{w().useHapticFeedback("heavy"),t==null||t.resolve({message:`${b().$i18n.t("messages.success")}`,duration:4e3}),e.trackEvent(`playground_rate_${o.gameId}_${l.value}`),f("bs:close")}).catch(c=>{t==null||t.reject(b().$i18n.t("messages.oops"))}).finally(()=>{setTimeout(()=>{a.value=!1},400)})}};return(t,d)=>{const c=O,p=E,u=P;return r(),_("div",me,[o.icon?(r(),G(c,{key:0,class:"bs-rating-icon",image:o.icon.defaultUrl,compressed:o.icon.compressedUrl},null,8,["image","compressed"])):j("",!0),s("div",{class:"bs-content",innerHTML:t.$t("playground.rate_game_2",{title:o.gameTitle})},null,8,le),s("div",de,[(r(),_(D,null,V(5,(y,T)=>M(p,{key:`rating-star${y}`,name:"star",onClick:()=>k(y),class:z({"is-rate-selected":i(l)>=y})},null,8,["onClick","class"])),64))]),s("button",{class:"bottom-sheet-button button button-primary button-default",onClick:n,disabled:i(a)},[i(a)?(r(),G(u,{key:1})):(r(),_("span",{key:0,innerHTML:t.$t("playground.rate_btn")},null,8,_e))],8,ue)])}}});export{be as _,he as a};
