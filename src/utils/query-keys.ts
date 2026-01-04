export const queryKeys = {
    space: {
        all: ["spaces"] as const,
        lists: () => [...queryKeys.space.all, "list"] as const,

        findMany: () =>
            [...queryKeys.space.lists()] as const,

        find: (spaceId: string) =>
            [...queryKeys.space.all, spaceId] as const,
    },

    list: {
        all: ["lists"] as const,
        bySpace: (space: string) =>
            [...queryKeys.list.all, "space", space] as const,

        findMany: (space: string) =>
            [...queryKeys.list.bySpace(space)] as const,

        find: (listId: string) =>
            [...queryKeys.list.all, listId] as const,
    },

    card: {
        all: ["cards"] as const,

        bySpace: (space: string) =>
            [...queryKeys.card.all, "space", space] as const,

        byList: (listId: string) =>
            [...queryKeys.card.all, "list", listId] as const,

        findManyBySpace: (space: string) =>
            [...queryKeys.card.bySpace(space)] as const,

        findManyByList: (listId: string) =>
            [...queryKeys.card.byList(listId)] as const,

        find: (cardId: string) =>
            [...queryKeys.card.all, cardId] as const,
    },

    comment: {
        all: ["comments"] as const,

        byCard: (cardId: string) =>
            [...queryKeys.comment.all, "card", cardId] as const,

        findManyByCard: (cardId: string) =>
            [...queryKeys.comment.byCard(cardId)] as const,

        find: (commentId: string) =>
            [...queryKeys.comment.all, commentId] as const,
    },

    notification: {
        all: ["notifications"] as const,

        byUser: (userId?: string) =>
            [...queryKeys.notification.all, userId ?? "me"] as const,

        findMany: (userId?: string) =>
            [...queryKeys.notification.byUser(userId)] as const,
    },

    user: {
        all: ["users"] as const,

        findMany: () =>
            [...queryKeys.user.all] as const,

        find: (userId: string) =>
            [...queryKeys.user.all, userId] as const,
    },
}
