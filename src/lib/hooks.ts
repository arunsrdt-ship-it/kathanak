import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPoetrys, fetchPoetry, fetchConfig, updateConfig, deletePoetry, fetchFeedback, deleteFeedback } from './api';

// --- Poetry Hooks ---

export const usePoetries = (query: Record<string, string | number | boolean> = {}) => {
  return useQuery({
    queryKey: ['poetries', query],
    queryFn: () => fetchPoetrys(query),
  });
};

export const usePoetry = (idOrSlug: string) => {
  return useQuery({
    queryKey: ['poetry', idOrSlug],
    queryFn: () => fetchPoetry(idOrSlug),
    enabled: !!idOrSlug,
  });
};

export const useDeletePoetry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePoetry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poetries'] });
    },
  });
};

// --- Config Hooks ---

export const useConfig = () => {
  return useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  });
};

export const useUpdateConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config'] });
    },
  });
};

// --- Feedback Hooks ---

export const useFeedback = () => {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: fetchFeedback,
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
    },
  });
};
