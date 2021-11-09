import {useState, useEffect} from 'react'

//Components
import Item from './Item/Item'
import Cart from './Cart/Carts'
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//json
import productsData from './products-data.json'

// Styles
import { Wrapper } from './App.styles';
import {Button} from "@material-ui/core";

// Types
export type CartItemType = {
    id: number;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
    like?:boolean;
};



const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(():CartItemType[] => {
        const localData =
            localStorage.getItem('cart');
        return localData !== null
            ? JSON.parse(localData)
            : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems] );

    const [searchVal, setSearchVal] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<CartItemType[]>(productsData);

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType, count: number = 1, likeStatus:boolean = false) => {
        setCartItems(prev => {
            // Check if the item already added in the cart
            const isItemInCart = prev.find(item => item.id === clickedItem.id);

            if (isItemInCart) {
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount + count }
                        : item
                );
            }
            // First time the item is added
            return [...prev, { ...clickedItem, amount: count, like: likeStatus }];
        });
    };

    const handleRemoveFromCart = (id: number, removeAll = false) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    //Check if is the last item or if ask to remove
                    if (item.amount === 1 || removeAll) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };



    const updateFavorites = (id: number, status = false) => {
        setCartItems(prev =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    return [...ack, { ...item, like: item.like = status }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    const searchProductsData = (searchText: string) => {
        setSearchVal(searchText);
        const text = searchText.toLocaleLowerCase();
        if(searchText){
            const productDataFilter = productsData.filter(function (product) {
                return (product.title.toLocaleLowerCase().indexOf(text) >= 0 || product.description.toLocaleLowerCase().indexOf(text) >= 0);
            });
            setFilteredProducts(productDataFilter);
        } else {
            setFilteredProducts(productsData);
        }
    };

  return (
    <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            <Cart
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
            />
        </Drawer>
        <Button className='sopping-cart-btn' onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                <AddShoppingCartIcon fontSize="large" />
            </Badge>
        </Button>
        <input type="text" placeholder="Search..." onChange={(e) => searchProductsData(e.target.value)}/>
        <Grid container spacing={3}>
            {filteredProducts.map((item => (
                <Grid item key={item.id} xs={12} sm={4}>
                    <Item item={item} handleAddToCart={handleAddToCart} updateFavorites={updateFavorites} />
                </Grid>
            )))}
        </Grid>
    </Wrapper>
  );
};

export default App;
