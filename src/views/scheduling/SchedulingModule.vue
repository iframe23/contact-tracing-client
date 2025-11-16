<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'SchedulingModule',
  computed: {
  },
  methods: {

  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
