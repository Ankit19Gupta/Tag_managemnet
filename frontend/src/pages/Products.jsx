import { useState, useEffect } from "react";
import axios from "axios";
import {
  Package,
  Tag,
  Loader2,
  X,
  CheckCircle,
  Eye,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Upload,
  Waypoints,
  Zap,
  Star,
  AlertTriangle,
  PenTool,
  TrendingUp,
  HandCoins,
  Menu,
} from "lucide-react";

// --- Utility Components (Unchanged for brevity in explanation) ---

const Button = ({
  children,
  className = "",
  variant = "default",
  onClick,
  type = "button",
  disabled = false,
}) => {
  let baseStyles =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2 shadow-md";

  if (variant === "outline") {
    baseStyles +=
      " bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm";
  } else {
    baseStyles +=
      " bg-purple-600 text-white hover:bg-purple-700 shadow-purple-500/50";
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = "" }) => {
  let baseStyles =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors whitespace-nowrap";
  return <div className={`${baseStyles} ${className}`}>{children}</div>;
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl border border-gray-100 shadow-lg ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 pb-2 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight text-gray-900 ${className}`}
  >
    {children}
  </h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg mx-auto">{children}</div>
    </div>
  );
};

const DialogContent = ({ children, className = "", onOpenChange }) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-2xl w-full transform transition-all animate-in zoom-in-90 border border-gray-100 ${className}`}
    onClick={(e) => e.stopPropagation()}
  >
    <button
      onClick={() => onOpenChange(false)}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
    >
      <X className="h-5 w-5" />
    </button>
    {children}
  </div>
);
const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
    {children}
  </div>
);
const DialogTitle = ({ children }) => (
  <h2 className="text-2xl font-bold leading-none tracking-tight text-gray-900">
    {children}
  </h2>
);
const DialogDescription = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">{children}</p>
);
const DialogFooter = ({ children, className = "" }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className}`}
  >
    {children}
  </div>
);

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none text-gray-700 ${className}`}
  >
    {children}
  </label>
);

const Input = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
  type = "text",
  step = "",
}) => (
  <input
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    type={type}
    step={step}
    className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 disabled:opacity-50 ${className}`}
  />
);

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      current: false,
      path: "/dashboard",
    },
    { name: "Products", icon: ShoppingBag, current: true, path: "/products" },
    {
      name: "Collections",
      icon: Waypoints,
      current: false,
      path: "/collections",
    },
  ];

  const tagRules = [
    { name: "Just In", icon: Zap, path: "/tags/just-in" },
    { name: "Best Seller", icon: Star, path: "/tags/best-seller" },
    {
      name: "Limited Units",
      icon: AlertTriangle,
      path: "/tags/limited-units",
    },
    { name: "Misspelt Tags", icon: PenTool, path: "/tags/misspelt" },
    { name: "AI Tags", icon: TrendingUp, path: "/tags/ai-tags" },
  ];

  const generalNav = [
    { name: "Pricing", icon: HandCoins, path: "/pricing" },
    { name: "Contact", icon: Users, path: "/contact" },
    { name: "Settings", icon: Settings, path: "/setting" },
  ];

  const ActiveLink = ({ current }) => (
    <div
      className={`h-full w-1 ${
        current ? "bg-purple-600" : "bg-transparent"
      } absolute left-0 top-0 rounded-r-md`}
    ></div>
  );

  const NavLink = ({ item, isActive }) => (
    <a
      key={item.name}
      href={item.path}
      className={`group relative flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 block ${
        isActive
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <ActiveLink current={isActive} />
      <item.icon className="w-5 h-5 mr-3" />
      {item.name}
    </a>
  );

  const DesktopSidebar = (
    <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white h-screen fixed inset-y-0 left-0 z-30">
      <div className="p-6 text-2xl font-bold text-white border-b border-gray-800">
        TagMaster
      </div>
      <nav className="flex-1 space-y-4 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} isActive={item.current} />
          ))}
        </div>
        <div className="px-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            TAG RULES
          </h3>
          <div className="space-y-1">
            {tagRules.map((item) => (
              <NavLink key={item.name} item={item} isActive={false} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          {generalNav.map((item) => (
            <NavLink key={item.name} item={item} isActive={false} />
          ))}
        </div>
      </nav>
    </div>
  );

  const MobileHeader = (
    <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200 sticky top-0 z-20">
      <h1 className="text-xl font-bold text-gray-900">Products</h1>
      <Button
        variant="outline"
        className="p-2 h-auto"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </Button>
    </div>
  );

  const MobileSidebar = (
    <div
      className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className="absolute inset-y-0 left-0 w-64 bg-gray-900 flex flex-col transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-2xl font-bold text-white border-b border-gray-800 flex justify-between items-center">
          TagMaster
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-4 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} isActive={item.current} />
            ))}
          </div>
          <div className="px-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              TAG RULES
            </h3>
            <div className="space-y-1">
              {tagRules.map((item) => (
                <NavLink key={item.name} item={item} isActive={false} />
              ))}
            </div>
          </div>
          <div className="space-y-1">
            {generalNav.map((item) => (
              <NavLink key={item.name} item={item} isActive={false} />
            ))}
          </div>
        </nav>
      </div>
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileHeader}
      {MobileSidebar}
    </>
  );
};

