;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="f199aa83-3bdb-8370-0507-f42110a8e6ae")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,630068,e=>{"use strict";var t=e.i(866313),a=e.i(594445),r=e.i(230834),n=e.i(248452),i=e.i(176772),s=e.i(609900);function o(){let e,o,c,l=(0,t.c)(9),d=(0,a.useIsHydrated)(),u=(0,s.useFlag)("smartWalletEnabled"),m=(0,i.useIsEmbeddedWallet)(),{primaryAccount:p}=(0,n.useAccount)(),g=p?.accountId;l[0]===Symbol.for("react.memo_cache_sentinel")?(e={},l[0]=e):e=l[0];let[h,y]=(0,r.useLocalStorage)("user-operations-enabled",e),C=!!(g&&d&&(h[g]??!0)),A=!!(u&&C&&m);l[1]!==g||l[2]!==d||l[3]!==y?(o=e=>{d&&g&&y(t=>({...t,[g]:e}))},l[1]=g,l[2]=d,l[3]=y,l[4]=o):o=l[4];let _=o;return l[5]!==d||l[6]!==A||l[7]!==_?(c={isUserOperationsEnabled:A,setUserOperationsEnabled:_,ready:d},l[5]=d,l[6]=A,l[7]=_,l[8]=c):c=l[8],c}e.s(["useUserOperationsEnabled",()=>o])},282726,e=>{"use strict";var t=e.i(885530),a=e.i(52494);let r=(0,t.graphql)(`
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
`),i=(0,t.graphql)(`
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
`),s=(0,t.graphql)(`
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
  `,[r,n,i,s,a.flowCallbackStore_actionFragment]);e.s(["useScheduler_actionFragment",0,o,"useScheduler_signatureRequestFragment",0,r,"useScheduler_svmTransactionSubmissionDataFragment",0,i,"useScheduler_transactionSubmissionDataFragment",0,n])},269775,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
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
`,[r]);e.s(["ActionTimelineItemFragment",0,n],999413);let i=(0,t.graphql)(`
    fragment ActionTimeline on BlockchainAction {
      __typename
      ...useScheduler_action
      ...ActionTimelineItem
    }
  `,[a.useScheduler_actionFragment,n]);e.s(["ActionTimelineFragment",0,i],332238)},57465,e=>{"use strict";var t=e.i(885530),a=e.i(600028);let r=(0,t.graphql)(`
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
`),i=(0,t.graphql)(`
  fragment SortRewardsByValue_token on UserTokenReward {
    __typename
    id
    balance {
      usdValue
    }
  }
`);function s(e){if("UserTokenReward"===e.__typename){let t=(0,a.readFragment)(i,e);return(0,r.bn)(t.balance?.usdValue??0).toNumber()}let t=(0,a.readFragment)(n,e);return(0,r.bn)(t.item?.bestOffer?.pricePerItem?.usd??0).toNumber()}function o(e,t){return[...e.map(e=>({original:e,sortData:(0,a.readFragment)(n,e)})),...t.map(e=>({original:e,sortData:(0,a.readFragment)(i,e)}))].sort((e,t)=>s(e.sortData)-s(t.sortData)).map(({original:e})=>e)}e.s(["SortRewardsByValue_itemFragment",0,n,"SortRewardsByValue_tokenFragment",0,i,"sortRewardsByValue",()=>o])},279155,e=>{"use strict";var t=e.i(81810),a=e.i(885530),r=e.i(111908);let n=(0,a.graphql)(`
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
`);e.s(["TreasureRewardMediaFragment",0,t])},731049,845139,589534,320464,295165,731950,553919,e=>{"use strict";var t=e.i(885530),a=e.i(682576),r=e.i(201578),n=e.i(959105);e.i(661049);var i=e.i(190519),s=e.i(846428),o=e.i(57465);let c=(0,t.graphql)(`
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
  `,[a.CollectionLockupFragment,r.CollectionPreviewTooltipFragment]);e.s(["GrandPrizeModalFragment",0,c],845139);let l=(0,t.graphql)(`
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
  `,[a.CollectionLockupFragment,s.useBuyItemsFragment,i.ItemLinkFragment,n.CollectionLinkFragment,r.CollectionPreviewTooltipFragment,o.ItemRewardMediaFragment,c]);e.s(["ItemRewardCardFragment",0,l],589534);var d=e.i(234761),u=e.i(767502),m=e.i(332238),p=e.i(622540),g=e.i(279155);let h=(0,t.graphql)(`
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
  `,[m.ActionTimelineFragment,u.ContextCurrencyFragment,g.TokenRewardMediaFragment,p.useActionsNetworkFees_actionFragment]);e.s(["TokenRewardCardFragment",0,h],320464);var y=e.i(186869);let C=(0,t.graphql)(`
    fragment TreasureRewardCard on Badge {
      id
      name
      description
      ...TreasureRewardMedia
    }
  `,[y.TreasureRewardMediaFragment]);e.s(["TreasureRewardCardFragment",0,C],295165);let A=(0,t.graphql)(`
    fragment OpenTreasureChestModal_treasure on Badge {
      __typename
      id
      name
      ...TreasureRewardCard
    }
  `,[C]),_=(0,t.graphql)(`
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
  `,[l,d.SortRewardsByValue_itemFragment,h,d.SortRewardsByValue_tokenFragment,A]);e.s(["OpenTreasureChestModalFragment",0,_,"OpenTreasureChestModal_treasureFragment",0,A],731950);let f=(0,t.graphql)(`
    fragment OpenChestButton_treasure on Badge {
      name
      ...OpenTreasureChestModal_treasure
    }
  `,[A]),w=(0,t.graphql)(`
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
  `,[_,f]);e.s(["OpenChestButtonFragment",0,w,"OpenChestButton_treasureFragment",0,f],731049);let v=(0,t.graphql)(`
  fragment TreasureChestWave on TreasureChest {
    id
    name
    waveName
  }
