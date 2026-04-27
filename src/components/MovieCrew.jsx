import React from "react";
import { Separator } from "@/components/ui/separator";

function MovieCrew({ crew }) {
  const { director, writers, stars } = crew;

  return (
    <div className="mt-6 space-y-4">
      <Separator />

      <div className="flex flex-wrap gap-1 text-sm sm:text-base">
        <span>Director :</span>
        <span className="text-primary">{director || "N/A"}</span>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-1 text-sm sm:text-base">
        <span>Writers :</span>
        <span className="text-primary">{writers || "N/A"}</span>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-1 text-sm sm:text-base">
        <span>Stars :</span>
        <span className="text-primary">{stars}</span>
      </div>

      <Separator />
    </div>
  );
}

export default MovieCrew;
