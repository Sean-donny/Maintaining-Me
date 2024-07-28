import React, { useRef, useMemo } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, useMantineTheme, rem } from '@mantine/core';
import BodyPart from './BodyPart';
import TargetImage from '../assets/images/mm-heat-card.jpg';
import { useUser } from '../hooks/useUser';

const useStyles = createStyles(() => ({
  card: {
    height: rem(400),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

const HorizontalScrollbar = ({ data }) => {
  const { user } = useUser();
  const userGender =
    user?.gender === 'male'
      ? 'For Men'
      : user?.gender === 'female'
      ? 'For Women'
      : '';
  const autoplay = useRef(Autoplay({ delay: 3500 }));
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { classes } = useStyles();

  const slides = useMemo(
    () =>
      data.map(item => (
        <Carousel.Slide key={item}>
          <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${TargetImage})` }}
            className={classes.card}
            component="a"
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/results?search_query=${item}+Exercises+${userGender}`}
          >
            <div>
              <BodyPart item={item} />
            </div>
          </Paper>
        </Carousel.Slide>
      )),
    [data, userGender, classes],
  );

  return (
    <Carousel
      slideSize="33.333333%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
      slideGap="sm"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      controlsOffset="md"
      controlSize={28}
      loop
      dragFree
      withIndicators
      plugins={[autoplay.current]}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      {slides}
    </Carousel>
  );
};

export default HorizontalScrollbar;
