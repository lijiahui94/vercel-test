<template>
  <a-spin :size="size" :spinning="busy" :wrapperClassName="className">
    <template #indicator>
      <span class="loader" ></span>
    </template>
    <slot></slot>
  </a-spin>
</template>

<script lang="ts" setup>
import { h, ref, defineProps } from 'vue';
// small default large

const props = defineProps({
  size: {
    type: String,
    default: 'default'
  },
  busy: {
    type: Boolean,
    default: false
  },
  white: {
    type: Boolean,
    default: false
  },
  className: {
    type: [Array, String],
    default: ''
  }
})

</script>
<

<style scoped lang="scss">
.loader {
  width: 32px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid #0000;
  border-right-color: #0052D9;
  position: relative;
  animation: l24 1s infinite linear;
  &.white {
    border-right-color: #fff;
  }
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: inherit;
  animation: inherit;
  animation-duration: 2s;
}
.loader:after {
  animation-duration: 4s;
}
@keyframes l24 {
  100% {transform: rotate(1turn)}
}
</style>