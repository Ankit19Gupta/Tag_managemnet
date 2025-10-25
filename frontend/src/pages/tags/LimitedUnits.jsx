// import Sidebar from '@/components/Sidebar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { AlertCircle, PlayCircle, Save } from 'lucide-react';
// import React from 'react';

// //usetoast missing h
// const LimitedUnits = () => {
//   // const { toast } = useToast();

//   // const handleSave = () => {
//   //   toast({
//   //     title: "Settings saved",
//   //     description: "Limited Units rule configuration has been updated.",
//   //   });
//   // };
//   return (
//      <div className="flex min-h-screen bg-background">
//       <Sidebar />

//       <main className="flex-1 overflow-y-auto">
//         <div className="p-8 max-w-4xl">
//           <div className="mb-8">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6 text-primary" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold">Limited Units Left</h1>
//                 <p className="text-muted-foreground">Alert customers about low stock products</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <Card className="shadow-card">
//               <CardHeader>
//                    <CardTitle>Rule Configuration</CardTitle>
//                 <CardDescription>
//                       Configure when products should be tagged as "Limited Units Left"
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">

//               <div className="space-y-2">
//                <Label htmlFor="days">Tag Name</Label>
//                  <Input
//                   id="days"
//                   type="text"
//                   // defaultValue="7"
//                  placeholder="Enter tag name for limited units  "
//                      />
//                 {/* <p className="text-sm text-muted-foreground">
//                  Products will keep the "Just In" tag for this many days after publication
//                 </p> */}
//               </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="threshold">Inventory Threshold</Label>
//                   <Input
//                     id="threshold"
//                     type="number"
//                     defaultValue="10"
//                     placeholder="e.g., 10"
//                   />
//                   <p className="text-sm text-muted-foreground">
//                     Tag products when inventory falls below this number
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="schedule">Check Frequency</Label>
//                   <select
//                     id="schedule"
//                     className="w-full h-10 px-3 rounded-md border border-input bg-background"
//                     defaultValue="realtime"
//                   >
//                     <option value="realtime">Real-time (recommended)</option>
//                     <option value="hourly">Every hour</option>
//                     <option value="daily">Daily</option>
//                   </select>
//                   <p className="text-sm text-muted-foreground">
//                     How often to check inventory levels
//                   </p>
//                 </div>
//                  {/* <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="enable">Enable Rule</Label>
//                     <p className="text-sm text-muted-foreground">
//                       Automatically apply tag when inventory is low
//                     </p>
//                   </div>
//                   <Switch id="enable" defaultChecked />
//                 </div> */}
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-0.5">
//                     <Label htmlFor="auto-remove">Auto-remove Tag</Label>
//                     <p className="text-sm text-muted-foreground">
//                       Remove tag automatically when stock is replenished
//                     </p>
//                   </div>
//                   <Switch id="auto-remove" defaultChecked />
//                 </div>

//                 <div className="pt-4 flex gap-3 flex-wrap">
//                   <Button
//                   // onClick={handleSave}
//                   >
//                     <Save className="w-4 h-4 mr-2" />
//                     Save as draft
//                   </Button>

//                   {/* <Button variant="outline">
//                     <PlayCircle className="w-4 h-4 mr-1" />
//                     Check As Per Product Rule
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

// export default LimitedUnits;

import React, { useState, useEffect } from "react";
import { AlertCircle, Save, CheckCircle, XCircle } from "lucide-react";

// --- MOCK UI COMPONENTS (for single-file execution) ---

