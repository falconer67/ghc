import{o as t,c as s,u as o,aP as r,N as n,a7 as i,an as c,a9 as l,aj as m,a1 as _,a2 as d,h as u}from"./entry.45ebv4df.js";const p=["src"];function f(e,a){return t(),s("img",{class:"coin img-responsive",src:"IMAGE_COIN"in e?e.IMAGE_COIN:o(r)},null,8,p)}const C={},E=n(C,[["render",f]]),h=i("attraction",{state:()=>({completed:!1}),actions:{checkAttraction(){var e;c().getDailyKeysMiniGameClaimed&&l().getDailyComboClaimed&&m().getDailyCipherClaimed&&(((e=_().tasks.find(a=>a.id===d.STREAK_DAYS_SPECIAL))==null?void 0:e.isCompleted)??!1)?(this.completed=!0,u().trackEvent("attraction_reached")):this.completed=!1}}});export{E as _,h as u};
