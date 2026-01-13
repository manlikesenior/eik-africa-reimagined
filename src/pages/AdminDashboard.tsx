import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import InquiriesTab from "@/components/admin/InquiriesTab";
import ToursTab from "@/components/admin/ToursTab";
import BlogsTab from "@/components/admin/BlogsTab";
import SubscribersTab from "@/components/admin/SubscribersTab";
import { MessageSquare, Map, FileText, Mail } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

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

interface Subscriber {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_subscribed: boolean | null;
  source: string | null;
  subscribed_at: string;
}

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
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

    // Fetch all data
    fetchInquiries();
    fetchTours();
    fetchBlogs();
    fetchSubscribers();
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("booking_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInquiries(data);
    }
    setLoadingInquiries(false);
  };

  const fetchTours = async () => {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTours(data);
    }
    setLoadingTours(false);
  };

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
    setLoadingBlogs(false);
  };

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from("email_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (!error && data) {
      setSubscribers(data);
    }
    setLoadingSubscribers(false);
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
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const newInquiriesCount = inquiries.filter(i => i.status === "new").length;

  return (
    <div className="min-h-screen bg-secondary">
      <AdminHeader onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
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
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Subscribers</span>
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
            <ToursTab 
              tours={tours} 
              loading={loadingTours} 
              onRefresh={fetchTours} 
            />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogsTab 
              blogs={blogs} 
              loading={loadingBlogs} 
              onRefresh={fetchBlogs} 
            />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersTab 
              subscribers={subscribers} 
              loading={loadingSubscribers} 
              onRefresh={fetchSubscribers} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
