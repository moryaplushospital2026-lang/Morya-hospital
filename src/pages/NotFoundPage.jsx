import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/usePageMeta";

export function NotFoundPage() {
  usePageMeta(
    "Page Not Found | Moryaplus Hospital",
    "The page you are looking for could not be found.",
    {
      noindex: true,
    },
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md gradient-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
