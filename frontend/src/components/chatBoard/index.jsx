import Contacts from "./contacts"
import ChatBox from "./chatBox"

function ChatBoard() {
    return (
        <div className="h-full pt-8 pb-5 grid grid-cols-4">
            <Contacts />
            <ChatBox />
        </div>
    )
}

export default ChatBoard