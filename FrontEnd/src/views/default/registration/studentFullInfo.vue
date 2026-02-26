<script>
  import avatar1 from '../../../assets/img_avatar3.png'
  import checkList from './components/checkList.vue'
  import axios from 'axios'
  export default{
    data() {
      return {
        accountData : {
          avatarImg: avatar1
        },
        studentData: null,
        set: false,
        selectedFile: null
      }
    },
    components: {
      checkList
    },

    
    created(){
      this.getStudent()
    },
    
    methods: {
      async getStudent(){
        await axios.get('/getOne/' + this.$route.params.id)
        .then((res)=>{
          this.studentData = res.data.data
        })
      },
      
      resetAvatar(){
          this.accountData.avatarImg = avatar1
          this.set = false
      },

      changeAvatar(file){
          const fileReader = new FileReader()
          const { files } = file.target
          this.selectedFile = files[0]
          if (files && files.length) {
            fileReader.readAsDataURL(files[0])
            fileReader.onload = () => {
            if (typeof fileReader.result === 'string')
                this.accountData.avatarImg = fileReader.result
                this.set = true
            }
          }
      },

      url(data){
          return "http://localhost:7000/uploads/students/" + data
      },

      upload(){
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        axios.post('/uploadStuImage/' + this.studentData._id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
            alert(res.data.message)
        })
        .catch((err) => {
            alert(err.response.data.message)
        });
      }
    },
  }
</script>

<template>
  <v-row>
    <v-col cols="4">
      <v-card>
        <v-card-text class="text-center">
          <h2>Student's Picture</h2>
          <v-avatar
            rounded="lg"
            size="300"
            class="mb-2"
            :image="accountData.avatarImg"
          />

          <!-- <v-avatar
            v-if="studentData.profileImage"
            rounded="lg"
            size="300"
            class="mb-2"
            :image="url(studentData.profileImage)"
          /> -->

          <v-divider :thickness="2"></v-divider>
          
          <form class="mt-2 text-center">
              <v-btn
                color="primary"
                @click="$refs.refInput.click()"
                class="mb-1"
                v-if="!set"
              >
                <span class="d-none d-sm-block">Select new photo</span>
                <v-icon class="ml-1">mdi:mdi-cloud-upload</v-icon>
              </v-btn>

              <v-btn
                color="success"
                @click="upload"
                class="mb-1"
                v-if="set"
              >
                <span class="d-none d-sm-block">Upload</span>
                <v-icon class="ml-1">mdi:mdi-cloud-check</v-icon>
              </v-btn>

              <!-- <v-btn
                color="warning"
                @click="$refs.refInput.click()"
                class="mb-1"
                v-if="!set"
              >
                <span class="d-none d-sm-block">Edit</span>
                <v-icon class="ml-1">mdi:mdi-pencil</v-icon>
              </v-btn> -->

              <input
                ref="refInput"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >
              

              <v-btn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
                class="ml-2 mb-1"
              >
                <span class="d-none d-sm-block">Reset</span>
                <v-icon class="ml-1">mdi:mdi-refresh</v-icon>
              </v-btn>
              <p class="text-body-1 mb-0 mt-1">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
          </form>
        </v-card-text>
        <v-divider />
      </v-card>
    </v-col>

    <v-col cols="8">
        <v-card title="Each and Every Registered Data of a Student">
            <v-card-text>
                <check-list :realData="studentData" v-if="studentData"></check-list>
            </v-card-text>
        </v-card>
    </v-col>

  </v-row>
</template>
