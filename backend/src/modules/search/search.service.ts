import { prisma } from '../../config/prisma.config';

export class SearchService {
  async execute(term: string) {
    const [properties, clients] = await Promise.all([
      prisma.property.findMany({
        where: {
          title: {
            contains: term,
            mode: 'insensitive',
          },
        },
        orderBy: {
          title: 'asc',
        },
      }),
      prisma.client.findMany({
        where: {
          OR: [
            {
              name: {
                contains: term,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: term,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    return {
      properties,
      clients,
    };
  }
}
