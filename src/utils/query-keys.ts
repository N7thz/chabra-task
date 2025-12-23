export const queryKeys = {
    card: {
        create: () => ["create-card"],
        update: () => ["update-card"],
        delete: () => ["delete-card"],
        find: (id: string) => ["find-card-by-id", id],
        findMany: () => ["find-many-cards"],
    },
    comment: {
        create: () => ["create-comment"],
        update: () => ["update-comment"],
        delete: () => ["delete-comment"],
        find: (id: string) => ["find-comment-by-id", id],
        findMany: () => ["find-many-comments"],
    },
    list: {
        create: () => ["create-list"],
        update: () => ["update-list"],
        delete: () => ["delete-list"],
        find: (id: string) => ["find-list-by-id", id],
        findMany: () => ["find-many-lists"],
    },
    space: {
        create: () => ["create-space"],
        update: () => ["update-space"],
        delete: () => ["delete-space"],
        find: (id: string) => ["find-space-by-id", id],
        findMany: () => ["find-many-spaces"],
    },
    user: {
        create: () => ["create-user"],
        update: () => ["update-user"],
        delete: () => ["delete-user"],
        find: (id: string) => ["find-user-by-id", id],
        findMany: () => ["find-many-users"],
    },
    notification: {
        create: () => ["create-notification"],
        update: () => ["update-notification"],
        delete: () => ["delete-notification"],
        find: (id: string) => ["find-notification-by-id", id],
        findMany: (id?: string) => ["find-many-notifications", id],
    },
};
