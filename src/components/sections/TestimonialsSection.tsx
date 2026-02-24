import StarRating from "@/components/ui/StarRating";
import { reviews } from "@/hooks/useProducts";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-neutral-50" aria-label="Customer Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto text-center">
            Trusted by thousands of farmers and mechanics across Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
            >
              <StarRating rating={review.rating} size="sm" className="mb-4" />
              <blockquote className="text-neutral-700 italic mb-6 leading-relaxed">
                &ldquo;{review.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 flex-shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {review.author[0]}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-neutral-800">{review.author}</div>
                  <div className="text-sm text-neutral-500">
                    {review.role}, {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
