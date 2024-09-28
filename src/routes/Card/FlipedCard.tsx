import { Box, Image } from "@chakra-ui/react"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Socket } from "socket.io-client"
import { team } from "../../utils/types"

function FlipedCard({ clue, socket, cardStyle, flipCard }: 
    { clue: string, socket: Socket, cardStyle: team, flipCard: (clue: string, socket: Socket) => void }) {
    return (
        <div className={`card-container ${cardStyle}`}>
            <button className={`btn card grow unfliped ${cardStyle}`} disabled={true} onClick={() => { flipCard(clue, socket) }}>
                <FontAwesomeIcon icon={faCircle} className="white-circle" />

                <div className="card-flex">
                    <div className={`reversed-card ${cardStyle}`}>
                        <p>{clue.toUpperCase()}</p>
                    </div>
                    <Image width={"3em"} height={'3em'} src="../../../public/navbar-img.png" style={{ marginLeft: '1em' }} />
                </div>

                <Box width={'80%'} pt={1} color={'#181C14'} backgroundColor={'#FAF7F0'} className="card-main">
                    <p>{clue.toUpperCase()}</p>
                </Box>
            </button>
        </div>
    )
}

export default FlipedCard
