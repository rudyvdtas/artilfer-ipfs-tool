;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="c9b6aaa3-3528-9905-48a1-fdde3947f8e0")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,718813,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(437153),n=e.i(194153);function s(e){let s,i,o,l,c,d,u,m,h,p,g=(0,a.c)(46);g[0]!==e?({size:l,className:s,style:o,variant:c,...i}=e,g[0]=e,g[1]=s,g[2]=i,g[3]=o,g[4]=l,g[5]=c):(s=g[1],i=g[2],o=g[3],l=g[4],c=g[5]);let y=void 0===l?22:l,f=void 0===c?"default":c,A=`calc(${y}px + ${.5*y}px)`,C="icon"in i?i.icon:void 0;g[6]!==i?(d={...i,icon:void 0},g[6]=i,g[7]=d):d=g[7];let w=d;if("outlined"===f){let e,a,l,c,d,u,m,h=`calc(${y}px + ${.5*y}px + 8px)`;return g[8]!==s?(e=(0,r.classNames)("rounded-lg border border-border-1 bg-bg-primary p-1",s),g[8]=s,g[9]=e):e=g[9],g[10]!==h||g[11]!==o?(a={width:h,height:h,...o},g[10]=h,g[11]=o,g[12]=a):a=g[12],g[13]!==s?(l=(0,r.classNames)("aspect-square shrink-0 rounded-sm border border-border-1 bg-bg-additional-1",s),g[13]=s,g[14]=l):l=g[14],g[15]!==o||g[16]!==A?(c={width:A,height:A,...o},g[15]=o,g[16]=A,g[17]=c):c=g[17],g[18]!==C||g[19]!==w||g[20]!==i||g[21]!==y?(d=C?(0,t.jsx)(C,{size:y,...w}):i.children,g[18]=C,g[19]=w,g[20]=i,g[21]=y,g[22]=d):d=g[22],g[23]!==l||g[24]!==c||g[25]!==d?(u=(0,t.jsx)(n.CenterAligned,{className:l,style:c,children:d}),g[23]=l,g[24]=c,g[25]=d,g[26]=u):u=g[26],g[27]!==e||g[28]!==a||g[29]!==u?(m=(0,t.jsx)(n.CenterAligned,{className:e,style:a,children:u}),g[27]=e,g[28]=a,g[29]=u,g[30]=m):m=g[30],m}let v="default"===f&&"border border-border-1";return g[31]!==s||g[32]!==v?(u=(0,r.classNames)("aspect-square rounded-md bg-bg-additional-1 p-1",v,s),g[31]=s,g[32]=v,g[33]=u):u=g[33],g[34]!==o||g[35]!==A?(m={width:A,height:A,...o},g[34]=o,g[35]=A,g[36]=m):m=g[36],g[37]!==C||g[38]!==w||g[39]!==i||g[40]!==y?(h=C?(0,t.jsx)(C,{size:y,...w}):i.children,g[37]=C,g[38]=w,g[39]=i,g[40]=y,g[41]=h):h=g[41],g[42]!==u||g[43]!==m||g[44]!==h?(p=(0,t.jsx)(n.CenterAligned,{className:u,style:m,children:h}),g[42]=u,g[43]=m,g[44]=h,g[45]=p):p=g[45],p}e.s(["IconCallout",()=>s])},630068,e=>{"use strict";var t=e.i(866313),a=e.i(594445),r=e.i(230834),n=e.i(248452),s=e.i(176772),i=e.i(609900);function o(){let e,o,l,c=(0,t.c)(9),d=(0,a.useIsHydrated)(),u=(0,i.useFlag)("smartWalletEnabled"),m=(0,s.useIsEmbeddedWallet)(),{primaryAccount:h}=(0,n.useAccount)(),p=h?.accountId;c[0]===Symbol.for("react.memo_cache_sentinel")?(e={},c[0]=e):e=c[0];let[g,y]=(0,r.useLocalStorage)("user-operations-enabled",e),f=!!(p&&d&&(g[p]??!0)),A=!!(u&&f&&m);c[1]!==p||c[2]!==d||c[3]!==y?(o=e=>{d&&p&&y(t=>({...t,[p]:e}))},c[1]=p,c[2]=d,c[3]=y,c[4]=o):o=c[4];let C=o;return c[5]!==d||c[6]!==A||c[7]!==C?(l={isUserOperationsEnabled:A,setUserOperationsEnabled:C,ready:d},c[5]=d,c[6]=A,c[7]=C,c[8]=l):l=c[8],l}e.s(["useUserOperationsEnabled",()=>o])},282726,e=>{"use strict";var t=e.i(885530),a=e.i(52494);let r=(0,t.graphql)(`
  fragment useScheduler_signatureRequest on SignatureRequest {
    __typename
    message
    ... on SignTypedDataRequest {
      chain {
        networkId
      }
    }
  }
`),n=(0,t.graphql)(`
  fragment useScheduler_transactionSubmissionData on TransactionSubmissionData {
    to
    data
    value
    chain {
      networkId
    }
  }
`),s=(0,t.graphql)(`
  fragment useScheduler_svmTransactionSubmissionData on SvmTransactionSubmissionData {
    instructions {
      programId
      data
      keys {
        pubkey
        isSigner
        isWritable
      }
    }
    addressLookupTableAddresses
  }
`),i=(0,t.graphql)(`
  fragment useScheduler_readGasBufferMultiplier on BlockchainAction {
    __typename
    ... on TransactionAction {
      transactionSubmissionData {
        chain {
          identifier
          gasLimitBufferMultiplier
        }
      }
    }
    ... on SwapAssetsAction {
      relayerFulfillment {
        sameChain
      }
    }
    ... on BuyItemAction {
      items {
        __typename
      }
    }
  }
`),o=(0,t.graphql)(`
    fragment useScheduler_action on BlockchainAction {
      __typename
      ... on BlurAuthAction {
        chain {
          identifier
        }
        expiresOn
        hmac
        signatureRequest {
          message
          ...useScheduler_signatureRequest
        }
      }
      ... on RefreshAction {
        message
      }
      ... on SignatureRequestAction {
        signatureRequest {
          ...useScheduler_signatureRequest
        }
      }
      ... on TransactionAction {
        transactionSubmissionData {
          chain {
            networkId
            identifier
            gasLimitBufferMultiplier
          }
          ...useScheduler_transactionSubmissionData
        }
      }
      ... on SvmTransactionAction {
        svmTransactionSubmissionData {
          ...useScheduler_svmTransactionSubmissionData
        }
      }
      ... on GaslessCancelOrdersAction {
        signatureRequest {
          ...useScheduler_signatureRequest
        }
      }
      ... on HyperliquidAuthAction {
        requestId
        signatureRequest {
          ...useScheduler_signatureRequest
        }
        postData {
          id
          nonce
          signatureChainId
          type
          wallet
          walletChainId
        }
      }
      ... on HyperliquidDepositAction {
        requestId
        nonce
        signatureRequest {
          ...useScheduler_signatureRequest
        }
        depositData {
          amount
          destination
          hyperliquidChain
          token
          type
        }
        relayerFulfillment {
          requestId
          sameChain
          crossChain
        }
      }
      ... on Permit2SignatureAction {
        __typename
        domain {
          name
          chainId
          verifyingContract
        }
        types {
          permitSingle {
            name
            type
          }
          permitDetails {
            name
            type
          }
        }
        transactionBuilder {
          commands
          deadline
          encodedInputs {
            permitInputTypes
            permitMessageForSigning {
              details {
                token
                amount
                expiration
                nonce
              }
              spender
              sigDeadline
            }
            payPortionInput
            swapInputs
          }
        }
        primaryType
        trxSignatureSuffix
      }
      ... on RelayerFulfillableAction {
        relayerFulfillment {
          requestId
          sameChain
          crossChain
        }
      }
      ... on UserOpAction {
        actionBundleToken
        chain {
          identifier
        }
        calls {
          __typename
          ... on TransactionAction {
            transactionSubmissionData {
              to
              data
              value
              chain {
                networkId
                identifier
                gasLimitBufferMultiplier
              }
            }
          }
        }
        networkFee {
          supportedCurrencies {
            contractAddress
            chainIdentifier
            symbol
            decimals
            name
            imageUrl
          }
          availableCurrencies {
            contractAddress
            chainIdentifier
            symbol
            decimals
            name
            imageUrl
          }
        }
      }
      ...useScheduler_readGasBufferMultiplier
      ...flowCallbackStore_action
    }
  `,[r,n,s,i,a.flowCallbackStore_actionFragment]);e.s(["useScheduler_actionFragment",0,o,"useScheduler_signatureRequestFragment",0,r,"useScheduler_svmTransactionSubmissionDataFragment",0,s,"useScheduler_transactionSubmissionDataFragment",0,n])},269775,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment UserOperationNetworkFees_networkFee on NetworkFee {
    availableCurrencies {
      contractAddress
    }
    usdPriceEstimate
  }
