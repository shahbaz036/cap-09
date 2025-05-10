import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Mail, mailService, Attachment } from "@/lib/mail-service";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function MailDetail() {
  const [mail, setMail] = useState<Mail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mailId, mailboxId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMail() {
      if (!mailId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const fetchedMail = await mailService.getMailById(mailId);
        setMail(fetchedMail);
      } catch (error) {
        console.error("Failed to fetch mail:", error);
        toast.error("Failed to load email");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMail();
  }, [mailId]);

  // Handle star toggle
  const handleStarToggle = async () => {
    if (!mail) return;
    
    try {
      await mailService.toggleStarred(mail.id, !mail.starred);
      setMail({ ...mail, starred: !mail.starred });
      toast.success(mail.starred ? "Email unmarked" : "Email starred");
    } catch (error) {
      console.error("Failed to toggle star:", error);
      toast.error("Failed to update email");
    }
  };

  // Format date for display
  const formatMailDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy 'at' h:mm a");
  };

  // Handle mail actions
  const handleDelete = async () => {
    if (!mail) return;
    
    try {
      await mailService.moveMail(mail.id, "trash");
      toast.success("Email moved to trash");
      navigate(`/mail/${mailboxId}`);
    } catch (error) {
      console.error("Failed to delete mail:", error);
      toast.error("Failed to move email to trash");
    }
  };

  const handleArchive = async () => {
    if (!mail) return;
    
    try {
      await mailService.moveMail(mail.id, "archive");
      toast.success("Email archived");
      navigate(`/mail/${mailboxId}`);
    } catch (error) {
      console.error("Failed to archive mail:", error);
      toast.error("Failed to archive email");
    }
  };

  // Render attachment item
  const renderAttachment = (attachment: Attachment) => {
    const getFileIcon = () => {
      const type = attachment.type.toLowerCase();
      if (type === "pdf") return <Icons.file className="h-6 w-6 text-red-500" />;
      if (["docx", "doc"].includes(type)) return <Icons.file className="h-6 w-6 text-blue-500" />;
      if (["xlsx", "xls"].includes(type)) return <Icons.file className="h-6 w-6 text-green-500" />;
      if (["pptx", "ppt"].includes(type)) return <Icons.file className="h-6 w-6 text-orange-500" />;
      if (["jpg", "jpeg", "png", "gif"].includes(type)) return <Icons.file className="h-6 w-6 text-purple-500" />;
      return <Icons.file className="h-6 w-6 text-gray-500" />;
    };

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return bytes + " B";
      else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
      else return (bytes / 1048576).toFixed(1) + " MB";
    };

    return (
      <div className="flex items-center p-2 border rounded-md hover:bg-accent/50 transition-colors">
        {getFileIcon()}
        <div className="ml-2 flex-1 min-w-0">
          <p className="font-medium truncate">{attachment.name}</p>
          <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-2">
          <Icons.arrowLeft className="h-4 w-4 rotate-180" />
        </Button>
      </div>
    );
  };

  // No mail selected state
  if (!mailId) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Icons.mail className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No email selected</h3>
        <p className="text-muted-foreground max-w-md">
          Select an email from the list to view its contents
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Icons.spinner className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Email not found state
  if (!mail) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Icons.alertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Email not found</h3>
        <p className="text-muted-foreground max-w-md">
          The email you're looking for doesn't exist or has been deleted.
        </p>
        <Button 
          className="mt-4" 
          variant="outline"
          onClick={() => navigate(`/mail/${mailboxId}`)}
        >
          Back to inbox
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Email header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/mail/${mailboxId}`)}
            title="Back to inbox"
          >
            <Icons.arrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="ml-2 font-semibold truncate max-w-md">
            {mail.subject}
          </h2>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStarToggle}
            title={mail.starred ? "Unstar" : "Star"}
          >
            <Icons.star
              className={cn(
                "h-5 w-5",
                mail.starred && "fill-yellow-400 text-yellow-400"
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleArchive}
            title="Archive"
          >
            <Icons.archive className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            title="Delete"
          >
            <Icons.trash className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Email content */}
      <div className="overflow-auto flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Sender info */}
          <div className="flex items-start mb-4">
            <Avatar className="h-10 w-10 mr-4">
              <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center text-lg font-semibold">
                {mail.from.name.charAt(0)}
              </div>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-lg truncate">
                  {mail.from.name}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {formatMailDateTime(mail.date)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                to {mail.to.map(recipient => recipient.name).join(", ")}
              </p>
            </div>
          </div>

          {/* Labels */}
          {mail.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {mail.labels.map(label => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          {/* Message body */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {mail.body.split('\n').map((paragraph, i) => (
              <p key={i} className="my-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Attachments */}
          {mail.attachments.length > 0 && (
            <div className="mt-6">
              <Separator className="my-4" />
              <h4 className="font-medium mb-2 flex items-center">
                <Icons.file className="mr-2 h-4 w-4" />
                Attachments ({mail.attachments.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {mail.attachments.map(attachment => (
                  <div key={attachment.id}>
                    {renderAttachment(attachment)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}