import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tags } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
    
  //   setTimeout(() => {
  //     toast({
  //       title: "Login successful",
  //       description: "Welcome back!",
  //     });
  //     navigate("/dashboard");
  //     setIsLoading(false);
  //   }, 1000);
  // };

  // const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  
  //   setTimeout(() => {
  //     toast({
  //       title: "Account created",
  //       description: "Your 15-day free trial has started!",
  //     });
  //     navigate("/dashboard");
  //     setIsLoading(false);
  //   }, 1000);
  // };
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary-foreground ">
            <Tags className="w-8 h-8" />
            <span>TagMaster</span>
          </Link>
        </div>

        <Card className="shadow-card-hover">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
         

              </TabsList>

              <TabsContent value="login">
                <form
                // onSubmit={handleLogin} 
                className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form 
                // onSubmit={handleSignup} 
                className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="abc xyz"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="signup-shop">Shopify Store URL</Label>
                    <Input
                      id="signup-shop"
                      type="text"
                      placeholder="mystore.myshopify.com"
                      required
                    />
                  </div> */}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Start Free Trial"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    15-day free trial • No credit card required
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
