<template>
    <v-app>
        <v-dialog v-model="securityDialog" width="500px">
            <v-card>
                <div v-if="secureData.flag">
                    <v-card-text>
                        <b>Username: {{ secureData.username }}</b>
                    </v-card-text>
                    <v-card-text>
                        <b>Password: {{ secureData.username + "123456" }}</b>
                    </v-card-text>
                </div>
                <div v-else class="pa-4">
                    <b class="text-green"><strong>User has Secured his Account</strong></b>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog v-model="infoModal" width="800px">
            <v-card>
                <v-card-title class="text-center">
                    <v-chip variant="outlined" size="x-large" color="kalamino">Full Information of Employee</v-chip>
                    <v-btn class="float-right" size="small" @click="infoModal = false" icon="mdi:mdi-close-circle" color="red"></v-btn>
                </v-card-title>
                <v-card-text justify="center">
                    <v-card theme="dark" class="mx-auto my-auto pa-5">
                        <v-row>
                            <v-col cols="6">
                                <v-chip color="success" size="large" variant="elevated">Full Name: {{modalData.firstName + " " + modalData.middleName + " " + modalData.lastName}}</v-chip>
                            </v-col>
                            <v-col cols="6">
                                <v-chip color="success" size="large" variant="elevated">Phone Number: +251{{modalData.phoneNumber}}</v-chip>
                            </v-col>
                            <v-col cols="6">
                                <v-chip color="success" size="large" variant="elevated">Email Address: {{modalData.email}}</v-chip>
                            </v-col>
                            <v-col cols="6">
                                <v-chip color="success" size="large" variant="elevated">Gender: {{modalData.gender}}</v-chip>
                                <v-chip color="success" size="large" variant="elevated" class="ml-4">Role: {{modalData.role}}</v-chip>
                            </v-col>
                        </v-row>
                        <v-divider :thickness="3" class="my-2"></v-divider>
                        <div v-if="modalData.role == 'Teacher'">
                            <v-row>
                                <v-col cols="4">
                                    <h2>Teacher of:</h2>
                                </v-col>
                                <v-col cols="8">
                                    <v-row>
                                        <v-col cols="6" v-for="subject in modalData.teacherOf">
                                            <v-chip color="primary" size="large" variant="elevated" class="ml-4">{{subject}}</v-chip>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-divider :thickness="3" class="my-2"></v-divider>
                            <v-row>
                                <v-col cols="4">
                                    <h2>Teaches Now</h2>
                                </v-col>
                                <v-col cols="8">
                                    <v-list>
                                        <v-row>
                                            <v-col v-for="teach in modalData.teachsNow" cols="6">
                                                {{ teach.subject }} for {{ teach.class }}
                                            </v-col>
                                        </v-row>
                                    </v-list>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="setModal" width="500px">
            <v-card>
                <v-toolbar color="transparent" flat>
                    <v-toolbar-title>The Teacher can teach</v-toolbar-title>
                </v-toolbar>

                <v-container>
                    <v-row
                        align="center"
                        justify="start"
                    >
                        <v-col v-for="(selection, i) in selections" :key="selection.text" cols="auto" class="py-1 pe-0">
                            <v-chip
                                :disabled="loading"
                                closable
                                @click:close="selected.splice(i, 1)"
                            >
                                <v-icon :icon="selection.icon" start></v-icon>

                                {{ selection.text }}
                            </v-chip>
                        </v-col>

                        <v-col v-if="!allSelected" cols="12">
                            <v-text-field
                                ref="searchField"
                                v-model="search"
                                hide-details
                                label="Search Subjects..."
                                single-line
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>

                <v-divider v-if="!allSelected"></v-divider>

                <v-list>
                    <template v-for="item in categories">
                        <v-list-item
                            v-if="!selected.includes(item)"
                            :key="item.text"
                            :disabled="loading"
                            @click="selected.push(item)"
                        >
                        <template v-slot:prepend>
                            <v-icon
                            :disabled="loading"
                            :icon="item.icon"
                            ></v-icon>
                        </template>

                        <v-list-item-title v-text="item.text"></v-list-item-title>

                        </v-list-item>
                    </template>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        :disabled="!selected.length"
                        :loading="loading"
                        color="kalamino"
                        variant="flat"
                        @click="next"
                    >
                        Next
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card color="#bee9ba" min-width="600" min-height="420" variant="flat">
            <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
                :items="filteredItems" :loading="loading" item-value="name" density="compact" :sortBy="sortBy">
                <template v-slot:item.index="{ item }">
                    {{ item.index + 1 }}
                </template>
                <template v-slot:item.role="{ item }">
                    <v-chip :color="getColor(item.selectable.role)" variant="elevated">
                        <v-icon start :icon="getIcon(item.selectable.role)"></v-icon>
                        {{ item.selectable.role }}
                    </v-chip>
                </template>
                <template v-slot:item.info="{ item }">
                    <h4 :class="!item.selectable.secured ? 'text-red' : 'text-green'">{{ !item.selectable.secured ? 'Insecure' : 'Secured' }}</h4>
                </template>
                <template v-slot:item.security="{ item }">
                    <v-btn color="error" @click="checkSecurity(item.selectable)">
                        <v-icon>mdi:mdi-lock</v-icon>
                    </v-btn>
                </template>
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <v-row>
                                <v-col cols='4'>
                                    <v-text-field placeholder="Search item here..." density='compact' v-model='filter'
                                        size='small' class='mt-3' prepend-icon="mdi:mdi-account-search"></v-text-field>
                                </v-col>
                                <v-col cols='2'>
                                    <v-select label='Role' :items='roles' item-title='title' item-value='value'
                                        v-model='role' density='compact' size='small' class='mt-3'
                                        prepend-icon="mdi:mdi-account-search"></v-select>
                                </v-col>
                                <v-col cols='2'>
                                    <v-select label='Gender' :items='gender' item-title='title' item-value='value'
                                        v-model='sex' density='compact' size='small' class='mt-3'
                                        prepend-icon="mdi:mdi-account-search"></v-select>
                                </v-col>
                            </v-row>
                        </v-toolbar-title>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-tooltip text="More Information">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind='props' icon="mdi:mdi-information-outline" @click="showInfo(item.selectable)" variant='elevated' size='small'
                                color='primary' class='my-1 mx-1'></v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Edit Information" v-if="false">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind='props' icon="mdi:mdi-table-edit" variant='elevated' size='small'
                                color='warning' class='my-1 mx-1'></v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Set Subjects" v-if="item.selectable.teacherOf.length == 0 && item.selectable.role == 'Teacher'">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind='props' icon="mdi:mdi-book-open-page-variant" variant='elevated' size='small'
                                color='info' class='my-1 mx-1' @click="setSub(item.selectable._id)"></v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Teaches Now" v-if="item.selectable.teacherOf.length != 0 && item.selectable.teachsNow.length == 0 && item.selectable.role == 'Teacher'">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind='props' icon="mdi:mdi-step-forward-2" variant='elevated' size='small'
                                color='secondary' class='my-1 mx-1' @click="setTeach(item.selectable._id)"></v-btn>
                        </template>
                    </v-tooltip>
                </template>
                <template v-slot:no-data>
                    No Data Found
                </template>
            </v-data-table-server>
        </v-card>
    </v-app>
