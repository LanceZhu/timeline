<template>
    <div class="block">
    <div v-if="!timeline.length">timeline</div>
    <div v-else>
        范围
    <el-slider
      v-model="value"
      range
      show-stops
      :min="valueStart"
      :max="valueEnd"
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
        <div v-for="time in (valueEnd-valueStart)" :key="time">
            <el-timeline-item :timestamp="timeline[value[0] + time - 1].date_data" placement="top">
                <el-card>
                        <router-link :to="`/timepoint/${timeline[time].id}`" target="_blank">
                        {{ timeline[value[0] + time - 1].title }}
                        </router-link>
                        <i class="el-icon-view el-icon--right"></i>
                </el-card>
            </el-timeline-item>
        </div>
    </el-timeline>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: [1, 100],
            valueStart: 1,
            valueEnd: 1,
            step: 1,
            timeline: []
        }
    },
    created: function () {
        let _this = this;
        this.$axios.get(`/_api/show/${this.$route.params.id}}`).then(res => {
            _this.$data.timeline = res.data.data.timeline;
            _this.value[1] = this.timeline.length;
            _this.valueEnd = this.timeline.length;
        })
    },
    methods: {
        rangeChange: function(){
        },
        stepChange: function(){
        }
    }
}
</script>
