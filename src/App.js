import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { Typography, ThemeProvider, createMuiTheme } from "@material-ui/core";
import styles from "./App.module.css";
import { fetchData } from "./api";
import covidLogo from "./images/COVID-19.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <img className={styles.logo} src={covidLogo} alt="covid-19" />
          <Typography variant="h4">{country} Stats</Typography>
    
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'PT Sans', sans-serif"].join(","),
    h4: {
      textTransform: "uppercase",
    },
  },
});
