<template>
  <transition name="fade">
    <div :class="wrapperClasses" :style="wrapperStyles">
      <div></div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'LoadingBar',
  computed: {
    wrapperClasses() {
      return [];
    },
    wrapperStyles() {
      return {};
    },
  },
  data() {
    return {};
  },
};

</script>
