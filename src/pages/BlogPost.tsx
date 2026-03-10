import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";

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
  published_at: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    if (!slug) return;
    
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!error && data) {
      setBlog(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Image */}
      {blog.featured_image && (
        <div className="w-full h-64 md:h-96 relative">
          <img
            src={blog.featured_image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="mb-8">
          {blog.category && (
            <Badge variant="secondary" className="mb-4">{blog.category}</Badge>
          )}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            {blog.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {blog.author}
              </span>
            )}
            {blog.published_at && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> 
                {new Date(blog.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </span>
            )}
          </div>
        </header>

        {blog.content && (
          <div 
            className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-primary prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        )}

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
