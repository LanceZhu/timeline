<template>
    <div class="wikis">
        <router-link v-for="wiki in wikis" :key="wiki" :to="`/timeline/${wiki.id}`">
            <el-card class="text item">{{ wiki.title }}</el-card>    
        </router-link>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            wikis: []
        }
    },
    created: function(){
        let _this = this;
        this.$axios.get('/_api/list?page=1&?pn=10').then(res => {
            _this.$data.wikis = res.data.data.currentPage;
        })
    }
}
</script>

<style scoped>
.wikis{
    width: 100%;
}
.box-card{
    width: 100%;
    margin-bottom: 20px;
}
.text {
font-size: 14px;
}
.item {
padding: 18px 0;
}
.el-pagination{
    margin-top: 20px;
}
</style>
