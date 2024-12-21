<template>
  <Header />
  <div class="d-flex flex-column col">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </router-view>
  </div>
  <Footer class="mt-auto" />
</template>

<script lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@media (min-width: 1400px) {
  .container-xxl, .container-xl, .container-xl, .container-md, .container-sm, .container {
    max-width: 1200px;
  }
}


</style>