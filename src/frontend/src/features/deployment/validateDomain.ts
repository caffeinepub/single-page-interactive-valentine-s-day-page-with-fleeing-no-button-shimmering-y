/**
 * Validates a domain name according to platform rules:
 * - Length must be between 5 and 50 characters
 * - Only letters, numbers, and hyphens are allowed
 * 
 * @param domainName - The domain name to validate
 * @returns An error message if invalid, or null if valid
 */
export function validateDomain(domainName: string): string | null {
  // Check length
  if (domainName.length < 5) {
    return 'Domain name must be at least 5 characters long.';
  }
  
  if (domainName.length > 50) {
    return 'Domain name must be no more than 50 characters long.';
  }
  
  // Check for illegal characters
  const validPattern = /^[a-zA-Z0-9-]+$/;
  if (!validPattern.test(domainName)) {
    return 'Domain name can only contain letters, numbers, and hyphens.';
  }
  
  return null;
}
