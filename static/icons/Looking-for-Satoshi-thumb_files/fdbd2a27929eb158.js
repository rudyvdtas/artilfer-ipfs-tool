;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="a2e80c14-5b44-0150-5dea-bab92e8827e4")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,703979,e=>{"use strict";var r=e.i(885530);let t=(0,r.graphql)(`
  fragment CurrencyPageLayoutProviderCurrency on CurrencyV2 {
    contractAddress
    chainIdentifier
  }
`),n=(0,r.graphql)(`
    fragment CurrencyPageLayoutProvider on CurrencyV2 {
      ...CurrencyPageLayoutProviderCurrency
      isNative
      tokenGroup {
        primaryCurrency {
          ...CurrencyPageLayoutProviderCurrency
        }
        currencies {
          ...CurrencyPageLayoutProviderCurrency
        }
      }
    }
  `,[t]);e.s(["CurrencyPageLayoutProviderCurrencyFragment",0,t,"CurrencyPageLayoutProviderFragment",0,n])},29093,e=>{"use strict";var r=e.i(7683),t=e.i(866313),n=e.i(10340),a=e.i(534763),i=e.i(410338);function c(e){let c,s=(0,t.c)(4),{isFilled:o,loading:u,size:d}=e,l=void 0===d?16:d;return s[0]!==o||s[1]!==u||s[2]!==l?(c=o?(0,r.jsx)(i.StarFilled,{fill:"warning",size:l}):(0,r.jsx)(a.Star,{className:(0,n.disabledVariants)({disabled:u}),size:l}),s[0]=o,s[1]=u,s[2]=l,s[3]=c):c=s[3],c}e.s(["CurrencyWatchlistIcon",()=>c])},751923,e=>{"use strict";var r=e.i(885530);e.i(232947);var t=e.i(859898);let n=(0,r.graphql)(`
    fragment useDefaultSwapCounterpartCurrency on CurrencyV2 {
      contractAddress
      restrictSwapsToSameChain
      restrictSwapsToNativeTokens
      chainIdentifier
      chain {
        swapsSupported
      }
      chainIdentifier
      ...currencyIdentifier
    }
  `,[t.currencyIdentifierFragment]),a=(0,r.graphql)(`
    fragment CurrencySwapModule on CurrencyV2 {
      contractAddress
      symbol
      decimals
      imageUrl
      usdPrice
      isSwapDisabled
      chain {
        identifier
        swapsSupported
      }
      tokenGroup {
        perpetuals {
          symbol
        }
      }
      ...currencyIdentifier
      ...useDefaultSwapCounterpartCurrency
    }
  `,[t.currencyIdentifierFragment,n]);e.s(["CurrencySwapModuleFragment",0,a],751923)},111908,e=>{"use strict";var r=e.i(885530),t=e.i(455480),n=e.i(165102);let a=(0,r.graphql)(`
    fragment useCurrencyBannerMedia on CurrencyMetadata {
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
  `,[]),i=(0,r.graphql)(`
    fragment useCurrencyBannerMediaFallback on CurrencyMetadata {
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
  `,[]);e.s(["useCurrencyBannerMedia",0,e=>{let r=(0,t.readFragment)(a,e),i=(0,n.useIsLessThanMd)()?r?.hero?.mobileHeroMedia:r?.hero?.desktopHeroMedia,c=null;switch(i?.__typename){case"VideoMedia":c=i.videoUrl;break;case"ImageMedia":c=i.imageUrl;break;case"MuxVideoMedia":c=i.muxPlaybackId;break;default:c=null}return c},"useCurrencyBannerMediaFallback",0,e=>{let r=(0,t.readFragment)(i,e),a=(0,n.useIsLessThanMd)()?r?.hero?.mobileHeroMedia:r?.hero?.desktopHeroMedia,c=null;switch(a?.__typename){case"VideoMedia":case"MuxVideoMedia":c=a.thumbnailUrl;break;default:c=null}return c},"useCurrencyBannerMediaFallbackFragment",0,i,"useCurrencyBannerMediaFragment",0,a])},19001,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  fragment useToggleWatchToken on CurrencyV2 {
    contractAddress
    chainIdentifier
    name
    symbol
  }
`);e.s(["useToggleWatchTokenFragment",0,r])},95581,e=>{"use strict";var r=e.i(885530),t=e.i(19001);let n=(0,r.graphql)(`
  fragment CurrencyWatchlistButton on CurrencyV2 {
    ...useToggleWatchToken
  }
