<template>
    <div class="block">
        范围
    <el-slider
      v-model="value"
      range
      show-stops
      @change="rangeChange"
      >
    </el-slider>
        步进值
    <el-slider
      v-model="step"
      show-stops
      :min="1"
      @change="stepChange"
      >
    </el-slider>
    <el-timeline>
        <div v-for="date in Math.floor((value[1]-value[0])/step)+1" :key="date">
            <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    {{ value[0] + (date-1) * step }}
                </el-card>
            </el-timeline-item>
        </div>
    </el-timeline>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: [0, 100],
            step: 1
        }
    },
    methods: {
        rangeChange: function(e){
        },
        stepChange: function(e){
        }
    }
}
</script>
