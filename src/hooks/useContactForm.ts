import { useState, useCallback } from 'react';

// ===== CONFIGURAÇÕES =====
export const CONTACT_FORM_CONFIG = {
  /** URL do endpoint Formspree (substituir pelo seu) */
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  /** Tempo mínimo de submissão para evitar spam (ms) */
  minSubmitTime: 1000,
  /** Tamanho máximo da mensagem (caracteres) */
  maxMessageLength: 5000,
  /** Regex para validação de email */
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// ===== TIPOS =====
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseContactFormReturn {
  /** Dados do formulário */
  formData: ContactFormData;
  /** Erros de validação */
  errors: ContactFormErrors;
  /** Status do formulário */
  status: FormStatus;
  /** Mensagem de erro do servidor */
  serverError: string | null;
  /** Atualizar um campo */
  updateField: (field: keyof ContactFormData, value: string) => void;
  /** Validar todos os campos */
  validate: () => boolean;
  /** Enviar formulário */
  submit: () => Promise<boolean>;
  /** Resetar formulário */
  reset: () => void;
  /** Verificar se o formulário é válido */
  isValid: boolean;
}

// ===== VALORES INICIAIS =====
const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

const initialErrors: ContactFormErrors = {};

// ===== HOOK =====
export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>(initialErrors);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  // Validar um campo específico
  const validateField = useCallback(
    (field: keyof ContactFormData, value: string): string | undefined => {
      switch (field) {
        case 'name':
          if (!value.trim()) return 'Nome é obrigatório';
          if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
          if (value.trim().length > 100) return 'Nome deve ter no máximo 100 caracteres';
          break;

        case 'email':
          if (!value.trim()) return 'E-mail é obrigatório';
          if (!CONTACT_FORM_CONFIG.emailRegex.test(value)) return 'E-mail inválido';
          break;

        case 'message':
          if (!value.trim()) return 'Mensagem é obrigatória';
          if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
          if (value.length > CONTACT_FORM_CONFIG.maxMessageLength) {
            return `Mensagem deve ter no máximo ${CONTACT_FORM_CONFIG.maxMessageLength} caracteres`;
          }
          break;
      }
      return undefined;
    },
    []
  );

  // Atualizar campo com validação em tempo real
  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Limpar erro ao digitar
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      // Resetar status se estava em erro/sucesso
      if (status === 'error' || status === 'success') {
        setStatus('idle');
        setServerError(null);
      }
    },
    [errors, status]
  );

  // Validar todos os campos
  const validate = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {};

    (Object.keys(formData) as Array<keyof ContactFormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Enviar formulário
  const submit = useCallback(async (): Promise<boolean> => {
    // Validar antes de enviar
    if (!validate()) {
      return false;
    }

    setStatus('submitting');
    setServerError(null);

    try {
      const response = await fetch(CONTACT_FORM_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(initialFormData);
        return true;
      } else {
        const data = await response.json();
        setStatus('error');
        setServerError(data.error || 'Erro ao enviar mensagem. Tente novamente.');
        return false;
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setServerError('Erro de conexão. Verifique sua internet e tente novamente.');
      return false;
    }
  }, [formData, validate]);

  // Resetar formulário
  const reset = useCallback(() => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setStatus('idle');
    setServerError(null);
  }, []);

  // Verificar se é válido (sem executar validação)
  const isValid =
    formData.name.trim().length >= 2 &&
    CONTACT_FORM_CONFIG.emailRegex.test(formData.email) &&
    formData.message.trim().length >= 10;

  return {
    formData,
    errors,
    status,
    serverError,
    updateField,
    validate,
    submit,
    reset,
    isValid,
  };
}
