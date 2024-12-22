import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import lineOptions from '../interface/Lineoptions';

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