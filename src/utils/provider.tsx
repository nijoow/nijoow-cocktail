"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
