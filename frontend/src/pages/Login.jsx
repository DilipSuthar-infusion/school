import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import logo from '../assets/logo.jpg';



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:2000/api/auth/login", {
        email,
        password,
      });

      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/admin");
      else if (role === "student") navigate("/student/dashboard");
      else if (role === "teacher") navigate("/teacher/dashboard");
      else if (role === "parent") navigate("/parent/dashboard");

      alert("Login successful");
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
        <Col md={6} className="p-4 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Logo" style={{ width: '100px' }} className="mb-3" />
          <h5 className="text-center mt-3">"Empowering Minds, Shaping Futures."</h5>
        </Col>

        {/* Right side */}
        <Col md={6} className="p-4 d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <h3 className="mb-2 text-center fw-bold">Sign in to your account</h3>
            <p className="text-muted text-center mb-4">Login with your credentials</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control className="border-warning"
                  type="email"
                  placeholder="demo@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                      className="border-warning"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
              </Form.Group>

              <Form.Group className="mb-3 d-flex justify-content-between align-items-center">
                <Form.Check label="Remember me" />
              </Form.Group>

              <Button type="submit" className="w-100 btn btn-primary" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
          </div>
        </Col>
      </Card>
    </Container>
  );
}
