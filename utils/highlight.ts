/**
 * 텍스트 내에서 검색어를 하이라이팅하기 위한 부분들로 분할
 */
export function getHighlightedParts(text: string, query: string): { text: string; highlight: boolean }[] {
  if (!query.trim()) {
    return [{ text, highlight: false }];
  }

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map(part => ({
    text: part,
    highlight: regex.test(part),
  }));
}

/**
 * 질문이 검색어를 포함하는지 확인
 */
export function matchesSearchQuery(
  title: string,
  preview: string | undefined,
  query: string
): boolean {
  if (!query.trim()) {
    return true;
  }

  const lowerQuery = query.toLowerCase();
  const titleMatch = title.toLowerCase().includes(lowerQuery);
  const previewMatch = preview ? preview.toLowerCase().includes(lowerQuery) : false;

  return titleMatch || previewMatch;
}
