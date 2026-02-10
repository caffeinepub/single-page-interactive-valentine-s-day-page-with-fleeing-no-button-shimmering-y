import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { validateDomain } from './validateDomain';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

export function DeploymentDomainDialog() {
  const [open, setOpen] = useState(false);
  const [domainName, setDomainName] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { actor } = useActor();

  const deployMutation = useMutation({
    mutationFn: async (domain: string) => {
      if (!actor) {
        throw new Error('Backend actor not available');
      }
      await actor.deployApp(domain);
    },
    onSuccess: () => {
      setOpen(false);
      setDomainName('');
      setValidationError(null);
    },
    onError: (error: Error) => {
      setValidationError(error.message || 'Failed to deploy with this domain name.');
    },
  });

  const handleDomainChange = (value: string) => {
    setDomainName(value);
    // Clear validation error when user types
    if (validationError) {
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    const error = validateDomain(domainName);
    if (error) {
      setValidationError(error);
      return;
    }
    
    // Deploy with validated domain
    deployMutation.mutate(domainName);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-valentine-text/70 hover:text-valentine-accent"
        >
          <Settings className="mr-2 h-4 w-4" />
          Change Domain
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Deployment Domain</DialogTitle>
            <DialogDescription>
              Choose a domain name for your app. Must be 5-50 characters and contain only letters, numbers, and hyphens.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                value={domainName}
                onChange={(e) => handleDomainChange(e.target.value)}
                placeholder="my-valentine-app"
                disabled={deployMutation.isPending}
                className={validationError ? 'border-destructive' : ''}
              />
              {validationError && (
                <p className="text-sm text-destructive">{validationError}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={deployMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={deployMutation.isPending || !domainName}>
              {deployMutation.isPending ? 'Deploying...' : 'Deploy'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
