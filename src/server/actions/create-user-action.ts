"use server";

import bcrypt from "bcrypt";
import prisma from "@/common/lib/prisma";
import {
	CreateUserRequest,
	UpdateUserRequest,
	EnrollmentStatus,
	UserSubmissionType,
} from "@/types/user";
import type {
	EnrollmentStatus as PrismaEnrollmentStatus,
	UserSubmissionType as PrismaUserSubmissionType,
} from "@prisma/client";

const ms = (s: number) => Date.now() - s;
const ok = (payload: any, s: number) => ({
	success: true,
	...payload,
	processingTimeMs: ms(s),
});
const err = (message: string, code?: string, s?: number) => ({
	success: false,
	error: message,
	...(code ? { code } : {}),
	...(s ? { processingTimeMs: ms(s) } : {}),
});
const fmtUser = (u: any) => ({
	id: u.id,
	name: u.name,
	email: u.email,
	phoneNumber: u.phoneNumber,
	enrollmentStatus: u.enrollmentStatus as EnrollmentStatus,
	city: u.city,
	country: u.country,
	ipAddress: u.ipAddress,
	route: u.route,
	userAgent: u.userAgent,
	originFont: u.originFont,
	origin: u.origin,
	createdAt: u.createdAt?.toISOString(),
	updatedAt: u.updatedAt?.toISOString(),
	enrolledAt: u.enrolledAt?.toISOString(),
});

export async function createUserAction(userData: CreateUserRequest) {
	const start = Date.now();
	try {
		if (await prisma.user.findUnique({ where: { email: userData.email } }))
			return err(
				"Este email já está sendo usado",
				"EMAIL_ALREADY_EXISTS",
				start
			);

		const password = await bcrypt.hash(userData.password, 12);
		const newUser = await prisma.user.create({
			data: {
				name: userData.name,
				email: userData.email,
				phoneNumber: userData.phoneNumber,
				password,
				enrollmentStatus:
					EnrollmentStatus.IDENTIFICATION_PENDING as PrismaEnrollmentStatus,
				city: userData.city,
				country: userData.country,
				ipAddress: userData.ipAddress,
				route: userData.route,
				userAgent: userData.userAgent,
				originFont: userData.originFont,
			},
		});

		await prisma.userSubmission.create({
			data: {
				userId: newUser.id,
				type: UserSubmissionType.ENROLLMENT_ATTEMPT as PrismaUserSubmissionType,
				success: true,
				data: {
					step: "user_creation",
					name: userData.name,
					email: userData.email,
				},
				metadata: {
					processingTimeMs: ms(start),
					ipAddress: userData.ipAddress,
					userAgent: userData.userAgent,
					route: userData.route,
					country: userData.country,
					city: userData.city,
				},
			},
		});

		return ok({ user: fmtUser(newUser) }, start);
	} catch (error) {
		console.error(
			"[CREATE_USER]",
			error instanceof Error ? error.message : error
		);
		return err(
			error instanceof Error ? error.message : "Erro interno do servidor",
			undefined,
			start
		);
	}
}

export async function updateUserAction(
	userId: number,
	userData: UpdateUserRequest
) {
	const start = Date.now();
	try {
		const existing = await prisma.user.findUnique({ where: { id: userId } });
		if (!existing)
			return err("Usuário não encontrado", "USER_NOT_FOUND", start);

		const updated = await prisma.user.update({
			where: { id: userId },
			data: {
				...userData,
				enrolledAt:
					userData.enrollmentStatus === EnrollmentStatus.ENROLLED
						? new Date()
						: existing.enrolledAt,
			},
		});
		return ok({ user: fmtUser(updated) }, start);
	} catch (error) {
		console.error(
			"[UPDATE_USER]",
			error instanceof Error ? error.message : error
		);
		return err(
			error instanceof Error ? error.message : "Erro interno do servidor",
			undefined,
			start
		);
	}
}

// NOTE: `completeUserStepAction` foi removida deste arquivo. A lógica de progresso de passos
// agora pertence a outro módulo responsável por passo a passo (step-progress).
