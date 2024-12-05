
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const TableWithColumnFooterButtons = () => {
  const [columnStates, setColumnStates] = useState({
    ID: { label: "Review Not Started", color: "gray" },
    Name: { label: "Review Not Started", color: "gray" },
    Status: { label: "Review Not Started", color: "gray" },
  });

  const data = [
    { id: 1, name: "John Doe", status: "Pending" },
    { id: 2, name: "Jane Smith", status: "Approved" },
  ];

  const handleButtonClick = (columnName) => {
    setColumnStates((prevState) => {
      const currentState = prevState[columnName];
      let newLabel = "";
      let newColor = "";

      if (currentState.label === "Review Not Started") {
        newLabel = "Submitted for Review";
        newColor = "blue";
      } else if (currentState.label === "Submitted for Review") {
        newLabel = "Review Completed";
        newColor = "green";
      } else {
        newLabel = "Review Not Started";
        newColor = "gray";
      }

      return {
        ...prevState,
        [columnName]: { label: newLabel, color: newColor },
      };
    });

    console.log(`Data for column "${columnName}":`, data.map((row) => row[columnName.toLowerCase()]));
  };

  const footerTemplate = (columnName) => {
    const columnState = columnStates[columnName];
    return (
      <Button
        label={columnState.label}
        style={{ backgroundColor: columnState.color, color: "white" }}
        onClick={() => handleButtonClick(columnName)}
      />
    );
  };

  return (
    <div>
      <h3>Table with Column Footer Buttons</h3>
      <DataTable value={data} responsiveLayout="scroll">
        <Column field="id" header="ID" footer={footerTemplate("ID")} />
        <Column field="name" header="Name" footer={footerTemplate("Name")} />
        <Column field="status" header="Status" footer={footerTemplate("Status")} />
      </DataTable>
    </div>
  );
};

export default TableWithColumnFooterButtons;
