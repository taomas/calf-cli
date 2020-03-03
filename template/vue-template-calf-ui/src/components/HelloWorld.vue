<template>
  <calf-button class="btn-toogle" @click="showDialog">show dialog</calf-button>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showDialog() {
      this.$createDialog({
        type: 'default',
        title: 'test',
        content: 'hello world'
      }).show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-toogle {
  width: 200px;
  height: 50px;
  margin: 0 auto;
}
</style>
