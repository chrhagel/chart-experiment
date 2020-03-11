import React from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import Konva from "konva";
import Plotmark from "./Plotmark";

class Scatterplot extends React.Component {
  renderBackground = (height, width, gutter) => {
    return (
      <Rect
        x={0}
        y={0}
        width={width + gutter}
        height={height}
        fill={this.props.theme.bgcol}
      />
    );
  };

  renderYAxisTickMarks = (gutter, height) => {
    if (this.props.theme.showYTicks) {
      const numYMarks = 10;
      const yAxisTickDistance = height / numYMarks + 1; // so we dont start at the x axis.
      var arr = [];
      for (var i = 0; i < numYMarks; i++) {
        arr.push(
          <Line
            key={"mark" + i}
            points={[
              gutter - 3,
              yAxisTickDistance * i,
              this.props.width + 3,
              yAxisTickDistance * i
            ]}
            stroke={this.props.theme.col}
            strokeWidth={1}
            tension={1}
            dash={[4]}
            onClick={this.handleLineClick} // NOT WORKING
          />
        );
      }
      return arr;
    } else return null;
  };

  render() {
    const data = this.props.data;
    let gutter = 0;
    if (this.props.theme.showYTicks) {
      gutter = 10;
    }

    const width = this.props.width - gutter;
    const height = this.props.height - gutter;

    function maxHeightCalc() {
      let h = 0;
      Object.keys(data).map(key => {
        if (data[key].rating > h) {
          h = data[key].rating;
        }
      });
      return h + 10;
    }

    function maxWidthCalc() {
      let w = 0;
      Object.keys(data).map(key => {
        if (data[key].years > w) {
          w = data[key].years;
        }
      });
      return w;
    }

    // highest bar should fill up the barchart height. All bars should be scaled
    const hScale = height / maxHeightCalc();
    const wScale = width / maxWidthCalc();

    return (
      <Stage width={this.props.width} height={this.props.height}>
        <Layer>
          {this.renderBackground(height, width, gutter)}
          {this.renderYAxisTickMarks(gutter, height)}
          {/* plot marks */}
          {Object.keys(data).map((key, index) => (
            <Plotmark
              key={key}
              xPos={data[key].years * wScale}
              yPos={height - data[key].rating * hScale}
              radius={5}
              color={this.props.theme.barcols[0]}
              value={data[key].name + '--- Rating: ' + data[key].rating + ' and ' + 'Years: ' + data[key].years}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default Scatterplot;
