import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, isToday, isYesterday, isThisYear } from "date-fns";
import { Mail, mailService } from "@/lib/mail-service";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function MailList() {
  const [mails, setMails] = useState<Mail[]>([]);
  const [selectedMails, setSelectedMails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { mailboxId, mailId } = useParams();

  // Fetch mails for the current mailbox
  useEffect(() => {
    async function fetchMails() {
      if (!mailboxId) return;
      
      setIsLoading(true);
      try {
        const fetchedMails = await mailService.getMail(mailboxId);
        setMails(fetchedMails);
      } catch (error) {
        console.error("Failed to fetch mails:", error);
        toast.error("Failed to load emails");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMails();
    // Reset selection when changing mailbox
    setSelectedMails([]);
  }, [mailboxId]);

  // Filter mails based on search query
  const filteredMails = mails.filter(mail => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      mail.subject.toLowerCase().includes(query) ||
      mail.from.name.toLowerCase().includes(query) ||
      mail.from.email.toLowerCase().includes(query) ||
      mail.body.toLowerCase().includes(query)
    );
  });

  // Handle mail selection
  const toggleMailSelection = (mailId: string) => {
    setSelectedMails(prevSelected => 
      prevSelected.includes(mailId)
        ? prevSelected.filter(id => id !== mailId)
        : [...prevSelected, mailId]
    );
  };

  // Format date for display
  const formatMailDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisYear(date)) {
      return format(date, "MMM d");
    } else {
      return format(date, "MM/dd/yyyy");
    }
  };

  // Handle mail star toggle
  const handleStarToggle = async (mail: Mail, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      await mailService.toggleStarred(mail.id, !mail.starred);
      
      // Update local state
      setMails(mails.map(m => 
        m.id === mail.id ? { ...m, starred: !m.starred } : m
      ));
      
      toast.success(mail.starred ? "Email unmarked" : "Email starred");
    } catch (error) {
      console.error("Failed to toggle star:", error);
      toast.error("Failed to update email");
    }
  };

  // Handle clicking a mail to view it
  const handleMailClick = (mail: Mail) => {
    navigate(`/mail/${mailboxId}/${mail.id}`);
    
    // Mark as read if not already
    if (!mail.read) {
      mailService.toggleRead(mail.id, true);
      
      // Update local state
      setMails(mails.map(m => 
        m.id === mail.id ? { ...m, read: true } : m
      ));
    }
  };

  // Handle bulk actions
  const handleMarkAsRead = async () => {
    if (selectedMails.length === 0) return;
    
    try {
      // Update each selected mail
      for (const id of selectedMails) {
        await mailService.toggleRead(id, true);
      }
      
      // Update local state
      setMails(mails.map(mail => 
        selectedMails.includes(mail.id) ? { ...mail, read: true } : mail
      ));
      
      setSelectedMails([]);
      toast.success(`${selectedMails.length} emails marked as read`);
    } catch (error) {
      console.error("Failed to mark emails as read:", error);
      toast.error("Failed to update emails");
    }
  };

  const handleDelete = async () => {
    if (selectedMails.length === 0 || !mailboxId) return;
    
    try {
      // Move each selected mail to trash
      for (const id of selectedMails) {
        await mailService.moveMail(id, "trash");
      }
      
      // Update local state by removing the deleted mails
      setMails(mails.filter(mail => !selectedMails.includes(mail.id)));
      
      setSelectedMails([]);
      toast.success(`${selectedMails.length} emails moved to trash`);
    } catch (error) {
      console.error("Failed to delete emails:", error);
      toast.error("Failed to move emails to trash");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mail list header */}
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={
              filteredMails.length > 0 && 
              selectedMails.length === filteredMails.length
            } 
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedMails(filteredMails.map(mail => mail.id));
              } else {
                setSelectedMails([]);
              }
            }}
          />
          {selectedMails.length > 0 ? (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleMarkAsRead}
                title="Mark as read"
              >
                <Icons.mail className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleDelete}
                title="Delete"
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  mailboxId && mailService.getMail(mailboxId)
                    .then(fetchedMails => {
                      setMails(fetchedMails);
                      setIsLoading(false);
                    })
                    .catch(() => {
                      toast.error("Failed to refresh");
                      setIsLoading(false);
                    });
                }, 500);
              }}
              title="Refresh"
            >
              <Icons.refresh className={cn(
                "h-4 w-4",
                isLoading && "animate-spin"
              )} />
            </Button>
          )}
        </div>
        <div className="relative w-full max-w-md ml-4">
          <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search emails..."
            className="pl-8 w-full bg-secondary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mail list */}
      {isLoading ? (
        <div className="flex items-center justify-center flex-1 p-8">
          <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredMails.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
          <Icons.mail className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-1">No emails found</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? "Try a different search term" 
              : `Your ${mailboxId} is empty`}
          </p>
        </div>
      ) : (
        <div className="overflow-auto flex-1">
          <div className="divide-y">
            {filteredMails.map((mail) => (
              <div
                key={mail.id}
                className={cn(
                  "flex items-start py-3 px-4 hover:bg-accent/50 transition-colors cursor-pointer",
                  mail.id === mailId && "bg-accent",
                  !mail.read && "bg-accent/30"
                )}
                onClick={() => handleMailClick(mail)}
              >
                <div className="flex items-center mr-2">
                  <Checkbox
                    className="mr-2"
                    checked={selectedMails.includes(mail.id)}
                    onCheckedChange={() => toggleMailSelection(mail.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-muted-foreground"
                    onClick={(e) => handleStarToggle(mail, e)}
                  >
                    <Icons.star
                      className={cn(
                        "h-4 w-4",
                        mail.starred && "fill-yellow-400 text-yellow-400"
                      )}
                    />
                  </Button>
                </div>
                <div className="min-w-0 flex-1 pr-10 relative">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <div className="font-medium truncate pr-2" style={{ maxWidth: "calc(100% - 80px)" }}>
                      {mail.from.name}
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatMailDate(mail.date)}
                    </div>
                  </div>
                  <div className="font-medium mb-0.5 truncate">
                    {mail.subject}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {mail.body.split('\n')[0]}
                  </div>
                  
                  {/* Badges for labels */}
                  {mail.labels.length > 0 && (
                    <div className="flex mt-1.5 space-x-1">
                      {mail.labels.map((label) => (
                        <Badge key={label} variant="outline" className="text-xs py-0">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Attachment indicator */}
                  {mail.attachments.length > 0 && (
                    <div className="absolute right-0 bottom-0">
                      <Icons.file className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}