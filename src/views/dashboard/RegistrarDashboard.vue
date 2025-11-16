<template>
  <div>
    <b-row>
      <b-col sm="6" lg="3">
        <router-link to="/enrollment">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{newStudents}}</h4><p>New Enrolled Students</p></div>
                </div>
                <div class="col-4">
                  <div><span class="mb-4 mt-1 fa fa-user fs-5"></span></div>
                </div>
              </div>   
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
      <b-col sm="6" lg="3">
        <router-link to="/enrollment">
          <b-card no-body class="bg-info">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{oldStudents}}</h4><p>Old Enrolled Students</p></div>
                </div>
                <div class="col-4">
                  <div><span class="mb-4 mt-1 fa fa-user fs-5"></span></div>
                </div>
              </div>   
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
      <b-col sm="6" lg="3">
        <router-link to="/schedules">
          <b-card no-body class="bg-warning">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{unfinalizedSchedules}}</h4><p>Draft Schedules</p></div>
                </div>
                <div class="col-4">
                  <div><span class="mb-4 mt-1 fa fa-calendar-alt fs-5"></span></div>
                </div>
              </div>   
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
      <b-col sm="6" lg="3">
        <router-link to="/schedules">
          <b-card no-body class="bg-danger">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{finalizedSchedules}}</h4><p>Finalized Schedules</p></div>
                </div>
                <div class="col-4">
                  <div><span class="mb-4 mt-1 fa fa-calendar fs-5"></span></div>
                </div>
              </div>   
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
    </b-row>

    <div class="row">
      <div class="col-6">
        <div>
          <b-card header="Enrolled Students in each Courses">
            <div class="chart-wrapper">
              <doughnut-example v-if="enrolledStudentsPerCourses.data.length != 0" :backgroundColor="enrolledStudentsPerCourses.backgroundColor" :labels="enrolledStudentsPerCourses.labels" :data="enrolledStudentsPerCourses.data" chartId="chart-doughnut-01"/>
            </div>
          </b-card>
        </div>
      </div>
      <div class="col-6">
        <div>
          <b-card header="Enrolled Students By Year Levels">
            <div class="chart-wrapper">
              <bar-example label="Number of enrolled students in each year levels" v-if="enrolledStudentsPerYearLevels.data.length != 0" :labels="enrolledStudentsPerYearLevels.labels" :data="enrolledStudentsPerYearLevels.data" chartId="chart-bar-01"/>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardBarChartExample from './CardBarChartExample';
import DoughnutExample from './DoughnutExample';
import BarExample from './BarExample';
import LineExample from './LineExample';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'RegistrarDashboard',
  components:{
    CardBarChartExample,
    DoughnutExample,
    BarExample,
    LineExample
  },
  async created(){
    console.log(this.$router.currentRoute)
    await this.fetchEnrolledStudentsPerCourses();
    await this.fetchEnrolledStudentsPerYearLevels();
    await this.fetchUnfinalizedSchedules();
    await this.fetchFinalizedSchedules();
    await this.fetchNewStudents();
    await this.fetchOldStudents();
    await this.fetchUsedProspectuses();
    await this.fetchActiveCourses();
  },
  methods:{
    ...mapActions(['fetchEnrolledStudentsPerCourses', 'fetchUnfinalizedSchedules', 'fetchFinalizedSchedules', 'fetchNewStudents', 'fetchUsedProspectuses', 'fetchActiveCourses','fetchOldStudents','fetchEnrolledStudentsPerYearLevels'])
  },
  computed: {
    ...mapGetters(['enrolledStudentsPerCourses', 'unfinalizedSchedules','finalizedSchedules', 'newStudents', 'oldStudents', 'usedProspectuses', 'activeCourses', 'enrolledStudentsPerYearLevels'])
  },
  async mounted(){

  }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
