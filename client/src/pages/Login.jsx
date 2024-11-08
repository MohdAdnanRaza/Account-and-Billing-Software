// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate, useNavigation } from "react-router-dom";
// import brandLogo from "../assets/KSpl.png";
// import { post } from "../services/ApiEndpoint";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// const Login = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(email, password);
//     try {
//       const request = await post("api/auth/login", { email, password });

//       const response = request.data;
//       //localStorage.setItem("token", response.data.token);
//       //localStorage.setItem("salesmanName", response.data.salesmanName);
//       if (request.status == 200) {
//         if (response.user.role == "admin") {
//           navigate("/admin");
//         } else if (response.user.role == "salesman") {
//           navigate("/salesman");
//         } else if (response.user.role == "supervisor") {
//           navigate("/supervisor");
//         }

//         toast.success(response.message);
//         dispatch(SetUser(response.user));
//       }
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <div className="login-container">
//         <h2>Login</h2>
//         <img src={brandLogo} alt="BrandLogo" className="brand-logo" />
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="Email">Email</label>
//             <input
//               type="email"
//               name=""
//               id="email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name=""
//               id="password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit">Login</button>
//           <p className="register-link">
//             Forget Password? <Link to={"/"}>Reset Password</Link>
//           </p>
//           <p className="register-link">
//             Not registered? <Link to={"/register"}>Register here</Link>
//           </p>
//           <div className="social-login">
//             <p>Or login with:</p>
//             <button className="social-button google">Login with Google</button>
//             <button className="social-button facebook">
//               Login with Facebook
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };
// export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import brandLogo from "../assets/KSpl.png";
// import { post } from "../services/ApiEndpoint";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { SetUser } from "../redux/AuthSlice";

// const Login = () => {
//   const dispatch = useDispatch();
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const request = await post("api/auth/login", { email, password });
//       const response = request.data;

//       if (request.status === 200) {
//         // Store token and salesman data in local storage
//         localStorage.setItem("token", response.token);
//         localStorage.setItem("salesmanName", response.user.name); // Store the salesman name
//         localStorage.setItem("salesmanRole", response.user.role); // Store the role

//         // Navigate based on the role
//         if (response.user.role === "admin") {
//           navigate("/admin");
//         } else if (response.user.role === "salesman") {
//           navigate("/salesman");
//         } else if (response.user.role === "supervisor") {
//           navigate("/supervisor");
//         }

//         toast.success(response.message);
//         dispatch(SetUser(response.user));
//       }
//     } catch (error) {
//       toast.error("Login failed! Please check your credentials.");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <img src={brandLogo} alt="BrandLogo" className="brand-logo" />
//       <form onSubmit={handleSubmit}>
//         <div className="input-group">
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="text"
//             id="phone "
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//         <p className="register-link">
//           Forget Password? <Link to={"/"}>Reset Password</Link>
//         </p>
//         <p className="register-link">
//           Not registered? <Link to={"/register"}>Register here</Link>
//         </p>
//         <div className="social-login">
//           <p>Or login with:</p>
//           <button className="social-button google">Login with Google</button>
//           <button className="social-button facebook">
//             Login with Facebook
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "../assets/KSpl.png";
import { post } from "../services/ApiEndpoint";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("api/auth/login", { phone, password });
      const response = request.data;

      if (request.status === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("salesmanName", response.user.name);
        localStorage.setItem("salesmanRole", response.user.role);

        if (response.user.role === "admin") {
          navigate("/admin");
        } else if (response.user.role === "salesman") {
          navigate("/salesman");
        } else if (response.user.role === "supervisor") {
          navigate("/supervisor");
        }

        toast.success(response.message);
        dispatch(SetUser(response.user));
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <img src={brandLogo} alt="BrandLogo" className="brand-logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p className="register-link">
          Forget Password? <Link to={"/"}>Reset Password</Link>
        </p>
        {/* <p className="register-link">
          Not registered? <Link to={"/register"}>Register here</Link>
        </p> */}
      </form>
    </div>
  );
};

export default Login;
