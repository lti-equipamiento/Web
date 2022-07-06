import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PageAdquisicion from "./PageAdquisicion";
import PageCTecnica from "./PageCTecnica";
import PageApoyoTecnico from "./PageApoyoTecnico";
import PageMantenimiento from "./PageMantenimiento";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsHDV() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tabs Hoja de vida"
        >
          <Tab label="Adquisición" {...a11yProps(0)} />
          <Tab label="Caracteristicas Tecnicas" {...a11yProps(1)} />
          <Tab label="Apoyo Tecnico" {...a11yProps(2)} />
          <Tab label="Mantenimientos" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PageAdquisicion />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PageCTecnica />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PageApoyoTecnico />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PageMantenimiento />
      </TabPanel>
    </Box>
  );
}