`);e.s(["UserOperationNetworkFees_networkFeeFragment",0,t])},897496,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment NetworkFeeCurrencySelector_currency on Currency {
    contractAddress
    symbol
    imageUrl
  }
`);e.s(["NetworkFeeCurrencySelector_currencyFragment",0,t])},622540,e=>{"use strict";var t=e.i(885530),a=e.i(269775),r=e.i(897496);let n=(0,t.graphql)(`
    fragment useActionsNetworkFees_action on BlockchainAction {
      __typename
      ... on UserOpAction {
        networkFee {
          ...UserOperationNetworkFees_networkFee
          supportedCurrencies {
            ...NetworkFeeCurrencySelector_currency
            contractAddress
            chainIdentifier
            decimals
            name
            isNative
          }
          availableCurrencies {
            ...NetworkFeeCurrencySelector_currency
            contractAddress
            chainIdentifier
            decimals
            name
            isNative
          }
        }
      }
    }
  `,[r.NetworkFeeCurrencySelector_currencyFragment,a.UserOperationNetworkFees_networkFeeFragment]);e.s(["useActionsNetworkFees_actionFragment",0,n])},332238,515746,999413,e=>{"use strict";var t=e.i(885530),a=e.i(282726);let r=(0,t.graphql)(`
  fragment DynamicTrait on DynamicTrait {
    traitKey
    displayName
    value
    dataType
    validateOnSale
    decimals
  }
`);e.s(["DynamicTraitFragment",0,r],515746);let n=(0,t.graphql)(`
  fragment ActionTimelineItem on BlockchainAction {
    ... on BuyItemAction {
      __typename
      items {
        imageUrl
        id
        tokenId
        contractAddress
        name
        attributes {
          traitType
          value
        }
        chain {
          identifier
        }
      }
      validationMetadataByOrder {
        orderId
        metadata {
          dynamicTraits {
            ...DynamicTrait
          }
        }
      }
    }
    ... on AcceptOfferAction {
      __typename
      items {
        id
      }
    }
    ... on ItemApprovalAction {
      __typename
      item {
        collection {
          name
          imageUrl
        }
      }
    }
    ... on PaymentApprovalAction {
      __typename
      currency {
        id
        symbol
      }
    }
    ... on CreateListingsAction {
      items {
        id
      }
    }
    ... on CreateOffersAction {
      items {
        imageUrl
        id
        tokenId
        contractAddress
        name
        attributes {
          traitType
          value
        }
        chain {
          identifier
        }
      }
      validationMetadataByAsset {
        item {
          __typename
          ... on ItemIdentifierResult {
            tokenId
            contractAddress
            chain {
              identifier
              networkId
            }
          }
        }
        metadata {
          dynamicTraits {
            ...DynamicTrait
          }
        }
      }
    }
    ... on UnwrapAction {
      __typename
      transactionSubmissionData {
        to
        chain {
          identifier
          nativeCurrency {
            symbol
          }
          wrappedNativeCurrency {
            symbol
          }
        }
      }
    }
    ... on WrapAction {
      __typename
      transactionSubmissionData {
        to
        chain {
          identifier
          nativeCurrency {
            symbol
          }
          wrappedNativeCurrency {
            symbol
          }
        }
      }
    }
    ... on MintAction {
      __typename
      collection {
        imageUrl
      }
    }
    ... on DropPublishAction {
      __typename
    }
    ... on SvmBuyItemsAction {
      __typename
      items {
        imageUrl
        id
      }
    }
    ... on ClaimTokenRewardAction {
      __typename
    }
    ... on HyperliquidAuthAction {
      __typename
    }
    ... on HyperliquidDepositAction {
      __typename
      depositData {
        type
      }
    }
    ... on UserOpAction {
      __typename
      calls {
        ... on BuyItemAction {
          __typename
          items {
            imageUrl
            id
          }
        }
        ... on AcceptOfferAction {
          __typename
          items {
            id
          }
        }
        ... on ItemApprovalAction {
          __typename
          item {
            collection {
              name
              imageUrl
            }
          }
        }
        ... on PaymentApprovalAction {
          __typename
          currency {
            id
            symbol
          }
        }
        ... on WrapAction {
          __typename
          transactionSubmissionData {
            to
            chain {
              identifier
              nativeCurrency {
                symbol
              }
              wrappedNativeCurrency {
                symbol
              }
            }
          }
        }
        ... on UnwrapAction {
          __typename
          transactionSubmissionData {
            to
            chain {
              identifier
              nativeCurrency {
                symbol
              }
              wrappedNativeCurrency {
                symbol
              }
            }
          }
        }
        ... on SwapAssetsAction {
          __typename
        }
        ... on TransferAssetsAction {
          __typename
        }
      }
      networkFee {
        supportedCurrencies {
          contractAddress
          chainIdentifier
          symbol
          decimals
          name
          imageUrl
        }
        availableCurrencies {
          contractAddress
          chainIdentifier
          symbol
          decimals
          name
          imageUrl
        }
      }
    }
  }
`,[r]);e.s(["ActionTimelineItemFragment",0,n],999413);let s=(0,t.graphql)(`
    fragment ActionTimeline on BlockchainAction {
      __typename
      ...useScheduler_action
      ...ActionTimelineItem
    }
  `,[a.useScheduler_actionFragment,n]);e.s(["ActionTimelineFragment",0,s],332238)},320163,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(567089),n=e.i(437153),s=e.i(2795);let i=(0,e.i(703379).tv)({base:"flex h-6 items-center gap-2",variants:{variant:{default:"bg-rare-transparent-1 text-rare",success:"bg-success-1-transparent-1 text-success-1",error:"bg-error-1-transparent-1 text-error-1",warning:"bg-warning-transparent-1 text-warning"}}});function o(e){let o,l,c,d=(0,a.c)(10),{className:u,variant:m,children:h,isLoading:p,icon:g}=e,y=void 0===m?"default":m;return d[0]!==u||d[1]!==y?(o=(0,n.classNames)(i({variant:y}),u),d[0]=u,d[1]=y,d[2]=o):o=d[2],d[3]!==p?(l=p?(0,t.jsx)(s.Spinner,{size:"2xs"}):null,d[3]=p,d[4]=l):l=d[4],d[5]!==h||d[6]!==g||d[7]!==o||d[8]!==l?(c=(0,t.jsxs)(r.Chip,{className:o,children:[l,g,h]}),d[5]=h,d[6]=g,d[7]=o,d[8]=l,d[9]=c):c=d[9],c}e.s(["ProgressChip",()=>o])},57465,e=>{"use strict";var t=e.i(885530),a=e.i(600028);let r=(0,t.graphql)(`
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
  `,[a.ItemMediaFragment]);e.s(["ItemRewardMediaFragment",0,r])},234761,e=>{"use strict";var t=e.i(885530),a=e.i(455480),r=e.i(465172);let n=(0,t.graphql)(`
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
`),s=(0,t.graphql)(`
  fragment SortRewardsByValue_token on UserTokenReward {
    __typename
    id
    balance {
      usdValue
    }
  }
`);function i(e){if("UserTokenReward"===e.__typename){let t=(0,a.readFragment)(s,e);return(0,r.bn)(t.balance?.usdValue??0).toNumber()}let t=(0,a.readFragment)(n,e);return(0,r.bn)(t.item?.bestOffer?.pricePerItem?.usd??0).toNumber()}function o(e,t){return[...e.map(e=>({original:e,sortData:(0,a.readFragment)(n,e)})),...t.map(e=>({original:e,sortData:(0,a.readFragment)(s,e)}))].sort((e,t)=>i(e.sortData)-i(t.sortData)).map(({original:e})=>e)}e.s(["SortRewardsByValue_itemFragment",0,n,"SortRewardsByValue_tokenFragment",0,s,"sortRewardsByValue",()=>o])},279155,e=>{"use strict";var t=e.i(81810),a=e.i(885530),r=e.i(111908);let n=(0,a.graphql)(`
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
  `,[t.CurrencyLockupFragment,r.useCurrencyBannerMediaFragment,r.useCurrencyBannerMediaFallbackFragment]);e.s(["TokenRewardMediaFragment",0,n])},186869,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment TreasureRewardMedia on Badge {
    id
    name
    imageUrl
    animationUrl
  }
