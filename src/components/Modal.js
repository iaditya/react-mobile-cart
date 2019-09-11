import React, { Component } from 'react';
import Styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { modalOpened, closeModal } = value;
                    const { img, title, price } = value.modalProduct;
                    if (!modalOpened) {
                        return null;
                    } else {
                        return (<ModalWrapper>
                            <div className="container text-center">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-capitalize p-5">
                                        <h3>Item Added to the cart</h3>
                                        <img src={img} className="img-fluid" alt="product-img"></img>
                                        <h5>{title}</h5>
                                        <h5 className="text-muted">Price: $ {price}</h5>

                                        <Link to="/">
                                            <ButtonContainer onClick={() => closeModal()}>Store</ButtonContainer>
                                        </Link>
                                        <Link to="/cart" >
                                            <ButtonContainer cart onClick={() => closeModal()}>Go to cart</ButtonContainer>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </ModalWrapper>);
                    }
                }}
            </ProductConsumer>
        )
    }
}

const ModalWrapper = Styled.div`
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
background: rgba(0,0,0, 0.3);
display: flex;
align-items: center;
justify-content: center;
#modal {
    background: var(--mainWhite);
}
`
