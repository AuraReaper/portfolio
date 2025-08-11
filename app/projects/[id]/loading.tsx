export default function Loading() {
  return (
    <div className="pt-16">
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back link skeleton */}
          <div className="h-6 bg-secondary rounded-lg w-32 mb-8 animate-pulse"></div>

          {/* Title skeleton */}
          <div className="h-12 bg-secondary rounded-lg w-96 mb-6 animate-pulse"></div>

          {/* Description skeleton */}
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-secondary rounded-lg w-full animate-pulse"></div>
            <div className="h-4 bg-secondary rounded-lg w-5/6 animate-pulse"></div>
            <div className="h-4 bg-secondary rounded-lg w-4/6 animate-pulse"></div>
          </div>

          {/* Image skeleton */}
          <div className="h-96 bg-secondary rounded-lg mb-8 animate-pulse"></div>

          {/* Technologies skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-secondary rounded-lg w-32 mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 bg-secondary rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Links skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 bg-secondary rounded-lg w-40 animate-pulse"></div>
            <div className="h-12 bg-secondary rounded-lg w-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
