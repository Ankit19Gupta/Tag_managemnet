// import React from 'react';
// import { FileText, Plus, Save, X } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useState } from 'react';
// import Sidebar from '@/components/Sidebar';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// //useToast missing h

// const Misspelt = () => {
//     //  const { toast } = useToast();
//   const [misspellings, setMisspellings] = useState([
//     // { correct: "wireless", variants: ["wireles", "wirelss", "wirless"] },
//     //  { correct: "headphones", variants: ["headfones", "headfons", "hedphones"] },
//     //     { correct: "headphones", variants: ["headfones", "headfons", "hedphones"] },
//     //   { correct: "headphones", variants: ["headfones", "headfons", "hedphones"] },

//   ]);

// //   const handleSave = () => {
// //     toast({
// //       title: "Settings saved",
// //       description: "Misspelt tags configuration has been updated.",
// //     });
// //   };
//   return (
//      <div className="flex min-h-screen bg-background">
//       <Sidebar />
      
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8 max-w-4xl">
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-accent" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold">Misspelt Tags</h1>
//                 <p className="text-muted-foreground">Capture common search typos and misspellings</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <Card className="shadow-card">
//               <CardHeader>
//                 <CardTitle>Rule Configuration</CardTitle>
//                 <CardDescription>
//                   Add misspelt variations to help customers find products even with typos
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {/* <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="enable">Enable Rule</Label>
//                     <p className="text-sm text-muted-foreground">
//                       Automatically apply misspelt tag variations
//                     </p>
//                   </div>
//                   <Switch id="enable" defaultChecked />
//                 </div> */}

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <Label>Data Sources</Label>
//                     {/* <Button variant="outline" size="sm">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Add Source
//                     </Button> */}
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between p-3 rounded-lg border border-border">
//                       <div className="flex items-center gap-2">
//                         <Switch defaultChecked />
//                         <span className="font-medium">Shopify Site Search</span>
//                       </div>
//                       <Badge variant="outline" className="bg-success/10 text-success border-success/20">
//                         Connected
//                       </Badge>
//                     </div>
                    
//                     <div className="flex items-center justify-between p-3 rounded-lg border border-border">
//                       <div className="flex items-center gap-2">
//                         <Switch defaultChecked />
//                         <span className="font-medium">Google Search Console</span>
//                       </div>
//                       <Badge variant="outline" className="bg-success/10 text-success border-success/20">
//                         Connected
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//                   <div className="space-y-2">
//                                         <Label htmlFor="message">All Tags</Label>
//                                         <Textarea
//                                           id="message"
//                                           placeholder="Generated tags will appear here..."
//                                           rows={5}
//                                           required
//                                         />
//                                       </div>
//                 <div className="pt-4">
//                   <Button 
//                 //   onClick={handleSave}
//                   >
//                     <Save className="w-4 h-4 mr-1" />
//                    Save as draft
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//                <div className="space-y-2">
//                   <Label htmlFor="days">Tag Name</Label>
//                   <Input
//                     id="days"
//                     type="text"
//                     // defaultValue="7"
//                     placeholder="Enter name for mis-spelt tags"
//                   />
//                    {/* <p className="text-sm text-muted-foreground">
//                     Products will keep the "Just In" tag for this many days after publication
//                   </p> */}
//                  </div> 
//               <Button variant="outline" className="w-full">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Custom Misspelling
//                   </Button>

        
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Misspelt;



