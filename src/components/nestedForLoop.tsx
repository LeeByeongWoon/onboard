const suits = ['♠', '♥', '♣', '♦'];
const numbers = Array(9)
    .fill(null)
    .map((_, index) => index + 2);
const cardNumbers = [...numbers, 'A', 'J', 'Q', 'K'];

const cards: Array<string> = [];
for (const suit of suits) {
    for (const number of cardNumbers) {
        cards.push(suit + number);
    }
}

export function NestedForLoop() {
    return (
        <>
            <h1>cards</h1>
            <pre>
                {suits.flatMap((suit) =>
                    cardNumbers.map((number) => (
                        <div key={suit + number}>
                            <div style={{ color: ['♦', '♥'].includes(suit) ? 'red' : 'black' }}>{suit + number}</div>
                            <br />
                        </div>
                    ))
                )}
            </pre>
        </>
    );
}
