import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import { PieChart, Pie, Legend, Tooltip, Sector, Cell } from 'recharts'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'

const COLORS = ['#C453AD', '#78909c']

class SuccessFailPieChart extends React.Component {
    state = {
        data: [
            {
                name: 'Success:',
                value: 100.0 - this.props.failRate
            }, {
                name: 'Fail:',
                value: this.props.failRate
            }
        ]
    };

    render() {
        const { value } = this.state
        return (
            <ResponsiveContainer width="100%">
                <PieChart>
                    <Pie
                        data={this.state.data}
                        outerRadius={100}
                        label>
                        {
                            this.state.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                        }</Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

export default SuccessFailPieChart