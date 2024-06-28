import React, { useState } from 'react'
import { BaseUrl } from "../componentes/BaseUrl"
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/authContext'

const userLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthuser } = useAuthContext()

    const login = async (username, password) => {
        const success = handleInputError({ username, password })
        if (!success) return
        setLoading(true)
        try {
            const res = await fetch(`${BaseUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })

            const data = await res.json()
            // console.log(data)

            if (data.error) {
                throw new Error(data.error)
            }
            toast.success("Login successfully")
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthuser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

export default userLogin


function handleInputError({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill all fields");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must contain at least 6 characters");
        return false;
    }

    return true;
}