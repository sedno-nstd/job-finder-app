import { useFormContext } from "react-hook-form";

export function IdentityFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-3">
        <label
          htmlFor="firstNameInput"
          className="font-medium cursor-pointer select-none mb-1"
        >
          Name
        </label>
        <input
          id="firstNameInput"
          className="outline-none border border-[#a1afc1] hover:border-blue-600 p-2 rounded"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">
            {String(errors.name.message)}
          </span>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <label
          htmlFor="lastNameInput"
          className="font-medium cursor-pointer select-none mb-1"
        >
          Surname
        </label>
        <input
          id="lastNameInput"
          className="outline-none border border-[#a1afc1] hover:border-blue-600 p-2 rounded"
          type="text"
          {...register("surname")}
        />
        {errors.surname && (
          <span className="text-red-500 text-xs">
            {String(errors.surname.message)}
          </span>
        )}
      </div>
    </div>
  );
}
