type DeadlineResult = {
    days: number
    status: "ON_TIME" | "OVERDUE"
    text: string
}

export function getDeadlineDays(deadline: Date): DeadlineResult {
    const now = new Date()
    const dueDate = new Date(deadline)

    // Zera horas pra evitar problemas de fuso horário
    now.setHours(0, 0, 0, 0)
    dueDate.setHours(0, 0, 0, 0)

    const diffInMs = dueDate.getTime() - now.getTime()
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays < 0) {
        return {
            days: Math.abs(diffInDays),
            status: "OVERDUE",
            text: "vencido"
        }
    }

    return {
        days: diffInDays,
        status: "ON_TIME",
        text: "a fazer"
    }
}