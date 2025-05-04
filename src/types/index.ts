export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface PresetResponse {
  triggers: string[];
  responses: string[];
}