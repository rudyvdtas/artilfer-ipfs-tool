;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="702adb5c-459d-0e5e-2df1-831caeb8bf2d")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,998085,e=>{"use strict";var r=e.i(866313),a=e.i(806056);function t(){let e,t,s=(0,r.c)(5),{enabled:i,endDate:n}=(0,a.useZeroFeesExperienceFlag)();return s[0]!==n?(e=n?new Date(n):void 0,s[0]=n,s[1]=e):e=s[1],s[2]!==i||s[3]!==e?(t={showZeroFeesExperience:i,endDate:e},s[2]=i,s[3]=e,s[4]=t):t=s[4],t}e.s(["useZeroFeesExperience",()=>t])},57465,e=>{"use strict";var r=e.i(885530),a=e.i(600028);let t=(0,r.graphql)(`
    fragment ItemRewardMedia on UserReward {
      id
      isGrandPrize
      item {
        ...ItemMedia
        chain {
          identifier
        }
      }
    }
  `,[a.ItemMediaFragment]);e.s(["ItemRewardMediaFragment",0,t])},234761,e=>{"use strict";var r=e.i(885530),a=e.i(455480),t=e.i(465172);let s=(0,r.graphql)(`
  fragment SortRewardsByValue_item on UserReward {
    __typename
    id
    item {
      bestOffer {
        pricePerItem {
          usd
        }
      }
    }
  }
`),i=(0,r.graphql)(`
  fragment SortRewardsByValue_token on UserTokenReward {
    __typename
    id
    balance {
      usdValue
    }
  }
`);function n(e){if("UserTokenReward"===e.__typename){let r=(0,a.readFragment)(i,e);return(0,t.bn)(r.balance?.usdValue??0).toNumber()}let r=(0,a.readFragment)(s,e);return(0,t.bn)(r.item?.bestOffer?.pricePerItem?.usd??0).toNumber()}function o(e,r){return[...e.map(e=>({original:e,sortData:(0,a.readFragment)(s,e)})),...r.map(e=>({original:e,sortData:(0,a.readFragment)(i,e)}))].sort((e,r)=>n(e.sortData)-n(r.sortData)).map(({original:e})=>e)}e.s(["SortRewardsByValue_itemFragment",0,s,"SortRewardsByValue_tokenFragment",0,i,"sortRewardsByValue",()=>o])},279155,e=>{"use strict";var r=e.i(81810),a=e.i(885530),t=e.i(111908);let s=(0,a.graphql)(`
    fragment TokenRewardMedia on UserTokenReward {
      id
      balance {
        usdValue
        currency {
          imageUrl
          ...CurrencyLockup
          metadata {
            ...useCurrencyBannerMedia
            ...useCurrencyBannerMediaFallback
          }
        }
      }
    }
  `,[r.CurrencyLockupFragment,t.useCurrencyBannerMediaFragment,t.useCurrencyBannerMediaFallbackFragment]);e.s(["TokenRewardMediaFragment",0,s])},186869,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  fragment TreasureRewardMedia on Badge {
    id
    name
    imageUrl
    animationUrl
  }
`);e.s(["TreasureRewardMediaFragment",0,r])},731049,845139,589534,320464,295165,731950,553919,e=>{"use strict";var r=e.i(885530),a=e.i(682576),t=e.i(201578),s=e.i(959105);e.i(661049);var i=e.i(190519),n=e.i(846428),o=e.i(57465);let l=(0,r.graphql)(`
    fragment GrandPrizeModal on UserReward {
      id
      treasureChestId
      item {
        id
        name
        collection {
          ...CollectionLockup
          ...CollectionPreviewTooltip
          name
          imageUrl
        }
      }
    }
  `,[a.CollectionLockupFragment,t.CollectionPreviewTooltipFragment]);e.s(["GrandPrizeModalFragment",0,l],845139);let d=(0,r.graphql)(`
    fragment ItemRewardCard on UserReward {
      id
      address
      claimedAt
      orderId
      isGrandPrize
      ...ItemRewardMedia
      ...GrandPrizeModal
      item {
        id
        name
        imageUrl
        ...ItemLink
        collection {
          ...CollectionLockup
          ...CollectionLink
          ...CollectionPreviewTooltip
          name
          imageUrl
        }
        ...useBuyItems
      }
    }
  `,[a.CollectionLockupFragment,n.useBuyItemsFragment,i.ItemLinkFragment,s.CollectionLinkFragment,t.CollectionPreviewTooltipFragment,o.ItemRewardMediaFragment,l]);e.s(["ItemRewardCardFragment",0,d],589534);var c=e.i(234761),u=e.i(767502),m=e.i(332238),E=e.i(622540),g=e.i(279155);let p=(0,r.graphql)(`
    fragment TokenRewardCard on UserTokenReward {
      id
      address
      treasureChestId
      claimedAt
      airdrop
      ...TokenRewardMedia
      claimActions(capabilities: $capabilities) {
        actions {
          ...ActionTimeline
          ...useActionsNetworkFees_action
        }
      }
      balance {
        usdValue
        quantity
        currency {
          name
          symbol
          ...ContextCurrency
        }
      }
    }
  `,[m.ActionTimelineFragment,u.ContextCurrencyFragment,g.TokenRewardMediaFragment,E.useActionsNetworkFees_actionFragment]);e.s(["TokenRewardCardFragment",0,p],320464);var _=e.i(186869);let C=(0,r.graphql)(`
    fragment TreasureRewardCard on Badge {
      id
      name
      description
      ...TreasureRewardMedia
    }
  `,[_.TreasureRewardMediaFragment]);e.s(["TreasureRewardCardFragment",0,C],295165);let h=(0,r.graphql)(`
    fragment OpenTreasureChestModal_treasure on Badge {
      __typename
      id
      name
      ...TreasureRewardCard
    }
  `,[C]),T=(0,r.graphql)(`
    fragment OpenTreasureChestModal on TreasureChest {
      id
      waveName
      openEnd
      chestLevels {
        level
        pointsRequired
      }
      userProgress {
        totalPoints
        hasExceededLevelCap
        currentLevel
        currentTier
        levelProgressPercent
        minimumVoyageChestLevel {
          level
          name
        }
      }
      userRewards {
        __typename
        id
        treasureChestId
        claimedAt
        address
        ...ItemRewardCard
        ...SortRewardsByValue_item
      }
      userTokenRewards {
        __typename
        id
        treasureChestId
        claimedAt
        address
        ...TokenRewardCard
        ...SortRewardsByValue_token
      }
      userTreasures {
        ...OpenTreasureChestModal_treasure
      }
    }
  `,[d,c.SortRewardsByValue_itemFragment,p,c.SortRewardsByValue_tokenFragment,h]);e.s(["OpenTreasureChestModalFragment",0,T,"OpenTreasureChestModal_treasureFragment",0,h],731950);let b=(0,r.graphql)(`
    fragment OpenChestButton_treasure on Badge {
      name
      ...OpenTreasureChestModal_treasure
    }
  `,[h]),L=(0,r.graphql)(`
    fragment OpenChestButton on TreasureChest {
      ...OpenTreasureChestModal
      userProgress {
        totalPoints
      }
      userRewards {
        id
        claimedAt
      }
      userTokenRewards {
        id
        claimedAt
      }
      userTreasures {
        ...OpenChestButton_treasure
      }
    }
  `,[T,b]);e.s(["OpenChestButtonFragment",0,L,"OpenChestButton_treasureFragment",0,b],731049);let R=(0,r.graphql)(`
  fragment TreasureChestWave on TreasureChest {
    id
    name
    waveName
  }
