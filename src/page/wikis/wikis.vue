<template>
    <div class="wikis">
        <router-link v-for="wiki in wikis" :key="wiki" :to="`/timeline/${wiki.id}`">
            <el-card class="text item">{{ wiki.title }}</el-card>    
        </router-link>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-count="pageCount"
            @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return {
            wikis: [],
            pageCount: 10
        }
    },
    created: function(){
        let _this = this;
        this.$axios.get('/_api/list?page=1&?pn=10').then(res => {
            _this.$data.wikis = res.data.data.currentPage;
            _this.$data.pageCount = res.data.data.totalPages;
        })
    },
    methods: {
        currentChange: function(e){
            console.log('currentChange: ', e);
            this.updatePage(e);
        },
        updatePage: function(page=1, pn=10){
            let _this = this;
            this.$axios.get(`/_api/list?page=${page}&?pn=${pn}`).then(res => {
                _this.$data.wikis = res.data.data.currentPage;
                _this.$data.pageCount = res.data.data.totalPages;
            })
        }
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
