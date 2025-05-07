import type { IInsertEventsReq } from "@/models/app/events/insert/insert-events.model";
import EventsService from "@/services/app/events/events.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IPayload {
    filters?: { [key: string]: string };
}

export interface IPayloadInsertEvents {
    params: IInsertEventsReq;
    errorCallback: (msg: string) => void;
}

export interface SuscribeEvents {
    params: {
        id: number;
    };
    errorCallback: (msg: string) => void;
}

export interface RegisterEvents {
  params: {
      id: number;
      user_id: number;
      role: string;
  };
  errorCallback: (msg: string) => void;
}

export const getAllEvents = createAsyncThunk(
    "events/get-all",
    async (payload: IPayload, thunkAPI) => {
        try {
            const resp = await EventsService.getAll(payload.filters);
            return resp;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export const getMyEvents = createAsyncThunk(
    "events/get-my-events",
    async (payload: IPayload, thunkAPI) => {
        try {
            const resp = await EventsService.getAll(payload.filters);
            return resp;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export const insertEvents = createAsyncThunk(
    "events/insert",
    async (payload: IPayloadInsertEvents, thunkAPI) => {
        try {
            const resp = await EventsService.insert(
                payload.params,
                payload.errorCallback
            );

            return resp;
        } catch {
            return thunkAPI.rejectWithValue({
                ok: false,
                msg: "Hubo un error al crear la factura",
            });
        }
    }
);

export const updateEvents = createAsyncThunk(
    "events/update",
    async (payload: IPayloadInsertEvents, thunkAPI) => {
        try {
            const resp = await EventsService.update(
                payload.params,
                payload.errorCallback
            );

            return resp;
        } catch {
            return thunkAPI.rejectWithValue({
                ok: false,
                msg: "Hubo un error al crear la factura",
            });
        }
    }
);

export const suscribeEvents = createAsyncThunk(
    "events/suscribe",
    async (payload: SuscribeEvents, thunkAPI) => {
        try {
            const resp = await EventsService.suscribe(
                payload.params,
                payload.errorCallback
            );

            return resp;
        } catch {
            return thunkAPI.rejectWithValue({
                ok: false,
                msg: "Hubo un error al crear la factura",
            });
        }
    }
);

export const registerEventUser = createAsyncThunk(
    "events/suscribe",
    async (payload: RegisterEvents, thunkAPI) => {
        try {
            const resp = await EventsService.registerUser(
                payload.params,
                payload.errorCallback
            );

            return resp;
        } catch {
            return thunkAPI.rejectWithValue({
                ok: false,
                msg: "Hubo un error al crear la factura",
            });
        }
    }
);

export const deleteEvents = createAsyncThunk(
    "workshops/delete",
    async (payload: any, thunkAPI) => {
        try {
            const resp = await EventsService.delete(payload.params);
            // const resp = true

            return resp;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

// export const cancelRequestEvents = createAsyncThunk(
//   'vehicle-programming-scenario/cancel-request',
//   async () => {
//     EventsService.cancelRequest();
//   }
// );
