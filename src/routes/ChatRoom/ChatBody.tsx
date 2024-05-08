import { useNavigate } from 'react-router-dom';
import rootStore from "../../rootStore";
import { Message } from '../../utils/types';
const { userStore } = rootStore

const ChatBody = ( { messages } : { messages: Message [] }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((message) =>
                    message.roomId === userStore.chatRoomId  ? ( // Check if the message belongs to the current room
                        message.name === userStore.userName ? (
                            <div className="message__chats" key={message.id}>
                                <p className="sender__name">You</p>
                                <div className="message__sender">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="message__chats" key={message.id}>
                                <p>{message.name}</p>
                                <div className="message__recipient">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        )
                    ) : null
                )}
            </div>
            <div className="message__status">
                <p>Someone is typing...</p>
            </div>
        </>
    );
};

export default ChatBody;