<template>
<div>
  <div class="title">
    {{title}}
    <router-link :to="'/timepoint/edit/'+id">
      <i class="el-icon-edit"></i>
    </router-link>
    <!--
    <router-link>
      <i class="el-icon-chat-line-round"></i>
    </router-link>
    -->
  <el-divider></el-divider>
  </div>
  <div v-html="content" class="content">
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      title: '',
      id: ''
    }
  },
  created () {
    this.updateContent()
  },
  watch: {
    $route (to, from) {
      console.log(to, from)
      this.updateContent()
    }
  },
  methods: {
    updateContent () {
      const that = this
      this.$axios.get(`/api/show/${this.$route.params.id}`).then(res => {
        that.content = res.data.data.post.content
        that.title = res.data.data.post.title
        that.id = res.data.data.post.id
      })
    }
  }
}
</script>

<style scoped>
.title{
  position: sticky;
  top: 0;
  background-color: white;
  height: 48px;
  line-height: 48px;
}
.el-divider{
  margin: 0;
}
.content{
  width: 80%;
  margin: 0 auto;
}
</style>
