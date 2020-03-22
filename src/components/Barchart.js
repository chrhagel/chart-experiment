import React from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
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

  renderYAxisTickMarks = (drawingHeight, leftPadding) => {
    if (this.props.theme.showYTicks) {
      var arr = [];
      const numYMarks = 11;
      const yAxisTickDistance = drawingHeight / numYMarks + 1; // so we dont start at the x axis.

      for (var i = 0; i < numYMarks; i++) {
        const yPostition = drawingHeight - yAxisTickDistance * i;
        arr.push(
          <Line
            key={"mark" + i}
            points={[leftPadding, yPostition, this.props.width + 3, yPostition]}
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

  // yDomainMax = highest value.
  renderYAxis = (drawingHeight, yDomainMax, topPadding) => {
    if (this.props.theme.showYAxis) {
      var arr = [];
      const numYMarks = 11; // so we have a baseline for 0 and a tick for each 10.
      const domainTicks = parseInt(yDomainMax / (numYMarks - 1));
      const yAxisTickDistance = drawingHeight / numYMarks + 1; // so we dont start at the x axis.

      for (var i = 0; i < numYMarks; i++) {
        arr.push(
          <Text
            key={"text" + i}
            text={domainTicks * (numYMarks - (i + 1))}
            x={28}
            y={yAxisTickDistance * i + topPadding * 2}
            fontSize={12}
          />
        );
      }
      return arr;
    } else return null;
  };

  firstLetterToUpper = lowerStr => {
    return lowerStr.charAt(0).toUpperCase() + lowerStr.substring(1);
  };

  maxHeightCalc = () => {
    const data = this.props.data;
    let h = 0;
    Object.keys(data).map(key => {
      if (data[key].value > h) {
        h = data[key].value;
      }
    });
    return h + 10; //To give some margin between the highest rating and the top of the chart.
  };

  render() {
    const data = this.props.data;
    const leftPadding = 50;
    const topPadding = 10;
    const bottomPadding = 20;

    const width = this.props.width - leftPadding;

    const height = this.props.height;
    const drawingHeight = height - topPadding - bottomPadding;

    // highest bar should fill up the barchart height. All bars should be scaled
    const scale = drawingHeight / (this.maxHeightCalc() + 7);
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
          {this.renderBackground(height, width, leftPadding)}

          {/* {this.renderYAxisTickMarks(leftPadding, height)} */}
          {this.renderYAxisTickMarks(drawingHeight, leftPadding)}
          {this.renderYAxis(drawingHeight, this.maxHeightCalc(), topPadding)}

          {/* Bars */}
          {Object.keys(data).map((key, index) => (
            <ColoredRect
              key={key}
              xPos={xPos * index + leftPadding}
              yPos={drawingHeight - data[key].value * scale}
              // yPos={height - scale * data[key].value}
              height={scale * data[key].value}
              width={barWidth}
              value={data[key].value}
              chartHeight={height} // used for labels
              color={this.props.theme.barcols[0]}
            />
          ))}

          <Line
            // horisontal x axis
            points={[
              leftPadding,
              drawingHeight,
              this.props.width,
              drawingHeight
            ]}
            stroke={"black"}
            strokeWidth={1}
            tension={1}
          />

          <Line
            // vertical Y axis
            // [x1, y1, x2, y2, x3, y3]
            points={[leftPadding, 0, leftPadding, drawingHeight]}
            stroke={"black"}
            strokeWidth={1}
            tension={1}
          />

          <Text
            text={this.firstLetterToUpper(this.props.yAxis)}
            x={18}
            y={height / 2 - 20}
            fontSize={15}
            rotation={90}
          />

          <Text
            text={this.firstLetterToUpper(this.props.xAxis)}
            x={(width + leftPadding) / 2 - 20}
            y={height - 17}
            fontSize={15}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Barchart;
