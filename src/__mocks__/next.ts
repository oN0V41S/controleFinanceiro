import type { NextRequest, NextResponse } from 'next/server';

class MockNextRequest {
  constructor(public url: string, public options?: { body?: string }) {
    this.body = options?.body;
  }
  public body: string | undefined;

  async json() {
    if (!this.body) return {};
    return JSON.parse(this.body);
  }

  get nextUrl() {
    const urlObj = new URL(this.url || 'http://localhost');
    return {
      searchParams: urlObj.searchParams,
      pathname: urlObj.pathname,
    };
  }

  headers = new Headers();
}

class MockNextResponse {
  static json(data: any, init?: { status?: number }) {
    return {
      json: async () => data,
      status: init?.status || 200,
      headers: new Headers(),
      cookies: {
        set: jest.fn(),
        get: jest.fn(),
      },
    };
  }
  static redirect(url: string) {
    const err = new Error('NEXT_REDIRECT') as any;
    err.digest = 'NEXT_REDIRECT';
    err.path = url;
    throw err;
  }
}

const mockRedirect = (path: string) => {
  const err = new Error('NEXT_REDIRECT') as any;
  err.digest = 'NEXT_REDIRECT';
  err.path = path;
  throw err;
};

const mockCookies = () => ({
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
});

const mockHeaders = () => new Headers();

export {
  MockNextRequest,
  MockNextResponse,
  mockRedirect,
  mockCookies,
  mockHeaders
};
