<template>
  <div>
    <div class="mb-5" v-if="step == 1">
      <h5 class="text-center">Step 1: Fill up Information</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="2" animated></b-progress>
      
      <form @submit.prevent="next()">
        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>First Name</label>
              <input type="text" v-model="studentData.firstname" class="form-control form-control-sm" required>	
            </div>

            <div class="col-4">
              <label>Middlename</label>
              <input type="text" v-model="studentData.middlename" class="form-control form-control-sm" required>		
            </div>

            <div class="col-4">
              <label>Last Name</label>
              <input type="text" v-model="studentData.lastname" class="form-control form-control-sm" required>		
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Gender</label>
              <select v-model="studentData.gender" class="form-control form-control-sm" required>
                <option value=""></option>
                <option value="Female">Female</option>  
                <option value="Male">Male</option> 
              </select>	
            </div>

            <div class="col-8">
              <label>Address</label>
              <input type="text" v-model="studentData.address" class="form-control form-control-sm" required>		
            </div>
          </div>
        </div><hr>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Birthdate</label>		
              <input type="date" v-model="studentData.birthdate" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Contact Number</label>		
              <input type="tel" v-model="studentData.contact_number" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Email Address</label>		
              <input type="email" v-model="studentData.email" class="form-control form-control-sm" required>
            </div>
          </div>
        </div><hr>

        <h5>Educational Attainment</h5><hr>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Primary School</label>		
              <input type="text" v-model="studentData.primary_school" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Intermediate School</label>		
              <input type="text" v-model="studentData.intermediate_school" class="form-control form-control-sm" required>
            </div>

            <div class="col-4">
              <label>Secondary School</label>		
              <input type="text" v-model="studentData.secondary_school" class="form-control form-control-sm" required>
            </div>
          </div>
        </div><hr>
        
        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-4">
              <label>Is Transferee?</label>
              <select v-model="studentData.transferee" class="form-control form-control-sm" required>
                <option value="Not Transferee">Not Transferee</option>
                <option value="Transferee">Transferee</option>
              </select>
            </div>

            <div class="col-8">
              <div v-if="studentData.transferee == 'Transferee'">
                <label>School Transferred From</label>		
                <input type="text" v-model="studentData.transferred_from" class="form-control form-control-sm" required>
              </div>
            </div>
          </div>
        </div><hr>

        <div class="form-group">
          <div class="row align-items-center">
            <div class="col-5">
              <label>Course</label>		
              <select v-model="studentData.course_id" @change="getDepartmentByCourse({course_id:studentData.course_id})"  class="form-control form-control-sm" required>
                <option v-for="course in courses" :key="course.course_id" :value="course.course_id">{{course.course_name}}</option>  
              </select>	
            </div>

            <div class="col-5">
              <label>Department</label>		
              <select v-model="studentData.department_id" class="form-control form-control-sm" required>
                <option v-for="department in departmentByCourse" :key="department.department_id" :value="department.department_id">{{department.department_name}}</option>   
              </select>	
            </div>

            <div class="col-2">
              <label>Year Level</label>		
              <select v-model="studentData.year_level_id" class="form-control form-control-sm" required>
                <option v-for="year in yearLevels" :key="year.year_level_id" :value="year.year_level_id">{{year.year_level_name}}</option>  
              </select>	
            </div>
          </div>
        </div><hr>

        <button class="btn btn-primary" type="submit">Proceed Next Step</button>
      </form>
    </div>


    <div class="mb-5" v-if="step == 2">
      <h5 class="text-center">Step 2: Evaluate Credentials</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="2" animated></b-progress>

      <div class="row">
        <div class="col-3">
          <p><strong>Name:</strong> {{studentData.firstname+' '+studentData.lastname}}</p>
        </div>
        <div class="col-3">
          <p><strong>Course:</strong> {{prospectus.course}}</p>
        </div>
        <div class="col-6">
          <form class="form-inline">
            <div class="align-items-center form-row">
              <div class="col-auto">
                <label class="mr-sm-2" for="inlineFormCustomSelect"><strong>Select Prospectus</strong></label>
                <select v-model="prospectus_id.id" class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect"  @change="getProspectus()">
                  <option v-for="pros in prospectusesByCourse" :key="pros.prospectus_id" :value="pros.prospectus_id">{{pros.prospectus_name}}</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div><hr>
      
      <div class="thead-primary">
        <v-client-table 
        :data="prospectus.subjects"
        :columns="columns" 
        :options="options">

          <div class="width-1" slot="grade" slot-scope="props" >
            <input type="number" v-model="prospectus.subjects[props.index-1].equivalent_grade" class="form-control">
          </div>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
        </v-client-table>
      </div><hr>
      <button @click="prev()" class="btn btn-danger mr-2">Go Back</button>
      <button @click="addExistingStudent()" class="btn btn-primary">Confirm Adding Existing Student</button>
    </div>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddOldStudents',
  data: () => {
    return{
      columns: ['subject_code', 'descriptive_title', 'year_level', 'semester', 'type', 'lec_units', 'lab_units', 'units', 'grade' ],
      options: {
          headings: {
              subject_code: 'Subject Code',
              descriptive_title: 'Descriptive Title',
              year_level: 'Year Level',
              semester: 'Semester',
              lec_units: 'Lec Units',
              lab_units: 'Lab Units',
              units: 'Units',
          },
          filterable: true
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      roles: [],
      studentData: {
        department_id: 0
      },
      prospectus_id: {
        id: 0
      },
      step: 1,
    }
  },
  methods: {
    ...mapActions(['fetchDepartmentByCourse', 'fetchCourses', 'fetchProspectusesByCourse', 'fetchProspectus', 'fetchCoursesByDepartment', 'fetchYearLevels', 'submitExistingStudent']),
    next(){
      this.step++;
    },
    prev(){
      this.step--;
    },
    async getProspectus(){
      await this.fetchProspectus({prospectus_id: this.prospectus_id.id});
      console.log('shit')
    },
    async getDepartmentByCourse(course){
      await this.fetchDepartmentByCourse(course).then(res => {
        console.log(res)
        this.studentData.department_id = res[0].department_id
      })

      await this.fetchProspectusesByCourse(course);
    },
    async addExistingStudent(){
      let data = {
        studentData : this.studentData,
        credentials : this.prospectus
      }

      let response = await this.submitExistingStudent(data);
      console.log('component')
      console.log(response)

      if(response.result == 'Success'){
        response.dismissCountDown = 25;
        bus.$emit('alert_push', response);
        this.$router.push('/students/');
      }
    }
  },
  async created(){
    //user_api.get_roles().then(res => this.roles = res);
    await this.fetchCourses();
    await this.fetchYearLevels  ();
  },
  computed: {
    ...mapGetters(['departmentByCourse', 'courses', 'prospectus', 'prospectusesByCourse', 'yearLevels']),
  }
}
</script>

<style scoped>

</style>
