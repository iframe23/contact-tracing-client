<template>
  <div class="thead-primary table-sm">
    <h5>Courses</h5><hr>
    <router-link to="/courses/add_course">
      <button class="btn btn-primary btn-sm mb-3">Add New Course</button>
    </router-link>

     <v-client-table 
          :data="tableData"
          :columns="columns" 
          :options="options">

          <span slot="actions" slot-scope="props" >
            <button class="action-btn btn btn-primary mr-2" @click="editCourse(props.index)"><span class="fa fa-edit"></span></button>
            <button class="action-btn btn btn-danger" v-on:click="deleteCourse(props.row.course_id)"><span class="fa fa-trash"></span></button>
          </span>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>

      <b-modal
        :title="'Edit Course - '+toEdit.course_abb"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false"
        :hide-footer= true
      >
        <form @submit.prevent="submitEditCourse()">
          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Course Name</label>		
              </div>

              <div class="col-4">
                <input type="text" v-model="toEdit.course_name" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Course Abbreviation</label>		
              </div>

              <div class="col-6">
                <input type="text" v-model="toEdit.course_abb" class="form-control" required>
              </div>
            </div>
          </div>

           <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Course Duration</label>		
              </div>

              <div class="col-6">
                 <select v-model="toEdit.duration" class="form-control" required>
                  <option value="1 years">1 years</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                </select>	
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Course Description</label>		
              </div>

              <div class="col-6">
                <textarea v-model="toEdit.course_description" cols="30" rows="5" class="form-control" required></textarea>
              </div>
            </div>
          </div>

           <div class="form-group">
            <div class="row align-items-center">
              <div class="col-2">
                <label>Department</label>		
              </div>

              <div class="col-6">
                <select v-model="toEdit.department_id" class="form-control" required>
                  <option v-for="department in departments" v-bind:key="department.department_id" :value="department.department_id">{{department.department_name}}</option>
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
  name: 'Courses',
  data: () => {
    return{
      primaryModal: false,
      departments: [],
      tableData: [],
      columns: ['course_id', 'course_name', 'course_abb', 'department', 'actions' ],
      options: {
          headings: {
              course_id: 'Course ID',
              course_name: 'Course Name',
              course_abb: 'Abbreviation',
          },
          sortable: ['course_id', 'course_name', 'course_abb', 'department'],
          filterable: ['course_id', 'course_name', 'course_abb', 'department']
      },
      toEdit: {
        course_id: 0,
        course_name: '',
        course_abb: '',
        course_description: '',
        duration: '',
        department_id: 0
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
    editCourse(index) {
      index = index-1;
      this.toEdit.course_id = this.tableData[index].course_id
      this.toEdit.course_name = this.tableData[index].course_name
      this.toEdit.course_abb = this.tableData[index].course_abb
      this.toEdit.course_description = this.tableData[index].course_description
      this.toEdit.duration = this.tableData[index].duration
      this.toEdit.department_id = this.tableData[index].department_id

      this.primaryModal = true
    },
    submitEditCourse() {
      school_api.edit_course(this.toEdit).then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10

        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getCourses();
        }
      });
    },
    getCourses() {
      school_api.get_courses().then(res => this.tableData = res);
    },
    deleteCourse(id){
      user_api.delete_data('course_id', id, 'courses').then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10
        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getCourses();
        }
      });
    }
  },
  async created() {
    this.getCourses()
    school_api.get_departments().then(res => this.departments = res);
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

<style>
  .form-inline label{
    display: inline;
    margin: 0 10px 0 0;
  }

  .action-btn{
    padding: 1px 6px;
    color:#fff;
  }
</style>
