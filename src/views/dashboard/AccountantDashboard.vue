<template>
  <div>
    <b-row>
      <b-col sm="6" lg="3">
        <router-link to="/payments/for_down_payments">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{forDownpayments}}</h4><p>Enrollees For Downpayments</p></div>
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
        <router-link to="/account_statements">
          <b-card no-body class="bg-info">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{unpaidAccountStatements}}</h4><p>Account Statements with Unpaid Balance</p></div>
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
        <router-link to="/account_statements">
          <b-card no-body class="bg-warning">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{forConfirmation}}</h4><p>Enrollees for Confirmation</p></div>
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
        <router-link to="/account_statements">
          <b-card no-body class="bg-danger">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0">{{officiallyEnrolled}}</h4><p>Officially Enrolled Students</p></div>
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
          <b-card header="Collections in each Courses">
            <div class="chart-wrapper">
              <bar-example label="Collections in each Courses" v-if="coursesCollections.data.length != 0" :labels="coursesCollections.labels" :data="coursesCollections.data" chartId="chart-bar-01"/>
            </div>
          </b-card>
        </div>
      </div>
      <div class="col-6">
        <div>
          <b-card header="Monthly Tuition Fee Collection for Current Year">
            <div class="chart-wrapper">
              <line-example v-if="monthlyCollection.data.length != 0" :labels="monthlyCollection.labels" :data="monthlyCollection.data" chartId="chart-line-01"/>
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
  name: 'AccountantDashboard',
  components:{
    CardBarChartExample,
    DoughnutExample,
    BarExample,
    LineExample
  },
  async created(){
    console.log(this.$router.currentRoute)
    await this.fetchCoursesCollections();
    await this.fetchMonthlyCollection();
    await this.fetchForConfirmation();
    await this.fetchOfficiallyEnrolled();
    await this.fetchUnpaidAccountStatements();
    await this.fetchForDownpayments();
  },
  methods:{
    ...mapActions(['fetchOfficiallyEnrolled','fetchForConfirmation','fetchUnpaidAccountStatements','fetchForDownpayments','fetchCoursesCollections', 'fetchMonthlyCollection', 'fetchNewStudents', 'fetchUsedProspectuses', 'fetchActiveCourses','fetchOldStudents'])
  },
  computed: {
    ...mapGetters(['officiallyEnrolled','forConfirmation','unpaidAccountStatements','forDownpayments','coursesCollections', 'monthlyCollection', 'newStudents', 'oldStudents', 'usedProspectuses', 'activeCourses'])
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
