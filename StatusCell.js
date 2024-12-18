import React from "react";
import styled from "styled-components";

// Styled Components for Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Transparent dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  width: 50%;
  max-width: 600px;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const ModalForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two-column layout */
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* Single column on small screens */
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.9rem;
    margin-bottom: 5px;
    color: #555;
    font-weight: bold;
  }

  input,
  textarea {
    padding: 8px 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 3px rgba(0, 123, 255, 0.3);
    }
  }
`;

const ButtonContainer = styled.div`
  grid-column: span 2; /* Buttons span both columns */
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-column: span 1;
    flex-direction: column;
    gap: 10px;
  }
`;

const ModalButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
  color: #fff;

  &:first-child {
    background-color: #6c757d; /* Cancel button style */
  }

  &:last-child {
    background-color: #007bff; /* Submit button style */
  }

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

function Modal({ onClose }) {
    return (
        <ModalOverlay>
            <ModalContainer>
                {/* Close Button */}
                <CloseButton onClick={onClose}>&times;</CloseButton>

                {/* Title */}
                <ModalTitle>Form Details</ModalTitle>

                {/* Form */}
                <ModalForm>
                    {/* Non-Editable Fields */}
                    <FormGroup>
                        <label>Name</label>
                        <input type="text" value="John Doe" readOnly />
                    </FormGroup>

                    <FormGroup>
                        <label>Email</label>
                        <input type="text" value="john.doe@example.com" readOnly />
                    </FormGroup>

                    <FormGroup>
                        <label>Phone</label>
                        <input type="text" value="555-1234" readOnly />
                    </FormGroup>

                    {/* Editable Fields */}
                    <FormGroup>
                        <label>Address</label>
                        <input type="text" placeholder="Enter Address" />
                    </FormGroup>

                    <FormGroup>
                        <label>City</label>
                        <input type="text" placeholder="Enter City" />
                    </FormGroup>

                    <FormGroup>
                        <label>State</label>
                        <input type="text" placeholder="Enter State" />
                    </FormGroup>

                    {/* Buttons */}
                    <ButtonContainer>
                        <ModalButton type="button" onClick={onClose}>
                            Cancel
                        </ModalButton>
                        <ModalButton type="submit">Submit</ModalButton>
                    </ButtonContainer>
                </ModalForm>
            </ModalContainer>
        </ModalOverlay>
    );
}

export default Modal;
