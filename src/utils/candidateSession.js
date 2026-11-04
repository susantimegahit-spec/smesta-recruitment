const USER_COOKIE = 'smesta-candidate-user';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const setCandidateUserCookie = (user) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${USER_COOKIE}=${encodeURIComponent(JSON.stringify(user))}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
};

export const getCandidateUserCookie = () => {
  const value = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${USER_COOKIE}=`))
    ?.slice(USER_COOKIE.length + 1);

  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
};

export const clearCandidateUserCookie = () => {
  document.cookie = `${USER_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
};
