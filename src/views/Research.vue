<template>
  <div class="container-fluid px-0 d-flex flex-column position-relative">
    <div class="container-xl d-flex px-3 px-md-4 gap-md-4 gap-lg-5 my-5 py-0 py-md-5">
      <ul class='effect-boll'>
        <li v-for="item in Array(30).fill('')"></li>
      </ul>
      <div class="d-flex flex-column col align-items-center position-relative z-index-1 my-5 py-5">
        <!-- <h3 class="fw-bold mb-3 bg-primary br-2 color-white px-4 py-2 text-uppercase">Empowering</h3> -->
        <h2 class="fw-800 mb-3 text-center text-uppercase text-break mx-2">Empowering Medical Research through
          Decentralized Data and Funding</h2>
        <span class="h6 color-secondary mx-2 mx-md-0 text-center col-11 col-lg-10"> JunLaLa acts as a data provision
          platform, offering research institutions and scientists access to vital health and emotional data. Meanwhile,
          through tokenized funding support, JunLaLa enables innovative projects in preventive medicine and
          beyond.</span>
      </div>
    </div>
  </div>

  <div class="container-fluid px-0 mt-5 d-flex flex-column">

    <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
      <h2 class="fw-bold mb-4 pb-3 text-uppercase lh-2 text-center">Join JunLaLa Research Guilds</h2>
      <span class="d-flex flex-column h6 color-secondary mb-5 pb-3 text-center mx-auto col-12 col-md-10 col-lg-9">
        Welcome research institutions and scientists to join the JunLaLa Research Guilds. Apply for access to data and
        tokenized funding support. Currently open fields for collaboration in preventive medicine include.
        <span class="pt-4">Applicants are also encouraged to propose their own research topics.</span>
      </span>
      <div class="d-flex justify-content-center mt-4">
        <a href="https://forms.gle/FdTJ2mojcoHSpHsj6" target="_blank">
          <a-button type="primary" class="d-flex justify-content-center align-items-center br-4">
            Apply Now
            <iArrowRight class="ms-2" />
          </a-button>
        </a>
      </div>
    </div>

    <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 mb-md-5 pb-md-5">
      <ul class="d-flex flex-wrap">
        <li :class="`d-flex col-12 col-md-6`" v-for="(item, idx) in [
          { label: 'Depression', content: 'Prevention and early intervention of depression', svg: iMedical1 },
          { label: 'Insomnia', content: 'Objectively assess sleep quality, monitor interventions, link to daytime activities', svg: iMedical5 },
          { label: 'Hypertension', content: 'Study effects of exercise and stress on blood pressure; provide real-time feedback', svg: iMedical6 },
          { label: 'Heart Disease', content: 'Prevention and early intervention of heart disease', svg: iMedical2 },
          { label: 'Elderly Alerts', content: 'Prevention and alerts for sudden elderly illnesses (e.g., heart attacks and strokes)', svg: iMedical3 },
          { label: 'Chronic Diseases', content: 'Prevention of chronic diseases associated with long-term anxiety and stress', svg: iMedical4 },
          { label: 'Diabetes', content: 'Examine exercise and sedentary behavior impacts on glucose; offer personalized advice', svg: iMedical7 },
          { label: 'Sleep Apnea', content: 'Screen with smartwatches, study cardiovascular effects, develop non-invasive monitoring', svg: iMedical8 },
        ]">
          <span class="d-flex flex-column align-items-center align-items-md-start gap-3 bg-dilute br-4 p-4 m-2 col m-2">
            <span class="d-flex flex-wrap align-items-center justify-content-center gap-3">
              <component :is="item.svg" />
              <h4 :class="`fw-bold lh-3 col-12 col-md text-center text-md-start`">{{ item.label }}</h4>
            </span>
            <span :class="`h6 color-secondary mt-auto text-center text-md-start`">{{ item.content }}</span>
          </span>
        </li>
      </ul>
    </div>

    <div class="container-xl d-flex flex-column px-3 px-md-4 gap-md-4 my-5 justify-content-center">
      <h2 class="d-flex flex-column fw-bold mb-4 pb-3 text-uppercase lh-2 text-center">FIRST INITIATIVE: Defeating
        Depression</h2>
      <div class="d-flex flex-column fw-500 p-4 p-md-5 br-3 col bg-primary-vapors">
        <div class="d-flex gap-4">
          <iDoubleQuotes class="w-40 d-none d-md-block" />
          <span class="px-4 h3 fw-bold mt-3 text-uppercase1 color-secondary-dark text-break"><em
              class="d-inline d-md-none h1 fw-bolder pe-4">“</em>Monitor the effects of interventions</span>
        </div>
        <!-- <span class="h6 color-secondary">The first initiative within JunLaLa Research Guilds focuses on the prevention
          and early intervention of depression. Utilizing JunLaLa's comprehensive health and emotional data, this
          project aims to uncover new insights into early signs and preventative measures for depression.</span> -->
      </div>
      <div class="d-flex flex-wrap gap-4">
        <div class="d-flex flex-column gap-3 col-12 col-md-5 bg-primary-vapors p-4 br-3 h6 color-secondary">
          <span>JunLaLa Research Guilds' second research project focuses on Insomnia. This initiative aims to evaluate
            sleep quality using objective data, monitor the effects of interventions, and study the relationship between
            insomnia and daytime activities.</span>
          <span>By leveraging quantitative measurements provided by the JunLaLa AIWatch and conducting thorough
            analyses, this research seeks to better understand the impact of insomnia on individuals and develop
            effective strategies to improve sleep health.</span>
          <a href="https://forms.gle/FdTJ2mojcoHSpHsj6" target="_blank" class="mt-auto">
            <a-button type="primary" class="d-flex justify-content-center align-items-center br-4">
              Apply Now
              <iArrowRight class="ms-2" />
            </a-button>
          </a>
        </div>
        <div class="d-flex flex-column gap-3 col bg-primary-vapors p-4 br-3 h6 color-secondary">
          <span class="fs-3 fw-bold text-uppercase1 color-secondary-dark text-break">$SLEEP: DeSci meme for
            Combating Insomnia</span>
          <!-- <span>$SLEEP: DeSci meme for Combating Insomnia</span> -->
          <span>The DeSci meme token $SLEEP represents innovative research aimed at tackling insomnia, incubated by
            JunLaLa. By utilizing data from JunLaLa AIWatch, it identifies patterns, uncovers the root causes of
            insomnia, and develops personalized strategies to improve sleep quality. This initiative shifts healthcare's
            focus from treatment to prevention, empowering users to achieve restorative sleep and enhance their overall
            well-being.</span>
          <span>The $SLEEP token supports this transformative vision by incentivizing user participation and funding
            sleep-focused research. A portion of the tokens (15-20%) will be airdropped to JUNLALA AIWatch holders to
            encourage a strong, engaged community.</span>
        </div>
      </div>
    </div>

    <div
      class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-md-4 ai-empowering my-3 my-md-5 py-3 py-md-5">
      <div class="d-flex flex-column col col-md-7 order-12 order-md-1 pt-0 pb-3 py-md-5">
        <h2 class="fw-bold text-center mb-4 text-md-start text-uppercase">Supporting DeSci World and BIO Ecosystem</h2>
        <span class="mb-3 d-flex">
          <span class="h6 color-secondary">To support the development of the DeSci world, the health and emotional data
            collected by JunLaLa will be made available to BIO Ecosystem. Additionally, a portion of the tokens launched
            by the Research Guilds projects will be donated to BIO Ecosystem.</span>
        </span>
      </div>
      <div class="col order-1 order-md-12 me-0 me-md-4 me-lg-5"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import iDoubleQuotes from '../assets/view/explore/double-quotes.svg'
