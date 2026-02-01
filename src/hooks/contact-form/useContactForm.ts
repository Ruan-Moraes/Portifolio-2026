import { useState, useCallback } from 'react';

import {
    CONTACT_FORM_CONFIG,
    type ContactFormData,
    type ContactFormErrors,
    type FormStatus,
    initialErrors,
    initialFormData,
} from './useContactForm.config';

export { CONTACT_FORM_CONFIG } from './useContactForm.config';



interface UseContactFormReturn {
    formData: ContactFormData;
    errors: ContactFormErrors;
    status: FormStatus;
    serverError: string | null;
    updateField: (field: keyof ContactFormData, value: string) => void;
    validate: () => boolean;
    submit: () => Promise<boolean>;
    reset: () => void;
    isValid: boolean;
}

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

                    if (value.trim().length < 2)
                        return 'Nome deve ter pelo menos 2 caracteres';

                    if (value.trim().length > 100)
                        return 'Nome deve ter no máximo 100 caracteres';

                    break;

                case 'email':
                    if (!value.trim()) return 'E-mail é obrigatório';

                    if (!CONTACT_FORM_CONFIG.emailRegex.test(value))
                        return 'E-mail inválido';

                    break;

                case 'message':
                    if (!value.trim()) return 'Mensagem é obrigatória';

                    if (value.trim().length < 10)
                        return 'Mensagem deve ter pelo menos 10 caracteres';

                    if (value.length > CONTACT_FORM_CONFIG.maxMessageLength) {
                        return `Mensagem deve ter no máximo ${CONTACT_FORM_CONFIG.maxMessageLength} caracteres`;
                    }

                    break;
            }
            return undefined;
        },
        []
    );

    const updateField = useCallback(
        (field: keyof ContactFormData, value: string) => {
            setFormData((prev) => ({ ...prev, [field]: value }));

            if (errors[field]) {
                setErrors((prev) => {
                    const newErrors = { ...prev };

                    delete newErrors[field];

                    return newErrors;
                });
            }

            if (status === 'error' || status === 'success') {
                setStatus('idle');
                setServerError(null);
            }
        },
        [errors, status]
    );

    const validate = useCallback((): boolean => {
        const newErrors: ContactFormErrors = {};

        (Object.keys(formData) as Array<keyof ContactFormData>).forEach(
            (field) => {
                const error = validateField(field, formData[field]);

                if (error) {
                    newErrors[field] = error;
                }
            }
        );

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, validateField]);

    const submit = useCallback(async (): Promise<boolean> => {
        if (!validate()) {
            return false;
        }

        setStatus('submitting');
        setServerError(null);

        try {
            const response = await fetch(
                CONTACT_FORM_CONFIG.formspreeEndpoint,
                {
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
                }
            );

            if (response.ok) {
                setStatus('success');

                setFormData(initialFormData);

                return true;
            } else {
                const data = await response.json();

                setStatus('error');

                setServerError(
                    data.error || 'Erro ao enviar mensagem. Tente novamente.'
                );

                return false;
            }
        } catch (error) {
            console.error('Contact form error:', error);

            setStatus('error');

            setServerError(
                'Erro de conexão. Verifique sua internet e tente novamente.'
            );

            return false;
        }
    }, [formData, validate]);

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
