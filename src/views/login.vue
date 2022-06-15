<template>
  <div>
    <el-form :rules="rules"
             v-loading="loading"
             element-loading-text="登录中...."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             ref="loginForm"
             :model="loginForm"
             class="loginStyle">
      <h3 class="loginTitle">系统登录</h3>

      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>

      </el-form-item>

      <el-form-item prop="password">
        <el-input type="text" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item prop="captcha">
        <el-input type="text" v-model="loginForm.captcha" placeholder="点击图片切换验证码" style="width:250px; margin-right: 5px">

        </el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>


      <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>

      <el-button type="primary" style="width: 100%" @click="submitLogin">点击登录</el-button>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2022-2999 交通银行太平洋信用卡中心 All Rights Reserved.</span>
    </div>

  </div>
</template>

<script>
// import {postRequest} from "@/utils/api";


export default {
  name: "login",
  data() {
    return {
      captchaUrl: '/captcha?time='+new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        captcha:''
      },
      loading: false,
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger:
              'blur'}],
        password: [{required: true, message: '请输入密码', trigger:
              'blur'}],
        captcha: [{required: true, message: '请输入验证码', trigger:
              'blur'}]
      }

    }
  },
  methods:{
    updateCaptcha() {
      this.captchaUrl = '/captcha?time=' + new Date();
    },
    submitLogin(){
      this.$refs.loginForm.validate((valid) => {
        this.loading=true;
        if (valid) {
          this.loading = false;
          this.postRequest('/login',this.loginForm).then(resp =>{
           if(resp){
             //存储token
             const tokenStr = resp.obj.tokenHead+resp.obj.token;
             window.sessionStorage.setItem("tokenStr", tokenStr);
             this.$router.replace('/Home');
           }

          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


  }

}
</script>

<style>
.loginStyle{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin:0px auto 40px auto;
  text-align: center;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content{
  display: flex;
  align-items: center;
}
</style>