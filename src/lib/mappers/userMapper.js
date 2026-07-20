export function mapUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    full_name: [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email?.split('@')[0] || 'User',
    role: user.role || 'customer',
    is_verified: user.is_verified ?? true,
    phone: user.phone || '',
    first_name: user.first_name,
    last_name: user.last_name,
  };
}

export function splitFullName(fullName) {
  const parts = (fullName || '').trim().split(/\s+/);
  if (parts.length === 0) return { first_name: 'User', last_name: '' };
  if (parts.length === 1) return { first_name: parts[0], last_name: parts[0] };
  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(' '),
  };
}
