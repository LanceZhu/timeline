<template>
  <div class="footer">
    <div v-if="prevUpdated.show" class="prev">
      <router-link :to="prevUpdated.route" tag="li">
        <i class="el-icon-back"></i>
        {{prevUpdated.desc}}
      </router-link>
    </div>
    <div v-if="nextUpdated.show" class="next">
      <router-link :to="nextUpdated.route" tag="li">
        {{nextUpdated.desc}}
        <i class="el-icon-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prev: {
        desc: '前一页',
        show: true,
        route: '/timeline'
      },
      next: {
        desc: '后一页',
        show: true,
        route: '/timeline'
      }
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    prevUpdated () {
      const { filteredTimeline = [] } = this.$store.state
      const prevUpdated = {
        desc: '前一页',
        show: true,
        route: '/timeline'
      }

      // 获取当前时间点前后词条
      for (let i = (filteredTimeline.length - 1); i >= 0; i--) {
        if (filteredTimeline[i]._id === this.id) {
          if (i === 0) {
            prevUpdated.show = false
          }
          prevUpdated.desc = i > 0 ? filteredTimeline[i - 1].title : '已无时间点'
          prevUpdated.route = i > 0 ? `/timeline/${filteredTimeline[i - 1]._id}` : '/timeline'
          break
        }
      }
      return prevUpdated
    },
    nextUpdated () {
      const { filteredTimeline = [] } = this.$store.state
      const nextUpdated = {
        desc: '后一页',
        show: true,
        route: '/timeline'
      }

      // 获取当前时间点前后词条
      for (let i = (filteredTimeline.length - 1); i >= 0; i--) {
        if (filteredTimeline[i]._id === this.id) {
          if (i === (filteredTimeline.length - 1)) {
            nextUpdated.show = false
          }
          nextUpdated.desc = i < (filteredTimeline.length - 1) ? filteredTimeline[i + 1].title : '已无时间点'
          nextUpdated.route = i < (filteredTimeline.length - 1) ? `/timeline/${filteredTimeline[i + 1]._id}` : '/timeline'
          break
        }
      }
      return nextUpdated
    }
  }
}
</script>

<style scoped>
li {
  display: inline-block;
  cursor: pointer;
}

.footer {
  width: 90%;
  margin: 0 auto;
  color: rgb(49, 151, 230);
  height: 25px;
  margin-bottom: 15px;
}

.footer .prev {
  float: left;
}

.footer .next {
  float: right;
}
</style>
