;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="776a2ac0-2ad9-befd-fbab-5a2a3b5ee663")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,996366,e=>{"use strict";function l(e,a,r=1.5){let i=[...e].sort((e,l)=>a(e)-a(l));if(0===i.length)return null;if(i.length<4)return{lowerBound:.9*a(i[0]),upperBound:1.1*a(i.at(-1)??i[0])};let s=t(i,a,25),n=t(i,a,75),o=n-s;return{lowerBound:s-r*o,upperBound:n+r*o}}function t(e,l,t){let a=t/100*(e.length-1),r=Math.floor(a),i=r+1;return i>=e.length?l(e[r]):l(e[r])+(a-r)*(l(e[i])-l(e[r]))}function a(e,l){if(0===e.length||l<=0)return{};let t={},a=0;for(let r=0;r<e.length;r+=1)a+=e[r].price,r<l-1?t[e[r].id]=a/(r+1):(r>=l&&(a-=e[r-l].price),t[e[r].id]=a/l);return t}e.s(["generateMovingAverage",()=>a,"getOutlierRange",()=>l])},582064,e=>{"use strict";var l=e.i(866313),t=e.i(88343),a=e.i(871085),r=e.i(405434),i=e.i(649386);let s=(0,r.parseAsStringLiteral)(t.Timeframe.map(e=>(0,a.toLowerCase)(e)));function n(){let e,t,n,o=(0,l.c)(6);o[0]===Symbol.for("react.memo_cache_sentinel")?(e=s.withDefault("seven_days"),o[0]=e):e=o[0];let[c,u]=(0,r.useQueryState)(i.QUERY_PARAM_KEYS.timeframe,e);return o[1]!==c?(t=(0,a.toUpperCase)(c),o[1]=c,o[2]=t):t=o[2],o[3]!==u||o[4]!==t?(n={timeframe:t,setTimeframe:u},o[3]=u,o[4]=t,o[5]=n):n=o[5],n}e.s(["useAnalyticsTimeframeQueryParam",()=>n])},698643,879177,619451,e=>{"use strict";var l=e.i(866313),t=e.i(885530),a=e.i(60330),r=e.i(657980);e.i(402819);var i=e.i(916744);let s=(0,t.graphql)(`
  subscription useSalesChartSubscription($slug: String!) {
    collectionChartSalesBySlug(slug: $slug) {
      time
      collectionId
      usd
      native {
        unit
        symbol
      }
      time
      saleKey
    }
  }
`);class n extends r.Paginator{getValues(e,l){if("time"===l)return[e.time,e.saleKey];throw new a.UnreachableCaseError(l)}}let o=new n({maxItems:1e4});e.s(["useSalesChartSubscription",0,(e,t,a)=>{let r,n,c,u=(0,l.c)(7);u[0]!==e?(r={slug:e},u[0]=e,u[1]=r):r=u[1];let m=a?.pause;u[2]!==r||u[3]!==m?(n={query:s,variables:r,pause:m},u[2]=r,u[3]=m,u[4]=n):n=u[4],u[5]!==t?(c=e=>{let l=e.collectionChartSalesBySlug;t(e=>o.insertInOrder(l,e,{by:"time",direction:"ASC"},{insertIntoLastPlace:!0}))},u[5]=t,u[6]=c):c=u[6],(0,i.useSubscription)(n,c)}],698643);var c=e.i(190627);e.i(106969);var u=e.i(861060),m=e.i(544137),S=e.i(743342),h=e.i(668813);let d=(0,t.graphql)(`
    query ItemChartDataBySaleKeyQuery($saleKey: String!) {
      itemChartDataBySaleKey(saleKey: $saleKey) {
        item {
          __typename
          ... on Item {
            imageUrl
            name
            ...useSetItemQuickView
          }
          chain {
            identifier
          }
          contractAddress
          tokenId
          ...ItemAvatar
          ...itemUrl
        }
        sale {
          time
          price {
            usd
            ...TokenPrice
            ...NativePrice
          }
        }
      }
    }
  `,[u.ItemAvatarFragment,c.TokenPriceFragment,h.NativePriceFragment,S.itemUrlFragment,m.useSetItemQuickViewFragment]);e.s(["itemChartDataBySaleKeyQuery",0,d],879177);var y=e.i(7683),x=e.i(965523),f=e.i(310578);function g(){let e,t,a,r=(0,l.c)(3);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,y.jsx)(f.SkeletonBlock,{className:"size-[150px] rounded-lg"}),t=(0,y.jsx)(f.SkeletonLine,{className:"w-1/2"}),r[0]=e,r[1]=t):(e=r[0],t=r[1]),r[2]===Symbol.for("react.memo_cache_sentinel")?(a=(0,y.jsxs)(x.FlexColumn,{className:"gap-2",children:[e,t,(0,y.jsxs)(x.FlexColumn,{className:"gap-1",children:[(0,y.jsx)(f.SkeletonLine,{className:"w-full"}),(0,y.jsx)(f.SkeletonLine,{className:"w-full"})]}),(0,y.jsx)(f.SkeletonLine,{className:"w-full"})]}),r[2]=a):a=r[2],a}e.s(["SalesChartTooltipSkeleton",()=>g],619451)},93034,180763,721327,185540,e=>{"use strict";var l=e.i(7683),t=e.i(866313),a=e.i(885530),r=e.i(333799),i=e.i(535374),s=e.i(252485),n=e.i(437153),o=e.i(104062),c=e.i(89337),u=e.i(939365),m=e.i(670383),S=e.i(825504),h=e.i(389852),d=e.i(698643),y=e.i(582064),x=e.i(996366),f=e.i(254842),g=e.i(326088);function p(e){let a,r,i,s,o,c,u=(0,t.c)(13);u[0]!==e?({className:a,...r}=e,u[0]=e,u[1]=a,u[2]=r):(a=u[1],r=u[2]),u[3]!==a?(i=(0,n.classNames)("h-[400px]",a),u[3]=a,u[4]=i):i=u[4];let m=r.overrides?.Skeleton;return u[5]!==m?(s={...m},u[5]=m,u[6]=s):s=u[6],u[7]!==r.overrides||u[8]!==s?(o=(0,l.jsx)(g.TimeSeriesChartEmptyState,{className:"size-full",overrides:{...r.overrides,Skeleton:s}}),u[7]=r.overrides,u[8]=s,u[9]=o):o=u[9],u[10]!==i||u[11]!==o?(c=(0,l.jsx)(f.Flex,{className:i,children:o}),u[10]=i,u[11]=o,u[12]=c):c=u[12],c}function v(e){let a,r,i,s,n,o=(0,t.c)(11);o[0]!==e?({overrides:a,...r}=e,o[0]=e,o[1]=a,o[2]=r):(a=o[1],r=o[2]);let c=a?.EmptyState;return o[3]!==c?(i={...c,variant:"error"},o[3]=c,o[4]=i):i=o[4],o[5]!==a||o[6]!==i?(s={...a,EmptyState:i},o[5]=a,o[6]=i,o[7]=s):s=o[7],o[8]!==r||o[9]!==s?(n=(0,l.jsx)(p,{...r,overrides:s}),o[8]=r,o[9]=s,o[10]=n):n=o[10],n}e.s(["SalesChartEmptyState",()=>p],180763),e.s(["SalesChartErrorState",()=>v],721327);var C=e.i(47667),j=e.i(455480),b=e.i(922364),N=e.i(39771),T=e.i(965523),_=e.i(950293),k=e.i(28155),E=e.i(230834),D=e.i(522285);e.i(106969);var A=e.i(101304),F=e.i(97004),V=e.i(570293),B=e.i(879177),w=e.i(619451);let P=(0,a.graphql)(`
  fragment SalesChartScatterTooltip on ChartSaleV2 {
    saleKey
  }
`),I=(0,a.graphql)(`
    fragment SalesChartScatterTooltipVolume on ChartVolume {
      volume {
        ...Volume
      }
    }
  `,[S.VolumeFragment]),O=(0,h.withSuspense)(({matchedColumnData:e,item:t,onItemClicked:a})=>{let{saleKey:i}=(0,j.readFragment)(P,t),s=(0,m.useRef)(!1),n=(0,j.readFragment)(I,e),o=(0,b.useDateTimeFormatter)(),c=(0,F.useSetItemQuickView)(),u=(0,D.useTranslations)("SalesChartScatterTooltip"),[{data:S}]=(0,r.useQuery)({query:B.itemChartDataBySaleKeyQuery,variables:{saleKey:i}}),h=S?.itemChartDataBySaleKey,d=h?.item;if((0,E.useClickAnyWhere)(()=>{d&&!s.current&&(s.current=!0,a?.(),c(d))}),!(d&&h))return null;let y=h.sale.price,x=h.sale.time;return(0,l.jsxs)(T.FlexColumn,{className:"w-[150px] cursor-pointer gap-2",children:[(0,l.jsx)(A.ItemAvatar,{className:"mx-auto rounded",item:d,size:150}),(0,l.jsx)(k.TextOverflowTooltip,{children:(0,l.jsx)(_.TextBody,{children:d.name})}),(0,l.jsxs)(T.FlexColumn,{className:"gap-1",children:[(0,l.jsx)(N.FlexCenter,{className:"flex-nowrap",children:(0,l.jsx)(_.TextBody,{children:u.rich("price",{price:()=>(0,l.jsx)(C.TokenPrice,{conversion:"historical",price:y})})})}),(0,l.jsx)(_.TextBody,{children:u.rich("vol",{vol:()=>n?(0,l.jsx)(V.Volume,{disableTooltip:!0,volume:n.volume}):(0,l.jsx)(C.TokenPrice,{conversion:"historical",price:y})})})]}),(0,l.jsx)(_.TextBody,{children:(0,l.jsx)("div",{children:o(new Date(x),{display:"datetime-numeric"})})})]})},{fallback:(0,l.jsx)(w.SalesChartTooltipSkeleton,{}),errorFallback:(0,l.jsx)(c.ErrorState,{size:"lg"})});var Y=e.i(701597),$=e.i(738480);function K(e){let a,r=(0,t.c)(36),{item:i,matchedColumnData:n,series:o,movingAverageMaps:c,onItemClicked:u}=e,m=(0,b.useDateTimeFormatter)(),S=(0,D.useTranslations)("SalesChartTooltip"),{currency:h}=(0,s.useCurrency)();if("line"===o){let e,t,a,s,o,u,d;if(r[0]!==h||r[1]!==i.native||r[2]!==i.saleKey||r[3]!==c||r[4]!==S){let t;r[6]!==h||r[7]!==i.native||r[8]!==i.saleKey||r[9]!==c?(t=()=>"crypto"===h?(0,l.jsx)(C.TokenPriceDisplay,{symbol:i.native.symbol,unit:c[i.saleKey]}):(0,l.jsx)($.NumberDisplay,{display:"usd",value:c[i.saleKey]}),r[6]=h,r[7]=i.native,r[8]=i.saleKey,r[9]=c,r[10]=t):t=r[10],e=S.rich("movingAvgPrice",{price:t}),r[0]=h,r[1]=i.native,r[2]=i.saleKey,r[3]=c,r[4]=S,r[5]=e}else e=r[5];if(r[11]!==e?(t=(0,l.jsx)(_.TextBody,{children:e}),r[11]=e,r[12]=t):t=r[12],r[13]!==i.native||r[14]!==n||r[15]!==S){let e;r[17]!==i.native||r[18]!==n?(e=()=>n?.volume?(0,l.jsx)(V.Volume,{disableTooltip:!0,volume:n.volume}):(0,l.jsx)(C.TokenPriceDisplay,{symbol:i.native.symbol,unit:i.native.unit}),r[17]=i.native,r[18]=n,r[19]=e):e=r[19],a=S.rich("vol",{vol:e}),r[13]=i.native,r[14]=n,r[15]=S,r[16]=a}else a=r[16];return r[20]!==a?(s=(0,l.jsx)(_.TextBody,{children:a}),r[20]=a,r[21]=s):s=r[21],r[22]!==m||r[23]!==i.time?(o=m(new Date(i.time),{display:"datetime-numeric"}),r[22]=m,r[23]=i.time,r[24]=o):o=r[24],r[25]!==o?(u=(0,l.jsx)(_.TextBody,{children:(0,l.jsx)("div",{children:o})}),r[25]=o,r[26]=u):u=r[26],r[27]!==t||r[28]!==s||r[29]!==u?(d=(0,l.jsxs)(T.FlexColumn,{className:"gap-2",children:[t,s,u]}),r[27]=t,r[28]=s,r[29]=u,r[30]=d):d=r[30],d}return r[31]!==i||r[32]!==n||r[33]!==u||r[34]!==o?(a=(0,l.jsx)(O,{item:i,matchedColumnData:n,onItemClicked:u,series:o}),r[31]=i,r[32]=n,r[33]=u,r[34]=o,r[35]=a):a=r[35],a}let R=(0,a.graphql)(`
    query SalesChartMainQuery($collectionSlug: String!, $timeframe: Timeframe!) {
      collectionChartSalesBySlug: collectionChartSalesBySlugV2(
        slug: $collectionSlug
        timeframe: $timeframe
      ) {
        ...SalesChartScatterTooltip
        collectionId
        usd
        native {
          unit
          symbol
        }
        time
        saleKey
      }
      collectionChartVolumesBySlug(
        slug: $collectionSlug
        timeframe: $timeframe
      ) {
        ...SalesChartScatterTooltipVolume
        volume {
          usd
          native {
            unit
          }
          ...Volume
        }
        time
      }
    }
  `,[P,I,S.VolumeFragment]);function q(e,l,t){return Math.max(e,Math.min(l,t))}function L(e){return new Date(e.time)}function M(e){return new Date(e.time)}let Q=(0,h.withSuspense)(function(e){let a,S,h,f,g,p,v,C,j,b,N,T,_,k,E,D,A,F,V,B,w,P,I=(0,t.c)(76),{collectionSlug:O,className:Y,onItemClicked:$,emptyState:Q,errorState:H,pinOutliers:z,hideSalesDots:U,hideAxes:G,timeframe:W}=e,X=void 0===z||z,J=void 0!==U&&U,Z=void 0!==G&&G,{timeframe:ee}=(0,y.useAnalyticsTimeframeQueryParam)(),el=W??ee;I[0]!==O||I[1]!==el?(a={query:R,variables:{collectionSlug:O,timeframe:el}},I[0]=O,I[1]=el,I[2]=a):a=I[2];let[et]=(0,r.useQuery)(a),{data:ea,error:er}=et;I[3]!==ea?.collectionChartSalesBySlug?(S=ea?.collectionChartSalesBySlug||[],I[3]=ea?.collectionChartSalesBySlug,I[4]=S):S=I[4];let[ei,es]=(0,m.useState)(S);I[5]!==ea?.collectionChartSalesBySlug?(h=()=>{es(ea?.collectionChartSalesBySlug||[])},I[5]=ea?.collectionChartSalesBySlug,I[6]=h):h=I[6];let en=ea?.collectionChartSalesBySlug;I[7]!==en?(f=[en],I[7]=en,I[8]=f):f=I[8],(0,m.useEffect)(h,f),(0,d.useSalesChartSubscription)(O,es);let{currency:eo}=(0,s.useCurrency)(),ec=(0,i.useNumberFormatter)();I[9]!==eo?(g=e=>"crypto"===eo?e.native.unit:e.usd,I[9]=eo,I[10]=g):g=I[10];let eu="ALL_TIME"===el?3:1.5;if(I[11]!==eo||I[12]!==ea?.collectionChartVolumesBySlug||I[13]!==X||I[14]!==ei||I[15]!==g||I[16]!==eu||I[17]!==el){let e,l,t=(0,x.getOutlierRange)(ei,g,eu);p=Math.max(t?.lowerBound??0,0),C=t?.upperBound??1/0,I[22]!==ea?.collectionChartVolumesBySlug?(e=ea?.collectionChartVolumesBySlug??[],I[22]=ea?.collectionChartVolumesBySlug,I[23]=e):e=I[23],j=e,l=20,"ONE_HOUR"===el||"ONE_DAY"===el?l=7:"SEVEN_DAYS"===el?l=12:"THIRTY_DAYS"===el?l=15:"ONE_YEAR"===el?l=20:"ALL_TIME"===el&&(l=25),v=(0,x.generateMovingAverage)(ei.map(e=>{let l="crypto"===eo?e.native.unit:e.usd,t=X?q(p,C,l):l;return{id:e.saleKey,price:t}}),l),I[11]=eo,I[12]=ea?.collectionChartVolumesBySlug,I[13]=X,I[14]=ei,I[15]=g,I[16]=eu,I[17]=el,I[18]=p,I[19]=v,I[20]=C,I[21]=j}else p=I[18],v=I[19],C=I[20],j=I[21];let em=v;if(er){let e;return I[24]!==H?(e=H??(0,l.jsx)(c.ErrorState,{className:"pb-4"}),I[24]=H,I[25]=e):e=I[25],e}if(0===ei.length){let e;return I[26]!==Q?(e=Q??(0,l.jsx)(o.EmptyState,{className:"pb-4",variant:"no-results"}),I[26]=Q,I[27]=e):e=I[27],e}I[28]!==Y?(b=(0,n.classNames)("h-[400px]",Y),I[28]=Y,I[29]=b):b=I[29];let eS=b;I[30]!==eo||I[31]!==p||I[32]!==C?(N=e=>{let l="crypto"===eo?e.native.unit:e.usd;return l<p||l>C},I[30]=eo,I[31]=p,I[32]=C,I[33]=N):N=I[33],I[34]!==eo||I[35]!==J||I[36]!==p||I[37]!==X||I[38]!==C?(T=J?void 0:e=>{let l="crypto"===eo?e.native.unit:e.usd;return X?q(p,C,l):l},I[34]=eo,I[35]=J,I[36]=p,I[37]=X,I[38]=C,I[39]=T):T=I[39],I[40]!==em?(_=e=>{try{return em[e.saleKey]}catch{return 0}},I[40]=em,I[41]=_):_=I[41];let eh=`${el}-${String(X)}-${String(J)}-${ei[0]?.time??""}-${ei.at(-1)?.time??""}`,ed=X?p:void 0,ey=X?C:void 0;return I[42]!==eo||I[43]!==ec||I[44]!==ei[0]?(k=e=>ec(e,{display:"crypto"===eo?"quantity":"usd",suffix:"crypto"===eo?ei[0].native.symbol:void 0}),I[42]=eo,I[43]=ec,I[44]=ei[0],I[45]=k):k=I[45],I[46]!==Z||I[47]!==ed||I[48]!==ey||I[49]!==k?(E={hidden:Z,yAxisMin:ed,yAxisMax:ey,tickFormat:k},I[46]=Z,I[47]=ed,I[48]=ey,I[49]=k,I[50]=E):E=I[50],I[51]!==Z?(D={hidden:Z},I[51]=Z,I[52]=D):D=I[52],I[53]!==E||I[54]!==D?(A={YAxis:E,XAxis:D},I[53]=E,I[54]=D,I[55]=A):A=I[55],I[56]!==em||I[57]!==$||I[58]!==el?(F=e=>(0,l.jsx)(K,{movingAverageMaps:em,onItemClicked:$,timeframe:el,...e}),I[56]=em,I[57]=$,I[58]=el,I[59]=F):F=I[59],I[60]===Symbol.for("react.memo_cache_sentinel")?(V={tooltipDelay:200},I[60]=V):V=I[60],I[61]!==eo?(B=e=>"crypto"===eo?e.volume.native.unit:e.volume.usd,I[61]=eo,I[62]=B):B=I[62],I[63]!==B||I[64]!==j?(w={items:j,getDate:L,getValue:B},I[63]=B,I[64]=j,I[65]=w):w=I[65],I[66]!==eS||I[67]!==ei||I[68]!==N||I[69]!==T||I[70]!==_||I[71]!==eh||I[72]!==A||I[73]!==F||I[74]!==w?(P=(0,l.jsx)(u.TimeSeriesChart,{className:eS,data:ei,getDate:M,getIsOutlier:N,getScatterValue:T,getValue:_,overrides:A,renderTooltip:F,scatterOptions:V,standaloneColumn:w},eh),I[66]=eS,I[67]=ei,I[68]=N,I[69]=T,I[70]=_,I[71]=eh,I[72]=A,I[73]=F,I[74]=w,I[75]=P):P=I[75],P},{fallback:function(e){let a,r,i,s=(0,t.c)(5),{className:o}=e;return s[0]!==o?(a=(0,n.classNames)("h-[400px]",o),s[0]=o,s[1]=a):a=s[1],s[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,l.jsx)(Y.TimeSeriesChartSkeleton,{className:"size-full"}),s[2]=r):r=s[2],s[3]!==a?(i=(0,l.jsx)(f.Flex,{className:a,children:r}),s[3]=a,s[4]=i):i=s[4],i},errorFallback:(0,l.jsx)(v,{})});e.s(["SalesChart",0,Q],185540),e.s([],93034)},310484,913744,767012,386490,e=>{"use strict";var l=e.i(7683),t=e.i(866313),a=e.i(657113),r=e.i(670383),i=e.i(389852),s=e.i(437153),n=e.i(254842),o=e.i(939365);function c(e){let a,r,i,c,u,m,S=(0,t.c)(13);S[0]!==e?({className:a,...r}=e,S[0]=e,S[1]=a,S[2]=r):(a=S[1],r=S[2]),S[3]!==a?(i=(0,s.classNames)("h-[400px]",a),S[3]=a,S[4]=i):i=S[4];let h=r.overrides?.Skeleton;return S[5]!==h?(c={...h},S[5]=h,S[6]=c):c=S[6],S[7]!==r.overrides||S[8]!==c?(u=(0,l.jsx)(o.TimeSeriesChart.EmptyState,{className:"size-full",overrides:{...r.overrides,Skeleton:c}}),S[7]=r.overrides,S[8]=c,S[9]=u):u=S[9],S[10]!==i||S[11]!==u?(m=(0,l.jsx)(n.Flex,{className:i,children:u}),S[10]=i,S[11]=u,S[12]=m):m=S[12],m}function u(e){let a,r,i,s,n,o=(0,t.c)(11);o[0]!==e?({overrides:a,...r}=e,o[0]=e,o[1]=a,o[2]=r):(a=o[1],r=o[2]);let u=a?.EmptyState;return o[3]!==u?(i={...u,variant:"error"},o[3]=u,o[4]=i):i=o[4],o[5]!==a||o[6]!==i?(s={...a,EmptyState:i},o[5]=a,o[6]=i,o[7]=s):s=o[7],o[8]!==r||o[9]!==s?(n=(0,l.jsx)(c,{...r,overrides:s}),o[8]=r,o[9]=s,o[10]=n):n=o[10],n}e.s(["FloorChartEmptyState",()=>c],913744),e.s(["FloorChartErrorState",()=>u],767012);var m=e.i(701597);function S(e){let a,r,i,o=(0,t.c)(5),{className:c}=e;return o[0]!==c?(a=(0,s.classNames)("h-[400px]",c),o[0]=c,o[1]=a):a=o[1],o[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,l.jsx)(m.TimeSeriesChartSkeleton,{className:"size-full"}),o[2]=r):r=o[2],o[3]!==a?(i=(0,l.jsx)(n.Flex,{className:a,children:r}),o[3]=a,o[4]=i):i=o[4],i}function h(e){let a,r,i,s=(0,t.c)(6);return s[0]!==e?({className:a,...r}=e,s[0]=e,s[1]=a,s[2]=r):(a=s[1],r=s[2]),s[3]!==a||s[4]!==r?(i=(0,l.jsx)(S,{...r,className:a}),s[3]=a,s[4]=r,s[5]=i):i=s[5],i}let d=(0,r.createContext)(null),y=(0,a.default)(()=>e.A(269842).then(e=>e.FloorChartBase),{loadableGenerated:{modules:[917020]},ssr:!1,loading(){let e=(0,r.useContext)(d);return(0,l.jsx)(h,{...e})}}),x=(0,i.withSuspense)(e=>(0,l.jsx)(d.Provider,{value:e,children:(0,l.jsx)(y,{...e})}),{fallback:h,errorFallback:(0,l.jsx)(u,{})});e.s(["FloorChart",0,x],386490),e.s([],310484)},169393,e=>{"use strict";var l=e.i(7683),t=e.i(866313),a=e.i(437153),r=e.i(254842),i=e.i(965523),s=e.i(820130),n=e.i(310578),o=e.i(258343),c=e.i(255666),u=e.i(209959),m=e.i(950293),S=e.i(517481);function h(e){let n,h,f,g,p,v,C,j,b,N,T,_,k=(0,t.c)(31),{label:E,value:D,change:A,sparklineData:F,sparklineVariant:V,timeframe:B,onTimeframeChange:w,timeframeOptions:P}=e,I=void 0===V?"neutral":V;return k[0]!==E?(n=(0,l.jsx)(m.TextBody,{className:"text-text-secondary",size:"sm",weight:"semibold",children:E}),k[0]=E,k[1]=n):n=k[1],k[2]!==w?(h=e=>w(e),k[2]=w,k[3]=h):h=k[3],k[4]===Symbol.for("react.memo_cache_sentinel")?(f={Content:{className:"min-w-[72px]"}},k[4]=f):f=k[4],k[5]!==P?(g=e=>P.find(l=>{let{key:t}=l;return t===e})?.label||"30d",k[5]=P,k[6]=g):g=k[6],k[7]!==P?(p=P.map(x),k[7]=P,k[8]=p):p=k[8],k[9]!==h||k[10]!==g||k[11]!==p||k[12]!==B?(v=(0,l.jsx)(s.Select,{align:"end",className:"h-fit w-fit",dropdownSize:"sm",onValueChange:h,overrides:f,renderValue:g,value:B,variant:"ghost",children:p}),k[9]=h,k[10]=g,k[11]=p,k[12]=B,k[13]=v):v=k[13],k[14]!==n||k[15]!==v?(C=(0,l.jsxs)(o.SpaceBetween,{className:"mb-2 items-start",children:[n,v]}),k[14]=n,k[15]=v,k[16]=C):C=k[16],k[17]!==D?(j=(0,l.jsx)(S.TextDisplay,{size:"lg",children:D}),k[17]=D,k[18]=j):j=k[18],k[19]!==A?(b=null!=A&&(0,l.jsx)(u.StatChange,{change:A}),k[19]=A,k[20]=b):b=k[20],k[21]!==b||k[22]!==j?(N=(0,l.jsxs)(r.Flex,{className:"items-baseline gap-2",children:[j,b]}),k[21]=b,k[22]=j,k[23]=N):N=k[23],k[24]!==F||k[25]!==I?(T=F&&F.length>1&&(0,l.jsx)(i.FlexColumn,{className:(0,a.classNames)("mt-4 h-12","negative"===I&&"[&_path]:stroke-error-1","positive"===I&&"[&_path]:stroke-success-1"),children:(0,l.jsx)(c.SparkLineChart,{className:"h-full w-full",data:F,getDate:y,getValue:d})}),k[24]=F,k[25]=I,k[26]=T):T=k[26],k[27]!==N||k[28]!==T||k[29]!==C?(_=(0,l.jsxs)(i.FlexColumn,{className:"h-[180px] rounded-lg border border-border-1 bg-bg-primary p-4",children:[C,N,T]}),k[27]=N,k[28]=T,k[29]=C,k[30]=_):_=k[30],_}function d(e){return e.value}function y(e){return e.date}function x(e){let{key:t,label:a}=e;return(0,l.jsx)(s.SelectItem,{value:t,children:(0,l.jsx)(s.SelectItemTitle,{children:a})},t)}function f(e){let s,c,u,m,S,h,d=(0,t.c)(9);d[0]!==e?(s=void 0===e?{}:e,d[0]=e,d[1]=s):s=d[1];let{className:y}=s;return d[2]!==y?(c=(0,a.classNames)("h-[180px] rounded-lg border border-border-1 bg-bg-primary p-4",y),d[2]=y,d[3]=c):c=d[3],d[4]===Symbol.for("react.memo_cache_sentinel")?(u=(0,l.jsxs)(o.SpaceBetween,{className:"mb-2 items-start",children:[(0,l.jsx)(n.Skeleton,{className:"h-4 w-16"}),(0,l.jsx)(n.Skeleton,{className:"h-6 w-12"})]}),d[4]=u):u=d[4],d[5]===Symbol.for("react.memo_cache_sentinel")?(m=(0,l.jsx)(r.Flex,{className:"items-baseline gap-2",children:(0,l.jsx)(n.Skeleton,{className:"h-8 w-24"})}),d[5]=m):m=d[5],d[6]===Symbol.for("react.memo_cache_sentinel")?(S=(0,l.jsx)(i.FlexColumn,{className:"mt-4 h-12",children:(0,l.jsx)(n.Skeleton,{className:"h-full w-full"})}),d[6]=S):S=d[6],d[7]!==c?(h=(0,l.jsxs)(i.FlexColumn,{className:c,children:[u,m,S]}),d[7]=c,d[8]=h):h=d[8],h}e.s(["StatCard",()=>h,"StatCardSkeleton",()=>f])},268039,e=>{"use strict";var l=e.i(7683),t=e.i(866313),a=e.i(167368),r=e.i(437153),i=e.i(254842),s=e.i(965523),n=e.i(893212),o=e.i(999258),c=e.i(339694),u=e.i(522285),m=e.i(670383),S=e.i(35782),h=e.i(501811),d=e.i(444501);e.i(310484);var y=e.i(386490);e.i(93034);var x=e.i(185540),f=e.i(820130),g=e.i(258343),p=e.i(950293);function v(e){let a,r,i,n,o,c,u,m,S=(0,t.c)(20),{title:h,timeframe:d,onTimeframeChange:y,timeframeOptions:x,children:v}=e;return S[0]!==h?(a=(0,l.jsx)(p.TextBody,{size:"md",weight:"semibold",children:h}),S[0]=h,S[1]=a):a=S[1],S[2]!==y?(r=e=>y(e),S[2]=y,S[3]=r):r=S[3],S[4]===Symbol.for("react.memo_cache_sentinel")?(i={Content:{className:"min-w-[72px]"}},S[4]=i):i=S[4],S[5]!==x?(n=e=>x.find(l=>{let{key:t}=l;return t===e})?.label||"30d",S[5]=x,S[6]=n):n=S[6],S[7]!==x?(o=x.map(C),S[7]=x,S[8]=o):o=S[8],S[9]!==r||S[10]!==n||S[11]!==o||S[12]!==d?(c=(0,l.jsx)(f.Select,{align:"end",className:"h-fit w-fit",dropdownSize:"sm",onValueChange:r,overrides:i,renderValue:n,value:d,variant:"ghost",children:o}),S[9]=r,S[10]=n,S[11]=o,S[12]=d,S[13]=c):c=S[13],S[14]!==a||S[15]!==c?(u=(0,l.jsxs)(g.SpaceBetween,{className:"mb-4 items-center",children:[a,c]}),S[14]=a,S[15]=c,S[16]=u):u=S[16],S[17]!==v||S[18]!==u?(m=(0,l.jsxs)(s.FlexColumn,{className:"rounded-lg border border-border-1 bg-bg-primary p-4",children:[u,v]}),S[17]=v,S[18]=u,S[19]=m):m=S[19],m}function C(e){let{key:t,label:a}=e;return(0,l.jsx)(f.SelectItem,{value:t,children:(0,l.jsx)(f.SelectItemTitle,{children:a})},t)}var j=e.i(47667),b=e.i(333799),N=e.i(252485),T=e.i(89337),_=e.i(389852),k=e.i(190627),E=e.i(885530),D=e.i(825504);let A=(0,E.graphql)(`
    query CollectionAnalyticsStatsQuery($collectionSlug: String!) {
      collectionBySlug(slug: $collectionSlug) {
        ... on Collection {
          floorPrice {
            pricePerItem {
              ...TokenPrice
            }
          }
          stats {
            sales
            volume {
              ...Volume
            }
            oneHour {
              sales
              volume {
                ...Volume
              }
              floorPriceChange
            }
            oneDay {
              sales
              volume {
                ...Volume
              }
              floorPriceChange
            }
            sevenDays {
              sales
              volume {
                ...Volume
              }
              floorPriceChange
            }
            thirtyDays {
              sales
              volume {
                ...Volume
              }
              floorPriceChange
            }
          }
        }
      }
    }
  `,[D.VolumeFragment,k.TokenPriceFragment]),F=(0,E.graphql)(`
    query CollectionAnalyticsVolumeSparklineQuery(
      $collectionSlug: String!
      $timeframe: Timeframe!
    ) {
      collectionChartVolumesBySlug(slug: $collectionSlug, timeframe: $timeframe) {
        volume {
          usd
          native {
            unit
            symbol
          }
        }
        time
      }
    }
  `,[]),V=(0,E.graphql)(`
    query CollectionAnalyticsFloorSparklineQuery(
      $collectionSlug: String!
      $timeframe: Timeframe!
    ) {
      collectionChartFloorPricesBySlug(
        slug: $collectionSlug
        timeframe: $timeframe
      ) {
        price {
          native {
            unit
            symbol
          }
          usd
        }
        time
      }
    }
  `,[]),B=["ONE_HOUR","ONE_DAY","SEVEN_DAYS","THIRTY_DAYS","ONE_YEAR","ALL_TIME"],w=["ONE_HOUR","ONE_DAY","SEVEN_DAYS","THIRTY_DAYS"],P=["ONE_HOUR","ONE_DAY","SEVEN_DAYS","THIRTY_DAYS","ALL_TIME"];function I(e){return P.includes(e)}function O(e){let l,a,r=(0,t.c)(7);r[0]!==e?(l={query:A,variables:{collectionSlug:e}},r[0]=e,r[1]=l):l=r[1];let[i]=(0,b.useQuery)(l),{data:s,fetching:n}=i,o=s?.collectionBySlug,c=o?.__typename==="Collection"?o:null,u=c?.stats??null,m=c?.floorPrice??null;return r[2]!==c||r[3]!==n||r[4]!==m||r[5]!==u?(a={stats:u,floorPrice:m,collectionData:c,fetching:n},r[2]=c,r[3]=n,r[4]=m,r[5]=u,r[6]=a):a=r[6],a}function Y(e,l){if(!w.includes(l))return null;switch(l){case"ONE_HOUR":return e?.oneHour??null;case"ONE_DAY":return e?.oneDay??null;case"SEVEN_DAYS":return e?.sevenDays??null;case"THIRTY_DAYS":return e?.thirtyDays??null}}var $=e.i(169393);let K=(0,_.withSuspense)(function({collectionSlug:e,timeframe:t,onTimeframeChange:a,timeframeOptions:r}){let i=(0,u.useTranslations)("CollectionAnalytics"),{currency:s}=(0,N.useCurrency)(),{stats:n,floorPrice:o,fetching:c}=O(e),[{data:S,fetching:h}]=(0,b.useQuery)({query:V,variables:{collectionSlug:e,timeframe:t}});if(c||h)return(0,l.jsx)($.StatCardSkeleton,{});let d=Y(n,t),y=S?.collectionChartFloorPricesBySlug?.[0]?.price?.native?.symbol,x="crypto"===s&&!!y,f=(0,m.useMemo)(()=>(S?.collectionChartFloorPricesBySlug??[]).map(e=>({date:new Date(e.time),value:x?e.price?.native?.unit??0:e.price?.usd??0})),[S?.collectionChartFloorPricesBySlug,x]),g=d?.floorPriceChange!==void 0&&d?.floorPriceChange!==null?d.floorPriceChange>=0?"positive":"negative":f.length>1?(f.at(-1)?.value??0)>=f[0].value?"positive":"negative":"neutral";return(0,l.jsx)($.StatCard,{change:d?.floorPriceChange,label:i("floorPrice"),onTimeframeChange:a,sparklineData:f,sparklineVariant:g,timeframe:t,timeframeOptions:r,value:(0,l.jsx)(j.TokenPrice,{display:"standard",price:o?.pricePerItem,symbolColor:"current"})})},{fallback:(0,l.jsx)($.StatCardSkeleton,{}),errorFallback:(0,l.jsx)(T.ErrorState,{size:"lg"}),ssr:!1});var R=e.i(535374);let q=(0,_.withSuspense)(function(e){let a,r,i,s,n=(0,t.c)(15),{collectionSlug:o,timeframe:c,onTimeframeChange:m,timeframeOptions:S}=e,h=(0,u.useTranslations)("CollectionAnalytics"),d=(0,R.useNumberFormatter)(),{stats:y,fetching:x}=O(o);if(x){let e;return n[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,l.jsx)($.StatCardSkeleton,{}),n[0]=e):e=n[0],e}n[1]!==y||n[2]!==c?(a=function(e,l){if(!I(l))return null;switch(l){case"ONE_HOUR":return e?.oneHour?.sales!=null?String(e.oneHour.sales):null;case"ONE_DAY":return e?.oneDay?.sales!=null?String(e.oneDay.sales):null;case"SEVEN_DAYS":return e?.sevenDays?.sales!=null?String(e.sevenDays.sales):null;case"THIRTY_DAYS":return e?.thirtyDays?.sales!=null?String(e.thirtyDays.sales):null;case"ALL_TIME":return e?.sales!=null?String(e.sales):null}}(y,c),n[1]=y,n[2]=c,n[3]=a):a=n[3];let f=a;return n[4]!==h?(r=h("salesCount"),n[4]=h,n[5]=r):r=n[5],n[6]!==d||n[7]!==f?(i=null!=f?d(Number(f),{display:"quantity"}):"-",n[6]=d,n[7]=f,n[8]=i):i=n[8],n[9]!==m||n[10]!==r||n[11]!==i||n[12]!==c||n[13]!==S?(s=(0,l.jsx)($.StatCard,{label:r,onTimeframeChange:m,timeframe:c,timeframeOptions:S,value:i}),n[9]=m,n[10]=r,n[11]=i,n[12]=c,n[13]=S,n[14]=s):s=n[14],s},{fallback:(0,l.jsx)($.StatCardSkeleton,{}),errorFallback:(0,l.jsx)(T.ErrorState,{size:"lg"}),ssr:!1});var L=e.i(738480),M=e.i(570293);let Q=(0,_.withSuspense)(function({collectionSlug:e,timeframe:t,onTimeframeChange:a,timeframeOptions:r}){let i=(0,u.useTranslations)("CollectionAnalytics"),s=(0,R.useNumberFormatter)(),{currency:n}=(0,N.useCurrency)(),{stats:o,fetching:c}=O(e),[{data:S,fetching:h}]=(0,b.useQuery)({query:F,variables:{collectionSlug:e,timeframe:t}});if(c||h)return(0,l.jsx)($.StatCardSkeleton,{});let d=Y(o,t),y=d?.volume??("ALL_TIME"===t?o?.volume:null)??null,x=S?.collectionChartVolumesBySlug?.[0]?.volume?.native?.symbol,f="crypto"===n&&!!x,g=(0,m.useMemo)(()=>(S?.collectionChartVolumesBySlug??[]).map(e=>({date:new Date(e.time),value:f?e.volume?.native?.unit??0:e.volume?.usd??0})),[S?.collectionChartVolumesBySlug,f]),p=(0,m.useMemo)(()=>{if(y)return null;let e=S?.collectionChartVolumesBySlug??[];return 0===e.length?null:e.reduce((e,l)=>e+(f?l.volume?.native?.unit??0:l.volume?.usd??0),0)},[S?.collectionChartVolumesBySlug,f,y]),v=g.length>1?(g.at(-1)?.value??0)>=g[0].value?"positive":"negative":"neutral";return(0,l.jsx)($.StatCard,{label:i("volume"),onTimeframeChange:a,sparklineData:g,sparklineVariant:v,timeframe:t,timeframeOptions:r,value:y?(0,l.jsx)(M.Volume,{volume:y}):null!==p?f?`${s(p,{display:"quantity"})} ${x}`:(0,l.jsx)(L.NumberDisplay,{display:"usd",value:p}):"-"})},{fallback:(0,l.jsx)($.StatCardSkeleton,{}),errorFallback:(0,l.jsx)(T.ErrorState,{size:"lg"}),ssr:!1});function H(e){let f,g,p,C,j,b,N,T,_,k,E,D,A,F,V,w,O,Y,R,L,M,H,z,U,G,W,X,J=(0,t.c)(69),{collectionSlug:Z}=e,[ee,el]=(0,m.useState)("SEVEN_DAYS"),[et,ea]=(0,m.useState)("SEVEN_DAYS"),[er,ei]=(0,m.useState)("SEVEN_DAYS"),[es,en]=(0,m.useState)("SEVEN_DAYS"),[eo,ec]=(0,m.useState)("SEVEN_DAYS"),[eu,em]=(0,m.useState)("SEVEN_DAYS"),eS=(0,u.useTranslations)("CollectionAnalytics"),eh=(0,S.useTimeframeEnumName)();J[0]===Symbol.for("react.memo_cache_sentinel")?(f=e=>{el(e),ea(e),ei(I(e)?e:"THIRTY_DAYS"),en(e),ec(e),em(e)},J[0]=f):f=J[0];let ed=f;J[1]!==eh?(g=B.map(e=>({key:e,label:eh(e)})),J[1]=eh,J[2]=g):g=J[2];let ey=g;J[3]!==eh?(p=P.map(e=>({key:e,label:eh(e)})),J[3]=eh,J[4]=p):p=J[4];let ex=p;J[5]===Symbol.for("react.memo_cache_sentinel")?(C=(0,l.jsx)(o.Separator,{className:(0,r.classNames)((0,h.fullBleedVariants)(),(0,d.topStickyVariants)({variant:"after-hero-header-tab-menu"}))}),J[5]=C):C=J[5],J[6]===Symbol.for("react.memo_cache_sentinel")?(j=e=>ed(e),J[6]=j):j=J[6],J[7]!==eh?(b=B.map(e=>(0,l.jsx)(c.ToggleButtonGroupItem,{value:e,children:eh(e)},e)),J[7]=eh,J[8]=b):b=J[8],J[9]!==ee||J[10]!==b?(N=(0,l.jsx)(n.FlexEnd,{children:(0,l.jsx)(c.ToggleButtonGroup,{onValueChange:j,value:ee,children:b})}),J[9]=ee,J[10]=b,J[11]=N):N=J[11],J[12]===Symbol.for("react.memo_cache_sentinel")?(T=(0,l.jsx)($.StatCardSkeleton,{}),J[12]=T):T=J[12];let ef=`volume-${et}`;J[13]!==Z||J[14]!==ey||J[15]!==et?(_=(0,l.jsx)(Q,{collectionSlug:Z,onTimeframeChange:ea,timeframe:et,timeframeOptions:ey}),J[13]=Z,J[14]=ey,J[15]=et,J[16]=_):_=J[16],J[17]!==_||J[18]!==ef?(k=(0,l.jsx)(s.FlexColumn,{className:"flex-1",children:(0,l.jsx)(m.Suspense,{fallback:T,children:_},ef)}),J[17]=_,J[18]=ef,J[19]=k):k=J[19],J[20]===Symbol.for("react.memo_cache_sentinel")?(E=(0,l.jsx)($.StatCardSkeleton,{}),J[20]=E):E=J[20];let eg=`sales-${er}`;J[21]!==Z||J[22]!==er||J[23]!==ex?(D=(0,l.jsx)(q,{collectionSlug:Z,onTimeframeChange:ei,timeframe:er,timeframeOptions:ex}),J[21]=Z,J[22]=er,J[23]=ex,J[24]=D):D=J[24],J[25]!==eg||J[26]!==D?(A=(0,l.jsx)(s.FlexColumn,{className:"flex-1",children:(0,l.jsx)(m.Suspense,{fallback:E,children:D},eg)}),J[25]=eg,J[26]=D,J[27]=A):A=J[27],J[28]===Symbol.for("react.memo_cache_sentinel")?(F=(0,l.jsx)($.StatCardSkeleton,{}),J[28]=F):F=J[28];let ep=`floor-${es}`;return J[29]!==Z||J[30]!==es||J[31]!==ey?(V=(0,l.jsx)(K,{collectionSlug:Z,onTimeframeChange:en,timeframe:es,timeframeOptions:ey}),J[29]=Z,J[30]=es,J[31]=ey,J[32]=V):V=J[32],J[33]!==ep||J[34]!==V?(w=(0,l.jsx)(s.FlexColumn,{className:"flex-1",children:(0,l.jsx)(m.Suspense,{fallback:F,children:V},ep)}),J[33]=ep,J[34]=V,J[35]=w):w=J[35],J[36]!==k||J[37]!==A||J[38]!==w?(O=(0,l.jsxs)(i.Flex,{className:"flex-col gap-4 md:flex-row",children:[k,A,w]}),J[36]=k,J[37]=A,J[38]=w,J[39]=O):O=J[39],J[40]!==eS?(Y=eS("volumeAndPrice"),J[40]=eS,J[41]=Y):Y=J[41],J[42]===Symbol.for("react.memo_cache_sentinel")?(R=(0,l.jsx)(a.ChartSkeleton,{className:"h-[400px]"}),J[42]=R):R=J[42],J[43]!==Z||J[44]!==eo?(L=(0,l.jsx)(m.Suspense,{fallback:R,children:(0,l.jsx)(x.SalesChart,{collectionSlug:Z,hideSalesDots:!0,timeframe:eo})}),J[43]=Z,J[44]=eo,J[45]=L):L=J[45],J[46]!==eo||J[47]!==Y||J[48]!==L||J[49]!==ey?(M=(0,l.jsx)(s.FlexColumn,{className:"min-w-0 flex-1 xl:flex-[2]",children:(0,l.jsx)(v,{onTimeframeChange:ec,timeframe:eo,timeframeOptions:ey,title:Y,children:L})}),J[46]=eo,J[47]=Y,J[48]=L,J[49]=ey,J[50]=M):M=J[50],J[51]!==eS?(H=eS("listingAndFloor"),J[51]=eS,J[52]=H):H=J[52],J[53]===Symbol.for("react.memo_cache_sentinel")?(z=(0,l.jsx)(a.ChartSkeleton,{className:"h-[400px]"}),J[53]=z):z=J[53],J[54]!==Z||J[55]!==eu?(U=(0,l.jsx)(m.Suspense,{fallback:z,children:(0,l.jsx)(y.FloorChart,{collectionSlug:Z,showSalesDots:!0,timeframe:eu})}),J[54]=Z,J[55]=eu,J[56]=U):U=J[56],J[57]!==eu||J[58]!==H||J[59]!==U||J[60]!==ey?(G=(0,l.jsx)(s.FlexColumn,{className:"min-w-0 flex-1",children:(0,l.jsx)(v,{onTimeframeChange:em,timeframe:eu,timeframeOptions:ey,title:H,children:U})}),J[57]=eu,J[58]=H,J[59]=U,J[60]=ey,J[61]=G):G=J[61],J[62]!==M||J[63]!==G?(W=(0,l.jsxs)(i.Flex,{className:"w-full flex-col gap-4 xl:flex-row",children:[M,G]}),J[62]=M,J[63]=G,J[64]=W):W=J[64],J[65]!==O||J[66]!==W||J[67]!==N?(X=(0,l.jsxs)(s.FlexColumn,{className:"w-full",children:[C,(0,l.jsxs)(s.FlexColumn,{className:"gap-6 py-6",children:[N,O,W]})]}),J[65]=O,J[66]=W,J[67]=N,J[68]=X):X=J[68],X}e.s(["CollectionAnalytics",()=>H],268039)},269842,e=>{e.v(l=>Promise.all(["static/chunks/2048cd5f9628aa5a.js"].map(l=>e.l(l))).then(()=>l(917020)))}]);

//# debugId=776a2ac0-2ad9-befd-fbab-5a2a3b5ee663
//# sourceMappingURL=aad8ef76a56a1b49.js.map