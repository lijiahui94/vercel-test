<template>
  <div class="container-fluid px-0 d-flex flex-column position-relative">
    <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 involved-cover gap-md-4 my-5 py-5">
      <div class="d-flex flex-column align-items-center col pt-0 pb-5 my-0 my-md-5 py-md-5 pe-0 pe-md-5">
        <h2 class="fw-bold mb-4 text-uppercase text-center">
          Get Involved with JunLaLa Empower Preventive Medicine
        </h2>
        <span class="d-flex flex-column h6 color-secondary mb-5 text-center">
          Join  JunLaLa in transforming the future of preventive medicine. Whether you're contributing data, guiding research direction, supporting research projects financially, leading scientific studies, or training Emotion AI, your participation is vital. Explore the various ways you can be part of this innovative journey
        </span>
      </div>
    </div>
  </div>

  <div class="container-fluid px-0 d-flex flex-column">

    <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
      <ul class="d-flex flex-wrap">
        <li :class="`d-flex col-12 ${item.class}`" v-for="(item, idx) in [
          { class: 'col-md-6 col-lg-4', label: 'Data Contributors', content: 'As AI Watch holders, participate in the collection of valuable health and emotional data, contributing directly to pioneering research in preventive medicine.', svg: iIcon1 },
          { class: 'col-md-6 col-lg-4', label: 'Governance Participants', content: 'As AI Watch holders, they take an active role in evaluating and voting on new research proposal applications, influencing the direction of innovative medical studies.', svg: iIcon2 },
          { class: 'col-md-6 col-lg-4', label: 'Research Project Supporters', content: 'Support groundbreaking research projects by holding the relevant tokens and donating, helping to drive scientific advancement.', svg: iIcon3 },
          { class: 'col-md-6', label: 'Researchers', content: `Join Research Guilds, the network of institutions and scientists dedicated to exploring new frontiers in preventive medicine, utilizing  JunLaLa's data and funding resources.`, svg: iIcon4 },
          { class: 'col-md-6', label: 'Emotion AI Trainers', content: 'Engage in training  JunLaLa AI to improve recognition of human emotions and sentiments, enhancing our research capabilities.', svg: iIcon5 },
        ]">
          <span :class="`d-flex flex-column align-items-center align-items-md-start p-4 m-3 bg-dilute br-4`">
            <component :is="item.svg" :class="` 'color-primary'}`" />
            <h3 :class="`fw-bold lh-3 py-4`">{{ item.label }}</h3>
            <span :class="`h6 color-secondary `">{{ item.content }}</span>
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import iDoubleQuotes from '../assets/view/explore/double-quotes.svg'
import iIcon1 from '../assets/view/involved/icon-1.svg'
import iIcon2 from '../assets/view/involved/icon-2.svg'
import iIcon3 from '../assets/view/involved/icon-3.svg'
import iIcon4 from '../assets/view/involved/icon-4.svg'
import iIcon5 from '../assets/view/involved/icon-5.svg'
</script>

<style scoped lang="scss">
.involved-cover {
  background: url('../assets/view/involved/cover-bg.png') no-repeat center center;
  background-size: cover;
}
</style>