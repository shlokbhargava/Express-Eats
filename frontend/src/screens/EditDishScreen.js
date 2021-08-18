import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const EditDishScreen = ({ match }) => {
    const dishId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [cost, setCost] = useState(0)
    const [image, setImage] = useState('')

    const loading = false

    const editDishHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h2 className='text-center mt-5'><i className="far fa-edit"></i> DISH</h2>
            <FormContainer>
                <Form onSubmit={editDishHandler}>
                    <Form.Group className='mb-2'>
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Description/Ingredients</Form.Label>
                            <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description for your restaurant" style={{ height: '70px' }} />
                        </Form.Group>
                    <Row className="mb-2">
                        <Form.Group as={Col}>
                            <Form.Label>Select Dish Type</Form.Label>
                            {/* <Form.Select as='select' value={type} onChange={(e) => setType(e.target.value)}required >
                                <option value=''>Select Type</option>
                                <option value='Veg'>Veg</option>
                                <option value='Non Veg'>Non Veg</option>
                            </Form.Select> */}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Min Order Value" required />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-4">
                        <Form.Label>Upload Image</Form.Label><br></br>
                        <Form.Control type="file" required />
                    </Form.Group>

                                
                    <Button className='btn btn-dark mb-4' type='submit'>
                        { loading ? 'Loading…' : 'Submit' }
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default EditDishScreen
