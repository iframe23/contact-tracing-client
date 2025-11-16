<template>
    <AppHeader fixed :class="['navbar', 'navbar-dark', 'bg-nav']">
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="rounded navbar-brand-full" :src="this.$base_url+'img/contact-logo.jpg'" width="89" alt="DCIT Logo">
        <img class="rounded navbar-brand-minimized" :src="this.$base_url+'img/contact-logo.jpg'" width="30" height="30" alt="DCIT Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <!-- <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item> -->
      </b-navbar-nav>
      
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <span class="mb-0 mr-2"> {{loggedUser.firstname+' '+loggedUser.lastname}} </span>
          <span v-if="loggedUser.role_id == 3" class="mb-0 mr-3"> {{loggedUser.visiting_point_name}}</span>-
          <span class="mb-0 mr-3 ml-2"> {{loggedUser.role_name}} Account</span>
          <span v-if="loggedUser.role_id == 3" class="mb-0 mr-3"> - {{loggedUser.type}} Type</span>
          <span v-if="loggedUser.role_id == 4 || loggedUser.role_id == 5" class="mb-0 mr-3"> ( {{loggedUser.department_name}} )</span>
        </b-nav-item>
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item> -->
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block" /> -->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
</template>
<script>
import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'DefaultHeader',
  components: {
    AsideToggler,
    AppHeader,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  },
  data:() => {
    return {
      time: ''
    }
  },
  computed: {
    ...mapGetters(['loggedUser']),
  },
  methods: {
    ...mapActions([]),
  },
  async created(){

  }
}
</script>

<style>
.bg-nav{
  background-image: linear-gradient(rgb(18, 3, 102), rgb(2, 149, 207));
}
.navbar-dark .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 1);
}
.navbar-dark .navbar-toggler {
    color: rgba(255, 255, 255, 1);
    border-color: rgba(255, 255, 255, 1);
}
</style>