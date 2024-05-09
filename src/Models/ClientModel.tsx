import ClientAllowedUrlModel from "./ClientAllowedUrlModel";
import GroupModel from "./GroupModel";

export default class ClientModel {
  id?: string;
  name?: string;
  url?: string;
  allowedUrls?: ClientAllowedUrlModel[];
  allowedGroups?: GroupModel[];
  clientId?: string;
  clientSecret?: string;
  image?: string;
  createdAt?: string;
}
