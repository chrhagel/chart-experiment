import React from "react";
import Barchart from "./Barchart";
import Scatterplot from "./Scatterplot";
import TableViz from "./TableViz";

class VizContainer extends React.Component {
  decideViz = chartdata => {
    const { city, name, years, rating } = chartdata;

    if (city || name) {
      return <p>table</p>;
    }
    if (years && rating) {
      return <p>scatter</p>;
    }
    if (years || rating) {
      if (years) {
        return this.makeBar("years");
      } else {
        return this.makeBar("rating");
      }
    } else {
      return <p>nothing</p>;
    }
  };

  makeBar = field => {
    const data = this.props.data;
    let newdata = {};

    let isYears = true;
    if (field === "rating") {
      isYears = false;
    }

    Object.keys(data).map(key => {
      if (isYears) {
        newdata[key] = { value: data[key].years };
      } else {
        newdata[key] = { value: data[key].rating };
      }
    });

    return (
      <Barchart
        height={400}
        width={800}
        data={newdata}
        theme={this.props.theme}
      />
    );
  };

  render() {
    const chartdata = this.props.chartdata;
    console.log(chartdata);

    return (
      <>
        <h2>decider</h2>
        {this.decideViz(chartdata)}
      </>
    );
  }
}

export default VizContainer;
