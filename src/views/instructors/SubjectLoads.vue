<template>
  <div class="thead-primary table-sm">
    <!-- <button @click="loadSubjects()" class="btn btn-primary bm-3">Load Subjects</button><hr> -->
    <h5 class="text-center text-primary">Your Subject Loads for this Current Sem</h5>
    <v-client-table 
        :data="subjectLoads"
        :columns="columns" 
        :options="options">
        <span slot="days" slot-scope="props"> 
          <div v-for="day in props.row.time_scheds" :key="day.time_sched_id">
            {{day.day_abb}}
          </div>
        </span>
        <div class="width-4" slot="time" slot-scope="props"> 
          <div v-for="time in props.row.time_scheds" :key="time.time_sched_id">
            {{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}
          </div>
        </div>
        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
    </v-client-table>
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Students',
  data: () => {
    return{
      primaryModal: false,
      columns: ['subject_code', 'descriptive_title', 'year_level_abb', 'lec_units', 'lab_units', 'units', 'room_name', 'days', 'time'],
      options: {
          headings: {
            user_id: 'Student ID'
          },
          filterable: true
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
    ...mapActions(['fetchSubjectLoads', 'fetchLoggedUser']),
    async loadSubjects(){
      console.log(this.loggedUser)
      await this.fetchSubjectLoads({teacher_id: this.loggedUser.user_id});
    }
  },
  computed: {
    ...mapGetters(['subjectLoads', 'loggedUser'])
  },
  async mounted() {
    await this.fetchLoggedUser()
    await this.fetchSubjectLoads({teacher_id: this.loggedUser.user_id});
  }
}
</script>
