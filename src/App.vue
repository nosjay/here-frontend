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
    const hideLoading = () => {
      this.loading = false;
    };

    this.$Provider.init()
      .then((getter) => {
        // encryption key and request mask value
        this.$store.commit(SET_SECURITY_MUTATION, {
          publicKey: getter.get('security.key'),
          requestMask: getter.get('security.mask'),
        });

        // check author registered
        if (!getter.get('author')) {
          // @TODO cannot get route-name from router and query will lost, because using lazy-load
          this.$router.replace({ name: 'installer', query: this.$route.query }, hideLoading, hideLoading);
        } else {
          hideLoading();
          this.$store.commit(SET_AUTHOR_MUTATION, {
            ...getter.get('author'),
          });
        }
      }, (error) => {
        this.$Message.error(error);
      });
  },
};
</script>

<style lang="scss">
</style>
