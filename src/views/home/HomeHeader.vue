<template>
  <div class="p-index__header" v-selection.disabled="">
    <figure class="p-index__header__logo">
      <img src="../../assets/logo.png" alt="logo">
    </figure>

    <div class="p-index__header__body">
      <p class="p-index__header__body__title">Simple Blog Title</p>
      <p class="p-index__header__body__desc">simple blog description</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixins/common';


// header styles
.p-index__header {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @include disabled-pointer-events;
}

.p-index__header__logo {
  margin: 0 10px;

  img {
    width: 32px;
    height: 32px;
    @include disabled-pointer-events;
  }
}

.p-index__header__body {

  @at-root
  .p-index__header__body__title,
  .p-index__header__body__desc {
    margin: 0;
  }

  .p-index__header__body__desc {
    font-size: 12px;
    color: #aaa;
  }
}

</style>
