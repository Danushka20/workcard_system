import DashboardController from './DashboardController'
import JobController from './JobController'
import ReportController from './ReportController'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
JobController: Object.assign(JobController, JobController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Controllers