// --- FIX START: Returning full Data URI and adding size validation ---

/**
 * Converts a File object to a full Data URL string (e.g., 'data:image/jpeg;base64,...').
 * This is the preferred format for Cloudinary string uploads.
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    // Resolve with the full Data URL
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const CreateProductDialog = ({ isOpen, onOpenChange, onProductAdded }) => {
  // Set a maximum file size (5 MB) for safe Base64 uploads
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  // Renamed for clarity: now stores the full Data URI (e.g., data:image/jpeg;base64,...)
  const [imageDataURI, setImageDataURI] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setMessage(null);
    setImageFile(null);
    setImageDataURI(null);

    if (file && file.type.startsWith("image/")) {
      // 1. Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setMessage({
          type: "error",
          text: `Image size (${(file.size / 1024 / 1024).toFixed(
            2
          )} MB) exceeds the ${MAX_FILE_SIZE_MB}MB limit.`,
        });
        return;
      }

      setImageFile(file);
      try {
        // 2. Convert to full Data URI
        const fullDataURI = await fileToBase64(file);
        setImageDataURI(fullDataURI);
      } catch (error) {
        setMessage({
          type: "error",
          text: "Error converting file to Data URI.",
        });
        setImageFile(null);
        setImageDataURI(null);
      }
    } else if (file) {
      // Not an image but a file was selected
      setMessage({
        type: "error",
        text: "Please select a valid image file (JPEG, PNG, etc.).",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Use imageDataURI for validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.stock ||
      !imageDataURI
    ) {
      setMessage({
        type: "error",
        text: "Please fill out Title, Price, Stock, and upload an image.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        sku: formData.sku || undefined,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        // Send the full Data URI string to the backend
        mainImageBase64: imageDataURI,
      };

      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          // IMPORTANT: Ensure VITE_API_URI is correctly configured in your environment
          response = await axios.post(
            `${import.meta.env.VITE_API_URI}/products`,
            payload
          );
          break;
        } catch (err) {
          if (attempt === 2) throw err;
          // Exponential backoff for retries
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }

      setMessage({
        type: "success",
        text: `Product '${response.data.product.title}' created successfully! Reloading list...`,
      });

      setFormData({ title: "", sku: "", price: "", stock: "" });
      setImageFile(null);
      setImageDataURI(null);

      setTimeout(() => {
        onProductAdded();
        onOpenChange(false);
      }, 1500);
    } catch (err) {
      console.error("API Error:", err);
      const apiErrorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create product. Check API URI or server logs.";
      setMessage({ type: "error", text: apiErrorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open) => {
    onOpenChange(open);
    if (!open) {
      setFormData({ title: "", sku: "", price: "", stock: "" });
      setImageFile(null);
      setImageDataURI(null);
      setTimeout(() => setMessage(null), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onOpenChange={handleOpenChange}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details and upload a main product image. Max size:{" "}
            {MAX_FILE_SIZE_MB}MB.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Premium Headphones"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sku" className="text-right">
              SKU
            </Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="WH-1000XM5 (Optional)"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="345.99"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="50"
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="imageFile" className="text-right pt-2">
              Image
            </Label>
            <div className="col-span-3 flex flex-col space-y-2">
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                required={!imageDataURI}
              />
              {imageFile && imageDataURI && (
                <p className="text-xs text-gray-500 flex items-center">
                  <Upload className="w-3 h-3 mr-1 text-green-500" />
                  {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
                  ready to upload.
                </p>
              )}
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-md flex items-start gap-2 col-span-4 ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- FIX END ---

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          response = await axios.get(
            `${import.meta.env.VITE_API_URI}/products`
          );
          break;
        } catch (err) {
          if (attempt === 2) throw err;
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }

      setProducts(response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please check the API URI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshToggle]);

  const handleProductAdded = () => {
    setRefreshToggle((prev) => !prev);
  };

  const getTagColor = (tag) => {
    const lowerTag = tag.toLowerCase();

    if (lowerTag.includes("limited") || lowerTag.includes("low-stock"))
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (lowerTag.includes("new-arrival") || lowerTag.includes("just in"))
      return "bg-blue-100 text-blue-800 border-blue-200";
    if (lowerTag.includes("best seller") || lowerTag.includes("premium"))
      return "bg-green-100 text-green-800 border-green-200";
    if (lowerTag.includes("ai tag"))
      return "bg-purple-100 text-purple-800 border-purple-200";
    return "bg-gray-100 text-gray-600 border-gray-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mr-2" />
        <p className="text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <p className="text-red-600 text-xl font-medium mb-4">{error}</p>
        <Button onClick={() => setRefreshToggle((prev) => !prev)}>
          <Loader2 className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      <Sidebar />

      <CreateProductDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onProductAdded={handleProductAdded}
      />

      {/* md:ml-64 ensures main content starts after the fixed 64px wide sidebar on desktop */}
      <main className="flex-1 overflow-y-auto md:ml-64">
        <div className="p-4 sm:p-8">
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">
                Products ({products.length})
              </h1>
              <p className="text-gray-500">
                Manage and view all your tagged products.
              </p>
            </div>

            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-500/30"
            >
              <Package className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          {products.length === 0 ? (
            <div className="text-center p-10 sm:p-20 bg-white rounded-xl shadow-lg border border-gray-100">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Products Found
              </h2>
              <p className="text-gray-500 mb-4">
                Click the 'Add Product' button to create your first product.
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Package className="w-4 h-4 mr-2" />
                Add Product Now
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product._id}
                  className="hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-xl">
                    <img
                      src={product.mainImageUrl}
                      alt={product.title || product.name || "Product Image"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x400/f0f0f0/505050?text=No+Image";
                      }}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg truncate">
                      {product.title || product.name || "Untitled Product"}
                    </CardTitle>
                    <p className="text-xs text-gray-500">
                      SKU: {product.sku || "N/A"}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-extrabold text-purple-600">
                          {product.price
                            ? `$${Number(product.price).toFixed(2)}`
                            : "N/A"}
                        </span>
                        <span className="text-sm text-gray-500">
                          Stock:{" "}
                          <span className="ml-1 font-semibold text-gray-800">
                            {product.stock !== undefined
                              ? product.stock
                              : product.inventory !== undefined
                              ? product.inventory
                              : 0}
                          </span>
                        </span>
                      </div>

                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} className={getTagColor(tag)}>
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Button variant="outline" className="w-full mt-4">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
