'use server'

import bcrypt from 'bcrypt';
import prisma from '@/common/lib/prisma';
import { 
  CreateUserRequest,
  UpdateUserRequest,
  CompleteUserStepRequest,
  UserWaitlistEntryRequest,
  EnrollmentStatus,
  UserSubmissionType
} from '@/types/user';
import type { 
  EnrollmentStatus as PrismaEnrollmentStatus,
  UserSubmissionType as PrismaUserSubmissionType,
  WaitlistStatus as PrismaWaitlistStatus
} from '@prisma/client';

// Create new user for enrollment
export async function createUserAction(userData: CreateUserRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_USER] Iniciando criação de usuário:', {
      name: userData.name,
      email: userData.email,
      brand: userData.brand,
    });

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      console.log('[CREATE_USER] Email já existe:', { email: userData.email });
      return {
        success: false,
        error: 'Este email já está sendo usado',
        code: 'EMAIL_ALREADY_EXISTS',
        processingTimeMs: Date.now() - startTime,
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: hashedPassword,
        brand: userData.brand,
        description: userData.description,
        company_size: userData.company_size,
        company_segment: userData.company_segment,
        company_on_market: userData.company_on_market,
        website: userData.website,
        enrollmentStatus: EnrollmentStatus.IDENTIFICATION_PENDING as PrismaEnrollmentStatus,
        city: userData.city,
        country: userData.country,
        ipAddress: userData.ipAddress,
        route: userData.route,
        userAgent: userData.userAgent,
        originFont: userData.originFont,
      },
    });

    // Create initial submission record
    await prisma.userSubmission.create({
      data: {
        userId: newUser.id,
        type: UserSubmissionType.ENROLLMENT_ATTEMPT as PrismaUserSubmissionType,
        success: true,
        data: {
          step: 'user_creation',
          name: userData.name,
          email: userData.email,
          brand: userData.brand,
          description: userData.description,
        },
        metadata: {
          processingTimeMs: Date.now() - startTime,
          ipAddress: userData.ipAddress,
          userAgent: userData.userAgent,
          route: userData.route,
          country: userData.country,
          city: userData.city,
        },
      },
    });

    const processingTime = Date.now() - startTime;

    console.log('[CREATE_USER] Usuário criado com sucesso:', {
      userId: newUser.id,
      email: newUser.email,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        brand: newUser.brand,
        description: newUser.description,
        enrollmentStatus: newUser.enrollmentStatus as EnrollmentStatus,
        company_size: newUser.company_size,
        company_segment: newUser.company_segment,
        company_on_market: newUser.company_on_market,
        website: newUser.website,
        city: newUser.city,
        country: newUser.country,
        ipAddress: newUser.ipAddress,
        route: newUser.route,
        userAgent: newUser.userAgent,
        originFont: newUser.originFont,
        origin: newUser.origin,
        createdAt: newUser.createdAt.toISOString(),
        updatedAt: newUser.updatedAt.toISOString(),
        enrolledAt: newUser.enrolledAt?.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[CREATE_USER] Erro na criação do usuário:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      userData: {
        name: userData.name,
        email: userData.email,
        brand: userData.brand,
      },
      processingTimeMs: processingTime,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}

// Update user information
export async function updateUserAction(userId: number, userData: UpdateUserRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[UPDATE_USER] Atualizando usuário:', {
      userId,
      fields: Object.keys(userData),
    });

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return {
        success: false,
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND',
        processingTimeMs: Date.now() - startTime,
      };
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        enrolledAt: userData.enrollmentStatus === EnrollmentStatus.ENROLLED 
          ? new Date() 
          : existingUser.enrolledAt,
      },
    });

    const processingTime = Date.now() - startTime;

    console.log('[UPDATE_USER] Usuário atualizado com sucesso:', {
      userId: updatedUser.id,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        brand: updatedUser.brand,
        description: updatedUser.description,
        enrollmentStatus: updatedUser.enrollmentStatus as EnrollmentStatus,
        company_size: updatedUser.company_size,
        company_segment: updatedUser.company_segment,
        company_on_market: updatedUser.company_on_market,
        website: updatedUser.website,
        city: updatedUser.city,
        country: updatedUser.country,
        ipAddress: updatedUser.ipAddress,
        route: updatedUser.route,
        userAgent: updatedUser.userAgent,
        originFont: updatedUser.originFont,
        origin: updatedUser.origin,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
        enrolledAt: updatedUser.enrolledAt?.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[UPDATE_USER] Erro na atualização do usuário:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      userId,
      processingTimeMs: processingTime,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}

// Complete enrollment step
export async function completeUserStepAction(userId: number, stepData: CompleteUserStepRequest) {
  const startTime = Date.now();
  
  try {
    console.log('[COMPLETE_USER_STEP] Completando passo:', {
      userId,
      stepNumber: stepData.stepNumber,
      stepName: stepData.stepName,
    });

    const result = await prisma.$transaction(async (tx) => {
      // Check if user exists
      const user = await tx.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Check if step already exists
      const existingStep = await tx.userStepProgress.findUnique({
        where: {
          unique_user_step: {
            userId,
            stepNumber: stepData.stepNumber,
          }
        }
      });

      let stepProgress;
      if (existingStep) {
        // Update existing step
        stepProgress = await tx.userStepProgress.update({
          where: { id: existingStep.id },
          data: {
            completed: true,
            completedAt: new Date(),
            validationData: stepData.validationData,
          },
        });
      } else {
        // Create new step
        stepProgress = await tx.userStepProgress.create({
          data: {
            userId,
            stepNumber: stepData.stepNumber,
            stepName: stepData.stepName,
            completed: true,
            completedAt: new Date(),
            validationData: stepData.validationData,
          },
        });
      }

      // Create submission record
      await tx.userSubmission.create({
        data: {
          userId,
          type: UserSubmissionType.ENROLLMENT_ATTEMPT as PrismaUserSubmissionType,
          success: true,
          data: {
            step: 'step_completion',
            stepNumber: stepData.stepNumber,
            stepName: stepData.stepName,
            validationData: stepData.validationData,
          },
          metadata: {
            processingTimeMs: Date.now() - startTime,
          },
        },
      });

      return stepProgress;
    });

    const processingTime = Date.now() - startTime;

    console.log('[COMPLETE_USER_STEP] Passo completado com sucesso:', {
      userId,
      stepId: result.id,
      stepNumber: result.stepNumber,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      stepProgress: {
        id: result.id,
        userId: result.userId,
        stepNumber: result.stepNumber,
        stepName: result.stepName,
        completed: result.completed,
        completedAt: result.completedAt?.toISOString(),
        validationData: result.validationData as Record<string, any>,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[COMPLETE_USER_STEP] Erro ao completar passo:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      userId,
      stepData,
      processingTimeMs: processingTime,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}

// Create waitlist entry for user
export async function createUserWaitlistEntryAction(
  userId: number, 
  waitlistData: UserWaitlistEntryRequest
) {
  const startTime = Date.now();
  
  try {
    console.log('[CREATE_USER_WAITLIST] Criando entrada na waitlist:', {
      userId,
      notificationPreferences: waitlistData.notificationPreferences,
    });

    // Check if user exists and get current status
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND',
        processingTimeMs: Date.now() - startTime,
      };
    }

    // Check if waitlist entry already exists
    const existingEntry = await prisma.userWaitlistEntry.findUnique({
      where: { userId }
    });

    if (existingEntry) {
      return {
        success: false,
        error: 'Usuário já está na lista de espera',
        code: 'ALREADY_WAITLISTED',
        processingTimeMs: Date.now() - startTime,
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      // Create waitlist entry
      const waitlistEntry = await tx.userWaitlistEntry.create({
        data: {
          userId,
          enrollmentAttemptAt: new Date(),
          notificationPreferences: waitlistData.notificationPreferences || {
            email: true,
            sms: false,
            instagram: false,
          },
        },
      });

      // Update user status to waitlisted
      await tx.user.update({
        where: { id: userId },
        data: {
          enrollmentStatus: EnrollmentStatus.WAITLISTED as PrismaEnrollmentStatus,
        },
      });

      // Create submission record
      await tx.userSubmission.create({
        data: {
          userId,
          type: UserSubmissionType.ENROLLMENT_ATTEMPT as PrismaUserSubmissionType,
          success: true,
          data: {
            action: 'waitlist_entry',
            notificationPreferences: waitlistData.notificationPreferences,
          },
          metadata: {
            processingTimeMs: Date.now() - startTime,
          },
        },
      });

      return waitlistEntry;
    });

    const processingTime = Date.now() - startTime;

    console.log('[CREATE_USER_WAITLIST] Entrada na waitlist criada com sucesso:', {
      userId,
      waitlistId: result.id,
      processingTimeMs: processingTime,
    });

    return {
      success: true,
      waitlistEntry: {
        id: result.id,
        userId: result.userId,
        position: result.position,
        enrollmentAttemptAt: result.enrollmentAttemptAt.toISOString(),
        notificationPreferences: result.notificationPreferences as {
          email: boolean;
          sms: boolean;
          instagram: boolean;
        },
        status: result.status,
        createdAt: result.createdAt.toISOString(),
        updatedAt: result.updatedAt.toISOString(),
      },
      processingTimeMs: processingTime,
    };

  } catch (error) {
    const processingTime = Date.now() - startTime;

    console.error('[CREATE_USER_WAITLIST] Erro ao criar entrada na waitlist:', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      userId,
      processingTimeMs: processingTime,
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor',
      processingTimeMs: processingTime,
    };
  }
}