`,[t.useToggleWatchTokenFragment]);e.s(["CurrencyWatchlistButtonFragment",0,n])},720861,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  fragment CurrencyStats on CurrencyV2 {
    holdersCount
    tokenGroup {
      currencies {
        chainIdentifier
      }
      stats {
        marketCapUsd
        totalSupply
        rollingStats {
          volume1d
          priceChange1d
          volume7d
          priceChange7d
        }
      }
    }
    stats {
      marketCapUsd
      fdvUsd
      totalSupply
      oneDay {
        volume
        priceChange
      }
      sevenDay {
        volume
        priceChange
      }
    }
  }
`);e.s(["CurrencyStatsFragment",0,r])},446602,353936,e=>{"use strict";var r=e.i(682388),t=e.i(286423),n=e.i(20904),a=e.i(511518);function i(e){return Math.trunc(e*a.secondsInHour)}e.s(["hoursToSeconds",()=>i],353936);var c=e.i(750040),s=e.i(119470),o=e.i(107401),u=e.i(239573);function d(e,r,t){return(0,u.addMinutes)(e,-r,t)}var l=e.i(84108);function m(e,r,t){return(0,l.addYears)(e,-r,t)}function C(e,t){let i=new Date,c=t?.isLiveTimeframeEnabled??!1,s=(0,n.differenceInSeconds)(i,e);return s<=Math.trunc(30*a.secondsInMinute)&&c?"FIVE_MINUTE":s<=(0,r.timeframeToSeconds)("ONE_HOUR")?"ONE_HOUR":s<=(0,r.timeframeToSeconds)("ONE_DAY")?"ONE_DAY":s<=(0,r.timeframeToSeconds)("SEVEN_DAYS")?"SEVEN_DAYS":s<=(0,r.timeframeToSeconds)("THIRTY_DAYS")?"THIRTY_DAYS":s<=(0,r.timeframeToSeconds)("ONE_YEAR")?"ONE_YEAR":"ALL_TIME"}function h(e,r=new Date){switch(e){case"ONE_MINUTE":return d(r,1);case"FIVE_MINUTE":return d(r,5);case"FIFTEEN_MINUTE":return d(r,15);case"ONE_HOUR":return(0,o.addHours)(r,-1,void 0);case"ONE_DAY":return(0,s.subDays)(r,1);case"SEVEN_DAYS":return(0,s.subDays)(r,7);case"THIRTY_DAYS":return(0,s.subDays)(r,30);case"ONE_YEAR":return m(r,1);case"ALL_TIME":return m(r,5)}}function g(e,r,n=new Date){let a=r?new Date(r):null,i=h(e,n);return{startTime:a?(0,c.max)([i,a]):i,endTime:(0,t.addSeconds)(n,1)}}let y=i(24),T=7*y;function f(e,r=new Date){if(!e)return"ONE_DAY";let t=new Date(e);if(Number.isNaN(t.getTime()))return"ONE_DAY";let a=(0,n.differenceInSeconds)(r,t);return a<0?"ONE_DAY":a<y?"ONE_HOUR":a<T?"ONE_DAY":"SEVEN_DAYS"}e.s(["getDefaultTokenTimeframe",()=>f,"getStartTime",()=>h,"getTimeRangeForTimeframe",()=>g,"getTimeframe",()=>C],446602)},119470,e=>{"use strict";var r=e.i(598279);function t(e,t,n){return(0,r.addDays)(e,-t,n)}e.s(["subDays",()=>t])},555437,e=>{"use strict";var r=e.i(487122),t=e.i(516467);function n(e,n,a){return(0,r.constructFrom)(a?.in||e,+(0,t.toDate)(e)+n)}e.s(["addMilliseconds",()=>n])},750040,e=>{"use strict";var r=e.i(487122),t=e.i(516467);function n(e,n){let a,i=n?.in;return e.forEach(e=>{i||"object"!=typeof e||(i=r.constructFrom.bind(null,e));let n=(0,t.toDate)(e,i);(!a||a<n||isNaN(+n))&&(a=n)}),(0,r.constructFrom)(i,a||NaN)}e.s(["max",()=>n])},744797,e=>{"use strict";var r=e.i(487122),t=e.i(516467);function n(e,n){let a,i=n?.in;return e.forEach(e=>{i||"object"!=typeof e||(i=r.constructFrom.bind(null,e));let n=(0,t.toDate)(e,i);(!a||a>n||isNaN(+n))&&(a=n)}),(0,r.constructFrom)(i,a||NaN)}e.s(["min",()=>n])},84108,e=>{"use strict";var r=e.i(495794);function t(e,t,n){return(0,r.addMonths)(e,12*t,n)}e.s(["addYears",()=>t])},239573,e=>{"use strict";var r=e.i(511518),t=e.i(516467);function n(e,n,a){let i=(0,t.toDate)(e,a?.in);return i.setTime(i.getTime()+n*r.millisecondsInMinute),i}e.s(["addMinutes",()=>n])},107401,e=>{"use strict";var r=e.i(555437),t=e.i(511518);function n(e,n,a){return(0,r.addMilliseconds)(e,n*t.millisecondsInHour,a)}e.s(["addHours",()=>n])},314346,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  fragment CurrencyChartColor on CurrencyV2 {
    imageUrl
  }
