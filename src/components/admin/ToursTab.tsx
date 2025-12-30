import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  is_published: boolean | null;
  is_featured: boolean | null;
  destinations: string[] | null;
  highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  created_at: string;
}

interface ToursTabProps {
  tours: Tour[];
  loading: boolean;
  onRefresh: () => void;
}

const ToursTab = ({ tours, loading, onRefresh }: ToursTabProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    overview: "",
    duration: "",
    price: "",
    price_note: "",
    image_url: "",
    is_published: true,
    is_featured: false,
    destinations: "",
    highlights: "",
    inclusions: "",
    exclusions: ""
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      overview: "",
      duration: "",
      price: "",
      price_note: "",
      image_url: "",
      is_published: true,
      is_featured: false,
      destinations: "",
      highlights: "",
      inclusions: "",
      exclusions: ""
    });
    setEditingTour(null);
  };

  const openEditDialog = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      slug: tour.slug,
      description: tour.description || "",
      overview: tour.overview || "",
      duration: tour.duration,
      price: tour.price?.toString() || "",
      price_note: tour.price_note || "",
      image_url: tour.image_url || "",
      is_published: tour.is_published ?? true,
      is_featured: tour.is_featured ?? false,
      destinations: tour.destinations?.join(", ") || "",
      highlights: tour.highlights?.join("\n") || "",
      inclusions: tour.inclusions?.join("\n") || "",
      exclusions: tour.exclusions?.join("\n") || ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tourData = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description || null,
      overview: formData.overview || null,
      duration: formData.duration,
      price: formData.price ? parseFloat(formData.price) : null,
      price_note: formData.price_note || null,
      image_url: formData.image_url || null,
      is_published: formData.is_published,
      is_featured: formData.is_featured,
      destinations: formData.destinations ? formData.destinations.split(",").map(d => d.trim()) : null,
      highlights: formData.highlights ? formData.highlights.split("\n").filter(h => h.trim()) : null,
      inclusions: formData.inclusions ? formData.inclusions.split("\n").filter(i => i.trim()) : null,
      exclusions: formData.exclusions ? formData.exclusions.split("\n").filter(e => e.trim()) : null
    };

    if (editingTour) {
      const { error } = await supabase
        .from("tours")
        .update(tourData)
        .eq("id", editingTour.id);

      if (error) {
        toast({ title: "Error updating tour", variant: "destructive" });
      } else {
        toast({ title: "Tour updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        onRefresh();
      }
    } else {
      const { error } = await supabase
        .from("tours")
        .insert([tourData]);

      if (error) {
        toast({ title: "Error creating tour", variant: "destructive" });
      } else {
        toast({ title: "Tour created successfully" });
        setIsDialogOpen(false);
        resetForm();
        onRefresh();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    
    const { error } = await supabase.from("tours").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting tour", variant: "destructive" });
    } else {
      toast({ title: "Tour deleted" });
      onRefresh();
    }
  };

  const togglePublished = async (tour: Tour) => {
    const { error } = await supabase
      .from("tours")
      .update({ is_published: !tour.is_published })
      .eq("id", tour.id);

    if (!error) {
      toast({ title: tour.is_published ? "Tour unpublished" : "Tour published" });
      onRefresh();
    }
  };

  const toggleFeatured = async (tour: Tour) => {
    const { error } = await supabase
      .from("tours")
      .update({ is_featured: !tour.is_featured })
      .eq("id", tour.id);

    if (!error) {
      toast({ title: tour.is_featured ? "Removed from featured" : "Added to featured" });
      onRefresh();
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{tours.length} tours total</p>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Tour</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTour ? "Edit Tour" : "Add New Tour"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="auto-generated if empty" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input id="duration" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 5 Days / 4 Nights" required />
                </div>
                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>

              <div>
                <Label htmlFor="price_note">Price Note</Label>
                <Input id="price_note" value={formData.price_note} onChange={(e) => setFormData({...formData, price_note: e.target.value})} placeholder="e.g., per person sharing" />
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
              </div>

              <div>
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} />
              </div>

              <div>
                <Label htmlFor="overview">Overview</Label>
                <Textarea id="overview" value={formData.overview} onChange={(e) => setFormData({...formData, overview: e.target.value})} rows={3} />
              </div>

              <div>
                <Label htmlFor="destinations">Destinations (comma-separated)</Label>
                <Input id="destinations" value={formData.destinations} onChange={(e) => setFormData({...formData, destinations: e.target.value})} placeholder="e.g., Kenya, Tanzania, Uganda" />
              </div>

              <div>
                <Label htmlFor="highlights">Highlights (one per line)</Label>
                <Textarea id="highlights" value={formData.highlights} onChange={(e) => setFormData({...formData, highlights: e.target.value})} rows={3} />
              </div>

              <div>
                <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                <Textarea id="inclusions" value={formData.inclusions} onChange={(e) => setFormData({...formData, inclusions: e.target.value})} rows={3} />
              </div>

              <div>
                <Label htmlFor="exclusions">Exclusions (one per line)</Label>
                <Textarea id="exclusions" value={formData.exclusions} onChange={(e) => setFormData({...formData, exclusions: e.target.value})} rows={3} />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="is_published" checked={formData.is_published} onCheckedChange={(checked) => setFormData({...formData, is_published: checked})} />
                  <Label htmlFor="is_published">Published</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="is_featured" checked={formData.is_featured} onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})} />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                <Button type="submit">{editingTour ? "Update Tour" : "Create Tour"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {tours.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No tours yet. Add your first tour!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tours.map((tour) => (
            <Card key={tour.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {tour.image_url && (
                      <img src={tour.image_url} alt={tour.title} className="w-24 h-16 object-cover rounded" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{tour.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{tour.duration}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={tour.is_published ? "default" : "secondary"}>
                          {tour.is_published ? "Published" : "Draft"}
                        </Badge>
                        {tour.is_featured && <Badge className="bg-yellow-500">Featured</Badge>}
                        {tour.price && <Badge variant="outline">${tour.price}</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => toggleFeatured(tour)} title={tour.is_featured ? "Remove from featured" : "Add to featured"}>
                      {tour.is_featured ? <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" /> : <StarOff className="w-4 h-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => togglePublished(tour)} title={tour.is_published ? "Unpublish" : "Publish"}>
                      {tour.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(tour)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(tour.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {tour.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tour.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursTab;
