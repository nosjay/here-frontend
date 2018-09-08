<template>
  <Steps :current="currentStep" :status="currentStatus">
    <Step title="Blog" desc="Title and more" bg-color="#f5f5f5"></Step>
    <Step title="User" desc="Email, password and more" bg-color="#f5f5f5"></Step>
    <Step title="Completed" desc="Go to the home page" bg-color="#f5f5f5"></Step>
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
