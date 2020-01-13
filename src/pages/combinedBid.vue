<template>
  <!-- 主页 -->
  <div class="itemBid">
     <navs></navs>
    <navigationBar @index_sericesArr="childValue"></navigationBar>
    <!-- 组合品发标 -->
    <div class="itemBid_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','发标','分类选择','组合品发标','填写信息']"></present>
      <div class="w1200">
        <p class="itemBid_title">组合品发标信息</p>
        <el-form style="margin-top:30px;" ref="form" :model="form" label-width="125px">
          <el-form-item label="是否公开竞拍价格">
            <el-radio-group v-model="form.publicity" @change="open_type">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="2">不公开</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拍卖方式" v-show="no_open">
            <el-radio-group v-model="form.type" @change="auction_type">
              <el-radio :label="1">荷兰式(价格从高到低)</el-radio>
              <el-radio :label="2">英式(价格从低到高)</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否允许联合竞标">
            <el-radio-group v-model="form.resource">
              <el-radio :label="1">允许</el-radio>
              <el-radio :label="2">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品一 -->
          <el-collapse v-for="(item,index) in newslist" :key="index" v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="item.title" :name="item.name">
              <el-form-item :label="item.label">
                <el-input placeholder="发标标题，比如：行书“九腾书屋”" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="起拍价">
                <el-input placeholder="例：￥8000.00"></el-input>
              </el-form-item>
              <el-form-item label="保底价" v-show="base">
                <el-input placeholder="例：￥6000.00"></el-input>
              </el-form-item>
              <el-form-item label="拍卖数量">
                <template>
                  <el-input-number
                    v-model="num"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                </template>
              </el-form-item>
              <el-form-item label="商品示例图">
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :limit="3"
                  :on-exceed="handleExceed2"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </el-form-item>
              <el-form-item label="附件">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip"></div>
                </el-upload>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <!-- 添加商品 -->
          <el-form-item>
            <el-button style="background:#1C70C5;color:#fff;border:0;margin-top: 20px;" @click="addGoods">
              <i style="padding:0 5px;" class="el-icon-plus"></i>添加商品
            </el-button>
          </el-form-item>
          <el-form-item label="总商品描述">
            <el-input placeholder="请描述你要拍卖的商品" type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <div v-show="nono">
            <el-form-item v-if="range==true" label="降价幅度">
              <p>￥200.00</p>
            </el-form-item>
            <el-form-item v-else label="升价幅度">
              <p>￥200.00</p>
            </el-form-item>
          </div>
          <el-form-item label="押金">
            <p>每笔交易平台将根据最终竞标价收取5%的押金</p>
          </el-form-item>
          <el-form-item label="地址">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="拍卖时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button style="background:#1C70C5;color:#fff;border:0;" @click="onSubmit">立即发布</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
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
import { regionData } from "element-china-area-data";
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
      activeNames: ["1"],
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
      ],
      newslist: [
        {title:"商品1",label:'商品一',name:'1'}
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: 1,
        resource: 1,
        desc: "",
        publicity: 1
      },
      num: 1,
      range: true,
      base: true,
      no_open: true,
      options: regionData,
      selectedOptions: [],
      dialogImageUrl: "",
      dialogVisible: false,
      nono: true
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 添加商品
    addGoods() {
        let that = this;
        this.newslist.push(
           {title:"商品"+(that.newslist.length+1),label:"商品"+(that.newslist.length+1),name:(that.newslist.length+1)}
        );
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleExceed2(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onSubmit() {
      console.log("submit!");
    },
    auction_type(label) {
      if (label == 2) {
        this.range = false; //幅度
        this.base = false; //保低
      } else {
        this.range = true;
        this.base = true;
      }
    },
    open_type(label) {
      console.log(label);
      if (label == 2) {
        this.range = false; //幅度
        this.base = false; //保低
        this.no_open = false; //不公开 不显示拍卖方式
        this.nono = false;
      } else {
        this.range = true; //幅度
        this.base = true; //保低
        this.no_open = true; //公开 显示拍卖方式
        this.nono = true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(value) {
      console.log(value);
    },
    to_itemBid() {
      this.$router.push({ path: "/itemBid" });
    }
  }
};
</script>
<style>
.el-collapse-item__header{
  color: #1C70C5 !important;
}
</style>

<style scoped>
.w1200 {
  max-width: 1200px;
  margin: auto;
  /* display: flex; */
  justify-content: space-between;
}
.el-collapse-item__header{
  color: #1C70C5 !important;
}
.el-form {
  max-width: 50%;
}
.el-col-2 {
  text-align: center;
}
.itemBid_title {
  color: #333333;
  font-size: 24px;
  padding: 30px 0;
  border-bottom: 1px solid #e3e3e3;
}
</style>



