import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import type { IEvents } from "@/models/app/events/events.model"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export const columnsEvents = (
  handleOpenDialogAndSetCurrentWorkshops: (data: IEvents) => void,
  handleOpenConfirmDelete: (id: number) => void,
) => [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "capacity",
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => (
        <div className="lowercase">{row.getValue("capacity")}</div>
      ),
    },
    {
      accessorKey: "state",
      header: () => <div className="text-right">Estado</div>,
      cell: ({ row }: any) => (
        <div className="text-right font-medium">{row.getValue("state")}</div>
      ),
    },
    {
      accessorKey: "date",
      header: () => <div className="text-right">Fecha</div>,
      cell: ({ row }: any) => (
        <div className="text-right font-medium">{row.getValue("date")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: any) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleOpenDialogAndSetCurrentWorkshops(row.original)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => row.id && handleOpenConfirmDelete(Number(row.original.id))}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
