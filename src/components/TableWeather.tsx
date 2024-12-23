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
import { Collapse } from '@mui/material';

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
      <TableContainer  component={Paper}>
        <Table  style={{ border: "1px solid gray", borderCollapse: "collapse", width: "100%", backgroundColor:"#fe8f84" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '300px', color:'white', fontWeight:"bold" }}>Date Start</TableCell>
              <TableCell align="right" sx={{ width: '300px', color:'white', fontWeight:"bold"  }}>Date End</TableCell>
              <TableCell align="right" sx={{ width: '300px', color:'white', fontWeight:"bold"  }}>Humidity (%)</TableCell>
              <TableCell align="right" sx={{ width: '300px', color:'white', fontWeight:"bold"  }}>Precipitation (%)</TableCell>
              <TableCell align="right" sx={{ width: '300px', color:'white', fontWeight:"bold"  }}>Clouds</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{color:"white"}}>
                  {row.dateStart}
                </TableCell>
                <TableCell align="right" sx={{color:"white"}}>{row.dateEnd}</TableCell>
                <TableCell align="right" sx={{color:"white"}}>{row.humidity}</TableCell>
                <TableCell align="right" sx={{color:"white"}}>{row.precipitation}</TableCell>
                <TableCell align="right" sx={{color:"white"}}>{row.clouds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{color: "#31c3cd"}}
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