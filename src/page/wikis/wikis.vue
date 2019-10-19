<template>
    <div class="wikis">
        <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <el-card class="box-card">
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
</template>

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
</style>
