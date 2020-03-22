import React from "react";
import { Rect, Text } from "react-konva";
import Konva from "konva";

class ColoredRect extends React.Component {
  state = {
    color: "lightblue"
  };
  handleClick = () => {
    // this.setState({
    //   color: Konva.Util.getRandomColor()
    // });
    alert(this.props.value);
  };

  renderText = () => {
    // should get to a place where the value of the bar is written there if there is one. It should be optional.
    // Text reference: https://konvajs.org/docs/shapes/Text.html
    const textXPosition = this.props.xPos + this.props.width / 2 - 15;
    const textYPosition = this.props.chartHeight - 30;

    // only show text if there is room to show it.
    if (this.props.width > 300) {
      return (
        <Text
          text={this.props.value}
          x={textXPosition}
          y={textYPosition}
          fontSize={20}
        />
      );
    }
  };

  render() {
    
    return (
      <>
        <Rect
          x={this.props.xPos}
          y={this.props.yPos}
          width={this.props.width}
          height={this.props.height}
          fill={this.props.color}
          shadowBlur={0}
          onClick={this.handleClick}
        />
        {this.renderText()}
      </>
    );
  }
}

export default ColoredRect;
