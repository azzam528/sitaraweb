import { ref, computed } from 'vue';
import { PAGINATION_DEFAULTS } from '../utils/constants';

export function usePagination(totalItems) {
  const currentPage = ref(PAGINATION_DEFAULTS.page);
  const perPage = ref(PAGINATION_DEFAULTS.perPage);

  const totalPages = computed(() => {
    const total = typeof totalItems === 'number' ? totalItems : totalItems.value || 0;
    return Math.ceil(total / perPage.value) || 1;
  });

  const from = computed(() => {
    const total = typeof totalItems === 'number' ? totalItems : totalItems.value || 0;
    if (total === 0) return 0;
    return (currentPage.value - 1) * perPage.value + 1;
  });

  const to = computed(() => {
    const total = typeof totalItems === 'number' ? totalItems : totalItems.value || 0;
    if (total === 0) return 0;
    const max = currentPage.value * perPage.value;
    return max > total ? total : max;
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const changePerPage = (newPerPage) => {
    perPage.value = newPerPage;
    currentPage.value = 1;
  };

  const resetPagination = () => {
    currentPage.value = PAGINATION_DEFAULTS.page;
    perPage.value = PAGINATION_DEFAULTS.perPage;
  };

  return {
    currentPage,
    perPage,
    totalPages,
    from,
    to,
    goToPage,
    nextPage,
    prevPage,
    changePerPage,
    resetPagination
  };
}
