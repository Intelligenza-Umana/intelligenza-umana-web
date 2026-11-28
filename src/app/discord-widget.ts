import { Component, inject, input } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

/** Official Discord server widget (public, read-only). Server id is public. */
const WIDGET_URL = 'https://discord.com/widget?id=1575893115879956510&theme=dark';
const INVITE_URL = 'https://discord.gg/Zt85ZYEXAA';

@Component({
  selector: 'app-discord-widget',
  template: `
    <section class="panel" aria-labelledby="discord-title">
      <div class="text">
        <h3 id="discord-title">{{ heading() }}</h3>
        <p>{{ body() }}</p>
        <a class="invite" [href]="inviteUrl" target="_blank" rel="noopener noreferrer">
          <img src="discord-symbol.svg" width="24" height="18" alt="" />
          {{ button() }}
        </a>
      </div>
      <iframe
        [src]="url"
        [title]="title()"
        width="350"
        height="500"
        loading="lazy"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </section>
  `,
  styles: `
    :host { display: block; margin-top: 3rem; }
    .panel { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 350px);
      align-items: center; gap: clamp(1.5rem, 4vw, 3rem);
      padding: clamp(1.25rem, 3vw, 2rem); background: #ede7dc; border: 1px solid #e1dacb; }
    h3 { font-size: clamp(1.4rem, 2.4vw, 1.9rem); letter-spacing: -.035em; line-height: 1.15;
      margin: 0 0 .9rem; }
    p { max-width: 34rem; line-height: 1.65; color: #55534e; margin: 0 0 1.5rem; }
    .invite { display: inline-flex; align-items: center; gap: .7rem; padding: 1rem 1.25rem;
      background: #fdf8f0; color: #131312; border: 1px solid #131312; font-weight: 650;
      text-decoration: none; }
    .invite:hover { background: #fff; }
    .invite:focus-visible { outline: 3px solid #9a5b36; outline-offset: 4px; }
    .invite img { width: 24px; height: 18px; object-fit: contain; }
    iframe { display: block; width: 100%; max-width: 350px; height: 500px; border: 0;
      justify-self: end; }
    @media (max-width: 760px) {
      .panel { grid-template-columns: minmax(0, 1fr); }
      iframe { justify-self: stretch; max-width: none; }
    }
  `,
})
export class DiscordWidget {
  readonly heading = input.required<string>();
  readonly body = input.required<string>();
  readonly button = input.required<string>();
  readonly title = input.required<string>();
  readonly url: SafeResourceUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(WIDGET_URL);
  readonly inviteUrl = INVITE_URL;
}
