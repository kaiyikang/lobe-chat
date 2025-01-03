import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ModelProvider } from '@/libs/agent-runtime';
import { useUserStore } from '@/store/user';
import {
  GlobalLLMProviderKey,
  UserKeyVaults,
  UserModelProviderConfig,
} from '@/types/user/settings';

import { getProviderAuthPayload } from '../_auth';

// Mock data for different providers
const mockZhiPuAPIKey = 'zhipu-api-key';
const mockMoonshotAPIKey = 'moonshot-api-key';
const mockGoogleAPIKey = 'google-api-key';
const mockAnthropicAPIKey = 'anthropic-api-key';
const mockMistralAPIKey = 'mistral-api-key';
const mockOpenRouterAPIKey = 'openrouter-api-key';
const mockTogetherAIAPIKey = 'togetherai-api-key';

// mock the traditional zustand
vi.mock('zustand/traditional');

const setModelProviderConfig = <T extends GlobalLLMProviderKey>(
  provider: T,
  config: Partial<UserKeyVaults[T]>,
) => {
  useUserStore.setState({
    settings: { keyVaults: { [provider]: config } },
  });
};

describe('getProviderAuthPayload', () => {
  it('should return correct payload for ZhiPu provider', () => {
    act(() => {
      setModelProviderConfig('zhipu', { apiKey: mockZhiPuAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.ZhiPu);
    expect(payload).toEqual({ apiKey: mockZhiPuAPIKey });
  });

  it('should return correct payload for Moonshot provider', () => {
    act(() => {
      setModelProviderConfig('moonshot', { apiKey: mockMoonshotAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.Moonshot);
    expect(payload).toEqual({ apiKey: mockMoonshotAPIKey });
  });

  it('should return correct payload for Anthropic provider', () => {
    act(() => {
      setModelProviderConfig('anthropic', { apiKey: mockAnthropicAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.Anthropic);
    expect(payload).toEqual({ apiKey: mockAnthropicAPIKey });
  });

  it('should return correct payload for Mistral provider', () => {
    act(() => {
      setModelProviderConfig('mistral', { apiKey: mockMistralAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.Mistral);
    expect(payload).toEqual({ apiKey: mockMistralAPIKey });
  });

  it('should return correct payload for OpenRouter provider', () => {
    act(() => {
      setModelProviderConfig('openrouter', { apiKey: mockOpenRouterAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.OpenRouter);
    expect(payload).toEqual({ apiKey: mockOpenRouterAPIKey });
  });

  it('should return correct payload for TogetherAI provider', () => {
    act(() => {
      setModelProviderConfig('togetherai', { apiKey: mockTogetherAIAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.TogetherAI);
    expect(payload).toEqual({ apiKey: mockTogetherAIAPIKey });
  });

  it('should return correct payload for Google provider', () => {
    act(() => {
      setModelProviderConfig('google', { apiKey: mockGoogleAPIKey });
    });

    const payload = getProviderAuthPayload(ModelProvider.Google);
    expect(payload).toEqual({ apiKey: mockGoogleAPIKey });
  });

  it('should return correct payload for Bedrock provider', () => {
    // 假设的 Bedrock 配置
    const mockBedrockConfig = {
      accessKeyId: 'bedrock-access-key-id',
      region: 'bedrock-region',
      secretAccessKey: 'bedrock-secret-access-key',
    };
    act(() => {
      setModelProviderConfig('bedrock', mockBedrockConfig);
    });

    const payload = getProviderAuthPayload(ModelProvider.Bedrock);
    expect(payload).toEqual({
      apiKey: mockBedrockConfig.secretAccessKey + mockBedrockConfig.accessKeyId,
      awsAccessKeyId: mockBedrockConfig.accessKeyId,
      awsRegion: mockBedrockConfig.region,
      awsSecretAccessKey: mockBedrockConfig.secretAccessKey,
    });
  });

  it('should return correct payload for Azure provider', () => {
    // 假设的 Azure 配置
    const mockAzureConfig = {
      apiKey: 'azure-api-key',
      apiVersion: 'azure-api-version',
      endpoint: 'azure-endpoint',
    };
    act(() => {
      setModelProviderConfig('azure', mockAzureConfig);
    });

    const payload = getProviderAuthPayload(ModelProvider.Azure);
    expect(payload).toEqual({
      apiKey: mockAzureConfig.apiKey,
      azureApiVersion: mockAzureConfig.apiVersion,
      baseURL: mockAzureConfig.endpoint,
    });
  });

  it('should return correct payload for Ollama provider', () => {
    // 假设的 Ollama 配置
    const mockOllamaProxyUrl = 'ollama-proxy-url';
    act(() => {
      setModelProviderConfig('ollama', { baseURL: mockOllamaProxyUrl });
    });

    const payload = getProviderAuthPayload(ModelProvider.Ollama);
    expect(payload).toEqual({
      baseURL: mockOllamaProxyUrl,
    });
  });

  it('should return correct payload for OpenAI provider', () => {
    // 假设的 OpenAI 配置
    const mockOpenAIConfig = {
      apiKey: 'openai-api-key',
      baseURL: 'openai-endpoint',
      useAzure: true,
      azureApiVersion: 'openai-azure-api-version',
    };
    act(() => {
      setModelProviderConfig('openai', mockOpenAIConfig);
    });

    const payload = getProviderAuthPayload(ModelProvider.OpenAI);
    expect(payload).toEqual({
      apiKey: mockOpenAIConfig.apiKey,
      baseURL: mockOpenAIConfig.baseURL,
    });
  });

  it('should return correct payload for Stepfun provider', () => {
    // 假设的 OpenAI 配置
    const mockOpenAIConfig = {
      apiKey: 'stepfun-api-key',
      baseURL: 'stepfun-baseURL',
    };
    act(() => {
      setModelProviderConfig('stepfun', mockOpenAIConfig);
    });

    const payload = getProviderAuthPayload(ModelProvider.Stepfun);
    expect(payload).toEqual({
      apiKey: mockOpenAIConfig.apiKey,
      baseURL: mockOpenAIConfig.baseURL,
    });
  });

  it('should return an empty object or throw an error for an unknown provider', () => {
    const payload = getProviderAuthPayload('UnknownProvider');
    expect(payload).toEqual({});
  });
});
