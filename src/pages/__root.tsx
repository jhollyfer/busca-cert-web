import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="relative flex flex-col h-screen w-full overflow-hidden">
      <HeadContent />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </main>
  ),
  head: () => ({
    meta: [
      {
        title: "Inicio | BuscaCert",
        description: "Encontre seus certificados de cursos e eventos",
      },
    ],
  }),
});
