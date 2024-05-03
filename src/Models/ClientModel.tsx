import ClientAllowedUrlModel from "./ClientAllowedUrlModel";

export default class ClientModel {
  id?: string;
  name?: string;
  url?: string;
  allowedUrls?: ClientAllowedUrlModel[];
  clientId?: string;
  clientSecret?: string;
  image?: string;
  createdAt?: string;
}
