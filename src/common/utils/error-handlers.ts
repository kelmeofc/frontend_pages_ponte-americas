export const ERROR_MESSAGES = {
  network: 'Erro de conexão. Verifique sua internet e tente novamente.',
  fetch: 'Erro de conexão. Verifique sua internet e tente novamente.',
  timeout: 'A requisição demorou muito para responder. Tente novamente.',
  validation: 'Dados inválidos. Verifique as informações e tente novamente.',
  default: 'Ocorreu um erro inesperado. Tente novamente.'
} as const;

export const RETRYABLE_ERRORS = [
  'network_error',
  'timeout_error', 
  'server_error',
  'database_error',
  'connection_failed',
  'internal_server_error'
] as const;

export const getErrorMessage = (error: unknown): string => {
  if (!(error instanceof Error)) return ERROR_MESSAGES.default;
  
  const errorMessage = error.message.toLowerCase();
  
  for (const [key, message] of Object.entries(ERROR_MESSAGES)) {
    if (key === 'default') continue;
    if (errorMessage.includes(key)) {
      return message;
    }
  }
  
  return ERROR_MESSAGES.default;
};

export const getErrorType = (error: unknown): string => {
  if (!(error instanceof Error)) return 'unknown_error';
  
  const errorMessage = error.message.toLowerCase();
  
  if (errorMessage.includes('fetch') || errorMessage.includes('network')) return 'network_error';
  if (errorMessage.includes('timeout')) return 'timeout_error';
  if (errorMessage.includes('validation')) return 'validation_error';
  if (errorMessage.includes('server') || error.name === 'InternalServerError') return 'server_error';
  
  return 'unknown_error';
};

export const isRetryableError = (error?: string): boolean => {
  if (!error) return false;
  
  const errorLower = error.toLowerCase();
  return RETRYABLE_ERRORS.some(errType => errorLower.includes(errType));
};
