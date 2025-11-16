<template>
  <div>
    <b-row>
      <b-col sm="6" lg="3">
        <router-link to="/students">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{departmentPopulation}}</h4><p>Department Population ({{loggedUser.department_abb}})</p></div>
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
        <router-link to="/department_instructors">
          <b-card no-body class="bg-info">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{departmentInstructors}}</h4><p>Department Instructors ({{loggedUser.department_abb}})</p></div>
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
        <router-link to="/subject_loads">
          <b-card no-body class="bg-warning">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{subjectLoadsNum}}</h4><p>Subject Loads ({{loggedUser.lastname}})</p></div>
                </div>
                <div class="col-4">
                  <div><span class="mb-4 mt-1 fa fa-file fs-5"></span></div>
                </div>
              </div>   
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
      <b-col sm="6" lg="3">
        <router-link to="/grading_entry">
          <b-card no-body class="bg-danger">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{studentsUnder}}</h4><p>Students Handled</p></div>
                </div>
                <div class="col-4">
                  <div><span class="mb-4 mt-1 fa fa-book fs-5"></span></div>
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
          <b-card :header="'Students in Each subject loads ('+loggedUser.lastname+')'">
            <div class="chart-wrapper">
              <doughnut-example v-if="studentsInEachSubjectLoads.data.length != 0" :backgroundColor="studentsInEachSubjectLoads.backgroundColor" :labels="studentsInEachSubjectLoads.labels" :data="studentsInEachSubjectLoads.data" chartId="chart-doughnut-01"/> 
            </div>
          </b-card>
        </div>
      </div>
      <div class="col-6">
        <div>
          <b-card :header="'Subject Loads Time Schedules ('+loggedUser.lastname+')'">
            <div class="chart-wrapper">
              <table class="table table-hover table-striped">
                <thead class="bg-primary">
                  <tr>
                    <th>Subj. Code</th>
                    <th>Units</th>
                    <th>Room</th>
                    <th>Days</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sub in subjectLoadsPerDays" :key="sub.subject_id">
                    <td>{{sub.subject_code}}</td>
                    <td>{{sub.units}}</td>
                    <td>{{sub.room_name}}</td>
                    <td>
                      <div v-for="time in sub.time_scheds" :key="time.time_sched_id">{{time.day_abb}}</div>
                    </td>
                    <td>
                      <div v-for="time in sub.time_scheds" :key="time.time_sched_id">{{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  name: 'InstructorDashboard',
  components:{
    CardBarChartExample,
    DoughnutExample,
    BarExample,
    LineExample
  },
  async created(){
    console.log(this.$router.currentRoute)
    // await this.fetchloggedUser();
    await this.fetchCoursesCollections();
    await this.fetchMonthlyCollection();
    await this.fetchDepartmentPopulation({'departments.department_id':this.loggedUser.department_id});
    await this.fetchDepartmentInstructors({role_id:5, department_id: this.loggedUser.department_id, user_status: 'Active'});
    await this.fetchStudentsUnder({teacher_id:this.loggedUser.user_id});
    await this.fetchSubjectLoadsNum({teacher_id:this.loggedUser.user_id});
    await this.fetchUnfinalizedSchedules();
    await this.fetchStudentsInEachSubjectLoads({teacher_id:this.loggedUser.user_id});
    await this.fetchSubjectLoadsPerDays({teacher_id:this.loggedUser.user_id});
  },
  methods:{
    ...mapActions(['fetchLoggedUser','fetchSubjectLoadsPerDays','fetchSubjectLoadsNum','fetchStudentsInEachSubjectLoads','fetchDepartmentPopulation','fetchDepartmentInstructors','fetchStudentsUnder','fetchUnfinalizedSchedules','fetchCoursesCollections', 'fetchMonthlyCollection', 'fetchNewStudents', 'fetchUsedProspectuses', 'fetchActiveCourses','fetchOldStudents'])
  },
  computed: {
    ...mapGetters(['loggedUser','subjectLoadsPerDays','subjectLoadsNum','studentsInEachSubjectLoads','departmentPopulation','departmentInstructors','studentsUnder','unfinalizedSchedules','coursesCollections', 'monthlyCollection', 'newStudents', 'oldStudents', 'usedProspectuses', 'activeCourses'])
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