`);e.s(["CurrencyChartColorFragment",0,r])},286423,e=>{"use strict";var r=e.i(555437);function t(e,t,n){return(0,r.addMilliseconds)(e,1e3*t,n)}e.s(["addSeconds",()=>t])},916660,540173,682388,e=>{"use strict";var r=e.i(885530);let t=(0,r.graphql)(`
    fragment CurrencyLineChart on CurrencyV2 {
      contractAddress
      chainIdentifier
      isNative
      isStablecoin
      usdPrice
      tokenGroup {
        currencies {
          contractAddress
          chainIdentifier
          usdPrice
        }
      }
    }
  `,[]);e.s(["CurrencyLineChartFragment",0,t],916660);let n=(0,r.graphql)(`
  query CurrencyLineChartQuery(
    $contractIdentifier: ContractIdentifierInput!
    $startTime: DateTime!
    $endTime: DateTime!
    $bucketSize: CandleBucketSize!
  ) {
    currencyPriceHistory2(
      contract: $contractIdentifier
      startTime: $startTime
      endTime: $endTime
      bucketSize: $bucketSize
    ) {
      time
      price {
        usd
      }
    }
  }
`);e.s(["CurrencyLineChartQuery",0,n],540173),e.s(["candleBucketSizeToSeconds",0,e=>{switch(e){case"ONE_SECOND":return 1;case"ONE_MINUTE":return 60;case"FIVE_MINUTES":return 300;case"FIFTEEN_MINUTES":return 900;case"ONE_HOUR":return 3600;case"FOUR_HOURS":return 14400;case"ONE_DAY":return 86400}},"timeframeToSeconds",0,e=>{switch(e){case"ONE_MINUTE":return 60;case"FIVE_MINUTE":return 300;case"FIFTEEN_MINUTE":return 900;case"ONE_DAY":return 86400;case"ONE_HOUR":return 3600;case"SEVEN_DAYS":return 604800;case"THIRTY_DAYS":return 2592e3;case"ONE_YEAR":return 31536e3;case"ALL_TIME":return 1/0}}],682388)},32218,e=>{"use strict";var r=e.i(682388),t=e.i(239573),n=e.i(286423),a=e.i(20904),i=e.i(750040),c=e.i(744797),s=e.i(516467);function o(e,r,t){return(0,n.addSeconds)(e,-r,t)}function u(e,t,a,i){let s=(0,r.candleBucketSizeToSeconds)(t),u=(0,c.min)([(0,n.addSeconds)(e.endTime,s*i),a]),d=(0,c.min)([l(u),a]);return{startTime:l(o(e.startTime,s*i)),endTime:d}}function d({timeRange:e,intervalSize:t,maxPointsPerRequest:n=300}){let c=(0,r.candleBucketSizeToSeconds)(t),s=Math.max((0,a.differenceInSeconds)(e.endTime,e.startTime),0);return 0===s?[]:Array.from({length:Math.ceil(Math.ceil(s/c)/n)}).map((r,t)=>({startTime:(0,i.max)([e.startTime,o(e.endTime,(t+1)*c*n)]),endTime:o(e.endTime,t*c*n)}))}function l(e){let r;return(0,t.addMinutes)(((r=(0,s.toDate)(e,void 0)).setSeconds(0,0),r),1)}e.s(["INITIAL_LOAD_BUFFER",0,50,"MAX_POINTS_PER_REQUEST",0,300,"getBufferedTimeRange",()=>u,"getChunkedTimeRanges",()=>d],32218)},189972,e=>{"use strict";e.s(["CHART_MODE_COOKIE_NAME",0,"currency-chart-mode-preference","getDefaultChartMode",0,e=>"collector"===e?"LINE":"CANDLESTICKS"])},968291,660066,891409,e=>{"use strict";var r=e.i(885530);let t=(0,r.graphql)(`
  fragment CurrencyDescription on CurrencyV2 {
    symbol
    description
  }
