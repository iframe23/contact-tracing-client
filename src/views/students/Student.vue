<template>
  <div class=" p-4 bg-white thead-primary">
    <div class="row">
        <input ref="profilePicBtn" class="d-none" @change="handleFileUpload('profile_pic')" type="file" name="" id="">
        <div class="col-md-4 pr-md-5">
            <div @mouseenter="hovered = true" @mouseleave="hovered = false" class="position-relative">
                <img v-if="student.profile_pic != ''" class="w-100 rounded border" :src="this.$api_url+'images/profile_pics/'+student.profile_pic" />
                <img v-else class="w-100 rounded border" :src="this.$base_url+'img/profile.jpg'" />
                <div v-if="hovered==true">
                    <div @click="profilePicBtnClick()" class="profile-pic-upload-btn d-flex align-items-center justify-content-center text-primary fs-2">
                        <a type="button" class="pl-1 pr-1 d-inline-block"><span class="fa fa-camera mr-2"></span><span class="d-none d-lg-inline"> Upload Photo</span></a>
                    </div>
                </div>
            </div>
            
            <div class="pt-4 mt-2">
                <section class="mb-4 pb-1">
                    <div class="work-experience pt-2">
                        <div class="work mb-4">
                            <strong class="h5 d-block font-weight-bold mb-1">Department</strong>
                            <p class="d-block text-primary mb-1">{{student.department_name+' ('+student.department_abb+")"}}</p>
                            <p class="text-secondary"></p>
                        </div>
                        <div class="work mb-4">
                            <strong class="h5 d-block font-weight-bold mb-1">Course</strong>
                            <p class="d-block text-primary mb-1">{{student.course_name+' ('+student.course_abb+")"}}</p>
                            <p class="text-secondary"></p>
                        </div>
                        <div class="work mb-4">
                            <strong class="h5 d-block font-weight-bold mb-1">Year Level</strong>
                            <p class="d-block text-primary mb-1">{{student.year_level_name}}</p>
                            <p class="text-secondary"></p>
                        </div>
                        <div class="work mb-4">
                            <strong class="h5 d-block font-weight-bold mb-1">Student Type</strong>
                            <p class="d-block text-primary mb-1">
                                <span v-if="student.student_type != 'Old'">New</span>
                                <span v-else>{{student.student_type}}</span>
                            </p>
                            <p class="text-secondary"></p>
                        </div>
                        <div class="work mb-4">
                            <strong class="h5 d-block font-weight-bold mb-1">Last Enrolled</strong>
                            <p class="d-block text-primary mb-1">{{accountSM.account_sm_date}}</p>
                            <p class="text-secondary"></p>
                        </div>
                    </div>    
                </section>
            </div>
        </div>
        <div class="col-md-8">
            <div class="d-flex align-items-center">
                <h2 class="font-weight-bold d-flex align-items-center">
                    {{student.firstname+' '+student.middlename+' '+student.lastname}}
                    <button @click="editStudentModal = true" class="btn btn-primary ml-4"> <span class="fa fa-edit"></span> Edit Information</button>
                </h2>
            </div>
            <p class="h5 text-primary mt-2 d-block font-weight-light">
                {{student.year_level_name+' - '+student.course_name+' Student'}}
            </p>
            <p class="lead mt-4">This page shows the information of {{student.firstname}}.</p>


            <b-modal
            :title="'Edit Student Information - '+student.firstname+' '+student.lastname"
            header-bg-variant="primary"
            content-class="border-primary"
            size="xl"
            v-model="editStudentModal" 
            @ok="editStudentModal = false"
            :hide-footer= true
            variant="primary"
            body-bg-variant="secondary"
            >
                <edit-student v-if="editStudentModal == true" :studentData="student"/>
            </b-modal>

            <section class="mt-4">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Student Information" active>
                                <b-card-text>
                                    <h5 class="text-primary">
                                        Contact Information
                                    </h5>
                                    <dl class="row mt-4 mb-4 pb-3">
                                        <dt class="col-sm-3">Phone</dt>
                                        <dd class="col-sm-9">{{student.contact_number}}</dd>
                                        
                                        <dt class="col-sm-3">Home address</dt>
                                        <dd class="col-sm-9">
                                            <address class="mb-0">
                                                {{student.address}}
                                            </address>
                                        </dd>
                                        
                                        <dt class="col-sm-3">Email address</dt>
                                        <dd class="col-sm-9">
                                            <a href="mailto:aang.is.kefy@gmail.com">{{student.email}}</a>
                                        </dd>
                                    </dl>
                                    
                                    <h5 class="text-primary">
                                        Basic Information
                                    </h5>
                                    <dl class="row mt-4 mb-4 pb-3">
                                        <dt class="col-sm-3">Birthday</dt>
                                        <dd class="col-sm-9">{{$moment(student.birthdate).format('MMMM D, YYYY')}}</dd>
                                        
                                        <dt class="col-sm-3">Gender</dt>
                                        <dd class="col-sm-9">{{student.gender}}</dd>
                                    </dl>

                                     <h5 class="text-primary">
                                        Educational Attainment
                                    </h5>
                                    <dl class="row mt-4 mb-4 pb-3">
                                        <dt class="col-sm-3">Primary School</dt>
                                        <dd class="col-sm-9">{{student.primary_school}}</dd>
                                        <dt class="col-sm-3">Intermediate School</dt>
                                        <dd class="col-sm-9">{{student.intermediate_school}}</dd>
                                        <dt class="col-sm-3">Secondary School</dt>
                                        <dd class="col-sm-9">{{student.secondary_school}}</dd>

                                        <dt class="col-sm-3">Is Transferee</dt>
                                        <dd class="col-sm-9">{{student.transferee}}</dd>
                                        
                                        <dt v-if="student.transferee == 'Transferee'" class="col-sm-3">School Transferred from</dt>
                                        <dd v-if="student.transferee == 'Transferee'" class="col-sm-9">{{student.transferred_from}}</dd>
                                    </dl>

                                </b-card-text>
                            </b-tab>

                            <b-tab title="Yellow Forms" class="bg-yellow2 text-black">
                                <b-card-text>
                                     <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">         
                                        <b-button-group class="mx-1">
                                            <label class="align-self-center mb-0 mr-2">Select</label>
                                            <select @change="getAccountSM" class="form-control" v-model="selectedAccountSM">
                                                <option v-for="accountSM in accountStatements" :key="accountSM.account_sm_id" :value="accountSM.account_sm_id">{{accountSM.sem_name+' - S.Y. '+accountSM.school_year}}</option>
                                            </select>
                                        </b-button-group>
                                        <b-button-group class="mx-1">
                                           <button @click="accountSMModal = true" class="btn btn-primary btn-sm mr-2"><span class="fa fa-print"></span> Print Preview</button>
                                        </b-button-group>
                                    </b-button-toolbar><hr>
                                    <h5 class="text-center">Statement of Account - {{accountSM.sem_name+', SY '+accountSM.school_year}}</h5><hr>
                                    <form>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Total Lab Units : </label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.total_lab_units}}</strong></span>
                                                    </div>      
                                                </div>
                                                <hr>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Total Units</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.total_units}}</strong></span>
                                                    </div>    
                                                </div>
                                                <hr>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Miscellaneous Fee</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.misc_fee}}</strong></span>
                                                    </div>    
                                                </div> 
                                                <hr>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Tuition Fee</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.tuition_fee}}</strong></span>
                                                    </div>    
                                                </div> 
                                                <hr>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Laboratory Fee</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.lab_fee}}</strong></span>
                                                    </div>    
                                                </div> 
                                                <hr>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Total Amount</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.total_amount}}</strong></span>
                                                    </div>    
                                                </div> 
                                                <hr>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Down Payment</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.down_payment}}</strong></span>
                                                    </div>    
                                                </div> 
                                                <hr>
                                            </div>
                                             <div class="col-6">
                                                 <div class="row">
                                                    <div class="col-6">
                                                        <label for="">Balance Remaining</label>
                                                    </div>
                                                    <div class="col-6">
                                                        <span><strong>{{accountSM.balance}}</strong></span>
                                                    </div>    
                                                </div> 
                                                <hr>
                                            </div>
                                        </div>
                                    </form>
                                    

                                    <div>
                                        <h5 class="text-center">Enrolled Subjects</h5><hr>
                                        <table class="table table-bordered border-dark table-responsive table-hover table-sm">
                                            <thead class="bg-info">
                                            <tr>
                                                <th>#</th>
                                                <th>Subject Code</th>
                                                <th>Descriptive Title</th>
                                                <th>Instructor</th>
                                                <th>Day</th> 
                                                <th>Time</th>
                                                <th>Room</th>
                                                <th>Units</th>
                                                <th>Lab Units</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="border-dark" v-for="(sub, ind) in accountSM.enrolledSubjects" :key="ind">
                                                <td><strong>{{ind+1}}.</strong></td>
                                                <td>{{sub.subject_code}}</td>
                                                <td>{{sub.descriptive_title}}</td>
                                                <td>{{sub.firstname+' '+sub.lastname}}</td>
                                                <td>
                                                <div v-for="time in sub.time_scheds" :key="time.time_sched_id">{{time.day_abb}}</div>
                                                </td>
                                                <td>
                                                <div class="width-2" v-for="time in sub.time_scheds" :key="time.time_sched_id">
                                                    {{"July 21, 1983 "+time.time_start | moment("h:mm: a")}} - {{"July 21, 1983 "+time.time_end | moment("h:mm: a")}}
                                                </div>
                                                </td>
                                                <td>{{sub.room_name}}</td>
                                                <td>{{sub.units}}</td>
                                                <td>{{sub.lab_units}}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                <strong>Total Units:</strong>
                                                </td>
                                                <td><strong>{{accountSM.total_units}}</strong></td>
                                                <td></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <hr>
                                    <h5 class="text-center">Schedule of Payments</h5><hr>
                                    <div class="row">
                                        <div class="col-7">
                                            <div class="form-group row align-items-center">
                                            <div class="col-5">
                                                <label class="mb-0" for=""><strong>Prelim :</strong></label>
                                            </div>
                                            <div class="col-4">
                                                <label class="mb-0" for="">Php {{accountSM.per_grading}}</label>
                                            </div>
                                            <div class="col-3">
                                                <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading" class="btn btn-success btn-sm">Paid</span>
                                                <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                                            </div>
                                            </div>

                                            <div class="form-group row align-items-center">
                                            <div class="col-5">
                                                <label class="mb-0" for=""><strong>Midterm :</strong></label>
                                            </div>
                                            <div class="col-4">
                                                <label class="mb-0" for="">Php {{accountSM.per_grading}}</label>
                                            </div>
                                            <div class="col-3">
                                                <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading*2" class="btn btn-success btn-sm">Paid</span>
                                                <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                                            </div>
                                            </div>

                                            <div class="form-group row align-items-center">
                                            <div class="col-5">
                                                <label class="mb-0" for=""><strong>Semi-Final :</strong></label>
                                            </div>
                                            <div class="col-4">
                                                <label class="mb-0" for="">Php {{accountSM.per_grading}}</label>
                                            </div>
                                            <div class="col-3">
                                                <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading*3" class="btn btn-success btn-sm">Paid</span>
                                                <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                                            </div>
                                            </div>

                                            <div class="form-group row align-items-center mb-3">
                                            <div class="col-5">
                                                <label class="mb-0" for=""><strong>Final :</strong></label>
                                            </div>
                                            <div class="col-4">
                                                <label class="mb-0" for="">Php {{accountSM.per_grading}}</label>
                                            </div>
                                            <div class="col-3">
                                                <span v-if="(accountSM.total_amount_paid - accountSM.down_payment) >= accountSM.per_grading*4" class="btn btn-success btn-sm">Paid</span>
                                                <span v-else class="btn btn-danger btn-sm">Unpaid</span>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="col-5">
                                            <div>
                                            <h6 class="clearfix"><span class="float-right">Attached Receipts</span></h6>
                                            <div class="clearfix" v-for="(receipt, index) in accountSM.receipts" :key="index">
                                                <button @click="openReceiptModal(index)" class="btn btn-secondary btn-sm mb-1 float-right">O.R. #0000{{receipt.receipt_id}} - {{$moment().format('MM/D/YYYY', receipt.receipt_date)}}</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    

                                    <b-modal
                                    :title="'Account Statement - '+accountSM.sem_name+', SY '+accountSM.school_year+' - '+student.firstname+' '+student.lastname"
                                    header-bg-variant="primary"
                                    content-class="border-primary"
                                    size="xl"
                                    v-model="accountSMModal" 
                                    @ok="accountSMModal = false"
                                    :hide-footer= true
                                    variant="primary"
                                    body-bg-variant="secondary"
                                    >
                                        <div class="card">
                                            <embed class="pdf-viewer" :src="this.$api_url+'printable/print_account_sm/'+accountSM.account_sm_id" />
                                        </div>
                                    </b-modal>


                                    <b-modal
                                        :title="'Receipt from payment made by '+accountSM.firstname+' '+accountSM.lastname"
                                        header-bg-variant="primary"
                                        content-class="border-primary"
                                        size="xl"
                                        v-model="receiptModal" 
                                        @ok="receiptModal = false"
                                        :hide-footer= true
                                        variant="primary"
                                        body-bg-variant="secondary"
                                        >
                                        <div class="card">
                                            <embed class="pdf-viewer" :src="this.$api_url+'printable/print_receipt/'+receiptModalData.receipt_id" />
                                        </div>
                                    </b-modal>
                                </b-card-text>
                            </b-tab>
                            
                            <b-tab title="Report Card">
                                <b-card-text class="table-hover table-sm">
                                    <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">         
                                        <b-button-group class="mx-1">
                                            <label class="align-self-center mb-0 mr-2">Select</label>
                                            <select @change="getReportCard" class="form-control" v-model="selectedAccountSM">
                                                <option v-for="accountSM in accountStatements" :key="accountSM.account_sm_id" :value="accountSM.account_sm_id">{{accountSM.sem_name+' - S.Y. '+accountSM.school_year}}</option>
                                            </select>
                                        </b-button-group>
                                        <b-button-group class="mx-1">
                                           <button @click="reportCardModal = true" class="btn btn-primary btn-sm mr-2"><span class="fa fa-print"></span> Print Preview</button>
                                        </b-button-group>
                                    </b-button-toolbar><hr>

                                    <h5 class="text-center text-primary align-items-center">Student's Report Card - {{reportCard.sem_name+', SY '+reportCard.school_year}}</h5><hr>
                                    <table class="table table-hover table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th rowspan="2">Subject Code</th>
                                                <th class="text-center" colspan="5">Grades</th>
                                            </tr>
                                            <tr>
                                                <th>Prelim</th>
                                                <th>Midterm</th>
                                                <th>Semi-Final</th>
                                                <th>Final</th>
                                                <th>Equivalent</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="sub in reportCard.enrolled_subjects" :key="sub.enrolled_subject_id">
                                                <td>
                                                    <span v-if="sub.subject_code == 0"></span>
                                                    <span v-else>{{sub.subject_code}}</span>
                                                </td>
                                                <td>
                                                    <span v-if="sub.prelim == 0"></span>
                                                    <span v-else>{{sub.prelim}}</span>
                                                </td>
                                                <td><span v-if="sub.midterm_cumu == 0"></span><span v-else>{{sub.midterm_cumu}}</span></td>
                                                <td><span v-if="sub.semi_finals_cumu == 0"></span><span v-else>{{sub.semi_finals_cumu}}</span></td>
                                                <td><span v-if="sub.finals_cumu == 0"></span><span v-else>{{sub.finals_cumu}}</span></td>
                                                <td><span v-if="sub.equivalent_grade == 0"></span><span v-else>{{sub.equivalent_grade}}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>


                                    <b-modal
                                    :title="'Student Report Card '+student.firstname+' '+student.lastname"
                                    header-bg-variant="primary"
                                    content-class="border-primary"
                                    size="xl"
                                    v-model="reportCardModal" 
                                    @ok="reportCardModal = false"
                                    :hide-footer= true
                                    variant="primary"
                                    body-bg-variant="secondary"
                                    >
                                        <div class="card">
                                            <embed class="pdf-viewer" :src="this.$api_url+'printable/print_report_card/'+reportCard.account_sm_id" />
                                        </div>
                                    </b-modal>
                                </b-card-text>
                            </b-tab>

                            <b-tab title="Transcript">
                                <b-card-text class="table-hover table-sm">
                                    <h5 class="text-center text-primary ">Transcript of Records - {{transcript.prospectus_name}}</h5><hr>
                                    
                                    
                                    <b-button-toolbar class="d-flex align-items-center" aria-label="Toolbar with button groups and dropdown menu">
                                        <b-button-group class="mx-1">
                                            <button @click="transcriptModal = true" class="btn btn-primary btn-sm mr-2"><span class="fa fa-print"></span> Print Preview</button>
                                        </b-button-group>
                                        <b-button-group class="mx-1">
                                            <button @click="reEvaluateModal = true" class="btn btn-primary btn-sm mr-2"><span class="fa fa-redo"></span> Re-Evaluate</button>
                                        </b-button-group>
                                    </b-button-toolbar><hr>
                                    
                                    <v-client-table 
                                        :data="transcript.credentials"
                                        :columns="columns" 
                                        :options="options">

                                        <span slot="grade" slot-scope="props" > 
                                            <span class="text-danger" v-if="props.row.equivalent_grade == 0">---</span>
                                            <span v-else>{{props.row.equivalent_grade}}</span>
                                        </span>

                                        <span slot="actions" slot-scope="props" > 
                                            <router-link :to="'/students/student/'+props.row.credential_id"><button class="action-btn btn btn-primary mr-2" ><span class="fa fa-angle-double-right"></span></button></router-link>
                                        </span>
                                        <!-- <a slot="actions" slot-scope="props" class="fa fa-edit" v-on:click="edit(props.index)"></a> -->
                                    </v-client-table>


                                    <b-modal
                                    :title="'Transcript of Records '+student.firstname+' '+student.lastname"
                                    header-bg-variant="primary"
                                    content-class="border-primary"
                                    size="xl"
                                    v-model="transcriptModal" 
                                    @ok="transcriptModal = false"
                                    :hide-footer= true
                                    variant="primary"
                                    body-bg-variant="secondary"
                                    >
                                        <div class="card">
                                            <embed class="pdf-viewer" :src="this.$api_url+'printable/print_transcript/'+transcript.transcript_id" />
                                        </div>
                                    </b-modal>


                                    <b-modal
                                    :title="'Re-Evaluate Credentials - '+student.firstname+' '+student.lastname"
                                    header-bg-variant="primary"
                                    content-class="border-primary"
                                    size="xl"
                                    v-model="reEvaluateModal" 
                                    @ok="reEvaluateModal = false"
                                    :hide-footer= true
                                    variant="primary"
                                    body-bg-variant="secondary"
                                    >
                                        <re-evaluate v-if="reEvaluateModal == true" :transcript="transcript"/>
                                    </b-modal>
                                </b-card-text>
                            </b-tab>

                            <b-tab title="Documents">
                                <b-card-text>
                                    <b-button-toolbar class="d-flex align-items-center" aria-label="Toolbar with button groups and dropdown menu">
                                        <b-button-group class="mx-1">
                                            Box Filing Number : 
                                        </b-button-group>
                                        <b-button-group class="mx-1">
                                            <input v-model="boxNumber" type="text" class="form-control mr-2"/>
                                        </b-button-group>
                                        <b-button-group class="mx-1">
                                            <button @click="saveBoxNumber()" class="btn btn-primary">Save</button>
                                        </b-button-group>
                                    </b-button-toolbar><hr>

                                    <div class="mb-2">
                                        <h5 class="d-flex ">
                                            <span @click="$refs.birthCertBtn.click()" class="btn btn-primary btn-sm mr-2"> <span class="fa fa-file-invoice">
                                            </span> Attach a File</span><span class="text-primary"> Birth Certificate</span>
                                            <input ref="birthCertBtn" class="d-none" @change="handleFileUpload('birth_cert')" type="file" name="" id="">
                                        </h5>
                                        <div v-if="student.birth_cert == ''" class="bg-lightgray document-empty d-flex justify-content-center rounded">
                                            <p class="fs-2 text-center text-muted align-self-center ">
                                                <span class="fa fa-image"></span>
                                                <span> No Attached File</span>
                                            </p>
                                            
                                        </div>
                                        <div v-else>
                                            <img @click="openDocumentModal('images/birth_certs/'+student.birth_cert)" class="w-100 rounded border" :src="this.$api_url+'images/birth_certs/'+student.birth_cert" />
                                        </div>
                                    </div><hr>

                                    <div class="mb-2">
                                        <h5 class="d-flex ">
                                            <span @click="$refs.goodMoralBtn.click()" class="btn btn-primary btn-sm mr-2"> <span class="fa fa-file-invoice">
                                            </span> Attach a File</span><span class="text-primary"> Good Moral</span>
                                            <input ref="goodMoralBtn" class="d-none" @change="handleFileUpload('good_moral')" type="file" name="" id="">
                                        </h5>
                                        <div v-if="student.good_moral == ''" class="bg-lightgray document-empty d-flex justify-content-center rounded">
                                            <p class="fs-2 text-center text-muted align-self-center ">
                                                <span class="fa fa-image"></span>
                                                <span> No Attached File</span>
                                            </p>
                                            
                                        </div>
                                        <div v-else>
                                            <img @click="openDocumentModal('images/good_morals/'+student.good_moral)" class="w-100 rounded border" :src="this.$api_url+'images/good_morals/'+student.good_moral" />
                                        </div>
                                    </div><hr>

                                    <div class="mb-2">
                                        <div v-if="student.transferee != 'Transferee'">
                                            <h5 class="d-flex ">
                                                <span @click="$refs.form138Btn.click()" class="btn btn-primary btn-sm mr-2"> <span class="fa fa-file-invoice">
                                                </span> Attach a File</span><span class="text-primary"> Form 138</span>
                                                <input ref="form138Btn" class="d-none" @change="handleFileUpload('form_138')" type="file" name="" id="">
                                            </h5>
                                            <div v-if="student.form_138 == ''" class="bg-lightgray document-empty d-flex justify-content-center rounded">
                                                <p class="fs-2 text-center text-muted align-self-center ">
                                                    <span class="fa fa-image"></span>
                                                    <span> No Attached File</span>
                                                </p>
                                            </div>
                                            <div v-else>
                                                <img @click="openDocumentModal('images/form_138s/'+student.form_138)" class="w-100 rounded border" :src="this.$api_url+'images/form_138s/'+student.form_138" />
                                            </div>
                                        </div>
                                        <div v-else>
                                            <h5 class="d-flex ">
                                                <span @click="$refs.transferredTORBtn.click()" class="btn btn-primary btn-sm mr-2"> <span class="fa fa-file-invoice">
                                                </span> Attach a File</span><span class="text-primary"> Transferee TOR</span>
                                                <input ref="transferredTORBtn" class="d-none" @change="handleFileUpload('transferred_TOR')" type="file" name="" id="">
                                            </h5>
                                            <div v-if="student.transferred_TOR == ''" class="bg-lightgray document-empty d-flex justify-content-center rounded">
                                                <p class="fs-2 text-center text-muted align-self-center ">
                                                    <span class="fa fa-image"></span>
                                                    <span> No Attached File</span>
                                                </p>
                                                
                                            </div>
                                            <div v-else>
                                                <img @click="openDocumentModal('images/transferred_TORs/'+student.transferred_TOR)" class="w-100 rounded border" :src="this.$api_url+'images/transferred_TORs/'+student.transferred_TOR" />
                                            </div>
                                        </div>
                                    </div><hr>


                                    <b-modal
                                    :title="'Document - '+document"
                                    header-bg-variant="primary"
                                    content-class="border-primary"
                                    size="xl"
                                    v-model="documentModal" 
                                    @ok="documentModal = false"
                                    :hide-footer= true
                                    variant="primary"
                                    body-bg-variant="secondary"
                                    >
                                        <div class="card">
                                            <embed class="pdf-viewer" :src="this.$api_url+document" />
                                        </div>
                                    </b-modal>
                                </b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </section>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {bus, api_url} from '../../main';
