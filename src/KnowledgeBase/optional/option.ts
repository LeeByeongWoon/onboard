export enum tag {
    SOME = 'Some',
    NONE = 'None',
}

export type Some<A> = Readonly<{
    _tag: tag.SOME;
    value: A;
}>;

export type None = Readonly<{
    _tag: tag.NONE;
}>;

export type Option<A> = Some<A> | None;

export const some = <A>(value: A): Option<A> => ({ _tag: tag.SOME, value });

export const none = (): Option<never> => ({ _tag: tag.NONE });

export const isSome = <A>(oa: Option<A>): oa is Some<A> => oa._tag === 'Some';

export const isNone = <A>(oa: Option<A>): oa is None => oa._tag === 'None';

export const toOption = <A>(a: A | undefined): Option<A> => (a ? some(a) : none());

export const getOrElse = <A>(oa: Option<A>, defaultValue: A): A => {
    return isSome(oa) ? oa.value : defaultValue;
};

export const optionMap = <A, B>(oa: Option<A>, f: (a: A) => B): Option<B> => (isSome(oa) ? some(f(oa.value)) : none());

export const mapOrElse = <A, B>(oa: Option<A>, f: (a: A) => B, defaultValue: B): B => getOrElse(optionMap(oa, f), defaultValue);
