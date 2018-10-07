import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import {PieChart, Pie, Legend, Tooltip} from 'recharts';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
class SuccessFailPieChart extends React.Component {
    state = {
        data: [
            {
                name: "Success:",
                value: 100.0 - this.props.failRate
            }, {
                name: "Fail:",
                value: this.props.failRate
            }
        ]
    };
    render() {
        const {value} = this.state;
        return (
            <ResponsiveContainer width={600} height={400}>
                <PieChart>
                    <Pie
                        data={this.state.data}
                        cx={500}
                        cy={200}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#82ca9d"
                        label/>
                    <Tooltip/>
                </PieChart>
                </ResponsiveContainer>
        );
    }
}

export default SuccessFailPieChart;