;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="0486e892-f766-eaba-cbba-066a3a6c1b1e")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,617941,44886,e=>{"use strict";let t=(0,e.i(729427).create)(e=>({chatOpen:!1,setChatOpen:t=>e({chatOpen:t}),createModalOpen:!1,setCreateModalOpen:t=>e({createModalOpen:t}),managementOpen:!1,setManagementOpen:t=>e({managementOpen:t})}));e.s(["useAgentStore",0,t],617941);var a=e.i(885530);let n=(0,a.graphql)(`
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
`),r=(0,a.graphql)(`
  fragment ChatMessageFragment on ChatMessage {
    id
    role
    content
    metadata
    createdAt
  }
`),g=(0,a.graphql)(`
  fragment AgentMemoryFragment on AgentMemory {
    id
    content
    version
    updatedFrom
    createdAt
  }
`),s=(0,a.graphql)(`
    mutation CreateAgent($input: CreateAgentInput!) {
      createAgent(input: $input) {
        ...AgentFragment
      }
    }
  `,[n]),l=(0,a.graphql)(`
    mutation SendAgentMessage($agentId: ID!, $message: String!) {
      sendMessage(agentId: $agentId, message: $message) {
        ...ChatMessageFragment
      }
    }
  `,[r]),i=(0,a.graphql)(`
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
  `,[r]),d=(0,a.graphql)(`
    query AgentMemory($agentId: ID!) {
      agentMemory(agentId: $agentId) {
        ...AgentMemoryFragment
      }
    }
  `,[g]);(0,a.graphql)(`
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
  `,[g]),(0,a.graphql)(`
    mutation UpdateAgentAvatar($agentId: ID!, $imageUrl: String!) {
      updateAgentAvatar(agentId: $agentId, imageUrl: $imageUrl) {
        ...AgentFragment
      }
    }
  `,[n]);let o=(0,a.graphql)(`
    mutation UpdateAgentName($agentId: ID!, $name: String!) {
      updateAgentName(agentId: $agentId, name: $name) {
        ...AgentFragment
      }
    }
  `,[n]),m=(0,a.graphql)(`
    mutation UpdateAgentPersonality($agentId: ID!, $content: String!) {
      updateAgentPersonality(agentId: $agentId, content: $content) {
        ...AgentFragment
      }
    }
  `,[n]),c=(0,a.graphql)(`
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
`);(0,a.graphql)(`
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
  `,[n]);let u=(0,a.graphql)(`
    query MyAgent {
      myAgent {
        ...AgentFragment
      }
    }
  `,[n]),p=(0,a.graphql)(`
  query AgentLlmCreditBalance($agentId: ID!) {
    agentLlmCreditBalance(agentId: $agentId) {
      balanceUsd
    }
  }
`),A=(0,a.graphql)(`
  mutation TopUpLlmCredits($agentId: ID!, $amountUsd: Float!) {
    topUpLlmCredits(agentId: $agentId, amountUsd: $amountUsd) {
      creditsGranted
      newBalance
      txHash
    }
  }
`),h=(0,a.graphql)(`
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
`);e.s(["AgentChatHistoryQuery",0,i,"AgentFragment",0,n,"AgentLlmCreditBalanceQuery",0,p,"AgentMemoryFragment",0,g,"AgentMemoryQuery",0,d,"AgentWalletUsdcBalanceQuery",0,h,"ChatMessageFragment",0,r,"CreateAgentMutation",0,s,"MyAgentQuery",0,u,"SendMessageMutation",0,l,"ToggleAgentSkillMutation",0,c,"TopUpLlmCreditsMutation",0,A,"UpdateAgentNameMutation",0,o,"UpdateAgentPersonalityMutation",0,m],44886)},919776,e=>{"use strict";var t=e.i(7683),a=e.i(866313),n=e.i(455480),r=e.i(333799),g=e.i(2795),s=e.i(950293),l=e.i(522285),i=e.i(145315),d=e.i(751712),o=e.i(806056),m=e.i(617941),c=e.i(44886);function u(){let e,u,A,h,I=(0,a.c)(11),y=(0,l.useTranslations)("AgentAvatarWidget"),$=(0,o.useIsAgentChatEnabled)(),{chatOpen:f,setChatOpen:M,setCreateModalOpen:C,createModalOpen:q,managementOpen:b}=(0,m.useAgentStore)((0,i.useShallow)(p)),U=!$;I[0]!==U?(e={query:c.MyAgentQuery,pause:U},I[0]=U,I[1]=e):e=I[1];let[x]=(0,r.useQuery)(e),{data:F}=x;I[2]!==C?(u=()=>C(!0),I[2]=C,I[3]=u):u=I[3],I[4]===Symbol.for("react.memo_cache_sentinel")?(A={source:"AgentAvatarWidget"},I[4]=A):A=I[4];let O=(0,d.useAuthenticatedCallback)(u,A);if(!$||f||b||q)return null;let S=F?.myAgent;if(I[5]!==S||I[6]!==O||I[7]!==M||I[8]!==y){let e,a=S?(0,n.readFragment)(c.AgentFragment,S):null,r=a?.status?.toLowerCase(),l="provisioning"===r,i="failed"===r;I[10]===Symbol.for("react.memo_cache_sentinel")?(e={right:"calc(1rem + var(--removed-body-scroll-bar-size, 0px))"},I[10]=e):e=I[10],h=(0,t.jsx)("button",{className:"fixed bottom-12 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-bg-primary shadow-xl transition-transform hover:scale-105 active:scale-95",onClick:()=>{a?M(!0):O()},style:e,title:l?y("provisioning"):i?y("agentFailed"):a?y("chatWith",{name:a.name}):y("createAgent"),type:"button",children:l?(0,t.jsx)(g.Spinner,{size:"xs"}):i?(0,t.jsx)(s.TextBody,{className:"text-error-1",size:"sm",weight:"semibold",children:"!"}):a?.avatarUrl?(0,t.jsx)("img",{alt:a.name,className:"h-full w-full rounded-full object-cover",loading:"lazy",src:a.avatarUrl}):a?(0,t.jsx)(s.TextBody,{size:"sm",weight:"semibold",children:a.name[0]?.toUpperCase()??"A"}):(0,t.jsx)("span",{className:"text-[26px] leading-none",children:"🤖"})}),I[5]=S,I[6]=O,I[7]=M,I[8]=y,I[9]=h}else h=I[9];return h}function p(e){return{chatOpen:e.chatOpen,setChatOpen:e.setChatOpen,setCreateModalOpen:e.setCreateModalOpen,createModalOpen:e.createModalOpen,managementOpen:e.managementOpen}}e.s(["AgentAvatarWidget",()=>u])},780936,e=>{e.n(e.i(919776))}]);

//# debugId=0486e892-f766-eaba-cbba-066a3a6c1b1e
//# sourceMappingURL=38031a7dde707c2e.js.map