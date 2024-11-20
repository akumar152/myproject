import React, { useState, useEffect } from 'react';
import { FormSectionContainer, FormGroup, Button } from './styles';

function FormSection({ type }) {
  // State to hold the form data coming from API
  const [formData, setFormData] = useState({
    title_name: '',
    category_name: '',
    description: '',
    doc_link: '',
    sharepoint_link: '',
    editable_file_path: ''
  });

  // Mocking API call and setting data (you can replace this with actual API call)
  useEffect(() => {
    // Simulating API response
    const fetchedData = {
      title_name: 'Project X',
      category_name: 'Research',
      description: 'This is a description of Project X',
      doc_link: '',
      sharepoint_link: '',
      editable_file_path: ''
    };
    
    setFormData(fetchedData);
  }, []);

  // Handle change for the editable input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <FormSectionContainer>
      <h3>{type === 'component1' ? 'Form for Component 1' : type === 'component2' ? 'Form for Component 2' : 'Form for Component 3'}</h3>
      <form>
        {/* Title Name (Text coming from API) */}
        <FormGroup>
          <label htmlFor="title_name">Title Name:</label>
          <p id="title_name">{formData.title_name}</p>
        </FormGroup>

        {/* Category Name (Text coming from API) */}
        <FormGroup>
          <label htmlFor="category_name">Category Name:</label>
          <p id="category_name">{formData.category_name}</p>
        </FormGroup>

        {/* Description (Text coming from API) */}
        <FormGroup>
          <label htmlFor="description">Description:</label>
          <p id="description">{formData.description}</p>
        </FormGroup>

        {/* Document Link Input (Editable) */}
        <FormGroup>
          <label htmlFor="doc_link">Document Link</label>
          <input
            type="url"
            id="doc_link"
            name="doc_link"
            value={formData.doc_link}
            onChange={handleInputChange}
            placeholder="Enter Document Link"
          />
        </FormGroup>

        {/* SharePoint Link Input (Editable) */}
        <FormGroup>
          <label htmlFor="sharepoint_link">SharePoint Link</label>
          <input
            type="url"
            id="sharepoint_link"
            name="sharepoint_link"
            value={formData.sharepoint_link}
            onChange={handleInputChange}
            placeholder="Enter SharePoint Link"
          />
        </FormGroup>

        {/* Editable File Path Input (Editable) */}
        <FormGroup>
          <label htmlFor="editable_file_path">Editable File Path</label>
          <input
            type="text"
            id="editable_file_path"
            name="editable_file_path"
            value={formData.editable_file_path}
            onChange={handleInputChange}
            placeholder="Enter Editable File Path"
          />
        </FormGroup>
      </form>
    </FormSectionContainer>
  );
}

export default FormSection;
