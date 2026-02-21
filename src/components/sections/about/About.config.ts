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
        items: ['Spring Boot', '.NET Core', 'Node.js', 'Entity Framework Core'],
    },
    {
        titleKey: 'about.tech.frontend',
        items: ['React', 'Tailwind CSS', 'Sass', 'Bootstrap', 'I18n'],
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
            'Feature-Based Architecture (frontend)',
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
    'Rider',
    'WebStorm',
    'DataGrip',
    'Visual Studio Code',
    'SOLID',
    'Clean Code',
    'Big O Notation',
    'Keycloak',
    'AMQP',
    'Flutter (Básico)',
    'AI-First',
    'Claude',
    'ChatGPT',
    'Gemini',
    'Midjourney',
    'Configurações de MCPs',
    'Lmstudio',
    'Ollama',
    'Montagem e manutenção (básico) de Computadores',
    'Pacote Office (Básico)'
];
