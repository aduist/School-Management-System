<template>
  <v-app>
        <v-dialog v-model="idModal" width="500px">
            <v-card>
                <v-card-item class="pa-5">
                    <b><strong>{{studentId}}</strong></b>
                </v-card-item>
            </v-card>
        </v-dialog>
      <v-card color="#bee9ba" min-width="600" min-height="420" variant="flat">
          <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
              :items="filteredItems" :loading="loading" item-value="name" density="compact" :sortBy="sortBy">
              <template v-slot:item.index="{ item }">
                  {{ item.index + 1 }}
              </template>
              <template v-slot:item.idNumber="{ item }">
                    <v-btn color="error" @click="getId(item.selectable.idNumber)">
                        <v-icon>mdi:mdi-barcode-scan</v-icon>
                    </v-btn>
              </template>
              <template v-slot:item.class="{ item }">
                    <span v-if="item.selectable.currentId">{{item.selectable.currentId.name}}</span>
                    <span v-else>
                        <b class="text-red">Not Setted</b>
                    </span>
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
                          <v-btn v-bind='props' icon="mdi:mdi-information-outline" @click="showInfo(item.selectable._id)" variant='elevated' size='small'
                              color='primary' class='my-1 mx-1'></v-btn>
                      </template>
                  </v-tooltip>
                  <v-tooltip text="Edit Information">
                      <template v-slot:activator="{ props }">
                          <v-btn v-bind='props' icon="mdi:mdi-table-edit" variant='elevated' size='small'
                              color='warning' class='my-1 mx-1' v-if="false"></v-btn>
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
                  { title: 'Gender', key: 'gender', align: 'start', sortable: false },
                  { title: 'Age', key: 'age', align: 'start', sortable: false, value: item => `${this.format(item.birthData.birthDate)}`},
                  { title: 'Phone Number', key: 'phoneNumber', align: 'start', sortable: false, value: item => `+251${item.phoneNumber.slice(1, 10)}` },
                  { title: "IDNO", key: 'idNumber', align: 'start', sortable: false },
                  { title: "Email Address", key: 'email', align: 'start', sortable: false },
                  { title: "Current Class", key: 'class', align: 'start', sortable: false },
                  { title: 'Actions', key: 'actions', sortable: false }
              ],
              items: [],
              itemsPerPage: 5,
              loading: true,
              totalItems: 0,
              filter: '',
              gender: [
                  { title: 'Masculine', value: 'Male' },
                  { title: 'Feminine', value: 'Female' },
                  { title: 'All', value: '' }
              ],
              sortBy: [
                  { value: 'firstName', sort: 'asc'}
              ],
              sex: '',
              studentId: null,
              idModal: false
          }
      },

      created() {
          this.getStudents()
      },

      methods: {
          getStudents() {
              axios.get('/getStudents')
                  .then((res) => {
                      this.items = res.data.data
                      this.totalItems = res.data.data.length
                      this.loading = false
                  })
          },

          format(date) {
              return moment(date).fromNow(true)
          },

          showInfo(id){
              this.$router.push({name: "StudentInfo", params: {id: id}})
          },

          getId(id){
            this.idModal = true
            this.studentId = id
          }
      },

      computed: {
          filteredItems() {
              return this.items.filter((element) => {
                  return (element.firstName + " " + element.middleName + " " + element.lastName).toLowerCase().includes(this.filter.toLowerCase()) && element.gender.match(this.sex)
              })
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