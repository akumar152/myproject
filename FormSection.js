import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adds spacing between form groups */
  width: 100%; /* Ensures the form takes up full width */
  height: 100%;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  label {
    font-size: 1rem;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical; /* Allows vertical resizing but restricts horizontal resizing */
  }
`;

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
    <FormContainer>
      <FormHeader>
        <FormTitle>
          {type === "component1"
            ? "Form for Component 1"
            : type === "component2"
            ? "Form for Component 2"
            : "Form for Component 3"}
        </FormTitle>
        <EditButton
          onClick={toggleEdit}
          title={isEditable ? "Disable Editing" : "Enable Editing"}
        >
          🖉
        </EditButton>
      </FormHeader>
      <form>
        <FormGroup>
          <label>Title Name:</label>
          {isEditable ? (
            <input
              type="text"
              name="title_name"
              value={formData.title_name}
              onChange={handleInputChange}
              placeholder="Enter Title Name"
            />
          ) : (
            <div>{formData.title_name}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label>Category Name:</label>
          {isEditable ? (
            <select
              name="category_name"
              value={formData.category_name}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Research and Development">Research and Development</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
            </select>
          ) : (
            <div>{formData.category_name}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label>Description:</label>
          {isEditable ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter Description"
            />
          ) : (
            <div>{formData.description}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label>Document Link:</label>
          {isEditable ? (
            <input
              type="url"
              name="doc_link"
              value={formData.doc_link}
              onChange={handleInputChange}
              placeholder="Enter Document Link"
            />
          ) : (
            <div>{formData.doc_link || "N/A"}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label>SharePoint Link:</label>
          {isEditable ? (
            <input
              type="url"
              name="sharepoint_link"
              value={formData.sharepoint_link}
              onChange={handleInputChange}
              placeholder="Enter SharePoint Link"
            />
          ) : (
            <div>{formData.sharepoint_link || "N/A"}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label>Editable File Path:</label>
          {isEditable ? (
            <input
              type="text"
              name="editable_file_path"
              value={formData.editable_file_path}
              onChange={handleInputChange}
              placeholder="Enter Editable File Path"
            />
          ) : (
            <div>{formData.editable_file_path || "N/A"}</div>
          )}
        </FormGroup>
      </form>
    </FormContainer>
  );
}

export default FormSection;
