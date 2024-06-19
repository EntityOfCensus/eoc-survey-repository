// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 
(async function main() {
  try {
    // const martinFowler = await prisma.profileSurveyStatistic.upsert({
    //   where: { nameId: 'optional-info' },
    //   update: {},
    //   create: {
    //     nameId: 'optional-info',
    //   },
    // });
 
    // console.log('Create 1 profileSurveyStatistic: ', optional-info);
  } catch(e) {
    // console.error(e);
    // process.exit(1);
  } finally {
    // await prisma.$disconnect();
  }
})();
