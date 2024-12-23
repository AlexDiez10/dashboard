import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

export default function Indicator(config: Indicator) {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fe8f84"
      }}
    >
      <Typography component="h2" variant="h6" sx={{color:"white"}} gutterBottom>
        {config.title}
      </Typography>
      <Typography component="p" variant="h4" sx={{color: "white"}}>
        {config.value}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, color: "lightgrey" }}>
        {config.subtitle}
      </Typography>
    </Paper>
  );
}
