import { useTranslation } from 'react-i18next';

import { Section } from '../../layout';
import { AnimatedSection } from '../../ui';
import { useGitHub } from '../../../hooks';

import type { Project } from '../../../types';

import { MAX_PROJECTS } from './Projects.config.ts';

import { ExternalLinkIcon, GitHubIcon, StarIcon } from '../../icons/Icons.tsx';

import { CONTACT_CONFIG } from '../../../config';

interface ProjectsProps {
    className?: string;
}

function ProjectSkeleton() {
    return (
        <article className="project-card">
            <div className="project-image">
                <div className="project-image-placeholder skeleton-pulse" />
            </div>
            <div className="project-content">
                <div
                    className="skeleton-text skeleton-pulse"
                    style={{
                        width: '70%',
                        height: '1.5rem',
                        marginBottom: '0.5rem',
                    }}
                />
                <div
                    className="skeleton-text skeleton-pulse"
                    style={{
                        width: '100%',
                        height: '1rem',
                        marginBottom: '0.25rem',
                    }}
                />
                <div
                    className="skeleton-text skeleton-pulse"
                    style={{
                        width: '80%',
                        height: '1rem',
                        marginBottom: '1rem',
                    }}
                />
                <div className="project-technologies">
                    <span
                        className="tech-badge skeleton-pulse"
                        style={{ width: '4rem' }}
                    >
                        &nbsp;
                    </span>
                    <span
                        className="tech-badge skeleton-pulse"
                        style={{ width: '5rem' }}
                    >
                        &nbsp;
                    </span>
                    <span
                        className="tech-badge skeleton-pulse"
                        style={{ width: '3rem' }}
                    >
                        &nbsp;
                    </span>
                </div>
            </div>
        </article>
    );
}

function ProjectsError({
    message,
    onRetry,
}: {
    message: string;
    onRetry: () => void;
}) {
    const { t } = useTranslation();

    return (
        <div className="projects-error">
            <div className="error-icon">⚠️</div>
            <p className="error-message">{message}</p>
            <button onClick={onRetry} className="btn-secondary">
                {t('common.retry')}
            </button>
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const { t } = useTranslation();

    return (
        <AnimatedSection
            as="article"
            animation="zoom-in"
            delay={100 + index * 150}
            className="project-card"
        >
            <div className="project-image">
                <div className="project-image-placeholder">
                    <span className="text-3xl">
                        {project.language === 'TypeScript'
                            ? '📘'
                            : project.language === 'JavaScript'
                              ? '📒'
                              : project.language === 'Python'
                                ? '🐍'
                                : project.language === 'Java'
                                  ? '☕'
                                  : project.language === 'HTML'
                                    ? '🌐'
                                    : project.language === 'CSS'
                                      ? '🎨'
                                      : '💻'}
                    </span>
                    {project.language && (
                        <span className="project-language">
                            {project.language}
                        </span>
                    )}
                </div>
            </div>
            <div className="project-content">
                <div className="project-header">
                    <h3 className="project-title">{project.name}</h3>
                    {project.stars > 0 && (
                        <span
                            className="project-stars"
                            title={t('common.stars')}
                        >
                            <StarIcon />
                            {project.stars}
                        </span>
                    )}
                </div>
                <p className="project-description text-muted">
                    {project.description || t('projects.noDescription')}
                </p>
                <div className="project-technologies">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="tech-badge tech-badge-more">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
                <div className="project-links">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={t('common.viewCode')}
                        title={t('common.viewCode')}
                    >
                        <GitHubIcon />
                    </a>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            aria-label={t('common.viewProject')}
                            title={t('common.viewProject')}
                        >
                            <ExternalLinkIcon />
                        </a>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
}

export function Projects({ className = '' }: ProjectsProps) {
    const { t } = useTranslation();
    const { projects, isLoading, error, refetch } = useGitHub(MAX_PROJECTS);

    return (
        <Section id="projects" padding="xl" className={className}>
            <AnimatedSection animation="fade-up" className="section-header">
                <h2 className="section-title">
                    {t('projects.titlePrefix')}{' '}
                    <span style={{ color: 'var(--color-accent)' }}>
                        {t('projects.titleHighlight')}
                    </span>
                </h2>
                <p className="section-subtitle text-muted">
                    {t('projects.subtitle')}
                </p>
            </AnimatedSection>

            {/* Grid de projetos */}
            <div className="projects-grid">
                {isLoading ? (
                    Array.from({ length: MAX_PROJECTS }).map((_, index) => (
                        <ProjectSkeleton key={index} />
                    ))
                ) : error ? (
                    <div className="projects-error-container">
                        <ProjectsError message={error} onRetry={refetch} />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="projects-empty">
                        <p className="text-muted">{t('projects.empty')}</p>
                    </div>
                ) : (
                    projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))
                )}
            </div>

            <AnimatedSection
                animation="fade-up"
                delay={500}
                className="projects-footer"
            >
                <a
                    href={CONTACT_CONFIG.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                >
                    {t('projects.viewAll')}
                </a>
            </AnimatedSection>
        </Section>
    );
}