`);e.s(["TreasureRewardMediaFragment",0,t])},731049,845139,589534,320464,295165,731950,553919,e=>{"use strict";var t=e.i(885530),a=e.i(682576),r=e.i(201578),n=e.i(959105);e.i(661049);var s=e.i(190519),i=e.i(846428),o=e.i(57465);let l=(0,t.graphql)(`
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
  `,[a.CollectionLockupFragment,r.CollectionPreviewTooltipFragment]);e.s(["GrandPrizeModalFragment",0,l],845139);let c=(0,t.graphql)(`
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
  `,[a.CollectionLockupFragment,i.useBuyItemsFragment,s.ItemLinkFragment,n.CollectionLinkFragment,r.CollectionPreviewTooltipFragment,o.ItemRewardMediaFragment,l]);e.s(["ItemRewardCardFragment",0,c],589534);var d=e.i(234761),u=e.i(767502),m=e.i(332238),h=e.i(622540),p=e.i(279155);let g=(0,t.graphql)(`
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
  `,[m.ActionTimelineFragment,u.ContextCurrencyFragment,p.TokenRewardMediaFragment,h.useActionsNetworkFees_actionFragment]);e.s(["TokenRewardCardFragment",0,g],320464);var y=e.i(186869);let f=(0,t.graphql)(`
    fragment TreasureRewardCard on Badge {
      id
      name
      description
      ...TreasureRewardMedia
    }
  `,[y.TreasureRewardMediaFragment]);e.s(["TreasureRewardCardFragment",0,f],295165);let A=(0,t.graphql)(`
    fragment OpenTreasureChestModal_treasure on Badge {
      __typename
      id
      name
      ...TreasureRewardCard
    }
  `,[f]),C=(0,t.graphql)(`
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
  `,[c,d.SortRewardsByValue_itemFragment,g,d.SortRewardsByValue_tokenFragment,A]);e.s(["OpenTreasureChestModalFragment",0,C,"OpenTreasureChestModal_treasureFragment",0,A],731950);let w=(0,t.graphql)(`
    fragment OpenChestButton_treasure on Badge {
      name
      ...OpenTreasureChestModal_treasure
    }
  `,[A]),v=(0,t.graphql)(`
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
  `,[C,w]);e.s(["OpenChestButtonFragment",0,v,"OpenChestButton_treasureFragment",0,w],731049);let x=(0,t.graphql)(`
  fragment TreasureChestWave on TreasureChest {
    id
    name
    waveName
  }
