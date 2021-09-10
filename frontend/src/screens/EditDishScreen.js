import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editDish, listDishDetails } from '../actions/dishActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { DISH_EDIT_RESET } from '../constants/dishConstants'

const EditDishScreen = ({ match, history }) => {
    const dishId = match.params.id

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [cost, setCost] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dishDetails = useSelector((state) => state.dishDetails)
    const { dish, loading: loadingDish, error: errorDishDetails } = dishDetails
 
    const dishEdit = useSelector((state) => state.dishEdit)
    const { loading, success, error } = dishEdit

    useEffect(() => {
        if (success) {
            dispatch({ type: DISH_EDIT_RESET })
            alert('Dish details updated')
            history.push('/dashboard')
        } else if (!loadingDish) {
            if (!dish.name || dish._id !== dishId) {
                dispatch(listDishDetails(dishId))
            } else {
                setName(dish.name)
                setDescription(dish.description)
                setType(dish.type)
                setCost(dish.cost)
                setImage(dish.image)
            }
        }
    }, [dispatch, dish, dishId, history, success, loadingDish])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            console.log('data', data)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const editDishHandler = (e) => {
        e.preventDefault()

        dispatch(editDish(dishId, {
            name,
            description,
            type,
            cost,
            image,
        }))
    }

    return (
        <>
            <Breadcrumb className='mt-2'>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Edit Dish</Breadcrumb.Item>
            </Breadcrumb>
            { loadingDish && <Loader /> }
            <h2 className='text-center mt-5'><i className="far fa-edit"></i> DISH</h2>
            <FormContainer>
            { error && <Message variant='danger'>{error}</Message> }
            { errorDishDetails && <Message variant='danger'>{errorDishDetails}</Message> }
                <Form onSubmit={editDishHandler}>
                    <Form.Group className='mb-2'>
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Description/Ingredients</Form.Label>
                            <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description for your dish" style={{ height: '70px' }} />
                        </Form.Group>
                    <Row className="mb-2">
                        <Form.Group as={Col}>
                            <Form.Label>Select Dish Type</Form.Label>
                            <Form.Control as='select' value={type} onChange={(e) => setType(e.target.value)} required >
                                <option>Select Type</option>
                                <option value='Veg'>Veg</option>
                                <option value='Non Veg'>Non Veg</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Min Order Value" required />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-4">
                        <Form.Label>Upload Image</Form.Label><br></br>
                        <Form.Control type="file" id='image-file' onChange={uploadFileHandler} />
                        { uploading && <Loader /> }
                    </Form.Group>
                                
                    <Button className='mb-4' variant='outline-success' type='submit'>
                        { loading ? 'Loading…' : 'Submit' }
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default EditDishScreen
