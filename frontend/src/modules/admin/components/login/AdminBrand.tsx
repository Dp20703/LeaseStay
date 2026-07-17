import { Building2, Home, Shield, Users } from "@/shared/constants/icons";

const FEATURES = [
  {
    icon: Users,
    title: "User Management",
  },
  {
    icon: Building2,
    title: "Owner Verification",
  },
  {
    icon: Home,
    title: "Property Moderation",
  },
  {
    icon: Shield,
    title: "Secure Platform",
  },
];

const AdminBrand = () => {
  return (
    <div className="hidden lg:block">
      <div className="max-w-xl">
        {/* Badge */}

        <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          LeaseStay Administration
        </div>

        {/* Heading */}

        <h1 className="mt-8 text-5xl font-bold leading-tight text-text-light dark:text-text-dark">
          Manage LeaseStay from one secure dashboard.
        </h1>

        {/* Description */}

        <p className="mt-6 text-lg leading-8 text-text-muted dark:text-text-darkMuted">
          Review owners, verify listings, manage users, monitor bookings and
          keep the platform running smoothly.
        </p>

        {/* Cards */}

        <div className="mt-12 grid grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, title }) => (
            <div key={title} className="ls-card flex items-center gap-4 p-5">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Icon size={20} />
              </div>

              <span className="font-medium">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBrand;
