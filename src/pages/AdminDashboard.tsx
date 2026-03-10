import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import InquiriesTab from "@/components/admin/InquiriesTab";
import ToursTab from "@/components/admin/ToursTab";
import BlogsTab from "@/components/admin/BlogsTab";
import EmailLogsTab from "@/components/admin/EmailLogsTab";
import TemplatesTab from "@/components/admin/TemplatesTab";
import { SupabaseConnectionTest } from "@/components/admin/SupabaseConnectionTest";
import { MessageSquare, Map, FileText, Mail, Settings } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";
import { SEO } from "@/components/SEO";
import { Analytics, identifyUser } from "@/lib/analytics";
import { captureError, setUser, addBreadcrumb } from "@/lib/sentry";

interface BookingInquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  tour_name: string | null;
  travel_date: string | null;
  adults: number;
  children: number;
  status: string;
  created_at: string;
  message: string | null;
}

interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  overview: string | null;
  duration: string;
  price: number | null;
  price_note: string | null;
  image_url: string | null;
  gallery: string[] | null;
  is_published: boolean | null;
  is_featured: boolean | null;
  destinations: string[] | null;
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  itinerary: unknown;
  category: string | null;
  pricing_tiers: unknown;
  created_at: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
}

interface EmailLog {
  id: string;
  template_name: string | null;
  recipient_email: string;
  recipient_name: string | null;
  subject: string;
  status: "pending" | "sent" | "failed" | "bounced";
  error_message: string | null;
  booking_inquiry_id: string | null;
  sent_at: string | null;
  created_at: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  description: string | null;
  subject: string;
  html_template: string;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingEmailLogs, setLoadingEmailLogs] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    // Track admin dashboard view
    Analytics.pageView("admin_dashboard");
    addBreadcrumb("Admin dashboard loaded", "navigation");
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: adminData } = await supabase
      .from("admin_users")
      .select("id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (!adminData) {
      await supabase.auth.signOut();
      navigate("/admin");
      return;
    }

    // Set user context for analytics and error tracking
    identifyUser(session.user.id, { email: session.user.email });
    setUser({ id: session.user.id, email: session.user.email || undefined });

    // Fetch all data
    fetchInquiries();
    fetchTours();
    fetchBlogs();
    fetchEmailLogs();
    fetchEmailTemplates();
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("booking_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching inquiries:", error);
      captureError(new Error(`Failed to fetch inquiries: ${error.message}`), { context: "admin_dashboard" });
      toast({
        title: "Failed to fetch inquiries",
        description: error.message,
        variant: "destructive"
      });
    } else if (data) {
      setInquiries(data);
    }
    setLoadingInquiries(false);
  };

  const fetchTours = async () => {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tours:", error);
      captureError(new Error(`Failed to fetch tours: ${error.message}`), { context: "admin_dashboard" });
      toast({
        title: "Failed to fetch tours",
        description: error.message,
        variant: "destructive"
      });
    } else if (data) {
      console.log(`Fetched ${data.length} tours from database`);
      setTours(data);
    }
    setLoadingTours(false);
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      captureError(new Error(`Failed to fetch blogs: ${error.message}`), { context: "admin_dashboard" });
      toast({
        title: "Failed to fetch blogs",
        description: error.message,
        variant: "destructive"
      });
    } else if (data) {
      setBlogs(data);
    }
    setLoadingBlogs(false);
  };

  const fetchEmailLogs = async () => {
    const { data, error } = await supabase
      .from("email_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching email logs:", error);
      // Table may not exist yet if migration hasn't run
    } else if (data) {
      setEmailLogs(data as EmailLog[]);
    }
    setLoadingEmailLogs(false);
  };

  const fetchEmailTemplates = async () => {
    const { data, error } = await supabase
      .from("email_templates")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching email templates:", error);
      // Table may not exist yet if migration hasn't run
    } else if (data) {
      setEmailTemplates(data as EmailTemplate[]);
    }
    setLoadingTemplates(false);
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("booking_inquiries")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
      toast({ title: "Status updated" });
    }
  };

  const handleLogout = async () => {
    addBreadcrumb("Admin logged out", "auth");
    setUser(null);
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const newInquiriesCount = inquiries.filter(i => i.status === "new").length;

  return (
    <div className="min-h-screen bg-secondary">
      <SEO 
        title="Admin Dashboard" 
        description="Manage tours, blogs, and inquiries"
        noIndex={true}
      />
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Inquiries</span>
              {newInquiriesCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{newInquiriesCount}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Tours</span>
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Blogs</span>
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Emails</span>
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries">
            <InquiriesTab 
              inquiries={inquiries} 
              loading={loadingInquiries} 
              onUpdateStatus={updateInquiryStatus} 
            />
          </TabsContent>

          <TabsContent value="tours">
            <div className="space-y-6">
              <SupabaseConnectionTest />
              <ToursTab 
                tours={tours} 
                loading={loadingTours} 
                onRefresh={fetchTours} 
              />
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <BlogsTab 
              blogs={blogs} 
              loading={loadingBlogs} 
              onRefresh={fetchBlogs} 
            />
          </TabsContent>

          <TabsContent value="emails">
            <EmailLogsTab
              logs={emailLogs}
              loading={loadingEmailLogs}
              onRefresh={fetchEmailLogs}
            />
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesTab
              templates={emailTemplates}
              loading={loadingTemplates}
              onRefresh={fetchEmailTemplates}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
