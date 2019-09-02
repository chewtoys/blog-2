<template>
  <div class="login">
    <el-card class="login__box">
      <div slot="header" class="clearfix">
        <span>欢迎登录系统</span>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="loginForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const vailidateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const vailidatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ validator: vailidateName, trigger: "blur" }],
        password: [{ validator: vailidatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/");
        } else {
          alert("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  height: inherit;

  .login__box {
    background: #fff;
    border-radius: 5px;
    padding: 30px;
    min-width: 400px;
  }
  button {
    width: 100%;
  }
}
</style>
