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
      category_name: 'Research and Development',
      description: 'This is a description of Project X. The description is detailed and can be long enough to demonstrate text wrapping behavior in the form section.',
      doc_link: '',
      sharepoint_link: '',
      editable_file_path: ''
    };
    
    setFormData(fetchedData);
  }, []);

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
          <label>Title Name:</label>
          <div className="field-value">{formData.title_name}</div>
        </FormGroup>

        {/* Category Name (Text coming from API) */}
        <FormGroup>
          <label>Category Name:</label>
          <div className="field-value">{formData.category_name}</div>
        </FormGroup>

        {/* Description (Text coming from API) */}
        <FormGroup>
          <label>Description:</label>
          <div className="field-value">{formData.description}</div>
        </FormGroup>

        {/* Document Link Input (Editable) */}
        <FormGroup>
          <label htmlFor="doc_link">Document Link</label>
          <input
            type="url"
            id="doc_link"
            name="doc_link"
            value={formData.doc_link}
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
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
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter Editable File Path"
          />
        </FormGroup>
      </form>
    </FormSectionContainer>
  );
}

export default FormSection;
