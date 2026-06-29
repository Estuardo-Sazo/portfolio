import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE = 'https://www.jaszcode.site';
const DEFAULT_IMAGE = `${SITE}/icons/me.png`;
const AUTHOR = 'Jaime Sazo';

export interface SeoData {
  title: string;
  description: string;
  /** Absolute or site-relative image URL. */
  image?: string;
  /** Path appended to the site origin for canonical / og:url. */
  path?: string;
  type?: 'website' | 'article' | 'profile';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  update(data: SeoData): void {
    const url = `${SITE}${data.path ?? ''}`;
    const image = this.absolute(data.image ?? DEFAULT_IMAGE);
    const fullTitle = `${data.title} | ${AUTHOR}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'author', content: AUTHOR });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: AUTHOR });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  private absolute(image: string): string {
    if (image.startsWith('http')) return image;
    return `${SITE}${image.startsWith('/') ? '' : '/'}${image}`;
  }
}
