const delivery = (present: string, from: string) => (to: string) => {
    return `
        보내는 물건: ${present},
        보내는 사람: ${from},
        받는 사람: ${to}
    `;
};

export const momPresent = delivery('상품권', '엄마');

/*
        보내는 물건: 상품권,
        보내는 사람: 엄마,
        받는 사람: 아들
 */

//currying

const curry3params =
    <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    (a: A) =>
    (b: B) =>
    (c: C) =>
        f(a, b, c);

const curry2params =
    <A, B, C>(f: (a: A, b: B) => C) =>
    (a: A) =>
    (b: B) =>
        f(a, b);

const flip =
    <A, B, C>(f: (a: A, b: B) => C) =>
    (b: B, a: A): C =>
        f(a, b);

const curriedDelivery = curry3params(delivery);
const momPresentCurr = curriedDelivery('상품권')('엄마');
console.log(momPresentCurr('아들'));

const map = <A, B>(array: A[], f: (a: A) => B): B[] => {
    const result: B[] = [];
    for (const value of array) {
        result.push(f(value));
    }
    return result;
};
const numbers = [1, 2, 3, 4];
const isEven = (x: number) => x % 2 === 0;
map(numbers, isEven);
const curryMap = curry2params(map);
const arrayMap = curryMap(numbers)(isEven);
console.log(arrayMap);

// Array<A>.map :: Array<A> ~> (A => B) => Array<B>
numbers.map(isEven);
const flipMap = flip(map);
const flipArrayMap = curry2params(flipMap);
flipArrayMap(isEven)(numbers);
