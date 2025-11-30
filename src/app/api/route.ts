// import { prisma } from "@/lib/prisma"
// import { faker } from "@faker-js/faker"
// import { Prisma } from "@prisma/client"
// import { NextResponse } from "next/server"

// export async function GET() {
//   const products = Array.from({ length: 42 }).map(async () => {
//     const notificationObject: Prisma.ProductExitCreateInput = {
//       createdAt: faker.date.recent({ days: 30 }),
//       region: faker.location.state(),
//       quantity: faker.number.int({ min: 1, max: 1000 }),
//       description: faker.helpers.maybe(
//         () => faker.commerce.productDescription(),
//         { probability: 0.7 }
//       ),
//       name: faker.person.firstName(),
//       product: {
//         create: {
//           name: faker.commerce.productName().toLowerCase(),
//           imageUrl: faker.image.url(),
//           description: faker.commerce.productDescription(),
//           price: parseFloat(faker.commerce.price()),
//           createdAt: faker.date.past(),
//           quantity: faker.number.int({ min: 1, max: 200 }),
//           minQuantity: faker.number.int({ min: 1, max: 30 }),
//         },
//       },
//     }

//     return await prisma.productExit.create({
//       data: notificationObject,
//     })
//   })

//   return NextResponse.json(products)
// }
