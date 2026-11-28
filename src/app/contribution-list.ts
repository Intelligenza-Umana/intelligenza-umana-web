import { Component, input } from '@angular/core';

export interface ContributionIssue {
  id: number;
  number: number;
  title: string;
  url: string;
  repository: string;
}

@Component({
  selector: 'app-contribution-list',
  template: `
    <ul class="contribution-list">
      @for (issue of issues(); track issue.id) {
        <li>
          <span class="issue-meta">{{ issue.repository }} #{{ issue.number }}</span>
          <a [href]="issue.url">{{ issue.title }}</a>
        </li>
      }
    </ul>
  `,
  styles: `
    :host { display: block; border-top: 1px solid #131312; margin-top: 1rem; }
    .contribution-list { list-style: none; padding: 0; margin: 0; }
    li { display: grid; grid-template-columns: minmax(8rem, 14rem) minmax(0, 1fr); gap: .25rem 1.25rem;
      padding: .85rem 0; border-bottom: 1px solid #e1dacb; overflow-wrap: anywhere; line-height: 1.5; }
    .issue-meta { font: .82rem/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #55534e; }
    a { color: inherit; font-weight: 650; text-decoration-thickness: 1px; text-underline-offset: .25em; }
    a:focus-visible { outline: 3px solid #9a5b36; outline-offset: 4px; }
    @media (max-width: 760px) { li { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class ContributionList {
  readonly issues = input.required<readonly ContributionIssue[]>();
}
