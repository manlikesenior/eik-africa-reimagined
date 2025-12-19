import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Mail, Phone, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

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

const statusColors: Record<string, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  confirmed: "bg-green-500",
  completed: "bg-gray-500"
};

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchInquiries();
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
    }
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("booking_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInquiries(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
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

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={logo} alt="EIK Africa" className="h-10" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin Dashboard</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Booking Inquiries</h1>
          <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : inquiries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No booking inquiries yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {inquiry.first_name} {inquiry.last_name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {inquiry.tour_name || "General Inquiry"}
                      </p>
                    </div>
                    <Select value={inquiry.status} onValueChange={(v) => updateStatus(inquiry.id, v)}>
                      <SelectTrigger className="w-32">
                        <Badge className={statusColors[inquiry.status]}>{inquiry.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 text-primary hover:underline">
                      <Mail className="w-4 h-4" /> {inquiry.email}
                    </a>
                    {inquiry.phone && (
                      <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Phone className="w-4 h-4" /> {inquiry.phone}
                      </a>
                    )}
                    {inquiry.travel_date && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" /> {inquiry.travel_date}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" /> {inquiry.adults} Adults, {inquiry.children} Children
                    </span>
                  </div>
                  {inquiry.message && (
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {inquiry.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Received: {new Date(inquiry.created_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;