import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card = ({ children, className, title, subtitle }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-apex-card rounded-4xl p-8 card-shadow border border-black/5",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-display text-apex-forest">{title}</h3>}
          {subtitle && <p className="text-sm text-apex-text-muted mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const variants = {
    primary: "bg-apex-forest text-white hover:bg-opacity-90",
    secondary: "bg-apex-mint-light text-apex-forest hover:bg-apex-mint",
    outline: "border-2 border-apex-forest text-apex-forest hover:bg-apex-forest hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-8 py-4 rounded-full font-medium transition-all duration-300 disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Badge = ({ children, variant = 'info' }: { children: React.ReactNode, variant?: 'info' | 'warning' | 'critical' }) => {
  const variants = {
    info: "bg-apex-mint-light text-apex-forest",
    warning: "bg-apex-amber/10 text-apex-amber",
    critical: "bg-apex-red/10 text-apex-red"
  };
  
  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase", variants[variant])}>
      {children}
    </span>
  );
};
