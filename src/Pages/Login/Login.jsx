import { useState , useEffect } from "react";
import { loginUser , reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user , isSuccess} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: "", 
        password: ""
    });

    const { email, password } = formData;

    useEffect(() => {

      if (isSuccess) {
          navigate("/dashboard")
          dispatch(reset())
      }

  }, [isSuccess, user, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const dataToSubmit = {
           
          email,
          password,
      };
      
      dispatch(loginUser(dataToSubmit)); 
     
  };
    return (
        <div className="container">
            <h1 className="heading center">Login</h1>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={handleChange} 
                            required // Yêu cầu nhập
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={handleChange} 
                            required // Yêu cầu nhập
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;