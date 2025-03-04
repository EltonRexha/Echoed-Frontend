import { sendVerificationEmail } from '@/services/api/Email';
import ResendEmailButton from './ResendEmailBtn';
import Modal from './ui/Modal';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import ResponseError from '@/types/responseError';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  email: string;
}

function VerifyEmailModal({ email, ...props }: ModalProps) {
  const emailVerificationMutation = useMutation({
    mutationFn: (email: string) => sendVerificationEmail(email),
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

  return (
    <Modal {...props} title="Verify email">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
            Go to <span className="font-bold">{email}</span>
          </p>
          <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
            Cannot find you email?{' '}
            <span className="font-bold">Check your spams</span>
          </p>
        </div>

        <div>
          <ResendEmailButton
            onClick={() => {
              emailVerificationMutation.mutate(email);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default VerifyEmailModal;
