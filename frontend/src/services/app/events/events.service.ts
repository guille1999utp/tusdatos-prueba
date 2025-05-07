import { clientHTTP } from "@/api/configAxios";
import type { IDeleteEventsReq, IDeleteEventsResp } from "@/models/app/events/delete/delete-events.model";
import type { IGetEventsResp } from "@/models/app/events/get-all/get-all-events.model";
import type { IInsertEventsReq, IInsertEventsResp } from "@/models/app/events/insert/insert-events.model";
import { handleApiErrors } from "@/services/utilities/handle-api-error.utility";
import { transformToQueryString } from "@/services/utilities/transformToQueryString";



interface IFilters {
    [key: string]: string;
}

export default class EventsService {

    public static async getAll(filters?: IFilters): Promise<IGetEventsResp> {
        return handleApiErrors<IGetEventsResp>(() =>
            clientHTTP.get<IGetEventsResp>(
                filters ? transformToQueryString("event", filters) : "event"           
            )
        ) 
    }

    public static async insert(
        obj: IInsertEventsReq,
        errorCallback: (msg: string) => void
      ): Promise<IInsertEventsResp> {
        return await handleApiErrors<IInsertEventsResp>(
          () =>
            clientHTTP.post<IInsertEventsResp>('event', obj),
          errorCallback
        );
      }

      public static async update(
        obj: any,
        errorCallback: (msg: string) => void
      ): Promise<IInsertEventsResp> {
        return await handleApiErrors<IInsertEventsResp>(
          () =>
            clientHTTP.put<IInsertEventsResp>(`event/${obj.id}`, obj),
          errorCallback
        );
      }

      public static async delete(obj: IDeleteEventsReq): Promise<IDeleteEventsResp> {
        return await handleApiErrors<IDeleteEventsResp>(() =>
          clientHTTP.delete<IDeleteEventsResp>(`event/${obj.id}`)
        );
      }

      public static async suscribe(
        obj: any,
        errorCallback: (msg: string) => void
      ): Promise<IInsertEventsResp> {
        return await handleApiErrors<IInsertEventsResp>(
          () =>
            clientHTTP.post<IInsertEventsResp>(`event/${obj.id}`, obj),
          errorCallback
        );
      }

}
