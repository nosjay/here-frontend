<template>
  <div id="h-app">
    <transition name="fade" mode="out-in">
      <router-view v-if="!loading"/>
    </transition>
  </div>
</template>

<script>
import { SET_SECURITY_MUTATION } from './services/store/modules/security/mutations';


export default {
  name: 'Here',
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.$Provider.init()
      .then((res) => {
        this.$store.commit(SET_SECURITY_MUTATION, {
          publicKey: res.security.rsa,
          requestMask: res.security.mask,
        });

        if (res.install === true) {
          this.$router.replace({
            name: 'installer-first',
          }, () => {
            // show page when redirect success
            this.loading = false;
          }, () => {
            // show page when redirect abort
            this.loading = false;
          });
        } else {
          // directly show homepage
          this.loading = false;
        }
      });
  },
};
</script>

<style lang="scss">
</style>
