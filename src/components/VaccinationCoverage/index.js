// Write your code here

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {VaccinationCoverageData} = props

  return (
    <div className="vaccination-coverage-container">
      <h1 className="heading-coverage">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={500}
        data={VaccinationCoverageData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontFamily: 'Roboto',
            fontSize: 12,
            textAline: 'center',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#2d87bb"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
