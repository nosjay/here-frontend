<template>
  <Layout>
    <Header height="285px">
      <Row align="middle">
        <Col :sm="{span: 24}" :md="{ span: 16, offset: 4 }" :lg="{ span: 16, offset: 4 }">
          <HomeHeader></HomeHeader>
        </Col>
      </Row>
    </Header>
    <Main>
      <Row>
        <Col :sm="{span: 24}" :md="{ span: 16, offset: 4 }" :lg="{ span: 12, offset: 6 }">
          <router-view/>
        </Col>
      </Row>
    </Main>
    <Footer><HomeFooter></HomeFooter></Footer>
  </Layout>
</template>

<script>
import HomeAside from './HomeAside.vue';
import HomeHeader from './HomeHeader.vue';
import HomeFooter from './HomeFooter.vue';


export default {
  name: 'HomeLayout',
  components: { HomeAside, HomeHeader, HomeFooter },
};
</script>

<style scoped>

</style>
