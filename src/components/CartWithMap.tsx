import styles from '@/components/cart.module.css';
import * as T from '@/KnowledgeBase/errorHandling/error1.ts';
import * as O from '@/KnowledgeBase/optional/option.ts';
import { mapOrElse } from '@/KnowledgeBase/optional/option.ts';
import { CART_DATA, CartItem } from '@/mock/cartData.ts';
/*
    아이템 목록 화면
    - 재고가 있는 아이템
    - 재고가 없는 아이템
 */

type ParsedItem = { _tag: 'parsedItem' } & CartItem;
type ParseError = {
    name: string;
    message: string;
};
type ArrayItem = T.Try<ParseError, ParsedItem>[];

const parseItem = (item: CartItem): T.Try<ParseError, ParsedItem> => {
    if (item.quantity < 1) {
        return T.failed({
            name: item.name,
            message: '상품은 반드시 한 개 이상 담아야 합니다.',
        });
    } else if (item.quantity > 10) {
        return T.failed({
            name: item.name,
            message: '한번에 10개를 초과하여 구매할 수 없습니다.',
        });
    }
    return T.success({
        _tag: 'parsedItem',
        ...item,
    });
};

const parsedList = CART_DATA.map(parseItem);

const discount = <T,>(price: T | undefined, defaultValue: T) => {
    return O.getOrElse(O.toOption(price), defaultValue);
};

const discountText = <T,>(price: T | undefined) => mapOrElse(O.toOption(price), (discount: T) => `(${discount}원 할인)`, '');

const errorItem = (item: ParseError) => (
    <li key={item.name} style={{ color: 'red' }}>
        <h2 style={{ display: 'contents' }}>{item.name}</h2>
        <div>{item.message}</div>
    </li>
);
const Item = (item: ParsedItem) => {
    const discountPrice = discountText(item.discountPrice);
    return (
        <li className={item.outOfStock ? styles.outOfStock : undefined} key={item.code}>
            <h2 style={{ display: 'contents' }}>
                {item.name} {item.outOfStock && '(품절)'}
            </h2>
            <div>
                가격 {item.price - discount(item.discountPrice, 0)}원 {item.discountPrice && discountPrice}
            </div>
            <div>수량 {item.quantity}상자</div>
        </li>
    );
};

const StockItem = (item: CartItem) => {
    const parsedItem = parseItem(item);
    const render = T.tryMap(parsedItem, Item);
    return T.getOrElse(render, errorItem);
};

const itemPrice = (prev: number, current: CartItem) => {
    const discountPrice = discount(current.discountPrice, 0);
    return prev + (current.price - discountPrice) * current.quantity;
};

const itemCount = (prev: number, current: CartItem) => {
    return prev + current.quantity;
};

const isNotOutOfStock = (item: CartItem) => !item.outOfStock;
const isDiscountPrice = (item: CartItem) => Object.hasOwn(item, 'discountPrice');
const isNotCauseError = (item: CartItem) => {
    try {
        parseItem(item);
        return true;
    } catch {
        return false;
    }
};

const SumComponent = (list: ArrayItem, f: (prev: number, current: CartItem) => number, label: string) => {
    return (
        <>
            {label}: {T.keepSuccess(list).filter(isNotOutOfStock).reduce(f, 0)}
        </>
    );
};

const totalDiscountPrice = (cartData: ArrayItem) => {
    const calcDisCount = (previousValue: number, currentValue: ParsedItem) =>
        previousValue + (currentValue.discountPrice ?? 0) * currentValue.quantity;

    const discountPrice = T.keepSuccess(cartData)
        .filter(isNotOutOfStock)
        .filter(isDiscountPrice)
        .filter(isNotCauseError)
        .reduce(calcDisCount, 0);
    return `(${discountPrice}원 할인)`;
};

const TotalComponent = (list: ArrayItem) => {
    const TotalCount = SumComponent(list, itemCount, '전체 수량');
    const TotalPrice = SumComponent(list, itemPrice, '전체 가격');
    const disCountPrice = totalDiscountPrice(parsedList);
    return (
        <>
            {TotalCount}
            <br />
            {TotalPrice}
            {disCountPrice}
        </>
    );
};

const List = (list: ArrayItem) =>
    list.map((item) =>
        T.getOrElse(
            T.tryMap(item, (parseItem) => StockItem(parseItem)),
            errorItem
        )
    );

export function CartWithMap() {
    return (
        <>
            <h1>장바구니</h1>
            {...List(parsedList)}
            <br />
            {TotalComponent(parsedList)}
        </>
    );
}
