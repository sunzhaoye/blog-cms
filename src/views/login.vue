<template>
    <div class="login" flex="main:center cross:center">
        <el-form :model="loginForm" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import crypto from 'crypto'
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
export default {
    name: 'login',
    data() {
        return {
            loginForm: {}
        }
    },
    methods: {
        handleLogin() {
            this.$ajax.post('/myblog/login', {
                'user_name': this.loginForm.userName,
                'password': aesEncrypt(this.loginForm.password, 'pwd')
            }).then(({ data }) => {
                if (data.resultCode === 0) {
                    if (data.resultCode === 0) {
                        this.$router.push('/')
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>
<style>
.login {
    height: 100%;
    background-color: #f5f7fa;
}

.el-form {
    width: 30%;
}
</style>