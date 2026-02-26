<template>
    <v-app>
        <v-row>
            <v-col cols="8">
                <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                    <v-toolbar color="info" dark="true">
                        <v-btn icon='mdi:mdi-format-list-checks'></v-btn>
                        <v-toolbar-title>Select Students for {{ $route.query.class }}</v-toolbar-title>
                        <v-text-field density="compact" class="mt-4 mr-1" placeholder="Search Here" color="kalamino" v-model="filter"></v-text-field>
                    </v-toolbar>
                    <v-data-table-server v-model="selected" v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
                            :items="filteredItems" :loading="loading" item-value="_id" density="compact" show-select>
                        <template v-slot:item.index="{ item }">
                            {{ item.index + 1 }}
                        </template>
                        <template v-slot:no-data>
                            No Data Found
                        </template>
                    </v-data-table-server>
                </v-card>
            </v-col>

            <v-col cols="4">
                <v-card shaped class='rounded pa-1' style="border: 2px solid #ccc;">
                    <v-toolbar color="kalamino" dark="true">
                        <v-btn icon='mdi:mdi-creation'></v-btn>
                        <v-toolbar-title>Selected</v-toolbar-title>
                    </v-toolbar>

                    <div>
                        <h2>{{ selected.length }} Students Selected</h2>
                        <v-btn class="mt-2" block color="kalamino">Submit</v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    export default {
        data() {
            return {
                students: [],
                loading: true,
                headers: [
                    { title: 'R.No', key: 'index', sortable: false },
                    { title: 'Name', key: 'name', sortable: false, value: item => `${item.firstName} ${item.middleName} ${item.lastName}` },
                    { title: 'Age', key: 'age', sortable: false, value: item => `${this.format(item.birthData.birthDate)}` },
                    { title: 'Gender', key: 'gender', sortable: false },
                ],
                itemsPerPage: 10,
                totalItems: 0,
                selected: [],
                filter: ''
            }
        },

        created() {
            this.getStudents()
        },

        methods: {
            getStudents(){
                axios.get('/getUnsetted')
                .then((res)=>{
                    this.students = res.data.data
                    this.loading = false
                    this.totalItems = res.data.data.length
                })
            },

            format(date){
                return moment(date).fromNow(true)
            }
        },
        
        computed: {
            filteredItems(){
                return this.students.filter((element) => {
                    return (element.firstName + " " + element.middleName + " " + element.lastName).toLowerCase().includes(this.filter.toLowerCase())
                })
            }
        },
    }
</script>

<style>
    
</style>