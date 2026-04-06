;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="1a2ca970-43b9-f44f-be81-b49321b6fb40")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,619272,e=>{"use strict";e.s(["PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES",0,{collection:"first:pl-4 shrink-0 w-[180px] lg:w-50 overflow-visible",quantity:"w-10 2xl:w-12 justify-end grow-1",value:"w-24 3xl:w-32 justify-end grow-1",floorPrice:"w-24 justify-end grow-1",topOffer:"w-24 justify-end grow-1",sparkline:"w-24 justify-end last:pr-4"},"PORTFOLIO_TOKENS_TABLE_CLASSNAMES",0,{token:"first:pl-4 w-[180px] grow overflow-visible",value:"w-20 justify-end grow-1",quantity:"w-20 justify-end grow-1",price:"w-24 justify-end grow-1",gain:"w-20 justify-end grow-1",gainPercentage:"w-18 justify-end grow-1",sparkline:"w-24 justify-end last:pr-4"},"TIMEFRAME_OPTIONS",0,["ONE_HOUR","ONE_DAY","SEVEN_DAYS","THIRTY_DAYS"],"TIMEFRAME_TO_LABEL",0,{ONE_HOUR:"1H",ONE_DAY:"1D",SEVEN_DAYS:"7D",THIRTY_DAYS:"30D"}])},675795,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(502732),r=e.i(39771),s=e.i(965523),n=e.i(718813),i=e.i(165102),o=e.i(258343),c=e.i(950293),u=e.i(341819),d=e.i(522285),m=e.i(647291),h=e.i(526042),x=e.i(885530),y=e.i(459527),p=e.i(104062),g=e.i(89337),C=e.i(438249),S=e.i(459831),f=e.i(960243),T=e.i(230690),j=e.i(847720),N=e.i(660712),b=e.i(692632),v=e.i(670383),L=e.i(62793),_=e.i(913868),k=e.i(756344),A=e.i(681144),P=e.i(84949),w=e.i(389852),O=e.i(245222),E=e.i(813949),I=e.i(771968),F=e.i(532500),B=e.i(919434),V=e.i(735635);e.i(500598);var M=e.i(207225),D=e.i(444501),R=e.i(437153),$=e.i(378536),q=e.i(653848),U=e.i(871085),z=e.i(619272);function H(e){let l,r,s,n,i,o,c,u,m,h,x,y,p,g,C,S,T,j,N,b,v,L=(0,t.c)(59),{className:_,sortBy:k,sortDirection:A,onSortChange:P}=e,w=(0,d.useTranslations)("StatsTableHeader"),O=(0,d.useTranslations)("useStatsColumns");L[0]!==P||L[1]!==k||L[2]!==A?(l=e=>{e.column!==k?P(e.column,"DESC"):P(e.column,"DESC"===A?"ASC":"DESC")},L[0]=P,L[1]=k,L[2]=A,L[3]=l):l=L[3];let E=l;return L[4]!==_?(r=(0,R.classNames)("border-border-1 border-b bg-bg-primary",_),L[4]=_,L[5]=r):r=L[5],L[6]!==w?(s=w("collection"),L[6]=w,L[7]=s):s=L[7],L[8]!==s?(n=(0,a.jsx)(q.TableHeaderCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.collection,children:s}),L[8]=s,L[9]=n):n=L[9],L[10]!==w?(i=w("held"),L[10]=w,L[11]=i):i=L[11],L[12]!==i?(o=(0,a.jsx)(q.TableHeaderCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.quantity,children:i}),L[12]=i,L[13]=o):o=L[13],L[14]!==k||L[15]!==A?(c=k===f.StatsSortBy.HELD_VALUE?(0,U.toLowerCase)(A):void 0,L[14]=k,L[15]=A,L[16]=c):c=L[16],L[17]!==E||L[18]!==c?(u={column:f.StatsSortBy.HELD_VALUE,onSort:E,order:c},L[17]=E,L[18]=c,L[19]=u):u=L[19],L[20]!==O?(m=O("value"),L[20]=O,L[21]=m):m=L[21],L[22]!==u||L[23]!==m?(h=(0,a.jsx)(q.TableHeaderCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.value,sort:u,children:m}),L[22]=u,L[23]=m,L[24]=h):h=L[24],L[25]!==k||L[26]!==A?(x=k===f.StatsSortBy.FLOOR_PRICE?(0,U.toLowerCase)(A):void 0,L[25]=k,L[26]=A,L[27]=x):x=L[27],L[28]!==E||L[29]!==x?(y={column:f.StatsSortBy.FLOOR_PRICE,onSort:E,order:x},L[28]=E,L[29]=x,L[30]=y):y=L[30],L[31]!==O?(p=O("floorPrice.header"),L[31]=O,L[32]=p):p=L[32],L[33]!==y||L[34]!==p?(g=(0,a.jsx)(q.TableHeaderCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.floorPrice,sort:y,children:p}),L[33]=y,L[34]=p,L[35]=g):g=L[35],L[36]!==k||L[37]!==A?(C=k===f.StatsSortBy.BEST_OFFER?(0,U.toLowerCase)(A):void 0,L[36]=k,L[37]=A,L[38]=C):C=L[38],L[39]!==E||L[40]!==C?(S={column:f.StatsSortBy.BEST_OFFER,onSort:E,order:C},L[39]=E,L[40]=C,L[41]=S):S=L[41],L[42]!==O?(T=O("topOffer.header"),L[42]=O,L[43]=T):T=L[43],L[44]!==S||L[45]!==T?(j=(0,a.jsx)(q.TableHeaderCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.topOffer,sort:S,children:T}),L[44]=S,L[45]=T,L[46]=j):j=L[46],L[47]!==O?(N=O("last7Days.header"),L[47]=O,L[48]=N):N=L[48],L[49]!==N?(b=(0,a.jsx)(q.TableHeaderCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.sparkline,children:N}),L[49]=N,L[50]=b):b=L[50],L[51]!==h||L[52]!==g||L[53]!==j||L[54]!==r||L[55]!==b||L[56]!==n||L[57]!==o?(v=(0,a.jsxs)($.TableHeader,{className:r,children:[n,o,h,g,j,b]}),L[51]=h,L[52]=g,L[53]=j,L[54]=r,L[55]=b,L[56]=n,L[57]=o,L[58]=v):v=L[58],v}var G=e.i(455480),Q=e.i(491150),K=e.i(254842),W=e.i(738480),Y=e.i(81303),X=e.i(28067),Z=e.i(143692),J=e.i(570293),ee=e.i(221637),ea=e.i(793254),et=e.i(647945),el=e.i(270937),er=e.i(959105),es=e.i(825504),en=e.i(886423),ei=e.i(99520),eo=e.i(543964);let ec=(0,x.graphql)(`
    fragment PortfolioCollectionsTableRow on Collection {
      id
      slug
      ownership(address: $address) {
        id
        totalQuantity
        value {
          ...Volume
        }
      }
      accountOwnership(accountId: $accountId) {
        id
        totalQuantity
        value {
          ...Volume
        }
      }
      ...StatsTableRowCollection
      ...StatsTableRowFloorPrice
      ...StatsTableRowTopOffer
      ...StatsTableRowVolume
      ...StatsTableRowSales
      ...StatsTableRowSparkLineChart
      ...CollectionLink
    }
  `,[en.StatsTableRowCollectionFragment,ea.StatsTableRowFloorPriceFragment,el.StatsTableRowTopOfferFragment,eo.StatsTableRowVolumeFragment,ei.StatsTableRowSalesFragment,et.StatsTableRowSparkLineChartFragment,es.VolumeFragment,er.CollectionLinkFragment]);var eu=e.i(601056),ed=e.i(519078),em=e.i(167368),eh=e.i(310578),ex=e.i(747460),ey=e.i(984335),ep=e.i(445329);function eg(){let e,l,r,s,n,i,o,c,u,d,m,h=(0,t.c)(22),{size:x}=(0,ey.useTable)(),{image:y}=(0,ex.tableRowSizeVariants)({size:x}),p=(0,ep.useStatsSparklineChartClassName)(),g=X.TableRow,C=Y.TableCell,S=z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES,f=eu.Item,T=eu.ItemAvatar,j=y();return h[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(eh.SkeletonBlock,{}),h[0]=e):e=h[0],h[1]!==T||h[2]!==j?(l=(0,a.jsx)(T,{className:j,children:e}),h[1]=T,h[2]=j,h[3]=l):l=h[3],h[4]===Symbol.for("react.memo_cache_sentinel")?(r=(0,a.jsx)(ed.ItemContent,{children:(0,a.jsx)(eh.SkeletonLine,{className:"h-4 w-[100px]"})}),h[4]=r):r=h[4],h[5]!==f||h[6]!==l?(s=(0,a.jsxs)(f,{variant:"unstyled",children:[l,r]}),h[5]=f,h[6]=l,h[7]=s):s=h[7],h[8]!==C||h[9]!==S.collection||h[10]!==s?(n=(0,a.jsx)(C,{className:S.collection,children:s}),h[8]=C,h[9]=S.collection,h[10]=s,h[11]=n):n=h[11],h[12]===Symbol.for("react.memo_cache_sentinel")?(i=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.quantity,children:(0,a.jsx)(eh.SkeletonLine,{className:"h-4 w-[40px]"})}),h[12]=i):i=h[12],h[13]===Symbol.for("react.memo_cache_sentinel")?(o=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.value,children:(0,a.jsx)(eh.SkeletonLine,{className:"h-4 w-[80px]"})}),h[13]=o):o=h[13],h[14]===Symbol.for("react.memo_cache_sentinel")?(c=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.floorPrice,children:(0,a.jsx)(eh.SkeletonLine,{className:"h-4 w-[80px]"})}),h[14]=c):c=h[14],h[15]===Symbol.for("react.memo_cache_sentinel")?(u=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.topOffer,children:(0,a.jsx)(eh.SkeletonLine,{className:"h-4 w-[80px]"})}),h[15]=u):u=h[15],h[16]!==p?(d=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.sparkline,children:(0,a.jsx)(em.ChartSkeleton,{className:p})}),h[16]=p,h[17]=d):d=h[17],h[18]!==g||h[19]!==d||h[20]!==n?(m=(0,a.jsxs)(g,{children:[n,i,o,c,u,d]}),h[18]=g,h[19]=d,h[20]=n,h[21]=m):m=h[21],m}function eC(e){let l,r,s,n,i,o,c,u,d,x,y,p,g=(0,t.c)(34),{item:C,wallets:S}=e,f=(0,m.useProfilePrimaryAccount)(),T=(0,m.useProfileAddress)(),{getProfileUrlWithIdentifier:j}=(0,h.useProfilePageUrl)();if(!C){let e;return g[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(eg,{}),g[0]=e):e=g[0],e}if(g[1]!==C||g[2]!==j||g[3]!==f?.kind||g[4]!==f?.username||g[5]!==T){s=Symbol.for("react.early_return_sentinel");e:{if(!(l=(0,G.readFragment)(ec,C))){s=null;break e}r=j((f?.kind==="WALLET"?null:f?.username)??T,{collectionSlugs:l.slug})}g[1]=C,g[2]=j,g[3]=f?.kind,g[4]=f?.username,g[5]=T,g[6]=l,g[7]=r,g[8]=s}else l=g[6],r=g[7],s=g[8];if(s!==Symbol.for("react.early_return_sentinel"))return s;let N=r;g[9]!==l?(n=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.collection,children:(0,a.jsx)(ee.StatsTableRowCollection,{collection:l})}),g[9]=l,g[10]=n):n=g[10];let b=l?.accountOwnership?.totalQuantity??l?.ownership?.totalQuantity;g[11]!==b?(i=(0,a.jsx)(W.NumberDisplay,{display:"full",value:b}),g[11]=b,g[12]=i):i=g[12],g[13]!==S?(o=S&&S.length>0&&(0,a.jsx)(Z.WalletBadge,{wallets:S}),g[13]=S,g[14]=o):o=g[14],g[15]!==i||g[16]!==o?(c=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.quantity,children:(0,a.jsxs)(K.Flex,{className:"items-center gap-1",children:[i,o]})}),g[15]=i,g[16]=o,g[17]=c):c=g[17];let v=l?.accountOwnership?.value??l?.ownership?.value;return g[18]!==v?(u=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.value,children:(0,a.jsx)(J.Volume,{display:"compact",volume:v})}),g[18]=v,g[19]=u):u=g[19],g[20]!==l?(d=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.floorPrice,children:(0,a.jsx)(ea.StatsTableRowFloorPrice,{collection:l})}),g[20]=l,g[21]=d):d=g[21],g[22]!==l?(x=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.topOffer,children:(0,a.jsx)(el.StatsTableRowTopOffer,{collection:l})}),g[22]=l,g[23]=x):x=g[23],g[24]!==l?(y=(0,a.jsx)(Y.TableCell,{className:z.PORTFOLIO_COLLECTIONS_TABLE_CLASSNAMES.sparkline,children:(0,a.jsx)(et.StatsTableRowSparkLineChart,{collection:l})}),g[24]=l,g[25]=y):y=g[25],g[26]!==N||g[27]!==d||g[28]!==x||g[29]!==y||g[30]!==n||g[31]!==c||g[32]!==u?(p=(0,a.jsx)(X.TableRow,{asChild:!0,interactive:!0,children:(0,a.jsxs)(Q.Link,{href:N,prefetch:"onHover",variant:"unstyled",children:[n,c,u,d,x,y]})}),g[26]=N,g[27]=d,g[28]=x,g[29]=y,g[30]=n,g[31]=c,g[32]=u,g[33]=p):p=g[33],p}let eS=(0,x.graphql)(`
    query PortfolioCollectionsTableQuery(
      $cursor: String
      $sort: TopCollectionsSort!
      $filter: TopCollectionsFilter
      $category: CategoryIdentifier
      $limit: Int!
      $addresses: [Address!]!
      $accountId: String
      $address: Address!
    ) {
      userTopCollections(
        accountId: $accountId
        cursor: $cursor
        sort: $sort
        filter: $filter
        category: $category
        limit: $limit
        addresses: $addresses
      ) {
        items {
          id
          slug
          __typename
          ...StatsVolume
          ...PortfolioCollectionsTableRow
          ...CollectionStatsSubscription
          ...CollectionNativeCurrencyIdentifier
          accountOwnership(accountId: $accountId) {
            value {
              native {
                unit
              }
            }
          }
          ownership(address: $address) {
            value {
              native {
                unit
              }
            }
          }
        }
        nextPageCursor
      }
    }
  `,[ec,O.CollectionStatsSubscriptionFragment,A.StatsVolumeFragment,L.CollectionNativeCurrencyIdentifierFragment]),ef=(0,x.graphql)(`
    query PortfolioCollectionsPerWalletQuery(
      $walletAddress: [Address!]!
      $limit: Int!
    ) {
      userTopCollections(addresses: $walletAddress, limit: $limit, sort: { by: FLOOR_PRICE, direction: DESC }) {
        items {
          slug
        }
      }
    }
  `,[]),eT=(0,w.withSuspense)(({persona:e,recentlyMinted:t})=>{let{timeframe:l}=(0,V.useStatsTimeframeQueryParam)(),{chains:r}=(0,F.useChainsQueryParam)(),s=(0,m.useProfileAddress)(),n=(0,m.useProfileAccountId)(),i=(0,_.useProfileSelectedAddresses)(),o=(0,m.useProfileLinkedAddresses)(),c=(0,k.useHasSearchFilters)(),u=(0,B.useClearFilters)(),{getUsdPrice:d}=(0,j.useCurrencies)(),h=(0,y.useClient)(),x=(0,M.useAddress)(),{wallets:b}=(0,N.useLinkedWalletBalances)({address:x}),A=o.length>1,[w,R]=(0,v.useState)(new Map),$=(0,v.useCallback)(async()=>{if(!A||0===b.length)return void R(new Map);let e=new Map;for(let{wallet:a,data:t}of(await Promise.all(b.map(async e=>{let a=await h.query(ef,{walletAddress:[e.address],limit:T.PER_WALLET_COLLECTIONS_LIMIT});return{wallet:e,data:a.data}}))))if(t?.userTopCollections?.items)for(let l of t.userTopCollections.items){let t=l.slug,r=e.get(t)??[];r.push(a),e.set(t,r)}R(e)},[A,b,h]);(0,v.useEffect)(()=>{$()},[$]);let[q,U]=(0,v.useState)(f.StatsSortBy.HELD_VALUE),[z,G]=(0,v.useState)("DESC"),Q={direction:z,by:(0,P.getSortBy)(q,l)},{items:K,paginatedItems:W,pagination:Y,setItems:X,noResults:Z,error:J,fetching:ee}=(0,I.usePaginatedQuery)({query:eS,variables:{sort:Q,filter:{chains:r.length>0?r:void 0,recentlyMinted:t},limit:25,accountId:n,addresses:i,address:s??""},pause:0===i.length||!s},e=>e?.userTopCollections,{pageSize:25}),ea=q===f.StatsSortBy.HELD_VALUE?[...K].sort((e,a)=>{if(!(e&&a))return 0;let t=d((0,L.getCollectionNativeCurrencyIdentifier)(e),e.accountOwnership?.value?.native?.unit??e.ownership?.value?.native?.unit??0)?.toNumber()??0,l=d((0,L.getCollectionNativeCurrencyIdentifier)(a),a.accountOwnership?.value?.native?.unit??a.ownership?.value?.native?.unit??0)?.toNumber()??0;return"DESC"===z?l-t:t-l}):K,et=(0,S.useItemsWithSkeletons)({items:ea,pageSize:25,isLoadingNext:Y.isLoadingNext}),el=K.flatMap(e=>e?[e.slug]:[]);return((0,E.useIsCollectionWatched)(el),(0,O.useCollectionsStatsSubscription)(W,X,Q),ee||0===i.length)?(0,a.jsx)(ej,{persona:e}):J&&!K.length?(0,a.jsx)(g.ErrorState,{size:"lg"}):Z?(0,a.jsx)(p.EmptyState,{onResetFilters:u,size:"lg",variant:c?"no-results-with-filters":"no-results"}):(0,a.jsx)(C.Table,{className:"h-[600px]",contentClassName:"scrollbar-hidden",dividers:!0,header:(0,a.jsx)(H,{className:(0,D.topStickyVariants)({tableHeader:!0}),onSortChange:(e,a)=>{U(e),G(a)},sortBy:q,sortDirection:z}),itemKey:e=>e?.slug,items:et,renderRow:({item:e,index:t})=>{let l=A&&e?.slug?w.get(e.slug):void 0;return(0,a.jsx)(eC,{index:t,item:e,wallets:l})},size:"md",...Y})},{fallback:({persona:e})=>(0,a.jsx)(ej,{persona:e}),errorFallback:(0,a.jsx)(g.ErrorState,{size:"lg"})});function ej(e){let l,r,s=(0,t.c)(2);return s[0]===Symbol.for("react.memo_cache_sentinel")?(l=(0,a.jsx)(H,{className:(0,D.topStickyVariants)({tableHeader:!0}),onSortChange:ev,sortBy:f.StatsSortBy.FLOOR_PRICE,sortDirection:"DESC"}),s[0]=l):l=s[0],s[1]===Symbol.for("react.memo_cache_sentinel")?(r=(0,a.jsx)(C.Table,{className:"h-[600px] overflow-hidden",contentClassName:"scrollbar-hidden",dividers:!0,header:l,itemKey:eb,items:(0,b.range)(25).map(eN),renderRow:eC,size:"md"}),s[1]=r):r=s[1],r}function eN(){}function eb(e,a){return a}function ev(){}let eL=e=>{let x,y,p,g,C,S,f,T,j,N=(0,t.c)(21),{children:b}=e,v=(0,d.useTranslations)("PortfolioCollectionsTable"),L=(0,m.useProfilePrimaryAccount)(),_=(0,m.useProfileAddress)(),{getProfileUrlWithIdentifier:k}=(0,h.useProfilePageUrl)(),A=(L?.kind==="WALLET"?null:L?.username)??_;N[0]!==k||N[1]!==A?(x=k(A),N[0]=k,N[1]=A,N[2]=x):x=N[2];let P=x;return N[3]===Symbol.for("react.memo_cache_sentinel")?(y=(0,a.jsx)(n.IconCallout,{icon:u.AutoAwesomeMosaic,size:16,variant:"outlined"}),N[3]=y):y=N[3],N[4]!==v?(p=v("collectionsHeld"),N[4]=v,N[5]=p):p=N[5],N[6]!==p?(g=(0,a.jsxs)(r.FlexCenter,{className:"gap-3",children:[y,(0,a.jsx)(c.TextBody,{size:"md",weight:"semibold",children:p})]}),N[6]=p,N[7]=g):g=N[7],N[8]!==v?(C=v("viewAll"),N[8]=v,N[9]=C):C=N[9],N[10]!==P||N[11]!==C?(S=(0,a.jsx)(l.Button,{href:P,size:"sm",variant:"secondary",children:C}),N[10]=P,N[11]=C,N[12]=S):S=N[12],N[13]!==g||N[14]!==S?(f=(0,a.jsx)(i.Media,{greaterThanOrEqual:"lg",children:(0,a.jsxs)(o.SpaceBetween,{className:"border-border-1 border-b p-4",children:[g,S]})}),N[13]=g,N[14]=S,N[15]=f):f=N[15],N[16]!==b?(T=(0,a.jsx)(s.FlexColumn,{className:"h-[600px]",children:b}),N[16]=b,N[17]=T):T=N[17],N[18]!==f||N[19]!==T?(j=(0,a.jsxs)(a.Fragment,{children:[f,T]}),N[18]=f,N[19]=T,N[20]=j):j=N[20],j};function e_(e){let l,r=(0,t.c)(2),{persona:s}=e;return r[0]!==s?(l=(0,a.jsx)(eL,{children:(0,a.jsx)(eT,{persona:s})}),r[0]=s,r[1]=l):l=r[1],l}function ek(e){let l,r=(0,t.c)(2),{persona:s}=e;return r[0]!==s?(l=(0,a.jsx)(eL,{children:(0,a.jsx)(ej,{persona:s})}),r[0]=s,r[1]=l):l=r[1],l}e.s(["PortfolioCollections",()=>e_,"PortfolioCollectionsSkeleton",()=>ek],675795)},871659,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(35720),r=e.i(670383);let s=(0,r.createContext)({timeframe:void 0,view:null,setTimeframe:()=>{},setView:()=>{},asset:"all",setAsset:()=>{}});function n(e){let n,i,o,c,u=(0,t.c)(11),{children:d,persona:m}=e,[h,x]=(0,r.useState)("ONE_DAY");u[0]!==m?(n=()=>"advanced"===m?"heatmap":"branded",u[0]=m,u[1]=n):n=u[1];let[y,p]=(0,r.useState)(n),[g,C]=(0,r.useState)("all");return u[2]!==m?(i=()=>{p("advanced"===m?"heatmap":"branded")},u[2]=m,u[3]=i):i=u[3],(0,l.useOnChange)(m,i),u[4]!==g||u[5]!==h||u[6]!==y?(o={timeframe:h,setTimeframe:x,view:y,setView:p,asset:g,setAsset:C},u[4]=g,u[5]=h,u[6]=y,u[7]=o):o=u[7],u[8]!==d||u[9]!==o?(c=(0,a.jsx)(s.Provider,{value:o,children:d}),u[8]=d,u[9]=o,u[10]=c):c=u[10],c}function i(){return(0,r.useContext)(s)}e.s(["PortfolioValueProvider",()=>n,"usePortfolioValueContext",()=>i])},367852,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(885530),r=e.i(333799),s=e.i(437153),n=e.i(254842),i=e.i(965523),o=e.i(738480),c=e.i(258343),u=e.i(209959),d=e.i(950293),m=e.i(517481),h=e.i(522285),x=e.i(136419),y=e.i(913868),p=e.i(570293),g=e.i(825504),C=e.i(238642),S=e.i(647291),f=e.i(545460),T=e.i(389852),j=e.i(165102),N=e.i(820130),b=e.i(871659);let v=["all","nfts","tokens"];function L(){let e,l,r,s,i,o=(0,t.c)(13),{asset:c,setAsset:u}=(0,b.usePortfolioValueContext)(),m=(0,h.useTranslations)("PortfolioAssetSelect");o[0]!==m?(e=e=>(0,a.jsxs)(n.Flex,{className:"gap-1.5",children:[(0,a.jsx)(j.Media,{greaterThanOrEqual:"lg",children:(0,a.jsxs)(d.TextBody,{color:"text-secondary",children:[m("asset"),":"]})}),(0,a.jsx)(d.TextBody,{children:m(e)})]}),o[0]=m,o[1]=e):e=o[1];let x=e;return o[2]!==u?(l=e=>u(e),o[2]=u,o[3]=l):l=o[3],o[4]!==x?(r=e=>x(e),o[4]=x,o[5]=r):r=o[5],o[6]!==m?(s=v.map(e=>(0,a.jsx)(N.SelectItem,{value:e,children:(0,a.jsx)(N.SelectItemContent,{children:(0,a.jsx)(N.SelectItemTitle,{children:m(e)})})},e)),o[6]=m,o[7]=s):s=o[7],o[8]!==c||o[9]!==l||o[10]!==r||o[11]!==s?(i=(0,a.jsx)(N.Select,{onValueChange:l,renderValue:r,value:c,children:s}),o[8]=c,o[9]=l,o[10]=r,o[11]=s,o[12]=i):i=o[12],i}var _=e.i(619272);function k(){let e,l,r,s,i,o=(0,t.c)(11),{timeframe:c,setTimeframe:u}=(0,b.usePortfolioValueContext)(),m=(0,h.useTranslations)("PortfolioTreeMapTimeframeSelect");o[0]!==m?(e=e=>(0,a.jsxs)(n.Flex,{className:"gap-1.5",children:[(0,a.jsx)(j.Media,{greaterThanOrEqual:"lg",children:(0,a.jsxs)(d.TextBody,{color:"text-secondary",children:[m("timeframe"),":"]})}),(0,a.jsx)(d.TextBody,{children:_.TIMEFRAME_TO_LABEL[e]})]}),o[0]=m,o[1]=e):e=o[1];let x=e;return o[2]!==u?(l=e=>u(e),o[2]=u,o[3]=l):l=o[3],o[4]!==x?(r=e=>x(e),o[4]=x,o[5]=r):r=o[5],o[6]===Symbol.for("react.memo_cache_sentinel")?(s=_.TIMEFRAME_OPTIONS.map(A),o[6]=s):s=o[6],o[7]!==l||o[8]!==r||o[9]!==c?(i=(0,a.jsx)(N.Select,{onValueChange:l,renderValue:r,value:c,children:s}),o[7]=l,o[8]=r,o[9]=c,o[10]=i):i=o[10],i}function A(e){return(0,a.jsx)(N.SelectItem,{value:e,children:(0,a.jsx)(N.SelectItemContent,{children:(0,a.jsx)(N.SelectItemTitle,{children:_.TIMEFRAME_TO_LABEL[e]})})},e)}let P=["branded","heatmap"];function w(){let e,l,r,s,i,o=(0,t.c)(13),{view:c,setView:u}=(0,b.usePortfolioValueContext)(),m=(0,h.useTranslations)("PortfolioTreeMapViewSelect");o[0]!==m?(e=e=>(0,a.jsxs)(n.Flex,{className:"gap-1.5",children:[(0,a.jsx)(j.Media,{greaterThanOrEqual:"lg",children:(0,a.jsxs)(d.TextBody,{color:"text-secondary",children:[m("type"),":"]})}),(0,a.jsx)(d.TextBody,{children:"branded"===e?m("asset"):m("heatmap")})]}),o[0]=m,o[1]=e):e=o[1];let x=e;o[2]!==u?(l=e=>u(e),o[2]=u,o[3]=l):l=o[3],o[4]!==x?(r=e=>x(e),o[4]=x,o[5]=r):r=o[5];let y=c??"branded";return o[6]!==m?(s=P.map(e=>(0,a.jsx)(N.SelectItem,{value:e,children:(0,a.jsx)(N.SelectItemContent,{children:(0,a.jsx)(N.SelectItemTitle,{children:"branded"===e?m("asset"):m("heatmap")})})},e)),o[6]=m,o[7]=s):s=o[7],o[8]!==l||o[9]!==r||o[10]!==y||o[11]!==s?(i=(0,a.jsx)(N.Select,{onValueChange:l,renderValue:r,value:y,children:s}),o[8]=l,o[9]=r,o[10]=y,o[11]=s,o[12]=i):i=o[12],i}var O=e.i(747998),E=e.i(646426),I=e.i(455480),F=e.i(392024),B=e.i(838820),V=e.i(35720),M=e.i(861316),D=e.i(276198),R=e.i(998844);e.i(500598);var $=e.i(71105);let q=(0,l.graphql)(`
  query PortfolioWalletsByAccountQuery {
    walletsByAccount {
      items {
        address
        label
      }
    }
  }
`),U=(0,l.graphql)(`
    query PortfolioWalletSelectQuery($addresses: [Address!]!) {
      walletProfilesByAddresses(addresses: $addresses) {
        __typename
        ... on Profile {
          address
          ...AccountLockup
        }
      }
    }
  `,[E.AccountLockupFragment]),z={suspense:!1};function H(e,a){let t=a[(0,M.normalizeAddress)(e.address)],l=t?.label;if(l)return l;let{displayName:r}=(0,I.readFragment)(E.AccountLockupFragment,e);return r&&!(0,M.isAddressEqual)(r,e.address)?r:(0,B.formatAddress)(e.address)}function G(e){let l,r,s,i,o,c,u,m=(0,t.c)(23),{profiles:x,walletsByAddress:y,selectedAddress:p,onSelectAddress:g}=e,C=(0,h.useTranslations)("PortfolioWalletSelect");m[0]!==x||m[1]!==C||m[2]!==y?(l=e=>{let t="all"===e?null:x.find(a=>(0,M.isAddressEqual)(a.address,e));return(0,a.jsxs)(n.Flex,{className:"gap-1.5",children:[(0,a.jsx)(j.Media,{greaterThanOrEqual:"lg",children:(0,a.jsxs)(d.TextBody,{color:"text-secondary",children:[C("wallet"),":"]})}),"all"!==e&&t?(0,a.jsxs)(O.AccountLockup,{account:t,isLink:!1,showDisplayName:!1,size:"sm",children:[(0,a.jsx)(O.AccountLockupAvatar,{size:20}),(0,a.jsx)(F.LockupContent,{children:(0,a.jsx)(F.LockupTitle,{weight:"regular",children:H(t,y)})})]}):(0,a.jsx)(d.TextBody,{children:C("allWallets")})]})},m[0]=x,m[1]=C,m[2]=y,m[3]=l):l=m[3];let S=l;if(m[4]!==g?(r=e=>g(e),m[4]=g,m[5]=r):r=m[5],m[6]!==S?(s=e=>S(e),m[6]=S,m[7]=s):s=m[7],m[8]!==C?(i=C("allWallets"),m[8]=C,m[9]=i):i=m[9],m[10]!==i?(o=(0,a.jsx)(N.SelectItem,{value:"all",children:(0,a.jsx)(N.SelectItemContent,{children:(0,a.jsx)(d.TextBody,{children:i})})}),m[10]=i,m[11]=o):o=m[11],m[12]!==x||m[13]!==y){let e;m[15]!==y?(e=e=>(0,a.jsx)(N.SelectItem,{value:e.address,children:(0,a.jsx)(N.SelectItemContent,{children:(0,a.jsxs)(O.AccountLockup,{account:e,isLink:!1,showDisplayName:!1,size:"sm",children:[(0,a.jsx)(O.AccountLockupAvatar,{size:24}),(0,a.jsx)(F.LockupContent,{children:(0,a.jsx)(F.LockupTitle,{weight:"regular",children:H(e,y)})})]})})},e.address),m[15]=y,m[16]=e):e=m[16],c=x.map(e),m[12]=x,m[13]=y,m[14]=c}else c=m[14];return m[17]!==p||m[18]!==r||m[19]!==s||m[20]!==o||m[21]!==c?(u=(0,a.jsxs)(N.Select,{onValueChange:r,renderValue:s,value:p,children:[o,c]}),m[17]=p,m[18]=r,m[19]=s,m[20]=o,m[21]=c,m[22]=u):u=m[22],u}let Q=(0,T.withSuspense)(()=>{let e=(0,S.useProfileAddress)(),t=(0,S.useProfileLinkedAddresses)(),{handleSelectAddress:l,selectedAddress:s,shouldShowDropdown:n}=(0,R.useSingleSelectStickyProfileAddresses)(),i=(0,$.useAuthenticated)(),[{data:o},c]=(0,r.useQuery)({query:q,pause:!i,context:z}),[{data:u}]=(0,r.useQuery)({query:U,variables:{addresses:t},pause:!e||0===t.length});(0,V.useOnChange)(i,()=>{i&&c({requestPolicy:"network-only"})});let d=u?.walletProfilesByAddresses?.filter(e=>"Profile"===e.__typename)??[],m=(0,D.keyBy)(o?.walletsByAccount?.items??[],e=>(0,M.normalizeAddress)(e.address));return n?(0,a.jsx)(G,{onSelectAddress:l,profiles:d,selectedAddress:s,walletsByAddress:m}):null},{fallback:()=>null}),K=(0,l.graphql)(`
  query PortfolioOverviewQuery($accountId: String, $addresses: [Address!]!) {
    userPortfolio(accountId: $accountId, addresses: $addresses) {
      summary {
        estimatedValue {
          ...Volume
        }
      }
    }
  }
`,[g.VolumeFragment]),W=(0,l.graphql)(`
  query PortfolioOverviewAccountPnlQuery {
    accountPnL {
      gain
      invested
      returnPercentage
    }
  }
`),Y=(0,l.graphql)(`
  query PortfolioOverviewWalletPnlQuery($address: Address!) {
    walletPnL(address: $address) {
      gain
      invested
      returnPercentage
    }
  }
`);function X(e){let l,r,s,o,u,d,m,h=(0,t.c)(12),{children:x}=e,y=(0,S.useProfileKind)();return h[0]!==x?(l=(0,a.jsx)(i.FlexColumn,{className:"w-full gap-3",children:x}),h[0]=x,h[1]=l):l=h[1],h[2]!==y?(r="ACCOUNT"===y?(0,a.jsx)(Q,{}):null,h[2]=y,h[3]=r):r=h[3],h[4]===Symbol.for("react.memo_cache_sentinel")?(s=(0,a.jsx)(k,{}),o=(0,a.jsx)(w,{}),u=(0,a.jsx)(L,{}),h[4]=s,h[5]=o,h[6]=u):(s=h[4],o=h[5],u=h[6]),h[7]!==r?(d=(0,a.jsxs)(n.Flex,{className:"gap-2",children:[r,s,o,u]}),h[7]=r,h[8]=d):d=h[8],h[9]!==l||h[10]!==d?(m=(0,a.jsxs)(c.SpaceBetween,{className:"flex-col items-start gap-3 lg:flex-row lg:items-end",children:[l,d]}),h[9]=l,h[10]=d,h[11]=m):m=h[11],m}let Z=(0,T.withSuspense)(()=>{let e=(0,h.useTranslations)("PortfolioOverview"),t=(0,S.useProfileAccountId)(),l=(0,y.useProfileSelectedAddresses)(),c=(0,S.useProfileLinkedAddresses)(),g=(0,S.useIsOwnProfileAddress)(),T=(0,x.useContextSelector)(f.ProfileSettingsContext,e=>e.hideWalletWorth),[{data:j}]=(0,r.useQuery)({query:K,variables:{accountId:t,addresses:l},pause:0===l.length}),N=0===l.length||l.length===c.length,b=N||1!==l.length?void 0:l[0],[{data:v}]=(0,r.useQuery)({query:W,pause:!(g&&N)}),[{data:L}]=(0,r.useQuery)({query:Y,variables:{address:b??""},pause:!g||N||!b}),_=N?v?.accountPnL:b?L?.walletPnL:void 0,k=j?.userPortfolio?.summary?.[0]?.estimatedValue,A=g&&T;return(0,a.jsx)(X,{children:(0,a.jsxs)(i.FlexColumn,{children:[(0,a.jsx)(m.TextDisplay,{size:"md",children:A?(0,a.jsx)(C.AsteriskText,{}):(0,a.jsx)(p.Volume,{currencyOverride:"usd",display:"standard",volume:k})}),g&&_&&!A&&(0,a.jsxs)(n.Flex,{className:"items-center gap-3",children:[(0,a.jsxs)(d.TextBody,{color:"text-secondary",size:"sm",children:[e("tokenPnl"),":"]}),(0,a.jsxs)(n.Flex,{className:"items-center gap-2",children:[(0,a.jsx)(o.NumberDisplay,{className:(0,s.classNames)("font-medium text-sm",{"text-success-1":Math.abs(_.gain)>=.005&&_.gain>0,"text-error-1":Math.abs(_.gain)>=.005&&_.gain<0}),display:"usd",value:.005>Math.abs(_.gain)?0:_.gain}),(0,a.jsx)(d.TextBody,{color:"text-secondary",size:"sm",children:"|"}),(0,a.jsx)(u.StatChangeCallout,{change:5e-4>Math.abs(_.returnPercentage)?0:_.returnPercentage,iconPlacement:"end",overrides:{StatChange:{className:"text-sm"}},withBackground:!1})]}),(0,a.jsxs)(n.Flex,{className:"items-center gap-1",children:[(0,a.jsxs)(d.TextBody,{color:"text-secondary",size:"sm",children:[e("costBasis"),":"]}),(0,a.jsx)(o.NumberDisplay,{className:"text-sm text-text-secondary",display:"usd",value:_.invested})]})]})]})})},{fallback:()=>(0,a.jsx)(J,{}),errorFallback:()=>(0,a.jsx)(J,{})});function J(){let e,l=(0,t.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(X,{children:(0,a.jsx)(m.TextDisplaySkeleton,{className:"h-10 w-[200px]",size:"md"})}),l[0]=e):e=l[0],e}e.s(["PortfolioOverview",0,Z,"PortfolioOverviewSkeleton",()=>J],367852)},589834,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(502732),r=e.i(39771),s=e.i(258343),n=e.i(268288),i=e.i(832830),o=e.i(341819),c=e.i(309980),u=e.i(522285),d=e.i(670383),m=e.i(647291),h=e.i(526042);function x(e){let x,y,p,g,C,S,f,T,j,N,b,v,L,_=(0,t.c)(31),{collectionsTable:k,tokensTable:A}=e,P=(0,u.useTranslations)("PortfolioTables"),[w,O]=(0,d.useState)("collections");_[0]!==P?(x=P("collections"),_[0]=P,_[1]=x):x=_[1],_[2]===Symbol.for("react.memo_cache_sentinel")?(y=(0,a.jsx)(o.AutoAwesomeMosaic,{size:16}),_[2]=y):y=_[2],_[3]!==x?(p={label:x,icon:y},_[3]=x,_[4]=p):p=_[4],_[5]!==P?(g=P("tokens"),_[5]=P,_[6]=g):g=_[6],_[7]===Symbol.for("react.memo_cache_sentinel")?(C=(0,a.jsx)(c.Toll,{size:16}),_[7]=C):C=_[7],_[8]!==g?(S={label:g,icon:C},_[8]=g,_[9]=S):S=_[9],_[10]!==p||_[11]!==S?(f={collections:p,tokens:S},_[10]=p,_[11]=S,_[12]=f):f=_[12];let E=f,I=(0,m.useProfilePrimaryAccount)(),F=(0,m.useProfileAddress)(),{getProfileUrlWithIdentifier:B}=(0,h.useProfilePageUrl)(),V=(I?.kind==="WALLET"?null:I?.username)??F,M="collections"===w?"items":"tokens";_[13]!==B||_[14]!==V||_[15]!==M?(T=B(V,{view:M}),_[13]=B,_[14]=V,_[15]=M,_[16]=T):T=_[16];let D=T;_[17]!==E?(j=Object.keys(E),_[17]=E,_[18]=j):j=_[18],_[19]!==w||_[20]!==j||_[21]!==E?(N=(0,a.jsx)(r.FlexCenter,{className:"gap-2",children:j.map(e=>(0,a.jsx)(n.SwitchPill,{checked:e===w,onClick:()=>O(e),size:"md",children:(0,a.jsxs)(r.FlexCenter,{className:"gap-1",children:[E[e].icon,E[e].label]})},e))}),_[19]=w,_[20]=j,_[21]=E,_[22]=N):N=_[22],_[23]!==D?(b=(0,a.jsx)(l.Button,{href:D,icon:i.ArrowOutward,size:"sm",variant:"secondary"}),_[23]=D,_[24]=b):b=_[24],_[25]!==N||_[26]!==b?(v=(0,a.jsxs)(s.SpaceBetween,{className:"border-border-1 border-b p-4",children:[N,b]}),_[25]=N,_[26]=b,_[27]=v):v=_[27];let R="collections"===w?k:A;return _[28]!==v||_[29]!==R?(L=(0,a.jsxs)(a.Fragment,{children:[v,R]}),_[28]=v,_[29]=R,_[30]=L):L=_[30],L}e.s(["MobilePortfolioTables",()=>x])},638339,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(254842),r=e.i(965523),s=e.i(718813),n=e.i(258343),i=e.i(950293),o=e.i(670383),c=e.i(790621),u=e.i(437153);let d=(0,o.forwardRef)(function(e,l){let r,s,n,i,o,d,m,h,x=(0,t.c)(16);x[0]!==e?({size:n,fill:i,fillAttribute:o,className:r,...s}=e,x[0]=e,x[1]=r,x[2]=s,x[3]=n,x[4]=i,x[5]=o):(r=x[1],s=x[2],n=x[3],i=x[4],o=x[5]);let y=void 0===n?24:n,p=void 0===i?"current":i,g=void 0===o?"currentColor":o;return x[6]!==r||x[7]!==p?(d=(0,u.classNames)((0,c.fillVariants)({fill:p}),r),x[6]=r,x[7]=p,x[8]=d):d=x[8],x[9]===Symbol.for("react.memo_cache_sentinel")?(m=(0,a.jsx)("path",{d:"M360-160q-19 0-34-11t-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11Z"}),x[9]=m):m=x[9],x[10]!==g||x[11]!==l||x[12]!==s||x[13]!==y||x[14]!==d?(h=(0,a.jsx)("svg",{"aria-label":"Vital Signs",className:d,fill:g,height:y,ref:l,role:"img",viewBox:"0 -960 960 960",width:y,xmlns:"http://www.w3.org/2000/svg",...s,children:m}),x[10]=g,x[11]=l,x[12]=s,x[13]=y,x[14]=d,x[15]=h):h=x[15],h});var m=e.i(522285),h=e.i(794835),x=e.i(439765),y=e.i(682576),p=e.i(508833),g=e.i(22764),C=e.i(81810),S=e.i(885530),f=e.i(333799),T=e.i(601056),j=e.i(519078),N=e.i(861993),b=e.i(39771),v=e.i(738480),L=e.i(999258),_=e.i(310578),k=e.i(266341),A=e.i(14204),P=e.i(44826),w=e.i(668493),O=e.i(609644),E=e.i(142804),I=e.i(601318),F=e.i(430903),B=e.i(959105),V=e.i(913868),M=e.i(825504),D=e.i(647291),R=e.i(389852),$=e.i(806056),q=e.i(871659);let U=(0,S.graphql)(`
    query PortfolioHighMoversQuery(
      $address: Address!
      $addresses: [Address!]!
      $accountId: String
      $useTokenGrouping: Boolean!
    ) {
      userTopCollections(
        accountId: $accountId
        addresses: $addresses
        sort: { by: FLOOR_PRICE, direction: DESC }
        limit: 20
      ) {
        items {
          id
          slug
          name
          isVerified
          ownership(address: $address) {
            totalQuantity
            value {
              ...Volume
            }
          }
          accountOwnership(accountId: $accountId) {
            totalQuantity
            value {
              ...Volume
            }
          }
          stats {
            oneDay {
              floorPriceChange
            }
          }
          floorPrice {
            pricePerItem {
              token {
                unit
                symbol
              }
              usd
            }
          }
          ...CollectionLockup
          ...FloorPriceSparkLineChart
          ...CollectionLink
        }
      }

      userCurrencyOwnershipsV2(
        accountId: $accountId
        addresses: $addresses
        limit: 20
        useTokenGrouping: $useTokenGrouping
      ) {
        items {
          __typename
          id
          ... on CurrencyBalanceV2 {
            quantity
            usdValue
            asset {
              id
              usdPrice
              stats {
                oneDay {
                  priceChange
                }
              }
              ...CurrencyV2Lockup
              ...CurrencyV2Link
              ...CurrencySparkLineChartSevenDay
            }
          }
          ... on TokenGroupBalanceV2 {
            quantity
            usdValue
            asset {
              primaryCurrency {
                id
                usdPrice
                stats {
                  oneDay {
                    priceChange
                  }
                }
                ...CurrencyV2Lockup
                ...CurrencyV2Link
                ...CurrencySparkLineChartSevenDay
              }
            }
            underlyingBalances {
              __typename
            }
          }
        }
      }
    }
  `,[y.CollectionLockupFragment,P.FloorPriceSparkLineChartFragment,B.CollectionLinkFragment,M.VolumeFragment,O.CurrencyV2LinkFragment,C.CurrencyV2LockupFragment,I.CurrencySparkLineChartSevenDayFragment]),z=(0,R.withSuspense)(()=>{let e=(0,m.useTranslations)("PortfolioHighMovers"),t=(0,D.useProfileAddress)(),s=(0,D.useProfileAccountId)(),o=(0,V.useProfileSelectedAddresses)(),{asset:c}=(0,q.usePortfolioValueContext)(),u=(0,$.useTokenGroupingEnabled)(),[{data:d}]=(0,f.useQuery)({query:U,variables:{accountId:s,addresses:o,address:t??"",useTokenGrouping:u},pause:0===o.length||!t}),y=d?.userTopCollections?.items??[],C=d?.userCurrencyOwnershipsV2?.items?.filter(e=>"CurrencyBalanceV2"===e.__typename||"TokenGroupBalanceV2"===e.__typename)??[],S=e=>"number"==typeof e?e:Number(e??0),_=y.map(e=>{let a=S(e.stats?.oneDay?.floorPriceChange??0),t=S(e.accountOwnership?.totalQuantity??e.ownership?.totalQuantity??0),l=S(e.floorPrice?.pricePerItem?.usd??0),r=t*(l-l/(1+a));return{kind:"collection",id:e.id,valueChangeUsd:r,isPositive:r>0,quantity:t,collection:e}}),P=C.filter(e=>"TokenGroupBalanceV2"!==e.__typename||e.asset?.primaryCurrency!=null).map(e=>{let a="TokenGroupBalanceV2"===e.__typename,t=a?e.asset?.primaryCurrency:e.asset,l=a?e.underlyingBalances?.filter(e=>e?.__typename==="CurrencyBalanceV2").length??0:0,r=S(t?.stats?.oneDay?.priceChange??0),s=S(e.usdValue??0),n=s-s/(1+r);return{kind:"currency",id:e.id,valueChangeUsd:n,isPositive:n>0,quantity:e.quantity??0,balance:e,currency:t,isTokenGroup:a,underlyingCount:l}}),O=("nfts"===c?_:"tokens"===c?P:[..._,...P]).sort((e,a)=>Math.abs(a.valueChangeUsd)-Math.abs(e.valueChangeUsd)).slice(0,2);return 0===O.length?(0,a.jsx)(H,{}):(0,a.jsxs)(r.FlexColumn,{className:"w-full justify-center gap-4",children:[(0,a.jsx)(i.TextBody,{size:"md",weight:"semibold",children:e("title")}),(0,a.jsx)(r.FlexColumn,{className:"gap-3",children:O.map(t=>{if("collection"===t.kind){let{collection:r,quantity:s,isPositive:o,valueChangeUsd:c}=t;return(0,a.jsx)(F.CollectionLink,{collection:r,children:(0,a.jsx)(N.Card,{className:"min-h-[82px] bg-bg-primary-transparent p-4",children:(0,a.jsxs)(n.SpaceBetween,{className:"items-center",children:[(0,a.jsxs)(h.CollectionLockup,{className:"flex-1",collection:r,size:"md",children:[(0,a.jsx)(h.CollectionLockupAvatar,{badge:null}),(0,a.jsxs)(x.CollectionLockupContent,{className:"flex-col items-start gap-1",children:[(0,a.jsx)(h.CollectionLockupTitle,{}),(0,a.jsxs)(l.Flex,{className:"w-full items-center gap-3",children:[(0,a.jsx)(k.TextLabel,{color:"text-secondary",children:e.rich("held",{quantity:()=>(0,a.jsx)(v.NumberDisplay,{display:"quantity",value:s})})}),(0,a.jsx)(L.Separator,{className:"h-full",orientation:"vertical"}),(0,a.jsx)(i.TextBody,{className:o?"text-success-1":"text-error-1",weight:"semibold",children:(0,a.jsx)(v.NumberDisplay,{display:"usd",prefix:o?"+":"",value:c})})]})]})]}),(0,a.jsx)(b.FlexCenter,{className:"h-12 w-20",children:(0,a.jsx)(A.FloorPriceSparkLineChart,{className:"h-full w-full",collection:r})})]})})},`col-${t.id}`)}let{currency:r,quantity:s,isPositive:o,valueChangeUsd:c,isTokenGroup:u,underlyingCount:d}=t;return(0,a.jsx)(w.CurrencyLink,{currency:r,children:(0,a.jsx)(N.Card,{className:"min-h-[82px] bg-bg-primary-transparent p-4",children:(0,a.jsxs)(n.SpaceBetween,{className:"items-center",children:[(0,a.jsxs)(T.Item,{className:"flex-1",variant:"unstyled",children:[(0,a.jsx)(p.CurrencyLockup,{className:"w-auto",currency:r,size:"md",children:(0,a.jsx)(p.CurrencyLockupAvatar,{badge:u&&d>1?null:void 0})}),(0,a.jsxs)(j.ItemContent,{className:"flex-col items-start gap-1",children:[(0,a.jsx)(p.CurrencyLockup,{currency:r,showAvatar:!1,size:"md",children:(0,a.jsx)(g.CurrencyLockupContent,{children:(0,a.jsxs)(l.Flex,{className:"items-center gap-1",children:[(0,a.jsx)(p.CurrencyLockupTitle,{weight:"regular"}),u&&d>1?(0,a.jsxs)(i.TextBody,{color:"text-secondary",size:"sm",children:["(",d,")"]}):null,(0,a.jsx)(p.CurrencyLockupBadge,{})]})})}),(0,a.jsxs)(l.Flex,{className:"w-full items-center gap-3",children:[(0,a.jsx)(k.TextLabel,{color:"text-secondary",children:e.rich("held",{quantity:()=>(0,a.jsx)(v.NumberDisplay,{display:"compact",value:s})})}),(0,a.jsx)(L.Separator,{className:"h-full",orientation:"vertical"}),(0,a.jsx)(i.TextBody,{className:o?"text-success-1":"text-error-1",weight:"semibold",children:(0,a.jsx)(v.NumberDisplay,{display:"usd",prefix:o?"+":"",value:c})})]})]})]}),(0,a.jsx)(b.FlexCenter,{className:"h-12 w-20",children:(0,a.jsx)(E.CurrencySparkLineChart,{className:"h-full w-full",currency:r,timeframe:"SEVEN_DAYS"})})]})})},`cur-${t.id}`)})})]})},{fallback:()=>(0,a.jsx)(H,{})});function H(){let e,l,s,n,o=(0,t.c)(7),c=(0,m.useTranslations)("PortfolioHighMovers");return o[0]!==c?(e=c("title"),o[0]=c,o[1]=e):e=o[1],o[2]!==e?(l=(0,a.jsx)(i.TextBody,{size:"md",weight:"semibold",children:e}),o[2]=e,o[3]=l):l=o[3],o[4]===Symbol.for("react.memo_cache_sentinel")?(s=(0,a.jsx)(r.FlexColumn,{className:"gap-3",children:[,,].fill(0).map(G)}),o[4]=s):s=o[4],o[5]!==l?(n=(0,a.jsxs)(r.FlexColumn,{className:"w-full gap-4",children:[l,s]}),o[5]=l,o[6]=n):n=o[6],n}function G(e,t){return(0,a.jsx)(N.Card,{className:"bg-bg-primary-transparent p-4",children:(0,a.jsxs)(n.SpaceBetween,{className:"w-full",children:[(0,a.jsx)(l.Flex,{className:"w-[180px]",children:(0,a.jsxs)(r.FlexColumn,{className:"w-full gap-2",children:[(0,a.jsx)(_.SkeletonLine,{className:"w-[100px]"}),(0,a.jsx)(_.SkeletonLine,{})]})}),(0,a.jsx)(_.SkeletonBlock,{className:"w-[100px]"})]})},t)}var Q=e.i(573762),K=e.i(457628),W=e.i(136419),Y=e.i(545460),X=e.i(625236),Z=e.i(570293),J=e.i(238642);function ee(e){let l,s,n,o,c=(0,t.c)(10),{title:u,value:d,label:m}=e;return c[0]!==u?(l=(0,a.jsx)(i.TextBody,{className:"uppercase tracking-wider",color:"text-secondary",size:"xs",children:u}),c[0]=u,c[1]=l):l=c[1],c[2]!==d?(s=(0,a.jsx)("div",{className:"text-center",children:(0,a.jsx)(X.TextHeading,{size:"sm",children:d})}),c[2]=d,c[3]=s):s=c[3],c[4]!==m?(n=m?(0,a.jsx)(i.TextBody,{className:"font-mono uppercase tracking-wider",color:"text-secondary",size:"xs",children:m}):null,c[4]=m,c[5]=n):n=c[5],c[6]!==l||c[7]!==s||c[8]!==n?(o=(0,a.jsxs)(r.FlexColumn,{className:"items-center gap-1",children:[l,s,n]}),c[6]=l,c[7]=s,c[8]=n,c[9]=o):o=c[9],o}function ea(e){let l,r,s,n,i,o,c,u,d,h,x,y,p=(0,t.c)(36),{tokenCount:g,itemCount:C,hasMoreItems:S,nftPercentage:f,tokenPercentage:T,estimatedValue:j,displayMode:N,hideNetWorth:b}=e,v=void 0!==b&&b,L=(0,m.useTranslations)("PulseCheckBreakdown"),_=!!j;p[0]!==L?(l=L("totalValue"),p[0]=L,p[1]=l):l=p[1],p[2]!==j||p[3]!==v?(r=v?(0,a.jsx)(J.AsteriskText,{}):(0,a.jsx)(Z.Volume,{currencyOverride:"usd",volume:j}),p[2]=j,p[3]=v,p[4]=r):r=p[4],p[5]!==l||p[6]!==r?(s=(0,a.jsx)(ee,{title:l,value:r}),p[5]=l,p[6]=r,p[7]=s):s=p[7];let k=s;p[8]!==L||p[9]!==g?(n=L("numberOfTokens",{quantity:g}),p[8]=L,p[9]=g,p[10]=n):n=p[10],p[11]!==L?(i=L("tokenValue"),p[11]=L,p[12]=i):i=p[12],p[13]!==j||p[14]!==v||p[15]!==T?(o=v?(0,a.jsx)(J.AsteriskText,{}):(0,a.jsx)(Z.Volume,{currencyOverride:"usd",multiplier:T,volume:j}),p[13]=j,p[14]=v,p[15]=T,p[16]=o):o=p[16],p[17]!==n||p[18]!==i||p[19]!==o?(c=(0,a.jsx)(ee,{label:n,title:i,value:o}),p[17]=n,p[18]=i,p[19]=o,p[20]=c):c=p[20];let A=c,P=`${String(C)}${S?"+":""}`;p[21]!==L||p[22]!==P?(u=L("numberOfNfts",{quantity:P}),p[21]=L,p[22]=P,p[23]=u):u=p[23],p[24]!==L?(d=L("nftValue"),p[24]=L,p[25]=d):d=p[25],p[26]!==j||p[27]!==v||p[28]!==f?(h=v?(0,a.jsx)(J.AsteriskText,{}):(0,a.jsx)(Z.Volume,{currencyOverride:"usd",multiplier:f,volume:j}),p[26]=j,p[27]=v,p[28]=f,p[29]=h):h=p[29],p[30]!==u||p[31]!==d||p[32]!==h?(x=(0,a.jsx)(ee,{label:u,title:d,value:h}),p[30]=u,p[31]=d,p[32]=h,p[33]=x):x=p[33];let w=x;e:{if(!_){let e;p[34]!==L?(e=L("noValue"),p[34]=L,p[35]=e):e=p[35],y=e;break e}switch(void 0===N?"all":N){case"all":y=k;break e;case"nfts":y=w;break e;case"tokens":y=A;break e;default:y=k}}return y}let et=(0,S.graphql)(`
    query PulseCheckBreakdownQuery($accountId: String, $addresses: [Address!]!) {
      userPortfolio(accountId: $accountId, addresses: $addresses) {
        summary {
          nftPercentageOfPortfolio
          tokenPercentageOfPortfolio
          estimatedValue {
            ...Volume
          }
        }
      }
      userCurrencyOwnershipsV2(accountId: $accountId, addresses: $addresses, limit: 20) {
        individualCurrencyCount
      }
      userItemsCount(accountId: $accountId, addresses: $addresses) {
        count
        hasMore
      }
    }
  `,[M.VolumeFragment]),el=(0,R.withSuspense)(()=>{let e=(0,D.useProfileAccountId)(),t=(0,V.useProfileSelectedAddresses)(),l=(0,D.useIsOwnProfileAddress)(),s=(0,W.useContextSelector)(Y.ProfileSettingsContext,e=>e.hideWalletWorth),n=(0,m.useTranslations)("PulseCheckBreakdown"),{asset:c,setAsset:d}=(0,q.usePortfolioValueContext)(),[{data:h}]=(0,f.useQuery)({query:et,variables:{accountId:e,addresses:t},pause:0===t.length}),x=h?.userPortfolio?.summary?.[0],y=x?.nftPercentageOfPortfolio??0,p=x?.tokenPercentageOfPortfolio??0,g="tokens"===c,C="nfts"===c,S=l&&s,T=(0,o.useMemo)(()=>[{label:n("nfts"),type:"nfts",value:y,color:"rgb(var(--color-epic))",gradient:{from:"rgb(var(--color-pink-1))",to:"rgb(var(--color-purple-1))",offset:"4%"},className:"tokens"===c?"opacity-40":void 0},{label:n("tokens"),type:"tokens",value:p,color:"rgb(var(--color-blue-3))",gradient:{from:"rgb(var(--color-blue-6))",to:"rgb(var(--color-blue-7))"},className:"nfts"===c?"opacity-40":void 0}],[y,p,n,c]),j=e=>{e===c?d("all"):d(e)};return x?(0,a.jsxs)(b.FlexCenter,{className:"justify-center gap-4 sm:gap-8",children:[(0,a.jsx)("div",{className:"flex-shrink-0",children:(0,a.jsx)(Q.DonutChart,{ariaLabel:n("portfolioBreakdownChart",{nftPercentage:y.toFixed(0),tokenPercentage:p.toFixed(0)}),data:T,getClassName:e=>e.className,getColor:e=>e.color,getGradient:e=>e.gradient,getLabel:e=>e.label,getValue:e=>e.value,onSegmentClick:e=>{j(e.type)},padAngle:.02,renderCenter:()=>(0,a.jsx)(ea,{displayMode:c,estimatedValue:x?.estimatedValue,hasMoreItems:!!h?.userItemsCount?.hasMore,hideNetWorth:S,itemCount:h?.userItemsCount?.count??0,nftPercentage:y,tokenCount:h?.userCurrencyOwnershipsV2?.individualCurrencyCount||0,tokenPercentage:p}),renderTooltip:({item:e})=>(0,a.jsxs)(r.FlexColumn,{className:"gap-1",children:[(0,a.jsx)(i.TextBody,{weight:"semibold",children:e.label}),(0,a.jsx)(i.TextBody,{color:"text-secondary",children:(0,a.jsx)(v.NumberDisplay,{display:"percent",value:e.value})})]}),showEmptyState:!0,size:200,thickness:24})}),(0,a.jsxs)(r.FlexColumn,{className:"min-w-0 gap-3",children:[(0,a.jsx)(K.UnstyledButton,{onClick:()=>j("nfts"),children:(0,a.jsxs)(b.FlexCenter,{className:(0,u.classNames)("gap-3 transition-opacity duration-200",g?"opacity-40":void 0),children:[(0,a.jsx)("div",{"aria-hidden":"true",className:"h-3 w-3 flex-shrink-0 rounded-full",style:{background:"linear-gradient(135deg, rgb(var(--color-pink-1)), rgb(var(--color-purple-1)))"}}),(0,a.jsx)(i.TextBody,{className:"truncate",weight:"semibold",children:n("nfts")}),(0,a.jsx)(i.TextBody,{className:"ml-auto",color:"text-secondary",children:(0,a.jsx)(v.NumberDisplay,{display:"percent",value:y})})]})}),(0,a.jsx)(K.UnstyledButton,{onClick:()=>j("tokens"),children:(0,a.jsxs)(b.FlexCenter,{className:(0,u.classNames)("gap-3 transition-opacity duration-200",C?"opacity-40":void 0),children:[(0,a.jsx)("div",{"aria-hidden":"true",className:"h-3 w-3 flex-shrink-0 rounded-full",style:{background:"linear-gradient(135deg, rgb(var(--color-blue-6)), rgb(var(--color-blue-7)))"}}),(0,a.jsx)(i.TextBody,{className:"truncate",weight:"semibold",children:n("tokens")}),(0,a.jsx)(i.TextBody,{className:"ml-auto",color:"text-secondary",children:(0,a.jsx)(v.NumberDisplay,{display:"percent",value:p})})]})})]})]}):(0,a.jsx)(er,{})},{fallback:()=>(0,a.jsx)(er,{})});function er(){let e,s,n=(0,t.c)(2);return n[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)("div",{className:"h-[200px] w-[200px] animate-pulse rounded-full bg-bg-secondary"}),n[0]=e):e=n[0],n[1]===Symbol.for("react.memo_cache_sentinel")?(s=(0,a.jsxs)(l.Flex,{className:"items-center gap-8",children:[e,(0,a.jsxs)(r.FlexColumn,{className:"gap-3",children:[(0,a.jsx)("div",{className:"h-4 w-24 animate-pulse rounded bg-bg-secondary"}),(0,a.jsx)("div",{className:"h-4 w-24 animate-pulse rounded bg-bg-secondary"})]})]}),n[1]=s):s=n[1],s}function es(e){let o,c,u,h,x,y,p,g=(0,t.c)(15),{breakdown:C,highMovers:S}=e,f=(0,m.useTranslations)("PortfolioPulseCheck");return g[0]===Symbol.for("react.memo_cache_sentinel")?(o=(0,a.jsx)(s.IconCallout,{icon:d,size:16,variant:"outlined"}),g[0]=o):o=g[0],g[1]!==f?(c=f("pulseCheck"),g[1]=f,g[2]=c):c=g[2],g[3]!==c?(u=(0,a.jsx)(n.SpaceBetween,{className:"border-border-1 border-b p-4",children:(0,a.jsxs)(l.Flex,{className:"items-center gap-3",children:[o,(0,a.jsx)(i.TextBody,{size:"md",weight:"semibold",children:c})]})}),g[3]=c,g[4]=u):u=g[4],g[5]!==C?(h=(0,a.jsx)("div",{className:"w-full lg:w-1/2 xl:w-full",children:C}),g[5]=C,g[6]=h):h=g[6],g[7]!==S?(x=(0,a.jsx)("div",{className:"w-full lg:w-1/2 xl:w-full",children:S}),g[7]=S,g[8]=x):x=g[8],g[9]!==h||g[10]!==x?(y=(0,a.jsxs)(r.FlexColumn,{className:"items-center gap-6 p-4 lg:flex-row xl:flex-col",children:[h,x]}),g[9]=h,g[10]=x,g[11]=y):y=g[11],g[12]!==u||g[13]!==y?(p=(0,a.jsxs)(r.FlexColumn,{className:"rounded-lg border border-border-1 bg-bg-primary",children:[u,y]}),g[12]=u,g[13]=y,g[14]=p):p=g[14],p}function en(){let e,l=(0,t.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(es,{breakdown:(0,a.jsx)(el,{}),highMovers:(0,a.jsx)(z,{})}),l[0]=e):e=l[0],e}e.s(["PortfolioPulseCheck",()=>en],638339)},440625,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(502732),r=e.i(39771),s=e.i(965523),n=e.i(718813),i=e.i(165102),o=e.i(258343),c=e.i(950293),u=e.i(309980),d=e.i(522285),m=e.i(647291),h=e.i(526042),x=e.i(885530),y=e.i(104062),p=e.i(89337),g=e.i(438249),C=e.i(960243),S=e.i(861316),f=e.i(70760),T=e.i(660712),j=e.i(670383),N=e.i(913868),b=e.i(756344),v=e.i(389852),L=e.i(771968),_=e.i(532500),k=e.i(919434),A=e.i(806056);e.i(500598);var P=e.i(207225),w=e.i(444501),O=e.i(508833),E=e.i(22764),I=e.i(81810),F=e.i(455480),B=e.i(601056),V=e.i(392024),M=e.i(437153),D=e.i(254842),R=e.i(738480),$=e.i(81303),q=e.i(28067),U=e.i(984335),z=e.i(190719),H=e.i(143692),G=e.i(668493),Q=e.i(609644);e.i(1075);var K=e.i(614055),W=e.i(489669);e.i(513736);var Y=e.i(142804),X=e.i(601318),Z=e.i(660422),J=e.i(445329),ee=e.i(619272),ea=e.i(519078),et=e.i(209959);let el=(0,x.graphql)(`
    fragment PortfolioTokensTableRow on CurrencyBalanceV2 {
      id
      address
      quantity
      usdValue
      gainStats {
        invested
        realized
        unrealized
        returnPercentage
        gain
      }
      asset {
        id
        name
        symbol
        imageUrl
        usdPrice
        contractAddress
        stats {
          marketCapUsd
          oneDay {
            volume
            priceChange
          }
          sevenDay {
            priceChange
          }
        }
        ...CurrencySparkLineChartSevenDay
        ...CurrencyV2Link
        ...CurrencyPreviewTooltip
        ...CurrencyV2Lockup
      }
    }
  `,[X.CurrencySparkLineChartSevenDayFragment,Q.CurrencyV2LinkFragment,W.CurrencyPreviewTooltipFragment,I.CurrencyV2LockupFragment]);var er=e.i(167368),es=e.i(310578),en=e.i(747460);function ei(){let e,l,r,s,n,i,o,c,u,d,h,x=(0,t.c)(24),{size:y}=(0,U.useTable)(),{image:p}=(0,en.tableRowSizeVariants)({size:y}),g=(0,J.useStatsSparklineChartClassName)(),C=(0,m.useIsOwnProfileAddress)(),S=q.TableRow,f=$.TableCell,T=ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES,j=B.Item,N=B.ItemAvatar,b=p();return x[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(es.SkeletonBlock,{className:"rounded-full"}),x[0]=e):e=x[0],x[1]!==N||x[2]!==b?(l=(0,a.jsx)(N,{className:b,children:e}),x[1]=N,x[2]=b,x[3]=l):l=x[3],x[4]===Symbol.for("react.memo_cache_sentinel")?(r=(0,a.jsx)(ea.ItemContent,{children:(0,a.jsx)(es.SkeletonLine,{className:"h-4 w-[100px]"})}),x[4]=r):r=x[4],x[5]!==j||x[6]!==l?(s=(0,a.jsxs)(j,{variant:"unstyled",children:[l,r]}),x[5]=j,x[6]=l,x[7]=s):s=x[7],x[8]!==f||x[9]!==T.token||x[10]!==s?(n=(0,a.jsx)(f,{className:T.token,children:s}),x[8]=f,x[9]=T.token,x[10]=s,x[11]=n):n=x[11],x[12]===Symbol.for("react.memo_cache_sentinel")?(i=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.value,children:(0,a.jsx)(es.SkeletonLine,{className:"h-4 w-[80px]"})}),x[12]=i):i=x[12],x[13]===Symbol.for("react.memo_cache_sentinel")?(o=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.quantity,children:(0,a.jsx)(es.SkeletonLine,{className:"h-4 w-[60px]"})}),x[13]=o):o=x[13],x[14]===Symbol.for("react.memo_cache_sentinel")?(c=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.price,children:(0,a.jsx)(es.SkeletonLine,{className:"h-4 w-[70px]"})}),x[14]=c):c=x[14],x[15]!==C?(u=C&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gain,children:(0,a.jsx)(es.SkeletonLine,{className:"h-4 w-[60px]"})}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gainPercentage,children:(0,a.jsx)(es.SkeletonLine,{className:"h-4 w-[50px]"})})]}),x[15]=C,x[16]=u):u=x[16],x[17]!==g?(d=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.sparkline,children:(0,a.jsx)(er.ChartSkeleton,{className:g})}),x[17]=g,x[18]=d):d=x[18],x[19]!==S||x[20]!==u||x[21]!==d||x[22]!==n?(h=(0,a.jsxs)(S,{children:[n,i,o,c,u,d]}),x[19]=S,x[20]=u,x[21]=d,x[22]=n,x[23]=h):h=x[23],h}function eo(e){let l,r,s,n,i,o,c,u,d,h,x,y,p,g,C,S=(0,t.c)(46),{item:f,className:T,showChainBadge:j,useTokenGroup:N,wallet:b}=e,v=(0,J.useStatsSparklineChartClassName)(),L=(0,m.useIsOwnProfileAddress)();if(!f){let e;return S[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(ei,{}),S[0]=e):e=S[0],e}S[1]!==f?(l=(0,F.readFragment)(el,f),S[1]=f,S[2]=l):l=S[2];let _=l;if(!_)return null;let{asset:k}=_,A=void 0!==j&&j?void 0:null;return S[3]!==A?(r=(0,a.jsx)(O.CurrencyLockupAvatar,{badge:A,className:"bg-white"}),S[3]=A,S[4]=r):r=S[4],S[5]!==k||S[6]!==r||S[7]!==N?(s=(0,a.jsx)(O.CurrencyLockup,{className:"w-auto",currency:k,size:"md",useTokenGroup:N,children:r}),S[5]=k,S[6]=r,S[7]=N,S[8]=s):s=S[8],S[9]!==k||S[10]!==N?(n=(0,a.jsx)(ea.ItemContent,{className:"w-full",children:(0,a.jsx)(O.CurrencyLockup,{className:"w-full",currency:k,showAvatar:!1,showNewChip:!1,size:"sm",useTokenGroup:N})}),S[9]=k,S[10]=N,S[11]=n):n=S[11],S[12]!==s||S[13]!==n?(i=(0,a.jsxs)(B.Item,{className:"w-full max-w-full",variant:"unstyled",children:[s,n]}),S[12]=s,S[13]=n,S[14]=i):i=S[14],S[15]!==k||S[16]!==i?(o=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.token,children:(0,a.jsx)(K.CurrencyPreviewTooltip,{currency:k,children:i})}),S[15]=k,S[16]=i,S[17]=o):o=S[17],S[18]!==_.usdValue?(c=(0,a.jsx)(R.NumberDisplay,{display:"usd",value:_.usdValue}),S[18]=_.usdValue,S[19]=c):c=S[19],S[20]!==b?(u=b&&(0,a.jsx)(H.WalletBadge,{wallets:[b]}),S[20]=b,S[21]=u):u=S[21],S[22]!==u||S[23]!==c?(d=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.value,children:(0,a.jsxs)(D.Flex,{className:"items-center gap-1",children:[c,u]})}),S[22]=u,S[23]=c,S[24]=d):d=S[24],S[25]!==_.quantity?(h=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.quantity,children:(0,a.jsx)(R.NumberDisplay,{display:"compact",value:_.quantity})}),S[25]=_.quantity,S[26]=h):h=S[26],S[27]!==k.usdPrice?(x=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.price,children:(0,a.jsx)(R.NumberDisplay,{display:"usd-compact",value:k.usdPrice})}),S[27]=k.usdPrice,S[28]=x):x=S[28],S[29]!==_.gainStats||S[30]!==L?(y=L&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gain,children:(0,a.jsx)(R.NumberDisplay,{className:(0,M.classNames)({"text-success-1":_.gainStats&&Math.abs(_.gainStats.gain)>=.005&&_.gainStats.gain>0,"text-error-1":_.gainStats&&Math.abs(_.gainStats.gain)>=.005&&_.gainStats.gain<0}),display:"usd",value:_.gainStats?.005>Math.abs(_.gainStats.gain)?0:_.gainStats.gain:null})}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gainPercentage,children:_.gainStats?.returnPercentage!=null?(0,a.jsx)(et.StatChangeCallout,{change:5e-4>Math.abs(_.gainStats.returnPercentage)?0:_.gainStats.returnPercentage,iconPlacement:"end",overrides:{StatChange:{className:"text-sm"}},withBackground:!1}):(0,a.jsx)("span",{className:"text-text-secondary",children:"—"})})]}),S[29]=_.gainStats,S[30]=L,S[31]=y):y=S[31],S[32]!==k||S[33]!==v?(p=(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.sparkline,children:(0,a.jsx)(Y.CurrencySparkLineChart,{className:v,currency:k,timeframe:"SEVEN_DAYS"})}),S[32]=k,S[33]=v,S[34]=p):p=S[34],S[35]!==k||S[36]!==d||S[37]!==h||S[38]!==x||S[39]!==y||S[40]!==p||S[41]!==o?(g=(0,a.jsxs)(G.CurrencyLink,{currency:k,variant:"unstyled",children:[o,d,h,x,y,p]}),S[35]=k,S[36]=d,S[37]=h,S[38]=x,S[39]=y,S[40]=p,S[41]=o,S[42]=g):g=S[42],S[43]!==T||S[44]!==g?(C=(0,a.jsx)(q.TableRow,{asChild:!0,className:T,interactive:!0,children:g}),S[43]=T,S[44]=g,S[45]=C):C=S[45],C}let ec=(0,x.graphql)(`
    fragment PortfolioTokensTableGroupedRow on TokenGroupBalanceV2 {
      id
      usdValue
      quantity
      asset {
        id
        name
        symbol
        imageUrl
        primaryCurrency {
          id
          name
          symbol
          imageUrl
          usdPrice
          contractAddress
          stats {
            marketCapUsd
            oneDay {
              volume
              priceChange
            }
            sevenDay {
              priceChange
            }
          }
          ...CurrencySparkLineChartSevenDay
          ...CurrencyV2Link
          ...CurrencyPreviewTooltip
          ...CurrencyV2Lockup
        }
      }
      underlyingBalances {
        __typename
        ... on CurrencyBalanceV2 {
          id
          address
          ...PortfolioTokensTableRow
          ...SortTokenGroupCurrencyBalances
        }
      }
    }
  `,[X.CurrencySparkLineChartSevenDayFragment,Q.CurrencyV2LinkFragment,W.CurrencyPreviewTooltipFragment,I.CurrencyV2LockupFragment,el,Z.SortTokenGroupCurrencyBalancesFragment]);function eu({item:e,sort:t,addressToWallet:r}){let s=(0,J.useStatsSparklineChartClassName)(),n=(0,m.useIsOwnProfileAddress)(),{size:i}=(0,U.useTable)(),[o,u]=(0,j.useState)(!1),d=(0,F.readFragment)(ec,e),h=d.asset.primaryCurrency,x=(0,j.useMemo)(()=>{let e=(d.underlyingBalances??[]).filter(e=>e?.__typename==="CurrencyBalanceV2");return!t||e.length<=1?e:(0,Z.sortTokenGroupCurrencyBalances)(e,t.by,t.direction)},[d.underlyingBalances,t]),y=(0,j.useMemo)(()=>{if(!r||0===r.size)return null;let e=x.map(e=>({address:e.address}));return(0,f.getUniqueWalletsFromBalances)(e,r)},[r,x]),p=x.length>=1;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(q.TableRow,{asChild:!0,className:o?"border-b-0":void 0,interactive:!0,children:(0,a.jsxs)(G.CurrencyLink,{currency:h,variant:"unstyled",children:[(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.token,children:(0,a.jsxs)("div",{className:"flex items-center gap-1",children:[h?(0,a.jsx)(K.CurrencyPreviewTooltip,{currency:h,children:(0,a.jsx)(B.Item,{className:"w-full max-w-full",variant:"unstyled",children:(0,a.jsxs)(O.CurrencyLockup,{className:"w-auto",currency:h,size:i,children:[(0,a.jsx)(V.LockupAvatar,{border:!0,className:"shrink-0 rounded-full bg-white object-cover",size:32,src:d.asset.imageUrl??h.imageUrl}),(0,a.jsx)(E.CurrencyLockupContent,{className:"w-full text-start",children:(0,a.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,a.jsx)(V.LockupTitle,{weight:"regular",children:d.asset.name}),(0,a.jsx)(O.CurrencyLockupBadge,{}),(0,a.jsxs)(c.TextBody,{color:"text-secondary",size:"sm",children:["(",x.length,")"]})]})})]})})}):(0,a.jsx)("div",{className:"truncate font-mono",children:d.asset?.symbol??"-"}),p?(0,a.jsx)(l.Button,{icon:(0,a.jsx)(z.ChevronRight,{className:(0,M.classNames)("rotate-90 transition-transform duration-150",o&&"rotate-270"),fill:"text-secondary",size:16}),onClick:e=>{e.preventDefault(),e.stopPropagation(),u(e=>!e)},size:"xs",variant:"ghost"}):void 0]})}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.value,children:(0,a.jsxs)(D.Flex,{className:"items-center gap-1",children:[(0,a.jsx)(R.NumberDisplay,{display:"usd",value:d.usdValue}),y&&y.length>0&&(0,a.jsx)(H.WalletBadge,{wallets:y})]})}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.quantity,children:(0,a.jsx)(R.NumberDisplay,{display:"compact",value:d.quantity})}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.price,children:h?(0,a.jsx)(R.NumberDisplay,{display:"usd-compact",value:h.usdPrice}):(0,a.jsx)("div",{className:"font-mono",children:"-"})}),n&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gain,children:(0,a.jsx)("span",{className:"text-text-secondary",children:"—"})}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gainPercentage,children:(0,a.jsx)("span",{className:"text-text-secondary",children:"—"})})]}),(0,a.jsx)($.TableCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.sparkline,children:h?(0,a.jsx)(Y.CurrencySparkLineChart,{className:s,currency:h,timeframe:"SEVEN_DAYS"}):(0,a.jsx)("div",{className:"font-mono",children:"-"})})]})}),o?x.map((e,t)=>{let l=r?.get((0,S.normalizeAddress)(e.address));return(0,a.jsx)(eo,{className:t!==x.length-1?"border-0":void 0,index:0,item:e,showChainBadge:!0,useTokenGroup:!1,wallet:l},e.id)}):null]})}var ed=e.i(378536),em=e.i(653848),eh=e.i(871085);function ex(e){let l,r,s,n,i,o,c,u,h,x,y,p,g,S,f,T,j,N,b=(0,t.c)(54),{className:v,sortBy:L,sortDirection:_,onSortChange:k}=e,A=(0,d.useTranslations)("useStatsColumns"),P=(0,m.useIsOwnProfileAddress)();b[0]!==k||b[1]!==L||b[2]!==_?(l=e=>{e.column!==L?k(e.column,"DESC"):k(e.column,"DESC"===_?"ASC":"DESC")},b[0]=k,b[1]=L,b[2]=_,b[3]=l):l=b[3];let w=l;return b[4]!==v?(r=(0,M.classNames)("border-border-1 border-b bg-bg-primary",v),b[4]=v,b[5]=r):r=b[5],b[6]!==A?(s=A("token"),b[6]=A,b[7]=s):s=b[7],b[8]!==s?(n=(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.token,children:s}),b[8]=s,b[9]=n):n=b[9],b[10]!==L||b[11]!==_?(i=L===C.CurrencyStatsSortBy.USD_VALUE?(0,eh.toLowerCase)(_):void 0,b[10]=L,b[11]=_,b[12]=i):i=b[12],b[13]!==w||b[14]!==i?(o={column:C.CurrencyStatsSortBy.USD_VALUE,onSort:w,order:i},b[13]=w,b[14]=i,b[15]=o):o=b[15],b[16]!==A?(c=A("value"),b[16]=A,b[17]=c):c=b[17],b[18]!==o||b[19]!==c?(u=(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.value,sort:o,children:c}),b[18]=o,b[19]=c,b[20]=u):u=b[20],b[21]!==A?(h=A("held.header"),b[21]=A,b[22]=h):h=b[22],b[23]!==h?(x=(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.quantity,children:h}),b[23]=h,b[24]=x):x=b[24],b[25]!==L||b[26]!==_?(y=L===C.CurrencyStatsSortBy.PRICE?(0,eh.toLowerCase)(_):void 0,b[25]=L,b[26]=_,b[27]=y):y=b[27],b[28]!==w||b[29]!==y?(p={column:C.CurrencyStatsSortBy.PRICE,onSort:w,order:y},b[28]=w,b[29]=y,b[30]=p):p=b[30],b[31]!==A?(g=A("price.header"),b[31]=A,b[32]=g):g=b[32],b[33]!==p||b[34]!==g?(S=(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.price,sort:p,children:g}),b[33]=p,b[34]=g,b[35]=S):S=b[35],b[36]!==P||b[37]!==w||b[38]!==L||b[39]!==_||b[40]!==A?(f=P&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gain,sort:{column:C.CurrencyStatsSortBy.GAIN,onSort:w,order:L===C.CurrencyStatsSortBy.GAIN?(0,eh.toLowerCase)(_):void 0},children:A("gain.header")}),(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.gainPercentage,children:A("gainPercentage.header")})]}),b[36]=P,b[37]=w,b[38]=L,b[39]=_,b[40]=A,b[41]=f):f=b[41],b[42]!==A?(T=A("last7Days.header"),b[42]=A,b[43]=T):T=b[43],b[44]!==T?(j=(0,a.jsx)(em.TableHeaderCell,{className:ee.PORTFOLIO_TOKENS_TABLE_CLASSNAMES.sparkline,children:T}),b[44]=T,b[45]=j):j=b[45],b[46]!==x||b[47]!==S||b[48]!==f||b[49]!==j||b[50]!==r||b[51]!==n||b[52]!==u?(N=(0,a.jsxs)(ed.TableHeader,{className:r,children:[n,u,x,S,f,j]}),b[46]=x,b[47]=S,b[48]=f,b[49]=j,b[50]=r,b[51]=n,b[52]=u,b[53]=N):N=b[53],N}var ey=e.i(692632);function ep(){let e,l,r=(0,t.c)(2);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(ex,{className:(0,w.topStickyVariants)({tableHeader:!0}),onSortChange:eS,sortBy:C.CurrencyStatsSortBy.USD_VALUE,sortDirection:"DESC"}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(l=(0,a.jsx)(g.Table,{className:"h-[600px] overflow-hidden",contentClassName:"scrollbar-hidden",dividers:!0,header:e,itemKey:eC,items:(0,ey.range)(25).map(eg),renderRow:eo,size:"md"}),r[1]=l):l=r[1],l}function eg(){}function eC(e,a){return a}function eS(){}let ef=(0,x.graphql)(`
    query PortfolioTokensTableQuery(
      $accountId: String
      $addresses: [Address!]!
      $filter: CurrenciesFilter
      $sort: CurrenciesSort
      $limit: Int!
      $cursor: String
      $useTokenGrouping: Boolean!
    ) {
      userCurrencyOwnershipsV2(
        accountId: $accountId
        addresses: $addresses
        filter: $filter
        sort: $sort
        limit: $limit
        cursor: $cursor
        useTokenGrouping: $useTokenGrouping
      ) {
        items {
          __typename
          id
          asset {
            name
            symbol
          }
          ... on CurrencyBalanceV2 {
            ...PortfolioTokensTableRow
          }
          ... on TokenGroupBalanceV2 {
            ...PortfolioTokensTableGroupedRow
            underlyingBalances {
              __typename
              ... on CurrencyBalanceV2 {
                ...PortfolioTokensTableRow
              }
            }
          }
        }
        nextPageCursor
      }
    }
  `,[el,ec]),eT=(0,v.withSuspense)(()=>{let{chains:e}=(0,_.useChainsQueryParam)(),t=(0,m.useProfileAddress)(),l=(0,m.useProfileAccountId)(),r=(0,N.useProfileSelectedAddresses)(),s=(0,m.useProfileLinkedAddresses)(),n=(0,b.useHasSearchFilters)(),i=(0,k.useClearFilters)(),o=(0,A.useTokenGroupingEnabled)(),c=(0,P.useAddress)(),{wallets:u}=(0,T.useLinkedWalletBalances)({address:c}),d=s.length>1,h=(0,j.useMemo)(()=>(0,f.createAddressToWalletMap)(u),[u]),[x,v]=(0,j.useState)(C.CurrencyStatsSortBy.USD_VALUE),[O,E]=(0,j.useState)("DESC"),I=function(e,a){switch(e){case C.CurrencyStatsSortBy.USD_VALUE:return{by:"USD_VALUE",direction:a};case C.CurrencyStatsSortBy.PRICE:return{by:"PRICE",direction:a};case C.CurrencyStatsSortBy.SEVEN_DAY_PRICE_CHANGE:return{by:"SEVEN_DAY_PRICE_CHANGE",direction:a};case C.CurrencyStatsSortBy.GAIN:return{by:"GAIN",direction:a};default:return{by:"USD_VALUE",direction:"DESC"}}}(x,O),{items:F,pagination:B,error:V,noResults:M}=(0,L.usePaginatedQuery)({query:ef,variables:{accountId:l,addresses:r,filter:{chains:e.length>0?e:void 0},sort:I,limit:25,useTokenGrouping:o},pause:0===r.length},e=>e?.userCurrencyOwnershipsV2,{pageSize:25}),D=F?.filter(e=>e?.__typename==="CurrencyBalanceV2"||e?.__typename==="TokenGroupBalanceV2");return t?V&&!F.length?(0,a.jsx)(p.ErrorState,{size:"lg"}):M?(0,a.jsx)(y.EmptyState,{onResetFilters:i,size:"lg",variant:n?"no-results-with-filters":"no-results"}):(0,a.jsx)(g.Table,{className:"h-[600px]",contentClassName:"scrollbar-hidden",dividers:!0,hasNext:B.hasNext,header:(0,a.jsx)(ex,{className:(0,w.topStickyVariants)({tableHeader:!0}),onSortChange:(e,a)=>{v(e),E(a)},sortBy:x,sortDirection:O}),isLoadingNext:B.isLoadingNext,itemKey:e=>e?.id,items:D,loadNext:B.loadNext,renderRow:({item:e,index:t})=>{if(!e)return null;if("TokenGroupBalanceV2"===e.__typename)return(0,a.jsx)(eu,{addressToWallet:d?h:void 0,item:e,sort:I});let l="address"in e?e.address:void 0,r=d&&l?h.get((0,S.normalizeAddress)(l)):void 0;return(0,a.jsx)(eo,{index:t,item:e,wallet:r})},size:"md"}):(0,a.jsx)(ep,{})},{fallback:ep,errorFallback:(0,a.jsx)(p.ErrorState,{size:"lg"})}),ej=e=>{let x,y,p,g,C,S,f,T,j,N=(0,t.c)(21),{children:b}=e,v=(0,d.useTranslations)("PortfolioTokensTable"),L=(0,m.useProfilePrimaryAccount)(),_=(0,m.useProfileAddress)(),{getProfileUrlWithIdentifier:k}=(0,h.useProfilePageUrl)(),A=(L?.kind==="WALLET"?null:L?.username)??_;N[0]!==k||N[1]!==A?(x=k(A,{view:"tokens"}),N[0]=k,N[1]=A,N[2]=x):x=N[2];let P=x;return N[3]===Symbol.for("react.memo_cache_sentinel")?(y=(0,a.jsx)(n.IconCallout,{icon:u.Toll,size:16,variant:"outlined"}),N[3]=y):y=N[3],N[4]!==v?(p=v("tokenPositions"),N[4]=v,N[5]=p):p=N[5],N[6]!==p?(g=(0,a.jsxs)(r.FlexCenter,{className:"gap-3",children:[y,(0,a.jsx)(c.TextBody,{size:"md",weight:"semibold",children:p})]}),N[6]=p,N[7]=g):g=N[7],N[8]!==v?(C=v("viewAll"),N[8]=v,N[9]=C):C=N[9],N[10]!==P||N[11]!==C?(S=(0,a.jsx)(l.Button,{href:P,size:"sm",variant:"secondary",children:C}),N[10]=P,N[11]=C,N[12]=S):S=N[12],N[13]!==g||N[14]!==S?(f=(0,a.jsx)(i.Media,{greaterThanOrEqual:"lg",children:(0,a.jsxs)(o.SpaceBetween,{className:"border-border-1 border-b p-4",children:[g,S]})}),N[13]=g,N[14]=S,N[15]=f):f=N[15],N[16]!==b?(T=(0,a.jsx)(s.FlexColumn,{className:"h-[600px]",children:b}),N[16]=b,N[17]=T):T=N[17],N[18]!==f||N[19]!==T?(j=(0,a.jsxs)(a.Fragment,{children:[f,T]}),N[18]=f,N[19]=T,N[20]=j):j=N[20],j};function eN(){let e,l=(0,t.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(ej,{children:(0,a.jsx)(eT,{})}),l[0]=e):e=l[0],e}e.s(["PortfolioTokens",()=>eN],440625)},881840,e=>{"use strict";var a=e.i(7683),t=e.i(866313),l=e.i(333799),r=e.i(605522),s=e.i(277026),n=e.i(508022),i=e.i(437153),o=e.i(987556),c=e.i(104062),u=e.i(89337),d=e.i(39771),m=e.i(310578),h=e.i(301648),x=e.i(960243),y=e.i(94798),p=e.i(522285),g=e.i(670383),C=e.i(688280),S=e.i(913868),f=e.i(647291),T=e.i(526042),j=e.i(980016),N=e.i(389852),b=e.i(532500),v=e.i(806056),L=e.i(794835),_=e.i(508833),k=e.i(535374),A=e.i(100868),P=e.i(254842),w=e.i(965523),O=e.i(738480),E=e.i(209959),I=e.i(950293),F=e.i(967593),B=e.i(871659),V=e.i(266341),M=e.i(439765),D=e.i(682576),R=e.i(885530),$=e.i(455480);e.i(661049);var q=e.i(493473),U=e.i(190519);e.i(275521);var z=e.i(6425),H=e.i(600028),G=e.i(825504),Q=e.i(740743),K=e.i(273720),W=e.i(999258);e.i(676104);var Y=e.i(177464),X=e.i(304615),Z=e.i(759737),J=e.i(564793);let ee=(0,R.graphql)(`
    fragment CollectionHeldStat on Collection {
      id
      ownership(address: $address) {
        totalQuantity
      }
      accountOwnership(accountId: $accountId) {
        totalQuantity
      }
    }
  `);function ea(e){let l,r,s,n,i,o,c=(0,t.c)(13);c[0]!==e?({collection:l,...r}=e,c[0]=e,c[1]=l,c[2]=r):(l=c[1],r=c[2]),c[3]!==l?(s=(0,$.readFragment)(ee,l),c[3]=l,c[4]=s):s=c[4];let u=s,d=(0,p.useTranslations)("CollectionHeldStat");c[5]!==d?(n=d("label"),c[5]=d,c[6]=n):n=c[6];let m=u.accountOwnership?.totalQuantity??u.ownership?.totalQuantity;return c[7]!==m?(i=(0,a.jsx)(O.NumberDisplay,{"data-testid":"held-quantity",display:"full",value:m}),c[7]=m,c[8]=i):i=c[8],c[9]!==r||c[10]!==n||c[11]!==i?(o=(0,a.jsx)(J.CollectionStatDisplay,{label:n,value:i,...r}),c[9]=r,c[10]=n,c[11]=i,c[12]=o):o=c[12],o}var et=e.i(570293);let el=(0,R.graphql)(`
    fragment CollectionValueStat on Collection {
      id
      ownership(address: $address) {
        value {
          ...Volume
        }
      }
      accountOwnership(accountId: $accountId) {
        value {
          ...Volume
        }
      }
    }
  `,[G.VolumeFragment]);function er(e){let l,r,s,n,i,o,c=(0,t.c)(13);c[0]!==e?({collection:l,...r}=e,c[0]=e,c[1]=l,c[2]=r):(l=c[1],r=c[2]),c[3]!==l?(s=(0,$.readFragment)(el,l),c[3]=l,c[4]=s):s=c[4];let u=s,d=(0,p.useTranslations)("CollectionValueStat");c[5]!==d?(n=d("label"),c[5]=d,c[6]=n):n=c[6];let m=u.accountOwnership?.value??u.ownership?.value;return c[7]!==m?(i=(0,a.jsx)(et.Volume,{"data-testid":"portfolio-value",display:"compact",volume:m}),c[7]=m,c[8]=i):i=c[8],c[9]!==r||c[10]!==n||c[11]!==i?(o=(0,a.jsx)(J.CollectionStatDisplay,{label:n,value:i,...r}),c[9]=r,c[10]=n,c[11]=i,c[12]=o):o=c[12],o}let es=(0,R.graphql)(`
    fragment PortfolioCollectionStats on Collection {
      ...CollectionStat
      ...CollectionHeldStat
      ...CollectionValueStat
    }
  `,[Z.CollectionStatFragment,ee,el]),en=["floor_price","held","value","top_offer"];function ei(e){let l,r,s,n=(0,t.c)(10),{collection:o,size:c,className:u,dividers:d,overrides:m}=e,h=void 0===c?"sm":c;n[0]!==o?(l=(0,$.readFragment)(es,o),n[0]=o,n[1]=l):l=n[1];let x=l;return n[2]!==x||n[3]!==d||n[4]!==m?(r=en.map((e,t)=>(0,a.jsxs)(g.Fragment,{children:["held"===e?(0,a.jsx)(ea,{collection:x,...m?.all,...m?.held,className:(0,i.classNames)(m?.all?.className,m?.held?.className)}):"value"===e?(0,a.jsx)(er,{collection:x,...m?.all,...m?.value,className:(0,i.classNames)(m?.all?.className,m?.value?.className)}):(0,a.jsx)(X.CollectionStat,{collection:x,stat:e,...m?.all,...m?.[e],className:(0,i.classNames)(m?.all?.className,m?.[e]?.className)}),d&&t<en.length-1?(0,a.jsx)(W.Separator,{className:"h-auto",orientation:"vertical"}):null]},e)),n[2]=x,n[3]=d,n[4]=m,n[5]=r):r=n[5],n[6]!==u||n[7]!==h||n[8]!==r?(s=(0,a.jsx)(Y.StatDisplay,{className:u,size:h,children:r}),n[6]=u,n[7]=h,n[8]=r,n[9]=s):s=n[9],s}var eo=e.i(293514),ec=e.i(807023),eu=e.i(972033),ed=e.i(509017);let em=(0,R.graphql)(`
    query PortfolioCollectionTooltipContentQuery(
      $collectionSlug: String!
      $address: Address
      $accountId: String
    ) {
      collectionBySlug(slug: $collectionSlug) {
        __typename
        ... on Collection {
          id
          slug
          ...CollectionLockup
          ...CollectionChainChip
          ...PortfolioCollectionStats
        }
      }
    }
  `,[D.CollectionLockupFragment,es,K.CollectionChainChipFragment,G.VolumeFragment]),eh=(0,R.graphql)(`
    query PortfolioCollectionItemsQuery(
      $collectionSlug: String!
      $addresses: [Address!]!
    ) {
      collectionItems(
        collectionSlug: $collectionSlug
        limit: 4
        filter: { ownedByAddresses: $addresses }
        sort: { by: RARITY, direction: DESC }
      ) {
        items {
          id
          ...ItemLink
          ...ItemMedia
        }
      }
    }
  `,[U.ItemLinkFragment,H.ItemMediaFragment]),ex=(0,N.withSuspense)(({collection:e})=>{let{slug:t}=(0,$.readFragment)(ec.CollectionPreviewTooltipContentFragment,e),r=(0,f.useProfileAddress)(),s=(0,S.useProfileSelectedAddresses)(),n=(0,f.useProfileAccountId)(),i=(0,f.useProfileKind)(),[{data:o}]=(0,l.useQuery)({query:em,variables:{collectionSlug:t,address:r,accountId:"ACCOUNT"===i?n:void 0},pause:!r}),[{data:c}]=(0,l.useQuery)({query:eh,variables:{collectionSlug:t,addresses:s},pause:0===s.length}),u=(0,p.useTranslations)("PortfolioCollectionTooltipContent");if(o?.collectionBySlug?.__typename==="Collection"){let e=o.collectionBySlug,t=Array.isArray(c?.collectionItems.items)?c.collectionItems.items:[],l=(0,a.jsx)(ei,{className:eo.collectionStatsClassName,collection:e,overrides:{all:{className:eo.collectionStatClassName,itemClassName:eo.collectionStatItemClassName,valueClassName:eo.collectionStatValueClassName}}});return(0,a.jsx)(ed.CollectionPreviewTooltipLayout,{chainBadge:(0,a.jsx)(K.CollectionChainChip,{badge:!0,collection:e}),itemMedia:t.length>0?t.map(e=>(0,a.jsx)(q.ItemLink,{className:"aspect-square w-[96px] shrink-0 overflow-hidden rounded bg-bg-additional-1",item:e,variant:"unstyled",children:(0,a.jsx)(z.ItemMedia,{containerSize:96,item:e,surface:"preview"})},e.id)):null,lockup:(0,a.jsxs)(L.CollectionLockup,{collection:e,size:"sm",children:[(0,a.jsx)(L.CollectionLockupAvatar,{}),(0,a.jsx)(M.CollectionLockupContent,{children:(0,a.jsx)(L.CollectionLockupTitle,{disableTextOverflowTooltip:!0})})]}),stats:l})}return(0,a.jsx)(Q.PreviewTooltipContent,{children:(0,a.jsx)(F.TooltipLabel,{children:u("error")})})},{fallback:(0,a.jsx)(eu.CollectionPreviewTooltipContentSkeleton,{})});var ey=e.i(803577),ep=e.i(81810),eg=e.i(609644),eC=e.i(116889),eS=e.i(314346),ef=e.i(132553),eT=e.i(355772),ej=e.i(916660),eN=e.i(446602),eb=e.i(146941),ev=e.i(147746);function eL(){let e,l,r=(0,t.c)(4),s=(0,p.useTranslations)("PortfolioTokenTooltipContent");return r[0]!==s?(e=s("error"),r[0]=s,r[1]=e):e=r[1],r[2]!==e?(l=(0,a.jsx)(Q.PreviewTooltipContent,{children:(0,a.jsx)(F.TooltipLabel,{children:e})}),r[2]=e,r[3]=l):l=r[3],l}let e_=(0,R.graphql)(`
    query PortfolioTokenTooltipCurrencyQuery(
      $contract: ContractIdentifierInput!
      $accountId: String
      $addresses: [Address!]!
    ) {
      currencyV2(contract: $contract) {
        __typename
        id
        symbol
        usdPrice
        contractAddress
        chainIdentifier
        chain {
          identifier
          ...ChainBadge
        }
        stats {
          oneDay {
            priceChange
          }
        }
        ...CurrencyChartColor
        ...CurrencyV2Lockup
        ...CurrencyV2Link
        ...CurrencyLineChart
      }
      priceHistory24h: currencyPriceHistory(
        contract: $contract
        timeframe: ONE_DAY
      ) {
        time
        price {
          usd
        }
      }
      userCurrencyOwnershipsV2(
        accountId: $accountId
        addresses: $addresses
        contracts: [$contract]
        disableSpamFiltering: true
        useTokenGrouping: true
        limit: 20
      ) {
        items {
          __typename
          ... on CurrencyBalanceV2 {
            id
            quantity
            usdValue
            gainStats {
              gain
              invested
              returnPercentage
            }
          }
          ... on TokenGroupBalanceV2 {
            id
            quantity
            usdValue
            gainStats {
              gain
              invested
              returnPercentage
            }
          }
        }
      }
    }
  `,[ey.ChainBadgeFragment,eS.CurrencyChartColorFragment,eg.CurrencyV2LinkFragment,ep.CurrencyV2LockupFragment,ej.CurrencyLineChartFragment]),ek=(0,N.withSuspense)(({currency:e})=>{let t=(0,p.useTranslations)("PortfolioTokenTooltipContent"),{contractAddress:r,chainIdentifier:s}=(0,$.readFragment)(eb.CurrencyPreviewTooltipContentFragment,e),n=(0,f.useProfileAccountId)(),o=(0,S.useProfileSelectedAddresses)(),[{data:c}]=(0,l.useQuery)({query:e_,variables:{contract:{address:r,chain:s},accountId:n,addresses:o},pause:0===o.length});if(c?.currencyV2){let e=c.currencyV2,l=c.priceHistory24h,r=l&&l.length>1,s=c.userCurrencyOwnershipsV2?.items?.find(e=>"CurrencyBalanceV2"===e.__typename||"TokenGroupBalanceV2"===e.__typename),n=s?.quantity?Number.parseFloat(s.quantity):0,o=e.usdPrice?Number.parseFloat(e.usdPrice):0,u=n>0&&s?.gainStats&&s.gainStats.invested>0?s.gainStats.invested/n:o,m=s?.gainStats?s.gainStats.gain:0,h=s?.gainStats?s.gainStats.returnPercentage:0,x=(0,a.jsxs)(Y.StatDisplay,{children:[(0,a.jsxs)(Y.StatDisplayItem,{className:"items-start",children:[(0,a.jsx)(Y.StatDisplayItemLabel,{className:"self-start md:self-auto",children:t("held")}),(0,a.jsx)(Y.StatDisplayItemValue,{className:"self-start text-xs md:self-auto md:text-sm",children:(0,a.jsx)(O.NumberDisplay,{className:"font-semibold text-sm",display:"compact",suffix:e.symbol,value:s?.quantity})})]}),(0,a.jsxs)(Y.StatDisplayItem,{className:"items-start",children:[(0,a.jsx)(Y.StatDisplayItemLabel,{className:"self-start md:self-auto",children:t("usdTotal")}),(0,a.jsx)(Y.StatDisplayItemValue,{className:"self-start text-xs md:self-auto md:text-sm",children:(0,a.jsx)(O.NumberDisplay,{className:"font-semibold text-sm",display:"usd-compact",value:s?.usdValue})})]}),(0,a.jsxs)(Y.StatDisplayItem,{className:"items-start",children:[(0,a.jsx)(F.TooltipLabel,{className:"text-text-secondary text-xs uppercase tracking-wide",children:t("gain")}),(0,a.jsxs)(Y.StatDisplayItemValue,{className:"gap-1 self-start text-xs md:self-auto md:text-sm",children:[(0,a.jsx)(O.NumberDisplay,{className:(0,i.classNames)("font-semibold text-sm",{"text-success-1":m>0,"text-error-1":m<0}),display:"usd-compact",value:m}),(0,a.jsx)(E.StatChangeCallout,{change:h,overrides:{StatChange:{className:"text-sm font-normal"}}})]})]}),(0,a.jsxs)(Y.StatDisplayItem,{className:"items-start",children:[(0,a.jsx)(Y.StatDisplayItemLabel,{className:"self-start md:self-auto",children:t("avgCost")}),(0,a.jsx)(Y.StatDisplayItemValue,{className:"self-start text-xs md:self-auto md:text-sm",children:(0,a.jsx)(O.NumberDisplay,{className:"font-semibold text-sm",display:"usd-compact",value:u})})]})]});return(0,a.jsxs)(Q.PreviewTooltipContent,{className:"flex-col gap-2.5",children:[(0,a.jsx)(d.FlexCenter,{className:"justify-between",children:(0,a.jsx)(d.FlexCenter,{className:"gap-1.5",children:(0,a.jsxs)(d.FlexCenter,{className:"gap-2",children:[(0,a.jsx)(_.CurrencyLockup,{currency:e,size:"md"}),(0,a.jsxs)(d.FlexCenter,{className:"gap-1",children:[(0,a.jsx)(ef.CurrencyPriceDisplay,{custom:{maximumFractionDigits:2,maximumSignificantDigits:2},value:e.usdPrice}),(0,a.jsx)(E.StatChangeCallout,{change:e.stats?.oneDay?.priceChange,overrides:{StatChange:{className:"font-semibold"}}})]})]})})}),r&&(0,a.jsxs)(w.FlexColumn,{className:"gap-2",children:[(0,a.jsx)(W.Separator,{}),(0,a.jsx)("div",{className:"h-[120px] w-full overflow-hidden",children:(0,a.jsx)(eC.CurrencyChartColorProvider,{currency:e,children:(0,a.jsx)(eT.CurrencyLineChart,{className:"!h-30 w-full",currency:e,intervalSize:"FIVE_MINUTES",overrides:{XAxis:{tickLabelProps:()=>({className:"text-[10px] fill-text-secondary",textAnchor:"right",dy:8})}},timeRange:{startTime:(0,eN.getStartTime)("ONE_DAY"),endTime:new Date}})})})]}),(0,a.jsx)(W.Separator,{className:"mx-3"}),x]})}return(0,a.jsx)(eL,{})},{fallback:(0,a.jsx)(ev.CurrencyPreviewTooltipContentSkeleton,{statCount:5}),errorFallback:(0,a.jsx)(eL,{})});function eA(e){let l,r,s,n,i=(0,t.c)(14),{item:o}=e,c=(0,p.useTranslations)("PortfolioValueTreeMap");if("collection"===o.type&&o.collection){let e;return i[0]!==o.collection?(e=(0,a.jsx)(ex,{collection:o.collection}),i[0]=o.collection,i[1]=e):e=i[1],e}if("token"===o.type&&o.currency){let e;return i[2]!==o.currency?(e=(0,a.jsx)(ek,{currency:o.currency}),i[2]=o.currency,i[3]=e):e=i[3],e}i[4]!==o.value||i[5]!==c?(l=o.value?`$${o.value.toLocaleString()}`:c("notAvailable"),i[4]=o.value,i[5]=c,i[6]=l):l=i[6];let u=l;return i[7]!==o.name?(r=(0,a.jsx)(I.TextBody,{className:"font-semibold",children:o.name}),i[7]=o.name,i[8]=r):r=i[8],i[9]!==u?(s=(0,a.jsx)(V.TextLabel,{children:u}),i[9]=u,i[10]=s):s=i[10],i[11]!==r||i[12]!==s?(n=(0,a.jsxs)(w.FlexColumn,{className:"gap-1",children:[r,s]}),i[11]=r,i[12]=s,i[13]=n):n=i[13],n}function eP(e){let l,r,n,c,u,d,m,h,x,y,g,C=(0,t.c)(64),{node:S,context:f,brandedColor:T}=e,j=(0,p.useTranslations)("PortfolioValueTreeMap"),N=(0,k.useNumberFormatter)(),{view:b}=(0,B.usePortfolioValueContext)(),{resolvedTheme:v}=(0,s.useTheme)(),V="dark"===v,{width:M,height:D,imageOnlyThreshold:R,minDisplayThreshold:$}=f,q="branded"===b;C[0]!==N||C[1]!==S.value||C[2]!==j?(l=S.value?N(S.value,{display:"usd-compact"}):j("notAvailable"),C[0]=N,C[1]=S.value,C[2]=j,C[3]=l):l=C[3];let U=l,z=M<=R,H=M<$||D<$;C[4]!==S.collection||C[5]!==S.currency||C[6]!==S.type?(r="collection"===S.type&&S.collection?(0,a.jsx)(L.CollectionLockup,{className:"w-auto",collection:S.collection,size:"sm",children:(0,a.jsx)(L.CollectionLockupAvatar,{badge:null})}):"token"===S.type&&S.currency?(0,a.jsx)(_.CurrencyLockup,{className:"w-auto",currency:S.currency,size:"sm",children:(0,a.jsx)(_.CurrencyLockupAvatar,{badge:null,className:"bg-white"})}):null,C[4]=S.collection,C[5]=S.currency,C[6]=S.type,C[7]=r):r=C[7],C[8]!==r?(n=(0,a.jsx)(a.Fragment,{children:r}),C[8]=r,C[9]=n):n=C[9];let G=n;C[10]!==q||C[11]!==S.metadata?.change?(c=q?(0,a.jsx)(E.StatChangeCallout,{change:S.metadata?.change,withBackground:!1}):(0,a.jsx)(O.NumberDisplay,{className:"font-mono",display:"percent",style:{fontSize:"12px"},value:S.metadata?.change}),C[10]=q,C[11]=S.metadata?.change,C[12]=c):c=C[12];let Q=c;e:{let e,t,l,r,s,n;if(H){let e;C[13]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)("div",{className:"size-full"}),C[13]=e):e=C[13],u=e;break e}if(z){if(!("collection"===S.type?S.collection:S.currency)){let e;C[14]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)("div",{className:"size-full"}),C[14]=e):e=C[14],u=e;break e}u=G;break e}C[15]===Symbol.for("react.memo_cache_sentinel")?(e={fontSize:"14px"},C[15]=e):e=C[15],C[16]!==S.name?(t=(0,a.jsx)(I.TextBody,{className:"min-w-0 truncate",style:e,weight:"semibold",children:S.name}),C[16]=S.name,C[17]=t):t=C[17],C[18]!==G||C[19]!==t?(l=(0,a.jsxs)(P.Flex,{className:"w-full items-center justify-center gap-2",children:[G,t]}),C[18]=G,C[19]=t,C[20]=l):l=C[20],C[21]===Symbol.for("react.memo_cache_sentinel")?(r={fontSize:"12px"},C[21]=r):r=C[21],C[22]!==U?(s=(0,a.jsx)(I.TextBody,{className:"font-mono",style:r,weight:"regular",children:U}),C[22]=U,C[23]=s):s=C[23];let i=D<80?null:Q;C[24]!==s||C[25]!==i||C[26]!==l?(n=(0,a.jsxs)(w.FlexColumn,{className:"relative z-[3] inline-flex max-w-full items-center justify-center gap-1 text-center",children:[l,s,i]}),C[24]=s,C[25]=i,C[26]=l,C[27]=n):n=C[27],u=n}let K=u;if(!(H||z)){let e,t,l,r,s,n,c=H?void 0:"px-2 py-1",u=q?"transition-[border-color] duration-300 ease-in-out":void 0;C[28]!==c||C[29]!==u?(e=(0,i.classNames)("relative box-border size-full items-center justify-center gap-0.5 overflow-hidden rounded-md text-white",c,u),C[28]=c,C[29]=u,C[30]=e):e=C[30];let d=q?`1px solid ${T??(V?o.DARK_THEME.blue3:o.LIGHT_THEME.blue3)}`:void 0;return C[31]!==d?(t={fontSize:"14px",border:d},C[31]=d,C[32]=t):t=C[32],C[33]!==q||C[34]!==S.metadata?.backgroundImage?(l=q?(0,a.jsx)(A.Image,{alt:"",className:"z-[1] object-cover object-center opacity-10",fill:!0,frameTime:1,src:S.metadata?.backgroundImage}):null,C[33]=q,C[34]=S.metadata?.backgroundImage,C[35]=l):l=C[35],C[36]!==S?(r=(0,a.jsx)(eA,{item:S}),C[36]=S,C[37]=r):r=C[37],C[38]!==K||C[39]!==r?(s=(0,a.jsx)(F.Tooltip,{attachToCursor:!0,content:r,hoverable:!0,children:K}),C[38]=K,C[39]=r,C[40]=s):s=C[40],C[41]!==t||C[42]!==l||C[43]!==s||C[44]!==e?(n=(0,a.jsxs)(w.FlexColumn,{className:e,style:t,children:[l,s]}),C[41]=t,C[42]=l,C[43]=s,C[44]=e,C[45]=n):n=C[45],n}C[46]!==S?(d=(0,a.jsx)(eA,{item:S}),C[46]=S,C[47]=d):d=C[47];let W=H?void 0:"px-2 py-1",Y=q?"transition-[border-color] duration-300 ease-in-out":void 0;C[48]!==W||C[49]!==Y?(m=(0,i.classNames)("relative box-border size-full items-center justify-center gap-0.5 overflow-hidden rounded-md text-white",W,Y),C[48]=W,C[49]=Y,C[50]=m):m=C[50];let X=q?`1px solid ${T??(V?o.DARK_THEME.blue3:o.LIGHT_THEME.blue3)}`:void 0;return C[51]!==X?(h={fontSize:"14px",border:X},C[51]=X,C[52]=h):h=C[52],C[53]!==q||C[54]!==S.metadata?.backgroundImage?(x=q?(0,a.jsx)(A.Image,{alt:"",className:"z-[1] object-cover object-center opacity-10",fill:!0,frameTime:1,src:S.metadata?.backgroundImage}):null,C[53]=q,C[54]=S.metadata?.backgroundImage,C[55]=x):x=C[55],C[56]!==K||C[57]!==h||C[58]!==x||C[59]!==m?(y=(0,a.jsxs)(w.FlexColumn,{className:m,style:h,children:[x,K]}),C[56]=K,C[57]=h,C[58]=x,C[59]=m,C[60]=y):y=C[60],C[61]!==y||C[62]!==d?(g=(0,a.jsx)(F.Tooltip,{attachToCursor:!0,content:d,hoverable:!0,children:y}),C[61]=y,C[62]=d,C[63]=g):g=C[63],g}var ew=e.i(581147);let eO=(0,R.graphql)(`
    fragment PortfolioTreeMapTileCollection on Collection {
      ...CollectionLockup
      chain {
        ...ChainBadge
      }
    }
  `,[D.CollectionLockupFragment,ey.ChainBadgeFragment]),eE=(0,R.graphql)(`
    fragment PortfolioTreeMapTileCurrency on CurrencyV2 {
      ...CurrencyV2Lockup
    }
  `,[ep.CurrencyV2LockupFragment]),eI=(0,R.graphql)(`
    query PortfolioValueTreeMapQuery(
      $addresses: [Address!]!
      $accountId: String
      $collectionFilter: ProfileCollectionsFilter
      $collectionLimit: Int!
      $currencyFilter: CurrenciesFilter
      $currencySort: CurrenciesSort
      $useTokenGrouping: Boolean!
    ) {
      userCollections(
        accountId: $accountId
        addresses: $addresses
        filter: $collectionFilter
        limit: $collectionLimit
      ) {
        items {
          id
          ownership {
            value {
              usd
            }
          }
          collection {
            id
            slug
            name
            imageUrl
            stats {
              oneHour {
                floorPriceChange
              }
              oneDay {
                floorPriceChange
              }
              sevenDays {
                floorPriceChange
              }
              thirtyDays {
                floorPriceChange
              }
            }
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
            bannerImageUrl
            featuredImageUrl
            chain {
              ...ChainBadge
            }
            ...CollectionLockup
            ...CollectionPreviewTooltipContent
            ...PortfolioTreeMapTileCollection
          }
        }
      }

      userCurrencyOwnershipsV2(
        accountId: $accountId
        addresses: $addresses
        filter: $currencyFilter
        sort: $currencySort
        limit: 25
        useTokenGrouping: $useTokenGrouping
      ) {
        items {
          __typename
          id
          usdValue
          ... on CurrencyBalanceV2 {
            asset {
              symbol
              imageUrl
              chainIdentifier
              contractAddress
              ...CurrencyPreviewTooltipContent
              ...PortfolioTreeMapTileCurrency
              ...CurrencyV2Lockup
              ...currencyV2Url
              metadata {
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
              stats {
                oneHour {
                  priceChange
                }
                oneDay {
                  priceChange
                }
                sevenDay {
                  priceChange
                }
                thirtyDay {
                  priceChange
                }
              }
            }
          }
          ... on TokenGroupBalanceV2 {
            asset {
              symbol
              imageUrl
              primaryCurrency {
                symbol
                imageUrl
                chainIdentifier
                contractAddress
                ...CurrencyPreviewTooltipContent
                ...PortfolioTreeMapTileCurrency
                ...CurrencyV2Lockup
                ...currencyV2Url
                metadata {
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
                stats {
                  oneHour {
                    priceChange
                  }
                  oneDay {
                    priceChange
                  }
                  sevenDay {
                    priceChange
                  }
                  thirtyDay {
                    priceChange
                  }
                }
              }
            }
          }
        }
      }
    }
  `,[D.CollectionLockupFragment,ec.CollectionPreviewTooltipContentFragment,eb.CurrencyPreviewTooltipContentFragment,eO,eE,ep.CurrencyV2LockupFragment,ey.ChainBadgeFragment,ew.currencyV2UrlFragment]);var eF=e.i(529783),eB=e.i(972513);let eV={ONE_DAY:"oneDay",ONE_HOUR:"oneHour",SEVEN_DAYS:"sevenDays",THIRTY_DAYS:"thirtyDays"},eM={ONE_DAY:"oneDay",ONE_HOUR:"oneHour",SEVEN_DAYS:"sevenDay",THIRTY_DAYS:"thirtyDay"};function eD(e){if(!e)return null;switch(e.__typename){case"ImageMedia":return e.imageUrl||null;case"VideoMedia":if(e.videoUrl?.startsWith("https://stream.mux.com")){let a=e.videoUrl.split("/")[3];return`https://image.mux.com/${a}/thumbnail.jpg?time=0`}return e.videoUrl||null;case"MuxVideoMedia":return e.muxPlaybackId?`https://image.mux.com/${e.muxPlaybackId}/thumbnail.jpg?time=0`:null;default:return null}}function eR(e){if(!e?.metadata?.hero)return;let a=eD(e.metadata.hero.mobileHeroMedia),t=eD(e.metadata.hero.desktopHeroMedia);return a||t||void 0}async function e$(e){if(e)try{let a=await (0,eF.extractProminentColors)(e);if(!a)return;return(0,eB.selectBestChartColor)(a)}catch(e){return}}async function eq(e,a=1500){if(e)return Promise.race([e$(e),new Promise(e=>setTimeout(()=>{e(void 0)},a))])}function eU(e,a){return(a.value||0)-(e.value||0)}function ez(e){if("collection"===e.type){let a=e.metadata?.slug||e.name;return`collection:${a}`}if("token"===e.type){let a=e.metadata?.chainIdentifier,t=e.metadata?.contractAddress,l=e.metadata?.symbol||e.name;return a&&t?`token:${a}:${t}`:`token:${l}`}return e.name}async function eH(e,a=1e3){let t={};return e.children&&0!==e.children.length&&await Promise.all(e.children.map(async e=>{let l;!(l=await eq(e.metadata?.backgroundImage,a))&&("collection"===e.type&&e.collection?.imageUrl?l=await eq(e.collection.imageUrl,a):"token"===e.type&&e.currency?.imageUrl&&(l=await eq(e.currency.imageUrl,a))),l&&(t[ez(e)]=l)})),t}let eG="relative h-full min-h-[420px] xl:min-h-0",eQ=(0,N.withSuspense)(()=>{let e=(0,p.useTranslations)("PortfolioValueTreeMap"),n=(0,r.useRouter)(),{resolvedTheme:m}=(0,s.useTheme)(),{chains:N}=(0,b.useChainsQueryParam)(),{timeframe:L,view:_,asset:k}=(0,B.usePortfolioValueContext)(),{getCurrencyUrl:A}=(0,C.useCurrencyUrl)(),{getProfileUrlWithIdentifier:P}=(0,T.useProfilePageUrl)(),w="branded"===_,O=(0,v.useTokenGroupingEnabled)(),E=(0,f.useProfileAccountId)(),I=(0,S.useProfileSelectedAddresses)(),F=(0,f.useProfileAddress)(),V=(0,f.useProfilePrimaryAccount)(),[{data:M,error:D,fetching:R}]=(0,l.useQuery)({query:eI,variables:{address:F,addresses:I,accountId:E,collectionFilter:{chain:1===N.length?N[0]:void 0},collectionLimit:50,currencyFilter:{chains:N.length>0?N:void 0},currencySort:{by:(0,j.getCurrencySortBy)(x.CurrencyStatsSortBy.USD_VALUE),direction:"DESC"},useTokenGrouping:O},pause:0===I.length}),$=function(e,a,l,r){let s,n=(0,t.c)(16),i=void 0===r?"all":r,o=(0,p.useTranslations)("PortfolioValueTreeMap");e:{let a,t,r;if(!e){let e,a,t;n[0]!==o?(e=o("rootNodeName"),n[0]=o,n[1]=e):e=n[1],n[2]===Symbol.for("react.memo_cache_sentinel")?(a=[],n[2]=a):a=n[2],n[3]!==e?(t={name:e,children:a},n[3]=e,n[4]=t):t=n[4],s=t;break e}if(n[5]!==i||n[6]!==e||30!==n[7]||n[8]!==o||n[9]!==l){let t=[];if(("all"===i||"nfts"===i)&&e.userCollections?.items){var c,u;let a,r=(c=e.userCollections.items,u=o("unknownCollection"),a=[],c.forEach(e=>{if(!e?.ownership?.value?.usd)return;let t=e.ownership.value.usd;if(t<=0)return;let r=e.collection;if(r){let e,s,n;a.push({name:r.name||r.slug||u,value:t,type:"collection",metadata:{imageUrl:r.imageUrl||void 0,change:r.stats?.[eV[l]]?.floorPriceChange||0,slug:r.slug,backgroundImage:(e=eD(r.hero?.mobileHeroMedia),s=eD(r.hero?.desktopHeroMedia),n=r.bannerImageUrl||r.featuredImageUrl||r.imageUrl,e||s||n||void 0)},collection:r})}}),a);t.push(...r)}if(("all"===i||"tokens"===i)&&e.userCurrencyOwnershipsV2?.items){let a=function(e,a,t){let l=[];for(let r of e){let e=null;"CurrencyBalanceV2"===r.__typename?e=function(e,a,t){if(!e.usdValue)return null;let l=Number.parseFloat(e.usdValue);if(l<=0)return null;let r=e.asset;return{name:r?.symbol||t,value:l,type:"token",metadata:{imageUrl:r?.imageUrl||void 0,change:r?.stats?.[eM[a]]?.priceChange||0,symbol:r?.symbol,backgroundImage:eR(r),chainIdentifier:r?.chainIdentifier,contractAddress:r?.contractAddress},currency:r??void 0}}(r,a,t):"TokenGroupBalanceV2"===r.__typename&&(e=function(e,a,t){if(!e.usdValue)return null;let l=Number.parseFloat(e.usdValue);if(l<=0)return null;let r=e.asset?.primaryCurrency,s=e.asset;return{name:r?.symbol||s?.symbol||t,value:l,type:"token",metadata:{imageUrl:r?.imageUrl||s?.imageUrl||void 0,change:r?.stats?.[eM[a]]?.priceChange||0,symbol:r?.symbol||s?.symbol,backgroundImage:eR(r),chainIdentifier:r?.chainIdentifier,contractAddress:r?.contractAddress},currency:r??void 0}}(r,a,t)),e&&l.push(e)}return l}(e.userCurrencyOwnershipsV2.items,l,o("unknownToken"));t.push(...a)}a=t.sort(eU).slice(0,30),n[5]=i,n[6]=e,n[7]=30,n[8]=o,n[9]=l,n[10]=a}else a=n[10];let d=a;n[11]!==o?(t=o("rootNodeName"),n[11]=o,n[12]=t):t=n[12],n[13]!==d||n[14]!==t?(r={name:t,children:d},n[13]=d,n[14]=t,n[15]=r):r=n[15],s=r}return s}(M,0,L??"ONE_DAY",k),q=(0,g.useMemo)(()=>($.children??[]).map(e=>ez(e)).sort((e,a)=>e<a?-1:+(e>a)).join("|"),[$.children]),U=(0,g.useMemo)(()=>({name:$.name,children:$.children}),[q]),[z,H]=(0,g.useState)({});(0,g.useEffect)(()=>{let e=!1;return async function(){if(!(w&&U.children&&U.children.length>0))return H(e=>Object.keys(e).length?{}:e);try{let a=await eH(U,500);!e&&((()=>{let e=Object.keys(z),t=Object.keys(a);if(e.length!==t.length)return!1;for(let e of t)if(z[e]!==a[e])return!1;return!0})()||H(a))}catch(a){e||H(e=>Object.keys(e).length?{}:e)}}(),()=>{e=!0}},[w,U,z]);let G=(0,g.useCallback)(e=>{if(e){if("token"===e.type&&e.currency){let a=A(e.currency);n.push(a);return}if("collection"===e.type&&e.metadata?.slug&&F){let a=P((V?.kind==="WALLET"?null:V?.username)??F,{collectionSlugs:e.metadata.slug});n.push(a)}}},[F,V,A,P,n]);if(R||!F)return(0,a.jsx)(eK,{});let Q=$.children&&$.children.length>0;return D&&!Q?(0,a.jsx)(d.FlexCenter,{className:(0,i.classNames)(eG,"w-full justify-center"),children:(0,a.jsx)(u.ErrorState,{size:"lg"})}):Q?(0,a.jsx)("div",{className:(0,i.classNames)(eG,"-mx-1.5"),children:(0,a.jsx)(h.TreeMap,{ariaLabel:e("ariaLabel"),borderRadius:6,className:"absolute size-full",data:$,getColor:e=>{let a="dark"===m;if(w){let t=z[ez(e)]||(a?o.DARK_THEME.blue3:o.LIGHT_THEME.blue3);return(0,y.default)(t).alpha(.3).css()}return function(e,a){var t;let l=a?o.DARK_THEME:o.LIGHT_THEME;if(null==e)return l.bgContrast1;let r=(t=Math.abs(e))<1?"neutral":t<10?"small":t<20?"medium":"large";if("neutral"===r)return l.bgContrast1;let s=e>0;return({small:s?l.success1:l.error1,medium:s?l.success2:l.error2,large:s?l.success3:l.error3})[r]}((e.metadata?.change??0)*100,a)},imageOnlyThreshold:100,interactiveTooltip:!0,labelThreshold:300,minDisplayThreshold:32,onNodeClick:G,padding:6,renderTileContent:(e,t)=>{let l=z[ez(e)];return(0,a.jsx)(eP,{brandedColor:l,context:t,node:e})},renderTooltip:({item:e})=>(0,a.jsx)(eA,{item:e}),showLabels:!1})}):(0,a.jsx)(d.FlexCenter,{className:eG,children:(0,a.jsx)(c.EmptyState,{className:"w-full",size:"lg",variant:"no-results"})})},{fallback:()=>(0,a.jsx)(eK,{}),errorFallback:()=>(0,a.jsx)(d.FlexCenter,{className:(0,i.classNames)(eG,"w-full justify-center"),children:(0,a.jsx)(u.ErrorState,{size:"lg"})})});function eK(){let e,l=(0,t.c)(1);return l[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsx)(n.Block,{className:(0,i.classNames)(eG,"grid"),children:(0,a.jsx)(m.SkeletonBlock,{className:"size-full rounded-lg"})}),l[0]=e):e=l[0],e}e.s(["PortfolioValueTreeMap",0,eQ,"PortfolioValueTreeMapSkeleton",()=>eK],881840)}]);

//# debugId=1a2ca970-43b9-f44f-be81-b49321b6fb40
//# sourceMappingURL=67c4de7d901eb1d5.js.map