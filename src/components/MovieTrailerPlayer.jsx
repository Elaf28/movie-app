import {
  MediaPlayer,
  MediaProvider,
  Poster,
  PlayButton,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Play } from "lucide-react";

import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

export default function MovieTrailerPlayer({ trailerYoutubeKey, title }) {
  const thumbnail = `https://img.youtube.com/vi/${trailerYoutubeKey}/maxresdefault.jpg`;

  return (
    <div className="flex max-h-60 justify-center overflow-hidden rounded-3xl md:max-h-96">
      <MediaPlayer
        title={title}
        src={`youtube/${trailerYoutubeKey}`}
        playsInline
        load="visible"
        className="relative aspect-video w-full bg-black"
      >
        <MediaProvider>
          <Poster
            src={thumbnail}
            alt={title}
            className="vds-poster absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          />
        </MediaProvider>

        <div className="media-playing:opacity-0 media-playing:pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center space-y-2 bg-black/30 transition-all duration-300 sm:space-y-4">
          <PlayButton className="group focus-visible:ring-primary flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-xl backdrop-blur-md transition-transform outline-none hover:scale-110 focus-visible:ring-2 active:scale-95 sm:h-24 sm:w-24">
            <Play className="group-hover:text-primary group-hover:fill-primary ml-1 h-6 w-6 fill-white text-white transition-colors sm:h-10 sm:w-10" />
          </PlayButton>

          <span className="text-base font-medium tracking-wide text-white drop-shadow-md sm:text-xl">
            Watch Trailer
          </span>
        </div>

        <div className="media-started:block hidden">
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </div>
      </MediaPlayer>
    </div>
  );
}
