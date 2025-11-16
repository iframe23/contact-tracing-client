<template>
  <div>
    <h4 class="">Add Subjects for {{prospectus.prospectus.prospectus_name}}</h4><hr>
    <h6 class="">{{prospectus.course}} Course</h6><hr>
    <form @submit.prevent="addSubjects()">
      <table class="table table-bordered">
        <thead class="bg-info">
          <tr>
            <th>#</th>
            <th>Subject Code</th>
            <th>Descriptive Title</th>
            <th>Semester</th>
            <th>Year Level</th>
            <th>Type</th>
            <th>Lab Units</th>
            <th>Lec Units</th>
            <th>Units</th>
            <th>Hours/ Week</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody class="td-pad-1">
          <tr v-for="(item, index) in tableItems" v-bind:key="index">
            <td>
              <span class="p-2">{{index+1}}</span>
            </td>
            <td>
              <input type="text" class="form-control" v-model="tableItems[index].subject_code" required>
            </td>
            <td>
              <input type="text" class="form-control" v-model="tableItems[index].descriptive_title" required>
            </td>
            <td>
              <select v-model="tableItems[index].sem_id" class="form-control" required>
                <option label="-Select"></option>
                <option v-for="sem in semester" v-bind:key="sem.sem_id" :value="sem.sem_id">{{sem.sem_name}}</option>
              </select>	
            </td>
            <td>
              <select v-model="tableItems[index].year_level_id" class="form-control" required>
                <option label="-Select"></option>
                <option v-for="year in year_levels" v-bind:key="year.year_level_id" :value="year.year_level_id">{{year.year_level_name}}</option>
              </select>	
            </td>
            <td>
              <select v-model="tableItems[index].type" class="form-control" required>
                <option label="-Select"></option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>	
            </td>
            <td>
              <input type="text" class="form-control" v-model="tableItems[index].lab_units" required>
            </td>
            <td>
              <input type="text" class="form-control" v-model="tableItems[index].lec_units" required>
            </td>
            <td>
              <input type="text" class="form-control" v-model="tableItems[index].units" required>
            </td>
            <td>
              <input type="text" class="form-control" v-model="tableItems[index].hours_week" required>
            </td>
            <td>
              <button @click="removeItem(index)" type="button" class="btn btn-danger action-btn m-1"><span class="fa fa-remove"></span></button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="toolbar"> 
        <input type="number" v-model="toPush" class="form-control m-1">
        <button @click="pushItem(toPush)" type="button" class="btn btn-primary mr-1"><span class="fa fa-plus"></span></button>
        <button @click="reset()" type="button" class="btn btn-warning"><span class="fa fa-history"></span></button>

        <button type="submit" class="btn btn-primary ml-5">Add Subjects</button>
      </div>
    </form>
    
  </div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'

export default {
  name: 'AddSubjects',
  data: () => {
    return{
      alert: {
        type: '',
        result: '',
        message: '',
        dismissCountDown: 0
      },
      prospectus: {},
      tableItems: [],
      year_levels: [],
      semester: [],
      toPush: 1,
      prospectus_id: {
        id: 0
      }
    }
  },
  async created(){
    this.prospectus_id.id = this.$route.params.prospectus_id;
    await school_api.get_year_levels().then(res => this.year_levels = res);
    await school_api.get_semester().then(res => this.semester = res);
    await school_api.get_prospectus(this.prospectus_id).then(res => this.prospectus = res);
    this.pushItem(this.toPush);
  },
  methods: {
    async addSubjects(){
      await school_api.add_subjects(this.tableItems).then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 15

        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.reset();
          bus.$emit('get_subjects', this.alert)
        }
      });
    },
    pushItem(toPush){
      for (let index = 0; index < toPush; index++) {
        let item = {
          subject_code: '',
          descriptive_title: '',
          course_id: this.prospectus.course_id,
          prospectus_id: this.prospectus.prospectus_id,
          year_level_id: '',
          sem_id: '',
          type: '',
          lec_units: '',
          lab_units: '',
          units: '',
          hours_week: ''
        }
        this.tableItems.push(item);
      }
    },
    removeItem(index){
      this.tableItems.splice(index, 1);
    },
    reset(){
      this.tableItems.splice(0, this.tableItems.length+1);
      this.toPush = 1;
      this.pushItem(this.toPush);
    }
  }
}
</script>

<style>
  .td-pad-1 td{
    padding:1px;
  }
  .td-pad-1 td .form-control{
    height: calc(1.5em + 0.75rem );
  }
  .toolbar{
    background-color: #cccccc;
    padding: 3px 0;
  }
  .toolbar .form-control{
    display: inline-block;  
    width: 10%;
  }
</style>
