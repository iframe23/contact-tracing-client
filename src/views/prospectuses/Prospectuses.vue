<template>
  <div class="thead-primary table-sm">
    <h5>Prospectuses</h5><hr>
    <router-link to="/prospectuses/add_prospectus">
      <button class="btn btn-primary btn-sm mb-3">Add New Prospectus</button>
    </router-link>

     <v-client-table 
          :data="tableData"
          :columns="columns" 
          :options="options">

          <span slot="actions" slot-scope="props" >
            <router-link :to="'/prospectuses/prospectus/'+props.row.prospectus_id">
              <button class="action-btn btn btn-info mr-2"><span class="fa fa-angle-double-right"></span></button>
            </router-link> 
            <button class="action-btn btn btn-primary mr-2" @click="editProspectus(props.index)"><span class="fa fa-edit"></span></button>
            <button class="action-btn btn btn-danger" v-on:click="deleteProspectus(props.row.prospectus_id)"><span class="fa fa-trash"></span></button>
          </span>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>
      
      <b-modal
        :title="'Edit Course - '+toEdit.prospectus_name"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false"
        :hide-footer= true
      >
        <form @submit.prevent="submitEditProspectus()">
          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Prospectus Course</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.course_id" class="form-control" required>
                  <option v-for="course in courses" v-bind:key="course.course_id" :value="course.course_id">{{course.course_name}}</option>
                </select>	
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Prospectus Name</label>		
              </div>

              <div class="col-4">
                <input type="text" v-model="toEdit.prospectus_name" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Prospectus Status</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.prospectus_status" class="form-control" required>
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                </select>	
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Usage Status</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.is_used" class="form-control" required>
                  <option value="1">Used</option>
                  <option value="0">Not Used</option>
                </select>	
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
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'

export default {
  name: 'Prospectuses',
  data: () => {
    return{
      primaryModal: false,
      courses: [],
      tableData: [],
      columns: ['prospectus_id', 'prospectus_name', 'course', 'prospectus_status', 'usage_status', 'actions' ],
      options: {
          headings: {
              prospectus_id: 'Prospectus ID',
              prospectus_name: 'Prospectus Name',
              prospectus_course: 'Prospectus Course',
              prospectus_status: 'Prospectus Status',
              usage_status: 'Usage Status',
          },
          sortable: ['prospectus_id', 'prospectus_name', 'course', 'prospectus_status', 'usage_status'],
          filterable: ['prospectus_id', 'prospectus_name', 'course', 'prospectus_status', 'usage_status']
      },
      toEdit: {
        prospectus_id: 0,
        prospectus_name: '',
        course_id: '',
        prospectus_status: '',
        is_used: 0,
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
    }
  },
  methods: {
    editProspectus(index) {
      index = index-1;
      this.toEdit.prospectus_id = this.tableData[index].prospectus_id
      this.toEdit.prospectus_name = this.tableData[index].prospectus_name
      this.toEdit.course_id = this.tableData[index].course_id
      this.toEdit.prospectus_status = this.tableData[index].prospectus_status
      this.toEdit.is_used = this.tableData[index].is_used

      this.primaryModal = true
    },
    submitEditProspectus() {
      school_api.edit_prospectus(this.toEdit).then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10

        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getProspectuses();
        }
      });
    },
    getProspectuses() {
      school_api.get_prospectuses().then(res => this.tableData = res);
    },
    deleteProspectus(id){
      user_api.delete_data('prospectus_id', id, 'prospectuses').then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10
        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getProspectuses();
        }
      });
    }
  },
  async created() {
    this.getProspectuses()
    school_api.get_courses().then(res => this.courses = res);
  }
}
</script>

<style scoped>
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


