const BACKEND_ENDPOINT = "https://be-flexfy.nani.digital/landing";

export async function getMenu(): Promise<Menu[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/menu");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
export async function getFooter(): Promise<Footer[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/footer");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getBanners(): Promise<Banner[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/banner");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
export async function getPromotion(): Promise<Promotion | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/promotion");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
export async function getCommunities(): Promise<string[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/community");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
export async function getAdvertises(): Promise<Advertising[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/home/advertising");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getProductsByHome(
  url: string
): Promise<Product[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + url);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Menu | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/categories/" + slug);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getColors(): Promise<Color[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/product-option/color");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getSizes(): Promise<Size[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/product-option/size");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getListProducts(
  query?: Record<string, any>
): Promise<{ data: any[]; pagination: IPagination } | null> {
  try {
    const searchParams = "?" + new URLSearchParams(query).toString();
    const response = await fetch(
      BACKEND_ENDPOINT + "/product/find" + searchParams
    );
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getProductOne(
  param: string | number
): Promise<ProductDetail | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/product/find/" + param);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getReviewByProduct(
  slug: string | number
): Promise<ReviewsOverview | null> {
  try {
    const response = await fetch(
      BACKEND_ENDPOINT + "/product/feedback/" + slug
    );
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getRatingList(
  slug: string | number
): Promise<{ data: Review[]; pagination: IPagination } | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/review/product/" + slug);
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getQuestionList(
  slug: string | number
): Promise<{ data: Question[]; pagination: IPagination } | null> {
  try {
    const response = await fetch(
      BACKEND_ENDPOINT + "/question/product/" + slug
    );
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export async function getAllCountries(): Promise<Countries[] | null> {
  try {
    const response = await fetch(BACKEND_ENDPOINT + "/country");
    const json = await response.json();
    return response.ok ? json : null;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
