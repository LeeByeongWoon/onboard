import { CART_DATA } from '@/mock/cartData.ts';
import { ReactElement } from 'react';
import styles from './cart.module.css';

export default function CartWithForStatement() {
    const list = () => {
        const li: ReactElement[] = [];
        let totalCount = 0;
        let totalPrice = 0;
        //리스트 표시
        for (let i = 0; i < CART_DATA.length; i++) {
            const htmlData = (
                <li key={i} className={`${CART_DATA[i].outOfStock && styles.outOfStock}`}>
                    <h2 style={{ display: 'contents' }}>
                        {CART_DATA[i].name} {CART_DATA[i].outOfStock && '(품절)'}
                    </h2>
                    <div>가격 {CART_DATA[i].price}원</div>
                    <div>수량 {CART_DATA[i].quantity}상자</div>
                </li>
            );
            li.push(htmlData);
        }
        // 총 개수
        for (let i = 0; i < CART_DATA.length; i++) {
            if (!CART_DATA[i].outOfStock) {
                totalCount += CART_DATA[i].quantity;
            }
        }
        // 총 가격
        for (let i = 0; i < CART_DATA.length; i++) {
            if (!CART_DATA[i].outOfStock) {
                totalPrice += CART_DATA[i].price * CART_DATA[i].quantity;
            }
        }
        return (
            <>
                {li}
                <br />
                전체 수량: {totalCount}
                <br />
                전체 가격: {totalPrice}
            </>
        );
    };

    return (
        <>
            <h1>장바구니</h1>
            {list()}
        </>
    );
}
