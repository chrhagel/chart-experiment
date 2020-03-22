import React from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import Konva from "konva";
import Plotmark from "./Plotmark";

class Scatterplot extends React.Component {
  renderBackground = (height, width, leftPadding) => {
    return (
      <Rect
        x={0}
        y={0}
        width={width + leftPadding}
        height={height}
        fill={this.props.theme.bgcol}
      />
    );
  };

  renderYAxisTickMarks = (drawingHeight, markdiameter, leftPadding) => {
    if (this.props.theme.showYTicks) {
      var arr = [];
      const numYMarks = 11;
      const yAxisTickDistance = drawingHeight / numYMarks + 1; // so we dont start at the x axis.

      for (var i = 0; i < numYMarks; i++) {
        const yPostition =
          drawingHeight - yAxisTickDistance * i + parseInt(markdiameter / 2);
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
            y={yAxisTickDistance * i + (topPadding*2)}
            fontSize={12}
          />
        );
      }
      return arr;
    } else return null;
  };

  maxHeightCalc = () => {
    const data = this.props.data;
    let h = 0;
    Object.keys(data).map(key => {
      if (data[key].rating > h) {
        h = data[key].rating;
      }
    });
    return h + 10; //To give some margin between the highest rating and the top of the chart.
  };

  maxWidthCalc = () => {
    const data = this.props.data;
    let w = 0;
    Object.keys(data).map(key => {
      if (data[key].years > w) {
        w = data[key].years;
      }
    });
    return w;
  };

  render() {
    const data = this.props.data;
    const leftPadding = 50;
    const topPadding = 10;
    const bottomPadding = 20;

    const width = this.props.width - leftPadding;

    const height = this.props.height;
    const drawingHeight = height - topPadding - bottomPadding;

    const markdiameter = 5;

    // highest bar should fill up the barchart height. All bars should be scaled
    const hScale = drawingHeight / (this.maxHeightCalc() + 8) ;
    const wScale = (width - leftPadding) / this.maxWidthCalc();

    return (
      <Stage width={this.props.width} height={this.props.height}>
        <Layer>
          {this.renderBackground(height, width, leftPadding)}
          {this.renderYAxisTickMarks(drawingHeight, markdiameter, leftPadding)}

          {this.renderYAxis(drawingHeight, this.maxHeightCalc(), topPadding)}

          {/* plot marks */}
          {Object.keys(data).map((key, index) => (
            <Plotmark
              key={key}
              xPos={leftPadding + data[key].years * wScale}
              yPos={(drawingHeight- data[key].rating * (hScale))}
              radius={markdiameter}
              color={this.props.theme.barcols[0]}
              value={
                data[key].name +
                "--- Rating: " +
                data[key].rating +
                " and " +
                "Years: " +
                data[key].years
              }
            />
          ))}

          <Text
            text={"Rating"}
            x={18}
            y={height / 2 - 20}
            fontSize={15}
            rotation={90}
          />

          <Text
            text={"Years"}
            x={(width + leftPadding) / 2 - 20}
            y={height - 17}
            fontSize={15}
          />
        </Layer>
      </Stage>
    );
  }
}

export default Scatterplot;
