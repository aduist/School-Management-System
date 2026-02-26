/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000/";
// axios.defaults.baseURL = "http://192.168.43.207:7000/";
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
