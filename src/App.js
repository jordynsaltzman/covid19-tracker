import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import styles from "./App.module.css";
import { fetchData } from "./api";
import covidLogo from "./images/COVID-19.png";

class App extends React.Component {
  state = {
    data: {},
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  render() {
    const { data } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <img src={covidLogo} alt="covid-19" />
          <Cards data={data} />
          <CountryPicker />
          <Chart />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

const theme = createMuiTheme({
  typography: {
    fontFamily: ["'PT Sans', sans-serif"].join(","),
  },
});
