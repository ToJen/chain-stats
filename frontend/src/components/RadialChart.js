import React from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Legend from 'recharts/lib/component/Legend'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts'

const data = [
  { criteria: 'Speed', A: 120, B: 110, fullMark: 150 },
  { criteria: 'Guards', A: 58, B: 130, fullMark: 150 },
  { criteria: 'Modularity', A: 86, B: 130, fullMark: 150 },
  { criteria: 'Upgradability', A: 99, B: 100, fullMark: 100 },
  { criteria: 'Cost Efficiency', A: 85, B: 90, fullMark: 100 },
]

class RadialChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%">
        <RadarChart width={700} height={500} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="criteria" stroke="white" />
          <PolarRadiusAxis angle={45} domain={[0, 100]} />
          <Radar
            name="Bakery"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          {/* <Radar name="Open Zeppelin" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} /> */}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    )
  }
}

export default RadialChart
