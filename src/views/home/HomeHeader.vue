<template>
  <div class="p-index__header" v-selection.disabled="">
    <figure class="p-index__header__logo">
      <img src="../../assets/logo.png" alt="avatar">
    </figure>

    <Row>
      <Col :sm="{span: 20, offset: 2}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}">
        <div class="p-index__header__body">
          <p class="p-index__header__body__title">职业挖坑人</p>
          <p class="p-index__header__body__desc">
            simple blog description
            simple blog description
            simple blog description
            simple blog description
            simple blog description
          </p>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  computed: {
    avatar() {
      return '../../assets/logo.png';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixins/common';


// header styles
.p-index__header {
  height: 285px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include disabled-pointer-events;
}

.p-index__header__logo {
  margin: 0 10px;

  img {
    width: 98px;
    height: 98px;
    min-width: 98px;
    min-height: 98px;
    border-radius: 50%;
    @include box-shadow($spread-radius: 2px);

    cursor: pointer;
    pointer-events: all;

    /*&:hover {*/
      /*animation: swing 1s infinite;*/
    /*}*/
  }
}

.p-index__header__body {
  margin-top: 20px;
}

.p-index__header__body__title,
.p-index__header__body__desc {
  margin: 0;
  text-align: center;
}

.p-index__header__body__title {
  font-size: 20px;
  margin-bottom: 10px;
}

.p-index__header__body__desc {
  font-size: 14px;
  color: #aaa;
}

@keyframes swing {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(0);
  }
}

</style>
