"use client";

import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";

import { StepIndicator } from "@/components/enrollment/step-indicator";
import { IdentificationForm } from "@/components/enrollment/identification-form";
import { PaymentForm } from "@/components/enrollment/payment-form";
import { PaymentStep } from "@/components/enrollment/payment-step";
import { useEnrollmentFlow } from "@/common/hooks/use-enrollment-flow";
import useCreateUser from "@/common/hooks/use-create-user";
import { type UserEnrollmentFormDataSchema } from "@/common/schemas/user.schema";
import { type PaymentData } from "@/common/schemas/payment.schema";
import {
	ERROR_MESSAGES,
	getErrorMessage,
	getErrorType,
	isRetryableError,
} from "@/common/utils/error-handlers";
import { Container } from "@/components/ui/container";

type IdentificationData = UserEnrollmentFormDataSchema;

const AUTO_HIDE_TIMEOUT = 6000;

const LoadingIndicator: React.FC = () => (
	<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
		<div className="flex items-center gap-3">
			<Loader2 className="w-5 h-5 animate-spin text-blue-600" />
			<div>
				<p className="text-blue-800 font-medium text-sm">
					Processando seus dados...
				</p>
				<p className="text-blue-600 text-xs">
					Aguarde enquanto criamos sua conta de forma segura.
				</p>
			</div>
		</div>
	</div>
);

export default function EnrollPage() {
	const { flowStep, nextStep, previousStep, markStepCompleted } =
		useEnrollmentFlow();

	const [identificationData, setIdentificationData] =
		useState<IdentificationData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });
	const [retryCount, setRetryCount] = useState(0);
	const [lastSubmissionData, setLastSubmissionData] =
		useState<IdentificationData | null>(null);
	const { execCreateUser, loading: hookLoading } = useCreateUser();

	const handleFlowError = useCallback((error: unknown, context: string) => {
		if (process.env.NODE_ENV === "development") {
			console.error(`Enrollment flow error in ${context}:`, error);
		}

		setFeedbackMessage({
			type: "error",
			message: getErrorMessage(error),
		});

		setIsLoading(false);
	}, []);

	const sanitizeUserData = useCallback((data: IdentificationData) => {
		const { brand, description, ...userData } = data as any;
		return userData;
	}, []);

	const handleSuccess = useCallback(
		(data: IdentificationData) => {
			setRetryCount(0);
			setFeedbackMessage({
				type: "success",
				message: "Conta criada com sucesso! Prosseguindo para pagamento...",
			});

			setIdentificationData(data);
			markStepCompleted("identification");
			nextStep();
		},
		[markStepCompleted, nextStep]
	);

	const handleSubmissionError = useCallback(
		(error?: string, data?: IdentificationData) => {
			if (process.env.NODE_ENV === "development") {
				console.error("Submission error:", error);
			}

			const errorMessage =
				typeof error === "string"
					? ERROR_MESSAGES[error as keyof typeof ERROR_MESSAGES] ||
					  ERROR_MESSAGES.default
					: ERROR_MESSAGES.default;

			setFeedbackMessage({ type: "error", message: errorMessage });

			if (!isRetryableError(error)) {
				setRetryCount(0);
			}

			const timeoutId = setTimeout(() => {
				setFeedbackMessage((prev) =>
					prev.type === "error" ? { type: null, message: "" } : prev
				);
			}, AUTO_HIDE_TIMEOUT);

			return () => clearTimeout(timeoutId);
		},
		[]
	);

	const handleIdentificationSubmit = useCallback(
		async (data: IdentificationData) => {
			setRetryCount(0);
			setLastSubmissionData(data);

			setIsLoading(true);
			setFeedbackMessage({ type: null, message: "" });

			try {
				const userData = sanitizeUserData(data);

				const result = await execCreateUser({
					data: userData,
					successMessage:
						"Conta criada com sucesso! Redirecionando para próxima etapa...",
					showModal: false,
				});

				if (result.success) {
					handleSuccess(data);
				} else {
					handleSubmissionError(result.error, data);
				}
			} catch (error) {
				if (process.env.NODE_ENV === "development") {
					console.error("Erro na criação do usuário:", error);
				}
				const errorType = getErrorType(error);
				handleSubmissionError(errorType, data);
			} finally {
				setIsLoading(false);
			}
		},
		[sanitizeUserData, execCreateUser, handleSuccess, handleSubmissionError]
	);

	const handleRetry = useCallback(
		async (data: IdentificationData) => {
			setIsLoading(true);
			setFeedbackMessage({ type: null, message: "" });

			try {
				const userData = sanitizeUserData(data);

				const result = await execCreateUser({
					data: userData,
					successMessage:
						"Conta criada com sucesso! Redirecionando para próxima etapa...",
					showModal: false,
				});

				if (result.success) {
					handleSuccess(data);
				} else {
					handleSubmissionError(result.error, data);
				}
			} catch (error) {
				if (process.env.NODE_ENV === "development") {
					console.error("Erro na criação do usuário:", error);
				}
				const errorType = getErrorType(error);
				handleSubmissionError(errorType, data);
			} finally {
				setIsLoading(false);
			}
		},
		[sanitizeUserData, execCreateUser, handleSuccess, handleSubmissionError]
	);

	const clearFeedback = useCallback(() => {
		setFeedbackMessage({ type: null, message: "" });
	}, []);

	const handlePaymentSubmit = useCallback(
		async (data: PaymentData) => {
			setIsLoading(true);

			try {
				// TODO: Implementar integração com gateway de pagamento
				await new Promise((resolve) => setTimeout(resolve, 2000));

				// TODO: Redirecionar para página de sucesso
				if (process.env.NODE_ENV === "development") {
					console.log("Payment processed successfully");
				}
			} catch (error) {
				if (process.env.NODE_ENV === "development") {
					console.error("Payment error:", error);
				}
				handleFlowError(error, "payment");
			} finally {
				setIsLoading(false);
			}
		},
		[handleFlowError]
	);

	return (
		<div className="sm:py-8 px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center min-h-screen">
			<Container className="max-w-lg">
				<div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 w-full">
					<div className="flex justify-center mb-6 sm:mb-8">
						<StepIndicator currentStep={flowStep} />
					</div>

					<h1 className="text-center text-black text-lg sm:text-xl font-semibold uppercase leading-6 mb-6 sm:mb-8 px-2">
						Criar sua conta para continuar sua matrícula
					</h1>

					{(isLoading || hookLoading) && <LoadingIndicator />}

					{flowStep === "identification" && (
						<IdentificationForm
							isLoading={isLoading}
							hookLoading={hookLoading}
							feedbackMessage={feedbackMessage}
							retryCount={retryCount}
							lastSubmissionData={lastSubmissionData}
							onSubmit={handleIdentificationSubmit}
							onRetry={handleRetry}
							clearFeedback={clearFeedback}
						/>
					)}

					{flowStep === "payment" && (
						<div className="space-y-6">
							<div className="mb-6">
								<PaymentStep onBack={previousStep} isLoading={isLoading} />
							</div>

							<PaymentForm
								isLoading={isLoading}
								onSubmit={handlePaymentSubmit}
							/>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
}
