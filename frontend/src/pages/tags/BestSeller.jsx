import React, { useState, useEffect, useCallback } from "react";
import {
  TrendingUp,
  Save,
  LayoutGrid,
  Tag,
  Settings,
  Menu,
  X,
} from "lucide-react";

// The application uses the Inter font via Tailwind configuration.
// Firebase imports have been removed.

// --- UI COMPONENTS (Defined inline as per Single-File Mandate) ---

// Tailwind utility for common rounded corners
const rounded = "rounded-xl";

const Card = ({ title, description, children, className = "" }) => (
  <div
    className={`bg-white shadow-lg border border-gray-100 ${rounded} p-6 ${className}`}
  >
    {title && (
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    )}
    {children}
  </div>
);

const Input = ({ label, id, className = "", error, ...props }) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`w-full px-3 py-2 border ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      } ${rounded} shadow-sm transition-colors duration-150 ${className}`}
      {...props}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  let baseStyle =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-10 px-4 py-2 text-sm " +
    rounded;

  if (variant === "default") {
    baseStyle +=
      " bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md";
  } else if (variant === "secondary") {
    baseStyle +=
      " bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500";
  }

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium text-gray-700 ${className}`}
  >
    {children}
  </label>
);

const Select = ({
  id,
  name,
  value,
  onChange,
  options,
  label,
  className = "",
}) => (
  <div className="space-y-2">
    {label && <Label htmlFor={id}>{label}</Label>}
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full h-10 px-3 border border-gray-300 bg-white ${rounded} shadow-sm transition-colors duration-150 focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// --- SIDEBAR COMPONENT ---

const Sidebar = ({ currentPage, setPage, userId }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutGrid, page: "dashboard" },
    { name: "Best Seller Rule", icon: TrendingUp, page: "bestseller" },
    { name: "Tag Settings", icon: Tag, page: "tagsettings" },
    { name: "General Settings", icon: Settings, page: "generalsettings" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const renderNav = (isMobile) => (
    <nav className={`space-y-2 p-4 ${isMobile ? "pt-8" : ""}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.page;
        return (
          <a
            key={item.page}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setPage(item.page);
              setIsOpen(false);
            }}
            className={`flex items-center p-3 ${rounded} transition-colors duration-150 ${
              isActive
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        );
      })}
      {userId && (
        <div
          className={`mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 break-all ${
            isMobile ? "block" : "hidden md:block"
          }`}
        >
          Mock User ID (for session):
          <br />
          <span className="text-gray-600 font-mono text-[10px] sm:text-xs">
            {userId}
          </span>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="secondary"
        className="md:hidden fixed top-4 left-4 z-50 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col w-64 bg-gray-50 border-r border-gray-200 min-h-screen sticky top-0`}
      >
        <div className="p-6 text-xl font-bold text-indigo-600 border-b border-gray-200">
          Product Tagger
        </div>
        {renderNav(false)}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-xl font-bold text-indigo-600 border-b border-gray-200">
          Product Tagger
        </div>
        {renderNav(true)}
      </div>
    </>
  );
};

// --- BEST SELLER RULE COMPONENT (MOCK PERSISTENCE) ---

