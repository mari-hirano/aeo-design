import { OpenNextFunction } from 'open-next/cloudflare-pages';
import type { EventContext } from '@cloudflare/workers-types';

export const onRequest: OpenNextFunction = (context: EventContext) => {
  // Handle both static files and dynamic routes
  return context.next();
}; 