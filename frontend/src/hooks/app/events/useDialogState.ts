import { useState } from 'react';
import type { IEvents } from '@/models/app/events/events.model';

export const useDialogState = () => {
  const [openDialogEvents, setOpenDialogEvents] = useState<boolean>(false);
  const [dialogConfirmDelete, setDialogConfirmDelete] = useState<{
    open: boolean;
    id: number;
  }>({ open: false, id: 0 });
  const [currentEventsState, setCurrentEventsState] = useState<IEvents | null>()

  const handleOpenDialogAndSetCurrentEvents = (current: IEvents) => {
    setOpenDialogEvents(true);
    setCurrentEventsState(current);
  };

  const handleCloseEventsDialog = () => {
    setOpenDialogEvents(false);
    setTimeout(() => {
      setCurrentEventsState(undefined);
    }, 500);
  };

  const handleOpenConfirmDelete = (id: number) => setDialogConfirmDelete({ open: true, id });

  const handleCloseDialogConfirmDelete = () => setDialogConfirmDelete({ open: false, id: 0 });

  return {
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
  };
};

export default useDialogState;
