<template>
  <header>
    <figure class="h-blog-logo">
      <img src="../../assets/logo.png" alt="logo">
    </figure>

    <div class="h-blog-description">
      <span class="h-blog-title">Simple Blog Title</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
};
</script>

<style lang="scss" scoped>

.h-blog-logo {
  margin: 0;
  display: inline-block;

  img {
    width: 60px;
  }
}

.h-blog-description {
  display: inline-block;
  line-height: 60px;
}

</style>
