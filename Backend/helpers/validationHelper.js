const { personalInfo, threeData, placeInfo } = require("../validations/validation")

module.exports = {
    studentData: (data)=> {
        const personal = personalInfo.validate({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            email: data.email,
            religion: data.religion,
            birthDate: data.birthData.birthDate,
            nameOfSchool: data.schoolFromData.nameOfSchool
        })
    }
}