---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

This project is a landing page for Pandami, an online visagism platform. The page is built using Next.js 15 and TailwindCSS 4, and we use Shadcn UI dependencies.

## Font Import Setup

Whenever you need to modify font configuration, reference #file:globals.css #file:layout.tsx #file:tailwind.config.js as fonts are referenced in these files. Ensure consistency when importing to avoid build errors due to misconfiguration. Follow Clean Code principles and aim for best development practices for the technology.

## Page Styling

- Always prefer TailwindCSS for styling, avoid pure CSS.
- When styling backgrounds, foregrounds, and primary color elements, or even gradients, prefer using TailwindCSS CSS variables in "#file:@/styles/globals.css".
- Use TailwindCSS utility classes to maintain visual consistency and facilitate code maintenance.

## When Creating New Sections
- Check the styling and semantic construction of existing sections to maintain visual and structural consistency throughout the project.
- Follow the componentization applied to existing sections, creating reusable components when necessary and using components already used in other sections if they exist.
- Consider responsiveness from the start, using TailwindCSS utility classes to ensure the section works well on different screen sizes.
- Always use the <section> tag to define new sections on the page.
- Always define an id for the section, which should be the same as the section name in lowercase and without spaces. Example: id="pricing" for the pricing section.
- Always use the <Container> tag to wrap the section content, ensuring consistent alignment and spacing.
- Always use descriptive and clear titles for each section, using <h2> or <h3> tags as appropriate.
- Prefer CSS variables defined in "#file:@/styles/globals.css" for colors.
- Always use icons from the "lucide-react" library to maintain visual consistency, and if they are brand or social media icons, use simple-icons.
- Gray color classes are "neutral".
- Use TailwindCSS utility classes to style the section, ensuring the appearance aligns with the overall page design.
- Always use the Primary Button for primary buttons and the Secondary Button for secondary buttons, as applied in the Header for example.

## Using Fonts

- There are already global styles for h1, h2, h3 to use the clashDisplay font, and for the rest of project to apply Rubik at :root.
- Always prefer to use the fonts defined in the project, unless there is a specific need for a different font.
- Avoid 'font-['clashDisplay']' or 'font-['Rubik']' in Tailwind classes, do not add classes in instances for fonts, the global classes are already defined for h1, h2, h3 and body in #global.css.
- Use TailwindCSS utility classes to apply additional styles such as font weight, size and spacing as needed.