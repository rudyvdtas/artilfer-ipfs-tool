;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e6a1fb69-6c32-e82e-92f0-f52ee71c37dd")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,494679,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(703379),r=e.i(437153);let s=(0,l.tv)({base:"will-change-[mask-size,mask-position] [mask-position:0px] [mask-size:100%]",variants:{variant:{container:(0,r.classNames)("[mask-image:linear-gradient(to_right,transparent,black_theme(spacing.4),black_calc(100%_-_theme(spacing.4)),transparent)]","lg:[mask-image:linear-gradient(to_right,transparent,black_theme(spacing.4),black_calc(100%_-_theme(spacing.6)),transparent)]")},side:{both:"",left:"",right:"",none:""}},defaultVariants:{variant:"container"},compoundVariants:[{variant:"container",side:["left","right"],className:(0,r.classNames)("[mask-size:calc(100%+theme(spacing.4))]","lg:[mask-size:calc(100%+theme(spacing.6))]")},{variant:"container",side:["none","right"],className:(0,r.classNames)("[mask-position:calc(theme(spacing.4)*-1)]","lg:[mask-position:calc(theme(spacing.6)*-1)]")},{variant:"container",side:"none",className:(0,r.classNames)("[mask-size:calc(100%+(theme(spacing.4)*2))]","lg:[mask-size:calc(100%+(theme(spacing.6)*2))]")}]});function n(e){let l,n,a,o,c,u,d,m=(0,i.c)(14);m[0]!==e?({children:l,className:n,variant:o,side:c,...a}=e,m[0]=e,m[1]=l,m[2]=n,m[3]=a,m[4]=o,m[5]=c):(l=m[1],n=m[2],a=m[3],o=m[4],c=m[5]);let p=void 0===o?"container":o,h=void 0===c?"both":c;return m[6]!==n||m[7]!==h||m[8]!==p?(u=(0,r.classNames)(s({variant:p,side:h}),n),m[6]=n,m[7]=h,m[8]=p,m[9]=u):u=m[9],m[10]!==l||m[11]!==a||m[12]!==u?(d=(0,t.jsx)("div",{className:u,...a,children:l}),m[10]=l,m[11]=a,m[12]=u,m[13]=d):d=m[13],d}e.s(["GradientMask",()=>n])},902689,e=>{"use strict";var t=e.i(866313),i=e.i(885530);e.i(402819);var l=e.i(916744);let r=(0,i.graphql)(`
  subscription DropMintProgressSubscription($collectionSlug: String!) {
    dropBySlug(slug: $collectionSlug) {
      __typename
      ... on Erc721SeaDropV1 {
        totalSupply
      }
      ... on Erc1155SeaDropV2 {
        tokenSupply {
          tokenId
          totalSupply
        }
      }
    }
  }
