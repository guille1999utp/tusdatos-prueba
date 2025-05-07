import { clientHTTP } from "@/api/configAxios";
import { handleApiErrors } from "@/services/utilities/handle-api-error.utility";
import { transformToQueryString } from "@/services/utilities/transformToQueryString";

import type { IGetUsersResp } from "@/models/app/users/get-all/get-all-users.model";

interface IFilters {
  [key: string]: string;
}

export default class UsersService {
  private static readonly baseUrl = "auth/list/users";

  public static async getAll(filters?: IFilters): Promise<IGetUsersResp> {
    return handleApiErrors<IGetUsersResp>(() =>
      clientHTTP.get<IGetUsersResp>(
        filters ? transformToQueryString(this.baseUrl, filters) : this.baseUrl
      )
    );
  }

}
