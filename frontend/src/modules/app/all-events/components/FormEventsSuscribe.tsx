import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { suscribeEvents } from "@/redux/features/events/events.thunks"
import { useAppDispatch } from "@/redux/hooks"
import { toast } from "react-toastify"

export const FormEventsSuscribe = ({ id, setOpenModal, onMounted }: {
    id: number | null, setOpenModal: React.Dispatch<React.SetStateAction<{
        open: boolean;
        id: number | null;
    }>>, onMounted: () => Promise<void>
}) => {

    const dispatch = useAppDispatch()
    const { user } = useAuth();
    console.log(id, user);

    const handleSubmit = async () => {
        if (id == null) return
        const respDispatch = await dispatch(suscribeEvents({ params: { id }, errorCallback: (msg) => console.log(msg) }))
        if (respDispatch.meta.requestStatus == "fulfilled") {
            console.log("Evento suscrito con éxito")
            setOpenModal({ open: false, id: null })
            onMounted()
        } else {
            toast("Error al suscribirse al evento")
        }
    }


    return (
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleSubmit()}>
            Suscribirme
        </Button>
    )
}
