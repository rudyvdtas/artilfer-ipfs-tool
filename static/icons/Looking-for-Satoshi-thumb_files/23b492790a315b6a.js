;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="31d2f97d-ab75-4ea5-657c-9b428bf85da5")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,58284,462484,824303,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(601056),n=e.i(519078),s=e.i(167368),i=e.i(310578),l=e.i(81303),c=e.i(28067),o=e.i(747460),u=e.i(165102),C=e.i(984335),y=e.i(960243),d=e.i(29093),S=e.i(445329),m=e.i(522285);let T={watchlist:"z-[1] flex w-8 items-center justify-center",currency:"z-[1] grow overflow-visible rounded px-2 2xl:pr-0 w-[180px] md:w-[200px]",stat:"flex w-[90px] grow justify-end font-mono md:w-[90px]",wallets:"flex w-[64px] min-w-[64px] justify-end",lastOneDay:"w-[100px] flex justify-end"};e.s(["CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES",0,T],462484);let h=(e,r,a)=>{let n,s,i,l,c,o,C,d,S,h,g,p,b,_,E,w,A,R,k,f,N,O,x,L,D,v,V,P,F,j,I,M,H,U,B,K,q,W,G,Y,z,$,X,Z,J,Q=(0,t.c)(127),ee=void 0===r?y.CurrencyStatsColumnVariant.DEFAULT:r;Q[0]!==a?(n=void 0===a?{}:a,Q[0]=a,Q[1]=n):n=Q[1];let{showWalletsColumn:er,showGainColumn:et}=n,ea=void 0===er||er,en=void 0!==et&&et,es=ee===y.CurrencyStatsColumnVariant.NEW,ei=(0,u.useIsLessThanMd)(),el=(0,m.useTranslations)("useTokenStatsColumns");Q[2]!==el?(s={key:"usdValue",header:()=>el("usdValue.header"),tooltip:()=>el("usdValue.tooltip"),sortKey:y.CurrencyStatsSortBy.USD_VALUE},Q[2]=el,Q[3]=s):s=Q[3];let ec=s;Q[4]!==el?(i={key:"quantity",header:()=>el("quantity.header"),tooltip:()=>el("quantity.tooltip")},Q[4]=el,Q[5]=i):i=Q[5];let eo=i;Q[6]!==el?(l={key:"wallets",header:()=>el("wallets.header"),className:T.wallets},Q[6]=el,Q[7]=l):l=Q[7];let eu=l;Q[8]!==el?(c={key:"price",header:()=>el("price.header"),tooltip:()=>el("price.tooltip"),sortKey:y.CurrencyStatsSortBy.PRICE},Q[8]=el,Q[9]=c):c=Q[9];let eC=c;Q[10]!==el?(o=()=>el("oneHour.change.display"),Q[10]=el,Q[11]=o):o=Q[11],Q[12]!==el?(C=()=>el("oneHour.change.tooltip"),Q[12]=el,Q[13]=C):C=Q[13],Q[14]!==C||Q[15]!==o?(d={key:"oneHourPriceChange",header:o,sortKey:y.CurrencyStatsSortBy.ONE_HOUR_PRICE_CHANGE,isChange:!0,tooltip:C},Q[14]=C,Q[15]=o,Q[16]=d):d=Q[16];let ey=d;Q[17]!==el?(S=()=>el("oneDay.change.display"),Q[17]=el,Q[18]=S):S=Q[18],Q[19]!==el?(h=()=>el("oneDay.change.tooltip"),Q[19]=el,Q[20]=h):h=Q[20],Q[21]!==S||Q[22]!==h?(g={key:"oneDayPriceChange",header:S,sortKey:y.CurrencyStatsSortBy.ONE_DAY_PRICE_CHANGE,isChange:!0,tooltip:h},Q[21]=S,Q[22]=h,Q[23]=g):g=Q[23];let ed=g;Q[24]!==el?(p=()=>el("sevenDays.change.display"),Q[24]=el,Q[25]=p):p=Q[25],Q[26]!==el?(b=()=>el("sevenDays.change.tooltip"),Q[26]=el,Q[27]=b):b=Q[27],Q[28]!==p||Q[29]!==b?(_={key:"sevenDayPriceChange",header:p,sortKey:y.CurrencyStatsSortBy.SEVEN_DAY_PRICE_CHANGE,isChange:!0,tooltip:b},Q[28]=p,Q[29]=b,Q[30]=_):_=Q[30];let eS=_;Q[31]!==el?(E=()=>el("thirtyDays.change.display"),Q[31]=el,Q[32]=E):E=Q[32],Q[33]!==el?(w=()=>el("thirtyDays.change.tooltip"),Q[33]=el,Q[34]=w):w=Q[34],Q[35]!==E||Q[36]!==w?(A={key:"thirtyDayPriceChange",header:E,sortKey:y.CurrencyStatsSortBy.THIRTY_DAY_PRICE_CHANGE,isChange:!0,tooltip:w},Q[35]=E,Q[36]=w,Q[37]=A):A=Q[37];let em=A;Q[38]!==el?(R=()=>el("oneDay.vol.display"),Q[38]=el,Q[39]=R):R=Q[39],Q[40]!==el?(k=()=>el("oneDay.vol.tooltip"),Q[40]=el,Q[41]=k):k=Q[41],Q[42]!==R||Q[43]!==k?(f={key:"volume",header:R,sortKey:y.CurrencyStatsSortBy.ONE_DAY_VOLUME,tooltip:k},Q[42]=R,Q[43]=k,Q[44]=f):f=Q[44];let eT=f;Q[45]!==el?(N=()=>el("oneHour.vol.display"),Q[45]=el,Q[46]=N):N=Q[46],Q[47]!==el?(O=()=>el("oneHour.vol.tooltip"),Q[47]=el,Q[48]=O):O=Q[48],Q[49]!==N||Q[50]!==O?(x={key:"oneHourVolume",header:N,sortKey:y.CurrencyStatsSortBy.ONE_HOUR_VOLUME,tooltip:O},Q[49]=N,Q[50]=O,Q[51]=x):x=Q[51];let eh=x;Q[52]!==el?(L={key:"fdv",header:()=>el("fdv.header"),tooltip:()=>el("fdv.tooltip")},Q[52]=el,Q[53]=L):L=Q[53];let eg=L;Q[54]!==el?(D=()=>el("fdv.header"),Q[54]=el,Q[55]=D):D=Q[55],Q[56]!==el?(v=()=>el("fdv.tooltip"),Q[56]=el,Q[57]=v):v=Q[57],Q[58]!==D||Q[59]!==v?(V={key:"marketCap",header:D,sortKey:y.CurrencyStatsSortBy.MARKET_CAP,tooltip:v},Q[58]=D,Q[59]=v,Q[60]=V):V=Q[60];let ep=V;Q[61]!==el?(P=()=>el("gain.header"),Q[61]=el,Q[62]=P):P=Q[62],Q[63]!==el?(F=()=>el("gain.tooltip"),Q[63]=el,Q[64]=F):F=Q[64],Q[65]!==P||Q[66]!==F?(j={key:"gain",header:P,sortKey:y.CurrencyStatsSortBy.GAIN,tooltip:F},Q[65]=P,Q[66]=F,Q[67]=j):j=Q[67];let eb=j;Q[68]!==el?(I={key:"lastOneDay",header:()=>el("last1Day.header"),className:T.lastOneDay},Q[68]=el,Q[69]=I):I=Q[69];let e_=I;Q[70]!==el?(M={key:"lastOneHour",header:()=>el("last1Hour.header"),className:T.lastOneDay},Q[70]=el,Q[71]=M):M=Q[71];let eE=M;Q[72]!==el?(H=()=>el("age.header"),Q[72]=el,Q[73]=H):H=Q[73],Q[74]!==el?(U=()=>el("age.tooltip"),Q[74]=el,Q[75]=U):U=Q[75],Q[76]!==H||Q[77]!==U?(B={key:"age",header:H,sortKey:y.CurrencyStatsSortBy.GENESIS_DATE,tooltip:U},Q[76]=H,Q[77]=U,Q[78]=B):B=Q[78];let ew=B;Q[79]!==ea||Q[80]!==eu?(K=ea?[eu]:[],Q[79]=ea,Q[80]=eu,Q[81]=K):K=Q[81],Q[82]!==eb||Q[83]!==en?(q=en?[eb]:[],Q[82]=eb,Q[83]=en,Q[84]=q):q=Q[84],Q[85]!==e_||Q[86]!==ep||Q[87]!==ed||Q[88]!==eC||Q[89]!==eo||Q[90]!==eS||Q[91]!==K||Q[92]!==q||Q[93]!==ec||Q[94]!==eT?(W=[ec,eo,...K,...q,eC,ep,ed,eS,eT,e_],Q[85]=e_,Q[86]=ep,Q[87]=ed,Q[88]=eC,Q[89]=eo,Q[90]=eS,Q[91]=K,Q[92]=q,Q[93]=ec,Q[94]=eT,Q[95]=W):W=Q[95];let eA=W,eR=ee===y.CurrencyStatsColumnVariant.NEW;Q[96]!==ew||Q[97]!==es?(G=es?[ew]:[],Q[96]=ew,Q[97]=es,Q[98]=G):G=Q[98],Q[99]!==eR||Q[100]!==ed?(Y=eR?[]:[ed],Q[99]=eR,Q[100]=ed,Q[101]=Y):Y=Q[101],Q[102]!==es||Q[103]!==em?(z=es?[]:[em],Q[102]=es,Q[103]=em,Q[104]=z):z=Q[104];let ek=eR?eh:eT,ef=eR?eE:e_;Q[105]!==eg||Q[106]!==ey||Q[107]!==eC||Q[108]!==G||Q[109]!==Y||Q[110]!==z||Q[111]!==ek||Q[112]!==ef?($=[eC,...G,ey,...Y,...z,ek,eg,ef],Q[105]=eg,Q[106]=ey,Q[107]=eC,Q[108]=G,Q[109]=Y,Q[110]=z,Q[111]=ek,Q[112]=ef,Q[113]=$):$=Q[113];let eN=$,eO=eR?eE:e_;Q[114]!==eR||Q[115]!==ed?(X=eR?[]:[ed],Q[114]=eR,Q[115]=ed,Q[116]=X):X=Q[116],Q[117]!==es||Q[118]!==em?(Z=es?[]:[em],Q[117]=es,Q[118]=em,Q[119]=Z):Z=Q[119];let ex=eR?eh:eT;Q[120]!==eg||Q[121]!==eC||Q[122]!==eO||Q[123]!==X||Q[124]!==Z||Q[125]!==ex?(J=[eC,eO,...X,...Z,ex,eg],Q[120]=eg,Q[121]=eC,Q[122]=eO,Q[123]=X,Q[124]=Z,Q[125]=ex,Q[126]=J):J=Q[126];let eL=J;return e?eA:ei?eL:eN};function g(e){let m,g,p,b,_,E,w,A,R,k=(0,t.c)(27),{profile:f,columnVariant:N,showWalletsColumn:O,showGainColumn:x}=e,L=void 0===N?y.CurrencyStatsColumnVariant.DEFAULT:N,D=void 0===O||O,v=void 0!==x&&x;k[0]!==v||k[1]!==D?(m={showWalletsColumn:D,showGainColumn:v},k[0]=v,k[1]=D,k[2]=m):m=k[2];let V=h(f,L,m),{size:P}=(0,C.useTable)(),{image:F}=(0,o.tableRowSizeVariants)({size:P}),j=(0,u.useIsLessThanMd)(),I=(0,S.useStatsSparklineChartClassName)();k[3]===Symbol.for("react.memo_cache_sentinel")?(g=(0,r.jsx)(l.TableCell,{className:T.watchlist,children:(0,r.jsx)(d.CurrencyWatchlistIcon,{loading:!0})}),k[3]=g):g=k[3];let M=g,H=c.TableRow,U=!f&&(j?null:M),B=l.TableCell,K=a.Item,q=a.ItemAvatar,W=F();if(k[4]===Symbol.for("react.memo_cache_sentinel")?(p=(0,r.jsx)(i.SkeletonBlock,{}),k[4]=p):p=k[4],k[5]!==q||k[6]!==W?(b=(0,r.jsx)(q,{className:W,children:p}),k[5]=q,k[6]=W,k[7]=b):b=k[7],k[8]===Symbol.for("react.memo_cache_sentinel")?(_=(0,r.jsx)(n.ItemContent,{children:(0,r.jsx)(i.SkeletonLine,{className:"h-4 w-[100px]"})}),k[8]=_):_=k[8],k[9]!==K||k[10]!==b?(E=(0,r.jsxs)(K,{variant:"unstyled",children:[b,_]}),k[9]=K,k[10]=b,k[11]=E):E=k[11],k[12]!==B||k[13]!==E||k[14]!==T.currency?(w=(0,r.jsx)(B,{className:T.currency,children:E}),k[12]=B,k[13]=E,k[14]=T.currency,k[15]=w):w=k[15],k[16]!==V||k[17]!==I){let e;k[19]!==I?(e=e=>(0,r.jsx)(l.TableCell,{className:"lastOneDay"===e.key?T.lastOneDay:e.className??T.stat,children:"lastOneDay"===e.key?(0,r.jsx)(s.ChartSkeleton,{className:I}):(0,r.jsx)(i.SkeletonLine,{className:"h-4 w-[88px]"})},e.key),k[19]=I,k[20]=e):e=k[20],A=V.map(e),k[16]=V,k[17]=I,k[18]=A}else A=k[18];let G=!f&&(j?M:null);return k[21]!==H||k[22]!==w||k[23]!==A||k[24]!==G||k[25]!==U?(R=(0,r.jsxs)(H,{children:[U,w,A,G]}),k[21]=H,k[22]=w,k[23]=A,k[24]=G,k[25]=U,k[26]=R):R=k[26],R}e.s(["useTokenStatsColumns",0,h],824303),e.s(["CurrencyStatsTableRowSkeleton",()=>g],58284)},159015,526834,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(302502),n=e.i(455480),s=e.i(908097),i=e.i(165102),l=e.i(81303),c=e.i(28067),o=e.i(960243),u=e.i(668493);e.i(646011);var C=e.i(237261),y=e.i(657970),d=e.i(355989),S=e.i(678537),m=e.i(58284),T=e.i(861308),h=e.i(378874),g=e.i(639820),p=e.i(96169),b=e.i(423252),_=e.i(78592),E=e.i(807473),w=e.i(235172),A=e.i(462484);function R(e){let R,k,f,N,O,x,L,D,v,V,P,F,j,I,M,H,U,B,K,q,W=(0,t.c)(73),{currency:G,preColumns:Y,postColumns:z,isTokenWatchedMap:$,isTokenWatchedFetching:X,itemsLiveAddedAt:Z,columnVariant:J,slug:Q}=e,ee=void 0===J?o.CurrencyStatsColumnVariant.DEFAULT:J,er=ee===o.CurrencyStatsColumnVariant.NEW,et=(0,i.useIsLessThanMd)();if(!G){let e;return W[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,r.jsx)(m.CurrencyStatsTableRowSkeleton,{}),W[0]=e):e=W[0],e}let ea=ee===o.CurrencyStatsColumnVariant.NEW;W[1]!==G?(R=(0,n.readFragment)(T.CurrencyStatsTableRowFragment,G),W[1]=G,W[2]=R):R=W[2];let en=R;if(!(en&&"id"in en)){let e;return W[3]===Symbol.for("react.memo_cache_sentinel")?(e=(0,r.jsx)(m.CurrencyStatsTableRowSkeleton,{}),W[3]=e):e=W[3],e}let es=X??!1;W[4]!==en.chainIdentifier||W[5]!==en.contractAddress||W[6]!==$?(k=$?.get(`${en.chainIdentifier}:${en.contractAddress}`)??!1,W[4]=en.chainIdentifier,W[5]=en.contractAddress,W[6]=$,W[7]=k):k=W[7],W[8]!==es||W[9]!==k?(f={fetching:es,isWatched:k},W[8]=es,W[9]=k,W[10]=f):f=W[10],W[11]!==en||W[12]!==f?(N=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.watchlist,children:(0,r.jsx)(C.CurrencyWatchlistButton,{currency:en,initialState:f})}),W[11]=en,W[12]=f,W[13]=N):N=W[13];let ei=N;W[14]!==en.id||W[15]!==Z?(O=Z?.get(en.id),W[14]=en.id,W[15]=Z,W[16]=O):O=W[16],W[17]!==en.chainIdentifier||W[18]!==en.contractAddress||W[19]!==en.name||W[20]!==en.symbol||W[21]!==Q?(x=()=>{(0,a.track)("Token Click",{tokenSymbol:en.symbol,tokenName:en.name,tokenAddress:en.contractAddress,chain:en.chainIdentifier,tab:Q})},W[17]=en.chainIdentifier,W[18]=en.contractAddress,W[19]=en.name,W[20]=en.symbol,W[21]=Q,W[22]=x):x=W[22];let el=et?null:ei;W[23]!==en?(L=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.currency,stickyLeft:0,children:(0,r.jsx)(y.CurrencyStatsTableRowCollection,{currency:en})}),W[23]=en,W[24]=L):L=W[24],W[25]!==en?(D=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:(0,r.jsx)(b.CurrencyStatsTableRowPriceMobile,{currency:en})}),W[25]=en,W[26]=D):D=W[26];let ec=ea?"ONE_HOUR":"ONE_DAY";W[27]!==G||W[28]!==ec?(v=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.lastOneDay,children:(0,r.jsx)(_.CurrencyStatsTableRowSparkLineChart,{currency:G,timeframe:ec})}),W[27]=G,W[28]=ec,W[29]=v):v=W[29],W[30]!==D||W[31]!==v?(V=(0,r.jsxs)(i.Media,{lessThan:"md",children:[D,v]}),W[30]=D,W[31]=v,W[32]=V):V=W[32],W[33]!==en?(P=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:(0,r.jsx)(S.CurrencyStatsTableRowPrice,{currency:en})}),W[33]=en,W[34]=P):P=W[34],W[35]!==en?(F=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:(0,r.jsx)(g.CurrencyStatsTableRowOneHourPriceChange,{currency:en})}),W[35]=en,W[36]=F):F=W[36],W[37]!==z||W[38]!==P||W[39]!==F?(j=(0,r.jsxs)(i.Media,{greaterThanOrEqual:"md",children:[P,z,F]}),W[37]=z,W[38]=P,W[39]=F,W[40]=j):j=W[40],W[41]!==en||W[42]!==ea?(I=!ea&&(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:(0,r.jsx)(h.CurrencyStatsTableRowOneDayPriceChange,{currency:en})}),W[41]=en,W[42]=ea,W[43]=I):I=W[43],W[44]!==en||W[45]!==er?(M=!er&&(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:(0,r.jsx)(E.CurrencyStatsTableRowThirtyDayPriceChange,{currency:en})}),W[44]=en,W[45]=er,W[46]=M):M=W[46],W[47]!==en||W[48]!==ea?(H=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:ea?(0,r.jsx)(p.CurrencyStatsTableRowOneHourVolume,{currency:en}):(0,r.jsx)(w.CurrencyStatsTableRowVolume,{currency:en})}),W[47]=en,W[48]=ea,W[49]=H):H=W[49],W[50]!==en?(U=(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.stat,children:(0,r.jsx)(d.CurrencyStatsTableRowFDV,{currency:en})}),W[50]=en,W[51]=U):U=W[51];let eo=ea?"ONE_HOUR":"ONE_DAY";W[52]!==G||W[53]!==eo?(B=(0,r.jsx)(i.Media,{greaterThanOrEqual:"md",children:(0,r.jsx)(l.TableCell,{className:A.CURRENCY_STATS_TABLE_COLUMN_CLASSNAMES.lastOneDay,children:(0,r.jsx)(_.CurrencyStatsTableRowSparkLineChart,{currency:G,timeframe:eo})})}),W[52]=G,W[53]=eo,W[54]=B):B=W[54];let eu=et?ei:null;return W[55]!==en||W[56]!==Y||W[57]!==L||W[58]!==V||W[59]!==j||W[60]!==I||W[61]!==M||W[62]!==H||W[63]!==U||W[64]!==B||W[65]!==eu||W[66]!==x||W[67]!==el?(K=(0,r.jsx)(c.TableRow,{asChild:!0,interactive:!0,children:(0,r.jsxs)(u.CurrencyLink,{currency:en,onClick:x,variant:"unstyled",children:[el,L,Y,V,j,I,M,H,U,B,eu]})}),W[55]=en,W[56]=Y,W[57]=L,W[58]=V,W[59]=j,W[60]=I,W[61]=M,W[62]=H,W[63]=U,W[64]=B,W[65]=eu,W[66]=x,W[67]=el,W[68]=K):K=W[68],W[69]!==en.id||W[70]!==K||W[71]!==O?(q=(0,r.jsx)(s.LiveAnimation,{itemKey:en.id,liveAddedAt:O,variant:"table",children:K}),W[69]=en.id,W[70]=K,W[71]=O,W[72]=q):q=W[72],q}e.s(["CurrencyStatsTableRow",()=>R],159015);var k=e.i(885530),f=e.i(410025),N=e.i(853202);e.i(232947);var O=e.i(859898),x=e.i(657980);e.i(402819);var L=e.i(916744);let D=(0,k.graphql)(`
    fragment CurrencyStatsSubscription on CurrencyV2 {
      id
      genesisDate
      usdPrice
      stats {
        marketCapUsd
        fdvUsd
        totalSupply
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
      ...currencyIdentifier
    }
  `,[O.currencyIdentifierFragment]),v=(0,k.graphql)(`
    subscription useCurrencyStatsSubscription(
      $currencies: [ContractIdentifierInput!]
    ) {
      currenciesV2(currencies: $currencies) {
        id
        ...CurrencyStatsSubscription
      }
    }
  `,[D]);class V extends x.Paginator{getValues(e,r){let t=(0,n.readFragment)(D,e);switch(r){case"ONE_DAY_VOLUME":return[t.stats?.oneDay.volume??0,t.id];case"ONE_HOUR_VOLUME":return[t.stats?.oneHour.volume??0,t.id];case"MARKET_CAP":return[t.stats?.marketCapUsd??0,t.id];case"PRICE":return[t.usdPrice??0,t.id];case"ONE_DAY_PRICE_CHANGE":return[t.stats?.oneDay.priceChange??0,t.id];case"ONE_HOUR_PRICE_CHANGE":return[t.stats?.oneHour.priceChange??0,t.id];case"SEVEN_DAY_PRICE_CHANGE":return[t.stats?.sevenDay.priceChange??0,t.id];case"FOURTEEN_DAY_PRICE_CHANGE":return[t.stats?.fourteenDay.priceChange??0,t.id];case"THIRTY_DAY_PRICE_CHANGE":return[t.stats?.thirtyDay.priceChange??0,t.id];case"GENESIS_DATE":return[t.genesisDate?new Date(t.genesisDate).getTime():0,t.id];case"SCORE":return[Number(t.stats?.score??0),t.id];default:return[t.id]}}}let P=new V({maxItems:void 0});function F(e){return null!=e}let j=e=>{let{contractAddress:r,chainIdentifier:t}=(0,O.getCurrencyIdentifier)((0,n.readFragment)(D,e));if(r&&t)return{address:r,chain:t}};function I(e){return{address:e.address,chain:e.chain}}e.s(["CurrencyStatsSubscriptionFragment",0,D,"useCurrenciesStatsSubscription",0,(e,r,a)=>{let s,i,l,c,o,u,C=(0,t.c)(12);if(C[0]!==e){let r=(0,f.sortBy)(e,["id"]).map(j).filter(F).slice(0,200);l=L.useSubscription,i=v,s=r.map(I),C[0]=e,C[1]=s,C[2]=i,C[3]=l}else s=C[1],i=C[2],l=C[3];C[4]!==s?(c={currencies:s},C[4]=s,C[5]=c):c=C[5],C[6]!==i||C[7]!==c?(o={query:i,variables:c},C[6]=i,C[7]=c,C[8]=o):o=C[8],C[9]!==r||C[10]!==a?(u=e=>{let t=e.currenciesV2;t?.length&&r(e=>{let r=e;for(let e of t)r=P.updateInOrder(r,a,r=>r.id===e.id,r=>{let t=(0,n.readFragment)(D,e);return(0,N.set)(r,"usdPrice",t.usdPrice)});return r})},C[9]=r,C[10]=a,C[11]=u):u=C[11],l(o,u)}],526834)},121342,e=>{"use strict";let r={table:"table",tableCompact:"tableCompact"},t=e=>r.table;function a(e,a){return e&&e in r?e:t(a)}function n(e,t){return e&&e in r?e:"collector"===t?r.table:r.tableCompact}Object.values(r),e.s(["CREATED_STATS_TABLE_VIEW_COOKIE_NAME",0,"createdStatsTableView","HOME_STATS_TABLE_VIEW_COOKIE_NAME",0,"homeStatsTableView","PERPETUALS_STATS_TABLE_VIEW_COOKIE_NAME",0,"perpetualsStatsTableView","PORTFOLIO_STATS_TABLE_VIEW_COOKIE_NAME",0,"portfolioStatsTableView","STATS_TABLE_VIEW",0,r,"STATS_TABLE_VIEW_COOKIE_NAME",0,"statsTableView","STUDIO_CREATED_STATS_TABLE_VIEW_COOKIE_NAME",0,"studioCreatedStatsTableView","TOKENS_FILTER_SIDE_PANEL_STATE_COOKIE_NAME",0,"tokensFilterSidePanelState","TOKENS_STATS_TABLE_VIEW_COOKIE_NAME",0,"tokensStatsTableView","WATCHLIST_STATS_TABLE_VIEW_COOKIE_NAME",0,"watchlistStatsTableView","getDefaultDiscoverStatsTableView",0,e=>"collector"===e?r.table:r.tableCompact,"getDefaultStatsTableView",0,t,"parseDiscoverStatsTableView",()=>n,"parseStatsTableView",()=>a])},831294,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(121342),n=e.i(976644),s=e.i(669058),i=e.i(35720),l=e.i(670383),c=e.i(241119);let o={discover:a.HOME_STATS_TABLE_VIEW_COOKIE_NAME,stats:a.STATS_TABLE_VIEW_COOKIE_NAME,portfolio:a.PORTFOLIO_STATS_TABLE_VIEW_COOKIE_NAME,watchlist:a.WATCHLIST_STATS_TABLE_VIEW_COOKIE_NAME,created:a.CREATED_STATS_TABLE_VIEW_COOKIE_NAME,tokens:a.TOKENS_STATS_TABLE_VIEW_COOKIE_NAME,perpetuals:a.PERPETUALS_STATS_TABLE_VIEW_COOKIE_NAME},u=(0,l.createContext)({tableView:"table",setTableView:()=>{},size:"sm"});function C(e){let l,C,y,d,S,m=(0,t.c)(17),{children:T,tableView:h,page:g}=e,p=void 0===g?"stats":g,{persona:b}=(0,n.usePersona)(),_=o[p],[E,w]=(0,s.useCookie)(_);m[0]!==h||m[1]!==b||m[2]!==E?(l=E??h??(0,a.getDefaultStatsTableView)(b),m[0]=h,m[1]=b,m[2]=E,m[3]=l):l=m[3];let A=l,R="table"===A?"md":"sm";m[4]!==w?(C=function(e){w(e,{expires:c.LONG_LASTING_COOKIE_EXPIRATION})},m[4]=w,m[5]=C):C=m[5];let k=C;m[6]!==p||m[7]!==b||m[8]!==k?(y=()=>{k("discover"===p?(0,a.getDefaultDiscoverStatsTableView)(b):(0,a.getDefaultStatsTableView)(b))},m[6]=p,m[7]=b,m[8]=k,m[9]=y):y=m[9],(0,i.useOnChange)(b,y),m[10]!==A||m[11]!==k||m[12]!==R?(d={tableView:A,setTableView:k,size:R},m[10]=A,m[11]=k,m[12]=R,m[13]=d):d=m[13];let f=d;return m[14]!==T||m[15]!==f?(S=(0,r.jsx)(u.Provider,{value:f,children:T}),m[14]=T,m[15]=f,m[16]=S):S=m[16],S}e.s(["StatsTableViewProvider",()=>C,"useStatsTableView",0,()=>(0,l.useContext)(u)])},818304,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  fragment CurrencySparkLineChart on CurrencyV2 {
    sparkline(timeframe: ONE_DAY) {
      price {
        usd
      }
      time
    }
  }
