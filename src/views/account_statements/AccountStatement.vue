<template>
  <div class="thead-primary ">
    <h4 class="d-flex align-items-center justify-content-between">
      Statement of Account - S.Y. {{currentSY}} - {{currentSem.sem_name}}
      <button @click="printModal=true" class="btn btn-primary btn-sm"><span class="fa fa-print"></span> Print Preview</button>
    </h4>
    <hr>  

    <div class="row">
      <div class="col-8">
        <div>
          <div class="bg-yellow2 p-4 mb-4 rounded">
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
                  <td>{{ind+1}}</td>
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

          <div class="bg-yellow2 p-3 mb-5 rounded">
            <h5 class="text-center">Schedule of Payments 
              <span @click="primaryModal = true" v-if="accountSM.balance > 0" class="btn btn-primary btn-sm float-right">Make Payment</span>
              <span v-else class="btn btn-success btn-sm float-right">Fully Paid</span>
            </h5><hr>
            <div class="row">
              <div class="col-7">
                <div class="form-group row">
                  <div class="col-4">
                    <label for=""><strong>Prelim :</strong></label>
                  </div>
                  <div class="col-4">
                    <label for="">Php {{accountSM.per_grading}}</label>
                  </div>
                  <div class="col-3">
                    <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading" class="btn btn-success btn-sm">Paid</span>
                    <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-4">
                    <label for=""><strong>Midterm :</strong></label>
                  </div>
                  <div class="col-4">
                    <label for="">Php {{accountSM.per_grading}}</label>
                  </div>
                  <div class="col-3">
                    <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading*2" class="btn btn-success btn-sm">Paid</span>
                    <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-4">
                    <label for=""><strong>Semi-Final :</strong></label>
                  </div>
                  <div class="col-4">
                    <label for="">Php {{accountSM.per_grading}}</label>
                  </div>
                  <div class="col-3">
                    <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading*3" class="btn btn-success btn-sm">Paid</span>
                    <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                  </div>
                </div>

                <div class="form-group row mb-3">
                  <div class="col-4">
                    <label for=""><strong>Final :</strong></label>
                  </div>
                  <div class="col-4">
                    <label for="">Php {{accountSM.per_grading}}</label>
                  </div>
                  <div class="col-3">
                    <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading*4" class="btn btn-success btn-sm">Paid</span>
                    <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                  </div>
                </div>
              </div>
              <div class="col-5">
                <div>
                  <h6 class="clearfix"><span class="float-right">Attached Receipts</span></h6>
                  <div class="clearfix" v-for="(receipt, index) in accountSM.receipts" :key="index">
                    <button @click="openReceiptModal(index)" class="btn btn-secondary btn-sm mb-1 float-right">O.R. #0000{{receipt.receipt_id}} - {{$moment().format('MM/D/YYYY', receipt.receipt_date)}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="col-4">
        <div>
          <form class="bg-yellow2 p-4 rounded">
            <div class="form-group">
              <label for="">Miscellaneous Fee</label>
              <h5>{{accountSM.misc_fee}}</h5><hr>
            </div>

            <div class="form-group">
              <label for="">Tuition Fee</label>
              <h5>{{accountSM.tuition_fee}}</h5><hr>
            </div>

            <div class="form-group">
              <label for="">Laboratory Fee</label>
              <h5>{{accountSM.lab_fee}}</h5><hr>
            </div>

            <div class="form-group">
              <label for="">Total Amount Due</label>
              <h5>{{accountSM.total_amount}}</h5><hr>
            </div>

            <div class="form-group">
              <label for="">Down Payment</label>
              <h5>{{accountSM.down_payment}}</h5><hr>
            </div>

            <div class="form-group">
              <label for="">Total Payments Made</label>
              <h5>{{accountSM.total_amount_paid}}</h5><hr>
            </div>

            <div class="form-group">
              <label for="">Balance Remaining</label>
              <h5>{{accountSM.balance}}</h5><hr>
            </div>
          </form>
        </div>
      </div>
    </div>

    <b-modal
      :title="'Payment from '+accountSM.firstname+' '+accountSM.lastname"
      variant="primary"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="primaryModal" 
      @ok="primaryModal = false"
      :hide-footer= true
    >
      <form @submit.prevent="confirmPayment()">
        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Received from :</label>		
            </div>

            <div class="col-6">
              {{accountSM.firstname+' '+accountSM.lastname}}
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Course :</label>		
            </div>

            <div class="col-6">
              {{accountSM.course_abb}}
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Amount Paid :</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="receiptData.receipt_amount" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Particulars :</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="receiptData.particulars" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Receipt Date :</label>		
            </div>

            <div class="col-6">
              {{$moment().format('MMMM D, YYYY')}}
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">

            </div>

            <div class="col-8">
              <button class="btn btn-primary mr-3" type="submit">Confirm Payment</button>
              <button class="btn btn-secondary" type="button" @click="primaryModal = false">Close</button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>



    <b-modal
      :title="'Receipt from payment made by '+accountSM.firstname+' '+accountSM.lastname"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="receiptModal" 
      @ok="receiptModal = false"
      :hide-footer= true
      variant="primary"
      body-bg-variant="secondary"
    >
      <div class="card">
        <embed class="pdf-viewer" :src="this.$api_url+'printable/print_receipt/'+receiptModalData.receipt_id" />
      </div>
    </b-modal>


    <b-modal
    :title="'Account Statement - '+accountSM.sem_name+', SY '+accountSM.school_year+' - '+accountSM.firstname+' '+accountSM.lastname"
    header-bg-variant="primary"
    content-class="border-primary"
    size="xl"
    v-model="printModal" 
    @ok="printModal = false"
    :hide-footer= true
    variant="primary"
    body-bg-variant="secondary"
    >
        <div class="card">
            <embed class="pdf-viewer" :src="this.$api_url+'printable/print_account_sm/'+accountSM.account_sm_id" />
        </div>
    </b-modal>
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
      receiptData:{
        
      },
      receiptModal: false,
      printModal: false,
      receiptModalData:{
        receipt_id: '',
        account_sm_id: '',
        receipt_amount: '',
        receipt_date: '',
        particulars: ''
      }
    }
  },
  computed: {
    ...mapGetters(['forDownPayments', 'loggedUser', 'currentSem', 'currentSY', 'accountSM'])
  },
  methods: {
    ...mapActions(['fetchForDownPayments', 'fetchAccountSM', 'submitPayment']),
    sample(t){
      let date = new Date()
      console.log(this.$moment().format("MM-D-YYYY"));
    },
    openReceiptModal(index){
      this.receiptModalData = this.accountSM.receipts[index];
      this.receiptModal = true;
    },
    async confirmPayment(){
      this.receiptData.account_sm_id = this.accountSM.account_sm_id

      if(parseInt(this.receiptData.receipt_amount) > parseInt(this.accountSM.balance)){
        let response = {
          result: 'Exceeded Amount',
          type: 'danger',
          message: 'Entered Receipt Amount has exceeded the stipulated remaining balance',
          dismissCountDown: 10
        }

        bus.$emit('alert_push', response);
      } else {
        let response = await this.submitPayment(this.receiptData);

        if(response.result="Success"){
          response.dismissCountDown = 10;
          await this.fetchAccountSM({account_sm_id : this.$route.params.account_sm_id});
          bus.$emit('alert_push', response);
          this.primaryModal = false;
        }
      }
    }
  },
  async mounted() {
    await this.fetchAccountSM({account_sm_id : this.$route.params.account_sm_id});
    console.log(new Date())
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

<style scoped>
  .receipt-form{
    width: 500px;
    margin: auto;
  }

</style>