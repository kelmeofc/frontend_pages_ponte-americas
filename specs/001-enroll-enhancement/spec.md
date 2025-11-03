# Feature Specification: Enhanced Enrollment System with Robust Lead Management

**Feature Branch**: `001-enroll-enhancement`  
**Created**: 3 de novembro de 2025  
**Status**: Draft  
**Input**: User description: "a implementação do enroll carece de uma action com a robustez da já implementada download ebook. Preciso especificar no prisma schema. Quando eu submeter a primeira parte do forn, que é de identificação, devo esperar o feedback positivo em salvar o lead para então executar um método que chama o próximo passo, que é pagamento. A lógica de steps não está funcional, e os métodos não estão bem segragados. Não há uma boa orientação a objetos aqui. A lógica de realizar pagamento não deve ser implementada ainda, no lugar dela devo chamar um modal de matrículas esgotadas e avisar que a pessoa está numa lista de espera, logo após chamar o step 2 pagamento devo chamar o método que executa a chamada desse modal. use componente da shadcn ui para modal."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Robust Lead Creation and Validation (Priority: P1)

A prospective student visits the enrollment page, fills out their identification information (name, email, phone), and receives immediate feedback on whether their lead was successfully created before proceeding to the payment step.

**Why this priority**: This is the core functionality that ensures data integrity and provides proper user feedback. Without reliable lead creation, the entire enrollment funnel fails.

**Independent Test**: Can be fully tested by filling out the identification form, submitting it, and verifying that the lead is saved to the database with proper validation and user receives success confirmation before the next step is enabled.

**Acceptance Scenarios**:

1. **Given** a user is on the enrollment page, **When** they fill out valid identification information and submit, **Then** their lead is saved to the database and they receive success feedback
1. **Given** a user submits invalid information, **When** validation fails, **Then** they see real-time specific error messages per field and cannot proceed to the next step
3. **Given** there's a database error during lead creation, **When** submission fails, **Then** user sees appropriate error message and can retry submission

---

### User Story 2 - Structured Multi-Step Flow Control (Priority: P2)

A user progresses through the enrollment process in clearly defined steps, with each step properly isolated and accessible only when previous steps are successfully completed.

**Why this priority**: Proper step management ensures users can't access payment functionality before completing identification, and provides clear progress indication.

**Independent Test**: Can be tested by attempting to access step 2 without completing step 1, verifying step progression only works after successful completion of previous steps.

**Acceptance Scenarios**:

1. **Given** a user hasn't completed identification, **When** they try to access payment step, **Then** they are prevented from accessing it
2. **Given** a user successfully completes identification, **When** step validation passes, **Then** payment step becomes accessible
3. **Given** a user is on any step, **When** they view the interface, **Then** they can clearly see their current progress and next actions

---

### User Story 3 - Waitlist Notification for Enrollment Capacity (Priority: P3)

When a user reaches the payment step, they are immediately shown a modal indicating that enrollment spots are full and they have been added to a waiting list.

**Why this priority**: This manages user expectations about course availability and provides a graceful way to handle capacity limitations without implementing actual payment processing.

**Independent Test**: Can be tested by completing the identification step and verifying that the waitlist modal appears when payment step is accessed, with appropriate messaging and user acknowledgment options.

**Acceptance Scenarios**:

1. **Given** a user completes identification step, **When** they proceed to payment step, **Then** a waitlist modal immediately appears
2. **Given** the waitlist modal is displayed, **When** user acknowledges the message, **Then** modal closes and they understand they're on the waiting list
3. **Given** a user is shown the waitlist modal, **When** they close it, **Then** they remain on current step with visible waitlist status and Instagram follow button

---

### Edge Cases

- What happens when user refreshes page during step progression?
- How does system handle network timeouts during lead creation?
- What occurs if user tries to submit duplicate enrollment requests?
- How does system respond when database is temporarily unavailable?
- What happens if user navigates away and returns to enrollment page?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create a robust enrollment lead action with the same reliability pattern as the existing ebook download functionality
- **FR-002**: System MUST validate and persist enrollment lead data to database before allowing step progression
- **FR-003**: System MUST provide immediate success/failure feedback to users after form submission
- **FR-004**: System MUST prevent access to subsequent steps until previous steps are successfully completed
- **FR-005**: System MUST implement proper object-oriented separation of concerns for step management
- **FR-006**: System MUST display waitlist modal immediately when payment step is accessed
- **FR-007**: System MUST validate email format, phone number format according to Brazilian standards, and password strength (minimum 8 characters)
- **FR-011**: System MUST collect and validate required identification fields: full name, email, phone, and password
- **FR-013**: System MUST implement real-time validation on field blur using Zod schemas with specific error messages per field
- **FR-014**: System MUST show loading state in submit button with spinner while keeping form active for corrections during submission
- **FR-008**: System MUST handle database errors gracefully with appropriate user messaging
- **FR-009**: System MUST track enrollment lead origin and metadata for analytics
- **FR-010**: System MUST use shadcn/ui modal component for waitlist notification
- **FR-012**: System MUST show waitlist status on screen after modal closure with Instagram follow button for engagement
- **FR-015**: System MUST enrich existing Lead records with enrollment-specific fields when ebook leads attempt enrollment, preserving original ebook data
- **FR-016**: System MUST hash passwords using bcrypt with salt rounds 12 before storing in database
- **FR-017**: System MUST extend Lead table with password (nullable), leadType enum, and enrollmentStatus enum fields
- **FR-018**: System MUST refactor existing create-lead-action to accept leadType parameter and handle enrollment-specific logic

