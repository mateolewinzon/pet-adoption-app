import Swal, { SweetAlertIcon } from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";

export const alert = (
  config: SweetAlertOptions = {},
  action?: () => any,
  successMessage?: string,
  errorMessage?: string
) => {
  return Swal.fire(config).then(async ({ isConfirmed }) => {
    if (isConfirmed && action) {
      const response = await action();
      alert({
        title: response.error ? errorMessage : successMessage,
        icon: response.error ? "error" : "success",
      });
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
