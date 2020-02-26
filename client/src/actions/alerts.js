import swal from "sweetalert2";

export const alert = (type, title = "", msg = "") => {
  swal.fire({
    icon: type,
    title: title,
    text: msg
  });
};

export const confirmAlert = title => {
  return swal.fire({
    title: title,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });
};
