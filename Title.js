const RenderTable3 = (ref, data, columns) => {
  const [searchFilters, setSearchFilters] = useState({}); // Store search filters
  const [inputValues, setInputValues] = useState([]); // Track independent input values in array

  // Update search filter value for a column
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value.toLowerCase(),
    }));
  };

  // Update input value for a specific row and column
  const handleInputChange = (rowIndex, field, value) => {
    const updatedInputValues = [...inputValues];
    if (!updatedInputValues[rowIndex]) {
      updatedInputValues[rowIndex] = {}; // Ensure the row exists
    }
    updatedInputValues[rowIndex][field] = value;
    setInputValues(updatedInputValues);
  };

  // Submit data to the API
  const handleSubmit = (rowIndex) => {
    const payload = inputValues[rowIndex];
    console.log(`Submitting data for row ${rowIndex}:`, payload);
    // Add your API call logic here
  };

  // Filter rows based on search inputs
  const filteredKeys = Object.keys(data).filter((key) =>
    columns.every((col) =>
      searchFilters[col.field]
        ? String(data[key][col.field] || "")
            .toLowerCase()
            .includes(searchFilters[col.field])
        : true
    )
  );

  return (
    <ScrollableWrapper ref={ref}>
      <StyledDataTable
        value={filteredKeys} // Use filtered keys for rendering rows
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
            body={(rowData, { rowIndex }) => {
              const key = filteredKeys[rowIndex];
              return [1, 3, 4].includes(rowIndex) ? (
                <input
                  type="text"
                  value={inputValues[rowIndex]?.[col.field] || ""}
                  onChange={(e) =>
                    handleInputChange(rowIndex, col.field, e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "4px",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                data[key][col.field]
              );
            }}
            footer={(rowIndex) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <Button
                    label="Submit"
                    onClick={() => handleSubmit(rowIndex)}
                    className="p-button-sm"
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      height: "24px",
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
