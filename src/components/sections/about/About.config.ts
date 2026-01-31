export interface TechCategory {
    titleKey: string;
    items: string[];
}

export const techCategories: TechCategory[] = [
    {
        titleKey: 'about.tech.languages',
        items: ['Java', 'C#', 'TypeScript', 'JavaScript'],
    },
    {
        titleKey: 'about.tech.backend',
        items: ['Spring Boot', '.NET Core', 'Node.js', 'REST APIs'],
    },
    {
        titleKey: 'about.tech.frontend',
        items: ['React', 'Tailwind CSS', 'Sass', 'HTML/CSS'],
    },
    {
        titleKey: 'about.tech.databases',
        items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB'],
    },
    {
        titleKey: 'about.tech.devops',
        items: ['Docker', 'Git', 'Linux', 'CI/CD'],
    },
    {
        titleKey: 'about.tech.architecture',
        items: ['Clean Architecture', 'SOLID', 'Design Patterns', 'Clean Code'],
    },
];
