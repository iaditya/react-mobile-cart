import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();  // whenever creates, it comes with 2 components -> "Provider" & "Consumer"

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct: detailProduct
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
    }

    render() {
        return (

            <ProductContext.Provider
                value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart }}>

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };