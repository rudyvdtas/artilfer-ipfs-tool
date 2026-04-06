;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="96620025-1a46-fa9f-8dad-69761ced5403")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,630068,e=>{"use strict";var t=e.i(866313),r=e.i(594445),n=e.i(230834),a=e.i(248452),i=e.i(176772),s=e.i(609900);function o(){let e,o,c,l=(0,t.c)(9),u=(0,r.useIsHydrated)(),d=(0,s.useFlag)("smartWalletEnabled"),m=(0,i.useIsEmbeddedWallet)(),{primaryAccount:y}=(0,a.useAccount)(),p=y?.accountId;l[0]===Symbol.for("react.memo_cache_sentinel")?(e={},l[0]=e):e=l[0];let[h,g]=(0,n.useLocalStorage)("user-operations-enabled",e),f=!!(p&&u&&(h[p]??!0)),x=!!(d&&f&&m);l[1]!==p||l[2]!==u||l[3]!==g?(o=e=>{u&&p&&g(t=>({...t,[p]:e}))},l[1]=p,l[2]=u,l[3]=g,l[4]=o):o=l[4];let C=o;return l[5]!==u||l[6]!==x||l[7]!==C?(c={isUserOperationsEnabled:x,setUserOperationsEnabled:C,ready:u},l[5]=u,l[6]=x,l[7]=C,l[8]=c):c=l[8],c}e.s(["useUserOperationsEnabled",()=>o])},897496,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment NetworkFeeCurrencySelector_currency on Currency {
    contractAddress
    symbol
    imageUrl
  }
`);e.s(["NetworkFeeCurrencySelector_currencyFragment",0,t])},269775,e=>{"use strict";let t=(0,e.i(885530).graphql)(`
  fragment UserOperationNetworkFees_networkFee on NetworkFee {
    availableCurrencies {
      contractAddress
    }
    usdPriceEstimate
  }
`);e.s(["UserOperationNetworkFees_networkFeeFragment",0,t])},622540,e=>{"use strict";var t=e.i(885530),r=e.i(269775),n=e.i(897496);let a=(0,t.graphql)(`
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
  `,[n.NetworkFeeCurrencySelector_currencyFragment,r.UserOperationNetworkFees_networkFeeFragment]);e.s(["useActionsNetworkFees_actionFragment",0,a])},282726,e=>{"use strict";var t=e.i(885530),r=e.i(52494);let n=(0,t.graphql)(`
  fragment useScheduler_signatureRequest on SignatureRequest {
    __typename
    message
    ... on SignTypedDataRequest {
      chain {
        networkId
      }
    }
  }
