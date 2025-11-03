'use server';

import prisma from '@/common/lib/prisma';

export interface CreateWaitlistEntryData {
  leadId: number;
}

export interface CreateWaitlistEntryResult {
  success: boolean;
  waitlistEntryId?: number;
  error?: string;
}

export async function createWaitlistEntry(
  data: CreateWaitlistEntryData
): Promise<CreateWaitlistEntryResult> {
  try {
    // Create waitlist entry based on the schema
    const waitlistEntry = await prisma.waitlistEntry.create({
      data: {
        leadId: data.leadId,
        enrollmentAttemptAt: new Date(),
        notificationPreferences: {},
        status: 'ACTIVE', // Default status from enum
      },
    });

    return {
      success: true,
      waitlistEntryId: waitlistEntry.id,
    };
  } catch (error) {
    console.error('Error creating waitlist entry:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Check for foreign key constraint error (lead doesn't exist)
      if (error.message.includes('Foreign key constraint failed')) {
        return {
          success: false,
          error: 'Lead not found. Please complete identification step first.',
        };
      }

      // Check for unique constraint error (duplicate entry)
      if (error.message.includes('Unique constraint failed')) {
        return {
          success: false,
          error: 'You are already on the waitlist.',
        };
      }
    }

    return {
      success: false,
      error: 'Failed to add you to the waitlist. Please try again later.',
    };
  }
}