`);e.s(["TreasureChestWaveFragment",0,x],553919)},287342,293108,e=>{"use strict";var t=e.i(885530),a=e.i(455480),r=e.i(700398),n=e.i(630068),s=e.i(670383),i=e.i(731950),o=e.i(731049),l=e.i(553919);let c=(0,t.graphql)(`
    fragment TreasureChestContent on TreasureChest {
      id
      ...TreasureChestWave
      ...OpenChestButton
      chestLevels {
        level
        pointsRequired
      }
    }
  `,[l.TreasureChestWaveFragment,o.OpenChestButtonFragment]);e.s(["TreasureChestContentFragment",0,c],293108),e.i(402819);var d=e.i(916744),u=e.i(207225),m=e.i(598777);let h=(0,t.graphql)(`
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
  `,[c,l.TreasureChestWaveFragment,i.OpenTreasureChestModalFragment]),p=(0,t.graphql)(`
    subscription UseActiveTreasureChestsProgress(
      $accountId: String!
      $addresses: [Address!]
    ) {
      userTreasureChestProgress(accountId: $accountId, addresses: $addresses) {
        totalPoints
      }
    }
  `);function g(){let e=(0,r.usePrimaryAccount)(),t=(0,u.useAddress)(),{isUserOperationsEnabled:o,ready:l}=(0,n.useUserOperationsEnabled)(),[c,g]=(0,m.useAuthenticatedQuery)({query:h,variables:{capabilities:{eip7702:o}},pause:!(t&&l)}),{data:y,...f}=c,A=y?.activeTreasureChests?.items??[],C=A.at(0),w=(0,s.useMemo)(()=>{if(!C)return;let e=(0,a.readFragment)(i.OpenTreasureChestModalFragment,C);if(e.userProgress)return{totalPoints:e.userProgress.totalPoints,hasExceededLevelCap:e.userProgress.hasExceededLevelCap,currentLevel:e.userProgress.currentLevel,currentTier:e.userProgress.currentTier,levelProgressPercent:e.userProgress.levelProgressPercent,minimumVoyageChestLevel:e.userProgress.minimumVoyageChestLevel}},[C]);return(0,d.useSubscription)({query:p,variables:{accountId:e?.accountId??"",addresses:t?[t]:void 0},pause:!(e?.accountId&&t),pauseOnInactivity:!1},()=>{g({requestPolicy:"network-only"})}),{activeTreasureChests:A,activeTreasureChest:C,userProgress:w,...f,refetch:g,refetchProgress:()=>{t&&g({requestPolicy:"network-only"})}}}e.s(["useActiveTreasureChests",()=>g],287342)},49878,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(695698),n=e.i(999258),s=e.i(584502);function i(e){let i,o,l=(0,a.c)(6),{count:c,showList:d}=e,u=void 0===c?3:c;l[0]!==u?(i=Array.from({length:u},(e,a)=>(0,t.jsxs)("div",{children:[(0,t.jsx)(s.AccountSwitcherAccountItemsSkeleton,{}),a<u-1&&(0,t.jsx)(n.Separator,{})]},a)),l[0]=u,l[1]=i):i=l[1];let m=i;if(!(void 0===d||d)){let e;return l[2]!==m?(e=(0,t.jsx)(t.Fragment,{children:m}),l[2]=m,l[3]=e):e=l[3],e}return l[4]!==m?(o=(0,t.jsx)(r.List,{className:"rounded-lg border border-border-1 bg-bg-primary",showBorder:!1,children:m}),l[4]=m,l[5]=o):o=l[5],o}e.s(["LinkedWalletsSkeletons",()=>i])},919389,40485,392877,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(155757),n=e.i(194153),s=e.i(39771),i=e.i(838820),o=e.i(972483),l=e.i(950293),c=e.i(683269),d=e.i(838996),u=e.i(654469),m=e.i(922345),h=e.i(861316),p=e.i(101219),g=e.i(987212),y=e.i(901562),f=e.i(223458);let A=()=>{let e,t,r=(0,a.c)(8),{externalAccount:n}=(0,p.useSnapshot)(f.AccountState),{connect:s,isConnecting:i}=(0,g.useConnect)(),o=(0,y.useConnections)();r[0]!==s||r[1]!==o||r[2]!==n?(e=async()=>{if(!n)return;let e=o.find(e=>e.addresses.some(e=>(0,h.isAddressEqual)(e,n.address)));e&&(f.AccountActions.setAccount(n),await s(e.connector,{address:n.address,switchOnConnect:!0}),f.AccountActions.setExternalAccount(void 0))},r[0]=s,r[1]=o,r[2]=n,r[3]=e):e=r[3];let l=e;return r[4]!==l||r[5]!==n||r[6]!==i?(t={account:n,connect:l,isConnecting:i},r[4]=l,r[5]=n,r[6]=i,r[7]=t):t=r[7],t};e.s(["useExternalAccount",0,A],40485);var C=e.i(81311),w=e.i(845016),v=e.i(522285),x=e.i(670383),k=e.i(389852),b=e.i(261759),T=e.i(46486),S=e.i(821303),_=e.i(752443),F=e.i(514870),j=e.i(146281),M=e.i(977839),N=e.i(287342),L=e.i(751712),I=e.i(925252);let B=({address:e,onLinked:t,onAlreadyLinked:r})=>{let n,s,i,o,l=(0,v.useTranslations)("useLinkWallet"),{showErrorMessage:d,showSuccessMessage:u}=(0,c.useToasts)(),m=(s=(0,a.c)(3),i=(0,j.useEvmSignFunction)(),o=(0,M.useSvmSignFunction)(),s[0]!==i||s[1]!==o?(n=async e=>{let{connector:t,message:a,address:r}=e;switch(!t.baseConnector.connected&&await t.baseConnector.connect(),t.chainArch){case"EVM":return i({connector:t,message:a,address:r});case"SVM":return o({connector:t,message:a,address:r})}},s[0]=i,s[1]=o,s[2]=n):n=s[2],n),[p,g]=(0,x.useState)(!1),f=(0,y.useConnections)(),{refetchProgress:A}=(0,N.useActiveTreasureChests)();return{linkWallet:(0,L.useAuthenticatedCallback)(async({force:a}={})=>{g(!0);try{let n,s=f.find(t=>t.addresses.some(t=>(0,h.isAddressEqual)(t,e)));if(!s)return void d(l("couldNotFindConnection"));if(s.connector.id===F.EMBEDDED_WALLET_CONNECTOR_ID){let e=await (0,_.getUser)();if("string"==typeof e)throw Error(`Failed to get user: ${e}`);n=await I.accountsAdapter.linkPrivyWallet({token:e.accessToken,force:a})}else{let t=await I.accountsAdapter.createSIWXMessage(e,s),r=await m({connector:s.connector,address:e,message:t});n=await I.accountsAdapter.linkWallet({connection:s,signature:r,message:t,force:a})}if(n.success)u(l("walletLinkedSuccessfully"),{duration:1e4}),A(),t();else{if(r&&"ALREADY_LINKED"===n.code)return void r();d(n.message??l("failedToLinkWallet"),{duration:1e4})}}catch(e){d((0,w.isError)(e)?e.message:l("failedToLinkWallet"),{duration:1e4})}finally{g(!1)}}),isLinking:p}},q=e=>{let r,n,s,l,c,d,u,m,h,p,g,y,f=(0,a.c)(32),{address:A,goBack:C,onLinked:w}=e,x=(0,v.useTranslations)("MoveLinkedWalletModalContent");f[0]!==A||f[1]!==w?(r={address:A,onLinked:w},f[0]=A,f[1]=w,f[2]=r):r=f[2];let{linkWallet:k,isLinking:b}=B(r);return f[3]!==x?(n=x("title"),f[3]=x,f[4]=n):n=f[4],f[5]!==n?(s=(0,t.jsx)(o.ModalHeader,{className:"text-center",children:(0,t.jsx)(o.ModalHeaderTitle,{className:"text-center",children:n})}),f[5]=n,f[6]=s):s=f[6],f[7]!==A||f[8]!==x?(l=x("description",{address:(0,i.formatAddress)(A)}),f[7]=A,f[8]=x,f[9]=l):l=f[9],f[10]!==l?(c=(0,t.jsx)(o.ModalBody,{className:"flex flex-col gap-6",children:l}),f[10]=l,f[11]=c):c=f[11],f[12]!==x?(d=x("no"),f[12]=x,f[13]=d):d=f[13],f[14]!==C||f[15]!==d?(u=(0,t.jsx)(o.ModalFooterButton,{onClick:C,variant:"secondary",children:d}),f[14]=C,f[15]=d,f[16]=u):u=f[16],f[17]!==k?(m=()=>{k({force:!0})},f[17]=k,f[18]=m):m=f[18],f[19]!==x?(h=x("yesMoveWallet"),f[19]=x,f[20]=h):h=f[20],f[21]!==b||f[22]!==m||f[23]!==h?(p=(0,t.jsx)(o.ModalFooterButton,{autoFocus:!0,disabled:b,isLoading:b,onClick:m,variant:"primary",children:h}),f[21]=b,f[22]=m,f[23]=h,f[24]=p):p=f[24],f[25]!==p||f[26]!==u?(g=(0,t.jsxs)(o.ModalFooter,{children:[u,p]}),f[25]=p,f[26]=u,f[27]=g):g=f[27],f[28]!==g||f[29]!==s||f[30]!==c?(y=(0,t.jsxs)(t.Fragment,{children:[s,c,g]}),f[28]=g,f[29]=s,f[30]=c,f[31]=y):y=f[31],y};var R=e.i(885530),P=e.i(333799);let W=(0,R.graphql)(`
  query ConnectedAccountProfileQuery($addresses: [Address!]!) {
    walletProfilesByAddresses(addresses: $addresses) {
      __typename
      ... on Profile {
        address
        username
        displayName
        imageUrl
        portfolioSummary {
          estimatedTokenValue {
            usd
          }
        }
      }
    }
  }
