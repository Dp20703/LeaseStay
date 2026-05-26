const LoaderScreen = () => {
  return (
    <div className="ls-loader-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="ls-spinner" />

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoaderScreen;
