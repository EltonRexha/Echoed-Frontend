import { sendVerificationEmail } from '@/services/api/Email';
import ResendEmailButton from './ResendEmailBtn';
import Modal from './ui/Modal';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import ResponseError from '@/types/responseError';
import { createPortal } from 'react-dom';
import { Loader } from './ui/Loader';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  user: {
    email?: string;
    username?: string;
    userId?: string;
  };
}

function VerifyEmailModal({ user, ...props }: ModalProps) {
  const emailVerificationMutation = useMutation({
    mutationFn: () =>
      sendVerificationEmail(user.email, user.username, user.userId),
    onSuccess: (success) => {
      toast.success(success.message);
    },
    onError: (e: ResponseError) => {
      if (e.response) {
        toast.error(e.response.data.error.message);
        return;
      }

      toast.error('Something wrong happened sending email');
    },
  });

  return createPortal(
    <Modal {...props} title="Verify email">
      {emailVerificationMutation.isPending ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            {emailVerificationMutation.isIdle && (
              <>
                <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-bold">
                  Your account is not verified
                </h1>
                <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
                  Send verify email
                </p>
              </>
            )}

            {emailVerificationMutation.isSuccess && (
              <>
                <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-bold">
                  We've send a email to verify your account
                </h1>
                <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
                  Cannot find you email?{' '}
                  <span className="font-bold">Check your spams</span>
                </p>
              </>
            )}
          </div>

          <div>
            <ResendEmailButton
              onClick={() => {
                emailVerificationMutation.mutate();
              }}
            />
          </div>
        </div>
      )}
    </Modal>,
    document.getElementById('modal-portal')!
  );
}

export default VerifyEmailModal;