`);e.s(["CurrencySparkLineChartFragment",0,r])},730098,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  fragment CurrencySparkLineChartOneHour on CurrencyV2 {
    sparklineOneHour: sparkline(timeframe: ONE_HOUR) {
      price {
        usd
      }
      time
    }
  }
`);e.s(["CurrencySparkLineChartOneHourFragment",0,r])},378874,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(209959);let i=(0,a.graphql)(`
  fragment CurrencyStatsTableRowOneDayPriceChange on CurrencyV2 {
    stats {
      oneDay {
        priceChange
      }
    }
    tokenGroup {
      stats {
        rollingStats {
          priceChange1d
        }
      }
    }
  }
`);function l(e){let a,l,c=(0,t.c)(4),{currency:o}=e;c[0]!==o?(a=(0,n.readFragment)(i,o),c[0]=o,c[1]=a):a=c[1];let u=a,C=u.tokenGroup?.stats?.rollingStats?.priceChange1d,y=null!=C?Number(C):u.stats?.oneDay.priceChange;return c[2]!==y?(l=(0,r.jsx)(s.StatChange,{change:y}),c[2]=y,c[3]=l):l=c[3],l}e.s(["CurrencyStatsTableRowOneDayPriceChange",()=>l,"CurrencyStatsTableRowOneDayPriceChangeFragment",0,i])},678537,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(34331),i=e.i(165102),l=e.i(465172);e.i(652565);var c=e.i(132553),o=e.i(439870);let u=(0,a.graphql)(`
    fragment CurrencyStatsTableRowPrice on CurrencyV2 {
      usdPrice
      ...CurrencyPrice
    }
  `,[o.CurrencyPriceFragment]);function C(e){let a,o,C,y,d,S,m,T=(0,t.c)(14),{currency:h}=e;if(T[0]!==h){let e=(0,n.readFragment)(u,h);d="whitespace-nowrap",a=s.ChangeAnimation,o="usd-compact",C=Number(e.usdPrice),y=(0,l.bn)(e.usdPrice).gte(1)?(0,r.jsx)(c.CurrencyPrice,{currency:e}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Media,{lessThan:"md",children:(0,r.jsx)(c.CurrencyPrice,{currency:e,custom:{maximumFractionDigits:4,roundingPriority:"lessPrecision"}})}),(0,r.jsx)(i.Media,{between:["md","4xl"],children:(0,r.jsx)(c.CurrencyPrice,{currency:e,custom:{maximumFractionDigits:5,roundingPriority:"lessPrecision"}})}),(0,r.jsx)(i.Media,{greaterThanOrEqual:"4xl",children:(0,r.jsx)(c.CurrencyPrice,{currency:e,custom:{maximumFractionDigits:7,roundingPriority:"lessPrecision"}})})]}),T[0]=h,T[1]=a,T[2]=o,T[3]=C,T[4]=y,T[5]=d}else a=T[1],o=T[2],C=T[3],y=T[4],d=T[5];return T[6]!==a||T[7]!==o||T[8]!==C||T[9]!==y?(S=(0,r.jsx)(a,{display:o,value:C,children:y}),T[6]=a,T[7]=o,T[8]=C,T[9]=y,T[10]=S):S=T[10],T[11]!==d||T[12]!==S?(m=(0,r.jsx)("span",{className:d,children:S}),T[11]=d,T[12]=S,T[13]=m):m=T[13],m}e.s(["CurrencyStatsTableRowPrice",()=>C,"CurrencyStatsTableRowPriceFragment",0,u])},675425,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(34331),i=e.i(738480);let l=(0,a.graphql)(`
  fragment CurrencyStatsTableRowMarketCap on CurrencyV2 {
    stats {
      marketCapUsd
    }
    tokenGroup {
      stats {
        marketCapUsd
      }
    }
  }
`);function c(e){let a,c,o,u=(0,t.c)(7),{currency:C}=e;u[0]!==C?(a=(0,n.readFragment)(l,C),u[0]=C,u[1]=a):a=u[1];let y=a,d=y.tokenGroup?.stats?.marketCapUsd??y.stats?.marketCapUsd,S=d?Number(d):void 0;return u[2]!==S?(c=(0,r.jsx)(i.NumberDisplay,{bounded:!1,display:"usd",value:S}),u[2]=S,u[3]=c):c=u[3],u[4]!==S||u[5]!==c?(o=(0,r.jsx)(s.ChangeAnimation,{display:"usd",value:S,children:c}),u[4]=S,u[5]=c,u[6]=o):o=u[6],o}e.s(["CurrencyStatsTableRowMarketCap",()=>c,"CurrencyStatsTableRowMarketCapFragment",0,l])},456965,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(34331),i=e.i(209959);let l=(0,a.graphql)(`
  fragment CurrencyStatsTableRowSevenDayPriceChange on CurrencyV2 {
    stats {
      sevenDay {
        priceChange
      }
    }
  }
`);function c(e){let a,c,o,u=(0,t.c)(7),{currency:C}=e;u[0]!==C?(a=(0,n.readFragment)(l,C),u[0]=C,u[1]=a):a=u[1];let y=a,d=y.stats?.sevenDay.priceChange,S=y.stats?.sevenDay.priceChange;return u[2]!==S?(c=(0,r.jsx)(i.StatChange,{change:S}),u[2]=S,u[3]=c):c=u[3],u[4]!==d||u[5]!==c?(o=(0,r.jsx)(s.ChangeAnimation,{display:"percent",value:d,children:c}),u[4]=d,u[5]=c,u[6]=o):o=u[6],o}e.s(["CurrencyStatsTableRowSevenDayPriceChange",()=>c,"CurrencyStatsTableRowSevenDayPriceChangeFragment",0,l])},581808,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(745841);let i=(0,a.graphql)(`
  fragment CurrencyStatsTableRowAge on CurrencyV2 {
    genesisDate
  }
`);function l(e){let a,l,c=(0,t.c)(4),{currency:o}=e;c[0]!==o?(a=(0,n.readFragment)(i,o),c[0]=o,c[1]=a):a=c[1];let u=a;return c[2]!==u.genesisDate?(l=(0,r.jsx)(s.LiveTimestamp,{date:u.genesisDate,display:"compact"}),c[2]=u.genesisDate,c[3]=l):l=c[3],l}e.s(["CurrencyStatsTableRowAge",()=>l,"CurrencyStatsTableRowAgeFragment",0,i])},657360,e=>{"use strict";var r=e.i(81810),t=e.i(885530),a=e.i(489669);let n=(0,t.graphql)(`
    fragment CurrencyStatsTableRowCollection on CurrencyV2 {
      ...CurrencyV2Lockup
      ...CurrencyPreviewTooltip
      collections {
        id
      }
      tokenGroup {
        perpetuals {
          id
        }
      }
    }
  `,[r.CurrencyV2LockupFragment,a.CurrencyPreviewTooltipFragment]);e.s(["CurrencyStatsTableRowCollectionFragment",0,n])},657970,355989,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(508833),n=e.i(22764),s=e.i(455480),i=e.i(437153),l=e.i(254842),c=e.i(747460),o=e.i(984335);e.i(1075);var u=e.i(614055),C=e.i(806056),y=e.i(657360);function d(e){let d,S,m,T,h,g,p,b,_,E,w,A,R,k,f,N,O,x,L,D=(0,t.c)(41),{currency:v,showChainBadge:V,showPerpetualBadge:P}=e,F=void 0!==V&&V,j=void 0===P||P;D[0]!==v?(d=(0,s.readFragment)(y.CurrencyStatsTableRowCollectionFragment,v),D[0]=v,D[1]=d):d=D[1];let I=d,M=(0,C.useIsPerpetualsEnabled)(),{size:H}=(0,o.useTable)();if(D[2]!==I||D[3]!==M||D[4]!==F||D[5]!==j||D[6]!==H){let{image:e}=(0,c.tableRowSizeVariants)({size:H});({image:g}=c.TABLE_SIZES[H]),h=j&&M&&(I.tokenGroup?.perpetuals?.length??0)>0,T=u.CurrencyPreviewTooltip,w=I,m=a.CurrencyLockup,_=I,E=H,S=a.CurrencyLockupAvatar,D[17]!==F?(p=F?(0,r.jsx)(a.CurrencyLockupChainBadge,{size:"xs"}):null,D[17]=F,D[18]=p):p=D[18],b=(0,i.classNames)(e(),"rounded-full"),D[2]=I,D[3]=M,D[4]=F,D[5]=j,D[6]=H,D[7]=S,D[8]=m,D[9]=T,D[10]=h,D[11]=g,D[12]=p,D[13]=b,D[14]=_,D[15]=E,D[16]=w}else S=D[7],m=D[8],T=D[9],h=D[10],g=D[11],p=D[12],b=D[13],_=D[14],E=D[15],w=D[16];return D[19]!==S||D[20]!==g||D[21]!==p||D[22]!==b?(A=(0,r.jsx)(S,{badge:p,className:b,size:g}),D[19]=S,D[20]=g,D[21]=p,D[22]=b,D[23]=A):A=D[23],D[24]===Symbol.for("react.memo_cache_sentinel")?(R=(0,r.jsx)(a.CurrencyLockupTitle,{weight:"regular"}),k=(0,r.jsx)(a.CurrencyLockupSymbol,{}),f=(0,r.jsx)(a.CurrencyLockupBadge,{}),D[24]=R,D[25]=k,D[26]=f):(R=D[24],k=D[25],f=D[26]),D[27]!==h?(N=h&&(0,r.jsx)(a.CurrencyLockupPerpetualBadge,{}),D[27]=h,D[28]=N):N=D[28],D[29]!==N?(O=(0,r.jsx)(n.CurrencyLockupContent,{children:(0,r.jsxs)(l.Flex,{className:"items-center gap-1.5",children:[R,k,f,N]})}),D[29]=N,D[30]=O):O=D[30],D[31]!==m||D[32]!==O||D[33]!==_||D[34]!==E||D[35]!==A?(x=(0,r.jsx)("div",{children:(0,r.jsxs)(m,{currency:_,size:E,children:[A,O]})}),D[31]=m,D[32]=O,D[33]=_,D[34]=E,D[35]=A,D[36]=x):x=D[36],D[37]!==T||D[38]!==x||D[39]!==w?(L=(0,r.jsx)(T,{currency:w,children:x}),D[37]=T,D[38]=x,D[39]=w,D[40]=L):L=D[40],L}e.s(["CurrencyStatsTableRowCollection",()=>d],657970);var S=e.i(885530),m=e.i(34331),T=e.i(738480);let h=(0,S.graphql)(`
  fragment CurrencyStatsTableRowFDV on CurrencyV2 {
    stats {
      marketCapUsd
    }
    tokenGroup {
      stats {
        marketCapUsd
      }
    }
  }
`);function g(e){let a,n,i,l=(0,t.c)(7),{currency:c}=e;l[0]!==c?(a=(0,s.readFragment)(h,c),l[0]=c,l[1]=a):a=l[1];let o=a,u=o.tokenGroup?.stats?.marketCapUsd??o.stats?.marketCapUsd,C=u?Number(u):void 0;return l[2]!==C?(n=(0,r.jsx)(T.NumberDisplay,{bounded:!1,display:"usd",value:C}),l[2]=C,l[3]=n):n=l[3],l[4]!==C||l[5]!==n?(i=(0,r.jsx)(m.ChangeAnimation,{display:"usd",value:C,children:n}),l[4]=C,l[5]=n,l[6]=i):i=l[6],i}e.s(["CurrencyStatsTableRowFDV",()=>g,"CurrencyStatsTableRowFDVFragment",0,h],355989)},639820,96169,423252,807473,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(34331),i=e.i(209959);let l=(0,a.graphql)(`
  fragment CurrencyStatsTableRowOneHourPriceChange on CurrencyV2 {
    stats {
      oneHour {
        priceChange
      }
    }
  }
`);function c(e){let a,c,o,u=(0,t.c)(7),{currency:C}=e;u[0]!==C?(a=(0,n.readFragment)(l,C),u[0]=C,u[1]=a):a=u[1];let y=a,d=y.stats?.oneHour.priceChange,S=y.stats?.oneHour.priceChange;return u[2]!==S?(c=(0,r.jsx)(i.StatChange,{change:S}),u[2]=S,u[3]=c):c=u[3],u[4]!==d||u[5]!==c?(o=(0,r.jsx)(s.ChangeAnimation,{display:"percent",value:d,children:c}),u[4]=d,u[5]=c,u[6]=o):o=u[6],o}e.s(["CurrencyStatsTableRowOneHourPriceChange",()=>c,"CurrencyStatsTableRowOneHourPriceChangeFragment",0,l],639820);var o=e.i(738480);let u=(0,a.graphql)(`
  fragment CurrencyStatsTableRowOneHourVolume on CurrencyV2 {
    stats {
      oneHour {
        volume
      }
    }
  }
`);function C(e){let a,i,l,c=(0,t.c)(7),{currency:C}=e;c[0]!==C?(a=(0,n.readFragment)(u,C),c[0]=C,c[1]=a):a=c[1];let y=a,d=y.stats?.oneHour.volume,S=y.stats?.oneHour.volume;return c[2]!==S?(i=(0,r.jsx)(o.NumberDisplay,{bounded:!1,display:"usd",value:S}),c[2]=S,c[3]=i):i=c[3],c[4]!==d||c[5]!==i?(l=(0,r.jsx)(s.ChangeAnimation,{display:"usd",value:d,children:i}),c[4]=d,c[5]=i,c[6]=l):l=c[6],l}e.s(["CurrencyStatsTableRowOneHourVolume",()=>C,"CurrencyStatsTableRowOneHourVolumeFragment",0,u],96169);var y=e.i(965523),d=e.i(678537);let S=(0,a.graphql)(`
    fragment CurrencyStatsTableRowPriceMobile on CurrencyV2 {
      ...CurrencyStatsTableRowPrice
      ...CurrencyStatsTableRowOneHourPriceChange
    }
  `,[d.CurrencyStatsTableRowPriceFragment,l]);function m(e){let a,s,i=(0,t.c)(4),{currency:l}=e;i[0]!==l?(a=(0,n.readFragment)(S,l),i[0]=l,i[1]=a):a=i[1];let o=a;return i[2]!==o?(s=(0,r.jsxs)(y.FlexColumn,{className:"items-end",children:[(0,r.jsx)(d.CurrencyStatsTableRowPrice,{currency:o}),(0,r.jsx)(c,{currency:o})]}),i[2]=o,i[3]=s):s=i[3],s}e.s(["CurrencyStatsTableRowPriceMobile",()=>m,"CurrencyStatsTableRowPriceMobileFragment",0,S],423252);let T=(0,a.graphql)(`
  fragment CurrencyStatsTableRowThirtyDayPriceChange on CurrencyV2 {
    stats {
      thirtyDay {
        priceChange
      }
    }
    tokenGroup {
      stats {
        rollingStats {
          priceChange30d
        }
      }
    }
  }
`);function h(e){let a,l,c,o=(0,t.c)(7),{currency:u}=e;o[0]!==u?(a=(0,n.readFragment)(T,u),o[0]=u,o[1]=a):a=o[1];let C=a,y=C.tokenGroup?.stats?.rollingStats?.priceChange30d,d=null!=y?Number(y):C.stats?.thirtyDay.priceChange;return o[2]!==d?(l=(0,r.jsx)(i.StatChange,{change:d}),o[2]=d,o[3]=l):l=o[3],o[4]!==d||o[5]!==l?(c=(0,r.jsx)(s.ChangeAnimation,{display:"percent",value:d,children:l}),o[4]=d,o[5]=l,o[6]=c):c=o[6],c}e.s(["CurrencyStatsTableRowThirtyDayPriceChange",()=>h,"CurrencyStatsTableRowThirtyDayPriceChangeFragment",0,T],807473)},235172,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(34331),i=e.i(738480);let l=(0,a.graphql)(`
  fragment CurrencyStatsTableRowVolume on CurrencyV2 {
    stats {
      oneDay {
        volume
      }
    }
    tokenGroup {
      stats {
        rollingStats {
          volume1d
        }
      }
    }
  }
`);function c(e){let a,c,o,u=(0,t.c)(7),{currency:C}=e;u[0]!==C?(a=(0,n.readFragment)(l,C),u[0]=C,u[1]=a):a=u[1];let y=a,d=y.tokenGroup?.stats?.rollingStats?.volume1d,S=null!=d?Number(d):y.stats?.oneDay.volume;return u[2]!==S?(c=(0,r.jsx)(i.NumberDisplay,{bounded:!1,display:"usd",value:S}),u[2]=S,u[3]=c):c=u[3],u[4]!==c||u[5]!==S?(o=(0,r.jsx)(s.ChangeAnimation,{display:"usd",value:S,children:c}),u[4]=c,u[5]=S,u[6]=o):o=u[6],o}e.s(["CurrencyStatsTableRowVolume",()=>c,"CurrencyStatsTableRowVolumeFragment",0,l])},78592,861308,385452,947195,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(885530),n=e.i(455480),s=e.i(922364),i=e.i(535374),l=e.i(965523),c=e.i(255666),o=e.i(950293),u=e.i(818304),C=e.i(730098),y=e.i(445329),d=e.i(609644),S=e.i(95581),m=e.i(581808);e.i(657970);var T=e.i(657360),h=e.i(355989),g=e.i(378874),p=e.i(639820),b=e.i(96169),_=e.i(678537),E=e.i(423252),w=e.i(807473),A=e.i(235172);let R=(0,a.graphql)(`
    fragment CurrencyStatsTableRow on CurrencyV2 {
      id
      contractAddress
      chainIdentifier
      name
      symbol
      ...CurrencyStatsTableRowFDV
      ...CurrencyStatsTableRowPrice
      ...CurrencyStatsTableRowOneHourPriceChange
      ...CurrencyStatsTableRowOneDayPriceChange
      ...CurrencyStatsTableRowThirtyDayPriceChange
      ...CurrencyStatsTableRowCollection
      ...CurrencyStatsTableRowVolume
      ...CurrencyStatsTableRowOneHourVolume
      ...CurrencyV2Link
      ...CurrencyStatsTableRowPriceMobile
      ...CurrencyWatchlistButton
      ...CurrencyStatsTableRowAge
    }
  `,[h.CurrencyStatsTableRowFDVFragment,_.CurrencyStatsTableRowPriceFragment,p.CurrencyStatsTableRowOneHourPriceChangeFragment,g.CurrencyStatsTableRowOneDayPriceChangeFragment,w.CurrencyStatsTableRowThirtyDayPriceChangeFragment,T.CurrencyStatsTableRowCollectionFragment,A.CurrencyStatsTableRowVolumeFragment,b.CurrencyStatsTableRowOneHourVolumeFragment,d.CurrencyV2LinkFragment,E.CurrencyStatsTableRowPriceMobileFragment,S.CurrencyWatchlistButtonFragment,m.CurrencyStatsTableRowAgeFragment]);e.s(["CurrencyStatsTableRowFragment",0,R],861308);let k=(0,a.graphql)(`
    fragment CurrencyStatsTableRowSparkLineChartDefault on CurrencyV2 {
      ...CurrencySparkLineChart
    }
  `,[u.CurrencySparkLineChartFragment]),f=(0,a.graphql)(`
    fragment CurrencyStatsTableRowDefault on CurrencyV2 {
      ...CurrencyStatsTableRow
      ...CurrencyStatsTableRowSparkLineChartDefault
    }
  `,[R,k]);e.s(["CurrencyStatsTableRowDefaultFragment",0,f],385452);let N=(0,a.graphql)(`
    fragment CurrencyStatsTableRowSparkLineChartNew on CurrencyV2 {
      ...CurrencySparkLineChartOneHour
    }
  `,[C.CurrencySparkLineChartOneHourFragment]),O=(0,a.graphql)(`
    fragment CurrencyStatsTableRowNew on CurrencyV2 {
      ...CurrencyStatsTableRow
      ...CurrencyStatsTableRowSparkLineChartNew
    }
  `,[R,N]);e.s(["CurrencyStatsTableRowNewFragment",0,O],947195);let x=(0,a.graphql)(`
    fragment CurrencyStatsTableRowSparkLineChart on CurrencyV2 {
      ...CurrencySparkLineChart
      ...CurrencySparkLineChartOneHour
    }
  `,[u.CurrencySparkLineChartFragment,C.CurrencySparkLineChartOneHourFragment]);function L(e){let a,n,c,u,C,y=(0,t.c)(13),{item:d}=e,S=(0,i.useNumberFormatter)(),m=(0,s.useDateTimeFormatter)();return y[0]!==S||y[1]!==d.price.usd?(a=S(d.price.usd,{display:"usd-compact"}),y[0]=S,y[1]=d.price.usd,y[2]=a):a=y[2],y[3]!==a?(n=(0,r.jsx)(o.TextBody,{children:a}),y[3]=a,y[4]=n):n=y[4],y[5]!==m||y[6]!==d.time?(c=m(new Date(d.time)),y[5]=m,y[6]=d.time,y[7]=c):c=y[7],y[8]!==c?(u=(0,r.jsx)(o.TextBody,{children:c}),y[8]=c,y[9]=u):u=y[9],y[10]!==n||y[11]!==u?(C=(0,r.jsxs)(l.FlexColumn,{className:"gap-0.5",children:[n,u]}),y[10]=n,y[11]=u,y[12]=C):C=y[12],C}function D(e){let a,s=(0,t.c)(10),{currency:i,timeframe:l}=e,o=(0,y.useStatsSparklineChartClassName)();if("ONE_HOUR"===(void 0===l?"ONE_DAY":l)){let e;s[0]!==i?(e=function(e){let r=(0,n.readFragment)(O,e);if(r){let e=(0,n.readFragment)(N,r);if(e){let r=(0,n.readFragment)(C.CurrencySparkLineChartOneHourFragment,e);if(r&&"sparklineOneHour"in r)return r.sparklineOneHour}}let t=(0,n.readFragment)(x,e);if(t){let e=(0,n.readFragment)(C.CurrencySparkLineChartOneHourFragment,t);if(e&&"sparklineOneHour"in e)return e.sparklineOneHour}return null}(i),s[0]=i,s[1]=e):e=s[1];let t=e;if(t){let e;return s[2]!==t||s[3]!==o?(e=(0,r.jsx)(c.SparkLineChart,{className:o,data:t,getDate:F,getValue:P,renderTooltip:L}),s[2]=t,s[3]=o,s[4]=e):e=s[4],e}return null}s[5]!==i?(a=function(e){let r=(0,n.readFragment)(f,e);if(r){let e=(0,n.readFragment)(k,r);if(e){let r=(0,n.readFragment)(u.CurrencySparkLineChartFragment,e);if(r&&"sparkline"in r)return r.sparkline}}let t=(0,n.readFragment)(x,e);if(t){let e=(0,n.readFragment)(u.CurrencySparkLineChartFragment,t);if(e&&"sparkline"in e)return e.sparkline}return null}(i),s[5]=i,s[6]=a):a=s[6];let d=a;if(d){let e;return s[7]!==d||s[8]!==o?(e=(0,r.jsx)(c.SparkLineChart,{className:o,data:d,getDate:V,getValue:v,renderTooltip:L}),s[7]=d,s[8]=o,s[9]=e):e=s[9],e}return null}function v(e){return e.price.usd}function V(e){return new Date(e.time)}function P(e){return e.price.usd}function F(e){return new Date(e.time)}e.s(["CurrencyStatsTableRowSparkLineChart",()=>D,"CurrencyStatsTableRowSparkLineChartFragment",0,x],78592)},76292,197251,584580,e=>{"use strict";var r=e.i(7683),t=e.i(866313),a=e.i(670383),n=e.i(729427),s=e.i(455480),i=e.i(808055),l=e.i(885530),c=e.i(609644),o=e.i(657360),u=e.i(378874),C=e.i(678537),y=e.i(456965),d=e.i(235172),S=e.i(675425),m=e.i(78592);let T=(0,l.graphql)(`
    fragment ProfileCurrencyStatsTableRow on CurrencyBalanceV2 {
      address
      usdValue
      quantity
      gainStats {
        gain
      }
      asset {
        id
        name
        symbol
        contractAddress
        chain {
          identifier
        }
        imageUrl
        metadata {
          fullCollection {
            imageUrl
          }
        }
        ...CurrencyStatsTableRowPrice
        ...CurrencyStatsTableRowVolume
        ...CurrencyStatsTableRowOneDayPriceChange
        ...CurrencyStatsTableRowSevenDayPriceChange
        ...CurrencyStatsTableRowCollection
        ...CurrencyStatsTableRowSparkLineChart
        ...CurrencyStatsTableRowMarketCap
        ...CurrencyV2Link
      }
    }
  `,[C.CurrencyStatsTableRowPriceFragment,d.CurrencyStatsTableRowVolumeFragment,u.CurrencyStatsTableRowOneDayPriceChangeFragment,y.CurrencyStatsTableRowSevenDayPriceChangeFragment,o.CurrencyStatsTableRowCollectionFragment,m.CurrencyStatsTableRowSparkLineChartFragment,S.CurrencyStatsTableRowMarketCapFragment,c.CurrencyV2LinkFragment]);function h(e,r){return r?`${e}-${r}`:e}e.s(["ProfileCurrencyStatsTableRowFragment",0,T],197251);let g=()=>(0,n.create)()((0,i.mutative)((e,r)=>({allTokens:[],selectedTokenIds:new Set,selectedTokensMap:new Map,refreshVersion:0,setAllTokens:r=>{e(e=>{e.allTokens=r.map(e=>{let r=(0,s.readFragment)(T,e),t=r.asset;return t?{id:h(t.id,r.address),contractAddress:t.contractAddress,chain:t.chain?.identifier,ownerAddress:r.address,currency:{name:t.name,symbol:t.symbol,imageUrl:t.imageUrl,metadata:t.metadata?{fullCollection:t.metadata.fullCollection?{imageUrl:t.metadata.fullCollection.imageUrl??null}:null}:null}}:null}).filter(e=>null!==e),e.selectedTokensMap.clear(),e.selectedTokenIds.clear()})},selectAllTokens:()=>{let{allTokens:t}=r();e(e=>{e.selectedTokensMap.size>0?(e.selectedTokensMap.clear(),e.selectedTokenIds.clear()):(e.selectedTokensMap.clear(),e.selectedTokenIds.clear(),t.forEach(r=>{e.selectedTokensMap.set(r.id,r),e.selectedTokenIds.add(r.id)}))})},selectToken:(r,t)=>{e(e=>{let a=e.allTokens.find(e=>e.id===r);if(!a)return;let n=()=>{e.selectedTokensMap.set(r,a),e.selectedTokenIds.add(r)},s=()=>{e.selectedTokensMap.delete(r),e.selectedTokenIds.delete(r)};void 0!==t?t&&!e.selectedTokensMap.has(r)?n():!t&&e.selectedTokensMap.has(r)&&s():e.selectedTokensMap.has(r)?s():n()})},resetSelections:()=>{e(e=>{e.selectedTokensMap.clear(),e.selectedTokenIds.clear()})},markTokensMutated:()=>{e(e=>{e.refreshVersion+=1})}})));e.s(["createProfileTokensSelectionStore",0,g,"createTokenCompositeKey",()=>h],584580);let p=g(),b=(0,a.createContext)(p);function _(e){let a,n=(0,t.c)(2),{children:s}=e;return n[0]!==s?(a=(0,r.jsx)(b.Provider,{value:p,children:s}),n[0]=s,n[1]=a):a=n[1],a}function E(e){let r=(0,a.useContext)(b);return(0,n.useStore)(r,e)}e.s(["ProfileTokensSelectionProvider",()=>_,"useProfileTokensSelectionStore",()=>E],76292)},410025,e=>{"use strict";function r(e,r){var t;return t=["asc"],e.slice().sort((e,a)=>{let n=t.length;for(let s=0;s<r.length;s++){let i=n>s?t[s]:t[n-1],l=r[s],c="function"==typeof l,o=c?l(e):e[l],u=c?l(a):a[l],C=o<u?"asc"===i?-1:1:o>u?"asc"===i?1:-1:0;if(0!==C)return C}return 0})}e.s(["sortBy",()=>r],410025)}]);

//# debugId=31d2f97d-ab75-4ea5-657c-9b428bf85da5
//# sourceMappingURL=a73b06ae14b813d9.js.map