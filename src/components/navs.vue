<template>
<!-- navs -->
    <div class="header">
      <div class="header_con">
        <p class="index_label">欢迎来到拍买拍卖网！</p>
        <p class="index_inform">
          <a href="javascript:;" @click="tovip" style="text-decoration:none;">{{member.notice}} {{member.count}}</a> 
          <!-- <a href="javascript:;" style="text-decoration:none;"></a> -->
        </p>
      </div>
    </div>
</template>
<script>
export default {
  name: "navs",
  data() {
    return {
      member:{
        notice:'会员通知',
        count:'(0)'
      }

    };
  },
  methods:{
    tovip(){
      this.$router.push({ path:"/personalCenter"})
    }
  }
};
</script>
<style scoped>
.header {
  height: 30px;
  line-height: 30px;
  background: #f7f7f7;
  /* position: fixed;
  top: 0;
  left:0;
  right: 0;
  z-index: 100; */
}
.header .header_con{
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
}
.header_con .city_location,.index_inform {
    color: #1C70C5;
}
.header_con .index_label{
    flex:1;
    padding-left: 35px;
    color: #F83E3E;
}
</style>