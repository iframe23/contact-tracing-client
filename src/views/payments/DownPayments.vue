<template>
  <div class="thead-primary table-sm">
    <h5 class="">For Down Payments</h5><hr>  

     <v-client-table 
          :data="forDownPayments"
          :columns="columns" 
          :options="options">

          <span slot="fullname" slot-scope="props" > 
            {{props.row.firstname+' '+props.row.lastname}}
          </span>

          <span slot="student_type" slot-scope="props" > 
            <span v-if="props.row.student_type != 'Old'">New</span>
            <span v-else>{{props.row.student_type}}</span>
          </span>

          <span slot="status" slot-scope="props">
            <span class="text-danger" v-if="props.row.status == 'For Downpayment'">{{props.row.status}}</span>
            <span class="text-warning" v-else-if="props.row.status == 'For Confirmation'">{{props.row.status}}</span>
            <span class="text-success" v-else-if="props.row.status == 'Officially Enrolled'">{{props.row.status}}</span>
            <span v-else>Not yet Processed</span>
          </span>

          <span slot="actions" slot-scope="props" > 
            <router-link :to="'/payments/payment/'+props.row.account_sm_id"><button class="action-btn btn btn-success mr-2" ><span class="fa fa-credit-card"></span></button></router-link>
          </span>
      </v-client-table>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Users',
  data: () => {
    return{
      primaryModal: false,
      columns: ['user_id', 'fullname', 'course_name', 'year_level_name', 'student_type', 'status', 'actions'],
      options: {
          filterable: true
      },
      selectedPayor: {
        firstname: '',
        lastname: ''
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
    }
  },
  computed: {
    ...mapGetters(['forDownPayments', 'loggedUser'])
  },
  methods: {
    ...mapActions(['fetchForDownPayments']),
    paymentPrompt(index){
      this.selectedPayor = this.forDownPayments[index];
      
    },
  },
  async mounted() {
    await this.fetchForDownPayments();
  }
}
</script>

<style>
  #app {
    width: 95%;
    margin-top: 50px; 
  }

  .VuePagination {
    text-align: center;
  }

  .vue-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .vue-pagination-ad {
    text-align: center;
  }

  .glyphicon.glyphicon-eye-open {
    width: 16px;
    display: block;
    margin: 0 auto;
  }

  th:nth-child(3) {
    text-align: center;
  }

  .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }

  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }

  .VueTables__child-row-toggler--open::before {
    content: "-";
  }

  .VueTables__table{
    background-color: #fff;
  }
</style>

<style>
  .form-inline label{
    display: inline;
    margin: 0 10px 0 0;
  }

  .action-btn{
    padding: 1px 6px;
  }
</style>
