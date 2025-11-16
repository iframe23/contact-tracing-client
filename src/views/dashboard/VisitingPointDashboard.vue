<template>
  <div>
    <b-row>
      <b-col sm="6" lg="3">
        <router-link to="/qr_log">
          <b-card no-body class="bg-primary">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>QR Logging</p></div>
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
        <router-link to="/visitors">
          <b-card no-body class="bg-info">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Visitors</p></div>
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
        <router-link to="/">
          <b-card no-body class="bg-warning">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Ranking</p></div>
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
        <router-link to="/">
          <b-card no-body class="bg-danger">
            <b-card-body class="pb-0">
              <div class="row">
                <div class="col-8">
                  <div><h4 class="mb-0"></h4><p>Average Visits</p></div>
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

  </div>
</template>

<script>
import CardBarChartExample from './CardBarChartExample';
import DoughnutExample from './DoughnutExample';
import BarExample from './BarExample';
import LineExample from './LineExample';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'VisitingPointDashboard',
  components:{
    CardBarChartExample,
    DoughnutExample,
    BarExample,
    LineExample
  },
  async created(){
    console.log(this.$router.currentRoute)
  },
  methods:{
    ...mapActions([])
  },
  computed: {
    ...mapGetters([])
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
