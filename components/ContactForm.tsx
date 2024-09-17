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

// Importer useToast depuis Shadcn UI
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Le nom est requis.'),
  email: z.string().email('Adresse e-mail invalide.'),
  message: z.string().min(1, 'Le message est requis.'),
  honeypot: z.string().max(0), // Le champ Honeypot doit être vide
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      // Soumission de bot détectée
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'Équipe Elevaseo', // Remplacez par le nom du destinataire si nécessaire
          user_name: data.name,
          from_name: data.name,
          user_email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      console.log('Email envoyé avec succès !', result.status, result.text);

      // Afficher une notification de succès
      toast({
        title: 'Succès',
        description: 'Votre message a été envoyé !',
        variant: 'success',
        duration: 3000, // Durée en millisecondes (3 secondes)
      });

      reset();
    } catch (error) {
      console.error("Échec de l'envoi de l'email. Erreur :", error);

      // Afficher une notification d'erreur
      toast({
        title: 'Erreur',
        description:
          "Échec de l'envoi de votre message. Veuillez réessayer plus tard.",
        variant: 'destructive',
        duration: 3000, // Durée en millisecondes (3 secondes)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Champ Honeypot */}
      <div style={{ display: 'none' }}>
        <Label htmlFor="honeypot">Laissez ce champ vide</Label>
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
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </Button>
    </form>
  );
}
