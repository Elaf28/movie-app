// import React from 'react';

// // Base styles for the player
// import '@vidstack/react/player/styles/base.css';
// // Theme & Layout styles (required for the Default Layout)
// import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/video.css';
// // import { MediaPlayer, MediaProvider } from '@vidstack/react';
// import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
// import {
//   defaultLayoutIcons,
//   DefaultVideoLayout,
// } from '@vidstack/react/player/layouts/default';
// import { PlayButton } from '@vidstack/react';
// // See "Icons" component page for setup before importing the following:
// import { PauseIcon, PlayIcon } from '@vidstack/react/icons';
// import { ToggleButton } from '@vidstack/react';
// // See "Icons" component page for setup before importing the following:

// function MovieTrailerPlayer() {
//   return (
//     <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl border border-border">
//       <MediaPlayer title="Top Gun: Maverick" src="youtube/Klc__shdj88">
//         <MediaProvider>
//           <Poster
//             className="vds-poster"
//             src="https://img.youtube.com/vi/Klc__shdj88/maxresdefault.jpg"
//             alt="40th Anniversary Trailer"
//           />

//           {/* <PlayButton className="vds-button">
//             <PlayIcon className="play-icon vds-icon" />
//             <PauseIcon className="pause-icon vds-icon" />
//           </PlayButton> */}

//           {/* CUSTOM CENTER PLAY BUTTON */}
//           {/* <div className="absolute inset-0 flex items-center justify-center z-10 group-data-[playing]:hidden">
//             <button className="bg-primary p-6 rounded-full shadow-xl transition-transform hover:scale-110">
//               <PlayIcon className="fill-primary-foreground text-primary-foreground w-8 h-8" />
//             </button>
//           </div> */}
//         </MediaProvider>
//         <DefaultVideoLayout
//           // thumbnails="https://img.youtube.com/vi/Klc__shdj88/maxresdefault.jpg"
//           icons={defaultLayoutIcons}
//         />
//       </MediaPlayer>

//       {/* <MediaPlayer
//         title="Fight Club (1999) Trailer"
//         src={`youtube/O-b2VfmmbyA`} // Vidstack handles the YouTube URL logic for you
//         playsInline
//         aspectRatio="16:9"
//         className="w-full h-full"
//       >
//         <MediaProvider />

//         <DefaultVideoLayout icons={defaultLayoutIcons} />
//       </MediaPlayer> */}
//     </div>
//   );
// }

import {
  MediaPlayer,
  MediaProvider,
  Poster,
  PlayButton,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { Play } from 'lucide-react';

import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

export default function MovieTrailerPlayer({ movieKey, title }) {
  const thumbnail = `https://img.youtube.com/vi/${movieKey}/maxresdefault.jpg`;

  return (
    <div className="max-h-96 overflow-hidden rounded-3xl flex justify-center">
      <MediaPlayer
        title={title}
        src={`youtube/${movieKey}`}
        playsInline
        load="visible"
        className="relative w-full aspect-video bg-black"
      >
        <MediaProvider>
          <Poster
            src={thumbnail}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 vds-poster"
          />
        </MediaProvider>

        <div
          className="
            absolute inset-0 z-10
            flex flex-col items-center justify-center space-y-4
            bg-black/30
            transition-all duration-300
            media-playing:opacity-0 media-playing:pointer-events-none
          "
        >
          <PlayButton
            className="
              group flex h-24 w-24 items-center justify-center
              rounded-full bg-white/10 backdrop-blur-md
              border border-white/20 shadow-xl
              transition-transform hover:scale-110 active:scale-95
              outline-none focus-visible:ring-2 focus-visible:ring-primary
            "
          >
            <Play className="ml-1 h-10 w-10 fill-white text-white transition-colors group-hover:text-primary group-hover:fill-primary" />
          </PlayButton>

          <span className="text-xl font-medium text-white drop-shadow-md tracking-wide">
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
