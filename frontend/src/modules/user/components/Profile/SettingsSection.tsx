import type { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => {
  return (
    <div className="ls-card p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="text-text-muted dark:text-text-darkMuted mt-2">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
};

export default SettingsSection;
