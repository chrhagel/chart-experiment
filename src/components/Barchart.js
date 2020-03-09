import React from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import Konva from "konva";
import ColoredRect from "./ColoredRect";

class Barchart extends React.Component {
  handleLineClick = () => {
    console.log("bob");
    alert("bob");
  };

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
      return h;
    }

    // highest bar should fill up the barchart height. All bars should be scaled
    const scale = height / maxHeightCalc();
    // x posiiton of the bar
    const xPos = width / Object.keys(data).length;
    // space between bars should be 1/2 the width of bars.
    // 4 bars = 3 spaces. -> 4 + 4 + 3 = 11. Width /11 = each space. And a bar is twice that.
    const barWidth =
      2 *
      (width / (Object.keys(data).length * 2 + (Object.keys(data).length - 1)));

    return (
      <Stage width={this.props.width} height={this.props.height}>
        <Layer>
          {this.renderBackground(height, width, gutter)}

          {this.renderYAxisTickMarks(gutter, height)}

          {/* Bars */}
          {Object.keys(data).map((key, index) => (
            <ColoredRect
              key={key}
              xPos={xPos * index + gutter}
              yPos={height - scale * data[key].rating}
              height={scale * data[key].rating}
              width={barWidth}
              value={data[key].rating}
              chartHeight={height} // used for labels
              color={this.props.theme.barcols[0]}
            />
          ))}

          <Line
            // horisontal x axis
            points={[gutter, height, this.props.width, height]}
            stroke={"black"}
            strokeWidth={1}
            tension={1}
          />

          <Line
            // vertical Y axis
            // [x1, y1, x2, y2, x3, y3]
            points={[gutter, 0, gutter, height]}
            stroke={"black"}
            strokeWidth={1}
            tension={1}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Barchart;
