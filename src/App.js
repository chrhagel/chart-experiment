import React from "react";
import "./App.css";
import VizContainer from "./components/VizContainer";
import Dataselctor from "./components/Dataselector";
import Formatter from "./components/Formatter";
import restaurants from "./sample-restaurants";

class App extends React.Component {
  state = {
    data: {},
    chartdata: {
      city: false,
      name: false,
      years: false,
      rating: false
    },
    theme: {
      bgcol: "white",
      col: "black",
      barcols: ["#61DAFB", "orange", "silver"],
      showYTicks: true
    }
  };

  componentDidMount() {
    // this.loadSampleData();
    this.setState({ data: restaurants });
  }

  updateChartData = chartObj => {
    // 1. overwrite current chartdata with chartObj
    this.setState({
      chartdata: chartObj
    });
  };

  render() {
    return (
      <div className="App">
        <div className="header-area">
          <h1>Restaurant Chart Example</h1>
        </div>

        <div className="data-picker-area">
          <Dataselctor
            chartdata={this.state.chartdata}
            updateChartData={this.updateChartData}
          />
        </div>

        <div className="chart-area">
          <VizContainer
            height={400}
            width={800}
            data={this.state.data}
            chartdata={this.state.chartdata}
            theme={this.state.theme}
          />
        </div>

        <div className="format-area">
          <Formatter />
        </div>

        {/* <div><Text text="Try click on rect" /></div> */}
      </div>
    );
  }
}

export default App;
