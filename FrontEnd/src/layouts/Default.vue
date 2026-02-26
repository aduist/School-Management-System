<template>
  <v-app>
    <v-app-bar app color="kalamino" dark clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>KSHS E-School</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi:mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="leftDraw = !leftDraw">
        <v-icon icon="mdi:mdi-account-circle"></v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" absolute clipped permanent theme="dark" style="height: 100%">
      <img src="../assets/download.jpeg" alt="" style="width: 240px;">
      <v-divider></v-divider>
      <v-list nav>
          <v-list-item 
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon" 
          :title="item.title" 
          :to="{name: item.link}">
        </v-list-item>
      </v-list>

      <!-- <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="primary">
              Logout
            </v-btn>
          </div>
      </template> -->
    </v-navigation-drawer>

    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <notifications></notifications>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
        permanent
        location="right"
        rail
        expand-on-hover
        theme="dark"
        v-model="leftDraw"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="../assets/bg-img1.jpg"
            :title="userData.fullName"
            :subtitle="userData.role"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item :disabled="userData.role == 'Student'" @click="leftDraw = false" prepend-icon="mdi:mdi-wrench" title="Settings" value="home"></v-list-item>
          <v-list-item :disabled="userData.role == 'Student'" @click="leftDraw = false" :to="{name: 'MyProfile'}" prepend-icon="mdi:mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item :disabled="userData.role == 'Student'" @click="leftDraw = false" prepend-icon="mdi:mdi-bell-ring" title="Notifications" value="users"></v-list-item>
          <v-list-item @click="logOut" prepend-icon="mdi:mdi-logout" title="LogOut" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-main>
          <v-toolbar dark color="success">
            <v-toolbar-title>
              <v-icon left class="mx-2">{{ this.$route.meta.icon }}</v-icon>
              {{ this.$route.meta.title }}
            </v-toolbar-title>
          </v-toolbar>
        
        
        <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script>
import bars from '../data/sideBar'
import notifications from './components/notifications.vue';
import jwt_decode from "jwt-decode";

export default {
  name: "App",

  components: {
    notifications
  },

  data: () => ({
    drawer: null,
    items: [],
    leftDraw: false,
    dialog: false,
    show: false,
    userData: {
      fullName: '',
      role: ''
    }
  }),

  created(){
    this.items = bars
    this.getData()
  },

  methods: {
    getData(){
      var decoded = jwt_decode(localStorage.getItem('kshsToken'));
      this.userData.fullName = decoded.fullName
      this.userData.role = decoded.role
    },

    logOut(){
      localStorage.setItem('kshsToken', '')
      this.$router.push({name: 'LogIn'})
    }
  },
};
</script>

<style scoped>
.login-form {
padding: 20px;
margin-top: 20px;
}

.login-form-input {
width: 100%;
margin-bottom: 10px;
}

.v-text-field__slot {
border-radius: 10px;
padding: 10px;
background-color: #fff;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.v-text-field__prepend-inner-icon {
color: #ccc;
margin-right: 10px;
}

.login-form-button {
width: 100%;
margin-top: 10px;
}
</style>