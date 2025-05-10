import { format } from "date-fns";

export interface Mail {
  id: string;
  subject: string;
  from: {
    email: string;
    name: string;
  };
  to: {
    email: string;
    name: string;
  }[];
  date: string;
  body: string;
  read: boolean;
  labels: string[];
  attachments: Attachment[];
  starred: boolean;
  folder: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Mailbox {
  id: string;
  name: string;
  count?: number;
  icon: string;
}

// Mock mailboxes
export const mailboxes: Mailbox[] = [
  { id: "inbox", name: "Inbox", icon: "inbox" },
  { id: "drafts", name: "Drafts", count: 2, icon: "file" },
  { id: "sent", name: "Sent", icon: "send" },
  { id: "junk", name: "Junk", count: 5, icon: "alert-circle" },
  { id: "trash", name: "Trash", icon: "trash" },
  { id: "archive", name: "Archive", icon: "archive" },
];

// Generate a set of mock emails
const generateMockEmails = (count: number, folder: string): Mail[] => {
  const emails: Mail[] = [];
  const today = new Date();
  
  const companies = [
    "Acme Inc", "Globex", "Initech", "Umbrella Corp", "Stark Industries", 
    "Wayne Enterprises", "Cyberdyne Systems", "Hooli", "Pied Piper", "Dunder Mifflin"
  ];
  
  const firstNames = [
    "John", "Emma", "Michael", "Sophia", "James", 
    "Olivia", "William", "Ava", "Alexander", "Isabella"
  ];
  
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", 
    "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"
  ];
  
  const subjects = [
    "Meeting next week", 
    "Project update", 
    "Important announcement", 
    "Quarterly report", 
    "New feature release",
    "Invitation to event",
    "Your account summary",
    "Feedback needed",
    "Action required",
    "Welcome to the team"
  ];
  
  const bodyTemplates = [
    "Hi {name},\n\nI hope this email finds you well. I wanted to follow up on our discussion about {topic}. Let me know when you're available to chat further.\n\nBest regards,\n{sender}",
    "Dear {name},\n\nI'm reaching out to inform you about the upcoming {topic}. Please review the attached documents and let me know if you have any questions.\n\nSincerely,\n{sender}",
    "Hello {name},\n\nJust a quick update on the {topic}. We've made significant progress and are on track to meet our deadlines.\n\nRegards,\n{sender}",
    "{name},\n\nThis is a reminder about the {topic} scheduled for next week. Your participation is crucial for its success.\n\nThanks,\n{sender}",
    "Dear {name},\n\nI'm excited to share some great news about {topic}. Our team has achieved a major milestone!\n\nBest,\n{sender}"
  ];
  
  const topics = [
    "quarterly budget", 
    "marketing campaign", 
    "product launch", 
    "team restructuring", 
    "client presentation",
    "software update",
    "new office location",
    "security protocol",
    "hiring process",
    "company retreat"
  ];
  
  for (let i = 0; i < count; i++) {
    const fromName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const fromCompany = companies[Math.floor(Math.random() * companies.length)];
    const fromEmail = `${fromName.toLowerCase().replace(' ', '.')}@${fromCompany.toLowerCase().replace(' ', '')}.com`;
    
    const toName = "Demo User";
    const toEmail = "demo@example.com";
    
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const bodyTemplate = bodyTemplates[Math.floor(Math.random() * bodyTemplates.length)];
    const body = bodyTemplate
      .replace('{name}', toName)
      .replace('{topic}', topic)
      .replace('{sender}', fromName);
    
    // Generate a random date within the last 30 days
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const attachments: Attachment[] = [];
    // Add random attachments to some emails
    if (Math.random() > 0.7) {
      const fileTypes = ["pdf", "docx", "xlsx", "pptx", "jpg", "png", "zip"];
      const fileNames = [
        "report", "document", "presentation", "spreadsheet", 
        "image", "screenshot", "backup", "proposal", "contract"
      ];
      
      const randomCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < randomCount; j++) {
        const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];
        const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
        const fileSize = Math.floor(Math.random() * 10000000); // Random size up to 10MB
        
        attachments.push({
          id: `attach-${i}-${j}`,
          name: `${fileName}.${fileType}`,
          size: fileSize,
          type: fileType,
          url: "#"
        });
      }
    }
    
    // Generate random labels for some emails
    const allLabels = ["work", "personal", "important", "social", "finance", "updates"];
    const labels: string[] = [];
    
    if (Math.random() > 0.6) {
      const labelCount = Math.floor(Math.random() * 3) + 1;
      const shuffledLabels = [...allLabels].sort(() => 0.5 - Math.random());
      labels.push(...shuffledLabels.slice(0, labelCount));
    }
    
    emails.push({
      id: `mail-${folder}-${i}`,
      subject,
      from: {
        email: fromEmail,
        name: `${fromName} (${fromCompany})`
      },
      to: [{
        email: toEmail,
        name: toName
      }],
      date: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
      body,
      read: Math.random() > 0.5,
      labels,
      attachments,
      starred: Math.random() > 0.8,
      folder
    });
  }
  
  return emails;
};

