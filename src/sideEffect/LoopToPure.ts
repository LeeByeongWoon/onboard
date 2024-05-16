export default function LoopToPure(start: number, end: number): number {
    if (start > end) {
        return 0;
    } else {
        return start + LoopToPure(start + 1, end);
    }
}