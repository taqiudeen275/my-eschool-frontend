// lib/types.ts
export interface User {
    id: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    roles: Role[]; // Assuming you have a Role interface as well
    password?: string;
  }
  
  export interface Role {
    id: number;
    name: string;
    // ... other role properties
  }