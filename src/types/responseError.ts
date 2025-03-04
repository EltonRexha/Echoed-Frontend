import { AxiosError } from 'axios';

interface backendError {
  error: {
    message: string;
    messageCode?: string;
    details?: Record<string, unknown>;
  };
}

type ResponseError = AxiosError<backendError>;

export default ResponseError;
