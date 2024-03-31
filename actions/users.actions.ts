import db from '@/db/db';

async function getUserData() {
  const userCount = await db.user.count();

  return {
    userCount
  };
}

export { getUserData };
