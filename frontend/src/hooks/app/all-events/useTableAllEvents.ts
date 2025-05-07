import { getAllEvents } from "@/redux/features/events/events.thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useCallback } from "react";

export const useTableAllListEvents = () => {
    const dispatch = useAppDispatch();

    const { listEvents, isLoadingGetEvents } = useAppSelector(
        (state) => state.events
    );

    const onMounted = useCallback(async () => {
        await dispatch(getAllEvents({}));
    }, [dispatch]);

    useEffect(() => {
        onMounted();
    }, [onMounted]);

    return {
        onMounted,
        listEvents,
        isLoadingGetEvents,
    };
};
