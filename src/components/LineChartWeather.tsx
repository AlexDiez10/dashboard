import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import lineOptions from '../interface/Lineoptions';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];

export default function LineChartWeather(line: lineOptions) {

    let values = line.values
    let labels = line.dates
    let variable = line.variable

    return (
        <Paper
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                width: "100%"
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={800}
                height={300}
                series={[
                    { data: values, label: variable.toString() },
                ]}
                xAxis={[{ scaleType: 'point', data: labels }]}
            />
        </Paper>
    );
}