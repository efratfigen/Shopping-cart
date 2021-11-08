import {useState} from 'react'
import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './Item.styles';

type Properties = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType, count: number) => void;
};



const Item: React.FC<Properties> = ({ item, handleAddToCart }) => {
    const [count, setCount] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    return(
    <Wrapper>
        <div className='img-wrapper'>
            <img src={item.image} alt={item.title}/>
        </div>
        <div className='texts-wrapper'>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <div className='qty'>
            <Button className='qty-btn'
                size='large'
                disableElevation
                variant='contained'
                onClick={() => setCount(count - 1)}
            >
                -
            </Button>
            <p>{count}</p>
            <Button className='qty-btn'
                size='small'
                disableElevation
                variant='contained'
                onClick={() => setCount(count + 1)}
            >
                +
            </Button>
        </div>
        <Button
            className={!isAdded ? "" : "added"}
            type="button"
            onClick={() => {
                    handleAddToCart(item, count);
                    setIsAdded(true);
                    setTimeout(() => {
                        setIsAdded(false);
                    }, 3500);
                }
            }>
            {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </Button>
    </Wrapper>
    );
};

export default Item;
