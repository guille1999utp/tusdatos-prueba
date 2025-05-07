// import { PinContainer } from "@/components/ui/3d-pin"
import { MainDialog } from "@/components/common/molecules/dialog/MainDialog"
import { AuroraText } from "@/components/magicui/aurora-text"
import { PinContainer } from "@/components/ui/3d-pin"
// import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTableAllListEvents } from "@/hooks/app/all-events/useTableAllEvents"
import { cn } from "@/lib/utils"
import { FormEventsSuscribe } from "@/modules/app/all-events/components/FormEventsSuscribe"
// import { useTableListEvents } from "@/hooks/app/events/useTableEvents"
// import { DataTable } from "@/modules/events/data-table"
// import { FormEvents } from "@/modules/events/components/FormEvents"
import { useState } from "react"


export const AllEvents = () => {

    const [openModal, setOpenModal] = useState<{open:boolean, id: number | null}>({open: false, id: null})

    const { listEvents, onMounted } = useTableAllListEvents()

    return (
        <>
            <div className="container xl:py-8 md:pt-4 pt-5 pb-8 px-5 md:px-14 max-w-full bg-background flex flex-col mt-20 gap-10">
                <div className="flex w-full items-center">
                    <h1 className="flex text-4xl font-bold md:text-5xl lg:text-7xl w-full text-slate-100/50">
                        <AuroraText>Eventos</AuroraText>
                    </h1>
                    {/* <Button className="ml-auto cursor-pointer" variant="outline" onClick={() => setOpenModal(true)}>
                        Abrir
                    </Button> */}
                </div>
                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        listEvents.length == 0 ? (
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <h1 className="text-2xl font-bold text-slate-100/50">No hay eventos disponibles</h1>
                            </div>
                        )
                            :
                            listEvents.map((event, index) => {
                                return (
                                    <div className="my-4" key={index} onClick={() => setOpenModal({open: true, id: event.id})}>
                                        <PinContainer
                                            title={`${event.registered_count}/${event.capacity}`}
                                            href="#"
                                        >
                                            <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-[20rem] h-[20rem] ">
                                                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base">
                                                    {event.title}
                                                </h3>
                                                <div className="text-base !m-0 !p-0 font-normal">
                                                    <span className="text-slate-500 ">
                                                        {event.description}
                                                    </span>
                                                </div>
                                                <div className="text-base !m-0 !p-0 font-normal">
                                                    <span className="text-slate-500 ">
                                                        {event.date}
                                                    </span>
                                                </div>
                                                <div className={cn(
                                                    "flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500",
                                                    event.registered_count == event.capacity ? "bg-gradient-to-br from-violet-500 via-red-500 to-red-900" : "bg-gradient-to-br from-blue-500 via-green-600 to-green-900"
                                                )} />
                                            </div>
                                        </PinContainer>
                                    </div>
                                )
                            }
                            )
                    }
                </div>

                {/* <DataTableDemo columns={columns} data={listEvents} /> */}
            </div>
            <MainDialog title="Eventos" open={openModal.open} setOpenModal={() => setOpenModal({open: false, id: null})}>
                <FormEventsSuscribe id={openModal.id} setOpenModal={setOpenModal} onMounted={onMounted} />
            </MainDialog>
        </>
    )
}