const BestSellerRulePage = ({ mockRuleData, setMockRuleData }) => {
  const defaultFormData = {
    tagName: "Best Seller",
    period: 7,
    topProducts: 10,
    country: "",
    state: "",
    city: "",
    schedule: "daily",
  };

  // State initialization uses the mock data passed from the parent App component
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Load "saved" data from the central App state on mount
  useEffect(() => {
    // Simulate API call delay for loading data
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (mockRuleData) {
        setFormData(mockRuleData);
      }
      setInitialDataLoaded(true);
      setIsLoading(false);
      console.log("Rule data loaded from mock storage.");
    }, 500); // 0.5 second delay

    return () => clearTimeout(timer);
  }, [mockRuleData]);

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    // Handle number inputs
    const finalValue = type === "number" ? parseInt(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tagName.trim()) {
      newErrors.tagName = "Tag name is required";
    }

    const period = parseInt(formData.period);
    if (isNaN(period) || period < 1 || period > 365) {
      newErrors.period = "Period must be a number between 1 and 365";
    }

    const topProducts = parseInt(formData.topProducts);
    if (isNaN(topProducts) || topProducts < 1 || topProducts > 1000) {
      newErrors.topProducts =
        "Top products must be a number between 1 and 1000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save handler (Mocked)
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // --- MOCK SAVE LOGIC (Replacing Firestore setDoc) ---
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate save delay (1s)
      setMockRuleData(formData); // Save to central React state
      // --- END MOCK SAVE LOGIC ---

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);

      console.log("Rule saved to mock storage:", formData);
    } catch (error) {
      console.error("Failed to save rule:", error);
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
            Loading Rule Configuration...
          </p>
          <p className="text-sm text-gray-500 text-center">
            Fetching existing rule data from local state.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-8 max-w-4xl mx-auto md:mx-0">
        <div className="mb-8 pt-10 md:pt-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Best Seller Rule
              </h1>
              <p className="text-gray-500">
                Tag top-performing products automatically
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card
            title="Rule Configuration"
            description="Configure how products are tagged as 'Best Seller' based on sales data and location filters."
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Tag Name */}
                <Input
                  id="tagName"
                  label="Tag Name"
                  name="tagName"
                  type="text"
                  value={formData.tagName}
                  onChange={handleInputChange}
                  placeholder="Enter tag for best-seller products"
                  error={errors.tagName}
                />

                {/* Last X Period (Days) */}
                <Input
                  id="period"
                  label="Period (Days)"
                  name="period"
                  type="number"
                  value={formData.period}
                  onChange={handleInputChange}
                  min="1"
                  max="365"
                  placeholder="e.g. 7"
                  error={errors.period}
                />

                {/* Top X Sold Products */}
                <Input
                  id="topProducts"
                  label="Top X Sold Products"
                  name="topProducts"
                  type="number"
                  value={formData.topProducts}
                  onChange={handleInputChange}
                  min="1"
                  max="1000"
                  placeholder="e.g. 10"
                  error={errors.topProducts}
                />
              </div>

              {/* Location Filters */}
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <Label className="block text-base font-semibold">
                  Location Filters (Optional)
                </Label>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    id="country"
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g., India"
                  />
                  <Input
                    id="state"
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Haryana"
                  />
                  <Input
                    id="city"
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Gurugram"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Leave blank to apply worldwide.
                </p>
              </div>

              {/* Run Schedule */}
              <Select
                id="schedule"
                label="Run Schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                options={[
                  { value: "daily", label: "Daily (Every 24 hours)" },
                  { value: "weekly", label: "Weekly (Every Monday)" },
                  { value: "monthly", label: "Monthly (1st of the month)" },
                ]}
              />

              {/* Save Button */}
              <div className="pt-4 flex gap-3 flex-wrap">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={
                    isSaved
                      ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      : ""
                  }
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-white/30 border-r-white mr-2"></div>
                      Saving...
                    </>
                  ) : isSaved ? (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      Configuration Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      Save Rule
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

// --- MOCK PAGES ---
const Dashboard = ({ isAuthReady, userId }) => (
  <main className="flex-1 p-4 sm:p-8">
    <div className="pt-10 md:pt-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Overview of your automated product tagging rules.
      </p>
    </div>
    <Card
      title="Application Status"
      description="The application is running locally without external persistence."
      className="bg-indigo-50 border-indigo-200"
    >
      <p className="text-lg font-medium">
        {isAuthReady ? (
          <span className="text-green-600">✅ Ready to Use</span>
        ) : (
          <span className="text-yellow-600">⏳ Initializing...</span>
        )}
      </p>
      <p className="mt-2 text-sm text-gray-700 break-all">
        <span className="font-semibold">Session ID:</span> {userId || "N/A"}
      </p>
      <p className="mt-4 text-sm text-indigo-700">
        Navigate to 'Best Seller Rule' to configure and save your rule to the
        session state.
      </p>
    </Card>
  </main>
);

const MockPage = ({ title }) => (
  <main className="flex-1 p-4 sm:p-8">
    <div className="pt-10 md:pt-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500 mb-6">
        This page is a placeholder for future feature development.
      </p>
    </div>
    <Card
      title="Feature Coming Soon"
      description={`The ${title} functionality will be implemented here.`}
      className="bg-yellow-50 border-yellow-200"
    >
      <p className="text-gray-700">
        Feel free to navigate back to the **Best Seller Rule** page to test
        saving data to the mock application state.
      </p>
    </Card>
  </main>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState("bestseller");

  // Mock state to replace Firebase state
  const [userId] = useState("local-session-id-12345");
  const [isAuthReady] = useState(true); // Always ready now

  // Central state to hold the "saved" configuration data
  const [mockRuleData, setMockRuleData] = useState(null);

  // 2. Routing Logic
  const renderPage = () => {
    switch (currentPage) {
      case "bestseller":
        return (
          <BestSellerRulePage
            mockRuleData={mockRuleData}
            setMockRuleData={setMockRuleData}
          />
        );
      case "dashboard":
        return <Dashboard userId={userId} isAuthReady={isAuthReady} />;
      case "tagsettings":
        return <MockPage title="Tag Settings" />;
      case "generalsettings":
        return <MockPage title="General Settings" />;
      default:
        return <Dashboard userId={userId} isAuthReady={isAuthReady} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      <Sidebar
        currentPage={currentPage}
        setPage={setCurrentPage}
        userId={userId}
      />

      <div className="flex-1 flex flex-col pt-4 md:pt-0">{renderPage()}</div>
    </div>
  );
}
