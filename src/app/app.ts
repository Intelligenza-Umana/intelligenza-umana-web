import { registerLocaleData } from '@angular/common';
import italian from '@angular/common/locales/it';
import { Component, computed, DOCUMENT, effect, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { type Language, siteCopy } from './site-copy';
import { ContributionList, type ContributionIssue } from './contribution-list';
import { ProjectTable } from './project-table';

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

interface ProjectCard {
  name: string;
  url: string;
  description: string | null;
  updatedAt?: string;
  license: string | null;
}

// Snapshot of the public catalog on 2026-11-28. Shown only when GitHub cannot be reached.
const knownProjects = [
  {
    name: 'iu-agent-assurance',
    url: 'https://github.com/Intelligenza-Umana/iu-agent-assurance',
    license: 'MIT',
    en: {
      description:
        'Community-driven open-source toolkit for reproducible AI agent verification, behavioral testing and evidence-based assurance',
    },
    it: {
      description:
        'Toolkit open source della community per la verifica riproducibile di agenti IA, i test comportamentali e la garanzia basata su evidenze.',
    },
  },
  {
    name: 'iu-project-lifecycle-skill',
    url: 'https://github.com/Intelligenza-Umana/iu-project-lifecycle-skill',
    license: 'MIT',
    en: {
      description:
        'Skill for Codex and Claude Code that helps agents document decisions, audit project context, and prepare handoffs so work can resume across sessions.',
    },
    it: {
      description:
        'Skill per Codex e Claude Code che aiuta gli agenti a documentare le decisioni, verificare il contesto del progetto e preparare i passaggi di consegne, così il lavoro può riprendere tra una sessione e l’altra.',
    },
  },
  {
    name: 'iu-skill-validator',
    url: 'https://github.com/Intelligenza-Umana/iu-skill-validator',
    license: 'MIT',
    en: {
      description:
        'An open-source pre-release validation tool for AI agent skills, separating static package checks from runtime verification.',
    },
    it: {
      description:
        'Strumento open source di validazione pre-rilascio per skill di agenti IA, che separa i controlli statici del pacchetto dalla verifica a runtime.',
    },
  },
  {
    name: 'intelligenza-umana',
    url: 'https://github.com/Intelligenza-Umana/intelligenza-umana',
    license: 'MIT',
    en: {
      description:
        'Foundation repository for Intelligenza Umana, with its manifesto, governance, engineering standards, contribution guidelines, and official project registry.',
    },
    it: {
      description:
        'Repository della fondazione di Intelligenza Umana, con manifesto, governance, standard di ingegneria, linee guida per i contributi e registro ufficiale dei progetti.',
    },
  },
  {
    name: 'iu-marketplace',
    url: 'https://github.com/Intelligenza-Umana/iu-marketplace',
    license: 'MIT',
    en: {
      description:
        'Claude Code marketplace for Intelligenza Umana plugins: Spring security audit, evidence-based learning, model routing and project lifecycle',
    },
    it: {
      description:
        'Marketplace Claude Code per i plugin di Intelligenza Umana: audit di sicurezza Spring, apprendimento basato su evidenze, instradamento dei modelli e ciclo di vita dei progetti.',
    },
  },
  {
    name: 'intelligenza-umana-web',
    url: 'https://github.com/Intelligenza-Umana/intelligenza-umana-web',
    license: null,
    en: {
      description:
        'Bilingual Angular website for Intelligenza Umana. It presents the initiative and loads its public project listings from the GitHub API.',
    },
    it: {
      description:
        'Sito Angular bilingue di Intelligenza Umana. Presenta l’iniziativa e carica l’elenco dei progetti pubblici dall’API di GitHub.',
    },
  },
  {
    name: 'iu-spring-security-advisor',
    url: 'https://github.com/Intelligenza-Umana/iu-spring-security-advisor',
    license: 'MIT',
    en: {
      description:
        'Claude Code plugin for read-only Spring Boot security audits. It maps security configuration and combines Python scanner findings with a checklist to compute a score.',
    },
    it: {
      description:
        'Plugin Claude Code per audit di sicurezza di sola lettura su Spring Boot. Mappa la configurazione di sicurezza e combina i risultati dello scanner Python con una checklist per calcolare un punteggio.',
    },
  },
  {
    name: 'iu-learning-ledger',
    url: 'https://github.com/Intelligenza-Umana/iu-learning-ledger',
    license: 'MIT',
    en: {
      description:
        'Claude Code plugin for quizzes and coding practice. A local Python ledger tracks mastery from demonstrated performance and schedules spaced reviews.',
    },
    it: {
      description:
        'Plugin Claude Code per quiz ed esercizi di programmazione. Un registro Python locale traccia la padronanza in base alle prestazioni dimostrate e pianifica ripassi distanziati.',
    },
  },
  {
    name: 'iu-model-router',
    url: 'https://github.com/Intelligenza-Umana/iu-model-router',
    license: 'MIT',
    en: {
      description:
        'Experimental skill for Codex and Claude Code that recommends models for delegated coding tasks based on complexity, project context, risk, and cost.',
    },
    it: {
      description:
        'Skill sperimentale per Codex e Claude Code che consiglia i modelli per i compiti di programmazione delegati in base a complessità, contesto del progetto, rischio e costo.',
    },
  },
];

@Component({
  selector: 'app-root',
  imports: [ContributionList, ProjectTable],
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
      knownProjects.map(({ name, url, license, ...copy }) => ({
        name,
        url,
        license,
        ...copy[language],
      }))
    );
  });
  readonly contributionIssues = signal<ContributionIssue[]>([]);
  readonly contributionsLoading = signal(true);
  readonly contributionsError = signal(false);
  readonly contributionSearchUrl =
    'https://github.com/search?q=org%3AIntelligenza-Umana+is%3Apublic+is%3Aissue+is%3Aopen+no%3Aassignee+label%3A%22good+first+issue%22&type=issues';

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
        this.meta.updateTag({
          property: 'og:locale',
          content: this.language() === 'it' ? 'it_IT' : 'en_US',
        });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({ property: 'og:url', content: origin + '/' });
        this.meta.updateTag({
          property: 'og:image',
          content:
            'https://raw.githubusercontent.com/Intelligenza-Umana/intelligenza-umana-web/main/public/og-image.png',
        });
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
      const query =
        'org:Intelligenza-Umana is:public is:issue is:open no:assignee label:"good first issue"';
      const response = await fetch(
        'https://api.github.com/search/issues?q=' +
          encodeURIComponent(query) +
          '&sort=updated&order=desc&per_page=12',
        { headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const result = (await response.json()) as {
        items: GitHubIssue[];
        incomplete_results: boolean;
      };
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
            updatedAt: repository.pushed_at,
            license: repository.license?.spdx_id ?? null,
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