// Create mock mail data
const createMockMailData = () => {
  const mailData: Record<string, Mail[]> = {};
  
  mailboxes.forEach(mailbox => {
    const count = mailbox.id === "inbox" ? 25 : 
                 mailbox.id === "drafts" ? 2 :
                 mailbox.id === "sent" ? 15 :
                 mailbox.id === "junk" ? 5 :
                 mailbox.id === "trash" ? 10 :
                 mailbox.id === "archive" ? 8 : 0;
                 
    mailData[mailbox.id] = generateMockEmails(count, mailbox.id);
  });
  
  return mailData;
};

// Initialize mock mail data
let mockMailData: Record<string, Mail[]> | null = null;

// Get all mail for a specific mailbox
const getMail = async (mailboxId: string): Promise<Mail[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (!mockMailData) {
    mockMailData = createMockMailData();
  }
  
  return mockMailData[mailboxId] || [];
};

// Get a specific mail by ID
const getMailById = async (mailId: string): Promise<Mail | null> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockMailData) {
    mockMailData = createMockMailData();
  }
  
  // Search for the mail in all mailboxes
  for (const mailbox of Object.values(mockMailData)) {
    const mail = mailbox.find(mail => mail.id === mailId);
    if (mail) {
      // Mark as read when accessed
      mail.read = true;
      return mail;
    }
  }
  
  return null;
};

// Mark a mail as read/unread
const toggleRead = async (mailId: string, read: boolean): Promise<void> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!mockMailData) {
    mockMailData = createMockMailData();
  }
  
  // Find and update the mail
  for (const mailbox of Object.values(mockMailData)) {
    const mail = mailbox.find(mail => mail.id === mailId);
    if (mail) {
      mail.read = read;
      break;
    }
  }
};

// Mark a mail as starred/unstarred
const toggleStarred = async (mailId: string, starred: boolean): Promise<void> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!mockMailData) {
    mockMailData = createMockMailData();
  }
  
  // Find and update the mail
  for (const mailbox of Object.values(mockMailData)) {
    const mail = mailbox.find(mail => mail.id === mailId);
    if (mail) {
      mail.starred = starred;
      break;
    }
  }
};

// Move a mail to another folder
const moveMail = async (mailId: string, targetFolder: string): Promise<void> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockMailData) {
    mockMailData = createMockMailData();
  }
  
  // Find the mail
  let mailToMove: Mail | null = null;
  let sourceFolder: string | null = null;
  
  for (const [folder, mails] of Object.entries(mockMailData)) {
    const mailIndex = mails.findIndex(mail => mail.id === mailId);
    if (mailIndex !== -1) {
      mailToMove = { ...mails[mailIndex], folder: targetFolder };
      sourceFolder = folder;
      // Remove from source folder
      mockMailData[folder].splice(mailIndex, 1);
      break;
    }
  }
  
  // Add to target folder if found
  if (mailToMove && sourceFolder) {
    if (!mockMailData[targetFolder]) {
      mockMailData[targetFolder] = [];
    }
    
    mockMailData[targetFolder].push(mailToMove);
  }
};

export const mailService = {
  mailboxes,
  getMail,
  getMailById,
  toggleRead,
  toggleStarred,
  moveMail,
};