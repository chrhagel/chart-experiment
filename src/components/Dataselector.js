import React from "react";

class Dataselector extends React.Component {
  render() {
    return (
      <>
      <h2>Which data should be included</h2>
      <form>
        <label for="fname">City:</label>
        <input type="checkbox" id="fname" name="fname" />
        
        <label for="fname">Name:</label>
        <input type="checkbox" id="fname" name="fname" />
        

        <label for="fname">Years in business:</label>
        <input type="checkbox" id="fname" name="fname" />
        

        <label for="fname">Rating:</label>
        <input type="checkbox" id="fname" name="fname" />
        
      </form>
      </>
    );
  }
}

export default Dataselector;