</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    export default {
        data() {
            return {
                headers: [
                    { title: 'R.No', key: 'index', sortable: false },
                    { title: 'Full Name', key: 'firstName', align: 'start', sortable: false, value: item => `${item.firstName} ${item.middleName} ${item.lastName}` },
                    { title: 'Gender', key: 'gender', align: 'start', sortable: true },
                    { title: 'Phone Number', key: 'phoneNumber', align: 'start', sortable: false, value: item => `+251${item.phoneNumber}` },
                    { title: 'Info', key: 'info', sortable: false},
                    { title: 'Security', key: 'security', sortable: false},
                    { title: "Email Address", key: 'email', align: 'start', sortable: false },
                    { title: "Role", key: 'role', align: 'start', sortable: false },
                    { title: 'Actions', key: 'actions', sortable: false }
                ],
                items: [],
                itemsPerPage: 5,
                loading: true,
                totalItems: 0,
                expanded: [],
                filter: '',
                roles: [
                    { title: 'Director', value: 'Director' },
                    { title: 'Registirar', value: 'Registirar' },
                    { title: 'Teacher', value: 'Teacher' },
                    { title: 'All', value: '' }
                ],
                role: '',
                gender: [
                    { title: 'Masculine', value: 'Male' },
                    { title: 'Feminine', value: 'Female' },
                    { title: 'All', value: '' }
                ],
                sortBy: [
                    { value: 'name', sort: 'asc'}
                ],
                sex: '',
                infoModal: false,
                modalData: {},
                teacherId: '',
                setModal: false,
                subjects: [
                    {text: "Tigrigna", icon: 'mdi:mdi-book-variant'},
                    {text: "Amharic", icon: 'mdi:mdi-book-variant'},
                    {text: "English", icon: 'mdi:mdi-book-variant'},
                    {text: "Mathematics", icon: 'mdi:mdi-book-variant'},
                    {text: "Physics", icon: 'mdi:mdi-book-variant'},
                    {text: "Chemistry", icon: 'mdi:mdi-book-variant'},
                    {text: "Biology", icon: 'mdi:mdi-book-variant'},
                    {text: "Geography", icon: 'mdi:mdi-book-variant'},
                    {text: "History", icon: 'mdi:mdi-book-variant'},
                    {text: "Civics", icon: 'mdi:mdi-book-variant'},
                    {text: "IT", icon: 'mdi:mdi-book-variant'},
                    {text: "HPE", icon: 'mdi:mdi-book-variant'},
                    {text: "TD", icon: 'mdi:mdi-book-variant'},
                    {text: "Economics", icon: 'mdi:mdi-book-variant'},
                ],
                loading: false,
                search: '',
                selected: [],
                securityDialog: false,
                secureData: null
            }
        },

        created() {
            this.getEmployee()
        },

        watch: {
            selected () {
                this.search = ''
            },
        },

        methods: {
            getEmployee() {
                axios.get('/getEmployee')
                    .then((res) => {
                        this.items = res.data.data
                        this.totalItems = res.data.data.length
                        this.loading = false
                    })
            },

            format(date) {
                return moment(date).fromNow(true)
            },

            getColor(value) {
                if (value == 'Director') {
                    return 'red'
                } else if (value == 'Registirar') {
                    return 'green'
                } else {
                    return 'yellow'
                }
            },

            getIcon(value) {
                if (value == 'Director') {
                    return 'mdi:mdi-book-open-page-variant'
                } else if (value == 'Registirar') {
                    return 'mdi:mdi-grease-pencil'
                } else {
                    return 'mdi:mdi-folder-open'
                }
            },

            showInfo(data){
                this.modalData = data
                this.infoModal = true
            },

            setSub(data){
                this.teacherId = data
                this.setModal = true
            },

            setTeach(data){
                this.$router.push({name: 'SetTeach', query: {id: data}})
            },

            checkSecurity(data){
                this.securityDialog = true
                var flag = !data.secured
                this.secureData = {
                    username: data.username,
                    flag: flag
                }
            },

            next(){
                this.loading = true
                axios.patch('/setSubject/' + this.teacherId, this.selected)
                .then((res)=>{
                    this.selected = []
                    this.setModal = false
                    this.loading = false
                    this.teacherId = ''
                    this.getEmployee()
                })
            }
        },

        computed: {
            filteredItems() {
                return this.items.filter((element) => {
                    return (element.firstName + " " + element.middleName + " " + element.lastName).toLowerCase().includes(this.filter.toLowerCase()) && element.role.match(this.role) && element.gender.match(this.sex)
                })
            },
            allSelected () {
                return this.selected.length === this.subjects.length
            },
            categories () {
                const search = this.search.toLowerCase()

                if (!search) return this.subjects

                return this.subjects.filter(item => {
                    const text = item.text.toLowerCase()

                    return text.indexOf(search) > -1
                })
            },
            selections () {
                const selections = []

                for (const selection of this.selected) {
                    selections.push(selection)
                }

                return selections
            },
        },
    };
</script>

<style scoped>
    .data-table {
        margin-top: 20px;
    }

    .data-table-header {
        font-weight: bold;
    }

    .data-table-row {
        cursor: pointer;
    }

    .data-table-row:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .data-table-pagination {
        margin-top: 20px;
    }
</style>