import Sidebar from '@/components/Sidebar';
import { Settings } from 'lucide-react';
import React from 'react';

const Setting = () => {
  return (
    <div>
       <div className="flex min-h-screen bg-background">
      <Sidebar/>
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Setting</h1>
                <p>create ui for setting..........................</p>
                {/* <p className="text-muted-foreground">Manage all tagging rules and configurations</p> */}
              </div>
            </div>
          </div>

        

          {/* Rules Management */}
          {/* <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle>Tagging Rules</CardTitle>
              <CardDescription>
                View and manage all automated tagging rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rules.map((rule) => (
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{rule.productsTagged} products tagged</span>
                          <span>•</span>
                          <span>Last run: {rule.lastRun}</span>
                          <span>•</span>
                          <span>Frequency: {rule.frequency}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(rule.name)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(rule.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

        
        </div>
      </main>
    </div>
    </div>
  );
}

export default Setting;
