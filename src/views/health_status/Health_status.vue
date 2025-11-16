<template>
  <div class="mt-4 container-fluid thead-primary table-sm">
    <div class="border border-left-0 border-right-0 mb-1">
        <div class="row">
            <div class="">
                <div class="d-flex justify-content-end align-items-center">
                   <form @submit.prevent="fetchRByStatus()" class="form-inline m-1">
                        <div class="form-group mx-sm-3">
                          <label for="inputPassword2" >Select Health Status</label>
                          <select v-model="selectedHealthStatus" class="form-control" required>
                            <option value=""></option>
                            <option value="Negative">Negative</option>  
                            <option value="Positive">Positive</option>  
                            <option value="Recovered">Recovered</option>
                            <option value="Deceased">Deceased</option>  
                          </select>	
                        </div>
                        <button type="submit" class="btn btn-primary">Load Persons</button>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <v-client-table 
          :data="residentsByStatus"
          :columns="columns" 
          :options="options">

          <span slot="#" slot-scope="props" > 
            {{props.index+'.'}}
          </span>

          <span slot="fullname" slot-scope="props" > 
            {{props.row.firstname+' '+props.row.lastname}}
          </span>

          <span slot="health_status" slot-scope="props" > 
            <span class="text-primary" v-if="props.row.health_status == 'Negative'">{{props.row.health_status}}</span>
            <span class="text-danger" v-else-if="props.row.health_status == 'Positive'">{{props.row.health_status}}</span>
            <span class="text-success" v-else-if="props.row.health_status == 'Recovered'">{{props.row.health_status}}</span>
            <span class="text-warning" v-else-if="props.row.health_status == 'Deceased'">{{props.row.health_status}}</span>   
          </span>

          <span slot="actions" slot-scope="props" > 
            <button class="action-btn btn btn-warning mr-2" @click="editStatus(props.index)"><span class="fa fa-edit"></span> Change Status</button>
          </span>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>


    <b-modal
      :title="'Change Health Status - '+selectedResident.firstname+' '+selectedResident.lastname"
      variant="primary"
      header-bg-variant="primary"
      content-class="border-primary"
      size="lg"
      v-model="changeStatusModal" 
      @ok="changeStatusModal = false"
      :hide-footer= true
    >
      <form @submit.prevent="submitEditHS()">

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-12">
            <label>Health Status</label>	
            <select v-model="selectedResident.health_status" class="form-control" required>
              <option value=""></option>
              <option value="Negative">Negative</option>  
              <option value="Positive">Positive</option>  
              <option value="Recovered">Recovered</option>
              <option value="Deceased">Deceased</option>  
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-12">
            <label>Date</label>	
            <input type="date" v-model="date_changed" class="form-control">
          </div>
        </div>
      </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-12">
              <button class="btn btn-primary mr-3" type="submit">Confirm Health Status Change</button>
              <button class="btn btn-secondary" type="button" @click="changeStatusModal = false">Close</button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Health Status',
  data: () => {
    return{
      changeStatusModal: false,
      tableData: [],
      columns: ['#','fullname', 'address', 'gender', 'email', 'contact_number','health_status', 'actions' ],
      options: {
          headings: {
              fullname: 'Resident Name',
          },
          filterable: true
      },
      userData: {
        user_id: '',
        email: '',
        contact_number: '',
      },
      visiting_pointData: {
        visiting_point_id: '',
        visiting_point_name: '',
        visiting_point_address: '',
        visiting_point_type: '',
        latitude: '',
        longitude: '',
        plate_number: ''
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      healthStatus: '',
      selectedHealthStatus: '',
      selectedResident: {},
      date_changed: ''
    }
  },
  computed: {
    ...mapGetters(['visitingPoints', 'residentsByStatus'])
  },
  methods: {
    ...mapActions(['fetchResidentsByStatus','submitEditHealthStatus']),
    async fetchRByStatus(){
      await this.fetchResidentsByStatus({
        role_id: 2,
        health_status : this.selectedHealthStatus
      })
    },
    editStatus(index) {
      index = index-1;

      this.selectedResident = this.residentsByStatus[index]
      console.log(this.residentsByStatus[index])
      this.changeStatusModal = true
    },
    async submitEditHS(index) {
      let response = await this.submitEditHealthStatus({
        user_id: this.selectedResident.user_id,
        health_status : this.selectedResident.health_status,
        date_changed : this.date_changed
      })

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);

        await this.fetchResidentsByStatus({
          role_id : 2,
          health_status : this.selectedHealthStatus
        })

        this.changeStatusModal = false
      }
    },
  },
  async created() {
    
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
