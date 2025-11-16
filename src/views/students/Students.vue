<template>
  <div class="thead-primary table-sm">
    <h4 class="">Students Information Masterlist <span v-if="loggedUser.role_id == 4 || loggedUser.role_id == 5">(Departmental)</span></h4><hr>
    <div v-if="loggedUser.role_id != 4 && loggedUser.role_id != 5">
      <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1">
          <label class="align-self-center mb-0" for="">Filter by Course</label>
        </b-button-group>
        <b-button-group class="mx-1">
          <select @change="getStudentsByCourse()" name="" class="form-control form-control-sm" v-model="selectedCourse">
            <option v-for="(course, index) in courses" :key="index" :value="course.course_id">{{course.course_name}}</option>
          </select>
        </b-button-group>
        <b-button-group class="mx-1">
          <router-link to="/students/add_old_students"><button class="btn btn-primary btn-sm float-right">Add Existing Old Students</button></router-link>
        </b-button-group>
      </b-button-toolbar>
      <hr>
    </div> 

    <v-client-table 
        :data="students"
        :columns="columns" 
        :options="options">

        <span slot="fullname" slot-scope="props" > 
          <span>{{props.row.firstname+' '+props.row.lastname}}</span>
        </span>

        <span slot="student_type" slot-scope="props">
          <span v-if="props.row.student_type != 'Old'">New</span>
          <span v-else>{{props.row.student_type}}</span>
        </span>

        <span slot="last_enrolled" slot-scope="props">
          {{$moment().format("MMM D, YYYY")}}
        </span>
        <span slot="view" slot-scope="props" > 
          <router-link :to="'/students/student/'+props.row.user_id"><button class="btn-sm btn btn-primary mr-2" ><span class="fa fa-angle-double-right"></span> View Profile</button></router-link>
          <button @click="deleteStudent(props.row.user_id)" class="btn btn-danger btn-sm">Del</button>
        </span>
        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
    </v-client-table>
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'Students',
  data: () => {
    return{
      primaryModal: false,
      columns: ['user_id', 'fullname', 'course_abb', 'department_abb', 'transferee','student_type','last_enrolled', 'box_number','view' ],
      options: {
          headings: {
            user_id: 'Student ID'
          },
          filterable: true,
          selectedCourse: ''
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
    ...mapActions(['fetchStudents', 'fetchCourses', 'fetchLoggedUser']),
    async getStudentsByCourse(){
      await this.fetchStudents({role_id:6, 'courses.course_id':this.selectedCourse});
    },
    async deleteStudent(id){
      let response = await axios.post(this.$api_url+'user/delete_user', {user_id:id});

      if(response.data.result == "Success"){
        if(parseInt(this.loggedUser.role_id) == 4 || parseInt(this.loggedUser.role_id) == 5){
          await this.fetchStudents({role_id:6, 'users.department_id' : this.loggedUser.department_id});
        } else {
          await this.fetchStudents({role_id:6});
        }
        
        response.data.dismissCountDown = 10;
        bus.$emit('alert_push', response.data);
      }
    }
  },
  computed: {
    ...mapGetters(['students','courses', 'loggedUser'])
  },
  async created() {
    await this.fetchLoggedUser();

    if(parseInt(this.loggedUser.role_id) == 4 || parseInt(this.loggedUser.role_id) == 5){
      await this.fetchStudents({role_id:6, 'users.department_id' : this.loggedUser.department_id});
    } else {
      await this.fetchStudents({role_id:6});
    }

    await this.fetchCourses();
  }
}
</script>

<style>
  .form-inline label{
    display: inline;
    margin: 0 10px 0 0;
  }

  .action-btn{
    padding: 1px 6px;
  }
</style>
