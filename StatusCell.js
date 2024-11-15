import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import DATA from '../data';
import ReactTooltip from 'react-tooltip';

// Tooltip Content logic
const TooltipContent = ({ content, customContent, cellValue }) => {
  // Split customContent into lines if you want each piece of content to be displayed on a new line
  const customContentLines = customContent.split(','); // Assuming customContent is a comma-separated string

  return (
    <div
      data-tip
      data-for="tooltip" // Reference to the tooltip ID
      style={{ position: "relative" }}
    >
      <p>{cellValue}</p>
      {/* Tooltip will be triggered when hovering over this p element */}
      <ReactTooltip
        id="tooltip"
        place="top"
        effect="solid"
        multiline={true}
        backgroundColor="#333"
        textColor="#fff"
        className="custom-tooltip"
        delayHide={500}
        delayShow={300}
      >
        {customContentLines.map((line, index) => (
          <div key={index}>{line}</div> // Render each line in the tooltip
        ))}
      </ReactTooltip>
    </div>
  );
};
