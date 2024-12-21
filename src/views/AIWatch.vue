<template>
    <div class="container-fluid px-0 d-flex flex-column">

      <div class="d-flex main-cover">
        <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-md-4 my-5 py-5 ai-watch-cover">
          <div class="d-flex flex-column gap-3 col col-md-6 order-md-12 order-1 pt-0 pb-5 py-md-5">
            <h2 class="fw-bold mb-2 text-uppercase text-center text-md-start">
              JUNLALA AI Watch ready white list
              <span class="d-inline-block align-items-center br-2 color-white bg-primary-linear py-1 px-2 h2 fw-bold px-4 mx-auto">pre-order</span>
            </h2>
            <div class="d-flex flex-column gap-1">
              <!-- <span class="h4 fw-bold color-primary text-center text-md-start">What you need to know about the pre-order:</span> -->
              <span class="fw-bold fs-4 color-secondary">What you need to know about the pre-order:</span>
              <ul class="h6 color-secondary text-center text-md-start">
                <li class="d-flex gap-2"><IListDot class="flex-shrink-0 d-flex" /><span>The total number of units available for pre-order is <em class="color-primary">2,000.</em></span></li>
                <li class="d-flex gap-2"><IListDot class="flex-shrink-0 d-flex" /><span>A whitelist is required to participate in this pre-order. The AI smartwatch will be shipped in <em class="color-primary">Q1 2025.</em></span></li>
                <li class="d-flex gap-2 "><IListDot class="flex-shrink-0 d-flex" /><span>Each smartwatch is priced at <em class="color-primary">250 USDT</em>, with a purchase limit of <em class="color-primary">10 units per</em> address.</span></li>
              </ul>
            </div>
            <div class="mint-wrap">
              <div class="mint-top">
                <span><em class="color-primary">0</em> Minted</span>
                <span><em class="color-primary">2000</em> Remaining</span>
              </div>
              <div class="mint-middle"> 
                <div class="number-box col-5">
                  <div class="subtract">-</div> 
                  <div class="value">1</div> 
                  <div class="add">+</div> 
                </div>   
                <template v-if="store.walletEvm.signedIn"> 
                  <a-button :disabled="true" type="primary" class="d-flex justify-content-center align-items-center fw-bold col-5">
                    Not Whitelist
                  </a-button>     
                </template>
                <template v-else> 
                  <a-button type="primary" class="d-flex justify-content-center align-items-center fw-bold col-5" @click="() => store.method.common.onConnect()" >
                    Connect
                  </a-button>   
                </template>
              </div>
              <div class="mint-bottom">
                <component :is="bscIcon"/>
                <span> You Available：<em class="color-primary">250 USDT</em></span>
               </div>
            </div>
            <!-- <Busy :busy="store.req.presale1uPaidBusy || store.view.aiwatch.payBusy">
              <div class="d-flex justify-content-center justify-content-md-start col-auto mt-4">
                <a-button :disabled="!store.walletEvm.signedIn || store.view.aiwatch.invite.presale1uPaid" type="primary" class="d-flex justify-content-center align-items-center br-4 fw-bold col-8"
                  @click.prevent="() => store.method.aiwatch.handlePayPresale1u() ">
                  {{ store.walletEvm.signedIn
                      ? store.view.aiwatch.invite.presale1uPaid
                          ? 'Pre-Ordered'
                          : 'JOIN NOW'
                      : 'No Wallet Connected'
                  }}
                </a-button>
              </div>
            </Busy>   -->
            <span class="d-flex flex-column align-items-center align-items-md-start gap-2 text-center text-md-start color-secondary p-3 br-2">
              The next DePlN device, “Blood Oxygen Monitor,” is in preparation.
              <span>👉 <a href="https://forms.gle/r2SeHaKFJ1FcEgUX7" class="text-decoration-underline" target="_blank">Click to view</a></span>
            </span>
            <span class="h6 fw-bold">
            </span>
          </div>
          <div class="d-flex col-8 col-md order-12 order-md-1 mx-auto">
          </div>
        </div>
      </div>

      <!-- <div class="container-xl d-flex flex-row flex-wrap px-3 px-md-4 pb-5 mt-md-5 py-md-5 gap-md-5">
        <div class="d-flex flex-column col pt-0 pb-4">
          <h2 class="d-flex flex-column gap-2 fw-bold text-center text-uppercase position-relative mb-4">Leaderboard</h2>
          <span class="mb-3 d-flex">
            <span class="h6 color-secondary">
              <span class="fw-bold color-primary">10 lucky addresses will win a JUNLALA smartwatch</span>, selected based on pre-sale participation and successful friend referrals. The draw is proportional to each participant’s score relative to the total scores of all users. Each participant starts with a score of 1 upon joining the pre-sale and earns an additional point for every friend they successfully invite to join.
            </span>
          </span>
          <Busy :busy="store.req.presale1uLeaderboardBusy">
          <div class="d-flex gap-4 bg-dilute p-4 my-2">
            <div class="d-flex flex-column gap-3 col">
              <span class="h6 color-secondary fw-bold">My Referral Link</span>
              <template v-if="store.view.aiwatch.invite.presale1uPaid">
                <span class="d-flex gap-3 col align-items-center border-primary br-2 px-3 py-2">
                  <span class="col h6 fw-500 color-primary">{{ store.view.aiwatch.invite.inviteCodeUrl }}</span>
                  <span id="copyInviteCode" class="p-2 br-4 hover-primary" @click="store.method.common.onCopy('#copyInviteCode')" :data-clipboard-text="store.view.aiwatch.invite.inviteCodeUrl"><iCopy /></span>
                </span>
              </template>
              <template v-else>
                <span class="d-flex gap-3 col align-items-center br-2 px-3 py-2 color-secondary">
                  Unlock your invite link by joining the pre-sale for just 1 USDT!
                </span>
              </template>
            </div>
            <div v-if="store.view.aiwatch.invite.presale1uPaid" class="d-flex flex-column gap-3 col-4">
              <span class="h6 ps-3 color-secondary fw-bold">Invited</span>
              <span class="h3 d-flex gap-3 col align-items-center px-3 py-2">
                <iUser />{{ store.view.aiwatch.invite.referral }}
              </span>
            </div>
          </div>
          </Busy>

          <dl class="container-xl d-flex flex-column px-3 px-md-4 mb-5 mt-3 pb-0 pb-md-5 tab">
            <dt class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="d-flex h4 fw-bold gap-3">
                <span class="px-3 px-md-5 py-2 py-md-3 color-secondary"
                  v-for="item in store.view.aiwatch.tab.list" :key="`tab-${item.id}`"
                  :class="{ 'curr': item.id === store.view.aiwatch.tab.curr }"
                  @click="() => store.method.aiwatch.handleTabLeaderboard(item.id)">
                  {{ item.label }}
                </span>
              </div>
            </dt>
            <dd class="pt-2">
              <div v-if="store.view.aiwatch.tab.curr === 0" class="d-flex flex-column">
                <div class="d-flex flex-column br-3 overflow-hidden ">
                  <div class="d-flex bg-dilute color-secondary fw-500 px-3 px-sm-4 px-md-5 py-4">
                    <span class="col">Address</span>
                    <span class="col-4 text-end">Date</span>
                  </div>
                  <Busy :busy="store.req.presale1uLeaderboardBusy">
                    <template v-if="store.view.aiwatch.leaderboard.list.length">
                      <ul class="d-flex flex-column bg-vapors">
                        <li class="d-flex px-3 px-sm-4 px-md-5 py-4"
                          :class="{ 'bg-vapors': !(idx % 2) }"
                          v-for="(item, idx) in store.view.aiwatch.leaderboard.last" :key="`id-${item.id}`">
                          <span class="col fw-500 color-primary"> 
                                {{ item.address }} 
                          </span>
                          <span class="col-4 color-secondary text-end">{{ new Date(item.createTs * 1000).toLocaleString() }}</span>
                        </li>
                      </ul>
                      <div class="d-flex my-5 justify-content-center">
                        <a-pagination v-model:current="store.view.aiwatch.leaderboard.pagination.current"
                          :total="store.view.aiwatch.leaderboard.pagination.total"
                          :defaultPageSize="store.view.aiwatch.leaderboard.pagination.size"
                          @change="() => store.req.presale1uLeaderboard()"
                          :showSizeChanger="false" size="small"/>
                      </div>
                    </template>
                    <div v-else class="bg-vapors d-flex p-5 justify-content-center">
                      <div class="d-flex flex-column align-items-center gap-3 m-5 p-5">
                        <iNoData />
                        <span class="color-secondary fw-500">No Data</span>
                      </div>
                    </div>
                  </Busy>
                </div>
              </div>
              <div v-if="store.view.aiwatch.tab.curr === 1" class="d-flex flex-column">
                <div class="d-flex flex-column br-3 overflow-hidden ">
                  <div class="d-flex bg-dilute color-secondary fw-500 px-3 px-sm-4 px-md-5 py-4">
                    <span class="col">Invite Code</span>
                    <span class="col-5 text-end">Score</span>
                  </div>
                  <Busy :busy="store.req.presale1uLeaderboardBusy">
                    <template v-if="store.view.aiwatch.leaderboard.list.length">
                      <ul class="d-flex flex-column bg-vapors">
                        <li class="d-flex px-3 px-sm-4 px-md-5 py-4"
                          :class="{ 'bg-vapors': !(idx % 2) }"
                          v-for="(item, idx) in store.view.aiwatch.leaderboard.last" :key="`id-${item.id}`">
                          <span class="col fw-500 color-primary"> 
                                {{ item.address }} 
                          </span>
                          <span class="col-5 color-secondary text-end">{{ item.score }}</span>
                        </li>
                      </ul>
                      <div class="d-flex my-5 justify-content-center">
                        <a-pagination v-model:current="store.view.aiwatch.leaderboard.pagination.current"
                          :total="store.view.aiwatch.leaderboard.pagination.total"
                          :defaultPageSize="store.view.aiwatch.leaderboard.pagination.size"
                          @change="() => store.req.presale1uLeaderboard()"
                          :showSizeChanger="false" size="small"/>
                      </div>
                    </template>
                    <div v-else class="bg-vapors d-flex p-5 justify-content-center">
                      <div class="d-flex flex-column align-items-center gap-3 m-5 p-5">
                        <iNoData />
                        <span class="color-secondary fw-500">No Data</span>
                      </div>
                    </div>
                  </Busy>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div> -->


      <div class="container-xl d-flex flex-row flex-wrap px-3 px-md-4 pb-5 mt-md-5 py-md-5 gap-md-5">
        <div class="d-flex flex-column col pt-0 pb-4">
          <h2 class="d-flex flex-column gap-2 fw-bold text-center text-uppercase position-relative mb-4">
            AIWatch: Decentralized Data for Medical Advancement
          </h2>
          <span class="color-secondary mb-4 text-center text-md-start h6">
              JunLaLa’s AI Watch is a game-changer for decentralized science (DeSci), enabling secure and real-time health data and emotional data collection while empowering users to contribute to groundbreaking research.
          </span>
          <span class="color-secondary mb-4 text-center text-md-start h6">
            JunLaLa AIWatch captures essential health metrics, including heart rate, blood oxygen levels, sleep patterns, and physical activity. Complementing this, the JunLaLa Emotion AI System identifies and collects users' emotional data by allowing them to upload selfies to the JunLaLa App via the AIWatch and smartphone. 
          </span>
          <span class="color-secondary mb-4 text-center text-md-start h6">
            Combined, these two data sets create a comprehensive dataset that is crucial for advancing preventive medicine research, providing valuable insights into the correlations between emotional and physical health.
          </span>
          <span class="color-secondary mb-4 text-center text-md-start h6">
            Beyond its scientific impact, AI Watch unlocks additional incentives, including exclusive token rewards and meme coin airdrops, redefining the synergy between AI and Decentralized Science.
          </span>
        </div>
      </div>

      <div class="container-xl d-flex flex-row flex-wrap px-3 px-md-4 pb-5 mt-md-5 py-md-5 gap-md-5">
        <div class="d-flex flex-column col-12 col-md-7 pt-0 pb-3 py-md-5">
          <h2 class="fw-bold mb-4 text-center text-md-start text-uppercase">Secure Data Collection and Privacy Protection</h2>
          <span class="mb-3 d-flex">
            <!-- <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span> -->
            <span class="h6 color-secondary">At  JunLaLa, we prioritize the security and privacy of user data. The advanced encryption protocols are employed to ensure that all emotional and health data is collected and transmitted securely. Users retain complete ownership of their data, and our privacy measures are designed to protect their identity and sensitive information while facilitating invaluable contributions to preventive medicine research.</span>
          </span>
          <!-- <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span class="h6 color-secondary">Users retain complete ownership of their data, and our privacy measures are designed to protect their identity and sensitive information while facilitating invaluable contributions to preventive medicine research.</span>
          </span> -->
        </div>
        <div class="col-8 col-sm-6 col-md order-1 order-md-12 mx-auto">
          <img src='../assets/view/ai-watch/secure-data-cover.png' class="w-full" />
        </div>
      </div>

      <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-md-4 ">
          <div class="col-8 col-sm-6 col-md-5 order-1 order-md-12">
            <img src='../assets/view/ai-watch/unique-cover.png' class="w-full" />
          </div>
          <div class="d-flex flex-column col col-md-6 pt-0 pb-5 order-12 order-md-1">
            <h2 class="fw-bold mb-4 text-center text-md-start text-uppercase">Exclusive Rewards for AIWatch Holders</h2>
            <span class="color-secondary mb-4 text-center text-md-start h6">
              AIWatch holders will share 20% of  JunLaLa  Research Guilds project tokens as part of our commitment to creating a fair and incentivized ecosystem.
            </span>
            <span class="mb-3 d-flex">
              <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
              <span class="h6 color-secondary">Before Activation: Start earning rewards by participating in daily emotion training exercises through the  JunLaLa app.</span>
            </span>
            <span class="mb-3 d-flex">
              <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
              <span class="h6 color-secondary">After Activation: Earn tokens based on your health data contributions.</span>
            </span>
            <!-- <div class="d-flex flex-wrap gap-2">
              <div v-for="(item, idx) in [
                { class: 'col-7', label: 'Superior Performance' },
                { class: 'col', label: 'Limited Supply' },
                { class: 'col-4', label: 'Durability' },
                { class: 'col', label: 'Additional Airdrop Rewards' },
              ]" :key="`unique-${idx}`" :class="`d-flex flex-direction-0 ${item.class}`">
                <span class="bg-primary color-white br-2 py-3 h6 fw-500 col text-center white-nowrap">{{ item.label }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
        <ul class="d-flex flex-wrap gap-3">
          <li :class="`d-flex col-12 col-md bg-dilute br-4 ${item.hover && 'bg-primary'}`" v-for="(item, idx) in [
            { label: 'Reliable Design', content: 'Built for reliability, AI Watch is designed to withstand extended use without performance degradation, ensuring consistent functionality for users.', svg: IWatch },
            // { label: 'Durability', content: 'Built for reliability, AI Watch is designed to withstand extended use without performance degradation, ensuring consistent functionality for users.', svg: IDurability },
            { label: 'Your Personal Health Concierge', hover: true, content: 'AI Watch enables real-time health data tracking, empowering users to contribute valuable insights to the medical industry and support advancements in healthcare research.', svg: IPerformance },
          ]">
            <span class="d-flex flex-column align-items-center align-items-md-start p-4 m-2 col">
              <component :is="item.svg" :class="`${item.hover ? 'color-white' : 'color-primary'}`" />
              <h3 :class="`fw-bold lh-3 py-4 ${item.hover && 'color-white'}`">{{ item.label }}</h3>
              <span :class="`h6 color-secondary mt-auto ${item.hover && 'opacity-70 color-white '}`">{{ item.content }}</span>
            </span>
          </li>
        </ul>
      </div>

      <div v-if="route.name === 'AIWatchOverview'" class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-md-4 ">
          <div class="d-flex flex-column col col-md-6 pt-0 pb-4">
            <h2 class="fw-bold mb-4 text-center text-md-start text-uppercase">Tokenomics</h2>
            <span class="color-secondary mb-4 text-center text-md-start h6">
              $LALA is used for governance within the platform. You can earn LALA through Mining, participate in in-app activities to receive LALA rewards, or acquire LALA through various operational activities.
            </span>
            <div class="d-flex flex-column mb-4 bg-primary-linear px-4 py-3 br-3 color-white">
              <h4 class="fw-500 pb-2">Total</h4>
              <span class="h2 fw-bold">{{ formatNumber('2000000000') }}</span>
            </div>
            <span class="mb-2 d-flex" v-for="(item, idx) in [
              '60% of the total amount is used for Mining.',
              'Computing nodes settle every hour.',
              'Mining rewards reduce every 90 days, with the entire token distribution cycle lasting four years.',
            ]">
              <span class="d-flex pt-1 pt-md-2 ps-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
              <span class="h6 color-secondary">{{ item }}</span>
            </span>
          </div>
          <div class="col-12 col-sm-8 col-md-5 position-relative">
            <img src="../assets/view/ai-watch/tokenomics-chart.png" class="w-full" />
            <span :class="`d-flex flex-column position-absolute pointer`" :style="item.style"
              v-for="(item, idx) in tokenomicsCharts"
              @mouseenter="() => handleOpenChartUnit(idx)"
              >
              <span class="d-flex mt-3 ms-3">
                <span class="d-flex w-52 align-items-center justify-content-center position-relative ">
                  <span :class="`d-flex avatar sm linker ${chartUnitIdx === idx ? 'bg-primary-dilute border-white border-w-4' : 'bg-white' }`"></span>
                  <span class="d-flex w-52 br-5 animate-pulse position-absolute" style="background: rgba(255, 255, 255, 0.2);"></span>
                </span>
              </span>
            </span>
            <span class="d-flex flex-column gap-2 br-3 p-3 bg-white shadow position-absolute" style="left: 0; bottom: 0; right: 12%; z-index: 100;">
              <span class="fw-500">{{ tokenomicsCharts[chartUnitIdx].name }} <em class="color-primary fw-bold">{{ tokenomicsCharts[chartUnitIdx].value }}</em></span>
              <template v-if="tokenomicsCharts[chartUnitIdx].content">
                <span class="color-secondary">{{ tokenomicsCharts[chartUnitIdx].content }}</span>
              </template>
            </span>
          </div>
        </div>
      </div>

      <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
        <h2 class="fw-bold mb-4 pb-3 text-uppercase lh-2 text-center">AI Smart Watch</h2>
        <span class="h6 color-secondary mb-5 pb-3 text-center mx-auto col-12 col-md-10 col-lg-9">
          1.82-inch oversized dial, 12% increase in area, visually square design, simple and neat. The square main body design provides a more stunning user experience, allowing individuality to be fully expressed on the wrist.
        </span>
        <ul class="d-flex justify-content-center flex-wrap gap-md-5 pb-3 pb-md-4 pb-lg-5 px-5">
          <li class="d-flex flex-column align-items-center col-6 col-md-auto pb-4" v-for="(item, idx) in [
            { label: '1.82 inches', value: 'Screen Size', sub: 'Hardware' },
            // { label: '1099.2 $LALA', value: 'Output / Day', sub: 'Mining' },
            // { label: '219.84 $LALA', value: 'Consume / Day', sub: 'Mining' },
            { label: '43.2 x 36.3 x 9.9 mm', value: 'Dimensions', sub:'Hardware' },
          ]" :key="`watch-attr-${idx}`">
            <h4 class="fw-bold color-primary mb-2 mb-md-3">{{ item.label }}</h4>
            <span class="d-flex flex-column h6 color-secondary text-center">
              <em class="fw-500">{{ item.value }}</em>
              <small>{{ item.sub }}</small>
            </span>
          </li>
          <!-- <div class="d-flex flex-column col col-md-7 pt-0 pb-4 py-md-5">
            <h2 class="fw-bold mb-5 text-center text-md-start">JUNLALA Emotion AI System Fully open to global users</h2>
            <div class="d-flex justify-content-center justify-content-md-start">
              <router-link to='/explore'>
                <a-button type="primary" class="d-flex justify-content-center align-items-center br-4">
                  Learn more<iArrowRight class="ms-2" />
                </a-button>
              </router-link>
            </div>
          </div> -->
        </ul>
        <div class="d-flex justify-content-center">
          <span class="col-10"><img src="../assets/view/ai-watch/ai-smart-watch-cover.png" class="w-full" /></span>
        </div>
      </div>

      <div class="d-flex flex-column mb-5 bg-primary-linear watch-strategic">
        <div>
          <div class="container-xl d-flex flex-wrap px-3 px-md-4">
            <div class="d-flex align-items-end col-8 col-sm-6 col-md-4 position-relative mx-auto order-1 order-md-12">
              <img src="../assets/view/ai-watch/strategic-cover.png" class="w-full cover" />
            </div>

            <div class="d-flex flex-column my-auto col-12 col-md-7 ms-auto pt-5 pb-4 py-md-5 order-12 order-md-1">
              <h2 class="fw-bold mb-4 text-center text-md-start text-uppercase color-white">Strategic Partnerships</h2>
              <span class="mb-2 d-flex opacity-70 col-12 col-sm-10 col-lg-12 mx-auto mx-md-0" v-for="(item, idx) in [
                'Partnered with Super Telecom Co., Ltd. (SHA: 603322).',
                'Partnered with soccer star Gabriel Jesus to promote AIGC development among the younger generation.',
              ]">
                <span class="d-flex pt-1 pt-md-2 ps-2 pe-3 pe-md-4"><em class="avatar w-6 bg-white d-inline-block col"></em></span>
                <span class="h6 color-white">{{ item }}</span>
              </span>
              <div class="d-flex flex-wrap justify-content-center justify-content-md-start mt-4 col">
                <div class="d-flex flex-column">
                  <a-button @click="() => store.view.aiwatch.openModalJunVideo = true" class="br-4">
                    <span class="color-primary fw-500">Play Video</span>
                  </a-button>
                  <small class="d-flex color-white opacity-70 mt-2">Warm Regards from Gabriel Jesus</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex pb-5"></div>

      <div class="container-xl d-flex flex-column px-3 px-md-4 ai-future mb-5">
        <!-- <h1 class="fw-bold mb-4 text-uppercase lh-2 text-center">The future</h1>
        <span class="h6 color-secondary mb-5 text-center mx-0 mx-md-5">
          In addition to innovative AI and Web3 technologies, we will also launch related supporting hardware to fully meet user needs and jointly open a new chapter in the digital society of emotional intelligence.
        </span> -->
        <div class="d-flex flex-column flex-md-row gap-md-4 ">
          <div class="d-flex flex-column col col-md-7 pt-0 pb-4 py-md-5">
            <h2 class="fw-bold mb-5 text-center text-md-start text-uppercase">JUNLALA Emotion AI System Fully open to global users</h2>
            <div class="d-flex justify-content-center justify-content-md-start">
              <router-link to='/ai-watch'>
                <a-button type="primary" class="d-flex justify-content-center align-items-center br-4">
                  Learn More<iArrowRight class="ms-2" />
                </a-button>
              </router-link>
            </div>
          </div>
          <div class="col"></div>
        </div>
      </div>

    </div>
    <ModalJunVideo v-model:open="store.view.aiwatch.openModalJunVideo" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { store } from '@/store'
