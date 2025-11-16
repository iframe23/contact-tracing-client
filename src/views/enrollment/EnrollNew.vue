<template>
  <div>
    
    <div class="mb-5" v-if="step == 1">
      <h5 class="text-center">Step 1: Fill up Information</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="3" animated></b-progress>
      
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


    <div class="mb-5 table-sm" v-if="step == 2">
      <h5 class="text-center">Step 2: Evaluate Credentials</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="3" animated></b-progress>

      <div class="row">
        <div class="col-3">
          <p><strong>Name:</strong> {{studentData.firstname+' '+studentData.lastname}}</p>
        </div>
        <div class="col-3">
          <p><strong>Course:</strong> {{prospectusByCourse.course}}</p>
        </div>
        <div class="col-3">
          
        </div>
      </div><hr>
      <h5 class="text-center">{{prospectusByCourse.prospectus_name}}</h5>
      <div class="thead-primary">
        <v-client-table 
        :data="prospectusByCourse.subjects"
        :columns="columns" 
        :options="options">

          <div class="width-1" slot="grade" slot-scope="props" >
            <input type="number" v-model="prospectusByCourse.subjects[props.index-1].equivalent_grade" class="form-control form-control-sm">
          </div>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
        </v-client-table>
      </div><hr>
      <button @click="prev()" class="btn btn-danger mr-2">Go Back</button>
      <button @click="next()" class="btn btn-primary">Proceed Next Step</button>
    </div>

    <div class="mb-5 table-sm" v-if="step == 3">
      <h5 class="text-center"><span v-if="studentData.transferee == 'Not Transferee'">Step 2</span> <span v-else> Step 3</span>: Enrollment Trial Form</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="3" animated></b-progress>

      <div class="row">
        <div class="col-3">
          <p><strong>Name:</strong> {{studentData.firstname+' '+studentData.lastname}}</p>
        </div>
        <div class="col-3">
          <p><strong>Course:</strong> {{prospectusByCourse.course}}</p>
        </div>
        <div class="col-3">
          <p><strong>Prospectus:</strong> {{prospectusByCourse.prospectus_name}}</p>
        </div>
        <div class="col-3">
          <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">         
              <b-button-group class="mx-1">
                  <button @click="openCrossEnrollModal()" class="btn btn-primary btn-sm">Cross Enroll</button>
              </b-button-group>
              <b-button-group class="mx-1">
                  <button @click="primaryModal = true" class="btn btn-primary btn-sm">View Trial Form</button>
              </b-button-group>
          </b-button-toolbar>
        </div>
      </div><hr>

      <h5 v-if="courseSched != undefined || courseSched != null" class="text-center">{{courseSched.sched_name}}</h5>

      <h5 v-if="subjectScheds == undefined || subjectScheds == null || courseSched == undefined || subjectScheds.length == 0" class="text-center text-danger">No Finalized Schedule Yet in this Course!</h5>
      <div class="thead-primary">
        <v-client-table 
        :data="subjectScheds"
        :columns="columns2" 
        :options="options2">

         <div class="width-3" slot="descriptive_title" slot-scope="props" > 
           <span>{{props.row.descriptive_title}}</span>
        </div>


        <div class="td-pad-2 width-2" slot="instructor" slot-scope="props" > 
          <span>{{props.row.firstname+' '+props.row.lastname}}</span>	 
        </div>

        <div class="td-pad-2" slot="days" slot-scope="props" > 
          <div v-for="(day, index) in props.row.time_scheds" :key="index"><span>{{day.day_abb}}</span></div>
        </div>

        <div class="td-pad-2 width-4" slot="time" slot-scope="props" > 
          <div v-for="(time, index) in props.row.time_scheds" :key="index"><span>{{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}</span></div>
        </div>

        <div class="td-pad-2" slot="add" slot-scope="props" > 
          <button v-if="props.row.type == true" @click="remove(props.row.subject_id)"  class="action-btn btn btn-danger mr-2"><span class="fa fa-remove"></span></button>
          <button v-else @click="add(props.row)" class="action-btn btn btn-success mr-2"><span class="fa fa-plus"></span></button>
        </div>

          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
        </v-client-table>
      </div><hr>
      <button @click="prev()" class="btn btn-danger mr-2">Go Back</button>
      <button @click="enrollNewStudent()" class="btn btn-primary">Submit Trial Form</button>

      <div class="bg-info p-1 floating-toolbar">
        <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
          <b-button-group class="mx-1">
            <b-button><strong class="text-primary">{{enrolledSubjects.length}}</strong></b-button>
            <b-button>Enrolled Subjects in the Trial Form</b-button>
          </b-button-group>
          <b-button-group class="mx-1">
            <b-button @click="primaryModal=true">Open <span class="color-black fa fa-angle-double-right"></span></b-button>
          </b-button-group>
          <b-button-group class="mx-1">
            <button @click="enrollNewStudent()" class="btn btn-success">Submit Trial Form</button>
          </b-button-group>
        </b-button-toolbar>
      </div>
    </div>


    <b-modal
        :title="'Enrollment Trial Form - '+studentData.firstname+' '+studentData.lastname"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false"
        :hide-footer= true
      >
      <h5 v-if="enrolledSubjects.length == 0" class="text-center">No subjects added yet</h5>
      <table class="table table-hover table-bordered table-responsive">
        <thead class="bg-info">
          <tr>
            <th>#</th>
            <th>Subject Code</th>
            <th class="width-3">
              <div class="width-3">
                Descriptive Title
              </div>
            </th>
            <th>Lec Units</th>
            <th>Lab Units</th>
            <th>Units</th>
            <th>Hrs/ Week</th>
            <th>Instructor</th>
            <th>Room</th>
            <th>Days</th>
            <th class="width-2">
              <div class="width-2">
                Time
              </div> 
            </th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sub, index) in enrolledSubjects" :key="index">
            <td>{{index+1}}</td>
            <td>{{sub.subject_code}}</td>
            <td>{{sub.descriptive_title}}</td>
            <td>{{sub.lec_units}}</td>
            <td>{{sub.lab_units}}</td>
            <td>{{sub.units}}</td>
            <td>{{sub.hours_week}}</td>
            <td>{{sub.firstname+' '+sub.lastname}}</td>
            <td>{{sub.room_name}}</td>
            <td>
              <div v-for="time in sub.time_scheds" :key="time.time_sched_id">{{time.day_abb}}</div>
            </td>
            <td>
              <div v-for="time in sub.time_scheds" :key="time.time_sched_id">
                <span>{{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}</span>
              </div>
            </td>
            <td>
              <button @click="remove(sub.subject_id)" class="action-btn btn btn-danger mr-2"><span class="fa fa-remove"></span></button>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="enrollNewStudent()" class="btn btn-success">Submit Trial Form</button>
    </b-modal>

    <b-modal
        :title="'Cross Enrollment'"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="crossEnrollModal" 
        @ok="crossEnrollModal = false"
        :hide-footer= true
      >
      <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1">
          <label class="mr-2 align-self-center mb-0" for="">Select from Other Course Schedules</label>
        </b-button-group>
        <b-button-group class="mx-1">
          <select @change="getOtherCourseSched()" class="form-control" v-model="selectedOtherCourseSched" name="" id="">
            <option v-for="courseSched in otherCourseScheds" :key="courseSched.schedule_id" :value="courseSched.schedule_id">{{courseSched.sched_name}}</option>
          </select>
        </b-button-group>
      </b-button-toolbar><hr>
      <h5 v-if="otherCourseSched.available_subjects.length == 0" class="text-center">Please Select Schedules from Other Courses</h5>
      <h5 v-else-if="otherCourseSched.course_sched.status != 'Finalized' && otherCourseSched.available_subjects.length != 0" class="text-center text-danger">This schedule is not finalized yet</h5>
      <h5 v-else class="text-center text-primary">These are the available subject schedules you can cross enroll</h5>
      <div class="thead-primary table-sm">
        <v-client-table 
            :data="otherCourseSched.available_subjects"
            :columns="columns3" 
            :options="options3">

            <div class="width-3" slot="descriptive_title" slot-scope="props" > 
              <span>{{props.row.descriptive_title}}</span>
            </div>


            <div class="td-pad-2 width-2" slot="instructor" slot-scope="props" > 
              <span>{{props.row.firstname+' '+props.row.lastname}}</span>	 
            </div>

            <div class="td-pad-2" slot="days" slot-scope="props" > 
              <div v-for="(day, index) in props.row.time_scheds" :key="index"><span>{{day.day_abb}}</span></div>
            </div>

            <div class="td-pad-2 width-2" slot="time" slot-scope="props" > 
              <div v-for="(time, index) in props.row.time_scheds" :key="index"><span>{{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}</span></div>
            </div>

            <div class="td-pad-2" slot="add" slot-scope="props" > 
              <button v-show="props.row.type == true" @click="remove(props.row.subject_id)" class="action-btn btn btn-danger mr-2"><span class="fa fa-trash"></span></button>
              <button v-show="props.row.type != true" @click="addCross(props.row)" class="action-btn btn btn-success mr-2"><span class="fa fa-plus"></span></button>
        </div>
            <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
        </v-client-table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'

export default {
  name: 'AddUser',
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
      columns2: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'type', 'lec_units', 'lab_units', 'units', 'instructor' , 'days', 'time', 'add'],
      options2: {
          headings: {
            year_level_name: 'Year',
            sem_name: 'Sem'
          },
          filterable: true
      },
      columns3: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'lec_units', 'lab_units', 'units', 'instructor' , 'days', 'time', 'add'],
      options3: {
          headings: {
            year_level_name: 'Year',
            sem_name: 'Sem'
          },
          filterable: true
      },
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      primaryModal: false,
      crossEnrollModal: false,
      roles: [],
      studentData: {
        department_id: 0
      },
      step: 1,
      enrolledSubjects: [],
      enrolledUnits: 0,
       otherCourseScheds: [],
      selectedOtherCourseSched: '',
      otherCourseSched: {
        course_sched: {
          status: ''
        },
        available_subjects: []
      }
    }
  },
  async mounted(){
    await this.fetchYearLevels();
    await this.fetchDepartments();
    await this.fetchCourses();
  },
  computed: {
    ...mapGetters(['departmentByCourse', 'courses', 'departments', 'prospectusByCourse', 'loggedUser', 'yearLevels', 'coursesByDepartment', 'courseSched', 'subjectScheds']),
  },
  methods: {
    ...mapActions(['fetchDepartmentByCourse', 'fetchCourses', 'fetchProspectusByCourse', 'fetchDepartments', 'fetchCoursesByDepartment', 'fetchYearLevels', 'fetchFinalizedCourseSched']),
    next(){
      this.step++;
      if(this.studentData.transferee != 'Transferee'){
        this.step++
      }
      console.log(this.studentData)
    },
    prev(){
      this.step--;
      if(this.studentData.transferee != 'Transferee'){
        this.step--
      }
    },
    getProspectusByCourse(){
      this.fetchProspectusByCourse(this.studentData);
      this.fetchFinalizedCourseSched(this.studentData);
    },
    async getDepartmentByCourse(course){
      await this.fetchDepartmentByCourse(course).then(res => {
        console.log(res)
        this.studentData.department_id = res[0].department_id
      })

      await this.fetchProspectusByCourse(course);
      await this.fetchFinalizedCourseSched(this.studentData);
    },
    add(row){
      let index = this.subjectScheds.findIndex((element => element.subject_sched_id == row.subject_sched_id))
      let mockdate = '2010-10-19 ';
      let conflict = 0;
      let credited = 0;
      let added = 0;
      
      console.log(this.$moment('2010-10-19 08:00:00').isBetween('2010-10-19 05:00:00', '2010-10-19 08:00:00'));
      for (let i = 0; i < this.prospectusByCourse.subjects.length; i++) {
        if((this.prospectusByCourse.subjects[i].equivalent_grade != 0 && 
            this.prospectusByCourse.subjects[i].equivalent_grade != "" && 
            this.prospectusByCourse.subjects[i].equivalent_grade != null) &&
            this.prospectusByCourse.subjects[i].subject_id == this.subjectScheds[index].subject_id
          ){
            credited++;
        }
      }

      for (let i = 0; i < this.enrolledSubjects.length; i++) {
        if(this.enrolledSubjects.length != 0){
          if(this.enrolledSubjects[i].subject_id == this.subjectScheds[index].subject_id){
            added++;
          }

          this.enrolledSubjects[i].time_scheds.forEach(i => {
            this.subjectScheds[index].time_scheds.forEach(i2 => {
              if(i.day_abb == i2.day_abb && (
                this.$moment(mockdate+i.time_start).isBetween(mockdate+i2.time_start, mockdate+i2.time_end) ||
                this.$moment(mockdate+i.time_end).isBetween(mockdate+i2.time_start, mockdate+i2.time_end) ||
                this.$moment(mockdate+i2.time_start).isBetween(mockdate+i.time_start, mockdate+i.time_end) ||
                this.$moment(mockdate+i2.time_end).isBetween(mockdate+i.time_start, mockdate+i.time_end)
              )){
                conflict++;
              }
            })
          });
          
        }
      }

      if(credited != 0){
        let alert = {
          result: 'Already Credited',
          type: 'danger',
          message: 'You already credited the selected subject!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if(added != 0){
        let alert = {
          result: 'Already Added',
          type: 'danger',
          message: 'You already added the selected subject in the Trial Form!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if (conflict != 0){
        let alert = {
          result: 'Subject Conflict',
          type: 'danger',
          message: 'This Subject has a conflict on the Enrolled Subjects in the Trial Form!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if (this.enrolledUnits + parseInt(this.subjectScheds[index].units) > 30){
        let alert = {
          result: 'Cannot Exceed More than 30 units',
          type: 'danger',
          message: 'Units acquired for enrollment cannot exceed above 30!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      }  
      else {
        this.enrolledSubjects.push(row);
        this.enrolledUnits = this.enrolledUnits + parseInt(this.subjectScheds[index].units);
        this.subjectScheds[index].type = true
        console.log(this.subjectScheds[index])
        let alert = {
          result: 'Added Successfully',
          message: this.subjectScheds[index].descriptive_title+' has been added in Trial Form',
          type: 'success',
          dismissCountDown: 5
        }

        bus.$emit('alert_push', alert)
        console.log(this.enrolledUnits)
      }
    },
    remove(subject_id){
      let index1 = this.enrolledSubjects.findIndex((element => element.subject_id == subject_id))
      let index2 = this.subjectScheds.findIndex((element => element.subject_id == subject_id))
      let index3 = this.otherCourseSched.available_subjects.findIndex((element => element.subject_id == subject_id))

      let alert = {
        result: 'Subject Removed',
        message: this.enrolledSubjects[index1].descriptive_title+' has been removed in Trial Form',
        type: 'danger',
        dismissCountDown: 5
      }

      bus.$emit('alert_push', alert)

      console.log(index2)
      console.log(index3)
      this.subjectScheds[index2].type = false
      if(this.otherCourseSched.available_subjects[index3] != undefined){
        this.otherCourseSched.available_subjects[index3].type = false
      }
      this.enrolledUnits = this.enrolledUnits - parseInt(this.enrolledSubjects[index1].units);
      this.enrolledSubjects.splice(index1, 1);
    },
    async addCross(row){
      let index = this.otherCourseSched.available_subjects.findIndex((element => element.subject_sched_id == row.subject_sched_id))
      let mockdate = '2010-10-19 ';
      let conflict = 0;
      let added = 0;
      let credited = 0;
      console.log(this.otherCourseSched.available_subjects[index])

      for (let i = 0; i < this.prospectusByCourse.subjects.length; i++) {
        if((this.prospectusByCourse.subjects[i].equivalent_grade != 0 && 
            this.prospectusByCourse.subjects[i].equivalent_grade != "" && 
            this.prospectusByCourse.subjects[i].equivalent_grade != null) &&
            this.prospectusByCourse.subjects[i].subject_id == this.subjectScheds[index].subject_id
          ){
            credited++;
        }
      }

      for (let i = 0; i < this.enrolledSubjects.length; i++) {
        if(this.enrolledSubjects.length != 0){
          if(this.enrolledSubjects[i].subject_id == this.otherCourseSched.available_subjects[index].subject_id){
            added++;
          }

          this.enrolledSubjects[i].time_scheds.forEach(i => {
            this.otherCourseSched.available_subjects[index].time_scheds.forEach(i2 => {
              if(i.day_abb == i2.day_abb && (
                this.$moment(mockdate+i.time_start).isBetween(mockdate+i2.time_start, mockdate+i2.time_end) ||
                this.$moment(mockdate+i.time_end).isBetween(mockdate+i2.time_start, mockdate+i2.time_end) ||
                this.$moment(mockdate+i2.time_start).isBetween(mockdate+i.time_start, mockdate+i.time_end) ||
                this.$moment(mockdate+i2.time_end).isBetween(mockdate+i.time_start, mockdate+i.time_end)
              )){
                conflict++;
              }
            })
          });
          
        }
      }

      if(credited != 0){
        let alert = {
          result: 'Already Credited',
          type: 'danger',
          message: 'Select subject has already have a grade. It is possible that the student have already taken this subject previously, or have been already credited!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if(added != 0){
        let alert = {
          result: 'Already Added',
          type: 'danger',
          message: 'You already added the selected subject in the Trial Form!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if (conflict != 0){
        let alert = {
          result: 'Subject Conflict',
          type: 'danger',
          message: 'This Subject has a conflict on the Enrolled Subjects in the Trial Form!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      } else if (this.enrolledUnits + parseInt(this.otherCourseSched.available_subjects[index].units) > 30){
        let alert = {
          result: 'Cannot Exceed More than 30 units',
          type: 'danger',
          message: 'Units acquired for enrollment cannot exceed above 30!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert)
      }  
      else {
        this.enrolledSubjects.push(row);
        this.enrolledUnits = this.enrolledUnits + parseInt(this.otherCourseSched.available_subjects[index].units);
        this.otherCourseSched.available_subjects[index].type = true

        let alert = {
          result: 'Added Successfully',
          message: this.otherCourseSched.available_subjects[index].descriptive_title+' has been added in Trial Form',
          type: 'success',
          dismissCountDown: 5
        }

        bus.$emit('alert_push', alert)
        console.log(this.enrolledUnits)
      }
    },
    async enrollNewStudent(){
      if(this.enrolledSubjects.length < 1){
        let alert = {
          result: 'Please enter A subject',
          type: 'danger',
          message: 'You did not select a subject to be entered for enrollment!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert);
      } else {
          let newEnrolleeData = {
            studentData: this.studentData,
            credentials: this.prospectusByCourse,
            enrolledSubjects: this.enrolledSubjects
          }

          let response = await this.$http.post(this.$api_url+'curriculum/enroll_new_student', newEnrolleeData);

          if(response.data.result == 'Success'){
            response.data.dismissCountDown = 15;

            bus.$emit('alert_push', response.data);
            this.$router.push('/enrollment/');
          }
      }
    },
    async getOtherCourseScheds(){
      let where = {
        'schedule_id !=' : this.courseSched.schedule_id,
        school_year : this.courseSched.school_year,
        'schedules.sem_id' : this.courseSched.sem_id
      }
      const response = await axios.post(this.$api_url+'schedule/course_schedules', where);
      console.log(response.data);
      this.otherCourseScheds = response.data
    },
    async getOtherCourseSched(){
      let where = {
        schedule_id : this.selectedOtherCourseSched,
        prospectus_id : this.prospectusByCourse.prospectus_id
      }
      const response = await axios.post(this.$api_url+'schedule/other_course_sched', where);
      console.log(response.data);
      this.otherCourseSched = response.data
    },
    async openCrossEnrollModal(){
      await this.getOtherCourseScheds()
      this.crossEnrollModal = true
    },
  }
}
</script>

<style scoped>

</style>
