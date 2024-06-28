export const axiosErrorHandler = (err) => {
  if (err.response.status == 500) {
    window.location.href = "/error/server-error";
  }
  if (err.responser.status === 404) {
    window.location.href = "/error/not-found";
  }
};
