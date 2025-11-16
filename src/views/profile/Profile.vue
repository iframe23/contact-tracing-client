<template>
  <div class="pt-4 container-fluid bg-white thead-primary pb-5">
    <div v-if="loggedUser.profile_pic != '' && loggedUser.valid_id != ''">
        <h2 class="d-sm-block d-md-none text-center">
            {{loggedUser.firstname+' '+loggedUser.middlename+' '+loggedUser.lastname}}
        </h2>
        <div class="row">
            <input ref="profilePicBtn" class="d-none" type="file" name="" id="">
            <div class="col-md-4 pr-md-5">
                <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
                <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative mb-4">
                    <img v-if="loggedUser.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'+loggedUser.profile_pic" />
                    <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                    <div v-if="hovered==true">
                        <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                            <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                        </div>
                    </div>
                </div>
                <div class="position-relative" v-if="loggedUser.user_status == 'Active'">
                    <div class="bg-info pt-5 pb-5 border border-danger rounded" v-if="loggedUser.qr_code == ''">
                        <qrcode-vue class="d-flex justify-content-center" :value="loggedUser.user_id" size="150"></qrcode-vue>
                    </div>
                </div>
                <div v-else>
                    <p class="text-primary">Your Account is being subjected for approval first, before you will be provided with a QR Code. Your profile photo and valid ID are being compared for validation. You will be notified accordingly.</p>
                </div>
            </div>
            <div class="col-md-8">
                <div class="d-flex align-items-center">
                    <h2 class="m-0 d-none d-md-block">
                        {{loggedUser.firstname+' '+loggedUser.middlename+' '+loggedUser.lastname}}
                    </h2>
                </div>

                <section class="mt-4">
                    <div>
                        <b-card no-body>
                            <b-tabs card>
                                <b-tab title="User Information" active>
                                    <b-card-text>
                                        <h5 class="text-primary">
                                            Contact Information
                                        </h5>
                                        <dl class="row mt-4 mb-4 pb-3">
                                            <dt class="col-sm-3">Phone</dt>
                                            <dd class="col-sm-9">{{loggedUser.contact_number}}</dd>
                                            
                                            <dt class="col-sm-3">Home address</dt>
                                            <dd class="col-sm-9">
                                                    {{loggedUser.address}}
                                            </dd>
                                            
                                            <dt class="col-sm-3">Email address</dt>
                                            <dd class="col-sm-9">
                                                <a href="mailto:aang.is.kefy@gmail.com">{{loggedUser.email}}</a>
                                            </dd>
                                        </dl>
                                        
                                        <h5 class="text-primary">
                                            Basic Information
                                        </h5>
                                        <dl class="row mt-4 mb-1 pb-3">                            
                                            <dt class="col-sm-3">Gender</dt>
                                            <dd class="col-sm-9">{{loggedUser.gender}}</dd>

                                            <dt class="col-sm-3">Birthdate</dt>
                                            <dd class="col-sm-9">{{loggedUser.birthdate}}</dd>

                                            <dt class="col-sm-3">Health Status</dt>
                                            <dd class="col-sm-9">
                                                <span class="text-primary" v-if="loggedUser.health_status == 'Negative'">{{loggedUser.health_status}}</span>
                                                <span class="text-danger" v-else-if="loggedUser.health_status == 'Positive'">{{loggedUser.health_status}}</span>
                                                <span class="text-success" v-else-if="loggedUser.health_status == 'Recovered'">{{loggedUser.health_status}}</span>
                                                <span class="text-warning" v-else-if="loggedUser.health_status == 'Deceased'">{{loggedUser.health_status}}</span>
                                            </dd>
                                        </dl>
                                    </b-card-text>
                                </b-tab>

                                <b-tab title="Valid ID">
                                    <b-card-text>
                                        <h5 class="text-primary">
                                            Valid ID
                                        </h5>
                                        <dl>
                                            <input ref="validIDBtn" class="d-none" @change="handleFileUpload('valid_id')" type="file" name="" id="">
                                            <div @mouseenter="hovered2 = true" @mouseleave="hovered2 = false" class="position-relative ml-5 mr-5 mb-2">
                                                <img v-if="loggedUser.valid_id != ''" class="w-100 rounded border" :src="this.$api_url+'images/valid_ids/'+loggedUser.valid_id" />
                                                <img v-else class="w-100 rounded border" :src="this.$base_url+'img/id.png'" />
                                                <div v-if="hovered2==true">
                                                    <div @click="validIDBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                                                        <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Valid ID</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </dl>
                                    </b-card-text>
                                </b-tab>

                                <b-tab title="Notifications">
                                    <b-card-text>
                                        <h5 class="text-primary">
                                            Notifications
                                        </h5>
                                        <dl>
                                            <table class="table">
                                                <tbody>
                                                    <tr class="bg-white rounded" v-for="(j, index) in notifications">
                                                        <td><strong>{{$moment(j.date_sent).format('LL')}}</strong></td>
                                                        <td>From: IATF Admin</td>
                                                        <td>{{j.subject}}</td>
                                                        <td>{{j.content}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </dl>
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </section>
            </div>
        </div>
    </div>
    
    <div v-else>
        <h2 class="text-primary">
            Final Step: Upload Picture and Valid ID
        </h2><hr>

        <div class="row">
            <input ref="profilePicBtn" class="d-none" type="file" name="" id="">
            <div class="col-md-6 pr-md-5">
                <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
                <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative ml-5 mr-5 mb-2">
                    <img v-if="loggedUser.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'+loggedUser.profile_pic" />
                    <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                    <div v-if="hovered==true">
                        <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                            <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                        </div>
                    </div>
                </div>

                <btn @click="profilePicBtnClick()" class="btn btn-primary btn-lg d-block ml-5 mr-5">
                    Upload Picture
                </btn>
            </div>
            <div class="col-md-6 pr-md-5">
                <input ref="validIDBtn" class="d-none" @change="handleFileUpload('valid_id')" type="file" name="" id="">
                <div @mouseenter="hovered2 = true" @mouseleave="hovered2 = false" class="position-relative ml-5 mr-5 mb-2">
                    <img v-if="loggedUser.valid_id != ''" class="w-100 rounded border" :src="this.$api_url+'images/valid_ids/'+loggedUser.valid_id" />
                    <img v-else class="w-100 rounded border" :src="this.$base_url+'img/id.png'" />
                    <div v-if="hovered2==true">
                        <div @click="validIDBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                            <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Valid ID</span></a>
                        </div>
                    </div>
                </div>
                
                <btn @click="validIDBtnClick()" class="btn btn-success btn-lg d-block ml-5 mr-5">
                    Upload Valid ID
                </btn>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import QrcodeVue from 'qrcode.vue'
import {bus, api_url} from '../../main';

export default {
  name: 'User',
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
        columns: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'lab_units', 'lec_units', 'units', 'hours_week', 'actions'],
        options: {  
            filterable: true,
            perPage: 5,
            perPageValues: [5,10,25,50,100]
        },
        transcriptModal: false,
        accountSMModal: false,
        hovered: false,
        hovered2: false,
        file: {},
        receiptData:{
        
        },
        primaryModal: false,
        prospect_id: 0,
        alert: {}
    }
  },
  methods: {
    ...mapActions(['fetchLoggedUser', 'submitFile', 'fetchNotifications']),
    profilePicBtnClick(){
        this.$refs.profilePicBtn.click()
    },
    validIDBtnClick(){
        this.$refs.validIDBtn.click()
    },
    async handleFileUpload(destination){
        let formData = new FormData();

        if(destination == 'profile_pic'){
            formData.append('file', this.$refs.profilePicBtn.files[0]);
        } else if(destination == 'birth_cert'){
            formData.append('file', this.$refs.birthCertBtn.files[0]);
        } else if(destination == 'good_moral'){
            formData.append('file', this.$refs.goodMoralBtn.files[0]);
        } else if(destination == 'transferred_TOR'){
            formData.append('file', this.$refs.transferredTORBtn.files[0]);
        } else if(destination == 'form_138'){
            formData.append('file', this.$refs.form138Btn.files[0]);
        } else if(destination == 'valid_id'){
            formData.append('file', this.$refs.validIDBtn.files[0]);
        }

        formData.append('user_id', this.loggedUser.user_id);
        formData.append('destination', destination);

        console.log(this.file)
        let response = await this.submitFile(formData)

        if(response.result == 'Success'){
            response.dismissCountDown = 10
            bus.$emit('alert_push', response)
            await this.fetchLoggedUser()
        }
    },
  },
  computed: {
    ...mapGetters(['loggedUser', 'notifications'])
  },
  async created(){
    await this.fetchLoggedUser()
    await this.fetchNotifications({user_id:this.loggedUser.user_id})
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