const permissionStrategies = {
  admin: {
    canEdit: () => true,
    canDelete: () => true,
  },

  user: {
    canEdit: (ownerId, currentUserId) => ownerId === currentUserId,
    canDelete: () => false,
  },

  guest: {
    canEdit: () => false,
    canDelete: () => false,
  },
};

export { permissionStrategies };
