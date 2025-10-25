import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FolderOpen, Package } from "lucide-react";
import React from "react";

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "Summer Collection 2024",
      productCount: 156,
      tags: 89,
      lastUpdated: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    },
    {
      id: 2,
      name: "Premium Electronics",
      productCount: 234,
      tags: 142,
      lastUpdated: "5 hours ago",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    },
    {
      id: 3,
      name: "Fitness & Sports",
      productCount: 178,
      tags: 103,
      lastUpdated: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    },
    {
      id: 4,
      name: "Fashion Accessories",
      productCount: 312,
      tags: 198,
      lastUpdated: "3 hours ago",
      image:
        "https://images.unsplash.com/photo-1509941943102-10c232535736?w=400",
    },
    {
      id: 5,
      name: "Limited Edition",
      productCount: 45,
      tags: 34,
      lastUpdated: "4 hours ago",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
    },
    {
      id: 6,
      name: "Summer Collection 2024",
      productCount: 156,
      tags: 89,
      lastUpdated: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    },
    {
      id: 7,
      name: "Premium Electronics",
      productCount: 234,
      tags: 142,
      lastUpdated: "5 hours ago",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    },

    {
      id: 8,
      name: "Fitness & Sports",
      productCount: 178,
      tags: 103,
      lastUpdated: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    },
    {
      id: 9,
      name: "Fashion Accessories",
      productCount: 312,
      tags: 198,
      lastUpdated: "3 hours ago",
      image:
        "https://images.unsplash.com/photo-1509941943102-10c232535736?w=400",
    },
    {
      id: 10,
      name: "Limited Edition",
      productCount: 45,
      tags: 34,
      lastUpdated: "4 hours ago",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Collections</h1>
              <p className="text-muted-foreground">
                Organize products into collections and manage tags
              </p>
            </div>
            <Button>
              <FolderOpen className="w-4 h-4 mr-2" />
              New Collection
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{collection.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Updated {collection.lastUpdated}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span>{collection.productCount} products</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {collection.tags} tags
                      </Badge>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collections;
