import { deletePet } from "service/pets";
import Swal from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";
import type { Pet } from "@prisma/client";

export const alert = (
  config: SweetAlertOptions = {},
  action?: () => any,
  successMessage?: string,
  errorMessage?: string
) => {
  return Swal.fire(config).then(async ({ isConfirmed }) => {
    if (isConfirmed && action) {
      const response = await action();
      if (successMessage || errorMessage) {
        response.error
          ? displayErrorAlert(errorMessage!)
          : displaySuccessAlert(successMessage!);
      }
    }
  });
};

export const confirmDangerousAction = (
  config: SweetAlertOptions,
  action: () => any,
  successMessage?: string,
  errorMessage?: string
) =>
  alert(
    {
      ...config,
      showDenyButton: true,
      confirmButtonText: "Delete",
      text: "Warning: this action cannot be undone.",
      denyButtonText: "Cancel",
      denyButtonColor: "gray",
      confirmButtonColor: "red",
    },
    action,
    successMessage,
    errorMessage
  );

export const displaySuccessAlert = (title: string, message?: string) => {
  Swal.fire(title, message, "success");
};

export const displayErrorAlert = (title: string, message?: string) => {
  Swal.fire(title, message, "error");
};
