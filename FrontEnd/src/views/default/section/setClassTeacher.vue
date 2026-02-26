<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="8">
                    <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                        <v-toolbar color="info" dark="true">
                            <v-toolbar-title>Select One Teacher for {{ $route.query.section }}</v-toolbar-title>
                        </v-toolbar>
                        
                        <v-card class="mx-auto pa-2">
                            <v-list v-model="selected">
                                <v-list-subheader>Teachers with their Subjects</v-list-subheader>

                                <v-list-item
                                    v-for="(teacher, i) in teachers"
                                    :key="i"
                                    :value="teacher._id"
                                    color="primary"
                                    rounded="shaped"
                                    @click="select(teacher)"
                                    :disabled="teacher.classTeacherOf"
                                >
                                    <template v-slot:prepend>
                                        <v-icon icon="mdi:mdi-account-star"></v-icon>
                                    </template>

                                    <v-list-item-title>
                                        <span class="mr-2">{{ teacher.firstName + " " + teacher.middleName + " " + teacher.lastName }}</span>
                                        <span v-for="subject in teacher.teacherOf" :key="subject">
                                            <v-chip color="red" variant="elevated" class="mr-1">
                                                {{ subject }}
                                            </v-chip>
                                        </span>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                    <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                        <v-toolbar color="kalamino" dark="true">
                            <v-btn icon='mdi:mdi-creation'></v-btn>
                            <v-toolbar-title>Selected</v-toolbar-title>
                        </v-toolbar>
                        <div class="text-center pa-1 mt-4" v-if="selected">
                            <h3 class="wow">{{ selected.firstName + " " + selected.middleName + " " + selected.lastName }}</h3>
                            <h2 class="mt-3 text-blue">As a Class Teacher of <strong>{{ $route.query.section }}</strong></h2>
                            <v-btn color="kalamino" class="mt-2" @click="assign">Assign</v-btn>
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
                teachers: [],
                selected: null
            }
        },

        created() {
            this.getTeachers()
        },

        methods: {
            getTeachers(){
                axios.get('/teachers')
                .then((res)=>{
                    this.teachers = res.data.data
                })
            },

            select(item){
                this.selected = item
            },

            assign(){
                const data = {
                    teacherId: this.selected._id,
                    sectionId: this.$route.params.id
                }
                axios.patch('/setClassTeacher', data)
                .then((res)=>{
                    alert(res.data.message)
                    this.$router.push({name: 'ClassManagement'})
                })
                .catch((err)=>{
                    alert(err.response.data.message)
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