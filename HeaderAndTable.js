import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import { FormSectionContainer, FormGroup } from './styles';

function FormSection({ type }) {
  const [formData, setFormData] = useState({
    title_name: '',
    category_name: '',
    description: '',
    doc_link: '',
    sharepoint_link: '',
    editable_file_path: '',
  });

  const [categories, setCategories] = useState([
    'Research and Development',
    'Marketing',
    'Human Resources',
    'Finance',
    'Engineering',
  ]); // Example dropdown options

  const [filteredCategories, setFilteredCategories] = useState(categories); // To handle search

  useEffect(() => {
    const fetchedData = {
      title_name: 'Project X',
      category_name: 'Research and Development',
      description:
        'This is a description of Project X. The description is detailed and can be long enough to demonstrate text wrapping behavior in the form section.',
      doc_link: '',
      sharepoint_link: '',
      editable_file_path: '',
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

  const handleCategorySearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(searchValue)
    );
    setFilteredCategories(filtered);
  };

  const handleCategorySelect = (e) => {
    setFormData({
      ...formData,
      category_name: e.target.value,
    });
  };

  return (
    <Container className="p-4">
      <FormSectionContainer>
        <h3>
          {type === 'component1'
            ? 'Form for Component 1'
            : type === 'component2'
            ? 'Form for Component 2'
            : 'Form for Component 3'}
        </h3>
        <form>
          {/* Title Name (Text coming from API) */}
          <FormGroup>
            <label>Title Name:</label>
            <div className="field-value">{formData.title_name}</div>
          </FormGroup>

          {/* Category Name (Searchable Dropdown) */}
          <FormGroup>
            <label>Category Name:</label>
            <Form.Control
              type="text"
              placeholder="Search categories..."
              onChange={handleCategorySearch}
              className="mb-2"
            />
            <Form.Control
              as="select"
              value={formData.category_name}
              onChange={handleCategorySelect}
            >
              <option value="" disabled>
                Select a category
              </option>
              {filteredCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
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
    </Container>
  ); 
}

export default FormSection;
