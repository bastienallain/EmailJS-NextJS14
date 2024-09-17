// components/ContactForm.tsx

'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { send } from '@emailjs/browser';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
  honeypot: z.string().max(0), // Honeypot field should be empty
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) {
      // Bot submission detected
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'Elevaseo team',
          user_name: data.name,
          from_name: data.name,
          user_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('Email successfully sent!', result.status, result.text);
      setSubmitSuccess(true);
      setSubmitError(''); // Clear any previous errors
      reset();
    } catch (error) {
      console.error('Failed to send email. Error:', error);
      setSubmitError('Failed to send email. Please try again later.');
      setSubmitSuccess(false); // Ensure success is false
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Honeypot Field */}
      <div style={{ display: 'none' }}>
        <Label htmlFor="honeypot">Leave this field blank</Label>
        <Input id="honeypot" {...register('honeypot')} />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register('message')} />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </Button>

      {/* Success Alert */}
      {submitSuccess && (
        <Alert variant="success" className="mt-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your message has been sent!</AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {submitError && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
