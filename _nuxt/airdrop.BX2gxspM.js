import{a7 as C,A as p,O as n,aP as T,ax as w,D as s,aQ as o,a8 as r,B as m,g as h,R as f,W as i,f as l,h as c,G as u}from"./entry.D18hrNzw.js";const b=C("airdrop",{state:()=>({tasks:[],balanceTickets:0,tonConnectUI:null,tonConnect:null,tonAddress:"",dateStart:"2024-08-28T12:00:00Z",dateEnd:"2024-09-26T12:00:00Z",selectedTab:p.tokens,withdrawAvailable:[],withdrawUnavailable:[],withdrawComingSoon:[],token:"$HMSTR",walletLink:"",walletSecret:"",hasReset:!0,remainSecondForDirectClaim:0,remainSecondForCloseOffChain:0,offChainInterval:null,offChainTimestamp:0,directClaimInterval:null,directClaimTimestamp:0}),actions:{getPointImage(t){switch(t){case"airdrop_points":return w.TOKEN;case n.passive_income:return T;case n.earn_tasks:return"/images/airdrop/earn_tasks.png";case n.friends:return"/images/airdrop/friends.png";case n.achievements:return"/images/airdrop/achievements.png";case n.keys:return"/images/minigame/key.png";default:return""}},getPointImageCompressed(t){switch(t){case"airdrop_points":return w.TOKEN_WEBP;case n.earn_tasks:return"/images/airdrop/earn_tasks.webp";case n.friends:return"/images/airdrop/friends.webp";case n.achievements:return"/images/airdrop/achievements.webp";case n.keys:return"/images/minigame/key.webp";default:return""}},getTaskName(t){switch(t){case o.INVITE_FRIENDS:return s().$i18n.t("airdrop.invite_friends",{n:5});case o.REACH_PROFIT_PER_HOUR:return s().$i18n.t("airdrop.reach_profit_per_hour",{value:"10k"});case o.REACH_LEVEL:return s().$i18n.t("airdrop.reach_level",{level:4});case o.SUBSCRIBE_TELEGRAM_CHANNEL:case o.CONNECT_TON_WALLET:return s().$i18n.t(`airdrop.${t}`,{network:"TON"});default:return s().$i18n.t("airdrop.task")}},async postListTasks(){return await r.post("/interlude/list-airdrop-tasks",{}).then(t=>(t!=null&&t.airdropTasks&&this.setTasks(t.airdropTasks),t!=null&&t.balanceTickets&&this.setBalanceTickets(t.balanceTickets),t)).catch(t=>{m.error({title:s().$i18n.t("messages.request_error"),message:s().$i18n.t("messages.no_airdrop_tasks")})})},async postResetAccount(){return await r.post("/interlude/withdraw/reset",{body:{}}).then(t=>(h().setUserResponseData(t),t))},async postWithdrawList(){var t;return await r.post("/interlude/withdraw/list",{body:{...((t=f().location)==null?void 0:t.country_code)&&{ipInfo:f().location}}}).then(e=>(e.available&&(this.withdrawAvailable=e.available),e.unavailable&&(this.withdrawUnavailable=e.unavailable),e.comingsoon&&(this.withdrawComingSoon=e.comingsoon),e.hasReset!==void 0&&e.hasReset!==null&&(this.hasReset=e.hasReset),Number.isFinite(e.remainSecondForDirectClaim)&&(this.remainSecondForDirectClaim=e.remainSecondForDirectClaim??0,this.startDirectClaimInterval()),Number.isFinite(e.remainSecondForCloseOffChain)&&(this.remainSecondForCloseOffChain=e.remainSecondForCloseOffChain??0,this.startOffChainInterval()),e)).catch(e=>{m.error({title:s().$i18n.t("messages.request_error"),message:s().$i18n.t("messages.no_airdrop_tasks")})})},async postWithdrawExchangeSetAsDefault(t){return await r.post("/interlude/withdraw/set-exchange-as-default",{body:t}).then(e=>(h().setUserResponseData(e),e))},async postWithdrawSetEBIUID(t){return await r.post("/interlude/ebi/set-ebi-uid",{body:{uid:t}}).then(e=>(h().setUserResponseData(e),e))},async postWithdrawSetWalletAsDefault(t,e){return await r.post("/interlude/withdraw/set-wallet-as-default",{body:{id:t,...e&&{walletAddress:e}}}).then(a=>(h().setUserResponseData(a),a))},async postWithdrawTelegramWalletInfo(){return await r.post("/interlude/withdraw/telegram-wallet-info",{}).then(t=>(h().setUserResponseData(t),t.secret&&this.setWalletSecret(t.secret),t.walletLink&&this.setWalletLink(t.walletLink),t))},async postWithdrawTelegramWalletCheckInfo(t,e){return await r.post("/interlude/withdraw/telegram-wallet-check-info",{body:{status:t,secret:e}}).then(a=>(h().setUserResponseData(a),a))},async postCheckTask(t){return await r.post("/interlude/check-airdrop-task",{body:{...t}}).then(e=>(e!=null&&e.balanceTickets&&this.setBalanceTickets(e.balanceTickets),e))},async postDeleteWallet(){return await r.post("/interlude/delete-wallet",{}).then(t=>(t!=null&&t.balanceTickets&&this.setBalanceTickets(t.balanceTickets),t))},setTasks(t=[]){t.length&&(this.tasks=t)},getWithdrawImage(t){switch(t){case i.OKX:return"/images/withdraw/okx_.png";case i.Binance:return"/images/withdraw/binance.png";case i.Bybit:return"/images/withdraw/bybit.png";case i.TelegramWallet:return"/images/withdraw/wallet.png";case i.TonWallet:return"/images/withdraw/ton_wallet.png";case i.OnChain:return"/images/withdraw/on-chain.png";case i.EBI:return"/images/withdraw/ebi.png";default:return"/images/withdraw/lock.png"}},getWithdrawImageCompressed(t){switch(t){case i.OKX:return"/images/withdraw/okx_.webp";case i.Binance:return"/images/withdraw/binance.webp";case i.Bybit:return"/images/withdraw/bybit.webp";case i.TelegramWallet:return"/images/withdraw/wallet.webp";case i.TonWallet:return"/images/withdraw/ton_wallet.webp";case i.OnChain:return"/images/withdraw/on-chain.webp";case i.EBI:return"/images/withdraw/ebi.webp";default:return"/images/withdraw/lock.webp"}},getWithdrawItemName(t){const e=l().withdraw.find(a=>a.id===t);return e&&e.name?c().getLocalizedString(e.name):t},getWithdrawTitle(t){const e=l().withdraw.find(a=>a.id===t);return e&&e.title?c().getLocalizedString(e.title):t},getWithdrawShort(t){const e=l().withdraw.find(a=>a.id===t);return e&&e.short?e.short:t},getWithdrawDescription(t){const e=l().withdraw.find(a=>a.id===t);return e&&e.description?c().getLocalizedString(e.description):t},getWithdrawRegisterCode(t){const e=l().withdraw.find(a=>a.id===t);return e==null?void 0:e.registerCode},getWithdrawRegisterLink(t){const e=l().withdraw.find(a=>a.id===t);return e==null?void 0:e.registerLink},getWithdrawKYC(t){const e=l().withdraw.find(a=>a.id===t);return e?(e==null?void 0:e.needKYC)??!1:!1},setBalanceTickets(t){this.balanceTickets=t},setSelectedTab(t){this.selectedTab=t},setWalletSecret(t){this.walletSecret=t},setWalletLink(t){this.walletLink=t},hashcode(t){let e=0;const a=JSON.stringify(t).replace(/\{|\"|\}|\:|,/g,""),g=a.length;for(let d=0;d<g;d++)e+=a.charCodeAt(d)*7;return e},resetOffChainInterval(){this.offChainInterval&&clearInterval(this.offChainInterval),this.offChainInterval=null,this.offChainTimestamp=c().getNowTimestamp()},startOffChainInterval(){this.resetOffChainInterval(),this.remainSecondForCloseOffChain&&(this.offChainInterval=u(()=>{let t=1;const e=c().getNowTimestamp();e-this.offChainTimestamp>1&&(t=e-this.offChainTimestamp),this.remainSecondForCloseOffChain-=t,this.remainSecondForCloseOffChain<=0&&(this.remainSecondForCloseOffChain=0,this.resetOffChainInterval()),this.offChainTimestamp=e},1e3))},resetDirectClaimInterval(){this.directClaimInterval&&clearInterval(this.directClaimInterval),this.directClaimInterval=null,this.offChainTimestamp=c().getNowTimestamp()},startDirectClaimInterval(){this.resetDirectClaimInterval(),this.remainSecondForDirectClaim&&(this.directClaimInterval=u(()=>{let t=1;const e=c().getNowTimestamp();e-this.offChainTimestamp>1&&(t=e-this.offChainTimestamp),this.remainSecondForDirectClaim-=t,this.remainSecondForDirectClaim<=0&&(this.remainSecondForDirectClaim=0,this.resetDirectClaimInterval()),this.offChainTimestamp=e},1e3))}}});export{b as u};
