import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';

import { SingleSelectCombobox } from '@/components/common/molecules/select-combobox/SingleSelectCombobox';
import { registerEventUser } from '@/redux/features/events/events.thunks';

type EventFormInputs = {
  user_id: number;
  role: string;
};

const schema = Yup.object({
  user_id: Yup.number().required('Debes seleccionar un usuario'),
  role: Yup.string().required('Debes seleccionar un usuario'),
});

interface IProps {
  idEvent: number;
  onMounted: () => Promise<void>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues: EventFormInputs = {
  user_id: 0,
  role: '',
};

export const FormAssignUser = ({ onMounted, closeModal, idEvent }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const dispatch = useAppDispatch();
  const { listUsers, isLoadingGetUsers } = useAppSelector((state) => state.users);
  const { listRoles, isLoadingGetRoles } = useAppSelector((state) => state.roles);

  const onSubmit = async (data: EventFormInputs) => {
    console.log('Datos enviados:', data);

    // let res;
    const res = await dispatch(registerEventUser({ params: {...data, id: idEvent}, errorCallback: () => {
      toast.error("Error al asignar el usuario o ya está asignado");
    } }));
    // if (currentEventsState) {
    // } else {
    //   res = await dispatch(insertEvents({ params: data, errorCallback: ... }))
    // }

    if (res?.meta?.requestStatus === 'fulfilled') {
      toast("Creado con éxito");
      await onMounted();
      closeModal(false);
    }
  };

  const userOptions = listUsers.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  const roleOptions = listRoles.map((role, index) => ({
    label: role,
    value: index,
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full h-full p-4 tracking-tight text-slate-100/80"
    >
      <h3 className="text-lg font-bold text-slate-800/50 dark:text-slate-200">
        Asignar usuario a evento
      </h3>

      <Controller
        name="user_id"
        control={control}
        render={({ field }) => (
          <SingleSelectCombobox
            options={userOptions}
            value={Number(field.value)}
            onChange={(val) => field.onChange(String(val))}
            error={errors.user_id?.message}
            placeholder="Selecciona un usuario..."
            loading={isLoadingGetUsers}
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <SingleSelectCombobox
            options={roleOptions}
            value={roleOptions.find((opt) => opt.label === field.value)?.value}
            onChange={(val) => {
              const selectedOption = roleOptions.find((opt) => opt.value === val);
              field.onChange(selectedOption?.label || '');
            }}
            error={errors.role?.message}
            placeholder="Selecciona un rol..."
            loading={isLoadingGetRoles}
          />
        )}
      />


      <button
        type="submit"
        className={cn(
          'mt-2 h-10 w-full rounded-md bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold'
        )}
      >
        Asignar usuario a evento
      </button>
    </form>
  );
};
