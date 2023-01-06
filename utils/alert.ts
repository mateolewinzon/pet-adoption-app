import { deletePet } from "service/pets";
import Swal from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";
import type { Pet } from "@prisma/client";

const alert = (action: (() => void) | null, config: SweetAlertOptions = {}) => {
  return Swal.fire(config).then(({ isConfirmed }) => {
    if (isConfirmed && action) {
      action();
    }
  });
};

export const deletePetConfirmation = (pet: Pet) =>
  alert(() => deletePet(pet.id).then(), {
    title: `Are you sure you want to delete ${pet.title}?`,
    showDenyButton: true,
    confirmButtonText: "Delete",
    text: "Warning: this action cannot be undone.",
    denyButtonText: "Cancel",
    denyButtonColor: "gray",
    confirmButtonColor: "red",
  });

export const deleteSuccess = () => {
  alert(null, { title: "Pet deleted successfully" });
};
