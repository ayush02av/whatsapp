import { useState } from "react";

const user = 456;

const contacts = [
    {
        id: 123,
        name: "Ayush Verma",
        last: {
            message: "Hey you up?",
            from: user,
            to: 123
        }
    },
    {
        id: 124,
        name: "John Doe",
        last: {
            message: "No no no no not right now Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quaerat rerum nam, optio magni earum quae quod accusamus facilis voluptas officiis veniam provident a odio dolorum iusto labore vitae repellat!",
            from: 124,
            to: user
        }
    }
]

function Contacts() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="mx-2 px-2">
            <input
                className="bg-[#F7F7F6] rounded border-2 border-[#D8D9D9] w-full px-5 py-2 outline-none"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={searchQuery}
                onChange={function (e) {
                    e.preventDefault()
                    setSearchQuery(e.target.value)
                }}
            />
            {contacts.map(function (contact) {
                return (
                    <div
                        key={contact.id}
                        className="border-b-2 py-2 text-sm grid grid-cols-4"
                    >
                        <img
                            src="https://ayush02av.netlify.app/assets/ayush.png"
                            alt="user-logo"
                        // TODO: make logo round and smaller
                        />
                        <div className="col-span-3">
                            <p className="font-bold">{contact.name}</p>
                            <p>
                                <span>{contact.id == contact.last.from && "You : "}</span>
                                {
                                    contact.last.message.length > 50
                                        ?
                                        contact.last.message.substring(0, 50) + "..."
                                        :
                                        contact.last.message
                                }
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Contacts