`),a=(0,t.graphql)(`
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
  `,[n,a,i,s,r.flowCallbackStore_actionFragment]);e.s(["useScheduler_actionFragment",0,o,"useScheduler_signatureRequestFragment",0,n,"useScheduler_svmTransactionSubmissionDataFragment",0,i,"useScheduler_transactionSubmissionDataFragment",0,a])},590726,e=>{"use strict";var t=e.i(866313),r=e.i(623786),n=e.i(319415);function a(){let e,a=(0,t.c)(2),i=(0,n.useConnectorId)();return a[0]!==i?(e=!!i&&(0,r.isAbstractWalletAccount)(i),a[0]=i,a[1]=e):e=a[1],e}e.s(["useIsAbstractWalletAccount",()=>a])},131832,961584,e=>{"use strict";var t=e.i(167864),r=e.i(135184),n=e.i(77513),a=e.i(149873),i=e.i(897066);function s({chain:e,currentChainId:t}){if(!e)throw new i.ChainNotFoundError;if(t!==e.id)throw new i.ChainMismatchError({chain:e,currentChainId:t})}e.s(["assertCurrentChain",()=>s],961584);var o=e.i(662999),c=e.i(420791),l=e.i(905187),u=e.i(733361),d=e.i(886453),m=e.i(407395),y=e.i(268921),p=e.i(371497),h=e.i(404164);let g=new d.LruMap(128);async function f(e,i){let{account:d=e.account,chain:f=e.chain,accessList:x,authorizationList:C,blobs:w,data:k,gas:T,gasPrice:S,maxFeePerBlobGas:v,maxFeePerGas:E,maxPriorityFeePerGas:b,nonce:_,type:I,value:N,...j}=i;if(void 0===d)throw new r.AccountNotFoundError({docsPath:"/docs/actions/wallet/sendTransaction"});let R=d?(0,t.parseAccount)(d):null;try{(0,m.assertRequest)(i);let t=await (async()=>i.to?i.to:null!==i.to&&C&&C.length>0?await (0,a.recoverAuthorizationAddress)({authorization:C[0]}).catch(()=>{throw new n.BaseError("`to` is required. Could not infer from `authorizationList`.")}):void 0)();if(R?.type==="json-rpc"||null===R){let r;null!==f&&(r=await (0,u.getAction)(e,y.getChainId,"getChainId")({}),s({currentChainId:r,chain:f}));let n=e.chain?.formatters?.transactionRequest?.format,a=(n||l.formatTransactionRequest)({...(0,c.extract)(j,{format:n}),accessList:x,account:R,authorizationList:C,blobs:w,chainId:r,data:k,gas:T,gasPrice:S,maxFeePerBlobGas:v,maxFeePerGas:E,maxPriorityFeePerGas:b,nonce:_,to:t,type:I,value:N},"sendTransaction"),i=g.get(e.uid);try{return await e.request({method:i?"wallet_sendTransaction":"eth_sendTransaction",params:[a]},{retryCount:0})}catch(t){if(!1===i)throw t;if("InvalidInputRpcError"===t.name||"InvalidParamsRpcError"===t.name||"MethodNotFoundRpcError"===t.name||"MethodNotSupportedRpcError"===t.name)return await e.request({method:"wallet_sendTransaction",params:[a]},{retryCount:0}).then(t=>(g.set(e.uid,!0),t)).catch(r=>{if("MethodNotFoundRpcError"===r.name||"MethodNotSupportedRpcError"===r.name)throw g.set(e.uid,!1),t;throw r});throw t}}if(R?.type==="local"){let r=await (0,u.getAction)(e,p.prepareTransactionRequest,"prepareTransactionRequest")({account:R,accessList:x,authorizationList:C,blobs:w,chain:f,data:k,gas:T,gasPrice:S,maxFeePerBlobGas:v,maxFeePerGas:E,maxPriorityFeePerGas:b,nonce:_,nonceManager:R.nonceManager,parameters:[...p.defaultParameters,"sidecars"],type:I,value:N,...j,to:t}),n=f?.serializers?.transaction,a=await R.signTransaction(r,{serializer:n});return await (0,u.getAction)(e,h.sendRawTransaction,"sendRawTransaction")({serializedTransaction:a})}if(R?.type==="smart")throw new r.AccountTypeNotSupportedError({metaMessages:["Consider using the `sendUserOperation` Action instead."],docsPath:"/docs/actions/bundler/sendUserOperation",type:"smart"});throw new r.AccountTypeNotSupportedError({docsPath:"/docs/actions/wallet/sendTransaction",type:R?.type})}catch(e){if(e instanceof r.AccountTypeNotSupportedError)throw e;throw(0,o.getTransactionError)(e,{...i,account:R,chain:i.chain||void 0})}}e.s(["sendTransaction",()=>f],131832)},844612,e=>{"use strict";var t=e.i(486339),r=e.i(131832);function n(e,n){let{abi:a,args:i,bytecode:s,...o}=n,c=(0,t.encodeDeployData)({abi:a,args:i,bytecode:s});return(0,r.sendTransaction)(e,{...o,...o.authorizationList?{to:null}:{},data:c})}e.s(["deployContract",()=>n])},984272,e=>{"use strict";var t=e.i(300059),r=e.i(711763);function n(e){let{r:n,s:a}=t.secp256k1.Signature.fromCompact(e.slice(2,130)),i=Number(`0x${e.slice(130)}`),[s,o]=(()=>{if(0===i||1===i)return[void 0,i];if(27===i)return[BigInt(i),0];if(28===i)return[BigInt(i),1];throw Error("Invalid yParityOrV value")})();return void 0!==s?{r:(0,r.numberToHex)(n,{size:32}),s:(0,r.numberToHex)(a,{size:32}),v:s,yParity:o}:{r:(0,r.numberToHex)(n,{size:32}),s:(0,r.numberToHex)(a,{size:32}),yParity:o}}e.s(["parseSignature",()=>n])},493862,e=>{"use strict";var t=e.i(715897),r=e.i(131832),n=e.i(903183),a=e.i(601063);async function i(e,t){let i,{account:s,chainId:o,connector:c,...l}=t;i="object"==typeof s&&s?.type==="local"?e.getClient({chainId:o}):await (0,a.getConnectorClient)(e,{account:s??void 0,assertChainId:!1,chainId:o,connector:c});let u=(0,n.getAction)(i,r.sendTransaction,"sendTransaction");return await u({...l,...s?{account:s}:{},chain:o?{id:o}:null,gas:l.gas??void 0})}var s=e.i(95782);function o(e={}){var r;let{mutation:n}=e,a=(r=(0,s.useConfig)(e),{mutationFn:e=>i(r,e),mutationKey:["sendTransaction"]}),{mutate:c,mutateAsync:l,...u}=(0,t.useMutation)({...n,...a});return{...u,sendTransaction:c,sendTransactionAsync:l}}e.s(["useSendTransaction",()=>o],493862)},70043,e=>{"use strict";function t(e,t){try{return e?.[t]}catch{return}}e.s(["getPropertyOrUndefined",()=>t,"keys",0,e=>Object.keys(e)])},920706,583113,944731,833939,294524,e=>{"use strict";var t=e.i(866313),r=e.i(861316),n=e.i(670383),a=e.i(95782),i=e.i(715897),s=e.i(844612),o=e.i(903183),c=e.i(601063);async function l(e,t){let r,{account:n,chainId:a,connector:i,...l}=t;r="object"==typeof n&&n?.type==="local"?e.getClient({chainId:a}):await (0,c.getConnectorClient)(e,{account:n??void 0,assertChainId:!1,chainId:a,connector:i});let u=(0,o.getAction)(r,s.deployContract,"deployContract");return await u({...l,...n?{account:n}:{},chain:a?{id:a}:null})}var u=e.i(493862),d=e.i(767896);async function m(e,t){let r,{chainId:n,connector:a,...i}=t;r=t.account?t.account:(await (0,c.getConnectorClient)(e,{account:t.account,assertChainId:!1,chainId:n,connector:a})).account;let s=e.getClient({chainId:n});return(0,o.getAction)(s,d.estimateGas,"estimateGas")({...i,account:r})}e.s(["estimateGas",()=>m],583113);var y=e.i(406327),p=e.i(313664),h=e.i(75136),g=e.i(871735);async function f(e,t){let{chainId:r,timeout:n=0,...a}=t,i=e.getClient({chainId:r}),s=(0,o.getAction)(i,g.waitForTransactionReceipt,"waitForTransactionReceipt"),c=await s({...a,timeout:n});if("reverted"===c.status){let e=(0,o.getAction)(i,h.getTransaction,"getTransaction"),t=await e({hash:c.transactionHash}),r=(0,o.getAction)(i,p.call,"call"),n=await r({...t,data:t.input,gasPrice:"eip1559"!==t.type?t.gasPrice:void 0,maxFeePerGas:"eip1559"===t.type?t.maxFeePerGas:void 0,maxPriorityFeePerGas:"eip1559"===t.type?t.maxPriorityFeePerGas:void 0});throw Error(n?.data?(0,y.hexToString)(`0x${n.data.substring(138)}`):"unknown reason")}return{...c,chainId:i.chain.id}}e.s(["waitForTransactionReceipt",()=>f],944731);var x=e.i(529652),C=e.i(174258),w=e.i(79027),k=e.i(373077),T=e.i(77513),S=e.i(917081),v=e.i(601198),E=e.i(53496),b=e.i(61324),_=e.i(815784);function I(e){return!!e.walk(e=>{if(e instanceof _.InsufficientFundsError||e.data?.message?.match(_.InsufficientFundsError.nodeMessage))return!0;let t=e instanceof Error?e.message:JSON.stringify(e);return!!N.test(t)})}let N=/(Insufficient (funds|balance|ETH))|ETH not enough|gas required exceeds allowance/i;e.s(["INSUFFICIENT_FUNDS_REGEX",0,N,"isInsufficientFundsError",()=>I],833939);var j=e.i(798045),R=e.i(432116),F=e.i(109727),A=e.i(327546),B=e.i(607008),q=e.i(331383),M=e.i(37111);function U(e){if(e instanceof E.PolychainError)return e;if(!(e instanceof v.BaseError||e instanceof T.BaseError)){let t=e instanceof Error?e.message:JSON.stringify(e);return q.USER_REJECTED_REGEX.test(t)?new E.WalletRejectedError(e):N.test(t)?new E.InsufficientFundsError:(0,b.isInitializationError)(t)?new E.InternalWalletError(e):new E.TransactionRevertedError(e)}return(0,q.isUserRejectedRequestError)(e)?new E.WalletRejectedError(e):I(e)?new E.InsufficientFundsError:(0,F.isLedgerError)(e)?new E.LedgerError(e):(0,A.isRequestExpiredError)(e)?new E.RequestExpiredError(e):(0,j.isInternalWalletError)(e)?new E.InternalWalletError(e):(0,R.isJsonRpcVersionUnsupportedError)(e)?new E.WalletConnectionExpiredError(e):(0,B.isUnknownRpcError)(e)?new E.UnknownRpcError(e):(0,M.walk)(e,e=>e instanceof k.SwitchChainError)?new E.SwitchChainError(e):(0,M.walk)(e,e=>e instanceof S.ConnectorChainMismatchError)?new E.ConnectorChainMismatchError(e):(0,M.walk)(e,e=>e instanceof Error&&(0,b.isInitializationError)(e.message))?new E.InternalWalletError(e):new E.TransactionRevertedError(e)}e.s(["parseTransactionError",()=>U],294524);var L=e.i(39486);let O=[1e3,2e3,4e3,8e3],$=O.length+1;async function P(e,t){let r;for(let n=0;n<$;n++)try{return await m(e,t)}catch(e){if(r=e,!(e instanceof Error?e.message.toLowerCase():"").includes("execution reverted")||n===$-1)break;await new Promise(e=>setTimeout(e,O[n]))}throw r}e.s(["useTransact",0,()=>(()=>{let e,s,o=(0,t.c)(17),c=(0,a.useConfig)(),{requireChain:d}=(0,w.useRequireChain)(),m=(0,x.useAddress)(),{activeConnector:y}=(0,C.useConnectors)(),{sendTransactionAsync:p,isPending:h,isIdle:g,isPaused:k,isSuccess:T,isError:S,data:v}=(0,u.useSendTransaction)(),{deployContractAsync:b,isPending:_,isIdle:I,isPaused:N,isSuccess:j,isError:R,data:F}=function(e={}){var t;let{mutation:r}=e,n=(t=(0,a.useConfig)(e),{mutationFn:e=>l(t,e),mutationKey:["deployContract"]}),{mutate:s,mutateAsync:o,...c}=(0,i.useMutation)({...r,...n});return{...c,deployContract:s,deployContractAsync:o}}(),[A,B]=(0,n.useState)(),q=(0,L.useWithConnectorErrorRetry)();o[0]!==y||o[1]!==m||o[2]!==c||o[3]!==b||o[4]!==d||o[5]!==p||o[6]!==q?(e=async(e,t)=>{let{gasBufferMultiplier:n}=void 0===t?{}:t,{chainId:a}=e;if(!a)throw Error("No chain specified");try{let t=await q(async()=>{var t,i;await d(a);let s=y?.chainArch==="EVM"?y.baseConnector:void 0,o=e.gas;return(void 0!==n&&(void 0===o&&(o=await P(c,{...e,account:e.address??m,chainId:a,connector:s})),t=o,i=n,o=t*BigInt(Math.round(100*i))/BigInt(100)),e.to===r.NULL_ADDRESS)?await b({chainId:e.chainId,abi:[],bytecode:e.data,gas:o,account:e.address??m,connector:s}):await p({...e,gas:o,account:e.address??m,connector:s})});B(void 0);let i=async e=>{let{confirmations:r,pollingInterval:n,timeout:i}=e||{};try{let e=await f(c,{hash:t,confirmations:void 0===r?1:r,pollingInterval:n,timeout:i,chainId:a});if("success"===e.status)return{status:"success",hash:t};return{status:"failed",hash:t,error:new E.TransactionRevertedError(Error("Transaction Reverted"))}}catch(e){return{status:"failed",hash:t,error:U(e)}}};return{hash:t,wait:i}}catch(t){let e=U(t);throw B(e),e}},o[0]=y,o[1]=m,o[2]=c,o[3]=b,o[4]=d,o[5]=p,o[6]=q,o[7]=e):e=o[7];let M=e,O=h||_,$=T||j,D=S||R,H=g&&I,z=k||N,W=v??F;return o[8]!==W||o[9]!==A||o[10]!==D||o[11]!==H||o[12]!==z||o[13]!==O||o[14]!==$||o[15]!==M?(s={transact:M,isPending:O,isSuccess:$,isError:D,isIdle:H,isPaused:z,data:W,error:A},o[8]=W,o[9]=A,o[10]=D,o[11]=H,o[12]=z,o[13]=O,o[14]=$,o[15]=M,o[16]=s):s=o[16],s})()],920706)},146301,e=>{"use strict";function t(e){return e[0]}e.s(["head",()=>t])},243744,e=>{"use strict";var t=e.i(7683),r=e.i(866313),n=e.i(208936),a=e.i(803577),i=e.i(794835),s=e.i(439765),o=e.i(682576),c=e.i(508833),l=e.i(22764),u=e.i(81810),d=e.i(367750),m=e.i(389810),y=e.i(885530),p=e.i(455480),h=e.i(459527),g=e.i(333799),f=e.i(155757),x=e.i(502732),C=e.i(491150),w=e.i(965523),k=e.i(284296),T=e.i(972483),S=e.i(286129),v=e.i(950293),E=e.i(457628),b=e.i(99061),_=e.i(190719),I=e.i(734630),N=e.i(522285),j=e.i(670383),R=e.i(395802),F=e.i(201578),A=e.i(195344);let B=(0,y.graphql)(`
  mutation CreateUserReport(
    $collectionSlug: String
    $itemIdentifier: ItemIdentifierInput
    $accountAddress: Address
    $currencyContract: ContractIdentifierInput
    $category: String!
    $subCategory: String
  ) {
    createUserReport(
      identifier: {
        collectionSlug: $collectionSlug
        itemIdentifier: $itemIdentifier
        accountAddress: $accountAddress
        currencyContract: $currencyContract
      }
      category: $category
      subCategory: $subCategory
    )
  }
`),q=(0,y.graphql)(`
    fragment ReportModal_collection on Collection {
      id
      slug
      name
      imageUrl
      chain {
        ...ChainBadge
      }
      ...CollectionLockup
      ...CollectionPreviewTooltip
    }
  `,[a.ChainBadgeFragment,o.CollectionLockupFragment,F.CollectionPreviewTooltipFragment]),M=(0,y.graphql)(`
  fragment ReportModal_account on Profile {
    address
    displayName
    imageUrl
  }
`),U=(0,y.graphql)(`
  fragment ReportModal_item on Item {
    id
    name
    imageUrl
  }
`),L=(0,y.graphql)(`
    fragment ReportModal_currency on Currency {
      id
      name
      symbol
      imageUrl
      chainIdentifier
      contractAddress
      chain {
        ...ChainBadge
      }
      ...CurrencyLockup
      ...NewCurrencyChip
    }
  `,[a.ChainBadgeFragment,u.CurrencyLockupFragment,m.NewCurrencyChipFragment]);function O({open:e,onOpenChange:a,entityType:o,entityId:u}){let[{error:m},F]=(0,h.useMutation)(B),[O,z]=(0,j.useState)(!1),[W,Q]=(0,j.useState)(null),[G,J]=(0,j.useState)(null),[Y,K]=(0,j.useState)(""),[V,X]=(0,j.useState)(null),[Z,ee]=(0,j.useState)(""),[et,er]=(0,j.useState)(""),[en,ea]=(0,j.useState)(!1),ei=(0,N.useTranslations)("ReportModal");(0,j.useEffect)(()=>{e||(z(!1),Q(null),J(null),K(""),X(null),ee(""),er(""),ea(!1))},[e]),(0,j.useEffect)(()=>{let e=setTimeout(()=>{er(Z)},300);return()=>clearTimeout(e)},[Z]);let{searchResults:es}=((e,t)=>{let n,a,i,s,o,c,l,u,d=(0,r.c)(23);d[0]===Symbol.for("react.memo_cache_sentinel")?(n={suspense:!1},d[0]=n):n=d[0];let m=n,p=0===e.trim().length;d[1]!==t?(a=function(){switch(t){case A.EntityType.ACCOUNT:return(0,y.graphql)("\n            query ReportModalAccountSearch($query: String!, $limit: Int!) {\n              accountsByQuery(query: $query, limit: $limit) {\n                ...ReportModal_account\n              }\n            }\n          ",[M]);case A.EntityType.ITEM:return(0,y.graphql)("\n            query ReportModalItemSearch($query: String!, $limit: Int!) {\n              itemsByQuery(query: $query, limit: $limit) {\n                ...ReportModal_item\n              }\n            }\n          ",[U]);case A.EntityType.CURRENCY:return(0,y.graphql)("\n            query ReportModalCurrencySearch($query: String!, $limit: Int!) {\n              currenciesByQuery(query: $query, limit: $limit) {\n                ...ReportModal_currency\n              }\n            }\n          ",[L]);default:return(0,y.graphql)("\n            query ReportModalCollectionSearch($query: String!, $limit: Int!) {\n              collectionsByQuery(query: $query, limit: $limit) {\n                ...ReportModal_collection\n              }\n            }\n          ",[q])}},d[1]=t,d[2]=a):a=d[2];let h=a;d[3]!==h?(i=h(),d[3]=h,d[4]=i):i=d[4],d[5]!==e?(s={query:e,limit:4},d[5]=e,d[6]=s):s=d[6],d[7]!==p||d[8]!==i||d[9]!==s?(o={query:i,variables:s,pause:p,context:m},d[7]=p,d[8]=i,d[9]=s,d[10]=o):o=d[10];let[f]=(0,g.useQuery)(o),{data:x,error:C,fetching:w}=f;d[11]!==x?.accountsByQuery||d[12]!==x?.collectionsByQuery||d[13]!==x?.currenciesByQuery||d[14]!==x?.itemsByQuery||d[15]!==t?(c=function(){switch(t){case A.EntityType.ACCOUNT:return(x?.accountsByQuery||[]).map($);case A.EntityType.ITEM:return(x?.itemsByQuery||[]).map(P);case A.EntityType.CURRENCY:return(x?.currenciesByQuery||[]).map(D);default:return(x?.collectionsByQuery||[]).map(H)}},d[11]=x?.accountsByQuery,d[12]=x?.collectionsByQuery,d[13]=x?.currenciesByQuery,d[14]=x?.itemsByQuery,d[15]=t,d[16]=c):c=d[16];let k=c;return d[17]!==k?(l=function(e){let t=new Set;return e.filter(e=>{let r=`${e.type}:${e.id.toLowerCase()}`;return!t.has(r)&&(t.add(r),!0)})}(k()),d[17]=k,d[18]=l):l=d[18],d[19]!==C||d[20]!==w||d[21]!==l?(u={searchResults:l,error:C,fetching:w},d[19]=C,d[20]=w,d[21]=l,d[22]=u):u=d[22],u})(et,o),eo=en?[]:es,ec=()=>{a(!1),z(!1),Q(null),J(null)},el=[{key:"adult_content_nudity",title:"Nudity or sexual content",context:"Nudity, sexual scenes or language, or sex trafficking.",learnMoreUrl:"https://support.opensea.io/articles/8867128-is-explicit-sensitive-content-allowed-on-opensea"},{key:"adult_content_shocking_gory",title:"Shocking or gory",context:"Shocking or graphic content.",learnMoreUrl:"https://support.opensea.io/articles/8867128-is-explicit-sensitive-content-allowed-on-opensea"},{key:"adult_content_sexual_harassment",title:"Sexual harassment",context:"Unwanted romantic advances, requests for sexual favors, or unwelcome sexual remarks.",learnMoreUrl:"https://support.opensea.io/articles/8867128-is-explicit-sensitive-content-allowed-on-opensea"}],eu=(e,r)=>{if(!e)return e;let n=e;return r&&r.forEach(e=>{n=n.replace(e.text,`<a href="${e.url}" class="hover:opacity-70 text-text-primary" target="_blank" rel="noopener noreferrer">${e.text}</a>`)}),!n.includes("Help Center")||n.includes("href=")||n.includes("Help Center</a>")||(n=n.replace("Help Center",'<a href="https://support.opensea.io" class="hover:opacity-70 text-text-primary" target="_blank" rel="noopener noreferrer">Help Center</a>')),(0,t.jsx)("span",{dangerouslySetInnerHTML:{__html:n}})},ed=[{key:"fake_misleading",title:"Fake or misleading",onClick:()=>{Q("fake_misleading")}},{key:"scam_malicious",title:"Scam or malicious behavior",onClick:()=>{z(!0)}},{key:"hate_violence",title:"Inciting hate or violence",onClick:()=>{z(!0)}},{key:"adult_content",title:"Explicit and sensitive content",onClick:()=>{Q("adult_content")}},...o===A.EntityType.COLLECTION||o===A.EntityType.ITEM||o===A.EntityType.CURRENCY?[{key:"csam",title:ei("csam"),onClick:()=>{z(!0)}}]:[],{key:"ip_infringement",title:"Intellectual property infringement",onClick:()=>{Q("ip_infringement")},message:{text:"We do not allow content that violates intellectual property rights on OpenSea. In accordance with U.S. federal law, we maintain a notice and takedown process for alleged intellectual property infringement. Learn more.",secondaryText:"If you'd like to file a takedown request, please review the OpenSea Help Center for more information.",links:[{text:"Learn more",url:"https://support.opensea.io/articles/8867068-what-can-i-do-if-my-copyrighted-or-trademarked-works-are-being-sold-without-my-permission"}]}},...o===A.EntityType.ITEM?[{key:"stolen_item",title:"Stolen item or funds",onClick:()=>{Q("stolen_item")},message:{text:"We do not allow the sale of stolen items on OpenSea. When an item is reported as stolen, we require a verified police report in order to disable the ability to buy, sell, or transfer items. Learn more.",secondaryText:"If you'd like to report an item as stolen, please contact our support team on the OpenSea Help Center.",links:[{text:"Learn more",url:"https://support.opensea.io/articles/8867064-what-is-opensea-s-stolen-item-policy"}]}}]:[],...o===A.EntityType.COLLECTION?[{key:"spam",title:"Spam",onClick:()=>{z(!0)}}]:[],{key:"other",title:"Other",onClick:()=>{Q("other")},message:{text:"For other issues, please review the OpenSea Help Center and contact our support team.",links:[]}}],em=async(e,t,r,n)=>{try{let a="string"==typeof n?n:n?.key??"",i={category:e,subCategory:a};switch(t){case A.EntityType.COLLECTION:i.collectionSlug=r;break;case A.EntityType.ITEM:"string"==typeof r?i.itemIdentifier={chain:"",contractAddress:"",tokenId:r}:"tokenId"in r&&(i.itemIdentifier={chain:r.chain,contractAddress:r.contractAddress,tokenId:r.tokenId});break;case A.EntityType.ACCOUNT:i.accountAddress=r.toLowerCase();break;case A.EntityType.CURRENCY:"object"==typeof r&&"chain"in r&&"contractAddress"in r&&!("tokenId"in r)&&(i.currencyContract={chain:r.chain,address:r.contractAddress});break;default:throw Error(`Invalid entity type: ${String(t)}`)}let s=await F(i);if(s.error)throw s.error;if(!s.data?.createUserReport)throw Error("Failed to submit report. Please try again later.");return s.data.createUserReport}catch(e){if(console.error("Error submitting report:",e),e instanceof Error)throw Error(`Failed to submit report: ${e.message}`);throw Error("An unexpected error occurred while submitting the report")}},ey=e=>{switch(e.type){case"account":{let t=e.data;return t.displayName||t.address}case"collection":case"item":case"currency":return e.data.name;default:return"Unknown"}},ep=e=>{switch(e.type){case"account":return JSON.stringify({type:"original_entity",address:e.data.address});case"collection":return JSON.stringify({type:"original_entity",slug:e.data.slug});case"item":return JSON.stringify({type:"original_entity",id:e.data.id});case"currency":{let t=e.data;return JSON.stringify({type:"original_entity",chain:t.chainIdentifier,address:t.contractAddress})}default:return e.id}};(0,j.useEffect)(()=>{m&&(X(m.message),z(!0))},[m]);let eh=async e=>{if(["scam_malicious","hate_violence","spam","csam"].includes(e.key))try{await em(e.key,o,u),V||e.onClick()}catch(e){console.error(e)}else e.onClick()};return(0,t.jsx)(T.Modal,{"aria-labelledby":O?"submitted-modal-title":"report-modal-title",content:O?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(T.ModalHeader,{children:(0,t.jsx)(T.ModalHeaderTitle,{id:"submitted-modal-title",children:V?ei("error"):ei("thankYou")})}),(0,t.jsx)(T.ModalBody,{"aria-describedby":"submitted-description",children:(0,t.jsx)(w.FlexColumn,{className:"gap-4",children:V?(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:ei("errorOccurred")}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"font-semibold",id:"submitted-description",children:ei("whatHappensNow")}),(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:ei("teamWillReview")})]})})}),(0,t.jsx)(T.ModalFooter,{children:(0,t.jsx)(x.Button,{"aria-describedby":"submitted-description",className:"w-full justify-center py-2 hover:opacity-70",onClick:()=>{ec()},children:ei("done")})})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(T.ModalHeader,{children:(0,t.jsx)(T.ModalHeaderTitle,{className:"text-center",id:"report-modal-title",children:(0,t.jsxs)("div",{className:"flex w-full items-center",children:[W&&"adult_content"!==W?(0,t.jsx)(E.UnstyledButton,{"aria-describedby":"report-description",className:"mr-4 text-text-secondary hover:text-text-primary",onClick:()=>Q(null),children:(0,t.jsx)(b.ChevronLeft,{})}):null,(0,t.jsx)("div",{className:"flex-1 text-center",children:(0,t.jsx)(v.TextBody,{className:"font-semibold",id:"report-description",children:ei("report")})})]})})}),(0,t.jsx)(T.ModalBody,{"aria-describedby":"report-description",children:(0,t.jsx)(w.FlexColumn,{className:"gap-4",children:(()=>{switch(W){case"adult_content":return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:ei("whatTypeAdultContent")}),(0,t.jsx)(S.RadioGroup,{onValueChange:e=>J(e),value:G||void 0,children:(0,t.jsx)(w.FlexColumn,{className:"gap-4",children:el.map(e=>(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("input",{checked:G===e.key,className:"size-4",id:e.key,onChange:e=>J(e.target.value),type:"radio",value:e.key}),(0,t.jsx)("label",{htmlFor:e.key,children:(0,t.jsx)(v.TextBody,{children:e.title})})]}),G===e.key&&(0,t.jsxs)("div",{className:"mt-2 ml-6",children:[(0,t.jsx)(v.TextBody,{className:"text-sm text-text-secondary",children:e.context}),(0,t.jsx)("div",{className:"h-2"}),e.learnMoreUrl?(0,t.jsx)(v.TextBody,{className:"mt-1 text-sm text-text-secondary",children:(0,t.jsx)(C.Link,{className:"text-text-primary hover:opacity-70",href:e.learnMoreUrl,children:ei("learnMore")})}):null]})]},e.key))})}),(0,t.jsx)(x.Button,{className:"mt-4",disabled:!G,onClick:()=>{G&&em(W,o,u,el.find(e=>e.key===G)).then(()=>{z(!0)}).catch(()=>{X("submission_failed"),z(!0)})},children:ei("submit")})]});case"ip_infringement":return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:eu(ed.find(e=>e.key===W)?.message?.text||"",ed.find(e=>e.key===W)?.message?.links)}),(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:eu(ed.find(e=>e.key===W)?.message?.secondaryText||"",ed.find(e=>e.key===W)?.message?.links)}),(0,t.jsx)(x.Button,{className:"mt-4",onClick:ec,children:ei("done")})]});case"stolen_item":return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:eu(ed.find(e=>e.key===W)?.message?.text||"",ed.find(e=>e.key===W)?.message?.links)}),(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:eu(ed.find(e=>e.key===W)?.message?.secondaryText||"",ed.find(e=>e.key===W)?.message?.links)}),(0,t.jsx)(x.Button,{className:"mt-4",onClick:ec,children:ei("done")})]});case"other":return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:eu(ed.find(e=>e.key===W)?.message?.text||"",ed.find(e=>e.key===W)?.message?.links)}),(0,t.jsx)(x.Button,{className:"mt-4",onClick:ec,children:ei("done")})]});case"fake_misleading":return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:ei("searchForOriginal",{entityType:o.toLowerCase()})}),(0,t.jsx)(k.Input,{leftIcon:I.Search,onChange:e=>{ee(e.target.value),K(""),ea(!1)},placeholder:ei("searchFor",{entityType:o.toLowerCase()}),value:Z}),eo.length>0&&!en&&(0,t.jsx)("div",{className:"mt-4 max-h-[300px] overflow-y-auto",children:eo.map(e=>{if("currency"===e.type){let r=(0,p.readFragment)(L,e.data);return(0,t.jsx)(E.UnstyledButton,{className:"flex w-full items-center gap-3 rounded-lg p-3 hover:bg-bg-additional-1",onClick:()=>{K(ep(e)),ee(ey(e)),ea(!0)},children:(0,t.jsxs)(c.CurrencyLockup,{currency:r,size:"sm",children:[(0,t.jsx)(c.CurrencyLockupAvatar,{badge:(0,t.jsx)(c.CurrencyLockupChainBadge,{size:"xs"})}),(0,t.jsxs)(l.CurrencyLockupContent,{className:"min-w-0 flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)(c.CurrencyLockupTitle,{disableTextOverflowTooltip:!0}),(0,t.jsx)(c.CurrencyLockupBadge,{}),(0,t.jsx)(d.NewCurrencyChip,{className:"ml-1",currency:r})]}),(0,t.jsx)(v.TextBody,{className:"truncate text-text-secondary",size:"sm",children:r.symbol})]})]})},e.id)}if("collection"===e.type){let r=(0,p.readFragment)(q,e.data);return(0,t.jsx)(E.UnstyledButton,{className:"flex w-full items-center gap-3 rounded-lg p-3 hover:bg-bg-additional-1",onClick:()=>{K(ep(e)),ee(ey(e)),ea(!0)},children:(0,t.jsx)(R.CollectionPreviewTooltip,{collection:r,children:(0,t.jsxs)(i.CollectionLockup,{collection:r,size:"sm",children:[(0,t.jsx)(i.CollectionLockupAvatar,{badge:(0,t.jsx)(n.ChainBadge,{chain:r.chain,size:"xs"})}),(0,t.jsx)(s.CollectionLockupContent,{children:(0,t.jsx)(i.CollectionLockupTitle,{disableTextOverflowTooltip:!0})})]})})},e.id)}return(0,t.jsxs)(E.UnstyledButton,{className:"flex w-full items-center gap-3 rounded-lg p-3 hover:bg-bg-additional-1",onClick:()=>{K(ep(e)),ee(ey(e)),ea(!0)},children:[(0,t.jsx)(f.Avatar,{rounded:!0,size:24,src:(e=>{switch(e.type){case"account":case"collection":case"item":case"currency":return e.data.imageUrl;default:return null}})(e)||void 0}),(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)(v.TextBody,{className:"font-medium",children:ey(e)})})]},e.id)})}),(0,t.jsx)(x.Button,{className:"mt-4",disabled:!Y,onClick:async()=>{if(Y)try{await em("fake_misleading",o,u,Y),z(!0)}catch{X("submission_failed"),z(!0)}},children:ei("submitReport")})]});default:return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.TextBody,{className:"font-semibold",children:ei("whyReporting",{entityType:o.toLowerCase()})}),(0,t.jsx)(v.TextBody,{className:"text-text-secondary",children:ei("teamWillNotify")}),ed.map(e=>(0,t.jsxs)(E.UnstyledButton,{className:"flex w-full items-center justify-between py-2 hover:opacity-70",onClick:()=>eh(e),children:[(0,t.jsx)(v.TextBody,{children:e.title}),(0,t.jsx)(_.ChevronRight,{className:"text-text-secondary"})]},e.title))]})}})()})})]}),onOpenChange:ec,open:e,title:ei("report")})}function $(e){let t=(0,p.readFragment)(M,e);return{id:t.address,type:"account",data:t}}function P(e){let t=(0,p.readFragment)(U,e);return{id:t.id,type:"item",data:t}}function D(e){let t=(0,p.readFragment)(L,e);return{id:t.id,type:"currency",data:t}}function H(e){let t=(0,p.readFragment)(q,e);return{id:t.slug,type:"collection",data:t}}e.s(["ReportModal",()=>O])}]);

//# debugId=96620025-1a46-fa9f-8dad-69761ced5403
//# sourceMappingURL=67501852602aa9e4.js.map