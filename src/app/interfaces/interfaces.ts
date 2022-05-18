import { Point } from "mapbox-gl";

export default interface Access{
    user: string;
    pass: string;
}

export interface IGeocoderResult {
    type: 'FeatureCollection';
    query: Array<string | number>;
    features: Array<IGeocoderFeature>;
    attribution: string;
  }

  export interface IGeocoderFeature {
    id: string;
    type: 'Feature';
    place_type: Array<string>;
    relevance: number;
    properties: Object;
    address: string;
    text: string;
    place_name: string;
    bbox: [number, number, number, number];
    center: [number, number];
    geometry: Point;
    context: Array<IGeocoderContext>;
  }

  export interface IGeocoderContext {
    id: string;
    wikidata: string;
    text: string;
  }