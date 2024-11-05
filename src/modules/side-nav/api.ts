import { SideNavData } from '../../lib/types';

const makeArrayToHaveUniqueValues = (array: { id: number }[]) => {
  return array.filter((value, index, self) => self.findIndex((v) => v.id === value.id) === index);
};

type SideNavApiResponse = {
  articles: {
    section_id: number;
    id: number;
    url: string;
    name: string;
    position: number;
  }[];
  categories: {
    id: number;
    position: number;
    url: string;
    name: string;
  }[];
  sections: {
    category_id: number;
    id: number;
    url: string;
    name: string;
    position: number;
  }[];
};

const sanitizeResponse = (response: SideNavApiResponse): SideNavData => {
  if (!response) {
    return null;
  }

  if (!response.articles || !response.categories || !response.sections) {
    return null;
  }

  const categories = response.categories.map((category) => {
    const sections = response.sections
      .filter((section) => section.category_id === category.id)
      .map((section) => {
        const articles = response.articles
          .filter((article) => article.section_id === section.id)
          .map((article) => ({
            id: article.id,
            name: article.name,
            url: article.url,
            position: article.position,
          }));

        return {
          id: section.id,
          name: section.name,
          position: section.position,
          url: section.url,
          articles: articles.sort((a, b) => a.position - b.position),
        };
      });

    return {
      id: category.id,
      name: category.name,
      position: category.position,
      url: category.url,
      sections: sections.sort((a, b) => a.position - b.position),
    };
  });

  return { categories: categories.sort((a, b) => a.position - b.position) };
};

export const sideNav = {
  get: async (): Promise<SideNavData> => {
    const url = `${window.location.origin}/api/v2/help_center/en-us/articles.json?include=categories,sections&per_page=100`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.page_count <= 1) {
        return sanitizeResponse(responseData);
      }

      // fetch the rest of the pages since first page is already fetched above.
      const pages = await Promise.all(
        Array.from({ length: responseData.page_count - 1 }, (_, i) => {
          return sideNav.getPage(i + 2);
        })
      );

      const allPagesArticleResponseData = makeArrayToHaveUniqueValues(
        responseData.articles.concat(
          ...pages.map((page: SideNavApiResponse | null) => page?.articles || [])
        )
      );
      const allPagesSectionResponseData = makeArrayToHaveUniqueValues(
        responseData.sections.concat(
          ...pages.map((page: SideNavApiResponse | null) => page?.sections || [])
        )
      );
      const allPagesCategoryResponseData = makeArrayToHaveUniqueValues(
        responseData.categories.concat(
          ...pages.map((page: SideNavApiResponse | null) => page?.categories || [])
        )
      );
      const allPagesResponseData = {
        ...responseData,
        articles: allPagesArticleResponseData,
        sections: allPagesSectionResponseData,
        categories: allPagesCategoryResponseData,
      };
      const sanitizedResponse = sanitizeResponse(allPagesResponseData);
      console.log(sanitizedResponse);
      return sanitizedResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPage: async (page: number): Promise<SideNavApiResponse | null> => {
    const url = `${window.location.origin}/api/v2/help_center/en-us/articles.json?include=categories,sections&page=${page}&per_page=100`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
