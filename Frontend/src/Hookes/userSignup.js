import { useState } from 'react';
import toast from 'react-hot-toast';
import { BaseUrl } from '../componentes/BaseUrl.js';
import { useAuthContext } from '../Context/authContext.jsx';

const userSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext()

  const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
    const success = handleInputError({ fullname, username, password, confirmpassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`${BaseUrl}/api/auth/singup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, confirmpassword, gender }),
        credentials: 'include'
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Singup successfully")
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthuser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default userSignup;

function handleInputError({ fullname, username, password, confirmpassword, gender }) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill all fields");
    return false;
  }
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must contain at least 6 characters");
    return false;
  }

  return true;
}
