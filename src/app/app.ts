import { Component, OnInit, signal } from '@angular/core';

interface GitHubRepository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  topics: string[];
  pushed_at: string;
  stargazers_count: number;
  language: string | null;
  license: { spdx_id: string } | null;
}

interface ProjectCard {
  name: string;
  url: string;
  description: string;
  topics: string[];
  updatedAt?: string;
  stars?: number;
  language?: string | null;
}

const knownProjects: ProjectCard[] = [
  { name: 'Learning Ledger', url: 'https://github.com/fabiozagaria/iu-learning-ledger', description: 'A local evidence ledger for AI-assisted learning, with deterministic rules that keep mastery assessments tied to evidence.', topics: ['learning', 'AI assistance', 'MIT'] },
  { name: 'Spring Security Advisor', url: 'https://github.com/fabiozagaria/iu-spring-security-advisor', description: 'A Spring Boot security review assistant. Its score is not a security certification.', topics: ['security', 'Spring Boot', 'MIT'] },
  { name: 'Project Lifecycle Skill', url: 'https://github.com/fabiozagaria/iu-project-lifecycle-skill', description: 'A skill for preserving project decisions, context and handoffs across AI-assisted work.', topics: ['developer tools', 'early version', 'MIT'] },
  { name: 'IU Model Router', url: 'https://github.com/fabiozagaria/iu-model-router', description: 'An early model-routing skill for coding agents. Native discovery and delegation remain unverified.', topics: ['AI', 'developer tools', 'early version', 'MIT'] },
];

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  readonly projects = signal<ProjectCard[]>(knownProjects);
  readonly loading = signal(true);
  readonly live = signal(false);
  readonly loadError = signal(false);

  ngOnInit(): void {
    void this.loadProjects();
  }

  async loadProjects(): Promise<void> {
    this.loading.set(true);
    this.loadError.set(false);

    try {
      const response = await fetch(
        'https://api.github.com/orgs/Intelligenza-Umana/repos?type=public&sort=updated&per_page=100',
        { headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

      const repositories = (await response.json()) as GitHubRepository[];
      this.projects.set(
        repositories
          .filter((repository) => repository.name !== '.github')
          .map((repository) => ({
            name: repository.name,
            url: repository.html_url,
            description: repository.description || 'Public project repository from Intelligenza Umana.',
            topics: repository.topics ?? [],
            updatedAt: repository.pushed_at,
            stars: repository.stargazers_count,
            language: repository.language,
          })),
      );
      this.live.set(true);
    } catch {
      this.loadError.set(true);
      this.live.set(false);
    } finally {
      this.loading.set(false);
    }
  }
}
