import { Socket } from "socket.io-client"

function FlipedCard({clue,socket, cardStyle, flipCard} : 
    {clue: string,socket: Socket, cardStyle: { backgroundColor: string }, flipCard: (clue: string, socket: Socket) => void}) {
    return (
        <div className="card grow" style={cardStyle}>
                <button disabled type="button" className="btn btn-secondary card-button" 
                onClick={() => {flipCard(clue,socket)}}>
                    <strong> {clue} </strong>
                </button>
        </div>
    )
}
export default FlipedCard