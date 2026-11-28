import { Component, inject, input } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

/** Official Discord server widget (public, read-only). Server id is public. */
const WIDGET_URL = 'https://discord.com/widget?id=1575893115879956510&theme=dark';

@Component({
  selector: 'app-discord-widget',
  template: `
    <iframe
      [src]="url"
      [title]="title()"
      width="350"
      height="500"
      loading="lazy"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
  `,
  styles: `
    :host { display: block; max-width: 350px; margin: 2rem 0 1.5rem; }
    iframe { display: block; width: 100%; height: 500px; border: 0; }
  `,
})
export class DiscordWidget {
  readonly title = input.required<string>();
  readonly url: SafeResourceUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(WIDGET_URL);
}
