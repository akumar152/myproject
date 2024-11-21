{
  Header: 'Description',
  accessor: 'description',
  Cell: ({ value, row }) => {
    // Return the cell with custom tooltip logic
    return (
      <div
        style={{
          maxWidth: '200px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',  // Center align text
          cursor: 'pointer',    // Show pointer on hover
        }}
        onMouseEnter={(e) => {
          // Create the tooltip div
          const tooltip = document.createElement('div');
          tooltip.id = 'custom-tooltip';
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Dark background
          tooltip.style.color = 'white'; // White text
          tooltip.style.padding = '10px 15px';
          tooltip.style.borderRadius = '5px';
          tooltip.style.whiteSpace = 'normal'; // Allow text to wrap
          tooltip.style.maxWidth = '300px'; // Maximum width of the tooltip
          tooltip.style.zIndex = '9999';
          tooltip.style.textAlign = 'left'; // Align text to the left

          // Populate the tooltip with column name: value pairs
          tooltip.innerHTML = Object.keys(row.values)
            .map(
              (key) => `<div><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${row.values[key]}</div>`
            )
            .join('');

          // Append the tooltip to the body
          document.body.appendChild(tooltip);

          // Position the tooltip above the element
          const rect = e.target.getBoundingClientRect();
          tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`; // Place it above the element
          tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`; // Center it horizontally
        }}
        onMouseLeave={() => {
          // Remove the tooltip when mouse leaves the cell
          const tooltip = document.getElementById('custom-tooltip');
          if (tooltip) tooltip.remove();
        }}
      >
        {value}
      </div>
    );
  },
}
