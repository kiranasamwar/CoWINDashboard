// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    apiStatus: '',
  }

  componentDidMount() {
    this.getCoWin()
  }

  getCoWin = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const upDatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          eachGender => ({
            age: eachGender.age,
            count: eachGender.count,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
      }
      this.setState({
        vaccinationData: upDatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderVaccinationAllData = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage
          VaccinationCoverageData={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderData={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          VaccinationByAgeData={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureMethod = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt=" failure view"
      />
      <h1 className="heading-failure">Something went wrong</h1>
    </div>
  )

  renderMethodData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderVaccinationAllData()
      case apiStatusConstant.failure:
        return this.renderFailureMethod()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="co-win-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt=" website logo"
            className="logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="heading2">CoWIN Vaccination in India</h1>
        {this.renderMethodData()}
      </div>
    )
  }
}

export default CowinDashboard
