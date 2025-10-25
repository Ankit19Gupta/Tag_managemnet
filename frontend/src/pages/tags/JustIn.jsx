import React, { useState, useEffect } from "react";
import { Tag, Save, Loader2, RefreshCw } from "lucide-react";

// =================================================================
// MOCK UI COMPONENTS (Tailwind CSS based)
// =================================================================

const Card = ({ className = "", children }) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow-lg ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-bold leading-none tracking-tight">{children}</h3>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Input = ({ className = "", error, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ${
      error ? "border-red-500 focus-visible:ring-red-500" : ""
    } ${className}`}
    {...props}
  />
);

const Label = ({ htmlFor, children, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none text-gray-700 ${className}`}
  >
    {children}
  </label>
);

const Button = ({ className = "", children, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md ${className}`}
  >
    {children}
  </button>
);

const Switch = ({ checked, onCheckedChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? "bg-indigo-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Sidebar = () => (
  <aside className="w-56 bg-white border-r border-gray-200 p-4 shadow-xl flex-shrink-0 h-screen sticky top-0">
    <div className="text-xl font-extrabold text-indigo-700 mb-6">
      Rule Automation
    </div>
    <nav className="space-y-2">
      <div className="flex items-center space-x-2 p-2 bg-indigo-50 rounded-lg text-indigo-700 font-semibold transition duration-150">
        <Tag className="w-4 h-4" />
        <span>Just In Rule</span>
      </div>
    </nav>
  </aside>
);

// --- API CONFIGURATION ---
const API_BASE_URL = "http://localhost:5000/api";
const RULE_GET_URL = `${API_BASE_URL}/rules/just-in`;
const RULE_SAVE_URL = `${API_BASE_URL}/rules/just-in`;

const JustInRule = () => {
  const [formData, setFormData] = useState({
    tagName: "Just In",
    days: 7, // Maps to productsPublishedInLastXDays on backend
    schedule: "daily",
    autoRemoveDays: 30, // Maps to autoRemoveAfterDays on backend
    autoRemoveEnabled: true, // Maps to autoRemoveTag on backend
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [ruleIdDisplay, setRuleIdDisplay] = useState("Not Loaded");

  // Load Rule Data on component mount (API GET call)
  const loadRuleData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch(RULE_GET_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch rule data: ${response.statusText}`);
      }

      const result = await response.json();
      const savedData = result.rule || {};

      setFormData((prev) => ({
        ...prev,
        tagName: savedData.tagName || prev.tagName,
        days: Number(savedData.productsPublishedInLastXDays) || prev.days,
        schedule: savedData.schedule || prev.schedule,
        autoRemoveDays:
          Number(savedData.autoRemoveAfterDays) || prev.autoRemoveDays,
        autoRemoveEnabled:
          savedData.autoRemoveTag !== undefined
            ? savedData.autoRemoveTag
            : prev.autoRemoveEnabled,
      }));

      setRuleIdDisplay(savedData._id || "N/A - New Draft");
    } catch (error) {
      console.error("Failed to load rule data:", error);
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
    // loadRuleData is stable as it is defined above and uses only state setters
    // However, including it in dependency array prevents potential lint warnings
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let newValue;

    if (type === "number") {
      // Parse number input. Empty string becomes NaN, which will be handled by validation.
      newValue = value === "" ? "" : Number(value);
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError(null);
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, autoRemoveEnabled: checked }));
    setApiError(null);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tagName || !String(formData.tagName).trim()) {
      newErrors.tagName = "Tag name is required";
    }

    const days = Number(formData.days);
    if (isNaN(days) || days < 1 || days > 365) {
      newErrors.days = "Days must be a number between 1 and 365";
    }

    if (formData.autoRemoveEnabled) {
      const autoRemoveDays = Number(formData.autoRemoveDays);
      if (isNaN(autoRemoveDays) || autoRemoveDays < 1 || autoRemoveDays > 365) {
        newErrors.autoRemoveDays =
          "Auto-remove days must be a number between 1 and 365";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save handler (API POST call)
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      // Prepare data for the backend, mapping frontend keys to expected backend keys
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

      // Re-load data to get the potentially newly generated ID and reflect the latest state
      await loadRuleData();
    } catch (error) {
      console.error("Failed to save rule via API:", error);
      setApiError(`Failed to save rule: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state display
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
    <div className="flex h-screen overflow-y-hidden bg-gray-50 font-sans antialiased text-gray-800">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center shadow-md">
                <Tag className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Just In Rule</h1>
                <p className="text-sm text-gray-500">
                  Auto-tag newly published products. Rule ID:
                  <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 ml-1">
                    {ruleIdDisplay}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {apiError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">API Error!</strong>
                <span className="block sm:inline ml-2">{apiError}</span>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Rule Configuration</CardTitle>
                <CardDescription>
                  Configure how products are automatically tagged as "Just In"
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
                    placeholder="Enter tag name for new products"
                    error={errors.tagName}
                  />
                  {errors.tagName && (
                    <p className="text-sm text-red-500">{errors.tagName}</p>
                  )}
                </div>

                {/* Days Input */}
                <div className="space-y-2">
                  <Label htmlFor="days">
                    Products published in last X days
                  </Label>
                  <Input
                    id="days"
                    name="days"
                    type="number"
                    value={formData.days}
                    onChange={handleInputChange}
                    min="1"
                    max="365"
                    placeholder="Enter number of days"
                    error={errors.days}
                  />
                  {errors.days && (
                    <p className="text-sm text-red-500">{errors.days}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Products published within this timeframe will receive the
                    tag. (Backend key:
                    <span className="font-mono text-xs ml-1">
                      productsPublishedInLastXDays
                    </span>
                    )
                  </p>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <Label htmlFor="schedule">Run Schedule</Label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly on Monday</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p className="text-sm text-gray-500">
                    Choose how often the rule should check for new products.
                  </p>
                </div>

                {/* Auto-remove Tag Switch */}
                <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-0.5 pr-4">
                    <Label
                      htmlFor="autoRemove"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      Auto-remove Tag
                    </Label>
                    <p className="text-sm text-gray-500">
                      Automatically remove the tag after a certain period.
                      (Backend key:
                      <span className="font-mono text-xs ml-1">
                        autoRemoveTag
                      </span>
                      )
                    </p>
                  </div>
                  <Switch
                    checked={formData.autoRemoveEnabled}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>

                {/* Auto-remove Days Input (Conditional) */}
                {formData.autoRemoveEnabled && (
                  <div className="space-y-2 pl-4 border-l-4 border-indigo-400 pt-1">
                    <Label htmlFor="autoRemoveDays">
                      Remove tag after X days
                    </Label>
                    <Input
                      id="autoRemoveDays"
                      name="autoRemoveDays"
                      type="number"
                      value={formData.autoRemoveDays}
                      onChange={handleInputChange}
                      min="1"
                      max="365"
                      placeholder="Enter number of days"
                      error={errors.autoRemoveDays}
                    />
                    {errors.autoRemoveDays && (
                      <p className="text-sm text-red-500">
                        {errors.autoRemoveDays}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      The tag will be removed after **
                      {formData.autoRemoveDays || "X"}** days. (Backend key:
                      <span className="font-mono text-xs ml-1">
                        autoRemoveAfterDays
                      </span>
                      )
                    </p>
                  </div>
                )}

                {/* Save Button */}
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
                        Save Rule Configuration
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={loadRuleData}
                    disabled={isLoading}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
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

export default JustInRule;
