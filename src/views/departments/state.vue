<template>
  <div clas="app-main">
    <search @input="btn($event)" />
    <form-data ref="formdata" />
  </div>
</template>

<script>
import search from '@/components/input/index.vue'
import FormData from '@/components/form/index.vue'
export default {
  name: 'Equipment',
  components: {
    search,
    FormData
  },
  methods: {
    btn(value) {
      console.log(value)
      this.$refs.formdata.search(value)
    }

  }
}
</script>

<style>

</style>
