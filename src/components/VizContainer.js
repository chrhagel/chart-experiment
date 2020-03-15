import React from "react";
import Barchart from "./Barchart";
import Scatterplot from "./Scatterplot";
import TableViz from "./TableViz";

class VizContainer extends React.Component {
  decideViz = chartdata => {
    const { city, name, years, rating } = chartdata;

    if (city || name) {
      let fields = [];
      if (city) {
        fields.push("city");
      }
      if (name) {
        fields.push("name");
      }
      if (years) {
        fields.push("years");
      }
      if (rating) {
        fields.push("rating");
      }
      return this.makeTable(fields);
    }
    if (years && rating) {
      return this.makeScatterplot();
    }
    if (years || rating) {
      if (years) {
        return this.makeBar("years");
      } else {
        return this.makeBar("rating");
      }
    } else {
      return <p>Please select data to display</p>;
    }
  };

  makeScatterplot = () => {
    return (
      <Scatterplot
        height={400}
        width={800}
        data={this.props.data}
        theme={this.props.theme}
      />
    );
  };

  makeTable = fields => {
    return <TableViz fields={fields} data={this.props.data} />;
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
        {this.decideViz(chartdata)}
      </>
    );
  }
}

export default VizContainer;
