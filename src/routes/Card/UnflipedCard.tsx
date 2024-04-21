import { Socket } from "socket.io-client"

function UnflipedCard({clue, socket, disable, flipCard} : 
    {clue: string, socket: Socket, disable: boolean, flipCard:(clue: string, socket: Socket) => void}) {
    return (
        <div className="card grow ">
                <button disabled={disable} type="button" className="btn btn-secondary card-button" 
                onClick={() => {flipCard(clue, socket)}}>
                    <strong> {clue} </strong>
                </button>
        </div>
    )
}
export default UnflipedCard