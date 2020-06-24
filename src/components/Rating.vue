<template>
  <div>
    <div class="score-range" v-if="filterMode">
      <span style="padding: 5px; font-style: 14px; color: gray">选择范围：{{ scoreRange[0] }} - {{ scoreRange[1] }}</span>
      <el-slider
        v-model="scoreRange"
        :step="step"
        :marks="marks"
        range
        :min="1"
        :max="5">
      </el-slider>
    </div>
    <div v-else class="score">
      <el-popover
        placement="top-start"
        width="200"
        trigger="hover"
        >
          <span style="font-size: 13px; color: gray">参与评分：</span>
          <vue-rating-it
            :score="score"
            :disabled="disabled"
            @rating="rate => score = rate"
            size="15px"
            color="#f1d546">
          </vue-rating-it>
        <div slot="reference">
          <vue-rating-it
            :score="scoreMean"
            disabled
            size="18px">
          </vue-rating-it>
          <span class="score-mean">
            {{ scoreMean === 0 ? '暂无评分' : `综合评分：${scoreMean}` }}
            <i class="el-icon-question"></i>
          </span>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import VueRatingIt from 'vue-rating-it'

const MIN_SCORE = 1
const MAX_SCORE = 5
const NO_SCORE = 0

export default {
  data () {
    return {
      // 评分筛选
      scoreRange: [MIN_SCORE, MAX_SCORE],
      step: 1,
      marks: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
      },
      // 个人评分
      disabled: false,
      score: NO_SCORE,
      // 综合评分
      scoreMean: NO_SCORE
    }
  },
  props: {
    filterMode: {
      type: Boolean,
      default: false
    },
    timepointID: {
      type: String
    }
  },
  component: {
    VueRatingIt
  },
  async created () {
    // await this.getRating(this.timepointID)
    // await this.canRate(timepointID)
  },
  methods: {
    async getRating (timepointID) {
      const res = await this.$axios.get(`/api/score/checkScore/${timepointID}`)
      if (res.data.code !== 100) {
        this.$message.error('获取评分失败！')
        return NO_SCORE
      }
      return res.data.data.score
    },
    async rate (timepointID) {
      const res = await this.$axios.get(`/api/score/giveScore/${timepointID}`)
      if (res.data.code !== 100) {
        this.$message.error('评分失败！')
      } else {
        this.$message({
          type: 'success',
          message: '评分成功！'
        })
        console.log(res.data.data.result)
      }
    },
    async canRate (timepointID) {
      const res = await this.$axios.get(`/api/score/checkCanScore/${timepointID}`)
      if (res.data.code !== 100) {
        return false
      }
      return res.data.data.can
    },
    getFilter () {
      return this.scoreRange
    }
  }
}
</script>

<style scoped>
.score-range {
  max-width: 200px;
}
.score {
  margin-top: 10px;
}
.score-mean {
  font-size: 13px;
  color: gray;
}
</style>

<style>
.score-range .el-slider__runway, .score-range .el-slider__bar {
  height: 3px;
}
.score-range .el-slider__button {
  width: 8px;
  height: 8px;
}
.score-range .el-slider__stop {
  width: 3px;
  height: 3px;
}
.score-range .el-slider__runway {
  margin: 8px 0;
}
.score-range .el-slider__marks-text {
  font-size: 10px;
  margin-top: 10px;
}
</style>