import iMedical1 from '../assets/view/research/medical-1.svg'
import iMedical2 from '../assets/view/research/medical-2.svg'
import iMedical3 from '../assets/view/research/medical-3.svg'
import iMedical4 from '../assets/view/research/medical-4.svg'
import iMedical5 from '../assets/view/research/medical-5.svg'
import iMedical6 from '../assets/view/research/medical-6.svg'
import iMedical7 from '../assets/view/research/medical-7.svg'
import iMedical8 from '../assets/view/research/medical-8.svg'
import {
  iArrowRight
} from '../components/icons.ts'
</script>

<style scoped lang="scss">
.ai-empowering {
  >div {
    &:last-child {
      background: url('../assets/view/home/ai-empowering-cover.png') no-repeat center center;
      background-size: contain;
      min-height: 300px;
    }
  }
}

.hight-light {
  >div {
    &:last-child {
      background: url('../assets/view/earn/cover.png') no-repeat center center / contain;
      min-height: 280px;
    }
  }
}

.future {
  >div {
    &:first-child {
      background: url('../assets/view/home/ai-future.png') no-repeat center center / contain;
      min-height: 300px;
    }
  }
}


ul.effect-boll {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 1;
  overflow: hidden;
  background: url('../assets/view/explore/bg-1.svg') no-repeat center center / cover,
    linear-gradient(45deg, #ffffff 0%, rgba(0, 82, 217, 0.25) 40%, #F3F8FF 100%);

  li {
    background-color: rgba(255, 255, 255, 0.4);
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;

    &:nth-child(1) {
      opacity: 0.95;
      left: 38vw;
      top: 83vh;
      animation: move-1 30.02s infinite;
      transform: translate(0, 0) scale(1.92);
    }

    &:nth-child(2) {
      opacity: 0.24;
      left: 28vw;
      top: 38vh;
      animation: move-2 30.04s infinite;
      transform: translate(0, 0) scale(1.67);
    }

    &:nth-child(3) {
      opacity: 0.75;
      left: 9vw;
      top: 76vh;
      animation: move-3 30.06s infinite;
      transform: translate(0, 0) scale(0.53);
    }

    &:nth-child(4) {
      opacity: 0.9;
      left: 83vw;
      top: 96vh;
      animation: move-4 30.08s infinite;
      transform: translate(0, 0) scale(0.06);
    }

    &:nth-child(5) {
      opacity: 0.5;
      left: 26vw;
      top: 45vh;
      animation: move-5 30.1s infinite;
      transform: translate(0, 0) scale(0.33);
    }

    &:nth-child(6) {
      opacity: 0.21;
      left: 44vw;
      top: 96vh;
      animation: move-6 30.12s infinite;
      transform: translate(0, 0) scale(2.01);
    }

    &:nth-child(7) {
      opacity: 0.98;
      left: 66vw;
      top: 100vh;
      animation: move-7 30.14s infinite;
      transform: translate(0, 0) scale(2.05);
    }

    &:nth-child(8) {
      opacity: 0.9;
      left: 2vw;
      top: 26vh;
      animation: move-8 30.16s infinite;
      transform: translate(0, 0) scale(0.19);
    }

    &:nth-child(9) {
      opacity: 0.9;
      left: 15vw;
      top: 55vh;
      animation: move-9 30.18s infinite;
      transform: translate(0, 0) scale(0.21);
    }

    &:nth-child(10) {
      opacity: 0.9;
      left: 64vw;
      top: 87vh;
      animation: move-10 30.2s infinite;
      transform: translate(0, 0) scale(0.33);
    }

    &:nth-child(11) {
      opacity: 0.36;
      left: 5vw;
      top: 82vh;
      animation: move-11 30.22s infinite;
      transform: translate(0, 0) scale(1.41);
    }

    &:nth-child(12) {
      opacity: 0.79;
      left: 30vw;
      top: 17vh;
      animation: move-12 30.24s infinite;
      transform: translate(0, 0) scale(1.02);
    }

    &:nth-child(13) {
      opacity: 0.55;
      left: 23vw;
      top: 47vh;
      animation: move-13 30.26s infinite;
      transform: translate(0, 0) scale(1.49);
    }

    &:nth-child(14) {
      opacity: 0.8;
      left: 18vw;
      top: 59vh;
      animation: move-14 30.28s infinite;
      transform: translate(0, 0) scale(1.48);
    }

    &:nth-child(15) {
      opacity: 0.3;
      left: 88vw;
      top: 68vh;
      animation: move-15 30.3s infinite;
      transform: translate(0, 0) scale(0.28);
    }

    &:nth-child(16) {
      opacity: 0.51;
      left: 14vw;
      top: 21vh;
      animation: move-16 30.32s infinite;
      transform: translate(0, 0) scale(2.02);
    }

    &:nth-child(17) {
      opacity: 0.46;
      left: 35vw;
      top: 10vh;
      animation: move-17 30.34s infinite;
      transform: translate(0, 0) scale(0.6);
    }

    &:nth-child(18) {
      opacity: 0.86;
      left: 93vw;
      top: 97vh;
      animation: move-18 30.36s infinite;
      transform: translate(0, 0) scale(0.73);
    }

    &:nth-child(19) {
      opacity: 0.27;
      left: 97vw;
      top: 94vh;
      animation: move-19 30.38s infinite;
      transform: translate(0, 0) scale(0.2);
    }

    &:nth-child(20) {
      opacity: 0.94;
      left: 38vw;
      top: 41vh;
      animation: move-20 30.4s infinite;
      transform: translate(0, 0) scale(0.42);
    }

    &:nth-child(21) {
      opacity: 0.96;
      left: 20vw;
      top: 45vh;
      animation: move-21 30.42s infinite;
      transform: translate(0, 0) scale(1.2);
    }

    &:nth-child(22) {
      opacity: 0.34;
      left: 5vw;
      top: 7vh;
      animation: move-22 30.44s infinite;
      transform: translate(0, 0) scale(0.6);
    }

    &:nth-child(23) {
      opacity: 0.85;
      left: 94vw;
      top: 47vh;
      animation: move-23 30.46s infinite;
      transform: translate(0, 0) scale(1.93);
    }

    &:nth-child(24) {
      opacity: 0.72;
      left: 94vw;
      top: 39vh;
      animation: move-24 30.48s infinite;
      transform: translate(0, 0) scale(0.29);
    }

    &:nth-child(25) {
      opacity: 0.73;
      left: 7vw;
      top: 23vh;
      animation: move-25 30.5s infinite;
      transform: translate(0, 0) scale(1.52);
    }

    &:nth-child(26) {
      opacity: 0.93;
      left: 70vw;
      top: 78vh;
      animation: move-26 30.52s infinite;
      transform: translate(0, 0) scale(0.9);
    }

    &:nth-child(27) {
      opacity: 0.02;
      left: 41vw;
      top: 21vh;
      animation: move-27 30.54s infinite;
      transform: translate(0, 0) scale(1.9);
    }

    &:nth-child(28) {
      opacity: 0.5;
      left: 100vw;
      top: 5vh;
      animation: move-28 30.56s infinite;
      transform: translate(0, 0) scale(1.14);
    }

    &:nth-child(29) {
      opacity: 0.02;
      left: 43vw;
      top: 70vh;
      animation: move-29 30.58s infinite;
      transform: translate(0, 0) scale(0.33);
    }

    &:nth-child(30) {
      opacity: 0.68;
      left: 94vw;
      top: 19vh;
      animation: move-30 30.6s infinite;
      transform: translate(0, 0) scale(0.93);
    }
  }
}

.credits {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 2px 15px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  z-index: 111;
}

.credits a {
  color: #fff;
  font-size: 11px;
  text-decoration: none;
  letter-spacing: 0.05em;
}

@keyframes move-1 {
  31% {
    transform: translate(-23vw, -24vh);
  }
}

@keyframes move-2 {
  54% {
    transform: translate(-53vw, -24vh);
  }
}

@keyframes move-3 {
  46% {
    transform: translate(-3vw, -3vh);
  }
}

@keyframes move-4 {
  52% {
    transform: translate(-92vw, -68vh);
  }
}

@keyframes move-5 {
  33% {
    transform: translate(-32vw, -46vh);
  }
}

@keyframes move-6 {
  37% {
    transform: translate(-64vw, -60vh);
  }
}

@keyframes move-7 {
  51% {
    transform: translate(-49vw, -61vh);
  }
}

@keyframes move-8 {
  59% {
    transform: translate(-14vw, -61vh);
  }
}

@keyframes move-9 {
  48% {
    transform: translate(-79vw, -17vh);
  }
}

@keyframes move-10 {
  42% {
    transform: translate(-50vw, -19vh);
  }
}

@keyframes move-11 {
  42% {
    transform: translate(-57vw, -19vh);
  }
}

@keyframes move-12 {
  46% {
    transform: translate(-97vw, -51vh);
  }
}

@keyframes move-13 {
  42% {
    transform: translate(-63vw, -36vh);
  }
}

@keyframes move-14 {
  42% {
    transform: translate(-15vw, -16vh);
  }
}

@keyframes move-15 {
  43% {
    transform: translate(-65vw, -97vh);
  }
}

@keyframes move-16 {
  42% {
    transform: translate(-55vw, -81vh);
  }
}

@keyframes move-17 {
  41% {
    transform: translate(-4vw, -12vh);
  }
}

@keyframes move-18 {
  40% {
    transform: translate(-97vw, -8vh);
  }
}

@keyframes move-19 {
  57% {
    transform: translate(-94vw, -84vh);
  }
}

@keyframes move-20 {
  55% {
    transform: translate(-37vw, -36vh);
  }
}

@keyframes move-21 {
  47% {
    transform: translate(-22vw, -17vh);
  }
}

@keyframes move-22 {
  48% {
    transform: translate(-1vw, -1vh);
  }
}

@keyframes move-23 {
  38% {
    transform: translate(-6vw, -18vh);
  }
}

@keyframes move-24 {
  43% {
    transform: translate(-34vw, -40vh);
  }
}

@keyframes move-25 {
  55% {
    transform: translate(-33vw, -87vh);
  }
}

@keyframes move-26 {
  45% {
    transform: translate(-91vw, -37vh);
  }
}

@keyframes move-27 {
  55% {
    transform: translate(-98vw, -40vh);
  }
}

@keyframes move-28 {
  43% {
    transform: translate(-4vw, -97vh);
  }
}

@keyframes move-29 {
  45% {
    transform: translate(-50vw, -43vh);
  }
}

@keyframes move-30 {
  32% {
    transform: translate(-66vw, -93vh);
  }
}
</style>