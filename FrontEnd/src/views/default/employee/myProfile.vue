<template>
    <div>
        <v-row class="pa-3" v-if="personalInfo">
            <v-col cols="4">
                <v-card>
                    <v-card-title class="title-section">
                        <v-icon left>mdi:mdi-account-box</v-icon>
                        <span class="title">Personal Information</span>
                    </v-card-title>
                    <v-divider :thickness="4"></v-divider>
                    <v-card-text class="text-section">
                        <h4>Full-Name: <span class="text-kalamino">{{ personalInfo.firstName + " " + personalInfo.middleName + " " + personalInfo.lastName }}</span> </h4>
                        <v-divider class="my-1"></v-divider>
                        <h4>Gender: <span class="text-kalamino">{{ personalInfo.gender }}</span></h4>
                        <v-divider class="my-1"></v-divider>
                        <h4>Phone Number: <span class="text-kalamino">{{ "+251" + personalInfo.phoneNumber }}</span></h4>
                        <v-divider class="my-1"></v-divider>
                        <h4>Email-Address: <span class="text-kalamino">{{ personalInfo.email }}</span></h4>
                        <v-divider class="my-1"></v-divider>
                        <h4>Role: <span class="text-kalamino">{{ personalInfo.role }}</span></h4>
                        <v-divider class="my-1"></v-divider>
                    </v-card-text>

                    <v-card-actions class="action-buttons">
                        <v-btn color="primary" text small>
                            <v-icon left>mdi:mdi-action-done</v-icon>
                            Action 1
                        </v-btn>
                        <v-btn color="secondary" text small>
                            <v-icon left>mdi:mdi-information</v-icon>
                            More Info
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-card v-if="!personalInfo.secured">
                    <v-card-title class="title-section">
                        <v-icon left>mdi:mdi-file-lock</v-icon>
                        <span class="title">Security</span>
                    </v-card-title>
                    <v-divider :thickness="4"></v-divider>
                    <span class="text-red text-center">
                        <h3>
                            <b><strong>Your Account is In DANGER {{ personalInfo.firstName }}</strong></b>
                        </h3>
                        <h4>
                            <b class="text-red">You need to Change your Username and Password in order for your account to get Protected.</b>
                        </h4>
                    </span>
                    <v-card-text class="text-section">
                        <v-form ref="securityform">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="user.username" density="compact" label="Your New Username" :rules="[required]"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field type="password" v-model="user.password" density="compact" label="Your New Password" :rules="[password]"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field type="password" v-model="user.confirmPassword" density="compact" label="Confirm Password" :rules="[theSameWith]" validate-on="blur"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="action-buttons">
                        
                        <v-btn color="error" @click="resetSecurity">
                            <v-icon left>mdi:mdi-keyboard-return</v-icon> Dismiss
                        </v-btn>

                        <v-btn color="kalamino" @click="submitSecurity">
                            <v-icon left>mdi:mdi-skip-next</v-icon> Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card v-if="personalInfo.secured">
                    <v-card-title class="title-section">
                        <v-icon left>mdi:mdi-file-lock</v-icon>
                        <span class="title">Change Password</span>
                    </v-card-title>
                    <v-divider :thickness="4"></v-divider>
                    <v-card-text class="text-section">
                        <v-form ref="passwordform">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field type="password" v-model="changeUser.currentPassword" density="compact" label="Current Password" :rules="[required]"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field type="password" v-model="changeUser.newPassword" density="compact" label="Your New Password" :rules="[password]"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field type="password" v-model="changeUser.confirmPassword" density="compact" label="Confirm Password" :rules="[theSameWith2]" validate-on="blur"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="action-buttons">
                        
                        <v-btn color="error" @click="resetPassword">
                            <v-icon left>mdi:mdi-keyboard-return</v-icon> Dismiss
                        </v-btn>

                        <v-btn color="kalamino" @click="submitPassword">
                            <v-icon left>mdi:mdi-skip-next</v-icon> Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import jwt_decode from 'jwt-decode'
    export default {
        data() {
            return {
                personalInfo: null,
                user: {
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
                changeUser: {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            }
        },

        created() {
            this.getPersonalInfo()
        },

        methods: {
            async getPersonalInfo(){
                const data = jwt_decode(localStorage.getItem('kshsToken'))
                await axios.get('/getOneEmployee/' + data.userId)
                .then((res)=>{
                    this.personalInfo = res.data.data
                })
            },

            resetSecurity(){
                this.user.username = ''
                this.user.password = ''
                this.user.confirmPassword = ''
            },

            resetPassword(){
                this.changeUser.currentPassword = ''
                this.changeUser.newPassword = ''
                this.changeUser.confirmPassword = ''
            },

            required(value){
                return value != '' ? true : "Field is Required!!!"
            },

            password(value){
                return value.length >=8 ? true : "Password must contain more than 8 letters"
            },

            theSameWith(value){
                return value == this.user.password ? true : "Password does not match"
            },

            theSameWith2(value){
                return value == this.changeUser.newPassword ? true : "Password does not match"
            },

            async submitSecurity(){
                const {valid, errors} = await this.$refs.securityform.validate()

                if(valid){
                    var user = jwt_decode(localStorage.getItem('kshsToken'))
                    axios.patch('/editInfo/' + user.userId, {
                        username: this.user.username,
                        password: this.user.password
                    })
                    .then(()=>{
                        this.getPersonalInfo()
                        alert("Account Secured")
                    })
                    .catch(err=>{
                        alert(err.response.data.message)
                    })
                }
            },

            async submitPassword(){
                const {valid, errors} = await this.$refs.passwordform.validate()

                if(valid){
                    var user = jwt_decode(localStorage.getItem('kshsToken'))
                    axios.patch('/changePassword/' + user.userId, {
                        currentPassword: this.changeUser.currentPassword,
                        newPassword: this.changeUser.newPassword
                    })
                    .then(()=>{
                        this.getPersonalInfo()
                        alert("Password Changed Succesfully")
                    })
                    .catch(err=>{
                        alert(err.response.data.message)
                    })
                }
            }
        },

        computed: {
            // 
        },
    }
</script>

<style>
.title-section {
  display: flex;
  align-items: center;
}

.title {
  font-weight: bold;
  margin-left: 10px;
}

.text-section {
  font-size: 16px;
  line-height: 1.5;
}

.action-buttons {
  justify-content: space-between;
}
</style>