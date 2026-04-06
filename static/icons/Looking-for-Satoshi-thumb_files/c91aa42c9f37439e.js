;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="745dfe03-5eda-3c8b-1679-1877bd39f527")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,13513,e=>{"use strict";var t=e.i(866313),i=e.i(143473),r=e.i(417268),a=e.i(145315),n=e.i(395104),o=e.i(808394);let l={"(default-nav)":"none","(full-immersive)":"default","(hidden-nav)":"hidden"};function c(e){let i,c,d=(0,t.c)(6),{isMobile:m}=e,v=(0,r.useSelectedLayoutSegments)(),{variants:g}=(0,o.useTopNavbarStore)((0,a.useShallow)(u));d[0]!==g||d[1]!==m||d[2]!==v?(i=function(){if(!v)return{transparent:"none"};if(v.includes("studio")&&!v.includes("(hidden-nav)"))return{transparent:"none",border:!1};let e=v.includes("discover"),t=v.find(s);return m&&(e||t)?{transparent:"default",dark:"topOnly",gradient:"topOnly"}:v.includes("preview")&&v.includes("collection")?{transparent:"invisible"}:g||(t?(0,n.topNavbarVariantsForHeroHeaderView)(t):{transparent:l[v[0]]})},d[0]=g,d[1]=m,d[2]=v,d[3]=i):i=d[3];let f=i;return d[4]!==f?(c=f(),d[4]=f,d[5]=c):c=d[5],c}function s(e){return e in i.HERO_HEADER_VIEW}function u(e){return{variants:e.variants}}e.s(["useTopNavbarVariants",()=>c])},988262,e=>{"use strict";var t=e.i(866313),i=e.i(437153),r=e.i(165102),a=e.i(230834),n=e.i(150127),o=e.i(670383),l=e.i(145315),c=e.i(808394),s=e.i(13513);function u(e){let i,r,u,m,v,g=(0,t.c)(10),{isMobile:f}=e;g[0]!==f?(i={isMobile:f},g[0]=f,g[1]=i):i=g[1];let p=(0,s.useTopNavbarVariants)(i),{height:y}=(0,c.useTopNavbarStore)((0,l.useShallow)(d)),[h,T]=(0,o.useState)(0);g[2]===Symbol.for("react.memo_cache_sentinel")?(r=()=>{let e=null;return e=window.requestAnimationFrame(()=>{T(Math.min(window.scrollY/50,1)),e=null}),()=>{null!==e&&window.cancelAnimationFrame(e)}},g[2]=r):r=g[2],g[3]===Symbol.for("react.memo_cache_sentinel")?(u={leading:!0,maxWait:50},g[3]=u):u=g[3];let C=(0,a.useDebounceCallback)(r,50,u);return g[4]!==C?(m=()=>(window.addEventListener("scroll",C),C(),()=>{window.removeEventListener("scroll",C)}),g[4]=C,g[5]=m):m=g[5],(0,n.useMountEffect)(m),g[6]!==y||g[7]!==h||g[8]!==p?(v={height:y,variants:p,scrollPercentage:h},g[6]=y,g[7]=h,g[8]=p,g[9]=v):v=g[9],v}function d(e){return{height:e.height}}function m(){let e,r,a=(0,t.c)(3);a[0]===Symbol.for("react.memo_cache_sentinel")?(e={isMobile:!1},a[0]=e):e=a[0];let{variants:n,scrollPercentage:o}=u(e);if("always"!==n.transparent)return"";let l=n.dark&&n.gradient&&0===o?"bg-bg-contrast-1":"bg-bg-additional-3";return a[1]!==l?(r=(0,i.classNames)(l),a[1]=l,a[2]=r):r=a[2],r}function v(e,i){let s,u,d,m,v,f,p=(0,t.c)(10);p[0]!==i?(s=void 0===i?[]:i,p[0]=i,p[1]=s):s=p[1];let y=s,{setHeight:h}=(0,c.useTopNavbarStore)((0,l.useShallow)(g)),{base:T,offset:C}=(v=(0,t.c)(2),f=(0,r.useIsGreaterThanOrEqualToLg)()?64:68,v[0]!==f?(m={height:f,base:f,offset:0},v[0]=f,v[1]=m):m=v[1],m);p[2]!==e||p[3]!==h||p[4]!==T||p[5]!==C?(u=function(){h(e(T,C))},p[2]=e,p[3]=h,p[4]=T,p[5]=C,p[6]=u):u=p[6];let A=u;(0,o.useEffect)(A,y),(0,a.useEventListener)("scroll",A),p[7]!==A||p[8]!==h?(d=()=>(A(),()=>{h(void 0)}),p[7]=A,p[8]=h,p[9]=d):d=p[9],(0,n.useMountEffect)(d)}function g(e){return{setHeight:e.setHeight}}e.s(["useTopNavbarSkeletonClassNames",()=>m,"useTopNavbarState",()=>u,"useUpdateTopNavHeight",()=>v])},754163,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);e.s(["Bolt",0,e=>{let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,className:n,fill:c,fillAttribute:s,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Bolt",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}])},291067,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);function n(e){let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Favorite",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}e.s(["Favorite",()=>n])},609644,e=>{"use strict";var t=e.i(581147),i=e.i(885530);let r=(0,i.graphql)(`
    fragment CurrencyV2Link on CurrencyV2 {
      createdAt
      genesisDate
      chainIdentifier
      contractAddress
      isNative
      ...currencyV2Url
    }
  `,[t.currencyV2UrlFragment]),a=(0,i.graphql)(`
    fragment CurrencyLink on Currency {
      createdAt
      genesisDate
      chainIdentifier
      contractAddress
      isNative
      ...currencyUrl
    }
  `,[t.currencyUrlFragment]);e.s(["CurrencyLinkFragment",0,a,"CurrencyV2LinkFragment",0,r])},688280,e=>{"use strict";var t=e.i(866313),i=e.i(581147),r=e.i(594445);let a=["details","activity"];function n(){let e,n,l,c=(0,t.c)(6),s=(0,r.useIsHydrated)();c[0]!==s?(e=()=>{if(s&&1){let e=function(){{let e=localStorage.getItem(o);if(e)return e}}();if(e&&a.includes(e))return e}return"details"},c[0]=s,c[1]=e):e=c[1];let u=e;c[2]!==u?(n=(e,t)=>(0,i.getCurrencyUrl)(e,t??u()),c[2]=u,c[3]=n):n=c[3];let d=n;return c[4]!==d?(l={getCurrencyUrl:d},c[4]=d,c[5]=l):l=c[5],l}let o="last-currency-navigation-tab";function l(e){localStorage.setItem(o,e)}e.s(["setLastCurrencyNavigationTab",()=>l,"useCurrencyUrl",()=>n])},516647,495982,516372,e=>{"use strict";var t=e.i(885530),i=e.i(314346),r=e.i(975218),a=e.i(510257),n=e.i(581147);let o=(0,t.graphql)(`
    fragment CurrencyNavigationItem on CurrencyV2 {
      ...currencyV2Url
    }
  `,[n.currencyV2UrlFragment]);e.s(["CurrencyNavigationItemFragment",0,o],495982);let l=(0,t.graphql)(`
    fragment CurrencyNavigation on CurrencyV2 {
      isNative
      ...CurrencyNavigationItem
    }
  `,[o]);e.s(["CurrencyNavigationFragment",0,l],516372);var c=e.i(751923),s=e.i(921712),u=e.i(703979);let d=(0,t.graphql)(`
    fragment CurrencyPageLayout on CurrencyV2 {
      contractAddress
      chainIdentifier
      tokenGroup {
        __typename
      }
      stats {
        __typename
      }
      ...CurrencyModule
      ...CurrencyNavigation
      ...MobileCurrencyItemsActionBar
      ...CurrencyChartColor
      ...CurrencyPageLayoutProvider
      ...CurrencySwapModule
      ...WalletPositionStats
    }
  `,[r.CurrencyModuleFragment,l,a.MobileCurrencyItemsActionBarFragment,i.CurrencyChartColorFragment,u.CurrencyPageLayoutProviderFragment,c.CurrencySwapModuleFragment,s.WalletPositionStatsFragment]);e.s(["CurrencyPageLayoutFragment",0,d],516647)},668493,850256,938183,850036,489253,174503,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(455480),a=e.i(459527),n=e.i(976644),o=e.i(491150),l=e.i(165102),c=e.i(504849),s=e.i(871085),u=e.i(885530),d=e.i(581147),m=e.i(506291),v=e.i(601397);let g=(0,u.graphql)(`
    fragment TokenJsonLd on CurrencyV2 {
      name
      symbol
      description
      imageUrl
      usdPrice
      socials {
        website
      }
      ...currencyV2Url
    }
  `,[d.currencyV2UrlFragment]);e.s(["TokenJsonLd",0,e=>{let a,n,o,l,c,s,u,f,p,y,h,T,C,A=(0,i.c)(27),{currency:w}=e;A[0]!==w?(n=(0,r.readFragment)(g,w),a=v.JsonLD,c="https://schema.org",s="FinancialProduct",u=n.name,f=n.imageUrl??void 0,p=n.description??void 0,o=m.SITE_URL.origin,l=(0,d.getCurrencyUrl)(n).split("?"),A[0]=w,A[1]=a,A[2]=n,A[3]=o,A[4]=l,A[5]=c,A[6]=s,A[7]=u,A[8]=f,A[9]=p):(a=A[1],n=A[2],o=A[3],l=A[4],c=A[5],s=A[6],u=A[7],f=A[8],p=A[9]);let S=`${o}${l[0]}`;return A[10]!==n.usdPrice?(y=n.usdPrice?{"@type":"Offer",priceCurrency:"USD",price:n.usdPrice,availability:"https://schema.org/InStock"}:void 0,A[10]=n.usdPrice,A[11]=y):y=A[11],A[12]!==n.socials?(h=n.socials?.website?[n.socials.website]:void 0,A[12]=n.socials,A[13]=h):h=A[13],A[14]!==n.symbol||A[15]!==h||A[16]!==c||A[17]!==s||A[18]!==u||A[19]!==f||A[20]!==p||A[21]!==S||A[22]!==y?(T={"@context":c,"@type":s,name:u,image:f,description:p,url:S,category:"Cryptocurrency",identifier:n.symbol,offers:y,sameAs:h},A[14]=n.symbol,A[15]=h,A[16]=c,A[17]=s,A[18]=u,A[19]=f,A[20]=p,A[21]=S,A[22]=y,A[23]=T):T=A[23],A[24]!==a||A[25]!==T?(C=(0,t.jsx)(a,{data:T}),A[24]=a,A[25]=T,A[26]=C):C=A[26],C},"TokenJsonLdFragment",0,g],850256);var f=e.i(968291);let p=(0,u.graphql)(`
  fragment CurrencyAiDescription on CurrencyV2 {
    symbol
    aiDescription
  }
`);e.s(["CurrencyAiDescriptionFragment",0,p],938183);var y=e.i(85368),h=e.i(762154),T=e.i(580430),C=e.i(345520);let A=(0,u.graphql)(`
    fragment CurrencyOverview on CurrencyV2 {
      metadata {
        overview {
          modules {
            __typename
            ... on CollectionNarrativeModule {
              ...NarrativeModule
            }
            ... on CollectionFAQModule {
              ...FaqModule
            }
            ... on CollectionTeamModule {
              ...TeamModule
            }
            ... on CollectionContentBlockModule {
              ...ContentBlockModule
            }
          }
        }
      }
    }
  `,[T.NarrativeModuleFragment,h.FaqModuleFragment,C.TeamModuleFragment,y.ContentBlockModuleFragment]);e.s(["CurrencyOverviewFragment",0,A],850036);let w=(0,u.graphql)(`
  fragment CurrencyTwitterIntelligence on CurrencyV2 {
    socials {
      twitterProfile {
        handle
        followersCount
        accountCreatedAt
        tweetCount
        verifiedType
        engagement {
          averageEngagementRate
          health
        }
        confidenceScore {
          total
          accountAgeScore
          followerScore
          engagementScore
          verificationScore
          rating
        }
        notableFollowers {
          handle
          profileImageUrl
        }
        spaces {
          active {
            spaceId
            title
            participantCount
          }
          scheduled {
            spaceId
            title
            scheduledStart
          }
        }
      }
    }
  }
`);e.s(["CurrencyTwitterIntelligenceFragment",0,w],489253);let S=(0,u.graphql)(`
    fragment CurrencyPage on CurrencyV2 {
      name
      symbol
      chainIdentifier
      contractAddress
      aiDescription
      tokenGroup {
        slug
      }
      socials {
        twitterProfile {
          handle
        }
      }
      metadata {
        overview {
          modules {
            __typename
          }
        }
      }
      ...CurrencyOverview
      ...CurrencyAbout
      ...TokenJsonLd
      ...CurrencyTwitterIntelligence
      ...CurrencyAiDescription
    }
  `,[A,f.CurrencyAboutFragment,g,w,p]);e.s(["CurrencyPageFragment",0,S],174503);var F=e.i(516647);let I=(0,u.graphql)(`
    query CurrencyPageLayoutQuery($contract: ContractIdentifierInput!) {
      currencyV2(contract: $contract) {
        isDelisted
        isSwapDisabled
        ...CurrencyPageLayout
      }
    }
  `,[F.CurrencyPageLayoutFragment]),P=(0,u.graphql)(`
    query CurrencyPageQuery($contract: ContractIdentifierInput!) {
      currencyV2(contract: $contract) {
        ...CurrencyPage
      }
    }
  `,[S]);var E=e.i(301715),_=e.i(540173),b=e.i(88343),q=e.i(189972),N=e.i(649386),k=e.i(723600),L=e.i(711999),R=e.i(32218),M=e.i(446602);let V=new Set(b.Timeframe),U=new Set(b.CandleBucketSize),D=["LINE","CANDLESTICKS"];function x(e){if(!e)return;if("line"===e)return"LINE";if("candles"===e)return"CANDLESTICKS";let t=e.toUpperCase();return D.includes(t)?t:void 0}var O=e.i(312888),$=e.i(83617),B=e.i(684624),H=e.i(609644),Z=e.i(688280);let Y=!1;function G(e){let u,d,m,v,g,f,p,y=(0,i.c)(21);y[0]!==e?({currency:u,variant:v,onPointerDown:d,...m}=e,y[0]=e,y[1]=u,y[2]=d,y[3]=m,y[4]=v):(u=y[1],d=y[2],m=y[3],v=y[4]);let h=void 0===v?"unstyled":v,T=(0,r.readFragment)(H.CurrencyV2LinkFragment,u)??(0,r.readFragment)(H.CurrencyLinkFragment,u),{chainIdentifier:C,contractAddress:A,isNative:w}=T,{getCurrencyUrl:S}=(0,Z.useCurrencyUrl)(),F=S(T),b=(0,a.useClient)(),{persona:D}=(0,n.usePersona)(),G=(0,l.useIsLessThanMd)();y[5]!==C||y[6]!==b||y[7]!==A||y[8]!==T||y[9]!==G||y[10]!==w||y[11]!==D?(g=()=>{C&&A&&((0,c.prefetch)(b,I,{contract:{chain:(0,s.toUpperCase)(C),address:A}}),(0,c.prefetch)(b,P,{contract:{chain:(0,s.toUpperCase)(C),address:A}}),function({currency:e,persona:t,isLessThanMd:i,client:r,searchParams:a,now:n,isCandlestickChartEnabled:o}){let l=function({currency:e,persona:t,isLessThanMd:i,searchParams:r,now:a=new Date,isCandlestickChartEnabled:n}){return function({currency:e,persona:t,isLessThanMd:i,searchParams:r,storedTimeframe:a,storedChartVariant:n,now:o=new Date,isCandlestickChartEnabled:l}){let c,{contractAddress:s,chainIdentifier:u,createdAt:d,genesisDate:m}=e,v=d??m??null,g=function(e){if(!e)return;let t=e.toUpperCase();return V.has(t)?t:void 0}(r?.get(N.QUERY_PARAM_KEYS.timeframe)??void 0),f=function(e){if(!e)return;let t=e.toUpperCase();return U.has(t)?t:void 0}(r?.get(N.QUERY_PARAM_KEYS.candleSize)??void 0),p=x(r?.get(N.QUERY_PARAM_KEYS.chart)??void 0),y=function({timeframeParam:e,storedTimeframe:t}){let i=t??k.DEFAULT_TOKEN_TIMEFRAME;return e??i}({timeframeParam:g,storedTimeframe:a}),h=function({candleSizeParam:e,timeframe:t,createdAt:i,isLessThanMd:r,referenceDate:a}){return e||(0,L.computeDefaultCandleSize)({timeframe:t,createdAt:i,isLessThanMd:r,referenceDate:a})}({candleSizeParam:f,timeframe:y,createdAt:v,isLessThanMd:i,referenceDate:o}),T=function({chartVariantParam:e,storedChartVariant:t,personaDefault:i,isCandlestickEnabled:r}){return r?e??t??i:"LINE"}({chartVariantParam:p,storedChartVariant:n,personaDefault:(0,q.getDefaultChartMode)(t),isCandlestickEnabled:l??("0x0000000000000000000000000000000000000000"!==(c=s.toLowerCase())&&"11111111111111111111111111111111"!==c)}),C=(0,M.getTimeRangeForTimeframe)(y,v,o),A=(0,R.getBufferedTimeRange)(C,h,o,R.INITIAL_LOAD_BUFFER),w=(0,R.getChunkedTimeRanges)({timeRange:A,intervalSize:h}),S=(w.length>0?w:[A]).map(e=>({startTime:e.startTime.toISOString(),endTime:e.endTime.toISOString(),bucketSize:h,contractIdentifier:{chain:u,address:s}}));return{chartVariant:T,timeframe:y,bucketSize:h,timeRange:C,requests:S}}({currency:e,persona:t,isLessThanMd:i,searchParams:r??new URLSearchParams(window.location.search),storedTimeframe:(0,M.getDefaultTokenTimeframe)(e.createdAt??e.genesisDate??null,a),storedChartVariant:x(function(e){try{let t=window.localStorage?.getItem(e);return t?JSON.parse(t):void 0}catch{return}}(q.CHART_MODE_COOKIE_NAME)),now:a,isCandlestickChartEnabled:n})}({currency:e,persona:t,isLessThanMd:i,searchParams:a,now:n,isCandlestickChartEnabled:o});l&&0!==l.requests.length&&("CANDLESTICKS"===l.chartVariant?l.requests.forEach(e=>{(0,c.prefetch)(r,E.CurrencyCandlestickChartQuery,{bucketSize:e.bucketSize,startTime:e.startTime,endTime:e.endTime,contractIdentifier:e.contractIdentifier,fillTimeWindow:!0}),r.query(E.CurrencyCandlestickChartQuery,{bucketSize:e.bucketSize,startTime:e.startTime,endTime:e.endTime,contractIdentifier:e.contractIdentifier,fillTimeWindow:!0}).toPromise().then(t=>{let i=t.data?.currencyOhlcvCandles2;i&&i.length>0&&(0,O.setCachedCandles)(e.contractIdentifier.chain,e.contractIdentifier.address,e.bucketSize,i)}).catch(()=>{})}):l.requests.forEach(e=>{(0,c.prefetch)(r,_.CurrencyLineChartQuery,{bucketSize:e.bucketSize,startTime:e.startTime,endTime:e.endTime,contractIdentifier:e.contractIdentifier})}))}({currency:{chainIdentifier:C,contractAddress:A,createdAt:T.createdAt,genesisDate:T.genesisDate},persona:D,isLessThanMd:G,client:b,isCandlestickChartEnabled:!w}),w||function(){if(Y||"u"<typeof document)return;Y=!0;let e=document.createElement("link");e.rel="preload",e.as="script",e.href=$.TRADING_VIEW_SCRIPT_SRC,e.crossOrigin="anonymous",document.head.appendChild(e)}())},y[5]=C,y[6]=b,y[7]=A,y[8]=T,y[9]=G,y[10]=w,y[11]=D,y[12]=g):g=y[12];let z=g;return y[13]!==z||y[14]!==d?(f=e=>{z(),d?.(e)},y[13]=z,y[14]=d,y[15]=f):f=y[15],y[16]!==F||y[17]!==m||y[18]!==f||y[19]!==h?(p=(0,t.jsx)(o.Link,{href:F,onNavigationCompleted:B.trackCurrenciesPageNavigation,onPointerDown:f,variant:h,...m}),y[16]=F,y[17]=m,y[18]=f,y[19]=h,y[20]=p):p=y[20],p}e.s(["CurrencyLink",()=>G],668493)},341819,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);function n(e){let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"M440-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240v720Zm-80-80v-560H200v560h160Zm160-320v-320h240q33 0 56.5 23.5T840-760v240H520Zm80-80h160v-160H600v160Zm-80 480v-320h320v240q0 33-23.5 56.5T760-120H520Zm80-80h160v-160H600v160ZM360-480Zm240-120Zm0 240Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Auto Awesome Mosaic",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}e.s(["AutoAwesomeMosaic",()=>n])},309980,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);function n(e){let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"M600-160q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm-320-10q-106-28-173-114T40-480q0-110 67-196t173-114v84q-72 25-116 87t-44 139q0 77 44 139t116 87v84Zm320-310Zm0 240q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Toll",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}e.s(["Toll",()=>n])},992220,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);e.s(["SwapCalls",0,e=>{let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"M240-200 80-360l56-58 64 64v-286q0-66 47-113t113-47q66 0 113 47t47 113v280q0 33 23.5 56.5T600-280q33 0 56.5-23.5T680-360v-286l-64 64-56-58 160-160 160 160-56 58-64-64v286q0 66-47 113t-113 47q-66 0-113-47t-47-113v-280q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640v286l64-64 56 58-160 160Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Swap Calls",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}])},563993,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment ActivityEvent on Activity {
    type
    from {
      address
    }
    to {
      address
    }
    ... on TraitOffer {
      traitIdentifiers {
        traitType
        value
      }
      numericTraitIdentifiers {
        traitType
        minValue
        maxValue
      }
    }
  }
