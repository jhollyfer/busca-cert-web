import { HomePage } from "@/features/home/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      search: search?.search?.toString(),
    };
  },
});

function RouteComponent() {
  return <HomePage />;
}
