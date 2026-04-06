;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e4cc7afe-44a0-ec84-5f83-da9f110c8b08")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,127156,e=>{"use strict";function t(e,t,l){let i=l?`/${l}`:"";return t?`${i}/collection/${e}/${t}`:`${i}/collection/${e}`}e.s(["getCollectionUrlBySlug",()=>t])},641749,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment useCollectionOffers on CollectionResult {
    __typename
    ... on Collection {
      slug
      flags {
        isOffersEnabled
      }
      traitOffersEnabled
      chain {
        identifier
        arch
      }
    }
  }
`);e.s(["useCollectionOffersFragment",0,t])},700625,e=>{"use strict";var t=e.i(885530),l=e.i(641749);let i=(0,t.graphql)(`
    fragment CollectionItemsMakeOfferButton on Collection {
      traitOffersEnabled
      ...useCollectionOffers
    }
  `,[l.useCollectionOffersFragment]);e.s(["CollectionItemsMakeOfferButtonFragment",0,i])},419360,e=>{"use strict";var t=e.i(885530),l=e.i(459527),i=e.i(670383),o=e.i(199800);let n=(0,t.graphql)(`
  mutation StudioEditCollectionDetailsImagesMutation(
    $slug: String!
    $input: ModifyCollectionInput!
  ) {
    modifyCollection(slug: $slug, input: $input) {
      success
      error {
        ... on UnknownModifyCollectionError {
          message
        }
      }
    }
  }
`),a=(0,t.graphql)(`
  mutation UseCollectionImageUpload(
    $collectionSlug: String!
    $imageType: ImageType!
  ) {
    uploadCollectionImage(
      collectionSlug: $collectionSlug
      imageType: $imageType
    ) {
      url
      method
      fields
      token
    }
  }
`);function r(e,t){let[n,r]=(0,l.useMutation)(a),[s,c]=(0,i.useState)(!1);return{upload:async function(l){c(!0);try{let{data:i,error:n}=await r({collectionSlug:e,imageType:t});if(n)throw n;if(i?.uploadCollectionImage)return await (0,o.uploadFile)(i.uploadCollectionImage,l);throw Error("Failed to upload file")}finally{c(!1)}},isUploading:s}}e.s(["UPDATE_COLLECTION_MUTATION",0,n,"useCollectionImageUpload",()=>r])},123969,e=>{"use strict";var t=e.i(7683),l=e.i(310578);let i=(0,e.i(657113).default)(()=>e.A(851013),{loadableGenerated:{modules:[871235]},ssr:!1,loading:()=>(0,t.jsx)(l.SkeletonBlock,{className:"size-full"})});e.s(["LazyReactHlsPlayer",0,i])},273253,e=>{"use strict";var t=e.i(885530);e.i(242227);var l=e.i(251695);let i=(0,t.graphql)(`
    fragment PreviewImage on Media {
      ...MediaProps
    }
  `,[l.getMediaPropsFromMediaFragment]);e.s(["PreviewImageFragment",0,i])},910833,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(455480),o=e.i(100868),n=e.i(123969);e.i(242227);var a=e.i(251695),r=e.i(273253);function s(e){let s,c,d,u,m=(0,l.c)(9),{media:p,thumbnailOnly:g}=e,h=void 0!==g&&g;if(m[0]!==p){let e=(0,i.readFragment)(r.PreviewImageFragment,p);s=(0,a.getMediaPropsFromMedia)(e),m[0]=p,m[1]=s}else s=m[1];let C=s;m[2]!==C||m[3]!==h?(c=function(){if(!C)return null;if(h&&("VideoMedia"===C.mediaType||"MuxVideoMedia"===C.mediaType)&&C.thumbnailUrl)return(0,t.jsx)(o.Image,{alt:"",className:"object-cover object-center",fill:!0,src:C.thumbnailUrl});switch(C.mediaType){case"ImageMedia":return(0,t.jsx)(o.Image,{alt:"",className:"object-cover object-center",fill:!0,src:C.imageUrl});case"VideoMedia":return(0,t.jsx)("video",{autoPlay:!h,className:"size-full object-cover object-center",controls:!1,loop:!0,muted:!0,playsInline:!0,poster:C.thumbnailUrl??void 0,src:C.videoUrl});case"MuxVideoMedia":return(0,t.jsx)(n.LazyReactHlsPlayer,{autoPlay:!h,className:"size-full object-cover object-center",controls:!1,loop:!0,muted:!0,playsInline:!0,poster:C.thumbnailUrl??void 0,src:`https://stream.mux.com/${C.muxPlaybackId}.m3u8`},C.muxPlaybackId);default:return null}},m[2]=C,m[3]=h,m[4]=c):c=m[4];let f=c;return m[5]!==f?(d=f(),m[5]=f,m[6]=d):d=m[6],m[7]!==d?(u=(0,t.jsx)("div",{className:"relative aspect-square w-full overflow-hidden rounded-lg",children:d}),m[7]=d,m[8]=u):u=m[8],u}e.s(["PreviewImage",()=>s])},969140,e=>{"use strict";var t=e.i(885530),l=e.i(273253);let i=(0,t.graphql)(`
    fragment PreviewImages on Collection {
      about {
        previewMedia {
          ...PreviewImage
        }
      }
    }
  `,[l.PreviewImageFragment]);e.s(["PreviewImagesFragment",0,i])},296202,e=>{"use strict";var t=e.i(7683),l=e.i(455480),i=e.i(254842),o=e.i(457628),n=e.i(670383),a=e.i(910833),r=e.i(969140);function s(e){let{collection:s}=e,c=(0,l.readFragment)(r.PreviewImagesFragment,s),[d,u]=(0,n.useState)(0);if(!c?.about?.previewMedia)return null;let{previewMedia:m}=c.about;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.PreviewImage,{media:m[d]}),m.length>1?(0,t.jsx)(i.Flex,{className:"mt-4 gap-4",children:m.map((e,l)=>(0,t.jsx)(o.UnstyledButton,{className:`basis-1/4 cursor-pointer overflow-hidden rounded-lg ${d===l?"border border-border-2":""}`,onClick:()=>u(l),children:(0,t.jsx)(a.PreviewImage,{media:e,thumbnailOnly:!0})},l))}):null]})}e.s(["PreviewImages",()=>s])},89414,110030,54987,735854,725857,526036,e=>{"use strict";var t=e.i(455480),l=e.i(273253),i=e.i(969140),o=e.i(885530);e.i(296202),e.s([],110030);let n=(0,o.graphql)(`
    fragment MintModule on Collection {
      __typename
      ... on Collection {
        ...PreviewImages
        name
        slug
        about {
          previewMedia {
            __typename
          }
        }
      }
    }
  `,[i.PreviewImagesFragment]);e.s(["MintModuleFragment",0,n],54987);var a=e.i(85368),r=e.i(327426),s=e.i(367964),c=e.i(184506),d=e.i(762154),u=e.i(580430),m=e.i(345520);e.i(242227);var p=e.i(251695);let g=(0,o.graphql)(`
    fragment CollectionOverviewModules on Collection {
      ...MintModule
      slug
      overview {
        modules {
          __typename
          ... on CollectionNarrativeModule {
            ...NarrativeModule
            id
            title
            description
            variant
            horizontalTextPosition
            verticalTextPosition
            media {
              ...MediaProps
            }
          }
          ... on CollectionFAQModule {
            ...FaqModule
            title
            description
            questions: sections {
              question
              answer
            }
          }
          ... on CollectionTeamModule {
            ...TeamModule
            title
            description
            sections {
              id
              name
              title
              bio
              teamMedia: media {
                ...MediaProps
              }
            }
          }
          ... on CollectionContentBlockModule {
            ...ContentBlockModule
            id
            title
            description
            sections {
              __typename
              ... on DefaultContentBlock {
                ...FreeformContentBlockSlide
                title
                description
                contentMedia: media {
                  ...MediaProps
                }
              }
              ... on FeatureContentBlock {
                id
                itemId
                collectionSlug
              }
              ... on TimelineContentBlock {
                title
                description
                date
                timelineMedia: media {
                  ...MediaProps
                }
              }
            }
          }
        }
      }
    }
  `,[a.ContentBlockModuleFragment,d.FaqModuleFragment,u.NarrativeModuleFragment,n,m.TeamModuleFragment,p.getMediaPropsFromMediaFragment,s.FreeformContentBlockSlideFragment,c.TimelineContentBlockCarouselFragment,r.FeaturedCollectionsCarouselFragment]);e.s(["CollectionOverviewModulesFragment",0,g],735854),e.s([],725857);let h=(0,o.graphql)(`
    fragment CollectionOverviewHeroMedia on Collection {
      hero {
        desktopHeroMedia {
          ...MediaProps
        }
        mobileHeroMedia {
          ...MediaProps
        }
      }
    }
  `,[p.getMediaPropsFromMediaFragment]);function C(e){let l=(0,t.readFragment)(g,e),i=l.overview?.modules??null;return i?i.map(e=>{if(!e)return null;switch(e.__typename){case"CollectionContentBlockModule":case"CollectionTeamModule":case"CollectionNarrativeModule":case"CollectionFAQModule":return e;default:return null}}).filter(e=>null!==e):null}function f(e){let l=(0,t.readFragment)(g,e);return l.overview?.modules??null}function x(e){return e?e.map(e=>{if(!e)return null;switch(e.__typename){case"CollectionContentBlockModule":case"CollectionTeamModule":case"CollectionNarrativeModule":case"CollectionFAQModule":return e;default:return null}}).filter(e=>null!==e):null}function v(e){let o=(0,t.readFragment)(i.PreviewImagesFragment,e);return(o.about?.previewMedia??[]).map(e=>{let i=(0,t.readFragment)(l.PreviewImageFragment,e),o=(0,p.getMediaPropsFromMedia)(i);return o?{__typename:o.mediaType,imageUrl:o.imageUrl||void 0,videoUrl:o.videoUrl||void 0,muxPlaybackId:o.muxPlaybackId||void 0,aspectRatio:o.aspectRatio||void 0,thumbnailUrl:o.thumbnailUrl||void 0}:null}).filter(e=>!!e)}function y(e){let l=(0,t.readFragment)(h,e),i=null,o=null;if(l.hero?.desktopHeroMedia){let e=(0,p.getMediaPropsFromMedia)(l.hero.desktopHeroMedia);e&&(i=e)}if(l.hero?.mobileHeroMedia){let e=(0,p.getMediaPropsFromMedia)(l.hero.mobileHeroMedia);e&&(o=e)}return{desktopHeroMedia:i,mobileHeroMedia:o}}e.s(["HeroMediaFragment",0,h],526036),e.s(["getRawCollectionModules",()=>f,"parseCollectionHeroMedia",()=>y,"parseCollectionModules",()=>C,"parseCollectionPreviewImages",()=>v,"parseRawModules",()=>x],89414)},314391,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(790621),o=e.i(437153);e.s(["Share",0,e=>{let n,a,r,s,c,d,u,m,p=(0,l.c)(15);p[0]!==e?({size:r,fill:s,fillAttribute:c,className:n,...a}=e,p[0]=e,p[1]=n,p[2]=a,p[3]=r,p[4]=s,p[5]=c):(n=p[1],a=p[2],r=p[3],s=p[4],c=p[5]);let g=void 0===r?24:r,h=void 0===s?"current":s,C=void 0===c?"currentColor":c;return p[6]!==n||p[7]!==h?(d=(0,o.classNames)((0,i.fillVariants)({fill:h}),n),p[6]=n,p[7]=h,p[8]=d):d=p[8],p[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("path",{d:"M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"}),p[9]=u):u=p[9],p[10]!==C||p[11]!==a||p[12]!==g||p[13]!==d?(m=(0,t.jsx)("svg",{"aria-label":"Share",className:d,fill:C,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...a,children:u}),p[10]=C,p[11]=a,p[12]=g,p[13]=d,p[14]=m):m=p[14],m}])},276015,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(790621),o=e.i(437153);e.s(["ArrowDownward",0,e=>{let n,a,r,s,c,d,u,m,p=(0,l.c)(15);p[0]!==e?({size:r,fill:s,fillAttribute:c,className:n,...a}=e,p[0]=e,p[1]=n,p[2]=a,p[3]=r,p[4]=s,p[5]=c):(n=p[1],a=p[2],r=p[3],s=p[4],c=p[5]);let g=void 0===r?24:r,h=void 0===s?"current":s,C=void 0===c?"currentColor":c;return p[6]!==n||p[7]!==h?(d=(0,o.classNames)((0,i.fillVariants)({fill:h}),n),p[6]=n,p[7]=h,p[8]=d):d=p[8],p[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("path",{d:"M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"}),p[9]=u):u=p[9],p[10]!==C||p[11]!==a||p[12]!==g||p[13]!==d?(m=(0,t.jsx)("svg",{"aria-label":"Arrow Downward",className:d,fill:C,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...a,children:u}),p[10]=C,p[11]=a,p[12]=g,p[13]=d,p[14]=m):m=p[14],m}])},895032,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(670383),o=e.i(230834),n=e.i(437153),a=e.i(967593),r=e.i(457628);function s(e){let s,c,d,u,m,p,g,h,C,f,x,v,y,w=(0,l.c)(28);w[0]!==e?({children:s,onClick:d,className:c,text:p,tooltipText:h,tooltipOnCopiedText:g,fullWidth:m,...u}=e,w[0]=e,w[1]=s,w[2]=c,w[3]=d,w[4]=u,w[5]=m,w[6]=p,w[7]=g,w[8]=h):(s=w[1],c=w[2],d=w[3],u=w[4],m=w[5],p=w[6],g=w[7],h=w[8]);let j=void 0!==m&&m,[b,T]=(0,i.useState)(!1),[I,N]=(0,i.useState)(!1),M=(0,o.useDebounceCallback)(N,3e3),S=h??"Copy",F=g??"Copied!",P=I?F:S;w[9]!==I?(C=e=>{I&&!e&&N(!1),T(e)},w[9]=I,w[10]=C):C=w[10];let _=!!I||b,k=j&&"w-full";return w[11]!==c||w[12]!==k?(f=(0,n.classNames)(k,c),w[11]=c,w[12]=k,w[13]=f):f=w[13],w[14]!==M||w[15]!==d||w[16]!==p?(x=e=>{navigator.clipboard.writeText(p),M.cancel(),N(!0),M(!1),d?.(e)},w[14]=M,w[15]=d,w[16]=p,w[17]=x):x=w[17],w[18]!==s||w[19]!==u||w[20]!==f||w[21]!==x?(v=(0,t.jsx)(r.UnstyledButton,{className:f,onClick:x,...u,children:s}),w[18]=s,w[19]=u,w[20]=f,w[21]=x,w[22]=v):v=w[22],w[23]!==P||w[24]!==C||w[25]!==_||w[26]!==v?(y=(0,t.jsx)(a.Tooltip,{content:P,hoverable:!1,onOpenChange:C,open:_,children:v}),w[23]=P,w[24]=C,w[25]=_,w[26]=v,w[27]=y):y=w[27],y}e.s(["CopyToClipboard",()=>s])},701211,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(790621),o=e.i(437153);e.s(["ContentCopy",0,e=>{let n,a,r,s,c,d,u,m,p=(0,l.c)(15);p[0]!==e?({size:r,fill:s,fillAttribute:c,className:n,...a}=e,p[0]=e,p[1]=n,p[2]=a,p[3]=r,p[4]=s,p[5]=c):(n=p[1],a=p[2],r=p[3],s=p[4],c=p[5]);let g=void 0===r?24:r,h=void 0===s?"current":s,C=void 0===c?"currentColor":c;return p[6]!==n||p[7]!==h?(d=(0,o.classNames)((0,i.fillVariants)({fill:h}),n),p[6]=n,p[7]=h,p[8]=d):d=p[8],p[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("path",{d:"M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"}),p[9]=u):u=p[9],p[10]!==C||p[11]!==a||p[12]!==g||p[13]!==d?(m=(0,t.jsx)("svg",{"aria-label":"Content Copy",className:d,fill:C,height:g,role:"img",viewBox:"0 -960 960 960",width:g,xmlns:"http://www.w3.org/2000/svg",...a,children:u}),p[10]=C,p[11]=a,p[12]=g,p[13]=d,p[14]=m):m=p[14],m}])},79097,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(790621),o=e.i(437153);function n(e){let n,a,r,s,c,d,u,m,p=(0,l.c)(15);p[0]!==e?({size:r,fill:s,fillAttribute:c,className:n,...a}=e,p[0]=e,p[1]=n,p[2]=a,p[3]=r,p[4]=s,p[5]=c):(n=p[1],a=p[2],r=p[3],s=p[4],c=p[5]);let g=void 0===r?24:r,h=void 0===s?"current":s,C=void 0===c?"currentColor":c;return p[6]!==n||p[7]!==h?(d=(0,o.classNames)((0,i.fillVariants)({fill:h}),n),p[6]=n,p[7]=h,p[8]=d):d=p[8],p[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("g",{id:"Twitter",children:(0,t.jsx)("path",{d:"M9.14163 7.19284L13.6089 2H12.5503L8.67137 6.50887L5.57328 2H2L6.68492 8.81821L2 14.2637H3.05866L7.15491 9.50218L10.4267 14.2637H14L9.14163 7.19284ZM7.69165 8.87828L7.21697 8.19934L3.44011 2.79694H5.06615L8.11412 7.15685L8.5888 7.83579L12.5508 13.503H10.9248L7.69165 8.87828Z"})}),p[9]=u):u=p[9],p[10]!==C||p[11]!==a||p[12]!==g||p[13]!==d?(m=(0,t.jsx)("svg",{"aria-label":"X",className:d,fill:C,height:g,viewBox:"0 0 16 16",width:g,xmlns:"http://www.w3.org/2000/svg",...a,children:u}),p[10]=C,p[11]=a,p[12]=g,p[13]=d,p[14]=m):m=p[14],m}e.s(["Twitter",()=>n])},392984,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(790621),o=e.i(437153);function n(e){let n,a,r,s,c,d,u,m,p=(0,l.c)(15);p[0]!==e?({size:r,fill:s,fillAttribute:c,className:n,...a}=e,p[0]=e,p[1]=n,p[2]=a,p[3]=r,p[4]=s,p[5]=c):(n=p[1],a=p[2],r=p[3],s=p[4],c=p[5]);let g=void 0===r?24:r,h=void 0===s?"current":s,C=void 0===c?"currentColor":c;return p[6]!==n||p[7]!==h?(d=(0,o.classNames)((0,i.fillVariants)({fill:h}),n),p[6]=n,p[7]=h,p[8]=d):d=p[8],p[9]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("path",{d:"M1.65 10.617C8.092 7.81 12.388 5.96 14.538 5.066c6.137-2.553 7.412-2.996 8.243-3.011.183-.003.592.042.857.257.223.182.285.427.314.599.03.172.066.563.037.87-.332 3.494-1.771 11.974-2.503 15.888-.31 1.656-.92 2.211-1.51 2.266-1.284.118-2.259-.848-3.502-1.663-1.945-1.275-3.043-2.069-4.931-3.313-2.182-1.438-.768-2.228.476-3.52.325-.338 5.98-5.481 6.089-5.948.014-.058.026-.275-.103-.39-.13-.115-.32-.076-.457-.045-.196.045-3.303 2.098-9.322 6.162-.882.605-1.681.9-2.397.885-.789-.017-2.307-.446-3.435-.813-1.384-.45-2.484-.688-2.388-1.452.05-.398.598-.805 1.644-1.22Z"}),p[9]=u):u=p[9],p[10]!==C||p[11]!==a||p[12]!==g||p[13]!==d?(m=(0,t.jsx)("svg",{"aria-label":"Telegram",className:d,fill:C,height:g,viewBox:"0 0 24 24",width:g,xmlns:"http://www.w3.org/2000/svg",...a,children:u}),p[10]=C,p[11]=a,p[12]=g,p[13]=d,p[14]=m):m=p[14],m}e.s(["Telegram",()=>n])},232105,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(790621),o=e.i(437153);function n(e){let n,a,r,s,c,d,u,m,p,g,h=(0,l.c)(21);h[0]!==e?({size:r,fill:s,fillAttribute:c,className:n,...a}=e,h[0]=e,h[1]=n,h[2]=a,h[3]=r,h[4]=s,h[5]=c):(n=h[1],a=h[2],r=h[3],s=h[4],c=h[5]);let C=void 0===r?24:r,f=void 0===s?"current":s,x=void 0===c?"currentColor":c;return h[6]!==n||h[7]!==f?(d=(0,o.classNames)((0,i.fillVariants)({fill:f}),n),h[6]=n,h[7]=f,h[8]=d):d=h[8],h[9]!==x?(u=(0,t.jsx)("path",{d:"M257.778 155.556H742.222V844.445H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.445H257.778V155.556Z",fill:x}),m=(0,t.jsx)("path",{d:"M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.445H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z",fill:x}),p=(0,t.jsx)("path",{d:"M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.445H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.94 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z",fill:x}),h[9]=x,h[10]=u,h[11]=m,h[12]=p):(u=h[10],m=h[11],p=h[12]),h[13]!==x||h[14]!==a||h[15]!==C||h[16]!==d||h[17]!==u||h[18]!==m||h[19]!==p?(g=(0,t.jsxs)("svg",{"aria-label":"Farcaster",className:d,fill:x,height:C,viewBox:"0 0 1000 1000",width:C,xmlns:"http://www.w3.org/2000/svg",...a,children:[u,m,p]}),h[13]=x,h[14]=a,h[15]=C,h[16]=d,h[17]=u,h[18]=m,h[19]=p,h[20]=g):g=h[20],g}e.s(["Farcaster",()=>n])},940669,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(100868),o=e.i(531491),n=e.i(437153),a=e.i(323917),r=e.i(670383),s=e.i(832894),c=e.i(199800);function d(e){let o,r,s,d,m=(0,l.c)(23),{overlay:p,blur:g,url:h,fallback:C,className:f,mediaClassName:x,priority:v,frameTime:y,height:w,width:j,onLoad:b,fill:T,sizes:I,boost:N,format:M,disableVideo:S}=e;m[0]!==N||m[1]!==S||m[2]!==C||m[3]!==T||m[4]!==M||m[5]!==y||m[6]!==w||m[7]!==x||m[8]!==b||m[9]!==v||m[10]!==I||m[11]!==h||m[12]!==j?(o=()=>{let e=h||C;if(e){let l=(0,a.extractMediaVariant)(e),o=(0,c.extractMediaVariantFromDataUri)(e),r=l||o;return r?.type==="video"?(0,t.jsx)(u,{className:(0,n.classNames)("size-full object-cover object-center",x),format:r.format,poster:C||void 0,priority:v,shouldPlay:!S,src:e}):(0,t.jsxs)(t.Fragment,{children:[h?(0,t.jsx)(i.Image,{boost:N,className:(0,n.classNames)("size-full object-cover object-center",x),fetchPriority:v?"high":void 0,fill:T,format:M,frameTime:y,height:w,onLoad:b,priority:v,sizes:I,src:e,width:j}):null,C&&!h?(0,t.jsx)(i.Image,{boost:N,className:(0,n.classNames)("size-full object-cover object-center blur-3xl","*:!pointer-events-none *:*:*:pointer-events-none *:*:pointer-events-none",x),fill:T,format:M,frameTime:1,height:w,sizes:I,src:e,width:j}):null]})}},m[0]=N,m[1]=S,m[2]=C,m[3]=T,m[4]=M,m[5]=y,m[6]=w,m[7]=x,m[8]=b,m[9]=v,m[10]=I,m[11]=h,m[12]=j,m[13]=o):o=m[13];let F=o,P=g&&"blur-xl";return m[14]!==f||m[15]!==P?(r=(0,n.classNames)("relative size-full",P,f),m[14]=f,m[15]=P,m[16]=r):r=m[16],m[17]!==F?(s=F(),m[17]=F,m[18]=s):s=m[18],m[19]!==p||m[20]!==r||m[21]!==s?(d=(0,t.jsxs)("div",{className:r,children:[s,p]}),m[19]=p,m[20]=r,m[21]=s,m[22]=d):d=m[22],d}function u(e){let i,n,a,c=(0,l.c)(9),{src:d,format:u,poster:p,className:g,shouldPlay:h,priority:C}=e,f=void 0===h||h,x=(0,r.useRef)(null);return void 0!==C&&C&&p&&(0,s.preload)(p,{as:"image",fetchPriority:"high"}),c[0]!==f?(i=()=>{x.current&&(f?x.current.play().catch(m):x.current.pause())},n=[f],c[0]=f,c[1]=i,c[2]=n):(i=c[1],n=c[2]),(0,r.useEffect)(i,n),c[3]!==g||c[4]!==p||c[5]!==f||c[6]!==d||c[7]!==u?(a=(0,t.jsx)(o.Video,{autoPlay:f,className:g,format:u,loop:!0,muted:!0,playsInline:!0,poster:p,ref:x,src:d}),c[3]=g,c[4]=p,c[5]=f,c[6]=d,c[7]=u,c[8]=a):a=c[8],a}function m(){}e.s(["BannerMedia",()=>d])},989949,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(437153);function o(e){let o,n,a=(0,l.c)(5),{className:r,headerView:s}=e,c="compact"===s?"opacity-0":"opacity-100";return a[0]!==r||a[1]!==c?(o=(0,i.classNames)("absolute inset-0 z-20","dark bg-[linear-gradient(180deg,rgb(var(--color-bg-app)/65%)_0%,rgb(var(--color-bg-app)/40%)_25%,rgb(var(--color-bg-app)/35%)_50%,rgb(var(--color-bg-app)/75%)_75%,rgb(var(--color-bg-app))_100%)]","transition-opacity duration-500 ease-out-quint",c,r),a[0]=r,a[1]=c,a[2]=o):o=a[2],a[3]!==o?(n=(0,t.jsx)("div",{className:o}),a[3]=o,a[4]=n):n=a[4],n}e.s(["HeroBannerMediaGradientOverlay",()=>o])},10361,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(905664),o=e.i(914480),n=e.i(437153),a=e.i(149431),r=e.i(194153),s=e.i(254842),c=e.i(950293);function d(e){let i,o,s,d,u=(0,l.c)(13),{value:m,unit:p,size:g,cellClassName:h}=e,C="sm"===g,f="lg"===g;u[0]!==h||u[1]!==C||u[2]!==f?(i=(0,n.classNames)("rounded-lg bg-bg-primary",h,{"size-[50px]":C,"size-[60px]":f}),u[0]=h,u[1]=C,u[2]=f,u[3]=i):i=u[3],u[4]!==m?(o=(0,t.jsx)(c.TextBody,{className:"font-mono",size:"sm",weight:"semibold",children:(0,t.jsx)(a.AnimatedNumber,{value:m})}),u[4]=m,u[5]=o):o=u[5];let x="sm"===g?"xs":"sm";return u[6]!==x||u[7]!==p?(s=(0,t.jsx)(c.TextBody,{className:"font-mono text-text-secondary uppercase",size:x,weight:"semibold",children:p}),u[6]=x,u[7]=p,u[8]=s):s=u[8],u[9]!==i||u[10]!==o||u[11]!==s?(d=(0,t.jsxs)(r.CenterAligned,{className:i,children:[o,s]}),u[9]=i,u[10]=o,u[11]=s,u[12]=d):d=u[12],d}function u(e){let a,r,c,u,m,p,g,h,C=(0,l.c)(36),{className:f,cellClassName:x,end:v,showDaysOnly:y,size:w}=e,j=void 0===w?"lg":w,b=Date.now(),{years:T,months:I,days:N,hours:M,minutes:S,seconds:F}=(0,o.useDuration)(v),P=void 0===T?0:T,_=void 0===I?0:I,k=void 0===M?0:M,L=void 0===S?0:S,B=void 0===F?0:F,U=y&&(P>0||_>0)?(0,i.differenceInDays)(v,b):void 0===N?0:N;return C[0]!==f?(a=(0,n.classNames)("flex gap-4",f),C[0]=f,C[1]=a):a=C[1],C[2]!==x||C[3]!==y||C[4]!==j||C[5]!==P?(r=!y&&P>0&&(0,t.jsx)(d,{cellClassName:x,size:j,unit:"years",value:P}),C[2]=x,C[3]=y,C[4]=j,C[5]=P,C[6]=r):r=C[6],C[7]!==x||C[8]!==_||C[9]!==y||C[10]!==j?(c=!y&&_>0&&(0,t.jsx)(d,{cellClassName:x,size:j,unit:"months",value:_}),C[7]=x,C[8]=_,C[9]=y,C[10]=j,C[11]=c):c=C[11],C[12]!==U||C[13]!==x||C[14]!==j?(u=(0,t.jsx)(d,{cellClassName:x,size:j,unit:"days",value:U}),C[12]=U,C[13]=x,C[14]=j,C[15]=u):u=C[15],C[16]!==x||C[17]!==k||C[18]!==j?(m=(0,t.jsx)(d,{cellClassName:x,size:j,unit:"hours",value:k}),C[16]=x,C[17]=k,C[18]=j,C[19]=m):m=C[19],C[20]!==x||C[21]!==L||C[22]!==j?(p=(0,t.jsx)(d,{cellClassName:x,size:j,unit:"mins",value:L}),C[20]=x,C[21]=L,C[22]=j,C[23]=p):p=C[23],C[24]!==x||C[25]!==B||C[26]!==j?(g=(0,t.jsx)(d,{cellClassName:x,size:j,unit:"secs",value:B}),C[24]=x,C[25]=B,C[26]=j,C[27]=g):g=C[27],C[28]!==c||C[29]!==u||C[30]!==m||C[31]!==p||C[32]!==g||C[33]!==a||C[34]!==r?(h=(0,t.jsxs)(s.Flex,{className:a,children:[r,c,u,m,p,g]}),C[28]=c,C[29]=u,C[30]=m,C[31]=p,C[32]=g,C[33]=a,C[34]=r,C[35]=h):h=C[35],h}e.s(["Countdown",()=>u])},365922,(e,t,l)=>{"use strict";Object.defineProperty(l,"__esModule",{value:!0}),Object.defineProperty(l,"BailoutToCSR",{enumerable:!0,get:function(){return o}});let i=e.r(697240);function o({reason:e,children:t}){if("u"<typeof window)throw Object.defineProperty(new i.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},36569,(e,t,l)=>{"use strict";Object.defineProperty(l,"__esModule",{value:!0}),Object.defineProperty(l,"PreloadChunks",{enumerable:!0,get:function(){return s}});let i=e.r(7683),o=e.r(832894),n=e.r(33523),a=e.r(631285),r=e.r(372948);function s({moduleIds:e}){if("u">typeof window)return null;let t=n.workAsyncStorage.getStore();if(void 0===t)return null;let l=[];if(t.reactLoadableManifest&&e){let i=t.reactLoadableManifest;for(let t of e){if(!i[t])continue;let e=i[t].files;l.push(...e)}}if(0===l.length)return null;let s=(0,r.getDeploymentIdQueryOrEmptyString)();return(0,i.jsx)(i.Fragment,{children:l.map(e=>{let l=`${t.assetPrefix}/_next/${(0,a.encodeURIPath)(e)}${s}`;return e.endsWith(".css")?(0,i.jsx)("link",{precedence:"dynamic",href:l,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,o.preload)(l,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},122333,(e,t,l)=>{"use strict";Object.defineProperty(l,"__esModule",{value:!0}),Object.defineProperty(l,"default",{enumerable:!0,get:function(){return c}});let i=e.r(7683),o=e.r(670383),n=e.r(365922),a=e.r(36569);function r(e){return{default:e&&"default"in e?e.default:e}}let s={loader:()=>Promise.resolve(r(()=>null)),loading:null,ssr:!0},c=function(e){let t={...s,...e},l=(0,o.lazy)(()=>t.loader().then(r)),c=t.loading;function d(e){let r=c?(0,i.jsx)(c,{isLoading:!0,pastDelay:!0,error:null}):null,s=!t.ssr||!!t.loading,d=s?o.Suspense:o.Fragment,u=t.ssr?(0,i.jsxs)(i.Fragment,{children:["u"<typeof window?(0,i.jsx)(a.PreloadChunks,{moduleIds:t.modules}):null,(0,i.jsx)(l,{...e})]}):(0,i.jsx)(n.BailoutToCSR,{reason:"next/dynamic",children:(0,i.jsx)(l,{...e})});return(0,i.jsx)(d,{...s?{fallback:r}:{},children:u})}return d.displayName="LoadableComponent",d}},657113,(e,t,l)=>{"use strict";Object.defineProperty(l,"__esModule",{value:!0}),Object.defineProperty(l,"default",{enumerable:!0,get:function(){return o}});let i=e.r(481258)._(e.r(122333));function o(e,t){let l={};"function"==typeof e&&(l.loader=e);let o={...l,...t};return(0,i.default)({...o,modules:o.loadableGenerated?.modules})}("function"==typeof l.default||"object"==typeof l.default&&null!==l.default)&&void 0===l.default.__esModule&&(Object.defineProperty(l.default,"__esModule",{value:!0}),Object.assign(l.default,l),t.exports=l.default)},930190,e=>{"use strict";var t=e.i(7683),l=e.i(866313),i=e.i(885530),o=e.i(455480),n=e.i(922364),a=e.i(567089),r=e.i(967593),s=e.i(522285);let c=(0,i.graphql)(`
  fragment ProfileJoinedAtChip on Profile {
    dateJoined
  }
