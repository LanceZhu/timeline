<template>
    <el-container>
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
        <el-menu-item index="1" route="/index">首页</el-menu-item>
        <el-menu-item index="7" route="/helloworld">helloworld</el-menu-item>
        <el-menu-item index="5" route="/wikis">词条目录</el-menu-item>
        <el-menu-item index="2" route="/timeline">时间线</el-menu-item>
        <el-menu-item index="8" route="/timepoint">时间点</el-menu-item>
        <el-menu-item index="6" route="/wikiCreate">新建词条</el-menu-item>
        <el-menu-item>
            <el-input
                placeholder="请输入查询词条"
                v-model="input"
                clearable
                prefix-icon="el-icon-search"
                size="medium">
            </el-input>
        </el-menu-item>
        <el-menu-item index="4" route="/login">注册/登录</el-menu-item>
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
            input: ''
        }
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
