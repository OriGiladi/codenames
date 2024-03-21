function FlipedCard({clue, cardStyle, flipCard} : 
    {clue: string, cardStyle: { backgroundColor: string }, flipCard: (clue: string) => void}) {
    return (
        <div className="card grow" style={cardStyle}>
                <button disabled type="button" className="btn btn-secondary card-button" 
                onClick={() => {flipCard(clue)}}>
                    <strong> {clue} </strong>
                </button>
        </div>
    )
}
export default FlipedCard