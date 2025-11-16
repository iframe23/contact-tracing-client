<template>
  <div>
    



    <div class="mb-5" v-if="step == 1">
      <h5 class="text-center">Step 1: Select an Old Student to Enroll</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="2" animated></b-progress>
      
      <div class="">
        <form class="form-inline">
          <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
          <div class="input-group mb-2 mr-sm-2 mb-sm-0">
            <div class="input-group-addon align-self-center mr-2">Filter by Course</div>
            <select @change="getStudentsByCourse()" v-model="selectedCourse" class="form-control">
              <option v-for="course in courses" :key="course.course_id" :value="course.course_id">{{course.course_name}}</option>
            </select>
          </div>
        </form><hr>
      </div>
      
      <div class="thead-primary table-sm">
        <v-client-table 
          :data="students"
          :columns="columns" 
          :options="options">

          <span slot="student_name" slot-scope="props">
            <strong>{{props.index}}.</strong> {{props.row.firstname+' '+props.row.lastname}}
          </span>

          <span slot="status" slot-scope="props">
            <span v-if="props.row.account_statement.length != 0">
              <span class="text-danger" v-if="props.row.account_statement[0].status == 'For Downpayment'">{{props.row.account_statement[0].status}}</span>
              <span class="text-warning" v-else-if="props.row.account_statement[0].status == 'For Confirmation'">{{props.row.account_statement[0].status}}</span>
              <span class="text-success" v-else-if="props.row.account_statement[0].status == 'Officially Enrolled'">{{props.row.account_statement[0].status}}</span>
              <span v-else>Not yet Processed</span>
            </span>
            <span v-else>Not yet Processed</span>
          </span>

          <span slot="actions" slot-scope="props">
            <button v-if="props.row.account_statement.length == 0" @click="selectStudent(props.index-1)" class="btn btn-primary btn-sm">Select and Proceed to Enrollment</button>
          </span>

          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
        </v-client-table>
      </div>
    </div>

    <div class="mb-5" v-if="step == 2">
      <h5 class="text-center">Step 2: Enrollment Trial Form Entry</h5>
      <b-progress class="mb-4" :value="step" variant="success" :max="2" animated></b-progress>

      <div class="row">
        <div class="col-3">
          <p><strong>Name:</strong> {{selectedStudent.firstname+' '+selectedStudent.lastname}}</p>
        </div>
        <div class="col-2">
          <p><strong>Course:</strong> {{selectedStudent.course_abb}}</p>
        </div>
        <div class="col-2">
          <form class="form-inline">
            <div class="input-group mr-sm-2 mb-sm-0">
              <div class="input-group-addon align-self-center mr-2"><strong>Year</strong></div>
              <select v-model="selectedStudent.year_level_id" class="form-control form-control-sm">
                <option v-for="year in yearLevels" :key="year.year_level_id" :value="year.year_level_id">{{year.year_level_name}}</option>
              </select>
            </div>
          </form>
        </div>
        <div class="col-5">
          <b-button-toolbar class="float-right" aria-label="Toolbar with button groups and dropdown menu">         
              <b-button-group class="mx-1">
                  <button @click="openCrossEnrollModal()" class="btn btn-primary btn-sm">Cross Enroll</button>
              </b-button-group>
              <b-button-group class="mx-1">
                  <button @click="primaryModal = true" class="btn btn-primary btn-sm">View Trial Form</button>
              </b-button-group>
              <b-button-group class="mx-1">
                  <button v-if="selectedShiftCourseSched == 0" @click="getOtherCourses()" class="btn btn-primary btn-sm">Shift Course</button>
                  <button v-else @click="resetShifting()" class="btn btn-success btn-sm">Cancel Course Shifting</button>
              </b-button-group>
          </b-button-toolbar>
        </div>
      </div><hr>

      <h5 v-if="courseSched != undefined || courseSched != null" class="text-center">
        <span v-if="selectedShiftCourseSched != 0" class="text-success"> Course Transfering - </span>
        {{courseSched.sched_name}}
      </h5>

      <h5 v-if="subjectScheds == undefined || subjectScheds == null || courseSched == undefined || subjectScheds.length == 0" class="text-center text-danger">No Finalized Schedule Yet in your Current Course!</h5>
      <div class="thead-primary table-sm">
        <v-client-table 
        :data="subjectScheds"
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

        <div class="td-pad-2 width-4" slot="time" slot-scope="props" > 
          <div v-for="(time, index) in props.row.time_scheds" :key="index"><span>{{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}</span></div>
        </div>

        <div class="td-pad-2" slot="add" slot-scope="props" > 
          <button v-show="props.row.type == true" @click="remove(props.row.subject_id)" class="action-btn btn btn-danger mr-2"><span class="fa fa-trash"></span></button>
          <button v-show="props.row.type != true" @click="add(props.row)" class="action-btn btn btn-success mr-2"><span class="fa fa-plus"></span></button>
        </div>

          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
        </v-client-table>
      </div><hr>
      <button @click="prev()" class="btn btn-danger mr-2">Go Back</button>
      <button @click="enrollOldStudent()" class="btn btn-success">Submit Trial Form</button>

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
            <button @click="enrollOldStudent()" class="btn btn-success">Submit Trial Form</button>
          </b-button-group>
        </b-button-toolbar>
      </div>
    </div>


    <b-modal
        :title="'Enrollment Trial Form - '+selectedStudent.firstname+' '+selectedStudent.lastname"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false"
        :hide-footer= true
      >
      <h5 v-if="enrolledSubjects.length == 0" class="text-center">No subjects added yet</h5>
      <table class="table table-hover table-bordered table-responsive table-sm">
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
              <button @click="remove(sub.subject_id)" class="action-btn btn btn-danger mr-2"><span class="fa fa-trash"></span></button>
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="enrollOldStudent()" class="btn btn-success">Submit Trial Form</button>
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


    <b-modal
        :title="'Transfer/ Shift Course'"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="md"
        v-model="shiftCourseModal" 
        @ok="shiftCourseModal = false"
        :hide-footer= true
      >
      
      <label for="">Select other Course To Transfer</label>
      <select @change="getShiftCourseSched()" class="form-control" v-model="selectedShiftCourseSched" name="" id="">
        <option v-for="course in otherCourses" :key="course.course_id" :value="course.course_id">{{course.course_name}}</option>
      </select>
      <hr>
    </b-modal>
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {mapActions, mapGetters} from 'vuex'
import {bus} from '../../main'
import axios from 'axios'

export default {
  name: 'User',
  data: ()=> {
    return {
      columns: ['student_name', 'course_abb', 'year_level_name', 'status', 'actions'],
      options: {
          headings: {
            year_level_name: 'Year Level'
          },
          filterable: true
      },
      columns2: ['subject_code', 'descriptive_title', 'year_level', 'semester', 'lec_units', 'lab_units', 'units', 'grade' ],
      options2: {
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
      columns3: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'lec_units', 'lab_units', 'units', 'instructor' , 'days', 'time', 'add'],
      options3: {
          headings: {
            year_level_name: 'Year',
            sem_name: 'Sem'
          },
          filterable: true
      },
      selectedCourse: '',
      selectedStudent: {},
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      primaryModal: false,
      crossEnrollModal: false,
      shiftCourseModal: false,
      roles: [],
      studentData: {
        department_id: 0
      },
      step: 1,
      enrolledSubjects: [],
      enrolledUnits: 0,
      otherCourseScheds: [],
      otherCourses:[],
      selectedOtherCourseSched: '',
      selectedShiftCourseSched: 0,
      otherCourseSched: {
        course_sched: {
          status: ''
        },
        available_subjects: []
      }
    }
  },
  methods: {
    ...mapActions(['fetchSubjectCredential', 'fetchCourses', 'fetchStudents','fetchDepartmentByCourse', 'fetchProspectusByCourse', 'fetchDepartments', 'fetchCoursesByDepartment', 'fetchYearLevels', 'fetchFinalizedCourseSched']),
    async getStudentsByCourse(){
      await this.fetchStudents({role_id:6, 'courses.course_id':this.selectedCourse});
    },
    async selectStudent(index){
      this.selectedStudent = this.students[index]
      console.log(this.selectedStudent)
      await this.getProspectusByCourse()
      this.next();
    },
    next(){
      this.step++;
    },
    prev(){
      this.step--;
    },
    async getProspectusByCourse(){
      await this.fetchFinalizedCourseSched(this.selectedStudent);
      this.enrolledUnits = 0;
      this.enrolledSubjects = []; 
      this.selectedShiftCourseSched = 0;
    },
    async add(row){
      let index = this.subjectScheds.findIndex((element => element.subject_sched_id == row.subject_sched_id))
      let mockdate = '2010-10-19 ';
      let conflict = 0;
      let added = 0;
      let credential = await this.fetchSubjectCredential({
        'transcripts.student_id': this.selectedStudent.user_id,
        'credentials.subject_id': this.subjectScheds[index].subject_id
      });

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

      if(credential.equivalent_grade != 0){
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
      let credential = await this.fetchSubjectCredential({
        'transcripts.student_id': this.selectedStudent.user_id,
        'credentials.subject_id': this.otherCourseSched.available_subjects[index].subject_id
      });
      console.log(this.otherCourseSched.available_subjects[index])
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

      if(credential.equivalent_grade != 0){
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
    async enrollOldStudent(){
      if(this.enrolledSubjects.length < 1){
        let alert = {
          result: 'Please enter A subject',
          type: 'danger',
          message: 'You did not select a subject to be entered for enrollment.!',
          dismissCountDown: 15
        }

        bus.$emit('alert_push', alert);
      } else {
        if(this.selectedShiftCourseSched == 0){
          let oldEnrolleeData = {
            studentData: this.selectedStudent,
            enrolledSubjects: this.enrolledSubjects
          }

          let response = await this.$http.post(this.$api_url+'curriculum/enroll_old_student', oldEnrolleeData);

          if(response.data.result == 'Success'){
            response.data.dismissCountDown = 15;

            bus.$emit('alert_push', response.data);
            this.$router.push('/enrollment/');
          }
        } else {
          let oldEnrolleeData = {
            studentData: this.selectedStudent,
            enrolledSubjects: this.enrolledSubjects
          }

          let response = await this.$http.post(this.$api_url+'curriculum/shift_enroll_old_student', oldEnrolleeData);

          if(response.data.result == 'Success'){
            response.data.dismissCountDown = 15;

            bus.$emit('alert_push', response.data);
            this.$router.push('/enrollment/');
          }

          console.log('shift')
        } 
      }
    },
    sample(props){
      console.log(props)
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
        student :  this.selectedStudent
      }
      const response = await axios.post(this.$api_url+'schedule/other_course_sched', where);
      console.log(response.data);
      this.otherCourseSched = response.data
    },
    async openCrossEnrollModal(){
      await this.getOtherCourseScheds()
      this.crossEnrollModal = true
    },
    async getOtherCourses(){
      const response = await axios.post(this.$api_url+'school/courses', {'course_id !=': this.selectedStudent.course_id});
      console.log(response.data);
      this.otherCourses = response.data
      this.shiftCourseModal = true;
    },
    async getShiftCourseSched(){
      await this.fetchFinalizedCourseSched({course_id : this.selectedShiftCourseSched});

      this.enrolledSubjects = [];
      this.enrolledUnits = 0;
    },
    async resetShifting(){
      await this.fetchFinalizedCourseSched(this.selectedStudent);
      this.selectedShiftCourseSched = 0;
      this.enrolledSubjects = [];
      this.enrolledUnits = 0;
    }
  },
  computed: {
    ...mapGetters(['courses', 'students', 'departmentByCourse', 'departments', 'prospectusByCourse', 'loggedUser', 'yearLevels', 'coursesByDepartment', 'courseSched', 'subjectScheds'])
  },
  async mounted(){
    await this.fetchYearLevels();
    await this.fetchCourses();
    await this.fetchStudents({role_id:6, student_type: 'Old'});
  }
}
</script>
