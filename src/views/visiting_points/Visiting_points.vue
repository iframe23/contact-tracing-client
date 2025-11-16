<template>
  <div class="mt-4 container-fluid thead-primary table-sm">
    <h5>Visiting Points</h5><hr>
    <router-link to="/visiting_points/add_visiting_point">
      <button class="btn btn-primary btn-sm mb-3">Add New Visiting Point</button>
    </router-link>

     <v-client-table 
          :data="visitingPoints"
          :columns="columns" 
          :options="options">

          <span slot="actions" slot-scope="props" > 
            <router-link :to="'/visiting_points/visiting_point/'+props.row.visiting_point_id"><button class="action-btn btn btn-primary mr-1" ><span class="fa fa-angle-double-right"></span></button></router-link>
            <button class="action-btn btn btn-warning mr-2" @click="editVS(props.index)"><span class="fa fa-edit"></span></button>
            <button class="action-btn btn btn-danger" v-on:click="deleteVS(props.row.visiting_point_id)"><span class="fa fa-trash"></span></button>
          </span>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>

    <b-modal
      :title="'Edit Visiting Point - '+visiting_pointData.visiting_point_name"
      variant="primary"
      header-bg-variant="primary"
      content-class="border-primary"
      size="xl"
      v-model="primaryModal" 
      @ok="primaryModal = false"
      :hide-footer= true
    >
      <form @submit.prevent="submitEditVisitingPoint()">
        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Visiting Point Name</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="visiting_pointData.visiting_point_name" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Address</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="visiting_pointData.visiting_point_address" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Type</label>		
            </div>

            <div class="col-6">
              <select v-model="visiting_pointData.visiting_point_type" class="form-control" required>
                  <option value=""></option>
                  <option value="Public Establishment">Public Establishment</option>  
                  <option value="Private Establishment">Private Establishment</option>  
                  <option value="School">School</option>
                  <option value="Landmark">Landmark</option>  
                  <option value="Transportation">Transportation</option> 
                  <option value="Government Agency">Government Agency</option> 
                </select>	
            </div>
          </div>
        </div>

        <div v-if="visiting_pointData.visiting_point_type == 'Transportation'" class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Plate Number</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="visiting_pointData.plate_number" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Email</label>		
            </div>

            <div class="col-6">
              <input type="email" v-model="userData.email" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>Contact Number</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="userData.contact_number" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>GPS Latitude</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="visiting_pointData.latitude" class="form-control" required>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-2">
              <label>GPS Longitude</label>		
            </div>

            <div class="col-6">
              <input type="text" v-model="visiting_pointData.longitude" class="form-control" required>
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
  name: 'Visiting Points',
  data: () => {
    return{
      primaryModal: false,
      tableData: [],
      columns: ['#','visiting_point_name','visiting_point_type', 'visiting_point_address', 'email', 'contact_number', 'actions' ],
      options: {
          sortable: ['visiting_point_name','visiting_point_type', 'visiting_point_address', 'email', 'contact_number'],
          filterable: ['visiting_point_name','visiting_point_type', 'visiting_point_address', 'email', 'contact_number']
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
    }
  },
  computed: {
    ...mapGetters(['visitingPoints'])
  },
  methods: {
    ...mapActions(['fetchVisitingPoints', 'submitToEditVisitingPoint', 'deleteVisitingPoint']),
    editVS(index) {
      index = index-1;
      this.userData.user_id = this.visitingPoints[index].user_id
      this.userData.email = this.visitingPoints[index].email
      this.userData.contact_number = this.visitingPoints[index].contact_number
      this.visiting_pointData.visiting_point_id = this.visitingPoints[index].visiting_point_id
      this.visiting_pointData.visiting_point_name = this.visitingPoints[index].visiting_point_name
      this.visiting_pointData.visiting_point_address = this.visitingPoints[index].visiting_point_address
      this.visiting_pointData.visiting_point_type = this.visitingPoints[index].visiting_point_type
      this.visiting_pointData.latitude = this.visitingPoints[index].latitude
      this.visiting_pointData.longitude = this.visitingPoints[index].longitude
      this.visiting_pointData.plate_number = this.visitingPoints[index].plate_number
      
      this.primaryModal = true
    },
    async submitEditVisitingPoint() {
      let response = await this.submitToEditVisitingPoint({
        userData: this.userData,
        visiting_pointData: this.visiting_pointData
      });

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);

        await this.fetchVisitingPoints()

        this.primaryModal = false
      }
    },
    getUsers() {

    },
    async deleteVS(id){
      let response = await this.deleteVisitingPoint({'visiting_point_id':id});

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);

        await this.fetchVisitingPoints()

        this.primaryModal = false
      }
    }
  },
  async created() {
    await this.fetchVisitingPoints()
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
