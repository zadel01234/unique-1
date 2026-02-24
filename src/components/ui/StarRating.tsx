import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StarRating({ rating, reviewCount, size = "md", className }: StarRatingProps) {
  const sizes = { sm: 12, md: 16, lg: 20 };
  const starSize = sizes[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star <= Math.ceil(rating) && rating % 1 > 0;
          return (
            <span key={star} className="relative inline-block">
              <Star
                size={starSize}
                className="text-neutral-200"
                fill="currentColor"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    size={starSize}
                    className="text-accent"
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className={cn("text-neutral-500", size === "sm" ? "text-xs" : "text-sm")}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