import React, { useState, useEffect } from 'react';
import { FileText, Save, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const MisspeltTags = () => {
  // State management
  const [formData, setFormData] = useState({
    tagName: '',
    dataSources: {
      shopifySearch: true,
      googleConsole: true
    },
    generatedTags: '',
    customMisspellings: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    loadRuleData();
  }, []);

  const loadRuleData = async () => {
    try {
      // Simulate API call - replace with actual API
      const savedData = {
        tagName: 'Misspelt Tags',
        dataSources: {
          shopifySearch: true,
          googleConsole: true
        },
        generatedTags: 'mispeled, mispelled, misspelt, misspeled, misspelld',
        customMisspellings: []
      };
      setFormData(savedData);
    } catch (error) {
      console.error('Failed to load rule data:', error);
    }
  };

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Data source toggle handlers
  const handleDataSourceToggle = (source) => {
    setFormData(prev => ({
      ...prev,
      dataSources: {
        ...prev.dataSources,
        [source]: !prev.dataSources[source]
      }
    }));
  };

  // Add custom misspelling
  const addCustomMisspelling = () => {
    const newMisspelling = prompt('Enter custom misspelling:');
    if (newMisspelling && newMisspelling.trim()) {
      setFormData(prev => ({
        ...prev,
        customMisspellings: [...prev.customMisspellings, newMisspelling.trim()]
      }));
    }
  };

  // Generate tags
  const handleGenerateTags = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newTags = 'mispeled, mispelled, misspelt, misspeled, misspelld, typpo, tyop, misspeling';
      setFormData(prev => ({
        ...prev,
        generatedTags: newTags
      }));
    } catch (error) {
      console.error('Failed to generate tags:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tagName.trim()) {
      newErrors.tagName = 'Tag name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save handler
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage (replace with your API)
      localStorage.setItem('misspeltTagsRule', JSON.stringify(formData));
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      
      console.log('Misspelt Tags rule saved:', formData);
    } catch (error) {
      console.error('Failed to save rule:', error);
      alert('Failed to save rule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Misspelt Tags</h1>
                <p className="text-muted-foreground">Capture common search typos and misspellings</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>
                  Add misspelt variations to help customers find products even with typos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Tag Name */}
                <div className="space-y-2">
                  <Label htmlFor="tagName">Tag Name</Label>
                  <Input
                    id="tagName"
                    name="tagName"
                    type="text"
                    value={formData.tagName}
                    onChange={handleInputChange}
                    placeholder="Enter name for mis-spelt tags"
                    className={errors.tagName ? 'border-destructive' : ''}
                  />
                  {errors.tagName && (
                    <p className="text-sm text-destructive">{errors.tagName}</p>
                  )}
                </div>

                {/* Data Sources */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Data Sources</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateTags}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-current/30 border-r-current mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Generate Tags
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={formData.dataSources.shopifySearch}
                          onCheckedChange={() => handleDataSourceToggle('shopifySearch')}
                        />
                        <span className="font-medium">Shopify Site Search</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Connected
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={formData.dataSources.googleConsole}
                          onCheckedChange={() => handleDataSourceToggle('googleConsole')}
                        />
                        <span className="font-medium">Google Search Console</span>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Connected
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Generated Tags */}
                <div className="space-y-2">
                  <Label htmlFor="generatedTags">All Tags</Label>
                  <Textarea
                    id="generatedTags"
                    name="generatedTags"
                    value={formData.generatedTags}
                    onChange={handleInputChange}
                    placeholder="Generated tags will appear here..."
                    rows={5}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated list of misspelling variations
                  </p>
                </div>

                {/* Add Custom Misspelling */}
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={addCustomMisspelling}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Misspelling
                  </Button>
                  {formData.customMisspellings.length > 0 && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-2">Custom Misspellings:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.customMisspellings.map((misspelling, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {misspelling}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className={isSaved ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-r-white mr-2"></div>
                        Saving...
                      </>
                    ) : isSaved ? (
                      <>
                        <Save className="w-4 h-4 mr-1" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-1" />
                        Save as draft
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MisspeltTags;


// Replace loadRuleData
// const loadRuleData = async () => {
//   try {
//     const response = await fetch('/api/rules/misspelt-tags');
//     if (response.ok) {
//       const data = await response.json();
//       setFormData(data);
//     }
//   } catch (error) {
//     console.error('Failed to load rule data:', error);
//   }
// };

// // Replace handleSave
// const handleSave = async () => {
//   if (!validateForm()) return;
  
//   setIsLoading(true);
//   try {
//     const response = await fetch('/api/rules/misspelt-tags', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });
    
//     if (response.ok) {
//       setIsSaved(true);
//       setTimeout(() => setIsSaved(false), 3000);
//       toast({
//         title: "Settings saved",
//         description: "Misspelt Tags rule configuration has been updated.",
//       });
//     }
//   } catch (error) {
//     console.error('Save failed:', error);
//     toast({
//       variant: "destructive",
//       title: "Error",
//       description: "Failed to save rule. Please try again.",
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };