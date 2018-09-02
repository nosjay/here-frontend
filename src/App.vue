<template>
  <div id="h-app">
    <transition name="fade" mode="out-in">
      <router-view v-if="!loading"/>
    </transition>
  </div>
</template>

<script>
import { SET_SECURITY_MUTATION } from './services/store/modules/security/mutations';
import { SET_AUTHOR_MUTATION } from './services/store/modules/author/mutations';


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

        if (res.author === false) {
          this.$router.replace({
            name: 'installer',
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
          // commit author info
          this.$store.commit(SET_AUTHOR_MUTATION, {
            ...res.author,
          });
        }
      });
  },
};
</script>

<style lang="scss">
</style>
