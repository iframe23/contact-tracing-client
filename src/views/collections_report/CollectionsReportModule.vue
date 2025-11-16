<template>
  <div>
    <!-- <router-link to="/enrollment/"><button class="btn btn-success btn-sm">Enrollees</button></router-link> <span class="mr-2 ml-2">|</span>
    <router-link to="/enrollment/enroll_new"><button class="btn btn-success btn-sm">Enroll New</button></router-link> <span class="mr-2 ml-2">|</span>
    <router-link to="/enrollment/enroll_old"><button class="btn btn-success btn-sm">Enroll Old</button></router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'CollectionsReportModule',
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
