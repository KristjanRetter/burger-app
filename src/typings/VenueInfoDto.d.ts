export interface VenueInfoDto {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
}
