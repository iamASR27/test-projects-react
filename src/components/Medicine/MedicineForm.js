import React, { useContext, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ItemContext from '../../store/item-context';
import "./MedicineForm.css";

const MedicineForm = () => {
    const ctx = useContext(ItemContext);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        totalQuantity: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const url = `https://crudcrud.com/api/a700fd61a14745bbbd59fe9d679b890a`;
        const medicine = {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          totalQuantity: parseInt(formData.totalQuantity),
        };

        try {
            const postResponse = await fetch(`${url}/List`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(medicine),
            });
      
            if (!postResponse.ok) {
              throw new Error("Failed to add medicine.");
            }
    }catch (error) {
        console.error("Error adding medicine:", error);
      }

      setFormData({
        id: "",
        name: "",
        description: "",
        price: "",
        totalQuantity: "",
      });

      ctx.fetchItems();
    }

    return  <div className="form-container">
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="name">
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="totalQuantity">
            <Form.Label>Total Quantity</Form.Label>
            <Form.Control
              type="number"
              name="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" style={{ marginTop: "0.5rem" }}>
        Add Product
      </Button>
    </Form>
  </div>
}

export default MedicineForm;