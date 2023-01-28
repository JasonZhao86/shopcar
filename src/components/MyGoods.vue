<template>
  <div class="my-goods-item">
    <div class="left">
      <div class="custom-control custom-checkbox">
        <!-- 单向数据流原则，不要直接绑定在goods.goods_state -->
        <input
          type="checkbox"
          class="custom-control-input"
          :id="goods.id"
          v-model="goods_state"
        />
        <!-- 解决循环的所有label的for都是input, input的id也都是input无法区分的问题，
        默认只有第一个生效，将商品里的id值分别给id和for使用即可区分 -->
        <label class="custom-control-label" :for="goods.id">
          <img :src="goods.goods_img" alt="" />
        </label>
      </div>
    </div>
    <div class="right">
      <div class="top">{{ goods.goods_name }}</div>
      <div class="bottom">
        <span class="price">¥ {{ goods.goods_price }}</span>
        <span>
          <MyCount
            :goods="goods"
            @changeGoodsCount="changeGoodsCount"
          ></MyCount>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import MyCount from '@/components/MyCount'
export default {
  components: {
    MyCount,
  },
  data() {
    return {
      goods_state: this.goods.goods_state,
    }
  },
  props: {
    goods: {
      type: Object,
      required: true,
    },
  },
  watch: {
    goods_state() {
      return this.$emit('changeGoodsState', this.goods, this.goods_state)
    },
    /*  注意更新阶段是不会重新给data赋值的，只有在创建阶段goods的goods_state属性才
        会赋值给data中的goods_state，因此需要手动将data中的goods_state更新
    */
    goods() {
      this.goods_state = this.goods.goods_state
    },
  },
  methods: {
    changeGoodsCount(goods, goods_count) {
      this.$emit('changeGoodsCount', goods, goods_count)
    },
  },
}
</script>

<style lang="less" scoped>
.my-goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 120px;
      height: 120px;
      margin-right: 8px;
      border-radius: 10px;
    }
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 14px;
      font-weight: 700;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>
