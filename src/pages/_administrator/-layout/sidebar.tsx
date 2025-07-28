import {
  Sidebar as Base,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LogOutIcon, Rotate3dIcon } from "lucide-react";

export function Sidebar(): React.JSX.Element {
  const { state } = useSidebar();

  return (
    <Base collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/dashboard">
                <Rotate3dIcon className="size-5" />
                <span className="text-base font-semibold">BUSCA CERTI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* {MenuRouteMap?.map((props) => (
          <Menu key={props.title} {...props} />
        ))} */}
      </SidebarContent>
      <SidebarFooter className="p-0">
        <SidebarGroup>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    variant={"outline"}
                    // onClick={() => authentication.signOut()}
                    className="w-full justify-center h-10 gap-3 rounded-lg"
                  >
                    <LogOutIcon />
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        state === "collapsed" && "sr-only"
                      )}
                    >
                      Sair
                    </p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </TooltipTrigger>
            {state === "collapsed" && (
              <TooltipContent side="right">Sair</TooltipContent>
            )}
          </Tooltip>
        </SidebarGroup>
      </SidebarFooter>
    </Base>
  );
}
