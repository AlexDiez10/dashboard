import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from 'react';
import Item from '../interface/Item';

interface MyProp {
  itemsIn: Item[];
}

export default function TableWeather(props: MyProp) {
  const [rows, setRows] = useState<Item[]>([]);
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página

  useEffect(() => {
    setRows(props.itemsIn);
  }, [props]);

  // Manejar cambio de página
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  // Manejar cambio de filas por página
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reinicia a la primera página
  };

  return (
    <Paper sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', p:4}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '300px' }}>Date Start</TableCell>
              <TableCell align="right" sx={{ width: '300px' }}>Date End</TableCell>
              <TableCell align="right" sx={{ width: '300px' }}>Humidity (%)</TableCell>
              <TableCell align="right" sx={{ width: '300px' }}>Precipitation (%)</TableCell>
              <TableCell align="right" sx={{ width: '300px' }}>Clouds</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dateStart}
                </TableCell>
                <TableCell align="right">{row.dateEnd}</TableCell>
                <TableCell align="right">{row.humidity}</TableCell>
                <TableCell align="right">{row.precipitation}</TableCell>
                <TableCell align="right">{row.clouds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Opciones para cambiar filas por página
        component="div"
        count={rows.length} // Número total de filas
        rowsPerPage={rowsPerPage} // Filas por página actual
        page={page} // Página actual
        onPageChange={handleChangePage} // Cambiar página
        onRowsPerPageChange={handleChangeRowsPerPage} // Cambiar filas por página
      />
    </Paper>
  );
}