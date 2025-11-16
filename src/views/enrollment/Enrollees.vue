<template>
  <div class="thead-primary table-sm">
    <div class="row">
      <div class="col-4">
        <h5 class="">Enrollees this Semester <span v-if="loggedUser.role_id == 4">- {{loggedUser.department_name}}</span></h5>
      </div>
      <div class="col-8">
         <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
            <b-button-group class="mx-1">
              <label class="align-self-center mb-0" for="">Filter by Course</label>
            </b-button-group>
            <b-button-group class="mx-1">
              <select @change="getStudentsByCourse()" name="" class="form-control form-control-sm" v-model="selectedCourse">
                <option v-for="(course, index) in courses" :key="index" :value="course.course_id">{{course.course_name}}</option>
              </select>
            </b-button-group>
          </b-button-toolbar>
      </div>
    </div>
    <hr>  
   
     <v-client-table 
          :data="enrollees"
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

          <div slot="actions" slot-scope="props" > 
            <router-link :to="'/students/student/'+props.row.user_id"><button class="btn-sm btn btn-primary mr-2" ><span class="fa fa-angle-double-right"></span></button></router-link>
            <button @click="confirm(props.row.account_sm_id)" v-if="props.row.status == 'For Confirmation'" class="btn btn-primary btn-sm">Confirm</button>
            <router-link :to="'/enrollment/adding/'+props.row.account_sm_id">
              <button v-if="props.row.status == 'Officially Enrolled'" class="btn-sm btn btn-success" >Addding/Dropping</button>
            </router-link>
          </div>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>
  </div>
</template> 

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'Users',
  data: () => {
    return{
      columns: ['user_id', 'fullname', 'course_name', 'year_level_name', 'student_type', 'status', 'actions'],
      options: {
          filterable: true
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      selectedCourse: ''
    }
  },
  computed: {
    ...mapGetters(['enrollees', 'loggedUser', 'courses', 'currentSem', 'currentSY'])
  },
  methods: {
    ...mapActions(['fetchEnrollees', 'fetchStudents',  'fetchCourses', 'fetchCurrentSem', 'fetchCurrentSY']),
    async confirm(account_id){
      let data = {
        where: {
          account_sm_id: account_id
        },
        data: {
          status: 'Officially Enrolled'
        }
      }

      let response = await axios.post(this.$api_url+'accounting/modify_account_sm', data);
      
      if(response.result = "Success"){
        response.message = "Selected student has been enrolled Officially";
        response.dismissCountDown = 10;
        await this.fetchEnrollees({sem_id:this.currentSem.sem_id, school_year:this.currentSY});

        bus.$emit('alert_push', response);
      }
    },
    async getStudentsByCourse(){
      await this.fetchEnrollees({sem_id:this.currentSem.sem_id, school_year:this.currentSY, 'account_statements.course_id':this.selectedCourse});
    }
  },
  async mounted() {
    await this.fetchCurrentSem();
    await this.fetchCurrentSY();
    await this.fetchEnrollees({sem_id:this.currentSem.sem_id, school_year:this.currentSY});
    await this.fetchCourses();
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
