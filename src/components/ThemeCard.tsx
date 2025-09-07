import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Check, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { applyThemeIsolated, Theme } from 'theme-o-rama';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface ThemeCardProps {
  theme: Theme;
  currentTheme: Theme;
  isSelected: boolean;
  onSelect: (themeName: string) => void;
  variant?: 'default' | 'compact' | 'simple';
  className?: string;
}

export function ThemeCard({
  theme,
  currentTheme,
  isSelected,
  onSelect,
  variant = 'default',
  className = '',
}: ThemeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    if (cardRef.current) {
      // Apply the theme with complete isolation from ambient theme
      applyThemeIsolated(theme, cardRef.current);
    }
  }, [theme]);

  // Only apply selection outline as inline style
  const selectionStyle = isSelected
    ? {
        outline: `2px solid ${currentTheme.colors?.primary || 'hsl(220 13% 91%)'}`,
      }
    : {};

  const renderDefaultContent = () => {
    const checkStyles: Record<string, string | undefined> = {};
    if (currentTheme.colors?.primary) {
      checkStyles.color = currentTheme.colors.primary;
    } else {
      checkStyles.color = 'hsl(220 13% 91%)'; // Default gray
    }

    return (
      <div className='p-4'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='font-medium text-sm text-foreground font-heading'>
            {theme.displayName}
          </h3>
          <div className='flex items-center gap-2'>
            {isSelected && <Check className='h-4 w-4' style={checkStyles} />}
            {theme.isUserTheme && (
              <Button
                onClick={handleDeleteClick}
                variant='ghost'
                size='icon'
                aria-label={t`Delete theme ${theme.displayName}`}
                title={t`Delete theme ${theme.displayName}`}
              >
                <Trash2
                  className='h-4 w-4 text-destructive'
                  aria-hidden='true'
                />
              </Button>
            )}
          </div>
        </div>

        {/* Theme preview */}
        <div className='space-y-2'>
          <div className='h-8 flex items-center px-2 bg-primary text-primary-foreground rounded-md shadow-button'>
            <span className='text-xs font-medium font-body'>Aa</span>
          </div>
          <div className='flex gap-1'>
            <div className='h-4 w-4 bg-primary rounded-sm' />
            <div className='h-4 w-4 bg-secondary rounded-sm' />
            <div className='h-4 w-4 bg-accent rounded-sm' />
            <div className='h-4 w-4 bg-destructive rounded-sm' />
          </div>
          <div className='text-xs truncate text-muted-foreground font-body'>
            {theme.fonts?.heading?.split(',')[0] || 'Default'}
          </div>
        </div>
      </div>
    );
  };

  const renderSimpleContent = () => {
    const checkStyles: Record<string, string | undefined> = {};
    if (currentTheme.colors?.primary) {
      checkStyles.color = currentTheme.colors.primary;
    } else {
      checkStyles.color = 'currentColor';
    }

    return (
      <div className='p-3'>
        <div className='flex items-center justify-between mb-2'>
          <h4 className='font-medium text-xs text-foreground font-heading'>
            {theme.displayName}
          </h4>
          <div className='flex items-center gap-1'>
            {isSelected && (
              <Check
                className='h-3 w-3'
                style={checkStyles}
                aria-label={t`Theme selected`}
              />
            )}
            {theme.isUserTheme && (
              <Button
                onClick={handleDeleteClick}
                variant='ghost'
                size='icon'
                aria-label={t`Delete theme ${theme.displayName}`}
                title={t`Delete theme ${theme.displayName}`}
              >
                <Trash2
                  className='h-4 w-4 text-destructive'
                  aria-hidden='true'
                />
              </Button>
            )}
          </div>
        </div>

        <div className='flex gap-1'>
          <div className='h-2 w-2 bg-primary rounded-sm' />
          <div className='h-2 w-2 bg-secondary rounded-sm' />
          <div className='h-2 w-2 bg-accent rounded-sm' />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`cursor-pointer transition-all hover:opacity-90 text-card-foreground border border-border rounded-lg shadow-card theme-card-isolated ${
          isSelected ? 'ring-2' : 'hover:ring-1'
        } ${className}`}
        style={selectionStyle}
        onClick={() => onSelect(theme.name)}
      >
        {variant === 'simple' ? renderSimpleContent() : renderDefaultContent()}
      </div>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Trans>Delete Theme</Trans>
            </DialogTitle>
            <DialogDescription>
              <Trans>
                Are you sure you want to delete the theme &quot;
                {theme.displayName}&quot;?
              </Trans>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setShowDeleteConfirm(false)}
            >
              <Trans>Cancel</Trans>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