`);e.s(["TreasureChestWaveFragment",0,R],553919)},287342,293108,e=>{"use strict";var r=e.i(885530),a=e.i(455480),t=e.i(700398),s=e.i(630068),i=e.i(670383),n=e.i(731950),o=e.i(731049),l=e.i(553919);let d=(0,r.graphql)(`
    fragment TreasureChestContent on TreasureChest {
      id
      ...TreasureChestWave
      ...OpenChestButton
      chestLevels {
        level
        pointsRequired
      }
    }
  `,[l.TreasureChestWaveFragment,o.OpenChestButtonFragment]);e.s(["TreasureChestContentFragment",0,d],293108),e.i(402819);var c=e.i(916744),u=e.i(207225),m=e.i(598777);let E=(0,r.graphql)(`
    query useActiveTreasureChestsQuery($capabilities: WalletCapabilities) {
      activeTreasureChests(limit: 32) {
        items {
          id
          endDate
          ...TreasureChestContent
          ...TreasureChestWave
          ...OpenTreasureChestModal
          waveName
        }
      }
    }
  `,[d,l.TreasureChestWaveFragment,n.OpenTreasureChestModalFragment]),g=(0,r.graphql)(`
    subscription UseActiveTreasureChestsProgress(
      $accountId: String!
      $addresses: [Address!]
    ) {
      userTreasureChestProgress(accountId: $accountId, addresses: $addresses) {
        totalPoints
      }
    }
  `);function p(){let e=(0,t.usePrimaryAccount)(),r=(0,u.useAddress)(),{isUserOperationsEnabled:o,ready:l}=(0,s.useUserOperationsEnabled)(),[d,p]=(0,m.useAuthenticatedQuery)({query:E,variables:{capabilities:{eip7702:o}},pause:!(r&&l)}),{data:_,...C}=d,h=_?.activeTreasureChests?.items??[],T=h.at(0),b=(0,i.useMemo)(()=>{if(!T)return;let e=(0,a.readFragment)(n.OpenTreasureChestModalFragment,T);if(e.userProgress)return{totalPoints:e.userProgress.totalPoints,hasExceededLevelCap:e.userProgress.hasExceededLevelCap,currentLevel:e.userProgress.currentLevel,currentTier:e.userProgress.currentTier,levelProgressPercent:e.userProgress.levelProgressPercent,minimumVoyageChestLevel:e.userProgress.minimumVoyageChestLevel}},[T]);return(0,c.useSubscription)({query:g,variables:{accountId:e?.accountId??"",addresses:r?[r]:void 0},pause:!(e?.accountId&&r),pauseOnInactivity:!1},()=>{p({requestPolicy:"network-only"})}),{activeTreasureChests:h,activeTreasureChest:T,userProgress:b,...C,refetch:p,refetchProgress:()=>{r&&p({requestPolicy:"network-only"})}}}e.s(["useActiveTreasureChests",()=>p],287342)},356229,e=>{"use strict";var r=e.i(692632),a=e.i(607172);let t=[a.CLOSED_CHEST_LEVEL_1,a.CLOSED_CHEST_LEVEL_2,a.CLOSED_CHEST_LEVEL_3,a.CLOSED_CHEST_LEVEL_4,a.CLOSED_CHEST_LEVEL_5,a.CLOSED_CHEST_LEVEL_6,a.CLOSED_CHEST_LEVEL_7,a.CLOSED_CHEST_LEVEL_8,a.CLOSED_CHEST_LEVEL_9,a.CLOSED_CHEST_LEVEL_10,a.CLOSED_CHEST_LEVEL_11,a.CLOSED_CHEST_LEVEL_12,a.CLOSED_CHEST_LEVEL_13],s=[a.OPEN_CHEST_LEVEL_1,a.OPEN_CHEST_LEVEL_2,a.OPEN_CHEST_LEVEL_3,a.OPEN_CHEST_LEVEL_4,a.OPEN_CHEST_LEVEL_5,a.OPEN_CHEST_LEVEL_6,a.OPEN_CHEST_LEVEL_7,a.OPEN_CHEST_LEVEL_8,a.OPEN_CHEST_LEVEL_9,a.OPEN_CHEST_LEVEL_10,a.OPEN_CHEST_LEVEL_11,a.OPEN_CHEST_LEVEL_12,a.OPEN_CHEST_LEVEL_13];function i(e){return e>13?a.MYSTERY_CHEST_LEVEL_1:t[Math.max(e-1,0)]}function n(e){return e>13?a.MYSTERY_CHEST_LEVEL_1:t[Math.max(e-1,0)]}function o(e){if(e>13)return a.MYSTERY_CHEST_LEVEL_1;let r=Math.max(0,Math.min(e-1,s.length-1));return s[r]}function l(e){return(0,r.range)(13).map(r=>{let a=r+1,t=a<e,s=a>13,n=i(a),o=0===e&&1===a?"active":a<e?"completed":a===e?"active":"locked";return{id:a,isUnlocked:t,image:n,isMystery:s,status:o}})}e.s(["AVAILABLE_CHEST_LEVELS",0,13,"STARS_PER_LEVEL",0,3,"TOTAL_CHEST_LEVELS",0,13,"generateChestIcons",()=>l,"getChestImage",()=>i,"getMainChestImage",()=>n,"getOpenChestImage",()=>o])},308641,e=>{"use strict";var r=e.i(866313),a=e.i(885530),t=e.i(630068),s=e.i(731049),i=e.i(731950),n=e.i(553919);e.i(500598);var o=e.i(207225),l=e.i(598777);let d=(0,a.graphql)(`
    query useOpenableTreasureChestsQuery($capabilities: WalletCapabilities) {
      openableTreasureChests(limit: 32) {
        items {
          id
          userRewards {
            id
            claimedAt
          }
          userTokenRewards {
            id
            claimedAt
          }
          userProgress {
            totalPoints
            hasExceededLevelCap
            currentLevel
            currentTier
            levelProgressPercent
          }
          userTreasures {
            ...OpenChestButton_treasure
          }
          waveName
          ...TreasureChestWave
          ...OpenChestButton
          ...OpenTreasureChestModal
        }
      }
            mostRecentlyEndedTreasureChest {
              id
              openStart
              userRewards {
                id
                claimedAt
              }
              userTokenRewards {
                id
                claimedAt
              }
              userProgress {
                totalPoints
                hasExceededLevelCap
                currentLevel
                currentTier
                levelProgressPercent
              }
              userTreasures {
                ...OpenChestButton_treasure
              }
              waveName
              ...TreasureChestWave
              ...OpenChestButton
              ...OpenTreasureChestModal
            }
    }
  `,[n.TreasureChestWaveFragment,s.OpenChestButtonFragment,s.OpenChestButton_treasureFragment,i.OpenTreasureChestModalFragment]);function c(){let e,a,s,i,n,c,m,E,g,p,_,C=(0,r.c)(27),h=(0,o.useAddress)(),{isUserOperationsEnabled:T,ready:b}=(0,t.useUserOperationsEnabled)();C[0]!==T?(e={capabilities:{eip7702:T}},C[0]=T,C[1]=e):e=C[1];let L=!(h&&b);C[2]!==e||C[3]!==L?(a={query:d,variables:e,pause:L},C[2]=e,C[3]=L,C[4]=a):a=C[4];let[R,S]=(0,l.useAuthenticatedQuery)(a);C[5]!==R?({data:s,fetching:i,stale:c,...n}=R,C[5]=R,C[6]=s,C[7]=i,C[8]=n,C[9]=c):(s=C[6],i=C[7],n=C[8],c=C[9]),C[10]!==s?.openableTreasureChests?.items?(m=s?.openableTreasureChests?.items??[],C[10]=s?.openableTreasureChests?.items,C[11]=m):m=C[11];let v=m;C[12]!==s?.mostRecentlyEndedTreasureChest||C[13]!==v?(g=v.at(0),E=s?.mostRecentlyEndedTreasureChest,p=(g?.userTreasures??[]).filter(u),C[12]=s?.mostRecentlyEndedTreasureChest,C[13]=v,C[14]=E,C[15]=g,C[16]=p):(E=C[14],g=C[15],p=C[16]);let f=p,y=(g?.userRewards?.length??0)>0||(g?.userTokenRewards?.length??0)>0||f.length>0;return C[17]!==i||C[18]!==y||C[19]!==E||C[20]!==g||C[21]!==v||C[22]!==S||C[23]!==n||C[24]!==c||C[25]!==f?(_={openableTreasureChests:v,openableTreasureChest:g,mostRecentlyEndedTreasureChest:E,hasRewards:y,treasures:f,fetching:i,stale:c,...n,refetch:S},C[17]=i,C[18]=y,C[19]=E,C[20]=g,C[21]=v,C[22]=S,C[23]=n,C[24]=c,C[25]=f,C[26]=_):_=C[26],_}function u(e){return!!e}e.s(["useOpenableTreasureChests",()=>c])},230475,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(790621),s=e.i(437153);function i(e){let i,n,o,l,d,c,u,m,E=(0,a.c)(15);E[0]!==e?({size:o,fill:l,fillAttribute:d,className:i,...n}=e,E[0]=e,E[1]=i,E[2]=n,E[3]=o,E[4]=l,E[5]=d):(i=E[1],n=E[2],o=E[3],l=E[4],d=E[5]);let g=void 0===o?24:o,p=void 0===l?"current":l,_=void 0===d?"currentColor":d;return E[6]!==i||E[7]!==p?(c=(0,s.classNames)((0,t.fillVariants)({fill:p}),i),E[6]=i,E[7]=p,E[8]=c):c=E[8],E[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,r.jsx)("path",{d:"M336-120q-91 0-153.5-62.5T120-336q0-38 13-74t37-65l142-171-97-194h530l-97 194 142 171q24 29 37 65t13 74q0 91-63 153.5T624-120H336Zm144-200q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320Zm-95-360h190l40-80H345l40 80Zm-49 480h288q57 0 96.5-39.5T760-336q0-24-8.5-46.5T728-423L581-600H380L232-424q-15 18-23.5 41t-8.5 47q0 57 39.5 96.5T336-200Z"}),E[9]=u):u=E[9],E[10]!==_||E[11]!==n||E[12]!==g||E[13]!==c?(m=(0,r.jsx)("svg",{"aria-label":"Money Bag",className:c,fill:_,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...n,children:u}),E[10]=_,E[11]=n,E[12]=g,E[13]=c,E[14]=m):m=E[14],m}e.s(["MoneyBag",()=>i])},139972,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(790621),s=e.i(437153);e.s(["Treasure",0,e=>{let i,n,o,l,d,c,u,m,E=(0,a.c)(15);E[0]!==e?({size:o,fill:l,fillAttribute:d,className:i,...n}=e,E[0]=e,E[1]=i,E[2]=n,E[3]=o,E[4]=l,E[5]=d):(i=E[1],n=E[2],o=E[3],l=E[4],d=E[5]);let g=void 0===o?24:o,p=void 0===l?"current":l,_=void 0===d?"currentColor":d;return E[6]!==i||E[7]!==p?(c=(0,s.classNames)((0,t.fillVariants)({fill:p}),i),E[6]=i,E[7]=p,E[8]=c):c=E[8],E[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,r.jsx)("path",{d:"M5 31.6667H3.75V32.9167H5V31.6667ZM35 31.6667V32.9167H36.25V31.6667H35ZM21.25 16.6667V15.4167H18.75V16.6667H20H21.25ZM18.75 20V21.25H21.25V20H20H18.75ZM30 8.33337V7.08337H10V8.33337V9.58337H30V8.33337ZM10 8.33337V7.08337C6.54823 7.08337 3.75 9.8816 3.75 13.3334H5H6.25C6.25 11.2623 7.92894 9.58337 10 9.58337V8.33337ZM5 13.3334H3.75V31.6667H5H6.25V13.3334H5ZM5 31.6667V32.9167H35V31.6667V30.4167H5V31.6667ZM35 31.6667H36.25V13.3334H35H33.75V31.6667H35ZM35 13.3334H36.25C36.25 9.88162 33.4519 7.08337 30 7.08337V8.33337V9.58337C32.0711 9.58337 33.75 11.2623 33.75 13.3334H35ZM5 18.3334V19.5834H35V18.3334V17.0834H5V18.3334ZM13.3333 8.33337H12.0833V31.6667H13.3333H14.5833V8.33337H13.3333ZM26.6667 8.33337H25.4167V31.6667H26.6667H27.9167V8.33337H26.6667ZM20 16.6667H18.75V20H20H21.25V16.6667H20Z"}),E[9]=u):u=E[9],E[10]!==_||E[11]!==n||E[12]!==g||E[13]!==c?(m=(0,r.jsx)("svg",{"aria-label":"Treasure",className:c,fill:_,height:g,role:"img",viewBox:"0 0 40 40",width:g,xmlns:"http://www.w3.org/2000/svg",...n,children:u}),E[10]=_,E[11]=n,E[12]=g,E[13]=c,E[14]=m):m=E[14],m}])},904663,337021,34207,e=>{"use strict";var r=e.i(7683),a=e.i(437153),t=e.i(39771),s=e.i(657113),i=e.i(670383),n=e.i(356229),o=e.i(607172);let l={1:o.TREASURE_CHEST_RIVE_LEVEL_1,2:o.TREASURE_CHEST_RIVE_LEVEL_2,3:o.TREASURE_CHEST_RIVE_LEVEL_3,4:o.TREASURE_CHEST_RIVE_LEVEL_4,5:o.TREASURE_CHEST_RIVE_LEVEL_5,6:o.TREASURE_CHEST_RIVE_LEVEL_6,7:o.TREASURE_CHEST_RIVE_LEVEL_7,8:o.TREASURE_CHEST_RIVE_LEVEL_8,9:o.TREASURE_CHEST_RIVE_LEVEL_9,10:o.TREASURE_CHEST_RIVE_LEVEL_10,11:o.TREASURE_CHEST_RIVE_LEVEL_11,12:o.TREASURE_CHEST_RIVE_LEVEL_12,13:o.TREASURE_CHEST_RIVE_LEVEL_13};function d(e){return l[Math.max(1,Math.min(n.TOTAL_CHEST_LEVELS,e))]||o.TREASURE_CHEST_RIVE_LEVEL_1}e.s(["getChestRiveFile",()=>d],337021);let c=null;function u(){return c||(c=e.A(38162).then(({RuntimeLoader:e})=>{e.setWasmUrl("/rive.wasm")}).catch(e=>{console.error("[Rive] Failed to configure self-hosted WASM:",e),c=null}))}e.s(["setupRiveWasm",()=>u],34207);let m=(0,s.default)(()=>u().then(()=>e.A(641941)).then(({useRive:e})=>{let t=(0,i.forwardRef)(({src:t,stateMachines:s,onReady:n},o)=>{let[l,d]=(0,i.useState)(!1),[c,u]=(0,i.useState)(!1),m=(0,i.useRef)(null),{rive:E,RiveComponent:g}=e({src:t,stateMachines:s,autoplay:!0,onLoad:()=>{d(!1),u(!0),m.current=E,n?.()},onLoadError:e=>{console.error("[RiveChest] Failed to load animation:",e),d(!0)}});return((0,i.useImperativeHandle)(o,()=>({fireInput:e=>{if(!E)return;let r=Array.isArray(s)?s[0]:s;try{let a=E.stateMachineInputs(r||""),t=a?.find(r=>r.name===e);t?.fire?.()}catch(e){}}}),[E,s]),l)?null:(0,r.jsx)("div",{className:(0,a.classNames)("size-full",!c&&"opacity-0"),children:(0,r.jsx)(g,{className:"size-full"})})});return t.displayName="RiveChestInner",{default:t}}),{loadableGenerated:{modules:[190218]},loading:()=>null,ssr:!1}),E=(0,i.forwardRef)(({level:e,stateMachines:s,width:i,height:n,className:o,onReady:l},c)=>{let u=d(e);return(0,r.jsx)(t.FlexCenter,{className:(0,a.classNames)("shrink-0 justify-center",o),style:{width:i,height:n},children:(0,r.jsx)(m,{onReady:l,ref:c,src:u,stateMachines:s})})});E.displayName="RiveChest",e.s(["RiveChest",0,E],904663)},204557,406283,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(437153),s=e.i(254842),i=e.i(794576),n=e.i(534763),o=e.i(410338),l=e.i(692632),d=e.i(522285),c=e.i(567089);function u(e){let s,i,n=(0,a.c)(5),{children:o,className:l}=e;return n[0]!==l?(s=(0,t.classNames)("h-8 justify-center rounded-full border-none bg-bg-additional-1 px-3 font-sans normal-case",l),n[0]=l,n[1]=s):s=n[1],n[2]!==o||n[3]!==s?(i=(0,r.jsx)(c.Chip,{className:s,variant:"default",children:o}),n[2]=o,n[3]=s,n[4]=i):i=n[4],i}e.s(["TreasureChestChip",()=>u],406283);var m=e.i(356229);function E(e){let c,E,g,p=(0,a.c)(12),{filledStars:_,className:C,size:h,containerClassName:T,inactiveStarsClassName:b,level:L,showExcessPoints:R}=e,S=void 0===h?20:h,v=(0,d.useTranslations)("TreasureChest"),f=void 0!==R?R:void 0!==L&&L>m.AVAILABLE_CHEST_LEVELS;return p[0]!==C||p[1]!==T?(c=(0,t.classNames)(T,C),p[0]=C,p[1]=T,p[2]=c):c=p[2],p[3]!==_||p[4]!==b||p[5]!==f||p[6]!==S||p[7]!==v?(E=f?(0,r.jsxs)(s.Flex,{className:"items-center gap-1.5",children:[(0,r.jsx)(i.Info,{className:"text-text-secondary",size:16}),(0,r.jsx)("span",{className:"font-medium text-sm",children:v("excessPoints")})]}):(0,r.jsx)(s.Flex,{className:"gap-1",children:(0,l.range)(m.STARS_PER_LEVEL).map(e=>{let a=e<_,s=a?o.StarFilled:n.Star;return(0,r.jsx)("div",{children:(0,r.jsx)(s,{className:(0,t.classNames)("mb-[1px]",a?"text-warning":b||"text-text-secondary"),size:S})},e)})}),p[3]=_,p[4]=b,p[5]=f,p[6]=S,p[7]=v,p[8]=E):E=p[8],p[9]!==c||p[10]!==E?(g=(0,r.jsx)(u,{className:c,children:E}),p[9]=c,p[10]=E,p[11]=g):g=p[11],g}e.s(["StarRating",()=>E],204557)},933308,e=>{"use strict";let r="d65d8348-9374-4073-8469-6480ddcaa068",a="b024bb01-d0e9-4de5-baeb-30d03f0d99bb",t="4336cc5a-828d-46e0-b228-8af651b64a42",s="12ce87f3-354b-4926-8b91-febf80d64767",i="d120f02d-c140-4875-9e3a-87041f344d35",n=[r,a,t,s,i];e.s(["AIR_TIER_LABELS",0,{1:"1 shipment",2:"2 shipments",3:"3-4 shipments",4:"5-7 shipments",5:"8-9 shipments",6:"10+ shipments"},"BREAKER_BOUNTY_TIER_LABELS",0,{1:"Wood",2:"Iron",3:"Steel",4:"Titanium",5:"Chromium",6:"Cobalt",7:"Amethyst",8:"Topaz",9:"Sapphire",10:"Ruby",11:"Ember",12:"Solar",13:"Diamond",14:"Diamond"},"CAPTAINS_ANCHOR_TIER_LABELS",0,{1:"Wood",2:"Iron",3:"Steel",4:"Titanium",5:"Chromium",6:"Cobalt",7:"Amethyst",8:"Topaz",9:"Sapphire",10:"Ruby",11:"Ember",12:"Solar",13:"Diamond",14:"Diamond"},"COMMANDERS_TROVE_TIER_LABELS",0,{1:"Wood",2:"Iron",3:"Steel",4:"Titanium",5:"Chromium",6:"Cobalt",7:"Amethyst",8:"Topaz",9:"Sapphire",10:"Ruby",11:"Ember",12:"Solar",13:"Diamond",14:"Diamond"},"FIRE_TIER_LABELS",0,{1:"top 90%",2:"top 50%",3:"top 10%",4:"top 1%",5:"top 0.1%",6:"top 0.01%"},"KEEPERS_LIGHT_TIER_LABELS",0,{1:"Wood",2:"Iron",3:"Steel",4:"Titanium",5:"Chromium",6:"Cobalt",7:"Amethyst",8:"Topaz",9:"Sapphire",10:"Ruby",11:"Ember",12:"Solar",13:"Diamond",14:"Diamond"},"MARINER_TIER_LABELS",0,{1:"Wood",2:"Iron",3:"Steel",4:"Titanium",5:"Chromium",6:"Cobalt",7:"Amethyst",8:"Topaz",9:"Sapphire",10:"Ruby",11:"Ember",12:"Solar"},"NAVIGATORS_COMPASS_TIER_LABELS",0,{1:"Wood",2:"Iron",3:"Steel",4:"Titanium",5:"Chromium",6:"Cobalt",7:"Amethyst",8:"Topaz",9:"Sapphire",10:"Ruby",11:"Ember",12:"Solar",13:"Diamond",14:"Diamond"},"PRIOR_WAVE_IDS",0,n,"TREASURE_CHEST_WAVE_1_ID",0,r,"TREASURE_CHEST_WAVE_2_ID",0,a,"TREASURE_CHEST_WAVE_3_ID",0,t,"TREASURE_CHEST_WAVE_4_ID",0,s,"TREASURE_CHEST_WAVE_5_ID",0,i,"TREASURE_CHEST_WAVE_6_ID",0,"530fd873-d1c7-478d-863d-64b1e93fa796","VOYAGER_TIER_LABELS",0,{1:"participating",2:"top 50%",3:"top 40%",4:"top 30%",5:"top 20%",6:"top 10%",7:"top 5%",8:"top 3%",9:"top 1%",10:"top 0.5%",11:"top 0.25%",12:"top 0.1%"},"WATER_TIER_LABELS",0,{1:"useful",2:"helpful",3:"valuable",4:"important",5:"significant",6:"exceptional"}])},736376,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(670383);let s=(0,t.lazy)(()=>e.A(437129));function i(e){let i,n,o,l=(0,a.c)(6);return l[0]!==e?({animationData:i,...n}=e,l[0]=e,l[1]=i,l[2]=n):(i=l[1],n=l[2]),l[3]!==i||l[4]!==n?(o=(0,r.jsx)(t.Suspense,{fallback:null,children:(0,r.jsx)(s,{animationData:i,...n})}),l[3]=i,l[4]=n,l[5]=o):o=l[5],o}e.s(["Lottie",()=>i])},940084,e=>{"use strict";var r=e.i(866313),a=e.i(522285),t=e.i(356229);function s(e){let s,i=(0,r.c)(3),n=(0,a.useTranslations)("ChestNames");if(i[0]!==e||i[1]!==n){let r=["wood","iron","steel","titanium","chromium","cobalt","amethyst","topaz","sapphire","ruby","ember","solar","diamond"][Math.min(Math.max(e-1,0),t.AVAILABLE_CHEST_LEVELS-1)]||"wood";s=n(e<=t.AVAILABLE_CHEST_LEVELS?r:"locked"),i[0]=e,i[1]=n,i[2]=s}else s=i[2];return s}e.s(["useChestName",()=>s])},500082,e=>{"use strict";var r=e.i(933308);let a=/\d+/,t={fire:{border:"border-legendary/50",background:"bg-legendary-transparent-1 border-legendary"},water:{border:"border-rare/50",background:"bg-rare-transparent-1 border-rare"},air:{border:"border-epic/50",background:"bg-epic-transparent-1 border-epic"},rally:{border:"border-common/50",background:"bg-common-transparent-1 border-common"}};function s(e){return e.includes("Flame of Experience")?"fire":e.includes("Pioneer's Droplet")?"water":e.includes("Rally")?"rally":e.includes("Voyager's Beacon")?"voyager":e.includes("Mariner's Cache")?"mariner":e.includes("Breaker's Bounty")?"breaker":e.includes("Navigator's Compass")?"navigator":e.includes("Commander's Trove")?"commander":e.includes("Captain's Anchor")?"captain":e.includes("Keeper's Light")?"keeper":"air"}function i(e){return"voyager"===e||"mariner"===e||"breaker"===e||"navigator"===e||"commander"===e||"captain"===e||"keeper"===e}function n(e){return Number.parseInt(a.exec(e)?.[0]||"1",10)}function o(e){let a=s(e);var t=n(e);if(!a)return r.VOYAGER_TIER_LABELS[t]||"participating";switch(a){case"fire":return r.FIRE_TIER_LABELS[t]||"participating";case"water":return r.WATER_TIER_LABELS[t]||"participating";case"air":return r.AIR_TIER_LABELS[t]||"participating";case"rally":return"participating";case"voyager":default:return r.VOYAGER_TIER_LABELS[t]||"participating";case"mariner":return r.MARINER_TIER_LABELS[t]||"participating";case"breaker":return r.BREAKER_BOUNTY_TIER_LABELS[t]||"participating";case"navigator":return r.NAVIGATORS_COMPASS_TIER_LABELS[t]||"participating";case"commander":return r.COMMANDERS_TROVE_TIER_LABELS[t]||"participating";case"captain":return r.CAPTAINS_ANCHOR_TIER_LABELS[t]||"participating";case"keeper":return r.KEEPERS_LIGHT_TIER_LABELS[t]||"participating"}}function l(e,a){var t;let o=a??s(e);if(!i(o))throw Error(`Badge type "${o}" is not a tier-based badge. Use specific description logic instead.`);return"mariner"===o?"marinerCacheDescription":"breaker"===o?"breakerBountyDescription":"navigator"===o?"navigatorsCompassDescription":"commander"===o?"commandersTroveDescription":"captain"===o?"captainsAnchorDescription":"keeper"===o?"keepersLightDescription":(t=n(e),"participating"===(r.VOYAGER_TIER_LABELS[t]||"participating"))?"voyagerBeaconDescriptionParticipating":"voyagerBeaconDescription"}function d(e){return e>=1&&e<=2?"COMMON":e>=3&&e<=4?"UNCOMMON":e>=5&&e<=6?"RARE":e>=7&&e<=8?"EPIC":e>=9&&e<=10?"LEGENDARY":e>=11&&e<=14?"SPECIAL":"COMMON"}let c={COMMON:{border:"border-common/50",background:"bg-common-transparent-1 border-common",text:"bg-common-transparent-1 border-common text-common",solidBorder:"border-common",solidBackground:"bg-common",shineColor:"rgb(var(--color-common))"},UNCOMMON:{border:"border-success-1/50",background:"bg-success-1-transparent-1 border-success-1",text:"bg-success-1-transparent-1 border-success-1 text-success-1",solidBorder:"border-success-1",solidBackground:"bg-success-1",shineColor:"rgb(var(--color-success-1))"},RARE:{border:"border-rare/50",background:"bg-rare-transparent-1 border-rare",text:"bg-rare-transparent-1 border-rare text-rare",solidBorder:"border-rare",solidBackground:"bg-rare",shineColor:"rgb(var(--color-rare))"},EPIC:{border:"border-epic/50",background:"bg-epic-transparent-1 border-epic",text:"bg-epic-transparent-1 border-epic text-epic",solidBorder:"border-epic",solidBackground:"bg-epic",shineColor:"rgb(var(--color-epic))"},LEGENDARY:{border:"border-legendary/50",background:"bg-legendary-transparent-1 border-legendary",text:"bg-legendary-transparent-1 border-legendary text-legendary",solidBorder:"border-legendary",solidBackground:"bg-legendary",shineColor:"rgb(var(--color-legendary))"},SPECIAL:{border:"border-warning/50",background:"bg-warning-transparent-1 border-warning",text:"bg-warning-transparent-1 border-warning text-warning",solidBorder:"border-warning",solidBackground:"bg-warning",shineColor:"rgb(var(--color-warning))"}};function u(e){return c[e].solidBackground}function m(e){return c[e].shineColor}function E(e){let r=c[d(e)];return{border:r.border,background:r.background}}function g(e,r){return i(e)&&r?E(n(r)):t[e]??t.air}e.s(["getBadgeStyles",()=>g,"getBadgeType",()=>s,"getRarityBackgroundClass",()=>u,"getRarityShineColor",()=>m,"getTierBasedBadgeStyles",()=>E,"getTierBasedDescriptionKey",()=>l,"getTierLabelForBadge",()=>o,"getTierNumber",()=>n,"getTierRarity",()=>d,"usesTierBasedStyling",()=>i])},401721,125423,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(455480),s=e.i(194153),i=e.i(437153),n=e.i(410338),o=e.i(429811),l=e.i(6425),d=e.i(57465);function c(e){let c,u,m,E,g,p,_,C,h=(0,a.c)(19),{reward:T,showGrandPrize:b}=e,L=void 0!==b&&b;h[0]!==T?(c=(0,t.readFragment)(d.ItemRewardMediaFragment,T),h[0]=T,h[1]=c):c=h[1];let R=c;if(!R?.item)return null;h[2]!==R.isGrandPrize||h[3]!==L?(u=L&&R.isGrandPrize&&(0,r.jsx)("div",{className:"absolute -top-4 left-1/2 z-10 -translate-x-1/2",children:(0,r.jsx)(s.CenterAligned,{className:"size-8 rounded-full bg-warning",children:(0,r.jsx)(n.StarFilled,{className:"mb-[1px] flex-shrink-0 text-white",size:20})})}),h[2]=R.isGrandPrize,h[3]=L,h[4]=u):u=h[4];let S=L&&R.isGrandPrize;return h[5]!==S?(m=(0,i.classNames)("relative size-full overflow-hidden rounded-lg",{"border-2 border-warning":S}),h[5]=S,h[6]=m):m=h[6],h[7]===Symbol.for("react.memo_cache_sentinel")?(E={mediaClassName:"object-cover"},h[7]=E):E=h[7],h[8]!==R.item?(g=(0,r.jsx)(l.ItemMedia,{className:"size-full",containerSize:"100%",item:R.item,mediaSize:350,overrides:E,surface:"preview"}),h[8]=R.item,h[9]=g):g=h[9],h[10]!==R.item.chain?(p=R.item.chain?.identifier&&(0,r.jsx)(o.ChainBadge,{identifier:R.item.chain.identifier}),h[10]=R.item.chain,h[11]=p):p=h[11],h[12]!==m||h[13]!==g||h[14]!==p?(_=(0,r.jsxs)("div",{className:m,children:[g,p]}),h[12]=m,h[13]=g,h[14]=p,h[15]=_):_=h[15],h[16]!==u||h[17]!==_?(C=(0,r.jsxs)("div",{className:"relative size-full",children:[u,_]}),h[16]=u,h[17]=_,h[18]=C):C=h[18],C}e.s(["ItemRewardMedia",()=>c],401721);var u=e.i(508833),m=e.i(111908),E=e.i(989949),g=e.i(940669),p=e.i(279155);function _(e){let s,i,n,o,l,d,c,_,C=(0,a.c)(15),{tokenReward:h}=e;C[0]!==h?(s=(0,t.readFragment)(p.TokenRewardMediaFragment,h),C[0]=h,C[1]=s):s=C[1];let T=s,b=T.balance?.currency,L=(0,m.useCurrencyBannerMedia)(b?.metadata),R=(0,m.useCurrencyBannerMediaFallback)(b?.metadata);if(!T.balance?.currency)return null;let S=R??b?.imageUrl;return C[2]!==L||C[3]!==S?(i=(0,r.jsx)(g.BannerMedia,{fallback:S,fill:!0,sizes:"(max-width: 768px) 100vw, 50vw",url:L}),C[2]=L,C[3]=S,C[4]=i):i=C[4],C[5]===Symbol.for("react.memo_cache_sentinel")?(n=(0,r.jsx)(E.HeroBannerMediaGradientOverlay,{headerView:"full"}),C[5]=n):n=C[5],C[6]!==i?(o=(0,r.jsxs)("div",{className:"absolute inset-0 z-0",children:[i,n]}),C[6]=i,C[7]=o):o=C[7],C[8]===Symbol.for("react.memo_cache_sentinel")?(l=(0,r.jsx)(u.CurrencyLockupAvatar,{badge:(0,r.jsx)(u.CurrencyLockupChainBadge,{size:"lg"}),size:200}),C[8]=l):l=C[8],C[9]!==T.balance.currency?(d=(0,r.jsx)("div",{className:"relative z-10 flex size-full items-center justify-center p-8",children:(0,r.jsx)(u.CurrencyLockup,{className:"size-full items-center justify-center",currency:T.balance.currency,children:l})}),C[9]=T.balance.currency,C[10]=d):d=C[10],C[11]===Symbol.for("react.memo_cache_sentinel")?(c=(0,r.jsx)("div",{className:"absolute inset-0 rounded-lg border border-black/5 dark:border-white/5"}),C[11]=c):c=C[11],C[12]!==o||C[13]!==d?(_=(0,r.jsxs)("div",{className:"relative aspect-square w-full overflow-hidden rounded-lg",children:[o,d,c]}),C[12]=o,C[13]=d,C[14]=_):_=C[14],_}e.s(["TokenRewardMedia",()=>_],125423)},551791,204336,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(455480),s=e.i(567089),i=e.i(437153),n=e.i(39771),o=e.i(950293),l=e.i(703379),d=e.i(139972);let c=(0,e.i(885530).graphql)(`
  fragment VoyageCard on WalletActiveVoyage {
    voyage {
      id
      type
      name
      rarity
      end
      completionPointsNeeded
      description
      awardPoints
      createdAt
      updatedAt
      ctaLink
      ctaText
    }
    accruedPoints
    claimStatus
  }