import IDurability from '../assets/view/ai-watch/durability.svg'
import IPerformance from '../assets/view/ai-watch/performance.svg'
import IWatch from '../assets/view/ai-watch/watch.svg'
import IUSDT from '../assets/coin/usdt.svg'
import IListDot from '../assets/view/ai-watch/list-dot.svg'
import bscIcon from '../assets/view/ai-watch/bsc-icon.svg'
import {
  iArrowRight,
  iHappyActive,
  iCalmActive,
  iFearActive,
  iAngryActive,
  iCopy,
  iUser
} from '../components/icons.ts'
import { formatNumber, maskingAddress } from '@/utils';

const chartUnitIdx = ref<number>(0)
const route = useRoute();

const tokenomicsCharts = [
  { style: 'top: 30%; left: 10%;', name: 'Mining Rewards:', value: '60%', content: '20.58% unlocked in Q1 of Year 1, then reducing 20% each quarter' },
  { style: 'top: 10%; left: 37%;', name: 'Strategic Investors', value: '1%', content: '' },
  { style: 'top: -3%; left: 41%;', name: 'KOL Investors', value: '2%', content: '' },
  { style: 'top: -1%; left: 55%;', name: 'Institutional Investors', value: '12%', content: '' },
  { style: 'top: 16%; left: 76%;', name: 'Team & Advisors', value: '12%', content: '6-month cliff, then linearly vested over 48 monthe' },
  { style: 'top: 33%; right: 3%;', name: 'Liquidity', value: '5%', content: 'TGE 100%' },
  { style: 'top: 44%; right: 15%;', name: 'Marketing', value: '8%', content: 'TGE 50%, then linearly vested over 24 months' },
]

