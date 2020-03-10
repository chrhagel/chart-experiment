import React from "react";

class Dataselector extends React.Component {
  cityRef = React.createRef();
  nameRef = React.createRef();
  yearsRef = React.createRef();
  ratingRef = React.createRef();

  handleCheck = event => {
    // console.log(event.target.checked);
    // console.log(event.target.name);

    // make new object based on values
    const chartdata = {
      city: this.cityRef.current.checked,
      name: this.nameRef.current.checked,
      years: this.yearsRef.current.checked,
      rating: this.ratingRef.current.checked
    };

    // 2. pass object to updateChartData from App
    this.props.updateChartData(chartdata);
  };

  render() {

    return (
      <>
        <p>Which data should be included</p>
        <form>
          <label for="city">City:</label>
          <input
            type="checkbox"
            id="city"
            name="city"
            ref={this.cityRef}
            onChange={this.handleCheck}
          />

          <label for="name">Name:</label>
          <input
            type="checkbox"
            id="name"
            name="name"
            ref={this.nameRef}
            onChange={this.handleCheck}
          />

          <br />

          <label for="years">Years in business:</label>
          <input
            type="checkbox"
            id="years"
            name="years"
            ref={this.yearsRef}
            onChange={this.handleCheck}
          />

          <label for="rating">Rating:</label>
          <input
            type="checkbox"
            id="rating"
            name="rating"
            ref={this.ratingRef}
            onChange={this.handleCheck}
          />
        </form>
      </>
    );
  }
}

export default Dataselector;
