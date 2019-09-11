import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();  // whenever creates, it comes with 2 components -> "Provider" & "Consumer"

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpened: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        })
    }

    getItem = id => this.state.products.find(i => i.id == id);

    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        });
    }

    addToCart = (id) => {
        console.log(`adding to cart.id is ${id}`);
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;


        this.setState(
            () => {
                return {
                    products: tempProducts,
                    cart: [...this.state.cart, product]
                }
            },
            () => {
                this.addTotals();
            });
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpened: true }
        });
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpened: false }
        });
    }

    increment = id => {
        const product = this.getItem(id);
        console.log("this is increment");
    }

    decrement = id => {
        console.log("this is decrement");
    }

    removeItem = id => {
        console.log("this is removeItem");
    }

    clearCart = () => {
        this.setState(
            () => {
                return { cart: [] };
            }, () => {
                this.setProducts();
                this.addTotals();
            })

    }

    addTotals = () => {
        let subTotal = 0;
        let tempCart = [...this.state.cart];
        this.state.cart.map(product => (subTotal += product.total));
        const tempTax = subTotal * 0.1;    //10% tax static
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;

        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
        })
    }

    render() {
        return (

            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    closeModal: this.closeModal,
                    openModal: this.openModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart
                }}>

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };