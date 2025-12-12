"use server";

import {
	userService,
	type IUserService,
	type CreateUserResult,
	type UpdateUserResult,
} from "@/server/services/user/user.service";
import type { CreateUserRequest, UpdateUserRequest } from "@/types/user";

export type { CreateUserResult, UpdateUserResult };

export async function createUserAction(
	userData: CreateUserRequest,
	deps: { service: IUserService } = { service: userService }
): Promise<CreateUserResult> {
	return deps.service.create(userData);
}

export async function updateUserAction(
	userId: number,
	userData: UpdateUserRequest,
	deps: { service: IUserService } = { service: userService }
): Promise<UpdateUserResult> {
	return deps.service.update(userId, userData);
}

// NOTE: `completeUserStepAction` foi removida deste arquivo. A lógica de progresso de passos
// agora pertence a outro módulo responsável por passo a passo (step-progress).