### Key Entities *(include if feature involves data)*

- **Lead**: Enhanced unified entity with leadType enum (EBOOK, ENROLLMENT), core identification fields (name, email, phone), optional password (hashed), enrollmentStatus enum, and existing metadata fields
- **Submission**: Tracks each form submission attempt with leadId, type (EBOOK/ENROLLMENT), success status, submitted data, metadata (IP, user agent, etc.), and timestamp
- **StepProgress**: Tracks which enrollment steps have been completed by each lead, including validation status and completion timestamps  
- **WaitlistEntry**: Represents a user's position in the enrollment waiting list, with enrollment attempt timestamp and notification preferences

### Database Schema Changes

#### Lead Table Modifications
- Add `password` field (String?, nullable, bcrypt hashed)
- Add `leadType` enum field (EBOOK, ENROLLMENT) - default EBOOK for existing records
- Add `enrollmentStatus` enum field (nullable for ebook-only leads)
- Remove existing `EnrollmentLead` table (consolidate into Lead)

#### New Submissions Table
- `id` (Int, autoincrement, primary key)
- `leadId` (Int, foreign key to Lead.id)
- `type` (enum: EBOOK_DOWNLOAD, ENROLLMENT_ATTEMPT)
- `success` (Boolean)
- `data` (Json, submitted form data)
- `metadata` (Json, IP, userAgent, etc.)
- `createdAt` (DateTime)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users receive immediate feedback within 3 seconds of form submission, with clear success or error messaging
- **SC-002**: 100% of valid enrollment leads are successfully saved to database before step progression occurs
- **SC-003**: Users cannot access payment step without completing identification step validation
- **SC-004**: 95% of users understand they are on a waiting list after seeing the waitlist modal
- **SC-005**: System handles database connectivity issues with graceful error recovery in 99% of cases
- **SC-006**: Enrollment funnel completion tracking improves by 40% due to better step progression feedback
- **SC-007**: Support tickets related to enrollment confusion decrease by 60% due to clearer user feedback

## Clarifications

### Session 2025-11-03

- Q: Como o novo EnrollmentLead deve se relacionar com o sistema de leads existente? → A: Unificar em uma única tabela de leads com diferentes tipos/categorias
- Q: Quais campos específicos devem ser obrigatórios no formulário de identificação do enrollment? → A: nome, email, telefone e senha
- Q: Como o modal de lista de espera deve se comportar após o usuário fechar ou reconhecer a mensagem? → A: Permanecer no step atual com status de "na lista de espera" visível, com botão acompanhar no instagram
- Q: Como o sistema deve apresentar erros de validação no formulário de identificação? → A: Validação em tempo real (blur) + mensagens específicas por campo + ZOD
- Q: Qual deve ser o comportamento visual durante o processo de submissão do formulário de identificação? → A: Botão com loading state + skeleton/spinner + formulário ativo para correções
- Q: Como o sistema deve tratar quando um lead existente de ebook tenta se matricular? → A: Enriquecer Lead existente com novos campos + criar registro na tabela Submissions
- Q: Como as senhas de enrollment devem ser armazenadas de forma segura no banco de dados? → A: Hash com bcrypt (salt rounds 12) antes de salvar no banco
- Q: Quais campos a nova tabela Submissions deve conter para rastrear tentativas de submissão? → A: Campos completos: leadId, type, success, data, metadata, createdAt
- Q: Quais novos campos devem ser adicionados à tabela Lead para suportar dados de enrollment? → A: password, leadType, enrollmentStatus
- Q: Como as actions existentes (create-lead-action) devem ser modificadas para suportar o novo sistema? → A: Refatorar action existente para aceitar tipo de lead como parâmetro

## Assumptions

- Users have basic familiarity with web forms and expect immediate feedback after submission
- Database connectivity is generally reliable but occasional outages may occur
- Course enrollment has capacity limitations requiring waitlist management
- Users prefer clear progress indication over ambiguous loading states
- Brazilian phone number format validation is required for local compliance
- Existing ebook download functionality represents the desired reliability pattern for lead creation

## Dependencies

- Existing Prisma database schema and connection infrastructure
- Current shadcn/ui component library installation
- Existing lead creation patterns and utilities from ebook download feature
- Form validation framework (React Hook Form + Zod) already in use for real-time validation patterns

## Scope

### In Scope
- Enhanced enrollment lead creation with robust error handling
- Multi-step form progression with proper validation gates
- Waitlist modal implementation using shadcn/ui components
- Database schema updates for enrollment-specific lead tracking
- Object-oriented refactoring of step management logic
- Prisma schema migration for Lead table extensions and new Submissions table
- Refactoring existing lead actions to support unified lead management

### Out of Scope
- Actual payment processing implementation
- Automated waitlist notification system
- Course capacity management interface
- Email confirmation workflows for enrollment
- Admin dashboard for enrollment management
