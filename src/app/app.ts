import { DatePipe, registerLocaleData } from '@angular/common';
import italian from '@angular/common/locales/it';
import { Component, computed, DOCUMENT, effect, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { type Language, siteCopy } from './site-copy';

registerLocaleData(italian);

const languageStorageKey = 'intelligenza-umana-language';

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
  description: string | null;
  topics: string[];
  updatedAt?: string;
  stars?: number;
  language?: string | null;
}

const knownProjects = [
  {
    name: 'Learning Ledger',
    url: 'https://github.com/fabiozagaria/iu-learning-ledger',
    en: {
      description:
        'A local evidence ledger for AI-assisted learning, with deterministic rules that keep mastery assessments tied to evidence.',
      topics: ['learning', 'AI assistance', 'MIT'],
    },
    it: {
      description:
        'Un registro locale delle evidenze per l’apprendimento assistito dall’IA, con regole deterministiche che legano la valutazione delle competenze alle evidenze raccolte.',
      topics: ['apprendimento', 'assistenza IA', 'MIT'],
    },
  },
  {
    name: 'Spring Security Advisor',
    url: 'https://github.com/fabiozagaria/iu-spring-security-advisor',
    en: {
      description:
        'A Spring Boot security review assistant. Its score is not a security certification.',
      topics: ['security', 'Spring Boot', 'MIT'],
    },
    it: {
      description:
        'Un assistente per la revisione della sicurezza di applicazioni Spring Boot. Il punteggio ha valore indicativo.',
      topics: ['sicurezza', 'Spring Boot', 'MIT'],
    },
  },
  {
    name: 'Project Lifecycle Skill',
    url: 'https://github.com/fabiozagaria/iu-project-lifecycle-skill',
    en: {
      description:
        'A skill for preserving project decisions, context and handoffs across AI-assisted work.',
      topics: ['developer tools', 'early version', 'MIT'],
    },
    it: {
      description:
        'Una skill per conservare decisioni, contesto di progetto e passaggi di consegne durante il lavoro assistito dall’IA.',
      topics: ['strumenti per sviluppatori', 'versione iniziale', 'MIT'],
    },
  },
  {
    name: 'Model Router',
    url: 'https://github.com/fabiozagaria/iu-model-router',
    en: {
      description:
        'An early model-routing skill for coding agents. Native discovery and delegation remain unverified.',
      topics: ['AI', 'developer tools', 'early version', 'MIT'],
    },
    it: {
      description:
        'Una skill in fase iniziale per indirizzare gli agenti di programmazione verso il modello adatto. Il rilevamento nativo e la delega richiedono ancora verifiche.',
      topics: ['IA', 'strumenti per sviluppatori', 'versione iniziale', 'MIT'],
    },
  },
];

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly selectedLanguage = signal<Language>(this.readLanguage());
  private readonly githubProjects = signal<ProjectCard[] | null>(null);

  readonly language = this.selectedLanguage.asReadonly();
  readonly copy = computed(() => siteCopy[this.language()]);
  readonly projects = computed<ProjectCard[]>(() => {
    const language = this.language();
    return (
      this.githubProjects() ??
      knownProjects.map(({ name, url, ...copy }) => ({
        name,
        url,
        ...copy[language],
      }))
    );
  });
  readonly loading = signal(true);
  readonly live = computed(() => this.githubProjects() !== null);
  readonly loadError = signal(false);

  constructor() {
    effect(() => {
      const copy = this.copy();
      this.document.documentElement.lang = this.language();
      this.title.setTitle(copy.title);
      this.meta.updateTag({ name: 'description', content: copy.description });
    });
  }

  ngOnInit(): void {
    void this.loadProjects();
  }

  setLanguage(language: Language): void {
    this.selectedLanguage.set(language);
    try {
      this.document.defaultView?.localStorage.setItem(languageStorageKey, language);
    } catch {
      // The page still switches when browser storage is blocked.
    }
  }

  private readLanguage(): Language {
    try {
      return this.document.defaultView?.localStorage.getItem(languageStorageKey) === 'it'
        ? 'it'
        : 'en';
    } catch {
      return 'en';
    }
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
      this.githubProjects.set(
        repositories
          .filter((repository) => repository.name !== '.github')
          .map((repository) => ({
            name: repository.name,
            url: repository.html_url,
            description: repository.description,
            topics: repository.topics ?? [],
            updatedAt: repository.pushed_at,
            stars: repository.stargazers_count,
            language: repository.language,
          })),
      );
    } catch {
      this.githubProjects.set(null);
      this.loadError.set(true);
    } finally {
      this.loading.set(false);
    }
  }
}
