export interface TechCategory {
    titleKey: string;
    items: string[];
}

export const techCategories: TechCategory[] = [
    {
        titleKey: 'about.tech.languages',
        items: ['Java', 'C#', 'JavaScript', 'TypeScript'],
    },
    {
        titleKey: 'about.tech.backend',
        items: ['Spring Boot', '.NET Core', 'Node.js', 'Entity Framework'],
    },
    {
        titleKey: 'about.tech.frontend',
        items: ['React', 'Tailwind CSS', 'Sass', 'Bootstrap'],
    },
    {
        titleKey: 'about.tech.databases',
        items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'MySQL'],
    },
    {
        titleKey: 'about.tech.devops',
        items: ['Docker', 'Git', 'Linux', 'CI/CD'],
    },
    {
        titleKey: 'about.tech.architecture',
        items: [
            'Clean Architecture',
            'Arquitetura Hexagonal',
            'Design Patterns',
            'MVC',
        ],
    },
];

export const extraTechnologies: string[] = [
    'Spring Data JPA',
    'Spring Security',
    'HATEOAS',
    'WebSocket',
    'WebHook',
    'RabbitMQ',
    'Apache Kafka',
    'Handlebars',
    'React Native (Básico)',
    'H2',
    'Flyway',
    'Docker Compose',
    'JWT',
    'Swagger',
    'JUnit',
    'Figma',
    'IntelliJ IDEA',
    'SOLID',
    'Clean Code',
    'Big O Notation',
];
