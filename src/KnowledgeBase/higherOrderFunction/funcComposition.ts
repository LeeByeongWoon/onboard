export function addTomato() {
    return 7000;
}

export function addOrange() {
    return 15000;
}

export function addApple() {
    return 10000;
}

// 모든 반환 값(치역) 이 정의 되어 있으므로, total function 임 (전 함수)
export function totalFunction(name: string): number {
    if (name === 'tomato') {
        return 7000;
    } else if (name === 'apple') {
        return 10000;
    } else if (name === 'orange') {
        return 15000;
    }
    return 0;
}

// 모든 반환 값(치역)이 정의 되어 있지 않으므로 partial function 임 (부분 함수)
export function partialFunction(name: string): number | undefined {
    if (name === 'tomato') {
        return 7000;
    } else if (name === 'apple') {
        return 10000;
    } else if (name === 'orange') {
        return 15000;
    }
}

function isExpensive(price: number | undefined): boolean {
    if (!price) return false;
    return price >= 10000;
}

export function isExpensivePrice(name: string): boolean {
    return isExpensive(partialFunction(name));
}

//<A,B,C>((B) => C, (A) => B) => (A) => C
export const compose =
    <A, B, C>(g: (y: B) => C, f: (s: A) => B) =>
    (x: A) =>
        g(f(x));

const compute = compose(isExpensive, partialFunction);

console.log(compute('orange'));

export const main = () => isExpensivePrice('tomato');

export function compose2<T, R>(fn1: (a: T) => R): (a: T) => R;
export function compose2<T1, T2, R>(fn1: (a: T2) => R, fn2: (a: T1) => T2): (a: T1) => R;
export function compose2<T1, T2, T3, R>(fn1: (a: T3) => R, fn2: (a: T2) => T3, fn3: (a: T1) => T2): (a: T1) => R;

export function compose2(...fns: Array<(...args: unknown[]) => unknown>) {
    return fns.reduce(
        (f, g) =>
            (...args: unknown[]) =>
                f(g(...args))
    );
}
