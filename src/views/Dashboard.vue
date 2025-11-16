<template>
  <div class="mt-4 container-fluid">
    <admin-dashboard v-if="loggedUser.role_id == 1"></admin-dashboard>
    <visiting-point-dashboard v-else-if="loggedUser.role_id == 3"></visiting-point-dashboard>
    <!-- <accountant-dashboard v-else-if="loggedUser.role_id == 3"></accountant-dashboard>
    <dean-dashboard v-else-if="loggedUser.role_id == 4"></dean-dashboard>
    <instructor-dashboard v-else-if="loggedUser.role_id == 5"></instructor-dashboard> -->
  </div>
</template>

<script>
import CardBarChartExample from './dashboard/CardBarChartExample';
import DoughnutExample from './dashboard/DoughnutExample';
import BarExample from './dashboard/BarExample';
import LineExample from './dashboard/LineExample';
import AdminDashboard from './dashboard/AdminDashboard';
import InstructorDashboard from './dashboard/InstructorDashboard';
import DeanDashboard from './dashboard/DeanDashboard';
import AccountantDashboard from './dashboard/AccountantDashboard';
import VisitingPointDashboard from './dashboard/VisitingPointDashboard';


import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'dashboard',
  components:{
    CardBarChartExample,
    DoughnutExample,
    BarExample,
    LineExample,
    AdminDashboard,
    VisitingPointDashboard,
    AccountantDashboard,
    DeanDashboard,
    InstructorDashboard
  },
  created(){
    console.log(this.$router.currentRoute)
  },
  methods:{
    ...mapActions(['fetchLoggedUser'])
  },
  computed: {
    ...mapGetters(['loggedUser'])
  },
  async mounted(){
    await this.fetchLoggedUser();

    // if (this.loggedUser.role_id == 2){
    //   this.$router.push('/profile/');
    // }
  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
