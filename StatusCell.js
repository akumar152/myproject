
import React, { useState, useEffect } from "react";
import axios from "axios";

const RenderTable3 = (ref, data, columns) => {
  const [searchFilters, setSearchFilters] = useState({});
  const [buttonStates, setButtonStates] = useState({});
  const [tableData, setTableData] = useState(data); // Local state for table data

  // Fetch initial statuses from the API
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get("/api/get-statuses"); // Replace with your API endpoint
        const initialStates = {};

        response.data.forEach((row) => {
          const { id, status } = row; // Assuming each row has 'id' and 'status'
          initialStates[id] = {
            button1:
              status === "Submit"
                ? "Submitted"
                : "Submit",
            button2:
              status === "Review not started"
                ? "In Review"
                : status === "In Review"
                ? "Review Completed"
                : "Review not started",
          };
        });

        setButtonStates(initialStates);
      } catch (error) {
        console.error("Error fetching initial statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  // Update search filter value for a column
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value.toLowerCase(),
    }));
  };

  // Handle button click, update data, and send to API
  const handleButtonClick = async (field, type, rowId) => {
    let updatedStatus;

    if (type === "Submit") {
      updatedStatus = "Submitted";
    } else if (type === "Review not started") {
      updatedStatus = "In Review";
    } else if (type === "In Review") {
      updatedStatus = "Review Completed";
    }

    // Update button states
    setButtonStates((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [type === "Submit" ? "button1" : "button2"]: updatedStatus,
      },
    }));

    // Send updated data to the API
    try {
      await axios.post("/api/update-data", {
        id: rowId,
        field,
        status: updatedStatus,
      });
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Determine button styles dynamically
  const getButtonStyle = (label) => {
    switch (label) {
      case "Submit":
        return { backgroundColor: "lightblue", color: "black" };
      case "Submitted":
        return { backgroundColor: "lightgreen", color: "black" };
      case "Review not started":
        return { backgroundColor: "orange", color: "black" };
      case "In Review":
        return { backgroundColor: "darkorange", color: "white" };
      case "Review Completed":
        return { backgroundColor: "darkgreen", color: "white" };
      default:
        return {};
    }
  };

  // Filter rows based on search inputs
  const filteredData = tableData.filter((row) =>
    columns.every((col) =>
      searchFilters[col.field]
        ? String(row[col.field]).toLowerCase().includes(searchFilters[col.field])
        : true
    )
  );

  return (
    <ScrollableWrapper ref={ref}>
      <StyledDataTable
        value={filteredData} // Use filtered data here
        scrollable
        showGridlines
        stripedRows
        scrollHeight="calc(100% - 10px)"
        scrollDirection="horizontal"
        minWidth={minWidth}
        size="small"
        style={{ width: "200px" }}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={
              <input
                type="text"
                placeholder={`Search ${col.header}`}
                onChange={(e) => handleSearchChange(col.field, e.target.value)}
                style={{
                  width: "100%",
                  padding: "4px",
                  boxSizing: "border-box",
                }}
              />
            }
            body={(rowData, { rowIndex }) =>
              [1, 3, 4].includes(rowIndex) ? (
                <input
                  type="text"
                  value={rowData[col.field]}
                  onChange={(e) =>
                    handleEdit(rowIndex, col.field, e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "4px",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                rowData[col.field]
              )
            }
            footer={(rowData, { rowIndex }) => {
              const rowId = rowData.id; // Assuming each row has a unique ID
              const button1Label = buttonStates[rowId]?.button1 || "Submit";
              const button2Label = buttonStates[rowId]?.button2 || "Review not started";

              return (
                <div style={{ textAlign: "center" }}>
                  <Button
                    label={button1Label}
                    onClick={() => handleButtonClick(col.field, "Submit", rowId)}
                    className="p-button-sm"
                    style={{
                      ...getButtonStyle(button1Label),
                      fontSize: "8px",
                      padding: "4px 4px",
                      height: "24px",
                    }}
                  />
                  <Button
                    label={button2Label}
                    onClick={() =>
                      handleButtonClick(col.field, button2Label, rowId)
                    }
                    className="p-button-sm p-button-secondary"
                    style={{
                      ...getButtonStyle(button2Label),
                      fontSize: "8px",
                      padding: "4px 4px",
                      height: "24px",
                      marginLeft: "5px",
                    }}
                  />
                </div>
              );
            }}
            headerStyle={{ width: "10rem" }}
          />
        ))}
      </StyledDataTable>
    </ScrollableWrapper>
  );
};

export default RenderTable3;
