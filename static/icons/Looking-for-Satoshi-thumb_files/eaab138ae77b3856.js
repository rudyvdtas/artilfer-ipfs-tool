;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="67510fb7-c7fe-1693-56e0-909f297ff969")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,784767,e=>{"use strict";var t=e.i(7683),n=e.i(866313),a=e.i(261901),r=e.i(437153);function i(e){let i,s,o,g,l,d,u,c=(0,n.c)(14);return c[0]!==e?({className:i,disabled:s,error:o,variant:l,...g}=e,c[0]=e,c[1]=i,c[2]=s,c[3]=o,c[4]=g,c[5]=l):(i=c[1],s=c[2],o=c[3],g=c[4],l=c[5]),c[6]!==i||c[7]!==s||c[8]!==o||c[9]!==l?(d=(0,r.classNames)((0,a.inputVariants)({variant:l,disabled:s,error:o}),"h-auto w-full resize-y whitespace-pre-wrap break-words rounded-lg p-3","bg-transparent outline-hidden",i),c[6]=i,c[7]=s,c[8]=o,c[9]=l,c[10]=d):d=c[10],c[11]!==g||c[12]!==d?(u=(0,t.jsx)("textarea",{className:d,...g}),c[11]=g,c[12]=d,c[13]=u):u=c[13],u}e.s(["TextArea",()=>i])},617941,44886,e=>{"use strict";let t=(0,e.i(729427).create)(e=>({chatOpen:!1,setChatOpen:t=>e({chatOpen:t}),createModalOpen:!1,setCreateModalOpen:t=>e({createModalOpen:t}),managementOpen:!1,setManagementOpen:t=>e({managementOpen:t})}));e.s(["useAgentStore",0,t],617941);var n=e.i(885530);let a=(0,n.graphql)(`
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
`),r=(0,n.graphql)(`
  fragment ChatMessageFragment on ChatMessage {
    id
    role
    content
    metadata
    createdAt
  }
`),i=(0,n.graphql)(`
  fragment AgentMemoryFragment on AgentMemory {
    id
    content
    version
    updatedFrom
    createdAt
  }
`),s=(0,n.graphql)(`
    mutation CreateAgent($input: CreateAgentInput!) {
      createAgent(input: $input) {
        ...AgentFragment
      }
    }
  `,[a]),o=(0,n.graphql)(`
    mutation SendAgentMessage($agentId: ID!, $message: String!) {
      sendMessage(agentId: $agentId, message: $message) {
        ...ChatMessageFragment
      }
    }
  `,[r]),g=(0,n.graphql)(`
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
  `,[r]),l=(0,n.graphql)(`
    query AgentMemory($agentId: ID!) {
      agentMemory(agentId: $agentId) {
        ...AgentMemoryFragment
      }
    }
  `,[i]);(0,n.graphql)(`
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
  `,[i]),(0,n.graphql)(`
    mutation UpdateAgentAvatar($agentId: ID!, $imageUrl: String!) {
      updateAgentAvatar(agentId: $agentId, imageUrl: $imageUrl) {
        ...AgentFragment
      }
    }
  `,[a]);let d=(0,n.graphql)(`
    mutation UpdateAgentName($agentId: ID!, $name: String!) {
      updateAgentName(agentId: $agentId, name: $name) {
        ...AgentFragment
      }
    }
  `,[a]),u=(0,n.graphql)(`
    mutation UpdateAgentPersonality($agentId: ID!, $content: String!) {
      updateAgentPersonality(agentId: $agentId, content: $content) {
        ...AgentFragment
      }
    }
  `,[a]),c=(0,n.graphql)(`
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
  `,[a]),p=(0,n.graphql)(`
  query AgentLlmCreditBalance($agentId: ID!) {
    agentLlmCreditBalance(agentId: $agentId) {
      balanceUsd
    }
  }
`),h=(0,n.graphql)(`
  mutation TopUpLlmCredits($agentId: ID!, $amountUsd: Float!) {
    topUpLlmCredits(agentId: $agentId, amountUsd: $amountUsd) {
      creditsGranted
      newBalance
      txHash
    }
  }
`),A=(0,n.graphql)(`
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
`);e.s(["AgentChatHistoryQuery",0,g,"AgentFragment",0,a,"AgentLlmCreditBalanceQuery",0,p,"AgentMemoryFragment",0,i,"AgentMemoryQuery",0,l,"AgentWalletUsdcBalanceQuery",0,A,"ChatMessageFragment",0,r,"CreateAgentMutation",0,s,"MyAgentQuery",0,m,"SendMessageMutation",0,o,"ToggleAgentSkillMutation",0,c,"TopUpLlmCreditsMutation",0,h,"UpdateAgentNameMutation",0,d,"UpdateAgentPersonalityMutation",0,u],44886)},566139,e=>{"use strict";var t=e.i(866313),n=e.i(670383);let a=["provisioningStatus0","provisioningStatus1","provisioningStatus2","provisioningStatus3","provisioningStatus4","provisioningStatus5","provisioningStatus6","provisioningStatus7","provisioningStatus8","provisioningStatus9","provisioningStatus10","provisioningStatus11","provisioningStatus12","provisioningStatus13","provisioningStatus14","provisioningStatus15","provisioningStatus16","provisioningStatus17","provisioningStatus18","provisioningStatus19"];function r(e){let t;do t=Math.floor(Math.random()*a.length);while(t===e&&a.length>1)return t}function i(e){let i,g,l=(0,t.c)(3),[d,u]=(0,n.useState)(o);return l[0]!==e?(i=()=>{if(!e)return;u(r(-1));let t=setInterval(()=>{u(s)},3e3);return()=>clearInterval(t)},g=[e],l[0]=e,l[1]=i,l[2]=g):(i=l[1],g=l[2]),(0,n.useEffect)(i,g),a[d]??"provisioningStatus0"}function s(e){return r(e)}function o(){return r(-1)}e.s(["useProvisioningStatus",()=>i])},144114,e=>{"use strict";var t=e.i(7683),n=e.i(455480),a=e.i(459527),r=e.i(965523),i=e.i(284296),s=e.i(972483),o=e.i(2795),g=e.i(784767),l=e.i(950293),d=e.i(683269),u=e.i(522285),c=e.i(670383),m=e.i(145315),p=e.i(617941),h=e.i(44886),A=e.i(566139);function y(){let e=(0,u.useTranslations)("CreateAgentModal"),{createModalOpen:y,setCreateModalOpen:I}=(0,p.useAgentStore)((0,m.useShallow)(e=>({createModalOpen:e.createModalOpen,setCreateModalOpen:e.setCreateModalOpen}))),$=(0,a.useClient)(),[f,x]=(0,c.useState)(""),[M,S]=(0,c.useState)(""),[{fetching:v},C]=(0,a.useMutation)(h.CreateAgentMutation),[F,q]=(0,c.useState)(!1),[j,T]=(0,c.useState)(!1),{showSuccessMessage:b,showErrorMessage:B}=(0,d.useToasts)(),U=(0,c.useRef)(null),O=(0,A.useProvisioningStatus)(F),k=(0,c.useCallback)(()=>{U.current&&(clearTimeout(U.current),U.current=null)},[]);(0,c.useEffect)(()=>k,[k]);let w=(0,c.useCallback)((t,a=0,r=0)=>{if(a>=60){q(!1),T(!0),B(e("provisioningTimeout"));return}U.current=setTimeout(async()=>{let i=await $.query(h.MyAgentQuery,{},{requestPolicy:"network-only"}).toPromise();if(i.error){let n=r+1;if(n>=5){q(!1),T(!0),B(e("provisioningFailed"));return}w(t,a+1,n);return}let s=i.data?.myAgent,o=s?(0,n.readFragment)(h.AgentFragment,s):null,g=o?.status?.toLowerCase();if("failed"===g){q(!1),T(!0),B(e("provisioningFailed"));return}if(o&&"provisioning"!==g){q(!1),k(),x(""),S(""),b(e("createSuccess",{name:t})),p.useAgentStore.setState({createModalOpen:!1,chatOpen:!0});return}w(t,a+1,0)},2e3)},[$,b,B,k,e]),P=(0,c.useCallback)(async()=>{f.trim()?(T(!1),(await C({input:{name:f.trim(),personality:M.trim()||void 0}})).error)?B(e("createError")):(q(!0),w(f.trim())):B(e("nameRequired"))},[f,M,C,B,w,e]);return(0,t.jsx)(s.Modal,{content:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.ModalHeader,{children:(0,t.jsx)(s.ModalHeaderTitle,{children:e("title")})}),(0,t.jsx)(s.ModalBody,{children:F?(0,t.jsxs)(r.FlexColumn,{className:"items-center gap-4 py-8",children:[(0,t.jsx)(o.Spinner,{size:"md"}),(0,t.jsx)(l.TextBody,{size:"sm",children:e("provisioningMessage",{name:f||"your agent"})}),(0,t.jsx)(l.TextBody,{className:"fade-in animate-in text-text-secondary duration-500",size:"xs",children:e(O,{name:f||"your agent"})},O)]}):(0,t.jsxs)(r.FlexColumn,{className:"gap-4",children:[(0,t.jsx)(l.TextBody,{size:"sm",children:e("description")}),j&&(0,t.jsx)(l.TextBody,{className:"text-error-1",size:"sm",children:e("provisioningFailed")}),(0,t.jsxs)(r.FlexColumn,{className:"gap-2",children:[(0,t.jsx)(l.TextBody,{size:"sm",weight:"semibold",children:e("nameLabel")}),(0,t.jsx)(i.Input,{maxLength:100,onChange:e=>x(e.target.value),placeholder:e("namePlaceholder"),value:f})]}),(0,t.jsxs)(r.FlexColumn,{className:"gap-2",children:[(0,t.jsx)(l.TextBody,{size:"sm",weight:"semibold",children:e("personalityLabel")}),(0,t.jsx)(g.TextArea,{maxLength:5e3,onChange:e=>S(e.target.value),placeholder:e("personalityPlaceholder"),rows:4,value:M})]})]})}),!F&&(0,t.jsxs)(s.ModalFooter,{children:[(0,t.jsx)(s.ModalFooterButton,{onClick:()=>{x(""),S(""),T(!1),I(!1)},variant:"secondary",children:e("cancel")}),(0,t.jsx)(s.ModalFooterButton,{disabled:!f.trim()||v,onClick:()=>void P(),children:v?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.Spinner,{size:"xs"}),e("creating")]}):j?e("retryButton"):e("createButton")})]})]}),onOpenChange:e=>{e||F||(x(""),S(""),T(!1)),F||I(e)},open:y})}e.s(["CreateAgentModal",()=>y])},865295,e=>{e.n(e.i(144114))}]);

//# debugId=67510fb7-c7fe-1693-56e0-909f297ff969
//# sourceMappingURL=bf0f87d8fc0b0a73.js.map