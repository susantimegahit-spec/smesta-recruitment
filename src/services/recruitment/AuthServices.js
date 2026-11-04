const API_BASE_URL = (
  import.meta.env.VITE_APP_API_ENDPOINT_DEVELOPMENT ||
  'https://api-dev.susantimegah.com/api/distributor-channel/v1/'
).replace(/\/?$/, '/');

const getErrorMessage = (data, status) => {
  const validationErrors = data?.errors ? Object.values(data.errors).flat().filter(Boolean) : [];
  return validationErrors[0] || data?.message || data?.error || `Registrasi gagal (${status}).`;
};

const AuthServices = {
  async postLogout(token = sessionStorage.getItem('smesta-candidate-token')) {
    const response = await fetch(`${API_BASE_URL}recruitment/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.success === false) {
      throw new Error(getErrorMessage(data, response.status));
    }

    return data;
  },

  async postSubmitDisc(payload, token = sessionStorage.getItem('smesta-candidate-token')) {
    const response = await fetch(`${API_BASE_URL}recruitment/psikotes/disc/submit`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.success === false || data?.status === 'error') {
      throw new Error(getErrorMessage(data, response.status));
    }

    return data;
  },

  async postAnswerDisc(payload, token = sessionStorage.getItem('smesta-candidate-token')) {
    const response = await fetch(`${API_BASE_URL}recruitment/psikotes/disc/answers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.success === false || data?.status === 'error') {
      throw new Error(getErrorMessage(data, response.status));
    }

    return data;
  },

  async getMe(token = sessionStorage.getItem('smesta-candidate-token')) {
    const response = await fetch(`${API_BASE_URL}recruitment/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.success === false) {
      throw new Error(getErrorMessage(data, response.status));
    }

    return data;
  },

  async postLogin(payload) {
    const response = await fetch(`${API_BASE_URL}recruitment/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.success === false) {
      throw new Error(getErrorMessage(data, response.status));
    }

    return data;
  },

  async postRegister(payload) {
    const response = await fetch(`${API_BASE_URL}recruitment/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.success === false) {
      throw new Error(getErrorMessage(data, response.status));
    }

    return data;
  }
};

export default AuthServices;
