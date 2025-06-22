<template>
  <div class="body">
  <div class="inputdiv">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <div class="titlediv">乐动健康后台管理系统</div>
    <el-form-item label="账号" prop="username">
      <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input type="captcha" v-model="ruleForm.captcha" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-form-item v-html="this.svg"></el-form-item>
      <a href="#" @click="getsvg()">看不清，点击换一张</a>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>
  </template>
  <style scoped>
  .body{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('../assets/background.jpg');
    background-size: 100%;
    z-index: -1;
    display:flex;
    justify-content: center;
  }
  .demo-ruleForm{
    margin: 50px;
    width: 500px;
  }
  .inputdiv{
    margin: 50px;
    display:flex;
    justify-content: center;
  }
  .titlediv{
    margin-left: 100px;
    margin-bottom: 50px;
    font-size: 30px;
  }
  </style>
  <script>
    export default {
      data() {
        var validatePass_ = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('验证码不能为空'));
          } else {
                callback();
              }
        }
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('账号不能为空'));
          } else {
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('密码不能为空'));
          } else {
            callback();
          }
        };
        return {
          text:'',
          svg:'',
          ruleForm: {
            username: '',
            pwd: '',
            captcha:''
          },
          rules: {
            username: [
              { validator: validatePass, trigger: 'blur' }
            ],
            pwd: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            captcha:[
              { validator: validatePass_, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.ruleForm.captcha==this.text||this.ruleForm.captcha==this.text.toLocaleLowerCase()||this.ruleForm.captcha==this.text.toLocaleUpperCase()){
                this.postform(formName)
              }else{
                this.$message.error('error captcha!!')
                return false
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      },
      async postform(formName){
        try{
          const res=await this.$axios.post("/demotest", { test: this.ruleForm })
            if(res.status!==200){
                this.$message.error(res.data)
                this.getsvg()
                this.resetForm(formName)
            }else{
                localStorage["token"]=res.data.token
                localStorage["user"]=res.data.user
                this.$router.push('/home')
                this.$message({message:res.data.status,type:'success'})
                }
        }catch(err){
          console.log(err)
          this.$message.error(err)
        }
      },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        async getsvg(){
          try{
            const captcha=await this.$axios.get("/captcha")
            this.svg=captcha.data.data
            this.text=captcha.data.text
          }catch(err){
            console.log(err)
            this.$message.error(err)
          }
        }
      },
      mounted() {
        this.getsvg()
    }
    }
  </script>
  