const Button = React.forwardRef(
  ({ className = "", children, disabled, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
);

const Card = ({ className = "shadow-lg", children, ...props }) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground ${className}`}
    {...props}
  >
    {children}
  </div>
);
const CardHeader = ({
  className = "flex flex-col space-y-1.5 p-6",
  children,
  ...props
}) => (
  <div className={className} {...props}>
    {children}
  </div>
);
const CardTitle = ({
  className = "text-xl font-semibold leading-none tracking-tight",
  children,
  ...props
}) => (
  <h3 className={className} {...props}>
    {children}
  </h3>
);
const CardDescription = ({
  className = "text-sm text-muted-foreground",
  children,
  ...props
}) => (
  <p className={className} {...props}>
    {children}
  </p>
);
const CardContent = ({ className = "p-6 pt-0", children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);
const Label = ({
  className = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ...props
}) => <label className={className} {...props} />;
const Switch = ({ checked, onCheckedChange, id, ...props }) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? "bg-primary" : "bg-input"
    }`}
    {...props}
  >
    <span
      className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Sidebar = () => (
  <aside className="w-64 bg-gray-50/50 border-r p-4 hidden md:block">
    <h2 className="text-2xl font-bold mb-6 text-primary">App Rules</h2>
    <nav className="space-y-2">
      <a
        href="#"
        className="flex items-center space-x-2 p-2 rounded-lg bg-primary/10 text-primary font-medium transition-colors"
      >
        <AlertCircle className="w-4 h-4" />
        <span>Limited Units</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <Save className="w-4 h-4" />
        <span>New Rule</span>
      </a>
    </nav>
  </aside>
);

// --- MAIN COMPONENT LOGIC ---

const App = () => {
  // State management
  const defaultFormData = {
    tagName: "Limited Units Left",
    threshold: 10,
    schedule: "realtime",
    autoRemoveEnabled: true,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState(""); // State for local error message

  // Load saved data on component mount from localStorage
  useEffect(() => {
    loadRuleData();
  }, []);

  const loadRuleData = () => {
    try {
      const savedData = localStorage.getItem("limitedUnitsRule");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      } else {
        setFormData(defaultFormData);
      }
    } catch (error) {
      console.error("Failed to load rule data from localStorage:", error);
      setFormData(defaultFormData); // Fallback to default on error
    }
  };

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSaveError("");
  };

  // Select change handler
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaveError("");
  };

  // Switch change handler
  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      autoRemoveEnabled: checked,
    }));
    setSaveError("");
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tagName.trim()) {
      newErrors.tagName = "Tag name is required";
    }

    const threshold = Number(formData.threshold);
    if (isNaN(threshold) || threshold < 1 || threshold > 1000) {
      newErrors.threshold = "Threshold must be a number between 1 and 1000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save handler
  const handleSave = async () => {
    setSaveError("");
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save to localStorage
      localStorage.setItem("limitedUnitsRule", JSON.stringify(formData));

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);

      console.log("Limited Units rule saved:", formData);
    } catch (error) {
      console.error("Failed to save rule:", error);
      // Display error message instead of alert
      setSaveError(
        "Failed to save rule due to an internal error. Please check the console."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-2">
              <div className="w-12 h-12 mt-1 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Limited Units Left Rule
                </h1>
                <p className="text-gray-500 mt-1">
                  Automatically alert customers about low stock products.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>
                  Define the criteria for when products should be tagged as
                  "Limited Units Left".
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
                    placeholder="e.g., Low Stock Warning"
                    className={errors.tagName ? "border-red-500" : ""}
                  />
                  {errors.tagName && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.tagName}
                    </p>
                  )}
                </div>

                {/* Inventory Threshold */}
                <div className="space-y-2">
                  <Label htmlFor="threshold">Inventory Threshold</Label>
                  <Input
                    id="threshold"
                    name="threshold"
                    type="number"
                    value={formData.threshold}
                    onChange={handleInputChange}
                    min="1"
                    max="1000"
                    placeholder="e.g., 10"
                    className={errors.threshold ? "border-red-500" : ""}
                  />
                  {errors.threshold && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.threshold}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Tag products when inventory falls below this number.
                  </p>
                </div>

                {/* Check Frequency */}
                <div className="space-y-2">
                  <Label htmlFor="schedule">Check Frequency</Label>
                  <div className="relative">
                    <select
                      id="schedule"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleSelectChange}
                      className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background appearance-none cursor-pointer"
                    >
                      <option value="realtime">Real-time (Recommended)</option>
                      <option value="hourly">Every hour</option>
                      <option value="daily">Daily</option>
                    </select>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    How often to check inventory levels and apply/remove tags.
                  </p>
                </div>

                {/* Auto-remove Tag */}
                <div className="flex items-center justify-between py-2 border-t">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="autoRemove"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      Auto-remove Tag
                    </Label>
                    <p className="text-sm text-gray-500">
                      Automatically remove the tag when stock is replenished
                      above the threshold.
                    </p>
                  </div>
                  <Switch
                    id="autoRemove"
                    checked={formData.autoRemoveEnabled}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>

                {/* Error Message Display */}
                {saveError && (
                  <div className="p-3 text-sm rounded-lg bg-red-100 text-red-700 flex items-center gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{saveError}</span>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-4 flex gap-3 flex-wrap">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={
                      isSaved
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-r-white mr-2"></div>
                        Saving...
                      </>
                    ) : isSaved ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Settings Saved
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Rule
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

export default App;

// const loadRuleData = async () => {
//   try {
//     const response = await fetch('/api/rules/limited-units');
//     if (response.ok) {
//       const data = await response.json();
//       setFormData(data);
//     }
//   } catch (error) {
//     console.error('Failed to load rule data:', error);
//   }
// };

// const handleSave = async () => {
//   if (!validateForm()) return;

//   setIsLoading(true);
//   try {
//     const response = await fetch('/api/rules/limited-units', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     });

//     if (response.ok) {
//       setIsSaved(true);
//       setTimeout(() => setIsSaved(false), 3000);
//     }
//   } catch (error) {
//     console.error('Save failed:', error);
//   } finally {
//     setIsLoading(false);
//   }
// };
