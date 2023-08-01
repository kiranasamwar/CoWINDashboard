// Write your code here

import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {VaccinationByAgeData} = props

  return (
    <div className="vaccination-by-gender">
      <h1 className="heading-age">Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={VaccinationByAgeData}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill=" #2d87bb" />
          <Cell name="45-60" fill=" #64c2a6" />
          <Cell name="Above 60" fill="#a3df9f" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
