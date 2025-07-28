import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "./-layout/header";
import { Sidebar } from "./-layout/sidebar";

export const Route = createFileRoute("/_administrator")({
  component: RouteComponent,
  loader: () => {
    const tokenStorage = localStorage.getItem("token");

    if (!tokenStorage) {
      throw redirect({
        to: "/",
        search: {
          search: undefined,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="relative flex flex-col h-screen w-full overflow-hidden p-8">
        <Header />
        <div className="flex flex-1 flex-col">
          <div className="@container/main ">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
