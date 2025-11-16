<template>
  <div class="table-sm pt-4 container-fluid bg-white thead-primary pb-5">
      <v-client-table class="mb-3"
          :data="residentLogs"
          :columns="columns" 
          :options="options">

          <span slot="#" slot-scope="props" > 
            {{props.index+'.'}}
          </span>
          <span slot="log_time" slot-scope="props" > 
            {{$moment(props.row.log_time).format('lll')}}
          </span>
          <span slot="fullname" slot-scope="props" > 
            {{props.row.firstname+' '+props.row.lastname}}
          </span>
          
          
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import QrcodeVue from 'qrcode.vue'
import {bus, api_url} from '../../main';

export default {
  name: 'Travel History',
  components: {
    QrcodeVue
    },
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        columns: ['#','visiting_point_name', 'visiting_point_address', 'temperature', 'log_time'],
        options: {
            headings: {
                visiting_point_name: 'Visited Location',
            },
            filterable: true
        },
        transcriptModal: false,
        accountSMModal: false,
        hovered: false,
        file: {},
        receiptData:{
        
        },
        primaryModal: false,
        prospect_id: 0,
        alert: {}
    }
  },
  methods: {
    ...mapActions(['fetchLoggedUser', 'fetchResidentLogs']),
  },
  computed: {
    ...mapGetters(['loggedUser', 'residentLogs'])
  },
  async created(){
    await this.fetchLoggedUser()
    await this.fetchResidentLogs({'visit_logs.user_id':this.loggedUser.user_id});
  }
}
</script>

<style>
    .document-empty{
        height: 200px;
    }

    .profile-pic-upload-btn{
        height: 50px;
        margin-top: -50px;
        z-index: 1000;
        background-color: black;
        opacity: .5;
        display: none;
    }

    
</style>