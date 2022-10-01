<template>
  <div class="app-container">
    <userSearch />
    <userTable />
  </div>
</template>

<script>
import userTable from './components/user-table.vue'
import userSearch from './components/user-search.vue'
export default {
  name: 'HrsaasIndex',
  components: { userTable, userSearch },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
