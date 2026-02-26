<template>
    <div>
        <v-dialog v-model="infoModal" width="500px">
            <v-card>
                <v-toolbar color="kalamino" flat class="text-center">
                    <v-toolbar-title>More Information about {{ infoData.name }}</v-toolbar-title>
                </v-toolbar>

                <v-container>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-subheader>
                            <b><strong>Class Teacher</strong></b>
                        </v-list-subheader>
                        <v-list-item v-if="infoData.classTeacherId">
                            <v-list-item-title>{{infoData.classTeacherId.firstName + " " + infoData.classTeacherId.middleName + " " + infoData.classTeacherId.lastName}}</v-list-item-title>

                            <v-list-item-subtitle>
                                He is a teacher of <span v-for="subject in infoData.classTeacherId.teacherOf" :key="subject" class="text-blue">{{ subject }}, </span>
                            </v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item v-else>
                            <b class="text-red">Not Setted</b>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-subheader>
                            <b><strong>Male Monitor</strong></b>
                        </v-list-subheader>
                        <v-list-item>
                            <v-list-item-title v-if="infoData.maleMonitorId">{{infoData.maleMonitorId}}</v-list-item-title>
                            <v-list-item-title v-else>
                                <b class="text-red">Not Setted</b>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-subheader>
                            <b><strong>Male Monitor</strong></b>
                        </v-list-subheader>
                        <v-list-item>
                            <v-list-item-title v-if="infoData.femaleMonitorId">{{infoData.femaleMonitorId}}</v-list-item-title>
                            <v-list-item-title v-else>
                                <b class="text-red">Not Setted</b>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-container>
            </v-card>
        </v-dialog>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="4">
                    <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                        <v-toolbar color="kalamino" dark="true">
                            <v-btn icon='mdi:mdi-creation'></v-btn>
                            <v-toolbar-title>Create Class</v-toolbar-title>
                        </v-toolbar>

                        <v-form class='pa-1'>
                             <v-row class="my-1">
                                <v-col cols='6'>
                                    <v-select density='compact' label='Grade' :items='classes' v-model='data.classNum'></v-select>
                                </v-col>
                                <v-col cols='6'>
                                    <v-select density='compact' label='Section' :items='sections' v-model='data.section'></v-select>
                                </v-col>
                             </v-row>
                             <v-btn class="my-3" color="kalamino" block @click="addSec" :disabled="!data.classNum || !data.section">Create {{classSec}}</v-btn>
                        </v-form>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="8">
                    <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                        <v-toolbar color="info" dark="true">
                            <v-btn icon='mdi:mdi-format-list-checks'></v-btn>
                            <v-toolbar-title>See Class List</v-toolbar-title>
                        </v-toolbar>
                        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
                                :items="items" :loading="loading" item-value="name" density="compact">
                            <template v-slot:item.index="{ item }">
                                {{ item.index + 1 }}
                            </template>
                            <template v-slot:item.classTeacher="{ item }">
                                <h4 :class="item.selectable.classTeacherId ? 'text-green' : 'text-red'">{{ item.selectable.classTeacherId ? 'Setted' : 'Not Setted' }}</h4>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-tooltip text="More Information">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind='props' icon="mdi:mdi-information-outline" @click="showInfo(item.selectable)" variant='elevated' size='small'
                                            color='primary' class='my-1 mx-1'></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Assign Class Teacher">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind='props' icon="mdi:mdi-desktop-classic" variant='elevated' size='small' :disabled="item.selectable.classTeacherId"
                                            color='info' class='my-1 mx-1' @click="setClassTeacher(item.selectable._id, item.selectable.name)"></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Select Students">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind='props' icon="mdi:mdi-vector-selection" variant='elevated' size='small'
                                            color='kalamino' class='my-1 mx-1' @click="selectStu(item.selectable._id, item.selectable.name)"></v-btn>
                                    </template>
                                </v-tooltip>
                            </template>
                            <template v-slot:no-data>
                                No Data Found
                            </template>
                        </v-data-table-server>
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
                data: {
                    name: '',
                    classNum: '',
                    section: ''
                },
                classes: [9, 10, 11, 12],
                sections: ['A', 'B', 'C', 'D', 'E'],
                headers: [
                    { title: 'R.No', key: 'index', sortable: false },
                    { title: 'Class Name', key: 'name', align: 'start', sortable: true, },
                    { title: 'Class Teacher', key: 'classTeacher', align: 'start', sortable: false },
                    { title: 'Students', key: 'students', align: 'start', sortable: false, value: item => `${item.students.length}` },
                    { title: 'Actions', key: 'actions', sortable: false }
                ],
                items: [],
                itemsPerPage: 5,
                loading: true,
                totalItems: 0,
                infoModal: false,
                infoData: {}
            }
        },

        created(){
            this.getSec()
        },

        methods: {
            addSec(){
                this.data.name = this.classSec
                axios.post('/addSection', this.data)
                .then((res)=>{
                    alert(res.data.message)
                    this.data.name = ''
                    this.data.classNum = ''
                    this.data.section = ''
                    this.getSec()
                })
                .catch(err=>{
                    alert(err.response.data.message)
                })
            },

            getSec(){
                axios.get('/getSections')
                .then((res)=>{
                    this.items = res.data.data
                    this.loading = false
                })
            },

            showInfo(item){
                this.infoData = item
                this.infoModal = true
            },

            setClassTeacher(id, section){
                this.$router.push({name: "ClassTeacherSet", params: {id: id}, query: {section: section}})
            },

            selectStu(id, section){
                this.$router.push({name: "SetStudents", params: {id: id}, query: {class: section}})
            }
        },

        computed: {
            classSec(){
                return this.data.classNum + this.data.section
            }
        },
    }
</script>

<style>
    
</style>