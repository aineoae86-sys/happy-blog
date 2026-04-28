export function tagSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}
