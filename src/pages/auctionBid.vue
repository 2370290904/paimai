<template>
  <!-- 主页 -->
  <div class="auctionBid">
    <navs></navs>
    <navigationBar></navigationBar>
    <!-- 拍卖-种类选择 -->
    <div class="auctionBid_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','发标','分类选择','发标种类选择']"></present>
      <div class="w1200">
        <div class="auctionBid_btn">
          <button @click="to_itembid(0)">单品发标</button>
          <button @click="to_itembid(1)">组合品发标</button>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <bottoms></bottoms>
  </div>
</template>
<script>
import present from "../components/present";
import bottoms from "../components/bottoms";
import navs from "../components/navs";
import navigationBar from "../components/navigationBar";
export default {
  name: "news",
  components: {
    bottoms,
    present,
     navigationBar,
    navs
  },
  data() {
    return {
      index: this.$route.query.index
    };
  },
  created() {
    console.log(this.index,"index");
  },
  methods: {
    to_itembid(index) {
      this.$router.push({ path: "/itembid?index="+index });
    },
    to_combinedBid() {
      this.$router.push({ path: "/combinedBid" });
    }
  }
};
</script>

<style scoped>
/* .auctionBid_con {
} */
.w1200 {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding: 100px 0;
}
.auctionBid_btn {
  width: 100%;
  border-top: 1px solid #e3e3e3;
  display: flex;
  justify-content: space-between;
  padding: 135px 220px;
}
.auctionBid_btn button {
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  border: 0;
}
.auctionBid_btn button:first-of-type {
  background: #1c70c5;
}
.auctionBid_btn button:last-of-type {
  background: #f83e3e;
}
</style>



