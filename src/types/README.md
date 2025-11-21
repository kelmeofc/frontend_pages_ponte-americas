# Types Directory

Este diretório contém todas as definições de tipos TypeScript utilizadas no projeto.

## Estrutura

### Core Types

- **`program.ts`** - Tipos relacionados a programas, cursos, mentores e módulos
  - `MentorProfile` - Perfil do mentor/professor
  - `CourseModule` - Módulo individual do curso
  - `HeroSectionProps` - Props da seção hero
  - `MentorSectionProps` - Props da seção de mentor
  - `ProgramPageData` - Dados completos de uma página de programa

- **`header.ts`** - Tipos de navegação e header
  - `INavItem` - Item de navegação
  - `IActionButton` - Botão de ação
  - `IActionButtons` - Conjunto de botões de ação
  - `ILanguageOption` - Opção de idioma
  - `HeaderVariant` - Variantes do header

- **`enrollment.ts`** - Tipos do sistema de matrícula
  - `EnrollmentFormData` - Dados do formulário de matrícula
  - `EnrollmentStatus` - Status da matrícula
  - `CreateLeadRequest` - Request para criar lead
  - `LeadResponse` - Response de lead

- **`lead.ts`** - Tipos de leads e submissões
  - `Lead` - Lead básico
  - `LeadSubmission` - Submissão de lead
  - `ICreateLead` - Interface para criar lead

- **`ebook-lead.ts`** - Tipos específicos para leads de ebook
  - `ICreateEbookLead` - Criar lead de ebook
  - `IEbookLead` - Lead de ebook

- **`user.ts`** - Tipos relacionados a usuários

- **`post.ts`** - Tipos de posts do blog

- **`animation.ts`** - Tipos de animações

- **`legal-metadata.ts`** - Metadados legais

## Como Usar

### Importação Centralizada

Sempre importe tipos do arquivo de índice para manter consistência:

```typescript
// ✅ Correto - Importação centralizada
import type { MentorProfile, HeroSectionProps, INavItem } from '@/types';

// ❌ Evitar - Importação direta
import type { MentorProfile } from '@/types/program';
```

### Exemplos de Uso

#### Definindo Props de Componente

```typescript
import type { HeroSectionProps } from '@/types';

export function HeroSection(props: HeroSectionProps) {
  // ...
}
```

#### Definindo Dados de Página

```typescript
import type { MentorSectionProps, CourseModule } from '@/types';

const mentorData: MentorSectionProps = {
  mentor: {
    name: "John Doe",
    role: "Founder",
    // ...
  },
  modules: [
    // ...
  ],
  ctaText: "Get Started",
  ctaHref: "#pricing"
};
```

## Boas Práticas

1. **Single Source of Truth (SSOT)**
   - Todos os tipos devem ser definidos uma única vez
   - Evite duplicação de interfaces
   - Use o arquivo `index.ts` para exportações centralizadas

2. **Nomenclatura**
   - Use PascalCase para interfaces e tipos: `MentorProfile`, `CourseModule`
   - Use prefixo `I` apenas para interfaces legadas: `INavItem`
   - Use sufixo `Props` para props de componentes: `HeroSectionProps`

3. **Documentação**
   - Adicione JSDoc comments para tipos complexos
   - Documente cada propriedade quando necessário
   - Inclua exemplos de uso quando apropriado

4. **Organização**
   - Agrupe tipos relacionados no mesmo arquivo
   - Mantenha arquivos focados em um domínio específico
   - Use exportações nomeadas explícitas quando houver conflitos

## Adicionando Novos Tipos

1. Crie ou edite o arquivo apropriado em `/types`
2. Adicione JSDoc comments descritivos
3. Exporte o tipo no arquivo `index.ts`
4. Atualize este README se necessário
5. Use o tipo nos componentes via importação centralizada

## Conflitos de Nomes

Quando houver conflitos de nomes entre arquivos, use exportações explícitas no `index.ts`:

```typescript
// Exportação explícita para evitar conflitos
export type { Lead, LeadSubmission } from './lead';
export { EOriginLead } from './lead';
```
