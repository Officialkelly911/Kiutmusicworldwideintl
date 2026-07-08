export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  albumType: "ep" | "single";
  released: string;
  duration: string;
  url: string;
}

export interface TrackGroup {
  label: string;
  year: string;
  image: string;
  tracks: Track[];
}

const goodLifeEP        = "/assets/images/Good_Life_EP_1767961904057.webp";
const sofaEP            = "/assets/images/SOFA_EP_1767961904056.webp";
const announceImg       = "/assets/images/announce-cover.webp";
const eligibleEP        = "/assets/images/KIUT_ELIGIBLE_EP_1767961904056.webp";
const confamBoyCover    = "/assets/images/confam-boy-cover.webp";
const prayaRequestCover = "/assets/images/praya-request-cover.webp";
const chikitoCover      = "/assets/images/chikito-cover.webp";

export const ALL_TRACKS: Track[] = [
  // Good Life EP — Oct 30, 2025
  { id:  1, title: "Makosa",             artist: "Kiut", album: "Good Life EP", albumArt: goodLifeEP,        albumType: "ep",     released: "Oct 30, 2025", duration: "3:35", url: "/audio/makosa.m4a" },
  { id:  2, title: "TGIF",               artist: "Kiut", album: "Good Life EP", albumArt: goodLifeEP,        albumType: "ep",     released: "Oct 30, 2025", duration: "3:15", url: "/audio/tgif.mp3" },
  { id:  3, title: "Chubaya",            artist: "Kiut", album: "Good Life EP", albumArt: goodLifeEP,        albumType: "ep",     released: "Oct 30, 2025", duration: "3:20", url: "/audio/chubaya.mp3" },
  // S.O.F.A EP — Nov 24, 2023
  { id:  4, title: "AJE",                artist: "Kiut", album: "S.O.F.A EP",   albumArt: sofaEP,            albumType: "ep",     released: "Nov 24, 2023", duration: "3:50", url: "/audio/aje.mp3" },
  // Announce — May 15, 2021
  { id:  5, title: "Amin",               artist: "Kiut", album: "Announce",     albumArt: announceImg,       albumType: "ep",     released: "May 15, 2021", duration: "3:42", url: "/audio/amin.mp3" },
  { id:  6, title: "Samsa",              artist: "Kiut", album: "Announce",     albumArt: announceImg,       albumType: "ep",     released: "May 15, 2021", duration: "3:28", url: "/audio/samsa.mp3" },
  { id:  7, title: "Not Broke",          artist: "Kiut", album: "Announce",     albumArt: announceImg,       albumType: "ep",     released: "May 15, 2021", duration: "3:12", url: "/audio/not-broke.m4a" },
  // Eligible EP — May 20, 2022
  { id:  8, title: "Daughter of Elijah", artist: "Kiut", album: "Eligible EP",  albumArt: eligibleEP,        albumType: "ep",     released: "May 20, 2022", duration: "4:15", url: "/audio/daughter-of-elijah.mp3" },
  { id:  9, title: "Holy Thought",       artist: "Kiut", album: "Eligible EP",  albumArt: eligibleEP,        albumType: "ep",     released: "May 20, 2022", duration: "4:30", url: "/audio/holy-thought.mp3" },
  // Singles
  { id: 10, title: "Confam Boy",         artist: "Kiut", album: "Single",       albumArt: confamBoyCover,    albumType: "single", released: "Jul 21, 2023", duration: "3:48", url: "/audio/confam-boy.mp3" },
  { id: 11, title: "Praya Request",      artist: "Kiut", album: "Single",       albumArt: prayaRequestCover, albumType: "single", released: "Feb 3, 2023",  duration: "4:02", url: "/audio/praya-request.mp3" },
  { id: 12, title: "Chikito",            artist: "Kiut", album: "Single",       albumArt: chikitoCover,      albumType: "single", released: "Nov 18, 2022", duration: "3:22", url: "/audio/chikito.mp3" },
];

export const TRACK_GROUPS: TrackGroup[] = [
  { label: "Good Life EP", year: "Oct 30, 2025",  image: goodLifeEP,     tracks: ALL_TRACKS.filter(t => t.album === "Good Life EP") },
  { label: "S.O.F.A EP",   year: "Nov 24, 2023",  image: sofaEP,         tracks: ALL_TRACKS.filter(t => t.album === "S.O.F.A EP")   },
  { label: "Announce",     year: "May 15, 2021",  image: announceImg,    tracks: ALL_TRACKS.filter(t => t.album === "Announce")     },
  { label: "Eligible EP",  year: "May 20, 2022",  image: eligibleEP,     tracks: ALL_TRACKS.filter(t => t.album === "Eligible EP")  },
  { label: "Singles",      year: "2022–2023",      image: confamBoyCover, tracks: ALL_TRACKS.filter(t => t.album === "Single")      },
];
