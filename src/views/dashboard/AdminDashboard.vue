<template>
  <div>
    <b-row>
      <b-col sm="6" lg="3">
        <router-link to="/residents">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Residents</p></div>
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
        <router-link to="/visiting_points">
          <b-card no-body class="bg-info">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Visiting Points</p></div>
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
        <router-link to="/contact_trace">
          <b-card no-body class="bg-warning">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Contact Trace</p></div>
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
        <router-link to="/contact_trace">
          <b-card no-body class="bg-danger">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Travel Logs</p></div>
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
      <div class="col-12">
        <div>
          <b-card header="Top Visiting Location Points with most positive cases">
            <div class="chart-wrapper">
              <bar-example :styles="myStyles" label="Top Visiting Location Points with most positive cases" :labels="topVisitingPoints.labels" :data="topVisitingPoints.data" chartId="chart-bar-01"/>
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
  name: 'AdminDashboard',
  components:{
    CardBarChartExample,
    DoughnutExample,
    BarExample,
    LineExample
  },
  async created(){
    console.log(this.$router.currentRoute)
    await this.fetchTopVisitingPoints()
    console.log(this.topVisitingPoints)
  },
  methods:{
    ...mapActions(['fetchTopVisitingPoints']),
  },
  computed: {
    ...mapGetters(['topVisitingPoints']),
    myStyles () {
      return {
        height: `350px`,
        position: 'relative'
      }
    }
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
