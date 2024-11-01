import { render } from 'react-dom';
import { ArticlePageData } from '../../lib/types';
import { Settings } from '../shared';
import { createTheme, ThemeProviders } from '../shared';
import { ArticleBreadcrumbs } from './ArticlePageModule';

export async function renderArticleBreadcrumbs(
  settings: Settings,
  articlePageData: ArticlePageData,
  container: HTMLElement
) {
  render(
    <ThemeProviders theme={createTheme(settings)}>
      <ArticleBreadcrumbs articlePageData={articlePageData} />
    </ThemeProviders>,
    container
  );
}
