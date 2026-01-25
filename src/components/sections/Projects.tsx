import { useTranslation } from 'react-i18next';

import { Section } from '../layout';
import { AnimatedSection } from '../ui';
import { useGitHub } from '../../hooks';
import type { Project } from '../../types';

// ===== CONFIGURAÇÕES =====
const GITHUB_PROFILE_URL = 'https://github.com/Ruan-Moraes';
const MAX_PROJECTS = 6;

interface ProjectsProps {
  /** Classe CSS adicional */
  className?: string;
}

// ===== ÍCONES SVG =====
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
  </svg>
);

// ===== SKELETON LOADER =====
function ProjectSkeleton() {
  return (
    <article className="project-card">
      <div className="project-image">
        <div className="project-image-placeholder skeleton-pulse" />
      </div>
      <div className="project-content">
        <div className="skeleton-text skeleton-pulse" style={{ width: '70%', height: '1.5rem', marginBottom: '0.5rem' }} />
        <div className="skeleton-text skeleton-pulse" style={{ width: '100%', height: '1rem', marginBottom: '0.25rem' }} />
        <div className="skeleton-text skeleton-pulse" style={{ width: '80%', height: '1rem', marginBottom: '1rem' }} />
        <div className="project-technologies">
          <span className="tech-badge skeleton-pulse" style={{ width: '4rem' }}>&nbsp;</span>
          <span className="tech-badge skeleton-pulse" style={{ width: '5rem' }}>&nbsp;</span>
          <span className="tech-badge skeleton-pulse" style={{ width: '3rem' }}>&nbsp;</span>
        </div>
      </div>
    </article>
  );
}

// ===== COMPONENTE DE ERRO =====
function ProjectsError({ message, onRetry }: { message: string; onRetry: () => void }) {
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

// ===== CARD DE PROJETO =====
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();

  return (
    <AnimatedSection
      as="article"
      animation="zoom-in"
      delay={100 + index * 150}
      className="project-card"
    >
      {/* Imagem placeholder com linguagem */}
      <div className="project-image">
        <div className="project-image-placeholder">
          <span className="text-3xl">
            {project.language === 'TypeScript' ? '📘' :
             project.language === 'JavaScript' ? '📒' :
             project.language === 'Python' ? '🐍' :
             project.language === 'Java' ? '☕' :
             project.language === 'HTML' ? '🌐' :
             project.language === 'CSS' ? '🎨' : '💻'}
          </span>
          {project.language && (
            <span className="project-language">{project.language}</span>
          )}
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.name}</h3>
          {project.stars > 0 && (
            <span className="project-stars" title={t('common.stars')}>
              <StarIcon />
              {project.stars}
            </span>
          )}
        </div>
        <p className="project-description text-muted">
          {project.description || t('projects.noDescription')}
        </p>

        {/* Tecnologias */}
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

        {/* Links */}
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

// ===== COMPONENTE PRINCIPAL =====
export function Projects({ className = '' }: ProjectsProps) {
  const { t } = useTranslation();
  const { projects, isLoading, error, refetch } = useGitHub(MAX_PROJECTS);

  return (
    <Section id="projects" padding="xl" className={className}>
      {/* Título da seção */}
      <AnimatedSection animation="fade-up" className="section-header">
        <h2 className="section-title">
          {t('projects.titlePrefix')}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{t('projects.titleHighlight')}</span>
        </h2>
        <p className="section-subtitle text-muted">{t('projects.subtitle')}</p>
      </AnimatedSection>

      {/* Grid de projetos */}
      <div className="projects-grid">
        {isLoading ? (
          // Skeleton loading
          Array.from({ length: MAX_PROJECTS }).map((_, index) => (
            <ProjectSkeleton key={index} />
          ))
        ) : error ? (
          // Estado de erro
          <div className="projects-error-container">
            <ProjectsError message={error} onRetry={refetch} />
          </div>
        ) : projects.length === 0 ? (
          // Nenhum projeto encontrado
          <div className="projects-empty">
            <p className="text-muted">{t('projects.empty')}</p>
          </div>
        ) : (
          // Lista de projetos
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>

      {/* Botão ver todos */}
      <AnimatedSection animation="fade-up" delay={500} className="projects-footer">
        <a
          href={GITHUB_PROFILE_URL}
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
