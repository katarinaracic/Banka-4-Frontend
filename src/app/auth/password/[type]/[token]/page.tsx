'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { notFound, useParams } from 'next/navigation';

// Zod password validation
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .max(32),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordParams = {
  type: string;
  token: string;
};

export default function PasswordPage() {
  const params = useParams() as PasswordParams;
  if (params.type !== 'set' && params.type !== 'reset') notFound();

  const isReset = params.type === 'reset';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = () => {
    alert(
      isReset ? 'Password reset successfully!' : 'Password set successfully!'
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-[348px] bg-white rounded-lg border border-zinc-200 p-3">
        <CardHeader className="w-full p-3 text-left">
          <h2 className="text-2xl font-semibold text-[#09090B] font-inter">
            {isReset ? 'Reset Your Password' : 'Set Your Password'}
          </h2>
          <p className="text-sm text-[#71717A] mt-3 font-inter">
            {isReset
              ? 'Forgot your password? No worries — set a new one to regain secure access to your account.'
              : 'Create a strong, secure password to protect your account and keep your information safe.'}
          </p>
        </CardHeader>

        <CardContent className="px-3 pb-3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="**************"
                {...register('password')}
                className="mt-1 text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm">
                Confirm password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="**************"
                {...register('confirmPassword')}
                className="mt-1 text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-2">
              <Button
                type="submit"
                className="bg-[#18181B] text-white rounded-md py-1 px-2 w-[120px] h-[40px] text-sm font-medium"
              >
                {isReset ? 'Reset Password' : 'Confirm'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