import EditStudent from './EditStudent'
import ReEvaluate from './ReEvaluate'
import axios from 'axios'

export default {
  name: 'User',
  components: {EditStudent, ReEvaluate},
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
        columns: ['subject_code', 'descriptive_title', 'year_level_name', 'sem_name', 'lab_units', 'lec_units', 'units', 'hours_week', 'grade', 'actions'],
        options: {
            filterable: true,
            perPage: 5,
            perPageValues: [5,10,25,50,100]
        },
        transcriptModal: false,
        accountSMModal: false,
        reportCardModal: false,
        editStudentModal: false,
        documentModal: false,
        reEvaluateModal: false,
        hovered: false,
        file: {},
        receiptData:{
        
        },
        receiptModal: false,
        receiptModalData:{
            receipt_id: '',
            account_sm_id: '',
            receipt_amount: '',
            receipt_date: '',
            particulars: ''
        },
        selectedAccountSM: 0,
        document: '',
        boxNumber: ''
    }
  },
  methods: {
    ...mapActions(['fetchStudent', 'fetchAccountSM', 'fetchTranscript', 'submitFile', 'fetchReportCard', 'fetchAccountStatements']),
    openReceiptModal(index){
      this.receiptModalData = this.accountSM.receipts[index];
      this.receiptModal = true;
    },
    changeActiveTab(tab){
        this.activeTab = tab
    },
    profilePicBtnClick(){
        this.$refs.profilePicBtn.click()
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
        }

        formData.append('user_id', this.student.user_id);
        formData.append('destination', destination);

        console.log(this.file)
        let response = await this.submitFile(formData)

        if(response.result == 'Success'){
            response.dismissCountDown = 10
            bus.$emit('alert_push', response)
            await this.fetchStudent({id: this.$route.params.student_id})
        }
    },
    async getAccountSM(){
        await this.fetchAccountSM({user_id: this.$route.params.student_id, account_sm_id:this.selectedAccountSM});
    },
    async getReportCard(){
        await this.fetchReportCard({user_id: this.$route.params.student_id, account_sm_id:this.selectedAccountSM});
    },
    openDocumentModal(doc){
        this.document = doc;
        this.documentModal = true;
    },
    async saveBoxNumber(){
        let response = await axios.post(this.$api_url+'user/save_box_number', {user_id:this.student.user_id ,box_number: this.boxNumber})

        if(response.data.result="Success"){
            response.data.dismissCountDown = 10;

            bus.$emit('alert_push', response.data)
        }
    }
  },
  computed: {
    ...mapGetters(['student', 'accountSM', 'transcript', 'reportCard', 'currentSem', 'currentSY', 'accountStatements'])
  },
  async created(){
    await this.fetchStudent({id: this.$route.params.student_id})
    await this.fetchAccountSM({user_id: this.$route.params.student_id})
    await this.fetchTranscript({student_id: this.$route.params.student_id})
    await this.fetchReportCard({student_id: this.$route.params.student_id, 'account_statements.sem_id': this.currentSem.sem_id, school_year: this.currentSY});
    await this.fetchAccountStatements({student_id: this.$route.params.student_id});
    
    this.selectedAccountSM = this.accountSM.account_sm_id;
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