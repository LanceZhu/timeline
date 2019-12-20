// 添加、编辑、删除新词条后更新时间线
export default async function () {
  try {
    const res = await this.$axios.get('/api/timepoint/list')
    if (res.data.code === 100) {
      let timeline = res.data.data
      timeline = timeline.map(time => {
        if (typeof time.show === 'object') {
          const { show } = time.show
          if (show) {
            time.show = time.show.show
          } else {
            time.show = time.show.date
          }
        }
        return time
      })
      this.$store.commit('updateTimeline', timeline)
    }
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}
