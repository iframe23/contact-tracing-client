<template>
  <div class="thead-primary table-sm mt-4 container-fluid">
    <h5>Residents</h5><hr>
    <!-- <router-link to="/residents/add_resident">
      <button class="btn btn-primary btn-sm mb-3">Add New Resident</button>
    </router-link> -->

    <b-card no-body>
      <b-tabs card>
          <b-tab title="Active" active>
              <b-card-text>
                  <v-client-table 
                      :data="residents"
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
                        <router-link :to="'/residents/resident/'+props.row.user_id"><button class="action-btn btn btn-primary mr-2" ><span class="fa fa-angle-double-right"></span></button></router-link>
                        <button class="action-btn btn btn-warning mr-2" @click="editResident(props.index)"><span class="fa fa-edit"></span></button>
                        <button class="action-btn btn btn-danger" v-on:click="deleteR(props.row.user_id)"><span class="fa fa-trash"></span></button>
                      </span>
                      <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
                  </v-client-table>
              </b-card-text>
          </b-tab>

          <b-tab title="Pending">
              <b-card-text>

              </b-card-text>
          </b-tab>
      </b-tabs>
    </b-card>


    <b-modal
      :title="'Edit Resident - '+toEdit.firstname+' '+toEdit.lastname"
      variant="primary"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="primaryModal" 
      @ok="primaryModal = false"
      :hide-footer= true
    >
      <form @submit.prevent="submitEditResident()">
        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>First Name</label>		
            </div>

            <div class="col-4">
              <input type="text" v-model="toEdit.firstname" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Middle Name</label>		
            </div>

            <div class="col-4">
              <input type="text" v-model="toEdit.middlename" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Last Name</label>		
            </div>

            <div class="col-4">
              <input type="text" v-model="toEdit.lastname" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Gender</label>		
          </div>

          <div class="col-6">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" v-model="toEdit.gender" id="inlineRadio1" value="Male" required> Male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" v-model="toEdit.gender" id="inlineRadio2" value="Female" required> Female
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Address</label>		
          </div>

          <div class="col-4">
            <input type="text" v-model="toEdit.address" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Birthdate</label>		
          </div>

          <div class="col-4">
            <input type="date" v-model="toEdit.birthdate" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Email</label>		
          </div>

          <div class="col-4">
            <input type="email" v-model="toEdit.email" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Contact Number</label>		
          </div>

          <div class="col-4">
            <input type="text" v-model="toEdit.contact_number" class="form-control">
          </div>
        </div>
      </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">

            </div>

            <div class="col-8">
              <button class="btn btn-primary mr-3" type="submit">Confirm Edit</button>
              <button class="btn btn-secondary" type="button" @click="primaryModal = false">Close</button>
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
  name: 'Users',
  data: () => {
    return{
      primaryModal: false,
      tableData: [],
      columns: ['#','fullname', 'address', 'gender', 'email', 'contact_number', 'health_status', 'actions' ],
      options: {
          headings: {
              fullname: 'Resident Name',
          },
          filterable: true
      },
      toEdit: {
        user_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        address: '',
        birthdate: '',
        email: '',
        contact_number: ''
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
    ...mapGetters(['residents'])
  },
  methods: {
    ...mapActions(['fetchResidents', 'submitToEditResident','deleteResident']),
    editResident(index) {
      index = index-1;
      this.toEdit.user_id = this.residents[index].user_id
      this.toEdit.firstname = this.residents[index].firstname
      this.toEdit.middlename = this.residents[index].middlename
      this.toEdit.lastname = this.residents[index].lastname
      this.toEdit.gender = this.residents[index].gender
      this.toEdit.address = this.residents[index].address
      this.toEdit.birthdate = this.residents[index].birthdate
      this.toEdit.email = this.residents[index].email
      this.toEdit.contact_number = this.residents[index].contact_number
      console.log(this.residents[index].firstname)
      this.primaryModal = true
    },
    async submitEditResident() {

      let response = await this.submitToEditResident(this.toEdit);

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);

        await this.fetchResidents({role_id : 2})

        this.primaryModal = false
      }
    },
    getUsers() {

    },
    async deleteR(id){
      let response = await this.deleteResident({'user_id':id});

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);

        await this.fetchResidents({role_id : 2})

        this.primaryModal = false
      }
    }
  },
  async created() {
    await this.fetchResidents({role_id : 2})
    this.tableData = this.residents
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
