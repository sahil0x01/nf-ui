export type NavItem = { slug: string; title: string; href: string; group: string; description: string };

export const guides: { slug: string; title: string; description: string }[] = [
  { slug: "introduction", title: "Introduction", description: "A copy-and-own pixel component system for Nullfuse products." },
  { slug: "installation", title: "Installation", description: "How to install and configure Nullfuse UI in your project." },
  { slug: "cli", title: "CLI", description: "Use the nullfuse CLI to add components to your project." },
  { slug: "theming", title: "Theming", description: "Design tokens, themes and how to customize them." },
  { slug: "dark-mode", title: "Dark mode", description: "Adding the black theme to your app." },
  { slug: "typography", title: "Typography", description: "Readable type, with a clear scale." },
  { slug: "pixel-system", title: "Pixel system", description: "The primitives behind the notched borders, bevels and drop shadows." },
  { slug: "motion", title: "Motion", description: "Frame-by-frame animation: principles, tokens and helpers." },
  { slug: "changelog", title: "Changelog", description: "Latest updates and releases." },
];
