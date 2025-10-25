import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
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
import { Switch } from "@/components/ui/switch";
import { AlertCircle, PlayCircle, Save } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/rules";

const LimitedUnits = () => {
  const defaultFormData = {
    _id: null,
    tagName: "",
    threshold: 10,
    schedule: "realtime",
    autoRemove: true,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Load existing rule from backend
  useEffect(() => {
    const fetchRule = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/limited-units`);
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data, // Ensure backend returns saved rule including _id
          }));
        }
      } catch (err) {
        console.error("Failed to fetch Limited Units rule", err);
      } finally {
        setIsLoading(false);
        setInitialDataLoaded(true);
      }
    };
    fetchRule();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue =
      type === "number"
        ? parseInt(value) || ""
        : type === "checkbox"
        ? checked
        : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  // Save rule to backend
  const handleSave = async () => {
    setIsLoading(true);
    try {
      let res;
      if (formData._id) {
        res = await axios.put(
          `${API_BASE}/limited-units/${formData._id}`,
          formData
        );
      } else {
        res = await axios.post(`${API_BASE}/limited-units`, formData);
      }
      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          ...res.data,
        }));
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Error saving Limited Units rule", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialDataLoaded) {
    return (
      <div className="flex-1 p-8 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white border border-gray-200 rounded-xl shadow-xl">
          <div className="w-8 h-8 animate-spin rounded-full border-4 border-indigo-600 border-r-transparent"></div>
          <p className="text-lg text-gray-700 font-medium">
            Loading Limited Units Rule...
          </p>
        </div>
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
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Limited Units Left</h1>
                <p className="text-muted-foreground">
                  Alert customers about low stock products
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>
                  Configure when products should be tagged as "Limited Units
                  Left"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tagName">Tag Name</Label>
                  <Input
                    id="tagName"
                    name="tagName"
                    value={formData.tagName}
                    onChange={handleChange}
                    placeholder="Enter tag name for limited units"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold">Inventory Threshold</Label>
                  <Input
                    id="threshold"
                    name="threshold"
                    type="number"
                    value={formData.threshold}
                    onChange={handleChange}
                    placeholder="e.g., 10"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tag products when inventory falls below this number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule">Check Frequency</Label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="realtime">Real-time (recommended)</option>
                    <option value="hourly">Every hour</option>
                    <option value="daily">Daily</option>
                  </select>
                  <p className="text-sm text-muted-foreground">
                    How often to check inventory levels
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoRemove">Auto-remove Tag</Label>
                    <p className="text-sm text-muted-foreground">
                      Remove tag automatically when stock is replenished
                    </p>
                  </div>
                  <Switch
                    id="autoRemove"
                    name="autoRemove"
                    checked={formData.autoRemove}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-4 flex gap-3 flex-wrap">
                  <Button onClick={handleSave} disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Saving..." : isSaved ? "Saved!" : "Save Rule"}
                  </Button>

                  <Button variant="outline">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Check As Per Product Rule
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

export default LimitedUnits;
