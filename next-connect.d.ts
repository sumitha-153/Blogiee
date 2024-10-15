declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
  
    type NextConnectOptions = {
      onError?: (error: unknown, req: NextApiRequest, res: NextApiResponse) => void;
      onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void;
    };
  
    export default function nextConnect(options?: NextConnectOptions): {
      get: (handler: (req: NextApiRequest, res: NextApiResponse) => void) => void;
      post: (handler: (req: NextApiRequest, res: NextApiResponse) => void) => void;
      // Add other methods as needed
      // Example:
      put?: (handler: (req: NextApiRequest, res: NextApiResponse) => void) => void;
      delete?: (handler: (req: NextApiRequest, res: NextApiResponse) => void) => void;
      // Add more if necessary
    };
  }
  