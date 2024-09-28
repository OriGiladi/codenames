import { Socket } from "socket.io-client"
import './Card.css'
import { Box, Image } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function UnflipedCard({clue, socket, disable, flipCard} : 
    {clue: string, socket: Socket, disable: boolean, flipCard:(clue: string, socket: Socket) => void}) {
    return (
        <div className="card-container">
            <button className="card grow unfliped btn" disabled={disable} type="button" onClick={() => {flipCard(clue, socket)}}>
                <FontAwesomeIcon icon={faCircle} className="white-circle" /> 
                <div className="card-flex">
                    <div className="reversed-card">
                        <p>{clue.toUpperCase()}</p>
                    </div>
                    <Image width={"3em"} height={'3em'} src="../../../public/navbar-img.png"/>
                </div>
                
                <Box width={'80%'} pt={1}  backgroundColor={'white'} className="card-main">
                    <p>{clue.toUpperCase()}</p>
                </Box>
            </button>
        </div>
        
    )
}
export default UnflipedCard