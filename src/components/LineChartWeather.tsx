import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import lineOptions from '../interface/Lineoptions';
import { Grid } from '@mui/material';

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
                width: "100%",
                backgroundColor:"#fe8f84"
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <Grid sx={{backgroundColor:'white'}}>
            <LineChart
                width={800}
                height={300}
                series={[
                    { data: values, label: variable.toString() },
                ]}
                xAxis={[{ scaleType: 'point', data: labels }]}
            />
            </Grid>
        </Paper>
    );
}