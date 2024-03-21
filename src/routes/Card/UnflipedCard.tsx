function UnflipedCard({clue, disable, flipCard} : 
    {clue: string, disable: boolean, flipCard:(clue: string) => void}) {
    return (
        <div className="card grow ">
                <button disabled={disable} type="button" className="btn btn-secondary card-button" 
                onClick={() => {flipCard(clue)}}>
                    <strong> {clue} </strong>
                </button>
        </div>
    )
}
export default UnflipedCard