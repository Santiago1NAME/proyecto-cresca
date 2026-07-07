export const Modules = {
  users: 'users',
  admin: 'admin',
} as const;

export type ModuleKey = typeof Modules[keyof typeof Modules];

export const Roles = {
  users: {
    module: 'users',
    view: 'users_view',
    create: 'users_create',
    edit: 'users_edit',
    delete: 'users_delete',
  },
  admin: {
    module: 'admin',
    create: 'admin_create'
  },
} as const;

export type Role = { [K in keyof typeof Roles]: typeof Roles[K][keyof typeof Roles[K]] }[keyof typeof Roles];
