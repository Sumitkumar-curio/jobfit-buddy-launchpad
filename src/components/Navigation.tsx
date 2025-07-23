import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sparkles, Upload, Target, Star, Mail } from "lucide-react";

const navigation = [
  { name: "Home", href: "#home", icon: Sparkles },
  { name: "Features", href: "#features", icon: Target },
  { name: "Demo", href: "#demo", icon: Upload },
  { name: "Reviews", href: "#reviews", icon: Star },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigation.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "glass border-b border-white/10 backdrop-blur-xl" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary glow-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl lg:text-2xl font-bold text-gradient-primary">
              JobFit Buddy
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "text-primary bg-primary/10 border border-primary/20" 
                      : "text-muted-foreground hover:text-primary hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 animate-pulse-glow"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" onClick={() => scrollToSection("#demo")}>
              Try Demo
            </Button>
            <Button variant="hero" onClick={() => scrollToSection("#demo")}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 glass border-l border-white/10 backdrop-blur-xl">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary glow-primary flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gradient-primary">JobFit Buddy</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex flex-col gap-2 py-6 flex-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.substring(1);
                    
                    return (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                          isActive 
                            ? "text-primary bg-primary/10 border border-primary/20 glow-primary" 
                            : "text-muted-foreground hover:text-primary hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <div className="border-t border-white/10 pt-6 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => scrollToSection("#demo")}
                  >
                    Try Demo
                  </Button>
                  <Button 
                    variant="hero" 
                    className="w-full" 
                    onClick={() => scrollToSection("#demo")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}