const handleOpenChartUnit = (idx: number) => {
  chartUnitIdx.value = idx
}
onMounted(() => {
  store.method.aiwatch.onInit()
  console.log('store', store);
})

</script>

<style scoped lang="scss">
.ai-watch-cover {
  > div:last-child {
    background: url('../assets/view/ai-watch/main-cover.png') no-repeat center center;
    min-height: 300px;
    background-size: cover;
  }
}

.main-cover {
  background: radial-gradient(23.89% 85.76% at 70.8% 47.17%, rgba(216, 200, 255, 0.62) 0%, #E5EDFB 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  .main-arrow {
    position: absolute;
    top: 0;
    right: 10%;
  }
}

.watch-strategic {
  > div {
    background: url('../assets/view/ai-watch/strategic-bg.png') no-repeat;
    background-size: cover;
  }
}

.ai-future {
  > div {
    > div {
      &:last-child {
        background: url('../assets/view/home/ai-future.png') no-repeat center center;
        background-size:contain;
        min-height: 300px;
      }
    }
  }
}

@media (min-width: 768px) {
  // .main-cover {
  //   .main-arrow {
  //     transform: rotate(180deg);
  //   }
  // }
  .watch-strategic {
    margin-top: 120px;

    > div {
      .cover {
        margin-top: -120px;
      }
    }
  }
}


.tab {
  dt {
    border-bottom: 2px solid #E6E6E6;

    >div {
      &:first-child {
        > span {
          border-bottom: 2px solid #E6E6E6;
          margin-bottom: -2px;
          cursor: pointer;
          transition: all 0.3s;

          &.curr, &:hover {
            color: #0052D9;
            border-color: #0052D9;
          }
        }
      }
    }
  }
}
.mint-wrap {
  height: 154px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px 16px 16px 16px;
  border: 1px solid rgba(1, 82, 215, 0.2);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .mint-top {
    display: flex;
    gap: 27px;
    color: #333333;
    font-weight: 600;
  }

  .mint-middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;

    .number-box {
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F2F8FF;
      border-radius: 8px;
      border: 1px solid #D5E2F6;

      .subtract {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex: 1;
        text-align: center;
        cursor: no-drop;
      }

      .value {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex: 1;
        text-align: center;
        border-left: 1px solid #D5E2F6;
        border-right: 1px solid #D5E2F6;
      }

      .add {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex: 1;
        text-align: center;
        cursor: no-drop;
      }
    }
  }

  .mint-bottom {
    font-weight: 600;
  }
}


</style>