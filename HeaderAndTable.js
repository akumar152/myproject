import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

function FormSection({ type }) {
  const [formData, setFormData] = useState({
    title_name: "",
    category_name: "",
    description: "",
    doc_link: "",
    sharepoint_link: "",
    editable_file_path: "",
  });

  // Mocking API call and setting data (you can replace this with actual API call)
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

  return (
    <Card className="shadow-sm my-4" style={{ borderRadius: "10px" }}>
      <Card.Header as="h4" className="bg-primary text-white">
        {type === "component1"
          ? "Form for Component 1"
          : type === "component2"
          ? "Form for Component 2"
          : "Form for Component 3"}
      </Card.Header>
      <Card.Body>
        <Form>
          {/* Title Name */}
          <Form.Group className="mb-3">
            <Form.Label>Title Name:</Form.Label>
            <p className="form-control-plaintext">{formData.title_name}</p>
          </Form.Group>

          {/* Category Name */}
          <Form.Group className="mb-3">
            <Form.Label>Category Name:</Form.Label>
            <p className="form-control-plaintext">{formData.category_name}</p>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <p className="form-control-plaintext">{formData.description}</p>
          </Form.Group>

          {/* Document Link */}
          <Form.Group className="mb-3">
            <Form.Label>Document Link</Form.Label>
            <Form.Control
              type="url"
              name="doc_link"
              value={formData.doc_link}
              onChange={handleInputChange}
              placeholder="Enter Document Link"
            />
          </Form.Group>

          {/* SharePoint Link */}
          <Form.Group className="mb-3">
            <Form.Label>SharePoint Link</Form.Label>
            <Form.Control
              type="url"
              name="sharepoint_link"
              value={formData.sharepoint_link}
              onChange={handleInputChange}
              placeholder="Enter SharePoint Link"
            />
          </Form.Group>

          {/* Editable File Path */}
          <Form.Group className="mb-3">
            <Form.Label>Editable File Path</Form.Label>
            <Form.Control
              type="text"
              name="editable_file_path"
              value={formData.editable_file_path}
              onChange={handleInputChange}
              placeholder="Enter Editable File Path"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormSection;