`);e.s(["VoyageCardFragment",0,c],204336);let u=(0,l.tv)({slots:{outerCircle:"",innerCircle:"",chip:"w-full py-2 text-white",text:"text-xs"},variants:{variant:{SPECIAL:{outerCircle:"border-warning/50",innerCircle:"border-warning bg-warning-transparent-1",chip:"bg-warning"},LEGENDARY:{outerCircle:"border-legendary/50",innerCircle:"border-legendary bg-legendary-transparent-1",chip:"bg-legendary"},EPIC:{outerCircle:"border-epic/50",innerCircle:"border-epic bg-epic-transparent-1",chip:"bg-epic"},RARE:{outerCircle:"border-rare/50",innerCircle:"border-rare bg-rare-transparent-1",chip:"bg-rare"},UNCOMMON:{outerCircle:"border-success-1/50",innerCircle:"border-success-1 bg-success-1-transparent-1",chip:"bg-success-1"},COMMON:{outerCircle:"border-common/50",innerCircle:"border-common bg-common-transparent-1",chip:"bg-common"},UNSPECIFIED:{outerCircle:"border-border-1",innerCircle:"border-border-1 bg-bg-secondary",chip:"bg-bg-secondary"}},size:{sm:{outerCircle:"w-18 p-1",text:"text-xs"},md:{outerCircle:"w-27 p-1",text:"text-sm",chip:"h-5"},lg:{outerCircle:"w-50 p-1.5",text:"text-lg",chip:"h-6"},xl:{outerCircle:"w-full p-2",text:"text-xl",chip:"h-8"}}}}),m={sm:24,md:32,lg:48,xl:64};function E(e){let l,E,g,p,_,C,h,T,b=(0,a.c)(25),{voyage:L,size:R,tier:S,className:v,imageOverride:f}=e,y=void 0===R?"sm":R;b[0]!==L?(l=L?(0,t.readFragment)(c,L).voyage:null,b[0]=L,b[1]=l):l=b[1];let A=l,V=S||A?.rarity||"COMMON";if(b[2]!==v||b[3]!==f||b[4]!==y||b[5]!==V||b[6]!==A){let e,{outerCircle:a,innerCircle:t,chip:l,text:c}=u({variant:V,size:y});b[12]!==v?(C=(0,i.classNames)("relative",v),b[12]=v,b[13]=C):C=b[13],E=n.FlexCenter,g=(0,i.classNames)("aspect-square justify-center rounded-full border",a()),b[14]!==f||b[15]!==y?(e=f||(0,r.jsx)(d.Treasure,{fill:"current",size:m[y]}),b[14]=f,b[15]=y,b[16]=e):e=b[16],p=(0,r.jsx)(n.FlexCenter,{className:(0,i.classNames)("aspect-square w-full justify-center gap-1 rounded-full border",t()),children:e}),_=A&&(0,r.jsx)("div",{className:"absolute -bottom-1 px-2",children:(0,r.jsx)(s.Chip,{className:l(),variant:"frosted",children:(0,r.jsxs)(n.FlexCenter,{className:"w-full gap-1",children:[(0,r.jsxs)(o.TextBody,{className:(0,i.classNames)("text-center",c()),children:["+",A.awardPoints]}),(0,r.jsx)(d.Treasure,{fill:"current",size:16})]})})}),b[2]=v,b[3]=f,b[4]=y,b[5]=V,b[6]=A,b[7]=E,b[8]=g,b[9]=p,b[10]=_,b[11]=C}else E=b[7],g=b[8],p=b[9],_=b[10],C=b[11];return b[17]!==E||b[18]!==g||b[19]!==p||b[20]!==_?(h=(0,r.jsxs)(E,{className:g,children:[p,_]}),b[17]=E,b[18]=g,b[19]=p,b[20]=_,b[21]=h):h=b[21],b[22]!==C||b[23]!==h?(T=(0,r.jsx)("div",{className:C,children:h}),b[22]=C,b[23]=h,b[24]=T):T=b[24],T}e.s(["VoyageXPBadge",()=>E],551791)},422988,e=>{"use strict";var r=e.i(7683),a=e.i(866313),t=e.i(455480),s=e.i(155757),i=e.i(39771),n=e.i(670383),o=e.i(736376),l=e.i(500082),d=e.i(551791),c=e.i(186869);function u(e){let u,g,p,_,C,h,T=(0,a.c)(13),{treasure:b}=e;T[0]!==b?(u=(0,t.readFragment)(c.TreasureRewardMediaFragment,b),T[0]=b,T[1]=u):u=T[1];let L=u,[R,S]=(0,n.useState)(null);if(T[2]!==L.animationUrl?(g=()=>{L.animationUrl&&fetch(L.animationUrl).then(E).then(e=>S(e)).catch(m)},p=[L.animationUrl],T[2]=L.animationUrl,T[3]=g,T[4]=p):(g=T[3],p=T[4]),(0,n.useEffect)(g,p),T[5]!==L.name){let e=(0,l.getTierNumber)(L.name);_=(0,l.getTierRarity)(e),T[5]=L.name,T[6]=_}else _=T[6];let v=_;return T[7]!==R||T[8]!==v||T[9]!==L.imageUrl?(C=R?(0,r.jsx)(d.VoyageXPBadge,{imageOverride:(0,r.jsx)(o.Lottie,{animationData:R,loop:!0}),size:"xl",tier:v}):L.imageUrl?(0,r.jsx)(s.Avatar,{className:"size-full rounded-lg object-contain",size:320,src:L.imageUrl}):null,T[7]=R,T[8]=v,T[9]=L.imageUrl,T[10]=C):C=T[10],T[11]!==C?(h=(0,r.jsx)(i.FlexCenter,{className:"size-full justify-center",children:C}),T[11]=C,T[12]=h):h=T[12],h}function m(e){return console.error("Failed to load animation:",e)}function E(e){return e.json()}e.s(["TreasureRewardMedia",()=>u])}]);

//# debugId=702adb5c-459d-0e5e-2df1-831caeb8bf2d
//# sourceMappingURL=6fbefd52b8ed13e8.js.map