// All interface needed on dialog data, place here.
// To prevent a lot of files created just for interface

export interface ResCountry {
  nationnr: number;
  kurzbez: string;
  bezeich: string;
}

export interface ResSegment {
  betriebsnr: number;
  'l-bemerk': string;
  'l-bezeich': string;
  'l-segmentcode': number;
  'l-segmentgrup': number;
}
