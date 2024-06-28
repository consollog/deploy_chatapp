import React, { useState } from 'react'
import { useAuthContext } from '../Context/authContext'
import { BaseUrl } from '../componentes/BaseUrl'
import toast from 'react-hot-toast'

const userLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthuser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${BaseUrl}/api/auth/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success("Logout successfully")
            localStorage.removeItem("chat-user")
            setAuthuser(null)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return { loading, logout }
}

export default userLogout
