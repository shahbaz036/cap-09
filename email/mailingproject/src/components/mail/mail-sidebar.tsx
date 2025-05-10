import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { mailService, Mailbox } from "@/lib/mail-service";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { useAuth } from "@/providers/auth-provider";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTheme } from "@/providers/theme-provider";

export function MailSidebar() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const { mailboxes } = mailService;
  const { mailboxId } = useParams();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  // Function to get icon for each mailbox
  const getMailboxIcon = (mailbox: Mailbox) => {
    const IconComponent = Icons[mailbox.icon as keyof typeof Icons] || Icons.mail;
    return <IconComponent className="h-4 w-4 mr-2" />;
  };

  return (
    <>
      <div className="flex flex-col h-full border-r">
        {/* Header with user info */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Icons.mail className="h-6 w-6 mr-2 text-primary" />
            <h1 className="font-semibold text-lg">Mail</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} />
                  ) : (
                    <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-sm font-semibold">
                      {user?.name.charAt(0)}
                    </div>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.user className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
              >
                {theme === "light" ? (
                  <Icons.moon className="mr-2 h-4 w-4" />
                ) : (
                  <Icons.sun className="mr-2 h-4 w-4" />
                )}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <Icons.logout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Compose button */}
        <div className="p-4">
          <Button 
            onClick={() => setIsComposeOpen(true)}
            className="w-full justify-start"
          >
            <Icons.pencil className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>

        <Separator />

        {/* Mailboxes list */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            <nav className="grid gap-1 px-2 group">
              {mailboxes.map((mailbox) => (
                <NavLink
                  key={mailbox.id}
                  to={`/mail/${mailbox.id}`}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors",
                      isActive && "bg-accent font-medium"
                    )
                  }
                >
                  {getMailboxIcon(mailbox)}
                  <span>{mailbox.name}</span>
                  {mailbox.count !== undefined && mailbox.count > 0 && (
                    <span className="ml-auto text-xs bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center">
                      {mailbox.count}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Compose Dialog */}
      <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">To:</label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="recipient@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm">Subject:</label>
              <input
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Subject"
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <textarea
                className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type your message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsComposeOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setIsComposeOpen(false);
                // This would normally send the email
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}