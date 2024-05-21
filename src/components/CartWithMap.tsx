import styles from '@/components/cart.module.css';
import { CART_DATA, CartItem } from '@/mock/cartData.ts';
/*
    아이템 목록 화면
    - 재고가 있는 아이템
    - 재고가 없는 아이템
 */
const StockItem = (item: CartItem) => (
    <li className={item.outOfStock ? styles.outOfStock : undefined} key={item.code}>
        <h2 style={{ display: 'contents' }}>
            {item.name} {item.outOfStock && '(품절)'}
        </h2>
        <div>가격 {item.price}원</div>
        <div>수량 {item.quantity}상자</div>
    </li>
);

const itemPrice = (prev: number, current: CartItem) => {
    return prev + current.price * current.quantity;
};

const itemCount = (prev: number, current: CartItem) => {
    return prev + current.quantity;
};

const isNotOutOfStock = (item: CartItem) => !item.outOfStock;

const SumComponent = (list: CartItem[], f: (prev: number, current: CartItem) => number, label: string) => {
    return (
        <>
            {label}: {list.filter(isNotOutOfStock).reduce(f, 0)}
        </>
    );
};

const TotalCount = SumComponent(CART_DATA, itemCount, '전체 수량');
const TotalPrice = SumComponent(CART_DATA, itemPrice, '전체 가격');

const List = (cartData: CartItem[]) => cartData.map(StockItem);

export function CartWithMap() {
    return (
        <>
            <h1>장바구니</h1>
            {...List(CART_DATA)}
            <br />
            {TotalCount}
            <br />
            {TotalPrice}
        </>
    );
}
