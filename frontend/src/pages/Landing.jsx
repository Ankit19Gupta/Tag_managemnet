import { BarChart3, Shield, Sparkles, Tags, TrendingUp, Zap } from 'lucide-react';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';


const Landing = () => {

     const features = [
    {
      icon: Tags,
      title: "Smart Tagging Rules",
      description: "Automate product tagging with configurable rules for Just In, Best Seller, Limited Stock, and more."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Tags",
      description: "Let AI analyze your products and suggest high-volume search terms to boost discoverability."
    },
    {
      icon: TrendingUp,
      title: "Best Seller Tracking",
      description: "Automatically tag your top-performing products based on sales data and location filters."
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Tags are updated automatically based on inventory levels, publish dates, and sales performance."
    },
    {
      icon: Shield,
      title: "Misspelt Tag Protection",
      description: "Capture common typos and misspellings to ensure customers find what they're looking for."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track tagging performance with detailed logs, metrics, and actionable insights."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
              Automate Your Product Tagging with AI
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed ">
              Boost product discoverability and sales with intelligent, rule-based tagging for your Shopify store.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                
                <Link to="/auth">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all">
                {/* <Button >View Pricing</Button> */}
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Powerful Features for Smart Merchants</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to automate product tagging and increase conversions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-card p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/20"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-hero bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 ">
            Ready to Transform Your Store?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto ">
            Start your 15-day free trial today. No credit card required.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"> 
            {/* <Button>Get Started Free</Button> */}
            {/* <Link to="/auth">Get Started Free</Link> */}

            <Link to="/auth">Get Started </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