`);e.s(["ActivityEventFragment",0,t])},869323,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment ActivityFeedLiveTimestamp on Activity {
    eventTime
    chain {
      identifier
    }
    transactionHash
  }
`);e.s(["ActivityFeedLiveTimestampFragment",0,t])},747491,753589,286399,e=>{"use strict";var t=e.i(885530);let i=(0,t.graphql)(`
  fragment ActivityFeedMarketplaceIcon on Activity {
    collection {
      slug
    }
    ... on Listing {
      listingMarketplace: marketplace {
        identifier
      }
    }
    ... on Sale {
      saleMarketplace: marketplace {
        identifier
      }
    }
    ... on Mint {
      mintMarketplace: marketplace {
        identifier
      }
    }
  }
`);e.s(["ActivityFeedMarketplaceIconFragment",0,i],747491);var r=e.i(563993);let a=(0,t.graphql)(`
    fragment ActivityFeedTypeIcon on Activity {
      __typename
      from {
        address
      }
      to {
        address
      }
      ...ActivityEvent
    }
  `,[r.ActivityEventFragment]);e.s(["ActivityFeedTypeIconFragment",0,a],753589);var n=e.i(646426),o=e.i(543013);let l=(0,t.graphql)(`
    fragment ActivityFrom on Activity {
      __typename
      from {
        address
        ...AccountLockup
        ...ProfilePreviewTooltip
      }
    }
  `,[n.AccountLockupFragment,o.ProfilePreviewTooltipFragment]);e.s(["ActivityFromFragment",0,l],286399)},217282,e=>{"use strict";var t=e.i(190627);let i=(0,e.i(885530).graphql)(`
    fragment ActivityPrice on Activity {
      price {
        token {
          unit
        }
        ...TokenPrice
      }
      from {
        address
      }
      to {
        address
      }
      ... on Sale {
        saleType
      }
    }
  `,[t.TokenPriceFragment]);e.s(["ActivityPriceFragment",0,i])},7753,570356,725613,855993,810926,411484,908901,e=>{"use strict";var t=e.i(803577),i=e.i(682576),r=e.i(885530),a=e.i(201578),n=e.i(62793);e.i(106969);var o=e.i(861060);e.i(661049);var l=e.i(190519),c=e.i(9300),s=e.i(563993),u=e.i(869323),d=e.i(747491),m=e.i(753589),v=e.i(286399),g=e.i(217282);let f=(0,r.graphql)(`
  fragment ActivityQuantity on Activity {
    __typename
    quantity
  }
`);e.s(["ActivityQuantityFragment",0,f],570356);let p=(0,r.graphql)(`
  fragment ActivityRarity on Item {
    rarity {
      category
      rank
    }
  }
`);e.s(["ActivityRarityFragment",0,p],725613);var y=e.i(646426),h=e.i(543013);let T=(0,r.graphql)(`
    fragment ActivityTo on Activity {
      __typename
      to {
        ...AccountLockup
        ...ProfilePreviewTooltip
      }
    }
  `,[y.AccountLockupFragment,h.ProfilePreviewTooltipFragment]);e.s(["ActivityToFragment",0,T],855993);let C=(0,r.graphql)(`
    fragment ActivityFeedTableRow on Activity {
      __typename
      id
      transactionHash
      item {
        id
        tokenId
        name
        ...ItemAvatar
        ...ItemLink
        ...ItemPreviewTooltip
        ...ActivityRarity
        chain {
          ...ChainBadge
        }
      }
      collection {
        id
        slug
        ...CollectionLockup
        ...collectionUrl
        ...CollectionPreviewTooltip
      }
      ...ActivityEvent
      ...ActivityFeedTypeIcon
      ...ActivityPrice
      ...ActivityFrom
      ...ActivityTo
      ...ActivityFeedLiveTimestamp
      ...ActivityQuantity
      ...ActivityFeedMarketplaceIcon
    }
  `,[l.ItemLinkFragment,i.CollectionLockupFragment,n.collectionUrlFragment,s.ActivityEventFragment,m.ActivityFeedTypeIconFragment,g.ActivityPriceFragment,v.ActivityFromFragment,T,u.ActivityFeedLiveTimestampFragment,f,o.ItemAvatarFragment,c.ItemPreviewTooltipFragment,a.CollectionPreviewTooltipFragment,p,t.ChainBadgeFragment,d.ActivityFeedMarketplaceIconFragment]);e.s(["ActivityFeedTableRowFragment",0,C],7753);let A=(0,r.graphql)(`
    fragment ActivitySideBarFeedTableRow on Activity {
      __typename
      id
      eventTime
      item {
        tokenId
        ...ItemLink
        ...ItemPreviewTooltip
        ...ItemAvatar
        ...ActivityRarity
      }
      collection {
        name
        slug
        imageUrl
        isVerified
        ...CollectionPreviewTooltip
      }
      ...ActivityFeedTypeIcon
      ...ActivityFeedLiveTimestamp
      ...ActivityTo
      ...ActivityFrom
      ...ActivityPrice
      ...ActivityQuantity
    }
  `,[l.ItemLinkFragment,m.ActivityFeedTypeIconFragment,u.ActivityFeedLiveTimestampFragment,T,v.ActivityFromFragment,g.ActivityPriceFragment,f,o.ItemAvatarFragment,p,c.ItemPreviewTooltipFragment,a.CollectionPreviewTooltipFragment]);e.s(["ActivitySideBarFeedTableRowFragment",0,A],810926);var w=e.i(916511);let S=(0,r.graphql)(`
    fragment MintFeedTableRow on Activity {
      id
      ... on Mint {
        quantity
        item {
          ...ItemAvatar
        }
        minter: to {
          address
          ...AccountLockup
          ...profileUrl
        }
        from {
          address
        }
        collection {
          imageUrl
          isVerified
        }
        ...ActivityPrice
        ...ActivityFeedLiveTimestamp
      }
    }
  `,[o.ItemAvatarFragment,u.ActivityFeedLiveTimestampFragment,g.ActivityPriceFragment,y.AccountLockupFragment,w.profileUrlFragment]);e.s(["MintFeedTableRowFragment",0,S],411484);let F=(0,r.graphql)(`
    fragment SalesFeedTableRow on Activity {
      id
      ... on Sale {
        ...ActivityFrom
        item {
          name
          ...ItemAvatar
          ...ItemLink
          ...ItemPreviewTooltip
        }
        ...ActivityPrice
        ...ActivityFeedLiveTimestamp
      }
    }
  `,[o.ItemAvatarFragment,u.ActivityFeedLiveTimestampFragment,g.ActivityPriceFragment,v.ActivityFromFragment,l.ItemLinkFragment,c.ItemPreviewTooltipFragment]);e.s(["SalesFeedTableRowFragment",0,F],908901)},90807,e=>{"use strict";e.s(["ACTIVITY_FEED_PAGE_SIZE",0,32,"DEFAULT_ACTIVITY_FEED_COLUMNS",0,{event:!0,item:!0,price:!0,quantity:!0,rarity:!0,from:!0,to:!0,time:!0},"ORDERED_ACTIVITY_TYPES",0,["SALE","LISTING","OFFER","TRANSFER","MINT"]])},374184,e=>{"use strict";var t=e.i(207653);let i=t.z.array(t.z.enum(["SALE","MINT","TRANSFER","LISTING","OFFER","COLLECTION_OFFER","TRAIT_OFFER"])).optional().catch(void 0);function r(e){if(!e)return;let t=JSON.parse(e),r=i.safeParse(t);if(r.success&&(!r.data||0!==r.data.length))return r.data}e.s(["ACTIVITY_TYPES_COOKIE_NAME",0,"activityTypes","FALLBACK_ACTIVITY_TYPES",0,["SALE","MINT"],"SECONDARY_ACTIVITY_TYPES_COOKIE_NAME",0,"secondaryActivityTypes","activityTypesSchema",0,i,"parseActivityTypes",()=>r])},180193,e=>{"use strict";e.s(["TOP_CURRENCY_STATS_TABLE_PAGE_SIZE",0,50])},99944,e=>{"use strict";var t=e.i(866313),i=e.i(885530),r=e.i(455480);e.i(159015);var a=e.i(861308),n=e.i(78592),o=e.i(806056);e.i(402819);var l=e.i(916744),c=e.i(657980);let s=(0,i.graphql)(`
    fragment CurrencyRankingSubscription on CurrencyV2 {
      id
      genesisDate
      usdPrice
      tokenGroup {
        slug
      }
      stats {
        marketCapUsd
        fdvUsd
        score
        oneHour {
          volume
          priceChange
        }
        oneDay {
          volume
          priceChange
          marketCapChange
        }
        sevenDay {
          priceChange
        }
        fourteenDay {
          priceChange
        }
        thirtyDay {
          priceChange
        }
      }
      ...CurrencyStatsTableRow
      ...CurrencyStatsTableRowSparkLineChart
    }
  `,[a.CurrencyStatsTableRowFragment,n.CurrencyStatsTableRowSparkLineChartFragment]),u=(0,i.graphql)(`
    subscription useCurrencyRankingSubscription(
      $slug: CurrencySlug!
      $filter: CurrenciesFilter!
    ) {
      currencyRanking(slug: $slug, filter: $filter) {
        currencyV2 {
          id
          ...CurrencyRankingSubscription
        }
        updatedAt
        updateType
      }
    }
  `,[s]);class d extends c.Paginator{getValues(e,t){let i=(0,r.readFragment)(s,e);switch(t){case"ONE_DAY_VOLUME":default:return[i.stats?.oneDay.volume??0,i.id];case"ONE_HOUR_VOLUME":return[i.stats?.oneHour.volume??0,i.id];case"MARKET_CAP":return[i.stats?.marketCapUsd??0,i.id];case"PRICE":return[i.usdPrice??0,i.id];case"ONE_DAY_PRICE_CHANGE":return[i.stats?.oneDay.priceChange??0,i.id];case"ONE_HOUR_PRICE_CHANGE":return[i.stats?.oneHour.priceChange??0,i.id];case"SEVEN_DAY_PRICE_CHANGE":return[i.stats?.sevenDay.priceChange??0,i.id];case"FOURTEEN_DAY_PRICE_CHANGE":return[i.stats?.fourteenDay.priceChange??0,i.id];case"THIRTY_DAY_PRICE_CHANGE":return[i.stats?.thirtyDay.priceChange??0,i.id];case"GENESIS_DATE":return[i.genesisDate?new Date(i.genesisDate).getTime():0,i.id];case"SCORE":return[Number(i.stats?.score??0),i.id]}}}let m=new d({maxItems:void 0});e.s(["CurrencyRankingSubscriptionFragment",0,s,"useCurrencyRankingSubscription",0,(e,i,a,n,c)=>{let d,v,g,f=(0,t.c)(10),p=(0,o.useIsCurrencyRankingSubscriptionEnabled)(),y=i||"NEW";f[0]!==a||f[1]!==y?(d={slug:y,filter:a},f[0]=a,f[1]=y,f[2]=d):d=f[2];let h=!(i&&p);f[3]!==d||f[4]!==h?(v={query:u,variables:d,pause:h},f[3]=d,f[4]=h,f[5]=v):v=f[5],f[6]!==e||f[7]!==c||f[8]!==n?(g=t=>{let i=t.currencyRanking;if(!i?.currencyV2)return;if("DELETE"===i.updateType){let t=(0,r.readFragment)(s,i.currencyV2);e(e=>n?m.remove(t,e,n):e.filter(e=>e?.id!==t.id)),c(e=>{let t=new Map(e);return t.delete(i.currencyV2?.id??""),t});return}let a=(0,r.readFragment)(s,i.currencyV2),o=i.currencyV2,l=!1;e(e=>{let t=e.findIndex(e=>e?.id===a.id),i=a.tokenGroup?.slug;if(i&&-1===t&&e.some(e=>{if(!e)return!1;let t=(0,r.readFragment)(s,e);return t.tokenGroup?.slug===i}))return e;let c=-1===t,u=c?m.insertInOrder(o,e,n):m.updateInOrder(e,n,e=>e?.id===a.id,()=>o),d=u.findIndex(e=>e?.id===a.id);return l=c||t!==d,u}),l&&c(e=>{let t=new Map(e);return t.set(a.id,new Date),t})},f[6]=e,f[7]=c,f[8]=n,f[9]=g):g=f[9],(0,l.useSubscription)(v,g)}])},733889,e=>{"use strict";var t=e.i(885530),i=e.i(7753),r=e.i(810926),a=e.i(411484),n=e.i(908901);let o=(0,t.graphql)(`
    query UseGlobalActivityQuery(
      $filter: GlobalActivityFilterInput
      $cursor: String
      $limit: Int!
      $offset: Int
    ) {
      globalActivity(filter: $filter, cursor: $cursor, limit: $limit, offset: $offset) {
        items {
          id
          eventTime
          ...ActivityFeedTableRow
          ...ActivitySideBarFeedTableRow
          ...SalesFeedTableRow
          ...MintFeedTableRow
        }
        nextPageCursor
      }
    }
  `,[i.ActivityFeedTableRowFragment,r.ActivitySideBarFeedTableRowFragment,n.SalesFeedTableRowFragment,a.MintFeedTableRowFragment]);e.s(["UseGlobalActivityQuery",0,o])},495891,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);e.s(["Explore",0,e=>{let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"m260-260 300-140 140-300-300 140-140 300Zm220-180q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Explore",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}])},886131,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);e.s(["ExploreFilled",0,e=>{let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"m260-260 300-140 140-300-300 140-140 300Zm220-180q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Explore",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}])},671631,648152,e=>{"use strict";e.s(["TOP_STATS_TABLE_PAGE_SIZE",0,50],671631);var t=e.i(885530),i=e.i(62793),r=e.i(245222);e.i(30620);var a=e.i(80493),n=e.i(681144);let o=(0,t.graphql)(`
    query TopStatsTableQuery(
      $cursor: String
      $offset: Int
      $sort: TopCollectionsSort!
      $filter: TopCollectionsFilter
      $category: CategoryIdentifier
      $limit: Int!
    ) {
      topCollections(
        cursor: $cursor
        offset: $offset
        sort: $sort
        filter: $filter
        category: $category
        limit: $limit
      ) {
        items {
          id
          slug
          __typename
          ...StatsVolume
          ...StatsTableRow
          ...CollectionStatsSubscription
          ...CollectionNativeCurrencyIdentifier
        }
        nextPageCursor
      }
    }
  `,[n.StatsVolumeFragment,a.StatsTableRowFragment,r.CollectionStatsSubscriptionFragment,i.CollectionNativeCurrencyIdentifierFragment]);e.s(["TopStatsTableQuery",0,o],648152)},66409,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);function n(e){let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"M480-80q-61 0-125-22t-116-60q-52-38-85.5-89T120-360v-120l160 120-62 62q29 51 92 88t130 47v-357H320v-80h120v-47q-35-13-57.5-43.5T360-760q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 69.5T520-647v47h120v80H520v357q67-10 130-47t92-88l-62-62 160-120v120q0 58-33.5 109T721-162q-52 38-116 60T480-80Zm0-640q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Anchor",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}e.s(["Anchor",()=>n])},337453,e=>{"use strict";var t=e.i(7683),i=e.i(866313),r=e.i(790621),a=e.i(437153);e.s(["Lists",0,e=>{let n,o,l,c,s,u,d,m,v=(0,i.c)(15);v[0]!==e?({size:l,fill:c,fillAttribute:s,className:n,...o}=e,v[0]=e,v[1]=n,v[2]=o,v[3]=l,v[4]=c,v[5]=s):(n=v[1],o=v[2],l=v[3],c=v[4],s=v[5]);let g=void 0===l?24:l,f=void 0===c?"current":c,p=void 0===s?"currentColor":s;return v[6]!==n||v[7]!==f?(u=(0,a.classNames)((0,r.fillVariants)({fill:f}),n),v[6]=n,v[7]=f,v[8]=u):u=v[8],v[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"M100-180v-121.54h121.54V-180H100Zm216.92 0v-121.54H860V-180H316.92ZM100-419.23v-121.54h121.54v121.54H100Zm216.92 0v-121.54H860v121.54H316.92ZM100-658.46V-780h121.54v121.54H100Zm216.92 0V-780H860v121.54H316.92Z"}),v[9]=d):d=v[9],v[10]!==p||v[11]!==o||v[12]!==g||v[13]!==u?(m=(0,t.jsx)("svg",{"aria-label":"Lists",className:u,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...o,children:d}),v[10]=p,v[11]=o,v[12]=g,v[13]=u,v[14]=m):m=v[14],m}])},692933,e=>{"use strict";var t=e.i(866313),i=e.i(459527),r=e.i(398483),a=e.i(971823),n=e.i(165102),o=e.i(6840),l=e.i(964576),c=e.i(66409),s=e.i(341819),u=e.i(464540),d=e.i(7683),m=e.i(790621),v=e.i(437153);let g=e=>{let i,r,a,n,o,l,c,s,u=(0,t.c)(15);u[0]!==e?({size:a,fill:n,fillAttribute:o,className:i,...r}=e,u[0]=e,u[1]=i,u[2]=r,u[3]=a,u[4]=n,u[5]=o):(i=u[1],r=u[2],a=u[3],n=u[4],o=u[5]);let g=void 0===a?24:a,f=void 0===n?"current":n,p=void 0===o?"currentColor":o;return u[6]!==i||u[7]!==f?(l=(0,v.classNames)((0,m.fillVariants)({fill:f}),i),u[6]=i,u[7]=f,u[8]=l):l=u[8],u[9]===Symbol.for("react.memo_cache_sentinel")?(c=(0,d.jsx)("path",{d:"M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"}),u[9]=c):c=u[9],u[10]!==p||u[11]!==r||u[12]!==g||u[13]!==l?(s=(0,d.jsx)("svg",{"aria-label":"Calendar Today",className:l,fill:p,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...r,children:c}),u[10]=p,u[11]=r,u[12]=g,u[13]=l,u[14]=s):s=u[14],s};var f=e.i(546681),p=e.i(495891),y=e.i(886131),h=e.i(337453),T=e.i(992220),C=e.i(309980),A=e.i(264711),w=e.i(522285),S=e.i(935380),F=e.i(583840),I=e.i(504849),P=e.i(374184),E=e.i(464143),_=e.i(90807),b=e.i(733889),q=e.i(649386),N=e.i(806056);e.i(500598);var k=e.i(207225),L=e.i(684624),R=e.i(186677),M=e.i(180193),V=e.i(885530),U=e.i(99944),D=e.i(526834);e.i(159015);var x=e.i(861308);let O=(0,V.graphql)(`
    query TopCurrencyStatsTableQuery(
      $cursor: String
      $sort: CurrenciesSort!
      $filter: CurrenciesFilter!
      $limit: Int!
      $slug: CurrencySlug
    ) {
      topCurrenciesV2(
        cursor: $cursor
        sort: $sort
        filter: $filter
        limit: $limit
        slug: $slug
      ) {
        items {
          ... on CurrencyV2 {
            id
            name
            contractAddress
            chainIdentifier
            chain {
              identifier
            }
            __typename
            ...CurrencyStatsTableRow
            ...CurrencyStatsSubscription
            ...CurrencyRankingSubscription
          }
        }
        nextPageCursor
      }
    }
  `,[x.CurrencyStatsTableRowFragment,D.CurrencyStatsSubscriptionFragment,U.CurrencyRankingSubscriptionFragment]);var $=e.i(671631),B=e.i(648152);let H=/\/(?<openState>open|closed)\//g,Z=/\/(?<tableView>tablecompact|table)(?<pathEnd>\/|$)/g,Y=/^(\/discover)\/(?:collections|tokens)(\/|$)/,G=/(.+)\/$/;e.s(["queryParamsWithoutSort",0,e=>{let t=new URLSearchParams(e);return t.delete(q.QUERY_PARAM_KEYS.sortBy),t.delete(q.QUERY_PARAM_KEYS.sortDirection),t},"useIsItemActive",0,e=>{let i,n=(0,t.c)(3),o=(0,a.usePathname)();return n[0]!==e||n[1]!==o?(i=t=>((e,t,i,{exactPath:a=!1}={})=>{let n=t.href.toLowerCase(),o=e.toLowerCase().replace(H,"/").replace(Z,"/").replace(G,"$1").replace(Y,"$1$2").replace(G,"$1");if("/"===n)return(a?o===(0,r.getRewrittenHomePage)():!!o.startsWith((0,r.getRewrittenHomePage)()))||n.split("?")[0]===o;if("/collections"===n&&o.startsWith("/tokens"))return!1;if((i||o.startsWith("/profile"))&&n.startsWith("/profile")){let e=o.split("/").at(-1),t=n.split("/").at(-1);if(e===t||("profile"===e||e&&(0,A.isAddress)(e))&&"items"===t)return!0}return a?n===o:o.startsWith(n.split("?")[0])})(o,t,!1,e),n[0]=e,n[1]=o,n[2]=i):i=n[2],i},"useNavItems",0,()=>{let e,r,a,d,m,v,q,V,U,D,x,H,Z,Y,G,z,Q,j,K,W,J,X,ee,et,ei,er,ea,en,eo,el,ec,es,eu,ed,em,ev,eg,ef,ep,ey,eh,eT,eC,eA,ew,eS,eF,eI,eP,eE,e_,eb,eq=(0,t.c)(145),eN=(0,i.useClient)(),ek=(0,k.useAddress)(),eL=(0,n.useIsLessThanMd)(),eR=(0,w.useTranslations)("useNavItems"),eM=(0,N.useIsPerpetualsEnabled)(),eV=(0,N.useTokenGroupingEnabled)();eq[0]!==eR?(e=eR("discover"),eq[0]=eR,eq[1]=e):e=eq[1],eq[2]!==e?(r={id:"discover",title:e,href:"/",icon:p.Explore,activeIcon:y.ExploreFilled,onNavigationCompleted:L.trackDiscoverPageNavigation},eq[2]=e,eq[3]=r):r=eq[3],eq[4]!==eR?(a=eR("collections"),eq[4]=eR,eq[5]=a):a=eq[5],eq[6]!==eN?(d=()=>{(0,I.prefetch)(eN,B.TopStatsTableQuery,{limit:$.TOP_STATS_TABLE_PAGE_SIZE,sort:{by:"ONE_DAY_VOLUME",direction:"DESC"},filter:{}})},eq[6]=eN,eq[7]=d):d=eq[7],eq[8]!==a||eq[9]!==d?(m={id:"nft-stats",title:a,href:"/collections",icon:s.AutoAwesomeMosaic,activeIcon:s.AutoAwesomeMosaic,onNavigationCompleted:L.trackStatsPageNavigation,prefetch:d,"data-testid":"nft-stats"},eq[8]=a,eq[9]=d,eq[10]=m):m=eq[10],eq[11]!==eR?(v=eR("tokens"),eq[11]=eR,eq[12]=v):v=eq[12],eq[13]!==eN?(q=()=>{(0,I.prefetch)(eN,O,{limit:M.TOP_CURRENCY_STATS_TABLE_PAGE_SIZE,sort:{by:"ONE_DAY_VOLUME",direction:"DESC"},filter:{}})},eq[13]=eN,eq[14]=q):q=eq[14],eq[15]!==v||eq[16]!==q?(V={id:"token-stats",title:v,href:"/tokens",icon:C.Toll,activeIcon:C.Toll,onNavigationCompleted:L.trackTokenStatsPageNavigation,prefetch:q,"data-testid":"token-stats"},eq[15]=v,eq[16]=q,eq[17]=V):V=eq[17],eq[18]!==eR?(U=eR("perpetuals"),eq[18]=eR,eq[19]=U):U=eq[19],eq[20]!==U?(D={id:"perpetuals",title:U,href:"/perpetuals",icon:l.AllInclusive,activeIcon:l.AllInclusive},eq[20]=U,eq[21]=D):D=eq[21],eq[22]!==eR?(x=eR("swap"),eq[22]=eR,eq[23]=x):x=eq[23],eq[24]!==x?(H={id:"swap",title:x,href:"/swap",icon:T.SwapCalls,activeIcon:T.SwapCalls,onNavigationCompleted:L.trackSwapPageNavigation},eq[24]=x,eq[25]=H):H=eq[25],eq[26]!==eR?(Z=eR("drops"),eq[26]=eR,eq[27]=Z):Z=eq[27],eq[28]!==Z?(Y={id:"drops",title:Z,href:"/drops",icon:u.CalendarToday,activeIcon:g,onNavigationCompleted:L.trackDropsPageNavigation},eq[28]=Z,eq[29]=Y):Y=eq[29],eq[30]!==eR?(G=eR("profile"),eq[30]=eR,eq[31]=G):G=eq[31],eq[32]===Symbol.for("react.memo_cache_sentinel")?(z=(0,R.getProfileUrlByIdentifier)(),eq[32]=z):z=eq[32],eq[33]!==eR?(Q=eR("galleries"),eq[33]=eR,eq[34]=Q):Q=eq[34],eq[35]!==Q?(j={id:"profile-galleries",title:Q,href:`${(0,R.getProfileUrlByIdentifier)()}/galleries`,onNavigationCompleted:L.trackProfileGalleriesPageNavigation},eq[35]=Q,eq[36]=j):j=eq[36],eq[37]!==eR?(K=eR("items"),eq[37]=eR,eq[38]=K):K=eq[38],eq[39]!==ek||eq[40]!==eN||eq[41]!==eV?(W=ek?()=>{"SVM"===(0,A.getChainArchFromAddress)(ek)?(0,F.prefetchProfileTokensPage)(ek,eN,eV):(0,S.prefetchProfileItemsPage)(ek,eN)}:void 0,eq[39]=ek,eq[40]=eN,eq[41]=eV,eq[42]=W):W=eq[42],eq[43]!==K||eq[44]!==W?(J={id:"profile-items",title:K,href:`${(0,R.getProfileUrlByIdentifier)()}/items`,onNavigationCompleted:L.trackProfilePageNavigation,prefetch:W},eq[43]=K,eq[44]=W,eq[45]=J):J=eq[45],eq[46]!==eR?(X=eR("tokens"),eq[46]=eR,eq[47]=X):X=eq[47],eq[48]!==ek||eq[49]!==eN||eq[50]!==eV?(ee=ek?()=>{(0,F.prefetchProfileTokensPage)(ek,eN,eV)}:void 0,eq[48]=ek,eq[49]=eN,eq[50]=eV,eq[51]=ee):ee=eq[51],eq[52]!==X||eq[53]!==ee?(et={id:"profile-tokens",title:X,href:`${(0,R.getProfileUrlByIdentifier)()}/tokens`,onNavigationCompleted:L.trackProfileTokensPageNavigation,prefetch:ee},eq[52]=X,eq[53]=ee,eq[54]=et):et=eq[54],eq[55]!==eM||eq[56]!==eR?(ei=eM?[{id:"profile-perpetuals",title:eR("perpetuals"),href:`${(0,R.getProfileUrlByIdentifier)()}/perpetuals`}]:[],eq[55]=eM,eq[56]=eR,eq[57]=ei):ei=eq[57],eq[58]!==eR?(er=eR("portfolio"),eq[58]=eR,eq[59]=er):er=eq[59],eq[60]!==er?(ea={id:"profile-portfolio",title:er,href:`${(0,R.getProfileUrlByIdentifier)()}/portfolio`,onNavigationCompleted:L.trackProfilePortfolioPageNavigation},eq[60]=er,eq[61]=ea):ea=eq[61],eq[62]!==eR?(en=eR("listings"),eq[62]=eR,eq[63]=en):en=eq[63],eq[64]!==en?(eo={id:"profile-listings",title:en,href:`${(0,R.getProfileUrlByIdentifier)()}/listings`,onNavigationCompleted:L.trackProfileListingsPageNavigation},eq[64]=en,eq[65]=eo):eo=eq[65],eq[66]!==eR?(el=eR("offers"),eq[66]=eR,eq[67]=el):el=eq[67],eq[68]!==el?(ec={id:"profile-offers",title:el,href:`${(0,R.getProfileUrlByIdentifier)()}/offers`,onNavigationCompleted:L.trackProfileOffersPageNavigation},eq[68]=el,eq[69]=ec):ec=eq[69],eq[70]!==eR?(es=eR("created"),eq[70]=eR,eq[71]=es):es=eq[71],eq[72]!==es?(eu={id:"profile-created",title:es,href:`${(0,R.getProfileUrlByIdentifier)()}/created`,onNavigationCompleted:L.trackProfileCreatedPageNavigation},eq[72]=es,eq[73]=eu):eu=eq[73],eq[74]!==eR?(ed=eR("watchlist"),eq[74]=eR,eq[75]=ed):ed=eq[75],eq[76]!==ed?(em={id:"profile-watchlist",title:ed,href:`${(0,R.getProfileUrlByIdentifier)()}/watchlist`,onNavigationCompleted:L.trackProfileWatchlistPageNavigation},eq[76]=ed,eq[77]=em):em=eq[77],eq[78]!==eR?(ev=eR("favorites"),eq[78]=eR,eq[79]=ev):ev=eq[79],eq[80]!==ev?(eg={id:"profile-favorites",title:ev,href:`${(0,R.getProfileUrlByIdentifier)()}/favorites`,onNavigationCompleted:L.trackProfileFavoritesPageNavigation},eq[80]=ev,eq[81]=eg):eg=eq[81],eq[82]!==eR?(ef=eR("activity"),eq[82]=eR,eq[83]=ef):ef=eq[83],eq[84]!==ef?(ep={id:"profile-activity",title:ef,href:`${(0,R.getProfileUrlByIdentifier)()}/activity`,onNavigationCompleted:L.trackProfileActivityPageNavigation},eq[84]=ef,eq[85]=ep):ep=eq[85],eq[86]!==j||eq[87]!==J||eq[88]!==et||eq[89]!==ei||eq[90]!==ea||eq[91]!==eo||eq[92]!==ec||eq[93]!==eu||eq[94]!==em||eq[95]!==eg||eq[96]!==ep?(ey=[j,J,et,...ei,ea,eo,ec,eu,em,eg,ep],eq[86]=j,eq[87]=J,eq[88]=et,eq[89]=ei,eq[90]=ea,eq[91]=eo,eq[92]=ec,eq[93]=eu,eq[94]=em,eq[95]=eg,eq[96]=ep,eq[97]=ey):ey=eq[97],eq[98]!==ek||eq[99]!==eN?(eh=ek?()=>{(0,S.prefetchProfileItemsPage)(ek,eN)}:void 0,eq[98]=ek,eq[99]=eN,eq[100]=eh):eh=eq[100],eq[101]!==G||eq[102]!==ey||eq[103]!==eh?(eT={id:"profile",title:G,href:z,icon:o.AccountCircle,activeIcon:o.AccountCircle,subItems:ey,onNavigationCompleted:L.trackProfilePageNavigation,prefetch:eh},eq[101]=G,eq[102]=ey,eq[103]=eh,eq[104]=eT):eT=eq[104],eq[105]!==eR?(eC=eR("activity"),eq[105]=eR,eq[106]=eC):eC=eq[106],eq[107]!==eN?(eA=()=>{let e,t;e=E.default.get(P.ACTIVITY_TYPES_COOKIE_NAME),t=(0,P.parseActivityTypes)(e)??P.FALLBACK_ACTIVITY_TYPES,(0,I.prefetch)(eN,b.UseGlobalActivityQuery,{filter:{activityTypes:t,chains:[],collectionSlugs:[],markets:[]},limit:_.ACTIVITY_FEED_PAGE_SIZE})},eq[107]=eN,eq[108]=eA):eA=eq[108],eq[109]!==eC||eq[110]!==eA?(ew={id:"activity",title:eC,href:"/activity",icon:h.Lists,activeIcon:h.Lists,prefetch:eA},eq[109]=eC,eq[110]=eA,eq[111]=ew):ew=eq[111],eq[112]!==eR?(eS=eR("studio"),eq[112]=eR,eq[113]=eS):eS=eq[113],eq[114]!==eS?(eF={id:"studio",title:eS,href:"/studio",icon:f.Draw,activeIcon:f.Draw},eq[114]=eS,eq[115]=eF):eF=eq[115],eq[116]!==eR?(eI=eR("rewards"),eq[116]=eR,eq[117]=eI):eI=eq[117],eq[118]!==eI?(eP={id:"rewards",title:eI,href:"/rewards",icon:c.Anchor,activeIcon:c.Anchor},eq[118]=eI,eq[119]=eP):eP=eq[119],eq[120]!==r||eq[121]!==H||eq[122]!==Y||eq[123]!==m||eq[124]!==eT||eq[125]!==ew||eq[126]!==eF||eq[127]!==eP||eq[128]!==V||eq[129]!==D?(eE={discover:r,nftStats:m,tokenStats:V,perpetuals:D,swap:H,drops:Y,profile:eT,activity:ew,studio:eF,rewards:eP},eq[120]=r,eq[121]=H,eq[122]=Y,eq[123]=m,eq[124]=eT,eq[125]=ew,eq[126]=eF,eq[127]=eP,eq[128]=V,eq[129]=D,eq[130]=eE):eE=eq[130];let eU=eE;eq[131]!==eM||eq[132]!==eU.perpetuals?(e_=eM?[eU.perpetuals]:[],eq[131]=eM,eq[132]=eU.perpetuals,eq[133]=e_):e_=eq[133];let eD=!eL&&eU.studio;return eq[134]!==eU.activity||eq[135]!==eU.discover||eq[136]!==eU.drops||eq[137]!==eU.nftStats||eq[138]!==eU.profile||eq[139]!==eU.rewards||eq[140]!==eU.swap||eq[141]!==eU.tokenStats||eq[142]!==e_||eq[143]!==eD?(eb=[eU.discover,eU.nftStats,eU.tokenStats,...e_,eU.swap,eU.drops,eU.activity,eU.rewards,eD,eU.profile].filter(Boolean),eq[134]=eU.activity,eq[135]=eU.discover,eq[136]=eU.drops,eq[137]=eU.nftStats,eq[138]=eU.profile,eq[139]=eU.rewards,eq[140]=eU.swap,eq[141]=eU.tokenStats,eq[142]=e_,eq[143]=eD,eq[144]=eb):eb=eq[144],eb}],692933)}]);

//# debugId=745dfe03-5eda-3c8b-1679-1877bd39f527
//# sourceMappingURL=9c82d2ed01aac23c.js.map