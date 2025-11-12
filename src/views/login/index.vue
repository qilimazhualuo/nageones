<script setup lang="jsx">
import { ref, getCurrentInstance } from 'vue'
import { loginApi, getScheduleApi } from '@/api'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/store/store'
import { message } from 'ant-design-vue'

const { proxy } = getCurrentInstance()

const dataStore = useDataStore()
const { loginInfo, userInfo } = storeToRefs(dataStore)

const { setToken, setUserInfo } = dataStore
const login = () => {
    loginApi(loginInfo.value)
        .then((res) => {
            console.log(res)
            const {
                user: { token, name, uuid },
            } = res
            setToken(token)
            setUserInfo({ name, uuid })
            message.success('登陆成功')
            proxy.$router.push({
                name: 'ones'
            })
        })
        .catch((err) => {
            message.error(err.message)
        })
}

const logout = () => {
    message.success('退出干什么！太突然了！多冒昧啊！')
}

</script>

<template>
    <div class="login">
        <div class="login-header" align="center">
            <a-typography-title :level="3">{{ $route.meta.title }}</a-typography-title>
            <a-tooltip v-if="userInfo.name">
                <template #title>
                    <span>退出登录</span>
                </template>
                <a-button danger @click="logout">{{ userInfo.name }}</a-button>
            </a-tooltip>
        </div>
        <div class="login-body">
            <a-form :model="loginInfo" @finish="login">
                <a-form-item name="baseUrl" label="ones地址">
                    <a-input v-model:value="loginInfo.baseUrl" placeholder="https://ones.woa.com:80"/>
                </a-form-item>
                <a-form-item name="email" label="邮箱">
                    <a-input v-model:value="loginInfo.email" />
                </a-form-item>
                <a-form-item name="password" label="密码">
                    <a-input v-model:value="loginInfo.password" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">登录</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<style lang="less">
.login {
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 100%;
    .login-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FFFFFF;
        border-radius: 4px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        padding: 8px;
        .ant-typography {
            margin-bottom: 0;
        }
    }
    .login-body {
        height: 2px;
        flex: 1 1 auto;
        background-color: #FFFFFF;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 8px;
    }
}
</style>