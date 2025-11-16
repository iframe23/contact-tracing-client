<template>
  <div class=" p-4 bg-white thead-primary qr-log-height">
    <div class="row">
        
        <div class="col-md-5 pr-md-5">
          <h2 class="text-center bg-info mb-0 rounded pd-b-5">Camera Scanner</h2>
          <div class="position-relative mb-5" v-if="primaryModal == false">
              <qrcode-stream :worker="Worker" @decode="onDecode"></qrcode-stream>
          </div>
          <h4 class="text-center">Please Scan a Registered QR Code</h4>
          <hr>
          <div class="pb-5"></div>
          <div class="pb-5"></div>
          <div class="pb-5"></div>
          <div class="pb-5"></div>
        </div>
        <div class="col-md-7">
          <div class="d-none d-md-block">
            <h2 class="text-center bg-info rounded mb-0 pd-b-5">Information Log</h2>

            <section class="">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="User Information" active>
                                <b-card-text>
                                    <dl >
                                      <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="ml-5 pl-5 pr-5 mr-5 position-relative mb-4">
                                          <img v-if="logData.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'+logData.profile_pic" />
                                          <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                                      </div>
                                      <form class="row mt-4 mb-4 pb-3" @submit.prevent="saveLog()">
                                        <dt class="col-sm-4"><h5> Name</h5></dt>
                                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.name" required></dd>

                                        <dt class="col-sm-4"><h5> Gender</h5></dt>
                                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.gender" required></dd>
                                        
                                        <dt class="col-sm-4"><h5> Home address</h5></dt>
                                        <dd class="col-sm-8">
                                                <input class="form-control" type="text" v-model="logData.address" required>
                                        </dd>
                                        
                                        <dt class="col-sm-4"><h5> Email address</h5></dt>
                                        <dd class="col-sm-8">
                                            <input class="form-control" type="text" v-model="logData.email" required>
                                        </dd>

                                        <dt class="col-sm-4"><h5> Contact Number</h5></dt>
                                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.contact_number" required></dd>

                                        <dt class="col-sm-4"><h5> Log Time</h5></dt>
                                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.log_time" required></dd>

                                        <dt class="col-sm-4"><h5> Temperature</h5></dt>
                                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.temperature" required></dd>

                                        <dt class="col-sm-4"><h5> </h5></dt>
                                        <dd class="col-sm-8"><button class="btn btn-primary" type="submit">Save Visitor's Log</button></dd>
                                      </form>
                                    </dl>

                                </b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </section>
          </div>
          
          <div class="d-md-none">
            <b-modal v-if="primaryModal == true"
            :title="'Information Log'"
            variant="primary"
            header-bg-variant="primary"
            content-class="border-primary"
            size="xl"
            v-model="primaryModal" 
            @ok="primaryModal = false"
            :hide-footer= true
            >
              <b-card no-body>
                <b-card-text class="p-3">
                    <dl >
                      <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="ml-5 pl-5 pr-5 mr-5 position-relative mb-4">
                          <img v-if="logData.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'+logData.profile_pic" />
                          <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                      </div>
                      <form class="row mt-4 mb-4 pb-3" @submit.prevent="saveLog()">
                        <dt class="col-sm-4"><h5> Name</h5></dt>
                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.name" required></dd>

                        <dt class="col-sm-4"><h5> Gender</h5></dt>
                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.gender" required></dd>
                        
                        <dt class="col-sm-4"><h5> Home address</h5></dt>
                        <dd class="col-sm-8">
                                <input class="form-control" type="text" v-model="logData.address" required>
                        </dd>
                        
                        <dt class="col-sm-4"><h5> Email address</h5></dt>
                        <dd class="col-sm-8">
                            <input class="form-control" type="text" v-model="logData.email" required>
                        </dd>

                        <dt class="col-sm-4"><h5> Contact Number</h5></dt>
                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.contact_number" required></dd>

                        <dt class="col-sm-4"><h5> Log Time</h5></dt>
                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.log_time" required></dd>

                        <dt class="col-sm-4"><h5> Temperature</h5></dt>
                        <dd class="col-sm-8"><input class="form-control" type="text" v-model="logData.temperature" required></dd>

                        <dt class="col-sm-4"><h5> </h5></dt>
                        <dd class="col-sm-8"><button class="btn btn-primary" type="submit">Save Visitor's Log</button></dd>
                      </form>
                    </dl>

                </b-card-text>
              </b-card>
          </b-modal>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import {user_api, school_api} from '../../shared/api'
import {bus} from '../../main'
import Worker from '../../../public/worker.js'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Users',
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data: () => {
    return{
      logData :{
        profile_pic : '',
        name : '',
        gender : '',
        email : '',
        address : '',
        contact_number : '',
        temperature : '',
        log_time : ''
      },
      Worker,
      primaryModal : false
    }
  },
  computed: {
    ...mapGetters(['user', 'loggedUser'])
  },
  methods: {
    ...mapActions(['fetchUser', 'submitLog', 'fetchLoggedUser']),
    async onDecode (decodedString) {
      console.log(decodedString)
      await this.fetchUser({user_id : decodedString})

      console.log(this.user)
      this.logData.profile_pic = this.user.profile_pic
      this.logData.name = this.user.firstname+' '+this.user.middlename+' '+this.user.lastname
      this.logData.address = this.user.address
      this.logData.email = this.user.email
      this.logData.gender = this.user.gender
      this.logData.contact_number = this.user.contact_number,
      this.logData.log_time = new Date()

      this.primaryModal = true
    },
    async saveLog(){
      let log = {
        user_id: this.user.user_id,
        visiting_point_id: this.loggedUser.visiting_point_id,
        temperature: this.logData.temperature,
        log_time: this.logData.log_time
      }

      let response = await this.submitLog(log);

      if(response.result == "Success"){
        response.dismissCountDown = 10;

        bus.$emit('alert_push', response);
        this.logData = {
          profile_pic : '',
          name : '',
          gender : '',
          email : '',
          address : '',
          contact_number : '',
          temperature : '',
          log_time : ''
        }

        this.primaryModal = false
      } else {
          response.dismissCountDown = 10;

          bus.$emit('alert_push', response);
      }
    }
  },
  async created() {
    await this.fetchLoggedUser()

    console.log(self.location.origin + "/contact/jsQR.min.js")
  }
}
</script>

<style>
  
</style>