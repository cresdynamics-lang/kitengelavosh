import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      churchName: "VOSH Church Int'l – Kitengela",
      tagline: 'House of Solutions, Manifesting Christ',
      locationText: 'Along Treewa Road, next to Balozi Junior Academy',
      mapLink: 'https://maps.google.com/?q=Kitengela+Treewa+Road',
      phoneNumbers: [
        '+254 722 566 399',
        '+254 720 276 162',
        '+254 720 977 189',
        '+254 775 036 515',
        '+254 703 182 203',
        '+254 733 566 398',
      ],
      email: 'info@voshkitengela.org',
      facebookUrl: 'https://facebook.com/voshkitengela',
      instagramUrl: 'https://instagram.com/voshkitengela',
      youtubeUrl: 'https://youtube.com/@voshkitengela',
    },
  })

  // Create programs
  const programs = [
    {
      title: 'Sunday Watch Hour',
      day: 'Sunday',
      startTime: '06:00',
      endTime: '08:00',
      venue: 'Main Sanctuary',
      contacts: ['+254 722 566 399'],
      orderIndex: 1,
    },
    {
      title: 'Sunday Bible Study',
      day: 'Sunday',
      startTime: '08:00',
      endTime: '09:00',
      venue: 'Main Sanctuary',
      contacts: ['+254 722 566 399'],
      orderIndex: 2,
    },
    {
      title: 'Sunday SB1 Service',
      day: 'Sunday',
      startTime: '09:00',
      endTime: '10:30',
      venue: 'Main Sanctuary',
      contacts: ['+254 722 566 399'],
      orderIndex: 3,
    },
    {
      title: 'Word Manifest',
      day: 'Sunday',
      startTime: '10:30',
      endTime: '13:00',
      venue: 'Main Sanctuary',
      contacts: ['+254 722 566 399'],
      orderIndex: 4,
    },
    {
      title: 'Discipleship',
      day: 'Sunday',
      startTime: '14:30',
      endTime: '16:00',
      venue: 'Main Sanctuary',
      contacts: ['+254 722 566 399'],
      orderIndex: 5,
    },
    {
      title: 'Midweek Prayers',
      day: 'Wednesday',
      startTime: '17:00',
      endTime: '19:00',
      venue: 'Main Sanctuary',
      contacts: ['+254 722 566 399'],
      orderIndex: 1,
    },
    {
      title: 'Online Connect Fellowship',
      day: 'Thursday',
      startTime: '20:30',
      endTime: '21:30',
      venue: 'Google Meet',
      contacts: ['+254 722 566 399'],
      description: 'Join us online every Thursday',
      orderIndex: 1,
    },
    {
      title: 'Tefillah Night',
      day: 'Friday',
      startTime: '20:00',
      endTime: '06:00',
      venue: 'Baraka Road',
      contacts: ['+254 722 566 399'],
      description: 'PURSUE - OVERTAKE - RECOVER (1SAM 30:2-8)',
      orderIndex: 1,
    },
  ]

  for (const program of programs) {
    await prisma.program.upsert({
      where: {
        id: `${program.day}-${program.title}`.toLowerCase().replace(/\s+/g, '-'),
      },
      update: program,
      create: {
        id: `${program.day}-${program.title}`.toLowerCase().replace(/\s+/g, '-'),
        ...program,
      },
    })
  }

  // Create Rev. Evans O. Kochoo as leader
  await prisma.leader.upsert({
    where: { id: 'rev-evans-kochoo' },
    update: {},
    create: {
      id: 'rev-evans-kochoo',
      name: 'Rev. Evans O. Kochoo',
      title: 'Senior Pastor',
      bio: `Rev. Evans O. Kochoo is the Senior Pastor of VOSH Church Int'l – Kitengela. 
      With a passion for the Word of God and a heart for the community, Rev. Kochoo 
      leads the church with wisdom, integrity, and a commitment to manifesting Christ 
      in every area of life. His ministry focuses on prayer, discipleship, and equipping 
      saints for service.`,
      orderIndex: 1,
    },
  })

  // Create default admin (always update password so seed ensures admin123 works)
  const adminPassword = await hash('admin123')
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: { passwordHash: adminPassword },
    create: {
      username: 'admin',
      email: 'admin@voshkitengela.org',
      passwordHash: adminPassword,
      fullName: 'Super Admin',
      role: 'admin',
      isSuperAdmin: true,
    },
  })
  console.log('✅ Admin user: username=admin, password=admin123')

  // Create default LiveStream
  await prisma.liveStream.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      isLive: false,
    },
  })

  // Create default SermonSource
  await prisma.sermonSource.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
