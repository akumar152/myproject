import React, { useState, useEffect } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";

function FormSection({ type }) {
  const [formData, setFormData] = useState({
    title_name: "",
    category_name: "",
    description: "",
    doc_link: "",
    sharepoint_link: "",
    editable_file_path: "",
    dropdown_option: "", // Added dropdown field
  });

  const dropdownOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  useEffect(() => {
    const fetchedData = {
      title_name: "Project X",
      category_name: "Research and Development",
      description:
        "This is a description of Project X. The description is detailed and can be long enough to demonstrate text wrapping behavior in the form section.",
      doc_link: "",
      sharepoint_link: "",
      editable_file_path: "",
      dropdown_option: "Option 2", // Default selected option
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
    <Container fluid className="p-0">
      <Card className="shadow-sm border-0" style={{ borderRadius: "10px" }}>
        <Card.Header
          style={{
            backgroundColor: "#007bff",
            color: "white",
            textAlign: "center",
            fontSize: "1.25rem", // Reduced header font size
            fontWeight: "bold",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          {type === "component1"
            ? "Form for Component 1"
            : type === "component2"
            ? "Form for Component 2"
            : "Form for Component 3"}
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              {/* Title Name */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>Title Name:</Form.Label>
                  <div
                    className="p-3 border rounded bg-light"
                    style={{ minHeight: "50px" }}
                  >
                    {formData.title_name}
                  </div>
                </Form.Group>
              </Col>

              {/* Category Name */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>Category Name:</Form.Label>
                  <div
                    className="p-3 border rounded bg-light"
                    style={{ minHeight: "50px" }}
                  >
                    {formData.category_name}
                  </div>
                </Form.Group>
              </Col>

              {/* Description */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>Description:</Form.Label>
                  <div
                    className="p-3 border rounded bg-light"
                    style={{ minHeight: "100px" }}
                  >
                    {formData.description}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Document Link */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>Document Link</Form.Label>
                  <Form.Control
                    type="url"
                    name="doc_link"
                    value={formData.doc_link}
                    onChange={handleInputChange}
                    placeholder="Enter Document Link"
                  />
                </Form.Group>
              </Col>

              {/* SharePoint Link */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>SharePoint Link</Form.Label>
                  <Form.Control
                    type="url"
                    name="sharepoint_link"
                    value={formData.sharepoint_link}
                    onChange={handleInputChange}
                    placeholder="Enter SharePoint Link"
                  />
                </Form.Group>
              </Col>

              {/* Editable File Path */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>Editable File Path</Form.Label>
                  <Form.Control
                    type="text"
                    name="editable_file_path"
                    value={formData.editable_file_path}
                    onChange={handleInputChange}
                    placeholder="Enter Editable File Path"
                  />
                </Form.Group>
              </Col>

              {/* Dropdown Field */}
              <Col xs={12} className="mb-4">
                <Form.Group>
                  <Form.Label>Select Option</Form.Label>
                  <Form.Control
                    as="select"
                    name="dropdown_option"
                    value={formData.dropdown_option}
                    onChange={handleInputChange}
                  >
                    {dropdownOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FormSection;
