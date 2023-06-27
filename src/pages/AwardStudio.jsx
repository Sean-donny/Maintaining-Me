import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Text,
  SimpleGrid,
  Image,
  createStyles,
  Title,
  HoverCard,
} from '@mantine/core';

import UserAward1 from '../assets/images/marble-sculpture-1.png';
import UserAward1Locked from '../assets/images/marble-sculpture-1-locked.png';
import UserAward2 from '../assets/images/marble-sculpture-2.png';
import UserAward2Locked from '../assets/images/marble-sculpture-2-locked.png';
import UserAward3 from '../assets/images/marble-sculpture-10.png';
import UserAward3Locked from '../assets/images/marble-sculpture-10-locked.png';
import UserAward4 from '../assets/images/marble-sculpture-30.png';
import UserAward4Locked from '../assets/images/marble-sculpture-30-locked.png';
import UserAward5 from '../assets/images/marble-sculpture-60.png';
import UserAward5Locked from '../assets/images/marble-sculpture-60-locked.png';
import UserAward6 from '../assets/images/marble-sculpture-100.png';
import UserAward6Locked from '../assets/images/marble-sculpture-100-locked.png';
import UserAward7 from '../assets/images/scultor-apprentice.png';
import UserAward7Locked from '../assets/images/scultor-apprentice-locked.png';
import UserAward8 from '../assets/images/stone-carver.png';
import UserAward8Locked from '../assets/images/stone-carver-locked.png';
import UserAward9 from '../assets/images/sculptor.png';
import UserAward9Locked from '../assets/images/sculptor-locked.png';
import UserAward10 from '../assets/images/megasculptor.png';
import UserAward10Locked from '../assets/images/megasculptor-locked.png';
import UserAward11 from '../assets/images/sisyphus-1.png';
import UserAward11Locked from '../assets/images/sisyphus-1-locked.png';
import UserAward12 from '../assets/images/sisyphus-2.png';
import UserAward12Locked from '../assets/images/sisyphus-2-locked.png';
import UserAward13 from '../assets/images/sisyphus-10.png';
import UserAward13Locked from '../assets/images/sisyphus-10-locked.png';
import UserAward14 from '../assets/images/sisyphus-30.png';
import UserAward14Locked from '../assets/images/sisyphus-30-locked.png';
import UserAward15 from '../assets/images/sisyphus-60.png';
import UserAward15Locked from '../assets/images/sisyphus-60-locked.png';
import UserAward16 from '../assets/images/sisyphus-100.png';
import UserAward16Locked from '../assets/images/sisyphus-100-locked.png';
import UserAward17 from '../assets/images/stone-tablet-award-1.png';
import UserAward17Locked from '../assets/images/stone-tablet-award-1-locked.png';
import UserAward18 from '../assets/images/stone-tablet-award-2.png';
import UserAward18Locked from '../assets/images/stone-tablet-award-2-locked.png';
import UserAward19 from '../assets/images/stone-tablet-award-10.png';
import UserAward19Locked from '../assets/images/stone-tablet-award-10-locked.png';
import UserAward20 from '../assets/images/stone-tablet-award-30.png';
import UserAward20Locked from '../assets/images/stone-tablet-award-30-locked.png';
import UserAward21 from '../assets/images/stone-tablet-award-60.png';
import UserAward21Locked from '../assets/images/stone-tablet-award-60-locked.png';
import UserAward22 from '../assets/images/stone-tablet-award-100.png';
import UserAward22Locked from '../assets/images/stone-tablet-award-100-locked.png';
import UserAward23 from '../assets/images/mm-heart-lattice.png';
import UserAward23Locked from '../assets/images/mm-heart-lattice-locked.png';
import UserAward24 from '../assets/images/mm-sisyphus-award.png';
import UserAward24Locked from '../assets/images/mm-sisyphus-award-locked.png';
import { useUser } from '../hooks/useUser';
import { userProgressGenerator } from '../utils/helper';

const useStyles = createStyles(theme => ({
  award: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  awardImage: {
    maxWidth: '50%',
    height: 'auto',
    fit: 'contain',
  },
}));

