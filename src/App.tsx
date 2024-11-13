/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
import './App.css'
import Grid from '@mui/material/Grid2'
import Indicator from './components/indicator'

function App() {

  return (
      <Grid container spacing={5}>

        {/* Indicadores */}
        <Grid size={{xs:12 , xl:3}}><Indicator title={'Indicador 1'} subtitle={'Unidad 1'} value={1.23} /></Grid>
        <Grid size={{xs:12 , xl:3}}><Indicator title={'Indicador 2'} subtitle={'Unidad 2'} value={1.23} /></Grid>
        <Grid size={{xs:12 , xl:3}}><Indicator title={'Indicador 3'} subtitle={'Unidad 3'} value={1.23} /></Grid>
        <Grid size={{xs:12 , xl:3}}><Indicator title={'Indicador 4'} subtitle={'Unidad 4'} value={1.23} /></Grid>

        {/* Tabla */} 
        <Grid size={{xs:12 , xl:8}}>Elemento: Tabla</Grid>

        {/* Gráfico */}
        <Grid size={{xs:12 , xl:4}}>Elemento: Gráfico 1</Grid>

      </Grid>
  )
}

export default App
