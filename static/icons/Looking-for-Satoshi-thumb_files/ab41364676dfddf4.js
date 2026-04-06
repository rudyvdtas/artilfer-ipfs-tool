;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="5276f7de-bafd-5eab-3eee-17894c4d0ecc")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,361419,928796,e=>{"use strict";var t=e.i(646426),i=e.i(885530),s=e.i(455480),r=e.i(333799),a=e.i(838820),n=e.i(861316),l=e.i(471317),o=e.i(670383),c=e.i(436609),d=e.i(916511);let u=(0,i.graphql)(`
    fragment WalletVisibilityItem on Profile {
      address
      displayName
      portfolioSummary {
        estimatedTokenValue {
          usd
        }
      }
      ...AccountLockup
      ...profileUrl
    }
  `,[t.AccountLockupFragment,d.profileUrlFragment]);e.s(["WalletVisibilityItemFragment",0,u],928796);let m=(0,i.graphql)(`
    query SettingsLinkedWalletsQuery($address: Address!) {
      profilesByAccount(address: $address) {
        account {
          ... on Profile {
            ...AccountSwitcherAccountItems
            ...AccountLockup
          }
        }
        profiles {
          ... on Profile {
            ...AccountSwitcherAccountItems
            ...AccountLockup
            ...WalletVisibilityItem
          }
        }
      }

    }
  `,[c.AccountSwitcherAccountItemsFragment,t.AccountLockupFragment,u]),f={suspense:!1,ttl:l.TTL["15s"]};function g(e){let[{data:t,fetching:i},l]=(0,r.useQuery)({query:m,variables:{address:e},pause:!e,context:f}),d=t?.profilesByAccount?.account,u=(0,o.useMemo)(()=>d?.__typename==="Profile"?(0,s.readFragment)(c.AccountSwitcherAccountItemsFragment,d):void 0,[d]),g=(0,o.useMemo)(()=>(t?.profilesByAccount?.profiles??[]).filter(e=>e?.__typename==="Profile").map(e=>({...(0,s.readFragment)(c.AccountSwitcherAccountItemsFragment,e),walletVisibilityItemFragment:e})).sort((e,t)=>{if(u){let i=(0,s.readFragment)(c.AccountSwitcherAccountItemsFragment,u),r=(0,n.isAddressEqual)(e.address,i.address),a=(0,n.isAddressEqual)(t.address,i.address);if(r&&!a)return -1;if(!r&&a)return 1}let i=e.portfolioSummary?.estimatedTokenValue?.usd??-1,r=t.portfolioSummary?.estimatedTokenValue?.usd??-1;if(i!==r)return r-i;let l=e.displayName||(0,a.formatAddress)((0,n.normalizeAddress)(e.address)),o=t.displayName||(0,a.formatAddress)((0,n.normalizeAddress)(t.address));return l.localeCompare(o)}),[t?.profilesByAccount?.profiles,u]),p=(0,o.useMemo)(()=>g.map(e=>e.address),[g]);return{profilesByAccount:g,topAccount:u,linkedWalletAddresses:p,fetching:i,refetch:l}}e.s(["useLinkedWallets",()=>g],361419)},514397,889219,245872,e=>{"use strict";var t=e.i(925854);let i={X:e.i(79097).Twitter,DISCORD:t.Discord};e.s(["socialNetworkCopyMap",0,{X:"X",DISCORD:"Discord"},"socialNetworkIconMap",0,i],514397);var s=e.i(7683),r=e.i(866313),a=e.i(502732),n=e.i(194153),l=e.i(39771),o=e.i(258343),c=e.i(950293);function d(e){let t,i,d,u,m,f=(0,r.c)(14),{title:g,button:p,buttonIcon:x,icon:y,onClick:h}=e;return f[0]!==y?(t=(0,s.jsx)(n.CenterAligned,{className:"dark inset-shadow-border size-7 rounded-lg bg-bg-app p-1.5",children:(0,s.jsx)(y,{})}),f[0]=y,f[1]=t):t=f[1],f[2]!==g?(i=(0,s.jsx)(c.TextBody,{size:"sm",children:g}),f[2]=g,f[3]=i):i=f[3],f[4]!==t||f[5]!==i?(d=(0,s.jsxs)(l.FlexCenter,{className:"gap-1.5",children:[t,i]}),f[4]=t,f[5]=i,f[6]=d):d=f[6],f[7]!==p||f[8]!==x||f[9]!==h?(u=(0,s.jsx)(a.Button,{icon:x,iconSide:"left",onClick:h,size:"xs",variant:"secondary-transparent",children:p}),f[7]=p,f[8]=x,f[9]=h,f[10]=u):u=f[10],f[11]!==d||f[12]!==u?(m=(0,s.jsxs)(o.SpaceBetween,{className:"inset-shadow-border w-full items-center rounded-lg bg-bg-secondary p-2",children:[d,u]}),f[11]=d,f[12]=u,f[13]=m):m=f[13],m}e.s(["SocialConnectionButton",()=>d],889219),e.s([],245872)},286073,e=>{"use strict";var t=e.i(700398);e.i(500598);var i=e.i(207225);function s(){let e=(0,i.useAddress)(),s=(0,t.usePrimaryAccount)();return s?s.address:e}e.s(["useSettingsAddress",()=>s])},731343,e=>{"use strict";e.s(["URL_REGEX",0,/^(?:https?:\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/])},127574,e=>{"use strict";var t=e.i(223458);function i(){return()=>{t.AccountActions.refreshLinkedAccounts()}}e.s(["useRefreshLinkedAccounts",()=>i])},609866,e=>{"use strict";var t=e.i(7683),i=e.i(866313),s=e.i(875991),r=e.i(885530),a=e.i(459527),n=e.i(333799),l=e.i(605522),o=e.i(502732),c=e.i(194153),d=e.i(437153),u=e.i(254842),m=e.i(965523),f=e.i(893212),g=e.i(284296),p=e.i(2795),x=e.i(784767),y=e.i(950293),h=e.i(625236),S=e.i(683269),b=e.i(722934),A=e.i(59690),j=e.i(176772),w=e.i(127574),v=e.i(522285),T=e.i(670383),C=e.i(187225),k=e.i(207653),N=e.i(567089),P=e.i(967593);function B(e){let s,r,a,n,l=(0,i.c)(13),{isVerified:o}=e,c=(0,v.useTranslations)("VerifiedBadge");if(o){let e,i;return l[0]!==c?(e=c("verified"),l[0]=c,l[1]=e):e=l[1],l[2]!==e?(i=(0,t.jsx)(N.Chip,{className:"absolute top-1/2 right-2 -translate-y-1/2",color:"success-1",children:e}),l[2]=e,l[3]=i):i=l[3],i}return l[4]!==c?(s=c("verificationLinkSent"),l[4]=c,l[5]=s):s=l[5],l[6]!==c?(r=c("unverified"),l[6]=c,l[7]=r):r=l[7],l[8]!==r?(a=(0,t.jsx)(N.Chip,{className:"absolute top-1/2 right-2 -translate-y-1/2",color:"warning",children:r}),l[8]=r,l[9]=a):a=l[9],l[10]!==s||l[11]!==a?(n=(0,t.jsx)(P.Tooltip,{content:s,children:a}),l[10]=s,l[11]=a,l[12]=n):n=l[12],n}var I=e.i(361419),U=e.i(389852),z=e.i(83617),M=e.i(541412),E=e.i(924457),F=e.i(115858);e.i(500598);var _=e.i(71105),$=e.i(731343);let R=/^https?:\/\//i,V=k.z.union([k.z.string().trim().transform(e=>R.test(e)?e:`https://${e}`).refine(e=>$.URL_REGEX.test(e),{message:"Please enter a valid URL"}),k.z.literal("")]).optional();function q(e){let s,r,a=(0,i.c)(10),{isEditing:n,onEdit:l,onCancel:c}=e,d=(0,v.useTranslations)("EmailEditButton");if(n){let e,i;return a[0]!==d?(e=d("cancel"),a[0]=d,a[1]=e):e=a[1],a[2]!==c||a[3]!==e?(i=(0,t.jsx)(o.Button,{onClick:c,variant:"secondary",children:e}),a[2]=c,a[3]=e,a[4]=i):i=a[4],i}return a[5]!==d?(s=d("edit"),a[5]=d,a[6]=s):s=a[6],a[7]!==l||a[8]!==s?(r=(0,t.jsx)(o.Button,{onClick:l,variant:"secondary",children:s}),a[7]=l,a[8]=s,a[9]=r):r=a[9],r}var L=e.i(155757),D=e.i(457628),O=e.i(150093),Q=e.i(689666),W=e.i(199800);let X=(0,r.graphql)(`
  mutation UseProfileImageUpload($imageType: ImageType!, $address: Address) {
    uploadProfileImage(imageType: $imageType, address: $address) {
      url
      method
      fields
      token
    }
  }
`);function G(e){let[t,i]=(0,a.useMutation)(X),[s,r]=(0,T.useState)(!1);return{upload:async function(t,s){r(!0);try{let{data:r,error:a}=await i({imageType:e,address:s});if(a)throw a;if(r?.uploadProfileImage)return await (0,W.uploadFile)(r.uploadProfileImage,t);throw Error("Failed to upload file")}finally{r(!1)}},isUploading:s}}var K=e.i(286073),Z=e.i(207225);let H=(0,e.i(703379).tv)({slots:{group:"group relative cursor-pointer bg-black",image:"opacity-60 transition-opacity duration-300 ease-out-quint group-hover:opacity-80",editIcon:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}}),J=(0,r.graphql)(`
  mutation ProfileSettingsMediaAvatarMutation(
    $address: Address!,
    $newSettings: ProfileSettingsInput!,
    $target: ProfileTargetType
  ) {
    updateProfileSettings(address: $address, newSettings: $newSettings, target: $target) {
      __typename
    }
  }
`),Y=(0,W.getBytesFromMegabytes)(20);function ee({defaultImageUrl:e,onSuccess:i,onImageChanged:s,address:r,target:n}){let l=(0,v.useTranslations)("SettingsProfileMedia.avatar"),o=(0,K.useSettingsAddress)(),c=(0,Z.useAddress)(),u=r??o,{upload:m,isUploading:f}=G("PROFILE_PICTURE"),{group:g,image:p,editIcon:x}=H(),[y,h]=(0,a.useMutation)(J),[b,A]=(0,T.useState)(e),{showSuccessMessage:j,showErrorMessage:w}=(0,S.useToasts)();(0,T.useEffect)(()=>{e&&A(e)},[e]);let{getRootProps:C,getInputProps:k}=(0,Q.useDropzone)({disabled:f,accept:{"image/*":[]},maxFiles:1,maxSize:Y,onDrop:async e=>{try{let t=(0,W.readFileAsDataURL)(e[0]),r="ACCOUNT"===n?void 0:u,{token:a}=await m(e[0],r),o="ACCOUNT"===n?c:u;await h({address:o??"",newSettings:{profileImageToken:a},target:n}),A(await t),j(l("successMessage")),i?.();try{s?.()}catch(e){console.error("Error in image changed callback:",e)}}catch{w(l("errorMessage"))}}});return(0,t.jsxs)(D.UnstyledButton,{...C(),className:(0,d.classNames)(g(),"mb-[calc(-40px+theme(spacing.3))] aspect-square size-[80px] -translate-y-1/2 rounded-full"),children:[(0,t.jsx)(L.Avatar,{border:!0,className:p(),rounded:!0,seed:u,size:80,src:b}),(0,t.jsx)(O.Edit,{className:x(),fill:"white",size:30}),(0,t.jsx)("input",{...k()})]})}var et=e.i(100868);let ei=(0,r.graphql)(`
  mutation ProfileSettingsMediaBannerMutation(
    $address: Address!,
    $newSettings: ProfileSettingsInput!,
    $target: ProfileTargetType
  ) {
    updateProfileSettings(address: $address, newSettings: $newSettings, target: $target) {
      __typename
    }
  }
`),es=(0,W.getBytesFromMegabytes)(20);function er({defaultImageUrl:e,onSuccess:i,onImageChanged:s,address:r,target:n}){let l=(0,v.useTranslations)("SettingsProfileMedia.banner"),o=(0,K.useSettingsAddress)(),c=(0,Z.useAddress)(),u=r??o,{group:m,image:f,editIcon:g}=H(),{upload:p,isUploading:x}=G("BANNER_IMAGE"),[y,h]=(0,a.useMutation)(ei),[b,A]=(0,T.useState)(e),{showSuccessMessage:j,showErrorMessage:w}=(0,S.useToasts)();(0,T.useEffect)(()=>{e&&A(e)},[e]);let{getRootProps:C,getInputProps:k}=(0,Q.useDropzone)({disabled:x,accept:{"image/*":[]},maxFiles:1,maxSize:es,onDrop:async e=>{try{let t=(0,W.readFileAsDataURL)(e[0]),r="ACCOUNT"===n?void 0:u,{token:a}=await p(e[0],r),o="ACCOUNT"===n?c:u;await h({address:o??"",newSettings:{bannerImageToken:a},target:n}),A(await t),j(l("successMessage")),i?.();try{s?.()}catch(e){console.error("Error in image changed callback:",e)}}catch{w(l("errorMessage"))}}}),N=(0,d.classNames)(f(),"absolute !top-1/2 size-full -translate-y-1/2 object-cover");return(0,t.jsxs)(D.UnstyledButton,{...C(),className:(0,d.classNames)("aspect-8/3 w-full overflow-hidden rounded-t [mask-image:linear-gradient(to_bottom,black,black_calc(100%_-_theme(spacing.16)),transparent)]",m()),children:[b?(0,t.jsx)(et.Image,{className:N,src:b,width:512}):(0,t.jsx)(L.Avatar,{className:(0,d.classNames)(N,"scale-125 blur-xl"),seed:u}),(0,t.jsx)(O.Edit,{className:g(),fill:"white",size:30}),(0,t.jsx)("input",{...k()})]})}var ea=e.i(455480),en=e.i(217961),el=e.i(912997),eo=e.i(514397);e.i(245872);var ec=e.i(889219);let ed=(0,r.graphql)(`
  fragment SettingsProfileSocialConnectionButton on Socials {
    x
  }
`),eu=(0,r.graphql)(`
  mutation CreateAccountSocialConnectionUrlMutation($network: SocialNetwork!) {
    createAccountSocialConnectionUrl(network: $network)
  }
`),em=(0,r.graphql)(`
  mutation RemoveSocialConnectionMutation($network: SocialNetwork!) {
    removeSocialConnection(network: $network)
  }
`);function ef(e){let s,r,n,l,o,c=(0,i.c)(20),{socials:d,network:u}=e,m=(0,v.useTranslations)("SettingsProfileSocialConnectionButton"),{showSuccessMessage:f}=(0,S.useToasts)(),g=(0,ea.readFragment)(ed,d).x,[p,x]=(0,T.useState)(!!g),y=(0,a.useMutation)(eu)[1],h=(0,a.useMutation)(em)[1];c[0]!==y||c[1]!==u?(s=async function(){let{data:e}=await y({network:u});e?.createAccountSocialConnectionUrl&&window.location.replace(e.createAccountSocialConnectionUrl)},c[0]=y,c[1]=u,c[2]=s):s=c[2];let b=s;c[3]!==u||c[4]!==h||c[5]!==f||c[6]!==m?(r=async function(){let{data:e}=await h({network:u});e?.removeSocialConnection&&(x(!1),f(m("disconnectSuccess")))},c[3]=u,c[4]=h,c[5]=f,c[6]=m,c[7]=r):r=c[7];let A=r,j=eo.socialNetworkIconMap[u];if(p){let e;return c[8]!==m?(e=m("disconnectButton"),c[8]=m,c[9]=e):e=c[9],(0,t.jsx)(ec.SocialConnectionButton,{button:e,buttonIcon:el.Remove,icon:j,onClick:A,title:m("connected",{username:g||""})})}c[10]!==m?(n=m("connectButton"),c[10]=m,c[11]=n):n=c[11];let w=eo.socialNetworkCopyMap[u];return c[12]!==m||c[13]!==w?(l=m("connect",{network:w}),c[12]=m,c[13]=w,c[14]=l):l=c[14],c[15]!==j||c[16]!==b||c[17]!==n||c[18]!==l?(o=(0,t.jsx)(ec.SocialConnectionButton,{button:n,buttonIcon:en.Add,icon:j,onClick:b,title:l}),c[15]=j,c[16]=b,c[17]=n,c[18]=l,c[19]=o):o=c[19],o}let eg=(0,r.graphql)(`
    fragment SettingsProfileSocialConnections on Profile {
      socials {
        ...SettingsProfileSocialConnectionButton
      }
    }
  `,[ed]);function ep(e){let s,r,a,n,l,o=(0,i.c)(11),{profile:c}=e,d=(0,v.useTranslations)("SettingsProfileSocialConnections");o[0]!==c?(s=(0,ea.readFragment)(eg,c),o[0]=c,o[1]=s):s=o[1];let u=s;if(u.socials)return o[2]!==d?(r=d("title"),o[2]=d,o[3]=r):r=o[3],o[4]!==r?(a=(0,t.jsx)(y.TextBody,{size:"sm",weight:"semibold",children:r}),o[4]=r,o[5]=a):a=o[5],o[6]!==u.socials?(n=(0,t.jsx)(ef,{network:"X",socials:u.socials}),o[6]=u.socials,o[7]=n):n=o[7],o[8]!==a||o[9]!==n?(l=(0,t.jsxs)(m.FlexColumn,{className:"gap-2",children:[a,n]}),o[8]=a,o[9]=n,o[10]=l):l=o[10],l}let ex=/^\[GraphQL\] \s*/,ey=k.z.object({username:k.z.string().optional(),bio:k.z.string().max(140).optional(),externalUrl:V,email:k.z.union([k.z.email(),k.z.literal("")]).optional().nullable()}),eh=(0,r.graphql)(`
    query SettingsProfileEditQuery($identifier: String!) {
      profileByIdentifierV2(identifier: $identifier) {
        __typename
        ... on Profile {
          address
          displayName
          username
          bio
          externalUrl
          imageUrl
          bannerImageUrl
          email
          emailVerified
          ...SettingsProfileSocialConnections
        }
      }
    }
  `,[eg]),eS=(0,r.graphql)(`
    query SettingsAccountProfileEditQuery($identifier: String!) {
      profileByIdentifierV2(identifier: $identifier) {
        __typename
        ... on Profile {
          address
          displayName
          username
          bio
          externalUrl
          imageUrl
          bannerImageUrl
          ...SettingsProfileSocialConnections
        }
      }
    }
  `,[eg]),eb=(0,r.graphql)(`
  query SettingsAccountEmailQuery {
    accountProfile {
      __typename
      ... on AccountProfile {
        email
        emailVerified
      }
    }
  }
`),eA=(0,r.graphql)(`
  mutation SettingsProfileUpdateMutation($address: Address!, $newSettings: ProfileSettingsInput!, $target: ProfileTargetType) {
    updateProfileSettings(address: $address, newSettings: $newSettings, target: $target) {
      displayName
      bio
      externalUrl
    }
  }
`),ej=(0,r.graphql)(`
  mutation ResendEmailVerification {
    resendEmailVerification
  }
`);function ew(e){let s=(0,i.c)(24),{validationStatus:r,formError:a,invalidReasonKey:n,t:l,tMigration:o}=e;if(a){let e;return s[0]!==a.message?(e=(0,t.jsx)(y.TextBody,{color:"error-1",size:"xs",children:a.message}),s[0]=a.message,s[1]=e):e=s[1],e}switch(r.type){case"taken":{let e,i;return s[2]!==o?(e=o("errorUsernameTaken"),s[2]=o,s[3]=e):e=s[3],s[4]!==e?(i=(0,t.jsx)(y.TextBody,{color:"error-1",size:"xs",children:e}),s[4]=e,s[5]=i):i=s[5],i}case"invalid":{let e,i;return s[6]!==n||s[7]!==o?(e=o(n,{maxLength:A.USERNAME_MAX_LENGTH}),s[6]=n,s[7]=o,s[8]=e):e=s[8],s[9]!==e?(i=(0,t.jsx)(y.TextBody,{color:"error-1",size:"xs",children:e}),s[9]=e,s[10]=i):i=s[10],i}case"checking":{let e,i;return s[11]!==o?(e=o("checkingAvailability"),s[11]=o,s[12]=e):e=s[12],s[13]!==e?(i=(0,t.jsx)(y.TextBody,{color:"text-secondary",size:"xs",children:e}),s[13]=e,s[14]=i):i=s[14],i}case"available":{let e,i,r;return s[15]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)(b.Check,{className:"text-success-1",size:16}),s[15]=e):e=s[15],s[16]!==o?(i=o("usernameAvailable"),s[16]=o,s[17]=i):i=s[17],s[18]!==i?(r=(0,t.jsxs)(t.Fragment,{children:[e,(0,t.jsx)(y.TextBody,{className:"text-success-1",size:"xs",children:i})]}),s[18]=i,s[19]=r):r=s[19],r}default:{let e,i;return s[20]!==l?(e=l("usernameDescription"),s[20]=l,s[21]=e):e=s[21],s[22]!==e?(i=(0,t.jsx)(y.TextBody,{color:"text-secondary",size:"xs",children:e}),s[22]=e,s[23]=i):i=s[23],i}}}let ev={ttl:0},eT=(0,U.withSuspense)(({onClose:e,className:i,profileAddress:r,showUsernameField:p=!0,redirectPath:b,showCancelButton:k=!1,cancelPath:N})=>{let P=(0,v.useTranslations)("SettingsProfile"),U=(0,v.useTranslations)("ProfileMigrationModal"),$=(0,l.useRouter)(),R=(0,_.useAuthenticated)(),V=(0,j.useIsEmbeddedWallet)(),[L,D]=(0,T.useState)(!1),[O,Q]=(0,T.useState)(!1),{showSuccessMessage:W,showErrorMessage:X}=(0,S.useToasts)(),[G]=(0,M.usePlaySound)(E.Sound.AccountSettingsSave),K=(0,w.useRefreshLinkedAccounts)(),Z=(0,F.useSettingsIdentifier)(),H=r||Z,J=!r,[{data:Y,fetching:et,stale:ei},es]=(0,n.useQuery)({query:eS,variables:{identifier:H??""},context:ev,pause:!(J&&H)}),[{data:ea,fetching:en,stale:el},eo]=(0,n.useQuery)({query:eh,variables:{identifier:H??""},context:ev,pause:J||!H}),ec=Y?.profileByIdentifierV2?.__typename==="Profile",[{data:ed},eu]=(0,n.useQuery)({query:eb,context:ev,pause:!(J&&R&&ec)}),em=J?et:en,ef=J?ei:el,eg=(0,T.useMemo)(()=>J&&Y?.profileByIdentifierV2?.__typename==="Profile"?Y.profileByIdentifierV2:ea?.profileByIdentifierV2?.__typename==="Profile"?ea.profileByIdentifierV2:void 0,[J,Y,ea]),eT=eg?.address,eC=(0,T.useRef)(null),{defaultEmail:ek,emailVerified:eN}=(0,T.useMemo)(()=>{if(J){let e=ed?.accountProfile?.__typename==="AccountProfile"?ed.accountProfile:null;return{defaultEmail:e?.email??"",emailVerified:e?.emailVerified??!1}}let e=ea?.profileByIdentifierV2?.__typename==="Profile"?ea.profileByIdentifierV2:null;return{defaultEmail:e?.email??"",emailVerified:e?.emailVerified??!1}},[J,ed,ea]),eP=(0,T.useMemo)(()=>eg?{username:eg.username??"",bio:eg.bio??"",externalUrl:eg.externalUrl??"",imageUrl:eg.imageUrl??"",bannerImageUrl:eg.bannerImageUrl??"",email:"",emailVerified:eN}:{},[eg,eN]),eB=eg?.displayName??void 0,{register:eI,handleSubmit:eU,formState:ez,reset:eM,setValue:eE,control:eF}=(0,C.useForm)({defaultValues:eP,resolver:(0,s.zodResolver)(ey)}),e_=(0,C.useWatch)({control:eF,name:"username",defaultValue:""}),e$=eg?.username??"",eR=e_?.trim()??"",eV=p&&""!==eR&&eR.toLowerCase()!==e$.trim().toLowerCase()?eR:"",{linkedWalletAddresses:eq,fetching:eL}=(0,I.useLinkedWallets)(p?eT??"":""),eD=(0,A.useUsernameAvailability)(eV,eq),eO=""===eV?{type:"none"}:eD.isChecking?{type:"checking"}:eD.isTaken?eL?{type:"checking"}:{type:"taken"}:eD.isInvalid&&eD.invalidReasonKey?{type:"invalid"}:eD.isAvailable?{type:"available"}:{type:"none"},eQ="taken"===eO.type||"invalid"===eO.type||"checking"===eO.type;function eW(){setTimeout(()=>{J?(es({requestPolicy:"network-only"}),eu({requestPolicy:"network-only"})):eo({requestPolicy:"network-only"}),K()},z.REFETCH_TIMEOUT_MS)}let[{fetching:eX},eG]=(0,a.useMutation)(eA),eK=async t=>{let i=t.email===ek||""===t.email?"":t.email,s={username:p?t.username:void 0,bio:t.bio,externalUrl:t.externalUrl,email:i},{username:r,...a}=ey.parse(s),n=await eG({address:eT??"",newSettings:{...a,displayName:r},target:J?"ACCOUNT":void 0});return n.error?void X(n.error.message.replace(ex,"")):(W(s.email?P("successMessageWithEmail"):P("successMessage"),{duration:s.email?1e4:1e3}),G(),D(!1),Q(!1),eW(),b&&$.push(b),e?.(),n)},[{fetching:eZ},eH]=(0,a.useMutation)(ej),eJ=async()=>{let t=await eH({});if(t.error){let e=t.error.message.replace(ex,"");e.includes("Too Many Requests")?X(P("errorMessageRateLimit"),{duration:1e4}):X(e,{duration:1e4})}else W(P("emailVerificationResent"),{duration:1e4}),e?.()},eY=Object.keys(eP).length>0;if((0,T.useEffect)(()=>{em||ef||!eY||eM(eP)},[em,ef,eY,eM,eP]),(0,T.useEffect)(()=>{L&&eC.current.focus()},[L]),!(eg&&R))return;let e0=!!ek;return(0,t.jsxs)("form",{className:(0,d.classNames)("flex flex-col overflow-y-visible",i),onSubmit:eU(eK),children:[(0,t.jsx)(er,{address:eT,defaultImageUrl:eP.bannerImageUrl,onImageChanged:()=>Q(!0),onSuccess:eW,target:J?"ACCOUNT":void 0},`banner-${eT}`),(0,t.jsxs)(m.FlexColumn,{className:"mx-4 mb-19 overflow-visible",children:[(0,t.jsx)(ee,{address:eT,defaultImageUrl:eP.imageUrl,onImageChanged:()=>Q(!0),onSuccess:eW,target:J?"ACCOUNT":void 0},`avatar-${eT}`),(0,t.jsx)(h.TextHeading,{className:"mt-2.5 mb-5",size:"md",children:P("title")}),(0,t.jsxs)(m.FlexColumn,{className:"gap-4",children:[p&&(0,t.jsx)("fieldset",{children:(0,t.jsxs)(m.FlexColumn,{className:"gap-2",children:[(0,t.jsx)(y.TextBody,{size:"sm",weight:"semibold",children:P("username")}),(0,t.jsx)(g.Input,{placeholder:eB??P("addUsername"),...eI("username"),error:!!ez.errors.username||"taken"===eO.type||"invalid"===eO.type}),(0,t.jsx)(u.Flex,{className:"min-h-[20px] items-center gap-1",children:(0,t.jsx)(ew,{formError:ez.errors.username,invalidReasonKey:eD.invalidReasonKey,t:P,tMigration:U,validationStatus:eO})})]})}),(0,t.jsx)("fieldset",{children:(0,t.jsxs)(m.FlexColumn,{className:"gap-2",children:[(0,t.jsx)(y.TextBody,{size:"sm",weight:"semibold",children:P("bio")}),(0,t.jsx)(x.TextArea,{className:"resize-none whitespace-normal",placeholder:P("addBio"),...eI("bio"),error:!!ez.errors.bio}),ez.errors.bio?(0,t.jsx)(y.TextBody,{color:"error-1",size:"xs",children:ez.errors.bio.message}):null]})}),(0,t.jsx)("fieldset",{children:(0,t.jsxs)(m.FlexColumn,{className:"gap-2",children:[(0,t.jsx)(y.TextBody,{size:"sm",weight:"semibold",children:P("url")}),(0,t.jsx)(g.Input,{placeholder:P("addUrl"),...eI("externalUrl"),error:!!ez.errors.externalUrl}),ez.errors.externalUrl?(0,t.jsx)(y.TextBody,{color:"error-1",size:"xs",children:ez.errors.externalUrl.message}):(0,t.jsx)(y.TextBody,{color:"text-secondary",size:"xs",children:P("urlDescription")})]})}),!r&&(0,t.jsx)("fieldset",{children:(0,t.jsxs)(m.FlexColumn,{className:"gap-2",children:[(0,t.jsx)(y.TextBody,{size:"sm",weight:"semibold",children:P("emailAddress")}),(0,t.jsxs)(u.Flex,{className:"gap-2",children:[(0,t.jsxs)(u.Flex,{className:"relative flex-1",children:[(0,t.jsx)(g.Input,{inputRef:eC,placeholder:L?P("addEmailAddress"):ek||P("addEmailAddress"),...eI("email"),disabled:!L&&e0||!!V,error:!!ez.errors.email}),e0?(0,t.jsx)(B,{isVerified:eP.emailVerified??!1}):null]}),e0&&!V?(0,t.jsx)(q,{isEditing:L,onCancel:()=>{D(!1),eE("email","")},onEdit:()=>{D(!0),eC.current.focus()}}):null]}),ez.errors.email?(0,t.jsx)(y.TextBody,{color:"error-1",size:"xs",children:ez.errors.email.message}):e0&&(0,t.jsx)(y.TextBody,{color:"text-secondary",size:"xs",children:P("emailSecurityMessage")}),(0,t.jsx)(u.Flex,{className:"flex-1",children:eP.emailVerified||!e0||L?null:(0,t.jsx)(o.Button,{disabled:eZ,onClick:eJ,size:"sm",variant:"secondary",children:P("resendVerificationEmail")})})]})}),eg&&(0,t.jsx)("fieldset",{children:(0,t.jsx)(ep,{profile:eg})})]})]}),(0,t.jsx)("div",{className:"absolute right-0 bottom-0 left-0",children:(0,t.jsx)(c.CenterAligned,{className:"-mx-4 h-19 gap-4 bg-bg-primary px-8 lg:inset-shadow-border lg:mx-0 lg:rounded-b lg:px-0",children:(0,t.jsxs)(f.FlexEnd,{className:"w-full items-center gap-2 lg:max-w-[740px]",children:[k&&N&&(0,t.jsx)(o.Button,{onClick:()=>$.push(N),type:"button",variant:"secondary",children:P("cancel")}),(0,t.jsx)(o.Button,{disabled:!(ez.isDirty||O)||Object.keys(ez.errors).length>0||eQ||eX,isLoading:eX,type:"submit",children:P("save")})]})})})]},eT)},{fallback:(0,t.jsx)(c.CenterAligned,{className:"h-[350px] w-full",children:(0,t.jsx)(p.Spinner,{size:"lg"})}),ssr:!1});e.s(["SettingsProfile",0,eT],609866)}]);

//# debugId=5276f7de-bafd-5eab-3eee-17894c4d0ecc
//# sourceMappingURL=51975bfcf6ef5655.js.map