<template>
  <div class="login">
    <!-- <img class="login_ban" src="@/assets/login/login_banner.png" /> -->
    <div class="greet">
      <img style="width:60px;height:50px;" src="@/assets/logo1.png" />
      <p>欢迎来到拍买拍卖网！</p>
    </div>
    <div class="login_con">
      <ul class="co_333 flex">
        <li :class="play==false ? 'co_1C70C5' : ''" @click="yzm">验证码登录</li>
        <li :class="play==true ? 'co_1C70C5' : ''" @click="mm">密码登录</li>
      </ul>
      <div v-if="play==true" class="input">
        <i class="el-icon-user"></i>
        <input v-model="account" placeholder="请输入您的账号" />
      </div>
      <!-- 验证码 -->
      <div v-else class="input">
        <i class="el-icon-user"></i>
        <input v-model="mobile" placeholder="请输入您的账号" />
      </div>
      <div v-if="play" class="input">
        <i class="el-icon-lock"></i>
        <input type="password" v-model="password" placeholder="密码" />
      </div>
      <!-- 验证码 -->
      <div v-else class="input" style="position: relative;">
        <i class="el-icon-lock"></i>
        <input v-model="captcha" placeholder="请输入短信验证码" />
        <p class="getyzm" :style="codeTime=='获取验证码'?'color:#1C70C5':''" @click="getyzm">{{codeTime}}</p>
      </div>
      <div class="flex fon14 co_94 justify-content to">
        <p @click="to_register">注册></p>
        <p @click="to_forget">忘记密码</p>
      </div>
      <!-- <el-checkbox v-if="play==true" v-model="checked" style="color:#A9A9A9;">我已阅读并同意《用户注册协议》</el-checkbox> -->
      <!-- <el-checkbox v-else v-model="checked2" style="color:#A9A9A9;">我已阅读并同意《用户注册协议》</el-checkbox> -->
      <button v-if="play==true" class="btn" @click="login">登录</button>
      <button v-else class="btn" @click="yzmLogin">验证码登录</button>
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
      checked2: false,
      play: true,
      account: "",
      mobile: "",
      password: "",
      captcha: "",
      codeintval: null,
      codeTime: "获取验证码"
    };
  },
  methods: {
    to_register() {
      this.$router.push({ path: "/register" });
    },
    to_forget() {
      this.$router.push({ path: "/forget" });
    },
    yzm() {
      this.play = false;
    },
    mm() {
      this.play = true;
    },
    yzmLogin() {
        this.$ajax
          .post(
            this.HOST + "/api/user/mobilelogin",
            qs.stringify({
              mobile: this.mobile,
              captcha: this.captcha
            })
          )
          .then(response => {
            if (response.data.code == 1) {
              var user_id = response.data.data.userinfo.user_id;
              var token = response.data.data.userinfo.token;

              localStorage.setItem("user_id", user_id);
              localStorage.setItem("token", token);
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
    getyzm() {
      if (this.codeTime == "获取验证码") {
        this.$ajax
          .post(
            this.HOST + "/api/sms/send",
            qs.stringify({
              mobile: this.mobile,
              event: "mobilelogin"
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
          .catch((response, error) => {
            this.$message.error(response);
          });
      }
    },
    login() {
     
        this.$ajax
          .post(
            this.HOST + "/api/user/login",
            qs.stringify({
              account: this.account,
              password: this.password
            })
          )
          .then(response => {
            if (response.data.code == 1) {
              var user_id = response.data.data.userinfo.user_id;
              var token = response.data.data.userinfo.token;
              var avatar = response.data.data.userinfo.avatar;

              localStorage.setItem("user_id", user_id);
              localStorage.setItem("token", token);
              localStorage.setItem("avatar", avatar);
          console.log(token)
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
      
    }
  }
};
</script>
<style scoped>
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
.login {
  background: url("../assets/login/login_banner.png");
  background-size: 100vw 100vh;
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
.input:first-of-type {
  margin: 30px 0;
}
.to {
  margin: 30px 0;
}
.to p:hover {
  color: #1c70c5;
}
.input {
  color: #aaa;
  width: 333px;
  height: 40px;
  line-height: 40px;
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
  position: absolute;
  top: 50%;
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
}
</style>