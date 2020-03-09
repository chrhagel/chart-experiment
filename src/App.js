import React from "react";
import "./App.css";
import Barchart from "./components/Barchart";
import Dataselctor from "./components/Dataselector";
import Formatter from "./components/Formatter";
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

  componentDidMount() {
    // this.loadSampleData();
    this.setState({ data: restaurants });
  }

  render() {
    return (
      <div className="App">
        <div className="header-area">
          <h1>Restaurant Chart Example</h1>
        </div>

        <div className="data-picker-area">
          <Dataselctor/>
        </div>

        <div className="chart-area">
          <Barchart
            height={400}
            width={800}
            data={this.state.data}
            theme={this.state.theme}
          />
        </div>

        <div className="format-area">
          <Formatter/>
        </div>

        {/* <div><Text text="Try click on rect" /></div> */}
      </div>
    );
  }
}

export default App;
