// const AccountRoute = require('./admin/accountRoute');
const StudentRoute = require('../routes/configuration/studentRoute')
const EmployeeRoute = require('../routes/configuration/employeeRoute')
const SectionRoute = require('../routes/grade/sectionRoute')

module.exports = function (app) {
	app.use('/', [
		// AccountRoute,
		StudentRoute,
		EmployeeRoute,
		SectionRoute
	])
}
