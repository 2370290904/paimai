<template>
    <!-- 当前位置 -->
  <div class="present">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in titles" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "present",
  data() {
    return {};
  },
  props:{
      titles:Array
  }
};
</script>
<style scoped>
.present{
 background: #f4f4f4;
}
.el-breadcrumb {
  max-width: 1200px;
  margin: auto;
  height: 50px;
  line-height: 50px;
  color: #3a3a3a;
}
</style>

