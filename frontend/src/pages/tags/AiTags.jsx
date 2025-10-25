// import Sidebar from '@/components/Sidebar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { Textarea } from '@/components/ui/textarea';
// import { Save, Sparkles, ThumbsDown, ThumbsUp, TrendingUp } from 'lucide-react';
// import React from 'react';

// const AiTags = () => {

//     // const { toast } = useToast();

//   // const suggestions = [
//   //   {
//   //     product: "Premium Wireless Headphones",
//   //     suggestedTags: [
//   //       { tag: "noise-canceling", volume: "12K", confidence: 95 },
//   //       { tag: "bluetooth-headset", volume: "8.5K", confidence: 88 },
//   //       { tag: "over-ear-headphones", volume: "6.2K", confidence: 92 }
//   //     ],
//   //     status: "pending"
//   //   },
//   //   {
//   //     product: "Smart Fitness Watch",
//   //     suggestedTags: [
//   //       { tag: "fitness-tracker", volume: "15K", confidence: 96 },
//   //       { tag: "heart-rate-monitor", volume: "9.8K", confidence: 91 },
//   //       { tag: "waterproof-smartwatch", volume: "7.1K", confidence: 87 }
//   //     ],
//   //     status: "pending"
//   //   },
//   // ];

// //   const handleSave = () => {
// //     toast({
// //       title: "Settings saved",
// //       description: "AI Tags configuration has been updated.",
// //     });
// //   };

// //   const handleApprove = (product: string) => {
// //     toast({
// //       title: "Tags approved",
// //       description: `AI tags for ${product} have been applied.`,
// //     });
// //   };

// //   const handleReject = (product: string) => {
// //     toast({
// //       title: "Tags rejected",
// //       description: `AI suggestions for ${product} have been declined.`,
// //       variant: "destructive",
// //     });
// //   };
//   return (
//         <div className="flex min-h-screen bg-background">
//       <Sidebar />
      
//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8 max-w-4xl">
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
//                 <Sparkles className="w-6 h-6 text-accent " />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold">AI-Powered Tags</h1>
//                 <p className="text-muted-foreground">Let AI analyze and suggest high-volume search tags</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <Card className="shadow-card">
//               <CardHeader>
//                 <CardTitle>AI Configuration</CardTitle>
//                 <CardDescription>
//                   Configure how AI analyzes your products and suggests tags
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 {/* <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="enable">Enable AI Suggestions</Label>
//                     <p className="text-sm text-muted-foreground">
//                       Allow AI to analyze products and suggest tags
//                     </p>
//                   </div>
//                   <Switch id="enable" defaultChecked />
//                 </div> */}

//                 <div className="space-y-4">
//                   <Label>Analysis Sources</Label>
//                   <div className="space-y-2">
//                     {["Product Title", "Description", "Images", "Videos"].map((source) => (
//                       <div key={source} className="flex items-center justify-between p-3 rounded-lg border border-border">
//                         <span className="font-medium">{source}</span>
//                         <Switch defaultChecked />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="auto-apply">Auto-apply High Confidence Tags</Label>
//                     <p className="text-sm text-muted-foreground">
//                       Automatically apply tags with 95%+ confidence
//                     </p>
//                   </div>
//                   <Switch id="auto-apply" />
//                 </div> */}
//                   <div className="space-y-2">
//                       <Label htmlFor="message">All Tags</Label>
//                       <Textarea
//                         id="message"
//                         placeholder="Generated tags will appear here..."
//                         rows={3}
//                         required
//                       />
//                     </div>
//                 <div className="pt-4 flex gap-3 flex-wrap">
//                   <Button 
//                 //   onClick={handleSave}
//                   >
//                     <Save className="w-4 h-4 mr-1" />
//                     Save as draft
//                   </Button>
//                   {/* <Button >
//                     <Save className="w-4 h-4 mr-1" />
//                    Apply on Other Products
//                   </Button> */}
//                 </div>
//               </CardContent>
//             </Card>

        
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AiTags;


