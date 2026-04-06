;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="5f40eeb1-3ab2-462e-c760-7897c608ff2e")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,830656,e=>{"use strict";var s=e.i(7683),i=e.i(866313),r=e.i(437153),t=e.i(965523),a=e.i(950293),n=e.i(625236);function l(e){let l,d,o,c,m=(0,i.c)(10),{title:u,description:h,className:g}=e;return m[0]!==g?(l=(0,r.classNames)("gap-2",g),m[0]=g,m[1]=l):l=m[1],m[2]!==u?(d=(0,s.jsx)(n.TextHeading,{asChild:!0,size:"md",children:(0,s.jsx)("h2",{children:u})}),m[2]=u,m[3]=d):d=m[3],m[4]!==h?(o=(0,s.jsx)(a.TextBody,{color:"text-secondary",size:"sm",children:h}),m[4]=h,m[5]=o):o=m[5],m[6]!==l||m[7]!==d||m[8]!==o?(c=(0,s.jsxs)(t.FlexColumn,{className:l,children:[d,o]}),m[6]=l,m[7]=d,m[8]=o,m[9]=c):c=m[9],c}e.s(["SettingsHeader",()=>l])},115858,e=>{"use strict";var s=e.i(700398);function i(){let e=(0,s.usePrimaryAccount)();return e?.username||e?.address}e.s(["useSettingsIdentifier",()=>i])},49878,e=>{"use strict";var s=e.i(7683),i=e.i(866313),r=e.i(695698),t=e.i(999258),a=e.i(584502);function n(e){let n,l,d=(0,i.c)(6),{count:o,showList:c}=e,m=void 0===o?3:o;d[0]!==m?(n=Array.from({length:m},(e,i)=>(0,s.jsxs)("div",{children:[(0,s.jsx)(a.AccountSwitcherAccountItemsSkeleton,{}),i<m-1&&(0,s.jsx)(t.Separator,{})]},i)),d[0]=m,d[1]=n):n=d[1];let u=n;if(!(void 0===c||c)){let e;return d[2]!==u?(e=(0,s.jsx)(s.Fragment,{children:u}),d[2]=u,d[3]=e):e=d[3],e}return d[4]!==u?(l=(0,s.jsx)(r.List,{className:"rounded-lg border border-border-1 bg-bg-primary",showBorder:!1,children:u}),d[4]=u,d[5]=l):l=d[5],l}e.s(["LinkedWalletsSkeletons",()=>n])},318423,e=>{"use strict";var s=e.i(7683),i=e.i(866313),r=e.i(885530),t=e.i(455480),a=e.i(333799),n=e.i(502732),l=e.i(194153),d=e.i(965523),o=e.i(838820),c=e.i(695698),m=e.i(999258),u=e.i(310578),h=e.i(258343),g=e.i(950293),x=e.i(6840),p=e.i(861316),y=e.i(41808),S=e.i(276198),f=e.i(522285),j=e.i(436609),A=e.i(584502),b=e.i(313479),N=e.i(46486),k=e.i(389852),w=e.i(115858),v=e.i(84438);e.i(754689);var L=e.i(765778),B=e.i(49878);let C=(0,r.graphql)(`
  fragment SettingsWalletLinking on Query {
    walletsByAccount {
      items {
        address
        isPrivate
        isConnected
        label
        lastSeenConnectorId
      }
    }
  }
`);var z=e.i(437153),W=e.i(830656);function I(e){let r,t,a,n,l,o=(0,i.c)(14),{children:c,className:m,maxWalletsLinked:u}=e,h=void 0===u?10:u,g=(0,f.useTranslations)("SettingsWalletLinking");o[0]!==h||o[1]!==g?(r=g("descriptionWithVisibility",{maxWalletsLinked:h}),o[0]=h,o[1]=g,o[2]=r):r=o[2];let x=r;return o[3]!==m?(t=(0,z.classNames)("gap-8",m),o[3]=m,o[4]=t):t=o[4],o[5]!==g?(a=g("title"),o[5]=g,o[6]=a):a=o[6],o[7]!==x||o[8]!==a?(n=(0,s.jsx)(W.SettingsHeader,{description:x,title:a}),o[7]=x,o[8]=a,o[9]=n):n=o[9],o[10]!==c||o[11]!==t||o[12]!==n?(l=(0,s.jsxs)(d.FlexColumn,{className:t,children:[n,c]}),o[10]=c,o[11]=t,o[12]=n,o[13]=l):l=o[13],l}var P=e.i(821303);let T=(0,r.graphql)(`
    query SettingsWalletLinkingQuery {
      ...SettingsWalletLinking
      walletsByAccount {
        items {
          address
          isPrivate
          label
          lastSeenConnectorId
        }
      }
      maxWalletsLinked
    }
  `,[C]),_=(0,r.graphql)(`
  query WalletProfiles($addresses: [Address!]!) {
    walletProfilesByAddresses(addresses: $addresses) {
      ... on Profile {
        address
        username
        displayName
        ensName
        imageUrl
        portfolioSummary {
          estimatedTokenValue { usd }
        }
      }
    }
  }
`),q=(0,r.graphql)(`
    query SettingsWalletLinkingTopAccount($identifier: String!) {
      profileByIdentifierV2(identifier: $identifier) {
        ... on Profile {
          ...AccountSwitcherAccountItems
        }
      }
    }
  `,[j.AccountSwitcherAccountItemsFragment]),F=(0,k.withSuspense)(({className:e})=>{let i,r=(0,f.useTranslations)("SettingsWalletLinking"),u=(0,w.useSettingsIdentifier)(),{openAddWalletModal:k}=(0,v.useLinkedWalletModalStore)(),B=(0,P.useRenderUsdBalance)(),z=(0,y.usePreviouslyConnectedAccounts)(),W=(0,S.keyBy)(z,e=>(0,p.normalizeAddress)(e.address)),[{data:F},U]=(0,a.useQuery)({query:T}),V=(0,t.readFragment)(C,F),Q=V?.walletsByAccount?.items??[],R=F?.maxWalletsLinked,$=Q.map(e=>(0,p.normalizeAddress)(e.address)),[{data:H,fetching:O}]=(0,a.useQuery)({query:_,variables:{addresses:$},pause:0===$.length}),[{data:K}]=(0,a.useQuery)({query:q,variables:{identifier:u||""},pause:!u}),M={};for(let e of H?.walletProfilesByAddresses??[])e?.__typename==="Profile"&&(M[(0,p.normalizeAddress)(e.address)]={username:e.username,displayName:e.displayName,ensName:e.ensName,imageUrl:e.imageUrl,usd:e.portfolioSummary?.estimatedTokenValue?.usd??-1});let D=K?.profileByIdentifierV2;D&&"Profile"===D.__typename&&(i=(0,t.readFragment)(j.AccountSwitcherAccountItemsFragment,D));let E=(0,S.keyBy)(F?.walletsByAccount?.items??[],e=>(0,p.normalizeAddress)(e.address)),G=[...Q].sort((e,s)=>{let i=M[(0,p.normalizeAddress)(e.address)]?.usd??-1,r=M[(0,p.normalizeAddress)(s.address)]?.usd??-1;if(i!==r)return r-i;let t=M[(0,p.normalizeAddress)(e.address)],a=M[(0,p.normalizeAddress)(s.address)],n=t?.displayName||(0,o.formatAddress)((0,p.normalizeAddress)(e.address)),l=a?.displayName||(0,o.formatAddress)((0,p.normalizeAddress)(s.address));return n.localeCompare(l)}),J=Object.values(M).reduce((e,s)=>e+(s.usd>0?s.usd:0),0);return 0===Q.length?(0,s.jsx)(I,{className:e,maxWalletsLinked:R,children:(0,s.jsxs)(l.CenterAligned,{className:"gap-4 py-12",children:[(0,s.jsx)(x.AccountCircle,{fill:"text-secondary",size:48}),(0,s.jsxs)(l.CenterAligned,{className:"gap-2",children:[(0,s.jsx)(g.TextBody,{weight:"semibold",children:r("emptyState.title")}),(0,s.jsx)(g.TextBody,{color:"text-secondary",size:"sm",children:r("emptyState.description")})]})]})}):(0,s.jsx)(I,{className:e,maxWalletsLinked:R,children:(0,s.jsxs)(d.FlexColumn,{className:"gap-4",children:[i?(0,s.jsx)("div",{className:"rounded-lg border border-border-1 bg-bg-primary",children:(0,s.jsx)(b.AccountSwitcherTopAccount,{account:i,isLink:!1,usdTotalValue:J,variant:"full",walletCount:Q.length})}):null,(0,s.jsxs)(h.SpaceBetween,{className:"flex items-center",children:[(0,s.jsx)(g.TextBody,{size:"sm",weight:"semibold",children:r("yourLinkedWallets")}),(0,s.jsx)(n.Button,{onClick:k,size:"sm",variant:"primary",children:r("addWallet")})]}),(0,s.jsx)(c.List,{className:"inset-shadow-border rounded-md bg-bg-app",showBorder:!1,children:(O?$:G.map(e=>e.address)).map((e,i)=>{let r=(0,p.normalizeAddress)(e),t=M[r],a=E[r],n=a?.lastSeenConnectorId,l=a?.isPrivate,d=W[r],o=(0,L.normalizeConnectorId)(n)||(0,L.normalizeConnectorId)(d?.connectorId);return(0,s.jsxs)("div",{children:[O?(0,s.jsx)(A.AccountSwitcherAccountItemsSkeleton,{}):(0,s.jsx)(N.LinkedAccountSwitcherItem,{address:r,avatarSize:28,className:"h-16 px-4",connectorId:o,description:B(M[r]?.usd??void 0),displayName:t?.displayName,ensName:t?.ensName,imageUrl:t?.imageUrl,isLink:!1,isPrivate:l,label:a?.label,linkedWalletsCount:Q.length,onRefresh:()=>{U({requestPolicy:"network-only"})},showActions:!0,username:t?.username,variant:"full"}),i<$.length-1&&(0,s.jsx)(m.Separator,{})]},r)})})]})})},{fallback:({className:e})=>(0,s.jsx)(I,{className:e,children:(0,s.jsxs)(d.FlexColumn,{className:"gap-4",children:[(0,s.jsx)(U,{}),(0,s.jsx)(V,{}),(0,s.jsx)(c.List,{className:"inset-shadow-border rounded-md bg-bg-app",showBorder:!1,children:(0,s.jsx)(B.LinkedWalletsSkeletons,{count:3,showList:!1})})]})}),ssr:!1});function U(){let e,r,t,a=(0,i.c)(3);return a[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,s.jsx)(u.SkeletonCircle,{className:"size-12 shrink-0"}),a[0]=e):e=a[0],a[1]===Symbol.for("react.memo_cache_sentinel")?(r=(0,s.jsx)(u.SkeletonLine,{className:"h-3.5 w-24"}),a[1]=r):r=a[1],a[2]===Symbol.for("react.memo_cache_sentinel")?(t=(0,s.jsxs)("div",{className:"flex h-18 items-center gap-3 rounded-lg border border-border-1 bg-bg-primary px-3",children:[e,(0,s.jsxs)(d.FlexColumn,{className:"gap-1.5",children:[r,(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)(u.SkeletonLine,{className:"h-[18px] w-16 rounded"}),(0,s.jsx)(u.SkeletonLine,{className:"h-[18px] w-20 rounded"})]})]})]}),a[2]=t):t=a[2],t}function V(){let e,r=(0,i.c)(1);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,s.jsxs)(h.SpaceBetween,{className:"items-center",children:[(0,s.jsx)(u.SkeletonLine,{className:"h-3.5 w-32"}),(0,s.jsx)(u.SkeletonLine,{className:"h-8 w-24 rounded-lg"})]}),r[0]=e):e=r[0],e}e.s(["SettingsWalletLinking",0,F],318423)}]);

//# debugId=5f40eeb1-3ab2-462e-c760-7897c608ff2e
//# sourceMappingURL=2005aeb6b2e8f29f.js.map