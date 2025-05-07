import { columnsEvents } from "@/modules/app/events/adapters/EventColumns";
import { deleteEvents, getMyEvents } from "@/redux/features/events/events.thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useCallback } from "react";
import useDialogState from "./useDialogState";
import { toast } from "react-toastify";
import { getAllUsers } from "@/redux/features/users/users.thunks";
import { getAllRoles } from "@/redux/features/roles/roles.thunks";

export const useTableListEvents = () => {
    const dispatch = useAppDispatch();

    const { listMyEvents , isLoadingGetEvents, isLoadingDeleteEvents  } = useAppSelector(
        (state) => state.events
    );

    const onMounted = useCallback(async () => {
        await dispatch(getMyEvents({}));
        await dispatch(getAllUsers({}));
        await dispatch(getAllRoles({}));
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
        setCurrentEventsState,
        handleCloseAssignUser,
        handleOpenAssignUser,
        openDialogAssignUser
    } = useDialogState();

    const columns = columnsEvents(
        handleOpenDialogAndSetCurrentEvents,
        handleOpenConfirmDelete,
        handleOpenAssignUser
    );

    return {
        columns,
        onMounted,
        listMyEvents,
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
        isLoadingDeleteEvents,
        openDialogAssignUser,
        handleOpenAssignUser,
        handleCloseAssignUser,
    };
};
