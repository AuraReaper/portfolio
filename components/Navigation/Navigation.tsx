'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavigationProps, NavItem } from '@/types';

const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export function Navigation({
  items = navigationItems,
  className,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            Yash.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActiveLink(item.href)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                )}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 relative">
              <span
                className={cn(
                  'absolute block h-0.5 w-6 bg-current transition-transform duration-200 ease-in-out',
                  isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
                )}
              />
              <span
                className={cn(
                  'absolute block h-0.5 w-6 bg-current transition-opacity duration-200 ease-in-out',
                  isMobileMenuOpen ? 'opacity-0' : 'top-3'
                )}
              />
              <span
                className={cn(
                  'absolute block h-0.5 w-6 bg-current transition-transform duration-200 ease-in-out',
                  isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-4 border-t border-border">
            {items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActiveLink(item.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