`);function s(e,i){let s,o,c,u=(0,t.c)(7),d=e??"";u[0]!==d?(s={collectionSlug:d},u[0]=d,u[1]=s):s=u[1];let m=!e;u[2]!==s||u[3]!==m?(o={query:r,variables:s,pause:m},u[2]=s,u[3]=m,u[4]=o):o=u[4],u[5]!==i?(c=e=>{let t=e.dropBySlug,l=t?.__typename==="Erc1155SeaDropV2"?t.tokenSupply.reduce(a,0):Number(t?.totalSupply),r=t?.__typename==="Erc1155SeaDropV2"?t.tokenSupply.map(n):void 0;i?.({totalSupply:l,totalSupplyPerToken:r})},u[5]=i,u[6]=c):c=u[6],(0,l.useSubscription)(o,c)}function n(e){return{tokenId:String(e.tokenId),totalSupply:Number(e.totalSupply)}}function a(e,t){return e+Number(t.totalSupply)}e.s(["useMintProgressSubscription",()=>s])},920296,e=>{"use strict";var t=e.i(437153);let i=(0,e.i(703379).tv)({base:(0,t.classNames)("h-[calc(100vh-theme(spacing.sm-top-nav))]","lg:h-[calc(100vh-theme(spacing.lg-top-nav)-theme(spacing.page-footer))]")});function l({gutterSize:e=12,offset:t=0,peekValue:i=80,viewSize:l,visibleSlides:r}){let s=0;return r>2&&(s=(i+(r-2)*e)/r),1/r*l+s+t}e.s(["calculateCarouselAlignment",()=>l,"discoverHeightVariants",0,i])},666625,e=>{"use strict";var t=e.i(866313),i=e.i(692632),l=e.i(670383);function r(e){let r,s,n,a,o,c,u,d=(0,t.c)(18),[m,p]=(0,l.useState)(null),h=Math.floor(e/3);d[0]!==h?(r=(0,i.range)(h),d[0]=h,d[1]=r):r=d[1];let[f,x]=(0,l.useState)(r);d[2]!==m?(s=function(){x(e=>{let t=m?.slidesInView()??[];return 0===t.length?e:t})},d[2]=m,d[3]=s):s=d[3];let g=s;d[4]!==m||d[5]!==g?(n=()=>(g(),m?.on("slidesInView",g),()=>{m?.off("slidesInView",g)}),d[4]=m,d[5]=g,d[6]=n):n=d[6],d[7]!==m?(a=[m],d[7]=m,d[8]=a):a=d[8],(0,l.useEffect)(n,a),d[9]!==f?(o=function(e,t){let i=void 0===t?2:t,l=Math.min(...f),r=Math.max(...f);return Math.abs(e-l)<=i||Math.abs(e-r)<=i},d[9]=f,d[10]=o):o=d[10];let S=o;d[11]!==S?(c=function(e){return S(e,1)},d[11]=S,d[12]=c):c=d[12];let j=c;return d[13]!==m||d[14]!==S||d[15]!==j||d[16]!==f?(u={api:m,slidesInView:f,setApi:p,shouldRenderSlide:S,shouldRenderVideo:j},d[13]=m,d[14]=S,d[15]=j,d[16]=f,d[17]=u):u=d[17],u}e.s(["useSlidesInView",()=>r])},171368,14871,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(794835),r=e.i(439765),s=e.i(47667),n=e.i(455480),a=e.i(567089),o=e.i(39771),c=e.i(950293),u=e.i(266341),d=e.i(522285),m=e.i(592901),p=e.i(354667),h=e.i(763093),f=e.i(493883),x=e.i(209293),g=e.i(430903),S=e.i(682576),j=e.i(190627),y=e.i(885530),b=e.i(906482),v=e.i(959105);let C=(0,y.graphql)(`
    fragment FeaturedDropSlide on Drop {
      __typename
      identifier {
        contractAddress
        chain {
          identifier
        }
      }
      collection {
        id
        slug
        ...CollectionLockup
        ...CollectionBannerMedia
        ...CollectionLink
        floorPrice {
          pricePerItem {
            ...TokenPrice
          }
        }
        stats {
          oneDay {
            floorPriceChange
          }
        }
        ...getDropStatus
      }
      activeDropStage {
        price {
          ...TokenPrice
        }
      }
      stages {
        startTime
      }
      isMinting
      isMintedOut
    }
  `,[j.TokenPriceFragment,v.CollectionLinkFragment,b.CollectionBannerMediaFragment,f.getDropStatusFragment,S.CollectionLockupFragment]);function _(e){let S,j,y,b,v,_,N,k,D,w=(0,i.c)(27),{item:F}=e,T=(0,n.readFragment)(C,F),$=(0,d.useTranslations)("FeaturedDropSlide"),A=(0,h.useFormatStageDate)(),P=T.collection;if(!P)return null;let z=(0,f.getDropStatus)(P),M=z===p.DropStatus.MINTING,I=M||z===p.DropStatus.MINTING_SOON,L=A(T.stages?.[0]?.startTime);return w[0]!==P?(S=(0,t.jsx)(m.CollectionBannerMedia,{collection:P,disableVideo:!0,height:300,sizes:"(min-width: 1024px) 300px, (min-width: 768px) calc(100vw - 70px), calc(100vw - 76px)",width:600}),w[0]=P,w[1]=S):S=w[1],w[2]===Symbol.for("react.memo_cache_sentinel")?(j=(0,t.jsx)(r.CollectionLockupContent,{children:(0,t.jsx)(l.CollectionLockupTitle,{})}),w[2]=j):j=w[2],w[3]!==P?(y=(0,t.jsx)(l.CollectionLockup,{collection:P,children:j}),w[3]=P,w[4]=y):y=w[4],w[5]!==L||w[6]!==M||w[7]!==I||w[8]!==$?(b=I?M?(0,t.jsx)(a.Chip,{className:"mr-2 border-success-1 bg-transparent text-success-1",children:$("mintingNow")}):(0,t.jsx)(c.TextBody,{color:"text-secondary",size:"sm",children:L}):(0,t.jsxs)(c.TextBody,{color:"text-secondary",size:"sm",children:[$("floorPrice")," "]}),w[5]=L,w[6]=M,w[7]=I,w[8]=$,w[9]=b):b=w[9],w[10]!==P||w[11]!==M||w[12]!==T||w[13]!==I?(v=I?M?(0,t.jsx)(s.TokenPrice,{price:T.activeDropStage?.price}):null:(0,t.jsx)(s.TokenPrice,{price:P.floorPrice?.pricePerItem}),w[10]=P,w[11]=M,w[12]=T,w[13]=I,w[14]=v):v=w[14],w[15]!==v?(_=(0,t.jsx)(u.TextLabel,{color:"text-secondary",size:"sm",weight:"semibold",children:v}),w[15]=v,w[16]=_):_=w[16],w[17]!==b||w[18]!==_?(N=(0,t.jsxs)(o.FlexCenter,{children:[b,_]}),w[17]=b,w[18]=_,w[19]=N):N=w[19],w[20]!==S||w[21]!==y||w[22]!==N?(k=(0,t.jsxs)(x.FeaturedCarouselSlide,{bannerMedia:S,children:[y,N]}),w[20]=S,w[21]=y,w[22]=N,w[23]=k):k=w[23],w[24]!==P||w[25]!==k?(D=(0,t.jsx)(g.CollectionLink,{collection:P,children:k}),w[24]=P,w[25]=k,w[26]=D):D=w[26],D}e.s(["FeaturedDropSlideFragment",0,C],14871),e.s(["FeaturedDropSlide",()=>_],171368)},538407,637796,e=>{"use strict";e.i(171368);var t=e.i(7683),i=e.i(866313),l=e.i(437153),r=e.i(39771),s=e.i(965523),n=e.i(251577),a=e.i(310578);function o(e){let o,c,u,d,m,p,h,f,x,g,S,j,y,b,v,C=(0,i.c)(35),{className:_,skeletonClassName:N}=e;return C[0]!==_?(o=(0,l.classNames)("relative aspect-3/2 justify-end rounded-lg p-3",(0,n.insetBorderVariants)({positioning:"absolute"}),_),C[0]=_,C[1]=o):o=C[1],C[2]!==N?(c=(0,l.classNames)("size-full",N),C[2]=N,C[3]=c):c=C[3],C[4]!==c?(u=(0,t.jsx)("div",{className:"absolute inset-0 z-[-1] overflow-hidden rounded-lg",children:(0,t.jsx)(a.SkeletonBlock,{className:c})}),C[4]=c,C[5]=u):u=C[5],C[6]!==N?(d=(0,l.classNames)("size-4",N),C[6]=N,C[7]=d):d=C[7],C[8]!==d?(m=(0,t.jsx)(a.SkeletonCircle,{className:d,variant:"on-background"}),C[8]=d,C[9]=m):m=C[9],C[10]!==N?(p=(0,l.classNames)("h-5 w-32",N),C[10]=N,C[11]=p):p=C[11],C[12]!==p?(h=(0,t.jsx)(a.SkeletonLine,{className:p,variant:"on-background"}),C[12]=p,C[13]=h):h=C[13],C[14]!==m||C[15]!==h?(f=(0,t.jsxs)(r.FlexCenter,{className:"w-full justify-start gap-2",children:[m,h]}),C[14]=m,C[15]=h,C[16]=f):f=C[16],C[17]!==N?(x=(0,l.classNames)("h-4 w-16",N),C[17]=N,C[18]=x):x=C[18],C[19]!==x?(g=(0,t.jsx)(a.SkeletonLine,{className:x,variant:"on-background"}),C[19]=x,C[20]=g):g=C[20],C[21]!==N?(S=(0,l.classNames)("h-4 w-20",N),C[21]=N,C[22]=S):S=C[22],C[23]!==S?(j=(0,t.jsx)(a.SkeletonLine,{className:S,variant:"on-background"}),C[23]=S,C[24]=j):j=C[24],C[25]!==g||C[26]!==j?(y=(0,t.jsxs)(r.FlexCenter,{className:"w-full justify-start gap-2",children:[g,j]}),C[25]=g,C[26]=j,C[27]=y):y=C[27],C[28]!==y||C[29]!==f?(b=(0,t.jsxs)(s.FlexColumn,{className:"gap-2",children:[f,y]}),C[28]=y,C[29]=f,C[30]=b):b=C[30],C[31]!==o||C[32]!==b||C[33]!==u?(v=(0,t.jsxs)(s.FlexColumn,{className:o,children:[u,b]}),C[31]=o,C[32]=b,C[33]=u,C[34]=v):v=C[34],v}e.s(["FeaturedDropSlideSkeleton",()=>o],637796),e.s([],538407)},23736,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(437153),r=e.i(965523),s=e.i(501811),n=e.i(708969),a=e.i(840651);function o(e){let o,c,u,d,m,p=(0,i.c)(12),{title:h,description:f,carousel:x,className:g}=e;return p[0]!==g?(o=(0,l.classNames)((0,n.discoverShelfVariants)().container(),g),p[0]=g,p[1]=o):o=p[1],p[2]!==f||p[3]!==h?(c=(0,t.jsx)(a.ShelfHeader,{description:f,title:h}),p[2]=f,p[3]=h,p[4]=c):c=p[4],p[5]===Symbol.for("react.memo_cache_sentinel")?(u=(0,s.fullBleedVariants)({mobileOnly:!0}),p[5]=u):u=p[5],p[6]!==x?(d=(0,t.jsx)("div",{className:u,children:x}),p[6]=x,p[7]=d):d=p[7],p[8]!==o||p[9]!==c||p[10]!==d?(m=(0,t.jsxs)(r.FlexColumn,{className:o,children:[c,d]}),p[8]=o,p[9]=c,p[10]=d,p[11]=m):m=p[11],m}e.s(["DropsPageShelf",()=>o])},796793,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(885530),r=e.i(333799),s=e.i(471317);e.i(145404);var n=e.i(231592),a=e.i(389852);e.i(500598);var o=e.i(207225),c=e.i(71105),u=e.i(171368),d=e.i(14871),m=e.i(965523),p=e.i(625236),h=e.i(522285),f=e.i(231513),x=e.i(437153),g=e.i(39771),S=e.i(692632);e.i(538407);var j=e.i(637796);function y(e){let l,r,s,n,a,o=(0,i.c)(12),{children:c,className:u,skeletonClassName:d}=e;o[0]!==d?(l=(0,S.range)(6).map(e=>(0,t.jsx)(j.FeaturedDropSlideSkeleton,{className:"mr-3 basis-[calc(100%-76px)] md:mr-4 md:basis-[calc(100%-70px)] lg:basis-[300px]",skeletonClassName:d},`skeleton-${e}`)),o[0]=d,o[1]=l):l=o[1];let m=l;return o[2]!==u?(r=(0,x.classNames)("absolute inset-0 w-[200vw] overflow-x-hidden",u),o[2]=u,o[3]=r):r=o[3],o[4]!==m||o[5]!==r?(s=(0,t.jsx)(g.FlexCenter,{className:r,children:m}),o[4]=m,o[5]=r,o[6]=s):s=o[6],o[7]!==c?(n=c&&(0,t.jsx)(g.FlexCenter,{className:"absolute inset-0 w-1/2",children:c}),o[7]=c,o[8]=n):n=o[8],o[9]!==s||o[10]!==n?(a=(0,t.jsxs)(g.FlexCenter,{className:"relative h-[200px]",children:[s,n]}),o[9]=s,o[10]=n,o[11]=a):a=o[11],a}function b(e){let l,r,s,n,a,o,c=(0,i.c)(12);return c[0]!==e?({className:l,skeletonClassName:s,...r}=e,c[0]=e,c[1]=l,c[2]=r,c[3]=s):(l=c[1],r=c[2],s=c[3]),c[4]!==l?(n=(0,x.classNames)("[mask-image:linear-gradient(to_right,transparent,black,black)]",l),c[4]=l,c[5]=n):n=c[5],c[6]!==s?(a=(0,x.classNames)("animate-none",s),c[6]=s,c[7]=a):a=c[7],c[8]!==r||c[9]!==n||c[10]!==a?(o=(0,t.jsx)(y,{...r,className:n,skeletonClassName:a}),c[8]=r,c[9]=n,c[10]=a,c[11]=o):o=c[11],o}var v=e.i(23736);function C(e){let l,r,s,n=(0,i.c)(8),{children:a}=e,o=(0,h.useTranslations)("DropsAllowlistShelf");return n[0]!==o?(l=o("description"),n[0]=o,n[1]=l):l=n[1],n[2]!==o?(r=o("title"),n[2]=o,n[3]=r):r=n[3],n[4]!==a||n[5]!==l||n[6]!==r?(s=(0,t.jsx)(v.DropsPageShelf,{carousel:a,description:l,title:r}),n[4]=a,n[5]=l,n[6]=r,n[7]=s):s=n[7],s}function _(){let e,l,r,s,n,a=(0,i.c)(11),o=(0,h.useTranslations)("DropsAllowlistShelfAuth");return a[0]!==o?(e=o("title"),a[0]=o,a[1]=e):e=a[1],a[2]!==e?(l=(0,t.jsx)(p.TextHeading,{size:"sm",children:e}),a[2]=e,a[3]=l):l=a[3],a[4]!==o?(r=o("signInWithEthereumButton"),a[4]=o,a[5]=r):r=a[5],a[6]!==r?(s=(0,t.jsx)("span",{children:(0,t.jsx)(f.ConnectButton,{requireAuthentication:!0,size:"md",variant:"primary",children:r})}),a[6]=r,a[7]=s):s=a[7],a[8]!==l||a[9]!==s?(n=(0,t.jsx)(C,{children:(0,t.jsx)(b,{children:(0,t.jsxs)(m.FlexColumn,{className:"mx-6 gap-4",children:[l,s]})})}),a[8]=l,a[9]=s,a[10]=n):n=a[10],n}function N(){let e,l,r=(0,i.c)(4),s=(0,h.useTranslations)("DropsAllowlistShelfEmptyState");return r[0]!==s?(e=s("title"),r[0]=s,r[1]=e):e=r[1],r[2]!==e?(l=(0,t.jsx)(C,{children:(0,t.jsx)(b,{children:(0,t.jsx)(m.FlexColumn,{className:"mx-6 gap-4",children:(0,t.jsx)(p.TextHeading,{size:"sm",children:e})})})}),r[2]=e,r[3]=l):l=r[3],l}function k(e){let l,r,s=(0,i.c)(4);return s[0]!==e?({...l}=e,s[0]=e,s[1]=l):l=s[1],s[2]!==l?(r=(0,t.jsx)(C,{children:(0,t.jsx)(y,{...l})}),s[2]=l,s[3]=r):r=s[3],r}let D=(0,l.graphql)(`
    query DropsAllowlistShelfQuery {
      dropCalendarUserOnAllowlistUpcoming {
        __typename
        identifier {
          contractAddress
          chain {
            identifier
          }
        }
        ...FeaturedDropSlide
      }
    }
  `,[d.FeaturedDropSlideFragment]),w={ttl:s.TTL["5m"]};function F(e){return null!==e}function T(e){if(!e)return null;let i=e.identifier?.contractAddress&&e.identifier?.chain?.identifier?`${e.identifier.contractAddress}-${e.identifier.chain.identifier}`:`fallback-${e.__typename}`;return{slide:(0,t.jsx)(u.FeaturedDropSlide,{item:e}),key:i}}let $=(0,a.withSuspense)(function(){let e,l,s,a,u,d=(0,i.c)(12),m=(0,o.useAddress)(),p=(0,c.useAuthenticated)();d[0]===Symbol.for("react.memo_cache_sentinel")?(e={},d[0]=e):e=d[0];let h=!(m&&p);d[1]!==h?(l={query:D,variables:e,context:w,pause:h},d[1]=h,d[2]=l):l=d[2];let[f]=(0,r.useQuery)(l),{data:x,fetching:g}=f;if(!p){let e;return d[3]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(_,{}),d[3]=e):e=d[3],e}d[4]!==x?.dropCalendarUserOnAllowlistUpcoming?(s=x?.dropCalendarUserOnAllowlistUpcoming||[],d[4]=x?.dropCalendarUserOnAllowlistUpcoming,d[5]=s):s=d[5];let S=s;if(g){let e;return d[6]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(k,{}),d[6]=e):e=d[6],e}if(0===S.length){let e;return d[7]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(N,{}),d[7]=e):e=d[7],e}d[8]!==S?(a=S.map(T).filter(F),d[8]=S,d[9]=a):a=d[9];let j=a;return d[10]!==j?(u=(0,t.jsx)(C,{children:(0,t.jsx)(n.FeaturedCarousel,{slides:j})}),d[10]=j,d[11]=u):u=d[11],u},{fallback:k});e.s(["DropsAllowlistShelf",0,$],796793)},368951,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(885530),r=e.i(333799),s=e.i(471317);e.i(145404);var n=e.i(231592),a=e.i(920296),o=e.i(389852),c=e.i(100868),u=e.i(491150),d=e.i(861993),m=e.i(39771),p=e.i(965523),h=e.i(950293),f=e.i(625236),x=e.i(266341),g=e.i(522285);function S(e){let l,r,s,n,a,o,S,j,y=(0,i.c)(22),{spotlight:b}=e,v=(0,g.useTranslations)("CreatorSpotlightSlide"),{title:C,imageUrl:_,description:N,url:k,author:D}=b;return y[0]!==C?(l=(0,t.jsx)(f.TextHeading,{className:"line-clamp-2 3xl:line-clamp-none",size:"md",children:C}),y[0]=C,y[1]=l):l=y[1],y[2]!==D||y[3]!==v?(r=D&&(0,t.jsx)(x.TextLabel,{className:"normal-case",color:"text-secondary",children:v("by",{author:D.toUpperCase()})}),y[2]=D,y[3]=v,y[4]=r):r=y[4],y[5]!==l||y[6]!==r?(s=(0,t.jsxs)(p.FlexColumn,{className:"gap-1",children:[l,r]}),y[5]=l,y[6]=r,y[7]=s):s=y[7],y[8]!==N?(n=N&&(0,t.jsx)(h.TextBody,{className:"line-clamp-3",color:"text-secondary",size:"sm",children:N}),y[8]=N,y[9]=n):n=y[9],y[10]!==s||y[11]!==n?(a=(0,t.jsxs)(p.FlexColumn,{className:"mt-4 mr-4 ml-4 gap-2 md:mt-6 md:mr-6 md:ml-6 2xl:mt-0 2xl:ml-6 2xl:w-[400px]",children:[s,n]}),y[10]=s,y[11]=n,y[12]=a):a=y[12],y[13]!==_||y[14]!==C?(o=_&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(m.FlexCenter,{className:"relative flex h-full w-full overflow-hidden rounded",children:[(0,t.jsx)(c.Image,{alt:C,className:"h-full w-full rounded object-cover",height:500,src:_,width:440}),(0,t.jsx)("div",{className:"absolute inset-0 inset-shadow-border rounded"})]}),(0,t.jsx)(c.Image,{alt:C,className:"absolute inset-0 -z-10 size-full scale-150 object-cover opacity-40 blur-3xl",height:8,src:_,width:8})]}),y[13]=_,y[14]=C,y[15]=o):o=y[15],y[16]!==a||y[17]!==o?(S=(0,t.jsx)(d.Card,{className:"relative h-full overflow-hidden p-0",children:(0,t.jsxs)(m.FlexCenter,{className:"z-10 h-full grow flex-col items-start gap-4 2xl:flex-row 2xl:items-center 2xl:gap-6",children:[a,o]})}),y[16]=a,y[17]=o,y[18]=S):S=y[18],y[19]!==S||y[20]!==k?(j=(0,t.jsx)(u.Link,{href:k,target:"_blank",variant:"unstyled",children:S}),y[19]=S,y[20]=k,y[21]=j):j=y[21],j}var j=e.i(23736);function y(e){let l,r,s=(0,i.c)(5),{children:n}=e,a=(0,g.useTranslations)("DropsCreatorSpotlightsShelf");return s[0]!==a?(l=a("title"),s[0]=a,s[1]=l):l=s[1],s[2]!==n||s[3]!==l?(r=(0,t.jsx)(j.DropsPageShelf,{carousel:n,title:l}),s[2]=n,s[3]=l,s[4]=r):r=s[4],r}var b=e.i(692632),v=e.i(254842),C=e.i(310578);function _(){let e,l,r=(0,i.c)(2);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(v.Flex,{className:"relative aspect-16/9 w-full",children:(0,t.jsx)(C.Skeleton,{className:"absolute inset-0"})}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsxs)(d.Card,{className:"h-full",children:[e,(0,t.jsxs)(p.FlexColumn,{className:"flex-1 gap-2 p-4",children:[(0,t.jsx)(C.Skeleton,{className:"h-5 w-3/4"}),(0,t.jsx)(C.Skeleton,{className:"h-4 w-full"}),(0,t.jsx)(C.Skeleton,{className:"h-4 w-5/6"}),(0,t.jsx)(C.Skeleton,{className:"h-4 w-1/2"}),(0,t.jsx)(C.Skeleton,{className:"mt-auto h-4 w-24"})]})]}),r[1]=l):l=r[1],l}function N(e){return{slide:(0,t.jsx)(_,{}),key:`skeleton-${e}`}}let k=(0,l.graphql)(`
  query DropsCreatorSpotlightsQuery {
    recentCreatorSpotlights {
      title
      imageUrl
      description
      url
      author
    }
  }
