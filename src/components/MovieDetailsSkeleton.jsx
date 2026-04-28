import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/Container";
import MovieTrailerPlayerSkeleton from "./MovieTrailerPlayerSkeleton";
import MovieHeaderSkeleton from "./MovieHeaderSkeleton";
import MovieCrewSkeleton from "./MovieCrewSkeleton";
import TopCastSkeleton from "./TopCastSkeleton";

function MovieDetailsSkeleton() {
  return (
    <>
      <div className="w-full">
        <MovieTrailerPlayerSkeleton />
      </div>

      <Container className="pt-26 pb-8">
        <div className="relative mt-6 grid grid-cols-1 gap-4 lg:mt-4 lg:grid-cols-[300px_1fr] lg:gap-8">
          <div className="flex flex-row-reverse justify-between gap-4 lg:relative lg:block">
            <div className="w-[150px] lg:sticky lg:top-20 lg:w-full">
              <div className="overflow-hidden rounded-2xl">
                <div className="bg-muted mx-auto aspect-[2/3] w-full max-w-[300px] animate-pulse rounded-2xl" />
              </div>
            </div>

            <div className="lg:hidden">
              <MovieHeaderSkeleton />
            </div>
          </div>

          <div className="min-w-0">
            <div className="hidden lg:block">
              <MovieHeaderSkeleton />
            </div>

            <div className="lg:mt-6">
              <div className="bg-muted h-4 w-48 animate-pulse rounded-md" />

              <div className="mt-4 space-y-2">
                <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-3/4 animate-pulse rounded-md" />
              </div>
            </div>

            <MovieCrewSkeleton />
            <TopCastSkeleton />

            <Separator />
          </div>
        </div>
      </Container>
    </>
  );
}

export default MovieDetailsSkeleton;
