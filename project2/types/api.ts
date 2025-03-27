export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  success: boolean | null;
  upcoming: boolean;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  rocket: string;
  payloads: string[];
  launchpad: string;
  flight_number: number;
}

export interface Rocket {
  id: string;
  name: string;
  description: string;
  height: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  first_flight: string;
  success_rate_pct: number;
  images: {
    flickr: string[];
  };
}

export interface LaunchFilters {
  upcoming?: boolean;
  success?: boolean | null;
  year?: number | null;
}