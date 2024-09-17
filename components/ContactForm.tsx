'use client';

import { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { send } from '@emailjs/browser';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Import useToast from Shadcn UI
import { useToast } from '@/hooks/use-toast';

// Define the form schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
  honeypot: z.string().max(0), // Honeypot field should be empty
});

// Infer the form data type from the schema
type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formLoadTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - formLoadTime.current;

    if (timeElapsed < 5000) {
      // Potential bot detected
      return;
    }

    if (data.honeypot) {
      // Honeypot filled out, likely a bot
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'Elevaseo Team',
          user_name: data.name,
          from_name: data.name,
          user_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('Email successfully sent!', result.status, result.text);

      // Show a success toast notification
      toast({
        title: 'Success',
        description: 'Your message has been sent!',
        variant: 'success',
        duration: 3000,
      });

      reset();
    } catch (error) {
      console.error('Failed to send email. Error:', error);

      // Show an error toast notification
      toast({
        title: 'Error',
        description: 'Failed to send your message. Please try again later.',
        variant: 'destructive',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div style={{ display: 'none' }} aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input id="website" {...register('honeypot')} />
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
    </form>
  );
}
