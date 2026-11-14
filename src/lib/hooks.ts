import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPoetrys, fetchAdminPoetries, fetchAdminPoetry, fetchPoetry,
  fetchConfig, updateConfig, updatePoetry, deletePoetry, fetchFeedback, deleteFeedback,
  type FetchPoetryParams,
} from './api';

// --- Poetry Hooks ---

export const usePoetries = (query: FetchPoetryParams = {}) => {
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

export const useAdminPoetries = (query: FetchPoetryParams = {}) => {
  return useQuery({
    queryKey: ['admin-poetries', query],
    queryFn: () => fetchAdminPoetries(query),
  });
};

export const useAdminPoetry = (id: string) => {
  return useQuery({
    queryKey: ['admin-poetry', id],
    queryFn: () => fetchAdminPoetry(id),
    enabled: !!id,
  });
};

export const useDeletePoetry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePoetry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poetries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-poetries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-poetry'] });
    },
  });
};

export const useUpdatePoetry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => updatePoetry(id, formData),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ['poetries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-poetries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-poetry', variables.id] });
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
