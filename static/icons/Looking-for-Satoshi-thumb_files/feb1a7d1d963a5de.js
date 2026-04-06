;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="d8e36cf6-db25-2249-bc36-412689451938")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,331348,e=>{"use strict";var t=e.i(7683),n=e.i(866313),a=e.i(790621),s=e.i(437153);e.s(["Send",0,e=>{let r,i,l,o,d,g,c,u,m=(0,n.c)(15);m[0]!==e?({size:l,fill:o,fillAttribute:d,className:r,...i}=e,m[0]=e,m[1]=r,m[2]=i,m[3]=l,m[4]=o,m[5]=d):(r=m[1],i=m[2],l=m[3],o=m[4],d=m[5]);let x=void 0===l?24:l,p=void 0===o?"current":o,h=void 0===d?"currentColor":d;return m[6]!==r||m[7]!==p?(g=(0,s.classNames)((0,a.fillVariants)({fill:p}),r),m[6]=r,m[7]=p,m[8]=g):g=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsx)("path",{d:"M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"}),m[9]=c):c=m[9],m[10]!==h||m[11]!==i||m[12]!==x||m[13]!==g?(u=(0,t.jsx)("svg",{"aria-label":"Send",className:g,fill:h,height:x,role:"img",viewBox:"0 -960 960 960",width:x,xmlns:"http://www.w3.org/2000/svg",...i,children:c}),m[10]=h,m[11]=i,m[12]=x,m[13]=g,m[14]=u):u=m[14],u}])},617941,44886,e=>{"use strict";let t=(0,e.i(729427).create)(e=>({chatOpen:!1,setChatOpen:t=>e({chatOpen:t}),createModalOpen:!1,setCreateModalOpen:t=>e({createModalOpen:t}),managementOpen:!1,setManagementOpen:t=>e({managementOpen:t})}));e.s(["useAgentStore",0,t],617941);var n=e.i(885530);let a=(0,n.graphql)(`
  fragment AgentFragment on Agent {
    id
    name
    avatarUrl
    personality
    status
    walletAddress
    skills {
      id
      skillId
      name
      enabled
    }
    schedules {
      id
      cronExpression
      actionConfig
      enabled
      lastRunAt
      nextRunAt
    }
    createdAt
  }
`),s=(0,n.graphql)(`
  fragment ChatMessageFragment on ChatMessage {
    id
    role
    content
    metadata
    createdAt
  }
`),r=(0,n.graphql)(`
  fragment AgentMemoryFragment on AgentMemory {
    id
    content
    version
    updatedFrom
    createdAt
  }
`),i=(0,n.graphql)(`
    mutation CreateAgent($input: CreateAgentInput!) {
      createAgent(input: $input) {
        ...AgentFragment
      }
    }
  `,[a]),l=(0,n.graphql)(`
    mutation SendAgentMessage($agentId: ID!, $message: String!) {
      sendMessage(agentId: $agentId, message: $message) {
        ...ChatMessageFragment
      }
    }
  `,[s]),o=(0,n.graphql)(`
    query AgentChatHistory($agentId: ID!, $first: Int, $after: String) {
      chatHistory(agentId: $agentId, first: $first, after: $after) {
        edges {
          node {
            ...ChatMessageFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,[s]),d=(0,n.graphql)(`
    query AgentMemory($agentId: ID!) {
      agentMemory(agentId: $agentId) {
        ...AgentMemoryFragment
      }
    }
  `,[r]);(0,n.graphql)(`
    query AgentMemoryHistory($agentId: ID!, $first: Int, $after: String) {
      agentMemoryHistory(agentId: $agentId, first: $first, after: $after) {
        edges {
          node {
            ...AgentMemoryFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,[r]),(0,n.graphql)(`
    mutation UpdateAgentAvatar($agentId: ID!, $imageUrl: String!) {
      updateAgentAvatar(agentId: $agentId, imageUrl: $imageUrl) {
        ...AgentFragment
      }
    }
  `,[a]);let g=(0,n.graphql)(`
    mutation UpdateAgentName($agentId: ID!, $name: String!) {
      updateAgentName(agentId: $agentId, name: $name) {
        ...AgentFragment
      }
    }
  `,[a]),c=(0,n.graphql)(`
    mutation UpdateAgentPersonality($agentId: ID!, $content: String!) {
      updateAgentPersonality(agentId: $agentId, content: $content) {
        ...AgentFragment
      }
    }
  `,[a]),u=(0,n.graphql)(`
  mutation ToggleAgentSkill(
    $agentId: ID!
    $skillId: String!
    $enabled: Boolean!
  ) {
    toggleAgentSkill(
      agentId: $agentId
      skillId: $skillId
      enabled: $enabled
    ) {
      id
      skillId
      name
      enabled
    }
  }
`);(0,n.graphql)(`
    query ListInfluencerAgents($first: Int, $after: String) {
      influencerAgents(first: $first, after: $after) {
        edges {
          node {
            ...AgentFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,[a]);let m=(0,n.graphql)(`
    query MyAgent {
      myAgent {
        ...AgentFragment
      }
    }
  `,[a]),x=(0,n.graphql)(`
  query AgentLlmCreditBalance($agentId: ID!) {
    agentLlmCreditBalance(agentId: $agentId) {
      balanceUsd
    }
  }
`),p=(0,n.graphql)(`
  mutation TopUpLlmCredits($agentId: ID!, $amountUsd: Float!) {
    topUpLlmCredits(agentId: $agentId, amountUsd: $amountUsd) {
      creditsGranted
      newBalance
      txHash
    }
  }
`),h=(0,n.graphql)(`
  query AgentWalletUsdcBalance(
    $address: Address!
    $contracts: [ContractIdentifierInput!]!
  ) {
    addressBalances(address: $address, contracts: $contracts) {
      quantity
      usdValue
      currency {
        symbol
        decimals
        imageUrl
        usdPrice
        contractAddress
        chainIdentifier
      }
    }
  }
`);e.s(["AgentChatHistoryQuery",0,o,"AgentFragment",0,a,"AgentLlmCreditBalanceQuery",0,x,"AgentMemoryFragment",0,r,"AgentMemoryQuery",0,d,"AgentWalletUsdcBalanceQuery",0,h,"ChatMessageFragment",0,s,"CreateAgentMutation",0,i,"MyAgentQuery",0,m,"SendMessageMutation",0,l,"ToggleAgentSkillMutation",0,u,"TopUpLlmCreditsMutation",0,p,"UpdateAgentNameMutation",0,g,"UpdateAgentPersonalityMutation",0,c],44886)},395173,e=>{"use strict";let t={container:(0,e.i(437153).classNames)("fixed right-4 bottom-4 z-50 overflow-hidden rounded-xl","h-[520px] w-[400px]","bg-bg-primary/95 shadow-xl backdrop-blur-lg"),header:"items-center justify-between px-4 py-3",headerDivider:"border-b border-black/[0.06] dark:border-white/[0.06]",closeButton:"rounded p-1 text-text-secondary hover:bg-component-gray-2 transition-colors"};e.s(["AGENT_PANEL",0,t])},566139,e=>{"use strict";var t=e.i(866313),n=e.i(670383);let a=["provisioningStatus0","provisioningStatus1","provisioningStatus2","provisioningStatus3","provisioningStatus4","provisioningStatus5","provisioningStatus6","provisioningStatus7","provisioningStatus8","provisioningStatus9","provisioningStatus10","provisioningStatus11","provisioningStatus12","provisioningStatus13","provisioningStatus14","provisioningStatus15","provisioningStatus16","provisioningStatus17","provisioningStatus18","provisioningStatus19"];function s(e){let t;do t=Math.floor(Math.random()*a.length);while(t===e&&a.length>1)return t}function r(e){let r,o,d=(0,t.c)(3),[g,c]=(0,n.useState)(l);return d[0]!==e?(r=()=>{if(!e)return;c(s(-1));let t=setInterval(()=>{c(i)},3e3);return()=>clearInterval(t)},o=[e],d[0]=e,d[1]=r,d[2]=o):(r=d[1],o=d[2]),(0,n.useEffect)(r,o),a[g]??"provisioningStatus0"}function i(e){return s(e)}function l(){return s(-1)}e.s(["useProvisioningStatus",()=>r])},922363,e=>{"use strict";var t=e.i(7683),n=e.i(455480),a=e.i(459527),s=e.i(333799),r=e.i(502732),i=e.i(437153),l=e.i(254842),o=e.i(965523),d=e.i(2795),g=e.i(950293),c=e.i(683269),u=e.i(861690),m=e.i(558272),x=e.i(331348),p=e.i(522285),h=e.i(670383),y=e.i(145315),f=e.i(751712),A=e.i(617941),v=e.i(395173),I=e.i(44886),N=e.i(566139);function C(){let e=(0,p.useTranslations)("AgentChatOverlay"),{chatOpen:C,setChatOpen:j,setCreateModalOpen:b,setManagementOpen:S}=(0,A.useAgentStore)((0,y.useShallow)(e=>({chatOpen:e.chatOpen,setChatOpen:e.setChatOpen,setCreateModalOpen:e.setCreateModalOpen,setManagementOpen:e.setManagementOpen}))),$=(0,f.useAuthenticatedCallback)(()=>b(!0),{source:"AgentChatOverlay"}),M=(0,a.useClient)(),[w,F]=(0,h.useState)(""),q=(0,h.useRef)(null),[{fetching:T},B]=(0,a.useMutation)(I.SendMessageMutation),[k,P]=(0,h.useState)([]),U=(0,h.useRef)(null),{showErrorMessage:z}=(0,c.useToasts)(),[{data:E}]=(0,s.useQuery)({query:I.MyAgentQuery,pause:!C,requestPolicy:"cache-and-network"}),O=E?.myAgent,D=(0,h.useMemo)(()=>O?(0,n.readFragment)(I.AgentFragment,O):null,[O]),L=D?.status?.toLowerCase(),Q="provisioning"===L,H=(0,N.useProvisioningStatus)(Q),_="failed"===L,G="active"===L;(0,h.useEffect)(()=>{if(!(C&&Q))return;let e=setInterval(()=>{M.query(I.MyAgentQuery,{},{requestPolicy:"network-only"}).toPromise()},3e3);return()=>clearInterval(e)},[C,Q,M]);let R=D?.id,[{data:K,fetching:V}]=(0,s.useQuery)({query:I.AgentChatHistoryQuery,variables:{agentId:R??"",first:50},pause:!(R&&C&&G)}),[{data:W},Z]=(0,s.useQuery)({query:I.AgentLlmCreditBalanceQuery,variables:{agentId:R??""},pause:!(R&&C&&G),requestPolicy:"cache-and-network"}),J=W?.agentLlmCreditBalance?.balanceUsd,X=(0,h.useMemo)(()=>K?.chatHistory?.edges?.map(e=>(0,n.readFragment)(I.ChatMessageFragment,e.node))??[],[K]),Y=(0,h.useMemo)(()=>[...X,...k],[X,k]);(0,h.useEffect)(()=>{U.current?.scrollIntoView({behavior:"smooth"})},[Y.length]);let ee=(0,h.useCallback)(async()=>{if(!(w.trim()&&R)||T)return;let t=w.trim(),n=`optimistic-${Date.now()}`;F(""),q.current&&(q.current.style.height="auto"),P(e=>[...e,{id:n,role:"user",content:t,createdAt:new Date().toISOString()}]);let a=await B({agentId:R,message:t});if(a.error){P(e=>e.filter(e=>e.id!==n)),F(t);let s=a.error.message??"";s.includes("INSUFFICIENT_FUNDS")?(z(e("insufficientFundsError")),Z({requestPolicy:"network-only"})):s.includes("Rate limited")?z(e("rateLimitedError")):z(e("sendError"))}else await M.query(I.AgentChatHistoryQuery,{agentId:R,first:50},{requestPolicy:"network-only"}).toPromise(),P(e=>e.filter(e=>e.id!==n)),Z({requestPolicy:"network-only"})},[w,R,T,B,z,M,Z,e]),et=(0,h.useCallback)(e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ee())},[ee]);return C?(0,t.jsxs)(o.FlexColumn,{className:v.AGENT_PANEL.container,children:[(0,t.jsxs)(l.Flex,{className:(0,i.classNames)(v.AGENT_PANEL.header,v.AGENT_PANEL.headerDivider,"cursor-pointer"),onClick:()=>j(!1),children:[(0,t.jsxs)(l.Flex,{className:"items-center gap-2",children:[D?.avatarUrl?(0,t.jsx)("img",{alt:D.name,className:"h-8 w-8 rounded-full object-cover",loading:"lazy",src:D.avatarUrl}):(0,t.jsx)(l.Flex,{className:"h-8 w-8 items-center justify-center rounded-full bg-component-gray-3",children:(0,t.jsx)(g.TextBody,{size:"sm",weight:"semibold",children:D?.name?.[0]?.toUpperCase()??"?"})}),(0,t.jsxs)(o.FlexColumn,{children:[(0,t.jsx)(g.TextBody,{size:"sm",weight:"semibold",children:D?.name??e("defaultAgentName")}),(0,t.jsx)(g.TextBody,{className:(0,i.classNames)("text-text-tertiary",_&&"text-error-1"),size:"xs",children:Q?e("statusProvisioning"):_?e("statusFailed"):G?e("statusActive"):L??e("statusActive")})]})]}),(0,t.jsxs)(l.Flex,{className:"gap-1",onClick:e=>e.stopPropagation(),children:[D&&G&&(0,t.jsx)(r.Button,{onClick:()=>{j(!1),S(!0)},size:"sm",variant:"tertiary",children:e("manage")}),(0,t.jsx)("button",{"aria-label":e("close"),className:v.AGENT_PANEL.closeButton,onClick:()=>j(!1),type:"button",children:(0,t.jsx)(u.Close,{size:16})})]})]}),(0,t.jsxs)(o.FlexColumn,{className:"flex-1 gap-3 overflow-y-auto p-4",children:[D&&Q?(0,t.jsxs)(o.FlexColumn,{className:"flex-1 items-center justify-center gap-4",children:[(0,t.jsx)(d.Spinner,{}),(0,t.jsxs)(o.FlexColumn,{className:"items-center gap-1",children:[(0,t.jsx)(g.TextBody,{size:"sm",weight:"semibold",children:e("provisioningTitle")}),(0,t.jsx)(g.TextBody,{className:"text-text-secondary",size:"xs",children:e("provisioningDescription")}),(0,t.jsx)(g.TextBody,{className:"fade-in animate-in text-text-secondary duration-500",size:"xs",children:e(H)},H)]})]}):D&&_?(0,t.jsxs)(o.FlexColumn,{className:"flex-1 items-center justify-center gap-4",children:[(0,t.jsx)(m.ErrorIcon,{className:"text-error-1",size:32}),(0,t.jsxs)(o.FlexColumn,{className:"items-center gap-1",children:[(0,t.jsx)(g.TextBody,{size:"sm",weight:"semibold",children:e("failedTitle")}),(0,t.jsx)(g.TextBody,{className:"text-center text-text-secondary",size:"xs",children:e("failedDescription")})]}),(0,t.jsx)(r.Button,{onClick:()=>{j(!1),$()},size:"sm",children:e("retryCreate")})]}):D&&G?V?(0,t.jsx)(l.Flex,{className:"flex-1 items-center justify-center",children:(0,t.jsx)(d.Spinner,{})}):0===Y.length?(0,t.jsx)(o.FlexColumn,{className:"flex-1 items-center justify-center gap-2",children:(0,t.jsx)(g.TextBody,{className:"text-text-secondary",size:"sm",children:e("emptyState")})}):Y.map(e=>(0,t.jsx)(l.Flex,{className:(0,i.classNames)("user"===e.role?"justify-end":"justify-start"),children:(0,t.jsxs)("div",{className:(0,i.classNames)("max-w-[80%] rounded-lg px-3 py-2","user"===e.role?"bg-interactive-primary text-white":"bg-component-gray-2 text-text-primary"),children:[(0,t.jsx)(g.TextBody,{size:"sm",children:e.content}),(0,t.jsx)(g.TextBody,{className:(0,i.classNames)("mt-1","user"===e.role?"text-white/60":"text-text-tertiary"),size:"xs",children:new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]})},e.id)):D?(0,t.jsxs)(o.FlexColumn,{className:"flex-1 items-center justify-center gap-2",children:[(0,t.jsx)(d.Spinner,{}),(0,t.jsx)(g.TextBody,{className:"text-text-secondary",size:"sm",children:L??e("statusActive")})]}):(0,t.jsxs)(o.FlexColumn,{className:"flex-1 items-center justify-center gap-3",children:[(0,t.jsx)(g.TextBody,{className:"text-text-secondary",size:"sm",children:e("noAgentMessage")}),(0,t.jsx)(r.Button,{onClick:()=>{j(!1),$()},size:"sm",children:e("createAgent")})]}),(0,t.jsx)("div",{ref:U})]}),D&&G&&null!=J&&J<1&&(0,t.jsxs)(l.Flex,{className:(0,i.classNames)("items-center gap-2 bg-warning-transparent-1 px-3 py-2",v.AGENT_PANEL.headerDivider,"border-t border-b-0"),children:[(0,t.jsx)(g.TextBody,{className:"flex-1 text-warning",size:"xs",children:e("lowBalanceWarning")}),(0,t.jsx)(r.Button,{onClick:()=>{j(!1),S(!0)},size:"sm",variant:"tertiary",children:e("topUp")})]}),D&&G&&(0,t.jsxs)(l.Flex,{className:(0,i.classNames)("items-end gap-2 p-3",v.AGENT_PANEL.headerDivider,"border-t border-b-0"),children:[(0,t.jsx)("textarea",{className:"max-h-[120px] min-h-[36px] flex-1 resize-none rounded-lg bg-component-gray-1 px-3 py-2 text-sm text-text-primary outline-hidden transition-colors placeholder:text-text-secondary focus:bg-component-gray-2",disabled:T,onChange:e=>{F(e.target.value);let t=e.target;t.style.height="auto",t.style.height=`${t.scrollHeight}px`},onKeyDown:et,placeholder:e("inputPlaceholder"),ref:q,rows:1,value:w}),(0,t.jsx)("button",{className:(0,i.classNames)("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",w.trim()&&!T?"bg-interactive-primary text-white":"bg-component-gray-1 text-text-tertiary"),disabled:!w.trim()||T,onClick:()=>void ee(),type:"button",children:T?(0,t.jsx)(d.Spinner,{size:"xs"}):(0,t.jsx)(x.Send,{size:16})})]})]}):null}e.s(["AgentChatOverlay",()=>C])},427830,e=>{e.n(e.i(922363))}]);

//# debugId=d8e36cf6-db25-2249-bc36-412689451938
//# sourceMappingURL=4ef0bca8b41e9f75.js.map