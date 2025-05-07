import { columnsEvents } from "@/modules/app/events/adapters/EventColumns";
import { deleteEvents, getAllEvents } from "@/redux/features/events/events.thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useCallback } from "react";
import useDialogState from "./useDialogState";
import { toast } from "react-toastify";

export const useTableListEvents = () => {
    const dispatch = useAppDispatch();

    const { listEvents, isLoadingGetEvents, isLoadingDeleteEvents  } = useAppSelector(
        (state) => state.events
    );

    const onMounted = useCallback(async () => {
        await dispatch(getAllEvents({}));
    }, [dispatch]);

    useEffect(() => {
        onMounted();
    }, [onMounted]);

    const handleDelete = async (id: number) => {
        const respDispatch = await dispatch(deleteEvents({ params: { id } }));
    
        if (respDispatch.meta.requestStatus === 'fulfilled') {
          toast.success('Evento eliminado correctamente');
          onMounted();
        }
        handleCloseDialogConfirmDelete();
      };

    const {
        openDialogEvents,
        currentEventsState,
        dialogConfirmDelete,
        setOpenDialogEvents,
        setDialogConfirmDelete,
        handleCloseEventsDialog,
        handleOpenConfirmDelete,
        handleCloseDialogConfirmDelete,
        handleOpenDialogAndSetCurrentEvents,
        setCurrentEventsState
    } = useDialogState();

    const columns = columnsEvents(
        handleOpenDialogAndSetCurrentEvents,
        handleOpenConfirmDelete
    );

    return {
        columns,
        onMounted,
        listEvents,
        isLoadingGetEvents,
        openDialogEvents,
        currentEventsState,
        dialogConfirmDelete,
        setOpenDialogEvents,
        setDialogConfirmDelete,
        handleCloseEventsDialog,
        handleOpenConfirmDelete,
        handleCloseDialogConfirmDelete,
        setCurrentEventsState,
        handleDelete,
        isLoadingDeleteEvents
    };
};
