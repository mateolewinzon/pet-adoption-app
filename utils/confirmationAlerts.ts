import { deletePet } from "service/pets";
import Swal from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";
import type { Pet } from "@prisma/client";

const alert = (
  actions: (() => any) | null,
  config: SweetAlertOptions = {},
  onSuccess?: () => void,
  onError?: () => void
) => {
  return Swal.fire(config).then(async ({ isConfirmed }) => {
    if (isConfirmed && actions) {
      const response = await actions();
      if (onSuccess && onError) {
        response.error ? onError() : onSuccess();
      }
    }
  });
};

export const deletePetConfirmation = (pet: Pet) =>
  alert(
    () => deletePet(pet.id),
    {
      title: `Are you sure you want to delete ${pet.title}?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      text: "Warning: this action cannot be undone.",
      denyButtonText: "Cancel",
      denyButtonColor: "gray",
      confirmButtonColor: "red",
    },
    () => {
      petDeleteSuccess();
      window.location.replace("/");
    },
    petDeleteError
  );

export const petDeleteSuccess = () => {
  alert(null, { title: "Pet deleted successfully" });
};

export const petDeleteError = () => {
  alert(null, { title: "An error occurred when deleting pet." });
};
