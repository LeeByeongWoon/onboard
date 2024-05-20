export interface CartItem {
    code: string;
    outOfStock: boolean;
    name: string;
    price: number;
    quantity: number;
}

export type CartData = CartItem[];

export const CART_DATA: CartData = [
    {
        code: 'tomato',
        outOfStock: false,
        name: '토마토',
        price: 7000,
        quantity: 2,
    },
    {
        code: 'orange',
        outOfStock: true,
        name: '오렌지',
        price: 15000,
        quantity: 3,
    },
    {
        code: 'apple',
        outOfStock: false,
        name: '사과',
        price: 10000,
        quantity: 2,
    },
];
