import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import React, { useState } from 'react';



const Contact = () => {
  //  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   // Simulate form submission
  //   setTimeout(() => {
  //     toast({
  //       title: "Message sent!",
  //       description: "We'll get back to you as soon as possible.",
  //     });
  //     setIsSubmitting(false);
  //     (e.target as HTMLFormElement).reset();
  //   }, 1000);
  // };

  return (
  <div className=" min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 ">
              Get in Touch
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto ">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form 
                  // onSubmit={handleSubmit} 
                  className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Narayan Choudhary "
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Email Us</CardTitle>
                        <CardDescription>We're here to help</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a href="mailto:support@tagmaster.com" className="text-primary hover:underline">
                      support@cybez.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Go To Website</CardTitle>
                        <CardDescription>Available 9 AM - 7 PM EST</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <a href="https://www.cybez.com/" target="_blank">Click Here</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Phone Support</CardTitle>
                        <CardDescription>Monday to Friday</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a href="tel:+1234567890" className="text-primary hover:underline">
                      +1 (234) 567-890
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card bg-gradient-hero bg-primary">
                  <CardHeader>
                    <CardTitle className="text-primary-foreground">Need Help Right Away?</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Check out our documentation and FAQ for instant answers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-white text-primary hover:bg-white/90">
                       <a href="https://www.cybez.com/" target="_blank">Click Here</a>

                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
