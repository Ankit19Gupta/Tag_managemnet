import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
   const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "15 days",
      description: "Perfect for testing and small stores",
      features: [
        "Up to 50 products",
        "All tagging rules",
        "Basic analytics",
        "Email support",
        "No credit card required"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Starter",
      price: "$19",
      period: "per month",
      description: "Ideal for growing stores",
      features: [
        "Up to 50 products",
        "All tagging rules",
        "Advanced analytics",
        "Priority email support",
        "AI tag suggestions",
        "Custom rule scheduling"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "For established businesses",
      features: [
        "Unlimited products",
        "All tagging rules",
        "Advanced analytics & reporting",
        "Priority support + live chat",
        "Unlimited AI suggestions",
        "Custom rule scheduling",
        "API access",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
     <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Choose the perfect plan for your store. Start with a 15-day free trial.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 ">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`shadow-card hover:shadow-card-hover transition-all duration-300 bg-gray-400${
                    plan.popular ? "border-primary border-2 relative" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold ">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                      <Link to="/auth">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans later?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">What happens after the free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    After your 15-day trial, you can choose to continue with a paid plan or your account will be paused.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! We offer a 30-day money-back guarantee if you're not satisfied with our service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Pricing;
