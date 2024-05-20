//use for Statement
export const customMapUseForStatement = <A, B>(array: Array<A>, f: (a: A) => B): Array<B> => {
    const result: B[] = [];
    for (const value of array) {
        result.push(f(value));
    }
    return result;
};

//use recursion expression
export const customMapUseForRecursion = <A, B>(array: Array<A>, f: (a: A) => B): Array<B> => {
    // base case: if the array is empty, return an empty array
    if (array.length === 0) {
        return [];
    } else {
        // recursive case: apply f to the first element and concatenate it with the result of mapping over the rest of the array
        return [f(array[0])].concat(customMapUseForRecursion(array.slice(1), f));
    }
};
