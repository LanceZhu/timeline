<template>
<div>
  <div class="title">
    {{title}}
    <router-link :to="'/timepoint/edit/'+id" tag="li">
      <el-tooltip content="编辑词条" popper-class="tooltip">
        <i class="el-icon-edit"></i>
      </el-tooltip>
    </router-link>
    <router-link :to="'/timepoint/history/'+id" tag="li">
      <el-tooltip content="词条历史" popper-class="tooltip">
        <i class="el-icon-time"></i>
      </el-tooltip>
    </router-link>
    <!--
    <router-link :to="'/timepoint/history/'+id" tag="li">
      <i class="el-icon-warning"></i>
    </router-link>
    -->
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
  width: 90%;
  margin: 0 auto;
  word-break: break-all;
  box-sizing: border-box;
  padding: 15px 0 40px 0;
  text-align: left;
}
li{
  display: inline-block;
  cursor: pointer;
}
.el-tooltip{
  margin-left: 10px;
}
</style>
