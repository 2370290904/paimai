<template>
  <div class="login">
    <!-- <img class="login_ban" src="@/assets/login/login_banner.png" /> -->
    <div class="greet">
      <img style="width:115px" src="@/assets/logo.jpg" />
      <p>欢迎来到拍买拍卖网！</p>
    </div>
    <div class="login_con">
      <ul class="co_333 flex">
        <li>注册</li>
      </ul>
      <div class="input">
        <i class="el-icon-user"></i>
        <input v-model="mobile" placeholder="请输入您的手机号" />
      </div>
      <div class="input" style="position: relative;">
        <i class="el-icon-lock"></i>
        <input v-model="captcha" placeholder="请输入短信验证码" />
        <p
          class="getyzm"
          @click="register_code()"
          :style="codeTime=='获取验证码'?'color:#1C70C5':''"
        >{{codeTime}}</p>
      </div>
      <div class="input">
        <i class="el-icon-lock"></i>
        <input v-model="password" placeholder="请输入密码" />
      </div>
      <div class="input">
        <i class="el-icon-lock"></i>
        <input placeholder="确认密码" />
      </div>
      <div class="input">
        <i class="el-icon-lock"></i>
        <!-- <input v-model="type" placeholder="政府/个人/企业" /> -->
        <el-select v-model="type" :placeholder="toname" @change="alterZs">
          <el-option
            v-for="item in identity"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="input">
        <i class="el-icon-lock"></i>
        <input v-model="org" :placeholder="uName" />
      </div>
      <div class="flex fon14 co_94 justify-content to">
        <p @click="to_login">去登录></p>
      </div>
      <el-checkbox v-model="checked" style="color:#A9A9A9;">我已阅读并同意《用户注册协议》</el-checkbox>
      <button class="btn" @click="registerll">注册</button>
    </div>
    <bottoms2></bottoms2>
  </div>
</template>
<script>
import bottoms2 from "../components/bottoms2";
import qs from "qs";
export default {
  components: {
    bottoms2
  },
  data() {
    return {
      checked: false,
      identity: [
        {
          value: 1,
          label: "个人"
        },
        {
          value: 2,
          label: "企业"
        },
        {
          value: 3,
          label: "政府"
        },
       
       
      ],
      play: true,
      mobile: "",
      codeintval: null,
      password: "",
      type: "",
      org: "",
      captcha: "",
      codeTime: "获取验证码",
      toname:"请输入机构名称",
      uName:"请输入机构名称"
    };
  },
  methods: {
    // se_identity(value){
    //     console.log(value)
    //     this.type = value;
    // },
    to_login() {
      this.$router.push({ path: "/login" });
    },
    yzm() {
      this.play = false;
    },
    mm() {
      this.play = true;
    },
    // 验证码
    register_code() {
      if (this.codeTime == "获取验证码" && this.mobile != "") {
        this.$ajax
          .post(
            this.HOST + "/api/sms/send",
            qs.stringify({
              mobile: this.mobile,
              event: "register"
            })
          )
          .then(response => {
            if (response.data.code == 1) {
              this.$message({
                message: response.data.msg,
                offset: 100,
                duration: 2000,
                type: "success"
              });
              clearInterval(this.codeintval);
              let time = 60;
              this.codeintval = setInterval(() => {
                if (time > 0) {
                  this.codeTime = `${time--}秒后重试`;
                } else {
                  clearInterval(this.codeintval);
                  this.codeTime = "获取验证码";
                }
              }, 1000);
            } else {
              this.$message.error(response.data.msg);
            }
          })
          .catch((error, response) => {
            // console.log(error);
            this.$message.error(response.data.msg);
          });
      } else {
        this.$message({
          message: "请先输入手机号码",
          offset: 100,
          duration: 2000,
          type: "warning"
        });
      }
    },
    registerll() {
      if (this.checked != "" && this.checked == true) {
        this.$ajax
          .post(
            this.HOST + "/api/user/register",
            qs.stringify({
              mobile: this.mobile,
              password: this.password,
              captcha: this.captcha,
              org: this.org,
              type: this.type //政府、个人、企业
            })
          )
          .then(response => {
            if (response.data.code == 1) {
              this.$message({
                message: response.data.msg,
                offset: 100,
                duration: 2000,
                type: "success"
              });
              this.$router.push({ path: "/login" });
            } else {
              this.$message.error(response.data.msg);
            }
          })
          .catch((response, error) => {
            this.$message.error(response);
          });
      } else {
        this.$message({
          message: "请先勾选",
          type: "warning"
        });
      }
    },
    // 改变选择框时发生变化
    alterZs(i){
      console.log(i)
      if(i == 1){
        this.uName = '请输入个人姓名'
      }else if(i ==2){
        this.uName = '请输入公司名称'
      }else{
        this.uName = '请输入机构名称'
      }
    }
  }
};
</script>
<style scoped>
.el-input__inner{
  border: 0;
  height: 38px;line-height: 38px;
}
</style>
<style scoped>
.el-select{
  width: 93%;
}
.el-input__inner{
  border: 0 !important; 
  }
.greet {
  height: 65px;
  line-height: 65px;
  color: #ff666b;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  /* border:1px solid red; */
}
.getyzm {
  position: absolute;
  right: 10px;
  top: 0px;
  color: #1c70c5;
  font-size: 14px;
}
.wq {
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.wq img {
  width: 42px;
  height: 42px;
}
.another span:first-of-type,
.another span:last-of-type {
  width: 100px;
  height: 1px;
  display: inline-block;
  border-bottom: 1px solid #d9d9d9;
}
.another {
  color: #666;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login .login_ban {
  width: 100%;
  height: 100vh;
}
.input {
  margin-top: 30px;
}
.to {
  margin: 20px 0;
}
.to:hover {
  color: #1c70c5;
}
.input {
  color: #aaa;
  width: 333px;
  height: 43px;
  line-height: 43px;
  border: 1px solid #ccc;
  padding: 0 10px;
  box-sizing: border-box;
}
input {
  width: 90%;
  height: 50%;
  border: 0;
  border-left: 1px solid #cccccc;
  padding: 0 10px;
  box-sizing: border-box;
}
.login_con {
  width: 460px;
  padding: 40px 60px;
  box-sizing: border-box;
  box-shadow: -3px 20px 59px 0px rgba(220, 220, 220, 0.3);
  background: #fff;
  /* border: 1px solid red; */
  position: absolute;
  top: 47%; /*偏移*/
  transform: translate(230%, -50%);
}
.login_con ul {
  justify-content: space-around;
  font-size: 20px;
}
.login_con ul li:hover {
  color: #1c70c5;
}
.login {
  height: 100vh;
  background: url("../assets/login/login_banner.png");
  background-size: 100vw 100vh;
}
</style>