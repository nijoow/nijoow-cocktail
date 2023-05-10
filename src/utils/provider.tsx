"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

export const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: 5000, refetchOnWindowFocus: false },
      },
    })
  );
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>{" "}
    </RecoilRoot>
  );
};
