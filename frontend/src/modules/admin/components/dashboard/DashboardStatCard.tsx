import { ArrowUpRight } from "@/shared/constants/icons";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type DashboardStatCardProps = {
  title: string;
  value: number | string;
  change: string;
  color: string;
  path: string;
  icon: LucideIcon;
};

const DashboardStatCard = ({
  title,
  value,
  change,
  color,
  path,
  icon: Icon,
}: DashboardStatCardProps) => {
  return (
    <div className=" ls-card group p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-current/10
            ${color}
          `}
        >
          <Icon size={22} />
        </div>

        <Link to={`/admin/${path}`}>
          <ArrowUpRight
            size={18}
            className="text-text-muted transition group-hover:text-primary"
          />
        </Link>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-text-muted dark:text-text-darkMuted">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">{value}</h2>

        <p className="mt-3 text-sm text-emerald-500">{change}</p>
      </div>
    </div>
  );
};

export default DashboardStatCard;
