export const errorMessage = (status, message, err) => {
  const error = new Error();
  const originalErr = err.message;
  error.status = status;
  error.message = message + `\n詳細錯誤描述：` + originalErr;
  return error;
};
