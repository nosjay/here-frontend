<template>
  <Steps :current="currentStep" :status="currentStatus">
    <Step title="Blog" desc="Title and more"></Step>
    <Step title="User" desc="Email, password and more"></Step>
    <Step title="Completed" desc="Go to the home page"></Step>
  </Steps>
</template>

<script>
export default {
  name: 'InstallerHeader',
  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
    currentStatus: {
      type: String,
      default: 'process',
    },
  },
};
</script>

<style scoped>

</style>
