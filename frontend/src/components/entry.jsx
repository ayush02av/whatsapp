import { useContext, useState } from "react"
import AppContext from "../context"
import { deleteCookie, setCookie } from "../utilities/cookies"

function Entry() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { setUser } = useContext(AppContext)

    async function HandleSubmit() {
        const response = await fetch('http://localhost:3000/auth/entry/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (response.ok) {
            const data = await response.json();

            setUser(data.user);
            setCookie('jwt', data.token)
            setCookie('user', JSON.stringify(data.user))
        } else {
            setUser(null);
            deleteCookie('jwt')
            deleteCookie('user')
        }
    }

    return (
        <div
            className="bg-[#F7F7F6] border-[#D8D9D9] w-[60vw] h-[60vh] mx-[20vw] my-[15vh] py-5 border-2 rounded-lg text-center"
        >
            <h1 className="text-2xl font-bold my-10">Welcome to Core Chat</h1>
            <input
                type="text"
                placeholder="Email"
                className="block border outline-none rounded w-[45%] mx-[27.5%] my-5 p-2"
                value={email}
                onChange={function (e) { e.preventDefault(); setEmail(e.target.value) }}
            />
            <input
                type="password"
                placeholder="Password"
                className="block border outline-none rounded w-[45%] mx-[27.5%] my-5 p-2"
                value={password}
                onChange={function (e) { e.preventDefault(); setPassword(e.target.value) }}
            />
            <button
                className="p-5"
                onClick={HandleSubmit}
            >
                Enter
            </button>
        </div >
    )
}

export default Entry