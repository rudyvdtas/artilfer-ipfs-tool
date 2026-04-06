;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="7a6dba75-f762-2340-e8b4-f3a800937f82")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,688962,74320,674090,286655,730691,192019,446322,715400,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(7683),r=e.i(866313),a=e.i(47667),o=e.i(190627),n=e.i(455480),s=e.i(491150),c=e.i(861993),u=e.i(567089),m=e.i(437153),g=e.i(738480),d=e.i(258343),f=e.i(950293),p=e.i(266341),T=e.i(28155),h=e.i(522285),C=e.i(136419),x=e.i(214867),S=e.i(62793);e.i(106969);var y=e.i(101304),b=e.i(861060),v=e.i(633309),j=e.i(743342);let O=(0,t.graphql)(`
    fragment CollectionTraitItemsCard on CollectionAttributeFlatValue {
      count
      traitType
      traitValue
      percent
      floorPrice {
        pricePerItem {
          ...TokenPrice
        }
      }
      topOffer {
        pricePerItem {
          ...TokenPrice
        }
      }
      previewItems(limit: 5) {
        id
        ...ItemAvatar
        ...itemUrl
      }
    }
  `,[b.ItemAvatarFragment,o.TokenPriceFragment,j.itemUrlFragment]);function w(e){let t,l,o,b,w,F,_,A,N,k,P,L,R,$,E,B,q,Q,V,D,M,H,U,z,G,Y,Z,K,J,W,X,ee=(0,r.c)(73),{item:et,context:el}=e,ei=(0,h.useTranslations)("CollectionTraitItemsCard"),er=(0,C.useContextSelector)(x.CollectionSettingsContext,I);if(ee[0]!==el?.collectionSlug||ee[1]!==et){L=Symbol.for("react.early_return_sentinel");e:{if(!(_=(0,n.readFragment)(O,et))){let e;ee[14]===Symbol.for("react.memo_cache_sentinel")?(e=(0,i.jsx)(v.GridItemSkeleton,{}),ee[14]=e):e=ee[14],L=e;break e}let e=_.previewItems?.slice(0,_.previewItems.length<4?1:4);w=_.count-(e?.length??0),F=1===_.count,b=s.Link,k=_.previewItems?.length===1?(0,j.itemUrl)(_.previewItems[0]):(0,S.getCollectionUrlByTrait)(el?.collectionSlug??"",{traitType:_.traitType,values:[_.traitValue]}),P="unstyled",o=c.Card,l=c.CardContent,t=c.CardContentMedia;let r=e?.length===1?"grid-cols-1":"grid-cols-2 grid-rows-2";ee[15]!==r?(A=(0,m.classNames)("grid",r,"gap-2"),ee[15]=r,ee[16]=A):A=ee[16],N=e?.map(t=>(0,i.jsx)(y.ItemAvatar,{item:t,size:1===e.length?400:200,style:{width:"100%",height:"100%"}},t.id))}ee[0]=el?.collectionSlug,ee[1]=et,ee[2]=t,ee[3]=l,ee[4]=o,ee[5]=b,ee[6]=w,ee[7]=F,ee[8]=_,ee[9]=A,ee[10]=N,ee[11]=k,ee[12]=P,ee[13]=L}else t=ee[2],l=ee[3],o=ee[4],b=ee[5],w=ee[6],F=ee[7],_=ee[8],A=ee[9],N=ee[10],k=ee[11],P=ee[12],L=ee[13];if(L!==Symbol.for("react.early_return_sentinel"))return L;ee[17]!==t||ee[18]!==A||ee[19]!==N?(R=(0,i.jsx)(t,{className:A,children:N}),ee[17]=t,ee[18]=A,ee[19]=N,ee[20]=R):R=ee[20],ee[21]!==w||ee[22]!==F?($=F||w>0?(0,i.jsx)(u.Chip,{className:"bg-bg-app",children:F?"Unique":`+${w.toString()}`}):null,ee[21]=w,ee[22]=F,ee[23]=$):$=ee[23],ee[24]!==$?(E=(0,i.jsx)(c.CardContentBadge,{active:!0,children:$}),ee[24]=$,ee[25]=E):E=ee[25],ee[26]!==l||ee[27]!==R||ee[28]!==E?(B=(0,i.jsxs)(l,{children:[R,E]}),ee[26]=l,ee[27]=R,ee[28]=E,ee[29]=B):B=ee[29],ee[30]!==_.traitType?(q=(0,i.jsx)("div",{children:(0,i.jsx)(p.TextLabel,{color:"text-secondary",children:_.traitType})}),ee[30]=_.traitType,ee[31]=q):q=ee[31],ee[32]!==_.traitValue?(Q=(0,i.jsx)(T.TextOverflowTooltip,{children:(0,i.jsx)(f.TextBody,{weight:"semibold",children:_.traitValue})}),ee[32]=_.traitValue,ee[33]=Q):Q=ee[33],ee[34]!==q||ee[35]!==Q?(V=(0,i.jsxs)(d.SpaceBetween,{className:"items-center gap-2",children:[q,Q]}),ee[34]=q,ee[35]=Q,ee[36]=V):V=ee[36],ee[37]!==_.percent||ee[38]!==er||ee[39]!==ei?(D=er&&(0,i.jsxs)(d.SpaceBetween,{className:"items-center",children:[(0,i.jsx)(p.TextLabel,{color:"text-secondary",children:ei("rarity")}),(0,i.jsx)(p.TextLabel,{children:(0,i.jsx)(g.NumberDisplay,{custom:{maximumSignificantDigits:2},display:"percent",value:_.percent})})]}),ee[37]=_.percent,ee[38]=er,ee[39]=ei,ee[40]=D):D=ee[40],ee[41]!==ei?(M=ei("floor"),ee[41]=ei,ee[42]=M):M=ee[42],ee[43]!==M?(H=(0,i.jsx)(p.TextLabel,{color:"text-secondary",children:M}),ee[43]=M,ee[44]=H):H=ee[44];let ea=_.floorPrice?.pricePerItem;ee[45]!==ea?(U=(0,i.jsx)(p.TextLabel,{children:(0,i.jsx)(a.TokenPrice,{price:ea})}),ee[45]=ea,ee[46]=U):U=ee[46],ee[47]!==H||ee[48]!==U?(z=(0,i.jsxs)(d.SpaceBetween,{className:"items-center",children:[H,U]}),ee[47]=H,ee[48]=U,ee[49]=z):z=ee[49],ee[50]!==ei?(G=ei("bestOffer"),ee[50]=ei,ee[51]=G):G=ee[51],ee[52]!==G?(Y=(0,i.jsx)(p.TextLabel,{color:"text-secondary",children:G}),ee[52]=G,ee[53]=Y):Y=ee[53];let eo=_.topOffer?.pricePerItem;return ee[54]!==eo?(Z=(0,i.jsx)(p.TextLabel,{children:(0,i.jsx)(a.TokenPrice,{price:eo})}),ee[54]=eo,ee[55]=Z):Z=ee[55],ee[56]!==Y||ee[57]!==Z?(K=(0,i.jsxs)(d.SpaceBetween,{className:"items-center",children:[Y,Z]}),ee[56]=Y,ee[57]=Z,ee[58]=K):K=ee[58],ee[59]!==V||ee[60]!==D||ee[61]!==z||ee[62]!==K?(J=(0,i.jsxs)(c.CardFooter,{className:"flex flex-col gap-1.5 p-3",children:[V,D,z,K]}),ee[59]=V,ee[60]=D,ee[61]=z,ee[62]=K,ee[63]=J):J=ee[63],ee[64]!==o||ee[65]!==J||ee[66]!==B?(W=(0,i.jsxs)(o,{children:[B,J]}),ee[64]=o,ee[65]=J,ee[66]=B,ee[67]=W):W=ee[67],ee[68]!==b||ee[69]!==W||ee[70]!==k||ee[71]!==P?(X=(0,i.jsx)(b,{href:k,variant:P,children:W}),ee[68]=b,ee[69]=W,ee[70]=k,ee[71]=P,ee[72]=X):X=ee[72],X}function I(e){return e.showRarity}e.s(["CollectionTraitItemsCard",()=>w,"CollectionTraitItemsCardFragment",0,O],74320);var F=e.i(873588),_=e.i(692632);e.s(["PAGE_SIZE",0,35],674090);let A=(0,_.range)(35).map(()=>void 0);function N(){let e,t=(0,r.c)(1);return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,i.jsx)(F.Grid,{context:void 0,itemKey:k,items:A,renderItem:w,size:"md"}),t[0]=e):e=t[0],e}function k(e,t){return String(t)}e.s(["CollectionTraitItemsGridSkeleton",()=>N],286655),e.s([],730691);var P=e.i(601056),L=e.i(519078),R=e.i(39771),$=e.i(747460),E=e.i(81303),B=e.i(28067),q=e.i(984335);e.i(899854);var Q=e.i(630945),V=e.i(9300),D=e.i(76225),M=e.i(310578);let H={trait:"z-[1] w-[120px] grow-[2]",traitCount:"w-[120px] grow",items:"w-[240px] grow-[2]",traitFloor:"w-[120px] grow justify-end",bestOffer:"w-[120px] grow justify-end"};function U(){let e,t,l,a,o,n,s,c,u,m,g,d,f,p=(0,r.c)(26),{size:T}=(0,q.useTable)();if(p[0]!==T){let{image:r}=(0,$.tableRowSizeVariants)({size:T});l=B.TableRow,p[9]===Symbol.for("react.memo_cache_sentinel")?(s=(0,i.jsx)(E.TableCell,{className:H.trait,children:(0,i.jsx)(M.SkeletonLine,{className:"w-1/2"})}),p[9]=s):s=p[9],p[10]===Symbol.for("react.memo_cache_sentinel")?(c=(0,i.jsx)(E.TableCell,{className:H.traitCount,children:(0,i.jsx)(M.SkeletonLine,{className:"w-1/2"})}),p[10]=c):c=p[10],t=E.TableCell,n=H.items,e=R.FlexCenter,a="gap-2",o=(0,_.range)(5).map(e=>(0,i.jsx)(M.SkeletonBlock,{className:r()},e)),p[0]=T,p[1]=e,p[2]=t,p[3]=l,p[4]=a,p[5]=o,p[6]=n,p[7]=s,p[8]=c}else e=p[1],t=p[2],l=p[3],a=p[4],o=p[5],n=p[6],s=p[7],c=p[8];return p[11]!==e||p[12]!==a||p[13]!==o?(u=(0,i.jsx)(e,{className:a,children:o}),p[11]=e,p[12]=a,p[13]=o,p[14]=u):u=p[14],p[15]!==t||p[16]!==n||p[17]!==u?(m=(0,i.jsx)(t,{className:n,children:u}),p[15]=t,p[16]=n,p[17]=u,p[18]=m):m=p[18],p[19]===Symbol.for("react.memo_cache_sentinel")?(g=(0,i.jsx)(E.TableCell,{className:H.traitFloor,children:(0,i.jsx)(M.SkeletonLine,{className:"w-1/2"})}),p[19]=g):g=p[19],p[20]===Symbol.for("react.memo_cache_sentinel")?(d=(0,i.jsx)(E.TableCell,{className:H.bestOffer,children:(0,i.jsx)(M.SkeletonLine,{className:"w-1/2"})}),p[20]=d):d=p[20],p[21]!==l||p[22]!==s||p[23]!==c||p[24]!==m?(f=(0,i.jsxs)(l,{children:[s,c,m,g,d]}),p[21]=l,p[22]=s,p[23]=c,p[24]=m,p[25]=f):f=p[25],f}e.s(["COLLECTION_TRAIT_ITEMS_TABLE_COLUMN_CLASSNAMES",0,H],192019);let z=(0,t.graphql)(`
    fragment CollectionTraitItemsTableRow on CollectionAttributeFlatValue {
      count
      traitType
      traitValue
      percent
      floorPrice {
        pricePerItem {
          ...TokenPrice
        }
      }
      topOffer {
        pricePerItem {
          ...TokenPrice
        }
      }
      previewItems(limit: 5) {
        id
        ...ItemAvatar
        ...ItemPreviewTooltip
        ...itemUrl
      }
    }
  `,[b.ItemAvatarFragment,o.TokenPriceFragment,V.ItemPreviewTooltipFragment,j.itemUrlFragment]);function G(e){let t,l,o,c,u,m,d=(0,r.c)(17),{item:h,context:b}=e,v=(0,n.readFragment)(z,h),O=(0,C.useContextSelector)(x.CollectionSettingsContext,Y),{size:w}=(0,q.useTable)();if(!v){let e;return d[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,i.jsx)(U,{}),d[0]=e):e=d[0],e}let{image:I}=(0,$.tableRowSizeVariants)({size:w}),F=$.TABLE_SIZES[w].image,_=v.count-(v.previewItems?.length??0),A=O?(0,i.jsx)(D.RarityChip,{count:v.count,percentage:v.percent}):(0,i.jsx)(f.TextBody,{children:v.count});d[1]!==A?(t=(0,i.jsx)(E.TableCell,{className:H.traitCount,children:A}),d[1]=A,d[2]=t):t=d[2];let N=E.TableCell,k=R.FlexCenter,V=v.previewItems?.map(e=>(0,i.jsx)(Q.ItemPreviewTooltip,{item:e,children:(0,i.jsx)(y.ItemAvatar,{className:I(),item:e,size:F})},e.id));d[3]!==_?(l=_>0&&(0,i.jsx)(p.TextLabel,{className:"ml-0.5",size:"xs",children:(0,i.jsx)(g.NumberDisplay,{display:"quantity",prefix:"+",value:_})}),d[3]=_,d[4]=l):l=d[4],d[5]!==k||d[6]!==V||d[7]!==l?(o=(0,i.jsxs)(k,{className:"gap-2",children:[V,l]}),d[5]=k,d[6]=V,d[7]=l,d[8]=o):o=d[8],d[9]!==N||d[10]!==H.items||d[11]!==o?(c=(0,i.jsx)(N,{className:H.items,children:o}),d[9]=N,d[10]=H.items,d[11]=o,d[12]=c):c=d[12];let M=v.floorPrice?.pricePerItem;d[13]!==M?(u=(0,i.jsx)(E.TableCell,{className:H.traitFloor,children:(0,i.jsx)(f.TextBody,{children:(0,i.jsx)(a.TokenPrice,{price:M})})}),d[13]=M,d[14]=u):u=d[14];let G=v.topOffer?.pricePerItem;return d[15]!==G?(m=(0,i.jsx)(E.TableCell,{className:H.bestOffer,children:(0,i.jsx)(f.TextBody,{children:(0,i.jsx)(a.TokenPrice,{price:G})})}),d[15]=G,d[16]=m):m=d[16],(0,i.jsx)(B.TableRow,{asChild:!0,interactive:!0,children:(0,i.jsxs)(s.Link,{href:v.previewItems?.length===1?(0,j.itemUrl)(v.previewItems[0]):(0,S.getCollectionUrlByTrait)(b?.collectionSlug??"",{traitType:v.traitType,values:[v.traitValue]}),variant:"unstyled",children:[(0,i.jsx)(E.TableCell,{className:H.trait,stickyLeft:0,children:(0,i.jsx)(P.Item,{variant:"unstyled",children:(0,i.jsxs)(L.ItemContent,{children:[(0,i.jsx)(T.TextOverflowTooltip,{children:(0,i.jsx)(L.ItemTitle,{weight:"regular",children:v.traitValue})}),(0,i.jsx)(T.TextOverflowTooltip,{children:(0,i.jsx)(p.TextLabel,{color:"text-secondary",children:v.traitType})})]})})}),t,c,u,m]})})}function Y(e){return e.showRarity}e.s(["CollectionTraitItemsTableRow",()=>G,"CollectionTraitItemsTableRowFragment",0,z],446322),e.s([],715400);let Z=(0,t.graphql)(`
    query CollectionTraitItemsListQuery(
      $cursor: String
      $sort: CollectionAttributeSort!
      $collectionSlug: String!
      $limit: Int!
      $filter: CollectionAttributeFilter
    ) {
      collectionAttributesBySlug(
        slug: $collectionSlug
        cursor: $cursor
        sort: $sort
        limit: $limit
        filter: $filter
      ) {
        items {
          traitType
          traitValue
          ...CollectionTraitItemsCard
          ...CollectionTraitItemsTableRow
        }
        nextPageCursor
      }
    }
  `,[O,z]);e.s(["CollectionTraitItemsListQuery",0,Z,"prefetchCollectionTraitItemsListQuery",0,(e,t)=>{(0,l.prefetch)(t,Z,{collectionSlug:e,filter:{attributes:[]},limit:35,sort:{by:"FLOOR_PRICE",direction:"DESC"}})}],688962)},222616,e=>{"use strict";var t=e.i(866313),l=e.i(885530),i=e.i(504849),r=e.i(333799);let a=(0,l.graphql)(`
  query CollectionAttributesQuery(
    $slug: String!
    $limit: Int!
    $cursor: String
  ) {
    collectionBySlug(slug: $slug) {
      __typename
      ... on Collection {
        id
        attributes(limit: $limit, cursor: $cursor) {
          items {
            traitType
            values {
              __typename
              value
            }
          }
          nextPageCursor
        }
      }
    }
  }
`);function o(e,l){let i,o,n,s,c=(0,t.c)(11);c[0]!==e?(i={slug:e,limit:100},c[0]=e,c[1]=i):i=c[1],c[2]!==l||c[3]!==i?(o={query:a,variables:i,context:l},c[2]=l,c[3]=i,c[4]=o):o=c[4];let[u]=(0,r.useQuery)(o),{data:m,error:g,fetching:d}=u;return c[5]!==m?(n=m?.collectionBySlug?.__typename==="Collection"?m.collectionBySlug.attributes.items:[],c[5]=m,c[6]=n):n=c[6],c[7]!==g||c[8]!==d||c[9]!==n?(s={items:n,error:g,fetching:d},c[7]=g,c[8]=d,c[9]=n,c[10]=s):s=c[10],s}function n(e,t){return(0,i.prefetch)(t,a,{slug:e,limit:100})}e.s(["prefetchCollectionAttributes",()=>n,"useCollectionAttributes",()=>o])},475003,81815,865493,180832,e=>{"use strict";var t=e.i(190627),l=e.i(885530),i=e.i(504849);let r={by:"TOTAL_QUANTITY",direction:"DESC"},a={attributes:[],ownedQuantityRange:null};e.s(["DEFAULT_FILTER",0,a,"DEFAULT_SORT",0,r,"MAX_ITEMS_FOR_TRAIT_FILTERS",0,3e4,"PAGE_SIZE",0,32],81815);var o=e.i(7683),n=e.i(866313),s=e.i(747998),c=e.i(646426),u=e.i(916511),m=e.i(47667),g=e.i(455480),d=e.i(491150),f=e.i(392024),p=e.i(254842),T=e.i(39771),h=e.i(838820),C=e.i(738480),x=e.i(986853),S=e.i(747460),y=e.i(81303),b=e.i(28067),v=e.i(950293),j=e.i(266341),O=e.i(984335),w=e.i(347352),I=e.i(522285);e.i(106969);var F=e.i(101304),_=e.i(861060);e.i(661049);var A=e.i(493473),N=e.i(190519);e.i(899854);var k=e.i(630945),P=e.i(9300),L=e.i(723767),R=e.i(543013);e.i(500598);var $=e.i(207225),E=e.i(310578),B=e.i(692632);let q={wallet:"z-[1] w-[180px] grow-[2]",owned:"w-[150px] grow",percent:"w-[110px] grow",items:"w-[360px] grow",value:"w-[110px] grow justify-end",portfolio:"w-[130px] grow justify-end"},Q={wallet:"z-[1] w-[180px] grow-[2]",owned:"w-[150px] grow",percent:"w-[110px] grow",items:"w-[240px] grow",value:"w-[110px] grow justify-end",portfolio:"w-[130px] grow justify-end"};function V(){let e,t,l,i,r,a,s,c,u,m,g,d,f,p,h,C,x,v=(0,n.c)(42),{size:j}=(0,O.useTable)();if(v[0]!==j){let n,g,d,{image:f}=(0,S.tableRowSizeVariants)({size:j});e="md"===j?Q:q,i=b.TableRow,v[11]===Symbol.for("react.memo_cache_sentinel")?(n=(0,o.jsx)(E.SkeletonLine,{className:"w-1/2"}),v[11]=n):n=v[11],v[12]!==e.wallet?(c=(0,o.jsx)(y.TableCell,{className:e.wallet,children:n}),v[12]=e.wallet,v[13]=c):c=v[13],v[14]===Symbol.for("react.memo_cache_sentinel")?(g=(0,o.jsx)(E.SkeletonLine,{className:"w-1/2"}),v[14]=g):g=v[14],v[15]!==e.owned?(u=(0,o.jsx)(y.TableCell,{className:e.owned,children:g}),v[15]=e.owned,v[16]=u):u=v[16],v[17]===Symbol.for("react.memo_cache_sentinel")?(d=(0,o.jsx)(E.SkeletonLine,{className:"w-1/2"}),v[17]=d):d=v[17],v[18]!==e.percent?(m=(0,o.jsx)(y.TableCell,{className:e.percent,children:d}),v[18]=e.percent,v[19]=m):m=v[19],l=y.TableCell,s=e.items,t=T.FlexCenter,r="gap-2",a=(0,B.range)(5).map(e=>(0,o.jsx)(E.SkeletonBlock,{className:f()},e)),v[0]=j,v[1]=e,v[2]=t,v[3]=l,v[4]=i,v[5]=r,v[6]=a,v[7]=s,v[8]=c,v[9]=u,v[10]=m}else e=v[1],t=v[2],l=v[3],i=v[4],r=v[5],a=v[6],s=v[7],c=v[8],u=v[9],m=v[10];return v[20]!==t||v[21]!==r||v[22]!==a?(g=(0,o.jsx)(t,{className:r,children:a}),v[20]=t,v[21]=r,v[22]=a,v[23]=g):g=v[23],v[24]!==l||v[25]!==s||v[26]!==g?(d=(0,o.jsx)(l,{className:s,children:g}),v[24]=l,v[25]=s,v[26]=g,v[27]=d):d=v[27],v[28]===Symbol.for("react.memo_cache_sentinel")?(f=(0,o.jsx)(E.SkeletonLine,{className:"w-1/2"}),v[28]=f):f=v[28],v[29]!==e.value?(p=(0,o.jsx)(y.TableCell,{className:e.value,children:f}),v[29]=e.value,v[30]=p):p=v[30],v[31]===Symbol.for("react.memo_cache_sentinel")?(h=(0,o.jsx)(E.SkeletonLine,{className:"w-1/2"}),v[31]=h):h=v[31],v[32]!==e.portfolio?(C=(0,o.jsx)(y.TableCell,{className:e.portfolio,children:h}),v[32]=e.portfolio,v[33]=C):C=v[33],v[34]!==i||v[35]!==C||v[36]!==c||v[37]!==u||v[38]!==m||v[39]!==d||v[40]!==p?(x=(0,o.jsxs)(i,{children:[c,u,m,d,p,C]}),v[34]=i,v[35]=C,v[36]=c,v[37]=u,v[38]=m,v[39]=d,v[40]=p,v[41]=x):x=v[41],x}e.s(["COLLECTION_HOLDERS_TABLE_COLUMN_CLASSNAMES",0,q,"COLLECTION_HOLDERS_TABLE_COMPACT_COLUMN_CLASSNAMES",0,Q],865493);let D=(0,l.graphql)(`
    fragment CollectionHoldersTableRow on CollectionTopOwner {
      quantity
      percent
      previewItems(limit: 5) {
        ...ItemLink
        ...ItemPreviewTooltip
        ...ItemAvatar
        tokenId
      }
      profile {
        displayName
        address
        portfolioSummary(approximate: true) {
          estimatedNftValue {
            usd
          }
        }
        ...profileUrl
        ...AccountLockup
        ...ProfilePreviewTooltip
      }
    }
  `,[u.profileUrlFragment,c.AccountLockupFragment,R.ProfilePreviewTooltipFragment,N.ItemLinkFragment,P.ItemPreviewTooltipFragment,_.ItemAvatarFragment]);function M(e){let l,i,r,a,c,_,N,P,R,E,B,M,U,z,G,Y,Z,K,J,W,X,ee,et,el,ei=(0,n.c)(71),{item:er,context:ea}=e,eo=(0,g.readFragment)(D,er),{size:en}=(0,O.useTable)(),es="md"===en?Q:q,ec=(0,$.useAddress)(),eu=(0,w.useLinkedAccounts)(),em=(0,I.useTranslations)("CollectionHoldersTableRow");if(!eo){let e;return ei[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,o.jsx)(V,{}),ei[0]=e):e=ei[0],e}let{profile:eg,quantity:ed,percent:ef,previewItems:ep}=eo,{image:eT}=(0,S.tableRowSizeVariants)({size:en}),eh=(0,g.readFragment)(t.TokenPriceFragment,ea?.topOfferPrice),eC=S.TABLE_SIZES[en].image,ex=ed/(ea?.topHoldersQuantity??0)*100,eS=eo.profile.portfolioSummary?.estimatedNftValue.usd,ey=eh?.usd&&eS?Math.min(eh.usd*ed/eS,1):null,eb=b.TableRow,ev=d.Link,ej=(0,u.getProfileUrl)(eg,{collectionSlugs:ea?.collectionSlug}),eO=ec??null;ei[1]!==eu?(l=eu?.map(H),ei[1]=eu,ei[2]=l):l=ei[2];let ew="2xl"===en?"lg":en;ei[3]===Symbol.for("react.memo_cache_sentinel")?(i=(0,o.jsx)(s.AccountLockupAvatar,{}),ei[3]=i):i=ei[3],ei[4]===Symbol.for("react.memo_cache_sentinel")?(r=(0,o.jsx)(s.AccountLockupTitle,{disableTextOverflowTooltip:!0}),ei[4]=r):r=ei[4];let eI=eg.displayName?(0,o.jsx)(v.TextBody,{color:"text-secondary",children:(0,h.formatAddress)(eg.address,{display:"compact"})}):null;ei[5]!==eI?(a=(0,o.jsxs)(f.LockupContent,{children:[r,eI]}),ei[5]=eI,ei[6]=a):a=ei[6],ei[7]!==eg||ei[8]!==a||ei[9]!==eO||ei[10]!==l||ei[11]!==ew?(c=(0,o.jsx)(p.Flex,{className:"w-full items-center gap-2",children:(0,o.jsxs)(s.AccountLockup,{account:eg,addressDisplay:"compact",className:"w-full gap-3",connectedAddress:eO,connectedAddresses:l,isTable:!0,size:ew,children:[i,a]})}),ei[7]=eg,ei[8]=a,ei[9]=eO,ei[10]=l,ei[11]=ew,ei[12]=c):c=ei[12],ei[13]!==eg||ei[14]!==c?(_=(0,o.jsx)(L.ProfilePreviewTooltip,{profile:eg,children:c}),ei[13]=eg,ei[14]=c,ei[15]=_):_=ei[15],ei[16]!==es.wallet||ei[17]!==_?(N=(0,o.jsx)(y.TableCell,{className:es.wallet,children:_}),ei[16]=es.wallet,ei[17]=_,ei[18]=N):N=ei[18];let eF=es.owned;ei[19]!==em?(P=em("itemsOwned"),ei[19]=em,ei[20]=P):P=ei[20],ei[21]!==ed?(R=(0,o.jsx)(p.Flex,{className:"px-[8px] py-[9px]",children:(0,o.jsx)(C.NumberDisplay,{display:"full",value:ed})}),ei[21]=ed,ei[22]=R):R=ei[22],ei[23]!==ex||ei[24]!==P||ei[25]!==R?(E=(0,o.jsx)(x.Progress,{"aria-label":P,value:ex,variant:"green",children:R}),ei[23]=ex,ei[24]=P,ei[25]=R,ei[26]=E):E=ei[26],ei[27]!==es.owned||ei[28]!==E?(B=(0,o.jsx)(y.TableCell,{className:eF,children:E}),ei[27]=es.owned,ei[28]=E,ei[29]=B):B=ei[29],ei[30]===Symbol.for("react.memo_cache_sentinel")?(M={maximumFractionDigits:2},ei[30]=M):M=ei[30],ei[31]!==ef?(U=(0,o.jsx)(C.NumberDisplay,{custom:M,display:"percent",value:ef}),ei[31]=ef,ei[32]=U):U=ei[32],ei[33]!==es.percent||ei[34]!==U?(z=(0,o.jsx)(y.TableCell,{className:es.percent,children:U}),ei[33]=es.percent,ei[34]=U,ei[35]=z):z=ei[35];let e_=y.TableCell,eA=es.items,eN=T.FlexCenter,ek=ep.map(e=>(0,o.jsx)(k.ItemPreviewTooltip,{item:e,children:(0,o.jsx)(A.ItemLink,{item:e,children:(0,o.jsx)(F.ItemAvatar,{className:eT(),item:e,size:eC})})},e.tokenId));ei[36]!==ep.length||ei[37]!==ed?(G=ed>ep.length&&(0,o.jsx)(j.TextLabel,{className:"ml-0.5",size:"xs",children:(0,o.jsx)(C.NumberDisplay,{display:"quantity",prefix:"+",value:ed-ep.length})}),ei[36]=ep.length,ei[37]=ed,ei[38]=G):G=ei[38],ei[39]!==eN||ei[40]!==ek||ei[41]!==G?(Y=(0,o.jsxs)(eN,{className:"gap-2",children:[ek,G]}),ei[39]=eN,ei[40]=ek,ei[41]=G,ei[42]=Y):Y=ei[42],ei[43]!==es.items||ei[44]!==e_||ei[45]!==Y?(Z=(0,o.jsx)(e_,{className:eA,children:Y}),ei[43]=es.items,ei[44]=e_,ei[45]=Y,ei[46]=Z):Z=ei[46];let eP=ea?.topOfferPrice;return ei[47]!==ed||ei[48]!==eP?(K=(0,o.jsx)(m.TokenPrice,{multiplier:ed,price:eP,symbolColor:"current"}),ei[47]=ed,ei[48]=eP,ei[49]=K):K=ei[49],ei[50]!==es.value||ei[51]!==K?(J=(0,o.jsx)(y.TableCell,{className:es.value,children:K}),ei[50]=es.value,ei[51]=K,ei[52]=J):J=ei[52],ei[53]===Symbol.for("react.memo_cache_sentinel")?(W={maximumFractionDigits:2},ei[53]=W):W=ei[53],ei[54]!==ey?(X=(0,o.jsx)(C.NumberDisplay,{custom:W,display:"percent",value:ey}),ei[54]=ey,ei[55]=X):X=ei[55],ei[56]!==es.portfolio||ei[57]!==X?(ee=(0,o.jsx)(y.TableCell,{className:es.portfolio,children:X}),ei[56]=es.portfolio,ei[57]=X,ei[58]=ee):ee=ei[58],ei[59]!==ev||ei[60]!==N||ei[61]!==B||ei[62]!==z||ei[63]!==Z||ei[64]!==ej||ei[65]!==J||ei[66]!==ee?(et=(0,o.jsxs)(ev,{href:ej,variant:"unstyled",children:[N,B,z,Z,J,ee]}),ei[59]=ev,ei[60]=N,ei[61]=B,ei[62]=z,ei[63]=Z,ei[64]=ej,ei[65]=J,ei[66]=ee,ei[67]=et):et=ei[67],ei[68]!==eb||ei[69]!==et?(el=(0,o.jsx)(eb,{asChild:!0,interactive:!0,children:et}),ei[68]=eb,ei[69]=et,ei[70]=el):el=ei[70],el}function H(e){return e.address}e.s(["CollectionHoldersTableRow",()=>M,"CollectionHoldersTableRowFragment",0,D],180832);let U=(0,l.graphql)(`
    query CollectionTopOfferQuery($collectionSlug: String!) {
      collectionBySlug(slug: $collectionSlug) {
        __typename
        ... on Collection {
          topOffer {
            pricePerItem {
              ...TokenPrice
            }
          }
        }
      }
    }
  `,[t.TokenPriceFragment]),z=(0,l.graphql)(`
    query CollectionHoldersQuery(
      $collectionSlug: String!
      $limit: Int!
      $cursor: String
      $filter: CollectionHoldersFilter
      $sort: CollectionHoldersSort!
    ) {
      collectionHolders(
        slug: $collectionSlug
        limit: $limit
        cursor: $cursor
        filter: $filter
        sort: $sort
      ) {
        items {
          quantity
          profile {
            address
          }
          ...CollectionHoldersTableRow
        }
        nextPageCursor
      }
    }
  `,[D]);e.s(["CollectionHoldersQuery",0,z,"CollectionTopOfferQuery",0,U,"prefetchCollectionHoldersQuery",0,(e,t)=>{(0,i.prefetch)(t,z,{collectionSlug:e,limit:1,sort:r})},"prefetchCollectionHoldersQueryPage",0,(e,t)=>{(0,i.prefetch)(t,z,{collectionSlug:e,filter:a,limit:32,sort:r})},"prefetchCollectionTopOfferQuery",0,(e,t)=>{(0,i.prefetch)(t,U,{collectionSlug:e})}],475003)},71932,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(700625);let r=(0,t.graphql)(`
    query CollectionOffersActionBarQuery($collectionSlug: String!) {
      collectionBySlug(slug: $collectionSlug) {
        __typename
        ... on Collection {
          id
          ...CollectionItemsMakeOfferButton
        }
      }
    }
  `,[i.CollectionItemsMakeOfferButtonFragment]);e.s(["CollectionOffersActionBarQuery",0,r,"prefetchCollectionOffersActionBarQuery",0,(e,t)=>{(0,l.prefetch)(t,r,{collectionSlug:e})}])},637293,e=>{"use strict";e.s(["COLLECTION_OFFERS_SORT",0,{direction:"DESC",by:"OFFER_PRICE"},"COLLECTION_OFFERS_TABLE_PAGE_SIZE",0,50])},512813,66505,508205,1069,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(637293),r=e.i(641749),a=e.i(190627),o=e.i(646426);let n=(0,t.graphql)(`
    fragment OfferAggregateBidders on OfferAggregate {
      offerPrice {
        ...TokenPrice
      }
      totalValue {
        ...TokenPrice
      }
      totalOffers
      bidders {
        quantity
        imageUrl
        address
        ...AccountLockup
      }
    }
  `,[a.TokenPriceFragment,o.AccountLockupFragment]);e.s(["OfferAggregateBiddersFragment",0,n],66505);let s=(0,t.graphql)(`
    fragment OfferAggregateTableRow on OfferAggregate {
      offerPrice {
        token {
          unit
          contractAddress
        }
        ...TokenPrice
      }
      totalValue {
        token {
          unit
        }
        ...TokenPrice
      }
      totalOffers
      bidders {
        quantity
      }
      ...OfferAggregateBidders
    }
  `,[a.TokenPriceFragment,n]),c=(0,t.graphql)(`
    fragment OfferAggregateTableRow_collection on Collection {
      ...useCollectionOffers
    }
  `,[r.useCollectionOffersFragment]);e.s(["OfferAggregateTableRowFragment",0,s,"OfferAggregateTableRow_collectionFragment",0,c],508205);let u=(0,t.graphql)(`
    fragment OfferAggregateTable on OfferAggregate {
      id
      ...OfferAggregateTableRow
    }
  `,[s]),m=(0,t.graphql)(`
    fragment OfferAggregateTable_collection on Collection {
      ...useCollectionOffers
      ...OfferAggregateTableRow_collection
    }
  `,[r.useCollectionOffersFragment,c]);e.s(["OfferAggregateTableFragment",0,u,"OfferAggregateTable_collectionFragment",0,m],1069);let g=(0,t.graphql)(`
    query CollectionOffersTableQuery(
      $collectionSlug: String!
      $filter: CollectionOffersFilter
      $sort: CollectionOfferAggregateSort!
      $cursor: String
      $limit: Int!
    ) {
      collectionOfferAggregates(
        collectionSlug: $collectionSlug
        filter: $filter
        sort: $sort
        cursor: $cursor
        limit: $limit
      ) {
        items {
          id
          totalOffers
          offerPrice {
            token {
              unit
            }
          }
          ...OfferAggregateTable
        }
        nextPageCursor
      }
      collectionBySlug(slug: $collectionSlug) {
        ...OfferAggregateTable_collection
      }
    }
  `,[m,u]);e.s(["CollectionOffersTableQuery",0,g,"prefetchCollectionOffersTableQuery",0,(e,t)=>{(0,l.prefetch)(t,g,{collectionSlug:e,filter:{},limit:i.COLLECTION_OFFERS_TABLE_PAGE_SIZE,sort:i.COLLECTION_OFFERS_SORT})}],512813)},783277,e=>{"use strict";var t=e.i(190627);let l=(0,e.i(885530).graphql)(`
    fragment OfferAggregateTotals on OfferAggregateTotal {
      totalOffers
      totalValue {
        ...TokenPrice
        token {
          unit
        }
      }
    }
  `,[t.TokenPriceFragment]);e.s(["OfferAggregateTotalsFragment",0,l])},565583,e=>{"use strict";var t=e.i(190627),l=e.i(885530),i=e.i(504849),r=e.i(333799),a=e.i(670383),o=e.i(783277),n=e.i(866313);e.i(402819);var s=e.i(916744);let c=(0,l.graphql)(`
    subscription useCollectionOfferTotalsSubscription(
      $collectionSlug: String!
    ) {
      collectionOfferAggregatesTotal(collectionSlug: $collectionSlug) {
        totalOffers
        totalValue {
          ...TokenPrice
          token {
            unit
          }
        }
        maxValueInTick {
          token {
            unit
          }
        }
        ...OfferAggregateTotals
      }
    }
  `,[t.TokenPriceFragment,o.OfferAggregateTotalsFragment]),u=(0,l.graphql)(`
    query useCollectionOfferTotalsQuery(
      $collectionSlug: String!
      $filter: CollectionOffersFilter
    ) {
      collectionOfferAggregatesTotal(
        collectionSlug: $collectionSlug
        filter: $filter
      ) {
        totalOffers
        totalValue {
          ...TokenPrice
          token {
            unit
          }
        }
        maxValueInTick {
          token {
            unit
          }
        }
        ...OfferAggregateTotals
      }
    }
  `,[t.TokenPriceFragment,o.OfferAggregateTotalsFragment]);function m({collectionSlug:e,filter:t}){let[{data:l}]=(0,r.useQuery)({query:u,variables:{collectionSlug:e,filter:t}}),[i,o]=(0,a.useState)();return!function(e){let t,l,i=(0,n.c)(4),{variables:r,setCollectionOfferTotal:a}=e;i[0]!==r?(t={query:c,variables:r},i[0]=r,i[1]=t):t=i[1],i[2]!==a?(l=e=>{a(e.collectionOfferAggregatesTotal)},i[2]=a,i[3]=l):l=i[3],(0,s.useSubscription)(t,l)}({variables:{collectionSlug:e},setCollectionOfferTotal:e=>{o(l?.collectionOfferAggregatesTotal?{...l.collectionOfferAggregatesTotal,...e}:void 0)}}),i??l?.collectionOfferAggregatesTotal}e.s(["prefetchUseCollectionOfferTotalsQuery",0,(e,t)=>{(0,i.prefetch)(t,u,{collectionSlug:e,filter:{}})},"useCollectionOfferTotals",()=>m],565583)},803565,e=>{"use strict";var t=e.i(190627);let l=(0,e.i(885530).graphql)(`
    fragment TraitOffersFilterTableRow on TraitOfferAggregateTotal {
      traitType
      traitValue
      traitPercent
      bestOfferPrice {
        token {
          unit
        }
        ...TokenPrice
      }
      totalValue {
        token {
          unit
        }
        ...TokenPrice
      }
    }
  `,[t.TokenPriceFragment]);e.s(["TraitOffersFilterTableRowFragment",0,l])},699682,e=>{"use strict";var t=e.i(866313),l=e.i(885530),i=e.i(504849),r=e.i(333799),a=e.i(670383),o=e.i(803565),n=e.i(783277),s=e.i(637293),c=e.i(657980);e.i(402819);var u=e.i(916744);let m=(0,l.graphql)(`
    subscription useTraitOfferAggregatesTotalSubscription(
      $collectionSlug: String!
    ) {
      traitOfferAggregatesTotal(collectionSlug: $collectionSlug) {
        id
        traitType
        traitValue
        bestOfferPrice {
          usd
        }
        maxValueInTick {
          usd
        }
        totalOffers
        ...OfferAggregateTotals
        ...TraitOffersFilterTableRow
      }
    }
  `,[n.OfferAggregateTotalsFragment,o.TraitOffersFilterTableRowFragment]);class g extends c.Paginator{getValues(e){return[e.bestOfferPrice.usd,e.id]}}let d=new g,f=(0,l.graphql)(`
    query useTraitOfferAggregatesTotalQuery(
      $collectionSlug: String!
      $filter: TraitOffersFilter
    ) {
      traitOfferAggregatesTotal(
        collectionSlug: $collectionSlug
        filter: $filter
      ) {
        id
        traitType
        traitValue
        bestOfferPrice {
          usd
        }
        maxValueInTick {
          usd
        }
        totalOffers
        ...OfferAggregateTotals
        ...TraitOffersFilterTableRow
      }
    }
  `,[n.OfferAggregateTotalsFragment,o.TraitOffersFilterTableRowFragment]);function p(e){let l,i,o,n,c,g,p=(0,t.c)(15),{collectionSlug:T,filter:h}=e;p[0]!==T||p[1]!==h?(l={query:f,variables:{collectionSlug:T,filter:h}},p[0]=T,p[1]=h,p[2]=l):l=p[2];let[C]=(0,r.useQuery)(l),{data:x}=C;p[3]!==h?(i=JSON.stringify(h),p[3]=h,p[4]=i):i=p[4];let S=i,y=(0,a.useRef)(S);p[5]!==x?.traitOfferAggregatesTotal?(o=x?.traitOfferAggregatesTotal??[],p[5]=x?.traitOfferAggregatesTotal,p[6]=o):o=p[6];let[b,v]=(0,a.useState)(o);p[7]!==x?.traitOfferAggregatesTotal||p[8]!==S?(n=()=>{y.current!==S&&(y.current=S,v(x?.traitOfferAggregatesTotal??[]))},p[7]=x?.traitOfferAggregatesTotal,p[8]=S,p[9]=n):n=p[9];let j=x?.traitOfferAggregatesTotal;return p[10]!==S||p[11]!==j?(c=[S,j],p[10]=S,p[11]=j,p[12]=c):c=p[12],(0,a.useEffect)(n,c),p[13]!==T?(g={variables:{collectionSlug:T},setItems:v},p[13]=T,p[14]=g):g=p[14],!function(e){let l,i,r=(0,t.c)(4),{variables:a,setItems:o}=e;r[0]!==a?(l={query:m,variables:a},r[0]=a,r[1]=l):l=r[1],r[2]!==o?(i=e=>{let t=e.traitOfferAggregatesTotal;o(e=>e.find(e=>e.id===t.id)&&0===t.totalOffers?d.remove(t,e,s.COLLECTION_OFFERS_SORT):d.insertInOrder(t,e,s.COLLECTION_OFFERS_SORT,{insertIntoLastPlace:!0}))},r[2]=o,r[3]=i):i=r[3],(0,u.useSubscription)(l,i)}(g),b}e.s(["prefetchUseTraitOfferAggregatesTotal",0,(e,t)=>{(0,i.prefetch)(t,f,{collectionSlug:e})},"useTraitOfferAggregatesTotal",()=>p],699682)},131511,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(437153),r=e.i(165102),a=e.i(310578),o=e.i(951222);function n(e){let r,n,s,c,u=(0,l.c)(15),{headerView:m,fullContent:g,compactContent:d,isCollectionBanner:f}=e,p=void 0!==f&&f;u[0]!==d||u[1]!==m?(r="full"===m&&(0,t.jsx)("div",{className:"invisible fixed top-sm-top-nav z-20 lg:visible lg:top-lg-top-nav lg:right-scroll-bar-size lg:left-side-nav",children:d}),u[0]=d,u[1]=m,u[2]=r):r=u[2];let T="compact"===m;u[3]!==m?(n="full"===m&&(0,t.jsx)(a.SkeletonBlock,{className:"absolute inset-0 size-full bg-bg-additional-1"}),u[3]=m,u[4]=n):n=u[4];let h="full"===m&&"bg-bg-app";u[5]!==h?(s=(0,i.classNames)(h),u[5]=h,u[6]=s):s=u[6];let C="full"===m?g:d;return u[7]!==m||u[8]!==p||u[9]!==r||u[10]!==T||u[11]!==n||u[12]!==s||u[13]!==C?(c=(0,t.jsx)("div",{className:"bg-bg-app",children:(0,t.jsx)(o.HeroHeaderLayout,{backgroundChildren:r,headerView:m,headerViewScrollLocked:T,isCollectionBanner:p,media:n,mediaClassName:s,children:C})}),u[7]=m,u[8]=p,u[9]=r,u[10]=T,u[11]=n,u[12]=s,u[13]=C,u[14]=c):c=u[14],c}function s(e){let i,a,o,s=(0,l.c)(7);return s[0]!==e?(i=(0,t.jsx)(r.Media,{greaterThanOrEqual:"lg",children:(0,t.jsx)(n,{...e})}),s[0]=e,s[1]=i):i=s[1],s[2]!==e?(a=(0,t.jsx)(r.Media,{lessThan:"lg",children:(0,t.jsx)(n,{...e,headerView:"full"})}),s[2]=e,s[3]=a):a=s[3],s[4]!==i||s[5]!==a?(o=(0,t.jsxs)(t.Fragment,{children:[i,a]}),s[4]=i,s[5]=a,s[6]=o):o=s[6],o}e.s(["HeroHeaderSkeleton",()=>s])},526298,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(953756),r=e.i(965523),a=e.i(165102),o=e.i(999258),n=e.i(154971);function s(e){let s,c,u,m,g,d,f,p,T,h,C,x=(0,l.c)(23),{info:S,stats:y,description:b,metadataChips:v,showMetadataChipsOnLarge:j}=e;if(x[0]===Symbol.for("react.memo_cache_sentinel")){let{container:e,content:t}=(0,n.headerViewFullVariants)();s=i.Container,u=e(),c=t(),x[0]=s,x[1]=c,x[2]=u}else s=x[0],c=x[1],u=x[2];let O=void 0===j||j?v:null;return x[3]!==b||x[4]!==O?(m=(0,t.jsxs)(a.Media,{greaterThanOrEqual:"lg",children:[O,b]}),x[3]=b,x[4]=O,x[5]=m):m=x[5],x[6]!==S||x[7]!==m?(g=(0,t.jsxs)(r.FlexColumn,{className:"min-w-0",children:[S,m]}),x[6]=S,x[7]=m,x[8]=g):g=x[8],x[9]!==v?(d=(0,t.jsx)(a.Media,{lessThan:"md",children:v}),x[9]=v,x[10]=d):d=x[10],x[11]===Symbol.for("react.memo_cache_sentinel")?(f=(0,t.jsx)(a.Media,{lessThan:"lg",children:(0,t.jsx)(o.Separator,{className:"my-4"})}),x[11]=f):f=x[11],x[12]!==y?(p=(0,t.jsx)(a.Media,{lessThan:"lg",children:y}),x[12]=y,x[13]=p):p=x[13],x[14]!==y?(T=(0,t.jsx)(a.Media,{greaterThanOrEqual:"lg",children:(0,t.jsx)("div",{className:"mt-6 gap-3",children:y})}),x[14]=y,x[15]=T):T=x[15],x[16]!==T||x[17]!==d||x[18]!==p?(h=(0,t.jsxs)(r.FlexColumn,{className:"mt-4 min-w-0 md:mt-0",children:[d,f,p,T]}),x[16]=T,x[17]=d,x[18]=p,x[19]=h):h=x[19],x[20]!==h||x[21]!==g?(C=(0,t.jsx)(s,{className:u,children:(0,t.jsxs)("div",{className:c,children:[g,h]})}),x[20]=h,x[21]=g,x[22]=C):C=x[22],C}e.s(["HeroHeaderFullLayoutSkeleton",()=>s])},990336,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(165102),r=e.i(310578);function a(e){let a,o=(0,l.c)(2),{variant:n}=e,s=void 0===n?"on-background":n;return o[0]!==s?(a=(0,t.jsx)(i.Media,{greaterThanOrEqual:"lg",children:(0,t.jsx)(r.SkeletonBlock,{className:"aspect-square h-8 rounded",variant:s})}),o[0]=s,o[1]=a):a=o[1],a}e.s(["HeroHeaderViewToggleSkeleton",()=>a])},745837,e=>{"use strict";var t=e.i(190627),l=e.i(885530),i=e.i(905550),r=e.i(606136),a=e.i(230458),o=e.i(542840);e.i(661049);var n=e.i(190519),s=e.i(846428),c=e.i(630208);let u=(0,l.graphql)(`
    fragment FeaturedItemSlide on Item {
      name
      id
      isFungible
      ...ItemCardMedia
      ...ItemCardNameFragment
      ...RarityBadgeFragment
      ...QuantityBadge
      ...ItemLink
      ...useBuyItems
      lastSale {
        ...TokenPrice
      }
      bestListing {
        pricePerItem {
          ...TokenPrice
        }
        endTime
      }
      bestOffer {
        pricePerItem {
          ...TokenPrice
        }
      }
      enforcement {
        isCompromised
      }
      ...EnforcementBadge
    }
  `,[o.RarityBadgeFragment,t.TokenPriceFragment,i.ItemCardMediaFragment,r.ItemCardNameFragment,n.ItemLinkFragment,a.QuantityBadgeFragment,s.useBuyItemsFragment,c.EnforcementBadgeFragment]);e.s(["FeaturedItemSlideFragment",0,u])},214740,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(745837);let r=(0,t.graphql)(`
    query CollectionBestDealsQuery($collectionSlug: String!) {
      collectionBestDeals(collectionSlug: $collectionSlug) {
        ... on Item {
          id
          ...FeaturedItemSlide
        }
      }
    }
  `,[i.FeaturedItemSlideFragment]);e.s(["CollectionBestDealsQuery",0,r,"prefetchCollectionBestDealsQuery",0,(e,t)=>{(0,l.prefetch)(t,r,{collectionSlug:e})}])},330184,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(745837);let r=(0,t.graphql)(`
    query CollectionRarestItemsQuery($collectionSlug: String!) {
      collectionRarestListedItems(collectionSlug: $collectionSlug) {
        ... on Item {
          id
          ...FeaturedItemSlide
        }
      }
    }
  `,[i.FeaturedItemSlideFragment]);e.s(["CollectionRarestItemsQuery",0,r,"prefetchCollectionRarestItemsQuery",0,(e,t)=>{(0,l.prefetch)(t,r,{collectionSlug:e})}])},727670,e=>{"use strict";var t=e.i(190627),l=e.i(885530),i=e.i(905550),r=e.i(606136),a=e.i(542840);e.i(661049);var o=e.i(190519);let n=(0,l.graphql)(`
    fragment ActivityItemCard on Activity {
      eventTime
      item {
        id
        isFungible
        ...ItemCardMedia
        ...ItemCardNameFragment
        ...ItemLink
        ...RarityBadgeFragment
      }
      price {
        ...TokenPrice
      }
    }
  `,[i.ItemCardMediaFragment,r.ItemCardNameFragment,o.ItemLinkFragment,a.RarityBadgeFragment,t.TokenPriceFragment]);e.s(["ActivityItemCardFragment",0,n])},375165,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(727670);let r=(0,t.graphql)(`
    query CollectionRecentSalesQuery($collectionSlug: String!) {
      collectionActivity(
        filter: { activityTypes: [SALE] }
        collectionSlug: $collectionSlug
        limit: 10
      ) {
        items {
          id
          item {
            __typename
          }
          ...ActivityItemCard
        }
      }
    }
  `,[i.ActivityItemCardFragment]);e.s(["CollectionRecentSalesQuery",0,r,"prefetchCollectionRecentSalesQuery",0,(e,t)=>{(0,l.prefetch)(t,r,{collectionSlug:e})}])},89611,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(727670);let r=(0,t.graphql)(`
    query CollectionTopSalesQuery($collectionSlug: String!) {
      topCollectionSales(collectionSlug: $collectionSlug) {
        id
        item {
          __typename
        }
        ...ActivityItemCard
      }
    }
  `,[i.ActivityItemCardFragment]);e.s(["CollectionTopSalesQuery",0,r,"prefetchCollectionTopSalesQuery",0,(e,t)=>{(0,l.prefetch)(t,r,{collectionSlug:e})}])},491942,e=>{"use strict";var t=e.i(7683),l=e.i(885530),i=e.i(333799),r=e.i(472821),a=e.i(224222),o=e.i(670383),n=e.i(145315),s=e.i(550849),c=e.i(885267),u=e.i(262545),m=e.i(866313),g=e.i(455480),d=e.i(459527),f=e.i(971823),p=e.i(553581),T=e.i(338409),h=e.i(967593),C=e.i(417268),x=e.i(522285),S=e.i(29881),y=e.i(214740),b=e.i(330184),v=e.i(375165),j=e.i(89611),O=e.i(475003),w=e.i(521096),I=e.i(246043),F=e.i(357486),_=e.i(688962),A=e.i(393788),N=e.i(71932),k=e.i(512813),P=e.i(142558),L=e.i(565583),R=e.i(699682),$=e.i(222616),E=e.i(649386);e.i(500598);var B=e.i(207225),q=e.i(806056);e.i(764587);var Q=e.i(804084),V=e.i(354667),D=e.i(162061),M=e.i(62793);let H=/\/(?<headerView>full|compact)(?![\w-])/,U=e=>{let t=(0,g.readFragment)(D.useCollectionTabsFragment,e),l=(0,M.getCollectionUrlBySlug)(t?.slug??""),i=(0,Q.useDropStore)(t=>e?t.status:null),r=i===V.DropStatus.MINTING||i===V.DropStatus.MINTING_SOON,a=(0,x.useTranslations)("useCollectionTabs"),o=t?.flags.isOffersEnabled,n=!!t?.overview?.modules?.length||!!(t?.drop&&"SEADROP_V2_ERC1155_SELF_MINT"!==t.drop.type),s=!!t?.currencies.length,c=t?.previewItems?.length&&!t.previewItems[0].isFungible&&t.previewItems[0].rarity&&t.stats.uniqueItemCount&&t.stats.uniqueItemCount>=50,u=t?.flags.supportsAttributesBySlug,m=(0,q.useIsCollectionAnalyticsTabEnabled)(),d=[c&&{id:"explore",title:a("explore"),href:`${l}/explore`},{id:"items",title:a("items"),href:l},s&&{id:"tokens",title:a("tokens"),href:`${l}/tokens`},o&&{id:"offers",title:a("offers"),href:`${l}/offers`},{id:"holders",title:a("holders"),href:`${l}/holders`},u&&{id:"traits",title:a("traits"),href:`${l}/traits`},{id:"activity",title:a("activity"),href:`${l}/activity`},m&&{id:"analytics",title:a("analytics"),href:`${l}/analytics`}].flatMap(e=>e?[e]:[]);if(n){let e={id:"overview",title:a(r?"mint":"about"),href:`${l}/overview`};r?d.unshift(e):d.push(e)}return d},z=e=>{let t,l=(0,m.c)(3),i=(0,f.usePathname)();return l[0]!==e||l[1]!==i?(t=t=>{var l,r,a;let o;return l=e,r=i,a=t,o=r.replace(H,""),a.href===(0,M.getCollectionUrlBySlug)(l)?!!o.startsWith(`${(0,M.getCollectionUrlBySlug)(l)}/items`)||a.href.split("?")[0]===o:o.startsWith(a.href.split("?")[0])},l[0]=e,l[1]=i,l[2]=t):t=l[2],t};function G(e){let l,i,r,a,o=(0,m.c)(14),{collection:n}=e;o[0]!==n?(l=(0,g.readFragment)(c.CollectionNavigationFragment,n),o[0]=n,o[1]=l):l=o[1];let s=l,u=z(s.slug),d=U(s),T=(0,A.useNavigationTabMenuClassNames)(),h=(0,A.useNavigationContainerClassNames)(),x=(0,f.usePathname)();if(x.includes("collection")&&!x.includes("preview")&&!d.some(e=>u(e))){let e;return o[2]===Symbol.for("react.memo_cache_sentinel")?(e=(0,C.notFound)(),o[2]=e):e=o[2],e}if(o[3]!==s.slug||o[4]!==d){let e;o[6]!==s.slug?(e=e=>(0,t.jsx)(Y,{collectionSlug:s.slug,tab:e},e.href),o[6]=s.slug,o[7]=e):e=o[7],i=d.map(e),o[3]=s.slug,o[4]=d,o[5]=i}else i=o[5];return o[8]!==T||o[9]!==i?(r=(0,t.jsx)(p.TabMenu,{"aria-label":"Collection",className:T,children:i}),o[8]=T,o[9]=i,o[10]=r):r=o[10],o[11]!==h||o[12]!==r?(a=(0,t.jsx)("div",{className:h,children:r}),o[11]=h,o[12]=r,o[13]=a):a=o[13],a}function Y(e){let l,i,r,a,o,n,s=(0,m.c)(25),{tab:c,collectionSlug:u}=e,g=z(u);s[0]!==g||s[1]!==c?(l=g({...c}),s[0]=g,s[1]=c,s[2]=l):l=s[2];let f=l,A=(0,x.useTranslations)("CollectionNavigation"),q=(0,C.useSearchParams)(),Q=(0,d.useClient)(),V=(0,B.useAddress)(),D=c.href,M=q.get(E.QUERY_PARAM_KEYS.traits);M&&(D=`${c.href}?${E.QUERY_PARAM_KEYS.traits}=${encodeURIComponent(M)}`),s[3]!==f||s[4]!==V||s[5]!==Q||s[6]!==u||s[7]!==c?(i=()=>{var e,t,l,i;f||c.disabled||(e=c,t=u,l=Q,i=V,"explore"===e.id?((0,v.prefetchCollectionRecentSalesQuery)(t,l),(0,j.prefetchCollectionTopSalesQuery)(t,l),(0,b.prefetchCollectionRarestItemsQuery)(t,l),(0,y.prefetchCollectionBestDealsQuery)(t,l)):"items"===e.id?((0,F.prefetchCollectionItemsListQuery)(t,l),(0,w.prefetchCollectionItemsActionBarQuery)(t,l),(0,I.prefetchCollectionItemsCountQuery)(t,l)):"tokens"===e.id||("offers"===e.id?((0,R.prefetchUseTraitOfferAggregatesTotal)(t,l),(0,L.prefetchUseCollectionOfferTotalsQuery)(t,l),(0,k.prefetchCollectionOffersTableQuery)(t,l),(0,N.prefetchCollectionOffersActionBarQuery)(t,l)):"holders"===e.id?((0,O.prefetchCollectionHoldersQueryPage)(t,l),(0,O.prefetchCollectionTopOfferQuery)(t,l),(0,O.prefetchCollectionHoldersQuery)(t,l)):"traits"===e.id?((0,$.prefetchCollectionAttributes)(t,l),(0,_.prefetchCollectionTraitItemsListQuery)(t,l)):"activity"===e.id?(0,P.prefetchUseCollectionActivityQuery)(t,l):"overview"===e.id&&i?.length&&(0,S.prefetchDropEligibilityQuery)(t,l,i)))},s[3]=f,s[4]=V,s[5]=Q,s[6]=u,s[7]=c,s[8]=i):i=s[8];let H=i;s[9]!==A?(r=A("comingSoon"),s[9]=A,s[10]=r):r=s[10];let U=!c.disabled,G=f?"page":void 0;return s[11]!==c.title?(a=(0,t.jsx)(T.TabMenuItemTitle,{children:c.title}),s[11]=c.title,s[12]=a):a=s[12],s[13]!==f||s[14]!==D||s[15]!==H||s[16]!==G||s[17]!==a||s[18]!==c.disabled?(o=(0,t.jsx)("div",{children:(0,t.jsx)(p.TabMenuItem,{active:f,"aria-current":G,disabled:c.disabled,href:D,onPointerOver:H,children:a})}),s[13]=f,s[14]=D,s[15]=H,s[16]=G,s[17]=a,s[18]=c.disabled,s[19]=o):o=s[19],s[20]!==r||s[21]!==U||s[22]!==o||s[23]!==c.title?(n=(0,t.jsx)(h.Tooltip,{content:r,disabled:U,children:o},c.title),s[20]=r,s[21]=U,s[22]=o,s[23]=c.title,s[24]=n):n=s[24],n}function Z(){let e,l,i,r=(0,m.c)(8),a=U(void 0),o=(0,A.useNavigationTabMenuClassNames)(),n=(0,A.useNavigationContainerClassNames)();return r[0]!==a?(e=a.map(K),r[0]=a,r[1]=e):e=r[1],r[2]!==o||r[3]!==e?(l=(0,t.jsx)(p.TabMenu,{"aria-label":"Collection",className:o,children:e}),r[2]=o,r[3]=e,r[4]=l):l=r[4],r[5]!==n||r[6]!==l?(i=(0,t.jsx)("div",{className:n,children:l}),r[5]=n,r[6]=l,r[7]=i):i=r[7],i}function K(e){return(0,t.jsx)(J,{tab:e},e.href)}function J(e){let l,i,r,a,o=(0,m.c)(12),{tab:n}=e,s=(0,x.useTranslations)("CollectionNavigation");o[0]!==s?(l=s("comingSoon"),o[0]=s,o[1]=l):l=o[1];let c=!n.disabled;return o[2]!==n.title?(i=(0,t.jsx)(T.TabMenuItemTitle,{children:n.title}),o[2]=n.title,o[3]=i):i=o[3],o[4]!==i||o[5]!==n.disabled?(r=(0,t.jsx)("div",{children:(0,t.jsx)(p.TabMenuItem,{disabled:n.disabled,children:i})}),o[4]=i,o[5]=n.disabled,o[6]=r):r=o[6],o[7]!==l||o[8]!==c||o[9]!==r||o[10]!==n.title?(a=(0,t.jsx)(h.Tooltip,{content:l,disabled:c,children:r},n.title),o[7]=l,o[8]=c,o[9]=r,o[10]=n.title,o[11]=a):a=o[11],a}var W=e.i(549663),X=e.i(131511),ee=e.i(938655),et=e.i(953756),el=e.i(965523),ei=e.i(165102),er=e.i(999258),ea=e.i(944252),eo=e.i(526298),en=e.i(601056),es=e.i(519078),ec=e.i(310578),eu=e.i(437153),em=e.i(254842),eg=e.i(692632);function ed(e){let l,i,r,a=(0,m.c)(7),{variant:o,className:n}=e,s=void 0===o?"on-background":o;return a[0]!==n?(l=(0,eu.classNames)("gap-2",n),a[0]=n,a[1]=l):l=a[1],a[2]!==s?(i=(0,eg.range)(3).map(e=>(0,t.jsx)(ec.SkeletonLine,{className:"h-[18px] w-24 rounded",variant:s},e.toString())),a[2]=s,a[3]=i):i=a[3],a[4]!==l||a[5]!==i?(r=(0,t.jsx)(em.Flex,{className:l,children:i}),a[4]=l,a[5]=i,a[6]=r):r=a[6],r}var ef=e.i(33037);function ep(e){let l,i,r,a,o,n,s,c,u,g=(0,m.c)(23),{variant:d,headerView:f}=e,p=void 0===d?"on-background":d;if(g[0]!==f||g[1]!==p){let e,{avatar:n,itemContent:s}=(0,ef.collectionInfoVariants)({headerView:f});i=en.Item,a="unstyled",g[7]!==p?(e=(0,t.jsx)(ec.SkeletonBlock,{variant:p}),g[7]=p,g[8]=e):e=g[8],o=(0,t.jsx)(en.ItemAvatar,{className:n(),size:80,children:e}),l=es.ItemContent,r=s(),g[0]=f,g[1]=p,g[2]=l,g[3]=i,g[4]=r,g[5]=a,g[6]=o}else l=g[2],i=g[3],r=g[4],a=g[5],o=g[6];return g[9]!==p?(n=(0,t.jsx)(ec.SkeletonLine,{className:"h-5 w-40",variant:p}),g[9]=p,g[10]=n):n=g[10],g[11]!==p?(s=(0,t.jsx)(ei.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)(ed,{variant:p})}),g[11]=p,g[12]=s):s=g[12],g[13]!==l||g[14]!==r||g[15]!==n||g[16]!==s?(c=(0,t.jsxs)(l,{className:r,children:[n,s]}),g[13]=l,g[14]=r,g[15]=n,g[16]=s,g[17]=c):c=g[17],g[18]!==i||g[19]!==a||g[20]!==o||g[21]!==c?(u=(0,t.jsxs)(i,{variant:a,children:[o,c]}),g[18]=i,g[19]=a,g[20]=o,g[21]=c,g[22]=u):u=g[22],u}var eT=e.i(990336);e.i(676104);var eh=e.i(177464);function eC(e){let l,i=(0,m.c)(2),{variant:r}=e,a=void 0===r?"on-background":r;return i[0]!==a?(l=(0,t.jsxs)(em.Flex,{className:"items-center justify-between gap-6 overflow-visible md:gap-8",children:[(0,t.jsx)(eh.StatDisplaySkeleton,{variant:a}),(0,t.jsx)(eT.HeroHeaderViewToggleSkeleton,{variant:a})]}),i[0]=a,i[1]=l):l=i[1],l}function ex(){let e,l,i,r=(0,m.c)(3);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(ep,{headerView:"full"}),l=(0,t.jsx)(ed,{}),r[0]=e,r[1]=l):(e=r[0],l=r[1]),r[2]===Symbol.for("react.memo_cache_sentinel")?(i=(0,t.jsx)(eo.HeroHeaderFullLayoutSkeleton,{info:e,metadataChips:l,showMetadataChipsOnLarge:!1,stats:(0,t.jsx)(eC,{})}),r[2]=i):i=r[2],i}function eS(){let e,l,i,r,a,o,n=(0,m.c)(6);if(n[0]===Symbol.for("react.memo_cache_sentinel")){let{container:a,content:o}=(0,ea.headerViewCompactVariants)();e=et.Container,i=a(),l=o(),r=(0,t.jsx)(ep,{headerView:"compact",variant:"default"}),n[0]=e,n[1]=l,n[2]=i,n[3]=r}else e=n[0],l=n[1],i=n[2],r=n[3];return n[4]===Symbol.for("react.memo_cache_sentinel")?(a=(0,t.jsx)(ei.Media,{lessThan:"md",children:(0,t.jsx)(ed,{className:"mt-4",variant:"default"})}),n[4]=a):a=n[4],n[5]===Symbol.for("react.memo_cache_sentinel")?(o=(0,t.jsx)(e,{className:i,children:(0,t.jsxs)("div",{className:l,children:[r,(0,t.jsxs)(el.FlexColumn,{className:"shrink-0 lg:flex-row lg:justify-end",children:[a,(0,t.jsx)(ei.Media,{lessThan:"lg",children:(0,t.jsx)(er.Separator,{className:"my-4"})}),(0,t.jsx)(eC,{variant:"default"})]})]})}),n[5]=o):o=n[5],o}function ey(){let e,l,i,r=(0,m.c)(4),{headerView:a}=(0,ee.useHeroHeaderView)();return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(eS,{}),l=(0,t.jsx)(ex,{}),r[0]=e,r[1]=l):(e=r[0],l=r[1]),r[2]!==a?(i=(0,t.jsx)(X.HeroHeaderSkeleton,{compactContent:e,fullContent:l,headerView:a,isCollectionBanner:!0}),r[2]=a,r[3]=i):i=r[3],i}var eb=e.i(62043),ev=e.i(797266);e.i(402819);var ej=e.i(916744);let eO=(0,l.graphql)(`
    subscription DropStageSubscription($collectionSlug: String!) {
      dropBySlug(slug: $collectionSlug) {
        ...dropStore_dropSubscription
      }
    }
  `,[S.dropStoreDropSubscriptionFragment]);var ew=e.i(902689),eI=e.i(389852);let eF=(0,eI.withSuspense)(({collectionSlug:e,children:t})=>{var l;let i,r,a,s,c,u,[d,f,p,T,h,C,x]=(0,Q.useDropStore)((0,n.useShallow)(e=>[e.setTotalSupply,e.updateTotalSupplyPerToken,e.updateStagesFromSubscription,e.stages,e.activeStageIndex,e.status,e.syncActiveStageAndStatus]));return(0,ew.useMintProgressSubscription)(e,({totalSupply:e,totalSupplyPerToken:t})=>{d(e),t&&f(t)}),l=e=>{p(e)},s=(0,m.c)(7),c=e??"",s[0]!==c?(i={collectionSlug:c},s[0]=c,s[1]=i):i=s[1],u=!e,s[2]!==i||s[3]!==u?(r={query:eO,variables:i,pause:u,pauseOnInactivity:!1},s[2]=i,s[3]=u,s[4]=r):r=s[4],s[5]!==l?(a=e=>{if(!e.dropBySlug)return;let t=(0,g.readFragment)(S.dropStoreDropSubscriptionFragment,e.dropBySlug);t?.stages&&l?.(t.stages)},s[5]=l,s[6]=a):a=s[6],(0,ej.useSubscription)(r,a),(0,ev.useDropEligibility)(e),(0,o.useEffect)(()=>{let e;if(!T.length)return;let t=T.find(e=>e.stageIndex===h);if(!t)return;let l=Date.now();if(C===V.DropStatus.MINTING_SOON&&t.startTime)e=new Date(t.startTime).getTime()-l;else{if(C!==V.DropStatus.MINTING||!t.endTime)return;e=new Date(t.endTime).getTime()-l}if(e>0){let t=setTimeout(()=>{x()},e);return()=>clearTimeout(t)}},[T,h,C,x]),t},{fallback:({children:e})=>e});var e_=e.i(722253),eA=e.i(674853);e.i(944976);var eN=e.i(175519),ek=e.i(36791),eP=e.i(494495),eL=e.i(55002);function eR(e){let l,i,r=(0,m.c)(5),{collection:a,locale:o}=e;if(r[0]!==a){let e=(0,g.readFragment)(eL.CollectionSeoCrawlLinksFragment,a),t=e.chain?.identifier;l=(0,eP.getCollectionHubLinks)(t),r[0]=a,r[1]=l}else l=r[1];let n=l;return r[2]!==n||r[3]!==o?(i=(0,t.jsx)(eP.SeoCrawlLinks,{links:n,locale:o}),r[2]=n,r[3]=o,r[4]=i):i=r[4],i}var e$=e.i(401954),eE=e.i(535374),eB=e.i(371306);e.i(53064);var eq=e.i(594255),eQ=e.i(808394),eV=e.i(101960);let eD=(0,l.graphql)(`
    subscription CollectionPageLayoutSubscription($slug: String!) {
      collectionBySlug(slug: $slug) {
        __typename
        ... on Collection {
          id
          slug
          externalUrl
          twitterUsername
          instagramUsername
          discordUrl
          floorPrice {
            pricePerItem {
              token {
                unit
                symbol
              }
            }
          }
          flags {
            isOffersEnabled
            isRarityDisabled
          }
          ...CollectionNavigation
          ...CollectionJsonLd
          ...CollectionSeoCrawlLinks
        }
        ... on DelistedCollection {
          slug
        }
        ... on BlacklistedCollection {
          slug
        }
        ...collectionTitle
        ...CollectionDropProvider_collection
        ...CollectionHeader
        ...CollectionHeaderPreview
        ...CollectionOverview
      }
    }
  `,[e_.CollectionHeaderFragment,eN.CollectionHeaderPreviewFragment,eA.CollectionOverviewFragment,eB.collectionTitleFragment,eb.CollectionDropProviderCollectionFragment,c.CollectionNavigationFragment,ek.CollectionJsonLdFragment,eL.CollectionSeoCrawlLinksFragment]),eM=["hero","bannerImageUrl","featuredImageUrl","imageUrl","overview","drop"],eH=(0,eI.withSuspense)(({collectionSlug:e,heroHeaderView:l,children:c,isPreview:g})=>{let d,f,p,[{data:T}]=(0,i.useQuery)({query:eV.COLLECTION_PAGE_LAYOUT_QUERY,variables:{collectionSlug:e},pause:!e}),h=(0,r.useLocale)(),[C,x]=(0,eq.useSyncState)(T?.collectionBySlug),S=T?.dropBySlug,y=(f=(0,m.c)(3),p=(0,eE.useNumberFormatter)(),f[0]!==C||f[1]!==p?(d=(0,eB.getCollectionTitle)(C,p),f[0]=C,f[1]=p,f[2]=d):d=f[2],d),[b,v]=(0,a.useCallbackRef)(),{setVariants:j}=(0,eQ.useTopNavbarStore)((0,n.useShallow)(e=>({setVariants:e.setVariants})));return((0,ej.useSubscription)({query:eD,variables:{slug:C?.slug??""},pause:!C,pauseOnInactivity:!1},e=>{x(t=>{let l=e.collectionBySlug;if(!t||"Collection"!==t.__typename||"Collection"!==l.__typename)return l;let i={...t,...l};for(let e of eM)null==l[e]&&null!=t[e]&&(i[e]=t[e]);return i})}),(0,o.useEffect)(()=>{y&&(document.title=y)},[y]),(0,o.useEffect)(()=>{C&&"BlacklistedCollection"!==C.__typename?"DelistedCollection"===C.__typename?j({transparent:"none"}):j(void 0):j({transparent:"none"})},[C,j]),(0,o.useEffect)(()=>()=>{j(void 0)},[j]),C&&"BlacklistedCollection"!==C.__typename)?"DelistedCollection"===C.__typename?(0,t.jsx)(e$.DelistedContent,{entityType:"collection"}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(ek.CollectionJsonLD,{collection:C}),(0,t.jsx)(eR,{collection:C,locale:h}),(0,t.jsx)(W.CollectionDropProvider,{collection:C,drop:S,children:(0,t.jsx)(eF,{collectionSlug:C.slug,children:(0,t.jsx)(u.CollectionLayoutProvider,{collectionSlug:e,isPreview:g,children:(0,t.jsxs)(ee.HeroHeaderViewProvider,{forceInitialView:g,headerRef:b,headerView:l,children:[g?(0,t.jsx)(eN.CollectionHeaderPreview,{collection:C,ref:v}):(0,t.jsx)(e_.CollectionHeader,{collection:C,ref:v}),(0,t.jsx)(G,{collection:C}),(0,t.jsx)("main",{children:c})]})})})})]}):(0,t.jsx)(s.default,{})},{fallback:function(e){let l,i,r,a,o=(0,m.c)(7),{children:n,heroHeaderView:s}=e;return o[0]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(ey,{}),i=(0,t.jsx)(Z,{}),o[0]=l,o[1]=i):(l=o[0],i=o[1]),o[2]!==n?(r=(0,t.jsx)("main",{children:n}),o[2]=n,o[3]=r):r=o[3],o[4]!==s||o[5]!==r?(a=(0,t.jsx)(W.CollectionDropProvider,{children:(0,t.jsxs)(ee.HeroHeaderViewProviderSkeleton,{headerView:s,children:[l,i,r]})}),o[4]=s,o[5]=r,o[6]=a):a=o[6],a}});e.s(["CollectionPageLayout",0,eH],491942)}]);

//# debugId=7a6dba75-f762-2340-e8b4-f3a800937f82
//# sourceMappingURL=1d535129646e2770.js.map