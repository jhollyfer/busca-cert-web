import { QueryClient } from "@tanstack/react-query";

export const TanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
    },
  },
});
