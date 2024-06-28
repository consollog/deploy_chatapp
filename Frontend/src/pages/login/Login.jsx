import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userLogin from '../../Hookes/userLogin'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  const { loading, login } = userLogin()

  return (
    <div className='flex flex-col item-center justify-center min-w-96 mx-auto'>
      <div className='w-full bg-blue-400 p-6 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100'>
        <h1 className='text-3xl font-semibold text-center text-black'>Login
          <span className='text-black '> ChatApp </span>
        </h1>

        <form className='mt-5' onSubmit={handleLogin}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>
            </label>
            <input type="text" placeholder="Enter UserName" className="input w-full max-w-xs h-10  bg-gray-100"
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mt-3'>
            <label className='lable '>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10 bg-gray-100 '
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to={"/singup"} className=' hover:underline text-base text-white hover:text-blue-500 mt-2  inline-block'>
            {"Dont't"} have an account?
          </Link>
          <div><button className='text-black btn btn-block text-lg mt-2' disabled={loading}>
            {loading ? (<span className='loading loading-spinner'></span>) : "Login"}
          </button></div>
        </form>
      </div>
    </div>
  )
}

export default Login
