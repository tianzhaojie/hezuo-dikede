<template>
  <div clas="app-main">
    <search @input="btn($event)" />
    <form-data ref="formdata" />
    <new-construct />
  </div>
</template>

<script>
import search from '@/components/input/index.vue'
import FormData from '@/components/form/index.vue'
import newConstruct from './components/newConstruct.vue'
export default {
  name: 'Equipment',
  components: {
    search,
    FormData,
    newConstruct
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
