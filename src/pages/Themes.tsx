import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Info, Loader2, Palette } from 'lucide-react';


export default function Themes() {
  const { currentTheme, isLoading, error } = useTheme();

  if (isLoading) {
    return (
      <Layout>
        <Header title='Theme' back={() => window.history.back()} />
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto p-6'>
            <div className='flex items-center justify-center p-8'>
              <Loader2 className='h-6 w-6 animate-spin' />
              <span className='ml-2'>
                <Trans>Loading themes...</Trans>
              </span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Header title='Theme' back={() => window.history.back()} />
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto p-6'>
            <Alert variant='destructive'>
              <Info className='h-4 w-4' />
              <AlertDescription>
                <Trans>Error loading themes</Trans>: {error}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentTheme) {
    return (
      <Layout>
        <Header title='Theme' back={() => window.history.back()} />
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto p-6'>
            <Alert>
              <Info className='h-4 w-4' />
              <AlertDescription>
                <Trans>No theme available</Trans>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </Layout>
    );
  }

  try {
    return (
      <Layout>
        <Header title='Themes' back={() => window.history.back()} />

        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto p-6 space-y-8'>
            {/* Theme Selector */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Palette className='h-5 w-5' />
                  <Trans>Choose Your Theme</Trans>
                </CardTitle>
                <CardDescription>
                  <Trans>Select from our collection of beautiful themes</Trans>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ThemeSelector />
              </CardContent>
            </Card>

            {/* Current Theme Info */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Trans>Current Theme: {currentTheme.displayName}</Trans>
                </CardTitle>
                <CardDescription>
                  <Trans>
                    Preview of the current theme&apos;s color palette and
                    styling.
                  </Trans>
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Color Palette */}
                <div>
                  <Label className='text-base font-semibold mb-3 block'>
                    <Trans>Colors</Trans>
                  </Label>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='space-y-2'>
                      <Label>
                        <Trans>Primary</Trans>
                      </Label>
                      <div className='h-12 rounded-md border bg-primary' />
                    </div>
                    <div className='space-y-2'>
                      <Label>
                        <Trans>Secondary</Trans>
                      </Label>
                      <div className='h-12 rounded-md border bg-secondary' />
                    </div>
                    <div className='space-y-2'>
                      <Label>
                        <Trans>Accent</Trans>
                      </Label>
                      <div className='h-12 rounded-md border bg-accent' />
                    </div>
                    <div className='space-y-2'>
                      <Label>
                        <Trans>Destructive</Trans>
                      </Label>
                      <div className='h-12 rounded-md border bg-destructive' />
                    </div>
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <Label className='text-base font-semibold mb-3 block'>
                    <Trans>Border Radius</Trans>
                  </Label>
                  <div className='space-y-4'>
                    <div>
                      <Trans>Border Radius</Trans>:{' '}
                      {currentTheme.corners?.lg || 'Default'}
                      <div className='mt-2 flex gap-2'>
                        <div className='w-8 h-8 bg-primary rounded-none' />
                        <div className='w-8 h-8 bg-primary rounded-sm' />
                        <div className='w-8 h-8 bg-primary rounded-md' />
                        <div className='w-8 h-8 bg-primary rounded-lg' />
                        <div className='w-8 h-8 bg-primary rounded-xl' />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className='text-base font-semibold mb-3 block'>
                    <Trans>Component Examples</Trans>
                  </Label>
                  <div className='space-y-4'>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <Trans>Card Component</Trans>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <Trans>
                            This is how a card component looks with the current
                            theme.
                          </Trans>
                        </p>
                        <div className='mt-4'>
                          <Input placeholder={t`Input field example`} />
                        </div>
                      </CardContent>
                    </Card>

                    <div className='space-y-4'>
                      <Label className='text-base font-semibold block'>
                        <Trans>Buttons</Trans>
                      </Label>
                      <div className='flex flex-col sm:flex-row gap-2 flex-wrap'>
                        <Button>
                          <Trans>Primary</Trans>
                        </Button>
                        <Button variant='outline'>
                          <Trans>Outline</Trans>
                        </Button>
                        <Button variant='destructive'>
                          <Trans>Destructive</Trans>
                        </Button>
                        <Button variant='ghost'>
                          <Trans>Ghost</Trans>
                        </Button>
                        <Button variant='link'>
                          <Trans>Link</Trans>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Error rendering theme page:', error);
    return (
      <Layout>
        <Header title={t`Themes`} back={() => window.history.back()} />
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto p-6'>
            <Alert variant='destructive'>
              <Info className='h-4 w-4' />
              <AlertDescription>
                Error rendering theme page:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </Layout>
    );
  }
}
