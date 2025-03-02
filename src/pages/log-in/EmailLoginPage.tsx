import { Button } from '@/components/ui/button';
import CustomInput from '@/components/ui/CustomInput';
import PasswordInput from '@/components/ui/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
});

type Inputs = z.infer<typeof schema>;
function EmailLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  return (
    <div className="w-96 p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 h-full"
        autoComplete="off"
      >
        <div className="relative z-0 w-full mb-5 group">
          <CustomInput
            inputProps={{ ...register('email'), id: 'email' }}
            labelProps={{ id: 'email' }}
            labelText="Email"
          />

          {errors.email && (
            <p className="text-red-600 text-sm font-semibold font-sans">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <PasswordInput
            inputProps={{ ...register('password'), id: 'password' }}
            labelProps={{ id: 'password' }}
          />
        </div>
        <Button className="w-full cursor-pointer">Log in</Button>
      </form>
    </div>
  );
}

export default EmailLoginPage;
