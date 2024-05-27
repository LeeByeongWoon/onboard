const tenDivideBy = (n: number): number => {
    if (n === 0) {
        // 예외를 발생 시켜도 return 값이 number 임
        throw new Error('0으로 나눌 수 없습니다.');
    }
    return 10 / n;
};

const tenDivideByTest = () => {
    try {
        return tenDivideBy(0);
    } catch (e) {
        return 1;
    }
};

console.log(tenDivideByTest());
