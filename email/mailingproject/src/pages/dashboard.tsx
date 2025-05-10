import { Outlet } from "react-router-dom";
import { MailSidebar } from "@/components/mail/mail-sidebar";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function Dashboard() {
  return (
    <div className="h-screen overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={30}
          className={cn("h-full")}
        >
          <MailSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}