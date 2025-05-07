import type { IEvents } from '../events.model';


export interface IInsertEventsReq extends Omit<IEvents, 'id'> {
  additionalField?: string;
}


export type IInsertEventsResp = IEvents[];
