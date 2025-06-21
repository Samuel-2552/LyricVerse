const API_BASE_URL = 'https://devback.oilnwine.tech';

// Temporary CORS proxy options (uncomment one if needed)
// const API_BASE_URL = 'https://cors-anywhere.herokuapp.com/https://devback.oilnwine.tech';
// const API_BASE_URL = 'https://api.allorigins.win/raw?url=https://devback.oilnwine.tech';

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  purpose: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    purpose?: string;
  };
  token?: string;
}

// Utility function to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('lyricverse_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const authHeaders = getAuthHeaders();
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
      ...options,
    };

    console.log(`🚀 API Request: ${options.method || 'GET'} ${url}`);
    console.log('📤 Request Headers:', config.headers);
    if (options.body) {
      console.log('📤 Request Body:', JSON.parse(options.body as string));
    }

    try {
      console.log('🌐 Making fetch request...');
      const response = await fetch(url, config);
      
      console.log(`📥 Response Status: ${response.status} ${response.statusText}`);
      console.log('📥 Response Headers:', Object.fromEntries(response.headers.entries()));
      
      // Check for CORS issues
      if (response.status === 0) {
        console.error('❌ CORS Error: Response status is 0, likely a CORS issue');
        throw new Error('CORS Error: Unable to reach the server. Check if the server is running and CORS is configured.');
      }
      
      if (!response.ok) {
        console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`);
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error Response:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ API Success Response:', responseData);
      return responseData;
    } catch (error) {
      console.error('💥 API request failed:', error);
      console.error('💥 Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        url,
        config
      });
      
      // Check for network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🌐 Network Error: Unable to connect to the server');
        console.error('🌐 Please check:');
        console.error('   - Server is running at:', this.baseURL);
        console.error('   - Network connectivity');
        console.error('   - CORS configuration on server');
        
        // Provide specific CORS error message
        if (error.message === 'Failed to fetch') {
          console.error('🔧 CORS Solution: The backend needs to allow requests from your frontend domain');
          console.error('🔧 Backend should include these headers:');
          console.error('   Access-Control-Allow-Origin: https://dev.oilnwine.tech');
          console.error('   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
          console.error('   Access-Control-Allow-Headers: Content-Type, Authorization');
        }
      }
      
      throw error;
    }
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Add more API methods here as needed
  // Example: async getSongs(): Promise<Song[]> { ... }
  // Example: async createSong(data: CreateSongRequest): Promise<Song> { ... }
}

export const apiService = new ApiService(API_BASE_URL); 