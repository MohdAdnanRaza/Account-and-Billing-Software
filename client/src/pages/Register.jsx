import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import brandLogo from "../assets/KSpl.png";
import { post } from "../services/ApiEndpoint";
import toast from "react-hot-toast";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("salesman");
  const [adminRegistered, setAdminRegistered] = useState(false);
  const [supervisorRegistered, setSupervisorRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRolesStatus = async () => {
      try {
        const response = await axios.get("/api/auth/check-roles");
        setAdminRegistered(response.data.adminRegistered);
        setSupervisorRegistered(response.data.supervisorRegistered);
      } catch (error) {
        console.error("Error fetching roles status:", error);
      }
    };
    fetchRolesStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("/api/auth/register", {
        name: `${firstName} ${lastName}`,
        phone,
        password,
        role,
      });
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message);
        // navigate("/"); // Redirect to login page after successful registration
        navigate("/admin/user/team");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register-container" style={{ background: "black" }}>
        <h2>Add Employee</h2>
        <img src={brandLogo} alt="BrandLogo" className="brand-logo" />
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="salesman">Salesman</option>
            <option value="admin" disabled={adminRegistered}>
              Admin
            </option>
            <option value="supervisor" disabled={supervisorRegistered}>
              Supervisor
            </option>
          </select>
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
        {/* <p className="register-link">
          Already Have Account? <Link to="/">Login here</Link>
        </p> */}
      </div>

      <style jsx>{`
        .register-container {
          width: 400px; /* Reduced width for compact appearance */
          height: 540px;
          margin: auto;
          padding: 2rem;
          position: absolute;
          top: 120%;
          left: 30%;
          bottom: 1px;

          padding-right: 3rem;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.8s ease-in-out;
        }

        .brand-logo {
          width: 80px;
          display: block;
          margin: 30px auto 1.5rem;
        }

        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.6rem;
          color: #333;
          font-weight: 600;
          position: absolute;
          top: 0.2%;
          left: 32%;
        }

        .input-group {
          margin-bottom: 1rem;
          width: 100%;
        }

        .input-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #555;
          margin-bottom: 0.3rem;
        }

        .input-group input,
        .input-group select {
          width: 100%;
          padding: 0.6rem;
          font-size: 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .input-group input:focus,
        .input-group select:focus {
          border-color: #007bff;
          box-shadow: 0px 0px 6px rgba(0, 123, 255, 0.2);
          outline: none;
        }

        .register-button {
          width: 100%;
          padding: 0.8rem;
          font-size: 1rem;
          color: #ffffff;
          background-color: #007bff;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.1s;
        }

        .register-button:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        .register-button:active {
          transform: translateY(0);
        }

        .register-link {
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .register-link a {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
        }

        .register-link a:hover {
          text-decoration: underline;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </form>
  );
};

export default Register;
