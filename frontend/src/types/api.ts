export interface UserResponse {}

export interface AuthUser {
  email: string;
  password: string;
}

export interface MessageResponse {
  success?: boolean;
  message?: string;
}

interface dataSignup {
  name: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  street: string;
  apartment: string;
  city: string;
  country: string;
  postcode: string;
  phone: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface SignupCompleteResponse extends MessageResponse {
  data: {
    user: dataSignup;
    token: string;
  };
}

export interface SignupApiResponse extends MessageResponse {
  data?: {
    user: string;
    token: string;
  };
}

export interface LoginResponse extends MessageResponse {
  data: {
    token: string;
    user: dataSignup;
  };
}

export interface AddChatRequest {
  chatId: string;
  prompt: string;
}

export interface NewChatRequest {
  prompt: string;
}

export interface ChatResponse extends MessageResponse {
  data: {
    chatId: string;
    content: string;
  };
}

export interface Message {
  id: string;
  content: string;
}

export interface MessagesState {
  prompt: string;
  content: string;
  _id: string | null;
  latest: {
    id: string;
    prompt: string;
    content: string;
  };
  all: Message[];
}
