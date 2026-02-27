import { useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LandingPage from "./pages/LandingPage";
import BookingPage from './pages/BookingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export function Login({togglelogin,togglesignup}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = { email, password }
    console.log("Login Data:", formData)

    // Connect to backend here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted z-15">
      <Card className="w-full max-w-md">
        <CardHeader>
        <Button className="relative"
              variant="ghost"
              size="icon"
              onClick={togglelogin
              }
            ><X /></Button>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              <Button className="relative"
              variant="outline"
              onClick={togglesignup
              }
            >Sign Up</Button>
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Signup({togglesignup}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    console.log("Signup Data:", form)

    // Connect to backend here
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
      <Button className="relative"
              variant="ghost"
              size="icon"
              onClick={togglesignup
              }
            ><X /></Button>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Fill in your details to register
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 relative">
              <Label>Password</Label>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2 relative">
              <Label>Confirm Password</Label>
              <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <div
                className="absolute right-3 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <Button className="w-full" type="submit">
              Sign Up
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


