'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useHttpClient } from '@/context/HttpClientContext';
import NewTransactionForm, {
  NewTransactionFormValues,
} from '@/components/client/new-transaction-form';
import { Card } from '@/components/ui/card';
import { Dialog2FA } from '@/components/Dialog2FA';
import { getAccounts } from '@/api/account';
import { createPayment, getAllClientContacts, sendCode } from '@/api/client';
import { RecipientDto } from '@/api/response/recipient';
import { Toaster, toast } from 'sonner';
import {
  ClientContactResponseDto,
  PaymentResponseDto,
} from '@/api/response/client';
import { Axios } from 'axios';
import { Pageable } from '@/types/pageable';

export default function NewPaymentPage() {
  ///const [recipients, setRecipients] = useState<ClientContactResponseDto[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentData, setPaymentData] =
    useState<NewTransactionFormValues | null>(null);

  const client = useHttpClient();

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await getAccounts(client);
      console.log(response);
      return response.data;
    },
  });

  const { data: recipients, isLoading: isLoadingRecipients } = useQuery({
    queryKey: ['recipients'],
    queryFn: async () => {
      const response = await getAllClientContacts(client, 10, 0);
      return response.data.content;
    },
  });

  const handleCreatePayment = async (data: NewTransactionFormValues) => {
    setPaymentData(data);
    setIsDialogOpen(true);
  };

  /* TODO(marko): fix this once backend implements 2FA; no point in doing it now since the whole logic will change then */
  const handleDialogSubmit = async (otp: string) => {
    if (!paymentData) return;

    try {
      setIsPending(true);

      const paymentRequest = {
        fromAccount: paymentData.payerAccount,
        toAccount: paymentData.recipientAccount,
        recipient: paymentData.recipientName,
        fromAmount: paymentData.amount,
        paymentCode: paymentData.paymentCode,
        paymentPurpose: paymentData.paymentPurpose,
        referenceNumber: paymentData.referenceNumber ?? '',
        otpCode: otp,
      };

      const response: PaymentResponseDto = await createPayment(
        client,
        paymentRequest
      );
      const paymentId = response.id;
      await sendCode(client, { content: otp, paymentId });
      console.log('Payment successful', response);
      setIsDialogOpen(false);
      toast.success('Payment successful');
    } catch (error) {
      console.error('Payment failed', error);
      toast.error('Payment failed');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[430px] p-4">
        <NewTransactionForm
          onSubmitAction={handleCreatePayment}
          accounts={accounts || []}
          recipients={recipients || []}
          isPending={isPending}
        />
        <Dialog2FA
          open={isDialogOpen}
          onSubmit={handleDialogSubmit}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Card>
      <Toaster />
    </div>
  );
}
