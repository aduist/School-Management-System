<template>
    <v-app>
        <img src="../../assets/bg-img1.jpg" alt="" class="img">
        <v-card
            class="mx-auto my-auto"
            color="#36393f"
            min-width="600"
            min-height="350"
            variant="flat"
        >
        
            <v-toolbar dark color="kalamino">
                <v-toolbar-title>
                <v-icon left>mdi:mdi-login</v-icon>
                Welcome to KSHS E-School
                </v-toolbar-title>
            </v-toolbar>

            <v-container class="mt-3">
                <h2 class="text-center my-1">Enter your IDnumber</h2>
                <v-form class="my-2">
                    <v-text-field
                        label="ID Number"
                        v-model="idNumber"
                        prepend-inner-icon="mdi:mdi-credit-card-scan"
                    >
                    </v-text-field>

                    <v-btn x-large color="kalamino" class="float-right mb-2" @click="signIn">Next <v-icon>mdi:mdi-forward</v-icon></v-btn>
                </v-form>

                <v-btn block variant="text" to="/">I am a Employee.</v-btn>
            </v-container>
        
        </v-card>
        
    </v-app>
</template>
  
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        idNumber: ''
      }
    },

    created() {
      
    },

    methods: {
      signIn(){
        axios.post('/studentLogIn', {idNumber: this.idNumber})
        .then((res)=>{
          alert(res.data.message)
          localStorage.setItem('kshsToken', res.data.accesstoken)
          this.$router.push({name: 'Home'})
        })
        .catch(err=>{
            alert(err.response.data.message)
        })
      }
    },
  }
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

.img{
    position: absolute;
    z-index: -1;
    width: 100%;
}
</style>
  