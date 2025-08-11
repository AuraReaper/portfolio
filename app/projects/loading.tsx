export default function Loading() {
  return (
    <div className="pt-16">
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 bg-secondary rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-secondary rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>

          {/* Search and filter skeleton */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="h-10 bg-secondary rounded-lg w-full md:w-80 animate-pulse"></div>
            <div className="h-10 bg-secondary rounded-lg w-full md:w-40 animate-pulse"></div>
          </div>

          {/* Project grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-secondary animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-secondary rounded-lg mb-3 animate-pulse"></div>
                  <div className="h-4 bg-secondary rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-4 bg-secondary rounded-lg mb-4 w-3/4 animate-pulse"></div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-6 w-16 bg-secondary rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                  <div className="h-4 bg-secondary rounded-lg w-24 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
