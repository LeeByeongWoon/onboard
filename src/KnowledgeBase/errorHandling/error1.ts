const tenDivideByWithThrow = (n: number): number => {
    if (n === 0) {
        // 예외를 발생 시켜도 return 값이 number 임
        throw new Error('0으로 나눌 수 없습니다.');
    }
    return 10 / n;
};

export const tenDivideByTest = () => {
    // try 블록 밖으로 코드를 옮길 경우 동작이 달라지므로 순수하지 않음
    try {
        return tenDivideByWithThrow(0);
    } catch (e) {
        return 1;
    }
};

type Success<R> = {
    readonly _tag: 'success';
    readonly result: R;
};

type Failed<E> = {
    readonly _tag: 'failed';
    readonly error: E;
};

export type Try<E, R> = Failed<E> | Success<R>;

export const success = <R>(result: R): Try<never, R> => ({
    _tag: 'success',
    result,
});

export const failed = <E>(error: E): Try<E, never> => ({
    _tag: 'failed',
    error,
});

export const isSuccess = <R>(ta: Try<unknown, R>): ta is Success<R> => ta._tag === 'success';
export const isFailed = <E>(ta: Try<E, unknown>): ta is Failed<E> => ta._tag === 'failed';
export const getOrElse = <E, R>(ta: Try<E, R>, defaultValue: (e: E) => R): R => {
    //error 발생 시 기본 값 사용,
    if (isFailed(ta)) return defaultValue(ta.error);
    //결과가 성공이면 해당 값 사용.
    return ta.result;
};

export const tryMap = <E, A, B>(ta: Try<E, A>, f: (a: A) => B): Try<E, B> => {
    if (isFailed(ta)) return ta;
    return success(f(ta.result));
};

// Array<T.Try<ParseError, ParsedItem>> => Array<ParsedItem>
// 선언적 방식
export const keepSuccess = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
    return tas.flatMap((ta) => (isSuccess(ta) ? [ta.result] : [])); // 가독성은 좀 떨어지나 성능에 이점이 있음.
    // return tas.filter(isSuccess).map((item) => item.result); //가독성이 높으나 배열 두번 순환으로 성능 이슈.
};

//명령적 방식
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keepSuccessWithFor = <E, R>(tas: Array<Try<E, R>>): Array<R> => {
    const arr: Array<R> = [];
    for (const ta of tas) {
        if (isSuccess(ta)) {
            arr.push(ta.result);
        }
    }
    return arr;
};

// flat :: Try<E,Try<E, A>> => Try<E, A>
const flat = <E, A>(tta: Try<E, Try<E, A>>): Try<E, A> => {
    if (tta._tag === 'success') return tta.result;
    return tta;
};

export const tryFlatMap = <E, A, B>(ta: Try<E, A>, f: (a: A) => Try<E, B>): Try<E, B> => {
    return flat(tryMap(ta, f));
};
