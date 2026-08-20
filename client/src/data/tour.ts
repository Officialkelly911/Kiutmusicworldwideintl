export type ShowStatus = "available" | "limited" | "sold_out" | "coming_soon" | "announced";

export interface TourShow {
  id: string;
  city: string;
  country: string;
  venue: string;
  date: string;
  time: string;
  region: string;
  status: ShowStatus;
  description: string;
}

export const upcomingShows: TourShow[] = [
  { id: "sh-1", city: "Lagos",    country: "Nigeria",        venue: "Eko Convention Centre",   date: "Dec 31, 2026", time: "10:00 PM", region: "West Africa",   status: "announced",   description: "Kiut closes out 2026 with a landmark Lagos performance." },
  { id: "sh-2", city: "London",   country: "United Kingdom", venue: "To Be Announced",          date: "2026",         time: "TBA",      region: "Europe",        status: "coming_soon", description: "UK debut — afrobeats meets London vibes." },
  { id: "sh-3", city: "Accra",    country: "Ghana",          venue: "To Be Announced",          date: "2026",         time: "TBA",      region: "West Africa",   status: "coming_soon", description: "Pan-African energy in the heart of Accra." },
  { id: "sh-4", city: "New York", country: "USA",            venue: "To Be Announced",          date: "2027",         time: "TBA",      region: "North America", status: "coming_soon", description: "North American debut is on the horizon." },
  { id: "sh-5", city: "Dubai",    country: "UAE",            venue: "To Be Announced",          date: "2027",         time: "TBA",      region: "Middle East",   status: "coming_soon", description: "Middle East debut for the Kiut Music experience." },
  { id: "sh-6", city: "Toronto",  country: "Canada",         venue: "To Be Announced",          date: "2027",         time: "TBA",      region: "North America", status: "coming_soon", description: "Canada stage — Kiut brings the sound north." },
];