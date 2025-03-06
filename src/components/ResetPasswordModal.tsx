import { useMutation } from '@tanstack/react-query';
import ResendResetPasswordButton from './ResendResetPasswordBtn';
import Modal from './ui/Modal';
import { sendResetPasswordEmail } from '@/services/api/Email';
import { toast } from 'sonner';
import ResponseError from '@/types/responseError';
import { Loader } from './ui/Loader';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  email: string;
}

function ResetPasswordModal({ email, ...props }: ModalProps) {
  const resetPasswordMutation = useMutation({
    mutationFn: () => sendResetPasswordEmail(email),
    onError: (e: ResponseError) => {
      if (e.response && e.response.status === 429) {
        toast.error('Too many requests, try again later');
        props.close();
        return;
      }
      toast.error('Could not send reset password email');
      props.close();
    },
  });

  return (
    <Modal {...props} title="Reset password">
      {resetPasswordMutation.isPending ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1 text-center">
            {resetPasswordMutation.isSuccess && (
              <>
                <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-bold">
                  We've send a email to reset password
                </h1>
                <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
                  Go to <span className="font-bold">{email}</span>
                </p>
                <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
                  Cannot find you email?{' '}
                  <span className="font-bold">Check your spams</span>
                </p>
              </>
            )}
          </div>

          <div>
            {resetPasswordMutation.isSuccess ? (
              <ResendResetPasswordButton
                onClick={() => {
                  resetPasswordMutation.mutate();
                }}
              />
            ) : (
              <ResendResetPasswordButton
                text="Send reset password email"
                onClick={() => {
                  resetPasswordMutation.mutate();
                }}
              />
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ResetPasswordModal;
