<template>
    <el-container>
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
            <el-menu-item v-for="el in elMenu.length" :key="el" :index="el" :route="elMenu[el-1].route">{{ elMenu[el-1].name }}</el-menu-item>
            <el-menu-item>
                <el-input
                    placeholder="请输入查询词条"
                    v-model="input"
                    clearable
                    prefix-icon="el-icon-search"
                    size="medium">
                </el-input>
            </el-menu-item>
            <el-menu-item index="999" route="/login">注册/登录</el-menu-item>
        </el-menu>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
    <el-backtop></el-backtop>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            input: '',
            elMenu: [
                {
                    route: '/index',
                    name: '首页'
                },{
                    route: '/helloworld',
                    name: 'helloworld'
                },{
                    route: '/wikis',
                    name: '所有词条'
                },{
                    route: '/timeline',
                    name: '时间线'
                },{
                    route: '/timepoint',
                    name: '时间点'
                },{
                    route: '/wikiCreate',
                    name: '创建词条'
                }
            ]
        }
    },
    created: function () {
        this.$data.activeIndex = 1;
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.el-container{
    padding-top: 60px;
}
.el-header {
color: #333;
text-align: center;
height: 60px;
width: 100%;
min-width: 1000px;
position: fixed;
top: 0;
left: 0;
z-index: 9999;
}

.el-aside {
background-color: #D3DCE6;
color: #333;
text-align: center;
line-height: 200px;
}

.el-main {
color: #333;
text-align: center;
}
</style>
