export default {
  beforeMount() {

  },
  beforeDestroy() {

  },
  methods: {
    toRouter(path, query) {
      this.$router.push({
        path,
        query
      })
    },
    reset(obj) {
      console.log(obj)
      for (let i in obj) {
        if (Array.isArray(obj[i])) {
          obj[i] = []
        } else if (typeof obj[i] == 'object') {
          obj[i] = {}
        } else {
          obj[i] = ''
        }
      }
    }
  }
}
