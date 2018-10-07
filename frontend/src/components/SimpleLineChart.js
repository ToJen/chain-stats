import React from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

class SimpleLineChart extends React.Component {
  render() {
    return (
      <ResponsiveContainer width="100%">
        <LineChart data={this.props.data}>
          {this.props.isMulti ? <YAxis /> : <YAxis />}
          <XAxis dataKey="name" />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={this.props.dataKey}
            stroke="#C453AD"
            activeDot={{
              r: 8,
              stroke: '#C453AD',
            }}
          />
          {this.props.isMulti && (
            <Line type="monotone" dataKey="gas" stroke="#8ea4af" />
          )}
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default SimpleLineChart
