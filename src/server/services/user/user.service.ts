import type {
  EnrollmentStatus as PrismaEnrollmentStatus,
  UserSubmissionType as PrismaUserSubmissionType,
} from '@prisma/client'
import bcrypt from 'bcrypt'
import prisma from '@/common/lib/prisma'

import {
  CreateUserRequest,
  UpdateUserRequest,
  EnrollmentStatus,
  UserSubmissionType,
} from '@/types/user'

type PrismaClientType = typeof prisma

const ms = (s: number) => Date.now() - s

const fmtUser = (u: {
  id: number
  name: string
  email: string
  phoneNumber: string | null
  enrollmentStatus: PrismaEnrollmentStatus
  city: string | null
  country: string | null
  ipAddress: string | null
  route: string | null
  userAgent: string | null
  originFont: string | null
  origin: number
  createdAt: Date | null
  updatedAt: Date | null
  enrolledAt: Date | null
}) => ({
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
})

export type FormattedUser = ReturnType<typeof fmtUser>

export interface CreateUserResult {
  success: boolean
  user?: FormattedUser
  error?: string
  code?: string
  processingTimeMs?: number
}

export interface UpdateUserResult {
  success: boolean
  user?: FormattedUser
  error?: string
  code?: string
  processingTimeMs?: number
}

export interface IUserService {
  findByEmail(email: string): Promise<{ id: number; email: string } | null>
  findById(id: number): Promise<{ id: number; enrolledAt: Date | null } | null>
  create(userData: CreateUserRequest): Promise<CreateUserResult>
  update(userId: number, userData: UpdateUserRequest): Promise<UpdateUserResult>
}

export class UserService implements IUserService {
  constructor(private db: PrismaClientType = prisma) {}

  async findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } })
  }

  async findById(id: number) {
    return this.db.user.findUnique({ where: { id } })
  }

  async create(userData: CreateUserRequest): Promise<CreateUserResult> {
    const start = Date.now()

    try {
      const existing = await this.findByEmail(userData.email)
      if (existing) {
        return {
          success: false,
          error: 'Este email já está sendo usado',
          code: 'EMAIL_ALREADY_EXISTS',
          processingTimeMs: ms(start),
        }
      }

      const password = await bcrypt.hash(userData.password, 12)
      const newUser = await this.db.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          password,
          enrollmentStatus: EnrollmentStatus.IDENTIFICATION_PENDING as PrismaEnrollmentStatus,
          city: userData.city,
          country: userData.country,
          ipAddress: userData.ipAddress,
          route: userData.route,
          userAgent: userData.userAgent,
          originFont: userData.originFont,
        },
      })

      await this.db.userSubmission.create({
        data: {
          userId: newUser.id,
          type: UserSubmissionType.ENROLLMENT_ATTEMPT as PrismaUserSubmissionType,
          success: true,
          data: {},
          metadata: { processingTimeMs: ms(start) },
        },
      })

      return {
        success: true,
        user: fmtUser(newUser),
        processingTimeMs: ms(start),
      }
    } catch (error) {
      console.error('[USER_SERVICE]', error instanceof Error ? error.message : error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
        processingTimeMs: ms(start),
      }
    }
  }

  async update(userId: number, userData: UpdateUserRequest): Promise<UpdateUserResult> {
    const start = Date.now()

    try {
      const existing = await this.findById(userId)
      if (!existing) {
        return {
          success: false,
          error: 'Usuário não encontrado',
          code: 'USER_NOT_FOUND',
          processingTimeMs: ms(start),
        }
      }

      const updated = await this.db.user.update({
        where: { id: userId },
        data: {
          ...userData,
          enrolledAt:
            userData.enrollmentStatus === EnrollmentStatus.ENROLLED
              ? new Date()
              : existing.enrolledAt,
        },
      })

      return {
        success: true,
        user: fmtUser(updated),
        processingTimeMs: ms(start),
      }
    } catch (error) {
      console.error('[USER_SERVICE]', error instanceof Error ? error.message : error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro interno do servidor',
        processingTimeMs: ms(start),
      }
    }
  }
}

export const userService = new UserService()