const AwardStudio = () => {
  const { classes } = useStyles();
  const [award1Status, unlockAward1] = useState(UserAward1Locked);
  const [award2Status, unlockAward2] = useState(UserAward2Locked);
  const [award3Status, unlockAward3] = useState(UserAward3Locked);
  const [award4Status, unlockAward4] = useState(UserAward4Locked);
  const [award5Status, unlockAward5] = useState(UserAward5Locked);
  const [award6Status, unlockAward6] = useState(UserAward6Locked);
  const [award7Status, unlockAward7] = useState(UserAward7Locked);
  const [award8Status, unlockAward8] = useState(UserAward8Locked);
  const [award9Status, unlockAward9] = useState(UserAward9Locked);
  const [award10Status, unlockAward10] = useState(UserAward10Locked);
  const [award11Status, unlockAward11] = useState(UserAward11Locked);
  const [award12Status, unlockAward12] = useState(UserAward12Locked);
  const [award13Status, unlockAward13] = useState(UserAward13Locked);
  const [award14Status, unlockAward14] = useState(UserAward14Locked);
  const [award15Status, unlockAward15] = useState(UserAward15Locked);
  const [award16Status, unlockAward16] = useState(UserAward16Locked);
  const [award17Status, unlockAward17] = useState(UserAward17Locked);
  const [award18Status, unlockAward18] = useState(UserAward18Locked);
  const [award19Status, unlockAward19] = useState(UserAward19Locked);
  const [award20Status, unlockAward20] = useState(UserAward20Locked);
  const [award21Status, unlockAward21] = useState(UserAward21Locked);
  const [award22Status, unlockAward22] = useState(UserAward22Locked);
  const [award23Status, unlockAward23] = useState(UserAward23Locked);
  const [award24Status, unlockAward24] = useState(UserAward24Locked);
  const { user } = useUser();
  const awardPlaqueData = [
    {
      src: award1Status,
      alt: 'User award',
      caption: 'Body Sculptor I',
      info: 'Earn this award when you record your day in your diary for 1 day',
    },
    {
      src: award2Status,
      alt: 'User award',
      caption: 'Body Sculptor II',
      info: 'Earn this award when you record your day in your diary for 2 days',
    },
    {
      src: award3Status,
      alt: 'User award',
      caption: 'Body Sculptor X',
      info: 'Earn this award when you record your day in your diary for 10 days',
    },
    {
      src: award4Status,
      alt: 'User award',
      caption: 'Body Sculptor XXX',
      info: 'Earn this award when you record your day in your diary for 30 days',
    },
    {
      src: award5Status,
      alt: 'User award',
      caption: 'Body Sculptor LX',
      info: 'Earn this award when you record your day in your diary for 60 days',
    },
    {
      src: award6Status,
      alt: 'User award',
      caption: 'Body Sculptor C',
      info: 'Earn this award when you record your day in your diary for 100 days',
    },
    {
      src: award7Status,
      alt: 'User award',
      caption: 'Cut Marble',
      info: 'Earn this award when you record your day in your diary for 150 days',
    },
    {
      src: award8Status,
      alt: 'User award',
      caption: 'Stone Carver',
      info: 'Earn this award when you record your day in your diary for 200 days',
    },
    {
      src: award9Status,
      alt: 'User award',
      caption: 'Master Sculptor',
      info: 'Earn this award when you record your day in your diary for 275 days',
    },
    {
      src: award10Status,
      alt: 'User award',
      caption: 'Grandmaster Sculptor',
      info: 'Earn this award when you record your day in your diary for 365 days',
    },
    {
      src: award23Status,
      alt: 'User award',
      caption: 'Heartful',
      info: 'Earn this award when you get 50% on your set goal',
    },
    {
      src: award24Status,
      alt: 'User award',
      caption: 'Climber',
      info: 'Earn this award when you get 100% on your set goal',
    },
    {
      src: award11Status,
      alt: 'User award',
      caption: 'Heavy I',
      info: 'Earn this award when you record your day in your diary for 366 days',
    },
    {
      src: award12Status,
      alt: 'User award',
      caption: 'Heavy II',
      info: 'Earn this award when you record your day in your diary for 367 days',
    },
    {
      src: award13Status,
      alt: 'User award',
      caption: 'Heavy X',
      info: 'Earn this award when you record your day in your diary for 375 days',
    },
    {
      src: award14Status,
      alt: 'User award',
      caption: 'Heavy XXX',
      info: 'Earn this award when you record your day in your diary for 395 days',
    },
    {
      src: award15Status,
      alt: 'User award',
      caption: 'Heavy LX',
      info: 'Earn this award when you record your day in your diary for 425 days',
    },
    {
      src: award16Status,
      alt: 'User award',
      caption: 'Heavy C',
      info: 'Earn this award when you record your day in your diary for 465 days',
    },
    {
      src: award17Status,
      alt: 'User award',
      caption: 'Historian I',
      info: 'Earn this award when you record your day in your diary for 466 days',
    },
    {
      src: award18Status,
      alt: 'User award',
      caption: 'Historian II',
      info: 'Earn this award when you record your day in your diary for 467 days',
    },
    {
      src: award19Status,
      alt: 'User award',
      caption: 'Historian X',
      info: 'Earn this award when you record your day in your diary for 475 days',
    },
    {
      src: award20Status,
      alt: 'User award',
      caption: 'Historian XXX',
      info: 'Earn this award when you record your day in your diary for 495 days',
    },
    {
      src: award21Status,
      alt: 'User award',
      caption: 'Historian LX',
      info: 'Earn this award when you record your day in your diary for 525 days',
    },
    {
      src: award22Status,
      alt: 'User award',
      caption: 'Historian C',
      info: 'Earn this award when you record your day in your diary for 565 days',
    },
  ];
  const awards = awardPlaqueData.map(award => (
    <HoverCard width={280} shadow="md" key={award.src}>
      <HoverCard.Target>
        <div className={classes.award}>
          <Image
            className={classes.awardImage}
            src={award.src}
            alt={award.alt}
            caption={award.caption}
          />
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">{award.info}</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  ));

  useEffect(() => {
    if (user?.diaries) {
      const diaryLogCount = user.diaries;
      const dairyLogs = Object.keys(diaryLogCount).length;
      const userTargetMet = userProgressGenerator(user?.weight);
      dairyLogs > 0 && unlockAward1(UserAward1);
      dairyLogs > 1 && unlockAward2(UserAward2);
      dairyLogs > 9 && unlockAward3(UserAward3);
      dairyLogs > 29 && unlockAward4(UserAward4);
      dairyLogs > 59 && unlockAward5(UserAward5);
      dairyLogs > 99 && unlockAward6(UserAward6);
      dairyLogs > 149 && unlockAward7(UserAward7);
      dairyLogs > 199 && unlockAward8(UserAward8);
      dairyLogs > 274 && unlockAward9(UserAward9);
      dairyLogs > 364 && unlockAward10(UserAward10);
      userTargetMet > 49 && unlockAward23(UserAward23);
      userTargetMet > 99 && unlockAward24(UserAward24);
      dairyLogs > 365 && unlockAward11(UserAward11);
      dairyLogs > 366 && unlockAward12(UserAward12);
      dairyLogs > 374 && unlockAward13(UserAward13);
      dairyLogs > 394 && unlockAward14(UserAward14);
      dairyLogs > 424 && unlockAward15(UserAward15);
      dairyLogs > 464 && unlockAward16(UserAward16);
      dairyLogs > 465 && unlockAward17(UserAward17);
      dairyLogs > 466 && unlockAward18(UserAward18);
      dairyLogs > 474 && unlockAward19(UserAward19);
      dairyLogs > 494 && unlockAward20(UserAward20);
      dairyLogs > 524 && unlockAward21(UserAward21);
      dairyLogs > 564 && unlockAward22(UserAward22);
    }
  }, [user]);

  return (
    <Container size="xl" px={40}>
      <Title
        align="center"
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Earn an Award!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5} mb={50}>
        You can earn an award by logging your daily progress
      </Text>
      <Paper withBorder shadow="md" p={50} mt={30} radius="md">
        {' '}
        <SimpleGrid
          cols={4}
          spacing="xl"
          verticalSpacing="xl"
          breakpoints={[
            { maxWidth: '62rem', cols: 3, spacing: 'md' },
            { maxWidth: '48rem', cols: 2, spacing: 'sm' },
            { maxWidth: '36rem', cols: 1, spacing: 'sm' },
          ]}
        >
          {awards}
        </SimpleGrid>
      </Paper>
    </Container>
  );
};

export default AwardStudio;
