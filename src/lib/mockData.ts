import { AccountDto } from "@/api/response/account";

export const mockAccounts: AccountDto[] = [
  {
    id: '12345678-1234-1234-1234-123456789012',
    accountNumber: '11111111-2222-3333-4444-555555555555',
    balance: 5000,
    availableBalance: 4500,
    accountMaintenance: 10,
    createdDate: new Date('2022-01-01'),
    expirationDate: new Date('2025-01-01'),
    active: true,
    accountType: 'Savings',
    monthlyLimit: 10000,
    dailyLimit: 1000,
    currency: {
      id: '1',
      name: 'US Dollar',
      code: 'USD',
      symbol: '$'
    },
    client: {
      id: 'client-123',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      privileges: []
    },
    employee: {
      id: 'employee-123',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1985-05-15',
      gender: 'Female',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      address: '456 Elm St, Anytown, USA',
      username: 'jsmith',
      position: 'Account Manager',
      department: 'Finance',
      active: true,
      privileges: []
    },
    company: {
      companyId: 'company-123',
      name: 'Acme Corp',
      address: '789 Oak St, Anytown, USA',
      taxNumber: '123456789',
      registrationNumber: '987654321'
    }
  },
  {
    id: '87654321-4321-4321-4321-210987654321',
    accountNumber: '55555555-4444-3333-2222-111111111111',
    balance: 10000,
    availableBalance: 9500,
    accountMaintenance: 15,
    createdDate: new Date('2021-06-01'),
    expirationDate: new Date('2024-06-01'),
    active: true,
    accountType: 'Checking',
    monthlyLimit: 20000,
    dailyLimit: 2000,
    currency: {
      id: '2',
      name: 'Euro',
      code: 'EUR',
      symbol: '€'
    },
    client: {
      id: 'client-456',
      firstName: 'Alice',
      lastName: 'Johnson',
      dateOfBirth: '1988-03-22',
      gender: 'Female',
      email: 'alice.johnson@example.com',
      phone: '321-654-9870',
      address: '321 Pine St, Anytown, USA',
      privileges: []
    },
    employee: {
      id: 'employee-456',
      firstName: 'Bob',
      lastName: 'Brown',
      dateOfBirth: '1979-11-30',
      gender: 'Male',
      email: 'bob.brown@example.com',
      phone: '654-321-0987',
      address: '654 Maple St, Anytown, USA',
      username: 'bbrown',
      position: 'Branch Manager',
      department: 'Operations',
      active: true,
      privileges: []
    },
    company: {
      companyId: 'company-456',
      name: 'Tech Solutions',
      address: '987 Birch St, Anytown, USA',
      taxNumber: '987654321',
      registrationNumber: '123456789'
    }
  }
];