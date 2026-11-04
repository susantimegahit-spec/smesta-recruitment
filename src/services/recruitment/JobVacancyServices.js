import { jobs } from '../../data/recruitment';

// Adapter sementara. Ganti implementasi ini dengan HTTP client saat API tersedia.
const JobVacancyServices = {
  async getAll() {
    return { data: { success: true, data: jobs } };
  }
};

export default JobVacancyServices;
