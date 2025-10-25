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
import { PlayCircle, Save, Tag, Loader2 } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";
const RULE_GET_URL = `${API_BASE_URL}/rules/just-in`;
const RULE_SAVE_URL = `${API_BASE_URL}/rules/just-in`;

const JustIn = () => {
  const [formData, setFormData] = useState({
    tagName: "Just In",
    days: 7,
    schedule: "daily",
    autoRemoveDays: 30,
    autoRemoveEnabled: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [ruleIdDisplay, setRuleIdDisplay] = useState("Not Loaded");
  const [errors, setErrors] = useState({});

  const loadRuleData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch(RULE_GET_URL);
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      const savedData = result.rule || {};
      setFormData({
        tagName: savedData.tagName || formData.tagName,
        days: Number(savedData.productsPublishedInLastXDays) || formData.days,
        schedule: savedData.schedule || formData.schedule,
        autoRemoveDays:
          Number(savedData.autoRemoveAfterDays) || formData.autoRemoveDays,
        autoRemoveEnabled:
          savedData.autoRemoveTag !== undefined
            ? savedData.autoRemoveTag
            : formData.autoRemoveEnabled,
      });
      setRuleIdDisplay(savedData._id || "N/A - New Draft");
    } catch (error) {
      setApiError(
        "Rule data could not be loaded from the server. Using default values."
      );
    } finally {
      setIsLoading(false);
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    loadRuleData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let newValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError(null);
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, autoRemoveEnabled: checked }));
    setApiError(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tagName || !String(formData.tagName).trim())
      newErrors.tagName = "Tag name is required";
    const days = Number(formData.days);
    if (isNaN(days) || days < 1 || days > 365)
      newErrors.days = "Days must be a number between 1 and 365";
    if (formData.autoRemoveEnabled) {
      const autoRemoveDays = Number(formData.autoRemoveDays);
      if (isNaN(autoRemoveDays) || autoRemoveDays < 1 || autoRemoveDays > 365)
        newErrors.autoRemoveDays =
          "Auto-remove days must be a number between 1 and 365";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setApiError(null);
    try {
      const dataToSend = {
        tagName: formData.tagName,
        productsPublishedInLastXDays: formData.days,
        schedule: formData.schedule,
        autoRemoveTag: formData.autoRemoveEnabled,
        autoRemoveAfterDays: formData.autoRemoveDays,
      };
      const response = await fetch(RULE_SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API save failed with status: ${response.status}`
        );
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      await loadRuleData();
    } catch (error) {
      setApiError(`Failed to save rule: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isDataLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2 text-indigo-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p>Loading rule configuration...</p>
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
                <Tag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Just In</h1>
                <p className="text-muted-foreground">
                  Auto-tag newly published products
                </p>
              </div>
            </div>
          </div>

          {apiError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">API Error!</strong>
              <span className="block sm:inline ml-2">{apiError}</span>
            </div>
          )}

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>
                  Configure how products are automatically tagged as "Just In"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tagName">Tag Name</Label>
                  <Input
                    id="tagName"
                    name="tagName"
                    type="text"
                    value={formData.tagName}
                    onChange={handleInputChange}
                    placeholder="Enter tag name for Just In"
                    error={errors.tagName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">
                    Products published in last X days (Days)
                  </Label>
                  <Input
                    id="days"
                    name="days"
                    type="number"
                    value={formData.days}
                    onChange={handleInputChange}
                    placeholder="Enter number of days"
                    error={errors.days}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Run Schedule</Label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="daily">Daily</option>
                  </select>
                  <p className="text-sm text-muted-foreground">
                    Choose how often the rule should check for new products
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoRemove">Auto-remove Tag</Label>
                    <Input
                      id="autoRemoveDays"
                      name="autoRemoveDays"
                      type="number"
                      value={formData.autoRemoveDays}
                      onChange={handleInputChange}
                      placeholder="Enter number of days"
                      error={errors.autoRemoveDays}
                    />
                    <p className="text-sm text-muted-foreground">
                      Remove tag automatically after above mentioned days
                    </p>
                  </div>
                  <Switch
                    checked={formData.autoRemoveEnabled}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
                <div className="pt-4 flex gap-3 flex-wrap">
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Saving...
                      </>
                    ) : isSaved ? (
                      <span className="bg-green-600 px-3 py-1 rounded-md text-white flex items-center shadow-inner">
                        <Save className="w-4 h-4 mr-1" />
                        Saved Successfully!
                      </span>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-1" />
                        Save Rule
                      </>
                    )}
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

export default JustIn;
