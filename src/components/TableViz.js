import React from "react";

class TableViz extends React.Component {
  renderRow = restaurant => {
    const fields = this.props.fields;
    let cells = [];

    fields.forEach(function(item, index, array) {
      cells.push(<td key={item + index}>{restaurant[item]}</td>);
    });

    return cells;
  };

  renderTableHeader = () => {
    const fields = this.props.fields;
    let header = [];

    fields.forEach(function(item, index, array) {
      header.push(<th key={item + index}>{item}</th>);
    });

    return header;
  };

  render() {
    const data = this.props.data;
    return (
      <>
        <table>
          <thead>
            <tr>{this.renderTableHeader()}</tr>
          </thead>
          <tbody>
            {Object.keys(data).map(key => (
              <tr key={key}>{this.renderRow(data[key])}</tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default TableViz;
