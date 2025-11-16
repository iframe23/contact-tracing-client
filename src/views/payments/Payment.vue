<template>
  <div class="thead-primary mb-4">
    <h4 class="text-center">Statement of Account - S.Y. {{currentSY}} - {{currentSem.sem_name}} (Downpayment)</h4>
    <hr>  

    <div class="row">
      <div class="col-8">
        <div class="bg-white p-4 rounded">
          <h5 class="text-center">Enrolled Subjects</h5><hr>
          <h6 class="clearfix">
            <span class="float-left"><strong>Name: </strong> {{accountSM.firstname+' '+accountSM.lastname}}</span>
            <span class="float-right"><strong>Course:</strong> {{accountSM.course_abb}}</span>
          </h6>
          <h6 class="clearfix">
            <span class="float-left" v-if="accountSM.student_type != 'Old'"><strong>Student Type:</strong> New</span>
            <span class="float-left" v-else><strong>Student Type:</strong> {{accountSM.student_type}}</span>
            <span class="float-right"><strong>Year Level:</strong> {{accountSM.year_level_name}}</span>
          </h6>
          <table class="table table-bordered table-responsive table-sm">
            <thead class="bg-info">
              <tr>
                <th>#</th>
                <th>Subject Code</th>
                <th>Descriptive Title</th>
                <th>Day</th>
                <th>Time</th>
                <th>Units</th>
                <th>Lab</th>
                <th>Lec</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sub, ind) in accountSM.enrolledSubjects" :key="ind">
                <td><strong>{{ind+1}}.</strong> </td>
                <td>{{sub.subject_code}}</td>
                <td>{{sub.descriptive_title}}</td>
                <td>
                  <div v-for="time in sub.time_scheds" :key="time.time_sched_id">{{time.day_abb}}</div>
                </td>
                <td>
                  <div class="width-2" v-for="time in sub.time_scheds" :key="time.time_sched_id">
                    {{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}
                  </div>
                </td>
                <td>{{sub.units}}</td>
                <td>{{sub.lab_units}}</td>
                <td>{{sub.lec_units}}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                </td>
                <td>
                  <strong>Total Units:</strong>
                </td>
                <td><strong>{{accountSM.total_units}}</strong></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>   
                <td>
                  <strong>Total Lab Units:</strong>
                </td>
                <td></td>
                <td><strong>{{accountSM.total_lab_units}}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
      <div class="col-4">
        <div class="bg-white p-4 rounded">
          <form :disabled="accountSM.status != 'For Downpayment'" @submit.prevent="downPayment()">
            <div class="form-group">
              <label for="">Miscellaneous Fee</label>
              <input readonly v-model="accountSM.misc_fee" type="text" class="form-control bg-info" required>
            </div>

            <div class="form-group">
              <label for="">Tuition Fee</label>
              <input readonly v-model="accountSM.tuition_fee" type="text" class="form-control bg-info" required>
            </div>

            <div class="form-group">
              <label for="">Laboratory Fee</label>
              <input readonly v-model="accountSM.lab_fee" type="text" class="form-control bg-info" required>
            </div>

            <div class="form-group">
              <label for="">Total Amount</label>
              <input readonly v-model="accountSM.total_amount" type="text" class="form-control bg-info" required>
            </div>

            <div class="form-group">
              <label for="">Down Payment</label>
              <input :readonly="accountSM.status != 'For Downpayment'" v-model="accountSM.down_payment" type="text" class="form-control" required>
            </div>

            <div class="form-group">
              <button v-if="accountSM.status == 'For Downpayment'" class="btn btn-primary mb-3">Submit Downpayment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
    ...mapGetters(['forDownPayments', 'loggedUser', 'currentSem', 'currentSY', 'accountSM'])
  },
  methods: {
    ...mapActions(['fetchForDownPayments', 'fetchAccountSM', 'submitDownPayment']),
    paymentPrompt(index){
      this.selectedPayor = this.forDownPayments[index];
      
    },
    async downPayment(){
      let downpayment = this.accountSM.down_payment;
      if(downpayment == 0 || downpayment==null || downpayment == ""){
        let alert = {
          result: 'No Downpayment Entered',
          type: 'danger',
          message: 'Please enter Downpayment Amount',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert);
      } else if(downpayment > this.accountSM.total_amount){
        let alert = {
          result: 'DownPayment Amount Exceeded',
          type: 'danger',
          message: 'The Downpayment Amount Entered has exceeded the stipulated Total amount due',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert);
      }else {
        let response = await this.submitDownPayment(this.accountSM);

        response.dismissCountDown = 15;

        bus.$emit('alert_push', response);

        this.$router.push('/account_statements/account_statement/'+this.accountSM.account_sm_id);
      }
    }
  },
  async mounted() {
    await this.fetchForDownPayments();
    await this.fetchAccountSM({account_sm_id : this.$route.params.account_sm_id});
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
