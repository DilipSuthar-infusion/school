import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Login() {
  const { register,trigger,formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:2000/api/auth/login", data);
  
      const { token, role } = res.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
  
      if (role === "admin") navigate("/admin");
      else if (role === "student") navigate("/student/dashboard");
      else if (role === "teacher") navigate("/teacher/dashboard");
      else if (role === "parent") navigate("/parent/dashboard");
  
     Swal.fire({
        title: 'Login Successful',
        text: 'You have successfully logged in',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="shadow-lg d-flex flex-row overflow-hidden" style={{ width: '900px', border: 'none' }}>
        
        {/* Left side */}
        <Col md={6} className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Logo" style={{ width: '100px' }} className="mb-3" />
          <h5 className="text-center mt-3">"Empowering Minds, Shaping Futures."</h5>
        </Col>

        {/* Right side */}
        <Col md={6} className="p-4 d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <h3 className="mb-2 text-center fw-bold">Sign in to your account</h3>
            <p className="text-muted text-center mb-4">Login with your credentials</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <Form onSubmit={handleSubmit(handleLogin)}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  placeholder="demo@example.com"
                  {...register("email", { 
                    required: { value: true, message: "Email is required" }, 
                    pattern: { 
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
                      message: "Invalid email address" 
                    }
                  })}
                  onBlur={() => trigger('email')} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                />
                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { 
                    required: { value: true, message: "Password is required" }, 
                    minLength: { value: 5, message: "Password must be at least 5 characters" }
                  })}
                  onBlur={() => trigger('password')} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                />
                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
              </Form.Group>

              <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <Form.Check label="Remember me" />
              </Form.Group>

              <Button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
          </div>
        </Col>
      </Card>
    </Container>
  );
}
