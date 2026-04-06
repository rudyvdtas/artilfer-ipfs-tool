;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="35f722a3-c952-b01c-c994-1c23e1d17416")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,802591,e=>{"use strict";var t=e.i(7683),l=e.i(333799),r=e.i(885530),s=e.i(104062),n=e.i(965523),a=e.i(165102),i=e.i(471317),o=e.i(806056),c=e.i(389852),m=e.i(682576),d=e.i(190627),u=e.i(906482),h=e.i(493883),x=e.i(959105);let p=(0,r.graphql)(`
    fragment HomeFeaturedCollectionSlide on Collection {
      id
      ...CollectionLockup
      ...CollectionBannerMedia
      ...CollectionLink
      floorPrice {
        pricePerItem {
          ...TokenPrice
        }
      }
      stats {
        oneHour {
          sales
        }
        oneDay {
          floorPriceChange
        }
      }
      ...getDropStatus
      drop {
        activeDropStage {
          price {
            ...TokenPrice
          }
        }
        stages {
          startTime
        }
      }
    }
  `,[m.CollectionLockupFragment,d.TokenPriceFragment,x.CollectionLinkFragment,u.CollectionBannerMediaFragment,h.getDropStatusFragment]),g=(0,r.graphql)(`
    fragment HomeFeaturedCollectionsCarousel on Collection {
      id
      ...HomeFeaturedCollectionSlide
    }
  `,[p]);var f=e.i(866313),j=e.i(310578),C=e.i(625236),y=e.i(692632);e.i(705574);var S=e.i(890542),N=e.i(975672),b=e.i(362341),v=e.i(111778),k=e.i(272347);function T(){let e,l=(0,f.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(v.SpotlightCarouselLayout,{carouselClassNames:"pointer-events-none",carouselContent:(0,y.range)(5).map(w),showCarouselDots:!0}),l[0]=e):e=l[0],e}function w(e){return(0,t.jsx)(k.SpotlightCarouselSlideLayout,{bannerMedia:(0,t.jsx)(j.SkeletonBlock,{className:"size-full bg-bg-additional-1"}),itemPreviews:(0,t.jsx)(b.SpotlightCarouselItemPreviewsLayout,{previewItems:(0,y.range)(3).map(F)}),stats:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.Media,{lessThan:"md",children:(0,t.jsx)(S.CollectionStatsSkeleton,{className:N.statsClassName,count:3,dividers:!0})}),(0,t.jsx)(a.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)(S.CollectionStatsSkeleton,{className:N.statsClassName,count:4,dividers:!0})})]}),title:(0,t.jsx)(C.TextHeadingSkeleton,{className:"w-1/2",size:"lg",variant:"on-background"})},e)}function F(e){return(0,t.jsx)(j.SkeletonBlock,{className:"size-full",variant:"on-background"},e)}var _=e.i(254842);function L({rows:e=5}){return(0,y.range)(e).map(e=>(0,t.jsx)(P,{},e))}function P(){let e,l,r=(0,f.c)(2);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsxs)(_.Flex,{className:"w-full items-center gap-3",children:[(0,t.jsx)(j.SkeletonBlock,{className:"h-10 w-10 shrink-0 rounded"}),(0,t.jsx)(j.SkeletonBlock,{className:"h-3 w-1/2 rounded"})]}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsxs)(_.Flex,{className:"items-center justify-between pb-0.5",children:[e,(0,t.jsxs)(_.Flex,{className:"w-1/4 flex-col items-end gap-3",children:[(0,t.jsx)(j.SkeletonBlock,{className:"h-3 rounded"}),(0,t.jsx)(j.SkeletonBlock,{className:"h-3 w-1/2 rounded"})]})]}),r[1]=l):l=r[1],l}var I=e.i(502732),B=e.i(268288),D=e.i(266341),E=e.i(341819),M=e.i(309980),A=e.i(522285);function V(e){let l,r,s,n,a,i,o,c,m,d,u,h,x,p,g,j,C,y,S=(0,f.c)(45),{category:N,shelfType:b,setShelfTypeAction:v}=e,k=(0,A.useTranslations)("StatsShelf"),T="nfts"===b;S[0]!==v?(l=()=>v("nfts"),S[0]=v,S[1]=l):l=S[1],S[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,t.jsx)(E.AutoAwesomeMosaic,{size:16}),S[2]=r):r=S[2],S[3]!==k?(s=k("nfts"),S[3]=k,S[4]=s):s=S[4],S[5]!==T||S[6]!==l||S[7]!==s?(n=(0,t.jsxs)(B.SwitchPill,{checked:T,onClick:l,size:"lg",variant:"transparent",children:[r,s]}),S[5]=T,S[6]=l,S[7]=s,S[8]=n):n=S[8];let w="tokens"===b;S[9]!==v?(a=()=>v("tokens"),S[9]=v,S[10]=a):a=S[10],S[11]===Symbol.for("react.memo_cache_sentinel")?(i=(0,t.jsx)(M.Toll,{size:16}),S[11]=i):i=S[11],S[12]!==k?(o=k("tokens"),S[12]=k,S[13]=o):o=S[13],S[14]!==w||S[15]!==a||S[16]!==o?(c=(0,t.jsxs)(B.SwitchPill,{checked:w,onClick:a,size:"lg",variant:"transparent",children:[i,o]}),S[14]=w,S[15]=a,S[16]=o,S[17]=c):c=S[17],S[18]!==c||S[19]!==n?(m=(0,t.jsxs)(_.Flex,{className:"gap-2",children:[n,c]}),S[18]=c,S[19]=n,S[20]=m):m=S[20];let F=N?`/collections?category=${N.toLowerCase()}`:"/collections";return S[21]!==k?(d=k("viewAll"),S[21]=k,S[22]=d):d=S[22],S[23]!==F||S[24]!==d?(u=(0,t.jsx)(I.Button,{href:F,size:"sm",variant:"secondary",children:d}),S[23]=F,S[24]=d,S[25]=u):u=S[25],S[26]!==m||S[27]!==u?(h=(0,t.jsxs)(_.Flex,{className:"justify-between",children:[m,u]}),S[26]=m,S[27]=u,S[28]=h):h=S[28],S[29]!==b||S[30]!==k?(x=k("tokens"===b?"token":"collection"),S[29]=b,S[30]=k,S[31]=x):x=S[31],S[32]!==x?(p=(0,t.jsx)(D.TextLabel,{color:"text-secondary",size:"xs",children:x}),S[32]=x,S[33]=p):p=S[33],S[34]!==b||S[35]!==k?(g=k("tokens"===b?"price":"floor"),S[34]=b,S[35]=k,S[36]=g):g=S[36],S[37]!==g?(j=(0,t.jsx)(D.TextLabel,{color:"text-secondary",size:"xs",children:g}),S[37]=g,S[38]=j):j=S[38],S[39]!==p||S[40]!==j?(C=(0,t.jsxs)(_.Flex,{className:"justify-between",children:[p,j]}),S[39]=p,S[40]=j,S[41]=C):C=S[41],S[42]!==h||S[43]!==C?(y=(0,t.jsxs)(t.Fragment,{children:[h,C]}),S[42]=h,S[43]=C,S[44]=y):y=S[44],y}function z(){let e,l=(0,f.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsxs)(_.Flex,{className:"mt-1 flex-col gap-4",children:[(0,t.jsx)(V,{category:void 0,setShelfTypeAction:q,shelfType:"nfts"}),(0,t.jsx)(L,{})]}),l[0]=e):e=l[0],e}function q(){return null}var U=e.i(258343),O=e.i(507892);function $(e){let l,r,s=(0,f.c)(4),{itemCount:n}=e,a=void 0===n?6:n;s[0]!==a?(l=Array(a).fill(null).map(R),s[0]=a,s[1]=l):l=s[1];let i=l;return s[2]!==i?(r=(0,t.jsx)(O.HomepageShelfMask,{className:"-mt-3 pt-3",side:"right",children:(0,t.jsx)(_.Flex,{className:"gap-4 pl-4 md:pl-6 lg:pl-0",children:i})}),s[2]=i,s[3]=r):r=s[3],r}function R(e,l){return(0,t.jsx)(H,{},l)}function H(){let e,l,r,s,a=(0,f.c)(4);return a[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsxs)(U.SpaceBetween,{className:"items-center",children:[(0,t.jsxs)(_.Flex,{className:"items-center gap-2",children:[(0,t.jsx)(j.SkeletonBlock,{className:"size-6 rounded-full"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-20"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-12"})]}),(0,t.jsx)(j.SkeletonLine,{className:"h-5 w-24 rounded-full"})]}),a[0]=e):e=a[0],a[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsxs)(n.FlexColumn,{className:"gap-1",children:[(0,t.jsx)(j.SkeletonLine,{className:"h-3 w-10"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-16"})]}),a[1]=l):l=a[1],a[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,t.jsxs)(n.FlexColumn,{className:"items-center gap-1",children:[(0,t.jsx)(j.SkeletonLine,{className:"h-3 w-14"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-12"})]}),a[2]=r):r=a[2],a[3]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsxs)(n.FlexColumn,{className:"max-w-[400px] gap-2 rounded-xl border border-border-1-transparent bg-bg-primary-transparent p-3",children:[e,(0,t.jsxs)(_.Flex,{className:"justify-between",children:[l,r,(0,t.jsxs)(n.FlexColumn,{className:"items-end gap-1",children:[(0,t.jsx)(j.SkeletonLine,{className:"h-3 w-16"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-14"})]})]})]}),a[3]=s):s=a[3],s}var Q=e.i(437153),K=e.i(501811),W=e.i(708969),G=e.i(840651);function Y(e){let l,r,s,a,i,o,c,m=(0,f.c)(16),{children:d,className:u}=e,h=(0,A.useTranslations)("TopPerpetualsShelf");return m[0]!==u?(l=(0,Q.classNames)((0,W.discoverShelfVariants)().container(),u),m[0]=u,m[1]=l):l=m[1],m[2]!==h?(r=h("description"),m[2]=h,m[3]=r):r=m[3],m[4]!==h?(s=h("title"),m[4]=h,m[5]=s):s=m[5],m[6]!==r||m[7]!==s?(a=(0,t.jsx)(G.ShelfHeader,{description:r,title:s}),m[6]=r,m[7]=s,m[8]=a):a=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(i=(0,K.fullBleedVariants)({mobileOnly:!0}),m[9]=i):i=m[9],m[10]!==d?(o=(0,t.jsx)("div",{className:i,children:d}),m[10]=d,m[11]=o):o=m[11],m[12]!==l||m[13]!==a||m[14]!==o?(c=(0,t.jsxs)(n.FlexColumn,{className:l,"data-testid":"TopPerpetualsShelf",children:[a,o]}),m[12]=l,m[13]=a,m[14]=o,m[15]=c):c=m[15],c}function Z(){let e,l=(0,f.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(Y,{children:(0,t.jsx)($,{})}),l[0]=e):e=l[0],e}var X=e.i(39771),J=e.i(651009);function ee(e){let l,r,s=(0,f.c)(5),{itemCount:n,clusterSize:a}=e,i=void 0===n?6:n,o=void 0===a?2:a;s[0]!==o||s[1]!==i?(l=(0,J.chunk)(Array(i).fill(null),o).map(et),s[0]=o,s[1]=i,s[2]=l):l=s[2];let c=l;return s[3]!==c?(r=(0,t.jsx)(O.HomepageShelfMask,{className:"-mt-3 pt-3",side:"right",children:(0,t.jsx)(_.Flex,{className:"gap-4 pl-4 md:pl-6 lg:pl-0",children:c})}),s[3]=c,s[4]=r):r=s[4],r}function et(e,l){return(0,t.jsx)(n.FlexColumn,{className:"w-max gap-3 md:gap-4",children:e.map((e,r)=>(0,t.jsx)(el,{},`${l.toString()}-${r.toString()}`))},l)}function el(){let e,l,r=(0,f.c)(2);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(j.SkeletonBlock,{className:"size-[82px] rounded-none"}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(j.SkeletonBlock,{className:"h-[82px] w-[300px] overflow-hidden rounded-lg bg-bg-primary-transparent",children:(0,t.jsxs)(_.Flex,{className:"gap-3",children:[e,(0,t.jsx)(X.FlexCenter,{className:"grow",children:(0,t.jsxs)(n.FlexColumn,{className:"grow gap-1",children:[(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-3/4"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-1/2"})]})})]})}),r[1]=l):l=r[1],l}function er(e){let l,r,s,a,i,o,c,m=(0,f.c)(16),{children:d,className:u}=e,h=(0,A.useTranslations)("TrendingTokensShelf");return m[0]!==u?(l=(0,Q.classNames)((0,W.discoverShelfVariants)().container(),u),m[0]=u,m[1]=l):l=m[1],m[2]!==h?(r=h("description"),m[2]=h,m[3]=r):r=m[3],m[4]!==h?(s=h("trendingTokens"),m[4]=h,m[5]=s):s=m[5],m[6]!==r||m[7]!==s?(a=(0,t.jsx)(G.ShelfHeader,{description:r,title:s}),m[6]=r,m[7]=s,m[8]=a):a=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(i=(0,K.fullBleedVariants)({mobileOnly:!0}),m[9]=i):i=m[9],m[10]!==d?(o=(0,t.jsx)("div",{className:i,children:d}),m[10]=d,m[11]=o):o=m[11],m[12]!==l||m[13]!==a||m[14]!==o?(c=(0,t.jsxs)(n.FlexColumn,{className:l,"data-testid":"TrendingCurrenciesShelf",children:[a,o]}),m[12]=l,m[13]=a,m[14]=o,m[15]=c):c=m[15],c}function es(){let e,l=(0,f.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(er,{children:(0,t.jsx)(ee,{})}),l[0]=e):e=l[0],e}function en(){let e,l,r,s,i=(0,f.c)(6),c=(0,o.useIsPerpetualsEnabled)();return i[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(T,{}),i[0]=e):e=i[0],i[1]!==c?(l=c?(0,t.jsx)(Z,{}):null,i[1]=c,i[2]=l):l=i[2],i[3]===Symbol.for("react.memo_cache_sentinel")?(r=(0,t.jsxs)(n.FlexColumn,{className:"-mx-4 shrink-0 gap-6 overflow-hidden px-4 md:gap-12 lg:mx-0 lg:overflow-visible lg:px-0",children:[(0,t.jsx)(a.Media,{lessThan:"lg",children:(0,t.jsx)(z,{})}),(0,t.jsx)(es,{})]}),i[3]=r):r=i[3],i[4]!==l?(s=(0,t.jsxs)(n.FlexColumn,{className:"gap-6 pb-6",children:[e,l,r]}),i[4]=l,i[5]=s):s=i[5],s}var ea=e.i(455480);e.i(145404);var ei=e.i(231592),eo=e.i(794835),ec=e.i(439765),em=e.i(47667),ed=e.i(567089),eu=e.i(209959),eh=e.i(950293),ex=e.i(967593),ep=e.i(592901),eg=e.i(354667),ef=e.i(763093),ej=e.i(430903),eC=e.i(209293);function ey(e){let l,r,s,n,a,i,o,c,m,d=(0,f.c)(30),{collection:u}=e,x=(0,ea.readFragment)(p,u),g=(0,A.useTranslations)("FeaturedCollectionSlide"),j=(0,ef.useFormatStageDate)(),C=(0,h.getDropStatus)(x),y=C===eg.DropStatus.MINTING,S=y||C===eg.DropStatus.MINTING_SOON,N=x.drop?.stages?.at(0)?.startTime,b=ej.CollectionLink,v=eC.FeaturedCarouselSlide;d[0]!==x?(l=(0,t.jsx)(ep.CollectionBannerMedia,{collection:x,disableVideo:!0,height:300,sizes:"(min-width: 1024px) 300px, (min-width: 768px) calc(100vw - 70px), calc(100vw - 76px)",width:600}),d[0]=x,d[1]=l):l=d[1],d[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,t.jsx)(ec.CollectionLockupContent,{children:(0,t.jsx)(eo.CollectionLockupTitle,{weight:"semibold"})}),d[2]=r):r=d[2],d[3]!==x?(s=(0,t.jsx)(eo.CollectionLockup,{collection:x,children:r}),d[3]=x,d[4]=s):s=d[4];let k=X.FlexCenter,T=S?y?(0,t.jsx)(ed.Chip,{className:"mr-2 border-success-1 bg-transparent text-success-1",children:g("mintingNow")}):(0,t.jsx)(eh.TextBody,{color:"text-secondary",size:"sm",children:N?j(N):null}):(0,t.jsxs)(eh.TextBody,{color:"text-secondary",size:"sm",children:[g("floorPrice")," "]});return d[5]!==x.drop?.activeDropStage?.price||d[6]!==x.floorPrice?.pricePerItem||d[7]!==y||d[8]!==S?(n=S?y?(0,t.jsx)(em.TokenPrice,{price:x.drop?.activeDropStage?.price}):null:(0,t.jsx)(em.TokenPrice,{price:x.floorPrice?.pricePerItem}),d[5]=x.drop?.activeDropStage?.price,d[6]=x.floorPrice?.pricePerItem,d[7]=y,d[8]=S,d[9]=n):n=d[9],d[10]!==n?(a=(0,t.jsx)(D.TextLabel,{color:"text-secondary",size:"sm",weight:"semibold",children:n}),d[10]=n,d[11]=a):a=d[11],d[12]!==x||d[13]!==S||d[14]!==g?(i=S?null:(0,t.jsx)(eh.TextBody,{className:"pl-2",children:(0,t.jsx)(ex.Tooltip,{content:g("oneDayFloorPriceChangeTooltip"),children:(0,t.jsx)(eu.StatChange,{change:x.stats.oneDay.floorPriceChange})})}),d[12]=x,d[13]=S,d[14]=g,d[15]=i):i=d[15],d[16]!==k||d[17]!==T||d[18]!==a||d[19]!==i?(o=(0,t.jsxs)(k,{children:[T,a,i]}),d[16]=k,d[17]=T,d[18]=a,d[19]=i,d[20]=o):o=d[20],d[21]!==v||d[22]!==l||d[23]!==s||d[24]!==o?(c=(0,t.jsxs)(v,{bannerMedia:l,children:[s,o]}),d[21]=v,d[22]=l,d[23]=s,d[24]=o,d[25]=c):c=d[25],d[26]!==b||d[27]!==x||d[28]!==c?(m=(0,t.jsx)(b,{collection:x,children:c}),d[26]=b,d[27]=x,d[28]=c,d[29]=m):m=d[29],m}function eS(e){let l,r,s,n=(0,f.c)(6),{items:a}=e;if(n[0]!==a){let e=a.map(eb);l=ei.FeaturedCarousel,r=e.map(eN),n[0]=a,n[1]=l,n[2]=r}else l=n[1],r=n[2];return n[3]!==l||n[4]!==r?(s=(0,t.jsx)(l,{slides:r}),n[3]=l,n[4]=r,n[5]=s):s=n[5],s}function eN(e){return{slide:(0,t.jsx)(ey,{collection:e}),key:e.id}}function eb(e){return(0,ea.readFragment)(g,e)}function ev(e){let l,r,s=(0,f.c)(4),{itemCount:n}=e,a=void 0===n?5:n;return s[0]!==a?(l=(0,y.range)(a).map(ek),s[0]=a,s[1]=l):l=s[1],s[2]!==l?(r=(0,t.jsx)(O.HomepageShelfMask,{className:"-mt-3 pt-3",side:"right",children:(0,t.jsx)(_.Flex,{className:"w-max gap-3 md:gap-4",children:l})}),s[2]=l,s[3]=r):r=s[3],r}function ek(e){return(0,t.jsxs)(n.FlexColumn,{className:"h-full w-[300px] overflow-hidden",children:[(0,t.jsx)(j.SkeletonBlock,{className:"aspect-16/9 w-full rounded-lg"}),(0,t.jsxs)(n.FlexColumn,{className:"flex-1 gap-1 py-3",children:[(0,t.jsx)(j.SkeletonLine,{className:"w-2/4"}),(0,t.jsx)(j.SkeletonLine,{className:"w-1/4"})]})]},e)}function eT(e){let l,r,s,a,i,o=(0,f.c)(13),{carousel:c,className:m,dataTestId:d,title:u,description:h}=e;return o[0]!==m?(l=(0,Q.classNames)((0,W.discoverShelfVariants)().container(),m),o[0]=m,o[1]=l):l=o[1],o[2]!==h||o[3]!==u?(r=(0,t.jsx)(G.ShelfHeader,{description:h,title:u}),o[2]=h,o[3]=u,o[4]=r):r=o[4],o[5]===Symbol.for("react.memo_cache_sentinel")?(s=(0,K.fullBleedVariants)({mobileOnly:!0}),o[5]=s):s=o[5],o[6]!==c?(a=(0,t.jsx)("div",{className:s,children:c}),o[6]=c,o[7]=a):a=o[7],o[8]!==d||o[9]!==l||o[10]!==r||o[11]!==a?(i=(0,t.jsxs)(n.FlexColumn,{className:l,"data-testid":d,children:[r,a]}),o[8]=d,o[9]=l,o[10]=r,o[11]=a,o[12]=i):i=o[12],i}function ew(e){let l,r,s,n,a=(0,f.c)(15),{title:i,titleKey:o,description:c,descriptionKey:m,collections:d,className:u}=e,h=(0,A.useTranslations)("CuratedCollectionsShelf");a[0]!==i||a[1]!==h||a[2]!==o?(l=o&&h.has(o)?h(o):i,a[0]=i,a[1]=h,a[2]=o,a[3]=l):l=a[3];let x=l;a[4]!==m||a[5]!==c||a[6]!==h?(r=m&&h.has(m)?h(m):c,a[4]=m,a[5]=c,a[6]=h,a[7]=r):r=a[7];let p=r;return a[8]!==d?(s=(0,t.jsx)(eS,{items:d}),a[8]=d,a[9]=s):s=a[9],a[10]!==u||a[11]!==p||a[12]!==s||a[13]!==x?(n=(0,t.jsx)(eT,{carousel:s,className:u,description:p,title:x}),a[10]=u,a[11]=p,a[12]=s,a[13]=x,a[14]=n):n=a[14],n}var eF=e.i(803577),e_=e.i(81810),eL=e.i(589259),eP=e.i(609644);let eI=(0,r.graphql)(`
    fragment HomeFeaturedCurrencySlide on CurrencyV2 {
      id
      name
      symbol
      imageUrl
      chain {
        identifier
        ...ChainBadge
      }
      stats {
        marketCapUsd
        oneDay {
          priceChange
        }
      }
      tokenGroup {
        stats {
          marketCapUsd
        }
      }
      ...CurrencyBannerMedia
      ...CurrencyV2Lockup
      ...CurrencyV2Link
    }
  `,[eF.ChainBadgeFragment,eL.CurrencyBannerMediaFragment,e_.CurrencyV2LockupFragment,eP.CurrencyV2LinkFragment]),eB=(0,r.graphql)(`
    fragment FeaturedCurrenciesCarousel on CurrencyV2 {
      id
      ...HomeFeaturedCurrencySlide
    }
  `,[eI]);var eD=e.i(508833),eE=e.i(738480),eM=e.i(940669),eA=e.i(111908);function eV(e){let l,r,s,n,a=(0,f.c)(9);a[0]!==e?({currency:l,...r}=e,a[0]=e,a[1]=l,a[2]=r):(l=a[1],r=a[2]),a[3]!==l?(s=(0,ea.readFragment)(eL.CurrencyBannerMediaFragment,l),a[3]=l,a[4]=s):s=a[4];let i=s,o=(0,eA.useCurrencyBannerMedia)(i.metadata),c=(0,eA.useCurrencyBannerMediaFallback)(i.metadata);return a[5]!==o||a[6]!==c||a[7]!==r?(n=(0,t.jsx)(eM.BannerMedia,{fallback:c,url:o,...r}),a[5]=o,a[6]=c,a[7]=r,a[8]=n):n=a[8],n}var ez=e.i(668493);function eq(e){let l,r,s,n,a,i,o,c,m,d,u,h,x=(0,f.c)(30),{currency:p}=e;x[0]!==p?(l=(0,ea.readFragment)(eI,p),x[0]=p,x[1]=l):l=x[1];let g=l,j=(0,A.useTranslations)("FeaturedCurrencySlide");x[2]!==g?(r=(0,t.jsx)(eV,{currency:g,frameTime:1,height:300,width:600}),x[2]=g,x[3]=r):r=x[3],x[4]!==g?(s=(0,t.jsx)(X.FlexCenter,{className:"gap-1.5",children:(0,t.jsx)(eD.CurrencyLockup,{currency:g,showChainBadge:!1})}),x[4]=g,x[5]=s):s=x[5],x[6]!==j?(n=j("fdv"),x[6]=j,x[7]=n):n=x[7],x[8]!==n?(a=(0,t.jsxs)(eh.TextBody,{color:"text-secondary",size:"sm",children:[n," "]}),x[8]=n,x[9]=a):a=x[9];let C=g.tokenGroup?.stats?.marketCapUsd??g.stats?.marketCapUsd;x[10]!==C?(i=(0,t.jsx)(D.TextLabel,{color:"text-secondary",size:"sm",weight:"semibold",children:(0,t.jsx)(eE.NumberDisplay,{bounded:!1,display:"usd",value:C})}),x[10]=C,x[11]=i):i=x[11],x[12]!==j?(o=j("oneDayFloorPriceChangeTooltip"),x[12]=j,x[13]=o):o=x[13];let y=g.stats?.oneDay.priceChange;return x[14]!==y?(c=(0,t.jsx)(eu.StatChange,{change:y}),x[14]=y,x[15]=c):c=x[15],x[16]!==c||x[17]!==o?(m=(0,t.jsx)(eh.TextBody,{className:"pl-2",children:(0,t.jsx)(ex.Tooltip,{content:o,children:c})}),x[16]=c,x[17]=o,x[18]=m):m=x[18],x[19]!==m||x[20]!==a||x[21]!==i?(d=(0,t.jsxs)(X.FlexCenter,{children:[a,i,m]}),x[19]=m,x[20]=a,x[21]=i,x[22]=d):d=x[22],x[23]!==d||x[24]!==r||x[25]!==s?(u=(0,t.jsxs)(eC.FeaturedCarouselSlide,{bannerMedia:r,children:[s,d]}),x[23]=d,x[24]=r,x[25]=s,x[26]=u):u=x[26],x[27]!==g||x[28]!==u?(h=(0,t.jsx)(ez.CurrencyLink,{currency:g,variant:"unstyled",children:u}),x[27]=g,x[28]=u,x[29]=h):h=x[29],h}function eU(e){let l,r,s,n=(0,f.c)(6),{currencies:a}=e;if(n[0]!==a){let e=a.map(e$);l=ei.FeaturedCarousel,r=e.map(eO),n[0]=a,n[1]=l,n[2]=r}else l=n[1],r=n[2];return n[3]!==l||n[4]!==r?(s=(0,t.jsx)(l,{slides:r}),n[3]=l,n[4]=r,n[5]=s):s=n[5],s}function eO(e){return{slide:(0,t.jsx)(eq,{currency:e}),key:e.id}}function e$(e){return(0,ea.readFragment)(eB,e)}let eR=(0,r.graphql)(`
    fragment CuratedCurrenciesShelf on CurrencyV2 {
      ...FeaturedCurrenciesCarousel
    }
  `,[eB]);function eH(e){let l,r,s,n,a,i=(0,f.c)(20),{title:o,titleKey:c,description:m,descriptionKey:d,currencies:u,className:h}=e;i[0]!==u?(l=u.map(eQ),i[0]=u,i[1]=l):l=i[1];let x=l,p=(0,A.useTranslations)("CuratedTokensShelf");i[2]!==o||i[3]!==c||i[4]!==p?(r=()=>c&&p.has("featuredTokens")?p("featuredTokens"):o,i[2]=o,i[3]=c,i[4]=p,i[5]=r):r=i[5];let g=r,j=m;if(d&&p.has(d)){let e;i[6]!==d||i[7]!==p?(e=p(d),i[6]=d,i[7]=p,i[8]=e):e=i[8],j=e}else if(p.has("featuredTokensSubtitleDescription")){let e;i[9]!==p?(e=p("featuredTokensSubtitleDescription"),i[9]=p,i[10]=e):e=i[10],j=e}i[11]!==x?(s=(0,t.jsx)(eU,{currencies:x}),i[11]=x,i[12]=s):s=i[12];let C=j;return i[13]!==g?(n=g(),i[13]=g,i[14]=n):n=i[14],i[15]!==h||i[16]!==j||i[17]!==s||i[18]!==n?(a=(0,t.jsx)(eT,{carousel:s,className:h,description:C,title:n}),i[15]=h,i[16]=j,i[17]=s,i[18]=n,i[19]=a):a=i[19],a}function eQ(e){return(0,ea.readFragment)(eR,e)}var eK=e.i(100868),eW=e.i(251577),eG=e.i(345319),eY=e.i(365739),eZ=e.i(648091),eX=e.i(150518),eJ=e.i(703379),e0=e.i(806519);e.i(661049);var e1=e.i(493473),e2=e.i(190519);e.i(275521);var e3=e.i(6425),e4=e.i(600028);let e5=(0,eJ.tv)({variants:{variant:{default:"rounded",curated:"rounded-t"}}}),e6=(0,eJ.tv)({variants:{variant:{default:"py-3",curated:"rounded-b bg-bg-additional-2 p-3"}}}),e8=(0,r.graphql)(`
    fragment FeaturedItemCard on Item {
      id
      name
      bestListing {
        pricePerItem {
          ...TokenPrice
        }
      }
      ...ItemLink
      ...ItemMedia
    }
  `,[d.TokenPriceFragment,e2.ItemLinkFragment,e4.ItemMediaFragment]);function e7(e){let l,r,s,a,i,o,c,m,d,u,h,x,p=(0,f.c)(29),{className:g,item:j,variant:C}=e,y=void 0===C?"default":C;p[0]!==j?(l=(0,ea.readFragment)(e8,j),p[0]=j,p[1]=l):l=p[1];let S=l;p[2]!==g?(r=(0,Q.classNames)((0,eX.scaleTransformVariants)(),"rounded border border-border-1-transparent",g),p[2]=g,p[3]=r):r=p[3],p[4]!==y?(s=(0,Q.classNames)("relative w-full overflow-hidden",e5({variant:y})),p[4]=y,p[5]=s):s=p[5],p[6]===Symbol.for("react.memo_cache_sentinel")?(a={video:e0.ItemCardVideo},p[6]=a):a=p[6],p[7]!==S?(i=(0,t.jsx)(e3.ItemMedia,{className:"aspect-square object-cover",containerSize:"100%",item:S,mediaSize:300,overrides:a,surface:"preview"}),p[7]=S,p[8]=i):i=p[8],p[9]!==s||p[10]!==i?(o=(0,t.jsx)("div",{className:s,children:i}),p[9]=s,p[10]=i,p[11]=o):o=p[11],p[12]!==y?(c=(0,Q.classNames)("gap-0.5",e6({variant:y})),p[12]=y,p[13]=c):c=p[13],p[14]!==S.name?(m=(0,t.jsx)(eh.TextBody,{className:"truncate",weight:"semibold",children:S.name}),p[14]=S.name,p[15]=m):m=p[15];let N=S.bestListing?.pricePerItem;return p[16]!==N?(d=(0,t.jsx)(_.Flex,{className:"items-center",children:(0,t.jsx)(eh.TextBody,{color:"text-secondary",size:"sm",weight:"semibold",children:(0,t.jsx)(em.TokenPrice,{price:N})})}),p[16]=N,p[17]=d):d=p[17],p[18]!==d||p[19]!==c||p[20]!==m?(u=(0,t.jsxs)(n.FlexColumn,{className:c,children:[m,d]}),p[18]=d,p[19]=c,p[20]=m,p[21]=u):u=p[21],p[22]!==u||p[23]!==r||p[24]!==o?(h=(0,t.jsxs)(n.FlexColumn,{className:r,children:[o,u]}),p[22]=u,p[23]=r,p[24]=o,p[25]=h):h=p[25],p[26]!==S||p[27]!==h?(x=(0,t.jsx)(e1.ItemLink,{item:S,children:h}),p[26]=S,p[27]=h,p[28]=x):x=p[28],x}let e9=(0,r.graphql)(`
    fragment SingleCollectionSpotlight on Collection {
      id
      ...CollectionLockup
      ...CollectionBannerMedia
      imageUrl
      isVerified
      description
      stats {
        sevenDays {
          sales
          floorPriceChange
        }
      }
      ...CollectionLink
      previewItems(limit: 3) {
        ...FeaturedItemCard
      }
    }
  `,[m.CollectionLockupFragment,x.CollectionLinkFragment,e8,u.CollectionBannerMediaFragment]),te={a:e=>(0,t.jsx)(t.Fragment,{children:e.children})};function tt(e){let l,r,s,i,o,c,m,d,u,h,x,p,g,C,y,S,N,b,v,k,T,w,F,L,P,I,B,D,E,M,V,z,q=(0,f.c)(73),{collection:U}=e;q[0]!==U?(l=(0,ea.readFragment)(e9,U),q[0]=U,q[1]=l):l=q[1];let O=l,$=(0,A.useTranslations)("SingleCollectionSpotlight");q[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,Q.classNames)("dark relative overflow-hidden rounded-lg p-6 shadow-sm",(0,eW.insetBorderVariants)({positioning:"absolute"})),q[2]=r):r=q[2],q[3]!==O?(s=(0,t.jsx)(ep.CollectionBannerMedia,{collection:O,sizes:"100vw",width:500}),q[3]=O,q[4]=s):s=q[4],q[5]===Symbol.for("react.memo_cache_sentinel")?(i=(0,t.jsx)("div",{className:"absolute inset-0 bg-black/50 backdrop-blur-md"}),q[5]=i):i=q[5],q[6]!==s?(o=(0,t.jsxs)("div",{className:"absolute inset-0 z-0 overflow-hidden md:rounded-lg",children:[s,i]}),q[6]=s,q[7]=o):o=q[7],q[8]===Symbol.for("react.memo_cache_sentinel")?(c=(0,Q.classNames)("relative","md:grid md:grid-cols-2 md:gap-6","2xl:grid-cols-5"),q[8]=c):c=q[8],q[9]!==O.imageUrl?(m=(0,t.jsx)("div",{className:"relative size-[72px] shrink-0 overflow-hidden rounded-xl md:size-[82px]",children:O.imageUrl?(0,t.jsx)(eK.Image,{height:82,sizes:"auto",src:O.imageUrl,width:82}):(0,t.jsx)(j.SkeletonBlock,{})}),q[9]=O.imageUrl,q[10]=m):m=q[10],q[11]!==O.isVerified?(d=O.isVerified?(0,t.jsx)(eZ.Verified,{className:"size-5 translate-y-px",fill:"white",innerFill:"transparent",size:21}):null,q[11]=O.isVerified,q[12]=d):d=q[12],q[13]!==d?(u=(0,t.jsx)(ec.CollectionLockupContent,{children:(0,t.jsx)(eo.CollectionLockupTitle,{badge:d,className:"font-medium text-heading-sm leading-none",weight:"semibold"})}),q[13]=d,q[14]=u):u=q[14],q[15]!==O||q[16]!==u?(h=(0,t.jsx)(a.Media,{lessThan:"md",children:(0,t.jsx)(eo.CollectionLockup,{className:"gap-2.5",collection:O,size:"md",children:u})}),q[15]=O,q[16]=u,q[17]=h):h=q[17],q[18]!==O.isVerified?(x=O.isVerified?(0,t.jsx)(eZ.Verified,{className:"size-5 translate-y-px",fill:"white",innerFill:"transparent",size:24}):null,q[18]=O.isVerified,q[19]=x):x=q[19],q[20]!==x?(p=(0,t.jsx)(ec.CollectionLockupContent,{children:(0,t.jsx)(eo.CollectionLockupTitle,{badge:x,className:"text-heading-sm",weight:"semibold"})}),q[20]=x,q[21]=p):p=q[21],q[22]!==O||q[23]!==p?(g=(0,t.jsx)(a.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)(eo.CollectionLockup,{className:"gap-2.5",collection:O,size:"md",children:p})}),q[22]=O,q[23]=p,q[24]=g):g=q[24],q[25]!==$?(C=$("sevenDaySales"),q[25]=$,q[26]=C):C=q[26],q[27]!==O.stats.sevenDays.sales?(y=(0,t.jsx)(eE.NumberDisplay,{display:"full",value:O.stats.sevenDays.sales}),q[27]=O.stats.sevenDays.sales,q[28]=y):y=q[28],q[29]!==C||q[30]!==y?(S=(0,t.jsxs)(eh.TextBody,{children:[C," ",y]}),q[29]=C,q[30]=y,q[31]=S):S=q[31],q[32]!==O.stats.sevenDays.floorPriceChange?(N=(0,t.jsx)(eh.TextBody,{children:(0,t.jsx)(eu.StatChange,{change:O.stats.sevenDays.floorPriceChange})}),q[32]=O.stats.sevenDays.floorPriceChange,q[33]=N):N=q[33],q[34]!==S||q[35]!==N?(b=(0,t.jsxs)(X.FlexCenter,{className:"gap-2 font-mono",children:[S,N]}),q[34]=S,q[35]=N,q[36]=b):b=q[36],q[37]!==h||q[38]!==g||q[39]!==b?(v=(0,t.jsxs)(n.FlexColumn,{className:"w-full gap-2",children:[h,g,b]}),q[37]=h,q[38]=g,q[39]=b,q[40]=v):v=q[40],q[41]!==v||q[42]!==m?(k=(0,t.jsxs)(_.Flex,{className:"mb-6 items-center gap-6 md:flex-col md:items-start",children:[m,v]}),q[41]=v,q[42]=m,q[43]=k):k=q[43];let R=O.description??"";return q[44]!==R?(T=(0,t.jsx)(eY.Truncate,{className:"break-normal",lines:3,children:(0,t.jsx)(eh.TextBody,{color:"text-primary",children:(0,t.jsx)(eG.Markdown,{components:te,children:R})})}),q[44]=R,q[45]=T):T=q[45],q[46]!==k||q[47]!==T?(w=(0,t.jsxs)(n.FlexColumn,{className:"md:col-span-1 md:gap-6 md:pr-3 2xl:col-span-2",children:[k,T]}),q[46]=k,q[47]=T,q[48]=w):w=q[48],q[49]!==O.previewItems?(F=O.previewItems?.slice(0,3).map(ts),q[49]=O.previewItems,q[50]=F):F=q[50],q[51]!==F?(L=(0,t.jsx)(a.Media,{lessThan:"md",children:(0,t.jsx)(_.Flex,{className:"scrollbar-hidden -mx-6 mt-6 max-h-[220px] gap-3 overflow-x-scroll px-6",children:F})}),q[51]=F,q[52]=L):L=q[52],q[53]===Symbol.for("react.memo_cache_sentinel")?(P=["md","2xl"],q[53]=P):P=q[53],q[54]!==O.previewItems?(I=O.previewItems?.slice(0,2).map(tr),q[54]=O.previewItems,q[55]=I):I=q[55],q[56]!==I?(B=(0,t.jsx)(a.Media,{between:P,children:(0,t.jsx)("div",{className:"col-span-1 grid grid-cols-2 gap-4",children:I})}),q[56]=I,q[57]=B):B=q[57],q[58]!==O.previewItems?(D=O.previewItems?.slice(0,3).map(tl),q[58]=O.previewItems,q[59]=D):D=q[59],q[60]!==D?(E=(0,t.jsx)(a.Media,{greaterThanOrEqual:"2xl",children:(0,t.jsx)("div",{className:"col-span-3 grid grid-cols-3 gap-4",children:D})}),q[60]=D,q[61]=E):E=q[61],q[62]!==w||q[63]!==L||q[64]!==B||q[65]!==E?(M=(0,t.jsxs)(n.FlexColumn,{className:c,children:[w,L,B,E]}),q[62]=w,q[63]=L,q[64]=B,q[65]=E,q[66]=M):M=q[66],q[67]!==M||q[68]!==o?(V=(0,t.jsxs)("div",{className:r,children:[o,M]}),q[67]=M,q[68]=o,q[69]=V):V=q[69],q[70]!==O||q[71]!==V?(z=(0,t.jsx)(ej.CollectionLink,{collection:O,children:V}),q[70]=O,q[71]=V,q[72]=z):z=q[72],z}function tl(e,l){return(0,t.jsx)(e7,{className:"shrink-0 basis-1/3",item:e,variant:"curated"},l)}function tr(e,l){return(0,t.jsx)(e7,{className:"shrink-0 basis-1/2",item:e,variant:"curated"},l)}function ts(e,l){return(0,t.jsx)(e7,{className:"h-full w-40 shrink-0 basis-1/3",item:e,variant:"curated"},l)}let tn={ttl:i.TTL["5m"]},ta=(0,r.graphql)(`
    query EditorsPickShelfQuery(
      $category: CategoryIdentifier
      $chain: ChainIdentifier
    ) {
      editorPickCollection(category: $category, chain: $chain) {
        name
        id
        ...SingleCollectionSpotlight
      }
    }
  `,[e9]),ti=(0,c.withSuspense)(({className:e,category:r,chain:s})=>{let[{data:a}]=(0,l.useQuery)({query:ta,variables:{category:r,chain:s},context:tn}),i=a?.editorPickCollection,o=(0,A.useTranslations)("EditorsPickShelf");return i?(0,t.jsxs)(n.FlexColumn,{className:(0,Q.classNames)((0,W.discoverShelfVariants)().container(),e),children:[(0,t.jsx)(G.ShelfHeader,{title:o("highestWeeklySales")}),(0,t.jsx)(tt,{collection:i})]}):null});function to(e){let l,r,s=(0,f.c)(5),{children:a,className:i}=e;return s[0]!==i?(l=(0,Q.classNames)((0,W.discoverShelfVariants)().container(),i),s[0]=i,s[1]=l):l=s[1],s[2]!==a||s[3]!==l?(r=(0,t.jsx)(n.FlexColumn,{className:l,"data-testid":"FooterShelf",children:a}),s[2]=a,s[3]=l,s[4]=r):r=s[4],r}var tc=e.i(790621);function tm(e){let l,r,s,n,a,i,o,c,m=(0,f.c)(15);m[0]!==e?({size:s,fill:n,fillAttribute:a,className:l,...r}=e,m[0]=e,m[1]=l,m[2]=r,m[3]=s,m[4]=n,m[5]=a):(l=m[1],r=m[2],s=m[3],n=m[4],a=m[5]);let d=void 0===s?24:s,u=void 0===n?"current":n,h=void 0===a?"currentColor":a;return m[6]!==l||m[7]!==u?(i=(0,Q.classNames)((0,tc.fillVariants)({fill:u}),l),m[6]=l,m[7]=u,m[8]=i):i=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(o=(0,t.jsx)("path",{d:"m618-358 44-42-84-84q11-17 16.5-36t5.5-40q0-59-41.5-99.5T460-700q-57 0-98.5 40.5T320-560q0 59 41.5 99.5T460-420q21 0 39.5-5.5T536-442l82 84ZM460-480q-33 0-56.5-23.5T380-560q0-33 23.5-56.5T460-640q32 0 56 23.5t24 56.5q0 33-23.5 56.5T460-480ZM160-240q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440ZM40-120v-80h880v80H40Z"}),m[9]=o):o=m[9],m[10]!==h||m[11]!==r||m[12]!==d||m[13]!==i?(c=(0,t.jsx)("svg",{"aria-label":"Screen Search Desktop",className:i,fill:h,height:d,role:"img",viewBox:"0 -960 960 960",width:d,xmlns:"http://www.w3.org/2000/svg",...r,children:o}),m[10]=h,m[11]=r,m[12]=d,m[13]=i,m[14]=c):c=m[14],c}var td=e.i(83617),tu=e.i(953756);function th(e){let l,r,s,a,i,o,c,m=(0,f.c)(17),{title:d,description:u,cta:h,icon:x}=e;return m[0]!==x?(l=(0,t.jsx)(x,{}),m[0]=x,m[1]=l):l=m[1],m[2]!==d?(r=(0,t.jsx)(eh.TextBody,{size:"md",weight:"semibold",children:d}),m[2]=d,m[3]=r):r=m[3],m[4]!==l||m[5]!==r?(s=(0,t.jsxs)(X.FlexCenter,{className:"gap-1",children:[l,r]}),m[4]=l,m[5]=r,m[6]=s):s=m[6],m[7]!==u?(a=(0,t.jsx)(eh.TextBody,{color:"text-secondary",size:"sm",children:u}),m[7]=u,m[8]=a):a=m[8],m[9]!==s||m[10]!==a?(i=(0,t.jsxs)(n.FlexColumn,{className:"gap-2",children:[s,a]}),m[9]=s,m[10]=a,m[11]=i):i=m[11],m[12]!==h?(o=(0,t.jsx)("div",{className:"w-full",children:h}),m[12]=h,m[13]=o):o=m[13],m[14]!==i||m[15]!==o?(c=(0,t.jsx)(tu.Container,{className:"h-full rounded-lg border border-1 border-border-1 bg-bg-primary p-3 shadow-xs lg:px-3",children:(0,t.jsxs)(n.FlexColumn,{className:"h-full justify-between gap-4",children:[i,o]})}),m[14]=i,m[15]=o,m[16]=c):c=m[16],c}function tx(){let e,l,r,s,n,a=(0,f.c)(12),i=(0,A.useTranslations)("HelpCenterCard");return a[0]!==i?(e=i("visitHelpCenter"),a[0]=i,a[1]=e):e=a[1],a[2]!==e?(l=(0,t.jsx)(I.Button,{className:"w-full",href:td.SUPPORT_URL,size:"sm",variant:"secondary",children:e}),a[2]=e,a[3]=l):l=a[3],a[4]!==i?(r=i("description"),a[4]=i,a[5]=r):r=a[5],a[6]!==i?(s=i("title"),a[6]=i,a[7]=s):s=a[7],a[8]!==l||a[9]!==r||a[10]!==s?(n=(0,t.jsx)(th,{cta:l,description:r,icon:tm,title:s}),a[8]=l,a[9]=r,a[10]=s,a[11]=n):n=a[11],n}var tp=e.i(875991),tg=e.i(459527),tf=e.i(284296),tj=e.i(722934),tC=e.i(227360),ty=e.i(670383),tS=e.i(187225),tN=e.i(207653);let tb=(0,r.graphql)(`
  mutation NewsletterCardSubsribeMutation($email: String!) {
    newsletterSubscribe(email: $email)
  }
`),tv=tN.z.object({email:tN.z.string().min(1,"Email is required.").email().optional()});function tk(){let e,l,r,s,n,a,i=(0,f.c)(21),o=(0,A.useTranslations)("NewsletterCard"),[c,m]=(0,ty.useState)(!1),[,d]=(0,tg.useMutation)(tb);i[0]===Symbol.for("react.memo_cache_sentinel")?(e={defaultValues:{email:void 0},resolver:(0,tp.zodResolver)(tv),mode:"onSubmit"},i[0]=e):e=i[0];let{register:u,formState:h,getValues:x,trigger:p,setError:g}=(0,tS.useForm)(e);i[1]!==x||i[2]!==d||i[3]!==g||i[4]!==o||i[5]!==p?(l=async()=>{let e=await p("email"),t=x("email");e&&t&&((await d({email:t})).error?g("email",{message:o("signUpFailure")}):m(!0))},i[1]=x,i[2]=d,i[3]=g,i[4]=o,i[5]=p,i[6]=l):l=i[6];let j=l;return i[7]!==h||i[8]!==j||i[9]!==u||i[10]!==c||i[11]!==o?(r=(0,t.jsx)(X.FlexCenter,{className:"gap-2",children:c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(tj.Check,{className:"min-h-[24px] min-w-[24px] text-success-1",size:24}),(0,t.jsx)(eh.TextBody,{className:"text-sm",children:o("signUpSuccess")})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(tf.Input,{error:!!h.errors.email,placeholder:o("emailPlaceholder"),size:"sm",...u("email"),onKeyDown:async e=>{"Enter"===e.key&&await j()}}),(0,t.jsx)(I.Button,{onClick:j,size:"sm",children:o("signUp")})]})}),i[7]=h,i[8]=j,i[9]=u,i[10]=c,i[11]=o,i[12]=r):r=i[12],i[13]!==o?(s=o("description"),i[13]=o,i[14]=s):s=i[14],i[15]!==o?(n=o("title"),i[15]=o,i[16]=n):n=i[16],i[17]!==r||i[18]!==s||i[19]!==n?(a=(0,t.jsx)(th,{cta:r,description:s,icon:tC.Mail,title:n}),i[17]=r,i[18]=s,i[19]=n,i[20]=a):a=i[20],a}var tT=e.i(247008),tw=e.i(707650);function tF(){let e,l,r,s,n=(0,f.c)(11),a=(0,A.useTranslations)("SupportCard"),i=(0,tw.useIntercom)();n[0]!==i||n[1]!==a?(e=i.isEnabled?(0,t.jsx)(I.Button,{className:"w-full",onClick:()=>{i.boot(),i.show()},size:"sm",variant:"secondary",children:a("contactSupport")}):(0,t.jsx)(I.Button,{className:"w-full",href:td.SUPPORT_URL,size:"sm",variant:"secondary",children:a("contactSupport")}),n[0]=i,n[1]=a,n[2]=e):e=n[2];let o=e;return n[3]!==a?(l=a("description"),n[3]=a,n[4]=l):l=n[4],n[5]!==a?(r=a("title"),n[5]=a,n[6]=r):r=n[6],n[7]!==o||n[8]!==l||n[9]!==r?(s=(0,t.jsx)(th,{cta:o,description:l,icon:tT.ContactSupport,title:r}),n[7]=o,n[8]=l,n[9]=r,n[10]=s):s=n[10],s}function t_(e){let l,r,s,i=(0,f.c)(4),{className:o}=e;return i[0]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(a.Media,{lessThan:"md",children:(0,t.jsxs)(n.FlexColumn,{className:"gap-3",children:[(0,t.jsx)(tk,{}),(0,t.jsx)(tx,{}),(0,t.jsx)(tF,{})]})}),i[0]=l):l=i[0],i[1]===Symbol.for("react.memo_cache_sentinel")?(r=(0,t.jsx)(a.Media,{greaterThanOrEqual:"md",children:(0,t.jsxs)(X.FlexCenter,{className:"gap-3",children:[(0,t.jsx)(tk,{}),(0,t.jsx)(tx,{}),(0,t.jsx)(tF,{})]})}),i[1]=r):r=i[1],i[2]!==o?(s=(0,t.jsxs)(to,{className:o,children:[l,r]}),i[2]=o,i[3]=s):s=i[3],s}var tL=e.i(351144),tP=e.i(718993),tI=e.i(590184),tB=e.i(920296),tD=e.i(607172),tE=e.i(666625),tM=e.i(491150);function tA(e){let l,r,s,a,i=(0,f.c)(9),{imageUrl:o,title:c,link:m}=e;return i[0]===Symbol.for("react.memo_cache_sentinel")?(l=(0,Q.classNames)((0,eX.scaleTransformVariants)({group:!0,shadow:!0}),"overflow-hidden rounded-lg",(0,eW.insetBorderVariants)({positioning:"absolute"})),i[0]=l):l=i[0],i[1]!==o?(r=(0,t.jsx)("div",{className:"relative aspect-16/9",children:(0,t.jsx)(eM.BannerMedia,{className:l,height:300,url:o,width:600})}),i[1]=o,i[2]=r):r=i[2],i[3]!==c?(s=(0,t.jsx)(n.FlexColumn,{className:"py-3",children:(0,t.jsx)(eh.TextBody,{color:"text-primary",size:"sm",weight:"semibold",children:c})}),i[3]=c,i[4]=s):s=i[4],i[5]!==m||i[6]!==r||i[7]!==s?(a=(0,t.jsxs)(tM.Link,{href:m,target:"_blank",children:[r,s]}),i[5]=m,i[6]=r,i[7]=s,i[8]=a):a=i[8],a}function tV(){let e,l,r,s,n,i,o,c,m,d,u,h,x,p,g,j,C,y,S,N,b,v,k,T,w,F,_=(0,f.c)(20),{api:L,slidesInView:P,setApi:I,shouldRenderSlide:B}=(0,tE.useSlidesInView)(tI.collectionsListRemainingContentClassName.length);_[0]===Symbol.for("react.memo_cache_sentinel")?(e={align:"center",breakpoints:{"2xl":{align:tz}}},_[0]=e):e=_[0];let D=e,[E,M]=(0,ty.useState)(!1),V=(w=(0,f.c)(41),F=(0,A.useTranslations)("LearnCenterCarousel"),w[0]!==F?(c=F("whatIsNft"),w[0]=F,w[1]=c):c=w[1],w[2]!==c?(m={imageUrl:tD.LEARN_WHAT_IS_NFT,title:c,link:"nft/what-are-nfts"},w[2]=c,w[3]=m):m=w[3],w[4]!==F?(d=F("howToBuyNft"),w[4]=F,w[5]=d):d=w[5],w[6]!==d?(u={imageUrl:tD.LEARN_HOW_TO_BUY_NFT,title:d,link:"nft/how-to-buy-nft"},w[6]=d,w[7]=u):u=w[7],w[8]!==F?(h=F("whatIsMinting"),w[8]=F,w[9]=h):h=w[9],w[10]!==h?(x={imageUrl:tD.LEARN_WHAT_IS_MINTING,title:h,link:"nft/what-is-minting-nft"},w[10]=h,w[11]=x):x=w[11],w[12]!==F?(p=F("howToStayProtectedInWeb3"),w[12]=F,w[13]=p):p=w[13],w[14]!==p?(g={imageUrl:tD.LEARN_STAY_PROTECTED_WEB3,title:p,link:"web3/how-to-stay-protected-in-web3"},w[14]=p,w[15]=g):g=w[15],w[16]!==F?(j=F("howToCreateNft"),w[16]=F,w[17]=j):j=w[17],w[18]!==j?(C={imageUrl:tD.LEARN_HOW_TO_CREATE_NFT,title:j,link:"nft/how-to-create-an-nft"},w[18]=j,w[19]=C):C=w[19],w[20]!==F?(y=F("howToSellNft"),w[20]=F,w[21]=y):y=w[21],w[22]!==y?(S={imageUrl:tD.LEARN_HOW_TO_SELL_NFT,title:y,link:"nft/how-to-sell-nfts"},w[22]=y,w[23]=S):S=w[23],w[24]!==F?(N=F("whatIsCryptoWallet"),w[24]=F,w[25]=N):N=w[25],w[26]!==N?(b={imageUrl:tD.LEARN_WHAT_IS_CRYPTO_WALLET,title:N,link:"web3/what-is-crypto-wallet"},w[26]=N,w[27]=b):b=w[27],w[28]!==F?(v=F("whoIsOpensea"),w[28]=F,w[29]=v):v=w[29],w[30]!==v?(k={imageUrl:tD.LEARN_WHO_IS_OPENSEA,title:v,link:"nft/who-is-opensea"},w[30]=v,w[31]=k):k=w[31],w[32]!==m||w[33]!==S||w[34]!==b||w[35]!==k||w[36]!==u||w[37]!==x||w[38]!==g||w[39]!==C?(T=[m,u,x,g,C,S,b,k],w[32]=m,w[33]=S,w[34]=b,w[35]=k,w[36]=u,w[37]=x,w[38]=g,w[39]=C,w[40]=T):T=w[40],T);_[1]===Symbol.for("react.memo_cache_sentinel")?(l=e=>{let{canScrollNext:t}=e;M(!t)},_[1]=l):l=_[1];let z=E?"none":"right";if(_[2]!==L||_[3]!==V||_[4]!==B||_[5]!==P){let e;_[7]!==L||_[8]!==B||_[9]!==P?(e=(e,l)=>(0,t.jsx)(tL.CarouselItem,{className:(0,Q.classNames)("group mr-3 basis-[calc(100%-76px)] pl-0 transition-opacity duration-200 will-change-opacity md:mr-4 md:basis-[calc(100%-70px)] lg:basis-[300px]",L&&P.includes(l)||!L?"opacity-100":"opacity-20"),children:B(l)&&(0,t.jsx)(tA,{imageUrl:e.imageUrl,link:`${td.LEARN_URL}/${e.link}`,title:e.title})},e.title),_[7]=L,_[8]=B,_[9]=P,_[10]=e):e=_[10],r=V.map(e),_[2]=L,_[3]=V,_[4]=B,_[5]=P,_[6]=r}else r=_[6];return _[11]!==r?(s=(0,t.jsx)(tL.CarouselContent,{allowOverflow:!0,className:"pl-4 md:pl-6 lg:pl-0",children:r}),_[11]=r,_[12]=s):s=_[12],_[13]!==z||_[14]!==s?(n=(0,t.jsx)(O.HomepageShelfMask,{side:z,children:s}),_[13]=z,_[14]=s,_[15]=n):n=_[15],_[16]===Symbol.for("react.memo_cache_sentinel")?(i=(0,t.jsx)(a.Media,{greaterThan:"lg",children:(0,t.jsxs)(tP.CarouselNavigationArrows,{size:"lg",children:[(0,t.jsx)(tP.CarouselNavigationArrowsPrevious,{className:"w-8"}),(0,t.jsx)(tP.CarouselNavigationArrowsNext,{className:"w-8"})]})}),_[16]=i):i=_[16],_[17]!==I||_[18]!==n?(o=(0,t.jsxs)(tL.Carousel,{onScroll:l,options:D,setApi:I,children:[n,i]}),_[17]=I,_[18]=n,_[19]=o):o=_[19],o}function tz(e){return(0,tB.calculateCarouselAlignment)({viewSize:e,visibleSlides:3,offset:-18})}function tq(e){let l,r,s,a,i,o,c,m=(0,f.c)(16),{carousel:d,className:u}=e,h=(0,A.useTranslations)("LearnCenterShelf");return m[0]!==u?(l=(0,Q.classNames)((0,W.discoverShelfVariants)().container(),u),m[0]=u,m[1]=l):l=m[1],m[2]!==h?(r=h("description"),m[2]=h,m[3]=r):r=m[3],m[4]!==h?(s=h("nft101"),m[4]=h,m[5]=s):s=m[5],m[6]!==r||m[7]!==s?(a=(0,t.jsx)(G.ShelfHeader,{description:r,title:s}),m[6]=r,m[7]=s,m[8]=a):a=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(i=(0,K.fullBleedVariants)({mobileOnly:!0}),m[9]=i):i=m[9],m[10]!==d?(o=(0,t.jsx)("div",{className:i,children:d}),m[10]=d,m[11]=o):o=m[11],m[12]!==l||m[13]!==a||m[14]!==o?(c=(0,t.jsxs)(n.FlexColumn,{className:l,"data-testid":"LearnCenterShelf",children:[a,o]}),m[12]=l,m[13]=a,m[14]=o,m[15]=c):c=m[15],c}function tU(e){let l,r,s=(0,f.c)(3),{className:n}=e;return s[0]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(tV,{}),s[0]=l):l=s[0],s[1]!==n?(r=(0,t.jsx)(tq,{carousel:l,className:n}),s[1]=n,s[2]=r):r=s[2],r}e.i(786174);var tO=e.i(817562),t$=e.i(204083);let tR=(0,r.graphql)(`
    query SpotlightShelfQuery($category: String, $chain: ChainIdentifier) {
      discoverPageConfiguration(category: $category, chain: $chain) {
        id
        featuredCollections {
          id
          ...SpotlightCarousel
        }
      }
    }
  `,[t$.SpotlightCarouselFragment]),tH={ttl:i.TTL["5m"]},tQ=(0,c.withSuspense)(({category:e,chain:r})=>{let[{data:s}]=(0,l.useQuery)({query:tR,variables:{category:e,chain:r},context:tH}),n=s?.discoverPageConfiguration?.featuredCollections??[];return 0===n.length?null:(0,t.jsx)(tO.SpotlightCarousel,{collections:n})},{fallback:(0,t.jsx)(T,{})});var tK=e.i(28155),tW=e.i(378874),tG=e.i(678537),tY=e.i(831294);let tZ=(0,r.graphql)(`
    query StatsShelfTokensQuery(
      $filter: CurrenciesFilter!
      $limit: Int!
      $sort: CurrenciesSort!
      $slug: CurrencySlug
    ) {
      topCurrenciesV2(filter: $filter, limit: $limit, sort: $sort, slug: $slug) {
        items {
          __typename
          ... on CurrencyV2 {
            id
            ...CurrencyV2Lockup
            ...CurrencyV2Link
            ...CurrencyStatsTableRowPrice
            ...CurrencyStatsTableRowOneDayPriceChange
          }
        }
      }
    }
  `,[e_.CurrencyV2LockupFragment,eP.CurrencyV2LinkFragment,tG.CurrencyStatsTableRowPriceFragment,tW.CurrencyStatsTableRowOneDayPriceChangeFragment]);function tX(e){return(0,t.jsx)(ez.CurrencyLink,{className:"cursor-pointer *:bg-transparent hover:bg-bg-additional-1-transparent active:bg-bg-additional-2-transparent",currency:e,variant:"unstyled",children:(0,t.jsxs)(X.FlexCenter,{className:"justify-between",children:[(0,t.jsxs)(X.FlexCenter,{className:"min-w-0 gap-1.5",children:[(0,t.jsx)(eD.CurrencyLockup,{className:"w-auto",currency:e,size:"md",children:(0,t.jsx)(eD.CurrencyLockupAvatar,{})}),(0,t.jsx)(tK.TextOverflowTooltip,{children:(0,t.jsx)(eD.CurrencyLockup,{currency:e,showAvatar:!1,showNewChip:!1,size:"sm"})})]}),(0,t.jsxs)(n.FlexColumn,{className:"items-end font-mono",children:[(0,t.jsx)(tG.CurrencyStatsTableRowPrice,{currency:e}),(0,t.jsx)(tW.CurrencyStatsTableRowOneDayPriceChange,{currency:e})]})]})},e.id)}function tJ(e){return e&&e?.__typename==="CurrencyV2"}let t0=(0,c.withSuspense)(function(e){let r,s,a,i,o,c,m,d,u=(0,f.c)(15),{chain:h}=e;u[0]!==h?(r=h?[h]:void 0,u[0]=h,u[1]=r):r=u[1],u[2]!==r?(s={chains:r,swappable:!0},u[2]=r,u[3]=s):s=u[3],u[4]===Symbol.for("react.memo_cache_sentinel")?(a={by:"SCORE",direction:"DESC"},u[4]=a):a=u[4],u[5]!==s?(i={query:tZ,variables:{filter:s,sort:a,limit:5,slug:"TRENDING_BY_SCORE"}},u[5]=s,u[6]=i):i=u[6];let[x]=(0,l.useQuery)(i),{data:p}=x;if(u[7]!==p?.topCurrenciesV2.items){let e=p?.topCurrenciesV2.items.filter(tJ)??[];o=n.FlexColumn,c="gap-3",m=e.map(tX),u[7]=p?.topCurrenciesV2.items,u[8]=o,u[9]=c,u[10]=m}else o=u[8],c=u[9],m=u[10];return u[11]!==o||u[12]!==c||u[13]!==m?(d=(0,t.jsx)(o,{className:c,children:m}),u[11]=o,u[12]=c,u[13]=m,u[14]=d):d=u[14],d},{fallback:(0,t.jsx)(function(e){let l,r,s=(0,f.c)(7),{rows:n}=e,a=void 0===n?5:n,{tableView:i}=(0,tY.useStatsTableView)(),o="tableCompact"===i;if(s[0]!==o||s[1]!==a){let e;s[3]!==o?(e=e=>(0,t.jsxs)(_.Flex,{className:"items-center justify-between",children:[(0,t.jsxs)(_.Flex,{className:"min-w-0 items-center gap-2",children:[(0,t.jsx)(j.SkeletonBlock,{className:o?"h-6 w-6 rounded":"h-10 w-10 rounded"}),(0,t.jsx)(j.SkeletonBlock,{className:"h-3 w-1/2 rounded"})]}),(0,t.jsxs)(_.Flex,{className:"w-1/3 flex-col items-end gap-2",children:[(0,t.jsx)(j.SkeletonBlock,{className:"h-3 w-2/3 rounded"}),(0,t.jsx)(j.SkeletonBlock,{className:"h-3 w-1/3 rounded"})]})]},e),s[3]=o,s[4]=e):e=s[4],l=(0,y.range)(a).map(e),s[0]=o,s[1]=a,s[2]=l}else l=s[2];return s[5]!==l?(r=(0,t.jsx)(_.Flex,{className:"flex-col gap-2",children:l}),s[5]=l,s[6]=r):r=s[6],r},{})});var t1=e.i(34331),t2=e.i(600045);let t3=(0,r.graphql)(`
    fragment StatsListRow on Collection {
      id
      floorPrice {
        pricePerItem {
          token {
            unit
          }
          ...TokenPrice
        }
      }
      ...StatsTableRowFloorChange
      ...CollectionLink
      ...CollectionLockup
    }
  `,[x.CollectionLinkFragment,d.TokenPriceFragment,t2.StatsTableRowFloorChangeFragment,m.CollectionLockupFragment]);function t4(e){let l,r,s,n,a,i,o,c,m,d=(0,f.c)(19),{collection:u}=e;d[0]!==u?(l=(0,ea.readFragment)(t3,u),d[0]=u,d[1]=l):l=d[1];let h=l;d[2]===Symbol.for("react.memo_cache_sentinel")?(r=(0,t.jsx)(eo.CollectionLockupAvatar,{}),d[2]=r):r=d[2],d[3]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsx)(ec.CollectionLockupContent,{children:(0,t.jsx)(eo.CollectionLockupTitle,{className:"truncate",disableTextOverflowTooltip:!0})}),d[3]=s):s=d[3],d[4]!==h?(n=(0,t.jsxs)(eo.CollectionLockup,{className:"max-w-[65%]",collection:h,size:"lg",children:[r,s]}),d[4]=h,d[5]=n):n=d[5];let x=h.floorPrice?.pricePerItem.token.unit,p=h.floorPrice?.pricePerItem;return d[6]!==p?(a=(0,t.jsx)(em.TokenPrice,{display:"compact",price:p}),d[6]=p,d[7]=a):a=d[7],d[8]!==x||d[9]!==a?(i=(0,t.jsx)(t1.ChangeAnimation,{display:"compact",value:x,children:a}),d[8]=x,d[9]=a,d[10]=i):i=d[10],d[11]!==h?(o=(0,t.jsx)(t2.StatsTableRowFloorChange,{collection:h,timeframe:"ONE_DAY"}),d[11]=h,d[12]=o):o=d[12],d[13]!==i||d[14]!==o?(c=(0,t.jsxs)(_.Flex,{className:"flex-col items-end font-mono text-sm",children:[i,o]}),d[13]=i,d[14]=o,d[15]=c):c=d[15],d[16]!==c||d[17]!==n?(m=(0,t.jsxs)(_.Flex,{className:"justify-between",children:[n,c]}),d[16]=c,d[17]=n,d[18]=m):m=d[18],m}let t5=(0,r.graphql)(`
    fragment StatsList on Collection {
      id
      ...StatsListRow
      ...CollectionLink
    }
  `,[x.CollectionLinkFragment,t3]);function t6({collections:e}){return 0===e.length?null:e.map(e=>{let l=(0,ea.readFragment)(t5,e);return(0,t.jsx)(ej.CollectionLink,{className:"cursor-pointer *:bg-transparent hover:bg-bg-additional-1-transparent active:bg-bg-additional-2-transparent",collection:l,children:(0,t.jsx)(t4,{collection:l})},l.id)})}let t8=(0,r.graphql)(`
    query TopStatsListQuery(
      $filter: TopCollectionsFilter
      $category: CategoryIdentifier
    ) {
      topCollections(
        limit: 5
        sort: { by: ONE_DAY_VOLUME, direction: DESC }
        filter: $filter
        category: $category
      ) {
        items {
          id
          ...StatsList
        }
      }
    }
  `,[t5]),t7=(0,c.withSuspense)(({category:e,chain:r})=>{let[s]=(0,l.useQuery)({query:t8,variables:{filter:{chain:r},category:e}}),n=s.data?.topCollections.items??[];return(0,t.jsx)(t6,{collections:n})},{fallback:(0,t.jsx)(L,{}),errorFallback:(0,t.jsx)(L,{})});function t9(e){let l,r,s,n=(0,f.c)(10),{category:a,chain:i}=e,[o,c]=(0,ty.useState)("nfts");return n[0]!==a||n[1]!==o?(l=(0,t.jsx)(V,{category:a,setShelfTypeAction:c,shelfType:o}),n[0]=a,n[1]=o,n[2]=l):l=n[2],n[3]!==a||n[4]!==i||n[5]!==o?(r="tokens"===o?(0,t.jsx)(t0,{chain:i}):(0,t.jsx)(t7,{category:a,chain:i}),n[3]=a,n[4]=i,n[5]=o,n[6]=r):r=n[6],n[7]!==l||n[8]!==r?(s=(0,t.jsxs)(_.Flex,{className:"mt-1 flex-col gap-4",children:[l,r]}),n[7]=l,n[8]=r,n[9]=s):s=n[9],s}let le=(0,r.graphql)(`
    query HomePageTopMoversQuery(
      $category: CategoryIdentifier
      $chain: ChainIdentifier
    ) {
      collectionTopMovers(limit: 15, category: $category, chain: $chain) {
        id
        ...HomeFeaturedCollectionsCarousel
      }
    }
  `,[g]),lt={ttl:i.TTL["5m"]},ll=(0,c.withSuspense)(({className:e,category:r,chain:s})=>{let[{data:n}]=(0,l.useQuery)({query:le,variables:{category:r,chain:s},context:lt}),a=n?.collectionTopMovers??[],i=(0,A.useTranslations)("TopMoversShelf");return 0===a.length?null:(0,t.jsx)(eT,{carousel:(0,t.jsx)(eS,{items:a}),className:e,dataTestId:"TopMoversShelf",description:i("description"),title:i("topMoversToday")})},{fallback:(0,t.jsx)(function(){let e,l,r,s,n=(0,f.c)(8),a=(0,A.useTranslations)("TopMoversShelf");return n[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(ev,{}),n[0]=e):e=n[0],n[1]!==a?(l=a("description"),n[1]=a,n[2]=l):l=n[2],n[3]!==a?(r=a("topMoversToday"),n[3]=a,n[4]=r):r=n[4],n[5]!==l||n[6]!==r?(s=(0,t.jsx)(eT,{carousel:e,description:l,title:r}),n[5]=l,n[6]=r,n[7]=s):s=n[7],s},{})});var lr=e.i(788331),ls=e.i(535374);function ln(e){let l,r,s,n,i,o,c,m,d=(0,f.c)(21),{slides:u}=e,{api:h,slidesInView:x,setApi:p,shouldRenderSlide:g}=(0,tE.useSlidesInView)(u.length);d[0]===Symbol.for("react.memo_cache_sentinel")?(l={md:{align:li},"2xl":{align:la}},d[0]=l):l=d[0];let j=l,[C,y]=(0,ty.useState)(!1);d[1]===Symbol.for("react.memo_cache_sentinel")?(r={align:"center",breakpoints:j},d[1]=r):r=d[1];let S=r;d[2]===Symbol.for("react.memo_cache_sentinel")?(s=e=>{let{canScrollNext:t}=e;y(!t)},d[2]=s):s=d[2];let N=C?"none":"right";if(d[3]!==h||d[4]!==g||d[5]!==u||d[6]!==x){let e;d[8]!==h||d[9]!==g||d[10]!==x?(e=(e,l)=>(0,t.jsx)(tL.CarouselItem,{className:(0,Q.classNames)("transition-opacity duration-200 will-change-opacity",h&&x.includes(l)||!h?"opacity-100":"opacity-20","mr-3 pl-0 md:mr-4","basis-[300px]"),children:g(l)&&e},l),d[8]=h,d[9]=g,d[10]=x,d[11]=e):e=d[11],n=u.map(e),d[3]=h,d[4]=g,d[5]=u,d[6]=x,d[7]=n}else n=d[7];return d[12]!==n?(i=(0,t.jsx)(tL.CarouselContent,{allowOverflow:!0,className:"pl-4 md:pl-6 lg:pl-0",children:n}),d[12]=n,d[13]=i):i=d[13],d[14]!==N||d[15]!==i?(o=(0,t.jsx)(O.HomepageShelfMask,{className:"-mt-3 pt-3",side:N,children:i}),d[14]=N,d[15]=i,d[16]=o):o=d[16],d[17]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsx)(a.Media,{greaterThan:"md",children:(0,t.jsxs)(tP.CarouselNavigationArrows,{size:"lg",children:[(0,t.jsx)(tP.CarouselNavigationArrowsPrevious,{className:"w-8"}),(0,t.jsx)(tP.CarouselNavigationArrowsNext,{className:"w-8"})]})}),d[17]=c):c=d[17],d[18]!==p||d[19]!==o?(m=(0,t.jsxs)(tL.Carousel,{onScroll:s,options:S,setApi:p,children:[o,c]}),d[18]=p,d[19]=o,d[20]=m):m=d[20],m}function la(e){return(0,tB.calculateCarouselAlignment)({viewSize:e,visibleSlides:3,offset:-16})}function li(e){return(0,tB.calculateCarouselAlignment)({viewSize:e,visibleSlides:2})}var lo=e.i(601056),lc=e.i(519078),lm=e.i(194153);let ld=(0,eJ.tv)({slots:{container:"size-20 shrink-0",avatar:""},variants:{variant:{default:{container:"overflow-hidden rounded-l-lg",avatar:"border-border-1-transparent border-r"},currency:{container:"",avatar:"inset-shadow-border size-12 rounded-full"}}}});function lu(e){let l,r,s,n,a,i,o,c,m,d,u=(0,f.c)(25),{src:h,alt:x,priority:p,frameTime:g,badge:j,variant:C}=e,y=void 0===C?"default":C;if(u[0]!==x||u[1]!==j||u[2]!==y){let{container:e,avatar:t}=ld({variant:y});s="currency"===y?48:80,r=lm.CenterAligned,c=e(),l=lo.ItemAvatar,n=x,a=j,i="currency"===y,o=t(),u[0]=x,u[1]=j,u[2]=y,u[3]=l,u[4]=r,u[5]=s,u[6]=n,u[7]=a,u[8]=i,u[9]=o,u[10]=c}else l=u[3],r=u[4],s=u[5],n=u[6],a=u[7],i=u[8],o=u[9],c=u[10];let S=h??void 0;return u[11]!==l||u[12]!==s||u[13]!==g||u[14]!==p||u[15]!==n||u[16]!==a||u[17]!==i||u[18]!==o||u[19]!==S?(m=(0,t.jsx)(l,{alt:n,badge:a,border:i,className:o,frameTime:g,priority:p,size:s,src:S}),u[11]=l,u[12]=s,u[13]=g,u[14]=p,u[15]=n,u[16]=a,u[17]=i,u[18]=o,u[19]=S,u[20]=m):m=u[20],u[21]!==r||u[22]!==c||u[23]!==m?(d=(0,t.jsx)(r,{className:c,children:m}),u[21]=r,u[22]=c,u[23]=m,u[24]=d):d=u[24],d}function lh(e){let l,r=(0,f.c)(2),{children:s}=e;return r[0]!==s?(l=(0,t.jsx)(lc.ItemDescription,{className:"flex items-center gap-2",children:s}),r[0]=s,r[1]=l):l=r[1],l}let lx=lc.ItemContent,lp=lc.ItemSide;function lg(e){let l,r=(0,f.c)(2),{children:s}=e;return r[0]!==s?(l=(0,t.jsx)("div",{className:"border-border-1-transparent border-t px-4 py-2 empty:hidden",children:s}),r[0]=s,r[1]=l):l=r[1],l}function lf(e){let l,r,s,a=(0,f.c)(9),{children:i,className:o,footer:c}=e,m=c?"overflow-visible":"overflow-hidden pr-4";return a[0]!==o||a[1]!==m?(l=(0,Q.classNames)("items-stretch rounded-lg border border-border-1-transparent bg-bg-primary-transparent text-text-primary",m,(0,eX.scaleTransformVariants)({shadow:!0}),o),a[0]=o,a[1]=m,a[2]=l):l=a[2],a[3]!==i||a[4]!==c?(r=c?(0,t.jsxs)(n.FlexColumn,{className:"w-full",children:[(0,t.jsx)(_.Flex,{className:"items-stretch gap-3 pr-4",children:i}),c]}):i,a[3]=i,a[4]=c,a[5]=r):r=a[5],a[6]!==l||a[7]!==r?(s=(0,t.jsx)(lo.Item,{className:l,variant:"unstyled",children:r}),a[6]=l,a[7]=r,a[8]=s):s=a[8],s}var lj=e.i(859438),lC=e.i(73868);e.i(676104);var ly=e.i(177464),lS=e.i(628946);let lN=(0,r.graphql)(`
    fragment TopPerpetualsCarouselItem on PerpetualFutureV2 {
      id
      symbol
      name
      imageUrl
      maxLeverage
      chainIdentifier
      stats {
        markPrice
        priceUsd
        fundingRate
        openInterest
        priceChangePercent24h
      }
      tokenGroup {
        primaryCurrency {
          name
        }
      }
      ...PerpetualLink
    }
  `,[lS.PerpetualLinkFragment]);function lb(e){let l,r,s=(0,f.c)(4),{items:n}=e;s[0]!==n?(l=n.map(lv),s[0]=n,s[1]=l):l=s[1];let a=l;return s[2]!==a?(r=(0,t.jsx)(ln,{slides:a}),s[2]=a,s[3]=r):r=s[3],r}function lv(e){let l=(0,ea.readFragment)(lN,e);return(0,t.jsx)(lk,{perpetual:e},l.id)}function lk(e){let l,r,s,a,i,o,c,m,d,u,h,x,p,g,j,C,y,S,N,b,v,k,T,w,F,L,P,I,B,D,E=(0,f.c)(75),{perpetual:M}=e,V=(0,ea.readFragment)(lN,M),z=(0,A.useTranslations)("TopPerpetualsCarousel"),q=(0,ls.useNumberFormatter)(),{data:O}=(0,lj.useActiveAssetCtx)({currencySymbol:V.symbol}),$=V.tokenGroup?.primaryCurrency.name??V.name,R=O?.ctx.markPx??(V.stats?.priceUsd!=null?Number(V.stats.priceUsd):void 0),H=O?.ctx.funding??V.stats?.fundingRate,K=O?O.ctx.openInterest*O.ctx.markPx:V.stats?.openInterest!=null?Number(V.stats.openInterest):void 0;E[0]===Symbol.for("react.memo_cache_sentinel")?(l=(0,Q.classNames)("max-w-[400px] gap-2 rounded-xl border border-border-1-transparent bg-bg-primary-transparent p-3",(0,eX.scaleTransformVariants)({shadow:!0})),E[0]=l):l=E[0],E[1]!==$||E[2]!==V.imageUrl?(r=V.imageUrl?(0,t.jsx)("img",{alt:$??"",className:"size-6 shrink-0 rounded-full",onError:lT,src:V.imageUrl}):null,E[1]=$,E[2]=V.imageUrl,E[3]=r):r=E[3],E[4]!==$?(s=(0,t.jsx)(eh.TextBody,{className:"truncate font-semibold",size:"sm",children:$}),E[4]=$,E[5]=s):s=E[5],E[6]!==V.symbol?(a=(0,t.jsx)(eh.TextBody,{className:"shrink-0 text-text-secondary",size:"sm",children:V.symbol}),E[6]=V.symbol,E[7]=a):a=E[7],E[8]!==r||E[9]!==s||E[10]!==a?(i=(0,t.jsxs)(_.Flex,{className:"min-w-0 items-center gap-2",children:[r,s,a]}),E[8]=r,E[9]=s,E[10]=a,E[11]=i):i=E[11];let W=V.maxLeverage;E[12]!==z?(o=z("leverage"),E[12]=z,E[13]=o):o=E[13],E[14]!==V.maxLeverage||E[15]!==o?(c=(0,t.jsxs)(ed.Chip,{className:"shrink-0 font-mono uppercase",variant:"frosted",children:[W,"x ",o]}),E[14]=V.maxLeverage,E[15]=o,E[16]=c):c=E[16],E[17]!==i||E[18]!==c?(m=(0,t.jsxs)(U.SpaceBetween,{className:"items-center",children:[i,c]}),E[17]=i,E[18]=c,E[19]=m):m=E[19],E[20]!==z?(d=z("mark"),E[20]=z,E[21]=d):d=E[21],E[22]!==d?(u=(0,t.jsx)(ly.StatDisplayItemLabel,{children:d}),E[22]=d,E[23]=u):u=E[23],E[24]!==z?(h=z("markPrice"),E[24]=z,E[25]=h):h=E[25],E[26]!==R?(x=(0,t.jsx)(eE.NumberDisplay,{bounded:!1,display:"usd",value:R}),E[26]=R,E[27]=x):x=E[27],E[28]!==R||E[29]!==x?(p=(0,t.jsx)(ly.StatDisplayItemValue,{children:(0,t.jsx)(t1.ChangeAnimation,{display:"usd",value:R,children:x})}),E[28]=R,E[29]=x,E[30]=p):p=E[30],E[31]!==h||E[32]!==p?(g=(0,t.jsx)(ex.Tooltip,{content:h,children:p}),E[31]=h,E[32]=p,E[33]=g):g=E[33],E[34]!==u||E[35]!==g?(j=(0,t.jsxs)(ly.StatDisplayItem,{className:"items-start",children:[u,g]}),E[34]=u,E[35]=g,E[36]=j):j=E[36],E[37]!==z?(C=z("funding"),E[37]=z,E[38]=C):C=E[38],E[39]!==C?(y=(0,t.jsx)(ly.StatDisplayItemLabel,{children:C}),E[39]=C,E[40]=y):y=E[40],E[41]!==z?(S=z("fundingRate"),E[41]=z,E[42]=S):S=E[42];let G=null!=H?`${q(100*Number(H))}%`:"-";return E[43]!==G?(N=(0,t.jsx)(ly.StatDisplayItemValue,{children:G}),E[43]=G,E[44]=N):N=E[44],E[45]!==S||E[46]!==N?(b=(0,t.jsx)(ex.Tooltip,{content:S,children:N}),E[45]=S,E[46]=N,E[47]=b):b=E[47],E[48]!==y||E[49]!==b?(v=(0,t.jsxs)(ly.StatDisplayItem,{className:"items-center",children:[y,b]}),E[48]=y,E[49]=b,E[50]=v):v=E[50],E[51]!==z?(k=z("openInt"),E[51]=z,E[52]=k):k=E[52],E[53]!==k?(T=(0,t.jsx)(ly.StatDisplayItemLabel,{children:k}),E[53]=k,E[54]=T):T=E[54],E[55]!==z?(w=z("openInterest"),E[55]=z,E[56]=w):w=E[56],E[57]!==K?(F=(0,t.jsx)(ly.StatDisplayItemValue,{children:(0,t.jsx)(eE.NumberDisplay,{bounded:!1,display:"usd-compact",value:K})}),E[57]=K,E[58]=F):F=E[58],E[59]!==w||E[60]!==F?(L=(0,t.jsx)(ex.Tooltip,{content:w,children:F}),E[59]=w,E[60]=F,E[61]=L):L=E[61],E[62]!==T||E[63]!==L?(P=(0,t.jsxs)(ly.StatDisplayItem,{className:"items-end",children:[T,L]}),E[62]=T,E[63]=L,E[64]=P):P=E[64],E[65]!==j||E[66]!==v||E[67]!==P?(I=(0,t.jsxs)(_.Flex,{className:"justify-between",children:[j,v,P]}),E[65]=j,E[66]=v,E[67]=P,E[68]=I):I=E[68],E[69]!==I||E[70]!==m?(B=(0,t.jsxs)(n.FlexColumn,{className:l,children:[m,I]}),E[69]=I,E[70]=m,E[71]=B):B=E[71],E[72]!==V||E[73]!==B?(D=(0,t.jsx)(lC.PerpetualLink,{perpetual:V,variant:"unstyled",children:B}),E[72]=V,E[73]=B,E[74]=D):D=E[74],D}function lT(e){e.currentTarget.src=lr.TRANSPARENT_PIXEL,e.currentTarget.onerror=null}let lw=(0,r.graphql)(`
    query TopPerpetualsShelfQuery($limit: Int!, $sort: PerpetualFutureSort) {
      topPerpetualFutures(limit: $limit, sort: $sort) {
        items {
          id
          imageUrl
          ...TopPerpetualsCarouselItem
        }
      }
    }
  `,[lN]),lF={ttl:i.TTL["5m"]},l_=(0,c.withSuspense)(({className:e})=>{let[{data:r}]=(0,l.useQuery)({query:lw,variables:{limit:12,sort:{by:"VOLUME_24H",direction:"DESC"}},context:lF}),s=(r?.topPerpetualFutures?.items??[]).filter(e=>e.imageUrl);return 0===s.length?null:(0,t.jsx)(Y,{className:e,children:(0,t.jsx)(lb,{items:s})})},{fallback:(0,t.jsx)(Z,{})});var lL=e.i(22764);e.i(513736);var lP=e.i(142804);e.i(804199);var lI=e.i(136746),lB=e.i(702361),lD=e.i(818304);let lE=(0,r.graphql)(`
    fragment TrendingCurrenciesCarouselItem on CurrencyV2 {
      id
      imageUrl
      symbol
      contractAddress
      usdPrice
      chainIdentifier
      stats {
        marketCapUsd
        oneDay {
          volume
          priceChange
        }
      }
      tokenGroup {
        stats {
          marketCapUsd
        }
      }
      chain {
        ...ChainBadge
      }
      ...CurrencyV2Link
      ...CurrencyV2Lockup
      ...CurrencySparkLineChart
    }
  `,[eP.CurrencyV2LinkFragment,eF.ChainBadgeFragment,e_.CurrencyV2LockupFragment,lD.CurrencySparkLineChartFragment]);function lM(e){let l,r,s=(0,f.c)(7),{items:a,clusterSize:i}=e,o=void 0===i?2:i;if(s[0]!==o||s[1]!==a){let e;s[3]!==o?(e=(e,l)=>(0,t.jsx)(n.FlexColumn,{className:"gap-3 md:gap-4",children:e.map((e,r)=>{let s=(0,ea.readFragment)(lE,e);return(0,t.jsx)(lA,{currency:e,index:l*o+r},s.id)})},l),s[3]=o,s[4]=e):e=s[4],l=(0,J.chunk)(a,o).map(e),s[0]=o,s[1]=a,s[2]=l}else l=s[2];let c=l;return s[5]!==c?(r=(0,t.jsx)(ln,{slides:c}),s[5]=c,s[6]=r):r=s[6],r}function lA(e){let l,r,s,n,a,i,c,m,d,u,h,x,p,g,j,C=(0,f.c)(44),{currency:y,index:S}=e;C[0]!==y?(l=(0,ea.readFragment)(lE,y),C[0]=y,C[1]=l):l=C[1];let N=l,b=(0,A.useTranslations)("TrendingCurrenciesCarousel"),v=(0,o.useIsCurrencySocialProofEnabled)();C[2]!==N.contractAddress||C[3]!==N.symbol||C[4]!==S||C[5]!==v?(r=v?{surface:lB.CONTENT_IMPRESSION_SURFACES.TRENDING_TOKEN_CARD,contentType:lB.CONTENT_IMPRESSION_TYPES.TOKEN,contentId:N.contractAddress,contentName:N.symbol,position:S}:null,C[2]=N.contractAddress,C[3]=N.symbol,C[4]=S,C[5]=v,C[6]=r):r=C[6],(0,lB.useSingleContentImpressionTracking)(r),C[7]!==N.chainIdentifier||C[8]!==N.contractAddress||C[9]!==N.symbol||C[10]!==v?(s=v?(0,t.jsx)(lg,{children:(0,t.jsx)(lI.CurrencySocialProofBadge,{chainIdentifier:N.chainIdentifier,contractAddress:N.contractAddress,symbol:N.symbol})}):void 0,C[7]=N.chainIdentifier,C[8]=N.contractAddress,C[9]=N.symbol,C[10]=v,C[11]=s):s=C[11],C[12]!==N.imageUrl?(n=(0,t.jsx)(lu,{frameTime:1,src:N.imageUrl,variant:"currency"}),C[12]=N.imageUrl,C[13]=n):n=C[13],C[14]===Symbol.for("react.memo_cache_sentinel")?(a=(0,t.jsx)(lL.CurrencyLockupContent,{children:(0,t.jsxs)(_.Flex,{className:"items-center gap-1.5",children:[(0,t.jsx)(eD.CurrencyLockupTitle,{}),(0,t.jsx)(eD.CurrencyLockupBadge,{})]})}),C[14]=a):a=C[14],C[15]!==N?(i=(0,t.jsx)(eD.CurrencyLockup,{className:"w-full",currency:N,showAvatar:!1,size:"sm",children:a}),C[15]=N,C[16]=i):i=C[16],C[17]!==b?(c=b("fdv"),C[17]=b,C[18]=c):c=C[18];let k=N.tokenGroup?.stats?.marketCapUsd??N.stats?.marketCapUsd;return C[19]!==k?(m=(0,t.jsx)(eE.NumberDisplay,{bounded:!1,display:"usd",value:k}),C[19]=k,C[20]=m):m=C[20],C[21]!==c||C[22]!==m?(d=(0,t.jsx)(ex.Tooltip,{content:c,children:m}),C[21]=c,C[22]=m,C[23]=d):d=C[23],C[24]!==N.stats||C[25]!==b?(u=N.stats?.oneDay.priceChange?(0,t.jsx)(ex.Tooltip,{content:b("oneDayPriceChange"),children:(0,t.jsx)(eu.StatChange,{change:N.stats.oneDay.priceChange,custom:{maximumFractionDigits:N.stats.oneDay.priceChange>=1?0:1}})}):null,C[24]=N.stats,C[25]=b,C[26]=u):u=C[26],C[27]!==d||C[28]!==u?(h=(0,t.jsxs)(lh,{children:[d,u]}),C[27]=d,C[28]=u,C[29]=h):h=C[29],C[30]!==h||C[31]!==i?(x=(0,t.jsxs)(lx,{className:"pr-4",children:[i,h]}),C[30]=h,C[31]=i,C[32]=x):x=C[32],C[33]!==N?(p=(0,t.jsx)(lp,{children:(0,t.jsx)(lP.CurrencySparkLineChart,{className:"h-8 w-14",currency:N,timeframe:"ONE_DAY"})}),C[33]=N,C[34]=p):p=C[34],C[35]!==x||C[36]!==p||C[37]!==s||C[38]!==n?(g=(0,t.jsxs)(lf,{footer:s,children:[n,x,p]}),C[35]=x,C[36]=p,C[37]=s,C[38]=n,C[39]=g):g=C[39],C[40]!==N||C[41]!==S||C[42]!==g?(j=(0,t.jsx)(ez.CurrencyLink,{currency:N,variant:"unstyled",children:g},S),C[40]=N,C[41]=S,C[42]=g,C[43]=j):j=C[43],j}let lV=(0,r.graphql)(`
    query TrendingCurrenciesShelfQuery(
      $filter: CurrenciesFilter!
      $limit: Int!
      $sort: CurrenciesSort!
      $slug: CurrencySlug
    ) {
      topCurrenciesV2(filter: $filter, limit: $limit, sort: $sort, slug: $slug) {
        items {
          __typename
          ... on CurrencyV2 {
            imageUrl
            ...TrendingCurrenciesCarouselItem
          }
        }
      }
    }
  `,[lE]),lz={ttl:i.TTL["5m"]},lq=(0,c.withSuspense)(({className:e,chain:r})=>{let[{data:s}]=(0,l.useQuery)({query:lV,variables:{filter:{...r?{chains:[r]}:{},swappable:!0},limit:30,sort:{by:"SCORE",direction:"DESC"},slug:"TRENDING_BY_SCORE"},context:lz}),n=(s?.topCurrenciesV2.items??[]).filter(e=>"CurrencyV2"===e.__typename).filter(e=>e.imageUrl).slice(0,12);return 0===n.length?null:(0,t.jsx)(er,{className:e,children:(0,t.jsx)(lM,{items:n})})},{fallback:(0,t.jsx)(es,{})});var lU=e.i(395802),lO=e.i(292986),l$=e.i(201578),lR=e.i(402745);let lH=(0,r.graphql)(`
    fragment TrendingSalesCarouselItem on Collection {
      id
      slug
      ...CollectionLockup
      imageUrl
      ...CollectionLink
      ...CollectionPreviewTooltip
      floorPrice {
        pricePerItem {
          ...TokenPrice
        }
      }
      stats {
        oneDay {
          sales
          floorPriceChange
        }
      }
      socialProof @include(if: $includeSocialProof) {
        socialCount
        notableCollectors {
          ...SocialProofBadgeAccount
        }
      }
    }
  `,[m.CollectionLockupFragment,x.CollectionLinkFragment,l$.CollectionPreviewTooltipFragment,d.TokenPriceFragment,lR.SocialProofBadgeAccountFragment]);function lQ(e){let l,r,s=(0,f.c)(7),{items:a,clusterSize:i}=e,o=void 0===i?2:i;if(s[0]!==o||s[1]!==a){let e;s[3]!==o?(e=(e,l)=>(0,t.jsx)(n.FlexColumn,{className:"gap-3 md:gap-4",children:e.map((e,r)=>{let s=(0,ea.readFragment)(lH,e);return(0,t.jsx)(lK,{collection:e,index:l*o+r},s.id)})},l),s[3]=o,s[4]=e):e=s[4],l=(0,J.chunk)(a,o).map(e),s[0]=o,s[1]=a,s[2]=l}else l=s[2];let c=l;return s[5]!==c?(r=(0,t.jsx)(ln,{slides:c}),s[5]=c,s[6]=r):r=s[6],r}function lK(e){let l,r,s,n,a,i,c,m,d,u,h,x,p,g,j,C=(0,f.c)(42),{collection:y,index:S}=e;C[0]!==y?(l=(0,ea.readFragment)(lH,y),C[0]=y,C[1]=l):l=C[1];let N=l,b=(0,A.useTranslations)("TrendingSalesCarousel"),v=(0,o.useIsCollectionSocialProofEnabled)(),k=N.socialProof;C[2]!==N.slug||C[3]!==S||C[4]!==v||C[5]!==k?.notableCollectors?.length?(r=v?{surface:lB.CONTENT_IMPRESSION_SURFACES.TRENDING_COLLECTION_CARD,contentType:lB.CONTENT_IMPRESSION_TYPES.COLLECTION,contentId:N.slug,position:S,hasSocialProof:(k?.notableCollectors?.length??0)>0}:null,C[2]=N.slug,C[3]=S,C[4]=v,C[5]=k?.notableCollectors?.length,C[6]=r):r=C[6],(0,lB.useSingleContentImpressionTracking)(r),C[7]!==v||C[8]!==k?(s=v&&k?(0,t.jsx)(lg,{children:(0,t.jsx)(lO.SocialProofBadge,{context:"holders",count:k.socialCount,notableAccounts:k.notableCollectors,variant:"compact"})}):void 0,C[7]=v,C[8]=k,C[9]=s):s=C[9],C[10]!==N.imageUrl?(n=(0,t.jsx)(lu,{frameTime:1,src:N.imageUrl}),C[10]=N.imageUrl,C[11]=n):n=C[11];let T=S%2==0?"top":"bottom";C[12]===Symbol.for("react.memo_cache_sentinel")?(a=(0,t.jsx)(ec.CollectionLockupContent,{children:(0,t.jsx)(eo.CollectionLockupTitle,{disableTextOverflowTooltip:!0})}),C[12]=a):a=C[12],C[13]!==N?(i=(0,t.jsx)(eo.CollectionLockup,{collection:N,children:a}),C[13]=N,C[14]=i):i=C[14],C[15]!==N||C[16]!==T||C[17]!==i?(c=(0,t.jsx)(lU.CollectionPreviewTooltip,{collection:N,side:T,children:i}),C[15]=N,C[16]=T,C[17]=i,C[18]=c):c=C[18],C[19]!==b?(m=b("floorPrice"),C[19]=b,C[20]=m):m=C[20];let w=N.floorPrice?.pricePerItem;return C[21]!==w?(d=(0,t.jsx)(em.TokenPrice,{disableTooltip:!0,display:"compact",price:w}),C[21]=w,C[22]=d):d=C[22],C[23]!==d||C[24]!==m?(u=(0,t.jsx)(ex.Tooltip,{content:m,children:d}),C[23]=d,C[24]=m,C[25]=u):u=C[25],C[26]!==N.stats.oneDay.floorPriceChange||C[27]!==b?(h=N.stats.oneDay.floorPriceChange?(0,t.jsx)(ex.Tooltip,{content:b("floorPriceChange"),children:(0,t.jsx)(eu.StatChange,{change:N.stats.oneDay.floorPriceChange})}):null,C[26]=N.stats.oneDay.floorPriceChange,C[27]=b,C[28]=h):h=C[28],C[29]!==u||C[30]!==h?(x=(0,t.jsxs)(lh,{children:[u,h]}),C[29]=u,C[30]=h,C[31]=x):x=C[31],C[32]!==x||C[33]!==c?(p=(0,t.jsxs)(lx,{className:"pr-4",children:[c,x]}),C[32]=x,C[33]=c,C[34]=p):p=C[34],C[35]!==p||C[36]!==s||C[37]!==n?(g=(0,t.jsxs)(lf,{footer:s,children:[n,p]}),C[35]=p,C[36]=s,C[37]=n,C[38]=g):g=C[38],C[39]!==N||C[40]!==g?(j=(0,t.jsx)(ej.CollectionLink,{collection:N,children:g}),C[39]=N,C[40]=g,C[41]=j):j=C[41],j}function lW(e){let l,r,s,i,o,c,m,d,u,h=(0,f.c)(21),{desktopCarousel:x,mobileCarousel:p,className:g}=e,j=(0,A.useTranslations)("TrendingSalesShelf");return h[0]!==g?(l=(0,Q.classNames)((0,W.discoverShelfVariants)().container(),g),h[0]=g,h[1]=l):l=h[1],h[2]!==j?(r=j("description"),h[2]=j,h[3]=r):r=h[3],h[4]!==j?(s=j("trendingCollections"),h[4]=j,h[5]=s):s=h[5],h[6]!==r||h[7]!==s?(i=(0,t.jsx)(G.ShelfHeader,{description:r,title:s}),h[6]=r,h[7]=s,h[8]=i):i=h[8],h[9]===Symbol.for("react.memo_cache_sentinel")?(o=(0,K.fullBleedVariants)({mobileOnly:!0}),h[9]=o):o=h[9],h[10]!==p?(c=(0,t.jsx)(a.Media,{lessThan:"md",children:p}),h[10]=p,h[11]=c):c=h[11],h[12]!==x?(m=(0,t.jsx)(a.Media,{greaterThanOrEqual:"md",children:x}),h[12]=x,h[13]=m):m=h[13],h[14]!==c||h[15]!==m?(d=(0,t.jsxs)("div",{className:o,children:[c,m]}),h[14]=c,h[15]=m,h[16]=d):d=h[16],h[17]!==l||h[18]!==i||h[19]!==d?(u=(0,t.jsxs)(n.FlexColumn,{className:l,children:[i,d]}),h[17]=l,h[18]=i,h[19]=d,h[20]=u):u=h[20],u}function lG(e){let l,r,s=(0,f.c)(5),{itemCount:n,clusterSize:a}=e,i=void 0===n?10:n,o=void 0===a?3:a;s[0]!==o||s[1]!==i?(l=(0,J.chunk)(Array(i).fill(null),o).map(lY),s[0]=o,s[1]=i,s[2]=l):l=s[2];let c=l;return s[3]!==c?(r=(0,t.jsx)(O.HomepageShelfMask,{className:"-mt-3 pt-3",side:"right",children:(0,t.jsx)(_.Flex,{className:"gap-4 pl-4 md:pl-6 lg:pl-0",children:c})}),s[3]=c,s[4]=r):r=s[4],r}function lY(e,l){return(0,t.jsx)(n.FlexColumn,{className:"w-max gap-3 md:gap-4",children:e.map((e,r)=>(0,t.jsx)(lZ,{},`${l.toString()}-${r.toString()}`))},l)}function lZ(){let e,l,r=(0,f.c)(2);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(j.SkeletonBlock,{className:"size-[82px] rounded-none"}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(j.SkeletonBlock,{className:"h-[82px] w-[300px] overflow-hidden rounded-lg bg-bg-primary-transparent",children:(0,t.jsxs)(_.Flex,{className:"gap-3",children:[e,(0,t.jsx)(X.FlexCenter,{className:"grow",children:(0,t.jsxs)(n.FlexColumn,{className:"grow gap-1",children:[(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-3/4"}),(0,t.jsx)(j.SkeletonLine,{className:"h-4 w-1/2"})]})})]})}),r[1]=l):l=r[1],l}let lX=(0,r.graphql)(`
    query TrendingSalesShelfQuery(
      $category: CategoryIdentifier
      $chain: ChainIdentifier
      $includeSocialProof: Boolean!
    ) {
      notableDropCollections(limit: 10, category: $category, chain: $chain) {
        id
        ...TrendingSalesCarouselItem
      }
    }
  `,[lH]),lJ={ttl:i.TTL["5m"]},l0=(0,c.withSuspense)(({className:e,category:r,chain:s})=>{let n=(0,o.useIsCollectionSocialProofEnabled)(),[{data:a}]=(0,l.useQuery)({query:lX,variables:{category:r,chain:s,includeSocialProof:n},context:lJ}),i=a?.notableDropCollections??[];return 0===i.length?null:(0,t.jsx)(lW,{className:e,desktopCarousel:(0,t.jsx)(lQ,{items:i}),mobileCarousel:(0,t.jsx)(lQ,{items:i})})},{fallback:(0,t.jsx)(function(){let e,l=(0,f.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(lW,{desktopCarousel:(0,t.jsx)(lG,{clusterSize:2,itemCount:10}),mobileCarousel:(0,t.jsx)(lG,{clusterSize:2,itemCount:6})}),l[0]=e):e=l[0],e},{})}),l1=(0,r.graphql)(`
    query HomePageConfigurationQuery(
      $category: String
      $chain: ChainIdentifier
    ) {
      discoverPageConfiguration(category: $category, chain: $chain) {
        id
        shelves {
          ... on TopMoverShelf {
            id
            type
          }
          ... on TrendingCurrenciesShelf {
            id
            type
          }
          ... on HighestWeeklySalesShelf {
            id
            type
          }
          ... on TrendingCollectionsShelf {
            id
            type
          }
          ... on LearnCenterShelf {
            id
            type
          }
          ... on CuratedCollectionsShelf {
            id
            type
            title
            titleKey
            description
            descriptionKey
            collections {
              ...HomeFeaturedCollectionsCarousel
            }
          }
          ... on CuratedCurrenciesShelf {
            id
            type
            title
            titleKey
            description
            descriptionKey
            currenciesV2 {
              ...CuratedCurrenciesShelf
            }
          }
          ... on FooterShelf {
            id
            type
          }
        }
      }
    }
  `,[g,eR]),l2={ttl:i.TTL["5m"]},l3=(0,c.withSuspense)(({category:e,chain:r})=>{let i=(0,o.useIsPerpetualsEnabled)(),[{data:c,fetching:m,error:d}]=(0,l.useQuery)({query:l1,variables:{category:e,chain:r},context:l2});if(m&&!c?.discoverPageConfiguration)return(0,t.jsx)(en,{});if(!c?.discoverPageConfiguration)return(0,t.jsx)(n.FlexColumn,{className:"items-center justify-center py-24",children:(0,t.jsx)(s.EmptyState,{variant:d?"error":"no-data"})});let u=c.discoverPageConfiguration.shelves;return(0,t.jsxs)(n.FlexColumn,{className:"gap-6 pb-6",children:[(0,t.jsx)(tQ,{category:e,chain:r}),i?(0,t.jsx)(l_,{}):null,(0,t.jsxs)(n.FlexColumn,{className:"-mx-4 shrink-0 gap-6 overflow-hidden px-4 md:gap-12 lg:mx-0 lg:overflow-visible lg:px-0",children:[(0,t.jsx)(a.Media,{lessThan:"lg",children:(0,t.jsx)(t9,{category:e,chain:r})}),u.map(l=>{switch(l.__typename){case"TopMoverShelf":return(0,t.jsx)(ll,{category:e,chain:r},l.id);case"TrendingCollectionsShelf":return(0,t.jsx)(l0,{category:e,chain:r},l.id);case"HighestWeeklySalesShelf":return(0,t.jsx)(ti,{category:e,chain:r},l.id);case"TrendingCurrenciesShelf":return(0,t.jsx)(lq,{chain:r},l.id);case"LearnCenterShelf":return(0,t.jsx)(tU,{},l.id);case"CuratedCollectionsShelf":return(0,t.jsx)(ew,{collections:l.collections,description:l.description,descriptionKey:l.descriptionKey,title:l.title,titleKey:l.titleKey},l.id);case"CuratedCurrenciesShelf":return(0,t.jsx)(eH,{currencies:l.currenciesV2,description:l.description,descriptionKey:l.descriptionKey,title:l.title,titleKey:l.titleKey},l.id);case"FooterShelf":return(0,t.jsx)(t_,{className:"pb-6 lg:pb-12"},l.id);default:return null}})]})]})},{fallback:(0,t.jsx)(en,{})});e.s(["HomepageMainContent",0,l3],802591)}]);

//# debugId=35f722a3-c952-b01c-c994-1c23e1d17416
//# sourceMappingURL=c3b80834c82f77ad.js.map