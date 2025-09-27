import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/university-dashboard",
      icon: "LayoutDashboard",
    },
    { name: "Verification", path: "/certificate-verification", icon: "Shield" },
    { name: "Upload", path: "/certificate-upload", icon: "Upload" },
    { name: "Reports", path: "/verification-reports", icon: "FileText" },
  ];

  const moreItems = [
    { name: "Admin", path: "/admin-dashboard", icon: "Settings" },
    {
      name: "Student Portal",
      path: "/student-dashboard",
      icon: "GraduationCap",
    },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100 shadow-elevation-1 bg-white">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link
          to="/university-dashboard"
          className="flex items-center space-x-3"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Shield" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-foreground tracking-tight">
              AuthentiGrade
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Credential Verification
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.name}</span>
            </Link>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="flex items-center space-x-2"
            >
              <Icon name="MoreHorizontal" size={18} />
              <span>More</span>
            </Button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-2 z-200">
                {moreItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
                      isActivePath(item?.path)
                        ? "bg-accent text-accent-foreground"
                        : "text-popover-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></span>
          </Button>

          <div className="w-px h-6 bg-border"></div>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <span className="text-sm font-medium">Admin</span>
            <Icon name="ChevronDown" size={16} />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="lg:hidden"
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.name}</span>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Admin User
                  </div>
                  <div className="text-xs text-muted-foreground">
                    admin@certifyguard.com
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Bell" size={18} />
                  <span>Notifications</span>
                  <span className="w-2 h-2 bg-warning rounded-full ml-auto"></span>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
