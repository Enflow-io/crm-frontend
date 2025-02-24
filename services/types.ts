export interface User {
    id: number
    email: string
    name: string
    phone: string
    description: string
    lastName: string
    role: string
    password: string
    avatar: string
    deletedAt: any
  }

  export interface ICianConfig {
    isOffDaysWeekend: boolean;
    // ... другие поля конфигурации если есть
  }
