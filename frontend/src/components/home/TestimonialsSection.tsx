import { FaStar } from "react-icons/fa";

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
    <section id="testimonials" className="py-24">
      <div className="ls-container">
        {/* ───────────────── Heading ──────────────── */}

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="ls-section-title">Happy Clients</h2>

          <p className="ls-section-description">
            Trusted by tenants and property owners across India for seamless
            rental experiences.
          </p>
        </div>

        {/* ───────────────── Cards ──────────────── */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="ls-card p-8">
              {/* Stars */}

              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <FaStar key={index} />
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
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>

                  <p className="text-sm text-text-muted dark:text-text-darkMuted">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
