import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import type { Language } from './site-copy';

export interface ProjectRow {
  name: string;
  url: string;
  description: string | null;
  license: string | null;
  updatedAt?: string;
}

export interface ProjectTableLabels {
  repository: string;
  description: string;
  licence: string;
  updated: string;
  noLicence: string;
  otherLicence: string;
  notLoaded: string;
  caption: string;
  newTab: string;
  defaultDescription: string;
}

@Component({
  selector: 'app-project-table',
  imports: [DatePipe],
  template: `
    <table role="table" [attr.aria-label]="labels().caption">
      <thead role="rowgroup">
        <tr role="row">
          <th role="columnheader" scope="col">{{ labels().repository }}</th>
          <th role="columnheader" scope="col">{{ labels().description }}</th>
          <th role="columnheader" scope="col">{{ labels().licence }}</th>
          <th role="columnheader" scope="col">{{ labels().updated }}</th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        @for (row of rows(); track row.url) {
          <tr role="row">
            <td role="cell" class="name" [attr.data-label]="labels().repository">
              <a [href]="row.url" target="_blank" rel="noopener noreferrer">{{ row.name }}<span class="visually-hidden"> {{ labels().newTab }}</span></a>
            </td>
            <td role="cell" [attr.data-label]="labels().description">
              {{ row.description || labels().defaultDescription }}
            </td>
            <td role="cell" class="meta" [attr.data-label]="labels().licence">
              {{ row.license === 'NOASSERTION' ? labels().otherLicence : row.license || labels().noLicence }}
            </td>
            <td role="cell" class="meta" [attr.data-label]="labels().updated">
              {{ row.updatedAt ? (row.updatedAt | date: 'mediumDate' : undefined : language()) : labels().notLoaded }}
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    :host { display: block; border-top: 1px solid #131312; }
    table { width: 100%; border-collapse: collapse; font-size: .95rem; }
    th { text-align: left; font: 500 .72rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      color: #55534e; padding: .7rem 1rem .7rem 0; border-bottom: 1px solid #c9c3b6; }
    td { padding: .9rem 1rem .9rem 0; border-bottom: 1px solid #e1dacb; vertical-align: top;
      line-height: 1.5; overflow-wrap: anywhere; }
    .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .name { font-weight: 650; }
    .name a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: .25em; }
    .name a:focus-visible { outline: 3px solid #9a5b36; outline-offset: 4px; }
    .meta { font: .82rem/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: nowrap; }
    @media (max-width: 760px) {
      thead { display: none; }
      tr { display: block; padding: .9rem 0; border-bottom: 1px solid #c9c3b6; }
      td { display: grid; grid-template-columns: 6.5rem minmax(0, 1fr); gap: .75rem; padding: .2rem 0;
        border: 0; }
      .meta { white-space: normal; }
      td::before { content: attr(data-label); font: 500 .72rem ui-monospace, SFMono-Regular, Menlo,
        Consolas, monospace; color: #55534e; padding-top: .15rem; }
    }
  `,
})
export class ProjectTable {
  readonly rows = input.required<readonly ProjectRow[]>();
  readonly labels = input.required<ProjectTableLabels>();
  readonly language = input.required<Language>();
}
