<template>
  <div>
    <MyHeader title="购物车案例"></MyHeader>
    <div class="main">
      <MyGoods
        v-for="item in list"
        :key="item.id"
        :goods="item"
        @changeGoodsState="changeGoodsState"
        @changeGoodsCount="changeGoodsCount"
      />
    </div>
    <MyFooter :list="list" @toggleGoodsState="toggleGoodsState"></MyFooter>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyGoods from '@/components/MyGoods'
import MyFooter from '@/components/MyFooter'

export default {
  components: {
    MyHeader,
    MyGoods,
    MyFooter,
  },
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.$axios({
      url: '/api/cart',
    }).then((res) => {
      this.list = res.data.list
    })
  },
  methods: {
    changeGoodsState(goods, goods_state) {
      let index = this.list.findIndex((item) => item.id === goods.id)
      // 使用Vue提供的$set修改数组的元素，确保修改操作能够被Vue感知
      this.$set(this.list, index, { ...goods, goods_state })
    },
    changeGoodsCount(goods, goods_count) {
      let index = this.list.findIndex((item) => item.id === goods.id)
      // 使用Vue提供的$set修改数组的元素，确保修改操作能够被Vue感知
      this.$set(this.list, index, { ...goods, goods_count })
    },
    toggleGoodsState(val) {
      // 直接替换整个数组，能够被Vue感知
      this.list = this.list.map((item) => ({ ...item, goods_state: val }))
    },
  },
}
</script>

<style scoped>
.main {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
