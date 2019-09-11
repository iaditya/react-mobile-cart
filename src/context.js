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
        let tempCart = [...this.state.cart];

        const index = tempCart.indexOf(tempCart.find(item => item.id === id));
        const product = tempCart[index];
        const price = product.price;
        product.count++;
        product.total += price;

        this.setState(
            () => {
                return { cart: [...tempCart] }
            },
            () => {
                this.addTotals();
            });
    }

    decrement = id => {
        console.log("this is decrement");
    }

    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        let index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {
                product: [...tempProducts],
                cart: [...tempCart]
            }
        }, () => {
            this.addTotals();
        })
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