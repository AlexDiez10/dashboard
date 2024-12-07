/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
import "./App.css";
import Grid from "@mui/material/Grid2";
import Indicator from "./components/indicator";
import TableWeather from "./components/TableWeather";
import ControlWeather from "./components/ControlWeather";
import LineChartWeather from './components/LineChartWeather';
import { useEffect } from "react";

interface Indicador {
  title?:String;
  subtitle?: String;
  value?: String;
}

function App() {

  {/* Hook:  useEffect */}
  useEffect( () => {
    let request = async () => { 

      {/* Request */}
      let API_KEY = 'e6c9395ed831fa5b5157110ee8204790'
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextXML = await response.text();


      {/* XML Parser */}
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");
      
             {/* Arreglo para agregar los resultados */}

             let dataToIndicators : Indicador[] = new Array<Indicador>();

             {/* 
                 Análisis, extracción y almacenamiento del contenido del XML 
                 en el arreglo de resultados
             */}

             let name = xml.getElementsByTagName("name")[0].innerHTML || ""
             dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

             let location = xml.getElementsByTagName("location")[1]

             let latitude = location.getAttribute("latitude") || ""
             dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

             let longitude = location.getAttribute("longitude") || ""
             dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

             let altitude = location.getAttribute("altitude") || ""
             dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

             console.log( dataToIndicators )


    }

    request();

  }, [] )

  return (
    <Grid container spacing={5}>
      {/* Indicadores */}
      <Grid size={{ xs: 12, xl: 3 }}>
        <Indicator title={"Indicador 1"} subtitle={"Unidad 1"} value={"1.23"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }}>
        <Indicator title={"Indicador 2"} subtitle={"Unidad 2"} value={"3.12"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }}>
        <Indicator title={"Indicador 3"} subtitle={"Unidad 3"} value={"2.31"} />
      </Grid>
      <Grid size={{ xs: 12, xl: 3 }}>
        <Indicator title={"Indicador 4"} subtitle={"Unidad 4"} value={"3.21"} />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 8 }}>
        {/* Grid Anidado */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 3 }}>
            <ControlWeather />
          </Grid>
          <Grid size={{ xs: 12, xl: 9 }}>
            <TableWeather />
          </Grid>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, xl: 4 }}>
        <LineChartWeather/>
      </Grid>
    </Grid>
  );
}

export default App;