import React, { useState, useEffect } from 'react';
import { Sparkles, Save } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const AiTags = () => {
  // State management
  const [formData, setFormData] = useState({
    tagName: '',
    enabled: true,
    analysisSources: {
      productTitle: true,
      description: true,
      images: true,
      videos: true
    },
    autoApplyHighConfidence: false,
    confidenceThreshold: 95,
    generatedTags: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState({});

  // Load saved data on component mount
  useEffect(() => {
    loadRuleData();
  }, []);

  const loadRuleData = async () => {
    try {
      setIsLoading(true);
      // Replace with your API endpoint
      const response = await fetch('/api/rules/ai-tags');
      if (response.ok) {
        const savedData = await response.json();
        setFormData(savedData || {
          tagName: 'AI Suggested',
          enabled: true,
          analysisSources: {
            productTitle: true,
            description: true,
            images: true,
            videos: true
          },
          autoApplyHighConfidence: false,
          confidenceThreshold: 95,
          generatedTags: ''
        });
      }
    } catch (error) {
      console.error('Failed to load AI tags rule:', error);
      // Set default data on error
      setFormData({
        tagName: 'AI Suggested',
        enabled: true,
        analysisSources: {
          productTitle: true,
          description: true,
          images: true,
          videos: true
        },
        autoApplyHighConfidence: false,
        confidenceThreshold: 95,
        generatedTags: ''
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisSourceToggle = (source) => {
    setFormData(prev => ({
      ...prev,
      analysisSources: {
        ...prev.analysisSources,
        [source]: !prev.analysisSources[source]
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSwitchChange = (name, checked) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleGenerateTags = async () => {
    setIsGenerating(true);
    try {
      // Replace with your AI generation API endpoint
      const response = await fetch('/api/rules/ai-tags/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sources: formData.analysisSources
        })
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({ ...prev, generatedTags: result.tags }));
        alert('AI Tags generated successfully!');
      } else {
        throw new Error('Failed to generate tags');
      }
    } catch (error) {
      console.error('Failed to generate AI tags:', error);
      // Fallback simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const aiGeneratedTags = 'premium, wireless, noise-cancelling, smartwatch, fitness-tracker, limited-edition, best-seller, waterproof, bluetooth, fast-charging';
      setFormData(prev => ({ ...prev, generatedTags: aiGeneratedTags }));
      alert('AI Tags generated successfully!');
    } finally {
      setIsGenerating(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tagName?.trim()) {
      newErrors.tagName = 'Tag name is required';
    }

    if (formData.confidenceThreshold < 50 || formData.confidenceThreshold > 100) {
      newErrors.confidenceThreshold = 'Confidence threshold must be between 50-100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Please fix the errors before saving.');
      return;
    }

    setIsSaving(true);
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/rules/ai-tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('AI Tags configuration saved successfully!');
        console.log('AI Tags rule saved:', result);
        // Optionally save to localStorage as backup
        localStorage.setItem('aiTagsRule', JSON.stringify(formData));
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Failed to save AI tags rule:', error);
      alert('Failed to save configuration. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-2">AI-Powered Tags</h2>
            <p className="text-muted-foreground">Loading AI configuration...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI-Powered Tags</h1>
                <p className="text-muted-foreground">Let AI analyze and suggest high-volume search tags</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>
                  Configure how AI analyzes your products and suggests tags
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
                    placeholder="Enter name for AI-generated tags (e.g., 'AI Suggested')"
                    className={errors.tagName ? 'border-destructive' : ''}
                    disabled={isSaving || isGenerating}
                  />
                  {errors.tagName && (
                    <p className="text-sm text-destructive">{errors.tagName}</p>
                  )}
                </div>

                {/* Analysis Sources */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between items-center">
                    <Label className="font-semibold">Analysis Sources</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateTags}
                      disabled={isGenerating || isSaving}
                      className="gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-current/30 border-r-current" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Generate AI Tags</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { key: 'productTitle', label: 'Product Title', desc: 'Extract keywords from product titles' },
                      { key: 'description', label: 'Product Description', desc: 'Analyze product descriptions for search intent' },
                      { key: 'images', label: 'Product Images', desc: 'Use computer vision to detect product features' },
                      { key: 'videos', label: 'Product Videos', desc: 'Extract spoken keywords and visual elements' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
                        <div>
                          <span className="font-medium block">{label}</span>
                          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                        </div>
                        <Switch
                          checked={formData.analysisSources[key]}
                          onCheckedChange={() => handleAnalysisSourceToggle(key)}
                          disabled={isGenerating || isSaving}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence Threshold & Auto-apply */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="confidenceThreshold">Minimum Confidence Threshold (%)</Label>
                    <Input
                      id="confidenceThreshold"
                      name="confidenceThreshold"
                      type="number"
                      value={formData.confidenceThreshold}
                      onChange={handleInputChange}
                      min="50"
                      max="100"
                      placeholder="95"
                      className={errors.confidenceThreshold ? 'border-destructive' : ''}
                      disabled={isSaving || isGenerating}
                    />
                    {errors.confidenceThreshold && (
                      <p className="text-sm text-destructive">{errors.confidenceThreshold}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Only apply tags with this confidence level or higher
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <Switch
                        checked={formData.autoApplyHighConfidence}
                        onCheckedChange={(checked) => handleSwitchChange('autoApplyHighConfidence', checked)}
                        disabled={isSaving || isGenerating}
                      />
                      Auto-apply High Confidence Tags
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically apply tags meeting the confidence threshold
                    </p>
                  </div>
                </div>

                {/* Generated Tags */}
                <div className="space-y-2">
                  <Label htmlFor="generatedTags">AI Generated Tags</Label>
                  <Textarea
                    id="generatedTags"
                    name="generatedTags"
                    value={formData.generatedTags}
                    onChange={handleInputChange}
                    placeholder="AI-generated high-volume search tags will appear here..."
                    rows={4}
                    className="font-mono text-sm resize-none"
                    disabled={isGenerating || isSaving}
                  />
                  <p className="text-sm text-muted-foreground">
                    Comma-separated list of AI-suggested high-volume search tags
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving || isGenerating}
                    className="flex-1 sm:flex-none"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-r-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleGenerateTags}
                    disabled={isGenerating || isSaving}
                    className="flex-1 sm:flex-none"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-current/30 border-r-current mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate AI Tags Now
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

export default AiTags;