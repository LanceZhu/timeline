<template>
    <div v-html="content"></div>
</template>

<script>
export default {
    data(){
        return {
            content: 'timepoint'
        }
    },
    mounted: function() {
        let _this = this;
        this.$axios.get(`/_api/show/+${ this.$route.params.id }`).then(res => {
            _this.$data.content = res.data.data.post.content;
        })
    }
}
</script>