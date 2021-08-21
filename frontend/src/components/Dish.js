import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dish = ({ dish }) => {

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    }    

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (

        <Card className="my-3 rounded" style={{ width: '18rem', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }} >
            <Card.Img src={dish.image} variant='top' style={{ height: '22vh' }} />

            <Card.Body>
                <Card.Title as='div'>
                    <strong style={{ fontSize: '1.3rem' }}>{dish.name}</strong>
                    { dish.type === 'Veg' ?
                        <img src='/images/veg.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Veg'></img> 
                    :
                        <img src='/images/nv.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Non Veg'></img>
                    }
                </Card.Title>

                <p>{dish.description}.</p>

                <div style={{ display: 'inline' }}>
                    <h4 className='float-start'><strong>₹{getStringPrice(dish.cost)}/-</strong></h4>
                    <span className='float-end'>
                        { userInfo && userInfo.isSeller && 
                            <>
                                <Link to={`/dish/${dish._id}/edit`} style={{ textDecoration: 'none' }}>
                                    <i className="far fa-edit fa-lg text-dark"></i>&nbsp;&nbsp;
                                </Link>
                                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                                    <i className="far fa-trash-alt fa-lg text-danger"></i>    
                                </Link>
                            </>

                        }
                        { !userInfo || (!userInfo.isSeller &&
                            <Button className='btn-sm float-end' variant='outline-warning'>Add + </Button>
                            // <>
                            //     <i type='button' className="fas fa-minus text-dark fa-lg"></i>&emsp;&emsp;
                            //     <i type='button' className="fas fa-plus text-dark fa-lg"></i>
                            // </> 
                            )
                        }
                    </span>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Dish
