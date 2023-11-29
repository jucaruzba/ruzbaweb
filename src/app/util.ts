import Swal from "sweetalert2";
export class Util {
  public static errorMessage(mensaje: string) {
    Swal.close();
    Swal.fire({
      heightAuto: false,
      icon: "error",
      text: mensaje,
      showConfirmButton: true,
    });
  }

  public static successMessage(mensaje: string, duration: number = 3000) {
    Swal.close();
    Swal.fire({
      heightAuto: false,
      icon: "success",
      text: mensaje,
      timer: duration,
      showConfirmButton: false,
    });
  }

  public static warningMessage(mensaje: string) {
    Swal.close();
    Swal.fire({
      heightAuto: false,
      icon: "warning",
      text: mensaje,
      showConfirmButton: true,
    });
  }

  public static confirmMessage(mensaje: string, do_) {
    Swal.fire({
      heightAuto: false,
      title: mensaje,
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isDenied) {
        do_();
      }
    });
  }
}