`),D={ttl:s.TTL["5m"]};function w(e){return(0,a.calculateCarouselAlignment)({viewSize:e,visibleSlides:2,offset:0})}function F(e){return{slide:(0,t.jsx)(S,{spotlight:e}),key:e.url}}let T=(0,o.withSuspense)(function(){let e,l,s,a,o,c=(0,i.c)(8);c[0]===Symbol.for("react.memo_cache_sentinel")?(e={query:k,variables:{},context:D},c[0]=e):e=c[0];let[u]=(0,r.useQuery)(e),{data:d}=u;c[1]!==d?.recentCreatorSpotlights?(l=d?.recentCreatorSpotlights||[],c[1]=d?.recentCreatorSpotlights,c[2]=l):l=c[2];let m=l;if(0===m.length)return null;c[3]!==m?(s=m.map(F),c[3]=m,c[4]=s):s=c[4];let p=s;return c[5]===Symbol.for("react.memo_cache_sentinel")?(a={CarouselOptions:{breakpoints:{"2xl":{align:w}}}},c[5]=a):a=c[5],c[6]!==p?(o=(0,t.jsx)(y,{children:(0,t.jsx)(n.FeaturedCarousel,{itemClassName:"2xl:basis-[calc(50%-190px)] 2xl:aspect-[201/86]",overrides:a,slides:p})}),c[6]=p,c[7]=o):o=c[7],o},{fallback:function(){let e,l,r=(0,i.c)(2);r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,b.range)(3).map(N),r[0]=e):e=r[0];let s=e;return r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(y,{children:(0,t.jsx)(n.FeaturedCarousel,{slides:s})}),r[1]=l):l=r[1],l}});e.s(["DropsCreatorSpotlightsShelf",0,T],368951)},303695,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(885530),r=e.i(89337),s=e.i(471317);e.i(786174);var n=e.i(817562),a=e.i(204083),o=e.i(389852),c=e.i(771968);function u(e){let l,r=(0,i.c)(2),{children:s}=e;return r[0]!==s?(l=(0,t.jsx)(t.Fragment,{children:s}),r[0]=s,r[1]=l):l=r[1],l}var d=e.i(351144),m=e.i(477658),p=e.i(310578);let h=(0,l.graphql)(`
    query DropsFeaturedCarouselShelfQuery(
      $type: DropCalendarType!
      $cursor: String
      $limit: Int!
    ) {
      dropCalendar(type: $type, cursor: $cursor, limit: $limit) {
        items {
          __typename
          identifier {
            contractAddress
            chain {
              identifier
            }
          }
          collection {
            ...SpotlightCarousel
          }
        }
        nextPageCursor
      }
    }
  `,[a.SpotlightCarouselFragment]),f={ttl:s.TTL["5m"]};function x(e){return e?.collection?[e.collection]:[]}function g(e){return e?.dropCalendar}let S=(0,o.withSuspense)(function(){let e,l,s,a,o=(0,i.c)(7);o[0]===Symbol.for("react.memo_cache_sentinel")?(e={query:h,variables:{type:"FEATURED",limit:10},context:f},o[0]=e):e=o[0],o[1]===Symbol.for("react.memo_cache_sentinel")?(l={pageSize:10,autoScrollToTop:!0},o[1]=l):l=o[1];let{items:d,noResults:m,error:p}=(0,c.usePaginatedQuery)(e,g,l);if(p&&m){let e;return o[2]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(r.ErrorState,{}),o[2]=e):e=o[2],e}if(m||0===d.length)return null;o[3]!==d?(s=d.flatMap(x),o[3]=d,o[4]=s):s=o[4];let S=s;return o[5]!==S?(a=(0,t.jsx)(u,{children:(0,t.jsx)(n.SpotlightCarousel,{collections:S})}),o[5]=S,o[6]=a):a=o[6],a},{fallback:function(){let e,l,r=(0,i.c)(2);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)("div",{className:"relative overflow-hidden rounded-lg before:pointer-events-none before:absolute before:inset-0 before:inset-shadow-border before:z-10 before:rounded-inherit",children:(0,t.jsx)(d.CarouselContent,{children:(0,t.jsx)(d.CarouselItem,{className:"pl-0",children:(0,t.jsx)("div",{className:"relative aspect-16/9 xl:aspect-auto xl:h-[400px]",children:(0,t.jsx)(p.SkeletonBlock,{className:"size-full bg-bg-additional-1"})})})})}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(u,{children:(0,t.jsxs)(d.Carousel,{className:"pointer-events-none w-full rounded-lg",children:[e,(0,t.jsx)("div",{className:"mt-3 h-1.5",children:(0,t.jsx)(m.CarouselNavigationDots,{dotClassName:"h-1.5 w-full lg:w-10"})})]})}),r[1]=l):l=r[1],l}});e.s(["DropsFeaturedCarouselShelf",0,S],303695)},165481,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(885530),r=e.i(873588),s=e.i(471317),n=e.i(389852),a=e.i(771968),o=e.i(171368),c=e.i(14871),u=e.i(953756),d=e.i(522285),m=e.i(23736);function p(e){let l,r,s,n=(0,i.c)(7),{children:a}=e,o=(0,d.useTranslations)("DropsRecentMintsShelf");return n[0]!==a?(l=(0,t.jsx)(u.Container,{className:"lg:px-0",children:a}),n[0]=a,n[1]=l):l=n[1],n[2]!==o?(r=o("title"),n[2]=o,n[3]=r):r=n[3],n[4]!==l||n[5]!==r?(s=(0,t.jsx)(m.DropsPageShelf,{carousel:l,title:r}),n[4]=l,n[5]=r,n[6]=s):s=n[6],s}var h=e.i(254842),f=e.i(692632);e.i(538407);var x=e.i(637796);function g(e){return(0,t.jsx)(x.FeaturedDropSlideSkeleton,{},e)}let S=(0,l.graphql)(`
    query DropsRecentMintsShelfQuery(
      $type: DropCalendarType!
      $cursor: String
      $limit: Int!
    ) {
      dropCalendar(type: $type, cursor: $cursor, limit: $limit) {
        items {
          __typename
          identifier {
            contractAddress
            chain {
              identifier
            }
          }
          ...FeaturedDropSlide
        }
        nextPageCursor
      }
    }
  `,[c.FeaturedDropSlideFragment]),j={ttl:s.TTL["5m"]};function y(e){let{item:i}=e;return i?(0,t.jsx)(o.FeaturedDropSlide,{item:i}):null}function b(e){return e?.identifier?.contractAddress&&e?.identifier?.chain?.identifier?`${e.identifier.contractAddress}-${e.identifier.chain.identifier}`:e?.__typename||"unknown"}function v(e){return e?.dropCalendar}let C=(0,n.withSuspense)(function(){let e,l,s,n=(0,i.c)(5);n[0]===Symbol.for("react.memo_cache_sentinel")?(e={query:S,variables:{type:"RECENTLY_MINTED",limit:20},context:j},n[0]=e):e=n[0],n[1]===Symbol.for("react.memo_cache_sentinel")?(l={pageSize:20,autoScrollToTop:!0},n[1]=l):l=n[1];let{items:o,pagination:c,noResults:u}=(0,a.usePaginatedQuery)(e,v,l);return u?null:(n[2]!==o||n[3]!==c?(s=(0,t.jsx)(p,{children:(0,t.jsx)(r.Grid,{itemKey:b,items:o,renderItem:y,size:"md",...c})}),n[2]=o,n[3]=c,n[4]=s):s=n[4],s)},{fallback:function(){let e,l,r=(0,i.c)(2);r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,f.range)(10).map(g),r[0]=e):e=r[0];let s=e;return r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(p,{children:(0,t.jsx)(h.Flex,{className:"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",children:s})}),r[1]=l):l=r[1],l}});e.s(["DropsRecentMintsShelf",0,C],165481)},788159,e=>{"use strict";var t=e.i(7683),i=e.i(866313),l=e.i(885530),r=e.i(471317);e.i(145404);var s=e.i(231592),n=e.i(389852),a=e.i(771968),o=e.i(171368),c=e.i(14871),u=e.i(522285),d=e.i(23736);function m(e){let l,r,s,n=(0,i.c)(8),{children:a}=e,o=(0,u.useTranslations)("DropsUpcomingMintsShelf");return n[0]!==o?(l=o("description"),n[0]=o,n[1]=l):l=n[1],n[2]!==o?(r=o("title"),n[2]=o,n[3]=r):r=n[3],n[4]!==a||n[5]!==l||n[6]!==r?(s=(0,t.jsx)(d.DropsPageShelf,{carousel:a,description:l,title:r}),n[4]=a,n[5]=l,n[6]=r,n[7]=s):s=n[7],s}var p=e.i(692632);e.i(538407);var h=e.i(637796);function f(e){return{slide:(0,t.jsx)(h.FeaturedDropSlideSkeleton,{}),key:`skeleton-${e}`}}let x=(0,l.graphql)(`
    query DropsUpcomingMintsShelfQuery(
      $type: DropCalendarType!
      $cursor: String
      $limit: Int!
    ) {
      dropCalendar(type: $type, cursor: $cursor, limit: $limit) {
        items {
          __typename
          identifier {
            contractAddress
            chain {
              identifier
            }
          }
          ...FeaturedDropSlide
        }
        nextPageCursor
      }
    }
  `,[c.FeaturedDropSlideFragment]),g={ttl:r.TTL["5m"]};function S(e,i){let l=e.identifier?.contractAddress&&e.identifier?.chain?.identifier?`${e.identifier.contractAddress}-${e.identifier.chain.identifier}`:`fallback-${e.__typename}-${i}`;return{slide:(0,t.jsx)(o.FeaturedDropSlide,{item:e},l),key:l}}function j(e){return!!e}function y(e){return e?.dropCalendar}let b=(0,n.withSuspense)(function(){let e,l,r,n,o=(0,i.c)(6);o[0]===Symbol.for("react.memo_cache_sentinel")?(e={query:x,variables:{type:"UPCOMING",limit:20},context:g},o[0]=e):e=o[0],o[1]===Symbol.for("react.memo_cache_sentinel")?(l={pageSize:20,autoScrollToTop:!0},o[1]=l):l=o[1];let{items:c,noResults:u}=(0,a.usePaginatedQuery)(e,y,l);if(u)return null;o[2]!==c?(r=c.filter(j).map(S),o[2]=c,o[3]=r):r=o[3];let d=r;return o[4]!==d?(n=(0,t.jsx)(m,{children:(0,t.jsx)(s.FeaturedCarousel,{shouldGroup:!1,slides:d})}),o[4]=d,o[5]=n):n=o[5],n},{fallback:function(){let e,l,r=(0,i.c)(2);r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,p.range)(6).map(f),r[0]=e):e=r[0];let n=e;return r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(m,{children:(0,t.jsx)(s.FeaturedCarousel,{shouldGroup:!1,slides:n})}),r[1]=l):l=r[1],l}});e.s(["DropsUpcomingMintsShelf",0,b],788159)}]);

//# debugId=e6a1fb69-6c32-e82e-92f0-f52ee71c37dd
//# sourceMappingURL=165b2245b89bee1c.js.map