<template>
  <div class="my-counter">
    <button
      type="button"
      class="btn btn-light"
      @click="goods.goods_count > 1 && goods_count--"
      :disabled="goods.goods_count === 1"
    >
      -
    </button>
    <!-- 同理，单向数据流原则，不要直接绑定在goods.goods_count -->
    <input type="number" class="form-control inp" v-model="goods_count" />
    <button type="button" class="btn btn-light" @click="goods_count++">
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      goods_count: this.goods.goods_count,
    }
  },
  watch: {
    goods_count() {
      // 侦听数量改变小于1, 直接强制覆盖为1
      if (this.goods_count < 1) {
        this.goods_count = 1
      }
      this.$emit('changeGoodsCount', this.goods, this.goods_count)
    },
    /*  注意更新阶段是不会重新给data赋值的，只有在创建阶段goods的goods_count属性才
        会赋值给data中的goods_count，因此需要手动将data中的goods_count更新
    */
    goods() {
      this.goods_count = this.goods.goods_count
    },
  },
}
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 45px;
    text-align: center;
    margin: 0 10px;
  }
  .btn,
  .inp {
    transform: scale(0.9);
  }
}
</style>
