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

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  repository_url: string;
  pull_request?: unknown;
  assignees: unknown[];
}

interface ContributionIssue {
  id: number;
  number: number;
  title: string;
  url: string;
  repository: string;
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
    url: 'https://github.com/Intelligenza-Umana/iu-learning-ledger',
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
    url: 'https://github.com/Intelligenza-Umana/iu-spring-security-advisor',
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
    url: 'https://github.com/Intelligenza-Umana/iu-project-lifecycle-skill',
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
    url: 'https://github.com/Intelligenza-Umana/iu-model-router',
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
  readonly contributionIssues = signal<ContributionIssue[]>([]);
  readonly contributionsLoading = signal(true);
  readonly contributionsError = signal(false);
  readonly contributionSearchUrl = 'https://github.com/search?q=org%3AIntelligenza-Umana+is%3Apublic+is%3Aissue+is%3Aopen+no%3Aassignee+label%3A%22good+first+issue%22&type=issues';

  readonly loading = signal(true);
  readonly live = computed(() => this.githubProjects() !== null);
  readonly loadError = signal(false);

  constructor() {
    effect(() => {
      const copy = this.copy();
      this.document.documentElement.lang = this.language();
      this.title.setTitle(copy.title);
      this.meta.updateTag({ name: 'description', content: copy.description });
      const origin = this.document.location?.origin;
      if (origin) {
        this.meta.updateTag({ property: 'og:title', content: copy.title });
        this.meta.updateTag({ property: 'og:description', content: copy.description });
        this.meta.updateTag({ property: 'og:locale', content: this.language() === 'it' ? 'it_IT' : 'en_US' });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: origin + '/' });
        this.meta.updateTag({ property: 'og:image', content: 'https://raw.githubusercontent.com/Intelligenza-Umana/intelligenza-umana-web/main/public/logo-intelligenza-umana.webp' });
        this.meta.updateTag({ property: 'og:image:alt', content: 'Intelligenza Umana logo' });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:title', content: copy.title });
        this.meta.updateTag({ name: 'twitter:description', content: copy.description });
      }
    });
  }

  ngOnInit(): void {
    void this.loadProjects();
    void this.loadContributions();
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

  async loadContributions(): Promise<void> {
    this.contributionsLoading.set(true);
    this.contributionsError.set(false);
    this.contributionIssues.set([]);

    try {
      const query = 'org:Intelligenza-Umana is:public is:issue is:open no:assignee label:"good first issue"';
      const response = await fetch(
        'https://api.github.com/search/issues?q=' + encodeURIComponent(query) + '&sort=updated&order=desc&per_page=12',
        { headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const result = (await response.json()) as { items: GitHubIssue[]; incomplete_results: boolean };
      if (result.incomplete_results) throw new Error('Incomplete GitHub search');
      this.contributionIssues.set(
        result.items
          .filter((issue) => !issue.pull_request && issue.assignees.length === 0)
          .map((issue) => ({
            id: issue.id,
            number: issue.number,
            title: issue.title,
            url: issue.html_url,
            repository: issue.repository_url.split('/').pop() ?? '',
          })),
      );
    } catch {
      this.contributionsError.set(true);
    } finally {
      this.contributionsLoading.set(false);
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
