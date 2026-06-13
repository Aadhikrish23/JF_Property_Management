export interface SearchProperty {
  id: string;
  title: string;
  address: string;
  status: string;
}

export interface SearchClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface SearchResponseData {
  properties: SearchProperty[];
  clients: SearchClient[];
}

export interface SearchResponse {
  success: boolean;
  data: SearchResponseData;
}
