<template>
  <v-card class="mx-auto my-auto" color="#bee9ba" min-width="600" min-height="420" variant="flat">
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card elevation="2" height="200" class="d-flex align-center justify-center ma-2">
          <h1 class="text-h2">Welcome to the Registration Page</h1>
        </v-card>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-form ref="form1">
            <div class=" text-medium-emphasis mb-1">Student's Full Name</div>
            <v-row justify="start">
              <v-col cols="4">
                <v-text-field ref="firstName" density="compact" prepend-inner-icon="mdi:mdi-account-box-outline" label="First Name"
                  v-model="state.firstName" validate-on="blur" :rules="[checkName]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-account-box-outline" label="Middle Name"
                  v-model="state.middleName"  validate-on="blur" :rules="[checkName]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-account-box-outline" label="Last Name"
                  v-model="state.lastName"  validate-on="blur" :rules="[checkName]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-select :items="sexs" density="compact" label="Gender" prepend-inner-icon="mdi:mdi-human-male-female"
                  v-model="state.gender"  validate-on="blur" :rules="[required]"></v-select>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-phone-classic" label="Phone Number"
                  type="number" v-model="state.phoneNumber" validate-on="blur" :rules="[phoneNumber]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-email" label="Email Address"
                  v-model="state.email" validate-on="blur" :rules="[required, email]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-select :items="religions" density="compact" prepend-inner-icon="mdi:mdi-church" label="Religion"
                  v-model="state.religion"  validate-on="blur" :rules="[required]"></v-select>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <v-card-text>
          <v-form ref="form2">
            <div class=" text-medium-emphasis mb-1">Birth Full Data</div>
            <v-row justify="start">
              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-timetable" label="Birth's Date" type="date"
                  v-model="state.birthData.birthDate" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-city" label="Zone"
                  v-model="state.birthData.zone" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-home-map-marker" label="Wereda"
                  v-model="state.birthData.wereda" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" label="Tabya" prepend-inner-icon="mdi:mdi-file-document"
                  v-model="state.birthData.tabya" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-home-variant" label="Ketena"
                  v-model="state.birthData.ketena" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

            </v-row>

            <div class=" text-medium-emphasis mb-1">Living Place Data</div>
            <v-row justify="start">

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-city" label="Zone"
                  v-model="state.livingPlace.zone" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-home-map-marker" label="Wereda"
                  v-model="state.livingPlace.wereda" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" label="Tabya" prepend-inner-icon="mdi:mdi-file-document"
                  v-model="state.livingPlace.tabya" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-home-variant" label="Ketena"
                  v-model="state.livingPlace.ketena" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="4">
        <v-card-text>
          <v-form ref="form3">
            <div class="text-medium-emphasis mb-1">Mother's Name</div>
            <v-row justify="start">
              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-account-box-outline" label="First Name"
                  v-model="mother.first" @input="motherAdd" validate-on="blur" :rules="[checkName]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-account-box-outline" label="Middle Name"
                  v-model="mother.middle" @input="motherAdd" validate-on="blur" :rules="[checkName]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-account-box-outline" label="Last Name"
                  v-model="mother.last" @input="motherAdd" validate-on="blur" :rules="[checkName]"></v-text-field>
              </v-col>
            </v-row>

            <div class=" text-medium-emphasis mb-1">Guidance Data</div>
            <v-row justify="start">

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-human-handsdown" label="Full Name"
                  v-model="state.guidanceData.fullName" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-phone" label="Phone Number" type="number"
                  v-model="state.guidanceData.phoneNumber" validate-on="blur" :rules="[phoneNumber]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" label="Job Status" prepend-inner-icon="mdi:mdi-briefcase"
                  v-model="state.guidanceData.jobStatus" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>
            </v-row>

            <div class=" text-medium-emphasis mb-1">Surety's Data    <v-btn size="x-small" class="ml-3 mb-1" @click="copy">Copy the Above</v-btn></div>
            <v-row justify="start">

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-grease-pencil" label="Full Name"
                  v-model="state.suretyData.fullName" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-phone" label="Phone Number" type="number"
                  v-model="state.suretyData.phoneNumber" validate-on="blur" :rules="[phoneNumber]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" label="Job Status" prepend-inner-icon="mdi:mdi-briefcase"
                  v-model="state.suretyData.jobStatus" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="5">
        <v-card-text>
          <v-form ref="form4">
            <div class="text-medium-emphasis mb-1">Former School Data</div>
            <v-row justify="start">

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-school" label="Name of the School"
                  v-model="state.schoolFromData.nameOfSchool" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-city" label="Zone"
                  v-model="state.schoolFromData.zone" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" label="Wereda" prepend-inner-icon="mdi:mdi-home-map-marker"
                  v-model="state.schoolFromData.wereda" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" label="Tabya" prepend-inner-icon="mdi:mdi-file-document"
                  v-model="state.schoolFromData.tabya" validate-on="blur" :rules="[required]"></v-text-field>
              </v-col>
            </v-row>

            <div class="text-medium-emphasis mb-1">Eighth Grade Data</div>
            <v-row justify="start">

              <v-col cols="3">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-certificate" label="National Exam Average"
                  type="number" v-model="state.eightGradeData.nationalExamAvg"  :rules="[required, notMoreThan100]"></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-certificate"
                  label="National Exam Percentail" type="number"
                  v-model="state.eightGradeData.nationalExamPercentail" :rules="[required, notMoreThan100]"></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-certificate" label="Eighth Grade Average"
                  type="number" v-model="state.eightGradeData.eightGradeAvg" :rules="[required, notMoreThan100]"></v-text-field>
              </v-col>

              <v-col cols="3">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-certificate" label="Eighth Grade Rank"
                  type="number" v-model="state.eightGradeData.eightGradeRank" :rules="[required]"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="6">
        <v-card-text>
          <v-form ref="form5">
            <div class="text-medium-emphasis mb-1">Test Scores</div>
            <v-row justify="start">
              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-alphabetical" label="English" type="number"
                  v-model="state.entranceExamData.english" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-numeric" label="Mathematics" type="number"
                  v-model="state.entranceExamData.maths" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-ruler" label="Physics" type="number"
                  v-model="state.entranceExamData.physics" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-test-tube" label="Chemistry" type="number"
                  v-model="state.entranceExamData.chemistry" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-bio" label="Biology" type="number"
                  v-model="state.entranceExamData.bio" :rules="[required]"></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-puzzle" label="Apptitude" type="number"
                  v-model="state.entranceExamData.sat" :rules="[required]"></v-text-field>
              </v-col>
            </v-row>

            <div class="text-medium-emphasis mb-1">Rank</div>
            <v-row justify="start">
              <v-col cols="4">
                <v-text-field density="compact" prepend-inner-icon="mdi:mdi-trophy-outline" label="Rank" type="number"
                  v-model="state.entranceExamData.rank" :rules="[required]"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="7">
        <check-component :realData="state"></check-component>
      </v-window-item>

      <v-window-item :value="8">
        <div class="pa-4 text-center">
          <div v-if="!showProgress">
            <h3 class="text-h6 font-weight-light mb-2">
              If you are sure with the Information listed on the Previous page then Click <code>SUBMIT</code>, If not you can go back and <code>Edit</code> the Mistaken Information.
            </h3>
            <v-btn density="comfortable" size="x-large" class="mt-3 mr-4" color="warning" @click="step = 2">EDIT</v-btn>
            <v-btn density="comfortable" size="x-large" class="mt-3" color="kalamino" @click="submit">SUBMIT</v-btn>
          </div>

          <v-progress-circular :rotate="360" :size="300" :width="30" :model-value="value" color="kalamino" v-if="showProgress">
            <template v-slot:default> {{ value }} % </template>
          </v-progress-circular>
        </div>
      </v-window-item>

      <v-window-item :value="9">
        <div class="pa-4 text-center">
          <v-img class="mb-4" contain height="150" src="../../../assets/img_avatar3.png"></v-img>
          <h3 class="text-h6 font-weight-light mb-2">
            Student Registered
          </h3>
          <span class="text-caption text-grey">Student's Data and Related Information will be found on the Student's List. <router-link :to="{name: 'StudentList'}">Go there.</router-link></span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions class="mb-5">
      <v-btn v-if="step > 1" variant="text" @click="step--">
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step == 1" color="primary" variant="flat" @click="step++">
        Next
      </v-btn>
      <v-btn v-if="step == 2" color="primary" variant="flat" @click="step1()">
        Next
      </v-btn>
      <v-btn v-if="step == 3" color="primary" variant="flat" @click="step2()">
        Next
      </v-btn>
      <v-btn v-if="step == 4" color="primary" variant="flat" @click="step3()">
        Next
      </v-btn>
      <v-btn v-if="step == 5" color="primary" variant="flat" @click="step4()">
        Next
      </v-btn>
      <v-btn v-if="step == 6" color="primary" variant="flat" @click="step5()">
        Next
      </v-btn>

      <v-btn v-if="step == 7" color="primary" variant="flat" @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import checkComponent from './components/checkList.vue'
  import axios from 'axios'
  import validator from 'validator'
  export default {
    data() {
      return {
        step: 1,
        mother: {
          first: '',
          middle: '',
          last: ''
        },
        state: {
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          phoneNumber: '',
          email: '',
          religion: '',
          birthData: {
            birthDate: '',
            zone: '',
            wereda: '',
            tabya: '',
            ketena: ''
          },
          livingPlace: {
            zone: '',
            wereda: '',
            tabya: '',
            ketena: '',
          },
          motherName: '',
          guidanceData: {
            fullName: '',
            phoneNumber: '',
            jobStatus: ''
          },
          suretyData: {
            fullName: '',
            phoneNumber: '',
            jobStatus: ''
          },
          schoolFromData: {
            nameOfSchool: '',
            zone: '',
            wereda: '',
            tabya: '',
          },
          eightGradeData: {
            nationalExamAvg: '',
            nationalExamPercentail: '',
            eightGradeAvg: '',
            eightGradeRank: '',
          },
          entranceExamData: {
            english: '',
            maths: '',
            physics: '',
            bio: '',
            chemistry: '',
            sat: '',
            rank: '',
          },
        },
        sexs: ['Male', 'Female'],
        religions: ['None', 'Orthodox', 'Catholic', 'Protestant', 'Muslim'],
        interval: -1,
        value: 0,
        showProgress: false
      }
    },

    components: {
      checkComponent
    },

    methods: {
        motherAdd(){
          this.state.motherName = this.mother.first + " " + this.mother.middle + " " + this.mother.last
        },

        required(value){
          return value == '' ? "Field is Required": true
        },

        checkName(value){
            if(value == ''){
              return "Field is Required"
            }else if(value.length < 3){
              return "Field must contain more than 3 letters"
            }else if(value.length > 20){
              return "Field must contain letters less than 20"
            }
        },

        phoneNumber(value){
          if(!value){
            return "Field is Required"
          }else if(!validator.isNumeric(value)){
            return "Phone Number must contain numbers"
          }else if(value.length > 10){
            return "More than 10. Impossible"
          }
        },

        email(value){
          if(!validator.isEmail(value)){
            return "Incorrect Email Address"
          }
        },

        notMoreThan100(value){
          if(value < 0){
            return "Too Low"
          }else if(value > 100){
            return "Too Much"
          }
        },

        copy(){
          this.state.suretyData.fullName = this.state.guidanceData.fullName
          this.state.suretyData.phoneNumber = this.state.guidanceData.phoneNumber
          this.state.suretyData.jobStatus = this.state.guidanceData.jobStatus
        },

        async step1(){
            const {valid, errors} = await this.$refs.form1.validate()

            if(valid){
              this.step = 3
            }else{
              alert('The Form is Invalid')
            }
        },

        async step2(){
            const {valid, errors} = await this.$refs.form2.validate()

            if(valid){
              this.step = 4
            }else{
              alert('The Form is Invalid')
            }
        },

        async step3(){
            const {valid, errors} = await this.$refs.form3.validate()

            if(valid){
              this.step = 5
            }else{
              alert('The Form is Invalid')
            }
        },

        async step4(){
            const {valid, errors} = await this.$refs.form4.validate()

            if(valid){
              this.step = 6
            }else{
              alert('The Form is Invalid')
            }
        },

        async step5(){
            const {valid, errors} = await this.$refs.form5.validate()

            if(valid){
              this.step = 7
            }else{
              alert('The Form is Invalid')
            }
        },

        submit(){
          // this.showProgress = true
          // this.interval = setInterval(() => {
          //   if (this.value === 100) {
          //     this.step = 9
          //     this.showProgress = false
          //     return this.value = 0
          //     this.interval = null
          //   }
          //   this.value += 10
          // }, 1000)
          axios.post('/addStudent', this.state)
          .then((res)=>{
            this.step = 9
          })
        }
    },

    computed: {
      currentTitle() {
        if (this.step == 1) {
          return ''
        }
        if (this.step == 2) {
          return 'Personal Information'
        }
        if (this.step == 3) {
          return 'Birth and Living Place Information'
        }
        if (this.step == 4) {
          return 'Family and Surety INformation'
        }
        if (this.step == 5) {
          return 'Former School and Result Information'
        }
        if (this.step == 6) {
          return 'Entrance Exam Result'
        }
        if (this.step == 7) {
          return 'Check the Information'
        }
        if (this.step == 8) {
          return 'Confirmation'
        }
        else {
          return 'Student Registered'
        }
      }
    },
  }
</script>