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
    :host { display: block; }
    .contribution-list { list-style: none; padding: 0; margin: 0; display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr)); gap: 1rem; }
    li { display: flex; flex-direction: column; gap: .6rem; padding: 1rem;
      border: 1px solid #e1dacb; overflow-wrap: anywhere; }
    .issue-meta { display: block; font-size: .68rem; font-weight: 750;
      letter-spacing: .06em; text-transform: uppercase; }
    a { color: inherit; font-weight: 650; text-decoration-thickness: 1px; text-underline-offset: .25em; }
    a:focus-visible { outline: 3px solid #9a5b36; outline-offset: 4px; }
    @media (max-width: 760px) { .issue-meta { font-size: .6rem; } }
  `,
})
export class ContributionList {
  readonly issues = input.required<readonly ContributionIssue[]>();
}
