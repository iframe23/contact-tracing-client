<template>
  <div class="thead-primary">
    <div>
        <h4 class="">
          <span>Schedules for each Courses - Current Sem - </span>
          {{currentSem.sem_name+' -SY '+currentSY}}
        </h4><hr>
    </div>

     <v-client-table 
          :data="scheds"
          :columns="columns" 
          :options="options">

          <span slot="status" slot-scope="props" > 
            <span class="text-success" v-if="props.row.status == 'Finalized'">{{props.row.status}}</span>
            <span class="text-danger" v-else>{{props.row.status}}</span>
          </span>

          <span slot="actions" slot-scope="props" > 
            <router-link :to="'/schedules/schedule/'+props.row.schedule_id">
              <button class="btn-sm btn btn-primary mr-2">View Course Schedule <span class="fa fa-angle-double-right"></span></button>
            </router-link>
          </span>

      </v-client-table>
  </div>
</template>

<script>
import {school_api, user_api} from '../../shared/api'
import {bus} from '../../main'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Schedules',
  data: () => {
    return{
      primaryModal: false,
      tableData: [],
      columns: ['schedule_id', 'course', 'sched_name', 'school_year', 'semester', 'status', 'actions' ],
      options: {
          headings: {
              schedule_id: 'Schedule ID',
              sched_name: 'Schedule Name',
              course: 'Course',
              school_year: 'School Year',
              semester: 'Semester',
              status: 'Status',
          },
          sortable: ['schedule_id', 'sched_name', 'course', 'school_year', 'semester', 'status'],
          filterable: ['schedule_id', 'sched_name', 'course', 'school_year', 'semester', 'status']
      },
      toEdit: {
        room_id: 0,
        room_name: '',
        room_pic: '',
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
    ...mapActions(['fetchCurrentSY', 'fetchCurrentSem', 'loadCurrentScheds']),
    editRoom(index) {
      index = index-1;
      this.toEdit.room_id = this.tableData[index].room_id
      this.toEdit.room_name = this.tableData[index].room_name
      this.toEdit.room_pic = this.tableData[index].room_pic

      this.primaryModal = true
    },
    submitEditRoom() {
      school_api.edit_room(this.toEdit).then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10
        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getRooms();
        }
      });
    },
    getRooms() {

    },
    deleteRoom(id){
      user_api.delete_data('room_id', id, 'rooms').then(res => {
        this.alert.type = res.type,
        this.alert.result = res.result,
        this.alert.message = res.message,
        this.alert.dismissCountDown = 10
        bus.$emit('alert_push', this.alert)

        if(res.result == 'Success'){
          this.primaryModal = false
          this.getRooms();
        }
      });
    }
  },
  async created() {
    this.loadCurrentScheds();
  },
  computed: {
    ...mapGetters(['currentSY', 'currentSem', 'scheds'])
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
  }
</style>
