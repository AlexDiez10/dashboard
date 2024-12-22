import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import LineChartWeather from "../components/LineChartWeather";
import lineOptions from "../interface/Lineoptions";
import lineProps from "../interface/Lineprops";

export default function ControlWeather(lineprops: lineProps) {
    const descriptionRef = useRef<HTMLDivElement>(null);

    // Estado para la selección y opciones del gráfico
    const [selected, setSelected] = useState<number>(-1);
    const [lineoptions, setLineOptions] = useState<lineOptions>({
        variable: "Sin asignar",
        values: lineprops.precipitation || [],
        dates: lineprops.dates || [],
    });

    // Items para el Select
    const items = [
        {
            name: "Precipitación",
            description: "Cantidad de agua que cae sobre una superficie en un período específico.",
            values: lineprops.precipitation,
        },
        {
            name: "Humedad",
            description: "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.",
            values: lineprops.humidity,
        },
        {
            name: "Nubosidad",
            description: "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.",
            values: lineprops.clouds,
        },
    ];

    const handleChange = (event: SelectChangeEvent) => {
        const idx = parseInt(event.target.value);
        setSelected(idx);

        // Actualiza la descripción y los datos del gráfico
        if (idx >= 0) {
            const selectedItem = items[idx];
            descriptionRef.current!.innerHTML = selectedItem.description;

            setLineOptions({
                variable: selectedItem.name,
                values: selectedItem.values,
                dates: lineprops.dates,
            });
        } else {
            descriptionRef.current!.innerHTML = "";
        }
    };

    return (
        <Grid sx={{ p: 2, display: "flex", justifyContent: "space-between"}}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", width: '500px', height:'350px'}}>
                    <Typography mb={2} component="h3" variant="h6" color="primary">
                        Variables Meteorológicas
                    </Typography>

                    <Box sx={{ minWidth: 120 }}>
                    <InputLabel id="simple-select-label" sx={{alignSelf:"flex-start"}}>Variables</InputLabel>
                        <FormControl fullWidth>
                            
                            <Select
                                labelId="simple-select-label"
                                id="simple-select"
                                value={selected.toString()} // Controla el valor del select
                                onChange={handleChange}
                            >
                                <MenuItem value="-1" disabled>
                                    Seleccione una variable
                                </MenuItem>
                                {items.map((item, index) => (
                                    <MenuItem key={index} value={index.toString()}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />
                </Paper>
                {/* Gráfico */}
                <LineChartWeather
                    variable={lineoptions.variable}
                    values={lineoptions.values}
                    dates={lineoptions.dates}
                />
        </Grid>
    );
}