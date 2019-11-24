<template>
      <div class="date">
      <div>时间格式选择</div>
      <div class="date-format">
        <el-cascader
          v-model="dateValue"
          :options="dateOptions"
          @change="dateTypeChange"></el-cascader>
        <div v-if="dateType === 100">
          <el-date-picker
            v-model="date_100"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="dateType === 0">
          <el-input v-model="date_0"></el-input>年
        </div>
        <div v-if="dateType === 1">
          <el-input v-model="date_1[0]"></el-input>年
          <el-input v-model="date_1[1]"></el-input>月
        </div>
        <div v-if="dateType === 10">
          <el-input v-model="date_10[0]"></el-input>世纪
          <el-input v-model="date_10[1]"></el-input>年代
        </div>
        <div v-if="dateType === 11">
          <el-input v-model="date_11[0]"></el-input>世纪
          <el-input v-model="date_11[1]"></el-input>年代初
        </div>
        <div v-if="dateType === 12">
          <el-input v-model="date_12[0]"></el-input>世纪
          <el-input v-model="date_12[1]"></el-input>年代中
        </div>
        <div v-if="dateType === 13">
          <el-input v-model="date_13[0]"></el-input>世纪
          <el-input v-model="date_13[1]"></el-input>年代末
        </div>
        <div v-if="dateType === 20">
          <el-input v-model="date_20[0]"></el-input>年 - <el-input v-model="date_20[1]"></el-input>年
        </div>
        <div v-if="dateType === 30">
          公元前<el-input v-model="date_30"></el-input>年
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>