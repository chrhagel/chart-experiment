import React from "react";
import { Circle } from "react-konva";
import Konva from "konva";

class Scatterplot extends React.Component {

  handleClick = () => {
    alert(this.props.value);
  };

  render() {
   console.log(this.props.value + " " + this.props.yPos ) 
    return (
      <>
        <Circle
          x={this.props.xPos}
          y={this.props.yPos}
          radius={this.props.radius}
          fill={this.props.color}
          value={this.props.value}
          onClick={this.handleClick}
        />
      </>
    );
  }
}

export default Scatterplot;
