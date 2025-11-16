<template>
  <div class="thead-primary table-sm pt-4 container-fluid bg-white thead-primary">
    <div class="row">
        <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
        <div class="col-md-4 pr-md-5">
            <div class="position-relative mb-4">
                <img v-if="user.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'+user.profile_pic" />
                <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                <div v-if="hovered==true">
                    <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                        <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="d-flex align-items-center">
                <h2 class="m-0">
                    {{user.firstname+' '+user.middlename+' '+user.lastname}}
                </h2>
            </div>
            <p class="h5 text-primary mt-2 d-block font-weight-light">
            </p>

            <section class="mt-4">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="User Information" active>
                                <b-card-text>
                                    <h5 class="text-primary">
                                        Personal Information
                                    </h5>
                                    <dl class="row mt-4">
                                        <dt class="col-sm-3">Phone</dt>
                                        <dd class="col-sm-9">{{user.contact_number}}</dd>
                                        
                                        <dt class="col-sm-3">Home address</dt>
                                        <dd class="col-sm-9">

                                                {{user.address}}

                                        </dd>
                                        
                                        <dt class="col-sm-3">Email address</dt>
                                        <dd class="col-sm-9">
                                            <a href="mailto:aang.is.kefy@gmail.com">{{user.email}}</a>
                                        </dd>

                                        <dt class="col-sm-3">Gender</dt>
                                        <dd class="col-sm-9">{{user.gender}}</dd>

                                        <dt class="col-sm-3">Birthdate</dt>
                                        <dd class="col-sm-9">{{user.birthdate}}</dd>

                                        <dt class="col-sm-3">Health Status</dt>
                                        <dd class="col-sm-9">
                                            <span class="text-primary" v-if="user.health_status == 'Negative'">{{user.health_status}}</span>
                                            <span class="text-danger" v-else-if="user.health_status == 'Positive'">{{user.health_status}}</span>
                                            <span class="text-success" v-else-if="user.health_status == 'Recovered'">{{user.health_status}}</span>
                                            <span class="text-warning" v-else-if="user.health_status == 'Deceased'">{{user.health_status}}</span>
                                        </dd>
                                    </dl>
                                    

                                </b-card-text>
                            </b-tab>

                            <b-tab title="Health Logs">
                                <b-card-text class="logs">
                                    <h5 class="text-primary mb-4">
                                        Health Change Logs
                                    </h5>
                                    <dl v-for="(i, index) in healthLogs" class="border-bottom">
                                        <div>
                                            <p class="d-flex align-items-center mb-1 mt-3">
                                                <strong>{{index+1}}</strong>. Deemed 
                                                <span class="text-primary ml-1 mr-1" v-if="i.health_status == 'Negative'"> {{i.health_status}} </span>
                                                <span class="text-danger ml-1 mr-1" v-else-if="i.health_status == 'Positive'"> {{i.health_status}} </span>
                                                <span class="text-success ml-1 mr-1" v-else-if="i.health_status == 'Recovered'"> {{i.health_status}} </span>
                                                <span class="text-warning ml-1 mr-1" v-else-if="i.health_status == 'Deceased'"> {{i.health_status}} </span>
                                                 on {{$moment(i.date_changed).format('LL')}}  --> 
                                                <b-button @click="openContactsModal(i)" v-if="i.health_status == 'Positive'" variant="link">(View Contacts)</b-button>
                                            </p>        
                                        </div>      
                                    </dl>
                                </b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </section>
        </div>
    </div>
    
    <div class="border border-left-0 border-right-0 mb-1">
        <div class="row">
            <div class="col-8">
                <div>
                    <h5 class="text-primary pb-2 pt-2 mt-0 mb-1">Travel History</h5>
                </div>
            </div>
            <div class="col-4">
                <div class="d-flex justify-content-end align-items-center">
                   <button @click="travelHistoryModal = true" class="mt-1 btn btn-secondary"><span class="fa fa-print"></span></button>
                </div>
            </div>
        </div>
    </div>
    
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
            
          <span slot="actions" slot-scope="props" > 
            <button class="action-btn btn btn-primary m-1" @click="traceContacts(props.row.log_id)">Trace Contacts <span class="fa fa-edit"></span></button>
            <button class="action-btn btn btn-danger" @click="viewGPS(props.row.log_id)"><span class="fa fa-map-marker-alt"></span></button>
          </span>
          <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
      </v-client-table>


      <b-modal v-if="primaryModal == true"
        :title="'Traced Contacts Report '"
        variant="primary"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="primaryModal" 
        @ok="primaryModal = false"
        :hide-footer= true
      >
        <div class="border border-left-0 border-right-0 mb-2">
            <div class="row">
                <div class="col-10">
                    <div>
                        <h5 class="text-primary pb-2 pt-2 mt-0 mb-1">Individuals in contact with {{user.firstname+' '+user.lastname+' at '+residentLogs[selectedLog].visiting_point_name+' on '+$moment(this.residentLogs[selectedLog].log_time).format('MMMM D, YYYY')}}</h5>
                    </div>
                </div>
                <div class="col-2">
                    <div class="d-flex justify-content-end align-items-center">
                    <button @click="tracedContactsModal = true" class="mt-1 btn btn-secondary"><span class="fa fa-print"></span></button>
                    </div>
                </div>
            </div>
        </div>
        
            <v-client-table class="mb-3"
                :data="contactLogs"
                :columns="columns2" 
                :options="options2">

                <span slot="#" slot-scope="props" > 
                    {{props.index+'.'}}
                </span>

                <span slot="fullname" slot-scope="props" > 
                    {{props.row.firstname+' '+props.row.lastname}}
                </span>
                
                <span slot="log_time" slot-scope="props" > 
                    {{$moment(props.row.log_time).format('lll')}}
                </span>

                <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
            </v-client-table>
      </b-modal>

      <b-modal
        :title="'Travel History of '+user.firstname+' '+user.lastname"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="travelHistoryModal" 
        @ok="travelHistoryModal = false"
        :hide-footer= true
        variant="primary"
        body-bg-variant="secondary"
        >
            <div class="card">
                <embed class="pdf-viewer" :src="this.$api_url+'printable/print_travel_history/'+user.user_id" />
            </div>
        </b-modal>


        <b-modal v-if="tracedContactsModal == true"
        :title="'Traced Contacts Report (Print Page)'"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="tracedContactsModal" 
        @ok="tracedContactsModal = false"
        :hide-footer= true
        variant="primary"
        body-bg-variant="secondary"
        >
            <div class="card">
                <embed class="pdf-viewer" :src="this.$api_url+'printable/print_traced_contacts/'+residentLogs[selectedLog].visiting_point_id+'/'+$moment(this.residentLogs[selectedLog].log_time).format('YYYY-MM-DD')+'/'+this.residentLogs[selectedLog].user_id" />
            </div>
        </b-modal>


        <b-modal
        :title="'Visiting Log GPS Location'"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="GPSModal" 
        @ok="GPSModal = false"
        :hide-footer= true
        variant="primary"
        body-bg-variant="secondary"
        >
            <div class="card">
                <GmapMap
                    :center="{lat:parseFloat(markers[0].position.lat), lng:parseFloat(markers[0].position.lng)}"
                    :zoom="16"
                    map-type-id="roadmap"
                    style="width: 100%; height: 400px"
                    >
                    <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                        :label="m.label"
                    />
                </GmapMap>
            </div>
        </b-modal>

        <b-modal
        :title="'Contacts made on this date '+$moment(selectedHealthLog.date_changed).format('LL')"
        header-bg-variant="primary"
        content-class="border-primary"
        size="xl"
        v-model="contactsModal" 
        @ok="contactsModal = false"
        :hide-footer= true
        variant="primary"
        body-bg-variant="secondary"
        >
            <button @click="sendNotif()" class="btn btn-primary">Send Notification to all Persons in Contact</button><hr>

            <div v-for="(i, index) in contacts" class="border border-primary  mb-1">
                <table class="table rounded m-0">
                    <tbody>
                        <tr class="bg-white rounded">
                            <th>{{index+1}}</th>
                            <td>{{i.visiting_point_name}}</td>
                            <td>{{i.visiting_point_address}}</td>
                            <td>{{i.visiting_point_type}}</td>
                            <td>{{i.temperature}}</td>
                            <td>
                                <b-button v-b-toggle.collapse-1 variant="primary" class="btn-sm">View Contacts</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <b-collapse id="collapse-1" class="mt-0 ml-5">
                    <b-card class="mb-0">
                    <p class="card-text text-primary">List of persons in contact</p>
                    <table class="table">
                        <tbody>
                            <tr class="bg-white rounded" v-for="(j, index) in i.contacts">
                                <th>{{index+1}}</th>
                                <td>{{j.firstname+' '+j.lastname}}</td>
                                <td>{{j.contact_number}}</td>
                                <td>{{j.email}}</td>
                                <td>{{j.temperature}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </b-card>
                </b-collapse>
            </div>
        </b-modal>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import QrcodeVue from 'qrcode.vue'
import {bus, api_url} from '../../main';

export default {
  name: 'Resident Logs',
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
        primaryModal: false,
        travelHistoryModal : false,
        tracedContactsModal : false,
        columns: ['#','visiting_point_name', 'visiting_point_type', 'visiting_point_address', 'temperature', 'log_time', 'actions'],
        options: {
            headings: {
                visiting_point_name: 'Visited Location',
            },
            filterable: true
        },
        columns2: ['#','fullname', 'address','contact_number','email', 'temperature', 'log_time'],
        options2: {
            headings: {
                fullname: 'Name',
            },
            filterable: true
        },
        hovered: false,
        file: {},
        selectedLog: 0,
        primaryModal: false,
        GPSModal: false,
        contactsModal: false,
        prospect_id: 0,
        alert: {},
        markers: [{
            position: {
                lat: '',
                lng: '',
            },
            label: {
                text: 'unknown',
                color: "white",
                fontWeight: "normal",
                fontSize: "14px"
            }
        }],
        selectedHealthLog: {}
    }
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchResidentLogs', 'fetchContactLogs', 'fetchContacts', 'fetchHealthLogs', 'sendNotification']),
    async traceContacts(id) {
        
        let index = this.residentLogs.findIndex((element => element.log_id == id));
        this.selectedLog = index
        
        console.log(this.$moment(this.residentLogs[index].log_time).format('YYYY-MM-DD'))
        let where = {
            visiting_point_id : this.residentLogs[index].visiting_point_id,
            log_time : this.$moment(this.residentLogs[index].log_time).format('YYYY-MM-DD'),
            user_id: this.residentLogs[index].user_id           
        }

        await this.fetchContactLogs(where)

        this.primaryModal = true
    },
    async viewGPS(id) {
        
        let index = this.residentLogs.findIndex((element => element.log_id == id));
        this.selectedLog = index

        this.markers[0].position.lat = parseFloat(this.residentLogs[index].latitude)
        this.markers[0].position.lng = parseFloat(this.residentLogs[index].longitude)
        this.markers[0].label.text = this.residentLogs[index].visiting_point_name
        console.log(this.markers[0])
        this.GPSModal = true
    },
    async openContactsModal(i){
        this.selectedHealthLog = i
        console.log(this.selectedHealthLog)
        this.contactsModal = true
        await this.fetchContacts(this.selectedHealthLog)
        console.log(this.contacts)
    },
    async sendNotif(){
        let response = await this.sendNotification(this.contacts)
        
        if(response.result == "Success"){
            response.dismissCountDown = 10;

            bus.$emit('alert_push', response);
        }
    }
  },
  computed: {
    ...mapGetters(['user','residentLogs', 'contactLogs', 'contacts', 'healthLogs'])
  },
  async created(){
        await this.fetchUser({user_id:this.$route.params.resident_id})
        await this.fetchHealthLogs({user_id:this.$route.params.resident_id})
        await this.fetchResidentLogs({'visit_logs.user_id':this.$route.params.resident_id})
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
    .logs p{
        font-size: 1.1em;
    }
    
</style>