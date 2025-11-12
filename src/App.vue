<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import ones from '@/views/ones/index.vue'
import { RouterView } from 'vue-router'
</script>

<template>
    <a-config-provider :locale="{ locale: zhCN }">
        <div class="content">
            <RouterView />
        </div>
    </a-config-provider>
</template>

<style scoped>
.content {
    height: 2px;
    flex: 1 1 auto;
}
</style>
