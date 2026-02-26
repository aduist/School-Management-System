<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="4">
                    <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                        <v-toolbar color="kalamino" dark="true">
                            <v-toolbar-title>Teacher's Info</v-toolbar-title>
                        </v-toolbar>

                        <div class="text-left pa-2">
                            <h3 class="wow">Name: {{ teacherData.firstName + " " + teacherData.middleName + " " + teacherData.lastName }}</h3>
                            <v-card
                                class="mx-auto mt-2 pa-2"
                                max-width="300"
                            >
                                <v-list>
                                <v-list-subheader><strong>Teacher Of</strong></v-list-subheader>

                                <v-list-item
                                    v-for="item in teacherData.teacherOf"
                                    :key="item"
                                    color="primary"
                                    rounded="shaped"
                                >
                                    <template v-slot:prepend>
                                        <v-icon icon="mdi:mdi-book-variant"></v-icon>
                                    </template>

                                    <v-list-item-title v-text="item"></v-list-item-title>
                                </v-list-item>
                                </v-list>
                            </v-card>

                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="8">
                    <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                        <v-toolbar color="info" dark="true">
                            <v-toolbar-title>Adjust Section and Subject to Teach</v-toolbar-title>
                        </v-toolbar>

                        <v-row>
                            <v-col cols="4">
                                <v-select label='Section' :items='sections' item-title='name' item-value='name'
                                    v-model='select.section' density='compact' size='small' class='mt-3'></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-select label='Subject' :items='teacherData.teacherOf' v-model='select.subject' density='compact' size='small' class='mt-3'></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-btn :disabled="!this.select.subject || !this.select.section" block class="mt-3" color="primary" append-icon="mdi:mdi-folder-plus" @click="addSec">Add</v-btn>
                            </v-col>
                        </v-row>
                        
                        <v-card class="mx-2 mt-2 pa-2">
                            <v-list>
                            <v-list-subheader class="ml-1"><strong>Choosed Function</strong></v-list-subheader>

                            <v-list-item
                                v-for="(item, i) in selected"
                                :key="item.section"
                                color="primary"
                                rounded="shaped"
                            >
                                <template v-slot:prepend>
                                    <v-icon icon="mdi:mdi-book-variant"></v-icon>
                                </template>

                                <v-list-item-title> <strong>{{i + 1}}</strong> <span class="text-green">{{ item.subject }}</span> for the <span class="text-blue">{{ item.class }}</span> Class </v-list-item-title>
                            </v-list-item>
                            </v-list>
                        </v-card>
                        <div class="text-center my-2">
                            <v-btn size="x-large" :disabled="this.selected.length == 0" color="kalamino" @click="submit">SUBMIT</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                teacherData: {},
                sections: [],
                selected: [],
                select: {
                    section: '',
                    subject: ''
                }
            }
        },

        created() {
            this.getTeacher()
        },

        methods: {
            getTeacher(){
                axios.get('/getTeacher/' + this.$route.query.id)
                .then((res)=>{
                    this.teacherData = res.data.data
                    this.getSections()
                })
            },

            getSections(){
                axios.get('/getSecName')
                .then((res)=>{
                    this.sections = res.data.data
                })
            },

            checkArray(){
                var selections = this.selected

                const check = (value, index, array)=>{
                    return value.class == this.select.section && value.subject == this.select.subject
                }

                if(this.selected.length == 0){
                    return false
                }else{
                    var data = selections.some(check)
                    return data
                }                
            },

            addSec(){
                if(this.checkArray()){
                    alert('Function Already Chosen')
                }else{
                    this.selected.push({
                        subject: this.select.subject,
                        class: this.select.section
                    })

                    this.select.subject = this.select.section = ''
                }
                
            },

            submit(){
                axios.patch('/setTeaching/' + this.teacherData._id, this.selected)
                .then((res)=>{
                    alert(res.data.message)
                    this.$router.push({name: 'EmployeeList'})
                })
            }
        },
    }
</script>
<style scoped>
    .wow{
        color: rgb(138, 210, 228);
        text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
    }
</style>