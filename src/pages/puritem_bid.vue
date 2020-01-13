<template>
  <!-- 主页 -->
  <div class="itemBid">
    <navs></navs>
    <navigationBar></navigationBar>
    <!--发标-求报价-单独发标 -->
    <!-- 单品发标 -->
    <div class="itemBid_con">
      <!-- 当前页面位置 -->
      <present :titles="['拍卖','发标','分类选择','单品发标','填写信息']"></present>
      <div class="w1200">
        <p v-if="index==0" class="itemBid_title">求报价</p>
        <p v-else class="itemBid_title">求商品详情</p>
        <div style="border-bottom: 1px solid #e3e3e3;padding: 20px 0;">
          <!-- 是否联合发标 -->
          <div v-if="index==0" class="flex align-items co_333" style="margin-bottom:20px;">
            <p style="padding-right: 40px;">是否允许联合发标</p>
            <el-radio v-model="is_unite" label="1" @change="se_radio">是</el-radio>
            <el-radio v-model="is_unite" label="0" @change="se_radio">否</el-radio>
          </div>
          <!-- 联合人数 -->
          <div class="flex align-items co_333" v-show="show_p">
            <p>联合人数：</p>
            <el-select v-model="value" placeholder="请选择联合人数" @change="uniteP">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <p style="margin-left:40px">寻找联合发标人：</p>
            <el-input style="width:250px;" v-model="goodsname" placeholder="输入想要采购的商品名称"></el-input>
            <el-button style="background:#1C70C5;color:#fff;margin-left:15px;" @click="to_unite">查找</el-button>
          </div>
          <!-- 联合人数  end-->
        </div>

        <el-form style="margin-top:20px;" label-width="125px">
          <el-form-item label="标题">
            <el-input v-model="title" placeholder="一句话概括您要采购什么？比如：苹果笔记本"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="请描述商品..." type="textarea" v-model="desc"></el-input>
          </el-form-item>
          <el-form-item label="分类选择">
            <el-cascader
              style="width:100%;"
              :options="typeData"
              v-model="type_se"
              :props="{label: 'name', value: 'id'}"
              @change="typeChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品示例图">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :limit="3"
              :on-exceed="handleExceed"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="imageChange"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <span>只能上传jpg/png文件</span>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" />
            </el-dialog>
            <!--  -->
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-exceed="handleExceed2"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemove2"
              :on-change="imageChange2"
              multiple
              :limit="3"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="总预算">
            <el-input placeholder="例：￥6000.00" v-model="budget"></el-input>
          </el-form-item>
          <el-form-item label="采购数量">
            <template>
              <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </template>
          </el-form-item>
          <el-form-item label="押金">
            <p class="co_333">每笔交易平台将根据最终竞标价收取5%的押金</p>
          </el-form-item>
          <el-form-item v-if="index==0" label="是否允许联合竞标">
            <!-- <el-radio label="允许"></el-radio>
            <el-radio label="不允许"></el-radio>-->
            <el-radio v-model="is_bid_unite" label="1" @change="se_radio2">允许</el-radio>
            <el-radio v-model="is_bid_unite" label="0" @change="se_radio2">不允许</el-radio>
          </el-form-item>
          <el-form-item label="地址">
            <el-cascader
              style="width:100%"
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="开标/截止时间：">
            <el-col :span="11">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间"
                @change="date1"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                @change="date2"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button style="background:#1C70C5;color:#fff;border:0;" @click="quote">立即发布</el-button>
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
import qs from "qs";
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
      index: this.$route.query.index, //0：求报价，1：求商品详情
      fileList: [],
      typeData: [],
      type_se: "",
      show_p: false,
      input: "",
      value1: "",
      value2: "",
      options2: [
        {
          value: 2,
          label: "2"
        },
        {
          value: 3,
          label: "3"
        },
        {
          value: 4,
          label: "4"
        },
        {
          value: 5,
          label: "5"
        }
      ],
      value: "",
      options: regionData,
      selectedOptions: [],
      dialogImageUrl: "",
      dialogVisible: false,
      // 参数
      category_id: "",
      title: "",
      desc: "",
      budget: "",
      num: 1,
      is_unite: "0",
      imageList: "",
      fuList: "",
      province: "",
      city: "",
      district: "",
      starttime: "",
      endtime: "",
      goodsname: "",
      unite_people_num: "",
      is_bid_unite: "0"
    };
  },
  created() {
    this.getType();
  },
  methods: {
    uniteP(value) {
      this.unite_people_num = value;
      console.log(this.unite_people_num, "联合人数");
    },
    date1(val) {
      this.starttime = val;
      console.log(this.starttime);
    },
    date2(val) {
      this.endtime = val;
      console.log(this.endtime);
    },
    imageChange(file, fileList) {
      let imageList = [];
      fileList.forEach(item => {
        if (item.response) {
          imageList.push(item.response.data.url);
        }
      });
      // 圖片列表 this.imageList
      this.imageList = imageList.join();
    },
    imageChange2(file, fileList) {
      let fuList = [];
      fileList.forEach(item => {
        if (item.response) {
          fuList.push(item.response.data.url);
        }
      });
      // 附件列表 this.fuList
      this.fuList = fuList.join();
    },
    //分类选择
    typeChange(value) {
      // 取数组最后一个元素
      this.category_id = value[value.length - 1];
      sessionStorage.setItem("cate_id", this.category_id);
      console.log(this.category_id);
    },
    //获取分类
    getType() {
      this.$ajax
        .post(this.HOST + "/api/index/index", qs.stringify({}), {
          headers: { token: localStorage.getItem("token") }
        })
        .then(response => {
          this.typeData = response.data.data;
          console.log(this.typeData);
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    // 省市区
    handleChange(value) {
      this.province = value[0];
      this.city = value[1];
      this.district = value[2];
    },
    to_unite() {
      if (this.goodsname != "") {
        this.$router.push({
          path: "/uniteList?goodsname=" + this.goodsname
        });
      } else {
        this.$message({
          message: "请先填写",
          offset: 100,
          duration: 2000,
          type: "warning"
        });
      }
    },
    //发布求报价
    quote() {
      this.$ajax
        .post(
          this.HOST + "/api/index/quote",
          qs.stringify({
            category_id: this.category_id,
            title: this.title,
            desc: this.desc,
            images: this.imageList,
            files: this.fuList,
            budget: this.budget,
            num: this.num,
            province: this.province,
            city: this.city,
            district: this.district,
            type: this.index, //0:求报价 1:求商品
            starttime: this.starttime,
            endtime: this.endtime,
            is_unite: this.is_unite,
            unite_people_num: this.unite_people_num,
            is_bid_unite: this.is_bid_unite
          }),
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(response => {
          if (response.data.code == 1) {
            this.$message({
              message: response.data.msg,
              offset: 100,
              duration: 2000,
              type: "success"
            });
            this.$router.push({ path: "/index" });
          } else {
            this.$message.error(response.data.msg);
          }
        })
        .catch((response, error) => {
          this.$message.error(response);
        });
    },
    handleRemove(file, fileList) {
      console.log("执行了删除方法");
      console.log(file, fileList);
    },
    handleRemove2(file, fileList) {
      console.log("执行了删除方法");
      console.log(file, fileList);
    },
    se_radio(val) {
      this.is_unite = val;
      console.log(this.is_unite);
      if (this.is_unite == 1) {
        this.show_p = true;
      } else {
        this.show_p = false;
        this.unite_people_num = "";
      }
    },
    se_radio2(val) {
      this.is_bid_unite = val;
      console.log(this.is_bid_unite);
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.w1200 {
  max-width: 1200px;
  margin: auto;
  /* display: flex; */
  justify-content: space-between;
}
.el-form {
  max-width: 50%;
}
.el-col-2 {
  text-align: center;
}
.itemBid_title {
  color: #f83e3e;
  font-size: 24px;
  padding: 20px 0;
}
</style>