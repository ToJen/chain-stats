import React from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'

const COLORS = ['#C453AD', '#8ea4af']

class SuccessFailPieChart extends React.Component {
  // state = {
  //     data: []
  // };

  render() {
    const failRate = Math.round(this.props.failRate)

    const data = [
      {
        name: 'Success:',
        value: 100.0 - failRate,
      },
      {
        name: 'Fail:',
        value: failRate,
      },
    ]

    return (
      <ResponsiveContainer width="100%">
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

export default SuccessFailPieChart
