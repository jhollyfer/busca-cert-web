import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanstackQueryClient } from "./lib/_tanstack";
import { routeTree } from "./route-tree.gen";

const router = createRouter({
  routeTree,
  context: {
    QueryClient: TanstackQueryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <QueryClientProvider client={TanstackQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
