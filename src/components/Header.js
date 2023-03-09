import React from 'react';
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();
  return (
    <Navbar bg='dark' variant='dark' style={{height: 80}}>
      <Container>
        <Navbar.Brand>
           <Link to="/">Shopping Cart </Link> 
        </Navbar.Brand>
        <Navbar.Text className='search'>
            <FormControl 
                style={{width: 500}}
                placeholder='Search for a product'
                className='m-auto'
                onChange={(e) => productDispatch({type: 'FILTER_BY_SEARCH', payload: e.target.value})}
            />
        </Navbar.Text>
        <Nav>
            <Dropdown className='dropdown'>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaShoppingCart  color="white" fontSize="25px"/>
                    <Badge bg='black'>{cart.length}</Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{minWidth: 270}}>
                    {cart.length > 0 ? (
                      <>
                        {
                          cart.map((prod) => (
                            <span key={prod.id} className="cartitem">
                              <img src={prod.image} alt={prod.name} className='cartItemImg' />
                              <div className='cartItemDetail'>
                                <span>{prod.name}</span>
                                <span>Rs. {prod.price.split(".")[0]}</span>
                              </div>
                              <AiFillDelete 
                                fontSize="20px"
                                style={{cursor: "pointer"}}
                                onClick={() =>
                                  dispatch({
                                    type: 'REMOVE_FROM_CART',
                                    payload: prod,
                                  })
                                }
                              />
                            </span>
                          ))
                        }
                        <Link to = "/cart">
                          <Button style = {{width: "95%" , margin: "0 10px"}}>
                            Go to Cart
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <span style={{padding: 10}}>Cart is empty</span>
                    )}       
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
