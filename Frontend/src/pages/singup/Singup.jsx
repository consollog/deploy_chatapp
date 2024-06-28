import React, { useState } from 'react';
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import userSignup from '../../Hookes/userSignup';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmpassword: '',
    gender: ''
  });

  const { loading, signup } = userSignup();

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full bg-blue-400 p-6 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100'>
        <h1 className='text-3xl font-semibold text-center text-black'>Signup
          <span className='text-black'> ChatApp </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='Yash Soni' className='w-full input input-bordered h-10'
              value={inputs.fullname} onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Yash100ni' className='w-full input input-bordered h-10'
              value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder="*******" className='w-full input input-bordered h-10'
              value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder="*******" className='w-full input input-bordered h-10'
              value={inputs.confirmpassword} onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}
            />
          </div>

          <GenderCheckBox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

          <Link to="/login" className='hover:underline text-base text-white hover:text-blue-500 mt-2 inline-block'>
            Already have an account?
          </Link>
          <div>
            <button className='text-black btn btn-block text-lg mt-2' type="submit"
              disabled={loading}
            >
              {loading ? (<span className='loading loading-spinner'></span>) : "Sign Up"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;
