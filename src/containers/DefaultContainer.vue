<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <div class="sidebar-bg" >
          <AppSidebar fixed class="sidebar-bg" :style="bg_image">
            <SidebarHeader/>
            <SidebarForm/>
            <SidebarNav :navItems="sidebarNav"></SidebarNav>
            <SidebarFooter/>
            <SidebarMinimizer/>
          </AppSidebar>
      </div>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-md">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
import nav from '@/sidebar_nav'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'
import axios from 'axios';
import {mapActions,mapGetters} from 'vuex';

export default {
  name: 'DefaultContainer',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader,
  },
  data () {
    return {
      bg_image: {backgroundImage: "url("+this.$base_url+"img/bg.jpg)"},
      nav: [],
      user_role: 0
    }
  },
  async mounted() {
    await this.fetchLoggedUser()
    await this.fetchSidebarNav();
  },
  computed: {
    ...mapGetters(['sidebarNav', 'loggedUser']),
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  methods: {
    ...mapActions(['fetchSidebarNav', 'fetchLoggedUser']),
    isLast (index) {
      return index === this.list.length - 1
    },
    async generatedNavList(){
      nav.items.forEach(i => {
        if(this.user_role != 0){
          if(i.role != null && i.role != undefined && i.role.length != 0){
            
            i.role.forEach(i2 => {
              if(i2 == this.user_role){
                count++
                console.log(i.role)
              }
            })
            
            if(count == 0){
              i.class = 'd-none';
              i.children = '';

              console.log(i.name + ' has'+i.class);
            }
            count = 0;
          }
        }
      });
    }
  }
}
</script>

<style>
  .breadcrumb{
    margin-bottom: 0;
  }
  ol, ul, dl{
    margin: 0;
  }
  .sidebar-bg{
    background: #fff no-repeat fixed center;
    background-size: cover;
  }
  .sidebar-bg .sidebar-nav{
    background-color: rgba(2, 14, 36, 0.8);
  }

  .sidebar .sidebar-minimizer{
    background-color: rgba(2, 14, 36, 0.9);
  }
</style>