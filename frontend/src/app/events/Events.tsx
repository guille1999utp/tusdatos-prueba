// import { PinContainer } from "@/components/ui/3d-pin"
import { MainDialog } from "@/components/common/molecules/dialog/MainDialog"
import { DataTableDemo } from "@/components/common/organisms/table/DataTable"
import { AuroraText } from "@/components/magicui/aurora-text"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTableListEvents } from "@/hooks/app/events/useTableEvents"
// import { DataTable } from "@/modules/events/data-table"
import { FormEvents } from "@/modules/app/events/components/FormEvents"


export const Events = () => {

  const { listEvents, onMounted, columns, openDialogEvents, setOpenDialogEvents, currentEventsState, setCurrentEventsState, dialogConfirmDelete, setDialogConfirmDelete, handleDelete, isLoadingDeleteEvents } = useTableListEvents()

  return (
    <>
      <div className="container xl:py-8 md:pt-4 pt-5 pb-8 px-5 md:px-14 max-w-full bg-background flex flex-col mt-20 gap-10">
        <div className="flex w-full items-center">
          <h1 className="flex text-4xl font-bold md:text-5xl lg:text-7xl w-full text-slate-100/50">
            <AuroraText>Mis Eventos</AuroraText>
          </h1>
          <Button className="ml-auto cursor-pointer" variant="outline" onClick={() => {
            setCurrentEventsState(null)
            setOpenDialogEvents(true)
          }}>
            Crear
          </Button>
        </div>
        <Separator />

        <DataTableDemo columns={columns} data={listEvents} />
      </div>
      <MainDialog title="Eventos" open={openDialogEvents} setOpenModal={setOpenDialogEvents}>
        <FormEvents onMounted={onMounted} closeModal={setOpenDialogEvents} currentEventsState={currentEventsState} />
      </MainDialog>

      <MainDialog title="Eventos" open={dialogConfirmDelete.open} setOpenModal={() => setDialogConfirmDelete({ open: false, id: 0 })}>
        <Button
          onClick={() => handleDelete(dialogConfirmDelete.id)}
          disabled={isLoadingDeleteEvents}
          color='error'
        >
          <>
            {isLoadingDeleteEvents ? "loading..." : 'Delete'}
          </>
        </Button>
      </MainDialog>
    </>
  )
}
