export interface Country {
  code: string;
  name: string;
}

export interface User {
  id: string;
  userName: string;
  userCode?: string;
  countries: string[];
}

export interface UserFormData {
  userName: string;
  userCode: string;
  countries: string[];
}

export interface ValidationErrors {
  userName?: string;
  countries?: string;
}
