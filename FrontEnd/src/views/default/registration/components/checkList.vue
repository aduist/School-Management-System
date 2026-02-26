<template>
    <div>
        <div class="pa-4">
          <v-row>
            <v-col cols="4">
              <v-card color="light" class="my-2">
                <v-card-title>
                  Personal Information
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>Full Name: <b>{{data.firstName + " " + data.middleName + " " + data.lastName}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Gender: <b class="mr-2">{{data.gender}}</b> Religion: <b>{{data.religion}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Email: <b>{{data.email}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Phone Number: <b>{{data.phoneNumber}}</b></span>
                  </div>
                </v-card-text>
              </v-card>
              <v-card color="light" class="my-2">

                <v-card-title>
                  Birth's Information
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>Date: <b>{{data.birthData.birthDate.slice(0, 10)}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Zone: <b>{{data.birthData.zone}}</b> </span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Wereda: <b>{{data.birthData.wereda}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Tabya: <b>{{data.birthData.tabya}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Ketena: <b>{{data.birthData.ketena}}</b></span>
                  </div>
                </v-card-text>
              </v-card>

              <v-card color="light" class="my-2">

                <v-card-title>
                  Living Place
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>Zone: <b>{{data.livingPlace.zone}}</b> </span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Wereda: <b>{{data.livingPlace.wereda}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Tabya: <b>{{data.livingPlace.tabya}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Ketena: <b>{{data.livingPlace.ketena}}</b></span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card
                color="light"
                class="my-2"
              >

                <v-card-title>
                  Family's Information
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>Mother's Name: <b>{{data.motherName}}</b> </span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Guidance's Name: <b>{{data.guidanceData.fullName}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Guidance's P/Number: <b>{{data.guidanceData.phoneNumber}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Guidance's Job Status: <b>{{data.guidanceData.jobStatus}}</b></span>
                  </div>
                </v-card-text>
              </v-card>

              <v-card
                color="light"
                class="my-2"
              >

                <v-card-title>
                  Surety's Information
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>Surety's Name: <b>{{data.suretyData.fullName}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Surety's P/Number: <b>{{data.suretyData.phoneNumber}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Surety's Job Status: <b>{{data.suretyData.jobStatus}}</b></span>
                  </div>
                </v-card-text>
              </v-card>

              <v-card
                color="light"
                class="my-2"
              >
                <v-card-title>
                  Former School Information
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>Name of the School: <b>{{data.schoolFromData.nameOfSchool}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Zone: <b>{{data.schoolFromData.zone}}</b> </span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Wereda: <b>{{data.schoolFromData.wereda}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Tabya: <b>{{data.schoolFromData.tabya}}</b></span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="4">
              <v-card
                color="light"
                class="my-2"
              >
                <v-card-title>
                  Eighth Grade Result
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>National Exam Average: <b>{{data.eightGradeData.nationalExamAvg}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>National Exam Percentail: <b>{{data.eightGradeData.nationalExamPercentail}}</b> </span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Eight Grade Average: <b>{{data.eightGradeData.eightGradeAvg}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Eight Grade Rank: <b>{{data.eightGradeData.eightGradeRank}}</b> </span>
                  </div>
                </v-card-text>
              </v-card>

              <v-card
                color="light"
                class="my-2"
              >
                <v-card-title>
                  Entrance Exam Result
                  <v-divider></v-divider>
                </v-card-title>

                <v-card-text>
                  <div class="font-weight-regular justify-space-between">
                    <span>English: <b>{{data.entranceExamData.english}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Mathematics: <b>{{data.entranceExamData.maths}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Physics: <b>{{data.entranceExamData.physics}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Chemistry: <b>{{data.entranceExamData.chemistry}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Biology: <b>{{data.entranceExamData.bio}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span>Apptitude: <b>{{data.entranceExamData.sat}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                    <span class="text-h6">Rank: <b>{{data.entranceExamData.rank}}</b></span>
                    <v-divider class="my-2" :thickness="3"></v-divider>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
    export default {
        props: [
            'realData'
        ],
        data(){
          return{
            data: null
          }
        },
        created(){
          this.data = this.realData
        },
        methods: {
          format(data){
            return moment(data).format('DD-MM-YYYY')
          }
        }
    }
</script>

<style>
    
</style>