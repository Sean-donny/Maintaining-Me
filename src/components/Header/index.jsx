import { useState } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Menu,
  Image,
  Tabs,
  rem,
  Anchor,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '../../hooks/useUser';
import {
  IconLogout,
  IconChevronDown,
  IconScaleOutline,
  IconChartCandle,
  IconBook,
  IconSun,
  IconMoonStars,
} from '@tabler/icons-react';
import MaintainingMeWideLogo from '../../assets/images/mm-wide-logo.png';
import AvatarImage from '../../assets/images/user-profile-pic.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOutController } from '../../utils/auth';

const useStyles = createStyles(theme => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    marginBottom: rem(120),
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },

  unstyledLink: {
    ', :hover, :focus, :active': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
}));

function HeaderTabs({ tabs }) {
  const { classes, cx } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();
  const { user: userData } = useUser();
  const location = useLocation();

  const items = tabs.map(tab => (
    <Tabs.Tab value={tab.href} key={tab.title}>
      <Anchor className={classes.unstyledLink} href={tab.href}>
        {tab.title}
      </Anchor>
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Anchor href="/">
            <Image src={MaintainingMeWideLogo} height={60} fit="contain" />
          </Anchor>
          <Group>
            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              sx={theme => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.yellow[4]
                    : theme.colors.blue[6],
              })}
            >
              {colorScheme === 'dark' ? (
                <IconSun size="1.2rem" />
              ) : (
                <IconMoonStars size="1.2rem" />
              )}
            </ActionIcon>
            {userData && (
              <Menu
                width={260}
                position="bottom-end"
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={7}>
                      <Avatar
                        src={AvatarImage}
                        alt={userData.name}
                        radius="xl"
                        size="sm"
                      />
                      <IconChevronDown size={rem(12)} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      navigate('/setusertarget');
                    }}
                    icon={<IconScaleOutline size="0.9rem" stroke={1.5} />}
                  >
                    Set your target
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      navigate('/setuserinfo');
                    }}
                    icon={<IconChartCandle size="0.9rem" stroke={1.5} />}
                  >
                    Set your stats
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      navigate('/userbriefing');
                    }}
                    icon={<IconBook size="0.9rem" stroke={1.5} />}
                  >
                    Learn
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      signOutController(() => {
                        navigate('/login');
                      });
                    }}
                    icon={<IconLogout size="0.9rem" stroke={1.5} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
      </Container>
      <Container>
        {userData && (
          <Tabs
            value={location.pathname}
            variant="outline"
            classNames={{
              root: classes.tabs,
              tabsList: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        )}
      </Container>
    </div>
  );
}

export default HeaderTabs;