`);e.s(["TreasureChestWaveFragment",0,v],553919)},287342,293108,e=>{"use strict";var t=e.i(885530),a=e.i(455480),r=e.i(700398),n=e.i(630068),i=e.i(670383),s=e.i(731950),o=e.i(731049),c=e.i(553919);let l=(0,t.graphql)(`
    fragment TreasureChestContent on TreasureChest {
      id
      ...TreasureChestWave
      ...OpenChestButton
      chestLevels {
        level
        pointsRequired
      }
    }
  `,[c.TreasureChestWaveFragment,o.OpenChestButtonFragment]);e.s(["TreasureChestContentFragment",0,l],293108),e.i(402819);var d=e.i(916744),u=e.i(207225),m=e.i(598777);let p=(0,t.graphql)(`
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
  `,[l,c.TreasureChestWaveFragment,s.OpenTreasureChestModalFragment]),g=(0,t.graphql)(`
    subscription UseActiveTreasureChestsProgress(
      $accountId: String!
      $addresses: [Address!]
    ) {
      userTreasureChestProgress(accountId: $accountId, addresses: $addresses) {
        totalPoints
      }
    }
  `);function h(){let e=(0,r.usePrimaryAccount)(),t=(0,u.useAddress)(),{isUserOperationsEnabled:o,ready:c}=(0,n.useUserOperationsEnabled)(),[l,h]=(0,m.useAuthenticatedQuery)({query:p,variables:{capabilities:{eip7702:o}},pause:!(t&&c)}),{data:y,...C}=l,A=y?.activeTreasureChests?.items??[],_=A.at(0),f=(0,i.useMemo)(()=>{if(!_)return;let e=(0,a.readFragment)(s.OpenTreasureChestModalFragment,_);if(e.userProgress)return{totalPoints:e.userProgress.totalPoints,hasExceededLevelCap:e.userProgress.hasExceededLevelCap,currentLevel:e.userProgress.currentLevel,currentTier:e.userProgress.currentTier,levelProgressPercent:e.userProgress.levelProgressPercent,minimumVoyageChestLevel:e.userProgress.minimumVoyageChestLevel}},[_]);return(0,d.useSubscription)({query:g,variables:{accountId:e?.accountId??"",addresses:t?[t]:void 0},pause:!(e?.accountId&&t),pauseOnInactivity:!1},()=>{h({requestPolicy:"network-only"})}),{activeTreasureChests:A,activeTreasureChest:_,userProgress:f,...C,refetch:h,refetchProgress:()=>{t&&h({requestPolicy:"network-only"})}}}e.s(["useActiveTreasureChests",()=>h],287342)},127574,e=>{"use strict";var t=e.i(223458);function a(){return()=>{t.AccountActions.refreshLinkedAccounts()}}e.s(["useRefreshLinkedAccounts",()=>a])},919389,40485,392877,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(155757),n=e.i(194153),i=e.i(39771),s=e.i(838820),o=e.i(972483),c=e.i(950293),l=e.i(683269),d=e.i(838996),u=e.i(654469),m=e.i(922345),p=e.i(861316),g=e.i(101219),h=e.i(987212),y=e.i(901562),C=e.i(223458);let A=()=>{let e,t,r=(0,a.c)(8),{externalAccount:n}=(0,g.useSnapshot)(C.AccountState),{connect:i,isConnecting:s}=(0,h.useConnect)(),o=(0,y.useConnections)();r[0]!==i||r[1]!==o||r[2]!==n?(e=async()=>{if(!n)return;let e=o.find(e=>e.addresses.some(e=>(0,p.isAddressEqual)(e,n.address)));e&&(C.AccountActions.setAccount(n),await i(e.connector,{address:n.address,switchOnConnect:!0}),C.AccountActions.setExternalAccount(void 0))},r[0]=i,r[1]=o,r[2]=n,r[3]=e):e=r[3];let c=e;return r[4]!==c||r[5]!==n||r[6]!==s?(t={account:n,connect:c,isConnecting:s},r[4]=c,r[5]=n,r[6]=s,r[7]=t):t=r[7],t};e.s(["useExternalAccount",0,A],40485);var _=e.i(81311),f=e.i(845016),w=e.i(522285),v=e.i(670383),T=e.i(389852),k=e.i(261759),F=e.i(46486),S=e.i(821303),b=e.i(752443),I=e.i(514870),R=e.i(146281),q=e.i(977839),M=e.i(287342),B=e.i(751712),L=e.i(925252);let P=({address:e,onLinked:t,onAlreadyLinked:r})=>{let n,i,s,o,c=(0,w.useTranslations)("useLinkWallet"),{showErrorMessage:d,showSuccessMessage:u}=(0,l.useToasts)(),m=(i=(0,a.c)(3),s=(0,R.useEvmSignFunction)(),o=(0,q.useSvmSignFunction)(),i[0]!==s||i[1]!==o?(n=async e=>{let{connector:t,message:a,address:r}=e;switch(!t.baseConnector.connected&&await t.baseConnector.connect(),t.chainArch){case"EVM":return s({connector:t,message:a,address:r});case"SVM":return o({connector:t,message:a,address:r})}},i[0]=s,i[1]=o,i[2]=n):n=i[2],n),[g,h]=(0,v.useState)(!1),C=(0,y.useConnections)(),{refetchProgress:A}=(0,M.useActiveTreasureChests)();return{linkWallet:(0,B.useAuthenticatedCallback)(async({force:a}={})=>{h(!0);try{let n,i=C.find(t=>t.addresses.some(t=>(0,p.isAddressEqual)(t,e)));if(!i)return void d(c("couldNotFindConnection"));if(i.connector.id===I.EMBEDDED_WALLET_CONNECTOR_ID){let e=await (0,b.getUser)();if("string"==typeof e)throw Error(`Failed to get user: ${e}`);n=await L.accountsAdapter.linkPrivyWallet({token:e.accessToken,force:a})}else{let t=await L.accountsAdapter.createSIWXMessage(e,i),r=await m({connector:i.connector,address:e,message:t});n=await L.accountsAdapter.linkWallet({connection:i,signature:r,message:t,force:a})}if(n.success)u(c("walletLinkedSuccessfully"),{duration:1e4}),A(),t();else{if(r&&"ALREADY_LINKED"===n.code)return void r();d(n.message??c("failedToLinkWallet"),{duration:1e4})}}catch(e){d((0,f.isError)(e)?e.message:c("failedToLinkWallet"),{duration:1e4})}finally{h(!1)}}),isLinking:g}},x=e=>{let r,n,i,c,l,d,u,m,p,g,h,y,C=(0,a.c)(32),{address:A,goBack:_,onLinked:f}=e,v=(0,w.useTranslations)("MoveLinkedWalletModalContent");C[0]!==A||C[1]!==f?(r={address:A,onLinked:f},C[0]=A,C[1]=f,C[2]=r):r=C[2];let{linkWallet:T,isLinking:k}=P(r);return C[3]!==v?(n=v("title"),C[3]=v,C[4]=n):n=C[4],C[5]!==n?(i=(0,t.jsx)(o.ModalHeader,{className:"text-center",children:(0,t.jsx)(o.ModalHeaderTitle,{className:"text-center",children:n})}),C[5]=n,C[6]=i):i=C[6],C[7]!==A||C[8]!==v?(c=v("description",{address:(0,s.formatAddress)(A)}),C[7]=A,C[8]=v,C[9]=c):c=C[9],C[10]!==c?(l=(0,t.jsx)(o.ModalBody,{className:"flex flex-col gap-6",children:c}),C[10]=c,C[11]=l):l=C[11],C[12]!==v?(d=v("no"),C[12]=v,C[13]=d):d=C[13],C[14]!==_||C[15]!==d?(u=(0,t.jsx)(o.ModalFooterButton,{onClick:_,variant:"secondary",children:d}),C[14]=_,C[15]=d,C[16]=u):u=C[16],C[17]!==T?(m=()=>{T({force:!0})},C[17]=T,C[18]=m):m=C[18],C[19]!==v?(p=v("yesMoveWallet"),C[19]=v,C[20]=p):p=C[20],C[21]!==k||C[22]!==m||C[23]!==p?(g=(0,t.jsx)(o.ModalFooterButton,{autoFocus:!0,disabled:k,isLoading:k,onClick:m,variant:"primary",children:p}),C[21]=k,C[22]=m,C[23]=p,C[24]=g):g=C[24],C[25]!==g||C[26]!==u?(h=(0,t.jsxs)(o.ModalFooter,{children:[u,g]}),C[25]=g,C[26]=u,C[27]=h):h=C[27],C[28]!==h||C[29]!==i||C[30]!==l?(y=(0,t.jsxs)(t.Fragment,{children:[i,l,h]}),C[28]=h,C[29]=i,C[30]=l,C[31]=y):y=C[31],y};var D=e.i(885530),N=e.i(333799);let U=(0,D.graphql)(`
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
`);function O(e){let t,r,n,i,s=(0,a.c)(9);s[0]!==e?(t={addresses:e?[(0,p.normalizeAddress)(e)]:[]},s[0]=e,s[1]=t):t=s[1],s[2]===Symbol.for("react.memo_cache_sentinel")?(r={suspense:!1},s[2]=r):r=s[2];let o=!e;s[3]!==t||s[4]!==o?(n={query:U,variables:t,context:r,pause:o},s[3]=t,s[4]=o,s[5]=n):n=s[5];let[c]=(0,N.useQuery)(n),{data:l,fetching:d}=c,u=l?.walletProfilesByAddresses?.[0],m=u?.__typename==="Profile"?u:null;return s[6]!==d||s[7]!==m?(i={profile:m,fetching:d},s[6]=d,s[7]=m,s[8]=i):i=s[8],i}e.s(["useConnectedAccountProfile",()=>O],392877);let j=e=>{let r,n,i,s=(0,a.c)(10),{address:c,onLinked:l,onAlreadyLinked:d}=e,u=(0,w.useTranslations)("LinkWalletChangeDetectedModalContent");s[0]!==c||s[1]!==d||s[2]!==l?(r={address:c,onLinked:l,onAlreadyLinked:d},s[0]=c,s[1]=d,s[2]=l,s[3]=r):r=s[3];let{linkWallet:m,isLinking:p}=P(r);return s[4]!==u?(n=u("linkWalletToAccount"),s[4]=u,s[5]=n):n=s[5],s[6]!==p||s[7]!==m||s[8]!==n?(i=(0,t.jsx)(o.ModalFooterButton,{autoFocus:!0,disabled:p,isLoading:p,onClick:m,variant:"primary",children:n}),s[6]=p,s[7]=m,s[8]=n,s[9]=i):i=s[9],i},E=(0,T.withSuspense)(({address:e,connector:a,isSwitchingAccounts:p,onAccountSwitch:g,onLinked:h,onResetConnector:y,setIsSwitchingAccounts:C})=>{let T=(0,w.useTranslations)("LinkWalletChangeDetectedModalContent"),[b,I]=(0,v.useState)(!1),{showErrorMessage:R}=(0,l.useToasts)(),{connect:q}=A(),{disconnect:M}=(0,m.useDisconnect)(),B=(0,S.useRenderUsdBalance)(),{logout:L}=(0,_.useLogout)(),P=(0,u.useAuthenticateFlow)(),{profile:D}=O(e);return b?(0,t.jsx)(x,{address:e,goBack:()=>I(!1),onLinked:h}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.ModalHeader,{className:"flex justify-center pt-7 pb-1",children:(0,t.jsxs)(n.CenterAligned,{className:"gap-6",children:[(0,t.jsx)(i.FlexCenter,{className:"gap-4",children:"embedded"===a.type?(0,t.jsx)(k.AnimatedLogo,{size:60}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.CenterAligned,{className:"h-16 w-16 rounded-full bg-white",children:a.icon&&(0,t.jsx)(r.Avatar,{size:48,src:a.icon})}),(0,t.jsx)(d.SwapHoriz,{size:24}),(0,t.jsx)(k.AnimatedLogo,{size:60})]})}),(0,t.jsx)(o.ModalHeaderTitle,{children:T("title")})]})}),(0,t.jsxs)(o.ModalBody,{className:"flex flex-col gap-6",children:[(0,t.jsx)(c.TextBody,{className:"text-center",color:"text-secondary",children:T("description1",{address:(0,s.formatAddress)(e)})}),(0,t.jsx)("div",{className:"rounded-lg border border-border-1 bg-bg-primary","data-address":e,children:(0,t.jsx)(F.LinkedAccountSwitcherItem,{address:e,avatarSize:32,description:B(D?.portfolioSummary?.estimatedTokenValue?.usd??void 0),displayName:D?.displayName,imageUrl:D?.imageUrl||void 0,isLink:!1,onClick:void 0,showActions:!1,showCheck:!1,showNotLinked:!0,username:D?.username,variant:"full"})})]}),(0,t.jsxs)(o.ModalFooter,{children:[(0,t.jsx)(o.ModalFooterButton,{disabled:p,isLoading:p,onClick:async()=>{try{if(C(!0),await L(),"embedded"===a.type&&y){await M(a,{endSession:!1}),y();return}await q(),P({autoPromptSiwe:!0,onAuthenticated:g})}catch(e){R((0,f.isError)(e)?e.message:"Failed to log in")}finally{C(!1)}},variant:"secondary",children:T("switchAccounts")}),(0,t.jsx)(j,{address:e,onAlreadyLinked:()=>I(!0),onLinked:h})]})]})},{fallback:null});e.s(["LinkWalletChangeDetectedModalContent",0,E],919389)},533400,e=>{"use strict";var t=e.i(7683),a=e.i(866313),r=e.i(971823),n=e.i(972483),i=e.i(35720),s=e.i(437464),o=e.i(861316),c=e.i(765778),l=e.i(248452),d=e.i(174258),u=e.i(330047),m=e.i(347352),p=e.i(771736),g=e.i(127574),h=e.i(258401),y=e.i(670383),C=e.i(180909);e.i(500598);var A=e.i(207225),_=e.i(71105),f=e.i(864102),w=e.i(919389);e.s(["AccountSwitchDetectedFlow",0,()=>{let e,v,T,k,F,S,b,I,R,q=(0,a.c)(32),M=(0,r.usePathname)(),B=(0,A.useAddress)(),L=(0,u.useIsReady)()&&!!B,P=(0,_.useAuthenticated)(),{syncAuth:x}=(0,h.useSyncAuth)(),{hasAcceptedTerms:D}=(0,l.useAccount)(),{activeConnector:N}=(0,d.useConnectors)();q[0]===Symbol.for("react.memo_cache_sentinel")?(e={source:"AccountSwitchDetectedFlow"},q[0]=e):e=q[0];let U=(0,C.useDisconnect)(e),O=(0,s.useVisibilityChange)(),j=(0,g.useRefreshLinkedAccounts)(),E=(0,m.useLinkedAccounts)(),W=(0,p.useLinkedAccountsError)(),[V,z]=(0,y.useState)(!1),H=M.includes(f.TopLevelPath.careers),$=(0,c.isEmbeddedWalletConnector)(N?.id);q[1]!==B||q[2]!==P||q[3]!==L||q[4]!==D||q[5]!==$||q[6]!==H||q[7]!==V||q[8]!==E||q[9]!==W?(v=!(H||$)&&(L&&!0===P||V)&&!0===D&&!!B&&void 0!==E&&!W&&!E.some(e=>(0,o.isAddressEqual)(e.address,B)),q[1]=B,q[2]=P,q[3]=L,q[4]=D,q[5]=$,q[6]=H,q[7]=V,q[8]=E,q[9]=W,q[10]=v):v=q[10];let G=v;q[11]!==j||q[12]!==x?(T=()=>{x(),j()},q[11]=j,q[12]=x,q[13]=T):T=q[13];let K=T;return q[14]!==K?(k=()=>{K()},q[14]=K,q[15]=k):k=q[15],(0,i.useOnChange)(B,k),q[16]!==O||q[17]!==G||q[18]!==K?(F=()=>{if(G&&O){let e=setInterval(()=>{K()},2e3);return()=>{clearInterval(e)}}},S=[G,O,K],q[16]=O,q[17]=G,q[18]=K,q[19]=F,q[20]=S):(F=q[19],S=q[20]),(0,y.useEffect)(F,S),q[21]!==N||q[22]!==B||q[23]!==V||q[24]!==j?(b=B&&N?(0,t.jsx)(w.LinkWalletChangeDetectedModalContent,{address:B,connector:N,isSwitchingAccounts:V,onAccountSwitch:()=>{j()},onLinked:()=>{j()},setIsSwitchingAccounts:z}):null,q[21]=N,q[22]=B,q[23]=V,q[24]=j,q[25]=b):b=q[25],q[26]!==U?(I=e=>{e||U()},q[26]=U,q[27]=I):I=q[27],q[28]!==G||q[29]!==b||q[30]!==I?(R=(0,t.jsx)(n.Modal,{className:"md:rounded-xl",content:b,onOpenChange:I,open:G,withCloseIcon:!1}),q[28]=G,q[29]=b,q[30]=I,q[31]=R):R=q[31],R}])},527732,e=>{e.n(e.i(533400))}]);

//# debugId=f199aa83-3bdb-8370-0507-f42110a8e6ae
//# sourceMappingURL=5e86c5ee8c85e713.js.map