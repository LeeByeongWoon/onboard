// (Array<A>, A => B) => Array<B>
export type CustomMapType<A, B> = (xs: Array<A>, f: (x: A) => B) => Array<B>;

// (Array<number>, number => string) => Array<string>
export type MapType1 = CustomMapType<number, string>;

// (B => C, A => B) => (A) => C
// A => B(f 함수의 치역 => g 함수의 정의역) => C
export type Compose<A, B, C> = (g: (y: B) => C, f: (x: A) => B) => (a: A) => C;

// (number => boolean, string => number) => (string) => boolean
export type Compose1 = Compose<string, number, boolean>;
