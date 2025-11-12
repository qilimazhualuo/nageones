<script setup lang="jsx">
import { ref } from 'vue'
import { loginApi, getScheduleApi } from './api'
import { storeToRefs } from 'pinia'
import { useDataStore } from './store'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const dataStore = useDataStore()
const { loginInfo, userInfo } = storeToRefs(dataStore)
console.log(userInfo.value)

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
        })
        .catch((err) => {
            message.error(err.message)
        })
}

const logout = () => {
    message.success('退出干什么！太突然了！多冒昧啊！')
}

const getSchedule = () => {
    const data = {
        config: {
            type: 'member_assess_manhour_desc',
            type: 'member_record_hours_desc',
            dimensions: [
                {
                    field: 'root',
                    order_by: {
                        name_pinyin: 'asc',
                    },
                },
            ],
            condition: {
                condition_groups: [
                    [
                        {
                            field_uuid: 'user',
                            operate: {
                                operate_id: 'include',
                                predicate: 'in',
                                negative: false,
                                label: 'filter.addQueryContent.include',
                                filter_query: 'in',
                            },
                            value: ['$currentUser'],
                        },
                    ],
                ],
            },
            display: ['remain_available_hours'],
            based_on: 'members_schedule_view',
            range: {
                from: time.value[0].format('YYYY-MM-DD'),
                to: time.value[1].format('YYYY-MM-DD'),
            },
            group: '',
            extension: {},
            task_condition: {
                condition_groups: [
                    [
                        {
                            field_uuid: 'field006',
                            operate: {
                                operate_id: 'include',
                                predicate: 'in',
                                negative: false,
                                label: 'filter.addQueryContent.include',
                                filter_query: 'in',
                            },
                            value: null,
                        },
                        {
                            field_uuid: 'field011',
                            operate: {
                                operate_id: 'include',
                                predicate: 'in',
                                negative: false,
                                label: 'filter.addQueryContent.include',
                                filter_query: 'in',
                            },
                            value: null,
                        },
                    ],
                ],
            },
        },
        taskFilterGQLConditions: [],
        users: [userInfo.value.uuid],
    }
    getScheduleApi(data).then((res) => {
        const { user, gantt } = res.data.buckets[0]
        const items = []
        gantt.forEach((cur) => {
            const { name, project } = cur
            const item = items.find((item) => item.name === project.name)
            if (item) {
                if (!item.content.find((i) => i === name)) {
                    item.content.push(name)
                }
                item.hour += cur.manhour.hours / 100000
            } else {
                items.push({
                    name: project.name,
                    content: [name],
                    hour: cur.manhour.hours / 100000,
                })
            }
        })
        dataSource.value = items
    })
}

const copySchedule = () => {
    // 格式整理为可以复制到excel的格式，按照columns的内容每行每列复制
    const header = columns.map((col) => col.title).join('\t')
    const rows = dataSource.value.map((item) => {
        const hour = item.hour / 8 // 按照customRender的逻辑，除以8
        const content =
            item.content && item.content.length > 0
                ? item.content.map((c, idx) => `${idx + 1}. ${c}`).join('\r\n') // 按照表格显示格式：序号 + 内容，使用\r\n在单元格内换行
                : ''
        // 如果内容包含换行符，需要用引号包裹整个单元格内容，避免Excel将其识别为行分隔符
        const contentCell = content.includes('\r\n') ? `"${content}"` : content
        return `${item.name}\t${contentCell}\t${hour}`
    })
    const text = [header, ...rows].join('\n')
    navigator.clipboard.writeText(text)
    message.success('复制成功')
}

const time = ref([dayjs().subtract(1, 'month').date(25), dayjs().date(24)])
const dataSource = ref([])
const columns = [
    {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '工作内容',
        dataIndex: 'content',
        key: 'content',
        customRender: ({ text }) => {
            return <div>
                {text.map((item, idx) => <div>
                    {idx + 1}. {item}
                </div>)}
            </div>
        },
    },
    {
        title: '项目时间',
        dataIndex: 'hour',
        key: 'hour',
        customRender: ({ text }) => {
            return text / 8
        },
    },
]
</script>

<template>
    <div class="ones">
        <a-space class="ones-header">
            <a-form :model="loginInfo" layout="inline" @finish="login">
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
            <a-tooltip v-if="userInfo.name">
                <template #title>
                    <span>退出登录</span>
                </template>
                <a-button danger @click="logout">{{ userInfo.name }}</a-button>
            </a-tooltip>
        </a-space>
        <a-space>
            <a-range-picker v-model:value="time" :allow-clear="false" />
            <a-button type="primary" @click="getSchedule">查询</a-button>
            <a-button type="primary" :disabled="!dataSource.length" @click="copySchedule">
                复制
            </a-button>
        </a-space>
        <a-table :columns="columns" :data-source="dataSource" :pagination="false" />
    </div>
</template>

<style lang="less">
.ones {
    padding: 4px;
    .ones-header {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        padding: 8px;
    }
}
</style>