`);function d(e){let i,d=(0,l.c)(5),{profile:u,variant:m,chipVariant:p}=e,g=(0,o.readFragment)(c,u),h=(0,s.useTranslations)("ProfileJoinedAtChip"),C=(0,n.useDateTimeFormatter)();if(!g.dateJoined)return;let f=C(new Date(g.dateJoined),{display:"date",day:void 0});return d[0]!==p||d[1]!==f||d[2]!==h||d[3]!==m?(i="compact"===m?(0,t.jsx)(r.Tooltip,{content:(0,t.jsxs)(t.Fragment,{children:[h("joined")," ",f]}),children:(0,t.jsx)(a.Chip,{variant:p,children:f})}):(0,t.jsxs)(a.Chip,{variant:p,children:[h("joined")," ",f]}),d[0]=p,d[1]=f,d[2]=h,d[3]=m,d[4]=i):i=d[4],i}e.s(["ProfileJoinedAtChip",()=>d,"ProfileJoinedAtChipFragment",0,c])},825822,e=>{"use strict";var t=e.i(511518),l=e.i(487122),i=e.i(516467);function o(e,o){let h,C,f=()=>(0,l.constructFrom)(o?.in,NaN),x=o?.additionalDigits??2,v=function(e){let t,l={},i=e.split(n);if(i.length>2)return l;if(/:/.test(i[0])?t=i[0]:(l.date=i[0],t=i[1],a.test(l.date)&&(l.date=e.split(a)[0],t=e.substr(l.date.length,e.length))),t){let e=r.exec(t);e?(l.time=t.replace(e[1],""),l.timezone=e[1]):l.time=t}return l}(e);if(v.date){let e=function(e,t){let l=RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),i=e.match(l);if(!i)return{year:NaN,restDateString:""};let o=i[1]?parseInt(i[1]):null,n=i[2]?parseInt(i[2]):null;return{year:null===n?o:100*n,restDateString:e.slice((i[1]||i[2]).length)}}(v.date,x);h=function(e,t){var l,i,o,n,a,r,c,d,m,h;if(null===t)return new Date(NaN);let C=e.match(s);if(!C)return new Date(NaN);let f=!!C[4],x=u(C[1]),v=u(C[2])-1,y=u(C[3]),w=u(C[4]),j=u(C[5])-1;if(f){let e,r;return(l=w,i=j,l>=1&&l<=53&&i>=0&&i<=6)?(o=t,n=w,a=j,(e=new Date(0)).setUTCFullYear(o,0,4),r=e.getUTCDay()||7,e.setUTCDate(e.getUTCDate()+((n-1)*7+a+1-r)),e):new Date(NaN)}{let e=new Date(0);return(r=t,c=v,d=y,c>=0&&c<=11&&d>=1&&d<=(p[c]||(g(r)?29:28))&&(m=t,(h=x)>=1&&h<=(g(m)?366:365)))?(e.setUTCFullYear(t,v,Math.max(x,y)),e):new Date(NaN)}}(e.restDateString,e.year)}if(!h||isNaN(+h))return f();let y=+h,w=0;if(v.time&&isNaN(w=function(e){var l,i,o;let n=e.match(c);if(!n)return NaN;let a=m(n[1]),r=m(n[2]),s=m(n[3]);return(l=a,i=r,o=s,24===l?0===i&&0===o:o>=0&&o<60&&i>=0&&i<60&&l>=0&&l<25)?a*t.millisecondsInHour+r*t.millisecondsInMinute+1e3*s:NaN}(v.time)))return f();if(v.timezone){if(isNaN(C=function(e){var l;if("Z"===e)return 0;let i=e.match(d);if(!i)return 0;let o="+"===i[1]?-1:1,n=parseInt(i[2]),a=i[3]&&parseInt(i[3])||0;return(l=a)>=0&&l<=59?o*(n*t.millisecondsInHour+a*t.millisecondsInMinute):NaN}(v.timezone)))return f()}else{let e=new Date(y+w),t=(0,i.toDate)(0,o?.in);return t.setFullYear(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()),t.setHours(e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds()),t}return(0,i.toDate)(y+w+C,o?.in)}let n=/[T ]/,a=/[Z ]/i,r=/([Z+-].*)$/,s=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,c=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,d=/^([+-])(\d{2})(?::?(\d{2}))?$/;function u(e){return e?parseInt(e):1}function m(e){return e&&parseFloat(e.replace(",","."))||0}let p=[31,null,31,30,31,30,31,31,30,31,30,31];function g(e){return e%400==0||e%4==0&&e%100!=0}e.s(["parseISO",()=>o])},804199,402745,854665,292986,136746,702361,e=>{"use strict";var t=e.i(866313),l=e.i(333799),i=e.i(885530),o=e.i(471317),n=e.i(806056),a=e.i(916511),r=e.i(543013);let s=(0,i.graphql)(`
    fragment SocialProofBadgeAccount on Profile {
      address
      displayName
      imageUrl
      isVerified
      ...profileUrl
      ...ProfilePreviewTooltip
    }
  `,[a.profileUrlFragment,r.ProfilePreviewTooltipFragment]);e.s(["SocialProofBadgeAccountFragment",0,s],402745);let c={suspense:!1,ttl:o.TTL["5m"]},d=(0,i.graphql)(`
    query CollectionSocialProofQuery($slug: String!) {
      collectionBySlug(slug: $slug) {
        ... on Collection {
          socialProof {
            socialCount
            notableCollectors {
              ...SocialProofBadgeAccount
            }
          }
        }
      }
    }
  `,[s]);function u(e){let i,o,a,r=(0,t.c)(9),s=(0,n.useIsCollectionSocialProofEnabled)();r[0]!==e?(i={slug:e},r[0]=e,r[1]=i):i=r[1];let u=!s;r[2]!==i||r[3]!==u?(o={query:d,variables:i,pause:u,context:c},r[2]=i,r[3]=u,r[4]=o):o=r[4];let[m]=(0,l.useQuery)(o),{data:p,fetching:g}=m,h=p?.collectionBySlug?.__typename==="Collection"?p.collectionBySlug.socialProof:void 0;return r[5]!==g||r[6]!==s||r[7]!==h?(a={isSocialProofEnabled:s,socialProof:h,isFetching:g},r[5]=g,r[6]=s,r[7]=h,r[8]=a):a=r[8],a}e.s(["useCollectionSocialProof",()=>u],854665);var m=e.i(7683),p=e.i(455480),g=e.i(155757),h=e.i(437153),C=e.i(254842),f=e.i(39771),x=e.i(950293),v=e.i(522285),y=e.i(794835),w=e.i(682576),j=e.i(508833),b=e.i(81810),T=e.i(965523),I=e.i(838820),N=e.i(310578),M=e.i(438249),S=e.i(81303),F=e.i(378536),P=e.i(653848),_=e.i(28067),k=e.i(967593),L=e.i(703379),B=e.i(648091),U=e.i(570293),A=e.i(825504),O=e.i(222287),E=e.i(865893),H=e.i(389852),q=e.i(740743),D=e.i(845250),V=e.i(760616),$=e.i(930190);let z=(0,i.graphql)(`
    fragment SocialProofTooltipMetadataChips on Profile {
      ...ProfileJoinedAtChip
      ...ProfileBetaTesterChip
    }
  `,[$.ProfileJoinedAtChipFragment,V.ProfileBetaTesterChipFragment]);function R(e){let l,i,o,n,a,r=(0,t.c)(11),{className:s,profile:c}=e;r[0]!==c?(l=(0,p.readFragment)(z,c),r[0]=c,r[1]=l):l=r[1];let d=l;return r[2]!==s?(i=(0,h.classNames)("w-full gap-2",s),r[2]=s,r[3]=i):i=r[3],r[4]!==d?(o=(0,m.jsx)($.ProfileJoinedAtChip,{profile:d,variant:"compact"}),n=(0,m.jsx)(V.ProfileBetaTesterChip,{profile:d,variant:"compact"}),r[4]=d,r[5]=o,r[6]=n):(o=r[5],n=r[6]),r[7]!==i||r[8]!==o||r[9]!==n?(a=(0,m.jsxs)(f.FlexCenter,{className:i,children:[o,n]}),r[7]=i,r[8]=o,r[9]=n,r[10]=a):a=r[10],a}function Q(e){let l,i,o,n,a,r,s,c=(0,t.c)(14);c[0]!==e?({address:l,variant:a,currencyContext:o,container:i,...n}=e,c[0]=e,c[1]=l,c[2]=i,c[3]=o,c[4]=n,c[5]=a):(l=c[1],i=c[2],o=c[3],n=c[4],a=c[5]);let d=i??void 0;return c[6]!==l||c[7]!==o||c[8]!==a?(r="tokens"===a&&o?(0,m.jsx)(Y,{address:l,currencyContext:o}):(0,m.jsx)(J,{address:l}),c[6]=l,c[7]=o,c[8]=a,c[9]=r):r=c[9],c[10]!==n||c[11]!==d||c[12]!==r?(s=(0,m.jsx)(q.PreviewTooltip,{align:"center",className:"min-w-[340px] py-2.5",container:d,content:r,...n}),c[10]=n,c[11]=d,c[12]=r,c[13]=s):s=c[13],s}let W=(0,h.classNames)((0,D.marginVariants)({variant:"negative"}),"bg-transparent"),G=(0,L.tv)({slots:{name:"",held:"w-[80px] justify-end whitespace-nowrap",value:"w-[80px] justify-end whitespace-nowrap"}})(),Z=(0,i.graphql)(`
    query SocialProofCollectionTooltipQuery($address: Address!) {
      profileByAddress(address: $address) {
        __typename
        ... on Profile {
          address
          displayName
          imageUrl
          isVerified
          ...SocialProofTooltipMetadataChips
        }
      }
      userCollections(addresses: [$address], limit: 3) {
        items {
          __typename
          id
          ownership {
            id
            totalQuantity
            value {
              ...Volume
            }
          }
          collection {
            id
            name
            slug
            isVerified
            imageUrl
            ...CollectionLockup
          }
        }
      }
    }
  `,[z,A.VolumeFragment,w.CollectionLockupFragment]),J=(0,H.withSuspense)(({address:e})=>{let[{data:t}]=(0,l.useQuery)({query:Z,variables:{address:e}}),i=(0,v.useTranslations)("SocialProofTooltip");if(t?.profileByAddress.__typename!=="Profile")return(0,m.jsx)(q.PreviewTooltipContent,{children:(0,m.jsx)(k.TooltipLabel,{children:i("error")})});let o=t.profileByAddress,n=t.userCollections.items;return(0,m.jsx)(E.ProfilePreviewTooltipLayout,{avatar:(0,m.jsx)(g.Avatar,{border:!0,rounded:!0,seed:o.address,size:46,src:o.imageUrl}),chips:(0,m.jsx)(R,{profile:o}),collectionsTable:n.length>0?(0,m.jsx)(T.FlexColumn,{className:"w-full overflow-hidden",children:(0,m.jsx)(M.Table,{contentClassName:"scrollbar-hidden",header:(0,m.jsxs)(F.TableHeader,{className:W,children:[(0,m.jsx)(P.TableHeaderCell,{className:G.name(),children:i("collection")}),(0,m.jsx)(P.TableHeaderCell,{className:G.held(),children:i("held")}),(0,m.jsx)(P.TableHeaderCell,{className:G.value(),children:i("value")})]}),itemKey:(e,t)=>t,items:n,renderRow:({item:e})=>(0,m.jsxs)(_.TableRow,{className:W,children:[(0,m.jsx)(S.TableCell,{className:G.name(),children:(0,m.jsx)(y.CollectionLockup,{collection:e.collection,size:"xs"})}),(0,m.jsx)(S.TableCell,{className:G.held(),children:(0,m.jsx)(x.TextBody,{children:e.ownership.totalQuantity})}),(0,m.jsx)(S.TableCell,{className:G.value(),children:(0,m.jsx)(U.Volume,{disableTooltip:!0,display:"compact",volume:e.ownership.value})})]}),size:"xs"})}):null,name:(0,m.jsxs)(f.FlexCenter,{className:"gap-1.5",children:[(0,m.jsx)(x.TextBody,{size:"md",weight:"semibold",children:o.displayName||(0,I.formatAddress)(o.address)}),o.isVerified?(0,m.jsx)(B.Verified,{size:16}):null]}),showCollectionsTable:n.length>0})},{fallback:(0,m.jsx)(X,{})}),K=(0,i.graphql)(`
    query SocialProofTokenTooltipQuery(
      $address: Address!
      $contracts: [ContractIdentifierInput!]
      $accountId: String
    ) {
      profileByAddress(address: $address) {
        __typename
        ... on Profile {
          address
          displayName
          imageUrl
          isVerified
          ...SocialProofTooltipMetadataChips
        }
      }
      userCurrencyOwnershipsV2(
        accountId: $accountId
        addresses: [$address]
        contracts: $contracts
        filter: {}
        limit: 1
        useTokenGrouping: false
      ) {
        items {
          __typename
          id
          usdValue
          ... on CurrencyBalanceV2 {
            quantity
            asset {
              name
              symbol
              ...CurrencyV2Lockup
            }
          }
        }
      }
    }
  `,[z,b.CurrencyV2LockupFragment]),Y=(0,H.withSuspense)(({address:e,currencyContext:t})=>{let[{data:i}]=(0,l.useQuery)({query:K,variables:{address:e,contracts:[{address:t.contractAddress,chain:t.chain}]}}),o=(0,v.useTranslations)("SocialProofTooltip");if(i?.profileByAddress.__typename!=="Profile")return(0,m.jsx)(q.PreviewTooltipContent,{children:(0,m.jsx)(k.TooltipLabel,{children:o("error")})});let n=i.profileByAddress,a=i.userCurrencyOwnershipsV2.items[0],r=a&&"__typename"in a&&"CurrencyBalanceV2"===a.__typename&&"asset"in a;return(0,m.jsx)(E.ProfilePreviewTooltipLayout,{avatar:(0,m.jsx)(g.Avatar,{border:!0,rounded:!0,seed:n.address,size:46,src:n.imageUrl}),chips:(0,m.jsx)(R,{profile:n}),collectionsTable:r?(0,m.jsx)(T.FlexColumn,{className:"w-full overflow-hidden",children:(0,m.jsx)(M.Table,{contentClassName:"scrollbar-hidden",header:(0,m.jsxs)(F.TableHeader,{className:W,children:[(0,m.jsx)(P.TableHeaderCell,{className:G.name(),children:o("token")}),(0,m.jsx)(P.TableHeaderCell,{className:G.held(),children:o("held")}),(0,m.jsx)(P.TableHeaderCell,{className:G.value(),children:o("value")})]}),itemKey:()=>0,items:[a],renderRow:({item:e})=>{var t,l,i;let o;return(0,m.jsxs)(_.TableRow,{className:W,children:[(0,m.jsx)(S.TableCell,{className:G.name(),children:(0,m.jsx)(j.CurrencyLockup,{currency:e.asset,size:"xs"})}),(0,m.jsx)(S.TableCell,{className:G.held(),children:(0,m.jsx)(x.TextBody,{size:"xs",children:(t=Number(e.quantity),l=e.asset.symbol,o=t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}K`:t>=1?t.toFixed(2):t.toPrecision(3),`${o} ${l}`)})}),(0,m.jsx)(S.TableCell,{className:G.value(),children:(0,m.jsx)(x.TextBody,{size:"xs",children:(i=Number(e.usdValue))>=1e6?`$${(i/1e6).toFixed(1)}M`:i>=1e3?`$${(i/1e3).toFixed(1)}K`:`$${i.toFixed(2)}`})})]})},size:"xs"})}):null,name:(0,m.jsxs)(f.FlexCenter,{className:"gap-1.5",children:[(0,m.jsx)(x.TextBody,{size:"md",weight:"semibold",children:n.displayName||(0,I.formatAddress)(n.address)}),n.isVerified?(0,m.jsx)(B.Verified,{size:16}):null]}),showCollectionsTable:!!r})},{fallback:(0,m.jsx)(X,{})});function X(){let e,l,i,o=(0,t.c)(3);return o[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,m.jsx)(N.SkeletonBlock,{className:"size-[46px] rounded-full"}),l=(0,m.jsx)(O.ProfileMetadataChipsSkeleton,{variant:"default"}),o[0]=e,o[1]=l):(e=o[0],l=o[1]),o[2]===Symbol.for("react.memo_cache_sentinel")?(i=(0,m.jsx)(E.ProfilePreviewTooltipLayout,{avatar:e,chips:l,collectionsTable:null,name:(0,m.jsx)(x.TextBodySkeleton,{className:"h-[18px] w-[150px]",size:"sm"}),showCollectionsTable:!1}),o[2]=i):i=o[2],i}let ee=/\.0$/;function et(e){let l,i,o,n,a,r,s,c,d,u=(0,t.c)(38),{notableAccounts:p,count:g,context:C,variant:y,showCount:w,currencyContext:j,tooltipContainer:b,className:T}=e,I=void 0===y?"full":y,N=void 0===w||w,M=(0,v.useTranslations)("SocialProofBadge");if(0===p.length||"avatarOnly"!==I&&0===g)return null;if(u[0]!==T||u[1]!==C||u[2]!==g||u[3]!==j||u[4]!==p||u[5]!==N||u[6]!==M||u[7]!==b||u[8]!==I){s=Symbol.for("react.early_return_sentinel");e:{var S;let e,t=p.map(eo),c="full"===I?24:20;u[16]!==C?(e="holders"===C?"collections":"tokens",u[16]=C,u[17]=e):e=u[17];let d=e;if("avatarOnly"===I){s=(0,m.jsx)(f.FlexCenter,{className:T,children:(0,m.jsx)(en,{accounts:t,container:b,currencyContext:j,size:c,tooltipVariant:d})});break e}let v=M(C),y=(S=g??0)>=1e6?`${(S/1e6).toFixed(1).replace(ee,"")}M`:S>=1e3?`${(S/1e3).toFixed(1).replace(ee,"")}K`:S.toString();if("compact"===I){let e,l,i=t.find(ei),o="traders"===C?i?M.rich("compactHolding",{name1:()=>(0,m.jsx)("span",{className:"font-semibold text-primary",children:i.displayName})}):M("compactHoldingCountOnly",{count:y}):i?M.rich("compactCountWithName",{count:y,context:v,name1:()=>(0,m.jsx)("span",{className:"font-semibold text-primary",children:i.displayName})}):M("compactCount",{count:y,context:v});u[18]!==T?(e=(0,h.classNames)("gap-1.5",T),u[18]=T,u[19]=e):e=u[19],u[20]!==o?(l=(0,m.jsx)(x.TextBody,{className:"truncate text-secondary text-xs",children:o}),u[20]=o,u[21]=l):l=u[21],s=(0,m.jsxs)(f.FlexCenter,{className:e,children:[(0,m.jsx)(en,{accounts:t,container:b,currencyContext:j,size:c,tooltipVariant:d}),l]});break e}let w=t.filter(el);i=f.FlexCenter,u[22]!==T?(a=(0,h.classNames)("gap-2",T),u[22]=T,u[23]=a):a=u[23],u[24]!==t||u[25]!==j||u[26]!==c||u[27]!==d?(r=(0,m.jsx)(en,{accounts:t,currencyContext:j,size:c,tooltipVariant:d}),u[24]=t,u[25]=j,u[26]=c,u[27]=d,u[28]=r):r=u[28],l=x.TextBody,o="truncate text-secondary text-sm",n=(()=>{if(0===w.length)return"traders"===C?M("compactHoldingCountOnly",{count:y}):M("compactCount",{count:y,context:v});let e=()=>(0,m.jsx)(ea,{account:w[0],container:b,currencyContext:j,tooltipVariant:d}),t=w.length>=2?()=>(0,m.jsx)(ea,{account:w[1],container:b,currencyContext:j,tooltipVariant:d}):void 0,l=w.length>=3?()=>(0,m.jsx)(ea,{account:w[2],container:b,currencyContext:j,tooltipVariant:d}):void 0;if("traders"===C){let i=(g??0)>p.length;return l&&t?M.rich(i?"holdingThree":"holdingOnlyThree",{name1:e,name2:t,name3:l}):t?M.rich(i?"holdingTwo":"holdingOnlyTwo",{name1:e,name2:t}):M.rich(i?"holdingOne":"holdingOnlyOne",{name1:e})}return t?N?M.rich("includingTwo",{count:y,context:v,name1:e,name2:t}):M.rich("namesTwo",{name1:e,name2:t}):N?M.rich("includingOne",{count:y,context:v,name1:e}):M.rich("namesOne",{name1:e})})()}u[0]=T,u[1]=C,u[2]=g,u[3]=j,u[4]=p,u[5]=N,u[6]=M,u[7]=b,u[8]=I,u[9]=l,u[10]=i,u[11]=o,u[12]=n,u[13]=a,u[14]=r,u[15]=s}else l=u[9],i=u[10],o=u[11],n=u[12],a=u[13],r=u[14],s=u[15];return s!==Symbol.for("react.early_return_sentinel")?s:(u[29]!==l||u[30]!==o||u[31]!==n?(c=(0,m.jsx)(l,{className:o,children:n}),u[29]=l,u[30]=o,u[31]=n,u[32]=c):c=u[32],u[33]!==i||u[34]!==a||u[35]!==r||u[36]!==c?(d=(0,m.jsxs)(i,{className:a,children:[r,c]}),u[33]=i,u[34]=a,u[35]=r,u[36]=c,u[37]=d):d=u[37],d)}function el(e){return e.displayName}function ei(e){return e.displayName}function eo(e){return(0,p.readFragment)(s,e)}function en(e){let l,i,o=(0,t.c)(13),{accounts:n,size:a,tooltipVariant:r,currencyContext:s,container:c}=e;if(o[0]!==n||o[1]!==c||o[2]!==s||o[3]!==a||o[4]!==r){let e;o[6]!==c||o[7]!==s||o[8]!==a||o[9]!==r?(e=(e,t)=>(0,m.jsx)(Q,{address:e.address,container:c,currencyContext:s,variant:r,children:(0,m.jsx)(g.Avatar,{className:"shrink-0 cursor-pointer transition-transform duration-150 ease-out hover:z-10 hover:scale-110",rounded:!0,seed:e.address,size:a,src:e.imageUrl||void 0,style:{marginLeft:t>0?"-8px":void 0}})},e.address),o[6]=c,o[7]=s,o[8]=a,o[9]=r,o[10]=e):e=o[10],l=n.slice(0,3).map(e),o[0]=n,o[1]=c,o[2]=s,o[3]=a,o[4]=r,o[5]=l}else l=o[5];return o[11]!==l?(i=(0,m.jsx)(C.Flex,{className:"shrink-0",children:l}),o[11]=l,o[12]=i):i=o[12],i}function ea(e){let l,i,o,n=(0,t.c)(11),{account:r,tooltipVariant:s,currencyContext:c,container:d}=e;n[0]!==r?(l=(0,a.getProfileUrl)(r),n[0]=r,n[1]=l):l=n[1];let u=l;return n[2]!==r.displayName||n[3]!==u?(i=(0,m.jsx)("a",{className:"font-semibold text-primary hover:underline",href:u,children:r.displayName}),n[2]=r.displayName,n[3]=u,n[4]=i):i=n[4],n[5]!==r.address||n[6]!==d||n[7]!==c||n[8]!==i||n[9]!==s?(o=(0,m.jsx)(Q,{address:r.address,container:d,currencyContext:c,variant:s,children:i}),n[5]=r.address,n[6]=d,n[7]=c,n[8]=i,n[9]=s,n[10]=o):o=n[10],o}e.s(["SocialProofBadge",()=>et],292986);let er={suspense:!1,ttl:o.TTL["5m"]},es=(0,i.graphql)(`
    query CurrencySocialProofQuery($contract: ContractIdentifierInput!) {
      currencyV2(contract: $contract) {
        socialProof {
          socialCount
          notableAccounts {
            ...SocialProofBadgeAccount
          }
        }
      }
    }
  `,[s]);function ec(e){let i,o,a,r,s=(0,t.c)(17),{contractAddress:c,chainIdentifier:d,symbol:u,variant:p,className:g,tooltipContainer:h}=e,C=void 0===p?"compact":p,f=(0,n.useIsCurrencySocialProofEnabled)();s[0]!==d||s[1]!==c?(i={contract:{address:c,chain:d}},s[0]=d,s[1]=c,s[2]=i):i=s[2];let x=!f;s[3]!==i||s[4]!==x?(o={query:es,variables:i,pause:x,context:er},s[3]=i,s[4]=x,s[5]=o):o=s[5];let[v]=(0,l.useQuery)(o),{data:y}=v;if(!(f&&y?.currencyV2))return null;let{socialProof:w}=y.currencyV2;return s[6]!==d||s[7]!==c||s[8]!==u?(a={symbol:u,contractAddress:c,chain:d},s[6]=d,s[7]=c,s[8]=u,s[9]=a):a=s[9],s[10]!==g||s[11]!==w.notableAccounts||s[12]!==w.socialCount||s[13]!==a||s[14]!==h||s[15]!==C?(r=(0,m.jsx)(et,{className:g,context:"traders",count:w.socialCount,currencyContext:a,notableAccounts:w.notableAccounts,tooltipContainer:h,variant:C}),s[10]=g,s[11]=w.notableAccounts,s[12]=w.socialCount,s[13]=a,s[14]=h,s[15]=C,s[16]=r):r=s[16],r}e.s(["CURRENCY_SOCIAL_PROOF_OPERATION_CONTEXT",0,er,"CurrencySocialProofBadge",()=>ec,"CurrencySocialProofQuery",0,es],136746),e.s([],804199);var ed=e.i(302502),eu=e.i(670383);function em(e,t){let l=(0,eu.useRef)(new Set),i=(0,eu.useRef)(t);i.current=t,(0,eu.useEffect)(()=>()=>{l.current.clear()},[]),(0,eu.useEffect)(()=>{e.forEach(e=>{let t=i.current(e);if(!t)return;let o=`${t.surface}:${t.contentId}`;l.current.has(o)||(l.current.add(o),(0,ed.track)("Content Impression",{surface:t.surface,contentType:t.contentType,contentId:t.contentId,contentName:t.contentName,position:t.position,...void 0!==t.hasSocialProof&&{hasSocialProof:t.hasSocialProof}}))})},[e])}function ep(e){let t=(0,eu.useRef)(null),l=(0,eu.useRef)(e);l.current=e,(0,eu.useEffect)(()=>{let e=l.current;e&&t.current!==e.contentId&&(t.current=e.contentId,(0,ed.track)("Content Impression",{surface:e.surface,contentType:e.contentType,contentId:e.contentId,contentName:e.contentName,position:e.position,...void 0!==e.hasSocialProof&&{hasSocialProof:e.hasSocialProof}}))},[e?.contentId])}e.s(["CONTENT_IMPRESSION_SURFACES",0,{HOMEPAGE_SPOTLIGHT:"homepage_spotlight",TOKEN_DETAIL:"token_detail",COLLECTION_DETAIL:"collection_detail",TRENDING_COLLECTION_CARD:"trending_collection_card",TRENDING_TOKEN_CARD:"trending_token_card"},"CONTENT_IMPRESSION_TYPES",0,{COLLECTION:"collection",TOKEN:"token"},"useContentImpressionTracking",()=>em,"useSingleContentImpressionTracking",()=>ep],702361)},379484,142683,907748,e=>{"use strict";var t=e.i(7683),l=e.i(885530),i=e.i(455480),o=e.i(333799),n=e.i(457628),a=e.i(866313),r=e.i(10340),s=e.i(534763),c=e.i(410338);function d(e){let l,i=(0,a.c)(4),{isFilled:o,loading:n,size:d}=e,u=void 0===d?16:d;return i[0]!==o||i[1]!==n||i[2]!==u?(l=o?(0,t.jsx)(c.StarFilled,{fill:"warning",size:u}):(0,t.jsx)(s.Star,{className:(0,r.disabledVariants)({disabled:n}),size:u}),i[0]=o,i[1]=n,i[2]=u,i[3]=l):l=i[3],l}e.s(["CollectionWatchlistIcon",()=>d],142683);var u=e.i(459527),m=e.i(683269),p=e.i(522285),g=e.i(670383),h=e.i(843860),C=e.i(751712),f=e.i(541412),x=e.i(924457);let v=(0,l.graphql)(`
  mutation watchCollectionMutation($slug: String!) {
    watchCollection(slug: $slug) {
      success
      error {
        __typename
      }
    }
  }
`),y=(0,l.graphql)(`
  mutation unwatchCollectionMutation($slug: String!) {
    unwatchCollection(slug: $slug) {
      success
      error {
        __typename
      }
    }
  }
`),w=(0,l.graphql)(`
  fragment useToggleWatchCollection on Collection {
    slug
    name
  }
`);function j({collection:e,isWatching:t}){let l=(0,p.useTranslations)("useToggleWatchCollection"),{slug:o,name:n}=(0,i.readFragment)(w,e),[a,r]=(0,g.useState)(t);(0,g.useEffect)(()=>{r(t)},[t]);let[s]=(0,f.usePlaySound)(x.Sound.WatchlistAdd),[c]=(0,f.usePlaySound)(x.Sound.WatchlistRemove),[{fetching:d},j]=(0,u.useMutation)(v),[{fetching:b},T]=(0,u.useMutation)(y),{showErrorMessage:I,showSuccessMessage:N}=(0,m.useToasts)(),M=(0,h.useDebouncedCallback)(async e=>{try{let i;if(e){let e=await j({slug:o});(i=e.data?.watchCollection?.error?.__typename)||(N(`Added ${n} to watchlist`),s())}else{let e=await T({slug:o});(i=e.data?.unwatchCollection?.error?.__typename)||(N(`Removed ${n} from watchlist`),c())}if(i){var t;let e=(t=i,"EntryNotFoundError"===t?l("errorEntryNotFound"):"MaxWatchListSizeError"===t?l("errorMaxWatchListSize"):l("errorGeneric"));I(e,{duration:1e4}),r(e=>!e)}}catch{I(l("errorGeneric"),{duration:1e4}),r(e=>!e)}},750);return{execute:(0,C.useAuthenticatedCallback)(async()=>{let e=!a;r(e),await M(e)}),fetching:d||b,isWatching:a}}e.s(["useToggleWatchCollection",()=>j,"useToggleWatchCollectionFragment",0,w],907748);var b=e.i(389852);e.i(500598);var T=e.i(207225);let I=(0,l.graphql)(`
  query CollectionHeaderWatchlistButtonQuery($slug: String!) {
    isCollectionWatched(slug: $slug)
  }
`),N=(0,l.graphql)(`
  fragment CollectionHeaderWatchlistButton on Collection {
    slug
    ...useToggleWatchCollection
  }
`,[w]),M=(0,b.withSuspense)(({collection:e,className:l})=>{let a=(0,i.readFragment)(N,e),r=(0,T.useAddress)(),[{data:s,fetching:c}]=(0,o.useQuery)({query:I,variables:{slug:a.slug},pause:!r}),u=j({collection:a,isWatching:s?.isCollectionWatched??!1}),m=async e=>{e.preventDefault(),await u.execute()},p=c||u.fetching;return(0,t.jsx)(n.UnstyledButton,{className:l,disabled:p,onClick:m,children:(0,t.jsx)(d,{isFilled:u.isWatching,loading:p,size:20})})},{ssr:!1,fallback:({className:e})=>(0,t.jsx)(n.UnstyledButton,{className:e,disabled:!0,children:(0,t.jsx)(d,{isFilled:!1,loading:!0,size:20})})});e.s(["CollectionHeaderWatchlistButton",0,M,"CollectionHeaderWatchlistButtonFragment",0,N],379484)},885267,162061,e=>{"use strict";var t=e.i(885530);let l=(0,t.graphql)(`
  fragment useCollectionTabs on Collection {
    slug
    flags {
      isOffersEnabled
    }
    overview {
      modules {
        __typename
      }
    }
    drop {
      type
    }
    currencies {
      __typename
    }
    previewItems(limit: 1) {
      isFungible
      rarity {
        rank
      }
    }
    stats {
      uniqueItemCount
    }
    flags {
      supportsAttributesBySlug
    }
  }
`);e.s(["useCollectionTabsFragment",0,l],162061);let i=(0,t.graphql)(`
    fragment CollectionNavigation on Collection {
      slug
      ...useCollectionTabs
    }
  `,[l]);e.s(["CollectionNavigationFragment",0,i],885267)},629653,201890,575403,e=>{"use strict";var t=e.i(7683),l=e.i(670383),i=e.i(729427);function o(e){window.parent&&window.parent.postMessage(e,window.location.origin)}function n(){o({sidebar:{isOpen:!0}})}function a(e){o({syncModules:e})}function r(e){o({syncPreviewImages:e})}function s(e){o({syncHeroMedia:e})}function c(e){o({syncLogo:e})}function d(e){if(!e?.__typename)return null;switch(e.__typename){case"CollectionNarrativeModule":return e.variant||"TEXT";case"CollectionFAQModule":return"FAQ";case"CollectionTeamModule":return"TEAM";case"CollectionContentBlockModule":return e.variant||"FREEFORM";default:return null}}function u(e,t){o({sidebar:{isOpen:!0,action:{type:t,index:e,operation:"edit"}}})}function m(){o({sidebar:{isOpen:!0,action:{type:"BANNER_LINKS",index:null,operation:"edit"}}})}function p(){o({sidebar:{isOpen:!0,action:{type:"BANNER_MEDIA",index:null,operation:"edit"}}})}e.s(["getModuleType",()=>d,"openBannerSidebar",()=>p,"openEditSidebar",()=>u,"openLinksSidebar",()=>m,"openSidebar",()=>n,"syncHeroMediaToParent",()=>s,"syncLogoToParent",()=>c,"syncModulesToParent",()=>a,"syncPreviewImagesToParent",()=>r],201890),e.i(725857);var g=e.i(735854),h=e.i(89414);let C=g.CollectionOverviewModulesFragment,f=e=>(0,i.create)((t,l)=>({slug:e,modules:null,previewImages:[],heroMedia:{desktopHeroMedia:null,mobileHeroMedia:null},logoMedia:null,logoToken:null,hasUnsavedChanges:!1,setModules:e=>{let{hasUnsavedChanges:i}=l();i||t({modules:(0,h.parseCollectionModules)(e)})},syncModules:e=>{t({modules:(0,h.parseRawModules)(e)})},moveModule:(e,i)=>{let{modules:o}=l();if(!o||e===i)return;let n=[...o],[r]=n.splice(e,1);n.splice(i,0,r),t({modules:n,hasUnsavedChanges:!0}),a(n)},deleteModule:e=>{let{modules:i}=l();if(!i||e<0||e>=i.length)return;let o=[...i];o.splice(e,1),t({modules:o,hasUnsavedChanges:!0}),a(o)},setPreviewImages:e=>{t({previewImages:e,hasUnsavedChanges:!0}),r(e)},setPreviewImagesFromCollection:e=>{let{hasUnsavedChanges:i}=l();i||t({previewImages:(0,h.parseCollectionPreviewImages)(e)})},addPreviewImage:e=>{let{previewImages:i}=l();if(i.length>=4)return;let o=[...i,e];t({previewImages:o,hasUnsavedChanges:!0}),r(o)},updatePreviewImage:(e,i)=>{let{previewImages:o}=l();if(e<0||e>=o.length)return;let n=[...o];n[e]=i,t({previewImages:n,hasUnsavedChanges:!0}),r(n)},deletePreviewImage:e=>{let{previewImages:i}=l();if(e<0||e>=i.length)return;let o=[...i];o.splice(e,1),t({previewImages:o,hasUnsavedChanges:!0}),r(o)},setHeroMedia:e=>{t({heroMedia:e,hasUnsavedChanges:!0}),s(e)},setHeroMediaFromCollection:e=>{let{hasUnsavedChanges:i}=l();i||t({heroMedia:(0,h.parseCollectionHeroMedia)(e)})},updateDesktopHeroMedia:e=>{let{heroMedia:i}=l(),o={...i,desktopHeroMedia:e};t({heroMedia:o,hasUnsavedChanges:!0}),s(o)},updateMobileHeroMedia:e=>{let{heroMedia:i}=l(),o={...i,mobileHeroMedia:e};t({heroMedia:o,hasUnsavedChanges:!0}),s(o)},updateLogoData:(e,l)=>{t({logoMedia:e,logoToken:l,hasUnsavedChanges:!0}),c({logoMedia:e,logoToken:l})},saveChanges:()=>{t({hasUnsavedChanges:!1})}}));e.s(["CollectionOverviewPreviewFragment",0,C,"createOverviewPreviewStore",0,f],575403);let x=(0,l.createContext)(void 0);e.s(["OverviewPreviewProvider",0,({children:e,slug:i})=>{let o=(0,l.useRef)(null);return null===o.current&&(o.current=f(i)),(0,t.jsx)(x.Provider,{value:o.current,children:e})},"OverviewPreviewStoreContext",0,x,"useOverviewPreviewStore",0,e=>{let t=(0,l.useContext)(x);if(!t)throw Error("useOverviewPreviewStore must be used within OverviewPreviewProvider");return(0,i.useStore)(t,e)}],629653)},165879,579323,804557,980895,32344,748876,636361,349208,960836,958591,689714,e=>{"use strict";var t=e.i(885530),l=e.i(455480),i=e.i(165102),o=e.i(62793);let n=(0,t.graphql)(`
    fragment useCollectionBannerMedia on Collection {
      ...CollectionBannerImage
      hero {
        desktopHeroMedia {
          __typename
          ... on ImageMedia {
            imageUrl
          }
          ... on VideoMedia {
            videoUrl
          }
          ... on MuxVideoMedia {
            muxPlaybackId
          }
        }
        mobileHeroMedia {
          __typename
          ... on ImageMedia {
            imageUrl
          }
          ... on VideoMedia {
            videoUrl
          }
          ... on MuxVideoMedia {
            muxPlaybackId
          }
        }
      }
    }
  `,[o.CollectionBannerImageFragment]),a=(0,t.graphql)(`
    fragment useCollectionBannerMediaFallback on Collection {
      ...CollectionBannerImage
      hero {
        desktopHeroMedia {
          ... on VideoMedia {
            thumbnailUrl
          }
          ... on MuxVideoMedia {
            thumbnailUrl
          }
        }
        mobileHeroMedia {
          ... on VideoMedia {
            thumbnailUrl
          }
          ... on MuxVideoMedia {
            thumbnailUrl
          }
        }
      }
    }
  `,[o.CollectionBannerImageFragment]);e.s(["useCollectionBannerMedia",0,e=>{let t=(0,l.readFragment)(n,e),a=(0,o.getCollectionBannerImage)(t),r=(0,i.useIsLessThanMd)(),s=r?t?.hero?.mobileHeroMedia:t?.hero?.desktopHeroMedia,c=r&&!s?t?.hero?.desktopHeroMedia:null,d=s||c,u=null;switch(d?.__typename){case"VideoMedia":u=d.videoUrl;break;case"ImageMedia":u=d.imageUrl;break;case"MuxVideoMedia":u=d.muxPlaybackId;break;default:u=null}return u||a},"useCollectionBannerMediaFallback",0,e=>{let t=(0,l.readFragment)(a,e),n=(0,o.getCollectionBannerFallbackImage)(t),r=(0,i.useIsLessThanMd)(),s=r?t?.hero?.mobileHeroMedia:t?.hero?.desktopHeroMedia,c=r&&!s?t?.hero?.desktopHeroMedia:null,d=s||c,u=n;switch(d?.__typename){case"VideoMedia":case"MuxVideoMedia":u=d.thumbnailUrl;break;default:u=n}return u},"useCollectionBannerMediaFallbackFragment",0,a,"useCollectionBannerMediaFragment",0,n],165879);var r=e.i(7683),s=e.i(866313),c=e.i(437153),d=e.i(254842),u=e.i(414057),m=e.i(491150),p=e.i(567089),g=e.i(871085),h=e.i(35782);let C=(0,t.graphql)(`
  fragment CollectionCategoryChip on Collection {
    category
  }
`);function f(e){let t,i,o,n=(0,s.c)(7);n[0]!==e?({collection:t,...i}=e,n[0]=e,n[1]=t,n[2]=i):(t=n[1],i=n[2]);let a=(0,l.readFragment)(C,t),c=(0,h.useCategoryEnumName)();if(!a.category)return;let d=p.Chip,u=c(a.category);return n[3]!==d||n[4]!==i||n[5]!==u?(o=(0,r.jsx)(d,{...i,children:u}),n[3]=d,n[4]=i,n[5]=u,n[6]=o):o=n[6],(0,r.jsx)(m.Link,{href:{pathname:"/collections",query:{category:(0,g.toLowerCase)(a.category)}},variant:"unstyled",children:o})}var x=e.i(273720),v=e.i(922364),y=e.i(967593),w=e.i(522285);let j=(0,t.graphql)(`
  fragment CollectionCreatedAtChip on Collection {
    createdAt
  }
`);function b(e){let{collection:t,variant:i,chipVariant:o}=e,n=(0,l.readFragment)(j,t),a=(0,w.useTranslations)("CollectionCreatedAtChip"),s=(0,v.useDateTimeFormatter)()(new Date(n.createdAt),{display:"date",day:void 0});return"compact"===(void 0===i?"full":i)?(0,r.jsx)(y.Tooltip,{content:a("launched",{createdAt:s}),children:(0,r.jsx)(p.Chip,{variant:o,children:s})}):(0,r.jsx)(p.Chip,{variant:o,children:a("launched",{createdAt:s})})}var T=e.i(354667),I=e.i(493883);let N=(0,t.graphql)(`
    fragment CollectionDropStatusChip on Collection {
      ...collectionUrl
      ...getDropStatus
    }
  `,[o.collectionUrlFragment,I.getDropStatusFragment]);function M(e){let t,i,n,a,c,d,u,g=(0,s.c)(18);g[0]!==e?({collection:t,...i}=e,g[0]=e,g[1]=t,g[2]=i):(t=g[1],i=g[2]);let h=(0,l.readFragment)(N,t),C=(0,w.useTranslations)("CollectionDropStatusChip"),f=(0,I.getDropStatus)(h);if(!f)return null;g[3]!==f||g[4]!==C?(n=()=>{switch(f){case T.DropStatus.MINTING:return{text:C("mintingNow"),className:"border-success-1 text-success-1"};case T.DropStatus.MINTED_OUT:case T.DropStatus.MINT_ENDED:return{text:C("mintEnded"),className:"border-border-1 text-text-secondary"};case T.DropStatus.MINTING_SOON:return{text:C("mintingSoon"),className:"border-blue-1 text-blue-1"};default:return null}},g[3]=f,g[4]=C,g[5]=n):n=g[5];let x=n;g[6]!==x?(a=x(),g[6]=x,g[7]=a):a=g[7];let v=a;if(!v)return null;let y=m.Link,j=`${(0,o.getCollectionUrl)(h)}/overview`;return g[8]!==j?(c={pathname:j},g[8]=j,g[9]=c):c=g[9],g[10]!==v.className||g[11]!==v.text||g[12]!==i?(d=(0,r.jsx)(p.Chip,{className:v.className,...i,children:v.text}),g[10]=v.className,g[11]=v.text,g[12]=i,g[13]=d):d=g[13],g[14]!==y||g[15]!==c||g[16]!==d?(u=(0,r.jsx)(y,{href:c,variant:"unstyled",children:d}),g[14]=y,g[15]=c,g[16]=d,g[17]=u):u=g[17],u}var S=e.i(47667),F=e.i(190627);let P=(0,t.graphql)(`
    fragment CollectionFloorPriceChip on Collection {
      floorPrice {
        pricePerItem {
          ...TokenPrice
        }
      }
    }
  `,[F.TokenPriceFragment]);function _(e){let t,i,o,n,a,c=(0,s.c)(13);c[0]!==e?({collection:t,...i}=e,c[0]=e,c[1]=t,c[2]=i):(t=c[1],i=c[2]),c[3]!==t?(o=(0,l.readFragment)(P,t),c[3]=t,c[4]=o):o=c[4];let d=o,u=(0,w.useTranslations)("CollectionFloorPriceChip");if(d.floorPrice?.pricePerItem){if(c[5]!==d.floorPrice?.pricePerItem||c[6]!==u){let e;c[8]!==d.floorPrice?.pricePerItem?(e=()=>(0,r.jsx)(S.TokenPrice,{price:d.floorPrice?.pricePerItem}),c[8]=d.floorPrice?.pricePerItem,c[9]=e):e=c[9],n=u.rich("floor",{price:e}),c[5]=d.floorPrice?.pricePerItem,c[6]=u,c[7]=n}else n=c[7];return c[10]!==i||c[11]!==n?(a=(0,r.jsx)(p.Chip,{className:"gap-1.5",...i,children:n}),c[10]=i,c[11]=n,c[12]=a):a=c[12],a}}var k=e.i(738480),L=e.i(950293),B=e.i(220881);let U=(0,t.graphql)(`
  fragment CollectionItemCountChip on Collection {
    stats {
      totalSupply
      uniqueItemCount
    }
    standard
  }
`);function A(e){let t,i,o,n,a,c,d,u,m,g,h,C=(0,s.c)(38),{collection:f,variant:x,chipVariant:v}=e;C[0]!==f?(t=(0,l.readFragment)(U,f),C[0]=f,C[1]=t):t=C[1];let j=t,b=j.stats.totalSupply||0,T=(0,w.useTranslations)("CollectionItemCountChip");if(0===b)return null;C[2]===Symbol.for("react.memo_cache_sentinel")?(i=(0,r.jsx)(B.StacksFilled,{size:12}),C[2]=i):i=C[2],C[3]!==b?(o=(0,r.jsx)(k.NumberDisplay,{"data-testid":"total-supply",display:"full",value:b}),C[3]=b,C[4]=o):o=C[4],C[5]!==v||C[6]!==o?(n=(0,r.jsxs)(p.Chip,{className:"gap-1",variant:v,children:[i,o]}),C[5]=v,C[6]=o,C[7]=n):n=C[7];let I=n;if("ERC721"===j.standard||"CRYPTOPUNKS"===j.standard){let e,t,l;return C[8]!==T||C[9]!==b?(e=T(1===b?"item":"items"),C[8]=T,C[9]=b,C[10]=e):e=C[10],C[11]!==e||C[12]!==b?(t=(0,r.jsx)(L.TextBody,{children:(0,r.jsx)(k.NumberDisplay,{display:"full",suffix:e,value:b})}),C[11]=e,C[12]=b,C[13]=t):t=C[13],C[14]!==I||C[15]!==t?(l=(0,r.jsx)(y.Tooltip,{content:t,children:I}),C[14]=I,C[15]=t,C[16]=l):l=C[16],l}C[17]!==T||C[18]!==b?(a=T(1===b?"uniqueItem":"uniqueItems"),C[17]=T,C[18]=b,C[19]=a):a=C[19];let N=a;C[20]!==T||C[21]!==b?(c=T(1===b?"totalItem":"totalItems"),C[20]=T,C[21]=b,C[22]=c):c=C[22];let M=c,S="compact"===(void 0===x?"full":x)?"unique":N,F=j.stats.uniqueItemCount||0;return C[23]!==S||C[24]!==F?(d=(0,r.jsx)(k.NumberDisplay,{display:"full",suffix:S,value:F}),C[23]=S,C[24]=F,C[25]=d):d=C[25],C[26]!==v||C[27]!==d?(u=(0,r.jsx)(p.Chip,{variant:v,children:d}),C[26]=v,C[27]=d,C[28]=u):u=C[28],C[29]!==M||C[30]!==b?(m=(0,r.jsx)(L.TextBody,{children:(0,r.jsx)(k.NumberDisplay,{display:"full",suffix:M,value:b})}),C[29]=M,C[30]=b,C[31]=m):m=C[31],C[32]!==I||C[33]!==m?(g=(0,r.jsx)(y.Tooltip,{content:m,children:I}),C[32]=I,C[33]=m,C[34]=g):g=C[34],C[35]!==u||C[36]!==g?(h=(0,r.jsxs)(r.Fragment,{children:[u,g]}),C[35]=u,C[36]=g,C[37]=h):h=C[37],h}var O=e.i(916511),E=e.i(838820),H=e.i(28155),q=e.i(648091),D=e.i(723767),V=e.i(954012);function $(e){let t,i,o,n,a,d=(0,s.c)(19),{collection:u,variant:g,chipVariant:h,renderAsChip:C,overrides:f,prefix:x}=e,v=void 0===g?"full":g,y=void 0===C||C,j=(0,l.readFragment)(V.CollectionOwnerFragment,u),b=(0,w.useTranslations)("CollectionOwner");if(!j.owner)return null;let T=j.owner.displayName||(0,E.formatAddress)(j.owner.address,{display:"compact"});d[0]!==T||d[1]!==x||d[2]!==b?(t=x?(0,r.jsxs)(r.Fragment,{children:[x," ",T]}):b.rich("by",{owner:()=>(0,r.jsx)(r.Fragment,{children:T})}),d[0]=T,d[1]=x,d[2]=b,d[3]=t):t=d[3];let I=t,N=y?(0,r.jsx)(H.TextOverflowTooltip,{className:(0,c.classNames)("max-w-[150px]",{"3xl:max-w-[150px] md:max-w-[120px]":"compact"===v&&"ERC721"===j.standard,"md:max-w-[100px]":"compact"===v&&"ERC1155"===j.standard,"md:max-w-[150px]":"full"===v}),disabled:!0,children:I}):(0,r.jsx)("span",{children:I}),M=j.owner.isVerified?(0,r.jsx)(q.Verified,{size:f?.VerifiedIcon?.size??12,...y?{fill:"text-primary",innerFill:"transparent"}:{},...f?.VerifiedIcon,className:(0,c.classNames)("ml-1",f?.VerifiedIcon?.className)}):null;d[4]!==N||d[5]!==M?(i=(0,r.jsxs)(r.Fragment,{children:[N,M]}),d[4]=N,d[5]=M,d[6]=i):i=d[6];let S=i;d[7]!==h||d[8]!==S||d[9]!==y?(o=y?(0,r.jsx)(p.Chip,{variant:h,children:S}):S,d[7]=h,d[8]=S,d[9]=y,d[10]=o):o=d[10];let F=o,P=D.ProfilePreviewTooltip,_=j.owner,k=m.Link,L=(0,O.getProfileUrl)(j.owner,{view:"created"});return d[11]!==k||d[12]!==L||d[13]!==F?(n=(0,r.jsx)(k,{className:"flex items-center",href:L,variant:"unstyled",children:F}),d[11]=k,d[12]=L,d[13]=F,d[14]=n):n=d[14],d[15]!==P||d[16]!==j||d[17]!==n?(a=(0,r.jsx)(P,{profile:_,children:n}),d[15]=P,d[16]=j,d[17]=n,d[18]=a):a=d[18],a}e.s(["CollectionOwner",()=>$],579323);let z=(0,t.graphql)(`
    fragment CollectionOwnerChip on Collection {
      ...CollectionOwner
    }
  `,[V.CollectionOwnerFragment]);function R(e){let t,i,o=(0,s.c)(6),{collection:n,variant:a,chipVariant:c}=e,d=void 0===a?"full":a;o[0]!==n?(t=(0,l.readFragment)(z,n),o[0]=n,o[1]=t):t=o[1];let u=t;return o[2]!==c||o[3]!==u||o[4]!==d?(i=(0,r.jsx)($,{chipVariant:c,collection:u,variant:d}),o[2]=c,o[3]=u,o[4]=d,o[5]=i):i=o[5],i}let Q=(0,t.graphql)(`
    fragment CollectionMetadataChip on Collection {
      ...CollectionOwnerChip
      ...CollectionChainChip
      ...CollectionCategoryChip
      ...CollectionCreatedAtChip
      ...CollectionItemCountChip
      ...CollectionFloorPriceChip
      ...CollectionDropStatusChip
    }
  `,[z,x.CollectionChainChipFragment,C,j,U,P,N]);function W(e){let t,i,o,n,a,c=(0,s.c)(42);c[0]!==e?({chip:t,collection:i,variant:n,...o}=e,c[0]=e,c[1]=t,c[2]=i,c[3]=o,c[4]=n):(t=c[1],i=c[2],o=c[3],n=c[4]),c[5]!==i?(a=(0,l.readFragment)(Q,i),c[5]=i,c[6]=a):a=c[6];let d=a,m=(0,u.useHeroHeaderChipVariant)();switch(t){case"owner":{let e;return c[7]!==m||c[8]!==d||c[9]!==o||c[10]!==n?(e=(0,r.jsx)(R,{chipVariant:m,collection:d,variant:n,...o}),c[7]=m,c[8]=d,c[9]=o,c[10]=n,c[11]=e):e=c[11],e}case"item_count":{let e;return c[12]!==m||c[13]!==d||c[14]!==o||c[15]!==n?(e=(0,r.jsx)(A,{chipVariant:m,collection:d,variant:n,...o}),c[12]=m,c[13]=d,c[14]=o,c[15]=n,c[16]=e):e=c[16],e}case"created_at":{let e;return c[17]!==m||c[18]!==d||c[19]!==o||c[20]!==n?(e=(0,r.jsx)(b,{collection:d,...o,chipVariant:m,variant:n}),c[17]=m,c[18]=d,c[19]=o,c[20]=n,c[21]=e):e=c[21],e}case"chain":{let e;return c[22]!==m||c[23]!==d||c[24]!==o?(e=(0,r.jsx)(x.CollectionChainChip,{collection:d,variant:m,...o}),c[22]=m,c[23]=d,c[24]=o,c[25]=e):e=c[25],e}case"chain_badge":{let e;return c[26]!==m||c[27]!==d||c[28]!==o?(e=(0,r.jsx)(x.CollectionChainChip,{badge:!0,collection:d,variant:m,...o}),c[26]=m,c[27]=d,c[28]=o,c[29]=e):e=c[29],e}case"category":{let e;return c[30]!==m||c[31]!==d||c[32]!==o?(e=(0,r.jsx)(f,{collection:d,variant:m,...o}),c[30]=m,c[31]=d,c[32]=o,c[33]=e):e=c[33],e}case"floor_price":{let e;return c[34]!==m||c[35]!==d||c[36]!==o?(e=(0,r.jsx)(_,{collection:d,variant:m,...o}),c[34]=m,c[35]=d,c[36]=o,c[37]=e):e=c[37],e}case"drop_status":{let e;return c[38]!==m||c[39]!==d||c[40]!==o?(e=(0,r.jsx)(M,{collection:d,variant:m,...o}),c[38]=m,c[39]=d,c[40]=o,c[41]=e):e=c[41],e}}}let G=(0,t.graphql)(`
    fragment CollectionMetadataChips on Collection {
      isVerified
      isApproved
      ...CollectionMetadataChip
    }
  `,[Q]);function Z(e){let t,i,o,n,a,u,m,p,g,h,C=(0,s.c)(28);C[0]!==e?({collection:i,chips:n,className:t,...o}=e,C[0]=e,C[1]=t,C[2]=i,C[3]=o,C[4]=n):(t=C[1],i=C[2],o=C[3],n=C[4]),C[5]!==n?(a=void 0===n?["owner","chain","item_count","created_at","category","drop_status"]:n,C[5]=n,C[6]=a):a=C[6];let f=a;C[7]!==i?(u=(0,l.readFragment)(G,i),C[7]=i,C[8]=u):u=C[8];let x=u,v=x.isVerified||x.isApproved;if(C[9]!==f||C[10]!==t||C[11]!==x||C[12]!==v||C[13]!==o){let e,l;C[17]!==v?(e=e=>!!v||"owner"!==e,C[17]=v,C[18]=e):e=C[18];let i=f.filter(e);m=d.Flex,C[19]!==t?(p=(0,c.classNames)("scrollbar-hidden w-full flex-nowrap items-center gap-2 overflow-auto",t),C[19]=t,C[20]=p):p=C[20],C[21]!==x||C[22]!==o?(l=e=>(0,r.jsx)(W,{chip:e,collection:x,...o},e),C[21]=x,C[22]=o,C[23]=l):l=C[23],g=i.map(l),C[9]=f,C[10]=t,C[11]=x,C[12]=v,C[13]=o,C[14]=m,C[15]=p,C[16]=g}else m=C[14],p=C[15],g=C[16];return C[24]!==m||C[25]!==p||C[26]!==g?(h=(0,r.jsx)(m,{className:p,children:g}),C[24]=m,C[25]=p,C[26]=g,C[27]=h):h=C[27],h}e.s(["CollectionMetadataChipsFragment",0,G],804557),e.s(["CollectionMetadataChips",()=>Z],980895),e.s([],32344);var J=e.i(10361);e.i(764587);var K=e.i(804084),Y=e.i(514308);function X(e){let t,l,i,o,n,a=(0,s.c)(11),{variant:c}=e,u=(0,K.useDropStore)(ee),m=(0,w.useTranslations)("CollectionHeaderDropCountdown");if(!u)return null;a[0]!==m?(t=m("mintingIn"),a[0]=m,a[1]=t):t=a[1],a[2]!==t?(l=(0,r.jsx)(L.TextBody,{className:"font-mono text-text-secondary uppercase",size:"sm",children:t}),a[2]=t,a[3]=l):l=a[3];let p="compact"===(void 0===c?"full":c)?"sm":"lg";return a[4]!==u||a[5]!==p?(i=(0,r.jsx)(J.Countdown,{end:u,showDaysOnly:!0,size:p}),a[4]=u,a[5]=p,a[6]=i):i=a[6],a[7]===Symbol.for("react.memo_cache_sentinel")?(o=(0,r.jsx)(Y.HeroHeaderViewToggle,{}),a[7]=o):o=a[7],a[8]!==l||a[9]!==i?(n=(0,r.jsxs)(d.Flex,{className:"items-center gap-4",children:[l,i,o]}),a[8]=l,a[9]=i,a[10]=n):n=a[10],n}function ee(e){return e.dropStart}e.s(["CollectionHeaderDropCountdown",()=>X],748876);var et=e.i(140501);let el=(0,t.graphql)(`
  fragment CollectionHeaderLayoutGroup on Collection {
    slug
  }
`);function ei(e){let t,i,o,n=(0,s.c)(6);n[0]!==e?({collection:t,...i}=e,n[0]=e,n[1]=t,n[2]=i):(t=n[1],i=n[2]);let{slug:a}=(0,l.readFragment)(el,t),c=`collection.${a}`;return n[3]!==i||n[4]!==c?(o=(0,r.jsx)(et.LayoutGroup,{id:c,...i}),n[3]=i,n[4]=c,n[5]=o):o=n[5],o}e.s(["CollectionHeaderLayoutGroup",()=>ei,"CollectionHeaderLayoutGroupFragment",0,el],636361);var eo=e.i(670383),en=e.i(629653);function ea(){}e.s(["useCollectionLogoMediaPreview",0,()=>{let e,t,l=(0,s.c)(4),i=(0,eo.useContext)(en.OverviewPreviewStoreContext);l[0]!==i?(e=e=>i?i.subscribe(e):ea,l[0]=i,l[1]=e):e=l[1];let o=e;l[2]!==i?(t=()=>i?.getState().logoMedia??null,l[2]=i,l[3]=t):t=l[3];let n=t;return(0,eo.useSyncExternalStore)(o,n,n)}],349208);var er=e.i(457628),es=e.i(217961);let ec="collection-preview-interactive";e.s(["COLLECTION_PREVIEW_INTERACTIVE_ELEMENT_CLASS_NAME",0,ec],960836);var ed=e.i(201890);function eu(){let e,t,l,i,o=(0,s.c)(6),n=(0,w.useTranslations)("CollectionPreviewLinks");return o[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,c.classNames)("flex items-center gap-1",ec),o[0]=e):e=o[0],o[1]===Symbol.for("react.memo_cache_sentinel")?(t=(0,r.jsx)(es.Add,{size:20}),o[1]=t):t=o[1],o[2]!==n?(l=n("addLinks"),o[2]=n,o[3]=l):l=o[3],o[4]!==l?(i=(0,r.jsxs)(er.UnstyledButton,{className:e,onClick:ed.openLinksSidebar,children:[t,(0,r.jsx)(L.TextBody,{weight:"semibold",children:l})]}),o[4]=l,o[5]=i):i=o[5],i}e.s(["CollectionPreviewLinks",()=>eu],958591),e.s([],689714)},166369,275048,37435,631238,894285,e=>{"use strict";e.s(["CollectionDescriptionModal",()=>h],166369);var t=e.i(7683),l=e.i(866313),i=e.i(794835),o=e.i(439765),n=e.i(455480),a=e.i(601056),r=e.i(519078),s=e.i(39771),c=e.i(965523),d=e.i(345319),u=e.i(972483),m=e.i(92942),p=e.i(864102),g=e.i(569857);function h(e){let h,C,f,x,v,y,w,j,b,T,I,N,M,S,F,P,_,k=(0,l.c)(39);k[0]!==e?({collection:h,open:C,...f}=e,k[0]=e,k[1]=h,k[2]=C,k[3]=f):(h=k[1],C=k[2],f=k[3]),k[4]!==h?(x=(0,n.readFragment)(g.CollectionInfoFragment,h),k[4]=h,k[5]=x):x=k[5];let L=x;return L&&L.description?(k[6]!==L.imageUrl?(v=L.imageUrl?(0,t.jsxs)("div",{className:"relative inline-block shrink-0",children:[(0,t.jsx)(a.ItemAvatar,{className:"rounded",size:80,src:L.imageUrl}),(0,t.jsx)("div",{className:"absolute inset-0 inset-shadow-border rounded"})]}):null,k[6]=L.imageUrl,k[7]=v):v=k[7],k[8]===Symbol.for("react.memo_cache_sentinel")?(y=(0,t.jsx)(o.CollectionLockupContent,{children:(0,t.jsx)(i.CollectionLockupTitle,{weight:"semibold"})}),k[8]=y):y=k[8],k[9]!==L?(w=(0,t.jsx)(s.FlexCenter,{className:"gap-2",children:(0,t.jsx)(i.CollectionLockup,{collection:L,size:"2xl",children:y})}),k[9]=L,k[10]=w):w=k[10],k[11]!==L.externalUrl?(j=L.externalUrl?(0,t.jsx)(m.SocialLinks.Website,{href:(0,p.getValidUrl)(L.externalUrl)}):null,k[11]=L.externalUrl,k[12]=j):j=k[12],k[13]!==L.twitterUsername?(b=L.twitterUsername?(0,t.jsx)(m.SocialLinks.Twitter,{username:L.twitterUsername}):null,k[13]=L.twitterUsername,k[14]=b):b=k[14],k[15]!==L.instagramUsername?(T=L.instagramUsername?(0,t.jsx)(m.SocialLinks.Instagram,{username:L.instagramUsername}):null,k[15]=L.instagramUsername,k[16]=T):T=k[16],k[17]!==L.discordUrl?(I=L.discordUrl?(0,t.jsx)(m.SocialLinks.Discord,{href:L.discordUrl}):null,k[17]=L.discordUrl,k[18]=I):I=k[18],k[19]!==j||k[20]!==b||k[21]!==T||k[22]!==I?(N=(0,t.jsxs)(s.FlexCenter,{className:"gap-2",children:[j,b,T,I]}),k[19]=j,k[20]=b,k[21]=T,k[22]=I,k[23]=N):N=k[23],k[24]!==w||k[25]!==N?(M=(0,t.jsx)(r.ItemContent,{children:(0,t.jsxs)(c.FlexColumn,{className:"w-full gap-2",children:[w,N]})}),k[24]=w,k[25]=N,k[26]=M):M=k[26],k[27]!==M||k[28]!==v?(S=(0,t.jsx)(u.ModalHeader,{className:"border-b-0",children:(0,t.jsxs)(a.Item,{variant:"unstyled",children:[v,M]})}),k[27]=M,k[28]=v,k[29]=S):S=k[29],k[30]!==L.description?(F=(0,t.jsx)(u.ModalBody,{children:(0,t.jsx)(d.Markdown,{children:L.description})}),k[30]=L.description,k[31]=F):F=k[31],k[32]!==S||k[33]!==F?(P=(0,t.jsxs)(t.Fragment,{children:[S,F]}),k[32]=S,k[33]=F,k[34]=P):P=k[34],k[35]!==C||k[36]!==f||k[37]!==P?(_=(0,t.jsx)(u.Modal,{content:P,open:C,...f}),k[35]=C,k[36]=f,k[37]=P,k[38]=_):_=k[38],_):null}var C=e.i(885530),f=e.i(491150),x=e.i(967593),v=e.i(150093),y=e.i(861316),w=e.i(522285);e.i(500598);var j=e.i(207225);let b=(0,C.graphql)(`
  fragment CollectionInfoEditButton on Collection {
    slug
    owner {
      address
    }
  }
`);function T(e){let i,o,a,r,s=(0,l.c)(8),{collection:c}=e,d=(0,w.useTranslations)("CollectionInfoEditButton"),u=(0,j.useAddress)(),m=(0,n.readFragment)(b,c);if(!(0,y.isAddressEqual)(u,m.owner?.address))return;s[0]!==d?(i=d("tooltip"),s[0]=d,s[1]=i):i=s[1];let p=`/collection/${m.slug}/edit`;return s[2]===Symbol.for("react.memo_cache_sentinel")?(o=(0,t.jsx)(v.Edit,{size:20}),s[2]=o):o=s[2],s[3]!==p?(a=(0,t.jsx)("span",{children:(0,t.jsx)(f.Link,{href:p,variant:"unstyled",children:o})}),s[3]=p,s[4]=a):a=s[4],s[5]!==i||s[6]!==a?(r=(0,t.jsx)(x.Tooltip,{content:i,children:a}),s[5]=i,s[6]=a,s[7]=r):r=s[7],r}e.s(["CollectionInfoEditButton",()=>T,"CollectionInfoEditButtonFragment",0,b],275048);var I=e.i(502732),N=e.i(437153),M=e.i(683269),S=e.i(689666),F=e.i(354667),P=e.i(629653),_=e.i(960836),k=e.i(419360),L=e.i(199800);function B(){let e,i,o,n,a,r,s,c,d=(0,l.c)(22),u=(0,w.useTranslations)("CollectionLogoEditActions"),{showErrorMessage:m,showSuccessMessage:p}=(0,M.useToasts)(),g=(0,P.useOverviewPreviewStore)(A),h=(0,P.useOverviewPreviewStore)(U),{upload:C,isUploading:f}=(0,k.useCollectionImageUpload)(g,"PROFILE_PICTURE");d[0]!==m||d[1]!==p||d[2]!==u||d[3]!==h||d[4]!==C?(e=async e=>{if(e.length)try{let t=e[0],l=(0,L.readFileAsDataURL)(t),{token:i}=await C(t),o=await l;h(o,i),p(u("uploadSuccess"))}catch{m(u("uploadError"))}},d[0]=m,d[1]=p,d[2]=u,d[3]=h,d[4]=C,d[5]=e):e=d[5],d[6]!==f||d[7]!==e?(i={disabled:f,accept:F.collectionLogo.accept,maxFiles:1,maxSize:F.collectionLogo.maxFileSize,onDrop:e},d[6]=f,d[7]=e,d[8]=i):i=d[8];let{getRootProps:x,getInputProps:y}=(0,S.useDropzone)(i);return d[9]!==x?(o=x(),d[9]=x,d[10]=o):o=d[10],d[11]===Symbol.for("react.memo_cache_sentinel")?(n=(0,N.classNames)(_.COLLECTION_PREVIEW_INTERACTIVE_ELEMENT_CLASS_NAME,"opacity-0 transition-opacity group-hover:opacity-100"),d[11]=n):n=d[11],d[12]!==f?(a=(0,t.jsx)(I.Button,{className:n,disabled:f,icon:v.Edit,isLoading:f,size:"sm",variant:"secondary"}),d[12]=f,d[13]=a):a=d[13],d[14]!==y?(r=y(),d[14]=y,d[15]=r):r=d[15],d[16]!==r?(s=(0,t.jsx)("input",{...r}),d[16]=r,d[17]=s):s=d[17],d[18]!==o||d[19]!==a||d[20]!==s?(c=(0,t.jsxs)("div",{className:"absolute inset-0 z-10 flex items-center justify-center",...o,children:[a,s]}),d[18]=o,d[19]=a,d[20]=s,d[21]=c):c=d[21],c}function U(e){return e.updateLogoData}function A(e){return e.slug}e.s(["CollectionLogoEditActions",()=>B],37435);var O=e.i(895032),E=e.i(254842),H=e.i(276015),q=e.i(701211),D=e.i(232105),V=e.i(392984),$=e.i(79097),z=e.i(506291),R=e.i(127156);let Q=(0,C.graphql)(`
  fragment CollectionShareModal on Collection {
    slug
    name
    imageUrl
  }
`);function W({collection:e,open:l,onOpenChange:i}){let o=(0,w.useTranslations)("CollectionShareModal"),a=(0,n.readFragment)(Q,e),r=`${z.SITE_URL.origin}${(0,R.getCollectionUrlBySlug)(a.slug)}`,c=o("shareText",{collectionName:a.name}),d=`${z.SITE_URL.origin}${(0,R.getCollectionUrlBySlug)(a.slug)}/opengraph-image`,m={twitter:`https://x.com/intent/tweet?url=${encodeURIComponent(r)}&text=${encodeURIComponent(c)}`,telegram:`https://t.me/share/url?url=${encodeURIComponent(r)}&text=${encodeURIComponent(c)}`,farcaster:`https://warpcast.com/~/compose?text=${encodeURIComponent(`${c} ${r}`)}`},p=e=>{try{window.open(m[e],"_blank","noopener,noreferrer")||navigator.clipboard?.writeText(r)}catch(e){console.error("Failed to open share dialog:",e),navigator.clipboard?.writeText(r)}},g=async()=>{try{let e=await (0,L.fetchFileFromUrl)(d,`${a.slug}-collection.png`),t=URL.createObjectURL(e),l=document.createElement("a");l.href=t,l.download=e.name,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(t)}catch(e){console.error("Failed to save image:",e)}},h=async()=>{try{let e=await fetch(d),t=await e.blob();navigator.clipboard&&window.ClipboardItem?await navigator.clipboard.write([new ClipboardItem({[t.type]:t})]):navigator.clipboard?.writeText(d)}catch(e){console.error("Failed to copy image:",e),navigator.clipboard?.writeText(d)}};return(0,t.jsx)(u.Modal,{content:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(u.ModalHeader,{children:(0,t.jsx)(u.ModalHeaderTitle,{children:o("title")})}),(0,t.jsxs)(u.ModalBody,{className:"space-y-6",children:[a.imageUrl&&(0,t.jsx)(s.FlexCenter,{children:(0,t.jsx)(s.FlexCenter,{className:"h-[250px] w-full max-w-lg overflow-hidden rounded-lg border border-border-1 bg-bg-additional-1",children:(0,t.jsx)("img",{alt:o("ogImageAlt",{collectionName:a.name}),className:"h-full w-full rounded-lg object-cover",onError:e=>{let t=e.target;a.imageUrl&&(t.src=a.imageUrl)},src:d})})}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(I.Button,{className:"!bg-black !text-white hover:!bg-gray-800 !border-black w-full",icon:$.Twitter,onClick:()=>p("twitter"),variant:"secondary",children:o("shareOnX")}),(0,t.jsx)(I.Button,{className:"w-full",icon:V.Telegram,onClick:()=>p("telegram"),variant:"secondary",children:o("shareOnTelegram")}),(0,t.jsx)(I.Button,{className:"w-full",icon:D.Farcaster,onClick:()=>p("farcaster"),variant:"secondary",children:o("shareOnFarcaster")}),(0,t.jsx)(O.CopyToClipboard,{fullWidth:!0,text:r,tooltipText:o("copyLinkTooltip"),children:(0,t.jsx)(I.Button,{className:"w-full",icon:q.ContentCopy,variant:"secondary",children:o("copyLink")})}),(0,t.jsxs)(E.Flex,{className:"gap-2",children:[(0,t.jsx)(I.Button,{className:"flex-1",icon:q.ContentCopy,onClick:h,variant:"secondary",children:o("copyImage")}),(0,t.jsx)(I.Button,{className:"flex-1",icon:H.ArrowDownward,onClick:g,variant:"secondary",children:o("saveImage")})]})]})]})]}),onOpenChange:i,open:l,size:"lg"})}e.s(["CollectionShareModalFragment",0,Q],631238),e.s(["CollectionShareModal",()=>W],894285)},33037,e=>{"use strict";let t=(0,e.i(703379).tv)({slots:{avatar:"max-h-[46px] max-w-[46px] rounded",itemContent:"gap-1 overflow-visible"},variants:{headerView:{full:"",compact:""}},compoundVariants:[{headerView:"full",class:{avatar:"max-h-[60px] max-w-[60px]"}}]});e.s(["collectionInfoVariants",0,t])},101960,569857,722253,674853,175519,944976,36791,55002,371306,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(885267);e.i(764587);var o=e.i(62043),n=e.i(7683),a=e.i(866313),r=e.i(455480),s=e.i(25352),c=e.i(165879),d=e.i(938655),u=e.i(804084),m=e.i(354667),p=e.i(809444);e.i(32344);var g=e.i(980895),h=e.i(804557),C=e.i(748876),f=e.i(636361);e.s(["CollectionInfo",()=>eh,"CollectionInfoFragment",()=>eg],569857);var x=e.i(794835),v=e.i(439765),y=e.i(682576),w=e.i(931266),j=e.i(806957),b=e.i(601056),T=e.i(519078),I=e.i(194153),N=e.i(895032),M=e.i(437153),S=e.i(72087),F=e.i(254842),P=e.i(39771),_=e.i(965523),k=e.i(288403),L=e.i(165102),B=e.i(999258),U=e.i(967593),A=e.i(457628),O=e.i(701211),E=e.i(925854),H=e.i(930276),q=e.i(794576),D=e.i(369777),V=e.i(796579),$=e.i(314391),z=e.i(534763),R=e.i(657113),Q=e.i(522285),W=e.i(670383),G=e.i(349208);e.i(689714);var Z=e.i(958591),J=e.i(92942);e.i(804199);var K=e.i(292986),Y=e.i(854665),X=e.i(957618),ee=e.i(630208),et=e.i(195344),el=e.i(702361);e.i(500598);var ei=e.i(207225),eo=e.i(864102),en=e.i(262545),ea=e.i(379484),er=e.i(166369),es=e.i(275048),ec=e.i(37435),ed=e.i(894285),eu=e.i(631238),em=e.i(33037);let ep=(0,R.default)(()=>e.A(700313).then(e=>e.ReportModal),{loadableGenerated:{modules:[898121]},ssr:!1}),eg=(0,t.graphql)(`
    fragment CollectionInfo on Collection {
      ...CollectionLockup
      imageUrl
      instagramUsername
      discordUrl
      externalUrl
      twitterUsername
      slug
      description
      chain {
        identifier
        arch
      }
      address
      enforcement {
        isDisabled
      }
      ...CollectionMetadataChips
      ...EnforcementBadge
      ...CollectionInfoEditButton
      ...CollectionShareModal
      ...CollectionHeaderWatchlistButton
    }
  `,[y.CollectionLockupFragment,h.CollectionMetadataChipsFragment,ee.EnforcementBadgeFragment,es.CollectionInfoEditButtonFragment,eu.CollectionShareModalFragment,ea.CollectionHeaderWatchlistButtonFragment]);function eh(e){let t,l,i,o,s,c,u,m,p,h,C,f,y,R,ee,eu,eh,eC,ef,ex,ev,ey,ew,ej,eb,eT,eI,eN,eM,eS,eF,eP=(0,a.c)(118),{className:e_,collection:ek}=e;eP[0]!==ek?(t=(0,r.readFragment)(eg,ek),eP[0]=ek,eP[1]=t):t=eP[1];let eL=t,eB=(0,w.useBlockExplorer)(eL.chain.identifier),{headerView:eU}=(0,d.useHeroHeaderView)(),{setAvatarRef:eA,isPreview:eO}=(0,en.useCollectionLayout)(),[eE,eH]=(0,W.useState)(!1),[eq,eD]=(0,W.useState)(!1),[eV,e$]=(0,W.useState)(!1),ez=(0,ei.useAddress)(),eR=!!eL.description,{isSocialProofEnabled:eQ,socialProof:eW,isFetching:eG}=(0,Y.useCollectionSocialProof)(eL.slug);eP[2]!==eL.slug||eP[3]!==eG||eP[4]!==eQ||eP[5]!==eW?(l=eQ&&(void 0!==eW||!eG)?{surface:el.CONTENT_IMPRESSION_SURFACES.COLLECTION_DETAIL,contentType:el.CONTENT_IMPRESSION_TYPES.COLLECTION,contentId:eL.slug,position:0,hasSocialProof:(eW?.notableCollectors?.length??0)>0}:null,eP[2]=eL.slug,eP[3]=eG,eP[4]=eQ,eP[5]=eW,eP[6]=l):l=eP[6],(0,el.useSingleContentImpressionTracking)(l);let eZ=(0,Q.useTranslations)("CollectionInfo"),eJ=(0,G.useCollectionLogoMediaPreview)()||eL.imageUrl;if(eP[7]!==e_||eP[8]!==eU||eP[9]!==eO||eP[10]!==eQ||eP[11]!==eJ||eP[12]!==eA||eP[13]!==eZ){let e,t,l,a,r,d,g,{avatar:C,itemContent:f}=(0,em.collectionInfoVariants)({headerView:eU}),x=(0,n.jsx)(b.ItemAvatar,{boost:2,border:!0,className:C(),priority:!0,ref:eA,size:"compact"===eU?46:60,src:eJ??void 0});eP[22]!==x?(e=(0,n.jsx)(P.FlexCenter,{children:x}),eP[22]=x,eP[23]=e):e=eP[23];let v=e;s=_.FlexColumn,eP[24]!==e_?(h=(0,M.classNames)("min-w-0 select-text",e_),eP[24]=e_,eP[25]=h):h=eP[25],o=b.Item;let y=eQ&&"items-start";eP[26]!==y?(u=(0,M.classNames)(y),eP[26]=y,eP[27]=u):u=eP[27],m="unstyled";let w=eQ&&"pt-1";eP[28]!==w?(t=(0,M.classNames)("group relative",w),eP[28]=w,eP[29]=t):t=eP[29];let j=eJ??void 0;eP[30]===Symbol.for("react.memo_cache_sentinel")?(l={maxHeight:"min(500px, 90vw)",maxWidth:"min(500px, 90vw)"},eP[30]=l):l=eP[30],eP[31]!==j?(a=(0,n.jsx)(I.CenterAligned,{children:(0,n.jsx)(b.ItemAvatar,{border:!0,className:"max-h-[500px] max-w-[500px]",size:1e3,src:j,style:l})}),eP[31]=j,eP[32]=a):a=eP[32],eP[33]!==v||eP[34]!==eO||eP[35]!==eZ?(r=eO?v:(0,n.jsx)(A.UnstyledButton,{"aria-label":eZ("viewCollectionLogo"),children:v}),eP[33]=v,eP[34]=eO,eP[35]=eZ,eP[36]=r):r=eP[36],eP[37]!==eO||eP[38]!==a||eP[39]!==r?(d=(0,n.jsx)(k.Lightbox,{content:a,disabled:eO,children:r}),eP[37]=eO,eP[38]=a,eP[39]=r,eP[40]=d):d=eP[40],eP[41]!==eO?(g=eO&&(0,n.jsx)(ec.CollectionLogoEditActions,{}),eP[41]=eO,eP[42]=g):g=eP[42],eP[43]!==t||eP[44]!==d||eP[45]!==g?(p=(0,n.jsxs)(F.Flex,{className:t,children:[d,g]}),eP[43]=t,eP[44]=d,eP[45]=g,eP[46]=p):p=eP[46],i=T.ItemContent,c=f(),eP[7]=e_,eP[8]=eU,eP[9]=eO,eP[10]=eQ,eP[11]=eJ,eP[12]=eA,eP[13]=eZ,eP[14]=i,eP[15]=o,eP[16]=s,eP[17]=c,eP[18]=u,eP[19]=m,eP[20]=p,eP[21]=h}else i=eP[14],o=eP[15],s=eP[16],c=eP[17],u=eP[18],m=eP[19],p=eP[20],h=eP[21];eP[47]===Symbol.for("react.memo_cache_sentinel")?(C=(0,n.jsx)(v.CollectionLockupContent,{children:(0,n.jsx)(x.CollectionLockupTitle,{weight:"semibold"})}),eP[47]=C):C=eP[47],eP[48]!==eL?(f=(0,n.jsx)(L.Media,{lessThan:"md",children:(0,n.jsx)(x.CollectionLockup,{collection:eL,size:"2xl",children:C})}),eP[48]=eL,eP[49]=f):f=eP[49];let eK="compact"===eU?"2xl":"3xl";eP[50]===Symbol.for("react.memo_cache_sentinel")?(y=(0,n.jsx)(v.CollectionLockupContent,{children:(0,n.jsx)(x.CollectionLockupTitle,{weight:"semibold"})}),eP[50]=y):y=eP[50],eP[51]!==eL||eP[52]!==eK?(R=(0,n.jsx)(L.Media,{greaterThanOrEqual:"md",children:(0,n.jsx)(x.CollectionLockup,{collection:eL,size:eK,children:y})}),eP[51]=eL,eP[52]=eK,eP[53]=R):R=eP[53],eP[54]!==R||eP[55]!==f?(ee=(0,n.jsxs)("h1",{children:[f,R]}),eP[54]=R,eP[55]=f,eP[56]=ee):ee=eP[56],eP[57]!==eL?(eu=(0,n.jsx)(ea.CollectionHeaderWatchlistButton,{collection:eL}),eP[57]=eL,eP[58]=eu):eu=eP[58],eP[59]!==ee||eP[60]!==eu?(eh=(0,n.jsxs)(F.Flex,{className:"min-w-0 items-center gap-2",children:[ee,eu]}),eP[59]=ee,eP[60]=eu,eP[61]=eh):eh=eP[61],eP[62]!==eL?(eC=(0,n.jsx)(X.EnforcementBadge,{className:"ml-2",entity:eL}),eP[62]=eL,eP[63]=eC):eC=eP[63],eP[64]===Symbol.for("react.memo_cache_sentinel")?(ef=(0,n.jsx)(L.Media,{greaterThanOrEqual:"md",children:(0,n.jsx)(F.Flex,{className:"h-full items-center",children:(0,n.jsx)(B.Separator,{className:"mx-4 max-h-6 w-[2px]",orientation:"vertical"})})}),eP[64]=ef):ef=eP[64],eP[65]!==ez||eP[66]!==eB||eP[67]!==eL||eP[68]!==eR||eP[69]!==eO||eP[70]!==eZ?(ex=eO?(0,n.jsx)(Z.CollectionPreviewLinks,{}):(0,n.jsxs)(F.Flex,{className:"items-center gap-5",children:[(0,n.jsx)(es.CollectionInfoEditButton,{collection:eL}),eR?(0,n.jsx)(U.Tooltip,{content:eZ("info"),children:(0,n.jsx)(A.UnstyledButton,{onClick:()=>{eD(!0)},children:(0,n.jsx)(q.Info,{size:20})})}):null,eL.address?(0,n.jsx)(N.CopyToClipboard,{text:eL.address,tooltipText:"Copy address",children:(0,n.jsx)(O.ContentCopy,{size:20})}):null,eL.externalUrl?(0,n.jsx)(J.SocialLinks.Website,{href:(0,eo.getValidUrl)(eL.externalUrl)}):null,eL.twitterUsername?(0,n.jsx)(J.SocialLinks.Twitter,{username:eL.twitterUsername}):null,(0,n.jsx)(U.Tooltip,{content:eZ("share"),children:(0,n.jsx)(A.UnstyledButton,{onClick:()=>e$(!0),children:(0,n.jsx)($.Share,{size:20})})}),(0,n.jsx)(j.Dropdown,{content:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(S.DropdownItem,{className:"hidden",children:[(0,n.jsx)(S.DropdownItemAvatar,{icon:z.Star}),(0,n.jsx)(S.DropdownItemContent,{children:(0,n.jsx)(S.DropdownItemTitle,{children:eZ("watchlist")})})]}),eL.address?(0,n.jsxs)(S.DropdownItem,{href:eB.getAddressUrl(eL.address),children:[(0,n.jsx)(S.DropdownItemAvatar,{...eB.getLogo()}),(0,n.jsx)(S.DropdownItemContent,{children:(0,n.jsx)(S.DropdownItemTitle,{children:eZ("viewOn",{name:eB.getName()})})})]}):null,(0,n.jsxs)(S.DropdownItem,{className:"hidden",children:[(0,n.jsx)(S.DropdownItemAvatar,{icon:H.Flag}),(0,n.jsx)(S.DropdownItemContent,{children:(0,n.jsx)(S.DropdownItemTitle,{children:eZ("report")})})]}),eL.instagramUsername?(0,n.jsxs)(S.DropdownItem,{href:(0,J.getSocialAccountUrl)("instagram",eL.instagramUsername),children:[(0,n.jsx)(S.DropdownItemAvatar,{icon:D.Instagram}),(0,n.jsx)(S.DropdownItemContent,{children:(0,n.jsx)(S.DropdownItemTitle,{children:eZ("instagram")})})]}):null,eL.discordUrl?(0,n.jsxs)(S.DropdownItem,{href:eL.discordUrl,children:[(0,n.jsx)(S.DropdownItemAvatar,{icon:E.Discord}),(0,n.jsx)(S.DropdownItemContent,{children:(0,n.jsx)(S.DropdownItemTitle,{children:eZ("discord")})})]}):null,ez?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(S.DropdownSeparator,{}),(0,n.jsxs)(S.DropdownItem,{onClick:()=>eH(!0),children:[(0,n.jsx)(S.DropdownItemAvatar,{icon:H.Flag}),(0,n.jsx)(S.DropdownItemContent,{children:(0,n.jsx)(S.DropdownItemTitle,{children:eZ("report")})})]})]}):null]}),overrides:{Content:{className:"w-auto"}},children:(0,n.jsx)(A.UnstyledButton,{children:(0,n.jsx)(U.Tooltip,{content:eZ("more"),children:(0,n.jsx)(V.MoreHoriz,{size:20})})})})]}),eP[65]=ez,eP[66]=eB,eP[67]=eL,eP[68]=eR,eP[69]=eO,eP[70]=eZ,eP[71]=ex):ex=eP[71],eP[72]!==eh||eP[73]!==eC||eP[74]!==ex?(ev=(0,n.jsxs)(F.Flex,{className:"w-full min-w-0 flex-col items-start gap-2 md:flex-row md:items-center md:gap-0",children:[eh,eC,ef,ex]}),eP[72]=eh,eP[73]=eC,eP[74]=ex,eP[75]=ev):ev=eP[75],eP[76]!==eL?(ey=(0,n.jsx)(L.Media,{lessThan:"3xl",children:(0,n.jsx)(g.CollectionMetadataChips,{collection:eL,variant:"compact"})}),eP[76]=eL,eP[77]=ey):ey=eP[77];let eY="compact"===eU?"compact":"full";return eP[78]!==eL||eP[79]!==eY?(ew=(0,n.jsx)(L.Media,{greaterThanOrEqual:"3xl",children:(0,n.jsx)(g.CollectionMetadataChips,{collection:eL,variant:eY})}),eP[78]=eL,eP[79]=eY,eP[80]=ew):ew=eP[80],eP[81]!==ey||eP[82]!==ew?(ej=(0,n.jsxs)(L.Media,{greaterThanOrEqual:"md",children:[ey,ew]}),eP[81]=ey,eP[82]=ew,eP[83]=ej):ej=eP[83],eP[84]!==ez||eP[85]!==eL.slug||eP[86]!==eE?(eb=ez?(0,n.jsx)(ep,{entityId:eL.slug,entityType:et.EntityType.COLLECTION,onOpenChange:eH,open:eE}):null,eP[84]=ez,eP[85]=eL.slug,eP[86]=eE,eP[87]=eb):eb=eP[87],eP[88]!==ek||eP[89]!==eR||eP[90]!==eq?(eT=eR?(0,n.jsx)(er.CollectionDescriptionModal,{collection:ek,onOpenChange:eD,open:eq}):null,eP[88]=ek,eP[89]=eR,eP[90]=eq,eP[91]=eT):eT=eP[91],eP[92]!==eL||eP[93]!==eV?(eI=(0,n.jsx)(ed.CollectionShareModal,{collection:eL,onOpenChange:e$,open:eV}),eP[92]=eL,eP[93]=eV,eP[94]=eI):eI=eP[94],eP[95]!==i||eP[96]!==ev||eP[97]!==ej||eP[98]!==eb||eP[99]!==eT||eP[100]!==eI||eP[101]!==c?(eN=(0,n.jsxs)(i,{className:c,children:[ev,ej,eb,eT,eI]}),eP[95]=i,eP[96]=ev,eP[97]=ej,eP[98]=eb,eP[99]=eT,eP[100]=eI,eP[101]=c,eP[102]=eN):eN=eP[102],eP[103]!==o||eP[104]!==eN||eP[105]!==u||eP[106]!==m||eP[107]!==p?(eM=(0,n.jsxs)(o,{className:u,variant:m,children:[p,eN]}),eP[103]=o,eP[104]=eN,eP[105]=u,eP[106]=m,eP[107]=p,eP[108]=eM):eM=eP[108],eP[109]!==eU||eP[110]!==eQ||eP[111]!==eW?(eS="full"===eU&&eQ&&eW&&(0,n.jsx)(K.SocialProofBadge,{className:"mt-1",context:"holders",count:eW.socialCount,notableAccounts:eW.notableCollectors,variant:"full"}),eP[109]=eU,eP[110]=eQ,eP[111]=eW,eP[112]=eS):eS=eP[112],eP[113]!==s||eP[114]!==eM||eP[115]!==eS||eP[116]!==h?(eF=(0,n.jsxs)(s,{className:h,children:[eM,eS]}),eP[113]=s,eP[114]=eM,eP[115]=eS,eP[116]=h,eP[117]=eF):eF=eP[117],eF}var eC=e.i(514308),ef=e.i(705574),ex=e.i(884988);let ev=(0,t.graphql)(`
    fragment CollectionHeaderStats on Collection {
      ...CollectionStats
    }
  `,[ex.CollectionStatsFragment]);function ey(e){let t,l,i,o,s,c,u,m,p,g,h,C,f,x,v,y,w,j,b,T,I,N,S,F,k,B,U=(0,a.c)(50),{collection:A}=e,{headerView:O}=(0,d.useHeroHeaderView)(),{isPreview:E}=(0,en.useCollectionLayout)();U[0]!==A?(t=(0,r.readFragment)(ev,A),U[0]=A,U[1]=t):t=U[1];let H=t;if(U[2]!==H||U[3]!==O){let e=(0,M.classNames)("w-0 !opacity-0","-mr-2.5 sm:-mr-6 md:-mr-8");o=P.FlexCenter,g="overflow-hidden md:gap-8 lg:justify-end",i=L.Media,p="md",l=ef.CollectionStats,u="w-full justify-between md:w-auto",m=H,c={className:(0,M.classNames)(e,"compact"===O&&"xl:mr-auto xl:w-auto xl:!opacity-100")},s=(0,M.classNames)(e,"compact"===O&&"xl:mr-auto xl:w-auto xl:!opacity-100"),U[2]=H,U[3]=O,U[4]=l,U[5]=i,U[6]=o,U[7]=s,U[8]=c,U[9]=u,U[10]=m,U[11]=p,U[12]=g}else l=U[4],i=U[5],o=U[6],s=U[7],c=U[8],u=U[9],m=U[10],p=U[11],g=U[12];U[13]!==s?(h={className:s},U[13]=s,U[14]=h):h=U[14],U[15]===Symbol.for("react.memo_cache_sentinel")?(f={className:"hidden md:flex lg:hidden 3xl:flex"},C={className:"hidden md:flex lg:hidden 2xl:flex"},U[15]=C,U[16]=f):(C=U[15],f=U[16]),U[17]!==c||U[18]!==h?(x={"24h_volume":c,"1d_floor_pcnt":h,listed:f,unique_owners:C},U[17]=c,U[18]=h,U[19]=x):x=U[19];let q="full"===O?"md":"sm";return U[20]===Symbol.for("react.memo_cache_sentinel")?(v=["floor_price","1d_floor_pcnt","top_offer","24h_volume","total_volume","listed","unique_owners"],U[20]=v):v=U[20],U[21]!==l||U[22]!==x||U[23]!==q||U[24]!==u||U[25]!==m?(y=(0,n.jsx)(l,{className:u,collection:m,overrides:x,size:q,stats:v}),U[21]=l,U[22]=x,U[23]=q,U[24]=u,U[25]=m,U[26]=y):y=U[26],U[27]!==i||U[28]!==y||U[29]!==p?(w=(0,n.jsx)(i,{greaterThanOrEqual:p,children:y}),U[27]=i,U[28]=y,U[29]=p,U[30]=w):w=U[30],U[31]===Symbol.for("react.memo_cache_sentinel")?(j={all:{className:"w-30"}},b=["floor_price","1d_floor_pcnt","top_offer"],U[31]=j,U[32]=b):(j=U[31],b=U[32]),U[33]!==H?(T=(0,n.jsx)(ef.CollectionStats,{className:"w-full justify-between md:w-auto",collection:H,overrides:j,stats:b}),U[33]=H,U[34]=T):T=U[34],U[35]===Symbol.for("react.memo_cache_sentinel")?(I={all:{className:"w-30"}},N=["24h_volume","total_volume","unique_owners"],U[35]=I,U[36]=N):(I=U[35],N=U[36]),U[37]!==H?(S=(0,n.jsx)(ef.CollectionStats,{className:"w-full justify-between md:w-auto",collection:H,overrides:I,stats:N}),U[37]=H,U[38]=S):S=U[38],U[39]!==T||U[40]!==S?(F=(0,n.jsx)(L.Media,{lessThan:"md",children:(0,n.jsxs)(_.FlexColumn,{className:"w-full gap-3",children:[T,S]})}),U[39]=T,U[40]=S,U[41]=F):F=U[41],U[42]!==E?(k=!E&&(0,n.jsx)(eC.HeroHeaderViewToggle,{}),U[42]=E,U[43]=k):k=U[43],U[44]!==o||U[45]!==w||U[46]!==F||U[47]!==k||U[48]!==g?(B=(0,n.jsxs)(o,{className:g,children:[w,F,k]}),U[44]=o,U[45]=w,U[46]=F,U[47]=k,U[48]=g,U[49]=B):B=U[49],B}let ew=(0,t.graphql)(`
    fragment CollectionHeaderCompactContent on Collection {
      ...CollectionInfo
      ...CollectionHeaderStats
      ...CollectionMetadataChips
      ...CollectionHeaderLayoutGroup
    }
  `,[eg,ev,h.CollectionMetadataChipsFragment,f.CollectionHeaderLayoutGroupFragment]);function ej(e){let t,l,i,o,s,c,d=(0,a.c)(15),{collection:h}=e;d[0]!==h?(t=(0,r.readFragment)(ew,h),d[0]=h,d[1]=t):t=d[1];let x=t,v=(0,u.useDropStore)(eb);d[2]!==x||d[3]!==v?(l=v===m.DropStatus.MINTING_SOON?(0,n.jsx)(C.CollectionHeaderDropCountdown,{variant:"compact"}):(0,n.jsx)(ey,{collection:x}),d[2]=x,d[3]=v,d[4]=l):l=d[4];let y=l;return d[5]!==x?(i=(0,n.jsx)(eh,{collection:x}),o=(0,n.jsx)(g.CollectionMetadataChips,{className:"mt-4",collection:x,variant:"compact"}),d[5]=x,d[6]=i,d[7]=o):(i=d[6],o=d[7]),d[8]!==y||d[9]!==i||d[10]!==o?(s=(0,n.jsx)(p.HeroHeaderCompactLayout,{info:i,metadataChips:o,stats:y}),d[8]=y,d[9]=i,d[10]=o,d[11]=s):s=d[11],d[12]!==x||d[13]!==s?(c=(0,n.jsx)(f.CollectionHeaderLayoutGroup,{collection:x,children:s}),d[12]=x,d[13]=s,d[14]=c):c=d[14],c}function eb(e){return e.status}var eT=e.i(804635);let eI=(0,t.graphql)(`
    fragment CollectionHeaderFullContent on Collection {
      ...CollectionInfo
      ...CollectionMetadataChips
      ...CollectionHeaderStats
      ...CollectionHeaderLayoutGroup
    }
  `,[f.CollectionHeaderLayoutGroupFragment,eg,h.CollectionMetadataChipsFragment,ev]);function eN(e){let t,l,i,o,s,c,d,p,h=(0,a.c)(21),{collection:x}=e;h[0]!==x?(t=(0,r.readFragment)(eI,x),h[0]=x,h[1]=t):t=h[1];let v=t,y=(0,u.useDropStore)(eM);h[2]!==v||h[3]!==y?(l=y===m.DropStatus.MINTING_SOON?(0,n.jsx)(C.CollectionHeaderDropCountdown,{variant:"full"}):(0,n.jsx)(ey,{collection:v}),h[2]=v,h[3]=y,h[4]=l):l=h[4];let w=l;return h[5]!==v?(i=(0,n.jsx)(eh,{collection:v}),h[5]=v,h[6]=i):i=h[6],h[7]!==v?(o=(0,n.jsx)(L.Media,{lessThan:"lg",children:(0,n.jsx)(g.CollectionMetadataChips,{collection:v,variant:"compact"})}),h[7]=v,h[8]=o):o=h[8],h[9]!==v?(s=(0,n.jsx)(L.Media,{greaterThanOrEqual:"lg",children:(0,n.jsx)(g.CollectionMetadataChips,{collection:v})}),h[9]=v,h[10]=s):s=h[10],h[11]!==o||h[12]!==s?(c=(0,n.jsxs)(n.Fragment,{children:[o,s]}),h[11]=o,h[12]=s,h[13]=c):c=h[13],h[14]!==w||h[15]!==i||h[16]!==c?(d=(0,n.jsx)(eT.HeroHeaderFullLayout,{className:"dark",description:null,info:i,metadataChips:c,showMetadataChipsOnLarge:!1,stats:w}),h[14]=w,h[15]=i,h[16]=c,h[17]=d):d=h[17],h[18]!==v||h[19]!==d?(p=(0,n.jsx)(f.CollectionHeaderLayoutGroup,{collection:v,children:d}),h[18]=v,h[19]=d,h[20]=p):p=h[20],p}function eM(e){return e.status}let eS=(0,t.graphql)(`
    fragment CollectionHeaderContent on Collection {
      ...CollectionHeaderLayoutGroup
      ...CollectionHeaderCompactContent
      ...CollectionHeaderFullContent
    }
  `,[ew,eI,f.CollectionHeaderLayoutGroupFragment]);function eF(e){let t,l,i,o=(0,a.c)(8),{collection:s}=e,{headerView:c}=(0,d.useHeroHeaderView)();o[0]!==s?(t=(0,r.readFragment)(eS,s),o[0]=s,o[1]=t):t=o[1];let u=t;return o[2]!==u||o[3]!==c?(l="compact"===c?(0,n.jsx)(ej,{collection:u}):(0,n.jsx)(eN,{collection:u}),o[2]=u,o[3]=c,o[4]=l):l=o[4],o[5]!==u||o[6]!==l?(i=(0,n.jsx)(f.CollectionHeaderLayoutGroup,{collection:u,children:l}),o[5]=u,o[6]=l,o[7]=i):i=o[7],i}let eP=(0,t.graphql)(`
    fragment CollectionHeader on Collection {
      slug
      ...CollectionHeaderContent
      ...useCollectionBannerMedia
      ...useCollectionBannerMediaFallback
    }
  `,[eS,c.useCollectionBannerMediaFragment,c.useCollectionBannerMediaFallbackFragment]);function e_(e){let t,l,i,o,d,u=(0,a.c)(13);u[0]!==e?({collection:t,...l}=e,u[0]=e,u[1]=t,u[2]=l):(t=u[1],l=u[2]),u[3]!==t?(i=(0,r.readFragment)(eP,t),u[3]=t,u[4]=i):i=u[4];let m=i,p=(0,c.useCollectionBannerMedia)(m),g=(0,c.useCollectionBannerMediaFallback)(m),h="ddust-by-jiwa"===m.slug?"png":void 0,C=p??void 0;return u[5]!==m?(o=(0,n.jsx)(eF,{collection:m}),u[5]=m,u[6]=o):o=u[6],u[7]!==g||u[8]!==l||u[9]!==h||u[10]!==C||u[11]!==o?(d=(0,n.jsx)(s.HeroHeader,{fallbackImageUrl:g,isCollectionBanner:!0,mediaFormat:h,mediaUrl:C,...l,children:o}),u[7]=g,u[8]=l,u[9]=h,u[10]=C,u[11]=o,u[12]=d):d=u[12],d}e.s(["CollectionHeader",()=>e_,"CollectionHeaderFragment",0,eP],722253);var ek=e.i(54987),eL=e.i(85368),eB=e.i(762154),eU=e.i(580430),eA=e.i(345520);let eO=(0,t.graphql)(`
    fragment CollectionOverview on Collection {
      ...MintModule
      category
      slug
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
  `,[eU.NarrativeModuleFragment,eB.FaqModuleFragment,eA.TeamModuleFragment,eL.ContentBlockModuleFragment,ek.MintModuleFragment]);e.s(["CollectionOverviewFragment",0,eO],674853);var eE=e.i(502732),eH=e.i(150093),eq=e.i(960836),eD=e.i(201890);function eV(){let e,t,l,i=(0,a.c)(5),{headerView:o}=(0,d.useHeroHeaderView)(),r="compact"===o?"top-auto bottom-[calc(100%+16px)]":"top-6";return i[0]!==r?(e=(0,M.classNames)("absolute right-6 z-10 gap-2",r),i[0]=r,i[1]=e):e=i[1],i[2]===Symbol.for("react.memo_cache_sentinel")?(t=(0,n.jsx)(eE.Button,{className:(0,M.classNames)(eq.COLLECTION_PREVIEW_INTERACTIVE_ELEMENT_CLASS_NAME),icon:(0,n.jsx)(eH.Edit,{size:20}),onClick:e$,size:"sm",variant:"secondary"}),i[2]=t):t=i[2],i[3]!==e?(l=(0,n.jsx)(F.Flex,{className:e,children:t}),i[3]=e,i[4]=l):l=i[4],l}function e$(){return(0,eD.openBannerSidebar)()}var ez=e.i(629653);function eR(e){return e.heroMedia}function eQ(e){return e.heroMedia}let eW=(0,t.graphql)(`
    fragment CollectionHeaderPreview on Collection {
      ...CollectionHeaderContent
      ...useCollectionBannerMediaFallback
      ...useCollectionBannerMedia
    }
  `,[eS,c.useCollectionBannerMediaFallbackFragment,c.useCollectionBannerMediaFragment]);function eG(e){let t,l,i,o,d,u,m,p,g,h,C,f,x,v,y=(0,a.c)(13);if(y[0]!==e){let{collection:i,ref:o,...n}=e;t=i,l=n,y[0]=e,y[1]=t,y[2]=l}else t=y[1],l=y[2];y[3]!==t?(i=(0,r.readFragment)(eW,t),y[3]=t,y[4]=i):i=y[4];let w=i,j=(p=(0,a.c)(2),g=(0,ez.useOverviewPreviewStore)(eR),(h=(0,L.useIsLessThanMd)()?g.mobileHeroMedia:g.desktopHeroMedia)?(p[0]!==h?(m=function(e){switch(e.mediaType){case"VideoMedia":return e.videoUrl||null;case"ImageMedia":return e.imageUrl||null;case"MuxVideoMedia":return e.muxPlaybackId||null;default:return null}}(h),p[0]=h,p[1]=m):m=p[1],m):null),b=(0,c.useCollectionBannerMedia)(w),T=(f=(0,a.c)(2),x=(0,ez.useOverviewPreviewStore)(eQ),(v=(0,L.useIsLessThanMd)()?x.mobileHeroMedia:x.desktopHeroMedia)?(f[0]!==v?(C=function(e){switch(e.mediaType){case"VideoMedia":case"MuxVideoMedia":return e.thumbnailUrl||null;default:return null}}(v),f[0]=v,f[1]=C):C=f[1],C):null),I=(0,c.useCollectionBannerMediaFallback)(w),N=T||I,M=(j||b)??void 0;return y[5]===Symbol.for("react.memo_cache_sentinel")?(o=(0,n.jsx)(eV,{}),y[5]=o):o=y[5],y[6]!==w?(d=(0,n.jsx)(eF,{collection:w}),y[6]=w,y[7]=d):d=y[7],y[8]!==N||y[9]!==l||y[10]!==M||y[11]!==d?(u=(0,n.jsxs)(s.HeroHeader,{fallbackImageUrl:N,isCollectionBanner:!0,mediaUrl:M,...l,children:[o,d]}),y[8]=N,y[9]=l,y[10]=M,y[11]=d,y[12]=u):u=y[12],u}e.s(["CollectionHeaderPreview",()=>eG,"CollectionHeaderPreviewFragment",0,eW],175519),e.s([],944976);var eZ=e.i(506291),eJ=e.i(62793),eK=e.i(601397);let eY=(0,t.graphql)(`
    fragment CollectionJsonLd on Collection {
      name
      description
      imageUrl
      slug
      isVerified
      externalUrl
      twitterUsername
      instagramUsername
      discordUrl
      chain {
        identifier
      }
      address
      ...collectionUrl
    }
  `,[eJ.collectionUrlFragment]);function eX(e){let t,l,i,o,s,c,d,u,m,p,g,h,C,f,x=(0,a.c)(27),{collection:v}=e;if(x[0]!==v){g=Symbol.for("react.early_return_sentinel");e:{if(!(l=(0,r.readFragment)(eY,v))){g=null;break e}i=[],l.externalUrl&&i.push(l.externalUrl),l.twitterUsername&&i.push(`https://twitter.com/${l.twitterUsername}`),l.instagramUsername&&i.push(`https://instagram.com/${l.instagramUsername}`),l.discordUrl&&i.push(l.discordUrl),t=eK.JsonLD,c="https://schema.org",d="Brand",u=l.name,m=l.description||void 0,p=l.imageUrl||void 0,o=eZ.SITE_URL.origin,s=(0,eJ.getCollectionUrl)(l)}x[0]=v,x[1]=t,x[2]=l,x[3]=i,x[4]=o,x[5]=s,x[6]=c,x[7]=d,x[8]=u,x[9]=m,x[10]=p,x[11]=g}else t=x[1],l=x[2],i=x[3],o=x[4],s=x[5],c=x[6],d=x[7],u=x[8],m=x[9],p=x[10],g=x[11];if(g!==Symbol.for("react.early_return_sentinel"))return g;let y=`${o}${s}`,w=i.length>0?i:void 0,j=l.slug||void 0;return x[12]!==l.isVerified?(h=l.isVerified&&{additionalProperty:{"@type":"PropertyValue",name:"verified",value:"true"}},x[12]=l.isVerified,x[13]=h):h=x[13],x[14]!==w||x[15]!==j||x[16]!==h||x[17]!==c||x[18]!==d||x[19]!==u||x[20]!==m||x[21]!==p||x[22]!==y?(C={"@context":c,"@type":d,name:u,description:m,image:p,url:y,sameAs:w,identifier:j,...h},x[14]=w,x[15]=j,x[16]=h,x[17]=c,x[18]=d,x[19]=u,x[20]=m,x[21]=p,x[22]=y,x[23]=C):C=x[23],x[24]!==t||x[25]!==C?(f=(0,n.jsx)(t,{data:C}),x[24]=t,x[25]=C,x[26]=f):f=x[26],f}e.s(["CollectionJsonLD",()=>eX,"CollectionJsonLdFragment",0,eY],36791);let e0=(0,t.graphql)(`
  fragment CollectionSeoCrawlLinks on Collection {
    chain {
      identifier
    }
  }
`);e.s(["CollectionSeoCrawlLinksFragment",0,e0],55002);let e1=(0,t.graphql)(`
  fragment collectionTitle on CollectionResult {
    ... on Collection {
      name
      floorPrice {
        pricePerItem {
          token {
            unit
            symbol
          }
        }
      }
    }
    __typename
  }
`);function e2(e,t){let l=(0,r.readFragment)(e1,e);return l&&"Collection"===l.__typename?l.floorPrice?.pricePerItem?`${l.name} ${t(l.floorPrice.pricePerItem.token.unit,{suffix:l.floorPrice.pricePerItem.token.symbol})} - Collection | OpenSea`:`${l.name} - Collection | OpenSea`:null}e.s(["collectionTitleFragment",0,e1,"getCollectionTitle",()=>e2],371306);let e3=(0,t.graphql)(`
    query CollectionPageLayoutQuery($collectionSlug: String!) {
      collectionBySlug(slug: $collectionSlug) {
        __typename
        ... on Collection {
          slug
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
        ...CollectionDropProvider_collection
        ...CollectionHeader
        ...CollectionHeaderPreview
        ...CollectionOverview
        ...collectionTitle
      }
      dropBySlug(slug: $collectionSlug) {
        ...CollectionDropProvider_drop
      }
    }
  `,[eP,eW,eO,e1,o.CollectionDropProviderCollectionFragment,o.CollectionDropProviderDropFragment,i.CollectionNavigationFragment,eY,e0]);e.s(["COLLECTION_PAGE_LAYOUT_QUERY",0,e3,"prefetchCollectionPageLayout",0,(e,t)=>{(0,l.prefetch)(t,e3,{collectionSlug:e})}],101960)},521096,622395,913588,266317,601037,505318,246043,e=>{"use strict";var t=e.i(885530),l=e.i(504849);let i=(0,t.graphql)(`
  fragment useSweepCollection on Collection {
    contracts {
      chain {
        identifier
      }
    }
  }
`);e.s(["useSweepCollectionFragment",0,i],622395);var o=e.i(700625);let n=(0,t.graphql)(`
    fragment CollectionItemsBuyActions on Collection {
      slug
      ...useSweepCollection
      ...CollectionItemsMakeOfferButton
    }
  `,[i,o.CollectionItemsMakeOfferButtonFragment]);e.s(["CollectionItemsBuyActionsFragment",0,n],913588);let a=(0,t.graphql)(`
    fragment CollectionItemsActions on Collection {
      ...CollectionItemsBuyActions
    }
  `,[n]);e.s(["CollectionItemsActionsFragment",0,a],266317);var r=e.i(641749);let s=(0,t.graphql)(`
    fragment MobilePurchaseActions on Collection {
      traitOffersEnabled
      ...useSweepCollection
      ...useCollectionOffers
    }
  `,[i,r.useCollectionOffersFragment]);e.s(["MobilePurchaseActionsFragment",0,s],601037);let c=(0,t.graphql)(`
    fragment MobileCollectionItemsActions on Collection {
      ...MobilePurchaseActions
      slug
    }
  `,[s]);e.s(["MobileCollectionItemsActionsFragment",0,c],505318);let d=(0,t.graphql)(`
    fragment CollectionItemsActionBarBase on Collection {
      slug
      flags {
        isBulkActionEnabled
      }
      ...CollectionItemsActions
      ...MobileCollectionItemsActions
    }
  `,[a,c]),u=(0,t.graphql)(`
    query CollectionItemsActionBarQuery($collectionSlug: String!) {
      collectionBySlug(slug: $collectionSlug) {
        __typename
        ... on Collection {
          id
          enforcement {
            isDisabled
          }
          flags {
            isBulkActionEnabled
          }
          ...CollectionItemsActionBarBase
        }
        ... on DelistedCollection {
          id
        }
        ... on BlacklistedCollection {
          id
        }
      }
    }
  `,[d]);e.s(["CollectionItemsActionBarBaseFragment",0,d,"CollectionItemsActionBarQuery",0,u,"prefetchCollectionItemsActionBarQuery",0,(e,t)=>{(0,l.prefetch)(t,u,{collectionSlug:e})}],521096);let m=(0,t.graphql)(`
  query CollectionItemsCountQuery(
    $collectionSlug: String!
    $filter: CollectionItemsFilter
  ) {
    collectionItemsCount(collectionSlug: $collectionSlug, filter: $filter) {
      count
      hasMore
    }
  }
`),p=(0,t.graphql)(`
  subscription CollectionItemsCountSubscription($slug: String!) {
    collectionBySlug(slug: $slug) {
      __typename
      ... on Collection {
        id
        stats {
          totalSupply
          uniqueItemCount
        }
      }
    }
  }
`),g=(0,t.graphql)(`
  subscription ListedCollectionItemsCountSubscription($slug: String!) {
    collectionBySlug(slug: $slug) {
      __typename
      ... on Collection {
        id
        stats {
          listedItemCount
        }
      }
    }
  }
`),h=(0,t.graphql)(`
  subscription NotListedCollectionItemsCountSubscription($slug: String!) {
    collectionBySlug(slug: $slug) {
      __typename
      ... on Collection {
        id
        stats {
          uniqueItemCount
          listedItemCount
        }
      }
    }
  }
`);e.s(["CollectionItemsCountQuery",0,m,"CollectionItemsCountSubscription",0,p,"ListedCollectionItemsCountSubscription",0,g,"NotListedCollectionItemsCountSubscription",0,h,"prefetchCollectionItemsCountQuery",0,(e,t)=>{(0,l.prefetch)(t,m,{collectionSlug:e})}],246043)},231054,850980,165553,952826,554454,922680,e=>{"use strict";var t=e.i(942332),l=e.i(7683),i=e.i(866313),o=e.i(873588),n=e.i(692632),a=e.i(6447),r=e.i(120006);let s=(0,n.range)(r.PAGE_SIZE).map(()=>void 0);function c(){let e,n=(0,i.c)(2),{size:r}=(0,a.useItemView)();return n[0]!==r?(e=(0,l.jsx)(o.Grid,{className:"pb-4",itemKey:d,items:s,renderItem:t.CollectionItemsCard,size:r}),n[0]=r,n[1]=e):e=n[1],e}function d(e,t){return String(t)}e.s(["CollectionItemsGridSkeleton",()=>c],850980),e.s([],231054);var u=e.i(747998),m=e.i(646426),p=e.i(47667),g=e.i(190627),h=e.i(885530),C=e.i(455480),f=e.i(722155),x=e.i(407262),v=e.i(601056),y=e.i(519078),w=e.i(976381),j=e.i(437153),b=e.i(39771),T=e.i(908097),I=e.i(738480),N=e.i(516170),M=e.i(747460),S=e.i(81303),F=e.i(28067),P=e.i(365739),_=e.i(984335),k=e.i(562299),L=e.i(347352),B=e.i(136419),U=e.i(745841),A=e.i(214867),O=e.i(692617),E=e.i(723767),H=e.i(543013),q=e.i(957618),D=e.i(630208),V=e.i(976551);e.i(500598);var $=e.i(207225),z=e.i(661331);e.i(106969);var R=e.i(101304),Q=e.i(861060),W=e.i(684676),G=e.i(502732),Z=e.i(967593),J=e.i(861316),K=e.i(914716),Y=e.i(846428);let X=(0,h.graphql)(`
    fragment BuyItemTableButton on Item {
      bestListing {
        pricePerItem {
          ...TokenPrice
        }
        marketplace {
          identifier
        }
        maker {
          address
        }
      }
      ...useBuyItems
    }
  `,[Y.useBuyItemsFragment,g.TokenPriceFragment]);function ee(e){let t,o,n,r,s,c=(0,i.c)(9);c[0]!==e?({item:t,size:n,display:r,...o}=e,c[0]=e,c[1]=t,c[2]=o,c[3]=n,c[4]=r):(t=c[1],o=c[2],n=c[3],r=c[4]);let d=void 0===n?"xs":n,u=void 0===r?"standard":r,m=(0,C.readFragment)(X,t),g=(0,B.useContextSelector)(A.CollectionSettingsContext,et),{disabledReason:h,disabled:f,buyItems:x}=(0,K.useBuyItems)([{...m,quantity:1}]),v=(0,$.useAddress)(),{itemView:y}=(0,a.useItemView)();if(!m.bestListing){let e;return c[5]!==u?(e=(0,l.jsx)(p.TokenPrice,{display:u,price:null}),c[5]=u,c[6]=e):e=c[6],e}let w=(0,l.jsx)(p.TokenPrice,{className:g?"gap-1.5":"",display:u,marketplace:g?m.bestListing.marketplace?.identifier:void 0,marketplaceIconSize:"tableCompact"===y?12.5:15,price:m.bestListing.pricePerItem});return(0,J.isAddressEqual)(m.bestListing.maker.address,v)?w:(c[7]!==x?(s=e=>{e.preventDefault(),e.stopPropagation(),x()},c[7]=x,c[8]=s):s=c[8],(0,l.jsx)(Z.Tooltip,{content:h,disabled:!f,children:(0,l.jsx)("span",{className:"max-w-full",children:(0,l.jsx)(G.Button,{className:"max-w-full font-normal",disabled:f,onClick:s,size:d,variant:"secondary",...o,children:w})})}))}function et(e){return e.showMarketplaceLogos}e.s(["BuyItemTableButton",()=>ee,"BuyItemTableButtonFragment",0,X],165553),e.i(661049);var el=e.i(493473),ei=e.i(190519),eo=e.i(630945),en=e.i(9300),ea=e.i(111861),er=e.i(743342),es=e.i(364903),ec=e.i(310578);let ed={checkbox:"w-6",item:"z-[1] w-[120px] grow-[2] pr-2",price:"w-[130px] grow",offer:"w-[130px] grow",last:"w-[110px] grow",rarity:"w-[70px] grow",owner:"w-[70px] grow",listed:"w-[70px] grow"};function eu(){let e,t,o,n,a,r,s,c,d,u,m,p,g,h,C,f=(0,i.c)(30),{size:x}=(0,_.useTable)(),{image:b}=(0,M.tableRowSizeVariants)({size:x}),{isSideModuleOpen:T}=(0,O.useSideModule)(),I=(0,B.useContextSelector)(A.CollectionSettingsContext,em),N=F.TableRow;f[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,l.jsx)(S.TableCell,{className:ed.checkbox,children:(0,l.jsx)(w.Checkbox,{"aria-hidden":!0,disabled:!0})}),f[0]=e):e=f[0];let P=S.TableCell,k=v.Item,L=v.ItemAvatar,U=b();return f[1]===Symbol.for("react.memo_cache_sentinel")?(t=(0,l.jsx)(ec.SkeletonBlock,{className:"rounded-lg"}),f[1]=t):t=f[1],f[2]!==L||f[3]!==U?(o=(0,l.jsx)(L,{className:U,children:t}),f[2]=L,f[3]=U,f[4]=o):o=f[4],f[5]===Symbol.for("react.memo_cache_sentinel")?(n=(0,l.jsx)(y.ItemContent,{children:(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"})}),f[5]=n):n=f[5],f[6]!==k||f[7]!==o?(a=(0,l.jsxs)(k,{variant:"unstyled",children:[o,n]}),f[6]=k,f[7]=o,f[8]=a):a=f[8],f[9]!==P||f[10]!==ed.item||f[11]!==a?(r=(0,l.jsx)(P,{className:ed.item,children:a}),f[9]=P,f[10]=ed.item,f[11]=a,f[12]=r):r=f[12],f[13]!==I?(s=I?(0,l.jsx)(S.TableCell,{align:"right",className:ed.rarity,children:(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"})}):null,f[13]=I,f[14]=s):s=f[14],f[15]===Symbol.for("react.memo_cache_sentinel")?(c=(0,l.jsx)(S.TableCell,{align:"right",className:ed.price,children:(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"})}),f[15]=c):c=f[15],f[16]===Symbol.for("react.memo_cache_sentinel")?(d=(0,l.jsx)(S.TableCell,{align:"right",className:ed.offer,children:(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"})}),f[16]=d):d=f[16],f[17]!==T?(u=(0,j.classNames)(ed.last,{hidden:T}),f[17]=T,f[18]=u):u=f[18],f[19]===Symbol.for("react.memo_cache_sentinel")?(m=(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"}),f[19]=m):m=f[19],f[20]!==u?(p=(0,l.jsx)(S.TableCell,{align:"right",className:u,children:m}),f[20]=u,f[21]=p):p=f[21],f[22]===Symbol.for("react.memo_cache_sentinel")?(g=(0,l.jsx)(S.TableCell,{align:"right",className:ed.owner,children:(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"})}),f[22]=g):g=f[22],f[23]===Symbol.for("react.memo_cache_sentinel")?(h=(0,l.jsx)(S.TableCell,{align:"right",className:ed.listed,children:(0,l.jsx)(ec.SkeletonLine,{className:"w-1/2"})}),f[23]=h):h=f[23],f[24]!==N||f[25]!==e||f[26]!==p||f[27]!==r||f[28]!==s?(C=(0,l.jsxs)(N,{children:[e,r,s,c,d,p,g,h]}),f[24]=N,f[25]=e,f[26]=p,f[27]=r,f[28]=s,f[29]=C):C=f[29],C}function em(e){return e.showRarity}e.s(["COLLECTION_ITEMS_TABLE_COLUMN_CLASSNAMES",0,ed],952826);let ep=(0,h.graphql)(`
    fragment CollectionItemsTableRowFragment on Item {
      id
      name
      totalSupply
      isFungible
      ...ItemAvatar
      owner {
        ...AccountLockup
        ...ProfilePreviewTooltip
      }
      bestListing {
        startTime
        pricePerItem {
          ...TokenPrice
        }
      }
      ...bestItemOffer
      rarity {
        rank
        category
      }
      lastSale {
        ...TokenPrice
      }
      enforcement {
        isCompromised
      }
      ...ItemLink
      ...BuyItemTableButton
      ...EnforcementBadge
      ...RarityTooltip
      ...ItemPreviewTooltip
      ...BulkActionsDisabledTooltip
      ...ItemOwnedQuantity
    }
  `,[er.itemUrlFragment,g.TokenPriceFragment,m.AccountLockupFragment,X,Q.ItemAvatarFragment,D.EnforcementBadgeFragment,ei.ItemLinkFragment,ea.RarityTooltipFragment,en.ItemPreviewTooltipFragment,W.BulkActionsDisabledTooltipFragment,z.bestItemOfferFragment,H.ProfilePreviewTooltipFragment,er.ItemOwnedQuantityFragment]);function eg(e){let t,o,n,a,r,s,c,d,m,g,h,H,D,Q,G,Z,J,K,Y,X,et,ei,en,ec=(0,i.c)(77),{item:em,index:eg,context:ew}=e,ej=(0,C.readFragment)(ep,em),{statuses:eb}=(0,V.useStatusQueryParam)();ec[0]!==eb?(t=eb.includes("ownedByYou"),ec[0]=eb,ec[1]=t):t=ec[1];let eT=t,eI=(0,er.getItemOwnedQuantity)(ej),eN=(0,B.useContextSelector)(A.CollectionSettingsContext,ey),eM=(0,$.useAddress)(),eS=(0,L.useLinkedAccounts)(),{size:eF}=(0,_.useTable)(),[eP,e_,ek,eL]=(0,es.useCollectionItemsSelection)(ev);ec[2]!==eP?(o=eP.map(ex),ec[2]=eP,ec[3]=o):o=ec[3],ec[4]!==ek||ec[5]!==e_||ec[6]!==o?(n={items:o,selectedItems:e_,selectItem:ek},ec[4]=ek,ec[5]=e_,ec[6]=o,ec[7]=n):n=ec[7];let{handleOnClick:eB}=(0,k.useSelectItemMouseShortcuts)(n),{isSideModuleOpen:eU}=(0,O.useSideModule)();if(!ej){let e;return ec[8]===Symbol.for("react.memo_cache_sentinel")?(e=(0,l.jsx)(eu,{}),ec[8]=e):e=ec[8],e}let eA=ej.owner,{image:eO,text:eE}=(0,M.tableRowSizeVariants)({size:eF}),eH=ej.bestListing?.startTime?new Date(ej.bestListing.startTime):null,eq=e_.has(ej.id),eD=!(eq||eL(ej.id)),eV=(0,z.getItemBestOffer)(ej),e$=ej.id;ec[9]!==eD||ec[10]!==eB||ec[11]!==eg?(a=e=>{eD||eB(e,eg)},ec[9]=eD,ec[10]=eB,ec[11]=eg,ec[12]=a):a=ec[12];let ez=ej.name??ej.id;ec[13]!==eD||ec[14]!==eq||ec[15]!==ez?(r=(0,l.jsx)(w.Checkbox,{"aria-label":ez,checked:eq,disabled:eD}),ec[13]=eD,ec[14]=eq,ec[15]=ez,ec[16]=r):r=ec[16],ec[17]!==eD||ec[18]!==ej||ec[19]!==r?(s=(0,l.jsx)(S.TableCell,{className:ed.checkbox,children:(0,l.jsx)(W.BulkActionsDisabledTooltip,{disabled:eD,item:ej,children:r})}),ec[17]=eD,ec[18]=ej,ec[19]=r,ec[20]=s):s=ec[20];let eR=y.ItemContent,eQ=eo.ItemPreviewTooltip,eW=b.FlexCenter,eG=P.Truncate,eZ=el.ItemLink,eJ=x.HandoffButton,eK=y.ItemTitle,eY=(0,j.classNames)(eE(),"font-normal");return ec[21]!==eK||ec[22]!==ej.name||ec[23]!==eY?(c=(0,l.jsx)(eK,{className:eY,"data-testid":"ItemName",children:ej.name}),ec[21]=eK,ec[22]=ej.name,ec[23]=eY,ec[24]=c):c=ec[24],ec[25]!==eJ||ec[26]!==c?(d=(0,l.jsx)(eJ,{children:c}),ec[25]=eJ,ec[26]=c,ec[27]=d):d=ec[27],ec[28]!==eZ||ec[29]!==ej||ec[30]!==eC||ec[31]!==d?(m=(0,l.jsx)(eZ,{item:ej,onClick:eC,children:d}),ec[28]=eZ,ec[29]=ej,ec[30]=eC,ec[31]=d,ec[32]=m):m=ec[32],ec[33]!==eG||ec[34]!==m?(g=(0,l.jsx)(eG,{children:m}),ec[33]=eG,ec[34]=m,ec[35]=g):g=ec[35],ec[36]!==ej.isFungible||ec[37]!==ej.totalSupply||ec[38]!==eI||ec[39]!==eT?(h=ej.isFungible?(0,l.jsx)(N.QuantityBadge,{children:eT?(0,l.jsx)(I.NumberDisplay,{display:"quantity",value:eI}):(0,l.jsx)(I.NumberDisplay,{display:"quantity",value:ej.totalSupply})}):null,ec[36]=ej.isFungible,ec[37]=ej.totalSupply,ec[38]=eI,ec[39]=eT,ec[40]=h):h=ec[40],ec[41]!==eW||ec[42]!==g||ec[43]!==h?(H=(0,l.jsxs)(eW,{className:"w-full gap-2",children:[g,h]}),ec[41]=eW,ec[42]=g,ec[43]=h,ec[44]=H):H=ec[44],ec[45]!==eQ||ec[46]!==ej||ec[47]!==H?(D=(0,l.jsx)(eQ,{item:ej,children:H}),ec[45]=eQ,ec[46]=ej,ec[47]=H,ec[48]=D):D=ec[48],ec[49]!==eR||ec[50]!==D?(Q=(0,l.jsx)(eR,{children:D}),ec[49]=eR,ec[50]=D,ec[51]=Q):Q=ec[51],ec[52]!==ej||ec[53]!==eN?(G=eN?(0,l.jsx)(S.TableCell,{align:"right",className:ed.rarity,children:(0,l.jsx)(ea.RarityTooltip,{item:ej,children:(0,l.jsx)(I.NumberDisplay,{display:"full",prefix:"#",value:ej.rarity?.rank})})}):null,ec[52]=ej,ec[53]=eN,ec[54]=G):G=ec[54],ec[55]!==ej||ec[56]!==eF?(Z=(0,l.jsx)(S.TableCell,{align:"right",className:ed.price,children:ej.enforcement.isCompromised?(0,l.jsx)(I.NumberDisplay,{display:"full"}):(0,l.jsx)(q.EnforcementBadge,{entity:ej,renderWhenNotEnforced:(0,l.jsx)(ee,{item:ej,size:"md"===eF?"sm":"xs"})})}),ec[55]=ej,ec[56]=eF,ec[57]=Z):Z=ec[57],ec[58]!==eV?.pricePerItem||ec[59]!==ej?(J=(0,l.jsx)(S.TableCell,{align:"right",className:ed.offer,children:ej.enforcement.isCompromised?(0,l.jsx)(I.NumberDisplay,{display:"full"}):(0,l.jsx)(q.EnforcementBadge,{entity:ej,renderWhenNotEnforced:(0,l.jsx)(p.TokenPrice,{price:eV?.pricePerItem})})}),ec[58]=eV?.pricePerItem,ec[59]=ej,ec[60]=J):J=ec[60],ec[61]!==eU?(K=(0,j.classNames)(ed.last,{hidden:eU}),ec[61]=eU,ec[62]=K):K=ec[62],ec[63]!==ej.lastSale?(Y=(0,l.jsx)(p.TokenPrice,{price:ej.lastSale}),ec[63]=ej.lastSale,ec[64]=Y):Y=ec[64],ec[65]!==K||ec[66]!==Y?(X=(0,l.jsx)(S.TableCell,{align:"right",className:K,children:Y}),ec[65]=K,ec[66]=Y,ec[67]=X):X=ec[67],ec[68]!==eM||ec[69]!==eS||ec[70]!==eA||ec[71]!==eF?(et=eA?(0,l.jsx)(E.ProfilePreviewTooltip,{profile:eA,children:(0,l.jsx)(u.AccountLockup,{account:eA,addressDisplay:"compact",className:"justify-end",connectedAddress:eM??null,connectedAddresses:eS?.map(eh),isTable:!0,size:eF,children:(0,l.jsx)(u.AccountLockupTitle,{})})}):f.EM_DASH,ec[68]=eM,ec[69]=eS,ec[70]=eA,ec[71]=eF,ec[72]=et):et=ec[72],ec[73]!==et?(ei=(0,l.jsx)(S.TableCell,{align:"right",className:ed.owner,children:et}),ec[73]=et,ec[74]=ei):ei=ec[74],ec[75]!==eH?(en=(0,l.jsx)(S.TableCell,{align:"right",className:ed.listed,children:(0,l.jsx)(U.LiveTimestamp,{date:eH})}),ec[75]=eH,ec[76]=en):en=ec[76],(0,l.jsx)(T.LiveAnimation,{itemKey:e$,liveAddedAt:ew?.itemsLiveAddedAt.get(ej.id),variant:"table",children:(0,l.jsxs)(F.TableRow,{interactive:!eD,onClick:a,children:[s,(0,l.jsx)(S.TableCell,{className:ed.item,children:(0,l.jsxs)(v.Item,{className:"w-auto max-w-full",variant:"unstyled",children:[(0,l.jsx)(el.ItemLink,{item:ej,onClick:ef,children:(0,l.jsx)(x.HandoffButton,{children:(0,l.jsx)(R.ItemAvatar,{className:eO(),item:ej,size:M.TABLE_SIZES[eF].image})})}),Q]})}),G,Z,J,X,ei,en]})})}function eh(e){return e.address}function eC(e){e.stopPropagation()}function ef(e){e.stopPropagation()}function ex(e){let{id:t}=e;return{id:t}}function ev(e){return[e.allItems,e.selectedItems,e.selectItem,e.isItemSelectable]}function ey(e){return e.showRarity}e.s(["CollectionItemsTableRow",()=>eg,"CollectionItemsTableRowFragment",0,ep],554454),e.s([],922680)},357486,e=>{"use strict";var t=e.i(885530),l=e.i(504849),i=e.i(743342);e.i(231054);var o=e.i(942332);e.i(922680);var n=e.i(554454),a=e.i(312021),r=e.i(230735),s=e.i(120006);let c=(0,t.graphql)(`
    query CollectionItemsListQuery(
      $cursor: String
      $sort: CollectionItemsSort!
      $filter: CollectionItemsFilter
      $collectionSlug: String!
      $limit: Int!
      $offset: Int
      $address: Address
      $accountId: String
    ) {
      collectionItems(
        collectionSlug: $collectionSlug
        cursor: $cursor
        sort: $sort
        filter: $filter
        limit: $limit
        offset: $offset
      ) {
        items {
          id
          ...CollectionItemsCardFragment
          ...CollectionItemsTableRowFragment
          rarity {
            rank
          }
          createdAt
          lastSaleAt
          lastTransferAt
          ...ItemOwnedQuantity
          enforcement {
            isDelisted
            isCompromised
          }
          bestListing {
            pricePerItem {
              token {
                unit
              }
            }
            startTime
            marketplace {
              identifier
            }
          }
          bestOffer {
            pricePerItem {
              usd
              token {
                unit
              }
            }
          }
          lastSale {
            native {
              unit
            }
          }
          version
          ...collectionItemsPurchaseSelection
          ...collectionItemsSellSelection
        }
        nextPageCursor
      }
    }
  `,[o.CollectionItemsCardFragment,n.CollectionItemsTableRowFragment,a.collectionItemsPurchaseSelectionFragment,r.collectionItemsSellSelectionFragment,i.ItemOwnedQuantityFragment]);e.s(["CollectionItemsListQuery",0,c,"prefetchCollectionItemsListQuery",0,(e,t)=>{(0,l.prefetch)(t,c,{limit:s.PAGE_SIZE,sort:{by:"PRICE",direction:"ASC"},collectionSlug:e})}])}]);

//# debugId=e4cc7afe-44a0-ec84-5f83-da9f110c8b08
//# sourceMappingURL=36f915c14369cffc.js.map