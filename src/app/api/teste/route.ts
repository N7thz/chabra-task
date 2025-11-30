// import { prisma } from "@/lib/prisma"
// import { faker } from "@faker-js/faker"
// import { NextResponse } from "next/server"
// import { Notification } from "@prisma/client"

// export async function GET() {
//   const notifications: Notification[] = []

//   // Usar Promise.all para executar todas as criações em paralelo
//   await Promise.all(
//     Array.from({ length: 8 }).map(async () => {
//       const action = faker.helpers.arrayElement([
//         "CREATE",
//         "UPDATE",
//         "DELETE",
//         "MIN_QUANTITY",
//       ])

//       // Se action for "MIN_QUANTITY", read sempre será false
//       // Caso contrário, pode ser true ou false aleatoriamente
//       const read = action === "MIN_QUANTITY" ? false : faker.datatype.boolean()

//       const notificationObject = {
//         id: faker.string.uuid(),
//         name: faker.lorem.words(3),
//         description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
//         createdAt: faker.date.recent(),
//         read: read, // Aqui aplicamos a regra
//         action: action,
//       }

//       const notification = await prisma.notification.create({
//         data: notificationObject,
//       })

//       notifications.push(notification)
//     })
//   )

//   return NextResponse.json(notifications)
// }
