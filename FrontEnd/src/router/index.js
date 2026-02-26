// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: '',
        name: 'LogIn',
        component: () => import( '@/views/startup/login.vue'),
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import( '@/views/startup/student.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () => import( '@/views/startup/pageNotFound.vue'),
      },

      {
        path: '/unauthorized',
        name: 'Illegal',
        component: () => import ( '@/views/startup/unauthorized.vue')
      }

    ],
  },
  {
    path: '/default',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import( '@/views/default/Dashboard.vue'),
        meta: {
          title: "Dashboard",
          icon: "mdi:mdi-view-dashboard"
        }
      },
      
      {
        path: '',
        name: 'Home',
        component: () => import( '@/views/default/Home.vue'),
        meta: {
          title: "Home",
          icon: "mdi:mdi-image"
        }
      },

      {
        path: 'about',
        name: 'About',
        component: () => import( '@/views/default/About.vue'),
        meta: {
          title: "About",
          icon: "mdi:mdi-help-box"
        }
      },

      {
        path: 'addStudent',
        name: 'AddStudent',
        component: () => import( '@/views/default/registration/addStudent.vue'),
        meta: {
          title: "Add New Student to the List here",
          icon: "mdi:mdi-account-multiple-plus"
        }
      },

      {
        path: 'studentList',
        name: 'StudentList',
        component: () => import( '@/views/default/registration/studentList.vue'),
        meta: {
          title: "See the List of Students Registered",
          icon: "mdi:mdi-view-list"
        }
      },

      {
        path: 'studentInfo/:id',
        name: "StudentInfo",
        component: () => import( '@/views/default/registration/studentFullInfo.vue'),
        meta: {
          title: "Full Information of the Student",
          icon: "mdi:mdi-database"
        }
      },

      {
        path: 'addEmployee',
        name: "AddEmployee",
        component: () => import( '@/views/default/employee/addEmployee.vue'),
        meta: {
          title: "Add New Employee to the List",
          icon: "mdi:mdi-account-switch"
        }
      },

      {
        path: 'employeeList',
        name: "EmployeeList",
        component: () => import( '@/views/default/employee/employeeList.vue'),
        meta: {
          title: "See the List of the Employee here",
          icon: "mdi:mdi-account-search"
        }
      },

      {
        path: 'myprofile',
        name: 'MyProfile',
        component: () => import( '@/views/default/employee/myProfile.vue'),
        meta: {
          title: "Edit and See your Profile",
          icon: "mdi:mdi-account"
        }
      },

      {
        path: 'setTeach',
        name: "SetTeach",
        component: () => import( '@/views/default/employee/setTeach.vue'),
        meta: {
          title: "Assign Class For Teachers Here",
          icon: "mdi:mdi-content-save-settings"
        }
      },

      {
        path: 'classManagement',
        name: "ClassManagement",
        component: () => import( '@/views/default/section/sectionManagement.vue'),
        meta: {
          title: "Manage the Class/Section Here",
          icon: "mdi:mdi-home-assistant"
        }
      },

      {
        path: 'classTeacher/:id',
        name: "ClassTeacherSet",
        component: () => import( '@/views/default/section/setClassTeacher.vue'),
        meta: {
          title: "Set Class Teacher",
          icon: "mdi:mdi-desktop-classic"
        }
      },

      {
        path: 'setStudents/:id',
        name: "SetStudents",
        component: () => import( '@/views/default/section/setStudents.vue'),
        meta: {
          title: "Set Students for the Section",
          icon: "mdi:mdi-vector-selection"
        }
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
