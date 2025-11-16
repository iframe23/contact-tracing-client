<template>
  <div>
    <form @submit.prevent="addUser()">
      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>User Role</label>		
          </div>

          <div class="col-4">
            <select v-model="userData.role_id" class="form-control" required>
              <option v-for="role in roles" v-bind:key="role.role_id" :value="role.role_id">{{role.role_name}}</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Username</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.username" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Password</label>		
          </div>

          <div class="col-6">
            <input type="password" v-model="userData.password" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>First Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.firstname" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Middle Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.middlename" class="form-control" required>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Last Name</label>		
          </div>

          <div class="col-6">
            <input type="text" v-model="userData.lastname" class="form-control" required>
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
                <input class="form-check-input" type="radio" v-model="userData.gender" id="inlineRadio1" value="Male" required> Male
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" v-model="userData.gender" id="inlineRadio2" value="Female" required> Female
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Designation</label>		
          </div>

          <div class="col-4">
            <select v-model="userData.designation_id" class="form-control" required>
              <option v-for='des in designations' v-bind:key="des.designation_id" :value="des.designation_id">{{des.designation_name}}</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Department</label>		
          </div>

          <div class="col-4">
            <select v-model="userData.department_id" class="form-control" required>
              <option v-for='dep in departments' v-bind:key="dep.department_id" :value="dep.department_id">{{dep.department_name}}</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">
            <label>Job Status</label>		
          </div>

          <div class="col-4">
            <select v-model="userData.job_status_id" class="form-control" required>
              <option v-for='job in job_statuses' v-bind:key="job.job_status_id" :value="job.job_status_id">{{job.job_status_name}}</option>
            </select>	
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row align-items-center">
          <div class="col-2">

          </div>

          <div class="col-4">
            <button class="btn btn-primary" type="submit">Add User</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'

export default {
  name: 'AddUser',
  data: () => {
    return{
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      roles: [],
      designations: [],
      departments: [],
      job_statuses: [],
      userData: {
        role_id: '',
        username: '',
        password: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        designation_id: 0,
        department_id: 0,
        job_status_id: 0,
      }
    }
  },
  async created(){
    user_api.get_roles().then(res => this.roles = res);
    user_api.get_designations().then(res => this.designations = res);
    school_api.get_departments().then(res => this.departments = res);
    user_api.get_job_statuses().then(res => this.job_statuses = res);
  },
  computed: {
  },
  methods: {
    addUser(){
       user_api.add_user(this.userData).then(res => {
          this.alert.type = res.type
          this.alert.result = res.result
          this.alert.message = res.message
          this.alert.dismissCountDown = 10
          bus.$emit('alert_push', this.alert)

          if(this.alert.result == 'Success'){
              this.userData.role_id = ''
              this.userData.username= ''
              this.userData.password= ''
              this.userData.firstname= ''
              this.userData.middlename= ''
              this.userData.lastname= ''
              this.userData.gender= ''
              this.userData.designation_id= 0
              this.userData.department_id= 0
              this.userData.job_status_id= 0
          }
       });
    },
  }
}
</script>

<style scoped>

</style>
