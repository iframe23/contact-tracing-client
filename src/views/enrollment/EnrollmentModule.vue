<template>
  <div>
    <div v-if="$route.name != 'Adding/ Dropping'" class="mb-4">
      <b-nav tabs>
        <b-nav-item to="/enrollment/" exact exact-active-class="active">Enrollees</b-nav-item>
        <b-nav-item to="/enrollment/enroll_new" exact exact-active-class="active">Enroll New Student</b-nav-item>
        <b-nav-item to="/enrollment/enroll_old" exact exact-active-class="active">Enroll Old Student</b-nav-item>
      </b-nav>
    </div>
    <!-- <router-link to="/enrollment/"><button class="btn btn-success btn-sm">Enrollees</button></router-link> <span class="mr-2 ml-2">|</span>
    <router-link to="/enrollment/enroll_new"><button class="btn btn-success btn-sm">Enroll New</button></router-link> <span class="mr-2 ml-2">|</span>
    <router-link to="/enrollment/enroll_old"><button class="btn btn-success btn-sm">Enroll Old</button></router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'EnrollmentModule',
  computed: {
  },
  methods: {

  },
  created(){
 
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
