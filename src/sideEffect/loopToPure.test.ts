import LoopToPure from "./LoopToPure.ts";


describe('sumInRange', () => {
    test('calculates the sum of numbers within a range', () => {
        expect(LoopToPure(1, 5)).toEqual(15);
        expect(LoopToPure(1, 1)).toEqual(1);
        expect(LoopToPure(5, 5)).toEqual(5);
        expect(LoopToPure(1, 0)).toEqual(0);
    });
});