`);e.s(["CurrencyDescriptionFragment",0,t],660066);var n=e.i(111908);let a=(0,r.graphql)(`
    fragment CurrencyMerchandisedImage on CurrencyV2 {
      metadata {
        overview {
          modules {
            __typename
          }
        }
        ...useCurrencyBannerMedia
        ...useCurrencyBannerMediaFallback
      }
    }
  `,[n.useCurrencyBannerMediaFragment,n.useCurrencyBannerMediaFallbackFragment]);e.s(["CurrencyMerchandisedImageFragment",0,a],891409);let i=(0,r.graphql)(`
    fragment CurrencyAbout on CurrencyV2 {
      description
      ...CurrencyDescription
      ...CurrencyMerchandisedImage
    }
  `,[t,a]);e.s(["CurrencyAboutFragment",0,i],968291)},589259,e=>{"use strict";var r=e.i(885530),t=e.i(111908);let n=(0,r.graphql)(`
    fragment CurrencyBannerMedia on CurrencyV2 {
      metadata {
        ...useCurrencyBannerMedia
        ...useCurrencyBannerMediaFallback
      }
    }
  `,[t.useCurrencyBannerMediaFragment,t.useCurrencyBannerMediaFallbackFragment]);e.s(["CurrencyBannerMediaFragment",0,n])},510879,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
    fragment CurrencyCandlestickChart on CurrencyV2 {
      contractAddress
      chainIdentifier
      usdPrice
      createdAt
      genesisDate
      tokenGroup {
        currencies {
          contractAddress
          chainIdentifier
          usdPrice
        }
      }
    }
  `,[]);e.s(["CurrencyCandlestickChartFragment",0,r])},644068,e=>{"use strict";var r=e.i(885530),t=e.i(455480),n=e.i(459527),a=e.i(683269),i=e.i(522285),c=e.i(670383),s=e.i(843860),o=e.i(751712),u=e.i(541412),d=e.i(924457),l=e.i(19001);let m=(0,r.graphql)(`
  mutation watchTokenMutation($contract: ContractIdentifierInput!) {
    watchToken(contract: $contract) {
      success
      error {
        __typename
      }
    }
  }
`),C=(0,r.graphql)(`
  mutation unwatchTokenMutation($contract: ContractIdentifierInput!) {
    unwatchToken(contract: $contract) {
      success
      error {
        __typename
      }
    }
  }
`);function h({currency:e,isWatching:r}){let h=(0,i.useTranslations)("useToggleWatchToken"),{contractAddress:g,chainIdentifier:y,name:T,symbol:f}=(0,t.readFragment)(l.useToggleWatchTokenFragment,e),[E,p]=(0,c.useState)(r);(0,c.useEffect)(()=>{p(r)},[r]);let[I]=(0,u.usePlaySound)(d.Sound.WatchlistAdd),[_]=(0,u.usePlaySound)(d.Sound.WatchlistRemove),[{fetching:M},N]=(0,n.useMutation)(m),[{fetching:S},F]=(0,n.useMutation)(C),{showErrorMessage:A,showSuccessMessage:D}=(0,a.useToasts)(),U=(0,s.useDebouncedCallback)(async e=>{try{let r,t={address:g,chain:y};if(e){let e=await N({contract:t});(r=e.data?.watchToken?.error?.__typename)||(D(h("addedToWatchlist",{name:T||f})),I())}else{let e=await F({contract:t});(r=e.data?.unwatchToken?.error?.__typename)||(D(h("removedFromWatchlist",{name:T||f})),_())}if(r){let e=h("errorGeneric");"EntryNotFoundError"===r?e=h("errorEntryNotFound"):"MaxWatchListSizeError"===r&&(e=h("errorMaxWatchListSize")),A(e,{duration:1e4}),p(e=>!e)}}catch{A(h("errorGeneric"),{duration:1e4}),p(e=>!e)}},750);return{execute:(0,o.useAuthenticatedCallback)(async()=>{let e=!E;p(e),await U(e)}),fetching:M||S,isWatching:E}}e.s(["useToggleWatchToken",()=>h])},843243,740651,948941,e=>{"use strict";var r=e.i(7683),t=e.i(455480),n=e.i(457628),a=e.i(670383),i=e.i(885530),c=e.i(19001);let s=(0,i.graphql)(`
  fragment CurrencyHeaderWatchlistButton on CurrencyV2 {
    contractAddress
    chainIdentifier
    ...useToggleWatchToken
  }
`,[c.useToggleWatchTokenFragment]);e.s(["CurrencyHeaderWatchlistButtonFragment",0,s],740651);var o=e.i(29093),u=e.i(644068),d=e.i(389852),l=e.i(333799);e.i(500598);var m=e.i(207225);let C=(0,i.graphql)(`
  query IsTokenWatchedQuery {
    tokenWatchlist {
      id
      contractAddress
      chainIdentifier
    }
  }
`),h={suspense:!1};function g(e){let r=(0,m.useAddress)(),[{data:t,fetching:n}]=(0,l.useQuery)({query:C,variables:{},pause:!r,context:h});return{isTokenWatchedMap:(0,a.useMemo)(()=>{let r=new Map;return e.forEach(e=>{let t=`${e.chainIdentifier}:${e.contractAddress}`;r.set(t,!1)}),t?.tokenWatchlist&&t.tokenWatchlist.forEach(e=>{let t=`${e.chainIdentifier}:${e.contractAddress}`;r.set(t,!0)}),r},[t?.tokenWatchlist,e]),isTokenWatchedFetching:n}}e.s(["useIsTokenWatched",()=>g],948941);let y=(0,d.withSuspense)(({currency:e,className:i})=>{let c=(0,t.readFragment)(s,e),{isTokenWatchedMap:d,isTokenWatchedFetching:l}=g((0,a.useMemo)(()=>[{contractAddress:c.contractAddress,chainIdentifier:c.chainIdentifier}],[c.contractAddress,c.chainIdentifier])),m=`${c.chainIdentifier}:${c.contractAddress}`,C=d.get(m)??!1,h=(0,u.useToggleWatchToken)({currency:c,isWatching:C}),y=async e=>{e.preventDefault(),await h.execute()},T=l||h.fetching;return(0,r.jsx)(n.UnstyledButton,{className:i,disabled:T,onClick:y,children:(0,r.jsx)(o.CurrencyWatchlistIcon,{isFilled:h.isWatching,loading:T,size:20})})},{ssr:!1,fallback:({className:e})=>(0,r.jsx)(n.UnstyledButton,{className:e,disabled:!0,children:(0,r.jsx)(o.CurrencyWatchlistIcon,{isFilled:!1,loading:!0,size:20})})});e.s(["CurrencyHeaderWatchlistButton",0,y],843243)},237261,e=>{"use strict";var r=e.i(7683),t=e.i(866313),n=e.i(455480),a=e.i(457628),i=e.i(95581),c=e.i(29093),s=e.i(644068);function o(e){let o,u,d,l,m,C=(0,t.c)(14),{currency:h,initialState:g}=e;C[0]!==h?(o=(0,n.readFragment)(i.CurrencyWatchlistButtonFragment,h),C[0]=h,C[1]=o):o=C[1];let y=o;C[2]!==y||C[3]!==g.isWatched?(u={currency:y,isWatching:g.isWatched},C[2]=y,C[3]=g.isWatched,C[4]=u):u=C[4];let T=(0,s.useToggleWatchToken)(u);C[5]!==T?(d=async e=>{e.preventDefault(),await T.execute()},C[5]=T,C[6]=d):d=C[6];let f=d,E=g.fetching||T.fetching;return C[7]!==E||C[8]!==T.isWatching?(l=(0,r.jsx)(c.CurrencyWatchlistIcon,{isFilled:T.isWatching,loading:E}),C[7]=E,C[8]=T.isWatching,C[9]=l):l=C[9],C[10]!==f||C[11]!==E||C[12]!==l?(m=(0,r.jsx)(a.UnstyledButton,{disabled:E,onClick:f,children:l}),C[10]=f,C[11]=E,C[12]=l,C[13]=m):m=C[13],m}e.s(["CurrencyWatchlistButton",()=>o])},592471,114463,619023,982391,758935,646011,309830,455580,e=>{"use strict";var r=e.i(885530),t=e.i(510879),n=e.i(916660);let a=(0,r.graphql)(`
    fragment TradingViewCandlestickChart on CurrencyV2 {
      contractAddress
      chainIdentifier
      symbol
      createdAt
      genesisDate
      usdPrice
      tokenGroup {
        currencies {
          contractAddress
          chainIdentifier
          usdPrice
        }
      }
    }
  `,[]);e.s(["TradingViewCandlestickChartFragment",0,a],114463);var i=e.i(314346),c=e.i(803577),s=e.i(81810),o=e.i(682576),u=e.i(201578),d=e.i(62793),l=e.i(807023);let m=(0,r.graphql)(`
    fragment CollectionCurrencyPreviewSheet on CurrencyV2 {
      collections {
        ...CollectionPreviewTooltipContent
        ...collectionUrl
      }
    }
  `,[l.CollectionPreviewTooltipContentFragment,d.collectionUrlFragment]);e.s(["CollectionCurrencyPreviewSheetFragment",0,m],619023);let C=(0,r.graphql)(`
    fragment CollectionCurrencyPreview on CurrencyV2 {
      ...CollectionCurrencyPreviewSheet
      collections {
        slug
        ...collectionUrl
        ...CollectionLockup
        ...CollectionPreviewTooltip
      }
    }
  `,[d.collectionUrlFragment,o.CollectionLockupFragment,u.CollectionPreviewTooltipFragment,m]);e.s(["CollectionCurrencyPreviewFragment",0,C],982391);var h=e.i(389810),g=e.i(427178);let y=(0,r.graphql)(`
    fragment CurrencyMetadataChips on CurrencyV2 {
      symbol
      contractAddress
      chainIdentifier
      genesisDate
      chain {
        ...ChainChip
      }
      tokenGroup {
        currencies {
          chainIdentifier
        }
      }
      socials {
        twitterProfile {
          trending {
            status
          }
          mentions {
            daily {
              count
              date
            }
          }
        }
      }
      ...CollectionCurrencyPreview
      ...NewCurrencyV2Chip
    }
  `,[g.ChainChipFragment,C,h.NewCurrencyV2ChipFragment]);e.s(["CurrencyMetadataChipsFragment",0,y],758935),e.i(843243);var T=e.i(740651);e.i(237261),e.i(95581),e.i(29093),e.i(644068),e.s([],646011);let f=(0,r.graphql)(`
  fragment CurrencyLinks on CurrencyV2 {
    contractAddress
    socials {
      website
      twitterHandle
      telegramIdentifier
      twitterProfile {
        handle
        followersCount
        accountCreatedAt
        verifiedType
        engagement {
          averageEngagementRate
          health
        }
        spaces {
          active {
            spaceId
          }
        }
      }
    }
    chain {
      identifier
    }
    metadata {
      fullCollection {
        twitterUsername
        discordUrl
        externalUrl
        instagramUsername
        mediumUsername
        telegramUrl
        wikiUrl
      }
    }
  }
`);e.s(["CurrencyLinksFragment",0,f],309830);let E=(0,r.graphql)(`
    fragment CurrencyInfo on CurrencyV2 {
      usdPrice
      createdAt
      stats {
        totalSupply
        oneDay {
          priceChange
        }
      }
      chain {
        ...ChainBadge
      }
      ...CurrencyMetadataChips
      ...CurrencyLinks
      ...CollectionCurrencyPreview
      ...CurrencyV2Lockup
      ...CurrencyHeaderWatchlistButton
    }
  `,[c.ChainBadgeFragment,f,y,C,s.CurrencyV2LockupFragment,T.CurrencyHeaderWatchlistButtonFragment]);e.s(["CurrencyInfoFragment",0,E],455580),(0,r.graphql)(`
  fragment TradingViewChart on CurrencyV2 {
    pools {
      name
      dexScreenerChainId
      pool {
        contractAddress
      }
    }
  }
`);let p=(0,r.graphql)(`
  fragment TradingViewChartButton on CurrencyV2 {
    contractAddress
    chain {
      identifier
    }
  }
`,[]),I=(0,r.graphql)(`
    fragment CurrencyChart on CurrencyV2 {
      contractAddress
      chainIdentifier
      imageUrl
      usdPrice
      createdAt
      genesisDate
      stats {
        totalSupply
      }
      ...CurrencyInfo
      ...CurrencyChartColor
      ...TradingViewChartButton
      ...CurrencyLineChart
      ...CurrencyCandlestickChart
      ...TradingViewCandlestickChart
    }
  `,[E,i.CurrencyChartColorFragment,p,n.CurrencyLineChartFragment,t.CurrencyCandlestickChartFragment,a]);e.s(["CurrencyChartFragment",0,I],592471)},975218,921712,e=>{"use strict";var r=e.i(885530),t=e.i(968291),n=e.i(589259),a=e.i(592471),i=e.i(720861),c=e.i(751923);let s=(0,r.graphql)(`
  fragment WalletPositionStats on CurrencyV2 {
    contractAddress
    chainIdentifier
    chain {
      arch
    }
    tokenGroup {
      currencies {
        chainIdentifier
        contractAddress
        chain {
          arch
        }
      }
    }
  }
`),o=(0,r.graphql)(`
  query WalletPositionStatsQuery($addresses: [Address!]!, $contracts: [ContractIdentifierInput!]!) {
    currencyOwnershipsV2(addresses: $addresses, contracts: $contracts, limit: 20) {
      items {
        __typename
        ... on CurrencyBalanceV2 {
          usdValue
          quantity
          asset {
            chainIdentifier
            contractAddress
          }
          gainStats {
            invested
            realized
            unrealized
            returnPercentage
            gain
            avgCostPerTokenUsd
          }
        }
      }
    }
  }
`),u=(0,r.graphql)(`
  subscription WalletPnlSubscription(
    $address: Address!
    $contract: ContractIdentifierInput!
  ) {
    walletPnl(address: $address, contract: $contract) {
      invested
      realized
      unrealized
      returnPercentage
      gain
    }
  }
`);e.s(["WalletPnlSubscription",0,u,"WalletPositionStatsFragment",0,s,"WalletPositionStatsQuery",0,o],921712);let d=(0,r.graphql)(`
    fragment CurrencyModule on CurrencyV2 {
      symbol
      isSwapDisabled
      metadata {
        overview {
          modules {
            __typename
          }
        }
      }
      ...CurrencyChart
      ...CurrencySwapModule
      ...CurrencyStats
      ...CurrencyAbout
      ...CurrencyBannerMedia
      ...WalletPositionStats
    }
  `,[a.CurrencyChartFragment,c.CurrencySwapModuleFragment,i.CurrencyStatsFragment,t.CurrencyAboutFragment,n.CurrencyBannerMediaFragment,s]);e.s(["CurrencyModuleFragment",0,d],975218)},301715,e=>{"use strict";let r=(0,e.i(885530).graphql)(`
  query CurrencyCandlestickChartQuery(
    $contractIdentifier: ContractIdentifierInput!
    $startTime: DateTime!
    $endTime: DateTime!
    $bucketSize: CandleBucketSize!
    $fillTimeWindow: Boolean
  ) {
    currencyOhlcvCandles2(
      contract: $contractIdentifier
      startTime: $startTime
      endTime: $endTime
      bucketSize: $bucketSize
      fillTimeWindow: $fillTimeWindow
    ) {
      time
      open
      high
      low
      close
      volume
    }
  }
`);e.s(["CurrencyCandlestickChartQuery",0,r])},723600,e=>{"use strict";var r=e.i(866313),t=e.i(88343),n=e.i(871085),a=e.i(405434),i=e.i(649386);let c=(0,a.parseAsStringLiteral)(t.Timeframe.map(e=>(0,n.toLowerCase)(e)));function s(){let e,t,s,o=(0,r.c)(7),[u,d]=(0,a.useQueryState)(i.QUERY_PARAM_KEYS.timeframe,c);return o[0]!==u?(e=u?(0,n.toUpperCase)(u):null,o[0]=u,o[1]=e):e=o[1],o[2]!==d?(t=e=>d((0,n.toLowerCase)(e)),o[2]=d,o[3]=t):t=o[3],o[4]!==e||o[5]!==t?(s={timeframe:e,setTimeframe:t},o[4]=e,o[5]=t,o[6]=s):s=o[6],s}e.s(["DEFAULT_TOKEN_TIMEFRAME",0,"ONE_DAY","useTokenTimeframeQueryParam",()=>s])},711999,21939,e=>{"use strict";var r=e.i(866313),t=e.i(165102),n=e.i(20904),a=e.i(353936);let i={ALL_TIME:"ONE_DAY",ONE_YEAR:"ONE_DAY",THIRTY_DAYS:"ONE_DAY",SEVEN_DAYS:"FOUR_HOURS",ONE_DAY:"FIFTEEN_MINUTES",ONE_HOUR:"ONE_MINUTE",FIVE_MINUTE:"ONE_SECOND",FIFTEEN_MINUTE:"ONE_MINUTE",ONE_MINUTE:"ONE_SECOND"},c={ALL_TIME:"ONE_DAY",ONE_YEAR:"ONE_DAY",THIRTY_DAYS:"ONE_DAY",SEVEN_DAYS:"FOUR_HOURS",ONE_DAY:"ONE_HOUR",ONE_HOUR:"ONE_MINUTE",FIVE_MINUTE:"ONE_SECOND",FIFTEEN_MINUTE:"ONE_MINUTE",ONE_MINUTE:"ONE_SECOND"};function s({timeframe:e,createdAt:r,isLessThanMd:t,referenceDate:s=new Date}){var o;let u,d;return"ALL_TIME"===e&&r?(o=(0,n.differenceInSeconds)(s,new Date(r)),u=(0,a.hoursToSeconds)(4),d=(0,a.hoursToSeconds)(24),o<u?"ONE_MINUTE":o<d?"FIFTEEN_MINUTES":o<7*d?"FOUR_HOURS":"ONE_DAY"):t?c[e]:i[e]}e.s(["DEFAULT_BUCKET_SIZE_MAP",0,i,"DEFAULT_TIMEFRAME_FOR_BUCKET_SIZE",0,{ONE_SECOND:"FIVE_MINUTE",ONE_MINUTE:"ONE_HOUR",FIVE_MINUTES:"ONE_DAY",FIFTEEN_MINUTES:"ONE_DAY",ONE_HOUR:"SEVEN_DAYS",FOUR_HOURS:"SEVEN_DAYS",ONE_DAY:"THIRTY_DAYS"},"MOBILE_DEFAULT_BUCKET_SIZE_MAP",0,c],21939),e.s(["computeDefaultCandleSize",()=>s,"useGetDefaultCandleSize",0,e=>{let n,a=(0,r.c)(3),{createdAt:i}=e,c=(0,t.useIsLessThanMd)();return a[0]!==i||a[1]!==c?(n=e=>s({timeframe:e,createdAt:i,isLessThanMd:c}),a[0]=i,a[1]=c,a[2]=n):n=a[2],n}],711999)},312888,e=>{"use strict";let r=new Map;function t(e,r,t){return`${e}:${r}:${t}`}function n(e,n,a,i){let c=t(e,n,a),s=r.get(c);if(!s){if(r.size>=50){let e=null,t=1/0;for(let[n,a]of r)a.lastUpdated<t&&(t=a.lastUpdated,e=n);e&&r.delete(e)}s={candles:new Map,lastUpdated:Date.now(),minTime:1/0,maxTime:-1/0},r.set(c,s)}for(let e of i){let r=new Date(e.time).getTime();s.candles.set(r,e),s.minTime=Math.min(s.minTime,r),s.maxTime=Math.max(s.maxTime,r)}if(s.candles.size>1e4){let e=Array.from(s.candles.keys()).sort((e,r)=>e-r),r=e.length-1e4;for(let t=0;t<r;t+=1)s.candles.delete(e[t]);s.minTime=e[r]??s.minTime,s.maxTime=e.at(-1)??s.maxTime}s.lastUpdated=Date.now()}function a(e,n,a,i,c){let s=t(e,n,a),o=r.get(s);if(!o)return null;if(Date.now()-o.lastUpdated>3e5)return r.delete(s),null;if(i<o.minTime||c>o.maxTime)return null;let u=[];for(let[e,r]of o.candles)e>=i&&e<=c&&u.push({timeMs:e,candle:r});return 0===u.length?null:(u.sort((e,r)=>e.timeMs-r.timeMs),u.map(e=>e.candle))}e.s(["getCachedCandles",()=>a,"setCachedCandles",()=>n])},510257,e=>{"use strict";var r=e.i(885530);e.i(232947);var t=e.i(859898);let n=(0,r.graphql)(`
    fragment MobileCurrencyItemsActionBar on CurrencyV2 {
      symbol
      restrictSwapsToNativeTokens
      ...currencyIdentifier
    }
  `,[t.currencyIdentifierFragment]);e.s(["MobileCurrencyItemsActionBarFragment",0,n])}]);

//# debugId=a2e80c14-5b44-0150-5dea-bab92e8827e4
//# sourceMappingURL=a74492571469b076.js.map