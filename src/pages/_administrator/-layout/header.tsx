// import { ThemeToggle } from "@/components/theme-toggle";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="w-full py-4 inline-flex gap-2 px-4 justify-center border-b">
      <nav className="container max-w-full inline-flex justify-between">
        <div className="inline-flex gap-2">
          <SidebarTrigger
            variant="outline"
            className="scale-125 sm:scale-100"
          />
          {/* <Separator orientation="vertical" className="h-6" /> */}
          {/* <h2>{route?.title || "Dashboard"}</h2> */}
        </div>
        {/* <div className="inline-flex gap-2"> */}
        {/* <ThemeToggle /> */}
        {/* <Profile /> */}
        {/* </div> */}
      </nav>
    </header>
  );
}
