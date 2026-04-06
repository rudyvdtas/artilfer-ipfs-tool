;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="89f38a05-cf78-e588-4b7d-ebd0819cc6b4")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,231592,507892,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(351144),r=e.i(718993),i=e.i(437153),n=e.i(165102),s=e.i(670383),o=e.i(920296),c=e.i(666625),u=e.i(953756),d=e.i(494679),m=e.i(501811);function p(e){let a,r,s,o,c=(0,l.c)(9),{side:p,className:g,children:h}=e,x=(0,n.useIsLessThanLg)();c[0]===Symbol.for("react.memo_cache_sentinel")?(a=(0,i.classNames)((0,m.fullBleedVariants)({width:"fullWidth"}),"!pl-0"),c[0]=a):a=c[0],c[1]!==g?(r=(0,i.classNames)("transition-[mask-size,mask-position] duration-500","-m-6 overflow-visible p-6",g),c[1]=g,c[2]=r):r=c[2];let C=x?"none":p;return c[3]!==h?(s=(0,t.jsx)(u.Container,{className:"lg:!pr-0",children:h}),c[3]=h,c[4]=s):s=c[4],c[5]!==r||c[6]!==C||c[7]!==s?(o=(0,t.jsx)(u.Container,{className:a,children:(0,t.jsx)(d.GradientMask,{className:r,side:C,variant:"container",children:s})}),c[5]=r,c[6]=C,c[7]=s,c[8]=o):o=c[8],o}function g(e){let o,u,d,m,g,x,C,S,y=(0,l.c)(29),{slides:f,shouldGroup:j,itemClassName:v,overrides:b}=e,N=void 0===j||j,{api:k,slidesInView:I,setApi:w,shouldRenderSlide:F}=(0,c.useSlidesInView)(f.length),M=b?.CarouselOptions.align??"center";y[0]!==b?.CarouselOptions.breakpoints?(o=b?.CarouselOptions.breakpoints??{"2xl":{align:h}},y[0]=b?.CarouselOptions.breakpoints,y[1]=o):o=y[1],y[2]!==M||y[3]!==o?(u={align:M,breakpoints:o},y[2]=M,y[3]=o,y[4]=u):u=y[4];let T=u,[_,L]=(0,s.useState)(!1);y[5]===Symbol.for("react.memo_cache_sentinel")?(d=e=>{let{canScrollNext:t}=e;L(!t)},y[5]=d):d=y[5];let P=_?"none":"right";if(y[6]!==k||y[7]!==v||y[8]!==N||y[9]!==F||y[10]!==f||y[11]!==I){let e;y[13]!==k||y[14]!==v||y[15]!==N||y[16]!==F||y[17]!==I?(e=(e,l)=>{let{slide:r,key:n}=e;return(0,t.jsx)(a.CarouselItem,{className:(0,i.classNames)("mr-3 basis-[calc(100%-76px)] pl-0 transition-opacity duration-200 will-change-opacity md:mr-4 md:basis-[calc(100%-70px)] lg:basis-[300px]",N?"group":"",k&&I.includes(l)||!k?"opacity-100":"opacity-20",v),children:F(l)&&r},n)},y[13]=k,y[14]=v,y[15]=N,y[16]=F,y[17]=I,y[18]=e):e=y[18],m=f.map(e),y[6]=k,y[7]=v,y[8]=N,y[9]=F,y[10]=f,y[11]=I,y[12]=m}else m=y[12];return y[19]!==m?(g=(0,t.jsx)(a.CarouselContent,{allowOverflow:!0,className:"pl-4 md:pl-6 lg:pl-0",children:m}),y[19]=m,y[20]=g):g=y[20],y[21]!==P||y[22]!==g?(x=(0,t.jsx)(p,{side:P,children:g}),y[21]=P,y[22]=g,y[23]=x):x=y[23],y[24]===Symbol.for("react.memo_cache_sentinel")?(C=(0,t.jsx)(n.Media,{greaterThan:"lg",children:(0,t.jsxs)(r.CarouselNavigationArrows,{size:"lg",children:[(0,t.jsx)(r.CarouselNavigationArrowsPrevious,{className:"w-8"}),(0,t.jsx)(r.CarouselNavigationArrowsNext,{className:"w-8"})]})}),y[24]=C):C=y[24],y[25]!==T||y[26]!==w||y[27]!==x?(S=(0,t.jsxs)(a.Carousel,{onScroll:d,options:T,setApi:w,children:[x,C]}),y[25]=T,y[26]=w,y[27]=x,y[28]=S):S=y[28],S}function h(e){return(0,o.calculateCarouselAlignment)({viewSize:e,visibleSlides:3,offset:-18})}e.s(["HomepageShelfMask",()=>p],507892),e.s(["FeaturedCarousel",()=>g],231592)},145404,e=>{"use strict";e.i(231592),e.s([])},592901,906482,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(455480),r=e.i(165102),i=e.i(310578),n=e.i(670383),s=e.i(123969),o=e.i(62793),c=e.i(940669),u=e.i(885530);let d=(0,u.graphql)(`
  fragment CollectionBannerHeroMedia on Media {
    __typename
    ... on ImageMedia {
      imageUrl
    }
    ... on VideoMedia {
      videoUrl
      thumbnailUrl
    }
    ... on MuxVideoMedia {
      muxPlaybackId
      thumbnailUrl
    }
  }
`),m=(0,u.graphql)(`
    fragment CollectionBannerMedia on Collection {
      ...CollectionBannerImage
      name
      hero {
        desktopHeroMedia {
          __typename
          ... on VideoMedia {
            thumbnailUrl
          }
          ... on MuxVideoMedia {
            thumbnailUrl
          }
          ... on ImageMedia {
            imageUrl
          }
          ...CollectionBannerHeroMedia
        }
        mobileHeroMedia {
          __typename
          ... on VideoMedia {
            thumbnailUrl
          }
          ... on MuxVideoMedia {
            thumbnailUrl
          }
          ... on ImageMedia {
            imageUrl
          }
          ...CollectionBannerHeroMedia
        }
      }
    }
  `,[o.CollectionBannerImageFragment,d]);function p(e){let r,n,s,o,u,m,p=(0,l.c)(22);p[0]!==e?({fallback:s,media:o,disableVideo:n,...r}=e,p[0]=e,p[1]=r,p[2]=n,p[3]=s,p[4]=o):(r=p[1],n=p[2],s=p[3],o=p[4]),p[5]!==o?(u=(0,a.readFragment)(d,o),p[5]=o,p[6]=u):u=p[6];let h=u;if(!h){let e,l=n?1:void 0;return p[7]!==r||p[8]!==s||p[9]!==l?(e=(0,t.jsx)(c.BannerMedia,{frameTime:l,url:s,...r}),p[7]=r,p[8]=s,p[9]=l,p[10]=e):e=p[10],e}if(n){let e,l="thumbnailUrl"in h?h.thumbnailUrl||s:h.imageUrl;return p[11]!==r||p[12]!==l?(e=(0,t.jsx)(c.BannerMedia,{frameTime:1,url:l,...r}),p[11]=r,p[12]=l,p[13]=e):e=p[13],e}if("MuxVideoMedia"===h.__typename){let e;return p[14]!==n||p[15]!==h.muxPlaybackId||p[16]!==h.thumbnailUrl?(e=h.muxPlaybackId?(0,t.jsx)(g,{muxPlaybackId:h.muxPlaybackId,poster:h.thumbnailUrl??void 0,shouldPlay:!n}):(0,t.jsx)(i.SkeletonBlock,{}),p[14]=n,p[15]=h.muxPlaybackId,p[16]=h.thumbnailUrl,p[17]=e):e=p[17],e}let x="VideoMedia"===h.__typename?h.videoUrl:h.imageUrl;return p[18]!==r||p[19]!==s||p[20]!==x?(m=x||s?(0,t.jsx)(c.BannerMedia,{fallback:s,url:x,...r}):(0,t.jsx)(i.SkeletonBlock,{}),p[18]=r,p[19]=s,p[20]=x,p[21]=m):m=p[21],m}function g(e){let a,r,i,o=(0,l.c)(8),{muxPlaybackId:c,poster:u,shouldPlay:d}=e,m=(0,n.useRef)(null);o[0]!==d?(a=()=>{m.current&&(d?m.current.play().catch(h):m.current.pause())},r=[d],o[0]=d,o[1]=a,o[2]=r):(a=o[1],r=o[2]),(0,n.useEffect)(a,r);let p=`https://stream.mux.com/${c}.m3u8`;return o[3]!==c||o[4]!==u||o[5]!==d||o[6]!==p?(i=(0,t.jsx)(s.LazyReactHlsPlayer,{autoPlay:d,className:"size-full object-cover object-center",controls:!1,loop:!0,muted:!0,playerRef:m,playsInline:!0,poster:u,src:p},c),o[3]=c,o[4]=u,o[5]=d,o[6]=p,o[7]=i):i=o[7],i}function h(){}function x(e){let i,n,s,c,u,d,g,h,x=(0,l.c)(20);x[0]!==e?({collection:n,overrides:s,...i}=e,x[0]=e,x[1]=i,x[2]=n,x[3]=s):(i=x[1],n=x[2],s=x[3]),x[4]!==n?(c=(0,a.readFragment)(m,n),u=(0,o.getCollectionBannerImage)(c)||(0,o.getCollectionBannerFallbackImage)(c),x[4]=n,x[5]=c,x[6]=u):(c=x[5],u=x[6]);let C=u,S=c.hero?.desktopHeroMedia,y=c.hero?.mobileHeroMedia||S,f=S&&"ImageMedia"!==S.__typename?S.thumbnailUrl||C:S?.imageUrl??C,j=y&&"ImageMedia"!==y.__typename?y.thumbnailUrl||C:y?.imageUrl??C,v=c.hero?.desktopHeroMedia,b=s?.desktop;x[7]!==i||x[8]!==f||x[9]!==v||x[10]!==b?(d=(0,t.jsx)(r.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)(p,{fallback:f,media:v,...i,...b})}),x[7]=i,x[8]=f,x[9]=v,x[10]=b,x[11]=d):d=x[11];let N=s?.mobile;return x[12]!==i||x[13]!==j||x[14]!==y||x[15]!==N?(g=(0,t.jsx)(r.Media,{lessThan:"md",children:(0,t.jsx)(p,{fallback:j,media:y,...i,...N})}),x[12]=i,x[13]=j,x[14]=y,x[15]=N,x[16]=g):g=x[16],x[17]!==d||x[18]!==g?(h=(0,t.jsxs)(t.Fragment,{children:[d,g]}),x[17]=d,x[18]=g,x[19]=h):h=x[19],h}e.s(["CollectionBannerMediaFragment",0,m,"HeroMediaFragment",0,d],906482),e.s(["CollectionBannerMedia",()=>x],592901)},209293,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(437153),r=e.i(965523),i=e.i(251577),n=e.i(150518);function s(e){let s,o,c,u,d=(0,l.c)(7),{bannerMedia:m,children:p}=e;return d[0]===Symbol.for("react.memo_cache_sentinel")?(s=(0,a.classNames)("dark relative aspect-3/2 justify-end rounded-lg p-3",(0,n.scaleTransformVariants)({group:!0,shadow:!0}),(0,i.insetBorderVariants)({positioning:"absolute"})),d[0]=s):s=d[0],d[1]!==m?(o=(0,t.jsx)("div",{className:"absolute inset-0 z-[-1] scale-[0.995] overflow-hidden rounded-lg",children:m}),d[1]=m,d[2]=o):o=d[2],d[3]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsx)("div",{className:"absolute inset-0 z-[-1] rounded-lg bg-linear-to-b from-transparent to-bg-app"}),d[3]=c):c=d[3],d[4]!==p||d[5]!==o?(u=(0,t.jsxs)(r.FlexColumn,{className:s,children:[o,c,p]}),d[4]=p,d[5]=o,d[6]=u):u=d[6],u}e.s(["FeaturedCarouselSlide",()=>s])},708969,840651,e=>{"use strict";let t=(0,e.i(703379).tv)({slots:{container:"-m-6 gap-4 overflow-hidden p-6",header:"lg:gap-1"}});e.s(["discoverShelfVariants",0,t],708969);var l=e.i(7683),a=e.i(866313),r=e.i(965523),i=e.i(165102),n=e.i(950293),s=e.i(625236);function o(e){let o,c,u,d,m,p,g,h,x,C,S,y=(0,a.c)(26),{title:f,description:j}=e;y[0]!==f?(o={size:"xs",children:f},y[0]=f,y[1]=o):o=y[1];let v=o;y[2]!==f?(c={size:"sm",children:f},y[2]=f,y[3]=c):c=y[3];let b=c;y[4]!==j?(u={color:"text-secondary",children:j},y[4]=j,y[5]=u):u=y[5];let N=u;return y[6]===Symbol.for("react.memo_cache_sentinel")?(d=t().header(),y[6]=d):d=y[6],y[7]!==b?(m=(0,l.jsx)(s.TextHeading,{...b}),y[7]=b,y[8]=m):m=y[8],y[9]!==j||y[10]!==N?(p=j?(0,l.jsx)(n.TextBody,{...N}):null,y[9]=j,y[10]=N,y[11]=p):p=y[11],y[12]!==m||y[13]!==p?(g=(0,l.jsxs)(i.Media,{greaterThanOrEqual:"lg",children:[m,p]}),y[12]=m,y[13]=p,y[14]=g):g=y[14],y[15]!==v?(h=(0,l.jsx)(s.TextHeading,{...v}),y[15]=v,y[16]=h):h=y[16],y[17]!==j||y[18]!==N?(x=j?(0,l.jsx)(n.TextBody,{size:"xs",...N}):null,y[17]=j,y[18]=N,y[19]=x):x=y[19],y[20]!==h||y[21]!==x?(C=(0,l.jsxs)(i.Media,{lessThan:"lg",children:[h,x]}),y[20]=h,y[21]=x,y[22]=C):C=y[22],y[23]!==C||y[24]!==g?(S=(0,l.jsxs)(r.FlexColumn,{className:d,children:[g,C]}),y[23]=C,y[24]=g,y[25]=S):S=y[25],S}e.s(["ShelfHeader",()=>o],840651)},362341,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(437153),r=e.i(254842),i=e.i(165102),n=e.i(150518);let s=(0,a.classNames)("relative size-20 overflow-hidden rounded-lg",(0,n.scaleTransformVariants)(),"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-shadow-border");function o(e){let a,n,s=(0,l.c)(4),{previewItems:o}=e;return s[0]!==o?(a=o.map(c),s[0]=o,s[1]=a):a=s[1],s[2]!==a?(n=(0,t.jsx)(i.Media,{greaterThanOrEqual:"xl",children:(0,t.jsx)(r.Flex,{className:"relative gap-3",children:a})}),s[2]=a,s[3]=n):n=s[3],n}function c(e,l){return(0,t.jsx)("div",{className:(0,a.classNames)("relative",s),children:e},`preview-items-${l.toString()}`)}e.s(["SpotlightCarouselItemPreviewsLayout",()=>o])},546149,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(885530),r=e.i(455480),i=e.i(522285),n=e.i(806519);e.i(661049);var s=e.i(493473),o=e.i(190519);e.i(275521);var c=e.i(6425),u=e.i(600028),d=e.i(630945),m=e.i(9300),p=e.i(362341);let g=(0,a.graphql)(`
    fragment SpotlightCarouselItemPreviews on Collection {
      previewItems(limit: 3) {
        id
        name
        imageUrl
        ...ItemLink
        ...ItemMedia
        ...ItemPreviewTooltip
      }
    }
  `,[o.ItemLinkFragment,u.ItemMediaFragment,m.ItemPreviewTooltipFragment]);function h(e){let a,o,u,m,h=(0,l.c)(10),{collection:C}=e,S=(0,i.useTranslations)("SpotlightCarouselItemPreviews");if(h[0]!==C||h[1]!==S){u=Symbol.for("react.early_return_sentinel");e:{let e,{previewItems:l}=(0,r.readFragment)(g,C);if(!l){u=null;break e}a=p.SpotlightCarouselItemPreviewsLayout,h[5]!==S?(e=e=>(0,t.jsx)(d.ItemPreviewTooltip,{align:"center",item:e,side:"top",children:(0,t.jsx)(s.ItemLink,{"aria-label":e.name??S("viewItem"),item:e,variant:"unstyled",children:(0,t.jsx)(c.ItemMedia,{boost:2,containerSize:"100%",frameTime:1,item:e,mediaSize:72,overrides:{mediaClassName:"object-cover object-center",video:n.ItemCardVideo},surface:"static"})})},e.id),h[5]=S,h[6]=e):e=h[6],o=l.filter(x).map(e)}h[0]=C,h[1]=S,h[2]=a,h[3]=o,h[4]=u}else a=h[2],o=h[3],u=h[4];return u!==Symbol.for("react.early_return_sentinel")?u:(h[7]!==a||h[8]!==o?(m=(0,t.jsx)(a,{previewItems:o}),h[7]=a,h[8]=o,h[9]=m):m=h[9],m)}function x(e){return null!==e.imageUrl}e.s(["SpotlightCarouselItemPreviews",()=>h,"SpotlightCarouselItemPreviewsFragment",0,g])},634317,e=>{"use strict";var t=e.i(885530),l=e.i(959105);let a=(0,t.graphql)(`
    fragment SpotlightCarouselSlideLayout on Collection {
      ...CollectionLink
    }
  `,[l.CollectionLinkFragment]);e.s(["SpotlightCarouselSlideLayoutFragment",0,a])},204083,700343,752259,655476,e=>{"use strict";var t=e.i(885530),l=e.i(62793),a=e.i(682576),r=e.i(190627),i=e.i(906482),n=e.i(954012),s=e.i(546149),o=e.i(634317),c=e.i(884988),u=e.i(493883),d=e.i(7683),m=e.i(866313),p=e.i(455480),g=e.i(535374),h=e.i(149431),x=e.i(965523),C=e.i(986853),S=e.i(258343),y=e.i(950293),f=e.i(522285),j=e.i(670383),v=e.i(354667),b=e.i(902689);let N=(0,t.graphql)(`
  fragment DropMintProgress on Collection {
    slug
    drop {
      __typename
      ... on Erc721SeaDropV1 {
        maxSupply
        totalSupply
      }
      ... on Erc1155SeaDropV2 {
        tokenSupply {
          totalSupply
          maxSupply
        }
      }
    }
  }
`);function k(e){let t,l,a,r,i,n,s,o,c=(0,m.c)(21),{collection:u}=e,k=(0,p.readFragment)(N,u),F=(0,g.useNumberFormatter)(),M=(0,f.useTranslations)("CollectionDropMintProgressStat"),T=k.drop?.__typename==="Erc721SeaDropV1"?k.drop.totalSupply:k.drop?.tokenSupply.reduce(w,0)??0,_=k.drop?.__typename==="Erc721SeaDropV1"?k.drop.maxSupply:k.drop?.tokenSupply.reduce(I,0)??0,[L,P]=(0,j.useState)(T);if(c[0]===Symbol.for("react.memo_cache_sentinel")?(t=e=>{let{totalSupply:t}=e;P(t)},c[0]=t):t=c[0],(0,b.useMintProgressSubscription)(k.slug,t),!k.drop)return null;let B=_>=v.OPEN_EDITION_SUPPLY_THRESHOLD,V=B?"Open edition":F(_,{display:"full",custom:{maximumFractionDigits:0}});c[1]!==M?(l=M("itemsMinted"),c[1]=M,c[2]=l):l=c[2],c[3]!==l?(a=(0,d.jsx)(y.TextBody,{className:"font-mono uppercase",size:"xs",weight:"semibold",children:l}),c[3]=l,c[4]=a):a=c[4],c[5]!==L?(r=(0,d.jsx)(h.AnimatedNumber,{display:"full",value:L}),c[5]=L,c[6]=r):r=c[6];let D=B?null:` / ${V}`;return c[7]!==r||c[8]!==D?(i=(0,d.jsxs)(y.TextBody,{color:"text-secondary",size:"xs",children:[r,D]}),c[7]=r,c[8]=D,c[9]=i):i=c[9],c[10]!==a||c[11]!==i?(n=(0,d.jsxs)(S.SpaceBetween,{className:"w-full",children:[a,i]}),c[10]=a,c[11]=i,c[12]=n):n=c[12],c[13]!==B||c[14]!==L||c[15]!==_||c[16]!==M?(s=B?null:(0,d.jsx)(C.Progress,{"aria-label":M("mintProgressLabel"),className:"h-2 bg-frosted-4",value:L/_*100}),c[13]=B,c[14]=L,c[15]=_,c[16]=M,c[17]=s):s=c[17],c[18]!==n||c[19]!==s?(o=(0,d.jsxs)(x.FlexColumn,{className:"w-full gap-2.5",children:[n,s]}),c[18]=n,c[19]=s,c[20]=o):o=c[20],o}function I(e,t){return e+t.maxSupply}function w(e,t){return e+t.totalSupply}e.s(["DropMintProgress",()=>k,"DropMintProgressFragment",0,N],700343);let F=(0,t.graphql)(`
    fragment SpotlightCarouselSlideStat on Collection {
      ...getDropStatus
      ...DropMintProgress
      ...CollectionStats
      drop {
        isMinting
      }
    }
  `,[u.getDropStatusFragment,N,c.CollectionStatsFragment]);e.s(["SpotlightCarouselSlideStatFragment",0,F],752259);var M=e.i(81810),T=e.i(314346),_=e.i(720861),L=e.i(439870),P=e.i(818304);let B=(0,t.graphql)(`
    fragment SpotlightToken on CurrencyV2 {
      usdPrice
      contractAddress
      chain {
        identifier
      }
      ...CurrencyV2Lockup
      ...CurrencyPrice
      ...CurrencyStats
      ...CurrencyChartColor
      ...CurrencySparkLineChart
    }
  `,[M.CurrencyV2LockupFragment,L.CurrencyPriceFragment,_.CurrencyStatsFragment,T.CurrencyChartColorFragment,P.CurrencySparkLineChartFragment]),V=(0,t.graphql)(`
    fragment SpotlightCarouselSlide on Collection {
      id
      slug
      ...CollectionLockup
      ...CollectionBannerMedia
      ...CollectionBannerImage
      floorPrice {
        pricePerItem {
          ...TokenPrice
        }
      }
      currenciesV2 {
        ...SpotlightToken
      }
      ...SpotlightCarouselItemPreviews
      ...SpotlightCarouselSlideStat
      ...CollectionOwner
      ...SpotlightCarouselSlideLayout
    }
  `,[a.CollectionLockupFragment,r.TokenPriceFragment,l.CollectionBannerImageFragment,i.CollectionBannerMediaFragment,s.SpotlightCarouselItemPreviewsFragment,n.CollectionOwnerFragment,F,o.SpotlightCarouselSlideLayoutFragment,B]);e.s(["SpotlightCarouselSlideFragment",0,V],655476);let D=(0,t.graphql)(`
    fragment SpotlightCarousel on Collection {
      id
      name
      slug
      ...CollectionBannerImage
      ...SpotlightCarouselSlide
    }
  `,[V,l.CollectionBannerImageFragment]);e.s(["SpotlightCarouselFragment",0,D],204083)},209634,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(437153),r=e.i(165102),i=e.i(940669);function n(e){let n,s,o,c,u,d=(0,l.c)(15),{imageUrl:m,className:p,style:g,zIndex:h,priority:x,onLoad:C}=e;return d[0]!==p?(n=(0,a.classNames)("fixed inset-0 h-screen w-screen object-fill",p),d[0]=p,d[1]=n):n=d[1],d[2]!==g||d[3]!==h?(s={...g,zIndex:h},d[2]=g,d[3]=h,d[4]=s):s=d[4],d[5]!==C?(o=()=>{C?.()},d[5]=C,d[6]=o):o=d[6],d[7]!==m||d[8]!==x||d[9]!==o?(c=(0,t.jsx)(i.BannerMedia,{disableVideo:!0,frameTime:1,onLoad:o,priority:x,url:m,width:32}),d[7]=m,d[8]=x,d[9]=o,d[10]=c):c=d[10],d[11]!==n||d[12]!==s||d[13]!==c?(u=(0,t.jsx)(r.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)("div",{className:n,style:s,children:c})}),d[11]=n,d[12]=s,d[13]=c,d[14]=u):u=d[14],u}e.s(["SpotlightCarouselBackgroundImageBase",()=>n])},178480,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(455480),r=e.i(62793),i=e.i(204083),n=e.i(209634);function s(e){let s,o,c=(0,l.c)(5),{collection:u,count:d}=e;if(!u)return;if(c[0]!==u){let e=(0,a.readFragment)(i.SpotlightCarouselFragment,u);s=(0,r.getCollectionBannerImage)(e),c[0]=u,c[1]=s}else s=c[1];let m=s;if(!m)return null;let p=-(d+1);return c[2]!==m||c[3]!==p?(o=(0,t.jsx)(n.SpotlightCarouselBackgroundImageBase,{imageUrl:m,priority:!0,zIndex:p}),c[2]=m,c[3]=p,c[4]=o):o=c[4],o}e.s(["SpotlightCarouselBackgroundImageInitial",()=>s])},111778,375518,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(351144),r=e.i(718993),i=e.i(477658),n=e.i(437153),s=e.i(165102),o=e.i(670383),c=e.i(495606),u=e.i(894),d=e.i(35720),m=e.i(209634);function p(e){let a,r,i,s,p,h,x,C=(0,l.c)(19),{imageUrl:S,index:y,visibleIndex:f}=e,j=(0,o.useContext)(g),{theme:v}=(0,u.useTheme)(),b=(0,o.useRef)(void 0),N=y===f,[k,I]=(0,o.useState)(-(y+1)),[w,F]=(0,o.useState)(!1),[M,T]=(0,o.useState)(0);if(C[0]!==N||C[1]!==f?(a=()=>{void 0!==f&&I(e=>N?0:e-1)},C[0]=N,C[1]=f,C[2]=a):a=C[2],(0,d.useOnChange)(f,a),C[3]!==k?(r=()=>{b.current&&(clearTimeout(b.current),b.current=void 0),b.current=setTimeout(()=>{T(k)},10)},C[3]=k,C[4]=r):r=C[4],(0,d.useOnChange)(k,r),C[5]!==j?.current?(i=()=>{F(j?.current!==void 0)},C[5]=j?.current,C[6]=i):i=C[6],C[7]!==j?(s=[j],C[7]=j,C[8]=s):s=C[8],(0,o.useEffect)(i,s),"light"===v||!w)return null;let _=j?.current,L=N&&k!==M?"opacity-0":"opacity-100 transition-opacity duration-3500 ease-out-quint";C[9]!==L?(p=(0,n.classNames)(L),C[9]=L,C[10]=p):p=C[10];let P=0===y;return C[11]!==S||C[12]!==p||C[13]!==P||C[14]!==k?(h=(0,t.jsx)(m.SpotlightCarouselBackgroundImageBase,{className:p,imageUrl:S,priority:P,zIndex:k}),C[11]=S,C[12]=p,C[13]=P,C[14]=k,C[15]=h):h=C[15],C[16]!==_||C[17]!==h?(x=(0,t.jsx)(c.Portal,{container:_,children:h}),C[16]=_,C[17]=h,C[18]=x):x=C[18],x}let g=(0,o.createContext)(void 0);e.s(["SpotlightCarouselBackgroundImage",()=>p,"SpotlightCarouselBackgroundImageContext",0,g],375518);let h="h-1.5",x=(0,n.classNames)(h,"w-full lg:w-10");function C(e){let c,u,d,m,p,C,S,y,f,j,v,b,N,k=(0,l.c)(29),{carouselContent:I,carouselProps:w,carouselClassNames:F,contentClassNames:M,showCarouselDots:T,initialBackground:_}=e,L=(0,o.useRef)(null);return k[0]!==w?(c=w??{},k[0]=w,k[1]=c):c=k[1],k[2]!==c?({options:u,...d}=c,k[2]=c,k[3]=u,k[4]=d):(u=k[3],d=k[4]),k[5]!==F?(m=(0,n.classNames)("mt-4 w-full lg:mt-0 lg:rounded-xl",F),k[5]=F,k[6]=m):m=k[6],k[7]!==u?(p={loop:!0,...u},k[7]=u,k[8]=p):p=k[8],k[9]!==I||k[10]!==M?(C=(0,t.jsx)(a.CarouselContent,{className:M,children:I}),k[9]=I,k[10]=M,k[11]=C):C=k[11],k[12]===Symbol.for("react.memo_cache_sentinel")?(S=(0,t.jsx)(s.Media,{greaterThanOrEqual:"lg",children:(0,t.jsxs)(r.CarouselNavigationArrows,{size:"lg",variant:"overlay",children:[(0,t.jsx)(r.CarouselNavigationArrowsPrevious,{}),(0,t.jsx)(r.CarouselNavigationArrowsNext,{})]})}),k[12]=S):S=k[12],k[13]!==C?(y=(0,t.jsxs)("div",{className:"relative overflow-hidden rounded-lg before:pointer-events-none before:absolute before:inset-0 before:inset-shadow-border before:z-10 before:rounded-inherit",children:[C,S]}),k[13]=C,k[14]=y):y=k[14],k[15]!==T?(f=T?(0,t.jsx)("div",{className:(0,n.classNames)("mt-3",h),children:(0,t.jsx)(i.CarouselNavigationDots,{dotClassName:x})}):null,k[15]=T,k[16]=f):f=k[16],k[17]!==d||k[18]!==m||k[19]!==p||k[20]!==y||k[21]!==f?(j=(0,t.jsxs)(a.Carousel,{autoplay:!0,className:m,options:p,...d,children:[y,f]}),k[17]=d,k[18]=m,k[19]=p,k[20]=y,k[21]=f,k[22]=j):j=k[22],k[23]===Symbol.for("react.memo_cache_sentinel")?(v=(0,t.jsx)("div",{ref:L}),k[23]=v):v=k[23],k[24]!==_?(b=(0,t.jsxs)("div",{className:"pointer-events-none fixed inset-0 z-[-1000] hidden h-screen w-screen -rotate-180 scale-125 opacity-[0.05] blur-[50px] dark:block",children:[_,v]}),k[24]=_,k[25]=b):b=k[25],k[26]!==b||k[27]!==j?(N=(0,t.jsxs)(g.Provider,{value:L,children:[j,b]}),k[26]=b,k[27]=j,k[28]=N):N=k[28],N}e.s(["SpotlightCarouselLayout",()=>C],111778)},981501,356431,362626,e=>{"use strict";var t=e.i(81810),l=e.i(885530),a=e.i(609644),r=e.i(314346),i=e.i(720861),n=e.i(439870),s=e.i(818304);let o=(0,l.graphql)(`
  fragment SpotlightTokenLockupStats on CurrencyV2 {
    usdPrice
    stats {
      oneDay {
        volume
      }
      marketCapUsd
    }
    tokenGroup {
      stats {
        marketCapUsd
      }
    }
  }
`);e.s(["SpotlightTokenLockupStatsFragment",0,o],356431);let c=(0,l.graphql)(`
    fragment SpotlightTokenLockupTitle on CurrencyV2 {
      ...CurrencyV2Lockup
    }
  `,[t.CurrencyV2LockupFragment]);e.s(["SpotlightTokenLockupTitleFragment",0,c],362626);let u=(0,l.graphql)(`
    query SpotlightCarouselSlideCurrencyQuery($metadataCollectionId: String!) {
      currencyByMetadataCollectionIdV2(
        metadataCollectionId: $metadataCollectionId
      ) {
        usdPrice
        chain {
          identifier
        }
        stats {
          marketCapUsd
          fdvUsd
          totalSupply
          oneDay {
            volume
            priceChange
            marketCapChange
          }
        }
        contractAddress
        ...CurrencyV2Lockup
        ...SpotlightTokenLockupTitle
        ...CurrencyPrice
        ...CurrencyStats
        ...CurrencyChartColor
        ...CurrencySparkLineChart
        ...CurrencyV2Link
        ...SpotlightTokenLockupStats
      }
    }
  `,[t.CurrencyV2LockupFragment,n.CurrencyPriceFragment,i.CurrencyStatsFragment,r.CurrencyChartColorFragment,s.CurrencySparkLineChartFragment,a.CurrencyV2LinkFragment,c,o]);e.s(["SpotlightCarouselSlideCurrencyQuery",0,u],981501)},272347,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(455480),r=e.i(351144),i=e.i(254842),n=e.i(39771),s=e.i(965523),o=e.i(165102),c=e.i(430903),u=e.i(634317);function d(e){let d,m,p,g,h,x,C,S,y,f,j=(0,l.c)(29),{title:v,owner:b,stats:N,itemPreviews:k,bannerMedia:I,backgroundMedia:w,collection:F,disableCollectionLink:M,wrapContent:T}=e;j[0]!==F?(d=F?(0,a.readFragment)(u.SpotlightCarouselSlideLayoutFragment,F):void 0,j[0]=F,j[1]=d):d=j[1];let _=d;j[2]!==I?(m=(0,t.jsx)(o.Media,{lessThan:"md",children:(0,t.jsx)("div",{className:"relative aspect-6/7 sm:aspect-1/1",children:I})}),j[2]=I,j[3]=m):m=j[3],j[4]!==I?(p=(0,t.jsx)(o.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)("div",{className:"relative aspect-16/9 xl:aspect-auto xl:h-[400px]",children:I})}),j[4]=I,j[5]=p):p=j[5],j[6]!==N?(g=(0,t.jsx)(n.FlexCenter,{className:"mt-3 w-auto rounded-lg border border-frosted-4 bg-frosted-2 px-3 py-3 backdrop-blur-2xl md:w-fit md:px-4",children:N}),j[6]=N,j[7]=g):g=j[7],j[8]!==b||j[9]!==g||j[10]!==v?(h=(0,t.jsxs)(s.FlexColumn,{className:"w-full grow",children:[v,b,g]}),j[8]=b,j[9]=g,j[10]=v,j[11]=h):h=j[11],j[12]!==k||j[13]!==h?(x=(0,t.jsx)(i.Flex,{className:"pointer-events-none absolute inset-0 z-10 size-full items-end",children:(0,t.jsxs)(s.FlexColumn,{className:"pointer-events-auto w-full items-end p-3 md:w-full md:flex-row md:justify-between md:p-4 lg:gap-8 lg:p-5",children:[h,k]})}),j[12]=k,j[13]=h,j[14]=x):x=j[14],j[15]!==m||j[16]!==p||j[17]!==x?(C=(0,t.jsxs)(t.Fragment,{children:[m,p,x]}),j[15]=m,j[16]=p,j[17]=x,j[18]=C):C=j[18];let L=C;return j[19]!==_||j[20]!==M||j[21]!==L||j[22]!==T?(S=_&&!M?(0,t.jsx)(c.CollectionLink,{collection:_,children:L}):T?T(L):L,j[19]=_,j[20]=M,j[21]=L,j[22]=T,j[23]=S):S=j[23],j[24]!==S?(y=(0,t.jsx)(r.CarouselItem,{className:"relative inset-shadow-border w-full bg-bg-additional-1 pl-0 lg:rounded-lg",children:S}),j[24]=S,j[25]=y):y=j[25],j[26]!==w||j[27]!==y?(f=(0,t.jsxs)(t.Fragment,{children:[y,w]}),j[26]=w,j[27]=y,j[28]=f):f=j[28],f}e.s(["SpotlightCarouselSlideLayout",()=>d])},975672,e=>{"use strict";e.s(["statsClassName",0,"!gap-4 justify-between w-full md:justify-start md:w-auto"])},786174,817562,e=>{"use strict";var t=e.i(7683),l=e.i(866313),a=e.i(455480),r=e.i(670383),i=e.i(702361),n=e.i(666625),s=e.i(204083),o=e.i(178480),c=e.i(111778),u=e.i(794835),d=e.i(439765),m=e.i(333799),p=e.i(950293),g=e.i(592901),h=e.i(579323),x=e.i(62793),C=e.i(668493),S=e.i(375518),y=e.i(546149),f=e.i(981501),j=e.i(655476),v=e.i(272347),b=e.i(965523),N=e.i(165102),k=e.i(999258),I=e.i(705574),w=e.i(354667),F=e.i(493883),M=e.i(975672),T=e.i(700343),_=e.i(752259);function L(e){let r,i,n,s,o,c,u,d,m,p,g,h,x,C,S,y=(0,l.c)(37),{collection:f}=e;y[0]!==f?(r=(0,a.readFragment)(_.SpotlightCarouselSlideStatFragment,f),i=(0,F.getDropStatus)(r),y[0]=f,y[1]=r,y[2]=i):(r=y[1],i=y[2]);let j=i,v=j===w.DropStatus.MINTING;y[3]===Symbol.for("react.memo_cache_sentinel")?(n={all:{itemClassName:"items-start"}},y[3]=n):n=y[3],y[4]!==r?(s={className:M.statsClassName,collection:r,dividers:!0,overrides:n},y[4]=r,y[5]=s):s=y[5];let L=s;y[6]!==r||y[7]!==j?(o=function(){switch(j){case w.DropStatus.MINTING:{let e=[];return r.drop?.isMinting&&e.push("mint_status"),e.push("mint_price","mint_supply"),e}case w.DropStatus.MINTING_SOON:return["mint_price","mint_supply","mint_countdown"];default:return["floor_price","items_count","total_volume"]}},y[6]=r,y[7]=j,y[8]=o):o=y[8];let P=o;y[9]!==P?(c=P(),y[9]=P,y[10]=c):c=y[10];let B=c;y[11]!==r||y[12]!==j?(u=function(){switch(j){case w.DropStatus.MINTING:{let e=[];return r.drop?.isMinting&&e.push("mint_status"),e.push("mint_price","mint_supply"),e}case w.DropStatus.MINTING_SOON:return["mint_price","mint_supply","mint_countdown"];default:return["floor_price","items_count","total_volume","listed"]}},y[11]=r,y[12]=j,y[13]=u):u=y[13];let V=u;y[14]!==V?(d=V(),y[14]=V,y[15]=d):d=y[15];let D=d;return y[16]!==L||y[17]!==B?(m=(0,t.jsx)(I.CollectionStats,{stats:B,...L}),y[16]=L,y[17]=B,y[18]=m):m=y[18],y[19]!==r||y[20]!==v?(p=v?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(k.Separator,{}),(0,t.jsx)(T.DropMintProgress,{collection:r})]}):null,y[19]=r,y[20]=v,y[21]=p):p=y[21],y[22]!==m||y[23]!==p?(g=(0,t.jsx)(N.Media,{lessThan:"md",children:(0,t.jsxs)(b.FlexColumn,{className:"w-full gap-2",children:[m,p]})}),y[22]=m,y[23]=p,y[24]=g):g=y[24],y[25]!==L||y[26]!==D?(h=(0,t.jsx)(I.CollectionStats,{stats:D,...L}),y[25]=L,y[26]=D,y[27]=h):h=y[27],y[28]!==r||y[29]!==v?(x=v?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(k.Separator,{}),(0,t.jsx)(T.DropMintProgress,{collection:r})]}):null,y[28]=r,y[29]=v,y[30]=x):x=y[30],y[31]!==h||y[32]!==x?(C=(0,t.jsx)(N.Media,{greaterThanOrEqual:"md",children:(0,t.jsxs)(b.FlexColumn,{className:"gap-3",children:[h,x]})}),y[31]=h,y[32]=x,y[33]=C):C=y[33],y[34]!==g||y[35]!==C?(S=(0,t.jsxs)(t.Fragment,{children:[g,C]}),y[34]=g,y[35]=C,y[36]=S):S=y[36],S}var P=e.i(508833),B=e.i(22764),V=e.i(254842),D=e.i(738480),U=e.i(522285),O=e.i(132553);e.i(676104);var z=e.i(177464),E=e.i(356431),q=e.i(362626);function H(e){let r,i,n,s,o=(0,l.c)(6),{currency:c}=e;o[0]!==c?(r=(0,a.readFragment)(q.SpotlightTokenLockupTitleFragment,c),o[0]=c,o[1]=r):r=o[1];let u=r;return o[2]===Symbol.for("react.memo_cache_sentinel")?(i=(0,t.jsx)(P.CurrencyLockupAvatar,{}),o[2]=i):i=o[2],o[3]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsx)(B.CurrencyLockupContent,{children:(0,t.jsxs)(b.FlexColumn,{className:"gap-0",children:[(0,t.jsx)(P.CurrencyLockupTitle,{children:A}),(0,t.jsx)(P.CurrencyLockupSymbol,{className:"font-mono text-body-md text-text-secondary"})]})}),o[3]=n):n=o[3],o[4]!==u?(s=(0,t.jsxs)(P.CurrencyLockup,{className:"gap-4",currency:u,size:"xl",children:[i,n]}),o[4]=u,o[5]=s):s=o[5],s}function A(e){return(0,t.jsx)("span",{className:"font-medium text-md text-text-primary leading-none",children:e})}function R(e){let r,i,n,s,o,c,u,d,m=(0,l.c)(21),{currency:p}=e;m[0]!==p?(r=(0,a.readFragment)(E.SpotlightTokenLockupStatsFragment,p),m[0]=p,m[1]=r):r=m[1];let g=r,h=(0,U.useTranslations)("CurrencyStats"),x=(0,U.useTranslations)("CurrencyStatsModuleTableHeader"),C=g.stats,S=g.tokenGroup?.stats?.marketCapUsd??C?.marketCapUsd;m[2]!==x?(i=x("price"),m[2]=x,m[3]=i):i=m[3],m[4]!==i?(n=(0,t.jsx)(z.StatDisplayItemLabel,{className:"text-left",children:i}),m[4]=i,m[5]=n):n=m[5];let y=Number(g.usdPrice);return m[6]!==y?(s=(0,t.jsx)(z.StatDisplayItemValue,{className:"text-left",children:(0,t.jsx)(O.CurrencyPriceDisplay,{value:y})}),m[6]=y,m[7]=s):s=m[7],m[8]!==n||m[9]!==s?(o=(0,t.jsxs)(z.StatDisplayItem,{className:"items-start text-left",children:[n,s]}),m[8]=n,m[9]=s,m[10]=o):o=m[10],m[11]!==C||m[12]!==h?(c=C?.oneDay?.volume?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(k.Separator,{className:"h-auto",orientation:"vertical"}),(0,t.jsxs)(z.StatDisplayItem,{className:"items-start text-left",children:[(0,t.jsx)(z.StatDisplayItemLabel,{className:"text-left",children:h("oneDayVolume")}),(0,t.jsx)(z.StatDisplayItemValue,{className:"text-left",children:(0,t.jsx)(D.NumberDisplay,{bounded:!1,display:"usd",value:C.oneDay.volume})})]})]}):null,m[11]=C,m[12]=h,m[13]=c):c=m[13],m[14]!==S||m[15]!==h?(u=S?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(k.Separator,{className:"h-auto",orientation:"vertical"}),(0,t.jsxs)(z.StatDisplayItem,{className:"items-start text-left",children:[(0,t.jsx)(z.StatDisplayItemLabel,{className:"text-left",children:h("fdv")}),(0,t.jsx)(z.StatDisplayItemValue,{className:"text-left",children:(0,t.jsx)(D.NumberDisplay,{bounded:!1,display:"usd",value:S})})]})]}):null,m[14]=S,m[15]=h,m[16]=u):u=m[16],m[17]!==o||m[18]!==c||m[19]!==u?(d=(0,t.jsx)(V.Flex,{className:"items-start gap-3",children:(0,t.jsxs)(z.StatDisplay,{className:"shrink-0",size:"sm",children:[o,c,u]})}),m[17]=o,m[18]=c,m[19]=u,m[20]=d):d=m[20],d}var G=e.i(39771),$=e.i(310578),Q=e.i(625236),W=e.i(890542);let K=()=>(0,t.jsxs)(V.Flex,{className:"w-full items-center gap-3",children:[(0,t.jsx)(G.FlexCenter,{className:"size-12 overflow-hidden rounded-xl",children:(0,t.jsx)($.SkeletonBlock,{variant:"on-background"})}),(0,t.jsxs)(b.FlexColumn,{className:"w-full max-w-sm gap-2",children:[(0,t.jsx)(Q.TextHeadingSkeleton,{className:"w-2/3",size:"lg",variant:"on-background"}),(0,t.jsx)(p.TextBodySkeleton,{className:"w-24",size:"sm",variant:"on-background"})]})]}),Y=()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.Media,{lessThan:"md",children:(0,t.jsx)(W.CollectionStatsSkeleton,{className:M.statsClassName,count:3,dividers:!0})}),(0,t.jsx)(N.Media,{greaterThanOrEqual:"md",children:(0,t.jsx)(W.CollectionStatsSkeleton,{className:M.statsClassName,count:4,dividers:!0})})]});e.i(818304);let J={requestPolicy:"network-only",suspense:!1};function X(){let e,a=(0,l.c)(1);return a[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)("div",{className:"dark absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(0,0,0,0.35)25%,rgba(0,0,0,0.65)65%,rgba(0,0,0,0.8)100%)]"}),a[0]=e):e=a[0],e}function Z(e){let r,i,n,s,o,c,b,N,k,I,w,F,M,T,_,P=(0,l.c)(46),{collection:B,index:V,priority:D,visibleIndex:U,isInView:O,shouldRenderVideo:z}=e;if(P[0]!==B){var E;let e;r=(0,a.readFragment)(j.SpotlightCarouselSlideFragment,B),i=(0,x.getCollectionBannerImage)(r),E=r,n=(e=E?.slug?.toLowerCase()??"").startsWith("shell-")||e.endsWith("-shell"),P[0]=B,P[1]=r,P[2]=i,P[3]=n}else r=P[1],i=P[2],n=P[3];let q=n,A=!!(r.id&&q);P[4]!==r.id?(s={metadataCollectionId:r.id},P[4]=r.id,P[5]=s):s=P[5];let G=s,$=!A;P[6]!==G||P[7]!==$?(o={query:f.SpotlightCarouselSlideCurrencyQuery,variables:G,pause:$,context:J},P[6]=G,P[7]=$,P[8]=o):o=P[8];let[Q]=(0,m.useQuery)(o),{data:W}=Q,Z=W?.currencyByMetadataCollectionIdV2??null,ee=q&&!Z;P[9]!==r||P[10]!==Z||P[11]!==ee?(c=ee||Z?null:(0,t.jsx)(p.TextBody,{className:"w-fit",children:(0,t.jsx)(h.CollectionOwner,{collection:r,overrides:{VerifiedIcon:{size:14,innerFill:"white",fill:"bg-contrast-1"}},renderAsChip:!1,variant:"compact"})}),P[9]=r,P[10]=Z,P[11]=ee,P[12]=c):c=P[12];let et=c;P[13]!==r||P[14]!==Z||P[15]!==ee?(b=ee?(0,t.jsx)(Y,{}):Z?(0,t.jsx)(R,{currency:Z}):(0,t.jsx)(L,{collection:r}),P[13]=r,P[14]=Z,P[15]=ee,P[16]=b):b=P[16];let el=b;P[17]!==r||P[18]!==Z||P[19]!==ee?(N=ee?(0,t.jsx)(K,{}):Z?(0,t.jsx)(H,{currency:Z}):(0,t.jsx)(u.CollectionLockup,{className:"gap-2",collection:r,children:(0,t.jsx)(d.CollectionLockupContent,{children:(0,t.jsx)(u.CollectionLockupTitle,{badge:(0,t.jsx)(u.CollectionLockupBadge,{className:"size-6"}),className:"text-display-sm md:text-heading-lg",weight:"semibold"})})}),P[17]=r,P[18]=Z,P[19]=ee,P[20]=N):N=P[20];let ea=N;P[21]!==i||P[22]!==V||P[23]!==U?(k=i?(0,t.jsx)(S.SpotlightCarouselBackgroundImage,{imageUrl:i,index:V,visibleIndex:U}):null,P[21]=i,P[22]=V,P[23]=U,P[24]=k):k=P[24];let er=!(void 0===z||z)||!1===O;P[25]===Symbol.for("react.memo_cache_sentinel")?(I=(0,t.jsx)(X,{}),w={mobile:{width:void 0,height:600}},P[25]=I,P[26]=w):(I=P[25],w=P[26]),P[27]!==r||P[28]!==D||P[29]!==er?(F=(0,t.jsx)(g.CollectionBannerMedia,{collection:r,disableVideo:er,overlay:I,overrides:w,priority:D,sizes:"100vw",width:1440}),P[27]=r,P[28]=D,P[29]=er,P[30]=F):F=P[30];let ei=!!Z;return P[31]!==r||P[32]!==q?(M=q?null:(0,t.jsx)(y.SpotlightCarouselItemPreviews,{collection:r}),P[31]=r,P[32]=q,P[33]=M):M=P[33],P[34]!==Z?(T=Z?e=>(0,t.jsx)(C.CurrencyLink,{currency:Z,variant:"unstyled",children:e}):void 0,P[34]=Z,P[35]=T):T=P[35],P[36]!==r||P[37]!==et||P[38]!==el||P[39]!==k||P[40]!==F||P[41]!==ei||P[42]!==M||P[43]!==T||P[44]!==ea?(_=(0,t.jsx)(v.SpotlightCarouselSlideLayout,{backgroundMedia:k,bannerMedia:F,collection:r,disableCollectionLink:ei,itemPreviews:M,owner:et,stats:el,title:ea,wrapContent:T}),P[36]=r,P[37]=et,P[38]=el,P[39]=k,P[40]=F,P[41]=ei,P[42]=M,P[43]=T,P[44]=ea,P[45]=_):_=P[45],_}function ee(e){let a,s,u,d,m,p,g,h=(0,l.c)(24),{collections:x}=e,C=(0,r.useRef)(null),{slidesInView:S,setApi:y,shouldRenderVideo:f}=(0,n.useSlidesInView)(x.length);h[0]!==x?(a=x.map(et),h[0]=x,h[1]=a):a=h[1];let j=a;h[2]!==j?(s=e=>{let t=j[e];return t?{surface:i.CONTENT_IMPRESSION_SURFACES.HOMEPAGE_SPOTLIGHT,contentType:i.CONTENT_IMPRESSION_TYPES.COLLECTION,contentId:t.slug,contentName:t.name,position:e}:null},h[2]=j,h[3]=s):s=h[3];let v=s;if((0,i.useContentImpressionTracking)(S,v),0===x.length)return null;if(h[4]!==j||h[5]!==f||h[6]!==S){let e;h[8]!==f||h[9]!==S?(e=(e,l)=>{let a=S.includes(l),r=f(l);return(0,t.jsx)(Z,{collection:e,index:l,isInView:a,priority:0===l,shouldRenderVideo:r,visibleIndex:S[0]},e.id)},h[8]=f,h[9]=S,h[10]=e):e=h[10],u=j.map(e),h[4]=j,h[5]=f,h[6]=S,h[7]=u}else u=h[7];let b=x.length>1;h[11]!==b?(d={active:b},h[11]=b,h[12]=d):d=h[12],h[13]!==y||h[14]!==d?(m={setApi:y,ref:C,options:d},h[13]=y,h[14]=d,h[15]=m):m=h[15],h[16]!==x[0]||h[17]!==x.length?(p=(0,t.jsx)(o.SpotlightCarouselBackgroundImageInitial,{collection:x[0],count:x.length}),h[16]=x[0],h[17]=x.length,h[18]=p):p=h[18];let N=x.length>1;return h[19]!==u||h[20]!==m||h[21]!==p||h[22]!==N?(g=(0,t.jsx)(c.SpotlightCarouselLayout,{carouselContent:u,carouselProps:m,contentClassNames:"dark",initialBackground:p,showCarouselDots:N}),h[19]=u,h[20]=m,h[21]=p,h[22]=N,h[23]=g):g=h[23],g}function et(e){return(0,a.readFragment)(s.SpotlightCarouselFragment,e)}e.s(["SpotlightCarousel",()=>ee],817562),e.s([],786174)}]);

//# debugId=89f38a05-cf78-e588-4b7d-ebd0819cc6b4
//# sourceMappingURL=71451d2047898745.js.map