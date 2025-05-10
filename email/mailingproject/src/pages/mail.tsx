import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MailList } from "@/components/mail/mail-list";
import { MailDetail } from "@/components/mail/mail-detail";
import { Separator } from "@/components/ui/separator";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { mailService } from "@/lib/mail-service";

export function Mail() {
  const [mailboxName, setMailboxName] = useState("");
  const { mailboxId } = useParams();
  
  useEffect(() => {
    if (mailboxId) {
      const mailbox = mailService.mailboxes.find(m => m.id === mailboxId);
      if (mailbox) {
        setMailboxName(mailbox.name);
      }
    }
  }, [mailboxId]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-2 px-4">
        <h1 className="text-lg font-semibold">{mailboxName}</h1>
      </div>
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={40} minSize={25} maxSize={60}>
            <MailList />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <MailDetail />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}