import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Star } from "@/shared/constants/icons";

const testimonials = [
  {
    id: 1,
    name: "Rahul Kumawat",
    role: "Landlord",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The team was incredibly professional and helped me find the perfect property. Highly recommend!",
  },

  {
    id: 2,
    name: "Priya Patel",
    role: "Client",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "Excellent service and great communication throughout the process. Couldn't be happier!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="ls-container">
        <CardHeader className="max-w-2xl mx-auto text-center">
          <h2 className="ls-section-title">Happy Clients</h2>

          <p className="ls-section-description my-2">
            Trusted by tenants and property owners across India for seamless
            rental experiences.
          </p>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      className="h-4 w-4"
                    />
                  ))}
                </div>
                {/* Review */}
                <p className="mt-6 text-lg leading-8 text-text-muted dark:text-text-darkMuted">
                  “{testimonial.review}”
                </p>
                {/* User */}
                <div className="flex items-center gap-4 mt-8">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-lg">
                      {testimonial.name}
                    </h4>

                    <p className="text-sm text-text-muted dark:text-text-darkMuted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
