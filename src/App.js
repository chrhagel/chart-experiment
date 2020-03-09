import React from "react";
import "./App.css";
import Barchart from "./components/Barchart";
import SVGchart from "./components/SVGchart";
import rawdata from "./sample-data";
import restaurants from "./sample-restaurants";

class App extends React.Component {
  state = {
    data: {},
    theme: {
      bgcol: "white",
      col: "black",
      barcols: ["#61DAFB", "orange", "silver"],
      showYTicks: true
    }
  };

  loadSampleData = () => {
    this.setState({
      data: {
        bar01: { value: 50, label: "AAA" },
        bar02: { value: 10, label: "BBB" },
        bar03: { value: 90, label: "CCC" },
        bar04: { value: 12, label: "DDD" },
        bar05: { value: 60, label: "EEE" },
        bar06: { value: 80, label: "FFF" },
        bar07: { value: 27, label: "FFF" },
        bar08: { value: 50, label: "AAA" },
        bar09: { value: 10, label: "BBB" },
        bar10: { value: 70, label: "CCC" },
        bar11: { value: 32, label: "DDD" },
        bar12: { value: 10, label: "EEE" },
        bar13: { value: 80, label: "FFF" },
        bar14: { value: 54, label: "FFF" }
      }
    });
  };

  componentDidMount() {
    // this.loadSampleData();
    this.setState({data: restaurants });
  }

  render() {
    return (
      <div className="App">
        {/* <div><Text text="Try click on rect" /></div> */}

        <button onClick={this.loadSampleData}>Load sample data</button>
        <button onClick={this.loadSampleData}>Bob</button>

        <Barchart
          height={400}
          width={200}
          data={this.state.data}
          theme={this.state.theme}
        />

        <h1>New component</h1>
        <SVGchart height={400} width={200} data={this.state.data} />
      </div>
    );
  }
}

export default App;
