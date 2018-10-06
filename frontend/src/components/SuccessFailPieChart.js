import React, { Component } from 'react';
import {RadialChart, Hint} from 'react-vis'
import Card from '@material-ui/core/Card'
import {PieChart, Pie, Legend, Tooltip} from 'recharts';

class SuccessFailPieChart extends React.Component {
    state = {
        data: [{name: "Success:", value: 100.0-this.props.failRate},
                {name: "Fail:", value: this.props.failRate}]
      };
      render() {
        const {value} = this.state;
        return (
        <Card>
    	<PieChart width={800} height={400}>
        <Pie data={this.state.data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label/>
        <Tooltip/>
       </PieChart>
          </Card>
        );
      }
}

export default SuccessFailPieChart;