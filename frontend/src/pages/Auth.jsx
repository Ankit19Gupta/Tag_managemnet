import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tags, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/auth";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log("Login: ", data);
      localStorage.setItem("token", data.token);

      toast.success("Login successful! Redirecting...");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      toast.success("Account created successfully! Please sign in now.");

      setActiveTab("login");

      e.target.reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-2xl text-primary-foreground "
          >
            <Tags className="w-8 h-8" />
            <span>TagMaster</span>
          </Link>
        </div>

        <Card className="shadow-card-hover">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4 text-gray-500 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500 cursor-pointer" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading && activeTab === "login"
                      ? "Authenticating..."
                      : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="abc xyz"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        minlength="6"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4 text-gray-500 cursor-pointer" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500 cursor-pointer" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading && activeTab === "signup"
                      ? "Creating account..."
                      : "Start Free Trial"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    15-day free trial • No credit card required
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-4 text-center ">
          <Link to="/" className="text-sm text-black">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
