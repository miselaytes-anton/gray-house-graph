const avatars = import.meta.glob('../assets/avatars/*.png', { eager: true, import: 'default' });

export const AVATAR_MAP: Record<string, string> = {};

for (const path in avatars) {
  const fileName = path.split('/').pop()?.replace('.png', '');
  if (fileName) {
    AVATAR_MAP[fileName] = avatars[path] as string;
  }
}

export function getAvatar(id: string) {
  return AVATAR_MAP[id] || null;
}
