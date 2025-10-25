import Sidebar from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Download, Edit, FileText, Sparkles, Tag, Trash2, TrendingUp } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
          //  const { toast } = useToast();

  const quickActions = [
    {
      title: "Just In",
      description: "Auto-tag new products",
      icon: Tag,
      href: "/tags/just-in",
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Best Seller",
      description: "Track top performers",
      icon: TrendingUp,
      href: "/tags/best-seller",
            color: "bg-primary/10 text-primary"
      
    },
    {
      title: "Limited Units",
      description: "Low inventory alerts",
      icon: AlertCircle,
      href: "/tags/limited-units",
         color: "bg-primary/10 text-primary"

    },
     {
      title: "Misspelt Tags",
      description: "Correct the spellings",
      icon: FileText,
      href: "/tags/mis-spelt",
            color: "bg-primary/10 text-primary"

    },
    {
      title: "AI Tags",
      description: "AI-powered suggestions",
      icon: Sparkles,
      href: "/tags/ai-tags",
      color: "bg-accent/10 text-accent"
    },
  ];

  const rules = [
    { 
      name: "Just In", 
      icon: Tag, 
      // status: "active", 
      productsTagged: 127, 
      lastRun: "2 hours ago",
      frequency: "Daily",
      date: "2023-08-15"
    },
    { 
      name: "Best Seller", 
      icon: TrendingUp, 
      // status: "active", 
      productsTagged: 45, 
      lastRun: "5 hours ago",
      frequency: "Daily",
      date: "2023-08-15"
    },
    { 
      name: "Limited Units", 
      icon: AlertCircle, 
      // status: "active", 
      productsTagged: 23, 
      lastRun: "1 hour ago",
      frequency: "Real-time",
      date: "2023-08-15"
    },
    { 
      name: "Misspelt Tags", 
      icon: FileText, 
      // status: "active", 
      productsTagged: 892, 
      lastRun: "3 hours ago",
      frequency: "Weekly",
      date: "2023-08-15"
    },
    { 
      name: "AI Tags", 
      icon: Sparkles, 
      // status: "paused", 
      productsTagged: 10, 
      lastRun: "Never",
      frequency: "Manual",
      date: "2023-08-15"
    },
  ];

  // const handleEdit = (rule: string) => {
  //   toast({
  //     title: "Edit rule",
  //     description: `Opening ${rule} configuration...`,
  //   });
  // };

  // const handleDelete = (rule: string) => {
  //   toast({
  //     title: "Rule deleted",
  //     description: `${rule} has been removed.`,
  //     variant: "destructive",
  //   });
  // };
  return (
      <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
          
            
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your tagging activity.</p>
          </div>

    

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.href}>
                  <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer h-full">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${action.color}`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Tagging Rules */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Tagging Rules</CardTitle>
              <CardDescription>
                View and manage all automated tagging rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {
                rules.map((rule) => (
                  <div key={rule.name} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        rule.status === "active" ? "bg-success/10" : "bg-muted"
                      }`}>
                        <rule.icon className={`w-5 h-5 ${
                          rule.status === "active" ? "text-success" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{rule.name}</h3>
                          <Badge variant="outline" className={
                            rule.status === "active" 
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-muted text-muted-foreground border-muted"
                          }>
                            {rule.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm  text-green-800">
                          <span>•</span>
                          <span>{rule.productsTagged} products tagged</span>
                          <span>•</span>
                          <span>Last run: {rule.lastRun}</span>
                          <span>•</span>
                          <span>Frequency: {rule.frequency}</span>
                          <span>•</span>
                          <span>{rule.date}</span>

                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2"> 
                      {/* <Button 
                        variant="outline" 
                        size="sm"
                        // onClick={() => handleEdit(rule.name)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button> */}
                      <Button 
                        variant="outline"
                        
                        size="sm"
                        // onClick={() => handleDelete(rule.name)}
                      >
                        {/* <Trash2 className="w-4 h-4" /> */}
                        <Download className="w-4 h-4  text-black " />
                      </Button>
                   </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
