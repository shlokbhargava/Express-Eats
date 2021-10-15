import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import Progress from '../components/Progress'

const PaymentScreen = ({ history }) => {
    const [paymentMethod, setPaymentMethod] = useState('')

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/revieworder')
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    },[userInfo, history])

    return (
        <>
            <Progress step2 step3 />   
            <Container className='mt-3 justify-content-center'>
                <h2>Payment Method</h2>
                <Form onSubmit={submitHandler}>
                    <fieldset className="form-group mb-2">
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios" value='Razorpay' onChange={(e) => setPaymentMethod(e.target.value)}></input>
                            Pay with Razorpay
                            </label>
                        </div> 
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios" value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></input>
                            Stripe
                            </label>
                        </div> 
                        <div className="form-check">
                            <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="optionsRadios" value='Cash on Delivery' disabled={restaurantInfo.cod} onChange={(e) => setPaymentMethod(e.target.value)}></input>
                            Cash on Delivery
                            </label>
                        </div> 
                    </fieldset>
                    <Button variant="secondary" onClick={submitHandler}>
                        Review Order
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default PaymentScreen
