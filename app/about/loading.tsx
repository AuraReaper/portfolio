export default function Loading() {
  return (
    <div className="pt-16">
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-secondary rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full animate-pulse"></div>
          </div>

          {/* Bio section skeleton */}
          <div className="mb-16">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <div className="h-8 bg-secondary rounded-lg w-48 mb-6 animate-pulse"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-secondary rounded-lg w-full animate-pulse"></div>
                <div className="h-4 bg-secondary rounded-lg w-5/6 animate-pulse"></div>
                <div className="h-4 bg-secondary rounded-lg w-4/6 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <div className="h-6 bg-secondary rounded-lg w-24 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-secondary rounded-lg w-20 animate-pulse"></div>
                </div>
                <div>
                  <div className="h-6 bg-secondary rounded-lg w-16 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-secondary rounded-lg w-32 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills section skeleton */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="h-10 bg-secondary rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-secondary rounded-lg w-96 mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="h-6 bg-secondary rounded-lg w-32 mb-4 animate-pulse"></div>
                  <div className="flex flex-wrap gap-3">
                    {Array.from({
                      length: Math.floor(Math.random() * 4) + 2,
                    }).map((_, j) => (
                      <div
                        key={j}
                        className="h-8 w-20 bg-secondary rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests section skeleton */}
          <div className="mb-16">
            <div className="bg-secondary/30 rounded-xl p-8">
              <div className="h-8 bg-secondary rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 bg-secondary rounded-lg mx-auto mb-4 animate-pulse"></div>
                    <div className="h-6 bg-secondary rounded-lg w-32 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 bg-secondary rounded-lg w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact section skeleton */}
          <div className="text-center">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="h-8 bg-secondary rounded-lg w-48 mx-auto mb-6 animate-pulse"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="h-12 bg-secondary rounded-lg w-48 animate-pulse"></div>
                <div className="h-12 bg-secondary rounded-lg w-48 animate-pulse"></div>
              </div>
              <div className="flex justify-center space-x-6">
                <div className="w-6 h-6 bg-secondary rounded animate-pulse"></div>
                <div className="w-6 h-6 bg-secondary rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
