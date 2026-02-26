<template lang="">
    <div>
        <v-card class="mx-auto my-auto" color="#bee9ba" min-width="600" min-height="420" variant="flat">
            <v-card-text>
                <v-form ref="form">
                    <div class=" text-medium-emphasis mb-1">Employee's Full Name</div>
                    <v-row justify="start">
                        <v-col cols="4">
                            <v-text-field v-model="state.firstName" ref="firstName" density="compact"
                                prepend-inner-icon="mdi:mdi-account-box-outline" label="First Name" :rules="[checkName]" validate-on="blur"></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field v-model="state.middleName" density="compact" prepend-inner-icon="mdi:mdi-account-box-outline"
                                label="Middle Name" :rules="[checkName]" validate-on="blur"></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field v-model="state.lastName" density="compact" prepend-inner-icon="mdi:mdi-account-box-outline"
                                label="Last Name" :rules="[checkName]" validate-on="blur"></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-select v-model="state.gender" :items="sexs" density="compact" label="Gender"
                                prepend-inner-icon="mdi:mdi-human-male-female" :rules="[required]" validate-on="blur"></v-select>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field v-model="state.phoneNumber" density="compact" prepend-inner-icon="mdi:mdi-phone-classic"
                                label="Phone Number" type="number" :rules="[phoneNumber]" validate-on="blur"></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field v-model="state.email" density="compact" prepend-inner-icon="mdi:mdi-email"
                                label="Email Address" :rules="[required, email]" validate-on="blur"></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-select :items="roles" v-model="state.role" density="compact" prepend-inner-icon="mdi:mdi-account-box-outline"
                                label="Role" :rules="[required]" validate-on="blur"></v-select>
                        </v-col>
                    </v-row>

                    <div class="float-right">
                        <v-btn color="secondary" class="mr-4" @click="clear()">Clear</v-btn>
                        <v-btn color="kalamino" @click="submit()">Submit</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
    import validator from 'validator'
    import axios from 'axios'
    export default {
        data() {
            return {
                state: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    gender: '',
                    phoneNumber: '',
                    email: '',
                    role: ''
                },
                sexs: ['Male', 'Female'],
                roles: ['Director', 'Registirar', 'Teacher']
            }
        },

        created() {
            
        },

        methods: {
            required(value){
                return value == '' ? "Field is Required": true
            },

            checkName(value){
                if(value == ''){
                    return "Field is Required"
                }else if(value.length < 3){
                    return "Field must contain more than 3 letters"
                }else if(value.length > 20){
                    return "Field must contain letters less than 20"
                }
            },

            phoneNumber(value){
                if(!value){
                    return "Field is Required"
                }else if(!validator.isNumeric(value)){
                    return "Phone Number must contain numbers"
                }else if(value.length > 10){
                    return "More than 10. Impossible"
                }
            },

            email(value){
                if(!validator.isEmail(value)){
                    return "Incorrect Email Address"
                }
            },

            clear(){
                this.state.firstName = '',
                this.state.middleName = '',
                this.state.lastName = '',
                this.state.gender = '',
                this.state.phoneNumber = '',
                this.state.email = '',
                this.state.role = ''
            },
            
            async submit(){
                const {valid, errors} = await this.$refs.form.validate()

                if(valid){
                    axios.post('/addEmployee', this.state)
                    .then((res)=>{
                        alert(res.data.message)
                        this.$router.push({name: 'EmployeeList'})
                    })
                    .catch(err=>{
                        alert(err.response.data.message)
                    })
                }else{
                    alert("The form is Invalid")
                }
            }
        },
    }
</script>
<style lang="">

</style>