import React, {Component} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

class TimeTakenChart extends React.Component {
    state = {
        value: false
    };
    render() {
        const {value} = this.state;
        return (
            <ResponsiveContainer>
            <BarChart
                width={600}
                height={300}
                data={this.props.data}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="ms" fill="#8884d8"/>
            </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default TimeTakenChart;