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
import { Save, PlayCircle, TrendingUp } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/rules";

const BestSeller = () => {
  const defaultFormData = {
    _id: null, // Important for updating
    tagName: "",
    period: "",
    topProducts: "",
    country: "",
    state: "",
    city: "",
    schedule: "daily",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Load existing rule from backend
  useEffect(() => {
    const fetchRule = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/best-seller`);
        if (res.data) {
          // Adjust depending on backend response structure
          setFormData((prev) => ({
            ...prev,
            ...res.data,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch best seller rule", err);
      } finally {
        setIsLoading(false);
        setInitialDataLoaded(true);
      }
    };
    fetchRule();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? parseInt(value) || "" : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.tagName.trim()) newErrors.tagName = "Tag name is required";
    const period = parseInt(formData.period);
    if (isNaN(period) || period < 1 || period > 365)
      newErrors.period = "Period must be between 1 and 365";
    const top = parseInt(formData.topProducts);
    if (isNaN(top) || top < 1 || top > 1000)
      newErrors.topProducts = "Top products must be between 1 and 1000";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      let res;
      if (formData._id) {
        res = await axios.put(
          `${API_BASE}/best-seller/${formData._id}`,
          formData
        );
      } else {
        res = await axios.post(`${API_BASE}/best-seller`, formData);
      }

      // Update formData with saved rule (ensure _id is included)
      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          ...res.data, // backend should return saved rule including _id
        }));
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Error saving best seller rule", err);
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
            Loading Best Seller Rule...
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
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Best Seller</h1>
                <p className="text-muted-foreground">
                  Tag top-performing products automatically
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>
                  Configure how products are tagged as "Best Seller" based on
                  sales data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tagName">Tag Name</Label>
                    <Input
                      id="tagName"
                      name="tagName"
                      value={formData.tagName}
                      onChange={handleChange}
                      placeholder="Enter tag for best-seller products"
                    />
                    {errors.tagName && (
                      <p className="text-red-500 text-sm">{errors.tagName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period">The last X period (Days)</Label>
                    <Input
                      id="period"
                      name="period"
                      type="number"
                      value={formData.period}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                    />
                    {errors.period && (
                      <p className="text-red-500 text-sm">{errors.period}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topProducts">Top X Sold Products</Label>
                    <Input
                      id="topProducts"
                      name="topProducts"
                      type="number"
                      value={formData.topProducts}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                    />
                    {errors.topProducts && (
                      <p className="text-red-500 text-sm">
                        {errors.topProducts}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location Filters</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      name="country"
                      placeholder="Country e.g., India"
                      value={formData.country}
                      onChange={handleChange}
                    />
                    <Input
                      name="state"
                      placeholder="State e.g., Haryana"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <Input
                      name="city"
                      placeholder="City e.g., Gurugram"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select the convenient location
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule">Run Schedule</Label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="daily">Daily</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3 flex-wrap">
                  <Button onClick={handleSave} disabled={isLoading}>
                    <Save className="w-4 h-4 mr-1" />
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

export default BestSeller;
