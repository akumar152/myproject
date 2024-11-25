import React, { useState, useEffect } from "react";
import { FormSectionContainer, FormGroup } from "./styles";

function FormSection({ type }) {
  const [formData, setFormData] = useState({
    title_name: "",
    category_name: "",
    description: "",
    doc_link: "",
    sharepoint_link: "",
    editable_file_path: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Simulated API fetch
    const fetchedData = {
      title_name: "Project X",
      category_name: "Research and Development",
      description:
        "This is a description of Project X. The description is detailed and can be long enough to demonstrate text wrapping behavior in the form section.",
      doc_link: "",
      sharepoint_link: "",
      editable_file_path: "",
    };

    setFormData(fetchedData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <FormSectionContainer>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3>
          {type === "component1"
            ? "Form for Component 1"
            : type === "component2"
            ? "Form for Component 2"
            : "Form for Component 3"}
        </h3>
        <button
          onClick={toggleEdit}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
          title={isEditable ? "Disable Editing" : "Enable Editing"}
        >
          🖉
        </button>
      </div>
      <form>
        {/* Title Name */}
        <FormGroup>
          <label>Title Name:</label>
          {isEditable ? (
            <input
              type="text"
              name="title_name"
              value={formData.title_name}
              onChange={handleInputChange}
              placeholder={formData.title_name}
            />
          ) : (
            <div className="field-value">{formData.title_name}</div>
          )}
        </FormGroup>

        {/* Category Name */}
        <FormGroup>
          <label>Category Name:</label>
          {isEditable ? (
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleInputChange}
              placeholder={formData.category_name}
            />
          ) : (
            <div className="field-value">{formData.category_name}</div>
          )}
        </FormGroup>

        {/* Description */}
        <FormGroup>
          <label>Description:</label>
          {isEditable ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={formData.description}
              rows="4"
            />
          ) : (
            <div className="field-value">{formData.description}</div>
          )}
        </FormGroup>

        {/* Document Link */}
        <FormGroup>
          <label htmlFor="doc_link">Document Link:</label>
          {isEditable ? (
            <input
              type="url"
              id="doc_link"
              name="doc_link"
              value={formData.doc_link}
              onChange={handleInputChange}
              placeholder={formData.doc_link || "Enter Document Link"}
            />
          ) : (
            <div className="field-value">{formData.doc_link || "N/A"}</div>
          )}
        </FormGroup>

        {/* SharePoint Link */}
        <FormGroup>
          <label htmlFor="sharepoint_link">SharePoint Link:</label>
          {isEditable ? (
            <input
              type="url"
              id="sharepoint_link"
              name="sharepoint_link"
              value={formData.sharepoint_link}
              onChange={handleInputChange}
              placeholder={formData.sharepoint_link || "Enter SharePoint Link"}
            />
          ) : (
            <div className="field-value">{formData.sharepoint_link || "N/A"}</div>
          )}
        </FormGroup>

        {/* Editable File Path */}
        <FormGroup>
          <label htmlFor="editable_file_path">Editable File Path:</label>
          {isEditable ? (
            <input
              type="text"
              id="editable_file_path"
              name="editable_file_path"
              value={formData.editable_file_path}
              onChange={handleInputChange}
              placeholder={formData.editable_file_path || "Enter Editable File Path"}
            />
          ) : (
            <div className="field-value">{formData.editable_file_path || "N/A"}</div>
          )}
        </FormGroup>
      </form>
    </FormSectionContainer>
  );
}

export default FormSection;
