//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import Grid from '@mui/material/Grid2'
import './App.css'
import IndicatorWeather from './components/indicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import Item from './interface/Item';
import lineProps from './interface/Lineprops';
import { Paper, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  //const [count, setCount] = useState(0)

  {/* Variable de estado y función de actualización */ }
  let [indicators, setIndicators] = useState<Indicator[]>([])
  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))
  let [items, setItems] = useState<Item[]>([])
  let [item, setItem] = useState<Item>()
  let [lineprops, setLineProps] = useState<lineProps>()

  {/* Hook: useEffect */ }
  useEffect(() => {

    let request = async () => {

      {/* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */ }
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      let expiringTime = localStorage.getItem("expiringTime");

      {/* Obtenga la estampa de tiempo actual */ }
      let nowTime = (new Date()).getTime();

      {/* Verifique si es que no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración */ }
      if (expiringTime === null || nowTime > parseInt(expiringTime)) {

        {/* Request */ }
        let API_KEY = "e6c9395ed831fa5b5157110ee8204790"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        savedTextXML = await response.text();

        {/* Tiempo de expiración */ }
        let hours = 0.01
        let delay = hours * 3600000
        let expiringTime = nowTime + delay

        {/* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */ }
        localStorage.setItem("openWeatherMap", savedTextXML)
        localStorage.setItem("expiringTime", expiringTime.toString())
        localStorage.setItem("nowTime", nowTime.toString())

        {/* DateTime */ }
        localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
        localStorage.setItem("nowDateTime", new Date(nowTime).toString())

        {/* Modificación de la variable de estado mediante la función de actualización */ }
        setOWM(savedTextXML)
      }

      {/* Valide el procesamiento con el valor de savedTextXML */ }
      if (savedTextXML) {

        {/* XML Parser */ }
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        {/* Arreglo para agregar los resultados */ }

        let dataToIndicators: Indicator[] = new Array<Indicator>();

        {/* 
            Análisis, extracción y almacenamiento del contenido del XML 
            en el arreglo de resultados
        */}

        let name = xml.getElementsByTagName("name")[0].innerHTML || ""
        let times = xml.getElementsByTagName("time")
        let lineHumidity: number[] = new Array<number>;
        let lineCluods: number[] = new Array<number>;
        let linePrecipitation: number[] = new Array<number>;
        let dates: String[] = new Array<String>;
        let items: Item[] = new Array<Item>();
        for (let i = 0; i < times.length; i++) {
          let precipitation = times[i].getElementsByTagName("precipitation")[0]
          let humidity = times[i].getElementsByTagName("humidity")[0]
          let clouds = times[i].getElementsByTagName("clouds")[0]
          let temperature = times[i].getElementsByTagName("temperature")[0]
          let pressure = times[i].getElementsByTagName("pressure")[0]
          items.push({
            "dateStart": times[i].getAttribute("from") || "",
            "dateEnd": times[i].getAttribute("to") || "",
            "precipitation": Number(precipitation.getAttribute("probability")) || 0,
            "humidity": Number(humidity.getAttribute("value")) || 0,
            "clouds": clouds.getAttribute("value") || "",
            "temperature": Number(temperature.getAttribute("value")) || 0,
            "pressure": Number(pressure.getAttribute("value")) || 0
          })
          lineHumidity.push(Number(humidity.getAttribute("value")) || 0)
          lineCluods.push(Number(clouds.getAttribute("all")) || 0)
          linePrecipitation.push(Number(precipitation.getAttribute("probability")) || 0)
          dates.push(times[i].getAttribute("from") || "")
        }

        setItems(items)
        dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })
        setLineProps({ "humidity": lineHumidity, "precipitation": linePrecipitation, "clouds": lineCluods, "dates": dates })

        let promPrecipitation = 0;
        let promHumidity = 0;
        let promTemperature = 0;
        let promPressure = 0;

        for (let i = 0; i < items.length; i++) {
          promPrecipitation += items[i].precipitation;
          promHumidity += items[i].humidity;
          promTemperature += items[i].temperature;
          promPressure += items[i].pressure;
        }

        promHumidity = promHumidity / items.length;
        promPrecipitation = promPrecipitation / items.length;
        promTemperature = promTemperature / items.length;
        promPressure = promPressure / items.length

        let item: Item = {
          "dateStart": "",
          "dateEnd": "",
          "precipitation": promPrecipitation,
          "humidity": promHumidity,
          "clouds": "",
          "temperature": promTemperature,
          "pressure": promPressure
        }

        setItem(item)

        let location = xml.getElementsByTagName("location")[1]

        let latitude = location.getAttribute("latitude") || ""
        dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

        let longitude = location.getAttribute("longitude") || ""
        dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

        let altitude = location.getAttribute("altitude") || ""
        dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

        // console.log( dataToIndicators )

        {/* Modificación de la variable de estado mediante la función de actualización */ }
        setIndicators(dataToIndicators)


      }
    }

    request();

  }, [owm])

  let renderIndicators = () => {

    return indicators
      .map(
        (indicator, idx) => (
          <Grid key={idx} size={{ xs: 12, xl: 3 }}>
            <IndicatorWeather
              title={indicator["title"]}
              subtitle={indicator["subtitle"]}
              value={indicator["value"]} />
          </Grid>
        )
      )

  }

  return (
    <Grid container spacing={5} sx={{display:'flex', alignItems: 'center'}}>

      <Grid size={{ xs: 12, xl: 12 }}>
      <Typography component="h2" variant="h3" color="primary" gutterBottom >Ecuashboard</Typography>
      </Grid>

      {/* Parametros basicos */}
      <Paper sx={{display:'flex', width:"100%", gap:"20px", flexWrap:'wrap', alignItems:'center', p:3}}>
      <Grid size={{ xs: 12, xl: 12 }}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom >Ubicación</Typography>
      </Grid>
      {renderIndicators()}
      </Paper>

      {/* Grafica */}
      <Paper sx={{display:'flex', width:"96%", gap:"20px", flexWrap:'wrap', alignItems:'center', p:3}}>
      <Grid size={{ xs: 12, xl: 12 }}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom >Graficas</Typography>
      </Grid>
      <Grid>
        <ControlWeather humidity={lineprops?.humidity || []} precipitation={lineprops?.precipitation || []} clouds={lineprops?.clouds || []} dates={lineprops?.dates || []} />
      </Grid>
      </Paper>

      {/* Tabla */}
      <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid size={{ xs: 12, xl: 12 }}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom >Tabla</Typography>
      </Grid>
        <TableWeather itemsIn={items} />
      </Paper>

      {/* promedios */}
      <Paper sx={{display:'flex', width:"100%", gap:"20px", flexWrap:'wrap', alignItems:'center', p:3}}>
      <Grid size={{ xs: 12, xl: 12 }}>
      <Typography component="h2" variant="h4" color="primary" gutterBottom >Promedios</Typography>
      </Grid>
        <Grid size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather title={"Humidity"} subtitle={'%'} value={String(item?.humidity.toFixed(2))} />
        </Grid>
        <Grid size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather title={'Temperature'} subtitle={'kelvin'} value={String(item?.temperature.toFixed(2))} />
        </Grid>
        <Grid size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather title={'Pressure'} subtitle={'hPa'} value={String(item?.pressure.toFixed(2))} />
        </Grid>
        <Grid size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather title={'Precipitation'} subtitle={'%'} value={String(item?.precipitation.toFixed(2))} />
        </Grid>
        </Paper>

    </Grid>
  )
}

export default App