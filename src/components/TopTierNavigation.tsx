
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface TopTierNavigationProps {
  onTopTierClick: () => void;
}

export const TopTierNavigation = ({ onTopTierClick }: TopTierNavigationProps) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">naukri</div>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink className="text-slate-700 hover:text-blue-600 font-medium">
                  Jobs & Responses
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink className="text-slate-700 hover:text-blue-600 font-medium">
                  Resdex
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-700 hover:text-blue-600 font-medium">
                  Airex
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 p-4 space-y-2">
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      Talent Pulse
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      Usage Pulse
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      Job Posting
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      Resdex
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      NFL Report
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      Mobile Solutions
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* TopTier Entry Point */}
              <NavigationMenuItem>
                <Button
                  onClick={onTopTierClick}
                  variant="ghost"
                  className="text-slate-700 hover:text-blue-600 font-medium bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 transition-all duration-300"
                >
                  TopTier
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-700 hover:text-blue-600 font-medium">
                  Analytics
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-4 space-y-2">
                    <NavigationMenuLink className="block px-3 py-2 text-slate-700 hover:bg-slate-100 rounded">
                      Talent Pulse
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-600">
              Recent
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              Search
            </Button>
            <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              naukri talent cloud
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
