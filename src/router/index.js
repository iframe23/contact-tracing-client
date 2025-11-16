import Vue from 'vue'
import Router from 'vue-router'
import { isLogged, isPermitted } from '../shared/auth'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Register = () => import('@/views/pages/Register')

// Users

Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/login',
      name: 'Login',
      component: (settings) => import('@/views/pages/Login'),
    },
    {
      path: '/register',
      name: 'Register',
      component: (register) => import('@/views/pages/Register'),
    },
    {
      path: '/404',
      name: 'Page404',
      component: (page404) => import('@/views/pages/Page404')
    },
    {
      path: '/500',
      name: 'Page500',
      component: (page500) => import('@/views/pages/Page500')
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: '',
      component: DefaultContainer,

      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta:{
          },
        },
        {
          path: '/profile',
          name: 'Profile',
          redirect: '/profile/',
          component: (profileModule) => import('@/views/profile/ProfileModule'),
          children: [
            {
              path: '',
              name: '',
              component: (profile) => import('@/views/profile/Profile'),
              meta:{
                role: [2]
              },
            }
          ]
        },
        {
          path: '/travel_history',
          name: 'Travel History',
          redirect: '/travel_history/',
          component: (travel_historyModule) => import('@/views/travel_history/Travel_historyModule'),
          children: [
            {
              path: '',
              name: '',
              component: (travel_history) => import('@/views/travel_history/Travel_history'),
              meta:{
                role: [2]
              },
            }
          ]
        },
        {
          path: '/residents',
          name: 'Residents',
          redirect: '/residents/',
          component: (residentsModule) => import('@/views/residents/ResidentsModule'),
          children: [
            {
              path: '',
              name: '',
              component: (residents) => import('@/views/residents/Residents'),
              meta:{
                role: [1]
              },
            },
            {
              path: 'add_resident',
              name: 'Add Resident',
              component: (addResident) => import('@/views/residents/AddResident'),
              meta:{
                role: [1]
              },
            },
            {
              path: 'resident/:resident_id',
              name: 'Resident',
              component: (resident) => import('@/views/residents/Resident'),
            },
          ]
        },
        {
          path: '/visiting_points',
          name: 'Visiting Points',
          redirect: '/visiting_points/',
          component: (Visiting_pointsModule) => import('@/views/visiting_points/Visiting_pointsModule'),
          children: [
            {
              path: '',
              name: '',
              component: (visiting_points) => import('@/views/visiting_points/Visiting_points'),
              meta:{
                role: [1]
              },
            },
            {
              path: 'add_visiting_point',
              name: 'Add Visiting Points',
              component: (addVisiting_point) => import('@/views/visiting_points/AddVisiting_point'),
              meta:{
                role: [1]
              },
            },
            {
              path: 'visiting_point/:visiting_point_id',
              name: 'Visiting Point',
              component: (visiting_point) => import('@/views/visiting_points/Visiting_point'),
            },
          ]
        },
        {
          path: '/contact_trace',
          name: 'Contact Trace',
          redirect: '/contact_trace/',
          component: (Contact_traceModule) => import('@/views/contact_trace/Contact_traceModule'),
          children: [
            {
              path: '',
              name: '',
              component: (contact_trace) => import('@/views/contact_trace/Contact_trace'),
              meta:{
                role: [1]
              },
            },
            {
              path: 'resident_logs/:resident_id',
              name: 'Resident Logs',
              component: (resident_logs) => import('@/views/contact_trace/Resident_logs'),
            }
          ]
        },
        {
          path: '/health_status',
          name: 'Health Status',
          redirect: '/health_status/',
          component: (Health_statusModule) => import('@/views/health_status/Health_statusModule'),
          children: [
            {
              path: '',
              name: '',
              component: (health_status) => import('@/views/health_status/Health_status'),
              meta:{
                role: [1]
              },
            }
          ]
        },
        {
          path: '/visitors',
          name: 'Visitors',
          redirect: '/visitors/',
          component: (VisitorsModule) => import('@/views/visitors/VisitorsModule'),
          children: [
            {
              path: '',
              name: '',
              component: (visitors) => import('@/views/visitors/Visitors'),
              meta:{
                role: [3]
              },
            }
          ]
        },
        {
          path: '/qr_log',
          name: 'QR Log',
          redirect: '/qr_log/',
          component: (qRLogModule) => import('@/views/qr_log/QRLogModule'),
          children: [
            {
              path: '',
              name: '',
              component: (qr_log) => import('@/views/qr_log/QRLog'),
              meta:{
                role: [3]
              },
            }
          ]
        },
        {
          path: '/students',
          name: 'Students',
          redirect: '/students/',
          component: (roomsModule) => import('@/views/students/StudentsModule'),
          children: [
            {
              path: '',
              name: '',
              component: (students) => import('@/views/students/Students'),
            },
            {
              path: 'student/:student_id',
              name: 'Student',
              component: (student) => import('@/views/students/Student'),
            },
            {
              path: 'add_old_students',
              name: 'Add Old Student',
              component: (addOldStudent) => import('@/views/students/AddOldStudents'),
            },
          ]
        },
        {
          path: '/courses',
          name: 'Courses',
          redirect: '/courses/',
          component: (coursesModule) => import('@/views/courses/CoursesModule'),
          meta:{
            role: [1]
          },
          children: [
            {
              path: '',
              name: '',
              component: (courses) => import('@/views/courses/Courses'),
            },
            {
              path: 'add_course',
              name: 'Add Course',
              component: (addCourse) => import('@/views/courses/AddCourse'),
            },
          ]
        },
        {
          path: '/schedules',
          name: 'Schedules',
          redirect: '/schedules/',
          component: (schedulingModule) => import('@/views/scheduling/SchedulingModule'),
          children: [
            {
              path: '',
              name: '',
              component: (schedules) => import('@/views/scheduling/Schedules'),
            },
            {
              path: 'schedule/:schedule_id/',
              name: 'Course Schedule',
              component: (schedule) => import('@/views/scheduling/Schedule'),
            },
          ]
        },
        {
          path: '/prospectuses',
          name: 'Prospectuses',
          redirect: '/prospectuses/',
          component: (prospectusesModule) => import('@/views/prospectuses/ProspectusesModule'),
          children: [
            {
              path: '',
              name: '',
              component: (prospectuses) => import('@/views/prospectuses/Prospectuses'),
            },
            {
              path: 'add_prospectus',
              name: 'Add Prospectus',
              component: (addProspectus) => import('@/views/prospectuses/AddProspectus'),
            },
            {
              path: 'prospectus/:prospectus_id/',
              name: 'Prospectus',
              component: (addProspectus) => import('@/views/prospectuses/Prospectus'),
              children:[
                {
                  path: 'add_subjects',
                  name: 'Add Subjects',
                  component: (addSubjectss) => import('@/views/prospectuses/AddSubjects'),
                }
              ]
            },
          ]
        },
        {
          path: '/enrollment',
          name: 'Enrollment',
          redirect: '/enrollment/',
          component: (prospectusesModule) => import('@/views/enrollment/EnrollmentModule'),
          meta:{
            role: [1]
          },
          children: [
            {
              path: '',
              name: '',
              component: (enrollees) => import('@/views/enrollment/Enrollees'),
            },
            {
              path: 'enroll_new',
              name: 'Enroll New Student',
              component: (enrollNew) => import('@/views/enrollment/EnrollNew'),
            },
            {
              path: 'enroll_old',
              name: 'Enroll Old Student',
              component: (enrollOld) => import('@/views/enrollment/EnrollOld'),
            },
            {
              path: 'adding/:account_sm_id',
              name: 'Adding/ Dropping',
              component: (addingDropping) => import('@/views/enrollment/AddingDropping'),
            },
          ]
        },
        {
          path: '/rates',
          name: 'Rates',
          component: (paymentsModule) => import('@/views/payments/Rates'),
        },
        {
          path: '/payments',
          name: 'Payments',
          redirect: '/payments/for_down_payments',
          component: (paymentsModule) => import('@/views/payments/PaymentsModule'),
          children: [
            {
              path: 'for_down_payments',
              name: 'Down Payment',
              component: (downPayments) => import('@/views/payments/DownPayments'),
              meta:{
                role: [3]
              },
            },
            {
              path: 'grading_period_payments',
              name: 'Grading Period Payment',
              component: (gradingPeriodPayments) => import('@/views/payments/GradingPeriodPayments'),
            },
            {
              path: 'payment/:account_sm_id',
              name: 'Payment',
              component: (enrollOld) => import('@/views/payments/Payment'),
            },
          ]
        },
        {
          path: '/account_statements',
          name: 'Account Statements',
          redirect: '/account_statements/',
          component: (accountStatementsModule) => import('@/views/account_statements/AccountStatementsModule'),
          children: [
            {
              path: '',
              name: '',
              component: (accountStatements) => import('@/views/account_statements/AccountStatements'),
              meta:{
                role: [3]
              },
            },
            {
              path: 'account_statement/:account_sm_id',
              name: 'Account Statement',
              component: (accountStatement) => import('@/views/account_statements/AccountStatement'),
            },
          ]
        },
        {
          path: '/collections_report',
          name: 'Collections Report',
          redirect: '/collections_report/',
          component: (accountStatementsModule) => import('@/views/collections_report/CollectionsReportModule'),
          children: [
            {
              path: '',
              name: '',
              component: (collectionsReport) => import('@/views/collections_report/CollectionsReport'),
              meta:{
                role: [3,1]
              },
            }
          ]    
        },
        {
          path: '/subject_loads',
          name: 'Subjects Loads',
          component: (subjectLoads) => import('@/views/instructors/SubjectLoads'),
          meta:{
            role: [5,4]
          },
        },
        {
          path: '/grading_entry',
          name: 'Grading Entry',
          component: (gradingEntry) => import('@/views/instructors/GradingEntry'),
          meta:{
            role: [5,4]
          },
        },
        {
          path: '/settings',
          name: 'Settings',
          component: (settings) => import('@/views/settings/Settings'),
        },
        {
          path: '/logout',
          name: 'Logout',
          component: (logout) => import('@/views/pages/Logout'),
        },
      ]
    },
  ]
}

export const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  base: '/contact/',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {
  let loggedUserRole = parseInt(localStorage.getItem('role_id'))
  console.log(from)
  isLogged().then(res => {
    if (res === true){
      if(isPermitted(to.meta.role) == false){
        if(to.path != '/404'){
          next('/404')
        } else{
          next()
        }
      }else {
        if(to.path === '/login'){
          if(loggedUserRole == 2){
            next('/profile')
          } else {
            next('/dashboard')
          }
        } else{
          if(loggedUserRole == 2 && to.path == '/dashboard'){
            next('/profile')
          } else {
            next()
          }   
        } 
      } 
    } else {
      if(to.path !== '/login'){
        if(to.path === '/register'){
          next()
        } else {
          next('/login')
        }
      } else{
        next()
      }
    }
  });
})