`);function D(e){let t,r,n,s,i=(0,a.c)(9);i[0]!==e?(t={addresses:e?[(0,h.normalizeAddress)(e)]:[]},i[0]=e,i[1]=t):t=i[1],i[2]===Symbol.for("react.memo_cache_sentinel")?(r={suspense:!1},i[2]=r):r=i[2];let o=!e;i[3]!==t||i[4]!==o?(n={query:W,variables:t,context:r,pause:o},i[3]=t,i[4]=o,i[5]=n):n=i[5];let[l]=(0,P.useQuery)(n),{data:c,fetching:d}=l,u=c?.walletProfilesByAddresses?.[0],m=u?.__typename==="Profile"?u:null;return i[6]!==d||i[7]!==m?(s={profile:m,fetching:d},i[6]=d,i[7]=m,i[8]=s):s=i[8],s}e.s(["useConnectedAccountProfile",()=>D],392877);let U=e=>{let r,n,s,i=(0,a.c)(10),{address:l,onLinked:c,onAlreadyLinked:d}=e,u=(0,v.useTranslations)("LinkWalletChangeDetectedModalContent");i[0]!==l||i[1]!==d||i[2]!==c?(r={address:l,onLinked:c,onAlreadyLinked:d},i[0]=l,i[1]=d,i[2]=c,i[3]=r):r=i[3];let{linkWallet:m,isLinking:h}=B(r);return i[4]!==u?(n=u("linkWalletToAccount"),i[4]=u,i[5]=n):n=i[5],i[6]!==h||i[7]!==m||i[8]!==n?(s=(0,t.jsx)(o.ModalFooterButton,{autoFocus:!0,disabled:h,isLoading:h,onClick:m,variant:"primary",children:n}),i[6]=h,i[7]=m,i[8]=n,i[9]=s):s=i[9],s},O=(0,k.withSuspense)(({address:e,connector:a,isSwitchingAccounts:h,onAccountSwitch:p,onLinked:g,onResetConnector:y,setIsSwitchingAccounts:f})=>{let k=(0,v.useTranslations)("LinkWalletChangeDetectedModalContent"),[_,F]=(0,x.useState)(!1),{showErrorMessage:j}=(0,c.useToasts)(),{connect:M}=A(),{disconnect:N}=(0,m.useDisconnect)(),L=(0,S.useRenderUsdBalance)(),{logout:I}=(0,C.useLogout)(),B=(0,u.useAuthenticateFlow)(),{profile:R}=D(e);return _?(0,t.jsx)(q,{address:e,goBack:()=>F(!1),onLinked:g}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.ModalHeader,{className:"flex justify-center pt-7 pb-1",children:(0,t.jsxs)(n.CenterAligned,{className:"gap-6",children:[(0,t.jsx)(s.FlexCenter,{className:"gap-4",children:"embedded"===a.type?(0,t.jsx)(b.AnimatedLogo,{size:60}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.CenterAligned,{className:"h-16 w-16 rounded-full bg-white",children:a.icon&&(0,t.jsx)(r.Avatar,{size:48,src:a.icon})}),(0,t.jsx)(d.SwapHoriz,{size:24}),(0,t.jsx)(b.AnimatedLogo,{size:60})]})}),(0,t.jsx)(o.ModalHeaderTitle,{children:k("title")})]})}),(0,t.jsxs)(o.ModalBody,{className:"flex flex-col gap-6",children:[(0,t.jsx)(l.TextBody,{className:"text-center",color:"text-secondary",children:k("description1",{address:(0,i.formatAddress)(e)})}),(0,t.jsx)("div",{className:"rounded-lg border border-border-1 bg-bg-primary","data-address":e,children:(0,t.jsx)(T.LinkedAccountSwitcherItem,{address:e,avatarSize:32,description:L(R?.portfolioSummary?.estimatedTokenValue?.usd??void 0),displayName:R?.displayName,imageUrl:R?.imageUrl||void 0,isLink:!1,onClick:void 0,showActions:!1,showCheck:!1,showNotLinked:!0,username:R?.username,variant:"full"})})]}),(0,t.jsxs)(o.ModalFooter,{children:[(0,t.jsx)(o.ModalFooterButton,{disabled:h,isLoading:h,onClick:async()=>{try{if(f(!0),await I(),"embedded"===a.type&&y){await N(a,{endSession:!1}),y();return}await M(),B({autoPromptSiwe:!0,onAuthenticated:p})}catch(e){j((0,w.isError)(e)?e.message:"Failed to log in")}finally{f(!1)}},variant:"secondary",children:k("switchAccounts")}),(0,t.jsx)(U,{address:e,onAlreadyLinked:()=>F(!0),onLinked:g})]})]})},{fallback:null});e.s(["LinkWalletChangeDetectedModalContent",0,O],919389)},638183,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(885530),n=e.i(455480),s=e.i(333799),i=e.i(491150),o=e.i(149431),l=e.i(194153),c=e.i(437153),d=e.i(965523),u=e.i(718813),m=e.i(695698),h=e.i(972483),p=e.i(950293),g=e.i(165102),y=e.i(790621);function f(e){let r,n,s,i,o,l,d,u,m=(0,a.c)(15);m[0]!==e?({size:s,fill:i,fillAttribute:o,className:r,...n}=e,m[0]=e,m[1]=r,m[2]=n,m[3]=s,m[4]=i,m[5]=o):(r=m[1],n=m[2],s=m[3],i=m[4],o=m[5]);let h=void 0===s?24:s,p=void 0===i?"current":i,g=void 0===o?"currentColor":o;return m[6]!==r||m[7]!==p?(l=(0,c.classNames)((0,y.fillVariants)({fill:p}),r),m[6]=r,m[7]=p,m[8]=l):l=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsx)("path",{d:"M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"}),m[9]=d):d=m[9],m[10]!==g||m[11]!==n||m[12]!==h||m[13]!==l?(u=(0,t.jsx)("svg",{"aria-label":"Account Balance Wallet",className:l,fill:g,height:h,role:"img",viewBox:"0 -960 960 960",width:h,xmlns:"http://www.w3.org/2000/svg",...n,children:d}),m[10]=g,m[11]=n,m[12]=h,m[13]=l,m[14]=u):u=m[14],u}var A=e.i(861316),C=e.i(471317),w=e.i(765778),v=e.i(150127),x=e.i(223458);function k(){x.AccountActions.setShouldSyncAccountState(!0)}function b(){return x.AccountActions.setShouldSyncAccountState(!1),k}var T=e.i(41808),S=e.i(276198),_=e.i(522285),F=e.i(670383),j=e.i(136419),M=e.i(436609),N=e.i(238642),L=e.i(545460),I=e.i(389852),B=e.i(180909);e.i(500598);var q=e.i(207225),R=e.i(71105),P=e.i(84438);e.i(754689);var W=e.i(313479),D=e.i(46486),U=e.i(39771),O=e.i(967593),E=e.i(217961);let z=(0,r.graphql)(`
  query MaxWalletsLinkedQuery {
    maxWalletsLinked
  }
