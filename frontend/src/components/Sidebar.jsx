import { cn } from "@/lib/utils";
import { AlertCircle, DollarSign, FileText, FolderOpen, LayoutDashboard, Mail, Package, Settings, Sparkles, Tag, Tags, TrendingUp } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";


// Simple utility function (like shadcn's `cn`)
// function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Collections", href: "/collections", icon: FolderOpen },
  ];

  const tagRules = [
    { name: "Just In", href: "/tags/just-in", icon: Tag },
    { name: "Best Seller", href: "/tags/best-seller", icon: TrendingUp},
    { name: "Limited Units", href: "/tags/limited-units", icon: AlertCircle },
    { name: "Misspelt Tags", href: "/tags/mis-spelt", icon: FileText },
    { name: "AI Tags", href: "/tags/ai-tags", icon: Sparkles },
  ];

  const bottomNav = [
    // { name: "Admin Panel", href: "/admin", icon: Settings },
    { name: "Pricing", href: "/pricing", icon: DollarSign },
    { name: "Contact", href: "/contact", icon: Mail },
    { name: "Setting", href: "/setting", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-sidebar-foreground"
        >
          <Tags className="w-6 h-6 text-sidebar-primary" />
          <span>TagMaster</span>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Tag Rules Section */}
        <div className="mt-6">
          <h3 className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
            Tag Rules
          </h3>
          <div className="space-y-1">
            {tagRules.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomNav.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
