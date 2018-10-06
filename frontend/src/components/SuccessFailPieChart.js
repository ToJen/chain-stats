import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Pie from 'recharts/lib/polar/Pie';
import PieChart from 'recharts/lib/chart/PieChart'
import Cell from 'recharts/lib/component/Cell';

const data = [{name: 'Pass', value: 400}, {name: 'Fail', value: 300}];
const COLORS = ['#00C49F', '#FF8042'];

const RADIAN = Math.PI / 180;       

function SuccessFailPieChart() {
        return (
          <PieChart width={800} height={400}>
          <Pie
            data={data} 
            cx={120} 
            cy={200} 
            innerRadius={60}
            outerRadius={80} 
            fill="#8884d8"
            paddingAngle={5}
          >
              {
                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          </PieChart>
        );
}

export default SuccessFailPieChart;