`),V=(0,I.withSuspense)(e=>{let r,n,i,o,l,c,d,u,m,p,y,f,A,C,w,v,x,k,b=(0,a.c)(47),{linkedWalletsCount:T,fetching:S,hasLinkedEmbeddedWallet:F}=e,j=void 0!==S&&S,M=(0,_.useTranslations)("LinkedWalletModal"),{setIsLinkedWalletModalOpen:N,setIsAddingNewWallet:L}=(0,P.useLinkedWalletModalStore)();b[0]===Symbol.for("react.memo_cache_sentinel")?(r={query:z},b[0]=r):r=b[0];let[I]=(0,s.useQuery)(r),{data:B}=I,q=B?.maxWalletsLinked??10,R=T>=q;b[1]!==N?(n=()=>{N(!1)},b[1]=N,b[2]=n):n=b[2],b[3]!==M?(i=M("back"),b[3]=M,b[4]=i):i=b[4],b[5]!==n||b[6]!==i?(o=(0,t.jsx)(h.ModalFooterButton,{className:"w-full",onClick:n,variant:"secondary",children:i}),b[5]=n,b[6]=i,b[7]=o):o=b[7],b[8]!==q||b[9]!==M?(l=M("atMostWalletLinked",{count:q}),b[8]=q,b[9]=M,b[10]=l):l=b[10];let W=j||!R,D=j||R;b[11]!==L?(c=()=>{L(!0)},b[11]=L,b[12]=c):c=b[12],b[13]!==M?(d=M("addWallet"),b[13]=M,b[14]=d):d=b[14],b[15]!==D||b[16]!==c||b[17]!==d?(u=(0,t.jsx)("span",{className:"w-full",children:(0,t.jsx)(h.ModalFooterButton,{disabled:D,onClick:c,variant:"primary",children:d})}),b[15]=D,b[16]=c,b[17]=d,b[18]=u):u=b[18],b[19]!==u||b[20]!==l||b[21]!==W?(m=(0,t.jsx)(O.Tooltip,{className:"max-w-[400px]",content:l,disabled:W,children:u}),b[19]=u,b[20]=l,b[21]=W,b[22]=m):m=b[22],b[23]!==m||b[24]!==o?(p=(0,t.jsx)(g.Media,{greaterThanOrEqual:"md",children:(0,t.jsxs)(h.ModalFooter,{className:"gap-3",children:[o,m]})}),b[23]=m,b[24]=o,b[25]=p):p=b[25],b[26]!==q||b[27]!==M?(y=M("atMostWalletLinked",{count:q}),b[26]=q,b[27]=M,b[28]=y):y=b[28];let V=j||!R,H=j||R;return b[29]!==L?(f=()=>{L(!0)},b[29]=L,b[30]=f):f=b[30],b[31]===Symbol.for("react.memo_cache_sentinel")?(A=(0,t.jsx)(E.Add,{size:20}),b[31]=A):A=b[31],b[32]!==M?(C=M("addWallet"),b[32]=M,b[33]=C):C=b[33],b[34]!==C?(w=(0,t.jsxs)(U.FlexCenter,{className:"gap-2",children:[A,C]}),b[34]=C,b[35]=w):w=b[35],b[36]!==H||b[37]!==f||b[38]!==w?(v=(0,t.jsx)("span",{className:"w-full",children:(0,t.jsx)(h.ModalFooterButton,{disabled:H,onClick:f,variant:"secondary",children:w})}),b[36]=H,b[37]=f,b[38]=w,b[39]=v):v=b[39],b[40]!==y||b[41]!==V||b[42]!==v?(x=(0,t.jsx)(g.Media,{lessThan:"md",children:(0,t.jsx)(h.ModalFooter,{className:"gap-3",children:(0,t.jsx)(O.Tooltip,{className:"max-w-[400px]",content:y,disabled:V,children:v})})}),b[40]=y,b[41]=V,b[42]=v,b[43]=x):x=b[43],b[44]!==p||b[45]!==x?(k=(0,t.jsxs)(t.Fragment,{children:[p,x]}),b[44]=p,b[45]=x,b[46]=k):k=b[46],k},{fallback:(0,t.jsx)(function(){let e,r,n,s,i,o,l,c,d,u=(0,a.c)(19),m=(0,_.useTranslations)("LinkedWalletModal");return u[0]!==m?(e=m("back"),u[0]=m,u[1]=e):e=u[1],u[2]!==e?(r=(0,t.jsx)(h.ModalFooterButton,{className:"w-full",variant:"secondary",children:e}),u[2]=e,u[3]=r):r=u[3],u[4]!==m?(n=m("addWallet"),u[4]=m,u[5]=n):n=u[5],u[6]!==n?(s=(0,t.jsx)(h.ModalFooterButton,{variant:"primary",children:n}),u[6]=n,u[7]=s):s=u[7],u[8]!==r||u[9]!==s?(i=(0,t.jsx)(g.Media,{greaterThanOrEqual:"md",children:(0,t.jsxs)(h.ModalFooter,{className:"gap-3",children:[r,s]})}),u[8]=r,u[9]=s,u[10]=i):i=u[10],u[11]===Symbol.for("react.memo_cache_sentinel")?(o=(0,t.jsx)(E.Add,{size:20}),u[11]=o):o=u[11],u[12]!==m?(l=m("addWallet"),u[12]=m,u[13]=l):l=u[13],u[14]!==l?(c=(0,t.jsx)(g.Media,{lessThan:"md",children:(0,t.jsx)(h.ModalFooter,{className:"gap-3",children:(0,t.jsx)(h.ModalFooterButton,{variant:"secondary",children:(0,t.jsxs)(U.FlexCenter,{className:"gap-2",children:[o,l]})})})}),u[14]=l,u[15]=c):c=u[15],u[16]!==i||u[17]!==c?(d=(0,t.jsxs)(t.Fragment,{children:[i,c]}),u[16]=i,u[17]=c,u[18]=d):d=u[18],d},{})});var H=e.i(49878),$=e.i(414122),G=e.i(40485),Q=e.i(922013),Z=e.i(919389),K=e.i(155757),X=e.i(46897),Y=e.i(683269),J=e.i(838996),ee=e.i(987212),et=e.i(922345),ea=e.i(584502),er=e.i(98916),en=e.i(261759),es=e.i(320163),ei=e.i(821303),eo=e.i(392877);function el({fromConnector:e,address:a}){let r=(0,_.useTranslations)("SwitchWalletsModalContent"),n=e.supportsAutoSwitching,{showErrorMessage:s}=(0,Y.useToasts)(),{disconnect:i}=(0,et.useDisconnect)(),{connect:o}=(0,ee.useConnect)({isLinking:!0}),[c,u]=(0,F.useState)(!1),m=async()=>{try{await i(e,{endSession:!1})}finally{u(!0)}};(0,F.useEffect)(()=>{let n=async(l=!0)=>{try{let{address:n}=await o(e,{switchOnConnect:!1});if((0,A.isAddressEqual)(n,a))return void s((0,t.jsxs)(d.FlexColumn,{children:[(0,t.jsx)(X.ToastTitle,{children:r("addressDidNotChange")}),(0,t.jsx)(X.ToastDescription,{size:"xs",children:r("switchInExtension",{connectorName:e.name})})]}),{})}catch(t){if(l){await i(e,{endSession:!1}),await n(!1);return}s(r("failedToSwitchWallet"),{duration:1e4}),(0,er.captureException)(t,{extra:{connector:e},tags:{source:"SwitchWalletsModalContent"}})}finally{u(!1)}};c&&n()},[o,c]);let{profile:g}=(0,eo.useConnectedAccountProfile)(a),y=(0,ei.useRenderUsdBalance)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(h.ModalHeader,{className:"flex justify-center pt-7 pb-1",children:(0,t.jsx)(l.CenterAligned,{className:"gap-4",children:(0,t.jsxs)(l.CenterAligned,{className:"gap-6",children:[(0,t.jsxs)(U.FlexCenter,{className:"gap-4",children:[(0,t.jsx)(l.CenterAligned,{className:"h-16 w-16 rounded-full bg-white",children:e.icon&&(0,t.jsx)(K.Avatar,{size:48,src:e.icon})}),(0,t.jsx)(J.SwapHoriz,{size:24}),(0,t.jsx)(en.AnimatedLogo,{size:60})]}),(0,t.jsx)(h.ModalHeaderTitle,{children:r("title",{connectorName:e.name})})]})})}),(0,t.jsx)(h.ModalBody,{className:"text-center",children:(0,t.jsxs)(l.CenterAligned,{className:"gap-6",children:[(0,t.jsx)(p.TextBody,{className:"text-center",color:"text-secondary",children:n?r("description",{connectorName:e.name}):r("descriptionNoAutoSwitch",{connectorName:e.name})}),(0,t.jsx)("div",{className:"w-full rounded-lg border border-border-1 bg-bg-primary",children:g?(0,t.jsx)(D.LinkedAccountSwitcherItem,{address:g.address,alreadyLinked:!0,avatarSize:32,connected:!!a,description:y(g?.portfolioSummary?.estimatedTokenValue?.usd??void 0),displayName:g?.displayName,imageUrl:g?.imageUrl||void 0,isLink:!1,onClick:void 0,showActions:!1,showCheck:!1,username:g?.username,variant:"full"}):(0,t.jsx)(ea.AccountSwitcherAccountItemsSkeleton,{})}),n&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(es.ProgressChip,{isLoading:!0,variant:"default",children:(0,t.jsx)(p.TextBody,{className:"font-mono",children:r("switchInProgress")})})})]})}),(0,t.jsx)(h.ModalFooter,{children:(0,t.jsx)(h.ModalFooterButton,{disabled:c,isLoading:c,onClick:m,variant:n&&a?"secondary":"primary",children:n?a?r("reset"):r("reconnect"):r("confirm")})})]})}let ec=e=>{let r,n=(0,a.c)(22),{connector:s,setConnector:i,linkedWallets:o,onLinked:l,onAccountSwitch:c,onStartEmailLogin:d,onConnected:u,hasLinkedEmbeddedWallet:m}=e,h=void 0!==m&&m,{account:p}=(0,G.useExternalAccount)(),g=(0,_.useTranslations)("LinkNewWalletModalContent"),[y,f]=(0,F.useState)(!1);if(!s){let e,a,r;return n[0]!==u||n[1]!==i?(e=(e,t,a)=>{u(),i(a),Q.ConnectModalActions.reset()},n[0]=u,n[1]=i,n[2]=e):e=n[2],n[3]!==g?(a=g("linkNewWallet"),n[3]=g,n[4]=a):a=n[4],n[5]!==h||n[6]!==d||n[7]!==e||n[8]!==a?(r=(0,t.jsx)($.ConnectFlowModalContent,{hideEmbeddedWallet:h,isLinking:!0,onConnected:e,onStartEmailLogin:d,switchOnConnect:!1,title:a}),n[5]=h,n[6]=d,n[7]=e,n[8]=a,n[9]=r):r=n[9],r}if(p?.address&&!o.some(e=>(0,A.isAddressEqual)(e,p.address))){let e,a;return n[10]!==i?(e=()=>i(void 0),n[10]=i,n[11]=e):e=n[11],n[12]!==p.address||n[13]!==s||n[14]!==y||n[15]!==c||n[16]!==l||n[17]!==e?(a=(0,t.jsx)(Z.LinkWalletChangeDetectedModalContent,{address:p.address,connector:s,isSwitchingAccounts:y,onAccountSwitch:c,onLinked:l,onResetConnector:e,setIsSwitchingAccounts:f}),n[12]=p.address,n[13]=s,n[14]=y,n[15]=c,n[16]=l,n[17]=e,n[18]=a):a=n[18],a}let C=p?.address;return n[19]!==s||n[20]!==C?(r=(0,t.jsx)(el,{address:C,fromConnector:s}),n[19]=s,n[20]=C,n[21]=r):r=n[21],r},ed=(0,r.graphql)(`
    query LinkedWalletModalQuery($address: Address!) {
      profilesByAccount(address: $address) {
        profiles {
          ... on Profile {
            ...AccountSwitcherAccountItems
          }
        }
        account {
          ... on Profile {
            ...AccountSwitcherAccountItems
          }
        }
      }
      walletsByAccount {
        items {
          address
          isPrivate
          label
          lastSeenConnectorId
        }
      }
    }
  `,[M.AccountSwitcherAccountItemsFragment]),eu=(0,I.withSuspense)(()=>{let e=(0,q.useAddress)(),{isLinkedWalletModalOpen:a,setIsLinkedWalletModalOpen:r,setIsAddingNewWallet:n,isAddingNewWallet:s}=(0,P.useLinkedWalletModalStore)(),[i,o]=(0,F.useState)(),[l,d]=(0,F.useState)(!1),u=(0,B.useDisconnect)({source:"LinkedWalletModal"});return e?(0,t.jsx)(h.Modal,{className:(0,c.classNames)({"max-w-[420px]":s&&void 0===i}),content:(0,t.jsx)(eh,{address:e,connector:i,setConnector:o,setEmailLoginActive:d}),disableWidthTransition:!0,onBack:s&&void 0!==i?()=>{o(void 0)}:void 0,onInteractOutside:e=>{s&&void 0!==i&&e.preventDefault()},onOpenChange:async e=>{r(e),e||(l&&await u(),n(!1),o(void 0),d(!1))},open:a,withCloseIcon:!0}):null},{fallback:!1,ssr:!1}),em={suspense:!1,ttl:C.TTL["15s"]};function eh(e){let r,i,c,y,C,x,k,I,B,q,U,O,E,z,$,G,Q,Z,K,X=(0,a.c)(68),{address:Y,connector:J,setConnector:ee,setEmailLoginActive:et}=e,ea=(0,_.useTranslations)("LinkedWalletModal"),er=(0,g.useIsLessThanMd)();X[0]!==Y?(r={query:ed,variables:{address:Y},context:em},X[0]=Y,X[1]=r):r=X[1];let[en,es]=(0,s.useQuery)(r),{data:ei,fetching:eo}=en;(0,v.useMountEffect)(b);let el=(0,T.usePreviouslyConnectedAccounts)(),eu=(0,S.keyBy)(el,ex),{isAddingNewWallet:eh,setIsAddingNewWallet:ek,setIsLinkedWalletModalOpen:eb}=(0,P.useLinkedWalletModalStore)(),eT=(0,R.useAuthenticated)();X[2]!==eT||X[3]!==eb?(i=()=>{eT||eb(!1)},X[2]=eT,X[3]=eb,X[4]=i):i=X[4],X[5]!==eT?(c=[eT],X[5]=eT,X[6]=c):c=X[6],(0,F.useEffect)(i,c);let eS=(0,j.useContextSelector)(L.ProfileSettingsContext,ev);X[7]!==eS?(y=function(e){return eS?(0,t.jsx)(N.AsteriskText,{}):(0,t.jsx)(o.AnimatedNumber,{display:"usd",value:e})},X[7]=eS,X[8]=y):y=X[8];let e_=y;X[9]!==ei?.walletsByAccount?.items?(C=ei?.walletsByAccount?.items??[],X[9]=ei?.walletsByAccount?.items,X[10]=C):C=X[10];let eF=C,ej=(0,S.keyBy)(eF,ew);X[11]!==eF?(x=eF.some(eC),X[11]=eF,X[12]=x):x=X[12];let eM=x;X[13]!==ei?.profilesByAccount?.profiles?(k=ei?.profilesByAccount?.profiles??[],X[13]=ei?.profilesByAccount?.profiles,X[14]=k):k=X[14];let eN=k.filter(eA).map(ef).sort((e,t)=>{let a=ej[(0,A.normalizeAddress)(e.address)],r=ej[(0,A.normalizeAddress)(t.address)],n=a?.isPrivate??!1;if(n!==(r?.isPrivate??!1))return n?1:-1;let s=e.portfolioSummary?.estimatedTokenValue?.usd??-1;return(t.portfolioSummary?.estimatedTokenValue?.usd??-1)-s}),eL=ei?.profilesByAccount?.account;if(eL&&"Profile"===eL.__typename){let e;X[15]!==eL?(e=(0,n.readFragment)(M.AccountSwitcherAccountItemsFragment,eL),X[15]=eL,X[16]=e):e=X[16],I=e}let eI=eN.map(ey);if(eh){let e,a,r,n,s;return X[17]!==et||X[18]!==eb?(e=()=>{et(!1),eb(!1)},X[17]=et,X[18]=eb,X[19]=e):e=X[19],X[20]!==et?(a=()=>{et(!1)},X[20]=et,X[21]=a):a=X[21],X[22]!==es||X[23]!==ee||X[24]!==et||X[25]!==ek?(r=()=>{es({requestPolicy:"network-only"}),ek(!1),ee(void 0),et(!1)},X[22]=es,X[23]=ee,X[24]=et,X[25]=ek,X[26]=r):r=X[26],X[27]!==et?(n=()=>{et(!0)},X[27]=et,X[28]=n):n=X[28],X[29]!==J||X[30]!==eM||X[31]!==eI||X[32]!==ee||X[33]!==a||X[34]!==r||X[35]!==n||X[36]!==e?(s=(0,t.jsx)(ec,{connector:J,hasLinkedEmbeddedWallet:eM,linkedWallets:eI,onAccountSwitch:e,onConnected:a,onLinked:r,onStartEmailLogin:n,setConnector:ee}),X[29]=J,X[30]=eM,X[31]=eI,X[32]=ee,X[33]=a,X[34]=r,X[35]=n,X[36]=e,X[37]=s):s=X[37],s}X[38]===Symbol.for("react.memo_cache_sentinel")?(B=(0,t.jsx)(u.IconCallout,{className:"rounded-full",icon:f,size:36,variant:"outlined"}),X[38]=B):B=X[38],X[39]!==ea?(q=ea("title"),X[39]=ea,X[40]=q):q=X[40],X[41]!==q?(U=(0,t.jsx)(h.ModalHeader,{className:"justify-center",children:(0,t.jsxs)(l.CenterAligned,{className:"gap-4",children:[B,(0,t.jsx)(h.ModalHeaderTitle,{children:q})]})}),X[41]=q,X[42]=U):U=X[42];let eB=h.ModalBody;X[43]!==ea?(O=ea.rich("description",{learnMore:eg}),X[43]=ea,X[44]=O):O=X[44],X[45]!==O?(E=(0,t.jsx)(d.FlexColumn,{className:"shrink-0 gap-2",children:(0,t.jsx)(p.TextBody,{color:"text-secondary",children:O})}),X[45]=O,X[46]=E):E=X[46];let eq=d.FlexColumn,eR=I?(0,t.jsx)("div",{className:"mb-2 rounded-lg border border-border-1 bg-bg-primary",children:(0,t.jsx)(W.AccountSwitcherTopAccount,{account:I,isLink:!1,usdTotalValue:eN.reduce(ep,0),variant:"full",walletCount:eN.length})}):null;X[47]!==ea?(z=ea("yourLinkedWallets"),X[47]=ea,X[48]=z):z=X[48],X[49]!==z?($=(0,t.jsx)(p.TextBody,{className:"text-left",size:"sm",weight:"semibold",children:z}),X[49]=z,X[50]=$):$=X[50];let eP=eo?(0,t.jsx)(H.LinkedWalletsSkeletons,{}):eN.length>0?(0,t.jsx)(m.List,{className:"rounded-lg border border-border-1 bg-bg-primary","data-testid":"linked-wallets-list",showBorder:!1,children:eN.map(e=>{let a=(0,A.normalizeAddress)(e.address),r=ej[a],n=r?.lastSeenConnectorId,s=r?.isPrivate,i=eu[a],o=(0,w.normalizeConnectorId)(n)||(0,w.normalizeConnectorId)(i?.connectorId);return(0,t.jsx)(D.LinkedAccountSwitcherItem,{address:e.address,avatarSize:20,className:"h-16 px-4 md:h-12",connectorId:o,description:e_(e.portfolioSummary?.estimatedTokenValue?.usd??void 0),displayName:e.displayName,imageUrl:e.imageUrl,isLink:!1,isPrivate:s,label:r?.label,linkedWalletsCount:eN.length,onClick:void 0,onRefresh:()=>{es({requestPolicy:"network-only"})},showActions:!0,showCheck:!1,showUnlinkOnly:!0,username:e.username,variant:er?"compact":"full"},e.address)})}):(0,t.jsx)(p.TextBody,{color:"text-secondary",size:"sm",children:ea("noWalletsLinked")});return X[51]!==eq||X[52]!==eR||X[53]!==$||X[54]!==eP?(G=(0,t.jsxs)(eq,{className:"min-h-0 flex-1 gap-2 overflow-y-auto",children:[eR,$,eP]}),X[51]=eq,X[52]=eR,X[53]=$,X[54]=eP,X[55]=G):G=X[55],X[56]!==eB||X[57]!==E||X[58]!==G?(Q=(0,t.jsxs)(eB,{className:"flex flex-1 flex-col gap-6 overflow-hidden text-center",children:[E,G]}),X[56]=eB,X[57]=E,X[58]=G,X[59]=Q):Q=X[59],X[60]!==eo||X[61]!==eM||X[62]!==eI.length?(Z=(0,t.jsx)(V,{fetching:eo,hasLinkedEmbeddedWallet:eM,linkedWalletsCount:eI.length}),X[60]=eo,X[61]=eM,X[62]=eI.length,X[63]=Z):Z=X[63],X[64]!==U||X[65]!==Q||X[66]!==Z?(K=(0,t.jsxs)(t.Fragment,{children:[U,Q,Z]}),X[64]=U,X[65]=Q,X[66]=Z,X[67]=K):K=X[67],K}function ep(e,t){return e+(t.portfolioSummary?.estimatedTokenValue?.usd??0)}function eg(e){return(0,t.jsx)(i.Link,{href:"https://support.opensea.io/articles/12270237-how-can-i-link-multiple-wallets-to-one-opensea-account",rel:"noopener noreferrer",target:"_blank",children:e})}function ey(e){return e.address}function ef(e){return(0,n.readFragment)(M.AccountSwitcherAccountItemsFragment,e)}function eA(e){return e?.__typename==="Profile"}function eC(e){return(0,w.isEmbeddedWalletConnector)(e.lastSeenConnectorId)}function ew(e){return(0,A.normalizeAddress)(e.address)}function ev(e){return e.hideWalletWorth}function ex(e){return(0,A.normalizeAddress)(e.address)}e.s(["LinkedWalletModal",0,eu],638183)},400729,e=>{e.n(e.i(638183))}]);

//# debugId=c9b6aaa3-3528-9905-48a1-fdde3947f8e0
//# sourceMappingURL=865addbae98a8ef7.js.map