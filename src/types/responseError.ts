import { AxiosError } from 'axios';

interface backendError {
  error: {
    message: string;
    messageCode?: string;
  };
}

type ResponseError = AxiosError<backendError>;

export default ResponseError;
